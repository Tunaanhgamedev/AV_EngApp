export interface TranscriptLine {
  time: number;
  text: string;
  gapWord: string;
}

export interface Quiz {
  q: string;
  options: string[];
  answer: number;
}

export interface VocabularyItem {
  word: string;
  ipa: string;
  type: string;
  meaningVi: string;
  example: string;
}

export interface Lesson {
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

export const LESSONS: Lesson[] = [
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

export const EXTERNAL_RESOURCES = [
  { name: "BBC Learning English", url: "https://www.bbc.co.uk/learningenglish", desc: "Podcasts, videos, and lessons for all levels", icon: "🇬🇧" },
  { name: "VOA Learning English", url: "https://learningenglish.voanews.com/", desc: "Slow-paced news for English learners", icon: "🇺🇸" },
  { name: "TED Talks", url: "https://www.ted.com/talks", desc: "Inspiring talks with subtitles in many languages", icon: "🎤" },
  { name: "Podcasts in English", url: "https://www.podcastsinenglish.com/", desc: "Free podcasts sorted by level (A1-C2)", icon: "🎧" },
  { name: "Spotify English Podcasts", url: "https://open.spotify.com/genre/podcasts-page", desc: "Thousands of English podcasts for immersion", icon: "🎵" },
  { name: "YouTube English Channels", url: "https://www.youtube.com/results?search_query=english+listening+practice", desc: "English listening practice videos", icon: "▶️" },
];
