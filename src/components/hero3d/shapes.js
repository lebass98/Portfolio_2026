// 파티클이 모여 만드는 형태들 (Hero 타이핑 문구 순서와 1:1 매칭)
// 각 함수는 count개의 점을 [x, y, z, x, y, z, ...] Float32Array로 반환

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

// UI/UX DEVELOPER — 구 (피보나치 분포로 고르게)
export const sphere = (count, radius = 1.7) => {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = GOLDEN_ANGLE * i;
    out[i * 3] = Math.cos(theta) * r * radius;
    out[i * 3 + 1] = y * radius;
    out[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return out;
};

// FRONTEND DEVELOPER — 큐브 (코드 블록을 상징)
export const cube = (count, size = 2.3) => {
  const out = new Float32Array(count * 3);
  const h = size / 2;
  for (let i = 0; i < count; i++) {
    const face = i % 6;
    const axis = face >> 1;
    const sign = face % 2 ? 1 : -1;
    const u = (Math.random() * 2 - 1) * h;
    const v = (Math.random() * 2 - 1) * h;
    const p = [0, 0, 0];
    p[axis] = sign * h;
    p[(axis + 1) % 3] = u;
    p[(axis + 2) % 3] = v;
    out.set(p, i * 3);
  }
  return out;
};

// WEB DESIGNER — 토러스
export const torus = (count, R = 1.45, r = 0.55) => {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = Math.random() * Math.PI * 2;
    const v = Math.random() * Math.PI * 2;
    out[i * 3] = (R + r * Math.cos(v)) * Math.cos(u);
    out[i * 3 + 1] = (R + r * Math.cos(v)) * Math.sin(u);
    out[i * 3 + 2] = r * Math.sin(v);
  }
  return out;
};

// UI/UX DESIGNER — 물결치는 그리드 면 (앞으로 기울임)
export const wave = (count, size = 3.2) => {
  const out = new Float32Array(count * 3);
  const side = Math.ceil(Math.sqrt(count));
  const tilt = -0.9;
  for (let i = 0; i < count; i++) {
    const x = ((i % side) / (side - 1) - 0.5) * size;
    const y = (Math.floor(i / side) / (side - 1) - 0.5) * size;
    const z = Math.sin(x * 1.6) * Math.cos(y * 1.6) * 0.35;
    out[i * 3] = x;
    out[i * 3 + 1] = y * Math.cos(tilt) - z * Math.sin(tilt);
    out[i * 3 + 2] = y * Math.sin(tilt) + z * Math.cos(tilt);
  }
  return out;
};

// WEB PUBLISHER — 이중 나선 (마크업 구조를 상징)
export const helix = (count, height = 3.8, radius = 0.9) => {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = Math.random();
    const strand = i % 2 ? Math.PI : 0;
    const angle = t * Math.PI * 5 + strand;
    const jitter = (Math.random() - 0.5) * 0.12;
    out[i * 3] = Math.cos(angle) * (radius + jitter);
    out[i * 3 + 1] = (t - 0.5) * height;
    out[i * 3 + 2] = Math.sin(angle) * (radius + jitter);
  }
  return out;
};

export const SHAPES = [sphere, cube, torus, wave, helix];
