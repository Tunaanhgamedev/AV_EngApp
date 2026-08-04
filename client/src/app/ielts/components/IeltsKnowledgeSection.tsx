'use client';

import React, { useState } from 'react';
import { BookOpenCheck, Search, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { KNOWLEDGE_DATA, ENGLISH_PRACTICE_DB } from '@/data/ieltsData';

export default function IeltsKnowledgeSection() {
  const [knowledgeTab, setKnowledgeTab] = useState<string>('methods');
  const [knowledgeSearch, setKnowledgeSearch] = useState<string>('');
  const [checkedPlanItems, setCheckedPlanItems] = useState<string[]>([]);

  // Hydrate from localStorage
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPlan = localStorage.getItem('ielts_checked_plan_items');
      if (savedPlan) {
        try {
          setCheckedPlanItems(JSON.parse(savedPlan));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const togglePlanItem = (itemId: string) => {
    const next = checkedPlanItems.includes(itemId)
      ? checkedPlanItems.filter(id => id !== itemId)
      : [...checkedPlanItems, itemId];
    setCheckedPlanItems(next);
    localStorage.setItem('ielts_checked_plan_items', JSON.stringify(next));
  };

  // Interactive English Practice States
  const [activeDictationId, setActiveDictationId] = useState<string>('dict-1');
  const [dictationInput, setDictationInput] = useState<string>('');
  const [showDictationResult, setShowDictationResult] = useState<boolean>(false);
  const [revealedTranscript, setRevealedTranscript] = useState<boolean>(false);
  
  // Essay Reader State
  const [activeEssayId, setActiveEssayId] = useState<string>('essay-1');
  const [vocabSearch, setVocabSearch] = useState<string>('');

  const addVocabFromLibrary = (word: string, meaning: string) => {
    if (typeof window === 'undefined') return;
    const savedVocab = localStorage.getItem('ielts_vocab_list');
    let vocabList: { word: string; meaning: string }[] = [];
    if (savedVocab) {
      try {
        vocabList = JSON.parse(savedVocab);
      } catch (e) {
        console.error(e);
      }
    }
    if (vocabList.some(item => item.word.toLowerCase() === word.toLowerCase())) {
      return;
    }
    const next = [...vocabList, { word, meaning }];
    localStorage.setItem('ielts_vocab_list', JSON.stringify(next));
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
          <BookOpenCheck className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">Cẩm nang & Học liệu Thực hành liên kết</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Tích hợp tài liệu chính tả, từ vựng ngữ cảnh, bài viết luận mẫu và cấu trúc câu chuyển đổi chứng chỉ thực tế</p>
        </div>
      </div>

      <div className="premium-card p-6 md:p-8 space-y-6">
        {/* Tabs Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'methods', label: '📖 Phương Pháp Học' },
              { id: 'practice', label: '⚡ Luyện Nghe & Từ Vựng' },
              { id: 'essays', label: '📝 Bài Mẫu & Viết Thư' },
              { id: 'vstep', label: '🎖️ Quy Đổi VSTEP' },
            ].map(tab => {
              const isSelected = knowledgeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setKnowledgeTab(tab.id)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-sm active:scale-95",
                    isSelected
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* General Search (Except for specialized search tabs) */}
          {knowledgeTab !== 'practice' && knowledgeTab !== 'essays' && (
            <div className="relative w-full md:w-72">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              </span>
              <input
                type="text"
                value={knowledgeSearch}
                onChange={(e) => setKnowledgeSearch(e.target.value)}
                placeholder="Tìm kiếm kiến thức..."
                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>
          )}
        </div>

        {/* Active Content Area */}
        <div className="space-y-6">
          
          {/* 1. METHODS TAB */}
          {knowledgeTab === 'methods' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {KNOWLEDGE_DATA.methods
                .filter(m => 
                  m.title.toLowerCase().includes(knowledgeSearch.toLowerCase()) ||
                  m.content.toLowerCase().includes(knowledgeSearch.toLowerCase())
                )
                .map(m => {
                  const completedStepsCount = m.steps.filter((_, idx) => 
                    checkedPlanItems.includes(`${m.id}-step-${idx}`)
                  ).length;
                  const progressPercent = Math.round((completedStepsCount / m.steps.length) * 100);

                  return (
                    <div key={m.id} className="p-5 bg-slate-50/50 hover:bg-slate-50 dark:bg-slate-800 border border-slate-200/60 rounded-2xl flex flex-col justify-between space-y-4 transition-all duration-300">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{m.icon}</span>
                          <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-slate-200 text-slate-600 dark:text-slate-300 rounded">
                            {m.source}
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 leading-snug">{m.title}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{m.content}</p>
                        
                        {/* Progress Tracker bar */}
                        <div className="space-y-1.5 pt-1">
                          <div className="flex justify-between text-[9px] font-bold text-slate-400 dark:text-slate-500">
                            <span>Lộ trình thực hành</span>
                            <span>{progressPercent}% Hoàn tất</span>
                          </div>
                          <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                          </div>
                        </div>

                        {/* Steps with Checkboxes */}
                        <div className="space-y-2 pt-2">
                          {m.steps.map((step, idx) => {
                            const stepId = `${m.id}-step-${idx}`;
                            const isChecked = checkedPlanItems.includes(stepId);
                            return (
                              <label key={idx} className="flex items-start gap-2.5 cursor-pointer select-none">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => togglePlanItem(stepId)}
                                  className="mt-0.5 rounded border-slate-300 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500 cursor-pointer h-3.5 w-3.5"
                                />
                                <span className={cn(
                                  "text-xs leading-relaxed font-semibold transition-all duration-200",
                                  isChecked ? "text-slate-400 dark:text-slate-500 line-through" : "text-slate-600 dark:text-slate-300"
                                )}>
                                  {step}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Top Tip Box */}
                      <div className="p-3 bg-amber-50/70 border border-amber-100 rounded-xl text-[11px] font-semibold text-amber-700 dark:text-amber-400 leading-relaxed">
                        💡 <strong>Lời khuyên:</strong> {m.tip}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {/* 2. INTERACTIVE PRACTICE (LISTENING & VOCABULARY DICTATION) */}
          {knowledgeTab === 'practice' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left side: Dictation player */}
              <div className="p-6 bg-slate-50 dark:bg-slate-800 border border-slate-200/80 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-slate-800 dark:text-slate-100">🎧 Phòng nghe chép chính tả (DailyDictation)</h4>
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-full">
                    Tương tác trực tiếp
                  </span>
                </div>

                {/* Exercise select */}
                <div className="flex flex-wrap gap-2">
                  {ENGLISH_PRACTICE_DB.dictation.map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveDictationId(item.id);
                        setDictationInput('');
                        setShowDictationResult(false);
                        setRevealedTranscript(false);
                      }}
                      className={cn(
                        "px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer",
                        activeDictationId === item.id
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                          : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:bg-slate-800"
                      )}
                    >
                      {item.title} ({item.difficulty})
                    </button>
                  ))}
                </div>

                {/* Audio Controls */}
                {(() => {
                  const activeEx = ENGLISH_PRACTICE_DB.dictation.find(d => d.id === activeDictationId) || ENGLISH_PRACTICE_DB.dictation[0];
                  return (
                    <div className="space-y-4 pt-2">
                      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col gap-2">
                        <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Máy phát âm thanh (Audio Loop Player)</span>
                        <audio key={activeEx.id} src={activeEx.audioUrl} controls className="w-full" />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-black text-slate-500 dark:text-slate-400">Nội dung bạn nghe được:</label>
                        <textarea
                          value={dictationInput}
                          onChange={(e) => setDictationInput(e.target.value)}
                          placeholder="Gõ lại chính xác các câu từ bạn nghe thấy..."
                          rows={3}
                          className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-500 bg-white dark:bg-slate-900 leading-relaxed"
                        />
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowDictationResult(true)}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black transition-all cursor-pointer shadow-sm active:scale-95"
                        >
                          Kiểm tra lỗi chính tả
                        </button>
                        <button
                          onClick={() => setRevealedTranscript(true)}
                          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-black transition-all cursor-pointer"
                        >
                          Hiện transcript gốc
                        </button>
                        <button
                          onClick={() => {
                            setDictationInput('');
                            setShowDictationResult(false);
                            setRevealedTranscript(false);
                          }}
                          className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
                        >
                          Làm lại
                        </button>
                      </div>

                      {/* Spelled verification result */}
                      {showDictationResult && (
                        <div className="space-y-2 pt-2">
                          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Kết quả so khớp bắt từ:</span>
                          <div className="p-4 bg-slate-900 text-white rounded-xl font-mono text-xs leading-relaxed flex flex-wrap gap-x-1.5 gap-y-1">
                            {activeEx.transcript.split(' ').map((word, idx) => {
                              const cleanWord = word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
                              const userWords = dictationInput.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(/\s+/);
                              const cleanUserWord = userWords[idx] || '';
                              const isCorrect = cleanWord === cleanUserWord;
                              return (
                                <span key={idx} className={cn("px-1 rounded font-bold transition-colors", isCorrect ? "text-green-400 bg-green-950/40" : "text-red-400 bg-red-950/60 underline decoration-wavy")}>
                                  {word}
                                </span>
                              );
                            })}
                          </div>
                          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 block italic">Chữ màu xanh: chính xác | Chữ màu đỏ gạch chân: sai chính tả hoặc bỏ sót</span>
                        </div>
                      )}

                      {revealedTranscript && (
                        <div className="p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 rounded-xl text-xs font-semibold text-amber-800 leading-relaxed space-y-1">
                          <strong>Transcript chuẩn:</strong>
                          <p>{activeEx.transcript}</p>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Right side: YouPass Vocabulary database */}
              <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-black text-slate-800 dark:text-slate-100">💡 Thư viện Từ vựng Ngữ cảnh (YouPass style)</h4>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Bấm dấu cộng (+) để thêm từ vựng này trực tiếp vào Sổ tay của bạn</p>
                  </div>
                  {/* Search inside Vocab */}
                  <div className="relative w-40">
                    <input
                      type="text"
                      value={vocabSearch}
                      onChange={(e) => setVocabSearch(e.target.value)}
                      placeholder="Tìm từ vựng..."
                      className="w-full pl-3 pr-8 py-1.5 text-[11px] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-indigo-500 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                  {ENGLISH_PRACTICE_DB.vocab
                    .filter(item => 
                      item.phrase.toLowerCase().includes(vocabSearch.toLowerCase()) ||
                      item.meaning.toLowerCase().includes(vocabSearch.toLowerCase())
                    )
                    .map((item, idx) => (
                      <div key={idx} className="p-4 bg-slate-50/70 hover:bg-slate-50 dark:bg-slate-800 border border-slate-200/60 rounded-xl flex items-start justify-between gap-3 group transition-colors">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-slate-800 dark:text-slate-100">{item.phrase}</span>
                            <span className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-1.5 py-0.5 rounded">
                              {item.type}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 font-bold">👉 {item.meaning}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold italic">"{item.context}"</p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Từ đồng nghĩa: {item.synonyms}</p>
                        </div>
                        <button
                          onClick={() => addVocabFromLibrary(item.phrase, item.meaning)}
                          className="p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 hover:bg-indigo-50 dark:bg-indigo-500/10 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:text-indigo-400 rounded-lg cursor-pointer transition-colors shadow-sm"
                          title="Thêm vào Sổ tay từ vựng của bạn"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. ESSAYS & COMPLAINT LETTERS */}
          {knowledgeTab === 'essays' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* List items */}
              <div className="space-y-2">
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Danh sách bài mẫu & Mẫu thư</span>
                {ENGLISH_PRACTICE_DB.essays.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveEssayId(item.id)}
                    className={cn(
                      "w-full p-4 rounded-xl text-left border cursor-pointer transition-all",
                      activeEssayId === item.id
                        ? "bg-slate-900 border-slate-900 shadow-sm"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:bg-slate-800"
                    )}
                  >
                    <div className="flex justify-between items-start">
                      <strong className={cn("text-xs font-black block", activeEssayId === item.id ? "text-white" : "text-slate-800 dark:text-slate-100")}>
                        {item.title}
                      </strong>
                      <span className={cn("text-[9px] font-black px-1.5 py-0.5 rounded flex-shrink-0 ml-2", activeEssayId === item.id ? "bg-indigo-500 text-white" : "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400")}>
                        {item.band}
                      </span>
                    </div>
                    <p className={cn("text-[10px] font-semibold mt-1 line-clamp-1", activeEssayId === item.id ? "text-slate-400 dark:text-slate-500" : "text-slate-500 dark:text-slate-400")}>
                      {item.prompt}
                    </p>
                  </button>
                ))}
              </div>

              {/* Essay reader */}
              {(() => {
                const currentEssay = ENGLISH_PRACTICE_DB.essays.find(e => e.id === activeEssayId) || ENGLISH_PRACTICE_DB.essays[0];
                return (
                  <div className="lg:col-span-2 p-6 bg-slate-50 dark:bg-slate-800 border border-slate-200/80 rounded-2xl space-y-4">
                    <div className="space-y-2">
                      <span className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Đề Bài (Prompt)</span>
                      <h4 className="text-sm font-black text-slate-800 dark:text-slate-100">{currentEssay.prompt}</h4>
                    </div>

                    <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl space-y-3 shadow-sm max-h-[400px] overflow-y-auto pr-1">
                      <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block pb-1 border-b border-slate-100 dark:border-slate-800">Bài mẫu đạt chuẩn</span>
                      {currentEssay.essay.split('\n\n').map((para, idx) => (
                        <p key={idx} className="text-xs leading-relaxed font-semibold text-slate-700 dark:text-slate-300 whitespace-pre-line">
                          {para}
                        </p>
                      ))}
                    </div>

                    <div className="p-4 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 rounded-xl text-xs font-semibold text-indigo-800 leading-relaxed space-y-1">
                      <strong>Phân tích chiến thuật & Từ vựng đắt giá:</strong>
                      <p>{currentEssay.analysis}</p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* 4. VSTEP CONVERSION TAB */}
          {knowledgeTab === 'vstep' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Comparison Grid */}
              <div className="lg:col-span-2 space-y-3">
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Bảng quy đổi chứng chỉ năng lực ngoại ngữ</span>
                <div className="grid grid-cols-1 gap-2">
                  {KNOWLEDGE_DATA.vstep.comparison.map((row, i) => (
                    <div key={i} className={cn("p-4 bg-white dark:bg-slate-900 border-l-4 rounded-r-xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-3 transition-transform hover:scale-[1.01]", row.color)}>
                      <div>
                        <strong className="text-xs font-black text-slate-800 dark:text-slate-100">{row.vstep}</strong>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">{row.desc}</p>
                      </div>
                      <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800/50 rounded-lg text-xs font-black text-indigo-600 dark:text-indigo-400 flex-shrink-0 self-start sm:self-center">
                        {row.ielts}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Synergy points */}
              <div className="p-5 bg-gradient-to-br from-emerald-50 dark:from-emerald-950/30 to-green-50/50 border border-emerald-100 rounded-2xl space-y-4">
                <h4 className="text-xs font-black text-emerald-800 uppercase tracking-wider">🎯 Tính liên kết & bổ trợ ôn tập</h4>
                <ul className="space-y-3">
                  {KNOWLEDGE_DATA.vstep.comparison.map((_, i) => {
                    const syn = KNOWLEDGE_DATA.vstep.synergy[i] || '';
                    if (!syn) return null;
                    return (
                      <li key={i} className="flex items-start gap-2 text-xs font-medium text-emerald-700 dark:text-emerald-400 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                        <span>{syn}</span>
                      </li>
                    );
                  })}
                </ul>
                <a
                  href="https://vstep.fastreak.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all text-center block"
                >
                  Thi thử VSTEP tại Fastreak
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
