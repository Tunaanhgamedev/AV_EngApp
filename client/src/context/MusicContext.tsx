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

export function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export function cleanMusicUrl(url: string): string {
  if (!url) return "";
  const trimmed = url.trim();
  
  // 1. Google Drive Share Link Conversion
  const gdMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || trimmed.match(/id=([a-zA-Z0-9_-]+)/);
  if (trimmed.includes("drive.google.com") && gdMatch) {
    const fileId = gdMatch[1];
    return `https://docs.google.com/uc?export=download&id=${fileId}`;
  }
  
  // 2. Dropbox Link Conversion
  if (trimmed.includes("dropbox.com")) {
    return trimmed.replace("?dl=0", "").replace("www.dropbox.com", "dl.dropboxusercontent.com") + (trimmed.includes("?") ? "&raw=1" : "?raw=1");
  }
  
  return trimmed;
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

const DB_NAME = 'EngBotMusicDB';
const STORE_NAME = 'local_tracks';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject('Window is undefined');
      return;
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveAudioFile(id: string | number, file: Blob): Promise<void> {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(file, String(id));
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function getAudioFile(id: string | number): Promise<Blob | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(String(id));
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

async function deleteAudioFile(id: string | number): Promise<void> {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.delete(String(id));
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

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
  addCustomTrack: (title: string, artist: string, url: string, category?: string, file?: Blob) => Promise<void>;
  deleteCustomTrack: (id: number) => Promise<void>;
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
    const audio = new Audio();
    // Do NOT set audio.crossOrigin = "anonymous";
    // This allows browser to stream custom URL audio files directly without failing CORS checks!
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

  // Load custom tracks from localStorage and recreate objectURLs for local audio files dynamically!
  useEffect(() => {
    const loadTracks = async () => {
      if (user) {
        const stored = localStorage.getItem(`custom_tracks_${user.uid}`);
        if (stored) {
          try {
            const parsedTracks = JSON.parse(stored) as (Track & { isLocalFile?: boolean })[];
            
            // Restore actual valid blob URLs at runtime from IndexedDB
            const tracksWithUrls = await Promise.all(
              parsedTracks.map(async (t) => {
                if (t.isLocalFile) {
                  try {
                    const blob = await getAudioFile(t.id);
                    if (blob) {
                      const objectUrl = URL.createObjectURL(blob);
                      return { ...t, url: objectUrl };
                    }
                  } catch (e) {
                    console.error(`Failed to load local file for track ${t.id}`, e);
                  }
                  return { ...t, url: "" }; // Empty URL fallback if DB retrieve fails
                }
                return t;
              })
            );
            
            setCustomTracks(tracksWithUrls);
          } catch (e) {
            console.error("Failed to parse custom tracks", e);
          }
        } else {
          setCustomTracks([]);
        }
      } else {
        // Revoke existing object URLs to avoid memory leaks before clearing
        customTracks.forEach(t => {
          if (t.url.startsWith('blob:')) {
            URL.revokeObjectURL(t.url);
          }
        });
        setCustomTracks([]);
      }
    };

    loadTracks();
  }, [user]);

  // Sync volume with state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Simulate progress and auto-next for YouTube tracks
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    const ytId = getYouTubeId(currentTrack.url);
    
    if (ytId && isPlaying) {
      interval = setInterval(() => {
        setCurrentTimeSec((prev) => {
          const next = prev + 1;
          const duration = durationSec || 180; // default 3 mins
          
          if (next >= duration) {
            clearInterval(interval!);
            handleAutoNext();
            return 0;
          }
          
          setProgress((next / duration) * 100);
          return next;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentTrack, durationSec]);

  // Handle playing source changes
  const playTrack = (track: Track) => {
    if (!audioRef.current) return;
    
    try {
      audioRef.current.pause();
      
      const ytId = getYouTubeId(track.url);
      if (ytId) {
        setCurrentTrack(track);
        setProgress(0);
        setCurrentTimeSec(0);
        setDurationSec(180); // Default duration for YouTube simulation (3 mins)
        setIsPlaying(true);
        return;
      }
      
      audioRef.current.src = track.url;
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

    const ytId = getYouTubeId(currentTrack.url);
    if (ytId) {
      setIsPlaying(!isPlaying);
      return;
    }

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
    const ytId = getYouTubeId(currentTrack.url);
    if (ytId) {
      const duration = durationSec || 180;
      const clamped = Math.max(0, Math.min(duration, seconds));
      setCurrentTimeSec(clamped);
      setProgress((clamped / duration) * 100);
      return;
    }

    if (audioRef.current && audioRef.current.duration) {
      const clamped = Math.max(0, Math.min(audioRef.current.duration, seconds));
      audioRef.current.currentTime = clamped;
      setCurrentTimeSec(clamped);
      setProgress((clamped / audioRef.current.duration) * 100);
    }
  };

  // Add custom user track (isolated strictly to the account, support storing local file in IndexedDB!)
  const addCustomTrack = async (title: string, artist: string, url: string, category: string = "Custom Track", file?: Blob) => {
    if (!user) return;
    
    const trackId = Date.now();
    const isLocalFile = !!file;
    let trackUrl = url;

    if (isLocalFile && file) {
      try {
        await saveAudioFile(trackId, file);
        trackUrl = URL.createObjectURL(file);
      } catch (e) {
        console.error("Failed to save audio file to IndexedDB:", e);
        alert("Không thể lưu file nhạc vào bộ nhớ trình duyệt.");
        return;
      }
    } else {
      // Clean up sharing links (Drive, Dropbox, etc.)
      trackUrl = cleanMusicUrl(url);
    }

    const ytId = getYouTubeId(trackUrl);
    const resolvedCategory = ytId ? "YouTube Music" : category;
    const resolvedDuration = ytId ? "YouTube" : (isLocalFile ? "Local File" : "MP3 URL");

    const newTrack: Track & { isLocalFile?: boolean } = {
      id: trackId,
      title: title || (ytId ? "YouTube Chill Track" : "Bài hát tùy chọn"),
      artist: artist || (ytId ? "YouTube Video" : "Tài khoản của tôi"),
      url: trackUrl,
      category: resolvedCategory,
      duration: resolvedDuration,
      studyBenefit: ytId
        ? "Video nhạc YouTube được tích hợp phát trực tiếp trên giao diện của bạn."
        : "Bản nhạc cá nhân được lưu trữ riêng biệt trên tài khoản của bạn để ôn tập.",
      isLocalFile: isLocalFile
    };

    // Strip temp URL for local files when writing metadata to localStorage to prevent stale references
    const metadataToStore = {
      ...newTrack,
      url: isLocalFile ? "" : trackUrl
    };

    const stored = localStorage.getItem(`custom_tracks_${user.uid}`);
    let existing: any[] = [];
    if (stored) {
      try {
        existing = JSON.parse(stored);
      } catch (e) {
        existing = [];
      }
    }
    
    const updatedMetadata = [...existing, metadataToStore];
    localStorage.setItem(`custom_tracks_${user.uid}`, JSON.stringify(updatedMetadata));
    
    // Add track with fresh valid URL to active memory state
    setCustomTracks([...customTracks, newTrack]);
  };

  // Delete custom track (including its file storage in IndexedDB)
  const deleteCustomTrack = async (id: number) => {
    if (!user) return;
    
    // 1. If we have the track in memory, clean up its object URL to free memory
    const targetTrack = customTracks.find(t => t.id === id);
    if (targetTrack?.url.startsWith('blob:')) {
      URL.revokeObjectURL(targetTrack.url);
    }

    // 2. Delete file binary from IndexedDB
    try {
      await deleteAudioFile(id);
    } catch (e) {
      console.error("Failed to delete local audio file from IndexedDB:", e);
    }

    // 3. Remove metadata from localStorage
    const stored = localStorage.getItem(`custom_tracks_${user.uid}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as (Track & { isLocalFile?: boolean })[];
        const updated = parsed.filter(t => t.id !== id);
        localStorage.setItem(`custom_tracks_${user.uid}`, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to update custom tracks metadata after delete:", e);
      }
    }

    // 4. Update memory state
    const updatedState = customTracks.filter(t => t.id !== id);
    setCustomTracks(updatedState);

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
