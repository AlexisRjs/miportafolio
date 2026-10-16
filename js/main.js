/**
 * Main Application Controller
 * Handles UI animations, custom cursor, theme switching, projects, modals, and confetti.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Antigravity Canvas
  if (document.getElementById('antigravity-canvas')) {
    window.antigravityInstance = new AntigravityEngine('antigravity-canvas');
  }

  // 2. Initialize 3D Tilt Cards
  if (window.TiltCardController) {
    new TiltCardController();
  }

  // 2.2 Initialize Physical Draggable Lanyard Badge (ReactBits)
  if (window.LanyardBadge && document.getElementById('lanyard-container')) {
    window.lanyardInstance = new LanyardBadge('lanyard-container', {
      githubUrl: 'https://github.com/AlexisRjs',
      githubUsername: 'AlexisRjs',
      linkedinUrl: 'https://www.linkedin.com/in/alexis-fernando-rojas-94922b250',
      avatarUrl: 'assets/alexis-profile.png',
      badgeTitle: 'Alexis',
      badgeRole: 'Full Stack & Data Analyst'
    });
  }

  // 2.5 Initialize Reactive BorderGlow
  if (window.initAllBorderGlows) {
    window.initAllBorderGlows();
  }

  // 3. Initialize Interactive Terminal
  if (window.InteractiveTerminal) {
    new InteractiveTerminal();
  }

  // 4. Setup Theme Toggle (Dark / Light)
  setupThemeToggle();

  // 5. Setup Sound FX & Audio Indicator
  setupAudioControl();

  // 6. ReactBits Pill Nav (Sliding highlight capsule & color indicator)
  setupPillNav();

  // 7. Setup Magnetic Buttons
  setupMagneticButtons();

  // 8. Setup Interactive Bio Tabs
  setupBioTabs();

  // 9. Setup Projects Filter & Modal
  setupProjectsAndModal();

  // 10. Counter Animation on Scroll
  setupMetricCounters();

  // 11. Confetti & Contact Form
  setupContactForm();

  // 12. Infinite Marquee Auto-Duplicate
  setupInfiniteMarquee();

  // 13. Mobile Navigation Menu
  setupMobileNav();

  // 14. Smooth Navbar On Scroll
  setupScrollNavbar();

  // 15. Runaway "No Estoy Interesado" Dodging Button
  setupRunawayButton();
});

/**
 * THEME TOGGLE CONTROLLER
 */
function setupThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('alexis_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('alexis_theme', nextTheme);
      updateThemeIcon(nextTheme);

      if (window.antigravityInstance) {
        window.antigravityInstance.updateColors();
      }

      if (window.soundEngine) {
        window.soundEngine.playToggle();
      }
    });
  }
}

function updateThemeIcon(theme) {
  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');
  if (sunIcon && moonIcon) {
    if (theme === 'light') {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    } else {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
  }
}

/**
 * AUDIO CONTROLS
 */
function setupAudioControl() {
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (!soundBtn) return;

  const updateButtonState = () => {
    if (window.soundEngine && window.soundEngine.muted) {
      soundBtn.classList.add('audio-muted');
      soundBtn.setAttribute('title', 'Activar efectos de sonido');
    } else {
      soundBtn.classList.remove('audio-muted');
      soundBtn.setAttribute('title', 'Silenciar efectos de sonido');
    }
  };

  updateButtonState();

  soundBtn.addEventListener('click', () => {
    if (window.soundEngine) {
      window.soundEngine.toggleMute();
      updateButtonState();
    }
  });

  // Attach hover sounds to interactive elements
  const interactiveEls = document.querySelectorAll('a, button, .btn, .tech-pill, .stat-tile, .project-card, .tech-marquee-badge');
  interactiveEls.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      if (window.soundEngine) window.soundEngine.playHover();
    });
  });
}

/**
 * REACTBITS PILL NAV CONTROLLER
 * Handles sliding highlight capsule, hover transitions, and scroll-spy.
 */
