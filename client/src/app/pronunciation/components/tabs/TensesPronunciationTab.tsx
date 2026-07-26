'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Clock, BookOpen, ChevronRight, CheckCircle2, XCircle, Trophy, Star, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FOUNDATION_TOPICS } from '../../grammarData';
import { speak } from '../../utils/pronunciationUtils';

export default function TensesPronunciationTab() {
  const [tenseTopicId, setTenseTopicId] = useState<string>(FOUNDATION_TOPICS[0]?.id || 'pronouns');
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState<any[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const currentTopic = FOUNDATION_TOPICS.find(t => t.id === tenseTopicId) || FOUNDATION_TOPICS[0];

  const generateQuiz = () => {
    const pool = [
      { q: "Chủ ngữ 'She' đi với động từ to be nào ở hiện tại đơn?", options: ["am", "is", "are"], answer: 1 },
      { q: "Động từ 'go' ở quá khứ đơn (V2) chia là gì?", options: ["goed", "went", "gone"], answer: 1 },
      { q: "Thì hiện tại hoàn thành sử dụng cấu trúc nào?", options: ["S + V2", "S + am/is/are + V-ing", "S + have/has + V3"], answer: 2 },
      { q: "Từ chỉ thời gian 'yesterday' là dấu hiệu nhận biết thì nào?", options: ["Quá khứ đơn", "Hiện tại đơn", "Tương lai đơn"], answer: 0 },
      { q: "Với chủ ngữ 'They', thì hiện tại đơn của động từ thường V1 sẽ giữ nguyên hay thêm -s/-es?", options: ["Giữ nguyên V1", "Thêm -s/-es", "Thêm -ed"], answer: 0 }
    ];
    setCurrentQuizQuestions(pool);
    setUserAnswers({});
    setQuizSubmitted(false);
    setScore(0);
    setQuizStarted(true);
  };

  const handleSelectAnswer = (qIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    let s = 0;
    currentQuizQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) s++;
    });
    setScore(s);
    setQuizSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar Menu */}
        <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 scrollbar-thin scrollbar-thumb-slate-200">
          {FOUNDATION_TOPICS.map((topic: any) => {
            const isSelected = tenseTopicId === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => setTenseTopicId(topic.id)}
                className={cn(
                  "flex-shrink-0 lg:flex-shrink w-72 lg:w-full premium-card p-5 border text-left flex items-start gap-4 transition-all hover:-translate-y-0.5 cursor-pointer",
                  isSelected
                    ? "bg-slate-900 border-slate-950 text-white shadow-lg"
                    : "bg-white border-slate-200 hover:border-slate-300 text-slate-800"
                )}
              >
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-wider block mb-1 opacity-70">
                    {topic.category || 'Ngữ pháp cơ bản'}
                  </span>
                  <h4 className="font-extrabold text-sm leading-snug truncate">{topic.title}</h4>
                  <p className="text-[11px] opacity-80 mt-1 line-clamp-2 leading-relaxed">{topic.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Content Column */}
        <div className="lg:col-span-8 space-y-6">
          {currentTopic && (
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-3xl space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full">
                  Chủ đề đang chọn
                </span>
                <h3 className="text-xl font-black text-slate-900">{currentTopic.title}</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">{currentTopic.desc}</p>
              </div>

              {/* Theory Content */}
              {((currentTopic as any).details || (currentTopic as any).content?.theory) && (
                <div className="p-6 bg-white border border-slate-200 rounded-3xl space-y-4">
                  <h4 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-600" /> Lý thuyết trọng tâm
                  </h4>
                  <div className="text-xs text-slate-600 leading-relaxed space-y-3 font-medium">
                    {Array.isArray((currentTopic as any).details)
                      ? (currentTopic as any).details.map((paragraph: string, idx: number) => (
                          <p key={idx}>{paragraph}</p>
                        ))
                      : <p>{(currentTopic as any).content?.theory}</p>}
                  </div>
                </div>
              )}

              {/* Examples */}
              {((currentTopic as any).examples || (currentTopic as any).content?.table) && (
                <div className="p-6 bg-white border border-slate-200 rounded-3xl space-y-4">
                  <h4 className="font-extrabold text-sm text-slate-800">Ví dụ minh họa & Phát âm</h4>
                    {((currentTopic as any).examples || (currentTopic as any).content?.table || []).map((ex: any, idx: number) => {
                      const enText = ex.en || ex.example || ex.pronoun;
                      const viText = ex.vi || ex.meaning || ex.role;
                      return (
                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl text-xs font-semibold">
                          <div>
                            <span className="text-slate-800 font-bold">{enText}</span>
                            <p className="text-[10px] text-slate-500 font-medium">{viText}</p>
                          </div>
                          <button
                            onClick={() => speak(enText)}
                            className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-600 hover:text-white transition-all text-[10px] font-bold cursor-pointer"
                          >
                            Nghe phát âm
                          </button>
                        </div>
                      );
                    })}
                  </div>
              )}

              {/* Practice Quiz */}
              {!quizStarted ? (
                <div className="p-6 bg-slate-900 text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-extrabold text-sm text-white">Luyện tập Trắc nghiệm Thì & Cấu trúc</h4>
                    <p className="text-xs text-slate-400 font-medium mt-1">Làm bài quiz 5 câu ngẫu nhiên để kiểm tra mức độ ghi nhớ.</p>
                  </div>
                  <button
                    onClick={generateQuiz}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-2xl shadow-md transition-all shrink-0 cursor-pointer"
                  >
                    Bắt đầu Quiz
                  </button>
                </div>
              ) : (
                <div className="p-6 bg-white border border-slate-200 rounded-3xl space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <h4 className="font-extrabold text-sm text-slate-800">Bài kiểm tra Ngữ pháp & Chia thì</h4>
                    {quizSubmitted && (
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        Điểm số: {score}/{currentQuizQuestions.length}
                      </span>
                    )}
                  </div>

                  <div className="space-y-6">
                    {currentQuizQuestions.map((q, qIdx) => (
                      <div key={qIdx} className="space-y-3 p-4 bg-slate-50 rounded-2xl">
                        <p className="text-xs font-extrabold text-slate-800">Câu {qIdx + 1}: {q.q}</p>
                        <div className="space-y-2">
                          {q.options.map((opt: string, optIdx: number) => {
                            const isSelected = userAnswers[qIdx] === optIdx;
                            const isCorrect = q.answer === optIdx;
                            let btnStyle = "bg-white text-slate-700 border-slate-200 hover:border-slate-400";
                            if (quizSubmitted) {
                              if (isCorrect) btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-800 font-bold";
                              else if (isSelected) btnStyle = "bg-rose-50 border-rose-400 text-rose-800";
                            } else if (isSelected) {
                              btnStyle = "bg-blue-50 border-blue-500 text-blue-800 font-bold";
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleSelectAnswer(qIdx, optIdx)}
                                className={cn("w-full p-3 rounded-xl text-xs font-medium text-left border transition-all cursor-pointer", btnStyle)}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {!quizSubmitted ? (
                    <button
                      onClick={handleSubmitQuiz}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                    >
                      Nộp bài Quiz
                    </button>
                  ) : (
                    <button
                      onClick={generateQuiz}
                      className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                    >
                      Làm Lượt Mới
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
