import React from 'react';
import { 
  Flame, 
  Target, 
  Award, 
  Clock, 
  TrendingUp, 
  ChevronRight,
  BookOpen,
  Mic2,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Good morning, John! 👋</h1>
          <p className="text-slate-500">You're on a 5-day streak. Keep it up!</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 premium-card">
            <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
            <span className="font-bold">5 Days</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 premium-card">
            <Award className="w-5 h-5 text-yellow-500" />
            <span className="font-bold">Level 12</span>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Words Learned', value: '1,240', sub: '+24 today', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'XP Points', value: '4,250', sub: 'Top 10%', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' },
          { label: 'Learning Time', value: '12.5h', sub: 'This week', icon: Clock, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Accuracy', value: '92%', sub: 'Speaking', icon: Target, color: 'text-rose-500', bg: 'bg-rose-50' },
        ].map((stat, i) => (
          <div key={i} className="premium-card p-6 flex items-start justify-between group cursor-pointer hover:premium-card-hover">
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              <p className="text-xs text-slate-400 mt-1 font-medium">{stat.sub}</p>
            </div>
            <div className={cn("p-3 rounded-xl", stat.bg)}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Daily Goal & Main Actions */}
        <div className="lg:col-span-2 space-y-8">
          <div className="premium-card p-8 gradient-bg text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2">Daily Goal Progress</h2>
              <p className="text-white/80 mb-6">You've completed 75% of your goal today!</p>
              
              <div className="w-full h-3 bg-white/20 rounded-full mb-6 overflow-hidden">
                <div className="w-3/4 h-full bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)]" />
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg shadow-black/10">
                  Start Learning Now
                </button>
                <button className="px-6 py-3 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-xl font-bold hover:bg-white/30 transition-colors">
                  Daily Challenge
                </button>
              </div>
            </div>
            {/* Abstract Background Shapes */}
            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute right-12 top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="premium-card p-6 hover:premium-card-hover cursor-pointer group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-blue-500" />
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-bold text-lg">AI Chat Practice</h3>
              <p className="text-sm text-slate-500 mt-1">Practice conversation with our AI mentor about "Travel".</p>
            </div>
            <div className="premium-card p-6 hover:premium-card-hover cursor-pointer group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-rose-50 rounded-xl">
                  <Mic2 className="w-6 h-6 text-rose-500" />
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-bold text-lg">Pronunciation Coaching</h3>
              <p className="text-sm text-slate-500 mt-1">Review 12 words you recently mispronounced.</p>
            </div>
          </div>
        </div>

        {/* Sidebar: Words You May Forget */}
        <div className="space-y-6">
          <div className="premium-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg">Words to Review</h3>
              <span className="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded-full">15 words</span>
            </div>
            
            <div className="space-y-4">
              {[
                { word: 'Confident', type: 'Adj', level: 'B2', strength: 65 },
                { word: 'Opportunity', type: 'Noun', level: 'B1', strength: 40 },
                { word: 'Achieve', type: 'Verb', level: 'B1', strength: 30 },
                { word: 'Collaborate', type: 'Verb', level: 'C1', strength: 20 },
              ].map((item, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{item.word}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{item.type}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">{item.level}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all duration-1000",
                        item.strength > 50 ? "bg-green-500" : item.strength > 30 ? "bg-yellow-500" : "bg-rose-500"
                      )} 
                      style={{ width: `${item.strength}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-3 mt-8 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              Review All Words
            </button>
          </div>

          <div className="premium-card p-6 bg-slate-900 text-white">
            <h3 className="font-bold mb-2">Upgrade to Pro</h3>
            <p className="text-slate-400 text-sm mb-4">Get unlimited AI chat and personalized coaching.</p>
            <button className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
