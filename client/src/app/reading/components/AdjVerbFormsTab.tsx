'use client';

import React, { useState } from 'react';
import { 
  Search, Sparkles, Tag, CheckCircle2, AlertTriangle, 
  BookOpen, Layers, Filter, Check, HelpCircle, RefreshCcw,
  Zap, Volume2, ShieldCheck, ArrowRight, Table, Flame, Bookmark
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  ADJ_VERB_RULES_DATA, 
  IRREGULAR_VERBS_CATEGORIZED, 
  AdjVerbRule,
  IrregularVerbGroup 
} from '../grammarData';

interface AdjVerbFormsTabProps {
  speak: (text: string) => void;
}

export default function AdjVerbFormsTab({ speak }: AdjVerbFormsTabProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showIrregularTable, setShowIrregularTable] = useState(false);
  const [quizSelection, setQuizSelection] = useState<Record<number, string>>({});

  const filterTabs = [
    { id: 'all', label: 'Tất cả (8 Chuyên Đề)' },
    { id: 'adj_suffixes', label: '🎨 Hậu Tố Tính Từ' },
    { id: 'adj_ed_ing', label: '⚡ Tính Từ -ED vs -ING' },
    { id: 'adj_osascomp', label: '📐 Trật Tự OSASCOMP' },
    { id: 'adj_comparison', label: '📊 Cấp So Sánh' },
    { id: 'verb_suffixes', label: '⚡ Đuôi Động Từ' },
    { id: 'verb_sv_agreement', label: '🤝 Hòa Hợp Chủ Vị' },
    { id: 'verb_patterns', label: '🔄 To-V / V-ing / Bare' },
    { id: 'verb_passive_reduced', label: '🛡️ Bị Động & Rút Gọn' },
  ];

  const filteredRules = ADJ_VERB_RULES_DATA.filter(rule => {
    const matchesCat = activeCategory === 'all' || rule.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.items.some(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.examples.some(ex => ex.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    return matchesCat && matchesSearch;
  });

  // Interactive Quick Check mini questions
  const miniQuestions = [
    {
      word: 'The presentation was very ______ (interest).',
      options: ['interested', 'interesting'],
      answer: 'interesting',
      explanation: '"presentation" (bài thuyết trình) là sự vật/sự việc mang bản chất thu hút người nghe -> Chọn tính từ đuôi -ING.'
    },
    {
      word: 'Please respond in a ______ (timely / time / timely manner) fashion.',
      options: ['timely', 'timing'],
      answer: 'timely',
      explanation: '"timely" là TÍNH TỪ mang nghĩa "kịp thời" (đuôi -ly của tính từ, xuất phát từ danh từ time + ly).'
    },
    {
      word: 'The committee decided ______ (approve) the budget.',
      options: ['to approve', 'approving'],
      answer: 'to approve',
      explanation: '"decide" luôn đi với động từ nguyên mẫu có to: decide to V (quyết định làm gì).'
    },
    {
      word: 'The number of tourists ______ (increase) sharply this summer.',
      options: ['has increased', 'have increased'],
      answer: 'has increased',
      explanation: '"The number of + N số nhiều" luôn đi với ĐỘNG TỪ SỐ ÍT (has increased).'
    },
    {
      word: 'The cars ______ (manufacture) in Germany are reliable.',
      options: ['manufacturing', 'manufactured'],
      answer: 'manufactured',
      explanation: 'Rút gọn mệnh đề quan hệ dạng BỊ ĐỘNG: "cars [which are] manufactured..." -> Dùng V3/ed ("manufactured").'
    }
  ];

  const handleQuizAnswer = (qIdx: number, selected: string) => {
    setQuizSelection(prev => ({ ...prev, [qIdx]: selected }));
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-900 p-8 sm:p-10 text-white shadow-xl">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-black uppercase tracking-wider text-cyan-200 border border-white/20">
            <Sparkles className="w-4 h-4 text-amber-300" /> Bí Kíp Chia Tính Từ & Động Từ
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Chinh Phục Quy Tắc Chia Tính Từ (-ed/-ing, OSASCOMP) & Động Từ (S-V, To-V/V-ing, Bị Động)
          </h2>
          <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed font-medium">
            Nắm vững tuyệt chiêu nhận diện hậu tố, bí kíp phân biệt tính từ cảm xúc (-ed) vs bản chất (-ing), trật tự tính từ trước danh từ, quy tắc hòa hợp chủ vị và dạng thức động từ trong đề thi TOEIC & IELTS.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs font-bold text-cyan-200">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Phân từ -ED / -ING</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <Tag className="w-4 h-4 text-cyan-300" />
              <span>Trật tự OSASCOMP</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Hòa Hợp Chủ Vị (S-V Agreement)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <BookOpen className="w-4 h-4 text-pink-300" />
              <span>To-V vs V-ing vs Bare V</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Tìm quy tắc, hậu tố, cặp từ -ed/-ing, S-V agreement..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>

          <button
            onClick={() => setShowIrregularTable(!showIrregularTable)}
            className={cn(
              "px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border shadow-sm",
              showIrregularTable
                ? "bg-purple-600 text-white border-purple-600 shadow-md"
                : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-purple-400"
            )}
          >
            <Table className="w-4 h-4 text-purple-400" />
            <span>{showIrregularTable ? 'Ẩn Bảng Động Từ Bất Quy Tắc' : '📖 Xem Bảng 4 Nhóm ĐT Bất Quy Tắc'}</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer border",
                activeCategory === tab.id
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 border-slate-900 dark:border-slate-100 shadow-md scale-105"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-400"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Irregular Verbs Table Modal/Section */}
      {showIrregularTable && (
        <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl border-2 border-purple-500/30 shadow-xl space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Flame className="w-5 h-5 text-purple-500" />
                Bảng 4 Nhóm Động Từ Bất Quy Tắc Dễ Nhớ Nhất (Essential Irregular Verbs)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                Thay vì học vẹt 360 từ, hãy gom chúng thành 4 nhóm theo quy luật biến đổi âm để nhớ lâu 100%!
              </p>
            </div>
            <span className="text-[10px] font-black px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full uppercase">
              Bắt Buộc Nhớ Cho Part 5 & 6
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {IRREGULAR_VERBS_CATEGORIZED.map((grp, idx) => (
              <div key={idx} className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-sm text-purple-700 dark:text-purple-300">{grp.groupName}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-purple-200 dark:bg-purple-900 text-purple-900 dark:text-purple-200 rounded font-bold">
                    {grp.pattern}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{grp.descriptionVi}</p>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-bold uppercase text-[10px]">
                        <th className="py-1.5 px-2">V1 (Base)</th>
                        <th className="py-1.5 px-2">V2 (Past)</th>
                        <th className="py-1.5 px-2">V3 (P.P)</th>
                        <th className="py-1.5 px-2">Nghĩa</th>
                        <th className="py-1.5 px-1 text-center">Nghe</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 font-medium">
                      {grp.verbs.map((v, vIdx) => (
                        <tr key={vIdx} className="hover:bg-white dark:hover:bg-slate-800/80 transition-colors">
                          <td className="py-2 px-2 font-bold text-slate-800 dark:text-slate-100">{v.v1}</td>
                          <td className="py-2 px-2 font-bold text-indigo-600 dark:text-indigo-400">{v.v2}</td>
                          <td className="py-2 px-2 font-bold text-emerald-600 dark:text-emerald-400">{v.v3}</td>
                          <td className="py-2 px-2 text-slate-600 dark:text-slate-300 text-[11px]">{v.meaningVi}</td>
                          <td className="py-2 px-1 text-center">
                            <button
                              onClick={() => speak(`${v.v1}, ${v.v2}, ${v.v3}`)}
                              className="p-1 text-slate-400 hover:text-purple-600 cursor-pointer"
                              title="Nghe phát âm"
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
            ))}
          </div>
        </div>
      )}

      {/* Main Rules Display */}
      <div className="space-y-8">
        {filteredRules.map(rule => (
          <div
            key={rule.id}
            className="p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-6 transition-all hover:shadow-lg"
          >
            {/* Header */}
            <div className="flex items-start justify-between flex-wrap gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider text-white bg-gradient-to-r shadow-sm",
                    rule.color
                  )}>
                    {rule.badge}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100">
                  {rule.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                  {rule.description}
                </p>
              </div>

              {rule.formula && (
                <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                  {rule.formula}
                </div>
              )}
            </div>

            {/* Rule Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rule.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-700/60 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <h4 className="font-black text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-lg bg-blue-500 text-white text-[10px] flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      {item.label}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                      {item.rule}
                    </p>

                    {/* Examples */}
                    <div className="space-y-1.5 pt-1">
                      {item.examples.map((ex, exIdx) => (
                        <div
                          key={exIdx}
                          className="text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center justify-between gap-2"
                        >
                          <span className="leading-snug">{ex}</span>
                          <button
                            onClick={() => speak(ex.split('(')[0])}
                            className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex-shrink-0 cursor-pointer"
                            title="Nghe câu mẫu"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {item.examTip && (
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl text-xs font-bold text-amber-800 dark:text-amber-300 flex items-start gap-2 mt-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>{item.examTip}</span>
                    </div>
                  )}

                  {item.note && (
                    <div className="p-2.5 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 rounded-xl text-xs font-medium text-blue-800 dark:text-blue-300 mt-2">
                      💡 {item.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Quick Check Mini Quiz */}
      <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl shadow-xl space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-black uppercase tracking-wider text-amber-300">
              <Zap className="w-4 h-4" /> Quick Check 5 Giây
            </div>
            <h3 className="text-xl sm:text-2xl font-black mt-2">Thử Thách Chia Tính Từ & Động Từ Siêu Tốc</h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">Bấm chọn đáp án để kiểm tra ngay phản xạ ngữ pháp của bạn:</p>
          </div>
          <button
            onClick={() => setQuizSelection({})}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer text-slate-200"
          >
            <RefreshCcw className="w-3.5 h-3.5" /> Làm lại
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {miniQuestions.map((q, qIdx) => {
            const selected = quizSelection[qIdx];
            const isAnswered = selected !== undefined;
            const isCorrect = selected === q.answer;

            return (
              <div key={qIdx} className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-bold text-sm text-white">
                    <span className="text-amber-400 font-black mr-2">Câu {qIdx + 1}:</span>
                    {q.word}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {q.options.map((opt, oIdx) => {
                    const isOptionSelected = selected === opt;
                    const isOptionCorrect = opt === q.answer;

                    return (
                      <button
                        key={oIdx}
                        disabled={isAnswered}
                        onClick={() => handleQuizAnswer(qIdx, opt)}
                        className={cn(
                          "p-2.5 rounded-xl text-xs font-bold transition-all text-center border cursor-pointer",
                          !isAnswered && "bg-white/10 hover:bg-white/20 border-white/10 text-white",
                          isAnswered && isOptionCorrect && "bg-emerald-500 text-white border-emerald-500 font-black",
                          isAnswered && isOptionSelected && !isOptionCorrect && "bg-rose-500 text-white border-rose-500",
                          isAnswered && !isOptionCorrect && !isOptionSelected && "opacity-40 bg-white/5 border-white/5 text-slate-400",
                          isAnswered && "cursor-default"
                        )}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div className={cn(
                    "p-3 rounded-xl text-xs font-medium space-y-1 animate-in fade-in duration-300",
                    isCorrect ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-200" : "bg-rose-500/20 border border-rose-500/30 text-rose-200"
                  )}>
                    <p className="font-black">{isCorrect ? '✅ Chính xác!' : '❌ Chưa chính xác!'}</p>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
