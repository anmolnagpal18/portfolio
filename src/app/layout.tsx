import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeProvider";
import PreloaderWrapper from "@/components/PreloaderWrapper";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const googleSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-google-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anmol Nagpal — Full-stack & Design Hybrid",
  description: "Anmol Nagpal is a full-stack developer and designer specializing in high-performance digital ecosystems and human-centered design.",
  keywords: ["Full-stack Developer", "UI/UX Designer", "Product Engineer", "Anmol Nagpal", "Portfolio"],
  authors: [{ name: "Anmol Nagpal" }],
  openGraph: {
    title: "Anmol Nagpal — Full-stack & Design Hybrid",
    description: "Blending engineering precision with design intuition to build high-performance digital ecosystems.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${googleSans.variable} ${bricolage.variable}`}>
      <body>
        <ThemeProvider>
          <PreloaderWrapper>
            <SmoothScroll>{children}</SmoothScroll>
          </PreloaderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
