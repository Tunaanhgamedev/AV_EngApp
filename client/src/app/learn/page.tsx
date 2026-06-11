'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Volume2, 
  XCircle, 
  Lightbulb, 
  CheckCircle2,
  BrainCircuit,
  ChevronRight,
  Loader2,
  Trophy,
  User,
  Star,
  Clock,
  GraduationCap,
  Award,
  HelpCircle,
  Check,
  Info,
  Play,
  Home,
  Briefcase,
  Shirt,
  Cat,
  Heart,
  BookOpen
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

interface Word {
  id: string;
  word: string;
  phonetic: string;
  meaningEn: string;
  meaningVi: string;
  wordType: string;
  cefrLevel: string;
  audioUs?: string;
  usage?: string;
  example?: string;
  exampleVi?: string;
}

const levels = [
  { level: 'A1', label: 'Beginner', desc: 'Everyday basics: family, food, numbers', color: 'from-emerald-400 to-green-500', difficulty: '★', words: '~500' },
  { level: 'A2', label: 'Elementary', desc: 'Simple routines: shopping, travel, directions', color: 'from-cyan-400 to-blue-500', difficulty: '★★', words: '~500' },
  { level: 'B1', label: 'Intermediate', desc: 'Work, education, opinions, and experiences', color: 'from-indigo-400 to-violet-500', difficulty: '★★★', words: '~1000' },
  { level: 'B2', label: 'Upper-Intermediate', desc: 'Abstract ideas, news, technical discussions', color: 'from-purple-400 to-fuchsia-500', difficulty: '★★★★', words: '~1000' },
  { level: 'C1', label: 'Advanced', desc: 'Academic texts, complex arguments', color: 'from-rose-400 to-pink-500', difficulty: '★★★★★', words: '~500' },
  { level: 'C2', label: 'Proficiency', desc: 'Native-like precision and nuance', color: 'from-orange-400 to-amber-500', difficulty: '🏆', words: '~200' },
];

// ─── English Foundation Grammar Data ──────────────────────────────────────────
const FOUNDATION_TOPICS = [
  {
    id: 'pronouns',
    title: 'Subject Pronouns (Đại Từ Nhân Xưng)',
    desc: 'Làm quen với đại từ đóng vai trò chủ ngữ và tân ngữ trong câu.',
    icon: User,
    color: 'border-sky-200 bg-sky-50 text-sky-800',
    content: {
      theory: 'Đại từ nhân xưng là từ dùng để đại diện cho một danh từ chỉ người hoặc vật để tránh lặp từ. Dưới đây là bảng phân loại cốt lõi và các ví dụ phát âm mẫu.',
      table: [
        { pronoun: 'I', role: 'Chủ ngữ (S)', meaning: 'Tôi, tớ, mình (Số ít, ngôi 1)', example: 'I study English every day.' },
        { pronoun: 'me', role: 'Tân ngữ (O)', meaning: 'Tôi (đứng sau động từ)', example: 'She loves me.' },
        { pronoun: 'You', role: 'Chủ ngữ / Tân ngữ', meaning: 'Bạn, các bạn (Ngôi 2)', example: 'You are a good friend.' },
        { pronoun: 'We', role: 'Chủ ngữ (S)', meaning: 'Chúng tôi, chúng ta (Số nhiều, ngôi 1)', example: 'We study grammar.' },
        { pronoun: 'us', role: 'Tân ngữ (O)', meaning: 'Chúng tôi (đứng sau động từ)', example: 'The teacher helps us.' },
        { pronoun: 'They', role: 'Chủ ngữ (S)', meaning: 'Họ, chúng nó (Số nhiều, ngôi 3)', example: 'They speak English fluently.' },
        { pronoun: 'He', role: 'Chủ ngữ (S)', meaning: 'Anh ấy, ông ấy (Số ít, ngôi 3 nam)', example: 'He works at a school.' },
        { pronoun: 'him', role: 'Tân ngữ (O)', meaning: 'Anh ấy (đứng sau động từ)', example: 'I talk to him.' },
        { pronoun: 'She', role: 'Chủ ngữ (S)', meaning: 'Cô ấy, bà ấy (Số ít, ngôi 3 nữ)', example: 'She is very smart.' },
        { pronoun: 'her', role: 'Tân ngữ (O)', meaning: 'Cô ấy (đứng sau động từ)', example: 'Tell her the truth.' },
        { pronoun: 'It', role: 'Chủ ngữ / Tân ngữ', meaning: 'Nó (Số ít, ngôi 3 vật/động vật)', example: 'It is a beautiful day.' },
      ],
      quiz: [
        { question: '... is my sister. Her name is Lan.', options: ['He', 'She', 'They', 'It'], answer: 'She', explanation: 'Chủ ngữ chỉ nữ số ít ở đây là She.' },
        { question: 'Nam and I are friends. ... learn English together.', options: ['We', 'They', 'You', 'I'], answer: 'We', explanation: '"Nam and I" tương đương với chúng tôi (We).' },
        { question: 'Where is the book? ... is on the table.', options: ['He', 'She', 'It', 'We'], answer: 'It', explanation: '"The book" là vật số ít nên dùng It.' },
        { question: 'Do you know that boy? I want to invite ... to the party.', options: ['he', 'him', 'she', 'us'], answer: 'him', explanation: 'Đứng sau động từ "invite" ta dùng tân ngữ chỉ nam số ít "him".' },
        { question: 'My parents are retired. ... live in a small village.', options: ['We', 'They', 'You', 'He'], answer: 'They', explanation: 'Chủ ngữ chỉ số nhiều "parents" ở đây thay thế bằng They.' },
        { question: 'This is my mother. I love ... very much.', options: ['she', 'her', 'it', 'me'], answer: 'her', explanation: 'Tân ngữ đứng sau động từ chỉ nữ số ít là her.' },
        { question: 'John is a teacher. ... teaches English at high school.', options: ['He', 'Him', 'His', 'She'], answer: 'He', explanation: 'John là nam số ít, làm chủ ngữ trước động từ nên chọn He.' },
        { question: 'Our cat is cute. ... likes playing with balls.', options: ['He', 'It', 'We', 'They'], answer: 'It', explanation: 'Thú cưng/động vật số ít ta dùng đại từ It.' },
        { question: 'Can you help ...? I cannot lift this heavy box.', options: ['me', 'I', 'him', 'us'], answer: 'me', explanation: 'Tân ngữ chịu tác động của hành động "help" của người nói là me.' },
        { question: 'We are hungry. Please give ... some bread.', options: ['us', 'we', 'them', 'me'], answer: 'us', explanation: 'Đứng sau động từ "give" cần tân ngữ. "We" biến thành tân ngữ "us".' },
      ]
    }
  },
  {
    id: 'tobe',
    title: 'Verb "To Be" (Động từ To Be)',
    desc: 'Làm chủ động từ cốt lõi mang ý nghĩa: Thì, Là, Ở.',
    icon: Star,
    color: 'border-amber-200 bg-amber-50 text-amber-800',
    content: {
      theory: 'Động từ "To Be" là động từ cơ bản nhất trong tiếng Anh. Ở thời hiện tại, nó có 3 dạng (am, is, are) chia theo chủ ngữ.',
      forms: [
        { tense: 'Hiện tại đơn (Present Simple)', rules: 'I + am | He / She / It / Danh từ số ít + is | You / We / They / Danh từ số nhiều + are', example: 'I am a student. She is busy. We are at home.' },
        { tense: 'Quá khứ đơn (Past Simple)', rules: 'I / He / She / It / Danh từ số ít + was | You / We / They / Danh từ số nhiều + were', example: 'They were happy yesterday. He was tired.' },
        { tense: 'Tương lai đơn (Future Simple)', rules: 'Tất cả các chủ ngữ + will be', example: 'It will be sunny tomorrow.' },
      ],
      quiz: [
        { question: 'She ... a beautiful girl.', options: ['am', 'is', 'are', 'was'], answer: 'is', explanation: 'Chủ ngữ "She" đi với "is" ở thì hiện tại.' },
        { question: 'They ... at the school yesterday.', options: ['are', 'was', 'were', 'be'], answer: 'were', explanation: '"yesterday" là quá khứ, chủ ngữ "They" đi với "were".' },
        { question: 'I ... an English student.', options: ['am', 'is', 'are', 'be'], answer: 'am', explanation: 'Chủ ngữ "I" luôn đi với "am" ở hiện tại đơn.' },
        { question: 'We ... in Hanoi next week.', options: ['are', 'was', 'were', 'will be'], answer: 'will be', explanation: '"next week" biểu thị tương lai, nên dùng "will be".' },
        { question: 'You ... very kind to help me yesterday.', options: ['are', 'were', 'was', 'will be'], answer: 'were', explanation: '"yesterday" chỉ quá khứ, chủ ngữ "You" đi với "were".' },
        { question: 'The weather ... nice today.', options: ['is', 'am', 'are', 'was'], answer: 'is', explanation: '"today" là hiện tại, "The weather" là danh từ không đếm được/số ít đi với "is".' },
        { question: 'Last year, she ... only 20 years old. Now she ... 21.', options: ['is / was', 'was / is', 'were / is', 'will be / is'], answer: 'was / is', explanation: '"Last year" chia quá khứ (was), "Now" chia hiện tại (is).' },
        { question: 'Where ... you born?', options: ['are', 'was', 'were', 'did'], answer: 'were', explanation: 'Cấu trúc hỏi sinh ra ở đâu dùng quá khứ đơn "were you born".' },
        { question: 'I ... busy tomorrow, so I cannot visit you.', options: ['am', 'was', 'will be', 'be'], answer: 'will be', explanation: '"tomorrow" biểu thị tương lai, dùng "will be".' },
        { question: 'These books ... mine. Do not take them.', options: ['is', 'are', 'was', 'be'], answer: 'are', explanation: '"These books" là danh từ số nhiều ở hiện tại, dùng "are".' },
      ]
    }
  },
  {
    id: 'tenses',
    title: 'Basic Tenses (5 Thì Cơ Bản)',
    desc: 'Trọng tâm 5 thì cơ bản nhất giúp người mất gốc khôi phục nền tảng.',
    icon: Clock,
    color: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    content: {
      tenses: [
        {
          name: '1. Hiện tại đơn (Present Simple)',
          formula: 'S + V(s/es) | S + am/is/are + ...',
          usage: 'Diễn tả thói quen, hành động lặp đi lặp lại hoặc sự thật hiển nhiên.',
          example: 'He walks to school every day.'
        },
        {
          name: '2. Hiện tại tiếp diễn (Present Continuous)',
          formula: 'S + am/is/are + V-ing',
          usage: 'Diễn tả hành động đang diễn ra ngay tại thời điểm nói.',
          example: 'I am learning English right now.'
        },
        {
          name: '3. Quá khứ đơn (Past Simple)',
          formula: 'S + V2/ed | S + was/were + ...',
          usage: 'Diễn tả hành động đã xảy ra và kết thúc hoàn toàn trong quá khứ.',
          example: 'They visited Hanoi last week.'
        },
        {
          name: '4. Hiện tại hoàn thành (Present Perfect)',
          formula: 'S + have/has + V3/ed',
          usage: 'Diễn tả kinh nghiệm, trải nghiệm hoặc hành động bắt đầu ở quá khứ kéo dài tới hiện tại.',
          example: 'She has lived here for three years.'
        },
        {
          name: '5. Tương lai đơn (Future Simple)',
          formula: 'S + will + V-inf',
          usage: 'Diễn tả dự định đưa ra tức thời khi nói hoặc dự đoán tương lai.',
          example: 'I will call you tonight.'
        }
      ],
      quiz: [
        { question: 'Every day, he ... up at 6 AM.', options: ['get', 'gets', 'getting', 'got'], answer: 'gets', explanation: '"Every day" chỉ thói quen hiện tại, chủ ngữ "he" số ít nên thêm s/es.' },
        { question: 'Listen! The baby ... in the bedroom.', options: ['cries', 'cried', 'is crying', 'will cry'], answer: 'is crying', explanation: '"Listen!" báo hiệu hành động đang diễn ra nên dùng hiện tại tiếp diễn.' },
        { question: 'We ... this movie last night.', options: ['watch', 'watched', 'watching', 'have watched'], answer: 'watched', explanation: '"last night" báo hiệu quá khứ đơn.' },
        { question: 'I ... English since 2020.', options: ['learn', 'learnt', 'have learnt', 'am learning'], answer: 'have learnt', explanation: '"since 2020" chỉ thời gian kéo dài từ quá khứ đến nay, dùng hiện tại hoàn thành.' },
        { question: 'Look! The train ... . Let\'s run!', options: ['comes', 'came', 'is coming', 'will come'], answer: 'is coming', explanation: '"Look!" báo hiệu hành động đang xảy ra trước mắt nên dùng hiện tại tiếp diễn.' },
        { question: 'Next summer, we ... a trip to Da Nang.', options: ['take', 'took', 'will take', 'have taken'], answer: 'will take', explanation: '"Next summer" là trạng từ chỉ thời gian trong tương lai, dùng tương lai đơn "will take".' },
        { question: 'Water ... at 100 degrees Celsius.', options: ['boil', 'boils', 'boiled', 'is boiling'], answer: 'boils', explanation: 'Đây là sự thật hiển nhiên, dùng hiện tại đơn và chia số ít cho Water.' },
        { question: 'She ... her homework yet.', options: ['didn\'t finish', 'hasn\'t finished', 'doesn\'t finish', 'won\'t finish'], answer: 'hasn\'t finished', explanation: '"yet" báo hiệu câu phủ định của thì hiện tại hoàn thành (has not + V3/ed).' },
        { question: 'Yesterday, I ... my keys at the office.', options: ['lose', 'lost', 'losing', 'have lost'], answer: 'lost', explanation: '"Yesterday" là trạng từ chỉ quá khứ đơn. Dạng quá khứ của lose là lost.' },
        { question: 'They usually ... football on Sunday afternoons.', options: ['play', 'plays', 'played', 'playing'], answer: 'play', explanation: '"usually" chỉ thói quen hiện tại, chủ ngữ "They" số nhiều nên giữ nguyên động từ play.' },
      ]
    }
  }
];

