'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  GraduationCap, Headphones, BookOpen, Clock, Target, ChevronRight,
  Sparkles, Brain, TrendingUp, Zap, ShieldCheck, Play, Star,
  Image as ImageIcon, MessageCircleQuestion, Users, Radio,
  FileText, LetterText, BookOpenCheck, ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const TOEIC_PARTS = [
  {
    id: 'part1',
    part: 1,
    title: 'Photographs',
    skill: 'Listening',
    icon: ImageIcon,
    color: 'from-blue-500 to-cyan-400',
    shadow: 'shadow-blue-500/20',
    questions: 6,
    description: 'Nghe mô tả và chọn câu phù hợp nhất với bức ảnh.',
    tip: 'Quan sát kỹ hành động, vị trí người/vật trong ảnh trước khi nghe.',
    difficulty: 'Dễ'
  },
  {
    id: 'part2',
    part: 2,
    title: 'Question-Response',
    skill: 'Listening',
    icon: MessageCircleQuestion,
    color: 'from-indigo-500 to-blue-400',
    shadow: 'shadow-indigo-500/20',
    questions: 25,
    description: 'Nghe câu hỏi và chọn câu trả lời phù hợp nhất.',
    tip: 'Tập trung vào từ hỏi đầu tiên (What, Where, When, Who, How).',
    difficulty: 'Trung bình'
  },
  {
    id: 'part3',
    part: 3,
    title: 'Conversations',
    skill: 'Listening',
    icon: Users,
    color: 'from-violet-500 to-purple-400',
    shadow: 'shadow-violet-500/20',
    questions: 39,
    description: 'Nghe đoạn hội thoại giữa 2-3 người và trả lời câu hỏi.',
    tip: 'Đọc trước câu hỏi và đáp án trong thời gian chờ.',
    difficulty: 'Khó'
  },
  {
    id: 'part4',
    part: 4,
    title: 'Short Talks',
    skill: 'Listening',
    icon: Radio,
    color: 'from-purple-500 to-pink-400',
    shadow: 'shadow-purple-500/20',
    questions: 30,
    description: 'Nghe bài nói chuyện ngắn (thông báo, quảng cáo, hướng dẫn).',
    tip: 'Ghi nhớ các từ khóa về thời gian, địa điểm, mục đích.',
    difficulty: 'Khó'
  },
  {
    id: 'part5',
    part: 5,
    title: 'Incomplete Sentences',
    skill: 'Reading',
    icon: LetterText,
    color: 'from-emerald-500 to-teal-400',
    shadow: 'shadow-emerald-500/20',
    questions: 30,
    description: 'Chọn từ/cụm từ điền vào chỗ trống trong câu.',
    tip: 'Xác định loại từ cần điền (noun, verb, adj, adv) trước.',
    difficulty: 'Trung bình'
  },
  {
    id: 'part6',
    part: 6,
    title: 'Text Completion',
    skill: 'Reading',
    icon: FileText,
    color: 'from-teal-500 to-green-400',
    shadow: 'shadow-teal-500/20',
    questions: 16,
    description: 'Điền từ/câu vào chỗ trống trong đoạn văn.',
    tip: 'Đọc cả đoạn văn trước để hiểu ngữ cảnh tổng thể.',
    difficulty: 'Khó'
  },
  {
    id: 'part7',
    part: 7,
    title: 'Reading Comprehension',
    skill: 'Reading',
    icon: BookOpenCheck,
    color: 'from-amber-500 to-orange-400',
    shadow: 'shadow-amber-500/20',
    questions: 54,
    description: 'Đọc hiểu các dạng văn bản: email, quảng cáo, bài báo, biểu đồ.',
    tip: 'Skim nhanh để nắm ý chính, sau đó scan để tìm thông tin chi tiết.',
    difficulty: 'Rất khó'
  }
];

