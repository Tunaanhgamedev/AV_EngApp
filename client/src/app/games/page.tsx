'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Gamepad2, Zap, Trophy, Target, Brain, Timer, Star, ChevronRight, Flame, Sparkles, X, CheckCircle2, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Vocabulary Match Game Data ───────────────────────────────────────────────
const WORD_PAIRS = [
  { id: 1, en: 'Abundant', vi: 'Phong phú' },
  { id: 2, en: 'Ambiguous', vi: 'Mơ hồ' },
  { id: 3, en: 'Eloquent', vi: 'Hùng hồn' },
  { id: 4, en: 'Diligent', vi: 'Chăm chỉ' },
  { id: 5, en: 'Sincere', vi: 'Chân thành' },
  { id: 6, en: 'Resilient', vi: 'Kiên cường' },
];

interface Card { id: number; word: string; type: 'en' | 'vi'; pairId: number; matched: boolean; }

function VocabMatchGame({ onClose }: { onClose: () => void }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [selected, setSelected] = useState<Card[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);
  const [won, setWon] = useState(false);

  const initGame = useCallback(() => {
    const deck: Card[] = [];
    WORD_PAIRS.forEach(p => {
      deck.push({ id: p.id * 10, word: p.en, type: 'en', pairId: p.id, matched: false });
      deck.push({ id: p.id * 10 + 1, word: p.vi, type: 'vi', pairId: p.id, matched: false });
    });
    setCards(deck.sort(() => Math.random() - 0.5));
    setSelected([]); setMatches(0); setMoves(0); setTimer(0); setRunning(true); setWon(false);
  }, []);

  useEffect(() => { initGame(); }, [initGame]);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setTimer(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  const handleSelect = (card: Card) => {
    if (card.matched || selected.length === 2 || selected.find(c => c.id === card.id)) return;
    const next = [...selected, card];
    setSelected(next);
    if (next.length === 2) {
      setMoves(m => m + 1);
      if (next[0].pairId === next[1].pairId) {
        setCards(prev => prev.map(c => c.pairId === next[0].pairId ? { ...c, matched: true } : c));
        setMatches(m => {
          const nm = m + 1;
          if (nm === WORD_PAIRS.length) { setRunning(false); setWon(true); }
          return nm;
        });
        setTimeout(() => setSelected([]), 300);
      } else {
        setTimeout(() => setSelected([]), 800);
      }
    }
  };

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div>
            <h2 className="text-xl font-black">Vocabulary Match</h2>
            <p className="text-blue-200 text-xs font-medium">Match English words with Vietnamese meanings</p>
          </div>
          <div className="flex items-center gap-6 text-sm font-black">
            <div className="text-center"><p className="text-blue-200 text-[10px] uppercase tracking-widest">Time</p><p className="text-xl">{fmt(timer)}</p></div>
            <div className="text-center"><p className="text-blue-200 text-[10px] uppercase tracking-widest">Moves</p><p className="text-xl">{moves}</p></div>
            <div className="text-center"><p className="text-blue-200 text-[10px] uppercase tracking-widest">Matched</p><p className="text-xl">{matches}/{WORD_PAIRS.length}</p></div>
            <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all"><X className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Win Screen */}
        {won ? (
          <div className="p-12 text-center space-y-6 animate-in zoom-in duration-500">
            <div className="text-6xl animate-bounce">🎉</div>
            <h3 className="text-3xl font-black text-slate-800">Brilliant!</h3>
            <p className="text-slate-500">Completed in <strong>{fmt(timer)}</strong> with <strong>{moves} moves</strong></p>
            <div className="flex gap-4 justify-center">
              <button onClick={initGame} className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:opacity-90 transition-all flex items-center gap-2"><RotateCcw className="w-4 h-4" /> Play Again</button>
              <button onClick={onClose} className="px-8 py-3 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all">Back to Games</button>
            </div>
          </div>
        ) : (
          /* Card Grid */
          <div className="p-8 grid grid-cols-4 gap-3">
            {cards.map(card => {
              const isSel = selected.find(c => c.id === card.id);
              return (
                <button
                  key={card.id}
                  onClick={() => handleSelect(card)}
                  disabled={card.matched}
                  className={cn(
                    "h-16 rounded-2xl font-bold text-sm transition-all duration-300 border-2 leading-tight px-2",
                    card.matched
                      ? "bg-green-50 border-green-200 text-green-600 scale-95 cursor-default"
                      : isSel
                      ? "bg-indigo-600 border-indigo-600 text-white scale-105 shadow-lg"
                      : card.type === 'en'
                      ? "bg-slate-900 border-slate-700 text-white hover:scale-105 hover:shadow-md"
                      : "bg-blue-50 border-blue-100 text-blue-800 hover:scale-105 hover:shadow-md"
                  )}
                >
                  {card.matched ? <CheckCircle2 className="w-5 h-5 mx-auto text-green-500" /> : card.word}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Speed Quiz Game ───────────────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
  { q: 'What is "Generous" in Vietnamese?', options: ['Rộng lượng', 'Tự cao', 'Lười biếng', 'Tức giận'], answer: 0 },
  { q: 'Choose the correct past tense of "Go":', options: ['Goed', 'Gone', 'Went', 'Going'], answer: 2 },
  { q: 'What does "Persevere" mean?', options: ['Bỏ cuộc', 'Kiên trì', 'Nghi ngờ', 'Tức giận'], answer: 1 },
  { q: 'Which is a synonym for "Happy"?', options: ['Sad', 'Angry', 'Joyful', 'Tired'], answer: 2 },
  { q: '"She ___ to school every day." (Present Simple)', options: ['go', 'went', 'goes', 'going'], answer: 2 },
];

function SpeedQuizGame({ onClose }: { onClose: () => void }) {
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done || selected !== null) return;
    if (timeLeft === 0) { handleAnswer(-1); return; }
    const t = setTimeout(() => setTimeLeft(p => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, done, selected]);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === QUIZ_QUESTIONS[qIdx].answer) setScore(s => s + 1);
    setTimeout(() => {
      if (qIdx < QUIZ_QUESTIONS.length - 1) { setQIdx(q => q + 1); setSelected(null); setTimeLeft(15); }
      else setDone(true);
    }, 1200);
  };

  const q = QUIZ_QUESTIONS[qIdx];
  const pct = (timeLeft / 15) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="px-8 py-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-black opacity-80">Q {qIdx + 1}/{QUIZ_QUESTIONS.length}</span>
            <span className={cn("text-2xl font-black", timeLeft <= 5 && "animate-pulse text-yellow-300")}>{timeLeft}s</span>
            <button onClick={onClose} className="p-1.5 bg-white/20 rounded-full"><X className="w-4 h-4" /></button>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {done ? (
          <div className="p-10 text-center space-y-5 animate-in zoom-in duration-500">
            <div className="text-5xl">{score >= 4 ? '🏆' : score >= 3 ? '🎉' : '📚'}</div>
            <h3 className="text-2xl font-black">{score}/{QUIZ_QUESTIONS.length} Correct!</h3>
            <p className="text-slate-500">+{score * 20} XP earned</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => { setQIdx(0); setScore(0); setSelected(null); setTimeLeft(15); setDone(false); }} className="px-6 py-3 bg-rose-500 text-white rounded-2xl font-bold"><RotateCcw className="w-4 h-4 inline mr-1" />Retry</button>
              <button onClick={onClose} className="px-6 py-3 bg-slate-100 text-slate-700 rounded-2xl font-bold">Done</button>
            </div>
          </div>
        ) : (
          <div className="p-8 space-y-6">
            <h3 className="text-xl font-black text-slate-800 leading-snug">{q.q}</h3>
            <div className="grid grid-cols-2 gap-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={selected !== null}
                  className={cn(
                    "p-4 rounded-2xl text-sm font-bold border-2 text-left transition-all",
                    selected === null ? "border-slate-100 hover:border-rose-300 hover:bg-rose-50" :
                    i === q.answer ? "bg-green-50 border-green-400 text-green-700" :
                    i === selected ? "bg-rose-50 border-rose-400 text-rose-700" :
                    "border-slate-100 opacity-40"
                  )}
                >{opt}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Games Page ───────────────────────────────────────────────────────────
const GAMES = [
  { id: 'vocab', title: "Vocabulary Match", description: "Connect English words with Vietnamese meanings. Beat your best time!", icon: <Target className="w-10 h-10" />, color: "bg-blue-500", shadow: "shadow-blue-500/20", xp: "+50 XP", players: "1.2k playing" },
  { id: 'quiz',  title: "Speed Quiz",       description: "Multi-choice questions under pressure. 15 seconds per question!", icon: <Timer className="w-10 h-10" />,  color: "bg-rose-500", shadow: "shadow-rose-500/20",  xp: "+100 XP", players: "800 playing" },
  { id: 'spell', title: "Spelling Bee",     description: "Listen to the word and type it correctly. Coming soon!", icon: <Zap className="w-10 h-10" />,    color: "bg-yellow-500",shadow: "shadow-yellow-500/20",xp: "+75 XP",  players: "2.5k playing" },
  { id: 'scram', title: "Word Scramble",    description: "Unscramble the letters to find the hidden word. Coming soon!",  icon: <Brain className="w-10 h-10" />,  color: "bg-purple-500",shadow: "shadow-purple-500/20",xp: "+60 XP",  players: "500 playing" },
];

export default function GamesPage() {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {activeGame === 'vocab' && <VocabMatchGame onClose={() => setActiveGame(null)} />}
      {activeGame === 'quiz'  && <SpeedQuizGame  onClose={() => setActiveGame(null)} />}

      <header className="text-center space-y-4">
        <div className="inline-flex p-3 bg-indigo-100 rounded-2xl text-indigo-600 mb-2"><Gamepad2 className="w-8 h-8" /></div>
        <h1 className="text-4xl font-black tracking-tight">Quiz & Games</h1>
        <p className="text-slate-500 max-w-lg mx-auto font-medium">Gamify your learning. Earn XP, collect badges, and climb the leaderboard.</p>
      </header>

      {/* Hero Banner */}
      <section className="relative overflow-hidden premium-card bg-slate-900 text-white p-8 md:p-12 rounded-[40px]">
        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Trophy className="w-64 h-64" /></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-black uppercase tracking-widest">
              <Flame className="w-3 h-3 fill-primary" /> Special Event
            </div>
            <h2 className="text-4xl font-black leading-tight">Weekly Grammar Grand Prix</h2>
            <p className="text-slate-400 text-lg">Compete against 5,000+ students. Top 3 win an exclusive badge!</p>
            <div className="flex items-center gap-4">
              <button className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-lg hover:opacity-90 transition-all shadow-xl shadow-primary/40">Join Event Now</button>
              <div><p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Ends in</p><p className="text-xl font-black">04:22:15</p></div>
            </div>
          </div>
          <div className="hidden md:flex gap-4 ml-auto">
            {[{ label: 'Rank', value: '#12' }, { label: 'XP', value: '450' }].map((c, i) => (
              <div key={i} className="p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 text-center min-w-[100px]">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{c.label}</p>
                <p className="text-2xl font-black mt-1">{c.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Game Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GAMES.map((game) => (
          <div key={game.id} className="premium-card p-1 group cursor-pointer hover:shadow-2xl transition-all duration-500" onClick={() => (game.id === 'vocab' || game.id === 'quiz') && setActiveGame(game.id)}>
            <div className="bg-white rounded-[22px] p-6 flex items-start gap-6 h-full">
              <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center text-white flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6", game.color, game.shadow)}>
                {game.icon}
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-800">{game.title}</h3>
                  <span className="text-xs font-black text-green-500">{game.xp}</span>
                </div>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{game.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{game.players}</span>
                  <button className={cn("flex items-center gap-1 text-sm font-black transition-all", (game.id === 'vocab' || game.id === 'quiz') ? "text-primary group-hover:translate-x-1" : "text-slate-300 cursor-not-allowed")}>
                    {(game.id === 'vocab' || game.id === 'quiz') ? 'Play Now' : 'Coming Soon'} <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Achievements */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 premium-card p-8 bg-slate-50 border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />Game Achievements</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[{ label:'Speed Demon', value:'Lvl 4', icon:'⚡' }, { label:'Spelling King', value:'Lvl 2', icon:'👑' }, { label:'Match Maker', value:'Lvl 5', icon:'🤝' }, { label:'Grammar Pro', value:'Lvl 1', icon:'🎓' }].map((b, i) => (
              <div key={i} className="text-center space-y-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-3xl">{b.icon}</div>
                <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{b.label}</p><p className="font-bold text-slate-800">{b.value}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="premium-card p-8 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2"><Sparkles className="w-5 h-5 text-yellow-400 fill-yellow-400" />Lucky Spin</h3>
            <p className="text-indigo-100 text-sm leading-relaxed">You have <span className="font-bold text-white">1 free spin</span> today. Win XP or badges!</p>
            <button className="w-full py-4 bg-yellow-400 text-indigo-900 rounded-2xl font-black text-lg hover:bg-yellow-300 transition-all shadow-xl">Spin Wheel</button>
          </div>
          <Gamepad2 className="absolute -right-6 -bottom-6 w-32 h-32 text-white/10 opacity-20 rotate-12" />
        </div>
      </section>
    </div>
  );
}
