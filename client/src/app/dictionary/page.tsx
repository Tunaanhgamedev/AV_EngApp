'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  Volume2, 
  Bookmark, 
  Sparkles, 
  ChevronRight, 
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Plus,
  Check,
  Filter,
  ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { searchWord, saveWordToUser } from '@/services/vocabulary.service';
import { useAuth } from '@/context/AuthContext';
import { useSearchParams } from 'next/navigation';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export default function DictionaryPage() {
  const searchParams = useSearchParams();
  const { user, dbUser, signInWithGoogle, refreshDbUser } = useAuth();
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [wordData, setWordData] = useState<any>(null);
  const [error, setError] = useState('');

  // Wordlist state
  const [words, setWords] = useState<any[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(searchParams.get('level'));
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  // Handle precise search (the card)
  const handlePreciseSearch = async (term: string) => {
    if (!term.trim()) return;
    setIsSearching(true);
    setError('');
    setSaved(false);
    try {
      const data = await searchWord(term.trim());
      setWordData(data.word);
      // Scroll to result
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } catch (err) {
      setError('Could not find precise definition. Try browsing the list below.');
      setWordData(null);
    } finally {
      setIsSearching(false);
    }
  };

  // Fetch words for the list
  const fetchWordlist = useCallback(async () => {
    setLoadingList(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        ...(selectedLetter && { letter: selectedLetter }),
        ...(selectedLevel && { level: selectedLevel }),
        ...(searchTerm && { search: searchTerm })
      });

      const res = await fetch(`http://localhost:5000/api/vocabulary/wordlist?${params}`);
      const data = await res.json();
      setWords(data.words || []);
      setTotalPages(data.pages || 1);
    } catch (err) {
      console.error(err);
      setWords([]);
    } finally {
      setLoadingList(false);
    }
  }, [page, selectedLetter, selectedLevel, searchTerm]);

  // Sync search term and wordlist
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchWordlist();
    }, 400); // Debounce
    return () => clearTimeout(timer);
  }, [searchTerm, selectedLetter, selectedLevel]);

  // Page change
  useEffect(() => {
    fetchWordlist();
  }, [page]);

  const saveWord = async (word: any) => {
    if (!user) {
      signInWithGoogle();
      return;
    }

    setSavingId(word.id);
    try {
      const token = await user.getIdToken();
      await saveWordToUser(user.uid, word, token);
      setSavedIds(prev => new Set(prev).add(word.id));
      refreshDbUser();
    } catch (err) {
      console.error(err);
    } finally {
      setSavingId(null);
    }
  };

  const playAudio = (word: string, url?: string) => {
    if (url) {
      const audio = new Audio(url);
      audio.play().catch(() => {
        // If URL fails, use synthesis
        speak(word);
      });
    } else {
      speak(word);
    }
  };

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9; // Slightly slower for clarity
      
      // Try to find a premium English voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.name.includes('Google') && v.lang === 'en-US') || 
                             voices.find(v => v.lang === 'en-US');
      
      if (preferredVoice) utterance.voice = preferredVoice;
      
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 animate-in fade-in duration-700">
      {/* Premium Header */}
      <header className="text-center space-y-6 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#002147] rounded-xl text-white mb-2 shadow-lg shadow-[#002147]/20">
          <BookOpen className="w-5 h-5" />
          <span className="text-xs font-black uppercase tracking-widest">Oxford 3000™ Powered</span>
        </div>
        <h1 className="text-6xl font-black tracking-tight text-slate-800">
          EngBot <span className="text-[#002147]">Dictionary</span>
        </h1>
        <p className="text-slate-500 max-w-xl mx-auto font-medium font-serif italic text-lg">
          Explore thousands of curated words with AI-enhanced definitions and instant Vietnamese translations.
        </p>
      </header>

      {/* Unified Search Section */}
      <div className="max-w-3xl mx-auto sticky top-4 z-40">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search words... (e.g. 'abandon')" 
            className="w-full h-20 pl-16 pr-32 bg-white/80 backdrop-blur-xl border-2 border-[#002147]/10 rounded-3xl shadow-2xl shadow-[#002147]/5 focus:border-[#002147] focus:bg-white focus:ring-0 transition-all text-xl font-bold placeholder:text-slate-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePreciseSearch(searchTerm)}
          />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-7 h-7 text-[#002147]/30 group-focus-within:text-[#002147] transition-colors" />
          <button 
            onClick={() => handlePreciseSearch(searchTerm)}
            disabled={isSearching || !searchTerm.trim()}
            className="absolute right-4 top-1/2 -translate-y-1/2 px-8 py-3.5 bg-[#002147] text-white rounded-2xl font-black text-sm hover:bg-[#00316e] transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : 'SEARCH'}
          </button>
        </div>
      </div>

      {/* Exact Match Card (If found) */}
      {wordData && (
        <div className="max-w-2xl mx-auto animate-in zoom-in-95 duration-500">
          <div className="bg-white border-t-8 border-t-[#002147] shadow-[0_32px_64px_-16px_rgba(0,33,71,0.2)] rounded-3xl overflow-hidden">
            <div className="p-10 space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-5xl font-black text-[#002147] mb-2">{wordData.word}</h2>
                  <div className="flex items-center gap-4 font-serif">
                    <span className="italic text-[#e32b26] font-bold text-lg">({wordData.wordType})</span>
                    <span className="text-slate-400 text-lg font-medium">{wordData.phonetic}</span>
                    {wordData.audioUs || true && (
                      <button 
                        onClick={() => playAudio(wordData.word, wordData.audioUs)}
                        className="p-2 bg-slate-50 rounded-full hover:bg-[#002147] hover:text-white transition-all shadow-sm"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
                {wordData.cefrLevel && (
                  <span className="px-3 py-1 bg-[#002147] text-white text-xs font-black rounded-lg uppercase tracking-widest shadow-md">
                    {wordData.cefrLevel}
                  </span>
                )}
              </div>

              <div className="space-y-6">
                <div className="relative pl-8">
                  <span className="absolute left-0 top-0 text-2xl font-black text-[#002147]/10">01</span>
                  <p className="text-xl text-slate-700 font-medium leading-relaxed">
                    {wordData.meaningEn}
                  </p>
                  {wordData.meaningVi && (
                    <p className="text-lg text-[#e32b26] font-serif italic mt-3 border-l-4 border-[#e32b26]/20 pl-4">
                      " {wordData.meaningVi} "
                    </p>
                  )}
                </div>

                {wordData.usage && (
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Usage Note</p>
                    <p className="text-sm text-slate-600 font-medium">{wordData.usage}</p>
                  </div>
                )}
              </div>

              <button 
                onClick={() => saveWord(wordData)}
                disabled={isSaving || savedIds.has(wordData.id)}
                className={cn(
                  "w-full py-5 rounded-2xl font-black text-sm tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl",
                  savedIds.has(wordData.id) 
                    ? "bg-green-500 text-white" 
                    : "bg-[#002147] text-white hover:bg-[#00316e] shadow-[#002147]/20"
                )}
              >
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : savedIds.has(wordData.id) ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                {savedIds.has(wordData.id) ? 'SAVED TO MY NOTEBOOK' : 'ADD TO MY NOTEBOOK'}
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="max-w-2xl mx-auto p-5 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-4 text-rose-600 shadow-sm animate-in shake-in duration-300">
          <AlertCircle className="w-6 h-6 shrink-0" />
          <p className="font-bold">{error}</p>
        </div>
      )}

      {/* Main Browse Section */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
              <Filter className="w-6 h-6 text-primary" />
              Browse Wordlist
            </h3>
            <p className="text-slate-400 text-sm font-medium">Filter by level or starting letter</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {LEVELS.map(lvl => (
              <button 
                key={lvl}
                onClick={() => { setSelectedLevel(selectedLevel === lvl ? null : lvl); setPage(1); }}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-sm font-black transition-all border-2",
                  selectedLevel === lvl ? "bg-[#002147] text-white border-[#002147] shadow-lg shadow-[#002147]/20" : "bg-white text-slate-400 border-slate-100 hover:border-[#002147]/30"
                )}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Alphabet Picker */}
        <div className="flex flex-wrap gap-2 bg-slate-50/50 p-4 rounded-2xl">
          <button 
            onClick={() => { setSelectedLetter(null); setPage(1); }}
            className={cn(
              "px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-tighter transition-all",
              selectedLetter === null ? "bg-primary text-white" : "bg-white text-slate-400 hover:bg-slate-100"
            )}
          >
            ALL
          </button>
          {ALPHABET.map(l => (
            <button 
              key={l}
              onClick={() => { setSelectedLetter(l); setPage(1); }}
              className={cn(
                "w-10 h-10 rounded-xl text-xs font-black transition-all",
                selectedLetter === l ? "bg-primary text-white" : "bg-white text-slate-400 hover:bg-slate-100"
              )}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Word Grid */}
        {loadingList ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-50 transition-opacity">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-64 bg-slate-50 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {words.length > 0 ? words.map((word) => (
              <div 
                key={word.id} 
                className="premium-card p-6 flex flex-col justify-between group hover:-translate-y-2 transition-all relative overflow-hidden bg-white border-b-4 border-b-[#002147]/5 hover:border-b-[#002147]"
                onClick={() => setSearchTerm(word.word)}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-black text-[#002147] group-hover:text-primary transition-colors cursor-pointer">
                      {word.word}
                    </h4>
                    <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-0.5 rounded uppercase">
                      {word.cefrLevel}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-[#e32b26] uppercase tracking-widest">
                      <span>{word.wordType}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-400 normal-case">{word.phonetic}</span>
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2 font-medium leading-relaxed">
                      {word.meaningEn}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-50">
                  <button 
                    onClick={(e) => { e.stopPropagation(); playAudio(word.word, word.audioUs); }}
                    className="p-2 bg-slate-50 rounded-lg hover:bg-[#002147]/10 text-slate-400 hover:text-[#002147] transition-all"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); saveWord(word); }}
                    disabled={savingId === word.id || savedIds.has(word.id)}
                    className={cn(
                      "p-2 rounded-lg transition-all",
                      savedIds.has(word.id) ? "text-green-500 bg-green-50" : "text-slate-400 hover:bg-[#002147] hover:text-white bg-slate-50"
                    )}
                  >
                    {savingId === word.id ? <Loader2 className="w-4 h-4 animate-spin" /> : savedIds.has(word.id) ? <CheckCircle2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )) : (
              <div className="col-span-full py-20 text-center space-y-6">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                  <Search className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-black text-slate-800">No matches found</p>
                  <p className="text-slate-400 font-medium">Try adjusting your filters or search term.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {!loadingList && totalPages > 1 && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-12">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                disabled={page === 1}
                className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-xl disabled:opacity-30 hover:border-primary hover:text-primary transition-all shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-2">
                {(() => {
                  const pages = [];
                  const delta = 2; // Number of pages to show on each side of current
                  const left = page - delta;
                  const right = page + delta;
                  
                  for (let i = 1; i <= totalPages; i++) {
                    if (i === 1 || i === totalPages || (i >= left && i <= right)) {
                      pages.push(i);
                    } else if (i === left - 1 || i === right + 1) {
                      pages.push('...');
                    }
                  }
                  
                  return pages.map((p, i) => (
                    typeof p === 'number' ? (
                      <button
                        key={i}
                        onClick={() => setPage(p)}
                        className={cn(
                          "w-10 h-10 rounded-xl font-black transition-all text-xs",
                          page === p ? "bg-[#002147] text-white shadow-lg shadow-[#002147]/20" : "bg-white text-slate-400 hover:bg-slate-50 border border-slate-100"
                        )}
                      >
                        {p}
                      </button>
                    ) : (
                      <span key={i} className="text-slate-300 font-bold px-1 select-none">...</span>
                    )
                  ));
                })()}
              </div>

              <button 
                onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                disabled={page === totalPages}
                className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-xl disabled:opacity-30 hover:border-primary hover:text-primary transition-all shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] md:ml-4">
              Showing Page {page} of {totalPages}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
