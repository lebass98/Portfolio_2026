import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { ExternalLink, Plus } from 'lucide-react';

const Portfolio = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Web Design & Publish', 'Web Design'];
  
  const filteredProjects = filter === 'All' 
    ? portfolioData.projects 
    : portfolioData.projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="bg-yellow-theme transition-colors duration-500">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm font-bold tracking-[0.2em] mb-4 text-black/60 uppercase">Selected Works</p>
            <h2 className="!mb-0 !p-0">Projects</h2>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 md:mb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[12px] font-black tracking-widest px-6 py-2 rounded-full border-2 transition-all uppercase ${
                  filter === cat 
                    ? 'bg-black text-white border-black' 
                    : 'bg-transparent border-black/10 text-black/40 hover:border-black/30 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid - 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[16/10] bg-white rounded-[10px] overflow-hidden shadow-2xl transition-all duration-700 group-hover:scale-[1.03] group-hover:-rotate-1">
                   {/* Project Image */}
                   <img 
                    src={project.image} 
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
                    className="absolute bottom-10 right-10 w-16 h-16 bg-white text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 shadow-xl scale-90 group-hover:scale-100"
                  >
                    <ExternalLink size={24} />
                  </a>
                </div>

                <div className="mt-8 px-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-3xl font-black tracking-tighter uppercase group-hover:text-black/70 transition-colors">
                      {project.title}
                    </h3>
                    <Plus className="text-black group-hover:rotate-90 transition-transform duration-500" strokeWidth={3} size={32} />
                  </div>
                  
                  <div className="w-full h-[2px] bg-black mb-6 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

                  <p className="text-lg font-medium text-black/60 leading-relaxed max-w-xl">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mt-6">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase text-black/40 tracking-widest">Design</span>
                      <span className="text-sm font-black">{project.contribution.design}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] font-black uppercase text-black/40 tracking-widest">Publish</span>
                       <span className="text-sm font-black">{project.contribution.publishing}%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
