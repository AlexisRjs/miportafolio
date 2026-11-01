/**
 * Lanyard Badge - Interactive Physics Hanging Badge
 * Simulates a real-life physical conference lanyard badge with rope physics,
 * spring pendulum oscillation, 3D tilt, drag & release dynamics.
 */

class LanyardBadge {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.options = {
      githubUrl: options.githubUrl || 'https://github.com/AlexisRjs',
      githubUsername: options.githubUsername || 'AlexisRjs',
      linkedinUrl: options.linkedinUrl || 'https://www.linkedin.com/in/alexis-fernando-rojas-94922b250',
      instagramUrl: options.instagramUrl || 'https://instagram.com/alexisrojas.1',
      instagramUsername: options.instagramUsername || 'alexisrojas.1',
      avatarUrl: options.avatarUrl || 'assets/perfil.png',
      badgeTitle: options.badgeTitle || 'Alexis',
      badgeRole: options.badgeRole || 'Full Stack & Data Analyst',
      restLength: options.restLength || 135, // Length of lanyard strap
      stiffness: options.stiffness || 0.042, // Spring stiffness
      damping: options.damping || 0.89,      // Inertial damping
      gravity: options.gravity || 0.55,      // Downward gravity
      ...options
    };

    // Physics State
    this.anchor = { x: 0, y: 0 };
    this.pos = { x: 0, y: 0 };
    this.vel = { x: 0, y: 0 };
    this.restPos = { x: 0, y: 0 };
    this.rot = 0;
    this.rotVel = 0;

    // Interaction State
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    this.hasMoved = false;
    this.mouseOffset = { x: 0, y: 0 };
    this.animId = null;
    this.isSleeping = false;
    this.isMobile = false;

    // Particle Morphing State
    this.particles = [];
    this.particleCanvas = null;
    this.particleCtx = null;
    this.particlesReady = false;
    this.morphProgress = 0;
    this.isMorphing = false;
    this.morphAnimId = null;

    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="lanyard-wrapper" id="lanyard-wrapper">
        <canvas class="lanyard-rope-canvas" id="lanyard-rope-canvas"></canvas>
        <div class="lanyard-clip" id="lanyard-clip">
          <div class="lanyard-ring"></div>
          <div class="lanyard-hook"></div>
        </div>
        <div class="lanyard-card" id="lanyard-card" title="Arrastra el badge o interactúa con los enlaces">
          <div class="card-sheen" id="lanyard-sheen"></div>
          <div class="badge-hole"></div>
          <div class="badge-inner">
            <div class="badge-top-bar">
              <div class="badge-chip">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                </svg>
              </div>
            </div>

            <div class="badge-photo-container">
              <div class="badge-photo-frame" id="lanyard-photo-frame">
                <canvas class="badge-particle-canvas" id="lanyard-particle-canvas"></canvas>
                <img src="${this.options.avatarUrl}" alt="${this.options.badgeTitle}" class="badge-photo-img" id="lanyard-photo-img" loading="eager" decoding="sync" />
              </div>
            </div>

            <div class="badge-info">
              <h3 class="badge-name">${this.options.badgeTitle}</h3>
              <p class="badge-role">${this.options.badgeRole}</p>

              <div class="badge-social-pills">
                <a href="${this.options.githubUrl}" target="_blank" rel="noopener" class="badge-social-pill github" title="Abrir GitHub">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                  </svg>
                  <span>github.com/${this.options.githubUsername}</span>
                </a>

                <a href="${this.options.linkedinUrl}" target="_blank" rel="noopener" class="badge-social-pill linkedin" title="Abrir LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                  <span>linkedin.com/in/alexis-rojas</span>
                </a>

