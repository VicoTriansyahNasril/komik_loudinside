import { ArrowUp } from 'lucide-react';

interface ScrollToTopButtonProps {
  showScrollTop: boolean;
  showOverlay: boolean;
}

export function ScrollToTopButton({ showScrollTop, showOverlay }: ScrollToTopButtonProps) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      className={`fixed right-6 z-30 p-3 bg-white text-black rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 md:right-10 ${
        showScrollTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } ${showOverlay ? 'bottom-20' : 'bottom-6 md:bottom-10'}`}
    >
      <ArrowUp size={24} />
    </button>
  );
}
