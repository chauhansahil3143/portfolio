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
      { threshold: 0.15 },
    );

    el.querySelectorAll('.fade-in-up').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  // Extract skills for the quick skill tags under bio
  const previewSkills = skillsData.flatMap(cat => cat.skills).map(s => s.name).slice(0, 10);

  return (
    <section className="about section" id="about" ref={sectionRef} aria-label="About me">
      <div className="container">
        <div className="about__grid">
          {/* Left: Bio card */}
          <div className="glass-card about__card fade-in-up">
            {/* Glow orb inside card */}
            <div
              className="glow-orb"
              style={{ width: 200, height: 200, top: -60, right: -40, background: 'rgba(124,92,255,0.08)' }}
              aria-hidden="true"
            />

            <p className="section-label">About me</p>
            <h2 className="about__heading">
              {personalInfo.aboutHeadingPrefix}
              <span className="gradient-text">{personalInfo.aboutHeadingHighlight}</span>
            </h2>

            <p className="about__body">{personalInfo.aboutBio1}</p>
            <p className="about__body">{personalInfo.aboutBio2}</p>

            <div className="skills__list" role="list" aria-label="Technical skills">
              {previewSkills.map((s) => (
                <span key={s} className="skill-tag" role="listitem">{s}</span>
              ))}
            </div>
          </div>

          {/* Right: Profile Image & Terminal */}
          <div className="fade-in-up" style={{ transitionDelay: '150ms' }}>
            {personalInfo.profileImage && (
              <div className="profile-img-wrapper">
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
              style={{ padding: '24px 28px', marginTop: 20, display: 'flex', gap: 32, flexWrap: 'wrap' }}
            >
              {aboutQuickFacts.map(({ icon, label, sub }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: '1.4rem' }} aria-hidden="true">{icon}</span>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--c-white)' }}>{label}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--c-muted)', fontFamily: 'var(--font-mono)' }}>{sub}</div>
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
