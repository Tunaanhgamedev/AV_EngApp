'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  User as UserIcon, 
  Bot, 
  Sparkles, 
  RotateCcw, 
  Info,
  ChevronLeft,
  Coffee,
  Briefcase,
  Plane,
  ShoppingBag,
  Mic,
  Loader2,
  LogIn
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { sendMessage } from '@/services/chat.service';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const SCENARIOS = [
  { 
    id: 'free_chat', 
    title: 'Free Chat with EngBot', 
    icon: MessageSquare, 
    persona: 'EngBot, a supportive AI English Coach and conversational tutor.',
    scenario: 'Trò chuyện tự do với EngBot. Bạn có thể nói về bất kỳ chủ đề nào, hỏi ngữ pháp, nhờ dịch thuật, hoặc tập phản xạ tiếng Anh.'
  },
  { 
    id: 'coffee_shop', 
    title: 'Ordering Coffee', 
    icon: Coffee, 
    persona: 'A friendly barista at a busy Starbucks in New York.',
    scenario: 'You want to order a medium latte with almond milk and a blueberry muffin.'
  },
  { 
    id: 'job_interview', 
    title: 'Job Interview', 
    icon: Briefcase, 
    persona: 'A professional HR manager at a tech company.',
    scenario: 'You are applying for a Junior Web Developer position. Discuss your skills.'
  },
  { 
    id: 'airport', 
    title: 'Check-in Desk', 
    icon: Plane, 
    persona: 'An airline staff member at the airport.',
    scenario: 'You are checking in for your flight to London, but your bag is overweight.'
  },
  { 
    id: 'shopping', 
    title: 'Returns Desk', 
    icon: ShoppingBag, 
    persona: 'A store clerk at a clothing store.',
    scenario: 'You bought a shirt yesterday but it has a small hole. You want a refund.'
  }
];