function setupPillNav() {
  const pillBar = document.getElementById('pill-nav-bar');
  const slider = document.getElementById('pill-slider');
  const navLinks = document.querySelectorAll('.pill-nav-bar .nav-link');
  if (!pillBar || !slider || !navLinks.length) return;

  function moveToElement(el) {
    const barRect = pillBar.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const offsetLeft = elRect.left - barRect.left;
    const offsetTop = elRect.top - barRect.top;

    slider.style.width = `${elRect.width}px`;
    slider.style.height = `${elRect.height}px`;
    slider.style.transform = `translate3d(${offsetLeft}px, ${offsetTop}px, 0)`;
    slider.style.opacity = '1';
  }

  function getActiveLink() {
    return document.querySelector('.pill-nav-bar .nav-link.active') || navLinks[0];
  }

  // Initial positioning after layout
  setTimeout(() => {
    const active = getActiveLink();
    if (active) moveToElement(active);
  }, 100);

  window.addEventListener('resize', () => {
    const active = getActiveLink();
    if (active) moveToElement(active);
  });

  // Hover transitions and high-contrast color indicators
  navLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      moveToElement(link);
      navLinks.forEach((l) => l.classList.remove('pill-hovered'));
      link.classList.add('pill-hovered');
      if (window.soundEngine) window.soundEngine.playClick();
    });

    link.addEventListener('click', () => {
      navLinks.forEach((l) => {
        l.classList.remove('active');
        l.classList.remove('pill-hovered');
      });
      link.classList.add('active');
      moveToElement(link);
    });
  });

  pillBar.addEventListener('mouseleave', () => {
    navLinks.forEach((l) => l.classList.remove('pill-hovered'));
    const active = getActiveLink();
    if (active) {
      moveToElement(active);
    }
  });

  // ScrollSpy to sync active link with current section
  const sections = ['hero', 'bio', 'terminal', 'projects', 'contact'];

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 200;

    sections.forEach((secId) => {
      const sec = document.getElementById(secId);
      if (!sec) return;
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        const correspondingLink = document.querySelector(`.pill-nav-bar .nav-link[data-section="${secId}"]`);
        if (correspondingLink && !correspondingLink.classList.contains('active')) {
          navLinks.forEach((l) => l.classList.remove('active'));
          correspondingLink.classList.add('active');
          if (!pillBar.matches(':hover')) {
            moveToElement(correspondingLink);
          }
        }
        const mobLink = document.querySelector(`.mobile-nav-link[data-section="${secId}"]`);
        if (mobLink && !mobLink.classList.contains('active')) {
          document.querySelectorAll('.mobile-nav-link').forEach((l) => l.classList.remove('active'));
          mobLink.classList.add('active');
        }
      }
    });
  }, { passive: true });
}

/**
 * MAGNETIC BUTTONS EFFECT
 */
function setupMagneticButtons() {
  const magneticBtns = document.querySelectorAll('[data-magnetic]');
  magneticBtns.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

/**
 * BIOGRAPHY ARCHITECTURE TABS
 */
function setupBioTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');

      tabBtns.forEach((b) => b.classList.remove('active'));
      tabPanels.forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      const activePanel = document.getElementById(`panel-${target}`);
      if (activePanel) {
        activePanel.classList.add('active');
      }

      if (window.soundEngine) window.soundEngine.playClick();
    });
  });
}

/**
 * PROJECTS DATA, FILTER & MODAL
 */
