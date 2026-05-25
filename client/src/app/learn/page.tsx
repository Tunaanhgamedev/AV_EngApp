'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Volume2, 
  XCircle, 
  Lightbulb, 
  CheckCircle2,
  BrainCircuit,
  ChevronRight,
  Loader2,
  Trophy,
  User,
  Star,
  Clock,
  GraduationCap,
  Award,
  HelpCircle,
  Check,
  Info,
  Play
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

interface Word {
  id: string;
  word: string;
  phonetic: string;
  meaningEn: string;
  meaningVi: string;
  wordType: string;
  cefrLevel: string;
  audioUs?: string;
  usage?: string;
  example?: string;
  exampleVi?: string;
}

const levels = [
  { level: 'A1', label: 'Beginner', desc: 'Everyday basics: family, food, numbers', color: 'from-emerald-400 to-green-500', difficulty: '★', words: '~500' },
  { level: 'A2', label: 'Elementary', desc: 'Simple routines: shopping, travel, directions', color: 'from-cyan-400 to-blue-500', difficulty: '★★', words: '~500' },
  { level: 'B1', label: 'Intermediate', desc: 'Work, education, opinions, and experiences', color: 'from-indigo-400 to-violet-500', difficulty: '★★★', words: '~1000' },
  { level: 'B2', label: 'Upper-Intermediate', desc: 'Abstract ideas, news, technical discussions', color: 'from-purple-400 to-fuchsia-500', difficulty: '★★★★', words: '~1000' },
  { level: 'C1', label: 'Advanced', desc: 'Academic texts, complex arguments', color: 'from-rose-400 to-pink-500', difficulty: '★★★★★', words: '~500' },
  { level: 'C2', label: 'Proficiency', desc: 'Native-like precision and nuance', color: 'from-orange-400 to-amber-500', difficulty: '🏆', words: '~200' },
];

