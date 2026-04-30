'use client';

import { useEffect, useRef, useState } from 'react';
import { eventsData } from '@/config/data';

export default function EventsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeEvent, setActiveEvent] = useState<string | null>(null);

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
    <section className="events section" id="events" ref={sectionRef} aria-label="Events & Milestones">
      <div className="container">
        <header className="projects__header fade-in-up">
          <p className="section-label" style={{ justifyContent: 'center' }}>Journey</p>
          <h2 className="projects__heading" style={{ textAlign: 'center' }}>
            <span className="gradient-text">Events</span> Attended
          </h2>
          <p className="projects__sub" style={{ textAlign: 'center' }}>
            A timeline of hackathons, workshops, and tech symposiums I've participated in.
          </p>
        </header>

        <div className="timeline-container fade-in-up" style={{ transitionDelay: '100ms' }}>
          {/* Horizontal line */}
          <div className="timeline-track" aria-hidden="true" />
          
          <div className="timeline-nodes" role="list">
            {eventsData.map((evt, i) => (
              <div 
                key={evt.id}
                className={`timeline-node ${activeEvent === evt.id ? 'active' : ''}`}
                role="listitem"
                onMouseEnter={() => setActiveEvent(evt.id)}
                onMouseLeave={() => setActiveEvent(null)}
                // Also support touch devices
                onClick={() => setActiveEvent(activeEvent === evt.id ? null : evt.id)}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {/* Node icon / dot */}
                <div 
                  className="timeline-icon" 
                  style={{ borderColor: evt.color, boxShadow: activeEvent === evt.id ? `0 0 20px ${evt.color}80` : 'none' }}
                >
                  {evt.icon}
                </div>
                
                {/* Label below node */}
                <div className="timeline-label">
                  <div className="timeline-date">{evt.date}</div>
                  <div className="timeline-title">{evt.title}</div>
                </div>

                {/* Hover Popup Description */}
                <div className="timeline-popup">
                  <div className="timeline-popup-inner" style={{ borderTop: `2px solid ${evt.color}` }}>
                    <h4>{evt.title}</h4>
                    <span className="timeline-popup-date">{evt.date}</span>
                    <p>{evt.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
