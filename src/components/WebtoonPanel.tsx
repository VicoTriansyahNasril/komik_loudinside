'use client';

import { useState, useEffect, useRef } from 'react';
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
        threshold: 0,
        triggerOnce: false,
        rootMargin: '-5% 0px -5% 0px'
    });

    const { registerBgm, unregisterBgm, playSfx } = useAudioStore();
    const [hasPlayedSfx, setHasPlayedSfx] = useState(false);

    useEffect(() => {
        if (data.bgmUrl) {
            if (inView) {
                registerBgm(data.bgmUrl);
            } else {
                unregisterBgm(data.bgmUrl);
            }
        }
    }, [inView, data.bgmUrl, registerBgm, unregisterBgm]);

    useEffect(() => {
        if (inView && data.sfxUrl && !hasPlayedSfx) {
            playSfx(data.sfxUrl);
            setHasPlayedSfx(true);
        }
    }, [inView, data.sfxUrl, hasPlayedSfx, playSfx]);

    const isVideo = data.imageUrl.toLowerCase().endsWith('.mp4');
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (isVideo && videoRef.current) {
            if (inView) {
                videoRef.current.play().catch(e => console.log('Autoplay prevented:', e));
            } else {
                videoRef.current.pause();
            }
        }
    }, [inView, isVideo]);

    return (
        <div 
            ref={ref} 
            className={`w-full relative flex flex-col m-0 p-0 leading-[0] ${!isLoaded ? 'bg-zinc-800 animate-pulse' : ''}`}
        >
            {isVideo ? (
                <video
                    ref={videoRef}
                    src={data.imageUrl}
                    loop
                    muted
                    playsInline
                    className={`w-full h-auto block m-0 p-0 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoadedData={() => setIsLoaded(true)}
                />
            ) : (
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
            )}
        </div>
    );
}