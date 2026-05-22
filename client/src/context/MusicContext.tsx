'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';

export interface Track {
  id: number;
  title: string;
  artist: string;
  url: string;
  category: string;
  duration: string;
  studyBenefit: string;
}

// 100% Clean, secure, CORS-free HTTPS Study & Focus tracks from highly-reliable educational music CDNs
export const STUDY_TRACKS: Track[] = [
  {
    id: 1,
    title: "Debussy: Clair de Lune",
    artist: "Claude Debussy (Focus Piano)",
    url: "https://www.mfiles.co.uk/mp3-downloads/debussy-clair-de-lune.mp3",
    category: "Soft Piano",
    duration: "5:05",
    studyBenefit: "Giai điệu piano kinh điển giúp xoa dịu thần kinh, tăng 35% khả năng ghi nhớ từ vựng."
  },
  {
    id: 2,
    title: "Bach: Cello Suite No. 1",
    artist: "J.S. Bach (Acoustic Strings)",
    url: "https://www.mfiles.co.uk/mp3-downloads/bach-cello-suite1-prelude.mp3",
    category: "Acoustic Focus",
    duration: "2:50",
    studyBenefit: "Tiếng cello trầm ấm đưa não bộ vào trạng thái sóng Alpha lý tưởng để làm Quiz & Games."
  },
  {
    id: 3,
    title: "Chopin: Nocturne Op. 9 No. 2",
    artist: "Frédéric Chopin (Study Mood)",
    url: "https://www.mfiles.co.uk/mp3-downloads/chopin-nocturne-op9-no2-piano.mp3",
    category: "Soft Piano",
    duration: "4:15",
    studyBenefit: "Khúc dạ khúc êm đềm giải tỏa 90% áp lực, giúp viết nhật ký Writing Journal trôi chảy hơn."
  },
  {
    id: 4,
    title: "Mozart: Rondo alla Turca",
    artist: "W.A. Mozart (Active Brainwaves)",
    url: "https://www.mfiles.co.uk/mp3-downloads/mozart-rondo-alla-turca-piano.mp3",
    category: "Classical Focus",
    duration: "3:12",
    studyBenefit: "Giai điệu vui tươi kích thích phản xạ từ vựng và lấy lại năng lượng khi học nói Speaking AI."
  },
  {
    id: 5,
    title: "Beethoven: Symphony No. 5",
    artist: "L. Beethoven (Deep Focus)",
    url: "https://www.mfiles.co.uk/mp3-downloads/beethoven-symphony5-1.mp3",
    category: "Classical Focus",
    duration: "7:25",
    studyBenefit: "Khúc giao hưởng hùng tráng giúp khơi gợi quyết tâm vượt qua các bài luyện nghe Listening khó."
  }
];

interface MusicContextType {
  tracks: Track[];
  customTracks: Track[];
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
  addCustomTrack: (title: string, artist: string, url: string, category?: string) => void;
  deleteCustomTrack: (id: number) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  const [customTracks, setCustomTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track>(STUDY_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0); // Full Volume by default
  const [progress, setProgress] = useState(0);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [durationSec, setDurationSec] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Combined tracks list
  const tracks = [...STUDY_TRACKS, ...customTracks];

  // Keep references to active state variables to prevent stale closures
  const tracksRef = useRef<Track[]>(tracks);
  const currentTrackRef = useRef<Track>(currentTrack);
  const isPlayingRef = useRef<boolean>(isPlaying);

  useEffect(() => {
    tracksRef.current = tracks;
  }, [tracks]);

  useEffect(() => {
    currentTrackRef.current = currentTrack;
  }, [currentTrack]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Initialize audio element ONLY ONCE on mount to ensure seamless playback without skips or resets!
  useEffect(() => {
    // Create an empty Audio element with CORS support enabled
    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    audio.loop = false;
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
      handleAutoNext();
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
  }, []); // Run exactly once on mount, keeping the audio element empty initially to prevent early load blocks!

  // Safe handler for automatic next song
  const handleAutoNext = () => {
    const currentTracks = tracksRef.current;
    const currentTrk = currentTrackRef.current;
    if (currentTracks.length === 0) return;
    const currentIndex = currentTracks.findIndex(t => t.id === currentTrk.id);
    const nextIndex = (currentIndex + 1) % currentTracks.length;
    playTrack(currentTracks[nextIndex]);
  };

  // Load custom tracks from localStorage when the active user changes (isolating tracks per account!)
  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`custom_tracks_${user.uid}`);
      if (stored) {
        try {
          setCustomTracks(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse custom tracks", e);
        }
      } else {
        setCustomTracks([]);
      }
    } else {
      setCustomTracks([]);
    }
  }, [user]);

  // Sync volume with state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle playing source changes
  const playTrack = (track: Track) => {
    if (!audioRef.current) return;
    
    try {
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
    } catch (err) {
      console.error("Audio source load error:", err);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    // Lazy load the current track source if it has never been set yet!
    if (!audioRef.current.src || audioRef.current.src === "") {
      audioRef.current.src = currentTrack.url;
      audioRef.current.load();
    }

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
    const currentTracks = tracksRef.current;
    const currentTrk = currentTrackRef.current;
    if (currentTracks.length === 0) return;
    const currentIndex = currentTracks.findIndex(t => t.id === currentTrk.id);
    const nextIndex = (currentIndex + 1) % currentTracks.length;
    playTrack(currentTracks[nextIndex]);
  };

  const prevTrack = () => {
    const currentTracks = tracksRef.current;
    const currentTrk = currentTrackRef.current;
    if (currentTracks.length === 0) return;
    const currentIndex = currentTracks.findIndex(t => t.id === currentTrk.id);
    const prevIndex = currentIndex === 0 ? currentTracks.length - 1 : currentIndex - 1;
    playTrack(currentTracks[prevIndex]);
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

  // Add custom user track (isolated strictly to the account)
  const addCustomTrack = (title: string, artist: string, url: string, category: string = "Custom Track") => {
    if (!user) return;
    const newTrack: Track = {
      id: Date.now(),
      title: title || "Bài hát tùy chọn",
      artist: artist || "Tài khoản của tôi",
      url: url,
      category: category,
      duration: "MP3",
      studyBenefit: "Bản nhạc cá nhân được lưu trữ riêng biệt trên tài khoản của bạn để ôn tập."
    };
    const updated = [...customTracks, newTrack];
    setCustomTracks(updated);
    localStorage.setItem(`custom_tracks_${user.uid}`, JSON.stringify(updated));
  };

  // Delete custom track
  const deleteCustomTrack = (id: number) => {
    if (!user) return;
    const updated = customTracks.filter(t => t.id !== id);
    setCustomTracks(updated);
    localStorage.setItem(`custom_tracks_${user.uid}`, JSON.stringify(updated));
    // If the currently playing track was deleted, fallback to default
    if (currentTrack.id === id) {
      playTrack(STUDY_TRACKS[0]);
    }
  };

  return (
    <MusicContext.Provider value={{
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
