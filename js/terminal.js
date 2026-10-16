/**
 * Interactive Terminal CLI - Alexis Fernando Rojas
 * Provides a futuristic developer sandbox with 25+ rich CLI commands,
 * including visual physics sabotage collapse simulation, matrix decoders,
 * dev jokes, audio synthesizers, and easter eggs.
 */
class InteractiveTerminal {
  constructor() {
    this.body = document.getElementById('terminal-body');
    this.input = document.getElementById('terminal-input');
    this.quickButtons = document.querySelectorAll('.quick-btn');
    this.history = [];
    this.historyIndex = -1;
    this.isSabotaging = false;

    // Command registry restricted strictly to the user's requested set
    this.commands = {
      // 1. Sabotear Código
      sabotear: () => this.cmdSabotage(),
      'sabotear codigo': () => this.cmdSabotage(),
      'sabotear-codigo': () => this.cmdSabotage(),

      // 2. Help
      help: () => this.cmdHelp(),
      ayuda: () => this.cmdHelp(),

      // 3. Skills
      skills: () => this.cmdSkills(),
      habilidades: () => this.cmdSkills(),

      // 4. Projects
      projects: () => this.cmdProjects(),
      proyectos: () => this.cmdProjects(),

      // 5. Bio
      bio: () => this.cmdBio(),
      about: () => this.cmdBio(),
      sobremi: () => this.cmdBio(),

      // 6. Contact
      contact: () => this.cmdContact(),
      contacto: () => this.cmdContact(),

      // 7. MERN
      mern: () => this.cmdMern(),
      stack: () => this.cmdMern(),

      // 8. Hack Your Computer (Interactive 3-second full-screen Matrix scare prank)
      'hack your computer': () => this.cmdHack(),
      hack: () => this.cmdHack(),

      // 9. Joke
      joke: () => this.cmdJoke(),
      chiste: () => this.cmdJoke(),

      // 10. Quote (en español)
      quote: () => this.cmdQuote(),
      frase: () => this.cmdQuote(),

      // 11. Ping
      ping: () => this.cmdPing(),

      // 12. Secret
      secret: () => this.cmdSecret(),
      secreto: () => this.cmdSecret(),

      // 13. Theme
      theme: () => this.cmdTheme(),
      tema: () => this.cmdTheme(),

      // 14. Clear
      clear: () => this.cmdClear(),
      cls: () => this.cmdClear(),
      limpiar: () => this.cmdClear()
    };

    this.init();
  }

