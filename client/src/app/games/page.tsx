'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Gamepad2, Zap, Trophy, Target, Brain, Timer, Star, ChevronRight, Flame, Sparkles, X, CheckCircle2, RotateCcw, Play, RefreshCw, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

// ─── Speak Utility ─────────────────────────────────────────────────────────────
const speak = (text: string) => {
  if (typeof window === 'undefined') return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  u.rate = 0.8;
  const voices = window.speechSynthesis.getVoices();
  const v = voices.find(v => v.lang === 'en-US' && v.name.includes('Google')) || voices.find(v => v.lang === 'en-US');
  if (v) u.voice = v;
  window.speechSynthesis.speak(u);
};

// ─── Huge Static Pools (Offline Fallbacks & Diversification) ────────────────────
const STATIC_WORD_PAIRS = [
  { en: 'Abundant', vi: 'Phong phú' },
  { en: 'Ambiguous', vi: 'Mơ hồ' },
  { en: 'Eloquent', vi: 'Hùng hồn' },
  { en: 'Diligent', vi: 'Chăm chỉ' },
  { en: 'Sincere', vi: 'Chân thành' },
  { en: 'Resilient', vi: 'Kiên cường' },
  { en: 'Generous', vi: 'Hào phóng' },
  { en: 'Persevere', vi: 'Kiên trì' },
  { en: 'Benevolent', vi: 'Nhân từ' },
  { en: 'Courageous', vi: 'Dũng cảm' },
  { en: 'Impartial', vi: 'Công bằng' },
  { en: 'Meticulous', vi: 'Tỉ mỉ' },
  { en: 'Optimistic', vi: 'Lạc quan' },
  { en: 'Pragmatic', vi: 'Thực tế' },
  { en: 'Vibrant', vi: 'Sôi động' },
  { en: 'Plentiful', vi: 'Dồi dào' },
  { en: 'Compassion', vi: 'Lòng trắc ẩn' },
  { en: 'Endurance', vi: 'Sức chịu đựng' }
];

const STATIC_QUIZ_QUESTIONS = [
  { q: 'Từ "Generous" trong tiếng Việt có nghĩa là gì?', options: ['Rộng lượng, hào phóng', 'Tự cao, ích kỷ', 'Lười biếng', 'Nóng giận'], answer: 0 },
  { q: 'Chọn dạng quá khứ phân từ của từ "Go":', options: ['Went', 'Gone', 'Going', 'Goed'], answer: 1 },
  { q: 'Từ "Persevere" mang ý nghĩa gì?', options: ['Từ bỏ dễ dàng', 'Kiên trì bền bỉ', 'Nghi ngờ, lo lắng', 'Tức giận'], answer: 1 },
  { q: 'Từ nào sau đây đồng nghĩa với "Happy"?', options: ['Sad', 'Angry', 'Joyful', 'Tired'], answer: 2 },
  { q: 'Điền từ: "She ___ to school every day." (Hiện tại đơn)', options: ['go', 'went', 'goes', 'going'], answer: 2 },
  { q: 'Từ "Benevolent" trong tiếng Việt có nghĩa là gì?', options: ['Độc ác', 'Nhân từ, tốt bụng', 'Tham lam', 'Nhút nhát'], answer: 1 },
  { q: 'Chọn từ viết đúng chính tả:', options: ['Accomodation', 'Acomodation', 'Accommodation', 'Acommodation'], answer: 2 },
  { q: 'Trái nghĩa với từ "Impartial" (Công bằng, không thiên vị) là gì?', options: ['Biased (Thiên vị)', 'Fair (Công bằng)', 'Neutral (Trung lập)', 'Objective (Khách quan)'], answer: 0 },
  { q: 'Điền vào chỗ trống: "If it rains, we ___ at home."', options: ['would stay', 'will stay', 'stayed', 'staying'], answer: 1 },
  { q: 'Ý nghĩa của từ "Meticulous" là gì?', options: ['Cẩu thả', 'Nhanh chóng', 'Kỹ càng, tỉ mỉ', 'Lười biếng'], answer: 2 },
];

const STATIC_SCRAMBLE_WORDS = [
  { word: 'APPLE', hint: 'Một quả táo giòn, ngọt, thường có màu đỏ hoặc xanh.' },
  { word: 'SCHOOL', hint: 'Nơi học sinh đến học tập và vui chơi mỗi ngày.' },
  { word: 'ENGLISH', hint: 'Ngôn ngữ quốc tế mà bạn đang học tập trên EngBot.' },
  { word: 'DOCTOR', hint: 'Người làm việc ở bệnh viện, chuyên khám chữa bệnh.' },
  { word: 'SUMMER', hint: 'Mùa nóng nhất trong năm, học sinh được nghỉ học.' },
  { word: 'GARDEN', hint: 'Khu vực trồng hoa hoặc cây cảnh xung quanh nhà.' },
  { word: 'JOURNAL', hint: 'Cuốn sổ ghi chép lại các sự kiện và nhật ký hàng ngày.' },
  { word: 'TEACHER', hint: 'Người truyền đạt kiến thức và hướng dẫn học sinh trên lớp.' },
  { word: 'LIBRARY', hint: 'Nơi lưu trữ và cho mượn hàng ngàn cuốn sách bổ ích.' },
  { word: 'FRIEND', hint: 'Người đồng hành thân thiết, chia sẻ niềm vui nỗi buồn.' }
];

