import React, { useEffect, useRef } from 'react';
import { useInView } from 'motion/react';
import InteractiveTerminal from '../utils/terminal-core';
import bgTerminal from '../../assets/bg-terminal.png';
import { soundEngine } from '../utils/soundEngine';

export default function TerminalSection() {
  const terminalInstanceRef = useRef(null);
  const terminalWrapperRef = useRef(null);
  const autoBootedRef = useRef(false);

  const isInView = useInView(terminalWrapperRef, { amount: 0.45, once: true });

  useEffect(() => {
    try {
      terminalInstanceRef.current = new InteractiveTerminal();
    } catch (e) {
      console.warn('Terminal initialization note:', e);
    }
  }, []);

  // Terminal Auto-Prompt: Tipea y ejecuta automáticamente 'help' al entrar en el viewport
  useEffect(() => {
    if (!isInView || autoBootedRef.current) return;
    autoBootedRef.current = true;

    const input = document.getElementById('terminal-input');
    if (!input || !terminalInstanceRef.current) return;

    if (input.value.trim().length > 0 || document.activeElement === input) return;

    const commandText = 'help';
    let charIdx = 0;

    const bootTimer = setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (charIdx < commandText.length) {
          input.value += commandText[charIdx];
          charIdx++;
          try {
            soundEngine.playKey();
          } catch (e) {}
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            if (terminalInstanceRef.current) {
              const cmd = input.value.trim();
              input.value = '';
              terminalInstanceRef.current.executeCommand(cmd);
              try {
                soundEngine.playClick();
              } catch (e) {}
            }
          }, 300);
        }
      }, 110);
    }, 500);

    return () => clearTimeout(bootTimer);
  }, [isInView]);

  const handleQuickCmd = (cmd) => {
    const input = document.getElementById('terminal-input');
    if (terminalInstanceRef.current) {
      if (input) input.value = '';
      terminalInstanceRef.current.executeCommand(cmd);
      soundEngine.playClick();
    }
  };

  const quickCommands = [
    { cmd: 'sabotear codigo', danger: true },
    { cmd: 'help' },
    { cmd: 'skills' },
    { cmd: 'projects' },
    { cmd: 'bio' },
    { cmd: 'contact' },
    { cmd: 'mern' },
    { cmd: 'hack your computer' },
    { cmd: 'joke' },
    { cmd: 'quote' },
    { cmd: 'ping' },
    { cmd: 'secret' },
    { cmd: 'theme' },
    { cmd: 'clear' },
  ];

  return (
    <section className="terminal-section" id="terminal">
      <div className="section-bg-art" aria-hidden="true">
        <img src={bgTerminal} alt="" className="section-bg-art-img" loading="lazy" decoding="async" />
        <div className="section-bg-art-overlay"></div>
      </div>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Dev Sandbox</span>
          <h2 className="section-title">Terminal Interactiva</h2>
          <p className="section-description">
            Explora mis habilidades, proyectos y comandos interactivos directamente desde la línea de comandos.
          </p>
        </div>

        <div 
          ref={terminalWrapperRef}
          className="terminal-wrapper" 
          data-border-glow 
          data-glow-colors="#00f0ff, #3b82f6, #8b5cf6"
          data-edge-sensitivity="35" 
          data-border-radius="22" 
          data-glow-radius="80"
        >
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <span className="terminal-title">alexis@workspace: ~ (zsh)</span>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>v2.6</span>
          </div>

          <div className="terminal-body" id="terminal-body">
            <div className="terminal-log">
              <span className="cyan">alexis-sh (v2.6) - CLI Interactivo</span><br />
              Escribe <span className="yellow">help</span> para ver la lista de comandos disponibles o ejecuta una acción rápida:
            </div>
          </div>

          <div className="terminal-input-row" style={{ padding: '0 24px 16px' }}>
            <span className="terminal-prompt">&gt; alexis-sh ~ $</span>
            <input 
              type="text" 
              className="terminal-input" 
              id="terminal-input"
              placeholder="Escribe un comando (ej: skills, projects, hack your computer)..." 
              autoComplete="off"
              spellCheck="false"
              onKeyDown={() => soundEngine.playKey()}
            />
          </div>

          <div className="terminal-quick-cmds">
            <span className="quick-label">Acciones:</span>
            {quickCommands.map((q) => (
              <button
                key={q.cmd}
                className={`quick-btn ${q.danger ? 'quick-btn-danger' : ''}`}
                data-cmd={q.cmd}
                onClick={() => handleQuickCmd(q.cmd)}
                onMouseEnter={() => soundEngine.playHover()}
              >
                {q.cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
