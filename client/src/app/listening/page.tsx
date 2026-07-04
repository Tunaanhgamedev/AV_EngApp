'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Headphones, Play, Pause, SkipBack, SkipForward, Volume2, BookOpen, 
  ListMusic, Heart, CheckCircle2, XCircle, RotateCcw, ChevronRight, 
  Globe, ExternalLink, Radio, Mic, Sparkles, Clock, Search, 
  Flame, Award, Check, Sparkle
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Interfaces & Types ──────────────────────────────────────────────────────
interface TranscriptLine {
  time: number;
  text: string;
  gapWord: string; // The word hidden in dictation mode
}

interface Quiz {
  q: string;
  options: string[];
  answer: number; // Index of the correct option
}

interface VocabularyItem {
  word: string;
  ipa: string;
  type: string; // "noun", "verb", "adjective", etc.
  meaningVi: string;
  example: string;
}

interface Lesson {
  id: number;
  title: string;
  category: string;
  level: string;
  duration: string;
  color: string;
  transcript: TranscriptLine[];
  quizzes: Quiz[];
  vocabulary: VocabularyItem[];
}

// ─── 15 High-Quality Diverse Lessons Data ──────────────────────────────────────
const LESSONS: Lesson[] = [
  {
    id: 1,
    title: "Morning Routine in London",
    category: "Daily Life",
    level: "B1",
    duration: "1:20",
    color: "from-blue-500 to-indigo-600",
    transcript: [
      { time: 0, text: "Welcome back to our Daily London podcast.", gapWord: "podcast" },
      { time: 4, text: "Today, we are exploring the historic streets of Greenwich.", gapWord: "streets" },
      { time: 9, text: "As the sun rises over the Thames, the city begins to wake up.", gapWord: "begins" },
      { time: 15, text: "You can hear the distant sounds of the early morning commuters.", gapWord: "distant" },
      { time: 21, text: "The aroma of fresh coffee drifts from the local bakeries.", gapWord: "coffee" },
      { time: 27, text: "London is truly magnificent at this hour of the morning.", gapWord: "magnificent" },
    ],
    quizzes: [
      { q: "Where is this podcast set?", options: ["Paris", "Greenwich", "New York", "Tokyo"], answer: 1 },
      { q: "What does the speaker smell?", options: ["Rain", "Flowers", "Fresh coffee", "Food markets"], answer: 2 },
      { q: "What body of water is mentioned?", options: ["The Seine", "The Thames", "The Hudson", "The Nile"], answer: 1 }
    ],
    vocabulary: [
      { word: "commuters", ipa: "/kəˈmjuː.tərz/", type: "noun", meaningVi: "Người đi làm xa bằng xe bus/tàu điện", example: "The morning trains are always packed with commuters." },
      { word: "aroma", ipa: "/əˈroʊ.mə/", type: "noun", meaningVi: "Mùi hương dễ chịu, hương thơm", example: "I love the rich aroma of freshly brewed coffee." },
      { word: "magnificent", ipa: "/mæɡˈnɪf.ə.sənt/", type: "adjective", meaningVi: "Tuyệt vời, tráng lệ, lộng lẫy", example: "The sunset over London was absolutely magnificent." }
    ]
  },
  {
    id: 2,
    title: "The Future of AI",
    category: "Technology",
    level: "C1",
    duration: "1:40",
    color: "from-violet-500 to-fuchsia-600",
    transcript: [
      { time: 0, text: "Artificial intelligence is reshaping every industry on earth.", gapWord: "reshaping" },
      { time: 5, text: "From healthcare diagnostics to autonomous vehicles, AI is everywhere.", gapWord: "autonomous" },
      { time: 11, text: "The question is not whether AI will change the world.", gapWord: "change" },
      { time: 17, text: "The question is how quickly we can adapt and harness its potential.", gapWord: "harness" },
      { time: 23, text: "Experts predict that eighty percent of jobs will be augmented by AI by 2030.", gapWord: "augmented" },
    ],
    quizzes: [
      { q: "What percentage of jobs will AI augment by 2030?", options: ["50%", "60%", "80%", "90%"], answer: 2 },
      { q: "AI is used in which field mentioned?", options: ["Farming", "Healthcare", "Fishing", "Mining"], answer: 1 },
      { q: "What is our primary challenge with AI according to the speaker?", options: ["Stopping development", "Adapting and harnessing it", "Finding funding", "Replacing programmers"], answer: 1 }
    ],
    vocabulary: [
      { word: "autonomous", ipa: "/ɑːˈtɑː.nə.məs/", type: "adjective", meaningVi: "Tự trị, tự vận hành, tự lái", example: "Self-driving cars are also known as autonomous vehicles." },
      { word: "harness", ipa: "/ˈhɑːr.nəs/", type: "verb", meaningVi: "Khai thác, tận dụng triệt để lực lượng/tiềm năng", example: "We must learn to harness AI to boost productivity." },
      { word: "augmented", ipa: "/ɑːɡˈmen.t̬ɪd/", type: "adjective", meaningVi: "Được gia tăng, tăng cường hiệu suất", example: "Jobs will not disappear; they will be augmented by smart tools." }
    ]
  },
  {
    id: 3,
    title: "Ordering Food at a Restaurant",
    category: "Travel",
    level: "A2",
    duration: "0:50",
    color: "from-orange-500 to-amber-600",
    transcript: [
      { time: 0, text: "Excuse me, could I see the menu please?", gapWord: "menu" },
      { time: 4, text: "I'd like to order the grilled salmon with vegetables.", gapWord: "grilled" },
      { time: 9, text: "Could I also get a glass of sparkling water?", gapWord: "sparkling" },
      { time: 13, text: "Yes, and for dessert, I'll have the chocolate cake.", gapWord: "dessert" },
      { time: 18, text: "Thank you so much. The food looks absolutely delicious!", gapWord: "delicious" },
    ],
    quizzes: [
      { q: "What did they order as a main dish?", options: ["Steak", "Pasta", "Grilled salmon", "Pizza"], answer: 2 },
      { q: "What type of water did they request?", options: ["Still", "Sparkling", "Warm", "Lemon"], answer: 1 },
      { q: "What is chosen for dessert?", options: ["Apple pie", "Ice cream", "Fruit salad", "Chocolate cake"], answer: 3 }
    ],
    vocabulary: [
      { word: "grilled", ipa: "/ɡrɪld/", type: "adjective", meaningVi: "Được nướng bằng vỉ/than", example: "I prefer grilled fish rather than fried fish." },
      { word: "sparkling", ipa: "/ˈspɑːr.klɪŋ/", type: "adjective", meaningVi: "Có ga, sủi bọt", example: "Would you like still or sparkling mineral water?" },
      { word: "dessert", ipa: "/dɪˈzɝːt/", type: "noun", meaningVi: "Món tráng miệng (chú ý phân biệt spelling với desert)", example: "We had fresh strawberries and cream for dessert." }
    ]
  },
  {
    id: 4,
    title: "Climate Change and the Ocean",
    category: "Science",
    level: "B2",
    duration: "1:30",
    color: "from-teal-500 to-emerald-600",
    transcript: [
      { time: 0, text: "The ocean absorbs about thirty percent of the carbon dioxide produced by humans.", gapWord: "absorbs" },
      { time: 6, text: "This process is causing ocean acidification, threatening marine ecosystems.", gapWord: "ecosystems" },
      { time: 12, text: "Coral reefs, which support twenty-five percent of all marine species, are particularly vulnerable.", gapWord: "vulnerable" },
      { time: 18, text: "Rising sea temperatures are causing widespread coral bleaching events.", gapWord: "bleaching" },
      { time: 24, text: "Scientists warn that we must reduce emissions to protect our oceans.", gapWord: "emissions" },
    ],
    quizzes: [
      { q: "How much CO2 does the ocean absorb?", options: ["10%", "20%", "30%", "50%"], answer: 2 },
      { q: "What percentage of marine species do coral reefs support?", options: ["10%", "15%", "25%", "50%"], answer: 2 },
      { q: "What is the key consequence of rising sea temperatures mentioned?", options: ["Tsunamis", "Coral bleaching", "Overfishing", "Plastic pollution"], answer: 1 }
    ],
    vocabulary: [
      { word: "acidification", ipa: "/əˌsɪd.ə.fəˈkeɪ.ʃən/", type: "noun", meaningVi: "Sự axit hóa (nồng độ axit tăng cao)", example: "Ocean acidification makes it difficult for shellfish to grow." },
      { word: "vulnerable", ipa: "/ˈvʌl.nər.ə.bəl/", type: "adjective", meaningVi: "Dễ bị tổn thương, dễ gặp nguy hiểm", example: "Young sea creatures are highly vulnerable to temperature shifts." },
      { word: "bleaching", ipa: "/ˈbliː.tʃɪŋ/", type: "noun", meaningVi: "Sự tẩy trắng (suy giảm tảo ký sinh ở san hô)", example: "Coral bleaching occurs when water conditions stress the reef." }
    ]
  },
  {
    id: 5,
    title: "A Job Interview Conversation",
    category: "Business",
    level: "B1",
    duration: "1:15",
    color: "from-rose-500 to-pink-600",
    transcript: [
      { time: 0, text: "Good morning! Thank you for coming in today.", gapWord: "morning" },
      { time: 4, text: "Can you tell me a little about your previous experience?", gapWord: "experience" },
      { time: 9, text: "I worked as a marketing coordinator for three years at a tech startup.", gapWord: "coordinator" },
      { time: 15, text: "What would you say is your greatest professional strength?", gapWord: "strength" },
      { time: 20, text: "I'm very organized and I work well under pressure.", gapWord: "organized" },
      { time: 25, text: "Excellent. We'll be in touch within the next week.", gapWord: "touch" },
    ],
    quizzes: [
      { q: "What was the candidate's previous job?", options: ["Designer", "Marketing coordinator", "Engineer", "Teacher"], answer: 1 },
      { q: "How long did they work there?", options: ["1 year", "2 years", "3 years", "5 years"], answer: 2 },
      { q: "How does the candidate describe their strength?", options: ["Creative and funny", "Fast coder", "Organized and works well under pressure", "Good at sales"], answer: 2 }
    ],
    vocabulary: [
      { word: "coordinator", ipa: "/koʊˈɔːr.dən.eɪ.t̬ɚ/", type: "noun", meaningVi: "Điều phối viên", example: "As a marketing coordinator, she managed the entire social media budget." },
      { word: "strength", ipa: "/streŋθ/", type: "noun", meaningVi: "Điểm mạnh, ưu điểm lớn nhất", example: "Identifying your key strength is crucial for job interviews." },
      { word: "in touch", ipa: "/ɪn tʌtʃ/", type: "idiom", meaningVi: "Giữ liên lạc, thông báo tin tức", example: "We will be in touch as soon as the results are calculated." }
    ]
  },
  {
    id: 6,
    title: "Famous Inventions That Changed the World",
    category: "History",
    level: "A2",
    duration: "1:20",
    color: "from-amber-500 to-orange-500",
    transcript: [
      { time: 0, text: "Throughout history, many inventions have changed the way we live.", gapWord: "history" },
      { time: 5, text: "The printing press, invented by Gutenberg in 1440, made books accessible to everyone.", gapWord: "printing" },
      { time: 11, text: "The light bulb, created by Thomas Edison, transformed how we work and live after dark.", gapWord: "transformed" },
      { time: 17, text: "Alexander Graham Bell's telephone connected people across great distances.", gapWord: "telephone" },
      { time: 23, text: "Today, the internet is perhaps the most transformative invention of all time.", gapWord: "transformative" },
    ],
    quizzes: [
      { q: "Who invented the printing press?", options: ["Edison", "Bell", "Gutenberg", "Newton"], answer: 2 },
      { q: "What did Alexander Graham Bell invent?", options: ["Radio", "Telephone", "Television", "Computer"], answer: 1 },
      { q: "Which invention is called the most transformative today?", options: ["Light bulb", "Printing press", "Internet", "Telephone"], answer: 2 }
    ],
    vocabulary: [
      { word: "accessible", ipa: "/əkˈses.ə.bəl/", type: "adjective", meaningVi: "Dễ tiếp cận, có thể sử dụng rộng rãi", example: "The library made books accessible to all citizens." },
      { word: "transformed", ipa: "/trænsˈfɔːrmd/", type: "verb", meaningVi: "Biến đổi sâu sắc diện mạo/tính chất", example: "Electric lights transformed factories by enabling night shifts." },
      { word: "transformative", ipa: "/trænsˈfɔːr.mə.t̬ɪv/", type: "adjective", meaningVi: "Có tính chất thay đổi to lớn, cách mạng", example: "The invention of smartphones was a transformative moment in history." }
    ]
  },
  {
    id: 7,
    title: "Healthy Eating Habits",
    category: "Health",
    level: "A2",
    duration: "1:05",
    color: "from-green-500 to-teal-500",
    transcript: [
      { time: 0, text: "Eating healthy doesn't have to be complicated or expensive.", gapWord: "expensive" },
      { time: 5, text: "Try to eat at least five servings of fruits and vegetables every day.", gapWord: "servings" },
      { time: 10, text: "Choose whole grains like brown rice and whole wheat bread.", gapWord: "grains" },
      { time: 15, text: "Drink plenty of water throughout the day — at least eight glasses.", gapWord: "glasses" },
      { time: 20, text: "Limit sugary drinks and processed foods as much as possible.", gapWord: "processed" },
    ],
    quizzes: [
      { q: "How many servings of fruits and vegetables should you eat daily?", options: ["3", "4", "5", "7"], answer: 2 },
      { q: "How many glasses of water are recommended per day?", options: ["4", "6", "8", "10"], answer: 2 },
      { q: "What should you limit consuming?", options: ["Fruits", "Sugary drinks and processed foods", "Whole grains", "Water"], answer: 1 }
    ],
    vocabulary: [
      { word: "servings", ipa: "/ˈsɝː.vɪŋz/", type: "noun", meaningVi: "Khẩu phần ăn, suất ăn", example: "The doctor recommends three servings of vegetables per meal." },
      { word: "whole grains", ipa: "/hoʊl ɡreɪnz/", type: "noun", meaningVi: "Ngũ cốc nguyên hạt", example: "Whole grains contain more fiber than processed white flour." },
      { word: "processed", ipa: "/ˈprɑː.sest/", type: "adjective", meaningVi: "Được chế biến sẵn, công nghiệp", example: "Processed meats often contain too much sodium." }
    ]
  },
  {
    id: 8,
    title: "Space Exploration: Mars Mission",
    category: "Science",
    level: "C1",
    duration: "1:30",
    color: "from-slate-600 to-zinc-800",
    transcript: [
      { time: 0, text: "NASA and SpaceX are working together on the most ambitious mission in human history.", gapWord: "ambitious" },
      { time: 6, text: "The goal is to send the first humans to Mars by the end of this decade.", gapWord: "decade" },
      { time: 12, text: "The journey to Mars takes approximately seven months using current technology.", gapWord: "approximately" },
      { time: 18, text: "Astronauts will need to grow their own food and recycle water on the planet.", gapWord: "recycle" },
      { time: 24, text: "This mission represents humanity's next great leap into the unknown.", gapWord: "unknown" },
    ],
    quizzes: [
      { q: "How long does the journey to Mars take?", options: ["3 months", "5 months", "7 months", "12 months"], answer: 2 },
      { q: "What will astronauts need to do on Mars?", options: ["Mine gold", "Build cities", "Grow food", "Fly planes"], answer: 2 },
      { q: "Who is NASA collaborating with on this project?", options: ["ESA", "SpaceX", "Blue Origin", "Roscosmos"], answer: 1 }
    ],
    vocabulary: [
      { word: "ambitious", ipa: "/æmˈbɪʃ.əs/", type: "adjective", meaningVi: "Tham vọng, đầy hoài bão", example: "Sending humans to another planet is a highly ambitious goal." },
      { word: "approximately", ipa: "/əˈprɑːk.sə.mət.li/", type: "adverb", meaningVi: "Khoảng chừng, xấp xỉ", example: "The trip will take approximately twenty minutes." },
      { word: "leap", ipa: "/liːp/", type: "noun", meaningVi: "Bước nhảy vọt", example: "Neil Armstrong called it 'one giant leap for mankind'." }
    ]
  },
  {
    id: 9,
    title: "A Casual Conversation: Weekend Plans",
    category: "Daily Life",
    level: "A1",
    duration: "0:50",
    color: "from-sky-400 to-indigo-500",
    transcript: [
      { time: 0, text: "Hey Sarah, do you have any plans for the upcoming weekend?", gapWord: "weekend" },
      { time: 4, text: "I am going to hike in the mountains with some friends.", gapWord: "hike" },
      { time: 9, text: "That sounds exciting! I hope the weather is clear.", gapWord: "weather" },
      { time: 13, text: "Yes, the forecast says it will be sunny and warm.", gapWord: "forecast" },
      { time: 18, text: "Great. I am just staying home to read and relax.", gapWord: "relax" },
    ],
    quizzes: [
      { q: "What is Sarah going to do on the weekend?", options: ["Go shopping", "Hike in the mountains", "Watch a movie", "Study"], answer: 1 },
      { q: "How is the weather forecast described?", options: ["Rainy and cold", "Windy", "Sunny and warm", "Snowy"], answer: 2 },
      { q: "What will the other speaker do?", options: ["Hike too", "Stay home to read and relax", "Go to work", "Visit family"], answer: 1 }
    ],
    vocabulary: [
      { word: "hike", ipa: "/haɪk/", type: "verb", meaningVi: "Đi bộ đường dài (dã ngoại)", example: "We plan to hike the Grand Canyon next spring." },
      { word: "forecast", ipa: "/ˈfɔːr.kæst/", type: "noun", meaningVi: "Dự báo thời tiết", example: "According to the forecast, it will rain tomorrow." },
      { word: "relax", ipa: "/rɪˈlæks/", type: "verb", meaningVi: "Thư giãn, giải tỏa căng thẳng", example: "Music helps me relax after a long day of coding." }
    ]
  },
  {
    id: 10,
    title: "Booking a Hotel in Tokyo",
    category: "Travel",
    level: "B1",
    duration: "1:05",
    color: "from-amber-400 to-orange-500",
    transcript: [
      { time: 0, text: "Hello, I would like to book a double room for three nights.", gapWord: "book" },
      { time: 5, text: "Certainly. We have rooms available with a view of Tokyo Tower.", gapWord: "available" },
      { time: 10, text: "That sounds perfect. Does the price include breakfast?", gapWord: "breakfast" },
      { time: 14, text: "Yes, a complimentary buffet breakfast is served every morning.", gapWord: "complimentary" },
      { time: 19, text: "Excellent. Please reserve it under the name of John Smith.", gapWord: "reserve" },
    ],
    quizzes: [
      { q: "What room type is being booked?", options: ["Single room", "Suite", "Double room", "Family room"], answer: 2 },
      { q: "How long is the stay?", options: ["2 nights", "3 nights", "5 nights", "1 week"], answer: 1 },
      { q: "Is breakfast included?", options: ["No, it costs extra", "Yes, it is complimentary", "Only on weekends", "No breakfast is served"], answer: 1 }
    ],
    vocabulary: [
      { word: "book", ipa: "/bʊk/", type: "verb", meaningVi: "Đặt trước (vé, phòng...)", example: "I need to book a flight to Ho Chi Minh City." },
      { word: "complimentary", ipa: "/ˌkɑːm.pləˈmen.t̬ɚ.i/", type: "adjective", meaningVi: "Miễn phí (do khách sạn/dịch vụ tặng kèm)", example: "The hotel offers complimentary bottled water to guests." },
      { word: "reserve", ipa: "/rɪˈzɝːv/", type: "verb", meaningVi: "Giữ chỗ, đặt chỗ", example: "They reserved a table by the window for their anniversary." }
    ]
  },
  {
    id: 11,
    title: "Software Scrum Standup Meeting",
    category: "Business",
    level: "B2",
    duration: "1:20",
    color: "from-purple-500 to-violet-700",
    transcript: [
      { time: 0, text: "Let us start the daily standup. Let's go around the room.", gapWord: "standup" },
      { time: 5, text: "Yesterday, I finished implementing the database schema changes.", gapWord: "schema" },
      { time: 10, text: "Today, I am writing unit tests and fixing some minor bugs.", gapWord: "tests" },
      { time: 15, text: "Are there any blockers preventing you from finishing this sprint?", gapWord: "blockers" },
      { time: 20, text: "No blockers, but I need a quick code review on my pull request.", gapWord: "request" },
    ],
    quizzes: [
      { q: "What type of meeting is this?", options: ["Planning meeting", "Daily standup", "Retrospective", "Client demo"], answer: 1 },
      { q: "What did the developer finish yesterday?", options: ["Writing unit tests", "Deploying code", "Database schema changes", "Designing a logo"], answer: 2 },
      { q: "What does the developer need today?", options: ["A salary raise", "A quick code review", "New computer", "More vacation time"], answer: 1 }
    ],
    vocabulary: [
      { word: "standup", ipa: "/ˈstænd.ʌp/", type: "noun", meaningVi: "Cuộc họp nhanh hàng ngày (thường đứng) trong Agile/Scrum", example: "Our standup is at 9:00 AM every morning." },
      { word: "blockers", ipa: "/ˈblɑː.kɚz/", type: "noun", meaningVi: "Vấn đề gây cản trở, tắc nghẽn công việc", example: "Please raise any blockers immediately so we can help resolve them." },
      { word: "pull request", ipa: "/pʊl rɪˈkwest/", type: "noun", meaningVi: "Yêu cầu tích hợp mã nguồn (Git PR)", example: "He submitted a pull request with the login fix." }
    ]
  },
  {
    id: 12,
    title: "Introduction to Cryptocurrency",
    category: "Technology",
    level: "C1",
    duration: "1:45",
    color: "from-violet-600 to-indigo-700",
    transcript: [
      { time: 0, text: "Cryptocurrency is a digital payment system that does not rely on banks.", gapWord: "digital" },
      { time: 5, text: "It is a peer-to-peer system that enables anyone anywhere to send money.", gapWord: "peer" },
      { time: 10, text: "Transactions are recorded in a public ledger called the blockchain.", gapWord: "ledger" },
      { time: 16, text: "Unlike physical money, cryptocurrency exists only in digital databases.", gapWord: "databases" },
      { time: 22, text: "Security is maintained using advanced encryption techniques.", gapWord: "encryption" },
    ],
    quizzes: [
      { q: "Does cryptocurrency rely on traditional banks?", options: ["Yes, completely", "No, it does not", "Only for international deals", "Only on weekends"], answer: 1 },
      { q: "What is the public ledger of transactions called?", options: ["Database", "Blockchain", "Spreadsheet", "Cloud storage"], answer: 1 },
      { q: "How is cryptocurrency secured?", options: ["By physical guards", "Using paper seals", "Advanced encryption techniques", "By passwords sent in email"], answer: 2 }
    ],
    vocabulary: [
      { word: "ledger", ipa: "/ˈledʒ.ɚ/", type: "noun", meaningVi: "Sổ cái, sổ ghi chép giao dịch tài chính", example: "Every single transaction is written to the distributed ledger." },
      { word: "peer-to-peer", ipa: "/ˌpɪr.təˈpɪr/", type: "adjective", meaningVi: "Mạng ngang hàng (trực tiếp giữa hai bên)", example: "The network operates on a peer-to-peer basis without central servers." },
      { word: "encryption", ipa: "/ɪnˈkrɪp.ʃən/", type: "noun", meaningVi: "Sự mã hóa thông tin bảo mật", example: "Encryption ensures that only the sender and receiver can read the message." }
    ]
  },
  {
    id: 13,
    title: "Shopping for Clothes",
    category: "Daily Life",
    level: "A2",
    duration: "1:00",
    color: "from-sky-500 to-cyan-600",
    transcript: [
      { time: 0, text: "Hello! Can I help you find a specific item today?", gapWord: "specific" },
      { time: 5, text: "Yes, I am looking for a blue jacket in medium size.", gapWord: "jacket" },
      { time: 10, text: "We have some on sale over here in the casual wear section.", gapWord: "casual" },
      { time: 14, text: "Great. Can I try it on in the fitting room?", gapWord: "fitting" },
      { time: 18, text: "Of course. The fitting rooms are located right behind the cash desk.", gapWord: "behind" },
    ],
    quizzes: [
      { q: "What item is the customer looking for?", options: ["Red trousers", "Blue jacket", "Yellow dress", "Black shoes"], answer: 1 },
      { q: "What size do they need?", options: ["Small", "Medium", "Large", "Extra Large"], answer: 1 },
      { q: "Where are the fitting rooms located?", options: ["Outside the shop", "Next to the entrance", "Behind the cash desk", "On the second floor"], answer: 2 }
    ],
    vocabulary: [
      { word: "try on", ipa: "/traɪ ɑːn/", type: "phrasal verb", meaningVi: "Thử quần áo", example: "Always try on shoes before buying them." },
      { word: "fitting room", ipa: "/ˈfɪt̬.ɪŋ ruːm/", type: "noun", meaningVi: "Phòng thử đồ", example: "Is there a mirror inside the fitting room?" },
      { word: "cash desk", ipa: "/kæʃ desk/", type: "noun", meaningVi: "Quầy thu ngân, quầy thanh toán", example: "Please bring your items to the cash desk for payment." }
    ]
  },
  {
    id: 14,
    title: "Negotiating a Business Contract",
    category: "Business",
    level: "C1",
    duration: "1:40",
    color: "from-rose-600 to-red-700",
    transcript: [
      { time: 0, text: "We need to discuss the payment terms in section four of the agreement.", gapWord: "terms" },
      { time: 5, text: "We propose a thirty-day payment cycle instead of the current sixty days.", gapWord: "cycle" },
      { time: 11, text: "Sixty days is standard for our company to maintain steady cash flow.", gapWord: "steady" },
      { time: 17, text: "Understood, but we require a shorter period to cover raw material costs.", gapWord: "period" },
      { time: 23, text: "Perhaps we can agree on forty-five days as a fair compromise.", gapWord: "compromise" },
      { time: 28, text: "That sounds reasonable. Let us update the draft accordingly.", gapWord: "draft" },
    ],
    quizzes: [
      { q: "What section of the contract are they discussing?", options: ["Section one", "Section three", "Section four", "Section ten"], answer: 2 },
      { q: "What payment cycle does the client propose initially?", options: ["30 days", "45 days", "60 days", "90 days"], answer: 0 },
      { q: "What compromise is agreed upon?", options: ["30 days", "40 days", "45 days", "Keep it at 60 days"], answer: 2 }
    ],
    vocabulary: [
      { word: "compromise", ipa: "/ˈkɑːm.prə.maɪz/", type: "noun", meaningVi: "Sự thỏa hiệp, giải pháp dung hòa", example: "After hours of debate, both parties reached a compromise." },
      { word: "steadily", ipa: "/ˈsted.əl.i/", type: "adverb", meaningVi: "Đều đặn, ổn định", example: "Company revenue has been growing steadily this year." },
      { word: "draft", ipa: "/dræft/", type: "noun", meaningVi: "Bản nháp, bản thảo hợp đồng", example: "We will review the final draft before signing tomorrow." }
    ]
  },
  {
    id: 15,
    title: "The Importance of Biodiversity",
    category: "Science",
    level: "B2",
    duration: "1:30",
    color: "from-teal-600 to-emerald-700",
    transcript: [
      { time: 0, text: "Biodiversity refers to the variety of life forms on our planet.", gapWord: "variety" },
      { time: 6, text: "Every organism, from bacteria to blue whales, plays a crucial role.", gapWord: "organism" },
      { time: 12, text: "Healthy ecosystems purify water, recycle nutrients, and stabilize the climate.", gapWord: "purify" },
      { time: 18, text: "However, human activities are accelerating species extinction rates.", gapWord: "extinction" },
      { time: 24, text: "Protecting habitats is vital to preserve the balance of nature.", gapWord: "balance" },
    ],
    quizzes: [
      { q: "What does biodiversity refer to?", options: ["Only ocean animals", "Variety of life forms", "Climate change statistics", "Study of cell biology"], answer: 1 },
      { q: "What do healthy ecosystems do according to the speaker?", options: ["Cause forest fires", "Purify water and stabilize climate", "Create pollution", "Melt glaciers"], answer: 1 },
      { q: "What is accelerating extinction rates?", options: ["Natural volcanic events", "Ice age cycles", "Human activities", "Meteorite impacts"], answer: 2 }
    ],
    vocabulary: [
      { word: "biodiversity", ipa: "/ˌbaɪ.oʊ.dɪˈvɝː.sə.t̬i/", type: "noun", meaningVi: "Đa dạng sinh học", example: "Tropical rainforests have incredibly high biodiversity." },
      { word: "purify", ipa: "/ˈpjʊr.ə.faɪ/", type: "verb", meaningVi: "Lọc sạch, tinh chế", example: "Plants absorb carbon dioxide and help purify the air." },
      { word: "extinction", ipa: "/ɪkˈstɪŋk.ʃən/", type: "noun", meaningVi: "Sự tuyệt chủng", example: "Deforestation is pushing many rare animals to the brink of extinction." }
    ]
  }
];