const STATIC_SCRAMBLE_SENTENCES = [
  { sentence: 'She goes to school every day', hint: 'Cô ấy đi tới trường học mỗi ngày.' },
  { sentence: 'The cat is sleeping on the table', hint: 'Con mèo đang ngủ say giấc ở trên bàn.' },
  { sentence: 'We are learning English together', hint: 'Chúng tôi đang cùng nhau học tiếng Anh.' },
  { sentence: 'I love reading books in my free time', hint: 'Tôi rất thích đọc sách vào lúc rảnh rỗi.' },
  { sentence: 'What time do you usually wake up', hint: 'Bạn thường thức dậy vào khoảng mấy giờ?' },
  { sentence: 'He is playing soccer with his friends', hint: 'Anh ấy đang chơi bóng đá cùng với bạn bè của mình.' },
  { sentence: 'They will travel to Da Nang next week', hint: 'Họ sẽ đi du lịch đến Đà Nẵng vào tuần tới.' },
  { sentence: 'My mother cooks delicious meals for us', hint: 'Mẹ của tôi nấu những món ăn rất ngon cho chúng tôi.' },
  { sentence: 'Learning vocabulary with games is fun', hint: 'Học từ vựng thông qua các trò chơi rất vui nhộn.' }
];

const STATIC_SCRAMBLE_IDIOMS = [
  { idiom: 'A piece of cake', hint: 'Ám chỉ một công việc cực kỳ dễ dàng để thực hiện (Dễ như ăn bánh).' },
  { idiom: 'Break a leg', hint: 'Lời chúc may mắn thường dành cho các nghệ sĩ biểu diễn trước khi lên sân khấu.' },
  { idiom: 'Once in a blue moon', hint: 'Diễn tả một sự kiện cực kỳ hiếm khi xảy ra (Năm thì mười họa).' },
  { idiom: 'Under the weather', hint: 'Cảm thấy không khỏe, mệt mỏi nhẹ hoặc bị ốm do thời tiết thay đổi.' },
  { idiom: 'Bite the bullet', hint: 'Quyết tâm chấp nhận, cắn răng đối mặt với một tình huống khó khăn.' },
  { idiom: 'Cost an arm and a leg', hint: 'Cái gì đó cực kỳ đắt đỏ, tốn rất nhiều tiền để mua.' },
  { idiom: 'Spill the beans', hint: 'Vô tình tiết lộ bí mật hoặc thông tin mật cho người khác biết.' },
  { idiom: 'Hit the nail on the head', hint: 'Nói hoặc làm điều gì đó hoàn toàn chính xác, trúng tim đen.' },
  { idiom: 'Let the cat out of the bag', hint: 'Để lộ bí mật một cách vô ý hoặc bất ngờ.' },
];

// Helper to shuffle array
const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

interface Card {
  id: number;
  word: string;
  type: 'en' | 'vi';
  pairId: number;
  matched: boolean;
}

