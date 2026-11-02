import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEngine';

export default function ContactAndFooter() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    soundEngine.playSuccess();

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    const recipient = 'alexisrojas2073@gmail.com';
    const subject = `Contacto Portafolio - ${formData.name}`;
    const bodyContent = `${formData.message}\n\n--\nRemitente: ${formData.name}\nCorreo de contacto: ${formData.email}`;

    // Gmail web composer URL directly opens user's browser with prefilled data
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyContent)}`;
    
    // Open in a new tab
    const newWindow = window.open(gmailUrl, '_blank');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      // Fallback if popup blocker intercepted
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyContent)}`;
    }

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const marqueeRow1 = [
    { name: 'JavaScript', color: '#f7df1e' },
    { name: 'React', color: '#61dafb' },
    { name: 'MongoDB', color: '#47a248' },
    { name: 'Node.js', color: '#5fa04e' },
    { name: 'Express.js', color: '#ffffff' },
    { name: 'Python', color: '#3776ab' },
    { name: 'Power BI', color: '#f2c811' },
    { name: 'SQL & Bases de Datos', color: '#00758f' },
  ];

  const marqueeRow2 = [
    { name: 'Git & GitHub', color: '#f05032' },
    { name: 'Pandas (Python)', color: '#150458' },
    { name: 'RESTful APIs', color: '#009688' },
    { name: 'JSON Web Tokens (JWT)', color: '#d63aff' },
    { name: 'Excel', color: '#107c41' },
    { name: 'Visualización de Datos', color: '#00b4d8' },
    { name: 'E-Commerce MERN', color: '#00f5d4' },
    { name: 'Puntos de Venta (POS)', color: '#3a86ff' },
    { name: 'Tailwind & CSS3', color: '#38bdf8' },
  ];

  return (
    <>
      <section className="contact-section" id="contact">
        <div className="section-bg-art" aria-hidden="true">
          <img src="/assets/bg-contact.png" alt="" className="section-bg-art-img" loading="lazy" decoding="async" />
          <div className="section-bg-art-overlay"></div>
        </div>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Conexión</span>
            <h2 className="section-title">Hablemos de tu Próximo Desafío</h2>
            <p className="section-description">
              ¿Tienes un proyecto de desarrollo web o una necesidad de análisis de datos? Inicia una conversación directa.
            </p>
          </div>

          <div 
            className="contact-card-box" 
            data-border-glow
            data-glow-colors="rgba(255,255,255,0.95), rgba(210,230,255,0.85), rgba(41,151,255,0.45)"
            data-edge-sensitivity="65" 
            data-border-radius="24" 
            data-glow-radius="110"
          >
            <div className="contact-info-col">
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, marginBottom: '12px' }}>
                  Canales Directos
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  Disponible para oportunidades laborales, desarrollo de aplicaciones Full Stack (MERN) y proyectos de consultoría en análisis y visualización de datos.
                </p>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>LinkedIn</span>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                    <a href="https://www.linkedin.com/in/alexis-fernando-rojas-94922b250" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
                      linkedin.com/in/alexis-fernando-rojas
                    </a>
                  </h4>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Instagram</span>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                    <a href="https://instagram.com/alexisrojas.1" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
                      @alexisrojas.1
                    </a>
                  </h4>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                  </svg>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>GitHub</span>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                    <a href="https://github.com/AlexisRjs" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
                      github.com/AlexisRjs
                    </a>
                  </h4>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-col">
              <form id="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">NOMBRE COMPLETO</label>
                  <input 
                    type="text" 
                    id="contact-name" 
                    className="form-input" 
                    placeholder="Ej. Leo Messi" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">TU CORREO ELECTRÓNICO</label>
                  <input 
                    type="email" 
                    id="contact-email" 
                    className="form-input" 
                    placeholder="tu@correo.com" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">MENSAJE O DETALLES DEL PROYECTO</label>
                  <textarea 
                    id="contact-message" 
                    className="form-textarea"
                    placeholder="Describe brevemente tus requerimientos o propuesta laboral..." 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ width: '100%', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                >
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span>{submitted ? '✓ Abriendo Gmail...' : 'Enviar vía Gmail'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CON MARQUEE BIDIRECCIONAL */}
      <footer className="footer">
        <div className="container" style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span className="section-tag">Dominio Técnico &amp; Herramientas</span>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, marginTop: '8px' }}>
            Stack Tecnológico Principal
          </h3>
        </div>

        <div className="marquee-wrapper">
          {/* Carril 1: Sentido Izquierda */}
          <div className="marquee-row">
            <div className="marquee-content">
              {marqueeRow1.map((item, idx) => (
                <div key={idx} className="tech-marquee-badge">
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color, display: 'inline-block' }}></span>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
            <div className="marquee-content" aria-hidden="true">
              {marqueeRow1.map((item, idx) => (
                <div key={'dup-' + idx} className="tech-marquee-badge">
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color, display: 'inline-block' }}></span>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Carril 2: Sentido Opuesto (Reverse) */}
          <div className="marquee-row">
            <div className="marquee-content reverse">
              {marqueeRow2.map((item, idx) => (
                <div key={idx} className="tech-marquee-badge">
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color, display: 'inline-block' }}></span>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
            <div className="marquee-content reverse" aria-hidden="true">
              {marqueeRow2.map((item, idx) => (
                <div key={'dup2-' + idx} className="tech-marquee-badge">
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color, display: 'inline-block' }}></span>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <button 
            type="button" 
            className="footer-back-top" 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              soundEngine.playSuccess();
            }}
          >
            Volver arriba ↑
          </button>
          <div className="footer-credits">
            © 2026 <strong>Alexis Fernando Rojas</strong>. Desarrollado con <strong>React 19, Tailwind CSS y Vite</strong>.
          </div>
        </div>
      </footer>
    </>
  );
}
