'use client';

import { useEffect, useRef, useState } from 'react';
import { eventsData } from '@/config/data';
import Image from 'next/image';

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

    el.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right').forEach((node) => observer.observe(node));
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
            A winding path of hackathons, workshops, and tech symposiums I've participated in.
          </p>
        </header>

        <div className="timeline-wave-container">
          <div className="timeline-wave-track" aria-hidden="true" />
          
          <div className="timeline-wave-nodes" role="list">
            {eventsData.map((evt, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div 
                  key={evt.id}
                  className={`timeline-wave-node ${isLeft ? 'node-left slide-in-left' : 'node-right slide-in-right'} ${activeEvent === evt.id ? 'active' : ''}`}
                  role="listitem"
                  onMouseEnter={() => setActiveEvent(evt.id)}
                  onMouseLeave={() => setActiveEvent(null)}
                  onClick={() => setActiveEvent(activeEvent === evt.id ? null : evt.id)}
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  
                  {/* The circular image node */}
                  <div 
                    className="timeline-wave-icon" 
                    style={{ 
                      borderColor: evt.color, 
                      boxShadow: activeEvent === evt.id ? `0 0 25px ${evt.color}aa` : 'none' 
                    }}
                  >
                    {'image' in evt ? (
                      <img src={evt.image as string} alt={evt.title} className="timeline-node-img" />
                    ) : (
                      <span className="timeline-fallback-icon">{evt.icon}</span>
                    )}
                  </div>
                  
                  {/* The text content that sits on the side */}
                  <div className="timeline-wave-content">
                    <div className="timeline-wave-date" style={{ color: evt.color }}>{evt.date}</div>
                    <div className="timeline-wave-title">{evt.title}</div>
                    
                    {/* Expandable description on hover */}
                    <div className="timeline-wave-desc">
                      <p>{evt.description}</p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
