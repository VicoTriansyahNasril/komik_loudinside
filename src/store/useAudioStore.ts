import { create } from 'zustand';

interface AudioState {
    isMuted: boolean;
    bgmAudio: HTMLAudioElement | null;
    currentBgmUrl: string | null;
    toggleMute: () => void;
    playBgm: (url: string) => void;
    playSfx: (url: string) => void;
    unlockAudioContext: () => void;
    stopAll: () => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
    isMuted: false,
    bgmAudio: null,
    currentBgmUrl: null,

    toggleMute: () => {
        const { isMuted, bgmAudio } = get();
        const newMutedState = !isMuted;

        if (bgmAudio) {
            bgmAudio.muted = newMutedState;
        }

        set({ isMuted: newMutedState });
    },

    playBgm: (url: string) => {
        const { isMuted, bgmAudio, currentBgmUrl } = get();

        if (currentBgmUrl === url) return;

        if (bgmAudio) {
            bgmAudio.pause();
            bgmAudio.src = '';
        }

        const newBgm = new Audio(url);
        newBgm.loop = true;
        newBgm.muted = isMuted;

        newBgm.play().catch(() => { });

        set({ bgmAudio: newBgm, currentBgmUrl: url });
    },

    playSfx: (url: string) => {
        const { isMuted } = get();

        if (isMuted) return;

        const sfx = new Audio(url);
        sfx.play().catch(() => { });
    },

    unlockAudioContext: () => {
        const audio = new Audio();
        audio.play().catch(() => { });
    },

    stopAll: () => {
        const { bgmAudio } = get();
        if (bgmAudio) {
            bgmAudio.pause();
            bgmAudio.src = '';
        }
        set({ bgmAudio: null, currentBgmUrl: null });
    }
}));