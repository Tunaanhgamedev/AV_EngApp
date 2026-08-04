'use client';

import React, { useState } from 'react';
import { MessageSquare, Volume2, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TOPIC_LESSONS } from '../../phonicsData';
import { speak } from '../../utils/pronunciationUtils';
import SpeechPracticeSection from '../shared/SpeechPracticeSection';

export default function TopicsTab() {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(TOPIC_LESSONS[0]?.id || 'greetings');
  const currentTopic = TOPIC_LESSONS.find(t => t.id === selectedTopicId) || TOPIC_LESSONS[0];

  return (
      
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-in fade-in duration-500 text-left">
          {/* Sidebar / Left Column: Topics List */}
          <div className="md:col-span-4 space-y-3">
            <div className="premium-card p-5 bg-gradient-to-r from-violet-50 dark:from-violet-950/30 to-indigo-50 dark:to-indigo-950/30 border-violet-100 dark:border-violet-800 mb-2">
              <h3 className="text-sm font-black text-violet-850 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-violet-600 dark:text-violet-400" /> Học theo Chủ đề
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Chọn chủ đề bên dưới để luyện phát âm và thực hành nói các mẫu câu giao tiếp thông dụng.
              </p>
            </div>

            <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-2 pb-2 md:pb-0 no-scrollbar">
              {TOPIC_LESSONS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTopicId(t.id)}
                  className={cn(
                    "flex-shrink-0 text-left p-2.5 md:p-4 rounded-xl md:rounded-2xl border-2 transition-all cursor-pointer w-auto md:w-full relative overflow-hidden",
                    selectedTopicId === t.id
                      ? "border-violet-600 bg-violet-50/40 shadow-md shadow-violet-500/5"
                      : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 hover:shadow-sm"
                  )}
                >
                  {selectedTopicId === t.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-violet-600 rounded-r-md hidden md:block" />
                  )}
                  <h4 className={cn("text-xs md:text-sm font-bold text-slate-800 dark:text-slate-100 transition-colors pl-1 whitespace-nowrap md:whitespace-normal", selectedTopicId === t.id && "text-violet-750 font-black")}>{t.title}</h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 pl-1 font-medium line-clamp-1 hidden md:block">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Selected Topic's Phrases */}
          <div className="md:col-span-8 space-y-4">
            {TOPIC_LESSONS.map(t => {
              if (t.id !== selectedTopicId) return null;
              return (
                <div key={t.id} className="space-y-4">
                  <div className="p-6 premium-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">{t.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">{t.desc}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {t.phrases.map((phrase, idx) => (
                      <div
                        key={idx}
                        className="premium-card p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-violet-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
                      >
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="text-left">
                            <span className="text-[9px] font-black text-violet-600 dark:text-violet-400 uppercase tracking-widest block mb-1">Mẫu câu #{idx + 1}</span>
                            <h4 className="text-base font-black text-slate-850 dark:text-slate-100">{phrase.text}</h4>
                            <p className="text-xs font-mono text-slate-400 dark:text-slate-500 font-medium mt-1">{phrase.ipa}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-2">💡 {phrase.vi}</p>
                          </div>

                          <button
                            onClick={() => speak(phrase.text)}
                            className="w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-800 hover:bg-violet-500 text-slate-400 dark:text-slate-500 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-slate-100 dark:border-slate-800 flex-shrink-0"
                            title="Nghe phát âm chuẩn"
                          >
                            <Play className="w-4 h-4 fill-current" />
                          </button>
                        </div>

                        {/* Interactive Speech Practice block */}
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                          <SpeechPracticeSection targetWord={phrase.text} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        );
}
