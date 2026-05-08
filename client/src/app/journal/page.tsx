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
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { analyzeJournal, getJournalHistory } from '@/services/journal.service';

// Mock user ID for development
const MOCK_USER_ID = 'user-123-abc';

export default function JournalPage() {
  const [entry, setEntry] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const data = await getJournalHistory(MOCK_USER_ID);
      setHistory(data);
    } catch (error) {
      console.error('Failed to load history');
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleAnalyze = async () => {
    if (!entry.trim()) return;
    
    setIsAnalyzing(true);
    setShowFeedback(false);

    try {
      const result = await analyzeJournal(MOCK_USER_ID, entry);
      setAnalysisResult(result.entry);
      setShowFeedback(true);
      fetchHistory(); // Refresh history
    } catch (error) {
      alert('Analysis failed. Please make sure the backend is running and the OpenAI API key is valid.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Helper to parse AI feedback JSON
  const parseFeedback = (feedbackStr: string) => {
    try {
      return JSON.parse(feedbackStr);
    } catch (e) {
      return { correctedText: '', feedback: feedbackStr };
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <PenTool className="w-8 h-8 text-primary" />
            Writing Journal
          </h1>
          <p className="text-slate-500">Practice writing daily and get AI-powered feedback.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchHistory}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors"
          >
            {isLoadingHistory ? <Loader2 className="w-4 h-4 animate-spin" /> : <History className="w-4 h-4" />}
            Refresh
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="premium-card p-6 flex flex-col min-h-[500px]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3 text-slate-500">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">May 8, 2026</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-400 font-medium">{entry.split(/\s+/).filter(w => w !== '').length} words</span>
              </div>
            </div>
            
            <textarea
              className="flex-1 w-full bg-transparent border-none focus:ring-0 text-lg leading-relaxed resize-none placeholder:text-slate-300"
              placeholder="Start writing your thoughts in English here..."
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
                <button className="flex items-center gap-2 px-6 py-2.5 border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors">
                  <Save className="w-4 h-4" />
                  Save Draft
                </button>
                <button 
                  onClick={handleAnalyze}
                  disabled={entry.length < 10 || isAnalyzing}
                  className={cn(
                    "flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-primary/20",
                    (entry.length < 10 || isAnalyzing) && "opacity-50 cursor-not-allowed grayscale"
                  )}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      AI Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 fill-white" />
                      AI Analysis
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
              <p className="text-sm text-slate-400 italic">No previous entries found.</p>
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
                AI Writing Feedback
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
                <p className="text-xs text-slate-400 max-w-[200px]">Write something and click "AI Analysis" to get feedback from our AI teacher.</p>
              </div>
            </div>
          )}

          <div className="premium-card p-6">
            <h3 className="font-bold mb-4">Writing Progress</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Weekly Entries</span>
                <span className="text-sm font-bold">{history.length} / 5</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${Math.min((history.length / 5) * 100, 100)}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
