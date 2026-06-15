import { create } from 'zustand';

interface AudioState {
    isMuted: boolean;
    bgmRefs: Map<string, number>;
    bgmInstances: Map<string, HTMLAudioElement>;
    fadeIntervals: Map<string, NodeJS.Timeout>;
    globalPlayed: Set<string>;
    toggleMute: () => void;
    registerBgm: (url: string) => void;
    unregisterBgm: (url: string) => void;
    playSfx: (url: string) => void;
    unlockAudioContext: () => void;
    stopAll: () => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
    isMuted: false,
    bgmRefs: new Map(),
    bgmInstances: new Map(),
    fadeIntervals: new Map(),
    globalPlayed: new Set(),

    toggleMute: () => {
        const { isMuted, bgmInstances } = get();
        const newMutedState = !isMuted;

        bgmInstances.forEach((audio) => {
            audio.muted = newMutedState;
        });

        set({ isMuted: newMutedState });
    },

    registerBgm: (url: string) => {
        const { isMuted, bgmRefs, bgmInstances, fadeIntervals, globalPlayed } = get();
        
        const isSpecialSound = url.toLowerCase().includes('sounds_1a_til_1d');
        const count = bgmRefs.get(url) || 0;

        if (isSpecialSound && globalPlayed.has(url) && count === 0) {
            bgmRefs.set(url, count + 1);
            set({ bgmRefs: new Map(bgmRefs) });
            return;
        }

        bgmRefs.set(url, count + 1);

        if (count === 0) {
            // Start playing and fade in
            let audio = bgmInstances.get(url);
            if (!audio) {
                audio = new Audio(url);
                audio.loop = false;
                bgmInstances.set(url, audio);
            }
            
            audio.muted = isMuted;
            
            // Clear any existing fade out interval
            if (fadeIntervals.has(url)) {
                clearInterval(fadeIntervals.get(url));
            }

            if (isSpecialSound) {
                globalPlayed.add(url);
            }

            audio.volume = 0;
            audio.play().catch(() => { });

            // Fade in over 1000ms (10 steps of 100ms)
            const fadeStep = 0.1;
            const interval = setInterval(() => {
                if (audio!.volume + fadeStep < 1) {
                    audio!.volume += fadeStep;
                } else {
                    audio!.volume = 1;
                    clearInterval(interval);
                }
            }, 100);
            
            fadeIntervals.set(url, interval);
        }

        set({ 
            bgmRefs: new Map(bgmRefs), 
            bgmInstances: new Map(bgmInstances), 
            fadeIntervals: new Map(fadeIntervals),
            globalPlayed: new Set(globalPlayed)
        });
    },

    unregisterBgm: (url: string) => {
        const { bgmRefs, bgmInstances, fadeIntervals } = get();
        
        const count = bgmRefs.get(url) || 0;
        if (count > 0) {
            bgmRefs.set(url, count - 1);
        }

        if (bgmRefs.get(url) === 0) {
            // Fade out and pause
            const audio = bgmInstances.get(url);
            if (audio) {
                if (fadeIntervals.has(url)) {
                    clearInterval(fadeIntervals.get(url));
                }

                // Fade out over 1000ms
                const fadeStep = 0.1;
                const interval = setInterval(() => {
                    if (audio.volume - fadeStep > 0) {
                        audio.volume -= fadeStep;
                    } else {
                        audio.volume = 0;
                        audio.pause();
                        clearInterval(interval);
                    }
                }, 100);

                fadeIntervals.set(url, interval);
            }
        }

        set({ bgmRefs: new Map(bgmRefs), fadeIntervals: new Map(fadeIntervals) });
    },

    playSfx: (url: string) => {
        const { isMuted } = get();

        if (isMuted) return;

        const sfx = new Audio(url);
        sfx.volume = 1; // Play SFX at max volume
        sfx.play().catch(() => { });
    },

    unlockAudioContext: () => {
        const audio = new Audio();
        audio.play().catch(() => { });
    },

    stopAll: () => {
        const { bgmInstances, fadeIntervals } = get();
        bgmInstances.forEach((audio, url) => {
            if (fadeIntervals.has(url)) {
                clearInterval(fadeIntervals.get(url));
            }
            audio.pause();
            audio.src = '';
        });
        set({ bgmRefs: new Map(), bgmInstances: new Map(), fadeIntervals: new Map() });
    }
}));