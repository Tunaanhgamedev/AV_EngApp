import { Headphones, BookOpen, PenTool, Mic2 } from 'lucide-react';

export interface IeltsSkillConfig {
  id: string;
  title: string;
  titleVi: string;
  icon: any;
  color: string;
  shadow: string;
  bgLight: string;
  borderLight: string;
  textColor: string;
  duration: string;
  sections: number;
  questions: number;
  description: string;
  formats: string[];
  tips: string[];
}

export const IELTS_SKILLS: IeltsSkillConfig[] = [
  {
    id: 'listening',
    title: 'Listening',
    titleVi: 'Nghe hiểu',
    icon: Headphones,
    color: 'from-blue-600 to-indigo-500',
    shadow: 'shadow-blue-500/25',
    bgLight: 'from-blue-50 to-indigo-50',
    borderLight: 'border-blue-200',
    textColor: 'text-blue-600',
    duration: '30 phút',
    sections: 4,
    questions: 40,
    description: '4 phần nghe với độ khó tăng dần: hội thoại, độc thoại, thảo luận học thuật.',
    formats: ['Multiple Choice', 'Matching', 'Map/Diagram Labelling', 'Sentence Completion', 'Note Completion'],
    tips: [
      'Đọc câu hỏi trước khi nghe',
      'Chú ý các từ đồng nghĩa (paraphrasing)',
      'Viết chính tả đúng — lỗi chính tả sẽ bị trừ điểm'
    ]
  },
  {
    id: 'reading',
    title: 'Reading',
    titleVi: 'Đọc hiểu',
    icon: BookOpen,
    color: 'from-emerald-600 to-teal-500',
    shadow: 'shadow-emerald-500/25',
    bgLight: 'from-emerald-50 to-teal-50',
    borderLight: 'border-emerald-200',
    textColor: 'text-emerald-600',
    duration: '60 phút',
    sections: 3,
    questions: 40,
    description: '3 đoạn văn học thuật dài với các dạng câu hỏi đa dạng. Yêu cầu kĩ năng skim & scan.',
    formats: ['True/False/Not Given', 'Yes/No/Not Given', 'Matching Headings', 'Summary Completion', 'Multiple Choice'],
    tips: [
      'Skim toàn bộ bài đọc trong 2-3 phút đầu',
      'Quản lý thời gian: ~20 phút/đoạn',
      'True/False/Not Given: phân biệt rõ "False" và "Not Given"'
    ]
  },
  {
    id: 'writing',
    title: 'Writing',
    titleVi: 'Viết',
    icon: PenTool,
    color: 'from-amber-500 to-orange-500',
    shadow: 'shadow-amber-500/25',
    bgLight: 'from-amber-50 to-orange-50',
    borderLight: 'border-amber-200',
    textColor: 'text-amber-600',
    duration: '60 phút',
    sections: 2,
    questions: 2,
    description: 'Task 1: Mô tả biểu đồ/quy trình (150+ từ). Task 2: Viết luận (250+ từ).',
    formats: ['Task 1: Bar/Line/Pie Chart', 'Task 1: Table/Map/Process', 'Task 2: Opinion Essay', 'Task 2: Discussion Essay', 'Task 2: Problem/Solution'],
    tips: [
      'Task 2 chiếm 2/3 điểm Writing — dành 40 phút',
      'Dùng cấu trúc 4 đoạn: Intro → Body 1 → Body 2 → Conclusion',
      'Paraphrase đề bài trong Introduction — không copy nguyên văn'
    ]
  },
  {
    id: 'speaking',
    title: 'Speaking',
    titleVi: 'Nói',
    icon: Mic2,
    color: 'from-rose-500 to-pink-500',
    shadow: 'shadow-rose-500/25',
    bgLight: 'from-rose-50 to-pink-50',
    borderLight: 'border-rose-200',
    textColor: 'text-rose-600',
    duration: '11-14 phút',
    sections: 3,
    questions: 3,
    description: 'Part 1: Phỏng vấn. Part 2: Cue Card (nói 2 phút). Part 3: Thảo luận chuyên sâu.',
    formats: ['Part 1: Familiar Topics', 'Part 2: Individual Long Turn', 'Part 3: Two-way Discussion'],
    tips: [
      'Mở rộng câu trả lời — không trả lời Yes/No đơn giản',
      'Dùng Fillers tự nhiên: "Well...", "To be honest..."',
      'Part 2: Ghi chú nhanh trong 1 phút chuẩn bị'
    ]
  }
];

