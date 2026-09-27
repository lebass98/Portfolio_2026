import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const COLORS = { light: '#111427', dark: '#ffffff' };
const WIDTH = 18; // 지형 가로 폭
const DEPTH = 16; // 지형 깊이 (카메라 앞 → 먼 곳)

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseStrength;
  uniform float uScroll;
  varying float vFade;

  float wave(vec2 p) {
    return sin(p.x * 0.55 + uTime * 0.5) * 0.35
         + sin(p.y * 0.8 - uTime * 0.35 + p.x * 0.3) * 0.28
         + sin((p.x + p.y) * 1.6 + uTime * 0.9) * 0.07;
  }

  void main() {
    vec3 pos = position;
    float h = wave(pos.xz) * (1.0 + uScroll * 0.8);

    // 마우스 주변에 퍼져 나가는 물결
    float d = distance(pos.xz, uMouse);
    h += exp(-d * d * 0.5) * uMouseStrength * (0.55 + 0.25 * sin(d * 5.0 - uTime * 4.0));
    pos.y += h;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // 너무 가깝거나 멀수록, 좌우 끝으로 갈수록 흐리게 (본문 가독성 확보)
    float depthFade = smoothstep(1.5, 5.0, -mvPosition.z) * (1.0 - smoothstep(6.0, 18.0, -mvPosition.z));
    float edgeFade = 1.0 - smoothstep(${(WIDTH * 0.32).toFixed(1)}, ${(WIDTH * 0.5).toFixed(1)}, abs(position.x));
    vFade = depthFade * edgeFade;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vFade;
  void main() {
    gl_FragColor = vec4(uColor, vFade * uOpacity);
  }
`;

// rows개의 가로선, 각 선은 cols개의 점을 잇는 선분들로 구성
const buildLines = (rows, cols) => {
  const segments = rows * (cols - 1);
  const positions = new Float32Array(segments * 2 * 3);
  let o = 0;
  for (let r = 0; r < rows; r++) {
    const z = 2 - (r / (rows - 1)) * DEPTH;
    for (let c = 0; c < cols - 1; c++) {
      const x0 = (c / (cols - 1) - 0.5) * WIDTH;
      const x1 = ((c + 1) / (cols - 1) - 0.5) * WIDTH;
      positions.set([x0, 0, z, x1, 0, z], o);
      o += 6;
    }
  }
  return positions;
};

const WaveLines = ({ rows, cols, theme, mouseActiveRef, scrollRef }) => {
  const materialRef = useRef();
  const invalidate = useThree((state) => state.invalidate);
  const positions = useMemo(() => buildLines(rows, cols), [rows, cols]);

  // R3F가 uniforms 객체를 복사하므로 이후 변경은 materialRef.current.uniforms로 해야 함
  const initialUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, -3) },
      uMouseStrength: { value: 0 },
      uScroll: { value: 0 },
      uColor: { value: new THREE.Color(COLORS[theme]) },
      uOpacity: { value: 0.32 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    const u = materialRef.current.uniforms;
    u.uColor.value.set(COLORS[theme]);
    u.uOpacity.value = theme === 'dark' ? 0.28 : 0.32;
    invalidate();
  }, [theme, invalidate]);

  const floor = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);
  const hit = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const { camera, pointer, raycaster, clock } = state;
    const u = materialRef.current.uniforms;
    const scroll = scrollRef.current;

    u.uTime.value = clock.elapsedTime;
    u.uScroll.value = scroll;

    // 스크롤할수록 카메라가 위로 올라가며 지형을 내려다봄
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 1.6 + scroll * 2.2, 4, delta);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.4, 2, delta);
    camera.lookAt(0, 0, -4);

    // 마우스 위치를 바닥 평면(y=0)에 투영해 물결 중심으로 사용
    const active = mouseActiveRef.current;
    raycaster.setFromCamera(pointer, camera);
    if (active && raycaster.ray.intersectPlane(floor, hit)) {
      u.uMouse.value.x = THREE.MathUtils.damp(u.uMouse.value.x, hit.x, 6, delta);
      u.uMouse.value.y = THREE.MathUtils.damp(u.uMouse.value.y, hit.z, 6, delta);
    }
    u.uMouseStrength.value = THREE.MathUtils.damp(u.uMouseStrength.value, active ? 1 : 0, 3, delta);
  });

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={initialUniforms}
        transparent
        depthWrite={false}
      />
    </lineSegments>
  );
};

const InfoWaveScene = ({ theme, eventSource }) => {
  const wrapperRef = useRef(null);
  const mouseActiveRef = useRef(false);
  const scrollRef = useRef(0);
  const [inView, setInView] = useState(true);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 영역이 화면 밖이면 렌더링 중지
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  // 실제 마우스가 올라와 있을 때만 물결 적용 + 영역 스크롤 진행도(0~1) 계산
  useEffect(() => {
    const el = eventSource.current;
    const onMove = (e) => { mouseActiveRef.current = e.pointerType === 'mouse'; };
    const onLeave = () => { mouseActiveRef.current = false; };
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      scrollRef.current = THREE.MathUtils.clamp(-rect.top / rect.height, 0, 1);
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, [eventSource]);

  return (
    <div ref={wrapperRef} className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 1.6, 5], fov: 50 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        frameloop={inView && !reducedMotion ? 'always' : 'demand'}
        eventSource={eventSource}
        eventPrefix="client"
      >
        <WaveLines
          rows={isMobile ? 28 : 42}
          cols={isMobile ? 80 : 140}
          theme={theme}
          mouseActiveRef={mouseActiveRef}
          scrollRef={scrollRef}
        />
      </Canvas>
    </div>
  );
};

export default InfoWaveScene;
