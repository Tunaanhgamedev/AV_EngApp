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
  ChevronLeft,
  Wand2,
  RefreshCw,
  Database
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { searchWord, saveWordToUser } from '@/services/vocabulary.service';
import { useAuth } from '@/context/AuthContext';
import { useSearchParams, useRouter } from 'next/navigation';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export interface DictionaryTopic {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  count: string;
  color: string;
  query: string;
  description: string;
}

export const DICTIONARY_TOPICS: DictionaryTopic[] = [
  {
    id: 'business',
    name: 'Công sở & Kinh doanh',
    nameEn: 'Business & Office',
    icon: '🏢',
    count: '150+ từ',
    color: 'from-blue-600 to-indigo-600',
    query: 'office',
    description: 'Từ vựng hợp đồng, tuyển dụng, thương lượng và quản trị.'
  },
  {
    id: 'tech',
    name: 'Công nghệ & AI',
    nameEn: 'Tech & Artificial Intelligence',
    icon: '💻',
    count: '120+ từ',
    color: 'from-cyan-600 to-blue-600',
    query: 'computer',
    description: 'Từ vựng phần mềm, phần cứng, AI và an toàn mạng.'
  },
  {
    id: 'travel',
    name: 'Du lịch & Vận tải',
    nameEn: 'Travel & Transport',
    icon: '✈️',
    count: '100+ từ',
    color: 'from-amber-500 to-orange-600',
    query: 'flight',
    description: 'Từ vựng sân bay, khách sạn, vé máy bay và lưu trú.'
  },
  {
    id: 'health',
    name: 'Y tế & Sức khỏe',
    nameEn: 'Healthcare & Medical',
    icon: '🏥',
    count: '90+ từ',
    color: 'from-emerald-600 to-teal-600',
    query: 'health',
    description: 'Từ vựng bệnh viện, điều trị, thuốc men và dinh dưỡng.'
  },
  {
    id: 'environment',
    name: 'Môi trường & Tự nhiên',
    nameEn: 'Environment & Nature',
    icon: '🌱',
    count: '80+ từ',
    color: 'from-green-600 to-emerald-600',
    query: 'nature',
    description: 'Từ vựng hệ sinh thái, năng lượng xanh và biến đổi khí hậu.'
  },
  {
    id: 'education',
    name: 'Giáo dục & Học thuật',
    nameEn: 'Education & Academia',
    icon: '🎓',
    count: '110+ từ',
    color: 'from-purple-600 to-indigo-600',
    query: 'school',
    description: 'Từ vựng nghiên cứu khoa học, bằng cấp và giảng đường.'
  },
  {
    id: 'food',
    name: 'Ẩm thực & Đời sống',
    nameEn: 'Food & Culinary',
    icon: '🍔',
    count: '95+ từ',
    color: 'from-rose-500 to-pink-600',
    query: 'food',
    description: 'Từ vựng món ăn, nhà hàng, công thức và ẩm thực.'
  },
  {
    id: 'finance',
    name: 'Tài chính & Ngân hàng',
    nameEn: 'Finance & Banking',
    icon: '💰',
    count: '105+ từ',
    color: 'from-emerald-700 to-cyan-700',
    query: 'bank',
    description: 'Từ vựng giao dịch, cổ phiếu, tỷ giá và kế toán.'
  }
];

function DictionaryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, dbUser, refreshDbUser } = useAuth();

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
  const [selectedTopic, setSelectedTopic] = useState<DictionaryTopic | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  // Enrichment state
  const [enriching, setEnriching] = useState(false);
  const [enrichResult, setEnrichResult] = useState<{ enriched?: number; translated?: number; remaining: number; results?: any[] } | null>(null);
  const [showEnrichPanel, setShowEnrichPanel] = useState(false);

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

  // Stable fetch function using direct params (no stale closure)
  const fetchWordlist = useCallback(async (
    fetchPage: number,
    fetchLetter: string | null,
    fetchLevel: string | null,
    fetchSearch: string
  ) => {
    setLoadingList(true);
    try {
      const params = new URLSearchParams({
        page: fetchPage.toString(),
        ...(fetchLetter && { letter: fetchLetter }),
        ...(fetchLevel && { level: fetchLevel }),
        ...(fetchSearch && { search: fetchSearch })
      });

      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_BASE}/vocabulary/wordlist?${params}`);
      const data = await res.json();
      setWords(data.words || []);
      setTotalPages(data.pages || 1);
    } catch (err) {
      console.error(err);
      setWords([]);
    } finally {
      setLoadingList(false);
    }
  }, []);

  // Debounced search (only for typing — 400ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchWordlist(1, selectedLetter, selectedLevel, searchTerm);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]); // Only debounce text input changes

  // Instant filter changes (letter or level click — no debounce)
  useEffect(() => {
    setPage(1);
    fetchWordlist(1, selectedLetter, selectedLevel, searchTerm);
  }, [selectedLetter, selectedLevel]);

  // Page navigation
  useEffect(() => {
    fetchWordlist(page, selectedLetter, selectedLevel, searchTerm);
  }, [page]);

  // Initial load
  useEffect(() => {
    fetchWordlist(1, selectedLetter, selectedLevel, searchTerm);
  }, []);

  // Batch enrichment handler (one-by-one, full metadata)
  const handleBatchEnrich = async (batchSize = 10) => {
    setEnriching(true);
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_BASE}/vocabulary/enrich-batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ batchSize })
      });
      const data = await res.json();
      setEnrichResult(data);
      if (data.enriched > 0) {
        fetchWordlist(page, selectedLetter, selectedLevel, searchTerm);
      }
    } catch (err) {
      console.error('Batch enrich error:', err);
    } finally {
      setEnriching(false);
    }
  };

  // Bulk translate handler (20 words per single API call — FAST)
  const handleBulkTranslate = async (batchSize = 20) => {
    setEnriching(true);
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_BASE}/vocabulary/bulk-translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ batchSize })
      });
      const data = await res.json();
      setEnrichResult(data);
      if (data.translated > 0) {
        fetchWordlist(page, selectedLetter, selectedLevel, searchTerm);
      }
    } catch (err) {
      console.error('Bulk translate error:', err);
    } finally {
      setEnriching(false);
    }
  };

  const saveWord = async (word: any) => {
    if (!user) {
      router.push('/login');
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
    // Warm up SpeechSynthesis synchronously in the user gesture
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        const dummy = new SpeechSynthesisUtterance('');
        window.speechSynthesis.speak(dummy);
      } catch (e) {}
    }

    if (url) {
      const audio = new Audio(url);
      audio.play().catch((err) => {
        console.log("Audio play failed, falling back to speech synthesis:", err);
        speak(word);
      });
    } else {
      speak(word);
    }
  };

  const speak = (text: string) => {
    if (typeof window !== 'undefined') {
      const playTranslateTTS = () => {
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(text)}`;
        const audio = new Audio(url);
        audio.play().catch((err) => {
          console.error("Google Translate TTS fallback failed:", err);
        });
      };

      if (window.speechSynthesis) {
        const voices = window.speechSynthesis.getVoices();
        
        // Fallback to Translate TTS if no voices are loaded/installed
        if (voices.length === 0) {
          playTranslateTTS();
          return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9; // Slightly slower for clarity

        const preferredVoice = voices.find(v => v.name.includes('Google') && v.lang === 'en-US') ||
          voices.find(v => v.lang === 'en-US');

        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.onerror = (e) => {
          console.log("speechSynthesis error, playing Google Translate TTS:", e);
          playTranslateTTS();
        };

        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
          setTimeout(() => {
            window.speechSynthesis.speak(utterance);
          }, 50);
        } else {
          window.speechSynthesis.speak(utterance);
        }
      } else {
        playTranslateTTS();
      }
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
        <h1 className="text-6xl font-black tracking-tight text-slate-800 dark:text-slate-100">
          EngBot <span className="text-[#002147] dark:text-blue-400">Dictionary</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-medium font-serif italic text-lg">
          Explore thousands of curated words with AI-enhanced definitions and instant Vietnamese translations.
        </p>
      </header>

      {/* Unified Search Section */}
      <div className="max-w-3xl mx-auto sticky top-4 z-40">
        <div className="relative group">
          <input
            type="text"
            placeholder="Search words... (e.g. 'abandon')"
            className="w-full h-20 pl-16 pr-32 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 border-[#002147]/10 dark:border-slate-700 rounded-3xl shadow-2xl shadow-[#002147]/5 focus:border-[#002147] dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-900 focus:ring-0 transition-all text-xl font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePreciseSearch(searchTerm)}
          />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-7 h-7 text-[#002147]/30 dark:text-slate-500 group-focus-within:text-[#002147] dark:group-focus-within:text-blue-400 transition-colors" />
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
          <div className="bg-white dark:bg-slate-900 border-t-8 border-t-[#002147] shadow-[0_32px_64px_-16px_rgba(0,33,71,0.2)] rounded-3xl overflow-hidden">
            <div className="p-10 space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-5xl font-black text-[#002147] dark:text-blue-400 mb-2">{wordData.word}</h2>
                  <div className="flex items-center gap-4 font-serif">
                    <span className="italic text-[#e32b26] dark:text-rose-400 font-bold text-lg">({wordData.wordType})</span>
                    <span className="text-slate-400 dark:text-slate-500 text-lg font-medium">{wordData.phonetic}</span>
                    {wordData.audioUs || true && (
                      <button
                        onClick={() => playAudio(wordData.word, wordData.audioUs)}
                        className="p-2 bg-slate-50 dark:bg-slate-800 rounded-full hover:bg-[#002147] dark:hover:bg-blue-900 hover:text-white transition-all shadow-sm"
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
                  <span className="absolute left-0 top-0 text-2xl font-black text-[#002147]/10 dark:text-blue-400/10">01</span>
                  <p className="text-xl text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    {wordData.meaningEn}
                  </p>
                  {wordData.meaningVi && (
                    <p className="text-lg text-[#e32b26] dark:text-rose-400 font-serif italic mt-3 border-l-4 border-[#e32b26]/20 dark:border-rose-400/20 pl-4">
                      " {wordData.meaningVi} "
                    </p>
                  )}
                </div>

                {wordData.usage && (
                  <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-2">
                    <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Usage Note</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">{wordData.usage}</p>
                  </div>
                )}

                {wordData.example && (
                  <div className="p-6 bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl border border-blue-100/50 dark:border-blue-800/50 space-y-2">
                    <p className="text-xs font-black text-blue-400 dark:text-blue-300 uppercase tracking-widest">Example</p>
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-medium italic">"{wordData.example}"</p>
                    {wordData.exampleVi && (
                      <p className="text-xs text-blue-500/70 dark:text-blue-400/70 italic mt-1">→ {wordData.exampleVi}</p>
                    )}
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
        <div className="max-w-2xl mx-auto p-5 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 rounded-2xl flex items-center gap-4 text-rose-600 dark:text-rose-400 shadow-sm animate-in shake-in duration-300">
          <AlertCircle className="w-6 h-6 shrink-0" />
          <p className="font-bold">{error}</p>
        </div>
      )}

        {/* Main Browse Section */}
        <div className="space-y-8">
          {/* Topics Grid Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Chủ Đề Từ Vựng Từ Điển (Dictionary Topics)
              </h3>
              {selectedTopic && (
                <button
                  onClick={() => setSelectedTopic(null)}
                  className="text-xs font-bold text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  Xóa chọn chủ đề
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {DICTIONARY_TOPICS.map(topic => {
                const isSelected = selectedTopic?.id === topic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedTopic(null);
                      } else {
                        setSelectedTopic(topic);
                        setSearchTerm(topic.query);
                      }
                    }}
                    className={cn(
                      "p-3.5 rounded-2xl border-2 transition-all text-left flex flex-col justify-between group cursor-pointer relative overflow-hidden",
                      isSelected
                        ? "border-[#002147] bg-[#002147] text-white shadow-xl shadow-[#002147]/20 scale-105"
                        : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#002147]/30 dark:hover:border-slate-700 hover:shadow-md"
                    )}
                  >
                    <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{topic.icon}</div>
                    <div>
                      <h4 className={cn("text-xs font-extrabold line-clamp-1", isSelected ? "text-white" : "text-slate-800 dark:text-slate-100")}>
                        {topic.name}
                      </h4>
                      <p className={cn("text-[10px] font-medium mt-0.5", isSelected ? "text-slate-300 dark:text-slate-600" : "text-slate-400 dark:text-slate-500")}>
                        {topic.count}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-8 pt-4">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Filter className="w-6 h-6 text-primary" />
                Browse Wordlist
              </h3>
              <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">Filter by level or starting letter</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {LEVELS.map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(selectedLevel === lvl ? null : lvl)}
                  className={cn(
                    "px-6 py-2.5 rounded-xl text-sm font-black transition-all border-2",
                    selectedLevel === lvl ? "bg-[#002147] text-white border-[#002147] shadow-lg shadow-[#002147]/20" : "bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border-slate-100 dark:border-slate-800 hover:border-[#002147]/30 dark:hover:border-slate-700"
                  )}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Alphabet Picker */}
          <div className="flex flex-wrap gap-2 bg-slate-50/50 dark:bg-slate-800/50 p-4 rounded-2xl">
            <button
              onClick={() => setSelectedLetter(null)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-tighter transition-all",
                selectedLetter === null ? "bg-primary text-white" : "bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              ALL
            </button>
            {ALPHABET.map(l => (
              <button
                key={l}
                onClick={() => setSelectedLetter(l)}
                className={cn(
                  "w-10 h-10 rounded-xl text-xs font-black transition-all",
                  selectedLetter === l ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Active Filters Indicator */}
          {(selectedLetter || selectedLevel || searchTerm || selectedTopic) && (
            <div className="flex items-center gap-3 px-4 py-3 bg-[#002147]/5 dark:bg-slate-800 rounded-2xl animate-in fade-in duration-300">
              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Đang lọc:</span>
              <div className="flex items-center gap-2 flex-wrap">
                {selectedTopic && (
                  <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm">
                    {selectedTopic.icon} {selectedTopic.name}
                    <button onClick={() => { setSelectedTopic(null); setSearchTerm(''); }} className="hover:opacity-70">×</button>
                  </span>
                )}
                {selectedLetter && (
                  <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-lg flex items-center gap-1.5">
                    Chữ {selectedLetter}
                    <button onClick={() => setSelectedLetter(null)} className="hover:opacity-70">×</button>
                  </span>
                )}
                {selectedLevel && (
                  <span className="px-3 py-1 bg-[#002147] text-white text-xs font-bold rounded-lg flex items-center gap-1.5">
                    {selectedLevel}
                    <button onClick={() => setSelectedLevel(null)} className="hover:opacity-70">×</button>
                  </span>
                )}
                {searchTerm && !selectedTopic && (
                  <span className="px-3 py-1 bg-slate-700 dark:bg-slate-600 text-white text-xs font-bold rounded-lg flex items-center gap-1.5">
                    "{searchTerm}"
                    <button onClick={() => setSearchTerm('')} className="hover:opacity-70">×</button>
                  </span>
                )}
            </div>
            <button
              onClick={() => { setSelectedLetter(null); setSelectedLevel(null); setSearchTerm(''); }}
              className="ml-auto text-xs font-bold text-slate-400 dark:text-slate-500 hover:text-rose-500 transition-colors"
            >
              Xóa tất cả
            </button>
          </div>
        )}

        {/* Word Grid */}
        {loadingList ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-50 transition-opacity">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-64 bg-slate-50 dark:bg-slate-800 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {words.length > 0 ? words.map((word) => (
              <div
                key={word.id}
                className="premium-card p-6 flex flex-col justify-between group hover:-translate-y-2 transition-all relative overflow-hidden bg-white dark:bg-slate-900 border-b-4 border-b-[#002147]/5 dark:border-b-slate-800 hover:border-b-[#002147]"
                onClick={() => setSearchTerm(word.word)}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-black text-[#002147] dark:text-blue-400 group-hover:text-primary transition-colors cursor-pointer">
                      {word.word}
                    </h4>
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded uppercase">
                      {word.cefrLevel}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-[#e32b26] dark:text-rose-400 uppercase tracking-widest">
                      <span>{word.wordType}</span>
                      <span className="text-slate-300 dark:text-slate-600">•</span>
                      <span className="text-slate-400 dark:text-slate-500 normal-case">{word.phonetic}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 font-medium leading-relaxed">
                      {word.meaningEn}
                    </p>
                    {word.meaningVi && (
                      <p className="text-xs text-primary/60 dark:text-primary/80 italic line-clamp-1 mt-1">
                        {word.meaningVi}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                  <button
                    onClick={(e) => { e.stopPropagation(); playAudio(word.word, word.audioUs); }}
                    className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-[#002147]/10 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-500 hover:text-[#002147] dark:hover:text-blue-400 transition-all"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); saveWord(word); }}
                    disabled={savingId === word.id || savedIds.has(word.id)}
                    className={cn(
                      "p-2 rounded-lg transition-all",
                      savedIds.has(word.id) ? "text-green-500 bg-green-50 dark:bg-green-500/10" : "text-slate-400 dark:text-slate-500 hover:bg-[#002147] dark:hover:bg-blue-900 hover:text-white bg-slate-50 dark:bg-slate-800"
                    )}
                  >
                    {savingId === word.id ? <Loader2 className="w-4 h-4 animate-spin" /> : savedIds.has(word.id) ? <CheckCircle2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )) : (
              <div className="col-span-full py-20 text-center space-y-6">
                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-200 dark:text-slate-700">
                  <Search className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-black text-slate-800 dark:text-slate-100">No matches found</p>
                  <p className="text-slate-400 dark:text-slate-500 font-medium">Try adjusting your filters or search term.</p>
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
                className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl disabled:opacity-30 hover:border-primary transition-all shadow-sm"
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
                          page === p ? "bg-[#002147] text-white shadow-lg shadow-[#002147]/20" : "bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800"
                        )}
                      >
                        {p}
                      </button>
                    ) : (
                      <span key={i} className="text-slate-300 dark:text-slate-600 font-bold px-1 select-none">...</span>
                    )
                  ));
                })()}
              </div>

              <button
                onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                disabled={page === totalPages}
                className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl disabled:opacity-30 hover:border-primary transition-all shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] md:ml-4">
              Showing Page {page} of {totalPages}
            </div>
          </div>
        )}
      </div>

      {/* Floating Enrich Panel */}
      {user && (
        <div className="fixed bottom-6 right-6 z-50">
          {showEnrichPanel ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-slate-900/20 border border-slate-100 dark:border-slate-800 p-6 w-80 space-y-4 animate-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-center justify-between">
                <h4 className="font-black text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Database className="w-4 h-4 text-primary" />
                  Bổ sung từ vựng
                </h4>
                <button onClick={() => setShowEnrichPanel(false)} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 text-lg">
                  ×
                </button>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Dùng AI để bổ sung và dịch tiếng Việt cho từ vựng Oxford3000.
              </p>

              {enrichResult && (
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-green-600 dark:text-green-400 font-bold">✅ Đã xử lý: {enrichResult.enriched || enrichResult.translated || 0}</span>
                    <span className="text-amber-600 dark:text-amber-400 font-bold">⏳ Còn lại: {enrichResult.remaining}</span>
                  </div>
                  {enrichResult.remaining > 0 && (
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                      <div
                        className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(5, 100 - (enrichResult.remaining / (enrichResult.remaining + (enrichResult.enriched || enrichResult.translated || 0)) * 100))}%` }}
                      />
                    </div>
                  )}
                  {enrichResult.results && enrichResult.results.length > 0 && (
                    <div className="max-h-32 overflow-y-auto space-y-1 mt-2">
                      {enrichResult.results.map((r: any, i: number) => (
                        <div key={i} className="text-[10px] text-slate-500 dark:text-slate-400 flex justify-between">
                          <span className="font-bold">{r.word}</span>
                          <span>{r.meaningVi ? `→ ${r.meaningVi}` : r.status}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Fast Bulk Translate (20 words/call) */}
              <div className="space-y-2">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest">⚡ Dịch nhanh (20 từ/lần gọi)</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBulkTranslate(20)}
                    disabled={enriching}
                    className="flex-1 px-4 py-3 bg-primary text-white rounded-xl font-bold text-xs hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {enriching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                    {enriching ? 'Đang xử lý...' : '20 từ'}
                  </button>
                  <button
                    onClick={() => handleBulkTranslate(25)}
                    disabled={enriching}
                    className="flex-1 px-4 py-3 bg-[#002147] text-white rounded-xl font-bold text-xs hover:bg-[#00316e] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {enriching ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                    {enriching ? 'Đang xử lý...' : '25 từ'}
                  </button>
                </div>
              </div>

              {/* Detailed Enrich (1 word/call, full metadata) */}
              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">🔍 Bổ sung chi tiết (1 từ/lần)</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBatchEnrich(5)}
                    disabled={enriching}
                    className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-all disabled:opacity-50 flex items-center justify-center gap-1"
                  >
                    5 từ
                  </button>
                  <button
                    onClick={() => handleBatchEnrich(10)}
                    disabled={enriching}
                    className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-all disabled:opacity-50 flex items-center justify-center gap-1"
                  >
                    10 từ
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowEnrichPanel(true)}
              className="w-14 h-14 bg-gradient-to-br from-primary to-[#002147] text-white rounded-2xl shadow-2xl shadow-primary/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
              title="Bổ sung từ vựng thiếu"
            >
              <Wand2 className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function DictionaryPage() {
  return (
    <React.Suspense fallback={
      <div className="max-w-6xl mx-auto space-y-12 pb-20 p-8 text-center text-slate-500 dark:text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin mx-auto mb-2 text-[#002147] dark:text-blue-400" />
        <p className="font-bold text-slate-400 dark:text-slate-500">Loading dictionary...</p>
      </div>
    }>
      <DictionaryContent />
    </React.Suspense>
  );
}
