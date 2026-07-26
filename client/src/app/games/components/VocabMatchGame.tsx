'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { X, CheckCircle2, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { STATIC_WORD_PAIRS } from '@/data/games/gameData';
import { speak, shuffle, getCategoryLabel, GameVocabularyRecap, Card, GameComponentProps } from './shared';

export default function VocabMatchGame({ dbWords, category, onClose, awardXp, onSaveWord, savedWords, savingWord }: GameComponentProps) {
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
