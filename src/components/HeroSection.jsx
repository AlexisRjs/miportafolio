import React, { useRef, useEffect } from 'react';
import LanyardCard from './LanyardCard';
import { soundEngine } from '../utils/soundEngine';

export default function HeroSection() {
  const runawayBtnRef = useRef(null);
  const runawayAnchorRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const btn = runawayBtnRef.current;
    const anchor = runawayAnchorRef.current;
    const hero = heroRef.current;
    if (!btn || !anchor || !hero) return;

    let currentX = 0;
    let currentY = 0;
    let lastDodgeTime = 0;

    const dodge = (mouseX, mouseY) => {
      const now = performance.now();
      if (now - lastDodgeTime < 140) return;
      lastDodgeTime = now;

      const anchorRect = anchor.getBoundingClientRect();
      const heroRect = hero.getBoundingClientRect();

      const homeCenterX = anchorRect.left + anchorRect.width / 2;
      const homeCenterY = anchorRect.top + anchorRect.height / 2;

      const curCenterX = homeCenterX + currentX;
      const curCenterY = homeCenterY + currentY;

      let angle;
      if (typeof mouseX === 'number' && typeof mouseY === 'number') {
        angle = Math.atan2(curCenterY - mouseY, curCenterX - mouseX);
      } else {
        angle = Math.random() * Math.PI * 2;
      }
      angle += (Math.random() - 0.5) * 0.5;

      const isMobile = window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches;
      const distance = isMobile ? (70 + Math.random() * 30) : (100 + Math.random() * 40);

      let targetX = currentX + Math.cos(angle) * distance;
      let targetY = currentY + Math.sin(angle) * distance;

      const btnRect = btn.getBoundingClientRect();
      const btnWidth = btnRect.width || anchorRect.width || 180;
      const btnHeight = btnRect.height || anchorRect.height || 48;
      const padding = 16;

      const viewportLeft = 12;
      const viewportRight = window.innerWidth - 12;
      const viewportTop = 75;
      const viewportBottom = window.innerHeight - 16;

      const effectiveLeft = Math.max(heroRect.left + padding, viewportLeft);
      const effectiveRight = Math.min(heroRect.right - padding, viewportRight);
      const effectiveTop = Math.max(heroRect.top + padding, viewportTop);
      const effectiveBottom = Math.min(heroRect.bottom - padding, viewportBottom);

      const minX = effectiveLeft - anchorRect.left;
      const maxX = effectiveRight - btnWidth - anchorRect.left;
      const minY = effectiveTop - anchorRect.top;
      const maxY = effectiveBottom - btnHeight - anchorRect.top;

      if (minX <= maxX) {
        targetX = Math.max(minX, Math.min(maxX, targetX));
      } else {
        targetX = (minX + maxX) / 2;
      }

      if (minY <= maxY) {
        targetY = Math.max(minY, Math.min(maxY, targetY));
      } else {
        targetY = (minY + maxY) / 2;
      }

      if (typeof mouseX === 'number' && typeof mouseY === 'number') {
        const projX = homeCenterX + targetX;
        const projY = homeCenterY + targetY;
        if (Math.hypot(mouseX - projX, mouseY - projY) < 65) {
          if (minY <= maxY) {
            targetY = (targetY > (minY + maxY) / 2) ? minY + 10 : maxY - 10;
          }
          if (minX <= maxX) {
            targetX = (targetX > (minX + maxX) / 2) ? minX + 10 : maxX - 10;
          }
        }
      }

      currentX = targetX;
      currentY = targetY;

      btn.style.transition = 'transform 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28)';
      btn.style.transform = `translate3d(${targetX.toFixed(1)}px, ${targetY.toFixed(1)}px, 0)`;
      soundEngine.playKey();
    };

    const handleMouseEnter = (e) => dodge(e.clientX, e.clientY);
    const handleTouchStart = (e) => {
      e.preventDefault();
      const t = e.touches[0];
      dodge(t ? t.clientX : null, t ? t.clientY : null);
    };

    btn.addEventListener('mouseenter', handleMouseEnter);
    btn.addEventListener('touchstart', handleTouchStart, { passive: false });

    return () => {
      btn.removeEventListener('mouseenter', handleMouseEnter);
      btn.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  const techPills = [
    'JavaScript (ES6+)', 'React', 'Node.js', 'Express.js', 'MongoDB',
    'SQL', 'Python', 'Power BI', 'R', 'Tableau', 'Git'
  ];

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="section-bg-art" aria-hidden="true">
        <img src="/assets/bg-hero.png" alt="" className="section-bg-art-img" loading="eager" decoding="async" />
        <div className="section-bg-art-overlay"></div>
      </div>

      <div className="container hero-grid">
        {/* Left Hero Details */}
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-line name-highlight">Full Stack Developer</span>
            <span className="hero-title-line name-highlight">&amp; Data Analyst</span>
          </h1>

          <p className="hero-subtitle">
            Estudiante de Ingeniería en Sistemas especializado en desarrollo web con el <strong>Stack MERN</strong> (MongoDB, Express, React, Node.js) y análisis estratégico de datos con <strong>SQL, Python, Power BI, R y Tableau</strong>.
          </p>

          <div className="hero-tags">
            {techPills.map((pill) => (
              <span key={pill} className="tech-pill">{pill}</span>
            ))}
          </div>

          <div className="hero-actions">
            <a 
              href="#projects" 
              className="btn btn-primary" 
              id="hero-cta-projects"
              onClick={() => soundEngine.playClick()}
              onMouseEnter={() => soundEngine.playHover()}
            >
              <span>Explorar Proyectos</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a 
              href="#contact" 
              className="btn btn-secondary" 
              id="hero-cta-contact"
              onClick={() => soundEngine.playClick()}
              onMouseEnter={() => soundEngine.playHover()}
            >
              <span>Iniciar Contacto</span>
            </a>
            <div className="runaway-anchor" id="runaway-anchor" ref={runawayAnchorRef}>
              <button 
                type="button" 
                className="btn btn-runaway" 
                id="hero-btn-no-interesado" 
                aria-label="No Estoy Interesado" 
                tabIndex="-1"
                ref={runawayBtnRef}
              >
                <span>No Estoy Interesado</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Physical Draggable Lanyard Badge */}
        <LanyardCard />
      </div>
    </section>
  );
}
