'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Gamepad2, Zap, Trophy, Target, Brain, Timer, Star, ChevronRight, Flame, Sparkles, X, CheckCircle2, RotateCcw, Play, RefreshCw, Loader2, ImageIcon, HelpCircle, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const speak = (text: string) => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  u.rate = 0.8;
  const voices = window.speechSynthesis.getVoices();
  const v = voices.find(v => v.lang === 'en-US' && v.name.includes('Google')) || voices.find(v => v.lang === 'en-US');
  if (v) u.voice = v;

  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    setTimeout(() => {
      window.speechSynthesis.speak(u);
    }, 50);
  } else {
    window.speechSynthesis.speak(u);
  }
};

import {
  STATIC_WORD_PAIRS,
  STATIC_QUIZ_QUESTIONS,
  STATIC_SCRAMBLE_WORDS,
  STATIC_SCRAMBLE_SENTENCES,
  STATIC_SCRAMBLE_IDIOMS,
  IMAGE_GUESS_POOL,
  GAME_CATALOG_DATA
} from '@/data/games/gameData';

// Helper to shuffle array
const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

interface Card {
  id: number;
  word: string;
  type: 'en' | 'vi';
  pairId: number;
  matched: boolean;
}

const getCategoryLabel = (cat: string) => {
  switch (cat) {
    case 'oxford': return 'Oxford 3000';
    case 'toeic': return 'TOEIC (Công sở)';
    case 'ielts': return 'IELTS (Học thuật)';
    case 'notebook': return 'Sổ tay của tôi';
    default: return 'Tất cả từ vựng';
  }
};

