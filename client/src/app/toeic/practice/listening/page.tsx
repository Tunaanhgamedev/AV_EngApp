'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Headphones, Volume2, ArrowLeft, CheckCircle2, XCircle,
  RotateCcw, Lightbulb, ImageIcon,
  MessageCircleQuestion, Shuffle, ChevronDown, ChevronUp,
  Award, Target, Sparkles, VolumeX, Play
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  PHOTO_QUESTIONS,
  QUESTION_RESPONSE_QUESTIONS,
  ALL_TOEIC_LISTENING_QUESTIONS,
  ToeicListeningQuestion
} from '@/data/toeicListeningData';
import { playAudioText, stopAudio } from '@/lib/ttsService';

type TabMode = 'photo' | 'question-response' | 'mixed';

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ==========================================
// QuestionCard component
// ==========================================
const QuestionCard = React.memo(function QuestionCard({
  question,
  index,
  total,
  selected,
  onSelect,
  revealed,
  onReveal,
  playingKey,
  onPlayFull,
  onPlayChoice,
}: {
  question: ToeicListeningQuestion;
  index: number;
  total: number;
  selected: number | null;
  onSelect: (idx: number) => void;
  revealed: boolean;
  onReveal: () => void;
  playingKey: string | null;
  onPlayFull: () => void;
  onPlayChoice: (choiceText: string, choiceKey: string) => void;
}) {
  const isAnswered = selected !== null;
  const isCorrect = selected === question.correctAnswer;
  const isFullPlaying = playingKey === `full-${question.id}`;

  return (
    <div className="premium-card p-0 overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-lg">
      {/* Question Header */}
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-blue-600/20">
            {index + 1}
          </span>
          <div>
            <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              Câu {index + 1} / {total}
            </p>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500">
              {question.type === 'photo' ? '📸 Photo Description (Part 1)' : '💬 Question-Response (Part 2)'}
            </p>
          </div>
        </div>

        {isAnswered && (
          <span className={cn(
            "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider",
            isCorrect
              ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400"
              : "bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400"
          )}>
            {isCorrect ? <><CheckCircle2 className="w-4 h-4" /> Đúng</> : <><XCircle className="w-4 h-4" /> Sai</>}
          </span>
        )}
      </div>

      <div className="p-6 space-y-5">
        {/* Image for Photo type */}
        {question.type === 'photo' && question.imageUrl && (
          <div className="relative rounded-2xl overflow-hidden border-2 border-slate-100 dark:border-slate-700 shadow-md">
            <img
              src={question.imageUrl}
              alt={question.imageDescription || 'TOEIC Photo'}
              className="w-full h-56 md:h-72 object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/75 to-transparent px-4 py-3">
              <p className="text-white text-xs font-bold flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-cyan-300" />
                Quan sát hình ảnh, sau đó nghe mô tả và chọn đáp án đúng nhất
              </p>
            </div>
          </div>
        )}

        {/* Audio Play Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onPlayFull}
            className={cn(
              "flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-sm transition-all border-2 cursor-pointer",
              isFullPlaying
                ? "bg-rose-50 dark:bg-rose-500/10 border-rose-400 dark:border-rose-500/50 text-rose-700 dark:text-rose-400 animate-pulse shadow-md"
                : "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20"
            )}
          >
            {isFullPlaying ? (
              <>
                <VolumeX className="w-5 h-5 animate-bounce" />
                <span>🔊 Đang phát âm thanh... (Bấm để dừng)</span>
              </>
            ) : (
              <>
                <Volume2 className="w-5 h-5" />
                <span>{question.type === 'photo' ? '🎧 Nghe toàn bộ mô tả (A, B, C, D)' : '🎧 Nghe toàn bộ câu hỏi & đáp án'}</span>
              </>
            )}
          </button>
        </div>

        {/* Real TOEIC Exam Notice */}
        <div className="flex items-center justify-between text-xs px-1">
          <span className="font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            {!isAnswered ? (
              <>
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                <span>🔒 <strong>Format thi thật:</strong> Lời thoại đang ẩn. Nghe và bấm chọn A, B, C, D</span>
              </>
            ) : (
              <>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-black">🔓 Đã mở khóa Transcript 4 câu mô tả:</span>
              </>
            )}
          </span>
        </div>

        {/* Choices */}
        <div className="space-y-3">
          {question.choices.map((choice, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const isSelected = selected === idx;
            const isChoiceCorrect = idx === question.correctAnswer;
            const choiceKey = `choice-${question.id}-${idx}`;
            const isChoicePlaying = playingKey === choiceKey;

            return (
              <div key={idx} className="flex items-center gap-2">
                <button
                  disabled={isAnswered}
                  onClick={() => onSelect(idx)}
                  className={cn(
                    "flex-1 p-4 rounded-2xl text-left border-2 font-bold text-sm transition-all flex items-center justify-between cursor-pointer",
                    !isAnswered && isSelected && "border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
                    !isAnswered && !isSelected && "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-blue-300 dark:hover:border-blue-600 text-slate-700 dark:text-slate-300",
                    isAnswered && isChoiceCorrect && "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 shadow-sm",
                    isAnswered && isSelected && !isChoiceCorrect && "border-rose-500 bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400",
                    isAnswered && !isChoiceCorrect && !isSelected && "border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 opacity-60 text-slate-400 dark:text-slate-500",
                    isAnswered && "cursor-default"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "w-7 h-7 rounded-xl font-black text-xs flex items-center justify-center flex-shrink-0 transition-colors",
                      isAnswered && isChoiceCorrect
                        ? "bg-emerald-600 text-white"
                        : isAnswered && isSelected && !isChoiceCorrect
                        ? "bg-rose-600 text-white"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                    )}>
                      {letter}
                    </span>
                    <span className="leading-snug text-sm">
                      {isAnswered ? choice.replace(/^[A-D]\.\s*/, '') : `Đáp án (${letter})`}
                    </span>
                  </div>

                  {isAnswered && isChoiceCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 ml-2" />}
                  {isAnswered && isSelected && !isChoiceCorrect && <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0 ml-2" />}
                </button>

                {/* Individual choice speak button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayChoice(choice, choiceKey);
                  }}
                  title={`Nghe riêng câu (${letter})`}
                  className={cn(
                    "p-4 rounded-2xl border-2 transition-all cursor-pointer flex-shrink-0 flex items-center gap-1.5",
                    isChoicePlaying
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-md animate-pulse"
                      : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300"
                  )}
                >
                  <Volume2 className="w-4 h-4" />
                  <span className="text-xs font-black hidden sm:inline">({letter})</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Explanation */}
        {isAnswered && (
          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
            <button
              onClick={onReveal}
              className="flex items-center justify-between w-full text-left font-black text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" /> Giải thích đáp án & Lời dịch
              </span>
              {revealed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {revealed && (
              <div className="mt-3 p-4 bg-amber-50/50 dark:bg-amber-500/5 border border-amber-100/50 dark:border-amber-500/20 rounded-2xl text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed animate-in fade-in duration-300 space-y-2">
                <p className="text-emerald-700 dark:text-emerald-400 font-black">
                  ✅ Đáp án đúng: {question.choices[question.correctAnswer]}
                </p>
                <p className="text-slate-500 dark:text-slate-400 italic">{question.explanation}</p>
                <p className="text-slate-700 dark:text-slate-300 font-normal">{question.explanationVi}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

// ==========================================
// Main Page Component
// ==========================================
export default function ToeicListeningPracticePage() {
  const router = useRouter();
  const [tab, setTab] = useState<TabMode>('photo');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealedExplanations, setRevealedExplanations] = useState<Record<number, boolean>>({});
  const [playingKey, setPlayingKey] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<ToeicListeningQuestion[]>([]);

  // Get questions based on tab
  const questions = useMemo(() => {
    if (tab === 'photo') return PHOTO_QUESTIONS;
    if (tab === 'question-response') return QUESTION_RESPONSE_QUESTIONS;
    return shuffledQuestions.length > 0 ? shuffledQuestions : ALL_TOEIC_LISTENING_QUESTIONS;
  }, [tab, shuffledQuestions]);

  // Stats
  const totalAnswered = useMemo(() => Object.keys(answers).length, [answers]);
  const correctCount = useMemo(() => {
    return questions.filter(q => answers[q.id] === q.correctAnswer).length;
  }, [questions, answers]);
  const allAnswered = useMemo(() => {
    return questions.every(q => answers[q.id] !== undefined);
  }, [questions, answers]);

  const handleSelect = useCallback((questionId: number, choiceIdx: number) => {
    setAnswers(prev => {
      if (prev[questionId] !== undefined) return prev;
      return { ...prev, [questionId]: choiceIdx };
    });
  }, []);

  const handleReveal = useCallback((questionId: number) => {
    setRevealedExplanations(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  }, []);

  const handlePlayFull = useCallback((question: ToeicListeningQuestion) => {
    const fullKey = `full-${question.id}`;
    if (playingKey === fullKey) {
      stopAudio();
      setPlayingKey(null);
      return;
    }

    setPlayingKey(fullKey);
    playAudioText(question.audioScript, {
      rate: 0.85,
      onEnd: () => setPlayingKey(null),
      onError: () => setPlayingKey(null)
    });
  }, [playingKey]);

  const handlePlayChoice = useCallback((choiceText: string, choiceKey: string) => {
    if (playingKey === choiceKey) {
      stopAudio();
      setPlayingKey(null);
      return;
    }

    setPlayingKey(choiceKey);
    playAudioText(choiceText, {
      rate: 0.85,
      onEnd: () => setPlayingKey(null),
      onError: () => setPlayingKey(null)
    });
  }, [playingKey]);

  const handleReset = useCallback(() => {
    stopAudio();
    setAnswers({});
    setRevealedExplanations({});
    setPlayingKey(null);
    setShowResults(false);
    if (tab === 'mixed') {
      setShuffledQuestions(shuffleArray(ALL_TOEIC_LISTENING_QUESTIONS));
    }
  }, [tab]);

  const handleTabChange = useCallback((newTab: TabMode) => {
    stopAudio();
    setTab(newTab);
    setAnswers({});
    setRevealedExplanations({});
    setPlayingKey(null);
    setShowResults(false);
    if (newTab === 'mixed') {
      setShuffledQuestions(shuffleArray(ALL_TOEIC_LISTENING_QUESTIONS));
    }
  }, []);

  // Cleanup TTS on unmount
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const tabs: { id: TabMode; label: string; icon: React.ReactNode; count: number }[] = [
    { id: 'photo', label: 'Photo Description', icon: <ImageIcon className="w-4 h-4" />, count: PHOTO_QUESTIONS.length },
    { id: 'question-response', label: 'Question-Response', icon: <MessageCircleQuestion className="w-4 h-4" />, count: QUESTION_RESPONSE_QUESTIONS.length },
    { id: 'mixed', label: 'Mixed (Trộn)', icon: <Shuffle className="w-4 h-4" />, count: ALL_TOEIC_LISTENING_QUESTIONS.length },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 animate-in fade-in duration-500">
      {/* Back Button */}
      <button
        onClick={() => {
          stopAudio();
          router.push('/toeic');
        }}
        className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors font-bold cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Quay lại TOEIC Center
      </button>

      {/* Hero Header */}
      <section className="premium-card p-1 rounded-3xl overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-[22px] p-8 md:p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI2di0yaDEwem0wLTRWMjhoLTEwdjJoMTB6bS0xNCA0aDJ2LTJoLTJ2MnptMC00aDJ2LTJoLTJ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />

          <div className="relative z-10 space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 text-white rounded-full border border-white/20">
              <Headphones className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">TOEIC Listening Practice</span>
              <span className="text-[9px] px-2 py-0.5 bg-amber-400 text-amber-950 rounded-full font-black">PRO AUDIO 🔊</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
              Luyện Nghe TOEIC
              <br />
              <span className="bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">
                Nhìn Hình & Chọn Đáp Án
              </span>
            </h1>

            <p className="text-blue-200/80 text-sm font-medium max-w-xl">
              Luyện tập Part 1 (Photo Description) và Part 2 (Question-Response) với hình ảnh thực tế và âm thanh phát âm đa tầng (Web Speech API + Google Cloud TTS Audio). Rèn phản xạ nghe hiểu chuẩn xác.
            </p>

            <div className="flex flex-wrap gap-4 text-blue-200/80 text-xs font-bold">
              <div className="flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-cyan-300" />
                <span>{PHOTO_QUESTIONS.length} Photo Questions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircleQuestion className="w-3.5 h-3.5 text-cyan-300" />
                <span>{QUESTION_RESPONSE_QUESTIONS.length} Q-R Questions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-cyan-300" />
                <span>Hỗ trợ nghe từng câu riêng biệt</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Selector */}
      <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => handleTabChange(t.id)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs transition-all cursor-pointer",
              tab === t.id
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-md"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            )}
          >
            {t.icon}
            <span className="hidden sm:inline">{t.label}</span>
            <span className="text-[10px] px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-full font-black">{t.count}</span>
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      {totalAnswered > 0 && (
        <div className="premium-card p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-blue-500" /> Tiến trình
            </span>
            <span className="text-xs font-black text-slate-700 dark:text-slate-300">
              {totalAnswered} / {questions.length} câu • <span className="text-emerald-600 dark:text-emerald-400">{correctCount} đúng</span>
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${(totalAnswered / questions.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Results Summary */}
      {allAnswered && !showResults && (
        <div className="text-center">
          <button
            onClick={() => setShowResults(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-sm hover:opacity-90 transition-all shadow-xl shadow-blue-500/20 flex items-center gap-2 mx-auto cursor-pointer"
          >
            <Award className="w-5 h-5" /> XEM KẾT QUẢ LUYỆN TẬP
          </button>
        </div>
      )}

      {showResults && (
        <section className="premium-card p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800 shadow-xl rounded-3xl animate-in slide-in-from-top duration-500">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex flex-col items-center justify-center text-white shadow-lg flex-shrink-0">
              <span className="text-3xl font-black">{Math.round((correctCount / questions.length) * 100)}%</span>
              <span className="text-[9px] font-bold uppercase tracking-wider opacity-80">Chính xác</span>
            </div>
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center justify-center md:justify-start gap-2">
                  <Sparkles className="w-6 h-6 text-amber-500" />
                  {correctCount >= questions.length * 0.8 ? 'Xuất sắc!' : correctCount >= questions.length * 0.5 ? 'Khá tốt!' : 'Cần cố gắng thêm!'}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 font-bold">
                  Làm đúng {correctCount}/{questions.length} câu hỏi
                </p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" /> Làm Lại
                </button>
                <button
                  onClick={() => {
                    stopAudio();
                    router.push('/toeic');
                  }}
                  className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-2xl font-black text-xs hover:bg-slate-300 dark:hover:bg-slate-600 transition-all cursor-pointer"
                >
                  Quay Về TOEIC
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q, idx) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={idx}
            total={questions.length}
            selected={answers[q.id] ?? null}
            onSelect={(choiceIdx) => handleSelect(q.id, choiceIdx)}
            revealed={!!revealedExplanations[q.id]}
            onReveal={() => handleReveal(q.id)}
            playingKey={playingKey}
            onPlayFull={() => handlePlayFull(q)}
            onPlayChoice={(choiceText, choiceKey) => handlePlayChoice(choiceText, choiceKey)}
          />
        ))}
      </div>

      {/* Bottom Actions */}
      {totalAnswered > 0 && !showResults && (
        <div className="flex justify-between items-center">
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-black text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> Làm Lại Từ Đầu
          </button>

          {allAnswered && (
            <button
              onClick={() => setShowResults(true)}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-xs hover:opacity-90 transition-all shadow-xl shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
            >
              <Award className="w-5 h-5" /> XEM KẾT QUẢ
            </button>
          )}
        </div>
      )}
    </div>
  );
}
