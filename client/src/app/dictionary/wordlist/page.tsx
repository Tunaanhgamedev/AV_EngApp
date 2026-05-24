'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  BookOpen, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Volume2, 
  Sparkles,
  Loader2,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function WordlistPage() {
  const { user, signInWithGoogle } = useAuth();
  const [words, setWords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const fetchWords = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        ...(selectedLetter && { letter: selectedLetter }),
        ...(selectedLevel && { level: selectedLevel }),
        ...(searchTerm && { search: searchTerm })
      });

      const res = await fetch(`${API_BASE}/vocabulary/wordlist?${params}`);
      const data = await res.json();
      setWords(data.words || []);
      setTotalPages(data.pages || 1);
    } catch (err) {
      console.error(err);
      setWords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWords();
  }, [page, selectedLetter, selectedLevel]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchWords();
  };

  const saveWord = async (wordId: string) => {
    if (!user) {
      signInWithGoogle();
      return;
    }

    setSavingId(wordId);
    try {
      const token = await user.getIdToken();
      const res = await fetch(`${API_BASE}/vocabulary/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ wordId })
      });
      
      if (res.ok) {
        setSavedIds(prev => new Set(prev).add(wordId));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            EngBot Wordlist
          </h1>
          <p className="text-slate-500 font-medium italic">Based on Oxford 3000™ and 5000™ core vocabulary.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary flex items-center gap-2">
            <Sparkles className="w-5 h-5 fill-primary" />
            <span className="text-sm font-bold">Smart Learning Active</span>
          </div>
        </div>
      </header>

      {/* Filters Section */}
      <div className="premium-card p-6 space-y-6">
        <form onSubmit={handleSearch} className="relative group">
          <input 
            type="text" 
            placeholder="Search for a word (e.g. 'abandon')" 
            className="w-full h-14 pl-12 pr-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary" />
        </form>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => { setSelectedLetter(null); setPage(1); }}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                selectedLetter === null ? "bg-primary text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
              )}
            >
              All
            </button>
            {ALPHABET.map(l => (
              <button 
                key={l}
                onClick={() => { setSelectedLetter(l); setPage(1); }}
                className={cn(
                  "w-10 h-10 rounded-xl text-xs font-black transition-all",
                  selectedLetter === l ? "bg-primary text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                )}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 border-t border-slate-50 pt-4">
            <Filter className="w-4 h-4 text-slate-300" />
            <div className="flex gap-2">
              {LEVELS.map(lvl => (
                <button 
                  key={lvl}
                  onClick={() => { setSelectedLevel(selectedLevel === lvl ? null : lvl); setPage(1); }}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-xs font-bold transition-all border",
                    selectedLevel === lvl ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-500 border-slate-200 hover:border-primary"
                  )}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Word Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Oxford Wordlist...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {words && words.length > 0 ? words.map((word) => (
            <div key={word.id} className="bg-white border-t-4 border-t-[#002147] shadow-sm hover:shadow-md p-6 flex flex-col justify-between group transition-all relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold text-[#002147] tracking-tight">{word.word}</h3>
                    <span className="text-xs font-bold text-white bg-[#002147] px-2 py-0.5 rounded-sm">
                      {word.cefrLevel}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-slate-500 font-serif">
                  <span className="italic text-[#e32b26] font-bold text-sm">{word.wordType}</span>
                  <span className="text-slate-600">{word.phonetic}</span>
                  <button className="text-slate-400 hover:text-[#002147] transition-colors p-1">
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-slate-800 leading-relaxed font-serif">
                    <span className="font-bold mr-2 text-[#002147]">1.</span> 
                    {word.meaningEn}
                  </p>
                  {word.meaningVi && (
                    <p className="text-[#e32b26] font-serif text-sm mt-2 italic">
                      " {word.meaningVi} "
                    </p>
                  )}
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => saveWord(word.id)}
                  disabled={savingId === word.id || savedIds.has(word.id)}
                  className={cn(
                    "px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center gap-2",
                    savedIds.has(word.id) 
                      ? "bg-green-50 text-green-700 border border-green-200" 
                      : "bg-[#002147] text-white hover:bg-[#00316e]"
                  )}
                >
                  {savingId === word.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : savedIds.has(word.id) ? (
                    <><Check className="w-4 h-4" /> Saved</>
                  ) : (
                    <><Plus className="w-4 h-4" /> Add to List</>
                  )}
                </button>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-20 text-center space-y-4">
              <BookOpen className="w-12 h-12 text-slate-200 mx-auto" />
              <p className="text-slate-400 font-medium text-sm uppercase tracking-widest">No words found in Oxford list</p>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-10">
          <button 
            onClick={() => setPage(prev => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="p-3 glass border rounded-2xl disabled:opacity-30 hover:bg-slate-50 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <button 
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={cn(
                    "w-10 h-10 rounded-xl font-bold text-sm transition-all",
                    page === pageNum ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white text-slate-500 border border-slate-100 hover:border-primary"
                  )}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 5 && <span className="text-slate-300">...</span>}
          </div>
          <button 
            onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
            disabled={page === totalPages}
            className="p-3 glass border rounded-2xl disabled:opacity-30 hover:bg-slate-50 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