function GameVocabularyRecap({ words, onSaveWord, savedWords, savingWord }: { words: any[]; onSaveWord: (word: any) => void; savedWords: Record<string, boolean>; savingWord: string | null; }) {
  if (!words || words.length === 0) return null;
  return (
    <div className="mt-6 border-t border-slate-100 pt-5 space-y-3 text-left max-h-[280px] overflow-y-auto px-1">
      <h4 className="text-sm font-black text-slate-700 flex items-center gap-1.5 px-2">
        <Brain className="w-4 h-4 text-indigo-500 animate-pulse" /> Từ vựng đã ôn luyện trong lượt này
      </h4>
      <div className="grid grid-cols-1 gap-2">
        {words.map((w, idx) => {
          const isSaved = savedWords[w.word?.toLowerCase?.() || ''];
          const isSaving = savingWord === w.word;
          return (
            <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-black text-slate-800 text-sm truncate">{w.word}</span>
                  {w.wordType && <span className="text-[9px] font-bold px-1.5 py-0.5 bg-slate-200 text-slate-500 rounded-md">{w.wordType}</span>}
                </div>
                {w.phonetic && <div className="text-[10px] font-bold text-slate-400 mt-0.5">{w.phonetic}</div>}
                <div className="text-xs font-semibold text-slate-600 mt-0.5 line-clamp-1">{w.meaningVi}</div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button onClick={() => speak(w.word)} className="p-1.5 text-slate-400 hover:text-indigo-500 transition-colors bg-white rounded-lg border border-slate-100 hover:shadow-sm"><Volume2 className="w-3.5 h-3.5" /></button>
                <button disabled={isSaved || isSaving} onClick={() => onSaveWord(w)} className={cn("px-2.5 py-1 rounded-lg font-bold text-[10px] border transition-all flex items-center gap-1", isSaved ? "bg-green-50 border-green-200 text-green-600" : "bg-white hover:bg-slate-50 border-slate-200 text-slate-600 cursor-pointer hover:shadow-sm")}>
                  {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : isSaved ? <>Đã lưu</> : <>Lưu sổ tay</>}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Vocabulary Match Game ────────────────────────────────────────────────────
function VocabMatchGame({ dbWords, category, onClose, awardXp, onSaveWord, savedWords, savingWord }: { dbWords: any[]; category: string; onClose: () => void; awardXp?: (amount: number, reason: string) => void; onSaveWord: (word: any) => void; savedWords: Record<string, boolean>; savingWord: string | null; }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [selected, setSelected] = useState<Card[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);
  const [won, setWon] = useState(false);
  const [pairCount, setPairCount] = useState(8);
  const [sessionWords, setSessionWords] = useState<any[]>([]);

  const initGame = useCallback(() => {
    let pool = STATIC_WORD_PAIRS;
    let fullWords: any[] = [];
    if (dbWords && dbWords.length >= 8) {
      pool = dbWords.map(w => ({ en: w.word, vi: w.meaningVi }));
      fullWords = dbWords;
    }

    const shuffledPool = shuffle(pool);
    const selectedPairs = shuffledPool.slice(0, 8);
    const deck: Card[] = [];
    selectedPairs.forEach((p, idx) => {
      const pairId = idx + 1;
      deck.push({ id: pairId * 10, word: p.en, type: 'en', pairId, matched: false });
      deck.push({ id: pairId * 10 + 1, word: p.vi, type: 'vi', pairId, matched: false });
    });

    if (fullWords.length > 0) {
      setSessionWords(selectedPairs.map(p => fullWords.find(w => w.word === p.en)).filter(Boolean));
    } else {
      setSessionWords(selectedPairs.map(p => ({ word: p.en, meaningVi: p.vi, meaningEn: p.en, wordType: '', phonetic: '' })));
    }

    setCards(shuffle(deck));
    setSelected([]);
    setMatches(0);
    setMoves(0);
    setTimer(0);
    setRunning(true);
    setWon(false);
    setPairCount(selectedPairs.length);
  }, [dbWords]);

  useEffect(() => { initGame(); }, [initGame]);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setTimer(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  const handleSelect = (card: Card) => {
    if (card.matched || selected.length === 2 || selected.find(c => c.id === card.id)) return;
    const next = [...selected, card];
    setSelected(next);
    if (card.type === 'en') speak(card.word);

    if (next.length === 2) {
      setMoves(m => m + 1);
      if (next[0].pairId === next[1].pairId) {
        setCards(prev => prev.map(c => c.pairId === next[0].pairId ? { ...c, matched: true } : c));
        setMatches(m => {
          const nm = m + 1;
          if (nm === pairCount) {
            setRunning(false);
            setWon(true);
            awardXp?.(50, 'Vocab Match Game');
          }
          return nm;
        });
        setTimeout(() => setSelected([]), 300);
      } else {
        setTimeout(() => setSelected([]), 800);
      }
    }
  };

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div>
            <h2 className="text-xl font-black text-white">Vocabulary Match</h2>
            <p className="text-blue-200 text-xs font-medium">Nối từ tiếng Anh với nghĩa tiếng Việt tương ứng (Danh mục: {getCategoryLabel(category)})</p>
          </div>
          <div className="flex items-center gap-6 text-sm font-black">
            <div className="text-center"><p className="text-blue-200 text-[10px] uppercase tracking-widest font-bold">Thời gian</p><p className="text-xl">{fmt(timer)}</p></div>
            <div className="text-center"><p className="text-blue-200 text-[10px] uppercase tracking-widest font-bold">Lượt đi</p><p className="text-xl">{moves}</p></div>
            <div className="text-center"><p className="text-blue-200 text-[10px] uppercase tracking-widest font-bold">Đã ghép</p><p className="text-xl">{matches}/{pairCount}</p></div>
            <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white"><X className="w-5 h-5" /></button>
          </div>
        </div>

        {won ? (
          <div className="p-12 text-center space-y-6 animate-in zoom-in duration-500 max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="text-6xl animate-bounce">🎉</div>
            <h3 className="text-3xl font-black text-slate-800">Xuất Sắc!</h3>
            <p className="text-slate-500 font-medium">Hoàn thành trong <strong>{fmt(timer)}</strong> với <strong>{moves} lượt đi</strong></p>
            <div className="flex gap-4 justify-center">
              <button onClick={initGame} className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/30"><RotateCcw className="w-4 h-4" /> Chơi Lại</button>
              <button onClick={onClose} className="px-8 py-3 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all">Quay Về</button>
            </div>
            <GameVocabularyRecap words={sessionWords} onSaveWord={onSaveWord} savedWords={savedWords} savingWord={savingWord} />
          </div>
        ) : (
          <div className="p-8 grid grid-cols-4 gap-3">
            {cards.map(card => {
              const isSel = selected.find(c => c.id === card.id);
              return (
                <button
                  key={card.id}
                  onClick={() => handleSelect(card)}
                  disabled={card.matched}
                  className={cn(
                    "h-16 rounded-2xl font-bold text-sm transition-all duration-300 border-2 leading-tight px-2 cursor-pointer",
                    card.matched
                      ? "bg-green-50 border-green-200 text-green-600 scale-95 cursor-default"
                      : isSel
                        ? "bg-indigo-600 border-indigo-600 text-white scale-105 shadow-lg"
                        : card.type === 'en'
                          ? "bg-slate-900 border-slate-700 text-white hover:scale-105 hover:shadow-md"
                          : "bg-blue-50 border-blue-100 text-blue-800 hover:scale-105 hover:shadow-md"
                  )}
                >
                  {card.matched ? <CheckCircle2 className="w-5 h-5 mx-auto text-green-500" /> : card.word}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Speed Quiz Game ───────────────────────────────────────────────────────────
function SpeedQuizGame({ dbWords, category, onClose, awardXp, onSaveWord, savedWords, savingWord }: { dbWords: any[]; category: string; onClose: () => void; awardXp?: (amount: number, reason: string) => void; onSaveWord: (word: any) => void; savedWords: Record<string, boolean>; savingWord: string | null; }) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [done, setDone] = useState(false);
  const [sessionWords, setSessionWords] = useState<any[]>([]);

  const initGame = useCallback(() => {
    let generated: any[] = [];

    // Generate questions dynamically if database words are loaded
    if (dbWords && dbWords.length >= 10) {
      const shuffledWords = shuffle(dbWords);

      const selectedFullWords = shuffledWords.slice(0, 10);
      setSessionWords(selectedFullWords);
      for (let index = 0; index < 10; index++) {
        const target = shuffledWords[index];
        const isFillInBlank = Math.random() > 0.5 && target.example && target.example.toLowerCase().includes(target.word.toLowerCase());

        // Option distraction pool (exclude target word)
        const distractors = shuffledWords
          .filter(w => w.word !== target.word)
          .slice(0, 3);

        if (isFillInBlank) {
          // Fill in the blank question
          const regex = new RegExp(`\\b${target.word}\\b`, 'gi');
          const blanked = target.example.replace(regex, '_______');

          const options = shuffle([target.word, ...distractors.map(d => d.word)]);
          const answer = options.indexOf(target.word);

          generated.push({
            q: `Điền từ thích hợp vào chỗ trống:\n"${blanked}" (${target.exampleVi || 'Dịch nghĩa câu'})`,
            options,
            answer
          });
        } else {
          // Meaning question
          const options = shuffle([target.meaningVi, ...distractors.map(d => d.meaningVi)]);
          const answer = options.indexOf(target.meaningVi);

          generated.push({
            q: `Từ "${target.word}" trong tiếng Việt mang ý nghĩa là gì?`,
            options,
            answer
          });
        }
      }
    }

    // Fallback to static questions if no DB or empty database
    if (generated.length === 0) {
      generated = shuffle(STATIC_QUIZ_QUESTIONS).slice(0, 10);
      setSessionWords([]);
    }

    setQuestions(generated);
    setQIdx(0);
    setScore(0);
    setSelected(null);
    setTimeLeft(15);
    setDone(false);
  }, [dbWords]);

  useEffect(() => { initGame(); }, [initGame]);

  useEffect(() => {
    if (done && score > 0) {
      awardXp?.(score * 20, 'Speed Quiz Game');
    }
  }, [done, score, awardXp]);

  useEffect(() => {
    if (done || selected !== null || questions.length === 0) return;
    if (timeLeft === 0) { handleAnswer(-1); return; }
    const t = setTimeout(() => setTimeLeft(p => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, done, selected, questions]);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const q = questions[qIdx];
    if (idx === q.answer) setScore(s => s + 1);

    setTimeout(() => {
      if (qIdx < questions.length - 1) {
        setQIdx(q => q + 1);
        setSelected(null);
        setTimeLeft(15);
      } else {
        setDone(true);
      }
    }, 1200);
  };

  const q = questions[qIdx];
  const pct = (timeLeft / 15) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="px-8 py-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-black opacity-85">Câu hỏi {qIdx + 1}/{questions.length}</span>
            <span className={cn("text-2xl font-black", timeLeft <= 5 && "animate-pulse text-yellow-300")}>{timeLeft}s</span>
            <button onClick={onClose} className="p-1.5 bg-white/20 rounded-full text-white"><X className="w-4 h-4" /></button>
          </div>
          <p className="text-pink-100 text-[10px] font-bold uppercase tracking-widest mb-2">Danh mục: {getCategoryLabel(category)}</p>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {done ? (
          <div className="p-10 text-center space-y-5 animate-in zoom-in duration-500 max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="text-5xl">{score >= 4 ? '🏆' : score >= 3 ? '🎉' : '📚'}</div>
            <h3 className="text-2xl font-black text-slate-800">Trả lời đúng {score}/{questions.length} câu!</h3>
            <p className="text-slate-500 font-semibold">+{score * 20} XP</p>
            <div className="flex gap-3 justify-center">
              <button onClick={initGame} className="px-6 py-3 bg-rose-500 text-white rounded-2xl font-bold flex items-center gap-1 shadow-lg shadow-rose-500/30 cursor-pointer"><RotateCcw className="w-4 h-4" />Chơi Lại</button>
              <button onClick={onClose} className="px-6 py-3 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all">Quay Về</button>
            </div>
            <GameVocabularyRecap words={sessionWords} onSaveWord={onSaveWord} savedWords={savedWords} savingWord={savingWord} />
          </div>
        ) : q ? (
          <div className="p-8 space-y-6">
            <h3 className="text-xl font-black text-slate-800 leading-snug whitespace-pre-line">{q.q}</h3>
            <div className="grid grid-cols-1 gap-3">
              {q.options.map((opt: string, i: number) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={selected !== null}
                  className={cn(
                    "p-4 rounded-2xl text-sm font-bold border-2 text-left transition-all cursor-pointer",
                    selected === null ? "border-slate-100 hover:border-rose-300 hover:bg-rose-50/50" :
                      i === q.answer ? "bg-green-50 border-green-400 text-green-700" :
                        i === selected ? "bg-rose-50 border-rose-400 text-rose-700" :
                          "border-slate-100 opacity-40"
                  )}
                >{opt}</button>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500">Đang chuẩn bị câu hỏi...</div>
        )}
      </div>
    </div>
  );
}

// ─── Word Scramble Game (Nối Chữ Thành Từ) ──────────────────────────────────────
function WordScrambleGame({ dbWords, category, onClose, awardXp, onSaveWord, savedWords, savingWord }: { dbWords: any[]; category: string; onClose: () => void; awardXp?: (amount: number, reason: string) => void; onSaveWord: (word: any) => void; savedWords: Record<string, boolean>; savingWord: string | null; }) {
  const [scrambleList, setScrambleList] = useState<any[]>([]);
  const [wordIdx, setWordIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [lettersPool, setLettersPool] = useState<{ char: string; originalIdx: number; used: boolean }[]>([]);
  const [answer, setAnswer] = useState<{ char: string; poolIdx: number }[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);
  const [sessionWords, setSessionWords] = useState<any[]>([]);

  const initGame = useCallback(() => {
    let pool = STATIC_SCRAMBLE_WORDS;
    let trackWords: any[] = [];
    if (dbWords && dbWords.length >= 8) {
      pool = dbWords.map(w => ({
        word: w.word.toUpperCase(),
        hint: `Từ loại: ${w.wordType || 'từ'}. Nghĩa Việt: ${w.meaningVi}${w.phonetic ? ` (Phiên âm: ${w.phonetic})` : ''}`
      }));
      const shuffled = shuffle(pool).slice(0, 10);
      const list = shuffled;
      trackWords = shuffled.map(s => {
        const orig = dbWords.find(d => d.word.toUpperCase() === s.word);
        return orig || { word: s.word.charAt(0) + s.word.slice(1).toLowerCase(), meaningVi: s.hint, meaningEn: s.word, wordType: '', phonetic: '' };
      });
      setSessionWords(trackWords);
      setScrambleList(list);
    } else {
      const list = shuffle(pool).slice(0, 10);
      setSessionWords(list.map(s => ({ word: s.word.charAt(0) + s.word.slice(1).toLowerCase(), meaningVi: s.hint, meaningEn: s.word, wordType: 'Noun', phonetic: '' })));
      setScrambleList(list);
    }
    setWordIdx(0);
    setScore(0);
    setDone(false);
  }, [dbWords]);

  useEffect(() => { initGame(); }, [initGame]);

  useEffect(() => {
    if (done && score > 0) {
      awardXp?.(score * 15, 'Word Scramble Game');
    }
  }, [done, score, awardXp]);

  const activeWord = scrambleList[wordIdx];

  const initWord = useCallback(() => {
    if (!activeWord) return;
    const chars = activeWord.word.split('');
    const shuffled = chars
      .map((c: string, i: number) => ({ char: c, originalIdx: i, used: false }))
      .sort(() => Math.random() - 0.5);
    setLettersPool(shuffled);
    setAnswer([]);
    setIsCorrect(null);
  }, [activeWord]);

  useEffect(() => { initWord(); }, [initWord]);

  const selectChar = (poolIdx: number) => {
    if (lettersPool[poolIdx].used) return;
    const char = lettersPool[poolIdx].char;
    setLettersPool(prev => prev.map((item, i) => i === poolIdx ? { ...item, used: true } : item));
    setAnswer(prev => [...prev, { char, poolIdx }]);
    setIsCorrect(null);
  };

  const removeChar = (answerIdx: number) => {
    const item = answer[answerIdx];
    setLettersPool(prev => prev.map((l, i) => i === item.poolIdx ? { ...l, used: false } : l));
    setAnswer(prev => prev.filter((_, i) => i !== answerIdx));
    setIsCorrect(null);
  };

  const resetWord = () => {
    setLettersPool(prev => prev.map(l => ({ ...l, used: false })));
    setAnswer([]);
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    const spelled = answer.map(a => a.char).join('');
    if (spelled === activeWord.word) {
      setIsCorrect(true);
      setScore(s => s + 1);
      speak(activeWord.word);
      setTimeout(() => {
        if (wordIdx < scrambleList.length - 1) {
          setWordIdx(i => i + 1);
        } else {
          setDone(true);
        }
      }, 1500);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div>
            <h2 className="text-xl font-black text-white">Word Scramble</h2>
            <p className="text-purple-200 text-xs font-medium">Ghép các chữ cái xáo trộn thành một từ có nghĩa (Danh mục: {getCategoryLabel(category)})</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white"><X className="w-5 h-5" /></button>
        </div>

        {done ? (
          <div className="p-10 text-center space-y-5 animate-in zoom-in duration-500 max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="text-5xl">🐝</div>
            <h3 className="text-2xl font-black text-slate-800">Hoàn Thành Ghép Chữ!</h3>
            <p className="text-slate-500 font-medium">Bạn đã ghép đúng {score}/{scrambleList.length} từ vựng.</p>
            <p className="text-green-600 font-black">+{score * 15} XP</p>
            <div className="flex gap-3 justify-center">
              <button onClick={initGame} className="px-6 py-3 bg-purple-600 text-white rounded-2xl font-bold flex items-center gap-1 shadow-lg shadow-purple-600/30 cursor-pointer"><RotateCcw className="w-4 h-4" />Chơi Lại</button>
              <button onClick={onClose} className="px-6 py-3 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all">Quay Về</button>
            </div>
            <GameVocabularyRecap words={sessionWords} onSaveWord={onSaveWord} savedWords={savedWords} savingWord={savingWord} />
          </div>
        ) : activeWord ? (
          <div className="p-8 space-y-6">
            {/* Hint Box */}
            <div className="p-4 bg-purple-50 border border-purple-100 rounded-2xl text-purple-800 text-sm font-medium leading-relaxed">
              <span className="font-bold block text-xs uppercase tracking-wider text-purple-600 mb-1">Gợi ý từ vựng</span>
              {activeWord?.hint}
            </div>

            {/* Answer Box */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Từ bạn ghép</span>
              <div className={cn(
                "min-h-16 p-3 rounded-2xl border-2 border-dashed flex flex-wrap gap-2 items-center justify-center transition-all duration-300",
                isCorrect === true ? "bg-green-50 border-green-400" :
                  isCorrect === false ? "bg-red-50 border-red-400 animate-shake" :
                    "bg-slate-50 border-slate-200"
              )}>
                {answer.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => removeChar(idx)}
                    className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 text-white font-black text-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm animate-in zoom-in duration-200"
                  >
                    {item.char}
                  </button>
                ))}
                {answer.length === 0 && <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Nhấp các chữ cái bên dưới để bắt đầu</span>}
              </div>
            </div>

            {/* Pool Box */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Các chữ cái</span>
              <div className="flex flex-wrap gap-2 justify-center">
                {lettersPool.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectChar(idx)}
                    disabled={item.used}
                    className={cn(
                      "w-12 h-12 rounded-xl text-lg font-black flex items-center justify-center border-2 transition-all cursor-pointer shadow-sm",
                      item.used
                        ? "bg-slate-100 border-slate-200 text-slate-300 scale-95"
                        : "bg-white border-purple-200 text-purple-700 hover:scale-115 hover:border-purple-400 active:scale-90"
                    )}
                  >
                    {item.char}
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-3 justify-end pt-2 border-t border-slate-100">
              <button
                onClick={resetWord}
                className="px-4 py-2 border border-slate-200 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all flex items-center gap-1.5 text-slate-500 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Xóa Tất Cả
              </button>
              <button
                onClick={checkAnswer}
                disabled={answer.length !== activeWord?.word.length}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:opacity-90 transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-indigo-600/20"
              >
                Kiểm Tra <Play className="w-3 h-3 fill-white text-white" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500">Đang chuẩn bị...</div>
        )}
      </div>
    </div>
  );
}

// ─── Sentence Builder Game (Nối Từ Thành Câu) ───────────────────────────────────
function SentenceBuilderGame({ dbWords, category, onClose, awardXp, onSaveWord, savedWords, savingWord }: { dbWords: any[]; category: string; onClose: () => void; awardXp?: (amount: number, reason: string) => void; onSaveWord: (word: any) => void; savedWords: Record<string, boolean>; savingWord: string | null; }) {
  const [sentenceList, setSentenceList] = useState<any[]>([]);
  const [sentIdx, setSentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [wordsPool, setWordsPool] = useState<{ word: string; originalIdx: number; used: boolean }[]>([]);
  const [answer, setAnswer] = useState<{ word: string; poolIdx: number }[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);
  const [sessionWords, setSessionWords] = useState<any[]>([]);

  const initGame = useCallback(() => {
    let pool = STATIC_SCRAMBLE_SENTENCES;

    if (dbWords && dbWords.length >= 5) {
      // Find database words that have proper example sentences
      const dbPool = dbWords
        .filter(w => w.example && w.example.split(' ').length >= 4 && w.example.split(' ').length <= 10)
        .map(w => {
          // Clean sentence punctuation at end (keep it simple for scramble)
          const cleanSentence = w.example.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, '').trim();
          return {
            sentence: cleanSentence,
            hint: w.exampleVi || `Ví dụ của từ "${w.word}"`
          };
        });

      if (dbPool.length >= 4) {
        pool = dbPool;
      }
    }

    const list = shuffle(pool).slice(0, 8);
    if (dbWords && dbWords.length >= 5) {
      const usedWords = dbWords.filter(w => w.example && w.example.split(' ').length >= 4 && w.example.split(' ').length <= 10).slice(0, 8);
      setSessionWords(usedWords);
    } else {
      setSessionWords([]);
    }
    setSentenceList(list);
    setSentIdx(0);
    setScore(0);
    setDone(false);
  }, [dbWords]);

  useEffect(() => { initGame(); }, [initGame]);

  useEffect(() => {
    if (done && score > 0) {
      awardXp?.(score * 20, 'Sentence Builder Game');
    }
  }, [done, score, awardXp]);

  const activeSent = sentenceList[sentIdx];

  const initSentence = useCallback(() => {
    if (!activeSent) return;
    const words = activeSent.sentence.split(/\s+/);
    const shuffled = words
      .map((w: string, i: number) => ({ word: w, originalIdx: i, used: false }))
      .sort(() => Math.random() - 0.5);
    setWordsPool(shuffled);
    setAnswer([]);
    setIsCorrect(null);
  }, [activeSent]);

  useEffect(() => { initSentence(); }, [initSentence]);

  const selectWord = (poolIdx: number) => {
    if (wordsPool[poolIdx].used) return;
    const word = wordsPool[poolIdx].word;
    setWordsPool(prev => prev.map((item, i) => i === poolIdx ? { ...item, used: true } : item));
    setAnswer(prev => [...prev, { word, poolIdx }]);
    setIsCorrect(null);
  };

  const removeWord = (answerIdx: number) => {
    const item = answer[answerIdx];
    setWordsPool(prev => prev.map((w, i) => i === item.poolIdx ? { ...w, used: false } : w));
    setAnswer(prev => prev.filter((_, i) => i !== answerIdx));
    setIsCorrect(null);
  };

  const resetSentence = () => {
    setWordsPool(prev => prev.map(w => ({ ...w, used: false })));
    setAnswer([]);
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    const spelled = answer.map(a => a.word).join(' ');
    // Match case-insensitively for flexibility
    if (spelled.trim().toLowerCase() === activeSent.sentence.trim().toLowerCase()) {
      setIsCorrect(true);
      setScore(s => s + 1);
      speak(activeSent.sentence);
      setTimeout(() => {
        if (sentIdx < sentenceList.length - 1) {
          setSentIdx(i => i + 1);
        } else {
          setDone(true);
        }
      }, 1500);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div>
            <h2 className="text-xl font-black text-white">Sentence Builder</h2>
            <p className="text-emerald-200 text-xs font-medium">Sắp xếp các từ xáo trộn để tạo thành câu hoàn chỉnh (Danh mục: {getCategoryLabel(category)})</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white"><X className="w-5 h-5" /></button>
        </div>

        {done ? (
          <div className="p-10 text-center space-y-5 animate-in zoom-in duration-500 max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="text-5xl">✍️</div>
            <h3 className="text-2xl font-black text-slate-800">Hoàn Thành Ghép Câu!</h3>
            <p className="text-slate-500 font-medium">Bạn đã sắp xếp đúng {score}/{sentenceList.length} câu hoàn chỉnh.</p>
            <p className="text-green-600 font-black">+{score * 20} XP</p>
            <div className="flex gap-3 justify-center">
              <button onClick={initGame} className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold flex items-center gap-1 shadow-lg shadow-emerald-600/30 cursor-pointer"><RotateCcw className="w-4 h-4" />Chơi Lại</button>
              <button onClick={onClose} className="px-6 py-3 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all">Quay Về</button>
            </div>
            <GameVocabularyRecap words={sessionWords} onSaveWord={onSaveWord} savedWords={savedWords} savingWord={savingWord} />
          </div>
        ) : activeSent ? (
          <div className="p-8 space-y-6">
            {/* Hint Box */}
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-800 text-sm font-medium leading-relaxed">
              <span className="font-bold block text-xs uppercase tracking-wider text-emerald-600 mb-1">Nghĩa tiếng Việt của câu</span>
              {activeSent?.hint}
            </div>

            {/* Answer Box */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Câu bạn đang ghép</span>
              <div className={cn(
                "min-h-20 p-4 rounded-2xl border-2 border-dashed flex flex-wrap gap-2.5 items-center justify-center transition-all duration-300",
                isCorrect === true ? "bg-green-50 border-green-400" :
                  isCorrect === false ? "bg-red-50 border-red-400 animate-shake" :
                    "bg-slate-50 border-slate-200"
              )}>
                {answer.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => removeWord(idx)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm animate-in zoom-in duration-200"
                  >
                    {item.word}
                  </button>
                ))}
                {answer.length === 0 && <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Nhấp các từ bên dưới để bắt đầu sắp xếp</span>}
              </div>
            </div>

            {/* Pool Box */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Các từ vựng</span>
              <div className="flex flex-wrap gap-2.5 justify-center">
                {wordsPool.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectWord(idx)}
                    disabled={item.used}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-bold flex items-center justify-center border-2 transition-all cursor-pointer shadow-sm",
                      item.used
                        ? "bg-slate-100 border-slate-200 text-slate-300 scale-95"
                        : "bg-white border-emerald-200 text-emerald-700 hover:scale-105 hover:border-emerald-400 active:scale-90"
                    )}
                  >
                    {item.word}
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-3 justify-end pt-2 border-t border-slate-100">
              <button
                onClick={resetSentence}
                className="px-4 py-2 border border-slate-200 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all flex items-center gap-1.5 text-slate-500 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Xóa Tất Cả
              </button>
              <button
                onClick={checkAnswer}
                disabled={answer.length !== wordsPool.length}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:opacity-90 transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-indigo-600/20"
              >
                Kiểm Tra <Play className="w-3 h-3 fill-white text-white" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500">Đang chuẩn bị...</div>
        )}
      </div>
    </div>
  );
}

// ─── Idiom Connector Game (Nối Từ Thành Thành Ngữ) ──────────────────────────────
function IdiomConnectorGame({ onClose, awardXp }: { onClose: () => void; awardXp?: (amount: number, reason: string) => void }) {
  const [idiomList, setIdiomList] = useState<any[]>([]);
  const [idiomIdx, setIdiomIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [wordsPool, setWordsPool] = useState<{ word: string; originalIdx: number; used: boolean }[]>([]);
  const [answer, setAnswer] = useState<{ word: string; poolIdx: number }[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);

  const initGame = useCallback(() => {
    const list = shuffle(STATIC_SCRAMBLE_IDIOMS).slice(0, 5);
    setIdiomList(list);
    setIdiomIdx(0);
    setScore(0);
    setDone(false);
  }, []);

  useEffect(() => { initGame(); }, [initGame]);

  useEffect(() => {
    if (done && score > 0) {
      awardXp?.(score * 25, 'Idiom Connector Game');
    }
  }, [done, score, awardXp]);

  const activeIdiom = idiomList[idiomIdx];

  const initIdiom = useCallback(() => {
    if (!activeIdiom) return;
    const words = activeIdiom.idiom.split(' ');
    const shuffled = words
      .map((w: string, i: number) => ({ word: w, originalIdx: i, used: false }))
      .sort(() => Math.random() - 0.5);
    setWordsPool(shuffled);
    setAnswer([]);
    setIsCorrect(null);
  }, [activeIdiom]);

  useEffect(() => { initIdiom(); }, [initIdiom]);

  const selectWord = (poolIdx: number) => {
    if (wordsPool[poolIdx].used) return;
    const word = wordsPool[poolIdx].word;
    setWordsPool(prev => prev.map((item, i) => i === poolIdx ? { ...item, used: true } : item));
    setAnswer(prev => [...prev, { word, poolIdx }]);
    setIsCorrect(null);
  };

  const removeWord = (answerIdx: number) => {
    const item = answer[answerIdx];
    setWordsPool(prev => prev.map((w, i) => i === item.poolIdx ? { ...w, used: false } : w));
    setAnswer(prev => prev.filter((_, i) => i !== answerIdx));
    setIsCorrect(null);
  };

  const resetIdiom = () => {
    setWordsPool(prev => prev.map(w => ({ ...w, used: false })));
    setAnswer([]);
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    const spelled = answer.map(a => a.word).join(' ');
    if (spelled.toLowerCase() === activeIdiom.idiom.toLowerCase()) {
      setIsCorrect(true);
      setScore(s => s + 1);
      speak(activeIdiom.idiom);
      setTimeout(() => {
        if (idiomIdx < idiomList.length - 1) {
          setIdiomIdx(i => i + 1);
        } else {
          setDone(true);
        }
      }, 1500);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-gradient-to-r from-violet-600 to-purple-600 text-white">
          <div>
            <h2 className="text-xl font-black text-white">Idiom Connector</h2>
            <p className="text-violet-200 text-xs font-medium">Ghép nối từ tạo thành thành ngữ tiếng Anh hoàn chỉnh (Ngẫu nhiên)</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white"><X className="w-5 h-5" /></button>
        </div>

        {done ? (
          <div className="p-10 text-center space-y-5 animate-in zoom-in duration-500">
            <div className="text-5xl">💡</div>
            <h3 className="text-2xl font-black text-slate-800">Hoàn Thành Thành Ngữ!</h3>
            <p className="text-slate-500 font-medium">Bạn đã ghép đúng {score}/{idiomList.length} thành ngữ phổ biến.</p>
            <p className="text-green-600 font-black">+{score * 25} XP</p>
            <div className="flex gap-3 justify-center">
              <button onClick={initGame} className="px-6 py-3 bg-violet-600 text-white rounded-2xl font-bold flex items-center gap-1 shadow-lg shadow-violet-600/30 cursor-pointer"><RotateCcw className="w-4 h-4" />Chơi Lại</button>
              <button onClick={onClose} className="px-6 py-3 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all">Quay Về</button>
            </div>
          </div>
        ) : activeIdiom ? (
          <div className="p-8 space-y-6">
            {/* Hint Box */}
            <div className="p-4 bg-violet-50 border border-violet-100 rounded-2xl text-violet-800 text-sm font-medium leading-relaxed">
              <span className="font-bold block text-xs uppercase tracking-wider text-violet-600 mb-1">Ý nghĩa của thành ngữ</span>
              {activeIdiom?.hint}
            </div>

            {/* Answer Box */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Thành ngữ bạn đang ghép</span>
              <div className={cn(
                "min-h-20 p-4 rounded-2xl border-2 border-dashed flex flex-wrap gap-2.5 items-center justify-center transition-all duration-300",
                isCorrect === true ? "bg-green-50 border-green-400" :
                  isCorrect === false ? "bg-red-50 border-red-400 animate-shake" :
                    "bg-slate-50 border-slate-200"
              )}>
                {answer.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => removeWord(idx)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm animate-in zoom-in duration-200"
                  >
                    {item.word}
                  </button>
                ))}
                {answer.length === 0 && <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Nhấp các từ bên dưới để bắt đầu sắp xếp thành ngữ</span>}
              </div>
            </div>

            {/* Pool Box */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Các từ vựng</span>
              <div className="flex flex-wrap gap-2.5 justify-center">
                {wordsPool.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectWord(idx)}
                    disabled={item.used}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-bold flex items-center justify-center border-2 transition-all cursor-pointer shadow-sm",
                      item.used
                        ? "bg-slate-100 border-slate-200 text-slate-300 scale-95"
                        : "bg-white border-violet-200 text-violet-700 hover:scale-105 hover:border-violet-400 active:scale-90"
                    )}
                  >
                    {item.word}
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-3 justify-end pt-2 border-t border-slate-100">
              <button
                onClick={resetIdiom}
                className="px-4 py-2 border border-slate-200 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all flex items-center gap-1.5 text-slate-500 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Xóa Tất Cả
              </button>
              <button
                onClick={checkAnswer}
                disabled={answer.length !== wordsPool.length}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:opacity-90 transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-indigo-600/20"
              >
                Kiểm Tra <Play className="w-3 h-3 fill-white text-white" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500">Đang chuẩn bị...</div>
        )}
      </div>
    </div>
  );
}

// ─── Image Guessing Game (Đoán Chữ Qua Hình Ảnh) ────────────────────────────────


function ImageGuessGame({ onClose, awardXp }: { onClose: () => void; awardXp?: (amount: number, reason: string) => void }) {
  const [list, setList] = useState<any[]>([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [lettersPool, setLettersPool] = useState<{ char: string; originalIdx: number; used: boolean }[]>([]);
  const [answer, setAnswer] = useState<{ char: string; poolIdx: number }[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [done, setDone] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);

  const initGame = useCallback(() => {
    const selected = shuffle(IMAGE_GUESS_POOL).slice(0, 8);
    setList(selected);
    setIdx(0);
    setScore(0);
    setDone(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (done && score > 0) {
      awardXp?.(score * 20, 'Image Guessing Game');
    }
  }, [done, score, awardXp]);

  const activeItem = list[idx];

  const initItem = useCallback(() => {
    if (!activeItem) return;
    setImgLoading(true);
    const wordChars = activeItem.word.split('');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const poolChars = [...wordChars];
    while (poolChars.length < 12) {
      const randChar = alphabet[Math.floor(Math.random() * alphabet.length)];
      poolChars.push(randChar);
    }
    const shuffled = poolChars
      .map((c: string, i: number) => ({ char: c, originalIdx: i, used: false }))
      .sort(() => Math.random() - 0.5);
    setLettersPool(shuffled);
    setAnswer([]);
    setIsCorrect(null);
    setShowHint(false);
  }, [activeItem]);

  useEffect(() => {
    initItem();
  }, [initItem]);

  const selectChar = useCallback((poolIdx: number) => {
    if (!activeItem) return;
    if (lettersPool[poolIdx].used || answer.length >= activeItem.word.length) return;
    const char = lettersPool[poolIdx].char;
    setLettersPool(prev => prev.map((item, i) => i === poolIdx ? { ...item, used: true } : item));
    setAnswer(prev => [...prev, { char, poolIdx }]);
    setIsCorrect(null);
  }, [lettersPool, answer, activeItem]);

  const removeChar = useCallback((answerIdx: number) => {
    const item = answer[answerIdx];
    if (!item) return;
    setLettersPool(prev => prev.map((l, i) => i === item.poolIdx ? { ...l, used: false } : l));
    setAnswer(prev => prev.filter((_, i) => i !== answerIdx));
    setIsCorrect(null);
  }, [answer]);

  const resetItem = () => {
    setLettersPool(prev => prev.map(l => ({ ...l, used: false })));
    setAnswer([]);
    setIsCorrect(null);
  };

  const checkAnswer = useCallback(() => {
    if (!activeItem) return;
    const spelled = answer.map(a => a.char).join('');
    if (spelled === activeItem.word) {
      setIsCorrect(true);
      setScore(s => s + 1);
      speak(activeItem.word);
      setTimeout(() => {
        if (idx < list.length - 1) {
          setIdx(i => i + 1);
        } else {
          setDone(true);
        }
      }, 1500);
    } else {
      setIsCorrect(false);
    }
  }, [answer, activeItem, idx, list]);

  // Keyboard support
  useEffect(() => {
    if (done || !activeItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (key === 'BACKSPACE') {
        if (answer.length > 0) {
          removeChar(answer.length - 1);
        }
      } else if (key === 'ENTER') {
        if (answer.length === activeItem.word.length) {
          checkAnswer();
        }
      } else if (/^[A-Z]$/.test(key)) {
        const poolIdx = lettersPool.findIndex(l => l.char === key && !l.used);
        if (poolIdx !== -1) {
          selectChar(poolIdx);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lettersPool, answer, done, activeItem, selectChar, removeChar, checkAnswer]);

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-xl lg:max-w-4xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 sm:px-8 sm:py-5 border-b border-slate-100 bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-white">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5" /> Image Guessing
            </h2>
            <p className="text-amber-100 text-xs font-medium">Nhìn hình ảnh thực tế đoán từ vựng tiếng Anh tương ứng</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white"><X className="w-5 h-5" /></button>
        </div>

        {done ? (
          <div className="p-10 text-center space-y-6 animate-in zoom-in duration-500">
            <div className="text-6xl animate-bounce">🏆</div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800">Hoàn Thành Thử Thách!</h3>
            <p className="text-slate-500 font-medium text-sm sm:text-base">Bạn đã xuất sắc đoán đúng <strong className="text-amber-600 font-black">{score}/{list.length}</strong> từ vựng qua ảnh thực tế.</p>
            <div className="inline-block px-6 py-2 bg-amber-50 rounded-2xl border border-amber-150">
              <p className="text-amber-700 font-black text-2xl">+{score * 20} XP</p>
            </div>
            <div className="flex gap-4 justify-center">
              <button onClick={initGame} className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-amber-500/30 hover:opacity-90 active:scale-95 transition-all"><RotateCcw className="w-4 h-4" />Chơi Lại</button>
              <button onClick={onClose} className="px-8 py-3.5 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all">Quay Về</button>
            </div>
          </div>
        ) : activeItem ? (
          <div className="p-5 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
              
              {/* Left Column: Image Box & Hints */}
              <div className="space-y-4">
                <div className="w-full h-44 sm:h-52 lg:h-64 relative rounded-2xl overflow-hidden shadow-md border border-slate-150 bg-slate-50 flex items-center justify-center group">
                  {imgLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                      <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
                    </div>
                  )}
                  <img 
                    src={activeItem.imageUrl} 
                    alt="Guess the word" 
                    referrerPolicy="no-referrer"
                    onLoad={() => setImgLoading(false)}
                    className={cn(
                      "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105",
                      imgLoading ? "opacity-0" : "opacity-100"
                    )}
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-widest">
                    Round {idx + 1}/{list.length}
                  </div>
                </div>

                {/* Hint Alert Box */}
                {showHint ? (
                  <div className="p-4 bg-amber-50/80 border border-amber-100 rounded-2xl text-amber-900 text-xs sm:text-sm font-medium leading-relaxed animate-in slide-in-from-top-2 duration-300">
                    <span className="font-black block text-[10px] uppercase tracking-wider text-amber-600 mb-1">Gợi ý nghĩa từ vựng</span>
                    Nghĩa: <span className="font-bold text-amber-900">{activeItem.vi}</span> — {activeItem.hint}
                  </div>
                ) : (
                  <button 
                    onClick={() => setShowHint(true)}
                    className="w-full py-3 bg-amber-50 hover:bg-amber-100/70 border border-amber-100 rounded-2xl text-xs sm:text-sm font-black text-amber-700 hover:text-amber-800 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
                  >
                    <HelpCircle className="w-4 h-4" /> Bấm xem gợi ý tiếng Việt
                  </button>
                )}
              </div>

              {/* Right Column: Interaction, Slots & Letters */}
              <div className="space-y-6">
                {/* Answer Slots Display */}
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Từ cần tìm ({activeItem.word.length} chữ cái)</span>
                  <div className={cn(
                    "min-h-16 p-3 rounded-2xl border-2 border-dashed flex flex-wrap gap-2 items-center justify-center transition-all duration-300",
                    isCorrect === true ? "bg-green-50/80 border-green-400 shadow-inner animate-bounce" :
                      isCorrect === false ? "bg-red-50/80 border-red-400 animate-shake shadow-inner" :
                        "bg-slate-50 border-slate-200"
                  )}>
                    {Array.from({ length: activeItem.word.length }).map((_, charIdx) => {
                      const filled = answer[charIdx];
                      return (
                        <button
                          key={charIdx}
                          onClick={() => filled && removeChar(charIdx)}
                          className={cn(
                            "w-10 h-10 sm:w-11 sm:h-11 rounded-xl text-lg font-black flex items-center justify-center transition-all shadow-sm border-2 cursor-pointer",
                            filled 
                              ? "bg-slate-900 border-slate-800 text-white hover:scale-105 active:scale-95" 
                              : "bg-white border-slate-200 text-slate-300 cursor-default"
                          )}
                        >
                          {filled ? filled.char : ''}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Letters Pool Box */}
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Các chữ cái gợi ý</span>
                  <div className="grid grid-cols-6 gap-2 justify-center max-w-sm mx-auto lg:mx-0">
                    {lettersPool.map((item, poolIdx) => (
                      <button
                        key={poolIdx}
                        onClick={() => selectChar(poolIdx)}
                        disabled={item.used}
                        className={cn(
                          "w-11 h-11 sm:w-12 sm:h-12 rounded-xl text-base sm:text-lg font-black flex items-center justify-center border-2 transition-all cursor-pointer shadow-sm",
                          item.used
                            ? "bg-slate-100 border-slate-200 text-slate-300 scale-95 cursor-default"
                            : "bg-white border-amber-100 text-amber-800 hover:scale-110 hover:border-amber-300 hover:bg-amber-50/20 active:scale-90"
                        )}
                      >
                        {item.char}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
                  <button
                    onClick={resetItem}
                    className="px-4 py-2.5 border border-slate-200 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all flex items-center gap-1.5 text-slate-500 cursor-pointer active:scale-95"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Xóa Tất Cả
                  </button>
                  <button
                    onClick={checkAnswer}
                    disabled={answer.length !== activeItem.word.length}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold text-xs hover:opacity-95 transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-amber-500/20 active:scale-95"
                  >
                    Kiểm Tra <Play className="w-3 h-3 fill-white text-white" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500">Đang chuẩn bị...</div>
        )}
      </div>
    </div>
  );
}

// ─── Word Hunter Game (Hangman) ──────────────────────────────────────────────────
function WordHunterGame({ 
  dbWords, 
  category, 
  onClose, 
  awardXp, 
  onSaveWord, 
  savedWords, 
  savingWord 
}: { 
  dbWords: any[]; 
  category: string; 
  onClose: () => void; 
  awardXp?: (amount: number, reason: string) => void; 
  onSaveWord: (word: any) => void; 
  savedWords: Record<string, boolean>; 
  savingWord: string | null; 
}) {
  const [wordList, setWordList] = useState<any[]>([]);
  const [wordIdx, setWordIdx] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongCount, setWrongCount] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [roundResult, setRoundResult] = useState<'win' | 'lose' | null>(null);
  const [sessionWords, setSessionWords] = useState<any[]>([]);
  const MAX_WRONG = 6;
  const TOTAL_WORDS = 8;

  const initGame = useCallback(() => {
    let pool: any[] = [];
    if (dbWords && dbWords.length >= TOTAL_WORDS) {
      pool = shuffle(dbWords).slice(0, TOTAL_WORDS);
    } else {
      pool = shuffle(STATIC_SCRAMBLE_WORDS).slice(0, TOTAL_WORDS).map(s => ({
        word: s.word.charAt(0) + s.word.slice(1).toLowerCase(),
        meaningVi: s.hint,
        meaningEn: s.word,
        wordType: 'Noun',
        phonetic: ''
      }));
    }
    setSessionWords(pool);
    setWordList(pool);
    setWordIdx(0);
    setGuessedLetters(new Set());
    setWrongCount(0);
    setScore(0);
    setDone(false);
    setRoundResult(null);
  }, [dbWords]);

  useEffect(() => { initGame(); }, [initGame]);

  const currentWord = wordList[wordIdx];
  const targetWord = currentWord?.word?.toUpperCase() || '';
  const isWordComplete = targetWord.split('').every((ch: string) => guessedLetters.has(ch) || !/[A-Z]/.test(ch));

  useEffect(() => {
    if (!currentWord || done) return;
    if (isWordComplete) {
      setRoundResult('win');
      setScore(s => s + 1);
      speak(currentWord.word);
      setTimeout(nextWord, 2000);
    } else if (wrongCount >= MAX_WRONG) {
      setRoundResult('lose');
      setTimeout(nextWord, 2500);
    }
  }, [guessedLetters, wrongCount]);

  const nextWord = () => {
    if (wordIdx < wordList.length - 1) {
      setWordIdx(i => i + 1);
      setGuessedLetters(new Set());
      setWrongCount(0);
      setRoundResult(null);
    } else {
      setDone(true);
      if (score > 0) awardXp?.(score * 15, 'Word Hunter Game');
    }
  };

  const guessLetter = (letter: string) => {
    if (guessedLetters.has(letter) || roundResult) return;
    const next = new Set(guessedLetters);
    next.add(letter);
    setGuessedLetters(next);
    if (!targetWord.includes(letter)) setWrongCount(c => c + 1);
  };

  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-gradient-to-r from-rose-600 to-red-600 text-white">
          <div>
            <h2 className="text-xl font-black text-white">Word Hunter</h2>
            <p className="text-rose-200 text-xs font-medium">Đoán từ ẩn - {wordIdx + 1}/{wordList.length} (Danh mục: {getCategoryLabel(category)})</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-black">❤️ {MAX_WRONG - wrongCount}/{MAX_WRONG}</span>
            <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white"><X className="w-5 h-5" /></button>
          </div>
        </div>

        {done ? (
          <div className="p-10 text-center space-y-5 animate-in zoom-in duration-500 max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="text-5xl">{score >= 6 ? '🏆' : score >= 4 ? '🎉' : '📚'}</div>
            <h3 className="text-2xl font-black text-slate-800">Hoàn Thành Word Hunter!</h3>
            <p className="text-slate-500 font-medium">Bạn đã đoán đúng {score}/{wordList.length} từ vựng.</p>
            <p className="text-green-600 font-black">+{score * 15} XP</p>
            <div className="flex gap-3 justify-center">
              <button onClick={initGame} className="px-6 py-3 bg-rose-600 text-white rounded-2xl font-bold flex items-center gap-1 shadow-lg shadow-rose-600/30 cursor-pointer"><RotateCcw className="w-4 h-4" />Chơi Lại</button>
              <button onClick={onClose} className="px-6 py-3 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all">Quay Về</button>
            </div>
            <GameVocabularyRecap words={sessionWords} onSaveWord={onSaveWord} savedWords={savedWords} savingWord={savingWord} />
          </div>
        ) : currentWord ? (
          <div className="p-8 space-y-6">
            <div className="p-3 bg-rose-50 border border-rose-100 rounded-2xl text-rose-800 text-sm font-medium">
              <span className="font-bold block text-xs uppercase tracking-wider text-rose-600 mb-1">Gợi ý</span>
              {currentWord.meaningVi} {currentWord.wordType && <span className="text-rose-400">({currentWord.wordType})</span>}
            </div>
            <div className="flex justify-center gap-2 flex-wrap">
              {targetWord.split('').map((ch: string, i: number) => (
                <div key={i} className={cn("w-10 h-12 rounded-xl border-2 flex items-center justify-center text-xl font-black transition-all duration-300", /[A-Z]/.test(ch) ? (guessedLetters.has(ch) ? (roundResult === 'lose' && !guessedLetters.has(ch) ? 'bg-red-50 border-red-300 text-red-600' : 'bg-green-50 border-green-300 text-green-700 scale-105') : 'bg-slate-100 border-slate-200 text-transparent') : 'bg-transparent border-transparent text-slate-400')}>
                  {/[A-Z]/.test(ch) ? (guessedLetters.has(ch) || roundResult === 'lose' ? ch : '_') : ch}
                </div>
              ))}
            </div>
            {roundResult && (
              <div className={cn("text-center py-2 rounded-xl font-bold text-sm animate-in zoom-in", roundResult === 'win' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700')}>
                {roundResult === 'win' ? '✅ Chính xác!' : `❌ Đáp án: ${targetWord}`}
              </div>
            )}
            <div className="grid grid-cols-9 gap-1.5">
              {ALPHABET.map(letter => {
                const isGuessed = guessedLetters.has(letter);
                const isInWord = targetWord.includes(letter);
                return (
                  <button key={letter} onClick={() => guessLetter(letter)} disabled={isGuessed || !!roundResult} className={cn("h-9 rounded-lg text-xs font-black transition-all border cursor-pointer", isGuessed ? (isInWord ? 'bg-green-100 border-green-300 text-green-700' : 'bg-red-50 border-red-200 text-red-400 opacity-50') : 'bg-white border-slate-200 text-slate-700 hover:bg-indigo-50 hover:border-indigo-300 hover:scale-110 active:scale-90')}>
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500">Đang chuẩn bị...</div>
        )}
      </div>
    </div>
  );
}


// ─── Main Games Page ───────────────────────────────────────────────────────────
const getGameIcon = (id: string) => {
  switch (id) {
    case 'vocab': return <Target className="w-10 h-10" />;
    case 'quiz': return <Timer className="w-10 h-10" />;
    case 'scram': return <Brain className="w-10 h-10" />;
    case 'wordHunter': return <Target className="w-10 h-10" />;
    case 'imageGuess': return <ImageIcon className="w-10 h-10" />;
    case 'sentence': return <Zap className="w-10 h-10" />;
    case 'idiom': return <Sparkles className="w-10 h-10" />;
    default: return <Gamepad2 className="w-10 h-10" />;
  }
};

export default function GamesPage() {
  const { user } = useAuth();
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'oxford' | 'toeic' | 'ielts' | 'notebook'>('all');
  const [dbWords, setDbWords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [rank, setRank] = useState<string>('#-');
  const [xp, setXp] = useState<string>('0');
  const [savingWord, setSavingWord] = useState<string | null>(null);
  const [savedWords, setSavedWords] = useState<Record<string, boolean>>({});

  const handleSaveToNotebook = async (word: any) => {
    if (!user) return;
    setSavingWord(word.word);
    try {
      const token = await user.getIdToken();
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      await fetch(`${API_BASE}/vocabulary/notebook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          word: word.word,
          meaningVi: word.meaningVi,
          meaningEn: word.meaningEn || word.word,
          wordType: word.wordType || '',
          phonetic: word.phonetic || ''
        })
      });
      setSavedWords(prev => ({ ...prev, [word.word.toLowerCase()]: true }));
    } catch (err) {
      console.error('Save to notebook failed:', err);
    } finally {
      setSavingWord(null);
    }
  };

  const handleAwardXp = async (amount: number, reason: string) => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_BASE}/users/add-xp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ xpToAdd: amount, reason })
      });
      if (res.ok) {
        console.log(`Successfully awarded ${amount} XP for ${reason}`);
      }
    } catch (err) {
      console.error('Failed to award XP:', err);
    }
  };

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        setLoading(true);
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const token = user ? await user.getIdToken() : '';
        const headers: Record<string, string> = {
          'Content-Type': 'application/json'
        };
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(`${API_BASE}/vocabulary/game-data?limit=40&category=${selectedCategory}`, {
          headers
        });
        if (res.ok) {
          const data = await res.json();
          if (data.words) {
            setDbWords(data.words);
          }
        }
      } catch (err) {
        console.error('Failed to load dynamic game vocabulary words:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, [selectedCategory, user]);

  useEffect(() => {
    const fetchUserRank = async () => {
      if (!user) return;
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const token = await user.getIdToken();
        const res = await fetch(`${API_BASE}/users/leaderboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const dbUsers: any[] = await res.json();
          const sorted = [...dbUsers].sort((a, b) => b.xp - a.xp);
          const myIndex = sorted.findIndex(u => u.id === user.uid || u.email === user.email);
          const myUser = sorted[myIndex];
          if (myIndex !== -1 && myUser) {
            setRank(`#${myIndex + 1}`);
            setXp(myUser.xp.toLocaleString());
          }
        }
      } catch (err) {
        console.error('Failed to fetch user rank on games page:', err);
      }
    };

    fetchUserRank();
  }, [user]);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {activeGame === 'vocab' && <VocabMatchGame dbWords={dbWords} category={selectedCategory} onClose={() => setActiveGame(null)} awardXp={handleAwardXp} onSaveWord={handleSaveToNotebook} savedWords={savedWords} savingWord={savingWord} />}
      {activeGame === 'quiz' && <SpeedQuizGame dbWords={dbWords} category={selectedCategory} onClose={() => setActiveGame(null)} awardXp={handleAwardXp} onSaveWord={handleSaveToNotebook} savedWords={savedWords} savingWord={savingWord} />}
      {activeGame === 'scram' && <WordScrambleGame dbWords={dbWords} category={selectedCategory} onClose={() => setActiveGame(null)} awardXp={handleAwardXp} onSaveWord={handleSaveToNotebook} savedWords={savedWords} savingWord={savingWord} />}
      {activeGame === 'imageGuess' && <ImageGuessGame onClose={() => setActiveGame(null)} awardXp={handleAwardXp} />}
      {activeGame === 'sentence' && <SentenceBuilderGame dbWords={dbWords} category={selectedCategory} onClose={() => setActiveGame(null)} awardXp={handleAwardXp} onSaveWord={handleSaveToNotebook} savedWords={savedWords} savingWord={savingWord} />}
      {activeGame === 'idiom' && <IdiomConnectorGame onClose={() => setActiveGame(null)} awardXp={handleAwardXp} />}
      {activeGame === 'wordHunter' && <WordHunterGame dbWords={dbWords} category={selectedCategory} onClose={() => setActiveGame(null)} awardXp={handleAwardXp} onSaveWord={handleSaveToNotebook} savedWords={savedWords} savingWord={savingWord} />}

      <header className="text-center space-y-4">
        <div className="inline-flex p-3 bg-indigo-100 rounded-2xl text-indigo-600 mb-2"><Gamepad2 className="w-8 h-8" /></div>
        <h1 className="text-4xl font-black tracking-tight">Quiz & Games</h1>
        <p className="text-slate-500 max-w-lg mx-auto font-medium">Học mà chơi, chơi mà học. Tích lũy điểm kinh nghiệm XP, vượt qua các thử thách ghép câu và từ vựng thú vị!</p>

        {loading && (
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400">
            <Loader2 className="w-4 h-4 animate-spin text-primary" /> Đang tối ưu hóa và đồng bộ kho từ vựng động...
          </div>
        )}
      </header>

      {/* Hero Banner */}
      <section className="relative overflow-hidden premium-card bg-slate-900 text-white p-8 md:p-12 rounded-[40px]">
        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 text-white"><Trophy className="w-64 h-64" /></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-black uppercase tracking-widest">
              <Flame className="w-3 h-3 fill-primary" /> Sự kiện tuần này
            </div>
            <h2 className="text-4xl font-black leading-tight text-white">Đại Lộ Ngữ Pháp Grand Prix</h2>
            <p className="text-slate-400 text-lg">So tài cùng hơn 5,000 học viên khác. Đạt top 3 để giành huy hiệu độc quyền!</p>
            <div className="flex items-center gap-4">
              <button className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-lg hover:opacity-90 transition-all shadow-xl shadow-primary/40 cursor-pointer">Tham gia ngay</button>
              <div><p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Kết thúc sau</p><p className="text-xl font-black text-white">04:22:15</p></div>
            </div>
          </div>
          <div className="hidden md:flex gap-4 ml-auto">
            <div className="p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 text-center min-w-[120px]">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hạng của bạn</p>
              <p className="text-2xl font-black mt-1 text-white">{rank}</p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 text-center min-w-[120px]">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tích lũy XP</p>
              <p className="text-2xl font-black mt-1 text-white">{xp}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Selector */}
      <section className="flex flex-col items-center gap-4">
        <p className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Brain className="w-4 h-4 text-primary animate-pulse" /> Chọn danh mục từ vựng học tập:
        </p>
        <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl gap-2 border border-slate-200/50 dark:border-slate-800 shadow-sm max-w-2xl w-full overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: '🌐 Tất cả', desc: 'Từ ngẫu nhiên' },
            { id: 'oxford', label: '📖 Oxford', desc: 'Từ thông dụng' },
            { id: 'toeic', label: '💼 TOEIC', desc: 'Từ công sở' },
            { id: 'ielts', label: '🎓 IELTS', desc: 'Từ học thuật' },
            { id: 'notebook', label: '📓 Sổ tay', desc: 'Từ đã lưu' },
          ].map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={cn(
                  "flex-1 py-2 px-3 text-center rounded-xl transition-all cursor-pointer whitespace-nowrap min-w-[100px]",
                  isActive
                    ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-sm border border-slate-200/20 font-black"
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-bold"
                )}
              >
                <div className="text-xs">{cat.label}</div>
                <div className="text-[9px] font-medium opacity-60 mt-0.5">{cat.desc}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Vocabulary Preview Panel */}
      <section className="mx-auto max-w-4xl w-full px-6 py-5 bg-slate-50/50 dark:bg-slate-850/20 border border-slate-100 dark:border-slate-800/60 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500/20" /> 
            Từ vựng chuẩn bị ôn tập ({dbWords.length} từ)
          </h3>
          <span className="text-[10px] font-bold text-slate-450 dark:text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-full">
            {getCategoryLabel(selectedCategory)}
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/60 animate-pulse space-y-2">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : dbWords.length === 0 ? (
          <div className="p-6 text-center text-slate-500 text-xs font-semibold">
            {selectedCategory === 'notebook' 
              ? 'Sổ tay của bạn hiện đang trống. Hãy quay lại trang Từ Điển hoặc Chat để lưu thêm từ vựng!'
              : 'Không tìm thấy từ vựng nào thuộc danh mục này.'}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 overflow-x-auto no-scrollbar py-0.5">
            {dbWords.slice(0, 4).map((w, idx) => (
              <div 
                key={w.id || idx} 
                className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/80 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="font-black text-slate-800 dark:text-slate-100 text-sm truncate">{w.word}</span>
                    {w.cefrLevel && (
                      <span className="text-[9px] font-black px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-md">
                        {w.cefrLevel}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 dark:text-slate-555 mt-0.5">
                    {w.wordType && `[${w.wordType}]`} {w.phonetic || ''}
                  </div>
                </div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-455 border-t border-slate-100 dark:border-slate-800/50 mt-2.5 pt-2.5 line-clamp-1">
                  {w.meaningVi}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Game Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GAME_CATALOG_DATA.map((game) => (
          <div
            key={game.id}
            className="premium-card p-1 group cursor-pointer hover:shadow-2xl transition-all duration-500"
            onClick={() => setActiveGame(game.id)}
          >
            <div className="bg-white rounded-[22px] p-6 flex items-start gap-6 h-full">
              <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center text-white flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6", game.color, game.shadow)}>
                {getGameIcon(game.id)}
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-800">{game.title}</h3>
                  <span className="text-xs font-black text-green-500">{game.xp}</span>
                </div>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{game.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{game.players}</span>
                  <button className="flex items-center gap-1 text-sm font-black transition-all text-primary group-hover:translate-x-1 cursor-pointer">
                    {['vocab', 'quiz', 'scram', 'sentence'].includes(game.id)
                      ? `Chơi (${getCategoryLabel(selectedCategory)})`
                      : 'Chơi Ngay'} 
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Achievements */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 premium-card p-8 bg-slate-50 border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800"><Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />Huy Hiệu Trò Chơi</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[{ label: 'Sát Thủ Tốc Độ', value: 'Cấp 4', icon: '⚡' }, { label: 'Vua Chính Tả', value: 'Cấp 2', icon: '👑' }, { label: 'Ghép Cặp Tài Ba', value: 'Cấp 5', icon: '🤝' }, { label: 'Cao Thủ Ngữ Pháp', value: 'Cấp 1', icon: '🎓' }].map((b, i) => (
              <div key={i} className="text-center space-y-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-3xl">{b.icon}</div>
                <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{b.label}</p><p className="font-bold text-slate-800">{b.value}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="premium-card p-8 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2 text-white"><Sparkles className="w-5 h-5 text-yellow-400 fill-yellow-400" />Vòng Quay May Mắn</h3>
            <p className="text-indigo-100 text-sm leading-relaxed font-medium">Hôm nay bạn có <span className="font-bold text-white">1 lượt quay miễn phí</span>. Hãy thử vận may nhận XP và quà tặng!</p>
            <button className="w-full py-4 bg-yellow-400 text-indigo-900 rounded-2xl font-black text-lg hover:bg-yellow-300 transition-all shadow-xl cursor-pointer">Quay Ngay</button>
          </div>
          <Gamepad2 className="absolute -right-6 -bottom-6 w-32 h-32 text-white/10 opacity-20 rotate-12" />
        </div>
      </section>
    </div>
  );
}
