export interface Question {
  id: string;
  context: string;
  questionText: string;
  choices: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Topic {
  id: string;
  title: string;
  difficulty: string;
  type: string;
  questions: Question[];
}

export const PRACTICE_DATABASE: Record<string, Topic[]> = {
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
