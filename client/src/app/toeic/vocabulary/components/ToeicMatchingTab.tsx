'use client';

import React, { useState, useEffect } from 'react';
import { RotateCcw, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TOEICList } from '@/data/toeicVocab';
import { MatchCard, speakWord } from './shared';

interface Props {
  selectedList: TOEICList;
}

export default function ToeicMatchingTab({ selectedList }: Props) {
  const [matchingCards, setMatchingCards] = useState<MatchCard[]>([]);
  const [selectedMatchCard, setSelectedMatchCard] = useState<MatchCard | null>(null);
  const [matchTries, setMatchTries] = useState(0);
  const [matchCompleted, setMatchCompleted] = useState(false);

  useEffect(() => {
    setupMatchingGame(selectedList);
  }, [selectedList]);

  const setupMatchingGame = (list: TOEICList) => {
    setSelectedMatchCard(null);
    setMatchTries(0);
    setMatchCompleted(false);

    const shuffledWords = [...list.words].sort(() => 0.5 - Math.random()).slice(0, 6);
    const cards: MatchCard[] = [];

    shuffledWords.forEach(w => {
      cards.push({
        id: `word_${w.id}`,
        text: w.word,
        type: 'word',
        wordId: w.id,
        isMatched: false,
        isSelected: false,
      });
      cards.push({
        id: `meaning_${w.id}`,
        text: w.meaningVi,
        type: 'meaning',
        wordId: w.id,
        isMatched: false,
        isSelected: false,
      });
    });

    setMatchingCards(cards.sort(() => 0.5 - Math.random()));
  };

  const handleMatchCardClick = (card: MatchCard) => {
    if (card.isMatched || card.isSelected) return;

    if (!selectedMatchCard) {
      setSelectedMatchCard(card);
      setMatchingCards(prev => prev.map(c => c.id === card.id ? { ...c, isSelected: true } : c));
      if (card.type === 'word') speakWord(card.text);
      return;
    }

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

    setMatchTries(prev => prev + 1);
    const isCorrectMatch = selectedMatchCard.wordId === card.wordId;

    if (isCorrectMatch) {
      setMatchingCards(prev => prev.map(c => 
        (c.id === selectedMatchCard.id || c.id === card.id) 
          ? { ...c, isMatched: true, isSelected: false } 
          : c
      ));
      setSelectedMatchCard(null);
      speakWord(selectedMatchCard.type === 'word' ? selectedMatchCard.text : card.text);

      setTimeout(() => {
        setMatchingCards(curr => {
          const allMatched = curr.every(c => c.isMatched);
          if (allMatched) setMatchCompleted(true);
          return curr;
        });
      }, 300);
    } else {
      setMatchingCards(prev => prev.map(c => c.id === card.id ? { ...c, isSelected: true } : c));
      setTimeout(() => {
        setMatchingCards(prev => prev.map(c => ({ ...c, isSelected: false })));
        setSelectedMatchCard(null);
      }, 500);
    }
  };

  return (
    <div className="premium-card p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl rounded-3xl space-y-4">
      <div className="flex justify-between items-center border-b border-slate-50 dark:border-slate-800 pb-2">
        <div>
          <h3 className="font-black text-sm text-slate-800 dark:text-slate-100">Ghép Cặp Thẻ Từ</h3>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">Ghép thẻ tiếng Anh tương ứng với nghĩa tiếng Việt.</p>
        </div>
        <div className="text-right">
          <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Lượt thử</span>
          <span className="text-xs font-black text-slate-700 dark:text-slate-300">{matchTries} lần</span>
        </div>
      </div>

      {!matchCompleted ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 landscape:grid-cols-4 gap-2.5">
          {matchingCards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleMatchCardClick(card)}
              className={cn(
                "h-20 sm:h-24 landscape:h-12 px-2.5 rounded-xl border-2 text-xs font-black transition-all flex items-center justify-center text-center leading-tight cursor-pointer select-none",
                card.isMatched 
                  ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-250 text-emerald-800 dark:text-emerald-400 opacity-0 pointer-events-none scale-90 duration-300"
                  : card.isSelected
                    ? "bg-primary border-primary text-white scale-[1.02] shadow-sm"
                    : card.type === 'word'
                      ? "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-850 dark:text-slate-200 hover:border-primary/50"
                      : "bg-orange-50/50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-800/50 text-orange-950 dark:text-orange-200 hover:border-primary/50"
              )}
            >
              {card.text}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-6 space-y-4 animate-in zoom-in-95 duration-500">
          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-white shadow-md">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-base text-slate-850 dark:text-slate-100">Chơi Xong Rồi!</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">Bạn đã hoàn thành sau <span className="font-black text-primary">{matchTries} lượt thử</span>.</p>
          </div>
          <button
            onClick={() => setupMatchingGame(selectedList)}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Chơi Lại
          </button>
        </div>
      )}
    </div>
  );
}
