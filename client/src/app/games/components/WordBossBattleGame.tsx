'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { X, RotateCcw, Swords, Shield, Zap, Sparkles, Trophy, Heart, Flame, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { STATIC_QUIZ_QUESTIONS, BOSS_MONSTERS, BOSS_BATTLE_SPELLS } from '@/data/games/gameData';
import { speak, shuffle, getCategoryLabel, GameVocabularyRecap, GameComponentProps } from './shared';

export default function WordBossBattleGame({ dbWords, category, onClose, awardXp, onSaveWord, savedWords, savingWord }: GameComponentProps) {
  // Boss & Player State
  const [bossIndex, setBossIndex] = useState(0);
  const currentBoss = BOSS_MONSTERS[bossIndex];
  
  const [bossHp, setBossHp] = useState(currentBoss.hp);
  const [playerHp, setPlayerHp] = useState(100);
  const [playerMp, setPlayerMp] = useState(100);
  const [playerShield, setPlayerShield] = useState(0);

  // Turn & Spell state
  const [selectedSpell, setSelectedSpell] = useState<typeof BOSS_BATTLE_SPELLS[0] | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<typeof STATIC_QUIZ_QUESTIONS[0] | null>(null);
  const [combatLogs, setCombatLogs] = useState<string[]>([`🔥 Trận đấu bắt đầu! Đối đầu với ${currentBoss.name} (${currentBoss.title})!`]);
  const [floatingDamage, setFloatingDamage] = useState<{ text: string; color: string; id: number } | null>(null);

  // Status
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [streak, setStreak] = useState(0);
  const [sessionWords, setSessionWords] = useState<any[]>([]);

  // Init question pool
  const getQuestionPool = useCallback(() => {
    let pool = STATIC_QUIZ_QUESTIONS;
    if (dbWords && dbWords.length >= 5) {
      const dbQuiz = dbWords.map(w => ({
        q: `Từ "${w.word}" trong tiếng Việt có nghĩa là gì?`,
        options: shuffle([
          w.meaningVi,
          'Thất bại',
          'Tương lai',
          'Nghịch cảnh'
        ]),
        answer: 0
      })).map(q => {
        const correctOpt = q.options[0];
        const shuffledOpts = shuffle(q.options);
        return {
          q: q.q,
          options: shuffledOpts,
          answer: shuffledOpts.indexOf(correctOpt)
        };
      });
      pool = [...dbQuiz, ...STATIC_QUIZ_QUESTIONS];
    }
    return shuffle(pool);
  }, [dbWords]);

  const addLog = (msg: string) => {
    setCombatLogs(prev => [msg, ...prev.slice(0, 5)]);
  };

  const showDamageText = (text: string, color: string) => {
    const id = Date.now();
    setFloatingDamage({ text, color, id });
    setTimeout(() => setFloatingDamage(null), 1200);
  };

  const handleSelectSpell = (spell: typeof BOSS_BATTLE_SPELLS[0]) => {
    if (playerMp < spell.mp) {
      addLog(`⚠️ Không đủ MP để thi triển ${spell.name}! (Cần ${spell.mp} MP)`);
      return;
    }
    setSelectedSpell(spell);
    const pool = getQuestionPool();
    const q = pool[Math.floor(Math.random() * pool.length)];
    setCurrentQuestion(q);
  };

  const handleAnswerQuestion = (selectedIdx: number) => {
    if (!selectedSpell || !currentQuestion) return;

    if (selectedIdx === currentQuestion.answer) {
      // SUCCESSFUL ATTACK
      const isCrit = Math.random() > 0.6 || streak >= 2;
      let finalDamage = selectedSpell.damage;
      if (isCrit) finalDamage = Math.round(finalDamage * 1.5);

      const newBossHp = Math.max(0, bossHp - finalDamage);
      setBossHp(newBossHp);
      setPlayerMp(mp => Math.min(100, mp - selectedSpell.mp + 15));
      setStreak(s => s + 1);

      showDamageText(`-${finalDamage} ${isCrit ? 'CRITICAL!' : ''}`, 'text-amber-400 font-black text-2xl animate-bounce');
      addLog(`⚔️ Bạn thi triển [${selectedSpell.name}] đánh trúng ${currentBoss.name} gây ${finalDamage} sát thương!`);

      // Special shield logic
      if (selectedSpell.id === 'shield') {
        setPlayerShield(s => s + 50);
        setPlayerHp(hp => Math.min(100, hp + 30));
        addLog(`🛡️ Bạn nhận được 50 Giáp & hồi 30 Máu!`);
      }

      if (newBossHp === 0) {
        if (bossIndex < BOSS_MONSTERS.length - 1) {
          addLog(`🎉 Bạn đã tiêu diệt ${currentBoss.name}! Tiến vào trùm tiếp theo!`);
          setTimeout(() => {
            const nextIdx = bossIndex + 1;
            setBossIndex(nextIdx);
            setBossHp(BOSS_MONSTERS[nextIdx].hp);
            setPlayerMp(100);
            addLog(`⚡ Trùm mới xuất hiện: ${BOSS_MONSTERS[nextIdx].name}!`);
          }, 1500);
        } else {
          setGameWon(true);
          awardXp?.(200, 'Word Boss Battle Champion');
          addLog(`🏆 XUẤT SẮC! Bạn đã hạ gục toàn bộ các Trùm Từ Vựng!`);
        }
      }
    } else {
      // INCORRECT - BOSS COUNTER ATTACK
      setStreak(0);
      const bossDamage = 25;
      showDamageText(`-${bossDamage} HP`, 'text-rose-500 font-black text-2xl');

      if (playerShield > 0) {
        const remainingShield = Math.max(0, playerShield - bossDamage);
        setPlayerShield(remainingShield);
        addLog(`🛡️ Khiên của bạn đỡ đòn đánh từ ${currentBoss.name}! (Còn ${remainingShield} Giáp)`);
      } else {
        const newHp = Math.max(0, playerHp - bossDamage);
        setPlayerHp(newHp);
        addLog(`👹 Trả lời sai! ${currentBoss.name} tung đòn phản công gây ${bossDamage} sát thương lên bạn!`);
        if (newHp === 0) {
          setGameLost(true);
        }
      }
    }

    setSelectedSpell(null);
    setCurrentQuestion(null);
  };

  const restartGame = () => {
    setBossIndex(0);
    setBossHp(BOSS_MONSTERS[0].hp);
    setPlayerHp(100);
    setPlayerMp(100);
    setPlayerShield(0);
    setGameWon(false);
    setGameLost(false);
    setStreak(0);
    setCombatLogs([`🔥 Trận đấu bắt đầu! Đối đầu với ${BOSS_MONSTERS[0].name}!`]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh] text-white">
        
        {/* Top Header Arena Bar */}
        <div className="px-8 py-5 border-b border-slate-800 bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500 shadow-lg">
              <Swords className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                Word Boss Battle <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold border border-red-500/30">RPG Mode</span>
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Thi triển chiêu thức từ vựng để tiêu diệt các Trùm Ngữ Pháp! (Danh mục: {getCategoryLabel(category)})</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-center bg-slate-800/60 px-3.5 py-1.5 rounded-xl border border-slate-700/50">
              <p className="text-[9px] text-amber-400 font-black uppercase tracking-widest">Chuỗi Combo</p>
              <p className="text-lg font-black text-white flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" /> x{streak}
              </p>
            </div>
            <button onClick={onClose} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-400 dark:text-slate-500 hover:text-white transition-all cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Combat Stage */}
        <div className="p-6 md:p-8 space-y-6 overflow-y-auto no-scrollbar flex-1">
          
          {/* Battle Arena Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Player Side */}
            <div className="premium-card p-6 bg-slate-800/60 border-slate-700/60 rounded-3xl space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-2xl shadow-xl shadow-indigo-600/30 border-2 border-indigo-400">
                    🧙‍♂️
                  </div>
                  <div>
                    <h3 className="font-black text-base text-white">Bạn (Hiệp Sĩ Từ Vựng)</h3>
                    <p className="text-xs text-indigo-400 font-bold">Level 99 EngBot Warrior</p>
                  </div>
                </div>
                {playerShield > 0 && (
                  <span className="px-2.5 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl font-bold text-xs flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5" /> {playerShield} Shield
                  </span>
                )}
              </div>

              {/* Player HP & MP Bars */}
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-300 flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> Máu (HP)</span>
                    <span className="text-rose-400">{playerHp} / 100</span>
                  </div>
                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                    <div className="h-full bg-gradient-to-r from-rose-500 to-red-600 transition-all duration-500 rounded-full" style={{ width: `${(playerHp / 100) * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-300 flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-blue-400 fill-blue-400" /> Năng Lượng (MP)</span>
                    <span className="text-blue-400">{playerMp} / 100</span>
                  </div>
                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 rounded-full" style={{ width: `${(playerMp / 100) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Boss Monster Side */}
            <div className={cn("premium-card p-6 bg-gradient-to-b border-slate-700/60 rounded-3xl space-y-4 relative overflow-hidden", currentBoss.color)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-black/40 flex items-center justify-center text-4xl shadow-2xl border-2 border-white/20 animate-pulse">
                    {currentBoss.avatar}
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-white">{currentBoss.name}</h3>
                    <p className="text-xs text-amber-300 font-bold">{currentBoss.title}</p>
                  </div>
                </div>
              </div>

              {/* Boss HP Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-white">
                  <span>Thanh Máu Trùm (Boss HP)</span>
                  <span className="font-mono">{bossHp} / {currentBoss.maxHp}</span>
                </div>
                <div className="w-full h-4 bg-black/50 rounded-full overflow-hidden border border-white/20">
                  <div className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transition-all duration-500 rounded-full" style={{ width: `${(bossHp / currentBoss.maxHp) * 100}%` }} />
                </div>
              </div>

              {/* Floating Damage Output */}
              {floatingDamage && (
                <div className="absolute top-2 right-4 pointer-events-none z-20">
                  <span className={floatingDamage.color}>{floatingDamage.text}</span>
                </div>
              )}
            </div>

          </div>

          {/* Spell Attack Actions Bar */}
          {!gameWon && !gameLost && (
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" /> Chọn Chiêu Thức Tấn Công (Attack Spells)
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {BOSS_BATTLE_SPELLS.map((spell) => {
                  const canCast = playerMp >= spell.mp;
                  return (
                    <button
                      key={spell.id}
                      onClick={() => handleSelectSpell(spell)}
                      disabled={!canCast}
                      className={cn(
                        "p-4 rounded-2xl border text-left transition-all relative overflow-hidden group cursor-pointer",
                        canCast
                          ? "bg-slate-800 hover:bg-slate-700 border-slate-700 hover:border-amber-500/50 hover:scale-102"
                          : "bg-slate-900/50 border-slate-800 opacity-50 cursor-not-allowed"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{spell.icon}</span>
                        <span className={cn("text-[10px] font-black px-2 py-0.5 rounded-full", spell.mp === 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-blue-500/20 text-blue-400")}>
                          {spell.mp === 0 ? 'FREE' : `${spell.mp} MP`}
                        </span>
                      </div>
                      <p className="font-black text-sm text-white group-hover:text-amber-400 transition-colors">{spell.name}</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium line-clamp-1 mt-0.5">{spell.desc}</p>
                      <div className="mt-2 text-[10px] font-black text-amber-400">⚡ Sát thương: +{spell.damage}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Combat Log Box */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 font-mono text-xs">
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">Lịch Sử Trận Đấu (Combat Logs)</p>
            {combatLogs.map((log, idx) => (
              <p key={idx} className="text-slate-300 leading-relaxed">{log}</p>
            ))}
          </div>

          {/* Victory / Defeat Modal Overlays */}
          {gameWon && (
            <div className="p-8 bg-gradient-to-b from-amber-950 to-slate-900 border border-amber-500/30 rounded-3xl text-center space-y-4 animate-in zoom-in duration-500">
              <div className="text-6xl animate-bounce">🏆</div>
              <h3 className="text-3xl font-black text-amber-400">CHIẾN THẮNG QUANG VINH!</h3>
              <p className="text-sm text-slate-300">Bạn đã tiêu diệt tất cả các Trùm Ngữ Pháp và nhận được <strong className="text-amber-300">+200 XP</strong> cùng danh hiệu <strong>Lexical Champion</strong>!</p>
              <div className="flex justify-center gap-4 pt-2">
                <button onClick={restartGame} className="px-6 py-3 bg-amber-500 text-slate-950 rounded-xl font-black hover:bg-amber-400 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20">
                  <RotateCcw className="w-4 h-4" /> Đấu Lại Trùm
                </button>
                <button onClick={onClose} className="px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all cursor-pointer">
                  Thoát Trận Đấu
                </button>
              </div>
            </div>
          )}

          {gameLost && (
            <div className="p-8 bg-gradient-to-b from-red-950 to-slate-900 border border-red-500/30 rounded-3xl text-center space-y-4 animate-in zoom-in duration-500">
              <div className="text-6xl">💀</div>
              <h3 className="text-3xl font-black text-rose-500">THẤT BẠI TRONG TRẬN ĐẤU!</h3>
              <p className="text-sm text-slate-300">Hãy ôn lại kiến thức từ vựng và thử sức lại với {currentBoss.name} nhé!</p>
              <div className="flex justify-center gap-4 pt-2">
                <button onClick={restartGame} className="px-6 py-3 bg-rose-600 text-white rounded-xl font-black hover:bg-rose-500 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-rose-600/20">
                  <RotateCcw className="w-4 h-4" /> Thử Lại Ngay
                </button>
                <button onClick={onClose} className="px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all cursor-pointer">
                  Thoát
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Spell Question Modal */}
      {selectedSpell && currentQuestion && (
        <div className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in zoom-in-95 duration-200">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 md:p-8 w-full max-w-xl space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-amber-400 font-black text-base">
                <span className="text-2xl">{selectedSpell.icon}</span> Thi Triển Chiêu Thức: {selectedSpell.name}
              </div>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-bold">Trả lời đúng để tung đòn!</span>
            </div>

            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 text-center space-y-2">
              <p className="text-base md:text-lg font-black text-white">{currentQuestion.q}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentQuestion.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerQuestion(idx)}
                  className="p-4 bg-slate-800 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-400 rounded-2xl text-left font-bold text-sm text-white transition-all cursor-pointer active:scale-95 shadow-md"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
