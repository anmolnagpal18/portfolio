"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ParallaxLayer from "./ParallaxLayer";

interface Project {
  id: string;
  image: string;
  title: string;
  tagline: string;
  tags: string[];
  description: string;
  liveLink: string;
  githubLink?: string;
  date?: string;
}

export default function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAll, setShowAll] = useState(false);

  const monthOrder: Record<string, number> = {
    "January": 1, "February": 2, "March": 3, "April": 4, "May": 5, "June": 6,
    "July": 7, "August": 8, "September": 9, "October": 10, "November": 11, "December": 12
  };

  const parseDate = (dateStr?: string) => {
    if (!dateStr || dateStr === "Present") return new Date().getTime();
    if (dateStr.includes(" ")) {
      const [month, year] = dateStr.split(" ");
      return new Date(parseInt(year), (monthOrder[month] || 1) - 1).getTime();
    }
    return new Date(parseInt(dateStr), 0).getTime();
  };

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        const sorted = (data.projects || []).sort((a: Project, b: Project) => parseDate(b.date) - parseDate(a.date));
        setProjects(sorted);
      })
      .catch(err => console.error("Failed to fetch projects:", err));
  }, []);

  const visibleProjects = showAll ? projects : projects.slice(0, 4);

  if (projects.length === 0) return null;

  const cardVariants: any = {
    hidden: { opacity: 0, y: 30 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: i * 0.15 },
    }),
  };
  return (
    <section id="projects" className="py-24 bg-white dark:bg-[#111] relative overflow-hidden transition-colors duration-500">
      {/* Subtle background glow */}
      <ParallaxLayer speed={60} className="absolute right-0 top-1/4 w-[500px] h-[500px] pointer-events-none">
        <div style={{ background: "radial-gradient(circle, rgba(190,253,74,0.05) 0%, transparent 70%)" }} className="w-full h-full" />
      </ParallaxLayer>

      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <ParallaxLayer speed={-30} className="text-center mb-20">
            <p className="text-sm font-semibold text-gray-400 mb-4 tracking-[0.2em]">PROJECTS</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-dark dark:text-white mb-6">Projects</h2>
          </ParallaxLayer>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {visibleProjects.map((p, i) => (
            <motion.article
              key={p.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -8 }}
            >
              <div className="block w-full h-full">
                {/* Image Container with Glow */}
                <a href={p.liveLink} target="_blank" rel="noopener noreferrer" className="block relative aspect-[16/10] bg-gray-100 rounded-[2.5rem] overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(190,253,74,0.3)]">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-dark/10 transition-colors duration-500" />
                </a>

                {/* Body */}
                <div className="mt-8 flex items-center justify-between px-2">
                  <div>
                    <p className="text-primary font-display italic text-sm mb-1">{p.tagline}</p>
                    <h3 className="text-2xl font-bold text-dark dark:text-white mb-2 tracking-tight group-hover:text-primary transition-colors duration-300">
                      {p.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 max-w-[280px]">
                      {p.description}
                    </p>
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex gap-3">
                        {p.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-primary/60 border border-primary/20 px-3 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {p.date && (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                          {p.date}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    {p.githubLink && (
                      <a 
                        href={p.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-dark hover:border-dark hover:text-white transition-all duration-300 group/github"
                        title="View Github"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                    <a 
                      href={p.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300"
                      title="View Project"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:rotate-[-45deg] transition-transform duration-300">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {projects.length > 4 && (
          <div className="mt-20 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group relative px-12 py-4 bg-dark text-white rounded-full font-bold uppercase tracking-widest text-xs overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(190,253,74,0.2)] border border-white/10"
            >
              <span className="relative z-10">{showAll ? "Show Less" : "View More Projects"}</span>
              <div className="absolute inset-0 bg-primary translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <style jsx>{`
                button:hover { color: #000; }
              `}</style>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
