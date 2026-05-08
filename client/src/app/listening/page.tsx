'use client';

import React, { useState } from 'react';
import { 
  Headphones, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  CheckCircle2, 
  Clock, 
  Tag, 
  Volume2, 
  BookOpen,
  ChevronRight,
  ListMusic,
  Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';

const LESSONS = [
  {
    id: 1,
    title: "Morning Routine in London",
    category: "Daily Life",
    level: "B1",
    duration: "3:45",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "The Future of Artificial Intelligence",
    category: "Technology",
    level: "C1",
    duration: "5:20",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Ordering Food at a Restaurant",
    category: "Travel",
    level: "A2",
    duration: "2:15",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function ListeningPage() {
  const [selectedLesson, setSelectedLesson] = useState<any>(LESSONS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35); // Mock progress

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Headphones className="w-8 h-8 text-primary" />
            Listening Lab
          </h1>
          <p className="text-slate-500">Improve your comprehension with interactive audio lessons and scripts.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mr-2">Filters:</span>
          {['All', 'A1-A2', 'B1-B2', 'C1-C2'].map(f => (
            <button key={f} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold hover:border-primary transition-all">
              {f}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Player Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="premium-card overflow-hidden group">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={selectedLesson.image} 
                alt={selectedLesson.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="px-2 py-1 bg-primary text-white text-[10px] font-black rounded uppercase tracking-widest mb-2 inline-block">
                    {selectedLesson.level} • {selectedLesson.category}
                  </span>
                  <h2 className="text-3xl font-black text-white leading-tight">{selectedLesson.title}</h2>
                </div>
                <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all border border-white/30">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-8 space-y-8">
              {/* Player Controls */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                  <span>1:24</span>
                  <span>{selectedLesson.duration}</span>
                </div>
                <div className="relative h-2 bg-slate-100 rounded-full cursor-pointer group/progress">
                  <div 
                    className="absolute h-full bg-primary rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(var(--primary),0.5)]" 
                    style={{ width: `${progress}%` }} 
                  />
                  <div 
                    className="absolute w-4 h-4 bg-white border-2 border-primary rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity"
                    style={{ left: `${progress}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-center gap-10 pt-4">
                  <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                    <SkipBack className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-xl shadow-primary/30 hover:scale-105 transition-all"
                  >
                    {isPlaying ? <Pause className="w-8 h-8 fill-white" /> : <Play className="w-8 h-8 fill-white ml-1" />}
                  </button>
                  <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                    <SkipForward className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Transcript Section */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Interactive Transcript
                  </h3>
                  <button className="text-xs font-bold text-primary hover:underline">Show Translation</button>
                </div>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-4 custom-scrollbar">
                  {[
                    "Welcome back to our Daily London podcast.",
                    "Today, we're exploring the historic streets of Greenwich.",
                    "As the sun rises over the Thames, the city begins to wake up.",
                    "You can hear the distant sounds of the early morning commuters."
                  ].map((line, i) => (
                    <p 
                      key={i} 
                      className={cn(
                        "text-lg leading-relaxed font-medium transition-all duration-500 rounded-lg p-2 cursor-pointer",
                        i === 1 ? "bg-primary/10 text-primary font-bold border-l-4 border-primary" : "text-slate-500 hover:bg-slate-50"
                      )}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson List / Sidebar */}
        <div className="space-y-6">
          <div className="premium-card p-6">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <ListMusic className="w-5 h-5 text-primary" />
              Recent Lessons
            </h3>
            <div className="space-y-4">
              {LESSONS.map((lesson) => (
                <button 
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson)}
                  className={cn(
                    "w-full flex gap-4 p-3 rounded-2xl transition-all text-left group",
                    selectedLesson.id === lesson.id ? "bg-primary/5 ring-1 ring-primary/20 shadow-md" : "hover:bg-slate-50"
                  )}
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={lesson.image} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 py-1">
                    <h4 className="text-sm font-bold truncate group-hover:text-primary transition-colors">{lesson.title}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lesson.level}</span>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center pr-2">
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 group-hover:text-primary transition-all" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="premium-card p-6 bg-slate-900 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold mb-2">Comprehension Goal</h3>
              <p className="text-slate-400 text-xs mb-4">Complete 3 lessons this week to earn the "Golden Ear" badge.</p>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '66%' }} />
              </div>
              <p className="text-[10px] font-bold text-primary mt-2">2 / 3 Completed</p>
            </div>
            <Volume2 className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5 opacity-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
