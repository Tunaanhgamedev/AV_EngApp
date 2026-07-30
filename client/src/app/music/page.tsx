'use client';

import React, { useState, useEffect, useRef, memo } from 'react';
import { useMusic, Track, getYouTubeId } from '@/context/MusicContext';
import { useAuth } from '@/context/AuthContext';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Coffee, 
  CloudRain, 
  Disc, 
  Headphones,
  Timer,
  Trash2,
  AlertCircle,
  Repeat,
  Shuffle,
  Activity,
  Zap,
  Wind,
  Music,
  Radio
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Animated Soundwave Audio Equalizer Component
const AudioEqualizer = memo(function AudioEqualizer({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-end justify-center gap-1.5 h-10 px-4 py-1 bg-slate-950/60 backdrop-blur-md rounded-full border border-white/10 shadow-inner">
      {[40, 75, 100, 60, 90, 45, 80, 100, 65, 85, 50, 95, 70, 40, 80, 60].map((height, i) => (
        <div
          key={i}
          className={cn(
            "w-1 rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300",
            isPlaying ? "animate-pulse" : "h-1 opacity-40"
          )}
          style={{
            height: isPlaying ? `${Math.max(15, Math.floor(Math.sin(i + Date.now() / 200) * 40 + height * 0.6))}%` : '4px',
            animationDelay: `${i * 120}ms`,
            animationDuration: `${600 + (i % 5) * 150}ms`
          }}
        />
      ))}
    </div>
  );
});

// Memoized Pomodoro Timer Widget to isolate 1-second interval state ticks from the main music page
const PomodoroTimerWidget = memo(function PomodoroTimerWidget() {
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerPreset, setTimerPreset] = useState(25);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime(t => t - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setIsTimerRunning(false);
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
  }, [isTimerRunning, pomodoroTime, timerPreset]);

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

  return (
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
  );
});

