'use client';

import { useEffect, useRef, useState } from 'react';
import { personalInfo } from '@/config/data';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isLightMode, setIsLightMode] = useState(false);

  // Check saved or default theme
  useEffect(() => {
    if (document.documentElement.classList.contains('light-mode')) {
      setIsLightMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const next = !isLightMode;
    setIsLightMode(next);
    if (next) {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  };

  useEffect(() => {
    const nav = navRef.current;
    const bar = progressRef.current;
    if (!nav || !bar) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docH > 0 ? scrollY / docH : 0;

      if (scrollY > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');

      bar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        ref={progressRef}
        className="scroll-progress"
        style={{ transform: 'scaleX(0)', willChange: 'transform' }}
        aria-hidden="true"
      />

      <nav ref={navRef} className="navbar" role="navigation" aria-label="Main navigation">
        <div className="container navbar__inner">
          <a href="#hero" className="navbar__logo" aria-label="Home">
            {personalInfo.firstName.toUpperCase()}<span>.</span>{personalInfo.lastName.toUpperCase()}
          </a>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ul className="navbar__links" role="list">
            {[
              { label: '// about',    id: 'about'    },
              { label: '// projects', id: 'projects' },
              { label: '// skills',   id: 'skills'   },
              { label: '// events',   id: 'events'   },
              { label: '// contact',  id: 'contact'  },
            ].map(({ label, id }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                  id={`nav-link-${id}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <button 
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            style={{
              background: 'transparent',
              border: '1px solid var(--c-border)',
              color: 'var(--c-text)',
              padding: '0.4rem 0.8rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              marginLeft: '1rem',
              transition: 'all 0.3s ease'
            }}
          >
            {isLightMode ? 'DARK' : 'LIGHT'}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
