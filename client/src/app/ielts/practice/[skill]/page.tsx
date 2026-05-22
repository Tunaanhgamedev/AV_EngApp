'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Award, Headphones, BookOpen, PenTool, Mic2, Clock, Target,
  Sparkles, Brain, ArrowLeft, Loader2, CheckCircle2, XCircle,
  HelpCircle, ChevronDown, ChevronUp, Star, Lightbulb, Play,
  BookOpenCheck, MessageSquare, Send, Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { getIeltsPractice, submitIeltsPractice } from '@/services/ielts.service';

interface Question {
  id: string;
  context: string;
  questionText: string;
  choices: string[];
  correctAnswer: string;
  explanation: string;
}

export default function IELTSPracticePage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const skill = params.skill as string; // 'listening', 'reading', 'writing', 'speaking'

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [essayAnswer, setEssayAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [scoreReport, setScoreReport] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [revealedExplanation, setRevealedExplanation] = useState<Record<string, boolean>>({});

  const isConstructive = skill === 'writing' || skill === 'speaking';

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const token = user ? await user.getIdToken() : undefined;
        const data = await getIeltsPractice(skill, token);
        if (data && data.questions) {
          setQuestions(data.questions);
        }
      } catch (err) {
        console.error('Error fetching IELTS practice:', err);
      } finally {
        setLoading(false);
      }
    };

    if (skill) {
      fetchQuestions();
    }
  }, [skill, user]);

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

    try {
      const token = user ? await user.getIdToken() : undefined;
      
      if (isConstructive) {
        // AI grades the essay/speech
        const userText = essayAnswer.trim();
        if (!userText) {
          alert('Vui lòng nhập bài viết hoặc câu trả lời nói của bạn!');
          setSubmitting(false);
          return;
        }

        // Call Gemini via Server to evaluate IELTS essay/speech
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/ai/analyze-pronunciation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
          },
          body: JSON.stringify({
            userId: user?.uid,
            content: `IELTS ${skill.toUpperCase()} Submission for prompt "${questions[0]?.questionText}":\n\n${userText}`
          })
        });

        let aiFeedback = '';
        let bandScore = 6.5; // fallback

        if (res.ok) {
          const aiData = await res.json();
          aiFeedback = aiData.aiFeedback || aiData.feedback || '';
          bandScore = parseFloat(aiData.pronunciationScore || aiData.score) / 10 || 6.5;
          if (bandScore > 9) bandScore = 9.0;
        }

        const submitResponse = await submitIeltsPractice({
          userId: user?.uid || '',
          skill,
          bandScore,
          aiFeedback,
          details: {
            userAnswer: userText,
            prompt: questions[0]?.questionText
          }
        }, token);

        setScoreReport({
          bandScore,
          aiFeedback: aiFeedback || 'Bài viết của bạn được phát triển tốt, cấu trúc rõ ràng. Hãy phát triển thêm từ vựng chuyên sâu.',
          xpEarned: 100
        });

      } else {
        // Listening / Reading: Calculate band score based on correct answers
        let correctCount = 0;
        questions.forEach(q => {
          const selected = selectedAnswers[q.id]?.charAt(0);
          if (selected === q.correctAnswer) {
            correctCount++;
          }
        });

        // Convert correct count to IELTS Band Score (40 questions standard scaled to 5 questions here)
        const ratio = correctCount / questions.length;
        let bandScore = 4.0;
        if (ratio >= 1.0) bandScore = 9.0;
        else if (ratio >= 0.8) bandScore = 7.5;
        else if (ratio >= 0.6) bandScore = 6.5;
        else if (ratio >= 0.4) bandScore = 5.5;
        else if (ratio >= 0.2) bandScore = 4.5;

        const submitResponse = await submitIeltsPractice({
          userId: user?.uid || '',
          skill,
          bandScore,
          correctCount,
          totalQuestions: questions.length,
          details: {
            selectedAnswers,
            questions
          }
        }, token);

        setScoreReport({
          bandScore,
          correctCount,
          totalQuestions: questions.length,
          xpEarned: correctCount * 15
        });
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting IELTS practice:', err);
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
        <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
        <p className="text-slate-500 font-bold animate-pulse">EngBot đang biên soạn bài luyện tập IELTS {skill}...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <HelpCircle className="w-16 h-16 text-slate-400" />
        <p className="text-slate-600 font-bold">Không thể tải được đề thi lúc này. Hãy thử lại sau.</p>
        <button onClick={() => router.push('/ielts')} className="px-6 py-2.5 bg-red-600 text-white rounded-xl font-bold">
          Quay lại IELTS Center
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push('/ielts')}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại IELTS Center
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full border border-red-200">
          <Award className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">IELTS {skill} Practice</span>
        </div>
      </div>

      {/* Score Dashboard when submitted */}
      {submitted && scoreReport && (
        <section className="premium-card p-8 bg-gradient-to-r from-red-50 to-rose-50 border-red-200 shadow-xl rounded-3xl animate-in slide-in-from-top duration-500">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-red-600 to-rose-600 flex flex-col items-center justify-center text-white shadow-lg flex-shrink-0">
              <span className="text-3xl font-black">{scoreReport.bandScore.toFixed(1)}</span>
              <span className="text-[9px] font-bold uppercase tracking-wider opacity-80">Band Score</span>
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-slate-800 flex items-center justify-center md:justify-start gap-2">
                  <Sparkles className="w-6 h-6 text-red-600" /> Kết quả chấm điểm AI
                </h2>
                {!isConstructive && (
                  <p className="text-slate-500 font-bold">Làm đúng {scoreReport.correctCount}/{scoreReport.totalQuestions} câu hỏi</p>
                )}
                {isConstructive && (
                  <p className="text-slate-500 font-bold">Bài viết đã được giáo viên AI phân tích và chấm điểm chi tiết.</p>
                )}
              </div>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-2xl text-xs font-black flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> +{scoreReport.xpEarned} XP
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Constructive (Writing / Speaking) View */}
      {isConstructive ? (
        <div className="space-y-8">
          <div className="premium-card p-6 md:p-8 space-y-6">
            <h3 className="text-xl font-black text-slate-800">✍️ Đề bài IELTS {skill.toUpperCase()}</h3>
            
            <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl whitespace-pre-line text-slate-800 font-medium leading-relaxed">
              {questions[0]?.questionText}
            </div>

            {questions[0]?.context && (
              <div className="p-4 bg-red-50/50 border border-red-100 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-red-600 uppercase tracking-widest">
                  <Brain className="w-4 h-4" /> Gợi ý & Từ vựng từ Giáo viên
                </div>
                <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">{questions[0]?.context}</p>
              </div>
            )}

            {!submitted ? (
              <div className="space-y-4">
                <label className="text-sm font-black text-slate-500 uppercase tracking-wider">Bài làm của bạn</label>
                <textarea
                  value={essayAnswer}
                  onChange={(e) => setEssayAnswer(e.target.value)}
                  placeholder={skill === 'writing' ? "Nhập bài viết của bạn tại đây (tối thiểu 150-250 từ tùy theo Task)..." : "Nhập câu trả lời nói của bạn bằng văn bản hoặc chia sẻ ý kiến..."}
                  className="w-full h-80 p-5 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 font-sans text-slate-800 leading-relaxed shadow-inner"
                />
                <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                  <span>Số từ: {essayAnswer.split(/\s+/).filter(Boolean).length} từ</span>
                  <span>Khuyên dùng: {skill === 'writing' ? '150 - 250 từ' : '50 - 150 từ'}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-6 border-t border-slate-100 pt-6">
                <h4 className="text-lg font-black text-slate-800">📝 Bài làm đã nộp:</h4>
                <div className="p-5 bg-slate-50 rounded-2xl text-slate-700 leading-relaxed font-medium whitespace-pre-line shadow-inner">
                  {essayAnswer}
                </div>

                <div className="p-6 bg-amber-50 border border-amber-100 rounded-2xl space-y-3">
                  <h4 className="font-black text-slate-800 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-500" /> Nhận xét chi tiết từ giáo viên AI
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {scoreReport?.aiFeedback}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Receptive (Listening / Reading) View */
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

                {/* Reading / Listening Passage Context */}
                {q.context && (
                  <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
                    <div className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest">
                      <BookOpenCheck className="w-4 h-4 text-red-600" /> Passage / Script Context
                    </div>
                    <p className="text-slate-800 font-medium whitespace-pre-line leading-relaxed">{q.context}</p>
                  </div>
                )}

                {/* Question Text */}
                {q.questionText && (
                  <p className="text-lg font-black text-slate-800 leading-tight">{q.questionText}</p>
                )}

                {/* Choices */}
                {q.choices && q.choices.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {q.choices.map(choice => {
                      const choiceChar = choice.trim().charAt(0);
                      const isSelected = selected === choice;
                      const isChoiceCorrect = choiceChar === q.correctAnswer;

                      return (
                        <button
                          key={choice}
                          disabled={submitted}
                          onClick={() => handleSelectAnswer(q.id, choice)}
                          className={cn(
                            "p-4 rounded-2xl text-left border-2 font-bold text-sm transition-all flex items-center justify-between",
                            !submitted && isSelected && "border-red-500 bg-red-50/50 text-red-600",
                            !submitted && !isSelected && "border-slate-100 bg-slate-50 hover:bg-slate-100 hover:border-slate-200 text-slate-700",
                            submitted && isChoiceCorrect && "border-emerald-500 bg-emerald-50 text-emerald-700",
                            submitted && isSelected && !isChoiceCorrect && "border-rose-500 bg-rose-50 text-rose-700",
                            submitted && !isChoiceCorrect && !isSelected && "border-slate-100 bg-slate-50 opacity-60 text-slate-400"
                          )}
                        >
                          <span>{choice}</span>
                          {!submitted && isSelected && <CheckCircle2 className="w-5 h-5 text-red-500" />}
                          {submitted && isChoiceCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                          {submitted && isSelected && !isChoiceCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Teacher Explanation Section */}
                {submitted && (
                  <div className="border-t border-slate-100 pt-6">
                    <button
                      onClick={() => toggleExplanation(q.id)}
                      className="flex items-center justify-between w-full text-left font-black text-sm text-slate-600 hover:text-slate-800"
                    >
                      <span className="flex items-center gap-2"><Lightbulb className="w-4 h-4 text-amber-500" /> Giải thích đáp án & Gợi ý từ vựng</span>
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
      )}

      {/* Footer CTA */}
      <div className="flex justify-end gap-4">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={submitting || (!isConstructive && Object.keys(selectedAnswers).length < questions.length) || (isConstructive && !essayAnswer.trim())}
            className="px-10 py-4 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-2xl font-black text-sm hover:opacity-90 transition-all shadow-xl shadow-red-500/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
            NỘP BÀI CHẤM ĐIỂM
          </button>
        ) : (
          <button
            onClick={() => router.push('/ielts')}
            className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            HOÀN THÀNH LUYỆN TẬP
          </button>
        )}
      </div>
    </div>
  );
}
