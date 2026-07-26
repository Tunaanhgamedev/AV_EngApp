'use client';

import React from 'react';
import { Brain, Volume2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const speak = (text: string) => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  u.rate = 0.8;
  const voices = window.speechSynthesis.getVoices();
  const v = voices.find(v => v.lang === 'en-US' && v.name.includes('Google')) || voices.find(v => v.lang === 'en-US');
  if (v) u.voice = v;
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    setTimeout(() => window.speechSynthesis.speak(u), 50);
  } else {
    window.speechSynthesis.speak(u);
  }
};

export const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

export const getCategoryLabel = (cat: string) => {
  switch (cat) {
    case 'oxford': return 'Oxford 3000';
    case 'toeic': return 'TOEIC (Công sở)';
    case 'ielts': return 'IELTS (Học thuật)';
    case 'notebook': return 'Sổ tay của tôi';
    default: return 'Tất cả từ vựng';
  }
};

export interface Card {
  id: number;
  word: string;
  type: 'en' | 'vi';
  pairId: number;
  matched: boolean;
}

export interface GameComponentProps {
  dbWords: any[];
  category: string;
  onClose: () => void;
  awardXp?: (amount: number, reason: string) => void;
  onSaveWord: (word: any) => void;
  savedWords: Record<string, boolean>;
  savingWord: string | null;
}

export interface SimpleGameProps {
  onClose: () => void;
  awardXp?: (amount: number, reason: string) => void;
}

export function GameVocabularyRecap({ words, onSaveWord, savedWords, savingWord }: { words: any[]; onSaveWord: (word: any) => void; savedWords: Record<string, boolean>; savingWord: string | null; }) {
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
