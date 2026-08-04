'use client';

import React from 'react';
import { BookOpen, Play } from 'lucide-react';
import { ALPHABET } from '../../phonicsData';
import { speak } from '../../utils/pronunciationUtils';

export default function AlphabetTab() {
  return (
    <div className="space-y-6">
      <div className="premium-card p-6 bg-gradient-to-r from-blue-50 dark:from-blue-950/30 to-indigo-50 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-black text-blue-800 flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Bảng Chữ Cái Tiếng Anh & Phonics
        </h3>
        <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed font-medium">
          Bảng chữ cái tiếng Anh gồm 26 chữ cái. Mỗi chữ cái có một **Tên gọi (Name)** và một hoặc nhiều **Âm phát âm (Phonics)** khi ghép vào từ. Nhấp vào mỗi thẻ để nghe cách đọc tên chữ cái và cách phát âm Phonics của nó.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {ALPHABET.map((item) => (
          <div
            key={item.letter}
            className="premium-card bg-white dark:bg-slate-900 p-5 border border-slate-200 dark:border-slate-800 rounded-[2rem] flex flex-col items-center justify-between text-center relative overflow-hidden group hover:shadow-xl transition-all duration-300"
          >
            <span className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-2">{item.letter}</span>

            <div className="space-y-2 w-full">
              <div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block uppercase tracking-wider font-sans">Tên chữ cái</span>
                <button
                  onClick={() => speak(item.letter, 0.6)}
                  className="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-800 rounded-full text-blue-700 dark:text-blue-400 font-black text-xs hover:bg-blue-100 transition-all flex items-center gap-1 mx-auto cursor-pointer"
                >
                  /{item.name}/ <Play className="w-2.5 h-2.5 fill-blue-700 dark:fill-blue-400 text-blue-700 dark:text-blue-400" />
                </button>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-2">
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block uppercase tracking-wider font-sans">Âm vị (Phonics)</span>
                <button
                  onClick={() => speak(item.example, 0.6)}
                  className="px-2 py-1 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-800 rounded-full text-emerald-700 dark:text-emerald-400 font-bold text-[10px] hover:bg-emerald-100 transition-all flex items-center gap-1 mx-auto cursor-pointer"
                >
                  {item.phonicIpa} {item.example} <Play className="w-2.5 h-2.5 fill-emerald-700 dark:fill-emerald-400 text-emerald-700 dark:text-emerald-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
