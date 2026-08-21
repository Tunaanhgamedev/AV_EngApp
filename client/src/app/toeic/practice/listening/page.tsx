'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Headphones, Volume2, ArrowLeft, CheckCircle2, XCircle,
  RotateCcw, Lightbulb, ImageIcon,
  MessageCircleQuestion, Shuffle, ChevronDown, ChevronUp,
  Award, Target, Sparkles, VolumeX, Play, Users, Megaphone,
  BookOpen, ShieldAlert, Zap, Clock, Info, Check, Eye, EyeOff,
  User, Box, Mountain, Layers, AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  PHOTO_QUESTIONS,
  QUESTION_RESPONSE_QUESTIONS,
  TOEIC_CONVERSATIONS,
  TOEIC_TALKS,
  LISTENING_TRAPS,
  ALL_TOEIC_LISTENING_QUESTIONS,
  ToeicListeningQuestion,
  ToeicConversation,
  ToeicTalk,
  PhotoCategory
} from '@/data/toeicListeningData';
import { playAudioText, stopAudio } from '@/lib/ttsService';

type TabMode = 'photo' | 'question-response' | 'conversations' | 'talks' | 'traps';

function getCategoryBadge(cat?: string) {
  switch (cat) {
    case 'people':
      return { label: '🧑 Tranh Tả Người', color: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' };
    case 'object':
      return { label: '📦 Tranh Tả Vật', color: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' };
    case 'scenery':
      return { label: '🏞️ Tranh Tả Cảnh', color: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' };
    case 'combined':
      return { label: '👥📦 Người & Vật/Cảnh', color: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800' };
    default:
      return null;
  }
}

// ==========================================
// Part 1 & 2 QuestionCard component
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
  playbackRate,
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
  playbackRate: number;
  onPlayFull: () => void;
  onPlayChoice: (choiceText: string, choiceKey: string) => void;
}) {
  const isAnswered = selected !== null;
  const isCorrect = selected === question.correctAnswer;
  const isFullPlaying = playingKey === `full-${question.id}`;
  const catBadge = getCategoryBadge(question.photoCategory);

  return (
    <div className="premium-card p-0 overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-lg transition-all duration-300">
      {/* Question Header */}
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-blue-600/20">
            {index + 1}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs font-black text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                Câu {index + 1} / {total}
              </p>
              {catBadge && (
                <span className={cn("text-[10px] px-2 py-0.5 rounded-md font-black border", catBadge.color)}>
                  {catBadge.label}
                </span>
              )}
            </div>
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
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3">
              <p className="text-white text-xs font-bold flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-cyan-300 flex-shrink-0" />
                <span>{question.imageDescription || 'Quan sát hình ảnh, nghe mô tả và chọn đáp án đúng nhất'}</span>
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
                <span>🔊 Đang phát âm thanh ({playbackRate}x)... (Bấm để dừng)</span>
              </>
            ) : (
              <>
                <Volume2 className="w-5 h-5" />
                <span>{question.type === 'photo' ? `🎧 Nghe toàn bộ mô tả (A, B, C, D) - ${playbackRate}x` : `🎧 Nghe câu hỏi & đáp án - ${playbackRate}x`}</span>
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
                <span className="text-emerald-600 dark:text-emerald-400 font-black">🔓 Đã mở khóa Transcript 4 câu:</span>
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

        {/* Explanation & Trap Analysis */}
        {isAnswered && (
          <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-3">
            {/* Trap Warning Box */}
            {question.trapAnalysis && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300 font-black">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Cảnh giác bẫy: {question.trapAnalysis.trapType}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {question.trapAnalysis.trapNoteVi}
                </p>
              </div>
            )}

            <button
              onClick={onReveal}
              className="flex items-center justify-between w-full text-left font-black text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" /> Giải thích đáp án & Lời dịch chi tiết
              </span>
              {revealed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {revealed && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed animate-in fade-in duration-300 space-y-2">
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
// Part 3 ConversationCard component
// ==========================================
function ConversationCard({
  conv,
  index,
  total,
  answers,
  onSelectAnswer,
  playingKey,
  playbackRate,
  onPlayDialogue,
  onPlaySpeakerTurn
}: {
  conv: ToeicConversation;
  index: number;
  total: number;
  answers: Record<string, number>;
  onSelectAnswer: (qId: string, choiceIdx: number) => void;
  playingKey: string | null;
  playbackRate: number;
  onPlayDialogue: () => void;
  onPlaySpeakerTurn: (text: string, turnKey: string) => void;
}) {
  const [showTranscript, setShowTranscript] = useState(false);
  const [showVocab, setShowVocab] = useState(false);
  const isPlayingFull = playingKey === `conv-full-${conv.id}`;
  const allQuestionsAnswered = conv.questions.every(q => answers[q.id] !== undefined);

  return (
    <div className="premium-card p-0 overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-xl space-y-0">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-transparent">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-md shadow-indigo-600/30">
            {index + 1}
          </span>
          <div>
            <h3 className="font-black text-slate-800 dark:text-slate-100 text-base">{conv.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{conv.context}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onPlayDialogue}
            className={cn(
              "px-5 py-2.5 rounded-2xl font-black text-xs transition-all flex items-center gap-2 border-2 cursor-pointer shadow-sm",
              isPlayingFull
                ? "bg-rose-500 text-white border-rose-500 animate-pulse"
                : "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700"
            )}
          >
            {isPlayingFull ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isPlayingFull ? 'Dừng hội thoại' : `🎧 Nghe Hội Thoại (${playbackRate}x)`}</span>
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Dialogue View / Transcript Toggle */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-700/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-indigo-500" />
              {showTranscript || allQuestionsAnswered ? 'Transcript Lời thoại' : '🔒 Lời thoại đang được ẩn trong lúc làm bài'}
            </span>
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              {showTranscript ? <><EyeOff className="w-3.5 h-3.5" /> Ẩn transcript</> : <><Eye className="w-3.5 h-3.5" /> Mở transcript</>}
            </button>
          </div>

          {(showTranscript || allQuestionsAnswered) && (
            <div className="space-y-3 pt-2 animate-in fade-in duration-300">
              {conv.speakers.map((spk, idx) => {
                const turnKey = `turn-${conv.id}-${idx}`;
                const isTurnPlaying = playingKey === turnKey;

                return (
                  <div key={idx} className="flex items-start gap-3 text-sm leading-relaxed p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                    <span className="font-black text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-lg flex-shrink-0">
                      {spk.name}
                    </span>
                    <p className="flex-1 text-slate-700 dark:text-slate-200">{spk.text}</p>
                    <button
                      onClick={() => onPlaySpeakerTurn(`${spk.name}: ${spk.text}`, turnKey)}
                      className={cn(
                        "p-1.5 rounded-lg border transition-all cursor-pointer",
                        isTurnPlaying ? "bg-indigo-600 text-white border-indigo-600 animate-pulse" : "text-slate-400 hover:text-indigo-600 border-transparent hover:border-slate-200"
                      )}
                      title="Nghe riêng lượt thoại này"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 3 Questions for the conversation */}
        <div className="space-y-6">
          {conv.questions.map((q, qIdx) => {
            const selected = answers[q.id];
            const isAnswered = selected !== undefined;
            const isCorrect = selected === q.correctAnswer;

            return (
              <div key={q.id} className="p-5 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center text-xs">
                      {qIdx + 1}
                    </span>
                    {q.question}
                  </p>
                  {isAnswered && (
                    <span className={cn(
                      "text-xs font-black px-2.5 py-1 rounded-full",
                      isCorrect ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300" : "bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300"
                    )}>
                      {isCorrect ? 'Đúng' : 'Sai'}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {q.choices.map((choice, cIdx) => {
                    const isChoiceCorrect = cIdx === q.correctAnswer;
                    const isChoiceSelected = selected === cIdx;

                    return (
                      <button
                        key={cIdx}
                        disabled={isAnswered}
                        onClick={() => onSelectAnswer(q.id, cIdx)}
                        className={cn(
                          "p-3.5 rounded-xl text-left border-2 text-xs font-bold transition-all flex items-center justify-between cursor-pointer",
                          !isAnswered && isChoiceSelected && "border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
                          !isAnswered && !isChoiceSelected && "border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 hover:border-blue-300 text-slate-700 dark:text-slate-300",
                          isAnswered && isChoiceCorrect && "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
                          isAnswered && isChoiceSelected && !isChoiceCorrect && "border-rose-500 bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400",
                          isAnswered && !isChoiceCorrect && !isChoiceSelected && "border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 opacity-50 text-slate-400",
                          isAnswered && "cursor-default"
                        )}
                      >
                        <span>{choice}</span>
                        {isAnswered && isChoiceCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-2 flex-shrink-0" />}
                        {isAnswered && isChoiceSelected && !isChoiceCorrect && <XCircle className="w-4 h-4 text-rose-500 ml-2 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div className="p-3 bg-amber-50/60 dark:bg-amber-500/5 rounded-xl border border-amber-100 dark:border-amber-500/20 text-xs space-y-1">
                    <p className="font-black text-emerald-700 dark:text-emerald-400">
                      ✅ Đáp án đúng: {q.choices[q.correctAnswer]}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">{q.explanationVi}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Vocabulary Highlights */}
        {conv.vocabHighlights && conv.vocabHighlights.length > 0 && (
          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
            <button
              onClick={() => setShowVocab(!showVocab)}
              className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center justify-between w-full cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                Từ vựng trọng tâm trong đoạn hội thoại ({conv.vocabHighlights.length} từ)
              </span>
              {showVocab ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showVocab && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 animate-in fade-in duration-300">
                {conv.vocabHighlights.map((v, vIdx) => (
                  <div key={vIdx} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <span className="font-black text-xs text-slate-800 dark:text-slate-100">{v.word}</span>
                      <span className="text-[10px] text-slate-400 ml-1.5">{v.ipa}</span>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{v.meaningVi}</p>
                    </div>
                    <button
                      onClick={() => playAudioText(v.word, { rate: 0.85 })}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 cursor-pointer"
                      title="Phát âm từ"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// Part 4 Short Talks Component
// ==========================================
function TalkCard({
  talk,
  index,
  total,
  answers,
  onSelectAnswer,
  playingKey,
  playbackRate,
  onPlayTalk
}: {
  talk: ToeicTalk;
  index: number;
  total: number;
  answers: Record<string, number>;
  onSelectAnswer: (qId: string, choiceIdx: number) => void;
  playingKey: string | null;
  playbackRate: number;
  onPlayTalk: () => void;
}) {
  const [showTranscript, setShowTranscript] = useState(false);
  const [showVocab, setShowVocab] = useState(false);
  const isPlaying = playingKey === `talk-${talk.id}`;
  const allAnswered = talk.questions.every(q => answers[q.id] !== undefined);

  return (
    <div className="premium-card p-0 overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-xl space-y-0">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-transparent">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-purple-600 text-white font-black flex items-center justify-center text-sm shadow-md shadow-purple-600/30">
            {index + 1}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-slate-800 dark:text-slate-100 text-base">{talk.title}</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-black uppercase bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                {talk.type}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{talk.context}</p>
          </div>
        </div>

        <button
          onClick={onPlayTalk}
          className={cn(
            "px-5 py-2.5 rounded-2xl font-black text-xs transition-all flex items-center gap-2 border-2 cursor-pointer shadow-sm",
            isPlaying
              ? "bg-rose-500 text-white border-rose-500 animate-pulse"
              : "bg-purple-600 text-white border-purple-600 hover:bg-purple-700"
          )}
        >
          {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span>{isPlaying ? 'Dừng bài nói' : `🎧 Nghe Bài Nói (${playbackRate}x)`}</span>
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Transcript Box */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-700/60 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Megaphone className="w-4 h-4 text-purple-500" />
              {showTranscript || allAnswered ? 'Transcript Bài nói' : '🔒 Lời thoại bài nói đang ẩn. Hãy nghe và chọn đáp án'}
            </span>
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              {showTranscript ? <><EyeOff className="w-3.5 h-3.5" /> Ẩn transcript</> : <><Eye className="w-3.5 h-3.5" /> Xem transcript</>}
            </button>
          </div>

          {(showTranscript || allAnswered) && (
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed pt-2 animate-in fade-in duration-300 italic">
              "{talk.audioScript}"
            </p>
          )}
        </div>

        {/* 3 Questions */}
        <div className="space-y-6">
          {talk.questions.map((q, qIdx) => {
            const selected = answers[q.id];
            const isAnswered = selected !== undefined;
            const isCorrect = selected === q.correctAnswer;

            return (
              <div key={q.id} className="p-5 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center text-xs">
                      {qIdx + 1}
                    </span>
                    {q.question}
                  </p>
                  {isAnswered && (
                    <span className={cn(
                      "text-xs font-black px-2.5 py-1 rounded-full",
                      isCorrect ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300" : "bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300"
                    )}>
                      {isCorrect ? 'Đúng' : 'Sai'}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {q.choices.map((choice, cIdx) => {
                    const isChoiceCorrect = cIdx === q.correctAnswer;
                    const isChoiceSelected = selected === cIdx;

                    return (
                      <button
                        key={cIdx}
                        disabled={isAnswered}
                        onClick={() => onSelectAnswer(q.id, cIdx)}
                        className={cn(
                          "p-3.5 rounded-xl text-left border-2 text-xs font-bold transition-all flex items-center justify-between cursor-pointer",
                          !isAnswered && isChoiceSelected && "border-purple-600 bg-purple-50/50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
                          !isAnswered && !isChoiceSelected && "border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 hover:border-purple-300 text-slate-700 dark:text-slate-300",
                          isAnswered && isChoiceCorrect && "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
                          isAnswered && isChoiceSelected && !isChoiceCorrect && "border-rose-500 bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400",
                          isAnswered && !isChoiceCorrect && !isChoiceSelected && "border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 opacity-50 text-slate-400",
                          isAnswered && "cursor-default"
                        )}
                      >
                        <span>{choice}</span>
                        {isAnswered && isChoiceCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-2 flex-shrink-0" />}
                        {isAnswered && isChoiceSelected && !isChoiceCorrect && <XCircle className="w-4 h-4 text-rose-500 ml-2 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div className="p-3 bg-amber-50/60 dark:bg-amber-500/5 rounded-xl border border-amber-100 dark:border-amber-500/20 text-xs space-y-1">
                    <p className="font-black text-emerald-700 dark:text-emerald-400">
                      ✅ Đáp án đúng: {q.choices[q.correctAnswer]}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">{q.explanationVi}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Vocab drawer */}
        {talk.vocabHighlights && (
          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
            <button
              onClick={() => setShowVocab(!showVocab)}
              className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center justify-between w-full cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-purple-500" />
                Từ vựng trọng tâm trong bài nói ({talk.vocabHighlights.length} từ)
              </span>
              {showVocab ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showVocab && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 animate-in fade-in duration-300">
                {talk.vocabHighlights.map((v, vIdx) => (
                  <div key={vIdx} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <span className="font-black text-xs text-slate-800 dark:text-slate-100">{v.word}</span>
                      <span className="text-[10px] text-slate-400 ml-1.5">{v.ipa}</span>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{v.meaningVi}</p>
                    </div>
                    <button
                      onClick={() => playAudioText(v.word, { rate: 0.85 })}
                      className="p-1.5 text-slate-400 hover:text-purple-600 cursor-pointer"
                      title="Phát âm từ"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// Traps & Strategy Tab Component
// ==========================================
function TrapsStrategyTab() {
  const [activeTrapFilter, setActiveTrapFilter] = useState<string>('all');

  const filteredTraps = useMemo(() => {
    if (activeTrapFilter === 'all') return LISTENING_TRAPS;
    return LISTENING_TRAPS.filter(t => t.category === activeTrapFilter);
  }, [activeTrapFilter]);

  const trapFilters = [
    { id: 'all', label: 'Tất cả bẫy (6)' },
    { id: 'people', label: '🧑 Bẫy Tranh Tả Người' },
    { id: 'object', label: '📦 Bẫy Tranh Tả Vật' },
    { id: 'scenery', label: '🏞️ Bẫy Tranh Tả Cảnh' },
    { id: 'combined', label: '👥📦 Bẫy Người & Vật' },
    { id: 'part2', label: '💬 Bẫy Part 2' },
    { id: 'part34', label: '👥📢 Bẫy Part 3 & 4' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="p-6 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent rounded-3xl border border-amber-200 dark:border-amber-900/40 space-y-2">
        <h2 className="text-xl font-black text-amber-800 dark:text-amber-300 flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-amber-600" />
          Cẩm Nang Nhận Diện Bẫy Đề Thi TOEIC Listening (Tranh Người, Vật, Cảnh & Part 2-4)
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          ETS thường xuyên đưa ra các phương án bẫy tinh vi đánh vào phản xạ nghe chưa vững của thí sinh. Hãy ghi nhớ các dạng bẫy kinh điển dưới đây để loại trừ ngay lập tức khi làm bài!
        </p>
      </div>

      {/* Trap Category Filter */}
      <div className="flex flex-wrap gap-2">
        {trapFilters.map(f => (
          <button
            key={f.id}
            onClick={() => setActiveTrapFilter(f.id)}
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border",
              activeTrapFilter === f.id
                ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-amber-400"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredTraps.map((trap, idx) => (
          <div key={trap.id} className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-md space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-black text-xs flex items-center justify-center shadow-md shadow-amber-500/20">
                  #{idx + 1}
                </span>
                <h3 className="font-black text-slate-800 dark:text-slate-100 text-base">{trap.title}</h3>
              </div>
              <span className="text-[10px] px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full font-black uppercase">
                Áp dụng: {trap.part}
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{trap.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-rose-50 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-900/40 space-y-1.5">
                <p className="font-black text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" /> Ví dụ Đáp Án Bẫy:
                </p>
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">{trap.exampleBad}</p>
              </div>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-900/40 space-y-1.5">
                <p className="font-black text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Đáp Án Đúng & Nhận Diện:
                </p>
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">{trap.exampleGood}</p>
              </div>
            </div>

            <div className="p-3.5 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-900/40 text-xs font-bold text-blue-800 dark:text-blue-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>{trap.tip}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// Main Page Component
// ==========================================
export default function ToeicListeningPracticePage() {
  const router = useRouter();
  const [tab, setTab] = useState<TabMode>('photo');
  const [photoCatFilter, setPhotoCatFilter] = useState<PhotoCategory>('all');
  const [playbackRate, setPlaybackRate] = useState<number>(0.85);

  // Part 1 & 2 State
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealedExplanations, setRevealedExplanations] = useState<Record<number, boolean>>({});
  const [playingKey, setPlayingKey] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Part 3 & 4 State
  const [convAnswers, setConvAnswers] = useState<Record<string, number>>({});
  const [talkAnswers, setTalkAnswers] = useState<Record<string, number>>({});

  // Part 1 Question filtering by category
  const filteredPhotoQuestions = useMemo(() => {
    if (photoCatFilter === 'all') return PHOTO_QUESTIONS;
    return PHOTO_QUESTIONS.filter(q => q.photoCategory === photoCatFilter);
  }, [photoCatFilter]);

  // Question list based on active tab
  const partQuestions = useMemo(() => {
    if (tab === 'photo') return filteredPhotoQuestions;
    if (tab === 'question-response') return QUESTION_RESPONSE_QUESTIONS;
    return [];
  }, [tab, filteredPhotoQuestions]);

  // Statistics calculation
  const totalPartAnswered = useMemo(() => Object.keys(answers).length, [answers]);
  const correctPartCount = useMemo(() => {
    return partQuestions.filter(q => answers[q.id] === q.correctAnswer).length;
  }, [partQuestions, answers]);

  const handleSelectAnswer = useCallback((questionId: number, choiceIdx: number) => {
    setAnswers(prev => {
      if (prev[questionId] !== undefined) return prev;
      return { ...prev, [questionId]: choiceIdx };
    });
  }, []);

  const handleSelectConvAnswer = useCallback((qId: string, choiceIdx: number) => {
    setConvAnswers(prev => {
      if (prev[qId] !== undefined) return prev;
      return { ...prev, [qId]: choiceIdx };
    });
  }, []);

  const handleSelectTalkAnswer = useCallback((qId: string, choiceIdx: number) => {
    setTalkAnswers(prev => {
      if (prev[qId] !== undefined) return prev;
      return { ...prev, [qId]: choiceIdx };
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
      rate: playbackRate,
      onEnd: () => setPlayingKey(null),
      onError: () => setPlayingKey(null)
    });
  }, [playingKey, playbackRate]);

  const handlePlayChoice = useCallback((choiceText: string, choiceKey: string) => {
    if (playingKey === choiceKey) {
      stopAudio();
      setPlayingKey(null);
      return;
    }

    setPlayingKey(choiceKey);
    playAudioText(choiceText, {
      rate: playbackRate,
      onEnd: () => setPlayingKey(null),
      onError: () => setPlayingKey(null)
    });
  }, [playingKey, playbackRate]);

  const handlePlayConv = useCallback((conv: ToeicConversation) => {
    const convKey = `conv-full-${conv.id}`;
    if (playingKey === convKey) {
      stopAudio();
      setPlayingKey(null);
      return;
    }

    setPlayingKey(convKey);
    playAudioText(conv.fullAudioScript, {
      rate: playbackRate,
      onEnd: () => setPlayingKey(null),
      onError: () => setPlayingKey(null)
    });
  }, [playingKey, playbackRate]);

  const handlePlayTalk = useCallback((talk: ToeicTalk) => {
    const talkKey = `talk-${talk.id}`;
    if (playingKey === talkKey) {
      stopAudio();
      setPlayingKey(null);
      return;
    }

    setPlayingKey(talkKey);
    playAudioText(talk.audioScript, {
      rate: playbackRate,
      onEnd: () => setPlayingKey(null),
      onError: () => setPlayingKey(null)
    });
  }, [playingKey, playbackRate]);

  const handleReset = useCallback(() => {
    stopAudio();
    setAnswers({});
    setRevealedExplanations({});
    setConvAnswers({});
    setTalkAnswers({});
    setPlayingKey(null);
    setShowResults(false);
  }, []);

  const handleTabChange = useCallback((newTab: TabMode) => {
    stopAudio();
    setTab(newTab);
    setAnswers({});
    setRevealedExplanations({});
    setPlayingKey(null);
    setShowResults(false);
  }, []);

  // Cleanup TTS on unmount
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const tabs: { id: TabMode; label: string; icon: React.ReactNode; count?: number; badge?: string }[] = [
    { id: 'photo', label: 'Part 1: Photographs', icon: <ImageIcon className="w-4 h-4" />, count: PHOTO_QUESTIONS.length },
    { id: 'question-response', label: 'Part 2: Q-Response', icon: <MessageCircleQuestion className="w-4 h-4" />, count: QUESTION_RESPONSE_QUESTIONS.length },
    { id: 'conversations', label: 'Part 3: Conversations', icon: <Users className="w-4 h-4" />, count: TOEIC_CONVERSATIONS.length, badge: 'NEW' },
    { id: 'talks', label: 'Part 4: Short Talks', icon: <Megaphone className="w-4 h-4" />, count: TOEIC_TALKS.length, badge: 'NEW' },
    { id: 'traps', label: 'Bẫy & Chiến Thuật', icon: <ShieldAlert className="w-4 h-4" />, count: LISTENING_TRAPS.length, badge: 'PRO' },
  ];

  const photoCategories: { id: PhotoCategory; label: string; icon: string; count: number }[] = [
    { id: 'all', label: 'Tất cả tranh', icon: '🌟', count: PHOTO_QUESTIONS.length },
    { id: 'object', label: 'Tranh Tả Vật', icon: '📦', count: PHOTO_QUESTIONS.filter(q => q.photoCategory === 'object').length },
    { id: 'people', label: 'Tranh Tả Người', icon: '🧑', count: PHOTO_QUESTIONS.filter(q => q.photoCategory === 'people').length },
    { id: 'scenery', label: 'Tranh Phong Cảnh', icon: '🏞️', count: PHOTO_QUESTIONS.filter(q => q.photoCategory === 'scenery').length },
    { id: 'combined', label: 'Người & Vật/Cảnh', icon: '👥📦', count: PHOTO_QUESTIONS.filter(q => q.photoCategory === 'combined').length },
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
              <span className="text-[10px] font-black uppercase tracking-widest">TOEIC Master Listening Suite</span>
              <span className="text-[9px] px-2 py-0.5 bg-amber-400 text-amber-950 rounded-full font-black">PHÂN LOẠI 4 NHÓM TRANH & BẪY 🔥</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
              Luyện Nghe TOEIC Chuyên Sâu
              <br />
              <span className="bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">
                Tranh Người • Vật • Cảnh • Hội Thoại & Bẫy
              </span>
            </h1>

            <p className="text-blue-200/80 text-sm font-medium max-w-xl">
              Hệ thống luyện nghe toàn diện với ngân hàng câu hỏi phân loại chi tiết theo 4 nhóm tranh (Người, Vật, Phong cảnh, Hỗn hợp), rà soát 100% hình ảnh thực tế khớp chính xác với đáp án, cùng cẩm nang bẫy đề thi.
            </p>

            {/* Quick Stats Banner */}
            <div className="flex flex-wrap gap-4 text-blue-200/80 text-xs font-bold">
              <div className="flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-cyan-300" />
                <span>{PHOTO_QUESTIONS.length} Tranh Part 1 (Đã Phân Loại)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircleQuestion className="w-3.5 h-3.5 text-cyan-300" />
                <span>{QUESTION_RESPONSE_QUESTIONS.length} Câu Part 2</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-cyan-300" />
                <span>{TOEIC_CONVERSATIONS.length} Hội thoại Part 3</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Megaphone className="w-3.5 h-3.5 text-cyan-300" />
                <span>{TOEIC_TALKS.length} Bài nói Part 4</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Playback Speed Controller Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
          <Clock className="w-4 h-4 text-indigo-500" />
          <span>Tốc độ phát âm thanh:</span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          {[
            { rate: 0.75, label: '0.75x (Chậm)' },
            { rate: 0.85, label: '0.85x (Chuẩn)' },
            { rate: 1.0, label: '1.0x (Thi thật)' },
            { rate: 1.25, label: '1.25x (Nhanh)' }
          ].map(r => (
            <button
              key={r.rate}
              onClick={() => {
                stopAudio();
                setPlaybackRate(r.rate);
              }}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer",
                playbackRate === r.rate
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Selector */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => handleTabChange(t.id)}
            className={cn(
              "flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-2 rounded-xl font-bold text-xs transition-all cursor-pointer",
              tab === t.id
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-md"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            )}
          >
            {t.icon}
            <span>{t.label}</span>
            {t.count !== undefined && (
              <span className="text-[10px] px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full font-black">
                {t.count}
              </span>
            )}
            {t.badge && (
              <span className="text-[9px] px-1.5 py-0.5 bg-amber-400 text-amber-950 rounded-full font-black">
                {t.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Part 1 Category Filter Bar */}
      {tab === 'photo' && (
        <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-2 animate-in fade-in duration-300">
          <div className="flex items-center gap-1.5 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">
            <Layers className="w-3.5 h-3.5 text-indigo-500" />
            <span>Phân loại tranh Part 1 theo dạng bài:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {photoCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  stopAudio();
                  setPhotoCatFilter(cat.id);
                }}
                className={cn(
                  "px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer border",
                  photoCatFilter === cat.id
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md scale-105"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-400"
                )}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className={cn(
                  "text-[10px] px-1.5 py-0.2 rounded-full font-bold",
                  photoCatFilter === cat.id ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                )}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Part 1 & 2 Progress Bar */}
      {(tab === 'photo' || tab === 'question-response') && totalPartAnswered > 0 && (
        <div className="premium-card p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-blue-500" /> Tiến trình
            </span>
            <span className="text-xs font-black text-slate-700 dark:text-slate-300">
              {totalPartAnswered} / {partQuestions.length} câu • <span className="text-emerald-600 dark:text-emerald-400">{correctPartCount} đúng</span>
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${(totalPartAnswered / partQuestions.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Tab Content */}
      {tab === 'traps' ? (
        <TrapsStrategyTab />
      ) : tab === 'conversations' ? (
        <div className="space-y-8">
          {TOEIC_CONVERSATIONS.map((conv, idx) => (
            <ConversationCard
              key={conv.id}
              conv={conv}
              index={idx}
              total={TOEIC_CONVERSATIONS.length}
              answers={convAnswers}
              onSelectAnswer={handleSelectConvAnswer}
              playingKey={playingKey}
              playbackRate={playbackRate}
              onPlayDialogue={() => handlePlayConv(conv)}
              onPlaySpeakerTurn={(text, turnKey) => {
                if (playingKey === turnKey) {
                  stopAudio();
                  setPlayingKey(null);
                  return;
                }
                setPlayingKey(turnKey);
                playAudioText(text, {
                  rate: playbackRate,
                  onEnd: () => setPlayingKey(null),
                  onError: () => setPlayingKey(null)
                });
              }}
            />
          ))}
        </div>
      ) : tab === 'talks' ? (
        <div className="space-y-8">
          {TOEIC_TALKS.map((talk, idx) => (
            <TalkCard
              key={talk.id}
              talk={talk}
              index={idx}
              total={TOEIC_TALKS.length}
              answers={talkAnswers}
              onSelectAnswer={handleSelectTalkAnswer}
              playingKey={playingKey}
              playbackRate={playbackRate}
              onPlayTalk={() => handlePlayTalk(talk)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {partQuestions.map((q, idx) => (
            <QuestionCard
              key={q.id}
              question={q}
              index={idx}
              total={partQuestions.length}
              selected={answers[q.id] ?? null}
              onSelect={(choiceIdx) => handleSelectAnswer(q.id, choiceIdx)}
              revealed={!!revealedExplanations[q.id]}
              onReveal={() => handleReveal(q.id)}
              playingKey={playingKey}
              playbackRate={playbackRate}
              onPlayFull={() => handlePlayFull(q)}
              onPlayChoice={(choiceText, choiceKey) => handlePlayChoice(choiceText, choiceKey)}
            />
          ))}
        </div>
      )}

      {/* Bottom Actions */}
      {totalPartAnswered > 0 && !showResults && (tab === 'photo' || tab === 'question-response') && (
        <div className="flex justify-between items-center">
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-black text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> Làm Lại Từ Đầu
          </button>
        </div>
      )}
    </div>
  );
}