  init() {
    if (!this.input || !this.body) return;

    this.input.addEventListener('keydown', (e) => {
      if (window.soundEngine) window.soundEngine.playKey();

      if (e.key === 'Enter') {
        const raw = this.input.value.trim();
        this.input.value = '';
        if (raw) {
          this.history.push(raw);
          this.historyIndex = this.history.length;
          this.executeCommand(raw);
        }
      } else if (e.key === 'ArrowUp') {
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex];
        }
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
        e.preventDefault();
      }
    });

    this.quickButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const cmd = btn.getAttribute('data-cmd');
        if (cmd) {
          this.executeCommand(cmd);
          if (window.soundEngine) window.soundEngine.playClick();
        }
      });
    });
  }

  printLine(html) {
    const line = document.createElement('div');
    line.className = 'terminal-log';
    line.innerHTML = html;
    this.body.appendChild(line);
    this.body.scrollTop = this.body.scrollHeight;
  }

  executeCommand(cmdText) {
    const rawTrim = cmdText.trim();
    if (!rawTrim) return;

    const normalized = rawTrim
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    this.printLine(`<span class="terminal-prompt">&gt; alexis-sh ~ $</span> <span class="yellow">${this.escapeHTML(rawTrim)}</span>`);

    const parts = normalized.split(/\s+/);
    const mainCmd = parts[0];

    if (this.commands[normalized]) {
      this.commands[normalized](rawTrim);
    } else if (this.commands[mainCmd]) {
      this.commands[mainCmd](rawTrim);
    } else {
      this.printLine(`<span style="color:#ef4444;">Comando no reconocido: "${this.escapeHTML(rawTrim)}". Escribe <span class="cyan">help</span> para ver los comandos disponibles.</span>`);
    }
  }

  cmdHelp() {
    this.printLine(`
      <div style="margin: 4px 0; line-height: 1.6; font-family: monospace;">
        <span class="cyan" style="font-weight:700;">COMANDOS DISPONIBLES:</span><br><br>
        <span class="yellow">[PERFIL & CODIGO]</span><br>
        &nbsp;&nbsp;<span class="emerald">skills</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Stack tecnologico y herramientas de desarrollo.<br>
        &nbsp;&nbsp;<span class="emerald">projects</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lista de proyectos y enlaces a repositorios.<br>
        &nbsp;&nbsp;<span class="emerald">bio</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Educacion formal y certificaciones profesionales.<br>
        &nbsp;&nbsp;<span class="emerald">contact</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Informacion de contacto y perfiles tecnicos.<br>
        &nbsp;&nbsp;<span class="emerald">mern</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Diagrama de flujo del Stack MERN.<br><br>
        <span class="yellow">[INTERACCION]</span><br>
        &nbsp;&nbsp;<span class="red" style="font-weight:700;">sabotear codigo</span>&nbsp;&nbsp;&nbsp;Colapso de CSS y autoreconstruccion en 3s.<br>
        &nbsp;&nbsp;<span class="emerald" style="font-weight:700;">hack your computer</span>&nbsp;Simulacion de pantalla azul (BSOD) en pantalla completa durante 3s.<br>
        &nbsp;&nbsp;<span class="emerald">joke</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Chiste de programacion.<br>
        &nbsp;&nbsp;<span class="emerald">quote</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cita tecnica en español.<br>
        &nbsp;&nbsp;<span class="emerald">ping</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Latencia de red simulada hacia localhost.<br>
        &nbsp;&nbsp;<span class="emerald">secret</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Detalles de implementacion interactiva.<br><br>
        <span class="yellow">[SISTEMA]</span><br>
        &nbsp;&nbsp;<span class="emerald">theme</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Alterna entre modo oscuro y claro.<br>
        &nbsp;&nbsp;<span class="emerald">clear</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Limpia el buffer de la terminal.<br>
        &nbsp;&nbsp;<span class="emerald">help</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Muestra este manual de ayuda.
      </div>
    `);
  }

  cmdSabotage() {
    if (this.isSabotaging) return;
    this.isSabotaging = true;

    this.printLine(`<span style="color:#ef4444; font-weight:700;">[SABOTAGE] Ejecutando colapso visual de nodos del DOM...</span>`);

    if (window.soundEngine) window.soundEngine.playClick();

    window.scrollTo({ top: 0, behavior: 'smooth' });

    const targetSelectors = [
      '#navbar',
      '#hero .hero-content',
      '#hero .lanyard-wrapper',
      '#bio .section-header',
      '#bio .bio-grid',
      '#projects .section-header',
      '#projects .projects-filter-bar',
      '#projects .projects-grid',
      '#contact .section-header',
      '#contact .contact-card-box',
      '.footer',
      '.floating-dock'
    ].join(', ');

    const elements = document.querySelectorAll(targetSelectors);
    document.body.classList.add('sabotage-mode');

    const fallClasses = ['sabotage-fall-left', 'sabotage-fall-right', 'sabotage-fall-center'];
    elements.forEach((el, index) => {
      el.classList.remove('sabotage-fall-left', 'sabotage-fall-right', 'sabotage-fall-center', 'sabotage-rebuilding');
      const chosenClass = fallClasses[index % fallClasses.length];
      el.classList.add(chosenClass);
    });

    let count = 3;
    const interval = setInterval(() => {
      count--;
      if (count > 0) {
        this.printLine(`<span style="color:#f97316;">[RESTORE] Restaurando componentes en ${count}s...</span>`);
      }
    }, 900);

    setTimeout(() => {
      clearInterval(interval);

      elements.forEach((el) => {
        el.classList.remove('sabotage-fall-left', 'sabotage-fall-right', 'sabotage-fall-center');
        el.classList.add('sabotage-rebuilding');
      });

      setTimeout(() => {
        elements.forEach((el) => {
          el.classList.remove('sabotage-rebuilding');
        });
        document.body.classList.remove('sabotage-mode');
        this.isSabotaging = false;
      }, 950);

      this.printLine(`<span class="emerald" style="font-weight:700;">[RESTORE_OK] Interfaz restaurada. Estado del DOM restablecido.</span>`);
      if (window.soundEngine) window.soundEngine.playSuccess();
    }, 3000);
  }

  cmdSkills() {
    this.printLine(`
      <div style="margin: 4px 0; font-family: monospace;">
        <span class="cyan">[SKILLS] Tecnologias Principales:</span><br>
        - <span class="violet">Stack MERN:</span> JavaScript (ES6+), React, Node.js, Express.js, MongoDB.<br>
        - <span class="violet">Analitica:</span> Python (Pandas, NumPy), Power BI, SQL, DAX.<br>
        - <span class="violet">Bases de datos & APIs:</span> MongoDB (NoSQL), PostgreSQL, MySQL, REST APIs, JWT.<br>
        - <span class="violet">Herramientas:</span> Git, GitHub, VS Code, Postman, Linux.<br>
        - <span class="violet">Ingenieria de Software:</span> Patrones de diseño, SOLID, clean code y Scrum.
      </div>
    `);
  }

  cmdProjects() {
    this.printLine(`
      <div style="margin: 4px 0; font-family: monospace;">
        <span class="cyan">[PROJECTS] Proyectos Reales:</span><br>
        1. <span class="emerald">LibreMath:</span> Suite de ingenieria en Rust, Tauri 2, KaTeX y D3.js.<br>
        2. <span class="emerald">E-Commerce MERN:</span> Plataforma comercial completa con catalogo, carrito y auth JWT.<br>
        3. <span class="emerald">Auditorias Regional Rosario:</span> Cartografia SVG interactiva y dashboard analitico.<br>
        4. <span class="emerald">Mapa Interactivo UTN FRRO:</span> Guia institucional y ubicacion de dependencias.<br>
        5. <span class="emerald">Generador de Posts UPL:</span> Pipeline de OCR con Python/OpenCV/FastAPI + Canvas.<br>
        <span class="yellow">Codigo fuente disponible en:</span> <a href="https://github.com/AlexisRjs" target="_blank" style="color:#2997ff;">github.com/AlexisRjs</a>
      </div>
    `);
  }

  cmdBio() {
    this.printLine(`
      <div style="margin: 4px 0; font-family: monospace;">
        <span class="cyan">Alexis Fernando Rojas | Full Stack Developer & Data Analyst</span><br>
        Estudiante de Ingenieria en Sistemas enfocado en arquitectura MERN, Tauri/Rust y analitica con Python y Power BI.<br><br>
        <span class="yellow">Educacion:</span><br>
        - UTN FRRO: Ingenieria en Sistemas de Informacion (en curso)<br>
        - ITBA: Full Stack Development (en curso)<br><br>
        <span class="yellow">Certificaciones:</span><br>
        - Google Data Analytics (v2) - Coursera: <a href="https://www.coursera.org/account/accomplishments/professional-cert/certificate/UOZETYMOBH9C" target="_blank" style="color:#2997ff;">Verificar</a><br>
        - Google Data Analytics (v.3) - Credly: <a href="https://www.credly.com/badges/7187c248-fe57-402d-a017-b72be71df51d/public_url" target="_blank" style="color:#2997ff;">Verificar</a>
      </div>
    `);
  }

  cmdContact() {
    this.printLine(`
      <div style="margin: 4px 0; font-family: monospace;">
        <span class="cyan">[CONTACT] Canales de contacto:</span><br>
        - LinkedIn: <a href="https://www.linkedin.com/in/alexis-fernando-rojas-94922b250" target="_blank" style="color:#2997ff;">linkedin.com/in/alexis-fernando-rojas</a><br>
        - Instagram: <a href="https://instagram.com/alexisrojas.1" target="_blank" style="color:#2997ff;">@alexisrojas.1</a><br>
        - GitHub: <a href="https://github.com/AlexisRjs" target="_blank" style="color:#2997ff;">github.com/AlexisRjs</a><br>
        - Mensaje directo: Formulario disponible al pie de la pagina.
      </div>
    `);
  }

  cmdMern() {
    this.printLine(`
      <div style="margin: 4px 0; font-family: monospace; font-size: 0.8rem; line-height: 1.4;">
        <span class="cyan">[MERN_ARCHITECTURE]</span><br><br>
        +-------------------------+<br>
        |   REACT (Frontend SPA)  | &lt;-- UI declarativa, Hooks, Context<br>
        +------------+------------+<br>
                     | HTTP / REST (JSON)<br>
        +------------v------------+<br>
        |   EXPRESS + NODE.JS     | &lt;-- Middleware, Controladores, JWT Auth<br>
        +------------+------------+<br>
                     | Mongoose Driver<br>
        +------------v------------+<br>
        |   MONGODB (Database)    | &lt;-- Colecciones NoSQL, Indexacion, Agregaciones<br>
        +-------------------------+
      </div>
    `);
  }

  cmdHack() {
    this.printLine(`<span style="color:#ef4444; font-weight:700;">[SYSTEM_CRASH] Ejecutando simulación de fallo del sistema...</span>`);
    if (window.soundEngine) window.soundEngine.playClick();

    try {
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen().catch(() => {});
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
      }
    } catch (_) {}

    let overlay = document.getElementById('windows-bsod-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'windows-bsod-overlay';
      document.body.appendChild(overlay);
    }

    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      background: #0078d7;
      color: #ffffff;
      z-index: 999999999;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: clamp(24px, 8vw, 110px);
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
      user-select: none;
      cursor: none;
      box-sizing: border-box;
      transition: opacity 0.3s ease;
    `;

    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'all';

    overlay.innerHTML = `
      <div style="font-size: clamp(4.5rem, 9vw, 8rem); font-weight: 300; line-height: 1; margin-bottom: 24px;">:(</div>
      <div style="font-size: clamp(1.2rem, 2.3vw, 2.1rem); font-weight: 300; line-height: 1.35; max-width: 900px; margin-bottom: 30px;">
        Se ha producido un problema en su PC y necesita reiniciarse. Vamos a recopilar información sobre el error y después se reiniciará automáticamente.
      </div>
      <div style="font-size: clamp(1.1rem, 2vw, 1.6rem); font-weight: 300; margin-bottom: 45px;">
        <span id="bsod-pct">0</span>% completado
      </div>
      <div style="display: flex; align-items: flex-start; gap: 24px; flex-wrap: wrap;">
        <svg width="105" height="105" viewBox="0 0 100 100" style="background: #ffffff; padding: 6px; flex-shrink: 0; border-radius: 2px;">
          <rect width="100" height="100" fill="#fff"/>
          <rect x="10" y="10" width="24" height="24" fill="#0078d7"/>
          <rect x="14" y="14" width="16" height="16" fill="#fff"/>
          <rect x="18" y="18" width="8" height="8" fill="#0078d7"/>
          <rect x="66" y="10" width="24" height="24" fill="#0078d7"/>
          <rect x="70" y="14" width="16" height="16" fill="#fff"/>
          <rect x="74" y="18" width="8" height="8" fill="#0078d7"/>
          <rect x="10" y="66" width="24" height="24" fill="#0078d7"/>
          <rect x="14" y="70" width="16" height="16" fill="#fff"/>
          <rect x="18" y="74" width="8" height="8" fill="#0078d7"/>
          <rect x="42" y="12" width="6" height="6" fill="#0078d7"/>
          <rect x="52" y="12" width="6" height="6" fill="#0078d7"/>
          <rect x="42" y="24" width="6" height="6" fill="#0078d7"/>
          <rect x="52" y="24" width="6" height="6" fill="#0078d7"/>
          <rect x="42" y="42" width="16" height="16" fill="#0078d7"/>
          <rect x="12" y="46" width="6" height="6" fill="#0078d7"/>
          <rect x="24" y="46" width="6" height="6" fill="#0078d7"/>
          <rect x="68" y="46" width="6" height="6" fill="#0078d7"/>
          <rect x="80" y="46" width="6" height="6" fill="#0078d7"/>
          <rect x="42" y="68" width="8" height="8" fill="#0078d7"/>
          <rect x="56" y="68" width="8" height="8" fill="#0078d7"/>
          <rect x="72" y="68" width="16" height="8" fill="#0078d7"/>
          <rect x="42" y="82" width="16" height="8" fill="#0078d7"/>
          <rect x="68" y="82" width="20" height="8" fill="#0078d7"/>
        </svg>
        <div style="font-size: clamp(0.78rem, 1.4vw, 0.95rem); font-weight: 300; line-height: 1.5; opacity: 0.95;">
          Para obtener más información sobre este problema y posibles soluciones, consulta:<br>
          <span style="text-decoration: underline;">https://www.windows.com/stopcode</span><br><br>
          Si llamas a una persona de soporte técnico, indícale este código:<br>
          Código de detención: <strong>CRITICAL_PROCESS_DIED</strong><br>
          Lo que falló: <strong>alexis_portfolio.sys</strong>
        </div>
      </div>
    `;

    // Fast BSOD progress percentage ticker
    const pctEl = document.getElementById('bsod-pct');
    const pcts = [15, 38, 64, 85, 100];
    pcts.forEach((val, i) => {
      setTimeout(() => {
        if (pctEl) pctEl.textContent = val;
      }, (i + 1) * 550);
    });

    // Exactly at 3.0s (3000ms): Exit and restore normal interface
    setTimeout(() => {
      try {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      } catch (_) {}

      if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        setTimeout(() => {
          if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        }, 300);
      }

      this.printLine(`
        <div style="margin: 6px 0; padding: 8px 12px; background: rgba(56, 189, 248, 0.08); border-left: 3px solid #38bdf8; font-family: monospace;">
          <span class="cyan" style="font-weight:700;">[BSOD_PRANK_TERMINATED] Simulación de pantalla azul finalizada.</span><br>
          <span class="emerald">Tranquilo, tu computadora no tiene ningún error. Fue solo una broma.</span>
        </div>
      `);
      if (window.soundEngine) window.soundEngine.playSuccess();
    }, 3000);
  }

  cmdJoke() {
    const jokes = [
      "¿Por qué los programadores prefieren el modo oscuro? Porque la luz atrae a los bugs.",
      "Un programador va al supermercado. Su esposa le dice: 'Trae una botella de leche, y si hay huevos, trae 10'. Regreso con 10 botellas de leche porque habia huevos.",
      "Hay 10 tipos de personas en el mundo: los que entienden binario y los que no.",
      "¿Cual es el cafe favorito de un desarrollador? Java con un poco de script.",
      "¿Por que C++ no puede tener citas con C? Porque C no tiene clase.",
      "Un tester entra a un bar: pide 1 cerveza, pide 0 cervezas, pide 999999 cervezas, pide un lagarto. El software compila."
    ];
    const picked = jokes[Math.floor(Math.random() * jokes.length)];
    this.printLine(`<span class="yellow" style="font-family:monospace;">${picked}</span>`);
  }

  cmdQuote() {
    const quotes = [
      "«Hablar es fácil. Muéstrame el código.» — Linus Torvalds",
      "«Cualquier tonto puede escribir código que una computadora entienda. Los buenos programadores escriben código que los humanos pueden entender.» — Martin Fowler",
      "«Primero resuelve el problema. Después, escribe el código.» — John Johnson",
      "«La simplicidad es un prerrequisito para la confiabilidad.» — Edsger W. Dijkstra",
      "«Haz que funcione, haz que sea correcto, haz que sea rápido.» — Kent Beck",
      "«La propiedad más importante de un programa es si cumple con la intención de su usuario.» — C.A.R. Hoare",
      "«El software es una combinación magistral de arte e ingeniería.» — Bill Gates"
    ];
    const picked = quotes[Math.floor(Math.random() * quotes.length)];
    this.printLine(`<span class="cyan" style="font-family:monospace;">${picked}</span>`);
  }

  cmdPing() {
    const ms = (Math.random() * 8 + 6).toFixed(1);
    this.printLine(`<span class="emerald" style="font-family:monospace;">64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=${ms} ms [status=200 OK]</span>`);
  }

  cmdSecret() {
    this.printLine(`
      <div style="margin: 4px 0; font-family: monospace;">
        <span class="yellow">[DEBUG_INFO] Funciones interactivas del sitio:</span><br>
        1. Lanyard Badge: Tarjeta interactiva con fisica pendular reactiva al cursor.<br>
        2. Sabotaje: Comando <span class="red">sabotear codigo</span> ejecuta deformacion de nodos del DOM por 3s.<br>
        3. Hack prank: Comando <span class="emerald">hack your computer</span> dispara simulacion Matrix en pantalla completa.<br>
        4. Audio Synthesizer: Modulo Web Audio API para feedback sonoro sintetizado en tiempo real.
      </div>
    `);
  }

  cmdTheme() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.click();
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      this.printLine(`<span class="cyan" style="font-family:monospace;">[THEME] Modo activo: <strong>${current.toUpperCase()}</strong></span>`);
    }
  }

  cmdClear() {
    this.body.innerHTML = '';
    this.printLine(`<span class="cyan" style="font-family:monospace;">Terminal reiniciada. Escribe <span class="yellow">help</span> para consultar los comandos disponibles.</span>`);
  }

  escapeHTML(str) {
    return str.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m]));
  }
}

window.InteractiveTerminal = InteractiveTerminal;
