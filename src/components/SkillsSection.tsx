'use client';

import { useEffect, useRef } from 'react';
import { skillsData } from '@/config/data';

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate skill bars
            const bars = entry.target.querySelectorAll<HTMLElement>('[data-pct]');
            bars.forEach((bar) => {
              const pct = bar.dataset.pct ?? '0';
              bar.style.width = `${pct}%`;
            });
          } else {
            entry.target.classList.remove('visible');
            const bars = entry.target.querySelectorAll<HTMLElement>('[data-pct]');
            bars.forEach((bar) => {
              bar.style.width = '0%';
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -25% 0px' },
    );

    el.querySelectorAll('.fade-in-up').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="skills-section section" id="skills" ref={sectionRef} aria-label="Skills">
      <div className="container">
        <p className="section-label fade-in-up">Capabilities</p>
        <h2
          className="fade-in-up"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem,4vw,3.5rem)',
            fontWeight: 700,
            color: 'var(--c-white)',
            marginBottom: 60,
          }}
        >
          Tech <span className="gradient-text">Stack</span>
        </h2>

        <div className="skills__grid">
          {skillsData.map((group, gi) => (
            <div
              key={group.category}
              id={`skills-${group.category.toLowerCase().replace(/\s+/g, '-')}`}
              className="glass-card skill-card fade-in-up"
              style={{ transitionDelay: `${gi * 80}ms` }}
              role="region"
              aria-label={`${group.category} skills`}
            >
              {/* Category header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: '1.3rem' }} aria-hidden="true">{group.icon}</span>
                <div>
                  <p className="skill-card__category">{group.category}</p>
                </div>
              </div>

              {/* Bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 6,
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                      }}
                    >
                      <span style={{ color: 'var(--c-text)' }}>{skill.name}</span>
                      <span style={{ color: group.color, opacity: 0.85 }}>{skill.pct}%</span>
                    </div>
                    <div className="skill-bar" role="progressbar" aria-valuenow={skill.pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${skill.name} proficiency`}>
                      <div
                        className="skill-bar__fill"
                        data-pct={skill.pct}
                        style={{
                          width: '0%',
                          background: `linear-gradient(90deg, ${group.color}, var(--c-glow))`,
                          transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
