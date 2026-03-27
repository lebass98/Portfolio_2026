import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// 컴포넌트 내부에서 사용할 목업용 빈 이미지들 (나중에 실제 이미지 경로로 수정하세요)
import placeholderHero from '../assets/images/scr_03.jpg'; // 기존 서원 포트폴리오 썸네일 경로
import bgTexture from '../assets/images/pic_plastic01.png'; // 배경 텍스처

/*
  =========================================
  💡 [프로젝트 상세페이지 템플릿 사용 안내] 💡
  =========================================
  이 파일은 뉴버드 IBK 레퍼런스를 바탕으로 만들어진 "세계유산 한국의 서원" 포트폴리오 상세페이지(샘플)입니다.
  나중에 다른 프로젝트 페이지를 만들 때는 이 파일을 복사하여 다음과 같이 사용하세요.

  1. 파일 복사 후 이름 변경 (예: ProjectA.jsx)
  2. 컴포넌트명 변경: const ProjectA = ({ theme }) => { ... }, export default ProjectA;
  3. App.jsx에서 라우터 추가: <Route path="/project/a" element={<ProjectA theme={theme} />} />
  4. portfolioData.js에서 해당 프로젝트의 url을 "/project/a" 로 변경
  5. 아래 코드의 한국어 주석들을 읽어가며 텍스트/이미지/컬러를 프로젝트에 맞게 수정!
*/

