"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import CircularText from "./CircularText";

const DEFAULT_PROFILE = {
  name: "Anmol Nagpal",
  title: "Full-stack & Design Hybrid",
  bio: "Blending engineering precision with design intuition to build high-performance digital ecosystems.",
  heroImage: "/hero_anmol_transparent.png",
  experienceImage: "/anmol-removebg-preview.png",
  cvPath: "/Anmol_Nagpal_CV.pdf",
};

export default function Hero() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => { 
        if (data.profile && Object.keys(data.profile).length > 0) {
          setProfile(prev => ({ ...prev, ...data.profile }));
        }
      })
      .catch(() => { });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12 bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4], x: ["-50%", "-48%", "-50%"], y: ["-50%", "-52%", "-50%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none rounded-full"
        style={{ background: "radial-gradient(circle,rgba(190,253,74,0.4) 0%,rgba(190,253,74,0.2) 30%,transparent 70%)", filter: "blur(60px)" }}
      />
      <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10">
        <div className="text-center mb-[-60px] relative z-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(40px,10vw,120px)] font-bold text-dark dark:text-white leading-[0.9] tracking-tighter"
          >
            I&apos;m {profile.name} <br />
            <span className="font-display italic font-medium text-dark dark:text-gray-300">{profile.title}</span>
          </motion.h1>
          <div className="absolute top-[-40px] right-[-100px] hidden xl:block pointer-events-none">
            <CircularText text="ANMOLNAGPAL*" onHover="goBonkers" spinDuration={15} className="scale-[0.5] opacity-20 hover:opacity-100 transition-opacity duration-500 pointer-events-auto" />
          </div>
        </div>

        <div className="relative z-30 flex flex-col lg:flex-row items-center justify-between gap-12 mt-12 lg:mt-0">
          {/* Left: Availability & Socials */}
          <div className="lg:w-1/3 flex flex-col items-center lg:items-start gap-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 shadow-soft"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
              </span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Available for projects</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex items-center gap-5 ml-2"
            >
              <a href="https://github.com/anmolnagpal18" target="_blank" rel="noopener noreferrer" className="group relative" aria-label="GitHub">
                <div className="absolute -inset-2 bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 pointer-events-none" />
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-dark dark:group-hover:text-white transition-colors duration-300">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/anmol-nagpal18/" target="_blank" rel="noopener noreferrer" className="group relative" aria-label="LinkedIn">
                <div className="absolute -inset-2 bg-[#0077B5]/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 pointer-events-none" />
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-[#0077B5] transition-colors duration-300">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Center: Portrait */}
          <div className="lg:w-1/3 flex justify-center relative -mt-16 lg:-mt-10 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[450px] lg:w-[600px] aspect-[4/5]"
            >
              <Image src={profile.heroImage} alt={`${profile.name} — Full-stack Developer & UI/UX Designer`} fill className="object-contain select-none pointer-events-none rounded-[2rem]" priority />
            </motion.div>
          </div>

          {/* Right: Intro & CTA */}
          <div className="lg:w-1/3 space-y-8 flex flex-col items-center lg:items-end text-center lg:text-right">
            <motion.p
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg lg:text-xl text-gray-900 dark:text-gray-300 font-medium leading-relaxed max-w-sm"
            >
              {profile.bio.split(' to ')[0]} to <span className="text-gray-400">{profile.bio.split(' to ')[1]}</span>
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-4 mt-8"
            >
              <a href="#projects" className="inline-flex items-center justify-center px-10 py-4 bg-dark dark:bg-primary text-white dark:text-dark rounded-full text-lg font-display font-bold hover:bg-gray-800 dark:hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-xl whitespace-nowrap">
                View My Work
              </a>
              <a
                href="/api/cv"
                className="inline-flex items-center justify-center px-10 py-4 bg-white dark:bg-white/10 text-dark dark:text-white border-2 border-dark dark:border-white/20 rounded-full text-lg font-display font-bold hover:bg-gray-50 dark:hover:bg-white/20 transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer"
              >
                Download CV
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
