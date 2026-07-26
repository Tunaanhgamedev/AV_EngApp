'use client';

import React, { useState } from 'react';
import { Mic } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SpeechPracticeSection({ targetWord }: { targetWord: string }) {
  const [isRecording, setIsRecording] = useState(false);
  const [resultText, setResultText] = useState('');
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const startListening = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setErrorMessage('Trình duyệt không hỗ trợ nhận diện giọng nói (API Web Speech). Hãy dùng Chrome/Safari.');
      return;
    }

    setResultText('');
    setAccuracy(null);
    setErrorMessage('');
    setIsRecording(true);

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      setResultText(speechToText);

      const targetClean = targetWord.toLowerCase().replace(/[^a-z]/g, '');
      const spokenClean = speechToText.toLowerCase().replace(/[^a-z]/g, '');

      if (spokenClean === targetClean) {
        setAccuracy(100);
      } else if (spokenClean.includes(targetClean) || targetClean.includes(spokenClean)) {
        setAccuracy(80);
      } else {
        setAccuracy(30);
      }
    };

    recognition.onerror = (event: any) => {
      console.error(event);
      setErrorMessage('Không nhận diện được giọng nói hoặc micro bị chặn.');
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
      <div className="flex-1 min-w-0 text-left">
        <h4 className="text-xs font-black text-violet-600 uppercase tracking-widest">Luyện phát âm AI</h4>
        <p className="text-xs text-slate-500 mt-0.5 font-medium">Nhấp vào micro, đọc từ ví dụ <strong className="text-slate-800">"{targetWord}"</strong> để kiểm tra.</p>

        {resultText && (
          <p className="text-xs text-slate-800 mt-2 font-semibold">
            Bạn đã đọc: <span className="text-violet-600 font-bold">"{resultText}"</span>
          </p>
        )}

        {accuracy !== null && (
          <div className="flex flex-wrap items-center gap-2 mt-1.5">
            <span className={cn(
              "text-[10px] font-black px-2.5 py-0.5 rounded-full",
              accuracy === 100 ? "bg-emerald-100 text-emerald-700" : accuracy >= 80 ? "bg-blue-100 text-blue-700" : "bg-rose-100 text-rose-700"
            )}>
              Độ khớp: {accuracy}%
            </span>
            <span className="text-xs font-bold text-slate-600">
              {accuracy === 100 ? 'Rất tuyệt vời! Phát âm hoàn hảo.' : accuracy >= 80 ? 'Khá tốt, gần chính xác!' : 'Chưa khớp lắm, hãy thử lại.'}
            </span>
          </div>
        )}

        {errorMessage && (
          <p className="text-xs text-rose-500 mt-2 font-medium">⚠️ {errorMessage}</p>
        )}
      </div>

      <button
        onClick={startListening}
        disabled={isRecording}
        className={cn(
          "w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md shrink-0",
          isRecording
            ? "bg-rose-600 text-white animate-pulse"
            : "bg-violet-100 text-violet-600 border border-violet-200 hover:bg-violet-600 hover:text-white"
        )}
        title="Bấm để ghi âm"
      >
        <Mic className="w-5 h-5" />
      </button>
    </div>
  );
}