export const BAND_DESCRIPTORS = [
  { band: 9, label: 'Expert', color: 'bg-emerald-500' },
  { band: 8, label: 'Very Good', color: 'bg-emerald-400' },
  { band: 7, label: 'Good', color: 'bg-blue-500' },
  { band: 6.5, label: 'Competent+', color: 'bg-blue-400' },
  { band: 6, label: 'Competent', color: 'bg-amber-500' },
  { band: 5.5, label: 'Modest+', color: 'bg-amber-400' },
  { band: 5, label: 'Modest', color: 'bg-orange-500' },
];

export const INTEGRATED_PLATFORMS = [
  {
    id: 'study4',
    name: 'STUDY4',
    url: 'https://study4.com',
    accentColor: 'from-blue-600 to-cyan-500',
    title: 'STUDY4 — Đề thi Cambridge & Nghe chép chính tả',
    description: 'Nền tảng thi thử Cambridge IELTS, luyện nghe chép chính tả (dictation) và quản lý từ vựng thông minh bằng thẻ ghi nhớ (Flashcards).',
    features: [
      'Đầy đủ đề thi CamBridge IELTS 10 - 18 có chấm điểm',
      'Công cụ nghe chép chính tả thông minh theo từng câu',
      'Học từ vựng qua flashcard dạng Spaced Repetition'
    ],
    links: [
      { label: 'Thư viện đề thi IELTS', url: 'https://study4.com/tests/ielts/' },
      { label: 'Luyện nghe chép chính tả', url: 'https://study4.com/dictation/' },
      { label: 'Kho từ vựng IELTS chuyên sâu', url: 'https://study4.com/flashcard/' }
    ]
  },
  {
    id: 'ieltsonlinetests',
    name: 'IELTS Online Tests',
    url: 'https://ieltsonlinetests.com',
    accentColor: 'from-red-600 to-orange-500',
    title: 'IELTS Online Tests — Thử thách phòng thi thực tế',
    description: 'Kho lưu trữ đề thi IELTS Academic & General khổng lồ mô phỏng chân thực hệ thống thi IELTS trên máy tính (Computer-delivered IELTS).',
    features: [
      'Hơn 100+ đề thi IELTS sát đề thi thật nhất',
      'Tính năng canh giờ chuẩn xác từng giây',
      'Báo cáo phân tích chi tiết kỹ năng yếu sau khi thi'
    ],
    links: [
      { label: 'Thư viện đề thi Mock Test', url: 'https://ieltsonlinetests.com/ielts-exam-library' },
      { label: 'Chiến thuật làm bài đạt Band cao', url: 'https://ieltsonlinetests.com/ielts-tips-and-tricks' },
      { label: 'Kiểm tra trình độ nhanh (15p)', url: 'https://ieltsonlinetests.com/ielts-skills-test' }
    ]
  },
  {
    id: 'dailydictation',
    name: 'Daily Dictation',
    url: 'https://dailydictation.com',
    accentColor: 'from-amber-600 to-yellow-500',
    title: 'Daily Dictation — Luyện phản xạ tai nghe viết chính tả',
    description: 'Phương pháp nghe chép chính tả chuyên sâu giúp bạn tăng khả năng nghe hiểu, nghe bắt từ khóa (key words) và nắm bắt ngữ điệu tự nhiên.',
    features: [
      'Các bài nghe ngắn từ 1-3 phút chia theo cấp độ',
      'Hệ thống tự động chấm điểm và chỉ ra từ viết sai',
      'Tập trung phát hiện lỗi âm đuôi (ending sounds)'
    ],
    links: [
      { label: 'Luyện nghe chép chính tả', url: 'https://dailydictation.com' },
      { label: 'Chủ đề IELTS Listening luyện tập', url: 'https://dailydictation.com/topics' }
    ]
  },
  {
    id: 'youpass',
    name: 'YouPass',
    url: 'https://youpass.vn',
    accentColor: 'from-violet-600 to-purple-500',
    title: 'YouPass — Tự học từ vựng IELTS theo ngữ cảnh',
    description: 'Nền tảng hỗ trợ dịch thuật, học từ vựng IELTS theo ngữ cảnh thực tế của bài báo tiếng Anh, tích hợp ghi nhớ từ vựng hiệu quả.',
    features: [
      'Tra từ vựng song ngữ trong ngữ cảnh chuyên ngành',
      'Tự tạo danh sách từ vựng cá nhân ôn tập',
      'Đồng bộ hóa tiến trình ôn luyện hàng ngày'
    ],
    links: [
      { label: 'Trang chủ YouPass', url: 'https://youpass.vn' }
    ]
  },
  {
    id: 'vstep',
    name: 'VSTEP Fastreak',
    url: 'https://vstep.fastreak.com',
    accentColor: 'from-emerald-600 to-green-500',
    title: 'VSTEP Fastreak — Chứng chỉ tiếng Anh 6 bậc VSTEP',
    description: 'Hệ thống luyện thi chứng chỉ VSTEP của Bộ Giáo dục & Đào tạo Việt Nam, hỗ trợ quy đổi tương đương năng lực sang IELTS B1/B2/C1.',
    features: [
      'Đề thi thử VSTEP đầy đủ 4 kỹ năng chuẩn định dạng',
      'Bài thi VSTEP Reading & Listening tự động trả điểm',
      'Bảng quy đổi điểm tương đương từ IELTS sang VSTEP'
    ],
    links: [
      { label: 'Thi thử VSTEP Online', url: 'https://vstep.fastreak.com' },
      { label: 'Cấu trúc bài thi VSTEP chi tiết', url: 'https://vstep.fastreak.com' }
    ]
  }
];

