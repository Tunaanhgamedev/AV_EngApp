import { 
  ImageIcon, MessageCircleQuestion, Users, Radio, 
  LetterText, FileText, BookOpenCheck 
} from 'lucide-react';

export interface ToeicPartConfig {
  id: string;
  part: number;
  title: string;
  skill: string;
  icon: any;
  color: string;
  shadow: string;
  questions: number;
  description: string;
  tip: string;
  difficulty: string;
}

export const TOEIC_PARTS: ToeicPartConfig[] = [
  {
    id: 'part1',
    part: 1,
    title: 'Photographs',
    skill: 'Listening',
    icon: ImageIcon,
    color: 'from-blue-500 to-cyan-400',
    shadow: 'shadow-blue-500/20',
    questions: 6,
    description: 'Nghe mô tả và chọn câu phù hợp nhất với bức ảnh.',
    tip: 'Quan sát kỹ hành động, vị trí người/vật trong ảnh trước khi nghe.',
    difficulty: 'Dễ'
  },
  {
    id: 'part2',
    part: 2,
    title: 'Question-Response',
    skill: 'Listening',
    icon: MessageCircleQuestion,
    color: 'from-indigo-500 to-blue-400',
    shadow: 'shadow-indigo-500/20',
    questions: 25,
    description: 'Nghe câu hỏi và chọn câu trả lời phù hợp nhất.',
    tip: 'Tập trung vào từ hỏi đầu tiên (What, Where, When, Who, How).',
    difficulty: 'Trung bình'
  },
  {
    id: 'part3',
    part: 3,
    title: 'Conversations',
    skill: 'Listening',
    icon: Users,
    color: 'from-violet-500 to-purple-400',
    shadow: 'shadow-violet-500/20',
    questions: 39,
    description: 'Nghe đoạn hội thoại giữa 2-3 người và trả lời câu hỏi.',
    tip: 'Đọc trước câu hỏi và đáp án trong thời gian chờ.',
    difficulty: 'Khó'
  },
  {
    id: 'part4',
    part: 4,
    title: 'Short Talks',
    skill: 'Listening',
    icon: Radio,
    color: 'from-purple-500 to-pink-400',
    shadow: 'shadow-purple-500/20',
    questions: 30,
    description: 'Nghe bài nói chuyện ngắn (thông báo, quảng cáo, hướng dẫn).',
    tip: 'Ghi nhớ các từ khóa về thời gian, địa điểm, mục đích.',
    difficulty: 'Khó'
  },
  {
    id: 'part5',
    part: 5,
    title: 'Incomplete Sentences',
    skill: 'Reading',
    icon: LetterText,
    color: 'from-emerald-500 to-teal-400',
    shadow: 'shadow-emerald-500/20',
    questions: 30,
    description: 'Chọn từ/cụm từ điền vào chỗ trống trong câu.',
    tip: 'Xác định loại từ cần điền (noun, verb, adj, adv) trước.',
    difficulty: 'Trung bình'
  },
  {
    id: 'part6',
    part: 6,
    title: 'Text Completion',
    skill: 'Reading',
    icon: FileText,
    color: 'from-teal-500 to-green-400',
    shadow: 'shadow-teal-500/20',
    questions: 16,
    description: 'Điền từ/câu vào chỗ trống trong đoạn văn.',
    tip: 'Đọc cả đoạn văn trước để hiểu ngữ cảnh tổng thể.',
    difficulty: 'Khó'
  },
  {
    id: 'part7',
    part: 7,
    title: 'Reading Comprehension',
    skill: 'Reading',
    icon: BookOpenCheck,
    color: 'from-amber-500 to-orange-400',
    shadow: 'shadow-amber-500/20',
    questions: 54,
    description: 'Đọc hiểu các dạng văn bản: email, quảng cáo, bài báo, biểu đồ.',
    tip: 'Skim nhanh để nắm ý chính, sau đó scan để tìm thông tin chi tiết.',
    difficulty: 'Rất khó'
  }
];
