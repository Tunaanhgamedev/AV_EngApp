/**
 * Robust Text-to-Speech (TTS) Service with Multi-Layer Fallback
 * - Layer 1: Enhanced Web Speech API with Chrome GC protection and resume()
 * - Layer 2: HTML5 Audio fallback using Google Translate TTS API
 * - Layer 3: Safety Watchdog timer to ensure UI never gets stuck in "Playing" state
 */

let currentAudio: HTMLAudioElement | null = null;
let watchdogTimer: NodeJS.Timeout | null = null;

export interface PlayTtsOptions {
  rate?: number;
  pitch?: number;
  lang?: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err?: any) => void;
}

export function stopAudio(): void {
  if (typeof window === 'undefined') return;

  if (watchdogTimer) {
    clearTimeout(watchdogTimer);
    watchdogTimer = null;
  }

  // Stop Web Audio HTML5 element
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch (e) {
      // ignore
    }
    currentAudio = null;
  }

  // Stop SpeechSynthesis
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      // ignore
    }
  }
}

/**
 * Fallback to Google Translate TTS using HTML5 Audio
 */
function playGoogleTtsFallback(text: string, options?: PlayTtsOptions): void {
  if (typeof window === 'undefined') return;

  try {
    // If text is very long, take up to 200 chars for a single chunk
    const cleanText = text.replace(/[\n\r]+/g, ' ').trim();
    const encoded = encodeURIComponent(cleanText.slice(0, 200));
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${options?.lang || 'en'}&client=tw-ob&q=${encoded}`;

    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }

    const audio = new Audio(url);
    currentAudio = audio;

    audio.onplay = () => {
      options?.onStart?.();
    };

    audio.onended = () => {
      if (watchdogTimer) clearTimeout(watchdogTimer);
      currentAudio = null;
      options?.onEnd?.();
    };

    audio.onerror = (e) => {
      console.warn('[TTS] Google TTS Audio element error:', e);
      if (watchdogTimer) clearTimeout(watchdogTimer);
      currentAudio = null;
      options?.onEnd?.();
    };

    audio.play().catch((err) => {
      console.warn('[TTS] Audio.play() was prevented by browser policy or network:', err);
      if (watchdogTimer) clearTimeout(watchdogTimer);
      currentAudio = null;
      options?.onEnd?.();
    });
  } catch (err) {
    console.error('[TTS] playGoogleTtsFallback unexpected error:', err);
    if (watchdogTimer) clearTimeout(watchdogTimer);
    options?.onEnd?.();
  }
}

/**
 * Main function to play speech audio
 */
export function playAudioText(text: string, options?: PlayTtsOptions): void {
  if (typeof window === 'undefined' || !text) {
    options?.onEnd?.();
    return;
  }

  stopAudio();

  // Safety Watchdog: calculated based on text length (approx 120ms per character + 3s buffer)
  const maxDurationMs = Math.max(4000, Math.min(30000, text.length * 150));
  watchdogTimer = setTimeout(() => {
    console.warn('[TTS] Watchdog triggered after', maxDurationMs, 'ms. Releasing state.');
    stopAudio();
    options?.onEnd?.();
  }, maxDurationMs);

  const trySpeechSynthesis = () => {
    if (!('speechSynthesis' in window)) {
      playGoogleTtsFallback(text, options);
      return;
    }

    try {
      // Resume in case Chrome paused the speech synthesizer
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const voices = window.speechSynthesis.getVoices();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = options?.lang || 'en-US';
      utterance.rate = options?.rate || 0.85;
      utterance.pitch = options?.pitch || 1.0;

      if (voices && voices.length > 0) {
        const preferredVoice =
          voices.find(v => (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Zira') || v.name.includes('David')) && v.lang.startsWith('en')) ||
          voices.find(v => v.lang.startsWith('en')) ||
          voices[0];

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
      }

      utterance.onstart = () => {
        options?.onStart?.();
      };

      utterance.onend = () => {
        if (watchdogTimer) clearTimeout(watchdogTimer);
        (window as any)._currentAudioUtterance = null;
        options?.onEnd?.();
      };

      utterance.onerror = (e) => {
        console.warn('[TTS] SpeechSynthesis error, switching to Google TTS fallback:', e);
        (window as any)._currentAudioUtterance = null;
        playGoogleTtsFallback(text, options);
      };

      // Keep reference on window to prevent Chrome garbage collection bug
      (window as any)._currentAudioUtterance = utterance;

      // Chrome speech synthesis requires a tiny timeout after cancel()
      setTimeout(() => {
        try {
          window.speechSynthesis.speak(utterance);
        } catch (speakErr) {
          console.warn('[TTS] window.speechSynthesis.speak threw error:', speakErr);
          playGoogleTtsFallback(text, options);
        }
      }, 50);
    } catch (err) {
      console.warn('[TTS] trySpeechSynthesis error, falling back to Google TTS:', err);
      playGoogleTtsFallback(text, options);
    }
  };

  // If voices aren't loaded yet in Chrome, wait or fallback
  if ('speechSynthesis' in window && window.speechSynthesis.getVoices().length === 0) {
    let voicesLoaded = false;
    const onVoicesChanged = () => {
      if (!voicesLoaded) {
        voicesLoaded = true;
        window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
        trySpeechSynthesis();
      }
    };

    window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);

    // Timeout if voiceschanged never fires (e.g. offline or some Linux/Firefox builds)
    setTimeout(() => {
      if (!voicesLoaded) {
        voicesLoaded = true;
        window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
        trySpeechSynthesis();
      }
    }, 250);
  } else {
    trySpeechSynthesis();
  }
}