const EXTERNAL_RESOURCES = [
  { name: "BBC Learning English", url: "https://www.bbc.co.uk/learningenglish", desc: "Podcasts, videos, and lessons for all levels", icon: "🇬🇧" },
  { name: "VOA Learning English", url: "https://learningenglish.voanews.com/", desc: "Slow-paced news for English learners", icon: "🇺🇸" },
  { name: "TED Talks", url: "https://www.ted.com/talks", desc: "Inspiring talks with subtitles in many languages", icon: "🎤" },
  { name: "Podcasts in English", url: "https://www.podcastsinenglish.com/", desc: "Free podcasts sorted by level (A1-C2)", icon: "🎧" },
  { name: "Spotify English Podcasts", url: "https://open.spotify.com/genre/podcasts-page", desc: "Thousands of English podcasts for immersion", icon: "🎵" },
  { name: "YouTube English Channels", url: "https://www.youtube.com/results?search_query=english+listening+practice", desc: "English listening practice videos", icon: "▶️" },
];

export default function ListeningPage() {
  const [selected, setSelected] = useState<Lesson>(LESSONS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [activeLine, setActiveLine] = useState(0);
  
  // Tabs & Modes
  const [tab, setTab] = useState<'transcript' | 'vocabulary' | 'quiz'>('transcript');
  const [playMode, setPlayMode] = useState<'listening' | 'dictation' | 'shadowing'>('listening');
  
  // Interactive Stats & Storage
  const [liked, setLiked] = useState<number[]>([]);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [dictationScores, setDictationScores] = useState<Record<number, number>>({});
  const [userXp, setUserXp] = useState(250);
  const [streakDays, setStreakDays] = useState(5);

  // Filter & Search
  const [filterLevel, setFilterLevel] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showResources, setShowResources] = useState(false);

  // Playback Rate
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);

  // Dictation states
  const [dictationInputs, setDictationInputs] = useState<string[]>([]);
  const [dictationChecked, setDictationChecked] = useState(false);

  // Quiz states
  const [quizAns, setQuizAns] = useState<(number | null)[]>([]);
  const [quizDone, setQuizDone] = useState(false);

  // Shadowing states
  const [shadowingActive, setShadowingActive] = useState<number | null>(null);
  const [shadowingProgress, setShadowingProgress] = useState(0);
  const [shadowingScore, setShadowingScore] = useState<number | null>(null);

  // Audio / Speech refs
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shadowingInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const simulatedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Audio state
  const [isSimulatedAudio, setIsSimulatedAudio] = useState(false);

  // ─── Persistence ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLiked = localStorage.getItem('listening_liked');
      if (savedLiked) setLiked(JSON.parse(savedLiked));
      
      const savedCompleted = localStorage.getItem('listening_completed');
      if (savedCompleted) setCompletedLessons(JSON.parse(savedCompleted));

      const savedXp = localStorage.getItem('user_xp');
      if (savedXp) setUserXp(Number(savedXp));

      const savedScores = localStorage.getItem('listening_dictation_scores');
      if (savedScores) setDictationScores(JSON.parse(savedScores));

      const params = new URLSearchParams(window.location.search);
      if (params.get('debugSimulated') === 'true') {
        (window as any).__FORCE_SIMULATED_AUDIO__ = true;
      }
    }
  }, []);

  const saveLiked = (newLiked: number[]) => {
    setLiked(newLiked);
    localStorage.setItem('listening_liked', JSON.stringify(newLiked));
  };

  const saveCompleted = (newCompleted: number[]) => {
    setCompletedLessons(newCompleted);
    localStorage.setItem('listening_completed', JSON.stringify(newCompleted));
  };

  const saveXp = (xp: number) => {
    setUserXp(xp);
    localStorage.setItem('user_xp', String(xp));
  };

  // Initialize dictation inputs for selected lesson
  useEffect(() => {
    setDictationInputs(new Array(selected.transcript.length).fill(""));
    setDictationChecked(false);
    setQuizAns(new Array(selected.quizzes.length).fill(null));
    setQuizDone(false);
    stopAudio();
    setIsPlaying(false);
    setProgress(0);
    setElapsed(0);
    setActiveLine(0);
  }, [selected]);

  // Clean audio on unmount
  useEffect(() => {
    return () => stopAudio();
  }, []);

  const stopAudio = () => {
    if (typeof window !== 'undefined') {
      window.speechSynthesis?.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (simulatedTimerRef.current) {
      clearTimeout(simulatedTimerRef.current);
      simulatedTimerRef.current = null;
    }
    setIsSimulatedAudio(false);
  };

  // Convert duration like "1:20" to seconds
  const getDurationInSeconds = (dur: string) => {
    const [m, s] = dur.split(':').map(Number);
    return m * 60 + s;
  };

  // Speak single word in Vocabulary Tab
  const speakSingleWord = (word: string) => {
    stopAudio();
    if (typeof window !== 'undefined' && window.speechSynthesis && !(window as any).__FORCE_SIMULATED_AUDIO__) {
      const newUtt = new SpeechSynthesisUtterance(word);
      newUtt.lang = 'en-US';
      newUtt.rate = 0.9;
      newUtt.onerror = () => {
        playSingleWordFallback(word);
      };
      window.speechSynthesis.speak(newUtt);
    } else {
      playSingleWordFallback(word);
    }
  };

  const playSingleWordFallback = (word: string) => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const url = `${apiBase}/ai/tts?text=${encodeURIComponent(word)}`;
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.play().catch(err => {
      console.warn("Failed to play word pronunciation fallback:", err);
    });
  };

  // Play simulated speech / subtitles when audio engines are blocked or unavailable
  const playSimulated = (text: string, index: number) => {
    console.log("Playing simulated audio for:", text);
    setIsSimulatedAudio(true);
    const wordCount = text.split(/\s+/).length;
    // Estimate reading speed: 300ms per word + base 2 seconds
    const durationMs = Math.max(2200, Math.min(8000, wordCount * 320));

    if (simulatedTimerRef.current) {
      clearTimeout(simulatedTimerRef.current);
    }

    simulatedTimerRef.current = setTimeout(() => {
      if (index + 1 < selected.transcript.length) {
        playLine(index + 1);
      } else {
        setIsPlaying(false);
        setProgress(100);
        setElapsed(getDurationInSeconds(selected.duration));
        setIsSimulatedAudio(false);
        if (!completedLessons.includes(selected.id)) {
          const updated = [...completedLessons, selected.id];
          saveCompleted(updated);
          saveXp(userXp + 50);
        }
      }
    }, durationMs);
  };

  // Play line by line recursively
  const playLine = (index: number) => {
    if (typeof window === 'undefined') return;
    setActiveLine(index);
    setProgress(Math.round((index / selected.transcript.length) * 100));
    setElapsed(Math.round((index / selected.transcript.length) * getDurationInSeconds(selected.duration)));

    const lineText = selected.transcript[index].text;

    if (window.speechSynthesis && !(window as any).__FORCE_SIMULATED_AUDIO__) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(lineText);
      utterance.lang = 'en-US';
      utterance.rate = playbackRate;
      
      const voices = window.speechSynthesis.getVoices();
      // Prioritize Google or high-quality US voices
      const voice = voices.find(v => v.lang.startsWith('en-US') && v.name.includes('Google'))
        || voices.find(v => v.lang.startsWith('en-US'))
        || voices[0];
      if (voice) utterance.voice = voice;

      utterance.onend = () => {
        setIsSimulatedAudio(false);
        if (index + 1 < selected.transcript.length) {
          playLine(index + 1);
        } else {
          setIsPlaying(false);
          setProgress(100);
          setElapsed(getDurationInSeconds(selected.duration));
          // Mark lesson complete
          if (!completedLessons.includes(selected.id)) {
            const updated = [...completedLessons, selected.id];
            saveCompleted(updated);
            saveXp(userXp + 50); // Earn 50 XP
          }
        }
      };

      utterance.onerror = (e) => {
        console.warn("speechSynthesis error, playing Google Translate TTS fallback:", e);
        playGoogleTts(lineText, index);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      playGoogleTts(lineText, index);
    }
  };

  const playGoogleTts = (text: string, index: number) => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const url = `${apiBase}/ai/tts?text=${encodeURIComponent(text)}`;
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.playbackRate = playbackRate;
    
    audio.onended = () => {
      setIsSimulatedAudio(false);
      if (index + 1 < selected.transcript.length) {
        playLine(index + 1);
      } else {
        setIsPlaying(false);
        setProgress(100);
        setElapsed(getDurationInSeconds(selected.duration));
        if (!completedLessons.includes(selected.id)) {
          const updated = [...completedLessons, selected.id];
          saveCompleted(updated);
          saveXp(userXp + 50);
        }
      }
    };
    audio.onerror = (err) => {
      console.warn("Audio load error, falling back to simulated subtitles:", err);
      playSimulated(text, index);
    };
    audio.play().catch((err) => {
      console.warn("Audio play blocked/error, falling back to simulated subtitles:", err);
      playSimulated(text, index);
    });
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      if (activeLine >= selected.transcript.length - 1 || progress >= 100) {
        setActiveLine(0);
        setProgress(0);
        setElapsed(0);
        playLine(0);
      } else {
        playLine(activeLine);
      }
    }
  };

  const handleRestart = () => {
    stopAudio();
    setIsPlaying(false);
    setProgress(0);
    setElapsed(0);
    setActiveLine(0);
  };

  const handleSkipForward = () => {
    if (activeLine + 1 < selected.transcript.length) {
      const next = activeLine + 1;
      setActiveLine(next);
      if (isPlaying) {
        playLine(next);
      } else {
        setProgress(Math.round((next / selected.transcript.length) * 100));
        setElapsed(Math.round((next / selected.transcript.length) * getDurationInSeconds(selected.duration)));
      }
    }
  };

  const handleSkipBack = () => {
    if (activeLine > 0) {
      const prev = activeLine - 1;
      setActiveLine(prev);
      if (isPlaying) {
        playLine(prev);
      } else {
        setProgress(Math.round((prev / selected.transcript.length) * 100));
        setElapsed(Math.round((prev / selected.transcript.length) * getDurationInSeconds(selected.duration)));
      }
    } else {
      handleRestart();
    }
  };

  // Speak one single line directly from transcript click
  const handleLineClick = (text: string, index: number) => {
    stopAudio();
    setActiveLine(index);
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = playbackRate;
      window.speechSynthesis.speak(utterance);
    } else {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(text)}`;
      const audio = new Audio(url);
      audio.play().catch(e => console.error(e));
    }
  };

  // ─── Dictation check ────────────────────────────────────────────────────────
  const cleanWordForComparison = (word: string) => {
    return word.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");
  };

  const handleCheckDictation = () => {
    setDictationChecked(true);
    let correctCount = 0;
    selected.transcript.forEach((line, index) => {
      if (cleanWordForComparison(dictationInputs[index]) === cleanWordForComparison(line.gapWord)) {
        correctCount++;
      }
    });

    const scorePct = Math.round((correctCount / selected.transcript.length) * 100);
    const updatedScores = { ...dictationScores, [selected.id]: scorePct };
    setDictationScores(updatedScores);
    localStorage.setItem('listening_dictation_scores', JSON.stringify(updatedScores));

    if (correctCount === selected.transcript.length) {
      saveXp(userXp + 50); // Perfect score bonus XP
    }
  };

  // ─── Quiz actions ───────────────────────────────────────────────────────────
  const handleQuizAnswer = (qi: number, ai: number) => {
    if (quizAns[qi] !== null) return;
    const next = [...quizAns];
    next[qi] = ai;
    setQuizAns(next);
    if (next.every(a => a !== null)) {
      setTimeout(() => setQuizDone(true), 600);
      const score = selected.quizzes.filter((q, idx) => next[idx] === q.answer).length;
      if (score === selected.quizzes.length) {
        saveXp(userXp + 30); // 30 XP for perfect quiz
      }
    }
  };

  // ─── Shadowing simulation ───────────────────────────────────────────────────
  const startShadowing = (index: number) => {
    if (shadowingInterval.current) clearInterval(shadowingInterval.current);
    stopAudio();
    setShadowingActive(index);
    setShadowingProgress(0);
    setShadowingScore(null);

    // Speak the prompt first
    handleLineClick(selected.transcript[index].text, index);

    // Give some time to listen before recording
    setTimeout(() => {
      let currentProgress = 0;
      shadowingInterval.current = setInterval(() => {
        currentProgress += 10;
        setShadowingProgress(currentProgress);
        if (currentProgress >= 100) {
          if (shadowingInterval.current) clearInterval(shadowingInterval.current);
          const mockScore = Math.floor(Math.random() * 20) + 80; // Generate score 80-99
          setShadowingScore(mockScore);
          saveXp(userXp + 20); // Earn 20 XP
        }
      }, 300);
    }, 2000);
  };

  // Format second duration as MM:SS
  const formatTime = (secondsCount: number) => {
    const m = Math.floor(secondsCount / 60);
    const s = secondsCount % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  // Filter lessons based on level and search queries
  const filteredLessons = LESSONS.filter(lesson => {
    const matchesLevel = filterLevel === 'All' || lesson.level === filterLevel;
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lesson.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Panel */}
      <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-gradient-to-tr from-primary to-indigo-500 text-white rounded-2xl shadow-md">
            <Headphones className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-800 flex items-center gap-2">
              Listening Lab <Sparkle className="w-5 h-5 text-amber-500 fill-amber-500" />
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">
              Luyện nghe tiếng Anh đa phương thức với {LESSONS.length} bài nghe. Tích hợp Dictation (Chép chính tả) & Shadowing (Nói nhại).
            </p>
          </div>
        </div>

        {/* User Stats Board */}
        <div className="flex items-center gap-3 self-start xl:self-center bg-slate-50 p-3 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2 px-3 border-r border-slate-200">
            <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
            <div className="text-left">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Streak</p>
              <p className="text-sm font-black text-slate-800">{streakDays} Days</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3">
            <Award className="w-5 h-5 text-primary fill-primary/20" />
            <div className="text-left">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Total XP</p>
              <p className="text-sm font-black text-slate-800">{userXp} XP</p>
            </div>
          </div>
        </div>
      </header>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Tìm kiếm bài nghe..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto justify-end">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Level:</span>
          {['All', 'A1', 'A2', 'B1', 'B2', 'C1'].map(level => (
            <button 
              key={level} 
              onClick={() => setFilterLevel(level)}
              className={cn("px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm",
                filterLevel === level 
                  ? "bg-primary text-white shadow-primary/20" 
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              )}
            >
              {level}
            </button>
          ))}
          <button 
            onClick={() => setShowResources(!showResources)}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl text-xs font-bold hover:bg-amber-100 transition-all shadow-sm"
          >
            <Globe className="w-3.5 h-3.5" /> Tài nguyên học tập
          </button>
        </div>
      </div>

      {/* External Resources Panel */}
      {showResources && (
        <div className="p-6 bg-gradient-to-r from-amber-50/60 to-orange-50/60 border border-amber-200 rounded-3xl animate-in slide-in-from-top-4 duration-300">
          <h3 className="font-black text-slate-800 text-lg flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-amber-600" /> Kênh Luyện Nghe Tiếng Anh Ngoài Hệ Thống
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXTERNAL_RESOURCES.map(res => (
              <a 
                key={res.name} 
                href={res.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-amber-100 hover:border-amber-300 hover:shadow-md transition-all group shadow-sm"
              >
                <span className="text-3xl p-2 bg-slate-50 rounded-xl">{res.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-amber-700 transition-colors truncate">{res.name}</h4>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{res.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Playback Hub (2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
            {/* Audio Wave Gradient Card */}
            <div className={cn("relative p-8 bg-gradient-to-br text-white flex flex-col justify-between min-h-[220px] transition-all duration-500", selected.color)}>
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
              
              {/* Header inside Card */}
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-black rounded-lg uppercase tracking-wider">{selected.level}</span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-black rounded-lg uppercase tracking-wider">{selected.category}</span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-black rounded-lg uppercase tracking-wider flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {selected.duration}
                  </span>
                  {isSimulatedAudio && (
                    <span className="px-3 py-1 bg-amber-500 text-white text-[10px] font-black rounded-lg uppercase tracking-wider flex items-center gap-1 animate-pulse shadow-sm shadow-amber-500/30">
                      ⚠️ Phụ Đề Tự Động (Audio Lỗi)
                    </span>
                  )}
                </div>
                
                <button 
                  onClick={() => {
                    const isLiked = liked.includes(selected.id);
                    const updated = isLiked ? liked.filter(id => id !== selected.id) : [...liked, selected.id];
                    saveLiked(updated);
                  }}
                  className="p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/30 transition-all active:scale-95 shadow-sm"
                >
                  <Heart className={cn("w-5 h-5 transition-transform duration-300", liked.includes(selected.id) ? "fill-rose-500 text-rose-500 scale-110" : "text-white")} />
                </button>
              </div>

              {/* Title & Animated Sound Wave */}
              <div className="relative z-10 flex items-end justify-between mt-6">
                <div className="space-y-1 max-w-[70%]">
                  <span className="text-white/80 text-xs font-bold tracking-widest uppercase">Now Playing</span>
                  <h2 className="text-2xl md:text-3xl font-black leading-tight tracking-tight">{selected.title}</h2>
                </div>

                {/* SVG Animated Audio Bar Graphs */}
                {isPlaying && (
                  <div className="flex items-end gap-1 h-12 px-3">
                    {[1, 2, 3, 4, 5, 6].map(bar => (
                      <span 
                        key={bar} 
                        className={cn(
                          "w-1.5 bg-white rounded-full transition-all animate-bounce",
                          bar === 1 && "h-8 duration-300 delay-75",
                          bar === 2 && "h-5 duration-500 delay-100",
                          bar === 3 && "h-10 duration-200 delay-150",
                          bar === 4 && "h-6 duration-400 delay-200",
                          bar === 5 && "h-9 duration-300 delay-100",
                          bar === 6 && "h-4 duration-500 delay-75"
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Controller Elements */}
            <div className="p-8 space-y-6">
              
              {/* Progress Slider */}
              <div className="space-y-2.5">
                <div className="flex justify-between text-xs font-black text-slate-400">
                  <span>{formatTime(elapsed)}</span>
                  <span>{selected.duration}</span>
                </div>
                <div 
                  className="relative h-2 bg-slate-100 rounded-full cursor-pointer group" 
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pct = ((e.clientX - rect.left) / rect.width);
                    const totalSec = getDurationInSeconds(selected.duration);
                    const nextLine = Math.round(pct * selected.transcript.length);
                    const finalLine = Math.max(0, Math.min(selected.transcript.length - 1, nextLine));
                    setActiveLine(finalLine);
                    setProgress(Math.round((finalLine / selected.transcript.length) * 100));
                    setElapsed(Math.round((finalLine / selected.transcript.length) * totalSec));
                    if (isPlaying) {
                      playLine(finalLine);
                    }
                  }}
                >
                  <div 
                    className="absolute h-full bg-primary rounded-full transition-all duration-300 group-hover:brightness-95" 
                    style={{ width: `${progress}%` }} 
                  />
                  <div 
                    className="absolute w-4 h-4 bg-white border-2 border-primary rounded-full -top-1 shadow-md scale-0 group-hover:scale-100 transition-all duration-300"
                    style={{ left: `calc(${progress}% - 8px)` }}
                  />
                </div>
              </div>

              {/* Main Player Buttons */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2 border-b border-slate-100 pb-6">
                
                {/* Play controls */}
                <div className="flex items-center gap-6 justify-center md:justify-start">
                  <button 
                    onClick={handleSkipBack} 
                    className="p-3 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-full transition-all active:scale-95"
                    title="Quay lại câu trước"
                  >
                    <SkipBack className="w-6 h-6 fill-current" />
                  </button>
                  <button 
                    onClick={togglePlay} 
                    className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-xl shadow-primary/30 hover:scale-105 hover:bg-indigo-600 transition-all active:scale-95"
                  >
                    {isPlaying ? <Pause className="w-8 h-8 fill-white" /> : <Play className="w-8 h-8 fill-white ml-1" />}
                  </button>
                  <button 
                    onClick={handleSkipForward} 
                    className="p-3 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-full transition-all active:scale-95"
                    title="Bỏ qua câu tiếp theo"
                  >
                    <SkipForward className="w-6 h-6 fill-current" />
                  </button>
                  <button 
                    onClick={handleRestart} 
                    className="p-3 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-full transition-all active:scale-95"
                    title="Khởi động lại từ đầu"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>

                {/* Speed Controls */}
                <div className="flex items-center gap-2 justify-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Tốc độ:</span>
                  {[0.8, 1.0, 1.2].map(speed => (
                    <button
                      key={speed}
                      onClick={() => {
                        setPlaybackRate(speed);
                        if (isPlaying) {
                          stopAudio();
                          playLine(activeLine);
                        }
                      }}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-black transition-all",
                        playbackRate === speed
                          ? "bg-slate-800 text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      )}
                    >
                      {speed === 1.0 ? 'Normal' : `${speed}x`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode Selectors */}
              <div className="flex items-center justify-between flex-wrap gap-4 bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-1.5 w-full sm:w-auto">
                  <button 
                    onClick={() => { setPlayMode('listening'); stopAudio(); setIsPlaying(false); }}
                    className={cn("flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all",
                      playMode === 'listening' ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"
                    )}
                  >
                    <Volume2 className="w-4 h-4 text-primary" /> Luyện nghe
                  </button>
                  <button 
                    onClick={() => { setPlayMode('dictation'); stopAudio(); setIsPlaying(false); }}
                    className={cn("flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all",
                      playMode === 'dictation' ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"
                    )}
                  >
                    <BookOpen className="w-4 h-4 text-violet-500" /> Chép chính tả
                  </button>
                  <button 
                    onClick={() => { setPlayMode('shadowing'); stopAudio(); setIsPlaying(false); }}
                    className={cn("flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all",
                      playMode === 'shadowing' ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"
                    )}
                  >
                    <Mic className="w-4 h-4 text-rose-500" /> Nói nhại (Shadowing)
                  </button>
                </div>
              </div>

              {/* Interactive Tabs under Player */}
              <div className="space-y-4">
                
                {/* Tabs Nav Header */}
                <div className="flex border-b border-slate-100 gap-6">
                  {(['transcript', 'vocabulary', 'quiz'] as const).map(tName => (
                    <button
                      key={tName}
                      onClick={() => setTab(tName)}
                      className={cn(
                        "pb-3 text-sm font-black transition-all border-b-2 capitalize relative",
                        tab === tName 
                          ? "border-primary text-slate-800" 
                          : "border-transparent text-slate-400 hover:text-slate-600"
                      )}
                    >
                      {tName === 'transcript' ? 'Lời thoại (Transcript)' : tName === 'vocabulary' ? 'Từ vựng (Vocabulary)' : 'Trắc nghiệm (Quiz)'}
                      {tName === 'quiz' && quizDone && (
                        <span className="absolute -top-1.5 -right-3.5 w-2 h-2 bg-green-500 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Tab Content 1: Transcript */}
                {tab === 'transcript' && (
                  <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2">
                    
                    {/* Normal listening transcript view */}
                    {playMode === 'listening' && selected.transcript.map((line, idx) => (
                      <div 
                        key={idx}
                        onClick={() => handleLineClick(line.text, idx)}
                        className={cn(
                          "flex items-start gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-300 border border-transparent",
                          idx === activeLine && isPlaying
                            ? "bg-primary/5 border-primary/20 ring-1 ring-primary/10 shadow-sm" 
                            : "hover:bg-slate-50"
                        )}
                      >
                        <span className="mt-1 flex-shrink-0 w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                          {formatTime(line.time)}
                        </span>
                        <p className={cn("text-base leading-relaxed font-semibold transition-colors duration-300",
                          idx === activeLine && isPlaying ? "text-primary font-extrabold" : "text-slate-600"
                        )}>
                          {line.text}
                        </p>
                      </div>
                    ))}

                    {/* Dictation Mode view */}
                    {playMode === 'dictation' && (
                      <div className="space-y-4">
                        <div className="bg-violet-50/50 p-4 rounded-2xl border border-violet-100 text-xs text-violet-800 font-medium">
                          Nghe từng câu thoại và nhập từ còn thiếu vào ô trống bên dưới. Nhấp vào nút kiểm tra khi bạn làm xong!
                        </div>

                        {selected.transcript.map((line, idx) => {
                          const words = line.text.split(" ");
                          // Find matching index of the gapWord (case insensitive check)
                          const wordIndex = words.findIndex(w => cleanWordForComparison(w) === cleanWordForComparison(line.gapWord));
                          
                          // Format output display string: replace gap word with a placeholder
                          let sentenceBefore = words.slice(0, wordIndex).join(" ");
                          let sentenceAfter = words.slice(wordIndex + 1).join(" ");
                          
                          const isInputCorrect = dictationChecked && cleanWordForComparison(dictationInputs[idx]) === cleanWordForComparison(line.gapWord);

                          return (
                            <div key={idx} className="flex flex-col gap-2.5 p-4 bg-white border border-slate-100 rounded-2xl hover:shadow-sm transition-all">
                              <div className="flex items-center gap-3">
                                <button 
                                  onClick={() => handleLineClick(line.text, idx)}
                                  className="w-8 h-8 rounded-xl bg-violet-100 hover:bg-violet-200 text-violet-700 flex items-center justify-center flex-shrink-0 transition-colors"
                                  title="Nghe câu này"
                                >
                                  <Play className="w-3.5 h-3.5 fill-current" />
                                </button>
                                <span className="text-xs text-slate-400 font-bold">Line {idx + 1}</span>
                              </div>

                              <div className="text-base text-slate-700 font-bold leading-relaxed flex items-center flex-wrap gap-x-2 gap-y-1.5">
                                <span>{sentenceBefore}</span>
                                <input 
                                  type="text"
                                  value={dictationInputs[idx] || ""}
                                  disabled={dictationChecked}
                                  onChange={(e) => {
                                    const next = [...dictationInputs];
                                    next[idx] = e.target.value;
                                    setDictationInputs(next);
                                  }}
                                  placeholder="[Điền từ]"
                                  className={cn(
                                    "px-2.5 py-1.5 text-sm font-black border-2 rounded-xl w-32 text-center transition-all focus:outline-none focus:ring-1 focus:ring-primary",
                                    !dictationChecked && "border-slate-200 focus:border-primary",
                                    dictationChecked && isInputCorrect && "bg-green-50 border-green-500 text-green-700",
                                    dictationChecked && !isInputCorrect && "bg-rose-50 border-rose-500 text-rose-700"
                                  )}
                                />
                                <span>{sentenceAfter}</span>
                              </div>

                              {dictationChecked && !isInputCorrect && (
                                <p className="text-xs text-rose-600 font-semibold mt-1">
                                  Đáp án đúng: <span className="font-extrabold">{line.gapWord}</span>
                                </p>
                              )}
                            </div>
                          );
                        })}

                        <div className="pt-2 flex justify-end gap-3">
                          {dictationChecked && (
                            <button
                              onClick={() => {
                                setDictationInputs(new Array(selected.transcript.length).fill(""));
                                setDictationChecked(false);
                              }}
                              className="px-5 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 font-black rounded-2xl text-xs transition-all"
                            >
                              Làm Lại
                            </button>
                          )}
                          <button
                            onClick={handleCheckDictation}
                            disabled={dictationChecked || dictationInputs.some(v => !v.trim())}
                            className="px-6 py-3 bg-primary text-white font-black rounded-2xl text-xs shadow-md shadow-primary/20 hover:bg-indigo-600 transition-all disabled:opacity-50 disabled:pointer-events-none"
                          >
                            Kiểm tra kết quả
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Shadowing Mode view */}
                    {playMode === 'shadowing' && (
                      <div className="space-y-4">
                        <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100 text-xs text-rose-800 font-medium">
                          Bấm nút micro cạnh mỗi câu thoại để luyện nói. Hệ thống sẽ phát âm mẫu câu, sau đó ghi âm giọng đọc của bạn để chấm điểm!
                        </div>

                        {selected.transcript.map((line, idx) => (
                          <div key={idx} className="flex flex-col gap-3 p-4 bg-white border border-slate-100 rounded-2xl hover:shadow-sm transition-all">
                            <div className="flex items-start justify-between gap-4">
                              <p className="text-base text-slate-700 font-semibold leading-relaxed">
                                {line.text}
                              </p>
                              <button
                                onClick={() => startShadowing(idx)}
                                className={cn(
                                  "w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all",
                                  shadowingActive === idx 
                                    ? "bg-rose-500 text-white animate-pulse" 
                                    : "bg-rose-100 hover:bg-rose-200 text-rose-600 active:scale-95"
                                )}
                              >
                                <Mic className="w-4 h-4" />
                              </button>
                            </div>

                            {shadowingActive === idx && (
                              <div className="space-y-2 mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                                  <span>{shadowingProgress < 100 ? "Listening & Recording..." : "Analysis complete!"}</span>
                                  <span>{shadowingProgress}%</span>
                                </div>
                                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                  <div className="h-full bg-rose-500 transition-all duration-300" style={{ width: `${shadowingProgress}%` }} />
                                </div>

                                {/* Animated voice wave graph */}
                                {shadowingProgress < 100 && (
                                  <div className="flex items-center justify-center gap-0.5 h-6">
                                    {[...Array(12)].map((_, i) => (
                                      <span 
                                        key={i} 
                                        style={{ height: `${Math.floor(Math.random() * 20) + 4}px` }}
                                        className="w-1 bg-rose-400 rounded-full animate-bounce"
                                      />
                                    ))}
                                  </div>
                                )}

                                {shadowingScore !== null && (
                                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 mt-1">
                                    <span className="text-xs font-black text-rose-600 flex items-center gap-1">
                                      <Sparkles className="w-3.5 h-3.5 fill-current" /> Điểm phát âm:
                                    </span>
                                    <span className="text-sm font-black text-slate-800">{shadowingScore}/100</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                )}

                {/* Tab Content 2: Vocabulary */}
                {tab === 'vocabulary' && (
                  <div className="space-y-4">
                    {selected.vocabulary.map((vocab, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
                        <button
                          onClick={() => speakSingleWord(vocab.word)}
                          className="w-10 h-10 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 flex items-center justify-center flex-shrink-0 transition-colors shadow-sm"
                          title="Nghe phát âm từ này"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>

                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-base font-black text-slate-800">{vocab.word}</h4>
                            <span className="text-xs text-slate-400 font-bold">{vocab.ipa}</span>
                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black rounded-md uppercase tracking-wider">{vocab.type}</span>
                          </div>
                          <p className="text-sm font-bold text-slate-600">{vocab.meaningVi}</p>
                          <p className="text-xs text-slate-400 italic">e.g. "{vocab.example}"</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tab Content 3: Quiz */}
                {tab === 'quiz' && (
                  <div className="space-y-5">
                    {selected.quizzes.map((q, qi) => (
                      <div key={qi} className="space-y-3">
                        <p className="font-extrabold text-slate-700">{qi + 1}. {q.q}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {q.options.map((opt, ai) => (
                            <button 
                              key={ai} 
                              onClick={() => handleQuizAnswer(qi, ai)}
                              className={cn("p-3.5 rounded-2xl text-xs font-black border text-left transition-all shadow-sm",
                                quizAns[qi] === null ? "bg-white border-slate-200 hover:border-primary hover:bg-primary/5 text-slate-600" :
                                ai === q.answer ? "bg-green-50 border-green-500 text-green-700" :
                                ai === quizAns[qi] ? "bg-rose-50 border-rose-500 text-rose-700" : "bg-white border-slate-100 opacity-40 text-slate-400"
                              )}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    {quizDone && (
                      <div className={cn("p-5 rounded-2xl text-center font-black animate-in zoom-in duration-300", 
                        quizAns.every((ans, i) => ans === selected.quizzes[i].answer) ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
                      )}>
                        <div className="flex items-center justify-center gap-2 mb-1">
                          {quizAns.every((ans, i) => ans === selected.quizzes[i].answer) 
                            ? <CheckCircle2 className="w-6 h-6 text-green-600" /> 
                            : <XCircle className="w-6 h-6 text-amber-600" />
                          }
                          <span className="text-sm uppercase tracking-wider">Kết quả bài làm</span>
                        </div>
                        <p className="text-xl">
                          {selected.quizzes.filter((q, i) => quizAns[i] === q.answer).length} / {selected.quizzes.length} đúng
                        </p>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Panel (1 Column) */}
        <div className="space-y-6">
          
          {/* Lessons List container */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
            <h3 className="font-black text-slate-800 text-lg mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2"><ListMusic className="w-5 h-5 text-primary" />Danh Sách Bài Nghe</span>
              <span className="text-xs font-black text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">{filteredLessons.length}</span>
            </h3>

            <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
              {filteredLessons.length > 0 ? (
                filteredLessons.map(lesson => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isLiked = liked.includes(lesson.id);
                  const score = dictationScores[lesson.id];

                  return (
                    <button 
                      key={lesson.id} 
                      onClick={() => setSelected(lesson)}
                      className={cn("w-full flex gap-4 p-3 rounded-2xl transition-all text-left group border border-transparent",
                        selected.id === lesson.id 
                          ? "bg-primary/5 border-primary/10 shadow-sm" 
                          : "hover:bg-slate-50"
                      )}
                    >
                      {/* Left Badge */}
                      <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-black text-xs flex-shrink-0 shadow-sm", lesson.color)}>
                        {lesson.level}
                      </div>

                      {/* Main details */}
                      <div className="flex-1 min-w-0 py-0.5">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors truncate">{lesson.title}</h4>
                          {isCompleted && (
                            <span className="flex-shrink-0 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white" title="Hoàn thành">
                              <Check className="w-2.5 h-2.5" />
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mt-1">
                          {lesson.category} · {lesson.duration}
                        </p>
                        {score !== undefined && (
                          <span className="inline-block mt-1 text-[9px] font-black bg-violet-100 text-violet-700 px-1.5 py-0.5 rounded">
                            Chép chính tả: {score}%
                          </span>
                        )}
                      </div>

                      {/* Right Indicator (Heart) */}
                      {isLiked && (
                        <Heart className="w-4 h-4 text-rose-500 fill-rose-500 flex-shrink-0 mt-3" />
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="p-8 text-center text-slate-400 text-sm font-bold">
                  Không tìm thấy bài nghe phù hợp.
                </div>
              )}
            </div>
          </div>

          {/* Goal & Milestone Tracker Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 relative overflow-hidden shadow-md">
            <div className="relative z-10 space-y-4">
              <h3 className="font-black text-lg flex items-center gap-2">
                <Radio className="w-5 h-5 text-primary" /> Mục tiêu tuần này
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Hoàn thành 3 bài nghe để đạt được huy chương "Tai Vàng Học Thuật".
              </p>
              
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-black text-primary">
                  <span>Tiến trình:</span>
                  <span>{completedLessons.length} / 3 Bài</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500" 
                    style={{ width: `${Math.min(100, (completedLessons.length / 3) * 100)}%` }} 
                  />
                </div>
              </div>
            </div>
            
            {/* Ambient visual badge */}
            <Volume2 className="absolute -right-6 -bottom-6 w-24 h-24 text-white/5 opacity-10 pointer-events-none" />
          </div>

        </div>

      </div>

    </div>
  );
}
