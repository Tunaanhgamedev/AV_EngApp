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
};


export default function LearnPage() {
  const { user } = useAuth();
  
  // Tab/Mode select state
  const [activeMode, setActiveMode] = useState<'vocabulary' | 'topics'>('vocabulary');
  
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
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/60 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-primary" /> Study Center
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">
            Học từ vựng theo trình độ CEFR chuẩn quốc tế và theo các chủ đề thông dụng hàng ngày.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl self-start md:self-center">
          <button
            onClick={() => setActiveMode('vocabulary')}
            className={cn(
              "px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer",
              activeMode === 'vocabulary' 
                ? "bg-slate-900 text-white shadow-md" 
                : "text-slate-500 hover:text-slate-800"
            )}
          >
            <BrainCircuit className="w-4 h-4" /> Từ Vựng CEFR
          </button>
          <button
            onClick={() => setActiveMode('topics')}
            className={cn(
              "px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer",
              activeMode === 'topics' 
                ? "bg-slate-900 text-white shadow-md" 
                : "text-slate-500 hover:text-slate-800"
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
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-955 text-white rounded-full">
                  <BrainCircuit className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Daily Flashcards</span>
                </div>
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">Vocabulary CEFR levels</h2>
                <p className="text-slate-500 font-medium text-sm">Học 15 từ vựng mới mỗi ngày theo trình độ tiêu chuẩn Châu Âu.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {levels.map(l => (
                  <button 
                    key={l.level} 
                    onClick={() => setSelectedLevel(l.level)}
                    className="bg-white rounded-[2rem] p-6 border border-slate-200/80 hover:border-primary flex flex-col items-start gap-4 hover:shadow-xl transition-all group text-left relative overflow-hidden cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${l.color} flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:scale-105 transition-transform`}>
                        {l.level}
                      </div>
                      <span className="text-amber-400 text-sm font-bold">{l.difficulty}</span>
                    </div>
                    <div>
                      <h3 className="font-black text-lg text-slate-800">{l.label}</h3>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">{l.desc}</p>
                    </div>
                    <div className="flex items-center justify-between w-full pt-3 border-t border-slate-100">
                      <span className="text-[11px] font-bold text-slate-400">{l.words} words</span>
                      <span className="text-xs font-black text-[#002147] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                        Bắt đầu <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : loading ? (
            <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4">
              <Loader2 className="w-10 h-10 text-[#002147] animate-spin" />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs animate-pulse">Đang tải từ mới...</p>
            </div>
          ) : words.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[40vh] text-center space-y-6">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                <BrainCircuit className="w-10 h-10 text-slate-300" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-800">Không có dữ liệu từ mới</h2>
                <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1 font-medium">Hiện tại không thể tải từ vựng mới cấp độ {selectedLevel}. Vui lòng thử lại sau.</p>
              </div>
              <button 
                onClick={() => setSelectedLevel(null)}
                className="px-8 py-3 bg-[#002147] text-white rounded-xl font-bold hover:shadow-lg transition-all cursor-pointer"
              >
                Trở lại Chọn Trình Độ
              </button>
            </div>
          ) : completed ? (
            <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-6 text-center animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl shadow-yellow-100">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-800">Tuyệt vời!</h1>
                <p className="text-sm text-slate-500 mt-1 font-medium">Bạn đã hoàn thành việc học 15 từ vựng mới cấp độ {selectedLevel}.</p>
              </div>
              <button 
                onClick={() => setSelectedLevel(null)}
                className="px-10 py-3 bg-[#002147] text-white rounded-xl font-bold shadow-md cursor-pointer"
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
                  className="flex items-center gap-1 text-slate-400 hover:text-slate-600 font-bold transition-colors cursor-pointer text-xs"
                >
                  <ChevronLeft className="w-4 h-4" /> Chọn Cấp Độ
                </button>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 bg-green-50 border border-green-100 text-xs font-bold text-green-700 rounded-full">{selectedLevel}</span>
                  <span className="text-xs font-bold text-slate-400">{currentIndex + 1}/{words.length}</span>
                </div>
              </div>

              {/* Word Flashcard */}
              <div className="perspective-1000 w-full h-[280px] xs:h-[320px] sm:h-[360px] md:h-[400px] landscape:h-[260px] landscape:sm:h-[300px]">
                <div className={cn(
                  "relative w-full h-full preserve-3d transition-transform duration-500 border border-slate-200/80 rounded-[2.5rem] shadow-xl",
                  showHint ? "rotate-y-180" : ""
                )}>
                  {/* Front Side */}
                  <div className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center text-center bg-white p-6 sm:p-8 rounded-[2.5rem]">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-[11px] sm:text-xs font-bold rounded-full uppercase tracking-wider mb-3">
                      {words[currentIndex].cefrLevel}
                    </span>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 tracking-tight mb-1 sm:mb-2">{words[currentIndex].word}</h1>
                    <div className="flex items-center gap-2">
                      <span className="text-sm sm:text-base font-serif text-slate-400">{words[currentIndex].phonetic}</span>
                      <span className="text-xs sm:text-sm font-semibold text-rose-500 font-sans italic">({words[currentIndex].wordType})</span>
                    </div>
                    <button 
                      onClick={playPronunciation}
                      className="mt-4 sm:mt-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition-all shadow-sm cursor-pointer"
                    >
                      <Volume2 className="w-7 h-7 sm:w-8 sm:h-8" />
                    </button>
                    <p className="absolute bottom-4 sm:bottom-6 text-xs text-slate-400 font-bold uppercase tracking-wider">Nhấn "Hiện gợi ý" bên dưới để lật thẻ</p>
                  </div>

                  {/* Back Side */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center text-center bg-[#002147] text-white p-6 sm:p-8 overflow-y-auto rounded-[2.5rem]">
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
                        <div className="border-t border-white/10 pt-2 sm:pt-3">
                          <span className="text-[11px] sm:text-xs text-white/40 font-bold uppercase tracking-widest block">Định nghĩa (EN)</span>
                          <p className="text-xs sm:text-sm text-slate-200 mt-1 italic leading-relaxed">"{words[currentIndex].meaningEn}"</p>
                        </div>
                        {words[currentIndex].example && (
                          <div className="border-t border-white/10 pt-2 sm:pt-3 text-left">
                            <span className="text-[11px] sm:text-xs text-white/40 font-bold uppercase tracking-widest block mb-1">Ví dụ minh họa</span>
                            <p className="text-xs sm:text-sm text-white font-medium italic">"{words[currentIndex].example}"</p>
                            {words[currentIndex].exampleVi && <p className="text-xs text-emerald-400/80 mt-0.5 italic">{words[currentIndex].exampleVi}</p>}
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
                  className="flex flex-col items-center gap-1.5 py-4 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-rose-50 hover:border-rose-200 group transition-all cursor-pointer"
                >
                  <XCircle className="w-6 h-6 text-rose-500" />
                  <span className="text-[10px] sm:text-xs font-bold text-rose-500 uppercase tracking-wider">Đang Học</span>
                </button>

                <button 
                  onClick={() => setShowHint(!showHint)}
                  className="flex flex-col items-center gap-1.5 py-4 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-amber-50 hover:border-amber-200 group transition-all cursor-pointer"
                >
                  <Lightbulb className="w-6 h-6 text-amber-500" />
                  <span className="text-[10px] sm:text-xs font-bold text-amber-500 uppercase tracking-wider">{showHint ? 'Ẩn gợi ý' : 'Hiện gợi ý'}</span>
                </button>

                <button 
                  onClick={handleIKnowIt}
                  className="flex flex-col items-center gap-1.5 py-4 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-green-50 hover:border-green-200 group transition-all cursor-pointer"
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
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-full">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Vocabulary by Topic</span>
                </div>
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">Học Từ Vựng Theo Chủ Đề</h2>
                <p className="text-slate-500 font-medium text-sm max-w-xl mx-auto">
                  Chọn một chủ đề bên dưới để bắt đầu học từ vựng. Mỗi chủ đề được chia thành 2 cấp độ: <strong className="text-emerald-600">Mới bắt đầu</strong> và <strong className="text-violet-600">Nâng cao</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {VOCABULARY_TOPICS.map(topic => {
                  const TopicIcon = TOPIC_ICONS[topic.id] || BookOpen;
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
                        "bg-white rounded-[2rem] p-6 border text-left flex flex-col gap-4 hover:shadow-xl transition-all group relative overflow-hidden cursor-pointer",
                        topic.color
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                          <TopicIcon className="w-6 h-6" />
                        </div>
                        <div className="flex gap-1.5">
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">{topic.beginner.length} từ cơ bản</span>
                          <span className="text-[10px] font-bold text-violet-600 bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-full">{topic.advanced.length} từ nâng cao</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-base sm:text-lg text-slate-800">{topic.title}</h3>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed font-medium">{topic.desc}</p>
                      </div>
                      <div className="flex items-center justify-between w-full pt-3 border-t border-slate-100">
                        <span className="text-xs font-bold text-slate-400">{topic.beginner.length + topic.advanced.length} từ vựng</span>
                        <span className="text-xs font-black text-slate-800 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                          Bắt đầu học <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : vocabCompleted ? (
            /* ── Completion Screen ── */
            <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-6 text-center animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl shadow-yellow-100">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-800">Tuyệt vời! 🎉</h1>
                <p className="text-sm text-slate-500 mt-1 font-medium">
                  Bạn đã hoàn thành {activeVocabWords.length} từ vựng chủ đề <strong>{activeVocabTopic?.title}</strong> ({vocabLevel === 'beginner' ? 'Mới bắt đầu' : 'Nâng cao'}).
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
                    className="flex-1 py-3 bg-violet-600 hover:bg-violet-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all active:scale-95 cursor-pointer shadow-lg shadow-violet-200"
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
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-widest rounded-xl transition-all active:scale-95 cursor-pointer"
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
                  className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all active:scale-95 cursor-pointer"
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
                    className="flex items-center gap-1 text-slate-400 hover:text-slate-600 font-bold transition-colors cursor-pointer text-xs"
                  >
                    <ChevronLeft className="w-4 h-4" /> Chọn Chủ Đề
                  </button>
                  <span className="text-xs font-black text-slate-300">|</span>
                  <span className="text-sm font-black text-slate-700">{activeVocabTopic?.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex bg-slate-100 p-1 rounded-xl">
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
                          : "text-slate-500 hover:text-slate-700"
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
                          : "text-slate-500 hover:text-slate-700"
                      )}
                    >
                      🚀 Nâng cao
                    </button>
                  </div>
                  <span className="text-xs font-black text-slate-400">{vocabIndex + 1}/{activeVocabWords.length}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
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
                <div className="flex lg:hidden bg-slate-100 p-1 rounded-2xl mb-1">
                  <button
                    onClick={() => setActiveTab('card')}
                    className={cn(
                      "flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-center transition-all cursor-pointer",
                      activeTab === 'card'
                        ? "bg-white text-slate-800 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    🎴 Thẻ Từ Vựng
                  </button>
                  <button
                    onClick={() => setActiveTab('list')}
                    className={cn(
                      "flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-center transition-all cursor-pointer",
                      activeTab === 'list'
                        ? "bg-white text-slate-800 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    📋 Danh Sách ({activeVocabWords.length})
                  </button>
                </div>
              )}

              {activeVocabWords[vocabIndex] && (
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6 items-start">
                  {/* Flashcard (3 cols) */}
                  <div className={cn("lg:col-span-3", activeTab === 'card' ? "block" : "hidden lg:block")}>
                    <div className="perspective-1000 w-full h-[280px] xs:h-[320px] sm:h-[340px] md:h-[380px] landscape:h-[250px] landscape:sm:h-[280px]">
                      <div className={cn(
                        "relative w-full h-full preserve-3d transition-transform duration-500 border border-slate-200/80 rounded-[2.5rem] shadow-xl",
                        showVocabHint ? "rotate-y-180" : ""
                      )}>
                        {/* Front */}
                        <div className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center text-center bg-white p-6 sm:p-8 rounded-[2.5rem]">
                          <span className={cn(
                            "px-3 py-1 text-[11px] sm:text-xs font-bold rounded-full uppercase tracking-wider mb-3",
                            vocabLevel === 'beginner' ? "bg-emerald-100 text-emerald-700" : "bg-violet-100 text-violet-700"
                          )}>
                            {vocabLevel === 'beginner' ? '🌱 Beginner' : '🚀 Advanced'}
                          </span>
                          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 tracking-tight mb-1 sm:mb-2">{activeVocabWords[vocabIndex].word}</h1>
                          <div className="flex items-center gap-2">
                            <span className="text-sm sm:text-base font-serif text-slate-400">{activeVocabWords[vocabIndex].phonetic}</span>
                            <span className="text-xs sm:text-sm font-semibold text-rose-500 font-sans italic">({activeVocabWords[vocabIndex].wordType})</span>
                          </div>
                          <button
                            onClick={() => speak(activeVocabWords[vocabIndex].word)}
                            className="mt-4 sm:mt-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition-all shadow-sm cursor-pointer"
                          >
                            <Volume2 className="w-7 h-7 sm:w-8 sm:h-8" />
                          </button>
                          <p className="absolute bottom-4 sm:bottom-6 text-xs text-slate-400 font-bold uppercase tracking-wider">Nhấn &quot;Lật thẻ&quot; bên dưới để xem nghĩa</p>
                        </div>

                        {/* Back */}
                        <div className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center text-center bg-slate-900 text-white p-6 sm:p-8 overflow-y-auto rounded-[2.5rem]">
                          <div className="space-y-3 sm:space-y-4 w-full">
                            <div>
                              <span className="text-[11px] sm:text-xs text-emerald-400 font-bold uppercase tracking-widest block">Nghĩa tiếng Việt</span>
                              <h2 className="text-lg sm:text-xl font-bold text-emerald-400 mt-1">{activeVocabWords[vocabIndex].meaningVi}</h2>
                            </div>
                            <div className="border-t border-white/10 pt-2 sm:pt-3">
                              <span className="text-[11px] sm:text-xs text-white/40 font-bold uppercase tracking-widest block">Định nghĩa (EN)</span>
                              <p className="text-xs sm:text-sm text-slate-200 mt-1 italic leading-relaxed">&quot;{activeVocabWords[vocabIndex].meaningEn}&quot;</p>
                            </div>
                            <div className="border-t border-white/10 pt-2 sm:pt-3 text-left">
                              <span className="text-[11px] sm:text-xs text-white/40 font-bold uppercase tracking-widest block mb-1">Ví dụ minh họa</span>
                              <p className="text-xs text-white font-medium italic">&quot;{activeVocabWords[vocabIndex].example}&quot;</p>
                              <p className="text-xs text-emerald-400/80 mt-0.5 italic">{activeVocabWords[vocabIndex].exampleVi}</p>
                            </div>
                            <button
                              onClick={() => speak(activeVocabWords[vocabIndex].example)}
                              className="mt-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer mx-auto"
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
                        className="flex flex-col items-center gap-1.5 py-4 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-rose-50 hover:border-rose-200 transition-all cursor-pointer"
                      >
                        <XCircle className="w-6 h-6 text-rose-500" />
                        <span className="text-[10px] sm:text-xs font-bold text-rose-500 uppercase tracking-wider">Đang Học</span>
                      </button>

                      <button
                        onClick={() => setShowVocabHint(!showVocabHint)}
                        className="flex flex-col items-center gap-1.5 py-4 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-amber-50 hover:border-amber-200 transition-all cursor-pointer"
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
                        className="flex flex-col items-center gap-1.5 py-4 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-green-50 hover:border-green-200 transition-all cursor-pointer"
                      >
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                        <span className="text-[10px] sm:text-xs font-bold text-green-500 uppercase tracking-wider">Đã Thuộc</span>
                      </button>
                    </div>
                  </div>

                  {/* Word List Sidebar (2 cols) */}
                  <div className={cn("lg:col-span-2", activeTab === 'list' ? "block" : "hidden lg:block")}>
                    <div className="premium-card p-4 bg-white border border-slate-200 rounded-[1.5rem] space-y-3 max-h-[520px] overflow-y-auto">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Danh sách từ vựng</h4>
                        <span className={cn(
                          "text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full",
                          vocabLevel === 'beginner' ? "bg-emerald-50 text-emerald-600" : "bg-violet-50 text-violet-600"
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
                                ? "bg-slate-900 border-slate-950 text-white shadow-md"
                                : "bg-white border-slate-100 hover:border-slate-300 text-slate-700"
                            )}
                          >
                            <span className={cn(
                              "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0",
                              idx === vocabIndex ? "bg-white/10 text-white" : "bg-slate-50 text-slate-400"
                            )}>
                              {idx + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className={cn("text-sm font-bold truncate", idx === vocabIndex ? "text-white" : "text-slate-800")}>{w.word}</p>
                              <p className={cn("text-xs font-medium truncate", idx === vocabIndex ? "text-slate-400" : "text-slate-500")}>{w.meaningVi}</p>
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
                                  : "bg-slate-50 text-slate-400 hover:bg-green-50 hover:text-green-500"
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
