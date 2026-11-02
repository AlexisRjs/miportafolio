import React, { useState } from 'react';
import { soundEngine } from '../utils/soundEngine';

export default function BioSection() {
  const [activeTab, setActiveTab] = useState('backend');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    soundEngine.playClick();
  };

  return (
    <section className="bio-section" id="bio">
      <div className="section-bg-art" aria-hidden="true">
        <img src="/assets/bg-bio.png" alt="" className="section-bg-art-img" loading="lazy" decoding="async" />
        <div className="section-bg-art-overlay"></div>
      </div>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Perfil &amp; Enfoque</span>
          <h2 className="section-title">Ingeniería Web &amp; Datos</h2>
          <p className="section-description">
            Creación de aplicaciones web dinámicas con el Stack MERN y soluciones de análisis de datos para optimizar la toma de decisiones.
          </p>
        </div>

        <div className="bio-grid">
          {/* Text column */}
          <div className="bio-text-column">
            <p className="bio-lead">
              Desarrollo de software centrado en producto, arquitectura limpia y soluciones basadas en datos.
            </p>
            <p className="bio-paragraph">
              Estudiante de <strong>Ingeniería en Sistemas (UTN FRRO)</strong> con especialización en el <strong>Stack MERN</strong> (ITBA) y certificación profesional en <strong>Google Data Analytics</strong>. Combino la rigurosidad del diseño formal de sistemas con desarrollo web moderno, optimización de rendimiento y visión analítica.
            </p>
            <p className="bio-paragraph">
              Diseño e implemento aplicaciones orientadas a resolver problemas concretos: desde <strong>LibreMath</strong> (suite académica de alto rendimiento en Rust/Tauri) y plataformas de <strong>E-Commerce Full Stack</strong>, hasta herramientas de <strong>geolocalización de campus</strong> y automatización con <strong>visión artificial y OCR</strong> en Python.
            </p>

            <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
              <a 
                href="#terminal" 
                className="btn btn-secondary btn-sm"
                onClick={() => soundEngine.playClick()}
                onMouseEnter={() => soundEngine.playHover()}
              >
                <span>Abrir Sandbox Terminal</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="4 17 10 11 4 5"></polyline>
                  <line x1="12" y1="19" x2="20" y2="19"></line>
                </svg>
              </a>
              <a 
                href="#contact" 
                className="btn btn-primary btn-sm"
                onClick={() => soundEngine.playClick()}
                onMouseEnter={() => soundEngine.playHover()}
              >
                <span>Hablemos</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Architecture Tabs & Certifications */}
          <div className="bio-side-column">
            <div 
              className="arch-tabs-container"
              data-border-glow
              data-glow-colors="rgba(255,255,255,0.95), rgba(210,230,255,0.85), rgba(41,151,255,0.45)"
              data-edge-sensitivity="45"
              data-border-radius="22"
              data-glow-radius="90"
            >
              <div className="arch-tab-nav">
                <button 
                  className={`tab-btn ${activeTab === 'backend' ? 'active' : ''}`}
                  onClick={() => handleTabChange('backend')}
                  onMouseEnter={() => soundEngine.playHover()}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                    <line x1="6" y1="6" x2="6.01" y2="6"></line>
                    <line x1="6" y1="18" x2="6.01" y2="18"></line>
                  </svg>
                  <span>Stack MERN</span>
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'frontend' ? 'active' : ''}`}
                  onClick={() => handleTabChange('frontend')}
                  onMouseEnter={() => soundEngine.playHover()}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                  </svg>
                  <span>Análisis de Datos</span>
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'devops' ? 'active' : ''}`}
                  onClick={() => handleTabChange('devops')}
                  onMouseEnter={() => soundEngine.playHover()}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 14 14"></polyline>
                  </svg>
                  <span>Ingeniería en Sistemas</span>
                </button>
              </div>

              {/* Panel 1: Stack MERN */}
              {activeTab === 'backend' && (
                <div className="tab-panel active" id="panel-backend">
                  <div className="tab-panel-header">
                    <div>
                      <span className="tab-panel-kicker">Stack &amp; Metodología</span>
                      <h3 className="tab-panel-title">Desarrollo Web Full Stack (ITBA / MERN)</h3>
                    </div>
                    <span className="tab-panel-badge">Producción</span>
                  </div>
                  <p className="tab-panel-desc">Desarrollo integral de aplicaciones SPA y APIs REST con arquitectura desacoplada, seguridad JWT y modelado documental NoSQL.</p>
                  <div className="arch-card-grid">
                    <div className="arch-card-item">
                      <div className="arch-item-top">
                        <span className="arch-tech-badge">Frontend</span>
                        <h4 className="arch-tech-title">React.js SPA</h4>
                      </div>
                      <p className="arch-item-detail">Componentes funcionales, hooks, gestión de estado y consumo asíncrono con Axios.</p>
                    </div>

                    <div className="arch-card-item">
                      <div className="arch-item-top">
                        <span className="arch-tech-badge">Backend</span>
                        <h4 className="arch-tech-title">Node.js &amp; Express</h4>
                      </div>
                      <p className="arch-item-detail">Servidores HTTP, arquitectura en capas, middlewares y manejo centralizado de errores.</p>
                    </div>

                    <div className="arch-card-item">
                      <div className="arch-item-top">
                        <span className="arch-tech-badge">Base de Datos</span>
                        <h4 className="arch-tech-title">MongoDB &amp; Mongoose</h4>
                      </div>
                      <p className="arch-item-detail">Esquemas estrictos, agregaciones, índices compuestos y persistencia distribuida en Atlas.</p>
                    </div>

                    <div className="arch-card-item">
                      <div className="arch-item-top">
                        <span className="arch-tech-badge">Seguridad &amp; API</span>
                        <h4 className="arch-tech-title">JWT &amp; RESTful API</h4>
                      </div>
                      <p className="arch-item-detail">Autenticación basada en JSON Web Tokens, cifrado con bcryptjs y protección de rutas críticas.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Panel 2: Data Analytics */}
              {activeTab === 'frontend' && (
                <div className="tab-panel active" id="panel-frontend">
                  <div className="tab-panel-header">
                    <div>
                      <span className="tab-panel-kicker">Ciclo Analítico</span>
                      <h3 className="tab-panel-title">Data Analytics (Google)</h3>
                    </div>
                    <span className="tab-panel-badge">Certificado</span>
                  </div>
                  <p className="tab-panel-desc">Estándar oficial de Google: ciclo de vida del dato desde la extracción y limpieza profunda hasta visualización ejecutiva.</p>
                  <div className="arch-card-grid">
                    <div className="arch-card-item">
                      <div className="arch-item-top">
                        <span className="arch-tech-badge">SQL</span>
                        <h4 className="arch-tech-title">Extracción Relacional</h4>
                      </div>
                      <p className="arch-item-detail">Consultas complejas, JOINs múltiples, subconsultas, agrupaciones y agregaciones masivas.</p>
                    </div>

                    <div className="arch-card-item">
                      <div className="arch-item-top">
                        <span className="arch-tech-badge">Python / R</span>
                        <h4 className="arch-tech-title">Procesamiento &amp; Stats</h4>
                      </div>
                      <p className="arch-item-detail">DataFrames con Pandas/NumPy y programación estadística con R (Tidyverse, ggplot2).</p>
                    </div>

                    <div className="arch-card-item">
                      <div className="arch-item-top">
                        <span className="arch-tech-badge">Visualización</span>
                        <h4 className="arch-tech-title">Power BI &amp; Tableau</h4>
                      </div>
                      <p className="arch-item-detail">Storytelling, métricas con DAX y tableros interactivos para toma de decisiones de negocio.</p>
                    </div>

                    <div className="arch-card-item">
                      <div className="arch-item-top">
                        <span className="arch-tech-badge">Data Integrity</span>
                        <h4 className="arch-tech-title">Auditoría &amp; Limpieza</h4>
                      </div>
                      <p className="arch-item-detail">Detección de sesgos, tratamiento de valores nulos, control de consistencia y validación.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Panel 3: Systems Engineering */}
              {activeTab === 'devops' && (
                <div className="tab-panel active" id="panel-devops">
                  <div className="tab-panel-header">
                    <div>
                      <span className="tab-panel-kicker">Formación Universitaria</span>
                      <h3 className="tab-panel-title">Ingeniería en Sistemas (UTN FRRO)</h3>
                    </div>
                    <span className="tab-panel-badge">Académico</span>
                  </div>
                  <p className="tab-panel-desc">Fundamentos formales de arquitectura computacional, estructuras de datos y diseño de sistemas escalables.</p>
                  <div className="arch-card-grid">
                    <div className="arch-card-item">
                      <div className="arch-item-top">
                        <span className="arch-tech-badge">Modelado</span>
                        <h4 className="arch-tech-title">Gestión de Datos</h4>
                      </div>
                      <p className="arch-item-detail">Diseño conceptual DER, normalización hasta 3FN, transacciones ACID y esquemas relacionales.</p>
                    </div>

                    <div className="arch-card-item">
                      <div className="arch-item-top">
                        <span className="arch-tech-badge">Diseño</span>
                        <h4 className="arch-tech-title">Arquitectura de Software</h4>
                      </div>
                      <p className="arch-item-detail">Relevamiento de requerimientos, diagramas de clases y secuencia UML, y patrones de diseño.</p>
                    </div>

                    <div className="arch-card-item">
                      <div className="arch-item-top">
                        <span className="arch-tech-badge">Ciencia Computacional</span>
                        <h4 className="arch-tech-title">Algoritmos &amp; Paradigmas</h4>
                      </div>
                      <p className="arch-item-detail">Estructuras de datos complejas, POO, lógica computacional y concurrencia de ejecución.</p>
                    </div>

                    <div className="arch-card-item">
                      <div className="arch-item-top">
                        <span className="arch-tech-badge">Infraestructura</span>
                        <h4 className="arch-tech-title">Sistemas Operativos &amp; Redes</h4>
                      </div>
                      <p className="arch-item-detail">Gestión de memoria, procesos e hilos, stack TCP/IP y arquitectura cliente-servidor.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Certifications Showcase */}
            <div className="hero-cert-showcase">
              <div className="hero-cert-header">
                <span className="hero-cert-kicker">Credenciales Verificadas</span>
                <span className="hero-cert-badge">3 Oficiales</span>
              </div>
              <div className="hero-cert-grid">
                <a
                  href="https://www.coursera.org/account/accomplishments/professional-cert/R69AQLU727W3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-cert-card"
                  title="Ver credencial Google Data Analytics Professional Certificate (v2) en Coursera"
                  onClick={() => soundEngine.playClick()}
                >
                  <div className="hero-cert-img-box">
                    <img src="/assets/badges/google-data-analytics-v2.png" alt="Google Data Analytics v2" className="hero-cert-img" width="46" height="46" loading="lazy" />
                  </div>
                  <div className="hero-cert-info">
                    <h5 className="hero-cert-title">Google Data Analytics (v2)</h5>
                    <div className="hero-cert-meta">
                      <span className="hero-cert-ver">SQL • R • Tableau • Spreadsheets</span>
                      <span className="hero-cert-date">10 jul 2025</span>
                    </div>
                  </div>
                  <div className="hero-cert-arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M7 17L17 7M7 7h10v10"></path>
                    </svg>
                  </div>
                </a>

                <a
                  href="https://www.credly.com/badges/7187c248-fe57-402d-a017-b72be71df51d/public_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-cert-card"
                  title="Ver credencial oficial Google Data Analytics Professional Certificate (v.3) en Credly"
                  onClick={() => soundEngine.playClick()}
                >
                  <div className="hero-cert-img-box">
                    <img src="/assets/badges/google-data-analytics-v3.png" alt="Google Data Analytics v3" className="hero-cert-img" width="46" height="46" loading="lazy" />
                  </div>
                  <div className="hero-cert-info">
                    <h5 className="hero-cert-title">Google Data Analytics (v.3)</h5>
                    <div className="hero-cert-meta">
                      <span className="hero-cert-ver">Credly • Data Lifecycle &amp; Analytics</span>
                      <span className="hero-cert-date">8 abr 2026</span>
                    </div>
                  </div>
                  <div className="hero-cert-arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M7 17L17 7M7 7h10v10"></path>
                    </svg>
                  </div>
                </a>

                <div className="hero-cert-card hero-cert-card-itba">
                  <div className="hero-cert-img-box hero-cert-icon-itba">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  </div>
                  <div className="hero-cert-info">
                    <h5 className="hero-cert-title">Full Stack Developer MERN</h5>
                    <div className="hero-cert-meta">
                      <span className="hero-cert-ver">ITBA • React, Node, Express, MongoDB</span>
                    </div>
                  </div>
                  <span className="cert-status-tag" style={{ marginLeft: 'auto' }}>en curso</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
