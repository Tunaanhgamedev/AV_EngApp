'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Award, Clock, FileText, MessageSquare, ChevronRight, Brain, Play, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IELTS_SKILLS } from '@/data/ieltsData';

export default function IeltsSkillsSection() {
  const router = useRouter();
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  return (
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
  );
}