                <a href="${this.options.instagramUrl}" target="_blank" rel="noopener" class="badge-social-pill instagram" title="Abrir Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span>@${this.options.instagramUsername}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.card = this.container.querySelector('#lanyard-card');
    this.clip = this.container.querySelector('#lanyard-clip');
    this.canvas = this.container.querySelector('#lanyard-rope-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.sheen = this.container.querySelector('#lanyard-sheen');
    this.photoFrame = this.container.querySelector('#lanyard-photo-frame');
    this.photoImg = this.container.querySelector('#lanyard-photo-img');
    this.particleCanvas = this.container.querySelector('#lanyard-particle-canvas');
    if (this.particleCanvas) {
      this.particleCtx = this.particleCanvas.getContext('2d');
    }

    // Trigger face particle convergence on load
    if (this.photoImg) {
      if (this.photoImg.complete && this.photoImg.naturalWidth > 0) {
        setTimeout(() => this.triggerFaceParticleMorph(), 250);
      } else {
        this.photoImg.addEventListener('load', () => {
          setTimeout(() => this.triggerFaceParticleMorph(), 200);
        }, { once: true });
      }
    } else {
      setTimeout(() => this.triggerFaceParticleMorph(), 250);
    }

    this.updateDimensions();
    this.attachEvents();
    this.setupVisibilityObserver();
    this.setupThemeObserver();
    this.animate();
  }

