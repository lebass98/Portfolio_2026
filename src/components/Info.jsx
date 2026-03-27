import { motion } from 'framer-motion';
import {
  MessageSquare, Users, PenTool, CheckCircle2,
  Monitor, Book, Calendar, Gift, Heart, Stethoscope,
  Smile, Coffee, Terminal, Layout, Smartphone, Database, ChevronRight, Plus, Search
} from 'lucide-react';
import { useRef } from 'react';
import coinImg from '../assets/images/coin.png';
import plasticBg from '../assets/images/pic_plastic01.png';

const Info = ({ theme }) => {
  const sectionRef = useRef(null);

  const benefits = [
    { icon: <Monitor size={24} />, title: 'MOTION DESK', desc: '모션데스크 지원' },
    { icon: <Book size={24} />, title: 'BOOK ALLOWANCE', desc: '도서구입비 지원' },
    { icon: <PenTool size={24} />, title: 'EDUCATION SUPPORT', desc: '교육비 지원' },
    { icon: <Calendar size={24} />, title: 'FLEXIBLE VACATION', desc: '자유로운 휴가' },
    { icon: <Gift size={24} />, title: 'BIRTHDAY GIFT', desc: '생일 축하 선물' },
    { icon: <Terminal size={24} />, title: 'DEVICE SUPPORT', desc: '장비 지원' },
    { icon: <Coffee size={24} />, title: 'DINNER SUPPORT', desc: '야근 식대 제공' },
    { icon: <CheckCircle2 size={24} />, title: 'GREAT WORKSPACE', desc: '쾌적한 사무환경' },
    { icon: <Heart size={24} />, title: 'TAX REDUCTION', desc: '중소기업 세금 감면' },
    { icon: <Smile size={24} />, title: 'SNACK BAR', desc: '간식 지원' },
    { icon: <Users size={24} />, title: 'FREE DRESS CODE', desc: '자유복장' },
    { icon: <Stethoscope size={24} />, title: 'HEALTH CHECK-UP', desc: '정기 건강검진' },
  ];

  const positions = [
    { title: 'PROJECT MANAGER', tags: ['신입', '경력'] },
    { title: 'UI DESIGNER', tags: ['신입', '경력'] },
    { title: 'UX DESIGNER', tags: ['신입', '경력'] },
    { title: 'WEB PUBLISHER', tags: ['신입', '경력'] },
    { title: 'FRONTEND DEVELOPER', tags: ['신입', '경력'] },
    { title: 'BACKEND DEVELOPER', tags: ['신입', '경력'] },
  ];

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.12, 
        duration: 1, 
        ease: [0.22, 1, 0.36, 1] 
      }
    })
  };

  return (
    <section id="info" ref={sectionRef} className="bg-yellow-theme transition-colors duration-500 relative overflow-hidden">

      {/* SPECTER-INSPIRED INFO HERO */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-yellow-theme pt-32 pb-20">
        
        {/* Abstract Background Geometry (Subtle Lines) */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <path d="M0,200 Q500,100 1000,200" fill="none" stroke="var(--nb-dark)" strokeWidth="0.5" />
            <path d="M0,500 Q500,400 1000,500" fill="none" stroke="var(--nb-dark)" strokeWidth="0.5" />
            <path d="M0,800 Q500,700 1000,800" fill="none" stroke="var(--nb-dark)" strokeWidth="0.5" />
            <circle cx="500" cy="500" r="300" fill="none" stroke="var(--nb-dark)" strokeWidth="0.2" />
          </svg>
        </div>

        <div className="relative z-10 w-full max-w-7xl px-8 md:px-[60px] flex flex-col items-center text-center">
          
          {/* Top Floating Notification Cards */}
          <div className="relative h-40 w-full flex justify-center items-center mb-10">
             <motion.div 
               initial={{ opacity: 0, y: 20, scale: 0.9 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="absolute z-30 bg-white shadow-2xl rounded-2xl p-4 flex items-center gap-4 border border-dark/5"
             >
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                  <Monitor size={20} className="text-dark" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-dark/40 uppercase">System Status</p>
                  <p className="text-sm font-black text-dark">Optimization Complete by 98%</p>
                </div>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, x: -50, rotate: -5 }}
               animate={{ opacity: 0.6, x: -140, y: -40, rotate: -12 }}
               transition={{ duration: 1, delay: 0.4 }}
               className="absolute z-20 bg-white/50 backdrop-blur shadow-xl rounded-2xl p-3 flex items-center gap-3 border border-dark/5 hidden md:flex"
             >
                <Smartphone size={16} className="text-dark/40" />
                <p className="text-xs font-bold text-dark/60 whitespace-nowrap">Responsive Layout Ready</p>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, x: 50, rotate: 5 }}
               animate={{ opacity: 0.6, x: 140, y: 20, rotate: 8 }}
               transition={{ duration: 1, delay: 0.5 }}
               className="absolute z-20 bg-white/50 backdrop-blur shadow-xl rounded-2xl p-3 flex items-center gap-3 border border-dark/5 hidden md:flex"
             >
                <PenTool size={16} className="text-dark/40" />
                <p className="text-xs font-bold text-dark/60 whitespace-nowrap">Pixel Perfect Design</p>
             </motion.div>
          </div>

          {/* Main Headline with Mask Reveal and Hover Interaction */}
          <div className="overflow-hidden mb-10">
            <motion.h2 
              className="font-black text-dark"
              style={{ 
                fontSize: 'min(8vw, 130px)', 
                lineHeight: '1.1', 
                letterSpacing: '-0.04em' 
              }}
            >
              {"Crafting experiences as they happen.".split(" ").map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.3em] align-top">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: i * 0.1, 
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      color: "rgba(0,0,0,0.6)",
                      transition: { duration: 0.2 }
                    }}
                    className={`inline-block whitespace-nowrap cursor-default ${
                      word.includes("happen") ? "opacity-40" : ""
                    }`}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h2>
          </div>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg md:text-2xl font-bold text-dark/60 max-w-3xl mb-12 leading-relaxed"
          >
            Harness the power of creative code and user-centric design <br className="hidden md:block"/>
            to build the digital future with confidence and precision.
          </motion.p>

          {/* Pill CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <button className="bg-dark text-white hover:bg-black transition-all px-10 py-5 rounded-full text-lg font-black tracking-tighter shadow-2xl hover:scale-105 active:scale-95">
              Explore Our Work
            </button>
          </motion.div>

          {/* Technology Logos (Social Proof Style) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
            className="mt-28 w-full"
          >
            <p className="text-[10px] font-black tracking-[0.3em] text-dark/30 uppercase mb-8">Trusted by Modern Technology</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-30 grayscale hover:opacity-80 transition-opacity duration-500">
               <div className="flex items-center gap-2 font-black text-xl italic"><Layout size={24} /> REACT</div>
               <div className="flex items-center gap-2 font-black text-xl italic"><Smartphone size={24} /> NEXT.JS</div>
               <div className="flex items-center gap-2 font-black text-xl italic"><Terminal size={24} /> TAILWIND</div>
               <div className="flex items-center gap-2 font-black text-xl italic"><Database size={24} /> FRAMER</div>
               <div className="flex items-center gap-2 font-black text-xl italic"><Search size={24} /> GSAP</div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="px-8 md:px-[60px] relative z-10 space-y-32 py-24">

        {/* WORK STYLE */}
        <div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-sm font-black tracking-[0.3em] text-dark/80 uppercase">WORK STYLE</h3>
              <div className="h-[2px] flex-1 bg-dark/10"></div>
            </div>
            <h4 className="text-4xl md:text-6xl font-black text-dark mb-6 tracking-tighter leading-none">
              좋은 방식이<br />좋은 결과를 만듭니다.
            </h4>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { title: 'WE ASK', sub: '우리는 질문 합니다.', desc: '끊임없이 WHY를 질문하며 진짜 문제를 찾아내고 치열하게 고민하여 솔루션을 제시합니다.', icon: <MessageSquare size={40} strokeWidth={2.5} /> },
              { title: 'DIFFERENT VIEWS', sub: '다른 시선으로 봅니다.', desc: '좋은 결과물을 제공하기 위해 늘 의심하고 지속적인 검증을 통해 더 나은 결과물을 만들어냅니다.', icon: <Search size={40} strokeWidth={2.5} /> },
              { title: 'MAKE TOGETHER', sub: '함께 만들어갑니다.', desc: '아주 작은 문제부터 프로젝트 전반까지 끊임없이 소통하며, 빠른 피드백과 유연한 대응으로 최고의 결과물을 만듭니다.', icon: <Users size={40} strokeWidth={2.5} /> },
              { title: 'OPEN FEEDBACK', sub: '의견을 존중합니다.', desc: '서로의 의견을 존중하고, 더 나은 결과를 위한 피드백은 자유롭게 주고받습니다.', icon: <CheckCircle2 size={40} strokeWidth={2.5} /> },
            ].map((item, i) => (
              <motion.div
                key={i} custom={i} variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="group glass-card p-10 rounded-[32px] overflow-hidden transition-all duration-700 hover:bg-dark hover:-translate-y-4 shadow-xl hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]"
              >
                <div className="relative z-10">
                  <div className="text-dark group-hover:text-(--bg-section-yellow) mb-8 transition-all duration-500 group-hover:scale-110 origin-left">{item.icon}</div>
                  <strong className="block text-2xl font-black text-dark group-hover:text-(--bg-section-yellow) tracking-tight uppercase mb-2 transition-colors duration-500">{item.title}</strong>
                  <span className="block text-sm font-black text-dark/40 group-hover:text-(--bg-section-yellow)/80 mb-6 transition-colors duration-500">{item.sub}</span>
                  <p className="text-sm text-dark/70 font-bold leading-relaxed group-hover:text-(--bg-section-yellow)/60 transition-colors duration-500">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* BENEFITS */}
        <div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="mb-16"
          >
            <h3 className="text-sm font-bold tracking-[0.2em] mb-4 text-dark/80 uppercase">BENEFITS</h3>
            <h4 className="text-3xl md:text-5xl font-bold text-dark mb-4 tracking-tighter">우리만의 일하는 즐거움</h4>
            <p className="text-lg font-medium text-dark/70 max-w-2xl">
              함께 오래, 잘 일할 수 있도록 구성원의 성장과 일상에 실질적인 도움을 주는 다양한 복지를 제공합니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {benefits.map((item, i) => (
              <motion.div
                key={i} custom={i % 4} variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="flex items-start gap-4 p-4 border-b-2 border-dark/10 hover:border-dark transition-colors"
              >
                <div className="text-dark bg-dark/5 p-3 rounded-full">{item.icon}</div>
                <div>
                  <strong className="block text-md font-bold text-dark tracking-tight">{item.title}</strong>
                  <span className="text-xs text-dark/60 font-medium">{item.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* POSITION */}
        <div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="mb-16"
          >
            <h3 className="text-sm font-bold tracking-[0.2em] mb-4 text-dark/80 uppercase">POSITION</h3>
            <h4 className="text-3xl md:text-5xl font-bold text-dark mb-4 tracking-tighter">우리는 이렇게 일해요</h4>
            <p className="text-lg font-medium text-dark/70 max-w-2xl">
              각 분야의 전문가 그룹으로 구성된 팀과 함께 서비스 구현 전 과정을 경험할 수 있습니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {positions.map((pos, i) => (
              <motion.div
                key={i} custom={i % 3} variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="group cursor-pointer glass-glow rounded-2xl p-8 border-2 border-transparent hover:border-dark transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-8">
                  <h5 className="text-2xl font-black text-dark tracking-tighter w-2/3">{pos.title}</h5>
                  <Plus className="text-dark group-hover:rotate-90 transition-transform duration-500" />
                </div>
                <div className="flex gap-2">
                  {pos.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs font-bold px-3 py-1 bg-dark/5 text-dark rounded-full">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RECRUITMENT PROCESS */}
        <div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="mb-16"
          >
            <h3 className="text-sm font-bold tracking-[0.2em] mb-4 text-dark/80 uppercase">RECRUITMENT PROCESS</h3>
            <h4 className="text-3xl md:text-5xl font-bold text-dark mb-4 tracking-tighter">서로를 알아가는 여정</h4>
            <p className="text-lg font-medium text-dark/70 max-w-2xl">
              영입 과정은 단순한 절차를 넘어, 가치와 방향을 맞춰보는 과정입니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            {[
              { step: '01', title: '서류전형', desc: '지원 자격 및 경력 확인과 역량 평가' },
              { step: '02', title: '인터뷰', desc: '직무역량 및 조직적합도 심층검증' },
              { step: '03', title: '처우 협의', desc: '합격자의 입사일과 처우 협의' },
              { step: '04', title: '입사안내', desc: '입사 확정 후 제출 서류 안내' },
            ].map((process, i) => (
              <motion.div
                key={i} custom={i} variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="glass-card p-6 rounded-2xl relative overflow-hidden"
              >
                <span className="text-7xl font-black text-dark/5 absolute -right-2 -bottom-2">{process.step}</span>
                <span className="text-xs font-bold text-main bg-dark px-2 py-1 inline-block mb-4">{process.step}</span>
                <strong className="block text-2xl font-bold text-dark tracking-tighter mb-4">{process.title}</strong>
                <p className="text-sm font-medium text-dark/70 relative z-10">{process.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="mb-16"
          >
            <h3 className="text-sm font-bold tracking-[0.2em] mb-4 text-dark/80 uppercase">FAQ</h3>
            <h4 className="text-3xl md:text-5xl font-bold text-dark tracking-tighter">자주 묻는 질문</h4>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { q: '인터뷰는 어떻게 진행되나요?', a: '약 30분에서 1시간 정도 소요되며, 대면으로 편안한 분위기에서 대화를 진행합니다.' },
              { q: '다수 포지션으로 중복 지원 가능한가요?', a: '가능합니다. 서류 검토 후 가장 적절한 포지션을 제안 드릴 수 있습니다.' },
              { q: '불합격 이력이 있어도 재지원이 가능한가요?', a: '제한은 없습니다. 이력서를 보완해 주시면 더욱 신중히 검토하겠습니다.' },
              { q: '정해진 인터뷰 복장 규정이 있나요?', a: '깔끔한 복장이면 충분하니 부담 갖지 않으셔도 되며 자유로운 복장으로 참여 가능합니다.' },
            ].map((faq, i) => (
              <motion.div
                key={i} custom={i} variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="border-b-2 border-dark/10 pb-6 group"
              >
                <strong className="flex items-start gap-4 text-xl font-bold text-dark mb-4 group-hover:text-dark/70 transition-colors">
                  <span className="text-dark/40 font-black">Q.</span> {faq.q}
                </strong>
                <p className="flex items-start gap-4 text-md font-medium text-dark/70 pl-[34px]">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Info;
