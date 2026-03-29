"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const steps = [
  {
    num: "01",
    title: "Discover",
    desc: "Understanding your goals, users, and challenges through research and strategy.",
  },
  {
    num: "02",
    title: "Design",
    desc: "Transforming insights into intuitive, beautiful, and functional product experiences.",
  },
  {
    num: "03",
    title: "Deliver",
    desc: "Testing, refining, and launching the final product with clarity and precision.",
  },
];

const testimonials = [
  {
    quote: "Working with Anmol was seamless from start to finish. He understood our complex technical goals quickly, and delivered a high-performance system that scaled perfectly with our modern app, while maintaining a premium design aesthetic.",
    author: "Daniel Reed",
    role: "Founder of NovaLabs",
    avatar: "/testimonial_daniel.png",
  },
  {
    quote: "Anmol brought our product vision to life with incredible attention to detail. His unique ability to bridge the gap between engineering and design made our platform not just visually stunning, but also technically robust and genuinely useful.",
    author: "Sarah Nguyen",
    role: "Product Manager at FlowSync",
    avatar: "/testimonial_sarah.png",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <p className="font-display italic text-xl text-gray-400 mb-6">/Our Projects Explained</p>
          <h2 className="text-5xl lg:text-7xl font-bold text-dark tracking-tighter leading-none">
            Here&apos;s how it works
          </h2>
        </div>

        {/* Process Cards and Arrows */}
        <div className="relative mb-40">
          {/* Hand-drawn SVG Arrows (Absolute) */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-visible">
            <svg className="w-full h-full" viewBox="0 0 1200 400" fill="none">
              {/* Arrow 1: 01 -> 02 (Top curve) */}
              <motion.path 
                d="M320 120 C 380 40, 500 40, 540 120" 
                stroke="#befd4a" 
                strokeWidth="3" 
                strokeLinecap="round"
                strokeDasharray="8 6"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              />
              <motion.circle cx="320" cy="120" r="4" fill="#befd4a" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} />
              <motion.circle cx="540" cy="120" r="4" fill="#befd4a" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2 }} />

              {/* Arrow 2: 02 -> 03 (Bottom curve/loop) */}
              <motion.path 
                d="M750 250 C 780 380, 880 380, 920 250" 
                stroke="#befd4a" 
                strokeWidth="3" 
                strokeLinecap="round"
                strokeDasharray="8 6"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
              />
              <motion.circle cx="750" cy="250" r="4" fill="#befd4a" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1 }} />
              <motion.circle cx="920" cy="250" r="4" fill="#befd4a" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.5 }} />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className={`group bg-gray-50/40 backdrop-blur-sm p-12 rounded-[4rem] border border-gray-100 flex flex-col gap-8 transition-all duration-500 hover:shadow-2xl hover:bg-white hover:-translate-y-2 ${i === 1 ? "md:translate-y-12" : ""}`}
              >
                <span className="text-7xl font-bold text-dark/10 group-hover:text-primary transition-colors duration-500 leading-none">
                  {step.num}
                </span>
                <div>
                  <h3 className="text-4xl font-bold text-dark mb-4">{step.title}</h3>
                  <p className="text-gray-500 text-lg leading-relaxed max-w-[280px]">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-6xl mx-auto pt-32 border-t border-gray-100 items-start">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.3 }}
              className={`flex flex-col gap-10 relative ${i === 1 ? "md:mt-24" : ""}`}
            >
              <div className="relative">
                <svg className="absolute -top-10 -left-6 w-16 h-16 text-dark opacity-5" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8v8h6l-3 6h-6v-14h10v.011zm16 0v8h6l-3 6h-6v-14h10z" />
                </svg>
                <p className="text-2xl lg:text-3xl text-dark/90 font-medium leading-relaxed tracking-tight">
                  {t.quote}
                </p>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500 shadow-lg border-2 border-white">
                  <Image src={t.avatar} alt={t.author} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-xl font-bold text-dark tracking-tight">{t.author}</p>
                  <p className="text-gray-400 font-medium">{t.role}</p>
                </div>
              </div>
              {/* Vertical line separator for desktop */}
              {i === 0 && (
                <div className="hidden md:block absolute right-[-40px] top-0 bottom-0 w-[1px] bg-gray-100" />
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
