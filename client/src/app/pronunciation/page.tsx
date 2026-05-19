'use client';

import React, { useState } from 'react';
import { Volume2, BookOpen, Sparkles, ChevronDown, Mic, Target, Star, Play, Info, ArrowRight, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Alphabet & Phonics Data ──────────────────────────────────────────────────
interface AlphabetLetter {
  letter: string;
  name: string;
  phonic: string;
  phonicIpa: string;
  example: string;
  exampleVi: string;
}

const ALPHABET: AlphabetLetter[] = [
  { letter: 'A', name: 'ay', phonicIpa: '/æ/', phonic: 'æ (như trong apple)', example: 'Apple', exampleVi: 'Quả táo' },
  { letter: 'B', name: 'bee', phonicIpa: '/b/', phonic: 'b (như trong boy)', example: 'Banana', exampleVi: 'Quả chuối' },
  { letter: 'C', name: 'see', phonicIpa: '/k/', phonic: 'k (như trong cat)', example: 'Cat', exampleVi: 'Con mèo' },
  { letter: 'D', name: 'dee', phonicIpa: '/d/', phonic: 'd (như trong dog)', example: 'Dog', exampleVi: 'Con chó' },
  { letter: 'E', name: 'ee', phonicIpa: '/e/', phonic: 'e (như trong egg)', example: 'Egg', exampleVi: 'Quả trứng' },
  { letter: 'F', name: 'ef', phonicIpa: '/f/', phonic: 'f (như trong fish)', example: 'Fish', exampleVi: 'Con cá' },
  { letter: 'G', name: 'jee', phonicIpa: '/ɡ/', phonic: 'g (như trong go)', example: 'Goat', exampleVi: 'Con dê' },
  { letter: 'H', name: 'aitch', phonicIpa: '/h/', phonic: 'h (như trong hat)', example: 'Hat', exampleVi: 'Cái mũ' },
  { letter: 'I', name: 'eye', phonicIpa: '/ɪ/', phonic: 'ɪ (như trong ink)', example: 'Igloo', exampleVi: 'Lều tuyết' },
  { letter: 'J', name: 'jay', phonicIpa: '/dʒ/', phonic: 'dʒ (như trong jam)', example: 'Jam', exampleVi: 'Mứt' },
  { letter: 'K', name: 'kay', phonicIpa: '/k/', phonic: 'k (như trong kite)', example: 'Kite', exampleVi: 'Cái diều' },
  { letter: 'L', name: 'el', phonicIpa: '/l/', phonic: 'l (như trong leaf)', example: 'Lion', exampleVi: 'Sư tử' },
  { letter: 'M', name: 'em', phonicIpa: '/m/', phonic: 'm (như trong moon)', example: 'Monkey', exampleVi: 'Con khỉ' },
  { letter: 'N', name: 'en', phonicIpa: '/n/', phonic: 'n (như trong nest)', example: 'Nest', exampleVi: 'Tổ chim' },
  { letter: 'O', name: 'oh', phonicIpa: '/ɒ/', phonic: 'ɒ (như trong orange)', example: 'Orange', exampleVi: 'Quả cam' },
  { letter: 'P', name: 'pee', phonicIpa: '/p/', phonic: 'p (như trong pen)', example: 'Pen', exampleVi: 'Bút viết' },
  { letter: 'Q', name: 'cue', phonicIpa: '/kw/', phonic: 'kw (như trong queen)', example: 'Queen', exampleVi: 'Nữ hoàng' },
  { letter: 'R', name: 'ar', phonicIpa: '/r/', phonic: 'r (như trong red)', example: 'Rabbit', exampleVi: 'Con thỏ' },
  { letter: 'S', name: 'es', phonicIpa: '/s/', phonic: 's (như trong sun)', example: 'Sun', exampleVi: 'Mặt trời' },
  { letter: 'T', name: 'tee', phonicIpa: '/t/', phonic: 't (như trong table)', example: 'Tiger', exampleVi: 'Con hổ' },
  { letter: 'U', name: 'you', phonicIpa: '/ʌ/', phonic: 'ʌ (như trong umbrella)', example: 'Umbrella', exampleVi: 'Cái ô' },
  { letter: 'V', name: 'vee', phonicIpa: '/v/', phonic: 'v (như trong violin)', example: 'Violin', exampleVi: 'Đàn vi-ô-lông' },
  { letter: 'W', name: 'double-you', phonicIpa: '/w/', phonic: 'w (như trong watch)', example: 'Window', exampleVi: 'Cửa sổ' },
  { letter: 'X', name: 'ex', phonicIpa: '/ks/', phonic: 'ks (như trong box)', example: 'Xylophone', exampleVi: 'Đàn mộc cầm' },
  { letter: 'Y', name: 'why', phonicIpa: '/j/', phonic: 'j (như trong yellow)', example: 'Yellow', exampleVi: 'Màu vàng' },
  { letter: 'Z', name: 'zed', phonicIpa: '/z/', phonic: 'z (như trong zebra)', example: 'Zebra', exampleVi: 'Ngựa vằn' },
];

// ─── IPA Data ──────────────────────────────────────────────────────────────────
const VOWELS = [
  { ipa: 'iː', example: 'see', word: '/siː/', desc: 'Long "ee"' },
  { ipa: 'ɪ',  example: 'sit', word: '/sɪt/', desc: 'Short "i"' },
  { ipa: 'e',  example: 'bed', word: '/bed/', desc: 'Short "e"' },
  { ipa: 'æ',  example: 'cat', word: '/kæt/', desc: 'Flat "a"' },
  { ipa: 'ɑː', example: 'car', word: '/kɑːr/', desc: 'Long "ah"' },
  { ipa: 'ɒ',  example: 'hot', word: '/hɒt/', desc: 'Short "o"' },
  { ipa: 'ɔː', example: 'saw', word: '/sɔː/', desc: 'Long "aw"' },
  { ipa: 'ʊ',  example: 'put', word: '/pʊt/', desc: 'Short "oo"' },
  { ipa: 'uː', example: 'too', word: '/tuː/', desc: 'Long "oo"' },
  { ipa: 'ʌ',  example: 'cup', word: '/kʌp/', desc: 'Short "uh"' },
  { ipa: 'ɜː', example: 'bird', word: '/bɜːd/', desc: 'Long "ur"' },
  { ipa: 'ə',  example: 'about', word: '/əˈbaʊt/', desc: 'Schwa' },
];

const DIPHTHONGS = [
  { ipa: 'eɪ', example: 'day', word: '/deɪ/', desc: '"ay"' },
  { ipa: 'aɪ', example: 'my', word: '/maɪ/', desc: '"eye"' },
  { ipa: 'ɔɪ', example: 'boy', word: '/bɔɪ/', desc: '"oy"' },
  { ipa: 'aʊ', example: 'now', word: '/naʊ/', desc: '"ow"' },
  { ipa: 'əʊ', example: 'go', word: '/ɡəʊ/', desc: '"oh"' },
  { ipa: 'ɪə', example: 'here', word: '/hɪər/', desc: '"ear"' },
  { ipa: 'eə', example: 'hair', word: '/heər/', desc: '"air"' },
  { ipa: 'ʊə', example: 'tour', word: '/tʊər/', desc: '"oor"' },
];

const CONSONANTS = [
  { ipa: 'p', example: 'pen', word: '/pen/', desc: 'Voiceless bilabial' },
  { ipa: 'b', example: 'bad', word: '/bæd/', desc: 'Voiced bilabial' },
  { ipa: 't', example: 'tea', word: '/tiː/', desc: 'Voiceless alveolar' },
  { ipa: 'd', example: 'did', word: '/dɪd/', desc: 'Voiced alveolar' },
  { ipa: 'k', example: 'cat', word: '/kæt/', desc: 'Voiceless velar' },
  { ipa: 'ɡ', example: 'get', word: '/ɡet/', desc: 'Voiced velar' },
  { ipa: 'f', example: 'fall', word: '/fɔːl/', desc: 'Voiceless labiodental' },
  { ipa: 'v', example: 'van', word: '/væn/', desc: 'Voiced labiodental' },
  { ipa: 'θ', example: 'thin', word: '/θɪn/', desc: 'Voiceless dental' },
  { ipa: 'ð', example: 'this', word: '/ðɪs/', desc: 'Voiced dental' },
  { ipa: 's', example: 'see', word: '/siː/', desc: 'Voiceless alveolar fricative' },
  { ipa: 'z', example: 'zoo', word: '/zuː/', desc: 'Voiced alveolar fricative' },
  { ipa: 'ʃ', example: 'she', word: '/ʃiː/', desc: '"sh" sound' },
  { ipa: 'ʒ', example: 'vision', word: '/ˈvɪʒ.ən/', desc: '"zh" sound' },
  { ipa: 'h', example: 'hat', word: '/hæt/', desc: 'Glottal fricative' },
  { ipa: 'tʃ', example: 'chain', word: '/tʃeɪn/', desc: '"ch" sound' },
  { ipa: 'dʒ', example: 'jam', word: '/dʒæm/', desc: '"j" sound' },
  { ipa: 'm', example: 'man', word: '/mæn/', desc: 'Bilabial nasal' },
  { ipa: 'n', example: 'no', word: '/nəʊ/', desc: 'Alveolar nasal' },
  { ipa: 'ŋ', example: 'sing', word: '/sɪŋ/', desc: 'Velar nasal "ng"' },
  { ipa: 'l', example: 'leg', word: '/leɡ/', desc: 'Lateral approximant' },
  { ipa: 'r', example: 'red', word: '/red/', desc: 'Alveolar approximant' },
  { ipa: 'j', example: 'yes', word: '/jes/', desc: 'Palatal approximant' },
  { ipa: 'w', example: 'wet', word: '/wet/', desc: 'Labial-velar approximant' },
];

const STRESS_RULES = [
  { rule: "Đa số danh từ 2 âm tiết", pattern: "Nhấn âm tiết 1", examples: ["ˈta.ble", "ˈdoc.tor", "ˈstu.dent"] },
  { rule: "Đa số động từ 2 âm tiết", pattern: "Nhấn âm tiết 2", examples: ["beˈgin", "deˈcide", "reˈpeat"] },
  { rule: "Từ có đuôi -tion, -sion", pattern: "Nhấn âm trước đuôi", examples: ["eduˈca.tion", "deˈci.sion", "naˈtion"] },
  { rule: "Từ có đuôi -ic", pattern: "Nhấn âm trước đuôi", examples: ["sciˈen.tif.ic", "draˈmat.ic", "opˈti.mis.tic"] },
  { rule: "Từ có đuôi -ity, -ety", pattern: "Nhấn âm thứ 3 từ cuối", examples: ["uniˈver.si.ty", "comˈmu.ni.ty", "soˈci.e.ty"] },
];

const MINIMAL_PAIRS = [
  { a: { word: "ship", ipa: "/ʃɪp/" }, b: { word: "sheep", ipa: "/ʃiːp/" }, focus: "ɪ vs iː" },
  { a: { word: "bed", ipa: "/bed/" }, b: { word: "bad", ipa: "/bæd/" }, focus: "e vs æ" },
  { a: { word: "thin", ipa: "/θɪn/" }, b: { word: "tin", ipa: "/tɪn/" }, focus: "θ vs t" },
  { a: { word: "light", ipa: "/laɪt/" }, b: { word: "right", ipa: "/raɪt/" }, focus: "l vs r" },
  { a: { word: "fan", ipa: "/fæn/" }, b: { word: "van", ipa: "/væn/" }, focus: "f vs v" },
  { a: { word: "bat", ipa: "/bæt/" }, b: { word: "pat", ipa: "/pæt/" }, focus: "b vs p" },
];

const speak = (text: string, rate: number = 0.7) => {
  if (typeof window === 'undefined') return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  u.rate = rate;
  const voices = window.speechSynthesis.getVoices();
  const v = voices.find(v => v.lang === 'en-US' && v.name.includes('Google')) || voices.find(v => v.lang === 'en-US');
  if (v) u.voice = v;
  window.speechSynthesis.speak(u);
};

// ─── IPA Cell Component ────────────────────────────────────────────────────────
function IPACell({ item, color }: { item: { ipa: string; example: string; word: string; desc: string }; color: string }) {
  return (
    <button
      onClick={() => speak(item.example)}
      className={cn(
        "group relative flex flex-col items-center gap-1 p-4 rounded-2xl border-2 transition-all duration-200",
        "hover:shadow-lg hover:-translate-y-0.5 active:scale-95 text-slate-800",
        color
      )}
    >
      <span className="text-2xl font-black font-mono">{item.ipa}</span>
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.example}</span>
      <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Volume2 className="w-4 h-4 text-primary animate-pulse" />
      </div>
    </button>
  );
}

