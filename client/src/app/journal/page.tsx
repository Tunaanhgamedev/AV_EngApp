'use client';

import React, { useState, useEffect } from 'react';
import { 
  PenTool, 
  History, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Trash2,
  Calendar,
  BarChart3,
  Loader2,
  LogIn,
  BookOpen,
  Copy,
  Check,
  ChevronRight,
  TrendingUp,
  Award,
  HelpCircle,
  FileText,
  Clock,
  Brain,
  Sliders,
  Search,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { analyzeJournal, getJournalHistory } from '@/services/journal.service';
import { getAvailableSkills } from '@/services/chat.service';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const WRITING_PROMPTS = [
  {
    title: 'Giới thiệu bản thân',
    englishTitle: 'Self-Introduction',
    level: 'Beginner',
    prompt: 'Giới thiệu tên, tuổi, nơi sinh sống, học vấn, công việc hiện tại và một số nét về tính cách hoặc mục tiêu tương lai của bạn.',
    outline: [
      'Chào hỏi & Giới thiệu Tên/Tuổi (Greeting & Name/Age)',
      'Quê quán & Nơi ở hiện tại (Hometown & Current Residence)',
      'Học vấn & Công việc (Education & Job)',
      'Sở thích & Mục tiêu (Hobbies & Future Goals)'
    ],
    vocab: [
      { word: 'born and raised', meaningVi: 'sinh ra và lớn lên' },
      { word: 'graduate from', meaningVi: 'tốt nghiệp từ' },
      { word: 'junior developer', meaningVi: 'lập trình viên sơ cấp' },
      { word: 'in my free time', meaningVi: 'vào thời gian rảnh' },
      { word: 'eager to learn', meaningVi: 'hăng hái học hỏi' }
    ],
    sample: 'Hello everyone, let me introduce myself. My name is Nguyen An, and I am twenty-three years old. I was born and raised in Da Nang, a beautiful coastal city in Vietnam, but I am currently living and working in Hanoi. I graduated from university last year with a degree in Computer Science, and I now work as a junior web developer at a tech start-up. In my free time, I enjoy reading technology blogs, playing badminton, and listening to English podcasts. People describe me as an open-minded, hard-working, and friendly person. I am always eager to learn new skills and improve my English communication to open up better career opportunities in the future.',
    translation: 'Xin chào mọi người, tôi xin tự giới thiệu về mình. Tên tôi là Nguyễn An, năm nay 23 tuổi. Tôi sinh ra và lớn lên ở Đà Nẵng, một thành phố biển xinh đẹp của Việt Nam, nhưng hiện tại tôi đang sống và làm việc tại Hà Nội. Tôi tốt nghiệp đại học năm ngoái chuyên ngành Khoa học máy tính, và hiện đang là lập trình viên web sơ cấp tại một công ty công nghệ khởi nghiệp. Vào thời gian rảnh rỗi, tôi thích đọc blog công nghệ, chơi cầu lông và nghe podcast tiếng Anh. Mọi người mô tả tôi là một người cởi mở, chăm chỉ và thân thiện. Tôi luôn khao khát học hỏi các kỹ năng mới và cải thiện kỹ năng giao tiếp tiếng Anh của mình để mở ra những cơ hội nghề nghiệp tốt hơn trong tương lai.'
  },
  {
    title: 'Thói quen hàng ngày',
    englishTitle: 'Daily Routine',
    level: 'Beginner',
    prompt: 'Kể về các hoạt động thường ngày của bạn từ lúc thức dậy cho đến lúc đi ngủ.',
    outline: [
      'Các hoạt động buổi sáng: Thức dậy, vệ sinh, ăn sáng (Morning activities)',
      'Các hoạt động chính ban ngày: Học tập, làm việc (Work/Study schedule)',
      'Các hoạt động buổi tối: Thư giãn, thói quen trước khi đi ngủ (Evening routine)'
    ],
    vocab: [
      { word: 'wake up', meaningVi: 'thức dậy' },
      { word: 'brush my teeth', meaningVi: 'đánh răng' },
      { word: 'have breakfast', meaningVi: 'ăn sáng' },
      { word: 'take a short nap', meaningVi: 'ngủ trưa ngắn' },
      { word: 'go to bed', meaningVi: 'đi ngủ' }
    ],
    sample: 'Every day, I start my morning by waking up at 6:30 AM. After brushing my teeth and washing my face, I spend fifteen minutes doing light exercise to warm up my body. Then, I have a healthy breakfast with milk and bread. I leave my house at 7:45 AM to go to work. My working hours start from 8:30 AM to 5:30 PM. After work, I return home, cook dinner, and listen to music to relax. Before going to bed at 11:00 PM, I usually write down my tasks for the next day. This simple routine keeps me organized and productive.',
    translation: 'Mỗi ngày, tôi bắt đầu buổi sáng bằng việc thức dậy lúc 6:30. Sau khi đánh răng rửa mặt, tôi dành 15 phút tập thể dục nhẹ nhàng để làm nóng cơ thể. Sau đó, tôi ăn một bữa sáng lành mạnh với sữa và bánh mì. Tôi rời nhà lúc 7:45 để đi làm. Giờ làm việc của tôi bắt đầu từ 8:30 sáng đến 5:30 chiều. Sau giờ làm, tôi trở về nhà, nấu bữa tối và nghe nhạc để thư giãn. Trước khi đi ngủ lúc 11 giờ tối, tôi thường viết ra các nhiệm vụ cho ngày hôm sau. Thói quen đơn giản này giúp tôi luôn ngăn nắp và làm việc hiệu quả.'
  },
  {
    title: 'Sở thích cá nhân',
    englishTitle: 'Hobbies & Interests',
    level: 'Intermediate',
    prompt: 'Miêu tả các sở thích chính của bạn, tần suất bạn thực hiện chúng và vì sao chúng giúp bạn thư giãn hoặc có ích cho bạn.',
    outline: [
      'Nêu sở thích chính và thời điểm bắt đầu (Main hobby & Origin)',
      'Tần suất thực hiện và cách thực hiện (Frequency & Execution)',
      'Lợi ích sở thích mang lại cho sức khỏe/tâm hồn (Benefits)'
    ],
    vocab: [
      { word: 'develop a passion for', meaningVi: 'hình thành đam mê đối với' },
      { word: 'spend time doing', meaningVi: 'dành thời gian làm gì' },
      { word: 'expand my knowledge', meaningVi: 'mở rộng kiến thức' },
      { word: 'stimulate my imagination', meaningVi: 'kích thích trí tưởng tượng' },
      { word: 'play a vital role', meaningVi: 'đóng vai trò quan trọng' }
    ],
    sample: 'Everyone has hobbies to relax after busy working hours, and mine is reading books. I developed a passion for books when I was a child. I usually spend about thirty minutes reading before going to bed. I love self-help and science-fiction genres because they help expand my knowledge and stimulate my imagination. Besides reading, I also like playing football with my friends on weekends. Playing sports not only keeps me healthy but also teaches me teamwork. These hobbies play a vital role in my life, keeping me energized and happy.',
    translation: 'Mỗi người đều có những sở thích riêng để thư giãn sau giờ làm việc bận rộn, và sở thích của tôi là đọc sách. Tôi bắt đầu đam mê sách từ khi còn nhỏ. Tôi thường dành khoảng 30 phút để đọc sách trước khi đi ngủ. Tôi thích thể loại sách phát triển bản thân và khoa học viễn tưởng vì chúng giúp mở rộng kiến thức và kích thích trí tưởng tượng của tôi. Ngoài đọc sách, tôi cũng thích chơi bóng đá cùng bạn bè vào cuối tuần. Chơi thể thao không chỉ giúp tôi khỏe mạnh mà còn dạy tôi về tinh thần đồng đội. Những sở thích này đóng vai trò quan trọng trong cuộc sống của tôi, giúp tôi luôn tràn đầy năng lượng và hạnh phúc.'
  },
  {
    title: 'Gia đình của tôi',
    englishTitle: 'My Family',
    level: 'Beginner',
    prompt: 'Kể về các thành viên trong gia đình bạn, công việc của họ và một hoạt động chung hoặc kỷ niệm đặc biệt mà cả nhà thường làm cùng nhau.',
    outline: [
      'Số lượng thành viên và giới thiệu chung (Number of members)',
      'Mô tả nghề nghiệp & tính cách từng người (Jobs & Personalities)',
      'Các hoạt động chung gắn kết gia đình (Shared activities)'
    ],
    vocab: [
      { word: 'family of four', meaningVi: 'gia đình 4 người' },
      { word: 'warm-hearted', meaningVi: 'ấm áp, nhân hậu' },
      { word: 'close to each other', meaningVi: 'thân thiết với nhau' },
      { word: 'have dinner together', meaningVi: 'ăn tối cùng nhau' },
      { word: 'source of support', meaningVi: 'nguồn nâng đỡ/hỗ trợ' }
    ],
    sample: 'I live in a happy family of four members: my father, my mother, my elder sister, and me. My father is a high school teacher, and he is a very patient and wise man. My mother is a warm-hearted homemaker who cooks the most delicious meals. My sister is currently working as a bank teller, and we are very close to each other. Although we are all busy during the week, we make sure to have dinner together every single day. On weekends, we usually watch movies or go on picnics. I love my family very much because they are always my greatest source of support and encouragement.',
    translation: 'Tôi sống trong một gia đình hạnh phúc gồm bốn thành viên: bố tôi, mẹ tôi, chị gái tôi và tôi. Bố tôi là giáo viên trung học, ông là một người rất kiên nhẫn và thông thái. Mẹ tôi là một người nội trợ ấm áp, người nấu những món ăn ngon nhất. Chị gái tôi hiện đang làm giao dịch viên ngân hàng, và chúng tôi rất thân thiết với nhau. Mặc dù tất cả chúng tôi đều bận rộn trong tuần, chúng tôi luôn đảm bảo ăn tối cùng nhau mỗi ngày. Vào cuối tuần, chúng tôi thường xem phim hoặc đi dã ngoại. Tôi yêu gia đình mình rất nhiều vì họ luôn là nguồn hỗ trợ và động viên lớn nhất của tôi.'
  },
  {
    title: 'Mục tiêu nghề nghiệp',
    englishTitle: 'Career Goals',
    level: 'Intermediate',
    prompt: 'Thảo luận về công việc hoặc chuyên ngành hiện tại của bạn, cùng với những mong muốn và mục tiêu nghề nghiệp ngắn hạn & dài hạn.',
    outline: [
      'Công việc/Chuyên ngành hiện tại (Current Focus)',
      'Mục tiêu ngắn hạn: học chứng chỉ, nâng cao kỹ năng (Short-term goals)',
      'Mục tiêu dài hạn: thăng tiến, vị trí mong muốn (Long-term goals)',
      'Các hành động cần thiết để đạt được mục tiêu (Action Plan)'
    ],
    vocab: [
      { word: 'master full-stack web development', meaningVi: 'làm chủ phát triển web full-stack' },
      { word: 'short-term goal', meaningVi: 'mục tiêu ngắn hạn' },
      { word: 'obtain professional certifications', meaningVi: 'đạt được chứng chỉ nghề nghiệp' },
      { word: 'become a technical lead', meaningVi: 'trở thành trưởng nhóm kỹ thuật' },
      { word: 'continuous learning', meaningVi: 'học tập liên tục' }
    ],
    sample: 'Setting clear career goals is essential for professional growth. Currently, I am focused on mastering full-stack web development. In the short term, I want to obtain professional certifications in cloud computing and improve my English fluency to collaborate effectively with international clients. In the long term, my goal is to become a technical lead or a software architect. I believe that continuous learning, adaptability, and dedication are the keys to achieving these career milestones and making a positive impact on my company\'s success.',
    translation: 'Đặt mục tiêu nghề nghiệp rõ ràng là rất quan trọng để phát triển chuyên môn. Hiện tại, tôi đang tập trung vào việc làm chủ phát triển web full-stack. Trong ngắn hạn, tôi muốn đạt được các chứng chỉ chuyên môn về điện toán đám mây và nâng cao khả năng lưu loát tiếng Anh để cộng tác hiệu quả với khách hàng quốc tế. Về lâu dài, mục tiêu của tôi là trở thành trưởng nhóm kỹ thuật hoặc kiến trúc sư phần mềm. Tôi tin rằng việc học tập liên tục, khả năng thích ứng và sự tận tụy là chìa khóa để đạt được các cột mốc sự nghiệp này và đóng góp tích cực vào thành công của công ty.'
  },
  {
    title: 'Lợi ích của Làm việc từ xa',
    englishTitle: 'Benefits of Remote Work',
    level: 'Advanced',
    prompt: 'Phân tích các ưu và nhược điểm của xu hướng làm việc từ xa (remote working) trong thời đại số.',
    outline: [
      'Giới thiệu xu thế Remote Work (Introduction to remote work)',
      'Các lợi ích chính: Tiết kiệm thời gian, linh hoạt (Key advantages)',
      'Các thách thức: Thiếu tương tác trực tiếp, xao nhãng (Key challenges)',
      'Kết luận và ý kiến cá nhân (Conclusion & Personal stance)'
    ],
    vocab: [
      { word: 'flexible working hours', meaningVi: 'giờ làm việc linh hoạt' },
      { word: 'eliminate commuting time', meaningVi: 'loại bỏ thời gian đi lại' },
      { word: 'self-discipline', meaningVi: 'tính tự giác' },
      { word: 'work-life balance', meaningVi: 'cân bằng cuộc sống và công việc' },
      { word: 'face-to-face interaction', meaningVi: 'tương tác trực tiếp' }
    ],
    sample: 'The rise of remote work has transformed the modern workforce. One of the main advantages is the flexibility it offers, allowing employees to set their own schedules and eliminate long daily commutes. This leads to a better work-life balance and increased productivity. However, remote work also presents significant challenges, such as the lack of face-to-face interaction, which can cause feelings of isolation. Additionally, working from home requires high self-discipline to avoid household distractions. In conclusion, while remote work has clear benefits, employees must develop strong self-management skills to succeed in this environment.',
    translation: 'Sự trỗi dậy của làm việc từ xa đã biến đổi lực lượng lao động hiện đại. Một trong những ưu điểm chính là sự linh hoạt mà nó mang lại, cho phép nhân viên tự thiết lập lịch trình và loại bỏ thời gian di chuyển dài ngày. Điều này dẫn đến sự cân bằng giữa cuộc sống - công việc tốt hơn và tăng năng suất. Tuy nhiên, làm việc từ xa cũng đặt ra những thách thức đáng kể, chẳng hạn như thiếu sự tương tác trực tiếp, có thể gây ra cảm giác cô lập. Ngoài ra, làm việc tại nhà đòi hỏi tính tự giác cao để tránh những xao nhãng trong gia đình. Tóm lại, mặc dù làm việc từ xa có những lợi ích rõ ràng, nhân viên phải phát triển kỹ năng tự quản lý mạnh mẽ để thành công trong môi trường này.'
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
  const [copiedVocabIndex, setCopiedVocabIndex] = useState<number | null>(null);
  const [copiedText, setCopiedText] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'prompts' | 'history'>('editor');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');

  // Advanced AI Training State
  const [trainedSkills, setTrainedSkills] = useState<string[]>([]);
  const [availableSkills, setAvailableSkills] = useState<any[]>([]);
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Load available skills from API
  useEffect(() => {
    const fetchSkills = async () => {
      if (!user) return;
      try {
        const token = await user.getIdToken();
        const skills = await getAvailableSkills(token);
        setAvailableSkills(skills || []);
      } catch (err) {
        console.error('Failed to load available skills:', err);
      }
    };
    fetchSkills();
  }, [user]);

  // Stats derived from history
  const [stats, setStats] = useState({
    avgScore: 0,
    totalWords: 0,
    entriesCount: 0,
    streak: 0
  });

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  useEffect(() => {
    if (history.length > 0) {
      const totalScore = history.reduce((sum, item) => {
        const avg = (item.grammarScore + item.vocabularyScore + item.fluencyScore) / 3;
        return sum + avg;
      }, 0);
      const avgScore = Math.round(totalScore / history.length);

      const totalWords = history.reduce((sum, item) => {
        const words = item.content.trim().split(/\s+/).filter(Boolean).length;
        return sum + words;
      }, 0);

      // Simple streak calculation (consecutive days)
      const uniqueDays = Array.from(new Set(
        history.map(item => new Date(item.createdAt).toDateString())
      )).map(dateStr => new Date(dateStr));
      
      uniqueDays.sort((a, b) => b.getTime() - a.getTime()); // newest first

      let streak = 0;
      let today = new Date();
      today.setHours(0,0,0,0);
      let prevDate = today;

      for (let i = 0; i < uniqueDays.length; i++) {
        const current = uniqueDays[i];
        current.setHours(0,0,0,0);
        const diffTime = Math.abs(prevDate.getTime() - current.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (i === 0) {
          if (diffDays <= 1) { // today or yesterday
            streak++;
            prevDate = current;
          } else {
            break;
          }
        } else {
          if (diffDays === 1) {
            streak++;
            prevDate = current;
          } else {
            break;
          }
        }
      }

      setStats({
        avgScore,
        totalWords,
        entriesCount: history.length,
        streak
      });
    } else {
      setStats({
        avgScore: 0,
        totalWords: 0,
        entriesCount: 0,
        streak: 0
      });
    }
  }, [history]);

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
      const result = await analyzeJournal(user.uid, entry, title, token, trainedSkills);
      setAnalysisResult(result.entry);
      setShowFeedback(true);
      setActiveTab('editor'); // view feedback on editor tab
      fetchHistory(); // Refresh history
      refreshDbUser(); // Update XP/Level in Sidebar/Dashboard
    } catch (error) {
      console.error(error);
      alert('Analysis failed. Please check your connection to EngBot.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleVocabClick = (word: string, index: number) => {
    // Copy vocab to clipboard
    navigator.clipboard.writeText(word);
    setCopiedVocabIndex(index);
    setTimeout(() => setCopiedVocabIndex(null), 1500);

    // Append vocabulary to text editor if appropriate
    // setEntry(prev => prev + (prev.endsWith(' ') || prev === '' ? '' : ' ') + word);
  };

  const parseFeedback = (feedbackStr: string) => {
    try {
      return JSON.parse(feedbackStr);
    } catch (e) {
      return { correctedText: '', feedback: feedbackStr };
    }
  };

  const wordCount = entry.trim().split(/\s+/).filter(Boolean).length;
  const charCount = entry.length;
  const readingTime = Math.ceil(wordCount / 150) || 1;

  const filteredPrompts = WRITING_PROMPTS.filter(p => 
    difficultyFilter === 'All' ? true : p.level === difficultyFilter
  );

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-6 text-center animate-in fade-in duration-700 px-4">
        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary shadow-inner">
          <PenTool className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">Đăng Nhập Để Viết Nhật Ký</h1>
          <p className="text-slate-500 max-w-sm mx-auto">
            Lưu vết hành trình luyện viết tiếng Anh hàng ngày và nhận phản hồi chi tiết từ giáo viên AI EngBot.
          </p>
        </div>
        <Link 
          href="/login"
          className="flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
        >
          <LogIn className="w-5 h-5" />
          Đăng nhập với Google
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500 max-w-7xl mx-auto px-1 md:px-4">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold flex items-center gap-3 text-slate-800 tracking-tight">
            <PenTool className="w-8 h-8 text-primary" />
            Writing Journal
          </h1>
          <p className="text-slate-500 text-sm md:text-base">
            Rèn luyện kỹ năng viết hàng ngày và nhận phản hồi ngữ pháp từ <span className="text-primary font-bold">EngBot</span>.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button 
            onClick={fetchHistory}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl font-bold text-xs md:text-sm hover:bg-slate-50 text-slate-700 transition-colors shadow-sm"
          >
            {isLoadingHistory ? <Loader2 className="w-4 h-4 animate-spin text-primary" /> : <History className="w-4 h-4" />}
            Cập nhật lịch sử
          </button>
        </div>
      </header>

      {/* Stats Widgets */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400">Tổng Bài Viết</p>
            <p className="text-xl font-extrabold text-slate-800">{stats.entriesCount}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400">Điểm Trung Bình</p>
            <p className="text-xl font-extrabold text-slate-800">{stats.avgScore}/100</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400">Chuỗi Ngày (Streak)</p>
            <p className="text-xl font-extrabold text-slate-800">{stats.streak} ngày 🔥</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400">Tổng số Từ viết</p>
            <p className="text-xl font-extrabold text-slate-800">{stats.totalWords} từ</p>
          </div>
        </div>
      </div>

      {/* Segment Navigation for Mobile/Tablet */}
      <div className="flex md:hidden bg-slate-100 p-1.5 rounded-xl border border-slate-200">
        <button
          onClick={() => setActiveTab('editor')}
          className={cn(
            "flex-1 py-2 text-center text-xs font-bold rounded-lg transition-all",
            activeTab === 'editor' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
          )}
        >
          Viết & Phản hồi
        </button>
        <button
          onClick={() => setActiveTab('prompts')}
          className={cn(
            "flex-1 py-2 text-center text-xs font-bold rounded-lg transition-all",
            activeTab === 'prompts' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
          )}
        >
          Chủ đề Gợi ý
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={cn(
            "flex-1 py-2 text-center text-xs font-bold rounded-lg transition-all",
            activeTab === 'history' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
          )}
        >
          Bài Gần Đây
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* LEFT/CENTER: Editor & Feedback (Lg spans 2 cols) */}
        <div className={cn(
          "lg:col-span-2 space-y-6",
          activeTab !== 'editor' && "hidden md:block" // Hide on mobile if not active tab
        )}>
          {/* Main Writing Workspace */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 md:p-6 flex flex-col min-h-[480px]">
            {/* Editor Top Bar */}
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3 text-slate-400">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-xs md:text-sm font-semibold text-slate-600">{new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 font-medium bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> ~{readingTime} phút đọc</span>
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                <span>{wordCount} từ / {charCount} ký tự</span>
              </div>
            </div>

            {/* Trained Skills status bar */}
            <div className="mb-4 px-3 py-2.5 bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 text-xs rounded-2xl">
              <div className="flex items-center gap-2 min-w-0">
                <Brain className="w-4 h-4 text-fuchsia-500 animate-pulse flex-shrink-0" />
                <span className="font-bold text-slate-500 dark:text-slate-400">Tri thức nạp vào AI:</span>
                {trainedSkills.length === 0 ? (
                  <span className="text-slate-400 italic">Chưa nạp skill (Hệ thống dùng RAG tự động)</span>
                ) : (
                  <div className="flex gap-1 overflow-x-auto no-scrollbar py-0.5 max-w-[200px] sm:max-w-xs md:max-w-md lg:max-w-xl">
                    {trainedSkills.map(skillId => {
                      const s = availableSkills.find(x => x.id === skillId);
                      return (
                        <span key={skillId} className="px-2 py-0.5 bg-fuchsia-500/10 dark:bg-fuchsia-500/20 text-fuchsia-600 dark:text-fuchsia-300 border border-fuchsia-500/20 rounded-full font-bold text-[10px] whitespace-nowrap">
                          {s?.name || skillId}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
              <button 
                onClick={() => setShowTrainingModal(true)}
                className="flex items-center gap-1 px-2.5 py-1 bg-fuchsia-50 hover:bg-fuchsia-600 hover:text-white dark:hover:bg-slate-700 text-fuchsia-600 dark:text-fuchsia-300 rounded-lg border border-fuchsia-500/20 dark:border-fuchsia-500/40 transition-all font-bold text-[10px] shadow-sm cursor-pointer whitespace-nowrap active:scale-95"
              >
                <Sliders className="w-3.5 h-3.5" /> Huấn luyện AI
              </button>
            </div>
            
            <textarea
              className="flex-1 w-full bg-transparent border-none focus:ring-0 text-slate-800 text-base md:text-lg leading-relaxed resize-none placeholder:text-slate-300 min-h-[300px] outline-none"
              placeholder="Hôm nay bạn đang nghĩ gì? Viết một đoạn văn bằng tiếng Anh ở đây và nhấn 'Phân tích' để EngBot sửa lỗi giúp bạn nhé..."
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              disabled={isAnalyzing}
            />

            {/* Daily word goal progress bar */}
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
              <div className="flex justify-between text-xs text-slate-500 font-semibold">
                <span>Mục tiêu hàng ngày (100 từ)</span>
                <span>{Math.min(100, Math.round((wordCount / 100) * 100))}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full transition-all duration-500 rounded-full",
                    wordCount >= 100 ? "bg-emerald-500" : "bg-primary"
                  )} 
                  style={{ width: `${Math.min(100, (wordCount / 100) * 100)}%` }} 
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
              <button 
                onClick={() => setEntry('')}
                className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                title="Clear entry"
                disabled={isAnalyzing || !entry}
              >
                <Trash2 className="w-5 h-5" />
              </button>

              <button 
                onClick={handleAnalyze}
                disabled={wordCount < 5 || isAnalyzing}
                className={cn(
                  "flex items-center gap-2 px-8 py-3.5 text-white rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer bg-gradient-to-r from-primary to-violet-600 hover:opacity-95 shadow-primary/20",
                  (wordCount < 5 || isAnalyzing) && "opacity-50 cursor-not-allowed grayscale active:scale-100"
                )}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    EngBot đang sửa bài...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-white" />
                    Phân tích với EngBot
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* AI Analysis Feedback Panel (if analysed) */}
          {showFeedback && analysisResult && (
            <div className="bg-gradient-to-br from-blue-50/80 via-purple-50/40 to-white rounded-3xl border border-blue-100 shadow-sm p-6 space-y-6 animate-in zoom-in-95 duration-500">
              <div className="flex items-center justify-between border-b border-blue-100 pb-4">
                <h3 className="font-extrabold flex items-center gap-2 text-primary text-lg">
                  <Sparkles className="w-5 h-5 fill-primary text-primary" />
                  Kết Quả Phân Tích Từ EngBot
                </h3>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary font-bold text-xs rounded-full">
                  <Award className="w-3.5 h-3.5" />
                  Điểm tổng quát: {Math.round((analysisResult.grammarScore + analysisResult.vocabularyScore + analysisResult.fluencyScore) / 3)}/100
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Corrected Text Box */}
                <div className="p-5 bg-white/90 backdrop-blur-sm rounded-2xl border border-emerald-100 shadow-sm space-y-3 relative group">
                  <div className="flex items-center justify-between text-emerald-700 font-bold text-xs uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Bản Sửa Lỗi Từ EngBot
                    </span>
                    <button
                      onClick={() => copyToClipboard(parseFeedback(analysisResult.aiFeedback).correctedText)}
                      className="p-1.5 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-all"
                      title="Copy corrected version"
                    >
                      {copiedText ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-sm text-slate-700 italic leading-relaxed whitespace-pre-wrap">
                    "{parseFeedback(analysisResult.aiFeedback).correctedText}"
                  </p>
                </div>

                {/* Notes/Grammar Explanations */}
                <div className="p-5 bg-white/90 backdrop-blur-sm rounded-2xl border border-purple-100 shadow-sm space-y-3">
                  <div className="flex items-center text-purple-700 font-bold text-xs uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" />
                      Nhận Xét Chi Tiết (Nhạc Khúc Sửa Sai)
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {parseFeedback(analysisResult.aiFeedback).feedback}
                  </p>
                </div>
              </div>

              {/* Sub-Scores sliders */}
              <div className="bg-white/80 p-5 rounded-2xl border border-slate-100/50 space-y-4">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Đánh Giá Từng Tiêu Chí</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                      <span>Ngữ pháp (Grammar)</span>
                      <span className="text-blue-600">{analysisResult.grammarScore}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${analysisResult.grammarScore}%` }} />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                      <span>Từ vựng (Vocabulary)</span>
                      <span className="text-purple-600">{analysisResult.vocabularyScore}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 transition-all duration-1000" style={{ width: `${analysisResult.vocabularyScore}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                      <span>Trôi chảy (Fluency)</span>
                      <span className="text-emerald-600">{analysisResult.fluencyScore}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${analysisResult.fluencyScore}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Topic Prompts Drawer & Outline Suggestions (Lg spans 1 col) */}
        <div className={cn(
          "space-y-6",
          activeTab !== 'prompts' && "hidden md:block" // Hide on mobile if not active tab
        )}>
          {/* Prompts Categories and List */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 space-y-4">
            <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-2 border-b border-slate-100 pb-3">
              <BookOpen className="w-5 h-5 text-primary" />
              Chủ Đề Viết Gợi Ý
            </h3>

            {/* Level Filter Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
              {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setDifficultyFilter(lvl)}
                  className={cn(
                    "flex-1 py-1.5 text-center text-[10px] font-bold rounded-lg transition-all cursor-pointer",
                    difficultyFilter === lvl 
                      ? "bg-white text-slate-900 shadow-sm" 
                      : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  {lvl === 'All' ? 'Tất cả' : lvl}
                </button>
              ))}
            </div>

            {/* List of Prompts */}
            <div className="max-h-[220px] overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-slate-200">
              {filteredPrompts.map((prompt, index) => {
                const globalIndex = WRITING_PROMPTS.findIndex(p => p.title === prompt.title);
                return (
                  <button
                    key={index}
                    onClick={() => setActivePromptTopic(globalIndex)}
                    className={cn(
                      "w-full text-left p-3 rounded-2xl transition-all border flex items-center justify-between group cursor-pointer",
                      activePromptTopic === globalIndex
                        ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                        : "bg-white hover:bg-slate-50 border-slate-100 text-slate-700"
                    )}
                  >
                    <div className="space-y-0.5 truncate">
                      <p className="text-xs font-bold truncate">{prompt.title}</p>
                      <p className={cn("text-[9px] font-semibold", activePromptTopic === globalIndex ? "text-slate-300" : "text-slate-400")}>
                        {prompt.englishTitle}
                      </p>
                    </div>
                    <span className={cn(
                      "px-2 py-0.5 text-[8px] font-bold rounded-full uppercase tracking-wider shrink-0",
                      prompt.level === 'Beginner' && (activePromptTopic === globalIndex ? "bg-emerald-500/20 text-emerald-300" : "bg-emerald-50 text-emerald-600"),
                      prompt.level === 'Intermediate' && (activePromptTopic === globalIndex ? "bg-amber-500/20 text-amber-300" : "bg-amber-50 text-amber-600"),
                      prompt.level === 'Advanced' && (activePromptTopic === globalIndex ? "bg-rose-500/20 text-rose-300" : "bg-rose-50 text-rose-600")
                    )}>
                      {prompt.level}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Detailed Active Prompt Details */}
            <div className="border-t border-slate-100 pt-4 space-y-4 text-sm">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">Mô tả chủ đề:</span>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  {WRITING_PROMPTS[activePromptTopic].prompt}
                </p>
              </div>

              {/* OUTLINE SECTION */}
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Dàn ý gợi ý (Outline):</span>
                <ul className="space-y-1.5">
                  {WRITING_PROMPTS[activePromptTopic].outline.map((step, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                      <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 text-[9px] flex items-center justify-center shrink-0 font-bold mt-0.5">
                        {sIdx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* RECOMMENDED VOCABULARY */}
              <div className="space-y-2 border-t border-slate-100 pt-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Từ vựng khuyên dùng (Tap to copy):</span>
                <div className="flex flex-wrap gap-1.5">
                  {WRITING_PROMPTS[activePromptTopic].vocab.map((v, vIdx) => (
                    <button
                      key={vIdx}
                      onClick={() => handleVocabClick(v.word, vIdx)}
                      className={cn(
                        "px-2.5 py-1 text-[10px] font-bold border rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-sm",
                        copiedVocabIndex === vIdx
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      )}
                      title={`Copy: ${v.word}`}
                    >
                      <span>{v.word}</span>
                      <span className="text-slate-400 font-normal">| {v.meaningVi}</span>
                      {copiedVocabIndex === vIdx && <Check className="w-3 h-3 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* SAMPLE ESSAY & TRANSLATION */}
              <div className="space-y-2 border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary">Bài viết mẫu (Sample):</span>
                  <button
                    onClick={() => {
                      setEntry(WRITING_PROMPTS[activePromptTopic].sample);
                      setActiveTab('editor'); // switch back to editor on mobile
                    }}
                    className="text-[10px] font-bold text-primary hover:text-primary/95 flex items-center gap-1 cursor-pointer bg-primary/10 px-2.5 py-1 rounded-lg border border-primary/20 shadow-sm shrink-0"
                  >
                    Áp dụng mẫu này
                  </button>
                </div>
                
                <div className="p-3 bg-blue-50/20 rounded-2xl border border-blue-100/50 space-y-2">
                  <p className="text-xs text-slate-700 leading-relaxed font-medium select-all">
                    {WRITING_PROMPTS[activePromptTopic].sample}
                  </p>
                  <p className="text-[11px] text-slate-500 italic leading-relaxed border-t border-slate-100/50 pt-2 select-all">
                    <strong>Bản dịch: </strong>{WRITING_PROMPTS[activePromptTopic].translation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM/RIGHT on Desktop, Tabbed on Mobile: History Panel */}
        <div className={cn(
          "space-y-4",
          activeTab !== 'history' && "hidden md:block" // Hide on mobile if not active tab
        )}>
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 space-y-4">
            <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
              <History className="w-4 h-4 text-primary" />
              Lịch Sử Nhật Ký
            </h3>

            {history.length === 0 ? (
              <div className="p-10 border border-dashed rounded-2xl flex flex-col items-center justify-center text-slate-400 space-y-2">
                <History className="w-8 h-8 opacity-20 text-slate-400" />
                <p className="text-xs italic text-slate-400">Bạn chưa viết nhật ký nào.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200">
                {history.map((item) => {
                  const itemAvgScore = Math.round((item.grammarScore + item.vocabularyScore + item.fluencyScore) / 3);
                  return (
                    <div 
                      key={item.id} 
                      className="p-3.5 bg-slate-50/50 hover:bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 cursor-pointer group transition-all"
                      onClick={() => {
                        setEntry(item.content);
                        setAnalysisResult(item);
                        setShowFeedback(true);
                        setActiveTab('editor'); // view details
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                        </span>
                        <div className={cn(
                          "flex items-center gap-1 font-bold text-[10px] px-2 py-0.5 rounded-full",
                          itemAvgScore >= 80 ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                        )}>
                          <BarChart3 className="w-3 h-3" />
                          {itemAvgScore}/100
                        </div>
                      </div>
                      <p className="text-xs font-bold text-slate-700 truncate group-hover:text-primary transition-colors mb-1">{item.title}</p>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{item.content}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Training Room Modal */}
      {showTrainingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="premium-card max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-fuchsia-500 to-rose-600 text-white rounded-xl shadow-md">
                  <Brain className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">Phòng Huấn Luyện Tri Thức AI</h3>
                  <p className="text-xs text-slate-400">Chọn tối đa 5 kỹ năng nâng cao để huấn luyện trực tiếp cho EngBot</p>
                </div>
              </div>
              <button 
                onClick={() => setShowTrainingModal(false)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Neural Synapses Status */}
            <div className="px-4 py-3 bg-gradient-to-r from-fuchsia-500/5 to-rose-500/5 dark:from-fuchsia-500/10 dark:to-rose-500/10 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-ping" />
                Kết nối nơ-ron: <span className="font-bold text-fuchsia-600 dark:text-fuchsia-400">{trainedSkills.length}/5 active</span>
              </span>
              {trainedSkills.length > 0 && (
                <button 
                  onClick={() => setTrainedSkills([])}
                  className="text-xs font-bold text-rose-500 hover:underline cursor-pointer"
                >
                  Xóa tất cả nơ-ron
                </button>
              )}
            </div>

            {/* Filter and Search */}
            <div className="p-4 space-y-3 border-b border-slate-100 dark:border-slate-800">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  placeholder="Tìm kiếm kỹ năng (ví dụ: copywriting, avoid-ai-writing, seo...)"
                  className="w-full h-10 pl-9 pr-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-xl focus:border-primary focus:outline-none transition-all text-sm placeholder:text-slate-400 text-slate-700 dark:text-slate-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Categories */}
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {['All', 'ai', 'development', 'security', 'database', 'design', 'seo', 'automation'].map(cat => {
                  const label = cat === 'All' ? 'Tất cả' : cat.toUpperCase();
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap",
                        isActive 
                          ? "bg-primary text-white" 
                          : "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Skills List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-[40vh] min-h-[25vh]">
              {availableSkills
                .filter(s => {
                  const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                     s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                     s.description.toLowerCase().includes(searchQuery.toLowerCase());
                  const matchCat = selectedCategory === 'All' || s.category === selectedCategory || s.tags?.includes(selectedCategory);
                  return matchSearch && matchCat;
                })
                .map(skill => {
                  const isChecked = trainedSkills.includes(skill.id);
                  return (
                    <button
                      key={skill.id}
                      onClick={() => {
                        if (isChecked) {
                          setTrainedSkills(trainedSkills.filter(id => id !== skill.id));
                        } else {
                          if (trainedSkills.length >= 5) {
                            alert('Chỉ huấn luyện tối đa 5 kỹ năng cùng lúc để đạt hiệu suất phản hồi tối ưu.');
                            return;
                          }
                          setTrainedSkills([...trainedSkills, skill.id]);
                        }
                      }}
                      className={cn(
                        "w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 active:scale-[0.99]",
                        isChecked 
                          ? "bg-fuchsia-500/5 dark:bg-fuchsia-500/10 border-fuchsia-500 text-slate-800 dark:text-slate-100" 
                          : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-200 dark:hover:border-slate-600"
                      )}
                    >
                      <div className={cn(
                        "w-5 h-5 rounded-md flex items-center justify-center border-2 flex-shrink-0 mt-0.5 transition-all",
                        isChecked ? "bg-fuchsia-500 border-fuchsia-500 text-white" : "border-slate-300 dark:border-slate-600"
                      )}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                          {skill.name || skill.id}
                          <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded">
                            {skill.category || 'general'}
                          </span>
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed mt-0.5 line-clamp-2">{skill.description}</p>
                      </div>
                    </button>
                  );
                })}
              {availableSkills.filter(s => {
                const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                   s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                   s.description.toLowerCase().includes(searchQuery.toLowerCase());
                const matchCat = selectedCategory === 'All' || s.category === selectedCategory || s.tags?.includes(selectedCategory);
                return matchSearch && matchCat;
              }).length === 0 && (
                <div className="text-center py-8 text-slate-400 italic text-sm">
                  Không tìm thấy kỹ năng nào phù hợp.
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
              <button 
                onClick={() => setShowTrainingModal(false)}
                className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Hủy
              </button>
              <button 
                onClick={() => setShowTrainingModal(false)}
                className="px-6 py-2 text-sm font-bold bg-primary text-white rounded-xl hover:opacity-90 transition-all shadow-md cursor-pointer"
              >
                Hoàn tất Huấn luyện
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
