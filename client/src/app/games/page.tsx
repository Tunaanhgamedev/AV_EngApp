'use client';

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Gamepad2, Zap, Trophy, Target, Brain, Timer, Star, ChevronRight, Flame, Sparkles, Loader2, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { GAME_CATALOG_DATA } from '@/data/games/gameData';
import { getCategoryLabel } from './components/shared';

// ─── Lazy-loaded game components ────────────────────────────────────────────────
const VocabMatchGame = lazy(() => import('./components/VocabMatchGame'));
const SpeedQuizGame = lazy(() => import('./components/SpeedQuizGame'));
const WordScrambleGame = lazy(() => import('./components/WordScrambleGame'));
const SentenceBuilderGame = lazy(() => import('./components/SentenceBuilderGame'));
const IdiomConnectorGame = lazy(() => import('./components/IdiomConnectorGame'));
const ImageGuessGame = lazy(() => import('./components/ImageGuessGame'));
const WordHunterGame = lazy(() => import('./components/WordHunterGame'));

const GameLoading = () => (
  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
    <div className="bg-white rounded-3xl p-12 shadow-2xl text-center space-y-4">
      <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mx-auto" />
      <p className="text-sm font-bold text-slate-500">Đang tải trò chơi...</p>
    </div>
  </div>
);

const getGameIcon = (id: string) => {
  switch (id) {
    case 'vocab': return <Target className="w-10 h-10" />;
    case 'quiz': return <Timer className="w-10 h-10" />;
    case 'scram': return <Brain className="w-10 h-10" />;
    case 'wordHunter': return <Target className="w-10 h-10" />;
    case 'imageGuess': return <ImageIcon className="w-10 h-10" />;
    case 'sentence': return <Zap className="w-10 h-10" />;
    case 'idiom': return <Sparkles className="w-10 h-10" />;
    default: return <Gamepad2 className="w-10 h-10" />;
  }
};

