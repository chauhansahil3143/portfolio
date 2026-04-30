'use client';

import { useEffect, useRef } from 'react';
import { personalInfo } from '@/config/data';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

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
        </div>
      </nav>
    </>
  );
}
