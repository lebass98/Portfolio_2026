import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { ExternalLink, Plus } from 'lucide-react';
import { ProjectSkeleton } from './Skeleton';
import { useEffect, useRef } from 'react';
import SectionParallaxBackground from './SectionParallaxBackground';
import bgImage from '../assets/images/pic_plastic03.png';

const Portfolio = ({ theme }) => {
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Simulate loading for premium feel
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const categories = ['All', 'Web Design & Publish', 'Web Design'];

  const filteredProjects = filter === 'All'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" ref={sectionRef} className="bg-yellow-theme transition-colors duration-500 relative overflow-hidden">
      <SectionParallaxBackground bgImage={bgImage} theme={theme} containerRef={sectionRef} />
      <div className="px-8 md:px-[60px] relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm font-bold tracking-[0.2em] mb-4 text-dark/80 uppercase">Selected Works</p>
            <h2 className="!mb-0 !p-0 text-dark">Projects</h2>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 md:mb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[12px] font-bold tracking-widest px-6 py-2 rounded-full border-2 transition-all uppercase ${filter === cat
                  ? 'bg-dark text-main border-dark'
                  : 'bg-transparent border-dark/20 text-dark/60 hover:border-dark/40 hover:text-dark'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid - 3 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {loading ? (
            Array(6).fill(0).map((_, i) => <ProjectSkeleton key={i} />)
          ) : (
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.8,
                    delay: (index % 3) * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="group cursor-pointer glass-glow"
                >
                  <div className="relative aspect-[16/10] glass-card rounded-[5px] overflow-hidden shadow-2xl transition-all duration-700 group-hover:scale-[1.03] group-hover:-rotate-1">
                    {/* Project Image */}
                    <img
                      src={`${import.meta.env.BASE_URL}${project.image}`}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426';
                      }}
                    />

                    {/* Internal Link / Overlay */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[10px]" />

                    {/* Hover Button */}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-6 right-6 w-12 h-12 bg-dark text-main rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 shadow-xl scale-90 group-hover:scale-100"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>

                  <div className="mt-6 px-2">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-bold tracking-tighter uppercase group-hover:text-dark/70 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <Plus className="text-dark group-hover:rotate-90 transition-transform duration-500 shrink-0" strokeWidth={3} size={24} />
                    </div>

                    <div className="w-full h-[2px] bg-dark mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

                    <p className="text-sm font-medium text-dark/80 leading-relaxed max-w-xl line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold uppercase text-dark/60 tracking-widest">Design</span>
                        <span className="text-xs font-bold text-dark">{project.contribution.design}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold uppercase text-dark/60 tracking-widest">Publish</span>
                        <span className="text-xs font-bold text-dark">{project.contribution.publishing}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