export const KNOWLEDGE_DATA = {
  methods: [
    {
      id: 'method-dictation',
      title: 'Phương pháp Nghe chép chính tả (Dictation)',
      source: 'DailyDictation & STUDY4',
      icon: '🎧',
      content: 'Phương pháp tối ưu để rèn luyện phản xạ nghe chi tiết và chỉnh sửa lỗi phát âm âm cuối (ending sounds).',
      steps: [
        'Chọn một đoạn audio ngắn (1-3 phút) phù hợp với trình độ.',
        'Nghe và viết lại toàn bộ những gì nghe được (chấp nhận tua/dừng liên tục).',
        'Đối chiếu với Transcript để phát hiện các lỗi sai (mạo từ, số nhiều -s/-es, quá khứ -ed).',
        'Nghe lại đoạn audio mà không nhìn transcript, tập trung vào những từ viết sai.'
      ],
      tip: 'Chìa khóa là sự kiên trì. Chỉ cần 15-30 phút hàng ngày sẽ cải thiện rõ rệt khả năng nghe bắt từ khóa của bạn.'
    },
    {
      id: 'method-context-vocab',
      title: 'Tích lũy từ vựng theo ngữ cảnh (Contextual Vocabulary)',
      source: 'YouPass & STUDY4',
      icon: '💡',
      content: 'Học từ vựng trong văn cảnh thực tế giúp người học ghi nhớ lâu hơn gấp 3 lần so với việc học từ riêng lẻ.',
      steps: [
        'Đọc các bài báo tiếng Anh (BBC, CNN, Economist) hoặc các đoạn văn IELTS Reading.',
        'Tra nghĩa từ vựng song ngữ trong ngữ cảnh chính xác của câu văn.',
        'Trích xuất các câu chứa từ mới đó sang thẻ Flashcard ôn tập (Active Recall).',
        'Ôn tập lại theo chu kỳ lặp lại ngắt quãng (Spaced Repetition) định kỳ.'
      ],
      tip: 'Không bao giờ học từ vựng đơn lẻ, luôn ghi kèm ít nhất 1 câu ví dụ thực tế chứa từ đó.'
    },
    {
      id: 'method-skimming-scanning',
      title: 'Kỹ thuật Skimming & Scanning trong Reading',
      source: 'IELTS Online Tests',
      icon: '📖',
      content: 'Phương pháp tăng tốc độ đọc và định vị thông tin nhanh chóng để hoàn thành 40 câu hỏi trong 60 phút.',
      steps: [
        'Skimming: Đọc lướt tiêu đề, các câu đầu/cuối của đoạn để nắm được ý chính (Main Idea).',
        'Scanning: Tìm các từ khóa đặc biệt như tên riêng, số liệu, năm học, thuật ngữ để khoanh vùng đáp án.',
        'Paraphrase Matching: Đối chiếu từ khóa câu hỏi với từ đồng nghĩa xuất hiện trong đoạn văn.'
      ],
      tip: 'Tránh việc cố gắng dịch hiểu hết từng từ. Bài đọc IELTS được thiết kế dài với nhiều thuật ngữ học thuật không cần thiết.'
    }
  ],
  materials: [
    {
      category: 'Tài liệu Luyện Đề Cambridge',
      source: 'STUDY4 & IELTS Online Tests',
      icon: '📚',
      items: [
        { name: 'Cambridge IELTS 15 - 18 (Full Tests)', desc: 'Bộ đề thi sát thực tế nhất hiện nay, dùng để làm đề thật dưới áp lực thời gian.', link: 'https://study4.com/tests/ielts/' },
        { name: 'IELTS Simulation Exams (Actual Tests)', desc: 'Kho đề thi thật các tháng được cập nhật liên tục kèm lời giải chi tiết của cộng đồng.', link: 'https://ieltsonlinetests.com/ielts-exam-library' }
      ]
    },
    {
      category: 'Tài liệu Luyện Kỹ Năng Nghe & Nói',
      source: 'DailyDictation & IELTS Online Tests',
      icon: '🎙️',
      items: [
        { name: 'Daily Dictation Short Audio Topics', desc: 'Thư viện bài nghe ngắn chia theo chủ đề: Đời sống, Công việc, Khoa học.', link: 'https://dailydictation.com/topics' },
        { name: 'IELTS Speaking Examiner Samples', desc: 'Các video mô phỏng phòng thi Nói thật với giáo viên bản xứ kèm thang điểm và nhận xét.', link: 'https://ieltsonlinetests.com/' }
      ]
    },
    {
      category: 'Từ vựng & Chuyển đổi Chứng chỉ',
      source: 'YouPass & VSTEP Fastreak',
      icon: '🎖️',
      items: [
        { name: 'Chủ đề từ vựng IELTS chuyên sâu', desc: 'Danh sách từ vựng phân loại theo chủ đề phổ biến: Environment, Education, Technology.', link: 'https://youpass.vn' },
        { name: 'Đề thi mẫu VSTEP 6 bậc (B1/B2/C1)', desc: 'Kho đề luyện thi chứng chỉ năng lực ngoại ngữ Việt Nam dành cho học sinh, sinh viên.', link: 'https://vstep.fastreak.com' }
      ]
    }
  ],
  criteria: [
    {
      skill: 'IELTS Writing Task 2 (Viết luận)',
      icon: '✍️',
      rules: [
        { name: 'Task Response (Đáp ứng yêu cầu đề)', desc: 'Trả lời đầy đủ các phần của câu hỏi, trình bày một quan điểm rõ ràng và nhất quán xuyên suốt bài viết.' },
        { name: 'Coherence & Cohesion (Tính mạch lạc)', desc: 'Sắp xếp ý kiến một cách logic, sử dụng các từ nối hiệu quả, chia đoạn văn hợp lý.' },
        { name: 'Lexical Resource (Vốn từ vựng)', desc: 'Sử dụng từ vựng đa dạng, chính xác ngữ cảnh, dùng được các cụm từ cố định (collocations) tự nhiên.' },
        { name: 'Grammatical Range & Accuracy (Ngữ pháp)', desc: 'Sử dụng kết hợp các câu đơn và câu phức cấu trúc chuẩn, tránh lỗi sai về chia thì và dấu câu.' }
      ]
    },
    {
      skill: 'IELTS Speaking (Thi nói)',
      icon: '🗣️',
      rules: [
        { name: 'Fluency & Coherence (Sự trôi chảy)', desc: 'Nói tự nhiên, không ngập ngừng quá lâu, mở rộng câu trả lời đầy đủ ý và có liên kết tốt.' },
        { name: 'Lexical Resource (Từ vựng nói)', desc: 'Diễn đạt ý linh hoạt bằng cách sử dụng các từ đồng nghĩa, thành ngữ phù hợp chủ đề.' },
        { name: 'Grammatical Range & Accuracy (Ngữ pháp nói)', desc: 'Sử dụng đa dạng các cấu trúc câu mà không gặp nhiều lỗi ngữ pháp cản trước giao tiếp.' },
        { name: 'Pronunciation (Phát âm)', desc: 'Phát âm rõ ràng các âm tiết, có ngữ điệu tự nhiên, biết nhấn trọng âm từ và trọng âm câu.' }
      ]
    }
  ],
  vstep: {
    comparison: [
      { ielts: 'IELTS 4.0 - 4.5', vstep: 'VSTEP B1 (Bậc 3)', desc: 'Đủ điều kiện tốt nghiệp Đại học/Chuẩn đầu vào Cao học.', color: 'border-l-blue-500' },
      { ielts: 'IELTS 5.0 - 6.0', vstep: 'VSTEP B2 (Bậc 4)', desc: 'Đầu ra thạc sĩ, điều kiện xét tuyển giảng viên/du học nước ngoài.', color: 'border-l-indigo-500' },
      { ielts: 'IELTS 6.5 - 7.5', vstep: 'VSTEP C1 (Bậc 5)', desc: 'Đạt năng lực tiếng Anh nâng cao, giảng dạy chuyên ngành tiếng Anh.', color: 'border-l-violet-500' },
      { ielts: 'IELTS 8.0 - 9.0', vstep: 'VSTEP C2 (Bậc 6)', desc: 'Năng lực tương đương người bản xứ chuyên nghiệp.', color: 'border-l-emerald-500' }
    ],
    synergy: [
      'Bài thi VSTEP có định dạng tương đồng với IELTS về phần Listening (Trắc nghiệm) và Reading (Chọn đáp án trắc nghiệm đoạn văn).',
      'Phần Writing VSTEP gồm Viết thư (Task 1) và Viết luận (Task 2) giống IELTS Writing Task 2.',
      'Luyện thi IELTS ở mức 5.5 - 6.0 sẽ giúp bạn dễ dàng thi đạt chứng chỉ VSTEP B2 hoặc C1.'
    ]
  }
};

