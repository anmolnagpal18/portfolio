"use client";
import { motion } from "framer-motion";

const brands = ["Python", "Django", "React", "PHP", "MySQL", "OpenAI", "TailwindCSS", "Flutter"];

export default function TrustRow() {
  return (
    <section className="py-10 border-y border-gray-100 dark:border-white/5 bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-wrap justify-center items-center gap-x-12 lg:gap-x-20 gap-y-8">
          {brands.map((brand, i) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="text-gray-400 font-bold text-xl lg:text-2xl tracking-tight select-none hover:text-dark dark:hover:text-white transition-colors duration-300"
            >
              {brand}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