export default function MusicHub() {
  const { user } = useAuth();
  
  const { 
    tracks, 
    customTracks,
    currentTrack, 
    isPlaying, 
    isRepeat,
    isShuffle,
    volume, 
    progress, 
    durationSec, 
    currentTimeSec, 
    playTrack, 
    togglePlay, 
    toggleRepeat,
    toggleShuffle,
    nextTrack, 
    prevTrack, 
    changeVolume, 
    seek,
    addCustomTrack,
    deleteCustomTrack
  } = useMusic();

  const ytVideoId = getYouTubeId(currentTrack.url);

  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);
  
  // Ambient Sound Overlay State (0 to 100)
  const [cafeMix, setCafeMix] = useState(0);
  const [rainMix, setRainMix] = useState(0);

  // Binaural Brainwave State
  const [selectedBrainwave, setSelectedBrainwave] = useState<'off' | 'alpha' | 'beta' | 'theta'>('off');

  // HTML5 Audio elements refs for concurrent background ambient mixing
  const rainAudioRef = useRef<HTMLAudioElement | null>(null);
  const cafeAudioRef = useRef<HTMLAudioElement | null>(null);

  // Form states for adding custom songs
  const [newTitle, setNewTitle] = useState("");
  const [newArtist, setNewArtist] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [addMode, setAddMode] = useState<'url' | 'file'>('url');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  // Preset Ambient Mixers Handler
  const applyAmbientPreset = (preset: 'cafe_rain' | 'night_forest' | 'quiet_library' | 'off') => {
    let r = 0, c = 0;
    if (preset === 'cafe_rain') { r = 60; c = 40; }
    else if (preset === 'night_forest') { r = 85; c = 0; }
    else if (preset === 'quiet_library') { r = 20; c = 50; }
    
    setRainMix(r);
    setCafeMix(c);
    unlockAmbientSounds(r, c);
  };

  // Sync Rain Sound Volume & State in Realtime
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

  // Sync Cafe Sound Volume & State in Realtime
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
      
      {/* Premium Ambient Header */}
      <div className="relative overflow-hidden bg-slate-900 text-white rounded-3xl p-8 md:p-10 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-3 relative z-10 text-center md:text-left max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-yellow-400 fill-yellow-400" /> Study Music & Binaural Beats Hub
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Không Gian Âm Nhạc Tập Trung Sâu
          </h1>
          <p className="text-slate-400 text-xs md:text-sm font-medium leading-relaxed">
            Kết hợp nhạc Classical, sóng não Alpha Waves, hòa tấu Acoustic cùng âm thanh môi trường (Tiếng mưa, Quán cà phê) và bộ đếm Pomodoro giúp não bộ tiếp thu từ vựng nhanh gấp 2 lần!
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
          <div className="space-y-1.5 z-10">
            <div className="flex items-center justify-center gap-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                {currentTrack.category}
              </span>
              {currentTrack.studyBenefit && (
                <span className="text-[9px] font-bold text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400" /> Focus Boost
                </span>
              )}
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white truncate max-w-md">{currentTrack.title}</h2>
            <p className="text-xs text-slate-400 font-bold">{currentTrack.artist}</p>
            {currentTrack.studyBenefit && (
              <p className="text-[11px] text-indigo-300 font-semibold max-w-md mx-auto pt-1 bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-500/20">
                💡 {currentTrack.studyBenefit}
              </p>
            )}
          </div>

          {/* Audio Equalizer Soundwave Display */}
          <div className="w-full z-10 max-w-sm">
            <AudioEqualizer isPlaying={isPlaying} />
          </div>

          {/* Interactive Rotating Vinyl or YouTube Player */}
          {ytVideoId ? (
            <div className="relative w-full aspect-video md:w-[480px] rounded-2xl overflow-hidden shadow-2xl border border-slate-800 z-10">
              <iframe
                src={`https://www.youtube.com/embed/${ytVideoId}?autoplay=${isPlaying ? 1 : 0}&enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
                title={currentTrack.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          ) : (
            <div className="relative w-56 h-56 md:w-64 md:h-64 shrink-0 flex items-center justify-center z-10">
              <div className={cn(
                "absolute inset-0 rounded-full bg-indigo-500/10 blur-xl transition-all duration-1000",
                isPlaying ? "scale-105 opacity-100 animate-pulse" : "scale-95 opacity-50"
              )} />
              
              <div className={cn(
                "w-full h-full rounded-full bg-slate-950 border-4 border-slate-800 shadow-2xl relative flex items-center justify-center transition-all overflow-hidden duration-1000",
                isPlaying ? "animate-spin [animation-duration:15s]" : ""
              )}>
                <div className="absolute inset-2 rounded-full border border-white/5" />
                <div className="absolute inset-6 rounded-full border border-white/10" />
                <div className="absolute inset-10 rounded-full border border-white/5" />
                <div className="absolute inset-16 rounded-full border border-white/10" />
                
                <div className="absolute inset-20 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-500 flex items-center justify-center border-2 border-slate-800">
                  <Disc className="w-10 h-10 text-white/95 animate-pulse" />
                </div>
              </div>

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
          )}

          {/* Progress Slider */}
          <div className="w-full space-y-2 z-10">
            <div 
              onClick={handleProgressClick}
              className="w-full h-2 bg-slate-800 rounded-full cursor-pointer relative overflow-hidden group/progress"
            >
              <div 
                className="h-full bg-gradient-to-r from-primary via-purple-500 to-indigo-500 rounded-full transition-all duration-100" 
                style={{ width: `${progress}%` }} 
              />
              <div className="absolute top-0 bottom-0 left-0 right-0 bg-transparent hover:bg-white/5 transition-all" />
            </div>
            <div className="flex justify-between text-[10px] font-bold text-slate-400 select-none">
              <span>{formatTime(currentTimeSec)}</span>
              <span>{formatTime(durationSec || 300)}</span>
            </div>
          </div>

          {/* Main Controls & Repeat/Shuffle */}
          <div className="flex items-center justify-center gap-4 md:gap-6 z-10 select-none">
            <button
              onClick={toggleShuffle}
              className={cn(
                "p-3 rounded-2xl transition-all border cursor-pointer",
                isShuffle
                  ? "bg-primary/20 border-primary text-primary shadow-lg shadow-primary/20"
                  : "bg-slate-800/80 border-slate-800 text-slate-400 hover:text-white"
              )}
              title="Phát ngẫu nhiên (Shuffle)"
            >
              <Shuffle className="w-4 h-4" />
            </button>

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

            <button
              onClick={toggleRepeat}
              className={cn(
                "p-3 rounded-2xl transition-all border cursor-pointer",
                isRepeat
                  ? "bg-primary/20 border-primary text-primary shadow-lg shadow-primary/20"
                  : "bg-slate-800/80 border-slate-800 text-slate-400 hover:text-white"
              )}
              title="Lặp lại bài hát (Repeat)"
            >
              <Repeat className="w-4 h-4" />
            </button>
          </div>

          {/* Volume */}
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

        {/* Right Side: Playlists, Brainwave & Ambient Presets */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Memoized Pomodoro Focus Timer Block */}
          <PomodoroTimerWidget />

          {/* Binaural Brainwaves & Study Sound Generator */}
          <div className="premium-card p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl space-y-4">
            <h3 className="font-black text-sm text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400 animate-pulse" /> Bộ Phát Sóng Não Tần Số Học Tập (Brainwaves)
            </h3>
            
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'alpha', name: 'Sóng Alpha (10Hz)', desc: 'Ghi nhớ từ vựng nhanh', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
                { id: 'beta', name: 'Sóng Beta (20Hz)', desc: 'Tập trung tư duy cao độ', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
                { id: 'theta', name: 'Sóng Theta (6Hz)', desc: 'Sáng tạo bài viết Writing', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
                { id: 'off', name: 'Tắt Sóng Não', desc: 'Chỉ nghe nhạc thường', color: 'bg-slate-800 text-slate-400 border-slate-700' }
              ].map(b => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBrainwave(b.id as any)}
                  className={cn(
                    "p-3 rounded-2xl border text-left transition-all cursor-pointer",
                    selectedBrainwave === b.id
                      ? `${b.color} font-black shadow-md`
                      : "bg-slate-800/60 border-slate-800 text-slate-300 hover:bg-slate-800"
                  )}
                >
                  <p className="text-xs font-black truncate">{b.name}</p>
                  <p className="text-[9px] text-slate-400 font-medium truncate mt-0.5">{b.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Ambient Mixers Overlay & Presets */}
          <div className="premium-card p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-sm text-white flex items-center gap-2">
                <CloudRain className="w-4 h-4 text-blue-400" /> Phối Âm Môi Trường (Ambient Mixers)
              </h3>
            </div>

            {/* Quick One-Tap Ambient Presets */}
            <div className="flex gap-2">
              <button
                onClick={() => applyAmbientPreset('cafe_rain')}
                className="flex-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-[10px] font-black text-slate-300 transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                ☕ Quán Cà Phê Mưa
              </button>
              <button
                onClick={() => applyAmbientPreset('night_forest')}
                className="flex-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-[10px] font-black text-slate-300 transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                🌲 Đêm Rừng
              </button>
              <button
                onClick={() => applyAmbientPreset('off')}
                className="py-1.5 px-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-[10px] font-bold text-slate-400 transition-all cursor-pointer"
              >
                Tắt phối âm
              </button>
            </div>
            
            <div className="space-y-3 pt-1">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300 flex items-center gap-1.5"><CloudRain className="w-3.5 h-3.5 text-blue-400" /> Tiếng Mưa Rơi (Rain)</span>
                  <span className="text-blue-400 font-mono">{rainMix}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rainMix}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setRainMix(val);
                    unlockAmbientSounds(val, cafeMix);
                  }}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300 flex items-center gap-1.5"><Coffee className="w-3.5 h-3.5 text-amber-400" /> Quán Cà Phê (Lo-Fi Cafe)</span>
                  <span className="text-amber-400 font-mono">{cafeMix}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={cafeMix}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setCafeMix(val);
                    unlockAmbientSounds(rainMix, val);
                  }}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
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

                <div className="flex bg-slate-800 p-1 rounded-xl gap-1 border border-slate-700">
                  <button
                    type="button"
                    onClick={() => setAddMode('url')}
                    className={cn(
                      "flex-1 py-1.5 text-center text-[10px] font-black rounded-lg transition-all cursor-pointer",
                      addMode === 'url' ? "bg-primary text-white" : "text-slate-400 hover:text-white"
                    )}
                  >
                    Dán Link MP3 / YouTube
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddMode('file')}
                    className={cn(
                      "flex-1 py-1.5 text-center text-[10px] font-black rounded-lg transition-all cursor-pointer",
                      addMode === 'file' ? "bg-primary text-white" : "text-slate-400 hover:text-white"
                    )}
                  >
                    Tải File Từ Máy (.mp3)
                  </button>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Tên bài hát..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-primary"
                  />

                  <input
                    type="text"
                    placeholder="Ca sĩ / Tác giả..."
                    value={newArtist}
                    onChange={(e) => setNewArtist(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-primary"
                  />

                  {addMode === 'url' ? (
                    <input
                      type="url"
                      placeholder="Link nhạc MP3 hoặc YouTube URL..."
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      required
                      className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-primary"
                    />
                  ) : (
                    <div className="relative">
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={handleFileChange}
                        required
                        className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-800 file:text-primary hover:file:bg-slate-700 cursor-pointer"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-primary text-white font-black text-xs rounded-xl shadow-md shadow-primary/20 hover:opacity-90 transition-all cursor-pointer"
                >
                  Thêm Bài Hát
                </button>
              </form>
            ) : (
              <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700/50 text-center space-y-2">
                <AlertCircle className="w-5 h-5 text-amber-400 mx-auto" />
                <p className="text-xs text-slate-300 font-bold">Vui lòng đăng nhập để lưu bài hát cá nhân!</p>
              </div>
            )}

            {/* Custom Track List */}
            {customTracks.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bài Hát Đã Thêm ({customTracks.length})</h4>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {customTracks.map((ct) => (
                    <div key={ct.id} className="flex items-center justify-between p-2 bg-slate-800/80 rounded-xl border border-slate-700 text-xs">
                      <button
                        onClick={() => {
                          playTrack(ct);
                          unlockAmbientSounds(rainMix, cafeMix, true);
                        }}
                        className="flex-1 text-left font-bold text-white truncate hover:text-primary transition-colors cursor-pointer"
                      >
                        {ct.title}
                      </button>
                      <button
                        onClick={() => deleteCustomTrack(ct.id)}
                        className="p-1 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer ml-2"
                        title="Xóa bài hát"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Full Study Playlist Cards */}
          <div className="premium-card p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl space-y-3">
            <h3 className="font-black text-sm text-white flex items-center gap-2">
              <Disc className="w-4 h-4 text-purple-400" /> Danh Sách Nhạc Nhớ Lâu ({tracks.length} bài)
            </h3>

            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {tracks.map((t) => {
                const isActive = currentTrack.id === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      playTrack(t);
                      unlockAmbientSounds(rainMix, cafeMix, true);
                    }}
                    className={cn(
                      "w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between group cursor-pointer",
                      isActive
                        ? "bg-primary/20 border-primary text-white shadow-md"
                        : "bg-slate-800/50 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700"
                    )}
                  >
                    <div className="space-y-0.5 truncate pr-2">
                      <p className="text-xs font-bold truncate group-hover:text-primary transition-colors">{t.title}</p>
                      <p className="text-[10px] text-slate-400 font-medium truncate">{t.artist} · <span className="text-slate-400 font-bold">{t.category}</span></p>
                    </div>

                    <div className="shrink-0">
                      {isActive && isPlaying ? (
                        <div className="w-7 h-7 rounded-xl bg-primary text-white flex items-center justify-center shadow-md">
                          <Pause className="w-3.5 h-3.5 fill-white" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-xl bg-slate-800 text-slate-400 group-hover:text-white group-hover:bg-slate-700 flex items-center justify-center transition-all">
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
