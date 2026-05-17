'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { BookMarked, Plus, Search, Trash2, Sparkles, Loader2, LogIn, Volume2, Star, X, ChevronDown, Clock, CheckCheck, Lightbulb, MessageSquare, Tag, RotateCcw, AlertCircle, Brain, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// ─── Types ────────────────────────────────────────────────────────────────────
interface WordType { type: string; meaningEn: string; meaningVi: string; }
interface UsageExample { context: string; sentence: string; sentenceVi: string; }
interface WordInsight {
  phonetic: string; wordTypes: WordType[];
  usageExamples: UsageExample[]; tip: string; cefrLevel: string;
}
interface NotebookWord {
  id: string; word: string; phonetic?: string; meaningEn: string; meaningVi: string;
  wordType: string; cefrLevel?: string; masteryLevel: number;
  nextReviewAt?: string; savedAt?: string;
}

const MASTERY = ['New', 'Familiar', 'Learning', 'Practiced', 'Mastered', 'Expert'];
const MASTERY_CLR = ['bg-slate-200 text-slate-600', 'bg-blue-100 text-blue-700', 'bg-yellow-100 text-yellow-700', 'bg-orange-100 text-orange-700', 'bg-green-100 text-green-700', 'bg-purple-100 text-purple-700'];
const TYPE_COLORS: Record<string, string> = { noun: 'bg-sky-100 text-sky-700', verb: 'bg-rose-100 text-rose-700', adjective: 'bg-violet-100 text-violet-700', adverb: 'bg-amber-100 text-amber-700', phrase: 'bg-teal-100 text-teal-700', idiom: 'bg-pink-100 text-pink-700' };
const speak = (text: string, lang = 'en-US') => { if (typeof window === 'undefined') return; const u = new SpeechSynthesisUtterance(text); u.lang = lang; u.rate = 0.85; const v = window.speechSynthesis.getVoices().find(v => v.lang === 'en-US' && v.name.includes('Google')) || window.speechSynthesis.getVoices().find(v => v.lang === 'en-US'); if (v) u.voice = v; window.speechSynthesis.speak(u); };