const projectsData = [
  {
    id: 'libremath',
    category: 'mern',
    categoryLabel: '⭐ Proyecto Principal • Rust / Tauri',
    title: 'LibreMath — Suite del Estudiante de Ingeniería',
    shortDesc: 'La navaja suiza del estudiante de ingeniería (UTN FRRO): software ultra veloz y liviano con backend nativo en Rust (Tauri 2), KaTeX, D3.js, notas Markdown y grafos de conocimiento.',
    tags: ['Rust', 'Tauri 2', 'TypeScript', 'KaTeX', 'D3.js', 'Tailwind CSS'],
    image: 'assets/libremath.png',
    visualGrad: 'linear-gradient(180deg, #182234 0%, #0c111c 100%)',
    iconSvg: `<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="8" y1="6" x2="16" y2="14"/><line x1="16" y1="6" x2="8" y2="14"/>`,
    fullDesc: 'Proyecto personal insignia desarrollado por Alexis Fernando Rojas para estudiantes de Ingeniería (UTN Rosario). Concebido tras una exhaustiva comparativa arquitectónica frente a Electron, Flet y Rust puro, implementando Tauri 2 (Rust + WebView2) para lograr un consumo mínimo de RAM (~35-70 MB), arranque en <1s, diagramación matemática KaTeX de alta fidelidad y grafos interactivos de conocimiento con D3.js.',
    architecture: [
      'Núcleo de alto rendimiento en Rust (Tauri 2) con acceso nativo al sistema de archivos para latencias sub-milisegundo',
      'Consumo ultra bajo de memoria (35-70 MB RAM) y empaquetado ligero (~5-10 MB) sin sobrecarga de Chromium ni Node empaquetado',
      'Motor de renderizado tipográfico KaTeX para fórmulas matemáticas complejas (cálculo multivariable, tensores, integrales)',
      'Visualizador interactivo de grafos de conocimiento a 60fps con D3.js y física de fuerzas para conectar temas del cursado',
      'Módulos específicos para asignaturas de UTN FRRO: Análisis Matemático I/II, Álgebra, Física I/II, Lógica y más'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/AlexisRjs/LibreMath'
  },
  {
    id: 'ecommerce-mern',
    category: 'mern',
    categoryLabel: 'Stack MERN',
    title: 'Plataforma E-Commerce MERN',
    shortDesc: 'Comercio electrónico desarrollado para Mueblería Hermanos Jota con catálogo reactivo, carrito de compras persistente, checkout seguro y panel administrativo.',
    tags: ['JavaScript', 'React', 'Node.js', 'Express.js', 'MongoDB'],
    image: 'assets/muebleria-hermanos-jota.png',
    visualGrad: 'linear-gradient(180deg, #131d18 0%, #090f0c 100%)',
    iconSvg: `<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>`,
    fullDesc: 'Plataforma integral de comercio electrónico desarrollada a medida para Mueblería Hermanos Jota bajo una arquitectura desacoplada. Integra autenticación por tokens JWT, navegación de catálogo de mobiliario con filtros interactivos, gestión de stock en tiempo real y panel de administración para supervisión de pedidos y clientes.',
    architecture: [
      'Frontend reactivo en React con Context API para gestión fluida del carrito de compras y catálogo de muebles',
      'API RESTful modular con Express.js y controladores desacoplados en Node.js',
      'Modelado de colecciones NoSQL con MongoDB y validaciones estrictas en Mongoose',
      'Autenticación robusta basada en JWT (JSON Web Tokens) y contraseñas hasheadas con bcryptjs'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/julianmuinos/Grupo_F_Comision_2_TT_Sprint_3-4_Muebleria_hnos_J'
  },
  {
    id: 'upl-regional-rosario',
    category: 'data',
    categoryLabel: 'Datos & Visualización',
    title: 'Auditorías Universitarias — Regional Rosario',
    shortDesc: 'Plataforma analítica con mapa vectorial interactivo de Rosario, rankings oficiales de auditoría y métricas de retención para la UNR.',
    tags: ['JavaScript', 'SVG Interactivo', 'Data Visualization', 'CSS Glassmorphism'],
    image: 'assets/auditorias%20universitarias.png',
    visualGrad: 'linear-gradient(180deg, #141b2b 0%, #070913 100%)',
    iconSvg: `<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>`,
    fullDesc: 'Plataforma interactiva de auditoría académica desarrollada para Universitarios por la Libertad Regional Rosario. Visualiza datos críticos de la Universidad Nacional de Rosario (UNR): tasa de graduación por cohorte, padrones de alumnos activos, costo por graduado efectivo y geolocalización de facultades e institutos mediante cartografía vectorial SVG personalizada.',
    architecture: [
      'Cartografía interactiva en SVG con delimitación de la costa del Río Paraná, cuadrícula de Rosario y nodos académicos',
      'Visualización y ranking de métricas oficiales de auditoría con comparativas regionales y nacionales',
      'Interfaz glassmorphism de alto contraste y animaciones sutiles para maximizar la legibilidad de datos',
      'Desarrollo modular en JavaScript nativo optimizado para fluidez total a 60fps'
    ],
    liveUrl: 'https://alexisrjs.github.io/UPLregionalRosario/',
    githubUrl: 'https://github.com/AlexisRjs/UPLregionalRosario'
  },
  {
    id: 'mapa-upl-utnfrro',
    category: 'mern',
    categoryLabel: 'Campus Web App',
    title: 'Mapa Interactivo UTN FRRO',
    shortDesc: 'Aplicación web interactiva que geolocaliza secretarías, dependencias, pisos, aulas y trámites clave para la comunidad de la UTN Rosario.',
    tags: ['JavaScript', 'HTML5', 'CSS3 Moderno', 'Campus UX'],
    image: 'assets/mata%20utnfrro.png',
    visualGrad: 'linear-gradient(180deg, #181922 0%, #0b0c12 100%)',
    iconSvg: `<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>`,
    fullDesc: 'Herramienta digital de orientación institucional para estudiantes y docentes de la UTN FRRO (Zeballos 1341). Ofrece ubicación directa de aulas de examen, secretarías (SAU, SeCyT, Académica, Administrativa), horarios de conmutador y trámites universitarios, eliminando la desorientación en los pasillos de la facultad.',
    architecture: [
      'Organización jerárquica de sedes, pisos y secretarías con datos actualizados de contacto y horarios',
      'Filtros instantáneos por área de gestión y trámites estudiantiles',
      'Diseño responsivo optimizado para navegación veloz en teléfonos inteligentes',
      'Carga ultrarrápida sin librerías pesadas externas'
    ],
    liveUrl: 'https://alexisrjs.github.io/MapaUPL-UTNFRRO/',
    githubUrl: 'https://github.com/AlexisRjs/MapaUPL-UTNFRRO'
  },
  {
    id: 'generador-posts-upl',
    category: 'data',
    categoryLabel: 'Full Stack & OCR',
    title: 'Generador de Posts UPL (Flyers & OCR)',
    shortDesc: 'Suite web y motor OCR en Python para automatizar el diseño y exportación de historias para redes (1080×1920 px) en UTN FRRO.',
    tags: ['Python', 'FastAPI', 'OpenCV', 'RapidOCR', 'JavaScript', 'HTML5 Canvas'],
    image: 'assets/generador%20de%20posts%20instagram.png',
    visualGrad: 'linear-gradient(180deg, #1f142b 0%, #0c0814 100%)',
    iconSvg: `<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>`,
    fullDesc: 'Herramienta integral de automatización y diseño oficial para Universitarios por la Libertad (UTN Facultad Regional Rosario). Procesa capturas de planillas de horarios y mesas de examen extrayendo datos con visión artificial y OCR en ~0.2s, delimitando aulas, especialidades y horarios con normalización difusa contra el catálogo oficial, renderizando piezas a 60fps con HTML5 Canvas.',
    architecture: [
      'Backend de alta velocidad en Python con FastAPI, RapidOCR (modelos ONNX PaddleOCR v4) y OpenCV para análisis matricial de celdas',
      'Motor de renderizado nativo sobre HTML5 Canvas a 1080×1920 px para exportación en calidad HD sin artefactos',
      'Algoritmo de desambiguación y normalización difusa de asignaturas frente al catálogo oficial de la facultad',
      'Soporte multi-historia automático para planillas extensas y selector interactivo por especialidad (ISI, IQ, IC, etc.)'
    ],
    liveUrl: 'https://generador-de-posts-upl.vercel.app',
    githubUrl: 'https://github.com/AlexisRjs/Generador-de-posts-UPL'
  }
];

function setupProjectsAndModal() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close-btn');
  const modalBody = document.getElementById('modal-body-content');

  // Render project cards
  renderProjects('all');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter');
      renderProjects(category);
      if (window.soundEngine) window.soundEngine.playClick();
    });
  });

  if (modalClose && modal) {
    modalClose.addEventListener('click', () => {
      closeProjectModal();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeProjectModal();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeProjectModal();
      }
    });
  }
}

