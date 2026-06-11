'use client';

import React, { useState, useEffect } from 'react';
import { 
  PenTool, 
  History, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Save, 
  Trash2,
  Calendar,
  BarChart3,
  Loader2,
  LogIn,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { analyzeJournal, getJournalHistory } from '@/services/journal.service';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const WRITING_PROMPTS = [
  {
    title: 'Giới thiệu bản thân',
    englishTitle: 'Self-Introduction',
    prompt: 'Giới thiệu tên, tuổi, nơi sinh sống, học vấn, công việc hiện tại và một số nét về tính cách hoặc mục tiêu tương lai của bạn.',
    sample: 'Hello everyone, let me introduce myself. My name is Nguyen An, and I am twenty-three years old. I was born and raised in Da Nang, a beautiful coastal city in Vietnam, but I am currently living and working in Hanoi. I graduated from university last year with a degree in Computer Science, and I now work as a junior web developer at a tech start-up. In my free time, I enjoy reading technology blogs, playing badminton, and listening to English podcasts. People describe me as an open-minded, hard-working, and friendly person. I am always eager to learn new skills and improve my English communication to open up better career opportunities in the future.',
    translation: 'Xin chào mọi người, tôi xin tự giới thiệu về mình. Tên tôi là Nguyễn An, năm nay 23 tuổi. Tôi sinh ra và lớn lên ở Đà Nẵng, một thành phố biển xinh đẹp của Việt Nam, nhưng hiện tại tôi đang sống và làm việc tại Hà Nội. Tôi tốt nghiệp đại học năm ngoái chuyên ngành Khoa học máy tính, và hiện đang là lập trình viên web sơ cấp tại một công ty công nghệ khởi nghiệp. Vào thời gian rảnh rỗi, tôi thích đọc blog công nghệ, chơi cầu lông và nghe podcast tiếng Anh. Mọi người mô tả tôi là một người cởi mở, chăm chỉ và thân thiện. Tôi luôn khao khát học hỏi các kỹ năng mới và cải thiện kỹ năng giao tiếp tiếng Anh của mình để mở ra những cơ hội nghề nghiệp tốt hơn trong tương lai.'
  },
  {
    title: 'Sở thích cá nhân',
    englishTitle: 'Hobbies & Interests',
    prompt: 'Miêu tả các sở thích chính của bạn, tần suất bạn thực hiện chúng và vì sao chúng giúp bạn thư giãn hoặc có ích cho bạn.',
    sample: 'Everyone has hobbies to relax after busy working hours, and mine is reading books. I developed a passion for books when I was a child. I usually spend about thirty minutes reading before going to bed. I love self-help and science-fiction genres because they help expand my knowledge and stimulate my imagination. Besides reading, I also like playing football with my friends on weekends. Playing sports not only keeps me healthy but also teaches me teamwork. These hobbies play a vital role in my life, keeping me energized and happy.',
    translation: 'Mỗi người đều có những sở thích riêng để thư giãn sau giờ làm việc bận rộn, và sở thích của tôi là đọc sách. Tôi bắt đầu đam mê sách từ khi còn nhỏ. Tôi thường dành khoảng 30 phút để đọc sách trước khi đi ngủ. Tôi thích thể loại sách phát triển bản thân và khoa học viễn tưởng vì chúng giúp mở rộng kiến thức và kích thích trí tưởng tượng của tôi. Ngoài đọc sách, tôi cũng thích chơi bóng đá cùng bạn bè vào cuối tuần. Chơi thể thao không chỉ giúp tôi khỏe mạnh mà còn dạy tôi về tinh thần đồng đội. Những sở thích này đóng vai trò quan trọng trong cuộc sống của tôi, giúp tôi luôn tràn đầy năng lượng và hạnh phúc.'
  },
  {
    title: 'Gia đình của tôi',
    englishTitle: 'My Family',
    prompt: 'Kể về các thành viên trong gia đình bạn, công việc của họ và một hoạt động chung hoặc kỷ niệm đặc biệt mà cả nhà thường làm cùng nhau.',
    sample: 'I live in a happy family of four members: my father, my mother, my elder sister, and me. My father is a high school teacher, and he is a very patient and wise man. My mother is a warm-hearted homemaker who cooks the most delicious meals. My sister is currently working as a bank teller, and we are very close to each other. Although we are all busy during the week, we make sure to have dinner together every single day. On weekends, we usually watch movies or go on picnics. I love my family very much because they are always my greatest source of support and encouragement.',
    translation: 'Tôi sống trong một gia đình hạnh phúc gồm bốn thành viên: bố tôi, mẹ tôi, chị gái tôi và tôi. Bố tôi là giáo viên trung học, ông là một người rất kiên nhẫn và thông thái. Mẹ tôi là một người nội trợ ấm áp, người nấu những món ăn ngon nhất. Chị gái tôi hiện đang làm giao dịch viên ngân hàng, và chúng tôi rất thân thiết với nhau. Mặc dù tất cả chúng tôi đều bận rộn trong tuần, chúng tôi luôn đảm bảo ăn tối cùng nhau mỗi ngày. Vào cuối tuần, chúng tôi thường xem phim hoặc đi dã ngoại. Tôi yêu gia đình mình rất nhiều vì họ luôn là nguồn hỗ trợ và động viên lớn nhất của tôi.'
  },
  {
    title: 'Mục tiêu nghề nghiệp',
    englishTitle: 'Career Goals',
    prompt: 'Thảo luận về công việc hoặc chuyên ngành hiện tại của bạn, cùng với những mong muốn và mục tiêu nghề nghiệp ngắn hạn & dài hạn.',
    sample: 'Setting clear career goals is essential for professional growth. Currently, I am focused on mastering full-stack web development. In the short term, I want to obtain professional certifications in cloud computing and improve my English fluency to collaborate effectively with international clients. In the long term, my goal is to become a technical lead or a software architect. I believe that continuous learning, adaptability, and dedication are the keys to achieving these career milestones and making a positive impact on my company\'s success.',
    translation: 'Đặt mục tiêu nghề nghiệp rõ ràng là rất quan trọng để phát triển chuyên môn. Hiện tại, tôi đang tập trung vào việc làm chủ phát triển web full-stack. Trong ngắn hạn, tôi muốn đạt được các chứng chỉ chuyên môn về điện toán đám mây và nâng cao khả năng lưu loát tiếng Anh để cộng tác hiệu quả với khách hàng quốc tế. Về lâu dài, mục tiêu của tôi là trở thành trưởng nhóm kỹ thuật hoặc kiến trúc sư phần mềm. Tôi tin rằng việc học tập liên tục, khả năng thích ứng và sự tận tụy là chìa khóa để đạt được các cột mốc sự nghiệp này và đóng góp tích cực vào thành công của công ty.'
  }
];

export default function JournalPage() {
  const { user, refreshDbUser } = useAuth();
  const [entry, setEntry] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [activePromptTopic, setActivePromptTopic] = useState<number>(0);

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  const fetchHistory = async () => {
    if (!user) return;
    setIsLoadingHistory(true);
    try {
      const token = await user.getIdToken();
      const data = await getJournalHistory(user.uid, token);
      setHistory(data);
    } catch (error) {
      console.error('Failed to load history');
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleAnalyze = async () => {
    if (!entry.trim() || !user) return;
    
    setIsAnalyzing(true);
    setShowFeedback(false);

    try {
      const token = await user.getIdToken();
      const title = entry.substring(0, 30) + (entry.length > 30 ? '...' : '');
      const result = await analyzeJournal(user.uid, entry, title, token);
      setAnalysisResult(result.entry);
      setShowFeedback(true);
      fetchHistory(); // Refresh history
      refreshDbUser(); // Update XP/Level in Sidebar/Dashboard
    } catch (error) {
      console.error(error);
      alert('Analysis failed. Please check your connection to EngBot.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const parseFeedback = (feedbackStr: string) => {
    try {
      return JSON.parse(feedbackStr);
    } catch (e) {
      return { correctedText: '', feedback: feedbackStr };
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-6 text-center animate-in fade-in duration-700">
        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary">
          <PenTool className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Sign In to Journal</h1>
          <p className="text-slate-500 max-w-sm mx-auto">
            Log in to track your writing progress and get grammar feedback from EngBot.
          </p>
        </div>
        <Link 
          href="/login"
          className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
        >
          <LogIn className="w-5 h-5" />
          Sign In with Google
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <PenTool className="w-8 h-8 text-primary" />
            Writing Journal
          </h1>
          <p className="text-slate-500">Practice writing daily and get <span className="text-primary font-bold">EngBot</span>'s feedback.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchHistory}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors"
          >
            {isLoadingHistory ? <Loader2 className="w-4 h-4 animate-spin" /> : <History className="w-4 h-4" />}
            Refresh History
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="premium-card p-6 flex flex-col min-h-[500px]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3 text-slate-500">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-400 font-medium">{entry.split(/\s+/).filter(w => w !== '').length} words</span>
              </div>
            </div>
            
            <textarea
              className="flex-1 w-full bg-transparent border-none focus:ring-0 text-lg leading-relaxed resize-none placeholder:text-slate-300"
              placeholder="What's on your mind? Write in English and let EngBot help..."
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              disabled={isAnalyzing}
            />

            <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setEntry('')}
                  className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                  title="Clear entry"
                  disabled={isAnalyzing}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleAnalyze}
                  disabled={entry.length < 10 || isAnalyzing}
                  className={cn(
                    "flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-primary/20",
                    (entry.length < 10 || isAnalyzing) && "opacity-50 cursor-not-allowed grayscale"
                  )}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      EngBot is Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 fill-white" />
                      Analyze with EngBot
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* History List */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Recent Entries</h3>
            {history.length === 0 ? (
              <div className="p-10 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-slate-400 space-y-2">
                <History className="w-8 h-8 opacity-20" />
                <p className="text-sm italic">No entries yet. Write your first journal!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {history.slice(0, 4).map((item) => (
                  <div key={item.id} className="premium-card p-4 hover:premium-card-hover cursor-pointer group" onClick={() => {
                    setEntry(item.content);
                    setAnalysisResult(item);
                    setShowFeedback(true);
                  }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                      <div className="flex items-center gap-1 text-primary font-bold text-xs">
                        <BarChart3 className="w-3 h-3" />
                        {item.grammarScore}/100
                      </div>
                    </div>
                    <p className="text-sm font-semibold truncate mb-1">{item.title}</p>
                    <p className="text-xs text-slate-500 line-clamp-2">{item.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {/* AI Feedback Panel */}
          {showFeedback && analysisResult ? (
            <div className="premium-card p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-primary/20 animate-in zoom-in-95 duration-500">
              <h3 className="font-bold flex items-center gap-2 text-primary mb-6">
                <Sparkles className="w-5 h-5 fill-primary" />
                EngBot's Analysis
              </h3>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Overall Score</span>
                  <span className="text-2xl font-bold text-primary">
                    {Math.round((analysisResult.grammarScore + analysisResult.vocabularyScore + analysisResult.fluencyScore) / 3)}/100
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-blue-100 shadow-sm">
                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase">Corrected Version</span>
                    </div>
                    <p className="text-sm text-slate-700 italic leading-relaxed">
                      "{parseFeedback(analysisResult.aiFeedback).correctedText}"
                    </p>
                  </div>

                  <div className="p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-purple-100 shadow-sm">
                    <div className="flex items-center gap-2 text-purple-600 mb-2">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase">Teacher's Notes</span>
                    </div>
                    <p className="text-sm text-slate-700 whitespace-pre-wrap">
                      {parseFeedback(analysisResult.aiFeedback).feedback}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase mb-2">
                      <span>Grammar</span>
                      <span>{analysisResult.grammarScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${analysisResult.grammarScore}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase mb-2">
                      <span>Vocabulary</span>
                      <span>{analysisResult.vocabularyScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 transition-all duration-1000" style={{ width: `${analysisResult.vocabularyScore}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase mb-2">
                      <span>Fluency</span>
                      <span>{analysisResult.fluencyScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 transition-all duration-1000" style={{ width: `${analysisResult.fluencyScore}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="premium-card p-8 border-dashed flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-4 bg-slate-50 rounded-full">
                <BarChart3 className="w-8 h-8 text-slate-300" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-400">No analysis yet</h3>
                <p className="text-xs text-slate-400 max-w-[200px]">Write something and click "Analyze with EngBot" to get feedback.</p>
              </div>
            </div>
          )}

          {/* Gợi ý viết bài & Bài mẫu */}
          <div className="premium-card p-6 border-slate-200">
            <h3 className="font-bold flex items-center gap-2 text-slate-800 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              Chủ đề Gợi ý & Bài mẫu
            </h3>
            
            <div className="flex flex-wrap gap-1.5 mb-4">
              {WRITING_PROMPTS.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setActivePromptTopic(index)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border",
                    activePromptTopic === index
                      ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {prompt.title}
                </button>
              ))}
            </div>

            <div className="space-y-4 text-sm">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Gợi ý viết bài:</span>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{WRITING_PROMPTS[activePromptTopic].prompt}</p>
              </div>

              <div className="p-3.5 bg-sky-50/20 rounded-xl border border-sky-100/50">
                <div className="flex items-center justify-between mb-1.5 gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-sky-600">Bài mẫu (English):</span>
                  <button
                    onClick={() => setEntry(WRITING_PROMPTS[activePromptTopic].sample)}
                    className="text-[10px] font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1.5 rounded-md border border-sky-200 shadow-sm shrink-0"
                  >
                    Áp dụng mẫu này
                  </button>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap font-medium">{WRITING_PROMPTS[activePromptTopic].sample}</p>
              </div>

              <div className="p-3.5 bg-purple-50/20 rounded-xl border border-purple-100/50">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 block mb-1">Bản dịch tiếng Việt:</span>
                <p className="text-xs text-slate-600 leading-relaxed italic">{WRITING_PROMPTS[activePromptTopic].translation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
