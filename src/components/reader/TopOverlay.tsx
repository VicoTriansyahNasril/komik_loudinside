import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAudioStore } from '@/store/useAudioStore';

interface TopOverlayProps {
  showOverlay: boolean;
  chapterTitle: string;
  chapterIndex: number;
  hasStartedAudio: boolean;
}

export function TopOverlay({ showOverlay, chapterTitle, chapterIndex, hasStartedAudio }: TopOverlayProps) {
  const router = useRouter();
  const { isMuted, toggleMute, unlockAudioContext } = useAudioStore();

  return (
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
            <h1 className="font-bold text-lg leading-tight line-clamp-1">{chapterTitle}</h1>
            <p className="text-xs text-zinc-400">EPISODE {chapterIndex + 1}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
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
  );
}
