'use client';

import React, { useState } from 'react';
import { useMusic } from '@/context/MusicContext';
import { Play, Pause, SkipForward, Volume2, VolumeX, Maximize2, Sparkles, Music, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function MusicWidget() {
  const { currentTrack, isPlaying, togglePlay, nextTrack, volume, changeVolume } = useMusic();
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const handleMuteToggle = () => {
    if (isMuted) {
      changeVolume(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      changeVolume(0);
      setIsMuted(true);
    }
  };

  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-50 flex items-center gap-4 px-4 py-3 bg-slate-900/90 dark:bg-slate-950/90 text-white rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 group max-w-sm",
      isPlaying ? "ring-1 ring-primary/20 shadow-primary/10" : ""
    )}>
      {/* Vinyl Art & Rotating effect */}
      <div className="relative w-10 h-10 shrink-0 select-none">
        <div className={cn(
          "w-full h-full rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center border-2 border-slate-800 shadow-lg relative overflow-hidden",
          isPlaying ? "animate-spin [animation-duration:8s]" : ""
        )}>
          {/* Groove line details */}
          <div className="absolute inset-1 rounded-full border border-white/5" />
          <div className="absolute inset-2 rounded-full border border-white/10" />
          <div className="absolute inset-3 rounded-full border border-white/5" />
          <Music className="w-4 h-4 text-white/90" />
        </div>
        {/* Core needle center point */}
        <div className="absolute inset-[15px] rounded-full bg-slate-900 border border-slate-700/55 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0 pr-1 select-none">
        <p className="text-[11px] font-black text-slate-200 truncate pr-2 group-hover:text-primary transition-colors">
          {currentTrack.title}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <p className="text-[9px] font-bold text-slate-400 truncate max-w-[120px]">
            {currentTrack.artist}
          </p>
          {isPlaying && (
            <span className="flex items-end gap-0.5 h-2 shrink-0">
              <span className="w-0.5 h-full bg-primary rounded-full animate-bounce [animation-duration:0.6s]" />
              <span className="w-0.5 h-3/4 bg-primary rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.1s]" />
              <span className="w-0.5 h-1/2 bg-primary rounded-full animate-bounce [animation-duration:0.5s] [animation-delay:0.2s]" />
            </span>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1.5 border-l border-white/10 pl-3">
        <button
          onClick={togglePlay}
          className="p-1.5 bg-primary/20 hover:bg-primary/30 text-primary hover:text-white rounded-lg active:scale-90 transition-all border border-primary/25 cursor-pointer"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 fill-primary" /> : <Play className="w-3.5 h-3.5 fill-primary ml-0.5" />}
        </button>

        <button
          onClick={nextTrack}
          className="p-1.5 text-slate-400 hover:text-white active:scale-95 transition-all cursor-pointer"
        >
          <SkipForward className="w-3.5 h-3.5" />
        </button>

        {/* Volume controls */}
        <div 
          className="relative flex items-center"
          onMouseEnter={() => setShowVolumeSlider(true)}
          onMouseLeave={() => setShowVolumeSlider(false)}
        >
          <button
            onClick={handleMuteToggle}
            className="p-1.5 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            {isMuted || volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {showVolumeSlider && (
            <div className="absolute right-0 bottom-full mb-2 bg-slate-900 border border-white/10 rounded-lg p-2.5 flex items-center justify-center shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-150 z-50">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => {
                  changeVolume(parseFloat(e.target.value));
                  if (parseFloat(e.target.value) > 0) setIsMuted(false);
                }}
                className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
          )}
        </div>

        <Link
          href="/music"
          className="p-1.5 text-slate-400 hover:text-white active:scale-95 transition-all relative cursor-pointer"
          title="Mở Music Hub"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping" />
          <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-yellow-400 rounded-full" />
        </Link>
      </div>
    </div>
  );
}
