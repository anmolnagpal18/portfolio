import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustRow from "@/components/TrustRow";
import ProjectsGrid from "@/components/ProjectsGrid";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Experience from "@/components/Experience";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import MarqueeSection from "@/components/MarqueeSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <MarqueeSection />
      <TrustRow />
      <About />
      <Skills />
      <ProjectsGrid />
      <Certifications />
      <Experience />
      <CTA />
      <Footer />
    </main>
  );
}
