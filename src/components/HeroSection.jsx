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
    let isFleeing = false;
    let dodgeCount = 0;
    let lastDodgeTime = 0;
    let idleTimer = null;
    let latestMouseX = null;
    let latestMouseY = null;

    const isCursorOverHome = () => {
      if (latestMouseX === null || latestMouseY === null) return false;
      const anchorRect = anchor.getBoundingClientRect();
      const pad = 12;
      return (
        latestMouseX >= anchorRect.left - pad &&
        latestMouseX <= anchorRect.right + pad &&
        latestMouseY >= anchorRect.top - pad &&
        latestMouseY <= anchorRect.bottom + pad
      );
    };

    const returnToHome = () => {
      if (isCursorOverHome()) {
        resetIdleTimer();
        return;
      }
      if (idleTimer) {
        clearTimeout(idleTimer);
        idleTimer = null;
      }
      currentX = 0;
      currentY = 0;
      isFleeing = false;
      dodgeCount = 0;
      btn.classList.remove('is-fleeing');
      btn.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease';
      btn.style.transform = 'translate3d(0, 0, 0)';
    };

    const resetIdleTimer = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (isFleeing || currentX !== 0 || currentY !== 0) {
          if (isCursorOverHome()) {
            // Postpone returning as long as cursor is directly over home position
            resetIdleTimer();
          } else {
            returnToHome();
          }
        }
      }, 1000);
    };

    const dodge = (mouseX, mouseY) => {
      const now = performance.now();
      if (now - lastDodgeTime < 140) return;
      lastDodgeTime = now;

      dodgeCount++;

      // If user has already pursued/chased the button twice, smoothly return to home position
      if (dodgeCount > 2) {
        returnToHome();
        return;
      }

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
      isFleeing = true;

      // Turn red while evading
      btn.classList.add('is-fleeing');
      btn.style.transition = 'transform 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28), background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease';
      btn.style.transform = `translate3d(${targetX.toFixed(1)}px, ${targetY.toFixed(1)}px, 0)`;
      soundEngine.playKey();

      // Whenever button flees, arm the return timer so it automatically comes home if user doesn't pursue
      resetIdleTimer();
    };

    const handleMouseMove = (e) => {
      latestMouseX = e.clientX;
      latestMouseY = e.clientY;

      const anchorRect = anchor.getBoundingClientRect();
      const homeCenterX = anchorRect.left + anchorRect.width / 2;
      const homeCenterY = anchorRect.top + anchorRect.height / 2;

      const curCenterX = homeCenterX + currentX;
      const curCenterY = homeCenterY + currentY;

      const distFromHome = Math.hypot(e.clientX - homeCenterX, e.clientY - homeCenterY);
      const distFromBtn = Math.hypot(e.clientX - curCenterX, e.clientY - curCenterY);

      if (!isFleeing) {
        if (distFromHome < 90 || distFromBtn < 80) {
          dodge(e.clientX, e.clientY);
        }
      } else {
        if (distFromBtn < 80) {
          dodge(e.clientX, e.clientY);
        } else if (distFromBtn >= 130 && distFromHome >= 120) {
          // If cursor moved away after dodging, return smoothly to home position
          returnToHome();
        }
      }
    };

    const handleMouseEnter = (e) => dodge(e.clientX, e.clientY);
    const handleTouchStart = (e) => {
      e.preventDefault();
      const t = e.touches[0];
      dodge(t ? t.clientX : null, t ? t.clientY : null);
    };

    // Return to home when mouse leaves window or document
    const handleMouseLeaveDoc = (e) => {
      if (!e.relatedTarget && !e.toElement) {
        latestMouseX = null;
        latestMouseY = null;
        returnToHome();
      }
    };

    const handleWindowBlur = () => returnToHome();
    const handleWindowScroll = () => {
      if (isFleeing) returnToHome();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeaveDoc);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    btn.addEventListener('mouseenter', handleMouseEnter);
    btn.addEventListener('touchstart', handleTouchStart, { passive: false });

    return () => {
      if (idleTimer) clearTimeout(idleTimer);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveDoc);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('scroll', handleWindowScroll);
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
            >
              <span>Explorar Proyectos</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a 
              href="#contact" 
              className="btn btn-secondary" 
              id="hero-cta-contact"
              onClick={() => soundEngine.playClick()}
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
