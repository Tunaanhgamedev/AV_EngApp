'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, BookOpen, Volume2, HelpCircle, Sparkles, Check, CheckCircle2,
  AlertCircle, ChevronLeft, ChevronRight, HelpCircle as HelpIcon, Play,
  RotateCcw, Star, Trophy, Zap, Snail, Eye, RefreshCw, Layers, Award
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TOEIC_VOCAB_DATA, TOEICWord, TOEICList, TOEICCategory } from '@/data/toeicVocab';

export default function TOEICVocabularyPage() {
  const router = useRouter();

  // Navigation states
  const [selectedCategory, setSelectedCategory] = useState<TOEICCategory | null>(null);
  const [selectedList, setSelectedList] = useState<TOEICList | null>(null);

  // Practice session states
  const [activeTab, setActiveTab] = useState<'flashcard' | 'quiz' | 'matching' | 'fill' | 'dictation'>('flashcard');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tab 1: Flashcard States
  const [showHint, setShowHint] = useState(false);
  const [learnedCount, setLearnedCount] = useState(0);
  const [learnedStatus, setLearnedStatus] = useState<Record<string, boolean>>({});

  // Tab 2: Quiz States
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isReverseQuiz, setIsReverseQuiz] = useState(false); // true = Vi -> Eng, false = Eng -> Vi
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const quizTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Tab 3: Matching Game States
  interface MatchCard {
    id: string;
    text: string;
    type: 'word' | 'meaning';
    wordId: string;
    isMatched: boolean;
    isSelected: boolean;
  }
  const [matchingCards, setMatchingCards] = useState<MatchCard[]>([]);
  const [selectedMatchCard, setSelectedMatchCard] = useState<MatchCard | null>(null);
  const [matchTries, setMatchTries] = useState(0);
  const [matchCompleted, setMatchCompleted] = useState(false);

  // Tab 4 & 5: Text Input States (Fill & Dictation)
  const [typedInput, setTypedInput] = useState('');
  const [inputFeedback, setInputFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [showInputHint, setShowInputHint] = useState(false);
  const [isSnailMode, setIsSnailMode] = useState(false); // Dictation speed

  // Initialize Category/List on load if needed
  useEffect(() => {
    if (selectedList) {
      setCurrentIndex(0);
      setActiveTab('flashcard');
      resetAllModes(selectedList);
    }
  }, [selectedList]);

  // Handle Tab Switch
  useEffect(() => {
    if (selectedList) {
      if (activeTab === 'quiz') {
        setupQuizQuestion(currentIndex, selectedList);
      } else if (activeTab === 'matching') {
        setupMatchingGame(selectedList);
      } else {
        setTypedInput('');
        setInputFeedback(null);
        setShowInputHint(false);
      }
    }
  }, [activeTab, currentIndex, selectedList]);

  // Reset States when entering a new list
  const resetAllModes = (list: TOEICList) => {
    setCurrentIndex(0);
    setLearnedCount(0);
    setLearnedStatus({});
    setQuizScore(0);
    setQuizAnswered(false);
    setSelectedOpt(null);
    setTypedInput('');
    setInputFeedback(null);
    setShowInputHint(false);
    setSelectedMatchCard(null);
    setMatchTries(0);
    setMatchCompleted(false);
    if (quizTimerRef.current) clearTimeout(quizTimerRef.current);
  };

  // TTS Voice Engine
  const speakWord = (text: string, slow: boolean = false) => {
    if (typeof window === 'undefined') return;

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = slow ? 0.55 : 0.8;

      const voices = window.speechSynthesis.getVoices();
      const usVoice = voices.find(v => v.lang.includes('en-US') && v.name.includes('Google')) || 
                      voices.find(v => v.lang.includes('en-US'));
      if (usVoice) utterance.voice = usVoice;

      window.speechSynthesis.speak(utterance);
    } else {
      // Google Translate TTS fallback
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(text)}`;
      const audio = new Audio(url);
      audio.play().catch(err => console.log("TTS audio playback failed", err));
    }
  };

  // -------------------------------------------------------------
  // TAB 2: QUIZ GENERATOR
  // -------------------------------------------------------------
  const setupQuizQuestion = (idx: number, list: TOEICList) => {
    if (quizTimerRef.current) clearTimeout(quizTimerRef.current);
    setQuizAnswered(false);
    setSelectedOpt(null);

    const currentWord = list.words[idx];
    if (!currentWord) return;

    // Build options (1 correct, 3 wrong from other words in category or list)
    const allCategoryWords = selectedCategory?.lists.flatMap(l => l.words) || list.words;
    const filteredWrong = allCategoryWords.filter(w => w.word !== currentWord.word);

    // Shuffle and pick 3 wrong
    const shuffledWrong = [...filteredWrong].sort(() => 0.5 - Math.random());
    const selectedWrong = shuffledWrong.slice(0, 3);

    let options: string[] = [];
    if (isReverseQuiz) {
      // Question: Vietnamese meaning -> Options: English words
      options = [currentWord.word, ...selectedWrong.map(w => w.word)];
    } else {
      // Question: English word -> Options: Vietnamese meanings
      options = [currentWord.meaningVi, ...selectedWrong.map(w => w.meaningVi)];
    }

    // Shuffle final options
    setQuizOptions(options.sort(() => 0.5 - Math.random()));
  };

  const handleQuizAnswer = (option: string, list: TOEICList) => {
    if (quizAnswered) return;
    setQuizAnswered(true);
    setSelectedOpt(option);

    const currentWord = list.words[currentIndex];
    const isCorrect = isReverseQuiz
      ? option.toLowerCase() === currentWord.word.toLowerCase()
      : option === currentWord.meaningVi;

    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      // TTS correct word automatically
      speakWord(currentWord.word);
      // Auto advance to next question after 1.3 seconds
      quizTimerRef.current = setTimeout(() => {
        if (currentIndex < list.words.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          // Wrap around or show summary
          alert(`Chúc mừng! Bạn đã hoàn thành bài trắc nghiệm với điểm số: ${quizScore + 1}/${list.words.length}`);
          setCurrentIndex(0);
          setQuizScore(0);
        }
      }, 1300);
    }
  };

  const toggleQuizMode = () => {
    setIsReverseQuiz(prev => !prev);
    // Restart current quiz view
    setTimeout(() => {
      if (selectedList) setupQuizQuestion(currentIndex, selectedList);
    }, 50);
  };

  // -------------------------------------------------------------
  // TAB 3: MATCHING GAME GENERATOR
  // -------------------------------------------------------------
  const setupMatchingGame = (list: TOEICList) => {
    setSelectedMatchCard(null);
    setMatchTries(0);
    setMatchCompleted(false);

    // Select 6 words from current list
    const shuffledWords = [...list.words].sort(() => 0.5 - Math.random()).slice(0, 6);

    const cards: MatchCard[] = [];
    shuffledWords.forEach(w => {
      cards.push({
        id: `word_${w.id}`,
        text: w.word,
        type: 'word',
        wordId: w.id,
        isMatched: false,
        isSelected: false
      });
      cards.push({
        id: `meaning_${w.id}`,
        text: w.meaningVi,
        type: 'meaning',
        wordId: w.id,
        isMatched: false,
        isSelected: false
      });
    });

    // Shuffle grid cards
    setMatchingCards(cards.sort(() => 0.5 - Math.random()));
  };

  const handleMatchCardClick = (card: MatchCard) => {
    if (card.isMatched || card.isSelected) return;

    // Select first card
    if (!selectedMatchCard) {
      setSelectedMatchCard(card);
      setMatchingCards(prev => prev.map(c => c.id === card.id ? { ...c, isSelected: true } : c));
      // Pronounce word if clicked English card
      if (card.type === 'word') speakWord(card.text);
      return;
    }

    // Clicked the same type of card (e.g. word and another word) -> Switch selection
    if (selectedMatchCard.type === card.type) {
      setMatchingCards(prev => prev.map(c => {
        if (c.id === selectedMatchCard.id) return { ...c, isSelected: false };
        if (c.id === card.id) return { ...c, isSelected: true };
        return c;
      }));
      setSelectedMatchCard(card);
      if (card.type === 'word') speakWord(card.text);
      return;
    }

    // Try to match
    setMatchTries(prev => prev + 1);
    const isCorrectMatch = selectedMatchCard.wordId === card.wordId;

    if (isCorrectMatch) {
      // Mark as matched
      setMatchingCards(prev => prev.map(c => 
        (c.id === selectedMatchCard.id || c.id === card.id) 
          ? { ...c, isMatched: true, isSelected: false } 
          : c
      ));
      setSelectedMatchCard(null);

      // Play success audio cues
      speakWord(selectedMatchCard.type === 'word' ? selectedMatchCard.text : card.text);

      // Check if all matched
      setTimeout(() => {
        setMatchingCards(curr => {
          const allMatched = curr.every(c => c.isMatched);
          if (allMatched) {
            setMatchCompleted(true);
          }
          return curr;
        });
      }, 300);
    } else {
      // Wrong match - visual shake and reset selection
      setMatchingCards(prev => prev.map(c => c.id === card.id ? { ...c, isSelected: true } : c));
      
      setTimeout(() => {
        setMatchingCards(prev => prev.map(c => ({ ...c, isSelected: false })));
        setSelectedMatchCard(null);
      }, 500);
    }
  };

  // -------------------------------------------------------------
  // TAB 4 & 5: WRITING & DICTATION PRACTICE
  // -------------------------------------------------------------
  const handleCheckTextAnswer = (list: TOEICList) => {
    const currentWord = list.words[currentIndex];
    const isCorrect = typedInput.trim().toLowerCase() === currentWord.word.toLowerCase();

    if (isCorrect) {
      setInputFeedback('correct');
      speakWord(currentWord.word);
      // Auto next after 1.5s
      setTimeout(() => {
        setTypedInput('');
        setInputFeedback(null);
        setShowInputHint(false);
        if (currentIndex < list.words.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          alert('Chúc mừng! Bạn đã hoàn thành danh sách từ này.');
          setCurrentIndex(0);
        }
      }, 1500);
    } else {
      setInputFeedback('wrong');
      // Shake input or clear
      setTimeout(() => setInputFeedback(null), 800);
    }
  };

  // Input Hint generator
  const getWordInputHint = (wordStr: string) => {
    if (wordStr.length <= 2) return "_ ".repeat(wordStr.length);
    // Reveal first letter and length
    const firstLetter = wordStr[0];
    const remaining = wordStr.slice(1).replace(/[a-zA-Z]/g, '_ ');
    return `${firstLetter} ${remaining}`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 animate-in fade-in duration-700">
      
      {/* HEADER NAVIGATION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (selectedList) {
                setSelectedList(null);
              } else if (selectedCategory) {
                setSelectedCategory(null);
              } else {
                router.push('/toeic');
              }
            }}
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm active:scale-95 text-slate-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Luyện Từ Vựng TOEIC
            </h1>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">
              {selectedList 
                ? `${selectedCategory?.title} / ${selectedList.name}`
                : selectedCategory 
                  ? selectedCategory.title
                  : 'Trang Chủ Học Từ Vựng'}
            </p>
          </div>
        </div>

        {selectedList && (
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full font-black text-[10px] uppercase tracking-wider">
              {currentIndex + 1} / {selectedList.words.length} Từ
            </span>
          </div>
        )}
      </div>

      {/* ──────────────────────────────────────────────────────── */}
      {/* VIEW 1: CATEGORY SELECTION                               */}
      {/* ──────────────────────────────────────────────────────── */}
      {!selectedCategory && !selectedList && (
        <div className="space-y-8">
          {/* Banner Hero */}
          <div className="premium-card p-8 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 rounded-[2rem] text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-[9px] font-black uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
                Phương pháp MinhTOEIC
              </div>
              <h2 className="text-3xl font-black">Học Từ Vựng Nhớ Suốt Đời</h2>
              <p className="text-sm text-slate-300 leading-relaxed font-semibold">
                Ôn luyện mỗi nhóm 10 từ qua 5 chiều giác quan: Thẻ lật 3D, Trắc nghiệm phản xạ, Ghép thẻ nhanh, Điền từ chính xác và Chính tả âm thanh. Đảm bảo thuộc làu và viết chuẩn.
              </p>
            </div>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOEIC_VOCAB_DATA.map((cat) => {
              const totalWords = cat.lists.reduce((acc, l) => acc + l.words.length, 0);
              return (
                <div
                  key={cat.id}
                  className="premium-card p-6 bg-white border border-slate-100 hover:border-slate-200 rounded-3xl shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={cn("w-12 h-12 rounded-2xl bg-gradient-to-br text-white flex items-center justify-center shadow-md", cat.color)}>
                        <Layers className="w-5 h-5" />
                      </div>
                      <span className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[9px] font-black uppercase tracking-wider text-slate-500">
                        Target: {cat.difficulty}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-slate-800 group-hover:text-primary transition-colors">{cat.title}</h3>
                      <p className="text-xs text-slate-400 font-semibold mt-1 leading-relaxed">{cat.description}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Quy mô từ</p>
                      <p className="text-xs text-slate-700 font-black">{totalWords} Từ vựng cốt lõi</p>
                    </div>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-wider active:scale-95 transition-all cursor-pointer flex items-center gap-1"
                    >
                      Học ngay
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────── */}
      {/* VIEW 2: LISTS WITHIN CATEGORY                            */}
      {/* ──────────────────────────────────────────────────────── */}
      {selectedCategory && !selectedList && (
        <div className="space-y-6">
          <div className="p-6 bg-slate-50 border border-slate-200/60 rounded-3xl flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-800">{selectedCategory.title}</h2>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">{selectedCategory.description}</p>
            </div>
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-xs text-slate-400 hover:text-slate-600 font-black uppercase tracking-wider"
            >
              Chọn Target Khác
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedCategory.lists.map((list) => (
              <div
                key={list.id}
                className="premium-card p-5 bg-white border border-slate-100 hover:border-primary/20 rounded-2xl flex items-center justify-between shadow-sm transition-all"
              >
                <div className="space-y-1">
                  <h3 className="font-black text-sm text-slate-800">{list.name}</h3>
                  <p className="text-xs text-slate-400 font-medium">{list.description}</p>
                  <p className="text-[10px] font-bold text-primary bg-primary/5 border border-primary/10 rounded px-2 py-0.5 inline-block">
                    {list.words.length} từ vựng
                  </p>
                </div>

                <button
                  onClick={() => setSelectedList(list)}
                  className="px-4 py-2.5 bg-primary hover:bg-primary/95 text-white rounded-xl text-xs font-black uppercase tracking-widest active:scale-95 transition-all shadow-sm shadow-primary/10 cursor-pointer"
                >
                  Vào Học
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────── */}
      {/* VIEW 3: DYNAMIC STUDY SPACE (5 PRACTICE MODES)            */}
      {/* ──────────────────────────────────────────────────────── */}
      {selectedList && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR: TOPIC LISTS & MODE TABS */}
          <div className="md:col-span-4 space-y-4">
            
            {/* 1. Mode Tabs Navigation */}
            <div className="premium-card p-4 bg-white border border-slate-100 shadow-md rounded-3xl space-y-2">
              <h3 className="font-black text-xs text-slate-400 uppercase tracking-widest mb-3">5 Chế Độ Luyện Tập</h3>
              
              <button
                onClick={() => setActiveTab('flashcard')}
                className={cn(
                  "w-full px-4 py-3 rounded-xl text-left text-xs font-black flex items-center justify-between border-2 transition-all cursor-pointer",
                  activeTab === 'flashcard'
                    ? "border-primary bg-primary/5 text-primary shadow-sm"
                    : "border-transparent text-slate-600 hover:bg-slate-50"
                )}
              >
                <span>🎴 Thẻ Flashcard 3D</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className={cn(
                  "w-full px-4 py-3 rounded-xl text-left text-xs font-black flex items-center justify-between border-2 transition-all cursor-pointer",
                  activeTab === 'quiz'
                    ? "border-primary bg-primary/5 text-primary shadow-sm"
                    : "border-transparent text-slate-600 hover:bg-slate-50"
                )}
              >
                <span>⚡ Trắc Nghiệm Phản Xạ</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveTab('matching')}
                className={cn(
                  "w-full px-4 py-3 rounded-xl text-left text-xs font-black flex items-center justify-between border-2 transition-all cursor-pointer",
                  activeTab === 'matching'
                    ? "border-primary bg-primary/5 text-primary shadow-sm"
                    : "border-transparent text-slate-600 hover:bg-slate-50"
                )}
              >
                <span>🧩 Ghép Cặp Thẻ Từ</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveTab('fill')}
                className={cn(
                  "w-full px-4 py-3 rounded-xl text-left text-xs font-black flex items-center justify-between border-2 transition-all cursor-pointer",
                  activeTab === 'fill'
                    ? "border-primary bg-primary/5 text-primary shadow-sm"
                    : "border-transparent text-slate-600 hover:bg-slate-50"
                )}
              >
                <span>✏️ Điền Từ Nhớ Từ</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveTab('dictation')}
                className={cn(
                  "w-full px-4 py-3 rounded-xl text-left text-xs font-black flex items-center justify-between border-2 transition-all cursor-pointer",
                  activeTab === 'dictation'
                    ? "border-primary bg-primary/5 text-primary shadow-sm"
                    : "border-transparent text-slate-600 hover:bg-slate-50"
                )}
              >
                <span>🎧 Luyện Nghe Viết</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 2. Wordlist status display */}
            <div className="premium-card p-4 bg-white border border-slate-100 shadow-sm rounded-3xl">
              <div className="flex items-center justify-between mb-3 border-b border-slate-50 pb-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Từ trong bài học</span>
                <span className="text-[10px] font-bold text-slate-500">{selectedList.words.length} từ</span>
              </div>
              
              <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                {selectedList.words.map((w, index) => (
                  <button
                    key={w.id}
                    onClick={() => {
                      setCurrentIndex(index);
                      setShowHint(false);
                    }}
                    className={cn(
                      "w-full p-2.5 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between",
                      currentIndex === index 
                        ? "bg-slate-900 border-slate-900 text-white" 
                        : "bg-white border-slate-100 hover:bg-slate-50 text-slate-700"
                    )}
                  >
                    <span className="truncate">{w.word} <span className={cn("text-[9px] font-sans italic", currentIndex === index ? "text-slate-300" : "text-slate-400")}>({w.wordType})</span></span>
                    {learnedStatus[w.id] && (
                      <Check className="w-3.5 h-3.5 text-emerald-500 font-bold shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT CENTER PANEL: INTERACTIVE CONTENT */}
          <div className="md:col-span-8 space-y-6">
            
            {/* ----------------- MODE 1: FLASHCARD ----------------- */}
            {activeTab === 'flashcard' && selectedList.words[currentIndex] && (
              <div className="space-y-6">
                
                {/* 3D Flip Card */}
                <div className="perspective-1000 w-full h-[320px] xs:h-[360px] sm:h-[400px]">
                  <div
                    onClick={() => setShowHint(prev => !prev)}
                    className={cn(
                      "relative w-full h-full preserve-3d transition-transform duration-500 border border-slate-150/60 rounded-[2.5rem] shadow-lg cursor-pointer",
                      showHint ? "rotate-y-180" : ""
                    )}
                  >
                    {/* Front View */}
                    <div className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center text-center bg-white p-6 sm:p-8 rounded-[2.5rem]">
                      <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[9px] font-black rounded-full uppercase tracking-wider mb-4">
                        {selectedList.words[currentIndex].wordType}
                      </span>
                      <h2 className="text-4xl sm:text-5xl font-black text-slate-800 tracking-tight mb-2">
                        {selectedList.words[currentIndex].word}
                      </h2>
                      <p className="text-base font-serif text-slate-400 font-bold mb-4">
                        {selectedList.words[currentIndex].phonetic}
                      </p>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakWord(selectedList.words[currentIndex].word);
                        }}
                        className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                      >
                        <Volume2 className="w-6 h-6" />
                      </button>
                      
                      <p className="absolute bottom-6 text-[9px] text-slate-300 font-black uppercase tracking-widest">Bấm vào thẻ để xem định nghĩa</p>
                    </div>

                    {/* Back View */}
                    <div className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center text-center bg-slate-900 text-white p-6 sm:p-8 overflow-y-auto rounded-[2.5rem]">
                      <div className="space-y-4 w-full">
                        <div>
                          <span className="text-[9px] text-primary font-black uppercase tracking-widest block">Nghĩa tiếng Việt</span>
                          <h3 className="text-2xl font-black text-primary mt-1">
                            {selectedList.words[currentIndex].meaningVi}
                          </h3>
                        </div>

                        <div className="border-t border-slate-800 pt-3">
                          <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest block">Định nghĩa tiếng Anh</span>
                          <p className="text-xs text-slate-350 mt-1 italic font-medium leading-relaxed">
                            "{selectedList.words[currentIndex].meaningEn}"
                          </p>
                        </div>

                        <div className="border-t border-slate-800 pt-3 text-left">
                          <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest block mb-1">Ví dụ minh họa</span>
                          <p className="text-xs text-slate-200 font-semibold italic">
                            "{selectedList.words[currentIndex].example}"
                          </p>
                          <p className="text-[11px] text-primary/80 mt-1 italic">
                            "{selectedList.words[currentIndex].exampleVi}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next/Prev Navigation and Mastery Controls */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex gap-2 flex-1">
                    <button
                      onClick={() => {
                        setShowHint(false);
                        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
                      }}
                      disabled={currentIndex === 0}
                      className="px-4 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-bold text-xs disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                    >
                      Trước
                    </button>
                    <button
                      onClick={() => {
                        setShowHint(false);
                        if (currentIndex < selectedList.words.length - 1) {
                          setCurrentIndex(prev => prev + 1);
                        } else {
                          alert("Đã đến từ cuối danh sách!");
                        }
                      }}
                      disabled={currentIndex === selectedList.words.length - 1}
                      className="px-4 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-bold text-xs disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                    >
                      Tiếp theo
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const wordId = selectedList.words[currentIndex].id;
                        setLearnedStatus(prev => {
                          const updated = { ...prev, [wordId]: true };
                          setLearnedCount(Object.values(updated).filter(Boolean).length);
                          return updated;
                        });
                        // Automatically slide to next
                        setTimeout(() => {
                          setShowHint(false);
                          if (currentIndex < selectedList.words.length - 1) {
                            setCurrentIndex(prev => prev + 1);
                          }
                        }, 300);
                      }}
                      className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-emerald-100 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Đã thuộc từ này
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------- MODE 2: MULTIPLE CHOICE QUIZ ----------------- */}
            {activeTab === 'quiz' && selectedList.words[currentIndex] && (
              <div className="premium-card p-6 sm:p-8 bg-white border border-slate-100 shadow-xl rounded-3xl space-y-6">
                
                {/* Score and Toggle Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Điểm số hiện tại</span>
                    <span className="text-base font-black text-primary">{quizScore} / {selectedList.words.length}</span>
                  </div>
                  
                  <button
                    onClick={toggleQuizMode}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/50 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1 transition-all active:scale-95"
                  >
                    <RefreshCw className="w-3 h-3 text-primary animate-spin" />
                    Đảo chiều câu hỏi: {isReverseQuiz ? "Vi -> Eng" : "Eng -> Vi"}
                  </button>
                </div>

                {/* Question panel */}
                <div className="p-6 bg-slate-900 text-white rounded-2xl shadow-inner font-bold text-lg text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/15 to-transparent pointer-events-none" />
                  <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest block mb-2 font-mono">Chọn đáp án đúng</span>
                  
                  {isReverseQuiz ? (
                    <span className="text-xl font-black text-primary block">
                      {selectedList.words[currentIndex].meaningVi}
                    </span>
                  ) : (
                    <div className="space-y-1">
                      <span className="text-2xl font-black block">{selectedList.words[currentIndex].word}</span>
                      <span className="text-xs text-slate-400 font-serif font-bold">{selectedList.words[currentIndex].phonetic}</span>
                    </div>
                  )}
                </div>

                {/* Option Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {quizOptions.map((opt) => {
                    const isCorrect = isReverseQuiz
                      ? opt.toLowerCase() === selectedList.words[currentIndex].word.toLowerCase()
                      : opt === selectedList.words[currentIndex].meaningVi;
                    const isSelected = selectedOpt === opt;

                    return (
                      <button
                        key={opt}
                        onClick={() => handleQuizAnswer(opt, selectedList)}
                        disabled={quizAnswered}
                        className={cn(
                          "p-4 rounded-xl border-2 text-xs font-black text-left transition-all active:scale-[0.98] cursor-pointer",
                          quizAnswered
                            ? isCorrect
                              ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                              : isSelected
                                ? "bg-rose-50 border-rose-500 text-rose-800"
                                : "bg-white border-slate-100 text-slate-350"
                            : "bg-white border-slate-100 hover:border-primary hover:bg-primary/5 text-slate-700"
                        )}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Panel */}
                {quizAnswered && (
                  <div className={cn(
                    "p-4 rounded-2xl border animate-in slide-in-from-top-2 duration-300",
                    selectedOpt === (isReverseQuiz ? selectedList.words[currentIndex].word : selectedList.words[currentIndex].meaningVi)
                      ? "bg-emerald-50/50 border-emerald-250/30 text-emerald-800"
                      : "bg-rose-50/50 border-rose-250/30 text-rose-800"
                  )}>
                    <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-1.5">
                      {selectedOpt === (isReverseQuiz ? selectedList.words[currentIndex].word : selectedList.words[currentIndex].meaningVi) ? (
                        <>🎉 Tuyệt vời! Đáp án chính xác.</>
                      ) : (
                        <>⚠️ Chưa đúng rồi!</>
                      )}
                    </h4>
                    <p className="text-xs font-bold text-slate-650 mt-1">
                      {selectedList.words[currentIndex].word} ({selectedList.words[currentIndex].wordType}): {selectedList.words[currentIndex].meaningVi}
                    </p>
                    <p className="text-[11px] text-slate-400 italic mt-0.5">"{selectedList.words[currentIndex].example}"</p>
                  </div>
                )}
              </div>
            )}

            {/* ----------------- MODE 3: MATCHING GAME ----------------- */}
            {activeTab === 'matching' && (
              <div className="premium-card p-6 bg-white border border-slate-100 shadow-xl rounded-3xl space-y-6">
                
                <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                  <div>
                    <h3 className="font-black text-sm text-slate-800">Trò Chơi Ghép Cặp Thẻ Từ</h3>
                    <p className="text-xs text-slate-400 font-semibold">Chọn 1 thẻ tiếng Anh và 1 thẻ nghĩa tiếng Việt tương ứng.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Số lượt thử</span>
                    <span className="text-xs font-black text-slate-700">{matchTries} lượt</span>
                  </div>
                </div>

                {!matchCompleted ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {matchingCards.map((card) => (
                      <button
                        key={card.id}
                        onClick={() => handleMatchCardClick(card)}
                        className={cn(
                          "h-24 p-3 rounded-2xl border-2 text-xs font-black transition-all flex items-center justify-center text-center leading-relaxed cursor-pointer select-none",
                          card.isMatched 
                            ? "bg-emerald-50 border-emerald-200 text-emerald-800 opacity-0 pointer-events-none scale-90 duration-500"
                            : card.isSelected
                              ? "bg-primary border-primary text-white scale-[1.02] shadow-md shadow-primary/20"
                              : card.type === 'word'
                                ? "bg-slate-50 border-slate-200 text-slate-800 hover:border-primary/50"
                                : "bg-orange-50/50 border-orange-200 text-orange-950 hover:border-primary/50"
                        )}
                      >
                        {card.text}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-10 space-y-5 animate-in zoom-in-95 duration-500">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-white shadow-lg">
                      <Trophy className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-black text-lg text-slate-800">Hoàn Thành Tuyệt Vời!</h3>
                      <p className="text-xs text-slate-500 font-semibold">Bạn đã hoàn thành ghép thẻ sau <span className="font-black text-primary">{matchTries} lượt thử</span>.</p>
                    </div>
                    <button
                      onClick={() => setupMatchingGame(selectedList)}
                      className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Chơi Lượt Mới
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ----------------- MODE 4: FILL IN THE BLANK ----------------- */}
            {activeTab === 'fill' && selectedList.words[currentIndex] && (
              <div className="premium-card p-6 sm:p-8 bg-white border border-slate-100 shadow-xl rounded-3xl space-y-6">
                
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    Điền từ vựng tiếng Anh
                  </span>
                  <h3 className="text-lg font-black text-slate-800 mt-2">Dịch từ sau sang tiếng Anh</h3>
                </div>

                {/* Definition Box */}
                <div className="p-5 bg-slate-50 border border-slate-200/50 rounded-2xl space-y-2 text-center shadow-inner">
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block font-mono">Từ loại: {selectedList.words[currentIndex].wordType}</span>
                  <h4 className="text-xl font-black text-slate-800">"{selectedList.words[currentIndex].meaningVi}"</h4>
                  <p className="text-xs text-slate-450 italic">Định nghĩa: {selectedList.words[currentIndex].meaningEn}</p>
                </div>

                {/* Input Fields */}
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      value={typedInput}
                      onChange={(e) => {
                        setTypedInput(e.target.value);
                        if (inputFeedback) setInputFeedback(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleCheckTextAnswer(selectedList);
                      }}
                      placeholder="Gõ từ tiếng Anh tại đây..."
                      className={cn(
                        "w-full px-4 py-3 bg-slate-50 border-2 rounded-xl text-sm font-black focus:outline-none focus:bg-white transition-all shadow-inner",
                        inputFeedback === 'correct'
                          ? "border-emerald-500 bg-emerald-50/20 text-emerald-800"
                          : inputFeedback === 'wrong'
                            ? "border-rose-500 bg-rose-50/20 text-rose-800 animate-shake"
                            : "border-slate-200 focus:border-primary"
                      )}
                    />

                    {typedInput && (
                      <button
                        onClick={() => {
                          setTypedInput('');
                          setInputFeedback(null);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-black text-sm"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  {showInputHint && (
                    <p className="text-[10px] font-black text-primary font-mono tracking-widest bg-primary/5 p-2.5 rounded-lg border border-primary/10">
                      Gợi ý: {getWordInputHint(selectedList.words[currentIndex].word)}
                    </p>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowInputHint(true)}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-250 text-slate-600 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      💡 Gợi ý chữ cái
                    </button>
                    
                    <button
                      onClick={() => handleCheckTextAnswer(selectedList)}
                      className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md"
                    >
                      Kiểm Tra (Enter)
                    </button>
                  </div>
                </div>

                {/* Example sentence helper */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-500 space-y-1">
                  <p className="font-bold text-slate-700">Ví dụ câu trong bài thi:</p>
                  <p className="italic">"{selectedList.words[currentIndex].example.replace(new RegExp(selectedList.words[currentIndex].word, 'gi'), '_____')}"</p>
                  <p className="text-[11px] text-slate-400">"{selectedList.words[currentIndex].exampleVi}"</p>
                </div>
              </div>
            )}

            {/* ----------------- MODE 5: LISTENING DICTATION ----------------- */}
            {activeTab === 'dictation' && selectedList.words[currentIndex] && (
              <div className="premium-card p-6 sm:p-8 bg-white border border-slate-100 shadow-xl rounded-3xl space-y-6">
                
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/5 px-2.5 py-0.5 rounded-full border border-primary/10">
                    Luyện nghe chính tả (Dictation)
                  </span>
                  <h3 className="text-lg font-black text-slate-800 mt-2">Nghe âm thanh và gõ lại từ vựng</h3>
                </div>

                {/* Audio Playing Station */}
                <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col items-center justify-center text-center space-y-4 relative overflow-hidden shadow-inner">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
                  
                  <div className="flex gap-4">
                    <button
                      onClick={() => speakWord(selectedList.words[currentIndex].word, false)}
                      className="w-16 h-16 rounded-full bg-primary hover:bg-primary/95 text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <Volume2 className="w-8 h-8" />
                    </button>

                    <button
                      onClick={() => speakWord(selectedList.words[currentIndex].word, true)}
                      className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer mt-2"
                      title="Nghe tốc độ chậm"
                    >
                      <Snail className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Nhấp nút để phát âm thanh (Bình thường / Chậm)
                  </p>
                </div>

                {/* Spelling input */}
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      value={typedInput}
                      onChange={(e) => {
                        setTypedInput(e.target.value);
                        if (inputFeedback) setInputFeedback(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleCheckTextAnswer(selectedList);
                      }}
                      placeholder="Gõ chính tả từ bạn nghe được..."
                      className={cn(
                        "w-full px-4 py-3 bg-slate-50 border-2 rounded-xl text-sm font-black focus:outline-none focus:bg-white transition-all shadow-inner",
                        inputFeedback === 'correct'
                          ? "border-emerald-500 bg-emerald-50/20 text-emerald-800"
                          : inputFeedback === 'wrong'
                            ? "border-rose-500 bg-rose-50/20 text-rose-800 animate-shake"
                            : "border-slate-200 focus:border-primary"
                      )}
                    />

                    {typedInput && (
                      <button
                        onClick={() => {
                          setTypedInput('');
                          setInputFeedback(null);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-black text-sm"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  {showInputHint && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs">
                      <p className="font-bold text-slate-600">Gợi ý nghĩa tiếng Việt:</p>
                      <p className="font-black text-primary">"{selectedList.words[currentIndex].meaningVi}"</p>
                      <p className="text-[10px] font-mono tracking-widest text-slate-450">Ký tự: {getWordInputHint(selectedList.words[currentIndex].word)}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowInputHint(true)}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      💡 Gợi ý (Nghĩa tiếng Việt)
                    </button>
                    
                    <button
                      onClick={() => handleCheckTextAnswer(selectedList)}
                      className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md"
                    >
                      Kiểm Tra (Enter)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Quick stats and help banner */}
            <div className="premium-card p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100 rounded-3xl flex items-start gap-3">
              <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5 fill-primary/20 animate-pulse" />
              <div className="space-y-1 text-xs">
                <h4 className="font-black text-slate-800">Phương pháp ôn tập cách quãng (Spaced Repetition)</h4>
                <p className="text-slate-650 font-medium leading-relaxed">
                  Luyện tập đầy đủ cả 5 chế độ đối với các từ khó để ghi nhớ vĩnh viễn vào trí nhớ dài hạn. Bạn có thể sử dụng nút "Đã thuộc" để đánh dấu những từ không cần hiển thị lại.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
