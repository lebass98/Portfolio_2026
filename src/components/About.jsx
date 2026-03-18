import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { 
  Mail, 
  Phone, 
  ArrowUpRight, 
  Zap, 
  Atom, 
  Code2, 
  Palette, 
  Terminal, 
  Figma, 
  Users, 
  Globe, 
  Search, 
  Layout, 
  Cpu, 
  PenTool,
  CheckCircle2,
  MousePointer2,
  Lightbulb,
  Image as ImageIcon
} from 'lucide-react';
import profileImg from '../assets/images/profile.jpg';

const About = () => {
  const { profile, experience } = portfolioData;

  const getSkillIcon = (skill) => {
    const s = skill.toLowerCase();
    if (s.includes('vite')) return <Zap size={10} />;
    if (s.includes('react')) return <Atom size={10} />;
    if (s.includes('html')) return <Code2 size={10} />;
    if (s.includes('css') || s.includes('scss')) return <Palette size={10} />;
    if (s.includes('js') || s.includes('jquery') || s.includes('javascript')) return <Terminal size={10} />;
    if (s.includes('ui') || s.includes('ux') || s.includes('figma')) return <Figma size={10} />;
    if (s.includes('leading') || s.includes('team') || s.includes('users')) return <Users size={10} />;
    if (s.includes('web') || s.includes('standard')) return <Globe size={10} />;
    if (s.includes('seo') || s.includes('search')) return <Search size={10} />;
    if (s.includes('publishing')) return <Layout size={10} />;
    if (s.includes('interaction')) return <MousePointer2 size={10} />;
    if (s.includes('design') || s.includes('creative')) return <PenTool size={10} />;
    if (s.includes('planning') || s.includes('concept')) return <Lightbulb size={10} />;
    if (s.includes('frontend')) return <Code2 size={10} />;
    if (s.includes('graphic') || s.includes('image')) return <ImageIcon size={10} />;
    
    return <Cpu size={10} />;
  };

  return (
    <section id="about" className="bg-yellow-theme transition-colors duration-500">
      <div className="px-8 md:px-[60px]">
        <h2 className="mb-24">About / Career</h2>

        <div className="grid lg:grid-cols-2 gap-24">
          {/* Left Column: Intro & Profile */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-16">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-dark shadow-xl mb-8">
                <img src={profileImg} alt={profile.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-bold tracking-widest text-main uppercase bg-dark px-4 py-1 inline-block mb-8">About Me</span>
              <h3 className="text-4xl md:text-5xl font-bold leading-tight mb-8 uppercase text-dark">
                디자인과 코드의 <br />
                <span 
                  className="text-main underline decoration-main decoration-8 underline-offset-8"
                  style={{ textShadow: '0 0.1875rem 0.625rem rgba(0, 0, 0, 0.1)' }}
                >경계</span>를 허무는 <span 
                  className="text-main underline decoration-main decoration-8 underline-offset-8"
                  style={{ textShadow: '0 0.1875rem 0.625rem rgba(0, 0, 0, 0.1)' }}
                >퍼블리셔</span>
              </h3>
              <p className="text-xl text-dark/80 font-medium leading-relaxed max-w-lg whitespace-pre-line">
                {profile.intro}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-12">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-dark/60 mb-4">Contact</p>
                <div className="space-y-2">
                  <a href={`mailto:${profile.email}`} className="flex items-center gap-2 group">
                    <Mail size={16} className="text-dark/80 group-hover:text-dark transition-colors" />
                    <span className="font-bold border-b border-dark/30 group-hover:border-dark transition-all text-dark">{profile.email}</span>
                  </a>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-dark/80" />
                    <span className="font-bold text-dark">{profile.phone}</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-dark/60 mb-4">Roles</p>
                <div className="flex flex-wrap gap-2">
                  {profile.roles.map(role => (
                    <span key={role} className="text-xs font-bold px-3 py-1 border border-dark text-dark rounded-full uppercase">{role}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Experience Timeline */}
          <div id="experience" className="space-y-16">
            {experience.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative pb-12 border-b-2 border-dark/10 last:border-0 glass-glow p-6 mb-8 rounded-2xl transition-all"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div>
                    <span className="text-sm font-bold text-dark/60 tracking-widest mb-2 block">{item.period}</span>
                    <h4 className="text-2xl font-bold uppercase tracking-tighter group-hover:text-dark transition-colors flex items-center gap-3 text-dark">
                      {item.company}
                      <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 text-dark" size={24} />
                    </h4>
                  </div>
                  <span className="text-[12px] font-bold uppercase px-4 py-1.5 bg-dark text-main rounded-full shadow-lg">
                    {item.position.split('(')[0]}
                  </span>
                </div>

                <p className="text-lg font-medium text-dark/80 mb-8 max-w-xl">
                  {item.details}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.skills.map(skill => (
                    <span key={skill} className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-dark/5 border border-dark/10 text-dark rounded group-hover:bg-dark group-hover:text-main group-hover:border-dark transition-all duration-300">
                      {getSkillIcon(skill)}
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
