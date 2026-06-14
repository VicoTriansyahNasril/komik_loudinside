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
  const [showChapterMenu, setShowChapterMenu] = useState(false);
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
        setShowChapterMenu(false);
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
    if (showOverlay) {
        setShowOverlay(false);
        setShowChapterMenu(false);
    } else {
        setShowOverlay(true);
    }
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
          
          {/* Chapter Selection List */}
          <div className="mb-8">
            <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Pilih Chapter Lain</h4>
            <div 
              className="flex overflow-x-auto gap-3 pb-4 snap-x"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {chapterList.map((ch, idx) => {
                const isCurrent = ch.id === chapterId;
                const thumb = ch.panels[0]?.imageUrl;
                return (
                  <button
                    key={ch.id}
                    onClick={(e) => { e.stopPropagation(); handleNavigation(ch.id); }}
                    className={`relative shrink-0 w-24 h-32 md:w-32 md:h-40 rounded-xl overflow-hidden snap-start transition-all duration-300 ${
                      isCurrent ? 'ring-2 ring-blue-500 scale-105 z-10 opacity-100' : 'ring-1 ring-zinc-800 opacity-60 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    {thumb && (
                      <img src={thumb} alt={ch.title} className="w-full h-full object-cover object-top" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute bottom-2 left-0 right-0 text-center">
                      <span className="text-white font-bold drop-shadow-lg md:text-lg">#{idx + 1}</span>
                    </div>
                  </button>
                );
              })}
            </div>
            {/* Inline style to hide scrollbar for webkit */}
            <style dangerouslySetInnerHTML={{__html: `
              .overflow-x-auto::-webkit-scrollbar { display: none; }
            `}} />
          </div>

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
        {/* Expanded Chapter Menu */}
        <div 
          className={`absolute bottom-full left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 px-4 transition-all duration-300 ease-in-out overflow-hidden origin-bottom max-w-2xl mx-auto rounded-t-xl flex flex-col justify-end ${
            showChapterMenu ? 'h-40 py-4 opacity-100' : 'h-0 py-0 opacity-0 pointer-events-none'
          }`}
        >
          <div 
            className="flex overflow-x-auto gap-3 snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {chapterList.map((ch, idx) => {
              const isCurrent = ch.id === chapterId;
              const thumb = ch.panels[0]?.imageUrl;
              return (
                <button
                  key={ch.id}
                  onClick={(e) => { e.stopPropagation(); setShowChapterMenu(false); handleNavigation(ch.id); }}
                  className={`relative shrink-0 w-20 h-28 rounded-lg overflow-hidden snap-start transition-all ${
                    isCurrent ? 'ring-2 ring-blue-500 scale-105 opacity-100' : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  {thumb && (
                    <img src={thumb} alt={ch.title} className="w-full h-full object-cover object-top" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <div className="absolute bottom-1 left-0 right-0 text-center text-xs font-bold text-white drop-shadow-md">
                    #{idx + 1}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className={`bg-black/90 backdrop-blur-md text-white px-4 py-3 flex items-center justify-between max-w-2xl mx-auto shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transition-all duration-300 ${!showChapterMenu ? 'rounded-t-xl border-t border-white/10' : ''}`}>
          <button 
            disabled={!prevChapter}
            onClick={(e) => { e.stopPropagation(); if (prevChapter) handleNavigation(prevChapter.id); }}
            className={`p-2 rounded-full transition-colors flex items-center ${!prevChapter ? 'opacity-30' : 'hover:bg-white/10'}`}
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); setShowChapterMenu(!showChapterMenu); }}
            className="text-sm font-semibold tracking-widest text-zinc-300 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/10 flex items-center gap-2"
          >
            {chapterIndex + 1} / {chapterList.length}
            <ChevronRight size={16} className={`transition-transform duration-300 ${showChapterMenu ? '-rotate-90' : 'rotate-90'}`} />
          </button>
          
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
