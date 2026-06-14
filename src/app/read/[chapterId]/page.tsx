'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Volume2, VolumeX, Moon, Sun, ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react';
import { chapters, chapterList } from '@/data';
import { WebtoonPanel } from '@/components/WebtoonPanel';
import { useAudioStore } from '@/store/useAudioStore';
import { useSettingsStore } from '@/store/useSettingsStore';

export default function ReaderPage({ params }: { params: { chapterId: string } }) {
  const router = useRouter();
  const chapterId = params.chapterId;
  const activeChapter = chapters[chapterId];
  
  const [showOverlay, setShowOverlay] = useState(true);
  const [hasStartedAudio, setHasStartedAudio] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { isMuted, toggleMute, unlockAudioContext, stopAll } = useAudioStore();
  const { isDarkMode, toggleDarkMode } = useSettingsStore();

  // Find index for next/prev
  const chapterIndex = chapterList.findIndex(ch => ch.id === chapterId);
  const prevChapter = chapterIndex > 0 ? chapterList[chapterIndex - 1] : null;
  const nextChapter = chapterIndex < chapterList.length - 1 ? chapterList[chapterIndex + 1] : null;

  // Cleanup audio on unmount or chapter change
  useEffect(() => {
    return () => stopAll();
  }, [chapterId, stopAll]);

  // Hide overlay on scroll and track scroll position for back to top
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) > 50) {
        setShowOverlay(false);
        lastScrollY = currentScrollY;
      }
      setShowScrollTop(currentScrollY > 800);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!activeChapter) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Chapter tidak ditemukan</h1>
        <button onClick={() => router.push('/')} className="bg-white text-black px-6 py-2 rounded-full">
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  const handleStartInteraction = () => {
    if (!hasStartedAudio) {
      unlockAudioContext();
      setHasStartedAudio(true);
    }
    setShowOverlay(!showOverlay);
  };

  const handleNavigation = (id: string) => {
    stopAll();
    router.push(`/read/${id}`);
  };

  return (
    <main 
      className={`min-h-screen relative transition-colors duration-300 cursor-pointer ${
        isDarkMode ? 'bg-black text-white' : 'bg-zinc-100 text-black'
      }`}
      onClick={handleStartInteraction}
    >

      {/* Top Overlay */}
      <div 
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ease-in-out ${
          showOverlay ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="bg-black/80 backdrop-blur-md text-white border-b border-white/10 px-4 py-3 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <button 
              onClick={(e) => { e.stopPropagation(); router.push('/'); }}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="font-bold text-lg leading-tight line-clamp-1">{activeChapter.title}</h1>
              <p className="text-xs text-zinc-400">EPISODE {chapterIndex + 1}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); toggleDarkMode(); }}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                if (!hasStartedAudio) unlockAudioContext();
                toggleMute(); 
              }}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              title="Toggle Audio"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Reader Container */}
      <div className={`max-w-2xl mx-auto w-full flex flex-col pb-32 min-h-screen relative z-10 ${
        isDarkMode ? 'bg-black shadow-[0_0_50px_rgba(255,255,255,0.05)]' : 'bg-white shadow-2xl'
      }`}>
        {activeChapter.panels.map((panel, index) => (
          <WebtoonPanel
            key={panel.id}
            data={panel}
            priority={index < 3}
          />
        ))}

        {/* End of Chapter Navigation inside the reader flow */}
        <div className={`p-8 mt-10 border-t ${isDarkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
          <h3 className="text-center font-bold mb-6">Akhir dari {activeChapter.title}</h3>
          <div className="flex items-center justify-between gap-4">
            {prevChapter ? (
              <button 
                onClick={(e) => { e.stopPropagation(); handleNavigation(prevChapter.id); }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-colors ${
                  isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-200 hover:bg-zinc-300'
                }`}
              >
                <ChevronLeft size={20} />
                <span className="hidden sm:inline">Episode</span> Sebelumnya
              </button>
            ) : <div className="flex-1" />}
            
            {nextChapter ? (
              <button 
                onClick={(e) => { e.stopPropagation(); handleNavigation(nextChapter.id); }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-colors ${
                  isDarkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
                }`}
              >
                <span className="hidden sm:inline">Episode</span> Selanjutnya
                <ChevronRight size={20} />
              </button>
            ) : <div className="flex-1" />}
          </div>
        </div>
      </div>

      {/* Bottom Overlay (Quick Nav) */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ease-in-out ${
          showOverlay ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="bg-black/80 backdrop-blur-md text-white border-t border-white/10 px-4 py-3 flex items-center justify-between max-w-2xl mx-auto shadow-lg rounded-t-xl">
          <button 
            disabled={!prevChapter}
            onClick={(e) => { e.stopPropagation(); if (prevChapter) handleNavigation(prevChapter.id); }}
            className={`p-2 rounded-full transition-colors flex items-center ${!prevChapter ? 'opacity-30' : 'hover:bg-white/10'}`}
          >
            <ChevronLeft size={24} />
          </button>
          
          <span className="text-sm font-semibold tracking-widest text-zinc-400">
            {chapterIndex + 1} / {chapterList.length}
          </span>
          
          <button 
            disabled={!nextChapter}
            onClick={(e) => { e.stopPropagation(); if (nextChapter) handleNavigation(nextChapter.id); }}
            className={`p-2 rounded-full transition-colors flex items-center ${!nextChapter ? 'opacity-30' : 'hover:bg-white/10'}`}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Smart Floating Back to Top Button */}
      <button
        onClick={(e) => { e.stopPropagation(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className={`fixed right-6 z-30 p-3 bg-white text-black rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 md:right-10 ${
          showScrollTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } ${showOverlay ? 'bottom-20' : 'bottom-6 md:bottom-10'}`}
      >
        <ArrowUp size={24} />
      </button>
    </main>
  );
}