function renderProjects(filterCategory) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const filtered = filterCategory === 'all' 
    ? projectsData 
    : projectsData.filter((p) => p.category === filterCategory);

  grid.innerHTML = '';

  filtered.forEach((p) => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('data-border-glow', '');
    card.setAttribute('data-glow-colors', 'rgba(255,255,255,0.95), rgba(210,230,255,0.85), rgba(41,151,255,0.45)');
    card.setAttribute('data-edge-sensitivity', '40');
    card.setAttribute('data-border-radius', '24');
    card.setAttribute('data-glow-radius', '90');
    card.innerHTML = `
      <div class="project-media">
        ${p.image ? `
          <img src="${p.image}" alt="${p.title}" class="project-img" loading="lazy" />
        ` : `
          <div class="project-visual-mock" style="background: ${p.visualGrad};">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              ${p.iconSvg || '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>'}
            </svg>
          </div>
        `}
        <span class="project-category-badge">${p.categoryLabel || p.category.toUpperCase()}</span>
      </div>
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.shortDesc}</p>
        <div class="project-tech-tags">
          ${p.tags.map(t => `<span class="project-tech-tag">${t}</span>`).join('')}
        </div>
        <div class="project-footer">
          <button class="project-link-btn view-details-btn" data-id="${p.id}">
            Ver Arquitectura
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <div style="display:flex; align-items:center; gap:8px;">
            ${p.liveUrl && p.liveUrl !== '#' ? `
              <a href="${p.liveUrl}" target="_blank" rel="noopener" class="btn-icon" style="width:34px; height:34px;" title="Ver Demo en Vivo">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
              </a>
            ` : ''}
            <a href="${p.githubUrl}" target="_blank" rel="noopener" class="btn-icon" style="width:34px; height:34px;" title="Ver Repositorio en GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
            </a>
          </div>
        </div>
      </div>
    `;

    grid.appendChild(card);
    if (window.BorderGlow) {
      new BorderGlow(card, {
        colors: ['rgba(255,255,255,0.95)', 'rgba(210,230,255,0.85)', 'rgba(41,151,255,0.45)'],
        edgeSensitivity: 40,
        borderRadius: 24,
        glowRadius: 90,
        glowIntensity: 1.2
      });
    }
  });

  // Attach modal detail openers
  const detailButtons = grid.querySelectorAll('.view-details-btn');
  detailButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-id');
      const project = projectsData.find((p) => p.id === projId);
      if (project) {
        openProjectModal(project);
      }
    });
  });
}