  setupThemeObserver() {
    // Re-render rope whenever user switches between dark and light themes
    if ('MutationObserver' in window) {
      const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
          if (m.attributeName === 'data-theme') {
            this.render();
            break;
          }
        }
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    }
  }

  setupVisibilityObserver() {
    this.isVisible = true;
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          this.isVisible = entry.isIntersecting;
          if (this.isVisible) {
            this.wakeUp();
          }
        });
      }, { threshold: 0.05 });
      observer.observe(this.container);
    }
  }

  wakeUp() {
    if (this.isSleeping || !this.animId) {
      this.isSleeping = false;
      if (!this.animId && this.isVisible) {
        this.animate();
      }
    }
  }

  updateDimensions() {
    this.isMobile = window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches;
    const rect = this.container.getBoundingClientRect();
    // Clamp DPR to max 1.5 on mobile/touch screens to eliminate rasterization lag, 2 on desktop
    const rawDpr = window.devicePixelRatio || 1;
    this.dpr = this.isMobile ? Math.min(rawDpr, 1.5) : Math.min(rawDpr, 2);
    const contW = rect.width || 420;
    const contH = Math.max(rect.height || 550, 520);

    // Padding around the canvas bounds so the rope can draw far outside container without clipping
    this.padX = this.isMobile ? 180 : 350;
    this.padY = this.isMobile ? 120 : 200;
    this.canvasWidth = contW + this.padX * 2;
    this.canvasHeight = contH + this.padY * 2;

    this.canvas.width = Math.round(this.canvasWidth * this.dpr);
    this.canvas.height = Math.round(this.canvasHeight * this.dpr);
    this.canvas.style.position = 'absolute';
    this.canvas.style.left = `-${this.padX}px`;
    this.canvas.style.top = `-${this.padY}px`;
    this.canvas.style.width = `${this.canvasWidth}px`;
    this.canvas.style.height = `${this.canvasHeight}px`;

    // Anchor at top center of container (in local container coordinates)
    this.anchor.x = contW / 2;
    this.anchor.y = 0;

    // Resting badge position hanging directly beneath anchor (shorter strap on mobile to fit nicely inside container)
    this.restPos.x = this.anchor.x;
    const baseRestLen = this.isMobile ? Math.min(this.options.restLength, 85) : this.options.restLength;
    this.restPos.y = this.anchor.y + baseRestLen + (this.isMobile ? 35 : 60);

    if (!this.pos.x && !this.pos.y) {
      this.pos.x = this.restPos.x;
      this.pos.y = this.restPos.y;
    } else if (this.isSleeping) {
      this.pos.x = this.restPos.x;
      this.pos.y = this.restPos.y;
    }

    // Force an immediate redraw of the rope
    this.render();
  }

  attachEvents() {
    window.addEventListener('resize', () => this.updateDimensions());

    // Pointer down on card
    const onStart = (clientX, clientY, targetEl) => {
      // Don't drag if clicking directly on a link
      if (targetEl && targetEl.closest('a')) {
        return;
      }

      this.isDragging = true;
      this.hasMoved = false;
      this.wakeUp();
      this.dragStart.x = clientX;
      this.dragStart.y = clientY;

      const cardRect = this.card.getBoundingClientRect();
      this.mouseOffset.x = clientX - (cardRect.left + cardRect.width / 2);
      this.mouseOffset.y = clientY - (cardRect.top + 30);

      this.card.classList.add('dragging');
      if (window.soundEngine) window.soundEngine.playHover();
    };

    const onMove = (clientX, clientY) => {
      if (!this.isDragging) return;

      const contRect = this.container.getBoundingClientRect();
      const targetX = clientX - contRect.left - this.mouseOffset.x;
      const targetY = clientY - contRect.top - this.mouseOffset.y;

      const distMoved = Math.hypot(clientX - this.dragStart.x, clientY - this.dragStart.y);
      if (distMoved > 7) {
        this.hasMoved = true;
      }

      // Constrain position with elastic pull and physical rope max stretch
      const rawTargetX = targetX;
      const rawTargetY = Math.max(targetY, 40); // Don't let it drag above anchor

      // Max physical rope stretch distance (e.g., 420px max radius from anchor)
      const maxRopeLen = 420;
      const distFromAnchor = Math.hypot(rawTargetX - this.anchor.x, rawTargetY - this.anchor.y);

      let finalX = rawTargetX;
      let finalY = rawTargetY;

      if (distFromAnchor > maxRopeLen) {
        // Elastic rubber band resistance beyond max rope length
        const excess = distFromAnchor - maxRopeLen;
        const resistedDist = maxRopeLen + Math.pow(excess, 0.72) * 2.5;
        const angle = Math.atan2(rawTargetY - this.anchor.y, rawTargetX - this.anchor.x);
        finalX = this.anchor.x + Math.cos(angle) * resistedDist;
        finalY = this.anchor.y + Math.sin(angle) * resistedDist;
      }

      this.vel.x = (finalX - this.pos.x) * 0.48;
      this.vel.y = (finalY - this.pos.y) * 0.48;
      this.pos.x = finalX;
      this.pos.y = finalY;
    };

    const onEnd = () => {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.card.classList.remove('dragging');

      if (this.hasMoved) {
        if (window.soundEngine) window.soundEngine.playClick();
      }
    };

    // Mouse Listeners
    this.card.addEventListener('mousedown', (e) => {
      if (!e.target.closest('a')) {
        e.preventDefault();
      }
      onStart(e.clientX, e.clientY, e.target);
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        onMove(e.clientX, e.clientY);
      }
    });

    window.addEventListener('mouseup', () => onEnd());

    // Touch Listeners for Mobile
    this.card.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        onStart(e.touches[0].clientX, e.touches[0].clientY, e.target);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (this.isDragging && e.touches.length > 0) {
        onMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchend', () => onEnd());
  }

  triggerFaceScan() {
    this.triggerFaceParticleMorph();
  }

  triggerFaceParticleMorph() {
    if (!this.photoFrame || !this.particleCanvas || !this.particleCtx) return;
    this.wakeUp();

    // If particles haven't been sampled from the photo yet, sample now
    if (!this.particlesReady) {
      this.sampleFaceParticles();
    } else {
      this.resetFaceParticles();
    }

    if (this.particles.length === 0) {
      if (this.photoImg) this.photoImg.classList.add('is-revealed');
      return;
    }

    if (this.photoImg) {
      this.photoImg.classList.remove('is-revealed');
    }

    this.isMorphing = true;
    this.morphProgress = 0;
    const startTime = performance.now();
    const duration = 1600; // 1.6s smooth cinematic convergence

    if (this.morphAnimId) {
      cancelAnimationFrame(this.morphAnimId);
    }

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const easeOutBack = (t) => {
      const c1 = 1.25;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };

    const step = (now) => {
      const elapsed = now - startTime;
      const rawP = Math.min(elapsed / duration, 1);
      this.morphProgress = rawP;

      const pPos = easeOutBack(Math.min(rawP * 1.08, 1));
      const pAlpha = easeOutCubic(Math.min(rawP * 1.2, 1));

      this.renderFaceParticles(pPos, pAlpha, rawP);

      // Once particles lock into place (around 70% progress), smoothly cross-fade the high-res crisp portrait image
      if (rawP >= 0.70 && this.photoImg && !this.photoImg.classList.contains('is-revealed')) {
        this.photoImg.classList.add('is-revealed');
      }

      if (rawP < 1) {
        this.morphAnimId = requestAnimationFrame(step);
      } else {
        this.isMorphing = false;
        this.morphAnimId = null;
        // Fade out particle canvas cleanly after the photo is fully visible
        setTimeout(() => {
          if (!this.isMorphing && this.particleCtx && this.particleCanvas) {
            this.particleCtx.clearRect(0, 0, this.particleCanvas.width, this.particleCanvas.height);
          }
        }, 400);
      }
    };

    this.morphAnimId = requestAnimationFrame(step);
  }

  sampleFaceParticles() {
    if (!this.photoImg || !this.photoFrame) return;

    const frameRect = this.photoFrame.getBoundingClientRect();
    const w = Math.round(frameRect.width || 220);
    const h = Math.round(frameRect.height || 250);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.particleCanvas.width = w * dpr;
    this.particleCanvas.height = h * dpr;
    this.particleCanvas.style.width = `${w}px`;
    this.particleCanvas.style.height = `${h}px`;
    this.particleCtx.setTransform(1, 0, 0, 1, 0, 0);
    this.particleCtx.scale(dpr, dpr);

    // Create an offscreen canvas to sample pixels from the real loaded face image
    const offCanvas = document.createElement('canvas');
    offCanvas.width = w;
    offCanvas.height = h;
    const offCtx = offCanvas.getContext('2d');
    if (!offCtx) return;

    // Draw the image exactly matching CSS object-fit: contain
    const imgW = this.photoImg.naturalWidth || w;
    const imgH = this.photoImg.naturalHeight || h;
    const imgRatio = imgW / imgH;
    const frameRatio = w / h;

    let drawW, drawH, drawX, drawY;
    if (imgRatio > frameRatio) {
      drawW = w;
      drawH = w / imgRatio;
      drawX = 0;
      drawY = (h - drawH) / 2;
    } else {
      drawH = h;
      drawW = h * imgRatio;
      drawX = (w - drawW) / 2;
      drawY = 0;
    }

    try {
      offCtx.drawImage(this.photoImg, drawX, drawY, drawW, drawH);
      const imgData = offCtx.getImageData(0, 0, w, h).data;

      // Sample step: 3px on desktop, 4px on mobile for optimal density and 60fps performance
      const step = this.isMobile ? 4 : 3;
      this.particles = [];

      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const idx = (y * w + x) * 4;
          const a = imgData[idx + 3];
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];

          // Check if pixel belongs to Alexis' face/figure (not transparent and visible)
          if (a > 40 && (r > 15 || g > 15 || b > 15)) {
            // Determine side of origin: 0 = left, 1 = right, 2 = top
            const side = Math.floor(Math.random() * 3);
            let startX, startY;
            if (side === 0) {
              // Left
              startX = -Math.random() * (w * 0.9) - 30;
              startY = y + (Math.random() - 0.5) * (h * 0.6);
            } else if (side === 1) {
              // Right
              startX = w + Math.random() * (w * 0.9) + 30;
              startY = y + (Math.random() - 0.5) * (h * 0.6);
            } else {
              // Top
              startX = x + (Math.random() - 0.5) * (w * 0.7);
              startY = -Math.random() * (h * 0.9) - 30;
            }

            // Monochrome grayscale tone (pure blacks, charcoals, and silvery grays)
            const luminance = Math.round(r * 0.299 + g * 0.587 + b * 0.114);
            // Random flight tone: varying from deep black (15-40) to mid/light gray (110-190)
            const initialGray = Math.random() < 0.45
              ? Math.floor(15 + Math.random() * 35) // Deep black / charcoal
              : Math.floor(95 + Math.random() * 95); // Sleek metallic gray

            this.particles.push({
              targetX: x,
              targetY: y,
              startX: startX,
              startY: startY,
              // Jitter/curl effect in transit
              swayFreq: 1.5 + Math.random() * 3,
              swayAmp: (Math.random() - 0.5) * 22,
              delay: Math.random() * 0.28, // slight stagger so points arrive in a dynamic wave
              size: (step * 0.75) + Math.random() * 0.6,
              r: r,
              g: g,
              b: b,
              luminance: luminance,
              initialGray: initialGray,
              a: a / 255
            });
          }
        }
      }

      this.particlesReady = true;
    } catch (e) {
      console.warn('Could not sample image pixels (CORS or canvas error):', e);
      this.particlesReady = false;
      if (this.photoImg) this.photoImg.classList.add('is-revealed');
    }
  }

  resetFaceParticles() {
    if (!this.particleCanvas || !this.photoFrame) return;
    const w = this.particleCanvas.width / (Math.min(window.devicePixelRatio || 1, 2));
    const h = this.particleCanvas.height / (Math.min(window.devicePixelRatio || 1, 2));

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const side = Math.floor(Math.random() * 3);
      if (side === 0) {
        // Left
        p.startX = -Math.random() * (w * 0.9) - 30;
        p.startY = p.targetY + (Math.random() - 0.5) * (h * 0.6);
      } else if (side === 1) {
        // Right
        p.startX = w + Math.random() * (w * 0.9) + 30;
        p.startY = p.targetY + (Math.random() - 0.5) * (h * 0.6);
      } else {
        // Top
        p.startX = p.targetX + (Math.random() - 0.5) * (w * 0.7);
        p.startY = -Math.random() * (h * 0.9) - 30;
      }
    }
  }

  renderFaceParticles(pPos, pAlpha, rawProgress) {
    if (!this.particleCtx || !this.particleCanvas) return;
    const w = this.particleCanvas.width;
    const h = this.particleCanvas.height;

    this.particleCtx.clearRect(0, 0, w, h);

    const isLightMode = document.documentElement.getAttribute('data-theme') === 'light';

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Stagger per-particle progress
      const adjustedP = Math.max(0, Math.min(1, (rawProgress - p.delay) / (1 - p.delay)));
      if (adjustedP <= 0) continue;

      // Ease position
      const ease = 1 - Math.pow(1 - adjustedP, 3);
      const curX = p.startX + (p.targetX - p.startX) * ease;
      // Perpendicular wave sway that dampens as particles approach target
      const sway = Math.sin(adjustedP * Math.PI * p.swayFreq) * p.swayAmp * (1 - adjustedP);
      const curY = p.startY + (p.targetY - p.startY) * ease + sway;

      // Dot opacity rises quickly then settles
      const alpha = Math.min(adjustedP * 1.4, 1) * p.a;

      // Color: Pure black and gray particle palette matching the monochrome photo
      let drawR = p.r;
      let drawG = p.g;
      let drawB = p.b;

      if (adjustedP < 0.85) {
        const flightLerp = 1 - (adjustedP / 0.85);
        // Interpolate smoothly from flying black/gray to exact face pixel tone
        const gVal = p.initialGray;
        drawR = Math.round(p.r * (1 - flightLerp) + gVal * flightLerp);
        drawG = Math.round(p.g * (1 - flightLerp) + gVal * flightLerp);
        drawB = Math.round(p.b * (1 - flightLerp) + gVal * flightLerp);
      }

      this.particleCtx.fillStyle = `rgba(${drawR}, ${drawG}, ${drawB}, ${alpha.toFixed(2)})`;
      this.particleCtx.fillRect(curX, curY, p.size, p.size);
    }
  }

  animate() {
    if (!this.isVisible || this.isSleeping) {
      this.animId = null;
      return;
    }
    this.updatePhysics();
    this.render();
    if (this.isSleeping) {
      this.animId = null;
      return;
    }
    this.animId = requestAnimationFrame(() => this.animate());
  }

  updatePhysics() {
    if (!this.isDragging) {
      // Spring force toward static resting position
      const fx = -this.options.stiffness * (this.pos.x - this.restPos.x);
      const fy = -this.options.stiffness * (this.pos.y - this.restPos.y);

      this.vel.x = (this.vel.x + fx) * this.options.damping;
      this.vel.y = (this.vel.y + fy) * this.options.damping;

      // Threshold to stop micro-jitter and put physics engine to sleep
      if (
        Math.abs(this.vel.x) < 0.003 &&
        Math.abs(this.vel.y) < 0.003 &&
        Math.abs(this.pos.x - this.restPos.x) < 0.05 &&
        Math.abs(this.pos.y - this.restPos.y) < 0.05
      ) {
        this.pos.x = this.restPos.x;
        this.pos.y = this.restPos.y;
        this.vel.x = 0;
        this.vel.y = 0;
        this.rot = 0;
        this.rotVel = 0;
        this.isSleeping = true;
      } else {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
      }
    }

    // Dynamic rotation based strictly on horizontal swing displacement & velocity
    const dx = this.pos.x - this.anchor.x;
    const targetRot = (dx / 180) * 30 + (this.vel.x * 2.2);
    this.rot += (targetRot - this.rot) * 0.2;
    if (!this.isDragging && Math.abs(this.rot) < 0.01) {
      this.rot = 0;
    }
  }

  render() {
    if (!this.ctx || !this.canvas) return;

    // Ensure transform matrix matches current canvas DPR
    const dpr = this.dpr || 1;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Points in canvas local space (offset by padX and padY)
    const startX = this.anchor.x + this.padX;
    const startY = this.anchor.y + this.padY;

    // The card is centered horizontally at this.pos.x
    // Top of the card is at this.pos.y
    // The clip is positioned with bottom hook inside hole, and top of ring at this.pos.y - 13px
    const endX = this.pos.x + this.padX;
    const endY = (this.pos.y - 13) + this.padY;

    // Control points for natural gravity curve
    const midX = (startX + endX) / 2 + (this.vel.x * 2.8);
    const midY = (startY + endY) / 2 + Math.abs(endX - startX) * 0.16;

    // 1. Draw Ribbon (Dynamic Theme: White in Dark Mode, Black in Light Mode)
    const isLightMode = document.documentElement.getAttribute('data-theme') === 'light';
    const outerStroke = isLightMode ? '#181b1e' : '#e4e7ec';
    const innerStroke = isLightMode ? '#272b30' : '#f8f9fa';
    const shadowColor = isLightMode ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.55)';

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.quadraticCurveTo(midX, midY, endX, endY);
    this.ctx.lineWidth = 16;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = outerStroke;
    
    // Omit CPU-bound shadowBlur on mobile devices for buttery smooth 60fps
    if (!this.isMobile) {
      this.ctx.shadowColor = shadowColor;
      this.ctx.shadowBlur = 8;
    }
    this.ctx.stroke();

    // Inner Ribbon Body
    this.ctx.lineWidth = 12;
    this.ctx.strokeStyle = innerStroke;
    this.ctx.stroke();
    this.ctx.restore();

    // 2. Position Metallic Clip - Perfectly centered in native container coordinates
    if (this.clip) {
      this.clip.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y + 18}px, 0) translate(-50%, -100%) rotate(${this.rot * 0.85}deg)`;
    }

    // 3. Position and Rotate Badge Card
    if (this.card) {
      if (this.isSleeping || (!this.isDragging && Math.abs(this.vel.x) < 0.005 && Math.abs(this.vel.y) < 0.005 && Math.abs(this.rot) < 0.02)) {
        this.card.style.transform = `translate3d(${Math.round(this.pos.x)}px, ${Math.round(this.pos.y)}px, 0) translate(-50%, 0)`;
      } else if (this.isMobile) {
        // Fast hardware-accelerated 2D swing on mobile (bypasses heavy 3D matrix recomposition)
        this.card.style.transform = `translate3d(${this.pos.x.toFixed(1)}px, ${this.pos.y.toFixed(1)}px, 0) translate(-50%, 0) rotateZ(${this.rot.toFixed(1)}deg)`;
      } else {
        const dynamicTiltX = -this.vel.y * 1.6;
        const dynamicTiltY = this.vel.x * 2.4;
        this.card.style.transform = `translate3d(${this.pos.x.toFixed(1)}px, ${this.pos.y.toFixed(1)}px, 0) translate(-50%, 0) rotateZ(${this.rot.toFixed(2)}deg) rotateX(${dynamicTiltX.toFixed(2)}deg) rotateY(${dynamicTiltY.toFixed(2)}deg)`;
      }

      // Specular Sheen reflection
      if (this.sheen && !this.isMobile) {
        const sheenX = 50 + (this.rot * 2.5);
        this.sheen.style.background = `radial-gradient(circle at ${sheenX}% 30%, rgba(255,255,255,0.25), transparent 70%)`;
      }
    }
  }
}

window.LanyardBadge = LanyardBadge;

