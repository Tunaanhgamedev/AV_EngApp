'use client';

import { TOEICWord, TOEICList } from '@/data/toeicVocab';

export interface MatchCard {
  id: string;
  text: string;
  type: 'word' | 'meaning';
  wordId: string;
  isMatched: boolean;
  isSelected: boolean;
}

export const speakWord = (text: string, slow: boolean = false) => {
  if (typeof window === 'undefined') return;

  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = slow ? 0.55 : 0.8;

    const voices = window.speechSynthesis.getVoices();
    const usVoice = voices.find(v => v.lang.includes('en-US') && v.name.includes('Google')) || 
                    voices.find(v => v.lang.includes('en-US'));
    if (usVoice) utterance.voice = usVoice;

    window.speechSynthesis.speak(utterance);
  } else {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(text)}`;
    const audio = new Audio(url);
    audio.play().catch(err => console.log("TTS audio playback failed", err));
  }
};

export const getWordInputHint = (wordStr: string) => {
  if (wordStr.length <= 2) return "_ ".repeat(wordStr.length);
  const first = wordStr[0];
  const last = wordStr[wordStr.length - 1];
  const middle = "_ ".repeat(wordStr.length - 2);
  return `${first} ${middle}${last}`;
};
