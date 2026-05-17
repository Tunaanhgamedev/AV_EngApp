'use client';

import { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Volume2, 
  XCircle, 
  Lightbulb, 
  CheckCircle2,
  BrainCircuit,
  ChevronRight,
  Loader2,
  Trophy
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

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

export default function LearnPage() {
  const { user } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

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

  const playPronunciation = () => {
    const word = words[currentIndex];
    if (!word) return;
    
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    if (word.audioUs) {
      const audio = new Audio(word.audioUs);
      audio.play().catch(() => {
        speak(word.word);
      });
    } else {
      speak(word.word);
    }
  };

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.name.includes('Google') && v.lang === 'en-US') || 
                             voices.find(v => v.lang === 'en-US');
      
      if (preferredVoice) utterance.voice = preferredVoice;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Auto-play
  useEffect(() => {
    if (words[currentIndex] && !loading && !completed) {
      const timer = setTimeout(() => playPronunciation(), 600);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, words, loading, completed]);

  const handleNext = () => {
    setShowHint(false);
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(((currentIndex + 1) / words.length) * 100);
    } else {
      setCompleted(true);
    }
  };

  const handleIKnowIt = async () => {
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

  if (!selectedLevel) {
    return (
      <div className="max-w-6xl mx-auto py-10 px-4">
        <header className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#002147] text-white rounded-full mb-2">
            <BrainCircuit className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Daily Flashcards</span>
          </div>
          <h1 className="text-5xl font-black text-slate-800 tracking-tight">Choose Your Level</h1>
          <p className="text-slate-500 font-medium text-lg">Pick a CEFR level to learn 15 new words today.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {levels.map(l => (
            <button 
              key={l.level} 
              onClick={() => setSelectedLevel(l.level)}
              className="bg-white rounded-[2rem] p-8 flex flex-col items-start gap-6 hover:shadow-2xl hover:-translate-y-2 transition-all border border-slate-100 group text-left relative overflow-hidden"
            >
              <div className="flex items-center justify-between w-full">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${l.color} flex items-center justify-center text-white font-black text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                  {l.level}
                </div>
                <span className="text-amber-400 text-lg">{l.difficulty}</span>
              </div>
              <div>
                <h3 className="font-black text-2xl text-slate-800">{l.label}</h3>
                <p className="text-slate-500 mt-2 leading-relaxed font-medium">{l.desc}</p>
              </div>
              <div className="flex items-center justify-between w-full pt-4 border-t border-slate-50">
                <span className="text-sm font-bold text-slate-400">{l.words} words</span>
                <span className="text-sm font-black text-[#002147] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Start <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <Loader2 className="w-12 h-12 text-[#002147] animate-spin" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs animate-pulse">Preparing your session...</p>
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center">
          <BrainCircuit className="w-12 h-12 text-slate-300" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-800">No words available</h2>
          <p className="text-slate-500 max-w-sm mx-auto mt-2 font-medium">We couldn't find any new {selectedLevel} words for you right now.</p>
        </div>
        <button 
          onClick={() => setSelectedLevel(null)}
          className="px-10 py-4 bg-[#002147] text-white rounded-2xl font-bold hover:shadow-xl transition-all"
        >
          Back to Levels
        </button>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 text-center animate-in zoom-in-95 duration-500">
        <div className="w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-200">
          <Trophy className="w-16 h-16 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-black text-slate-800">Great Job!</h1>
          <p className="text-slate-500 mt-2 font-medium">You've completed 15 new words in {selectedLevel}.</p>
        </div>
        <button 
          onClick={() => setSelectedLevel(null)}
          className="px-12 py-4 bg-[#002147] text-white rounded-2xl font-bold shadow-lg"
        >
          Continue Learning
        </button>
      </div>
    );
  }

  const currentWord = words[currentIndex];

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 animate-in fade-in duration-700">
      {/* Top Progress Bar */}
      <div className="flex items-center justify-between mb-12">
        <button 
          onClick={() => setSelectedLevel(null)}
          className="flex items-center gap-1 text-slate-400 hover:text-slate-600 font-bold transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Levels
        </button>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-100 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-[10px] font-black text-green-700 uppercase tracking-tighter">{selectedLevel}</span>
          </div>
          <span className="text-sm font-black text-slate-300">
            {currentIndex + 1}/{words.length}
          </span>
        </div>
      </div>

      {/* Main Flashcard with Flip Animation */}
      <div className="perspective-1000 w-full h-[550px] group">
        <div className={`relative w-full h-full preserve-3d card-glow ${showHint ? 'animate-flip-in card-glow-active' : currentIndex > 0 ? 'animate-flip-out' : 'hover:scale-[1.02] transition-transform duration-500'}`}>
          
          {/* Front Side */}
          <div className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center text-center bg-white rounded-[3rem] shadow-xl border border-slate-50 p-8">
            <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-widest mb-6">
              {currentWord.cefrLevel}
            </span>
            
            <div className="space-y-4 mb-8">
              <h1 className="text-8xl font-black tracking-tighter text-slate-800 animate-in slide-in-from-bottom-4 duration-500">
                {currentWord.word}
              </h1>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-serif text-slate-400 italic">{currentWord.phonetic}</span>
                <span className="text-sm font-bold text-rose-500 mt-1 italic">({currentWord.wordType})</span>
              </div>
            </div>

            <button 
              onClick={(e) => { e.stopPropagation(); playPronunciation(); }}
              className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-100 flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition-all shadow-md active:scale-95 group/audio"
            >
              <Volume2 className="w-10 h-10 group-hover/audio:scale-110 transition-transform" />
            </button>
            
            <p className="mt-8 text-slate-300 font-bold uppercase tracking-widest text-[10px] animate-pulse">Tap "Show Hint" to flip</p>
          </div>

          {/* Back Side (Rich Hint) */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center text-center bg-[#002147] rounded-[3rem] shadow-2xl p-10 border-4 border-white/10 overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/20 to-transparent opacity-50 pointer-events-none" />
            
            <div className="w-full space-y-6 relative z-10">
              {/* Vietnamese Meaning */}
              <div className="space-y-1">
                <span className="text-emerald-400/60 text-[10px] font-black uppercase tracking-[0.2em]">Vietnamese Meaning</span>
                <p className="text-4xl text-emerald-400 font-bold tracking-tight">
                  {currentWord.meaningVi && currentWord.meaningVi !== currentWord.word 
                    ? currentWord.meaningVi 
                    : <span className="flex items-center justify-center gap-2 text-2xl text-white/50"><Loader2 className="w-6 h-6 animate-spin" />AI đang dịch...</span>}
                </p>
              </div>

              <div className="h-px w-full bg-white/10" />

              {/* English Description */}
              <div className="space-y-1">
                <span className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">Definition</span>
                <p className="text-lg text-white/90 font-medium leading-relaxed italic">
                  "{currentWord.meaningEn}"
                </p>
              </div>

              {/* Usage / Context */}
              {currentWord.usage && (
                <div className="space-y-1">
                  <span className="text-amber-400/60 text-[10px] font-black uppercase tracking-[0.2em]">Usage Notes</span>
                  <p className="text-sm text-amber-200/80 font-medium">
                    {currentWord.usage}
                  </p>
                </div>
              )}

              {/* Example Sentences */}
              <div className="bg-white/5 rounded-2xl p-5 border border-white/5 text-left space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-4 bg-emerald-500 rounded-full" />
                  <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Example Sentence</span>
                </div>
                <div>
                  <p className="text-white font-medium italic">
                    {currentWord.example || `"${currentWord.word}" is commonly used in everyday English.`}
                  </p>
                  <p className="text-emerald-400/70 text-xs mt-1 italic">
                    {currentWord.exampleVi || ''}
                  </p>
                </div>
              </div>

              <button 
                onClick={playPronunciation}
                className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs font-bold bg-white/5 px-4 py-2 rounded-full border border-white/5"
              >
                <Volume2 className="w-4 h-4" /> Listen again
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3 Action Buttons Row */}
      <div className="grid grid-cols-3 gap-4 mt-12">
        <button 
          onClick={handleNext}
          className="flex flex-col items-center gap-3 py-6 rounded-[2rem] hover:bg-rose-50 transition-all group"
        >
          <div className="w-14 h-14 rounded-full border-2 border-rose-100 flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-500 transition-all shadow-sm">
            <XCircle className="w-7 h-7" />
          </div>
          <span className="text-xs font-black text-rose-500 uppercase tracking-widest">Still Learning</span>
        </button>

        <button 
          onClick={() => setShowHint(!showHint)}
          className="flex flex-col items-center gap-3 py-6 rounded-[2rem] hover:bg-amber-50 transition-all group"
        >
          <div className={`w-14 h-14 rounded-full border-2 border-amber-100 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 transition-all shadow-sm ${showHint ? 'bg-amber-500 text-white animate-pulse' : ''}`}>
            <Lightbulb className="w-7 h-7" />
          </div>
          <span className="text-xs font-black text-amber-500 uppercase tracking-widest">{showHint ? 'Hide Hint' : 'Show Hint'}</span>
        </button>

        <button 
          onClick={handleIKnowIt}
          className="flex flex-col items-center gap-3 py-6 rounded-[2rem] hover:bg-green-50 transition-all group"
        >
          <div className="w-14 h-14 rounded-full border-2 border-green-100 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white group-hover:border-green-500 transition-all shadow-sm">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <span className="text-xs font-black text-green-500 uppercase tracking-widest">I Know It!</span>
        </button>
      </div>
    </div>
  );
}
