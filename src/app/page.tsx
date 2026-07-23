'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, BookOpen } from 'lucide-react';
import { chapterList } from '@/data';

export default function HomePage() {
  // Use the vertical cover for the main page
  const coverImage = '/assets/chapters/COVER KOMIK/Cover_Vertikal.png';
  const firstChapterId = chapterList[0]?.id;

  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Optional: Only show once per session so it's not annoying when navigating back
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setShowSplash(false);
      return;
    }

    // Start fade out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    // Completely remove from DOM after 2.5 seconds
    const removeTimer = setTimeout(() => {
      setShowSplash(false);
      sessionStorage.setItem('hasSeenSplash', 'true');
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white pb-10">
      {/* Splash Screen */}
      {showSplash && (
        <div 
          className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="flex flex-col items-center gap-6 animate-pulse">
            <div className="relative w-48 h-16 md:w-64 md:h-20">
              <Image
                src="/assets/chapters/EDU/UPI-Logo-whitee.png"
                alt="Logo UPI"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="text-zinc-400 text-sm md:text-base font-medium tracking-widest uppercase text-center px-4 flex flex-col items-center">
              <span>Karya</span>
              <span className="text-white font-bold text-lg md:text-xl mt-2 normal-case tracking-normal">Selvia Widi Triannisa</span>
            </div>
          </div>
        </div>
      )}

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

      {/* Footer Section */}
      <footer className="max-w-4xl mx-auto w-full mt-16 pt-8 pb-6 border-t border-zinc-800/60 flex flex-col items-center justify-center gap-3">
        <div className="relative w-32 h-10 opacity-60 hover:opacity-100 transition-opacity">
          <Image
            src="/assets/chapters/EDU/UPI-Logo-whitee.png"
            alt="Logo UPI"
            fill
            className="object-contain"
            unoptimized
          />
        </div>
        <p className="text-zinc-500 text-xs text-center px-4">
          &copy; {new Date().getFullYear()} Loud Inside. <br className="md:hidden" /> Sebuah karya oleh{' '}
          <a 
            href="https://www.linkedin.com/in/selviawiditriannisa/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-zinc-300 font-semibold hover:text-white hover:underline transition-colors"
          >
            Selvia Widi Triannisa
          </a>.
        </p>
      </footer>
    </main>
  );
}