export default function GamesPage() {
  const { user } = useAuth();
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'oxford' | 'toeic' | 'ielts' | 'notebook'>('all');
  const [dbWords, setDbWords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [rank, setRank] = useState<string>('#-');
  const [xp, setXp] = useState<string>('0');
  const [savingWord, setSavingWord] = useState<string | null>(null);
  const [savedWords, setSavedWords] = useState<Record<string, boolean>>({});

  const handleSaveToNotebook = async (word: any) => {
    if (!user) return;
    setSavingWord(word.word);
    try {
      const token = await user.getIdToken();
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      await fetch(`${API_BASE}/vocabulary/notebook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          word: word.word,
          meaningVi: word.meaningVi,
          meaningEn: word.meaningEn || word.word,
          wordType: word.wordType || '',
          phonetic: word.phonetic || ''
        })
      });
      setSavedWords(prev => ({ ...prev, [word.word.toLowerCase()]: true }));
    } catch (err) {
      console.error('Save to notebook failed:', err);
    } finally {
      setSavingWord(null);
    }
  };

  const handleAwardXp = async (amount: number, reason: string) => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_BASE}/users/add-xp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ xpToAdd: amount, reason })
      });
      if (res.ok) {
        console.log(`Successfully awarded ${amount} XP for ${reason}`);
      }
    } catch (err) {
      console.error('Failed to award XP:', err);
    }
  };

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        setLoading(true);
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const token = user ? await user.getIdToken() : '';
        const headers: Record<string, string> = {
          'Content-Type': 'application/json'
        };
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(`${API_BASE}/vocabulary/game-data?limit=40&category=${selectedCategory}`, {
          headers
        });
        if (res.ok) {
          const data = await res.json();
          if (data.words) {
            setDbWords(data.words);
          }
        }
      } catch (err) {
        console.error('Failed to load dynamic game vocabulary words:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, [selectedCategory, user]);

  useEffect(() => {
    const fetchUserRank = async () => {
      if (!user) return;
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const token = await user.getIdToken();
        const res = await fetch(`${API_BASE}/users/leaderboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const dbUsers: any[] = await res.json();
          const sorted = [...dbUsers].sort((a, b) => b.xp - a.xp);
          const myIndex = sorted.findIndex(u => u.id === user.uid || u.email === user.email);
          const myUser = sorted[myIndex];
          if (myIndex !== -1 && myUser) {
            setRank(`#${myIndex + 1}`);
            setXp(myUser.xp.toLocaleString());
          }
        }
      } catch (err) {
        console.error('Failed to fetch user rank on games page:', err);
      }
    };

    fetchUserRank();
  }, [user]);

  const gameProps = { dbWords, category: selectedCategory, onClose: () => setActiveGame(null), awardXp: handleAwardXp, onSaveWord: handleSaveToNotebook, savedWords, savingWord };
  const simpleProps = { onClose: () => setActiveGame(null), awardXp: handleAwardXp };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <Suspense fallback={<GameLoading />}>
        {activeGame === 'vocab' && <VocabMatchGame {...gameProps} />}
        {activeGame === 'quiz' && <SpeedQuizGame {...gameProps} />}
        {activeGame === 'scram' && <WordScrambleGame {...gameProps} />}
        {activeGame === 'imageGuess' && <ImageGuessGame {...simpleProps} />}
        {activeGame === 'sentence' && <SentenceBuilderGame {...gameProps} />}
        {activeGame === 'idiom' && <IdiomConnectorGame {...simpleProps} />}
        {activeGame === 'wordHunter' && <WordHunterGame {...gameProps} />}
      </Suspense>

      <header className="text-center space-y-4">
        <div className="inline-flex p-3 bg-indigo-100 rounded-2xl text-indigo-600 mb-2"><Gamepad2 className="w-8 h-8" /></div>
        <h1 className="text-4xl font-black tracking-tight">Quiz & Games</h1>
        <p className="text-slate-500 max-w-lg mx-auto font-medium">Học mà chơi, chơi mà học. Tích lũy điểm kinh nghiệm XP, vượt qua các thử thách ghép câu và từ vựng thú vị!</p>

        {loading && (
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400">
            <Loader2 className="w-4 h-4 animate-spin text-primary" /> Đang tối ưu hóa và đồng bộ kho từ vựng động...
          </div>
        )}
      </header>

      {/* Hero Banner */}
      <section className="relative overflow-hidden premium-card bg-slate-900 text-white p-8 md:p-12 rounded-[40px]">
        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 text-white"><Trophy className="w-64 h-64" /></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-black uppercase tracking-widest">
              <Flame className="w-3 h-3 fill-primary" /> Sự kiện tuần này
            </div>
            <h2 className="text-4xl font-black leading-tight text-white">Đại Lộ Ngữ Pháp Grand Prix</h2>
            <p className="text-slate-400 text-lg">So tài cùng hơn 5,000 học viên khác. Đạt top 3 để giành huy hiệu độc quyền!</p>
            <div className="flex items-center gap-4">
              <button className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-lg hover:opacity-90 transition-all shadow-xl shadow-primary/40 cursor-pointer">Tham gia ngay</button>
              <div><p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Kết thúc sau</p><p className="text-xl font-black text-white">04:22:15</p></div>
            </div>
          </div>
          <div className="hidden md:flex gap-4 ml-auto">
            <div className="p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 text-center min-w-[120px]">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hạng của bạn</p>
              <p className="text-2xl font-black mt-1 text-white">{rank}</p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 text-center min-w-[120px]">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tích lũy XP</p>
              <p className="text-2xl font-black mt-1 text-white">{xp}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Selector */}
      <section className="flex flex-col items-center gap-4">
        <p className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Brain className="w-4 h-4 text-primary animate-pulse" /> Chọn danh mục từ vựng học tập:
        </p>
        <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl gap-2 border border-slate-200/50 dark:border-slate-800 shadow-sm max-w-2xl w-full overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: '🌐 Tất cả', desc: 'Từ ngẫu nhiên' },
            { id: 'oxford', label: '📖 Oxford', desc: 'Từ thông dụng' },
            { id: 'toeic', label: '💼 TOEIC', desc: 'Từ công sở' },
            { id: 'ielts', label: '🎓 IELTS', desc: 'Từ học thuật' },
            { id: 'notebook', label: '📓 Sổ tay', desc: 'Từ đã lưu' },
          ].map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={cn(
                  "flex-1 py-2 px-3 text-center rounded-xl transition-all cursor-pointer whitespace-nowrap min-w-[100px]",
                  isActive
                    ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-sm border border-slate-200/20 font-black"
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-bold"
                )}
              >
                <div className="text-xs">{cat.label}</div>
                <div className="text-[9px] font-medium opacity-60 mt-0.5">{cat.desc}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Vocabulary Preview Panel */}
      <section className="mx-auto max-w-4xl w-full px-6 py-5 bg-slate-50/50 dark:bg-slate-850/20 border border-slate-100 dark:border-slate-800/60 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500/20" /> 
            Từ vựng chuẩn bị ôn tập ({dbWords.length} từ)
          </h3>
          <span className="text-[10px] font-bold text-slate-450 dark:text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-full">
            {getCategoryLabel(selectedCategory)}
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/60 animate-pulse space-y-2">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : dbWords.length === 0 ? (
          <div className="p-6 text-center text-slate-500 text-xs font-semibold">
            {selectedCategory === 'notebook' 
              ? 'Sổ tay của bạn hiện đang trống. Hãy quay lại trang Từ Điển hoặc Chat để lưu thêm từ vựng!'
              : 'Không tìm thấy từ vựng nào thuộc danh mục này.'}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 overflow-x-auto no-scrollbar py-0.5">
            {dbWords.slice(0, 4).map((w, idx) => (
              <div 
                key={w.id || idx} 
                className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/80 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="font-black text-slate-800 dark:text-slate-100 text-sm truncate">{w.word}</span>
                    {w.cefrLevel && (
                      <span className="text-[9px] font-black px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-md">
                        {w.cefrLevel}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 dark:text-slate-555 mt-0.5">
                    {w.wordType && `[${w.wordType}]`} {w.phonetic || ''}
                  </div>
                </div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-455 border-t border-slate-100 dark:border-slate-800/50 mt-2.5 pt-2.5 line-clamp-1">
                  {w.meaningVi}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Game Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GAME_CATALOG_DATA.map((game) => (
          <div
            key={game.id}
            className="premium-card p-1 group cursor-pointer hover:shadow-2xl transition-all duration-500"
            onClick={() => setActiveGame(game.id)}
          >
            <div className="bg-white rounded-[22px] p-6 flex items-start gap-6 h-full">
              <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center text-white flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6", game.color, game.shadow)}>
                {getGameIcon(game.id)}
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-800">{game.title}</h3>
                  <span className="text-xs font-black text-green-500">{game.xp}</span>
                </div>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{game.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{game.players}</span>
                  <button className="flex items-center gap-1 text-sm font-black transition-all text-primary group-hover:translate-x-1 cursor-pointer">
                    {['vocab', 'quiz', 'scram', 'sentence'].includes(game.id)
                      ? `Chơi (${getCategoryLabel(selectedCategory)})`
                      : 'Chơi Ngay'} 
                    <ChevronRight className="w-4 h-4" />
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
            <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800"><Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />Huy Hiệu Trò Chơi</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[{ label: 'Sát Thủ Tốc Độ', value: 'Cấp 4', icon: '⚡' }, { label: 'Vua Chính Tả', value: 'Cấp 2', icon: '👑' }, { label: 'Ghép Cặp Tài Ba', value: 'Cấp 5', icon: '🤝' }, { label: 'Cao Thủ Ngữ Pháp', value: 'Cấp 1', icon: '🎓' }].map((b, i) => (
              <div key={i} className="text-center space-y-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-3xl">{b.icon}</div>
                <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{b.label}</p><p className="font-bold text-slate-800">{b.value}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="premium-card p-8 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2 text-white"><Sparkles className="w-5 h-5 text-yellow-400 fill-yellow-400" />Vòng Quay May Mắn</h3>
            <p className="text-indigo-100 text-sm leading-relaxed font-medium">Hôm nay bạn có <span className="font-bold text-white">1 lượt quay miễn phí</span>. Hãy thử vận may nhận XP và quà tặng!</p>
            <button className="w-full py-4 bg-yellow-400 text-indigo-900 rounded-2xl font-black text-lg hover:bg-yellow-300 transition-all shadow-xl cursor-pointer">Quay Ngay</button>
          </div>
          <Gamepad2 className="absolute -right-6 -bottom-6 w-32 h-32 text-white/10 opacity-20 rotate-12" />
        </div>
      </section>
    </div>
  );
}
