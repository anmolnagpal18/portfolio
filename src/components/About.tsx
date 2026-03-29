"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import ParallaxLayer from "./ParallaxLayer";

const leftTags = [
  { label: "Frontend: React & TS", color: "#61DAFB" },
  { label: "Backend: Node & MongoDB", color: "#47A248" },
  { label: "Design: Figma & Framer", color: "#F24E1E" },
];

const rightTags = [
  { label: "AI/ML: Gemini & Python", color: "#FFC107" },
  { label: "Animations: GSAP & Motion", color: "#88CE02" },
  { label: "UX: Google Certified", color: "#4285F4" },
];

const LightningIcon = ({ color }: { color: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill={color} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DEFAULT_ABOUT = {
  quote: "When does a man die? When he is hit by a bullet? No! When he suffers a disease? No! When he ate a soup made out of a poisonous mushroom? No! A man dies when he is forgotten!",
  greeting: "Hallo!",
  focus: "my focus is on blending engineering precision, thoughtful design, and AI-driven logic to architect high-performance digital ecosystems",
};

export default function About() {
  const [about, setAbout] = useState(DEFAULT_ABOUT);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => { if (data.about) setAbout(data.about); })
      .catch(() => {});
  }, []);

  return (
    <section id="about" className="py-32 bg-white dark:bg-[#0a0a0a] overflow-hidden transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6 relative">

        <div className="text-center">
          {/* Initial Stinger Quote */}
          <ParallaxLayer speed={-25} className="max-w-4xl mx-auto mb-16">
            <ScrollReveal
              baseOpacity={0}
              enableBlur
              baseRotation={5}
              blurStrength={10}
              textClassName="text-center text-2xl md:text-3xl font-display italic text-gray-500 dark:text-gray-400"
            >
              {about.quote}
            </ScrollReveal>
          </ParallaxLayer>

          <p className="font-display italic text-2xl text-gray-400 mb-8">{about.greeting}</p>

          <div className="max-w-4xl mx-auto relative px-12">
            {/* Mission Text with Scroll Reveal */}
            <ScrollReveal
              baseOpacity={0.1}
              enableBlur
              baseRotation={2}
              blurStrength={15}
              textClassName="text-center text-4xl md:text-5xl lg:text-6xl font-bold text-dark dark:text-white leading-[2] tracking-tight"
            >
              {about.focus}
            </ScrollReveal>

            {/* Side Tags - Left */}
            <div className="hidden xl:flex flex-col gap-8 absolute left-[-180px] top-1/2 -translate-y-1/2">
              {leftTags.map((tag, i) => (
                <motion.div
                  key={tag.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex items-center gap-3 bg-gray-50/50 dark:bg-white/5 backdrop-blur-sm px-4 py-2 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm"
                >
                  <LightningIcon color={tag.color} />
                  <span className="text-sm font-bold text-dark dark:text-white whitespace-nowrap">{tag.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Side Tags - Right */}
            <div className="hidden xl:flex flex-col gap-8 absolute right-[-150px] top-1/2 -translate-y-1/2">
              {rightTags.map((tag, i) => (
                <motion.div
                  key={tag.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex items-center gap-3 bg-gray-50/50 dark:bg-white/5 backdrop-blur-sm px-4 py-2 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm"
                >
                  <LightningIcon color={tag.color} />
                  <span className="text-sm font-bold text-dark dark:text-white whitespace-nowrap">{tag.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
