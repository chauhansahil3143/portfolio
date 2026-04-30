'use client';

import { useEffect, useRef } from 'react';
import { projectsData } from '@/config/data';

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' },
    );

    el.querySelectorAll('.fade-in-up').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="projects section" id="projects" ref={sectionRef} aria-label="Projects">
      <div className="container">
        <header className="projects__header fade-in-up">
          <p className="section-label" style={{ justifyContent: 'center' }}>Featured Work</p>
          <h2 className="projects__heading">
            <span className="gradient-text">Missions</span> Shipped
          </h2>
          <p className="projects__sub">
            Real-world projects showcasing problem solving, development skills, and design.
          </p>
        </header>

        <div className="projects__grid" role="list" aria-label="Project cards">
          {projectsData.map((project, i) => (
            <article
              key={project.id}
              id={project.id}
              className="glass-card project-card fade-in-up"
              style={{ transitionDelay: `${(i % 3) * 100}ms` }}
              role="listitem"
              aria-label={`Project: ${project.title}`}
            >
              {/* Top accent line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, ${project.accent}, transparent)`,
                  borderRadius: '20px 20px 0 0',
                }}
                aria-hidden="true"
              />

              <div
                className="project-card__icon"
                style={{ background: project.iconBg }}
                aria-hidden="true"
              >
                {project.icon}
              </div>

              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__desc">{project.description}</p>

              <div className="project-card__tags" role="list" aria-label="Technologies used">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag" role="listitem">{tag}</span>
                ))}
              </div>

              <div className="project-card__links">
                {project.github && (
                  <a
                    href={project.github}
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} on GitHub`}
                    style={{ color: '#a78bfa' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    Source
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Live demo for ${project.title}`}
                    style={{ color: '#00ffc8' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </a>
                )}
                {'youtube' in project && project.youtube && (
                  <a
                    href={project.youtube as string}
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Watch ${project.title} demo on YouTube`}
                    style={{ color: '#ff4444' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    YouTube
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
