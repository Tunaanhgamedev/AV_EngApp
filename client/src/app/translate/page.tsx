'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Languages, ArrowRightLeft, Copy, Volume2, Sparkles,
  Loader2, Trash2, Check, BookMarked, Plus, X, Tag, Info, AlertCircle, Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

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
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationMode, setTranslationMode] = useState<'fast' | 'deep'>('deep');
  const [isTyping, setIsTyping] = useState(false);
  const [sourceLang, setSourceLang] = useState('English');
  const [targetLang, setTargetLang] = useState('Vietnamese');
  const [copied, setCopied] = useState(false);
  const [cache, setCache] = useState<Record<string, any>>({});
  const [cooldown, setCooldown] = useState(0);
  const [showSavePanel, setShowSavePanel] = useState(false);
  const [wordInsight, setWordInsight] = useState<any>(null);
  const [fromCache, setFromCache] = useState(false);

  const fastDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const deepDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const lastTranslatedRef = useRef('');

  // Load persistent cache on mount
  useEffect(() => {
    setCache(loadLocalCache());
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
    
    // In deep mode, we want to run even if the text matches lastTranslatedRef.current in fast mode (to fetch Gemini translation & word insights!)
    if (mode === 'fast' && text === lastTranslatedRef.current) return;
    if (mode === 'deep' && text === lastTranslatedRef.current && wordInsight) return;

    const cacheKey = `${sLang}-${tLang}-${text}`;
    
    // If cache has it, load instantly
    if (cache[cacheKey]) {
      setTranslatedText(cache[cacheKey].translation);
      setWordInsight(cache[cacheKey].insight || null);
      setFromCache(true);
      lastTranslatedRef.current = text;
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
        body: JSON.stringify({ text, targetLang: tLang, mode }),
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
          const newCache = {
            ...cache,
            [cacheKey]: { 
              translation: data.translation, 
              insight: mode === 'deep' ? insight : (cache[cacheKey]?.insight || null), 
              _ts: Date.now() 
            }
          };
          setCache(newCache);
          saveLocalCache(newCache);
        }
      }
    } catch (err: any) {
      if (err.name !== 'AbortError' && mode === 'deep') {
        setTranslatedText('Lỗi kết nối máy chủ');
      }
    }
    finally { setIsTranslating(false); }
  }, [cache, cooldown, wordInsight]);

  // ── Auto-translate on typing (debounced, like Google Translate) ──
  useEffect(() => {
    const text = inputText.trim();
    if (!text) {
      setTranslatedText('');
      setWordInsight(null);
      lastTranslatedRef.current = '';
      setIsTyping(false);
      return;
    }

    setIsTyping(true);

    // ── Instant cache check (0ms delay for cached words) ──
    const cacheKey = `${sourceLang}-${targetLang}-${text}`;
    if (cache[cacheKey]) {
      setTranslatedText(cache[cacheKey].translation);
      setWordInsight(cache[cacheKey].insight || null);
      setFromCache(true);
      lastTranslatedRef.current = text;
      setIsTyping(false);
      return;
    }

    // ── Fast mode timer (200ms) ──
    if (fastDebounceRef.current) clearTimeout(fastDebounceRef.current);
    const endsWithSpace = inputText.endsWith(' ');
    const fastDelay = endsWithSpace ? 0 : 200;
    fastDebounceRef.current = setTimeout(() => {
      doTranslate(inputText, sourceLang, targetLang, 'fast');
    }, fastDelay);

    // ── Deep mode timer (750ms) ──
    if (deepDebounceRef.current) clearTimeout(deepDebounceRef.current);
    deepDebounceRef.current = setTimeout(() => {
      setIsTyping(false); // Finished typing
      doTranslate(inputText, sourceLang, targetLang, 'deep');
    }, 750);

    return () => {
      if (fastDebounceRef.current) clearTimeout(fastDebounceRef.current);
      if (deepDebounceRef.current) clearTimeout(deepDebounceRef.current);
    };
  }, [inputText, sourceLang, targetLang, cache, doTranslate]);

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
    lastTranslatedRef.current = '';
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

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full">
        {/* Input */}
        <div className="premium-card p-0 flex flex-col relative border-2 border-transparent focus-within:border-primary/20 transition-all duration-500 shadow-xl min-h-[220px] lg:h-[380px]">
          <textarea
            className="flex-1 p-6 md:p-8 bg-transparent border-none focus:ring-0 text-xl md:text-2xl font-medium resize-none placeholder:text-slate-200 focus:outline-none min-h-[160px] lg:min-h-0"
            placeholder={sourceLang === 'English' ? "Type to translate..." : "Nhập để dịch tự động..."}
            value={inputText}
            onChange={e => { setInputText(e.target.value); setShowSavePanel(false); }}
          />
          <div className="px-6 py-4 flex items-center justify-between border-t border-slate-50 bg-slate-50/30">
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
              <span className="text-[10px] text-slate-300 font-mono">{inputText.length}</span>
              <button onClick={() => { setInputText(''); setTranslatedText(''); setShowSavePanel(false); setFromCache(false); setWordInsight(null); lastTranslatedRef.current = ''; }} disabled={!inputText} className="p-2 text-slate-300 hover:text-rose-500 transition-colors disabled:opacity-30"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="premium-card p-0 flex flex-col bg-white border-primary/5 shadow-2xl relative min-h-[220px] lg:h-[380px]">
          {isTranslating && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-indigo-500 to-primary animate-pulse rounded-t-2xl" />
          )}
          <div className="flex-1 p-6 md:p-8 overflow-y-auto">
            <div className="space-y-6 animate-in fade-in duration-500">
              {fromCache && hasResult && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-200 animate-in zoom-in duration-300">
                  <Zap className="w-3 h-3" />
                  Trả lời tức thì
                </div>
              )}
              <div className="text-3xl font-black text-slate-800 leading-tight">
                {translatedText || <span className="text-slate-200 font-medium italic">{isTranslating ? 'Đang dịch...' : 'Kết quả dịch...'}</span>}
              </div>

              {/* Insight ONLY for single word */}
              {wordInsight && hasResult && sourceLang === 'English' && !isPhraseOrSentence && (
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary">
                      <Info className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Chi tiết từ vựng</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">{wordInsight.cefrLevel}</span>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {wordInsight.wordTypes?.map((wt: any, i: number) => (
                      <div key={i}>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{wt.type}</span>
                        <p className="text-sm text-slate-700 font-bold">{wt.meaningVi}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Phrase/Sentence Warning */}
              {isPhraseOrSentence && hasResult && (
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-500">
                  <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                  <div className="text-xs font-medium">
                    <p className="font-black uppercase tracking-widest text-[10px] mb-1">Dịch Cụm từ / Câu văn</p>
                    Bạn đang dịch cụm từ hoặc câu. Hệ thống chỉ cho phép lưu "từ vựng đơn lẻ" vào Notebook để đảm bảo hiệu quả ôn tập.
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <div className="flex gap-2">
              <button onClick={() => speak(translatedText, targetLang === 'Vietnamese' ? 'vi-VN' : 'en-US')} className="p-2 text-slate-400 hover:text-primary transition-all"><Volume2 className="w-5 h-5" /></button>
              <button onClick={() => { navigator.clipboard.writeText(translatedText); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                className={cn("p-2 transition-all", copied ? "text-green-500" : "text-slate-400 hover:text-primary")}>
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            {canSaveToNotebook && (
              <button onClick={() => setShowSavePanel(!showSavePanel)}
                className={cn("flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-md",
                  showSavePanel ? "bg-primary text-white" : "bg-white text-slate-600 hover:text-primary"
                )}>
                <BookMarked className="w-4 h-4" /> {showSavePanel ? 'Hủy' : 'Lưu từ vựng'}
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
    </div>
  );
}
