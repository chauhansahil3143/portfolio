'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { personalInfo, aboutQuickFacts, skillsData } from '@/config/data';

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

  const previewSkills = skillsData.flatMap((cat) => cat.skills).map((s) => s.name).slice(0, 10);

  return (
    <section className="about section" id="about" ref={sectionRef} aria-label="About me">
      <div className="container">
        <div className="about__layout">

          {/* ── Left: Bio Card ───────────────────────── */}
          <div className="glass-card about__card fade-in-up">
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
            <div className="skills__list" role="list" aria-label="Technical skills" style={{ marginTop: '28px' }}>
              {previewSkills.map((s) => (
                <span key={s} className="skill-tag" role="listitem">{s}</span>
              ))}
            </div>
          </div>

          {/* ── Right: Photo + Terminal + Quick Facts ─ */}
          <div className="about__right fade-in-up" style={{ transitionDelay: '150ms' }}>

            {/* Photo */}
            {personalInfo.profileImage && (
              <div className="about__photo-wrap">
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

            {/* Quick Facts */}
            <div className="glass-card about__facts">
              {aboutQuickFacts.map(({ icon, label, sub }) => (
                <div key={label} className="about__fact-item">
                  <span style={{ fontSize: '1.5rem' }} aria-hidden="true">{icon}</span>
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
