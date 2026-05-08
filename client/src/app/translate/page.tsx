'use client';

import React, { useState, useEffect } from 'react';
import { 
  Languages, 
  ArrowRightLeft, 
  Copy, 
  Volume2, 
  Sparkles, 
  RefreshCw,
  Loader2,
  Trash2,
  History,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TranslatePage() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [sourceLang, setSourceLang] = useState('English');
  const [targetLang, setTargetLang] = useState('Vietnamese');
  const [copied, setCopied] = useState(false);
  const [cache, setCache] = useState<Record<string, string>>({});
  const [cooldown, setCooldown] = useState(0);
  const [translationProvider, setTranslationProvider] = useState<'AI' | 'Fallback' | null>(null);

  // Countdown timer for cooldown
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => setCooldown(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  const handleTranslate = async () => {
    const textToTranslate = inputText.trim();
    if (!textToTranslate || isTranslating || cooldown > 0) return;

    // 1. Check Cache first (Brainstorming: Zero-waste strategy)
    const cacheKey = `${sourceLang}-${targetLang}-${textToTranslate}`;
    if (cache[cacheKey]) {
      setTranslatedText(cache[cacheKey]);
      return;
    }

    setIsTranslating(true);
    setTranslatedText(''); 
    try {
      const response = await fetch('http://localhost:5000/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: textToTranslate, 
          targetLang: targetLang 
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setTranslatedText(data.error || 'Dịch thất bại');
        setTranslationProvider(null);
        // 3. Set Cooldown on 429 (Frontend Design: Visual feedback)
        if (response.status === 429) setCooldown(30);
      } else {
        const result = data.translation;
        setTranslatedText(result);
        if (data.provider === 'AI (Gemini)') setTranslationProvider('AI');
        else if (data.provider === 'AI (Backup)') setTranslationProvider('AI');
        else setTranslationProvider('Fallback');
        // 2. Store in Cache (Debugging: Prevent repeated 429s)
        setCache(prev => ({ ...prev, [cacheKey]: result }));
      }
    } catch (err: any) {
      console.error(err);
      setTranslatedText('Lỗi kết nối máy chủ');
    } finally {
      setIsTranslating(false);
    }
  };

  // Manual trigger mode - auto-translate removed

  const swapLangs = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  const speak = (text: string, lang: string = 'en-US') => {
    if (!text || typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-primary to-indigo-600 rounded-2xl text-white shadow-xl shadow-primary/20">
            <Languages className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Nebula AI Translator</h1>
            <p className="text-slate-500 font-medium">Precision translation powered by <span className="text-primary font-bold">EngBot Intelligence</span></p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 bg-white/80 backdrop-blur-md border rounded-xl hover:bg-white transition-all text-slate-400 shadow-sm">
            <History className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Language Toggle Bar */}
      <div className="flex items-center justify-center gap-6">
        <div className="px-8 py-3 bg-white/80 backdrop-blur-md border border-slate-100 rounded-2xl font-black text-sm text-slate-600 shadow-sm min-w-[140px] text-center">
          {sourceLang}
        </div>
        <button 
          onClick={swapLangs}
          className="p-4 bg-primary text-white rounded-full hover:rotate-180 hover:scale-110 transition-all duration-500 shadow-lg shadow-primary/30 active:scale-95"
        >
          <ArrowRightLeft className="w-5 h-5" />
        </button>
        <div className="px-8 py-3 bg-white/80 backdrop-blur-md border border-slate-100 rounded-2xl font-black text-sm text-slate-600 shadow-sm min-w-[140px] text-center">
          {targetLang}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[520px]">
        {/* Input Side */}
        <div className="premium-card p-0 flex flex-col relative group overflow-hidden border-2 border-transparent focus-within:border-primary/20 transition-all duration-500">
          <textarea 
            className="flex-1 p-8 bg-transparent border-none focus:ring-0 text-2xl font-medium resize-none placeholder:text-slate-200"
            placeholder="What would you like to translate?"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              // Clear error if user starts typing again
              if (translatedText.includes('Rate limit') || translatedText.includes('thất bại')) {
                setTranslatedText('');
              }
            }}
          />
          
          {/* Magic Button Section */}
          <div className="absolute bottom-24 right-8 left-8 flex justify-center transition-all duration-500">
             {inputText.trim() && (
               <button 
                 onClick={handleTranslate}
                 disabled={isTranslating || cooldown > 0}
                 className={cn(
                   "group relative px-8 py-4 rounded-2xl font-bold flex items-center gap-3 overflow-hidden shadow-2xl transition-all",
                   cooldown > 0 ? "bg-slate-200 text-slate-500 cursor-not-allowed" : "bg-slate-900 text-white hover:scale-105 active:scale-95"
                 )}
               >
                 {cooldown === 0 && (
                   <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x" />
                 )}
                 <Sparkles className={cn("w-5 h-5 relative z-10", (isTranslating || cooldown > 0) && "animate-pulse")} />
                 <span className="relative z-10">
                   {isTranslating ? 'Consulting EngBot...' : 
                    cooldown > 0 ? `AI Resting (${cooldown}s)` : 'Magic Translate'}
                 </span>
               </button>
             )}
          </div>

          <div className="p-6 flex items-center justify-between border-t border-slate-50 bg-slate-50/30 backdrop-blur-sm">
            <div className="flex gap-2">
              <button 
                onClick={() => speak(inputText)}
                className="p-2.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
              {inputText.length} characters
            </div>
            <button 
              onClick={() => setInputText('')}
              className="p-2.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Output Side */}
        <div className="premium-card p-0 flex flex-col bg-gradient-to-br from-white to-slate-50 border-primary/10 shadow-2xl shadow-primary/5 relative">
          <div className="flex-1 p-8 text-2xl font-bold leading-relaxed overflow-y-auto">
            {isTranslating ? (
              <div className="h-full flex flex-col items-center justify-center gap-4 text-slate-300">
                <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
                <p className="text-sm font-black uppercase tracking-widest animate-pulse">Nebula is thinking...</p>
              </div>
            ) : translatedText.includes('Failed') || translatedText.includes('thất bại') ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="p-4 bg-rose-50 text-rose-500 rounded-full">
                  <RefreshCw className="w-8 h-8 animate-spin-slow" />
                </div>
                <div>
                  <h4 className="text-slate-800 text-lg font-black">Translation Encountered a Hitch</h4>
                  <p className="text-slate-400 text-sm font-medium mt-1">AI is currently overwhelmed. Let's use the fallback.</p>
                </div>
                <a 
                  href={`https://translate.google.com/?sl=${sourceLang === 'English' ? 'en' : 'vi'}&tl=${targetLang === 'English' ? 'en' : 'vi'}&text=${encodeURIComponent(inputText)}&op=translate`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Languages className="w-5 h-5" />
                  Try Google Translate
                </a>
              </div>
            ) : (
              <div className="text-slate-800">
                {translatedText || <span className="text-slate-200 font-medium italic">Your AI translation will manifest here...</span>}
              </div>
            )}
          </div>

          <div className="p-6 flex items-center justify-between border-t border-slate-100 bg-white/50 backdrop-blur-sm">
            <div className="flex gap-2">
              <button 
                onClick={() => speak(translatedText, targetLang === 'Vietnamese' ? 'vi-VN' : 'en-US')}
                className="p-2.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
              >
                <Volume2 className="w-5 h-5" />
              </button>
              <button 
                onClick={() => copyToClipboard(translatedText)}
                className={cn(
                  "p-2.5 transition-all flex items-center gap-2 rounded-lg",
                  copied ? "text-green-500 bg-green-50" : "text-slate-400 hover:text-primary hover:bg-primary/5"
                )}
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <a 
                href={`https://translate.google.com/?sl=${sourceLang === 'English' ? 'en' : 'vi'}&tl=${targetLang === 'English' ? 'en' : 'vi'}&text=${encodeURIComponent(inputText)}&op=translate`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white hover:bg-black rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg"
              >
                Google Translate
              </a>
              {translationProvider === 'AI' ? (
                <div className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 animate-in fade-in zoom-in duration-300">
                  <Sparkles className="w-4 h-4" />
                  AI Corrected
                </div>
              ) : translationProvider === 'Fallback' ? (
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-amber-500/20 animate-in fade-in zoom-in duration-300">
                  <RefreshCw className="w-4 h-4" />
                  Community Fallback
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Sentences */}
      <div className="space-y-4">
        <h3 className="font-black text-slate-400 text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 px-2">
          <RefreshCw className="w-4 h-4" />
          Neural Suggestions
        </h3>
        <div className="flex flex-wrap gap-3">
          {[
            "How can I improve my English skills?",
            "What is the best way to learn new vocabulary?",
            "I would like to order a cup of coffee, please.",
            "Excuse me, could you tell me where the library is?",
            "The weather today is quite pleasant, isn't it?"
          ].map((phrase) => (
            <button 
              key={phrase}
              onClick={() => {
                setInputText(phrase);
              }}
              className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 hover:border-primary hover:text-primary hover:shadow-md hover:-translate-y-0.5 transition-all shadow-sm"
            >
              {phrase}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
