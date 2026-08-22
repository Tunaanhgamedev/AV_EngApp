export interface PronounCategory {
  id: string;
  name: string;
  nameVi: string;
  description: string;
  color: string;
  examples: {
    en: string;
    vi: string;
    role: string;
  }[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  rules: string[];
  readingTip: string;
}

export interface PronounPassage {
  id: string;
  title: string;
  level: string;
  text: string;
  pronounReferences: {
    pronoun: string;
    pronounIndex: number; // approximate character offset or identifier
    paragraph: number;
    refersTo: string;
    type: string;
    explanationVi: string;
    contextEn: string;
  }[];
  questions: {
    id: string;
    question: string;
    targetPronoun: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    stepByStep: string[];
  }[];
}

export interface NounEndingRule {
  id: string;
  title: string;
  category: 'suffixes' | 'plurals' | 'uncountable' | 'quantifiers';
  description: string;
  badge: string;
  color: string;
  items: {
    label: string;
    rule: string;
    examples: string[];
    exceptions?: string[];
    examTip?: string;
  }[];
}

export interface WordPositionRule {
  id: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb';
  title: string;
  titleVi: string;
  formula: string[];
  description: string;
  color: string;
  suffixes: string[];
  positions: {
    rule: string;
    formula: string;
    exampleEn: string;
    exampleVi: string;
    explanation: string;
  }[];
  traps: {
    trap: string;
    correction: string;
    note: string;
  }[];
}

export interface TenseSequenceRule {
  id: string;
  title: string;
  formula: string;
  usage: string;
  connectors: string[];
  examples: {
    en: string;
    vi: string;
    tenseBreakdown: string;
  }[];
  readingRecognition: string;
}

export interface AdjVerbRule {
  id: string;
  title: string;
  category: 'adj_suffixes' | 'adj_ed_ing' | 'adj_osascomp' | 'adj_comparison' | 'verb_suffixes' | 'verb_sv_agreement' | 'verb_patterns' | 'verb_passive_reduced';
  description: string;
  badge: string;
  color: string;
  formula?: string;
  items: {
    label: string;
    rule: string;
    examples: string[];
    note?: string;
    examTip?: string;
  }[];
}

export interface GrammarQuestion {
  id: string;
  category: 'pronoun_reference' | 'noun_plurals' | 'word_positions' | 'tenses_agreement' | 'adj_verb_forms';
  question: string;
  highlightWords?: string[];
  options: string[];
  correctIndex: number;
  explanation: string;
  ruleFormula: string;
  level: 'A2' | 'B1' | 'B2' | 'C1';
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. PRONOUN THEORY & PASSAGES
// ─────────────────────────────────────────────────────────────────────────────

export const PRONOUN_CATEGORIES: PronounCategory[] = [
  {
    id: 'personal',
    name: 'Personal Pronouns',
    nameVi: 'Đại từ Nhân Xưng (Chủ ngữ & Tân ngữ)',
    description: 'Dùng để thay thế cho danh từ chỉ người hoặc vật đã được nhắc đến trước đó để tránh lặp từ.',
    color: 'from-blue-500 to-indigo-600',
    table: {
      headers: ['Ngôi', 'Chủ ngữ (Subject)', 'Tân ngữ (Object)', 'Nghĩa tiếng Việt'],
      rows: [
        ['Ngôi 1 số ít', 'I', 'me', 'Tôi, mình, tao'],
        ['Ngôi 1 số nhiều', 'We', 'us', 'Chúng tôi, chúng ta'],
        ['Ngôi 2 (ít/nhiều)', 'You', 'you', 'Bạn, các bạn'],
        ['Ngôi 3 số ít (nam)', 'He', 'him', 'Anh ấy, ông ấy'],
        ['Ngôi 3 số ít (nữ)', 'She', 'her', 'Cô ấy, bà ấy'],
        ['Ngôi 3 số ít (vật)', 'It', 'it', 'Nó, điều đó'],
        ['Ngôi 3 số nhiều', 'They', 'them', 'Họ, chúng nó, những cái đó'],
      ]
    },
    examples: [
      { en: 'Ms. Clara submitted the report. She worked on it all night.', vi: 'Cô Clara đã nộp báo cáo. Cô ấy đã làm việc với nó suốt đêm.', role: 'She = Ms. Clara (S), it = report (O)' },
      { en: 'The engineers tested the software and found it reliable.', vi: 'Các kỹ sư đã kiểm tra phần mềm và thấy nó rất đáng tin cậy.', role: 'it = software' }
    ],
    rules: [
      'Chủ ngữ (I, you, he, she, it, we, they) luôn đứng trước Động từ chính.',
      'Tân ngữ (me, you, him, her, it, us, them) luôn đứng sau Ngoại động từ hoặc Giới từ (to, for, with, at...).',
      'Trong bài đọc, đại từ "They/Them" có thể thay cho CẢ NGƯỜI LẪN VẬT ở dạng số nhiều!'
    ],
    readingTip: 'Khi gặp "it" hoặc "they" trong bài đọc, hãy tìm ngược lại 1-2 câu trước đó: "it" thay cho danh từ số ít hoặc không đếm được, "they" thay cho danh từ số nhiều.'
  },
  {
    id: 'possessive',
    name: 'Possessive Adjectives & Pronouns',
    nameVi: 'Tính từ sở hữu & Đại từ sở hữu',
    description: 'Chỉ quyền sở hữu. Tính từ sở hữu bắt buộc có Danh từ phía sau; Đại từ sở hữu đứng ĐỘC LẬP thay thế cho [Tính từ sở hữu + Danh từ].',
    color: 'from-emerald-500 to-teal-600',
    table: {
      headers: ['Tính từ sở hữu (+ Noun)', 'Đại từ sở hữu (Đứng 1 mình)', 'Ví dụ'],
      rows: [
        ['My + N', 'Mine (= my + N)', 'This is my car. Yours is over there.'],
        ['Your + N', 'Yours (= your + N)', 'Is this pen yours?'],
        ['His + N', 'His (= his + N)', 'His phone is new; mine is old.'],
        ['Her + N', 'Hers (= her + N)', 'Her idea was great, but hers was better.'],
        ['Its + N', 'Its (hiếm khi đứng 1 mình)', 'The company changed its policy.'],
        ['Our + N', 'Ours (= our + N)', 'Our project succeeded; ours was top.'],
        ['Their + N', 'Theirs (= their + N)', 'Their house is big; theirs is modern.'],
      ]
    },
    examples: [
      { en: 'Our team finished their analysis earlier than theirs.', vi: 'Đội của chúng tôi đã hoàn thành phân tích sớm hơn đội của họ.', role: 'theirs = their team / their analysis' }
    ],
    rules: [
      'Tính từ sở hữu (my/your/his/her/its/our/their) + Danh từ (Bắt buộc).',
      'Đại từ sở hữu (mine/yours/his/hers/ours/theirs) KHÔNG BAO GIỜ đi kèm danh từ.',
      'Lưu ý phân biệt: "its" (của nó) KHÔNG có dấu nháy, còn "it\'s" là viết tắt của "it is / it has"!'
    ],
    readingTip: 'Đại từ sở hữu (theirs, ours, mine) thường được hỏi trong bài đọc để kiểm tra xem bạn có nhận ra danh từ được rút gọn phía trước hay không.'
  },
  {
    id: 'relative',
    name: 'Relative Pronouns',
    nameVi: 'Đại từ Quan Hệ (Who, Whom, Which, That, Whose...)',
    description: 'Dùng để nối 2 mệnh đề và bổ nghĩa cho danh từ đứng ngay trước nó trong mệnh đề quan hệ.',
    color: 'from-purple-500 to-violet-600',
    table: {
      headers: ['Đại từ', 'Thay thế cho', 'Vai trò trong MĐQH', 'Ví dụ'],
      rows: [
        ['Who', 'Người', 'Làm Chủ ngữ hoặc Tân ngữ', 'The manager who hired me is very kind.'],
        ['Whom', 'Người', 'Chỉ làm Tân ngữ (sau Giới từ)', 'The candidate with whom I spoke was qualified.'],
        ['Which', 'Vật / Sự việc / Cả câu trước', 'Chủ ngữ hoặc Tân ngữ', 'The report which was submitted yesterday is accurate.'],
        ['That', 'Người hoặc Vật (MĐ xác định)', 'Chủ ngữ hoặc Tân ngữ', 'The proposal that you prepared won the award.'],
        ['Whose', 'Sở hữu (Người hoặc Vật)', '+ Danh từ', 'The architect whose design won is Vietnamese.'],
      ]
    },
    examples: [
      { en: 'The company launched a new smartphone, which received rave reviews.', vi: 'Công ty đã ra mắt điện thoại mới, điều này nhận được nhiều đánh giá tích cực.', role: 'which = the new smartphone' }
    ],
    rules: [
      'Không dùng "that" trong mệnh đề có dấu phẩy (mệnh đề không xác định) hoặc ngay sau giới từ.',
      'Dùng "whose + N" để chỉ sự sở hữu của cả người lẫn vật.',
      '"Which" đứng sau dấu phẩy có thể thay thế cho TOÀN BỘ ý của câu đứng trước.'
    ],
    readingTip: 'Khi câu hỏi Reading hỏi "which" đề cập đến điều gì sau dấu phẩy, hãy chú ý xem nó thay cho danh từ đơn lẻ hay cả hành động ở mệnh đề trước.'
  },
  {
    id: 'demonstrative_indefinite',
    name: 'Demonstrative & Indefinite Pronouns',
    nameVi: 'Đại từ Chỉ Định & Đại từ Bất Định',
    description: 'Đại từ chỉ định (this/that/these/those) và đại từ bất định (someone, anyone, each, either, neither, both, all...) thường xuất hiện trong liên kết văn bản.',
    color: 'from-amber-500 to-orange-600',
    table: {
      headers: ['Nhóm đại từ', 'Từ vựng', 'Quy tắc chia Động từ', 'Ý nghĩa'],
      rows: [
        ['Chỉ định số ít', 'This (này - gần), That (kia - xa)', 'Động từ số ít', 'Chỉ sự vật, ý niệm ở gần/xa'],
        ['Chỉ định số nhiều', 'These (những cái này), Those (những cái kia)', 'Động từ số nhiều', 'Those who = Những người mà'],
        ['Bất định số ít', 'Everyone, Somebody, Anything, Nobody, Each, Either, Neither', 'Luôn chia Động từ SỐ ÍT', 'Chỉ người/vật không xác định cụ thể'],
        ['Bất định số nhiều', 'Both, Few, A few, Many, Several', 'Chia Động từ SỐ NHIỀU', 'Cả hai, một vài, nhiều'],
        ['Linh hoạt theo ngữ cảnh', 'All, Most, Some, None, Any', '+ of + N(số ít) -> V ít\n+ of + N(số nhiều) -> V nhiều', 'Tùy thuộc vào danh từ sau "of"'],
      ]
    },
    examples: [
      { en: 'Everyone in the office is ready for the audit.', vi: 'Mọi người trong văn phòng đều đã sẵn sàng cho cuộc kiểm toán.', role: 'Everyone -> is (số ít)' },
      { en: 'Those who wish to attend must register online.', vi: 'Những người muốn tham dự phải đăng ký trực tuyến.', role: 'Those who = people who' }
    ],
    rules: [
      '"Those who + V(plural)" là cấu trúc kinh điển trong tiếng Anh học thuật & TOEIC mang nghĩa "Những ai mà...".',
      'Mọi từ tận cùng bằng -body, -one, -thing (everyone, nobody, something...) ĐỀU ĐI VỚI ĐỘNG TỪ SỐ ÍT.',
      '"Each of / Neither of / Either of + N(số nhiều) + V(SỐ ÍT)".'
    ],
    readingTip: 'Trong bài đọc, cụm từ "This issue", "These findings", "Such measures" là manh mối quy chiếu giúp bạn xâu chuỗi luận điểm giữa các đoạn văn.'
  }
];

export const PRONOUN_READING_PASSAGES: PronounPassage[] = [
  {
    id: 'passage-1',
    title: 'Renewable Energy Breakthrough',
    level: 'B1',
    text: `GreenTech Solutions has announced a groundbreaking solar battery system designed for residential use. This innovative device stores excess energy generated during sunny days and releases it during peak hours or power outages.

Engineers at the company spent five years perfecting the technology. They faced numerous technical obstacles, especially regarding heat management, but overcame them through advanced nanomaterials. The new model is 40% more efficient than previous versions.

Homeowners who install the system will see an immediate reduction in their electricity bills. Furthermore, they can sell surplus electricity back to the local power grid, which makes the investment even more attractive.

According to Dr. Alan Hayes, the chief project architect, the system represents a significant step forward in sustainable living. He emphasized that clean energy should be accessible to all households, not just affluent ones.`,
    pronounReferences: [
      {
        pronoun: 'it',
        pronounIndex: 1,
        paragraph: 1,
        refersTo: 'excess energy',
        type: 'Personal Object Pronoun',
        explanationVi: '"it" thay thế cho "excess energy" (năng lượng dư thừa) được tạo ra vào ban ngày và giải phóng vào giờ cao điểm.',
        contextEn: 'stores excess energy ... and releases it during peak hours'
      },
      {
        pronoun: 'They',
        pronounIndex: 2,
        paragraph: 2,
        refersTo: 'Engineers at the company',
        type: 'Personal Subject Pronoun',
        explanationVi: '"They" ở đầu câu 2 thay thế cho chủ ngữ số nhiều ở câu trước là "Engineers at the company".',
        contextEn: 'Engineers at the company spent five years ... They faced numerous technical obstacles'
      },
      {
        pronoun: 'them',
        pronounIndex: 3,
        paragraph: 2,
        refersTo: 'technical obstacles',
        type: 'Personal Object Pronoun',
        explanationVi: '"them" làm tân ngữ sau động từ "overcame", thay thế cho danh từ số nhiều "numerous technical obstacles" (nhiều trở ngại kỹ thuật).',
        contextEn: 'faced numerous technical obstacles ... but overcame them'
      },
      {
        pronoun: 'which',
        pronounIndex: 4,
        paragraph: 3,
        refersTo: 'selling surplus electricity back to the grid',
        type: 'Relative Pronoun (Clause Reference)',
        explanationVi: '"which" sau dấu phẩy thay thế cho toàn bộ sự việc ở mệnh đề trước: "họ có thể bán điện dư thừa lại cho lưới điện địa phương".',
        contextEn: 'sell surplus electricity back to the local power grid, which makes the investment even more attractive.'
      },
      {
        pronoun: 'He',
        pronounIndex: 5,
        paragraph: 4,
        refersTo: 'Dr. Alan Hayes',
        type: 'Personal Subject Pronoun',
        explanationVi: '"He" thay thế cho chuyên gia được nhắc đến ở câu trước là "Dr. Alan Hayes, the chief project architect".',
        contextEn: 'According to Dr. Alan Hayes ... He emphasized that clean energy should be accessible'
      }
    ],
    questions: [
      {
        id: 'q1',
        question: 'The word "it" in paragraph 1 refers to:',
        targetPronoun: 'it',
        options: [
          'GreenTech Solutions',
          'A groundbreaking solar battery system',
          'Excess energy',
          'Power outage'
        ],
        correctIndex: 2,
        explanation: '"it" là tân ngữ của động từ "releases" (giải phóng nó), đối chiếu với mệnh đề trước "stores excess energy" (lưu trữ năng lượng dư thừa), do đó "it" quy chiếu về "excess energy".',
        stepByStep: [
          'Bước 1: Xác định "it" là đại từ số ít, chỉ vật/khái niệm.',
          'Bước 2: Xem câu chứa "it": "stores excess energy... and releases it".',
          'Bước 3: Thay thế thử: "releases excess energy during peak hours" -> Hoàn toàn hợp lý về nghĩa!'
        ]
      },
      {
        id: 'q2',
        question: 'The word "them" in paragraph 2 refers to:',
        targetPronoun: 'them',
        options: [
          'Engineers',
          'Five years',
          'Technical obstacles',
          'Nanomaterials'
        ],
        correctIndex: 2,
        explanation: '"them" đứng sau "overcame" (vượt qua chúng). Trước đó câu nói các kỹ sư "faced numerous technical obstacles" (đối mặt với nhiều trở ngại kỹ thuật). Do đó "them" = "technical obstacles".',
        stepByStep: [
          'Bước 1: "them" là đại từ số nhiều chỉ tân ngữ.',
          'Bước 2: Tìm danh từ số nhiều đứng trước động từ "overcame": "technical obstacles".',
          'Bước 3: Kiểm tra nghĩa: "overcame technical obstacles" (vượt qua các trở ngại kỹ thuật) -> Đúng.'
        ]
      },
      {
        id: 'q3',
        question: 'The word "which" in paragraph 3 refers to:',
        targetPronoun: 'which',
        options: [
          'The local power grid',
          'The electricity bills',
          'Selling surplus electricity back to the grid',
          'Homeowners'
        ],
        correctIndex: 2,
        explanation: '"which" đứng sau dấu phẩy ở cuối câu để bổ nghĩa cho cả hành động trước đó: việc có thể bán điện dư thừa cho lưới điện làm cho khoản đầu tư trở nên hấp dẫn hơn.',
        stepByStep: [
          'Bước 1: "which" đứng sau dấu phẩy thường thay thế cho cả mệnh đề đứng trước.',
          'Bước 2: Đọc mệnh đề trước: "they can sell surplus electricity back to the local power grid".',
          'Bước 3: Ý nghĩa: Việc bán điện dư thừa chính là điều làm cho việc đầu tư hấp dẫn hơn.'
        ]
      }
    ]
  },
  {
    id: 'passage-2',
    title: 'The Psychology of Decision Fatigue',
    level: 'B2',
    text: `Every day, an average adult makes roughly 35,000 decisions, ranging from trivial choices like what to wear to high-stakes career moves. While each individual decision may seem inconsequential, collectively they take a severe toll on our mental stamina.

Psychologists describe this phenomenon as "decision fatigue." As people make more choices throughout the day, their ability to evaluate trade-offs diminishes. Consequently, they tend to either make reckless impulse choices or avoid making any decision at all.

Judges, for instance, are significantly more likely to grant parole in the early morning than in late afternoon. Studies show that as their cognitive reserves deplete, they default to the safest and easiest option, which is keeping prisoners incarcerated.

To combat this problem, many successful leaders streamline their daily routines. Steve Jobs famously wore identical black turtlenecks every day. By eliminating trivial wardrobe decisions, he preserved his cognitive bandwidth for critical business strategies.`,
    pronounReferences: [
      {
        pronoun: 'they',
        pronounIndex: 1,
        paragraph: 1,
        refersTo: 'decisions / individual decisions',
        type: 'Personal Subject Pronoun',
        explanationVi: '"they" thay thế cho danh từ số nhiều "each individual decision / decisions" ở mệnh đề trước.',
        contextEn: 'While each individual decision may seem inconsequential, collectively they take a severe toll'
      },
      {
        pronoun: 'their',
        pronounIndex: 2,
        paragraph: 2,
        refersTo: 'people / people\'s',
        type: 'Possessive Adjective',
        explanationVi: '"their" chỉ quyền sở hữu của "people" (khả năng đánh giá của mọi người).',
        contextEn: 'As people make more choices throughout the day, their ability to evaluate trade-offs diminishes.'
      },
      {
        pronoun: 'which',
        pronounIndex: 3,
        paragraph: 3,
        refersTo: 'the safest and easiest option',
        type: 'Relative Pronoun',
        explanationVi: '"which" bổ nghĩa trực tiếp cho danh từ "the safest and easiest option" (lựa chọn an toàn và dễ nhất, đó là giữ tù nhân lại).',
        contextEn: 'default to the safest and easiest option, which is keeping prisoners incarcerated.'
      },
      {
        pronoun: 'he',
        pronounIndex: 4,
        paragraph: 4,
        refersTo: 'Steve Jobs',
        type: 'Personal Subject Pronoun',
        explanationVi: '"he" thay cho nhân vật "Steve Jobs" được nhắc đến ở câu liền trước.',
        contextEn: 'Steve Jobs famously wore identical black turtlenecks ... he preserved his cognitive bandwidth'
      }
    ],
    questions: [
      {
        id: 'q2-1',
        question: 'The word "they" in paragraph 1 refers to:',
        targetPronoun: 'they',
        options: [
          'Adults',
          'Choices / decisions',
          'Career moves',
          'Psychologists'
        ],
        correctIndex: 1,
        explanation: 'Mệnh đề trước bắt đầu bằng "While each individual decision may seem inconsequential..." (Trong khi từng quyết định riêng lẻ có vẻ nhỏ bé), mệnh đề chính nói "collectively they take a severe toll" (tổng hợp lại chúng gây tổn hao lớn). "They" thay cho "decisions".',
        stepByStep: [
          'Bước 1: "they" là chủ ngữ số nhiều.',
          'Bước 2: Tìm đối tượng trong cặp tương phản "each individual decision" (số ít) đối ứng với "collectively they" (tập hợp các quyết định).',
          'Bước 3: "they" = decisions.'
        ]
      },
      {
        id: 'q2-2',
        question: 'The word "which" in paragraph 3 refers to:',
        targetPronoun: 'which',
        options: [
          'Cognitive reserves',
          'Judges',
          'The safest and easiest option',
          'The late afternoon'
        ],
        correctIndex: 2,
        explanation: '"which is keeping prisoners incarcerated" giải thích rõ "the safest and easiest option" là gì.',
        stepByStep: [
          'Bước 1: Xem vị trí danh từ ngay trước "which": "the safest and easiest option".',
          'Bước 2: Đọc tiếp: "...option, which is keeping prisoners incarcerated" -> Lựa chọn an toàn nhất, đó là việc giữ tù nhân trong trại.',
          'Bước 3: Đáp án chính xác là the safest and easiest option.'
        ]
      }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. NOUN ENDINGS & SINGULAR / PLURAL / UNCOUNTABLE RULES
// ─────────────────────────────────────────────────────────────────────────────

export const NOUN_RULES_DATA: NounEndingRule[] = [
  {
    id: 'noun-suffixes',
    title: 'Hậu Tố Nhận Diện Danh Từ (Noun Suffixes)',
    category: 'suffixes',
    description: 'Các đuôi từ phổ biến giúp bạn nhận diện ngay 100% từ đó là Danh từ trong các bài tập biến đổi từ (Word Formation) và đọc hiểu.',
    badge: 'Quy Tắc Đuôi Từ',
    color: 'from-blue-500 to-cyan-500',
    items: [
      {
        label: 'Danh từ chỉ người (-er, -or, -ist, -ant, -ee, -ian)',
        rule: 'Thường gắn vào sau động từ hoặc danh từ gốc để tạo danh từ chỉ nghề nghiệp hoặc người thực hiện hành vi.',
        examples: [
          'teacher (giáo viên), employer (người tuyển dụng), researcher (nhà nghiên cứu)',
          'actor (diễn viên), director (giám đốc), supervisor (người giám sát), competitor (đối thủ)',
          'specialist (chuyên gia), economist (nhà kinh tế), scientist (nhà khoa học)',
          'assistant (trợ lý), accountant (kế toán), applicant (ứng viên), participant (người tham gia)',
          'employee (nhân viên), interviewee (người được phỏng vấn), trainee (thực tập sinh)',
          'technician (kỹ thuật viên), musician (nhạc sĩ), politician (chính trị gia)'
        ],
        examTip: 'Lưu ý phân biệt cặp đôi: -er/-or (người làm, chủ động) vs -ee (người tiếp nhận, bị động), ví dụ: Employer (người thuê lao động) vs Employee (người được thuê / nhân viên).'
      },
      {
        label: 'Danh từ chỉ hành động, khái niệm, trạng thái (-tion, -sion, -ment, -ness, -ity)',
        rule: 'Các đuôi trừu tượng thông dụng nhất trong tiếng Anh học thuật & công sở.',
        examples: [
          '-tion / -sion: information (thông tin), decision (quyết định), production (sản xuất), expansion (mở rộng)',
          '-ment: development (phát triển), agreement (thỏa thuận), management (quản lý), investment (đầu tư)',
          '-ness: happiness (hạnh phúc), awareness (nhận thức), effectiveness (hiệu quả), darkness (bóng tối)',
          '-ity / -ty: productivity (năng suất), flexibility (linh hoạt), security (an ninh), priority (sự ưu tiên)'
        ],
        examTip: 'Sau tính từ sở hữu hoặc mạo từ (a/an/the), từ có đuôi -tion, -ment, -ness, -ity luôn là lựa chọn danh từ hàng đầu.'
      },
      {
        label: 'Danh từ chỉ phẩm chất, mối quan hệ (-ance, -ence, -ship, -hood, -dom, -ism)',
        rule: 'Diễn tả tính chất hoặc quan hệ giữa các đối tượng.',
        examples: [
          '-ance / -ence: performance (hiệu suất/biểu diễn), difference (sự khác biệt), attendance (sự tham dự), confidence (tự tin)',
          '-ship: relationship (mối quan hệ), leadership (khả năng lãnh đạo), partnership (quan hệ đối tác), ownership (quyền sở hữu)',
          '-hood: neighborhood (khu phố), childhood (tuổi thơ), likelihood (khả năng xảy ra)',
          '-dom: freedom (tự do), wisdom (trí tuệ), kingdom (vương quốc)',
          '-ism: optimism (sự lạc quan), criticism (sự chỉ trích), journalism (ngành báo chí)'
        ]
      },
      {
        label: 'BẪY ĐẶC BIỆT: Danh từ có đuôi -al (Dễ nhầm với Tính từ!)',
        rule: 'Thông thường đuôi -al là tính từ (national, global, formal), nhưng một số từ có đuôi -al LẠI LÀ DANH TỪ CỰC KỲ QUAN TRỌNG trong đề thi:',
        examples: [
          'proposal (bản đề xuất - N)',
          'approval (sự phê duyệt - N)',
          'arrival (sự đến nơi - N)',
          'refusal (sự từ chối - N)',
          'removal (sự dời đi / gỡ bỏ - N)',
          'renewal (sự gia hạn / làm mới - N)',
          'disposal (sự xử lý / vứt bỏ - N)',
          'professional (chuyên gia - N/Adj)',
          'representative (đại diện - N)'
        ],
        examTip: 'Đề thi thường cho câu: "We need management\'s ______." và đưa ra các lựa chọn: (A) approve (B) approval (C) approved (D) approvingly. Rất nhiều bạn nghĩ approval là Adj nên chọn sai, nhưng APPROVAL là DANH TỪ!'
      }
    ]
  },
  {
    id: 'plural-rules',
    title: 'Quy Tắc Chia Đuôi Danh Từ Số Nhiều (Plural Formation)',
    category: 'plurals',
    description: 'Nắm vững các quy tắc thêm -s, -es, đổi đuôi -ies, -ves và các danh từ biến đổi bất quy tắc.',
    badge: 'Số Ít & Số Nhiều',
    color: 'from-emerald-500 to-teal-600',
    items: [
      {
        label: '1. Thêm -s (Quy tắc chung thông thường)',
        rule: 'Thêm "-s" vào cuối hầu hết danh từ đếm được số ít.',
        examples: [
          'book -> books (sách)',
          'car -> cars (xe hơi)',
          'document -> documents (tài liệu)',
          'employee -> employees (nhân viên)'
        ]
      },
      {
        label: '2. Thêm -es (Tận cùng bằng: s, ss, sh, ch, x, z, o)',
        rule: 'Khi danh từ kết thúc bằng các âm xì/gió hoặc nguyên âm "o", ta thêm "-es" để phát âm tự nhiên.',
        examples: [
          'bus -> buses, glass -> glasses',
          'brush -> brushes, watch -> watches, branch -> branches',
          'box -> boxes, tax -> taxes, quiz -> quizzes',
          'potato -> potatoes, tomato -> tomatoes, hero -> heroes'
        ],
        exceptions: [
          'Ngoại lệ danh từ gốc nước ngoài / âm nhạc kết thúc bằng "o" chỉ thêm "-s": piano -> pianos, photo -> photos, radio -> radios, studio -> studios, video -> videos, memo -> memos, auto -> autos, zoo -> zoos.'
        ]
      },
      {
        label: '3. Tận cùng là "y": Phụ âm + y vs Nguyên âm + y',
        rule: 'Nếu trước "y" là phụ âm -> Đổi "y" thành "i" rồi thêm "es" (-ies). Nếu trước "y" là nguyên âm (a, e, i, o, u) -> Chỉ thêm "s".',
        examples: [
          'Phụ âm + y: baby -> babies, city -> cities, company -> companies, country -> countries, factory -> factories',
          'Nguyên âm + y: day -> days, key -> keys, boy -> boys, monkey -> monkeys, survey -> surveys, holiday -> holidays'
        ]
      },
      {
        label: '4. Tận cùng là "f" hoặc "fe": Đổi thành "-ves"',
        rule: 'Nhiều danh từ tận cùng bằng "f" hoặc "fe" khi chuyển sang số nhiều sẽ đổi "f/fe" thành "-ves".',
        examples: [
          'leaf -> leaves (lá cây), knife -> knives (con dao)',
          'half -> halves (một nửa), life -> lives (cuộc sống)',
          'wolf -> wolves (chó sói), wife -> wives (vợ)',
          'shelf -> shelves (kệ sách), thief -> thieves (kẻ trộm)'
        ],
        exceptions: [
          'Ngoại lệ chỉ thêm "-s": roof -> roofs (mái nhà), cliff -> cliffs (vách đá), chief -> chiefs (thủ lĩnh), safe -> safes (két sắt), belief -> beliefs (niềm tin).'
        ]
      },
      {
        label: '5. Danh từ biến đổi BẤT QUY TẮC (Irregular Plurals)',
        rule: 'Không thêm -s/-es mà biến đổi hoàn toàn nguyên âm hoặc đuôi.',
        examples: [
          'man -> men (đàn ông), woman -> women (phụ nữ)',
          'child -> children (trẻ em), person -> people (người)',
          'foot -> feet (bàn chân), tooth -> teeth (răng), goose -> geese (con ngỗng)',
          'mouse -> mice (chuột), ox -> oxen (bò đực)',
          'criterion -> criteria (tiêu chí), phenomenon -> phenomena (hiện tượng)',
          'analysis -> analyses (phân tích), crisis -> crises (khủng hoảng)',
          'datum -> data (dữ liệu), curriculum -> curricula (giáo trình)'
        ]
      },
      {
        label: '6. Danh từ GIỮ NGUYÊN (Số ít = Số nhiều) & Danh từ LUÔN SỐ NHIỀU',
        rule: 'Một số danh từ không đổi dạng dù là 1 hay nhiều; một số danh từ có 2 phần cấu tạo nên luôn chia số nhiều.',
        examples: [
          'Giữ nguyên: sheep -> sheep, deer -> deer, fish -> fish, species -> species, series -> series, aircraft -> aircraft',
          'Luôn ở dạng số nhiều (chia động từ số nhiều): scissors (cái kéo), glasses/spectacles (kính đeo), pants/trousers (quần dài), shorts (quần soóc), tweezers (nhíp), clothes (quần áo), cattle (gia súc), police (cảnh sát), goods (hàng hóa), premises (cơ ngơi/mặt bằng)'
        ],
        examTip: 'Cảnh sát "The police" LUÔN chia động từ số nhiều: "The police ARE investigating the case."'
      }
    ]
  },
  {
    id: 'uncountable-nouns',
    title: 'Danh Từ Đếm Được vs Không Đếm Được (Countable vs Uncountable)',
    category: 'uncountable',
    description: 'Phân biệt danh từ đếm được (Countable) và không đếm được (Uncountable), các lượng từ đi kèm và cụm từ đo lường.',
    badge: 'Đếm Được vs Không Đếm Được',
    color: 'from-purple-500 to-violet-600',
    items: [
      {
        label: 'Đặc điểm của Danh từ không đếm được (Uncountable Nouns)',
        rule: '1. KHÔNG dùng với "a / an" trực tiếp trước từ.\n2. KHÔNG BAO GIỜ thêm đuôi số nhiều "-s / -es".\n3. LUÔN CHIA ĐỘNG TỪ Ở DẠNG SỐ ÍT (is, was, has, V-s/es).',
        examples: [
          'Water is essential for life. (ĐÚNG - is số ít)',
          'A water / waters are essential. (SAI)'
        ]
      },
      {
        label: 'Danh sách Danh từ không đếm được "BẪY KINH ĐIỂN" trong đề thi',
        rule: 'Đây là các từ trong tiếng Việt có thể đếm được (1 thông tin, 1 lời khuyên, 1 món đồ nội thất...) nhưng trong tiếng Anh lại TUYỆT ĐỐI KHÔNG ĐẾM ĐƯỢC:',
        examples: [
          'information (thông tin - KHÔNG CÓ informations)',
          'advice (lời khuyên - KHÔNG CÓ advices)',
          'furniture (đồ nội thất - KHÔNG CÓ furnitures)',
          'equipment (trang thiết bị - KHÔNG CÓ equipments)',
          'luggage / baggage (hành lý - KHÔNG CÓ luggages)',
          'news (tin tức - Dù có đuôi "s" nhưng vẫn là N không đếm được, chia V số ít!)',
          'homework / housework (bài tập về nhà / việc nhà)',
          'knowledge (kiến thức), research (nghiên cứu), evidence (bằng chứng)',
          'money (tiền), traffic (giao thông), machinery (máy móc), merchandise (hàng hóa), software (phần mềm)'
        ],
        examTip: 'Nếu đề bài có chỗ trống: "Please provide ______ regarding the schedule.", đáp án có: (A) a detailed information (B) detailed informations (C) detailed information. Đáp án ĐÚNG là (C) vì information không có "a" và không có "s"!'
      },
      {
        label: 'Lượng từ (Quantifiers) đi kèm',
        rule: 'Bảng quy tắc chọn lượng từ chuẩn xác:',
        examples: [
          'Chỉ đi với N đếm được số nhiều: many, few / a few, several, a number of, both, various, each/every (+ N số ít)',
          'Chỉ đi với N không đếm được: much, little / a little, an amount of, a great deal of, less',
          'Đi được với CẢ HAI: some, any, a lot of / lots of, plenty of, all, most, no'
        ],
        examTip: 'Phân biệt "few / little" (rất ít, gần như không có - mang nghĩa tiêu cực) vs "a few / a little" (có một ít, đủ dùng - mang nghĩa tích cực).'
      },
      {
        label: 'Cụm từ đo lường cho Danh từ không đếm được (Partitives)',
        rule: 'Để đếm danh từ không đếm được, ta dùng cấu trúc: [ Số từ / a ] + [ Từ chỉ đơn vị/vật chứa ] + of + [ N không đếm được ].',
        examples: [
          'a piece of advice / information / luggage (một lời khuyên / mẩu tin / kiện hành lý)',
          'two pieces of equipment (hai thiết bị)',
          'a loaf of bread (một ổ bánh mì) -> three loaves of bread',
          'a bar of chocolate / soap (một thanh sô-cô-la / bánh xà phòng)',
          'a bottle of water / wine (một chai nước / rượu)',
          'a sheet of paper (một tờ giấy)',
          'an item of news / clothing (một tin tức / món quần áo)',
          'a cup of coffee / tea (một tách cà phê / trà)'
        ]
      }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. WORD POSITIONS & SOLVING STRATEGY (VỊ TRÍ TỪ LOẠI & MẸO LÀM BÀI)
// ─────────────────────────────────────────────────────────────────────────────

export const WORD_POSITIONS_DATA: WordPositionRule[] = [
  {
    id: 'noun-positions',
    partOfSpeech: 'noun',
    title: 'Vị Trí Của Danh Từ Trong Câu',
    titleVi: 'Danh Từ (Noun - N)',
    color: 'from-blue-600 to-indigo-600',
    formula: [
      'a/an/the + (Adj) + [ NOUN ]',
      'Tính từ sở hữu (my/his/their/our...) + (Adj) + [ NOUN ]',
      'Sở hữu cách (Name\'s) + (Adj) + [ NOUN ]',
      'Giới từ (in/on/at/for/with/about/of...) + [ NOUN / V-ing ]',
      '[ NOUN ] + Verb (Làm Chủ ngữ đầu câu)',
      'Subject + Verb (transitive) + [ NOUN ] (Làm Tân ngữ sau Động từ)',
      'Từ chỉ số lượng (many/some/each/every/all...) + [ NOUN ]',
      '[ NOUN ] + NOUN (Danh từ ghép: customer service, sales report)'
    ],
    description: 'Danh từ là trung tâm ngữ nghĩa của câu, đóng vai trò Chủ ngữ (S), Tân ngữ (O) hoặc bổ ngữ sau giới từ/tính từ.',
    suffixes: ['-tion', '-sion', '-ment', '-ness', '-ity', '-ance', '-ence', '-er', '-or', '-ist', '-ant', '-ee', '-ship', '-hood', '-ism', '-al'],
    positions: [
      {
        rule: 'Sau Mạo từ (a / an / the) và Tính từ',
        formula: 'a / an / the + (Adj) + [ NOUN ]',
        exampleEn: 'The recent development in AI technology surprised everyone.',
        exampleVi: 'Sự phát triển gần đây trong công nghệ AI đã làm mọi người ngạc nhiên.',
        explanation: 'Sau "The recent" (mạo từ + tính từ) bắt buộc cần một Danh từ "development".'
      },
      {
        rule: 'Sau Tính từ sở hữu / Sở hữu cách',
        formula: 'my / your / his / her / its / our / their / John\'s + [ NOUN ]',
        exampleEn: 'Her presentation impressed all board members.',
        exampleVi: 'Bài thuyết trình của cô ấy đã gây ấn tượng với tất cả thành viên hội đồng quản trị.',
        explanation: 'Sau tính từ sở hữu "Her" là danh từ "presentation".'
      },
      {
        rule: 'Sau Giới từ',
        formula: 'Giới từ (in, at, on, of, for, with, about, without, by) + [ NOUN ]',
        exampleEn: 'Thank you for your cooperation.',
        exampleVi: 'Cảm ơn vì sự hợp tác của bạn.',
        explanation: 'Sau giới từ "for" và tính từ sở hữu "your" là danh từ "cooperation".'
      },
      {
        rule: 'Làm Chủ ngữ (S) đứng đầu câu trước Động từ chính',
        formula: '[ NOUN ] + Verb + Object',
        exampleEn: 'Safety regulations must be strictly followed.',
        exampleVi: 'Các quy định an toàn phải được tuân thủ nghiêm ngặt.',
        explanation: '"Safety regulations" đứng đầu câu làm Chủ ngữ trước động từ "must be followed".'
      }
    ],
    traps: [
      {
        trap: 'Chọn Tính từ hoặc Trạng từ ngay sau "the ... of"',
        correction: 'the + [ DANH TỪ ] + of + Noun',
        note: 'Cấu trúc "the ... of" 100% khoảng trống ở giữa phải là DANH TỪ (ví dụ: the protection of the environment, the distribution of goods).'
      },
      {
        trap: 'Nhầm lẫn giữa Danh từ chỉ người (-er/-or/-ist) và Danh từ chỉ vật/khái niệm (-tion/-ment)',
        correction: 'Xét xem chủ ngữ thực hiện hành động là NGƯỜI hay VẬT.',
        note: 'Ví dụ: "The ______ arrived on time." -> Cần người đến nơi -> Chọn "applicant/visitor", không chọn "application/visit".'
      }
    ]
  },
  {
    id: 'verb-positions',
    partOfSpeech: 'verb',
    title: 'Vị Trí Của Động Từ Trong Câu',
    titleVi: 'Động Từ (Verb - V)',
    color: 'from-emerald-600 to-teal-600',
    formula: [
      'Subject + [ VERB ] + (Object)',
      'Modal Verb (can/could/may/might/must/will/should) + [ V-bare ]',
      'to + [ V-bare ] (Chỉ mục đích hoặc sau một số cấu trúc)',
      'Trợ động từ (do/does/did) + [ V-bare ]',
      'Have / Has / Had + [ V3 / V-ed ] (Thì hoàn thành)',
      'Be (am/is/are/was/were) + [ V-ing ] (Tiếp diễn) hoặc [ V3/ed ] (Bị động)',
      'Câu mệnh lệnh: [ V-bare ] + (Object) + please!'
    ],
    description: 'Động từ diễn tả hành động hoặc trạng thái của chủ ngữ, là thành phần cốt lõi bắt buộc phải có trong mỗi mệnh đề độc lập.',
    suffixes: ['-ize / -ise', '-ate', '-en', '-ify'],
    positions: [
      {
        rule: 'Đứng ngay sau Chủ ngữ (S)',
        formula: 'Subject + [ VERB ]',
        exampleEn: 'The committee approved the new budget proposal yesterday.',
        exampleVi: 'Ủy ban đã thông qua đề xuất ngân sách mới ngày hôm qua.',
        explanation: 'Sau chủ ngữ "The committee" là động từ chính ở quá khứ "approved".'
      },
      {
        rule: 'Sau Động từ khuyết thiếu (Modal Verbs)',
        formula: 'can / could / should / will / would / must / may / might + [ V-bare ]',
        exampleEn: 'All participants must register before Friday.',
        exampleVi: 'Tất cả người tham gia phải đăng ký trước thứ Sáu.',
        explanation: 'Sau "must" là động từ nguyên thể không "to" (V-bare): "register".'
      },
      {
        rule: 'Sau "to" (to-Infinitive)',
        formula: 'to + [ V-bare ]',
        exampleEn: 'She called to confirm her flight reservation.',
        exampleVi: 'Cô ấy đã gọi điện để xác nhận đặt chỗ chuyến bay.',
        explanation: '"to confirm" thể hiện mục đích hành động.'
      }
    ],
    traps: [
      {
        trap: 'Câu đã có động từ chính nhưng vẫn điền tiếp một động từ chia thì bình thường mà không có từ nối',
        correction: 'Mỗi câu đơn chỉ có 1 động từ chính chia thì. Nếu có thêm V phụ thì phải dùng to-V, V-ing (rút gọn mệnh đề) hoặc có Đại từ quan hệ (who/which/that).',
        note: 'Ví dụ: "The man ______ at the desk is our CEO." -> Động từ chính là "is", nên chỗ trống phải là "sitting" (rút gọn của who is sitting), KHÔNG CHỌN "sits".'
      }
    ]
  },
  {
    id: 'adjective-positions',
    partOfSpeech: 'adjective',
    title: 'Vị Trí Của Tính Từ Trong Câu',
    titleVi: 'Tính Từ (Adjective - Adj)',
    color: 'from-amber-500 to-orange-600',
    formula: [
      '[ ADJECTIVE ] + Noun (Đứng trước bổ nghĩa cho Danh từ)',
      'Linking Verbs (be/seem/look/feel/taste/sound/become/remain/stay) + [ ADJECTIVE ]',
      'make / keep / find / deem + Object + [ ADJECTIVE ]',
      'Đại từ bất định (something, someone, anything, nothing...) + [ ADJECTIVE ]',
      'too + [ ADJECTIVE ] + to V',
      'so + [ ADJECTIVE ] + that...'
    ],
    description: 'Tính từ dùng để miêu tả đặc điểm, tính chất hoặc phân loại cho danh từ, hoặc đứng sau động từ liên kết để làm bổ ngữ cho chủ ngữ.',
    suffixes: ['-ful', '-less', '-able / -ible', '-ive', '-ous', '-ic / -ical', '-al', '-ent / -ant', '-ish', '-ary'],
    positions: [
      {
        rule: 'Đứng trước Danh từ để bổ nghĩa',
        formula: '[ ADJECTIVE ] + Noun',
        exampleEn: 'They provided an effective solution to the problem.',
        exampleVi: 'Họ đã đưa ra một giải pháp hiệu quả cho vấn đề.',
        explanation: '"effective" là tính từ đứng trước bổ nghĩa cho danh từ "solution".'
      },
      {
        rule: 'Sau Động từ liên kết (Linking Verbs: be, seem, look, feel, become, stay, remain...)',
        formula: 'Linking Verb + [ ADJECTIVE ]',
        exampleEn: 'The staff remained calm during the emergency evacuation.',
        exampleVi: 'Nhân viên vẫn bình tĩnh trong suốt cuộc sơ tán khẩn cấp.',
        explanation: 'Sau linking verb "remained" là tính từ "calm" (không dùng trạng từ calmly!).'
      },
      {
        rule: 'Cấu trúc: make / keep / find / leave / deem + O + [ Adj ]',
        formula: 'make / keep / find + Object + [ ADJECTIVE ]',
        exampleEn: 'Please keep the conference room clean and tidy.',
        exampleVi: 'Vui lòng giữ phòng hội nghị sạch sẽ và ngăn nắp.',
        explanation: 'Sau Object "the conference room" là tính từ "clean and tidy" (bổ nghĩa cho Object).'
      },
      {
        rule: 'Đứng sau Đại từ bất định',
        formula: 'something / anything / someone / nothing + [ ADJECTIVE ]',
        exampleEn: 'Let\'s try something new this weekend.',
        exampleVi: 'Hãy thử một điều gì đó mới mẻ vào cuối tuần này.',
        explanation: 'Tính từ "new" đứng ngay sau đại từ bất định "something".'
      }
    ],
    traps: [
      {
        trap: 'Dùng Trạng từ sau Linking Verbs (be, look, seem, feel, become, taste, sound...)',
        correction: 'Linking Verb + TÍNH TỪ (KHÔNG dùng Trạng từ -ly).',
        note: 'The food tastes DELICIOUS (không dùng deliciously); You look TIRED (không dùng tiredly).'
      }
    ]
  },
  {
    id: 'adverb-positions',
    partOfSpeech: 'adverb',
    title: 'Vị Trí Của Trạng Từ Trong Câu',
    titleVi: 'Trạng Từ (Adverb - Adv)',
    color: 'from-purple-600 to-fuchsia-600',
    formula: [
      '[ ADVERB ], Subject + Verb + Object (Đầu câu trước dấu phẩy)',
      'Subject + [ ADVERB ] + Verb (Trước động từ thường)',
      'Trợ động từ / be + [ ADVERB ] + Verb chính / V3 / V-ing (Giữa trợ V và V chính)',
      '[ ADVERB ] + Adjective / Adverb khác (Bổ nghĩa mức độ)',
      'Subject + Verb (intransitive) + [ ADVERB ] (Sau nội động từ)',
      'Subject + Verb + Object + [ ADVERB ] (Sau tân ngữ ở cuối câu)'
    ],
    description: 'Trạng từ bổ nghĩa cho Động từ, Tính từ, Trạng từ khác hoặc cả câu. Đa số trạng từ chỉ thể cách có cấu trúc: [ Adj ] + "-ly" = [ Adv ].',
    suffixes: ['-ly (quickly, carefully)', '-ward(s) (forward, backwards)', '-wise (clockwise, likewise)'],
    positions: [
      {
        rule: 'Đứng đầu câu ngăn cách bằng dấu phẩy',
        formula: '[ ADVERB ], S + V + O',
        exampleEn: 'Fortunately, nobody was injured in the accident.',
        exampleVi: 'May mắn thay, không ai bị thương trong vụ tai nạn.',
        explanation: '"Fortunately" đứng đầu câu bổ nghĩa cho toàn bộ sự việc phía sau.'
      },
      {
        rule: 'Đứng giữa Trợ động từ và Động từ chính (Kinh điển trong bài thi!)',
        formula: 'have / has / had + [ ADV ] + V3/ed   HOẶC   be + [ ADV ] + V3/ed (Bị động)',
        exampleEn: 'The report has already been thoroughly reviewed by the auditor.',
        exampleVi: 'Báo cáo đã được kiểm toán viên xem xét kỹ lưỡng.',
        explanation: 'Giữa "been" và "reviewed" là trạng từ "thoroughly".'
      },
      {
        rule: 'Đứng trước Tính từ hoặc Trạng từ khác để nhấn mạnh mức độ',
        formula: '[ ADVERB ] + Adjective / Adverb',
        exampleEn: 'This approach is highly effective in increasing user retention.',
        exampleVi: 'Phương pháp này cực kỳ hiệu quả trong việc tăng tỷ lệ giữ chân người dùng.',
        explanation: '"highly" là trạng từ bổ nghĩa cho tính từ "effective".'
      },
      {
        rule: 'Đứng sau Ngoại động từ + Tân ngữ (HOẶC sau Nội động từ)',
        formula: 'S + V + O + [ ADVERB ]   HOẶC   S + V(nội) + [ ADVERB ]',
        exampleEn: 'She speaks English fluently. / The train arrived promptly.',
        exampleVi: 'Cô ấy nói tiếng Anh lưu loát. / Chuyến tàu đã đến đúng giờ.',
        explanation: '"fluently" đứng sau tân ngữ "English"; "promptly" đứng sau nội động từ "arrived".'
      }
    ],
    traps: [
      {
        trap: 'BẪY TỬ HUYỆT: Chèn Trạng từ vào giữa Động từ và Tân ngữ trực tiếp',
        correction: 'KHÔNG BAO GIỜ đặt Adv giữa Verb và Object: "S + V + Adv + O" là SAI!',
        note: 'SAI: She speaks fluently English. -> ĐÚNG: She speaks English fluently (hoặc She fluently speaks English).'
      },
      {
        trap: 'Nhầm lẫn các Tính từ có đuôi "-ly" là Trạng từ',
        correction: 'Các từ sau là TÍNH TỪ: friendly (thân thiện), lovely (đáng yêu), costly (đắt đỏ), timely (kịp thời), orderly (ngăn nắp), lively (sống động), daily/weekly/monthly (hàng ngày/tuần/tháng - vừa là N, Adj, Adv).',
        note: '"in a timely manner" (theo cách kịp thời - timely là Adj bổ nghĩa cho manner).'
      }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 4. TENSES & SEQUENCE OF TENSES (PHỐI HỢP THÌ TRONG BÀI ĐỌC & NGỮ CẢNH)
// ─────────────────────────────────────────────────────────────────────────────

export const TENSES_SEQUENCE_DATA: TenseSequenceRule[] = [
  {
    id: 'seq-when-while',
    title: 'Phối Hợp Thì với WHEN & WHILE (Quá khứ)',
    formula: 'When / While + S + was/were V-ing, S + V2/ed  (Hành động đang diễn ra thì hành động khác xen vào)',
    usage: 'Dùng khi miêu tả bối cảnh một hành động dài đang diễn ra trong quá khứ thì một hành động ngắn bất ngờ xen vào.',
    connectors: ['When', 'While', 'As'],
    examples: [
      {
        en: 'While the technician was repairing the server, the power went out.',
        vi: 'Trong khi kỹ thuật viên đang sửa máy chủ, điện đột ngột bị cúp.',
        tenseBreakdown: 'was repairing (QK tiếp diễn - hành động dài) + went out (QK đơn - xen vào ngắn)'
      },
      {
        en: 'While John was analyzing the data, Mary was preparing the slides.',
        vi: 'Trong khi John đang phân tích dữ liệu, Mary đang chuẩn bị các slide.',
        tenseBreakdown: 'was analyzing + was preparing (2 hành động song song trong QK)'
      }
    ],
    readingRecognition: 'Gặp "While/When" trong quá khứ: chú ý hành động đang tiếp diễn chia was/were V-ing, hành động chen ngang chia V2/ed.'
  },
  {
    id: 'seq-since-for',
    title: 'Phối Hợp Thì với SINCE & FOR (Hiện tại hoàn thành)',
    formula: 'S + have/has + V3/ed + SINCE + [ Mốc thời gian / S + V2/ed ]',
    usage: 'Diễn tả hành động bắt đầu từ quá khứ (kể từ mốc thời gian / sự kiện trong quá khứ đơn) và kéo dài liên tục đến hiện tại.',
    connectors: ['Since', 'For', 'Over the past/last...'],
    examples: [
      {
        en: 'The company has expanded rapidly since Ms. Vance became CEO in 2022.',
        vi: 'Công ty đã mở rộng nhanh chóng kể từ khi bà Vance trở thành CEO vào năm 2022.',
        tenseBreakdown: 'has expanded (Hiện tại hoàn thành) + since + became (Quá khứ đơn)'
      },
      {
        en: 'They have worked on this project for over six months.',
        vi: 'Họ đã làm việc trong dự án này được hơn 6 tháng.',
        tenseBreakdown: 'have worked (HTHT) + for + khoảng thời gian'
      }
    ],
    readingRecognition: 'Sau "since" luôn là mệnh đề Quá Khứ Đơn (V2/ed), mệnh đề chính còn lại chia Hiện Tại Hoàn Thành (have/has V3/ed).'
  },
  {
    id: 'seq-before-after-bythetime',
    title: 'Phối Hợp Thì với BEFORE, AFTER & BY THE TIME (Quá khứ hoàn thành)',
    formula: 'Before + S + V2/ed, S + had + V3/ed   |   After + S + had + V3/ed, S + V2/ed',
    usage: 'Dùng để nhấn mạnh một hành động đã hoàn tất TRƯỚC một hành động khác trong quá khứ.',
    connectors: ['Before', 'After', 'By the time', 'Prior to'],
    examples: [
      {
        en: 'By the time the fire department arrived, the security team had evacuated everyone.',
        vi: 'Vào thời điểm lực lượng cứu hỏa đến, đội an ninh đã sơ tán tất cả mọi người xong.',
        tenseBreakdown: 'By the time + arrived (QK đơn) -> had evacuated (QK hoàn thành xảy ra trước)'
      },
      {
        en: 'After we had reviewed all candidate portfolios, we conducted final interviews.',
        vi: 'Sau khi chúng tôi đã xem xét xong hồ sơ của các ứng viên, chúng tôi đã tiến hành phỏng vấn vòng cuối.',
        tenseBreakdown: 'After + had reviewed (xảy ra trước) -> conducted (xảy ra sau)'
      }
    ],
    readingRecognition: 'By the time + QK đơn -> Mệnh đề chính: had + V3/ed. By the time + Hiện tại đơn -> Mệnh đề chính: will have + V3/ed.'
  },
  {
    id: 'seq-time-clauses-future',
    title: 'Mệnh Đề Thời Gian Chỉ Tương Lai (As soon as, Until, When, Once...)',
    formula: 'Mệnh đề chính (WILL + V-bare) + [ When / As soon as / Once / Until ] + S + V(s/es) (Hiện tại đơn)',
    usage: 'QUY TẮC VÀNG: Trong các mệnh đề trạng ngữ chỉ thời gian (bắt đầu bằng when, as soon as, once, until, before, after), KHÔNG ĐƯỢC DÙNG "WILL" mà phải dùng thì HIỆN TẠI ĐƠN để biểu đạt tương lai!',
    connectors: ['As soon as', 'When', 'Once', 'Until', 'The moment that', 'As long as'],
    examples: [
      {
        en: 'We will dispatch the replacement parts as soon as the payment is confirmed.',
        vi: 'Chúng tôi sẽ gửi linh kiện thay thế ngay khi khoản thanh toán được xác nhận.',
        tenseBreakdown: 'will dispatch (Tương lai đơn) + as soon as + is confirmed (Hiện tại đơn bị động, KHÔNG DÙNG will be confirmed!)'
      },
      {
        en: 'Once you sign the contract, we will begin the onboarding process.',
        vi: 'Một khi bạn ký hợp đồng, chúng tôi sẽ bắt đầu quy trình tiếp nhận nhân sự.',
        tenseBreakdown: 'Once + sign (Hiện tại đơn) -> will begin (Tương lai đơn)'
      }
    ],
    readingRecognition: 'Nếu thấy liên từ thời gian (as soon as, once, until) và mệnh đề chính có "will", chọn ngay động từ chia HIỆN TẠI ĐƠN ở mệnh đề thời gian.'
  },
  {
    id: 'subject-verb-agreement',
    title: 'Hòa Hợp Chủ Ngữ & Động Từ (Subject-Verb Agreement Rules)',
    formula: 'S (số ít) -> V (số ít)   |   S (số nhiều) -> V (số nhiều)',
    usage: 'Xác định đúng danh từ chính làm chủ ngữ khi có nhiều thành phần xen giữa.',
    connectors: ['along with', 'as well as', 'together with', 'Either...or', 'Neither...nor', 'Not only...but also'],
    examples: [
      {
        en: 'The manager, along with his assistants, is attending the summit.',
        vi: 'Người quản lý, cùng với các trợ lý của anh ấy, đang tham dự hội nghị thượng đỉnh.',
        tenseBreakdown: 'Chủ ngữ chính là "The manager" (số ít) -> chia "is attending", phần "along with his assistants" là thành phần phụ xen giữa.'
      },
      {
        en: 'Neither the director nor the supervisors were aware of the glitch.',
        vi: 'Cả giám đốc lẫn các giám sát viên đều không hay biết về lỗi hệ thống.',
        tenseBreakdown: 'Neither S1 nor S2 -> Động từ chia theo S2 gần nhất ("the supervisors" số nhiều -> chia "were").'
      },
      {
        en: 'Each of the participants was given a certificate of completion.',
        vi: 'Mỗi người tham gia đã được trao một chứng chỉ hoàn thành.',
        tenseBreakdown: 'Each of + N(plural) -> Động từ LUÔN CHIA SỐ ÍT ("was given").'
      }
    ],
    readingRecognition: 'Cụm danh từ dài có giới từ (The quality of these products): Chủ ngữ là từ ĐỨNG TRƯỚC GIỚI TỪ ĐẦU TIÊN ("The quality" số ít -> V số ít).'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 5. PRACTICE QUESTIONS REPOSITORY
// ─────────────────────────────────────────────────────────────────────────────

export const GRAMMAR_PRACTICE_QUESTIONS: GrammarQuestion[] = [
  // Pronoun Reference
  {
    id: 'prq-1',
    category: 'pronoun_reference',
    level: 'B1',
    question: 'Read the sentence: "Dr. Jenkins introduced two newly developed diagnostic tools to the medical board, and the chairman praised ______ for their outstanding accuracy."',
    highlightWords: ['two newly developed diagnostic tools', 'the chairman', 'praised', 'for their outstanding accuracy'],
    options: ['they', 'them', 'theirs', 'themselves'],
    correctIndex: 1,
    explanation: 'Sau ngoại động từ "praised" cần một Đại từ nhân xưng làm TÂN NGỮ (Object Pronoun) số nhiều thay cho "two newly developed diagnostic tools". Tân ngữ số nhiều là "them".',
    ruleFormula: 'Verb (transitive) + OBJECT PRONOUN (me / him / her / it / them)'
  },
  {
    id: 'prq-2',
    category: 'pronoun_reference',
    level: 'B2',
    question: 'Read the excerpt: "The company updated its cybersecurity guidelines yesterday. Employees ______ work remotely are required to install the new VPN client immediately."',
    highlightWords: ['Employees', 'work remotely'],
    options: ['who', 'whom', 'whose', 'which'],
    correctIndex: 0,
    explanation: '"Employees" là danh từ chỉ người số nhiều. Khoảng trống đứng trước động từ "work" đóng vai trò làm Chủ ngữ trong mệnh đề quan hệ. Đại từ quan hệ chỉ người làm chủ ngữ là "who".',
    ruleFormula: 'Noun (người) + WHO + Verb'
  },
  {
    id: 'prq-3',
    category: 'pronoun_reference',
    level: 'A2',
    question: '"Ms. Jessica forgot to bring ______ laptop to the seminar, so she had to take handwritten notes."',
    highlightWords: ['Ms. Jessica', 'laptop'],
    options: ['she', 'hers', 'her', 'herself'],
    correctIndex: 2,
    explanation: 'Đứng trước danh từ "laptop" cần một TÍNH TỪ SỞ HỮU (Possessive Adjective). Chủ ngữ là "Ms. Jessica" (nữ) -> Tính từ sở hữu tương ứng là "her".',
    ruleFormula: 'Tính từ sở hữu (my / your / his / her / our / their) + NOUN'
  },
  {
    id: 'prq-4',
    category: 'pronoun_reference',
    level: 'B1',
    question: '"Our marketing proposal was approved yesterday, but ______ is still under review by the executive committee."',
    highlightWords: ['Our marketing proposal', 'is still under review'],
    options: ['their', 'they', 'theirs', 'them'],
    correctIndex: 2,
    explanation: 'Khoảng trống làm chủ ngữ đứng một mình trước "is still under review", mang nghĩa "bản đề xuất của họ" (= their marketing proposal). Để thay thế cho [Tính từ sở hữu + Danh từ] mà không lặp lại danh từ, ta dùng ĐẠI TỪ SỞ HỮU "theirs".',
    ruleFormula: 'Possessive Pronoun (theirs = their proposal) làm Chủ ngữ độc lập'
  },
  {
    id: 'prq-5',
    category: 'pronoun_reference',
    level: 'B2',
    question: '"______ who are interested in participating in the international charity marathon must register by 5:00 PM today."',
    highlightWords: ['who are interested in'],
    options: ['These', 'Those', 'This', 'That'],
    correctIndex: 1,
    explanation: 'Cấu trúc cố định kinh điển: "Those who + V(plural)" mang nghĩa "Những người mà...".',
    ruleFormula: 'Those who + V(plural) = People who'
  },

  // Noun Endings & Plurals / Uncountable
  {
    id: 'npq-1',
    category: 'noun_plurals',
    level: 'A2',
    question: '"The hotel provided us with useful ______ about local tourist attractions and transport options."',
    highlightWords: ['useful', 'about local tourist attractions'],
    options: ['informations', 'an information', 'information', 'informative'],
    correctIndex: 2,
    explanation: '"information" là danh từ KHÔNG ĐẾM ĐƯỢC trong tiếng Anh. Không bao giờ thêm "-s" và không đi trực tiếp với "an".',
    ruleFormula: 'Uncountable Noun: không dùng a/an, không thêm -s/-es'
  },
  {
    id: 'npq-2',
    category: 'noun_plurals',
    level: 'B1',
    question: '"The research team used strict scientific ______ to evaluate the validity of the clinical trial results."',
    highlightWords: ['strict scientific', 'to evaluate'],
    options: ['criterion', 'criterions', 'criteria', 'criterias'],
    correctIndex: 2,
    explanation: '"criterion" (tiêu chí) là danh từ gốc Hy Lạp có dạng số nhiều bất quy tắc là "criteria". Không có từ criterions hay criterias!',
    ruleFormula: 'Irregular Plural: criterion (số ít) -> criteria (số nhiều)'
  },
  {
    id: 'npq-3',
    category: 'noun_plurals',
    level: 'B1',
    question: '"Before launching the marketing campaign, the creative department must obtain the CEO\'s formal ______."',
    highlightWords: ['the CEO\'s formal'],
    options: ['approve', 'approval', 'approvingly', 'approved'],
    correctIndex: 1,
    explanation: 'Sau sở hữu cách "the CEO\'s" và tính từ "formal" bắt buộc phải là một DANH TỪ. "approval" là danh từ có đuôi "-al" mang nghĩa "sự phê duyệt".',
    ruleFormula: 'Possessive + Adj + [ NOUN (-al: approval, proposal, refusal...) ]'
  },
  {
    id: 'npq-4',
    category: 'noun_plurals',
    level: 'A2',
    question: '"Due to heavy rain, fallen ______ blocked the main entrance to the university campus."',
    highlightWords: ['fallen', 'blocked the main entrance'],
    options: ['leafs', 'leafes', 'leaves', 'leaf'],
    correctIndex: 2,
    explanation: 'Danh từ "leaf" (chiếc lá) kết thúc bằng "f", khi chuyển sang số nhiều đổi "f" thành "-ves" -> "leaves".',
    ruleFormula: 'Plural rule: N tận cùng bằng f/fe -> đổi thành -ves (leaves, knives, wolves)'
  },
  {
    id: 'npq-5',
    category: 'noun_plurals',
    level: 'B2',
    question: '"Because the factory upgraded its manufacturing plant, the workers needed two new ______ of heavy equipment."',
    highlightWords: ['two new', 'of heavy equipment'],
    options: ['piece', 'pieces', 'equipments', 'item'],
    correctIndex: 1,
    explanation: '"equipment" không đếm được nên không thể dùng "two equipments". Để đếm, ta dùng cụm từ đo lường: "two new pieces of heavy equipment" (số từ 2 -> pieces số nhiều).',
    ruleFormula: 'Partitive phrase: Number + pieces/items of + Uncountable Noun'
  },

  // Word Positions & Solving Strategy
  {
    id: 'wpq-1',
    category: 'word_positions',
    level: 'B1',
    question: '"The board praised Mr. Dawson for his ______ management of the restructuring project during the crisis."',
    highlightWords: ['for his', 'management'],
    options: ['exception', 'exceptional', 'exceptionally', 'except'],
    correctIndex: 1,
    explanation: 'Nhìn trước khoảng trống có "his" (tính từ sở hữu), nhìn sau có "management" (danh từ). Vị trí đứng giữa tính từ sở hữu và danh từ là TÍNH TỪ bổ nghĩa cho danh từ đó -> Chọn "exceptional" (xuất sắc).',
    ruleFormula: 'Tính từ sở hữu + [ TÍNH TỪ (Adj) ] + Danh từ (Noun)'
  },
  {
    id: 'wpq-2',
    category: 'word_positions',
    level: 'B1',
    question: '"The audit committee has ______ examined all financial records for the previous fiscal quarter."',
    highlightWords: ['has', 'examined all financial records'],
    options: ['careful', 'carefulness', 'carefully', 'caring'],
    correctIndex: 2,
    explanation: 'Khoảng trống đứng giữa trợ động từ "has" và động từ phân từ "examined" (have/has + [ ADV ] + V3/ed). Vị trí duy nhất có thể đứng giữa trợ động từ và động từ chính là TRẠNG TỪ (-ly) -> Chọn "carefully".',
    ruleFormula: 'have / has / had + [ TRẠNG TỪ (Adv) ] + V3/ed'
  },
  {
    id: 'wpq-3',
    category: 'word_positions',
    level: 'B2',
    question: '"To maintain customer loyalty, we must keep our service standards ______ at all times."',
    highlightWords: ['keep our service standards', 'at all times'],
    options: ['high', 'highly', 'height', 'heighten'],
    correctIndex: 0,
    explanation: 'Cấu trúc đặc biệt: keep + Object + [ TÍNH TỪ ]. "our service standards" là Object -> Cần tính từ "high" (giữ tiêu chuẩn dịch vụ ở mức cao). Lưu ý: "highly" là trạng từ chỉ mức độ (rất/cực kỳ), không dùng sau keep + O.',
    ruleFormula: 'make / keep / find + Object + [ TÍNH TỪ (Adj) ]'
  },
  {
    id: 'wpq-4',
    category: 'word_positions',
    level: 'A2',
    question: '"All visitors are kindly requested to ______ their badges at the security desk upon arrival."',
    highlightWords: ['requested to', 'their badges'],
    options: ['display', 'displaying', 'displayed', 'displays'],
    correctIndex: 0,
    explanation: 'Sau "to" trong cấu trúc "requested to" bắt buộc là ĐỘNG TỪ NGUYÊN THỂ (V-bare) -> Chọn "display".',
    ruleFormula: 'to + [ V-bare (động từ nguyên mẫu) ]'
  },
  {
    id: 'wpq-5',
    category: 'word_positions',
    level: 'B2',
    question: '"Despite the sudden market downturn, the startup\'s executive leadership remained ______ about future expansion."',
    highlightWords: ['remained', 'about future expansion'],
    options: ['optimism', 'optimistic', 'optimistically', 'optimize'],
    correctIndex: 1,
    explanation: '"remained" là Động từ liên kết (Linking Verb). Sau Linking Verb là TÍNH TỪ làm bổ ngữ cho chủ ngữ (không dùng trạng từ) -> Chọn "optimistic".',
    ruleFormula: 'Linking Verbs (be, seem, look, remain, stay, feel, become...) + [ TÍNH TỪ (Adj) ]'
  },

  // Tenses & Agreement
  {
    id: 'taq-1',
    category: 'tenses_agreement',
    level: 'B1',
    question: '"The legal department ______ the partnership contract as soon as the CEO returns from Tokyo tomorrow."',
    highlightWords: ['as soon as the CEO returns'],
    options: ['finalizes', 'will finalize', 'finalized', 'had finalized'],
    correctIndex: 1,
    explanation: 'Quy tắc mệnh đề thời gian chỉ tương lai: Mệnh đề chính dùng TƯƠNG LAI ĐƠN (will + V-bare), mệnh đề trạng ngữ thời gian (as soon as...) dùng Hiện tại đơn (returns).',
    ruleFormula: 'Main Clause (WILL + V-bare) + as soon as / when / once + S + V(s/es)'
  },
  {
    id: 'taq-2',
    category: 'tenses_agreement',
    level: 'B1',
    question: '"By the time the keynote speaker arrived at the auditorium, the opening remarks ______ by the host."',
    highlightWords: ['By the time', 'arrived', 'the opening remarks'],
    options: ['had already been delivered', 'have already been delivered', 'will have been delivered', 'are already delivered'],
    correctIndex: 0,
    explanation: 'Cấu trúc "By the time + S + V2/ed (quá khứ đơn)", mệnh đề chính phải chia QUÁ KHỨ HOÀN THÀNH (had + V3/ed) để diễn tả hành động đã hoàn tất trước đó.',
    ruleFormula: 'By the time + S + V2/ed (quá khứ), S + HAD + V3/ed'
  },
  {
    id: 'taq-3',
    category: 'tenses_agreement',
    level: 'B2',
    question: '"The head researcher, along with five laboratory assistants, ______ conducting tests on the new compound."',
    highlightWords: ['The head researcher', 'along with five laboratory assistants'],
    options: ['is currently', 'are currently', 'were currently', 'have been currently'],
    correctIndex: 0,
    explanation: 'Quy tắc hòa hợp chủ vị: Khi chủ ngữ nối với nhau bằng "along with / as well as / together with", động từ CHIA THEO CHỦ NGỮ ĐẦU TIÊN. Chủ ngữ đầu là "The head researcher" (số ít) -> Chọn "is currently".',
    ruleFormula: 'S1 + along with / as well as / together with + S2 + Verb (chia theo S1)'
  },
  {
    id: 'taq-4',
    category: 'tenses_agreement',
    level: 'A2',
    question: '"Our multinational corporation ______ operations in over twenty countries since it was founded in 2010."',
    highlightWords: ['since it was founded in 2010'],
    options: ['expanded', 'has expanded', 'expands', 'is expanding'],
    correctIndex: 1,
    explanation: 'Cấu trúc "since + mốc thời gian / QK đơn (was founded)", mệnh đề chính diễn tả hành động kéo dài từ quá khứ đến nay -> Chia HIỆN TẠI HOÀN THÀNH (has expanded).',
    ruleFormula: 'S + have/has + V3/ed + SINCE + S + V2/ed'
  },
  {
    id: 'taq-5',
    category: 'tenses_agreement',
    level: 'B1',
    question: '"Each of the shortlisted candidates ______ an in-person interview with the hiring panel next Monday."',
    highlightWords: ['Each of the shortlisted candidates'],
    options: ['have', 'has', 'having', 'are having'],
    correctIndex: 1,
    explanation: '"Each of + Danh từ số nhiều" LUÔN ĐI VỚI ĐỘNG TỪ SỐ ÍT -> Chọn "has" (không chọn have hay are having).',
    ruleFormula: 'Each / Every / Neither / Either of + N(plural) + VERB (số ít: is / has / V-s/es)'
  },

  // Adjective & Verb Forms Practice Questions
  {
    id: 'avq-1',
    category: 'adj_verb_forms',
    level: 'A2',
    question: '"Customer service representatives are instructed to respond to inquiries in a ______ manner."',
    highlightWords: ['in a', 'manner'],
    options: ['timely', 'time', 'timed', 'timeliness'],
    correctIndex: 0,
    explanation: 'Cấu trúc "in a + [Tính từ] + manner/fashion" (theo một cách thức...). "timely" là TÍNH TỪ mang nghĩa "kịp thời, đúng lúc" (dù có đuôi -ly).',
    ruleFormula: 'in a + ADJECTIVE (-ly: timely, friendly, orderly) + manner / way'
  },
  {
    id: 'avq-2',
    category: 'adj_verb_forms',
    level: 'B1',
    question: '"The executive board was extremely ______ with the financial turnaround achieved in the fourth quarter."',
    highlightWords: ['was extremely', 'with the financial turnaround'],
    options: ['satisfying', 'satisfied', 'satisfy', 'satisfaction'],
    correctIndex: 1,
    explanation: 'Chủ thể là người ("The executive board" - ban giám đốc) thể hiện CẢM XÚC hài lòng -> Dùng tính từ phân từ đuôi -ED ("satisfied with"). "satisfying" là bản chất làm hài lòng người khác.',
    ruleFormula: 'S (người) + be + ADJ(-ed: satisfied, interested, surprised) + with / in / at'
  },
  {
    id: 'avq-3',
    category: 'adj_verb_forms',
    level: 'B1',
    question: '"Due to unforeseen software glitches, management decided ______ the product release until next month."',
    highlightWords: ['decided', 'the product release'],
    options: ['postponing', 'to postpone', 'postpone', 'postponed'],
    correctIndex: 1,
    explanation: 'Động từ "decide" luôn đi cùng TO-INFINITIVE (decide to V: quyết định làm gì trong tương lai) -> Chọn "to postpone".',
    ruleFormula: 'decide / plan / hope / promise / agree + TO-V'
  },
  {
    id: 'avq-4',
    category: 'adj_verb_forms',
    level: 'B2',
    question: '"All documents ______ in this safety deposit box are strictly confidential and protected by law."',
    highlightWords: ['All documents', 'in this safety deposit box'],
    options: ['storing', 'stored', 'store', 'are storing'],
    correctIndex: 1,
    explanation: 'Rút gọn mệnh đề quan hệ dạng BỊ ĐỘNG: "All documents [which are] stored in this box..." -> Bỏ đại từ quan hệ và to be, giữ lại V3/ed ("stored"). Dấu hiệu: phía sau có giới từ "in".',
    ruleFormula: 'N (vật bị tác động) + V3/ED (stored, manufactured, held) + Giới từ'
  },
  {
    id: 'avq-5',
    category: 'adj_verb_forms',
    level: 'B1',
    question: '"A number of regional delegates ______ already registered for the international trade summit."',
    highlightWords: ['A number of regional delegates', 'already registered'],
    options: ['has', 'have', 'is', 'was'],
    correctIndex: 1,
    explanation: 'Quy tắc hòa hợp chủ vị: "A number of + N số nhiều" mang nghĩa "Nhiều đại biểu..." -> Đi với ĐỘNG TỪ SỐ NHIỀU -> Chọn "have". (Khác với "The number of" đi với động từ số ít).',
    ruleFormula: 'A number of + N(plural) + VERB SỐ NHIỀU (have, are, V-bare)'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 5. ADJECTIVE & VERB FORMS RULES & IRREGULAR VERBS
// ─────────────────────────────────────────────────────────────────────────────

export interface IrregularVerbGroup {
  groupName: string;
  pattern: string;
  descriptionVi: string;
  verbs: {
    v1: string;
    v2: string;
    v3: string;
    meaningVi: string;
    exampleEn: string;
  }[];
}

export const IRREGULAR_VERBS_CATEGORIZED: IrregularVerbGroup[] = [
  {
    groupName: 'Nhóm 1: Ba cột giống hệt nhau (V1 = V2 = V3)',
    pattern: 'V1 = V2 = V3',
    descriptionVi: 'Không đổi hình thức ở bất kỳ thì nào, dễ nhớ nhất.',
    verbs: [
      { v1: 'cut', v2: 'cut', v3: 'cut', meaningVi: 'cắt, giảm bớt', exampleEn: 'The firm cut operational costs.' },
      { v1: 'cost', v2: 'cost', v3: 'cost', meaningVi: 'có giá, trị giá', exampleEn: 'The repair cost $500.' },
      { v1: 'put', v2: 'put', v3: 'put', meaningVi: 'đặt, để', exampleEn: 'She put the file on the desk.' },
      { v1: 'set', v2: 'set', v3: 'set', meaningVi: 'thiết lập, đặt', exampleEn: 'They set new quarterly targets.' },
      { v1: 'hit', v2: 'hit', v3: 'hit', meaningVi: 'đạt được, đánh trúng', exampleEn: 'Sales hit a record high.' },
      { v1: 'spread', v2: 'spread', v3: 'spread', meaningVi: 'lan rộng, phổ biến', exampleEn: 'News spread quickly.' },
      { v1: 'broadcast', v2: 'broadcast', v3: 'broadcast', meaningVi: 'phát sóng', exampleEn: 'The speech was broadcast live.' },
    ]
  },
  {
    groupName: 'Nhóm 2: Quá khứ và Phân từ 2 giống nhau (V2 = V3)',
    pattern: 'V2 = V3 (đuôi -t / -d / -ought / -aught)',
    descriptionVi: 'V2 và V3 có cùng dạng, thường kết thúc bằng phụ âm -t, -d hoặc nguyên âm đổi.',
    verbs: [
      { v1: 'buy', v2: 'bought', v3: 'bought', meaningVi: 'mua', exampleEn: 'We bought new office computers.' },
      { v1: 'bring', v2: 'brought', v3: 'brought', meaningVi: 'mang lại, mang đến', exampleEn: 'The project brought high profits.' },
      { v1: 'teach', v2: 'taught', v3: 'taught', meaningVi: 'dạy, đào tạo', exampleEn: 'He taught the interns well.' },
      { v1: 'catch', v2: 'caught', v3: 'caught', meaningVi: 'bắt kịp, phát hiện', exampleEn: 'The audit caught several errors.' },
      { v1: 'build', v2: 'built', v3: 'built', meaningVi: 'xây dựng, phát triển', exampleEn: 'They built a loyal client base.' },
      { v1: 'send', v2: 'sent', v3: 'sent', meaningVi: 'gửi đi', exampleEn: 'The email was sent this morning.' },
      { v1: 'spend', v2: 'spent', v3: 'spent', meaningVi: 'chi tiêu, dành thời gian', exampleEn: 'She spent two hours on the report.' },
      { v1: 'lead', v2: 'led', v3: 'led', meaningVi: 'dẫn dắt, lãnh đạo', exampleEn: 'The CEO led the merger smoothly.' },
      { v1: 'find', v2: 'found', v3: 'found', meaningVi: 'tìm thấy, nhận thấy', exampleEn: 'They found the software intuitive.' },
      { v1: 'keep', v2: 'kept', v3: 'kept', meaningVi: 'giữ, duy trì', exampleEn: 'All records must be kept confidential.' },
    ]
  },
  {
    groupName: 'Nhóm 3: Đổi nguyên âm i -> a -> u (V1(i) -> V2(a) -> V3(u))',
    pattern: 'i -> a -> u',
    descriptionVi: 'Quy luật biến âm tuần hoàn trong tiếng Anh cổ.',
    verbs: [
      { v1: 'begin', v2: 'began', v3: 'begun', meaningVi: 'bắt đầu', exampleEn: 'The conference has begun.' },
      { v1: 'sing', v2: 'sang', v3: 'sung', meaningVi: 'hát', exampleEn: 'They sang the opening anthem.' },
      { v1: 'sink', v2: 'sank', v3: 'sunk', meaningVi: 'chìm, giảm sâu', exampleEn: 'Stock prices sank yesterday.' },
      { v1: 'drink', v2: 'drank', v3: 'drunk', meaningVi: 'uống', exampleEn: 'He drank some fresh water.' },
      { v1: 'swim', v2: 'swam', v3: 'swum', meaningVi: 'bơi', exampleEn: 'She has swum across the bay.' },
      { v1: 'ring', v2: 'rang', v3: 'rung', meaningVi: 'rung chuông, gọi điện', exampleEn: 'The telephone rang constantly.' },
    ]
  },
  {
    groupName: 'Nhóm 4: Phân từ 2 kết thúc bằng đuôi -en / -n (V3 tận cùng -en)',
    pattern: 'V3 = V1/V2 + (e)n',
    descriptionVi: 'Dạng V3 luôn có đuôi -en, xuất hiện rất nhiều trong câu bị động & thì hoàn thành.',
    verbs: [
      { v1: 'write', v2: 'wrote', v3: 'written', meaningVi: 'viết, soạn thảo', exampleEn: 'A formal letter was written.' },
      { v1: 'take', v2: 'took', v3: 'taken', meaningVi: 'cầm, nắm, thực hiện', exampleEn: 'Appropriate measures were taken.' },
      { v1: 'give', v2: 'gave', v3: 'given', meaningVi: 'đưa ra, cung cấp', exampleEn: 'Feedback was given promptly.' },
      { v1: 'break', v2: 'broke', v3: 'broken', meaningVi: 'làm vỡ, hỏng hóc', exampleEn: 'The printer is broken.' },
      { v1: 'choose', v2: 'chose', v3: 'chosen', meaningVi: 'lựa chọn', exampleEn: 'She was chosen as team lead.' },
      { v1: 'drive', v2: 'drove', v3: 'driven', meaningVi: 'lái xe, thúc đẩy', exampleEn: 'Technology has driven economic growth.' },
      { v1: 'speak', v2: 'spoke', v3: 'spoken', meaningVi: 'nói, phát biểu', exampleEn: 'English is spoken globally.' },
      { v1: 'see', v2: 'saw', v3: 'seen', meaningVi: 'nhìn thấy, chứng kiến', exampleEn: 'We have seen great improvements.' },
    ]
  }
];

export const ADJ_VERB_RULES_DATA: AdjVerbRule[] = [
  // 1. Adjective Suffixes
  {
    id: 'adj-suf',
    category: 'adj_suffixes',
    title: 'Hậu Tố Nhận Diện Tính Từ (Adjective Suffixes)',
    description: 'Tính từ thường được hình thành bằng cách thêm hậu tố đặc trưng vào sau Danh từ hoặc Động từ gốc.',
    badge: '100% Gặp Trong TOEIC',
    color: 'from-blue-600 to-indigo-600',
    formula: 'Noun / Verb + [ -ful, -less, -ive, -able, -al, -ous, -ic, -ent, -ant, -ish, -y ] = Adjective',
    items: [
      {
        label: 'Đuôi -ful (đầy tính chất) & -less (thiếu/không có)',
        rule: 'Thường ghép sau danh từ chỉ tính chất hoặc hành động.',
        examples: [
          'helpful (hữu ích) ≠ helpless (bất lực)',
          'careful (cẩn thận) ≠ careless (bất cẩn)',
          'painful (đau đớn) ≠ painless (không đau)',
          'successful (thành công)',
          'hopeless (vô vọng)'
        ],
        examTip: 'Đuôi -less mang nghĩa phủ định: "harmless" (vô hại), "countless" (vô số không đếm xuể).'
      },
      {
        label: 'Đuôi -ive & -able / -ible (có khả năng, có tính chất)',
        rule: 'Thường xuất phát từ động từ: create -> creative; afford -> affordable.',
        examples: [
          'creative (sáng tạo), productive (năng suất), attractive (hấp dẫn), competitive (cạnh tranh)',
          'affordable (vừa túi tiền), reliable (đáng tin cậy), flexible (linh hoạt), accessible (dễ tiếp cận)',
          'responsible (chịu trách nhiệm), eligible (đủ điều kiện)'
        ],
        examTip: '"affordable prices" (giá cả phải chăng), "eligible for promotion" (đủ điều kiện thăng chức) là cụm kinh điển trong Part 5!'
      },
      {
        label: 'Đuôi -al, -ous, -ic, -ent / -ant',
        rule: 'Chiếm tỷ lệ lớn trong từ vựng học thuật và thương mại.',
        examples: [
          '-al: professional (chuyên nghiệp), financial (tài chính), regional (khu vực), national (quốc gia)',
          '-ous: famous (nổi tiếng), continuous (liên tục), ambitious (hoài bão), dangerous (nguy hiểm)',
          '-ic: strategic (chiến lược), specific (cụ thể), realistic (thực tế)',
          '-ent / -ant: confident (tự tin), convenient (tiện lợi), significant (đáng kể), hesitant (do dự)'
        ]
      },
      {
        label: '⚠️ Bẫy đuôi -LY nhưng là TÍNH TỪ (Không phải Trạng từ!)',
        rule: 'Danh từ + -ly = TÍNH TỪ. Đứng trước danh từ hoặc sau Linking Verb như bình thường.',
        examples: [
          'friendly (thân thiện) - a friendly environment',
          'timely (kịp thời) - in a timely manner',
          'costly (đắt đỏ, tốn kém) - a costly mistake',
          'daily / weekly / monthly / yearly (hàng ngày/tuần/tháng/năm)',
          'orderly (ngăn nắp, trật tự) - an orderly fashion',
          'lovely (đáng yêu), lively (sống động)'
        ],
        examTip: 'Trong đề thi: "in a ______ manner" -> Cần điền TÍNH TỪ, đáp án đúng là "timely" (không phải là trạng từ)!'
      }
    ]
  },

  // 2. Adjective -ed vs -ing
  {
    id: 'adj-ed-ing',
    category: 'adj_ed_ing',
    title: 'Tính Từ Phân Từ: Đuôi -ED vs Đuôi -ING (Participle Adjectives)',
    description: 'Quy tắc vàng phân biệt tính từ đuôi -ed (cảm xúc tiếp nhận) và đuôi -ing (bản chất/gây ra cảm xúc).',
    badge: 'Bẫy Kinh Điển Part 5 & 6',
    color: 'from-amber-500 to-orange-600',
    formula: 'Chủ thể CẢM NHẬN cảm xúc -> V-ed | Sự vật/người BẢN CHẤT gây ra cảm xúc -> V-ing',
    items: [
      {
        label: 'Tính từ đuôi -ED: Cảm xúc, trạng thái tiếp nhận tác động',
        rule: 'Dùng khi chủ thể (thường là con người) trải nghiệm, bị tác động hoặc cảm thấy thế nào.',
        examples: [
          'The manager was satisfied with our quarterly report. (Vị giám đốc cảm thấy hài lòng)',
          'I am interested in learning AI technology. (Tôi cảm thấy thích thú/hứng thú)',
          'The employees were exhausted after the presentation. (Các nhân viên cảm thấy kiệt sức)',
          'He felt disappointed by the project delay. (Anh ấy cảm thấy thất vọng)'
        ],
        note: 'Cấu trúc thường gặp: be + interested in, satisfied with, surprised at/by, bored with, worried about...'
      },
      {
        label: 'Tính từ đuôi -ING: Bản chất, đặc điểm gây ra cảm xúc hoặc tính chất chủ động',
        rule: 'Dùng để mô tả tính chất của đồ vật, sự việc hoặc con người tạo ra tác động/cảm xúc đó cho người khác.',
        examples: [
          'This is an interesting marketing strategy. (Đây là một chiến lược marketing thú vị - bản chất cuốn hút)',
          'Working 14 hours a day is exhausting. (Làm việc 14 tiếng/ngày là việc làm kiệt sức - tính chất gây kiệt sức)',
          'Our company faces demanding clients. (Công ty chúng tôi đối mặt với những khách hàng khó tính/đòi hỏi cao)',
          'The product launch was a surprising success. (Đợt ra mắt là một thành công đáng kinh ngạc)'
        ]
      },
      {
        label: 'Cặp từ dễ nhầm lẫn trong môi trường doanh nghiệp',
        rule: 'Phân biệt theo ngữ cảnh danh từ đứng sau hoặc chủ ngữ:',
        examples: [
          'an overwhelming workload (khối lượng việc gây ngợp) vs overwhelmed workers (công nhân bị ngợp)',
          'a rewarding experience (trải nghiệm bổ ích) vs satisfied customers (khách hàng hài lòng)',
          'challenging tasks (nhiệm vụ đầy thách thức) vs challenged team (đội ngũ gặp thử thách)',
          'convincing evidence (bằng chứng thuyết phục) vs convinced investors (nhà đầu tư đã bị thuyết phục)'
        ]
      }
    ]
  },

  // 3. Adjective OSASCOMP Order
  {
    id: 'adj-osascomp',
    category: 'adj_osascomp',
    title: 'Trật Tự Tính Từ Đứng Trước Danh Từ (Quy Tắc O-S-A-S-C-O-M-P)',
    description: 'Khi có từ 2 tính từ trở lên cùng bổ nghĩa cho một Danh từ, chúng phải tuân theo đúng trật tự chuẩn quốc tế.',
    badge: 'Quy Tắc Vàng OSASCOMP',
    color: 'from-purple-600 to-indigo-600',
    formula: 'Opinion -> Size -> Age -> Shape -> Color -> Origin -> Material -> Purpose + NOUN',
    items: [
      {
        label: 'Giải mã từng chữ cái trong OSASCOMP',
        rule: 'Ghi nhớ thứ tự từ ngoài vào trong sát danh từ chính:',
        examples: [
          '1. [O]pinion (Ý kiến, đánh giá): beautiful, wonderful, elegant, delicious, ugly, useful',
          '2. [S]ize (Kích thước): big, small, large, huge, tiny, tall, short',
          '3. [A]ge (Độ tuổi, độ mới/cũ): old, new, modern, ancient, young',
          '4. [S]hape (Hình dạng): round, square, rectangular, oval, triangular',
          '5. [C]olor (Màu sắc): red, blue, green, black, white, golden',
          '6. [O]rigin (Xuất xứ, nguồn gốc): Vietnamese, Japanese, European, American',
          '7. [M]aterial (Chất liệu): leather, wooden, plastic, cotton, silk, metal',
          '8. [P]urpose (Mục đích sử dụng): sleeping (bag), conference (room), running (shoes)'
        ]
      },
      {
        label: 'Ví dụ ghép câu hoàn chỉnh',
        rule: 'Áp dụng trật tự ghép:',
        examples: [
          'a luxurious (O) big (S) modern (A) European (O) leather (M) executive (P) chair',
          'a lovely (O) small (S) round (S) wooden (M) coffee (P) table',
          'an elegant (O) new (A) Italian (O) silk (M) wedding (P) suit'
        ],
        examTip: 'Đề thi thường chỉ cho 2-3 tính từ, bạn chỉ cần nhớ: [Đánh giá chung (Opinion)] luôn đứng trước [Chất liệu (Material)] và [Xuất xứ (Origin)]!'
      }
    ]
  },

  // 4. Adjective Comparisons
  {
    id: 'adj-comp',
    category: 'adj_comparison',
    title: 'Cấp So Sánh Của Tính Từ (Equal, Comparative, Superlative)',
    description: 'Toàn bộ quy tắc tính từ ngắn, tính từ dài, so sánh bằng, so sánh hơn, so sánh nhất và các trường hợp bất quy tắc.',
    badge: 'So Sánh & Biến Đổi',
    color: 'from-teal-600 to-emerald-600',
    formula: 'So sánh hơn: Adj-er than / More Adj than | So sánh nhất: The Adj-est / The most Adj',
    items: [
      {
        label: 'Tính từ ngắn (1 âm tiết, hoặc 2 âm tiết đuôi -y, -le, -er, -ow)',
        rule: 'Thêm đuôi -er (so sánh hơn) và the + -est (so sánh nhất). Nếu tận cùng là -y đổi thành -ier / -iest.',
        examples: [
          'fast -> faster than -> the fastest',
          'simple -> simpler than -> the simplest',
          'happy -> happier than -> the happiest',
          'narrow -> narrower than -> the narrowest',
          'big -> bigger than -> the biggest (gấp đôi phụ âm cuối)'
        ]
      },
      {
        label: 'Tính từ dài (2 âm tiết trở lên)',
        rule: 'Dùng more / less + Adj (so sánh hơn) và the most / the least + Adj (so sánh nhất).',
        examples: [
          'expensive -> more expensive than -> the most expensive',
          'efficient -> more efficient than -> the most efficient',
          'complicated -> less complicated than -> the least complicated'
        ]
      },
      {
        label: 'Bảng Tính Từ Bất Quy Tắc (Bắt buộc học thuộc)',
        rule: 'Không theo quy tắc thêm đuôi -er hay -est:',
        examples: [
          'good / well -> BETTER than -> the BEST',
          'bad / badly -> WORSE than -> the WORST',
          'far -> FARTHER (khoảng cách) / FURTHER (mức độ sâu xa) -> the FARTHEST / FURTHEST',
          'little -> LESS than -> the LEAST',
          'many / much -> MORE than -> the MOST'
        ],
        examTip: 'Cụm thi TOEIC: "For further information, please contact..." (Để biết thêm thông tin chi tiết...).'
      }
    ]
  },

  // 5. Verb Suffixes & Prefixes
  {
    id: 'verb-suf',
    category: 'verb_suffixes',
    title: 'Hậu Tố & Tiền Tố Nhận Diện Động Từ (Verb Suffixes & Prefixes)',
    description: 'Cách nhận biết ngay một từ là Động từ trong câu dựa vào các đuôi hoặc tiền tố đặc trưng.',
    badge: 'Nhận Diện Động Từ',
    color: 'from-rose-600 to-pink-600',
    formula: 'Noun / Adj + [ -ize, -ate, -en, -ify ] HOẶC [ en- / em- ] + Noun/Adj = Verb',
    items: [
      {
        label: 'Đuôi -ize / -ise & -ate (làm cho trở nên, thực hiện)',
        rule: 'Biến danh từ/tính từ thành hành động có định hướng.',
        examples: [
          '-ize/-ise: optimize (tối ưu hóa), prioritize (ưu tiên), modernize (hiện đại hóa), finalize (hoàn tất), customize (tùy biến)',
          '-ate: activate (kích hoạt), motivate (tạo động lực), communicate (giao tiếp), evaluate (đánh giá), generate (tạo ra)'
        ]
      },
      {
        label: 'Đuôi -en & -ify (làm tăng thêm, biến thành)',
        rule: 'Thường ghép sau tính từ chỉ kích thước/tính chất:',
        examples: [
          '-en: widen (mở rộng), shorten (rút ngắn), strengthen (tăng cường), brighten (làm sáng), darken (làm tối)',
          '-ify: simplify (đơn giản hóa), identify (nhận diện), modify (sửa đổi), notify (thông báo), verify (xác thực)'
        ]
      },
      {
        label: 'Tiền tố en- / em- đứng trước',
        rule: 'Đặt trước danh từ hoặc tính từ để tạo thành động từ mang nghĩa "trao quyền/làm cho có":',
        examples: [
          'enable (cho phép, kích hoạt) - from able',
          'enrich (làm giàu, phong phú thêm) - from rich',
          'empower (trao quyền) - from power',
          'enforce (thực thi) - from force',
          'encourage (khuyến khích) - from courage'
        ]
      }
    ]
  },

  // 6. Subject-Verb Agreement Rules
  {
    id: 'verb-sv-agree',
    category: 'verb_sv_agreement',
    title: 'Quy Tắc Hòa Hợp Chủ Ngữ & Động Từ (Subject-Verb Agreement)',
    description: 'Chủ ngữ số ít đi với động từ số ít; Chủ ngữ số nhiều đi với động từ số nhiều, cùng các trường hợp bẫy đặc biệt.',
    badge: 'Chiếm 30% Đề Thi Ngữ Pháp',
    color: 'from-red-600 to-orange-600',
    formula: 'Singular S -> V-s/es / is / was / has | Plural S -> V-bare / are / were / have',
    items: [
      {
        label: 'Quy tắc cơ bản & Quy tắc thêm -s/-es',
        rule: 'Với động từ chia ở Hiện tại đơn ngôi thứ 3 số ít:',
        examples: [
          'Tận cùng là -o, -s, -x, -ch, -sh, -z -> thêm -es: passes, watches, fixes, goes, washes',
          'Phụ âm + y -> đổi y thành -ies: study -> studies, fly -> flies, apply -> applies',
          'Nguyên âm (u, e, o, a, i) + y -> giữ nguyên y thêm -s: plays, enjoys, buys',
          'Chủ ngữ là V-ing hoặc To-V -> LUÔN chia động từ SỐ ÍT: "Upgrading the servers REQUIRES downtime."'
        ]
      },
      {
        label: 'A number of vs The number of (Bẫy kinh điển)',
        rule: 'Hai cấu trúc đi cùng danh từ số nhiều nhưng chia động từ hoàn toàn trái ngược:',
        examples: [
          'A number of + N(số nhiều) + V(SỐ NHIỀU) -> Mang nghĩa "Nhiều/Một số": "A number of applicants HAVE submitted their CVs."',
          'The number of + N(số nhiều) + V(SỐ ÍT) -> Mang nghĩa "Số lượng của...": "The number of attendees HAS increased significantly."'
        ],
        examTip: 'Mẹo nhớ: "A" = Nhiều (chia số nhiều) | "The" = Một con số xác định (chia số ít)!'
      },
      {
        label: 'Chủ ngữ nối bằng cụm từ xen giữa (Chủ ngữ giả / Modifier)',
        rule: 'Động từ chỉ chia theo Danh từ chính đứng đầu, BỎ QUA toàn bộ cụm xen giữa:',
        examples: [
          'S1 + along with / together with / as well as / accompanied by + S2 -> Chia theo S1',
          'Ví dụ: "The CEO, along with his five assistants, IS attending the summit." (Chia theo CEO)',
          'Either S1 or S2 / Neither S1 nor S2 / Not only S1 but also S2 -> Chia theo CHỦ NGỮ GẦN ĐỘNG TỪ NHẤT (S2)',
          'Ví dụ: "Neither the director nor the employees WERE aware of the policy change." (Chia theo employees)'
        ]
      }
    ]
  },

  // 7. Verb Patterns: To-V, V-ing, Bare V
  {
    id: 'verb-patterns',
    category: 'verb_patterns',
    title: 'Dạng Động Từ Sau Động Từ: To-V, V-ing hay V nguyên mẫu?',
    description: 'Bảng phân loại toàn bộ các động từ bắt buộc đi với To-Infinitive, Gerund (V-ing), Bare-Infinitive và các từ đổi nghĩa.',
    badge: 'Cấu Trúc Động Từ Part 5',
    color: 'from-violet-600 to-purple-700',
    formula: 'V1 + TO-V | V1 + V-ING | V1 + O + BARE V',
    items: [
      {
        label: 'Nhóm 1: Động từ theo sau là TO-V (Kế hoạch, mong muốn, quyết định tương lai)',
        rule: 'Diễn tả ý định, sự sẵn sàng hoặc cam kết làm gì đó trong tương lai.',
        examples: [
          'decide to V (quyết định), plan to V (lên kế hoạch), agree to V (đồng ý)',
          'hope / expect to V (hy vọng/kỳ vọng), promise to V (hứa), offer to V (đề nghị)',
          'refuse to V (từ chối), afford to V (có đủ khả năng chi trả), manage to V (xoay xở để)',
          'hesitate to V (do dự), tend to V (có xu hướng), attempt to V (nỗ lực)'
        ],
        examTip: '"Do not hesitate to contact us" (Đừng ngần ngại liên hệ chúng tôi) - Cụm xuất hiện 99% trong email TOEIC!'
      },
      {
        label: 'Nhóm 2: Động từ theo sau là V-ING (Gerund - Thói quen, trải nghiệm, việc đã/đang diễn ra)',
        rule: 'Các hành động liên quan đến việc thưởng thức, hoàn thành, trì hoãn hoặc né tránh.',
        examples: [
          'enjoy V-ing (thích thú), avoid V-ing (tránh né), finish V-ing (hoàn tất)',
          'consider V-ing (cân nhắc), suggest / recommend V-ing (đề xuất/gợi ý)',
          'postpone / delay V-ing (trì hoãn), mind V-ing (phiền lòng), practice V-ing (luyện tập)',
          'admit V-ing (thừa nhận), deny V-ing (phủ nhận), look forward to V-ing (trông đợi)'
        ]
      },
      {
        label: 'Nhóm 3: Động từ Sai Khiến & Giác Quan + O + BARE V (V nguyên mẫu không to)',
        rule: 'Bắt buộc dùng V nguyên thể không "to" sau Make, Let, Have và Help (có thể dùng to-V hoặc bare):',
        examples: [
          'make + O + V (bắt buộc ai làm gì): "The manager made the staff revise the draft."',
          'let + O + V (cho phép ai làm gì): "Please let me know your decision."',
          'have + O + V (nhờ/thuê ai làm gì): "We had the technician inspect the system."',
          'help + O + (to) V (giúp ai làm gì): "The workshop helped participants improve their skills."'
        ]
      },
      {
        label: 'Nhóm 4: Động từ đổi nghĩa khi đi với To-V vs V-ing',
        rule: 'Nghĩa thay đổi hoàn toàn tùy thuộc vào dạng động từ phía sau:',
        examples: [
          'remember / forget + TO V: Nhớ/quên PHẢI LÀM GÌ (chưa làm) -> "Remember to lock the door."',
          'remember / forget + V-ING: Nhớ/quên ĐÃ LÀM GÌ TRONG QUÁ KHỨ -> "I remember locking the door."',
          'stop + TO V: Dừng lại ĐỂ LÀM MỘT VIỆC KHÁC -> "He stopped to answer the phone."',
          'stop + V-ING: DỪNG HẲN HÀNH ĐỘNG ĐANG LÀM -> "He stopped smoking last year."',
          'try + TO V: CỐ GẮNG làm gì -> "She tried to meet the deadline."',
          'try + V-ING: THỬ NGHIỆM làm gì -> "Try restarting your computer."'
        ]
      }
    ]
  },

  // 8. Passive & Reduced Relative Clauses
  {
    id: 'verb-passive-reduced',
    category: 'verb_passive_reduced',
    title: 'Câu Bị Động & Rút Gọn Mệnh Đề Quan Hệ (Participle Clauses)',
    description: 'Chủ động dùng V-ing; Bị động dùng V3/ed. Cách làm bài rút gọn mệnh đề trong vòng 3 giây.',
    badge: 'Điểm 800+ TOEIC',
    color: 'from-emerald-600 to-teal-700',
    formula: 'Chủ động rút gọn: N + V-ING + O | Bị động rút gọn: N + V3/ED + (by O / Giới từ)',
    items: [
      {
        label: 'Rút gọn Mệnh đề quan hệ CHỦ ĐỘNG -> Dùng V-ING',
        rule: 'Khi danh từ thực hiện hành động, lược bỏ đại từ quan hệ và to be, chuyển V thành V-ing:',
        examples: [
          'Câu gốc: The staff who are working on the project need extra time.',
          'Rút gọn: The staff WORKING on the project need extra time.',
          'Dấu hiệu: Phía sau chỗ trống CÓ TÂN NGỮ (Danh từ nhận tác động) -> Chọn V-ing!'
        ]
      },
      {
        label: 'Rút gọn Mệnh đề quan hệ BỊ ĐỘNG -> Dùng V3/ED',
        rule: 'Khi danh từ nhận tác động, lược bỏ đại từ quan hệ và to be, giữ lại V3/ed:',
        examples: [
          'Câu gốc: All products that are manufactured in this facility undergo strict testing.',
          'Rút gọn: All products MANUFACTURED in this facility undergo strict testing.',
          'Dấu hiệu: Phía sau chỗ trống KHÔNG CÓ TÂN NGỮ, thường đi liền với giới từ (by, in, at, with...) -> Chọn V3/ed!'
        ],
        examTip: 'Công thức 3 giây: Nếu phía sau chỗ trống là GIỚI TỪ (in, by, for, under) -> 95% chọn V3/ed!'
      }
    ]
  }
];
