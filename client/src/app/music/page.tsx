'use client';

import React, { useState, useEffect } from 'react';
import { useMusic, Track } from '@/context/MusicContext';
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
  Timer
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MusicHub() {
  const { 
    tracks, 
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
    seek 
  } = useMusic();

  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes default
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerPreset, setTimerPreset] = useState(25);
  
  // Ambient Sound Overlay Simulation
  const [cafeMix, setCafeMix] = useState(0);
  const [rainMix, setRainMix] = useState(0);

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
      // Soft chime or vibration
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
            Nơi kết hợp hoàn hảo giữa những bản Lofi nhẹ nhàng, giai điệu Acoustic mộc mạc và công cụ Pomodoro giúp bạn đưa não bộ vào trạng thái tập trung sâu nhất (Deep Focus) khi học từ vựng và luyện nói tiếng Anh!
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
          </div>
        </div>
      </div>

      {/* Main Music Arena Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Center-Stage Vinyl Player */}
        <div className="lg:col-span-7 premium-card p-6 md:p-10 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl space-y-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
          
          {/* Track Detail Badge */}
          <div className="space-y-1 z-10">
            <span className="text-[9px] font-black uppercase tracking-widest text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
              {currentTrack.category}
            </span>
            <h2 className="text-xl md:text-2xl font-black text-white truncate max-w-md">{currentTrack.title}</h2>
            <p className="text-xs text-slate-400 font-bold">{currentTrack.artist}</p>
          </div>

          {/* Epic Interactive Rotating Vinyl */}
          <div className="relative w-56 h-56 md:w-64 md:h-64 shrink-0 flex items-center justify-center z-10">
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

            {/* Tonearm Player Needle Needle */}
            <div 
              className={cn(
                "absolute top-[-10px] right-[40px] w-24 h-24 origin-top-right transition-transform duration-700 pointer-events-none z-20",
                isPlaying ? "rotate-[15deg]" : "rotate-[0deg]"
              )}
            >
              {/* Silver Tonearm Vector */}
              <div className="w-2 h-20 bg-gradient-to-b from-slate-400 to-slate-200 rounded-full shadow-md ml-16" />
              <div className="w-4 h-6 bg-slate-800 border border-slate-700 rounded shadow-md ml-15 mt-[-5px]" />
            </div>
          </div>

          {/* Interactive Custom Progress Slider */}
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
              <span>{formatTime(durationSec || 372)}</span>
            </div>
          </div>

          {/* Media Player Controls Row */}
          <div className="flex items-center justify-center gap-6 z-10 select-none">
            <button
              onClick={prevTrack}
              className="p-3 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-2xl active:scale-90 transition-all border border-slate-800 cursor-pointer"
            >
              <SkipBack className="w-5 h-5 fill-slate-400 group-hover:fill-white" />
            </button>

            <button
              onClick={togglePlay}
              className="p-5 bg-primary text-white rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/30 cursor-pointer border border-primary/20"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-white" />
              ) : (
                <Play className="w-6 h-6 fill-white ml-1" />
              )}
            </button>

            <button
              onClick={nextTrack}
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

          {/* Interactive Lofi Sound Mixer */}
          <div className="premium-card p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl space-y-4">
            <h3 className="font-black text-sm text-white flex items-center gap-2">
              <Coffee className="w-4 h-4 text-amber-500" /> Ambient Noise Mixer (Mixer Âm Nền)
            </h3>
            <p className="text-slate-400 text-[10px] leading-relaxed font-medium">
              Tùy chỉnh tiếng ồn trắng xung quanh để hòa quyện cùng bản nhạc Lofi, tạo không gian thoải mái nhất!
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
                  onChange={(e) => setRainMix(parseInt(e.target.value))}
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
                  onChange={(e) => setCafeMix(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Playlist Track Selection Block */}
          <div className="premium-card p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl space-y-4">
            <h3 className="font-black text-sm text-white flex items-center gap-2">
              <Music className="w-4 h-4 text-primary" /> Lofi Study Playlist
            </h3>
            
            <div className="space-y-2.5 overflow-y-auto max-h-[300px] pr-1">
              {tracks.map((track) => {
                const isCurrent = track.id === currentTrack.id;
                return (
                  <button
                    key={track.id}
                    onClick={() => playTrack(track)}
                    className={cn(
                      "w-full text-left p-3 rounded-2xl border transition-all flex items-start gap-3 relative overflow-hidden group cursor-pointer",
                      isCurrent
                        ? "bg-slate-800 border-primary shadow-lg"
                        : "bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/30"
                    )}
                  >
                    {/* Visualizer animation on card */}
                    {isCurrent && isPlaying && (
                      <div className="absolute right-3 top-3 flex items-end gap-0.5 h-3">
                        <span className="w-0.5 h-full bg-primary rounded-full animate-bounce [animation-duration:0.6s]" />
                        <span className="w-0.5 h-3/4 bg-primary rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.1s]" />
                        <span className="w-0.5 h-1/2 bg-primary rounded-full animate-bounce [animation-duration:0.5s] [animation-delay:0.2s]" />
                      </div>
                    )}

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

                    <div className="flex-1 min-w-0 space-y-1 pr-4">
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
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
