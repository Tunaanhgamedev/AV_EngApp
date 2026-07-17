'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Gamepad2, Zap, Trophy, Target, Brain, Timer, Star, ChevronRight, Flame, Sparkles, X, CheckCircle2, RotateCcw, Play, RefreshCw, Loader2, ImageIcon, HelpCircle, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const speak = (text: string) => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  u.rate = 0.8;
  const voices = window.speechSynthesis.getVoices();
  const v = voices.find(v => v.lang === 'en-US' && v.name.includes('Google')) || voices.find(v => v.lang === 'en-US');
  if (v) u.voice = v;

  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    setTimeout(() => {
      window.speechSynthesis.speak(u);
    }, 50);
  } else {
    window.speechSynthesis.speak(u);
  }
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
  { en: 'Endurance', vi: 'Sức chịu đựng' },
  { en: 'Collaborate', vi: 'Cộng tác' },
  { en: 'Negotiate', vi: 'Thương lượng' },
  { en: 'Revenue', vi: 'Doanh thu' },
  { en: 'Delegate', vi: 'Ủy thác' },
  { en: 'Invoice', vi: 'Hóa đơn' },
  { en: 'Implement', vi: 'Triển khai' },
  { en: 'Terminate', vi: 'Chấm dứt' },
  { en: 'Compile', vi: 'Tổng hợp' },
  { en: 'Advocate', vi: 'Ủng hộ' },
  { en: 'Fluctuate', vi: 'Biến động' },
  { en: 'Hypothesis', vi: 'Giả thuyết' },
  { en: 'Synthesize', vi: 'Tổng hợp' },
  { en: 'Validate', vi: 'Xác thực' },
  { en: 'Coordinate', vi: 'Điều phối' },
  { en: 'Empirical', vi: 'Thực chứng' },
  { en: 'Paradigm', vi: 'Hình mẫu' },
  { en: 'Qualitative', vi: 'Định tính' },
  { en: 'Rational', vi: 'Hợp lý' }
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
  { q: 'Từ "Collaborate" có nghĩa là gì?', options: ['Cạnh tranh', 'Hợp tác, cộng tác', 'Phá hoại', 'Từ chối'], answer: 1 },
  { q: 'Từ nào đồng nghĩa với "Revenue"?', options: ['Cost', 'Expense', 'Income/Profit', 'Loss'], answer: 2 },
  { q: 'Điền từ: "We must ___ with the new rules."', options: ['comply', 'defy', 'ignore', 'reject'], answer: 0 },
  { q: 'Ý nghĩa của từ "Advocate" là gì?', options: ['Phản đối', 'Ủng hộ công khai', 'Nghi ngờ', 'Tránh né'], answer: 1 },
  { q: 'Từ "Fluctuate" chỉ trạng thái gì?', options: ['Không thay đổi', 'Biến động liên tục', 'Đứng yên', 'Tăng trưởng nhanh'], answer: 1 },
  { q: 'Từ "Hypothesis" trong tiếng Việt nghĩa là gì?', options: ['Bằng chứng', 'Giả thuyết', 'Định luật', 'Thực tế'], answer: 1 },
  { q: 'Chọn từ đồng nghĩa với "Rational":', options: ['Logical (Hợp lý)', 'Emotional (Cảm tính)', 'Crazy (Điên rồ)', 'Silly (Ngớ ngẩn)'], answer: 0 },
  { q: 'Từ "Facilitate" mang ý nghĩa gì?', options: ['Gây cản trở', 'Tạo điều kiện thuận lợi', 'Bỏ qua', 'Chậm trễ'], answer: 1 },
  { q: 'Chọn từ viết đúng chính tả:', options: ['Necessary', 'Neccessary', 'Necessery', 'Neccesery'], answer: 0 },
  { q: 'Điền từ: "She has an ___ supply of books."', options: ['abundant', 'empty', 'lacking', 'few'], answer: 0 }
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
  { word: 'FRIEND', hint: 'Người đồng hành thân thiết, chia sẻ niềm vui nỗi buồn.' },
  { word: 'REVENUE', hint: 'Khoản doanh thu của một doanh nghiệp trong kỳ kế toán.' },
  { word: 'STRATEGY', hint: 'Kế hoạch hành động dài hạn để đạt được mục tiêu lớn.' },
  { word: 'ADVOCATE', hint: 'Hành động ủng hộ hoặc biện hộ cho một ý kiến công khai.' },
  { word: 'EMPIRICAL', hint: 'Các bằng chứng thu được qua quan sát hoặc kinh nghiệm thực tế.' },
  { word: 'VALUABLE', hint: 'Thứ gì đó có giá trị cao hoặc cực kỳ có ích.' },
  { word: 'CREATIVE', hint: 'Khả năng sáng tạo ra những ý tưởng mới mẻ độc đáo.' },
  { word: 'OPTIMISTIC', hint: 'Một tinh thần lạc quan, luôn tin tưởng vào tương lai tốt đẹp.' },
  { word: 'RESILIENT', hint: 'Khả năng kiên cường, dễ phục hồi sau thất bại.' },
  { word: 'DILIGENT', hint: 'Đức tính cần cù, siêng năng, làm việc có trách nhiệm.' },
  { word: 'ACCURATE', hint: 'Độ chính xác cao, không có sai sót hay nhầm lẫn.' }
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
  { sentence: 'Learning vocabulary with games is fun', hint: 'Học từ vựng thông qua các trò chơi rất vui nhộn.' },
  { sentence: 'We must work together to succeed', hint: 'Chúng ta phải làm việc cùng nhau để thành công.' },
  { sentence: 'Technology makes our lives much easier', hint: 'Công nghệ giúp cuộc sống của chúng ta dễ dàng hơn nhiều.' },
  { sentence: 'He decided to accept the job offer', hint: 'Anh ấy đã quyết định nhận lời mời làm việc đó.' },
  { sentence: 'Reading helps to expand your knowledge', hint: 'Đọc sách giúp mở rộng kiến thức của bạn.' },
  { sentence: 'Please send the invoice to accounting', hint: 'Vui lòng gửi hóa đơn đến phòng kế toán.' },
  { sentence: 'The company is growing very fast', hint: 'Công nghệ/Công ty này đang phát triển rất nhanh.' },
  { sentence: 'They are discussing the project plans', hint: 'Họ đang thảo luận về các kế hoạch dự án.' },
  { sentence: 'We need to implement the changes now', hint: 'Chúng ta cần triển khai các thay đổi ngay bây giờ.' },
  { sentence: 'She gave an excellent presentation today', hint: 'Cô ấy đã có một bài thuyết trình xuất sắc hôm nay.' }
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
  { idiom: 'Blessing in disguise', hint: 'Trong cái rủi có cái may, một chuyện tốt đẹp bắt nguồn từ khó khăn.' },
  { idiom: 'Beat around the bush', hint: 'Nói vòng vo tam quốc, tránh né chủ đề chính không nói thẳng.' },
  { idiom: 'Better late than never', hint: 'Muộn còn hơn không bao giờ hoàn thành.' },
  { idiom: 'Call it a day', hint: 'Ngừng làm việc, kết thúc hoạt động của một ngày dài.' },
  { idiom: 'Cut corners', hint: 'Đi tắt đón đầu, làm việc cẩu thả để tiết kiệm thời gian hoặc tiền bạc.' },
  { idiom: 'Easy does it', hint: 'Làm việc gì đó một cách cẩn thận, chậm rãi, đừng vội vã.' },
  { idiom: 'Get out of hand', hint: 'Mất kiểm soát, vượt quá tầm tay của mọi người.' },
  { idiom: 'Hang in there', hint: 'Kiên trì lên, đừng bỏ cuộc trước thử thách khó khăn.' },
  { idiom: 'No pain no gain', hint: 'Có làm thì mới có ăn, gian nan thử sức mới gặt hái thành công.' }
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

