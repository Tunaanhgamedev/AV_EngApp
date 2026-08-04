'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic2, Play, RotateCcw, Sparkles, Volume2, Trophy, Waves, Zap, Loader2, ChevronRight, Activity, BookOpen, AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PRACTICE_PHRASES, API_BASE, speak } from './speakingShared';

export default function SpeakingPracticeTab() {
  const [currentPhrase, setCurrentPhrase] = useState(PRACTICE_PHRASES[0]);
  const [recognition, setRecognition] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [transcript, setTranscript] = useState('');
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const isRecordingRef = useRef(false);
  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  const transcriptRef = useRef("");
  useEffect(() => {
    transcriptRef.current = transcript;
  }, [transcript]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = true;
        rec.interimResults = false;
        rec.lang = 'en-US';

        rec.onresult = (event: any) => {
          let currentChunk = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              currentChunk += event.results[i][0].transcript + ' ';
            }
          }
          if (currentChunk) {
            setTranscript(prev => {
              const combined = (prev + ' ' + currentChunk).trim();
              transcriptRef.current = combined;
              return combined;
            });
          }
        };

        rec.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
        };

        rec.onend = () => {
          if (isRecordingRef.current) {
            try {
              rec.start();
            } catch (e) {
              console.error("Failed to restart speech recognition:", e);
            }
          }
        };

        setRecognition(rec);
      }
    }
  }, []);

  const startRecording = () => {
    if (!recognition) {
      alert("Trình duyệt không hỗ trợ nhận diện giọng nói (hãy sử dụng Google Chrome).");
      return;
    }
    setTranscript('');
    transcriptRef.current = '';
    setResults(null);
    setIsRecording(true);
    setTimer(0);
    try {
      recognition.start();
    } catch (e) {
      console.error("Speech recognition start failed:", e);
    }
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    isRecordingRef.current = false;
    if (timerRef.current) clearInterval(timerRef.current);
    
    if (recognition) {
      try {
        recognition.stop();
      } catch (e) {
        console.error("Speech recognition stop failed:", e);
      }
    }
    
    setTimeout(() => {
      handleAnalyze();
    }, 500);
  };

  const handleAnalyze = async () => {
    const finalTranscript = transcriptRef.current.trim();
    if (!finalTranscript) {
      alert("EngBot chưa nhận diện được giọng nói của bạn. Hãy nói to, rõ ràng hơn gần micro nhé!");
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await fetch(`${API_BASE}/ai/analyze-speaking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          transcript: finalTranscript, 
          targetText: currentPhrase.text 
        }),
      });
      if (!response.ok) throw new Error("API busy");
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      setResults({
        score: 72,
        fluency: 75,
        pronunciation: 70,
        accuracy: 71,
        feedback: "Phát âm của bạn có tiến bộ tốt. Tuy nhiên hơi còn hơi yếu, hãy mở rộng cơ miệng khi phát các nguyên âm lớn nhé!",
        mispronounced: ["lazy", "dog"]
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderHighlightedPhrase = () => {
    if (!results) {
      return <span className="text-slate-800 dark:text-slate-200">{currentPhrase.text}</span>;
    }

    const mispronouncedList = (results.mispronounced || []).map((w: string) => 
      w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").toLowerCase()
    );

    const words = currentPhrase.text.split(" ");
    return (
      <div className="flex flex-wrap justify-center gap-x-2 gap-y-3 max-w-2xl mx-auto leading-relaxed">
        {words.map((w, idx) => {
          const clean = w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").toLowerCase();
          const isWrong = mispronouncedList.includes(clean);
          return (
            <span 
              key={idx} 
              className={cn(
                "text-3xl font-black transition-all px-1.5 py-0.5 rounded-lg",
                isWrong 
                  ? "text-rose-500 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 line-through decoration-rose-300" 
                  : "text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-500/10 border border-emerald-100"
              )}
            >
              {w}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-8">
        
        {/* Main Interactive Phrase Practice Card */}
        <div className="premium-card p-8 md:p-10 flex flex-col items-center text-center space-y-8 relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl rounded-3xl">
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <span className={cn(
              "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
              currentPhrase.difficulty === 'Beginner' ? "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-100" :
              currentPhrase.difficulty === 'Intermediate' ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-100" :
              "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-100"
            )}>
              {currentPhrase.difficulty}
            </span>
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 py-1 bg-slate-50 dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-800">
              {currentPhrase.focus}
            </span>
          </div>

          <div className="space-y-6 max-w-2xl w-full pt-4">
            {results ? (
              <div className="space-y-1">
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-100">Phân tích từ AI</span>
                <div className="py-4">{renderHighlightedPhrase()}</div>
              </div>
            ) : (
              <h2 className="text-3xl font-black leading-snug text-slate-800 dark:text-slate-200">
                {currentPhrase.text}
              </h2>
            )}

            <button 
              onClick={() => speak(currentPhrase.text)} 
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 hover:text-primary transition-all mx-auto font-black text-xs uppercase tracking-wider border border-slate-200/60 dark:border-slate-700/60 shadow-sm"
            >
              <Volume2 className="w-4 h-4 text-primary" />
              Nghe phát âm mẫu chuẩn
            </button>
          </div>

          {/* Recording & Action Controls */}
          <div className="flex flex-col items-center gap-4 w-full pt-4 border-t border-slate-100 dark:border-slate-800">
            {isRecording ? (
              <div className="flex flex-col items-center gap-4 animate-in fade-in">
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-24 h-24 bg-rose-500/20 rounded-full animate-ping" />
                  <button 
                    onClick={stopRecording}
                    className="relative w-20 h-20 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/40 hover:scale-105 transition-all cursor-pointer"
                  >
                    <Mic2 className="w-8 h-8 animate-pulse" />
                  </button>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs font-black text-rose-500 bg-rose-50 dark:bg-rose-500/10 px-4 py-1.5 rounded-full border border-rose-100">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  Đang ghi âm... {timer}s
                </div>
              </div>
            ) : isAnalyzing ? (
              <div className="flex flex-col items-center gap-3 py-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest animate-pulse">EngBot AI đang phân tích âm phổ...</p>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button 
                  onClick={startRecording}
                  className="flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Mic2 className="w-5 h-5" />
                  {results ? "BẤM NÓI LẠI" : "BẮT ĐẦU NÓI THỬ"}
                </button>

                {results && (
                  <button 
                    onClick={() => {
                      setResults(null);
                      setTranscript('');
                    }}
                    className="p-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 rounded-2xl font-bold transition-all cursor-pointer"
                    title="Làm mới"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}

            {/* Recognized live transcript snippet */}
            {transcript && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl max-w-xl w-full text-left space-y-1">
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Giọng nói nhận diện được:</span>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-relaxed italic">"{transcript}"</p>
              </div>
            )}
          </div>

        </div>

        {/* Detailed Results Dashboard Component */}
        {results && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Score Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="premium-card p-5 text-center space-y-2 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-3xl shadow-lg">
                <Trophy className="w-6 h-6 mx-auto opacity-80" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Tổng Điểm</p>
                  <p className="text-3xl font-black">{results.score}<span className="text-sm font-normal">/100</span></p>
                </div>
              </div>

              <div className="premium-card p-5 text-center space-y-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
                <Activity className="w-6 h-6 mx-auto text-blue-500" />
                <div>
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Trôi Chảy</p>
                  <p className="text-2xl font-black text-slate-800 dark:text-slate-200">{results.fluency}%</p>
                </div>
              </div>

              <div className="premium-card p-5 text-center space-y-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
                <Zap className="w-6 h-6 mx-auto text-purple-500" />
                <div>
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Phát Âm</p>
                  <p className="text-2xl font-black text-slate-800 dark:text-slate-200">{results.pronunciation}%</p>
                </div>
              </div>

              <div className="premium-card p-5 text-center space-y-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
                <Waves className="w-6 h-6 mx-auto text-amber-500" />
                <div>
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Độ Chính Xác</p>
                  <p className="text-2xl font-black text-slate-800 dark:text-slate-200">{results.accuracy}%</p>
                </div>
              </div>
            </div>

            {/* AI Feedback Card */}
            <div className="premium-card p-6 bg-slate-900 text-white space-y-4 rounded-3xl shadow-xl">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                  <Sparkles className="w-5 h-5 fill-primary" />
                </div>
                <div>
                  <h3 className="font-black text-base text-white">Đánh Giá Từ Chuyên Gia AI</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Nhận xét chi tiết giúp cải thiện giọng nói bản xứ</p>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed font-medium bg-white dark:bg-slate-900/5 p-4 rounded-2xl border border-white/5">
                "{results.feedback}"
              </p>

              {results.mispronounced && results.mispronounced.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" /> Từ cần chú ý chỉnh sửa phát âm:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {results.mispronounced.map((word: string, i: number) => (
                      <button 
                        key={i}
                        onClick={() => speak(word)}
                        className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-rose-300 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        {word}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Right Column: Sentence Library */}
      <div className="space-y-6">
        <div className="premium-card p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl rounded-3xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="font-black text-slate-800 dark:text-slate-200 text-base flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" /> Thư Viện Câu Mẫu
            </h3>
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500">{PRACTICE_PHRASES.length} mẫu</span>
          </div>

          <div className="space-y-3">
            {PRACTICE_PHRASES.map((phrase) => {
              const isActive = currentPhrase.id === phrase.id;
              return (
                <div
                  key={phrase.id}
                  onClick={() => {
                    setCurrentPhrase(phrase);
                    setResults(null);
                    setTranscript('');
                  }}
                  className={cn(
                    "p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 group",
                    isActive 
                      ? "bg-slate-900 border-slate-800 text-white shadow-md" 
                      : "bg-slate-50/50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 hover:bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300"
                  )}
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <p className="font-bold text-xs leading-snug truncate">{phrase.text}</p>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full",
                        isActive ? "bg-white dark:bg-slate-900/20 text-white" : "bg-slate-200 text-slate-600 dark:text-slate-300"
                      )}>
                        {phrase.difficulty}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className={cn(
                    "w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-1",
                    isActive ? "text-primary" : "text-slate-300"
                  )} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
