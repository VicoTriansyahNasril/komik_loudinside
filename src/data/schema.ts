export type AudioType = 'bgm' | 'sfx';

export interface WebtoonPanelData {
    id: string;
    imageUrl: string;
    audioUrl?: string | null;
    audioType?: AudioType;
}

export interface WebtoonChapter {
    id: string;
    title: string;
    panels: WebtoonPanelData[];
}