const speak = (text: string) => {
  if (typeof window !== 'undefined') {
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

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.75;
      
      const voicesList = window.speechSynthesis.getVoices();
      const preferredVoice = voicesList.find(v => v.name.includes('Google') && v.lang === 'en-US') || 
                             voicesList.find(v => v.lang === 'en-US');
      
      if (preferredVoice) utterance.voice = preferredVoice;

      utterance.onerror = (e) => {
        console.log("speechSynthesis error, playing Google Translate TTS:", e);
        playTranslateTTS();
      };

      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        setTimeout(() => {
          window.speechSynthesis.speak(utterance);
        }, 50);
      } else {
        window.speechSynthesis.speak(utterance);
      }
    } else {
      playTranslateTTS();
    }
  }
};

const VOCABULARY_TOPICS = [
  {
    id: 'people',
    title: 'Con người & Tính cách (People & Personality)',
    desc: 'Từ vựng miêu tả ngoại hình, phẩm chất và tính cách của con người.',
    icon: User,
    color: 'border-blue-200 bg-blue-50 text-blue-800 hover:border-blue-400',
    beginner: [
      { word: 'tall', phonetic: '/tɔːl/', wordType: 'adj', meaningEn: 'having a relatively great height', meaningVi: 'cao', example: 'He is tall and slim.', exampleVi: 'Anh ấy cao và mảnh khảnh.' },
      { word: 'kind', phonetic: '/kaɪnd/', wordType: 'adj', meaningEn: 'helpful, friendly, and caring about others', meaningVi: 'tốt bụng', example: 'She is a kind teacher.', exampleVi: 'Cô ấy là một giáo viên tốt bụng.' },
      { word: 'happy', phonetic: '/ˈhæp.i/', wordType: 'adj', meaningEn: 'feeling or showing pleasure or contentment', meaningVi: 'hạnh phúc, vui vẻ', example: 'They are very happy today.', exampleVi: 'Hôm nay họ rất vui vẻ.' },
      { word: 'young', phonetic: '/jʌŋ/', wordType: 'adj', meaningEn: 'having lived or existed for only a short time', meaningVi: 'trẻ trung', example: 'She is young and energetic.', exampleVi: 'Cô ấy trẻ trung và tràn đầy năng lượng.' },
      { word: 'smart', phonetic: '/smɑːt/', wordType: 'adj', meaningEn: 'intelligent or clever', meaningVi: 'thông minh', example: 'The student is very smart.', exampleVi: 'Người học sinh đó rất thông minh.' },
      { word: 'quiet', phonetic: '/ˈkwaɪ.ət/', wordType: 'adj', meaningEn: 'making very little noise; silent', meaningVi: 'trầm tính, yên tĩnh', example: 'He is quiet and a bit shy.', exampleVi: 'Anh ấy trầm tính và hơi nhút nhát.' },
      { word: 'friendly', phonetic: '/ˈfrend.li/', wordType: 'adj', meaningEn: 'behaving in a pleasant, kind way towards someone', meaningVi: 'thân thiện', example: 'The locals are friendly.', exampleVi: 'Người dân địa phương rất thân thiện.' },
      { word: 'polite', phonetic: '/pəˈlaɪt/', wordType: 'adj', meaningEn: 'having good manners and respect for others', meaningVi: 'lịch sự, lễ phép', example: 'Always be polite to others.', exampleVi: 'Hãy luôn lịch sự với người khác.' },
      { word: 'short', phonetic: '/ʃɔːt/', wordType: 'adj', meaningEn: 'having a small distance from the top to the bottom', meaningVi: 'lùn, thấp', example: 'He is short but very strong.', exampleVi: 'Anh ấy thấp nhưng rất khỏe.' },
      { word: 'old', phonetic: '/əʊld/', wordType: 'adj', meaningEn: 'having lived or existed for a long time', meaningVi: 'già, lớn tuổi', example: 'My grandfather is old.', exampleVi: 'Ông tôi đã lớn tuổi rồi.' },
      { word: 'sad', phonetic: '/sæd/', wordType: 'adj', meaningEn: 'showing or feeling sadness; unhappy', meaningVi: 'buồn bã', example: 'Why are you so sad?', exampleVi: 'Tại sao bạn lại buồn thế?' },
      { word: 'brave', phonetic: '/breɪv/', wordType: 'adj', meaningEn: 'showing no fear in dangerous situations', meaningVi: 'dũng cảm', example: 'The brave boy saved the dog.', exampleVi: 'Cậu bé dũng cảm đã cứu chú chó.' },
      { word: 'funny', phonetic: '/ˈfʌn.i/', wordType: 'adj', meaningEn: 'causing laughter or amusement; humorous', meaningVi: 'hài hước, vui nhộn', example: 'He tells funny stories.', exampleVi: 'Anh ấy kể những câu chuyện rất hài hước.' },
      { word: 'honest', phonetic: '/ˈɒn.ɪst/', wordType: 'adj', meaningEn: 'telling the truth and not hiding the facts', meaningVi: 'thật thà, trung thực', example: 'Be honest with yourself.', exampleVi: 'Hãy trung thực với chính bản thân mình.' },
      { word: 'lazy', phonetic: '/ˈleɪ.zi/', wordType: 'adj', meaningEn: 'not willing to work or use any effort', meaningVi: 'lười biếng', example: 'He is lazy and sleeps all day.', exampleVi: 'Cậu ta lười biếng và ngủ cả ngày.' }
    ],
    advanced: [
      { word: 'outgoing', phonetic: '/ˈaʊt.ɡəʊ.ɪŋ/', wordType: 'adj', meaningEn: 'friendly and energetic and finding it easy to be with others', meaningVi: 'cởi mở, hướng ngoại', example: 'She is outgoing and loves parties.', exampleVi: 'Cô ấy hướng ngoại và yêu thích tiệc tùng.' },
      { word: 'generous', phonetic: '/ˈdʒen.ər.əs/', wordType: 'adj', meaningEn: 'willing to give money, help, kindness, etc., more than is usual', meaningVi: 'hào phóng, rộng lượng', example: 'He is very generous with his money.', exampleVi: 'Anh ấy rất hào phóng tiền bạc.' },
      { word: 'optimistic', phonetic: '/ˌɒp.tɪˈmɪs.tɪk/', wordType: 'adj', meaningEn: 'hoping or believing that good things will happen', meaningVi: 'lạc quan', example: 'Try to remain optimistic.', exampleVi: 'Hãy cố gắng duy trì sự lạc quan.' },
      { word: 'considerate', phonetic: '/kənˈsɪd.ər.ət/', wordType: 'adj', meaningEn: 'kind and helpful, thinking of other people\'s feelings', meaningVi: 'chu đáo, ân cần', example: 'It was considerate of you to call.', exampleVi: 'Bạn thật chu đáo khi gọi điện hỏi thăm.' },
      { word: 'stubborn', phonetic: '/ˈstʌb.ən/', wordType: 'adj', meaningEn: 'determined to do what you want and refusing to do anything else', meaningVi: 'bướng bỉnh, ương ngạnh', example: 'He is too stubborn to admit mistake.', exampleVi: 'Anh ấy quá bướng bỉnh không chịu nhận sai.' },
      { word: 'ambitious', phonetic: '/æmˈbɪʃ.əs/', wordType: 'adj', meaningEn: 'having a strong wish to be successful, powerful, or rich', meaningVi: 'hoài bão, tham vọng', example: 'She is an ambitious young lawyer.', exampleVi: 'Cô ấy là một luật sư trẻ đầy hoài bão.' },
      { word: 'trustworthy', phonetic: '/ˈtrʌstˌwɜː.ði/', wordType: 'adj', meaningEn: 'able to be trusted; reliable', meaningVi: 'đáng tin cậy', example: 'We need a trustworthy secretary.', exampleVi: 'Chúng tôi cần một thư ký đáng tin cậy.' },
      { word: 'charismatic', phonetic: '/ˌkær.ɪzˈmæt.ɪk/', wordType: 'adj', meaningEn: 'used to describe a person who has charisma', meaningVi: 'lôi cuốn, uy tín', example: 'He is a charismatic leader.', exampleVi: 'Ông ấy là một nhà lãnh đạo đầy lôi cuốn.' },
      { word: 'pessimistic', phonetic: '/ˌpes.ɪˈmɪs.tɪk/', wordType: 'adj', meaningEn: 'thinking that bad things are more likely to happen', meaningVi: 'bi quan', example: 'She has a pessimistic view of life.', exampleVi: 'Cô ấy có cái nhìn bi quan về cuộc sống.' },
      { word: 'introverted', phonetic: '/ˈɪn.trə.vɜː.tɪd/', wordType: 'adj', meaningEn: 'shy, quiet, and preferring to spend time alone', meaningVi: 'hướng nội', example: 'Introverted people enjoy quiet times.', exampleVi: 'Người hướng nội thích những khoảng thời gian yên tĩnh.' },
      { word: 'eccentric', phonetic: '/ɪkˈsen.trɪk/', wordType: 'adj', meaningEn: 'strange or unusual, sometimes in a humorous way', meaningVi: 'lập dị, kỳ lạ', example: 'The eccentric artist lives alone.', exampleVi: 'Người nghệ sĩ lập dị sống một mình.' },
      { word: 'sympathetic', phonetic: '/ˌsɪm.pəˈθet.ɪk/', wordType: 'adj', meaningEn: 'showing that you understand and care about someone\'s problems', meaningVi: 'thông cảm, đồng cảm', example: 'She was sympathetic to his problems.', exampleVi: 'Cô ấy đã đồng cảm với những vấn đề của anh ấy.' },
      { word: 'arrogant', phonetic: '/ˈær.ə.ɡənt/', wordType: 'adj', meaningEn: 'unpleasantly proud and behaving as if you are more important than others', meaningVi: 'kiêu ngạo, ngạo mạn', example: 'I found him extremely arrogant.', exampleVi: 'Tôi thấy anh ta vô cùng kiêu ngạo.' },
      { word: 'compassionate', phonetic: '/kəmˈpæʃ.ən.ət/', wordType: 'adj', meaningEn: 'showing a strong feeling of sympathy and sadness for the suffering of others', meaningVi: 'nhân từ, giàu lòng trắc ẩn', example: 'She is a compassionate nurse.', exampleVi: 'Cô ấy là một y tá đầy lòng trắc ẩn.' },
      { word: 'mischievous', phonetic: '/ˈmɪs.tʃɪ.vəs/', wordType: 'adj', meaningEn: 'behaving in a silly, active way, causing trouble but not serious damage', meaningVi: 'tinh nghịch, láu lỉnh', example: 'He had a mischievous smile on his face.', exampleVi: 'Anh ta nở một nụ cười tinh nghịch trên khuôn mặt.' }
    ]
  },
  {
    id: 'animals',
    title: 'Động vật & Thú cưng (Animals & Pets)',
    desc: 'Từ vựng về thế giới động vật, thú cưng gia đình và động vật hoang dã.',
    icon: Cat,
    color: 'border-emerald-200 bg-emerald-50 text-emerald-800 hover:border-emerald-400',
    beginner: [
      { word: 'dog', phonetic: '/dɒɡ/', wordType: 'noun', meaningEn: 'a common animal with four legs, kept as a pet or for work', meaningVi: 'con chó', example: 'I have a pet dog.', exampleVi: 'Tôi có một chú chó cưng.' },
      { word: 'cat', phonetic: '/kæt/', wordType: 'noun', meaningEn: 'a small domesticated carnivorous mammal with soft fur', meaningVi: 'con mèo', example: 'The cat is sleeping.', exampleVi: 'Con mèo đang ngủ.' },
      { word: 'bird', phonetic: '/bɜːd/', wordType: 'noun', meaningEn: 'a creature with feathers and wings, usually able to fly', meaningVi: 'con chim', example: 'Birds are singing.', exampleVi: 'Những chú chim đang hót.' },
      { word: 'fish', phonetic: '/fɪʃ/', wordType: 'noun', meaningEn: 'an animal that lives in water and breathes through gills', meaningVi: 'con cá', example: 'Fish live in water.', exampleVi: 'Cá sống ở dưới nước.' },
      { word: 'horse', phonetic: '/hɔːs/', wordType: 'noun', meaningEn: 'a large animal with four legs that people ride or use for pulling loads', meaningVi: 'con ngựa', example: 'He rides a white horse.', exampleVi: 'Anh ấy cưỡi một con ngựa trắng.' },
      { word: 'rabbit', phonetic: '/ˈræb.ɪt/', wordType: 'noun', meaningEn: 'a small animal with long ears and soft fur that lives in holes', meaningVi: 'con thỏ', example: 'The rabbit runs fast.', exampleVi: 'Con thỏ chạy rất nhanh.' },
      { word: 'monkey', phonetic: '/ˈmʌŋ.ki/', wordType: 'noun', meaningEn: 'a clever animal with a long tail that climbs trees', meaningVi: 'con khỉ', example: 'Monkeys eat bananas.', exampleVi: 'Những con khỉ ăn chuối.' },
      { word: 'elephant', phonetic: '/ˈel.ɪ.fənt/', wordType: 'noun', meaningEn: 'a very large grey animal with big ears and a long trunk', meaningVi: 'con voi', example: 'The elephant has a trunk.', exampleVi: 'Con voi có một chiếc vòi.' },
      { word: 'lion', phonetic: '/ˈlaɪ.ən/', wordType: 'noun', meaningEn: 'a large wild animal of the cat family, known as king of beasts', meaningVi: 'sư tử', example: 'The lion is the king of the jungle.', exampleVi: 'Sư tử là chúa tể của rừng xanh.' },
      { word: 'tiger', phonetic: '/ˈtaɪ.ɡər/', wordType: 'noun', meaningEn: 'a large wild animal of the cat family with orange and black stripes', meaningVi: 'con hổ', example: 'Tigers have beautiful stripes.', exampleVi: 'Hổ có những đường vằn rất đẹp.' },
      { word: 'bear', phonetic: '/beər/', wordType: 'noun', meaningEn: 'a large, strong wild mammal with a thick fur coat', meaningVi: 'con gấu', example: 'Bears love eating honey.', exampleVi: 'Gấu rất thích ăn mật ong.' },
      { word: 'duck', phonetic: '/dʌk/', wordType: 'noun', meaningEn: 'a common water bird with webbed feet and a broad flat beak', meaningVi: 'con vịt', example: 'Ducks are swimming in the pond.', exampleVi: 'Đôi vịt đang bơi trong ao.' },
      { word: 'pig', phonetic: '/pɪɡ/', wordType: 'noun', meaningEn: 'a pink or black farm animal with short legs and a flat nose', meaningVi: 'con lợn, con heo', example: 'Pigs are intelligent animals.', exampleVi: 'Lợn là loài động vật thông minh.' },
      { word: 'sheep', phonetic: '/ʃiːp/', wordType: 'noun', meaningEn: 'a farm animal with thick wool, kept for its meat or wool', meaningVi: 'con cừu', example: 'The sheep are eating grass.', exampleVi: 'Đàn cừu đang gặm cỏ.' },
      { word: 'mouse', phonetic: '/maʊs/', wordType: 'noun', meaningEn: 'a small mammal with a pointed snout and a long tail', meaningVi: 'con chuột', example: 'The cat is chasing a mouse.', exampleVi: 'Con mèo đang đuổi theo con chuột.' }
    ],
    advanced: [
      { word: 'predator', phonetic: '/ˈpred.ə.tər/', wordType: 'noun', meaningEn: 'an animal that hunts, kills, and eats other animals', meaningVi: 'thú săn mồi, động vật ăn thịt', example: 'Lions are apex predators.', exampleVi: 'Sư tử là loài săn mồi đầu bảng.' },
      { word: 'endangered', phonetic: '/ɪnˈdeɪn.dʒəd/', wordType: 'adj', meaningEn: 'animals or plants that may soon not exist because there are very few left', meaningVi: 'có nguy cơ tuyệt chủng', example: 'Pandas are endangered species.', exampleVi: 'Gấu trúc là loài động vật có nguy cơ tuyệt chủng.' },
      { word: 'mammal', phonetic: '/ˈmæm.əl/', wordType: 'noun', meaningEn: 'a warm-blooded animal that has hair or fur and breathes air', meaningVi: 'động vật có vú', example: 'Whales are marine mammals.', exampleVi: 'Cá voi là động vật biển có vú.' },
      { word: 'reptile', phonetic: '/ˈrep.taɪl/', wordType: 'noun', meaningEn: 'a cold-blooded animal whose body is covered with scales', meaningVi: 'loài bò sát', example: 'Snakes belong to reptiles.', exampleVi: 'Rắn thuộc nhóm bò sát.' },
      { word: 'domesticated', phonetic: '/dəˈmes.tɪ.keɪ.tɪd/', wordType: 'adj', meaningEn: 'brought under human control in order to provide food or companionship', meaningVi: 'đã được thuần hóa', example: 'Dogs were domesticated early.', exampleVi: 'Chó đã được thuần hóa từ rất sớm.' },
      { word: 'biodiversity', phonetic: '/ˌbaɪ.əʊ.daɪˈvɜː.sə.ti/', wordType: 'noun', meaningEn: 'the number and variety of plants and animals in a particular area', meaningVi: 'sự đa dạng sinh học', example: 'The jungle has high biodiversity.', exampleVi: 'Khu rừng nhiệt đới có tính đa dạng sinh học cao.' },
      { word: 'migration', phonetic: '/maɪˈɡreɪ.ʃən/', wordType: 'noun', meaningEn: 'the travel of groups of animals to a new place seasonally', meaningVi: 'sự di cư', example: 'Bird migration is seasonal.', exampleVi: 'Sự di cư của chim diễn ra theo mùa.' },
      { word: 'camouflage', phonetic: '/ˈkæm.ə.flɑːʒ/', wordType: 'noun/verb', meaningEn: 'the way that the color or shape of an animal helps it blend in', meaningVi: 'sự ngụy trang', example: 'Chameleons use camouflage.', exampleVi: 'Tắc kè hoa sử dụng sự ngụy trang.' },
      { word: 'nocturnal', phonetic: '/nɒkˈtɜː.nəl/', wordType: 'adj', meaningEn: 'being active, flying, or feeding at night', meaningVi: 'hoạt động về đêm', example: 'Bats are nocturnal creatures.', exampleVi: 'Dơi là sinh vật hoạt động về đêm.' },
      { word: 'herbivore', phonetic: '/ˈhɜː.bɪ.vɔːr/', wordType: 'noun', meaningEn: 'an animal that eats only plants', meaningVi: 'động vật ăn cỏ', example: 'Elephants are large herbivores.', exampleVi: 'Voi là loài động vật ăn cỏ lớn.' },
      { word: 'carnivore', phonetic: '/ˈkɑː.nɪ.vɔːr/', wordType: 'noun', meaningEn: 'an animal that eats meat from other animals', meaningVi: 'động vật ăn thịt', example: 'Lions and tigers are carnivores.', exampleVi: 'Sư tử và hổ là động vật ăn thịt.' },
      { word: 'habitat', phonetic: '/ˈhæb.ɪ.tæt/', wordType: 'noun', meaningEn: 'the natural environment in which an animal or plant usually lives', meaningVi: 'môi trường sống', example: 'Deforestation destroys animal habitats.', exampleVi: 'Phá rừng làm hủy hoại môi trường sống của động vật.' },
      { word: 'extinction', phonetic: '/ɪkˈstɪŋk.ʃən/', wordType: 'noun', meaningEn: 'a situation in which a plant or animal stops existing completely', meaningVi: 'sự tuyệt chủng', example: 'The dinosaurs faced extinction.', exampleVi: 'Khủng long đã đối mặt với sự tuyệt chủng.' },
      { word: 'hibernate', phonetic: '/ˈhaɪ.bə.neɪt/', wordType: 'verb', meaningEn: 'to spend the winter asleep or in an inactive state', meaningVi: 'ngủ đông', example: 'Bears hibernate during winter.', exampleVi: 'Gấu ngủ đông suốt mùa đông.' },
      { word: 'aquatic', phonetic: '/əˈkwæt.ɪk/', wordType: 'adj', meaningEn: 'living or growing in, happening in, or connected with water', meaningVi: 'sống ở dưới nước', example: 'Dolphins are aquatic mammals.', exampleVi: 'Cá heo là động vật có vú sống dưới nước.' }
    ]
  },
  {
    id: 'jobs',
    title: 'Việc làm & Nghề nghiệp (Jobs & Occupations)',
    desc: 'Từ vựng về các vị trí công việc, hoạt động công sở và cơ hội nghề nghiệp.',
    icon: Briefcase,
    color: 'border-amber-200 bg-amber-50 text-amber-800 hover:border-amber-400',
    beginner: [
      { word: 'teacher', phonetic: '/ˈtiː.tʃər/', wordType: 'noun', meaningEn: 'someone whose job is to teach in a school or college', meaningVi: 'giáo viên', example: 'She is a high school teacher.', exampleVi: 'Cô ấy là giáo viên cấp ba.' },
      { word: 'doctor', phonetic: '/ˈdɒk.tər/', wordType: 'noun', meaningEn: 'a person with a medical degree whose job is to treat sick people', meaningVi: 'bác sĩ', example: 'The doctor examined the child.', exampleVi: 'Bác sĩ đã khám cho đứa trẻ.' },
      { word: 'nurse', phonetic: '/nɜːs/', wordType: 'noun', meaningEn: 'a person whose job is to care for people who are ill or injured', meaningVi: 'y tá', example: 'The nurse works at the clinic.', exampleVi: 'Y tá làm việc tại phòng khám.' },
      { word: 'police officer', phonetic: '/pəˈliːs ˌɒf.ɪ.sər/', wordType: 'noun', meaningEn: 'a member of the police force', meaningVi: 'nhân viên cảnh sát', example: 'A police officer stopped the car.', exampleVi: 'Một cảnh sát đã chặn chiếc xe lại.' },
      { word: 'chef', phonetic: '/ʃef/', wordType: 'noun', meaningEn: 'a skilled and trained cook who works in a hotel or restaurant', meaningVi: 'đầu bếp trưởng', example: 'The chef prepared a steak.', exampleVi: 'Đầu bếp đã chuẩn bị món bít tết.' },
      { word: 'driver', phonetic: '/ˈdraɪ.vər/', wordType: 'noun', meaningEn: 'someone who drives a vehicle', meaningVi: 'tài xế, người lái xe', example: 'Our taxi driver was very nice.', exampleVi: 'Tài xế taxi của chúng tôi rất tốt bụng.' },
      { word: 'farmer', phonetic: '/ˈfɑː.mər/', wordType: 'noun', meaningEn: 'someone who owns or manages a farm', meaningVi: 'nông dân', example: 'The farmer grows vegetables.', exampleVi: 'Người nông dân trồng rau củ.' },
      { word: 'student', phonetic: '/ˈstjuː.dənt/', wordType: 'noun', meaningEn: 'a person who is learning at a college or university', meaningVi: 'học sinh, sinh viên', example: 'He is a college student.', exampleVi: 'Cậu ấy là một sinh viên đại học.' },
      { word: 'singer', phonetic: '/ˈsɪŋ.ər/', wordType: 'noun', meaningEn: 'a person who sings, especially professionally', meaningVi: 'ca sĩ', example: 'She is a famous pop singer.', exampleVi: 'Cô ấy là một ca sĩ nhạc pop nổi tiếng.' },
      { word: 'writer', phonetic: '/ˈraɪ.tər/', wordType: 'noun', meaningEn: 'a person who writes books, stories, or articles', meaningVi: 'nhà văn', example: 'He wants to be a writer.', exampleVi: 'Anh ấy muốn trở thành một nhà văn.' },
      { word: 'baker', phonetic: '/ˈbəɪ.kər/', wordType: 'noun', meaningEn: 'a person who bakes and sells bread, cakes, etc.', meaningVi: 'thợ làm bánh', example: 'The baker makes fresh bread.', exampleVi: 'Thợ làm bánh làm ra bánh mì tươi.' },
      { word: 'actor', phonetic: '/ˈæk.tər/', wordType: 'noun', meaningEn: 'someone who performs in a play, movie, or television show', meaningVi: 'diễn viên', example: 'He is a talented young actor.', exampleVi: 'Anh ấy là một diễn viên trẻ tài năng.' },
      { word: 'artist', phonetic: '/ˈɑː.tɪst/', wordType: 'noun', meaningEn: 'someone who paints, draws, or makes sculptures', meaningVi: 'họa sĩ, nghệ sĩ', example: 'She is a talented landscape artist.', exampleVi: 'Cô ấy là một họa sĩ vẽ phong cảnh tài năng.' },
      { word: 'dentist', phonetic: '/ˈden.tɪst/', wordType: 'noun', meaningEn: 'a person whose job is to care for people\'s teeth', meaningVi: 'nha sĩ', example: 'I need to visit the dentist.', exampleVi: 'Tôi cần phải đi khám nha sĩ.' },
      { word: 'pilot', phonetic: '/ˈpaɪ.lət/', wordType: 'noun', meaningEn: 'a person who flies an aircraft', meaningVi: 'phi công', example: 'The pilot flew the plane safely.', exampleVi: 'Phi công đã lái máy bay an toàn.' }
    ],
    advanced: [
      { word: 'entrepreneur', phonetic: '/ˌɒn.trə.prəˈnɜːr/', wordType: 'noun', meaningEn: 'someone who starts their own business with financial risk', meaningVi: 'nhà khởi nghiệp, doanh nhân', example: 'She is a successful entrepreneur.', exampleVi: 'Cô ấy là một nhà khởi nghiệp thành công.' },
      { word: 'consultant', phonetic: '/kənˈsʌl.tənt/', wordType: 'noun', meaningEn: 'a person who provides expert advice professionally', meaningVi: 'cố vấn, tư vấn viên', example: 'He works as a financial consultant.', exampleVi: 'Anh ấy làm việc với tư cách là cố vấn tài chính.' },
      { word: 'journalist', phonetic: '/ˈdʒɜː.nə.lɪst/', wordType: 'noun', meaningEn: 'a person who writes for newspapers, magazines, or news websites', meaningVi: 'nhà báo, phóng viên', example: 'The journalist wrote the article.', exampleVi: 'Nhà báo đã viết bài báo đó.' },
      { word: 'architect', phonetic: '/ˈɑː.kɪ.tekt/', wordType: 'noun', meaningEn: 'a person who designs buildings and supervises construction', meaningVi: 'kiến trúc sư', example: 'An architect designed the bridge.', exampleVi: 'Một kiến trúc sư đã thiết kế cây cầu.' },
      { word: 'accountant', phonetic: '/əˈkaʊn.tənt/', wordType: 'noun', meaningEn: 'someone whose job is to keep or inspect financial accounts', meaningVi: 'kế toán viên', example: 'The accountant checked the taxes.', exampleVi: 'Nhân viên kế toán đã kiểm tra các khoản thuế.' },
      { word: 'colleague', phonetic: '/ˈkɒl.iːɡ/', wordType: 'noun', meaningEn: 'one of a group of people who work together', meaningVi: 'đồng nghiệp', example: 'I get along with my colleagues.', exampleVi: 'Tôi hòa đồng với các đồng nghiệp của mình.' },
      { word: 'promotion', phonetic: '/prəˈməʊ.ʃən/', wordType: 'noun', meaningEn: 'the act of raising someone to a higher position or rank', meaningVi: 'sự thăng chức', example: 'He received a promotion today.', exampleVi: 'Anh ấy đã được thăng chức ngày hôm nay.' },
      { word: 'redundancy', phonetic: '/rɪˈdʌn.dən.si/', wordType: 'noun', meaningEn: 'a situation where someone loses job because they are no longer needed', meaningVi: 'sự sa thải, cắt giảm nhân sự', example: 'Many faced redundancy during the crisis.', exampleVi: 'Nhiều người phải đối mặt với việc bị sa thải trong đợt khủng hoảng.' },
      { word: 'headhunter', phonetic: '/ˈhedˌhʌn.tər/', wordType: 'noun', meaningEn: 'a recruiter of important personnel for businesses', meaningVi: 'người săn đầu người', example: 'The company hired a headhunter.', exampleVi: 'Công ty đã thuê một chuyên gia săn đầu người.' },
      { word: 'resignation', phonetic: '/ˌrez.ɪɡˈneɪ.ʃən/', wordType: 'noun', meaningEn: 'an act of retiring or giving up a position', meaningVi: 'sự từ chức, đơn từ chức', example: 'He handed in his resignation.', exampleVi: 'Anh ấy đã nộp đơn xin từ chức.' },
      { word: 'apprentice', phonetic: '/əˈpren.tɪs/', wordType: 'noun', meaningEn: 'a person learning a trade from a skilled employer', meaningVi: 'người học việc, thực tập sinh', example: 'She works as an apprentice chef.', exampleVi: 'Cô ấy làm việc với tư cách là đầu bếp học việc.' },
      { word: 'freelancer', phonetic: '/ˈfriː.lɑːn.sər/', wordType: 'noun', meaningEn: 'a person who is self-employed and not committed to one employer', meaningVi: 'người làm việc tự do', example: 'He works as a web design freelancer.', exampleVi: 'Anh ấy làm việc như một freelancer thiết kế web.' },
      { word: 'subsidy', phonetic: '/ˈsʌb.sɪ.di/', wordType: 'noun', meaningEn: 'a sum of money granted by the government to assist an industry', meaningVi: 'tiền trợ cấp', example: 'The government provides agricultural subsidies.', exampleVi: 'Chính phủ cung cấp tiền trợ cấp nông nghiệp.' },
      { word: 'pension', phonetic: '/ˈpen.ʃən/', wordType: 'noun', meaningEn: 'a regular payment made by the government during retirement', meaningVi: 'tiền lương hưu', example: 'He lives on his monthly pension.', exampleVi: 'Ông ấy sống bằng tiền lương hưu hàng tháng.' },
      { word: 'overtime', phonetic: '/ˈəʊ.və.taɪm/', wordType: 'noun/adv', meaningEn: 'time worked in addition to one\'s standard working hours', meaningVi: 'làm thêm giờ, tăng ca', example: 'I had to work overtime yesterday.', exampleVi: 'Tôi đã phải làm thêm giờ vào ngày hôm qua.' }
    ]
  },
  {
    id: 'school',
    title: 'Trường học & Học tập (School & Education)',
    desc: 'Từ vựng về môn học, đồ dùng học tập, kỳ thi và môi trường học thuật.',
    icon: BookOpen,
    color: 'border-violet-200 bg-violet-50 text-violet-850 hover:border-violet-400',
    beginner: [
      { word: 'book', phonetic: '/bʊk/', wordType: 'noun', meaningEn: 'a written or printed work consisting of pages bound together', meaningVi: 'quyển sách', example: 'Read this book today.', exampleVi: 'Hãy đọc quyển sách này hôm nay.' },
      { word: 'class', phonetic: '/klɑːs/', wordType: 'noun', meaningEn: 'a group of students who are taught together', meaningVi: 'lớp học', example: 'The class starts at nine.', exampleVi: 'Lớp học bắt đầu lúc 9 giờ.' },
      { word: 'lesson', phonetic: '/ˈles.ən/', wordType: 'noun', meaningEn: 'a period of time in which pupils are taught a subject', meaningVi: 'bài học', example: 'We have an English lesson.', exampleVi: 'Chúng tôi có một bài học tiếng Anh.' },
      { word: 'homework', phonetic: '/ˈhəʊm.wɜːk/', wordType: 'noun', meaningEn: 'study that is given to school pupils to do at home', meaningVi: 'bài tập về nhà', example: 'Did you finish your homework?', exampleVi: 'Bạn đã làm xong bài tập về nhà chưa?' },
      { word: 'pencil', phonetic: '/ˈpen.səl/', wordType: 'noun', meaningEn: 'a thin wooden stick used for writing or drawing', meaningVi: 'bút chì', example: 'Write the draft with a pencil.', exampleVi: 'Hãy viết bản nháp bằng bút chì.' },
      { word: 'library', phonetic: '/ˈlaɪ.brər.i/', wordType: 'noun', meaningEn: 'a building containing books that can be borrowed', meaningVi: 'thư viện', example: 'I study in the library.', exampleVi: 'Tôi tự học trong thư viện.' },
      { word: 'desk', phonetic: '/desk/', wordType: 'noun', meaningEn: 'a table that you sit at to write or work', meaningVi: 'bàn học, bàn làm việc', example: 'Put your books on the desk.', exampleVi: 'Đặt sách của bạn lên bàn học.' },
      { word: 'pen', phonetic: '/pen/', wordType: 'noun', meaningEn: 'an instrument for writing or drawing with ink', meaningVi: 'bút bi, bút mực', example: 'Write your name with a blue pen.', exampleVi: 'Hãy viết tên bạn bằng một cây bút bi xanh.' },
      { word: 'ruler', phonetic: '/ˈruː.lər/', wordType: 'noun', meaningEn: 'a straight strip used to measure distances or draw straight lines', meaningVi: 'thước kẻ', example: 'Use a ruler to draw lines.', exampleVi: 'Hãy sử dụng thước kẻ để vẽ các đường thẳng.' },
      { word: 'paper', phonetic: '/ˈpeɪ.pər/', wordType: 'noun', meaningEn: 'material manufactured in thin sheets, used for writing on', meaningVi: 'tờ giấy, giấy', example: 'I need a sheet of paper.', exampleVi: 'Tôi cần một tờ giấy.' },
      { word: 'exam', phonetic: '/ɪɡˈzæm/', wordType: 'noun', meaningEn: 'a formal test of a person\'s knowledge or proficiency', meaningVi: 'kỳ thi', example: 'He passed the final exam.', exampleVi: 'Cậu ấy đã vượt qua kỳ thi cuối kỳ.' },
      { word: 'board', phonetic: '/bɔːd/', wordType: 'noun', meaningEn: 'a flat surface used for writing on with chalk or markers', meaningVi: 'cái bảng', example: 'Look at the board, please.', exampleVi: 'Làm ơn hãy nhìn lên bảng.' },
      { word: 'grade', phonetic: '/ɡreɪd/', wordType: 'noun', meaningEn: 'a mark indicating the quality of a student\'s work', meaningVi: 'điểm số, lớp học', example: 'She got a high grade in math.', exampleVi: 'Cô ấy đạt điểm cao môn toán.' },
      { word: 'eraser', phonetic: '/ɪˈreɪ.zər/', wordType: 'noun', meaningEn: 'an object used to rub out ink or pencil marks', meaningVi: 'cục tẩy, cục gôm', example: 'Can I borrow your eraser?', exampleVi: 'Tôi có thể mượn cục tẩy của bạn không?' },
      { word: 'schoolbag', phonetic: '/ˈskuːl.bæɡ/', wordType: 'noun', meaningEn: 'a bag used by children for carrying books and school equipment', meaningVi: 'cặp học sinh, ba lô học sinh', example: 'Put the books in your schoolbag.', exampleVi: 'Hãy bỏ sách vào cặp học sinh của em.' }
    ],
    advanced: [
      { word: 'scholarship', phonetic: '/ˈskɒl.ə.ʃɪp/', wordType: 'noun', meaningEn: 'money given to pay for the studies of a person with ability', meaningVi: 'học bổng', example: 'She won a full scholarship.', exampleVi: 'Cô ấy đã giành được một học bổng toàn phần.' },
      { word: 'curriculum', phonetic: '/kəˈrɪk.jə.ləm/', wordType: 'noun', meaningEn: 'the subjects studying in a school or college', meaningVi: 'chương trình giảng dạy', example: 'The school updated its curriculum.', exampleVi: 'Nhà trường đã cập nhật chương trình giảng dạy của mình.' },
      { word: 'graduation', phonetic: '/ˌɡrædʒ.uˈeɪ.ʃən/', wordType: 'noun', meaningEn: 'the finishing of a degree course and receiving a certificate', meaningVi: 'sự tốt nghiệp, lễ tốt nghiệp', example: 'Graduation ceremony is next week.', exampleVi: 'Lễ tốt nghiệp sẽ diễn ra vào tuần tới.' },
      { word: 'plagiarism', phonetic: '/ˈpleɪ.dʒər.ɪ.zəm/', wordType: 'noun', meaningEn: 'taking someone else\'s work and passing it off as one\'s own', meaningVi: 'sự đạo văn', example: 'Plagiarism is strictly prohibited.', exampleVi: 'Hành vi đạo văn bị cấm nghiêm ngặt.' },
      { word: 'tuition', phonetic: '/tʃuːˈɪʃ.ən/', wordType: 'noun', meaningEn: 'the money paid for being taught in a college', meaningVi: 'học phí', example: 'University tuition is rising.', exampleVi: 'Học phí đại học đang ngày càng tăng.' },
      { word: 'assignment', phonetic: '/əˈsaɪn.mənt/', wordType: 'noun', meaningEn: 'a piece of work given to someone in their course of study', meaningVi: 'bài tập lớn, nhiệm vụ', example: 'Submit the assignment by Friday.', exampleVi: 'Nộp bài tập lớn trước thứ Sáu.' },
      { word: 'lecture', phonetic: '/ˈlek.tʃər/', wordType: 'noun', meaningEn: 'a formal talk on a subject given to students', meaningVi: 'bài giảng đại học', example: 'The professor gave an interesting lecture.', exampleVi: 'Giáo sư đã đưa ra một bài giảng rất thú vị.' },
      { word: 'semester', phonetic: '/sɪˈmes.tər/', wordType: 'noun', meaningEn: 'one of the two periods into which a year is divided at college', meaningVi: 'học kỳ', example: 'This is the final semester.', exampleVi: 'Đây là học kỳ cuối cùng.' },
      { word: 'syllabus', phonetic: '/ˈsɪl.ə.bəs/', wordType: 'noun', meaningEn: 'an outline of the subjects in a course of study', meaningVi: 'đề cương môn học', example: 'Check the syllabus for exam dates.', exampleVi: 'Hãy kiểm tra đề cương môn học để biết ngày thi.' },
      { word: 'pedagogy', phonetic: '/ˈped.ə.ɡɒdʒ.i/', wordType: 'noun', meaningEn: 'the method and practice of teaching', meaningVi: 'sư phạm học, phương pháp dạy học', example: 'They study modern educational pedagogy.', exampleVi: 'Họ nghiên cứu về phương pháp sư phạm giáo dục hiện đại.' },
      { word: 'intellectual', phonetic: '/ˌɪn.təlˈek.tʃu.əl/', wordType: 'adj', meaningEn: 'relating to the intellect and rational thinking', meaningVi: 'trí tuệ, thuộc trí thức', example: 'Chess is an intellectual game.', exampleVi: 'Cờ vua là một trò chơi trí tuệ.' },
      { word: 'doctorate', phonetic: '/ˈdɒk.tər.ət/', wordType: 'noun', meaningEn: 'the highest degree that is given by a university', meaningVi: 'học vị tiến sĩ', example: 'He earned his doctorate in physics.', exampleVi: 'Anh ấy đã nhận bằng tiến sĩ vật lý.' },
      { word: 'alumni', phonetic: '/əˈlʌm.naɪ/', wordType: 'noun pl', meaningEn: 'former students or graduates of a school or college', meaningVi: 'cựu học sinh, cựu sinh viên', example: 'The university welcomes back alumni.', exampleVi: 'Trường đại học chào đón các cựu sinh viên trở lại.' },
      { word: 'literacy', phonetic: '/ˈlɪt.ər.ə.si/', wordType: 'noun', meaningEn: 'the ability to read and write', meaningVi: 'trình độ biết chữ, sự biết chữ', example: 'Adult literacy rates are improving.', exampleVi: 'Tỷ lệ biết chữ ở người lớn đang được cải thiện.' },
      { word: 'discipline', phonetic: '/ˈdɪs.ə.plɪn/', wordType: 'noun', meaningEn: 'the practice of training people to obey rules', meaningVi: 'kỷ luật, ngành học', example: 'School discipline is very strict.', exampleVi: 'Kỷ luật trường học rất nghiêm khắc.' }
    ]
  },
  {
    id: 'clothes',
    title: 'Trang phục & Thời trang (Clothes & Fashion)',
    desc: 'Từ vựng về các loại quần áo, phụ kiện thời trang và phong cách ăn mặc.',
    icon: Shirt,
    color: 'border-rose-200 bg-rose-50 text-rose-800 hover:border-rose-400',
    beginner: [
      { word: 'shirt', phonetic: '/ʃɜːt/', wordType: 'noun', meaningEn: 'a collar-bearing shirt or lightweight top', meaningVi: 'áo sơ mi', example: 'He wore a white shirt.', exampleVi: 'Anh ấy đã mặc một chiếc áo sơ mi trắng.' },
      { word: 'pants', phonetic: '/pænts/', wordType: 'noun', meaningEn: 'trousers', meaningVi: 'quần dài', example: 'These pants are too long.', exampleVi: 'Chiếc quần dài này quá dài.' },
      { word: 'shoes', phonetic: '/ʃuːz/', wordType: 'noun', meaningEn: 'coverings for the feet, typically made of leather', meaningVi: 'giày, đôi giày', example: 'Take off your shoes.', exampleVi: 'Hãy cởi giày của bạn ra.' },
      { word: 'dress', phonetic: '/dres/', wordType: 'noun', meaningEn: 'a one-piece garment for a woman or girl', meaningVi: 'váy liền', example: 'She wore a red dress.', exampleVi: 'Cô ấy đã mặc một chiếc váy đỏ.' },
      { word: 'hat', phonetic: '/hæt/', wordType: 'noun', meaningEn: 'a covering for the head', meaningVi: 'mũ, nón', example: 'Put on your hat.', exampleVi: 'Đội mũ vào đi.' },
      { word: 'jacket', phonetic: '/ˈdʒæk.ɪt/', wordType: 'noun', meaningEn: 'a short coat', meaningVi: 'áo khoác ngắn', example: 'It is cold, wear a jacket.', exampleVi: 'Trời lạnh đấy, hãy mặc áo khoác.' },
      { word: 'socks', phonetic: '/sɒks/', wordType: 'noun', meaningEn: 'coverings for the feet, worn inside shoes', meaningVi: 'tất, vớ', example: 'My socks are wet.', exampleVi: 'Tất của tôi bị ướt rồi.' },
      { word: 'coat', phonetic: '/kəʊt/', wordType: 'noun', meaningEn: 'an outer piece of clothing with sleeves, worn to keep warm', meaningVi: 'áo khoác dài, măng tô', example: 'A heavy coat for winter.', exampleVi: 'Một chiếc áo khoác dày cho mùa đông.' },
      { word: 'skirt', phonetic: '/skɜːt/', wordType: 'noun', meaningEn: 'a garment fastened around the waist and hanging down around the legs', meaningVi: 'chân váy', example: 'She wore a long black skirt.', exampleVi: 'Cô ấy đã mặc một chiếc chân váy đen dài.' },
      { word: 'jeans', phonetic: '/dʒiːnz/', wordType: 'noun', meaningEn: 'trousers made of denim, a strong cotton fabric', meaningVi: 'quần bò, quần jeans', example: 'He loves wearing blue jeans.', exampleVi: 'Anh ấy thích mặc quần jeans xanh.' },
      { word: 'tie', phonetic: '/taɪ/', wordType: 'noun', meaningEn: 'a strip of fabric worn around the collar and tied in front', meaningVi: 'cà vạt', example: 'He wore a red tie to the wedding.', exampleVi: 'Anh ấy đã thắt cà vạt đỏ đi đám cưới.' },
      { word: 'belt', phonetic: '/belt/', wordType: 'noun', meaningEn: 'a band of leather worn around the waist to support clothes', meaningVi: 'thắt lưng, dây nịt', example: 'Your belt matches your shoes.', exampleVi: 'Thắt lưng của bạn rất hợp với đôi giày.' },
      { word: 'boot', phonetic: '/buːt/', wordType: 'noun', meaningEn: 'a sturdy item of footwear covering the foot and the ankle', meaningVi: 'đôi ủng, giày cao cổ', example: 'Heavy boots for hiking.', exampleVi: 'Đôi giày cao cổ dày để đi leo núi.' },
      { word: 'glove', phonetic: '/ɡlʌv/', wordType: 'noun', meaningEn: 'a covering for the hand with individual sheaths for each finger', meaningVi: 'găng tay, bao tay', example: 'Wear gloves in the winter.', exampleVi: 'Hãy đeo găng tay vào mùa đông.' },
      { word: 'scarf', phonetic: '/skɑːf/', wordType: 'noun', meaningEn: 'a length of fabric worn around the neck or shoulders', meaningVi: 'khăn quàng cổ', example: 'She wrapped a woolen scarf around her neck.', exampleVi: 'Cô ấy quấn một chiếc khăn len quanh cổ.' }
    ],
    advanced: [
      { word: 'outfit', phonetic: '/ˈaʊt.fɪt/', wordType: 'noun', meaningEn: 'a set of clothes worn for a particular occasion', meaningVi: 'bộ đồ, trang phục', example: 'That is a beautiful outfit.', exampleVi: 'Đó thật sự là một bộ trang phục đẹp.' },
      { word: 'fabric', phonetic: '/ˈfæb.rɪk/', wordType: 'noun', meaningEn: 'cloth or material for making clothes', meaningVi: 'chất liệu vải', example: 'This fabric is soft and light.', exampleVi: 'Chất liệu vải này mềm mại và nhẹ nhàng.' },
      { word: 'accessory', phonetic: '/ækˈses.ər.i/', wordType: 'noun', meaningEn: 'something added to clothing that has a decorative purpose', meaningVi: 'phụ kiện thời trang', example: 'Hats and belts are accessories.', exampleVi: 'Mũ và thắt lưng là các phụ kiện thời trang.' },
      { word: 'wardrobe', phonetic: '/ˈwɔː.drəʊb/', wordType: 'noun', meaningEn: 'a person\'s entire collection of clothes', meaningVi: 'tủ quần áo, kho quần áo', example: 'I need to clean my wardrobe.', exampleVi: 'Tôi cần dọn dẹp lại tủ quần áo của mình.' },
      { word: 'tailored', phonetic: '/ˈteɪ.ləd/', wordType: 'adj', meaningEn: 'made to fit the individual buyer, or well-fitted', meaningVi: 'may đo riêng, vừa vặn', example: 'A tailored suit fits best.', exampleVi: 'Một bộ vest được may đo riêng là vừa vặn nhất.' },
      { word: 'casual', phonetic: '/ˈkæʒ.ju.əl/', wordType: 'adj', meaningEn: 'informal and comfortable clothes worn for everyday activities', meaningVi: 'bình thường, thường phục', example: 'Casual wear is allowed.', exampleVi: 'Quần áo thường nhật được cho phép.' },
      { word: 'formal', phonetic: '/ˈfɔː.məl/', wordType: 'adj', meaningEn: 'clothes suitable for official or serious occasions', meaningVi: 'trang trọng, lịch sự', example: 'Formal attire is required.', exampleVi: 'Trang phục lịch sự là bắt buộc.' },
      { word: 'vintage', phonetic: '/ˈvɪn.tɪdʒ/', wordType: 'adj', meaningEn: 'high quality clothes from a previous era', meaningVi: 'cổ điển, thời trang vintage', example: 'She loves vintage fashion.', exampleVi: 'Cô ấy yêu thích phong cách thời trang cổ điển.' },
      { word: 'flamboyant', phonetic: '/flæmˈbɔɪ.ənt/', wordType: 'adj', meaningEn: 'bright, colorful, and very noticeable', meaningVi: 'sặc sỡ, rực rỡ, chói lọi', example: 'He wears flamboyant clothes.', exampleVi: 'Anh ấy mặc những bộ trang phục sặc sỡ.' },
      { word: 'monochrome', phonetic: '/ˈmɒn.ə.krəʊm/', wordType: 'adj', meaningEn: 'using only one color or shades of one color', meaningVi: 'đơn sắc', example: 'She prefers monochrome designs.', exampleVi: 'Cô ấy thích các thiết kế đơn sắc.' },
      { word: 'haute couture', phonetic: '/ˌəʊt kuːˈtjʊər/', wordType: 'noun', meaningEn: 'high-fashion designing and dressmaking', meaningVi: 'thời trang cao cấp', example: 'Paris is famous for haute couture.', exampleVi: 'Paris nổi tiếng với thời trang cao cấp.' },
      { word: 'symmetrical', phonetic: '/sɪˈme.trɪ.kəl/', wordType: 'adj', meaningEn: 'having two parts that match each other exactly', meaningVi: 'đối xứng', example: 'The dress has a symmetrical design.', exampleVi: 'Chiếc váy có thiết kế đối xứng.' },
      { word: 'runway', phonetic: '/ˈrun.weɪ/', wordType: 'noun', meaningEn: 'the stage that models walk along to show off clothes', meaningVi: 'sàn diễn thời trang', example: 'Models walked down the runway.', exampleVi: 'Các người mẫu sải bước trên sàn diễn thời trang.' },
      { word: 'counterfeit', phonetic: '/ˈkaʊn.tə.fɪt/', wordType: 'adj/noun', meaningEn: 'made in exact imitation of something valuable to deceive', meaningVi: 'hàng giả, hàng nhái', example: 'Beware of counterfeit luxury bags.', exampleVi: 'Hãy cẩn thận với những chiếc túi xách sang trọng giả.' },
      { word: 'fabrication', phonetic: '/ˌfæb.rɪˈkeɪ.ʃən/', wordType: 'noun', meaningEn: 'the action or process of manufacturing a fabric', meaningVi: 'sự chế tạo, chất lượng vải dệt', example: 'High-quality fabrication process.', exampleVi: 'Quy trình dệt chế tạo chất lượng cao.' }
    ]
  },
  {
    id: 'objects',
    title: 'Đồ dùng & Thiết bị (Household Items & Objects)',
    desc: 'Từ vựng về các đồ dùng trong nhà, thiết bị gia dụng và vật dụng quanh ta.',
    icon: Home,
    color: 'border-cyan-200 bg-cyan-50 text-cyan-800 hover:border-cyan-400',
    beginner: [
      { word: 'table', phonetic: '/ˈteɪ.bəl/', wordType: 'noun', meaningEn: 'a piece of furniture with a flat top and legs, used for eating or writing', meaningVi: 'bàn, chiếc bàn', example: 'Put it on the table.', exampleVi: 'Đặt nó ở trên bàn.' },
      { word: 'chair', phonetic: '/tʃeər/', wordType: 'noun', meaningEn: 'a seat for one person, with a back and four legs', meaningVi: 'ghế, chiếc ghế', example: 'Sit down on the chair.', exampleVi: 'Ngồi xuống chiếc ghế này đi.' },
      { word: 'bed', phonetic: '/bed/', wordType: 'noun', meaningEn: 'a piece of furniture that you sleep on', meaningVi: 'giường, chiếc giường', example: 'Time to go to bed.', exampleVi: 'Đến lúc đi ngủ rồi.' },
      { word: 'lamp', phonetic: '/læmp/', wordType: 'noun', meaningEn: 'a device for giving light', meaningVi: 'đèn, chiếc đèn', example: 'Turn on the desk lamp.', exampleVi: 'Bật chiếc đèn bàn học lên.' },
      { word: 'clock', phonetic: '/klɒk/', wordType: 'noun', meaningEn: 'a device for measuring and showing time, not worn', meaningVi: 'đồng hồ treo tường', example: 'The clock shows noon.', exampleVi: 'Đồng hồ chỉ đúng giữa trưa.' },
      { word: 'mirror', phonetic: '/ˈmɪr.ər/', wordType: 'noun', meaningEn: 'a piece of glass in which you can see yourself', meaningVi: 'gương, chiếc gương', example: 'Look at yourself in the mirror.', exampleVi: 'Hãy nhìn mình vào trong gương.' },
      { word: 'door', phonetic: '/dɔːr/', wordType: 'noun', meaningEn: 'the large flat thing that closes the entrance to a room', meaningVi: 'cửa, cánh cửa', example: 'Close the front door.', exampleVi: 'Đóng cánh cửa trước lại.' },
      { word: 'key', phonetic: '/kiː/', wordType: 'noun', meaningEn: 'a metal object used to open or lock a door', meaningVi: 'chìa khóa', example: 'I lost my house key.', exampleVi: 'Tôi đã làm mất chìa khóa nhà.' },
      { word: 'window', phonetic: '/ˈwɪn.dəʊ/', wordType: 'noun', meaningEn: 'an opening in the wall of a building to let in light or air', meaningVi: 'cửa sổ', example: 'Open the window for fresh air.', exampleVi: 'Hãy mở cửa sổ để đón không khí trong lành.' },
      { word: 'phone', phonetic: '/fəʊn/', wordType: 'noun', meaningEn: 'a device used for long-distance communication', meaningVi: 'điện thoại', example: 'Answer the phone, please.', exampleVi: 'Làm ơn trả lời điện thoại.' },
      { word: 'cup', phonetic: '/kʌp/', wordType: 'noun', meaningEn: 'a small bowl-shaped container for drinking from', meaningVi: 'cái chén, tách', example: 'He drank a cup of hot tea.', exampleVi: 'Anh ấy uống một tách trà nóng.' },
      { word: 'plate', phonetic: '/pleɪt/', wordType: 'noun', meaningEn: 'a flat dish, typically circular, from which food is eaten', meaningVi: 'cái đĩa', example: 'Put the food on a plate.', exampleVi: 'Hãy bày thức ăn lên đĩa.' },
      { word: 'spoon', phonetic: '/spuːn/', wordType: 'noun', meaningEn: 'an implement consisting of a small shallow bowl with a handle', meaningVi: 'cái thìa, muỗng', example: 'Eat soup with a spoon.', exampleVi: 'Ăn súp bằng một chiếc thìa.' },
      { word: 'fork', phonetic: '/fɔːk/', wordType: 'noun', meaningEn: 'an implement with two or more prongs used for lifting food', meaningVi: 'cái nĩa', example: 'Use a fork to eat salad.', exampleVi: 'Dùng nĩa để ăn món salad.' },
      { word: 'knife', phonetic: '/naɪf/', wordType: 'noun', meaningEn: 'an instrument with a blade and a handle, used for cutting', meaningVi: 'con dao', example: 'Be careful with that sharp knife.', exampleVi: 'Hãy cẩn thận với con dao sắc đó.' }
    ],
    advanced: [
      { word: 'appliance', phonetic: '/əˈplaɪ.əns/', wordType: 'noun', meaningEn: 'a device, machine, or piece of equipment used in the home', meaningVi: 'thiết bị gia dụng', example: 'Kitchen appliances are expensive.', exampleVi: 'Các thiết bị gia dụng nhà bếp rất đắt tiền.' },
      { word: 'refrigerator', phonetic: '/rɪˈfrɪdʒ.ə.reɪ.tər/', wordType: 'noun', meaningEn: 'an appliance which keeps food cold to preserve it', meaningVi: 'tủ lạnh', example: 'Keep milk in the refrigerator.', exampleVi: 'Hãy giữ sữa trong tủ lạnh.' },
      { word: 'vacuum cleaner', phonetic: '/ˈvæk.juːm ˌkliː.nər/', wordType: 'noun', meaningEn: 'a machine that cleans floors by suction', meaningVi: 'máy hút bụi', example: 'This vacuum cleaner is quiet.', exampleVi: 'Chiếc máy hút bụi này chạy rất êm.' },
      { word: 'thermostat', phonetic: '/ˈθɜː.mə.stæt/', wordType: 'noun', meaningEn: 'a device that controls the temperature of a room', meaningVi: 'bộ điều nhiệt', example: 'Adjust the thermostat to cool.', exampleVi: 'Hãy điều chỉnh bộ điều nhiệt sang làm mát.' },
      { word: 'cabinet', phonetic: '/ˈkæb.ɪ.nət/', wordType: 'noun', meaningEn: 'a piece of furniture with shelves and doors for storage', meaningVi: 'ngăn tủ, tủ chứa đồ', example: 'Glasses are in the cabinet.', exampleVi: 'Những chiếc ly nằm trong tủ.' },
      { word: 'cutlery', phonetic: '/ˈkʌt.lər.i/', wordType: 'noun', meaningEn: 'knives, forks, and spoons used for eating food', meaningVi: 'bộ dụng cụ ăn (dao, muỗng, nĩa)', example: 'Polish the silver cutlery.', exampleVi: 'Hãy đánh bóng bộ dụng cụ ăn bằng bạc.' },
      { word: 'fragile', phonetic: '/ˈfrædʒ.aɪl/', wordType: 'adj', meaningEn: 'easily broken or damaged', meaningVi: 'dễ vỡ, mỏng manh', example: 'Handle these fragile items carefully.', exampleVi: 'Cầm nắm những vật dễ vỡ này cẩn thận.' },
      { word: 'utensil', phonetic: '/juːˈten.sɪl/', wordType: 'noun', meaningEn: 'a tool with a particular use, especially in kitchen', meaningVi: 'dụng cụ, đồ dùng nhà bếp', example: 'Kitchen utensils are on the shelf.', exampleVi: 'Các dụng cụ nhà bếp nằm trên kệ.' },
      { word: 'dishwasher', phonetic: '/ˈdɪʃˌwɒʃ.ər/', wordType: 'noun', meaningEn: 'a machine for washing dishes automatically', meaningVi: 'máy rửa bát, máy rửa chén', example: 'Put the dirty dishes in the dishwasher.', exampleVi: 'Hãy cho bát đĩa bẩn vào máy rửa bát.' },
      { word: 'humidifier', phonetic: '/hjuːˈmɪd.ɪ.faɪ.ər/', wordType: 'noun', meaningEn: 'a device for keeping the atmosphere moist in a room', meaningVi: 'máy tạo ẩm, máy phun sương', example: 'Use a humidifier in dry weather.', exampleVi: 'Sử dụng máy tạo ẩm trong thời tiết khô hanh.' },
      { word: 'upholstery', phonetic: '/ʌpˈhəʊl.stər.i/', wordType: 'noun', meaningEn: 'soft, padded textile covering that is fixed to furniture', meaningVi: 'lớp vải bọc nệm', example: 'The sofa upholstery is worn out.', exampleVi: 'Lớp bọc nệm của sofa đã bị sờn mòn.' },
      { word: 'microwave', phonetic: '/ˈmaɪ.krə.weɪv/', noun: 'noun', meaningEn: 'an oven that uses microwaves to cook or heat food', meaningVi: 'lò vi sóng', example: 'Warm up the pizza in the microwave.', exampleVi: 'Hãy hâm nóng pizza bằng lò vi sóng.' },
      { word: 'detergent', phonetic: '/dɪˈtɜː.dʒənt/', wordType: 'noun', meaningEn: 'a water-soluble cleansing agent which combines with impurities', meaningVi: 'chất tẩy rửa, bột giặt', example: 'Use mild detergent for wool.', exampleVi: 'Sử dụng chất tẩy rửa nhẹ cho len.' },
      { word: 'combustible', phonetic: '/kəmˈbʌs.tə.bəl/', wordType: 'adj', meaningEn: 'able to catch fire and burn easily', meaningVi: 'dễ cháy, chất dễ cháy', example: 'Keep combustibles away from fire.', exampleVi: 'Giữ các chất dễ cháy xa nguồn lửa.' },
      { word: 'heirloom', phonetic: '/ˈeə.luːm/', wordType: 'noun', meaningEn: 'a valuable object that has belonged to a family for generations', meaningVi: 'vật gia truyền', example: 'This clock is a family heirloom.', exampleVi: 'Chiếc đồng hồ này là vật gia truyền của gia đình.' }
    ]
  }
];

