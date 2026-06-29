'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  MessageSquare, Send, User as UserIcon, Bot, Sparkles, RotateCcw, 
  ChevronLeft, Coffee, Briefcase, Plane, ShoppingBag, Mic, MicOff,
  Loader2, LogIn, Zap, BookOpen, Languages, PenTool, GraduationCap,
  Lightbulb, History, X, Trash2, Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { sendMessage } from '@/services/chat.service';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Markdown } from '@/components/Markdown';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  translation?: string;
  feedback?: string;
  timestamp?: number;
}

interface Scenario {
  id: string;
  title: string;
  titleVi: string;
  icon: any;
  persona: string;
  scenario: string;
  color: string;
}

const SCENARIOS: Scenario[] = [
  { 
    id: 'free_chat', title: 'Free Chat', titleVi: 'Trò chuyện tự do',
    icon: MessageSquare, color: 'from-blue-500 to-indigo-600',
    persona: 'EngBot, a supportive AI English Coach and conversational tutor.',
    scenario: 'Trò chuyện tự do với EngBot. Bạn có thể nói về bất kỳ chủ đề nào, hỏi ngữ pháp, nhờ dịch thuật, hoặc tập phản xạ tiếng Anh.'
  },
  { 
    id: 'coffee_shop', title: 'Ordering Coffee', titleVi: 'Gọi cà phê',
    icon: Coffee, color: 'from-amber-500 to-orange-600',
    persona: 'A friendly barista at a busy Starbucks in New York.',
    scenario: 'You want to order a medium latte with almond milk and a blueberry muffin.'
  },
  { 
    id: 'job_interview', title: 'Job Interview', titleVi: 'Phỏng vấn xin việc',
    icon: Briefcase, color: 'from-emerald-500 to-teal-600',
    persona: 'A professional HR manager at a tech company.',
    scenario: 'You are applying for a Junior Web Developer position. Discuss your skills.'
  },
  { 
    id: 'airport', title: 'Check-in Desk', titleVi: 'Quầy check-in sân bay',
    icon: Plane, color: 'from-sky-500 to-cyan-600',
    persona: 'An airline staff member at the airport.',
    scenario: 'You are checking in for your flight to London, but your bag is overweight.'
  },
  { 
    id: 'shopping', title: 'Returns Desk', titleVi: 'Quầy trả đồ',
    icon: ShoppingBag, color: 'from-rose-500 to-pink-600',
    persona: 'A store clerk at a clothing store.',
    scenario: 'You bought a shirt yesterday but it has a small hole. You want a refund.'
  }
];

const QUICK_ACTIONS = [
  { label: 'Sửa ngữ pháp', prompt: 'Please correct my grammar in this sentence: ', icon: PenTool },
  { label: 'Dịch câu', prompt: 'How do you say this in English: ', icon: Languages },
  { label: 'Hỏi dạng câu hỏi', prompt: 'Explain the 6 main English Question Types (Yes/No, Wh-, Tag, Negative, Indirect, Hypothetical) and how to master them.', icon: GraduationCap },
  { label: 'Câu hỏi phủ định', prompt: 'How do I answer negative questions correctly (e.g., "Aren\'t you coming?") without making mistakes?', icon: BookOpen },
  { label: 'Khung trả lời STAR/PREP', prompt: 'Give me an example of how to structure an answer using the STAR or PREP framework.', icon: Sparkles },
  { label: 'Gợi ý chủ đề', prompt: 'Suggest an interesting topic to practice English about ', icon: Lightbulb },
];

