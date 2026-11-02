import React, { useState } from 'react';
import bgProjects from '../../assets/bg-projects.png';
import { projectsData } from '../data/projectsData';
import { soundEngine } from '../utils/soundEngine';

export default function ProjectsSection() {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = filter === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === filter);

  const handleFilterChange = (cat) => {
    setFilter(cat);
    soundEngine.playClick();
  };

  const handleOpenModal = (p) => {
    setSelectedProject(p);
    soundEngine.playSuccess();
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    soundEngine.playClick();
    document.body.style.overflow = '';
  };

  return (
    <>
      <section className="projects-section" id="projects">
        <div className="section-bg-art" aria-hidden="true">
          <img src={bgProjects} alt="" className="section-bg-art-img" loading="lazy" decoding="async" />
          <div className="section-bg-art-overlay"></div>
        </div>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Casos de Estudio</span>
            <h2 className="section-title">Proyectos Seleccionados</h2>
            <p className="section-description">
              Soluciones de software, aplicaciones web y herramientas analíticas desarrolladas con tecnologías modernas y arquitectura limpia.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="projects-filter-bar">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterChange('all')}
              onMouseEnter={() => soundEngine.playHover()}
            >
              Todos ({projectsData.length})
            </button>
            <button 
              className={`filter-btn ${filter === 'mern' ? 'active' : ''}`}
              onClick={() => handleFilterChange('mern')}
              onMouseEnter={() => soundEngine.playHover()}
            >
              Software &amp; Full Stack
            </button>
            <button 
              className={`filter-btn ${filter === 'data' ? 'active' : ''}`}
              onClick={() => handleFilterChange('data')}
              onMouseEnter={() => soundEngine.playHover()}
            >
              Datos &amp; Visualización
            </button>
          </div>

          {/* Projects Grid */}
          <div className="projects-grid" id="projects-grid">
            {filteredProjects.map((p) => (
              <article 
                key={p.id}
                className="project-card"
                data-border-glow
                data-glow-colors="rgba(255,255,255,0.95), rgba(210,230,255,0.85), rgba(41,151,255,0.45)"
                data-edge-sensitivity="40"
                data-border-radius="24"
                data-glow-radius="90"
              >
                <div className="project-media">
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="project-img" loading="lazy" />
                  ) : (
                    <div className="project-visual-mock" style={{ background: p.visualGrad }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="project-body">
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-desc">{p.shortDesc}</p>
                  <div className="project-tech-tags">
                    {p.tags.map((t) => (
                      <span key={t} className="project-tech-tag">{t}</span>
                    ))}
                  </div>
                  <div className="project-footer">
                    <button 
                      className="project-link-btn view-details-btn" 
                      onClick={() => handleOpenModal(p)}
                      aria-label={`Ver Arquitectura de ${p.title}`}
                      onMouseEnter={() => soundEngine.playHover()}
                    >
                      <span>Ver Arquitectura</span>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                    <div className="project-action-icons">
                      {p.liveUrl && p.liveUrl !== '#' && (
                        <a 
                          href={p.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn-icon" 
                          title="Ver Demo en Vivo"
                          aria-label="Ver Demo en Vivo"
                          onMouseEnter={() => soundEngine.playHover()}
                          onClick={() => soundEngine.playClick()}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                          </svg>
                        </a>
                      )}
                      <a 
                        href={p.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-icon" 
                        title="Ver Repositorio en GitHub"
                        aria-label="Ver Repositorio en GitHub"
                        onMouseEnter={() => soundEngine.playHover()}
                        onClick={() => soundEngine.playClick()}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT DETAIL ARCHITECTURE MODAL */}
      {selectedProject && (
        <div 
          className="modal-overlay active" 
          id="project-modal" 
          role="dialog" 
          aria-modal="true"
          onClick={(e) => {
            if (e.target.id === 'project-modal') handleCloseModal();
          }}
        >
          <div className="modal-card">
            <button 
              className="modal-close-btn" 
              onClick={handleCloseModal}
              aria-label="Cerrar modal"
            >
              ✕
            </button>
            <div className="modal-body" id="modal-body-content">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span className="project-category-badge" style={{ position: 'static' }}>
                  {selectedProject.categoryLabel || selectedProject.category.toUpperCase()}
                </span>
                <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                  ID: #{selectedProject.id}
                </span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, lineHeight: 1.2 }}>
                {selectedProject.title}
              </h2>

              {selectedProject.image ? (
                <div style={{ width: '100%', height: '230px', borderRadius: 'var(--radius-md)', overflow: 'hidden', margin: '16px 0', border: '1px solid var(--border-subtle)', background: '#0e0e12' }}>
                  <img src={selectedProject.image} alt={selectedProject.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
                </div>
              ) : (
                <div style={{ background: selectedProject.visualGrad, height: '180px', borderRadius: 'var(--radius-md)', display: 'grid', placeItems: 'center', margin: '12px 0' }}>
                  <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
              )}

              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: '8px', fontSize: '1.1rem' }}>Visión General</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{selectedProject.fullDesc}</p>
              </div>

              <div style={{ marginTop: '16px' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: '12px', fontSize: '1.1rem' }}>Arquitectura y Decisiones Técnicas</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', padding: 0 }}>
                  {selectedProject.architecture.map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'var(--text-primary)', fontSize: '0.92rem' }}>
                      <span className="check-icon" style={{ marginTop: '2px', color: 'var(--accent-blue)' }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: '16px' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: '8px', fontSize: '1.1rem' }}>Stack Tecnológico</h4>
                <div className="project-tech-tags">
                  {selectedProject.tags.map((t) => (
                    <span key={t} className="project-tech-tag" style={{ padding: '6px 12px', fontSize: '0.82rem' }}>{t}</span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                {selectedProject.liveUrl && selectedProject.liveUrl !== '#' && (
                  <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ flex: 1 }}>
                    Demo en Vivo
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </a>
                )}
                <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ flex: 1 }}>
                  Código en GitHub
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

