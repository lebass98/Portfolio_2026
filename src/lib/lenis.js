// SmoothScroll에서 생성한 Lenis 인스턴스를 다른 컴포넌트에서 쓰기 위한 공유 지점
let instance = null;

export const setLenis = (lenis) => {
  instance = lenis;
};

export const scrollToY = (y, options) => {
  if (instance) instance.scrollTo(y, options);
  else window.scrollTo({ top: y, behavior: 'smooth' });
};
