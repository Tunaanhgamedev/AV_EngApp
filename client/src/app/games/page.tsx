'use client';

import React from 'react';
import { 
  Gamepad2, 
  Zap, 
  Trophy, 
  Target, 
  Brain, 
  Timer, 
  Dices,
  Star,
  ChevronRight,
  Flame,
  Gamepad,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const GAMES = [
  {
    id: 1,
    title: "Vocabulary Match",
    description: "Connect English words with their Vietnamese meanings as fast as you can.",
    icon: <Target className="w-10 h-10" />,
    color: "bg-blue-500",
    shadow: "shadow-blue-500/20",
    xp: "+50 XP",
    players: "1.2k playing"
  },
  {
    id: 2,
    title: "Speed Quiz",
    description: "Multi-choice questions under pressure. How many can you get right in 60s?",
    icon: <Timer className="w-10 h-10" />,
    color: "bg-rose-500",
    shadow: "shadow-rose-500/20",
    xp: "+100 XP",
    players: "800 playing"
  },
  {
    id: 3,
    title: "Spelling Bee",
    description: "Listen to the word and type it correctly. Perfect for spelling mastery.",
    icon: <Zap className="w-10 h-10" />,
    color: "bg-yellow-500",
    shadow: "shadow-yellow-500/20",
    xp: "+75 XP",
    players: "2.5k playing"
  },
  {
    id: 4,
    title: "Word Scramble",
    description: "Unscramble the letters to find the hidden English word.",
    icon: <Brain className="w-10 h-10" />,
    color: "bg-purple-500",
    shadow: "shadow-purple-500/20",
    xp: "+60 XP",
    players: "500 playing"
  }
];

export default function GamesPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="text-center space-y-4">
        <div className="inline-flex p-3 bg-indigo-100 rounded-2xl text-indigo-600 mb-2">
          <Gamepad2 className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black tracking-tight">Quiz & Games</h1>
        <p className="text-slate-500 max-w-lg mx-auto font-medium">
          Gamify your learning experience. Earn XP, collect badges, and climb the global leaderboard.
        </p>
      </header>

      {/* Daily Challenge Hero */}
      <section className="relative overflow-hidden premium-card bg-slate-900 text-white p-8 md:p-12 rounded-[40px]">
        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
          <Trophy className="w-64 h-64" />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-black uppercase tracking-widest">
              <Flame className="w-3 h-3 fill-primary" />
              Special Event
            </div>
            <h2 className="text-4xl font-black leading-tight">Weekly Grammar Grand Prix</h2>
            <p className="text-slate-400 text-lg">
              Compete against 5,000+ students in our biggest weekly challenge yet. Top 3 win an exclusive badge!
            </p>
            <div className="flex items-center gap-4">
              <button className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-lg hover:opacity-90 transition-all shadow-xl shadow-primary/40">
                Join Event Now
              </button>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Ends in</p>
                <p className="text-xl font-black text-white">04:22:15</p>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex justify-end">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Rank', value: '#12', icon: <Target className="w-5 h-5" /> },
                { label: 'Tokens', value: '450', icon: <Star className="w-5 h-5 text-yellow-400" /> },
              ].map((card, i) => (
                <div key={i} className="p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 text-center space-y-2">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    {card.icon}
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{card.label}</p>
                  <p className="text-2xl font-black">{card.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Game Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GAMES.map((game) => (
          <div key={game.id} className="premium-card p-1 group cursor-pointer hover:shadow-2xl transition-all duration-500">
            <div className="bg-white rounded-[22px] p-6 flex items-start gap-6 h-full">
              <div className={cn(
                "w-20 h-20 rounded-3xl flex items-center justify-center text-white flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6",
                game.color,
                game.shadow
              )}>
                {game.icon}
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-800">{game.title}</h3>
                  <span className="text-xs font-black text-green-500">{game.xp}</span>
                </div>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  {game.description}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-5 h-5 rounded-full border-2 border-white bg-slate-200" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{game.players}</span>
                  </div>
                  <button className="flex items-center gap-1 text-sm font-black text-primary group-hover:translate-x-1 transition-transform">
                    Play Now
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 premium-card p-8 bg-slate-50 border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Dices className="w-5 h-5 text-indigo-500" />
              Game Achievements
            </h3>
            <button className="text-xs font-black text-primary uppercase tracking-widest">View All</button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: 'Speed Demon', value: 'Lvl 4', icon: '⚡' },
              { label: 'Spelling King', value: 'Lvl 2', icon: '👑' },
              { label: 'Match Maker', value: 'Lvl 5', icon: '🤝' },
              { label: 'Grammar Pro', value: 'Lvl 1', icon: '🎓' },
            ].map((badge, i) => (
              <div key={i} className="text-center space-y-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-3xl">{badge.icon}</div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{badge.label}</p>
                  <p className="font-bold text-slate-800">{badge.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="premium-card p-8 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              Lucky Spin
            </h3>
            <p className="text-indigo-100 text-sm leading-relaxed">
              You have <span className="font-bold text-white">1 free spin</span> available today. Spin the wheel to win XP or unique badges!
            </p>
            <button className="w-full py-4 bg-yellow-400 text-indigo-900 rounded-2xl font-black text-lg hover:bg-yellow-300 transition-all shadow-xl shadow-yellow-400/20">
              Spin Wheel
            </button>
          </div>
          <Gamepad className="absolute -right-6 -bottom-6 w-32 h-32 text-white/10 opacity-20 rotate-12" />
        </div>
      </section>
    </div>
  );
}
