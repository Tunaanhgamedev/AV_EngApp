'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic2, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Volume2,
  Trophy,
  Waves,
  Zap,
  Loader2,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const PRACTICE_PHRASES = [
  { 
    id: 1, 
    text: "The quick brown fox jumps over the lazy dog.", 
    difficulty: "Beginner", 
    focus: "Fluency"
  },
  { 
    id: 2, 
    text: "Innovation distinguishes between a leader and a follower.", 
    difficulty: "Intermediate", 
    focus: "Pronunciation"
  },
  { 
    id: 3, 
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", 
    difficulty: "Advanced", 
    focus: "Intonation"
  }
];

export default function SpeakingPage() {
  const [currentPhrase, setCurrentPhrase] = useState(PRACTICE_PHRASES[0]);
  const [recognition, setRecognition] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [transcript, setTranscript] = useState('');
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).webkitSpeechRecognition) {
      const rec = new (window as any).webkitSpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) setTranscript(prev => prev + ' ' + finalTranscript);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      setRecognition(rec);
    }
  }, []);

  const startRecording = () => {
    if (!recognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    setTranscript('');
    setResults(null);
    setIsRecording(true);
    setTimer(0);
    recognition.start();
    timerRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (recognition) recognition.stop();
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    handleAnalyze();
  };

  const handleAnalyze = async () => {
    if (!transcript) return;
    setIsAnalyzing(true);
    try {
      const response = await fetch('http://localhost:5000/api/ai/analyze-speaking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          transcript, 
          targetText: currentPhrase.text 
        }),
      });
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-6 animate-in fade-in duration-700">
      <header className="text-center space-y-4">
        <div className="inline-flex p-3 bg-rose-100 rounded-2xl text-rose-500 mb-2">
          <Mic2 className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">AI Speaking Coach</h1>
        <p className="text-slate-500 max-w-lg mx-auto font-medium">
          Speak naturally and let <span className="text-primary font-bold">EngBot</span> analyze your pronunciation and fluency in real-time.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Practice Card */}
          <div className="premium-card p-10 flex flex-col items-center text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-6 left-6">
              <span className={cn(
                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                currentPhrase.difficulty === 'Beginner' ? "bg-green-50 text-green-600 border-green-100" :
                currentPhrase.difficulty === 'Intermediate' ? "bg-blue-50 text-blue-600 border-blue-100" :
                "bg-purple-50 text-purple-600 border-purple-100"
              )}>
                {currentPhrase.difficulty}
              </span>
            </div>

            <div className="space-y-4 max-w-2xl">
              <h2 className="text-3xl font-bold leading-tight text-slate-800">
                {currentPhrase.text}
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-slate-500 hover:text-primary transition-all mx-auto font-bold text-sm">
                <Volume2 className="w-4 h-4" />
                Listen to correct model
              </button>
            </div>

            {/* Visualizer / Recording UI */}
            <div className="w-full flex flex-col items-center py-10 space-y-8">
              {isRecording ? (
                <div className="flex items-center gap-1 h-16">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1.5 bg-primary rounded-full animate-wave" 
                      style={{ 
                        height: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.1}s` 
                      }} 
                    />
                  ))}
                </div>
              ) : (
                <div className="h-16 flex items-center justify-center">
                  <Waves className="w-10 h-10 text-slate-200" />
                </div>
              )}

              <div className="relative">
                {isRecording && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-primary font-black text-xl animate-pulse">
                    00:{timer < 10 ? `0${timer}` : timer}
                  </div>
                )}
                <button 
                  onClick={isRecording ? stopRecording : startRecording}
                  className={cn(
                    "w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl",
                    isRecording 
                      ? "bg-rose-500 text-white scale-110 shadow-rose-500/40" 
                      : "bg-primary text-white hover:scale-105 shadow-primary/40"
                  )}
                >
                  {isRecording ? (
                    <div className="w-8 h-8 bg-white rounded-sm animate-pulse" />
                  ) : (
                    <Mic2 className="w-10 h-10" />
                  )}
                </button>
              </div>

              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                {isRecording ? "Listening..." : "Tap to start speaking"}
              </p>
            </div>

            {transcript && (
              <div className="w-full p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-slate-500 italic">"{transcript}"</p>
              </div>
            )}
          </div>

          {/* Phrases Selection */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">More Practice Phrases</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PRACTICE_PHRASES.map((p) => (
                <button 
                  key={p.id}
                  onClick={() => setCurrentPhrase(p)}
                  className={cn(
                    "p-6 premium-card text-left transition-all group",
                    currentPhrase.id === p.id ? "border-primary bg-primary/5 shadow-lg" : "hover:border-slate-300"
                  )}
                >
                  <p className="font-bold text-slate-800 line-clamp-2 mb-2 group-hover:text-primary transition-colors">{p.text}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.difficulty}</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-all" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results / Feedback Sidebar */}
        <div className="space-y-6">
          {isAnalyzing ? (
            <div className="premium-card p-12 border-dashed flex flex-col items-center justify-center text-center space-y-6">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <div className="space-y-2">
                <h3 className="font-bold text-slate-800">EngBot is analyzing...</h3>
                <p className="text-xs text-slate-400">Comparing your speech with the model phrase.</p>
              </div>
            </div>
          ) : results ? (
            <div className="premium-card p-8 space-y-8 animate-in zoom-in-95 duration-500">
              <div className="text-center">
                <div className="inline-flex p-4 bg-yellow-400 rounded-full text-white mb-4 shadow-lg shadow-yellow-400/20">
                  <Trophy className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-black text-slate-800">{results.score}%</h3>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Overall Proficiency</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                    <span>Fluency</span>
                    <span className="text-primary">{results.fluency}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${results.fluency}%` }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                    <span>Pronunciation</span>
                    <span className="text-primary">{results.pronunciation}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${results.pronunciation}%` }} />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-2">AI Coach Tips</h4>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {results.feedback}
                </p>
              </div>

              <button 
                onClick={() => setResults(null)}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          ) : (
            <div className="premium-card p-8 border-dashed flex flex-col items-center justify-center text-center space-y-6">
              <div className="p-6 bg-slate-50 rounded-3xl">
                <Sparkles className="w-10 h-10 text-slate-300" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-400">Analysis Pending</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Finish your practice recording to see your fluency and pronunciation scores.
                </p>
              </div>
            </div>
          )}

          <div className="premium-card p-6 bg-slate-900 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                Speak Like a Native
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Practice these phrases 3 times each to earn a <span className="text-primary font-bold">100 XP bonus</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
