"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ParallaxLayer from "./ParallaxLayer";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  status: string;
  description: string;
  link?: string;
}

interface EducationItem {
  school: string;
  degree: string;
  period: string;
  status: string;
  details: string;
}

export default function Experience() {
  const [professionalExperience, setProfessionalExperience] = useState<ExperienceItem[]>([]);
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [experienceImage, setExperienceImage] = useState("/anmol-removebg-preview.png");

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        setProfessionalExperience(data.experience || []);
        setEducation(data.education || []);
        if (data.profile?.experienceImage) setExperienceImage(data.profile.experienceImage);
      })
      .catch(err => console.error("Failed to fetch experience/education:", err));
  }, []);

  if (professionalExperience.length === 0 && education.length === 0) return null;
  return (
    <section id="experience" className="py-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6">
        <ParallaxLayer speed={-25} className="mb-16">
          <p className="text-sm font-semibold text-gray-400 mb-4 tracking-[0.2em] uppercase">Journey</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-dark dark:text-white">
            Experience & <span className="font-display italic text-gray-400">Education</span>
          </h2>
        </ParallaxLayer>

        <div className="grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-16 lg:gap-32 items-start">
          {/* Left Column: Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-32"
          >
            <ParallaxLayer speed={-50} className="rounded-[3rem] overflow-hidden aspect-[4/5] relative bg-dark shadow-2xl">
              <Image
                src={experienceImage}
                alt="Anmol Nagpal"
                fill
                className="object-cover object-top grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Anmol Nagpal</p>
                <p className="text-2xl font-bold leading-tight">Crafting experiences with code & design.</p>
              </div>
            </ParallaxLayer>
          </motion.div>

          {/* Right Column: Details Stack */}
          <div className="space-y-24">
            {/* Professional Experience Section */}
            <div>
              <h3 className="text-2xl font-bold text-dark dark:text-white mb-10 pb-4 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
                Professional Experience
                <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">Industry</span>
              </h3>
              <div className="space-y-12">
                {professionalExperience.map((item, i) => (
                  <motion.div
                    key={item.company}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative pl-8 border-l-2 border-gray-100 dark:border-white/10 hover:border-primary transition-colors duration-300"
                  >
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-[#0a0a0a] border-2 border-gray-200 dark:border-white/20" />
                    <div className="flex flex-col mb-3">
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        {item.link && item.link !== "#" ? (
                          <a 
                            href={item.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-2xl font-bold text-dark dark:text-white hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                          >
                            {item.company}
                            <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        ) : (
                          <span className="text-2xl font-bold text-dark dark:text-white">{item.company}</span>
                        )}
                        <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.status === "Running" ? "bg-primary/10 text-primary border border-primary/20" : "bg-gray-100 text-gray-400 border border-gray-200"
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <span className="text-gray-400 text-lg font-medium">{item.role}</span>
                    </div>
                    <span className="inline-block text-sm font-bold text-dark/60 dark:text-white/40 mb-4 bg-gray-50 dark:bg-white/5 px-4 py-1.5 rounded-lg shadow-sm">
                      {item.period}
                    </span>
                    <p className="text-base text-gray-500 leading-relaxed max-w-2xl">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div>
              <h3 className="text-2xl font-bold text-dark dark:text-white mb-10 pb-4 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
                Education History
                <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">Academic</span>
              </h3>
              <div className="space-y-12">
                {education.map((item, i) => (
                  <motion.div
                    key={item.school + item.degree}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative pl-8 border-l-2 border-gray-100 dark:border-white/10 hover:border-primary transition-colors duration-300"
                  >
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-[#0a0a0a] border-2 border-gray-200 dark:border-white/20" />
                    <div className="flex flex-col mb-3">
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <span className="text-2xl font-bold text-dark dark:text-white">{item.school}</span>
                        <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.status === "Running" ? "bg-primary/10 text-primary border border-primary/20" : "bg-gray-100 text-gray-400 border border-gray-200"
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <span className="text-gray-400 text-lg font-medium">{item.degree}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="text-sm font-bold text-dark/60 dark:text-white/40 bg-gray-50 dark:bg-white/5 px-4 py-1.5 rounded-lg shadow-sm">
                        {item.period}
                      </span>
                      <span className="text-sm font-bold text-primary bg-primary/5 px-4 py-1.5 rounded-lg border border-primary/10 shadow-sm">
                        {item.details}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
