'use client';

import React, { useState } from 'react';
import { Sparkles, Loader2, HelpCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { TENSES_DATA } from './tenses-data';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function GraderTab() {
  const { user } = useAuth();
  
  const [targetTense, setTargetTense] = useState<string>(TENSES_DATA[0].name);
  const [userSentence, setUserSentence] = useState<string>('');
  const [checkingGrammar, setCheckingGrammar] = useState<boolean>(false);
  const [graderResult, setGraderResult] = useState<{
    isCorrect: boolean;
    score: number;
    correctedText: string;
    explanation: string;
  } | null>(null);

  const verifyGrammar = async () => {
    if (!user || checkingGrammar || !userSentence.trim()) {
      if (!user) alert('Vui lòng đăng nhập để sử dụng tính năng kiểm tra với AI!');
      return;
    }
    setCheckingGrammar(true);
    setGraderResult(null);
    try {
      const token = await user.getIdToken();
      const res = await fetch(`${API_BASE}/ai/verify-grammar-tense`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ tenseName: targetTense, userSentence })
      });
      if (res.ok) {
        const data = await res.json();
        setGraderResult(data);
      } else {
        alert('Kiểm tra thất bại. Vui lòng thử lại!');
      }
    } catch (e) {
      console.error(e);
      alert('Không thể kết nối máy chủ AI.');
    } finally {
      setCheckingGrammar(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form container */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-2 border-b pb-3">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            Kiểm tra câu viết của bạn cùng AI (12 Thì)
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase mb-2">1. Chọn thì bạn muốn viết</label>
              <select 
                value={targetTense}
                onChange={(e) => setTargetTense(e.target.value)}
                className="w-full p-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-primary text-sm font-bold bg-white"
              >
                {TENSES_DATA.map(t => (
                  <option key={t.name} value={t.name}>{t.nameVi} ({t.name})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase mb-2">2. Nhập câu tiếng Anh bạn tự viết</label>
              <textarea
                rows={4}
                placeholder={`Ví dụ: She had been working for five hours before the meeting started...`}
                value={userSentence}
                onChange={(e) => setUserSentence(e.target.value)}
                className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:border-primary text-base font-medium resize-none"
              />
            </div>

            <button
              onClick={verifyGrammar}
              disabled={checkingGrammar || !userSentence.trim()}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-indigo-650 hover:from-emerald-600 hover:to-indigo-700 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {checkingGrammar ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang phân tích cấu trúc...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Kiểm Tra Ngữ Pháp & Chia Thì Với AI
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results workspace */}
        {graderResult && (
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6 animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="font-black text-slate-800 text-lg">Kết quả phân tích</h3>
              <div className="flex items-center gap-2">
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider",
                  graderResult.isCorrect ? "bg-green-100 text-green-800" : "bg-rose-100 text-rose-800"
                )}>
                  {graderResult.isCorrect ? 'Chính Xác' : 'Cần Chỉnh Sửa'}
                </span>
                <span className="text-2xl font-black text-slate-800">{graderResult.score}/100đ</span>
              </div>
            </div>

            {/* Compare sentence */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1.5">
                <span className="text-[10px] font-black text-slate-400 uppercase">Câu của bạn</span>
                <p className="text-slate-700 font-bold leading-relaxed">{userSentence}</p>
              </div>
              <div className="p-4 bg-emerald-50/30 border border-emerald-100 rounded-2xl space-y-1.5">
                <span className="text-[10px] font-black text-emerald-700 uppercase">Bản gợi ý từ AI</span>
                <p className="text-emerald-950 font-black leading-relaxed">{graderResult.correctedText}</p>
              </div>
            </div>

            {/* Explanation text */}
            <div className="p-5 bg-indigo-50/20 border border-indigo-100 rounded-2xl space-y-2">
              <h4 className="text-indigo-950 font-black text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-500" /> Giải thích quy tắc & Nhận xét
              </h4>
              <p className="text-slate-650 text-sm leading-relaxed whitespace-pre-line font-medium">
                {graderResult.explanation}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Grammar Tips Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-black text-slate-800 text-md flex items-center gap-2 border-b pb-2">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            Mẹo chia thì từ AI
          </h3>
          <ul className="space-y-3.5 text-xs text-slate-550 leading-relaxed font-semibold">
            <li className="flex gap-2">
              <span className="text-emerald-500 flex-shrink-0">✔</span>
              <span><strong>Đọc kỹ trạng từ chỉ thời gian</strong>: Dấu hiệu chính xác giúp lựa chọn thì chuẩn.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-500 flex-shrink-0">✔</span>
              <span><strong>Chú ý chủ ngữ số ít/số nhiều</strong>: Tránh lỗi sơ đẳng như quên thêm &quot;s/es&quot; hoặc dùng nhầm &quot;has/have&quot;.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-500 flex-shrink-0">✔</span>
              <span><strong>Không dùng tiếp diễn với State Verbs</strong>: Các động từ trạng thái cảm xúc, nhận thức (know, believe, love, hate) hiếm khi chia ở tiếp diễn.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-500 flex-shrink-0">✔</span>
              <span><strong>Since và For</strong>: Mốc thời gian (since 2018) vs Khoảng thời gian (for 5 years) trong Hiện tại hoàn thành.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
