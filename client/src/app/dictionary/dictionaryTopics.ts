export interface DictionaryTopic {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  count: string;
  color: string;
  query: string;
  description: string;
}

export const DICTIONARY_TOPICS: DictionaryTopic[] = [
  {
    id: 'business',
    name: 'Công sở & Kinh doanh',
    nameEn: 'Business & Office',
    icon: '🏢',
    count: '150+ từ',
    color: 'from-blue-600 to-indigo-600',
    query: 'office',
    description: 'Từ vựng hợp đồng, tuyển dụng, thương lượng và quản trị.'
  },
  {
    id: 'tech',
    name: 'Công nghệ & AI',
    nameEn: 'Tech & Artificial Intelligence',
    icon: '💻',
    count: '120+ từ',
    color: 'from-cyan-600 to-blue-600',
    query: 'computer',
    description: 'Từ vựng phần mềm, phần cứng, AI và an toàn mạng.'
  },
  {
    id: 'travel',
    name: 'Du lịch & Vận tải',
    nameEn: 'Travel & Transport',
    icon: '✈️',
    count: '100+ từ',
    color: 'from-amber-500 to-orange-600',
    query: 'flight',
    description: 'Từ vựng sân bay, khách sạn, vé máy bay và lưu trú.'
  },
  {
    id: 'health',
    name: 'Y tế & Sức khỏe',
    nameEn: 'Healthcare & Medical',
    icon: '🏥',
    count: '90+ từ',
    color: 'from-emerald-600 to-teal-600',
    query: 'health',
    description: 'Từ vựng bệnh viện, điều trị, thuốc men và dinh dưỡng.'
  },
  {
    id: 'environment',
    name: 'Môi trường & Tự nhiên',
    nameEn: 'Environment & Nature',
    icon: '🌱',
    count: '80+ từ',
    color: 'from-green-600 to-emerald-600',
    query: 'nature',
    description: 'Từ vựng hệ sinh thái, năng lượng xanh và biến đổi khí hậu.'
  },
  {
    id: 'education',
    name: 'Giáo dục & Học thuật',
    nameEn: 'Education & Academia',
    icon: '🎓',
    count: '110+ từ',
    color: 'from-purple-600 to-indigo-600',
    query: 'school',
    description: 'Từ vựng nghiên cứu khoa học, bằng cấp và giảng đường.'
  },
  {
    id: 'food',
    name: 'Ẩm thực & Đời sống',
    nameEn: 'Food & Culinary',
    icon: '🍔',
    count: '95+ từ',
    color: 'from-rose-500 to-pink-600',
    query: 'food',
    description: 'Từ vựng món ăn, nhà hàng, công thức và ẩm thực.'
  },
  {
    id: 'finance',
    name: 'Tài chính & Ngân hàng',
    nameEn: 'Finance & Banking',
    icon: '💰',
    count: '105+ từ',
    color: 'from-emerald-700 to-cyan-700',
    query: 'bank',
    description: 'Từ vựng giao dịch, cổ phiếu, tỷ giá và kế toán.'
  }
];
