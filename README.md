# Alexis Fernando Rojas

<h3 align="center">Full Stack Developer (Stack MERN & Tauri/Rust) • Analista de Datos</h3>
<p align="center">
  Estudiante de Ingeniería en Sistemas de Información (UTN FRRO) • ITBA
</p>

---

## Resumen del Proyecto

Portafolio web interactivo de alto rendimiento desarrollado con enfoque en diseño sobrio y minimalista, micro-interacciones fluidas, efectos de física en tiempo real y una terminal interactiva integrada (`alexis-sh`) para navegación técnica y experimentación.

---

## Formación Académica y Certificaciones

### Formación Institucional
- **[UTN FRRO](https://www.frro.utn.edu.ar/) (Universidad Tecnológica Nacional — Facultad Regional Rosario):** Estudiante de Ingeniería en Sistemas de Información.
- **[ITBA](https://www.itba.edu.ar/) (Instituto Tecnológico de Buenos Aires):** Formación en Ingeniería y Software.

### Certificaciones Profesionales
- **[Google Data Analytics Professional Certificate (v2)](https://www.coursera.org/account/accomplishments/professional-cert/certificate/UOZETYMOBH9C) (Google / Coursera):** Certificación profesional verificada (emitida en julio de 2025) en análisis de datos, SQL, hojas de cálculo, programación en R y visualización de datos.
- **[Google Data Analytics Professional Certificate (v.3)](https://www.credly.com/badges/7187c248-fe57-402d-a017-b72be71df51d/public_url) (Google / Coursera - Credly):** Actualización oficial a v.3 con insignia verificada emitida por Coursera en Credly (emitida en abril de 2026).
- **Full Stack ITBA:** Especialización en desarrollo web de extremo a extremo *(en curso)*.

---

## Stack Tecnológico Principal

### Frontend y Experiencia de Usuario
- **HTML5 Semántico y CSS3 Moderno:** Variables CSS nativas, glassmorphism, flexbox, CSS Grid y micro-animaciones fluidas.
- **JavaScript Moderno (ES6+):** Arquitectura modular desacoplada y eficiente sin dependencias externas innecesarias.
- **Canvas API:** 
  - `AntigravityEngine`: Simulación de partículas reactivas al cursor con dispersión elástica.
  - Motor de partículas procedimentales para eventos de interacción.
- **Web Audio API:** Sintetizador sonoro en tiempo real para clics, eventos de terminal y feedback táctil.

### Backend, Desktop y Base de Datos
- **Tauri 2 y Rust:** Construcción de aplicaciones nativas de escritorio ultra ligeras (<70 MB RAM, arranque instantáneo).
- **Node.js y Express.js:** APIs RESTful modulares, middlewares de seguridad, CORS y enrutamiento asíncrono.
- **MongoDB y Mongoose:** Modelado de datos NoSQL, esquemas atómicos e indexación.
- **Autenticación y Seguridad:** JSON Web Tokens (JWT), encriptación bcryptjs y validación estricta de rutas.

### Análisis de Datos y Business Intelligence
- **Python:** Análisis y transformación de datos con **Pandas** y computación numérica con **NumPy**.
- **Microsoft Power BI y DAX:** Modelado dimensional de negocios, métricas financieras (TIR, VAN, Break-even) y tableros ejecutivos interactivos.
- **SQL:** Consultas estructuradas (PostgreSQL / MySQL) y optimización relacional.

---

## Características y Arquitectura Técnica

### 1. Credencial Interactiva con Física de Lanyard (`LanyardBadge`)
- Simulación de una credencial de conferencias colgante suspendida por un hilo elástico.
- **Física de arrastre elástica:** Permite arrastrar la tarjeta con el cursor o en pantallas táctiles con balanceo gravitacional, inercia y retorno amortiguado.

### 2. Terminal Interactiva (`alexis-sh`)
Emulador de terminal con historial mediante flechas de navegación ($\uparrow$ / $\downarrow$) y botones de acceso rápido:

| Categoría | Comandos Disponibles |
| :--- | :--- |
| **Efectos Especiales** | `sabotear` / `sabotear codigo`: Simulación de colapso visual con auto-reparación en 3 segundos. |
| **Perfil Profesional** | `skills`, `projects`, `bio`, `certs`, `contact`, `mern` (diagrama de arquitectura ASCII). |
| **Comandos Interactivos** | `antigravity`, `matrix`, `hack`, `coffee`, `joke`, `quote`, `cat`, `roll`, `rickroll`, `git`, `dance`, `weather`, `calc [expr]`, `ping`, `whoami`, `sudo`, `secret`. |
| **Sistema** | `theme` (conmutador Dark/Light), `clear` (limpiar pantalla). |

### 3. Barra de Navegación Flotante (*Pill Navigation*)
- Cápsula dinámica con seguimiento de cursor y sincronización por secciones (*ScrollSpy*):
  $$\text{INICIO} \longrightarrow \text{BIOGRAFÍA} \longrightarrow \text{TERMINAL} \longrightarrow \text{PROYECTOS} \longrightarrow \text{CONTACTO}$$
- Menú lateral responsivo optimizado para dispositivos móviles.

### 4. Iluminación Perimetral (*Border Glow*)
- Iluminación reactiva activa en el contorno exterior de las tarjetas y la terminal al pasar el cursor.

### 5. Formulario de Contacto Directo con Gmail
- Genera un borrador pre-cargado directamente en Gmail Web (`alexisrojas2073@gmail.com`) con asunto estructurado (`Propuesta de proyecto, [Nombre]`) y el mensaje redactado por el usuario, sin exponer servidores SMTP ni claves de backend.

---

## Proyectos Destacados

1. **[LibreMath — Suite del Estudiante de Ingeniería](https://github.com/AlexisRjs) (*Proyecto Principal*):** Software de escritorio ultra ligero con backend nativo en Rust (Tauri 2), KaTeX para fórmulas matemáticas complejas, D3.js para grafos interactivos y notas Markdown, concebido para estudiantes de ingeniería de UTN FRRO.
2. **[Plataforma E-Commerce MERN (Mueblería Hnos J)](https://github.com/julianmuinos/Grupo_F_Comision_2_TT_Sprint_3-4_Muebleria_hnos_J):** Comercio electrónico full stack desacoplado (React, Node.js, Express, MongoDB) con catálogo interactivo, autenticación JWT y panel administrativo.
3. **[Auditorías Universitarias — Regional Rosario](https://github.com/AlexisRjs):** Plataforma analítica con mapa vectorial interactivo de Rosario, rankings oficiales de auditoría y métricas académicas.
4. **[Mapa Interactivo UTN FRRO](https://alexisrjs.github.io/MapaUPL-UTNFRRO/):** Aplicación web de orientación para el campus universitario (Zeballos 1341) que geolocaliza aulas, secretarías, pisos y trámites estudiantiles.
5. **[Generador de Posts UPL (Flyers y OCR)](https://github.com/AlexisRjs):** Herramienta web y backend OCR en Python (FastAPI + OpenCV + RapidOCR) con renderizado HTML5 Canvas a 60fps (1080×1920) para automatizar placas y horarios oficiales.

---

## Seguridad y Privacidad

El repositorio y el servidor local aplican prácticas de seguridad defensiva:
- **Protección de Datos Personales:** Exclusión estricta de Curriculum Vitae (PDF), documentos de identidad y fotos privadas en [`.gitignore`](.gitignore) para evitar fugas accidentales en repositorios públicos.
- **Defensa contra Directory Traversal:** `dev-server.js` valida rutas canónicas y restringe peticiones fuera del directorio raíz.
- **Bloqueo Perimetral de Archivos Sensibles:** Bloqueo de peticiones dirigidas a `.git/`, variables de entorno (`.env*`), scripts de servidor (`dev-server.js`) y dependencias.
- **Headers HTTP de Seguridad:** Encabezados `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin` y `X-XSS-Protection: 1; mode=block`.
- **Sanitización de Entradas:** Validación estricta mediante expresiones regulares en la calculadora de la terminal y sanitización de caracteres HTML contra inyecciones XSS.

---

## Puesta en Marcha Local

### Prerrequisitos
- [Node.js](https://nodejs.org/) (versión 16 o superior).

### Instalación y Ejecución

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/AlexisRjs/miportafolio.git
   cd miportafolio
   ```

2. **Iniciar el servidor local con protecciones activas:**
   ```bash
   node dev-server.js
   ```

3. **Abrir en el navegador:**
   Ingresar a [http://localhost:3000](http://localhost:3000).

---

<p align="center">
  Construido con código limpio, arquitectura desacoplada y atención al detalle.
</p>
