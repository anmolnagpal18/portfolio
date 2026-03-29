"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import ParallaxLayer from "./ParallaxLayer";

export default function CTA() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("idle");
        alert("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("idle");
      alert("Network error. Please try again.");
    }
  };

  return (
    <section id="cta" className="py-32 bg-primary relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-dark">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl lg:text-7xl font-bold leading-tight mb-8 tracking-tighter">
              Let&apos;s Make It Happen
            </h2>
            <p className="text-dark/70 text-lg lg:text-xl font-medium mb-12 max-w-md">
              Have a project in mind or just want to chat? Reach out and I&apos;ll get back to you within 24 hours.
            </p>
            <div className="space-y-6 text-lg font-bold">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-dark/5 flex items-center justify-center text-dark">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                   </svg>
                </div>
                <span>anmoln507@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-dark/5 flex items-center justify-center text-dark">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                   </svg>
                </div>
                <span>+91 8860558626</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-dark/5 flex items-center justify-center text-dark">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                   </svg>
                </div>
                <span>Patel Nagar, New Delhi, India</span>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/20 backdrop-blur-md p-8 lg:p-12 rounded-[2.5rem] border border-white/30 shadow-2xl"
          >
            {status === "sent" ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-dark text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="opacity-70 font-medium">Thanks for reaching out. I&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-3 opacity-60">Full Name</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-white/40 dark:bg-black/30 border border-dark/5 dark:border-white/20 rounded-2xl px-6 py-4 outline-none focus:bg-white/70 dark:focus:bg-black/50 focus:border-dark/20 transition-all font-medium text-dark dark:text-white placeholder:text-dark/20 dark:placeholder:text-white/30"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-3 opacity-60">Email Address</label>
                  <input
                    required
                    type="email"
                    className="w-full bg-white/40 dark:bg-black/30 border border-dark/5 dark:border-white/20 rounded-2xl px-6 py-4 outline-none focus:bg-white/70 dark:focus:bg-black/50 focus:border-dark/20 transition-all font-medium text-dark dark:text-white placeholder:text-dark/20 dark:placeholder:text-white/30"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-3 opacity-60">Message</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full bg-white/40 dark:bg-black/30 border border-dark/5 dark:border-white/20 rounded-2xl px-6 py-4 outline-none focus:bg-white/70 dark:focus:bg-black/50 focus:border-dark/20 transition-all font-medium text-dark dark:text-white placeholder:text-dark/20 dark:placeholder:text-white/30 resize-none"
                    placeholder="Describe your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-5 bg-dark text-white rounded-2xl font-bold hover:bg-gray-900 transition-all active:scale-[0.98] shadow-xl disabled:opacity-50"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <ParallaxLayer speed={70} className="absolute inset-x-0 bottom-[-10%] flex justify-center opacity-[0.05] pointer-events-none select-none">
        <span className="text-[25vw] font-bold text-dark leading-none whitespace-nowrap">
          LET&apos;S TALK
        </span>
      </ParallaxLayer>
    </section>
  );
}
