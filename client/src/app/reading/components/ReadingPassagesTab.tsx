'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, Loader2, Volume2, Clock, BarChart3, CheckCircle2, XCircle, BookMarked, ExternalLink, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Article {
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

export const BUILT_IN_ARTICLES: Article[] = [
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

interface ReadingPassagesTabProps {
  speak: (text: string) => void;
}

export default function ReadingPassagesTab({ speak }: ReadingPassagesTabProps) {
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Article Header Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className={cn("relative h-44 bg-gradient-to-br flex items-end p-6 sm:p-8", selected.color)}>
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 w-full">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 bg-white/20 text-white text-[10px] font-black rounded-lg uppercase tracking-widest backdrop-blur-sm">
                  {selected.level}
                </span>
                <span className="px-2.5 py-1 bg-white/20 text-white text-[10px] font-black rounded-lg uppercase tracking-widest backdrop-blur-sm">
                  {selected.category}
                </span>
                <span className="px-2.5 py-1 bg-white/20 text-white text-[10px] font-black rounded-lg uppercase tracking-widest flex items-center gap-1 backdrop-blur-sm">
                  <Clock className="w-3 h-3" />{selected.readTime}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">{selected.title}</h2>
            </div>
          </div>

          {/* Tab navigation */}
          <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            {[
              { id: 'read' as const, label: 'Đọc Bài & Audio', icon: BookOpen },
              { id: 'vocab' as const, label: `Từ Vựng (${selected.vocabulary.length})`, icon: BookMarked },
              { id: 'quiz' as const, label: 'Kiểm Tra Đọc Hiểu', icon: BarChart3 },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 py-3 text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 border-b-2 cursor-pointer",
                  activeTab === tab.id
                    ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 bg-white dark:bg-slate-900"
                    : "text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-800 dark:hover:text-slate-200"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8">
            {/* Read Tab */}
            {activeTab === 'read' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                    Bấm nút để nghe toàn bộ bài đọc với giọng đọc chuẩn
                  </span>
                  <button
                    onClick={() => speak(selected.content)}
                    className="flex items-center gap-1.5 text-xs font-black px-3.5 py-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" /> Nghe bài đọc
                  </button>
                </div>
                {selected.content.split('\n\n').map((para, i) => (
                  <p key={i} className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-[2] font-normal tracking-wide">
                    {para}
                  </p>
                ))}
              </div>
            )}

            {/* Vocab Tab */}
            {activeTab === 'vocab' && (
              <div className="space-y-3">
                {selected.vocabulary.map((v, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 hover:border-blue-400/40 hover:bg-blue-50/30 dark:hover:bg-blue-500/5 transition-all group"
                  >
                    <button
                      onClick={() => speak(v.word)}
                      className="p-3 bg-blue-100/80 dark:bg-blue-500/20 rounded-xl text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg font-black text-slate-800 dark:text-slate-100">{v.word}</span>
                        <span className="text-xs font-mono text-slate-400 dark:text-slate-500">{v.ipa}</span>
                      </div>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-0.5">{v.meaning}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quiz Tab */}
            {activeTab === 'quiz' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-lg text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" /> Comprehension Check
                  </h3>
                  {quizDone && (
                    <button
                      onClick={() => {
                        setQuizAnswers(new Array(selected.questions.length).fill(null));
                        setQuizDone(false);
                      }}
                      className="text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCcw className="w-3.5 h-3.5" /> Làm lại
                    </button>
                  )}
                </div>
                {selected.questions.map((q, qi) => (
                  <div key={qi} className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                    <p className="font-bold text-slate-800 dark:text-slate-200 text-sm sm:text-base">
                      {qi + 1}. {q.q}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt, ai) => (
                        <button
                          key={ai}
                          onClick={() => handleQuizAnswer(qi, ai)}
                          className={cn(
                            "p-3.5 rounded-xl text-xs sm:text-sm font-bold border-2 text-left transition-all cursor-pointer",
                            quizAnswers[qi] === null
                              ? "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/20"
                              : ai === q.answer
                              ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300"
                              : ai === quizAnswers[qi]
                              ? "bg-rose-50 dark:bg-rose-500/10 border-rose-500 text-rose-700 dark:text-rose-300"
                              : "border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-400 opacity-40"
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                {quizDone && (
                  <div
                    className={cn(
                      "p-6 rounded-2xl text-center font-black animate-in zoom-in duration-300",
                      quizScore === selected.questions.length
                        ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                        : "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
                    )}
                  >
                    {quizScore === selected.questions.length ? (
                      <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-emerald-500" />
                    ) : (
                      <XCircle className="w-10 h-10 mx-auto mb-2 text-amber-500" />
                    )}
                    <div className="text-xl">
                      {quizScore}/{selected.questions.length} Câu đúng
                    </div>
                    <p className="text-xs font-semibold mt-1">
                      {quizScore === selected.questions.length ? 'Xuất sắc! Bạn đã hiểu toàn bộ nội dung bài đọc 🎉' : 'Hãy đọc kỹ lại và thử làm lại nhé!'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Article List */}
      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-lg text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" /> Danh Sách Bài Đọc
            </h3>
          </div>

          <div className="flex items-center gap-1.5 mb-4 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {['All', 'A2', 'B1', 'B2'].map(f => (
              <button
                key={f}
                onClick={() => setFilterLevel(f)}
                className={cn(
                  "flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                  filterLevel === f
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800"
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <button
            onClick={generateAIArticle}
            disabled={aiGenerating}
            className="w-full mb-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all disabled:opacity-50 cursor-pointer"
          >
            {aiGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Đang tạo bài đọc AI...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Tạo bài đọc AI theo chủ đề ({filterLevel === 'All' ? 'B1' : filterLevel})
              </>
            )}
          </button>

          <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-sm">
                Chưa có bài đọc cấp độ này.
              </div>
            ) : (
              filteredArticles.map(article => (
                <button
                  key={article.id}
                  onClick={() => setSelected(article)}
                  className={cn(
                    "w-full flex gap-3.5 p-3 rounded-2xl transition-all text-left group cursor-pointer border",
                    selected.id === article.id
                      ? "bg-blue-50/60 dark:bg-blue-900/20 border-blue-400/50 shadow-sm"
                      : "bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  )}
                >
                  <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-black text-xs flex-shrink-0 shadow-sm", article.color)}>
                    {article.level}
                  </div>
                  <div className="flex-1 min-w-0 py-0.5">
                    <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1">
                      {article.category} · {article.readTime}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* External Resources */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <h3 className="font-black text-base text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-blue-600" /> Nguồn Đọc Tham Khảo
          </h3>
          <div className="space-y-2.5">
            {[
              { name: 'Breaking News English', url: 'https://breakingnewsenglish.com/', desc: 'Bài đọc tin tức chia 7 cấp độ' },
              { name: 'News in Levels', url: 'https://www.newsinlevels.com/', desc: 'Tin thế giới phân theo level A1-C1' },
              { name: 'British Council LearnEnglish', url: 'https://learnenglish.britishcouncil.org/skills/reading', desc: 'Bài đọc chuẩn Cambridge / IELTS' },
            ].map(r => (
              <a
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {r.name}
                  </h4>
                  <ExternalLink className="w-3 h-3 text-slate-300 dark:text-slate-600 group-hover:text-blue-500" />
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{r.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
