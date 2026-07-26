'use client';

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const PRACTICE_PHRASES = [
  { 
    id: 1, 
    text: "The quick brown fox jumps over the lazy dog.", 
    difficulty: "Beginner", 
    focus: "Fluency"
  },
  { 
    id: 2, 
    text: "Innovation distinguishes between a leader and a follower.", 
    difficulty: "Intermediate", 
    focus: "Pronunciation"
  },
  { 
    id: 3, 
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", 
    difficulty: "Advanced", 
    focus: "Intonation"
  },
  {
    id: 4,
    text: "To be or not to be, that is the question.",
    difficulty: "Beginner",
    focus: "Phonics"
  },
  {
    id: 5,
    text: "She sells seashells by the seashore.",
    difficulty: "Advanced",
    focus: "Articulation"
  }
];

export const PHONETIC_LAB_SOUNDS = [
  { sound: "/θ/", word: "Think", desc: "Âm thổi không rung cổ họng (vô thanh)" },
  { sound: "/ð/", word: "This", desc: "Âm rung cổ họng, lưỡi kẹp nhẹ giữa hai hàm răng" },
  { sound: "/ʃ/", word: "She", desc: "Âm chu môi tròn, đẩy luồng hơi mạnh" },
  { sound: "/tʃ/", word: "Chair", desc: "Âm bật hơi mạnh từ đầu lưỡi chạm lợi răng trên" },
  { sound: "/r/", word: "Right", desc: "Âm cong lưỡi sâu vào trong, không chạm vòm họng" },
  { sound: "/l/", word: "Light", desc: "Âm đầu lưỡi chạm vào lợi răng trên" },
  { sound: "/æ/", word: "Cat", desc: "Âm e bẹt, miệng mở rộng hết cỡ sang hai bên" },
];

export const speak = (text: string, lang = 'en-US') => { 
  if (typeof window === 'undefined') return; 

  const playTranslateTTS = () => {
    const tl = lang.split('-')[0];
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${tl}&client=tw-ob&q=${encodeURIComponent(text)}`;
    const audio = new Audio(url);
    audio.play().catch((err) => {
      console.error("Google Translate TTS fallback failed:", err);
    });
  };

  if (window.speechSynthesis) {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
      playTranslateTTS();
      return;
    }

    const u = new SpeechSynthesisUtterance(text); 
    u.lang = lang; 
    u.rate = 0.8; 
    const v = voices.find(v => v.lang === lang && v.name.includes('Google')) || voices.find(v => v.lang === lang); 
    if (v) u.voice = v; 

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
