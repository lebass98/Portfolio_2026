import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';

const About = () => {
  const { profile, experience } = portfolioData;

  return (
    <section id="about" className="bg-yellow-theme transition-colors duration-500">
      <div className="container mx-auto px-8">
        <h2 className="mb-24">About / Career</h2>

        <div className="grid lg:grid-cols-2 gap-24">
          {/* Left Column: Intro & Profile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-16">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-black shadow-xl mb-8">
                <img src={`${import.meta.env.BASE_URL}images/profile.jpg`} alt={profile.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-black tracking-widest text-white uppercase bg-black px-4 py-1 inline-block mb-8">Hello</span>
              <h3 className="text-4xl md:text-5xl font-black leading-tight mb-8 font-saira uppercase text-black">
                Bridging the gap between <br/> 
                <span className="underline decoration-black decoration-8 underline-offset-8">Design</span> and <span className="underline decoration-black decoration-8 underline-offset-8">Code</span>.
              </h3>
              <p className="text-xl text-black/80 font-medium leading-relaxed max-w-lg">
                I am a UI/UX Developer obsessed with detail and performance. With over 15 years of experience in the web field, I specialize in crafting digital products that are as functional as they are beautiful.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-12">
               <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-black/60 mb-4">Contact</p>
                 <div className="space-y-2">
                   <a href={`mailto:${profile.email}`} className="flex items-center gap-2 group">
                     <Mail size={16} className="text-black/80 group-hover:text-black transition-colors" />
                     <span className="font-bold border-b border-black/30 group-hover:border-black transition-all text-black">{profile.email}</span>
                   </a>
                   <div className="flex items-center gap-2">
                     <Phone size={16} className="text-black/80" />
                     <span className="font-bold text-black">{profile.phone}</span>
                   </div>
                 </div>
               </div>
               <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-black/60 mb-4">Roles</p>
                 <div className="flex flex-wrap gap-2">
                   {profile.roles.map(role => (
                     <span key={role} className="text-xs font-black px-3 py-1 border border-black text-black rounded-full uppercase">{role}</span>
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
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative pb-12 border-b-2 border-black/10 last:border-0"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div>
                    <span className="text-sm font-black text-black/60 tracking-widest mb-2 block">{item.period}</span>
                    <h4 className="text-2xl font-black uppercase font-saira tracking-tighter group-hover:text-black transition-colors flex items-center gap-3 text-black">
                      {item.company}
                      <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 text-black" size={24} />
                    </h4>
                  </div>
                  <span className="text-[12px] font-black uppercase px-4 py-1.5 bg-black text-white rounded-full shadow-lg">
                    {item.position.split('(')[0]}
                  </span>
                </div>
                
                <p className="text-lg font-medium text-black/80 mb-8 max-w-xl">
                  {item.details}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.skills.map(skill => (
                    <span key={skill} className="text-[10px] font-black uppercase tracking-wider px-3 py-1 bg-black/5 border border-black/10 text-black rounded">
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
