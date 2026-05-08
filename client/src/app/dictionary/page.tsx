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
      refreshDbUser(); // Update XP
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
      <header className="text-center space-y-4">
        <div className="inline-flex p-3 bg-primary/10 rounded-2xl text-primary mb-2">
          <Search className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">AI Dictionary by <span className="gradient-text">EngBot</span></h1>
        <p className="text-slate-500 max-w-lg mx-auto font-medium">
          Get instant definitions and smart AI explanations. Save words to your study list with one click.
        </p>
      </header>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="relative group">
          <input 
            type="text" 
            placeholder="Search any word (e.g. 'Serendipity')" 
            className="w-full h-16 pl-14 pr-32 bg-white border-2 border-slate-100 rounded-2xl shadow-xl shadow-slate-200/50 focus:border-primary focus:ring-0 transition-all text-lg font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-primary transition-colors" />
          <button 
            type="submit"
            disabled={isSearching}
            className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all flex items-center gap-2"
          >
            {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
          </button>
        </form>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-3 text-rose-600 animate-in shake-1 duration-500">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Results */}
      {wordData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-in slide-in-from-bottom-4 duration-500">
          <div className="lg:col-span-2 space-y-6">
            <div className="premium-card p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-4xl font-bold">{wordData.word}</h2>
                    {wordData.cefrLevel && (
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-black rounded-full uppercase tracking-widest border border-primary/20">
                        {wordData.cefrLevel}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-slate-400 font-medium">
                    <span className="italic">{wordData.wordType}</span>
                    <span className="text-primary/60">{wordData.phonetic}</span>
                    {wordData.audioUs && (
                      <button 
                        onClick={playAudio}
                        className="p-2 bg-slate-50 rounded-full hover:bg-primary/10 hover:text-primary transition-all"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
                <button 
                  onClick={handleSaveToVocab}
                  disabled={isSaving || saved}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg",
                    saved 
                      ? "bg-green-500 text-white shadow-green-500/20" 
                      : "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20"
                  )}
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : saved ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  {saved ? 'Saved to Vocab' : 'Add to My Vocab'}
                </button>
              </div>

              <div className="space-y-8">
                <section>
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Definition</h3>
                  <p className="text-xl text-slate-700 leading-relaxed font-medium">
                    {wordData.meaningEn}
                  </p>
                </section>

                <section className="p-6 bg-primary/5 rounded-2xl border border-primary/10 relative overflow-hidden group">
                  <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                    <Sparkles className="w-32 h-32" />
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 fill-primary" />
                    EngBot Smart Explanation
                  </h3>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    {wordData.meaningVi}
                  </p>
                </section>

                <section>
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Examples</h3>
                  <div className="space-y-3">
                    {wordData.additionalExamples?.map((ex: string, idx: number) => (
                      <div key={idx} className="flex gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-slate-700 font-medium italic">{ex}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="premium-card p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Quick Info
              </h3>
              <div className="space-y-4">
                {wordData.synonyms?.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Synonyms</span>
                    <div className="flex flex-wrap gap-2">
                      {wordData.synonyms.map((s: string) => (
                        <span key={s} className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {wordData.antonyms?.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Antonyms</span>
                    <div className="flex flex-wrap gap-2">
                      {wordData.antonyms.map((a: string) => (
                        <span key={a} className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="premium-card p-6 bg-slate-900 text-white overflow-hidden relative group">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              <h3 className="font-bold mb-2 relative z-10">Smart Learning</h3>
              <p className="text-xs text-slate-400 mb-6 relative z-10 leading-relaxed">
                Add this word to your daily review queue. EngBot will help you memorize it forever using spaced repetition.
              </p>
              <button 
                onClick={handleSaveToVocab}
                disabled={saved}
                className={cn(
                  "w-full py-3 rounded-xl font-bold text-sm transition-all relative z-10",
                  saved ? "bg-green-500" : "bg-primary hover:opacity-90"
                )}
              >
                {saved ? 'Word Saved!' : 'Start Learning Now'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Initial State / Empty State */}
      {!wordData && !isSearching && !error && (
        <div className="max-w-2xl mx-auto pt-12 animate-in fade-in duration-1000">
          <h3 className="font-bold text-slate-400 text-center mb-6">Popular Searches</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['Resilience', 'Eloquence', 'Pragmatic', 'Ephemeral', 'Cognitive'].map((w) => (
              <button 
                key={w} 
                onClick={() => {
                  setSearchTerm(w);
                  setWordData(null); // Clear previous
                  setTimeout(() => handleSearch(), 0);
                }}
                className="px-5 py-2 bg-white border border-slate-100 rounded-xl text-sm font-semibold text-slate-500 hover:border-primary hover:text-primary transition-all shadow-sm"
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
