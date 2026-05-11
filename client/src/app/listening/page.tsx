'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Headphones, Play, Pause, SkipBack, SkipForward, Volume2, BookOpen, ListMusic, Heart, CheckCircle2, XCircle, RotateCcw, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const LESSONS = [
  {
    id: 1, title: "Morning Routine in London", category: "Daily Life", level: "B1", duration: "3:45",
    color: "from-blue-500 to-cyan-500",
    transcript: [
      { time: 0,   text: "Welcome back to our Daily London podcast." },
      { time: 4,   text: "Today, we're exploring the historic streets of Greenwich." },
      { time: 9,   text: "As the sun rises over the Thames, the city begins to wake up." },
      { time: 15,  text: "You can hear the distant sounds of the early morning commuters." },
      { time: 21,  text: "The aroma of fresh coffee drifts from the local bakeries." },
      { time: 27,  text: "London is truly magnificent at this hour of the morning." },
    ],
    quizzes: [
      { q: "Where is this podcast set?", options: ["Paris", "Greenwich", "New York", "Tokyo"], answer: 1 },
      { q: "What does the speaker smell?", options: ["Rain", "Flowers", "Fresh coffee", "Food markets"], answer: 2 },
    ]
  },
  {
    id: 2, title: "The Future of AI", category: "Technology", level: "C1", duration: "5:20",
    color: "from-violet-500 to-purple-600",
    transcript: [
      { time: 0,  text: "Artificial intelligence is reshaping every industry on earth." },
      { time: 5,  text: "From healthcare diagnostics to autonomous vehicles, AI is everywhere." },
      { time: 11, text: "The question is not whether AI will change the world." },
      { time: 17, text: "The question is how quickly we can adapt and harness its potential." },
      { time: 23, text: "Experts predict that 80% of jobs will be augmented by AI by 2030." },
    ],
    quizzes: [
      { q: "What percentage of jobs will AI augment by 2030?", options: ["50%", "60%", "80%", "90%"], answer: 2 },
      { q: "AI is used in which field mentioned?", options: ["Farming", "Healthcare", "Fishing", "Mining"], answer: 1 },
    ]
  },
  {
    id: 3, title: "Ordering Food at a Restaurant", category: "Travel", level: "A2", duration: "2:15",
    color: "from-orange-500 to-amber-500",
    transcript: [
      { time: 0,  text: "Excuse me, could I see the menu please?" },
      { time: 4,  text: "I'd like to order the grilled salmon with vegetables." },
      { time: 9,  text: "Could I also get a glass of sparkling water?" },
      { time: 13, text: "Yes, and for dessert, I'll have the chocolate cake." },
      { time: 18, text: "Thank you so much. The food looks absolutely delicious!" },
    ],
    quizzes: [
      { q: "What did they order as a main dish?", options: ["Steak", "Pasta", "Grilled salmon", "Pizza"], answer: 2 },
      { q: "What type of water did they request?", options: ["Still", "Sparkling", "Warm", "Lemon"], answer: 1 },
    ]
  }
];