// ─── Vocabulary Match Game ────────────────────────────────────────────────────
function VocabMatchGame({ dbWords, onClose, awardXp }: { dbWords: any[]; onClose: () => void; awardXp?: (amount: number, reason: string) => void }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [selected, setSelected] = useState<Card[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);
  const [won, setWon] = useState(false);
  const [pairCount, setPairCount] = useState(6);

  const initGame = useCallback(() => {
    let pool = STATIC_WORD_PAIRS;
    if (dbWords && dbWords.length >= 6) {
      pool = dbWords.map(w => ({ en: w.word, vi: w.meaningVi }));
    }
    
    const selectedPairs = shuffle(pool).slice(0, 6);
    const deck: Card[] = [];
    selectedPairs.forEach((p, idx) => {
      const pairId = idx + 1;
      deck.push({ id: pairId * 10, word: p.en, type: 'en', pairId, matched: false });
      deck.push({ id: pairId * 10 + 1, word: p.vi, type: 'vi', pairId, matched: false });
    });
    
    setCards(shuffle(deck));
    setSelected([]);
    setMatches(0);
    setMoves(0);
    setTimer(0);
    setRunning(true);
    setWon(false);
    setPairCount(selectedPairs.length);
  }, [dbWords]);

  useEffect(() => { initGame(); }, [initGame]);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setTimer(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  const handleSelect = (card: Card) => {
    if (card.matched || selected.length === 2 || selected.find(c => c.id === card.id)) return;
    const next = [...selected, card];
    setSelected(next);
    if (card.type === 'en') speak(card.word);
    
    if (next.length === 2) {
      setMoves(m => m + 1);
      if (next[0].pairId === next[1].pairId) {
        setCards(prev => prev.map(c => c.pairId === next[0].pairId ? { ...c, matched: true } : c));
        setMatches(m => {
          const nm = m + 1;
          if (nm === pairCount) { 
            setRunning(false); 
            setWon(true); 
            awardXp?.(50, 'Vocab Match Game');
          }
          return nm;
        });
        setTimeout(() => setSelected([]), 300);
      } else {
        setTimeout(() => setSelected([]), 800);
      }
    }
  };

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div>
            <h2 className="text-xl font-black text-white">Vocabulary Match</h2>
            <p className="text-blue-200 text-xs font-medium">Nối từ tiếng Anh với nghĩa tiếng Việt tương ứng (Từ ngẫu nhiên)</p>
          </div>
          <div className="flex items-center gap-6 text-sm font-black">
            <div className="text-center"><p className="text-blue-200 text-[10px] uppercase tracking-widest font-bold">Thời gian</p><p className="text-xl">{fmt(timer)}</p></div>
            <div className="text-center"><p className="text-blue-200 text-[10px] uppercase tracking-widest font-bold">Lượt đi</p><p className="text-xl">{moves}</p></div>
            <div className="text-center"><p className="text-blue-200 text-[10px] uppercase tracking-widest font-bold">Đã ghép</p><p className="text-xl">{matches}/{pairCount}</p></div>
            <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white"><X className="w-5 h-5" /></button>
          </div>
        </div>

        {won ? (
          <div className="p-12 text-center space-y-6 animate-in zoom-in duration-500">
            <div className="text-6xl animate-bounce">🎉</div>
            <h3 className="text-3xl font-black text-slate-800">Xuất Sắc!</h3>
            <p className="text-slate-500 font-medium">Hoàn thành trong <strong>{fmt(timer)}</strong> với <strong>{moves} lượt đi</strong></p>
            <div className="flex gap-4 justify-center">
              <button onClick={initGame} className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/30"><RotateCcw className="w-4 h-4" /> Chơi Lại</button>
              <button onClick={onClose} className="px-8 py-3 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all">Quay Về</button>
            </div>
          </div>
        ) : (
          <div className="p-8 grid grid-cols-4 gap-3">
            {cards.map(card => {
              const isSel = selected.find(c => c.id === card.id);
              return (
                <button
                  key={card.id}
                  onClick={() => handleSelect(card)}
                  disabled={card.matched}
                  className={cn(
                    "h-16 rounded-2xl font-bold text-sm transition-all duration-300 border-2 leading-tight px-2 cursor-pointer",
                    card.matched
                      ? "bg-green-50 border-green-200 text-green-600 scale-95 cursor-default"
                      : isSel
                      ? "bg-indigo-600 border-indigo-600 text-white scale-105 shadow-lg"
                      : card.type === 'en'
                      ? "bg-slate-900 border-slate-700 text-white hover:scale-105 hover:shadow-md"
                      : "bg-blue-50 border-blue-100 text-blue-800 hover:scale-105 hover:shadow-md"
                  )}
                >
                  {card.matched ? <CheckCircle2 className="w-5 h-5 mx-auto text-green-500" /> : card.word}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Speed Quiz Game ───────────────────────────────────────────────────────────
function SpeedQuizGame({ dbWords, onClose, awardXp }: { dbWords: any[]; onClose: () => void; awardXp?: (amount: number, reason: string) => void }) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [done, setDone] = useState(false);

  const initGame = useCallback(() => {
    let generated: any[] = [];
    
    // Generate questions dynamically if database words are loaded
    if (dbWords && dbWords.length >= 10) {
      const shuffledWords = shuffle(dbWords);
      
      for (let index = 0; index < 5; index++) {
        const target = shuffledWords[index];
        const isFillInBlank = Math.random() > 0.5 && target.example && target.example.toLowerCase().includes(target.word.toLowerCase());
        
        // Option distraction pool (exclude target word)
        const distractors = shuffledWords
          .filter(w => w.word !== target.word)
          .slice(0, 3);
          
        if (isFillInBlank) {
          // Fill in the blank question
          const regex = new RegExp(`\\b${target.word}\\b`, 'gi');
          const blanked = target.example.replace(regex, '_______');
          
          const options = shuffle([target.word, ...distractors.map(d => d.word)]);
          const answer = options.indexOf(target.word);
          
          generated.push({
            q: `Điền từ thích hợp vào chỗ trống:\n"${blanked}" (${target.exampleVi || 'Dịch nghĩa câu'})`,
            options,
            answer
          });
        } else {
          // Meaning question
          const options = shuffle([target.meaningVi, ...distractors.map(d => d.meaningVi)]);
          const answer = options.indexOf(target.meaningVi);
          
          generated.push({
            q: `Từ "${target.word}" trong tiếng Việt mang ý nghĩa là gì?`,
            options,
            answer
          });
        }
      }
    }
    
    // Fallback to static questions if no DB or empty database
    if (generated.length === 0) {
      generated = shuffle(STATIC_QUIZ_QUESTIONS).slice(0, 5);
    }
    
    setQuestions(generated);
    setQIdx(0);
    setScore(0);
    setSelected(null);
    setTimeLeft(15);
    setDone(false);
  }, [dbWords]);

  useEffect(() => { initGame(); }, [initGame]);

  useEffect(() => {
    if (done && score > 0) {
      awardXp?.(score * 20, 'Speed Quiz Game');
    }
  }, [done, score, awardXp]);

  useEffect(() => {
    if (done || selected !== null || questions.length === 0) return;
    if (timeLeft === 0) { handleAnswer(-1); return; }
    const t = setTimeout(() => setTimeLeft(p => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, done, selected, questions]);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const q = questions[qIdx];
    if (idx === q.answer) setScore(s => s + 1);
    
    setTimeout(() => {
      if (qIdx < questions.length - 1) { 
        setQIdx(q => q + 1); 
        setSelected(null); 
        setTimeLeft(15); 
      } else { 
        setDone(true); 
      }
    }, 1200);
  };

  const q = questions[qIdx];
  const pct = (timeLeft / 15) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="px-8 py-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-black opacity-85">Câu hỏi {qIdx + 1}/{questions.length}</span>
            <span className={cn("text-2xl font-black", timeLeft <= 5 && "animate-pulse text-yellow-300")}>{timeLeft}s</span>
            <button onClick={onClose} className="p-1.5 bg-white/20 rounded-full text-white"><X className="w-4 h-4" /></button>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {done ? (
          <div className="p-10 text-center space-y-5 animate-in zoom-in duration-500">
            <div className="text-5xl">{score >= 4 ? '🏆' : score >= 3 ? '🎉' : '📚'}</div>
            <h3 className="text-2xl font-black text-slate-800">Trả lời đúng {score}/{questions.length} câu!</h3>
            <p className="text-slate-500 font-semibold">+{score * 20} XP</p>
            <div className="flex gap-3 justify-center">
              <button onClick={initGame} className="px-6 py-3 bg-rose-500 text-white rounded-2xl font-bold flex items-center gap-1 shadow-lg shadow-rose-500/30 cursor-pointer"><RotateCcw className="w-4 h-4" />Chơi Lại</button>
              <button onClick={onClose} className="px-6 py-3 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all">Quay Về</button>
            </div>
          </div>
        ) : q ? (
          <div className="p-8 space-y-6">
            <h3 className="text-xl font-black text-slate-800 leading-snug whitespace-pre-line">{q.q}</h3>
            <div className="grid grid-cols-1 gap-3">
              {q.options.map((opt: string, i: number) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={selected !== null}
                  className={cn(
                    "p-4 rounded-2xl text-sm font-bold border-2 text-left transition-all cursor-pointer",
                    selected === null ? "border-slate-100 hover:border-rose-300 hover:bg-rose-50/50" :
                    i === q.answer ? "bg-green-50 border-green-400 text-green-700" :
                    i === selected ? "bg-rose-50 border-rose-400 text-rose-700" :
                    "border-slate-100 opacity-40"
                  )}
                >{opt}</button>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500">Đang chuẩn bị câu hỏi...</div>
        )}
      </div>
    </div>
  );
}

// ─── Word Scramble Game (Nối Chữ Thành Từ) ──────────────────────────────────────
function WordScrambleGame({ dbWords, onClose, awardXp }: { dbWords: any[]; onClose: () => void; awardXp?: (amount: number, reason: string) => void }) {
  const [scrambleList, setScrambleList] = useState<any[]>([]);
  const [wordIdx, setWordIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [lettersPool, setLettersPool] = useState<{ char: string; originalIdx: number; used: boolean }[]>([]);
  const [answer, setAnswer] = useState<{ char: string; poolIdx: number }[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);

  const initGame = useCallback(() => {
    let pool = STATIC_SCRAMBLE_WORDS;
    if (dbWords && dbWords.length >= 8) {
      pool = dbWords.map(w => ({
        word: w.word.toUpperCase(),
        hint: `Từ loại: ${w.wordType || 'từ'}. Nghĩa Việt: ${w.meaningVi}${w.phonetic ? ` (Phiên âm: ${w.phonetic})` : ''}`
      }));
    }
    const list = shuffle(pool).slice(0, 6);
    setScrambleList(list);
    setWordIdx(0);
    setScore(0);
    setDone(false);
  }, [dbWords]);

  useEffect(() => { initGame(); }, [initGame]);

  useEffect(() => {
    if (done && score > 0) {
      awardXp?.(score * 15, 'Word Scramble Game');
    }
  }, [done, score, awardXp]);

  const activeWord = scrambleList[wordIdx];

  const initWord = useCallback(() => {
    if (!activeWord) return;
    const chars = activeWord.word.split('');
    const shuffled = chars
      .map((c: string, i: number) => ({ char: c, originalIdx: i, used: false }))
      .sort(() => Math.random() - 0.5);
    setLettersPool(shuffled);
    setAnswer([]);
    setIsCorrect(null);
  }, [activeWord]);

  useEffect(() => { initWord(); }, [initWord]);

  const selectChar = (poolIdx: number) => {
    if (lettersPool[poolIdx].used) return;
    const char = lettersPool[poolIdx].char;
    setLettersPool(prev => prev.map((item, i) => i === poolIdx ? { ...item, used: true } : item));
    setAnswer(prev => [...prev, { char, poolIdx }]);
    setIsCorrect(null);
  };

  const removeChar = (answerIdx: number) => {
    const item = answer[answerIdx];
    setLettersPool(prev => prev.map((l, i) => i === item.poolIdx ? { ...l, used: false } : l));
    setAnswer(prev => prev.filter((_, i) => i !== answerIdx));
    setIsCorrect(null);
  };

  const resetWord = () => {
    setLettersPool(prev => prev.map(l => ({ ...l, used: false })));
    setAnswer([]);
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    const spelled = answer.map(a => a.char).join('');
    if (spelled === activeWord.word) {
      setIsCorrect(true);
      setScore(s => s + 1);
      speak(activeWord.word);
      setTimeout(() => {
        if (wordIdx < scrambleList.length - 1) {
          setWordIdx(i => i + 1);
        } else {
          setDone(true);
        }
      }, 1500);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div>
            <h2 className="text-xl font-black text-white">Word Scramble</h2>
            <p className="text-purple-200 text-xs font-medium">Ghép các chữ cái xáo trộn thành một từ có nghĩa (Ngẫu nhiên)</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white"><X className="w-5 h-5" /></button>
        </div>

        {done ? (
          <div className="p-10 text-center space-y-5 animate-in zoom-in duration-500">
            <div className="text-5xl">🐝</div>
            <h3 className="text-2xl font-black text-slate-800">Hoàn Thành Ghép Chữ!</h3>
            <p className="text-slate-500 font-medium">Bạn đã ghép đúng {score}/{scrambleList.length} từ vựng.</p>
            <p className="text-green-600 font-black">+{score * 15} XP</p>
            <div className="flex gap-3 justify-center">
              <button onClick={initGame} className="px-6 py-3 bg-purple-600 text-white rounded-2xl font-bold flex items-center gap-1 shadow-lg shadow-purple-600/30 cursor-pointer"><RotateCcw className="w-4 h-4" />Chơi Lại</button>
              <button onClick={onClose} className="px-6 py-3 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all">Quay Về</button>
            </div>
          </div>
        ) : activeWord ? (
          <div className="p-8 space-y-6">
            {/* Hint Box */}
            <div className="p-4 bg-purple-50 border border-purple-100 rounded-2xl text-purple-800 text-sm font-medium leading-relaxed">
              <span className="font-bold block text-xs uppercase tracking-wider text-purple-600 mb-1">Gợi ý từ vựng</span>
              {activeWord?.hint}
            </div>

            {/* Answer Box */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Từ bạn ghép</span>
              <div className={cn(
                "min-h-16 p-3 rounded-2xl border-2 border-dashed flex flex-wrap gap-2 items-center justify-center transition-all duration-300",
                isCorrect === true ? "bg-green-50 border-green-400" :
                isCorrect === false ? "bg-red-50 border-red-400 animate-shake" :
                "bg-slate-50 border-slate-200"
              )}>
                {answer.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => removeChar(idx)}
                    className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 text-white font-black text-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm animate-in zoom-in duration-200"
                  >
                    {item.char}
                  </button>
                ))}
                {answer.length === 0 && <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Nhấp các chữ cái bên dưới để bắt đầu</span>}
              </div>
            </div>

            {/* Pool Box */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Các chữ cái</span>
              <div className="flex flex-wrap gap-2 justify-center">
                {lettersPool.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectChar(idx)}
                    disabled={item.used}
                    className={cn(
                      "w-12 h-12 rounded-xl text-lg font-black flex items-center justify-center border-2 transition-all cursor-pointer shadow-sm",
                      item.used 
                        ? "bg-slate-100 border-slate-200 text-slate-300 scale-95" 
                        : "bg-white border-purple-200 text-purple-700 hover:scale-115 hover:border-purple-400 active:scale-90"
                    )}
                  >
                    {item.char}
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-3 justify-end pt-2 border-t border-slate-100">
              <button 
                onClick={resetWord}
                className="px-4 py-2 border border-slate-200 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all flex items-center gap-1.5 text-slate-500 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Xóa Tất Cả
              </button>
              <button 
                onClick={checkAnswer}
                disabled={answer.length !== activeWord?.word.length}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:opacity-90 transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-indigo-600/20"
              >
                Kiểm Tra <Play className="w-3 h-3 fill-white text-white" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500">Đang chuẩn bị...</div>
        )}
      </div>
    </div>
  );
}

// ─── Sentence Builder Game (Nối Từ Thành Câu) ───────────────────────────────────
function SentenceBuilderGame({ dbWords, onClose, awardXp }: { dbWords: any[]; onClose: () => void; awardXp?: (amount: number, reason: string) => void }) {
  const [sentenceList, setSentenceList] = useState<any[]>([]);
  const [sentIdx, setSentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [wordsPool, setWordsPool] = useState<{ word: string; originalIdx: number; used: boolean }[]>([]);
  const [answer, setAnswer] = useState<{ word: string; poolIdx: number }[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);

  const initGame = useCallback(() => {
    let pool = STATIC_SCRAMBLE_SENTENCES;
    
    if (dbWords && dbWords.length >= 5) {
      // Find database words that have proper example sentences
      const dbPool = dbWords
        .filter(w => w.example && w.example.split(' ').length >= 4 && w.example.split(' ').length <= 10)
        .map(w => {
          // Clean sentence punctuation at end (keep it simple for scramble)
          const cleanSentence = w.example.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, '').trim();
          return {
            sentence: cleanSentence,
            hint: w.exampleVi || `Ví dụ của từ "${w.word}"`
          };
        });
      
      if (dbPool.length >= 4) {
        pool = dbPool;
      }
    }

    const list = shuffle(pool).slice(0, 5);
    setSentenceList(list);
    setSentIdx(0);
    setScore(0);
    setDone(false);
  }, [dbWords]);

  useEffect(() => { initGame(); }, [initGame]);

  useEffect(() => {
    if (done && score > 0) {
      awardXp?.(score * 20, 'Sentence Builder Game');
    }
  }, [done, score, awardXp]);

  const activeSent = sentenceList[sentIdx];

  const initSentence = useCallback(() => {
    if (!activeSent) return;
    const words = activeSent.sentence.split(/\s+/);
    const shuffled = words
      .map((w: string, i: number) => ({ word: w, originalIdx: i, used: false }))
      .sort(() => Math.random() - 0.5);
    setWordsPool(shuffled);
    setAnswer([]);
    setIsCorrect(null);
  }, [activeSent]);

  useEffect(() => { initSentence(); }, [initSentence]);

  const selectWord = (poolIdx: number) => {
    if (wordsPool[poolIdx].used) return;
    const word = wordsPool[poolIdx].word;
    setWordsPool(prev => prev.map((item, i) => i === poolIdx ? { ...item, used: true } : item));
    setAnswer(prev => [...prev, { word, poolIdx }]);
    setIsCorrect(null);
  };

  const removeWord = (answerIdx: number) => {
    const item = answer[answerIdx];
    setWordsPool(prev => prev.map((w, i) => i === item.poolIdx ? { ...w, used: false } : w));
    setAnswer(prev => prev.filter((_, i) => i !== answerIdx));
    setIsCorrect(null);
  };

  const resetSentence = () => {
    setWordsPool(prev => prev.map(w => ({ ...w, used: false })));
    setAnswer([]);
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    const spelled = answer.map(a => a.word).join(' ');
    // Match case-insensitively for flexibility
    if (spelled.trim().toLowerCase() === activeSent.sentence.trim().toLowerCase()) {
      setIsCorrect(true);
      setScore(s => s + 1);
      speak(activeSent.sentence);
      setTimeout(() => {
        if (sentIdx < sentenceList.length - 1) {
          setSentIdx(i => i + 1);
        } else {
          setDone(true);
        }
      }, 1500);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div>
            <h2 className="text-xl font-black text-white">Sentence Builder</h2>
            <p className="text-emerald-200 text-xs font-medium">Sắp xếp các từ xáo trộn để tạo thành câu hoàn chỉnh (Từ dữ liệu bài học)</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white"><X className="w-5 h-5" /></button>
        </div>

        {done ? (
          <div className="p-10 text-center space-y-5 animate-in zoom-in duration-500">
            <div className="text-5xl">✍️</div>
            <h3 className="text-2xl font-black text-slate-800">Hoàn Thành Ghép Câu!</h3>
            <p className="text-slate-500 font-medium">Bạn đã sắp xếp đúng {score}/{sentenceList.length} câu hoàn chỉnh.</p>
            <p className="text-green-600 font-black">+{score * 20} XP</p>
            <div className="flex gap-3 justify-center">
              <button onClick={initGame} className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold flex items-center gap-1 shadow-lg shadow-emerald-600/30 cursor-pointer"><RotateCcw className="w-4 h-4" />Chơi Lại</button>
              <button onClick={onClose} className="px-6 py-3 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all">Quay Về</button>
            </div>
          </div>
        ) : activeSent ? (
          <div className="p-8 space-y-6">
            {/* Hint Box */}
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-800 text-sm font-medium leading-relaxed">
              <span className="font-bold block text-xs uppercase tracking-wider text-emerald-600 mb-1">Nghĩa tiếng Việt của câu</span>
              {activeSent?.hint}
            </div>

            {/* Answer Box */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Câu bạn đang ghép</span>
              <div className={cn(
                "min-h-20 p-4 rounded-2xl border-2 border-dashed flex flex-wrap gap-2.5 items-center justify-center transition-all duration-300",
                isCorrect === true ? "bg-green-50 border-green-400" :
                isCorrect === false ? "bg-red-50 border-red-400 animate-shake" :
                "bg-slate-50 border-slate-200"
              )}>
                {answer.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => removeWord(idx)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm animate-in zoom-in duration-200"
                  >
                    {item.word}
                  </button>
                ))}
                {answer.length === 0 && <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Nhấp các từ bên dưới để bắt đầu sắp xếp</span>}
              </div>
            </div>

            {/* Pool Box */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Các từ vựng</span>
              <div className="flex flex-wrap gap-2.5 justify-center">
                {wordsPool.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectWord(idx)}
                    disabled={item.used}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-bold flex items-center justify-center border-2 transition-all cursor-pointer shadow-sm",
                      item.used 
                        ? "bg-slate-100 border-slate-200 text-slate-300 scale-95" 
                        : "bg-white border-emerald-200 text-emerald-700 hover:scale-105 hover:border-emerald-400 active:scale-90"
                    )}
                  >
                    {item.word}
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-3 justify-end pt-2 border-t border-slate-100">
              <button 
                onClick={resetSentence}
                className="px-4 py-2 border border-slate-200 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all flex items-center gap-1.5 text-slate-500 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Xóa Tất Cả
              </button>
              <button 
                onClick={checkAnswer}
                disabled={answer.length !== wordsPool.length}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:opacity-90 transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-indigo-600/20"
              >
                Kiểm Tra <Play className="w-3 h-3 fill-white text-white" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500">Đang chuẩn bị...</div>
        )}
      </div>
    </div>
  );
}

// ─── Idiom Connector Game (Nối Từ Thành Thành Ngữ) ──────────────────────────────
function IdiomConnectorGame({ onClose, awardXp }: { onClose: () => void; awardXp?: (amount: number, reason: string) => void }) {
  const [idiomList, setIdiomList] = useState<any[]>([]);
  const [idiomIdx, setIdiomIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [wordsPool, setWordsPool] = useState<{ word: string; originalIdx: number; used: boolean }[]>([]);
  const [answer, setAnswer] = useState<{ word: string; poolIdx: number }[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);

  const initGame = useCallback(() => {
    const list = shuffle(STATIC_SCRAMBLE_IDIOMS).slice(0, 5);
    setIdiomList(list);
    setIdiomIdx(0);
    setScore(0);
    setDone(false);
  }, []);

  useEffect(() => { initGame(); }, [initGame]);

  useEffect(() => {
    if (done && score > 0) {
      awardXp?.(score * 25, 'Idiom Connector Game');
    }
  }, [done, score, awardXp]);

  const activeIdiom = idiomList[idiomIdx];

  const initIdiom = useCallback(() => {
    if (!activeIdiom) return;
    const words = activeIdiom.idiom.split(' ');
    const shuffled = words
      .map((w: string, i: number) => ({ word: w, originalIdx: i, used: false }))
      .sort(() => Math.random() - 0.5);
    setWordsPool(shuffled);
    setAnswer([]);
    setIsCorrect(null);
  }, [activeIdiom]);

  useEffect(() => { initIdiom(); }, [initIdiom]);

  const selectWord = (poolIdx: number) => {
    if (wordsPool[poolIdx].used) return;
    const word = wordsPool[poolIdx].word;
    setWordsPool(prev => prev.map((item, i) => i === poolIdx ? { ...item, used: true } : item));
    setAnswer(prev => [...prev, { word, poolIdx }]);
    setIsCorrect(null);
  };

  const removeWord = (answerIdx: number) => {
    const item = answer[answerIdx];
    setWordsPool(prev => prev.map((w, i) => i === item.poolIdx ? { ...w, used: false } : w));
    setAnswer(prev => prev.filter((_, i) => i !== answerIdx));
    setIsCorrect(null);
  };

  const resetIdiom = () => {
    setWordsPool(prev => prev.map(w => ({ ...w, used: false })));
    setAnswer([]);
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    const spelled = answer.map(a => a.word).join(' ');
    if (spelled.toLowerCase() === activeIdiom.idiom.toLowerCase()) {
      setIsCorrect(true);
      setScore(s => s + 1);
      speak(activeIdiom.idiom);
      setTimeout(() => {
        if (idiomIdx < idiomList.length - 1) {
          setIdiomIdx(i => i + 1);
        } else {
          setDone(true);
        }
      }, 1500);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-gradient-to-r from-violet-600 to-purple-600 text-white">
          <div>
            <h2 className="text-xl font-black text-white">Idiom Connector</h2>
            <p className="text-violet-200 text-xs font-medium">Ghép nối từ tạo thành thành ngữ tiếng Anh hoàn chỉnh (Ngẫu nhiên)</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white"><X className="w-5 h-5" /></button>
        </div>

        {done ? (
          <div className="p-10 text-center space-y-5 animate-in zoom-in duration-500">
            <div className="text-5xl">💡</div>
            <h3 className="text-2xl font-black text-slate-800">Hoàn Thành Thành Ngữ!</h3>
            <p className="text-slate-500 font-medium">Bạn đã ghép đúng {score}/{idiomList.length} thành ngữ phổ biến.</p>
            <p className="text-green-600 font-black">+{score * 25} XP</p>
            <div className="flex gap-3 justify-center">
              <button onClick={initGame} className="px-6 py-3 bg-violet-600 text-white rounded-2xl font-bold flex items-center gap-1 shadow-lg shadow-violet-600/30 cursor-pointer"><RotateCcw className="w-4 h-4" />Chơi Lại</button>
              <button onClick={onClose} className="px-6 py-3 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all">Quay Về</button>
            </div>
          </div>
        ) : activeIdiom ? (
          <div className="p-8 space-y-6">
            {/* Hint Box */}
            <div className="p-4 bg-violet-50 border border-violet-100 rounded-2xl text-violet-800 text-sm font-medium leading-relaxed">
              <span className="font-bold block text-xs uppercase tracking-wider text-violet-600 mb-1">Ý nghĩa của thành ngữ</span>
              {activeIdiom?.hint}
            </div>

            {/* Answer Box */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Thành ngữ bạn đang ghép</span>
              <div className={cn(
                "min-h-20 p-4 rounded-2xl border-2 border-dashed flex flex-wrap gap-2.5 items-center justify-center transition-all duration-300",
                isCorrect === true ? "bg-green-50 border-green-400" :
                isCorrect === false ? "bg-red-50 border-red-400 animate-shake" :
                "bg-slate-50 border-slate-200"
              )}>
                {answer.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => removeWord(idx)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm animate-in zoom-in duration-200"
                  >
                    {item.word}
                  </button>
                ))}
                {answer.length === 0 && <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Nhấp các từ bên dưới để bắt đầu sắp xếp thành ngữ</span>}
              </div>
            </div>

            {/* Pool Box */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Các từ vựng</span>
              <div className="flex flex-wrap gap-2.5 justify-center">
                {wordsPool.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectWord(idx)}
                    disabled={item.used}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-bold flex items-center justify-center border-2 transition-all cursor-pointer shadow-sm",
                      item.used 
                        ? "bg-slate-100 border-slate-200 text-slate-300 scale-95" 
                        : "bg-white border-violet-200 text-violet-700 hover:scale-105 hover:border-violet-400 active:scale-90"
                    )}
                  >
                    {item.word}
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-3 justify-end pt-2 border-t border-slate-100">
              <button 
                onClick={resetIdiom}
                className="px-4 py-2 border border-slate-200 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all flex items-center gap-1.5 text-slate-500 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Xóa Tất Cả
              </button>
              <button 
                onClick={checkAnswer}
                disabled={answer.length !== wordsPool.length}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:opacity-90 transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-indigo-600/20"
              >
                Kiểm Tra <Play className="w-3 h-3 fill-white text-white" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500">Đang chuẩn bị...</div>
        )}
      </div>
    </div>
  );
}

// ─── Main Games Page ───────────────────────────────────────────────────────────
const GAMES = [
  { id: 'vocab', title: "Vocabulary Match", description: "Ghép nối các từ vựng tiếng Anh với ý nghĩa tiếng Việt chính xác. Chinh phục thời gian ngắn nhất!", icon: <Target className="w-10 h-10" />, color: "bg-blue-500", shadow: "shadow-blue-500/20", xp: "+50 XP", players: "1.2k đang chơi" },
  { id: 'quiz',  title: "Speed Quiz",       description: "Đua thời gian trả lời trắc nghiệm nhanh. Chỉ 15 giây cho một câu hỏi thú vị!", icon: <Timer className="w-10 h-10" />,  color: "bg-rose-500", shadow: "shadow-rose-500/20",  xp: "+100 XP", players: "800 đang chơi" },
  { id: 'scram', title: "Word Scramble",    description: "Nối chữ thành từ. Ghép các ký tự bị xáo trộn thành từ tiếng Anh hoàn chỉnh theo gợi ý!", icon: <Brain className="w-10 h-10" />,  color: "bg-purple-500",shadow: "shadow-purple-500/20",xp: "+60 XP",  players: "950 đang chơi" },
  { id: 'sentence', title: "Sentence Builder", description: "Nối từ thành câu. Lắp ghép các từ vựng lộn xộn thành câu nói chuẩn ngữ pháp!", icon: <Zap className="w-10 h-10" />,    color: "bg-emerald-500",shadow: "shadow-emerald-500/20",xp: "+75 XP",  players: "1.1k đang chơi" },
  { id: 'idiom', title: "Idiom Connector",  description: "Nối từ thành thành ngữ. Khám phá kho tàng thành ngữ tiếng Anh qua trò chơi ghép chữ lý thú!", icon: <Sparkles className="w-10 h-10" />, color: "bg-violet-500",shadow: "shadow-violet-500/20",xp: "+120 XP", players: "640 đang chơi" },
];

export default function GamesPage() {
  const { user } = useAuth();
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [dbWords, setDbWords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [rank, setRank] = useState<string>('#-');
  const [xp, setXp] = useState<string>('0');

  const handleAwardXp = async (amount: number, reason: string) => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_BASE}/users/add-xp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ xpToAdd: amount, reason })
      });
      if (res.ok) {
        console.log(`Successfully awarded ${amount} XP for ${reason}`);
      }
    } catch (err) {
      console.error('Failed to award XP:', err);
    }
  };

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        setLoading(true);
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${API_BASE}/vocabulary/game-data?limit=40`);
        if (res.ok) {
          const data = await res.json();
          if (data.words && data.words.length > 5) {
            setDbWords(data.words);
          }
        }
      } catch (err) {
        console.error('Failed to load dynamic game vocabulary words:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, []);

  useEffect(() => {
    const fetchUserRank = async () => {
      if (!user) return;
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const token = await user.getIdToken();
        const res = await fetch(`${API_BASE}/users/leaderboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const dbUsers: any[] = await res.json();
          const sorted = [...dbUsers].sort((a, b) => b.xp - a.xp);
          const myIndex = sorted.findIndex(u => u.id === user.uid || u.email === user.email);
          const myUser = sorted[myIndex];
          if (myIndex !== -1 && myUser) {
            setRank(`#${myIndex + 1}`);
            setXp(myUser.xp.toLocaleString());
          }
        }
      } catch (err) {
        console.error('Failed to fetch user rank on games page:', err);
      }
    };

    fetchUserRank();
  }, [user]);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {activeGame === 'vocab' && <VocabMatchGame dbWords={dbWords} onClose={() => setActiveGame(null)} awardXp={handleAwardXp} />}
      {activeGame === 'quiz'  && <SpeedQuizGame dbWords={dbWords} onClose={() => setActiveGame(null)} awardXp={handleAwardXp} />}
      {activeGame === 'scram' && <WordScrambleGame dbWords={dbWords} onClose={() => setActiveGame(null)} awardXp={handleAwardXp} />}
      {activeGame === 'sentence' && <SentenceBuilderGame dbWords={dbWords} onClose={() => setActiveGame(null)} awardXp={handleAwardXp} />}
      {activeGame === 'idiom' && <IdiomConnectorGame onClose={() => setActiveGame(null)} awardXp={handleAwardXp} />}

      <header className="text-center space-y-4">
        <div className="inline-flex p-3 bg-indigo-100 rounded-2xl text-indigo-600 mb-2"><Gamepad2 className="w-8 h-8" /></div>
        <h1 className="text-4xl font-black tracking-tight">Quiz & Games</h1>
        <p className="text-slate-500 max-w-lg mx-auto font-medium">Học mà chơi, chơi mà học. Tích lũy điểm kinh nghiệm XP, vượt qua các thử thách ghép câu và từ vựng thú vị!</p>
        
        {loading && (
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400">
            <Loader2 className="w-4 h-4 animate-spin text-primary" /> Đang tối ưu hóa và đồng bộ kho từ vựng động...
          </div>
        )}
      </header>

      {/* Hero Banner */}
      <section className="relative overflow-hidden premium-card bg-slate-900 text-white p-8 md:p-12 rounded-[40px]">
        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 text-white"><Trophy className="w-64 h-64" /></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-black uppercase tracking-widest">
              <Flame className="w-3 h-3 fill-primary" /> Sự kiện tuần này
            </div>
            <h2 className="text-4xl font-black leading-tight text-white">Đại Lộ Ngữ Pháp Grand Prix</h2>
            <p className="text-slate-400 text-lg">So tài cùng hơn 5,000 học viên khác. Đạt top 3 để giành huy hiệu độc quyền!</p>
            <div className="flex items-center gap-4">
              <button className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-lg hover:opacity-90 transition-all shadow-xl shadow-primary/40 cursor-pointer">Tham gia ngay</button>
              <div><p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Kết thúc sau</p><p className="text-xl font-black text-white">04:22:15</p></div>
            </div>
          </div>
          <div className="hidden md:flex gap-4 ml-auto">
            <div className="p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 text-center min-w-[120px]">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hạng của bạn</p>
              <p className="text-2xl font-black mt-1 text-white">{rank}</p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 text-center min-w-[120px]">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tích lũy XP</p>
              <p className="text-2xl font-black mt-1 text-white">{xp}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Game Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GAMES.map((game) => (
          <div 
            key={game.id} 
            className="premium-card p-1 group cursor-pointer hover:shadow-2xl transition-all duration-500" 
            onClick={() => setActiveGame(game.id)}
          >
            <div className="bg-white rounded-[22px] p-6 flex items-start gap-6 h-full">
              <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center text-white flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6", game.color, game.shadow)}>
                {game.icon}
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-800">{game.title}</h3>
                  <span className="text-xs font-black text-green-500">{game.xp}</span>
                </div>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{game.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{game.players}</span>
                  <button className="flex items-center gap-1 text-sm font-black transition-all text-primary group-hover:translate-x-1 cursor-pointer">
                    Chơi Ngay <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Achievements */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 premium-card p-8 bg-slate-50 border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800"><Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />Huy Hiệu Trò Chơi</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[{ label:'Sát Thủ Tốc Độ', value:'Cấp 4', icon:'⚡' }, { label:'Vua Chính Tả', value:'Cấp 2', icon:'👑' }, { label:'Ghép Cặp Tài Ba', value:'Cấp 5', icon:'🤝' }, { label:'Cao Thủ Ngữ Pháp', value:'Cấp 1', icon:'🎓' }].map((b, i) => (
              <div key={i} className="text-center space-y-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-3xl">{b.icon}</div>
                <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{b.label}</p><p className="font-bold text-slate-800">{b.value}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="premium-card p-8 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2 text-white"><Sparkles className="w-5 h-5 text-yellow-400 fill-yellow-400" />Vòng Quay May Mắn</h3>
            <p className="text-indigo-100 text-sm leading-relaxed font-medium">Hôm nay bạn có <span className="font-bold text-white">1 lượt quay miễn phí</span>. Hãy thử vận may nhận XP và quà tặng!</p>
            <button className="w-full py-4 bg-yellow-400 text-indigo-900 rounded-2xl font-black text-lg hover:bg-yellow-300 transition-all shadow-xl cursor-pointer">Quay Ngay</button>
          </div>
          <Gamepad2 className="absolute -right-6 -bottom-6 w-32 h-32 text-white/10 opacity-20 rotate-12" />
        </div>
      </section>
    </div>
  );
}
