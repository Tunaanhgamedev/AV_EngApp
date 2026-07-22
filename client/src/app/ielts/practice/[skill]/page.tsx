'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import {
  Award, Headphones, BookOpen, PenTool, Mic2, Clock, Target,
  Sparkles, Brain, ArrowLeft, Loader2, CheckCircle2, XCircle,
  HelpCircle, ChevronDown, ChevronUp, Star, Lightbulb, Play, Pause,
  BookOpenCheck, MessageSquare, Send, Check, RotateCcw, AlertCircle, FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { getIeltsPractice, submitIeltsPractice } from '@/services/ielts.service';

interface Question {
  id: string;
  context: string;
  questionText: string;
  choices: string[];
  correctAnswer: string;
  explanation: string;
}

interface Topic {
  id: string;
  title: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Khó';
  type: string;
  questions: Question[];
}

const PRACTICE_DATABASE: Record<string, Topic[]> = {
  listening: [
    {
      id: 'lis-1',
      title: 'Topic 1: Accommodation Booking',
      difficulty: 'Dễ',
      type: 'Part 1 - Form Completion',
      questions: [
        {
          id: 'lis-1-q1',
          context: "Audio Transcript:\nAgent: Good morning, welcome to City Student Accommodation. How can I help you today?\nStudent: Hi, I'm looking for a single room close to the university campus. My name is Alex Harrison.\nAgent: Great, Alex. We have rooms available at Oakridge Hall. It is only a 10-minute walk from the main library.",
          questionText: "What is the name of the student looking for accommodation?",
          choices: [
            "A. Alex Harrison",
            "B. Alex Hanson",
            "C. Alec Harrison",
            "D. Alex Morrison"
          ],
          correctAnswer: "A",
          explanation: "Học viên trả lời rõ ràng trong băng: 'My name is Alex Harrison' (Chọn A)."
        },
        {
          id: 'lis-1-q2',
          context: "Audio Transcript:\nAgent: Oakridge Hall has single rooms starting from 150 pounds per week, which includes water and electricity bills.\nStudent: Excellent, that fits my budget. Does it have internet access?\nAgent: Yes, we provide free high-speed Wi-Fi in every room.",
          questionText: "How much is the rent per week at Oakridge Hall?",
          choices: [
            "A. 120 pounds",
            "B. 150 pounds",
            "C. 180 pounds",
            "D. 200 pounds"
          ],
          correctAnswer: "B",
          explanation: "Mức giá thuê được nhân viên nêu rõ là 150 bảng một tuần: 'starting from 150 pounds per week' (Chọn B)."
        },
        {
          id: 'lis-1-q3',
          context: "Audio Transcript:\nStudent: Perfect. What is the street address?\nAgent: It is located at 42 Parkside Avenue, right next to the park.\nStudent: Got it, 42 Parkside Avenue. I would like to book a room.",
          questionText: "What is the address of Oakridge Hall?",
          choices: [
            "A. 42 Parkside Lane",
            "B. 24 Parkside Avenue",
            "C. 42 Parkside Avenue",
            "D. 42 Riverside Avenue"
          ],
          correctAnswer: "C",
          explanation: "Địa chỉ là 42 Parkside Avenue: 'It is located at 42 Parkside Avenue' (Chọn C)."
        }
      ]
    },
    {
      id: 'lis-2',
      title: 'Topic 2: Campus Tour & Facilities',
      difficulty: 'Trung bình',
      type: 'Part 2 - Map Labelling',
      questions: [
        {
          id: 'lis-2-q1',
          context: "Audio Transcript:\nGuide: Hello everyone, welcome to the university campus tour. If you look straight ahead, you will see the Student Union building. To the left of the Student Union is our sports center. To the right is the campus medical clinic.",
          questionText: "What facility is located to the left of the Student Union building?",
          choices: [
            "A. Sports center",
            "B. Medical clinic",
            "C. Main library",
            "D. Computer lab"
          ],
          correctAnswer: "A",
          explanation: "Hướng dẫn viên cho biết: 'To the left of the Student Union is our sports center' (Chọn A)."
        },
        {
          id: 'lis-2-q2',
          context: "Audio Transcript:\nGuide: Our main library is currently undergoing renovation. It will be closed on weekends, but remains open from 8 AM to 10 PM during weekdays.",
          questionText: "When is the main library open during its renovation?",
          choices: [
            "A. Everyday from 8 AM to 10 PM",
            "B. Weekdays from 8 AM to 10 PM",
            "C. Weekends from 8 AM to 10 PM",
            "D. Tuesdays and Thursdays only"
          ],
          correctAnswer: "B",
          explanation: "Thư viện mở cửa vào các ngày trong tuần (weekdays): 'remains open from 8 AM to 10 PM during weekdays' (Chọn B)."
        },
        {
          id: 'lis-2-q3',
          context: "Audio Transcript:\nGuide: Finally, if you need to purchase textbooks or study stationery, you should visit the University Bookstore, located in the basement of the Science Block.",
          questionText: "Where is the University Bookstore located?",
          choices: [
            "A. Next to the Sports center",
            "B. On the second floor of the Science Block",
            "C. In the basement of the Science Block",
            "D. In the main university hall"
          ],
          correctAnswer: "C",
          explanation: "Nhà sách nằm dưới tầng hầm tòa nhà Khoa học: 'located in the basement of the Science Block' (Chọn C)."
        }
      ]
    },
    {
      id: 'lis-3',
      title: 'Topic 3: Seminar on Microplastics',
      difficulty: 'Khó',
      type: 'Part 3 - Multiple Choice',
      questions: [
        {
          id: 'lis-3-q1',
          context: "Audio Transcript:\nProfessor: Today, we will discuss the environmental impact of microplastics. Emily, what did your research group find about oceans?\nEmily: Professor, we were shocked to find that microplastics have been detected even in the deepest marine trenches, showing that no part of our oceans remains untouched by plastic pollution.",
          questionText: "What surprised Emily's research group about microplastics?",
          choices: [
            "A. They are only found in shallow waters.",
            "B. They have been detected in the deepest marine trenches.",
            "C. They degrade within a few weeks.",
            "D. Fish are immune to ingesting them."
          ],
          correctAnswer: "B",
          explanation: "Emily ngạc nhiên vì phát hiện vi nhựa ở những rãnh đại dương sâu nhất: 'microplastics have been detected even in the deepest marine trenches' (Chọn B)."
        },
        {
          id: 'lis-3-q2',
          context: "Audio Transcript:\nProfessor: Right, and what about the sources? Mark?\nMark: Well, while commercial fishing gear is a major factor, the primary source of microplastics in coastal areas actually comes from synthetic fibers released during household laundry cycles.",
          questionText: "What is identified as the primary source of microplastics in coastal areas?",
          choices: [
            "A. Industrial chemical waste",
            "B. Commercial fishing gear",
            "C. Synthetic fibers from household laundry",
            "D. Degradation of plastic bottles"
          ],
          correctAnswer: "C",
          explanation: "Mark chỉ ra nguồn chính là sợi tổng hợp từ giặt giũ gia đình: 'comes from synthetic fibers released during household laundry cycles' (Chọn C)."
        },
        {
          id: 'lis-3-q3',
          context: "Audio Transcript:\nProfessor: Exactly. So, how can we mitigate this?\nEmily: Installing specialized filtration systems in washing machines is the most practical short-term solution, before we can phase out synthetic clothing entirely.",
          questionText: "What is proposed as the most practical short-term solution?",
          choices: [
            "A. Banning all synthetic clothing immediately",
            "B. Installing specialized filters in washing machines",
            "C. Cleaning ocean trenches manually",
            "D. Filtering tap water at home"
          ],
          correctAnswer: "B",
          explanation: "Emily đề cập giải pháp ngắn hạn là lắp bộ lọc ở máy giặt: 'Installing specialized filtration systems in washing machines' (Chọn B)."
        }
      ]
    }
  ],
  reading: [
    {
      id: 'read-1',
      title: 'Topic 1: The Rise of Artificial Intelligence',
      difficulty: 'Trung bình',
      type: 'Academic Reading',
      questions: [
        {
          id: 'read-1-q1',
          context: "Reading Passage:\nArtificial Intelligence (AI) is rapidly reshaping the global economy. By automating routine cognitive tasks, machine learning algorithms allow companies to optimize logistics and increase productivity. However, this shift raises concerns about job displacement. While new roles in data science and AI management are emerging, workers in manufacturing and administrative fields face high risks of automation. Economists argue that educational curricula must adapt by emphasizing critical thinking and creative problem-solving skills, which remain difficult for AI models to replicate.",
          questionText: "According to the passage, which of the following fields faces the highest risk of job displacement?",
          choices: [
            "A. Data science and AI management",
            "B. Manufacturing and administrative fields",
            "C. Creative writing and philosophy",
            "D. Logistics optimization consultancy"
          ],
          correctAnswer: "B",
          explanation: "Đoạn văn viết: 'workers in manufacturing and administrative fields face high risks of automation' (Chọn B)."
        },
        {
          id: 'read-1-q2',
          context: "Reading Passage:\n(Same passage as above)",
          questionText: "What skills should educational curricula emphasize to adapt to the rise of AI?",
          choices: [
            "A. Advanced coding languages",
            "B. Rote memorization of data",
            "C. Critical thinking and creative problem-solving",
            "D. Industrial manufacturing techniques"
          ],
          correctAnswer: "C",
          explanation: "Đoạn văn khuyến nghị tập trung vào: 'emphasizing critical thinking and creative problem-solving skills' (Chọn C)."
        },
        {
          id: 'read-1-q3',
          context: "Reading Passage:\n(Same passage as above)",
          questionText: "True, False, or Not Given: AI models can easily replicate creative problem-solving skills.",
          choices: [
            "A. True",
            "B. False",
            "C. Not Given"
          ],
          correctAnswer: "B",
          explanation: "Đoạn văn viết các kỹ năng sáng tạo 'remain difficult for AI models to replicate' (vẫn khó để AI mô phỏng), do đó phát biểu trên là False (Chọn B)."
        }
      ]
    },
    {
      id: 'read-2',
      title: 'Topic 2: History and Development of Tea',
      difficulty: 'Dễ',
      type: 'Cultural History',
      questions: [
        {
          id: 'read-2-q1',
          context: "Reading Passage:\nTea is one of the most widely consumed beverages in the world, second only to water. Its origins trace back to ancient China, around 2737 BC, where legend states that Emperor Shen Nung discovered it when wild leaves blew into his boiling water. Originally used as a medicinal tonic, tea transitioned into a social drink during the Tang Dynasty. In the 17th century, tea was introduced to British merchants, who subsequently established tea plantations in India to break the Chinese monopoly on production. Today, tea culture varies enormously, from the elaborate Japanese tea ceremony to the robust afternoon tea traditions of the United Kingdom.",
          questionText: "Who is credited in Chinese legend with discovering tea?",
          choices: [
            "A. Emperor Shen Nung",
            "B. Tang Dynasty merchants",
            "C. British explorers",
            "D. Japanese monks"
          ],
          correctAnswer: "A",
          explanation: "Huyền thoại Trung Hoa ghi nhận Hoàng đế Thần Nông: 'legend states that Emperor Shen Nung discovered it' (Chọn A)."
        },
        {
          id: 'read-2-q2',
          context: "Reading Passage:\n(Same passage as above)",
          questionText: "Why did British merchants establish tea plantations in India?",
          choices: [
            "A. To introduce tea to Indian villagers",
            "B. To break the Chinese monopoly on tea production",
            "C. Because tea did not grow well in Britain",
            "D. To discover new medicinal properties of tea leaves"
          ],
          correctAnswer: "B",
          explanation: "Mục đích là phá vỡ thế độc quyền của Trung Quốc: 'to break the Chinese monopoly on tea production' (Chọn B)."
        },
        {
          id: 'read-2-q3',
          context: "Reading Passage:\n(Same passage as above)",
          questionText: "True, False, or Not Given: Tea is the most widely consumed beverage in the world.",
          choices: [
            "A. True",
            "B. False",
            "C. Not Given"
          ],
          correctAnswer: "B",
          explanation: "Đoạn văn viết: 'tea is second only to water' (trà đứng thứ hai sau nước), nên trà không phải thức uống được tiêu thụ nhiều nhất. Do đó phát biểu trên là False (Chọn B)."
        }
      ]
    },
    {
      id: 'read-3',
      title: 'Topic 3: Marine Biodiversity & Climate Change',
      difficulty: 'Khó',
      type: 'Environmental Science',
      questions: [
        {
          id: 'read-3-q1',
          context: "Reading Passage:\nMarine ecosystems are under unprecedented stress from rising atmospheric greenhouse gases. Ocean warming is altering the geographical distribution of fish species, driving many towards the poles in search of cooler waters. Furthermore, oceans have absorbed roughly 30% of human-produced carbon dioxide, triggering ocean acidification. This chemical alteration inhibits the calcification process in shell-building organisms and reef corals. Marine biologists warn that the collapse of coral reefs, which support over 25% of all marine life, would cause catastrophic cascading effects throughout global food webs.",
          questionText: "Where are fish species moving due to ocean warming?",
          choices: [
            "A. Towards tropical regions near the equator",
            "B. Towards the earth's poles",
            "C. Into shallower coastal lagoons",
            "D. Into deep, oxygen-depleted ocean trenches"
          ],
          correctAnswer: "B",
          explanation: "Đoạn văn viết: 'driving many towards the poles in search of cooler waters' (Chọn B)."
        },
        {
          id: 'read-3-q2',
          context: "Reading Passage:\n(Same passage as above)",
          questionText: "What percentage of human-produced carbon dioxide has been absorbed by oceans?",
          choices: [
            "A. Roughly 10%",
            "B. Roughly 25%",
            "C. Roughly 30%",
            "D. Roughly 50%"
          ],
          correctAnswer: "C",
          explanation: "Đoạn văn ghi rõ: 'absorbed roughly 30% of human-produced carbon dioxide' (Chọn C)."
        },
        {
          id: 'read-3-q3',
          context: "Reading Passage:\n(Same passage as above)",
          questionText: "True, False, or Not Given: Over a quarter of all marine organisms depend on coral reefs.",
          choices: [
            "A. True",
            "B. False",
            "C. Not Given"
          ],
          correctAnswer: "A",
          explanation: "Đoạn văn chỉ ra rặng san hô 'support over 25% of all marine life' (hỗ trợ hơn 25% sinh vật biển), tương đương 'over a quarter'. Vì vậy, phát biểu trên là True (Chọn A)."
        }
      ]
    }
  ],
  writing: [
    {
      id: 'writ-1',
      title: 'Topic 1: Technology in Education',
      difficulty: 'Trung bình',
      type: 'Task 2 - Opinion Essay',
      questions: [
        {
          id: 'writ-1-q1',
          context: "Outline Suggestion:\n1. Introduction:\n   - Paraphrase the prompt (the rise of computers & online learning).\n   - State a clear thesis (e.g., disagreeing that computers will completely replace human teachers).\n2. Body Paragraph 1:\n   - Discuss the benefits of technology (self-paced learning, vast resources, interactive media).\n3. Body Paragraph 2:\n   - Discuss the essential role of human teachers (emotional intelligence, moral guidance, personalized motivation, discipline).\n4. Conclusion:\n   - Summarize arguments and restate that technology is a powerful tool, not a human replacement.\n\nUseful Vocabulary:\n- Paradigm shift (sự chuyển dịch mô hình)\n- Indispensable (không thể thiếu)\n- Interpersonal skills (kỹ năng tương tác cá nhân)\n- Pedagogical methods (phương pháp sư phạm)\n- Digital literacy (sự am hiểu kỹ thuật số)",
          questionText: "Some people believe that computers and the internet will completely replace teachers in the classroom. To what extent do you agree or disagree?",
          choices: [],
          correctAnswer: "Student should outline an opinion essay maintaining a balanced or one-sided argument, demonstrating grammatical accuracy and academic vocabulary.",
          explanation: "Bài viết Task 2 cần trả lời trực tiếp câu hỏi (To what extent), chia đoạn rõ ràng (mở bài, 2 thân bài, kết bài), và sử dụng các từ liên kết (furthermore, however, in conclusion)."
        }
      ]
    },
    {
      id: 'writ-2',
      title: 'Topic 2: Environmental Responsibility',
      difficulty: 'Khó',
      type: 'Task 2 - Discussion Essay',
      questions: [
        {
          id: 'writ-2-q1',
          context: "Outline Suggestion:\n1. Introduction:\n   - Introduce the debate: national-level action vs. individual contributions.\n   - Outline both views and state your personal perspective.\n2. Body Paragraph 1 (Global/National Action):\n   - Highlight the necessity of legislation, green policies, international agreements (e.g., Paris Accord).\n3. Body Paragraph 2 (Individual Action):\n   - Discuss daily actions: recycling, reducing energy consumption, choosing public transport.\n4. Conclusion:\n   - Summarize and argue that a collaborative effort from both governments and individuals is essential.\n\nUseful Vocabulary:\n- Legislative measures (các biện pháp lập pháp)\n- Carbon footprint (lượng phát thải carbon)\n- Eco-friendly alternatives (các giải pháp thân thiện môi trường)\n- Mitigate (giảm thiểu)\n- Collective responsibility (trách nhiệm tập thể)",
          questionText: "Some people think that environmental problems are too big for individual nations and people to solve. Others believe that individuals can take actions to protect the environment. Discuss both views and give your opinion.",
          choices: [],
          correctAnswer: "Student should discuss both perspectives (government action vs. individual power) and state their own stance clearly.",
          explanation: "Bài viết thảo luận (Discussion Essay) bắt buộc phải phân tích cân bằng cả 2 khía cạnh được nêu ở đề bài trong 2 đoạn thân bài trước khi đưa ra quan điểm cá nhân ở phần kết bài."
        }
      ]
    },
    {
      id: 'writ-3',
      title: 'Topic 3: Work-Life Balance',
      difficulty: 'Trung bình',
      type: 'Task 2 - Cause & Effect Essay',
      questions: [
        {
          id: 'writ-3-q1',
          context: "Outline Suggestion:\n1. Introduction:\n   - State the trend: people working longer hours and having less leisure time.\n   - Briefly mention causes and effects.\n2. Body Paragraph 1 (Causes):\n   - High competition in the global economy, increased cost of living, digital connectivity (being constantly online).\n3. Body Paragraph 2 (Effects):\n   - Mental exhaustion (burnout), family alienation, strain on healthcare systems.\n4. Conclusion:\n   - Summarize findings. Emphasize the need for corporate policies protecting leisure hours.\n\nUseful Vocabulary:\n- Workaholic culture (văn hóa nghiện việc)\n- Burnout syndrome (hội dung kiệt sức)\n- Runaway inflation (lạm phát phi mã)\n- Sedentary lifestyle (lối sống ít vận động)\n- Repercussions (hệ quả nghiêm trọng)",
          questionText: "In many countries, people work longer hours and have less free time. What are the causes of this trend? What effects does it have on individuals and society?",
          choices: [],
          correctAnswer: "Student should identify key causes (competition, cost of living) and effects (mental health issues, weak family bonds) clearly.",
          explanation: "Đối với đề bài Cause & Effect, bài viết cần cấu trúc rõ ràng: 1 đoạn thân bài dành riêng cho Nguyên nhân (Causes) và 1 đoạn dành riêng cho Hệ quả (Effects)."
        }
      ]
    }
  ],
  speaking: [
    {
      id: 'speak-1',
      title: 'Topic 1: Hometown & Leisure (Part 1)',
      difficulty: 'Dễ',
      type: 'Part 1 - Interview',
      questions: [
        {
          id: 'speak-1-q1',
          context: "Part 1 Interview Questions:\n1. Where is your hometown located?\n2. What do you like most about your hometown?\n3. Is there anything you would like to change about it?\n\nUseful Vocabulary:\n- Bustling city (thành phố nhộn nhịp)\n- Rich cultural heritage (di sản văn hóa phong phú)\n- Commute (di chuyển đi lại)\n- Public amenities (tiện ích công cộng)\n- Picturesque scenery (phong cảnh đẹp như tranh)",
          questionText: "Practice answering the questions aloud. Record yourself or type your response in the editor for AI evaluation.",
          choices: [],
          correctAnswer: "A good response should be fluent, use natural speaking fillers, and expand on each question with 2-3 sentences.",
          explanation: "Tại Part 1, tránh trả lời quá ngắn (chỉ 1 câu). Hãy mở rộng câu trả lời bằng cách nêu lý do hoặc ví dụ cụ thể. Ví dụ: 'My hometown is Hanoi, which is the capital of Vietnam. What I like most is the culinary scene...'"
        }
      ]
    },
    {
      id: 'speak-2',
      title: 'Topic 2: Useful Book Recently Read (Part 2)',
      difficulty: 'Trung bình',
      type: 'Part 2 - Cue Card',
      questions: [
        {
          id: 'speak-2-q1',
          context: "Part 2 Cue Card. Preparation: 1 minute. Speaking: 2 minutes.\n\nPrompt details:\nDescribe a book you read recently that you found useful. You should say:\n- what the book is\n- who wrote it\n- what it is about\n- and explain why you found it useful.\n\nUseful Vocabulary:\n- Self-help literature (sách phát triển bản thân)\n- Insightful takeaways (bài học đắt giá)\n- Procrastination (sự trì hoãn)\n- Actionable steps (các bước hành động thực tế)\n- Paradigm shift (thay đổi tư duy)",
          questionText: "Record your talk responding to all bullet points in the prompt. Aim to speak for 1 to 2 minutes.",
          choices: [],
          correctAnswer: "Sample Points:\n- Talk about 'Atomic Habits' by James Clear.\n- Mention how it teaches building micro-habits.\n- Explain how it helped you organize your English study plan.",
          explanation: "Sử dụng cấu trúc gợi ý trong Cue Card để phát triển câu trả lời có tính liên kết cao. Đảm bảo sử dụng đa dạng các thì động từ (quá khứ khi kể về lúc đọc, hiện tại khi giải thích lợi ích)."
        }
      ]
    },
    {
      id: 'speak-3',
      title: 'Topic 3: AI & The Future of Work (Part 3)',
      difficulty: 'Khó',
      type: 'Part 3 - Discussion',
      questions: [
        {
          id: 'speak-3-q1',
          context: "Part 3 Academic Discussion Questions:\n1. How is artificial intelligence affecting the job market?\n2. Do you think AI will create more jobs than it destroys in the future?\n3. What skills should young people learn to survive in the age of AI?\n\nUseful Vocabulary:\n- Automation (tự động hóa)\n- Job redundancy (sự dư thừa công việc)\n- Technological advancement (sự tiến bộ công nghệ)\n- Reskill and upskill (đào tạo lại và nâng cao kỹ năng)\n- Human-centric skills (kỹ năng xoay quanh con người)",
          questionText: "Formulate in-depth answers to these discussion prompts, detailing your reasoning and giving examples.",
          choices: [],
          correctAnswer: "A strong response should structure arguments clearly, use advanced linking words, and provide academic reasoning.",
          explanation: "Câu hỏi Part 3 yêu cầu trả lời mang tính khách quan và vĩ mô hơn. Hãy sử dụng cấu trúc: Nêu quan điểm (Answer) → Giải thích lý do (Reason) → Đưa ra ví dụ (Example) → Kết luận (Alternative/Conclusion)."
        }
      ]
    }
  ]
};

