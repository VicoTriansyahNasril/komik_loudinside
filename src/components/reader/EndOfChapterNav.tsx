import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ChapterListMenu } from './ChapterListMenu';
import { WebtoonChapter } from '@/data/schema';

interface EndOfChapterNavProps {
  activeChapterTitle: string;
  chapterId: string;
  prevChapter: WebtoonChapter | null;
  nextChapter: WebtoonChapter | null;
  onNavigate: (id: string) => void;
}

export function EndOfChapterNav({
  activeChapterTitle,
  chapterId,
  prevChapter,
  nextChapter,
  onNavigate
}: EndOfChapterNavProps) {
  return (
    <div className="p-8 mt-10 border-t border-zinc-800">
      <h3 className="text-center font-bold mb-6">Akhir dari {activeChapterTitle}</h3>
      
      {/* Chapter Selection List */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold mb-3 text-zinc-400">Pilih Chapter Lain</h4>
        <ChapterListMenu 
          currentChapterId={chapterId}
          onNavigate={onNavigate}
          className="pb-4"
          itemClassName={(isCurrent) => `relative shrink-0 w-[202px] h-[142px] rounded-xl overflow-hidden snap-start transition-all duration-300 ${
            isCurrent ? 'ring-2 ring-blue-500 scale-105 z-10 opacity-100' : 'ring-1 ring-zinc-800 opacity-60 hover:opacity-100 hover:scale-105'
          }`}
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        {prevChapter ? (
          <button 
            onClick={(e) => { e.stopPropagation(); onNavigate(prevChapter.id); }}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-colors bg-zinc-800 hover:bg-zinc-700 text-white"
          >
            <ChevronLeft size={20} />
            <span className="hidden sm:inline">Episode</span> Sebelumnya
          </button>
        ) : <div className="flex-1" />}
        
        {nextChapter ? (
          <button 
            onClick={(e) => { e.stopPropagation(); onNavigate(nextChapter.id); }}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-colors bg-white text-black hover:bg-zinc-200"
          >
            <span className="hidden sm:inline">Episode</span> Selanjutnya
            <ChevronRight size={20} />
          </button>
        ) : <div className="flex-1" />}
      </div>
    </div>
  );
}
