'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { WebtoonPanelData } from '@/data/schema';
import { useAudioStore } from '@/store/useAudioStore';

interface WebtoonPanelProps {
    data: WebtoonPanelData;
    priority?: boolean;
}

export function WebtoonPanel({ data, priority = false }: WebtoonPanelProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: false,
    });

    const { playBgm, playSfx } = useAudioStore();

    useEffect(() => {
        if (inView && data.audioUrl && data.audioType) {
            if (data.audioType === 'bgm') {
                playBgm(data.audioUrl);
            } else {
                playSfx(data.audioUrl);
            }
        }
    }, [inView, data, playBgm, playSfx]);

    return (
        <div 
            ref={ref} 
            className={`w-full relative flex flex-col m-0 p-0 leading-[0] ${!isLoaded ? 'bg-zinc-800 animate-pulse' : ''}`}
        >
            <Image
                src={data.imageUrl}
                alt={`Panel ${data.id}`}
                width={800}
                height={1000}
                sizes="(max-width: 768px) 100vw, 42rem"
                priority={priority}
                className={`w-full h-auto block m-0 p-0 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ display: 'block' }}
                onLoad={() => setIsLoaded(true)}
                unoptimized
            />
        </div>
    );
}