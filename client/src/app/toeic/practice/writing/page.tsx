'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Brain, Sparkles, Loader2, Play, Award, CheckCircle2,
  XCircle, Copy, Check, RotateCcw, AlertCircle, Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { getWritingChallenge, evaluateWritingChallenge } from '@/services/toeic-writing.service';

interface Challenge {
  photoId: string;
  imageDescription: string;
  keywords: string[];
  minWords: number;
  maxWords: number;
}

interface EvaluationResult {
  grammarScore: number;
  lengthScore: number;
  relevanceScore: number;
  styleScore: number;
  overallScore: number;
  correctedText: string;
  feedback: string;
  xpRewarded?: number;
}

export default function TOEICWritingPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [userText, setUserText] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [copied, setCopied] = useState(false);

  // Load a new writing challenge
  const loadChallenge = async () => {
    try {
      setLoading(true);
      setResult(null);
      setUserText('');
      const token = user ? await user.getIdToken() : undefined;
      const data = await getWritingChallenge(token);
      setChallenge(data);
    } catch (err) {
      console.error('Failed to load writing challenge:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChallenge();
  }, [user]);

  // Handle evaluation submission
  const handleSubmit = async () => {
    if (!challenge || !userText.trim() || evaluating) return;

    try {
      setEvaluating(true);
      const token = user ? await user.getIdToken() : undefined;
      const res = await evaluateWritingChallenge({
        challenge,
        userText,
        userId: user?.uid || 'anonymous'
      }, token);
      setResult(res);
    } catch (err) {
      console.error('Failed to evaluate writing:', err);
      alert('Không thể chấm bài. Vui lòng kiểm tra lại kết nối mạng!');
    } finally {
      setEvaluating(false);
    }
  };

  // Helper: check word count
  const getWordCount = (text: string) => {
    const cleanText = text.trim();
    if (!cleanText) return 0;
    return cleanText.split(/\s+/).length;
  };

  const wordCount = getWordCount(userText);
  const isLengthValid = challenge ? (wordCount >= challenge.minWords && wordCount <= challenge.maxWords) : false;

  // Helper: check if keyword is in typed text (simple lower case check)
  const isKeywordMatched = (kw: string) => {
    return userText.toLowerCase().includes(kw.toLowerCase());
  };

  const allKeywordsMatched = challenge ? challenge.keywords.every(kw => isKeywordMatched(kw)) : false;

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.correctedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6">
        <Loader2 className="w-12 h-12 text-[#10b981] animate-spin" />
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-800 animate-pulse">Đang tải đề thi viết...</h2>
          <p className="text-sm text-slate-400 font-bold">AI đang lựa chọn bức ảnh công sở ngẫu nhiên</p>
        </div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <AlertCircle className="w-16 h-16 text-rose-500" />
        <h2 className="text-2xl font-black text-slate-800">Không thể tải đề thi</h2>
        <button 
          onClick={loadChallenge}
          className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl text-sm"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 animate-in fade-in duration-500">
      {/* Breadcrumb Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => router.push('/toeic')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-700 font-bold text-sm transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại TOEIC Center
        </button>
        <span className="px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-full text-xs font-bold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          TOEIC Writing Part 1
        </span>
      </div>

      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl font-black text-slate-800">✍️ Luyện Viết Mô Tả Tranh</h1>
        <p className="text-sm text-slate-500 font-semibold leading-relaxed">
          Viết một câu hoặc đoạn miêu tả ngắn dựa trên bức ảnh và các từ khóa bắt buộc dưới đây.
        </p>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column - Image Display */}
        <div className="space-y-4">
          <div className="premium-card p-2 border-slate-100 shadow-xl overflow-hidden rounded-3xl bg-white">
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-slate-100">
              <img 
                src={`https://images.unsplash.com/${challenge.photoId}?auto=format&fit=crop&w=800&q=80`}
                alt="TOEIC Writing Scene"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="p-4 bg-slate-50 border border-slate-200/50 rounded-2xl space-y-2">
            <div className="flex items-center gap-1.5 text-slate-700 font-black text-xs uppercase tracking-wider">
              <Info className="w-4 h-4" />
              <span>Gợi ý bối cảnh bức ảnh (Tiếng Việt)</span>
            </div>
            <p className="text-xs font-semibold text-slate-500 leading-relaxed">
              {challenge.imageDescription}
            </p>
          </div>
        </div>

        {/* Right Column - Work area & Keywords */}
        <div className="space-y-6">
          <div className="premium-card p-6 border-slate-100 shadow-xl space-y-6 bg-white">
            
            {/* Keywords section */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Từ khóa bắt buộc sử dụng</h3>
              <div className="flex flex-wrap gap-2.5">
                {challenge.keywords.map((kw, idx) => {
                  const matched = isKeywordMatched(kw);
                  return (
                    <span 
                      key={idx} 
                      className={cn(
                        "px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 border",
                        matched 
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                          : "bg-slate-50 border-slate-200 text-slate-600"
                      )}
                    >
                      {matched ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />}
                      {kw}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Word count limits */}
            <div className="space-y-3 border-t border-slate-50 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Giới hạn độ dài</h3>
                <span className={cn(
                  "text-xs font-bold px-2 py-0.5 rounded-lg",
                  isLengthValid ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-600"
                )}>
                  Yêu cầu: {challenge.minWords} - {challenge.maxWords} từ
                </span>
              </div>
              
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Số từ đã viết:</span>
                <span className={cn(
                  "font-black text-sm",
                  isLengthValid ? "text-emerald-600" : "text-amber-500"
                )}>{wordCount} từ</span>
              </div>
            </div>

            {/* Textarea */}
            <div className="space-y-2 border-t border-slate-50 pt-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Bài viết của bạn</h3>
              <textarea
                value={userText}
                onChange={(e) => setUserText(e.target.value)}
                disabled={evaluating || !!result}
                placeholder="Ví dụ: Some workers are having a meeting in the conference room with laptops..."
                className="w-full h-32 p-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 focus:border-emerald-500 focus:bg-white focus:outline-none transition-all rounded-2xl text-sm font-semibold text-slate-700 dark:text-slate-200 placeholder:text-slate-400 resize-none leading-relaxed"
              />
            </div>

            {/* Action buttons */}
            <div className="flex gap-4">
              {!result ? (
                <button
                  onClick={handleSubmit}
                  disabled={evaluating || !userText.trim() || wordCount < challenge.minWords}
                  className="flex-1 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-sm rounded-2xl shadow-xl shadow-emerald-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {evaluating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      GIÁM KHẢO AI ĐANG CHẤM BÀI...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      NỘP BÀI CHẤM ĐIỂM
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={loadChallenge}
                  className="flex-1 py-3.5 bg-slate-900 text-white font-black text-sm rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-5 h-5" />
                  THỬ THÁCH TIẾP THEO
                </button>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* AI Score Breakdown & Feedback */}
      {result && (
        <div className="premium-card p-8 border-emerald-100 bg-gradient-to-br from-white to-emerald-50/10 shadow-2xl rounded-3xl space-y-8 animate-in fade-in slide-in-from-top-6 duration-500">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-6 gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Award className="w-8 h-8 text-white animate-bounce" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-800">Kết Quả Đánh Giá Từ Giám Khảo AI</h2>
                <p className="text-xs text-slate-400 font-bold flex items-center gap-1.5 mt-0.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  {result.xpRewarded && result.xpRewarded > 0 ? `Chúc mừng! Bạn được thưởng +${result.xpRewarded} XP` : 'Hoàn thành bài viết'}
                </p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <div className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {result.overallScore} / 100
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Overall Band Score</p>
            </div>
          </div>

          {/* Criteria Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Criteria 1 */}
            <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-2">
              <div className="flex justify-between items-center text-xs font-black text-slate-400 uppercase tracking-wider">
                <span>Đúng (Grammar)</span>
                <span className="text-slate-800 font-extrabold">{result.grammarScore} / 10</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${result.grammarScore * 10}%` }}
                />
              </div>
            </div>

            {/* Criteria 2 */}
            <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-2">
              <div className="flex justify-between items-center text-xs font-black text-slate-400 uppercase tracking-wider">
                <span>Dài (Length)</span>
                <span className="text-slate-800 font-extrabold">{result.lengthScore} / 10</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-sky-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${result.lengthScore * 10}%` }}
                />
              </div>
            </div>

            {/* Criteria 3 */}
            <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-2">
              <div className="flex justify-between items-center text-xs font-black text-slate-400 uppercase tracking-wider">
                <span>Hợp lý (Relevance)</span>
                <span className="text-slate-800 font-extrabold">{result.relevanceScore} / 10</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${result.relevanceScore * 10}%` }}
                />
              </div>
            </div>

            {/* Criteria 4 */}
            <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-2">
              <div className="flex justify-between items-center text-xs font-black text-slate-400 uppercase tracking-wider">
                <span>Hay (Vocabulary)</span>
                <span className="text-slate-800 font-extrabold">{result.styleScore} / 10</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-purple-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${result.styleScore * 10}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
            {/* Left Box - Corrected & Feedback */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Corrected Text card */}
              <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-3 relative">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Bản sửa lỗi tối ưu từ AI</h3>
                  <button 
                    onClick={handleCopy}
                    className="p-1.5 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer text-slate-400 hover:text-slate-600"
                  >
                    {copied ? <Check className="w-4.5 h-4.5 text-emerald-600" /> : <Copy className="w-4.5 h-4.5" />}
                  </button>
                </div>
                <p className="text-sm font-black text-emerald-700 bg-emerald-500/5 border border-emerald-100/50 p-4 rounded-xl leading-relaxed italic">
                  "{result.correctedText}"
                </p>
              </div>

              {/* General Feedback markdown */}
              <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-3">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Nhận xét chi tiết</h3>
                <div className="text-slate-600 text-xs font-semibold leading-relaxed space-y-2 whitespace-pre-line">
                  {result.feedback}
                </div>
              </div>

            </div>

            {/* Right Box - Overview comparisons */}
            <div className="space-y-4">
              <div className="p-5 bg-slate-900 text-white rounded-2xl shadow-sm space-y-4">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Đối chiếu cấu trúc</h3>
                
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase text-rose-400">Câu của bạn:</span>
                  <p className="text-xs font-bold text-slate-300 leading-relaxed italic">"{userText}"</p>
                </div>

                <div className="border-t border-slate-800 pt-3 space-y-2">
                  <span className="text-[10px] font-black uppercase text-emerald-400">Đề xuất nâng cấp:</span>
                  <p className="text-xs font-bold text-slate-200 leading-relaxed italic">"{result.correctedText}"</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
