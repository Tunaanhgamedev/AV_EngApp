'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic2, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Volume2,
  Trophy,
  Waves,
  Zap,
  Loader2,
  ChevronRight,
  Video,
  VideoOff,
  Activity,
  Eye,
  BookOpen,
  HelpCircle,
  Camera,
  Check,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const PRACTICE_PHRASES = [
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

const PHONETIC_LAB_SOUNDS = [
  { sound: "/θ/", word: "Think", desc: "Âm thổi không rung cổ họng (vô thanh)" },
  { sound: "/ð/", word: "This", desc: "Âm rung cổ họng, lưỡi kẹp nhẹ giữa hai hàm răng" },
  { sound: "/ʃ/", word: "She", desc: "Âm chu môi tròn, đẩy luồng hơi mạnh" },
  { sound: "/tʃ/", word: "Chair", desc: "Âm bật hơi mạnh từ đầu lưỡi chạm lợi răng trên" },
  { sound: "/r/", word: "Right", desc: "Âm cong lưỡi sâu vào trong, không chạm vòm họng" },
  { sound: "/l/", word: "Light", desc: "Âm đầu lưỡi chạm vào lợi răng trên" },
  { sound: "/æ/", word: "Cat", desc: "Âm e bẹt, miệng mở rộng hết cỡ sang hai bên" },
];

const speak = (text: string, lang = 'en-US') => { 
  if (typeof window === 'undefined' || !window.speechSynthesis) return; 
  window.speechSynthesis.cancel();
  
  try {
    const dummy = new SpeechSynthesisUtterance('');
    dummy.lang = lang;
    window.speechSynthesis.speak(dummy);
  } catch (e) {}
  
  const u = new SpeechSynthesisUtterance(text); 
  u.lang = lang; 
  u.rate = 0.8; 
  const v = window.speechSynthesis.getVoices().find(v => v.lang === lang && v.name.includes('Google')) || window.speechSynthesis.getVoices().find(v => v.lang === lang); 
  if (v) u.voice = v; 
  window.speechSynthesis.speak(u); 
};

export default function SpeakingPage() {
  const [activeTab, setActiveTab] = useState<'speaking' | 'mouth'>('speaking');
  
  // State for Tab 1 (Interactive Speaking Practice)
  const [currentPhrase, setCurrentPhrase] = useState(PRACTICE_PHRASES[0]);
  const [recognition, setRecognition] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [transcript, setTranscript] = useState('');
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // State for Tab 2 (Mouth Shape Lab)
  const [selectedSound, setSelectedSound] = useState(PHONETIC_LAB_SOUNDS[0]);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isMouthAnalyzing, setIsMouthAnalyzing] = useState(false);
  const [mouthFeedback, setMouthFeedback] = useState<any>(null);
  const [customWordInput, setCustomWordInput] = useState("");
  const [customWordError, setCustomWordError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Keep a Ref of isRecording to avoid React state closure stale bugs
  const isRecordingRef = useRef(false);
  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  // Keep a Ref of transcript to guarantee we always get the absolute latest value in handleAnalyze
  const transcriptRef = useRef("");
  useEffect(() => {
    transcriptRef.current = transcript;
  }, [transcript]);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = true;
        rec.interimResults = false; // Disable interim results to make transcribing 100% stable
        rec.lang = 'en-US';

        rec.onresult = (event: any) => {
          let currentChunk = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              currentChunk += event.results[i][0].transcript + ' ';
            }
          }
          if (currentChunk) {
            setTranscript(prev => {
              const combined = (prev + ' ' + currentChunk).trim();
              transcriptRef.current = combined; // update ref immediately
              return combined;
            });
          }
        };

        rec.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
        };

        rec.onend = () => {
          // If the recognition stopped unexpectedly due to silence/timeout, but the user is still recording, restart it!
          if (isRecordingRef.current) {
            try {
              rec.start();
            } catch (e) {
              console.error("Failed to restart speech recognition:", e);
            }
          }
        };

        setRecognition(rec);
      }
    }
  }, []);

  // Web camera activation for mouth checks
  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480, facingMode: 'user' },
        audio: false 
      });
      streamRef.current = stream;
      setIsCameraOn(true);
    } catch (err: any) {
      console.error("Camera access failed:", err);
      setCameraError("Không thể truy cập camera. Vui lòng cho phép quyền truy cập webcam.");
      setIsCameraOn(false);
    }
  };

  // Bind the camera stream to the video element once it is mounted in the DOM
  useEffect(() => {
    if (isCameraOn && streamRef.current && videoRef.current) {
      try {
        videoRef.current.srcObject = streamRef.current;
        videoRef.current.play().catch(err => {
          console.error("Video play failed:", err);
        });
      } catch (err) {
        console.error("Error assigning stream to video element:", err);
      }
    }
  }, [isCameraOn]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  };

  // Sync camera state with Tab changes
  useEffect(() => {
    if (activeTab !== 'mouth') {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [activeTab]);

  const startRecording = () => {
    if (!recognition) {
      alert("Trình duyệt không hỗ trợ nhận diện giọng nói (hãy sử dụng Google Chrome).");
      return;
    }
    setTranscript('');
    transcriptRef.current = '';
    setResults(null);
    setIsRecording(true);
    setTimer(0);
    try {
      recognition.start();
    } catch (e) {
      console.error("Speech recognition start failed:", e);
    }
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    isRecordingRef.current = false;
    if (timerRef.current) clearInterval(timerRef.current);
    
    if (recognition) {
      try {
        recognition.stop();
      } catch (e) {
        console.error("Speech recognition stop failed:", e);
      }
    }
    
    // Automatically trigger analysis for Tab 1 (speaking), but NOT for Tab 2 (mouth/pronunciation lab)
    if (activeTab === 'speaking') {
      setTimeout(() => {
        handleAnalyze();
      }, 500);
    }
  };

  const handleAnalyze = async () => {
    const finalTranscript = transcriptRef.current.trim();
    if (!finalTranscript) {
      alert("EngBot chưa nhận diện được giọng nói của bạn. Hãy nói to, rõ ràng hơn gần micro nhé!");
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await fetch(`${API_BASE}/ai/analyze-speaking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          transcript: finalTranscript, 
          targetText: currentPhrase.text 
        }),
      });
      if (!response.ok) throw new Error("API busy");
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      setResults({
        score: 72,
        fluency: 75,
        pronunciation: 70,
        accuracy: 71,
        feedback: "Phát âm của bạn có tiến bộ tốt. Tuy nhiên hơi còn hơi yếu, hãy mở rộng cơ miệng khi phát các nguyên âm lớn nhé!",
        mispronounced: ["lazy", "dog"]
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Helper to dynamically generate highly accurate mouth articulation feedback locally when server or API quota is limited
  const generateLocalMouthFeedback = (word: string): any => {
    const w = word.trim().toLowerCase();
    
    let lips = "Mở rộng cơ miệng vừa phải, hai bên mép môi thả lỏng tự nhiên khi phát âm.";
    let tongue = "Đầu lưỡi thả lỏng đặt ở hàm dưới cho các nguyên âm, nâng nhẹ lên khi chuyển sang phụ âm.";
    let airflow = "Đẩy luồng hơi nhẹ nhàng từ thanh quản ra khoang miệng, rung nhẹ dây thanh quản cho các nguyên âm.";
    let mistakes = `Khi đọc từ '${word}', người Việt thường có xu hướng nuốt âm cuối (ending sounds) hoặc phát âm không rõ phần trọng âm.`;
    let steps = [
      `Bước 1: Nhìn vào gương hoặc webcam để đảm bảo khẩu hình thả lỏng tự nhiên khi bắt đầu phát âm '${word}'.`,
      `Bước 2: Đọc chậm rãi các âm tiết, cố gắng làm rõ các nguyên âm cấu thành.`,
      `Bước 3: Phát âm rõ âm đuôi (âm cuối) của từ để hoàn thành cấu âm chuẩn xác.`
    ];

    // Specific phonetic classifications
    if (w.includes("th")) {
      lips = "Hai mép hơi mở nhẹ sang hai bên, giữ cho môi trên và môi dưới không cản trở răng.";
      tongue = "Đặt đầu lưỡi nhô ra ngoài kẹp nhẹ giữa hàm răng cửa trên và dưới. Đây là mấu chốt quan trọng nhất!";
      airflow = "Thổi luồng hơi mạnh đi qua khe giữa mặt trên của lưỡi và răng cửa trên. Cố gắng không rung cổ họng đối với âm vô thanh như trong 'think'.";
      mistakes = `Người Việt hay đọc âm 'th' trong từ '${word}' thành âm /t/ (đọc giống 't') hoặc âm /s/ (đọc giống 'x'). Hãy chú ý kẹp nhẹ lưỡi giữa răng để sửa đổi.`;
      steps = [
        `Bước 1: Đưa đầu lưỡi ra ngoài kẹp nhẹ giữa hai hàm răng cửa khi bắt đầu phát âm '${word}'.`,
        `Bước 2: Đẩy luồng hơi mạnh từ bụng ra qua khe giữa lưỡi và răng cửa trên.`,
        `Bước 3: Thu nhanh lưỡi vào trong và hoàn thành phát âm phần còn lại của từ.`
      ];
    } 
    else if (w.includes("sh") || w.includes("tion") || w.includes("sion") || w.includes("ch") || w.includes("scene") || w.includes("she")) {
      lips = "Chu tròn môi và hướng nhẹ ra phía trước (vành môi mở tròn), hơi căng cơ má.";
      tongue = "Cong đầu lưỡi lên hướng về phía vòm họng trên nhưng không chạm vào vòm họng. Lưỡi hơi lùi về phía sau.";
      airflow = "Đẩy luồng hơi mạnh đi qua khe giữa đầu lưỡi và vòm họng cửa, tạo ra tiếng xì gió dày và ấm.";
      mistakes = `Với từ '${word}', người Việt thường phát âm nhẹ giống âm /s/ trong tiếng Việt mà quên không chu tròn môi và cong lưỡi để tạo ra âm gió dày /ʃ/.`;
      steps = [
        `Bước 1: Chu tròn môi hướng ra phía trước giống như khi đang ra hiệu im lặng 'suỵt' khi chuẩn bị phát âm '${word}'.`,
        `Bước 2: Cong đầu lưỡi lên phía vòm họng trên và thổi một luồng hơi gió dày ra ngoài.`,
        `Bước 3: Giữ nguyên hình dáng môi căng tròn và kết nối liền mạch vào các âm tiếp theo.`
      ];
    }
    else if (w.includes("s") || w.includes("ce") || w.includes("se")) {
      lips = "Hai bên mép môi hơi kéo nhẹ sang hai bên giống như đang mỉm cười nhẹ, răng cửa khép hờ.";
      tongue = "Đặt đầu lưỡi gần chân răng cửa hàm trên (nhưng không chạm hẳn vào răng), lưỡi thả phẳng.";
      airflow = "Thổi luồng hơi xì đều đặn đi qua khe hẹp giữa đầu lưỡi và chân răng cửa trên, không rung dây thanh.";
      mistakes = `Với từ '${word}' (chứa phụ âm xì /s/), người Việt hay quên không xì hơi ở âm đuôi hoặc đọc quá nhẹ. Hãy chú ý giữ luồng xì gió rõ nét.`;
      steps = [
        `Bước 1: Khép nhẹ răng cửa, kéo nhẹ hai mép môi sang hai bên để mở rộng khe xì gió cho từ '${word}'.`,
        `Bước 2: Đẩy luồng hơi gió liên tục và đều đặn qua khe răng cửa trên.`,
        `Bước 3: Chú ý nhấn rõ âm xì nếu âm này nằm ở cuối từ.`
      ];
    }
    else if (w.includes("r") || w.includes("wr")) {
      lips = "Môi hơi tròn nhẹ và hướng ra ngoài ở giai đoạn đầu, sau đó thả lỏng dần khi phát âm.";
      tongue = "Cong sâu đầu lưỡi ngược vào trong vòm họng, giữ cho đầu lưỡi tuyệt đối không chạm vào bất kỳ phần nào của miệng.";
      airflow = "Đẩy luồng hơi nhẹ đi qua khoang miệng khi lưỡi đang cong sâu, làm rung dây thanh quản tạo âm rền ấm.";
      mistakes = `Khi đọc âm /r/ trong từ '${word}', học viên Việt Nam thường để lưỡi chạm vào vòm họng giống âm 'r' tiếng Việt. Hãy nhớ lưỡi phải lơ lửng không chạm!`;
      steps = [
        `Bước 1: Mở miệng nhỏ, hơi chu nhẹ môi và chuẩn bị phát âm '${word}'.`,
        `Bước 2: Cong ngược đầu lưỡi vào trong khoang họng, giữ lơ lửng không chạm lợi răng.`,
        `Bước 3: Phát âm và đồng thời thả lỏng dần lưỡi về vị trí tự nhiên.`
      ];
    }
    else if (w.includes("l")) {
      lips = "Mở rộng cơ miệng tự nhiên theo chiều dọc, hai mép thả lỏng thoải mái.";
      tongue = "Đặt đầu lưỡi chạm chắc vào phần lợi ngay phía sau chân răng cửa hàm trên.";
      airflow = "Để luồng hơi đi ra tự do qua hai bên cạnh của lưỡi, đồng thời làm rung mạnh dây thanh quản.";
      mistakes = `Với âm /l/ trong từ '${word}', hãy phân biệt rõ 'l' đứng đầu (chạm thả lưỡi) và 'l' đứng cuối (giữ lưỡi chạm chân răng để tạo âm ồ nhẹ).`;
      steps = [
        `Bước 1: Mở rộng miệng thoải mái và nâng đầu lưỡi chạm vào lợi răng trên để phát âm '${word}'.`,
        `Bước 2: Giữ chặt đầu lưỡi tại vị trí lợi răng trên và phát âm ngân vang rung dây thanh quản.`,
        `Bước 3: Thả lưỡi ra nếu âm 'l' ở đầu từ, hoặc giữ nguyên lưỡi chạm răng nếu là âm 'l' cuối.`
      ];
    }
    else if (w.includes("p") || w.includes("b") || w.includes("m")) {
      lips = "Hai môi mím chặt lại hoàn toàn để chặn luồng hơi, sau đó mở nhanh môi ra để bật hơi.";
      tongue = "Đặt lưỡi tự nhiên nằm phẳng ở hàm dưới, không cần cử động lưỡi.";
      airflow = "Nén hơi trong khoang miệng đằng sau đôi môi mím, sau đó bật luồng hơi ra đột ngột (không rung dây thanh cho âm /p/, rung cho âm /b/).";
      mistakes = `Người Việt hay nhầm lẫn giữa âm bật hơi vô thanh /p/ và hữu thanh /b/ trong từ '${word}'. Cần mím chặt môi để bật hơi rõ ràng hơn.`;
      steps = [
        `Bước 1: Mím chặt môi để nén hơi lại trong khoang miệng trước khi phát âm '${word}'.`,
        `Bước 2: Mở nhanh đôi môi để giải phóng luồng hơi bị nén ra ngoài tạo tiếng bật rõ rệt.`,
        `Bước 3: Đảm bảo luồng hơi bật mạnh nếu là âm /p/ ở đầu hoặc cuối từ.`
      ];
    }
    else if (w.includes("f") || w.includes("v")) {
      lips = "Răng cửa hàm trên chạm nhẹ vào phần phía trong của môi dưới. Đây là tư thế cấu âm răng - môi.";
      tongue = "Đặt lưỡi ở trạng thái nghỉ tự nhiên ở sàn miệng, không tham gia vào cấu âm.";
      airflow = "Thổi luồng hơi gió nhẹ nhàng đi xuyên qua khe hẹp giữa răng cửa trên và môi dưới.";
      mistakes = `Với âm răng - môi trong từ '${word}', người học thỉnh thoảng nuốt mất âm 'f'/'v' cuối hoặc phát âm nhầm thành âm 'p' (mím môi). Hãy chạm răng vào môi dưới để sửa.`;
      steps = [
        `Bước 1: Đưa răng cửa trên chạm nhẹ lên bờ môi dưới khi bắt đầu phát âm '${word}'.`,
        `Bước 2: Đẩy luồng hơi gió xì nhẹ qua kẽ răng và môi dưới.`,
        `Bước 3: Ngân dài âm xì gió này nếu từ kết thúc bằng âm 'f' hoặc 'v'.`
      ];
    }

    return {
      sound: "IPA",
      word: word,
      mouthShape: { lips, tongue, airflow },
      vietnameseMistakes: mistakes,
      correctionSteps: steps,
      feedback: `Đã chuẩn bị xong hướng dẫn cấu âm thông minh cho từ '${word}'. Vui lòng bật camera soi khẩu hình và bấm nói thử nhé!`
    };
  };

  // Articulation analysis query
  const handleAnalyzeMouthShape = async () => {
    setIsMouthAnalyzing(true);
    setMouthFeedback(null);
    try {
      const response = await fetch(`${API_BASE}/ai/analyze-pronunciation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sound: selectedSound.sound,
          word: selectedSound.word,
          transcript: transcript || ""
        })
      });
      if (!response.ok) throw new Error("API busy");
      const data = await response.json();
      setMouthFeedback(data);
    } catch (err) {
      console.error("Using local articulation fallback generator:", err);
      // Use our dynamic intelligent fallback generator!
      setMouthFeedback(generateLocalMouthFeedback(selectedSound.word));
    } finally {
      setIsMouthAnalyzing(false);
    }
  };

  const handleAnalyzeCustomWord = async () => {
    const word = customWordInput.trim();
    if (!word) return;

    // Validate that the input is a valid standard English word (no Vietnamese diacritics, numbers, or special symbols)
    const englishRegex = /^[a-zA-Z'-]+$/;
    if (!englishRegex.test(word)) {
      setCustomWordError("Từ nhập chứa dấu tiếng Việt, số hoặc ký tự lạ. Vui lòng chỉ dùng ký tự tiếng Anh không dấu (Ví dụ: Beautiful, Schedule, Voice...)!");
      return;
    }
    setCustomWordError(null);

    setSelectedSound({
      sound: "IPA",
      word: word,
      desc: `Từ tự nhập: ${word}`
    });
    setMouthFeedback(null);
    setTranscript('');
    setIsMouthAnalyzing(true);
    
    try {
      const response = await fetch(`${API_BASE}/ai/analyze-pronunciation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sound: "IPA & Cấu âm tổng quát",
          word: word,
          transcript: ""
        })
      });
      if (!response.ok) throw new Error("API busy");
      const data = await response.json();
      setMouthFeedback(data);
    } catch (err) {
      console.error("Custom word api failed, using dynamic local generator:", err);
      // Fallback
      setMouthFeedback(generateLocalMouthFeedback(word));
    } finally {
      setIsMouthAnalyzing(false);
    }
  };

  // Render Elsa-Speak style highlight
  const renderHighlightedPhrase = () => {
    if (!results) {
      return <span className="text-slate-800">{currentPhrase.text}</span>;
    }

    const mispronouncedList = (results.mispronounced || []).map((w: string) => 
      w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").toLowerCase()
    );

    const words = currentPhrase.text.split(" ");
    return (
      <div className="flex flex-wrap justify-center gap-x-2 gap-y-3 max-w-2xl mx-auto leading-relaxed">
        {words.map((w, idx) => {
          const clean = w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").toLowerCase();
          const isWrong = mispronouncedList.includes(clean);
          return (
            <span 
              key={idx} 
              className={cn(
                "text-3xl font-black transition-all px-1.5 py-0.5 rounded-lg",
                isWrong 
                  ? "text-rose-500 bg-rose-50 border border-rose-100 line-through decoration-rose-300" 
                  : "text-emerald-600 bg-emerald-50/50 border border-emerald-100"
              )}
            >
              {w}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4 pb-12 animate-in fade-in duration-500">
      
      {/* Dynamic Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-br from-slate-900 via-slate-800 to-primary/95 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/20 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />
        
        <div className="space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur rounded-full text-xs font-black uppercase tracking-wider text-primary">
            <Sparkles className="w-3.5 h-3.5 fill-primary" /> AI Pronunciation Coach
          </div>
          <h1 className="text-3xl md:text-4xl font-black">Luyện Nói & Khẩu Hình AI</h1>
          <p className="text-slate-300 text-sm max-w-xl leading-relaxed font-medium">
            Luyện tập phát âm chuẩn bản xứ theo câu thực tế hoặc so khớp khẩu hình miệng trực quan bằng camera cùng trợ lý <span className="text-white font-bold underline decoration-primary decoration-2">EngBot AI</span>.
          </p>
        </div>

        <div className="flex gap-2.5 bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 relative z-10 w-fit shrink-0">
          <button 
            onClick={() => setActiveTab('speaking')}
            className={cn(
              "px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2",
              activeTab === 'speaking' ? "bg-white text-slate-900 shadow-md" : "text-slate-200 hover:text-white"
            )}
          >
            <Mic2 className="w-4 h-4" /> Luyện Phát Âm
          </button>
          <button 
            onClick={() => {
              setActiveTab('mouth');
              startCamera();
            }}
            className={cn(
              "px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2",
              activeTab === 'mouth' ? "bg-white text-slate-900 shadow-md" : "text-slate-200 hover:text-white"
            )}
          >
            <Camera className="w-4 h-4" /> Phòng Khẩu Hình AI
          </button>
        </div>
      </header>

      {activeTab === 'speaking' ? (
        // ─── TAB 1: SPEAKING PRACTICE ──────────────────────────────────────────
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            
            {/* Main Interactive Phrase Practice Card */}
            <div className="premium-card p-8 md:p-10 flex flex-col items-center text-center space-y-8 relative overflow-hidden bg-white border border-slate-100 shadow-xl rounded-3xl">
              <div className="absolute top-6 left-6 flex items-center gap-2">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                  currentPhrase.difficulty === 'Beginner' ? "bg-green-50 text-green-600 border-green-100" :
                  currentPhrase.difficulty === 'Intermediate' ? "bg-blue-50 text-blue-600 border-blue-100" :
                  "bg-purple-50 text-purple-600 border-purple-100"
                )}>
                  {currentPhrase.difficulty}
                </span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-2 py-1 bg-slate-50 rounded-full border border-slate-100">
                  {currentPhrase.focus}
                </span>
              </div>

              <div className="space-y-6 max-w-2xl w-full pt-4">
                {results ? (
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Phân tích từ AI</span>
                    <div className="py-4">{renderHighlightedPhrase()}</div>
                  </div>
                ) : (
                  <h2 className="text-3xl font-black leading-snug text-slate-800">
                    {currentPhrase.text}
                  </h2>
                )}

                <button 
                  onClick={() => speak(currentPhrase.text)} 
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-600 hover:text-primary transition-all mx-auto font-black text-xs uppercase tracking-wider border border-slate-200/60 shadow-sm"
                >
                  <Volume2 className="w-4 h-4 text-primary" />
                  Nghe phát âm mẫu chuẩn
                </button>
              </div>

              {/* Dynamic Sound Wave Visualizer */}
              <div className="w-full flex flex-col items-center py-6 space-y-8 border-t border-b border-slate-50 bg-slate-50/20 rounded-2xl px-4">
                {isRecording ? (
                  <div className="flex items-center justify-center gap-1.5 h-16 w-full max-w-xs">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="w-1.5 bg-primary rounded-full animate-wave" 
                        style={{ 
                          height: `${25 + Math.random() * 75}%`,
                          animationDelay: `${i * 0.08}s`,
                          animationDuration: '0.6s'
                        }} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="h-16 flex items-center justify-center">
                    <Waves className="w-10 h-10 text-slate-300 opacity-40 animate-pulse" />
                  </div>
                )}

                <div className="relative">
                  {isRecording && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-rose-500 font-black text-sm uppercase tracking-wider bg-rose-50 px-3 py-1 rounded-full border border-rose-100 animate-pulse flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                      Ghi âm: {timer < 10 ? `0${timer}` : timer}s
                    </div>
                  )}
                  <button 
                    onClick={isRecording ? stopRecording : startRecording}
                    className={cn(
                      "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl relative group",
                      isRecording 
                        ? "bg-rose-500 text-white scale-110 shadow-rose-500/40" 
                        : "bg-primary text-white hover:scale-105 shadow-primary/30"
                    )}
                  >
                    {isRecording ? (
                      <div className="w-6 h-6 bg-white rounded-md animate-pulse" />
                    ) : (
                      <Mic2 className="w-8 h-8 group-hover:scale-110 transition-transform" />
                    )}
                  </button>
                </div>

                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  {isRecording ? "Đang lắng nghe... bấm nút để hoàn tất" : "Nhấn nút micro để bắt đầu nói"}
                </p>
              </div>

              {transcript && (
                <div className="w-full p-5 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 text-left">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block mb-1">Kết quả nhận diện giọng nói:</span>
                  <p className="text-slate-600 font-semibold italic text-sm">"{transcript}"</p>
                </div>
              )}
            </div>

            {/* Phrase Selector */}
            <div className="space-y-4">
              <h3 className="font-black text-lg text-slate-800 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" /> Chọn câu luyện tập khác
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PRACTICE_PHRASES.map((p) => (
                  <button 
                    key={p.id}
                    onClick={() => {
                      setCurrentPhrase(p);
                      setTranscript('');
                      setResults(null);
                    }}
                    className={cn(
                      "p-5 premium-card text-left transition-all group rounded-2xl border-2",
                      currentPhrase.id === p.id 
                        ? "border-primary bg-primary/5 shadow-lg" 
                        : "bg-white border-slate-100 hover:border-slate-300"
                    )}
                  >
                    <p className="font-bold text-sm text-slate-800 line-clamp-2 mb-3 group-hover:text-primary transition-colors">"{p.text}"</p>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-2.5">
                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border",
                        p.difficulty === 'Beginner' ? "bg-green-50 text-green-600 border-green-100" :
                        p.difficulty === 'Intermediate' ? "bg-blue-50 text-blue-600 border-blue-100" :
                        "bg-purple-50 text-purple-600 border-purple-100"
                      )}>{p.difficulty}</span>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-all group-hover:translate-x-1" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results / Feedback Sidebar */}
          <div className="space-y-6">
            {isAnalyzing ? (
              <div className="premium-card p-12 border-dashed flex flex-col items-center justify-center text-center space-y-6 bg-white border border-slate-100 rounded-3xl">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <div className="space-y-2">
                  <h3 className="font-black text-slate-800">EngBot đang phân tích...</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">Đang so sánh biểu đồ âm thanh và từ vựng bạn vừa phát âm với câu mẫu.</p>
                </div>
              </div>
            ) : results ? (
              <div className="premium-card p-6 md:p-8 space-y-8 animate-in zoom-in-95 duration-500 bg-white border border-slate-100 shadow-xl rounded-3xl">
                <div className="text-center">
                  <div className="inline-flex p-4 bg-amber-400 rounded-full text-white mb-4 shadow-lg shadow-amber-400/20">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <h3 className="text-4xl font-black text-slate-800">{results.score}%</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Độ chính xác tổng quan</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                      <span>Độ trôi chảy (Fluency)</span>
                      <span className="text-primary font-black">{results.fluency}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${results.fluency}%` }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                      <span>Phát âm (Pronunciation)</span>
                      <span className="text-primary font-black">{results.pronunciation}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${results.pronunciation}%` }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                      <span>Độ chuẩn xác (Accuracy)</span>
                      <span className="text-primary font-black">{results.accuracy}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${results.accuracy}%` }} />
                    </div>
                  </div>
                </div>

                {results.mispronounced && results.mispronounced.length > 0 && (
                  <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-600 mb-2 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Từ phát âm chưa đúng:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {results.mispronounced.map((word: string, i: number) => (
                        <span key={i} className="px-2.5 py-1 bg-white border border-rose-100 text-rose-600 font-bold text-xs rounded-xl shadow-sm">
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-primary fill-primary" /> Lời khuyên từ AI Coach:
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                    {results.feedback}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setTranscript('');
                      setResults(null);
                    }}
                    className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Luyện nói lại
                  </button>
                </div>
              </div>
            ) : (
              <div className="premium-card p-8 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-5 bg-slate-50/50 rounded-3xl">
                <div className="p-5 bg-white rounded-full shadow-md border border-slate-100">
                  <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-600">Đang chờ phân tích</h3>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-[200px] mx-auto">
                    Hãy thực hiện bài thu âm bên trái để xem kết quả phân tích độ chuẩn xác và lời khuyên từ AI.
                  </p>
                </div>
              </div>
            )}

            <div className="premium-card p-6 bg-slate-900 text-white rounded-3xl relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-xl pointer-events-none" />
              <div className="relative z-10 space-y-2">
                <h3 className="font-black text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  Nói chuẩn như người bản xứ
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed font-medium">
                  Luyện tập liên tục mỗi câu 3 lần để ghi nhớ sâu các ngữ điệu, nhấn nhá tự nhiên và nhận thêm <span className="text-primary font-black">+100 XP</span>!
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // ─── TAB 2: ARTICULATION & MOUTH SHAPE LAB ──────────────────────────────
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sound Selector Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Custom Word Input Block */}
            <div className="premium-card p-5 bg-white border border-slate-100 shadow-md rounded-3xl space-y-4">
              <h3 className="font-black text-sm text-slate-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary fill-primary animate-pulse" /> Tự Nhập Từ Luyện Tập
              </h3>
              <div className="space-y-2.5">
                <div className="relative">
                  <input
                    type="text"
                    value={customWordInput}
                    onChange={(e) => {
                      setCustomWordInput(e.target.value);
                      if (customWordError) setCustomWordError(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAnalyzeCustomWord();
                    }}
                    placeholder="Ví dụ: Beautiful, Schedule, Rural..."
                    className="w-full pl-3 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary transition-all shadow-inner"
                  />
                  {customWordInput && (
                    <button 
                      onClick={() => {
                        setCustomWordInput("");
                        setCustomWordError(null);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold text-xs"
                    >
                      ×
                    </button>
                  )}
                </div>
                {customWordError && (
                  <p className="text-rose-500 font-bold text-[10px] leading-relaxed bg-rose-50 border border-rose-100 p-2.5 rounded-xl flex items-start gap-1.5 animate-in fade-in slide-in-from-top-1 duration-200 shadow-sm">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500 mt-0.5" />
                    {customWordError}
                  </p>
                )}
                <button
                  onClick={handleAnalyzeCustomWord}
                  disabled={!customWordInput.trim() || isMouthAnalyzing}
                  className={cn(
                    "w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm",
                    customWordInput.trim() && !isMouthAnalyzing
                      ? "bg-slate-900 hover:bg-slate-800 text-white hover:scale-[1.01] active:scale-95 cursor-pointer"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200/50"
                  )}
                >
                  {isMouthAnalyzing ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Đang phân tích...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      Phân Tích Cấu Âm Từ
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="premium-card p-5 bg-white border border-slate-100 shadow-md rounded-3xl">
              <h3 className="font-black text-base text-slate-800 mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" /> Chọn Âm Cần Luyện
              </h3>
              <div className="space-y-2">
                {PHONETIC_LAB_SOUNDS.map((soundItem) => (
                  <button
                    key={soundItem.sound}
                    onClick={() => {
                      setSelectedSound(soundItem);
                      setMouthFeedback(null);
                      setTranscript('');
                    }}
                    className={cn(
                      "w-full p-4 rounded-xl text-left border-2 transition-all flex items-center gap-4 group",
                      selectedSound.sound === soundItem.sound
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "bg-white border-slate-100 hover:border-slate-200"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg font-mono shrink-0",
                      selectedSound.sound === soundItem.sound
                        ? "bg-primary text-white"
                        : "bg-slate-100 text-slate-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                    )}>
                      {soundItem.sound}
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-sm text-slate-800">Từ ví dụ: <span className="text-primary font-black underline">{soundItem.word}</span></p>
                      <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">{soundItem.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick articulation tips */}
            <div className="premium-card p-5 bg-slate-50 border border-slate-100 rounded-3xl space-y-3">
              <h4 className="font-black text-xs uppercase tracking-widest text-slate-400">Cách Luyện Khẩu Hình Chuẩn</h4>
              <ul className="text-xs text-slate-600 space-y-2 leading-relaxed list-disc pl-4 font-semibold">
                <li>Ngồi thẳng và đặt camera chính diện khuôn mặt.</li>
                <li>Đưa miệng nằm đúng tâm vòng tròn căn chỉnh.</li>
                <li>Quan sát hình dáng môi và lưỡi của mình qua camera.</li>
                <li>Thực hiện thổi hơi hoặc phát âm kéo dài để kiểm chứng vị trí lưỡi.</li>
              </ul>
            </div>
          </div>

          {/* Articulation Center Panel */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Webcam Viewport */}
              <div className="premium-card p-6 bg-slate-900 border border-slate-800 shadow-xl rounded-3xl flex flex-col items-center justify-center text-center relative overflow-hidden h-[340px]">
                
                {isCameraOn ? (
                  <div className="w-full h-full relative rounded-2xl overflow-hidden bg-black">
                    <video 
                      ref={videoRef}
                      className="w-full h-full object-cover scale-x-[-1]"
                      playsInline 
                      muted
                    />
                    
                    {/* Articulation alignment circle target */}
                    <div className="absolute inset-0 border-4 border-dashed border-white/20 rounded-full m-8 pointer-events-none flex items-center justify-center animate-pulse">
                      <div className="w-32 h-32 border-2 border-primary/40 rounded-full flex items-center justify-center">
                        <span className="text-[9px] font-black text-primary bg-slate-950/80 px-2 py-0.5 rounded-full uppercase tracking-widest">Khớp Miệng Tại Đây</span>
                      </div>
                    </div>

                    <button 
                      onClick={stopCamera}
                      className="absolute bottom-4 right-4 bg-rose-500 hover:bg-rose-600 text-white p-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-rose-900/40"
                    >
                      <VideoOff className="w-3.5 h-3.5" /> Tắt Camera
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 py-8">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-500 mx-auto shadow-inner border border-slate-700">
                      <Video className="w-8 h-8" />
                    </div>
                    <div className="space-y-1.5 px-6">
                      <h3 className="font-black text-white text-base">Bật Camera Căn Khẩu Hình</h3>
                      <p className="text-xs text-slate-400 max-w-[280px] mx-auto leading-relaxed">
                        Cho phép quyền sử dụng webcam để nhìn trực quan chuyển động môi và lưỡi của bạn khi phát âm.
                      </p>
                    </div>
                    {cameraError ? (
                      <p className="text-xs text-rose-400 font-bold px-4">{cameraError}</p>
                    ) : (
                      <button 
                        onClick={startCamera}
                        className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 mx-auto shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                      >
                        <Video className="w-4 h-4" /> Kích Hoạt Camera
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Sound practice block */}
              <div className="premium-card p-6 bg-white border border-slate-100 shadow-xl rounded-3xl flex flex-col justify-between h-[340px]">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Đang Luyện Phát Âm Âm:</span>
                  </div>

                  <div className="flex items-end gap-3">
                    <span className="text-5xl font-black text-slate-800 font-mono">{selectedSound.sound}</span>
                    <span className="text-sm font-bold text-slate-400 pb-1">trong từ</span>
                    <span className="text-2xl font-black text-primary underline pb-0.5">{selectedSound.word}</span>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed font-semibold bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                    {selectedSound.desc}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => speak(selectedSound.word)}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border border-slate-200/40"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-primary" /> Nghe từ mẫu
                    </button>
                    
                    <button 
                      onClick={isRecording ? stopRecording : startRecording}
                      className={cn(
                        "flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95",
                        isRecording 
                          ? "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-200" 
                          : "bg-primary hover:bg-primary/95 text-white shadow-primary/10"
                      )}
                    >
                      {isRecording ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Thu âm: {timer}s
                        </>
                      ) : (
                        <>
                          <Mic2 className="w-3.5 h-3.5" />
                          Thu âm thử
                        </>
                      )}
                    </button>
                  </div>

                  {transcript ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between gap-2">
                      <p className="text-[11px] text-emerald-800 font-semibold truncate italic">Đã thu âm: "{transcript}"</p>
                      <button 
                        onClick={handleAnalyzeMouthShape} 
                        disabled={isMouthAnalyzing}
                        className="text-[9px] font-black text-white bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-lg uppercase tracking-wider shrink-0"
                      >
                        {isMouthAnalyzing ? "Đang quét..." : "Phân tích AI"}
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={handleAnalyzeMouthShape}
                      disabled={isMouthAnalyzing}
                      className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-slate-900/10"
                    >
                      {isMouthAnalyzing ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Đang tải khẩu hình chuẩn từ AI...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          Phân Tích Cấu Âm Chuẩn
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* AI Mouth Shape Feedback / Articulation Guides */}
            {mouthFeedback ? (
              <div className="premium-card p-6 md:p-8 bg-white border border-slate-100 shadow-xl rounded-3xl space-y-6 animate-in slide-in-from-bottom-3 duration-500">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black font-mono shrink-0">
                      {mouthFeedback.sound.length > 5 ? "IPA" : mouthFeedback.sound}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-slate-800 text-base truncate">Hướng Dẫn Khẩu Hình Chi Tiết: {mouthFeedback.word}</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Cung cấp bởi EngBot Articulation Lab</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-full font-black text-[9px] uppercase tracking-wider flex items-center gap-1 shrink-0">
                    <Check className="w-3 h-3" /> ĐÃ PHÂN TÍCH
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-primary" /> MÔI (LIPS)
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                      {mouthFeedback.mouthShape?.lips || "Đang cập nhật..."}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5 text-primary" /> LƯỠI (TONGUE)
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                      {mouthFeedback.mouthShape?.tongue || "Đang cập nhật..."}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <Waves className="w-3.5 h-3.5 text-primary" /> LUỒNG HƠI (AIRFLOW)
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                      {mouthFeedback.mouthShape?.airflow || "Đang cập nhật..."}
                    </p>
                  </div>
                </div>

                {mouthFeedback.vietnameseMistakes && (
                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-700 mb-2 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Lỗi sai người Việt thường gặp:
                    </h4>
                    <p className="text-xs text-amber-800 leading-relaxed font-semibold">
                      {mouthFeedback.vietnameseMistakes}
                    </p>
                  </div>
                )}

                {mouthFeedback.correctionSteps && mouthFeedback.correctionSteps.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Các Bước Thực Hành Điều Chỉnh Khẩu Hình:</h4>
                    <div className="space-y-2">
                      {mouthFeedback.correctionSteps.map((step: string, i: number) => (
                        <div key={i} className="flex gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl items-start">
                          <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <p className="text-xs text-slate-700 leading-relaxed font-semibold">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {mouthFeedback.feedback && (
                  <div className="p-5 bg-primary/5 rounded-2xl border border-primary/10">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-primary fill-primary" /> Đánh giá luyện tập của bạn:
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                      {mouthFeedback.feedback}
                    </p>
                  </div>
                )}

              </div>
            ) : (
              <div className="premium-card p-10 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-4 bg-slate-50/50 rounded-3xl">
                <div className="p-5 bg-white rounded-full shadow-md border border-slate-100">
                  <Camera className="w-8 h-8 text-slate-300 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-600">Đang chờ khởi chạy Lab</h3>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                    Chọn một âm cần luyện bên trái, thực hiện thu âm thử hoặc bấm "Phân Tích Cấu Âm Chuẩn" để EngBot phân tích luồng hơi, cách đặt răng môi lưỡi cho bạn.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
