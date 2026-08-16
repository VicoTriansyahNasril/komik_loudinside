'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { chapters, chapterList } from '@/data';
import { WebtoonPanel } from '@/components/WebtoonPanel';
import { useAudioStore } from '@/store/useAudioStore';
import { useReaderState } from '@/hooks/useReaderState';

import { TopOverlay } from '@/components/reader/TopOverlay';
import { BottomOverlay } from '@/components/reader/BottomOverlay';
import { EndOfChapterNav } from '@/components/reader/EndOfChapterNav';
import { ScrollToTopButton } from '@/components/reader/ScrollToTopButton';

export default function ReaderPage({ params }: { params: { chapterId: string } }) {
  const router = useRouter();
  const chapterId = params.chapterId;
  const activeChapter = chapters[chapterId];
  
  const {
    showOverlay,
    setShowOverlay,
    showChapterMenu,
    setShowChapterMenu,
    hasStartedAudio,
    setHasStartedAudio,
    showScrollTop,
  } = useReaderState();

  const { stopAll, unlockAudioContext } = useAudioStore();

  // Find index for next/prev
  const chapterIndex = chapterList.findIndex(ch => ch.id === chapterId);
  const prevChapter = chapterIndex > 0 ? chapterList[chapterIndex - 1] : null;
  const nextChapter = chapterIndex < chapterList.length - 1 ? chapterList[chapterIndex + 1] : null;

  // Cleanup audio on unmount or chapter change
  useEffect(() => {
    return () => stopAll();
  }, [chapterId, stopAll]);

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
      className="min-h-screen relative transition-colors duration-300 cursor-pointer bg-black text-white"
      onClick={handleStartInteraction}
    >
      <TopOverlay 
        showOverlay={showOverlay} 
        chapterTitle={activeChapter.title} 
        chapterIndex={chapterIndex} 
        hasStartedAudio={hasStartedAudio} 
      />

      {/* Reader Container */}
      <div className="max-w-2xl mx-auto w-full flex flex-col pb-32 min-h-screen relative z-10 bg-black shadow-[0_0_50px_rgba(255,255,255,0.05)]">
        {activeChapter.panels.map((panel, index) => (
          <WebtoonPanel
            key={panel.id}
            data={panel}
            priority={index < 3}
          />
        ))}

        <EndOfChapterNav 
          activeChapterTitle={activeChapter.title}
          chapterId={chapterId}
          prevChapter={prevChapter}
          nextChapter={nextChapter}
          onNavigate={handleNavigation}
        />
      </div>

      <BottomOverlay 
        showOverlay={showOverlay}
        showChapterMenu={showChapterMenu}
        setShowChapterMenu={setShowChapterMenu}
        chapterId={chapterId}
        chapterIndex={chapterIndex}
        prevChapter={prevChapter}
        nextChapter={nextChapter}
        onNavigate={handleNavigation}
      />

      <ScrollToTopButton 
        showScrollTop={showScrollTop}
        showOverlay={showOverlay}
      />
    </main>
  );
}
