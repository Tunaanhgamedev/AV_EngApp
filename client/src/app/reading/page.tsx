'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, Loader2, Volume2, ChevronRight, Clock, BarChart3, Star, RefreshCcw, CheckCircle2, XCircle, BookMarked, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface Article {
  id: string;
  title: string;
  category: string;
  level: string;
  readTime: string;
  color: string;
  content: string;
  vocabulary: { word: string; meaning: string; ipa: string }[];
  questions: { q: string; options: string[]; answer: number }[];
}

const BUILT_IN_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'The Rise of Remote Work',
    category: 'Business',
    level: 'B1',
    readTime: '4 min',
    color: 'from-blue-500 to-indigo-600',
    content: `Remote work has become a defining feature of the modern workplace. Before 2020, only about 5% of full-time employees worked from home. Today, that number has risen to over 30% in many countries.

Companies like Google, Microsoft, and Twitter have adopted flexible work policies. Employees can now choose to work from home several days a week. This shift has had a profound impact on how businesses operate.

One major advantage of remote work is the elimination of commuting. Workers save an average of 40 minutes per day by not traveling to an office. This time can be spent on exercise, family, or personal development.

However, remote work also presents challenges. Many employees report feeling isolated and disconnected from their teams. Communication can be more difficult when colleagues are not in the same physical space.

To address these issues, companies are investing in collaboration tools such as Slack, Zoom, and Microsoft Teams. Some organizations have also created "hybrid" models, where employees come to the office two or three days a week.

The future of work is likely to be a blend of remote and in-person activities. As technology continues to improve, the boundaries between home and office will continue to blur.`,
    vocabulary: [
      { word: 'defining', meaning: 'mang tính quyết định', ipa: '/dɪˈfaɪnɪŋ/' },
      { word: 'flexible', meaning: 'linh hoạt', ipa: '/ˈfleksɪbl/' },
      { word: 'profound', meaning: 'sâu sắc', ipa: '/prəˈfaʊnd/' },
      { word: 'elimination', meaning: 'sự loại bỏ', ipa: '/ɪˌlɪmɪˈneɪʃn/' },
      { word: 'isolated', meaning: 'cô lập', ipa: '/ˈaɪsəleɪtɪd/' },
      { word: 'collaboration', meaning: 'sự hợp tác', ipa: '/kəˌlæbəˈreɪʃn/' },
    ],
    questions: [
      { q: 'What percentage of employees worked from home before 2020?', options: ['10%', '5%', '15%', '20%'], answer: 1 },
      { q: 'How much time do workers save daily by not commuting?', options: ['20 minutes', '30 minutes', '40 minutes', '60 minutes'], answer: 2 },
      { q: 'What is a "hybrid" work model?', options: ['Fully remote', 'Fully in-office', 'Mix of remote and office', 'Freelancing'], answer: 2 },
    ],
  },
  {
    id: 'art-2',
    title: 'How Sleep Affects Your Brain',
    category: 'Health & Science',
    level: 'B2',
    readTime: '5 min',
    color: 'from-violet-500 to-purple-600',
    content: `Sleep is not just a time of rest — it is an active period during which the brain performs critical functions. Scientists have discovered that sleep plays a vital role in memory consolidation, emotional regulation, and even physical repair.

During deep sleep, the brain replays experiences from the day. This process helps transfer information from short-term memory to long-term memory. Students who sleep well after studying tend to remember more than those who stay up late.

The brain also has a waste-clearing system called the glymphatic system, which is most active during sleep. This system removes toxic proteins, including those associated with Alzheimer's disease.

Lack of sleep can have serious consequences. Research shows that sleeping less than six hours per night increases the risk of heart disease, obesity, and depression. Even one night of poor sleep can impair decision-making and reaction time.

Experts recommend that adults aim for seven to nine hours of sleep per night. Maintaining a consistent sleep schedule, avoiding screens before bed, and keeping the bedroom cool and dark can all improve sleep quality.

In a world that often celebrates productivity and hustle, it is important to remember that sleep is not a luxury — it is a biological necessity.`,
    vocabulary: [
      { word: 'consolidation', meaning: 'sự củng cố', ipa: '/kənˌsɒlɪˈdeɪʃn/' },
      { word: 'regulation', meaning: 'sự điều hòa', ipa: '/ˌreɡjuˈleɪʃn/' },
      { word: 'toxic', meaning: 'độc hại', ipa: '/ˈtɒksɪk/' },
      { word: 'impair', meaning: 'làm suy giảm', ipa: '/ɪmˈpeə/' },
      { word: 'consistent', meaning: 'nhất quán', ipa: '/kənˈsɪstənt/' },
      { word: 'necessity', meaning: 'nhu cầu thiết yếu', ipa: '/nəˈsesɪti/' },
    ],
    questions: [
      { q: 'What does the brain do during deep sleep?', options: ['Shuts down', 'Replays experiences', 'Produces energy', 'Grows new cells'], answer: 1 },
      { q: 'What is the glymphatic system?', options: ['A sleep stage', 'A waste-clearing system', 'A memory function', 'A hormone'], answer: 1 },
      { q: 'How many hours of sleep do experts recommend for adults?', options: ['5-6 hours', '6-7 hours', '7-9 hours', '10+ hours'], answer: 2 },
    ],
  },
  {
    id: 'art-3',
    title: 'A Day in Tokyo',
    category: 'Travel & Culture',
    level: 'A2',
    readTime: '3 min',
    color: 'from-rose-500 to-pink-600',
    content: `Tokyo is one of the most exciting cities in the world. It is the capital of Japan and has a population of over 13 million people.

In the morning, many people take the train to work. Tokyo's train system is very efficient, but it can be extremely crowded during rush hour. Some train stations have staff who push passengers into the carriages!

For lunch, office workers often visit small restaurants called "izakaya" or eat at convenience stores. Japanese convenience stores are famous for their high-quality food, including onigiri (rice balls) and bento boxes.

In the afternoon, tourists can visit famous places like the Senso-ji temple in Asakusa or the trendy shops in Harajuku. Harajuku is known for its unique fashion and colorful street style.

In the evening, the Shibuya crossing comes alive with thousands of people crossing the street at the same time. It is one of the busiest pedestrian crossings in the world.

Tokyo is a city where ancient traditions meet modern technology. From traditional tea ceremonies to robot restaurants, there is always something new to discover.`,
    vocabulary: [
      { word: 'efficient', meaning: 'hiệu quả', ipa: '/ɪˈfɪʃnt/' },
      { word: 'crowded', meaning: 'đông đúc', ipa: '/ˈkraʊdɪd/' },
      { word: 'trendy', meaning: 'thời thượng', ipa: '/ˈtrendi/' },
      { word: 'pedestrian', meaning: 'người đi bộ', ipa: '/pəˈdestriən/' },
      { word: 'ancient', meaning: 'cổ đại', ipa: '/ˈeɪnʃənt/' },
    ],
    questions: [
      { q: 'What is the population of Tokyo?', options: ['5 million', '9 million', '13 million', '20 million'], answer: 2 },
      { q: 'What is Harajuku known for?', options: ['Temples', 'Unique fashion', 'Technology', 'Food markets'], answer: 1 },
    ],
  },
];

