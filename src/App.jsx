import { useState, useEffect } from "react";
import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/skills";
import { Education } from "@/sections/Education";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Certifications } from "@/sections/Certifications";
import { Contact } from "@/sections/Contact";
import { DevContactFlash } from "@/components/DevContactFlash";
import { Footer } from "./layout/Footer";
import { ParallaxConstellation } from "@/components/ParallaxConstellation";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { LiquidMetalCanvas } from "@/components/LiquidMetalCanvas";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LoadingScreen } from "@/components/LoadingScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("portfolio-theme") || "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      // localStorage unavailable
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={`min-h-screen overflow-x-hidden ${isLoading ? "h-screen overflow-hidden" : ""}`}>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      {/* Global UI layers */}
      {theme === "light" && <ParallaxConstellation />}
      <CustomCursor isDark={theme === "dark"} />
      <LiquidMetalCanvas theme={theme} />
      <ScrollProgress />
      <ThemeToggle theme={theme} onToggle={toggleTheme} />

      {!isLoading && (
        <>
          <Navbar onContactClick={() => setIsContactOpen(true)} />
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Education />
            <Projects />
            <Experience />
            <Certifications />
            <Contact />
          </main>
          <Footer />
        </>
      )}
      
      <DevContactFlash
        open={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}

export default App;
