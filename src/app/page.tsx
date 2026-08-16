'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, BookOpen, Skull, Flame, Zap } from 'lucide-react';
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
    <main className="min-h-screen bg-black text-white pb-10 font-sans selection:bg-red-600 selection:text-white">
      {/* Splash Screen */}
      {showSplash && (
        <div 
          className={`fixed inset-0 z-50 bg-zinc-950 flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="flex flex-col items-center gap-6 animate-bounce">
            <div className="relative w-48 h-16 md:w-64 md:h-20 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]">
              <Image
                src="/assets/chapters/EDU/UPI-Logo-whitee.png"
                alt="Logo UPI"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="text-red-500 text-sm md:text-base font-black tracking-[0.3em] uppercase text-center px-4 flex flex-col items-center">
              <span className="flex items-center gap-2"><Flame className="text-orange-500 animate-pulse"/> KARYA PALING CADAS <Flame className="text-orange-500 animate-pulse"/></span>
              <span className="text-white font-extrabold text-2xl md:text-3xl mt-2 tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500">SELVIA WIDI TRIANNISA</span>
              <span className="mt-2 text-xs text-zinc-500">(Bukan komik azab)</span>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative w-full min-h-[60vh] flex flex-col items-center justify-center pt-20 pb-12 overflow-hidden">
        {/* Blurred Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {coverImage && (
            <Image
              src={coverImage}
              alt="Cover Blur"
              fill
              className="object-cover blur-3xl opacity-40 scale-125 saturate-[3]"
              unoptimized
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/80 to-black" />
          
          {/* Animated bloody/fire effects in background */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/20 blur-[100px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/20 blur-[100px] rounded-full animate-pulse delay-700"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center px-4 text-center max-w-4xl mx-auto w-full group">
          <div className="w-[216px] h-[384px] relative rounded-xl overflow-hidden shadow-[0_0_40px_rgba(220,38,38,0.6)] mb-6 border-4 border-red-900 group-hover:scale-105 transition-transform duration-500 group-hover:rotate-2">
            {coverImage ? (
              <Image
                src={coverImage}
                alt="Webtoon Cover"
                fill
                className="object-cover object-top contrast-125 saturate-150"
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                <Skull size={64} className="text-red-600 animate-bounce" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-yellow-400 fill-yellow-400 animate-pulse" size={32} />
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic bg-clip-text text-transparent bg-gradient-to-b from-white via-red-500 to-red-900 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
              Loud Inside
            </h1>
            <Zap className="text-yellow-400 fill-yellow-400 animate-pulse" size={32} />
          </div>
          
          <h2 className="text-xl md:text-2xl font-bold text-red-500 mb-4 tracking-widest uppercase flex items-center gap-2">
            <Skull size={20} /> Mental Breakdown Brutal <Skull size={20} />
          </h2>

          <p className="text-zinc-300 text-sm md:text-lg max-w-2xl mb-8 font-medium leading-relaxed bg-black/50 p-4 rounded-xl border border-red-900/50 backdrop-blur-sm shadow-xl">
            Dhara, siswi SMP berprestasi yang mendadak kena <em>cancel culture</em> gara-gara rumor gak jelas! 
            Dibully, dijauhin, sampai overthinking tingkat dewa! Saat dunia terasa runtuh, 
            <strong className="text-red-500"> mampukah Dhara menghadapi suara-suara di kepalanya sambil dengerin musik underground?! \m/</strong>
          </p>
          
          <div className="flex items-center gap-4">
            {firstChapterId && (
              <Link 
                href={`/read/${firstChapterId}`}
                className="bg-gradient-to-r from-red-700 to-red-900 text-white px-10 py-4 rounded-lg font-black text-xl flex items-center gap-3 hover:from-red-600 hover:to-red-800 transition-all hover:scale-110 active:scale-90 hover:shadow-[0_0_30px_rgba(220,38,38,0.8)] uppercase tracking-widest border-2 border-red-500"
              >
                <Flame className="animate-pulse" size={28} />
                GAS BACA SEKARANG!
                <Skull size={24} />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Chapter List Section */}
      <div className="max-w-4xl mx-auto px-4 mt-12 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black italic uppercase text-white flex items-center gap-3 drop-shadow-md">
            <div className="w-2 h-10 bg-red-600 rounded-full animate-pulse"></div>
            Daftar Dosa (Chapter)
          </h2>
          <span className="bg-red-950 text-red-400 px-4 py-1 rounded-full text-sm font-bold border border-red-900 shadow-[0_0_10px_rgba(220,38,38,0.3)]">{chapterList.length} Trek Bising</span>
        </div>

        <div className="flex flex-col gap-4">
          {chapterList.map((ch, index) => {
            const thumbnail = ch.coverUrl || ch.panels[0]?.imageUrl;
            
            return (
              <Link 
                key={ch.id} 
                href={`/read/${ch.id}`}
                className="group relative flex items-center gap-4 p-3 bg-zinc-900/50 hover:bg-zinc-800/80 transition-all rounded-xl border border-zinc-800 hover:border-red-600/50 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] overflow-hidden"
              >
                {/* Weird hover effect bg */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 z-0"></div>

                <div className="w-[120px] h-[76px] sm:w-[140px] sm:h-[88px] shrink-0 relative bg-black rounded-lg overflow-hidden border-2 border-zinc-800 group-hover:border-red-500 transition-colors z-10">
                  {thumbnail ? (
                    <Image
                      src={thumbnail}
                      alt={ch.title}
                      fill
                      className="object-cover object-top group-hover:scale-110 group-hover:rotate-3 group-hover:saturate-150 transition-all duration-500"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Skull size={32} className="text-zinc-600 group-hover:text-red-500 transition-colors group-hover:animate-bounce" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0 flex flex-col justify-center z-10">
                  <h3 className="font-black text-white text-lg sm:text-xl line-clamp-1 group-hover:text-red-400 transition-colors uppercase italic tracking-wide">
                    {ch.title}
                  </h3>
                  <p className="text-zinc-500 text-xs sm:text-sm mt-1 uppercase font-bold tracking-widest group-hover:text-zinc-300">
                    Klik untuk kehancuran mental
                  </p>
                </div>

                <div className="shrink-0 pl-2 pr-4 z-10">
                  <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-zinc-950 border-2 border-red-900 text-xs sm:text-sm font-black text-red-500 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-500 transition-all uppercase tracking-widest hover:scale-110">
                    <Play size={16} className="group-hover:fill-white" />
                    HAJAR
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="max-w-4xl mx-auto w-full mt-24 pt-8 pb-10 border-t-4 border-dashed border-red-900/40 flex flex-col items-center justify-center gap-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4">
          <Skull size={32} className="text-red-900 hover:text-red-500 transition-colors animate-pulse cursor-pointer" />
        </div>
        
        <div className="relative w-40 h-12 opacity-50 hover:opacity-100 transition-opacity filter drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
          <Image
            src="/assets/chapters/EDU/UPI-Logo-whitee.png"
            alt="Logo UPI"
            fill
            className="object-contain"
            unoptimized
          />
        </div>
        
        <div className="text-center">
          <p className="text-zinc-400 text-sm font-medium px-4 mb-2">
            &copy; {new Date().getFullYear()} LOUD INSIDE (Paling Cadas).
          </p>
          <p className="text-zinc-500 text-xs px-4 flex flex-col sm:flex-row items-center justify-center gap-1">
            <span>Ditempa di neraka tugas akhir oleh</span>
            <a 
              href="https://www.linkedin.com/in/selviawiditriannisa/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-500 font-black hover:text-white hover:underline transition-colors uppercase tracking-widest px-2 py-1 bg-red-950/30 rounded"
            >
              Selvia Widi Triannisa \m/
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}