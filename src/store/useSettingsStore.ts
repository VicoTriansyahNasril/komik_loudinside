import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            isDarkMode: true, // Default to dark mode for webtoons
            toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
        }),
        {
            name: 'webtoon-settings', // name of the item in the storage (must be unique)
        }
    )
);
