"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import ParallaxLayer from "./ParallaxLayer";

export default function Footer() {
  const navLinks = [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Portfolio", href: "#projects" },
    { label: "GitHub", href: "https://github.com/anmolnagpal18" },
    { label: "Contact", href: "mailto:anmoln507@gmail.com" },
  ];

  return (
    <footer className="relative bg-white dark:bg-[#0a0a0a] pt-24 pb-12 overflow-hidden transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 pb-24 border-b border-gray-100 dark:border-white/5 mb-20">
          <nav className="flex flex-wrap justify-center gap-8 lg:gap-12">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-lg font-bold text-dark dark:text-white hover:text-primary transition-colors duration-200 uppercase tracking-tighter"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col md:flex-row items-end gap-4 text-right">
            <p className="text-dark dark:text-white font-bold">+91 8860558626</p>
            <p className="text-gray-400 font-medium">Patel Nagar, New Delhi, India</p>
            <p className="text-gray-400 font-medium">© 2026 Anmol Nagpal. All rights reserved.</p>
          </div>
        </div>

        {/* Massive Name */}
        <ParallaxLayer speed={-80} className="relative text-center select-none pointer-events-none px-4 box-content">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-[clamp(100px,25vw,480px)] font-bold text-dark dark:text-white/5 leading-[0.8] tracking-tighter"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Anmol.
          </motion.h2>
        </ParallaxLayer>
      </div>
    </footer>
  );
}