export default function ListeningPage() {
  const [selected, setSelected]       = useState(LESSONS[0]);
  const [isPlaying, setIsPlaying]     = useState(false);
  const [progress, setProgress]       = useState(0);
  const [elapsed, setElapsed]         = useState(0);
  const [activeLine, setActiveLine]   = useState(0);
  const [showQuiz, setShowQuiz]       = useState(false);
  const [quizAns, setQuizAns]         = useState<(number|null)[]>([null, null]);
  const [quizDone, setQuizDone]       = useState(false);
  const [liked, setLiked]             = useState<number[]>([]);
  const utterRef                      = useRef<SpeechSynthesisUtterance | null>(null);
  const intervalRef                   = useRef<ReturnType<typeof setInterval> | null>(null);
  const TOTAL = 30; // simulated 30s lesson

  const stopSpeech = () => {
    if (typeof window !== 'undefined') window.speechSynthesis?.cancel();
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const playLesson = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    stopSpeech();
    const fullText = selected.transcript.map(l => l.text).join('. ');
    const utt = new SpeechSynthesisUtterance(fullText);
    utt.lang = 'en-US'; utt.rate = 0.85;
    const voices = window.speechSynthesis.getVoices();
    const v = voices.find(v => v.lang === 'en-US' && v.name.includes('Google')) || voices.find(v => v.lang === 'en-US');
    if (v) utt.voice = v;
    utt.onend = () => { setIsPlaying(false); setProgress(100); stopSpeech(); };
    utterRef.current = utt;
    window.speechSynthesis.speak(utt);
    setIsPlaying(true);
    let sec = elapsed;
    intervalRef.current = setInterval(() => {
      sec++;
      setElapsed(sec);
      setProgress((sec / TOTAL) * 100);
      const lineIdx = selected.transcript.findIndex((l, i) => {
        const next = selected.transcript[i + 1];
        const scaledTime = Math.round(l.time * (TOTAL / (selected.transcript[selected.transcript.length - 1].time + 6)));
        const scaledNext = next ? Math.round(next.time * (TOTAL / (selected.transcript[selected.transcript.length - 1].time + 6))) : TOTAL;
        return sec >= scaledTime && sec < scaledNext;
      });
      if (lineIdx >= 0) setActiveLine(lineIdx);
      if (sec >= TOTAL) { stopSpeech(); setIsPlaying(false); }
    }, 1000);
  };

  const pauseLesson = () => { stopSpeech(); setIsPlaying(false); };

  const handlePlayPause = () => { isPlaying ? pauseLesson() : playLesson(); };

  const handleRestart = () => { stopSpeech(); setIsPlaying(false); setProgress(0); setElapsed(0); setActiveLine(0); };

  const handleLessonSelect = (lesson: typeof LESSONS[0]) => {
    stopSpeech(); setIsPlaying(false); setProgress(0); setElapsed(0); setActiveLine(0);
    setSelected(lesson); setShowQuiz(false); setQuizAns([null, null]); setQuizDone(false);
  };

  useEffect(() => () => stopSpeech(), []);

  const fmt = (pct: number) => {
    const s = Math.round((pct / 100) * TOTAL);
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  };

  const handleQuizAnswer = (qi: number, ai: number) => {
    if (quizAns[qi] !== null) return;
    const next = [...quizAns]; next[qi] = ai; setQuizAns(next);
    if (next.every(a => a !== null)) setTimeout(() => setQuizDone(true), 600);
  };

  const quizScore = quizDone ? selected.quizzes.filter((q, i) => quizAns[i] === q.answer).length : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3"><Headphones className="w-8 h-8 text-primary" />Listening Lab</h1>
          <p className="text-slate-500">Improve comprehension with interactive audio lessons. Quiz yourself after each one!</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-400 mr-2">Level:</span>
          {['All','A2','B1','C1'].map(f => (
            <button key={f} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold hover:border-primary transition-all">{f}</button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Player */}
        <div className="lg:col-span-2 space-y-6">
          <div className="premium-card overflow-hidden">
            {/* Cover */}
            <div className={cn("relative h-52 bg-gradient-to-br flex items-end p-8", selected.color)}>
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 flex items-end justify-between w-full">
                <div>
                  <span className="px-2 py-1 bg-white/20 text-white text-[10px] font-black rounded uppercase tracking-widest mb-2 inline-block">{selected.level} · {selected.category}</span>
                  <h2 className="text-2xl font-black text-white leading-tight">{selected.title}</h2>
                </div>
                <button onClick={() => setLiked(p => p.includes(selected.id) ? p.filter(i => i !== selected.id) : [...p, selected.id])}
                  className="p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 hover:bg-white/30 transition-all">
                  <Heart className={cn("w-5 h-5", liked.includes(selected.id) ? "fill-rose-400 text-rose-400" : "text-white")} />
                </button>
              </div>
            </div>

            <div className="p-8 space-y-6">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-400">
                  <span>{fmt(progress)}</span><span>{selected.duration}</span>
                </div>
                <div className="relative h-2 bg-slate-100 rounded-full cursor-pointer" onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = ((e.clientX - rect.left) / rect.width) * 100;
                  setProgress(Math.max(0, Math.min(100, pct)));
                  setElapsed(Math.round((pct / 100) * TOTAL));
                }}>
                  <div className="absolute h-full bg-primary rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(99,102,241,0.4)]" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex items-center justify-center gap-10 pt-2">
                  <button onClick={handleRestart} className="p-2 text-slate-400 hover:text-primary transition-colors"><SkipBack className="w-6 h-6" /></button>
                  <button onClick={handlePlayPause} className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-xl shadow-primary/30 hover:scale-105 transition-all">
                    {isPlaying ? <Pause className="w-8 h-8 fill-white" /> : <Play className="w-8 h-8 fill-white ml-1" />}
                  </button>
                  <button className="p-2 text-slate-400 hover:text-primary transition-colors"><SkipForward className="w-6 h-6" /></button>
                </div>
              </div>

              {/* Transcript */}
              <div className="space-y-3 border-t border-slate-100 pt-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" />Interactive Transcript</h3>
                  {!showQuiz && progress > 80 && (
                    <button onClick={() => setShowQuiz(true)} className="text-xs font-black text-primary bg-primary/10 px-4 py-2 rounded-xl hover:bg-primary/20 transition-all flex items-center gap-1">
                      Take Quiz <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-2">
                  {selected.transcript.map((line, i) => (
                    <p key={i} onClick={() => { const words = new SpeechSynthesisUtterance(line.text); words.lang = 'en-US'; window.speechSynthesis?.speak(words); }}
                      className={cn("text-base leading-relaxed font-medium transition-all duration-500 rounded-xl p-3 cursor-pointer",
                        i === activeLine && isPlaying ? "bg-primary/10 text-primary font-bold border-l-4 border-primary" : "text-slate-500 hover:bg-slate-50"
                      )}>{line.text}</p>
                  ))}
                </div>
              </div>

              {/* Comprehension Quiz */}
              {showQuiz && (
                <div className="border-t border-slate-100 pt-6 space-y-5 animate-in slide-in-from-bottom-4 duration-500">
                  <h3 className="font-bold text-lg flex items-center gap-2">🧠 Comprehension Quiz</h3>
                  {selected.quizzes.map((q, qi) => (
                    <div key={qi} className="space-y-3">
                      <p className="font-bold text-slate-700">{qi + 1}. {q.q}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {q.options.map((opt, ai) => (
                          <button key={ai} onClick={() => handleQuizAnswer(qi, ai)}
                            className={cn("p-3 rounded-xl text-sm font-bold border-2 text-left transition-all",
                              quizAns[qi] === null ? "border-slate-100 hover:border-primary hover:bg-primary/5" :
                              ai === q.answer ? "bg-green-50 border-green-400 text-green-700" :
                              ai === quizAns[qi] ? "bg-rose-50 border-rose-400 text-rose-700" : "border-slate-100 opacity-40"
                            )}>{opt}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                  {quizDone && (
                    <div className={cn("p-4 rounded-2xl text-center font-black animate-in zoom-in duration-300", quizScore === selected.quizzes.length ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700")}>
                      {quizScore === selected.quizzes.length ? <CheckCircle2 className="w-8 h-8 mx-auto mb-2" /> : <XCircle className="w-8 h-8 mx-auto mb-2" />}
                      {quizScore}/{selected.quizzes.length} Correct · {quizScore === selected.quizzes.length ? '+50 XP Earned! 🎉' : 'Keep practicing!'}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="premium-card p-6">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><ListMusic className="w-5 h-5 text-primary" />All Lessons</h3>
            <div className="space-y-3">
              {LESSONS.map(lesson => (
                <button key={lesson.id} onClick={() => handleLessonSelect(lesson)}
                  className={cn("w-full flex gap-4 p-3 rounded-2xl transition-all text-left group",
                    selected.id === lesson.id ? "bg-primary/5 ring-1 ring-primary/20 shadow-md" : "hover:bg-slate-50"
                  )}>
                  <div className={cn("w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-black text-sm flex-shrink-0", lesson.color)}>{lesson.level}</div>
                  <div className="flex-1 min-w-0 py-1">
                    <h4 className="text-sm font-bold truncate group-hover:text-primary transition-colors">{lesson.title}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{lesson.category} · {lesson.duration}</p>
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
