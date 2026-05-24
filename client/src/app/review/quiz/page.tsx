'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookMarked, ArrowLeft, Loader2, Sparkles, CheckCircle2, XCircle, Brain, ChevronRight, Trophy, RotateCcw } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ReviewWord {
  wordId: string;
  word: string;
  phonetic?: string;
  meaningVi: string;
  meaningEn: string;
  context?: string;
  question: string;
  options: string[];
}

export default function ReviewPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [words, setWords] = useState<ReviewWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      if (!user) return;
      try {
        const token = await user.getIdToken();
        const res = await fetch(`${API_BASE}/vocabulary/review/session`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setWords(data.words || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, [user]);

  const currentWord = words[currentIndex];

  const handleSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const handleSubmit = async () => {
    if (!selectedOption || !user) return;
    setIsAnswered(true);
    
    const isCorrect = selectedOption?.trim().toLowerCase() === currentWord.meaningVi?.trim().toLowerCase();
    if (isCorrect) setScore(s => s + 1);

    setSubmitting(true);
    try {
      const token = await user.getIdToken();
      await fetch(`${API_BASE}/vocabulary/review/submit`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ 
          wordId: currentWord.wordId,
          isCorrect 
        })
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setCompleted(true);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
      <Loader2 className="w-12 h-12 animate-spin text-primary" />
      <p className="font-black text-slate-400 uppercase tracking-widest animate-pulse text-sm">Chuẩn bị bài tập ôn tập...</p>
    </div>
  );

  if (words.length === 0) return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-6">
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500">
        <CheckCircle2 className="w-10 h-10" />
      </div>
      <div>
        <h1 className="text-2xl font-black">Tuyệt vời! Bạn đã hoàn thành hết bài tập</h1>
        <p className="text-slate-500 mt-2">Hôm nay không còn từ vựng nào cần ôn tập. Hãy quay lại vào ngày mai nhé!</p>
      </div>
      <button onClick={() => router.push('/review')} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-xl hover:scale-105 transition-all flex items-center gap-2">
        <ArrowLeft className="w-5 h-5" /> Quay lại Dashboard
      </button>
    </div>
  );

  if (completed) return (
    <div className="max-w-md mx-auto space-y-8 py-10 animate-in zoom-in-95 duration-500">
      <div className="premium-card p-10 text-center space-y-6 bg-gradient-to-b from-white to-primary/5">
        <div className="relative inline-block">
          <Trophy className="w-20 h-20 text-yellow-400 mx-auto drop-shadow-xl" />
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 bg-primary text-white text-xs font-black px-2 py-1 rounded-full shadow-lg">+{score * 10} XP</motion.div>
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-800">Hoàn thành!</h2>
          <p className="text-slate-500 font-medium mt-1">Bạn đã ôn tập được {words.length} từ vựng</p>
        </div>
        <div className="flex justify-center gap-4 py-4">
          <div className="text-center">
            <p className="text-3xl font-black text-primary">{score}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Đúng</p>
          </div>
          <div className="w-px h-10 bg-slate-100" />
          <div className="text-center">
            <p className="text-3xl font-black text-slate-300">{words.length - score}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sai</p>
          </div>
        </div>
        <div className="space-y-3 pt-4">
          <button onClick={() => router.push('/review')} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm shadow-xl hover:scale-[1.02] active:scale-95 transition-all">TIẾP TỤC HỌC</button>
          <button onClick={() => window.location.reload()} className="w-full py-4 bg-white border-2 border-slate-100 text-slate-600 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
            <RotateCcw className="w-4 h-4" /> ÔN LẠI LẦN NỮA
          </button>
        </div>
      </div>
    </div>
  );

  const progress = ((currentIndex + 1) / words.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={() => router.push('/review')} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 px-8">
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-primary to-indigo-500 rounded-full" 
            />
          </div>
        </div>
        <div className="text-sm font-black text-slate-400 font-mono">{currentIndex + 1}/{words.length}</div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIndex}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          className="space-y-8"
        >
          {/* Question Card */}
          <div className="premium-card p-10 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Brain className="w-32 h-32" />
            </div>

            <div className="space-y-4 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full">
                <Sparkles className="w-4 h-4 fill-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest">{currentWord.context ? 'Đọc ngữ cảnh & chọn đáp án' : 'Chọn nghĩa đúng'}</span>
              </div>
              {currentWord.context && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Ngữ cảnh tiếng Anh</p>
                  <p className="text-lg font-semibold text-slate-700 leading-relaxed italic">
                    {currentWord.context}
                  </p>
                </div>
              )}
              <h2 className="text-xl font-bold text-slate-800 leading-relaxed">
                {currentWord.question}
              </h2>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-4">
              {currentWord.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(option)}
                  disabled={isAnswered}
                  className={cn(
                    "p-5 rounded-2xl border-2 text-left transition-all duration-300 font-bold flex items-center justify-between group",
                    selectedOption === option 
                      ? "border-primary bg-primary/5 ring-4 ring-primary/10" 
                      : "border-slate-100 hover:border-primary/30 hover:bg-slate-50",
                    isAnswered && option?.trim().toLowerCase() === currentWord.meaningVi?.trim().toLowerCase() && "border-green-500 bg-green-50 text-green-700",
                    isAnswered && selectedOption === option && option?.trim().toLowerCase() !== currentWord.meaningVi?.trim().toLowerCase() && "border-rose-500 bg-rose-50 text-rose-700"
                  )}
                >
                  <span>{option}</span>
                  {isAnswered && option?.trim().toLowerCase() === currentWord.meaningVi?.trim().toLowerCase() && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                  {isAnswered && selectedOption === option && option?.trim().toLowerCase() !== currentWord.meaningVi?.trim().toLowerCase() && <XCircle className="w-5 h-5 text-rose-500" />}
                </button>
              ))}
            </div>

            {/* Hint / Explanation after answer */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="pt-6 border-t border-slate-100 space-y-2"
                >
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Giải thích từ vựng</p>
                  <div className="flex items-center gap-3">
                    <div className="text-xl font-black text-slate-900">{currentWord.word}</div>
                    <div className="text-sm font-mono text-slate-400">{currentWord.phonetic}</div>
                  </div>
                  <p className="text-sm text-slate-600 font-medium">{currentWord.meaningEn}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Footer */}
          <div className="flex gap-4">
            {!isAnswered ? (
              <button 
                onClick={handleSubmit}
                disabled={!selectedOption || submitting}
                className={cn(
                  "flex-1 py-5 rounded-2xl font-black text-sm shadow-xl transition-all flex items-center justify-center gap-2",
                  selectedOption ? "bg-slate-900 text-white hover:scale-[1.02]" : "bg-slate-100 text-slate-300 cursor-not-allowed"
                )}
              >
                KIỂM TRA
              </button>
            ) : (
              <button 
                onClick={nextQuestion}
                className="flex-1 py-5 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                CÂU TIẾP THEO <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