export const ENGLISH_PRACTICE_DB = {
  dictation: [
    {
      id: 'dict-1',
      title: 'Bài 1: Climate Change (Easy)',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      transcript: 'Climate change is one of the most pressing challenges of our time. Rising temperatures are causing glaciers to melt and sea levels to rise.',
      difficulty: 'Dễ'
    },
    {
      id: 'dict-2',
      title: 'Bài 2: Modern Technology (Medium)',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      transcript: 'Artificial intelligence has revolutionized various industries. Automation is changing the job market and requiring workers to acquire new digital skills.',
      difficulty: 'Trung bình'
    },
    {
      id: 'dict-3',
      title: 'Bài 3: Academic Life (Hard)',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      transcript: 'Pursuing higher education offers individuals opportunities to delve deep into specialized fields, collaborate with researchers, and enhance critical thinking capacity.',
      difficulty: 'Khó'
    }
  ],
  vocab: [
    {
      phrase: 'Play a pivotal role in',
      type: 'Collocation (C1/C2)',
      meaning: 'Đóng vai trò then chốt / quyết định trong việc gì',
      context: 'Education plays a pivotal role in shaping a person\'s future.',
      synonyms: 'Be crucial, be key, play a vital part'
    },
    {
      phrase: 'A double-edged sword',
      type: 'Idiom (C1)',
      meaning: 'Con dao hai lưỡi (có cả lợi ích và tác hại)',
      context: 'Artificial intelligence is a double-edged sword; it boosts efficiency but threatens jobs.',
      synonyms: 'Has both pros and cons'
    },
    {
      phrase: 'Mitigate the effects of',
      type: 'Collocation (C2)',
      meaning: 'Giảm thiểu, xoa dịu tác động của cái gì tiêu cực',
      context: 'Governments must implement strict policies to mitigate the effects of global warming.',
      synonyms: 'Alleviate, lessen, reduce'
    },
    {
      phrase: 'Acquire new skills',
      type: 'Collocation (B2)',
      meaning: 'Tiếp thu / học thêm kỹ năng mới',
      context: 'In this fast-paced market, workers need to acquire new skills to stay employable.',
      synonyms: 'Learn skills, master skills'
    }
  ],
  essays: [
    {
      id: 'essay-1',
      title: 'IELTS Writing: Free University Education',
      prompt: 'Some people think that university education should be free for everyone. To what extent do you agree or disagree?',
      band: 'IELTS Band 8.5+',
      essay: `It is argued by some that higher education should be fully funded by the state, allowing all citizens to attend university free of charge. While this proposal has certain social benefits, I disagree that university education should be completely free due to the financial strain on governments and the potential drop in academic standards.

To begin with, implementing free higher education would place an enormous financial burden on the national budget. Free university education is not truly free; rather, it is funded by taxpayers' money. If a government decides to eliminate tuition fees, it will have to allocate vast sums to support academic institutions. Consequently, this might lead to budget cuts in other critical sectors such as healthcare, infrastructure, or public security. For instance, in some developing countries, subsidizing universities has resulted in poor quality secondary school systems due to funding reallocation.

Furthermore, making tertiary education free for all could lead to a decline in quality. When universities do not rely on tuition fees, they may face resource shortages, leading to outdated labs, poorly paid staff, and overcrowded lecture halls. Additionally, students who do not pay for their studies might not value their education as highly as those who invest their own financial resources. A competitive entry system where students pay tuition often motivates them to excel and graduate on time, ensuring that the country produces highly skilled and dedicated professionals.

In conclusion, although free university education appears attractive, it is not a sustainable policy. Governments should instead focus on offering scholarships and low-interest student loans to support needy individuals rather than making tuition free for everyone.`,
      analysis: 'Bài viết lập luận mạch lạc (Coherence) sử dụng các cụm từ đắt giá: "fully funded by the state", "financial strain on governments", "tertiary education", "subsidizing universities".'
    },
    {
      id: 'essay-2',
      title: 'VSTEP Writing: Thư phàn nàn dịch vụ (Complaint Letter)',
      prompt: 'Write a letter to the manager of a hotel complaining about the poor service you experienced during your stay.',
      band: 'VSTEP B2/C1 Pass',
      essay: `Dear Sir or Madam,

I am writing to express my strong dissatisfaction with the service I received during my stay at your hotel from June 12th to June 15th. 

Firstly, upon my arrival, the room was not ready despite the fact that I had booked it three weeks in advance. I had to wait in the lobby for more than an hour. Secondly, the air conditioning unit in my room (Room 304) was extremely noisy and did not function properly, which made it impossible for me to sleep. I complained to the front desk twice, but no action was taken to address this issue.

As a frequent traveler, I expect a much higher standard of customer service. Therefore, I request a partial refund of my booking fee as compensation for the inconvenience caused.

I look forward to hearing from you soon.

Yours faithfully,
John Green`,
      analysis: 'Đây là cấu trúc thư phàn nàn chuẩn VSTEP: mở thư lịch sự, nêu rõ lý do phàn nàn cụ thể, đề xuất hướng giải quyết và kết thư trang trọng.'
    }
  ]
};
