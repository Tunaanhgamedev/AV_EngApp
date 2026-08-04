'use client';

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { GraduationCap, BrainCircuit, BookOpen } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { VOCABULARY_TOPICS } from './vocabularyData';

// Dynamic lazy imports for optimizing page load
const LevelSelector = lazy(() => import('./components/LevelSelector'));
const FlashcardSession = lazy(() => import('./components/FlashcardSession'));
const TopicSelector = lazy(() => import('./components/TopicSelector'));
const TopicStudyView = lazy(() => import('./components/TopicStudyView'));

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
  ai_deeplearning: 'work_tech',
  cybersecurity: 'work_tech',
  ecommerce_marketing: 'work_tech',
  blockchain_crypto: 'work_tech',
  objects: 'society_env',
  house: 'society_env',
  vehicles: 'society_env',
  weather: 'society_env',
  art_media: 'society_env',
  society_law: 'society_env',
  shopping: 'society_env',
  nature: 'society_env',
  town: 'society_env',
  history: 'society_env',
  space_astrophysics: 'society_env',
  renewable_energy: 'society_env'
};

export default function LearnPage() {
  const { user } = useAuth();
  const [activeMode, setActiveMode] = useState<'vocabulary' | 'topics'>('vocabulary');

  const [vocabSearchQuery, setVocabSearchQuery] = useState('');
  const [vocabActiveCategory, setVocabActiveCategory] = useState<'all' | 'daily' | 'work_tech' | 'society_env'>('all');

  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  const [selectedVocabTopicId, setSelectedVocabTopicId] = useState<string | null>(null);
  const [vocabLevel, setVocabLevel] = useState<'beginner' | 'advanced'>('beginner');
  const [vocabIndex, setVocabIndex] = useState<number>(0);
  const [showVocabHint, setShowVocabHint] = useState<boolean>(false);
  const [vocabCompleted, setVocabCompleted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'card' | 'list'>('card');

  const activeVocabTopic = VOCABULARY_TOPICS.find(t => t.id === selectedVocabTopicId);
  const activeVocabWords = activeVocabTopic ? activeVocabTopic[vocabLevel] : [];

  const filteredVocabTopics = VOCABULARY_TOPICS.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(vocabSearchQuery.toLowerCase()) ||
      topic.desc.toLowerCase().includes(vocabSearchQuery.toLowerCase());
    const matchesCategory = vocabActiveCategory === 'all' || TOPIC_CATEGORIES[topic.id] === vocabActiveCategory;
    return matchesSearch && matchesCategory;
  });

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

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    const enrichCurrentAndNext = async () => {
      if (activeMode !== 'vocabulary' || words.length === 0) return;
      const enrichAtIndex = async (idx: number) => {
        if (idx < 0 || idx >= words.length) return false;
        const wObj = words[idx];
        if (!wObj.meaningVi || wObj.meaningVi === wObj.word) {
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
        }
        return false;
      };

      const currentWordObj = words[currentIndex];
      if (currentWordObj && (!currentWordObj.meaningVi || currentWordObj.meaningVi === currentWordObj.word)) {
        await enrichAtIndex(currentIndex);
      }

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
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        const dummy = new SpeechSynthesisUtterance('');
        window.speechSynthesis.speak(dummy);
      } catch (e) { }
    }
    if (word.audioUs) {
      const audio = new Audio(word.audioUs);
      audio.play().catch(() => speak(word.word));
    } else {
      speak(word.word);
    }
  };

  useEffect(() => {
    if (activeMode === 'vocabulary' && words[currentIndex] && !loading && !completed) {
      const timer = setTimeout(() => playPronunciation(), 600);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, words, loading, completed, activeMode]);

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

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-8 animate-in fade-in duration-700 pb-12">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/60 dark:border-slate-800/60 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" /> Study Center
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">
            Học từ vựng theo trình độ CEFR chuẩn quốc tế và theo các chủ đề thông dụng hàng ngày.
          </p>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl self-start md:self-center">
          <button
            onClick={() => setActiveMode('vocabulary')}
            className={cn(
              "px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer",
              activeMode === 'vocabulary' ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 shadow-md" : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300"
            )}
          >
            <BrainCircuit className="w-4 h-4" /> Từ Vựng CEFR
          </button>
          <button
            onClick={() => setActiveMode('topics')}
            className={cn(
              "px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer",
              activeMode === 'topics' ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 shadow-md" : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300"
            )}
          >
            <BookOpen className="w-4 h-4" /> Chủ Đề
          </button>
        </div>
      </header>

      <Suspense fallback={<div className="flex justify-center py-20"><span className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 dark:border-slate-100"></span></div>}>
        {activeMode === 'vocabulary' ? (
          !selectedLevel ? (
            <LevelSelector levels={levels} onSelectLevel={setSelectedLevel} />
          ) : (
            <FlashcardSession
              selectedLevel={selectedLevel}
              words={words}
              currentIndex={currentIndex}
              showHint={showHint}
              completed={completed}
              loading={loading}
              onBack={() => setSelectedLevel(null)}
              onNext={handleNext}
              onIKnowIt={handleIKnowIt}
              onShowHintChange={setShowHint}
              playPronunciation={playPronunciation}
            />
          )
        ) : (
          !selectedVocabTopicId ? (
            <TopicSelector
              vocabSearchQuery={vocabSearchQuery}
              setVocabSearchQuery={setVocabSearchQuery}
              vocabActiveCategory={vocabActiveCategory}
              setVocabActiveCategory={setVocabActiveCategory}
              filteredVocabTopics={filteredVocabTopics}
              topicIcons={{}}
              totalTopicsCount={VOCABULARY_TOPICS.length}
              dailyCount={VOCABULARY_TOPICS.filter(t => TOPIC_CATEGORIES[t.id] === 'daily').length}
              workTechCount={VOCABULARY_TOPICS.filter(t => TOPIC_CATEGORIES[t.id] === 'work_tech').length}
              societyEnvCount={VOCABULARY_TOPICS.filter(t => TOPIC_CATEGORIES[t.id] === 'society_env').length}
              onSelectTopic={setSelectedVocabTopicId}
            />
          ) : (
            <TopicStudyView
              activeVocabTopic={activeVocabTopic}
              activeVocabWords={activeVocabWords}
              vocabLevel={vocabLevel}
              setVocabLevel={setVocabLevel}
              vocabIndex={vocabIndex}
              setVocabIndex={setVocabIndex}
              showVocabHint={showVocabHint}
              setShowVocabHint={setShowVocabHint}
              vocabCompleted={vocabCompleted}
              setVocabCompleted={setVocabCompleted}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              speak={speak}
              onBack={() => {
                setSelectedVocabTopicId(null);
                setVocabIndex(0);
                setShowVocabHint(false);
                setVocabCompleted(false);
              }}
            />
          )
        )}
      </Suspense>
    </div>
  );
}
