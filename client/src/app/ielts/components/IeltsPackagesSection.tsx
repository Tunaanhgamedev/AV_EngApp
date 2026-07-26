'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Zap, ArrowRight } from 'lucide-react';

export default function IeltsPackagesSection() {
  const router = useRouter();

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-800">Gói Luyện Thi IELTS Chuyên Sâu</h2>
          <p className="text-xs text-slate-400 font-bold">Chuyên đề AI sinh đề theo dạng bài cụ thể — luyện trọng tâm, tiến bộ nhanh hơn</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Writing Task 1 */}
        <div className="premium-card p-6 border-slate-100 hover:shadow-xl transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-100 text-amber-700">Writing Task 1</span>
              <span className="text-xs font-bold text-emerald-600">+100 XP</span>
            </div>
            <h3 className="text-lg font-black text-slate-800">📊 Mô Tả Biểu Đồ</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">Luyện viết Task 1: mô tả Bar, Line, Pie chart hoặc Table. AI sinh dữ liệu biểu đồ ngẫu nhiên và chấm bài 4 tiêu chí.</p>
          </div>
          <button onClick={() => router.push('/ielts/practice/writing?mode=task1_chart')} className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors">
            Luyện ngay <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Writing Task 2 */}
        <div className="premium-card p-6 border-slate-100 hover:shadow-xl transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-orange-100 text-orange-700">Writing Task 2</span>
              <span className="text-xs font-bold text-emerald-600">+100 XP</span>
            </div>
            <h3 className="text-lg font-black text-slate-800">✍️ Viết Luận Học Thuật</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">Luyện viết Task 2: Opinion, Discussion, Problem/Solution Essay. AI chấm điểm và sửa bài chi tiết từng tiêu chí.</p>
          </div>
          <button onClick={() => router.push('/ielts/practice/writing?mode=task2_essay')} className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors">
            Luyện ngay <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Speaking Part 1 */}
        <div className="premium-card p-6 border-slate-100 hover:shadow-xl transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-rose-100 text-rose-700">Speaking Part 1</span>
              <span className="text-xs font-bold text-emerald-600">+50 XP</span>
            </div>
            <h3 className="text-lg font-black text-slate-800">🎤 Hỏi Đáp Đời Thường</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">5 câu hỏi Part 1 về chủ đề quen thuộc: nhà ở, công việc, sở thích, du lịch. Luyện trả lời nhanh 2-3 câu.</p>
          </div>
          <button onClick={() => router.push('/ielts/practice/speaking?mode=speaking_part1')} className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors">
            Luyện ngay <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Speaking Part 2 */}
        <div className="premium-card p-6 border-slate-100 hover:shadow-xl transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-pink-100 text-pink-700">Speaking Part 2</span>
              <span className="text-xs font-bold text-emerald-600">+80 XP</span>
            </div>
            <h3 className="text-lg font-black text-slate-800">🃏 Cue Card Monologue</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">Luyện thuyết trình 2 phút theo Cue Card: Describe a person/place/event. AI chấm điểm 4 tiêu chí Speaking.</p>
          </div>
          <button onClick={() => router.push('/ielts/practice/speaking?mode=speaking_part2')} className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors">
            Luyện ngay <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Reading T/F/NG */}
        <div className="premium-card p-6 border-slate-100 hover:shadow-xl transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-700">Reading T/F/NG</span>
              <span className="text-xs font-bold text-emerald-600">+75 XP</span>
            </div>
            <h3 className="text-lg font-black text-slate-800">✅ True / False / Not Given</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">Chuyên đề đọc hiểu dạng T/F/NG — dạng bài khó nhất IELTS Reading. Luyện phân biệt False vs Not Given.</p>
          </div>
          <button onClick={() => router.push('/ielts/practice/reading?mode=reading_tfng')} className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors">
            Luyện ngay <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Reading Matching Headings */}
        <div className="premium-card p-6 border-slate-100 hover:shadow-xl transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-teal-100 text-teal-700">Matching Headings</span>
              <span className="text-xs font-bold text-emerald-600">+75 XP</span>
            </div>
            <h3 className="text-lg font-black text-slate-800">🧩 Ghép Tiêu Đề Đoạn Văn</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">Luyện dạng Matching Headings: đọc hiểu ý chính từng đoạn rồi ghép với tiêu đề phù hợp nhất từ danh sách.</p>
          </div>
          <button onClick={() => router.push('/ielts/practice/reading?mode=reading_matching')} className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors">
            Luyện ngay <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
