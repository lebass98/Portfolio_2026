import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { SHAPES } from './shapes';

const COLORS = { light: '#111427', dark: '#ffffff' };
const MOUSE_RADIUS = 0.9;

const vertexShader = /* glsl */ `
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aScale;
  varying float vDepth;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mvPosition.z);
    vDepth = smoothstep(-2.0, 2.0, position.z);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vDepth;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.1, d) * mix(0.35, 0.95, vDepth);
    gl_FragColor = vec4(uColor, alpha * uOpacity);
  }
`;

const ParticleMorph = ({ count, roleRef, theme, mouseActiveRef }) => {
  const groupRef = useRef();
  const pointsRef = useRef();
  const materialRef = useRef();
  const invalidate = useThree((state) => state.invalidate);

  // 형태별 목표 좌표와 파티클별 속도 편차(형태 전환이 순차적으로 퍼지는 느낌)
  const { targets, positions, speeds, scales } = useMemo(() => {
    const targets = SHAPES.map((fn) => fn(count));
    const speeds = new Float32Array(count);
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      speeds[i] = 0.6 + Math.random() * 0.9;
      scales[i] = 0.5 + Math.random();
    }
    return { targets, positions: targets[0].slice(), speeds, scales };
  }, [count]);

  // R3F가 uniforms 객체를 복사하므로 이후 변경은 materialRef.current.uniforms로 해야 함
  const initialUniforms = useMemo(
    () => ({
      uSize: { value: 26 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.75) },
      uColor: { value: new THREE.Color(COLORS[theme]) },
      uOpacity: { value: 1 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    materialRef.current.uniforms.uColor.value.set(COLORS[theme]);
    invalidate();
  }, [theme, invalidate]);

  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const mouseWorld = useMemo(() => new THREE.Vector3(), []);
  const mouseLocal = useMemo(() => new THREE.Vector3(), []);
  const inverseWorld = useMemo(() => new THREE.Matrix4(), []);

  useFrame((state, delta) => {
    const group = groupRef.current;
    const { viewport, pointer, raycaster, camera, clock } = state;
    const uniforms = materialRef.current.uniforms;
    const dt = Math.min(delta, 1 / 30);
    const t = clock.elapsedTime;

    // 데스크톱은 헤드라인을 피해 우측, 모바일(세로 화면)은 텍스트 뒤 중앙에 흐리게
    const isPortrait = viewport.width < viewport.height;
    group.position.x = THREE.MathUtils.lerp(group.position.x, isPortrait ? 0 : viewport.width * 0.28, 0.1);
    group.scale.setScalar(isPortrait ? Math.min(1, viewport.width / 4.2) : 0.7);
    uniforms.uOpacity.value = isPortrait ? 0.5 : 1;
    uniforms.uSize.value = isPortrait ? 14 : 26;

    // 천천히 회전 + 마우스 방향으로 살짝 기울기
    group.rotation.y += dt * 0.15;
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, -pointer.y * 0.25, 0.05);

    // 마우스 위치를 z=0 평면에 투영 → 그룹 로컬 좌표로 변환
    raycaster.setFromCamera(pointer, camera);
    const hasMouse = mouseActiveRef.current && raycaster.ray.intersectPlane(plane, mouseWorld) !== null;
    if (hasMouse) mouseLocal.copy(mouseWorld).applyMatrix4(inverseWorld.copy(group.matrixWorld).invert());

    const target = targets[roleRef.current % targets.length];
    const ease = 1 - Math.exp(-dt * 2.2);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const k = Math.min(1, ease * speeds[i]);
      const drift = Math.sin(t * 0.8 + i * 0.37) * 0.025;

      let x = positions[i3] + (target[i3] + drift - positions[i3]) * k;
      let y = positions[i3 + 1] + (target[i3 + 1] + drift - positions[i3 + 1]) * k;
      let z = positions[i3 + 2] + (target[i3 + 2] - positions[i3 + 2]) * k;

      // 마우스 근처 파티클은 밀려났다가 복원력으로 돌아옴
      if (hasMouse) {
        const dx = x - mouseLocal.x;
        const dy = y - mouseLocal.y;
        const dz = z - mouseLocal.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < MOUSE_RADIUS && dist > 0.0001) {
          const force = (1 - dist / MOUSE_RADIUS) * 0.12;
          x += (dx / dist) * force;
          y += (dy / dist) * force;
          z += (dz / dist) * force;
        }
      }

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={initialUniforms}
          transparent
          depthWrite={false}
        />
      </points>
    </group>
  );
};

const HeroScene = ({ theme, roleRef, eventSource }) => {
  const wrapperRef = useRef(null);
  const mouseActiveRef = useRef(false);
  const [inView, setInView] = useState(true);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero가 화면 밖이면 렌더링 중지
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  // 실제 마우스가 Hero 위에 있을 때만 밀어내기 적용 (터치 기기는 기본 포인터가 화면 중앙이라 제외)
  useEffect(() => {
    const el = eventSource.current;
    const onMove = (e) => { mouseActiveRef.current = e.pointerType === 'mouse'; };
    const onLeave = () => { mouseActiveRef.current = false; };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [eventSource]);

  return (
    <div ref={wrapperRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        frameloop={inView && !reducedMotion ? 'always' : 'demand'}
        eventSource={eventSource}
        eventPrefix="client"
      >
        <ParticleMorph
          count={isMobile ? 3500 : 7000}
          roleRef={roleRef}
          theme={theme}
          mouseActiveRef={mouseActiveRef}
        />
      </Canvas>
    </div>
  );
};

export default HeroScene;
