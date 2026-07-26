import React from 'react';
import { BookOpen, Search, XCircle, Info, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper parser to get tailwind background/borders dynamically based on original colorStr
const getTopicColorClasses = (colorStr: string) => {
  const normalized = colorStr.toLowerCase();
  let color = 'slate';
  if (normalized.includes('emerald')) color = 'emerald';
  else if (normalized.includes('green')) color = 'green';
  else if (normalized.includes('blue')) color = 'blue';
  else if (normalized.includes('amber')) color = 'amber';
  else if (normalized.includes('indigo')) color = 'indigo';
  else if (normalized.includes('violet')) color = 'violet';
  else if (normalized.includes('rose')) color = 'rose';
  else if (normalized.includes('orange')) color = 'orange';
  else if (normalized.includes('sky')) color = 'sky';
  else if (normalized.includes('cyan')) color = 'cyan';
  else if (normalized.includes('pink')) color = 'pink';
  else if (normalized.includes('teal')) color = 'teal';
  else if (normalized.includes('purple')) color = 'purple';

  const map: Record<string, { iconBg: string, iconText: string, borderHover: string, textAccent: string }> = {
    emerald: { iconBg: 'bg-emerald-50 dark:bg-emerald-950/40', iconText: 'text-emerald-600 dark:text-emerald-400', borderHover: 'hover:border-emerald-400 dark:hover:border-emerald-500', textAccent: 'text-emerald-600 dark:text-emerald-400' },
    green: { iconBg: 'bg-green-50 dark:bg-green-950/40', iconText: 'text-green-600 dark:text-green-400', borderHover: 'hover:border-green-400 dark:hover:border-green-500', textAccent: 'text-green-600 dark:text-green-400' },
    blue: { iconBg: 'bg-blue-50 dark:bg-blue-950/40', iconText: 'text-blue-600 dark:text-blue-400', borderHover: 'hover:border-blue-400 dark:hover:border-blue-500', textAccent: 'text-blue-600 dark:text-blue-400' },
    amber: { iconBg: 'bg-amber-50 dark:bg-amber-950/40', iconText: 'text-amber-600 dark:text-amber-400', borderHover: 'hover:border-amber-400 dark:hover:border-amber-500', textAccent: 'text-amber-600 dark:text-amber-400' },
    indigo: { iconBg: 'bg-indigo-50 dark:bg-indigo-950/40', iconText: 'text-indigo-600 dark:text-indigo-400', borderHover: 'hover:border-indigo-400 dark:hover:border-indigo-500', textAccent: 'text-indigo-600 dark:text-indigo-400' },
    violet: { iconBg: 'bg-violet-50 dark:bg-violet-950/40', iconText: 'text-violet-600 dark:text-violet-400', borderHover: 'hover:border-violet-400 dark:hover:border-violet-500', textAccent: 'text-violet-600 dark:text-violet-400' },
    rose: { iconBg: 'bg-rose-50 dark:bg-rose-950/40', iconText: 'text-rose-600 dark:text-rose-400', borderHover: 'hover:border-rose-400 dark:hover:border-rose-500', textAccent: 'text-rose-600 dark:text-rose-400' },
    orange: { iconBg: 'bg-orange-50 dark:bg-orange-950/40', iconText: 'text-orange-600 dark:text-orange-400', borderHover: 'hover:border-orange-400 dark:hover:border-orange-500', textAccent: 'text-orange-600 dark:text-orange-400' },
    sky: { iconBg: 'bg-sky-50 dark:bg-sky-950/40', iconText: 'text-sky-600 dark:text-sky-400', borderHover: 'hover:border-sky-400 dark:hover:border-sky-500', textAccent: 'text-sky-600 dark:text-sky-400' },
    cyan: { iconBg: 'bg-cyan-50 dark:bg-cyan-950/40', iconText: 'text-cyan-600 dark:text-cyan-400', borderHover: 'hover:border-cyan-400 dark:hover:border-cyan-500', textAccent: 'text-cyan-600 dark:text-cyan-400' },
    pink: { iconBg: 'bg-pink-50 dark:bg-pink-950/40', iconText: 'text-pink-600 dark:text-pink-400', borderHover: 'hover:border-pink-400 dark:hover:border-pink-500', textAccent: 'text-pink-600 dark:text-pink-400' },
    teal: { iconBg: 'bg-teal-50 dark:bg-teal-950/40', iconText: 'text-teal-600 dark:text-teal-400', borderHover: 'hover:border-teal-400 dark:hover:border-teal-500', textAccent: 'text-teal-600 dark:text-teal-400' },
    purple: { iconBg: 'bg-purple-50 dark:bg-purple-950/40', iconText: 'text-purple-600 dark:text-purple-400', borderHover: 'hover:border-purple-400 dark:hover:border-purple-500', textAccent: 'text-purple-600 dark:text-purple-400' },
    slate: { iconBg: 'bg-slate-50 dark:bg-slate-900', iconText: 'text-slate-600 dark:text-slate-400', borderHover: 'hover:border-slate-400 dark:hover:border-slate-550', textAccent: 'text-slate-600 dark:text-slate-400' }
  };
  return map[color] || map.slate;
};

interface TopicSelectorProps {
  vocabSearchQuery: string;
  setVocabSearchQuery: (q: string) => void;
  vocabActiveCategory: 'all' | 'daily' | 'work_tech' | 'society_env';
  setVocabActiveCategory: (cat: 'all' | 'daily' | 'work_tech' | 'society_env') => void;
  filteredVocabTopics: any[];
  topicIcons: Record<string, any>;
  totalTopicsCount: number;
  dailyCount: number;
  workTechCount: number;
  societyEnvCount: number;
  onSelectTopic: (id: string) => void;
}

export default function TopicSelector({
  vocabSearchQuery,
  setVocabSearchQuery,
  vocabActiveCategory,
  setVocabActiveCategory,
  filteredVocabTopics,
  topicIcons,
  totalTopicsCount,
  dailyCount,
  workTechCount,
  societyEnvCount,
  onSelectTopic
}: TopicSelectorProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-100 rounded-full">
          <BookOpen className="w-3.5 h-3.5" />
          <span className="text-[9px] font-black uppercase tracking-widest">Vocabulary by Topic</span>
        </div>
        <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Học Từ Vựng Theo Chủ Đề</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm max-w-xl mx-auto">
          Chọn một chủ đề bên dưới để bắt đầu học từ vựng. Mỗi chủ đề được chia thành 2 cấp độ: <strong className="text-emerald-600 dark:text-emerald-400">Mới bắt đầu</strong> và <strong className="text-violet-600 dark:text-violet-400">Nâng cao</strong>.
        </p>
      </div>

      {/* Search & Category Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-slate-900/30 p-4 rounded-3xl border border-slate-100 dark:border-slate-800/60 max-w-4xl mx-auto w-full">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={vocabSearchQuery}
            onChange={(e) => setVocabSearchQuery(e.target.value)}
            placeholder="Tìm kiếm chủ đề học..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-700 transition-all font-medium text-slate-700 dark:text-slate-300"
          />
          {vocabSearchQuery && (
            <button
              onClick={() => setVocabSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <XCircle className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Chips */}
        <div className="flex flex-nowrap md:flex-wrap overflow-x-auto md:overflow-visible no-scrollbar gap-2 w-full md:w-auto md:ml-auto justify-start pb-1 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {[
            { id: 'all', label: 'Tất cả', count: totalTopicsCount },
            { id: 'daily', label: '🌱 Đời sống', count: dailyCount },
            { id: 'work_tech', label: '💼 Công việc', count: workTechCount },
            { id: 'society_env', label: '🌍 Xã hội & Môi trường', count: societyEnvCount },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setVocabActiveCategory(cat.id as any)}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer shrink-0",
                vocabActiveCategory === cat.id
                  ? "bg-slate-900 border-slate-900 text-white dark:bg-slate-100 dark:border-slate-105 dark:text-slate-900 shadow-sm"
                  : "bg-white border-slate-200 text-slate-600 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
              )}
            >
              <span>{cat.label}</span>
              <span className={cn(
                "text-[10px] px-1.5 py-0.2 rounded-full",
                vocabActiveCategory === cat.id
                  ? "bg-slate-850 text-slate-200 dark:bg-slate-200 dark:text-slate-700"
                  : "bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-500"
              )}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {filteredVocabTopics.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-400">
            <Info className="w-8 h-8" />
          </div>
          <div>
            <h4 className="font-bold text-slate-750 dark:text-slate-200">Không tìm thấy chủ đề phù hợp</h4>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Vui lòng thử tìm kiếm bằng từ khóa khác.</p>
          </div>
        </div>
      ) : (
        /* ── Topics Cards List ── */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVocabTopics.map(topic => {
            const colors = getTopicColorClasses(topic.color);
            const IconComponent = topicIcons[topic.id] || BookOpen;

            return (
              <button
                key={topic.id}
                onClick={() => onSelectTopic(topic.id)}
                className={cn(
                  "bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/85 p-6 rounded-[2.2rem] text-left flex flex-col justify-between gap-5 transition-all duration-300 hover:shadow-xl group relative overflow-hidden cursor-pointer",
                  colors.borderHover
                )}
              >
                <div className="flex items-start justify-between w-full">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", colors.iconBg)}>
                    <IconComponent className={cn("w-6 h-6", colors.iconText)} />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900 px-3 py-1 rounded-full uppercase tracking-wider">
                    {topic.beginner.length + topic.advanced.length} words
                  </span>
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-black text-slate-800 dark:text-slate-100 group-hover:text-slate-900 transition-colors text-base line-clamp-1">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed line-clamp-2">
                    {topic.desc}
                  </p>
                </div>
                <div className="flex items-center justify-between w-full pt-3.5 border-t border-slate-100 dark:border-slate-800/80 mt-1">
                  <div className="flex gap-2">
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded">Beginner</span>
                    <span className="text-[9px] font-bold text-violet-600 bg-violet-50 dark:bg-violet-950/20 px-2 py-0.5 rounded">Advanced</span>
                  </div>
                  <span className="text-xs font-black text-slate-600 dark:text-sky-400 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                    Học ngay <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
