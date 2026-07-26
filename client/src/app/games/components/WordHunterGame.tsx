'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { X, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { STATIC_SCRAMBLE_WORDS } from '@/data/games/gameData';
import { speak, shuffle, getCategoryLabel, GameVocabularyRecap, GameComponentProps } from './shared';

export default function WordHunterGame({ 
  dbWords, 
  category, 
  onClose, 
  awardXp, 
  onSaveWord, 
  savedWords, 
  savingWord 
}: GameComponentProps) {
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