export default function TOEICPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const listeningParts = TOEIC_PARTS.filter(p => p.skill === 'Listening');
  const readingParts = TOEIC_PARTS.filter(p => p.skill === 'Reading');
  const totalQuestions = TOEIC_PARTS.reduce((sum, p) => sum + p.questions, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="premium-card p-1 rounded-3xl overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 rounded-[22px] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI2di0yaDEwem0wLTRWMjhoLTEwdjJoMTB6bS0xNCA0aDJ2LTJoLTJ2MnptMC00aDJ2LTJoLTJ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/20">
                <GraduationCap className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">TOEIC Practice Center</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Luyện thi <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">TOEIC</span>
                <br />cùng AI chuyên nghiệp
              </h1>

              <p className="text-blue-200/80 text-lg font-medium max-w-xl">
                Luyện đầy đủ 7 Parts với đề thi được tạo bởi AI. Phân tích điểm yếu, gợi ý chiến lược, và theo dõi tiến trình học tập.
              </p>

              <div className="flex flex-wrap gap-6 justify-center md:justify-start text-blue-300/80 text-sm font-bold">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-400" />
                  <span>{totalQuestions} câu hỏi/bài</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>120 phút/bài thi</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <span>Điểm tối đa: 990</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
                <button
                  onClick={() => router.push('/toeic/test')}
                  className="px-6 py-3.5 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-2xl font-black text-xs sm:text-sm hover:opacity-90 transition-all shadow-xl shadow-blue-500/30 flex items-center gap-2 group"
                >
                  <Play className="w-5 h-5" />
                  THI THỬ FULL TEST
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => router.push('/toeic/vocabulary')}
                  className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-400 text-white rounded-2xl font-black text-xs sm:text-sm hover:opacity-90 transition-all shadow-xl shadow-amber-500/30 flex items-center gap-2 group"
                >
                  <BookOpen className="w-5 h-5" />
                  TỪ VỰNG TRỌNG TÂM
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => document.getElementById('parts')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3.5 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-xs sm:text-sm hover:bg-white/20 transition-all flex items-center gap-2 backdrop-blur"
                >
                  <Sparkles className="w-5 h-5" />
                  LUYỆN TỪNG PART
                </button>
              </div>
            </div>

            {/* Score Ring */}
            <div className="hidden md:flex flex-col items-center gap-4">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="url(#toeicGrad)" strokeWidth="8" strokeLinecap="round" strokeDasharray="264" strokeDashoffset="66" />
                  <defs>
                    <linearGradient id="toeicGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-white">750</span>
                  <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Mục tiêu</span>
                </div>
              </div>
              <div className="flex gap-6 text-center">
                <div>
                  <p className="text-2xl font-black text-blue-400">495</p>
                  <p className="text-[9px] font-bold text-blue-300/60 uppercase tracking-widest">Listening</p>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <p className="text-2xl font-black text-cyan-400">495</p>
                  <p className="text-[9px] font-bold text-blue-300/60 uppercase tracking-widest">Reading</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vocabulary Feature Section */}
      <section className="premium-card p-1 rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center shadow-lg shadow-orange-500/20 text-white flex-shrink-0">
              <BookOpen className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black text-orange-600 bg-orange-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">MỚI RA MẮT</span>
              <h2 className="text-xl font-black text-slate-800">Kho Từ Vựng TOEIC 5 Chiều</h2>
              <p className="text-xs text-slate-500 font-semibold max-w-xl">
                Khám phá kho từ vựng chia theo mục tiêu điểm số (500+, 700+, 900+), phần thi Part 1 và cụm collocations Part 5. Học sâu nhớ lâu thông qua 5 chế độ tương tác cao cấp.
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push('/toeic/vocabulary')}
            className="w-full md:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            Bắt đầu học ngay <ArrowRight className="w-4 h-4 text-orange-400" />
          </button>
        </div>
      </section>

      {/* Parts Grid */}
      <div id="parts" className="space-y-10">
        {/* Listening Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
              <Headphones className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800">Listening Comprehension</h2>
              <p className="text-sm text-slate-500 font-medium">Part 1 — 4 • 100 câu hỏi • 45 phút</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {listeningParts.map(part => (
              <button
                key={part.id}
                onMouseEnter={() => setHoveredPart(part.id)}
                onMouseLeave={() => setHoveredPart(null)}
                onClick={() => router.push(`/toeic/practice/${part.id}`)}
                className="premium-card p-6 text-left group hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <div className={cn("absolute top-0 right-0 w-32 h-32 opacity-5 -translate-y-4 translate-x-4 transition-transform duration-500", hoveredPart === part.id && "scale-110")}>
                  <part.icon className="w-full h-full" />
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={cn("w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg", part.color, part.shadow)}>
                      <part.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                      part.difficulty === 'Dễ' && "bg-green-100 text-green-600",
                      part.difficulty === 'Trung bình' && "bg-amber-100 text-amber-600",
                      part.difficulty === 'Khó' && "bg-rose-100 text-rose-600",
                      part.difficulty === 'Rất khó' && "bg-purple-100 text-purple-600"
                    )}>{part.difficulty}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest">Part {part.part}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[10px] font-bold text-slate-400">{part.questions} câu</span>
                    </div>
                    <h3 className="text-lg font-black text-slate-800 group-hover:text-primary transition-colors">{part.title}</h3>
                    <p className="text-sm text-slate-500 font-medium mt-1">{part.description}</p>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl">
                    <Brain className="w-3.5 h-3.5 text-primary" />
                    <p className="text-xs text-slate-600 font-medium">{part.tip}</p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className={cn("w-3.5 h-3.5", s <= (part.part <= 2 ? 2 : part.part <= 4 ? 3 : part.part <= 6 ? 4 : 5) ? "text-amber-400 fill-amber-400" : "text-slate-200")} />
                      ))}
                    </div>
                    <span className="text-xs font-black text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      Luyện tập <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Reading Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800">Reading Comprehension</h2>
              <p className="text-sm text-slate-500 font-medium">Part 5 — 7 • 100 câu hỏi • 75 phút</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {readingParts.map(part => (
              <button
                key={part.id}
                onMouseEnter={() => setHoveredPart(part.id)}
                onMouseLeave={() => setHoveredPart(null)}
                onClick={() => router.push(`/toeic/practice/${part.id}`)}
                className="premium-card p-6 text-left group hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <div className={cn("absolute top-0 right-0 w-24 h-24 opacity-5 -translate-y-2 translate-x-2 transition-transform duration-500", hoveredPart === part.id && "scale-110")}>
                  <part.icon className="w-full h-full" />
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={cn("w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg", part.color, part.shadow)}>
                      <part.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                      part.difficulty === 'Trung bình' && "bg-amber-100 text-amber-600",
                      part.difficulty === 'Khó' && "bg-rose-100 text-rose-600",
                      part.difficulty === 'Rất khó' && "bg-purple-100 text-purple-600"
                    )}>{part.difficulty}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Part {part.part}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[10px] font-bold text-slate-400">{part.questions} câu</span>
                    </div>
                    <h3 className="text-lg font-black text-slate-800 group-hover:text-emerald-600 transition-colors">{part.title}</h3>
                    <p className="text-sm text-slate-500 font-medium mt-1">{part.description}</p>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl">
                    <Brain className="w-3.5 h-3.5 text-emerald-600" />
                    <p className="text-xs text-slate-600 font-medium">{part.tip}</p>
                  </div>

                  <span className="text-xs font-black text-emerald-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Luyện tập <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Strategy Tips */}
      <section className="premium-card p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-black text-slate-800">💡 Chiến lược luyện thi TOEIC hiệu quả</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 font-medium">
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <span><strong className="text-slate-800">Listening:</strong> Luyện nghe mỗi ngày 30 phút. Tập trung nghe từ khóa, bỏ qua những từ không hiểu.</span>
              </div>
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <span><strong className="text-slate-800">Reading:</strong> Tập skim & scan. Part 5 nên hoàn thành trong 10 phút, dành 65 phút cho Part 6-7.</span>
              </div>
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <span><strong className="text-slate-800">Thời gian:</strong> Luôn quản lý thời gian nghiêm ngặt. Không dành quá 1 phút cho mỗi câu Part 5.</span>
              </div>
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <span><strong className="text-slate-800">Mục tiêu:</strong> Đặt mục tiêu cụ thể (ví dụ: 750+) và luyện tập có hệ thống theo từng part yếu.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
