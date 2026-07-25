'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Timer, Award, Play, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SPEEDRUN_QUIZZES } from './tenses-data';

// ─── Fisher-Yates shuffle — O(n), unbiased ────────────────────
function fisherYatesShuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── AudioContext singleton — reuse one context ────────────────
let sharedAudioCtx: AudioContext | null = null;
function getAudioCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtxClass) return null;
    if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
      sharedAudioCtx = new AudioCtxClass();
    }
    // Resume if suspended (browser autoplay policy)
    if (sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume();
    }
    return sharedAudioCtx;
  } catch {
    return null;
  }
}

function playSoundEffect(type: 'correct' | 'incorrect' | 'gameover') {
  const ctx = getAudioCtx();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'correct') {
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'incorrect') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(250, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(120, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'gameover') {
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(150, ctx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    }
  } catch (e) {
    console.warn("Failed to play dynamic audio synthesize:", e);
  }
}

export default function SpeedrunTab() {
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [gameTime, setGameTime] = useState<number>(30);
  const [gameScore, setGameScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [lastScore, setLastScore] = useState<number | null>(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerFeedback, setAnswerFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [shuffledQuizzes, setShuffledQuizzes] = useState<typeof SPEEDRUN_QUIZZES>([]);

  const gameTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Persistence for high score
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedScore = localStorage.getItem('tense_speedrun_highscore');
      if (savedScore) setHighScore(Number(savedScore));
    }
  }, []);

  // Timer loop for Speedrun Game
  useEffect(() => {
    if (gameActive) {
      gameTimerRef.current = setInterval(() => {
        setGameTime(prev => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    };
  }, [gameActive]);

  // End game — stable ref via useCallback
  const endGame = useCallback(() => {
    setGameActive(false);
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    playSoundEffect('gameover');
    setLastScore(prev => {
      // We read gameScore from the functional update to avoid stale closure
      return null; // placeholder, will be set below
    });
    // Use a small trick: read current gameScore via ref-like pattern
    setGameScore(currentScore => {
      setLastScore(currentScore);
      setHighScore(prev => {
        const nextScore = Math.max(prev, currentScore);
        localStorage.setItem('tense_speedrun_highscore', String(nextScore));
        return nextScore;
      });
      return currentScore; // don't change gameScore
    });
  }, []);

  // End game detector when gameTime hits 0
  useEffect(() => {
    if (gameActive && gameTime <= 0) {
      endGame();
    }
  }, [gameTime, gameActive, endGame]);

  // Start Speedrun Game
  const startGame = () => {
    setShuffledQuizzes(fisherYatesShuffle(SPEEDRUN_QUIZZES));
    setCurrentQuizIndex(0);
    setGameScore(0);
    setGameTime(30);
    setSelectedAnswer(null);
    setAnswerFeedback(null);
    setLastScore(null);
    setGameActive(true);
  };

  // Handle Answer in Speedrun Game
  const handleAnswerSubmit = (option: string) => {
    if (selectedAnswer || !gameActive) return;
    setSelectedAnswer(option);
    const currentQuiz = shuffledQuizzes[currentQuizIndex];
    
    if (option === currentQuiz.answer) {
      setAnswerFeedback('correct');
      setGameScore(prev => prev + 10);
      setGameTime(prev => prev + 3); // Add 3 seconds
      playSoundEffect('correct');
    } else {
      setAnswerFeedback('incorrect');
      setGameTime(prev => Math.max(0, prev - 5)); // Subtract 5 seconds
      playSoundEffect('incorrect');
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setAnswerFeedback(null);
      if (currentQuizIndex < shuffledQuizzes.length - 1) {
        setCurrentQuizIndex(prev => prev + 1);
      } else {
        setShuffledQuizzes(fisherYatesShuffle(SPEEDRUN_QUIZZES));
        setCurrentQuizIndex(0);
      }
    }, 1550);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8 relative overflow-hidden">
        {/* Background design */}
        <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        {!gameActive ? (
          lastScore !== null ? (
            // Results screen
            <div className="text-center space-y-6 py-6 relative z-10">
              <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto shadow-md">
                <Award className="w-10 h-10 animate-bounce text-yellow-500 fill-yellow-500" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-slate-800">Kết Thúc Thử Thách!</h2>
                <p className="text-slate-500 text-sm">
                  Thời gian đã hết! Bạn đã hoàn thành xuất sắc thử thách phản xạ ngữ pháp.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-sm font-black">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center">
                  <span className="text-[10px] text-slate-400 uppercase">Điểm Vừa Đạt</span>
                  <span className="text-2xl font-black text-emerald-600 mt-1">{lastScore}đ</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center">
                  <span className="text-[10px] text-slate-400 uppercase">Kỷ Lục Cá Nhân</span>
                  <span className="text-2xl font-black text-amber-600 mt-1">{highScore}đ</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
                <button
                  onClick={startGame}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-indigo-650 hover:from-emerald-600 hover:to-indigo-700 text-white rounded-2xl font-black text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  CHƠI LẠI ⚡
                </button>
                <button
                  onClick={() => setLastScore(null)}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-black text-sm transition-all active:scale-95 cursor-pointer"
                >
                  QUAY LẠI
                </button>
              </div>
            </div>
          ) : (
            // Start screen
            <div className="text-center space-y-6 py-6 relative z-10">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-md">
                <Timer className="w-10 h-10 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-slate-800">Tense Speedrun ⚡ (12 Thì)</h2>
                <p className="text-slate-500 text-sm max-w-md mx-auto">
                  Thử thách phản xạ chia động từ nhanh trong vòng 30 giây. Mỗi câu đúng cộng 3 giây, câu sai bị trừ 5 giây. Đạt điểm cao nhất có thể!
                </p>
              </div>

              <div className="flex justify-center gap-6 text-sm font-black text-slate-700">
                <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  Kỷ Lục: <span className="text-emerald-600 text-lg font-black">{highScore}đ</span>
                </div>
              </div>

              <button
                onClick={startGame}
                className="px-10 py-3.5 bg-gradient-to-r from-emerald-500 to-indigo-650 hover:from-emerald-600 hover:to-indigo-700 text-white rounded-2xl font-black text-sm shadow-lg shadow-emerald-500/10 flex items-center gap-2 mx-auto transition-transform active:scale-95 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                BẮT ĐẦU CHƠI NGAY
              </button>
            </div>
          )
        ) : (
          // Game playing screen
          <div className="space-y-6 relative z-10">
            {/* Stats Header bar */}
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <Timer className={cn("w-5 h-5", gameTime <= 10 ? "text-rose-500 animate-bounce" : "text-emerald-500")} />
                <span className={cn("text-lg font-black tabular-nums", gameTime <= 10 ? "text-rose-500" : "text-slate-700")}>
                  {gameTime} giây
                </span>
              </div>
              <div className="text-slate-600 font-bold text-sm">
                Câu số: <span className="text-slate-800 font-black">{currentQuizIndex + 1}</span>
              </div>
              <div className="text-sm font-black text-emerald-600">
                Điểm: <span className="text-lg font-black">{gameScore}đ</span>
              </div>
            </div>

            {/* Progress bar timer */}
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full transition-all duration-1000",
                  gameTime <= 10 ? "bg-rose-500" : "bg-emerald-500"
                )}
                style={{ width: `${(gameTime / 45) * 100}%` }}
              />
            </div>

            {/* Question panel */}
            <div className="bg-slate-50 border border-slate-150 p-6 rounded-2xl text-center min-h-[100px] flex items-center justify-center">
              <p className="text-lg font-bold text-slate-800 tracking-wide select-none">
                {shuffledQuizzes[currentQuizIndex]?.question}
              </p>
            </div>

            {/* Answer Buttons options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {shuffledQuizzes[currentQuizIndex]?.options.map(option => {
                const isSelected = selectedAnswer === option;
                const isCorrectOption = option === shuffledQuizzes[currentQuizIndex].answer;
                
                return (
                  <button
                    key={option}
                    onClick={() => handleAnswerSubmit(option)}
                    disabled={selectedAnswer !== null}
                    className={cn(
                      "p-4 rounded-2xl border-2 text-center text-sm font-bold transition-all active:scale-95",
                      selectedAnswer === null
                        ? "bg-white border-slate-100 hover:border-emerald-500 hover:bg-emerald-50/10 text-slate-700"
                        : isSelected && answerFeedback === 'correct'
                        ? "bg-green-50 border-green-500 text-green-700 scale-[1.02]"
                        : isSelected && answerFeedback === 'incorrect'
                        ? "bg-rose-50 border-rose-500 text-rose-700 scale-[0.98]"
                        : isCorrectOption && selectedAnswer !== null
                        ? "bg-green-50 border-green-400 text-green-700"
                        : "bg-white border-slate-50 text-slate-400 opacity-40"
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Feedback Panel */}
            {answerFeedback && (
              <div className={cn(
                "p-4 rounded-2xl text-center font-black animate-in zoom-in duration-300",
                answerFeedback === 'correct' ? "bg-green-50 text-green-700" : "bg-rose-50 text-rose-700"
              )}>
                {answerFeedback === 'correct' ? (
                  <span>+10 Điểm · Đúng Rồi! (+3s) 🎉</span>
                ) : (
                  <div className="space-y-1">
                    <span>Sai Rồi (-5s) ❌</span>
                    <p className="text-xs font-semibold text-rose-600/80 leading-normal italic">
                      Đáp án đúng là &quot;{shuffledQuizzes[currentQuizIndex]?.answer}&quot;. {shuffledQuizzes[currentQuizIndex]?.explanation}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