function openProjectModal(p) {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body-content');
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div style="display:flex; align-items:center; gap:12px; margin-bottom: 8px;">
      <span class="project-category-badge" style="position:static;">${p.categoryLabel || p.category.toUpperCase()}</span>
      <span style="color:var(--text-muted); font-family:var(--font-mono); font-size:0.8rem;">ID: #${p.id}</span>
    </div>
    <h2 style="font-family:var(--font-display); font-size:1.8rem; font-weight:800; line-height:1.2;">${p.title}</h2>
    
    ${p.image ? `
      <div style="width:100%; height:230px; border-radius:var(--radius-md); overflow:hidden; margin: 16px 0; border: 1px solid var(--border-subtle); background:#0e0e12;">
        <img src="${p.image}" alt="${p.title}" style="width:100%; height:100%; object-fit:cover; object-position:top center; display:block;" />
      </div>
    ` : `
      <div style="background:${p.visualGrad}; height:180px; border-radius:var(--radius-md); display:grid; place-items:center; margin: 12px 0;">
        <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          ${p.iconSvg || '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>'}
        </svg>
      </div>
    `}

    <div>
      <h4 style="font-family:var(--font-display); margin-bottom:8px; font-size:1.1rem;">Visión General</h4>
      <p style="color:var(--text-secondary); line-height:1.7;">${p.fullDesc}</p>
    </div>

    <div>
      <h4 style="font-family:var(--font-display); margin-bottom:12px; font-size:1.1rem;">Arquitectura y Decisiones Técnicas</h4>
      <ul style="list-style:none; display:flex; flex-direction:column; gap:10px;">
        ${p.architecture.map(item => `
          <li style="display:flex; align-items:flex-start; gap:10px; color:var(--text-primary); font-size:0.92rem;">
            <span class="check-icon" style="margin-top:2px;">✓</span>
            <span>${item}</span>
          </li>
        `).join('')}
      </ul>
    </div>

    <div>
      <h4 style="font-family:var(--font-display); margin-bottom:8px; font-size:1.1rem;">Stack Tecnológico</h4>
      <div class="project-tech-tags">
        ${p.tags.map(t => `<span class="project-tech-tag" style="padding:6px 12px; font-size:0.82rem;">${t}</span>`).join('')}
      </div>
    </div>

    <div style="display:flex; gap:16px; margin-top:16px; padding-top:16px; border-top:1px solid var(--border-subtle);">
      ${p.liveUrl && p.liveUrl !== '#' ? `
        <a href="${p.liveUrl}" target="_blank" rel="noopener" class="btn btn-primary" style="flex:1;">
          Demo en Vivo
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
        </a>
      ` : ''}
      <a href="${p.githubUrl}" target="_blank" rel="noopener" class="btn btn-secondary" style="flex:1;">
        Código GitHub
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
      </a>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (window.soundEngine) window.soundEngine.playClick();
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
  if (window.soundEngine) window.soundEngine.playClick();
}

