'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, BookOpen, Sparkles, ChevronDown, Mic, Target, Star, Play, Info, ArrowRight, HelpCircle, Hash, FileText, Search, Loader2, Calendar, Globe, MessageSquare, Zap, Palette, Users, Clock, ChevronRight, Trophy, User } from 'lucide-react';
import { cn } from '@/lib/utils';
// grammarData is imported dynamically inside the component

import {
  type AlphabetLetter,
  ALPHABET,
  VOWELS,
  DIPHTHONGS,
  CONSONANTS,
  STRESS_RULES,
  NUMBERS_BASIC,
  NUMBERS_TENS,
  NUMBERS_BIG,
  NUMBERS_COMBO,
  ORDINALS,
  ED_RULES,
  S_RULES,
  PLURAL_RULES,
  IRREGULAR_NOUNS,
  UNCOUNTABLE_NOUNS,
  ARTICLE_RULES,
  DAYS_OF_WEEK,
  MONTHS_OF_YEAR,
  YEAR_RULES,
  RELATIVE_TIME_WORDS,
  TOPIC_LESSONS,
  QUESTION_TYPES_DATA,
  INTONATION_GUIDELINES,
  SENTENCE_STRESS_RULES
} from './phonicsData';

// ─── Countries & Nationalities Data ──────────────────────────────────────────
import COUNTRIES_DATA from '@/data/countries';

const speak = (text: string, rate: number = 0.7) => {
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
    u.lang = 'en-US';
    u.rate = rate;
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

// ─── Speech Practice Section Component ─────────────────────────────────────────
function SpeechPracticeSection({ targetWord }: { targetWord: string }) {
  const [isRecording, setIsRecording] = useState(false);
  const [resultText, setResultText] = useState('');
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const startListening = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setErrorMessage('Trình duyệt không hỗ trợ nhận diện giọng nói (API Web Speech). Hãy dùng Chrome/Safari.');
      return;
    }

    setResultText('');
    setAccuracy(null);
    setErrorMessage('');
    setIsRecording(true);

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      setResultText(speechToText);

      const targetClean = targetWord.toLowerCase().replace(/[^a-z]/g, '');
      const spokenClean = speechToText.toLowerCase().replace(/[^a-z]/g, '');

      if (spokenClean === targetClean) {
        setAccuracy(100);
      } else if (spokenClean.includes(targetClean) || targetClean.includes(spokenClean)) {
        setAccuracy(80);
      } else {
        setAccuracy(30);
      }
    };

    recognition.onerror = (event: any) => {
      console.error(event);
      setErrorMessage('Không nhận diện được giọng nói hoặc micro bị chặn.');
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
      <div className="flex-1 min-w-0 text-left">
        <h4 className="text-xs font-black text-violet-600 uppercase tracking-widest">Luyện phát âm AI</h4>
        <p className="text-xs text-slate-500 mt-0.5 font-medium">Nhấp vào micro, đọc từ ví dụ <strong className="text-slate-800">"{targetWord}"</strong> để kiểm tra.</p>

        {resultText && (
          <p className="text-xs text-slate-800 mt-2 font-semibold">
            Bạn đã đọc: <span className="text-violet-600 font-bold">"{resultText}"</span>
          </p>
        )}

        {accuracy !== null && (
          <div className="flex flex-wrap items-center gap-2 mt-1.5">
            <span className={cn(
              "text-[10px] font-black px-2.5 py-0.5 rounded-full",
              accuracy === 100 ? "bg-emerald-100 text-emerald-700" : accuracy >= 80 ? "bg-blue-100 text-blue-700" : "bg-rose-100 text-rose-700"
            )}>
              Độ khớp: {accuracy}%
            </span>
            <span className="text-xs font-bold text-slate-600">
              {accuracy === 100 ? 'Rất tuyệt vời! Phát âm hoàn hảo.' : accuracy >= 80 ? 'Khá tốt, gần chính xác!' : 'Chưa khớp lắm, hãy thử lại.'}
            </span>
          </div>
        )}

        {errorMessage && (
          <p className="text-xs text-rose-500 mt-2 font-medium">⚠️ {errorMessage}</p>
        )}
      </div>

      <button
        onClick={startListening}
        disabled={isRecording}
        className={cn(
          "w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md shrink-0",
          isRecording
            ? "bg-rose-600 text-white animate-pulse"
            : "bg-violet-100 text-violet-600 border border-violet-200 hover:bg-violet-600 hover:text-white"
        )}
        title="Bấm để ghi âm"
      >
        <Mic className="w-5 h-5" />
      </button>
    </div>
  );
}

// ─── IPA Cell Component ────────────────────────────────────────────────────────
function IPACell({ item, color, isActive, onClick }: { item: any; color: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center gap-1 p-3 sm:p-4 rounded-2xl border-2 transition-all duration-200",
        "hover:shadow-lg hover:-translate-y-0.5 active:scale-95 text-slate-800 cursor-pointer",
        isActive ? "border-primary bg-primary/10 scale-[1.03] shadow-md shadow-primary/5" : color
      )}
    >
      <span className="text-xl sm:text-2xl font-black font-mono">{item.ipa}</span>
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.example}</span>
      <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Volume2 className="w-4 h-4 text-primary animate-pulse" />
      </div>
    </button>
  );
}

// ─── Verb Conjugation Helper ──────────────────────────────────────────────────
function conjugateVerb(verb: string, subject: string, tense: string) {
  const sub = subject.trim();
  const is3rdSingular = ['He', 'She', 'It'].includes(sub);
  const is1stSingular = sub === 'I';

  const verbForms: Record<string, { v1: string; v2: string; v3: string; ving: string; vs: string; vi: string }> = {
    be: { v1: 'be', v2: 'was/were', v3: 'been', ving: 'being', vs: 'is', vi: 'thì, là, ở' },
    have: { v1: 'have', v2: 'had', v3: 'had', ving: 'having', vs: 'has', vi: 'có' },
    do: { v1: 'do', v2: 'did', v3: 'done', ving: 'doing', vs: 'does', vi: 'làm' },
    go: { v1: 'go', v2: 'went', v3: 'gone', ving: 'going', vs: 'goes', vi: 'đi' },
    make: { v1: 'make', v2: 'made', v3: 'made', ving: 'making', vs: 'makes', vi: 'chế tạo, làm ra' },
    know: { v1: 'know', v2: 'knew', v3: 'known', ving: 'knowing', vs: 'knows', vi: 'biết' },
    think: { v1: 'think', v2: 'thought', v3: 'thought', ving: 'thinking', vs: 'thinks', vi: 'nghĩ' },
    see: { v1: 'see', v2: 'saw', v3: 'seen', ving: 'seeing', vs: 'sees', vi: 'nhìn thấy' },
    run: { v1: 'run', v2: 'ran', v3: 'run', ving: 'running', vs: 'runs', vi: 'chạy' },
    speak: { v1: 'speak', v2: 'spoke', v3: 'spoken', ving: 'speaking', vs: 'speaks', vi: 'nói' },
    work: { v1: 'work', v2: 'worked', v3: 'worked', ving: 'working', vs: 'works', vi: 'làm việc' },
    play: { v1: 'play', v2: 'played', v3: 'played', ving: 'playing', vs: 'plays', vi: 'chơi' },
    study: { v1: 'study', v2: 'studied', v3: 'studied', ving: 'studying', vs: 'studies', vi: 'học tập' },
    write: { v1: 'write', v2: 'wrote', v3: 'written', ving: 'writing', vs: 'writes', vi: 'viết' },
    eat: { v1: 'eat', v2: 'ate', v3: 'eaten', ving: 'eating', vs: 'eats', vi: 'ăn' },
    drink: { v1: 'drink', v2: 'drank', v3: 'drunk', ving: 'drinking', vs: 'drinks', vi: 'uống' }
  };

  const info = verbForms[verb] || { v1: verb, v2: verb + 'ed', v3: verb + 'ed', ving: verb + 'ing', vs: verb + 's', vi: '' };

  let positive = '';
  let negative = '';
  let question = '';
  let explanation = '';
  let isStativeWarning = false;

  const stativeVerbs = ['know', 'believe', 'understand', 'remember', 'forget', 'prefer', 'mean', 'agree', 'see', 'have', 'think'];
  if (stativeVerbs.includes(verb) && tense === 'Present Continuous') {
    isStativeWarning = true;
  }

  if (tense === 'Present Simple') {
    if (verb === 'be') {
      const beForm = is1stSingular ? 'am' : is3rdSingular ? 'is' : 'are';
      positive = `${sub} ${beForm}.`;
      negative = `${sub} ${beForm} not.`;
      question = `${beForm.charAt(0).toUpperCase() + beForm.slice(1)} ${sub.toLowerCase()}?`;
      explanation = `Thì Hiện tại đơn với động từ "to be". Với chủ ngữ "${sub}", dạng chia là "${beForm}".`;
    } else {
      const vForm = is3rdSingular ? info.vs : info.v1;
      const aux = is3rdSingular ? 'does' : 'do';
      positive = `${sub} ${vForm}.`;
      negative = `${sub} ${aux} not ${info.v1}.`;
      question = `${aux.charAt(0).toUpperCase() + aux.slice(1)} ${sub.toLowerCase()} ${info.v1}?`;
      explanation = `Thì Hiện tại đơn với động từ thường. Với ngôi thứ ba số ít (He/She/It), thêm "-s/-es" vào động từ và dùng trợ động từ "does" trong câu phủ định/nghi vấn.`;
    }
  } else if (tense === 'Present Continuous') {
    const beForm = is1stSingular ? 'am' : is3rdSingular ? 'is' : 'are';
    positive = `${sub} ${beForm} ${info.ving}.`;
    negative = `${sub} ${beForm} not ${info.ving}.`;
    question = `${beForm.charAt(0).toUpperCase() + beForm.slice(1)} ${sub.toLowerCase()} ${info.ving}?`;
    explanation = `Thì Hiện tại tiếp diễn: S + am/is/are + V-ing. Diễn tả hành động đang xảy ra tại thời điểm nói.`;
    if (isStativeWarning) {
      explanation += `\n⚠️ Cảnh báo: "${verb}" là động từ trạng thái (stative verb), thường không dùng ở dạng tiếp diễn trong giao tiếp chuẩn trừ khi mang nghĩa đặc biệt (như đang cân nhắc, ngẫm nghĩ).`;
    }
  } else if (tense === 'Past Simple') {
    if (verb === 'be') {
      const wasWere = (is1stSingular || is3rdSingular) ? 'was' : 'were';
      positive = `${sub} ${wasWere}.`;
      negative = `${sub} ${wasWere} not.`;
      question = `${wasWere.charAt(0).toUpperCase() + wasWere.slice(1)} ${sub.toLowerCase()}?`;
      explanation = `Thì Quá khứ đơn với động từ "to be". Chủ ngữ số ít (I/He/She/It) chia là "was", chủ ngữ số nhiều/ngôi thứ 2 chia là "were".`;
    } else {
      positive = `${sub} ${info.v2}.`;
      negative = `${sub} did not ${info.v1}.`;
      question = `Did ${sub.toLowerCase()} ${info.v1}?`;
      explanation = `Thì Quá khứ đơn với động từ thường: Khẳng định dùng dạng V2 (${info.v2}). Phủ định và nghi vấn dùng trợ động từ "did" đưa động từ về nguyên mẫu V1 (${info.v1}).`;
    }
  } else if (tense === 'Present Perfect') {
    const aux = is3rdSingular ? 'has' : 'have';
    positive = `${sub} ${aux} ${info.v3}.`;
    negative = `${sub} ${aux} not ${info.v3}.`;
    question = `${aux.charAt(0).toUpperCase() + aux.slice(1)} ${sub.toLowerCase()} ${info.v3}?`;
    explanation = `Thì Hiện tại hoàn thành: S + have/has + V3 (Past Participle). Dùng khi nói về trải nghiệm hoặc hành động vừa xảy ra có ảnh hưởng đến hiện tại.`;
  } else if (tense === 'Future Simple') {
    positive = `${sub} will ${info.v1}.`;
    negative = `${sub} will not ${info.v1}.`;
    question = `Will ${sub.toLowerCase()} ${info.v1}?`;
    explanation = `Thì Tương lai đơn: S + will + V1 (nguyên mẫu). Diễn tả quyết định tức thời hoặc dự đoán tương lai.`;
  }

  return { positive, negative, question, explanation, isStativeWarning };
}

function analyzeUserVerb(input: string, baseVerb: string = 'go', commonVerbs: any[] = []) {
  const cleanInput = input.trim().toLowerCase();
  const base = baseVerb.trim().toLowerCase();

  // Find the verb details from COMMON_VERBS to get V1, V2, V3 if available
  const verbEntry = commonVerbs.find(v => v.verb.toLowerCase() === base);
  const v1 = base;
  const v2 = verbEntry ? verbEntry.v2.toLowerCase() : '';
  const v3 = verbEntry ? verbEntry.v3.toLowerCase() : '';

  let detectedForm = '';
  let tenseDescription = '';
  let matchClues = '';
  let formula = '';

  // Standard suffix check
  const isVing = cleanInput === base + 'ing' || 
                 (base.endsWith('e') && cleanInput === base.slice(0, -1) + 'ing') || 
                 (base.endsWith('y') && cleanInput === base.slice(0, -1) + 'ying') || 
                 cleanInput.endsWith('ing');
  const isVes = cleanInput === base + 's' || 
                cleanInput === base + 'es' || 
                (base.endsWith('y') && cleanInput === base.slice(0, -1) + 'ies');

  if (cleanInput === v1) {
    detectedForm = 'V1 (Bare Infinitive / Nguyên mẫu)';
    tenseDescription = 'Hình thái nguyên mẫu của động từ (infinitive form) chưa qua biến đổi.';
    matchClues = 'Thường xuất hiện trong các câu hỏi có chủ ngữ số nhiều (I, you, we, they) ở thì Hiện tại đơn, sau các trợ động từ phủ định (don\'t, doesn\'t, didn\'t), động từ khuyết thiếu (should, can, must...), hoặc dùng trong cấu trúc To-infinitive (to + V1).';
    formula = 'Subject + V1  hoặc  modal + V1  hoặc  to + V1';
  } else if (v2 && cleanInput === v2) {
    detectedForm = 'V2 (Past Simple / Quá khứ đơn)';
    tenseDescription = 'Hình thái quá khứ đơn của động từ, dùng để mô tả một sự kiện đã kết thúc trong quá khứ.';
    matchClues = 'Thường xuất hiện trong các câu hỏi chứa trạng từ thời gian quá khứ rõ ràng như: yesterday, ago, last night, last year, in + năm quá khứ (ví dụ: in 2015), hoặc mệnh đề bắt đầu bằng "when I was...".';
    formula = 'Subject + V2';
  } else if (v3 && cleanInput === v3) {
    detectedForm = 'V3 (Past Participle / Phân từ hai)';
    tenseDescription = 'Hình thái phân từ hai của động từ, dùng trong các cấu trúc hoàn thành hoặc bị động.';
    matchClues = 'Xuất hiện trong câu hỏi có trợ động từ hoàn thành (have, has, had) để tạo thành thì hoàn thành (Hiện tại/Quá khứ hoàn thành), hoặc đứng sau động từ "to be" trong câu bị động (Passive Voice).';
    formula = 'have/has/had + V3  hoặc  be + V3 (Bị động)';
  } else if (isVing) {
    detectedForm = 'V-ing (Present Participle / Gerund)';
    tenseDescription = 'Hình thái thêm đuôi -ing để chỉ hành động tiếp diễn hoặc đóng vai trò danh động từ.';
    matchClues = 'Xuất hiện sau động từ "to be" (am, is, are, was, were) trong các thì tiếp diễn, hoặc làm tân ngữ sau giới từ và động từ chỉ cảm xúc/sở thích (enjoy, avoid, love, like, practice...).';
    formula = 'be + V-ing  hoặc  preposition/verb + V-ing';
  } else if (isVes) {
    detectedForm = 'V1 + -s/-es (Thì Hiện tại đơn chia theo ngôi thứ 3 số ít)';
    tenseDescription = 'Hình thái động từ thêm đuôi -s hoặc -es để chia cho chủ ngữ số ít ở hiện tại.';
    matchClues = 'Chỉ xuất hiện trong thì Hiện tại đơn khi chủ ngữ của câu hỏi là ngôi thứ ba số ít như: He, She, It, một người (John, Mary), hoặc một vật số ít.';
    formula = 'He/She/It + V-s/-es';
  } else if (cleanInput.startsWith('have ') || cleanInput.startsWith('has ') || cleanInput.startsWith('had ')) {
    detectedForm = 'Perfect Aspect (Dạng hoàn thành ghép)';
    tenseDescription = 'Dạng động từ ghép gồm trợ động từ hoàn thành + V3.';
    matchClues = 'Thường khớp với các câu hỏi về thì Hiện tại hoàn thành hoặc Quá khứ hoàn thành.';
    formula = 'have/has/had + V3';
  } else if (cleanInput.startsWith('am ') || cleanInput.startsWith('is ') || cleanInput.startsWith('are ') || cleanInput.startsWith('was ') || cleanInput.startsWith('were ')) {
    detectedForm = 'Continuous Aspect (Dạng tiếp diễn ghép)';
    tenseDescription = 'Dạng động từ ghép gồm động từ to be + V-ing.';
    matchClues = 'Thường khớp với các câu hỏi về thì Hiện tại tiếp diễn hoặc Quá khứ tiếp diễn.';
    formula = 'be + V-ing';
  } else {
    detectedForm = 'Hình thái tự do / Khác';
    tenseDescription = 'Không khớp chính xác với bất kỳ hình thái biến đổi độc lập nào (V1, V2, V3, V-ing, V-s/es) của động từ gốc.';
    matchClues = 'Vui lòng kiểm tra xem bạn có viết sai chính tả hoặc thêm các từ phụ trợ khác không.';
    formula = 'Chưa xác định';
  }

  return { detectedForm, tenseDescription, matchClues, formula };
}

function predictVerbFormFromClue(clue: string, verb: string = 'eat', commonVerbs: any[] = []) {
  const v = verb.trim().toLowerCase();
  const verbEntry = commonVerbs.find(x => x.verb.toLowerCase() === v);
  const v1 = v;
  const v2 = verbEntry ? verbEntry.v2.toLowerCase() : v + 'ed';
  const v3 = verbEntry ? verbEntry.v3.toLowerCase() : v + 'ed';
  const vIng = v.endsWith('e') ? v.slice(0, -1) + 'ing' : v.endsWith('y') ? v.slice(0, -1) + 'ying' : v + 'ing'; // simple fallback
  const vS = v.endsWith('y') ? v.slice(0, -1) + 'ies' : v.endsWith('o') || v.endsWith('ch') || v.endsWith('sh') || v.endsWith('x') || v.endsWith('s') ? v + 'es' : v + 's';

  let predictedForm = '';
  let predictedAnswer = '';
  let ruleName = '';
  let explanation = '';
  let sampleSentence = '';

  switch (clue) {
    case 'yesterday':
    case 'ago':
    case 'last_week':
    case 'in_past_year':
      predictedForm = 'V2 (Past Simple / Quá khứ đơn)';
      predictedAnswer = v2;
      ruleName = 'Thì Quá khứ đơn (Past Simple)';
      explanation = 'Trạng từ chỉ thời gian quá khứ xác định (yesterday, ago, last...) yêu cầu động từ chia ở dạng Quá khứ V2. Nếu là động từ bất quy tắc, sử dụng cột thứ 2. Nếu là động từ có quy tắc, thêm -ed.';
      sampleSentence = `I ${v2} dinner ${clue === 'in_past_year' ? 'in 2020' : clue === 'last_week' ? 'last week' : clue === 'ago' ? 'two days ago' : 'yesterday'}.`;
      break;
    case 'since':
    case 'for':
    case 'already':
    case 'yet':
    case 'so_far':
      predictedForm = 'Present Perfect (Hiện tại hoàn thành: have/has + V3)';
      predictedAnswer = `have/has ${v3}`;
      ruleName = 'Thì Hiện tại hoàn thành (Present Perfect)';
      explanation = 'Các từ chỉ mốc/khoảng thời gian kéo dài (since, for) hoặc hoàn thành hành động (already, yet, so far) báo hiệu thì Hiện tại hoàn thành. Ta dùng have/has + V3.';
      sampleSentence = `We have ${v3} this book ${clue === 'since' ? 'since yesterday' : clue === 'for' ? 'for a week' : 'already'}.`;
      break;
    case 'now':
    case 'at_the_moment':
    case 'look_listen':
      predictedForm = 'Present Continuous (Hiện tại tiếp diễn: am/is/are + V-ing)';
      predictedAnswer = `am/is/are ${vIng}`;
      ruleName = 'Thì Hiện tại tiếp diễn (Present Continuous)';
      explanation = 'Các cụm từ chỉ thời gian hiện tại tiếp diễn (now, at the moment) hoặc từ gây chú ý (Look!, Listen!) yêu cầu chia động từ ở thì tiếp diễn: am/is/are + V-ing.';
      sampleSentence = `Look! They are ${vIng} / She is ${vIng} right now.`;
      break;
    case 'tomorrow':
    case 'next_week':
      predictedForm = 'Future Simple (Tương lai đơn: will + V1)';
      predictedAnswer = `will ${v1}`;
      ruleName = 'Thì Tương lai đơn (Future Simple)';
      explanation = 'Trạng từ chỉ tương lai (tomorrow, next...) báo hiệu thì Tương lai đơn. Cấu trúc chia là trợ động từ will + động từ nguyên mẫu (V1).';
      sampleSentence = `I will ${v1} it ${clue === 'tomorrow' ? 'tomorrow' : 'next week'}.`;
      break;
    case 'always':
    case 'usually':
    case 'everyday':
      predictedForm = 'Present Simple (Hiện tại đơn: V1 hoặc V1 + -s/-es)';
      predictedAnswer = `Chủ ngữ số nhiều: ${v1} | Chủ ngữ số ít: ${vS}`;
      ruleName = 'Thì Hiện tại đơn (Present Simple)';
      explanation = 'Trạng từ tần suất chỉ thói quen, chu kỳ (always, usually, everyday) báo hiệu thì Hiện tại đơn. Chia V1 với chủ ngữ số nhiều (I, you, we, they) và V-s/es với chủ ngữ số ít (he, she, it).';
      sampleSentence = `He always ${vS} early, but they usually ${v1} late.`;
      break;
    case 'by_the_time':
      predictedForm = 'Past Perfect (Quá khứ hoàn thành: had + V3)';
      predictedAnswer = `had ${v3}`;
      ruleName = 'Thì Quá khứ hoàn thành (Past Perfect)';
      explanation = 'Cấu trúc "By the time + Past Simple" chỉ một hành động đã hoàn tất trước một mốc thời gian quá khứ khác, yêu cầu động từ chính chia ở thì Quá khứ hoàn thành: had + V3.';
      sampleSentence = `By the time they arrived, we had already ${v3}.`;
      break;
    case 'while':
      predictedForm = 'Past Continuous (Quá khứ tiếp diễn: was/were + V-ing)';
      predictedAnswer = `was/were ${vIng}`;
      ruleName = 'Thì Quá khứ tiếp diễn (Past Continuous)';
      explanation = 'Trạng từ "while" thường diễn tả một hành động đang diễn ra kéo dài trong quá khứ làm nền cho hành động khác. Ta chia: was/were + V-ing.';
      sampleSentence = `While she was ${vIng}, it started to rain.`;
      break;
    case 'modal_verbs':
      predictedForm = 'Bare Infinitive (Nguyên mẫu không "to": V1)';
      predictedAnswer = v1;
      ruleName = 'Động từ nguyên mẫu sau Động từ khuyết thiếu (Modal Verbs)';
      explanation = 'Sau các động từ khuyết thiếu như should, can, must, could, will, would, may, might..., động từ luôn giữ ở dạng nguyên mẫu không chia (V1).';
      sampleSentence = `You should ${v1} some water now.`;
      break;
    case 'to_infinitive_verbs':
      predictedForm = 'To-Infinitive (Động từ nguyên mẫu có "to": to + V1)';
      predictedAnswer = `to ${v1}`;
      ruleName = 'Động từ nguyên mẫu có "to" (To-Infinitive)';
      explanation = 'Sau một số động từ chỉ ý định, ước muốn như decide, want, hope, plan, refuse, agree, manage..., động từ đi kèm sau đó phải ở dạng to-Infinitive.';
      sampleSentence = `They decided to ${v1} out tonight.`;
      break;
    case 'gerund_verbs':
      predictedForm = 'Gerund (Danh động từ: V-ing)';
      predictedAnswer = vIng;
      ruleName = 'Danh động từ (Gerund - V-ing) sau động từ chỉ định';
      explanation = 'Sau các động từ chỉ sở thích/ghét hoặc tránh né như enjoy, avoid, dislike, finish, mind, practice..., động từ đi kèm sau đó phải ở dạng V-ing.';
      sampleSentence = `She enjoys ${vIng} here.`;
      break;
    default:
      predictedForm = 'Không xác định';
      predictedAnswer = v1;
      ruleName = 'Chưa xác định quy tắc';
      explanation = 'Hãy cung cấp một trạng từ hoặc dấu hiệu thời gian hợp lệ.';
      sampleSentence = '';
  }

  return { predictedForm, predictedAnswer, ruleName, explanation, sampleSentence };
}

