import { useState, useEffect } from 'react';

export function useReaderState() {
  const [showOverlay, setShowOverlay] = useState(true);
  const [showChapterMenu, setShowChapterMenu] = useState(false);
  const [hasStartedAudio, setHasStartedAudio] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) > 50) {
        setShowOverlay(false);
        setShowChapterMenu(false);
        lastScrollY = currentScrollY;
      }
      setShowScrollTop(currentScrollY > 800);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    showOverlay,
    setShowOverlay,
    showChapterMenu,
    setShowChapterMenu,
    hasStartedAudio,
    setHasStartedAudio,
    showScrollTop,
  };
}