export default function ChatPage() {
  const { user } = useAuth();
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [savedSessions, setSavedSessions] = useState<{id: string; title: string; date: string; messages: ChatMessage[]}[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Load saved sessions from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('engbot_chat_sessions');
      if (saved) setSavedSessions(JSON.parse(saved));
    } catch {}
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, isTyping, scrollToBottom]);

  // Voice recognition setup
  const toggleVoiceInput = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Trình duyệt không hỗ trợ nhận diện giọng nói. Hãy dùng Chrome hoặc Edge.');
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results).map((r: any) => r[0].transcript).join('');
      setInput(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [isListening]);

  // Save current session
  const saveCurrentSession = useCallback(() => {
    if (!selectedScenario || messages.length < 2) return;
    const session = {
      id: `session-${Date.now()}`,
      title: selectedScenario.title,
      date: new Date().toLocaleDateString('vi-VN'),
      messages: messages.slice(0, 20) // Keep last 20 messages
    };
    const updated = [session, ...savedSessions].slice(0, 10);
    setSavedSessions(updated);
    try { localStorage.setItem('engbot_chat_sessions', JSON.stringify(updated)); } catch {}
  }, [selectedScenario, messages, savedSessions]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-6 text-center animate-in fade-in duration-700 px-4">
        <div className="w-20 h-20 bg-primary/10 dark:bg-primary/20 rounded-3xl flex items-center justify-center text-primary">
          <MessageSquare className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Đăng Nhập để Chat</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Đăng nhập để lưu lịch sử hội thoại và nhận phản hồi cá nhân hóa từ EngBot.
          </p>
        </div>
        <Link href="/login" className="flex items-center gap-2 px-8 py-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg cursor-pointer">
          <LogIn className="w-5 h-5" /> Đăng nhập với Google
        </Link>
      </div>
    );
  }

  const handleStartScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    const name = user?.displayName?.split(' ')[0] || '';
    const content = scenario.id === 'free_chat'
      ? `Hello ${name}! I'm EngBot, your AI English Coach. We can chat about anything you like! You can type in English or Vietnamese, ask me questions, or practice translating. How are you doing today?`
      : `Hello ${name}! I'm your ${scenario.title} partner. ${scenario.scenario}. How can I help you today?`;
    const translation = scenario.id === 'free_chat'
      ? `Chào ${name}! Tôi là EngBot, Huấn luyện viên tiếng Anh AI của bạn. Chúng ta có thể trò chuyện tự do về bất cứ chủ đề nào! Hôm nay bạn thế nào?`
      : `Chào ${name}! Tôi là đối tác luyện tập ${scenario.titleVi} của bạn. ${scenario.scenario}. Tôi có thể giúp gì cho bạn?`;
    setMessages([{ role: 'assistant', content, translation, timestamp: Date.now() }]);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping || !selectedScenario) return;

    const userMessage = input.trim();
    setInput('');

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: userMessage, timestamp: Date.now() }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const apiHistory = newMessages.map(m => ({ role: m.role, content: m.content }));
      const token = await user.getIdToken();
      const result = await sendMessage({
        userId: user.uid,
        sessionId: `session-${selectedScenario.id}`,
        message: userMessage,
        persona: selectedScenario.persona,
        scenario: selectedScenario.scenario,
        history: apiHistory.slice(0, -1)
      }, token);

      setMessages([...newMessages, { 
        role: 'assistant', content: result.aiMessage,
        translation: result.translation, feedback: result.tutorFeedback,
        timestamp: Date.now()
      }]);
    } catch {
      setMessages([...newMessages, {
        role: 'assistant', content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment!",
        translation: "Xin lỗi, tôi đang gặp sự cố kết nối. Vui lòng thử lại sau!",
        timestamp: Date.now()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  const handleNewChat = () => {
    saveCurrentSession();
    setSelectedScenario(null);
    setMessages([]);
  };

  // ─── Scenario Selection Screen ───
  if (!selectedScenario) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700 px-2 sm:px-0">
        <header className="text-center space-y-4 pt-2">
          <div className="inline-flex p-3 bg-gradient-to-br from-primary/20 to-indigo-500/20 dark:from-primary/30 dark:to-indigo-500/30 rounded-2xl text-primary mb-2">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
            Luyện tập với <span className="gradient-text">EngBot</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto font-medium text-sm sm:text-base">
            Chọn tình huống thực tế và luyện kỹ năng giao tiếp tiếng Anh với trợ lý AI.
          </p>
        </header>

        {/* History button */}
        {savedSessions.length > 0 && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer"
            >
              <History className="w-4 h-4" />
              {showHistory ? 'Ẩn lịch sử' : `Lịch sử (${savedSessions.length})`}
            </button>
          </div>
        )}

        {/* Saved sessions */}
        {showHistory && savedSessions.length > 0 && (
          <div className="space-y-2 animate-in fade-in duration-300">
            {savedSessions.map((s) => (
              <div key={s.id} className="premium-card p-3 sm:p-4 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-sm text-slate-700 dark:text-slate-200 truncate">{s.title}</p>
                  <p className="text-xs text-slate-400">{s.date} • {s.messages.length} tin nhắn</p>
                </div>
                <button
                  onClick={() => {
                    const sc = SCENARIOS.find(x => x.title === s.title);
                    if (sc) { setSelectedScenario(sc); setMessages(s.messages); }
                  }}
                  className="px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer flex-shrink-0"
                >
                  Tiếp tục
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Scenario grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4">
          {SCENARIOS.map((scenario) => {
            const Icon = scenario.icon;
            return (
              <button
                key={scenario.id}
                onClick={() => handleStartScenario(scenario)}
                className={cn(
                  "premium-card p-5 sm:p-6 text-left group hover:shadow-lg transition-all cursor-pointer",
                  "flex items-start gap-3 sm:gap-4 active:scale-[0.98]",
                  scenario.id === 'free_chat' && "sm:col-span-2"
                )}
              >
                <div className={cn(
                  "p-2.5 sm:p-3 rounded-xl bg-gradient-to-br text-white shadow-md flex-shrink-0",
                  scenario.color
                )}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-base sm:text-lg mb-0.5 text-slate-800 dark:text-slate-100">{scenario.title}</h3>
                  <p className="text-xs text-slate-400 font-medium mb-1">{scenario.titleVi}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">{scenario.scenario}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ─── Chat Interface ───
  return (
    <div className="h-[calc(100vh-6rem)] lg:h-[calc(100vh-4rem)] flex flex-col max-w-5xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <header className="flex items-center justify-between px-3 sm:px-5 py-3 border-b border-slate-100 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-t-2xl sm:rounded-t-3xl">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button 
            onClick={handleNewChat}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer flex-shrink-0"
            aria-label="Back to scenarios"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
          <div className={cn("w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-md flex-shrink-0", selectedScenario.color)}>
            <selectedScenario.icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <h2 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100 truncate">{selectedScenario.title}</h2>
            <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              EngBot Online
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <button onClick={() => { saveCurrentSession(); setMessages([]); handleStartScenario(selectedScenario); }}
            className="p-2 text-slate-400 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer" aria-label="Reset chat">
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button onClick={handleNewChat}
            className="p-2 text-slate-400 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer" aria-label="New chat">
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-5 py-4 space-y-4 sm:space-y-5 no-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={cn(
            "flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300",
            msg.role === 'user' ? "justify-end" : "justify-start"
          )}>
            <div className={cn("flex gap-2 sm:gap-3", msg.role === 'user' ? "flex-row-reverse max-w-[90%] sm:max-w-[80%]" : "flex-row max-w-[95%] sm:max-w-[85%]")}>
              {/* Avatar */}
              <div className={cn(
                "w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden",
                msg.role === 'user' ? "bg-slate-900 dark:bg-slate-700 text-white" : "bg-gradient-to-br from-primary to-indigo-600 text-white"
              )}>
                {msg.role === 'user' ? (
                  user.photoURL ? <img src={user.photoURL} alt="User" className="w-full h-full object-cover" /> : <UserIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </div>

              {/* Content */}
              <div className="space-y-1.5 min-w-0 flex-1">
                {msg.role === 'assistant' && (
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest px-1">EngBot</span>
                )}
                <div className={cn(
                  "p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-sm leading-relaxed text-sm sm:text-base break-words",
                  msg.role === 'user' 
                    ? "bg-slate-900 dark:bg-slate-700 text-white rounded-tr-sm sm:rounded-tr-none" 
                    : "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-tl-sm sm:rounded-tl-none"
                )}>
                  {msg.content}
                </div>
                
                {/* Translation & Feedback */}
                {msg.role === 'assistant' && (
                  <div className="space-y-1.5 sm:space-y-2">
                    {msg.translation && (
                      <>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-full w-fit">
                          <Sparkles className="w-3 h-3 text-primary" />
                          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Bản dịch</span>
                        </div>
                        <p className="text-xs text-slate-400 dark:text-slate-500 italic px-1">{msg.translation}</p>
                      </>
                    )}
                    {msg.feedback && (
                      <div className="p-2.5 sm:p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-xl sm:rounded-2xl text-xs text-blue-700 dark:text-blue-300 flex items-start gap-2 w-full overflow-hidden">
                        <Zap className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-500" />
                        <div className="flex-1 min-w-0 overflow-x-auto"><Markdown content={msg.feedback} /></div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="flex gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-indigo-600 text-white flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="p-3 sm:p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl sm:rounded-3xl rounded-tl-sm sm:rounded-tl-none flex gap-1.5 items-center">
                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions (only show when few messages) */}
      {messages.length <= 2 && selectedScenario.id === 'free_chat' && (
        <div className="px-3 sm:px-5 pb-2 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 w-max">
            {QUICK_ACTIONS.map((action) => (
              <button key={action.label} onClick={() => handleQuickAction(action.prompt)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-primary/40 hover:text-primary transition-all cursor-pointer whitespace-nowrap active:scale-95">
                <action.icon className="w-3 h-3" /> {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Footer */}
      <footer className="px-3 sm:px-5 py-3 sm:py-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-b-2xl sm:rounded-b-3xl border-t border-slate-100 dark:border-slate-800">
        <form onSubmit={handleSendMessage} className="relative flex items-center gap-2 sm:gap-3">
          <div className="flex-1 relative">
            <input 
              ref={inputRef}
              type="text" 
              placeholder="Nhập tin nhắn tiếng Anh hoặc tiếng Việt..." 
              className="w-full h-11 sm:h-14 pl-4 sm:pl-5 pr-12 sm:pr-14 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-xl sm:rounded-2xl shadow-sm focus:border-primary focus:ring-0 focus:outline-none transition-all font-medium text-sm sm:text-base text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
              aria-label="Chat message input"
            />
            <button 
              type="button"
              onClick={toggleVoiceInput}
              className={cn(
                "absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all cursor-pointer",
                isListening ? "text-red-500 bg-red-50 dark:bg-red-950/30 animate-pulse" : "text-slate-300 dark:text-slate-500 hover:text-primary"
              )}
              aria-label={isListening ? "Stop recording" : "Start voice input"}
            >
              {isListening ? <MicOff className="w-5 h-5 sm:w-6 sm:h-6" /> : <Mic className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className={cn(
              "w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center bg-gradient-to-br from-primary to-indigo-600 text-white rounded-xl sm:rounded-2xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all cursor-pointer flex-shrink-0",
              (!input.trim() || isTyping) && "opacity-50 cursor-not-allowed"
            )}
            aria-label="Send message"
          >
            {isTyping ? <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" /> : <Send className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </form>
      </footer>
    </div>
  );
}