// ─── Word Card ────────────────────────────────────────────────────────────────
function WordCard({ word, onDelete }: { word: NotebookWord; onDelete: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState<'definition' | 'usage' | 'pronunciation'>('definition');
  const [insight, setInsight] = useState<WordInsight | null>(null);
  const [loading, setLoading] = useState(false);
  const reviewDue = word.nextReviewAt ? new Date(word.nextReviewAt) <= new Date() : false;

  const loadInsight = async () => {
    if (insight) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/ai/word-insight`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: word.word })
      });
      if (!res.ok) throw new Error('AI busy');
      const data = await res.json();
      setInsight(data);
    } catch { setInsight(null); }
    finally { setLoading(false); }
  };

  const handleExpand = () => {
    if (!expanded) loadInsight();
    setExpanded(e => !e);
  };

  const typeColor = TYPE_COLORS[word.wordType?.toLowerCase()] || 'bg-slate-100 text-slate-500';

  return (
    <div className={cn("premium-card overflow-hidden transition-all duration-300", expanded ? "shadow-2xl" : "hover:shadow-xl hover:-translate-y-0.5")}>
      <div className="p-5 cursor-pointer" onClick={handleExpand}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-black text-slate-900">{word.word}</h3>
              {word.phonetic && <span className="text-sm text-slate-400 font-mono">{word.phonetic}</span>}
              <button onClick={e => { e.stopPropagation(); speak(word.word); }} className="p-1 text-slate-300 hover:text-primary transition-colors"><Volume2 className="w-4 h-4" /></button>
            </div>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {word.wordType && <span className={cn("text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider", typeColor)}>{word.wordType}</span>}
              {word.cefrLevel && <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">{word.cefrLevel}</span>}
              <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", MASTERY_CLR[Math.min(word.masteryLevel, 5)])}>{MASTERY[Math.min(word.masteryLevel, 5)]}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={e => { e.stopPropagation(); onDelete(word.id); }} className="p-1.5 text-slate-200 hover:text-rose-500 transition-all"><Trash2 className="w-4 h-4" /></button>
            <ChevronDown className={cn("w-5 h-5 text-slate-300 transition-transform", expanded && "rotate-180")} />
          </div>
        </div>
        {!expanded && (
          <div className="mt-3 space-y-0.5">
            <p className="text-sm text-slate-600 font-medium line-clamp-1">{word.meaningEn}</p>
            <p className="text-sm text-primary/70 italic line-clamp-1">{word.meaningVi}</p>
          </div>
        )}
      </div>

      {expanded && (
        <div className="border-t border-slate-100 animate-in slide-in-from-top-2 duration-300">
          <div className="flex border-b border-slate-100 bg-slate-50/50">
            {(['definition', 'usage', 'pronunciation'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} className={cn("flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-1.5", tab === t ? "text-primary border-b-2 border-primary bg-white" : "text-slate-400 hover:text-slate-600")}>
                {t === 'definition' && <BookMarked className="w-3.5 h-3.5" />}
                {t === 'usage' && <Lightbulb className="w-3.5 h-3.5" />}
                {t === 'pronunciation' && <Volume2 className="w-3.5 h-3.5" />}
                {t}
              </button>
            ))}
          </div>

          <div className="p-5">
            {loading ? (
              <div className="flex flex-col items-center gap-3 py-8 text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-xs font-black uppercase tracking-widest">Đang phân tích...</p>
              </div>
            ) : (
              <>
                {tab === 'definition' && (
                  <div className="space-y-4">
                    {insight ? insight.wordTypes.map((wt, i) => (
                      <div key={i} className="flex gap-3">
                        <span className={cn("text-[10px] font-black px-2 py-0.5 rounded-full uppercase h-fit mt-0.5 flex-shrink-0", TYPE_COLORS[wt.type?.toLowerCase()] || 'bg-slate-100 text-slate-500')}>{wt.type}</span>
                        <div>
                          <p className="text-sm font-semibold text-slate-700 leading-relaxed">{wt.meaningEn}</p>
                          <p className="text-sm text-primary italic mt-0.5">{wt.meaningVi}</p>
                        </div>
                      </div>
                    )) : (
                      <div className="space-y-3">
                        <div className="flex gap-3">
                          <span className={cn("text-[10px] font-black px-2 py-0.5 rounded-full uppercase h-fit mt-0.5 flex-shrink-0", typeColor)}>{word.wordType}</span>
                          <div>
                            <p className="text-sm font-semibold text-slate-700 leading-relaxed">{word.meaningEn || 'Definition not found'}</p>
                            <p className="text-sm text-primary italic mt-0.5">{word.meaningVi}</p>
                          </div>
                        </div>
                        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-3">
                          <AlertCircle className="w-5 h-5 text-amber-500" />
                          <p className="text-xs text-amber-700 font-medium">AI hiện đang bận hoặc từ này không có trong từ điển. Thử nhấn nút làm mới bên dưới.</p>
                        </div>
                        <button onClick={() => loadInsight()} className="w-full py-2 text-xs font-black text-primary border-2 border-dashed border-primary/20 rounded-xl">Làm mới với AI</button>
                      </div>
                    )}
                    {insight?.tip && (
                      <div className="flex gap-2 p-3 bg-blue-50 border border-blue-100 rounded-2xl mt-3">
                        <Lightbulb className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <p className="text-sm text-blue-700 font-medium">{insight.tip}</p>
                      </div>
                    )}
                  </div>
                )}
                {tab === 'usage' && (
                  <div className="space-y-4">
                    {insight?.usageExamples?.map((ex, i) => (
                      <div key={i} className="rounded-2xl border border-slate-100 overflow-hidden">
                        <div className="px-4 py-2 bg-slate-50 flex items-center gap-2"><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{ex.context}</span></div>
                        <div className="p-4"><p className="text-sm font-semibold text-slate-800">"{ex.sentence}"</p><p className="text-xs text-slate-400 italic mt-1">{ex.sentenceVi}</p></div>
                      </div>
                    )) || <div className="text-center py-8 text-slate-300">Không có ví dụ cho từ này</div>}
                  </div>
                )}
                {tab === 'pronunciation' && (
                  <div className="flex flex-col items-center gap-5 py-4">
                    <div className="text-5xl font-black text-slate-800">{word.word}</div>
                    <span className="text-2xl font-mono text-slate-400">{insight?.phonetic || word.phonetic || '—'}</span>
                    <button onClick={() => speak(word.word)} className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-all"><Volume2 className="w-9 h-9" /></button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Add Word Panel ────────────────────────────────────────────────────────────
function AddWordPanel({ onAdd }: { onAdd: (d: any) => Promise<void> }) {
  const [word, setWord] = useState('');
  const [wordType, setWordType] = useState('');
  const [meaningVi, setMeaningVi] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const wordCount = word.trim().split(/\s+/).length;
  const isTooLong = wordCount >= 2;

  const reset = () => { setWord(''); setWordType(''); setMeaningVi(''); setExpanded(false); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim() || isTooLong || loading) return;
    setLoading(true);
    try { await onAdd({ word: word.trim(), wordType: wordType || 'other', meaningVi: meaningVi.trim() }); reset(); }
    finally { setLoading(false); }
  };

  return (
    <div className="premium-card p-6 border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-purple-50">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Plus className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
            <input
              type="text" value={word} placeholder="Nhập 1 từ tiếng Anh... (vd: curious)"
              onChange={e => { setWord(e.target.value); setExpanded(!!e.target.value); }}
              className={cn("w-full pl-10 pr-4 py-3.5 bg-white border border-primary/20 rounded-xl text-base font-medium transition-all focus:outline-none focus:ring-2", isTooLong && "border-rose-300 ring-rose-100")}
            />
          </div>
        </div>

        {expanded && word.trim() && (
          <div className="space-y-4 animate-in slide-in-from-top-2">
            {isTooLong ? (
              <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl flex items-start gap-3 border border-rose-100">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-black uppercase text-[10px] mb-1">Không thể lưu cụm từ</p>
                  Notebook chỉ dùng để lưu **từ vựng đơn lẻ**. Các cụm từ từ 2 từ trở lên sẽ không được lưu để đảm bảo chất lượng ôn tập.
                </div>
              </div>
            ) : (
              <>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Loại từ</label>
                  <div className="flex flex-wrap gap-2">
                    {['noun', 'verb', 'adjective', 'adverb', 'other'].map(t => (
                      <button key={t} type="button" onClick={() => setWordType(t)} className={cn("px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all", wordType === t ? "bg-primary text-white border-primary" : "bg-white text-slate-500 border-slate-200")}>
                        {t === 'noun' ? 'Danh từ' : t === 'verb' ? 'Động từ' : t === 'adjective' ? 'Tính từ' : t === 'adverb' ? 'Trạng từ' : 'Khác'}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Nghĩa tiếng Việt</label>
                  <textarea value={meaningVi} onChange={e => setMeaningVi(e.target.value)} placeholder="Nghĩa của từ này là gì?" rows={2} className="w-full p-3 border-2 border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none resize-none" />
                </div>
                <div className="flex items-center gap-3">
                  <button type="submit" disabled={loading} className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
                    {loading ? 'Đang lưu...' : 'Lưu vào Notebook'}
                  </button>
                  <button type="button" onClick={reset} className="px-6 py-3 text-slate-400 font-bold text-sm">Hủy</button>
                </div>
              </>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

import { useRouter } from 'next/navigation';

export default function NotebookPage() {
  const { user, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [words, setWords] = useState<NotebookWord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok = true) => { setToast({ msg, ok }); setTimeout(() => setToast(null), 3000); };
  const fetchWords = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const token = await user.getIdToken();
      const res = await fetch(`${API_BASE}/vocabulary/notebook`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setWords(data.words || []);
    } catch { showToast('Lỗi tải dữ liệu', false); }
    finally { setLoading(false); }
  }, [user]);

  useEffect(() => { fetchWords(); }, [fetchWords]);

  const handleAdd = async (form: any) => {
    if (!user) return;
    const token = await user.getIdToken();
    const res = await fetch(`${API_BASE}/vocabulary/notebook`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form)
    });
    if (!res.ok) { 
      const errData = await res.json().catch(() => ({}));
      showToast(errData.error || 'Không thể thêm từ', false); 
      return; 
    }
    const data = await res.json();
    const dictMsg = data.syncedToDictionary 
      ? ` → Đã đồng bộ vào Dictionary (${data.cefrLevel})`
      : '';
    showToast(`✨ Đã thêm "${form.word}" vào Notebook!${dictMsg}`);
    fetchWords();
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    const token = await user.getIdToken();
    await fetch(`${API_BASE}/vocabulary/notebook/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    setWords(p => p.filter(w => w.id !== id));
    showToast('Đã xóa từ');
  };

  if (!user) return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6"><BookMarked className="w-10 h-10" /></div>
      <h1 className="text-2xl font-black">Đăng nhập để xem Notebook</h1>
      <button onClick={signInWithGoogle} className="mt-6 px-8 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-xl">Đăng nhập với Google</button>
    </div>
  );

  const filtered = words.filter(w => w.word.toLowerCase().includes(search.toLowerCase()) || w.meaningVi?.includes(search));
  const reviewDue = words.filter(w => w.nextReviewAt && new Date(w.nextReviewAt) <= new Date()).length;

  return (
    <div className="space-y-8 pb-10">
      {toast && <div className={cn("fixed top-6 right-6 z-50 px-6 py-3 rounded-xl font-bold text-sm shadow-2xl animate-in slide-in-from-right-4", toast.ok ? "bg-slate-900 text-white" : "bg-rose-500 text-white")}>{toast.msg}</div>}

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black flex items-center gap-3"><BookMarked className="w-8 h-8 text-primary" />Notebook</h1>
          <p className="text-slate-500 font-medium">Lưu trữ từ vựng đơn lẻ để ôn tập chuyên sâu cùng EngBot AI.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/review')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl font-bold hover:scale-105 transition-all shadow-lg"
          >
            <RotateCcw className="w-4 h-4" /> Ôn tập
            {reviewDue > 0 && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] text-white animate-pulse">{reviewDue}</span>}
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl">
            <BookMarked className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary">{words.length} từ</span>
          </div>
        </div>
      </header>

      {/* Review CTA Banner - Always visible but dynamic */}
      <div className={cn(
        "premium-card p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group border-none",
        reviewDue > 0
          ? "bg-gradient-to-r from-primary to-indigo-600 text-white shadow-primary/20"
          : "bg-white text-slate-800 border-2 border-slate-100"
      )}>
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-500">
          <Brain className={cn("w-32 h-32", reviewDue > 0 ? "text-white" : "text-primary")} />
        </div>

        <div className="space-y-1 relative z-10 text-center md:text-left">
          <h2 className="text-xl font-black flex items-center justify-center md:justify-start gap-2">
            {reviewDue > 0 ? (
              <>
                <Sparkles className="w-5 h-5 fill-white" /> Đã đến lúc ôn tập!
              </>
            ) : (
              <>
                <CheckCheck className="w-5 h-5 text-green-500" /> Bạn đã thuộc hết từ hôm nay!
              </>
            )}
          </h2>
          <p className={cn("font-medium", reviewDue > 0 ? "text-white/80" : "text-slate-500")}>
            {reviewDue > 0
              ? `Bạn có ${reviewDue} từ vựng đang chờ được nhắc lại để không bị quên.`
              : "Bạn không có từ nào đến hạn ôn tập. Nhưng bạn vẫn có thể luyện tập thêm để nhớ lâu hơn!"}
          </p>
        </div>

        <button
          onClick={() => router.push('/review/quiz')}
          className={cn(
            "px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition-all relative z-10 flex items-center gap-2",
            reviewDue > 0 ? "bg-white text-primary" : "bg-slate-900 text-white"
          )}
        >
          {reviewDue > 0 ? "BẮT ĐẦU ÔN TẬP" : "LUYỆN TẬP NGAY"} <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <AddWordPanel onAdd={handleAdd} />

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
        <input type="text" placeholder="Tìm kiếm trong Notebook..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/10" />
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-300">
          <BookMarked className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p className="font-bold">Không tìm thấy từ nào</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(w => <WordCard key={w.id} word={w} onDelete={handleDelete} />)}
        </div>
      )}
    </div>
  );
}