const ProjectSeowon = ({ theme }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // 페이지 진입 시 스크롤을 항상 맨 위로 초기화합니다.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 1️⃣ 애니메이션 프리셋 (필요에 따라 duration, y값을 수정하여 느낌을 바꿀 수 있습니다)
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: custom * 0.1, ease: [0.16, 1, 0.3, 1] }
    })
  };

  const textRevealVariant = {
    hidden: { y: "100%" },
    visible: (custom = 0) => ({
      y: 0,
      transition: { duration: 0.8, delay: custom * 0.1, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <div ref={containerRef} className="bg-yellow-theme transition-colors duration-500 relative min-h-screen">

      {/* 백그라운드 텍스처 효과 */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30 mix-blend-multiply" style={{ backgroundImage: `url(${bgTexture})` }} />

      {/* ============================================================ 
          1️⃣ 히로 섹션 (Image 1 참고): 풀스크린 레이아웃 
          ============================================================ */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0055A2] to-[#0099DA] text-white">
        {/* ============================================================ 
            데스크탑 레이아웃 (md 이상)
            ============================================================ */}
        <div className="hidden md:flex relative h-screen min-h-[800px] items-center">
          {/* 히로 섹션 내 배경 요소 */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url(${bgTexture})`, mixBlendMode: 'overlay' }} />

          <div className="w-full px-8 md:px-[0] relative z-10 flex flex-row items-center justify-between gap-12">
            {/* 좌측: 타이틀 및 로고 영역 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1"
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <span className="text-xl md:text-2xl font-bold tracking-tighter opacity-80 italic">UNESCO WORLD HERITAGE</span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] uppercase drop-shadow-lg">
                  한국의 서원<br />
                  <span className="text-3xl md:text-5xl lg:text-6xl opacity-90 tracking-tight font-bold">통합관리센터</span>
                </h1>
              </div>
            </motion.div>

            {/* 우측: 목업 이미지 영역 (노트북 & 휴대폰) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 relative"
            >
              <div className="relative z-10 drop-shadow-[0_45px_45px_rgba(0,0,0,0.6)] transform hover:scale-105 transition-transform duration-700">
                <img
                  src="/portfolio_2026/images/portfolio/scr_03.jpg"
                  alt="Project Mockup Laptop"
                  className="w-full rounded-lg"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426' }}
                />

                {/* 휴대폰 목업 효과 */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="absolute -left-10 -bottom-10 w-1/3 border-8 border-dark rounded-[2.5rem] overflow-hidden shadow-2xl hidden lg:block"
                >
                  <img
                    src="/portfolio_2026/images/portfolio/scr_03.jpg"
                    alt="Project Mockup Mobile"
                    className="w-full h-full object-cover aspect-[9/19]"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=2340' }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* 히로 섹션 하단: 인포메이션 (클라이언트 / 제작사) */}
          <div className="absolute bottom-12 left-[60px] right-[60px] flex justify-between items-end z-20 font-bold">
            <div className="text-left">
              <p className="text-[10px] font-bold tracking-[0.3em] opacity-60 uppercase mb-2">CLIENT</p>
              <p className="text-lg tracking-tight uppercase">(재)세계유산 한국의 서원</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold tracking-[0.3em] opacity-60 uppercase mb-2">PRODUCTION</p>
              <div className="flex flex-col items-end">
                <span className="text-[10px] tracking-widest border-b border-white pb-1 mb-1 opacity-80 uppercase">NEWBIRD STYLE</span>
                <p className="text-2xl tracking-tighter italic font-black">WordNcode</p>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ 
            모바일 레이아웃 (md 미만) : 이미지 형태의 레이아웃
            ============================================================ */}
        <div className="md:hidden flex flex-col w-full relative pb-0">
          <div className="py-8 z-10 flex flex-col gap-4 mb-8">
            <span className="text-sm font-bold tracking-tighter opacity-80 italic">UNESCO WORLD HERITAGE</span>
            <h1 className="text-4xl font-extrabold tracking-tighter leading-tight uppercase drop-shadow-md">
              한국의 서원<br />
              <span className="text-2xl opacity-90 tracking-tight font-bold">통합관리센터</span>
            </h1>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative z-0 mt-4 drop-shadow-[0_20px_25px_rgba(0,0,0,0.5)]"
          >
            <img
              src="/portfolio_2026/images/portfolio/scr_03.jpg"
              alt="Project Mobile Image View"
              className="w-full object-cover rounded-t-3xl border-t-4 border-white/10"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426' }}
            />
          </motion.div>

          <div className="w-full px-8 py-8 flex justify-between items-end font-bold">
            <div className="text-left">
              <p className="text-[10px] font-bold tracking-[0.3em] opacity-60 uppercase mb-1">CLIENT</p>
              <p className="text-sm tracking-tight uppercase text-white/90">세계유산 한국의 서원</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold tracking-[0.3em] opacity-60 uppercase mb-1">PRODUCTION</p>
              <p className="text-lg tracking-tighter italic font-black text-white/90">WordNcode</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ 
          2️⃣ 오버뷰 섹션 (Image 2 참고): 요약 및 상세 정보 
          ============================================================ */}
      <section className="py-24 md:py-40 px-8 md:px-[60px] bg-dark/5 text-dark relative z-10">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">

          {/* 오버뷰 좌측: 프로젝트 심볼/로고 */}
          <motion.div
            variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="lg:col-span-4 flex items-start justify-center lg:justify-start"
          >
            <div className="w-full max-w-[300px] aspect-video rounded-xl flex items-center justify-center border-dark/5 p-8">
              {/* 실제 프로젝트 로고 이미지가 있다면 여기에 넣으세요 */}
              <h2 className="text-3xl font-black tracking-tighter text-center uppercase">
                SEOWON<br /><span className="text-lg opacity-50 tracking-normal font-bold">HERITAGE</span>
              </h2>
            </div>
          </motion.div>

          {/* 오버뷰 우측: 텍스트 및 메타데이터 */}
          <motion.div
            variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            className="lg:col-span-8 flex flex-col gap-16"
          >
            {/* 설명 텍스트 영역 */}
            <div className="space-y-8">
              <span className="text-sm font-black tracking-[0.4em] text-dark/30 uppercase">[OVERVIEW]</span>
              <p className="text-xl md:text-2xl font-medium leading-relaxed opacity-80 max-w-4xl">
                한국의 서원 통합관리센터 프로젝트는 유네스코 세계유산으로 등재된 9개 서원의 역사적 가치와 정보를 사용자가 보다 직관적으로 이해할 수 있도록 UI/UX 전반을 리뉴얼한 프로젝트입니다.
                노후화된 서비스 경험을 현대적으로 재정의하고, 모바일과 웹 환경에서 일관된 고품질의 디지털 아카이브를 제공하는 데 집중했습니다.
              </p>
            </div>

            {/* 메타데이터 그리드 (DATE, SERVICE, CATEGORY) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-16 border-t border-dark/10">
              <div className="space-y-4">
                <p className="text-xs font-black tracking-[0.3em] text-dark/40 uppercase">DATE</p>
                <div className="h-px w-8 bg-dark/20" />
                <p className="text-lg font-black tracking-tight">2023.08</p>
              </div>
              <div className="space-y-4">
                <p className="text-xs font-black tracking-[0.3em] text-dark/40 uppercase">SERVICE</p>
                <div className="h-px w-8 bg-dark/20" />
                <ul className="text-sm md:text-base font-bold space-y-1">
                  <li>UI/UX DESIGN</li>
                  <li>DEVELOPMENT</li>
                  <li>MARKUP</li>
                </ul>
              </div>
              <div className="space-y-4">
                <p className="text-xs font-black tracking-[0.3em] text-dark/40 uppercase">CATEGORY</p>
                <div className="h-px w-8 bg-dark/20" />
                <ul className="text-sm md:text-base font-bold space-y-1">
                  <li>HERITAGE</li>
                  <li>BRAND HOMEPAGE</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 공통 컨텐츠 영역 (그리드 정렬 유지) */}
      <div className="px-8 md:px-[60px] relative z-10 max-w-[1920px] mx-auto py-24">

        {/* 뒤로가기 버튼 */}
        <Link to="/" className="inline-flex items-center gap-4 text-xs font-bold tracking-widest uppercase mb-24 text-dark opacity-60 hover:opacity-100 transition-opacity">
          <ArrowLeft size={16} /> BACK TO PROJECTS
        </Link>

        {/* ==================== 
            SECTION 2: PARALLAX IMAGE 
            ==================== */}
        <motion.div
          variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          className="w-full h-[50vh] md:h-[80vh] overflow-hidden rounded-2xl md:rounded-[40px] mb-24 md:mb-40 shadow-2xl relative"
        >
          {/* 이미지는 bg-cover로 꽉 차게 들어갑니다. 이미지 경로를 변경하세요 */}
          <motion.div
            style={{ y, backgroundImage: `url('/portfolio_2026/images/portfolio/scr_03.jpg')` }}
            className="absolute inset-x-0 w-full h-[150%] -top-[25%] bg-cover bg-center"
          />
        </motion.div>


        {/* ==================== 
            SECTION 3: CORE VALUES (핵심 가치 3가지)
            ==================== */}
        <div className="mb-24 md:mb-40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* 가치 1 */}
            <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={0}>
              <span className="text-4xl md:text-6xl font-black text-dark/20 uppercase block mb-6">01</span>
              <h3 className="text-2xl md:text-3xl font-bold text-dark mb-4 tracking-tighter">Intuitive</h3>
              <p className="text-lg font-medium text-dark/70 leading-relaxed">핵심 정보를 찾기 쉽도록 직관적인 정보 구조로 재설계하여 사용자 편의성을 높였습니다.</p>
            </motion.div>
            {/* 가치 2 */}
            <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={1}>
              <span className="text-4xl md:text-6xl font-black text-dark/20 uppercase block mb-6">02</span>
              <h3 className="text-2xl md:text-3xl font-bold text-dark mb-4 tracking-tighter">Traditional</h3>
              <p className="text-lg font-medium text-dark/70 leading-relaxed">복잡한 역사적 정보를 누구나 쉽고 품격 있게 이해할 수 있도록 디자인 톤앤매너를 정립했습니다.</p>
            </motion.div>
            {/* 가치 3 */}
            <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={2}>
              <span className="text-4xl md:text-6xl font-black text-dark/20 uppercase block mb-6">03</span>
              <h3 className="text-2xl md:text-3xl font-bold text-dark mb-4 tracking-tighter">Responsive</h3>
              <p className="text-lg font-medium text-dark/70 leading-relaxed">다양한 디바이스 환경에서도 일관된 여정을 돕는 반응형 편의 기능을 강화했습니다.</p>
            </motion.div>
          </div>
        </div>

        {/* ==================== 
            SECTION 4: DESIGN SYSTEM (Typography & Colors)
            ==================== */}
        <div className="mb-24 md:mb-40 grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* 타이포그래피 안내 영역 */}
          <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-12">
            <div>
              <h4 className="text-sm font-bold tracking-[0.2em] mb-8 text-dark/60 uppercase border-b-2 border-dark/10 pb-4">TYPOGRAPHY - PRETENDARD</h4>
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-dark/5 pb-4">
                  <span className="text-6xl font-black text-dark tracking-tighter">Aa</span>
                  <span className="text-2xl font-black text-dark uppercase">Black</span>
                </div>
                <div className="flex justify-between items-center border-b border-dark/5 pb-4">
                  <span className="text-5xl font-bold text-dark tracking-tighter">Aa</span>
                  <span className="text-2xl font-bold text-dark uppercase">Bold</span>
                </div>
                <div className="flex justify-between items-center border-b border-dark/5 pb-4">
                  <span className="text-4xl font-medium text-dark tracking-tighter">Aa</span>
                  <span className="text-2xl font-medium text-dark uppercase">Medium</span>
                </div>
                <div className="flex justify-between items-center border-b border-dark/5 pb-4">
                  <span className="text-3xl font-light text-dark tracking-tighter">Aa</span>
                  <span className="text-2xl font-light text-dark uppercase">Light</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 브랜드 컬러 팔레트 영역: 컬러값을 수정하여 프로젝트에 맞는 색상으로 바꾸세요 */}
          <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} className="space-y-12">
            <div>
              <h4 className="text-sm font-bold tracking-[0.2em] mb-8 text-dark/60 uppercase border-b-2 border-dark/10 pb-4">COLOR PALETTE</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* 컬러칩 1 */}
                <div className="flex flex-col gap-2">
                  <div className="w-full aspect-square rounded-2xl bg-[#0055A2] shadow-md"></div>
                  <span className="text-sm font-bold text-dark/80 tracking-wider">#0055A2</span>
                </div>
                {/* 컬러칩 2 */}
                <div className="flex flex-col gap-2">
                  <div className="w-full aspect-square rounded-2xl bg-[#0099DA] shadow-md"></div>
                  <span className="text-sm font-bold text-dark/80 tracking-wider">#0099DA</span>
                </div>
                {/* 컬러칩 3 */}
                <div className="flex flex-col gap-2">
                  <div className="w-full aspect-square rounded-2xl bg-[#111427] shadow-md border my-auto border-dark/10"></div>
                  <span className="text-sm font-bold text-dark/80 tracking-wider">#111427</span>
                </div>
                {/* 컬러칩 4 */}
                <div className="flex flex-col gap-2">
                  <div className="w-full aspect-square rounded-2xl bg-[#FEF6CC] shadow-md border border-dark/10"></div>
                  <span className="text-sm font-bold text-dark/80 tracking-wider">#FEF6CC</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ==================== 
            SECTION 5: FULL WIDTH IMAGE OR MOCKUP 
            ==================== */}
        <motion.div
          variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          className="mb-24 md:mb-40"
        >
          <p className="text-xl md:text-3xl font-medium leading-relaxed md:leading-snug text-dark opacity-90 max-w-4xl mb-16 px-4 border-l-4 border-dark/30">
            다양한 디바이스와 해상도 환경에서도 사용자가 첫 화면에서 핵심 콘텐츠를 직관적으로 인지할 수 있도록, 화면 비율과 영역에 맞춘 콘텐츠 배치와 시각적 계층 구조를 섬세하게 설계했습니다.
          </p>
          {/* 목업 이미지 등을 나열할 수 있는 영역입니다. src 속성 경로만 수정하세요. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-dark/5 aspect-[4/3] rounded-3xl overflow-hidden flex items-center justify-center relative group">
              <img src="/portfolio_2026/images/portfolio/scr_03.jpg" alt="Screen 1" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            </div>
            <div className="bg-dark/5 aspect-[4/3] rounded-3xl overflow-hidden flex items-center justify-center relative group">
              {/* 추가 이미지가 없다면 이미지를 흑백처리하거나 다른 이미지를 사용할 수 있습니다. */}
              <img src="/portfolio_2026/images/portfolio/scr_03.jpg" alt="Screen 2" className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-105 group-hover:grayscale-0" />
            </div>
          </div>
        </motion.div>

        {/* ==================== 
            SECTION 6: CREDITS & BOTTOM LINKS 
            ==================== */}
        <motion.div
          variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="border-t-2 border-dark/10 pt-24 mb-32"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h3 className="text-4xl lg:text-5xl font-black text-dark tracking-tighter uppercase mb-4">CREDIT</h3>
            </div>
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-8">
              {/* 크레딧 정보 - 참여자 이름 수정 */}
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-dark/50 uppercase block mb-4">PROJECT MANAGER</span>
                <strong className="text-xl font-bold text-dark tracking-wide block">LEE JAE GWANG</strong>
              </div>
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-dark/50 uppercase block mb-4">UI/UX DESIGNER</span>
                <strong className="text-xl font-bold text-dark tracking-wide block">KIM DESIGNER</strong>
              </div>
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-dark/50 uppercase block mb-4">WEB PUBLISHER</span>
                <strong className="text-xl font-bold text-dark tracking-wide block">LEE JAE GWANG</strong>
              </div>
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-dark/50 uppercase block mb-4">URL</span>
                <a href="https://k-seowon.or.kr" target="_blank" rel="noreferrer" className="text-xl font-bold text-dark tracking-wide block border-b-2 border-transparent hover:border-dark inline-block transition-colors">
                  K-SEOWON.OR.KR
                </a>
              </div>
            </div>
          </div>

          <div className="mt-32 text-center">
            <p className="text-lg md:text-2xl font-bold tracking-tight text-dark opacity-60 italic mb-8">"Design that breaks boundaries."</p>
            <Link to="/#portfolio" className="inline-block bg-dark text-main px-12 py-5 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-2xl">
              BACK TO HOME
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default ProjectSeowon;
