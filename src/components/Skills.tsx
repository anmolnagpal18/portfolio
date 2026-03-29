"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ParallaxLayer from "./ParallaxLayer";
import { fetchCachedPortfolio } from "@/lib/fetchCachedPortfolio";

interface SkillCategory {
  category: string;
  items: string[];
}

const DEFAULT_SKILLS: SkillCategory[] = [
  { category: "Languages", items: ["Python", "C", "JavaScript", "PHP", "Dart", "HTML & CSS"] },
  { category: "Frameworks & Libs", items: ["React", "Django", "Next.js", "TailwindCSS", "Flutter", "Bootstrap"] },
  { category: "Databases & Tools", items: ["MySQL", "PostgreSQL", "XAMPP", "Git", "OpenAI API", "Postman"] },
  { category: "Soft Skills", items: ["Problem-Solving", "Team Player", "Adaptability", "Communication"] },
];

export default function Skills() {
  const [skills, setSkills] = useState<SkillCategory[]>(DEFAULT_SKILLS);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => { if (data.skills?.length) setSkills(data.skills); })
      .catch(() => {});
  }, []);

  return (
    <section id="skills" className="py-24 bg-gray-50/50 dark:bg-[#111] transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6">
        <ParallaxLayer speed={-30} className="text-center mb-16">
          <p className="text-sm font-semibold text-gray-400 dark:text-gray-500 mb-4 tracking-[0.2em] uppercase">Expertise</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-dark dark:text-white">
            Skills & <span className="font-display italic text-gray-400">Technologies</span>
          </h2>
        </ParallaxLayer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div key={skill.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 bg-white dark:bg-[#1a1a1a] rounded-3xl border border-gray-100 dark:border-white/5 shadow-soft hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-dark dark:text-white mb-6 border-b border-gray-100 dark:border-white/10 pb-4">{skill.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span key={item} className="px-4 py-1.5 bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-full border border-gray-100 dark:border-white/5">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
