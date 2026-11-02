import React, { useState, useEffect, useRef } from 'react';
import { soundEngine } from '../utils/soundEngine';

export default function Navbar({ currentSection = 'hero' }) {
  const [activeSection, setActiveSection] = useState(currentSection);
  const [isMuted, setIsMuted] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pillBarRef = useRef(null);
  const sliderRef = useRef(null);

  // Sync initial theme & audio state
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const savedMuted = localStorage.getItem('alexis_portfolio_muted');
    setIsMuted(savedMuted === null ? true : savedMuted === 'true');
  }, []);

  // Track scroll position for navbar background and spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'bio', 'terminal', 'projects', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const secId of sections) {
        const el = document.getElementById(secId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(secId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update pill slider position
  useEffect(() => {
    if (!pillBarRef.current || !sliderRef.current) return;
    const activeEl = pillBarRef.current.querySelector(`[data-section="${activeSection}"]`);
    if (activeEl) {
      const barRect = pillBarRef.current.getBoundingClientRect();
      const elRect = activeEl.getBoundingClientRect();
      const offsetLeft = elRect.left - barRect.left;
      const offsetTop = elRect.top - barRect.top;

      sliderRef.current.style.width = `${elRect.width}px`;
      sliderRef.current.style.height = `${elRect.height}px`;
      sliderRef.current.style.transform = `translate3d(${offsetLeft}px, ${offsetTop}px, 0)`;
      sliderRef.current.style.opacity = '1';
    }
  }, [activeSection]);

  const toggleSound = () => {
    const nextMuted = soundEngine.toggleMute();
    setIsMuted(nextMuted);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    soundEngine.playToggle();
  };

  const handleNavClick = (secId) => {
    setActiveSection(secId);
    setMobileOpen(false);
    soundEngine.playSuccess();
  };

  const navLinks = [
    { id: 'hero', label: 'INICIO' },
    { id: 'bio', label: 'BIOGRAFÍA' },
    { id: 'terminal', label: 'TERMINAL' },
    { id: 'projects', label: 'PROYECTOS' },
    { id: 'contact', label: 'CONTACTO' },
  ];

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="container nav-content">
          <a 
            href="#hero" 
            className="nav-brand" 
            onClick={() => handleNavClick('hero')}
            onMouseEnter={() => soundEngine.playHover()}
          >
            <div className="brand-text">
              <span className="brand-name">ALEXIS FERNANDO ROJAS</span>
              <span className="brand-role">Systems Engineering Student</span>
            </div>
          </a>

          {/* ReactBits Pill Nav */}
          <nav className="pill-nav-container" id="pill-nav-container">
            <div className="pill-nav-bar" id="pill-nav-bar" ref={pillBarRef}>
              <div className="pill-slider" id="pill-slider" ref={sliderRef}></div>

              <ul className="nav-links" id="nav-links">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                      data-section={link.id}
                      onClick={() => handleNavClick(link.id)}
                      onMouseEnter={() => soundEngine.playHover()}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="nav-actions">
            {/* Sound Toggle Button */}
            <button
              className={`btn-icon ${isMuted ? 'audio-muted' : ''}`}
              id="sound-toggle-btn"
              onClick={toggleSound}
              onMouseEnter={() => soundEngine.playHover()}
              aria-label="Alternar Efectos de Sonido"
              title={isMuted ? 'Activar Efectos de Sonido' : 'Silenciar Sonidos'}
            >
              <div className="audio-pulse"></div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                {!isMuted && (
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                )}
              </svg>
            </button>

            {/* Theme Switcher Button */}
            <button
              className="btn-icon"
              id="theme-toggle-btn"
              onClick={toggleTheme}
              onMouseEnter={() => soundEngine.playHover()}
              aria-label="Alternar Tema Claro/Oscuro"
              title="Cambiar Tema"
            >
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>

            {/* Mobile Toggle Hamburger */}
            <button
              className={`mobile-toggle ${mobileOpen ? 'active' : ''}`}
              id="mobile-toggle"
              onClick={() => {
                setMobileOpen(!mobileOpen);
                soundEngine.playClick();
              }}
              aria-label="Abrir Menú Móvil"
            >
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <div 
        className={`mobile-nav-overlay ${mobileOpen ? 'active' : ''}`} 
        id="mobile-nav-overlay" 
        aria-hidden={!mobileOpen}
        onClick={(e) => {
          if (e.target.id === 'mobile-nav-overlay') setMobileOpen(false);
        }}
      >
        <div className="mobile-nav-sheet">
          <div className="mobile-nav-top">
            <span className="mobile-nav-label">Navegación</span>
            <button 
              className="mobile-nav-close" 
              onClick={() => {
                setMobileOpen(false);
                soundEngine.playClick();
              }}
              aria-label="Cerrar Menú"
            >
              ✕
            </button>
          </div>

          <ul className="mobile-nav-list" id="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
                  data-section={link.id}
                  onClick={() => handleNavClick(link.id)}
                >
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mobile-nav-socials">
            <a
              href="https://www.linkedin.com/in/alexis-fernando-rojas-94922b250"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-social-link"
            >
              <span>LinkedIn</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>
            <a
              href="https://github.com/AlexisRjs"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-social-link"
            >
              <span>GitHub</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