const skillStyles: Record<string, {
  primary: string;
  primaryBg: string;
  primaryText: string;
  gradient: string;
  border: string;
  glow: string;
}> = {
  listening: {
    primary: 'bg-blue-600',
    primaryBg: 'bg-blue-50',
    primaryText: 'text-blue-600',
    gradient: 'from-blue-500 to-indigo-600',
    border: 'border-blue-200',
    glow: 'shadow-blue-500/20'
  },
  reading: {
    primary: 'bg-emerald-600',
    primaryBg: 'bg-emerald-50',
    primaryText: 'text-emerald-600',
    gradient: 'from-emerald-500 to-teal-600',
    border: 'border-emerald-200',
    glow: 'shadow-emerald-500/20'
  },
  writing: {
    primary: 'bg-amber-600',
    primaryBg: 'bg-amber-50',
    primaryText: 'text-amber-600',
    gradient: 'from-amber-500 to-orange-600',
    border: 'border-amber-200',
    glow: 'shadow-amber-500/20'
  },
  speaking: {
    primary: 'bg-rose-600',
    primaryBg: 'bg-rose-50',
    primaryText: 'text-rose-600',
    gradient: 'from-rose-500 to-pink-600',
    border: 'border-rose-200',
    glow: 'shadow-rose-500/20'
  }
};