export default function LearnPage() {
  const { user } = useAuth();
  
  // Tab/Mode select state
  const [activeMode, setActiveMode] = useState<'foundation' | 'vocabulary' | 'topics'>('foundation');
  
  // Vocabulary Flashcard states
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Foundation grammar states
  const [selectedTopicId, setSelectedTopicId] = useState<string>('pronouns');
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState<any[]>([]);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // Vocabulary by Topic states
  const [selectedVocabTopicId, setSelectedVocabTopicId] = useState<string | null>(null);
  const [vocabLevel, setVocabLevel] = useState<'beginner' | 'advanced'>('beginner');
  const [vocabIndex, setVocabIndex] = useState<number>(0);
  const [showVocabHint, setShowVocabHint] = useState<boolean>(false);
  const [vocabCompleted, setVocabCompleted] = useState<boolean>(false);

  const activeVocabTopic = VOCABULARY_TOPICS.find(t => t.id === selectedVocabTopicId);
  const activeVocabWords = activeVocabTopic ? activeVocabTopic[vocabLevel] : [];

  const activeTopic = FOUNDATION_TOPICS.find(t => t.id === selectedTopicId) || FOUNDATION_TOPICS[0];

  // Fetch words effect
  useEffect(() => {
    const fetchNewWords = async () => {
      if (!selectedLevel) return;
      setLoading(true);
      setWords([]);
      setCurrentIndex(0);
      setCompleted(false);
      
      try {
        const headers: Record<string, string> = {};
        if (user) {
          const token = await user.getIdToken();
          headers['Authorization'] = `Bearer ${token}`;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/vocabulary/learn-new?level=${selectedLevel}&limit=15`, {
          headers
        });
        const data = await res.json();
        setWords(data.words || []);
      } catch (err) {
        console.error(err);
        setWords([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNewWords();
  }, [user, selectedLevel]);

  const playPronunciation = () => {
    const word = words[currentIndex];
    if (!word) return;
    
    // Warm up speech synthesis immediately and synchronously in the direct user gesture
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        const dummy = new SpeechSynthesisUtterance('');
        window.speechSynthesis.speak(dummy);
      } catch (e) {}
    }
    
    if (word.audioUs) {
      const audio = new Audio(word.audioUs);
      audio.play().catch((err) => {
        console.log("Audio play failed, falling back to speech synthesis:", err);
        speak(word.word);
      });
    } else {
      speak(word.word);
    }
  };

  // Auto-play vocab card pronunciation
  useEffect(() => {
    if (activeMode === 'vocabulary' && words[currentIndex] && !loading && !completed) {
      const timer = setTimeout(() => playPronunciation(), 600);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, words, loading, completed, activeMode]);

  const handleNext = () => {
    // Synchronously unlock voice on user gesture
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        const dummy = new SpeechSynthesisUtterance('');
        window.speechSynthesis.speak(dummy);
      } catch (e) {}
    }
    setShowHint(false);
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(((currentIndex + 1) / words.length) * 100);
    } else {
      setCompleted(true);
    }
  };

  const handleIKnowIt = async () => {
    // Synchronously unlock voice on user gesture
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        const dummy = new SpeechSynthesisUtterance('');
        window.speechSynthesis.speak(dummy);
      } catch (e) {}
    }
    const word = words[currentIndex];
    if (user && word) {
      try {
        const token = await user.getIdToken();
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/vocabulary/save`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ wordId: word.id })
        });
      } catch (err) {
        console.error('Save error:', err);
      }
    }
    handleNext();
  };

  // Generate randomized shuffled quiz questions subset
  const generateQuiz = () => {
    const topic = FOUNDATION_TOPICS.find(t => t.id === selectedTopicId) || FOUNDATION_TOPICS[0];
    if (topic && topic.content.quiz) {
      // Shuffle the copy of the quiz array
      const shuffled = [...topic.content.quiz].sort(() => Math.random() - 0.5);
      // Select 5 questions from the pool to keep quiz dynamic and highly replayable
      setCurrentQuizQuestions(shuffled.slice(0, 5));
    }
    setQuizIndex(0);
    setSelectedAnswer(null);
    setQuizFinished(false);
    setScore(0);
  };

  // Re-generate quiz when topic changes
  useEffect(() => {
    generateQuiz();
  }, [selectedTopicId]);

  const handleTopicSelect = (id: string) => {
    setSelectedTopicId(id);
  };

  const handleAnswerSelect = (option: string) => {
    if (selectedAnswer !== null) return; // already answered
    setSelectedAnswer(option);
    if (currentQuizQuestions[quizIndex] && option === currentQuizQuestions[quizIndex].answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    if (quizIndex < currentQuizQuestions.length - 1) {
      setQuizIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-8 animate-in fade-in duration-700 pb-12">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/60 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-primary" /> Study Center
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">
            Học từ vựng theo trình độ CEFR chuẩn quốc tế và ôn luyện ngữ pháp cơ bản cho người mất gốc.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl self-start md:self-center">
          <button
            onClick={() => setActiveMode('foundation')}
            className={cn(
              "px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer",
              activeMode === 'foundation' 
                ? "bg-slate-900 text-white shadow-md" 
                : "text-slate-500 hover:text-slate-800"
            )}
          >
            <GraduationCap className="w-4 h-4" /> Lấy gốc ngữ pháp
          </button>
          <button
            onClick={() => setActiveMode('vocabulary')}
            className={cn(
              "px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer",
              activeMode === 'vocabulary' 
                ? "bg-slate-900 text-white shadow-md" 
                : "text-slate-500 hover:text-slate-800"
            )}
          >
            <BrainCircuit className="w-4 h-4" /> Từ Vựng CEFR
          </button>
          <button
            onClick={() => setActiveMode('topics')}
            className={cn(
              "px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer",
              activeMode === 'topics' 
                ? "bg-slate-900 text-white shadow-md" 
                : "text-slate-500 hover:text-slate-800"
            )}
          >
            <BookOpen className="w-4 h-4" /> Chủ Đề
          </button>
        </div>
      </header>

      {/* ════════════════════════════════════════════ ENGLISH FOUNDATION MODE ══════ */}
      {activeMode === 'foundation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar Menu: Select Grammar Topic */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 scrollbar-thin scrollbar-thumb-slate-200">
            {FOUNDATION_TOPICS.map((topic) => {
              const TopicIcon = topic.icon;
              const isSelected = selectedTopicId === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => handleTopicSelect(topic.id)}
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
                        {activeTopic.content.table.map((row, i) => (
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
                  {activeTopic.content.forms.map((form, i) => (
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
                  {activeTopic.content.tenses.map((tense, i) => (
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
                          onClick={() => handleAnswerSelect(opt)}
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
                        onClick={handleNextQuiz}
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

      {/* ════════════════════════════════════════════ CEFR VOCABULARY MODE ═════════ */}
      {activeMode === 'vocabulary' && (
        <>
          {!selectedLevel ? (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-955 text-white rounded-full">
                  <BrainCircuit className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Daily Flashcards</span>
                </div>
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">Vocabulary CEFR levels</h2>
                <p className="text-slate-500 font-medium text-sm">Học 15 từ vựng mới mỗi ngày theo trình độ tiêu chuẩn Châu Âu.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {levels.map(l => (
                  <button 
                    key={l.level} 
                    onClick={() => setSelectedLevel(l.level)}
                    className="bg-white rounded-[2rem] p-6 border border-slate-200/80 hover:border-primary flex flex-col items-start gap-4 hover:shadow-xl transition-all group text-left relative overflow-hidden cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${l.color} flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:scale-105 transition-transform`}>
                        {l.level}
                      </div>
                      <span className="text-amber-400 text-sm font-bold">{l.difficulty}</span>
                    </div>
                    <div>
                      <h3 className="font-black text-lg text-slate-800">{l.label}</h3>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">{l.desc}</p>
                    </div>
                    <div className="flex items-center justify-between w-full pt-3 border-t border-slate-100">
                      <span className="text-[11px] font-bold text-slate-400">{l.words} words</span>
                      <span className="text-xs font-black text-[#002147] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                        Bắt đầu <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : loading ? (
            <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4">
              <Loader2 className="w-10 h-10 text-[#002147] animate-spin" />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] animate-pulse">Đang tải từ mới...</p>
            </div>
          ) : words.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[40vh] text-center space-y-6">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                <BrainCircuit className="w-10 h-10 text-slate-300" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-800">Không có dữ liệu từ mới</h2>
                <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1 font-medium">Hiện tại không thể tải từ vựng mới cấp độ {selectedLevel}. Vui lòng thử lại sau.</p>
              </div>
              <button 
                onClick={() => setSelectedLevel(null)}
                className="px-8 py-3 bg-[#002147] text-white rounded-xl font-bold hover:shadow-lg transition-all cursor-pointer"
              >
                Trở lại Chọn Trình Độ
              </button>
            </div>
          ) : completed ? (
            <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-6 text-center animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl shadow-yellow-100">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-800">Tuyệt vời!</h1>
                <p className="text-sm text-slate-500 mt-1 font-medium">Bạn đã hoàn thành việc học 15 từ vựng mới cấp độ {selectedLevel}.</p>
              </div>
              <button 
                onClick={() => setSelectedLevel(null)}
                className="px-10 py-3 bg-[#002147] text-white rounded-xl font-bold shadow-md cursor-pointer"
              >
                Tiếp Tục Học
              </button>
            </div>
          ) : (
            // Flashcard content
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setSelectedLevel(null)}
                  className="flex items-center gap-1 text-slate-400 hover:text-slate-600 font-bold transition-colors cursor-pointer text-xs"
                >
                  <ChevronLeft className="w-4 h-4" /> Chọn Cấp Độ
                </button>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 bg-green-50 border border-green-100 text-[10px] font-black text-green-700 rounded-full">{selectedLevel}</span>
                  <span className="text-xs font-black text-slate-400">{currentIndex + 1}/{words.length}</span>
                </div>
              </div>

              {/* Word Flashcard */}
              <div className="perspective-1000 w-full h-[320px] xs:h-[360px] sm:h-[420px] md:h-[450px]">
                <div className={cn(
                  "relative w-full h-full preserve-3d transition-transform duration-500 border border-slate-200/80 rounded-[2.5rem] shadow-xl",
                  showHint ? "rotate-y-180" : ""
                )}>
                  {/* Front Side */}
                  <div className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center text-center bg-white p-6 sm:p-8 rounded-[2.5rem]">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-[9px] font-black rounded-full uppercase tracking-wider mb-3">
                      {words[currentIndex].cefrLevel}
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-black text-slate-800 tracking-tight mb-1 sm:mb-2">{words[currentIndex].word}</h1>
                    <div className="flex items-center gap-2">
                      <span className="text-base sm:text-lg font-serif text-slate-400">{words[currentIndex].phonetic}</span>
                      <span className="text-xs font-bold text-rose-500 font-sans italic">({words[currentIndex].wordType})</span>
                    </div>
                    <button 
                      onClick={playPronunciation}
                      className="mt-4 sm:mt-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition-all shadow-sm cursor-pointer"
                    >
                      <Volume2 className="w-7 h-7 sm:w-8 sm:h-8" />
                    </button>
                    <p className="absolute bottom-4 sm:bottom-6 text-[10px] text-slate-300 font-black uppercase tracking-wider">Nhấn "Hiện gợi ý" bên dưới để lật thẻ</p>
                  </div>

                  {/* Back Side */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center text-center bg-[#002147] text-white p-6 sm:p-8 overflow-y-auto rounded-[2.5rem]">
                    <div className="space-y-3 sm:space-y-4 w-full">
                      <div>
                        <span className="text-[9px] text-emerald-400 font-black uppercase tracking-widest block">Nghĩa tiếng Việt</span>
                        <h2 className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">{words[currentIndex].meaningVi}</h2>
                      </div>
                      <div className="border-t border-white/10 pt-2 sm:pt-3">
                        <span className="text-[9px] text-white/40 font-black uppercase tracking-widest block">Định nghĩa (EN)</span>
                        <p className="text-xs sm:text-sm text-slate-200 mt-1 italic leading-relaxed">"{words[currentIndex].meaningEn}"</p>
                      </div>
                      {words[currentIndex].example && (
                        <div className="border-t border-white/10 pt-2 sm:pt-3 text-left">
                          <span className="text-[9px] text-white/40 font-black uppercase tracking-widest block mb-1">Ví dụ minh họa</span>
                          <p className="text-xs text-white font-medium italic">"{words[currentIndex].example}"</p>
                          {words[currentIndex].exampleVi && <p className="text-[10px] sm:text-[11px] text-emerald-400/80 mt-0.5 italic">{words[currentIndex].exampleVi}</p>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={handleNext}
                  className="flex flex-col items-center gap-1.5 py-4 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-rose-50 hover:border-rose-200 group transition-all cursor-pointer"
                >
                  <XCircle className="w-6 h-6 text-rose-500" />
                  <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest">Đang Học</span>
                </button>

                <button 
                  onClick={() => setShowHint(!showHint)}
                  className="flex flex-col items-center gap-1.5 py-4 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-amber-50 hover:border-amber-200 group transition-all cursor-pointer"
                >
                  <Lightbulb className="w-6 h-6 text-amber-500" />
                  <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">{showHint ? 'Ẩn gợi ý' : 'Hiện gợi ý'}</span>
                </button>

                <button 
                  onClick={handleIKnowIt}
                  className="flex flex-col items-center gap-1.5 py-4 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-green-50 hover:border-green-200 group transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Đã Thuộc</span>
                </button>
              </div>
            </div>
          )}
        </>
      )}
      {/* ════════════════════════════════════════════ VOCABULARY BY TOPIC MODE ═══ */}
      {activeMode === 'topics' && (
        <>
          {!selectedVocabTopicId ? (
            /* ── Topic Selection Grid ── */
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-full">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Vocabulary by Topic</span>
                </div>
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">Học Từ Vựng Theo Chủ Đề</h2>
                <p className="text-slate-500 font-medium text-sm max-w-xl mx-auto">
                  Chọn một chủ đề bên dưới để bắt đầu học từ vựng. Mỗi chủ đề được chia thành 2 cấp độ: <strong className="text-emerald-600">Mới bắt đầu</strong> và <strong className="text-violet-600">Nâng cao</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {VOCABULARY_TOPICS.map(topic => {
                  const TopicIcon = topic.icon;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => {
                        setSelectedVocabTopicId(topic.id);
                        setVocabLevel('beginner');
                        setVocabIndex(0);
                        setShowVocabHint(false);
                        setVocabCompleted(false);
                      }}
                      className={cn(
                        "bg-white rounded-[2rem] p-6 border text-left flex flex-col gap-4 hover:shadow-xl transition-all group relative overflow-hidden cursor-pointer",
                        topic.color
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                          <TopicIcon className="w-6 h-6" />
                        </div>
                        <div className="flex gap-1.5">
                          <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">{topic.beginner.length} từ cơ bản</span>
                          <span className="text-[9px] font-black text-violet-600 bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-full">{topic.advanced.length} từ nâng cao</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-black text-lg text-slate-800">{topic.title}</h3>
                        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">{topic.desc}</p>
                      </div>
                      <div className="flex items-center justify-between w-full pt-3 border-t border-slate-100">
                        <span className="text-[11px] font-bold text-slate-400">{topic.beginner.length + topic.advanced.length} từ vựng</span>
                        <span className="text-xs font-black text-slate-800 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                          Bắt đầu học <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : vocabCompleted ? (
            /* ── Completion Screen ── */
            <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-6 text-center animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl shadow-yellow-100">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-800">Tuyệt vời! 🎉</h1>
                <p className="text-sm text-slate-500 mt-1 font-medium">
                  Bạn đã hoàn thành {activeVocabWords.length} từ vựng chủ đề <strong>{activeVocabTopic?.title}</strong> ({vocabLevel === 'beginner' ? 'Mới bắt đầu' : 'Nâng cao'}).
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                {vocabLevel === 'beginner' && (
                  <button
                    onClick={() => {
                      setVocabLevel('advanced');
                      setVocabIndex(0);
                      setShowVocabHint(false);
                      setVocabCompleted(false);
                    }}
                    className="flex-1 py-3 bg-violet-600 hover:bg-violet-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all active:scale-95 cursor-pointer shadow-lg shadow-violet-200"
                  >
                    Thử cấp Nâng cao →
                  </button>
                )}
                <button
                  onClick={() => {
                    setVocabIndex(0);
                    setShowVocabHint(false);
                    setVocabCompleted(false);
                  }}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-widest rounded-xl transition-all active:scale-95 cursor-pointer"
                >
                  Học lại lượt mới
                </button>
                <button
                  onClick={() => {
                    setSelectedVocabTopicId(null);
                    setVocabIndex(0);
                    setShowVocabHint(false);
                    setVocabCompleted(false);
                  }}
                  className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all active:scale-95 cursor-pointer"
                >
                  Chọn Chủ Đề Khác
                </button>
              </div>
            </div>
          ) : (
            /* ── Topic Study View ── */
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
              {/* Top bar: Back + Topic info + Level switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedVocabTopicId(null);
                      setVocabIndex(0);
                      setShowVocabHint(false);
                      setVocabCompleted(false);
                    }}
                    className="flex items-center gap-1 text-slate-400 hover:text-slate-600 font-bold transition-colors cursor-pointer text-xs"
                  >
                    <ChevronLeft className="w-4 h-4" /> Chọn Chủ Đề
                  </button>
                  <span className="text-xs font-black text-slate-300">|</span>
                  <span className="text-sm font-black text-slate-700">{activeVocabTopic?.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button
                      onClick={() => {
                        setVocabLevel('beginner');
                        setVocabIndex(0);
                        setShowVocabHint(false);
                        setVocabCompleted(false);
                      }}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer",
                        vocabLevel === 'beginner'
                          ? "bg-emerald-500 text-white shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                      )}
                    >
                      🌱 Mới bắt đầu
                    </button>
                    <button
                      onClick={() => {
                        setVocabLevel('advanced');
                        setVocabIndex(0);
                        setShowVocabHint(false);
                        setVocabCompleted(false);
                      }}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer",
                        vocabLevel === 'advanced'
                          ? "bg-violet-500 text-white shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                      )}
                    >
                      🚀 Nâng cao
                    </button>
                  </div>
                  <span className="text-xs font-black text-slate-400">{vocabIndex + 1}/{activeVocabWords.length}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    vocabLevel === 'beginner' ? "bg-gradient-to-r from-emerald-400 to-green-500" : "bg-gradient-to-r from-violet-400 to-purple-500"
                  )}
                  style={{ width: `${((vocabIndex + 1) / activeVocabWords.length) * 100}%` }}
                />
              </div>

              {activeVocabWords[vocabIndex] && (
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                  {/* Flashcard (3 cols) */}
                  <div className="lg:col-span-3">
                    <div className="perspective-1000 w-full h-[320px] xs:h-[360px] sm:h-[400px]">
                      <div className={cn(
                        "relative w-full h-full preserve-3d transition-transform duration-500 border border-slate-200/80 rounded-[2.5rem] shadow-xl",
                        showVocabHint ? "rotate-y-180" : ""
                      )}>
                        {/* Front */}
                        <div className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center text-center bg-white p-6 sm:p-8 rounded-[2.5rem]">
                          <span className={cn(
                            "px-3 py-1 text-[9px] font-black rounded-full uppercase tracking-wider mb-3",
                            vocabLevel === 'beginner' ? "bg-emerald-100 text-emerald-700" : "bg-violet-100 text-violet-700"
                          )}>
                            {vocabLevel === 'beginner' ? '🌱 Beginner' : '🚀 Advanced'}
                          </span>
                          <h1 className="text-4xl sm:text-5xl font-black text-slate-800 tracking-tight mb-1 sm:mb-2">{activeVocabWords[vocabIndex].word}</h1>
                          <div className="flex items-center gap-2">
                            <span className="text-base sm:text-lg font-serif text-slate-400">{activeVocabWords[vocabIndex].phonetic}</span>
                            <span className="text-xs font-bold text-rose-500 font-sans italic">({activeVocabWords[vocabIndex].wordType})</span>
                          </div>
                          <button
                            onClick={() => speak(activeVocabWords[vocabIndex].word)}
                            className="mt-4 sm:mt-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition-all shadow-sm cursor-pointer"
                          >
                            <Volume2 className="w-7 h-7 sm:w-8 sm:h-8" />
                          </button>
                          <p className="absolute bottom-4 sm:bottom-6 text-[10px] text-slate-300 font-black uppercase tracking-wider">Nhấn &quot;Lật thẻ&quot; bên dưới để xem nghĩa</p>
                        </div>

                        {/* Back */}
                        <div className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center text-center bg-slate-900 text-white p-6 sm:p-8 overflow-y-auto rounded-[2.5rem]">
                          <div className="space-y-3 sm:space-y-4 w-full">
                            <div>
                              <span className="text-[9px] text-emerald-400 font-black uppercase tracking-widest block">Nghĩa tiếng Việt</span>
                              <h2 className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">{activeVocabWords[vocabIndex].meaningVi}</h2>
                            </div>
                            <div className="border-t border-white/10 pt-2 sm:pt-3">
                              <span className="text-[9px] text-white/40 font-black uppercase tracking-widest block">Định nghĩa (EN)</span>
                              <p className="text-xs sm:text-sm text-slate-200 mt-1 italic leading-relaxed">&quot;{activeVocabWords[vocabIndex].meaningEn}&quot;</p>
                            </div>
                            <div className="border-t border-white/10 pt-2 sm:pt-3 text-left">
                              <span className="text-[9px] text-white/40 font-black uppercase tracking-widest block mb-1">Ví dụ minh họa</span>
                              <p className="text-xs text-white font-medium italic">&quot;{activeVocabWords[vocabIndex].example}&quot;</p>
                              <p className="text-[10px] sm:text-[11px] text-emerald-400/80 mt-0.5 italic">{activeVocabWords[vocabIndex].exampleVi}</p>
                            </div>
                            <button
                              onClick={() => speak(activeVocabWords[vocabIndex].example)}
                              className="mt-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer mx-auto"
                            >
                              <Volume2 className="w-3.5 h-3.5" /> Nghe ví dụ
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      <button
                        onClick={() => {
                          setShowVocabHint(false);
                          if (vocabIndex < activeVocabWords.length - 1) {
                            setVocabIndex(prev => prev + 1);
                          } else {
                            setVocabCompleted(true);
                          }
                        }}
                        className="flex flex-col items-center gap-1.5 py-4 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-rose-50 hover:border-rose-200 transition-all cursor-pointer"
                      >
                        <XCircle className="w-6 h-6 text-rose-500" />
                        <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest">Đang Học</span>
                      </button>

                      <button
                        onClick={() => setShowVocabHint(!showVocabHint)}
                        className="flex flex-col items-center gap-1.5 py-4 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-amber-50 hover:border-amber-200 transition-all cursor-pointer"
                      >
                        <Lightbulb className="w-6 h-6 text-amber-500" />
                        <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">{showVocabHint ? 'Ẩn nghĩa' : 'Lật thẻ'}</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowVocabHint(false);
                          if (vocabIndex < activeVocabWords.length - 1) {
                            setVocabIndex(prev => prev + 1);
                          } else {
                            setVocabCompleted(true);
                          }
                        }}
                        className="flex flex-col items-center gap-1.5 py-4 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-green-50 hover:border-green-200 transition-all cursor-pointer"
                      >
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                        <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Đã Thuộc</span>
                      </button>
                    </div>
                  </div>

                  {/* Word List Sidebar (2 cols) */}
                  <div className="lg:col-span-2">
                    <div className="premium-card p-4 bg-white border border-slate-200 rounded-[1.5rem] space-y-3 max-h-[520px] overflow-y-auto">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Danh sách từ vựng</h4>
                        <span className={cn(
                          "text-[9px] font-black px-2 py-0.5 rounded-full",
                          vocabLevel === 'beginner' ? "bg-emerald-50 text-emerald-600" : "bg-violet-50 text-violet-600"
                        )}>
                          {vocabLevel === 'beginner' ? 'Cơ bản' : 'Nâng cao'}
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {activeVocabWords.map((w, idx) => (
                          <button
                            key={w.word}
                            onClick={() => {
                              setVocabIndex(idx);
                              setShowVocabHint(false);
                            }}
                            className={cn(
                              "w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer group",
                              idx === vocabIndex
                                ? "bg-slate-900 border-slate-950 text-white shadow-md"
                                : "bg-white border-slate-100 hover:border-slate-300 text-slate-700"
                            )}
                          >
                            <span className={cn(
                              "w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black flex-shrink-0",
                              idx === vocabIndex ? "bg-white/10 text-white" : "bg-slate-50 text-slate-400"
                            )}>
                              {idx + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className={cn("text-sm font-black truncate", idx === vocabIndex ? "text-white" : "text-slate-800")}>{w.word}</p>
                              <p className={cn("text-[10px] font-medium truncate", idx === vocabIndex ? "text-slate-400" : "text-slate-500")}>{w.meaningVi}</p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                speak(w.word);
                              }}
                              className={cn(
                                "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all cursor-pointer",
                                idx === vocabIndex
                                  ? "bg-white/10 text-white hover:bg-white/20"
                                  : "bg-slate-50 text-slate-400 hover:bg-green-50 hover:text-green-500"
                              )}
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
