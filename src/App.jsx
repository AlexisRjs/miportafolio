import React from 'react';
import Navbar from './components/Navbar';
import ScrollProgressBar from './components/ScrollProgressBar';
import HeroSection from './components/HeroSection';
import BioSection from './components/BioSection';
import TerminalSection from './components/TerminalSection';
import ProjectsSection from './components/ProjectsSection';
import ContactAndFooter from './components/ContactAndFooter';

export default function App() {
  return (
    <div className="portfolio-app-root">
      {/* Background vignette subtle noise overlay */}
      <div className="noise-overlay" aria-hidden="true"></div>

      {/* Top Scroll Progress Bar (Inverted Theme Color) */}
      <ScrollProgressBar />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        <HeroSection />
        <BioSection />
        <TerminalSection />
        <ProjectsSection />
        <ContactAndFooter />
      </main>
    </div>
  );
}