interface GrammarData {
  COMMON_VERBS: { verb: string; type: string; v2: string; v3: string; ipa: string; vi: string; example: string }[];
  VERB_TYPES: { type: string; desc: string; examples: string[]; vi: string }[];
  COMMON_ADJECTIVES: { word: string; comparative: string; superlative: string; rule: string; vi: string }[];
  ADJECTIVE_RULES: { rule: string; desc: string; formula: string; examples: string[]; exVi: string; note?: string }[];
  ADJECTIVE_TYPES: { type: string; name: string; desc: string; examples: string[]; vi: string }[];
  POSSESSIVE_TABLE: {
    pronoun: string;
    subject: string;
    object: string;
    possAdj: string;
    possPron: string;
    reflexive: string;
    vi: string;
    exAdj: string;
    exAdjVi: string;
    exPron: string;
    exPronVi: string;
  }[];
  POSSESSIVE_RULES: { rule: string; desc: string; formula: string; examples: string[]; exVi: string }[];
  ADJECTIVES_USE_CASES: {
    peopleOnly: { word: string; ipa: string; vi: string; ex: string; exVi: string }[];
    thingsOnly: { word: string; ipa: string; vi: string; ex: string; exVi: string }[];
    edVsIng: {
      ed: string;
      edVi: string;
      exEd: string;
      exEdVi: string;
      ing: string;
      ingVi: string;
      exIng: string;
      exIngVi: string;
    }[];
  };
  ADJECTIVES_BODY_PARTS: { category: string; desc: string; items: { word: string; ipa: string; vi: string; note: string; ex: string; exVi: string }[] }[];
  FOUNDATION_TOPICS: {
    id: string;
    title: string;
    desc: string;
    icon: string;
    content: {
      theory: string;
      table?: { pronoun: string; role: string; meaning: string; example: string }[];
      forms?: { tense: string; rules: string; example: string }[];
      tenses?: { name: string; formula: string; usage: string; example: string }[];
      quiz?: { question: string; options: string[]; answer: string; explanation: string }[];
    };
  }[];
  MINIMAL_PAIRS: {
    focus: string;
    type: string;
    a: { word: string; ipa: string; vi: string };
    b: { word: string; ipa: string; vi: string };
  }[];
  ACTION_VERBS: { word: string; ipa: string; vi: string; ex: string; exVi: string }[];
  THINKING_VERBS: { word: string; ipa: string; vi: string; ex: string; exVi: string; note: string }[];
  CONJUGATION_RULES: {
    title: string;
    rules: { cond: string; rule: string; ex: string }[];
  }[];
  CONJUGATION_MODELS: {
    regular: { verb: string; vi: string; tenses: { tense: string; i: string; he: string }[] };
    irregular: { verb: string; vi: string; tenses: { tense: string; i: string; he: string }[] };
    thinking: { verb: string; vi: string; tenses: { tense: string; i?: string; he?: string; note?: string }[] };
  };
  VERB_QUIZ_QUESTIONS: { question: string; options: string[]; answer: string; explanation: string }[];
  STATIVE_CATEGORIES: { title: string; description: string; verbs: { word: string; ipa: string; vi: string; ex: string }[] }[];
  DUAL_NATURE_VERBS: { verb: string; ipa: string; stativeUsage: string; stativeVi: string; dynamicUsage: string; dynamicVi: string }[];
  VERB_FILL_IN_QUESTIONS: { sentence: string; verb: string; expectedForm: string; clue: string; correctAnswers: string[] }[];
}

