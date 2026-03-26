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
      
      {/* 백그라운드 텍스처 효과 (제거하려면 이 div 자체를 지우세요) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30 mix-blend-multiply" style={{ backgroundImage: `url(${bgTexture})` }} />

      {/* 2️⃣ 탑 네비게이션 공간 여백 (헤더가 fixed이므로 필요) */}
      <div className="pt-[140px] px-8 md:px-[60px] relative z-10 max-w-[1920px] mx-auto">
        
        {/* 뒤로가기 버튼 */}
        <Link to="/" className="inline-flex items-center gap-4 text-xs font-bold tracking-widest uppercase mb-16 text-dark opacity-60 hover:opacity-100 transition-opacity">
          <ArrowLeft size={16} /> BACK TO PROJECTS
        </Link>

        {/* ==================== 
            SECTION 1: HERO TITLE 
            ==================== */}
        <div className="mb-24 md:mb-40">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b-2 border-dark/10 pb-12">
            <div>
              <p className="text-sm font-bold tracking-[0.2em] mb-4 text-dark/60 uppercase">CLIENT</p>
              {/* 제목 수정 부분 */}
              <div className="overflow-hidden">
                <motion.h1 
                  variants={textRevealVariant} initial="hidden" animate="visible"
                  className="text-4xl md:text-6xl lg:text-8xl font-black text-dark tracking-tighter uppercase leading-none"
                >
                  SEOWON<br />HERITAGE
                </motion.h1>
              </div>
            </div>
            <div className="text-left md:text-right">
               <p className="text-sm font-bold tracking-[0.2em] mb-4 text-dark/60 uppercase">PRODUCTION</p>
               <div className="overflow-hidden">
                 <motion.h2 
                   variants={textRevealVariant} initial="hidden" animate="visible" custom={1}
                   className="text-2xl md:text-4xl font-bold text-dark tracking-tighter uppercase leading-none"
                 >
                   WordNcode
                 </motion.h2>
               </div>
            </div>
          </div>

          <motion.div 
            variants={fadeUpVariant} initial="hidden" animate="visible" custom={3}
            className="grid grid-cols-1 md:grid-cols-12 gap-12 text-dark"
          >
            {/* 프로젝트 설명글 */}
            <div className="md:col-span-8 text-xl md:text-2xl font-medium leading-relaxed opacity-80">
              한국의 서원 프로젝트는 세계유산으로서의 가치를 보다 직관적으로 이해하고, 신뢰도를 높일 수 있도록 사용자 경험(UI/UX) 전반을 설계하는 것을 목표로 진행되었습니다. 전통적인 아름다움과 직관적인 정보 구조를 결합하여 사용자들에게 매끄러운 경험을 제공합니다.
            </div>
            
            {/* 프로젝트 요약 정보 (날짜, 서비스 형태, 카테고리 등) */}
            <div className="md:col-span-4 space-y-8 text-sm md:text-base">
              <div className="flex flex-col border-b border-dark/10 pb-4">
                <span className="font-bold tracking-[0.2em] opacity-50 mb-2 uppercase text-xs">DATE</span>
                <span className="font-black">2023.08</span>
              </div>
              <div className="flex flex-col border-b border-dark/10 pb-4">
                <span className="font-bold tracking-[0.2em] opacity-50 mb-2 uppercase text-xs">SERVICE</span>
                <span className="font-medium whitespace-pre-line leading-relaxed">UI/UX Design{'\n'}Frontend Development{'\n'}MarkUp</span>
              </div>
              <div className="flex flex-col border-b border-dark/10 pb-4">
                <span className="font-bold tracking-[0.2em] opacity-50 mb-2 uppercase text-xs">CATEGORY</span>
                <span className="font-medium whitespace-pre-line leading-relaxed">WEB PUBLISH{'\n'}PUBLIC INSTITUTION</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ==================== 
            SECTION 2: PARALLAX IMAGE 
            ==================== */}
        <motion.div 
          variants={fadeUpVariant} initial="hidden" animate="visible" custom={5}
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
                     <div className="flex justify-between items-center">
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
           className="border-t-2 border-dark/10 pt-24 mb-32 pb-32"
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
