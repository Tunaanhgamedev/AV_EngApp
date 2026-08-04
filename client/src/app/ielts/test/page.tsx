'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Award, Headphones, BookOpen, PenTool, Mic2, Clock, Target, Play,
  CheckCircle2, XCircle, AlertTriangle, ArrowLeft, ArrowRight, ShieldCheck,
  ChevronRight, Volume2, Info, Loader2, Sparkles, FileText, Check, HelpCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getIeltsPractice, getFullIeltsTest, submitIeltsPractice } from '@/services/ielts.service';

interface Question {
  id: string;
  context: string;
  questionText: string;
  choices: string[];
  correctAnswer: string;
  explanation: string;
}

interface SkillData {
  skill: string;
  questions: Question[];
}

export default function IELTSFullTestPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Test states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Data for all skills
  const [listeningData, setListeningData] = useState<SkillData | null>(null);
  const [readingData, setReadingData] = useState<SkillData | null>(null);
  const [writingData, setWritingData] = useState<SkillData | null>(null);
  const [speakingData, setSpeakingData] = useState<SkillData | null>(null);

  // Wizard Stage: 'instructions' | 'listening' | 'reading' | 'writing' | 'speaking' | 'completed'
  const [stage, setStage] = useState<'instructions' | 'listening' | 'reading' | 'writing' | 'speaking'>('instructions');

  // Input states
  const [listeningAnswers, setListeningAnswers] = useState<Record<string, string>>({});
  const [readingAnswers, setReadingAnswers] = useState<Record<string, string>>({});
  const [writingAnswer, setWritingAnswer] = useState('');
  const [speakingAnswer, setSpeakingAnswer] = useState('');

  // Timer: 1200 seconds (20 minutes total for this simulated mini-test)
  const [timeLeft, setTimeLeft] = useState(1200);
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Audio Playback
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (stage !== 'instructions' && !isExamCompleted && timeLeft > 0) {
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
  }, [stage, isExamCompleted, timeLeft]);

  // Fetch IELTS questions for all 4 skills concurrently
  useEffect(() => {
    async function fetchAllSkills() {
      try {
        setLoading(true);
        setError(null);

        const token = user ? await user.getIdToken() : undefined;
        let listening, reading, writing, speaking;

        try {
          const fullTest = await getFullIeltsTest(token);
          const skillsMap: Record<string, any> = {};
          (fullTest.skills || []).forEach((s: any) => {
            if (s.skill) skillsMap[s.skill] = s;
          });
          listening = skillsMap['listening'];
          reading = skillsMap['reading'];
          writing = skillsMap['writing'];
          speaking = skillsMap['speaking'];
        } catch {
          [listening, reading, writing, speaking] = await Promise.all([
            getIeltsPractice('listening', token),
            getIeltsPractice('reading', token),
            getIeltsPractice('writing', token),
            getIeltsPractice('speaking', token)
          ]);
        }

        setListeningData(listening);
        setReadingData(reading);
        setWritingData(writing);
        setSpeakingData(speaking);

        if (!listening.questions || !reading.questions || !writing.questions || !speaking.questions) {
          throw new Error('Đề thi tải về không đầy đủ cấu trúc. Vui lòng tải lại!');
        }

      } catch (err: any) {
        console.error('Failed to load IELTS full test:', err);
        setError(err.message || 'Lỗi tải đề thi IELTS từ hệ thống. Vui lòng tải lại!');
      } finally {
        setLoading(false);
      }
    }
    fetchAllSkills();
  }, [user]);

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

  const getRatioBandScore = (correct: number, total: number) => {
    const ratio = correct / total;
    if (ratio >= 1.0) return 9.0;
    if (ratio >= 0.8) return 7.5;
    if (ratio >= 0.6) return 6.5;
    if (ratio >= 0.4) return 5.5;
    if (ratio >= 0.2) return 4.5;
    return 4.0;
  };

  const handleSubmitTest = async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      // 1. Grade Listening
      let lCorrect = 0;
      const lTotal = listeningData?.questions.length || 0;
      listeningData?.questions.forEach((q) => {
        if (listeningAnswers[q.id]?.charAt(0) === q.correctAnswer) {
          lCorrect++;
        }
      });
      const listeningBand = getRatioBandScore(lCorrect, lTotal);

      // 2. Grade Reading
      let rCorrect = 0;
      const rTotal = readingData?.questions.length || 0;
      readingData?.questions.forEach((q) => {
        if (readingAnswers[q.id]?.charAt(0) === q.correctAnswer) {
          rCorrect++;
        }
      });
      const readingBand = getRatioBandScore(rCorrect, rTotal);

      // 3. Grade Writing via AI examiner
      let writingBand = 6.0;
      let writingFeedback = 'Bài viết có cố gắng bám sát đề, cần chú ý nâng cấp ngữ pháp.';
      
      try {
        const wRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/ai/analyze-ielts-constructive`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            skill: 'writing',
            questionText: writingData?.questions[0]?.questionText || '',
            userAnswer: writingAnswer || 'Empty submission.'
          })
        });
        if (wRes.ok) {
          const wData = await wRes.json();
          writingBand = parseFloat(wData.bandScore) || 6.0;
          writingFeedback = wData.feedback;
        }
      } catch (wErr) {
        console.error('AI Writing grading failed, falling back:', wErr);
      }

      // 4. Grade Speaking via AI examiner
      let speakingBand = 6.0;
      let speakingFeedback = 'Câu trả lời nói tương đối trôi chảy, cần thêm từ vựng học thuật.';
      
      try {
        const sRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/ai/analyze-ielts-constructive`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            skill: 'speaking',
            questionText: speakingData?.questions[0]?.questionText || '',
            userAnswer: speakingAnswer || 'Empty speaking transcript.'
          })
        });
        if (sRes.ok) {
          const sData = await sRes.json();
          speakingBand = parseFloat(sData.bandScore) || 6.0;
          speakingFeedback = sData.feedback;
        }
      } catch (sErr) {
        console.error('AI Speaking grading failed, falling back:', sErr);
      }

      // 5. Calculate Overall Band Score (standard IELTS rounding to nearest 0.5)
      const rawAverage = (listeningBand + readingBand + writingBand + speakingBand) / 4;
      let overallBand = Math.round(rawAverage * 2) / 2;

      // 6. Submit to Database History
      const details = {
        listening: { score: listeningBand, correct: lCorrect, total: lTotal, answers: listeningAnswers },
        reading: { score: readingBand, correct: rCorrect, total: rTotal, answers: readingAnswers },
        writing: { score: writingBand, answer: writingAnswer, feedback: writingFeedback },
        speaking: { score: speakingBand, answer: speakingAnswer, feedback: speakingFeedback }
      };

      const token = user ? await user.getIdToken() : undefined;
      const finalRes = await submitIeltsPractice({
        userId: user?.uid || 'anonymous',
        skill: 'full',
        bandScore: overallBand,
        aiFeedback: `L: ${listeningBand} | R: ${readingBand} | W: ${writingBand} | S: ${speakingBand}\n\nOverall: ${overallBand}\n\nNhận xét giáo viên AI IELTS:\nWriting: ${writingFeedback}\n\nSpeaking: ${speakingFeedback}`,
        details
      }, token);

      setResult({
        listeningBand,
        readingBand,
        writingBand,
        speakingBand,
        overallBand,
        details,
        xpRewarded: finalRes.xpRewarded || 250
      });

      setIsExamCompleted(true);
    } catch (err) {
      console.error('Failed to submit IELTS test:', err);
      alert('Đã xảy ra lỗi khi chấm điểm. Vui lòng kết nối mạng và thử lại!');
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
        <Loader2 className="w-12 h-12 text-red-600 dark:text-red-400 animate-spin" />
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 animate-pulse">Đang tải đề thi IELTS Full Test...</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium max-w-sm">
            Hệ thống đang nạp đồng thời bộ đề thi 4 kĩ năng: Listening, Reading, Writing, và Speaking từ AI.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6 max-w-md mx-auto text-center px-4">
        <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-500/10 flex items-center justify-center text-rose-600 dark:text-rose-400">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">Lỗi tải đề thi</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-red-600 dark:bg-red-500 text-white rounded-2xl font-bold shadow-lg shadow-red-600/20 hover:opacity-90 transition-all w-full"
        >
          Thử tải lại đề thi
        </button>
        <button
          onClick={() => router.push('/ielts')}
          className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        >
          Quay lại IELTS Center
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20 animate-in fade-in duration-500">
      
      {/* ──────────────────────────────────────────────────────── */}
      {/* A. INSTRUCTIONS PAGE                                      */}
      {/* ──────────────────────────────────────────────────────── */}
      {stage === 'instructions' && !isExamCompleted && (
        <div className="premium-card p-1 rounded-3xl overflow-hidden shadow-xl max-w-3xl mx-auto mt-10">
          <div className="bg-gradient-to-br from-slate-900 via-red-950 to-rose-950 p-8 md:p-12 text-center text-white space-y-8">
            <div className="w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 mx-auto">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-black">IELTS Academic Mock Test</h1>
              <p className="text-red-200/80 text-sm max-w-lg mx-auto">
                Bắt đầu thử thách thi thử IELTS Full Test bao gồm đầy đủ 4 kỹ năng. Bài thi được chấm điểm và phản hồi bởi giám khảo AI.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-2xl mx-auto pt-4 border-t border-white/10">
              <div className="p-3 bg-white/5 rounded-xl">
                <p className="text-xs text-red-300 font-bold uppercase tracking-wider mb-1">Listening</p>
                <p className="text-sm font-black">5 câu hỏi MCQ</p>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <p className="text-xs text-emerald-300 font-bold uppercase tracking-wider mb-1">Reading</p>
                <p className="text-sm font-black">5 câu hỏi đọc</p>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <p className="text-xs text-amber-300 font-bold uppercase tracking-wider mb-1">Writing</p>
                <p className="text-sm font-black">1 bài luận Task 2</p>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <p className="text-xs text-rose-300 font-bold uppercase tracking-wider mb-1">Speaking</p>
                <p className="text-sm font-black">1 đề Cue Card</p>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <button
                onClick={() => setStage('listening')}
                className="px-10 py-4 bg-gradient-to-r from-red-500 to-rose-550 text-white rounded-2xl font-black text-sm hover:opacity-90 transition-all shadow-xl shadow-red-500/30 inline-flex items-center gap-2 group"
              >
                <Play className="w-5 h-5" />
                BẮT ĐẦU THI THỬ
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <br />
              <button
                onClick={() => router.push('/ielts')}
                className="text-xs font-bold text-red-300/60 hover:text-red-200 transition-colors"
              >
                Quay lại IELTS Center
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────── */}
      {/* B. ACTIVE EXAM MODE                                      */}
      {/* ──────────────────────────────────────────────────────── */}
      {stage !== 'instructions' && !isExamCompleted && (
        <div className="space-y-6">
          {/* Header Panel */}
          <div className="premium-card p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (confirm('Bạn có chắc muốn hủy bỏ thi thử?')) {
                    router.push('/ielts');
                  }
                }}
                className="p-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all"
              >
                <ArrowLeft className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              </button>
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100 uppercase tracking-wide">IELTS MOCK EXAM</h2>
            </div>

            {/* Stages tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
              {(['listening', 'reading', 'writing', 'speaking'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStage(s)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    stage === s
                      ? 'bg-red-600 dark:bg-red-500 text-white shadow shadow-red-600/10'
                      : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20 rounded-xl font-black text-sm">
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeLeft)}</span>
              </div>
              <button
                onClick={handleSubmitTest}
                disabled={submitting}
                className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl font-black text-xs hover:opacity-90 transition-all flex items-center gap-1.5"
              >
                {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                NỘP BÀI THI
              </button>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-red-600 dark:bg-red-500 h-full transition-all duration-300"
              style={{
                width:
                  stage === 'listening'
                    ? '25%'
                    : stage === 'reading'
                    ? '50%'
                    : stage === 'writing'
                    ? '75%'
                    : '100%'
              }}
            />
          </div>

          {/* ──────────────────────────────────────────────────────── */}
          {/* B1. LISTENING SKILL PANEL                                */}
          {/* ──────────────────────────────────────────────────────── */}
          {stage === 'listening' && (
            <div className="space-y-6">
              {listeningData?.questions.map((q, idx) => (
                <div key={q.id} className="premium-card p-6 md:p-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <span className="text-xs font-black text-red-500 uppercase tracking-widest">Listening Task — Q{idx + 1}</span>
                  </div>

                  {/* Audio block */}
                  {q.context && (
                    <div className="p-5 bg-gradient-to-r from-blue-50 dark:from-blue-950/30 to-indigo-50 dark:to-indigo-950/30 border border-blue-100 dark:border-blue-900/50 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                          <Headphones className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800 dark:text-slate-100">IELTS Listening Simulation Script</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500 font-bold">Bấm nút để nghe máy đọc</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSpeak(q.context, q.id)}
                        className={`px-5 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 transition-all ${
                          playingId === q.id
                            ? 'bg-red-500 text-white shadow shadow-red-500/20'
                            : 'bg-blue-600 text-white shadow shadow-blue-500/20 hover:opacity-90'
                        }`}
                      >
                        <Volume2 className="w-4 h-4" />
                        {playingId === q.id ? 'DỪNG' : 'PLAY AUDIO'}
                      </button>
                    </div>
                  )}

                  {/* End Audio block */}
                  <h3 className="text-base md:text-lg font-black text-slate-800 dark:text-slate-100">{q.questionText}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.choices.map((choice) => {
                      const letter = choice.trim().charAt(0).toUpperCase();
                      const isSelected = listeningAnswers[q.id] === choice;
                      return (
                        <button
                          key={choice}
                          onClick={() =>
                            setListeningAnswers((prev) => ({ ...prev, [q.id]: choice }))
                          }
                          className={`p-4 rounded-xl border-2 text-left text-sm font-bold transition-all ${
                            isSelected
                              ? 'border-red-500 bg-red-50/50 dark:bg-red-950/30 text-red-600 dark:text-red-400'
                              : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {choice}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setStage('reading')}
                  className="px-6 py-3 bg-red-600 text-white font-black text-xs rounded-xl shadow hover:opacity-90 transition-all flex items-center gap-1.5"
                >
                  TIẾP THEO: READING <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────── */}
          {/* B2. READING SKILL PANEL                                 */}
          {/* ──────────────────────────────────────────────────────── */}
          {stage === 'reading' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Reading passage (Left pane) */}
              <div className="premium-card p-6 md:p-8 space-y-4">
                <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">Passage Text</span>
                <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">IELTS Academic Reading Passage</h3>
                <div className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed whitespace-pre-line overflow-y-auto max-h-[500px] border border-slate-100 dark:border-slate-800 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 shadow-inner">
                  {readingData?.questions[0]?.context}
                </div>
              </div>

              {/* Reading Questions (Right pane) */}
              <div className="space-y-6">
                {readingData?.questions.map((q, idx) => (
                  <div key={q.id} className="premium-card p-6 space-y-4">
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500">Câu hỏi {idx + 1}</span>
                    <h4 className="font-black text-slate-800 dark:text-slate-100 text-sm leading-relaxed">{q.questionText}</h4>

                    <div className="grid grid-cols-1 gap-2">
                      {q.choices.map((choice) => {
                        const isSelected = readingAnswers[q.id] === choice;
                        return (
                          <button
                            key={choice}
                            onClick={() =>
                              setReadingAnswers((prev) => ({ ...prev, [q.id]: choice }))
                            }
                            className={`p-3 text-left rounded-xl border font-bold text-xs transition-all ${
                              isSelected
                                ? 'border-red-500 bg-red-50/50 dark:bg-red-950/30 text-red-600 dark:text-red-400'
                                : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {choice}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setStage('listening')}
                    className="px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 rounded-xl font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" /> TRỞ LẠI LISTENING
                  </button>
                  <button
                    onClick={() => setStage('writing')}
                    className="px-6 py-3 bg-red-600 text-white font-black text-xs rounded-xl shadow hover:opacity-90 transition-all flex items-center gap-1.5"
                  >
                    TIẾP THEO: WRITING <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────── */}
          {/* B3. WRITING SKILL PANEL                                  */}
          {/* ──────────────────────────────────────────────────────── */}
          {stage === 'writing' && (
            <div className="premium-card p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-xs font-black text-amber-500 uppercase tracking-widest">Writing Task 2 Essay</span>
              </div>

              <div className="p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-2">
                <h4 className="font-black text-slate-800 dark:text-slate-100 text-sm">Đề bài luận:</h4>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {writingData?.questions[0]?.questionText}
                </p>
              </div>

              {/* Suggestions */}
              {writingData?.questions[0]?.context && (
                <div className="p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 rounded-2xl space-y-1.5">
                  <p className="text-xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider">Từ vựng & Dàn ý gợi ý:</p>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                    {writingData.questions[0].context}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">Bài làm của bạn:</label>
                <textarea
                  value={writingAnswer}
                  onChange={(e) => setWritingAnswer(e.target.value)}
                  placeholder="Nhập bài viết tối thiểu 150-250 từ của bạn tại đây..."
                  className="w-full h-80 p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 font-sans text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 leading-relaxed shadow-inner"
                />
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 dark:text-slate-500">
                  <span>Số từ: {writingAnswer.split(/\s+/).filter(Boolean).length} từ</span>
                  <span>Khuyên dùng: {writingAnswer.split(/\s+/).filter(Boolean).length >= 250 ? 'Đạt độ dài luận chuẩn' : 'Tối thiểu 250 từ'}</span>
                </div>
              </div>

              <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-6">
                <button
                  onClick={() => setStage('reading')}
                  className="px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 rounded-xl font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> TRỞ LẠI READING
                </button>
                <button
                  onClick={() => setStage('speaking')}
                  className="px-6 py-3 bg-red-600 text-white font-black text-xs rounded-xl shadow hover:opacity-90 transition-all flex items-center gap-1.5"
                >
                  TIẾP THEO: SPEAKING <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────── */}
          {/* B4. SPEAKING SKILL PANEL                                 */}
          {/* ──────────────────────────────────────────────────────── */}
          {stage === 'speaking' && (
            <div className="premium-card p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-xs font-black text-rose-500 uppercase tracking-widest">Speaking Part 2 Cue Card</span>
              </div>

              <div className="p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-2">
                <h4 className="font-black text-slate-800 dark:text-slate-100 text-sm">Đề nói:</h4>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {speakingData?.questions[0]?.questionText}
                </p>
              </div>

              {speakingData?.questions[0]?.context && (
                <div className="p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 rounded-2xl space-y-1.5">
                  <p className="text-xs font-black text-rose-700 dark:text-rose-400 uppercase tracking-wider">Từ vựng nên dùng & câu hỏi gợi ý:</p>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                    {speakingData.questions[0].context}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">Câu trả lời viết hoặc độc thoại của bạn:</label>
                  <span className="px-2 py-0.5 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] font-black rounded-lg">MÔ PHỎNG AUDIO TRANSCRIPT</span>
                </div>
                <textarea
                  value={speakingAnswer}
                  onChange={(e) => setSpeakingAnswer(e.target.value)}
                  placeholder="Nhập nội dung bài nói tự do của bạn bằng tiếng Anh..."
                  className="w-full h-48 p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 font-sans text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 leading-relaxed shadow-inner"
                />
              </div>

              <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-6">
                <button
                  onClick={() => setStage('writing')}
                  className="px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 rounded-xl font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> TRỞ LẠI WRITING
                </button>
                <button
                  onClick={handleSubmitTest}
                  disabled={submitting || !speakingAnswer.trim()}
                  className="px-8 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl font-black text-xs hover:opacity-90 shadow-lg shadow-red-550/20 disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                  NỘP BÀI CHẤM ĐIỂM
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ──────────────────────────────────────────────────────── */}
      {/* C. IELTS TEST REPORT FORM (TRF) RESULTS                  */}
      {/* ──────────────────────────────────────────────────────── */}
      {isExamCompleted && result && (
        <div className="space-y-8 animate-in slide-in-from-bottom duration-700">
          
          {/* TRF Scorecard */}
          <div className="premium-card p-1 rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-br from-slate-900 via-red-950 to-indigo-950 rounded-[22px] p-8 md:p-12 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI2di0yaDEwem0wLTRWMjhoLTEwdjJoMTB6bS0xNCA0aDJ2LTJoLTJ2MnptMC00aDJ2LTJoLTJ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-15" />
              
              <div className="relative z-10 max-w-xl mx-auto space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/20 text-red-300 rounded-full border border-red-500/20 mx-auto">
                  <Award className="w-4 h-4 text-red-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest">IELTS TEST REPORT FORM</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-black">Kết Quả Thi Thử IELTS</h1>

                {/* Score badge */}
                <div className="flex items-center justify-center gap-4 py-4">
                  <div className="p-4 bg-white/10 rounded-2xl backdrop-blur border border-white/10 min-w-[140px]">
                    <span className="block text-5xl font-black text-white">{result.overallBand.toFixed(1)}</span>
                    <span className="text-[10px] font-bold text-red-300 uppercase tracking-widest">Overall Band</span>
                  </div>
                  <div className="text-white font-black text-2xl">+</div>
                  <div className="p-4 bg-emerald-500/20 rounded-2xl border border-emerald-500/20 min-w-[120px]">
                    <span className="block text-4xl font-black text-emerald-300">+{result.xpRewarded}</span>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Kinh nghiệm XP</span>
                  </div>
                </div>

                {/* Subscores table */}
                <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <p className="text-[10px] text-blue-300 font-bold uppercase tracking-wider mb-1">Listening</p>
                    <p className="text-xl font-black">{result.listeningBand.toFixed(1)}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <p className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider mb-1">Reading</p>
                    <p className="text-xl font-black">{result.readingBand.toFixed(1)}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <p className="text-[10px] text-amber-300 font-bold uppercase tracking-wider mb-1">Writing</p>
                    <p className="text-xl font-black">{result.writingBand.toFixed(1)}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <p className="text-[10px] text-rose-300 font-bold uppercase tracking-wider mb-1">Speaking</p>
                    <p className="text-xl font-black">{result.speakingBand.toFixed(1)}</p>
                  </div>
                </div>

                <div className="flex justify-center gap-4 pt-4">
                  <button
                    onClick={() => router.push('/ielts')}
                    className="px-6 py-3 bg-white/10 text-white rounded-xl font-bold text-xs border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Quay lại Center
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl font-bold text-xs hover:opacity-90 transition-all shadow-lg shadow-red-500/25 flex items-center gap-2"
                  >
                    Thi lại đề khác
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Writing feedback */}
            <div className="premium-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <PenTool className="w-5 h-5 text-amber-500" />
                  <h3 className="font-black text-slate-800 dark:text-slate-100 text-base">Writing Task Feedback</h3>
                </div>
                <span className="px-2.5 py-0.5 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-lg text-xs font-black">
                  Band {result.writingBand.toFixed(1)}
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500">Đề bài:</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium italic mt-0.5">{writingData?.questions[0]?.questionText}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500">Bài làm:</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium whitespace-pre-line bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl mt-0.5 border border-slate-100 dark:border-slate-800 shadow-inner max-h-[140px] overflow-y-auto">
                    {result.details.writing.answer}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500">Nhận xét chi tiết từ giáo viên AI:</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed whitespace-pre-line bg-amber-50/50 dark:bg-amber-500/10 p-4 rounded-xl mt-1 border border-amber-100 dark:border-amber-500/20">
                    {result.details.writing.feedback}
                  </p>
                </div>
              </div>
            </div>

            {/* Speaking feedback */}
            <div className="premium-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Mic2 className="w-5 h-5 text-rose-500" />
                  <h3 className="font-black text-slate-800 dark:text-slate-100 text-base">Speaking Task Feedback</h3>
                </div>
                <span className="px-2.5 py-0.5 bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 rounded-lg text-xs font-black">
                  Band {result.speakingBand.toFixed(1)}
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500">Đề nói:</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium italic mt-0.5">{speakingData?.questions[0]?.questionText}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500">Câu trả lời:</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium whitespace-pre-line bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl mt-0.5 border border-slate-100 dark:border-slate-800 shadow-inner max-h-[140px] overflow-y-auto">
                    {result.details.speaking.answer}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500">Nhận xét chi tiết từ giáo viên AI:</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed whitespace-pre-line bg-rose-50/50 dark:bg-rose-500/10 p-4 rounded-xl mt-1 border border-rose-100 dark:border-rose-500/20">
                    {result.details.speaking.feedback}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Receptive skills review */}
          <div className="premium-card p-6 space-y-6">
            <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">📋 Xem lại đáp án Listening & Reading</h3>
            
            <div className="space-y-6">
              {/* Listening section */}
              <div className="space-y-4">
                <span className="text-xs font-black text-blue-500 uppercase tracking-widest block">Listening Section Reviews</span>
                {listeningData?.questions.map((q, i) => {
                  const userAns = result.details.listening.answers[q.id] || 'None';
                  const isCorrect = userAns.charAt(0) === q.correctAnswer;
                  return (
                    <div key={q.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Câu {i + 1}</span>
                        <span className={`px-2 py-0.5 text-[10px] font-black rounded-lg ${isCorrect ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'}`}>
                          {isCorrect ? 'ĐÚNG' : 'SAI'}
                        </span>
                      </div>
                      <p className="text-xs font-black text-slate-800 dark:text-slate-100">{q.questionText}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Đáp án của bạn: <strong className={isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-650 dark:text-red-400'}>{userAns}</strong></p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Đáp án đúng: <strong className="text-green-600 dark:text-green-400">{q.correctAnswer}</strong></p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 italic bg-white dark:bg-slate-900 p-2 rounded border border-slate-100 dark:border-slate-800 mt-2">{q.explanation}</p>
                    </div>
                  );
                })}
              </div>

              {/* Reading section */}
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-black text-emerald-500 uppercase tracking-widest block">Reading Section Reviews</span>
                {readingData?.questions.map((q, i) => {
                  const userAns = result.details.reading.answers[q.id] || 'None';
                  const isCorrect = userAns.charAt(0) === q.correctAnswer;
                  return (
                    <div key={q.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Câu {i + 1}</span>
                        <span className={`px-2 py-0.5 text-[10px] font-black rounded-lg ${isCorrect ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'}`}>
                          {isCorrect ? 'ĐÚNG' : 'SAI'}
                        </span>
                      </div>
                      <p className="text-xs font-black text-slate-800 dark:text-slate-100">{q.questionText}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Đáp án của bạn: <strong className={isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-650 dark:text-red-400'}>{userAns}</strong></p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Đáp án đúng: <strong className="text-green-600 dark:text-green-400">{q.correctAnswer}</strong></p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 italic bg-white dark:bg-slate-900 p-2 rounded border border-slate-100 dark:border-slate-800 mt-2">{q.explanation}</p>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      )}
    </div>
  );
}
