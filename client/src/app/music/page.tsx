'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useMusic, Track } from '@/context/MusicContext';
import { useAuth } from '@/context/AuthContext';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Clock, 
  Sparkles, 
  BookOpen, 
  Music, 
  Coffee, 
  CloudRain, 
  Zap, 
  Disc, 
  Headphones,
  Timer,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MusicHub() {
  const { user } = useAuth();
  
  const { 
    tracks, 
    customTracks,
    currentTrack, 
    isPlaying, 
    volume, 
    progress, 
    durationSec, 
    currentTimeSec, 
    playTrack, 
    togglePlay, 
    nextTrack, 
    prevTrack, 
    changeVolume, 
    seek,
    addCustomTrack,
    deleteCustomTrack
  } = useMusic();

  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes default
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerPreset, setTimerPreset] = useState(25);
  
  // Ambient Sound Overlay State (0 to 100)
  const [cafeMix, setCafeMix] = useState(0);
  const [rainMix, setRainMix] = useState(0);

  // HTML5 Audio elements refs for concurrent background ambient mixing!
  const rainAudioRef = useRef<HTMLAudioElement | null>(null);
  const cafeAudioRef = useRef<HTMLAudioElement | null>(null);

  // Form states for adding custom songs
  const [newTitle, setNewTitle] = useState("");
  const [newArtist, setNewArtist] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [addMode, setAddMode] = useState<'url' | 'file'>('url');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [showVideo, setShowVideo] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  
  const getYouTubeId = (url: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeId = currentTrack ? getYouTubeId(currentTrack.url) : null;

  useEffect(() => {
    if (youtubeId && iframeRef.current) {
      const contentWindow = iframeRef.current.contentWindow;
      if (contentWindow) {
        try {
          if (isPlaying) {
            contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');
          } else {
            contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), '*');
          }
        } catch (e) {
          console.error("Failed to send postMessage to YouTube iframe:", e);
        }
      }
    }
  }, [isPlaying, youtubeId]);

  // Sync mute state
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

  // Pomodoro Timer hook
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime(t => t - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setIsTimerRunning(false);
      // Soft chime sound
      try {
        const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-500.wav");
        audio.volume = 0.4;
        audio.play();
      } catch (e) {
        console.log("Audio notification failed:", e);
      }
      alert("⏱️ Hết giờ tập trung Pomodoro! Hãy đứng lên thư giãn 5 phút nhé!");
      setPomodoroTime(timerPreset * 60);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, pomodoroTime]);

  // Sync Rain Sound Volume & State in Realtime!
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (!rainAudioRef.current) {
      const audio = new Audio("https://www.soundjay.com/nature/sounds/rain-07.mp3");
      audio.loop = true;
      audio.volume = 0;
      rainAudioRef.current = audio;
    }

    const targetVolume = rainMix / 100;
    rainAudioRef.current.volume = targetVolume;

    if (targetVolume > 0 && isPlaying) {
      rainAudioRef.current.play().catch(e => console.log("Rain play failed:", e));
    } else {
      rainAudioRef.current.pause();
    }
  }, [rainMix, isPlaying]);

  // Sync Cafe Sound Volume & State in Realtime!
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!cafeAudioRef.current) {
      const audio = new Audio("https://www.soundjay.com/misc/sounds/coffee-shop-1.mp3");
      audio.loop = true;
      audio.volume = 0;
      cafeAudioRef.current = audio;
    }

    const targetVolume = cafeMix / 100;
    cafeAudioRef.current.volume = targetVolume;

    if (targetVolume > 0 && isPlaying) {
      cafeAudioRef.current.play().catch(e => console.log("Cafe play failed:", e));
    } else {
      cafeAudioRef.current.pause();
    }
  }, [cafeMix, isPlaying]);

  // Clean up ambient audios on unmount
  useEffect(() => {
    return () => {
      if (rainAudioRef.current) rainAudioRef.current.pause();
      if (cafeAudioRef.current) cafeAudioRef.current.pause();
    };
  }, []);

  // Unlock audio elements on mobile devices during a direct user-gesture interaction
  const unlockAmbientSounds = (rMix = rainMix, cMix = cafeMix, forcePlayingState?: boolean) => {
    if (typeof window === 'undefined') return;

    if (!rainAudioRef.current) {
      const audio = new Audio("https://www.soundjay.com/nature/sounds/rain-07.mp3");
      audio.loop = true;
      audio.volume = 0;
      rainAudioRef.current = audio;
    }
    if (!cafeAudioRef.current) {
      const audio = new Audio("https://www.soundjay.com/misc/sounds/coffee-shop-1.mp3");
      audio.loop = true;
      audio.volume = 0;
      cafeAudioRef.current = audio;
    }

    try {
      rainAudioRef.current.volume = rMix / 100;
      cafeAudioRef.current.volume = cMix / 100;

      const activePlaying = forcePlayingState !== undefined ? forcePlayingState : isPlaying;

      // Force play/pause synchronously in user gesture
      if (rMix > 0 && activePlaying) {
        rainAudioRef.current.play().catch(e => console.log("Ambient rain play failed:", e));
      } else {
        rainAudioRef.current.pause();
      }

      if (cMix > 0 && activePlaying) {
        cafeAudioRef.current.play().catch(e => console.log("Ambient cafe play failed:", e));
      } else {
        cafeAudioRef.current.pause();
      }
    } catch (err) {
      console.log("Failed to warm up background audio engines:", err);
    }
  };

  const handleStartTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleResetTimer = (minutes: number) => {
    setIsTimerRunning(false);
    setTimerPreset(minutes);
    setPomodoroTime(minutes * 60);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remain = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remain.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const pct = clickX / width;
    seek(pct * durationSec);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!newTitle) {
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
        setNewTitle(nameWithoutExt);
      }
    }
  };

  const handleAddCustomSong = async (e: React.FormEvent) => {
    e.preventDefault();
    if (addMode === 'url') {
      if (!newUrl.trim()) return;
      await addCustomTrack(newTitle, newArtist || "Mạng Internet", newUrl, "Custom Track");
    } else {
      if (!selectedFile) return;
      await addCustomTrack(newTitle, newArtist || "File nhạc của tôi", "", "Local File", selectedFile);
    }
    setNewTitle("");
    setNewArtist("");
    setNewUrl("");
    setSelectedFile(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto pb-16">
      
      {/* Premium Ambient Breathing Header */}
      <div className="relative overflow-hidden bg-slate-900 text-white rounded-3xl p-8 md:p-10 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-3 relative z-10 text-center md:text-left max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-yellow-400 fill-yellow-400" /> Study Music Hub
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Không Gian Âm Nhạc Tập Trung
          </h1>
          <p className="text-slate-400 text-xs md:text-sm font-medium leading-relaxed">
            Nơi kết hợp hoàn hảo giữa những bản nhạc Classical tập trung, giai điệu Acoustic mộc mạc và công cụ Pomodoro giúp bạn đưa não bộ vào trạng thái tập trung sâu nhất (Deep Focus) khi học tập!
          </p>
        </div>

        <div className="flex items-center justify-center relative shrink-0 select-none">
          <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/40 backdrop-blur-md text-center space-y-2.5">
            <div className="flex items-center justify-center gap-1.5 text-primary">
              <Headphones className="w-5 h-5 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest">Music Status</span>
            </div>
            <p className="text-lg font-black">{isPlaying ? "Đang phát nhạc..." : "Nhạc đang dừng"}</p>
            <p className="text-[10px] text-slate-400 font-bold max-w-[150px] leading-relaxed">
              *Nhạc vẫn chạy ngầm mượt mà khi bạn chuyển sang các trang học khác!
            </p>
            <p className="text-[9px] text-amber-400 font-bold max-w-[150px] leading-relaxed border-t border-white/5 pt-1.5 mt-1.5">
              📱 <strong>iOS/Android:</strong> Hãy tắt nút gạt im lặng (chế độ rung) của điện thoại để nghe tiếng nhạc.
            </p>
          </div>
        </div>
      </div>

      {/* Main Music Arena Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Center-Stage Vinyl Player */}
        <div className="lg:col-span-7 premium-card p-6 md:p-10 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl space-y-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
          
          {/* Track Detail Badge */}
          <div className="space-y-2 z-10 flex flex-col items-center">
            <span className="text-[9px] font-black uppercase tracking-widest text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
              {currentTrack.category}
            </span>
            <h2 className="text-xl md:text-2xl font-black text-white truncate max-w-md">{currentTrack.title}</h2>
            <p className="text-xs text-slate-400 font-bold">{currentTrack.artist}</p>

            {youtubeId && (
              <button
                onClick={() => setShowVideo(!showVideo)}
                className="mt-1 px-3 py-1 bg-indigo-950/60 border border-indigo-900/60 text-indigo-400 hover:text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer hover:bg-indigo-900/60 active:scale-95 flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-yellow-400 animate-pulse" />
                {showVideo ? "Ẩn Video / Hiện đĩa xoay" : "Xem Video YouTube"}
              </button>
            )}
          </div>

          {/* Main Stage: Rotating Vinyl or YouTube Frame */}
          <div className="relative w-full flex flex-col items-center justify-center min-h-[224px] md:min-h-[256px] z-10">
            {/* YouTube Embed (kept in DOM for continuous playback) */}
            {youtubeId && (
              <div 
                className={cn(
                  "relative w-full aspect-video md:max-w-md rounded-2xl overflow-hidden border border-slate-850 shadow-2xl z-10 transition-all duration-300",
                  showVideo ? "block" : "hidden"
                )}
              >
                <iframe
                  ref={iframeRef}
                  src={`https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&autoplay=1`}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            )}

            {/* Epic Interactive Rotating Vinyl */}
            <div 
              className={cn(
                "relative w-56 h-56 md:w-64 md:h-64 shrink-0 items-center justify-center z-10",
                (youtubeId && showVideo) ? "hidden" : "flex"
              )}
            >
              {/* Outer Glow Ring */}
              <div className={cn(
                "absolute inset-0 rounded-full bg-indigo-500/10 blur-xl transition-all duration-1000",
                isPlaying ? "scale-105 opacity-100 animate-pulse" : "scale-95 opacity-50"
              )} />
              
              {/* Real Vinyl Disc */}
              <div className={cn(
                "w-full h-full rounded-full bg-slate-950 border-4 border-slate-800 shadow-2xl relative flex items-center justify-center transition-all overflow-hidden duration-1000",
                isPlaying ? "animate-spin [animation-duration:15s]" : ""
              )}>
                {/* Vinyl Groove Lines */}
                <div className="absolute inset-2 rounded-full border border-white/5" />
                <div className="absolute inset-6 rounded-full border border-white/10" />
                <div className="absolute inset-10 rounded-full border border-white/5" />
                <div className="absolute inset-16 rounded-full border border-white/10" />
                
                {/* Album cover art */}
                <div className="absolute inset-20 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-500 flex items-center justify-center border-2 border-slate-800">
                  <Disc className="w-10 h-10 text-white/95 animate-pulse" />
                </div>
              </div>

              {/* Tonearm Needle */}
              <div 
                className={cn(
                  "absolute top-[-10px] right-[40px] w-24 h-24 origin-top-right transition-transform duration-700 pointer-events-none z-20",
                  isPlaying ? "rotate-[15deg]" : "rotate-[0deg]"
                )}
              >
                <div className="w-2 h-20 bg-gradient-to-b from-slate-400 to-slate-200 rounded-full shadow-md ml-16" />
                <div className="w-4 h-6 bg-slate-800 border border-slate-700 rounded shadow-md ml-15 mt-[-5px]" />
              </div>
            </div>
          </div>

          {/* Interactive Custom Progress Slider or Equalizer */}
          {youtubeId ? (
            <div className="w-full space-y-2.5 z-10 select-none">
              <div className="flex items-center justify-center gap-1.5 py-1.5 bg-indigo-950/40 border border-indigo-900/50 rounded-2xl">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">YouTube Audio Active</span>
              </div>
              <div className="h-8 flex items-end justify-center gap-1.5 pt-2">
                {isPlaying ? (
                  Array.from({ length: 18 }).map((_, i) => (
                    <span 
                      key={i} 
                      className="w-1 bg-primary rounded-full animate-bounce" 
                      style={{ 
                        height: `${Math.floor(Math.random() * 20) + 8}px`,
                        animationDuration: `${Math.floor(Math.random() * 600) + 400}ms`,
                        animationDelay: `${i * 30}ms`
                      }} 
                    />
                  ))
                ) : (
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wide">Tạm dừng phát nhạc</span>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full space-y-2 z-10">
              <div 
                onClick={handleProgressClick}
                className="w-full h-2 bg-slate-800 rounded-full cursor-pointer relative overflow-hidden group/progress"
              >
                <div 
                  className="h-full bg-gradient-to-r from-primary to-indigo-500 rounded-full transition-all duration-100" 
                  style={{ width: `${progress}%` }} 
                />
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-transparent hover:bg-white/5 transition-all" />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-slate-400 select-none">
                <span>{formatTime(currentTimeSec)}</span>
                <span>{formatTime(durationSec || 300)}</span>
              </div>
            </div>
          )}

          {/* Media Player Controls Row */}
          <div className="flex items-center justify-center gap-6 z-10 select-none">
            <button
              onClick={() => {
                prevTrack();
                unlockAmbientSounds(rainMix, cafeMix, true);
              }}
              className="p-3 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-2xl active:scale-90 transition-all border border-slate-800 cursor-pointer"
            >
              <SkipBack className="w-5 h-5 fill-slate-400" />
            </button>

            <button
              onClick={() => {
                togglePlay();
                unlockAmbientSounds(rainMix, cafeMix, !isPlaying);
              }}
              className="p-5 bg-primary text-white rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/30 cursor-pointer border border-primary/20"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-white" />
              ) : (
                <Play className="w-6 h-6 fill-white ml-1" />
              )}
            </button>

            <button
              onClick={() => {
                nextTrack();
                unlockAmbientSounds(rainMix, cafeMix, true);
              }}
              className="p-3 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-2xl active:scale-90 transition-all border border-slate-800 cursor-pointer"
            >
              <SkipForward className="w-5 h-5 fill-slate-400" />
            </button>
          </div>

          {/* Extra Volume Control */}
          <div className="flex items-center justify-center gap-3 w-64 z-10 select-none">
            <button
              onClick={handleMuteToggle}
              className="text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-primary" />}
            </button>
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
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>

        {/* Right Side: Playlists & Pomodoro tools */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Pomodoro Focus Timer Block */}
          <div className="premium-card p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-xl pointer-events-none" />
            
            <h3 className="font-black text-sm text-white flex items-center gap-2">
              <Timer className="w-4 h-4 text-rose-500" /> Pomodoro Focus Session
            </h3>

            <div className="text-center space-y-1">
              <div className="text-4xl font-black font-mono tracking-wider text-rose-500">{formatTime(pomodoroTime)}</div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Thời gian tập trung</p>
            </div>

            {/* Presets Row */}
            <div className="flex justify-center gap-2">
              {[15, 25, 45].map((mins) => (
                <button
                  key={mins}
                  onClick={() => handleResetTimer(mins)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                    timerPreset === mins
                      ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  {mins} min
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleStartTimer}
                className={cn(
                  "py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all select-none cursor-pointer text-center",
                  isTimerRunning 
                    ? "bg-slate-800 text-slate-300 hover:bg-slate-700" 
                    : "bg-rose-500 text-white hover:bg-rose-600 shadow-md shadow-rose-500/10"
                )}
              >
                {isTimerRunning ? "Pause" : "Start Focus"}
              </button>
              <button
                onClick={() => handleResetTimer(timerPreset)}
                className="py-2.5 bg-slate-800 text-slate-400 hover:text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all select-none cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Add Custom Track Block */}
          <div className="premium-card p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl space-y-4">
            <h3 className="font-black text-sm text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" /> Nhạc Cá Nhân Của Bạn
            </h3>
            
            {user ? (
              <form onSubmit={handleAddCustomSong} className="space-y-3.5">
                <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
                  Tải file nhạc (.mp3) từ thiết bị hoặc dán link phát nhạc trực tiếp để thêm danh sách phát của riêng bạn!
                </p>

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Tên bài hát (Ví dụ: Study Chillhop)"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-all font-semibold"
                  />
                  <input
                    type="text"
                    placeholder="Tên nghệ sĩ / Tác giả"
                    value={newArtist}
                    onChange={(e) => setNewArtist(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-all font-semibold"
                  />

                  {/* Mode Selector */}
                  <div className="grid grid-cols-2 gap-2 border-b border-white/5 pb-2.5 mb-1 text-[9px] font-black text-center select-none">
                    <button
                      type="button"
                      onClick={() => setAddMode('url')}
                      className={cn("py-1 rounded-md transition-all cursor-pointer", addMode === 'url' ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300")}
                    >
                      DÙNG URL MP3
                    </button>
                    <button
                      type="button"
                      onClick={() => setAddMode('file')}
                      className={cn("py-1 rounded-md transition-all cursor-pointer", addMode === 'file' ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300")}
                    >
                      TẢI FILE TỪ MÁY
                    </button>
                  </div>

                  {addMode === 'url' ? (
                    <input
                      type="url"
                      placeholder="https://example.com/lofi-song.mp3"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      required={addMode === 'url'}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-all font-mono text-[10px]"
                    />
                  ) : (
                    <div className="relative select-none">
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={handleFileChange}
                        required={addMode === 'file'}
                        className="hidden"
                        id="custom-song-upload"
                      />
                      <label
                        htmlFor="custom-song-upload"
                        className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer transition-all border-dashed font-bold"
                      >
                        {selectedFile ? (
                          <span className="truncate max-w-[200px] text-primary">{selectedFile.name}</span>
                        ) : (
                          <>
                            <Music className="w-3.5 h-3.5 shrink-0" />
                            <span>Chọn file nhạc từ máy</span>
                          </>
                        )}
                      </label>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-primary hover:bg-primary/95 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all select-none hover:scale-[1.01] active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 animate-pulse" />
                  Thêm Nhạc Cá Nhân
                </button>
              </form>
            ) : (
              <div className="p-4 bg-slate-950/40 border border-slate-800 rounded-2xl text-center space-y-2 select-none">
                <AlertCircle className="w-5 h-5 text-amber-500 mx-auto animate-bounce" />
                <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
                  ⚠️ Vui lòng đăng nhập tài khoản EngBot để tải lên hoặc quản lý các bài hát cá nhân của riêng bạn!
                </p>
              </div>
            )}
          </div>

          {/* Interactive Lofi Sound Mixer */}
          <div className="premium-card p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl space-y-4">
            <h3 className="font-black text-sm text-white flex items-center gap-2">
              <Coffee className="w-4 h-4 text-amber-500" /> Ambient Noise Mixer (Mixer Âm Nền)
            </h3>
            <p className="text-slate-400 text-[10px] leading-relaxed font-medium">
              Tùy chỉnh tiếng ồn trắng xung quanh để hòa quyện cùng bản nhạc chính, tạo không gian làm việc lý tưởng nhất!
            </p>
            
            <div className="space-y-4 pt-2 select-none">
              {/* Rain Sound */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-indigo-400">
                    <CloudRain className="w-3.5 h-3.5" /> Tiếng Mưa Rơi (Rain Noise)
                  </span>
                  <span className="text-[10px] text-slate-400">{rainMix}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rainMix}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setRainMix(val);
                    unlockAmbientSounds(val, cafeMix, isPlaying);
                  }}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              {/* Cafe whisper */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <Coffee className="w-3.5 h-3.5" /> Quán Cà Phê (Cafe Whispers)
                  </span>
                  <span className="text-[10px] text-slate-400">{cafeMix}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={cafeMix}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setCafeMix(val);
                    unlockAmbientSounds(rainMix, val, isPlaying);
                  }}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Playlist Track Selection Block */}
          <div className="premium-card p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl space-y-4">
            <h3 className="font-black text-sm text-white flex items-center gap-2">
              <Music className="w-4 h-4 text-primary" /> Study Playlist
            </h3>
            
            <div className="space-y-2.5 overflow-y-auto max-h-[300px] pr-1">
              {tracks.map((track) => {
                const isCurrent = track.id === currentTrack.id;
                const isCustom = customTracks.some(c => c.id === track.id);
                return (
                  <div
                    key={track.id}
                    className={cn(
                      "w-full p-3 rounded-2xl border transition-all flex items-start gap-3 relative overflow-hidden group",
                      isCurrent
                        ? "bg-slate-800 border-primary shadow-lg"
                        : "bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/30"
                    )}
                  >
                    {/* Visualizer animation on card */}
                    {isCurrent && isPlaying && (
                      <div className="absolute right-10 top-3.5 flex items-end gap-0.5 h-3 z-0">
                        <span className="w-0.5 h-full bg-primary rounded-full animate-bounce [animation-duration:0.6s]" />
                        <span className="w-0.5 h-3/4 bg-primary rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.1s]" />
                        <span className="w-0.5 h-1/2 bg-primary rounded-full animate-bounce [animation-duration:0.5s] [animation-delay:0.2s]" />
                      </div>
                    )}

                    <button
                      onClick={() => {
                        playTrack(track);
                        unlockAmbientSounds(rainMix, cafeMix, true);
                      }}
                      className="flex-1 text-left flex items-start gap-3 cursor-pointer z-10"
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-all text-xs font-black",
                        isCurrent 
                          ? "bg-primary text-white border-primary/20" 
                          : "bg-slate-900 text-slate-500 border-slate-800 group-hover:text-white"
                      )}>
                        {isCurrent && isPlaying ? (
                          <Pause className="w-3.5 h-3.5 fill-white" />
                        ) : (
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0 space-y-0.5 pr-2">
                        <p className={cn(
                          "text-xs font-black truncate",
                          isCurrent ? "text-primary" : "text-white"
                        )}>
                          {track.title}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold">{track.artist} • {track.duration}</p>
                        <p className="text-[9px] text-slate-500 leading-relaxed font-semibold italic border-t border-white/5 pt-1 mt-1">
                          👉 {track.studyBenefit}
                        </p>
                      </div>
                    </button>

                    {/* Delete button for custom account-specific songs */}
                    {isCustom && (
                      <button
                        onClick={async (e) => {
                          e.stopPropagation();
                          if (confirm(`Bạn có chắc chắn muốn xóa bài hát '${track.title}'?`)) {
                            await deleteCustomTrack(track.id);
                          }
                        }}
                        className="p-1.5 text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all absolute right-2.5 top-2.5 z-20 cursor-pointer"
                        title="Xóa bài hát"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
