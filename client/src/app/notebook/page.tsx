'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  BookMarked, Plus, Search, Trash2, Sparkles, Loader2,
  LogIn, BookOpen, Tag, Clock, CheckCheck,
  Volume2, Star, X, ChevronDown
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// ─── Types ───────────────────────────────────────────────────────────────────
interface NotebookWord {
  id: string;
  word: string;
  phonetic?: string;
  meaningEn: string;
  meaningVi: string;
  wordType: string;
  cefrLevel?: string;
  masteryLevel: number;
  nextReviewAt?: string;
  savedAt?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const MASTERY_LABELS = ['New', 'Familiar', 'Learning', 'Practiced', 'Mastered', 'Expert'];
const MASTERY_COLORS = [
  'bg-slate-200 text-slate-600',
  'bg-blue-100 text-blue-700',
  'bg-yellow-100 text-yellow-700',
  'bg-orange-100 text-orange-700',
  'bg-green-100 text-green-700',
  'bg-purple-100 text-purple-700',
];

function getMasteryLabel(level: number) {
  return MASTERY_LABELS[Math.min(level, 5)] || 'New';
}
function getMasteryColor(level: number) {
  return MASTERY_COLORS[Math.min(level, 5)] || MASTERY_COLORS[0];
}

function playAudio(word: string) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US';
  window.speechSynthesis.speak(utterance);
}

