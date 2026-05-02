'use client';

import { useEffect, useRef, useState } from 'react';
import { personalInfo, heroStats } from '@/config/data';

// Sentences that will be typed and deleted in a loop
const TYPED_SENTENCES = [
  'Web Developer 🌐',
  'DSA Enthusiast 🧠',
  'Python Programmer 🐍',
  'Problem Solver 💡',
  'CS Undergraduate @ BVM 🎓',
];

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [displayText, setDisplayText] = useState('');
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Staggered entrance animation
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>('[data-hero-item]');
    items.forEach((item, i) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(28px)';
      item.style.transition = `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 120}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 120}ms`;
      requestAnimationFrame(() => {
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, 100 + i * 120);
      });
    });
  }, []);

  // Typewriter effect
  useEffect(() => {
    const current = TYPED_SENTENCES[sentenceIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      // Typing
      if (displayText.length < current.length) {
        timeout = setTimeout(() => {
          setDisplayText(current.slice(0, displayText.length + 1));
        }, 80);
      } else {
        // Pause before deleting
        timeout = setTimeout(() => setIsDeleting(true), 1800);
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(current.slice(0, displayText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setSentenceIndex((prev) => (prev + 1) % TYPED_SENTENCES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, sentenceIndex]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero section" id="hero" ref={heroRef} aria-label="Hero">
      {/* Background orbs */}
      <div
        className="glow-orb"
        style={{ width: 500, height: 500, top: '10%', left: '-10%', background: 'var(--c-accent)', opacity: 0.07 }}
        aria-hidden="true"
      />
      <div
        className="glow-orb"
        style={{ width: 350, height: 350, bottom: '10%', right: '-5%', background: 'var(--c-glow)', opacity: 0.05 }}
        aria-hidden="true"
      />

      <div className="container">
        {/* Badge */}
        <div data-hero-item className="hero__badge" aria-label={`Status: ${personalInfo.role}`}>
          <span className="dot" aria-hidden="true" />
          {personalInfo.role.toUpperCase()}
        </div>

        {/* Headline */}
        <h1 data-hero-item className="hero__title">
          {personalInfo.heroHeadingPrefix}
          <span className="line-accent gradient-text">{personalInfo.heroHeadingHighlight}</span>
        </h1>

        {/* Typewriter line */}
        <div data-hero-item className="hero__typewriter" aria-live="polite" aria-label="Typing animation">
          <span className="typewriter__text">{displayText}</span>
          <span className="typewriter__cursor" aria-hidden="true">|</span>
        </div>

        {/* Subtitle */}
        <p data-hero-item className="hero__subtitle">
          I&apos;m <strong style={{ color: 'var(--c-white)' }}>{personalInfo.name}</strong>, a {personalInfo.role} at {personalInfo.college}. Passionate about building web apps, mastering DSA, and bringing ideas to life through code.
        </p>

        {/* CTAs */}
        <div data-hero-item className="hero__cta">
          <button
            id="hero-cta-projects"
            className="btn btn-primary"
            onClick={() => scrollTo('projects')}
            aria-label="View my projects"
          >
            <span>View Projects</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button
            id="hero-cta-contact"
            className="btn btn-ghost"
            onClick={() => scrollTo('contact')}
            aria-label="Get in touch"
          >
            Get in Touch
          </button>
        </div>

        {/* Stats */}
        <div data-hero-item className="hero__stats" role="list" aria-label="Career statistics">
          {heroStats.map((stat) => (
            <div key={stat.label} role="listitem">
              <div className="stat__value">{stat.value}</div>
              <div className="stat__label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