const getCategoryLabel = (cat: string) => {
  switch (cat) {
    case 'oxford': return 'Oxford 3000';
    case 'toeic': return 'TOEIC (Công sở)';
    case 'ielts': return 'IELTS (Học thuật)';
    case 'notebook': return 'Sổ tay của tôi';
    default: return 'Tất cả từ vựng';
  }
};

function GameVocabularyRecap({ words, onSaveWord, savedWords, savingWord }: { words: any[]; onSaveWord: (word: any) => void; savedWords: Record<string, boolean>; savingWord: string | null; }) {
  if (!words || words.length === 0) return null;
  return (
    <div className="mt-6 border-t border-slate-100 pt-5 space-y-3 text-left max-h-[280px] overflow-y-auto px-1">
      <h4 className="text-sm font-black text-slate-700 flex items-center gap-1.5 px-2">
        <Brain className="w-4 h-4 text-indigo-500 animate-pulse" /> Từ vựng đã ôn luyện trong lượt này
      </h4>
      <div className="grid grid-cols-1 gap-2">
        {words.map((w, idx) => {
          const isSaved = savedWords[w.word?.toLowerCase?.() || ''];
          const isSaving = savingWord === w.word;
          return (
            <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-black text-slate-800 text-sm truncate">{w.word}</span>
                  {w.wordType && <span className="text-[9px] font-bold px-1.5 py-0.5 bg-slate-200 text-slate-500 rounded-md">{w.wordType}</span>}
                </div>
                {w.phonetic && <div className="text-[10px] font-bold text-slate-400 mt-0.5">{w.phonetic}</div>}
                <div className="text-xs font-semibold text-slate-600 mt-0.5 line-clamp-1">{w.meaningVi}</div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button onClick={() => speak(w.word)} className="p-1.5 text-slate-400 hover:text-indigo-500 transition-colors bg-white rounded-lg border border-slate-100 hover:shadow-sm"><Volume2 className="w-3.5 h-3.5" /></button>
                <button disabled={isSaved || isSaving} onClick={() => onSaveWord(w)} className={cn("px-2.5 py-1 rounded-lg font-bold text-[10px] border transition-all flex items-center gap-1", isSaved ? "bg-green-50 border-green-200 text-green-600" : "bg-white hover:bg-slate-50 border-slate-200 text-slate-600 cursor-pointer hover:shadow-sm")}>
                  {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : isSaved ? <>Đã lưu</> : <>Lưu sổ tay</>}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Vocabulary Match Game ────────────────────────────────────────────────────
function VocabMatchGame({ dbWords, category, onClose, awardXp, onSaveWord, savedWords, savingWord }: { dbWords: any[]; category: string; onClose: () => void; awardXp?: (amount: number, reason: string) => void; onSaveWord: (word: any) => void; savedWords: Record<string, boolean>; savingWord: string | null; }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [selected, setSelected] = useState<Card[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);
  const [won, setWon] = useState(false);
  const [pairCount, setPairCount] = useState(8);
  const [sessionWords, setSessionWords] = useState<any[]>([]);

  const initGame = useCallback(() => {
    let pool = STATIC_WORD_PAIRS;
    let fullWords: any[] = [];
    if (dbWords && dbWords.length >= 8) {
      pool = dbWords.map(w => ({ en: w.word, vi: w.meaningVi }));
      fullWords = dbWords;
    }

    const shuffledPool = shuffle(pool);
    const selectedPairs = shuffledPool.slice(0, 8);
    const deck: Card[] = [];
    selectedPairs.forEach((p, idx) => {
      const pairId = idx + 1;
      deck.push({ id: pairId * 10, word: p.en, type: 'en', pairId, matched: false });
      deck.push({ id: pairId * 10 + 1, word: p.vi, type: 'vi', pairId, matched: false });
    });

    if (fullWords.length > 0) {
      setSessionWords(selectedPairs.map(p => fullWords.find(w => w.word === p.en)).filter(Boolean));
    } else {
      setSessionWords(selectedPairs.map(p => ({ word: p.en, meaningVi: p.vi, meaningEn: p.en, wordType: '', phonetic: '' })));
    }

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
            <p className="text-blue-200 text-xs font-medium">Nối từ tiếng Anh với nghĩa tiếng Việt tương ứng (Danh mục: {getCategoryLabel(category)})</p>
          </div>
          <div className="flex items-center gap-6 text-sm font-black">
            <div className="text-center"><p className="text-blue-200 text-[10px] uppercase tracking-widest font-bold">Thời gian</p><p className="text-xl">{fmt(timer)}</p></div>
            <div className="text-center"><p className="text-blue-200 text-[10px] uppercase tracking-widest font-bold">Lượt đi</p><p className="text-xl">{moves}</p></div>
            <div className="text-center"><p className="text-blue-200 text-[10px] uppercase tracking-widest font-bold">Đã ghép</p><p className="text-xl">{matches}/{pairCount}</p></div>
            <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white"><X className="w-5 h-5" /></button>
          </div>
        </div>

        {won ? (
          <div className="p-12 text-center space-y-6 animate-in zoom-in duration-500 max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="text-6xl animate-bounce">🎉</div>
            <h3 className="text-3xl font-black text-slate-800">Xuất Sắc!</h3>
            <p className="text-slate-500 font-medium">Hoàn thành trong <strong>{fmt(timer)}</strong> với <strong>{moves} lượt đi</strong></p>
            <div className="flex gap-4 justify-center">
              <button onClick={initGame} className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/30"><RotateCcw className="w-4 h-4" /> Chơi Lại</button>
              <button onClick={onClose} className="px-8 py-3 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all">Quay Về</button>
            </div>
            <GameVocabularyRecap words={sessionWords} onSaveWord={onSaveWord} savedWords={savedWords} savingWord={savingWord} />
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
function SpeedQuizGame({ dbWords, category, onClose, awardXp, onSaveWord, savedWords, savingWord }: { dbWords: any[]; category: string; onClose: () => void; awardXp?: (amount: number, reason: string) => void; onSaveWord: (word: any) => void; savedWords: Record<string, boolean>; savingWord: string | null; }) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [done, setDone] = useState(false);
  const [sessionWords, setSessionWords] = useState<any[]>([]);

  const initGame = useCallback(() => {
    let generated: any[] = [];

    // Generate questions dynamically if database words are loaded
    if (dbWords && dbWords.length >= 10) {
      const shuffledWords = shuffle(dbWords);

      const selectedFullWords = shuffledWords.slice(0, 10);
      setSessionWords(selectedFullWords);
      for (let index = 0; index < 10; index++) {
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
      generated = shuffle(STATIC_QUIZ_QUESTIONS).slice(0, 10);
      setSessionWords([]);
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
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="px-8 py-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-black opacity-85">Câu hỏi {qIdx + 1}/{questions.length}</span>
            <span className={cn("text-2xl font-black", timeLeft <= 5 && "animate-pulse text-yellow-300")}>{timeLeft}s</span>
            <button onClick={onClose} className="p-1.5 bg-white/20 rounded-full text-white"><X className="w-4 h-4" /></button>
          </div>
          <p className="text-pink-100 text-[10px] font-bold uppercase tracking-widest mb-2">Danh mục: {getCategoryLabel(category)}</p>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {done ? (
          <div className="p-10 text-center space-y-5 animate-in zoom-in duration-500 max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="text-5xl">{score >= 4 ? '🏆' : score >= 3 ? '🎉' : '📚'}</div>
            <h3 className="text-2xl font-black text-slate-800">Trả lời đúng {score}/{questions.length} câu!</h3>
            <p className="text-slate-500 font-semibold">+{score * 20} XP</p>
            <div className="flex gap-3 justify-center">
              <button onClick={initGame} className="px-6 py-3 bg-rose-500 text-white rounded-2xl font-bold flex items-center gap-1 shadow-lg shadow-rose-500/30 cursor-pointer"><RotateCcw className="w-4 h-4" />Chơi Lại</button>
              <button onClick={onClose} className="px-6 py-3 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all">Quay Về</button>
            </div>
            <GameVocabularyRecap words={sessionWords} onSaveWord={onSaveWord} savedWords={savedWords} savingWord={savingWord} />
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
function WordScrambleGame({ dbWords, category, onClose, awardXp, onSaveWord, savedWords, savingWord }: { dbWords: any[]; category: string; onClose: () => void; awardXp?: (amount: number, reason: string) => void; onSaveWord: (word: any) => void; savedWords: Record<string, boolean>; savingWord: string | null; }) {
  const [scrambleList, setScrambleList] = useState<any[]>([]);
  const [wordIdx, setWordIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [lettersPool, setLettersPool] = useState<{ char: string; originalIdx: number; used: boolean }[]>([]);
  const [answer, setAnswer] = useState<{ char: string; poolIdx: number }[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);
  const [sessionWords, setSessionWords] = useState<any[]>([]);

  const initGame = useCallback(() => {
    let pool = STATIC_SCRAMBLE_WORDS;
    let trackWords: any[] = [];
    if (dbWords && dbWords.length >= 8) {
      pool = dbWords.map(w => ({
        word: w.word.toUpperCase(),
        hint: `Từ loại: ${w.wordType || 'từ'}. Nghĩa Việt: ${w.meaningVi}${w.phonetic ? ` (Phiên âm: ${w.phonetic})` : ''}`
      }));
      const shuffled = shuffle(pool).slice(0, 10);
      const list = shuffled;
      trackWords = shuffled.map(s => {
        const orig = dbWords.find(d => d.word.toUpperCase() === s.word);
        return orig || { word: s.word.charAt(0) + s.word.slice(1).toLowerCase(), meaningVi: s.hint, meaningEn: s.word, wordType: '', phonetic: '' };
      });
      setSessionWords(trackWords);
      setScrambleList(list);
    } else {
      const list = shuffle(pool).slice(0, 10);
      setSessionWords(list.map(s => ({ word: s.word.charAt(0) + s.word.slice(1).toLowerCase(), meaningVi: s.hint, meaningEn: s.word, wordType: 'Noun', phonetic: '' })));
      setScrambleList(list);
    }
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
            <p className="text-purple-200 text-xs font-medium">Ghép các chữ cái xáo trộn thành một từ có nghĩa (Danh mục: {getCategoryLabel(category)})</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white"><X className="w-5 h-5" /></button>
        </div>

        {done ? (
          <div className="p-10 text-center space-y-5 animate-in zoom-in duration-500 max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="text-5xl">🐝</div>
            <h3 className="text-2xl font-black text-slate-800">Hoàn Thành Ghép Chữ!</h3>
            <p className="text-slate-500 font-medium">Bạn đã ghép đúng {score}/{scrambleList.length} từ vựng.</p>
            <p className="text-green-600 font-black">+{score * 15} XP</p>
            <div className="flex gap-3 justify-center">
              <button onClick={initGame} className="px-6 py-3 bg-purple-600 text-white rounded-2xl font-bold flex items-center gap-1 shadow-lg shadow-purple-600/30 cursor-pointer"><RotateCcw className="w-4 h-4" />Chơi Lại</button>
              <button onClick={onClose} className="px-6 py-3 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all">Quay Về</button>
            </div>
            <GameVocabularyRecap words={sessionWords} onSaveWord={onSaveWord} savedWords={savedWords} savingWord={savingWord} />
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
function SentenceBuilderGame({ dbWords, category, onClose, awardXp, onSaveWord, savedWords, savingWord }: { dbWords: any[]; category: string; onClose: () => void; awardXp?: (amount: number, reason: string) => void; onSaveWord: (word: any) => void; savedWords: Record<string, boolean>; savingWord: string | null; }) {
  const [sentenceList, setSentenceList] = useState<any[]>([]);
  const [sentIdx, setSentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [wordsPool, setWordsPool] = useState<{ word: string; originalIdx: number; used: boolean }[]>([]);
  const [answer, setAnswer] = useState<{ word: string; poolIdx: number }[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);
  const [sessionWords, setSessionWords] = useState<any[]>([]);

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

    const list = shuffle(pool).slice(0, 8);
    if (dbWords && dbWords.length >= 5) {
      const usedWords = dbWords.filter(w => w.example && w.example.split(' ').length >= 4 && w.example.split(' ').length <= 10).slice(0, 8);
      setSessionWords(usedWords);
    } else {
      setSessionWords([]);
    }
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
            <p className="text-emerald-200 text-xs font-medium">Sắp xếp các từ xáo trộn để tạo thành câu hoàn chỉnh (Danh mục: {getCategoryLabel(category)})</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white"><X className="w-5 h-5" /></button>
        </div>

        {done ? (
          <div className="p-10 text-center space-y-5 animate-in zoom-in duration-500 max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="text-5xl">✍️</div>
            <h3 className="text-2xl font-black text-slate-800">Hoàn Thành Ghép Câu!</h3>
            <p className="text-slate-500 font-medium">Bạn đã sắp xếp đúng {score}/{sentenceList.length} câu hoàn chỉnh.</p>
            <p className="text-green-600 font-black">+{score * 20} XP</p>
            <div className="flex gap-3 justify-center">
              <button onClick={initGame} className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold flex items-center gap-1 shadow-lg shadow-emerald-600/30 cursor-pointer"><RotateCcw className="w-4 h-4" />Chơi Lại</button>
              <button onClick={onClose} className="px-6 py-3 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all">Quay Về</button>
            </div>
            <GameVocabularyRecap words={sessionWords} onSaveWord={onSaveWord} savedWords={savedWords} savingWord={savingWord} />
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

// ─── Image Guessing Game (Đoán Chữ Qua Hình Ảnh) ────────────────────────────────
const IMAGE_GUESS_POOL = [
  {
    word: 'APPLE',
    vi: 'Quả táo',
    hint: 'Trái cây màu đỏ hoặc xanh, vỏ mỏng, cùi giòn ngọt.',
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop'
  },
  {
    word: 'BANANA',
    vi: 'Quả chuối',
    hint: 'Trái cây nhiệt đới màu vàng khi chín, thon dài và mềm ngọt.',
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop'
  },
  {
    word: 'CAT',
    vi: 'Con mèo',
    hint: 'Thú nuôi nhỏ trong nhà, thích bắt chuột và kêu meo meo.',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop'
  },
  {
    word: 'DOG',
    vi: 'Con chó',
    hint: 'Thú cưng rất trung thành với con người, hay sủa giữ nhà.',
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop'
  },
  {
    word: 'ELEPHANT',
    vi: 'Con voi',
    hint: 'Động vật trên cạn khổng lồ có tai to và một chiếc vòi dài.',
    imageUrl: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=600&auto=format&fit=crop'
  },
  {
    word: 'COMPUTER',
    vi: 'Máy tính',
    hint: 'Thiết bị điện tử dùng để xử lý dữ liệu, làm việc và giải trí.',
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop'
  },
  {
    word: 'GUITAR',
    vi: 'Đàn ghi-ta',
    hint: 'Nhạc cụ có sáu dây, thùng đàn bằng gỗ rỗng.',
    imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&auto=format&fit=crop'
  },
  {
    word: 'SUNFLOWER',
    vi: 'Hoa hướng dương',
    hint: 'Loài hoa lớn màu vàng tươi luôn quay mặt về hướng mặt trời.',
    imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&auto=format&fit=crop'
  },
  {
    word: 'AIRPLANE',
    vi: 'Máy bay',
    hint: 'Phương tiện vận chuyển hành khách trên không có cánh lớn.',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop'
  },
  {
    word: 'BICYCLE',
    vi: 'Xe đạp',
    hint: 'Phương tiện di chuyển hai bánh, chạy bằng bàn đạp chân.',
    imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&auto=format&fit=crop'
  },
  {
    word: 'COFFEE',
    vi: 'Cà phê',
    hint: 'Thức uống thơm nồng từ hạt rang chín, màu đen sẫm.',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop'
  },
  {
    word: 'HAMBURGER',
    vi: 'Bánh hamburger',
    hint: 'Món ăn nhanh kẹp thịt băm nướng tròn và rau củ.',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop'
  },
  {
    word: 'UMBRELLA',
    vi: 'Cây dù / ô',
    hint: 'Vật dụng hình vòm che mưa che nắng cầm tay.',
    imageUrl: 'https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?w=600&auto=format&fit=crop'
  },
  {
    word: 'CLOCK',
    vi: 'Đồng hồ',
    hint: 'Vật dụng đo thời gian có kim chỉ giờ và phút.',
    imageUrl: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&auto=format&fit=crop'
  },
  {
    word: 'SUN',
    vi: 'Mặt trời',
    hint: 'Quả cầu lửa khổng lồ ở trung tâm hệ hành tinh của chúng ta.',
    imageUrl: 'https://images.unsplash.com/photo-1538370965046-79c0d6907d47?w=600&auto=format&fit=crop'
  },
  {
    word: 'STRAWBERRY',
    vi: 'Quả dâu tây',
    hint: 'Trái cây nhỏ màu đỏ mọng có hạt li ti bên ngoài vỏ.',
    imageUrl: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=600&auto=format&fit=crop'
  },
  {
    word: 'WATERMELON',
    vi: 'Quả dưa hấu',
    hint: 'Trái cây lớn vỏ xanh sọc đậm, ruột đỏ nhiều nước và hạt đen.',
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop'
  },
  {
    word: 'BUTTERFLY',
    vi: 'Con bướm',
    hint: 'Loài côn trùng có đôi cánh rực rỡ sắc màu bay lượn hút mật hoa.',
    imageUrl: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=600&auto=format&fit=crop'
  },
  {
    word: 'LION',
    vi: 'Con sư tử',
    hint: 'Chúa tể sơn lâm hoang dã có bờm cổ rậm rạp ở châu Phi.',
    imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&auto=format&fit=crop'
  },
  {
    word: 'TIGER',
    vi: 'Con hổ',
    hint: 'Loài thú ăn thịt họ mèo cỡ lớn có bộ lông vằn đen cam.',
    imageUrl: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&auto=format&fit=crop'
  },
  {
    word: 'MONKEY',
    vi: 'Con khỉ',
    hint: 'Động vật leo trèo nhanh nhẹn, thích ăn chuối và sống trên cây.',
    imageUrl: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=600&auto=format&fit=crop'
  },
  {
    word: 'PENGUIN',
    vi: 'Chim cánh cụt',
    hint: 'Loài chim không biết bay, sống ở vùng băng tuyết Nam Cực.',
    imageUrl: 'https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?w=600&auto=format&fit=crop'
  },
  {
    word: 'HELICOPTER',
    vi: 'Máy bay trực thăng',
    hint: 'Phương tiện bay có cánh quạt lớn phía trên đỉnh để cất cánh thẳng đứng.',
    imageUrl: 'https://images.unsplash.com/photo-1557818673-effec50525e1?w=600&auto=format&fit=crop'
  },
  {
    word: 'MOTORCYCLE',
    vi: 'Xe máy / mô tô',
    hint: 'Phương tiện giao thông 2 bánh chạy bằng động cơ xăng phân khối lớn.',
    imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop'
  },
  {
    word: 'TRAIN',
    vi: 'Tàu hỏa',
    hint: 'Phương tiện đường sắt dài chạy trên đường ray gỗ sắt.',
    imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&auto=format&fit=crop'
  },
  {
    word: 'SHIP',
    vi: 'Tàu thủy',
    hint: 'Phương tiện đường thủy cỡ lớn chuyên chở hàng hóa trên đại dương.',
    imageUrl: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=600&auto=format&fit=crop'
  },
  {
    word: 'CAMERA',
    vi: 'Máy ảnh',
    hint: 'Thiết bị quang học dùng để ghi lại hình ảnh tĩnh hoặc động.',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop'
  },
  {
    word: 'TELEPHONE',
    vi: 'Điện thoại',
    hint: 'Thiết bị viễn thông dùng để liên lạc đàm thoại từ xa.',
    imageUrl: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=600&auto=format&fit=crop'
  },
  {
    word: 'TELEVISION',
    vi: 'Tivi / máy vô tuyến',
    hint: 'Thiết bị màn hình lớn trình chiếu các kênh truyền hình giải trí.',
    imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&auto=format&fit=crop'
  },
  {
    word: 'PIANO',
    vi: 'Đàn piano',
    hint: 'Nhạc cụ phím cơ lớn màu đen trắng phát âm thanh rất thanh lịch.',
    imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&auto=format&fit=crop'
  },
  {
    word: 'VIOLIN',
    vi: 'Đàn vĩ cầm',
    hint: 'Nhạc cụ dây nhỏ kéo bằng vĩ gỗ đặt lên vai khi chơi.',
    imageUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop'
  },
  {
    word: 'RAINBOW',
    vi: 'Cầu vồng',
    hint: 'Dải màu sắc hình cung xuất hiện trên bầu trời sau cơn mưa nắng.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop'
  },
  {
    word: 'MOON',
    vi: 'Mặt trăng',
    hint: 'Vệ tinh tự nhiên duy nhất của Trái Đất, chiếu sáng ban đêm.',
    imageUrl: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=600&auto=format&fit=crop'
  },
  {
    word: 'STAR',
    vi: 'Ngôi sao',
    hint: 'Thiên thể phát sáng lấp lánh trên bầu trời đêm xa xôi.',
    imageUrl: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=600&auto=format&fit=crop'
  },
  {
    word: 'FLOWER',
    vi: 'Bông hoa',
    hint: 'Cơ quan sinh sản của thực vật có cánh hoa đẹp đẽ tỏa hương thơm.',
    imageUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&auto=format&fit=crop'
  },
  {
    word: 'TREE',
    vi: 'Cây xanh',
    hint: 'Thực vật thân gỗ lâu năm có cành lá tỏa bóng mát.',
    imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&auto=format&fit=crop'
  },
  {
    word: 'MOUNTAIN',
    vi: 'Ngọn núi',
    hint: 'Dạng địa hình lồi cao hẳn lên so với đồng bằng xung quanh.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop'
  },
  {
    word: 'RIVER',
    vi: 'Dòng sông',
    hint: 'Dòng nước chảy tự nhiên đổ ra biển hoặc hồ lớn.',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop'
  },
  {
    word: 'OCEAN',
    vi: 'Đại dương',
    hint: 'Vùng nước mặn khổng lồ bao phủ phần lớn bề mặt Trái Đất.',
    imageUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&auto=format&fit=crop'
  },
  {
    word: 'BEACH',
    vi: 'Bãi biển',
    hint: 'Vùng bờ cát thoai thoải nằm sát rìa đại dương hoặc biển.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop'
  },
  {
    word: 'DESERT',
    vi: 'Sa mạc',
    hint: 'Vùng đất khô cằn toàn cát hoang vu, lượng mưa rất thấp.',
    imageUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&auto=format&fit=crop'
  },
  {
    word: 'BALLOON',
    vi: 'Khinh khí cầu',
    hint: 'Quả bóng lớn chứa đầy khí nóng bay lơ lửng trên không trung.',
    imageUrl: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=600&auto=format&fit=crop'
  },
  {
    word: 'CANDLE',
    vi: 'Cây nến / đèn cầy',
    hint: 'Khối sáp có bấc ở giữa dùng thắp sáng khi nóng chảy.',
    imageUrl: 'https://images.unsplash.com/photo-1541417904950-b855846fe074?w=600&auto=format&fit=crop'
  },
  {
    word: 'ICECREAM',
    vi: 'Kem',
    hint: 'Món tráng miệng đông lạnh ngọt ngào mát lạnh mùa hè.',
    imageUrl: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&auto=format&fit=crop'
  },
  {
    word: 'CAKE',
    vi: 'Bánh kem / bánh ngọt',
    hint: 'Món bánh nướng ngọt phủ kem dùng trong sinh nhật.',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop'
  },
  {
    word: 'BREAD',
    vi: 'Bánh mì',
    hint: 'Thực phẩm làm từ bột mì nhào trộn nướng chín vàng.',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop'
  },
  {
    word: 'CHEESE',
    vi: 'Phô mai',
    hint: 'Thực phẩm làm từ sữa cô đặc có màu vàng ngậy béo.',
    imageUrl: 'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=600&auto=format&fit=crop'
  },
  {
    word: 'MILK',
    vi: 'Sữa tươi',
    hint: 'Thức uống dinh dưỡng màu trắng tiết ra từ bò sữa.',
    imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&auto=format&fit=crop'
  },
  {
    word: 'WATER',
    vi: 'Nước lọc',
    hint: 'Chất lỏng trong suốt không màu không mùi duy trì sự sống.',
    imageUrl: 'https://images.unsplash.com/photo-1488188840666-e2308741a62f?w=600&auto=format&fit=crop'
  },
  {
    word: 'JUICE',
    vi: 'Nước ép trái cây',
    hint: 'Nước vắt ra từ các loại hoa quả tươi ngon.',
    imageUrl: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=600&auto=format&fit=crop'
  },
  {
    word: 'PINEAPPLE',
    vi: 'Quả dứa / thơm',
    hint: 'Trái cây nhiệt đới vỏ nhiều mắt xù xì, lá nhọn trên đỉnh.',
    imageUrl: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=600&auto=format&fit=crop'
  },
  {
    word: 'ORANGE',
    vi: 'Quả cam',
    hint: 'Trái cây họ cam quýt vỏ cam căng bóng nhiều nước chua ngọt.',
    imageUrl: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=600&auto=format&fit=crop'
  },
  {
    word: 'GRAPE',
    vi: 'Quả nho',
    hint: 'Trái cây mọc thành chùm nhỏ tròn màu tím hoặc xanh.',
    imageUrl: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&auto=format&fit=crop'
  },
  {
    word: 'LEMON',
    vi: 'Quả chanh vàng',
    hint: 'Trái cây họ cam quýt có vị chua gắt, vỏ màu vàng tươi.',
    imageUrl: 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=600&auto=format&fit=crop'
  },
  {
    word: 'PEACH',
    vi: 'Quả đào',
    hint: 'Trái cây vỏ mịn lông tơ màu hồng cam phấn ngọt lịm.',
    imageUrl: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=600&auto=format&fit=crop'
  },
  {
    word: 'RICE',
    vi: 'Cơm / hạt gạo',
    hint: 'Lương thực chính của người châu Á, nấu chín từ hạt gạo trắng.',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop'
  },
  {
    word: 'TOMATO',
    vi: 'Quả cà chua',
    hint: 'Trái cây mọng màu đỏ dùng làm rau gia vị nấu ăn.',
    imageUrl: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=600&auto=format&fit=crop'
  },
  {
    word: 'POTATO',
    vi: 'Củ khoai tây',
    hint: 'Củ chứa nhiều tinh bột mọc dưới lòng đất màu nâu nhạt.',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop'
  },
  {
    word: 'CARROT',
    vi: 'Củ cà rốt',
    hint: 'Củ thon dài màu cam nổi bật, thỏ rất thích ăn.',
    imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&auto=format&fit=crop'
  },
  {
    word: 'ONION',
    vi: 'Củ hành tây',
    hint: 'Củ có nhiều lớp vỏ đồng tâm bóc ra gây cay xè mắt.',
    imageUrl: 'https://images.unsplash.com/photo-1508747703725-719ae257c84a?w=600&auto=format&fit=crop'
  },
  {
    word: 'BOOK',
    vi: 'Cuốn sách',
    hint: 'Tập hợp các trang giấy in chữ được đóng lại thành cuốn để đọc.',
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop'
  },
  {
    word: 'CHAIR',
    vi: 'Cái ghế',
    hint: 'Đồ nội thất dùng để ngồi, thường có bốn chân và tựa lưng.',
    imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&auto=format&fit=crop'
  },
  {
    word: 'HOUSE',
    vi: 'Ngôi nhà',
    hint: 'Công trình xây dựng có mái và tường để con người sinh sống.',
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&auto=format&fit=crop'
  },
  {
    word: 'EGG',
    vi: 'Quả trứng',
    hint: 'Vật thể hình bầu dục do chim hoặc gia cầm đẻ ra, có vỏ cứng bên ngoài.',
    imageUrl: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=600&auto=format&fit=crop'
  },
  {
    word: 'FISH',
    vi: 'Con cá',
    hint: 'Động vật có xương sống, sống dưới nước và thở bằng mang.',
    imageUrl: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600&auto=format&fit=crop'
  },
  {
    word: 'BIRD',
    vi: 'Con chim',
    hint: 'Động vật có lông vũ, có mỏ và hầu hết có thể bay được.',
    imageUrl: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&auto=format&fit=crop'
  },
  {
    word: 'SHOES',
    vi: 'Đôi giày',
    hint: 'Vật dụng bằng da hoặc vải đeo vào chân để bảo vệ và làm đẹp.',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop'
  },
  {
    word: 'HAT',
    vi: 'Cái mũ',
    hint: 'Vật dụng đội lên đầu để che nắng mưa hoặc làm thời trang.',
    imageUrl: 'https://images.unsplash.com/photo-1533055640609-24b498dfd74c?w=600&auto=format&fit=crop'
  },
  {
    word: 'WATCH',
    vi: 'Đồng hồ đeo tay',
    hint: 'Thiết bị nhỏ gọn đeo ở cổ tay dùng để xem giờ.',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop'
  },
  {
    word: 'BACKPACK',
    vi: 'Ba lô',
    hint: 'Túi đựng đồ có hai quai đeo trên vai khi di chuyển.',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop'
  },
  {
    word: 'DOLPHIN',
    vi: 'Cá heo',
    hint: 'Động vật có vú sống dưới đại dương, nổi tiếng thông minh và thân thiện.',
    imageUrl: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?w=600&auto=format&fit=crop'
  },
  {
    word: 'ROSE',
    vi: 'Hoa hồng',
    hint: 'Loài hoa biểu tượng của tình yêu, có gai trên thân và hương thơm quyến rũ.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop'
  },
  {
    word: 'MANGO',
    vi: 'Quả xoài',
    hint: 'Trái cây nhiệt đới vỏ vàng hoặc xanh, ruột vàng mọng ngọt có hạt lớn ở giữa.',
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop'
  },
  {
    word: 'RABBIT',
    vi: 'Con thỏ',
    hint: 'Động vật nhỏ tai dài, đuôi ngắn thích nhảy và ăn cà rốt.',
    imageUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&auto=format&fit=crop'
  },
  {
    word: 'PENCIL',
    vi: 'Bút chì',
    hint: 'Dụng cụ viết hoặc vẽ làm bằng lõi than chì bọc gỗ bên ngoài.',
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&auto=format&fit=crop'
  }
];

function ImageGuessGame({ onClose, awardXp }: { onClose: () => void; awardXp?: (amount: number, reason: string) => void }) {
  const [list, setList] = useState<any[]>([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [lettersPool, setLettersPool] = useState<{ char: string; originalIdx: number; used: boolean }[]>([]);
  const [answer, setAnswer] = useState<{ char: string; poolIdx: number }[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [done, setDone] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);

  const initGame = useCallback(() => {
    const selected = shuffle(IMAGE_GUESS_POOL).slice(0, 8);
    setList(selected);
    setIdx(0);
    setScore(0);
    setDone(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (done && score > 0) {
      awardXp?.(score * 20, 'Image Guessing Game');
    }
  }, [done, score, awardXp]);

  const activeItem = list[idx];

  const initItem = useCallback(() => {
    if (!activeItem) return;
    setImgLoading(true);
    const wordChars = activeItem.word.split('');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const poolChars = [...wordChars];
    while (poolChars.length < 12) {
      const randChar = alphabet[Math.floor(Math.random() * alphabet.length)];
      poolChars.push(randChar);
    }
    const shuffled = poolChars
      .map((c: string, i: number) => ({ char: c, originalIdx: i, used: false }))
      .sort(() => Math.random() - 0.5);
    setLettersPool(shuffled);
    setAnswer([]);
    setIsCorrect(null);
    setShowHint(false);
  }, [activeItem]);

  useEffect(() => {
    initItem();
  }, [initItem]);

  const selectChar = useCallback((poolIdx: number) => {
    if (!activeItem) return;
    if (lettersPool[poolIdx].used || answer.length >= activeItem.word.length) return;
    const char = lettersPool[poolIdx].char;
    setLettersPool(prev => prev.map((item, i) => i === poolIdx ? { ...item, used: true } : item));
    setAnswer(prev => [...prev, { char, poolIdx }]);
    setIsCorrect(null);
  }, [lettersPool, answer, activeItem]);

  const removeChar = useCallback((answerIdx: number) => {
    const item = answer[answerIdx];
    if (!item) return;
    setLettersPool(prev => prev.map((l, i) => i === item.poolIdx ? { ...l, used: false } : l));
    setAnswer(prev => prev.filter((_, i) => i !== answerIdx));
    setIsCorrect(null);
  }, [answer]);

  const resetItem = () => {
    setLettersPool(prev => prev.map(l => ({ ...l, used: false })));
    setAnswer([]);
    setIsCorrect(null);
  };

  const checkAnswer = useCallback(() => {
    if (!activeItem) return;
    const spelled = answer.map(a => a.char).join('');
    if (spelled === activeItem.word) {
      setIsCorrect(true);
      setScore(s => s + 1);
      speak(activeItem.word);
      setTimeout(() => {
        if (idx < list.length - 1) {
          setIdx(i => i + 1);
        } else {
          setDone(true);
        }
      }, 1500);
    } else {
      setIsCorrect(false);
    }
  }, [answer, activeItem, idx, list]);

  // Keyboard support
  useEffect(() => {
    if (done || !activeItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (key === 'BACKSPACE') {
        if (answer.length > 0) {
          removeChar(answer.length - 1);
        }
      } else if (key === 'ENTER') {
        if (answer.length === activeItem.word.length) {
          checkAnswer();
        }
      } else if (/^[A-Z]$/.test(key)) {
        const poolIdx = lettersPool.findIndex(l => l.char === key && !l.used);
        if (poolIdx !== -1) {
          selectChar(poolIdx);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lettersPool, answer, done, activeItem, selectChar, removeChar, checkAnswer]);

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-xl lg:max-w-4xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 sm:px-8 sm:py-5 border-b border-slate-100 bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-white">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5" /> Image Guessing
            </h2>
            <p className="text-amber-100 text-xs font-medium">Nhìn hình ảnh thực tế đoán từ vựng tiếng Anh tương ứng</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white"><X className="w-5 h-5" /></button>
        </div>

        {done ? (
          <div className="p-10 text-center space-y-6 animate-in zoom-in duration-500">
            <div className="text-6xl animate-bounce">🏆</div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800">Hoàn Thành Thử Thách!</h3>
            <p className="text-slate-500 font-medium text-sm sm:text-base">Bạn đã xuất sắc đoán đúng <strong className="text-amber-600 font-black">{score}/{list.length}</strong> từ vựng qua ảnh thực tế.</p>
            <div className="inline-block px-6 py-2 bg-amber-50 rounded-2xl border border-amber-150">
              <p className="text-amber-700 font-black text-2xl">+{score * 20} XP</p>
            </div>
            <div className="flex gap-4 justify-center">
              <button onClick={initGame} className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-amber-500/30 hover:opacity-90 active:scale-95 transition-all"><RotateCcw className="w-4 h-4" />Chơi Lại</button>
              <button onClick={onClose} className="px-8 py-3.5 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all">Quay Về</button>
            </div>
          </div>
        ) : activeItem ? (
          <div className="p-5 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
              
              {/* Left Column: Image Box & Hints */}
              <div className="space-y-4">
                <div className="w-full h-44 sm:h-52 lg:h-64 relative rounded-2xl overflow-hidden shadow-md border border-slate-150 bg-slate-50 flex items-center justify-center group">
                  {imgLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                      <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
                    </div>
                  )}
                  <img 
                    src={activeItem.imageUrl} 
                    alt="Guess the word" 
                    referrerPolicy="no-referrer"
                    onLoad={() => setImgLoading(false)}
                    className={cn(
                      "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105",
                      imgLoading ? "opacity-0" : "opacity-100"
                    )}
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-widest">
                    Round {idx + 1}/{list.length}
                  </div>
                </div>

                {/* Hint Alert Box */}
                {showHint ? (
                  <div className="p-4 bg-amber-50/80 border border-amber-100 rounded-2xl text-amber-900 text-xs sm:text-sm font-medium leading-relaxed animate-in slide-in-from-top-2 duration-300">
                    <span className="font-black block text-[10px] uppercase tracking-wider text-amber-600 mb-1">Gợi ý nghĩa từ vựng</span>
                    Nghĩa: <span className="font-bold text-amber-900">{activeItem.vi}</span> — {activeItem.hint}
                  </div>
                ) : (
                  <button 
                    onClick={() => setShowHint(true)}
                    className="w-full py-3 bg-amber-50 hover:bg-amber-100/70 border border-amber-100 rounded-2xl text-xs sm:text-sm font-black text-amber-700 hover:text-amber-800 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
                  >
                    <HelpCircle className="w-4 h-4" /> Bấm xem gợi ý tiếng Việt
                  </button>
                )}
              </div>

              {/* Right Column: Interaction, Slots & Letters */}
              <div className="space-y-6">
                {/* Answer Slots Display */}
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Từ cần tìm ({activeItem.word.length} chữ cái)</span>
                  <div className={cn(
                    "min-h-16 p-3 rounded-2xl border-2 border-dashed flex flex-wrap gap-2 items-center justify-center transition-all duration-300",
                    isCorrect === true ? "bg-green-50/80 border-green-400 shadow-inner animate-bounce" :
                      isCorrect === false ? "bg-red-50/80 border-red-400 animate-shake shadow-inner" :
                        "bg-slate-50 border-slate-200"
                  )}>
                    {Array.from({ length: activeItem.word.length }).map((_, charIdx) => {
                      const filled = answer[charIdx];
                      return (
                        <button
                          key={charIdx}
                          onClick={() => filled && removeChar(charIdx)}
                          className={cn(
                            "w-10 h-10 sm:w-11 sm:h-11 rounded-xl text-lg font-black flex items-center justify-center transition-all shadow-sm border-2 cursor-pointer",
                            filled 
                              ? "bg-slate-900 border-slate-800 text-white hover:scale-105 active:scale-95" 
                              : "bg-white border-slate-200 text-slate-300 cursor-default"
                          )}
                        >
                          {filled ? filled.char : ''}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Letters Pool Box */}
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Các chữ cái gợi ý</span>
                  <div className="grid grid-cols-6 gap-2 justify-center max-w-sm mx-auto lg:mx-0">
                    {lettersPool.map((item, poolIdx) => (
                      <button
                        key={poolIdx}
                        onClick={() => selectChar(poolIdx)}
                        disabled={item.used}
                        className={cn(
                          "w-11 h-11 sm:w-12 sm:h-12 rounded-xl text-base sm:text-lg font-black flex items-center justify-center border-2 transition-all cursor-pointer shadow-sm",
                          item.used
                            ? "bg-slate-100 border-slate-200 text-slate-300 scale-95 cursor-default"
                            : "bg-white border-amber-100 text-amber-800 hover:scale-110 hover:border-amber-300 hover:bg-amber-50/20 active:scale-90"
                        )}
                      >
                        {item.char}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
                  <button
                    onClick={resetItem}
                    className="px-4 py-2.5 border border-slate-200 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all flex items-center gap-1.5 text-slate-500 cursor-pointer active:scale-95"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Xóa Tất Cả
                  </button>
                  <button
                    onClick={checkAnswer}
                    disabled={answer.length !== activeItem.word.length}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold text-xs hover:opacity-95 transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-amber-500/20 active:scale-95"
                  >
                    Kiểm Tra <Play className="w-3 h-3 fill-white text-white" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500">Đang chuẩn bị...</div>
        )}
      </div>
    </div>
  );
}

// ─── Word Hunter Game (Hangman) ──────────────────────────────────────────────────
function WordHunterGame({ 
  dbWords, 
  category, 
  onClose, 
  awardXp, 
  onSaveWord, 
  savedWords, 
  savingWord 
}: { 
  dbWords: any[]; 
  category: string; 
  onClose: () => void; 
  awardXp?: (amount: number, reason: string) => void; 
  onSaveWord: (word: any) => void; 
  savedWords: Record<string, boolean>; 
  savingWord: string | null; 
}) {
  const [wordList, setWordList] = useState<any[]>([]);
  const [wordIdx, setWordIdx] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongCount, setWrongCount] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [roundResult, setRoundResult] = useState<'win' | 'lose' | null>(null);
  const [sessionWords, setSessionWords] = useState<any[]>([]);
  const MAX_WRONG = 6;
  const TOTAL_WORDS = 8;

  const initGame = useCallback(() => {
    let pool: any[] = [];
    if (dbWords && dbWords.length >= TOTAL_WORDS) {
      pool = shuffle(dbWords).slice(0, TOTAL_WORDS);
    } else {
      pool = shuffle(STATIC_SCRAMBLE_WORDS).slice(0, TOTAL_WORDS).map(s => ({
        word: s.word.charAt(0) + s.word.slice(1).toLowerCase(),
        meaningVi: s.hint,
        meaningEn: s.word,
        wordType: 'Noun',
        phonetic: ''
      }));
    }
    setSessionWords(pool);
    setWordList(pool);
    setWordIdx(0);
    setGuessedLetters(new Set());
    setWrongCount(0);
    setScore(0);
    setDone(false);
    setRoundResult(null);
  }, [dbWords]);

  useEffect(() => { initGame(); }, [initGame]);

  const currentWord = wordList[wordIdx];
  const targetWord = currentWord?.word?.toUpperCase() || '';
  const isWordComplete = targetWord.split('').every((ch: string) => guessedLetters.has(ch) || !/[A-Z]/.test(ch));

  useEffect(() => {
    if (!currentWord || done) return;
    if (isWordComplete) {
      setRoundResult('win');
      setScore(s => s + 1);
      speak(currentWord.word);
      setTimeout(nextWord, 2000);
    } else if (wrongCount >= MAX_WRONG) {
      setRoundResult('lose');
      setTimeout(nextWord, 2500);
    }
  }, [guessedLetters, wrongCount]);

  const nextWord = () => {
    if (wordIdx < wordList.length - 1) {
      setWordIdx(i => i + 1);
      setGuessedLetters(new Set());
      setWrongCount(0);
      setRoundResult(null);
    } else {
      setDone(true);
      if (score > 0) awardXp?.(score * 15, 'Word Hunter Game');
    }
  };

  const guessLetter = (letter: string) => {
    if (guessedLetters.has(letter) || roundResult) return;
    const next = new Set(guessedLetters);
    next.add(letter);
    setGuessedLetters(next);
    if (!targetWord.includes(letter)) setWrongCount(c => c + 1);
  };

  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-gradient-to-r from-rose-600 to-red-600 text-white">
          <div>
            <h2 className="text-xl font-black text-white">Word Hunter</h2>
            <p className="text-rose-200 text-xs font-medium">Đoán từ ẩn - {wordIdx + 1}/{wordList.length} (Danh mục: {getCategoryLabel(category)})</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-black">❤️ {MAX_WRONG - wrongCount}/{MAX_WRONG}</span>
            <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white"><X className="w-5 h-5" /></button>
          </div>
        </div>

        {done ? (
          <div className="p-10 text-center space-y-5 animate-in zoom-in duration-500 max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="text-5xl">{score >= 6 ? '🏆' : score >= 4 ? '🎉' : '📚'}</div>
            <h3 className="text-2xl font-black text-slate-800">Hoàn Thành Word Hunter!</h3>
            <p className="text-slate-500 font-medium">Bạn đã đoán đúng {score}/{wordList.length} từ vựng.</p>
            <p className="text-green-600 font-black">+{score * 15} XP</p>
            <div className="flex gap-3 justify-center">
              <button onClick={initGame} className="px-6 py-3 bg-rose-600 text-white rounded-2xl font-bold flex items-center gap-1 shadow-lg shadow-rose-600/30 cursor-pointer"><RotateCcw className="w-4 h-4" />Chơi Lại</button>
              <button onClick={onClose} className="px-6 py-3 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all">Quay Về</button>
            </div>
            <GameVocabularyRecap words={sessionWords} onSaveWord={onSaveWord} savedWords={savedWords} savingWord={savingWord} />
          </div>
        ) : currentWord ? (
          <div className="p-8 space-y-6">
            <div className="p-3 bg-rose-50 border border-rose-100 rounded-2xl text-rose-800 text-sm font-medium">
              <span className="font-bold block text-xs uppercase tracking-wider text-rose-600 mb-1">Gợi ý</span>
              {currentWord.meaningVi} {currentWord.wordType && <span className="text-rose-400">({currentWord.wordType})</span>}
            </div>
            <div className="flex justify-center gap-2 flex-wrap">
              {targetWord.split('').map((ch: string, i: number) => (
                <div key={i} className={cn("w-10 h-12 rounded-xl border-2 flex items-center justify-center text-xl font-black transition-all duration-300", /[A-Z]/.test(ch) ? (guessedLetters.has(ch) ? (roundResult === 'lose' && !guessedLetters.has(ch) ? 'bg-red-50 border-red-300 text-red-600' : 'bg-green-50 border-green-300 text-green-700 scale-105') : 'bg-slate-100 border-slate-200 text-transparent') : 'bg-transparent border-transparent text-slate-400')}>
                  {/[A-Z]/.test(ch) ? (guessedLetters.has(ch) || roundResult === 'lose' ? ch : '_') : ch}
                </div>
              ))}
            </div>
            {roundResult && (
              <div className={cn("text-center py-2 rounded-xl font-bold text-sm animate-in zoom-in", roundResult === 'win' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700')}>
                {roundResult === 'win' ? '✅ Chính xác!' : `❌ Đáp án: ${targetWord}`}
              </div>
            )}
            <div className="grid grid-cols-9 gap-1.5">
              {ALPHABET.map(letter => {
                const isGuessed = guessedLetters.has(letter);
                const isInWord = targetWord.includes(letter);
                return (
                  <button key={letter} onClick={() => guessLetter(letter)} disabled={isGuessed || !!roundResult} className={cn("h-9 rounded-lg text-xs font-black transition-all border cursor-pointer", isGuessed ? (isInWord ? 'bg-green-100 border-green-300 text-green-700' : 'bg-red-50 border-red-200 text-red-400 opacity-50') : 'bg-white border-slate-200 text-slate-700 hover:bg-indigo-50 hover:border-indigo-300 hover:scale-110 active:scale-90')}>
                    {letter}
                  </button>
                );
              })}
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
  { id: 'quiz', title: "Speed Quiz", description: "Đua thời gian trả lời trắc nghiệm nhanh. Chỉ 15 giây cho một câu hỏi thú vị!", icon: <Timer className="w-10 h-10" />, color: "bg-rose-500", shadow: "shadow-rose-500/20", xp: "+100 XP", players: "800 đang chơi" },
  { id: 'scram', title: "Word Scramble", description: "Nối chữ thành từ. Ghép các ký tự bị xáo trộn thành từ tiếng Anh hoàn chỉnh theo gợi ý!", icon: <Brain className="w-10 h-10" />, color: "bg-purple-500", shadow: "shadow-purple-500/20", xp: "+60 XP", players: "950 đang chơi" },
  { id: 'wordHunter', title: "Word Hunter", description: "Đoán chữ cái ẩn (Hangman). Nhập các chữ cái để tìm ra từ vựng bí mật trước khi hết lượt chơi!", icon: <Target className="w-10 h-10" />, color: "bg-rose-600", shadow: "shadow-rose-600/20", xp: "+80 XP", players: "1.3k đang chơi" },
  { id: 'imageGuess', title: "Image Guessing", description: "Đoán từ qua hình ảnh. Nhìn hình ảnh thực tế và ghép các chữ cái thành từ tiếng Anh chuẩn xác!", icon: <ImageIcon className="w-10 h-10" />, color: "bg-amber-500", shadow: "shadow-amber-500/20", xp: "+100 XP", players: "1.5k đang chơi" },
  { id: 'sentence', title: "Sentence Builder", description: "Nối từ thành câu. Lắp ghép các từ vựng lộn xộn thành câu nói chuẩn ngữ pháp!", icon: <Zap className="w-10 h-10" />, color: "bg-emerald-500", shadow: "shadow-emerald-500/20", xp: "+75 XP", players: "1.1k đang chơi" },
  { id: 'idiom', title: "Idiom Connector", description: "Nối từ thành thành ngữ. Khám phá kho tàng thành ngữ tiếng Anh qua trò chơi ghép chữ lý thú!", icon: <Sparkles className="w-10 h-10" />, color: "bg-violet-500", shadow: "shadow-violet-500/20", xp: "+120 XP", players: "640 đang chơi" },
];

export default function GamesPage() {
  const { user } = useAuth();
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'oxford' | 'toeic' | 'ielts' | 'notebook'>('all');
  const [dbWords, setDbWords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [rank, setRank] = useState<string>('#-');
  const [xp, setXp] = useState<string>('0');
  const [savingWord, setSavingWord] = useState<string | null>(null);
  const [savedWords, setSavedWords] = useState<Record<string, boolean>>({});

  const handleSaveToNotebook = async (word: any) => {
    if (!user) return;
    setSavingWord(word.word);
    try {
      const token = await user.getIdToken();
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      await fetch(`${API_BASE}/vocabulary/notebook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          word: word.word,
          meaningVi: word.meaningVi,
          meaningEn: word.meaningEn || word.word,
          wordType: word.wordType || '',
          phonetic: word.phonetic || ''
        })
      });
      setSavedWords(prev => ({ ...prev, [word.word.toLowerCase()]: true }));
    } catch (err) {
      console.error('Save to notebook failed:', err);
    } finally {
      setSavingWord(null);
    }
  };

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
        const token = user ? await user.getIdToken() : '';
        const headers: Record<string, string> = {
          'Content-Type': 'application/json'
        };
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(`${API_BASE}/vocabulary/game-data?limit=40&category=${selectedCategory}`, {
          headers
        });
        if (res.ok) {
          const data = await res.json();
          if (data.words) {
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
  }, [selectedCategory, user]);

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
      {activeGame === 'vocab' && <VocabMatchGame dbWords={dbWords} category={selectedCategory} onClose={() => setActiveGame(null)} awardXp={handleAwardXp} onSaveWord={handleSaveToNotebook} savedWords={savedWords} savingWord={savingWord} />}
      {activeGame === 'quiz' && <SpeedQuizGame dbWords={dbWords} category={selectedCategory} onClose={() => setActiveGame(null)} awardXp={handleAwardXp} onSaveWord={handleSaveToNotebook} savedWords={savedWords} savingWord={savingWord} />}
      {activeGame === 'scram' && <WordScrambleGame dbWords={dbWords} category={selectedCategory} onClose={() => setActiveGame(null)} awardXp={handleAwardXp} onSaveWord={handleSaveToNotebook} savedWords={savedWords} savingWord={savingWord} />}
      {activeGame === 'imageGuess' && <ImageGuessGame onClose={() => setActiveGame(null)} awardXp={handleAwardXp} />}
      {activeGame === 'sentence' && <SentenceBuilderGame dbWords={dbWords} category={selectedCategory} onClose={() => setActiveGame(null)} awardXp={handleAwardXp} onSaveWord={handleSaveToNotebook} savedWords={savedWords} savingWord={savingWord} />}
      {activeGame === 'idiom' && <IdiomConnectorGame onClose={() => setActiveGame(null)} awardXp={handleAwardXp} />}
      {activeGame === 'wordHunter' && <WordHunterGame dbWords={dbWords} category={selectedCategory} onClose={() => setActiveGame(null)} awardXp={handleAwardXp} onSaveWord={handleSaveToNotebook} savedWords={savedWords} savingWord={savingWord} />}

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

      {/* Category Selector */}
      <section className="flex flex-col items-center gap-4">
        <p className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Brain className="w-4 h-4 text-primary animate-pulse" /> Chọn danh mục từ vựng học tập:
        </p>
        <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl gap-2 border border-slate-200/50 dark:border-slate-800 shadow-sm max-w-2xl w-full overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: '🌐 Tất cả', desc: 'Từ ngẫu nhiên' },
            { id: 'oxford', label: '📖 Oxford', desc: 'Từ thông dụng' },
            { id: 'toeic', label: '💼 TOEIC', desc: 'Từ công sở' },
            { id: 'ielts', label: '🎓 IELTS', desc: 'Từ học thuật' },
            { id: 'notebook', label: '📓 Sổ tay', desc: 'Từ đã lưu' },
          ].map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={cn(
                  "flex-1 py-2 px-3 text-center rounded-xl transition-all cursor-pointer whitespace-nowrap min-w-[100px]",
                  isActive
                    ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-sm border border-slate-200/20 font-black"
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-bold"
                )}
              >
                <div className="text-xs">{cat.label}</div>
                <div className="text-[9px] font-medium opacity-60 mt-0.5">{cat.desc}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Vocabulary Preview Panel */}
      <section className="mx-auto max-w-4xl w-full px-6 py-5 bg-slate-50/50 dark:bg-slate-850/20 border border-slate-100 dark:border-slate-800/60 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500/20" /> 
            Từ vựng chuẩn bị ôn tập ({dbWords.length} từ)
          </h3>
          <span className="text-[10px] font-bold text-slate-450 dark:text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-full">
            {getCategoryLabel(selectedCategory)}
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/60 animate-pulse space-y-2">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : dbWords.length === 0 ? (
          <div className="p-6 text-center text-slate-500 text-xs font-semibold">
            {selectedCategory === 'notebook' 
              ? 'Sổ tay của bạn hiện đang trống. Hãy quay lại trang Từ Điển hoặc Chat để lưu thêm từ vựng!'
              : 'Không tìm thấy từ vựng nào thuộc danh mục này.'}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 overflow-x-auto no-scrollbar py-0.5">
            {dbWords.slice(0, 4).map((w, idx) => (
              <div 
                key={w.id || idx} 
                className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/80 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="font-black text-slate-800 dark:text-slate-100 text-sm truncate">{w.word}</span>
                    {w.cefrLevel && (
                      <span className="text-[9px] font-black px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-md">
                        {w.cefrLevel}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 dark:text-slate-555 mt-0.5">
                    {w.wordType && `[${w.wordType}]`} {w.phonetic || ''}
                  </div>
                </div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-455 border-t border-slate-100 dark:border-slate-800/50 mt-2.5 pt-2.5 line-clamp-1">
                  {w.meaningVi}
                </div>
              </div>
            ))}
          </div>
        )}
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
                    {['vocab', 'quiz', 'scram', 'sentence'].includes(game.id)
                      ? `Chơi (${getCategoryLabel(selectedCategory)})`
                      : 'Chơi Ngay'} 
                    <ChevronRight className="w-4 h-4" />
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
            {[{ label: 'Sát Thủ Tốc Độ', value: 'Cấp 4', icon: '⚡' }, { label: 'Vua Chính Tả', value: 'Cấp 2', icon: '👑' }, { label: 'Ghép Cặp Tài Ba', value: 'Cấp 5', icon: '🤝' }, { label: 'Cao Thủ Ngữ Pháp', value: 'Cấp 1', icon: '🎓' }].map((b, i) => (
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