// ─── Add Word Panel ───────────────────────────────────────────────────────────
function AddWordPanel({ onAdd }: { onAdd: (data: any) => Promise<void> }) {
  const [word, setWord] = useState('');
  const [context, setContext] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim()) return;
    setIsAdding(true);
    try {
      await onAdd({ word: word.trim(), context: context.trim() });
      setWord('');
      setContext('');
      setIsExpanded(false);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="premium-card p-6 border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-purple-50">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Plus className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary opacity-60 pointer-events-none" />
            <input
              id="notebook-word-input"
              type="text"
              placeholder="Type a new word you want to remember..."
              value={word}
              onChange={e => { setWord(e.target.value); setIsExpanded(true); }}
              onFocus={() => setIsExpanded(true)}
              className="w-full pl-10 pr-4 py-3.5 bg-white border border-primary/20 rounded-xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-sm placeholder:text-slate-300 transition-all"
              autoComplete="off"
            />
          </div>
          <button
            id="notebook-add-button"
            type="submit"
            disabled={!word.trim() || isAdding}
            className={cn(
              "flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white transition-all shadow-lg shadow-primary/20",
              word.trim() && !isAdding
                ? "bg-primary hover:bg-primary/90 scale-100 hover:scale-[1.02]"
                : "bg-slate-300 cursor-not-allowed"
            )}
          >
            {isAdding ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
            ) : (
              <><Sparkles className="w-4 h-4 fill-white" /> Add + AI</>
            )}
          </button>
        </div>

        {isExpanded && (
          <div className="animate-in slide-in-from-top-2 duration-200 space-y-3">
            <div className="relative">
              <BookOpen className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder='Context / example sentence (optional) — e.g. "She abandoned her car on the highway."'
                value={context}
                onChange={e => setContext(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-slate-300"
              />
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-primary" />
              EngBot AI will auto-look up the meaning, phonetics &amp; word type for you.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

// ─── Word Card ────────────────────────────────────────────────────────────────
function WordCard({ word, onDelete }: { word: NotebookWord; onDelete: (id: string) => void }) {
  const [showDelete, setShowDelete] = useState(false);

  const reviewDue = word.nextReviewAt ? new Date(word.nextReviewAt) <= new Date() : false;
  const savedDate = word.savedAt ? new Date(word.savedAt).toLocaleDateString('vi-VN') : '—';

  return (
    <div
      className="group premium-card p-5 relative flex flex-col gap-3 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      {/* Delete button */}
      <button
        id={`delete-word-${word.id}`}
        onClick={() => onDelete(word.id)}
        className={cn(
          "absolute top-3 right-3 p-1.5 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all",
          showDelete ? "opacity-100" : "opacity-0"
        )}
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {/* Word header */}
      <div className="flex items-start gap-3 pr-8">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-xl font-bold text-slate-900 capitalize">{word.word}</h3>
            {word.phonetic && (
              <span className="text-sm text-slate-400 font-mono">{word.phonetic}</span>
            )}
            <button
              onClick={() => playAudio(word.word)}
              className="p-1 rounded-full text-slate-300 hover:text-primary hover:bg-primary/10 transition-colors"
              title="Play pronunciation"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {word.wordType && (
              <span className="text-[11px] font-bold px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full uppercase tracking-wide">
                {word.wordType}
              </span>
            )}
            {word.cefrLevel && (
              <span className="text-[11px] font-bold px-2 py-0.5 bg-blue-50 text-blue-500 rounded-full">
                {word.cefrLevel}
              </span>
            )}
            <span className={cn("text-[11px] font-bold px-2 py-0.5 rounded-full", getMasteryColor(word.masteryLevel))}>
              {getMasteryLabel(word.masteryLevel)}
            </span>
          </div>
        </div>
      </div>

      {/* Meaning */}
      <div className="space-y-1.5">
        <p className="text-sm text-slate-700 leading-relaxed font-medium">{word.meaningEn || '—'}</p>
        <p className="text-sm text-slate-500 italic">{word.meaningVi || '—'}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Clock className="w-3 h-3" />
          <span>Added {savedDate}</span>
        </div>
        {reviewDue ? (
          <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full animate-pulse">
            <Star className="w-3 h-3 fill-amber-400" />
            Review due!
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <CheckCheck className="w-3 h-3" />
            In SRS queue
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function NotebookPage() {
  const { user, signInWithGoogle } = useAuth();
  const [words, setWords] = useState<NotebookWord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchNotebook = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const token = await user.getIdToken();
      const res = await fetch(`${API_BASE}/vocabulary/notebook`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setWords(data.words || []);
    } catch {
      showToast('Could not load notebook', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => { fetchNotebook(); }, [fetchNotebook]);

  const handleAddWord = async (formData: { word: string; context: string }) => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      const res = await fetch(`${API_BASE}/vocabulary/notebook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      showToast(`✨ "${formData.word}" added! +5 XP`);
      fetchNotebook();
    } catch (err: any) {
      showToast(err.message || 'Failed to add word', 'error');
    }
  };

  const handleDeleteWord = async (wordId: string) => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      await fetch(`${API_BASE}/vocabulary/notebook/${wordId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setWords(prev => prev.filter(w => w.id !== wordId));
      showToast('Word removed from notebook');
    } catch {
      showToast('Failed to remove word', 'error');
    }
  };

  // ─── Filtered words ──────────────────────────────────────────────────────
  const filtered = words.filter(w => {
    const matchSearch = w.word.toLowerCase().includes(search.toLowerCase()) ||
      w.meaningEn.toLowerCase().includes(search.toLowerCase()) ||
      w.meaningVi.toLowerCase().includes(search.toLowerCase());
    const matchLevel = filterLevel === 'all' || w.cefrLevel === filterLevel;
    return matchSearch && matchLevel;
  });

  // ─── Login Gate ───────────────────────────────────────────────────────────
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-6 text-center animate-in fade-in duration-700">
        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary">
          <BookMarked className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Sign In to use Notebook</h1>
          <p className="text-slate-500 max-w-sm mx-auto">
            Keep a personal vocabulary journal. Add any word you encounter and EngBot will help you learn it.
          </p>
        </div>
        <button
          onClick={signInWithGoogle}
          className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
        >
          <LogIn className="w-5 h-5" />
          Sign In with Google
        </button>
      </div>
    );
  }

  // ─── Review Due Count ─────────────────────────────────────────────────────
  const reviewDueCount = words.filter(w => w.nextReviewAt && new Date(w.nextReviewAt) <= new Date()).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">

      {/* Toast */}
      {toast && (
        <div className={cn(
          "fixed top-6 right-6 z-50 px-5 py-3 rounded-xl font-semibold text-sm shadow-xl animate-in slide-in-from-top-2 duration-300 flex items-center gap-2",
          toast.type === 'success'
            ? "bg-slate-900 text-white"
            : "bg-rose-500 text-white"
        )}>
          {toast.message}
        </div>
      )}

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BookMarked className="w-8 h-8 text-primary" />
            My Vocabulary Notebook
          </h1>
          <p className="text-slate-500 mt-1">
            Add new words you encounter daily — <span className="text-primary font-bold">EngBot</span> auto-looks up the meaning and schedules review.
          </p>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl">
            <BookMarked className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary">{words.length} words</span>
          </div>
          {reviewDueCount > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-xl animate-pulse">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span className="text-sm font-bold text-amber-600">{reviewDueCount} to review</span>
            </div>
          )}
        </div>
      </header>

      {/* Add word panel */}
      <AddWordPanel onAdd={handleAddWord} />

      {/* Search + Filter bar */}
      {words.length > 0 && (
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="notebook-search"
              type="text"
              placeholder="Search your words..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
              </button>
            )}
          </div>

          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              value={filterLevel}
              onChange={e => setFilterLevel(e.target.value)}
              className="pl-9 pr-8 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white appearance-none cursor-pointer"
            >
              <option value="all">All levels</option>
              <option value="A1">A1 - Beginner</option>
              <option value="A2">A2 - Elementary</option>
              <option value="B1">B1 - Intermediate</option>
              <option value="B2">B2 - Upper Intermediate</option>
              <option value="C1">C1 - Advanced</option>
              <option value="Custom">Custom (my words)</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      )}

      {/* Word grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm font-medium">Loading your notebook...</p>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
            <BookMarked className="w-8 h-8 text-slate-300" />
          </div>
          {words.length === 0 ? (
            <>
              <h3 className="font-bold text-slate-500">Your notebook is empty</h3>
              <p className="text-sm text-slate-400 max-w-xs">
                Start adding words you encounter while reading, watching, or listening. <br />
                EngBot will help you remember them with daily review!
              </p>
            </>
          ) : (
            <>
              <h3 className="font-bold text-slate-500">No words match "{search}"</h3>
              <button onClick={() => { setSearch(''); setFilterLevel('all'); }} className="text-sm text-primary font-semibold hover:underline">
                Clear filters
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(w => (
            <WordCard key={w.id} word={w} onDelete={handleDeleteWord} />
          ))}
        </div>
      )}
    </div>
  );
}
