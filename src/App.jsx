import React, { useState, useEffect } from 'react';
import Navbar from './components/navigation/Navbar';
import MobileMenu from './components/navigation/MobileMenu';
import Hero from './components/hero/Hero';
import PortfolioGrid from './components/portfolio/PortfolioGrid';
import Lightbox from './components/portfolio/Lightbox';
import ProjectStoryModal from './components/project/ProjectStoryModal';
import About from './components/about/About';
import Services from './components/services/Services';
import Clients from './components/clients/Clients';
import Journal from './components/journal/Journal';
import ArticleReaderModal from './components/journal/ArticleReaderModal';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import CustomCursor from './components/common/CustomCursor';
import FilmGrain from './components/common/FilmGrain';
import CookieConsent from './components/common/CookieConsent';
import LegalModal from './components/legal/LegalModal';
import { PROJECTS, JOURNAL_POSTS } from './data/portfolioData';
import { isSoundEnabled, setSoundEnabled, playShutterSound, playFocusClick } from './utils/sound';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [grainEnabled, setGrainEnabled] = useState(true);

  // Modals & detail views
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [preselectedService, setPreselectedService] = useState('');
  const [legalModal, setLegalModal] = useState({ isOpen: false, tab: 'privacy' });

  // Fullscreen Lightbox state
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
    title: ''
  });

  // Sound toggle handler
  const handleToggleSound = () => {
    const newState = !soundOn;
    setSoundOn(newState);
    setSoundEnabled(newState);
  };

  // Section scroll observer
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25, rootMargin: '-10% 0px -40% 0px' }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Hash route synchronization for deep links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#project-')) {
        const projId = hash.replace('#project-', '');
        const found = PROJECTS.find((p) => p.id === projId);
        if (found) setSelectedProject(found);
      } else if (hash.startsWith('#article-')) {
        const artId = hash.replace('#article-', '');
        const found = JOURNAL_POSTS.find((a) => a.id === artId);
        if (found) setSelectedArticle(found);
      } else if (['#privacy', '#terms', '#cookies', '#cancellation'].includes(hash)) {
        setLegalModal({ isOpen: true, tab: hash.replace('#', '') });
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Project Selection Handler
  const handleSelectProject = (project) => {
    setSelectedProject(project);
    if (project) {
      window.history.replaceState(null, '', `#project-${project.id}`);
    }
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    window.history.replaceState(null, '', '#work');
  };

  // Lightbox handlers
  const handleOpenLightbox = (images, index = 0, title = '') => {
    setLightboxState({
      isOpen: true,
      images,
      currentIndex: index,
      title
    });
  };

  const handleCloseLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleNavigateLightbox = (newIndex) => {
    setLightboxState((prev) => ({ ...prev, currentIndex: newIndex }));
  };

  // Service Inquiry shortcut
  const handleSelectServiceForInquiry = (serviceTitle) => {
    setPreselectedService(serviceTitle);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Article selection
  const handleSelectArticle = (article) => {
    setSelectedArticle(article);
    if (article) {
      window.history.replaceState(null, '', `#article-${article.id}`);
    }
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
    window.history.replaceState(null, '', '#journal');
  };

  // Legal modal handlers
  const handleOpenLegal = (tab = 'privacy') => {
    playFocusClick();
    setLegalModal({ isOpen: true, tab });
  };

  const handleCloseLegal = () => {
    setLegalModal({ isOpen: false, tab: 'privacy' });
  };

  // Scroll to explore handler
  const handleExploreClick = () => {
    playFocusClick();
    const workElem = document.getElementById('work');
    if (workElem) {
      workElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isAnyModalOpen =
    Boolean(selectedProject) ||
    Boolean(selectedArticle) ||
    lightboxState.isOpen ||
    legalModal.isOpen ||
    mobileMenuOpen;

  return (
    <div className="relative min-h-screen bg-editorial-black text-editorial-text selection:bg-accent-lime selection:text-black">
      {/* Desktop Magnetic Custom Cursor */}
      <CustomCursor />

      {/* 35mm Film Grain & Cinematic Vignette */}
      <FilmGrain enabled={grainEnabled} />

      {/* Floating Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
        soundOn={soundOn}
        onToggleSound={handleToggleSound}
      />

      {/* Fullscreen Animated Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSection={activeSection}
        soundOn={soundOn}
        onToggleSound={handleToggleSound}
        onOpenLegal={handleOpenLegal}
      />

      {/* Primary Page Sections */}
      <main aria-hidden={isAnyModalOpen}>
        {/* 01: Hero Section */}
        <Hero onExploreClick={handleExploreClick} />

        {/* 02: Work Archive (Masonry Editorial Grid) */}
        <PortfolioGrid onSelectProject={handleSelectProject} />

        {/* 03: Editorial About & Practice */}
        <About />

        {/* 04: Capabilities & Commissions */}
        <Services onSelectServiceForInquiry={handleSelectServiceForInquiry} />

        {/* 05: Editorial Client & Brand Logo Wall */}
        <Clients />

        {/* 06: Critical Essays & Journal */}
        <Journal onSelectArticle={handleSelectArticle} />

        {/* 07: Dramatic Contact & Commission Enquiry */}
        <Contact
          preselectedService={preselectedService}
          onOpenLegal={handleOpenLegal}
        />
      </main>

      {/* 08: Cinematic Large Footer */}
      <Footer onOpenLegal={handleOpenLegal} />

      {/* Project Photo Story Modal View */}
      {selectedProject && (
        <ProjectStoryModal
          project={selectedProject}
          onClose={handleCloseProject}
          onSelectProject={handleSelectProject}
          onOpenLightbox={handleOpenLightbox}
        />
      )}

      {/* Fullscreen Blacked-out Lightbox */}
      {lightboxState.isOpen && (
        <Lightbox
          isOpen={lightboxState.isOpen}
          images={lightboxState.images}
          currentIndex={lightboxState.currentIndex}
          projectTitle={lightboxState.title}
          onClose={handleCloseLightbox}
          onNavigate={handleNavigateLightbox}
        />
      )}

      {/* Journal Article Reader Modal */}
      {selectedArticle && (
        <ArticleReaderModal
          article={selectedArticle}
          onClose={handleCloseArticle}
        />
      )}

      {/* Accessible Legal & Compliance Modal */}
      {legalModal.isOpen && (
        <LegalModal
          initialTab={legalModal.tab}
          isOpen={legalModal.isOpen}
          onClose={handleCloseLegal}
        />
      )}

      {/* Privacy & Cookie Consent Banner */}
      <CookieConsent onOpenLegal={handleOpenLegal} />
    </div>
  );
}
