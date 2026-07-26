import React from 'react';
import { BrainCircuit, ChevronRight } from 'lucide-react';

interface Level {
  level: string;
  label: string;
  desc: string;
  color: string;
  difficulty: string;
  words: string;
}

interface LevelSelectorProps {
  levels: Level[];
  onSelectLevel: (level: string) => void;
}

export default function LevelSelector({ levels, onSelectLevel }: LevelSelectorProps) {
  return (
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
            onClick={() => onSelectLevel(l.level)}
            className="bg-white dark:bg-slate-950 rounded-[2rem] p-6 border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-600 dark:hover:border-blue-400 flex flex-col items-start gap-4 hover:shadow-xl transition-all group text-left relative overflow-hidden cursor-pointer w-full"
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
  );
}
