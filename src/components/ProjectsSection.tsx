'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { projectsData } from '@/config/data';

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const stackContainerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);

  const activeProject = projectsData[activeIndex];

  // Scroll active card into view on mobile
  useEffect(() => {
    if (stackContainerRef.current) {
      const activeChild = stackContainerRef.current.children[activeIndex] as HTMLElement;
      if (activeChild) {
        activeChild.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [activeIndex]);

  // Animation controllers for active project details
  const controls = useAnimation();

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % projectsData.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  }, []);

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Autoplay setup
  const startAutoplay = useCallback(() => {
    if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    autoplayTimer.current = setInterval(() => {
      if (!isHovered) {
        setActiveIndex((prev) => (prev + 1) % projectsData.length);
      }
    }, 6000);
  }, [isHovered]);

  const resetAutoplay = useCallback(() => {
    startAutoplay();
  }, [startAutoplay]);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [isHovered, startAutoplay]);

  // Restart autoplay on activeIndex changes to give full 6s to the newly active project
  useEffect(() => {
    resetAutoplay();
  }, [activeIndex, resetAutoplay]);

  // Framer Motion viewport-controlled text animations
  useEffect(() => {
    controls.start('visible');
  }, [activeIndex, controls]);

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if showcase section is in view
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;

      if (!isInView) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Mouse wheel scroll handler (prevents scroll-hijacking when leaving section)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const isInView = rect.top >= -50 && rect.bottom <= window.innerHeight + 50;

      if (!isInView) return;

      // Check if we are at the boundaries
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      const isAtLast = activeIndex === projectsData.length - 1;
      const isAtFirst = activeIndex === 0;

      // Allow natural scroll to next section if at ends
      if (isScrollingDown && isAtLast) return;
      if (isScrollingUp && isAtFirst) return;

      e.preventDefault();

      if (isScrolling.current) return;
      isScrolling.current = true;

      if (isScrollingDown) {
        handleNext();
      } else if (isScrollingUp) {
        handlePrev();
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 800); // match animation length
    };

    const sectionEl = sectionRef.current;
    if (sectionEl) {
      sectionEl.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (sectionEl) {
        sectionEl.removeEventListener('wheel', handleWheel);
      }
    };
  }, [activeIndex, handleNext, handlePrev]);

  // Touch swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;

    // Detect horizontal swiping
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    }
  };

  // Motion Variants
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const descVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, delay: 0.1 },
    },
  };

  const linksVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.2 },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <section
      className="showcase-section"
      id="projects"
      ref={sectionRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Projects Showcase"
    >
      {/* Immersive Background Crossfading */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`bg-${activeIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="showcase-bg-layer"
        >
          <Image
            src={activeProject.image}
            alt=""
            fill
            sizes="100vw"
            priority
            style={{ objectFit: 'cover' }}
            aria-hidden="true"
          />
        </motion.div>
      </AnimatePresence>
      <div className="showcase-bg-overlay" aria-hidden="true" />

      {/* Main Grid Showcase Container */}
      <div className="showcase-container">
        {/* Left Column: Active Project Information */}
        <div className="showcase-active-col">
          {/* Static Section Header */}
          <div className="showcase-static-header">
            <p className="section-label">Featured Work</p>
            <h2 className="showcase-section-heading">
              Missions <span className="gradient-text">Shipped</span>
            </h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={textContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Category, Year & Completion badges */}
              <motion.div variants={titleVariants} className="showcase-meta">
                <span className="category-label">{activeProject.category}</span>
                <span className="divider" />
                <span className="year-badge">{activeProject.year}</span>
                <span className="divider" />
                <span style={{ color: activeProject.accent }}>Shipped ✓</span>
              </motion.div>

              {/* Title & Subtitle */}
              <motion.h3 variants={titleVariants} className="showcase-title">
                {activeProject.title}
              </motion.h3>
              <motion.p variants={titleVariants} className="showcase-subtitle">
                {activeProject.subtitle}
              </motion.p>

              {/* Description */}
              <motion.p variants={descVariants} className="showcase-desc">
                {activeProject.description}
              </motion.p>

              {/* Tech Stack List */}
              <motion.div variants={descVariants} className="showcase-tech-list" role="list">
                {activeProject.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    variants={badgeVariants}
                    className="showcase-tech-pill"
                    role="listitem"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>

              {/* Call-to-actions buttons */}
              <motion.div variants={linksVariants} className="showcase-links">
                {activeProject.demo && (
                  <a
                    href={activeProject.demo}
                    className="showcase-btn primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Launch ${activeProject.title} live website`}
                  >
                    <span>Live Demo</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
                {activeProject.github && (
                  <a
                    href={activeProject.github}
                    className="showcase-btn secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${activeProject.title} source code on GitHub`}
                  >
                    <span>GitHub Code</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Inactive Preview Stack */}
        <div
          ref={stackContainerRef}
          className="showcase-stack-col"
          role="tablist"
          aria-label="Projects deck"
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          {projectsData.map((project, index) => {
            const isProjectActive = index === activeIndex;

            return (
              <motion.div
                key={project.id}
                layoutId={`showcase-card-${project.id}`}
                onClick={() => handleSelect(index)}
                className={`showcase-card ${isProjectActive ? 'active' : ''}`}
                role="tab"
                aria-selected={isProjectActive}
                aria-controls="projects"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(index);
                  }
                }}
              >
                <div className="showcase-card-img-wrap">
                  <motion.div
                    layoutId={`project-image-${project.id}`}
                    style={{ position: 'relative', width: '100%', height: '100%' }}
                  >
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      sizes="320px"
                      style={{ objectFit: 'cover' }}
                    />
                  </motion.div>
                  <div className="showcase-card-overlay" />
                </div>
                <div className="showcase-card-content">
                  <h4 className="showcase-card-title">{project.title}</h4>
                  <p className="showcase-card-category">{project.category}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Progress Indicator Dots */}
      <div className="showcase-dots" role="tablist" aria-label="Progress dots">
        {projectsData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={`showcase-dot ${index === activeIndex ? 'active' : ''}`}
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Navigate to project ${index + 1}`}
          />
        ))}
      </div>

      {/* Quick Nav Controls (Desktop only) */}
      <div className="showcase-quick-nav">
        <button
          onClick={handlePrev}
          className="showcase-nav-btn"
          aria-label="Previous Project"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="showcase-nav-btn"
          aria-label="Next Project"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </section>
  );
}
