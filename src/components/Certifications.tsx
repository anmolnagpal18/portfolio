"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ParallaxLayer from "./ParallaxLayer";
import { fetchCachedPortfolio } from "@/lib/fetchCachedPortfolio";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  link: string;
}

export default function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [showAll, setShowAll] = useState(false);

  const monthOrder: Record<string, number> = {
    "Jan'": 1, "Feb'": 2, "Mar'": 3, "Apr'": 4, "May'": 5, "Jun'": 6,
    "Jul'": 7, "Aug'": 8, "Sep'": 9, "Oct'": 10, "Nov'": 11, "Dec'": 12,
    "January": 1, "February": 2, "March": 3, "April": 4, "May": 5, "June": 6,
    "July": 7, "August": 8, "September": 9, "October": 10, "November": 11, "December": 12
  };

  const parseDate = (dateStr: string) => {
    if (!dateStr || dateStr === "Present") return new Date().getTime();
    // Handle formats like "Nov' 25" or "March 2026"
    const parts = dateStr.replace("'", "").split(" ");
    if (parts.length === 2) {
      const [month, yearPart] = parts;
      const year = yearPart.length === 2 ? 2000 + parseInt(yearPart) : parseInt(yearPart);
      return new Date(year, (monthOrder[month] || 1) - 1).getTime();
    }
    return new Date(parseInt(dateStr), 0).getTime();
  };

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        const sorted = (data.certifications || []).sort((a: Certification, b: Certification) => parseDate(b.date) - parseDate(a.date));
        setCertifications(sorted);
      })
      .catch(err => console.error("Failed to fetch certifications:", err));
  }, []);

  const visibleCerts = showAll ? certifications : certifications.slice(0, 6);

  if (certifications.length === 0) return null;
  return (
    <section id="certifications" className="py-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6">
        <ParallaxLayer speed={-30} className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8 text-center lg:text-left">
          <div>
            <p className="text-sm font-semibold text-gray-400 mb-4 tracking-[0.2em] uppercase">Validation</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-dark dark:text-white">
              Certifications & <span className="font-display italic text-gray-400">Courses</span>
            </h2>
          </div>
        </ParallaxLayer>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleCerts.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/5 rounded-[2rem] hover:border-primary transition-all duration-300 shadow-soft"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-sm font-bold text-primary px-3 py-1 bg-primary/10 rounded-full">
                  {cert.issuer}
                </span>
                <span className="text-sm font-medium text-gray-400 dark:text-gray-500">{cert.date}</span>
              </div>
              <h3 className="text-xl font-bold text-dark dark:text-white mb-6 leading-tight group-hover:text-primary transition-colors">
                {cert.title}
              </h3>
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-bold text-dark dark:text-white/80 gap-2 hover:gap-3 transition-all underline underline-offset-4 hover:text-primary dark:hover:text-primary"
              >
                View Credential
              </a>
            </motion.div>
          ))}
        </div>

        {certifications.length > 6 && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-dark dark:bg-primary text-white dark:text-dark rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-primary hover:text-dark dark:hover:bg-primary/90 transition-all duration-300 border border-white/5 shadow-xl"
            >
              {showAll ? "Show Less" : "View All Certifications"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
