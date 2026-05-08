'use client';

import React, { useState } from 'react';
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
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { searchWord, saveWordToUser } from '@/services/vocabulary.service';
import { useAuth } from '@/context/AuthContext';

export default function DictionaryPage() {
  const { user, dbUser, signInWithGoogle, refreshDbUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [wordData, setWordData] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    setError('');
    setSaved(false);
    
    try {
      const data = await searchWord(searchTerm.trim());
      setWordData(data.word);
    } catch (err) {
      setError('Could not find definition for this word.');
      setWordData(null);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSaveToVocab = async () => {
    if (!user) {
      signInWithGoogle();
      return;
    }

    if (!wordData || isSaving) return;

    setIsSaving(true);
    try {
      const token = await user.getIdToken();
      await saveWordToUser(user.uid, wordData, token);
      setSaved(true);
      refreshDbUser();
    } catch (err: any) {
      alert(err.message || 'Failed to save word.');
    } finally {
      setIsSaving(false);
    }
  };

  const playAudio = () => {
    if (wordData?.audioUs) {
      const audio = new Audio(wordData.audioUs);
      audio.play();
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Oxford-Style Header */}
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#002147] rounded-xl text-white mb-2">
          <BookOpen className="w-5 h-5" />
          <span className="text-xs font-black uppercase tracking-widest">Oxford-Powered</span>
        </div>
        <h1 className="text-5xl font-black tracking-tight text-slate-800">
          EngBot <span className="text-[#002147]">Dictionary</span>
        </h1>
        <p className="text-slate-500 max-w-lg mx-auto font-medium font-serif italic">
          Search over 3,000 curated words with AI-powered definitions, examples, and Vietnamese translations.
        </p>
      </header>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto space-y-4">
        <form onSubmit={handleSearch} className="relative group">
          <input 
            type="text" 
            placeholder="Type any English word…" 
            className="w-full h-16 pl-14 pr-32 bg-white border-2 border-[#002147]/10 rounded-2xl shadow-xl shadow-[#002147]/5 focus:border-[#002147] focus:ring-0 transition-all text-lg font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-[#002147]/30 group-focus-within:text-[#002147] transition-colors" />
          <button 
            type="submit"
            disabled={isSearching}
            className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-[#002147] text-white rounded-xl font-bold text-sm hover:bg-[#00316e] transition-all flex items-center gap-2"
          >
            {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
          </button>
        </form>

        <div className="flex items-center justify-center gap-4">
          <p className="text-sm text-slate-400 font-medium">Or browse the</p>
          <a 
            href="/dictionary/wordlist" 
            className="flex items-center gap-2 px-4 py-2 bg-[#002147] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#00316e] transition-all"
          >
            <BookOpen className="w-4 h-4" />
            Oxford 3000™ Wordlist
          </a>
        </div>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-3 text-rose-600">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Results */}
      {wordData && (
        <div className="max-w-md mx-auto animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white border-t-4 border-t-[#002147] shadow-xl rounded-b-2xl overflow-hidden group">
            <div className="p-8 space-y-6">
              {/* Card Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-4xl font-black text-[#002147] mb-1">{wordData.word}</h2>
                  <div className="flex items-center gap-3 font-serif">
                    <span className="italic text-[#e32b26] font-bold text-sm">({wordData.wordType})</span>
                    <span className="text-slate-400 text-sm">{wordData.phonetic}</span>
                    {wordData.audioUs && (
                      <button 
                        onClick={playAudio}
                        className="p-1.5 bg-slate-50 rounded-full hover:bg-[#002147]/10 hover:text-[#002147] transition-all"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                {wordData.cefrLevel && (
                  <span className="px-2 py-0.5 bg-[#002147] text-white text-[10px] font-black rounded uppercase tracking-wider">
                    {wordData.cefrLevel}
                  </span>
                )}
              </div>

              {/* Card Content */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black text-[#002147] bg-[#002147]/5 px-2 py-0.5 rounded">1.</span>
                    <p className="text-sm text-slate-700 font-medium leading-snug">
                      {wordData.meaningEn}
                    </p>
                  </div>
                  {wordData.meaningVi && (
                    <p className="text-sm text-[#e32b26] font-serif italic ml-7">
                      " {wordData.meaningVi} "
                    </p>
                  )}
                </div>

                {wordData.additionalExamples?.[0] && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-500 font-serif italic leading-relaxed">
                      "{wordData.additionalExamples[0]}"
                    </p>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button 
                onClick={handleSaveToVocab}
                disabled={isSaving || saved}
                className={cn(
                  "w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2",
                  saved 
                    ? "bg-green-500 text-white" 
                    : "bg-[#002147] text-white hover:bg-[#00316e] shadow-lg shadow-[#002147]/20"
                )}
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : saved ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                {saved ? 'Added to My Vocab' : 'ADD TO MY VOCAB'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Initial State / Empty State */}
      {!wordData && !isSearching && !error && (
        <div className="max-w-3xl mx-auto pt-8 animate-in fade-in duration-1000 space-y-8">
          {/* Quick Level Access */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { level: 'A1', label: 'Beginner', count: '~500', color: 'from-green-400 to-emerald-500' },
              { level: 'A2', label: 'Elementary', count: '~500', color: 'from-teal-400 to-cyan-500' },
              { level: 'B1', label: 'Intermediate', count: '~1000', color: 'from-blue-400 to-indigo-500' },
              { level: 'B2', label: 'Upper', count: '~1000', color: 'from-purple-400 to-violet-500' },
            ].map(l => (
              <a 
                key={l.level} 
                href={`/dictionary/wordlist?level=${l.level}`}
                className="premium-card p-5 text-center hover:-translate-y-1 hover:shadow-lg transition-all group"
              >
                <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${l.color} flex items-center justify-center text-white font-black text-lg mb-3 group-hover:scale-110 transition-transform`}>
                  {l.level}
                </div>
                <p className="text-sm font-bold text-slate-700">{l.label}</p>
                <p className="text-xs text-slate-400 mt-1">{l.count} words</p>
              </a>
            ))}
          </div>

          {/* Popular Searches */}
          <div>
            <h3 className="font-bold text-slate-400 text-center mb-4 text-sm uppercase tracking-widest">Trending Searches</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['abandon', 'achieve', 'benefit', 'capable', 'develop', 'enhance', 'feature', 'generate'].map((w) => (
                <button 
                  key={w} 
                  onClick={() => {
                    setSearchTerm(w);
                    setWordData(null);
                    setTimeout(() => handleSearch(), 0);
                  }}
                  className="px-5 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-[#002147] hover:border-[#002147] hover:bg-[#002147]/5 transition-all shadow-sm"
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
