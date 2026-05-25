'use client';

import React, { useState, useEffect } from 'react';
import { 
  Languages, ArrowRightLeft, Copy, Volume2, Sparkles, RefreshCw,
  Loader2, Trash2, Check, BookMarked, Plus, X, Tag, Info, AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const WORD_TYPES = ['noun','verb','adjective','adverb','phrase','idiom','other'];
const TYPE_LABELS: Record<string,string> = {
  noun:'🔵 Danh từ', verb:'🔴 Động từ', adjective:'🟣 Tính từ',
  adverb:'🟡 Trạng từ', phrase:'🟢 Cụm từ', idiom:'🩷 Thành ngữ', other:'⚪ Khác',
};

// ─── Save to Notebook Panel ───────────────────────────────────────────────────
function SaveToNotebookPanel({
  sourceText, translatedText, onClose, initialType = '', isEnToVi = true
}: { sourceText: string; translatedText: string; onClose: () => void; initialType?: string; isEnToVi?: boolean }) {
  const { user } = useAuth();
  const router = useRouter();
  const [wordType, setWordType]   = useState(initialType);
  const [editedVi, setEditedVi]   = useState(translatedText);
  const [saving, setSaving]       = useState(false);
  const [saved, setSaved]         = useState(false);

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
export default function TranslatePage() {
  const [inputText, setInputText]           = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating]   = useState(false);
  const [sourceLang, setSourceLang]         = useState('English');
  const [targetLang, setTargetLang]         = useState('Vietnamese');
  const [copied, setCopied]                 = useState(false);
  const [cache, setCache]                   = useState<Record<string, any>>({});
  const [cooldown, setCooldown]             = useState(0);
  const [showSavePanel, setShowSavePanel]   = useState(false);
  const [wordInsight, setWordInsight]       = useState<any>(null);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => setCooldown(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  const handleTranslate = async () => {
    const text = inputText.trim();
    if (!text || isTranslating || cooldown > 0) return;
    
    const cacheKey = `${sourceLang}-${targetLang}-${text}`;
    if (cache[cacheKey]) {
      setTranslatedText(cache[cacheKey].translation);
      setWordInsight(cache[cacheKey].insight);
      return;
    }

    setIsTranslating(true);
    setTranslatedText('');
    setShowSavePanel(false);
    setWordInsight(null);

    try {
      const res = await fetch(`${API_BASE}/ai/translate`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLang }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        setTranslatedText(data.error || 'Dịch thất bại');
        if (res.status === 429) setCooldown(30);
      } else {
        setTranslatedText(data.translation);
        
        // Single word or short phrase insight ONLY for English source
        const wordCount = text.split(/\s+/).length;
        if (wordCount <= 3 && sourceLang === 'English') {
          try {
            const insightRes = await fetch(`${API_BASE}/ai/word-insight`, {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ word: text }),
            });
            const insight = await insightRes.json();
            setWordInsight(insight);
          } catch { /* ignore */ }
        }
        setCache(prev => ({ ...prev, [cacheKey]: { translation: data.translation, insight: wordInsight } }));
      }
    } catch { setTranslatedText('Lỗi kết nối máy chủ'); }
    finally { setIsTranslating(false); }
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
  };

  const speak = (text: string, lang = 'en-US') => {
    if (!text || typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    
    try {
      const dummy = new SpeechSynthesisUtterance('');
      dummy.lang = lang;
      window.speechSynthesis.speak(dummy);
    } catch (e) {}
    
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang; 
    u.rate = 0.9;
    
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang === lang && v.name.includes('Google')) || 
                           voices.find(v => v.lang === lang);
    if (preferredVoice) u.voice = preferredVoice;
    
    window.speechSynthesis.speak(u);
  };

  const hasResult = translatedText && !translatedText.includes('Failed') && !translatedText.includes('thất bại') && !translatedText.includes('Lỗi');
  
  // Logic: strictly only 1 word for notebook as per user request
  const wordCount = inputText.trim().split(/\s+/).length;
  const isPhraseOrSentence = wordCount >= 2 || inputText.trim().endsWith('.') || inputText.trim().endsWith('!');
  const canSaveToNotebook = hasResult && !isPhraseOrSentence && sourceLang === 'English';

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-primary to-indigo-600 rounded-2xl text-white shadow-xl shadow-primary/20"><Languages className="w-8 h-8" /></div>
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Nebula AI Translator</h1>
            <p className="text-slate-500 font-medium">Bản dịch chính xác từ <span className="text-primary font-bold">EngBot AI</span></p>
          </div>
        </div>
      </header>

      {/* Language Switcher */}
      <div className="flex items-center justify-center gap-6">
        <div className={cn("px-8 py-3 rounded-2xl font-black text-sm shadow-sm transition-all border", sourceLang === 'English' ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-100")}>{sourceLang}</div>
        <button onClick={swapLangs} className="p-4 bg-primary text-white rounded-full hover:rotate-180 hover:scale-110 transition-all duration-500 shadow-lg shadow-primary/30 active:scale-95">
          <ArrowRightLeft className="w-5 h-5" />
        </button>
        <div className={cn("px-8 py-3 rounded-2xl font-black text-sm shadow-sm transition-all border", targetLang === 'English' ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-100")}>{targetLang}</div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input */}
        <div className="premium-card p-0 flex flex-col relative border-2 border-transparent focus-within:border-primary/20 transition-all duration-500 shadow-xl h-[400px]">
          <textarea
            className="flex-1 p-8 bg-transparent border-none focus:ring-0 text-2xl font-medium resize-none placeholder:text-slate-200"
            placeholder={sourceLang === 'English' ? "Type in English..." : "Nhập tiếng Việt..."}
            value={inputText}
            onChange={e => { setInputText(e.target.value); setShowSavePanel(false); if (translatedText.includes('thất bại')) setTranslatedText(''); }}
          />
          <div className="p-6 flex items-center justify-between border-t border-slate-50 bg-slate-50/30">
            <button onClick={() => speak(inputText, sourceLang === 'English' ? 'en-US' : 'vi-VN')} className="p-2.5 text-slate-400 hover:text-primary transition-all"><Volume2 className="w-5 h-5" /></button>
            <button onClick={handleTranslate} disabled={isTranslating || !inputText.trim() || cooldown > 0}
                className={cn("px-8 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 transition-all shadow-xl",
                  cooldown > 0 ? "bg-slate-200 text-slate-400" : "bg-slate-900 text-white hover:scale-105 active:scale-95"
                )}>
                {isTranslating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {isTranslating ? 'Đang dịch...' : 'Dịch Ngay'}
            </button>
            <button onClick={() => { setInputText(''); setTranslatedText(''); setShowSavePanel(false); }} className="p-2.5 text-slate-300 hover:text-rose-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Output */}
        <div className="premium-card p-0 flex flex-col bg-white border-primary/5 shadow-2xl relative h-[400px]">
          <div className="flex-1 p-8 overflow-y-auto">
            {isTranslating ? (
              <div className="h-full flex flex-col items-center justify-center gap-4 text-slate-300">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                <p className="text-xs font-black uppercase tracking-widest animate-pulse">EngBot đang nghĩ...</p>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="text-3xl font-black text-slate-800 leading-tight">
                  {translatedText || <span className="text-slate-200 font-medium italic">Kết quả dịch...</span>}
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
                      Bạn đang dịch cụm từ hoặc câu. Hệ thống chỉ cho phép lưu **từ vựng đơn lẻ** vào Notebook để đảm bảo hiệu quả ôn tập.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <div className="flex gap-2">
              <button onClick={() => speak(translatedText, targetLang === 'Vietnamese' ? 'vi-VN' : 'en-US')} className="p-2 text-slate-400 hover:text-primary transition-all"><Volume2 className="w-5 h-5" /></button>
              <button onClick={() => { navigator.clipboard.writeText(translatedText); setCopied(true); setTimeout(()=>setCopied(false),2000); }} 
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
