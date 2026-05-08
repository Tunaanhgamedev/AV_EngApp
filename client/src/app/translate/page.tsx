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

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setIsTranslating(true);
    try {
      const response = await fetch('http://localhost:5000/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: inputText, 
          targetLang: targetLang 
        }),
      });
      const data = await response.json();
      setTranslatedText(data.translation);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTranslating(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputText.length > 3) handleTranslate();
    }, 1000);
    return () => clearTimeout(timer);
  }, [inputText]);

  const swapLangs = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6 animate-in fade-in duration-700">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary rounded-2xl text-white shadow-lg shadow-primary/20">
            <Languages className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-800">AI Smart Translator</h1>
            <p className="text-slate-500 font-medium">Instant translation powered by <span className="text-primary font-bold">EngBot AI</span></p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 bg-white border rounded-xl hover:bg-slate-50 transition-all text-slate-400">
            <History className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Language Toggle Bar */}
      <div className="flex items-center justify-center gap-6">
        <div className="px-6 py-2 bg-white border rounded-full font-black text-sm text-slate-600 shadow-sm">
          {sourceLang}
        </div>
        <button 
          onClick={swapLangs}
          className="p-3 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-all shadow-md active:scale-95"
        >
          <ArrowRightLeft className="w-5 h-5" />
        </button>
        <div className="px-6 py-2 bg-white border rounded-full font-black text-sm text-slate-600 shadow-sm">
          {targetLang}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
        {/* Input Side */}
        <div className="premium-card p-0 flex flex-col relative group">
          <textarea 
            className="flex-1 p-8 bg-transparent border-none focus:ring-0 text-2xl font-medium resize-none placeholder:text-slate-200"
            placeholder="Type your text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="p-6 flex items-center justify-between border-t border-slate-50">
            <div className="flex gap-2">
              <button className="p-2 text-slate-300 hover:text-primary transition-all">
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            <button 
              onClick={() => setInputText('')}
              className="p-2 text-slate-200 hover:text-rose-500 transition-all"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
          {isTranslating && (
            <div className="absolute top-8 right-8">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </div>
          )}
        </div>

        {/* Output Side */}
        <div className="premium-card p-0 flex flex-col bg-slate-50/50 border-primary/10">
          <div className="flex-1 p-8 text-2xl font-bold text-primary/80 leading-relaxed overflow-y-auto">
            {translatedText || <span className="text-slate-200 font-medium">Translation will appear here...</span>}
          </div>
          <div className="p-6 flex items-center justify-between border-t border-slate-50">
            <div className="flex gap-2">
              <button className="p-2 text-slate-300 hover:text-primary transition-all">
                <Volume2 className="w-5 h-5" />
              </button>
              <button 
                onClick={() => copyToClipboard(translatedText)}
                className={cn(
                  "p-2 transition-all flex items-center gap-2",
                  copied ? "text-green-500" : "text-slate-300 hover:text-primary"
                )}
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-xl text-primary font-black text-[10px] uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              AI Corrected
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Sentences */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-400 text-sm uppercase tracking-widest flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Common Phrases
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
              onClick={() => setInputText(phrase)}
              className="px-5 py-3 bg-white border rounded-2xl text-sm font-bold text-slate-600 hover:border-primary hover:text-primary transition-all shadow-sm"
            >
              {phrase}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
