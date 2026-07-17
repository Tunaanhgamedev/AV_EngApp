'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Languages, ArrowRightLeft, Copy, Volume2, Sparkles,
  Loader2, Trash2, Check, BookMarked, Plus, X, Tag, Info, AlertCircle, Zap,
  Brain, Sliders, Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { getAvailableSkills } from '@/services/chat.service';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const WORD_TYPES = ['noun', 'verb', 'adjective', 'adverb', 'phrase', 'idiom', 'other'];
const TYPE_LABELS: Record<string, string> = {
  noun: '🔵 Danh từ', verb: '🔴 Động từ', adjective: '🟣 Tính từ',
  adverb: '🟡 Trạng từ', phrase: '🟢 Cụm từ', idiom: '🩷 Thành ngữ', other: '⚪ Khác',
};

// ─── Save to Notebook Panel ───────────────────────────────────────────────────
function SaveToNotebookPanel({
  sourceText, translatedText, onClose, initialType = '', isEnToVi = true
}: { sourceText: string; translatedText: string; onClose: () => void; initialType?: string; isEnToVi?: boolean }) {
  const { user } = useAuth();
  const router = useRouter();
  const [wordType, setWordType] = useState(initialType);
  const [editedVi, setEditedVi] = useState(translatedText);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const displayWord = isEnToVi ? sourceText.trim() : translatedText.trim();
  const displayMeaning = isEnToVi ? editedVi.trim() : sourceText.trim();

  const handleSave = async () => {
    if (!user) { router.push('/login'); return; }
    if (saving || saved) return;
    setSaving(true);
    try {
      const token = await user.getIdToken();
      const res = await fetch(`${API_BASE}/vocabulary/notebook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          word: displayWord,
          wordType: wordType || 'other',
          meaningVi: displayMeaning,
        })
      });
      if (res.ok) { setSaved(true); setTimeout(onClose, 2000); }
    } catch { /* ignore */ }
    finally { setSaving(false); }
  };

  return (
    <div className="premium-card border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-indigo-50 animate-in slide-in-from-top-4 duration-400 overflow-hidden mt-6 shadow-2xl">
      <div className="flex items-center justify-between px-6 py-4 border-b border-primary/10 bg-white/60">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl"><BookMarked className="w-5 h-5 text-primary" /></div>
          <div>
            <h3 className="font-black text-slate-800 text-sm">Xác nhận lưu vào Notebook</h3>
            <p className="text-[11px] text-slate-400 font-medium">Lưu "{displayWord}" để ôn tập sau</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"><X className="w-4 h-4" /></button>
      </div>

      <div className="p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-2xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Từ / Cụm từ (EN)</p>
              <p className="text-lg font-black text-slate-800">{displayWord}</p>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2"><BookMarked className="w-3 h-3" /> Nghĩa (VI)</label>
              <textarea
                value={displayMeaning} readOnly={!isEnToVi}
                onChange={e => setEditedVi(e.target.value)}
                rows={2} className={cn("w-full p-3 bg-white border-2 border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all", !isEnToVi && "bg-slate-50 cursor-not-allowed")}
              />
            </div>
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3"><Tag className="w-3 h-3" /> Loại từ</label>
            <div className="flex flex-wrap gap-2">
              {WORD_TYPES.map(t => (
                <button key={t} type="button"
                  onClick={() => setWordType(wordType === t ? '' : t)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-[11px] font-bold border-2 transition-all",
                    wordType === t ? "bg-primary text-white border-primary shadow-md" : "bg-white text-slate-500 border-slate-200 hover:border-primary/40 hover:text-primary"
                  )}>{TYPE_LABELS[t]}</button>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 mt-4 italic">💡 Notebook dùng để lưu từ đơn hoặc cụm từ cố định (idioms/phrases). Không nên lưu cả câu văn dài.</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
          <button onClick={onClose} className="px-4 py-2.5 text-slate-400 hover:text-slate-600 text-sm font-bold transition-colors">Bỏ qua</button>
          {saved ? (
            <div className="flex items-center gap-2 px-6 py-2.5 bg-green-50 text-green-700 rounded-xl font-bold text-sm border border-green-200 animate-in zoom-in duration-300">
              <Check className="w-4 h-4" /> Đã lưu!
            </div>
          ) : (
            <button onClick={handleSave} disabled={saving || !displayMeaning}
              className={cn(
                "flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm text-white transition-all shadow-lg",
                displayMeaning && !saving ? "bg-primary hover:bg-primary/90 shadow-primary/20 hover:scale-[1.01]" : "bg-slate-300 cursor-not-allowed"
              )}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Xác nhận Lưu
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const CACHE_KEY = 'engbot_translate_cache';
const MAX_CACHE_ENTRIES = 500;
const AUTO_TRANSLATE_DELAY = 400;

function loadLocalCache(): Record<string, any> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveLocalCache(cache: Record<string, any>) {
  if (typeof window === 'undefined') return;
  try {
    const keys = Object.keys(cache);
    if (keys.length > MAX_CACHE_ENTRIES) {
      const sorted = keys.sort((a, b) => (cache[a]._ts || 0) - (cache[b]._ts || 0));
      const toRemove = sorted.slice(0, keys.length - MAX_CACHE_ENTRIES);
      toRemove.forEach(k => delete cache[k]);
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch { /* storage full, ignore */ }
}

export default function TranslatePage() {
  const { user } = useAuth();
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationMode, setTranslationMode] = useState<'fast' | 'deep'>('deep');
  const [modePreference, setModePreference] = useState<'auto' | 'fast' | 'deep'>('auto');
  const [isTyping, setIsTyping] = useState(false);
  const [sourceLang, setSourceLang] = useState('English');
  const [targetLang, setTargetLang] = useState('Vietnamese');
  const [copied, setCopied] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [showSavePanel, setShowSavePanel] = useState(false);
  const [wordInsight, setWordInsight] = useState<any>(null);
  const [fromCache, setFromCache] = useState(false);
  const [explaining, setExplaining] = useState(false);
  const [explanation, setExplanation] = useState<any>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Advanced AI Training State
  const [trainedSkills, setTrainedSkills] = useState<string[]>([]);
  const [availableSkills, setAvailableSkills] = useState<any[]>([]);
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Load available skills from API
  useEffect(() => {
    const fetchSkills = async () => {
      if (!user) return;
      try {
        const token = await user.getIdToken();
        const skills = await getAvailableSkills(token);
        setAvailableSkills(skills || []);
      } catch (err) {
        console.error('Failed to load available skills:', err);
      }
    };
    fetchSkills();
  }, [user]);

  const cacheRef = useRef<Record<string, any>>({});
  const explanationCacheRef = useRef<Record<string, any>>({});
  const fastDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const deepDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const lastTranslatedRef = useRef('');
  const lastTranslatedModeRef = useRef<'fast' | 'deep' | null>(null);

  // Load persistent cache on mount
  useEffect(() => {
    cacheRef.current = loadLocalCache();
  }, []);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => setCooldown(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  const doTranslate = useCallback(async (textToTranslate: string, sLang: string, tLang: string, mode: 'fast' | 'deep') => {
    const text = textToTranslate.trim();
    if (!text || cooldown > 0) return;
    
    if (text === lastTranslatedRef.current && mode === lastTranslatedModeRef.current) return;

    const sortedSkillsStr = (trainedSkills || []).sort().join(',');
    const cacheKey = `${sLang}-${tLang}-${text}-${sortedSkillsStr}`;
    
    // If cache has it, load instantly
    if (cacheRef.current[cacheKey]) {
      setTranslatedText(cacheRef.current[cacheKey].translation);
      setWordInsight(cacheRef.current[cacheKey].insight || null);
      setFromCache(true);
      lastTranslatedRef.current = text;
      lastTranslatedModeRef.current = mode;
      return;
    }

    // Abort previous in-flight request
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsTranslating(true);
    setTranslationMode(mode);
    if (mode === 'deep') {
      setShowSavePanel(false);
      setWordInsight(null);
    }

    try {
      const res = await fetch(`${API_BASE}/ai/translate`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLang: tLang, mode, trainedSkills }),
        signal: controller.signal,
      });
      const data = await res.json();

      if (!res.ok) {
        if (mode === 'deep') {
          setTranslatedText(data.error || 'Dịch thất bại');
          if (res.status === 429) setCooldown(30);
        }
      } else {
        setTranslatedText(data.translation);
        lastTranslatedRef.current = text;
        lastTranslatedModeRef.current = mode;
        if (data.cached) setFromCache(true);

        // Fetch Word Insights ONLY in deep mode and ONLY for English source
        let insight = null;
        if (mode === 'deep') {
          const wordCount = text.split(/\s+/).length;
          if (wordCount <= 3 && sLang === 'English') {
            try {
              const insightRes = await fetch(`${API_BASE}/ai/word-insight`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ word: text }),
                signal: controller.signal,
              });
              insight = await insightRes.json();
              setWordInsight(insight);
            } catch { /* ignore */ }
          }
        }

        // Save to persistent local cache if we have a valid translation
        if (data.translation) {
          cacheRef.current[cacheKey] = { 
            translation: data.translation, 
            insight: mode === 'deep' ? insight : (cacheRef.current[cacheKey]?.insight || null), 
            _ts: Date.now() 
          };
          saveLocalCache(cacheRef.current);
        }
      }
    } catch (err: any) {
      if (err.name !== 'AbortError' && mode === 'deep') {
        setTranslatedText('Lỗi kết nối máy chủ');
      }
    }
    finally { setIsTranslating(false); }
  }, [cooldown, trainedSkills]);

  // ── Auto-translate on typing (debounced, like Google Translate) ──
  useEffect(() => {
    const text = inputText.trim();
    if (!text) {
      setTranslatedText('');
      setWordInsight(null);
      lastTranslatedRef.current = '';
      lastTranslatedModeRef.current = null;
      setIsTyping(false);
      return;
    }

    setIsTyping(true);

    // ── Instant cache check (0ms delay for cached words) ──
    const sortedSkillsStr = (trainedSkills || []).sort().join(',');
    const cacheKey = `${sourceLang}-${targetLang}-${text}-${sortedSkillsStr}`;
    if (cacheRef.current[cacheKey]) {
      setTranslatedText(cacheRef.current[cacheKey].translation);
      setWordInsight(cacheRef.current[cacheKey].insight || null);
      setFromCache(true);
      lastTranslatedRef.current = text;
      lastTranslatedModeRef.current = 'deep';
      setIsTyping(false);
      return;
    }

    // ── Fast mode timer ──
    if (fastDebounceRef.current) clearTimeout(fastDebounceRef.current);
    if (modePreference === 'auto' || modePreference === 'fast') {
      fastDebounceRef.current = setTimeout(() => {
        doTranslate(inputText, sourceLang, targetLang, 'fast');
      }, 120); // Ultra-fast response for typing (120ms)
    }

    // ── Deep mode timer ──
    if (deepDebounceRef.current) clearTimeout(deepDebounceRef.current);
    if (modePreference === 'auto' || modePreference === 'deep') {
      const delay = modePreference === 'deep' ? 600 : 1200; // 1.2s delay for auto mode to prevent hammering Gemini API
      deepDebounceRef.current = setTimeout(() => {
        setIsTyping(false); // Finished typing
        doTranslate(inputText, sourceLang, targetLang, 'deep');
      }, delay);
    } else {
      // In purely fast mode, we finish typing immediately after fast translation
      const delay = 150;
      deepDebounceRef.current = setTimeout(() => {
        setIsTyping(false);
      }, delay);
    }

    return () => {
      if (fastDebounceRef.current) clearTimeout(fastDebounceRef.current);
      if (deepDebounceRef.current) clearTimeout(deepDebounceRef.current);
    };
  }, [inputText, sourceLang, targetLang, doTranslate, trainedSkills, modePreference]);

  const fetchExplanation = async () => {
    if (!inputText.trim() || !translatedText.trim()) return;
    if (showExplanation) {
      setShowExplanation(false);
      return;
    }

    const cacheKey = `${sourceLang}-${targetLang}-${inputText.trim()}`;
    if (explanationCacheRef.current[cacheKey]) {
      setExplanation(explanationCacheRef.current[cacheKey]);
      setShowExplanation(true);
      return;
    }

    setExplaining(true);
    setShowExplanation(true);
    try {
      const res = await fetch(`${API_BASE}/ai/explain-translation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          translation: translatedText,
          targetLang
        })
      });
      if (res.ok) {
        const data = await res.json();
        setExplanation(data);
        explanationCacheRef.current[cacheKey] = data;
      } else {
        setExplanation(null);
      }
    } catch {
      setExplanation(null);
    } finally {
      setExplaining(false);
    }
  };

  const swapLangs = () => {
    const s = sourceLang;
    const t = targetLang;
    setSourceLang(t);
    setTargetLang(s);
    setInputText(translatedText);
    setTranslatedText(inputText);
    setShowSavePanel(false);
    setWordInsight(null);
    setFromCache(false);
    setShowExplanation(false);
    setExplanation(null);
    lastTranslatedRef.current = '';
    lastTranslatedModeRef.current = null;
    // Trigger deep translation immediately for swapped text
    if (translatedText.trim()) {
      doTranslate(translatedText, t, s, 'deep');
    }
  };

  const speak = (text: string, lang = 'en-US') => {
    if (!text || typeof window === 'undefined') return;

    const playTranslateTTS = () => {
      const tl = lang.split('-')[0];
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${tl}&client=tw-ob&q=${encodeURIComponent(text)}`;
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

      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang;
      u.rate = 0.9;

      const preferredVoice = voices.find(v => v.lang === lang && v.name.includes('Google')) ||
        voices.find(v => v.lang === lang);
      if (preferredVoice) u.voice = preferredVoice;

      u.onerror = (e) => {
        console.log("speechSynthesis error, playing Google Translate TTS:", e);
        playTranslateTTS();
      };

      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        setTimeout(() => {
          window.speechSynthesis.speak(u);
        }, 50);
      } else {
        window.speechSynthesis.speak(u);
      }
    } else {
      playTranslateTTS();
    }
  };

  const hasResult = translatedText && !translatedText.includes('Failed') && !translatedText.includes('thất bại') && !translatedText.includes('Lỗi');

  // Logic: strictly only 1 word for notebook as per user request
  const wordCount = inputText.trim().split(/\s+/).length;
  const isPhraseOrSentence = wordCount >= 2 || inputText.trim().endsWith('.') || inputText.trim().endsWith('!');
  const canSaveToNotebook = hasResult && !isPhraseOrSentence && sourceLang === 'English';

  return (
    <div className="w-full max-w-none space-y-6 md:space-y-8 py-2 md:py-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-primary to-indigo-600 rounded-2xl text-white shadow-xl shadow-primary/20"><Languages className="w-8 h-8" /></div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Nebula AI Translator</h1>
            <p className="text-xs md:text-sm text-slate-500 font-medium">Bản dịch chính xác từ <span className="text-primary font-bold">EngBot AI</span></p>
          </div>
        </div>
      </header>

      {/* Language Switcher */}
      <div className="flex items-center justify-center gap-4 md:gap-6">
        <div className={cn("px-5 md:px-8 py-2.5 md:py-3 rounded-2xl font-black text-xs md:text-sm shadow-sm transition-all border", sourceLang === 'English' ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-100")}>{sourceLang}</div>
        <button onClick={swapLangs} className="p-3 md:p-4 bg-primary text-white rounded-full hover:rotate-180 hover:scale-110 transition-all duration-500 shadow-lg shadow-primary/30 active:scale-95">
          <ArrowRightLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>
        <div className={cn("px-5 md:px-8 py-2.5 md:py-3 rounded-2xl font-black text-xs md:text-sm shadow-sm transition-all border", targetLang === 'English' ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-100")}>{targetLang}</div>
      </div>

      {/* Trained Skills status bar */}
      <div className="mx-auto max-w-4xl w-full px-4 py-2.5 bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 text-xs rounded-2xl">
        <div className="flex items-center gap-2 min-w-0">
          <Brain className="w-4 h-4 text-fuchsia-500 animate-pulse flex-shrink-0" />
          <span className="font-bold text-slate-500 dark:text-slate-400">Tri thức dịch thuật:</span>
          {trainedSkills.length === 0 ? (
            <span className="text-slate-400 italic">Chưa nạp skill (Hệ thống dịch tiêu chuẩn)</span>
          ) : (
            <div className="flex gap-1 overflow-x-auto no-scrollbar py-0.5 max-w-[200px] sm:max-w-xs md:max-w-md lg:max-w-xl">
              {trainedSkills.map(skillId => {
                const s = availableSkills.find(x => x.id === skillId);
                return (
                  <span key={skillId} className="px-2 py-0.5 bg-fuchsia-500/10 dark:bg-fuchsia-500/20 text-fuchsia-600 dark:text-fuchsia-300 border border-fuchsia-500/20 rounded-full font-bold text-[10px] whitespace-nowrap">
                    {s?.name || skillId}
                  </span>
                );
              })}
            </div>
          )}
        </div>
        <button 
          onClick={() => setShowTrainingModal(true)}
          className="flex items-center gap-1 px-2.5 py-1 bg-fuchsia-50 hover:bg-fuchsia-600 hover:text-white dark:hover:bg-slate-700 text-fuchsia-600 dark:text-fuchsia-300 rounded-lg border border-fuchsia-500/20 dark:border-fuchsia-500/40 transition-all font-bold text-[10px] shadow-sm cursor-pointer whitespace-nowrap active:scale-95"
        >
          <Sliders className="w-3.5 h-3.5" /> Huấn luyện AI
        </button>
      </div>

      {/* Mode Selector Pill Group */}
      <div className="flex justify-center">
        <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl gap-1.5 border border-slate-200/50 dark:border-slate-800 shadow-sm max-w-sm w-full">
          {(['auto', 'fast', 'deep'] as const).map(pref => {
            const isActive = modePreference === pref;
            let label = '';
            if (pref === 'auto') {
              label = '⚡ Tự động';
            } else if (pref === 'fast') {
              label = '🏃 Dịch nhanh';
            } else {
              label = '🧠 Dịch sâu (AI)';
            }
            return (
              <button
                key={pref}
                onClick={() => {
                  setModePreference(pref);
                  // Trigger re-translation immediately on mode switch
                  if (inputText.trim()) {
                    // Reset cache refs to force refresh
                    lastTranslatedRef.current = '';
                    lastTranslatedModeRef.current = null;
                  }
                }}
                className={cn(
                  "flex-1 py-2 text-center text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap",
                  isActive
                    ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-sm border border-slate-200/20"
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full">
        {/* Input */}
        <div className="premium-card p-0 flex flex-col relative border-2 border-transparent focus-within:border-primary/20 transition-all duration-500 shadow-xl min-h-[220px] sm:h-[320px] md:h-[380px]">
          <textarea
            className="flex-1 p-4 sm:p-6 md:p-8 bg-transparent border-none focus:ring-0 text-xl md:text-2xl font-medium resize-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none min-h-[160px] sm:min-h-0"
            placeholder={sourceLang === 'English' ? "Type to translate..." : "Nhập để dịch tự động..."}
            value={inputText}
            onChange={e => { 
              setInputText(e.target.value); 
              setShowSavePanel(false); 
              setShowExplanation(false);
              setExplanation(null);
            }}
          />
          <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 bg-slate-50/30">
            <div className="flex items-center gap-2">
              <button onClick={() => speak(inputText, sourceLang === 'English' ? 'en-US' : 'vi-VN')} disabled={!inputText.trim()} className="p-2 text-slate-400 hover:text-primary transition-all disabled:opacity-30"><Volume2 className="w-5 h-5" /></button>
              {isTyping && (
                <span className="flex items-center gap-1.5 text-[10px] font-black text-indigo-500 uppercase tracking-widest animate-pulse">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
                  </span>
                  Đang viết...
                </span>
              )}
              {!isTyping && isTranslating && (
                <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest animate-pulse text-sky-500">
                  {translationMode === 'fast' ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Dịch nhanh...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-primary" /> Đang dịch sát nghĩa...
                    </>
                  )}
                </span>
              )}
              {!isTyping && !isTranslating && inputText.trim() && fromCache && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                  <Zap className="w-3 h-3" /> Tức thì
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{inputText.length}</span>
              <button onClick={() => { 
                setInputText(''); 
                setTranslatedText(''); 
                setShowSavePanel(false); 
                setFromCache(false); 
                setWordInsight(null); 
                setShowExplanation(false);
                setExplanation(null);
                lastTranslatedRef.current = ''; 
              }} disabled={!inputText} className="p-2 text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 transition-colors disabled:opacity-30"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="premium-card p-0 flex flex-col relative border-2 border-transparent transition-all duration-500 shadow-xl min-h-[220px] sm:h-[320px] md:h-[380px]">
          {isTranslating && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-indigo-500 to-primary animate-pulse rounded-t-2xl" />
          )}
          <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto overflow-x-hidden">
            <div className="space-y-6 animate-in fade-in duration-500">
              {fromCache && hasResult && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-200 dark:border-amber-900/50 animate-in zoom-in duration-300">
                  <Zap className="w-3 h-3" />
                  Trả lời tức thì
                </div>
              )}
              <div className="text-xl sm:text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100 leading-tight break-words">
                {translatedText || <span className="text-slate-300 dark:text-slate-600 font-medium italic">{isTranslating ? 'Đang dịch...' : 'Kết quả dịch...'}</span>}
              </div>

              {/* Insight ONLY for single word */}
              {wordInsight && hasResult && sourceLang === 'English' && !isPhraseOrSentence && (
                <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary">
                      <Info className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Chi tiết từ vựng</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-full">{wordInsight.cefrLevel}</span>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {wordInsight.wordTypes?.map((wt: any, i: number) => (
                      <div key={i}>
                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-tighter">{wt.type}</span>
                        <p className="text-sm text-slate-700 dark:text-slate-300 font-bold">{wt.meaningVi}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Phrase/Sentence Warning */}
              {isPhraseOrSentence && hasResult && (
                <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                  <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                  <div className="text-xs font-medium">
                    <p className="font-black uppercase tracking-widest text-[10px] mb-1">Dịch Cụm từ / Câu văn</p>
                    Bạn đang dịch cụm từ hoặc câu. Hệ thống chỉ cho phép lưu "từ vựng đơn lẻ" vào Notebook để đảm bảo hiệu quả ôn tập.
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex gap-2">
              <button onClick={() => speak(translatedText, targetLang === 'Vietnamese' ? 'vi-VN' : 'en-US')} className="p-2 text-slate-400 dark:text-slate-500 hover:text-primary transition-all"><Volume2 className="w-5 h-5" /></button>
              <button onClick={() => { navigator.clipboard.writeText(translatedText); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                className={cn("p-2 transition-all", copied ? "text-green-500" : "text-slate-400 dark:text-slate-500 hover:text-primary")}>
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            {canSaveToNotebook && (
              <button onClick={() => setShowSavePanel(!showSavePanel)}
                className={cn("flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-md",
                  showSavePanel ? "bg-primary text-white" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white"
                )}>
                <BookMarked className="w-4 h-4" /> {showSavePanel ? 'Hủy' : 'Lưu từ vựng'}
              </button>
            )}
            {hasResult && isPhraseOrSentence && (
              <button onClick={fetchExplanation} disabled={explaining}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-md border-2",
                  showExplanation 
                    ? "bg-indigo-600 border-indigo-600 text-white" 
                    : "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-950 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20"
                )}>
                {explaining ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {showExplanation ? 'Đóng giải thích' : 'Giải thích câu (AI)'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Save Panel Integration */}
      {showSavePanel && canSaveToNotebook && (
        <SaveToNotebookPanel
          sourceText={inputText}
          translatedText={translatedText}
          isEnToVi={sourceLang === 'English'}
          initialType={wordInsight?.wordTypes?.[0]?.type || (wordCount > 1 ? 'phrase' : '')}
          onClose={() => setShowSavePanel(false)}
        />
      )}

      {/* AI Explanation Panel */}
      {showExplanation && (
        <div className="premium-card border-2 border-indigo-200/50 dark:border-indigo-800/40 bg-gradient-to-br from-indigo-50/30 to-slate-50/50 dark:from-slate-900/30 dark:to-slate-900/50 animate-in slide-in-from-bottom-6 duration-500 overflow-hidden shadow-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-primary rounded-xl text-white shadow-md shadow-indigo-500/10">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-black text-slate-800 dark:text-slate-100 text-sm md:text-base tracking-tight">AI Explanation & Breakdown</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Phân tích cấu trúc ngữ pháp và từ vựng của câu</p>
              </div>
            </div>
            <button onClick={() => setShowExplanation(false)} className="p-1.5 text-slate-300 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"><X className="w-4 h-4" /></button>
          </div>

          {explaining ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <div className="text-center space-y-1">
                <p className="text-sm font-bold text-slate-600 dark:text-slate-300">Đang phân tích chi tiết câu...</p>
                <p className="text-xs text-slate-400">Đội ngũ giáo viên AI của EngBot đang bóc tách ngữ nghĩa câu văn</p>
              </div>
            </div>
          ) : explanation ? (
            <div className="space-y-6">
              {/* Alternatives */}
              {explanation.alternatives && explanation.alternatives.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <ArrowRightLeft className="w-3 h-3 text-indigo-500" /> Cách dịch khác (Alternatives)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {explanation.alternatives.map((alt: string, i: number) => (
                      <div key={i} className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-900 transition-all duration-300">
                        {alt}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Grammar Points */}
              {explanation.grammarPoints && explanation.grammarPoints.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-indigo-500" /> Điểm ngữ pháp chính (Grammar)
                  </h4>
                  <div className="space-y-2">
                    {explanation.grammarPoints.map((gp: any, i: number) => (
                      <div key={i} className="p-4 bg-white/70 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl space-y-1">
                        <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">{gp.pattern}</span>
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">{gp.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vocabulary Breakdown */}
              {explanation.vocabularyBreakdown && explanation.vocabularyBreakdown.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <BookMarked className="w-3 h-3 text-indigo-500" /> Bóc tách từ vựng quan trọng (Vocabulary)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {explanation.vocabularyBreakdown.map((vb: any, i: number) => (
                      <div key={i} className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-xl space-y-2 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-black text-slate-800 dark:text-slate-100">{vb.word}</span>
                            <span className="text-[9px] font-bold px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded uppercase">{vb.pos}</span>
                          </div>
                          {vb.phonetic && <span className="text-[11px] font-medium text-slate-400 font-mono block">{vb.phonetic}</span>}
                          <p className="text-xs font-bold text-primary">{vb.meaning}</p>
                          {vb.context && <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1 leading-relaxed">{vb.context}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pronunciation & Speaking Tips */}
              {explanation.speakingTips && (
                <div className="space-y-2 p-4 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-900/30 rounded-xl">
                  <h4 className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                    <Volume2 className="w-3.5 h-3.5" /> Hướng dẫn phát âm tự nhiên (Speaking Tips)
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{explanation.speakingTips}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl text-xs font-medium">
              <AlertCircle className="w-4 h-4" /> Không thể kết nối tới dịch vụ phân tích. Hãy thử lại sau.
            </div>
          )}
        </div>
      )}

      {/* AI Training Room Modal */}
      {showTrainingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="premium-card max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-fuchsia-500 to-rose-600 text-white rounded-xl shadow-md">
                  <Brain className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">Phòng Huấn Luyện Tri Thức Dịch Thuật</h3>
                  <p className="text-xs text-slate-400">Chọn tối đa 5 kỹ năng nâng cao để huấn luyện trực tiếp cho AI dịch thuật</p>
                </div>
              </div>
              <button 
                onClick={() => setShowTrainingModal(false)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Neural Synapses Status */}
            <div className="px-4 py-3 bg-gradient-to-r from-fuchsia-500/5 to-rose-500/5 dark:from-fuchsia-500/10 dark:to-rose-500/10 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-ping" />
                Kết nối nơ-ron: <span className="font-bold text-fuchsia-600 dark:text-fuchsia-400">{trainedSkills.length}/5 active</span>
              </span>
              {trainedSkills.length > 0 && (
                <button 
                  onClick={() => setTrainedSkills([])}
                  className="text-xs font-bold text-rose-500 hover:underline cursor-pointer"
                >
                  Xóa tất cả nơ-ron
                </button>
              )}
            </div>

            {/* Filter and Search */}
            <div className="p-4 space-y-3 border-b border-slate-100 dark:border-slate-800">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  placeholder="Tìm kiếm kỹ năng dịch thuật..."
                  className="w-full h-10 pl-9 pr-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-xl focus:border-primary focus:outline-none transition-all text-sm placeholder:text-slate-400 text-slate-700 dark:text-slate-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Categories */}
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {['All', 'ai', 'development', 'security', 'database', 'design', 'seo', 'automation'].map(cat => {
                  const label = cat === 'All' ? 'Tất cả' : cat.toUpperCase();
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap",
                        isActive 
                          ? "bg-primary text-white" 
                          : "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Skills List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-[40vh] min-h-[25vh]">
              {availableSkills
                .filter(s => {
                  const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                     s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                     s.description.toLowerCase().includes(searchQuery.toLowerCase());
                  const matchCat = selectedCategory === 'All' || s.category === selectedCategory || s.tags?.includes(selectedCategory);
                  return matchSearch && matchCat;
                })
                .map(skill => {
                  const isChecked = trainedSkills.includes(skill.id);
                  return (
                    <button
                      key={skill.id}
                      onClick={() => {
                        if (isChecked) {
                          setTrainedSkills(trainedSkills.filter(id => id !== skill.id));
                        } else {
                          if (trainedSkills.length >= 5) {
                            alert('Chỉ huấn luyện tối đa 5 kỹ năng cùng lúc để đạt hiệu suất phản hồi tối ưu.');
                            return;
                          }
                          setTrainedSkills([...trainedSkills, skill.id]);
                        }
                      }}
                      className={cn(
                        "w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 active:scale-[0.99]",
                        isChecked 
                          ? "bg-fuchsia-500/5 dark:bg-fuchsia-500/10 border-fuchsia-500 text-slate-800 dark:text-slate-100" 
                          : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-200 dark:hover:border-slate-600"
                      )}
                    >
                      <div className={cn(
                        "w-5 h-5 rounded-md flex items-center justify-center border-2 flex-shrink-0 mt-0.5 transition-all",
                        isChecked ? "bg-fuchsia-500 border-fuchsia-500 text-white" : "border-slate-300 dark:border-slate-600"
                      )}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                          {skill.name || skill.id}
                          <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded">
                            {skill.category || 'general'}
                          </span>
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed mt-0.5 line-clamp-2">{skill.description}</p>
                      </div>
                    </button>
                  );
                })}
              {availableSkills.filter(s => {
                const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                   s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                   s.description.toLowerCase().includes(searchQuery.toLowerCase());
                const matchCat = selectedCategory === 'All' || s.category === selectedCategory || s.tags?.includes(selectedCategory);
                return matchSearch && matchCat;
              }).length === 0 && (
                <div className="text-center py-8 text-slate-400 italic text-sm">
                  Không tìm thấy kỹ năng nào phù hợp.
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
              <button 
                onClick={() => setShowTrainingModal(false)}
                className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Hủy
              </button>
              <button 
                onClick={() => setShowTrainingModal(false)}
                className="px-6 py-2 text-sm font-bold bg-primary text-white rounded-xl hover:opacity-90 transition-all shadow-md cursor-pointer"
              >
                Hoàn tất Huấn luyện
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
