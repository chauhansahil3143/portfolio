import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

// Lazy-load Three.js canvas — keeps LCP fast, zero SSR cost
const ZeroGCanvas = dynamic(() => import('@/components/ZeroGCanvas'), {
  ssr: false,
  loading: () => null,
});

// Lazy-load custom cursor — client only
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), {
  ssr: false,
  loading: () => null,
});

export default function HomePage() {
  return (
    <>
      {/* Custom magnetic cursor */}
      <CustomCursor />

      {/* Three.js Zero-G background */}
      <ZeroGCanvas />

      {/* Subtle noise overlay for depth */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Navigation */}
      <Navbar />

      {/* Page content */}
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
