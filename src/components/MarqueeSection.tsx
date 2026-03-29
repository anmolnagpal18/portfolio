"use client";
import { useState, useEffect } from "react";
import ScrollVelocity from "./ScrollVelocity";
import { fetchCachedPortfolio } from "@/lib/fetchCachedPortfolio";

const DEFAULT_ROLES = ["FULL-STACK DEVELOPER", "UI/UX DESIGNER", "PRODUCT ENGINEER"];

export default function MarqueeSection() {
  const [roles, setRoles] = useState<string[]>(DEFAULT_ROLES);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        if (data.about?.marqueeRoles?.length) setRoles(data.about.marqueeRoles);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="py-20 overflow-hidden bg-white dark:bg-[#0a0a0a] border-y border-gray-100 dark:border-white/5 transition-colors duration-500">
      <ScrollVelocity
        texts={roles}
        velocity={50}
        className="font-display italic text-dark/10 dark:text-white/20 hover:text-primary dark:hover:text-primary transition-colors duration-500"
      />
    </div>
  );
}
