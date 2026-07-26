'use client';

import React, { useState } from 'react';
import { Compass, ExternalLink, Info, Timer, Notebook, Trash2, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { INTEGRATED_PLATFORMS } from '@/data/ieltsData';

export default function IeltsPlatformsSection() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('study4');
  const [notes, setNotes] = useState<string>('');
  
  // Timer States
  const [timeLeft, setTimeLeft] = useState<number>(3600); // 1 hour default
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Vocabulary States
  const [vocabWord, setVocabWord] = useState('');
  const [vocabMeaning, setVocabMeaning] = useState('');
  const [vocabList, setVocabList] = useState<{ word: string; meaning: string }[]>([]);

  // Hydrate states from localStorage after client-side mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedNotes = localStorage.getItem('ielts_practice_notes');
      if (savedNotes) {
        setNotes(savedNotes);
      }

      const savedVocab = localStorage.getItem('ielts_vocab_list');
      if (savedVocab) {
        try {
          setVocabList(JSON.parse(savedVocab));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  // Local storage save for notes
  const handleNotesChange = (val: string) => {
    setNotes(val);
    localStorage.setItem('ielts_practice_notes', val);
  };

  React.useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setTimerActive(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerActive]);

  const toggleTimer = () => setTimerActive(!timerActive);
  const resetTimer = (secs: number = 3600) => {
    setTimerActive(false);
    setTimeLeft(secs);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const addVocab = () => {
    if (!vocabWord.trim()) return;
    const newList = [...vocabList, { word: vocabWord.trim(), meaning: vocabMeaning.trim() }];
    setVocabList(newList);
    localStorage.setItem('ielts_vocab_list', JSON.stringify(newList));
    setVocabWord('');
    setVocabMeaning('');
  };

  const deleteVocab = (idx: number) => {
    const newList = vocabList.filter((_, i) => i !== idx);
    setVocabList(newList);
    localStorage.setItem('ielts_vocab_list', JSON.stringify(newList));
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
          <Compass className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-800">Hệ thống liên kết & Tài nguyên IELTS chuyên sâu</h2>
          <p className="text-sm text-slate-500 font-medium">Tích hợp tài nguyên luyện thi từ các thương hiệu hàng đầu: Study4, IELTS Online Tests, DailyDictation, YouPass, VSTEP</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left: Interactive Platform Selection Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Chips Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {INTEGRATED_PLATFORMS.map(platform => {
              const isSelected = selectedPlatform === platform.id;
              return (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={cn(
                    "p-3 rounded-2xl border text-center transition-all duration-300 font-black text-xs flex flex-col items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95",
                    isSelected
                      ? `bg-gradient-to-br ${platform.accentColor} text-white border-transparent scale-105 shadow-md`
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-350 hover:bg-slate-50/50"
                  )}
                >
                  <span className="text-base">
                    {platform.id === 'study4' ? '🎓' : 
                     platform.id === 'ieltsonlinetests' ? '📝' : 
                     platform.id === 'dailydictation' ? '🎧' : 
                     platform.id === 'youpass' ? '💡' : '⭐'}
                  </span>
                  {platform.name}
                </button>
              );
            })}
          </div>

          {/* Selected Platform Detail Card */}
          {(() => {
            const current = INTEGRATED_PLATFORMS.find(p => p.id === selectedPlatform)!;
            return (
              <div className="premium-card p-6 md:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full text-white bg-gradient-to-r",
                      current.accentColor
                    )}>
                      Nền tảng tích hợp
                    </span>
                    <h3 className="text-xl font-bold text-slate-800 pt-1">{current.title}</h3>
                  </div>
                  <a
                    href={current.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex-shrink-0"
                  >
                    Ghé thăm website <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed font-medium">{current.description}</p>

                {/* Feature Bullets */}
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Tính năng nổi bật & phương pháp</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {current.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className={cn("w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-gradient-to-r", current.accentColor)} />
                        <span className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendation Links */}
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Liên kết ôn luyện đề xuất</span>
                  <div className="flex flex-wrap gap-3">
                    {current.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
                      >
                        {link.label} <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Simulated Browser Web View */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trải nghiệm nhúng trực tiếp (Iframe Sandbox)</span>
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 rounded text-[10px] font-bold text-amber-700 border border-amber-200">
                      <Info className="w-3 h-3" /> Chặn nạp nếu trùng nguồn bảo mật
                    </div>
                  </div>
                  <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-inner bg-slate-900">
                    {/* Browser header bar */}
                    <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-500 block" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500 block" />
                        <span className="w-3 h-3 rounded-full bg-green-500 block" />
                      </div>
                      <div className="bg-slate-900 rounded-md text-[10px] text-slate-400 font-mono py-1 px-4 w-72 text-center truncate">
                        {current.url}
                      </div>
                      <a
                        href={current.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold text-slate-300 hover:text-white flex items-center gap-1"
                      >
                        Mở Tab Mới <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    {/* Iframe element */}
                    <div className="h-96 w-full bg-white relative">
                      <iframe
                        src={current.url}
                        title={current.name}
                        className="w-full h-full border-0"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      />
                      {/* overlay helper text */}
                      <div className="absolute bottom-2 right-2 bg-slate-900/90 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold pointer-events-none">
                        💡 Nếu website không tải được, bạn vui lòng nhấp "Mở Tab Mới" ở phía trên.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Right: Bàn Học Thông Minh (Practice Companion Dashboard) */}
        <div className="space-y-6">
          
          {/* Mock Test Timer Box */}
          <div className="premium-card p-6 bg-slate-900 text-white space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <Timer className="w-5 h-5 text-indigo-400 animate-pulse" />
              <h4 className="text-sm font-black uppercase tracking-wider text-slate-200">Đồng hồ phòng thi (Timer)</h4>
            </div>
            <div className="text-center py-4">
              <div className="text-4xl font-mono font-black text-indigo-300 tracking-wider">
                {formatTime(timeLeft)}
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                Thời gian làm đề mô phỏng
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={toggleTimer}
                className={cn(
                  "flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center",
                  timerActive ? "bg-red-500 hover:bg-red-600 text-white" : "bg-indigo-500 hover:bg-indigo-600 text-white"
                )}
              >
                {timerActive ? 'Tạm Dừng' : 'Bắt Đầu'}
              </button>
              <button
                onClick={() => resetTimer(3600)}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-slate-300 transition-all cursor-pointer"
              >
                1 Giờ
              </button>
              <button
                onClick={() => resetTimer(2400)}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-slate-300 transition-all cursor-pointer"
              >
                40 Phút
              </button>
            </div>
          </div>

          {/* IELTS Scratchpad & Notebook */}
          <div className="premium-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Notebook className="w-5 h-5 text-slate-500" />
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">Sổ tay nháp (Scratchpad)</h4>
              </div>
              <button
                onClick={() => handleNotesChange('')}
                className="text-[10px] font-bold text-red-500 hover:text-red-600 flex items-center gap-1 cursor-pointer"
                title="Xóa nháp"
              >
                <Trash2 className="w-3.5 h-3.5" /> Xóa
              </button>
            </div>
            <textarea
              value={notes}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder="Ghi chú nhanh từ vựng, cấu trúc câu hay ghi chép lại đáp án khi đang làm bài..."
              className="w-full h-36 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium leading-relaxed resize-none"
            />
            <span className="text-[10px] font-bold text-slate-400 text-right block">Tự động lưu vào bộ nhớ cục bộ</span>
          </div>

          {/* Quick Vocabulary Bank */}
          <div className="premium-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">Từ vựng mới lưu (Vocab)</h4>
              </div>
              <span className="px-2 py-0.5 bg-slate-100 rounded-full text-[10px] font-black text-slate-500">
                {vocabList.length} từ
              </span>
            </div>
            
            {/* Input section */}
            <div className="space-y-2">
              <input
                type="text"
                value={vocabWord}
                onChange={(e) => setVocabWord(e.target.value)}
                placeholder="Từ mới (Ví dụ: Paraphrase)"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={vocabMeaning}
                  onChange={(e) => setVocabMeaning(e.target.value)}
                  placeholder="Ý nghĩa / Ngữ cảnh"
                  className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium"
                />
                <button
                  onClick={addVocab}
                  className="px-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95"
                >
                  Thêm
                </button>
              </div>
            </div>

            {/* Vocab List Scroll */}
            <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
              {vocabList.length === 0 ? (
                <p className="text-[11px] text-slate-400 font-medium text-center py-4">Chưa có từ vựng nào được ghi lại.</p>
              ) : (
                vocabList.map((item, i) => (
                  <div key={i} className="flex justify-between items-start p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs group">
                    <div className="space-y-0.5">
                      <strong className="text-slate-800 block font-bold">{item.word}</strong>
                      <span className="text-slate-500 block font-medium text-[11px]">{item.meaning}</span>
                    </div>
                    <button
                      onClick={() => deleteVocab(i)}
                      className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 cursor-pointer"
                      title="Xóa từ vựng"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