export default function ChatPage() {
  const { user } = useAuth();
  const [selectedScenario, setSelectedScenario] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-6 text-center animate-in fade-in duration-700">
        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary">
          <MessageSquare className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Sign In to Chat</h1>
          <p className="text-slate-500 max-w-sm mx-auto">
            Log in to save your conversation history and get personalized feedback from EngBot.
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

  const handleStartScenario = (scenario: any) => {
    setSelectedScenario(scenario);
    const content = scenario.id === 'free_chat'
      ? `Hello ${user?.displayName?.split(' ')[0] || ''}! I'm EngBot, your AI English Coach. We can chat about anything you like! You can type in English or Vietnamese, ask me questions, or practice translating. How are you doing today?`
      : `Hello ${user?.displayName?.split(' ')[0] || ''}! I'm your ${scenario.title} partner. ${scenario.scenario}. How can I help you today?`;
    const translation = scenario.id === 'free_chat'
      ? `Chào ${user?.displayName?.split(' ')[0] || ''}! Tôi là EngBot, Huấn luyện viên tiếng Anh AI của bạn. Chúng ta có thể trò chuyện tự do về bất cứ chủ đề nào bạn thích! Bạn có thể gõ bằng tiếng Anh hoặc tiếng Việt, đặt câu hỏi cho tôi hoặc luyện dịch. Hôm nay bạn thế nào?`
      : `Chào ${user?.displayName?.split(' ')[0] || ''}! Tôi là đối tác luyện tập ${scenario.title} của bạn. ${scenario.scenario}. Tôi có thể giúp gì cho bạn hôm nay?`;

    setMessages([
      { 
        role: 'assistant', 
        content,
        translation
      }
    ]);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const apiHistory = newMessages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const token = await user.getIdToken();
      const result = await sendMessage({
        userId: user.uid,
        sessionId: `session-${selectedScenario.id}`,
        message: userMessage,
        persona: selectedScenario.persona,
        scenario: selectedScenario.scenario,
        history: apiHistory.slice(0, -1)
      }, token); // Pass the token for authentication

      setMessages([
        ...newMessages,
        { 
          role: 'assistant', 
          content: result.aiMessage,
          translation: result.translation,
          feedback: result.tutorFeedback
        }
      ]);
    } catch (error) {
      console.error(error);
      alert('Failed to get response from EngBot.');
    } finally {
      setIsTyping(false);
    }
  };

  if (!selectedScenario) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
        <header className="text-center space-y-4">
          <div className="inline-flex p-3 bg-primary/10 rounded-2xl text-primary mb-2">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Roleplay with <span className="gradient-text">EngBot</span></h1>
          <p className="text-slate-500 max-w-lg mx-auto font-medium">
            Choose a real-world scenario and practice your English speaking skills with our AI mentor.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
          {SCENARIOS.map((scenario) => {
            const Icon = scenario.icon;
            return (
              <button
                key={scenario.id}
                onClick={() => handleStartScenario(scenario)}
                className="premium-card p-6 text-left group hover:border-primary/40 transition-all flex items-start gap-4"
              >
                <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{scenario.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{scenario.scenario}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col max-w-6xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-center justify-between p-4 border-b border-slate-100 bg-white/50 backdrop-blur-md rounded-t-3xl">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSelectedScenario(null)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-bold">{selectedScenario.title}</h2>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Live with EngBot
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-400 hover:text-primary transition-colors">
            <RotateCcw className="w-5 h-5" />
          </button>
          <button className="p-2 text-slate-400 hover:text-primary transition-colors">
            <Info className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={cn(
              "flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300",
              msg.role === 'user' ? "justify-end" : "justify-start"
            )}
          >
            <div className={cn(
              "flex gap-3 max-w-[80%]",
              msg.role === 'user' ? "flex-row-reverse" : "flex-row"
            )}>
              <div className={cn(
                "w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden",
                msg.role === 'user' ? "bg-slate-900 text-white" : "bg-primary text-white"
              )}>
                {msg.role === 'user' ? (
                  user.photoURL ? <img src={user.photoURL} alt="User" /> : <UserIcon className="w-5 h-5" />
                ) : (
                  <Bot className="w-5 h-5" />
                )}
              </div>
              <div className="space-y-2">
                {msg.role === 'assistant' && (
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest px-1">EngBot</span>
                )}
                <div className={cn(
                  "p-4 rounded-3xl shadow-sm leading-relaxed",
                  msg.role === 'user' 
                    ? "bg-slate-900 text-white rounded-tr-none" 
                    : "bg-white border border-slate-100 rounded-tl-none"
                )}>
                  {msg.content}
                </div>
                
                {msg.role === 'assistant' && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full w-fit">
                      <Sparkles className="w-3 h-3 text-primary" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Translation</span>
                    </div>
                    <p className="text-xs text-slate-400 italic px-1">
                      {msg.translation}
                    </p>
                    
                    {msg.feedback && (
                      <div className="p-3 bg-blue-50 border border-blue-100 rounded-2xl text-xs text-blue-700 flex items-start gap-2">
                        <Info className="w-4 h-4 flex-shrink-0" />
                        <p>{msg.feedback}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-pulse">
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="p-4 bg-white border border-slate-100 rounded-3xl rounded-tl-none flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <footer className="p-6 bg-white/50 backdrop-blur-md rounded-b-3xl border-t border-slate-100">
        <form onSubmit={handleSendMessage} className="relative flex items-center gap-3">
          <div className="flex-1 relative group">
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="w-full h-14 pl-6 pr-14 bg-white border-2 border-slate-100 rounded-2xl shadow-sm focus:border-primary focus:ring-0 transition-all font-medium"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
            />
            <button 
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-300 hover:text-primary transition-colors"
            >
              <Mic className="w-6 h-6" />
            </button>
          </div>
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className={cn(
              "w-14 h-14 flex items-center justify-center bg-primary text-white rounded-2xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all",
              (!input.trim() || isTyping) && "opacity-50 cursor-not-allowed"
            )}
          >
            {isTyping ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
          </button>
        </form>
      </footer>
    </div>
  );
}