// ─── English Foundation Grammar Data ──────────────────────────────────────────
const FOUNDATION_TOPICS = [
  {
    id: 'pronouns',
    title: 'Subject Pronouns (Đại Từ Nhân Xưng)',
    desc: 'Làm quen với đại từ đóng vai trò chủ ngữ và tân ngữ trong câu.',
    icon: User,
    color: 'border-sky-200 bg-sky-50 text-sky-800',
    content: {
      theory: 'Đại từ nhân xưng là từ dùng để đại diện cho một danh từ chỉ người hoặc vật để tránh lặp từ. Dưới đây là bảng phân loại cốt lõi và các ví dụ phát âm mẫu.',
      table: [
        { pronoun: 'I', role: 'Chủ ngữ (S)', meaning: 'Tôi, tớ, mình (Số ít, ngôi 1)', example: 'I study English every day.' },
        { pronoun: 'me', role: 'Tân ngữ (O)', meaning: 'Tôi (đứng sau động từ)', example: 'She loves me.' },
        { pronoun: 'You', role: 'Chủ ngữ / Tân ngữ', meaning: 'Bạn, các bạn (Ngôi 2)', example: 'You are a good friend.' },
        { pronoun: 'We', role: 'Chủ ngữ (S)', meaning: 'Chúng tôi, chúng ta (Số nhiều, ngôi 1)', example: 'We study grammar.' },
        { pronoun: 'us', role: 'Tân ngữ (O)', meaning: 'Chúng tôi (đứng sau động từ)', example: 'The teacher helps us.' },
        { pronoun: 'They', role: 'Chủ ngữ (S)', meaning: 'Họ, chúng nó (Số nhiều, ngôi 3)', example: 'They speak English fluently.' },
        { pronoun: 'He', role: 'Chủ ngữ (S)', meaning: 'Anh ấy, ông ấy (Số ít, ngôi 3 nam)', example: 'He works at a school.' },
        { pronoun: 'him', role: 'Tân ngữ (O)', meaning: 'Anh ấy (đứng sau động từ)', example: 'I talk to him.' },
        { pronoun: 'She', role: 'Chủ ngữ (S)', meaning: 'Cô ấy, bà ấy (Số ít, ngôi 3 nữ)', example: 'She is very smart.' },
        { pronoun: 'her', role: 'Tân ngữ (O)', meaning: 'Cô ấy (đứng sau động từ)', example: 'Tell her the truth.' },
        { pronoun: 'It', role: 'Chủ ngữ / Tân ngữ', meaning: 'Nó (Số ít, ngôi 3 vật/động vật)', example: 'It is a beautiful day.' },
      ],
      quiz: [
        { question: '... is my sister. Her name is Lan.', options: ['He', 'She', 'They', 'It'], answer: 'She', explanation: 'Chủ ngữ chỉ nữ số ít ở đây là She.' },
        { question: 'Nam and I are friends. ... learn English together.', options: ['We', 'They', 'You', 'I'], answer: 'We', explanation: '"Nam and I" tương đương với chúng tôi (We).' },
        { question: 'Where is the book? ... is on the table.', options: ['He', 'She', 'It', 'We'], answer: 'It', explanation: '"The book" là vật số ít nên dùng It.' },
        { question: 'Do you know that boy? I want to invite ... to the party.', options: ['he', 'him', 'she', 'us'], answer: 'him', explanation: 'Đứng sau động từ "invite" ta dùng tân ngữ chỉ nam số ít "him".' },
        { question: 'My parents are retired. ... live in a small village.', options: ['We', 'They', 'You', 'He'], answer: 'They', explanation: 'Chủ ngữ chỉ số nhiều "parents" ở đây thay thế bằng They.' },
        { question: 'This is my mother. I love ... very much.', options: ['she', 'her', 'it', 'me'], answer: 'her', explanation: 'Tân ngữ đứng sau động từ chỉ nữ số ít là her.' },
        { question: 'John is a teacher. ... teaches English at high school.', options: ['He', 'Him', 'His', 'She'], answer: 'He', explanation: 'John là nam số ít, làm chủ ngữ trước động từ nên chọn He.' },
        { question: 'Our cat is cute. ... likes playing with balls.', options: ['He', 'It', 'We', 'They'], answer: 'It', explanation: 'Thú cưng/động vật số ít ta dùng đại từ It.' },
        { question: 'Can you help ...? I cannot lift this heavy box.', options: ['me', 'I', 'him', 'us'], answer: 'me', explanation: 'Tân ngữ chịu tác động của hành động "help" của người nói là me.' },
        { question: 'We are hungry. Please give ... some bread.', options: ['us', 'we', 'them', 'me'], answer: 'us', explanation: 'Đứng sau động từ "give" cần tân ngữ. "We" biến thành tân ngữ "us".' },
      ]
    }
  },
  {
    id: 'tobe',
    title: 'Verb "To Be" (Động từ To Be)',
    desc: 'Làm chủ động từ cốt lõi mang ý nghĩa: Thì, Là, Ở.',
    icon: Star,
    color: 'border-amber-200 bg-amber-50 text-amber-800',
    content: {
      theory: 'Động từ "To Be" là động từ cơ bản nhất trong tiếng Anh. Ở thời hiện tại, nó có 3 dạng (am, is, are) chia theo chủ ngữ.',
      forms: [
        { tense: 'Hiện tại đơn (Present Simple)', rules: 'I + am | He / She / It / Danh từ số ít + is | You / We / They / Danh từ số nhiều + are', example: 'I am a student. She is busy. We are at home.' },
        { tense: 'Quá khứ đơn (Past Simple)', rules: 'I / He / She / It / Danh từ số ít + was | You / We / They / Danh từ số nhiều + were', example: 'They were happy yesterday. He was tired.' },
        { tense: 'Tương lai đơn (Future Simple)', rules: 'Tất cả các chủ ngữ + will be', example: 'It will be sunny tomorrow.' },
      ],
      quiz: [
        { question: 'She ... a beautiful girl.', options: ['am', 'is', 'are', 'was'], answer: 'is', explanation: 'Chủ ngữ "She" đi với "is" ở thì hiện tại.' },
        { question: 'They ... at the school yesterday.', options: ['are', 'was', 'were', 'be'], answer: 'were', explanation: '"yesterday" là quá khứ, chủ ngữ "They" đi với "were".' },
        { question: 'I ... an English student.', options: ['am', 'is', 'are', 'be'], answer: 'am', explanation: 'Chủ ngữ "I" luôn đi với "am" ở hiện tại đơn.' },
        { question: 'We ... in Hanoi next week.', options: ['are', 'was', 'were', 'will be'], answer: 'will be', explanation: '"next week" biểu thị tương lai, nên dùng "will be".' },
        { question: 'You ... very kind to help me yesterday.', options: ['are', 'were', 'was', 'will be'], answer: 'were', explanation: '"yesterday" chỉ quá khứ, chủ ngữ "You" đi với "were".' },
        { question: 'The weather ... nice today.', options: ['is', 'am', 'are', 'was'], answer: 'is', explanation: '"today" là hiện tại, "The weather" là danh từ không đếm được/số ít đi với "is".' },
        { question: 'Last year, she ... only 20 years old. Now she ... 21.', options: ['is / was', 'was / is', 'were / is', 'will be / is'], answer: 'was / is', explanation: '"Last year" chia quá khứ (was), "Now" chia hiện tại (is).' },
        { question: 'Where ... you born?', options: ['are', 'was', 'were', 'did'], answer: 'were', explanation: 'Cấu trúc hỏi sinh ra ở đâu dùng quá khứ đơn "were you born".' },
        { question: 'I ... busy tomorrow, so I cannot visit you.', options: ['am', 'was', 'will be', 'be'], answer: 'will be', explanation: '"tomorrow" biểu thị tương lai, dùng "will be".' },
        { question: 'These books ... mine. Do not take them.', options: ['is', 'are', 'was', 'be'], answer: 'are', explanation: '"These books" là danh từ số nhiều ở hiện tại, dùng "are".' },
      ]
    }
  },
  {
    id: 'tenses',
    title: 'Basic Tenses (5 Thì Cơ Bản)',
    desc: 'Trọng tâm 5 thì cơ bản nhất giúp người mất gốc khôi phục nền tảng.',
    icon: Clock,
    color: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    content: {
      tenses: [
        {
          name: '1. Hiện tại đơn (Present Simple)',
          formula: 'S + V(s/es) | S + am/is/are + ...',
          usage: 'Diễn tả thói quen, hành động lặp đi lặp lại hoặc sự thật hiển nhiên.',
          example: 'He walks to school every day.'
        },
        {
          name: '2. Hiện tại tiếp diễn (Present Continuous)',
          formula: 'S + am/is/are + V-ing',
          usage: 'Diễn tả hành động đang diễn ra ngay tại thời điểm nói.',
          example: 'I am learning English right now.'
        },
        {
          name: '3. Quá khứ đơn (Past Simple)',
          formula: 'S + V2/ed | S + was/were + ...',
          usage: 'Diễn tả hành động đã xảy ra và kết thúc hoàn toàn trong quá khứ.',
          example: 'They visited Hanoi last week.'
        },
        {
          name: '4. Hiện tại hoàn thành (Present Perfect)',
          formula: 'S + have/has + V3/ed',
          usage: 'Diễn tả kinh nghiệm, trải nghiệm hoặc hành động bắt đầu ở quá khứ kéo dài tới hiện tại.',
          example: 'She has lived here for three years.'
        },
        {
          name: '5. Tương lai đơn (Future Simple)',
          formula: 'S + will + V-inf',
          usage: 'Diễn tả dự định đưa ra tức thời khi nói hoặc dự đoán tương lai.',
          example: 'I will call you tonight.'
        }
      ],
      quiz: [
        { question: 'Every day, he ... up at 6 AM.', options: ['get', 'gets', 'getting', 'got'], answer: 'gets', explanation: '"Every day" chỉ thói quen hiện tại, chủ ngữ "he" số ít nên thêm s/es.' },
        { question: 'Listen! The baby ... in the bedroom.', options: ['cries', 'cried', 'is crying', 'will cry'], answer: 'is crying', explanation: '"Listen!" báo hiệu hành động đang diễn ra nên dùng hiện tại tiếp diễn.' },
        { question: 'We ... this movie last night.', options: ['watch', 'watched', 'watching', 'have watched'], answer: 'watched', explanation: '"last night" báo hiệu quá khứ đơn.' },
        { question: 'I ... English since 2020.', options: ['learn', 'learnt', 'have learnt', 'am learning'], answer: 'have learnt', explanation: '"since 2020" chỉ thời gian kéo dài từ quá khứ đến nay, dùng hiện tại hoàn thành.' },
        { question: 'Look! The train ... . Let\'s run!', options: ['comes', 'came', 'is coming', 'will come'], answer: 'is coming', explanation: '"Look!" báo hiệu hành động đang xảy ra trước mắt nên dùng hiện tại tiếp diễn.' },
        { question: 'Next summer, we ... a trip to Da Nang.', options: ['take', 'took', 'will take', 'have taken'], answer: 'will take', explanation: '"Next summer" là trạng từ chỉ thời gian trong tương lai, dùng tương lai đơn "will take".' },
        { question: 'Water ... at 100 degrees Celsius.', options: ['boil', 'boils', 'boiled', 'is boiling'], answer: 'boils', explanation: 'Đây là sự thật hiển nhiên, dùng hiện tại đơn và chia số ít cho Water.' },
        { question: 'She ... her homework yet.', options: ['didn\'t finish', 'hasn\'t finished', 'doesn\'t finish', 'won\'t finish'], answer: 'hasn\'t finished', explanation: '"yet" báo hiệu câu phủ định của thì hiện tại hoàn thành (has not + V3/ed).' },
        { question: 'Yesterday, I ... my keys at the office.', options: ['lose', 'lost', 'losing', 'have lost'], answer: 'lost', explanation: '"Yesterday" là trạng từ chỉ quá khứ đơn. Dạng quá khứ của lose là lost.' },
        { question: 'They usually ... football on Sunday afternoons.', options: ['play', 'plays', 'played', 'playing'], answer: 'play', explanation: '"usually" chỉ thói quen hiện tại, chủ ngữ "They" số nhiều nên giữ nguyên động từ play.' },
      ]
    }
  }
];