const speak = (text: string) => {
  if (typeof window === 'undefined') return;

  const playTranslateTTS = () => {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(text)}`;
    const audio = new Audio(url);
    audio.play().catch((err) => {
      console.error("Google Translate TTS fallback failed:", err);
    });
  };

  if (window.speechSynthesis) {
    const voices = window.speechSynthesis.getVoices();
    
    // Fallback to Translate TTS if no voices are loaded/installed
    if (voices.length === 0) {
      playTranslateTTS();
      return;
    }

    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US'; u.rate = 0.85;
    const v = voices.find(v => v.lang === 'en-US' && v.name.includes('Google')) || voices.find(v => v.lang === 'en-US');
    if (v) u.voice = v;

    u.onerror = (e) => {
      console.log("speechSynthesis error, playing Google Translate TTS:", e);
      playTranslateTTS();
    };
    
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setTimeout(() => {
        window.speechSynthesis.speak(u);
      }, 50);
    } else {
      window.speechSynthesis.speak(u);
    }
  } else {
    playTranslateTTS();
  }
};

export default function ReadingPage() {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>(BUILT_IN_ARTICLES);
  const [filterLevel, setFilterLevel] = useState<string>('All');
  const [selected, setSelected] = useState<Article>(BUILT_IN_ARTICLES[0]);
  const [activeTab, setActiveTab] = useState<'read' | 'vocab' | 'quiz'>('read');
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([]);
  const [quizDone, setQuizDone] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);

  useEffect(() => {
    setQuizAnswers(new Array(selected.questions.length).fill(null));
    setQuizDone(false);
    setActiveTab('read');
  }, [selected]);

  const handleQuizAnswer = (qi: number, ai: number) => {
    if (quizAnswers[qi] !== null) return;
    const next = [...quizAnswers];
    next[qi] = ai;
    setQuizAnswers(next);
    if (next.every(a => a !== null)) setTimeout(() => setQuizDone(true), 600);
  };

  const quizScore = quizDone ? selected.questions.filter((q, i) => quizAnswers[i] === q.answer).length : 0;

  const generateAIArticle = async () => {
    if (!user || aiGenerating) {
      if (!user) alert('Vui lòng đăng nhập để sử dụng tính năng tạo bài học bằng AI!');
      return;
    }
    setAiGenerating(true);
    try {
      const token = await user.getIdToken();
      const levelParam = filterLevel === 'All' ? 'B1' : filterLevel;
      const res = await fetch(`${API_BASE}/ai/generate-reading`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ level: levelParam })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.article) {
          setArticles(prev => {
            if (prev.some(a => a.id === data.article.id)) return prev;
            return [data.article, ...prev];
          });
          setSelected(data.article);
          alert('Đã tạo thành công bài đọc AI!');
        } else {
          alert('Lỗi phản hồi dữ liệu bài đọc.');
        }
      } else {
        alert('Tạo bài đọc bằng AI thất bại. Vui lòng thử lại!');
      }
    } catch (err) {
      console.error('AI article generation failed:', err);
      alert('Lỗi kết nối máy chủ AI.');
    } finally {
      setAiGenerating(false);
    }
  };

  const filteredArticles = articles.filter(art => filterLevel === 'All' || art.level === filterLevel);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />Reading Room
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Đọc hiểu bài viết tiếng Anh, học từ vựng trong ngữ cảnh và kiểm tra khả năng đọc hiểu.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-400 dark:text-slate-500 mr-2">Level:</span>
          {['All', 'A2', 'B1', 'B2'].map(f => (
            <button
              key={f}
              onClick={() => setFilterLevel(f)}
              className={cn(
                "px-3 py-1 border rounded-lg text-xs font-bold transition-all",
                filterLevel === f
                  ? "bg-primary text-white border-primary"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Article Header Card */}
          <div className={cn("premium-card overflow-hidden")}>
            <div className={cn("relative h-44 bg-gradient-to-br flex items-end p-8", selected.color)}>
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 w-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-white/20 text-white text-[10px] font-black rounded uppercase tracking-widest">{selected.level}</span>
                  <span className="px-2 py-1 bg-white/20 text-white text-[10px] font-black rounded uppercase tracking-widest">{selected.category}</span>
                  <span className="px-2 py-1 bg-white/20 text-white text-[10px] font-black rounded uppercase tracking-widest flex items-center gap-1"><Clock className="w-3 h-3" />{selected.readTime}</span>
                </div>
                <h2 className="text-2xl font-black text-white leading-tight">{selected.title}</h2>
              </div>
            </div>

            {/* Tab navigation */}
            <div className="flex border-b border-slate-100 dark:border-slate-800">
              {[
                { id: 'read' as const, label: 'Đọc Bài', icon: BookOpen },
                { id: 'vocab' as const, label: `Từ Vựng (${selected.vocabulary.length})`, icon: BookMarked },
                { id: 'quiz' as const, label: 'Kiểm Tra', icon: BarChart3 },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-1.5",
                    activeTab === tab.id ? "text-primary border-b-2 border-primary bg-white dark:bg-slate-900" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                  )}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-8">
              {/* Read Tab */}
              {activeTab === 'read' && (
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <button onClick={() => speak(selected.content.slice(0, 500))} className="flex items-center gap-1 text-xs font-bold text-primary hover:underline">
                      <Volume2 className="w-4 h-4" /> Nghe đọc bài
                    </button>
                  </div>
                  {selected.content.split('\n\n').map((para, i) => (
                    <p key={i} className="text-base text-slate-700 dark:text-slate-300 leading-[1.9] font-medium">
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {/* Vocab Tab */}
              {activeTab === 'vocab' && (
                <div className="space-y-3">
                  {selected.vocabulary.map((v, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary/30 hover:bg-primary/5 transition-all group">
                      <button onClick={() => speak(v.word)} className="p-2 bg-primary/10 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-black text-slate-800 dark:text-slate-200">{v.word}</span>
                          <span className="text-xs font-mono text-slate-400 dark:text-slate-500">{v.ipa}</span>
                        </div>
                        <p className="text-sm text-primary/70 italic">{v.meaning}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quiz Tab */}
              {activeTab === 'quiz' && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg flex items-center gap-2">🧠 Comprehension Check</h3>
                  {selected.questions.map((q, qi) => (
                    <div key={qi} className="space-y-3">
                      <p className="font-bold text-slate-700 dark:text-slate-300">{qi + 1}. {q.q}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, ai) => (
                          <button key={ai} onClick={() => handleQuizAnswer(qi, ai)}
                            className={cn("p-3 rounded-xl text-sm font-bold border-2 text-left transition-all",
                              quizAnswers[qi] === null ? "border-slate-100 dark:border-slate-800 hover:border-primary hover:bg-primary/5" :
                              ai === q.answer ? "bg-green-50 dark:bg-green-500/10 border-green-400 dark:border-green-500/50 text-green-700 dark:text-green-400" :
                              ai === quizAnswers[qi] ? "bg-rose-50 dark:bg-rose-500/10 border-rose-400 dark:border-rose-500/50 text-rose-700 dark:text-rose-400" : "border-slate-100 dark:border-slate-800 opacity-40"
                            )}>{opt}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                  {quizDone && (
                    <div className={cn("p-5 rounded-2xl text-center font-black animate-in zoom-in duration-300",
                      quizScore === selected.questions.length ? "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400" : "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400"
                    )}>
                      {quizScore === selected.questions.length ? <CheckCircle2 className="w-8 h-8 mx-auto mb-2" /> : <XCircle className="w-8 h-8 mx-auto mb-2" />}
                      {quizScore}/{selected.questions.length} Correct · {quizScore === selected.questions.length ? 'Excellent! +50 XP 🎉' : 'Keep practicing!'}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Article List */}
          <div className="premium-card p-6">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" />Bài Đọc</h3>
            <button
              onClick={generateAIArticle}
              disabled={aiGenerating}
              className="w-full mb-4 py-2.5 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/95 hover:to-indigo-650 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
            >
              {aiGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang tạo bài đọc AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Tạo bài đọc AI ({filterLevel === 'All' ? 'B1' : filterLevel})
                </>
              )}
            </button>
            <div className="space-y-3">
              {filteredArticles.length === 0 ? (
                <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-sm">
                  Chưa có bài đọc cấp độ này.
                </div>
              ) : (
                filteredArticles.map(article => (
                  <button key={article.id} onClick={() => setSelected(article)}
                    className={cn("w-full flex gap-4 p-3 rounded-2xl transition-all text-left group",
                      selected.id === article.id ? "bg-primary/5 ring-1 ring-primary/20 shadow-md" : "hover:bg-slate-50 dark:hover:bg-slate-800"
                    )}>
                    <div className={cn("w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-black text-sm flex-shrink-0", article.color)}>{article.level}</div>
                    <div className="flex-1 min-w-0 py-1">
                      <h4 className="text-sm font-bold truncate group-hover:text-primary transition-colors">{article.title}</h4>
                      <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">{article.category} · {article.readTime}</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* External Resources */}
          <div className="premium-card p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><ExternalLink className="w-5 h-5 text-primary" />Tài Nguyên Bên Ngoài</h3>
            <div className="space-y-3">
              {[
                { name: 'Breaking News English', url: 'https://breakingnewsenglish.com/', desc: 'Bài đọc từ tin tức, nhiều cấp độ' },
                { name: 'News in Levels', url: 'https://www.newsinlevels.com/', desc: 'Tin tức chia theo A1-C1' },
                { name: 'British Council', url: 'https://learnenglish.britishcouncil.org/skills/reading', desc: 'Bài đọc chính thống' },
              ].map(r => (
                <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer"
                  className="block p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-primary hover:bg-primary/5 transition-all group">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold group-hover:text-primary transition-colors">{r.name}</h4>
                    <ExternalLink className="w-3 h-3 text-slate-300 dark:text-slate-600 group-hover:text-primary" />
                  </div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">{r.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
