'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  User, 
  Sparkles, 
  Mic, 
  MapPin, 
  Briefcase, 
  Coffee, 
  MessageSquare,
  Settings,
  MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  feedback?: string;
}

const roleplays = [
  { id: 'travel', icon: MapPin, label: 'Travel', color: 'bg-blue-500' },
  { id: 'interview', icon: Briefcase, label: 'Job Interview', color: 'bg-purple-500' },
  { id: 'daily', icon: Coffee, label: 'Daily Life', color: 'bg-green-500' },
  { id: 'casual', icon: MessageSquare, label: 'Casual Chat', color: 'bg-orange-500' },
];

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI English Mentor. Which topic would you like to practice today?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [activeRoleplay, setActiveRoleplay] = useState('casual');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "That sounds interesting! Can you tell me more about that in English? For example, what specific details do you find most appealing?",
        timestamp: new Date(),
        feedback: input.toLowerCase().includes('i is') ? "Grammar Note: Use 'I am' instead of 'I is'." : undefined
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] animate-in fade-in duration-700">
      <header className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-t-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white">
            <Sparkles className="w-5 h-5 fill-white" />
          </div>
          <div>
            <h2 className="font-bold">AI English Mentor</h2>
            <p className="text-xs text-green-500 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Online
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500">
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden border-x border-slate-200 bg-slate-50/30">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((m) => (
              <div 
                key={m.id} 
                className={cn(
                  "flex items-start gap-3",
                  m.role === 'user' ? "flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0",
                  m.role === 'user' ? "bg-primary" : "gradient-bg"
                )}>
                  {m.role === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                </div>
                <div className={cn(
                  "max-w-[80%] space-y-2",
                  m.role === 'user' ? "flex flex-col items-end" : ""
                )}>
                  <div className={cn(
                    "p-4 rounded-2xl shadow-sm",
                    m.role === 'user' 
                      ? "bg-primary text-white rounded-tr-none" 
                      : "bg-white border border-slate-100 rounded-tl-none"
                  )}>
                    <p className="text-sm leading-relaxed">{m.content}</p>
                  </div>
                  
                  {m.feedback && (
                    <div className="p-2 bg-amber-50 border border-amber-100 rounded-lg text-[10px] text-amber-700 font-medium animate-in slide-in-from-top-2">
                      <Sparkles className="w-3 h-3 inline mr-1 mb-0.5" />
                      {m.feedback}
                    </div>
                  )}
                  
                  <span className="text-[10px] text-slate-400 font-medium">
                    {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-slate-200 rounded-b-2xl">
            <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
              {roleplays.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setActiveRoleplay(role.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all",
                    activeRoleplay === role.id 
                      ? "bg-primary text-white shadow-md shadow-primary/20" 
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  )}
                >
                  <role.icon className="w-3 h-3" />
                  {role.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Type your message in English..."
                className="w-full pl-4 pr-24 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <div className="absolute inset-y-0 right-2 flex items-center gap-1">
                <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                  <Mic className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className={cn(
                    "p-2 bg-primary text-white rounded-lg transition-all shadow-md",
                    !input.trim() && "opacity-50 grayscale cursor-not-allowed shadow-none"
                  )}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info Sidebar (Desktop only) */}
        <div className="hidden xl:block w-72 p-6 space-y-8 bg-white border-l border-slate-200 overflow-y-auto">
          <div className="space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400">Current Session</h3>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-xs font-bold text-blue-600 mb-1">Target Skill</p>
              <p className="text-sm font-semibold">Narrating Experiences</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400">Key Vocabulary</h3>
            <div className="flex flex-wrap gap-2">
              {['Adventure', 'Experience', 'Fascinating', 'Memorable'].map(v => (
                <span key={v} className="px-2 py-1 bg-slate-100 rounded-md text-[10px] font-bold text-slate-600 border border-slate-200">
                  {v}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400">Conversation Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-slate-50 rounded-xl">
                <p className="text-xl font-bold">12</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Turns</p>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-xl">
                <p className="text-xl font-bold">85%</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Accuracy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
