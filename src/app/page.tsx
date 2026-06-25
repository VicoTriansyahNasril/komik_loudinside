'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Play, BookOpen } from 'lucide-react';
import { chapterList } from '@/data';

export default function HomePage() {
  // Use the vertical cover for the main page
  const coverImage = '/assets/chapters/COVER KOMIK/Cover_Vertikal.png';
  const firstChapterId = chapterList[0]?.id;

  return (
    <main className="min-h-screen bg-black text-white pb-20">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center px-4 text-center max-w-4xl mx-auto w-full">
          <div className="w-[216px] h-[384px] relative rounded-xl overflow-hidden shadow-2xl mb-6 border border-zinc-800">
            {coverImage ? (
              <Image
                src={coverImage}
                alt="Webtoon Cover"
                fill
                className="object-cover object-top"
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                <BookOpen size={48} className="text-zinc-600" />
              </div>
            )}
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
            Loud Inside
          </h1>
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mb-6">
            Dhara, siswi SMP berprestasi yang menjadi sasaran rumor, pengucilan, dan verbal bullying akibat sebuah kesalahpahaman. Tekanan yang terus datang membuatnya terjebak dalam overthinking dan kecemasan yang perlahan menguasai pikirannya. Saat semua orang mulai menjauh, mampukah Dhara menghadapi suara-suara di dalam kepalanya?
          </p>
          
          <div className="flex items-center gap-4">
            {firstChapterId && (
              <Link 
                href={`/read/${firstChapterId}`}
                className="bg-white text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-zinc-200 transition-transform hover:scale-105 active:scale-95"
              >
                <Play size={20} className="fill-black" />
                Mulai Baca
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Chapter List Section */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold border-l-4 border-white pl-3">Semua Chapter</h2>
          <span className="text-zinc-500 text-sm">{chapterList.length} Chapters</span>
        </div>

        <div className="flex flex-col">
          {chapterList.map((ch, index) => {
            const thumbnail = ch.coverUrl || ch.panels[0]?.imageUrl;
            
            return (
              <Link 
                key={ch.id} 
                href={`/read/${ch.id}`}
                className={`group flex items-center gap-4 py-3 ${index !== chapterList.length - 1 ? 'border-b border-zinc-800/60' : ''} hover:bg-zinc-900/40 transition-colors px-2 rounded-lg`}
              >
                <div className="w-[120px] h-[76px] sm:w-[140px] sm:h-[88px] shrink-0 relative bg-zinc-800 rounded-md overflow-hidden">
                  {thumbnail ? (
                    <Image
                      src={thumbnail}
                      alt={ch.title}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen size={24} className="text-zinc-600" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h3 className="font-bold text-white text-sm sm:text-base line-clamp-1 transition-colors uppercase">
                    {ch.title}
                  </h3>
                </div>

                <div className="shrink-0 pl-2">
                  <button className="px-4 py-1.5 rounded-full border border-zinc-600 text-xs sm:text-sm font-medium text-zinc-300 group-hover:border-zinc-400 group-hover:text-white transition-colors">
                    Baca
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}