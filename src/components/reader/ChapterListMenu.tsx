import Image from 'next/image';
import { chapterList } from '@/data';

interface ChapterListMenuProps {
  currentChapterId: string;
  onNavigate: (id: string) => void;
  className?: string;
  itemClassName?: (isCurrent: boolean) => string;
}

export function ChapterListMenu({ 
  currentChapterId, 
  onNavigate, 
  className = '', 
  itemClassName 
}: ChapterListMenuProps) {
  return (
    <div className={`flex overflow-x-auto gap-3 snap-x hide-scrollbar ${className}`}>
      {chapterList.map((ch, idx) => {
        const isCurrent = ch.id === currentChapterId;
        const thumb = ch.coverUrl || ch.panels[0]?.imageUrl;
        
        // Default classes for the bottom overlay list if no itemClassName is provided
        const defaultItemClass = `relative shrink-0 w-[202px] h-[142px] rounded-lg overflow-hidden snap-start transition-all ${
          isCurrent ? 'ring-2 ring-blue-500 scale-105 opacity-100' : 'opacity-50 hover:opacity-100'
        }`;
        
        const appliedItemClass = itemClassName ? itemClassName(isCurrent) : defaultItemClass;

        return (
          <button
            key={ch.id}
            onClick={(e) => { 
              e.stopPropagation(); 
              onNavigate(ch.id); 
            }}
            className={appliedItemClass}
          >
            {thumb && (
              <Image src={thumb} alt={ch.title} fill className="object-cover object-top" unoptimized />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
            <div className="absolute bottom-1 left-0 right-0 text-center text-xs font-bold text-white drop-shadow-md">
              #{idx + 1}
            </div>
          </button>
        );
      })}
    </div>
  );
}
