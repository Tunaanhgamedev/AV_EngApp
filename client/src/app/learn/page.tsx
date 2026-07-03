'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Volume2, 
  XCircle, 
  Lightbulb, 
  CheckCircle2,
  BrainCircuit,
  ChevronRight,
  Loader2,
  Trophy,
  User,
  Users,
  Search,
  Star,
  Clock,
  GraduationCap,
  Award,
  HelpCircle,
  Check,
  Info,
  Play,
  Home,
  Briefcase,
  Shirt,
  Cat,
  Heart,
  BookOpen,
  Car,
  Building2,
  Cpu,
  Landmark,
  Utensils,
  Compass,
  Cloud,
  Coins,
  Palette,
  Scale,
  ShoppingBag
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { VOCABULARY_TOPICS } from './vocabularyData';

interface Word {
  id: string;
  word: string;
  phonetic: string;
  meaningEn: string;
  meaningVi: string;
  wordType: string;
  cefrLevel: string;
  audioUs?: string;
  usage?: string;
  example?: string;
  exampleVi?: string;
}

const levels = [
  { level: 'A1', label: 'Beginner', desc: 'Everyday basics: family, food, numbers', color: 'from-emerald-400 to-green-500', difficulty: '★', words: '~500' },
  { level: 'A2', label: 'Elementary', desc: 'Simple routines: shopping, travel, directions', color: 'from-cyan-400 to-blue-500', difficulty: '★★', words: '~500' },
  { level: 'B1', label: 'Intermediate', desc: 'Work, education, opinions, and experiences', color: 'from-indigo-400 to-violet-500', difficulty: '★★★', words: '~1000' },
  { level: 'B2', label: 'Upper-Intermediate', desc: 'Abstract ideas, news, technical discussions', color: 'from-purple-400 to-fuchsia-500', difficulty: '★★★★', words: '~1000' },
  { level: 'C1', label: 'Advanced', desc: 'Academic texts, complex arguments', color: 'from-rose-400 to-pink-500', difficulty: '★★★★★', words: '~500' },
  { level: 'C2', label: 'Proficiency', desc: 'Native-like precision and nuance', color: 'from-orange-400 to-amber-500', difficulty: '🏆', words: '~200' },
];



