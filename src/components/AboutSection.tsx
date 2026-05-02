'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { personalInfo, aboutTerminalData, aboutQuickFacts, skillsData } from '@/config/data';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -25% 0px' },
    );

    el.querySelectorAll('.fade-in-up').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  // Extract skills for the quick skill tags under bio
  const previewSkills = skillsData.flatMap((cat) => cat.skills).map((s) => s.name).slice(0, 10);

  return (
    <section className="about section" id="about" ref={sectionRef} aria-label="About me">
      <div className="container">
        
        {/* A robust 2-column grid that wraps gracefully on mobile */}
        <div 
          className="about__grid" 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '60px', 
            alignItems: 'start' 
          }}
        >
          
          {/* Column 1: Bio card */}
          <div className="glass-card about__card fade-in-up" style={{ height: 'fit-content' }}>
            {/* Glow orb inside card */}
            <div
              className="glow-orb"
              style={{ width: 200, height: 200, top: -60, right: -40, background: 'var(--c-accent)', opacity: 0.08 }}
              aria-hidden="true"
            />

            <p className="section-label">About me</p>
            <h2 className="about__heading">
              {personalInfo.aboutHeadingPrefix}
              <span className="gradient-text">{personalInfo.aboutHeadingHighlight}</span>
            </h2>

            <p className="about__body">{personalInfo.aboutBio1}</p>
            <p className="about__body">{personalInfo.aboutBio2}</p>

            <div className="skills__list" role="list" aria-label="Technical skills" style={{ marginTop: '32px' }}>
              {previewSkills.map((s) => (
                <span key={s} className="skill-tag" role="listitem">{s}</span>
              ))}
            </div>
          </div>

          {/* Column 2: Profile Image, Terminal, Quick Facts */}
          <div className="fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '40px', transitionDelay: '150ms' }}>
            
            {/* Photo Section */}
            {personalInfo.profileImage && (
              <div className="profile-img-wrapper" style={{ margin: '0 auto', maxWidth: '340px', width: '100%', marginBottom: 0 }}>
                <Image
                  src={personalInfo.profileImage}
                  alt={`${personalInfo.name} Profile`}
                  className="profile-img"
                  width={400}
                  height={400}
                  priority
                />
              </div>
            )}
            
            {/* Terminal */}
            <div className="terminal" role="region" aria-label="Developer profile JSON">
              <div className="terminal__header" aria-hidden="true">
                <span className="terminal__dot" />
                <span className="terminal__dot" />
                <span className="terminal__dot" />
                <span className="terminal__title">{personalInfo.firstName.toLowerCase()}_profile.json</span>
              </div>
              <div className="terminal__body">
                <pre>
                  <code>{`{
  `}<span className="t-key">&quot;name&quot;</span>{`: `}<span className="t-string">&quot;${aboutTerminalData.name}&quot;</span>{`,
  `}<span className="t-key">&quot;role&quot;</span>{`: `}<span className="t-string">&quot;${aboutTerminalData.role}&quot;</span>{`,
  `}<span className="t-key">&quot;location&quot;</span>{`: `}<span className="t-string">&quot;${aboutTerminalData.location}&quot;</span>{`,
  `}<span className="t-key">&quot;education&quot;</span>{`: `}<span className="t-string">&quot;${aboutTerminalData.education}&quot;</span>{`,
  `}<span className="t-key">&quot;currentlyLearning&quot;</span>{`: `}<span className="t-bracket">[</span>{`
${aboutTerminalData.currentlyLearning.map(item => `    <span class="t-string">"${item}"</span>`).join(',\n')}
  `}<span className="t-bracket">]</span>{`,
  `}<span className="t-key">&quot;openToWork&quot;</span>{`: `}<span className="t-bool">${aboutTerminalData.openToWork}</span>{`
}`}
                  </code>
                </pre>
              </div>
            </div>

            {/* Quick facts */}
            <div
              className="glass-card"
              style={{ padding: '24px', display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}
            >
              {aboutQuickFacts.map(({ icon, label, sub }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '140px' }}>
                  <span style={{ fontSize: '1.6rem' }} aria-hidden="true">{icon}</span>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--c-white)' }}>{label}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--c-muted)', fontFamily: 'var(--font-mono)' }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
