export type AudioType = 'bgm' | 'sfx';

export interface WebtoonPanelData {
    id: string;
    imageUrl: string;
    bgmUrl?: string | null;
    sfxUrl?: string | null;
}

export interface WebtoonChapter {
    id: string;
    title: string;
    coverUrl?: string;
    panels: WebtoonPanelData[];
}