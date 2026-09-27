import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const CARD_ASPECT = 1.6; // 텍스처 1024x640과 동일
const ARC_RADIUS = 9; // 카드가 놓이는 원호 반지름
const FRONT_DISTANCE = 6; // 카메라 ~ 정면 카드 거리
const VISIBLE_RANGE = 3.2; // 정면 기준 좌우로 그릴 카드 수

// 전체 페이지 스크린샷 대신 scripts/make-gallery-thumbs.py로 만든 16:10 텍스처 사용
const galleryImage = (image) =>
  `${import.meta.env.BASE_URL}${image.replace('images/portfolio/', 'images/portfolio/gallery/')}`;

const vertexShader = /* glsl */ `
  uniform float uVelocity;
  uniform float uHover;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 pos = position;
    // 스크롤 속도만큼 카드가 휘고, 호버 시 살짝 앞으로 부풀어 오름
    float bulge = sin(uv.x * 3.14159) * sin(uv.y * 3.14159);
    pos.z += bulge * (uVelocity * 0.6 + uHover * 0.15);
    pos.y += sin(uv.x * 3.14159) * uVelocity * 0.12;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float uActive;
  uniform float uHover;
  uniform float uVelocity;
  varying vec2 vUv;

  float roundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  void main() {
    // 스크롤 속도에 따라 RGB가 살짝 어긋나는 효과
    float shift = uVelocity * 0.012;
    vec4 tex = texture2D(uTexture, vUv);
    tex.r = texture2D(uTexture, vUv + vec2(shift, 0.0)).r;
    tex.b = texture2D(uTexture, vUv - vec2(shift, 0.0)).b;

    // 정면이 아닌 카드는 흑백 + 흐리게
    float focus = clamp(uActive + uHover, 0.0, 1.0);
    float gray = dot(tex.rgb, vec3(0.299, 0.587, 0.114));
    vec3 color = mix(vec3(gray), tex.rgb, focus);

    vec2 p = (vUv - 0.5) * vec2(${CARD_ASPECT.toFixed(2)}, 1.0);
    float d = roundedBox(p, vec2(${(CARD_ASPECT / 2).toFixed(2)}, 0.5), 0.025);
    float edge = 1.0 - smoothstep(0.0, 0.004, d);

    gl_FragColor = vec4(color, edge * mix(0.45, 1.0, focus));
    #include <colorspace_fragment>
  }
`;

const Card = ({ index, texture, layout, motion, onSelect }) => {
  const meshRef = useRef();
  const hover = useRef(0);
  const hovered = useRef(false);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uActive: { value: 0 },
      uHover: { value: 0 },
      uVelocity: { value: 0 },
    }),
    [texture]
  );

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    const offset = index - motion.current.position;
    const visible = Math.abs(offset) < VISIBLE_RANGE;
    mesh.visible = visible;
    if (!visible) return;

    // 원호 위 배치: 정면 카드가 가장 가깝고, 옆 카드는 안쪽으로 감싸듯 휘어짐
    const { width, gap } = layout.current;
    const angle = (offset * (width + gap)) / ARC_RADIUS;
    mesh.position.set(
      Math.sin(angle) * ARC_RADIUS,
      0,
      ARC_RADIUS - FRONT_DISTANCE - Math.cos(angle) * ARC_RADIUS
    );
    mesh.rotation.y = -angle;

    hover.current = THREE.MathUtils.damp(hover.current, hovered.current ? 1 : 0, 8, delta);
    mesh.scale.set(width, width / CARD_ASPECT, 1).multiplyScalar(1 + hover.current * 0.04);

    const u = mesh.material.uniforms;
    u.uActive.value = Math.max(0, 1 - Math.abs(offset));
    u.uHover.value = hover.current;
    u.uVelocity.value = motion.current.velocity;
  });

  return (
    <mesh
      ref={meshRef}
      // three.js 레이캐스트는 visible을 무시하므로, 숨긴 카드는 이벤트를 뒤로 넘김
      onClick={(e) => {
        if (!e.object.visible) return;
        e.stopPropagation();
        onSelect(index);
      }}
      onPointerOver={(e) => {
        if (!e.object.visible) return;
        e.stopPropagation();
        hovered.current = true;
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        hovered.current = false;
        document.body.style.cursor = '';
      }}
    >
      <planeGeometry args={[1, 1, 24, 16]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
};

const Cards = ({ projects, progressRef, onSelect }) => {
  const urls = useMemo(() => projects.map((p) => galleryImage(p.image)), [projects]);
  const textures = useTexture(urls, (loaded) => {
    (Array.isArray(loaded) ? loaded : [loaded]).forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 4;
    });
  });

  // 스크롤 진행도를 부드럽게 따라가는 현재 위치(카드 인덱스 단위)와 속도
  const motion = useRef({ position: 0, velocity: 0 });
  const layout = useRef({ width: 4, gap: 0.5 });

  useFrame((state, delta) => {
    const { camera, size } = state;
    const last = Math.max(1, projects.length - 1);
    const target = progressRef.current.progress * last;
    const m = motion.current;
    m.position = THREE.MathUtils.damp(m.position, target, 6, delta);
    m.velocity = THREE.MathUtils.damp(m.velocity, progressRef.current.velocity, 4, delta);
    // 스크롤이 멈추면 onUpdate가 더 오지 않으므로 속도를 직접 0으로 감쇠
    progressRef.current.velocity = THREE.MathUtils.damp(progressRef.current.velocity, 0, 3, delta);

    // 정면 카드 크기: 화면 너비/높이 중 여유가 적은 쪽에 맞춤 (모바일 세로 화면 포함)
    const viewHeight = 2 * FRONT_DISTANCE * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const viewWidth = viewHeight * (size.width / size.height);
    const width = Math.min(viewWidth * (size.width < 768 ? 0.82 : 0.42), viewHeight * 0.82 * CARD_ASPECT);
    layout.current.width = width;
    layout.current.gap = width * 0.12;
  });

  // 필터 변경 시 이전 위치에서 튀지 않도록 초기화
  useEffect(() => {
    motion.current.position = 0;
  }, [projects]);

  return projects.map((project, i) => (
    <Card
      key={project.id}
      index={i}
      texture={textures[i]}
      layout={layout}
      motion={motion}
      onSelect={onSelect}
    />
  ));
};

const GalleryScene = ({ projects, progressRef, onSelect }) => {
  const wrapperRef = useRef(null);
  const [inView, setInView] = useState(false);

  // 갤러리가 화면에 있을 때만 렌더링
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => {
    document.body.style.cursor = '';
  }, []);

  return (
    <div ref={wrapperRef} className="absolute inset-0">
      <Canvas
        flat
        camera={{ position: [0, 0, 0], fov: 40, near: 0.1, far: 50 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        frameloop={inView ? 'always' : 'never'}
        style={{ touchAction: 'pan-y' }}
      >
        <Suspense fallback={null}>
          <Cards projects={projects} progressRef={progressRef} onSelect={onSelect} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default GalleryScene;
