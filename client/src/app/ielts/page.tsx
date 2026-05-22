'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Award, Headphones, BookOpen, PenTool, Mic2, Clock, Target, ChevronRight,
  Sparkles, Brain, TrendingUp, Zap, ShieldCheck, Play, Star,
  ArrowRight, BarChart3, FileText, MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const IELTS_SKILLS = [
  {
    id: 'listening',
    title: 'Listening',
    titleVi: 'Nghe hiểu',
    icon: Headphones,
    color: 'from-blue-600 to-indigo-500',
    shadow: 'shadow-blue-500/25',
    bgLight: 'from-blue-50 to-indigo-50',
    borderLight: 'border-blue-200',
    textColor: 'text-blue-600',
    duration: '30 phút',
    sections: 4,
    questions: 40,
    description: '4 phần nghe với độ khó tăng dần: hội thoại, độc thoại, thảo luận học thuật.',
    formats: ['Multiple Choice', 'Matching', 'Map/Diagram Labelling', 'Sentence Completion', 'Note Completion'],
    tips: [
      'Đọc câu hỏi trước khi nghe',
      'Chú ý các từ đồng nghĩa (paraphrasing)',
      'Viết chính tả đúng — lỗi chính tả sẽ bị trừ điểm'
    ]
  },
  {
    id: 'reading',
    title: 'Reading',
    titleVi: 'Đọc hiểu',
    icon: BookOpen,
    color: 'from-emerald-600 to-teal-500',
    shadow: 'shadow-emerald-500/25',
    bgLight: 'from-emerald-50 to-teal-50',
    borderLight: 'border-emerald-200',
    textColor: 'text-emerald-600',
    duration: '60 phút',
    sections: 3,
    questions: 40,
    description: '3 đoạn văn học thuật dài với các dạng câu hỏi đa dạng. Yêu cầu kĩ năng skim & scan.',
    formats: ['True/False/Not Given', 'Yes/No/Not Given', 'Matching Headings', 'Summary Completion', 'Multiple Choice'],
    tips: [
      'Skim toàn bộ bài đọc trong 2-3 phút đầu',
      'Quản lý thời gian: ~20 phút/đoạn',
      'True/False/Not Given: phân biệt rõ "False" và "Not Given"'
    ]
  },
  {
    id: 'writing',
    title: 'Writing',
    titleVi: 'Viết',
    icon: PenTool,
    color: 'from-amber-500 to-orange-500',
    shadow: 'shadow-amber-500/25',
    bgLight: 'from-amber-50 to-orange-50',
    borderLight: 'border-amber-200',
    textColor: 'text-amber-600',
    duration: '60 phút',
    sections: 2,
    questions: 2,
    description: 'Task 1: Mô tả biểu đồ/quy trình (150+ từ). Task 2: Viết luận (250+ từ).',
    formats: ['Task 1: Bar/Line/Pie Chart', 'Task 1: Table/Map/Process', 'Task 2: Opinion Essay', 'Task 2: Discussion Essay', 'Task 2: Problem/Solution'],
    tips: [
      'Task 2 chiếm 2/3 điểm Writing — dành 40 phút',
      'Dùng cấu trúc 4 đoạn: Intro → Body 1 → Body 2 → Conclusion',
      'Paraphrase đề bài trong Introduction — không copy nguyên văn'
    ]
  },
  {
    id: 'speaking',
    title: 'Speaking',
    titleVi: 'Nói',
    icon: Mic2,
    color: 'from-rose-500 to-pink-500',
    shadow: 'shadow-rose-500/25',
    bgLight: 'from-rose-50 to-pink-50',
    borderLight: 'border-rose-200',
    textColor: 'text-rose-600',
    duration: '11-14 phút',
    sections: 3,
    questions: 3,
    description: 'Part 1: Phỏng vấn. Part 2: Cue Card (nói 2 phút). Part 3: Thảo luận chuyên sâu.',
    formats: ['Part 1: Familiar Topics', 'Part 2: Individual Long Turn', 'Part 3: Two-way Discussion'],
    tips: [
      'Mở rộng câu trả lời — không trả lời Yes/No đơn giản',
      'Dùng Fillers tự nhiên: "Well...", "To be honest..."',
      'Part 2: Ghi chú nhanh trong 1 phút chuẩn bị'
    ]
  }
];

