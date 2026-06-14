import { chapter1 } from './chapter1';
import { chapter2 } from './chapter2';
import { chapter3 } from './chapter3';
import { chapter4 } from './chapter4';
import { chapter5 } from './chapter5';
import { chapter6 } from './chapter6';
import { epilogue } from './epilogue';
import { WebtoonChapter } from './schema';

export const chapters: Record<string, WebtoonChapter> = {
    'chapter-1': chapter1,
    'chapter-2': chapter2,
    'chapter-3': chapter3,
    'chapter-4': chapter4,
    'chapter-5': chapter5,
    'chapter-6': chapter6,
    'epilogue': epilogue,
};

export const chapterList = Object.values(chapters);