export default function PronunciationPage() {
  const [activeTab, setActiveTab] = useState<'alphabet' | 'chart' | 'stress' | 'pairs' | 'building'>('alphabet');
  const [chartSection, setChartSection] = useState<'vowels' | 'diphthongs' | 'consonants'>('vowels');

  const tabs = [
    { id: 'alphabet' as const, label: 'Bảng Chữ Cái & Phonics', icon: BookOpen },
    { id: 'chart' as const, label: 'Bảng Phiên Âm IPA', icon: Volume2 },
    { id: 'stress' as const, label: 'Quy Tắc Trọng Âm', icon: Target },
    { id: 'pairs' as const, label: 'Cặp Tối Thiểu', icon: Mic },
    { id: 'building' as const, label: 'Quy Tắc Nối Câu & Chữ', icon: Sparkles },
  ];

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
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all",
              activeTab === tab.id
                ? "bg-slate-900 text-white shadow-lg"
                : "bg-white text-slate-500 border border-slate-200 hover:border-primary"
            )}
          >
            <tab.icon className="w-4 h-4" />
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
            <p className="text-sm text-blue-700 leading-relaxed">
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
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Tên chữ cái</span>
                    <button 
                      onClick={() => speak(item.letter, 0.6)}
                      className="px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-700 font-black text-xs hover:bg-blue-100 transition-all flex items-center gap-1 mx-auto"
                    >
                      /{item.name}/ <Play className="w-2.5 h-2.5 fill-blue-700 text-blue-700" />
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-2">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Âm vị (Phonics)</span>
                    <button 
                      onClick={() => speak(item.example, 0.6)}
                      className="px-2 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 font-bold text-[10px] hover:bg-emerald-100 transition-all flex items-center gap-1 mx-auto"
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
                  "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
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
              Nhấn vào mỗi ô để nghe phát âm. Mỗi ký hiệu IPA đại diện cho một âm duy nhất trong tiếng Anh.
            </p>
          </div>

          {/* Grid */}
          {chartSection === 'vowels' && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {VOWELS.map(v => (
                <IPACell key={v.ipa} item={v} color="border-sky-200 bg-sky-50/50 hover:border-sky-400" />
              ))}
            </div>
          )}
          {chartSection === 'diphthongs' && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {DIPHTHONGS.map(d => (
                <IPACell key={d.ipa} item={d} color="border-violet-200 bg-violet-50/50 hover:border-violet-400" />
              ))}
            </div>
          )}
          {chartSection === 'consonants' && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {CONSONANTS.map(c => (
                <IPACell key={c.ipa} item={c} color="border-emerald-200 bg-emerald-50/50 hover:border-emerald-400" />
              ))}
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
                      className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-bold hover:border-primary hover:bg-primary/5 transition-all flex items-center gap-2 group text-slate-700"
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

      {/* ════════════════════════════════════════════ MINIMAL PAIRS ═══════════════ */}
      {activeTab === 'pairs' && (
        <div className="space-y-6">
          <div className="premium-card p-6 bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200">
            <h3 className="text-lg font-black text-rose-800 flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-rose-500" /> Cặp Tối Thiểu (Minimal Pairs)
            </h3>
            <p className="text-sm text-rose-700 leading-relaxed font-medium">
              Cặp tối thiểu là hai từ chỉ khác nhau ở một âm duy nhất. Luyện tập phân biệt các cặp này giúp bạn cải thiện khả năng nghe và phát âm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MINIMAL_PAIRS.map((pair, i) => (
              <div key={i} className="premium-card p-6 hover:shadow-xl transition-all">
                <div className="text-center mb-4">
                  <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest">
                    {pair.focus}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => speak(pair.a.word)}
                    className="flex-1 flex flex-col items-center gap-2 p-5 rounded-2xl border-2 border-sky-200 bg-sky-50/50 hover:border-sky-400 hover:shadow-md transition-all group"
                  >
                    <span className="text-2xl font-black text-slate-800">{pair.a.word}</span>
                    <span className="text-xs font-mono text-slate-400">{pair.a.ipa}</span>
                    <Volume2 className="w-4 h-4 text-slate-300 group-hover:text-sky-500" />
                  </button>

                  <div className="text-sm font-black text-slate-300">VS</div>

                  <button
                    onClick={() => speak(pair.b.word)}
                    className="flex-1 flex flex-col items-center gap-2 p-5 rounded-2xl border-2 border-rose-200 bg-rose-50/50 hover:border-rose-400 hover:shadow-md transition-all group"
                  >
                    <span className="text-2xl font-black text-slate-800">{pair.b.word}</span>
                    <span className="text-xs font-mono text-slate-400">{pair.b.ipa}</span>
                    <Volume2 className="w-4 h-4 text-slate-300 group-hover:text-rose-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
                    <button onClick={() => speak("cat")} className="font-bold text-purple-600 flex items-center gap-1">cat <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200/50 pt-2">
                    <span>d - o - g</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <button onClick={() => speak("dog")} className="font-bold text-purple-600 flex items-center gap-1">dog <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
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
                    <button onClick={() => speak("ship")} className="font-bold text-purple-600 flex items-center gap-1">ship <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200/50 pt-2">
                    <span>c + h ➔ /tʃ/</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <button onClick={() => speak("chair")} className="font-bold text-purple-600 flex items-center gap-1">chair <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
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
                    <button onClick={() => speak("tiger")} className="font-bold text-purple-600 flex items-center gap-1">tiger <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200/50 pt-2">
                    <span>com - pu - ter</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <button onClick={() => speak("computer")} className="font-bold text-purple-600 flex items-center gap-1">computer <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
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
                      <button onClick={() => speak("turn on")} className="text-purple-600 font-bold flex items-center gap-1">Nghe phát âm <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <p className="text-xs font-mono font-bold text-slate-700">Read a book ➔ "rea-da-book"</p>
                    <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium">
                      <span>Đọc một cuốn sách</span>
                      <button onClick={() => speak("read a book")} className="text-purple-600 font-bold flex items-center gap-1">Nghe phát âm <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
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
                      <button onClick={() => speak("go on")} className="text-purple-600 font-bold flex items-center gap-1">Nghe phát âm <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <p className="text-xs font-mono font-bold text-slate-700">See it ➔ thêm âm /j/ ➔ "see-y-it"</p>
                    <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium">
                      <span>Nhìn thấy nó</span>
                      <button onClick={() => speak("see it")} className="text-purple-600 font-bold flex items-center gap-1">Nghe phát âm <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
