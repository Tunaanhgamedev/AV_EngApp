'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Award, Headphones, BookOpen, PenTool, Mic2, Clock, Target, ChevronRight,
  Sparkles, Brain, TrendingUp, Zap, ShieldCheck, Play, Star,
  ArrowRight, BarChart3, FileText, MessageSquare, ExternalLink, Notebook, Timer, Pause, Trash2, Info, Compass,
  Search, CheckSquare, BookOpenCheck, Plus, Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { getIeltsStudyPlan } from '@/services/ielts.service';

const IELTS_SKILLS = [
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

const BAND_DESCRIPTORS = [
  { band: 9, label: 'Expert', color: 'bg-emerald-500' },
  { band: 8, label: 'Very Good', color: 'bg-emerald-400' },
  { band: 7, label: 'Good', color: 'bg-blue-500' },
  { band: 6.5, label: 'Competent+', color: 'bg-blue-400' },
  { band: 6, label: 'Competent', color: 'bg-amber-500' },
  { band: 5.5, label: 'Modest+', color: 'bg-amber-400' },
  { band: 5, label: 'Modest', color: 'bg-orange-500' },
];

const INTEGRATED_PLATFORMS = [
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

const KNOWLEDGE_DATA = {
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

const ENGLISH_PRACTICE_DB = {
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

export default function IELTSPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  // AI Study Planner States
  const [studyPlan, setStudyPlan] = useState<any>(null);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [errorPlan, setErrorPlan] = useState<string | null>(null);

  const handleGenerateIeltsPlan = async () => {
    if (!user || loadingPlan) return;
    try {
      setLoadingPlan(true);
      setErrorPlan(null);
      const token = await user.getIdToken();
      const plan = await getIeltsStudyPlan(user.uid, token);
      setStudyPlan(plan);
    } catch (err: any) {
      setErrorPlan('Không thể tạo lộ trình. Vui lòng thử lại sau.');
      console.error(err);
    } finally {
      setLoadingPlan(false);
    }
  };

  const [knowledgeTab, setKnowledgeTab] = useState<string>('methods');
  const [knowledgeSearch, setKnowledgeSearch] = useState<string>('');
  const [checkedPlanItems, setCheckedPlanItems] = useState<string[]>([]);

  const togglePlanItem = (itemId: string) => {
    const next = checkedPlanItems.includes(itemId)
      ? checkedPlanItems.filter(id => id !== itemId)
      : [...checkedPlanItems, itemId];
    setCheckedPlanItems(next);
    localStorage.setItem('ielts_checked_plan_items', JSON.stringify(next));
  };

  // Interactive English Practice States
  const [activeDictationId, setActiveDictationId] = useState<string>('dict-1');
  const [dictationInput, setDictationInput] = useState<string>('');
  const [showDictationResult, setShowDictationResult] = useState<boolean>(false);
  const [revealedTranscript, setRevealedTranscript] = useState<boolean>(false);
  
  // Essay Reader State
  const [activeEssayId, setActiveEssayId] = useState<string>('essay-1');
  const [vocabSearch, setVocabSearch] = useState<string>('');

  const [selectedPlatform, setSelectedPlatform] = useState<string>('study4');
  const [notes, setNotes] = useState<string>('');
  
  // Timer States
  const [timeLeft, setTimeLeft] = useState<number>(3600); // 1 hour default
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Vocabulary States
  const [vocabWord, setVocabWord] = useState('');
  const [vocabMeaning, setVocabMeaning] = useState('');
  const [vocabList, setVocabList] = useState<{ word: string; meaning: string }[]>([]);

  // Hydrate states from localStorage after client-side mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPlan = localStorage.getItem('ielts_checked_plan_items');
      if (savedPlan) {
        try {
          setCheckedPlanItems(JSON.parse(savedPlan));
        } catch (e) {
          console.error(e);
        }
      }
      
      const savedNotes = localStorage.getItem('ielts_practice_notes');
      if (savedNotes) {
        setNotes(savedNotes);
      }

      const savedVocab = localStorage.getItem('ielts_vocab_list');
      if (savedVocab) {
        try {
          setVocabList(JSON.parse(savedVocab));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const addVocabFromLibrary = (word: string, meaning: string) => {
    if (vocabList.some(item => item.word.toLowerCase() === word.toLowerCase())) {
      return;
    }
    const next = [...vocabList, { word, meaning }];
    setVocabList(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ielts_vocab_list', JSON.stringify(next));
    }
  };

  // Local storage save for notes
  const handleNotesChange = (val: string) => {
    setNotes(val);
    localStorage.setItem('ielts_practice_notes', val);
  };

  React.useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setTimerActive(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerActive]);

  const toggleTimer = () => setTimerActive(!timerActive);
  const resetTimer = (secs: number = 3600) => {
    setTimerActive(false);
    setTimeLeft(secs);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const addVocab = () => {
    if (!vocabWord.trim()) return;
    const newList = [...vocabList, { word: vocabWord.trim(), meaning: vocabMeaning.trim() }];
    setVocabList(newList);
    localStorage.setItem('ielts_vocab_list', JSON.stringify(newList));
    setVocabWord('');
    setVocabMeaning('');
  };

  const deleteVocab = (idx: number) => {
    const newList = vocabList.filter((_, i) => i !== idx);
    setVocabList(newList);
    localStorage.setItem('ielts_vocab_list', JSON.stringify(newList));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 animate-in fade-in duration-700">
      {/* Hero Section — Deep Red/Maroon IELTS Brand */}
      <section className="premium-card p-1 rounded-3xl overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-br from-red-950 via-rose-900 to-red-800 rounded-[22px] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI2di0yaDEwem0wLTRWMjhoLTEwdjJoMTB6bS0xNCA0aDJ2LTJoLTJ2MnptMC00aDJ2LTJoLTJ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/20 text-red-200 rounded-full border border-red-500/20">
                <Award className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">IELTS Academic & General</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Luyện thi <span className="bg-gradient-to-r from-red-300 to-rose-200 bg-clip-text text-transparent">IELTS</span>
                <br />mô phỏng thật 100%
              </h1>

              <p className="text-red-200/80 text-lg font-medium max-w-xl">
                Giao diện luyện thi giống phòng thi thật. Chấm bài Writing & Speaking bằng AI. Đầy đủ 4 kĩ năng Listening, Reading, Writing, Speaking.
              </p>

              <div className="flex flex-wrap gap-6 justify-center md:justify-start text-red-300/80 text-sm font-bold">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-red-300" />
                  <span>4 kĩ năng</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-red-300" />
                  <span>~2 giờ 45 phút/bài thi</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-red-300" />
                  <span>Band Score: 0 — 9.0</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
                <button
                  onClick={() => router.push('/ielts/test')}
                  className="px-8 py-4 bg-gradient-to-r from-red-500 to-rose-400 text-white rounded-2xl font-black text-sm hover:opacity-90 transition-all shadow-xl shadow-red-500/30 flex items-center gap-2 group"
                >
                  <Play className="w-5 h-5" />
                  THI THỬ FULL TEST
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-sm hover:bg-white/20 transition-all flex items-center gap-2 backdrop-blur"
                >
                  <Sparkles className="w-5 h-5" />
                  LUYỆN TỪNG KĨ NĂNG
                </button>
              </div>
            </div>

            {/* Band Score Display */}
            <div className="hidden md:flex flex-col items-center gap-4">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="url(#ieltsGrad)" strokeWidth="8" strokeLinecap="round" strokeDasharray="264" strokeDashoffset="44" />
                  <defs>
                    <linearGradient id="ieltsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-white">7.0</span>
                  <span className="text-[10px] font-bold text-red-300 uppercase tracking-widest">Mục tiêu</span>
                </div>
              </div>
              <div className="flex gap-3">
                {BAND_DESCRIPTORS.slice(0, 4).map(b => (
                  <div key={b.band} className="text-center">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black", b.color)}>
                      {b.band}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <div id="skills" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800">Bốn kĩ năng IELTS</h2>
            <p className="text-sm text-slate-500 font-medium">Chọn kĩ năng để bắt đầu luyện tập chuyên sâu</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {IELTS_SKILLS.map(skill => {
            const isExpanded = expandedSkill === skill.id;
            return (
              <div
                key={skill.id}
                className={cn("premium-card overflow-hidden transition-all duration-500", isExpanded && "md:col-span-2")}
              >
                {/* Card Header */}
                <div
                  className="p-6 cursor-pointer group"
                  onClick={() => setExpandedSkill(isExpanded ? null : skill.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={cn("w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg", skill.color, skill.shadow)}>
                        <skill.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-800 group-hover:text-primary transition-colors">
                          {skill.title}
                          <span className="text-sm font-bold text-slate-400 ml-2">({skill.titleVi})</span>
                        </h3>
                        <p className="text-sm text-slate-500 font-medium mt-1">{skill.description}</p>
                        <div className="flex items-center gap-4 mt-3 text-xs font-bold text-slate-400">
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {skill.duration}</span>
                          <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {skill.sections} phần</span>
                          <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> {skill.questions} câu</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={cn("w-6 h-6 text-slate-300 transition-transform duration-300", isExpanded && "rotate-90")} />
                  </div>
                </div>

                {/* Expandable Detail */}
                <div className={cn("overflow-hidden transition-all duration-500", isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0")}>
                  <div className={cn("p-6 pt-0 border-t border-slate-100")}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                      {/* Question Formats */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">Dạng câu hỏi</h4>
                        <div className="space-y-2">
                          {skill.formats.map((f, i) => (
                            <div key={i} className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl">
                              <div className={cn("w-2 h-2 rounded-full bg-gradient-to-r", skill.color)} />
                              <span className="text-sm font-medium text-slate-600">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tips */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">Mẹo luyện thi</h4>
                        <div className="space-y-2">
                          {skill.tips.map((t, i) => (
                            <div key={i} className="flex items-start gap-2 px-3 py-2 bg-slate-50 rounded-xl">
                              <Brain className={cn("w-4 h-4 mt-0.5 flex-shrink-0", skill.textColor)} />
                              <span className="text-sm font-medium text-slate-600">{t}</span>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/ielts/practice/${skill.id}`);
                          }}
                          className={cn("w-full mt-4 py-3.5 rounded-2xl font-black text-sm text-white shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 bg-gradient-to-r", skill.color)}
                        >
                          <Play className="w-4 h-4" />
                          BẮT ĐẦU LUYỆN {skill.title.toUpperCase()}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Specialized IELTS Practice Packages */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800">Gói Luyện Thi IELTS Chuyên Sâu</h2>
            <p className="text-xs text-slate-400 font-bold">Chuyên đề AI sinh đề theo dạng bài cụ thể — luyện trọng tâm, tiến bộ nhanh hơn</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Writing Task 1 */}
          <div className="premium-card p-6 border-slate-100 hover:shadow-xl transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-100 text-amber-700">Writing Task 1</span>
                <span className="text-xs font-bold text-emerald-600">+100 XP</span>
              </div>
              <h3 className="text-lg font-black text-slate-800">📊 Mô Tả Biểu Đồ</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Luyện viết Task 1: mô tả Bar, Line, Pie chart hoặc Table. AI sinh dữ liệu biểu đồ ngẫu nhiên và chấm bài 4 tiêu chí.</p>
            </div>
            <button onClick={() => router.push('/ielts/practice/writing?mode=task1_chart')} className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors">
              Luyện ngay <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Writing Task 2 */}
          <div className="premium-card p-6 border-slate-100 hover:shadow-xl transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-orange-100 text-orange-700">Writing Task 2</span>
                <span className="text-xs font-bold text-emerald-600">+100 XP</span>
              </div>
              <h3 className="text-lg font-black text-slate-800">✍️ Viết Luận Học Thuật</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Luyện viết Task 2: Opinion, Discussion, Problem/Solution Essay. AI chấm điểm và sửa bài chi tiết từng tiêu chí.</p>
            </div>
            <button onClick={() => router.push('/ielts/practice/writing?mode=task2_essay')} className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors">
              Luyện ngay <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Speaking Part 1 */}
          <div className="premium-card p-6 border-slate-100 hover:shadow-xl transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-rose-100 text-rose-700">Speaking Part 1</span>
                <span className="text-xs font-bold text-emerald-600">+50 XP</span>
              </div>
              <h3 className="text-lg font-black text-slate-800">🎤 Hỏi Đáp Đời Thường</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">5 câu hỏi Part 1 về chủ đề quen thuộc: nhà ở, công việc, sở thích, du lịch. Luyện trả lời nhanh 2-3 câu.</p>
            </div>
            <button onClick={() => router.push('/ielts/practice/speaking?mode=speaking_part1')} className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors">
              Luyện ngay <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Speaking Part 2 */}
          <div className="premium-card p-6 border-slate-100 hover:shadow-xl transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-pink-100 text-pink-700">Speaking Part 2</span>
                <span className="text-xs font-bold text-emerald-600">+80 XP</span>
              </div>
              <h3 className="text-lg font-black text-slate-800">🃏 Cue Card Monologue</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Luyện thuyết trình 2 phút theo Cue Card: Describe a person/place/event. AI chấm điểm 4 tiêu chí Speaking.</p>
            </div>
            <button onClick={() => router.push('/ielts/practice/speaking?mode=speaking_part2')} className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors">
              Luyện ngay <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Reading T/F/NG */}
          <div className="premium-card p-6 border-slate-100 hover:shadow-xl transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-700">Reading T/F/NG</span>
                <span className="text-xs font-bold text-emerald-600">+75 XP</span>
              </div>
              <h3 className="text-lg font-black text-slate-800">✅ True / False / Not Given</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Chuyên đề đọc hiểu dạng T/F/NG — dạng bài khó nhất IELTS Reading. Luyện phân biệt False vs Not Given.</p>
            </div>
            <button onClick={() => router.push('/ielts/practice/reading?mode=reading_tfng')} className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors">
              Luyện ngay <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Reading Matching Headings */}
          <div className="premium-card p-6 border-slate-100 hover:shadow-xl transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-teal-100 text-teal-700">Matching Headings</span>
                <span className="text-xs font-bold text-emerald-600">+75 XP</span>
              </div>
              <h3 className="text-lg font-black text-slate-800">🧩 Ghép Tiêu Đề Đoạn Văn</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Luyện dạng Matching Headings: đọc hiểu ý chính từng đoạn rồi ghép với tiêu đề phù hợp nhất từ danh sách.</p>
            </div>
            <button onClick={() => router.push('/ielts/practice/reading?mode=reading_matching')} className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors">
              Luyện ngay <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* AI Study Planner Advisor */}
      <section className="premium-card p-6 bg-gradient-to-r from-violet-500/5 to-purple-500/5 border border-violet-100/50 rounded-3xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20 flex-shrink-0">
              <Brain className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                Cố Vấn Lộ Trình Học IELTS
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-violet-100 text-violet-700 animate-bounce">AI</span>
              </h2>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Phân tích band score lịch sử 4 kỹ năng để thiết kế lộ trình ôn tập 4 tuần cá nhân hóa tối ưu nhất.
              </p>
            </div>
          </div>
          <button
            onClick={handleGenerateIeltsPlan}
            disabled={loadingPlan || !user}
            className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-black text-xs rounded-xl shadow-lg shadow-violet-500/20 hover:opacity-95 transition-all flex items-center gap-1.5 justify-center disabled:opacity-50 flex-shrink-0 cursor-pointer"
          >
            {loadingPlan ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> ĐANG PHÂN TÍCH...</>
            ) : (
              <><Sparkles className="w-4 h-4" /> THIẾT KẾ LỘ TRÌNH IELTS</>
            )}
          </button>
        </div>

        {errorPlan && (
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-sm font-bold text-rose-600 flex items-center gap-2">
            <span>⚠️</span> {errorPlan}
          </div>
        )}

        {studyPlan && (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500 border-t border-slate-100 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-2 md:col-span-2">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Phân tích năng lực IELTS</h3>
                <p className="text-sm text-slate-600 font-semibold leading-relaxed">{studyPlan.summary}</p>
              </div>
              <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-2 flex flex-col justify-center items-center text-center">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Mục tiêu Band Score</h3>
                <div className="text-3xl font-black bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mt-1">
                  IELTS {studyPlan.recommendedTarget}
                </div>
                <p className="text-[10px] font-bold text-slate-400 mt-1">Lộ trình 4 tuần nâng band vượt bậc</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Lộ trình học tập chi tiết 4 tuần</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {studyPlan.weeks?.map((w: any) => (
                  <div key={w.weekNumber} className="premium-card p-5 border-slate-100/60 bg-white hover:shadow-md transition-all flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 text-xs font-black flex items-center justify-center flex-shrink-0">
                          {w.weekNumber}
                        </span>
                        <h4 className="text-sm font-black text-slate-800">{w.theme}</h4>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {w.focusSkills?.map((s: string) => (
                          <span key={s} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-extrabold text-[9px] uppercase tracking-wider">
                            {s}
                          </span>
                        ))}
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-500 font-medium list-disc list-inside">
                        {w.actions?.map((act: string, idx: number) => (
                          <li key={idx} className="leading-relaxed">{act}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 flex gap-2">
                      {w.focusSkills?.slice(0, 2).map((s: string) => (
                        <button
                          key={s}
                          onClick={() => router.push(`/ielts/practice/${s}`)}
                          className="flex-1 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/60 font-bold rounded-lg text-[10px] transition-colors capitalize"
                        >
                          Luyện {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Band Score Guide */}
      <section className="premium-card p-8">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800">Thang điểm IELTS Band Score</h3>
              <p className="text-sm text-slate-500 font-medium">Hiểu rõ mục tiêu điểm số của bạn</p>
            </div>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
            {BAND_DESCRIPTORS.map(b => (
              <div key={b.band} className="text-center space-y-2 group cursor-default">
                <div className={cn("h-16 rounded-xl flex items-center justify-center text-white font-black text-lg transition-transform group-hover:scale-105", b.color)}>
                  {b.band}
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{b.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrated Platforms Hub */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800">Hệ thống liên kết & Tài nguyên IELTS chuyên sâu</h2>
            <p className="text-sm text-slate-500 font-medium">Tích hợp tài nguyên luyện thi từ các thương hiệu hàng đầu: Study4, IELTS Online Tests, DailyDictation, YouPass, VSTEP</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left: Interactive Platform Selection Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Chips Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {INTEGRATED_PLATFORMS.map(platform => {
                const isSelected = selectedPlatform === platform.id;
                return (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={cn(
                      "p-3 rounded-2xl border text-center transition-all duration-300 font-black text-xs flex flex-col items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95",
                      isSelected
                        ? `bg-gradient-to-br ${platform.accentColor} text-white border-transparent scale-105 shadow-md`
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-350 hover:bg-slate-50/50"
                    )}
                  >
                    <span className="text-base">
                      {platform.id === 'study4' ? '🎓' : 
                       platform.id === 'ieltsonlinetests' ? '📝' : 
                       platform.id === 'dailydictation' ? '🎧' : 
                       platform.id === 'youpass' ? '💡' : '⭐'}
                    </span>
                    {platform.name}
                  </button>
                );
              })}
            </div>

            {/* Selected Platform Detail Card */}
            {(() => {
              const current = INTEGRATED_PLATFORMS.find(p => p.id === selectedPlatform)!;
              return (
                <div className="premium-card p-6 md:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                    <div className="space-y-1">
                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full text-white bg-gradient-to-r",
                        current.accentColor
                      )}>
                        Nền tảng tích hợp
                      </span>
                      <h3 className="text-xl font-bold text-slate-800 pt-1">{current.title}</h3>
                    </div>
                    <a
                      href={current.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex-shrink-0"
                    >
                      Ghé thăm website <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed font-medium">{current.description}</p>

                  {/* Feature Bullets */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Tính năng nổi bật & phương pháp</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {current.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className={cn("w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-gradient-to-r", current.accentColor)} />
                          <span className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendation Links */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Liên kết ôn luyện đề xuất</span>
                    <div className="flex flex-wrap gap-3">
                      {current.links.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
                        >
                          {link.label} <ExternalLink className="w-3 h-3 text-slate-400" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Simulated Browser Web View */}
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trải nghiệm nhúng trực tiếp (Iframe Sandbox)</span>
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 rounded text-[10px] font-bold text-amber-700 border border-amber-200">
                        <Info className="w-3 h-3" /> Chặn nạp nếu trùng nguồn bảo mật
                      </div>
                    </div>
                    <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-inner bg-slate-900">
                      {/* Browser header bar */}
                      <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
                        <div className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-full bg-red-500 block" />
                          <span className="w-3 h-3 rounded-full bg-yellow-500 block" />
                          <span className="w-3 h-3 rounded-full bg-green-500 block" />
                        </div>
                        <div className="bg-slate-900 rounded-md text-[10px] text-slate-400 font-mono py-1 px-4 w-72 text-center truncate">
                          {current.url}
                        </div>
                        <a
                          href={current.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-bold text-slate-300 hover:text-white flex items-center gap-1"
                        >
                          Mở Tab Mới <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      {/* Iframe element */}
                      <div className="h-96 w-full bg-white relative">
                        <iframe
                          src={current.url}
                          title={current.name}
                          className="w-full h-full border-0"
                          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        />
                        {/* overlay helper text */}
                        <div className="absolute bottom-2 right-2 bg-slate-900/90 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold pointer-events-none">
                          💡 Nếu website không tải được, bạn vui lòng nhấp "Mở Tab Mới" ở phía trên.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Right: Bàn Học Thông Minh (Practice Companion Dashboard) */}
          <div className="space-y-6">
            
            {/* Mock Test Timer Box */}
            <div className="premium-card p-6 bg-slate-900 text-white space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <Timer className="w-5 h-5 text-indigo-400 animate-pulse" />
                <h4 className="text-sm font-black uppercase tracking-wider text-slate-200">Đồng hồ phòng thi (Timer)</h4>
              </div>
              <div className="text-center py-4">
                <div className="text-4xl font-mono font-black text-indigo-300 tracking-wider">
                  {formatTime(timeLeft)}
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                  Thời gian làm đề mô phỏng
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={toggleTimer}
                  className={cn(
                    "flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center",
                    timerActive ? "bg-red-500 hover:bg-red-600 text-white" : "bg-indigo-500 hover:bg-indigo-600 text-white"
                  )}
                >
                  {timerActive ? 'Tạm Dừng' : 'Bắt Đầu'}
                </button>
                <button
                  onClick={() => resetTimer(3600)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-slate-300 transition-all cursor-pointer"
                >
                  1 Giờ
                </button>
                <button
                  onClick={() => resetTimer(2400)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-slate-300 transition-all cursor-pointer"
                >
                  40 Phút
                </button>
              </div>
            </div>

            {/* IELTS Scratchpad & Notebook */}
            <div className="premium-card p-6 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Notebook className="w-5 h-5 text-slate-500" />
                  <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">Sổ tay nháp (Scratchpad)</h4>
                </div>
                <button
                  onClick={() => handleNotesChange('')}
                  className="text-[10px] font-bold text-red-500 hover:text-red-600 flex items-center gap-1 cursor-pointer"
                  title="Xóa nháp"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Xóa
                </button>
              </div>
              <textarea
                value={notes}
                onChange={(e) => handleNotesChange(e.target.value)}
                placeholder="Ghi chú nhanh từ vựng, cấu trúc câu hay ghi chép lại đáp án khi đang làm bài..."
                className="w-full h-36 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium leading-relaxed resize-none"
              />
              <span className="text-[10px] font-bold text-slate-400 text-right block">Tự động lưu vào bộ nhớ cục bộ</span>
            </div>

            {/* Quick Vocabulary Bank */}
            <div className="premium-card p-6 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">Từ vựng mới lưu (Vocab)</h4>
                </div>
                <span className="px-2 py-0.5 bg-slate-100 rounded-full text-[10px] font-black text-slate-500">
                  {vocabList.length} từ
                </span>
              </div>
              
              {/* Input section */}
              <div className="space-y-2">
                <input
                  type="text"
                  value={vocabWord}
                  onChange={(e) => setVocabWord(e.target.value)}
                  placeholder="Từ mới (Ví dụ: Paraphrase)"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={vocabMeaning}
                    onChange={(e) => setVocabMeaning(e.target.value)}
                    placeholder="Ý nghĩa / Ngữ cảnh"
                    className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium"
                  />
                  <button
                    onClick={addVocab}
                    className="px-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95"
                  >
                    Thêm
                  </button>
                </div>
              </div>

              {/* Vocab List Scroll */}
              <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                {vocabList.length === 0 ? (
                  <p className="text-[11px] text-slate-400 font-medium text-center py-4">Chưa có từ vựng nào được ghi lại.</p>
                ) : (
                  vocabList.map((item, i) => (
                    <div key={i} className="flex justify-between items-start p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs group">
                      <div className="space-y-0.5">
                        <strong className="text-slate-800 block font-bold">{item.word}</strong>
                        <span className="text-slate-500 block font-medium text-[11px]">{item.meaning}</span>
                      </div>
                      <button
                        onClick={() => deleteVocab(i)}
                        className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 cursor-pointer"
                        title="Xóa từ vựng"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* IELTS & VSTEP Knowledge & Material Bank */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
            <BookOpenCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800">Cẩm nang & Học liệu Thực hành liên kết</h2>
            <p className="text-sm text-slate-500 font-medium">Tích hợp tài liệu chính tả, từ vựng ngữ cảnh, bài viết luận mẫu và cấu trúc câu chuyển đổi chứng chỉ thực tế</p>
          </div>
        </div>

        <div className="premium-card p-6 md:p-8 space-y-6">
          {/* Tabs Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'methods', label: '📖 Phương Pháp Học' },
                { id: 'practice', label: '⚡ Luyện Nghe & Từ Vựng' },
                { id: 'essays', label: '📝 Bài Mẫu & Viết Thư' },
                { id: 'vstep', label: '🎖️ Quy Đổi VSTEP' },
              ].map(tab => {
                const isSelected = knowledgeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setKnowledgeTab(tab.id)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-sm active:scale-95",
                      isSelected
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    )}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* General Search (Except for specialized search tabs) */}
            {knowledgeTab !== 'practice' && knowledgeTab !== 'essays' && (
              <div className="relative w-full md:w-72">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </span>
                <input
                  type="text"
                  value={knowledgeSearch}
                  onChange={(e) => setKnowledgeSearch(e.target.value)}
                  placeholder="Tìm kiếm kiến thức..."
                  className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>
            )}
          </div>

          {/* Active Content Area */}
          <div className="space-y-6">
            
            {/* 1. METHODS TAB */}
            {knowledgeTab === 'methods' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {KNOWLEDGE_DATA.methods
                  .filter(m => 
                    m.title.toLowerCase().includes(knowledgeSearch.toLowerCase()) ||
                    m.content.toLowerCase().includes(knowledgeSearch.toLowerCase())
                  )
                  .map(m => {
                    const completedStepsCount = m.steps.filter((_, idx) => 
                      checkedPlanItems.includes(`${m.id}-step-${idx}`)
                    ).length;
                    const progressPercent = Math.round((completedStepsCount / m.steps.length) * 100);

                    return (
                      <div key={m.id} className="p-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200/60 rounded-2xl flex flex-col justify-between space-y-4 transition-all duration-300">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-2xl">{m.icon}</span>
                            <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-slate-200 text-slate-600 rounded">
                              {m.source}
                            </span>
                          </div>
                          <h4 className="text-sm font-black text-slate-800 leading-snug">{m.title}</h4>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed">{m.content}</p>
                          
                          {/* Progress Tracker bar */}
                          <div className="space-y-1.5 pt-1">
                            <div className="flex justify-between text-[9px] font-bold text-slate-400">
                              <span>Lộ trình thực hành</span>
                              <span>{progressPercent}% Hoàn tất</span>
                            </div>
                            <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                            </div>
                          </div>

                          {/* Steps with Checkboxes */}
                          <div className="space-y-2 pt-2">
                            {m.steps.map((step, idx) => {
                              const stepId = `${m.id}-step-${idx}`;
                              const isChecked = checkedPlanItems.includes(stepId);
                              return (
                                <label key={idx} className="flex items-start gap-2.5 cursor-pointer select-none">
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => togglePlanItem(stepId)}
                                    className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer h-3.5 w-3.5"
                                  />
                                  <span className={cn(
                                    "text-xs leading-relaxed font-semibold transition-all duration-200",
                                    isChecked ? "text-slate-400 line-through" : "text-slate-600"
                                  )}>
                                    {step}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </div>

                        {/* Top Tip Box */}
                        <div className="p-3 bg-amber-50/70 border border-amber-100 rounded-xl text-[11px] font-semibold text-amber-700 leading-relaxed">
                          💡 <strong>Lời khuyên:</strong> {m.tip}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}

            {/* 2. INTERACTIVE PRACTICE (LISTENING & VOCABULARY DICTATION) */}
            {knowledgeTab === 'practice' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left side: Dictation player */}
                <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black text-slate-800">🎧 Phòng nghe chép chính tả (DailyDictation)</h4>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                      Tương tác trực tiếp
                    </span>
                  </div>

                  {/* Exercise select */}
                  <div className="flex flex-wrap gap-2">
                    {ENGLISH_PRACTICE_DB.dictation.map(item => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveDictationId(item.id);
                          setDictationInput('');
                          setShowDictationResult(false);
                          setRevealedTranscript(false);
                        }}
                        className={cn(
                          "px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer",
                          activeDictationId === item.id
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                        )}
                      >
                        {item.title} ({item.difficulty})
                      </button>
                    ))}
                  </div>

                  {/* Audio Controls */}
                  {(() => {
                    const activeEx = ENGLISH_PRACTICE_DB.dictation.find(d => d.id === activeDictationId) || ENGLISH_PRACTICE_DB.dictation[0];
                    return (
                      <div className="space-y-4 pt-2">
                        <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col gap-2">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Máy phát âm thanh (Audio Loop Player)</span>
                          <audio key={activeEx.id} src={activeEx.audioUrl} controls className="w-full" />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-black text-slate-500">Nội dung bạn nghe được:</label>
                          <textarea
                            value={dictationInput}
                            onChange={(e) => setDictationInput(e.target.value)}
                            placeholder="Gõ lại chính xác các câu từ bạn nghe thấy..."
                            rows={3}
                            className="w-full p-3 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-500 bg-white leading-relaxed"
                          />
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => setShowDictationResult(true)}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black transition-all cursor-pointer shadow-sm active:scale-95"
                          >
                            Kiểm tra lỗi chính tả
                          </button>
                          <button
                            onClick={() => setRevealedTranscript(true)}
                            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-black transition-all cursor-pointer"
                          >
                            Hiện transcript gốc
                          </button>
                          <button
                            onClick={() => {
                              setDictationInput('');
                              setShowDictationResult(false);
                              setRevealedTranscript(false);
                            }}
                            className="px-4 py-2 bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all cursor-pointer"
                          >
                            Làm lại
                          </button>
                        </div>

                        {/* Spelled verification result */}
                        {showDictationResult && (
                          <div className="space-y-2 pt-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Kết quả so khớp bắt từ:</span>
                            <div className="p-4 bg-slate-900 text-white rounded-xl font-mono text-xs leading-relaxed flex flex-wrap gap-x-1.5 gap-y-1">
                              {activeEx.transcript.split(' ').map((word, idx) => {
                                const cleanWord = word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
                                const userWords = dictationInput.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(/\s+/);
                                const cleanUserWord = userWords[idx] || '';
                                const isCorrect = cleanWord === cleanUserWord;
                                return (
                                  <span key={idx} className={cn("px-1 rounded font-bold transition-colors", isCorrect ? "text-green-400 bg-green-950/40" : "text-red-400 bg-red-950/60 underline decoration-wavy")}>
                                    {word}
                                  </span>
                                );
                              })}
                            </div>
                            <span className="text-[10px] font-semibold text-slate-400 block italic">Chữ màu xanh: chính xác | Chữ màu đỏ gạch chân: sai chính tả hoặc bỏ sót</span>
                          </div>
                        )}

                        {revealedTranscript && (
                          <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-xs font-semibold text-amber-800 leading-relaxed space-y-1">
                            <strong>Transcript chuẩn:</strong>
                            <p>{activeEx.transcript}</p>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>

                {/* Right side: YouPass Vocabulary database */}
                <div className="p-6 bg-white border border-slate-200/80 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-black text-slate-800">💡 Thư viện Từ vựng Ngữ cảnh (YouPass style)</h4>
                      <p className="text-[11px] text-slate-400 font-medium">Bấm dấu cộng (+) để thêm từ vựng này trực tiếp vào Sổ tay của bạn</p>
                    </div>
                    {/* Search inside Vocab */}
                    <div className="relative w-40">
                      <input
                        type="text"
                        value={vocabSearch}
                        onChange={(e) => setVocabSearch(e.target.value)}
                        placeholder="Tìm từ vựng..."
                        className="w-full pl-3 pr-8 py-1.5 text-[11px] border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                    {ENGLISH_PRACTICE_DB.vocab
                      .filter(item => 
                        item.phrase.toLowerCase().includes(vocabSearch.toLowerCase()) ||
                        item.meaning.toLowerCase().includes(vocabSearch.toLowerCase())
                      )
                      .map((item, idx) => (
                        <div key={idx} className="p-4 bg-slate-50/70 hover:bg-slate-50 border border-slate-200/60 rounded-xl flex items-start justify-between gap-3 group transition-colors">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-slate-800">{item.phrase}</span>
                              <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                                {item.type}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 font-bold">👉 {item.meaning}</p>
                            <p className="text-[11px] text-slate-500 font-semibold italic">"{item.context}"</p>
                            <p className="text-[10px] text-slate-400 font-medium">Từ đồng nghĩa: {item.synonyms}</p>
                          </div>
                          <button
                            onClick={() => addVocabFromLibrary(item.phrase, item.meaning)}
                            className="p-1.5 bg-white border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-lg cursor-pointer transition-colors shadow-sm"
                            title="Thêm vào Sổ tay từ vựng của bạn"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. ESSAYS & COMPLAINT LETTERS */}
            {knowledgeTab === 'essays' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* List items */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Danh sách bài mẫu & Mẫu thư</span>
                  {ENGLISH_PRACTICE_DB.essays.map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveEssayId(item.id)}
                      className={cn(
                        "w-full p-4 rounded-xl text-left border cursor-pointer transition-all",
                        activeEssayId === item.id
                          ? "bg-slate-900 border-slate-900 shadow-sm"
                          : "bg-white border-slate-200 hover:bg-slate-50"
                      )}
                    >
                      <div className="flex justify-between items-start">
                        <strong className={cn("text-xs font-black block", activeEssayId === item.id ? "text-white" : "text-slate-800")}>
                          {item.title}
                        </strong>
                        <span className={cn("text-[9px] font-black px-1.5 py-0.5 rounded flex-shrink-0 ml-2", activeEssayId === item.id ? "bg-indigo-500 text-white" : "bg-indigo-50 text-indigo-600")}>
                          {item.band}
                        </span>
                      </div>
                      <p className={cn("text-[10px] font-semibold mt-1 line-clamp-1", activeEssayId === item.id ? "text-slate-400" : "text-slate-500")}>
                        {item.prompt}
                      </p>
                    </button>
                  ))}
                </div>

                {/* Essay reader */}
                {(() => {
                  const currentEssay = ENGLISH_PRACTICE_DB.essays.find(e => e.id === activeEssayId) || ENGLISH_PRACTICE_DB.essays[0];
                  return (
                    <div className="lg:col-span-2 p-6 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-4">
                      <div className="space-y-2">
                        <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">Đề Bài (Prompt)</span>
                        <h4 className="text-sm font-black text-slate-800">{currentEssay.prompt}</h4>
                      </div>

                      <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3 shadow-sm max-h-[400px] overflow-y-auto pr-1">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block pb-1 border-b border-slate-100">Bài mẫu đạt chuẩn</span>
                        {currentEssay.essay.split('\n\n').map((para, idx) => (
                          <p key={idx} className="text-xs leading-relaxed font-semibold text-slate-700 whitespace-pre-line">
                            {para}
                          </p>
                        ))}
                      </div>

                      <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-xs font-semibold text-indigo-800 leading-relaxed space-y-1">
                        <strong>Phân tích chiến thuật & Từ vựng đắt giá:</strong>
                        <p>{currentEssay.analysis}</p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 4. VSTEP CONVERSION TAB */}
            {knowledgeTab === 'vstep' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Comparison Grid */}
                <div className="lg:col-span-2 space-y-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Bảng quy đổi chứng chỉ năng lực ngoại ngữ</span>
                  <div className="grid grid-cols-1 gap-2">
                    {KNOWLEDGE_DATA.vstep.comparison.map((row, i) => (
                      <div key={i} className={cn("p-4 bg-white border-l-4 rounded-r-xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-3 transition-transform hover:scale-[1.01]", row.color)}>
                        <div>
                          <strong className="text-xs font-black text-slate-800">{row.vstep}</strong>
                          <p className="text-[11px] text-slate-500 font-medium mt-0.5">{row.desc}</p>
                        </div>
                        <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-black text-indigo-600 flex-shrink-0 self-start sm:self-center">
                          {row.ielts}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Synergy points */}
                <div className="p-5 bg-gradient-to-br from-emerald-50 to-green-50/50 border border-emerald-100 rounded-2xl space-y-4">
                  <h4 className="text-xs font-black text-emerald-800 uppercase tracking-wider">🎯 Tính liên kết & bổ trợ ôn tập</h4>
                  <ul className="space-y-3">
                    {KNOWLEDGE_DATA.vstep.comparison.map((_, i) => {
                      const syn = KNOWLEDGE_DATA.vstep.synergy[i] || '';
                      if (!syn) return null;
                      return (
                        <li key={i} className="flex items-start gap-2 text-xs font-medium text-emerald-700 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                          <span>{syn}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <a
                    href="https://vstep.fastreak.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all text-center block"
                  >
                    Thi thử VSTEP tại Fastreak
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Strategy Section */}
      <section className="premium-card p-8 bg-gradient-to-r from-red-50 to-rose-50 border-red-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-black text-slate-800">🎯 Chiến lược chinh phục IELTS 7.0+</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 font-medium">
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span><strong className="text-slate-800">Listening:</strong> Nghe podcast tiếng Anh 30 phút/ngày. Tập viết chính tả chính xác tuyệt đối.</span>
              </div>
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span><strong className="text-slate-800">Reading:</strong> Đọc báo tiếng Anh (BBC, The Guardian). Luyện kĩ năng paraphrasing và scanning.</span>
              </div>
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span><strong className="text-slate-800">Writing:</strong> Viết 1 bài Task 2 mỗi tuần. Học các cấu trúc câu phức (complex sentences) và từ nối (cohesive devices).</span>
              </div>
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span><strong className="text-slate-800">Speaking:</strong> Tự ghi âm và nghe lại. Tập trả lời Part 2 Cue Card trong đúng 2 phút.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