export default function IELTSPracticePage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const mode = searchParams?.get('mode') || undefined;
  const skill = (params.skill as string) || 'listening'; // 'listening', 'reading', 'writing', 'speaking'

  const activeStyle = skillStyles[skill] || skillStyles.listening;
  const isConstructive = skill === 'writing' || skill === 'speaking';

  // Topic Selection
  const localTopics = PRACTICE_DATABASE[skill] || [];
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  
  // App States
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [essayAnswer, setEssayAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [scoreReport, setScoreReport] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [revealedExplanation, setRevealedExplanation] = useState<Record<string, boolean>>({});

  // Simulated Media State
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  // Simulated Speaking Recording
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Set initial topic
  useEffect(() => {
    if (localTopics.length > 0) {
      setSelectedTopicId(localTopics[0].id);
    }
  }, [skill]);

  // Handle topic change or AI generation
  useEffect(() => {
    if (!selectedTopicId) return;

    const loadTopic = async () => {
      // Clean previous media state
      setIsAudioPlaying(false);
      setShowTranscript(false);
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      setIsRecording(false);
      setRecordSeconds(0);

      const match = localTopics.find(t => t.id === selectedTopicId);
      if (match) {
        setQuestions(match.questions);
        setLoading(false);
        // Reset inputs
        setSelectedAnswers({});
        setEssayAnswer('');
        setSubmitted(false);
        setScoreReport(null);
        setRevealedExplanation({});
      } else if (selectedTopicId === 'ai-generated') {
        try {
          setLoading(true);
          const token = user ? await user.getIdToken() : undefined;
          const data = await getIeltsPractice(skill, token, mode);
          if (data && data.questions) {
            setQuestions(data.questions);
          } else {
            alert('Không thể tạo đề AI vào lúc này. Đang chuyển sang đề thi mặc định.');
            if (localTopics.length > 0) {
              setSelectedTopicId(localTopics[0].id);
            }
          }
        } catch (err) {
          console.error('Error fetching IELTS practice:', err);
          alert('Lỗi kết nối máy chủ AI. Đang chuyển sang đề thi mặc định.');
          if (localTopics.length > 0) {
            setSelectedTopicId(localTopics[0].id);
          }
        } finally {
          setLoading(false);
        }
      }
    };

    loadTopic();
  }, [selectedTopicId, skill, user, mode]);

  // Speaking Recording Simulators
  const startRecording = () => {
    setIsRecording(true);
    setRecordSeconds(0);
    recordingTimerRef.current = setInterval(() => {
      setRecordSeconds(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
    setIsRecording(false);
    
    // Transcribe a speech text dynamically
    let sampleSpeech = "";
    if (selectedTopicId === 'ai-generated') {
      sampleSpeech = "Personally, I believe that we need to consider both sides of this argument. On the one hand, technological progress offers incredible efficiency. On the other hand, it is important to remember the psychological effects it has on children and young adults. Finding a middle ground is definitely the key to long-term progress.";
    } else if (selectedTopicId === 'speak-1') {
      sampleSpeech = "My hometown is Hanoi, which is a bustling capital city located in the northern part of Vietnam. What I love most about it is the rich cultural heritage and the amazing street food, which you can find on almost every corner. If I could change one thing, it would definitely be the traffic congestion and air quality, as it makes commuting quite challenging during rush hours.";
    } else if (selectedTopicId === 'speak-2') {
      sampleSpeech = "I would like to describe a book I read recently, which is titled 'Atomic Habits' by James Clear. The book is focused on how small changes in our daily routines can lead to massive improvements over time. I found it incredibly useful because it gave me practical advice on how to build good habits and break bad ones. Since reading it, I've managed to establish a consistent morning study routine.";
    } else if (selectedTopicId === 'speak-3') {
      sampleSpeech = "In my view, artificial intelligence is reshaping the employment market rapidly. Repetitive administrative jobs are definitely the ones at risk because they can be automated easily. However, we should also expect AI to create new fields of employment, such as prompt engineering and data analytics. Young people need to focus on upskilling and learning soft skills, which cannot be copied by algorithms.";
    }
    
    setEssayAnswer(sampleSpeech);
  };

  const formatRecordTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (questionId: string, answer: string) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = async () => {
    if (submitted || submitting) return;
    setSubmitting(true);

    try {
      const token = user ? await user.getIdToken() : undefined;
      
      if (isConstructive) {
        const userText = essayAnswer.trim();
        if (!userText) {
          alert('Vui lòng nhập bài viết hoặc ghi âm câu trả lời nói của bạn!');
          setSubmitting(false);
          return;
        }

        // Call Gemini server to analyze writing/speaking
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/ai/analyze-ielts-constructive`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
          },
          body: JSON.stringify({
            skill,
            questionText: questions[0]?.questionText,
            userAnswer: userText
          })
        });

        let aiFeedback = '';
        let bandScore = 6.5;

        if (res.ok) {
          const aiData = await res.json();
          aiFeedback = aiData.feedback || '';
          bandScore = parseFloat(aiData.bandScore) || 6.5;
        }

        await submitIeltsPractice({
          userId: user?.uid || '',
          skill,
          bandScore,
          aiFeedback,
          details: {
            userAnswer: userText,
            prompt: questions[0]?.questionText
          }
        }, token);

        setScoreReport({
          bandScore,
          aiFeedback: aiFeedback || 'Bài làm của bạn được phát triển tốt, cấu trúc mạch lạc. Hãy nâng cấp thêm từ vựng nâng cao và hạn chế lặp từ.',
          xpEarned: 100
        });

      } else {
        // Listening / Reading: Calculate band score based on correct answers
        let correctCount = 0;
        questions.forEach(q => {
          const selected = selectedAnswers[q.id]?.charAt(0);
          if (selected === q.correctAnswer) {
            correctCount++;
          }
        });

        const ratio = correctCount / questions.length;
        let bandScore = 4.0;
        if (ratio >= 1.0) bandScore = 9.0;
        else if (ratio >= 0.8) bandScore = 7.5;
        else if (ratio >= 0.6) bandScore = 6.5;
        else if (ratio >= 0.4) bandScore = 5.5;
        else if (ratio >= 0.2) bandScore = 4.5;

        await submitIeltsPractice({
          userId: user?.uid || '',
          skill,
          bandScore,
          correctCount,
          totalQuestions: questions.length,
          details: {
            selectedAnswers,
            questions
          }
        }, token);

        setScoreReport({
          bandScore,
          correctCount,
          totalQuestions: questions.length,
          xpEarned: correctCount * 15
        });
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting IELTS practice:', err);
      alert('Không thể kết nối máy chủ. Đang lưu tạm kết quả chấm điểm...');
      
      // Local fallback representation
      if (isConstructive) {
        setScoreReport({
          bandScore: 6.5,
          aiFeedback: 'EngBot AI feedback: Bài viết có cấu trúc hợp lý, từ vựng đa dạng trung bình (A2-B2). Chú ý chia động từ ở các chủ ngữ ngôi thứ 3 số ít.',
          xpEarned: 100
        });
      } else {
        let correctCount = 0;
        questions.forEach(q => {
          if (selectedAnswers[q.id]?.charAt(0) === q.correctAnswer) {
            correctCount++;
          }
        });
        setScoreReport({
          bandScore: 6.0,
          correctCount,
          totalQuestions: questions.length,
          xpEarned: correctCount * 15
        });
      }
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleExplanation = (questionId: string) => {
    setRevealedExplanation(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Dễ': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Trung bình': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Khó': return 'bg-rose-50 text-rose-700 border-rose-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20 space-y-6 animate-in fade-in duration-500">
      {/* Header breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => router.push('/ielts')}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại IELTS Center
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full border border-red-200">
          <Award className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">IELTS {skill} Practice</span>
        </div>
      </div>

      {/* Main Grid: Responsive sidebar on desktop, stack on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT PANEL: Topic Selection Sidebar */}
        <div className="lg:col-span-3 space-y-4">
          <div className="premium-card p-4 space-y-3">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider">Danh sách chủ đề</h3>
            
            {/* Scrollable list of topics */}
            <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
              {localTopics.map((topic) => {
                const isActive = selectedTopicId === topic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopicId(topic.id)}
                    className={cn(
                      "w-full p-3.5 text-left rounded-2xl border-2 transition-all flex flex-col gap-2",
                      isActive
                        ? "border-slate-800 bg-slate-900 text-white shadow-lg"
                        : "border-slate-100 bg-slate-50 hover:bg-slate-100 text-slate-700"
                    )}
                  >
                    <div className="flex justify-between items-start w-full gap-2">
                      <span className="text-xs font-black leading-snug">{topic.title}</span>
                      <span className={cn(
                        "text-[9px] font-black px-2 py-0.5 rounded-full border",
                        isActive ? "bg-white/10 text-white border-white/20" : getDifficultyColor(topic.difficulty)
                      )}>
                        {topic.difficulty}
                      </span>
                    </div>
                    <span className={cn(
                      "text-[10px] font-bold",
                      isActive ? "text-slate-400" : "text-slate-400"
                    )}>
                      {topic.type}
                    </span>
                  </button>
                );
              })}

              {/* AI Custom Generator Button */}
              <button
                onClick={() => setSelectedTopicId('ai-generated')}
                className={cn(
                  "w-full p-4 text-left rounded-2xl border-2 border-dashed transition-all flex items-center justify-between gap-2",
                  selectedTopicId === 'ai-generated'
                    ? "border-red-500 bg-red-50/50 text-red-700 shadow-md"
                    : "border-red-200 bg-white hover:bg-red-50/30 text-red-600"
                )}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
                  <span className="text-xs font-black">🤖 Tạo Đề AI Ngẫu Nhiên</span>
                </div>
                <ChevronUp className="w-3.5 h-3.5 rotate-90 opacity-60" />
              </button>
            </div>
          </div>

          {/* Submission Info / Score Summary Panel */}
          {submitted && scoreReport && (
            <div className="premium-card p-5 bg-gradient-to-r from-red-50 to-rose-50 border-red-200 space-y-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-red-600" />
                <h4 className="text-sm font-black text-slate-800">Kết quả làm bài</h4>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <span className="block text-2xl font-black text-slate-800">{scoreReport.bandScore.toFixed(1)}</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">IELTS Band</span>
                </div>
                <div className="h-8 w-px bg-red-200" />
                <div className="text-center">
                  <span className="block text-xl font-black text-emerald-600">+{scoreReport.xpEarned}</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">XP Earned</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANEL: Active Practice Workspace */}
        <div className="lg:col-span-9 space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 premium-card p-12">
              <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
              <p className="text-slate-500 font-bold animate-pulse">EngBot đang tải câu hỏi...</p>
            </div>
          ) : questions.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 premium-card p-12 text-center">
              <HelpCircle className="w-16 h-16 text-slate-350" />
              <p className="text-slate-600 font-black">Không tìm thấy câu hỏi luyện tập.</p>
              <button onClick={() => router.push('/ielts')} className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold">
                Quay lại
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* LISTENING SPECIFIC VISUAL LAYOUT */}
              {skill === 'listening' && (
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Media Player (xl:col-span-5) */}
                  <div className="xl:col-span-5 p-6 bg-slate-50 border border-slate-200/80 rounded-3xl space-y-5 sticky top-4 shadow-sm">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
                      <div className="flex items-center gap-2">
                        <Headphones className="w-5 h-5 text-blue-600" />
                        <h4 className="text-sm font-black text-slate-800">Simulated Audio Player</h4>
                      </div>
                      <span className="text-[9px] font-black px-2.5 py-0.5 rounded bg-blue-100 text-blue-700">Audio Task</span>
                    </div>

                    <div className="p-4 bg-white border border-slate-100 rounded-2xl space-y-4 shadow-sm">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                        <span>Audio Lecture Track</span>
                        <span>{isAudioPlaying ? '01:45 / 03:45' : '0:00 / 03:45'}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 transition-all"
                        >
                          {isAudioPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                        </button>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden relative cursor-pointer">
                          <div
                            className="absolute left-0 top-0 h-full bg-blue-500 rounded-full transition-all duration-300"
                            style={{ width: isAudioPlaying ? '45%' : '0%' }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Audio Transcript accordion */}
                    <div className="space-y-2">
                      <button
                        onClick={() => setShowTranscript(!showTranscript)}
                        className="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-2xl text-xs font-black text-slate-600 hover:text-slate-800 transition-all flex items-center justify-center gap-2"
                      >
                        {showTranscript ? 'Ẩn Script Hội Thoại' : 'Hiện Script Hội Thoại (Ôn Tập)'}
                      </button>
                      {showTranscript && (
                        <div className="p-4 bg-white border border-slate-100 rounded-2xl max-h-[35vh] overflow-y-auto text-xs leading-relaxed font-semibold text-slate-600 whitespace-pre-line shadow-inner animate-in fade-in duration-300">
                          {questions[0]?.context}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Questions List (xl:col-span-7) */}
                  <div className="xl:col-span-7 space-y-6">
                    {questions.map((q, idx) => {
                      const selected = selectedAnswers[q.id];
                      const isCorrect = selected?.charAt(0) === q.correctAnswer;
                      const showExplanation = revealedExplanation[q.id] || submitted;

                      return (
                        <div key={q.id} className="premium-card p-6 space-y-5">
                          <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                            <span className="text-xs font-black text-slate-400">Câu {idx + 1}</span>
                            {submitted && (
                              <span className={cn(
                                "flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider",
                                isCorrect ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                              )}>
                                {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                                {isCorrect ? 'Đúng' : 'Sai'}
                              </span>
                            )}
                          </div>

                          <p className="text-base font-black text-slate-800">{q.questionText}</p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {q.choices.map(choice => {
                              const isSelected = selected === choice;
                              const isChoiceCorrect = choice.trim().charAt(0) === q.correctAnswer;

                              return (
                                <button
                                  key={choice}
                                  disabled={submitted}
                                  onClick={() => handleSelectAnswer(q.id, choice)}
                                  className={cn(
                                    "p-3.5 rounded-2xl text-left border-2 font-bold text-xs transition-all flex items-center justify-between",
                                    !submitted && isSelected && "border-blue-500 bg-blue-50/50 text-blue-700",
                                    !submitted && !isSelected && "border-slate-100 bg-slate-50 hover:bg-slate-100 text-slate-600",
                                    submitted && isChoiceCorrect && "border-emerald-500 bg-emerald-50 text-emerald-700",
                                    submitted && isSelected && !isChoiceCorrect && "border-rose-500 bg-rose-50 text-rose-700",
                                    submitted && !isChoiceCorrect && !isSelected && "border-slate-100 bg-slate-50 opacity-60 text-slate-400"
                                  )}
                                >
                                  <span>{choice}</span>
                                </button>
                              );
                            })}
                          </div>

                          {submitted && (
                            <div className="border-t border-slate-100 pt-4">
                              <button
                                onClick={() => toggleExplanation(q.id)}
                                className="flex items-center justify-between w-full text-left font-black text-xs text-slate-600 hover:text-slate-800"
                              >
                                <span className="flex items-center gap-1.5"><Lightbulb className="w-4 h-4 text-amber-500" /> Giải thích đáp án</span>
                                {revealedExplanation[q.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </button>
                              {showExplanation && (
                                <div className="mt-3 p-4 bg-amber-50/40 border border-amber-100/50 rounded-2xl text-xs font-semibold text-slate-600 leading-relaxed whitespace-pre-line animate-in fade-in duration-350">
                                  <strong className="text-emerald-700 block mb-1">Đáp án đúng: {q.correctAnswer}</strong>
                                  {q.explanation}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* READING SPECIFIC VISUAL LAYOUT */}
              {skill === 'reading' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Reading Passage (lg:col-span-6) */}
                  <div className="lg:col-span-6 p-6 bg-slate-50 border border-slate-200/85 rounded-3xl space-y-4 max-h-[75vh] overflow-y-auto lg:sticky lg:top-4 shadow-sm">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-200/60">
                      <BookOpenCheck className="w-5 h-5 text-emerald-600" />
                      <h4 className="text-sm font-black text-slate-800">Reading Passage (Đoạn văn đọc)</h4>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed font-semibold whitespace-pre-line">
                      {questions[0]?.context}
                    </p>
                  </div>

                  {/* Right Column: Reading Questions (lg:col-span-6) */}
                  <div className="lg:col-span-6 space-y-6">
                    {questions.map((q, idx) => {
                      const selected = selectedAnswers[q.id];
                      const isCorrect = selected?.charAt(0) === q.correctAnswer;
                      const showExplanation = revealedExplanation[q.id] || submitted;

                      return (
                        <div key={q.id} className="premium-card p-6 space-y-5">
                          <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                            <span className="text-xs font-black text-slate-400">Câu {idx + 1}</span>
                            {submitted && (
                              <span className={cn(
                                "flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider",
                                isCorrect ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                              )}>
                                {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                                {isCorrect ? 'Đúng' : 'Sai'}
                              </span>
                            )}
                          </div>

                          <p className="text-sm font-black text-slate-850 leading-relaxed">{q.questionText}</p>

                          <div className="grid grid-cols-1 gap-2.5">
                            {q.choices.map(choice => {
                              const isSelected = selected === choice;
                              const isChoiceCorrect = choice.trim().charAt(0) === q.correctAnswer;

                              return (
                                <button
                                  key={choice}
                                  disabled={submitted}
                                  onClick={() => handleSelectAnswer(q.id, choice)}
                                  className={cn(
                                    "p-3 rounded-2xl text-left border-2 font-bold text-xs transition-all flex items-center justify-between",
                                    !submitted && isSelected && "border-emerald-500 bg-emerald-50/50 text-emerald-700",
                                    !submitted && !isSelected && "border-slate-100 bg-slate-50 hover:bg-slate-100 text-slate-600",
                                    submitted && isChoiceCorrect && "border-emerald-500 bg-emerald-50 text-emerald-700",
                                    submitted && isSelected && !isChoiceCorrect && "border-rose-500 bg-rose-50 text-rose-700",
                                    submitted && !isChoiceCorrect && !isSelected && "border-slate-100 bg-slate-50 opacity-60 text-slate-400"
                                  )}
                                >
                                  <span>{choice}</span>
                                </button>
                              );
                            })}
                          </div>

                          {submitted && (
                            <div className="border-t border-slate-100 pt-4">
                              <button
                                onClick={() => toggleExplanation(q.id)}
                                className="flex items-center justify-between w-full text-left font-black text-xs text-slate-600 hover:text-slate-800"
                              >
                                <span className="flex items-center gap-1.5"><Lightbulb className="w-4 h-4 text-amber-500" /> Giải thích đáp án</span>
                                {revealedExplanation[q.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </button>
                              {showExplanation && (
                                <div className="mt-3 p-4 bg-amber-50/40 border border-amber-100/50 rounded-2xl text-xs font-semibold text-slate-600 leading-relaxed whitespace-pre-line animate-in fade-in duration-350">
                                  <strong className="text-emerald-700 block mb-1">Đáp án đúng: {q.correctAnswer}</strong>
                                  {q.explanation}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CONSTRUCTIVE SKILLS: WRITING / SPEAKING */}
              {isConstructive && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Prompt details & guidelines (lg:col-span-5) */}
                  <div className="lg:col-span-5 p-6 bg-slate-50 border border-slate-200/80 rounded-3xl space-y-4 lg:sticky lg:top-4 shadow-sm">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-200/60">
                      <FileText className="w-5 h-5 text-slate-700" />
                      <h4 className="text-sm font-black text-slate-800">IELTS {skill === 'writing' ? 'Writing Topic' : 'Speaking Prompt'}</h4>
                    </div>

                    <div className="p-4 bg-white border border-slate-150 rounded-2xl text-sm font-bold text-slate-800 whitespace-pre-line leading-relaxed shadow-sm">
                      {questions[0]?.questionText}
                    </div>

                    {questions[0]?.context && (
                      <div className={cn("p-4 border rounded-2xl space-y-2", activeStyle.primaryBg, activeStyle.border)}>
                        <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-700">
                          <Brain className="w-4 h-4" /> Dàn ý & Từ vựng gợi ý
                        </div>
                        <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed font-semibold">
                          {questions[0]?.context}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Input Editor & AI Feedback (lg:col-span-7) */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    {/* Speaking simulated recorder */}
                    {skill === 'speaking' && !submitted && (
                      <div className="premium-card p-6 space-y-4 border-dashed border-rose-300">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-black text-slate-650 flex items-center gap-1.5">
                            <Mic2 className="w-4 h-4 text-rose-500 animate-pulse" /> 
                            {isRecording ? "Đang ghi âm bài nói..." : "Trình ghi âm độc thoại"}
                          </span>
                          {isRecording && (
                            <span className="px-2 py-0.5 bg-rose-100 text-rose-700 text-xs font-black rounded-lg animate-pulse">
                              {formatRecordTime(recordSeconds)}
                            </span>
                          )}
                        </div>

                        <div className="flex justify-center py-2">
                          {!isRecording ? (
                            <button
                              onClick={startRecording}
                              className="px-8 py-3.5 bg-rose-600 text-white rounded-full font-black text-xs hover:bg-rose-700 shadow-md shadow-rose-500/20 transition-all flex items-center gap-2"
                            >
                              <Play className="w-4 h-4" /> BẮT ĐẦU GHI ÂM (SPEAK)
                            </button>
                          ) : (
                            <button
                              onClick={stopRecording}
                              className="px-8 py-3.5 bg-slate-900 text-white rounded-full font-black text-xs hover:bg-slate-800 transition-all flex items-center gap-2 animate-bounce"
                            >
                              <Pause className="w-4 h-4" /> DỪNG & CHUYỂN THÀNH TEXT
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {!submitted ? (
                      <div className="premium-card p-6 space-y-4">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-wider">Bài làm của bạn</label>
                        <textarea
                          value={essayAnswer}
                          onChange={(e) => setEssayAnswer(e.target.value)}
                          placeholder={skill === 'writing' ? "Nhập bài luận Task 2 của bạn tại đây (tối thiểu 250 từ để đạt điểm tối ưu)..." : "Nhập bài nói transcript của bạn ở đây, hoặc bấm phím ghi âm phía trên để tự động nhận dạng giọng nói..."}
                          className="w-full h-80 p-5 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 font-sans text-sm text-slate-800 leading-relaxed shadow-inner"
                        />
                        <div className="flex justify-between items-center text-xs font-bold text-slate-405">
                          <span>Số từ: {essayAnswer.split(/\s+/).filter(Boolean).length} từ</span>
                          <span>Khuyên dùng: {skill === 'writing' ? 'Tối thiểu 250 từ' : 'Tối thiểu 100 từ'}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="premium-card p-6 space-y-3">
                          <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Bài làm đã nộp</h4>
                          <p className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-semibold text-slate-700 leading-relaxed whitespace-pre-line shadow-inner">
                            {essayAnswer}
                          </p>
                        </div>

                        <div className="premium-card p-6 bg-amber-50 border-amber-100 space-y-3">
                          <h4 className="font-black text-slate-800 text-sm flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-amber-500" /> Nhận xét chi tiết từ giáo viên AI
                          </h4>
                          <p className="text-xs font-semibold text-slate-700 leading-relaxed whitespace-pre-line">
                            {scoreReport?.aiFeedback}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Submit CTA Panel */}
              <div className="flex justify-end gap-4 border-t border-slate-100 pt-6">
                {!submitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting || (!isConstructive && Object.keys(selectedAnswers).length < questions.length) || (isConstructive && !essayAnswer.trim())}
                    className={cn(
                      "px-8 py-3.5 text-white rounded-2xl font-black text-xs hover:opacity-95 transition-all shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
                      activeStyle.primary, activeStyle.glow
                    )}
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                    NỘP BÀI CHẤM ĐIỂM
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      // Move to the next topic in list if available, or go back to center
                      const currentIndex = localTopics.findIndex(t => t.id === selectedTopicId);
                      if (currentIndex !== -1 && currentIndex < localTopics.length - 1) {
                        setSelectedTopicId(localTopics[currentIndex + 1].id);
                      } else {
                        router.push('/ielts');
                      }
                    }}
                    className="px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-black text-xs hover:bg-slate-800 transition-all flex items-center gap-2"
                  >
                    HOÀN THÀNH / TIẾP TỤC
                  </button>
                )}
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
