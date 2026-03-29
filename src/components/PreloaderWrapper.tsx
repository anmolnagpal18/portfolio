"use client";
import React, { useState, useEffect } from "react";
import Preloader from "./Preloader";

export default function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial data fetch or just a minimum timer as requested
    // "I want time so animation should work that time"
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds for a premium feel

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader isLoading={isLoading} />
      <div className={isLoading ? "opacity-0 invisible" : "opacity-100 visible transition-all duration-1000 ease-in-out"}>
        {children}
      </div>
    </>
  );
}
