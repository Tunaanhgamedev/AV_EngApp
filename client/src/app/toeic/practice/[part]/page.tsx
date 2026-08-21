'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import {
  GraduationCap, Headphones, BookOpen, Clock, Target, ChevronRight,
  Sparkles, Brain, ArrowLeft, Loader2, Award, CheckCircle2, XCircle,
  HelpCircle, ChevronDown, ChevronUp, Star, Lightbulb, Play, Volume2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { getToeicPractice, submitToeicPractice } from '@/services/toeic.service';
import { playAudioText, stopAudio } from '@/lib/ttsService';

interface Question {
  id: string;
  audioDescription?: string;
  context?: string;
  questionText: string;
  choices: string[];
  correctAnswer: string;
  explanation: string;
}

function TOEICPracticeContent() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const partStr = params.part as string; // 'part1' to 'part7'
  const partNum = parseInt(partStr.replace('part', ''));
  const mode = searchParams.get('mode') || 'standard';

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [scoreReport, setScoreReport] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [revealedExplanation, setRevealedExplanation] = useState<Record<string, boolean>>({});
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handleSpeak = (text: string, id: string) => {
    if (playingId === id) {
      stopAudio();
      setPlayingId(null);
      return;
    }
    setPlayingId(id);
    playAudioText(text, {
      rate: 0.85,
      onEnd: () => setPlayingId(null),
      onError: () => setPlayingId(null)
    });
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const token = user ? await user.getIdToken() : undefined;
        const data = await getToeicPractice(partNum, token, mode);
        if (data && data.questions) {
          setQuestions(data.questions);
        }
      } catch (err) {
        console.error('Error fetching questions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [user, partNum, mode]);

  const handleSelectAnswer = (questionId: string, answer: string) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = async () => {
    if (submitted || submitting) return;
    setSubmitting(true);

    let correctCount = 0;
    questions.forEach(q => {
      const selected = selectedAnswers[q.id]?.charAt(0); // get 'A', 'B', 'C', or 'D'
      if (selected === q.correctAnswer) {
        correctCount++;
      }
    });

    const xpEarned = correctCount * 10;

    try {
      const token = user ? await user.getIdToken() : undefined;
      const response = await submitToeicPractice({
        userId: user?.uid || '',
        part: partNum,
        correctCount,
        totalQuestions: questions.length,
        details: {
          selectedAnswers,
          questions
        }
      }, token);

      setScoreReport({
        correctCount,
        totalQuestions: questions.length,
        xpEarned,
        score: Math.round((correctCount / questions.length) * 990)
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting test:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleExplanation = (questionId: string) => {
    setRevealedExplanation(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-slate-500 font-bold animate-pulse">EngBot đang biên soạn đề thi TOEIC Part {partNum}...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <HelpCircle className="w-16 h-16 text-slate-400" />
        <p className="text-slate-600 font-bold">Không thể tải được đề thi lúc này. Hãy thử lại sau.</p>
        <button onClick={() => router.push('/toeic')} className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold">
          Quay lại TOEIC Center
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push('/toeic')}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại TOEIC Center
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
          <GraduationCap className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Part {partNum} Practice</span>
        </div>
      </div>

      {/* Score Dashboard when submitted */}
      {submitted && scoreReport && (
        <section className="premium-card p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-xl rounded-3xl animate-in slide-in-from-top duration-500">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex flex-col items-center justify-center text-white shadow-lg flex-shrink-0">
              <span className="text-3xl font-black">{scoreReport.score}</span>
              <span className="text-[9px] font-bold uppercase tracking-wider opacity-80">Điểm quy đổi</span>
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-slate-800 flex items-center justify-center md:justify-start gap-2">
                  <Award className="w-6 h-6 text-indigo-600" /> Kết quả luyện tập Part {partNum}
                </h2>
                <p className="text-slate-500 font-bold">Làm đúng {scoreReport.correctCount}/{scoreReport.totalQuestions} câu hỏi</p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-2xl text-xs font-black flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> +{scoreReport.xpEarned} XP
                </div>
                <div className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-2xl text-xs font-black flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> Hoàn thành
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Questions Sheet */}
      <div className="space-y-8">
        {questions.map((q, idx) => {
          const selected = selectedAnswers[q.id];
          const isCorrect = selected?.charAt(0) === q.correctAnswer;
          const showExplanation = revealedExplanation[q.id] || submitted;

          return (
            <div key={q.id} className="premium-card p-6 md:p-8 space-y-6">
              {/* Question Index Badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Câu {idx + 1}</span>
                {submitted && (
                  <span className={cn(
                    "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider",
                    isCorrect ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                  )}>
                    {isCorrect ? (
                      <><CheckCircle2 className="w-4 h-4" /> Đúng</>
                    ) : (
                      <><XCircle className="w-4 h-4" /> Sai</>
                    )}
                  </span>
                )}
              </div>

              {/* Listening Part description or context */}
              {q.audioDescription && (
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest">
                      <Headphones className="w-4 h-4 text-primary" /> Audio Simulation Script
                    </div>
                    <button
                      onClick={() => handleSpeak(q.audioDescription || '', q.id)}
                      className={cn(
                        "px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 text-xs font-black uppercase tracking-wider",
                        playingId === q.id 
                          ? "bg-rose-100 text-rose-700 animate-pulse border border-rose-200" 
                          : "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
                      )}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      {playingId === q.id ? "Đang phát..." : "Nghe âm thanh"}
                    </button>
                  </div>
                  <p className="text-slate-700 italic font-medium">{q.audioDescription}</p>
                </div>
              )}

              {/* Reading Passage Context */}
              {q.context && (
                <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest">
                      <BookOpen className="w-4 h-4 text-emerald-600" /> Passage / Dialogue Context
                    </div>
                    {partNum <= 4 && (
                      <button
                        onClick={() => handleSpeak(q.context || '', q.id + '-context')}
                        className={cn(
                          "px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 text-xs font-black uppercase tracking-wider",
                          playingId === q.id + '-context'
                            ? "bg-rose-100 text-rose-700 animate-pulse border border-rose-200" 
                            : "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
                        )}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        {playingId === q.id + '-context' ? "Đang phát..." : "Nghe hội thoại"}
                      </button>
                    )}
                  </div>
                  <p className="text-slate-800 font-medium whitespace-pre-line leading-relaxed">{q.context}</p>
                </div>
              )}

              {/* Question Text */}
              {q.questionText && (
                <p className="text-lg font-black text-slate-800 leading-tight">{q.questionText}</p>
              )}

              {/* Choices */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {q.choices.map(choice => {
                  const choiceChar = choice.trim().charAt(0); // 'A', 'B', 'C', or 'D'
                  const isSelected = selected === choice;
                  const isChoiceCorrect = choiceChar === q.correctAnswer;

                  return (
                    <button
                      key={choice}
                      disabled={submitted}
                      onClick={() => handleSelectAnswer(q.id, choice)}
                      className={cn(
                        "p-4 rounded-2xl text-left border-2 font-bold text-sm transition-all flex items-center justify-between",
                        !submitted && isSelected && "border-primary bg-primary/5 text-primary",
                        !submitted && !isSelected && "border-slate-100 bg-slate-50 hover:bg-slate-100 hover:border-slate-200 text-slate-700",
                        submitted && isChoiceCorrect && "border-emerald-500 bg-emerald-50 text-emerald-700",
                        submitted && isSelected && !isChoiceCorrect && "border-rose-500 bg-rose-50 text-rose-700",
                        submitted && !isChoiceCorrect && !isSelected && "border-slate-100 bg-slate-50 opacity-60 text-slate-400"
                      )}
                    >
                      <span>{choice}</span>
                      {!submitted && isSelected && <CheckCircle2 className="w-5 h-5 text-primary" />}
                      {submitted && isChoiceCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                      {submitted && isSelected && !isChoiceCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
                    </button>
                  );
                })}
              </div>

              {/* Teacher Explanation Section */}
              {submitted && (
                <div className="border-t border-slate-100 pt-6">
                  <button
                    onClick={() => toggleExplanation(q.id)}
                    className="flex items-center justify-between w-full text-left font-black text-sm text-slate-600 hover:text-slate-800"
                  >
                    <span className="flex items-center gap-2"><Lightbulb className="w-4 h-4 text-amber-500" /> Lời giải thích từ Giáo viên</span>
                    {revealedExplanation[q.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {showExplanation && (
                    <div className="mt-4 p-4 bg-amber-50/50 border border-amber-100/50 rounded-2xl text-sm font-medium text-slate-600 leading-relaxed animate-in fade-in duration-300">
                      <strong className="text-emerald-700 block mb-1">Đáp án đúng: {q.correctAnswer}</strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="flex justify-end gap-4">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={submitting || Object.keys(selectedAnswers).length < questions.length}
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-sm hover:opacity-90 transition-all shadow-xl shadow-blue-500/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
            NỘP BÀI CHẤM ĐIỂM
          </button>
        ) : (
          <button
            onClick={() => router.push('/toeic')}
            className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            HOÀN THÀNH LUYỆN TẬP
          </button>
        )}
      </div>
    </div>
  );
}

export default function TOEICPracticePage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-slate-500 font-bold">Đang tải câu hỏi luyện tập...</p>
      </div>
    }>
      <TOEICPracticeContent />
    </React.Suspense>
  );
}