const speak = (text: string) => {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
    
    try {
      const dummy = new SpeechSynthesisUtterance('');
      window.speechSynthesis.speak(dummy);
    } catch (e) {}
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.75;
    
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google') && v.lang === 'en-US') || 
                           voices.find(v => v.lang === 'en-US');
    
    if (preferredVoice) utterance.voice = preferredVoice;
    window.speechSynthesis.speak(utterance);
  }
};

export default function LearnPage() {
  const { user } = useAuth();
  
  // Tab/Mode select state
  const [activeMode, setActiveMode] = useState<'foundation' | 'vocabulary'>('foundation');
  
  // Vocabulary Flashcard states
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Foundation grammar states
  const [selectedTopicId, setSelectedTopicId] = useState<string>('pronouns');
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState<any[]>([]);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const activeTopic = FOUNDATION_TOPICS.find(t => t.id === selectedTopicId) || FOUNDATION_TOPICS[0];

  // Fetch words effect
  useEffect(() => {
    const fetchNewWords = async () => {
      if (!selectedLevel) return;
      setLoading(true);
      setWords([]);
      setCurrentIndex(0);
      setCompleted(false);
      
      try {
        const headers: Record<string, string> = {};
        if (user) {
          const token = await user.getIdToken();
          headers['Authorization'] = `Bearer ${token}`;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/vocabulary/learn-new?level=${selectedLevel}&limit=15`, {
          headers
        });
        const data = await res.json();
        setWords(data.words || []);
      } catch (err) {
        console.error(err);
        setWords([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNewWords();
  }, [user, selectedLevel]);

  const playPronunciation = () => {
    const word = words[currentIndex];
    if (!word) return;
    
    if (word.audioUs) {
      const audio = new Audio(word.audioUs);
      audio.play().catch(() => {
        speak(word.word);
      });
    } else {
      speak(word.word);
    }
  };

  // Auto-play vocab card pronunciation
  useEffect(() => {
    if (activeMode === 'vocabulary' && words[currentIndex] && !loading && !completed) {
      const timer = setTimeout(() => playPronunciation(), 600);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, words, loading, completed, activeMode]);

  const handleNext = () => {
    setShowHint(false);
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(((currentIndex + 1) / words.length) * 100);
    } else {
      setCompleted(true);
    }
  };

  const handleIKnowIt = async () => {
    const word = words[currentIndex];
    if (user && word) {
      try {
        const token = await user.getIdToken();
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/vocabulary/save`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ wordId: word.id })
        });
      } catch (err) {
        console.error('Save error:', err);
      }
    }
    handleNext();
  };

  // Generate randomized shuffled quiz questions subset
  const generateQuiz = () => {
    const topic = FOUNDATION_TOPICS.find(t => t.id === selectedTopicId) || FOUNDATION_TOPICS[0];
    if (topic && topic.content.quiz) {
      // Shuffle the copy of the quiz array
      const shuffled = [...topic.content.quiz].sort(() => Math.random() - 0.5);
      // Select 5 questions from the pool to keep quiz dynamic and highly replayable
      setCurrentQuizQuestions(shuffled.slice(0, 5));
    }
    setQuizIndex(0);
    setSelectedAnswer(null);
    setQuizFinished(false);
    setScore(0);
  };

  // Re-generate quiz when topic changes
  useEffect(() => {
    generateQuiz();
  }, [selectedTopicId]);

  const handleTopicSelect = (id: string) => {
    setSelectedTopicId(id);
  };

  const handleAnswerSelect = (option: string) => {
    if (selectedAnswer !== null) return; // already answered
    setSelectedAnswer(option);
    if (currentQuizQuestions[quizIndex] && option === currentQuizQuestions[quizIndex].answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    if (quizIndex < currentQuizQuestions.length - 1) {
      setQuizIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-8 animate-in fade-in duration-700 pb-12">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/60 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-primary" /> Study Center
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">
            Học từ vựng theo trình độ CEFR chuẩn quốc tế và ôn luyện ngữ pháp cơ bản cho người mất gốc.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl self-start md:self-center">
          <button
            onClick={() => setActiveMode('foundation')}
            className={cn(
              "px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer",
              activeMode === 'foundation' 
                ? "bg-slate-900 text-white shadow-md" 
                : "text-slate-500 hover:text-slate-800"
            )}
          >
            <GraduationCap className="w-4 h-4" /> Lấy gốc ngữ pháp
          </button>
          <button
            onClick={() => setActiveMode('vocabulary')}
            className={cn(
              "px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer",
              activeMode === 'vocabulary' 
                ? "bg-slate-900 text-white shadow-md" 
                : "text-slate-500 hover:text-slate-800"
            )}
          >
            <BrainCircuit className="w-4 h-4" /> Từ Vựng CEFR
          </button>
        </div>
      </header>

      {/* ════════════════════════════════════════════ ENGLISH FOUNDATION MODE ══════ */}
      {activeMode === 'foundation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar Menu: Select Grammar Topic */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 scrollbar-thin scrollbar-thumb-slate-200">
            {FOUNDATION_TOPICS.map((topic) => {
              const TopicIcon = topic.icon;
              const isSelected = selectedTopicId === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => handleTopicSelect(topic.id)}
                  className={cn(
                    "flex-shrink-0 lg:flex-shrink w-72 lg:w-full premium-card p-5 border text-left flex items-start gap-4 transition-all hover:-translate-y-0.5 cursor-pointer",
                    isSelected 
                      ? "bg-slate-900 border-slate-950 text-white shadow-lg" 
                      : "bg-white border-slate-200/80 text-slate-700 hover:border-primary"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center font-bold",
                    isSelected ? "bg-white/10 text-white" : "bg-primary/10 text-primary"
                  )}>
                    <TopicIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={cn("font-bold text-sm", isSelected ? "text-white" : "text-slate-800")}>
                      {topic.title}
                    </h3>
                    <p className={cn("text-[11px] mt-0.5 leading-relaxed font-medium truncate", isSelected ? "text-slate-400" : "text-slate-500")}>
                      {topic.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Main Panel: Display Theory, Examples & Interactive Quiz */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Theory Card */}
            <div className="premium-card p-6 md:p-8 bg-white border border-slate-200 rounded-[2rem] space-y-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">Lý Thuyết & Cấu Trúc</span>
                <h2 className="text-2xl font-black text-slate-800 mt-2">{activeTopic.title}</h2>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mt-2">{activeTopic.content.theory}</p>
              </div>

              {/* Render Dynamic Layout based on topic content type */}
              {activeTopic.id === 'pronouns' && activeTopic.content.table && (
                <div className="border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="p-3.5 font-black text-slate-700">Đại Từ</th>
                          <th className="p-3.5 font-black text-slate-700">Vai trò</th>
                          <th className="p-3.5 font-black text-slate-700">Ý nghĩa</th>
                          <th className="p-3.5 font-black text-slate-700 text-right">Ví dụ mẫu</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeTopic.content.table.map((row, i) => (
                          <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50">
                            <td className="p-3.5 font-mono font-black text-primary text-sm">{row.pronoun}</td>
                            <td className="p-3.5 font-bold text-slate-500">{row.role}</td>
                            <td className="p-3.5 font-medium text-slate-600">{row.meaning}</td>
                            <td className="p-3.5 text-right">
                              <button
                                onClick={() => speak(row.example)}
                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 hover:bg-primary/5 hover:border-primary hover:text-primary transition-all cursor-pointer"
                              >
                                {row.example} <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTopic.id === 'tobe' && activeTopic.content.forms && (
                <div className="space-y-4">
                  {activeTopic.content.forms.map((form, i) => (
                    <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                      <h4 className="text-xs font-black text-primary uppercase tracking-wider">{form.tense}</h4>
                      <p className="text-xs font-bold text-slate-700">Công thức: <code className="bg-slate-200/80 px-1.5 py-0.5 rounded font-mono text-[11px]">{form.rules}</code></p>
                      <div className="flex items-center justify-between border-t border-slate-200/40 pt-2 text-xs">
                        <span className="text-slate-500 font-medium italic">Ví dụ: "{form.example}"</span>
                        <button
                          onClick={() => speak(form.example)}
                          className="flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 rounded-lg font-bold text-[10px] text-slate-600 hover:border-primary transition-all cursor-pointer"
                        >
                          Phát âm <Volume2 className="w-3 h-3 text-slate-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTopic.id === 'tenses' && activeTopic.content.tenses && (
                <div className="space-y-4">
                  {activeTopic.content.tenses.map((tense, i) => (
                    <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                      <h4 className="text-sm font-black text-slate-800">{tense.name}</h4>
                      <p className="text-xs font-bold text-slate-600">Cấu trúc: <code className="bg-slate-200/80 px-1.5 py-0.5 rounded font-mono text-[11px]">{tense.formula}</code></p>
                      <p className="text-xs text-slate-500 font-medium">Cách dùng: {tense.usage}</p>
                      <div className="flex items-center justify-between border-t border-slate-200/40 pt-2 text-xs">
                        <span className="text-slate-700 font-bold italic">Ví dụ: "{tense.example}"</span>
                        <button
                          onClick={() => speak(tense.example)}
                          className="flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 rounded-lg font-bold text-[10px] text-slate-600 hover:border-primary transition-all cursor-pointer"
                        >
                          Phát âm <Volume2 className="w-3 h-3 text-slate-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quiz / Practice Card */}
            <div className="premium-card p-6 md:p-8 bg-white border border-slate-200 rounded-[2rem] space-y-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">BÀI TẬP THỰC HÀNH</span>
                <h2 className="text-xl font-black text-slate-800 mt-2">Trắc Nghiệm Khắc Cốt Ghi Tâm</h2>
                <p className="text-xs text-slate-500 mt-1">Mỗi lượt ôn tập sẽ ngẫu nhiên chọn ra 5 câu hỏi từ kho đề để bạn luyện tập.</p>
              </div>

              {!quizFinished && currentQuizQuestions.length > 0 && currentQuizQuestions[quizIndex] ? (
                <div className="space-y-6">
                  {/* Progress info */}
                  <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
                    <span>Câu {quizIndex + 1} / {currentQuizQuestions.length}</span>
                    <span>Điểm số hiện tại: {score}</span>
                  </div>

                  {/* Question Box */}
                  <div className="p-5 bg-slate-900 text-white rounded-2xl shadow-inner font-bold text-base leading-relaxed text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-2 font-mono">ĐIỀN TỪ CÒN THIẾU</span>
                    "{currentQuizQuestions[quizIndex].question}"
                  </div>

                  {/* Choices Options Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {currentQuizQuestions[quizIndex].options.map((opt: string) => {
                      const isCorrect = opt === currentQuizQuestions[quizIndex].answer;
                      const isSelected = selectedAnswer === opt;
                      const hasAnswered = selectedAnswer !== null;

                      return (
                        <button
                          key={opt}
                          onClick={() => handleAnswerSelect(opt)}
                          disabled={hasAnswered}
                          className={cn(
                            "p-4 rounded-xl border-2 text-sm font-black text-center transition-all cursor-pointer select-none",
                            hasAnswered
                              ? isCorrect
                                ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                                : isSelected
                                  ? "bg-rose-50 border-rose-500 text-rose-700"
                                  : "bg-white border-slate-200 text-slate-400"
                              : "bg-white border-slate-200 text-slate-700 hover:border-primary hover:bg-primary/5 active:scale-95"
                          )}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback and Explanation */}
                  {selectedAnswer !== null && (
                    <div className={cn(
                      "p-4 rounded-2xl border animate-in slide-in-from-top-2 duration-300",
                      selectedAnswer === currentQuizQuestions[quizIndex].answer
                        ? "bg-emerald-50/50 border-emerald-200 text-emerald-800"
                        : "bg-rose-50/50 border-rose-200 text-rose-800"
                    )}>
                      <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-1.5">
                        {selectedAnswer === currentQuizQuestions[quizIndex].answer ? (
                          <>🎉 Tuyệt vời! Bạn trả lời đúng.</>
                        ) : (
                          <>⚠️ Chưa chính xác rồi!</>
                        )}
                      </h4>
                      <p className="text-xs font-medium mt-1 leading-relaxed">{currentQuizQuestions[quizIndex].explanation}</p>
                      
                      <button
                        onClick={handleNextQuiz}
                        className="mt-3 w-full bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider py-2.5 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        Tiếp tục <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // Quiz Finish Scorecard
                <div className="flex flex-col items-center justify-center text-center py-6 space-y-6 animate-in zoom-in-95 duration-500">
                  <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl shadow-yellow-100">
                    <Trophy className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800">Hoàn Thành Luyện Tập!</h3>
                    <p className="text-sm text-slate-500 font-medium mt-1">Kết quả: bạn trả lời đúng <strong className="text-slate-800 font-black">{score}/{currentQuizQuestions.length}</strong> câu hỏi.</p>
                  </div>
                  <div className="flex gap-3 w-full">
                    <button
                      onClick={generateQuiz}
                      className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-widest rounded-xl transition-all active:scale-95 cursor-pointer"
                    >
                      Làm Lượt Mới (Random câu hỏi)
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════ CEFR VOCABULARY MODE ═════════ */}
      {activeMode === 'vocabulary' && (
        <>
          {!selectedLevel ? (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-955 text-white rounded-full">
                  <BrainCircuit className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Daily Flashcards</span>
                </div>
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">Vocabulary CEFR levels</h2>
                <p className="text-slate-500 font-medium text-sm">Học 15 từ vựng mới mỗi ngày theo trình độ tiêu chuẩn Châu Âu.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {levels.map(l => (
                  <button 
                    key={l.level} 
                    onClick={() => setSelectedLevel(l.level)}
                    className="bg-white rounded-[2rem] p-6 border border-slate-200/80 hover:border-primary flex flex-col items-start gap-4 hover:shadow-xl transition-all group text-left relative overflow-hidden cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${l.color} flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:scale-105 transition-transform`}>
                        {l.level}
                      </div>
                      <span className="text-amber-400 text-sm font-bold">{l.difficulty}</span>
                    </div>
                    <div>
                      <h3 className="font-black text-lg text-slate-800">{l.label}</h3>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">{l.desc}</p>
                    </div>
                    <div className="flex items-center justify-between w-full pt-3 border-t border-slate-100">
                      <span className="text-[11px] font-bold text-slate-400">{l.words} words</span>
                      <span className="text-xs font-black text-[#002147] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                        Bắt đầu <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : loading ? (
            <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4">
              <Loader2 className="w-10 h-10 text-[#002147] animate-spin" />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] animate-pulse">Đang tải từ mới...</p>
            </div>
          ) : words.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[40vh] text-center space-y-6">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                <BrainCircuit className="w-10 h-10 text-slate-300" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-800">Không có dữ liệu từ mới</h2>
                <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1 font-medium">Hiện tại không thể tải từ vựng mới cấp độ {selectedLevel}. Vui lòng thử lại sau.</p>
              </div>
              <button 
                onClick={() => setSelectedLevel(null)}
                className="px-8 py-3 bg-[#002147] text-white rounded-xl font-bold hover:shadow-lg transition-all cursor-pointer"
              >
                Trở lại Chọn Trình Độ
              </button>
            </div>
          ) : completed ? (
            <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-6 text-center animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl shadow-yellow-100">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-800">Tuyệt vời!</h1>
                <p className="text-sm text-slate-500 mt-1 font-medium">Bạn đã hoàn thành việc học 15 từ vựng mới cấp độ {selectedLevel}.</p>
              </div>
              <button 
                onClick={() => setSelectedLevel(null)}
                className="px-10 py-3 bg-[#002147] text-white rounded-xl font-bold shadow-md cursor-pointer"
              >
                Tiếp Tục Học
              </button>
            </div>
          ) : (
            // Flashcard content
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setSelectedLevel(null)}
                  className="flex items-center gap-1 text-slate-400 hover:text-slate-600 font-bold transition-colors cursor-pointer text-xs"
                >
                  <ChevronLeft className="w-4 h-4" /> Chọn Cấp Độ
                </button>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 bg-green-50 border border-green-100 text-[10px] font-black text-green-700 rounded-full">{selectedLevel}</span>
                  <span className="text-xs font-black text-slate-400">{currentIndex + 1}/{words.length}</span>
                </div>
              </div>

              {/* Word Flashcard */}
              <div className="perspective-1000 w-full h-[450px]">
                <div className={cn(
                  "relative w-full h-full preserve-3d transition-transform duration-500 border border-slate-200/80 rounded-[2.5rem] shadow-xl overflow-hidden",
                  showHint ? "rotate-y-180" : ""
                )}>
                  {/* Front Side */}
                  <div className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center text-center bg-white p-8">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-[9px] font-black rounded-full uppercase tracking-wider mb-4">
                      {words[currentIndex].cefrLevel}
                    </span>
                    <h1 className="text-5xl font-black text-slate-800 tracking-tight mb-2">{words[currentIndex].word}</h1>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-serif text-slate-400">{words[currentIndex].phonetic}</span>
                      <span className="text-xs font-bold text-rose-500 font-sans italic">({words[currentIndex].wordType})</span>
                    </div>
                    <button 
                      onClick={playPronunciation}
                      className="mt-6 w-16 h-16 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition-all shadow-sm cursor-pointer"
                    >
                      <Volume2 className="w-8 h-8" />
                    </button>
                    <p className="absolute bottom-6 text-[10px] text-slate-300 font-black uppercase tracking-wider">Nhấn "Hiện gợi ý" bên dưới để lật thẻ</p>
                  </div>

                  {/* Back Side */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center text-center bg-[#002147] text-white p-8 overflow-y-auto">
                    <div className="space-y-4 w-full">
                      <div>
                        <span className="text-[9px] text-emerald-400 font-black uppercase tracking-widest block">Nghĩa tiếng Việt</span>
                        <h2 className="text-2xl font-black text-emerald-400 mt-1">{words[currentIndex].meaningVi}</h2>
                      </div>
                      <div className="border-t border-white/10 pt-3">
                        <span className="text-[9px] text-white/40 font-black uppercase tracking-widest block block">Định nghĩa (EN)</span>
                        <p className="text-sm text-slate-200 mt-1 italic leading-relaxed">"{words[currentIndex].meaningEn}"</p>
                      </div>
                      {words[currentIndex].example && (
                        <div className="border-t border-white/10 pt-3 text-left">
                          <span className="text-[9px] text-white/40 font-black uppercase tracking-widest block mb-1">Ví dụ minh họa</span>
                          <p className="text-xs text-white font-medium italic">"{words[currentIndex].example}"</p>
                          {words[currentIndex].exampleVi && <p className="text-[11px] text-emerald-400/80 mt-0.5 italic">{words[currentIndex].exampleVi}</p>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={handleNext}
                  className="flex flex-col items-center gap-1.5 py-4 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-rose-50 hover:border-rose-200 group transition-all cursor-pointer"
                >
                  <XCircle className="w-6 h-6 text-rose-500" />
                  <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest">Đang Học</span>
                </button>

                <button 
                  onClick={() => setShowHint(!showHint)}
                  className="flex flex-col items-center gap-1.5 py-4 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-amber-50 hover:border-amber-200 group transition-all cursor-pointer"
                >
                  <Lightbulb className="w-6 h-6 text-amber-500" />
                  <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">{showHint ? 'Ẩn gợi ý' : 'Hiện gợi ý'}</span>
                </button>

                <button 
                  onClick={handleIKnowIt}
                  className="flex flex-col items-center gap-1.5 py-4 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-green-50 hover:border-green-200 group transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Đã Thuộc</span>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
