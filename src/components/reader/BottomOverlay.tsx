import { ChevronLeft, ChevronRight } from 'lucide-react';
import { chapterList } from '@/data';
import { ChapterListMenu } from './ChapterListMenu';
import { WebtoonChapter } from '@/data/schema';

interface BottomOverlayProps {
  showOverlay: boolean;
  showChapterMenu: boolean;
  setShowChapterMenu: (show: boolean) => void;
  chapterId: string;
  chapterIndex: number;
  prevChapter: WebtoonChapter | null;
  nextChapter: WebtoonChapter | null;
  onNavigate: (id: string) => void;
}

export function BottomOverlay({
  showOverlay,
  showChapterMenu,
  setShowChapterMenu,
  chapterId,
  chapterIndex,
  prevChapter,
  nextChapter,
  onNavigate
}: BottomOverlayProps) {
  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ease-in-out ${
        showOverlay ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      {/* Expanded Chapter Menu */}
      <div 
        className={`absolute bottom-full left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 px-4 transition-all duration-300 ease-in-out overflow-hidden origin-bottom max-w-2xl mx-auto rounded-t-xl flex flex-col justify-end ${
          showChapterMenu ? 'h-48 py-4 opacity-100' : 'h-0 py-0 opacity-0 pointer-events-none'
        }`}
      >
        <ChapterListMenu 
          currentChapterId={chapterId}
          onNavigate={(id) => {
            setShowChapterMenu(false);
            onNavigate(id);
          }}
        />
      </div>

      <div className={`bg-black/90 backdrop-blur-md text-white px-4 py-3 flex items-center justify-between max-w-2xl mx-auto shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transition-all duration-300 ${!showChapterMenu ? 'rounded-t-xl border-t border-white/10' : ''}`}>
        <button 
          disabled={!prevChapter}
          onClick={(e) => { e.stopPropagation(); if (prevChapter) onNavigate(prevChapter.id); }}
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
          onClick={(e) => { e.stopPropagation(); if (nextChapter) onNavigate(nextChapter.id); }}
          className={`p-2 rounded-full transition-colors flex items-center ${!nextChapter ? 'opacity-30' : 'hover:bg-white/10'}`}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
