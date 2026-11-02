export const projectsData = [
  {
    id: 'libremath',
    category: 'mern',
    categoryLabel: '✦ PROYECTO PRINCIPAL • RUST / TAURI 2',
    featured: true,
    title: 'LibreMath - Suite del Estudiante de Ingeniería',
    shortDesc: 'La navaja suiza del estudiante de ingeniería (UTN FRRO): software ultra veloz y liviano con backend nativo en Rust (Tauri 2), KaTeX, D3.js, notas Markdown y grafos de conocimiento.',
    tags: ['Rust', 'Tauri 2', 'TypeScript', 'KaTeX', 'D3.js', 'Tailwind CSS'],
    image: '/assets/libremath.png',
    metrics: [
      { label: 'Consumo RAM', val: '~35-70 MB' },
      { label: 'Tiempo Arranque', val: '< 1s' },
      { label: 'Motor Matemático', val: 'KaTeX 60fps' },
      { label: 'Grafos de Red', val: 'D3.js Force' }
    ],
    visualGrad: 'linear-gradient(180deg, #182234 0%, #0c111c 100%)',
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
    categoryLabel: 'Stack MERN • E-Commerce',
    title: 'Plataforma E-Commerce MERN',
    shortDesc: 'Comercio electrónico desarrollado para Mueblería Hermanos Jota con catálogo reactivo, carrito de compras persistente, checkout seguro y panel administrativo.',
    tags: ['JavaScript', 'React', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    image: '/assets/muebleria-hermanos-jota.png',
    visualGrad: 'linear-gradient(180deg, #131d18 0%, #090f0c 100%)',
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
    categoryLabel: 'Datos & Visualización • UNR',
    title: 'Auditorías Universitarias - Regional Rosario',
    shortDesc: 'Plataforma analítica con mapa vectorial interactivo de Rosario, rankings oficiales de auditoría y métricas de retención para la UNR.',
    tags: ['JavaScript', 'SVG Interactivo', 'Data Visualization', 'CSS Glassmorphism'],
    image: '/assets/auditorias%20universitarias.png',
    visualGrad: 'linear-gradient(180deg, #141b2b 0%, #070913 100%)',
    fullDesc: 'Plataforma interactiva de auditoría académica desarrollada para Universitarios por la Libertad Regional Rosario. Visualiza datos críticos de la Universidad Nacional de Rosario (UNR): tasa de graduación por cohorte, padrones de alumnos activos, costo por graduado efectivo y geolocalización de facultades e institutos mediante cartografía vectorial SVG personalizada.',
    architecture: [
      'Cartografía interactiva en SVG con delimitación de la costa del Río Paraná, cuadrícula de Rosario y nodos académicos',
      'Visualización y ranking de métricas oficiales de auditoría con comparativas regionales y nacionales',
      'Interfaz glassmorphism de alto contraste y animaciones sutiles para maximizar la legibilidad de datos',
      'Desarrollo modular en JavaScript nativo optimizado para fluidez total a 60fps'
    ],
    liveUrl: 'https://alexisrjs.github.io/UPLregionalRosario/',
    githubUrl: 'https://github.com/AlexisRjs/UPLregionalRosario'
  }
];
