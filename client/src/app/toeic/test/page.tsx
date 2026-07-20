'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  GraduationCap, Headphones, BookOpen, Clock, Target, Play, Award,
  CheckCircle2, XCircle, AlertTriangle, ArrowLeft, ArrowRight, ShieldCheck,
  ChevronRight, Volume2, Info, Loader2, BarChart2
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getToeicPractice, submitToeicPractice } from '@/services/toeic.service';

interface Question {
  id: string;
  part: number;
  audioDescription?: string;
  context?: string;
  questionText: string;
  choices: string[];
  correctAnswer: string;
  explanation: string;
}

function TOEICFullTestContent() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'standard';
  const isMini = mode === 'mini';
  const initialTime = isMini ? 1800 : 3600;

  // Test State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({}); // { questionId: choiceLetter }
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Result state
  const [result, setResult] = useState<any>(null);

  // TTS Playing state
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Reset timer if mode changes
  useEffect(() => {
    setTimeLeft(isMini ? 1800 : 3600);
  }, [mode, isMini]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!loading && !isExamCompleted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [loading, isExamCompleted, timeLeft]);

  // Load TOEIC practice test by fetching all 7 parts in parallel
  useEffect(() => {
    async function loadFullTest() {
      try {
        setLoading(true);
        setError(null);
        
        const token = user ? await user.getIdToken() : undefined;
        // Fetch parts 1 to 7 concurrently with specific mode
        const fetchPromises = Array.from({ length: 7 }, (_, i) => getToeicPractice(i + 1, token, mode));
        const partsResults = await Promise.all(fetchPromises);
        
        // Consolidate questions
        const consolidatedQuestions: Question[] = [];
        partsResults.forEach((partData, idx) => {
          const partNum = idx + 1;
          if (partData && Array.isArray(partData.questions)) {
            partData.questions.forEach((q: any, qIdx: number) => {
              consolidatedQuestions.push({
                ...q,
                id: `p${partNum}-q${qIdx + 1}`,
                part: partNum
              });
            });
          }
        });

        if (consolidatedQuestions.length === 0) {
          throw new Error('Không lấy được câu hỏi nào từ AI. Vui lòng thử lại!');
        }

        setQuestions(consolidatedQuestions);
      } catch (err: any) {
        console.error('Failed to load TOEIC full test:', err);
        setError(err.message || 'Lỗi kết nối máy chủ. Vui lòng thử lại sau!');
      } finally {
        setLoading(false);
      }
    }
    loadFullTest();
  }, [user, mode]);

  const handleSelectAnswer = (choice: string) => {
    // Extract letter (A, B, C, D) from choice string like "A. text"
    const letter = choice.trim().charAt(0).toUpperCase();
    const currentQ = questions[currentIdx];
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: letter
    }));
  };

  const handleSpeak = (text: string, id: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (playingId === id) {
        setPlayingId(null);
        return;
      }
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);
      
      setPlayingId(id);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Trình duyệt của bạn không hỗ trợ đọc âm thanh tự động.');
    }
  };

  const handleSubmitTest = async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      let correctListening = 0;
      let totalListening = 0;
      let correctReading = 0;
      let totalReading = 0;

      const detailsList = questions.map((q) => {
        const userAnswer = answers[q.id] || '';
        const isCorrect = userAnswer === q.correctAnswer;
        
        if (q.part <= 4) {
          totalListening++;
          if (isCorrect) correctListening++;
        } else {
          totalReading++;
          if (isCorrect) correctReading++;
        }

        return {
          questionId: q.id,
          part: q.part,
          questionText: q.questionText,
          userAnswer,
          correctAnswer: q.correctAnswer,
          isCorrect,
          explanation: q.explanation,
          choices: q.choices,
          context: q.context,
          audioDescription: q.audioDescription
        };
      });

      const totalCorrect = correctListening + correctReading;
      const totalQuestionsCount = questions.length;

      // Scale score to TOEIC standard (max 495 for listening, max 495 for reading)
      const listeningScore = totalListening > 0 ? Math.round((correctListening / totalListening) * 495) : 0;
      const readingScore = totalReading > 0 ? Math.round((correctReading / totalReading) * 495) : 0;
      const totalScore = listeningScore + readingScore;

      const submissionData = {
        userId: user?.uid || 'anonymous',
        part: null, // null indicates full test
        correctCount: totalCorrect,
        totalQuestions: totalQuestionsCount,
        listeningScore,
        readingScore,
        totalScore,
        details: detailsList
      };

      const token = user ? await user.getIdToken() : undefined;
      const res = await submitToeicPractice(submissionData, token);
      setResult({
        ...submissionData,
        xpRewarded: res.xpRewarded || 200,
        correctListening,
        totalListening,
        correctReading,
        totalReading
      });
      setIsExamCompleted(true);
    } catch (err) {
      console.error('Submit TOEIC test error:', err);
      alert('Đã xảy ra lỗi khi nộp bài. Vui lòng kiểm tra kết nối mạng!');
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-800 animate-pulse">EngBot đang biên soạn đề thi...</h2>
          <p className="text-sm text-slate-500 font-medium max-w-sm">
            AI đang tải các câu hỏi thực tế của 7 Parts (Listening & Reading) để mô phỏng bài thi thực tế.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6 max-w-md mx-auto text-center px-4">
        <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-800">Không thể tải đề thi</h2>
          <p className="text-sm text-slate-500 font-medium">{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all w-full"
        >
          Thử tải lại đề thi
        </button>
        <button
          onClick={() => router.push('/toeic')}
          className="text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors"
        >
          Quay lại TOEIC Center
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];
  const userAns = answers[currentQuestion.id] || '';

  // Calculate stats per Part for Review screen
  const getPartStats = (part: number) => {
    if (!result) return { correct: 0, total: 0 };
    const partDetails = result.details.filter((d: any) => d.part === part);
    const correct = partDetails.filter((d: any) => d.isCorrect).length;
    return { correct, total: partDetails.length };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20 animate-in fade-in duration-500">
      {/* ──────────────────────────────────────────────────────── */}
      {/* 1. EXAM ENVIRONMENT VIEW                                */}
      {/* ──────────────────────────────────────────────────────── */}
      {!isExamCompleted ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          {/* Main Question Panel (Left 3 columns) */}
          <div className="md:col-span-3 space-y-6">
            {/* Header / Info bar */}
            <div className="premium-card p-4 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => {
                  if (confirm('Bạn có chắc muốn thoát bài thi? Kết quả sẽ không được lưu.')) {
                    router.push('/toeic');
                  }
                }}
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Thoát thi thử
              </button>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 text-blue-600 rounded-xl font-black text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(timeLeft)}</span>
                </div>
                <button
                  onClick={handleSubmitTest}
                  disabled={submitting}
                  className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl font-black text-xs hover:opacity-90 transition-all shadow-md shadow-red-500/10 flex items-center gap-1.5"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  NỘP BÀI THI
                </button>
              </div>
            </div>

            {/* Question Details */}
            <div className="premium-card p-6 md:p-8 space-y-6">
              {/* Part Indicator */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-wider">
                    Part {currentQuestion.part}
                  </span>
                  <h2 className="text-lg font-black text-slate-800 mt-2">
                    {currentQuestion.part === 1 && 'Mô tả hình ảnh (Photographs)'}
                    {currentQuestion.part === 2 && 'Hỏi - Đáp (Question - Response)'}
                    {currentQuestion.part === 3 && 'Đoạn hội thoại (Conversations)'}
                    {currentQuestion.part === 4 && 'Bài nói ngắn (Short Talks)'}
                    {currentQuestion.part === 5 && 'Điền vào chỗ trống (Incomplete Sentences)'}
                    {currentQuestion.part === 6 && 'Hoàn thành đoạn văn (Text Completion)'}
                    {currentQuestion.part === 7 && 'Đọc hiểu văn bản (Reading Comprehension)'}
                  </h2>
                </div>
                <span className="text-sm font-bold text-slate-400">
                  Câu {currentIdx + 1} / {questions.length}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Content Panel (Audio or Text) */}
              <div className="space-y-6">
                {/* Listening audio simulation */}
                {currentQuestion.part <= 4 && (currentQuestion.audioDescription || currentQuestion.context) && (
                  <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-primary">
                        <Headphones className="w-5 h-5" />
                        <span className="text-xs font-black uppercase tracking-wider">Listening Audio Simulator</span>
                      </div>
                      <button
                        onClick={() => handleSpeak(currentQuestion.audioDescription || currentQuestion.context || '', currentQuestion.id)}
                        className={`p-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                          playingId === currentQuestion.id
                            ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                            : 'bg-primary text-white shadow-lg shadow-primary/20 hover:opacity-90'
                        }`}
                      >
                        <Volume2 className="w-4 h-4" />
                        {playingId === currentQuestion.id ? 'DỪNG ĐỌC' : 'PLAY AUDIO'}
                      </button>
                    </div>

                    <div className="p-3 bg-white/70 backdrop-blur rounded-xl text-sm font-medium text-slate-600 border border-blue-50/50">
                      <p className="italic">
                        {currentQuestion.part === 1 || currentQuestion.part === 2
                          ? '[Bấm Play Audio để nghe mô tả hình ảnh hoặc câu hỏi phát biểu]'
                          : '[Bấm Play Audio để nghe đoạn hội thoại hoặc bài nói chuyện ngắn]'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Reading / Text Context */}
                {currentQuestion.part >= 6 && currentQuestion.context && (
                  <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                    <div className="flex items-center gap-2 text-slate-700 font-bold text-xs uppercase tracking-wider mb-2">
                      <BookOpen className="w-4.5 h-4.5 text-primary" />
                      <span>Reading Context / Passage</span>
                    </div>
                    <div className="text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-line">
                      {currentQuestion.context}
                    </div>
                  </div>
                )}

                {/* Question Prompt */}
                <div className="space-y-3">
                  <h3 className="text-base md:text-lg font-black text-slate-800 leading-relaxed">
                    {currentQuestion.questionText}
                  </h3>

                  {/* Multiple Choices */}
                  <div className="grid grid-cols-1 gap-3 pt-2">
                    {currentQuestion.choices.map((choice, i) => {
                      const letter = choice.trim().charAt(0).toUpperCase();
                      const isSelected = userAns === letter;
                      return (
                        <button
                          key={i}
                          onClick={() => handleSelectAnswer(choice)}
                          className={`w-full p-4 text-left rounded-xl border-2 font-medium text-sm transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-primary bg-primary/5 text-primary font-bold shadow-md shadow-primary/5'
                              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span>{choice}</span>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Nav actions */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                <button
                  onClick={() => setCurrentIdx((p) => Math.max(0, p - 1))}
                  disabled={currentIdx === 0}
                  className="px-5 py-3 border border-slate-200 text-slate-500 rounded-xl font-bold text-xs hover:bg-slate-50 disabled:opacity-50 transition-all flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> CÂU TRƯỚC
                </button>

                <button
                  onClick={() => setCurrentIdx((p) => Math.min(questions.length - 1, p + 1))}
                  disabled={currentIdx === questions.length - 1}
                  className="px-5 py-3 bg-primary text-white rounded-xl font-bold text-xs hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-lg shadow-primary/10"
                >
                  CÂU KẾ <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Question Navigator Sidebar (Right 1 column) */}
          <div className="premium-card p-6 space-y-6">
            <div className="space-y-1">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Tiến độ bài thi</h3>
              <p className="text-xs text-slate-400 font-bold">
                Đã làm: {Object.keys(answers).length} / {questions.length} câu
              </p>
            </div>

            {/* Answered Status Grid */}
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, i) => {
                const isCurrent = currentIdx === i;
                const isAnswered = !!answers[q.id];
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(i)}
                    className={`h-10 rounded-xl font-black text-xs transition-all flex items-center justify-center border ${
                      isCurrent
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-105'
                        : isAnswered
                        ? 'bg-blue-50 text-blue-600 border-blue-200 font-bold'
                        : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-slate-100 pt-4 text-xs font-medium text-slate-500 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-md bg-primary" />
                <span>Câu đang xem</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-md bg-blue-50 border border-blue-200" />
                <span>Câu đã trả lời</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-md bg-slate-50 border border-slate-200" />
                <span>Câu chưa trả lời</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // ────────────────────────────────────────────────────────
        // 2. DETAILED TEST RESULT DASHBOARD                       
        // ────────────────────────────────────────────────────────
        <div className="space-y-8 animate-in slide-in-from-bottom duration-700">
          {/* Result Card Header */}
          <div className="premium-card p-1 rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 rounded-[22px] p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI2di0yaDEwem0wLTRWMjhoLTEwdjJoMTB6bS0xNCA0aDJ2LTJoLTJ2MnptMC00aDJ2LTJoLTJ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
              
              <div className="relative z-10 max-w-xl mx-auto space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/20 mx-auto">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Hoàn thành thi thử TOEIC</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-black text-white">Kết quả thi của bạn</h1>

                {/* Score badge */}
                <div className="flex items-center justify-center gap-4 py-4">
                  <div className="p-4 bg-white/10 rounded-2xl backdrop-blur min-w-[120px]">
                    <span className="block text-4xl font-black text-white">{result.totalScore}</span>
                    <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Tổng điểm</span>
                  </div>
                  <div className="text-white font-black text-2xl">+</div>
                  <div className="p-4 bg-emerald-500/20 rounded-2xl border border-emerald-500/20 min-w-[120px]">
                    <span className="block text-4xl font-black text-emerald-300">+{result.xpRewarded}</span>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Kinh nghiệm XP</span>
                  </div>
                </div>

                {/* Breakdown details */}
                <div className="grid grid-cols-2 gap-4 text-sm text-slate-300 max-w-sm mx-auto">
                  <div className="bg-white/5 p-3 rounded-xl">
                    <p className="text-xs text-blue-300 font-bold uppercase tracking-widest mb-1">Listening Score</p>
                    <p className="text-lg font-black text-white">{result.listeningScore} / 495</p>
                    <p className="text-xs text-slate-400 font-medium">Đúng: {result.correctListening}/{result.totalListening}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl">
                    <p className="text-xs text-cyan-300 font-bold uppercase tracking-widest mb-1">Reading Score</p>
                    <p className="text-lg font-black text-white">{result.readingScore} / 495</p>
                    <p className="text-xs text-slate-400 font-medium">Đúng: {result.correctReading}/{result.totalReading}</p>
                  </div>
                </div>

                <div className="flex justify-center gap-4 pt-4">
                  <button
                    onClick={() => router.push('/toeic')}
                    className="px-6 py-3 bg-white/10 text-white rounded-xl font-bold text-xs border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Quay lại Center
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-bold text-xs hover:opacity-90 transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2"
                  >
                    Thi lại đề khác
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Performance breakdown per Part */}
          <div className="premium-card p-6 md:p-8 space-y-6">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-primary" /> Phân tích kết quả theo Part
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7].map((part) => {
                const stats = getPartStats(part);
                const percent = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
                return (
                  <div key={part} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Part {part}</span>
                    <div className="flex items-end justify-between">
                      <span className="text-xl font-black text-slate-800">{percent}%</span>
                      <span className="text-xs text-slate-400 font-bold">Đúng: {stats.correct}/{stats.total}</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          percent >= 80 ? 'bg-green-500' : percent >= 50 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Review detailed answers */}
          <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-800">📋 Xem lại đáp án & Giải thích chi tiết</h3>
            
            <div className="space-y-4">
              {result.details.map((q: any, index: number) => (
                <div key={q.questionId} className="premium-card p-6 space-y-4 relative overflow-hidden">
                  {/* Status Indicator Stripe */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${q.isCorrect ? 'bg-green-500' : 'bg-rose-500'}`} />

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase">
                        Part {q.part}
                      </span>
                      <span className="text-sm font-bold text-slate-400">Câu {index + 1}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {q.isCorrect ? (
                        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-black flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> ĐÚNG
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-xs font-black flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> SAI
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Context if available */}
                  {q.context && (
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-600 leading-relaxed whitespace-pre-line">
                      {q.context}
                    </div>
                  )}

                  {/* Question Prompt */}
                  <h4 className="font-black text-slate-800 text-sm leading-relaxed">{q.questionText}</h4>

                  {/* Choices list */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-medium">
                    {q.choices.map((choice: string, cIdx: number) => {
                      const letter = choice.trim().charAt(0).toUpperCase();
                      const isCorrect = letter === q.correctAnswer;
                      const isUserChoice = letter === q.userAnswer;
                      return (
                        <div
                          key={cIdx}
                          className={`p-3 rounded-lg border flex items-center justify-between ${
                            isCorrect
                              ? 'border-green-300 bg-green-50 text-green-700 font-bold'
                              : isUserChoice
                              ? 'border-rose-300 bg-rose-50 text-rose-700 font-bold'
                              : 'border-slate-100 bg-slate-50/50 text-slate-600'
                          }`}
                        >
                          <span>{choice}</span>
                          {isCorrect && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                          {!isCorrect && isUserChoice && <XCircle className="w-4 h-4 text-rose-600" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation card */}
                  <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl space-y-2">
                    <div className="flex items-center gap-1.5 text-blue-800 font-black text-xs uppercase tracking-wider">
                      <Info className="w-4.5 h-4.5" />
                      <span>Giải thích từ AI</span>
                    </div>
                    <p className="text-xs font-medium text-slate-600 leading-relaxed whitespace-pre-line">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TOEICFullTestPage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-slate-500 font-bold">Đang tải đề thi...</p>
      </div>
    }>
      <TOEICFullTestContent />
    </React.Suspense>
  );
}
