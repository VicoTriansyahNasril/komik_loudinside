'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Play, BookOpen } from 'lucide-react';
import { chapterList } from '@/data';

export default function HomePage() {
  // Use the first panel of the first chapter as the cover image
  const coverImage = chapterList[0]?.coverUrl || chapterList[0]?.panels[0]?.imageUrl || '';
  const firstChapterId = chapterList[0]?.id;

  return (
    <main className="min-h-screen bg-zinc-100 text-black pb-20">
      {/* Hero Section */}
      <div className="relative w-full min-h-[60vh] flex flex-col items-center justify-center pt-20 pb-12">
        {/* Blurred Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {coverImage && (
            <Image
              src={coverImage}
              alt="Cover Blur"
              fill
              className="object-cover blur-xl opacity-30 scale-110"
              unoptimized
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-100 via-zinc-100/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center px-4 text-center max-w-4xl mx-auto w-full">
          <div className="w-[202px] h-[142px] relative rounded-xl overflow-hidden shadow-2xl mb-6 border border-zinc-300">
            {coverImage ? (
              <Image
                src={coverImage}
                alt="Webtoon Cover"
                fill
                className="object-cover object-top"
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-zinc-200 flex items-center justify-center">
                <BookOpen size={48} className="text-zinc-400" />
              </div>
            )}
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
            Loud Inside
          </h1>
          <p className="text-zinc-600 text-sm md:text-base max-w-2xl mb-6 line-clamp-3">
            Selamat datang di pengalaman membaca webtoon interaktif. Nikmati setiap panel dengan suara latar dan efek suara yang imersif. Mulai petualanganmu sekarang!
          </p>
          
          <div className="flex items-center gap-4">
            {firstChapterId && (
              <Link 
                href={`/read/${firstChapterId}`}
                className="bg-black text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-zinc-800 transition-transform hover:scale-105 active:scale-95"
              >
                <Play size={20} className="fill-white" />
                Mulai Baca
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Chapter List Section */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold border-l-4 border-black pl-3">Semua Chapter</h2>
          <span className="text-zinc-500 text-sm">{chapterList.length} Chapters</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chapterList.map((ch, index) => {
            const thumbnail = ch.coverUrl || ch.panels[0]?.imageUrl;
            
            return (
              <Link 
                key={ch.id} 
                href={`/read/${ch.id}`}
                className="group flex bg-white rounded-xl overflow-hidden border border-zinc-200 hover:border-zinc-400 transition-all hover:bg-zinc-50 cursor-pointer shadow-sm"
              >
                <div className="w-[202px] h-[142px] shrink-0 relative bg-zinc-200">
                  {thumbnail ? (
                    <Image
                      src={thumbnail}
                      alt={ch.title}
                      fill
                      className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen size={24} className="text-zinc-400" />
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col justify-center flex-1">
                  <span className="text-zinc-500 text-xs font-semibold mb-1">EPISODE {index + 1}</span>
                  <h3 className="font-bold text-black text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {ch.title}
                  </h3>

                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}