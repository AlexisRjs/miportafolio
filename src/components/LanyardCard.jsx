import React, { useEffect, useRef } from 'react';
import LanyardBadge from '../utils/lanyard-badge-core';

export default function LanyardCard() {
  const containerRef = useRef(null);
  const badgeInstanceRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    badgeInstanceRef.current = new LanyardBadge('lanyard-hero-container', {
      avatarUrl: '/assets/perfil.png',
      badgeTitle: 'Alexis',
      badgeRole: 'Full Stack & Data Analyst',
      githubUrl: 'https://github.com/AlexisRjs',
      githubUsername: 'AlexisRjs',
      linkedinUrl: 'https://www.linkedin.com/in/alexis-fernando-rojas-94922b250',
      instagramUrl: 'https://instagram.com/alexisrojas.1',
      instagramUsername: 'alexisrojas.1'
    });

    return () => {
      if (badgeInstanceRef.current) {
        if (badgeInstanceRef.current.animId) {
          cancelAnimationFrame(badgeInstanceRef.current.animId);
        }
        if (badgeInstanceRef.current.morphAnimId) {
          cancelAnimationFrame(badgeInstanceRef.current.morphAnimId);
        }
      }
    };
  }, []);

  return (
    <div className="lanyard-container" id="lanyard-hero-container" ref={containerRef}>
      {/* LanyardBadge class injects canvas, carabiner, and morphing card */}
    </div>
  );
}
