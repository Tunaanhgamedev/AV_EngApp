'use client';

import React, { useState } from 'react';
import { Zap, Volume2, Search, Info, CheckCircle2, XCircle, Trophy, Sparkles, BookOpen, HelpCircle, FileText, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  COMMON_VERBS, ACTION_VERBS, THINKING_VERBS, STATIVE_CATEGORIES,
  DUAL_NATURE_VERBS, CONJUGATION_RULES, CONJUGATION_MODELS,
  VERB_QUIZ_QUESTIONS, VERB_FILL_IN_QUESTIONS, VERB_TYPES
} from '../../grammarData';
import { speak, conjugateVerb, analyzeUserVerb, predictVerbFormFromClue } from '../../utils/pronunciationUtils';

export default function VerbsTab() {
  const [verbSection, setVerbSection] = useState<'list' | 'types' | 'playground' | 'conjugation' | 'practice'>('list');
  const [verbCategoryFilter, setVerbCategoryFilter] = useState<'all' | 'regular' | 'irregular'>('all');
  const [verbSearchTerm, setVerbSearchTerm] = useState<string>('');

  // Verb Quiz Interactive States
  const [verbQuizList, setVerbQuizList] = useState<any[]>(() => VERB_QUIZ_QUESTIONS.slice(0, 10));
  const [verbQuizIndex, setVerbQuizIndex] = useState<number>(0);
  const [verbQuizScore, setVerbQuizScore] = useState<number>(0);
  const [verbSelectedAnswer, setVerbSelectedAnswer] = useState<string | null>(null);
  const [verbQuizFinished, setVerbQuizFinished] = useState<boolean>(false);

  // Verb Fill-In Interactive States
  const [fillInList, setFillInList] = useState<any[]>(() => VERB_FILL_IN_QUESTIONS.slice(0, 10));
  const [fillInIndex, setFillInIndex] = useState<number>(0);
  const [fillInScore, setFillInScore] = useState<number>(0);
  const [fillInUserAnswer, setFillInUserAnswer] = useState<string>('');
  const [fillInSubmitted, setFillInSubmitted] = useState<boolean>(false);
  const [fillInFinished, setFillInFinished] = useState<boolean>(false);
  const [fillInFeedback, setFillInFeedback] = useState<any | null>(null);

  // Playground States
  const [playgroundVerb, setPlaygroundVerb] = useState<string>('go');
  const [playgroundSubject, setPlaygroundSubject] = useState<string>('She');
  const [playgroundTense, setPlaygroundTense] = useState<string>('Present Simple');

  // Practice States
  const [practiceMode, setPracticeMode] = useState<'quiz' | 'fill-in' | 'analyzer' | 'predictor'>('quiz');
  const [quizScore, setQuizScore] = useState<number>(0);
  const [userQuizAnswers, setUserQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const [userFillAnswers, setUserFillAnswers] = useState<Record<number, string>>({});
  const [fillSubmitted, setFillSubmitted] = useState<boolean>(false);
  const [fillScore, setFillScore] = useState<number>(0);

  const [analyzerInput, setAnalyzerInput] = useState<string>('');
  const [analyzerBaseVerb, setAnalyzerBaseVerb] = useState<string>('go');

  const [predictorClue, setPredictorClue] = useState<string>('yesterday');
  const [predictorVerb, setPredictorVerb] = useState<string>('eat');

  const filteredVerbs = (COMMON_VERBS || []).filter(v => {
    const matchCategory = verbCategoryFilter === 'all' || v.type === verbCategoryFilter;
    const q = verbSearchTerm.trim().toLowerCase();
    const matchSearch = !q || v.verb.toLowerCase().includes(q) || v.v2.toLowerCase().includes(q) || v.v3.toLowerCase().includes(q) || v.vi.toLowerCase().includes(q);
    return matchCategory && matchSearch;
  });

  const handleSelectQuizAnswer = (qIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setUserQuizAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleQuizSubmit = () => {
    let s = 0;
    VERB_QUIZ_QUESTIONS.forEach((q, idx) => {
      if (userQuizAnswers[idx] === Number(q.answer) || userQuizAnswers[idx] === (q.answer as any)) s++;
    });
    setQuizScore(s);
    setQuizSubmitted(true);
  };

  const handleFillSubmit = () => {
    let s = 0;
    VERB_FILL_IN_QUESTIONS.forEach((q, idx) => {
      const userAns = (userFillAnswers[idx] || '').trim().toLowerCase();
      const isCorrect = (q as any).answer 
        ? userAns === (q as any).answer.trim().toLowerCase()
        : (q as any).correctAnswers?.some((ans: string) => ans.trim().toLowerCase() === userAns);
      if (isCorrect) s++;
    });
    setFillScore(s);
    setFillSubmitted(true);
  };

  return (
      
        <div className="space-y-6 animate-in fade-in duration-500 text-left">
          {/* Header Banner */}
          <div className="premium-card p-5 sm:p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <h3 className="text-lg font-black text-amber-850 flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-amber-600" /> Hệ Thống Động Từ Toàn Diện (English Verbs System)
            </h3>
            <p className="text-xs sm:text-sm text-amber-800 leading-relaxed font-medium">
              Động từ là linh hồn của câu, diễn tả hành động hoặc trạng thái. Trải nghiệm hệ thống học động từ tích hợp đầy đủ từ phân loại, quy tắc chia thì đến sân chơi tương tác và luyện tập.
            </p>
          </div>

          {/* Sub-navigation */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'list' as const, label: 'Bảng động từ 3 thể' },
              { id: 'types' as const, label: 'Phân loại: Action & Thinking' },
              { id: 'playground' as const, label: 'Sân chơi chia động từ (Playground)' },
              { id: 'conjugation' as const, label: 'Quy tắc chia động từ' },
              { id: 'practice' as const, label: 'Luyện tập chia động từ' }
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setVerbSection(s.id)}
                className={cn(
                  "px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer",
                  verbSection === s.id
                    ? "bg-amber-600 text-white shadow-lg shadow-amber-600/10"
                    : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-amber-400"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* SECTION 1: VERB LIST */}
          {verbSection === 'list' && (
            <div className="space-y-4">
              {/* Filter and Search */}
              <div className="flex flex-wrap gap-3 justify-between items-center bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-700 rounded-2xl">
                <div className="flex flex-wrap gap-2 items-center">
                  {(['all', 'irregular', 'regular'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setVerbCategoryFilter(f as any)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer",
                        verbCategoryFilter === f
                          ? "bg-amber-500 text-white"
                          : "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                      )}
                    >
                      {f === 'all' ? 'Tất cả' : f === 'irregular' ? 'Bất quy tắc' : 'Có quy tắc'}
                    </button>
                  ))}
                </div>

                {/* Search box */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    value={verbSearchTerm}
                    onChange={(e) => setVerbSearchTerm(e.target.value)}
                    placeholder="Tìm kiếm động từ (Ví dụ: go, think)..."
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/25 placeholder-slate-400 text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div className="text-xs text-slate-400 dark:text-slate-500 font-bold">
                  Số lượng: {filteredVerbs.length} từ
                </div>
              </div>

              {/* Verb Table */}
              <div className="premium-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[1.5rem] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                        <th className="text-left px-3 sm:px-4 py-3 font-black text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider font-sans">V1 (Base)</th>
                        <th className="text-left px-3 sm:px-4 py-3 font-black text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider font-sans">V2 (Past)</th>
                        <th className="text-left px-3 sm:px-4 py-3 font-black text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider font-sans">V3 (P.P.)</th>
                        <th className="text-left px-3 sm:px-4 py-3 font-black text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider font-sans hidden sm:table-cell">IPA</th>
                        <th className="text-left px-3 sm:px-4 py-3 font-black text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider font-sans">Nghĩa</th>
                        <th className="text-center px-2 py-3 font-black text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider font-sans">Nghe</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVerbs.map((v, i) => (
                        <tr key={i} className="border-b border-slate-100 dark:border-slate-800 hover:bg-amber-50/30 dark:bg-amber-500/10 transition-colors">
                          <td className="px-3 sm:px-4 py-3 font-black text-slate-800 dark:text-slate-100">{v.verb}</td>
                          <td className="px-3 sm:px-4 py-3 font-semibold text-orange-700">{v.v2}</td>
                          <td className="px-3 sm:px-4 py-3 font-semibold text-amber-700">{v.v3}</td>
                          <td className="px-3 sm:px-4 py-3 text-slate-400 dark:text-slate-500 font-mono text-xs hidden sm:table-cell">{v.ipa}</td>
                          <td className="px-3 sm:px-4 py-3 text-slate-600 dark:text-slate-300 font-semibold text-xs">{v.vi}</td>
                          <td className="px-2 py-3 text-center">
                            <button
                              onClick={() => speak(v.verb)}
                              className="w-8 h-8 rounded-full bg-amber-55 hover:bg-amber-500 text-amber-500 hover:text-white flex items-center justify-center transition-all cursor-pointer mx-auto border border-amber-100"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: VERB TYPES (ACTION & THINKING DEEP-DIVE) */}
          {verbSection === 'types' && (
            <div className="space-y-6">
              {/* Dynamic vs. Stative / Action vs. Thinking Explanation */}
              <div className="premium-card p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[1.5rem] space-y-4">
                <h4 className="text-sm font-black text-amber-805 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                  <span>🧠 Action Verbs vs. Thinking (Stative) Verbs</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-amber-50/50 dark:bg-amber-500/10 rounded-2xl border border-amber-100 space-y-2">
                    <h5 className="text-xs font-black text-amber-800 uppercase tracking-widest flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> Động từ Hành động (Action / Dynamic)</h5>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                      Diễn tả hành động thể chất hoặc tinh thần có thể nhìn thấy, đo lường hoặc thực hiện trong một khoảng thời gian cụ thể.
                    </p>
                    <p className="text-xs text-amber-700 font-bold">
                      💡 Quy tắc: Có thể sử dụng ở dạng tiếp diễn (Continuous) thoải mái để miêu tả quá trình hành động.
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50/50 dark:bg-orange-500/10 rounded-2xl border border-orange-100 space-y-2">
                    <h5 className="text-xs font-black text-orange-850 uppercase tracking-widest flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> Động từ Tư duy & Trạng thái (Thinking / Stative)</h5>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                      Diễn tả trạng thái nhận thức, cảm xúc, suy nghĩ hoặc mối quan hệ sở hữu.
                    </p>
                    <p className="text-xs text-orange-700 font-bold">
                      ⚠️ CẤM KỴ: Không dùng ở các thì tiếp diễn (Continuous) trừ một số ngoại lệ đổi nghĩa (như think = cân nhắc).
                    </p>
                  </div>
                </div>
              </div>

              {/* Side-by-side Grid lists */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Action Verbs List */}
                <div className="premium-card p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[1.5rem] space-y-4">
                  <h4 className="text-sm font-black text-amber-800 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                    🏃‍♂️ Ví Dụ Động Từ Hành Động (Action Verbs)
                  </h4>
                  <div className="space-y-3">
                    {ACTION_VERBS.map((v, i) => (
                      <div key={i} className="p-3 bg-amber-50/40 dark:bg-amber-500/10 rounded-xl border border-amber-100/50 flex items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-black text-amber-850">{v.word}</span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-bold">{v.ipa}</span>
                            <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-black">{v.vi}</span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium italic">"{v.ex}"</p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">💡 {v.exVi}</p>
                        </div>
                        <button
                          onClick={() => speak(v.word + ". " + v.ex)}
                          className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-amber-200 hover:bg-amber-500 text-amber-500 hover:text-white flex items-center justify-center flex-shrink-0 cursor-pointer transition-all"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stative Categories (Accordion/Grid style) */}
                <div className="premium-card p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[1.5rem] space-y-4">
                  <h4 className="text-sm font-black text-orange-850 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                    💭 Phân Loại Động Từ Trạng Thái (Stative Verbs)
                  </h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold leading-relaxed">
                    Động từ trạng thái được chia làm 4 nhóm chính. Tránh dùng dạng tiếp diễn cho các nhóm này:
                  </p>
                  <div className="space-y-4">
                    {STATIVE_CATEGORIES.map((cat, idx) => (
                      <div key={idx} className="space-y-2 border border-slate-100 dark:border-slate-800 rounded-2xl p-3 bg-orange-50/10 dark:bg-orange-500/10">
                        <h5 className="text-xs font-black text-orange-950 flex items-center gap-1.5 border-b border-orange-100/30 pb-1">
                          {cat.title}
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {cat.verbs.map((v, vidx) => (
                            <div
                              key={vidx}
                              onClick={() => speak(v.word + ". " + v.ex)}
                              className="p-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-orange-300 hover:bg-orange-50/20 dark:bg-orange-500/10 rounded-xl transition-all cursor-pointer flex flex-col justify-between gap-1 group"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-orange-900">{v.word}</span>
                                <Volume2 className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-orange-500 transition-colors" />
                              </div>
                              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">{v.ipa}</span>
                              <span className="text-[9px] bg-orange-50 dark:bg-orange-500/10 text-orange-800 px-1 py-0.5 rounded font-black self-start">{v.vi}</span>
                              <span className="text-[9px] text-slate-400 dark:text-slate-500 italic font-medium mt-1 truncate">"{v.ex}"</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dual-Nature Verbs */}
              <div className="premium-card p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[1.5rem] space-y-4">
                <h4 className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                  <span>🌓 Động Từ Mang Hai Bản Chất (Stative & Dynamic Dual Nature)</span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                  Một số động từ thay đổi nghĩa hoàn toàn khi được chuyển từ trạng thái tĩnh (Stative) sang động (Dynamic). Xem so sánh chi tiết:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {DUAL_NATURE_VERBS.map((dv, idx) => (
                    <div key={idx} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 space-y-3 hover:border-amber-400 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-amber-700 uppercase">{dv.verb}</span>
                          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono font-bold">{dv.ipa}</span>
                        </div>
                        <button
                          onClick={() => speak(dv.verb + ". " + dv.stativeUsage + ". " + dv.dynamicUsage)}
                          className="w-7 h-7 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-450 hover:text-amber-500 hover:border-amber-500 flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl space-y-1">
                          <p className="font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-[8px]">🔒 Nghĩa Tĩnh (Stative)</p>
                          <p className="font-bold text-slate-805">"{dv.stativeUsage}"</p>
                          <p className="text-slate-500 dark:text-slate-400 font-medium">{dv.stativeVi}</p>
                        </div>
                        <div className="p-2.5 bg-amber-50/30 dark:bg-amber-500/10 border border-amber-100 rounded-xl space-y-1">
                          <p className="font-black text-amber-700 uppercase tracking-widest text-[8px]">⚡ Nghĩa Động (Dynamic)</p>
                          <p className="font-bold text-slate-805">"{dv.dynamicUsage}"</p>
                          <p className="text-amber-700 font-semibold">{dv.dynamicVi}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Standard VERB_TYPES Categories */}
              <div className="premium-card p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[1.5rem]">
                <h4 className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4">Các loại động từ khác trong tiếng Anh</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {VERB_TYPES.map((vt, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 space-y-2">
                      <h5 className="text-sm font-black text-amber-800">{vt.type}</h5>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{vt.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {vt.examples.map((ex, j) => (
                          <button key={j} onClick={() => speak(ex)} className="text-xs px-2.5 py-1 rounded-full bg-white dark:bg-slate-900 border border-amber-200 text-amber-700 font-bold hover:bg-amber-500 hover:text-white transition-all cursor-pointer">
                            {ex}
                          </button>
                        ))}
                      </div>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium italic">{vt.vi}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: CONJUGATION PLAYGROUND */}
          {verbSection === 'playground' && (
            <div className="premium-card p-5 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[1.5rem] space-y-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 dark:bg-amber-500/10 px-3 py-1 rounded-full border border-amber-100">PLAYGROUND</span>
                <h2 className="text-xl font-black text-slate-805 mt-2">Sân chơi chia động từ tương tác</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Chọn Động từ, Chủ ngữ và Thì để xem dạng chia tương tương ứng ở các thể Khẳng định, Phủ định và Nghi vấn.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                {/* Select Verb */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">1. Chọn Động Từ</label>
                  <select
                    value={playgroundVerb}
                    onChange={(e) => setPlaygroundVerb(e.target.value)}
                    className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/25"
                  >
                    {[
                      { val: 'be', lbl: 'be (thì, là, ở)' },
                      { val: 'have', lbl: 'have (có)' },
                      { val: 'do', lbl: 'do (làm)' },
                      { val: 'go', lbl: 'go (đi)' },
                      { val: 'make', lbl: 'make (làm, tạo)' },
                      { val: 'know', lbl: 'know (biết - Stative)' },
                      { val: 'think', lbl: 'think (nghĩ - Stative/Dynamic)' },
                      { val: 'see', lbl: 'see (nhìn thấy - Stative/Dynamic)' },
                      { val: 'run', lbl: 'run (chạy)' },
                      { val: 'speak', lbl: 'speak (nói)' },
                      { val: 'work', lbl: 'work (làm việc)' },
                      { val: 'play', lbl: 'play (chơi)' },
                      { val: 'study', lbl: 'study (học)' },
                      { val: 'write', lbl: 'write (viết)' },
                      { val: 'eat', lbl: 'eat (ăn)' },
                      { val: 'drink', lbl: 'drink (uống)' }
                    ].map(item => (
                      <option key={item.val} value={item.val}>{item.lbl}</option>
                    ))}
                  </select>
                </div>

                {/* Select Subject */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">2. Chọn Chủ Ngữ</label>
                  <select
                    value={playgroundSubject}
                    onChange={(e) => setPlaygroundSubject(e.target.value)}
                    className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/25"
                  >
                    {['I', 'You', 'He', 'She', 'It', 'We', 'They'].map(sub => (
                      <option key={sub} value={sub}>{sub} (Ngôi {sub === 'I' ? '1 số ít' : ['He', 'She', 'It'].includes(sub) ? '3 số ít' : ['We', 'They'].includes(sub) ? 'số nhiều' : '2'})</option>
                    ))}
                  </select>
                </div>

                {/* Select Tense */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">3. Chọn Thì (Tense)</label>
                  <select
                    value={playgroundTense}
                    onChange={(e) => setPlaygroundTense(e.target.value)}
                    className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/25"
                  >
                    {[
                      'Present Simple',
                      'Present Continuous',
                      'Past Simple',
                      'Present Perfect',
                      'Future Simple'
                    ].map(t => (
                      <option key={t} value={t}>{t === 'Present Simple' ? 'Present Simple (Hiện tại đơn)' : t === 'Present Continuous' ? 'Present Continuous (Hiện tại tiếp diễn)' : t === 'Past Simple' ? 'Past Simple (Quá khứ đơn)' : t === 'Present Perfect' ? 'Present Perfect (Hiện tại hoàn thành)' : 'Future Simple (Tương lai đơn)'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Conjugation results */}
              {(() => {
                const res = conjugateVerb(playgroundVerb, playgroundSubject, playgroundTense);
                return (
                  <div className="space-y-4 pt-2">
                    {/* Stative warning if any */}
                    {res.isStativeWarning && (
                      <div className="p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 rounded-2xl flex items-start gap-2.5 text-rose-800 text-xs font-semibold">
                        <Info className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          ⚠️ Cảnh báo Động từ Trạng thái: <strong>"{playgroundVerb}"</strong> là động từ mô tả trạng thái nhận thức hoặc cảm giác. Trong tiếng Anh chuẩn, ta rất hiếm khi sử dụng ở thể tiếp diễn (Continuous) trừ những ngữ cảnh đặc biệt chỉ hành động tạm thời hoặc chuyển đổi trạng thái.
                        </p>
                      </div>
                    )}

                    {/* Positive, Negative, Question Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Positive Card */}
                      <div className="p-4 bg-emerald-50/40 dark:bg-emerald-500/10 border border-emerald-100/50 rounded-2xl space-y-2 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-black text-emerald-700 bg-emerald-105 px-2.5 py-0.5 rounded-full uppercase tracking-wider">(+) Khẳng Định</span>
                          <p className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 mt-2 select-all">"{res.positive}"</p>
                        </div>
                        <button
                          onClick={() => speak(res.positive)}
                          className="mt-3 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-emerald-200 hover:bg-emerald-500 hover:text-white text-emerald-700 rounded-xl text-xs font-bold transition-all cursor-pointer self-start"
                        >
                          <Volume2 className="w-3.5 h-3.5" /> Nghe phát âm
                        </button>
                      </div>

                      {/* Negative Card */}
                      <div className="p-4 bg-rose-50/40 dark:bg-rose-500/10 border border-rose-100/50 rounded-2xl space-y-2 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-black text-rose-700 bg-rose-105 px-2.5 py-0.5 rounded-full uppercase tracking-wider">(-) Phủ Định</span>
                          <p className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 mt-2 select-all">"{res.negative}"</p>
                        </div>
                        <button
                          onClick={() => speak(res.negative)}
                          className="mt-3 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-rose-200 hover:bg-rose-500 hover:text-white text-rose-700 rounded-xl text-xs font-bold transition-all cursor-pointer self-start"
                        >
                          <Volume2 className="w-3.5 h-3.5" /> Nghe phát âm
                        </button>
                      </div>

                      {/* Question Card */}
                      <div className="p-4 bg-sky-50/40 dark:bg-sky-500/10 border border-sky-100/50 rounded-2xl space-y-2 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-black text-sky-700 bg-sky-105 px-2.5 py-0.5 rounded-full uppercase tracking-wider">(?) Nghi Vấn</span>
                          <p className="text-base sm:text-lg font-black text-slate-805 mt-2 select-all">"{res.question}"</p>
                        </div>
                        <button
                          onClick={() => speak(res.question)}
                          className="mt-3 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-sky-200 hover:bg-sky-500 hover:text-white text-sky-700 rounded-xl text-xs font-bold transition-all cursor-pointer self-start"
                        >
                          <Volume2 className="w-3.5 h-3.5" /> Nghe phát âm
                        </button>
                      </div>
                    </div>

                    {/* Explanation */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-1.5">
                      <h4 className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Info className="w-4 h-4 text-amber-500" /> Giải thích chi tiết:
                      </h4>
                      <p className="text-xs text-slate-650 font-semibold leading-relaxed whitespace-pre-line">
                        {res.explanation}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* SECTION 4: CONJUGATION RULES & MODELS */}
          {verbSection === 'conjugation' && (
            <div className="space-y-6">
              {/* Spelling Rules Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {CONJUGATION_RULES.map((section, idx) => (
                  <div key={idx} className="premium-card p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[1.5rem] space-y-3">
                    <h4 className="text-xs font-black text-amber-850 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2">
                      {section.title}
                    </h4>
                    <div className="space-y-2.5">
                      {section.rules.map((r, rIdx) => (
                        <div key={rIdx} className="space-y-1">
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{r.cond}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{r.rule}: <span className="font-bold text-amber-600">{r.ex}</span></p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tense Conjugation Models */}
              <div className="premium-card p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[1.5rem] space-y-4">
                <h4 className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                  <span>📅 Bảng mẫu chia động từ các thì cơ bản (Conjugation Models)</span>
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Regular model */}
                  <div className="space-y-3">
                    <div className="p-3 bg-amber-50 dark:bg-amber-500/10 rounded-xl border border-amber-250 flex justify-between items-center">
                      <span className="text-xs font-black text-amber-900 uppercase">Regular: {CONJUGATION_MODELS.regular.verb}</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">({CONJUGATION_MODELS.regular.vi})</span>
                    </div>
                    <div className="space-y-2">
                      {CONJUGATION_MODELS.regular.tenses.map((t, idx) => (
                        <div key={idx} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs space-y-1 border border-slate-100 dark:border-slate-800">
                          <p className="font-black text-slate-700 dark:text-slate-300 text-[10px] uppercase tracking-wider">{t.tense}</p>
                          <p className="text-slate-500 dark:text-slate-400 font-medium">I / They: <span className="font-bold text-slate-800 dark:text-slate-100">{t.i}</span></p>
                          <p className="text-slate-500 dark:text-slate-400 font-medium">He / She / It: <span className="font-bold text-amber-600">{t.he}</span></p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Irregular model */}
                  <div className="space-y-3">
                    <div className="p-3 bg-orange-50 dark:bg-orange-500/10 rounded-xl border border-orange-250 flex justify-between items-center">
                      <span className="text-xs font-black text-orange-900 uppercase">Irregular: {CONJUGATION_MODELS.irregular.verb}</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">({CONJUGATION_MODELS.irregular.vi})</span>
                    </div>
                    <div className="space-y-2">
                      {CONJUGATION_MODELS.irregular.tenses.map((t, idx) => (
                        <div key={idx} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs space-y-1 border border-slate-100 dark:border-slate-800">
                          <p className="font-black text-slate-700 dark:text-slate-300 text-[10px] uppercase tracking-wider">{t.tense}</p>
                          <p className="text-slate-500 dark:text-slate-400 font-medium">I / They: <span className="font-bold text-slate-800 dark:text-slate-100">{t.i}</span></p>
                          <p className="text-slate-500 dark:text-slate-400 font-medium">He / She / It: <span className="font-bold text-orange-600">{t.he}</span></p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stative/Thinking model */}
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 rounded-xl border border-red-250 flex justify-between items-center">
                      <span className="text-xs font-black text-red-900 uppercase">Stative: {CONJUGATION_MODELS.thinking.verb}</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">({CONJUGATION_MODELS.thinking.vi})</span>
                    </div>
                    <div className="space-y-2">
                      {CONJUGATION_MODELS.thinking.tenses.map((t, idx) => (
                        <div key={idx} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs space-y-1 border border-slate-100 dark:border-slate-800">
                          <p className="font-black text-slate-700 dark:text-slate-300 text-[10px] uppercase tracking-wider">{t.tense}</p>
                          {t.note ? (
                            <p className="text-[10px] text-rose-505 font-black leading-normal">{t.note}</p>
                          ) : (
                            <>
                              <p className="text-slate-500 dark:text-slate-400 font-medium">I / They: <span className="font-bold text-slate-800 dark:text-slate-100">{t.i}</span></p>
                              <p className="text-slate-500 dark:text-slate-400 font-medium">He / She / It: <span className="font-bold text-red-600">{t.he}</span></p>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: PRACTICE INTERACTIVE QUIZ */}
          {verbSection === 'practice' && (
            <div className="space-y-6">
              {/* Mode Selection Tabs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {[
                  { id: 'quiz' as const, label: 'Trắc Nghiệm', icon: HelpCircle, desc: 'Luyện 30 câu hỏi chia thì' },
                  { id: 'fill-in' as const, label: 'Tự Luận & Sửa Lỗi', icon: FileText, desc: 'Gõ đáp án tự luận trực quan' },
                  { id: 'analyzer' as const, label: 'AI Verb Analyzer', icon: Search, desc: 'Phân tích hình thái từ nhập' },
                  { id: 'predictor' as const, label: 'AI Clue Predictor', icon: Sparkles, desc: 'Dự đoán từ dấu hiệu câu hỏi' }
                ].map(m => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setPracticeMode(m.id)}
                      className={cn(
                        "p-3.5 rounded-[1.25rem] font-black text-xs transition-all flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer border-2 active:scale-98 select-none",
                        practiceMode === m.id
                          ? "bg-amber-600 border-amber-600 text-white shadow-lg shadow-amber-600/10"
                          : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50/20 dark:bg-amber-500/10"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-extrabold">{m.label}</span>
                      <span className={cn("text-[9px] font-semibold mt-0.5", practiceMode === m.id ? "text-amber-100" : "text-slate-400 dark:text-slate-500")}>{m.desc}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mode 1: Multiple Choice Quiz */}
              {practiceMode === 'quiz' && (
                <div className="premium-card p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[1.5rem] space-y-6">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 dark:bg-amber-500/10 px-3 py-1 rounded-full border border-amber-100">TRẮC NGHIỆM</span>
                    <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mt-2">Trắc Nghiệm Chia Động Từ</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Luyện tập nhận diện thì và hình thái chia động từ thông qua bộ câu hỏi trắc nghiệm (30 câu).</p>
                  </div>

                  {!verbQuizFinished && verbQuizList.length > 0 && verbQuizList[verbQuizIndex] ? (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center text-xs text-slate-400 dark:text-slate-500 font-bold">
                        <span>Câu {verbQuizIndex + 1} / {verbQuizList.length}</span>
                        <span>Điểm: {verbQuizScore}</span>
                      </div>

                      <div className="p-5 bg-amber-900 text-white rounded-2xl shadow-inner font-bold text-base leading-relaxed text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />
                        <span className="text-[10px] text-amber-300 font-black uppercase tracking-widest block mb-2 font-mono">BÀI TẬP</span>
                        "{verbQuizList[verbQuizIndex].question}"
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {verbQuizList[verbQuizIndex].options.map((opt: string) => {
                          const isCorrect = opt === verbQuizList[verbQuizIndex].answer;
                          const isSelected = verbSelectedAnswer === opt;
                          const hasAnswered = verbSelectedAnswer !== null;

                          return (
                            <button
                              key={opt}
                              disabled={hasAnswered}
                              onClick={() => {
                                if (verbSelectedAnswer !== null) return;
                                setVerbSelectedAnswer(opt);
                                if (opt === verbQuizList[verbQuizIndex].answer) {
                                  setVerbQuizScore(prev => prev + 1);
                                }
                              }}
                              className={cn(
                                "p-4 rounded-xl border-2 text-sm font-black text-center transition-all cursor-pointer select-none",
                                hasAnswered
                                  ? isCorrect
                                    ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500 text-emerald-700 font-black"
                                    : isSelected
                                      ? "bg-rose-50 dark:bg-rose-500/10 border-rose-500 text-rose-700 font-black"
                                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 font-bold"
                                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-500 hover:bg-amber-50/30 dark:bg-amber-500/10 active:scale-95 font-bold"
                              )}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {verbSelectedAnswer !== null && (
                        <div
                          className={cn(
                            "p-4 rounded-2xl border animate-in slide-in-from-top-2 duration-300",
                            verbSelectedAnswer === verbQuizList[verbQuizIndex].answer
                              ? "bg-emerald-50/50 dark:bg-emerald-500/10 border-emerald-200 text-emerald-800"
                              : "bg-rose-50/50 dark:bg-rose-500/10 border-rose-200 text-rose-800"
                          )}
                        >
                          <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-1.5">
                            {verbSelectedAnswer === verbQuizList[verbQuizIndex].answer ? (
                              <>🎉 Quá tuyệt vời! Trả lời chính xác.</>
                            ) : (
                              <>⚠️ Cần chú ý quy tắc rồi!</>
                            )}
                          </h4>
                          <p className="text-xs font-medium mt-1 leading-relaxed">{verbQuizList[verbQuizIndex].explanation}</p>

                          <button
                            onClick={() => {
                              setVerbSelectedAnswer(null);
                              if (verbQuizIndex < verbQuizList.length - 1) {
                                setVerbQuizIndex(prev => prev + 1);
                              } else {
                                setVerbQuizFinished(true);
                              }
                            }}
                            className="mt-3 w-full bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider py-2.5 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            Tiếp tục <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 space-y-4">
                      <div className="w-20 h-20 bg-amber-50 dark:bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto border border-amber-100 shadow-md">
                        <Trophy className="w-10 h-10" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-black text-slate-850">Hoàn Thành Thử Thách Trắc Nghiệm!</h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-bold">Điểm của bạn: <span className="text-amber-600 font-black text-sm">{verbQuizScore}</span> / {verbQuizList.length}</p>
                      </div>
                      <button
                        onClick={() => {
                          const shuffled = [...VERB_QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
                          setVerbQuizList(shuffled.slice(0, 10));
                          setVerbQuizIndex(0);
                          setVerbSelectedAnswer(null);
                          setVerbQuizScore(0);
                          setVerbQuizFinished(false);
                        }}
                        className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                      >
                        Luyện tập lại
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Mode 2: Fill-in / Write-in Quiz */}
              {practiceMode === 'fill-in' && (
                <div className="premium-card p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[1.5rem] space-y-6">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 bg-orange-50 dark:bg-orange-500/10 px-3 py-1 rounded-full border border-orange-100">TỰ LUẬN & PHÂN TÍCH</span>
                    <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mt-2">Gõ Câu Trả Lời & Phân Tích Lỗi Sai</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Học chủ động bằng cách tự gõ câu trả lời. Hệ thống AI sẽ phân tích hình thái từ bạn nhập để sửa lỗi chi tiết.</p>
                  </div>

                  {!fillInFinished && fillInList.length > 0 && fillInList[fillInIndex] ? (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center text-xs text-slate-400 dark:text-slate-500 font-bold">
                        <span>Câu {fillInIndex + 1} / {fillInList.length}</span>
                        <span>Điểm: {fillInScore}</span>
                      </div>

                      {/* Question Block */}
                      <div className="p-5 bg-orange-900 text-white rounded-2xl shadow-inner font-bold text-base leading-relaxed text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/10 to-transparent pointer-events-none" />
                        <span className="text-[10px] text-orange-300 font-black uppercase tracking-widest block mb-2 font-mono">ĐIỀN DẠNG ĐÚNG CỦA ĐỘNG TỪ TRONG NGOẶC</span>
                        "{fillInList[fillInIndex].sentence}"
                      </div>

                      {/* Input Form */}
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (fillInFeedback !== null || !fillInUserAnswer.trim()) return;

                          const q = fillInList[fillInIndex];
                          const cleanedInput = fillInUserAnswer.trim().toLowerCase();
                          const isCorrect = q.correctAnswers.some((ans: string) => ans.trim().toLowerCase() === cleanedInput);

                          const analysis = analyzeUserVerb(fillInUserAnswer, q.verb, COMMON_VERBS);
                          
                          setFillInFeedback({
                            isCorrect,
                            detectedForm: analysis.detectedForm,
                            clueUsed: q.clue,
                            msg: isCorrect 
                              ? `Tuyệt vời! Bạn đã chia chính xác động từ "${q.verb}" ở dạng ${q.expectedForm} thành "${cleanedInput}".`
                              : `Chưa chính xác. Dấu hiệu trong câu là "${q.clue}" yêu cầu động từ phải chia ở dạng ${q.expectedForm} (ví dụ: "${q.correctAnswers.join(' hoặc ')}"). Bạn đã nhập từ "${fillInUserAnswer}" ở dạng "${analysis.detectedForm}".`
                          });

                          if (isCorrect) {
                            setFillInScore(prev => prev + 1);
                          }
                        }}
                        className="space-y-3"
                      >
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Gõ câu trả lời của bạn vào đây:</label>
                          <input
                            type="text"
                            value={fillInUserAnswer}
                            disabled={fillInFeedback !== null}
                            onChange={(e) => setFillInUserAnswer(e.target.value)}
                            placeholder={`Gõ từ thích hợp để điền vào chỗ trống (Ví dụ: ${fillInList[fillInIndex].verb === 'go' ? 'went' : 'written'})...`}
                            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:bg-slate-50 dark:bg-slate-800 disabled:text-slate-500 dark:text-slate-400"
                          />
                        </div>
                        {fillInFeedback === null && (
                          <button
                            type="submit"
                            disabled={!fillInUserAnswer.trim()}
                            className="w-full py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-200 disabled:text-slate-400 dark:text-slate-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer active:scale-95"
                          >
                            Kiểm tra kết quả
                          </button>
                        )}
                      </form>

                      {/* feedback card */}
                      {fillInFeedback !== null && (
                        <div
                          className={cn(
                            "p-4 rounded-2xl border animate-in slide-in-from-top-2 duration-300 space-y-3",
                            fillInFeedback.isCorrect
                              ? "bg-emerald-50/50 dark:bg-emerald-500/10 border-emerald-200 text-emerald-800"
                              : "bg-rose-50/50 dark:bg-rose-500/10 border-rose-200 text-rose-800"
                          )}
                        >
                          <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-1.5">
                            {fillInFeedback.isCorrect ? (
                              <>🎉 Câu trả lời hoàn hảo!</>
                            ) : (
                              <>⚠️ Phân tích câu trả lời của bạn</>
                            )}
                          </h4>
                          
                          <div className="space-y-2">
                            <p className="text-xs font-semibold leading-relaxed">{fillInFeedback.msg}</p>
                            
                            <div className="p-3 bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700/40 rounded-xl space-y-1.5 text-slate-700 dark:text-slate-300">
                              <p className="text-[11px] font-bold">
                                🔑 <span className="text-slate-400 dark:text-slate-500">Dấu hiệu nhận biết:</span> {fillInList[fillInIndex].clue}
                              </p>
                              <p className="text-[11px] font-bold">
                                📅 <span className="text-slate-400 dark:text-slate-500">Dạng đúng dự kiến:</span> <span className="text-orange-600">{fillInList[fillInIndex].expectedForm}</span>
                              </p>
                              <p className="text-[11px] font-semibold text-slate-550 italic leading-relaxed">
                                {fillInList[fillInIndex].explanation}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setFillInFeedback(null);
                              setFillInUserAnswer('');
                              if (fillInIndex < fillInList.length - 1) {
                                setFillInIndex(prev => prev + 1);
                              } else {
                                setFillInFinished(true);
                              }
                            }}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider py-2.5 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            Tiếp tục <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 space-y-4">
                      <div className="w-20 h-20 bg-orange-50 dark:bg-orange-500/10 text-orange-500 rounded-full flex items-center justify-center mx-auto border border-orange-100 shadow-md">
                        <Trophy className="w-10 h-10" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-black text-slate-850">Hoàn Thành Thử Thách Tự Luận!</h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-bold">Điểm của bạn: <span className="text-orange-600 font-black text-sm">{fillInScore}</span> / {fillInList.length}</p>
                      </div>
                      <button
                        onClick={() => {
                          const shuffledFillIn = [...VERB_FILL_IN_QUESTIONS].sort(() => Math.random() - 0.5);
                          setFillInList(shuffledFillIn.slice(0, 10));
                          setFillInIndex(0);
                          setFillInUserAnswer('');
                          setFillInFeedback(null);
                          setFillInScore(0);
                          setFillInFinished(false);
                        }}
                        className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                      >
                        Luyện tập lại
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Mode 3: AI Verb Form Analyzer */}
              {practiceMode === 'analyzer' && (
                <div className="premium-card p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[1.5rem] space-y-6">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 bg-sky-50 dark:bg-sky-500/10 px-3 py-1 rounded-full border border-sky-100">AI VERB ANALYZER</span>
                    <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mt-2">Bộ Phân Tích Hình Thái Động Từ</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Gõ một dạng chia động từ bất kỳ của động từ gốc. AI sẽ nhận dạng hình thái của từ đó và chỉ ra dạng câu hỏi tương thích.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Control Panel */}
                    <div className="space-y-4">
                      {/* Select Verb */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">1. Chọn Động Từ Gốc (Infinitive)</label>
                        <select
                          value={analyzerBaseVerb}
                          onChange={(e) => setAnalyzerBaseVerb(e.target.value)}
                          className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                        >
                          {[
                            { val: 'go', lbl: 'go (đi - V2: went, V3: gone)' },
                            { val: 'write', lbl: 'write (viết - V2: wrote, V3: written)' },
                            { val: 'do', lbl: 'do (làm - V2: did, V3: done)' },
                            { val: 'run', lbl: 'run (chạy - V2: ran, V3: run)' },
                            { val: 'study', lbl: 'study (học - V2: studied, V3: studied)' },
                            { val: 'eat', lbl: 'eat (ăn - V2: ate, V3: eaten)' },
                            { val: 'speak', lbl: 'speak (nói - V2: spoke, V3: spoken)' },
                            { val: 'swim', lbl: 'swim (bơi - V2: swam, V3: swum)' },
                            { val: 'sleep', lbl: 'sleep (ngủ - V2: slept, V3: slept)' },
                            { val: 'drink', lbl: 'drink (uống - V2: drank, V3: drunk)' },
                            { val: 'fly', lbl: 'fly (bay - V2: flew, V3: flown)' }
                          ].map(item => (
                            <option key={item.val} value={item.val}>{item.lbl}</option>
                          ))}
                        </select>
                      </div>

                      {/* Type Verb form */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">2. Gõ từ chia bạn muốn phân tích:</label>
                        <input
                          type="text"
                          value={analyzerInput}
                          onChange={(e) => setAnalyzerInput(e.target.value)}
                          placeholder={`Gõ dạng chia của "${analyzerBaseVerb}" (Ví dụ: ${analyzerBaseVerb === 'go' ? 'went, going, goes' : 'wrote, writing'})...`}
                          className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                        />
                      </div>

                      {/* Common forms buttons */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Gợi ý nhanh cho từ "{analyzerBaseVerb}":</label>
                        <div className="flex flex-wrap gap-1.5">
                          {(() => {
                            const v = analyzerBaseVerb;
                            const entry = COMMON_VERBS.find(x => x.verb.toLowerCase() === v);
                            const options = [
                              { label: 'V1', val: v },
                              { label: 'V2', val: entry ? entry.v2 : v + 'ed' },
                              { label: 'V3', val: entry ? entry.v3 : v + 'ed' },
                              { label: 'V-ing', val: v.endsWith('e') ? v.slice(0, -1) + 'ing' : v.endsWith('y') ? v.slice(0, -1) + 'ying' : v + 'ing' },
                              { label: 'V-s/es', val: v.endsWith('y') ? v.slice(0, -1) + 'ies' : v + 's' }
                            ];
                            return options.map(opt => (
                              <button
                                key={opt.label}
                                onClick={() => setAnalyzerInput(opt.val)}
                                className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-sky-500 hover:bg-sky-50/50 dark:bg-sky-500/10 rounded-lg text-[10px] font-bold text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
                              >
                                {opt.label}: <strong>{opt.val}</strong>
                              </button>
                            ));
                          })()}
                        </div>
                      </div>
                    </div>

                    {/* Result Panel */}
                    <div className="p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-4">
                      <div className="border-b border-slate-200 dark:border-slate-700 pb-2">
                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-widest">KẾT QUẢ PHÂN TÍCH CHIA TỪ</span>
                        <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 mt-1">AI Morphological Diagnosis</h4>
                      </div>

                      {analyzerInput.trim() ? (
                        (() => {
                          const res = analyzeUserVerb(analyzerInput, analyzerBaseVerb, COMMON_VERBS);
                          return (
                            <div className="space-y-4 animate-in fade-in duration-300">
                              <div className="p-3 bg-sky-50 dark:bg-sky-500/10 border border-sky-100 rounded-xl">
                                <span className="text-[10px] font-mono text-sky-800 font-bold uppercase block">HÌNH THÁI XÁC ĐỊNH (FORM DETECTED)</span>
                                <span className="text-sm font-black text-sky-900 mt-0.5 block">{res.detectedForm}</span>
                              </div>

                              <div className="space-y-1.5 text-xs">
                                <p className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                                  <span>📖</span> <span className="text-slate-400 dark:text-slate-500 font-medium">Bản chất ngữ pháp:</span>
                                </p>
                                <p className="text-slate-650 font-semibold leading-relaxed pl-5">{res.tenseDescription}</p>
                              </div>

                              <div className="space-y-1.5 text-xs">
                                <p className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                                  <span>🔑</span> <span className="text-slate-400 dark:text-slate-500 font-medium">Khớp với dạng câu hỏi chứa dấu hiệu:</span>
                                </p>
                                <p className="text-slate-650 font-semibold leading-relaxed pl-5">{res.matchClues}</p>
                              </div>

                              <div className="space-y-1.5 text-xs">
                                <p className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                                  <span>🧬</span> <span className="text-slate-400 dark:text-slate-500 font-medium">Công thức cơ bản:</span>
                                </p>
                                <code className="block p-2 bg-slate-900 text-amber-400 font-mono text-[10px] rounded-lg select-all pl-3">
                                  {res.formula}
                                </code>
                              </div>
                            </div>
                          );
                        })()
                      ) : (
                        <div className="text-center py-10 text-slate-400 dark:text-slate-500 flex flex-col items-center justify-center space-y-2">
                          <Search className="w-8 h-8 text-slate-300 stroke-[1.5]" />
                          <p className="text-xs font-medium">Hãy gõ một dạng động từ hoặc bấm các gợi ý nhanh bên trái để bắt đầu phân tích.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Mode 4: AI Question Clue Predictor */}
              {practiceMode === 'predictor' && (
                <div className="premium-card p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[1.5rem] space-y-6">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 dark:bg-amber-500/10 px-3 py-1 rounded-full border border-amber-100">AI PREDICTOR TOOL</span>
                    <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mt-2">Dự Đoán Đáp Án Từ Câu Hỏi</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Chọn trạng ngữ hoặc cấu trúc ngữ pháp trong câu hỏi để đoán chính xác hình thái động từ (V1, V2, V3, V-ing) cần chia.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Control Panel */}
                    <div className="space-y-4">
                      {/* Select Clue */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">1. Chọn Dấu Hiệu/Cụm Từ trong Câu Hỏi</label>
                        <select
                          value={predictorClue}
                          onChange={(e) => setPredictorClue(e.target.value)}
                          className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                        >
                          <optgroup label="Thì Quá khứ">
                            <option value="yesterday">yesterday (hôm qua)</option>
                            <option value="ago">... ago (cách đây...)</option>
                            <option value="last_week">last week / last month</option>
                            <option value="in_past_year">in + năm quá khứ (ví dụ: in 1995)</option>
                            <option value="by_the_time">by the time + Past Simple (trước mốc quá khứ)</option>
                            <option value="while">while (trong khi - hành động đang xảy ra)</option>
                          </optgroup>
                          <optgroup label="Thì Hiện tại hoàn thành">
                            <option value="since">since + mốc thời gian</option>
                            <option value="for">for + khoảng thời gian</option>
                            <option value="already">already (đã... rồi)</option>
                            <option value="yet">yet (chưa - câu phủ định/nghi vấn)</option>
                            <option value="so_far">so far / up to now (cho đến nay)</option>
                          </optgroup>
                          <optgroup label="Thì Hiện tại tiếp diễn">
                            <option value="now">now / right now (bây giờ)</option>
                            <option value="at_the_moment">at the moment</option>
                            <option value="look_listen">Look! / Listen! (Từ cảm thán gây chú ý)</option>
                          </optgroup>
                          <optgroup label="Thì Tương lai">
                            <option value="tomorrow">tomorrow (ngày mai)</option>
                            <option value="next_week">next week / next year</option>
                          </optgroup>
                          <optgroup label="Thì Hiện tại đơn">
                            <option value="always">always / usually / often (Trạng từ tần suất)</option>
                            <option value="everyday">every day / every week</option>
                          </optgroup>
                          <optgroup label="Cấu trúc Động từ đặc biệt">
                            <option value="modal_verbs">modal verbs (should, can, must...)</option>
                            <option value="to_infinitive_verbs">decide / want / plan (yêu cầu to + V1)</option>
                            <option value="gerund_verbs">enjoy / avoid / practice (yêu cầu V-ing)</option>
                          </optgroup>
                        </select>
                      </div>

                      {/* Select Verb to Preview */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">2. Chọn Động Từ Muốn Chia Thử</label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {['eat', 'write', 'go', 'swim', 'sleep', 'do'].map(v => (
                            <button
                              key={v}
                              type="button"
                              onClick={() => setPredictorVerb(v)}
                              className={cn(
                                "py-2 rounded-xl text-xs font-black transition-all border cursor-pointer",
                                predictorVerb === v
                                  ? "bg-amber-600 border-amber-600 text-white"
                                  : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400"
                              )}
                            >
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Result Panel */}
                    <div className="p-5 bg-amber-50/20 dark:bg-amber-500/10 border border-amber-200/50 rounded-2xl space-y-4">
                      <div className="border-b border-slate-200 dark:border-slate-700 pb-2">
                        <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">DỰ ĐOÁN HÌNH THÁI CHIA ĐÚNG</span>
                        <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 mt-1">AI Prediction Output</h4>
                      </div>

                      {(() => {
                        const res = predictVerbFormFromClue(predictorClue, predictorVerb, COMMON_VERBS);
                        return (
                          <div className="space-y-4 animate-in fade-in duration-300">
                            {/* Expected Form */}
                            <div className="p-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-250 rounded-xl">
                              <span className="text-[10px] font-mono text-amber-800 font-bold uppercase block">HÌNH THÁI CẦN CHIA (EXPECTED FORM)</span>
                              <span className="text-sm font-black text-amber-900 mt-0.5 block">{res.predictedForm}</span>
                            </div>

                            {/* Sample Answer */}
                            <div className="space-y-1">
                              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase block">ĐÁP ÁN DỰ ĐOÁN CHO TỪ "{predictorVerb.toUpperCase()}":</span>
                              <p className="text-base font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 border border-emerald-200 rounded text-xs">ANSWER</span>
                                <span className="text-emerald-700">{res.predictedAnswer}</span>
                              </p>
                            </div>

                            {/* Grammar Rule */}
                            <div className="space-y-1 text-xs">
                              <p className="font-bold text-slate-805 flex items-center gap-1">
                                <span>📚</span> <span className="text-slate-400 dark:text-slate-500 font-medium">Quy tắc ngữ pháp:</span>
                              </p>
                              <p className="text-slate-650 font-semibold leading-relaxed pl-5">{res.explanation}</p>
                            </div>

                            {/* Contextual Example */}
                            <div className="space-y-1 text-xs">
                              <p className="font-bold text-slate-805 flex items-center gap-1">
                                <span>💡</span> <span className="text-slate-400 dark:text-slate-500 font-medium">Ví dụ minh họa cụ thể:</span>
                              </p>
                              <p className="text-slate-705 font-bold leading-relaxed pl-5 italic select-all font-serif">
                                "{res.sampleSentence}"
                              </p>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        );
}
