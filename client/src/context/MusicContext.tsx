'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

export interface Track {
  id: number;
  title: string;
  artist: string;
  url: string;
  category: 'Lofi Beat' | 'Acoustic Focus' | 'Soft Piano' | 'Nature Ambient';
  duration: string;
  studyBenefit: string;
}

export const STUDY_TRACKS: Track[] = [
  {
    id: 1,
    title: "Lofi Raindrop Serenade",
    artist: "EngBot Lo-Fi Beats",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    category: "Lofi Beat",
    duration: "6:12",
    studyBenefit: "Bảo phế tiếng mưa rơi nhẹ giúp giảm căng thẳng và tăng 35% tập trung khi học từ vựng."
  },
  {
    id: 2,
    title: "Midnight Chillhop Study",
    artist: "Chillhop Lounge",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    category: "Lofi Beat",
    duration: "7:05",
    studyBenefit: "Nhịp điệu đều đặn (60-80 BPM) đưa não bộ vào trạng thái sóng Alpha lý tưởng cho việc ghi nhớ."
  },
  {
    id: 3,
    title: "Coffee Shop Guitar Vibe",
    artist: "Acoustic Focus Club",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    category: "Acoustic Focus",
    duration: "5:44",
    studyBenefit: "Tiếng guitar mộc mạc kích thích bán cầu não phải, phù hợp để ôn tập viết nhật ký Journal."
  },
  {
    id: 4,
    title: "English Acoustic Sunshine",
    artist: "Learn Vocal Melodies",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    category: "Acoustic Focus",
    duration: "5:02",
    studyBenefit: "Sự hòa quyện acoustic vui tươi giúp tinh thần phấn chấn khi thực hành Speaking Lab."
  },
  {
    id: 5,
    title: "Soft Piano Learning Wave",
    artist: "Classic Study Symphony",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    category: "Soft Piano",
    duration: "6:03",
    studyBenefit: "Giai điệu piano êm dịu, loại bỏ 90% tiếng ồn xung quanh để tối ưu khả năng học phát âm."
  }
];

interface MusicContextType {
  tracks: Track[];
  currentTrack: Track;
  isPlaying: boolean;
  volume: number;
  progress: number;
  durationSec: number;
  currentTimeSec: number;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  changeVolume: (val: number) => void;
  seek: (seconds: number) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track>(STUDY_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4); // Safe default 40% volume
  const [progress, setProgress] = useState(0);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [durationSec, setDurationSec] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element only on client-side to prevent Next.js SSR build errors
  useEffect(() => {
    const audio = new Audio(currentTrack.url);
    audio.loop = false; // Next track will play automatically on end
    audio.volume = volume;
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setCurrentTimeSec(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDurationSec(audio.duration || 0);
    };

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Sync volume with state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle playing source changes
  const playTrack = (track: Track) => {
    if (!audioRef.current) return;
    
    audioRef.current.pause();
    audioRef.current.src = track.url;
    audioRef.current.load();
    setCurrentTrack(track);
    setProgress(0);
    setCurrentTimeSec(0);

    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((e) => {
        console.error("Audio play failed:", e);
        setIsPlaying(false);
      });
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((e) => {
          console.error("Audio play failed:", e);
        });
    }
  };

  const nextTrack = () => {
    const currentIndex = STUDY_TRACKS.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % STUDY_TRACKS.length;
    // Play next
    const target = STUDY_TRACKS[nextIndex];
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = target.url;
      audioRef.current.load();
      setCurrentTrack(target);
      setProgress(0);
      setCurrentTimeSec(0);
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((e) => {
          console.log("Auto-next playback error:", e);
        });
    }
  };

  const prevTrack = () => {
    const currentIndex = STUDY_TRACKS.findIndex(t => t.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? STUDY_TRACKS.length - 1 : currentIndex - 1;
    playTrack(STUDY_TRACKS[prevIndex]);
  };

  const changeVolume = (val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolume(clamped);
  };

  const seek = (seconds: number) => {
    if (audioRef.current && audioRef.current.duration) {
      const clamped = Math.max(0, Math.min(audioRef.current.duration, seconds));
      audioRef.current.currentTime = clamped;
      setCurrentTimeSec(clamped);
      setProgress((clamped / audioRef.current.duration) * 100);
    }
  };

  return (
    <MusicContext.Provider value={{
      tracks: STUDY_TRACKS,
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
    }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}