const BAND_DESCRIPTORS = [
  { band: 9, label: 'Expert', color: 'bg-emerald-500' },
  { band: 8, label: 'Very Good', color: 'bg-emerald-400' },
  { band: 7, label: 'Good', color: 'bg-blue-500' },
  { band: 6.5, label: 'Competent+', color: 'bg-blue-400' },
  { band: 6, label: 'Competent', color: 'bg-amber-500' },
  { band: 5.5, label: 'Modest+', color: 'bg-amber-400' },
  { band: 5, label: 'Modest', color: 'bg-orange-500' },
];

export default function IELTSPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 animate-in fade-in duration-700">
      {/* Hero Section — Deep Red/Maroon IELTS Brand */}
      <section className="premium-card p-1 rounded-3xl overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-br from-red-950 via-rose-900 to-red-800 rounded-[22px] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI2di0yaDEwem0wLTRWMjhoLTEwdjJoMTB6bS0xNCA0aDJ2LTJoLTJ2MnptMC00aDJ2LTJoLTJ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/20 text-red-200 rounded-full border border-red-500/20">
                <Award className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">IELTS Academic & General</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Luyện thi <span className="bg-gradient-to-r from-red-300 to-rose-200 bg-clip-text text-transparent">IELTS</span>
                <br />mô phỏng thật 100%
              </h1>

              <p className="text-red-200/80 text-lg font-medium max-w-xl">
                Giao diện luyện thi giống phòng thi thật. Chấm bài Writing & Speaking bằng AI. Đầy đủ 4 kĩ năng Listening, Reading, Writing, Speaking.
              </p>

              <div className="flex flex-wrap gap-6 justify-center md:justify-start text-red-300/80 text-sm font-bold">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-red-300" />
                  <span>4 kĩ năng</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-red-300" />
                  <span>~2 giờ 45 phút/bài thi</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-red-300" />
                  <span>Band Score: 0 — 9.0</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
                <button
                  onClick={() => router.push('/ielts/test')}
                  className="px-8 py-4 bg-gradient-to-r from-red-500 to-rose-400 text-white rounded-2xl font-black text-sm hover:opacity-90 transition-all shadow-xl shadow-red-500/30 flex items-center gap-2 group"
                >
                  <Play className="w-5 h-5" />
                  THI THỬ FULL TEST
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-sm hover:bg-white/20 transition-all flex items-center gap-2 backdrop-blur"
                >
                  <Sparkles className="w-5 h-5" />
                  LUYỆN TỪNG KĨ NĂNG
                </button>
              </div>
            </div>

            {/* Band Score Display */}
            <div className="hidden md:flex flex-col items-center gap-4">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="url(#ieltsGrad)" strokeWidth="8" strokeLinecap="round" strokeDasharray="264" strokeDashoffset="44" />
                  <defs>
                    <linearGradient id="ieltsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-white">7.0</span>
                  <span className="text-[10px] font-bold text-red-300 uppercase tracking-widest">Mục tiêu</span>
                </div>
              </div>
              <div className="flex gap-3">
                {BAND_DESCRIPTORS.slice(0, 4).map(b => (
                  <div key={b.band} className="text-center">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black", b.color)}>
                      {b.band}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <div id="skills" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800">Bốn kĩ năng IELTS</h2>
            <p className="text-sm text-slate-500 font-medium">Chọn kĩ năng để bắt đầu luyện tập chuyên sâu</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {IELTS_SKILLS.map(skill => {
            const isExpanded = expandedSkill === skill.id;
            return (
              <div
                key={skill.id}
                className={cn("premium-card overflow-hidden transition-all duration-500", isExpanded && "md:col-span-2")}
              >
                {/* Card Header */}
                <div
                  className="p-6 cursor-pointer group"
                  onClick={() => setExpandedSkill(isExpanded ? null : skill.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={cn("w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg", skill.color, skill.shadow)}>
                        <skill.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-800 group-hover:text-primary transition-colors">
                          {skill.title}
                          <span className="text-sm font-bold text-slate-400 ml-2">({skill.titleVi})</span>
                        </h3>
                        <p className="text-sm text-slate-500 font-medium mt-1">{skill.description}</p>
                        <div className="flex items-center gap-4 mt-3 text-xs font-bold text-slate-400">
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {skill.duration}</span>
                          <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {skill.sections} phần</span>
                          <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> {skill.questions} câu</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={cn("w-6 h-6 text-slate-300 transition-transform duration-300", isExpanded && "rotate-90")} />
                  </div>
                </div>

                {/* Expandable Detail */}
                <div className={cn("overflow-hidden transition-all duration-500", isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0")}>
                  <div className={cn("p-6 pt-0 border-t border-slate-100")}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                      {/* Question Formats */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">Dạng câu hỏi</h4>
                        <div className="space-y-2">
                          {skill.formats.map((f, i) => (
                            <div key={i} className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl">
                              <div className={cn("w-2 h-2 rounded-full bg-gradient-to-r", skill.color)} />
                              <span className="text-sm font-medium text-slate-600">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tips */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">Mẹo luyện thi</h4>
                        <div className="space-y-2">
                          {skill.tips.map((t, i) => (
                            <div key={i} className="flex items-start gap-2 px-3 py-2 bg-slate-50 rounded-xl">
                              <Brain className={cn("w-4 h-4 mt-0.5 flex-shrink-0", skill.textColor)} />
                              <span className="text-sm font-medium text-slate-600">{t}</span>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/ielts/practice/${skill.id}`);
                          }}
                          className={cn("w-full mt-4 py-3.5 rounded-2xl font-black text-sm text-white shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 bg-gradient-to-r", skill.color)}
                        >
                          <Play className="w-4 h-4" />
                          BẮT ĐẦU LUYỆN {skill.title.toUpperCase()}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Band Score Guide */}
      <section className="premium-card p-8">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800">Thang điểm IELTS Band Score</h3>
              <p className="text-sm text-slate-500 font-medium">Hiểu rõ mục tiêu điểm số của bạn</p>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-3">
            {BAND_DESCRIPTORS.map(b => (
              <div key={b.band} className="text-center space-y-2 group cursor-default">
                <div className={cn("h-16 rounded-xl flex items-center justify-center text-white font-black text-lg transition-transform group-hover:scale-105", b.color)}>
                  {b.band}
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{b.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategy Section */}
      <section className="premium-card p-8 bg-gradient-to-r from-red-50 to-rose-50 border-red-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-black text-slate-800">🎯 Chiến lược chinh phục IELTS 7.0+</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 font-medium">
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span><strong className="text-slate-800">Listening:</strong> Nghe podcast tiếng Anh 30 phút/ngày. Tập viết chính tả chính xác tuyệt đối.</span>
              </div>
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span><strong className="text-slate-800">Reading:</strong> Đọc báo tiếng Anh (BBC, The Guardian). Luyện kĩ năng paraphrasing và scanning.</span>
              </div>
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span><strong className="text-slate-800">Writing:</strong> Viết 1 bài Task 2 mỗi tuần. Học các cấu trúc câu phức (complex sentences) và từ nối (cohesive devices).</span>
              </div>
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span><strong className="text-slate-800">Speaking:</strong> Tự ghi âm và nghe lại. Tập trả lời Part 2 Cue Card trong đúng 2 phút.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