export default function PronunciationPage() {
  const [grammarData, setGrammarData] = useState<GrammarData | null>(null);

  useEffect(() => {
    import('./grammarData').then((mod) => {
      setGrammarData(mod as unknown as GrammarData);
    });
  }, []);

  const {
    COMMON_VERBS = [],
    VERB_TYPES = [],
    COMMON_ADJECTIVES = [],
    ADJECTIVE_RULES = [],
    ADJECTIVE_TYPES = [],
    POSSESSIVE_TABLE = [],
    POSSESSIVE_RULES = [],
    ADJECTIVES_USE_CASES = {} as GrammarData['ADJECTIVES_USE_CASES'],
    ADJECTIVES_BODY_PARTS = [],
    FOUNDATION_TOPICS = [],
    MINIMAL_PAIRS = [],
    ACTION_VERBS = [],
    THINKING_VERBS = [],
    CONJUGATION_RULES = [],
    CONJUGATION_MODELS = {} as GrammarData['CONJUGATION_MODELS'],
    VERB_QUIZ_QUESTIONS = [],
    STATIVE_CATEGORIES = [],
    DUAL_NATURE_VERBS = [],
    VERB_FILL_IN_QUESTIONS = []
  } = grammarData || {};
  const [activeTab, setActiveTab] = useState<'alphabet' | 'chart' | 'stress' | 'pairs' | 'building' | 'numbers' | 'endings' | 'datetime' | 'countries' | 'topics' | 'nouns' | 'verbs' | 'adjectives' | 'possessives' | 'tenses' | 'intonation'>('alphabet');
  const [intonationSection, setIntonationSection] = useState<'questions' | 'intonation' | 'sentence_stress'>('questions');
  const [selectedStressWordIdx, setSelectedStressWordIdx] = useState<number | null>(null);
  const [foundationTopicId, setFoundationTopicId] = useState<string>('pronouns');
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState<any[]>([]);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [verbFilter, setVerbFilter] = useState<'all' | 'regular' | 'irregular'>('all');
  const [verbSearchQuery, setVerbSearchQuery] = useState<string>('');
  const [verbSection, setVerbSection] = useState<'list' | 'types' | 'playground' | 'conjugation' | 'practice'>('list');
  const [playgroundVerb, setPlaygroundVerb] = useState<string>('work');
  const [playgroundSubject, setPlaygroundSubject] = useState<string>('I');
  const [playgroundTense, setPlaygroundTense] = useState<string>('Present Simple');
  const [verbQuizIndex, setVerbQuizIndex] = useState(0);
  const [verbSelectedAnswer, setVerbSelectedAnswer] = useState<string | null>(null);
  const [verbQuizScore, setVerbQuizScore] = useState(0);
  const [verbQuizFinished, setVerbQuizFinished] = useState(false);
  const [verbQuizList, setVerbQuizList] = useState<any[]>([]);

  // Verb sub-modes and additional interactive states
  const [practiceMode, setPracticeMode] = useState<'quiz' | 'fill-in' | 'analyzer' | 'predictor'>('quiz');
  
  // Fill-in states
  const [fillInIndex, setFillInIndex] = useState(0);
  const [fillInUserAnswer, setFillInUserAnswer] = useState('');
  const [fillInFeedback, setFillInFeedback] = useState<{ isCorrect: boolean; detectedForm: string; clueUsed: string; msg: string } | null>(null);
  const [fillInScore, setFillInScore] = useState(0);
  const [fillInList, setFillInList] = useState<any[]>([]);
  const [fillInFinished, setFillInFinished] = useState(false);

  // Analyzer states
  const [analyzerUserAnswer, setAnalyzerUserAnswer] = useState('');
  const [analyzerTargetVerb, setAnalyzerTargetVerb] = useState('go');

  // Predictor states
  const [predictorClue, setPredictorClue] = useState('yesterday');
  const [predictorVerb, setPredictorVerb] = useState('eat');

  useEffect(() => {
    if (activeTab === 'verbs' && verbSection === 'practice' && VERB_QUIZ_QUESTIONS.length > 0) {
      const shuffled = [...VERB_QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
      setVerbQuizList(shuffled.slice(0, 10));
      setVerbQuizIndex(0);
      setVerbSelectedAnswer(null);
      setVerbQuizScore(0);
      setVerbQuizFinished(false);

      const shuffledFillIn = [...VERB_FILL_IN_QUESTIONS].sort(() => Math.random() - 0.5);
      setFillInList(shuffledFillIn.slice(0, 10));
      setFillInIndex(0);
      setFillInUserAnswer('');
      setFillInFeedback(null);
      setFillInScore(0);
      setFillInFinished(false);
    }
  }, [activeTab, verbSection, VERB_QUIZ_QUESTIONS, VERB_FILL_IN_QUESTIONS]);
  const [adjSection, setAdjSection] = useState<'list' | 'rules' | 'types' | 'cases' | 'body'>('list');
  const [possSection, setPossSection] = useState<'table' | 'rules'>('table');
  const [selectedTopic, setSelectedTopic] = useState<string>('greetings');
  const [chartSection, setChartSection] = useState<'vowels' | 'diphthongs' | 'consonants'>('vowels');
  const [numSection, setNumSection] = useState<'basic' | 'big' | 'combo' | 'ordinals'>('basic');
  const [nounSection, setNounSection] = useState<'rules' | 'irregular' | 'uncountable' | 'articles'>('rules');
  const [uncountableCategory, setUncountableCategory] = useState<string>('all');
  const [selectedSound, setSelectedSound] = useState<any>(null);

  // New Datetime & Countries states
  const [datetimeSection, setDatetimeSection] = useState<'days' | 'relative' | 'months' | 'years'>('days');
  const [countrySearch, setCountrySearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  // Minimal Pairs Filter States
  const [pairTypeFilter, setPairTypeFilter] = useState<'all' | 'vowel' | 'consonant'>('all');
  const [selectedFocusFilter, setSelectedFocusFilter] = useState<string>('all');

  // AI Stress Analyzer States
  const [stressInput, setStressInput] = useState('');
  const [stressResult, setStressResult] = useState<any>(null);
  const [analyzingStress, setAnalyzingStress] = useState(false);
  const [stressError, setStressError] = useState('');

  const handleAnalyzeStress = async (wordToAnalyze?: string, bypassCache = false) => {
    const targetWord = wordToAnalyze || stressInput;
    if (!targetWord || targetWord.trim().length === 0) return;

    setAnalyzingStress(true);
    setStressError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/ai/analyze-stress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: targetWord.trim(), bypassCache })
      });
      if (!res.ok) throw new Error('Không thể phân tích trọng âm');
      const data = await res.json();
      setStressResult(data);
      if (wordToAnalyze) {
        setStressInput(wordToAnalyze);
      }
    } catch (err: any) {
      console.error(err);
      setStressError(err.message || 'Có lỗi xảy ra khi phân tích.');
    } finally {
      setAnalyzingStress(false);
    }
  };

  // Pre-load default word when entering stress tab
  useEffect(() => {
    if (activeTab === 'stress' && !stressResult) {
      handleAnalyzeStress('communication');
    }
  }, [activeTab]);

  // Initialize selectedSound when section changes
  useEffect(() => {
    if (chartSection === 'vowels') {
      setSelectedSound(VOWELS[0]);
    } else if (chartSection === 'diphthongs') {
      setSelectedSound(DIPHTHONGS[0]);
    } else if (chartSection === 'consonants') {
      setSelectedSound(CONSONANTS[0]);
    }
  }, [chartSection]);

  // Generate randomized shuffled quiz questions subset
  const generateQuiz = () => {
    const topic = FOUNDATION_TOPICS.find(t => t.id === foundationTopicId) || FOUNDATION_TOPICS[0];
    if (topic && topic.content.quiz) {
      const shuffled = [...topic.content.quiz].sort(() => Math.random() - 0.5);
      setCurrentQuizQuestions(shuffled.slice(0, 5));
    }
    setQuizIndex(0);
    setSelectedAnswer(null);
    setQuizFinished(false);
    setScore(0);
  };

  useEffect(() => {
    if (activeTab === 'tenses' && FOUNDATION_TOPICS.length > 0) {
      generateQuiz();
    }
  }, [foundationTopicId, activeTab, FOUNDATION_TOPICS]);

  const tabs = [
    { id: 'alphabet' as const, label: 'Bảng Chữ Cái & Phonics', icon: BookOpen },
    { id: 'chart' as const, label: 'Bảng Phiên Âm IPA', icon: Volume2 },
    { id: 'topics' as const, label: 'Chủ Đề Giao Tiếp', icon: MessageSquare },
    { id: 'numbers' as const, label: 'Số & Cách Đọc Số', icon: Hash },
    { id: 'datetime' as const, label: 'Thứ, Tháng, Năm', icon: Calendar },
    { id: 'countries' as const, label: 'Các Nước & Quốc Tịch', icon: Globe },
    { id: 'stress' as const, label: 'Quy Tắc Trọng Âm', icon: Target },
    { id: 'endings' as const, label: 'Đuôi -ed, -s/-es', icon: FileText },
    { id: 'nouns' as const, label: 'Danh Từ & Số Nhiều', icon: Star },
    { id: 'verbs' as const, label: 'Động Từ', icon: Zap },
    { id: 'adjectives' as const, label: 'Tính Từ', icon: Palette },
    { id: 'possessives' as const, label: 'Đại Từ & Sở Hữu', icon: Users },
    { id: 'tenses' as const, label: 'Thì & Động Từ To Be', icon: Clock },
    { id: 'intonation' as const, label: 'Ngữ Điệu & Câu Hỏi', icon: HelpCircle },
    { id: 'pairs' as const, label: 'Cặp Tối Thiểu', icon: Mic },
    { id: 'building' as const, label: 'Nối Câu & Chữ', icon: Sparkles },
  ];

  
  if (!grammarData) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mb-4" />
        <p className="text-sm font-medium text-slate-400 font-sans">Đang tải dữ liệu học tập...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-black flex items-center gap-3">
          <Volume2 className="w-8 h-8 text-primary" />Pronunciation Lab
        </h1>
        <p className="text-slate-500 font-medium">
          Học bảng chữ cái, phát âm chuẩn IPA, quy tắc trọng âm và các quy tắc nối chữ thành từ, nối từ thành câu.
        </p>
      </header>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer",
              activeTab === tab.id
                ? "bg-slate-900 text-white shadow-lg"
                : "bg-white text-slate-500 border border-slate-200 hover:border-primary"
            )}
          >
            <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ════════════════════════════════════════════ ALPHABET & PHONICS ═══════════ */}
      {activeTab === 'alphabet' && (
        <div className="space-y-6">
          <div className="premium-card p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <h3 className="text-lg font-black text-blue-800 flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-blue-600" /> Bảng Chữ Cái Tiếng Anh & Phonics
            </h3>
            <p className="text-sm text-blue-700 leading-relaxed font-medium">
              Bảng chữ cái tiếng Anh gồm 26 chữ cái. Mỗi chữ cái có một **Tên gọi (Name)** và một hoặc nhiều **Âm phát âm (Phonics)** khi ghép vào từ. Nhấp vào mỗi thẻ để nghe cách đọc tên chữ cái và cách phát âm Phonics của nó.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {ALPHABET.map((item) => (
              <div
                key={item.letter}
                className="premium-card bg-white p-5 border border-slate-200 rounded-[2rem] flex flex-col items-center justify-between text-center relative overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <span className="text-4xl font-black text-slate-800 mb-2">{item.letter}</span>

                <div className="space-y-2 w-full">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider font-sans">Tên chữ cái</span>
                    <button
                      onClick={() => speak(item.letter, 0.6)}
                      className="px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-700 font-black text-xs hover:bg-blue-100 transition-all flex items-center gap-1 mx-auto cursor-pointer"
                    >
                      /{item.name}/ <Play className="w-2.5 h-2.5 fill-blue-700 text-blue-700" />
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-2">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider font-sans">Âm vị (Phonics)</span>
                    <button
                      onClick={() => speak(item.example, 0.6)}
                      className="px-2 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 font-bold text-[10px] hover:bg-emerald-100 transition-all flex items-center gap-1 mx-auto cursor-pointer"
                    >
                      {item.phonicIpa} {item.example} <Play className="w-2.5 h-2.5 fill-emerald-700 text-emerald-700" />
                    </button>
                    <span className="text-[10px] text-slate-500 block mt-1 font-medium italic">{item.exampleVi}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════ IPA CHART ═══════════════════ */}
      {activeTab === 'chart' && (
        <div className="space-y-6">
          {/* Sub-tabs */}
          <div className="flex gap-2">
            {[
              { id: 'vowels' as const, label: 'Nguyên Âm (12)', count: VOWELS.length },
              { id: 'diphthongs' as const, label: 'Nguyên Âm Đôi (8)', count: DIPHTHONGS.length },
              { id: 'consonants' as const, label: 'Phụ Âm (24)', count: CONSONANTS.length },
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setChartSection(s.id)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer",
                  chartSection === s.id
                    ? "bg-primary text-white shadow-md"
                    : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Info Banner */}
          <div className="premium-card p-4 bg-blue-50 border-blue-100 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700 font-medium">
              Nhấn vào mỗi ô để xem hướng dẫn khẩu hình miệng chi tiết và nghe phát âm. Mỗi ký hiệu IPA đại diện cho một âm duy nhất.
            </p>
          </div>

          {/* Grid */}
          {chartSection === 'vowels' && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {VOWELS.map(v => (
                <IPACell
                  key={v.ipa}
                  item={v}
                  color="border-sky-200 bg-sky-50/50 hover:border-sky-400"
                  isActive={selectedSound?.ipa === v.ipa}
                  onClick={() => setSelectedSound(v)}
                />
              ))}
            </div>
          )}
          {chartSection === 'diphthongs' && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {DIPHTHONGS.map(d => (
                <IPACell
                  key={d.ipa}
                  item={d}
                  color="border-violet-200 bg-violet-50/50 hover:border-violet-400"
                  isActive={selectedSound?.ipa === d.ipa}
                  onClick={() => setSelectedSound(d)}
                />
              ))}
            </div>
          )}
          {chartSection === 'consonants' && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {CONSONANTS.map(c => (
                <IPACell
                  key={c.ipa}
                  item={c}
                  color="border-emerald-200 bg-emerald-50/50 hover:border-emerald-400"
                  isActive={selectedSound?.ipa === c.ipa}
                  onClick={() => setSelectedSound(c)}
                />
              ))}
            </div>
          )}

          {/* Selected Sound Detail Panel */}
          {selectedSound && (
            <div className="premium-card p-6 bg-gradient-to-br from-slate-900 to-slate-950 text-white border-slate-800 shadow-xl rounded-3xl mt-6 animate-in slide-in-from-bottom-3 duration-300">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

                {/* Left Visual Area: Large IPA Circle & Hear Buttons */}
                <div className="flex flex-col items-center gap-3 w-full sm:w-56 flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center border-4 border-slate-800 shadow-2xl relative">
                    <span className="text-4xl font-black font-mono text-white">/{selectedSound.ipa}/</span>
                    <span className="absolute -bottom-2.5 px-3 py-0.5 bg-slate-800 rounded-full border border-slate-700 text-[8px] font-black tracking-widest text-primary uppercase">
                      {chartSection === 'vowels' ? 'Vowel' : chartSection === 'diphthongs' ? 'Diphthong' : 'Consonant'}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 w-full mt-3">
                    <button
                      onClick={() => speak(selectedSound.tts, 0.55)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary/95 text-white font-black text-xs uppercase tracking-wider rounded-xl active:scale-95 transition-all cursor-pointer shadow-md shadow-primary/20"
                    >
                      <Volume2 className="w-4 h-4 fill-white" /> Nghe âm riêng lẻ
                    </button>

                    <button
                      onClick={() => speak(selectedSound.example, 0.7)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-slate-200" /> Nghe từ: "{selectedSound.example}"
                    </button>
                  </div>
                </div>

                {/* Right Content Area: Explanation & Practice */}
                <div className="flex-1 space-y-4 text-left w-full">
                  <div>
                    <h3 className="text-lg font-black text-slate-100 flex items-center gap-2">
                      Hướng dẫn Phát âm âm <span className="text-primary">/{selectedSound.ipa}/</span>
                    </h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                      Phân loại: {selectedSound.desc}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-800/40 border border-slate-800/80 rounded-2xl">
                    <h4 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-primary" /> Hướng dẫn khẩu hình miệng:
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed font-medium">
                      {selectedSound.guide}
                    </p>
                  </div>

                  {/* Word Context / Example */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-800/30 border border-slate-800/60 rounded-xl">
                      <span className="text-[9px] font-bold text-slate-500 uppercase block">Từ ví dụ</span>
                      <span className="text-base font-black text-slate-200">{selectedSound.example}</span>
                    </div>
                    <div className="p-3 bg-slate-800/30 border border-slate-800/60 rounded-xl">
                      <span className="text-[9px] font-bold text-slate-500 uppercase block">Phiên âm của từ</span>
                      <span className="text-base font-black text-slate-200 font-mono">{selectedSound.word}</span>
                    </div>
                  </div>

                  {/* Gamified AI Speech Practice (Microphone) */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <SpeechPracticeSection targetWord={selectedSound.example} />
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Legend */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="premium-card p-5 border-l-4 border-sky-400">
              <h4 className="font-black text-sm text-sky-700 mb-1">Nguyên Âm (Vowels)</h4>
              <p className="text-xs text-slate-500 font-medium">Âm phát ra khi luồng khí không bị chặn. Có 12 nguyên âm đơn trong tiếng Anh.</p>
            </div>
            <div className="premium-card p-5 border-l-4 border-violet-400">
              <h4 className="font-black text-sm text-violet-700 mb-1">Nguyên Âm Đôi (Diphthongs)</h4>
              <p className="text-xs text-slate-500 font-medium">Sự kết hợp của 2 nguyên âm trượt vào nhau. Có 8 nguyên âm đôi.</p>
            </div>
            <div className="premium-card p-5 border-l-4 border-emerald-400">
              <h4 className="font-black text-sm text-emerald-700 mb-1">Phụ Âm (Consonants)</h4>
              <p className="text-xs text-slate-500 font-medium">Âm phát ra khi luồng khí bị chặn hoàn toàn hoặc một phần. Có 24 phụ âm.</p>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════ STRESS RULES ════════════════ */}
      {activeTab === 'stress' && (
        <div className="space-y-6">
          <div className="premium-card p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <h3 className="text-lg font-black text-amber-800 flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 fill-amber-500 text-amber-500" /> Trọng âm là gì?
            </h3>
            <p className="text-sm text-amber-700 leading-relaxed font-medium">
              Trọng âm (word stress) là việc nhấn mạnh một âm tiết trong từ. Âm tiết được nhấn sẽ phát ra to hơn, dài hơn và cao hơn.
              Sai trọng âm có thể khiến người nghe không hiểu bạn, dù bạn phát âm đúng từng âm.
            </p>
          </div>

          {/* AI Stress Analyzer Widget */}
          <div className="premium-card p-6 bg-slate-900 text-white border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Target className="w-32 h-32 text-slate-700" />
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-100 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 fill-primary text-primary" /> Phân Tích Trọng Âm AI
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">Nhập từ tiếng Anh để phân tích số âm tiết và trọng âm chính/phụ.</p>
                </div>
              </div>

              {/* Input Form */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    value={stressInput}
                    onChange={(e) => setStressInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAnalyzeStress()}
                    placeholder="Nhập từ cần phân tích... (ví dụ: photography)"
                    className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:outline-none placeholder-slate-500 text-white"
                  />
                </div>
                <button
                  onClick={() => handleAnalyzeStress()}
                  disabled={analyzingStress || !stressInput.trim()}
                  className="px-6 py-3 bg-primary hover:bg-primary/95 disabled:bg-slate-800 disabled:text-slate-500 text-white font-black text-sm uppercase tracking-wider rounded-xl active:scale-95 transition-all cursor-pointer shadow-md shadow-primary/20 flex items-center justify-center gap-2"
                >
                  {analyzingStress ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> ĐANG PHÂN TÍCH...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 fill-white" /> PHÂN TÍCH
                    </>
                  )}
                </button>
              </div>

              {stressError && (
                <p className="text-sm text-rose-400 font-medium">⚠️ {stressError}</p>
              )}

              {/* Analyzer Results */}
              {stressResult && (
                <div className="space-y-6 pt-4 border-t border-slate-800/80 animate-in fade-in duration-500">
                  {/* Syllables Visualization */}
                  <div className="space-y-2 text-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Phân tách âm tiết & Trọng âm</span>
                    <div className="flex flex-wrap items-center justify-center gap-4 py-6">
                      {stressResult.syllables.map((syl: string, idx: number) => {
                        const isPrimary = idx === stressResult.stressedSyllableIndex;
                        const isSecondary = idx === stressResult.secondaryStressedSyllableIndex;
                        return (
                          <div key={idx} className="flex flex-col items-center gap-1.5">
                            {/* Accent indicator label */}
                            {isPrimary && (
                              <span className="text-[8px] font-black text-amber-400 uppercase tracking-widest bg-amber-500/10 px-1.5 py-0.5 rounded">
                                Trọng âm chính
                              </span>
                            )}
                            {isSecondary && (
                              <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest bg-purple-500/10 px-1.5 py-0.5 rounded">
                                Trọng âm phụ
                              </span>
                            )}
                            {!isPrimary && !isSecondary && <span className="h-[17px] w-1" />}

                            <button
                              onClick={() => speak(syl)}
                              className={cn(
                                "h-16 px-6 rounded-2xl flex items-center justify-center font-black text-lg transition-all duration-300 relative group cursor-pointer border-2",
                                isPrimary
                                  ? "bg-gradient-to-br from-amber-400 to-orange-500 border-amber-300 text-white shadow-lg shadow-orange-500/20 scale-110 ring-4 ring-orange-500/20"
                                  : isSecondary
                                    ? "bg-gradient-to-br from-purple-500 to-indigo-600 border-purple-400 text-white shadow-md shadow-purple-500/10 scale-105"
                                    : "bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-300"
                              )}
                            >
                              {/* Primary Stress Marker */}
                              {isPrimary && <span className="absolute -left-2 text-2xl text-amber-300 font-mono">ˈ</span>}
                              {/* Secondary Stress Marker */}
                              {isSecondary && <span className="absolute -left-2 text-xl text-purple-300 font-mono">ˌ</span>}

                              <span>{syl}</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Monospace Phonetics + Audio Button + Re-analyze Button */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pb-2">
                    <button
                      onClick={() => speak(stressResult.word, 0.7)}
                      className="px-6 py-3 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-2xl flex items-center gap-3 group active:scale-95 transition-all cursor-pointer w-full sm:w-auto justify-center"
                    >
                      <Volume2 className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                      <span className="font-mono font-black text-base text-slate-200">{stressResult.phonetic}</span>
                      <Play className="w-3.5 h-3.5 fill-slate-400 text-slate-400 group-hover:text-white" />
                    </button>

                    <button
                      onClick={() => handleAnalyzeStress(stressResult.word, true)}
                      disabled={analyzingStress}
                      className="px-4 py-3 bg-slate-800 hover:bg-slate-750 hover:text-amber-400 border border-slate-700/80 rounded-2xl flex items-center gap-2 group active:scale-95 transition-all cursor-pointer text-slate-400 text-xs font-black uppercase tracking-wider w-full sm:w-auto justify-center transition-colors"
                      title="Nếu AI phân tích trọng âm sai, bấm vào đây để yêu cầu AI phân tích lại và lưu đè lên hệ thống"
                    >
                      <Sparkles className="w-4.5 h-4.5 text-amber-400/80 group-hover:scale-110 transition-transform" />
                      <span>{analyzingStress ? 'Đang phân tích lại...' : 'AI Phân tích lại (Sửa lỗi)'}</span>
                    </button>
                  </div>

                  {/* Side-by-side Explanations (Fluid layout) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-xl space-y-1.5 text-left">
                      <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Target className="w-4 h-4 text-amber-400" /> Quy tắc trọng âm:
                      </h4>
                      <p className="text-sm text-slate-300 font-medium leading-relaxed">
                        {stressResult.ruleExplanation}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-xl space-y-1.5 text-left">
                      <h4 className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-1.5">
                        <Info className="w-4 h-4" /> Hướng dẫn nhấn giọng:
                      </h4>
                      <p className="text-sm text-slate-300 font-medium leading-relaxed">
                        {stressResult.pronunciationGuide}
                      </p>
                    </div>
                  </div>

                  {/* Sibling similar words */}
                  {stressResult.similarWords && stressResult.similarWords.length > 0 && (
                    <div className="pt-2 border-t border-slate-800/80">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 text-left">Từ có trọng âm tương tự:</span>
                      <div className="flex flex-wrap gap-2.5">
                        {stressResult.similarWords.map((sim: any, idx: number) => (
                          <button
                            key={idx}
                            onClick={() => handleAnalyzeStress(sim.word)}
                            className="px-4 py-2 bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-slate-500 rounded-xl text-xs font-medium text-slate-300 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
                          >
                            <span className="font-bold">{sim.word}</span>
                            <span className="font-mono text-slate-500 text-[10px]">{sim.phonetic}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {STRESS_RULES.map((rule, i) => (
              <div key={i} className="premium-card p-6 hover:shadow-xl transition-all">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-black">{i + 1}</span>
                      <h4 className="font-black text-slate-800">{rule.rule}</h4>
                    </div>
                    <p className="text-sm text-primary font-bold ml-10">→ {rule.pattern}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 ml-10">
                  {rule.examples.map((ex, j) => (
                    <button
                      key={j}
                      onClick={() => speak(ex.replace(/[ˈˌ.]/g, ''))}
                      className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-bold hover:border-primary hover:bg-primary/5 transition-all flex items-center gap-2 group text-slate-700 cursor-pointer"
                    >
                      {ex}
                      <Play className="w-3 h-3 text-slate-300 group-hover:text-primary fill-slate-300 group-hover:fill-primary" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════ INTONATION & QUESTIONS ═══════ */}
      {activeTab === 'intonation' && (
        <div className="space-y-6">
          {/* Sub-navigation Segment control */}
          <div className="flex flex-wrap gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit">
            {[
              { id: 'questions' as const, label: 'Cách Đặt Câu Hỏi (Questions)', icon: HelpCircle },
              { id: 'intonation' as const, label: 'Ngữ Điệu Nói (Intonation)', icon: Volume2 },
              { id: 'sentence_stress' as const, label: 'Trọng Âm Câu (Sentence Stress)', icon: Target }
            ].map(sec => (
              <button
                key={sec.id}
                onClick={() => setIntonationSection(sec.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer",
                  intonationSection === sec.id
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-850"
                )}
              >
                <sec.icon className="w-4 h-4" />
                {sec.label}
              </button>
            ))}
          </div>

          {/* Render sub-section contents */}
          {intonationSection === 'questions' && (
            <div className="space-y-6">
              <div className="premium-card p-6 bg-gradient-to-r from-violet-50 to-indigo-50 border-violet-200">
                <h3 className="text-lg font-black text-violet-800 flex items-center gap-2 mb-2">
                  <HelpCircle className="w-5 h-5 text-violet-600" /> Cách Đặt Câu Hỏi trong Tiếng Anh (English Question Formulation)
                </h3>
                <p className="text-sm text-violet-700 leading-relaxed font-medium">
                  Tiếng Anh có nhiều dạng câu hỏi với các cấu trúc ngữ pháp và cách lên/xuống giọng khác nhau. Hãy nắm vững cấu trúc và cách đọc dưới đây.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {QUESTION_TYPES_DATA.map((item, idx) => (
                  <div key={idx} className="premium-card p-6 bg-white border border-slate-200 hover:shadow-xl transition-all rounded-[2rem] flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-violet-600 bg-violet-50 px-3 py-1 rounded-full border border-violet-100">
                        {item.type}
                      </span>
                      <h4 className="text-base font-black text-slate-800">{item.title}</h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>

                    <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Cấu trúc / Công thức</span>
                      <code className="text-xs font-mono font-black text-violet-700 block break-words">{item.formula}</code>
                    </div>

                    <div className="p-3.5 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Ngữ điệu (Intonation)</span>
                      <p className="text-xs text-indigo-800 font-semibold">{item.intonation}</p>
                    </div>

                    <div className="space-y-2.5">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Ví dụ & Phát âm:</span>
                      <div className="space-y-2">
                        {item.examples.map((ex, exIdx) => (
                          <div key={exIdx} className="flex items-center justify-between gap-3 p-3 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 rounded-2xl transition-all">
                            <div className="min-w-0 flex-1">
                              <span className="font-bold text-sm text-slate-800 block select-all">"{ex.text}"</span>
                              <span className="text-xs font-mono text-slate-500 block mt-0.5">{ex.ipa}</span>
                              <span className="text-xs text-slate-500 font-medium italic block mt-0.5">{ex.vi}</span>
                            </div>
                            <button
                              onClick={() => speak(ex.text, 0.75)}
                              className="w-9 h-9 rounded-full bg-white hover:bg-violet-600 hover:text-white border border-slate-200 hover:border-violet-600 flex items-center justify-center text-slate-600 transition-all cursor-pointer shadow-sm active:scale-95 flex-shrink-0"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {intonationSection === 'intonation' && (
            <div className="space-y-6">
              <div className="premium-card p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
                <h3 className="text-lg font-black text-emerald-800 flex items-center gap-2 mb-2">
                  <Volume2 className="w-5 h-5 text-emerald-600" /> Ngữ Điệu Nói Tiếng Anh (English Intonation Patterns)
                </h3>
                <p className="text-sm text-emerald-700 leading-relaxed font-medium">
                  Ngữ điệu giống như "âm nhạc" của ngôn ngữ. Lên giọng (Rising) và xuống giọng (Falling) giúp biểu lộ cảm xúc, thái độ và làm rõ nghĩa của câu nói.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {INTONATION_GUIDELINES.map((guide, idx) => (
                  <div key={idx} className="premium-card p-6 bg-white border border-slate-200 hover:shadow-xl transition-all rounded-[2rem] flex flex-col justify-between space-y-4">
                    <div className="space-y-2 text-left">
                      <h4 className="text-base font-black text-slate-800 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        {guide.pattern}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{guide.desc}</p>
                    </div>

                    <div className="space-y-3 pt-2 border-t border-slate-100 flex-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Trường hợp sử dụng:</span>
                      <div className="space-y-3">
                        {guide.rules.map((rule, ruleIdx) => (
                          <div key={ruleIdx} className="space-y-1">
                            <span className="text-xs font-black text-slate-700 block">{rule.rule}</span>
                            <div className="flex items-center justify-between gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
                              <span className="text-xs font-medium text-slate-600 truncate">"{rule.example}"</span>
                              <button
                                onClick={() => speak(rule.example.replace(/[⤴⤵]/g, ''))}
                                className="w-6 h-6 rounded-md bg-white hover:bg-emerald-600 hover:text-white border border-slate-200 flex items-center justify-center text-slate-500 transition-all cursor-pointer flex-shrink-0"
                              >
                                <Play className="w-3 h-3 fill-current" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {intonationSection === 'sentence_stress' && (
            <div className="space-y-6">
              <div className="premium-card p-6 bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
                <h3 className="text-lg font-black text-amber-800 flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-amber-600" /> Trọng Âm của Câu Nói (Sentence Stress)
                </h3>
                <p className="text-sm text-amber-700 leading-relaxed font-medium">
                  Trong một câu tiếng Anh, không phải từ nào cũng được phát âm rõ như nhau. Chúng ta nhấn vào những **Content Words** (từ mang nghĩa chính) và đọc lướt nhanh những **Structure Words** (từ chức năng ngữ pháp).
                </p>
              </div>

              {/* Interactive Sentence Stress Player */}
              <div className="premium-card p-6 md:p-8 bg-slate-900 text-white border-slate-800 shadow-xl rounded-[2rem]">
                <div className="text-center space-y-4">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Trình phát tương tác đổi trọng âm để đổi nghĩa của câu</span>
                  <h3 className="text-lg font-black text-slate-200">Hãy click vào từng từ dưới đây để xem nghĩa thay đổi thế nào:</h3>
                  
                  {/* Words rendering */}
                  <div className="flex flex-wrap items-center justify-center gap-2 py-4">
                    {["I", "didn't", "say", "he", "stole", "the", "money"].map((w, wIdx) => {
                      const isStressed = selectedStressWordIdx === wIdx;
                      return (
                        <button
                          key={wIdx}
                          onClick={() => {
                            setSelectedStressWordIdx(wIdx);
                            speak(w === "didn't" ? "did not" : w, 0.75);
                          }}
                          className={cn(
                            "px-4 py-2.5 rounded-2xl font-black text-lg sm:text-xl transition-all cursor-pointer border-2",
                            isStressed
                              ? "bg-gradient-to-br from-amber-400 to-orange-500 border-amber-300 text-white scale-110 shadow-lg shadow-orange-500/20"
                              : "bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-300"
                          )}
                        >
                          {w}
                        </button>
                      );
                    })}
                  </div>

                  {/* Stressed Explanation box */}
                  <div className="p-5 bg-slate-800/60 border border-slate-800 rounded-2xl text-left max-w-xl mx-auto space-y-2 min-h-[100px] flex flex-col justify-center animate-in fade-in duration-300">
                    {selectedStressWordIdx !== null ? (
                      (() => {
                        const explanations = [
                          { title: 'Nhấn vào "I"', meaning: 'Không phải tôi nói, mà là AI đó khác nói việc anh ta lấy tiền.', focus: 'Someone else said it, not me.' },
                          { title: 'Nhấn vào "didn\'t"', meaning: 'Tôi hoàn toàn phủ nhận việc tôi đã nói anh ta lấy tiền.', focus: 'I deny saying it.' },
                          { title: 'Nhấn vào "say"', meaning: 'Tôi không trực tiếp nói ra điều đó, tôi chỉ ngụ ý hoặc viết ra thôi.', focus: 'I implied it or wrote it, but didn\'t say it aloud.' },
                          { title: 'Nhấn vào "he"', meaning: 'Tôi nói là có ai đó lấy tiền, nhưng không phải là anh ta lấy.', focus: 'Someone else stole the money, not him.' },
                          { title: 'Nhấn vào "stole"', meaning: 'Tôi không bảo anh ta ăn trộm, có thể anh ta chỉ mượn, nhặt được thôi.', focus: 'He borrowed it or found it, didn\'t steal it.' },
                          { title: 'Nhấn vào "the"', meaning: 'Không áp dụng trọng âm đặc biệt cho mạo từ (thường lướt qua).', focus: 'Structure word - rarely stressed unless referencing a specific instance.' },
                          { title: 'Nhấn vào "money"', meaning: 'Anh ta lấy cắp thứ gì đó khác (xe, điện thoại...), chứ không phải tiền.', focus: 'He stole something else, not money.' }
                        ];
                        const activeExp = explanations[selectedStressWordIdx] || explanations[0];
                        return (
                          <>
                            <div className="flex items-center justify-between gap-3">
                              <h4 className="text-sm font-black text-amber-400 uppercase tracking-widest">{activeExp.title}</h4>
                              <button
                                onClick={() => speak("I didn't say he stole the money.", 0.75)}
                                className="px-3 py-1 bg-slate-700 hover:bg-slate-650 rounded-lg text-xs font-bold text-slate-200 transition-all flex items-center gap-1 cursor-pointer"
                              >
                                Nghe cả câu <Play className="w-2.5 h-2.5 fill-current" />
                              </button>
                            </div>
                            <p className="text-sm text-slate-200 font-semibold">{activeExp.meaning}</p>
                            <span className="text-xs text-slate-400 block italic">Ý chính: {activeExp.focus}</span>
                          </>
                        );
                      })()
                    ) : (
                      <p className="text-sm text-slate-400 font-medium text-center italic py-4">Click vào một từ phía trên để bắt đầu thử nghiệm đổi trọng âm câu.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Stress Rules Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SENTENCE_STRESS_RULES.map((rule, idx) => (
                  <div key={idx} className="premium-card p-6 bg-white border border-slate-200 hover:shadow-xl transition-all rounded-[2rem] flex flex-col justify-between space-y-4">
                    <div className="space-y-2 text-left">
                      <h4 className="text-base font-black text-slate-800">{rule.category}</h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{rule.desc}</p>
                    </div>

                    <div className="space-y-3 pt-2 border-t border-slate-100 flex-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Các từ tiêu biểu:</span>
                      <div className="grid grid-cols-1 gap-2">
                        {rule.types.map((type, tIdx) => (
                          <div key={tIdx} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100/80">
                            <div>
                              <span className="text-xs font-bold text-slate-800 block">{type.name}</span>
                              <span className="text-xs text-slate-500 font-mono mt-0.5 block">{type.example}</span>
                            </div>
                            <button
                              onClick={() => speak(type.example, 0.75)}
                              className="w-8 h-8 rounded-full bg-white hover:bg-slate-150 border border-slate-200 flex items-center justify-center text-slate-500 transition-all cursor-pointer shadow-sm active:scale-95"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* ════════════════════════════════════════════ MINIMAL PAIRS ═══════════════ */}
      {activeTab === 'pairs' && (() => {
        const availableFocuses = Array.from(
          new Set(
            MINIMAL_PAIRS.filter(p => pairTypeFilter === 'all' || p.type === pairTypeFilter).map(p => p.focus)
          )
        );

        const filteredPairs = MINIMAL_PAIRS.filter(pair => {
          const matchesType = pairTypeFilter === 'all' || pair.type === pairTypeFilter;
          const matchesFocus = selectedFocusFilter === 'all' || pair.focus === selectedFocusFilter;
          return matchesType && matchesFocus;
        });

        return (
          <div className="space-y-6">
            <div className="premium-card p-6 bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200">
              <h3 className="text-lg font-black text-rose-800 flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-rose-500" /> Cặp Tối Thiểu (Minimal Pairs)
              </h3>
              <p className="text-sm text-rose-700 leading-relaxed font-medium">
                Cặp tối thiểu là hai từ chỉ khác nhau ở một âm duy nhất. Luyện tập phân biệt các cặp này giúp bạn cải thiện khả năng nghe và phát âm.
              </p>
            </div>

            {/* Filter controls */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 bg-slate-100/80 p-1.5 rounded-2xl w-fit border border-slate-200/40">
                <button
                  onClick={() => { setPairTypeFilter('all'); setSelectedFocusFilter('all'); }}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer",
                    pairTypeFilter === 'all' ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => { setPairTypeFilter('vowel'); setSelectedFocusFilter('all'); }}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer",
                    pairTypeFilter === 'vowel' ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  Nguyên âm
                </button>
                <button
                  onClick={() => { setPairTypeFilter('consonant'); setSelectedFocusFilter('all'); }}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer",
                    pairTypeFilter === 'consonant' ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  Phụ âm
                </button>
              </div>

              <div className="flex flex-col gap-2 p-4 bg-slate-50 rounded-[2rem] border border-slate-200/50">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Chọn cặp âm phân biệt:</span>
                <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-2">
                  <button
                    onClick={() => setSelectedFocusFilter('all')}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border",
                      selectedFocusFilter === 'all'
                        ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    Tất cả âm ({availableFocuses.length})
                  </button>
                  {availableFocuses.map(f => (
                    <button
                      key={f}
                      onClick={() => setSelectedFocusFilter(f)}
                      className={cn(
                        "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border",
                        selectedFocusFilter === f
                          ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Pairs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPairs.map((pair, i) => (
                <div key={i} className="premium-card p-5 hover:shadow-xl transition-all flex flex-col justify-between">
                  <div>
                    <div className="text-center mb-3">
                      <span className="text-[9px] font-black text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {pair.focus}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => speak(pair.a.word)}
                        className="flex-1 flex flex-col items-center gap-1.5 p-4 rounded-xl border border-sky-100 bg-sky-50/20 hover:bg-sky-50/50 hover:border-sky-300 hover:shadow-sm transition-all group cursor-pointer"
                      >
                        <span className="text-lg sm:text-xl font-black text-slate-800 leading-tight">{pair.a.word}</span>
                        <span className="text-[10px] font-mono text-slate-400">{pair.a.ipa}</span>
                        <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded">{pair.a.vi}</span>
                        <Volume2 className="w-3.5 h-3.5 text-slate-300 group-hover:text-sky-500 mt-1" />
                      </button>

                      <div className="text-xs font-black text-slate-300">VS</div>

                      <button
                        onClick={() => speak(pair.b.word)}
                        className="flex-1 flex flex-col items-center gap-1.5 p-4 rounded-xl border border-rose-100 bg-rose-50/20 hover:bg-rose-50/50 hover:border-rose-300 hover:shadow-sm transition-all group cursor-pointer"
                      >
                        <span className="text-lg sm:text-xl font-black text-slate-800 leading-tight">{pair.b.word}</span>
                        <span className="text-[10px] font-mono text-slate-400">{pair.b.ipa}</span>
                        <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">{pair.b.vi}</span>
                        <Volume2 className="w-3.5 h-3.5 text-slate-300 group-hover:text-rose-500 mt-1" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      speak(pair.a.word);
                      setTimeout(() => speak(pair.b.word), 950);
                    }}
                    className="w-full mt-3 py-2 border border-slate-200/60 hover:border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100/80 flex items-center justify-center gap-1.5 text-[10px] font-black text-slate-500 hover:text-slate-700 transition-all cursor-pointer"
                  >
                    <Play className="w-3 h-3" /> Nghe Cả Cặp (A vs B)
                  </button>
                </div>
              ))}
            </div>

            {filteredPairs.length === 0 && (
              <div className="text-center py-12 bg-slate-50 rounded-[2rem] border border-slate-200/50">
                <span className="text-sm font-medium text-slate-400">Không tìm thấy cặp từ nào phù hợp với bộ lọc.</span>
              </div>
            )}
          </div>
        );
      })()}

      {/* ════════════════════════════════════════════ WORD & SENTENCE BUILDING ═════ */}
      {activeTab === 'building' && (
        <div className="space-y-8">
          <div className="premium-card p-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
            <h3 className="text-lg font-black text-purple-800 flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-purple-600" /> Quy Tắc Ghép Chữ Thành Từ & Nối Từ Thành Câu
            </h3>
            <p className="text-sm text-purple-700 leading-relaxed font-medium">
              Cách kết hợp âm để tạo nên từ vựng hoàn chỉnh, và các nguyên tắc liên kết âm (linking sounds) giúp câu nói tự nhiên, mượt mà như người bản xứ.
            </p>
          </div>

          {/* Section 1: Nối chữ thành từ */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="w-2.5 h-6 bg-purple-600 rounded-full"></span>
              <h3 className="text-xl font-black text-slate-800">I. Nối Chữ thành Từ (Word Building)</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Phonics Blend */}
              <div className="premium-card p-6 space-y-3 hover:shadow-lg transition-all bg-white border border-slate-200 rounded-[2rem]">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 font-black text-lg">1</div>
                <h4 className="font-black text-slate-800">Ghép vần Phonics (Blending)</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Phương pháp đọc trơn bằng cách ghép nối các âm đơn lẻ lại với nhau. Phổ biến nhất là quy tắc CVC (Consonant - Vowel - Consonant).
                </p>
                <div className="p-3 bg-slate-50 rounded-xl font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span>c - a - t</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <button onClick={() => speak("cat")} className="font-bold text-purple-600 flex items-center gap-1 cursor-pointer">cat <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200/50 pt-2">
                    <span>d - o - g</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <button onClick={() => speak("dog")} className="font-bold text-purple-600 flex items-center gap-1 cursor-pointer">dog <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                  </div>
                </div>
              </div>

              {/* Digraphs & Blends */}
              <div className="premium-card p-6 space-y-3 hover:shadow-lg transition-all bg-white border border-slate-200 rounded-[2rem]">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 font-black text-lg">2</div>
                <h4 className="font-black text-slate-800">Âm đôi & Âm ghép (Digraphs)</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Khi hai phụ âm đi liền với nhau tạo thành một âm hoàn toàn mới (Digraphs) hoặc giữ nguyên đặc trưng nhưng đọc lướt nhanh (Blends).
                </p>
                <div className="p-3 bg-slate-50 rounded-xl font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span>s + h ➔ /ʃ/</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <button onClick={() => speak("ship")} className="font-bold text-purple-600 flex items-center gap-1 cursor-pointer">ship <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200/50 pt-2">
                    <span>c + h ➔ /tʃ/</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <button onClick={() => speak("chair")} className="font-bold text-purple-600 flex items-center gap-1 cursor-pointer">chair <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                  </div>
                </div>
              </div>

              {/* Syllables */}
              <div className="premium-card p-6 space-y-3 hover:shadow-lg transition-all bg-white border border-slate-200 rounded-[2rem]">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 font-black text-lg">3</div>
                <h4 className="font-black text-slate-800">Phân tách Âm tiết (Syllables)</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Một từ có thể cấu tạo từ nhiều âm tiết. Đọc chuẩn từng âm tiết riêng lẻ rồi ghép lại giúp bạn phát âm các từ dài cực kỳ tự tin.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span>ti - ger</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <button onClick={() => speak("tiger")} className="font-bold text-purple-600 flex items-center gap-1 cursor-pointer">tiger <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200/50 pt-2">
                    <span>com - pu - ter</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <button onClick={() => speak("computer")} className="font-bold text-purple-600 flex items-center gap-1 cursor-pointer">computer <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Nối từ thành câu */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="w-2.5 h-6 bg-purple-600 rounded-full"></span>
              <h3 className="text-xl font-black text-slate-800">II. Nối Từ thành Câu (Liaison / Linking Words)</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Consonant to Vowel */}
              <div className="premium-card p-6 space-y-4 hover:shadow-lg transition-all bg-white border border-slate-200 rounded-[2rem]">
                <h4 className="font-black text-slate-800 flex items-center gap-2">
                  <span className="p-1.5 bg-blue-100 text-blue-600 rounded-lg text-xs">Phụ âm ➔ Nguyên âm</span>
                  Nối Phụ âm với Nguyên âm
                </h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Khi một từ kết thúc bằng một **phụ âm** và từ tiếp theo bắt đầu bằng một **nguyên âm**, chúng ta nối phụ âm đó sang nguyên âm đứng sau.
                </p>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <p className="text-xs font-mono font-bold text-slate-700">Turn on ➔ "tur-non"</p>
                    <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium">
                      <span>Bật lên</span>
                      <button onClick={() => speak("turn on")} className="text-purple-600 font-bold flex items-center gap-1 cursor-pointer">Nghe phát âm <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <p className="text-xs font-mono font-bold text-slate-700">Read a book ➔ "rea-da-book"</p>
                    <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium">
                      <span>Đọc một cuốn sách</span>
                      <button onClick={() => speak("read a book")} className="text-purple-600 font-bold flex items-center gap-1 cursor-pointer">Nghe phát âm <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vowel to Vowel */}
              <div className="premium-card p-6 space-y-4 hover:shadow-lg transition-all bg-white border border-slate-200 rounded-[2rem]">
                <h4 className="font-black text-slate-800 flex items-center gap-2">
                  <span className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg text-xs">Nguyên âm ➔ Nguyên âm</span>
                  Nối Nguyên âm với Nguyên âm
                </h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Khi từ trước kết thúc bằng nguyên âm và từ sau bắt đầu bằng nguyên âm, ta thêm âm nhẹ **/w/** hoặc **/j/** để câu liền mạch.
                </p>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <p className="text-xs font-mono font-bold text-slate-700">Go on ➔ thêm âm /w/ ➔ "go-w-on"</p>
                    <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium">
                      <span>Tiếp tục</span>
                      <button onClick={() => speak("go on")} className="text-purple-600 font-bold flex items-center gap-1 cursor-pointer">Nghe phát âm <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <p className="text-xs font-mono font-bold text-slate-700">See it ➔ thêm âm /j/ ➔ "see-y-it"</p>
                    <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium">
                      <span>Nhìn thấy nó</span>
                      <button onClick={() => speak("see it")} className="text-purple-600 font-bold flex items-center gap-1 cursor-pointer">Nghe phát âm <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consonant to Consonant (Assimilation) */}
              <div className="premium-card p-6 space-y-4 hover:shadow-lg transition-all bg-white border border-slate-200 rounded-[2rem]">
                <h4 className="font-black text-slate-800 flex items-center gap-2">
                  <span className="p-1.5 bg-amber-100 text-amber-600 rounded-lg text-xs">Phụ âm ➔ Phụ âm</span>
                  Nối & Biến đổi phụ âm (Assimilation)
                </h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Khi hai phụ âm đứng cạnh nhau, âm cuối của từ trước có thể biến đổi hoặc hòa lẫn vào âm đầu của từ sau.
                </p>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <p className="text-xs font-mono font-bold text-slate-700">meet you ➔ /t/ + /j/ ➔ "mee-tshu" (/miːtʃu/)</p>
                    <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium">
                      <span>Rất vui được gặp bạn</span>
                      <button onClick={() => speak("meet you")} className="text-purple-600 font-bold flex items-center gap-1 cursor-pointer">Nghe phát âm <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <p className="text-xs font-mono font-bold text-slate-700">would you ➔ /d/ + /j/ ➔ "wou-dju" (/ˈwʊdʒu/)</p>
                    <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium">
                      <span>Bạn có muốn...</span>
                      <button onClick={() => speak("would you")} className="text-purple-600 font-bold flex items-center gap-1 cursor-pointer">Nghe phát âm <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Elision (Nuốt âm) */}
              <div className="premium-card p-6 space-y-4 hover:shadow-lg transition-all bg-white border border-slate-200 rounded-[2rem]">
                <h4 className="font-black text-slate-800 flex items-center gap-2">
                  <span className="p-1.5 bg-rose-100 text-rose-600 rounded-lg text-xs">Nuốt âm (Elision)</span>
                  Giản lược/Nuốt âm cuối
                </h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Âm yếu như **/t/** hoặc **/d/** ở cuối từ thường bị nuốt (không phát âm) khi từ tiếp theo bắt đầu bằng một phụ âm khác.
                </p>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <p className="text-xs font-mono font-bold text-slate-700">next door ➔ nuốt âm /t/ ➔ "nex-door"</p>
                    <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium">
                      <span>Nhà bên cạnh</span>
                      <button onClick={() => speak("next door")} className="text-purple-600 font-bold flex items-center gap-1 cursor-pointer">Nghe phát âm <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <p className="text-xs font-mono font-bold text-slate-700">last night ➔ nuốt âm /t/ ➔ "las-night"</p>
                    <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium">
                      <span>Tối hôm qua</span>
                      <button onClick={() => speak("last night")} className="text-purple-600 font-bold flex items-center gap-1 cursor-pointer">Nghe phát âm <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ════════════════════════════════════════════ NUMBERS ═══════════════════════ */}
      {activeTab === 'numbers' && (
        <div className="space-y-6">
          <div className="premium-card p-6 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
            <h3 className="text-lg font-black text-teal-800 flex items-center gap-2 mb-2">
              <Hash className="w-5 h-5 text-teal-600" /> Cách Đọc Số trong Tiếng Anh
            </h3>
            <p className="text-sm text-teal-700 leading-relaxed font-medium">
              Học cách phát âm các số từ 0–20, hàng chục, hàng trăm, nghìn, triệu, tỉ và quy tắc ghép số. Nhấn vào mỗi số để nghe phát âm.
            </p>
          </div>

          {/* Sub-tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'basic' as const, label: 'Số 0–20 & Hàng Chục' },
              { id: 'big' as const, label: 'Trăm → Tỉ' },
              { id: 'combo' as const, label: 'Quy Tắc Ghép Số' },
              { id: 'ordinals' as const, label: 'Số Thứ Tự' },
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setNumSection(s.id)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer",
                  numSection === s.id ? "bg-teal-600 text-white shadow-md" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Basic 0-20 + Tens */}
          {numSection === 'basic' && (
            <div className="space-y-6">
              <h4 className="font-black text-slate-800 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-teal-500 rounded-full" />Số từ 0 đến 20
              </h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {NUMBERS_BASIC.map(n => (
                  <button key={n.num} onClick={() => speak(n.en)} className="group premium-card p-4 flex flex-col items-center gap-1 hover:shadow-lg hover:-translate-y-0.5 transition-all border border-teal-100 bg-teal-50/30 cursor-pointer">
                    <span className="text-2xl font-black text-teal-700">{n.num}</span>
                    <span className="text-xs font-bold text-slate-700">{n.en}</span>
                    <span className="text-[10px] text-slate-400 italic font-sans">{n.vi}</span>
                    <Play className="w-3 h-3 text-slate-300 group-hover:text-teal-500 fill-slate-300 group-hover:fill-teal-500" />
                  </button>
                ))}
              </div>

              <h4 className="font-black text-slate-800 flex items-center gap-2 pt-4">
                <span className="w-2.5 h-6 bg-teal-500 rounded-full" />Hàng Chục (10 – 100)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {NUMBERS_TENS.map(n => (
                  <button key={n.num} onClick={() => speak(n.en)} className="group premium-card p-4 flex flex-col items-center gap-1 hover:shadow-lg hover:-translate-y-0.5 transition-all border border-cyan-100 bg-cyan-50/30 cursor-pointer">
                    <span className="text-2xl font-black text-cyan-700">{n.num}</span>
                    <span className="text-xs font-bold text-slate-700">{n.en}</span>
                    <span className="text-[10px] text-slate-400 italic font-sans">{n.vi}</span>
                    <Play className="w-3 h-3 text-slate-300 group-hover:text-cyan-500 fill-slate-300 group-hover:fill-cyan-500" />
                  </button>
                ))}
              </div>

              <div className="premium-card p-4 bg-amber-50 border-amber-200 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-700 font-medium space-y-1">
                  <p><strong>Lưu ý:</strong> Các số 13–19 có đuôi <span className="font-mono bg-amber-100 px-1 rounded">-teen</span> (nhấn mạnh âm TEEN). Hàng chục 20–90 có đuôi <span className="font-mono bg-amber-100 px-1 rounded">-ty</span> (nhấn âm đầu).</p>
                  <p>VD: thir<strong>TEEN</strong> /θɜːˈtiːn/ vs <strong>THIR</strong>ty /ˈθɜː.ti/</p>
                </div>
              </div>
            </div>
          )}

          {/* Big Numbers */}
          {numSection === 'big' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {NUMBERS_BIG.map(n => (
                  <button key={n.num} onClick={() => speak(n.en)} className="group premium-card p-6 flex items-center gap-5 hover:shadow-xl transition-all text-left cursor-pointer">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white flex items-center justify-center font-black text-xs flex-shrink-0 shadow-lg">
                      {n.num}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-black text-slate-800">{n.en}</p>
                      <p className="text-xs font-mono text-slate-400">{n.ipa}</p>
                      <p className="text-xs text-primary font-bold mt-1">📏 {n.rule}</p>
                    </div>
                    <Play className="w-5 h-5 text-slate-200 group-hover:text-teal-500 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Combo Rules */}
          {numSection === 'combo' && (
            <div className="space-y-4">
              <div className="premium-card p-4 bg-purple-50 border-purple-200 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-purple-700 font-medium">
                  <p><strong>Quy tắc vàng:</strong> Đọc từ trái sang phải, lớn → nhỏ. Dùng <strong>"and"</strong> trước số hàng chục/đơn vị khi đứng sau hàng trăm.</p>
                </div>
              </div>
              <div className="space-y-3">
                {NUMBERS_COMBO.map((n, i) => (
                  <button key={i} onClick={() => speak(n.en)} className="group w-full premium-card p-5 flex items-center gap-4 hover:shadow-lg transition-all text-left cursor-pointer">
                    <span className="w-24 text-right text-2xl font-black text-primary flex-shrink-0 font-mono">{n.num}</span>
                    <div className="flex-1 min-w-0 border-l border-slate-200 pl-4">
                      <p className="font-bold text-slate-800">{n.en}</p>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">📐 {n.rule}</p>
                    </div>
                    <Play className="w-4 h-4 text-slate-200 group-hover:text-primary flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Ordinals */}
          {numSection === 'ordinals' && (
            <div className="space-y-4">
              <div className="premium-card p-4 bg-blue-50 border-blue-200 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-700 font-medium">
                  <p>Số thứ tự dùng để chỉ vị trí, thứ hạng. Thường thêm đuôi <strong>-th</strong> (fourth, fifth...) trừ 1st, 2nd, 3rd.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {ORDINALS.map(n => (
                  <button key={n.num} onClick={() => speak(n.en)} className="group premium-card p-4 flex flex-col items-center gap-1 hover:shadow-lg hover:-translate-y-0.5 transition-all border border-indigo-100 bg-indigo-50/30 cursor-pointer">
                    <span className="text-2xl font-black text-indigo-700">{n.num}</span>
                    <span className="text-xs font-bold text-slate-700">{n.en}</span>
                    <span className="text-[10px] text-slate-400 italic font-sans">{n.vi}</span>
                    <Play className="w-3 h-3 text-slate-300 group-hover:text-indigo-500 fill-slate-300 group-hover:fill-indigo-500" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════ WORD ENDINGS ══════════════════ */}
      {activeTab === 'endings' && (
        <div className="space-y-8">
          {/* -ed section */}
          <section className="space-y-4">
            <div className="premium-card p-6 bg-gradient-to-r from-rose-50 to-orange-50 border-rose-200">
              <h3 className="text-lg font-black text-rose-800 flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-rose-600" /> Cách phát âm đuôi -ED
              </h3>
              <p className="text-sm text-rose-700 leading-relaxed font-medium">
                Đuôi -ed (quá khứ đơn, phân từ) có 3 cách đọc: <strong>/t/</strong>, <strong>/d/</strong>, hoặc <strong>/ɪd/</strong> tùy thuộc vào âm cuối của động từ gốc.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ED_RULES.map((r, i) => (
                <div key={i} className="premium-card p-6 hover:shadow-xl transition-all space-y-3">
                  <div className="flex items-center gap-2">
                    <span className={cn("text-sm font-black px-3 py-1 rounded-full", i === 0 ? "bg-sky-100 text-sky-700" : i === 1 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700")}>{r.rule}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{r.condition}</p>
                  <div className="space-y-2">
                    {r.examples.map((ex: any, j: number) => (
                      <button key={j} onClick={() => speak(ex.word)} className="group w-full flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-primary/5 transition-all cursor-pointer">
                        <span className="font-bold text-sm text-slate-800">{ex.word}</span>
                        <span className="text-xs font-mono text-slate-400">{ex.ipa}</span>
                        <Play className="w-3 h-3 text-slate-300 group-hover:text-primary" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* -s/-es section */}
          <section className="space-y-4">
            <div className="premium-card p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <h3 className="text-lg font-black text-blue-800 flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-blue-600" /> Cách phát âm đuôi -S / -ES
              </h3>
              <p className="text-sm text-blue-700 leading-relaxed font-medium">
                Đuôi -s/-es (số nhiều, ngôi thứ 3 số ít) có 3 cách đọc: <strong>/s/</strong>, <strong>/z/</strong>, hoặc <strong>/ɪz/</strong> tùy thuộc vào âm cuối.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {S_RULES.map((r, i) => (
                <div key={i} className="premium-card p-6 hover:shadow-xl transition-all space-y-3">
                  <div className="flex items-center gap-2">
                    <span className={cn("text-sm font-black px-3 py-1 rounded-full", i === 0 ? "bg-sky-100 text-sky-700" : i === 1 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700")}>{r.rule}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{r.condition}</p>
                  <div className="space-y-2">
                    {r.examples.map((ex, j) => (
                      <button key={j} onClick={() => speak(ex.word)} className="group w-full flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-primary/5 transition-all cursor-pointer">
                        <span className="font-bold text-sm text-slate-800">{ex.word}</span>
                        <span className="text-xs font-mono text-slate-400">{ex.ipa}</span>
                        <Play className="w-3 h-3 text-slate-300 group-hover:text-primary" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ════════════════════════════════════════════ NOUNS & ARTICLES ═══════════════ */}
      {activeTab === 'nouns' && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="premium-card p-6 bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-200">
            <h3 className="text-lg font-black text-indigo-800 flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-indigo-600" /> Quy Tắc Danh Từ: Số Ít, Số Nhiều & Mạo Từ
            </h3>
            <p className="text-sm text-indigo-700 leading-relaxed font-medium">
              Học cách chuyển đổi danh từ số ít sang số nhiều, quy tắc thêm đuôi -s/-es, sử dụng mạo từ a/an chính xác và các danh từ không đếm được đặc trưng.
            </p>
          </div>

          {/* Sub-tabs */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 no-scrollbar">
            {[
              { id: 'rules' as const, label: 'Quy Tắc Số Nhiều (-s/-es)' },
              { id: 'irregular' as const, label: 'Từ Đặc Biệt (Bất Quy Tắc)' },
              { id: 'uncountable' as const, label: 'Danh Từ Không Đếm Được' },
              { id: 'articles' as const, label: 'Mạo Từ A / AN' },
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setNounSection(s.id)}
                className={cn(
                  "px-3 sm:px-4 py-2 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer",
                  nounSection === s.id ? "bg-indigo-600 text-white shadow-md" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Rules -s/-es */}
          {nounSection === 'rules' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PLURAL_RULES.map((r, i) => (
                <div key={i} className="premium-card p-6 hover:shadow-xl transition-all space-y-3 bg-white">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">{r.rule}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-bold">{r.condition}</p>
                  <div className="space-y-2">
                    {r.examples.map((ex, j) => (
                      <div key={j} className="flex flex-col gap-1 p-3 bg-slate-50 rounded-xl">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400 font-semibold">{ex.word} (ít) ➔</span>
                          <button onClick={() => speak(ex.plural)} className="group flex items-center gap-2 font-bold text-sm text-indigo-600 hover:underline">
                            {ex.plural} <span className="text-[11px] font-mono text-slate-400">{ex.ipa}</span>
                            <Play className="w-2.5 h-2.5 fill-indigo-600 text-indigo-600" />
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium">Ý nghĩa: {ex.vi}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Irregular Nouns */}
          {nounSection === 'irregular' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {IRREGULAR_NOUNS.map((noun, idx) => (
                <div key={idx} className="premium-card p-4 hover:shadow-lg transition-all bg-white border border-slate-200 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-400">Số ít:</span>
                        <button onClick={() => speak(noun.singular)} className="group flex items-center gap-1.5 font-bold text-sm text-slate-800 hover:text-indigo-600">
                          {noun.singular} <span className="text-[10px] font-mono text-slate-400">{noun.ipaSingular}</span>
                          <Play className="w-2.5 h-2.5 text-slate-400 group-hover:text-indigo-600" />
                        </button>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs font-semibold text-slate-400">Số nhiều:</span>
                        <button onClick={() => speak(noun.plural)} className="group flex items-center gap-1.5 font-bold text-sm text-indigo-600 hover:underline">
                          {noun.plural} <span className="text-[10px] font-mono text-slate-400">{noun.ipaPlural}</span>
                          <Play className="w-2.5 h-2.5 fill-indigo-600 text-indigo-600" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 font-medium text-center">Nghĩa: <span className="font-semibold text-slate-700">{noun.vi}</span></p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Uncountable Nouns */}
          {nounSection === 'uncountable' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl text-xs font-medium leading-relaxed text-left">
                👉 <strong>Quy tắc quan trọng:</strong> Danh từ không đếm được (Uncountable Nouns) không có dạng số nhiều (không thêm -s/-es) và không thể dùng với <strong>a/an</strong> trực tiếp. Để đếm chúng, ta phải sử dụng các <strong>từ chỉ đo lường/đóng gói</strong> cụ thể đi kèm.
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 pb-1 no-scrollbar overflow-x-auto text-left">
                {[
                  { id: 'all', label: 'Tất cả' },
                  { id: 'liquid', label: 'Chất lỏng (Liquids)' },
                  { id: 'grain', label: 'Hạt & Bột (Grains & Powders)' },
                  { id: 'meat', label: 'Thịt & Thực phẩm (Meats & Food)' },
                  { id: 'abstract', label: 'Trừu tượng (Abstract)' },
                  { id: 'material', label: 'Vật liệu (Materials)' },
                  { id: 'other', label: 'Hiện tượng & Khác' },
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setUncountableCategory(cat.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap",
                      uncountableCategory === cat.id
                        ? "bg-amber-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {UNCOUNTABLE_NOUNS.filter(noun => uncountableCategory === 'all' || noun.category === uncountableCategory).map((noun, idx) => (
                  <div key={idx} className="premium-card p-4 hover:shadow-md transition-all bg-white border border-slate-100 flex flex-col justify-between">
                    <div className="flex justify-between items-start text-left">
                      <div>
                        <button onClick={() => speak(noun.term)} className="group flex items-center gap-1.5 font-bold text-slate-800 hover:text-indigo-600">
                          {noun.term} <span className="text-xs font-mono text-slate-400">{noun.ipa}</span>
                          <Play className="w-2.5 h-2.5 text-slate-400 group-hover:text-indigo-600" />
                        </button>
                        <p className="text-xs text-slate-400 font-medium mt-1">Nghĩa: {noun.vi}</p>
                      </div>
                      <div className="bg-indigo-50 border border-indigo-100 p-2.5 rounded-xl text-right">
                        <span className="text-[10px] font-semibold text-slate-400 block uppercase">Cụm từ đong đếm:</span>
                        <button onClick={() => speak(noun.measure)} className="group flex items-center gap-1 font-bold text-xs text-indigo-700 hover:underline mt-0.5">
                          {noun.measure} <Play className="w-2.5 h-2.5 fill-indigo-600 text-indigo-600 shrink-0" />
                        </button>
                        <span className="text-[10px] text-indigo-950 font-medium block mt-0.5">{noun.measureVi}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Articles A / AN */}
          {nounSection === 'articles' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ARTICLE_RULES.map((r, i) => (
                <div key={i} className="premium-card p-6 hover:shadow-xl transition-all space-y-3 bg-white text-left">
                  <div className="flex items-center gap-2">
                    <span className={cn("text-xs font-black px-3 py-1 rounded-full", i < 2 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700")}>
                      {r.rule}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">{r.condition}</p>
                  <div className="space-y-2">
                    {r.examples.map((ex, j) => (
                      <button key={j} onClick={() => speak(ex.word)} className="group w-full flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-indigo-50 transition-all cursor-pointer">
                        <span className="font-bold text-sm text-slate-800">{ex.word}</span>
                        <span className="text-xs font-mono text-slate-400">{ex.ipa}</span>
                        <Play className="w-3 h-3 text-slate-300 group-hover:text-indigo-600" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════ DATETIME ═══════════════════════ */}
      {activeTab === 'datetime' && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="premium-card p-6 bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200">
            <h3 className="text-lg font-black text-violet-800 flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-violet-600" /> Phát Âm Thứ, Tháng & Năm trong Tiếng Anh
            </h3>
            <p className="text-sm text-violet-700 leading-relaxed font-medium">
              Cách đọc chuẩn xác các thứ trong tuần, tháng trong năm và quy tắc đọc các mốc năm trong tiếng Anh kèm phiên âm IPA đầy đủ.
            </p>
          </div>

          {/* Sub-tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'days' as const, label: 'Thứ trong tuần' },
              { id: 'relative' as const, label: 'Từ chỉ Ngày/Thời gian' },
              { id: 'months' as const, label: 'Tháng trong năm' },
              { id: 'years' as const, label: 'Cách đọc Năm' },
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setDatetimeSection(s.id)}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer",
                  datetimeSection === s.id ? "bg-violet-600 text-white shadow-md" : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Days of week */}
          {datetimeSection === 'days' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {DAYS_OF_WEEK.map(d => (
                <button
                  key={d.day}
                  onClick={() => speak(d.day)}
                  className="group premium-card p-5 flex flex-col items-center justify-center text-center gap-2 hover:shadow-xl hover:-translate-y-0.5 transition-all border border-violet-100 bg-violet-50/10 cursor-pointer"
                >
                  <span className="text-[10px] font-black text-violet-500 uppercase tracking-widest bg-violet-100 px-2 py-0.5 rounded-md">{d.abbreviation}</span>
                  <span className="text-xl font-black text-slate-800">{d.day}</span>
                  <span className="text-xs font-mono text-slate-400 font-medium">{d.ipa}</span>
                  <span className="text-xs font-medium text-slate-500 border-t border-slate-100 w-full pt-1.5 mt-1">{d.vi}</span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-violet-500 flex items-center justify-center transition-colors mt-1">
                    <Play className="w-3.5 h-3.5 fill-slate-400 text-slate-400 group-hover:fill-white group-hover:text-white transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Relative time terms */}
          {datetimeSection === 'relative' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-in fade-in duration-300">
              {RELATIVE_TIME_WORDS.map((r, idx) => (
                <button
                  key={idx}
                  onClick={() => speak(r.term)}
                  className="group premium-card p-5 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all border border-violet-100 bg-violet-50/10 cursor-pointer text-left h-full"
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <span className="text-[9px] font-black text-violet-600 bg-violet-100/50 px-2 py-0.5 rounded-md uppercase tracking-widest">{r.category}</span>
                    <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-violet-500 flex items-center justify-center transition-colors">
                      <Play className="w-3 h-3 fill-slate-400 text-slate-400 group-hover:fill-white group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-black text-slate-800 leading-tight group-hover:text-violet-600 transition-colors">{r.term}</p>
                    <p className="text-xs font-mono text-slate-400 font-medium">{r.ipa}</p>
                    <p className="text-xs text-slate-500 font-bold mt-1">({r.vi})</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Months of year */}
          {datetimeSection === 'months' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {MONTHS_OF_YEAR.map(m => (
                <button
                  key={m.month}
                  onClick={() => speak(m.month)}
                  className="group premium-card p-5 flex items-center gap-4 hover:shadow-xl hover:-translate-y-0.5 transition-all border border-purple-100 bg-purple-50/10 cursor-pointer text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-black text-sm uppercase flex-shrink-0">
                    {m.abbreviation}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-black text-slate-800 leading-tight">{m.month}</p>
                    <p className="text-xs font-mono text-slate-400 font-medium">{m.ipa}</p>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{m.vi}</p>
                  </div>
                  <Play className="w-4 h-4 text-slate-200 group-hover:text-purple-600 flex-shrink-0 transition-colors" />
                </button>
              ))}
            </div>
          )}

          {/* Years rules */}
          {datetimeSection === 'years' && (
            <div className="space-y-4">
              <div className="premium-card p-4 bg-amber-50 border-amber-200 flex items-start gap-3 text-left">
                <Info className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-700 font-medium space-y-1">
                  <p><strong>Nguyên tắc chung:</strong> Đối với các năm trước năm 2000, ta thường chia đôi năm thành 2 cụm số hàng chục để đọc. Kể từ năm 2000 trở đi, có thể đọc cả số nghìn hoặc tiếp tục áp dụng quy tắc chia đôi.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {YEAR_RULES.map((y, idx) => (
                  <button
                    key={idx}
                    onClick={() => speak(y.read)}
                    className="group premium-card p-5 flex items-center gap-5 hover:shadow-xl transition-all text-left cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white flex items-center justify-center font-black text-lg flex-shrink-0 shadow-lg shadow-purple-500/10">
                      {y.example}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-black text-slate-800 leading-tight">{y.read}</p>
                      <p className="text-xs font-mono text-slate-400 font-medium mt-0.5">{y.ipa}</p>
                      <p className="text-xs text-violet-600 font-bold mt-1">💡 {y.rule}</p>
                    </div>
                    <Play className="w-5 h-5 text-slate-200 group-hover:text-violet-600 flex-shrink-0 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════ COUNTRIES & NATIONALITIES ════ */}
      {activeTab === 'countries' && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="premium-card p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
            <h3 className="text-lg font-black text-emerald-800 flex items-center gap-2 mb-2">
              <Globe className="w-5 h-5 text-emerald-600" /> Tên Quốc Gia & Quốc Tịch (Countries & Nationalities)
            </h3>
            <p className="text-sm text-emerald-700 leading-relaxed font-medium">
              Luyện phát âm chuẩn xác tên các quốc gia lớn trên thế giới và danh từ chỉ quốc tịch/ngôn ngữ tương ứng kèm phiên âm quốc tế IPA.
            </p>
          </div>

          {/* Search & Region Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm quốc gia hoặc quốc tịch..."
                value={countrySearch}
                onChange={(e) => setCountrySearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:outline-none placeholder-slate-400 text-slate-800"
              />
            </div>

            {/* Region Filter Buttons */}
            <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 no-scrollbar">
              {['All', 'Asia', 'Middle East', 'Europe', 'Americas', 'Africa', 'Oceania'].map(reg => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer",
                    selectedRegion === reg
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
                  )}
                >
                  {reg === 'All' ? 'Tất cả' : reg}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Countries */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {COUNTRIES_DATA.filter(c => {
              const matchesSearch = c.country.toLowerCase().includes(countrySearch.toLowerCase()) ||
                c.nationality.toLowerCase().includes(countrySearch.toLowerCase()) ||
                c.vi.toLowerCase().includes(countrySearch.toLowerCase());
              const matchesRegion = selectedRegion === 'All' || c.region === selectedRegion;
              return matchesSearch && matchesRegion;
            }).map((c, idx) => (
              <div
                key={idx}
                className="premium-card p-5 flex flex-col justify-between hover:shadow-xl transition-all border border-slate-100 bg-white"
              >
                {/* Header Flag & Vietnamese translation */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl filter drop-shadow-sm select-none">{c.flag}</span>
                  <span className="text-[10px] font-black text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full uppercase tracking-wider">{c.region}</span>
                </div>

                {/* Country section */}
                <div className="space-y-4">
                  <div className="text-left">
                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest block mb-0.5 text-left">Quốc Gia (Country)</span>
                    <button
                      onClick={() => speak(c.country)}
                      className="group flex items-center gap-2 hover:text-emerald-600 transition-colors text-left cursor-pointer"
                    >
                      <span className="text-base font-black text-slate-800 group-hover:text-emerald-600 transition-colors">{c.country}</span>
                      <Play className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-600 fill-slate-100 group-hover:fill-emerald-100 transition-all flex-shrink-0" />
                    </button>
                    <p className="text-xs font-mono text-slate-400 font-medium mt-0.5 text-left">{c.countryIpa}</p>
                    <p className="text-xs text-slate-500 font-bold mt-1 text-left">({c.vi})</p>
                  </div>

                  {/* Nationality section */}
                  <div className="pt-3 border-t border-slate-100 text-left">
                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest block mb-0.5 text-left">Quốc Tịch / Ngôn Ngữ</span>
                    <button
                      onClick={() => speak(c.nationality)}
                      className="group flex items-center gap-2 hover:text-blue-600 transition-colors text-left cursor-pointer"
                    >
                      <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{c.nationality}</span>
                      <Play className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 fill-slate-100 group-hover:fill-blue-100 transition-all flex-shrink-0" />
                    </button>
                    <p className="text-xs font-mono text-slate-400 font-medium mt-0.5 text-left">{c.nationalityIpa}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {COUNTRIES_DATA.filter(c => {
            const matchesSearch = c.country.toLowerCase().includes(countrySearch.toLowerCase()) ||
              c.nationality.toLowerCase().includes(countrySearch.toLowerCase()) ||
              c.vi.toLowerCase().includes(countrySearch.toLowerCase());
            const matchesRegion = selectedRegion === 'All' || c.region === selectedRegion;
            return matchesSearch && matchesRegion;
          }).length === 0 && (
              <div className="text-center py-12 premium-card bg-slate-50/50">
                <p className="text-slate-400 font-medium text-sm">Không tìm thấy quốc gia phù hợp với từ khóa.</p>
              </div>
            )}
        </div>
      )}

      {/* ════════════════════════════════════════════ COMMUNICATION TOPICS ═══════════ */}
      {activeTab === 'topics' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-in fade-in duration-500 text-left">
          {/* Sidebar / Left Column: Topics List */}
          <div className="md:col-span-4 space-y-3">
            <div className="premium-card p-5 bg-gradient-to-r from-violet-50 to-indigo-50 border-violet-100 mb-2">
              <h3 className="text-sm font-black text-violet-850 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-violet-600" /> Học theo Chủ đề
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Chọn chủ đề bên dưới để luyện phát âm và thực hành nói các mẫu câu giao tiếp thông dụng.
              </p>
            </div>

            <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-2 pb-2 md:pb-0 no-scrollbar">
              {TOPIC_LESSONS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTopic(t.id)}
                  className={cn(
                    "flex-shrink-0 text-left p-2.5 md:p-4 rounded-xl md:rounded-2xl border-2 transition-all cursor-pointer w-auto md:w-full relative overflow-hidden",
                    selectedTopic === t.id
                      ? "border-violet-600 bg-violet-50/40 shadow-md shadow-violet-500/5"
                      : "border-slate-100 bg-white hover:border-slate-300 hover:shadow-sm"
                  )}
                >
                  {selectedTopic === t.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-violet-600 rounded-r-md hidden md:block" />
                  )}
                  <h4 className={cn("text-xs md:text-sm font-bold text-slate-800 transition-colors pl-1 whitespace-nowrap md:whitespace-normal", selectedTopic === t.id && "text-violet-750 font-black")}>{t.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 pl-1 font-medium line-clamp-1 hidden md:block">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Selected Topic's Phrases */}
          <div className="md:col-span-8 space-y-4">
            {TOPIC_LESSONS.map(t => {
              if (t.id !== selectedTopic) return null;
              return (
                <div key={t.id} className="space-y-4">
                  <div className="p-6 premium-card bg-white border border-slate-200">
                    <h3 className="text-xl font-black text-slate-800">{t.title}</h3>
                    <p className="text-sm text-slate-500 font-medium mt-1">{t.desc}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {t.phrases.map((phrase, idx) => (
                      <div
                        key={idx}
                        className="premium-card p-5 bg-white border border-slate-100 hover:border-violet-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
                      >
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="text-left">
                            <span className="text-[9px] font-black text-violet-600 uppercase tracking-widest block mb-1">Mẫu câu #{idx + 1}</span>
                            <h4 className="text-base font-black text-slate-850">{phrase.text}</h4>
                            <p className="text-xs font-mono text-slate-400 font-medium mt-1">{phrase.ipa}</p>
                            <p className="text-xs text-slate-500 font-bold mt-2">💡 {phrase.vi}</p>
                          </div>

                          <button
                            onClick={() => speak(phrase.text)}
                            className="w-9 h-9 rounded-full bg-slate-50 hover:bg-violet-500 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-slate-100 flex-shrink-0"
                            title="Nghe phát âm chuẩn"
                          >
                            <Play className="w-4 h-4 fill-current" />
                          </button>
                        </div>

                        {/* Interactive Speech Practice block */}
                        <div className="mt-4 pt-4 border-t border-slate-100">
                          <SpeechPracticeSection targetWord={phrase.text} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════ VERBS (ĐỘNG TỪ) ═══════════ */}
      {activeTab === 'verbs' && (
        <div className="space-y-6 animate-in fade-in duration-500 text-left">
          {/* Header Banner */}
          <div className="premium-card p-5 sm:p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <h3 className="text-lg font-black text-amber-850 flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-amber-600" /> Hệ Thống Động Từ Toàn Diện (English Verbs System)
            </h3>
            <p className="text-xs sm:text-sm text-amber-800 leading-relaxed font-medium">
              Động từ là linh hồn của câu, diễn tả hành động hoặc trạng thái. Trải nghiệm hệ thống học động từ tích hợp đầy đủ từ phân loại, quy tắc chia thì đến sân chơi tương tác và luyện tập.
            </p>
          </div>

          {/* Sub-navigation */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'list' as const, label: 'Bảng động từ 3 thể' },
              { id: 'types' as const, label: 'Phân loại: Action & Thinking' },
              { id: 'playground' as const, label: 'Sân chơi chia động từ (Playground)' },
              { id: 'conjugation' as const, label: 'Quy tắc chia động từ' },
              { id: 'practice' as const, label: 'Luyện tập chia động từ' }
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setVerbSection(s.id)}
                className={cn(
                  "px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer",
                  verbSection === s.id
                    ? "bg-amber-600 text-white shadow-lg shadow-amber-600/10"
                    : "bg-white text-slate-500 border border-slate-200 hover:border-amber-400"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* SECTION 1: VERB LIST */}
          {verbSection === 'list' && (
            <div className="space-y-4">
              {/* Filter and Search */}
              <div className="flex flex-wrap gap-3 justify-between items-center bg-white p-4 border border-slate-200 rounded-2xl">
                <div className="flex flex-wrap gap-2 items-center">
                  {(['all', 'irregular', 'regular'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setVerbFilter(f)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer",
                        verbFilter === f
                          ? "bg-amber-500 text-white"
                          : "bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100"
                      )}
                    >
                      {f === 'all' ? 'Tất cả' : f === 'irregular' ? 'Bất quy tắc' : 'Có quy tắc'}
                    </button>
                  ))}
                </div>

                {/* Search box */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={verbSearchQuery}
                    onChange={(e) => setVerbSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm động từ (Ví dụ: go, think)..."
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/25 placeholder-slate-400 text-slate-800"
                  />
                </div>

                <div className="text-xs text-slate-400 font-bold">
                  Số lượng: {COMMON_VERBS.filter(v => {
                    const matchesFilter = verbFilter === 'all' || v.type === verbFilter;
                    const matchesSearch = v.verb.toLowerCase().includes(verbSearchQuery.toLowerCase()) || v.vi.toLowerCase().includes(verbSearchQuery.toLowerCase());
                    return matchesFilter && matchesSearch;
                  }).length} từ
                </div>
              </div>

              {/* Verb Table */}
              <div className="premium-card bg-white border border-slate-200 rounded-[1.5rem] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-left px-3 sm:px-4 py-3 font-black text-slate-600 text-xs uppercase tracking-wider font-sans">V1 (Base)</th>
                        <th className="text-left px-3 sm:px-4 py-3 font-black text-slate-600 text-xs uppercase tracking-wider font-sans">V2 (Past)</th>
                        <th className="text-left px-3 sm:px-4 py-3 font-black text-slate-600 text-xs uppercase tracking-wider font-sans">V3 (P.P.)</th>
                        <th className="text-left px-3 sm:px-4 py-3 font-black text-slate-600 text-xs uppercase tracking-wider font-sans hidden sm:table-cell">IPA</th>
                        <th className="text-left px-3 sm:px-4 py-3 font-black text-slate-600 text-xs uppercase tracking-wider font-sans">Nghĩa</th>
                        <th className="text-center px-2 py-3 font-black text-slate-600 text-xs uppercase tracking-wider font-sans">Nghe</th>
                      </tr>
                    </thead>
                    <tbody>
                      {COMMON_VERBS.filter(v => {
                        const matchesFilter = verbFilter === 'all' || v.type === verbFilter;
                        const matchesSearch = v.verb.toLowerCase().includes(verbSearchQuery.toLowerCase()) || v.vi.toLowerCase().includes(verbSearchQuery.toLowerCase());
                        return matchesFilter && matchesSearch;
                      }).map((v, i) => (
                        <tr key={i} className="border-b border-slate-100 hover:bg-amber-50/30 transition-colors">
                          <td className="px-3 sm:px-4 py-3 font-black text-slate-800">{v.verb}</td>
                          <td className="px-3 sm:px-4 py-3 font-semibold text-orange-700">{v.v2}</td>
                          <td className="px-3 sm:px-4 py-3 font-semibold text-amber-700">{v.v3}</td>
                          <td className="px-3 sm:px-4 py-3 text-slate-400 font-mono text-xs hidden sm:table-cell">{v.ipa}</td>
                          <td className="px-3 sm:px-4 py-3 text-slate-600 font-semibold text-xs">{v.vi}</td>
                          <td className="px-2 py-3 text-center">
                            <button
                              onClick={() => speak(v.verb)}
                              className="w-8 h-8 rounded-full bg-amber-55 hover:bg-amber-500 text-amber-500 hover:text-white flex items-center justify-center transition-all cursor-pointer mx-auto border border-amber-100"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: VERB TYPES (ACTION & THINKING DEEP-DIVE) */}
          {verbSection === 'types' && (
            <div className="space-y-6">
              {/* Dynamic vs. Stative / Action vs. Thinking Explanation */}
              <div className="premium-card p-5 bg-white border border-slate-200 rounded-[1.5rem] space-y-4">
                <h4 className="text-sm font-black text-amber-805 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                  <span>🧠 Action Verbs vs. Thinking (Stative) Verbs</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-100 space-y-2">
                    <h5 className="text-xs font-black text-amber-800 uppercase tracking-widest flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> Động từ Hành động (Action / Dynamic)</h5>
                    <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                      Diễn tả hành động thể chất hoặc tinh thần có thể nhìn thấy, đo lường hoặc thực hiện trong một khoảng thời gian cụ thể.
                    </p>
                    <p className="text-xs text-amber-700 font-bold">
                      💡 Quy tắc: Có thể sử dụng ở dạng tiếp diễn (Continuous) thoải mái để miêu tả quá trình hành động.
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100 space-y-2">
                    <h5 className="text-xs font-black text-orange-850 uppercase tracking-widest flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> Động từ Tư duy & Trạng thái (Thinking / Stative)</h5>
                    <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                      Diễn tả trạng thái nhận thức, cảm xúc, suy nghĩ hoặc mối quan hệ sở hữu.
                    </p>
                    <p className="text-xs text-orange-700 font-bold">
                      ⚠️ CẤM KỴ: Không dùng ở các thì tiếp diễn (Continuous) trừ một số ngoại lệ đổi nghĩa (như think = cân nhắc).
                    </p>
                  </div>
                </div>
              </div>

              {/* Side-by-side Grid lists */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Action Verbs List */}
                <div className="premium-card p-5 bg-white border border-slate-200 rounded-[1.5rem] space-y-4">
                  <h4 className="text-sm font-black text-amber-800 flex items-center gap-2 border-b border-slate-100 pb-3">
                    🏃‍♂️ Ví Dụ Động Từ Hành Động (Action Verbs)
                  </h4>
                  <div className="space-y-3">
                    {ACTION_VERBS.map((v, i) => (
                      <div key={i} className="p-3 bg-amber-50/40 rounded-xl border border-amber-100/50 flex items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-black text-amber-850">{v.word}</span>
                            <span className="text-[10px] text-slate-400 font-mono font-bold">{v.ipa}</span>
                            <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-black">{v.vi}</span>
                          </div>
                          <p className="text-xs text-slate-600 font-medium italic">"{v.ex}"</p>
                          <p className="text-[10px] text-slate-400 font-bold">💡 {v.exVi}</p>
                        </div>
                        <button
                          onClick={() => speak(v.word + ". " + v.ex)}
                          className="w-8 h-8 rounded-full bg-white border border-amber-200 hover:bg-amber-500 text-amber-500 hover:text-white flex items-center justify-center flex-shrink-0 cursor-pointer transition-all"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stative Categories (Accordion/Grid style) */}
                <div className="premium-card p-5 bg-white border border-slate-200 rounded-[1.5rem] space-y-4">
                  <h4 className="text-sm font-black text-orange-850 flex items-center gap-2 border-b border-slate-100 pb-3">
                    💭 Phân Loại Động Từ Trạng Thái (Stative Verbs)
                  </h4>
                  <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                    Động từ trạng thái được chia làm 4 nhóm chính. Tránh dùng dạng tiếp diễn cho các nhóm này:
                  </p>
                  <div className="space-y-4">
                    {STATIVE_CATEGORIES.map((cat, idx) => (
                      <div key={idx} className="space-y-2 border border-slate-100 rounded-2xl p-3 bg-orange-50/10">
                        <h5 className="text-xs font-black text-orange-950 flex items-center gap-1.5 border-b border-orange-100/30 pb-1">
                          {cat.title}
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {cat.verbs.map((v, vidx) => (
                            <div
                              key={vidx}
                              onClick={() => speak(v.word + ". " + v.ex)}
                              className="p-2 bg-white border border-slate-100 hover:border-orange-300 hover:bg-orange-50/20 rounded-xl transition-all cursor-pointer flex flex-col justify-between gap-1 group"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-orange-900">{v.word}</span>
                                <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-500 transition-colors" />
                              </div>
                              <span className="text-[10px] text-slate-400 font-bold">{v.ipa}</span>
                              <span className="text-[9px] bg-orange-50 text-orange-800 px-1 py-0.5 rounded font-black self-start">{v.vi}</span>
                              <span className="text-[9px] text-slate-400 italic font-medium mt-1 truncate">"{v.ex}"</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dual-Nature Verbs */}
              <div className="premium-card p-5 bg-white border border-slate-200 rounded-[1.5rem] space-y-4">
                <h4 className="text-sm font-black text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                  <span>🌓 Động Từ Mang Hai Bản Chất (Stative & Dynamic Dual Nature)</span>
                </h4>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Một số động từ thay đổi nghĩa hoàn toàn khi được chuyển từ trạng thái tĩnh (Stative) sang động (Dynamic). Xem so sánh chi tiết:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {DUAL_NATURE_VERBS.map((dv, idx) => (
                    <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3 hover:border-amber-400 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-amber-700 uppercase">{dv.verb}</span>
                          <span className="text-[11px] text-slate-400 font-mono font-bold">{dv.ipa}</span>
                        </div>
                        <button
                          onClick={() => speak(dv.verb + ". " + dv.stativeUsage + ". " + dv.dynamicUsage)}
                          className="w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-450 hover:text-amber-500 hover:border-amber-500 flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 bg-white border border-slate-100 rounded-xl space-y-1">
                          <p className="font-black text-slate-400 uppercase tracking-widest text-[8px]">🔒 Nghĩa Tĩnh (Stative)</p>
                          <p className="font-bold text-slate-805">"{dv.stativeUsage}"</p>
                          <p className="text-slate-500 font-medium">{dv.stativeVi}</p>
                        </div>
                        <div className="p-2.5 bg-amber-50/30 border border-amber-100 rounded-xl space-y-1">
                          <p className="font-black text-amber-700 uppercase tracking-widest text-[8px]">⚡ Nghĩa Động (Dynamic)</p>
                          <p className="font-bold text-slate-805">"{dv.dynamicUsage}"</p>
                          <p className="text-amber-700 font-semibold">{dv.dynamicVi}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Standard VERB_TYPES Categories */}
              <div className="premium-card p-5 bg-white border border-slate-200 rounded-[1.5rem]">
                <h4 className="text-sm font-black text-slate-700 uppercase tracking-wider mb-4">Các loại động từ khác trong tiếng Anh</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {VERB_TYPES.map((vt, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 space-y-2">
                      <h5 className="text-sm font-black text-amber-800">{vt.type}</h5>
                      <p className="text-xs text-slate-600 font-medium">{vt.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {vt.examples.map((ex, j) => (
                          <button key={j} onClick={() => speak(ex)} className="text-xs px-2.5 py-1 rounded-full bg-white border border-amber-200 text-amber-700 font-bold hover:bg-amber-500 hover:text-white transition-all cursor-pointer">
                            {ex}
                          </button>
                        ))}
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium italic">{vt.vi}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: CONJUGATION PLAYGROUND */}
          {verbSection === 'playground' && (
            <div className="premium-card p-5 sm:p-6 bg-white border border-slate-200 rounded-[1.5rem] space-y-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">PLAYGROUND</span>
                <h2 className="text-xl font-black text-slate-805 mt-2">Sân chơi chia động từ tương tác</h2>
                <p className="text-xs text-slate-500 mt-1">Chọn Động từ, Chủ ngữ và Thì để xem dạng chia tương tương ứng ở các thể Khẳng định, Phủ định và Nghi vấn.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                {/* Select Verb */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">1. Chọn Động Từ</label>
                  <select
                    value={playgroundVerb}
                    onChange={(e) => setPlaygroundVerb(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/25"
                  >
                    {[
                      { val: 'be', lbl: 'be (thì, là, ở)' },
                      { val: 'have', lbl: 'have (có)' },
                      { val: 'do', lbl: 'do (làm)' },
                      { val: 'go', lbl: 'go (đi)' },
                      { val: 'make', lbl: 'make (làm, tạo)' },
                      { val: 'know', lbl: 'know (biết - Stative)' },
                      { val: 'think', lbl: 'think (nghĩ - Stative/Dynamic)' },
                      { val: 'see', lbl: 'see (nhìn thấy - Stative/Dynamic)' },
                      { val: 'run', lbl: 'run (chạy)' },
                      { val: 'speak', lbl: 'speak (nói)' },
                      { val: 'work', lbl: 'work (làm việc)' },
                      { val: 'play', lbl: 'play (chơi)' },
                      { val: 'study', lbl: 'study (học)' },
                      { val: 'write', lbl: 'write (viết)' },
                      { val: 'eat', lbl: 'eat (ăn)' },
                      { val: 'drink', lbl: 'drink (uống)' }
                    ].map(item => (
                      <option key={item.val} value={item.val}>{item.lbl}</option>
                    ))}
                  </select>
                </div>

                {/* Select Subject */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">2. Chọn Chủ Ngữ</label>
                  <select
                    value={playgroundSubject}
                    onChange={(e) => setPlaygroundSubject(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/25"
                  >
                    {['I', 'You', 'He', 'She', 'It', 'We', 'They'].map(sub => (
                      <option key={sub} value={sub}>{sub} (Ngôi {sub === 'I' ? '1 số ít' : ['He', 'She', 'It'].includes(sub) ? '3 số ít' : ['We', 'They'].includes(sub) ? 'số nhiều' : '2'})</option>
                    ))}
                  </select>
                </div>

                {/* Select Tense */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">3. Chọn Thì (Tense)</label>
                  <select
                    value={playgroundTense}
                    onChange={(e) => setPlaygroundTense(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/25"
                  >
                    {[
                      'Present Simple',
                      'Present Continuous',
                      'Past Simple',
                      'Present Perfect',
                      'Future Simple'
                    ].map(t => (
                      <option key={t} value={t}>{t === 'Present Simple' ? 'Present Simple (Hiện tại đơn)' : t === 'Present Continuous' ? 'Present Continuous (Hiện tại tiếp diễn)' : t === 'Past Simple' ? 'Past Simple (Quá khứ đơn)' : t === 'Present Perfect' ? 'Present Perfect (Hiện tại hoàn thành)' : 'Future Simple (Tương lai đơn)'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Conjugation results */}
              {(() => {
                const res = conjugateVerb(playgroundVerb, playgroundSubject, playgroundTense);
                return (
                  <div className="space-y-4 pt-2">
                    {/* Stative warning if any */}
                    {res.isStativeWarning && (
                      <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-2.5 text-rose-800 text-xs font-semibold">
                        <Info className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          ⚠️ Cảnh báo Động từ Trạng thái: <strong>"{playgroundVerb}"</strong> là động từ mô tả trạng thái nhận thức hoặc cảm giác. Trong tiếng Anh chuẩn, ta rất hiếm khi sử dụng ở thể tiếp diễn (Continuous) trừ những ngữ cảnh đặc biệt chỉ hành động tạm thời hoặc chuyển đổi trạng thái.
                        </p>
                      </div>
                    )}

                    {/* Positive, Negative, Question Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Positive Card */}
                      <div className="p-4 bg-emerald-50/40 border border-emerald-100/50 rounded-2xl space-y-2 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-black text-emerald-700 bg-emerald-105 px-2.5 py-0.5 rounded-full uppercase tracking-wider">(+) Khẳng Định</span>
                          <p className="text-base sm:text-lg font-black text-slate-800 mt-2 select-all">"{res.positive}"</p>
                        </div>
                        <button
                          onClick={() => speak(res.positive)}
                          className="mt-3 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-emerald-200 hover:bg-emerald-500 hover:text-white text-emerald-700 rounded-xl text-xs font-bold transition-all cursor-pointer self-start"
                        >
                          <Volume2 className="w-3.5 h-3.5" /> Nghe phát âm
                        </button>
                      </div>

                      {/* Negative Card */}
                      <div className="p-4 bg-rose-50/40 border border-rose-100/50 rounded-2xl space-y-2 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-black text-rose-700 bg-rose-105 px-2.5 py-0.5 rounded-full uppercase tracking-wider">(-) Phủ Định</span>
                          <p className="text-base sm:text-lg font-black text-slate-800 mt-2 select-all">"{res.negative}"</p>
                        </div>
                        <button
                          onClick={() => speak(res.negative)}
                          className="mt-3 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-rose-200 hover:bg-rose-500 hover:text-white text-rose-700 rounded-xl text-xs font-bold transition-all cursor-pointer self-start"
                        >
                          <Volume2 className="w-3.5 h-3.5" /> Nghe phát âm
                        </button>
                      </div>

                      {/* Question Card */}
                      <div className="p-4 bg-sky-50/40 border border-sky-100/50 rounded-2xl space-y-2 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-black text-sky-700 bg-sky-105 px-2.5 py-0.5 rounded-full uppercase tracking-wider">(?) Nghi Vấn</span>
                          <p className="text-base sm:text-lg font-black text-slate-805 mt-2 select-all">"{res.question}"</p>
                        </div>
                        <button
                          onClick={() => speak(res.question)}
                          className="mt-3 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-sky-200 hover:bg-sky-500 hover:text-white text-sky-700 rounded-xl text-xs font-bold transition-all cursor-pointer self-start"
                        >
                          <Volume2 className="w-3.5 h-3.5" /> Nghe phát âm
                        </button>
                      </div>
                    </div>

                    {/* Explanation */}
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1.5">
                      <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Info className="w-4 h-4 text-amber-500" /> Giải thích chi tiết:
                      </h4>
                      <p className="text-xs text-slate-650 font-semibold leading-relaxed whitespace-pre-line">
                        {res.explanation}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* SECTION 4: CONJUGATION RULES & MODELS */}
          {verbSection === 'conjugation' && (
            <div className="space-y-6">
              {/* Spelling Rules Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {CONJUGATION_RULES.map((section, idx) => (
                  <div key={idx} className="premium-card p-5 bg-white border border-slate-200 rounded-[1.5rem] space-y-3">
                    <h4 className="text-xs font-black text-amber-850 uppercase tracking-widest border-b border-slate-100 pb-2">
                      {section.title}
                    </h4>
                    <div className="space-y-2.5">
                      {section.rules.map((r, rIdx) => (
                        <div key={rIdx} className="space-y-1">
                          <p className="text-xs font-bold text-slate-800">{r.cond}</p>
                          <p className="text-[11px] text-slate-500 font-medium">{r.rule}: <span className="font-bold text-amber-600">{r.ex}</span></p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tense Conjugation Models */}
              <div className="premium-card p-5 bg-white border border-slate-200 rounded-[1.5rem] space-y-4">
                <h4 className="text-sm font-black text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                  <span>📅 Bảng mẫu chia động từ các thì cơ bản (Conjugation Models)</span>
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Regular model */}
                  <div className="space-y-3">
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-250 flex justify-between items-center">
                      <span className="text-xs font-black text-amber-900 uppercase">Regular: {CONJUGATION_MODELS.regular.verb}</span>
                      <span className="text-[10px] text-slate-400 font-bold">({CONJUGATION_MODELS.regular.vi})</span>
                    </div>
                    <div className="space-y-2">
                      {CONJUGATION_MODELS.regular.tenses.map((t, idx) => (
                        <div key={idx} className="p-2.5 bg-slate-50 rounded-lg text-xs space-y-1 border border-slate-100">
                          <p className="font-black text-slate-700 text-[10px] uppercase tracking-wider">{t.tense}</p>
                          <p className="text-slate-500 font-medium">I / They: <span className="font-bold text-slate-800">{t.i}</span></p>
                          <p className="text-slate-500 font-medium">He / She / It: <span className="font-bold text-amber-600">{t.he}</span></p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Irregular model */}
                  <div className="space-y-3">
                    <div className="p-3 bg-orange-50 rounded-xl border border-orange-250 flex justify-between items-center">
                      <span className="text-xs font-black text-orange-900 uppercase">Irregular: {CONJUGATION_MODELS.irregular.verb}</span>
                      <span className="text-[10px] text-slate-400 font-bold">({CONJUGATION_MODELS.irregular.vi})</span>
                    </div>
                    <div className="space-y-2">
                      {CONJUGATION_MODELS.irregular.tenses.map((t, idx) => (
                        <div key={idx} className="p-2.5 bg-slate-50 rounded-lg text-xs space-y-1 border border-slate-100">
                          <p className="font-black text-slate-700 text-[10px] uppercase tracking-wider">{t.tense}</p>
                          <p className="text-slate-500 font-medium">I / They: <span className="font-bold text-slate-800">{t.i}</span></p>
                          <p className="text-slate-500 font-medium">He / She / It: <span className="font-bold text-orange-600">{t.he}</span></p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stative/Thinking model */}
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 rounded-xl border border-red-250 flex justify-between items-center">
                      <span className="text-xs font-black text-red-900 uppercase">Stative: {CONJUGATION_MODELS.thinking.verb}</span>
                      <span className="text-[10px] text-slate-400 font-bold">({CONJUGATION_MODELS.thinking.vi})</span>
                    </div>
                    <div className="space-y-2">
                      {CONJUGATION_MODELS.thinking.tenses.map((t, idx) => (
                        <div key={idx} className="p-2.5 bg-slate-50 rounded-lg text-xs space-y-1 border border-slate-100">
                          <p className="font-black text-slate-700 text-[10px] uppercase tracking-wider">{t.tense}</p>
                          {t.note ? (
                            <p className="text-[10px] text-rose-505 font-black leading-normal">{t.note}</p>
                          ) : (
                            <>
                              <p className="text-slate-500 font-medium">I / They: <span className="font-bold text-slate-800">{t.i}</span></p>
                              <p className="text-slate-500 font-medium">He / She / It: <span className="font-bold text-red-600">{t.he}</span></p>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: PRACTICE INTERACTIVE QUIZ */}
          {verbSection === 'practice' && (
            <div className="space-y-6">
              {/* Mode Selection Tabs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {[
                  { id: 'quiz' as const, label: 'Trắc Nghiệm', icon: HelpCircle, desc: 'Luyện 30 câu hỏi chia thì' },
                  { id: 'fill-in' as const, label: 'Tự Luận & Sửa Lỗi', icon: FileText, desc: 'Gõ đáp án tự luận trực quan' },
                  { id: 'analyzer' as const, label: 'AI Verb Analyzer', icon: Search, desc: 'Phân tích hình thái từ nhập' },
                  { id: 'predictor' as const, label: 'AI Clue Predictor', icon: Sparkles, desc: 'Dự đoán từ dấu hiệu câu hỏi' }
                ].map(m => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setPracticeMode(m.id)}
                      className={cn(
                        "p-3.5 rounded-[1.25rem] font-black text-xs transition-all flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer border-2 active:scale-98 select-none",
                        practiceMode === m.id
                          ? "bg-amber-600 border-amber-600 text-white shadow-lg shadow-amber-600/10"
                          : "bg-white border-slate-100 text-slate-500 hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50/20"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-extrabold">{m.label}</span>
                      <span className={cn("text-[9px] font-semibold mt-0.5", practiceMode === m.id ? "text-amber-100" : "text-slate-400")}>{m.desc}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mode 1: Multiple Choice Quiz */}
              {practiceMode === 'quiz' && (
                <div className="premium-card p-6 bg-white border border-slate-200 rounded-[1.5rem] space-y-6">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">TRẮC NGHIỆM</span>
                    <h2 className="text-xl font-black text-slate-800 mt-2">Trắc Nghiệm Chia Động Từ</h2>
                    <p className="text-xs text-slate-500 mt-1">Luyện tập nhận diện thì và hình thái chia động từ thông qua bộ câu hỏi trắc nghiệm (30 câu).</p>
                  </div>

                  {!verbQuizFinished && verbQuizList.length > 0 && verbQuizList[verbQuizIndex] ? (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
                        <span>Câu {verbQuizIndex + 1} / {verbQuizList.length}</span>
                        <span>Điểm: {verbQuizScore}</span>
                      </div>

                      <div className="p-5 bg-amber-900 text-white rounded-2xl shadow-inner font-bold text-base leading-relaxed text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />
                        <span className="text-[10px] text-amber-300 font-black uppercase tracking-widest block mb-2 font-mono">BÀI TẬP</span>
                        "{verbQuizList[verbQuizIndex].question}"
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {verbQuizList[verbQuizIndex].options.map((opt: string) => {
                          const isCorrect = opt === verbQuizList[verbQuizIndex].answer;
                          const isSelected = verbSelectedAnswer === opt;
                          const hasAnswered = verbSelectedAnswer !== null;

                          return (
                            <button
                              key={opt}
                              disabled={hasAnswered}
                              onClick={() => {
                                if (verbSelectedAnswer !== null) return;
                                setVerbSelectedAnswer(opt);
                                if (opt === verbQuizList[verbQuizIndex].answer) {
                                  setVerbQuizScore(prev => prev + 1);
                                }
                              }}
                              className={cn(
                                "p-4 rounded-xl border-2 text-sm font-black text-center transition-all cursor-pointer select-none",
                                hasAnswered
                                  ? isCorrect
                                    ? "bg-emerald-50 border-emerald-500 text-emerald-700 font-black"
                                    : isSelected
                                      ? "bg-rose-50 border-rose-500 text-rose-700 font-black"
                                      : "bg-white border-slate-200 text-slate-400 font-bold"
                                  : "bg-white border-slate-200 text-slate-700 hover:border-amber-500 hover:bg-amber-50/30 active:scale-95 font-bold"
                              )}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {verbSelectedAnswer !== null && (
                        <div
                          className={cn(
                            "p-4 rounded-2xl border animate-in slide-in-from-top-2 duration-300",
                            verbSelectedAnswer === verbQuizList[verbQuizIndex].answer
                              ? "bg-emerald-50/50 border-emerald-200 text-emerald-800"
                              : "bg-rose-50/50 border-rose-200 text-rose-800"
                          )}
                        >
                          <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-1.5">
                            {verbSelectedAnswer === verbQuizList[verbQuizIndex].answer ? (
                              <>🎉 Quá tuyệt vời! Trả lời chính xác.</>
                            ) : (
                              <>⚠️ Cần chú ý quy tắc rồi!</>
                            )}
                          </h4>
                          <p className="text-xs font-medium mt-1 leading-relaxed">{verbQuizList[verbQuizIndex].explanation}</p>

                          <button
                            onClick={() => {
                              setVerbSelectedAnswer(null);
                              if (verbQuizIndex < verbQuizList.length - 1) {
                                setVerbQuizIndex(prev => prev + 1);
                              } else {
                                setVerbQuizFinished(true);
                              }
                            }}
                            className="mt-3 w-full bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider py-2.5 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            Tiếp tục <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 space-y-4">
                      <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto border border-amber-100 shadow-md">
                        <Trophy className="w-10 h-10" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-black text-slate-850">Hoàn Thành Thử Thách Trắc Nghiệm!</h3>
                        <p className="text-xs text-slate-400 font-bold">Điểm của bạn: <span className="text-amber-600 font-black text-sm">{verbQuizScore}</span> / {verbQuizList.length}</p>
                      </div>
                      <button
                        onClick={() => {
                          const shuffled = [...VERB_QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
                          setVerbQuizList(shuffled.slice(0, 10));
                          setVerbQuizIndex(0);
                          setVerbSelectedAnswer(null);
                          setVerbQuizScore(0);
                          setVerbQuizFinished(false);
                        }}
                        className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                      >
                        Luyện tập lại
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Mode 2: Fill-in / Write-in Quiz */}
              {practiceMode === 'fill-in' && (
                <div className="premium-card p-6 bg-white border border-slate-200 rounded-[1.5rem] space-y-6">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">TỰ LUẬN & PHÂN TÍCH</span>
                    <h2 className="text-xl font-black text-slate-800 mt-2">Gõ Câu Trả Lời & Phân Tích Lỗi Sai</h2>
                    <p className="text-xs text-slate-500 mt-1">Học chủ động bằng cách tự gõ câu trả lời. Hệ thống AI sẽ phân tích hình thái từ bạn nhập để sửa lỗi chi tiết.</p>
                  </div>

                  {!fillInFinished && fillInList.length > 0 && fillInList[fillInIndex] ? (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
                        <span>Câu {fillInIndex + 1} / {fillInList.length}</span>
                        <span>Điểm: {fillInScore}</span>
                      </div>

                      {/* Question Block */}
                      <div className="p-5 bg-orange-900 text-white rounded-2xl shadow-inner font-bold text-base leading-relaxed text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/10 to-transparent pointer-events-none" />
                        <span className="text-[10px] text-orange-300 font-black uppercase tracking-widest block mb-2 font-mono">ĐIỀN DẠNG ĐÚNG CỦA ĐỘNG TỪ TRONG NGOẶC</span>
                        "{fillInList[fillInIndex].sentence}"
                      </div>

                      {/* Input Form */}
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (fillInFeedback !== null || !fillInUserAnswer.trim()) return;

                          const q = fillInList[fillInIndex];
                          const cleanedInput = fillInUserAnswer.trim().toLowerCase();
                          const isCorrect = q.correctAnswers.some((ans: string) => ans.trim().toLowerCase() === cleanedInput);

                          const analysis = analyzeUserVerb(fillInUserAnswer, q.verb, COMMON_VERBS);
                          
                          setFillInFeedback({
                            isCorrect,
                            detectedForm: analysis.detectedForm,
                            clueUsed: q.clue,
                            msg: isCorrect 
                              ? `Tuyệt vời! Bạn đã chia chính xác động từ "${q.verb}" ở dạng ${q.expectedForm} thành "${cleanedInput}".`
                              : `Chưa chính xác. Dấu hiệu trong câu là "${q.clue}" yêu cầu động từ phải chia ở dạng ${q.expectedForm} (ví dụ: "${q.correctAnswers.join(' hoặc ')}"). Bạn đã nhập từ "${fillInUserAnswer}" ở dạng "${analysis.detectedForm}".`
                          });

                          if (isCorrect) {
                            setFillInScore(prev => prev + 1);
                          }
                        }}
                        className="space-y-3"
                      >
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Gõ câu trả lời của bạn vào đây:</label>
                          <input
                            type="text"
                            value={fillInUserAnswer}
                            disabled={fillInFeedback !== null}
                            onChange={(e) => setFillInUserAnswer(e.target.value)}
                            placeholder={`Gõ từ thích hợp để điền vào chỗ trống (Ví dụ: ${fillInList[fillInIndex].verb === 'go' ? 'went' : 'written'})...`}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:bg-slate-50 disabled:text-slate-500"
                          />
                        </div>
                        {fillInFeedback === null && (
                          <button
                            type="submit"
                            disabled={!fillInUserAnswer.trim()}
                            className="w-full py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer active:scale-95"
                          >
                            Kiểm tra kết quả
                          </button>
                        )}
                      </form>

                      {/* feedback card */}
                      {fillInFeedback !== null && (
                        <div
                          className={cn(
                            "p-4 rounded-2xl border animate-in slide-in-from-top-2 duration-300 space-y-3",
                            fillInFeedback.isCorrect
                              ? "bg-emerald-50/50 border-emerald-200 text-emerald-800"
                              : "bg-rose-50/50 border-rose-200 text-rose-800"
                          )}
                        >
                          <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-1.5">
                            {fillInFeedback.isCorrect ? (
                              <>🎉 Câu trả lời hoàn hảo!</>
                            ) : (
                              <>⚠️ Phân tích câu trả lời của bạn</>
                            )}
                          </h4>
                          
                          <div className="space-y-2">
                            <p className="text-xs font-semibold leading-relaxed">{fillInFeedback.msg}</p>
                            
                            <div className="p-3 bg-white/70 border border-slate-200/40 rounded-xl space-y-1.5 text-slate-700">
                              <p className="text-[11px] font-bold">
                                🔑 <span className="text-slate-400">Dấu hiệu nhận biết:</span> {fillInList[fillInIndex].clue}
                              </p>
                              <p className="text-[11px] font-bold">
                                📅 <span className="text-slate-400">Dạng đúng dự kiến:</span> <span className="text-orange-600">{fillInList[fillInIndex].expectedForm}</span>
                              </p>
                              <p className="text-[11px] font-semibold text-slate-550 italic leading-relaxed">
                                {fillInList[fillInIndex].explanation}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setFillInFeedback(null);
                              setFillInUserAnswer('');
                              if (fillInIndex < fillInList.length - 1) {
                                setFillInIndex(prev => prev + 1);
                              } else {
                                setFillInFinished(true);
                              }
                            }}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider py-2.5 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            Tiếp tục <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 space-y-4">
                      <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto border border-orange-100 shadow-md">
                        <Trophy className="w-10 h-10" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-black text-slate-850">Hoàn Thành Thử Thách Tự Luận!</h3>
                        <p className="text-xs text-slate-400 font-bold">Điểm của bạn: <span className="text-orange-600 font-black text-sm">{fillInScore}</span> / {fillInList.length}</p>
                      </div>
                      <button
                        onClick={() => {
                          const shuffledFillIn = [...VERB_FILL_IN_QUESTIONS].sort(() => Math.random() - 0.5);
                          setFillInList(shuffledFillIn.slice(0, 10));
                          setFillInIndex(0);
                          setFillInUserAnswer('');
                          setFillInFeedback(null);
                          setFillInScore(0);
                          setFillInFinished(false);
                        }}
                        className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                      >
                        Luyện tập lại
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Mode 3: AI Verb Form Analyzer */}
              {practiceMode === 'analyzer' && (
                <div className="premium-card p-6 bg-white border border-slate-200 rounded-[1.5rem] space-y-6">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">AI VERB ANALYZER</span>
                    <h2 className="text-xl font-black text-slate-800 mt-2">Bộ Phân Tích Hình Thái Động Từ</h2>
                    <p className="text-xs text-slate-500 mt-1">Gõ một dạng chia động từ bất kỳ của động từ gốc. AI sẽ nhận dạng hình thái của từ đó và chỉ ra dạng câu hỏi tương thích.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Control Panel */}
                    <div className="space-y-4">
                      {/* Select Verb */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">1. Chọn Động Từ Gốc (Infinitive)</label>
                        <select
                          value={analyzerTargetVerb}
                          onChange={(e) => setAnalyzerTargetVerb(e.target.value)}
                          className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                        >
                          {[
                            { val: 'go', lbl: 'go (đi - V2: went, V3: gone)' },
                            { val: 'write', lbl: 'write (viết - V2: wrote, V3: written)' },
                            { val: 'do', lbl: 'do (làm - V2: did, V3: done)' },
                            { val: 'run', lbl: 'run (chạy - V2: ran, V3: run)' },
                            { val: 'study', lbl: 'study (học - V2: studied, V3: studied)' },
                            { val: 'eat', lbl: 'eat (ăn - V2: ate, V3: eaten)' },
                            { val: 'speak', lbl: 'speak (nói - V2: spoke, V3: spoken)' },
                            { val: 'swim', lbl: 'swim (bơi - V2: swam, V3: swum)' },
                            { val: 'sleep', lbl: 'sleep (ngủ - V2: slept, V3: slept)' },
                            { val: 'drink', lbl: 'drink (uống - V2: drank, V3: drunk)' },
                            { val: 'fly', lbl: 'fly (bay - V2: flew, V3: flown)' }
                          ].map(item => (
                            <option key={item.val} value={item.val}>{item.lbl}</option>
                          ))}
                        </select>
                      </div>

                      {/* Type Verb form */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">2. Gõ từ chia bạn muốn phân tích:</label>
                        <input
                          type="text"
                          value={analyzerUserAnswer}
                          onChange={(e) => setAnalyzerUserAnswer(e.target.value)}
                          placeholder={`Gõ dạng chia của "${analyzerTargetVerb}" (Ví dụ: ${analyzerTargetVerb === 'go' ? 'went, going, goes' : 'wrote, writing'})...`}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                        />
                      </div>

                      {/* Common forms buttons */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Gợi ý nhanh cho từ "{analyzerTargetVerb}":</label>
                        <div className="flex flex-wrap gap-1.5">
                          {(() => {
                            const v = analyzerTargetVerb;
                            const entry = COMMON_VERBS.find(x => x.verb.toLowerCase() === v);
                            const options = [
                              { label: 'V1', val: v },
                              { label: 'V2', val: entry ? entry.v2 : v + 'ed' },
                              { label: 'V3', val: entry ? entry.v3 : v + 'ed' },
                              { label: 'V-ing', val: v.endsWith('e') ? v.slice(0, -1) + 'ing' : v.endsWith('y') ? v.slice(0, -1) + 'ying' : v + 'ing' },
                              { label: 'V-s/es', val: v.endsWith('y') ? v.slice(0, -1) + 'ies' : v + 's' }
                            ];
                            return options.map(opt => (
                              <button
                                key={opt.label}
                                onClick={() => setAnalyzerUserAnswer(opt.val)}
                                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 hover:border-sky-500 hover:bg-sky-50/50 rounded-lg text-[10px] font-bold text-slate-600 transition-all cursor-pointer"
                              >
                                {opt.label}: <strong>{opt.val}</strong>
                              </button>
                            ));
                          })()}
                        </div>
                      </div>
                    </div>

                    {/* Result Panel */}
                    <div className="p-5 bg-slate-50/50 border border-slate-200 rounded-2xl space-y-4">
                      <div className="border-b border-slate-200 pb-2">
                        <span className="text-[10px] font-black text-slate-400 tracking-widest">KẾT QUẢ PHÂN TÍCH CHIA TỪ</span>
                        <h4 className="text-sm font-black text-slate-800 mt-1">AI Morphological Diagnosis</h4>
                      </div>

                      {analyzerUserAnswer.trim() ? (
                        (() => {
                          const res = analyzeUserVerb(analyzerUserAnswer, analyzerTargetVerb, COMMON_VERBS);
                          return (
                            <div className="space-y-4 animate-in fade-in duration-300">
                              <div className="p-3 bg-sky-50 border border-sky-100 rounded-xl">
                                <span className="text-[10px] font-mono text-sky-800 font-bold uppercase block">HÌNH THÁI XÁC ĐỊNH (FORM DETECTED)</span>
                                <span className="text-sm font-black text-sky-900 mt-0.5 block">{res.detectedForm}</span>
                              </div>

                              <div className="space-y-1.5 text-xs">
                                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                                  <span>📖</span> <span className="text-slate-400 font-medium">Bản chất ngữ pháp:</span>
                                </p>
                                <p className="text-slate-650 font-semibold leading-relaxed pl-5">{res.tenseDescription}</p>
                              </div>

                              <div className="space-y-1.5 text-xs">
                                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                                  <span>🔑</span> <span className="text-slate-400 font-medium">Khớp với dạng câu hỏi chứa dấu hiệu:</span>
                                </p>
                                <p className="text-slate-650 font-semibold leading-relaxed pl-5">{res.matchClues}</p>
                              </div>

                              <div className="space-y-1.5 text-xs">
                                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                                  <span>🧬</span> <span className="text-slate-400 font-medium">Công thức cơ bản:</span>
                                </p>
                                <code className="block p-2 bg-slate-900 text-amber-400 font-mono text-[10px] rounded-lg select-all pl-3">
                                  {res.formula}
                                </code>
                              </div>
                            </div>
                          );
                        })()
                      ) : (
                        <div className="text-center py-10 text-slate-400 flex flex-col items-center justify-center space-y-2">
                          <Search className="w-8 h-8 text-slate-300 stroke-[1.5]" />
                          <p className="text-xs font-medium">Hãy gõ một dạng động từ hoặc bấm các gợi ý nhanh bên trái để bắt đầu phân tích.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Mode 4: AI Question Clue Predictor */}
              {practiceMode === 'predictor' && (
                <div className="premium-card p-6 bg-white border border-slate-200 rounded-[1.5rem] space-y-6">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">AI PREDICTOR TOOL</span>
                    <h2 className="text-xl font-black text-slate-800 mt-2">Dự Đoán Đáp Án Từ Câu Hỏi</h2>
                    <p className="text-xs text-slate-500 mt-1">Chọn trạng ngữ hoặc cấu trúc ngữ pháp trong câu hỏi để đoán chính xác hình thái động từ (V1, V2, V3, V-ing) cần chia.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Control Panel */}
                    <div className="space-y-4">
                      {/* Select Clue */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">1. Chọn Dấu Hiệu/Cụm Từ trong Câu Hỏi</label>
                        <select
                          value={predictorClue}
                          onChange={(e) => setPredictorClue(e.target.value)}
                          className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                        >
                          <optgroup label="Thì Quá khứ">
                            <option value="yesterday">yesterday (hôm qua)</option>
                            <option value="ago">... ago (cách đây...)</option>
                            <option value="last_week">last week / last month</option>
                            <option value="in_past_year">in + năm quá khứ (ví dụ: in 1995)</option>
                            <option value="by_the_time">by the time + Past Simple (trước mốc quá khứ)</option>
                            <option value="while">while (trong khi - hành động đang xảy ra)</option>
                          </optgroup>
                          <optgroup label="Thì Hiện tại hoàn thành">
                            <option value="since">since + mốc thời gian</option>
                            <option value="for">for + khoảng thời gian</option>
                            <option value="already">already (đã... rồi)</option>
                            <option value="yet">yet (chưa - câu phủ định/nghi vấn)</option>
                            <option value="so_far">so far / up to now (cho đến nay)</option>
                          </optgroup>
                          <optgroup label="Thì Hiện tại tiếp diễn">
                            <option value="now">now / right now (bây giờ)</option>
                            <option value="at_the_moment">at the moment</option>
                            <option value="look_listen">Look! / Listen! (Từ cảm thán gây chú ý)</option>
                          </optgroup>
                          <optgroup label="Thì Tương lai">
                            <option value="tomorrow">tomorrow (ngày mai)</option>
                            <option value="next_week">next week / next year</option>
                          </optgroup>
                          <optgroup label="Thì Hiện tại đơn">
                            <option value="always">always / usually / often (Trạng từ tần suất)</option>
                            <option value="everyday">every day / every week</option>
                          </optgroup>
                          <optgroup label="Cấu trúc Động từ đặc biệt">
                            <option value="modal_verbs">modal verbs (should, can, must...)</option>
                            <option value="to_infinitive_verbs">decide / want / plan (yêu cầu to + V1)</option>
                            <option value="gerund_verbs">enjoy / avoid / practice (yêu cầu V-ing)</option>
                          </optgroup>
                        </select>
                      </div>

                      {/* Select Verb to Preview */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">2. Chọn Động Từ Muốn Chia Thử</label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {['eat', 'write', 'go', 'swim', 'sleep', 'do'].map(v => (
                            <button
                              key={v}
                              type="button"
                              onClick={() => setPredictorVerb(v)}
                              className={cn(
                                "py-2 rounded-xl text-xs font-black transition-all border cursor-pointer",
                                predictorVerb === v
                                  ? "bg-amber-600 border-amber-600 text-white"
                                  : "bg-slate-50 border-slate-200 text-slate-700 hover:border-amber-400"
                              )}
                            >
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Result Panel */}
                    <div className="p-5 bg-amber-50/20 border border-amber-200/50 rounded-2xl space-y-4">
                      <div className="border-b border-slate-200 pb-2">
                        <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">DỰ ĐOÁN HÌNH THÁI CHIA ĐÚNG</span>
                        <h4 className="text-sm font-black text-slate-800 mt-1">AI Prediction Output</h4>
                      </div>

                      {(() => {
                        const res = predictVerbFormFromClue(predictorClue, predictorVerb, COMMON_VERBS);
                        return (
                          <div className="space-y-4 animate-in fade-in duration-300">
                            {/* Expected Form */}
                            <div className="p-3 bg-amber-50 border border-amber-250 rounded-xl">
                              <span className="text-[10px] font-mono text-amber-800 font-bold uppercase block">HÌNH THÁI CẦN CHIA (EXPECTED FORM)</span>
                              <span className="text-sm font-black text-amber-900 mt-0.5 block">{res.predictedForm}</span>
                            </div>

                            {/* Sample Answer */}
                            <div className="space-y-1">
                              <span className="text-[10px] font-black text-slate-400 uppercase block">ĐÁP ÁN DỰ ĐOÁN CHO TỪ "{predictorVerb.toUpperCase()}":</span>
                              <p className="text-base font-black text-slate-800 flex items-center gap-2">
                                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-xs">ANSWER</span>
                                <span className="text-emerald-700">{res.predictedAnswer}</span>
                              </p>
                            </div>

                            {/* Grammar Rule */}
                            <div className="space-y-1 text-xs">
                              <p className="font-bold text-slate-805 flex items-center gap-1">
                                <span>📚</span> <span className="text-slate-400 font-medium">Quy tắc ngữ pháp:</span>
                              </p>
                              <p className="text-slate-650 font-semibold leading-relaxed pl-5">{res.explanation}</p>
                            </div>

                            {/* Contextual Example */}
                            <div className="space-y-1 text-xs">
                              <p className="font-bold text-slate-805 flex items-center gap-1">
                                <span>💡</span> <span className="text-slate-400 font-medium">Ví dụ minh họa cụ thể:</span>
                              </p>
                              <p className="text-slate-705 font-bold leading-relaxed pl-5 italic select-all font-serif">
                                "{res.sampleSentence}"
                              </p>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════ ADJECTIVES (TÍNH TỪ) ═══════ */}
      {activeTab === 'adjectives' && (
        <div className="space-y-6">
          <div className="premium-card p-5 sm:p-6 bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200">
            <h3 className="text-lg font-black text-pink-800 flex items-center gap-2 mb-2">
              <Palette className="w-5 h-5 text-pink-600" /> Tính Từ Tiếng Anh (English Adjectives)
            </h3>
            <p className="text-sm text-pink-700 leading-relaxed font-medium">
              Tính từ dùng để <strong>mô tả đặc điểm</strong> của danh từ. Tính từ có 3 cấp độ: <strong>Nguyên cấp</strong> (Positive), <strong>So sánh hơn</strong> (Comparative), và <strong>So sánh nhất</strong> (Superlative).
            </p>
          </div>

          {/* Sub-navigation */}
          <div className="flex flex-wrap gap-2">
            {([{ id: 'list' as const, label: 'Bảng tính từ' }, { id: 'rules' as const, label: 'Quy tắc so sánh' }, { id: 'types' as const, label: 'Phân loại' }, { id: 'cases' as const, label: 'Đối tượng & Đuôi -ed/-ing' }, { id: 'body' as const, label: 'Ngoại hình & Bộ phận' }]).map(s => (
              <button key={s.id} onClick={() => setAdjSection(s.id)} className={cn("px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer", adjSection === s.id ? "bg-pink-600 text-white shadow-lg" : "bg-white text-slate-500 border border-slate-200 hover:border-pink-400")}>
                {s.label}
              </button>
            ))}
          </div>

          {adjSection === 'list' && (
            <div className="premium-card bg-white border border-slate-200 rounded-[1.5rem] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left px-3 sm:px-4 py-3 font-black text-slate-600 text-xs uppercase tracking-wider">Nguyên cấp</th>
                      <th className="text-left px-3 sm:px-4 py-3 font-black text-slate-600 text-xs uppercase tracking-wider">So sánh hơn</th>
                      <th className="text-left px-3 sm:px-4 py-3 font-black text-slate-600 text-xs uppercase tracking-wider">So sánh nhất</th>
                      <th className="text-left px-3 sm:px-4 py-3 font-black text-slate-600 text-xs uppercase tracking-wider hidden sm:table-cell">Quy tắc</th>
                      <th className="text-left px-3 sm:px-4 py-3 font-black text-slate-600 text-xs uppercase tracking-wider">Nghĩa</th>
                      <th className="text-center px-2 py-3 font-black text-slate-600 text-xs uppercase tracking-wider">🔊</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMMON_ADJECTIVES.map((adj, i) => (
                      <tr key={i} className="border-b border-slate-100 hover:bg-pink-50/50 transition-colors">
                        <td className="px-3 sm:px-4 py-3 font-black text-slate-800">{adj.word}</td>
                        <td className="px-3 sm:px-4 py-3 font-semibold text-pink-700">{adj.comparative}</td>
                        <td className="px-3 sm:px-4 py-3 font-semibold text-rose-700">{adj.superlative}</td>
                        <td className="px-3 sm:px-4 py-3 text-slate-400 text-xs hidden sm:table-cell">{adj.rule}</td>
                        <td className="px-3 sm:px-4 py-3 text-slate-600 font-medium text-xs">{adj.vi}</td>
                        <td className="px-2 py-3 text-center">
                          <button onClick={() => speak(adj.word)} className="w-8 h-8 rounded-full bg-pink-50 hover:bg-pink-500 text-pink-500 hover:text-white flex items-center justify-center transition-all cursor-pointer mx-auto border border-pink-100">
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {adjSection === 'rules' && (
            <div className="space-y-4">
              {ADJECTIVE_RULES.map((r, i) => (
                <div key={i} className="premium-card p-5 bg-white border border-slate-200 rounded-[1.5rem] space-y-3">
                  <h4 className="text-sm font-black text-pink-800 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-pink-100 text-pink-600 text-xs font-black flex items-center justify-center">{i + 1}</span>
                    {r.rule}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium bg-pink-50 rounded-xl px-3 py-2">{r.examples}</p>
                  <p className="text-xs text-slate-400 italic font-medium">💡 {r.note}</p>
                </div>
              ))}
            </div>
          )}

          {adjSection === 'types' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ADJECTIVE_TYPES.map((at, i) => (
                <div key={i} className="premium-card p-4 bg-white border border-slate-200 rounded-[1.5rem] space-y-2">
                  <h5 className="text-sm font-black text-pink-800">{at.type}</h5>
                  <p className="text-xs text-slate-600 font-medium">{at.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {at.examples.map((ex, j) => (
                      <span key={j} className="text-xs px-2.5 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-700 font-bold">{ex}</span>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium italic">{at.vi}</p>
                </div>
              ))}
            </div>
          )}

          {adjSection === 'cases' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Describing People Only */}
                <div className="premium-card p-5 bg-white border border-slate-200 rounded-[1.5rem] space-y-4">
                  <h4 className="text-sm font-black text-pink-800 flex items-center gap-2 border-b border-slate-100 pb-3">
                    👥 Tính Từ Chỉ Người (Personality & Physical)
                  </h4>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">
                    Dùng để tả tính cách, cảm xúc, hoặc đặc điểm thể chất đặc trưng của con người.
                  </p>
                  <div className="space-y-3">
                    {ADJECTIVES_USE_CASES.peopleOnly.map((adj, i) => (
                      <div key={i} className="p-3 bg-pink-50/50 rounded-xl border border-pink-100 flex items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-black text-pink-700">{adj.word}</span>
                            <span className="text-[10px] text-slate-400 font-mono font-bold">{adj.ipa}</span>
                            <span className="text-[10px] bg-pink-100 text-pink-800 px-1.5 py-0.5 rounded font-black">{adj.vi}</span>
                          </div>
                          <p className="text-xs text-slate-600 font-medium italic">"{adj.ex}"</p>
                          <p className="text-[10px] text-slate-400 font-bold">💡 {adj.exVi}</p>
                        </div>
                        <button onClick={() => speak(adj.word + ". " + adj.ex)} className="w-8 h-8 rounded-full bg-white border border-pink-200 hover:bg-pink-500 text-pink-500 hover:text-white flex items-center justify-center flex-shrink-0 cursor-pointer transition-all">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Describing Things / Environments Only */}
                <div className="premium-card p-5 bg-white border border-slate-200 rounded-[1.5rem] space-y-4">
                  <h4 className="text-sm font-black text-pink-800 flex items-center gap-2 border-b border-slate-100 pb-3">
                    📦 Tính Từ Chỉ Vật & Khác (Things & Space)
                  </h4>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">
                    Dùng để miêu tả đặc điểm hình dáng, không gian, trạng thái cơ học hoặc tính chất phi nhân hóa.
                  </p>
                  <div className="space-y-3">
                    {ADJECTIVES_USE_CASES.thingsOnly.map((adj, i) => (
                      <div key={i} className="p-3 bg-rose-50/50 rounded-xl border border-rose-100 flex items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-black text-rose-700">{adj.word}</span>
                            <span className="text-[10px] text-slate-400 font-mono font-bold">{adj.ipa}</span>
                            <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded font-black">{adj.vi}</span>
                          </div>
                          <p className="text-xs text-slate-600 font-medium italic">"{adj.ex}"</p>
                          <p className="text-[10px] text-slate-400 font-bold">💡 {adj.exVi}</p>
                        </div>
                        <button onClick={() => speak(adj.word + ". " + adj.ex)} className="w-8 h-8 rounded-full bg-white border border-rose-200 hover:bg-rose-500 text-rose-500 hover:text-white flex items-center justify-center flex-shrink-0 cursor-pointer transition-all">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ED vs ING Section */}
              <div className="premium-card p-5 bg-white border border-slate-200 rounded-[1.5rem] space-y-4">
                <h4 className="text-sm font-black text-pink-850 flex items-center gap-2 border-b border-slate-100 pb-3">
                  ⚠️ Phân biệt tính từ đuôi -ed và -ing (Crucial Distinction)
                </h4>
                <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl border border-pink-100 space-y-2">
                  <p className="text-xs text-pink-900 leading-relaxed font-bold">
                    📌 Quy tắc ghi nhớ:
                  </p>
                  <ul className="text-xs text-pink-850 list-disc pl-5 space-y-1 font-semibold">
                    <li><strong>Đuôi -ed:</strong> Diễn tả cảm xúc, thái độ của <strong>người</strong> trước một sự việc/sự vật. (Ví dụ: "I am bored" = Tôi thấy chán).</li>
                    <li><strong>Đuôi -ing:</strong> Diễn tả tính chất, bản chất của <strong>vật, sự việc hoặc chính con người đó</strong>. (Ví dụ: "The movie is boring" = Bộ phim tẻ nhạt).</li>
                  </ul>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-left px-3 py-2 font-black text-pink-700 bg-pink-50/50">Đuôi -ed (Feeling)</th>
                        <th className="text-left px-3 py-2 font-black text-rose-700 bg-rose-50/50">Đuôi -ing (Characteristic)</th>
                        <th className="text-center px-2 py-2 font-black text-slate-500">🔊</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ADJECTIVES_USE_CASES.edVsIng.map((pair, i) => (
                        <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                          <td className="px-3 py-3 space-y-1 bg-pink-50/20">
                            <div className="flex items-center gap-1.5">
                              <span className="font-black text-pink-800">{pair.ed}</span>
                              <span className="text-[10px] font-bold text-slate-400 font-mono italic">({pair.edVi})</span>
                            </div>
                            <p className="text-[11px] text-slate-600 font-medium italic">"{pair.exEd}"</p>
                            <p className="text-[10px] text-slate-400 font-bold">💡 {pair.exEdVi}</p>
                          </td>
                          <td className="px-3 py-3 space-y-1 bg-rose-50/20">
                            <div className="flex items-center gap-1.5">
                              <span className="font-black text-rose-800">{pair.ing}</span>
                              <span className="text-[10px] font-bold text-slate-400 font-mono italic">({pair.ingVi})</span>
                            </div>
                            <p className="text-[11px] text-slate-600 font-medium italic">"{pair.exIng}"</p>
                            <p className="text-[10px] text-slate-400 font-bold">💡 {pair.exIngVi}</p>
                          </td>
                          <td className="px-2 py-3 text-center">
                            <button onClick={() => speak(`${pair.ed}. ${pair.exEd}. ${pair.ing}. ${pair.exIng}`)} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-pink-500 text-slate-500 hover:text-white flex items-center justify-center cursor-pointer transition-all mx-auto">
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {adjSection === 'body' && (
            <div className="space-y-6">
              {/* Alert card / Common Mistakes */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                <h4 className="text-xs font-black text-amber-850 flex items-center gap-2">
                  💡 LƯU Ý QUAN TRỌNG KHI TẢ BỘ PHẬN & NGOẠI HÌNH
                </h4>
                <p className="text-xs text-amber-700 leading-relaxed font-semibold">
                  Tránh dịch thô (word-by-word) từ tiếng Việt sang tiếng Anh khi mô tả các bộ phận cơ thể. Ví dụ:
                </p>
                <ul className="text-xs text-amber-700 list-disc pl-5 space-y-1 font-medium">
                  <li><strong>Mũi thẳng:</strong> Dùng <span className="font-bold text-amber-900">straight nose</span>, không dùng <span className="line-through text-red-500 font-bold">long nose</span> (mũi dài - gợi liên tưởng mũi của Pinocchio khi nói dối).</li>
                  <li><strong>Mắt hai mí:</strong> Dùng <span className="font-bold text-amber-900">double-lidded eyes</span>, tránh dịch bừa thành <span className="line-through text-red-500 font-bold">two-eyelid eyes</span>.</li>
                  <li><strong>Mũi dọc dừa:</strong> Thường dùng <span className="font-bold text-amber-900">pointed nose</span> hoặc <span className="font-bold text-amber-900">straight, high nose</span> để mô tả độ cao và thanh thoát.</li>
                </ul>
              </div>

              {/* Grid of Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ADJECTIVES_BODY_PARTS.map((cat, i) => (
                  <div key={i} className="premium-card p-5 bg-white border border-slate-200 rounded-[1.5rem] space-y-4">
                    <h4 className="text-sm font-black text-pink-800 flex items-center gap-2 border-b border-slate-100 pb-3">
                      ✨ {cat.category}
                    </h4>
                    <p className="text-xs text-slate-500 font-bold leading-relaxed">
                      {cat.desc}
                    </p>
                    <div className="space-y-3">
                      {cat.items.map((item, j) => (
                        <div key={j} className="p-3 bg-pink-50/30 rounded-xl border border-pink-100/50 flex items-center justify-between gap-3 hover:border-pink-300 transition-colors">
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-black text-pink-700">{item.word}</span>
                              <span className="text-[10px] text-slate-400 font-mono font-bold">{item.ipa}</span>
                              <span className="text-[10px] bg-pink-100 text-pink-800 px-1.5 py-0.5 rounded font-black">{item.vi}</span>
                            </div>
                            <p className="text-[10px] text-slate-500 font-semibold italic">({item.note})</p>
                            <p className="text-xs text-slate-600 font-semibold italic">"{item.ex}"</p>
                            <p className="text-[10px] text-slate-400 font-bold">💡 {item.exVi}</p>
                          </div>
                          <button onClick={() => speak(item.word + ". " + item.ex)} className="w-8 h-8 rounded-full bg-white border border-pink-200 hover:bg-pink-500 text-pink-500 hover:text-white flex items-center justify-center flex-shrink-0 cursor-pointer transition-all">
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════ POSSESSIVES (ĐẠI TỪ SỞ HỮU) ══ */}
      {activeTab === 'possessives' && (
        <div className="space-y-6">
          <div className="premium-card p-5 sm:p-6 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
            <h3 className="text-lg font-black text-teal-800 flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-teal-600" /> Đại Từ Sở Hữu (Possessive Pronouns)
            </h3>
            <p className="text-sm text-teal-700 leading-relaxed font-medium">
              Hệ thống đại từ sở hữu gồm 3 loại chính: <strong>Tính từ sở hữu</strong> (my, your...), <strong>Đại từ sở hữu</strong> (mine, yours...) và <strong>Đại từ phản thân</strong> (myself, yourself...).
            </p>
          </div>

          {/* Sub-navigation */}
          <div className="flex flex-wrap gap-2">
            {([{ id: 'table' as const, label: 'Bảng tổng hợp' }, { id: 'rules' as const, label: 'Quy tắc sử dụng' }]).map(s => (
              <button key={s.id} onClick={() => setPossSection(s.id)} className={cn("px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer", possSection === s.id ? "bg-teal-600 text-white shadow-lg" : "bg-white text-slate-500 border border-slate-200 hover:border-teal-400")}>
                {s.label}
              </button>
            ))}
          </div>

          {possSection === 'table' && (
            <div className="space-y-4">
              {/* Comprehensive Table */}
              <div className="premium-card bg-white border border-slate-200 rounded-[1.5rem] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-left px-3 py-3 font-black text-slate-600 text-xs uppercase tracking-wider">Chủ ngữ</th>
                        <th className="text-left px-3 py-3 font-black text-slate-600 text-xs uppercase tracking-wider">Tân ngữ</th>
                        <th className="text-left px-3 py-3 font-black text-teal-600 text-xs uppercase tracking-wider bg-teal-50">TT sở hữu</th>
                        <th className="text-left px-3 py-3 font-black text-cyan-600 text-xs uppercase tracking-wider bg-cyan-50">ĐT sở hữu</th>
                        <th className="text-left px-3 py-3 font-black text-slate-600 text-xs uppercase tracking-wider hidden sm:table-cell">Phản thân</th>
                        <th className="text-center px-2 py-3 font-black text-slate-600 text-xs uppercase tracking-wider">🔊</th>
                      </tr>
                    </thead>
                    <tbody>
                      {POSSESSIVE_TABLE.map((row, i) => (
                        <tr key={i} className="border-b border-slate-100 hover:bg-teal-50/50 transition-colors">
                          <td className="px-3 py-3 font-black text-slate-800">{row.subject}</td>
                          <td className="px-3 py-3 font-semibold text-slate-600">{row.object}</td>
                          <td className="px-3 py-3 font-black text-teal-700 bg-teal-50/30">{row.possAdj}</td>
                          <td className="px-3 py-3 font-black text-cyan-700 bg-cyan-50/30">{row.possPron}</td>
                          <td className="px-3 py-3 font-semibold text-slate-500 hidden sm:table-cell">{row.reflexive}</td>
                          <td className="px-2 py-3 text-center">
                            <button onClick={() => speak(`${row.possAdj}, ${row.possPron}`)} className="w-8 h-8 rounded-full bg-teal-50 hover:bg-teal-500 text-teal-500 hover:text-white flex items-center justify-center transition-all cursor-pointer mx-auto border border-teal-100">
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Example Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {POSSESSIVE_TABLE.filter(r => r.possPron !== '(không dùng)').map((row, i) => (
                  <div key={i} className="premium-card p-4 bg-white border border-slate-200 rounded-[1.5rem] space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 font-black text-sm flex items-center justify-center">{row.subject}</span>
                      <span className="text-xs font-bold text-slate-500">{row.vi}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-teal-50 rounded-xl p-3 border border-teal-100">
                        <p className="text-xs font-black text-teal-700 uppercase tracking-wider mb-1">Tính từ sở hữu ({row.possAdj})</p>
                        <p className="text-sm font-bold text-slate-800">{row.exAdj}</p>
                        <p className="text-xs text-slate-500 mt-1">{row.exAdjVi}</p>
                      </div>
                      <div className="bg-cyan-50 rounded-xl p-3 border border-cyan-100">
                        <p className="text-xs font-black text-cyan-700 uppercase tracking-wider mb-1">Đại từ sở hữu ({row.possPron})</p>
                        <p className="text-sm font-bold text-slate-800">{row.exPron}</p>
                        <p className="text-xs text-slate-500 mt-1">{row.exPronVi}</p>
                      </div>
                    </div>
                    <button onClick={() => speak(`${row.exAdj} ${row.exPron}`)} className="w-full py-2 rounded-xl bg-slate-50 hover:bg-teal-500 text-slate-400 hover:text-white text-xs font-bold transition-all cursor-pointer border border-slate-100 flex items-center justify-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5" /> Nghe ví dụ
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {possSection === 'rules' && (
            <div className="space-y-4">
              {POSSESSIVE_RULES.map((r, i) => (
                <div key={i} className="premium-card p-5 bg-white border border-slate-200 rounded-[1.5rem] space-y-3">
                  <h4 className="text-sm font-black text-teal-800 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-teal-100 text-teal-600 text-xs font-black flex items-center justify-center">{i + 1}</span>
                    {r.rule}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium">{r.desc}</p>
                  <div className="bg-teal-50 rounded-xl p-3 border border-teal-100">
                    <p className="text-xs font-mono text-teal-700 font-bold">{r.formula}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {r.examples.map((ex, j) => (
                      <button key={j} onClick={() => speak(ex)} className="text-xs px-2.5 py-1 rounded-full bg-white border border-teal-200 text-teal-700 font-bold hover:bg-teal-500 hover:text-white transition-all cursor-pointer">
                        {ex}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 italic font-medium">💡 {r.exVi}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════ TENSES (THÌ & TO BE) ═══════ */}
      {activeTab === 'tenses' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar Menu: Select Grammar Topic */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 scrollbar-thin scrollbar-thumb-slate-200">
            {FOUNDATION_TOPICS.map((topic: any) => {
              const TopicIcon = topic.icon === 'user' ? User : topic.icon === 'star' ? Star : Clock;
              const isSelected = foundationTopicId === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => setFoundationTopicId(topic.id)}
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
            {(() => {
              const activeTopic = FOUNDATION_TOPICS.find((t: any) => t.id === foundationTopicId) || FOUNDATION_TOPICS[0];
              return (
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
                            {activeTopic.content.table.map((row: any, i: number) => (
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
                      {activeTopic.content.forms.map((form: any, i: number) => (
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
                      {activeTopic.content.tenses.map((tense: any, i: number) => (
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
              );
            })()}

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
                          onClick={() => {
                            if (selectedAnswer !== null) return;
                            setSelectedAnswer(opt);
                            if (opt === currentQuizQuestions[quizIndex].answer) {
                              setScore(prev => prev + 1);
                            }
                          }}
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
                        onClick={() => {
                          setSelectedAnswer(null);
                          if (quizIndex < currentQuizQuestions.length - 1) {
                            setQuizIndex(prev => prev + 1);
                          } else {
                            setQuizFinished(true);
                          }
                        }}
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
    </div>
  );
}