const speak = (text: string) => {
  if (typeof window !== 'undefined') {
    const playTranslateTTS = () => {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(text)}`;
      const audio = new Audio(url);
      audio.play().catch((err) => {
        console.error("Google Translate TTS fallback failed:", err);
      });
    };

    if (window.speechSynthesis) {
      const voices = window.speechSynthesis.getVoices();
      
      // Fallback to Translate TTS if no voices are loaded/installed
      if (voices.length === 0) {
        playTranslateTTS();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.75;
      
      const voicesList = window.speechSynthesis.getVoices();
      const preferredVoice = voicesList.find(v => v.name.includes('Google') && v.lang === 'en-US') || 
                             voicesList.find(v => v.lang === 'en-US');
      
      if (preferredVoice) utterance.voice = preferredVoice;

      utterance.onerror = (e) => {
        console.log("speechSynthesis error, playing Google Translate TTS:", e);
        playTranslateTTS();
      };

      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        setTimeout(() => {
          window.speechSynthesis.speak(utterance);
        }, 50);
      } else {
        window.speechSynthesis.speak(utterance);
      }
    } else {
      playTranslateTTS();
    }
  }
};

// Icon mapping for vocabulary topics (data imported from vocabularyData.ts)
const TOPIC_ICONS: Record<string, any> = {
  people: User,
  animals: Cat,
  jobs: Briefcase,
  school: BookOpen,
  clothes: Shirt,
  objects: Home,
  house: Landmark,
  vehicles: Car,
  company: Building2,
  it: Cpu,
  food: Utensils,
  health: Heart,
  travel: Compass,
  sports: Trophy,
  weather: Cloud,
  money: Coins,
  art_media: Palette,
  science_tech: Cpu,
  society_law: Scale,
  shopping: ShoppingBag,
  nature: Cloud,
  feelings: Heart,
  hobbies: Play,
  town: Home,
  business: Briefcase,
  family: Users,
  history: Award,
};

// Category mapping for search filters
const TOPIC_CATEGORIES: Record<string, 'daily' | 'work_tech' | 'society_env'> = {
  people: 'daily',
  animals: 'daily',
  clothes: 'daily',
  food: 'daily',
  health: 'daily',
  travel: 'daily',
  sports: 'daily',
  feelings: 'daily',
  hobbies: 'daily',
  family: 'daily',
  
  jobs: 'work_tech',
  school: 'work_tech',
  company: 'work_tech',
  it: 'work_tech',
  money: 'work_tech',
  science_tech: 'work_tech',
  business: 'work_tech',
  
  objects: 'society_env',
  house: 'society_env',
  vehicles: 'society_env',
  weather: 'society_env',
  art_media: 'society_env',
  society_law: 'society_env',
  shopping: 'society_env',
  nature: 'society_env',
  town: 'society_env',
  history: 'society_env'
};

// UI Accent Color parser helper
const getTopicColorClasses = (colorStr: string) => {
  const normalized = colorStr.toLowerCase();
  let color = 'slate';
  if (normalized.includes('emerald')) color = 'emerald';
  else if (normalized.includes('green')) color = 'green';
  else if (normalized.includes('blue')) color = 'blue';
  else if (normalized.includes('amber')) color = 'amber';
  else if (normalized.includes('indigo')) color = 'indigo';
  else if (normalized.includes('violet')) color = 'violet';
  else if (normalized.includes('rose')) color = 'rose';
  else if (normalized.includes('orange')) color = 'orange';
  else if (normalized.includes('sky')) color = 'sky';
  else if (normalized.includes('cyan')) color = 'cyan';
  else if (normalized.includes('pink')) color = 'pink';
  else if (normalized.includes('teal')) color = 'teal';
  else if (normalized.includes('purple')) color = 'purple';
  
  const map: Record<string, { iconBg: string, iconText: string, borderHover: string, textAccent: string }> = {
    emerald: {
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/40',
      iconText: 'text-emerald-600 dark:text-emerald-400',
      borderHover: 'hover:border-emerald-400 dark:hover:border-emerald-500',
      textAccent: 'text-emerald-600 dark:text-emerald-400'
    },
    green: {
      iconBg: 'bg-green-50 dark:bg-green-950/40',
      iconText: 'text-green-600 dark:text-green-400',
      borderHover: 'hover:border-green-400 dark:hover:border-green-500',
      textAccent: 'text-green-600 dark:text-green-400'
    },
    blue: {
      iconBg: 'bg-blue-50 dark:bg-blue-950/40',
      iconText: 'text-blue-600 dark:text-blue-400',
      borderHover: 'hover:border-blue-400 dark:hover:border-blue-500',
      textAccent: 'text-blue-600 dark:text-blue-400'
    },
    amber: {
      iconBg: 'bg-amber-50 dark:bg-amber-950/40',
      iconText: 'text-amber-600 dark:text-amber-400',
      borderHover: 'hover:border-amber-400 dark:hover:border-amber-500',
      textAccent: 'text-amber-600 dark:text-amber-400'
    },
    indigo: {
      iconBg: 'bg-indigo-50 dark:bg-indigo-950/40',
      iconText: 'text-indigo-600 dark:text-indigo-400',
      borderHover: 'hover:border-indigo-400 dark:hover:border-indigo-500',
      textAccent: 'text-indigo-600 dark:text-indigo-400'
    },
    violet: {
      iconBg: 'bg-violet-50 dark:bg-violet-950/40',
      iconText: 'text-violet-600 dark:text-violet-400',
      borderHover: 'hover:border-violet-400 dark:hover:border-violet-500',
      textAccent: 'text-violet-600 dark:text-violet-400'
    },
    rose: {
      iconBg: 'bg-rose-50 dark:bg-rose-950/40',
      iconText: 'text-rose-600 dark:text-rose-400',
      borderHover: 'hover:border-rose-400 dark:hover:border-rose-500',
      textAccent: 'text-rose-600 dark:text-rose-400'
    },
    orange: {
      iconBg: 'bg-orange-50 dark:bg-orange-950/40',
      iconText: 'text-orange-600 dark:text-orange-400',
      borderHover: 'hover:border-orange-400 dark:hover:border-orange-500',
      textAccent: 'text-orange-600 dark:text-orange-400'
    },
    sky: {
      iconBg: 'bg-sky-50 dark:bg-sky-950/40',
      iconText: 'text-sky-600 dark:text-sky-400',
      borderHover: 'hover:border-sky-400 dark:hover:border-sky-500',
      textAccent: 'text-sky-600 dark:text-sky-400'
    },
    cyan: {
      iconBg: 'bg-cyan-50 dark:bg-cyan-950/40',
      iconText: 'text-cyan-600 dark:text-cyan-400',
      borderHover: 'hover:border-cyan-400 dark:hover:border-cyan-500',
      textAccent: 'text-cyan-600 dark:text-cyan-400'
    },
    pink: {
      iconBg: 'bg-pink-50 dark:bg-pink-950/40',
      iconText: 'text-pink-600 dark:text-pink-400',
      borderHover: 'hover:border-pink-400 dark:hover:border-pink-500',
      textAccent: 'text-pink-600 dark:text-pink-400'
    },
    teal: {
      iconBg: 'bg-teal-50 dark:bg-teal-950/40',
      iconText: 'text-teal-600 dark:text-teal-400',
      borderHover: 'hover:border-teal-400 dark:hover:border-teal-500',
      textAccent: 'text-teal-600 dark:text-teal-400'
    },
    purple: {
      iconBg: 'bg-purple-50 dark:bg-purple-950/40',
      iconText: 'text-purple-600 dark:text-purple-400',
      borderHover: 'hover:border-purple-400 dark:hover:border-purple-500',
      textAccent: 'text-purple-600 dark:text-purple-400'
    },
    slate: {
      iconBg: 'bg-slate-50 dark:bg-slate-900',
      iconText: 'text-slate-600 dark:text-slate-400',
      borderHover: 'hover:border-slate-400 dark:hover:border-slate-500',
      textAccent: 'text-slate-600 dark:text-slate-400'
    }
  };
  return map[color] || map.slate;
};


export default function LearnPage() {
  const { user } = useAuth();
  
  // Tab/Mode select state
  const [activeMode, setActiveMode] = useState<'vocabulary' | 'topics'>('vocabulary');
  
  // Topic search & filter states
  const [vocabSearchQuery, setVocabSearchQuery] = useState('');
  const [vocabActiveCategory, setVocabActiveCategory] = useState<'all' | 'daily' | 'work_tech' | 'society_env'>('all');
  
  // Vocabulary Flashcard states
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Vocabulary by Topic states
  const [selectedVocabTopicId, setSelectedVocabTopicId] = useState<string | null>(null);
  const [vocabLevel, setVocabLevel] = useState<'beginner' | 'advanced'>('beginner');
  const [vocabIndex, setVocabIndex] = useState<number>(0);
  const [showVocabHint, setShowVocabHint] = useState<boolean>(false);
  const [vocabCompleted, setVocabCompleted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'card' | 'list'>('card');

  const activeVocabTopic = VOCABULARY_TOPICS.find(t => t.id === selectedVocabTopicId);
  const activeVocabWords = activeVocabTopic ? activeVocabTopic[vocabLevel] : [];

  // Filtered topics based on search & category
  const filteredVocabTopics = VOCABULARY_TOPICS.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(vocabSearchQuery.toLowerCase()) || 
                          topic.desc.toLowerCase().includes(vocabSearchQuery.toLowerCase());
    const matchesCategory = vocabActiveCategory === 'all' || TOPIC_CATEGORIES[topic.id] === vocabActiveCategory;
    return matchesSearch && matchesCategory;
  });

  // Fetch words effect
  useEffect(() => {
    const fetchNewWords = async () => {
      if (!selectedLevel) return;
      setLoading(true);
      setWords([]);
      setCurrentIndex(0);
      setCompleted(false);
      
      try {
        const headers: Record<string, string> = {};
        if (user) {
          const token = await user.getIdToken();
          headers['Authorization'] = `Bearer ${token}`;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/vocabulary/learn-new?level=${selectedLevel}&limit=15`, {
          headers
        });
        const data = await res.json();
        setWords(data.words || []);
      } catch (err) {
        console.error(err);
        setWords([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNewWords();
  }, [user, selectedLevel]);

  // On-demand and background enrichment for words in study session
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    const enrichCurrentAndNext = async () => {
      if (activeMode !== 'vocabulary' || words.length === 0) return;
      
      // Helper to enrich a word by index
      const enrichAtIndex = async (idx: number) => {
        if (idx < 0 || idx >= words.length) return false;
        const wObj = words[idx];
        const needsEn = !wObj.meaningVi || wObj.meaningVi === wObj.word;
        if (!needsEn) return false;
        
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/vocabulary/search?word=${wObj.word}`);
          if (res.ok) {
            const data = await res.json();
            if (data.word) {
              setWords(prev => {
                const updated = [...prev];
                if (updated[idx] && updated[idx].word === wObj.word) {
                  updated[idx] = {
                    ...updated[idx],
                    meaningVi: data.word.meaningVi,
                    meaningEn: data.word.meaningEn || updated[idx].meaningEn,
                    phonetic: data.word.phonetic || updated[idx].phonetic,
                    wordType: data.word.wordType || updated[idx].wordType,
                    example: data.word.example || updated[idx].example,
                    exampleVi: data.word.exampleVi || updated[idx].exampleVi
                  };
                }
                return updated;
              });
              return true;
            }
          }
        } catch (e) {
          console.error("Pre-enrich failed for index", idx, e);
        }
        return false;
      };

      // 1. Enrich current word first (high priority)
      const currentWordObj = words[currentIndex];
      if (currentWordObj && (!currentWordObj.meaningVi || currentWordObj.meaningVi === currentWordObj.word)) {
        await enrichAtIndex(currentIndex);
      }
      
      // 2. Pre-enrich next word in the background (low priority)
      const nextIndex = currentIndex + 1;
      if (nextIndex < words.length) {
        const nextWordObj = words[nextIndex];
        if (nextWordObj && (!nextWordObj.meaningVi || nextWordObj.meaningVi === nextWordObj.word)) {
          timer = setTimeout(() => {
            enrichAtIndex(nextIndex);
          }, 800);
        }
      }
    };

    enrichCurrentAndNext();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentIndex, words.length, activeMode]);

  const playPronunciation = () => {
    const word = words[currentIndex];
    if (!word) return;
    
    // Warm up speech synthesis immediately and synchronously in the direct user gesture
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        const dummy = new SpeechSynthesisUtterance('');
        window.speechSynthesis.speak(dummy);
      } catch (e) {}
    }
    
    if (word.audioUs) {
      const audio = new Audio(word.audioUs);
      audio.play().catch((err) => {
        console.log("Audio play failed, falling back to speech synthesis:", err);
        speak(word.word);
      });
    } else {
      speak(word.word);
    }
  };

  // Auto-play vocab card pronunciation
  useEffect(() => {
    if (activeMode === 'vocabulary' && words[currentIndex] && !loading && !completed) {
      const timer = setTimeout(() => playPronunciation(), 600);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, words, loading, completed, activeMode]);

  const handleNext = () => {
    // Synchronously unlock voice on user gesture
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        const dummy = new SpeechSynthesisUtterance('');
        window.speechSynthesis.speak(dummy);
      } catch (e) {}
    }
    setShowHint(false);
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(((currentIndex + 1) / words.length) * 100);
    } else {
      setCompleted(true);
    }
  };

  const handleIKnowIt = async () => {
    // Synchronously unlock voice on user gesture
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        const dummy = new SpeechSynthesisUtterance('');
        window.speechSynthesis.speak(dummy);
      } catch (e) {}
    }
    const word = words[currentIndex];
    if (user && word) {
      try {
        const token = await user.getIdToken();
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/vocabulary/save`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ wordId: word.id })
        });
      } catch (err) {
        console.error('Save error:', err);
      }
    }
    handleNext();
  };



  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-8 animate-in fade-in duration-700 pb-12">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/60 dark:border-slate-800/60 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" /> Study Center
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">
            Học từ vựng theo trình độ CEFR chuẩn quốc tế và theo các chủ đề thông dụng hàng ngày.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl self-start md:self-center">
          <button
            onClick={() => setActiveMode('vocabulary')}
            className={cn(
              "px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer",
              activeMode === 'vocabulary' 
                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 shadow-md" 
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            )}
          >
            <BrainCircuit className="w-4 h-4" /> Từ Vựng CEFR
          </button>
          <button
            onClick={() => setActiveMode('topics')}
            className={cn(
              "px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer",
              activeMode === 'topics' 
                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 shadow-md" 
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            )}
          >
            <BookOpen className="w-4 h-4" /> Chủ Đề
          </button>
        </div>
      </header>


      {/* ════════════════════════════════════════════ CEFR VOCABULARY MODE ═════════ */}
      {activeMode === 'vocabulary' && (
        <>
          {!selectedLevel ? (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-105 rounded-full">
                  <BrainCircuit className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Daily Flashcards</span>
                </div>
                <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Vocabulary CEFR levels</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm font-sans">Học 15 từ vựng mới mỗi ngày theo trình độ tiêu chuẩn Châu Âu.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {levels.map(l => (
                  <button 
                    key={l.level} 
                    onClick={() => setSelectedLevel(l.level)}
                    className="bg-white dark:bg-slate-950 rounded-[2rem] p-6 border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-600 dark:hover:border-blue-400 flex flex-col items-start gap-4 hover:shadow-xl transition-all group text-left relative overflow-hidden cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${l.color} flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:scale-105 transition-transform`}>
                        {l.level}
                      </div>
                      <span className="text-amber-500 dark:text-amber-400 text-sm font-bold">{l.difficulty}</span>
                    </div>
                    <div>
                      <h3 className="font-black text-lg text-slate-800 dark:text-slate-150">{l.label}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed font-medium">{l.desc}</p>
                    </div>
                    <div className="flex items-center justify-between w-full pt-3 border-t border-slate-100 dark:border-slate-800/80">
                      <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">{l.words} words</span>
                      <span className="text-xs font-black text-[#002147] dark:text-sky-400 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                        Bắt đầu <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : loading ? (
            <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4">
              <Loader2 className="w-10 h-10 text-[#002147] dark:text-sky-400 animate-spin" />
              <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-xs animate-pulse">Đang tải từ mới...</p>
            </div>
          ) : words.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[40vh] text-center space-y-6">
              <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center">
                <BrainCircuit className="w-10 h-10 text-slate-300 dark:text-slate-700" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-800 dark:text-slate-105">Không có dữ liệu từ mới</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 font-medium">Hiện tại không thể tải từ vựng mới cấp độ {selectedLevel}. Vui lòng thử lại sau.</p>
              </div>
              <button 
                onClick={() => setSelectedLevel(null)}
                className="px-8 py-3 bg-[#002147] dark:bg-slate-100 text-white dark:text-slate-950 rounded-xl font-bold hover:shadow-lg transition-all cursor-pointer"
              >
                Trở lại Chọn Trình Độ
              </button>
            </div>
          ) : completed ? (
            <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-6 text-center animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl shadow-yellow-100 dark:shadow-none">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-800 dark:text-slate-105">Tuyệt vời!</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">Bạn đã hoàn thành việc học 15 từ vựng mới cấp độ {selectedLevel}.</p>
              </div>
              <button 
                onClick={() => setSelectedLevel(null)}
                className="px-10 py-3 bg-[#002147] dark:bg-slate-100 text-white dark:text-slate-950 rounded-xl font-bold shadow-md cursor-pointer"
              >
                Tiếp Tục Học
              </button>
            </div>
          ) : (
            // Flashcard content
            <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setSelectedLevel(null)}
                  className="flex items-center gap-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold transition-colors cursor-pointer text-xs"
                >
                  <ChevronLeft className="w-4 h-4" /> Chọn Cấp Độ
                </button>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 bg-green-50 border border-green-100 dark:bg-green-950/30 dark:border-green-900/50 text-xs font-bold text-green-700 dark:text-green-400 rounded-full">{selectedLevel}</span>
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500">{currentIndex + 1}/{words.length}</span>
                </div>
              </div>

              {/* Word Flashcard */}
              <div className="perspective-1000 w-full h-[280px] xs:h-[320px] sm:h-[360px] md:h-[400px] landscape:h-[260px] landscape:sm:h-[300px]">
                <div className={cn(
                  "relative w-full h-full preserve-3d transition-transform duration-500 border border-slate-200/80 dark:border-slate-800/80 rounded-[2.5rem] shadow-xl",
                  showHint ? "rotate-y-180" : ""
                )}>
                  {/* Front Side */}
                  <div className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center text-center bg-white dark:bg-slate-950 p-6 sm:p-8 rounded-[2.5rem]">
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 text-[11px] sm:text-xs font-bold rounded-full uppercase tracking-wider mb-3">
                      {words[currentIndex].cefrLevel}
                    </span>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-slate-105 tracking-tight mb-1 sm:mb-2">{words[currentIndex].word}</h1>
                    <div className="flex items-center gap-2">
                      <span className="text-sm sm:text-base font-serif text-slate-400 dark:text-slate-500">{words[currentIndex].phonetic}</span>
                      <span className="text-xs sm:text-sm font-semibold text-rose-500 dark:text-rose-450 font-sans italic">({words[currentIndex].wordType})</span>
                    </div>
                    <button 
                      onClick={playPronunciation}
                      className="mt-4 sm:mt-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-50 dark:bg-green-950/40 border border-green-100 dark:border-green-905/40 flex items-center justify-center text-green-500 dark:text-green-405 hover:bg-green-500 hover:text-white transition-all shadow-sm cursor-pointer"
                    >
                      <Volume2 className="w-7 h-7 sm:w-8 sm:h-8" />
                    </button>
                    <p className="absolute bottom-4 sm:bottom-6 text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Nhấn "Hiện gợi ý" bên dưới để lật thẻ</p>
                  </div>

                  {/* Back Side */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center text-center bg-[#002147] dark:bg-slate-900 text-white p-6 sm:p-8 overflow-y-auto rounded-[2.5rem]">
                    {(!words[currentIndex].meaningVi || words[currentIndex].meaningVi === words[currentIndex].word) ? (
                      <div className="flex flex-col items-center justify-center space-y-4 w-full">
                        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                        <p className="text-xs text-slate-300 font-bold uppercase tracking-widest animate-pulse">Đang dịch & phân tích từ...</p>
                      </div>
                    ) : (
                      <div className="space-y-3 sm:space-y-4 w-full">
                        <div>
                          <span className="text-[11px] sm:text-xs text-emerald-400 font-bold uppercase tracking-widest block">Nghĩa tiếng Việt</span>
                          <h2 className="text-lg sm:text-xl font-bold text-emerald-400 mt-1">{words[currentIndex].meaningVi}</h2>
                        </div>
                        <div className="border-t border-white/10 dark:border-slate-800 pt-2 sm:pt-3">
                          <span className="text-[11px] sm:text-xs text-white/40 dark:text-slate-500 font-bold uppercase tracking-widest block">Định nghĩa (EN)</span>
                          <p className="text-xs sm:text-sm text-slate-200 dark:text-slate-300 mt-1 italic leading-relaxed">"{words[currentIndex].meaningEn}"</p>
                        </div>
                        {words[currentIndex].example && (
                          <div className="border-t border-white/10 dark:border-slate-800 pt-2 sm:pt-3 text-left">
                            <span className="text-[11px] sm:text-xs text-white/40 dark:text-slate-500 font-bold uppercase tracking-widest block mb-1">Ví dụ minh họa</span>
                            <p className="text-xs sm:text-sm text-white font-medium italic">"{words[currentIndex].example}"</p>
                            {words[currentIndex].exampleVi && <p className="text-xs text-emerald-400/80 dark:text-emerald-400 mt-0.5 italic">{words[currentIndex].exampleVi}</p>}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={handleNext}
                  className="flex flex-col items-center gap-1.5 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:border-rose-200 dark:hover:border-rose-900/40 group transition-all cursor-pointer"
                >
                  <XCircle className="w-6 h-6 text-rose-500" />
                  <span className="text-[10px] sm:text-xs font-bold text-rose-500 uppercase tracking-wider">Đang Học</span>
                </button>

                <button 
                  onClick={() => setShowHint(!showHint)}
                  className="flex flex-col items-center gap-1.5 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-amber-50 dark:hover:bg-amber-950/20 hover:border-amber-200 dark:hover:border-amber-900/40 group transition-all cursor-pointer"
                >
                  <Lightbulb className="w-6 h-6 text-amber-500" />
                  <span className="text-[10px] sm:text-xs font-bold text-amber-500 uppercase tracking-wider">{showHint ? 'Ẩn gợi ý' : 'Hiện gợi ý'}</span>
                </button>

                <button 
                  onClick={handleIKnowIt}
                  className="flex flex-col items-center gap-1.5 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-green-50 dark:hover:bg-green-950/20 hover:border-green-200 dark:hover:border-green-900/40 group transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <span className="text-[10px] sm:text-xs font-bold text-green-500 uppercase tracking-wider">Đã Thuộc</span>
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* ════════════════════════════════════════════ VOCABULARY BY TOPIC MODE ═══ */}
      {activeMode === 'topics' && (
        <>
          {!selectedVocabTopicId ? (
            /* ── Topic Selection Grid ── */
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-100 rounded-full">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Vocabulary by Topic</span>
                </div>
                <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Học Từ Vựng Theo Chủ Đề</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm max-w-xl mx-auto">
                  Chọn một chủ đề bên dưới để bắt đầu học từ vựng. Mỗi chủ đề được chia thành 2 cấp độ: <strong className="text-emerald-600 dark:text-emerald-400">Mới bắt đầu</strong> và <strong className="text-violet-600 dark:text-violet-400">Nâng cao</strong>.
                </p>
              </div>

              {/* Search & Category Filter Section */}
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-slate-900/30 p-4 rounded-3xl border border-slate-100 dark:border-slate-800/60 max-w-4xl mx-auto w-full">
                {/* Search Input */}
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={vocabSearchQuery}
                    onChange={(e) => setVocabSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm chủ đề học..."
                    className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-700 transition-all font-medium text-slate-700 dark:text-slate-300"
                  />
                  {vocabSearchQuery && (
                    <button
                      onClick={() => setVocabSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Category Chips */}
                <div className="flex overflow-x-auto no-scrollbar gap-2 w-full md:w-auto justify-start md:justify-end pb-1 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
                  {[
                    { id: 'all', label: 'Tất cả', count: VOCABULARY_TOPICS.length },
                    { id: 'daily', label: '🌱 Đời sống', count: VOCABULARY_TOPICS.filter(t => TOPIC_CATEGORIES[t.id] === 'daily').length },
                    { id: 'work_tech', label: '💼 Công việc', count: VOCABULARY_TOPICS.filter(t => TOPIC_CATEGORIES[t.id] === 'work_tech').length },
                    { id: 'society_env', label: '🌍 Xã hội & Môi trường', count: VOCABULARY_TOPICS.filter(t => TOPIC_CATEGORIES[t.id] === 'society_env').length },
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setVocabActiveCategory(cat.id as any)}
                      className={cn(
                        "px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer shrink-0",
                        vocabActiveCategory === cat.id
                          ? "bg-slate-900 border-slate-900 text-white dark:bg-slate-100 dark:border-slate-105 dark:text-slate-900 shadow-sm"
                          : "bg-white border-slate-200 text-slate-600 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                      )}
                    >
                      <span>{cat.label}</span>
                      <span className={cn(
                        "text-[10px] px-1.5 py-0.2 rounded-full",
                        vocabActiveCategory === cat.id
                          ? "bg-slate-850 text-slate-200 dark:bg-slate-200 dark:text-slate-700"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-500"
                      )}>
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {filteredVocabTopics.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-400">
                    <Info className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">Không tìm thấy chủ đề nào</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                    Thử thay đổi từ khóa tìm kiếm hoặc chọn bộ lọc chủ đề khác xem sao nhé!
                  </p>
                  <button
                    onClick={() => {
                      setVocabSearchQuery('');
                      setVocabActiveCategory('all');
                    }}
                    className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-all cursor-pointer"
                  >
                    Đặt lại bộ lọc
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVocabTopics.map(topic => {
                    const TopicIcon = TOPIC_ICONS[topic.id] || BookOpen;
                    const colorClasses = getTopicColorClasses(topic.color);
                    return (
                      <button
                        key={topic.id}
                        onClick={() => {
                          setSelectedVocabTopicId(topic.id);
                          setVocabLevel('beginner');
                          setVocabIndex(0);
                          setShowVocabHint(false);
                          setVocabCompleted(false);
                          setActiveTab('card');
                        }}
                        className={cn(
                          "bg-white dark:bg-slate-955 rounded-[2rem] p-6 border border-slate-200/60 dark:border-slate-800/80 text-left flex flex-col justify-between hover:shadow-xl transition-all group relative overflow-hidden cursor-pointer h-full min-h-[220px]",
                          colorClasses.borderHover
                        )}
                      >
                        <div className="flex items-center justify-between w-full mb-3 gap-3">
                          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform border border-slate-100 dark:border-slate-800/40 shrink-0", colorClasses.iconBg)}>
                            <TopicIcon className={cn("w-6 h-6", colorClasses.iconText)} />
                          </div>
                          <div className="flex flex-col items-end gap-1 shrink-0">
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100/50 dark:border-emerald-900/50 px-2 py-0.5 rounded-full shrink-0">{topic.beginner.length} từ cơ bản</span>
                            <span className="text-[10px] font-bold text-violet-600 bg-violet-50 dark:bg-violet-950/40 border border-violet-100/50 dark:border-violet-900/50 px-2 py-0.5 rounded-full shrink-0">{topic.advanced.length} từ nâng cao</span>
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-start">
                          <h3 className="font-bold text-base sm:text-lg text-slate-800 dark:text-slate-100 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{topic.title}</h3>
                          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed font-medium line-clamp-2">{topic.desc}</p>
                        </div>
                        <div className="flex items-center justify-between w-full pt-3 border-t border-slate-100 dark:border-slate-800/80 mt-4">
                          <span className="text-xs font-bold text-slate-400 dark:text-slate-500">{topic.beginner.length + topic.advanced.length} từ vựng</span>
                          <span className={cn("text-xs font-black group-hover:translate-x-1 transition-transform flex items-center gap-0.5", colorClasses.textAccent)}>
                            Bắt đầu học <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : vocabCompleted ? (
            /* ── Completion Screen ── */
            <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-6 text-center animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl shadow-yellow-100 dark:shadow-none">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">Tuyệt vời! 🎉</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  Bạn đã hoàn thành {activeVocabWords.length} từ vựng chủ đề <strong className="text-slate-800 dark:text-slate-200">{activeVocabTopic?.title}</strong> ({vocabLevel === 'beginner' ? 'Mới bắt đầu' : 'Nâng cao'}).
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                {vocabLevel === 'beginner' && (
                  <button
                    onClick={() => {
                      setVocabLevel('advanced');
                      setVocabIndex(0);
                      setShowVocabHint(false);
                      setVocabCompleted(false);
                    }}
                    className="flex-1 py-3 bg-violet-600 hover:bg-violet-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all active:scale-95 cursor-pointer shadow-lg shadow-violet-900/30"
                  >
                    Thử cấp Nâng cao →
                  </button>
                )}
                <button
                  onClick={() => {
                    setVocabIndex(0);
                    setShowVocabHint(false);
                    setVocabCompleted(false);
                  }}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-350 font-bold text-xs uppercase tracking-widest rounded-xl transition-all active:scale-95 cursor-pointer"
                >
                  Học lại lượt mới
                </button>
                <button
                  onClick={() => {
                    setSelectedVocabTopicId(null);
                    setVocabIndex(0);
                    setShowVocabHint(false);
                    setVocabCompleted(false);
                  }}
                  className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-205 text-white dark:text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl transition-all active:scale-95 cursor-pointer"
                >
                  Chọn Chủ Đề Khác
                </button>
              </div>
            </div>
          ) : (
            /* ── Topic Study View ── */
            <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
              {/* Top bar: Back + Topic info + Level switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedVocabTopicId(null);
                      setVocabIndex(0);
                      setShowVocabHint(false);
                      setVocabCompleted(false);
                    }}
                    className="flex items-center gap-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold transition-colors cursor-pointer text-xs"
                  >
                    <ChevronLeft className="w-4 h-4" /> Chọn Chủ Đề
                  </button>
                  <span className="text-xs font-black text-slate-300 dark:text-slate-700">|</span>
                  <span className="text-sm font-black text-slate-700 dark:text-slate-300">{activeVocabTopic?.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
                    <button
                      onClick={() => {
                        setVocabLevel('beginner');
                        setVocabIndex(0);
                        setShowVocabHint(false);
                        setVocabCompleted(false);
                        setActiveTab('card');
                      }}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer",
                        vocabLevel === 'beginner'
                          ? "bg-emerald-500 text-white shadow-sm"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                      )}
                    >
                      🌱 Mới bắt đầu
                    </button>
                    <button
                      onClick={() => {
                        setVocabLevel('advanced');
                        setVocabIndex(0);
                        setShowVocabHint(false);
                        setVocabCompleted(false);
                        setActiveTab('card');
                      }}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer",
                        vocabLevel === 'advanced'
                          ? "bg-violet-500 text-white shadow-sm"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                      )}
                    >
                      🚀 Nâng cao
                    </button>
                  </div>
                  <span className="text-xs font-black text-slate-400 dark:text-slate-500">{vocabIndex + 1}/{activeVocabWords.length}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    vocabLevel === 'beginner' ? "bg-gradient-to-r from-emerald-400 to-green-500" : "bg-gradient-to-r from-violet-400 to-purple-500"
                  )}
                  style={{ width: `${((vocabIndex + 1) / activeVocabWords.length) * 100}%` }}
                />
              </div>

              {/* Mobile View Switcher Tabs */}
              {activeVocabWords[vocabIndex] && (
                <div className="flex lg:hidden bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl mb-1">
                  <button
                    onClick={() => setActiveTab('card')}
                    className={cn(
                      "flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-center transition-all cursor-pointer",
                      activeTab === 'card'
                        ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                    )}
                  >
                    🎴 Thẻ Từ Vựng
                  </button>
                  <button
                    onClick={() => setActiveTab('list')}
                    className={cn(
                      "flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-center transition-all cursor-pointer",
                      activeTab === 'list'
                        ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                    )}
                  >
                    📋 Danh Sách ({activeVocabWords.length})
                  </button>
                </div>
              )}

              {activeVocabWords[vocabIndex] && (
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6 items-start">
                  {/* Flashcard (3 cols) */}
                  <div className={cn("lg:col-span-3 w-full", activeTab === 'card' ? "block" : "hidden lg:block")}>
                    <div className="perspective-1000 w-full h-[280px] xs:h-[320px] sm:h-[340px] md:h-[380px] landscape:h-[250px] landscape:sm:h-[280px]">
                      <div className={cn(
                        "relative w-full h-full preserve-3d transition-transform duration-500 border border-slate-200/80 dark:border-slate-800/80 rounded-[2.5rem] shadow-xl",
                        showVocabHint ? "rotate-y-180" : ""
                      )}>
                        {/* Front */}
                        <div className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center text-center bg-white dark:bg-slate-950 p-6 sm:p-8 rounded-[2.5rem]">
                          <span className={cn(
                            "px-3 py-1 text-[11px] sm:text-xs font-bold rounded-full uppercase tracking-wider mb-3",
                            vocabLevel === 'beginner' ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400" : "bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-400"
                          )}>
                            {vocabLevel === 'beginner' ? '🌱 Beginner' : '🚀 Advanced'}
                          </span>
                          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight mb-1 sm:mb-2">{activeVocabWords[vocabIndex].word}</h1>
                          <div className="flex items-center gap-2">
                            <span className="text-sm sm:text-base font-serif text-slate-400 dark:text-slate-500">{activeVocabWords[vocabIndex].phonetic}</span>
                            <span className="text-xs sm:text-sm font-semibold text-rose-500 dark:text-rose-450 font-sans italic">({activeVocabWords[vocabIndex].wordType})</span>
                          </div>
                          <button
                            onClick={() => speak(activeVocabWords[vocabIndex].word)}
                            className="mt-4 sm:mt-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-50 dark:bg-green-950/40 border border-green-100 dark:border-green-900/50 flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition-all shadow-sm cursor-pointer"
                          >
                            <Volume2 className="w-7 h-7 sm:w-8 sm:h-8" />
                          </button>
                          <p className="absolute bottom-4 sm:bottom-6 text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Nhấn &quot;Lật thẻ&quot; bên dưới để xem nghĩa</p>
                        </div>

                        {/* Back */}
                        <div className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center text-center bg-slate-900 dark:bg-slate-950 text-white p-6 sm:p-8 overflow-y-auto rounded-[2.5rem]">
                          <div className="space-y-3 sm:space-y-4 w-full">
                            <div>
                               <span className="text-[11px] sm:text-xs text-emerald-400 font-bold uppercase tracking-widest block">Nghĩa tiếng Việt</span>
                              <h2 className="text-lg sm:text-xl font-bold text-emerald-400 mt-1">{activeVocabWords[vocabIndex].meaningVi}</h2>
                            </div>
                            <div className="border-t border-white/10 dark:border-slate-800 pt-2 sm:pt-3">
                              <span className="text-[11px] sm:text-xs text-white/40 dark:text-slate-500 font-bold uppercase tracking-widest block">Định nghĩa (EN)</span>
                              <p className="text-xs sm:text-sm text-slate-200 dark:text-slate-300 mt-1 italic leading-relaxed">&quot;{activeVocabWords[vocabIndex].meaningEn}&quot;</p>
                            </div>
                            <div className="border-t border-white/10 dark:border-slate-800 pt-2 sm:pt-3 text-left">
                              <span className="text-[11px] sm:text-xs text-white/40 dark:text-slate-500 font-bold uppercase tracking-widest block mb-1">Ví dụ minh họa</span>
                              <p className="text-xs text-white dark:text-slate-100 font-medium italic">&quot;{activeVocabWords[vocabIndex].example}&quot;</p>
                              <p className="text-xs text-emerald-400/80 dark:text-emerald-400 mt-0.5 italic">{activeVocabWords[vocabIndex].exampleVi}</p>
                            </div>
                            <button
                              onClick={() => speak(activeVocabWords[vocabIndex].example)}
                              className="mt-2 px-4 py-2 bg-white/10 hover:bg-white/20 dark:bg-slate-900/60 dark:hover:bg-slate-900 border border-white/10 dark:border-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer mx-auto"
                            >
                              <Volume2 className="w-3.5 h-3.5" /> Nghe ví dụ
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      <button
                        onClick={() => {
                          setShowVocabHint(false);
                          if (vocabIndex < activeVocabWords.length - 1) {
                            setVocabIndex(prev => prev + 1);
                          } else {
                            setVocabCompleted(true);
                          }
                        }}
                        className="flex flex-col items-center gap-1.5 py-4 bg-slate-55/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:border-rose-200 dark:hover:border-rose-900/40 transition-all cursor-pointer"
                      >
                        <XCircle className="w-6 h-6 text-rose-500" />
                        <span className="text-[10px] sm:text-xs font-bold text-rose-500 uppercase tracking-wider">Đang Học</span>
                      </button>

                      <button
                        onClick={() => setShowVocabHint(!showVocabHint)}
                        className="flex flex-col items-center gap-1.5 py-4 bg-slate-55/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-amber-50 dark:hover:bg-amber-950/20 hover:border-amber-200 dark:hover:border-amber-900/40 transition-all cursor-pointer"
                      >
                        <Lightbulb className="w-6 h-6 text-amber-500" />
                        <span className="text-[10px] sm:text-xs font-bold text-amber-500 uppercase tracking-wider">{showVocabHint ? 'Ẩn nghĩa' : 'Lật thẻ'}</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowVocabHint(false);
                          if (vocabIndex < activeVocabWords.length - 1) {
                            setVocabIndex(prev => prev + 1);
                          } else {
                            setVocabCompleted(true);
                          }
                        }}
                        className="flex flex-col items-center gap-1.5 py-4 bg-slate-55/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-green-50 dark:hover:bg-green-950/20 hover:border-green-200 dark:hover:border-green-900/40 transition-all cursor-pointer"
                      >
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                        <span className="text-[10px] sm:text-xs font-bold text-green-500 uppercase tracking-wider">Đã Thuộc</span>
                      </button>
                    </div>
                  </div>

                  {/* Word List Sidebar (2 cols) */}
                  <div className={cn("lg:col-span-2 w-full", activeTab === 'list' ? "block" : "hidden lg:block")}>
                    <div className="premium-card p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] space-y-3 max-h-[520px] overflow-y-auto">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Danh sách từ vựng</h4>
                        <span className={cn(
                          "text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full",
                          vocabLevel === 'beginner' ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400" : "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400"
                        )}>
                          {vocabLevel === 'beginner' ? 'Cơ bản' : 'Nâng cao'}
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {activeVocabWords.map((w, idx) => (
                          <div
                            key={w.word}
                            role="button"
                            tabIndex={0}
                            onClick={() => {
                              setVocabIndex(idx);
                              setShowVocabHint(false);
                              setActiveTab('card');
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setVocabIndex(idx);
                                setShowVocabHint(false);
                                setActiveTab('card');
                              }
                            }}
                            className={cn(
                              "w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
                              idx === vocabIndex
                                ? "bg-slate-900 border-slate-950 text-white dark:bg-slate-100 dark:border-slate-100 dark:text-slate-900 shadow-md"
                                : "bg-white border-slate-100 dark:bg-slate-900/50 dark:border-slate-900 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-350"
                            )}
                          >
                            <span className={cn(
                              "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0",
                              idx === vocabIndex ? "bg-white/10 text-white dark:text-slate-900" : "bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-500"
                            )}>
                              {idx + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className={cn("text-sm font-bold truncate", idx === vocabIndex ? "text-white dark:text-slate-900" : "text-slate-800 dark:text-slate-200")}>{w.word}</p>
                              <p className={cn("text-xs font-medium truncate", idx === vocabIndex ? "text-slate-400 dark:text-slate-600" : "text-slate-500 dark:text-slate-400")}>{w.meaningVi}</p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                speak(w.word);
                              }}
                              className={cn(
                                "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all cursor-pointer",
                                idx === vocabIndex
                                  ? "bg-white/10 text-white hover:bg-white/20"
                                  : "bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-500 hover:bg-green-50 dark:hover:bg-green-950/40 hover:text-green-500 dark:hover:text-green-400"
                              )}
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