/**
 * METRIC COUNTERS ANIMATION ON SCROLL
 */
function setupMetricCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = parseFloat(el.getAttribute('data-target') || '0');
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);

        animateCounter(el, targetVal, prefix, suffix, decimals, 1800);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  statNumbers.forEach((st) => observer.observe(st));
}

function animateCounter(el, target, prefix, suffix, decimals, duration) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // EaseOutExpo
    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current = start + (target - start) * easeProgress;

    el.textContent = `${prefix}${current.toFixed(decimals)}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/**
 * CONFETTI & CONTACT FORM SUBMIT
 */
function setupContactForm() {
  const form = document.getElementById('contact-form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name')?.value?.trim() || '';
      const email = document.getElementById('contact-email')?.value?.trim() || '';
      const message = document.getElementById('contact-message')?.value?.trim() || '';

      const submitBtn = form.querySelector('button[type="submit"]');
      const origText = submitBtn ? submitBtn.innerHTML : 'Enviar Mensaje';

      if (submitBtn) {
        submitBtn.innerHTML = `
          <svg style="animation:spin 1s linear infinite;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.3"></circle>
            <path d="M12 2a10 10 0 0 1 10 10"></path>
          </svg>
          Preparando Gmail...
        `;
        submitBtn.disabled = true;
      }

      // Configuración de correo a Gmail
      const recipient = 'alexisrojas2073@gmail.com';
      const subject = `Propuesta de proyecto, ${name}`;
      const body = message;

      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Abrir Gmail en una nueva pestaña
      const win = window.open(gmailUrl, '_blank');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        window.location.href = gmailUrl;
      }

      triggerConfetti();
      if (window.soundEngine) window.soundEngine.playSuccess();
      showToast('📬 Abriendo Gmail para enviar tu propuesta a alexisrojas2073@gmail.com');

      if (submitBtn) {
        submitBtn.innerHTML = `✓ Redirigido a Gmail`;
        submitBtn.style.background = 'var(--accent-emerald)';
      }

      form.reset();

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.innerHTML = origText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }
      }, 3000);
    });
  }
}

/**
 * CREDLY EMBED WIDGET TOGGLE
 */
function toggleCredlyWidget() {
  const dropdown = document.getElementById('credly-embed-dropdown');
  const btn = document.getElementById('credly-toggle-btn');
  const arrow = document.getElementById('credly-toggle-arrow');
  if (!dropdown) return;
  const isExpanded = dropdown.classList.toggle('active');
  if (btn) btn.setAttribute('aria-expanded', isExpanded);
  if (arrow) arrow.style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
  if (window.soundEngine && typeof window.soundEngine.playClick === 'function') {
    window.soundEngine.playClick();
  }
}
window.toggleCredlyWidget = toggleCredlyWidget;

/**
 * TOAST NOTIFICATION
 */
function showToast(msg) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: var(--bg-surface);
      color: var(--text-primary);
      padding: 14px 24px;
      border-radius: var(--radius-md);
      border: 1px solid var(--accent-cyan);
      box-shadow: 0 10px 30px rgba(0, 240, 255, 0.25);
      backdrop-filter: blur(16px);
      z-index: 10001;
      font-family: var(--font-mono);
      font-size: 0.88rem;
      transform: translateY(100px);
      opacity: 0;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.style.transform = 'translateY(0)';
  toast.style.opacity = '1';

  setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity = '0';
  }, 4000);
}

/**
 * CONFETTI ENGINE (PURE CANVAS)
 */
function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);

  const confettiPieces = [];
  const colors = ['#00f0ff', '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'];

  for (let i = 0; i < 90; i++) {
    confettiPieces.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 + 100,
      w: Math.random() * 8 + 4,
      h: Math.random() * 12 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 18,
      vy: -(Math.random() * 16 + 8),
      rot: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12,
      alpha: 1
    });
  }

  function drawConfetti() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    let active = false;

    confettiPieces.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.45; // gravity
      p.rot += p.rotSpeed;
      p.alpha -= 0.012;

      if (p.alpha > 0) {
        active = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
    });

    if (active) {
      requestAnimationFrame(drawConfetti);
    } else {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  requestAnimationFrame(drawConfetti);
}

/**
 * INFINITE MARQUEE CLONER
 */
function setupInfiniteMarquee() {
  const rows = document.querySelectorAll('.marquee-row');
  rows.forEach((row) => {
    const content = row.querySelector('.marquee-content');
    if (content) {
      const clone = content.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      row.appendChild(clone);
    }
  });
}

/**
 * MOBILE NAVIGATION MENU
 */
/**
 * MOBILE NAVIGATION MENU (OVERLAY DRAWER)
 */
function setupMobileNav() {
  const toggle = document.getElementById('mobile-toggle');
  const overlay = document.getElementById('mobile-nav-overlay');
  const closeBtn = document.getElementById('mobile-nav-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggle || !overlay) return;

  function openMenu() {
    overlay.classList.add('active');
    toggle.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (window.soundEngine) window.soundEngine.playClick();
  }

  function closeMenu() {
    overlay.classList.remove('active');
    toggle.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    if (overlay.classList.contains('active')) {
      closeMenu();
      if (window.soundEngine) window.soundEngine.playClick();
    } else {
      openMenu();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeMenu();
      if (window.soundEngine) window.soundEngine.playClick();
    });
  }

  // Close on clicking backdrop
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeMenu();
    }
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeMenu();
    }
  });

  // Handle clicking mobile nav links
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
      closeMenu();
      if (window.soundEngine) window.soundEngine.playSuccess();
    });
  });
}

/**
 * SCROLL NAVBAR EFFECT
 */
function setupScrollNavbar() {
  const nav = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

/**
 * RUNAWAY "NO ESTOY INTERESADO" BUTTON
 * 1. Uses a stable #runaway-anchor to maintain an immovable home reference point.
 * 2. Always strictly contained within the "Inicio" (#hero) section.
 * 3. Glides smoothly (gentle, controlled evasion) and turns RED while displaced.
 * 4. Never returns to home while the cursor is at or near the original position.
 * 5. Returns to home and turns BLACK only when the cursor moves away from the home spot.
 */
function setupRunawayButton() {
  const btn = document.getElementById('hero-btn-no-interesado');
  const anchor = document.getElementById('runaway-anchor');
  const hero = document.getElementById('hero');
  if (!btn || !anchor || !hero) return;

  let currentX = 0;
  let currentY = 0;
  let isFleeing = false;
  let lastDodgeTime = 0;

  function dodge(mouseX, mouseY) {
    const now = performance.now();
    // Throttle slightly (140ms) to ensure smooth, non-aggressive fluid glides
    if (now - lastDodgeTime < 140) return;
    lastDodgeTime = now;

    // Use stable anchor rect for exact, invariant home coordinates
    const anchorRect = anchor.getBoundingClientRect();
    const heroRect = hero.getBoundingClientRect();

    const homeCenterX = anchorRect.left + anchorRect.width / 2;
    const homeCenterY = anchorRect.top + anchorRect.height / 2;

    const curCenterX = homeCenterX + currentX;
    const curCenterY = homeCenterY + currentY;

    // Calculate evasion angle directly away from cursor
    let angle;
    if (typeof mouseX === 'number' && typeof mouseY === 'number') {
      angle = Math.atan2(curCenterY - mouseY, curCenterX - mouseX);
    } else {
      angle = Math.random() * Math.PI * 2;
    }

    // Add mild variation for natural organic feel
    angle += (Math.random() - 0.5) * 0.5;

    // Smooth, controlled glide distance (100px - 140px)
    const distance = 100 + Math.random() * 40;

    let targetX = currentX + Math.cos(angle) * distance;
    let targetY = currentY + Math.sin(angle) * distance;

    // Keep 100% visible inside #hero (safe margin of 24px)
    const btnRect = btn.getBoundingClientRect();
    const btnWidth = btnRect.width || anchorRect.width;
    const btnHeight = btnRect.height || anchorRect.height;
    const padding = 24;

    const minX = heroRect.left + padding - anchorRect.left;
    const maxX = heroRect.right - padding - btnWidth - anchorRect.left;
    const minY = heroRect.top + padding - anchorRect.top;
    const maxY = heroRect.bottom - padding - btnHeight - anchorRect.top;

    targetX = Math.max(minX, Math.min(maxX, targetX));
    targetY = Math.max(minY, Math.min(maxY, targetY));

    // If still too close to cursor after boundary clamping, glide along opposite vertical space
    if (typeof mouseX === 'number' && typeof mouseY === 'number') {
      const projX = homeCenterX + targetX;
      const projY = homeCenterY + targetY;
      if (Math.hypot(mouseX - projX, mouseY - projY) < 75) {
        targetY = (targetY > (minY + maxY) / 2) ? minY + 20 : maxY - 20;
        targetX = Math.max(minX, Math.min(maxX, targetX));
      }
    }

    currentX = targetX;
    currentY = targetY;
    isFleeing = true;

    // Red while evading
    btn.classList.add('is-fleeing');
    btn.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

    if (window.soundEngine) {
      window.soundEngine.playHover();
    }
  }

  function returnToHome() {
    if (!isFleeing && currentX === 0 && currentY === 0) return;
    currentX = 0;
    currentY = 0;
    isFleeing = false;
    // Returns smoothly to home and switches back to black
    btn.classList.remove('is-fleeing');
    btn.style.transform = 'translate3d(0, 0, 0)';
  }

  // 1. Cursor tracking
  document.addEventListener('mousemove', (e) => {
    // Immovable anchor coordinates
    const anchorRect = anchor.getBoundingClientRect();
    const homeCenterX = anchorRect.left + anchorRect.width / 2;
    const homeCenterY = anchorRect.top + anchorRect.height / 2;

    const curCenterX = homeCenterX + currentX;
    const curCenterY = homeCenterY + currentY;

    const distFromHome = Math.hypot(e.clientX - homeCenterX, e.clientY - homeCenterY);
    const distFromBtn = Math.hypot(e.clientX - curCenterX, e.clientY - curCenterY);

    if (!isFleeing) {
      // Button is currently resting at home: dodge if cursor approaches home or button
      if (distFromHome < 90 || distFromBtn < 80) {
        dodge(e.clientX, e.clientY);
      }
    } else {
      // Button has already dodged away:
      // Only dodge AGAIN if the cursor actually chases and approaches the button's CURRENT location!
      // Moving over the empty original slot will NOT trigger unnecessary movement.
      if (distFromBtn < 80) {
        dodge(e.clientX, e.clientY);
      } 
      // Return to home only when cursor moves away from both the home spot and current button position
      else if (distFromHome >= 120 && distFromBtn >= 100) {
        returnToHome();
      }
    }
  });

  // 2. Direct hover & touch triggers
  const triggers = ['mouseenter', 'mouseover', 'mousedown', 'pointerdown', 'touchstart', 'focus'];
  triggers.forEach((evt) => {
    btn.addEventListener(evt, (e) => {
      e.preventDefault();
      e.stopPropagation();
      btn.blur();
      const touch = e.touches ? e.touches[0] : e;
      dodge(touch ? touch.clientX : null, touch ? touch.clientY : null);
    }, { passive: false });
  });

  // 3. Return home if mouse leaves window
  document.addEventListener('mouseleave', () => {
    returnToHome();
  });

  // 4. Absolute block on click
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dodge();
    return false;
  });
}
