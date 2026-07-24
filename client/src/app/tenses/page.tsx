'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, Sparkles, BookOpen, Timer, Award, CheckCircle2, 
  Play, Loader2, Trophy, HelpCircle, AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface TenseDetail {
  id: string;
  name: string;
  nameVi: string;
  group: 'present' | 'past' | 'future';
  formula: {
    pos: string;
    neg: string;
    q: string;
  };
  basicUsage: string[];
  advancedUsage: string[];
  signals: string[];
  examples: { en: string; vi: string; type: 'basic' | 'advanced' }[];
}

const TENSES_DATA: TenseDetail[] = [
  // ─── PRESENT TENSES ──────────────────────────────────────────
  {
    id: 'present-simple',
    name: 'Present Simple',
    nameVi: 'Thì Hiện Tại Đơn',
    group: 'present',
    formula: {
      pos: 'S + V(s/es) | S + am/is/are + ...',
      neg: 'S + do/does + not + V-inf | S + am/is/are + not + ...',
      q: 'Do/Does + S + V-inf? | Am/Is/Are + S + ...?'
    },
    basicUsage: [
      'Diễn tả thói quen hoặc hành động lặp đi lặp lại ở hiện tại.',
      'Diễn tả sự thật hiển nhiên, chân lý khoa học.',
      'Diễn tả tình trạng lâu dài, mang tính cố định.'
    ],
    advancedUsage: [
      'Diễn tả lịch trình, thời khóa biểu của tàu xe, máy bay hoặc chương trình học tập (mang ý nghĩa tương lai).',
      'Dùng trong các mệnh đề chỉ thời gian bắt đầu bằng: when, as soon as, until... để nói về tương lai.',
      'Dùng trong câu điều kiện loại 1 (mệnh đề If).'
    ],
    signals: ['always', 'usually', 'often', 'sometimes', 'rarely', 'never', 'every day/week/month', 'once/twice a week'],
    examples: [
      { en: 'The earth goes around the sun.', vi: 'Trái đất quay quanh mặt trời.', type: 'basic' },
      { en: 'I usually play badminton on Saturday mornings.', vi: 'Tôi thường chơi cầu lông vào sáng thứ Bảy.', type: 'basic' },
      { en: 'The train leaves at 7:30 AM tomorrow.', vi: 'Tàu sẽ khởi hành lúc 7:30 sáng mai (theo thời khóa biểu).', type: 'advanced' },
      { en: 'I will call you as soon as I arrive home.', vi: 'Tôi sẽ gọi cho bạn ngay khi tôi về đến nhà (arrive chia ở hiện tại đơn).', type: 'advanced' }
    ]
  },
  {
    id: 'present-continuous',
    name: 'Present Continuous',
    nameVi: 'Thì Hiện Tại Tiếp Diễn',
    group: 'present',
    formula: {
      pos: 'S + am/is/are + V-ing',
      neg: 'S + am/is/are + not + V-ing',
      q: 'Am/Is/Are + S + V-ing?'
    },
    basicUsage: [
      'Diễn tả hành động đang diễn ra ngay tại thời điểm nói.',
      'Diễn tả hành động đang diễn ra xung quanh thời điểm nói (nhưng không nhất thiết ngay lúc nói).'
    ],
    advancedUsage: [
      'Diễn tả kế hoạch, dự định chắc chắn sẽ thực hiện trong tương lai gần (đã có sự chuẩn bị).',
      'Diễn tả sự phàn nàn về thói quen xấu (thường đi kèm với trạng từ "always").',
      'Diễn tả tình huống đang tạm thời thay đổi hoặc tiến triển (ví dụ: English level is improving).'
    ],
    signals: ['now', 'right now', 'at the moment', 'at present', 'Look!', 'Listen!', 'currently', 'always (phàn nàn)'],
    examples: [
      { en: 'Shh! The baby is sleeping.', vi: 'Suỵt! Đứa trẻ đang ngủ.', type: 'basic' },
      { en: 'I am reading an interesting book these days.', vi: 'Dạo này tôi đang đọc một cuốn sách rất thú vị.', type: 'basic' },
      { en: 'We are flying to Paris next Friday.', vi: 'Chúng tôi sẽ bay sang Paris vào thứ Sáu tới (kế hoạch đã mua vé).', type: 'advanced' },
      { en: 'He is always losing his keys!', vi: 'Anh ta suốt ngày làm mất chìa khóa! (phàn nàn hành động lặp đi lặp lại gây khó chịu).', type: 'advanced' }
    ]
  },
  {
    id: 'present-perfect',
    name: 'Present Perfect',
    nameVi: 'Thì Hiện Tại Hoàn Thành',
    group: 'present',
    formula: {
      pos: 'S + have/has + V3/ed',
      neg: 'S + have/has + not + V3/ed',
      q: 'Have/Has + S + V3/ed?'
    },
    basicUsage: [
      'Diễn tả hành động bắt đầu trong quá khứ và vẫn còn tiếp diễn ở hiện tại.',
      'Diễn tả trải nghiệm hoặc kinh nghiệm tính đến thời điểm hiện tại (thường đi với ever, never).',
      'Diễn tả hành động vừa mới xảy ra và để lại kết quả ở hiện tại.'
    ],
    advancedUsage: [
      'Dùng sau cấu trúc so sánh nhất (ví dụ: This is the best book I have ever read).',
      'Dùng trong cấu trúc: This is the first/second time + S + have/has + V3/ed.',
      'Phân biệt "have gone to" (đã đi và chưa về) và "have been to" (đã đi và đã quay về).'
    ],
    signals: ['since (since 2015)', 'for (for 5 years)', 'already', 'yet', 'just', 'ever', 'never', 'so far', 'recently', 'up to now'],
    examples: [
      { en: 'I have lived in Hanoi for ten years.', vi: 'Tôi đã sống ở Hà Nội được mười năm (hiện tại vẫn đang sống ở đây).', type: 'basic' },
      { en: 'Have you ever eaten sushi?', vi: 'Bạn đã từng ăn sushi chưa?', type: 'basic' },
      { en: 'She has just finished her project.', vi: 'Cô ấy vừa mới hoàn thành dự án của mình.', type: 'basic' },
      { en: 'This is the first time I have been to Da Nang.', vi: 'Đây là lần đầu tiên tôi ghé thăm Đà Nẵng.', type: 'advanced' }
    ]
  },
  {
    id: 'present-perfect-continuous',
    name: 'Present Perfect Continuous',
    nameVi: 'Hiện Tại Hoàn Thành Tiếp Diễn',
    group: 'present',
    formula: {
      pos: 'S + have/has + been + V-ing',
      neg: 'S + have/has + not + been + V-ing',
      q: 'Have/Has + S + been + V-ing?'
    },
    basicUsage: [
      'Diễn tả hành động bắt đầu trong quá khứ, kéo dài liên tục đến hiện tại và có thể tiếp diễn trong tương lai.',
      'Nhấn mạnh vào quá trình và thời gian kéo dài của hành động, thay vì kết quả.'
    ],
    advancedUsage: [
      'Diễn tả hành động vừa mới kết thúc nhưng để lại dấu vết, hậu quả rõ ràng ở hiện tại.',
      'Dùng với các động từ có tính kéo dài tự nhiên (live, work, study, wait, rain...) để tăng tính nhấn mạnh liên tục.'
    ],
    signals: ['all day/week', 'for + khoảng thời gian', 'since + mốc thời gian', 'how long', 'recently', 'lately'],
    examples: [
      { en: 'I have been waiting for you for two hours.', vi: 'Tôi đã đợi bạn liên tục suốt hai tiếng đồng hồ rồi.', type: 'basic' },
      { en: 'It has been raining all morning.', vi: 'Trời đã mưa liên tục suốt cả buổi sáng.', type: 'basic' },
      { en: 'Your hands are dirty. What have you been doing?', vi: 'Tay bạn bẩn thế. Nãy giờ bạn làm gì vậy? (hậu quả hiện tại của hành động vừa làm).', type: 'advanced' },
      { en: 'He has been studying English without a break.', vi: 'Anh ấy học tiếng Anh liên tục mà không hề nghỉ tay.', type: 'advanced' }
    ]
  },
  // ─── PAST TENSES ─────────────────────────────────────────────
  {
    id: 'past-simple',
    name: 'Past Simple',
    nameVi: 'Thì Quá Khứ Đơn',
    group: 'past',
    formula: {
      pos: 'S + V-ed / V2 | S + was/were + ...',
      neg: 'S + did + not + V-inf | S + was/were + not + ...',
      q: 'Did + S + V-inf? | Was/Were + S + ...?'
    },
    basicUsage: [
      'Diễn tả hành động đã xảy ra và kết thúc hoàn toàn trong quá khứ, có thời gian xác định.',
      'Diễn tả một chuỗi các hành động xảy ra liên tiếp nhau trong quá khứ.'
    ],
    advancedUsage: [
      'Dùng trong câu điều kiện loại 2 (mệnh đề If) để giả định điều không có thật ở hiện tại.',
      'Dùng trong cấu trúc giả định như: Wish (ước ở hiện tại), It\'s time (đã đến lúc làm gì).'
    ],
    signals: ['yesterday', 'ago (two days ago)', 'last (last night/week/year)', 'in + năm quá khứ (in 2018)', 'when I was young'],
    examples: [
      { en: 'I visited my grandparents yesterday.', vi: 'Tôi đã đến thăm ông bà ngày hôm qua.', type: 'basic' },
      { en: 'She stood up, opened the door, and walked out.', vi: 'Cô ấy đứng dậy, mở cửa và bước ra ngoài.', type: 'basic' },
      { en: 'If I had a million dollars, I would travel around the world.', vi: 'Nếu tôi có một triệu đô, tôi sẽ đi du lịch vòng quanh thế giới.', type: 'advanced' },
      { en: 'It is high time you started studying hard.', vi: 'Đã đến lúc bạn phải học tập chăm chỉ rồi.', type: 'advanced' }
    ]
  },
  {
    id: 'past-continuous',
    name: 'Past Continuous',
    nameVi: 'Thì Quá Khứ Tiếp Diễn',
    group: 'past',
    formula: {
      pos: 'S + was/were + V-ing',
      neg: 'S + was/were + not + V-ing',
      q: 'Was/Were + S + V-ing?'
    },
    basicUsage: [
      'Diễn tả hành động đang diễn ra tại một thời điểm cụ thể trong quá khứ.',
      'Diễn tả hành động đang diễn ra trong quá khứ thì một hành động khác xen vào (hành động xen vào chia quá khứ đơn).'
    ],
    advancedUsage: [
      'Diễn tả hai hành động diễn ra song song cùng một lúc trong quá khứ (thường kết nối bằng "while").',
      'Dùng để mô tả ngữ cảnh, không khí nền trong một câu chuyện.'
    ],
    signals: ['at + giờ cụ thể + thời gian quá khứ (at 8 PM yesterday)', 'when (khi)', 'while (trong khi)', 'at that time'],
    examples: [
      { en: 'I was watching TV at 9 PM last night.', vi: 'Tôi đang xem TV lúc 9 giờ tối qua.', type: 'basic' },
      { en: 'She was cooking when the phone rang.', vi: 'Cô ấy đang nấu ăn thì điện thoại reo.', type: 'basic' },
      { en: 'I was studying while my brother was playing games.', vi: 'Tôi đang học bài trong khi em trai tôi đang chơi game.', type: 'advanced' },
      { en: 'The birds were singing, and the sun was shining as I walked.', vi: 'Chim hót vang và mặt trời chiếu sáng khi tôi bước đi.', type: 'advanced' }
    ]
  },
  {
    id: 'past-perfect',
    name: 'Past Perfect',
    nameVi: 'Thì Quá Khứ Hoàn Thành',
    group: 'past',
    formula: {
      pos: 'S + had + V3/ed',
      neg: 'S + had + not + V3/ed',
      q: 'Had + S + V3/ed?'
    },
    basicUsage: [
      'Diễn tả hành động xảy ra và hoàn thành trước một hành động khác trong quá khứ.',
      'Hành động xảy ra trước chia quá khứ hoàn thành, hành động sau chia quá khứ đơn.'
    ],
    advancedUsage: [
      'Dùng trong câu điều kiện loại 3 để giả định điều không có thật trong quá khứ.',
      'Dùng với các cấu trúc "hardly/scarcely... when" hoặc "no sooner... than" để nói về các sự việc vừa xảy ra thì việc khác đến.'
    ],
    signals: ['before', 'after', 'by the time', 'as soon as', 'until then', 'prior to'],
    examples: [
      { en: 'The train had left before we arrived at the station.', vi: 'Đoạn tàu đã rời đi trước khi chúng tôi đến ga.', type: 'basic' },
      { en: 'She did her homework after she had eaten dinner.', vi: 'Cô ấy làm bài tập sau khi đã ăn tối xong.', type: 'basic' },
      { en: 'If you had studied hard, you would have passed the exam.', vi: 'Nếu bạn học hành chăm chỉ, bạn đã vượt qua kỳ thi (thực tế bạn không học chăm).', type: 'advanced' },
      { en: 'No sooner had I went out than it started to rain.', vi: 'Tôi vừa bước ra ngoài thì trời đổ mưa.', type: 'advanced' }
    ]
  },
  {
    id: 'past-perfect-continuous',
    name: 'Past Perfect Continuous',
    nameVi: 'Quá Khứ Hoàn Thành Tiếp Diễn',
    group: 'past',
    formula: {
      pos: 'S + had + been + V-ing',
      neg: 'S + had + not + been + V-ing',
      q: 'Had + S + been + V-ing?'
    },
    basicUsage: [
      'Diễn tả hành động đã xảy ra liên tục trước một thời điểm hoặc một hành động khác trong quá khứ.',
      'Nhấn mạnh vào khoảng thời gian kéo dài liên tục của hành động xảy ra trước.'
    ],
    advancedUsage: [
      'Diễn tả hành động kéo dài liên tục trong quá khứ và là nguyên nhân trực tiếp dẫn tới kết quả tại một thời điểm quá khứ.'
    ],
    signals: ['for + khoảng thời gian', 'since + mốc thời gian', 'before', 'by the time'],
    examples: [
      { en: 'She had been waiting for two hours before he arrived.', vi: 'Cô ấy đã đợi liên tục suốt 2 tiếng trước khi anh ấy đến.', type: 'basic' },
      { en: 'The road was wet because it had been raining.', vi: 'Mặt đường ướt sũng vì trời đã mưa liên tục trước đó.', type: 'basic' },
      { en: 'He was exhausted because he had been working all night.', vi: 'Anh ấy kiệt sức vì đã làm việc liên tục suốt cả đêm.', type: 'advanced' },
      { en: 'They had been playing for an hour before the game was stopped.', vi: 'Họ đã chơi được một tiếng trước khi trận đấu bị dừng lại.', type: 'advanced' }
    ]
  },
  // ─── FUTURE TENSES ───────────────────────────────────────────
  {
    id: 'future-simple',
    name: 'Future Simple',
    nameVi: 'Thì Tương Lai Đơn',
    group: 'future',
    formula: {
      pos: 'S + will + V-inf',
      neg: 'S + will + not + V-inf',
      q: 'Will + S + V-inf?'
    },
    basicUsage: [
      'Diễn tả quyết định, ý định tự phát đưa ra ngay tại thời điểm nói.',
      'Diễn tả dự đoán tương lai không có căn cứ xác thực.'
    ],
    advancedUsage: [
      'Diễn tả lời hứa (I promise...), đe dọa hoặc lời đề nghị giúp đỡ.',
      'Dùng trong câu điều kiện loại 1 (mệnh đề chính).'
    ],
    signals: ['tomorrow', 'next week/month/year', 'in the future', 'soon', 'perhaps', 'probably'],
    examples: [
      { en: 'The phone is ringing. I will answer it.', vi: 'Điện thoại đang reo. Tôi sẽ nghe máy (quyết định tức thời).', type: 'basic' },
      { en: 'I think it will rain tonight.', vi: 'Tôi nghĩ tối nay trời sẽ mưa (dự đoán chủ quan).', type: 'basic' },
      { en: 'I will help you carry these heavy bags.', vi: 'Tôi sẽ giúp bạn mang những chiếc túi nặng này.', type: 'advanced' },
      { en: 'I promise I will not tell anyone.', vi: 'Tôi hứa tôi sẽ không nói với bất kỳ ai.', type: 'advanced' }
    ]
  },
  {
    id: 'future-continuous',
    name: 'Future Continuous',
    nameVi: 'Thì Tương Lai Tiếp Diễn',
    group: 'future',
    formula: {
      pos: 'S + will + be + V-ing',
      neg: 'S + will + not + be + V-ing',
      q: 'Will + S + be + V-ing?'
    },
    basicUsage: [
      'Diễn tả hành động đang diễn ra tại một thời điểm xác định trong tương lai.',
      'Diễn tả hành động tương lai đang diễn ra thì có sự việc khác xen vào (sự việc xen vào chia hiện tại đơn).'
    ],
    advancedUsage: [
      'Diễn tả các sự kiện tương lai xảy ra như một phần của tiến trình bình thường hoặc lịch trình định sẵn.'
    ],
    signals: ['at this time tomorrow', 'at + giờ cụ thể + thời gian tương lai (at 9 AM next Sunday)', 'in the future'],
    examples: [
      { en: 'At this time tomorrow, I will be sitting on a flight to Tokyo.', vi: 'Vào giờ này ngày mai, tôi đang ngồi trên chuyến bay đi Tokyo.', type: 'basic' },
      { en: 'He will be sleeping when you come tomorrow.', vi: 'Anh ấy chắc đang ngủ khi bạn ghé qua vào ngày mai.', type: 'basic' },
      { en: 'I will be meeting the manager next week to discuss the contract.', vi: 'Tôi sẽ gặp người quản lý vào tuần tới để thảo luận về hợp đồng (theo tiến trình bình thường).', type: 'advanced' }
    ]
  },
  {
    id: 'future-perfect',
    name: 'Future Perfect',
    nameVi: 'Thì Tương Lai Hoàn Thành',
    group: 'future',
    formula: {
      pos: 'S + will + have + V3/ed',
      neg: 'S + will + not + have + V3/ed',
      q: 'Will + S + have + V3/ed?'
    },
    basicUsage: [
      'Diễn tả hành động sẽ hoàn thành trước một thời điểm hoặc hành động khác trong tương lai.'
    ],
    advancedUsage: [
      'Thường dùng để khẳng định mục tiêu hoặc hạn chót hoàn thành (deadline).'
    ],
    signals: ['by + thời gian tương lai (by tomorrow)', 'by the time', 'by the end of + thời gian'],
    examples: [
      { en: 'I will have finished my homework by 10 PM.', vi: 'Tôi sẽ hoàn thành bài tập về nhà trước 10 giờ tối.', type: 'basic' },
      { en: 'By the time you return, they will have left.', vi: 'Trước khi bạn quay lại, họ đã rời đi rồi.', type: 'basic' },
      { en: 'By the end of next month, we will have completed the project.', vi: 'Trước cuối tháng tới, chúng tôi sẽ hoàn tất dự án.', type: 'advanced' }
    ]
  },
  {
    id: 'future-perfect-continuous',
    name: 'Future Perfect Continuous',
    nameVi: 'Tương Lai Hoàn Thành Tiếp Diễn',
    group: 'future',
    formula: {
      pos: 'S + will + have + been + V-ing',
      neg: 'S + will + not + have + been + V-ing',
      q: 'Will + S + have + been + V-ing?'
    },
    basicUsage: [
      'Diễn tả hành động xảy ra và kéo dài liên tục đến một thời điểm nào đó trong tương lai.',
      'Nhấn mạnh thời gian liên tục của hành động so với mốc thời gian tương lai đó.'
    ],
    advancedUsage: [
      'Dùng để làm nổi bật thâm niên hoặc tích lũy kinh nghiệm tính đến một hạn định tương lai.'
    ],
    signals: ['by the time', 'by + thời gian tương lai + for + khoảng thời gian'],
    examples: [
      { en: 'By next month, I will have been working here for three years.', vi: 'Tính đến tháng sau, tôi đã làm việc ở đây liên tục được 3 năm.', type: 'basic' },
      { en: 'By the time he retires, he will have been teaching for 40 years.', vi: 'Trước lúc ông ấy nghỉ hưu, ông ấy đã đi dạy liên tục 40 năm.', type: 'basic' },
      { en: 'By midnight, they will have been playing music for six hours.', vi: 'Đến nửa đêm, họ sẽ chơi nhạc liên tục được 6 tiếng đồng hồ.', type: 'advanced' }
    ]
  }
];

const SPEEDRUN_QUIZZES = [
  // Present Simple
  { question: "Water ___ (boil) at 100 degrees Celsius.", options: ["boil", "boils", "is boiling", "boiled"], answer: "boils", explanation: "Đây là chân lý, sự thật hiển nhiên ở hiện tại đơn." },
  { question: "Every day, he ___ (walk) to work.", options: ["walks", "walk", "is walking", "walked"], answer: "walks", explanation: "Thói quen hàng ngày, dùng Hiện tại đơn." },
  // Present Continuous
  { question: "Listen! She ___ (sing) in the bathroom.", options: ["sings", "sang", "is singing", "will sing"], answer: "is singing", explanation: '"Listen!" chỉ hành động đang diễn ra ngay lúc nói, dùng Hiện tại tiếp diễn.' },
  { question: "Currently, we ___ (develop) a new mobile app.", options: ["develop", "developed", "are developing", "will develop"], answer: "are developing", explanation: '"Currently" chỉ hành động đang diễn ra tại thời điểm hiện tại.' },
  // Present Perfect
  { question: "I ___ (study) English since 2018.", options: ["study", "studied", "am studying", "have studied"], answer: "have studied", explanation: '"since 2018" biểu thị hành động bắt đầu ở quá khứ kéo dài đến hiện tại, dùng Hiện tại hoàn thành.' },
  { question: "This is the first time I ___ (eat) this food.", options: ["eat", "ate", "am eating", "have eaten"], answer: "have eaten", explanation: "Cấu trúc 'This is the first time...' luôn đi với Hiện tại hoàn thành." },
  // Present Perfect Continuous
  { question: "It ___ (rain) all morning. The garden is flooded.", options: ["rains", "rained", "has been raining", "is raining"], answer: "has been raining", explanation: "Mưa liên tục suốt cả buổi sáng và kết quả là vườn bị ngập, dùng Hiện tại hoàn thành tiếp diễn." },
  { question: "How long ___ you ___ (wait) for the doctor?", options: ["are/waiting", "have/been waiting", "do/wait", "did/wait"], answer: "have/been waiting", explanation: "Hỏi về thời gian hành động diễn ra liên tục đến nay, dùng Hiện tại hoàn thành tiếp diễn." },
  // Past Simple
  { question: "They ___ (buy) a new house two weeks ago.", options: ["buy", "bought", "have bought", "will buy"], answer: "bought", explanation: '"two weeks ago" chỉ mốc thời gian quá khứ đơn.' },
  { question: "In 2020, they ___ (move) to a new city.", options: ["move", "moved", "have moved", "will move"], answer: "moved", explanation: "Mốc thời gian xác định trong quá khứ (In 2020), dùng Quá khứ đơn." },
  // Past Continuous
  { question: "I ___ (watch) TV at 9 PM last night when you called.", options: ["watched", "was watching", "have watched", "will watch"], answer: "was watching", explanation: "Hành động đang diễn ra tại một mốc thời gian quá khứ (9 PM last night) thì việc khác xen vào, dùng Quá khứ tiếp diễn." },
  { question: "While we ___ (study), they were playing football.", options: ["study", "studied", "are studying", "were studying"], answer: "were studying", explanation: "Hai hành động diễn ra song song cùng một lúc trong quá khứ, dùng Quá khứ tiếp diễn." },
  // Past Perfect
  { question: "The train ___ (leave) before we arrived at the station.", options: ["leaves", "left", "had left", "has left"], answer: "had left", explanation: "Hành động xảy ra và hoàn tất trước một hành động quá khứ khác (arrived), dùng Quá khứ hoàn thành." },
  { question: "After she ___ (finish) her homework, she went to bed.", options: ["finishes", "had finished", "finished", "has finished"], answer: "had finished", explanation: "Hành động hoàn thành trước khi đi ngủ, dùng Quá khứ hoàn thành." },
  // Past Perfect Continuous
  { question: "She ___ (wait) for two hours before he finally arrived.", options: ["waited", "was waiting", "had been waiting", "has been waiting"], answer: "had been waiting", explanation: "Hành động chờ đợi diễn ra liên tục trước hành động đến của anh ấy trong quá khứ, dùng Quá khứ hoàn thành tiếp diễn." },
  // Future Simple
  { question: "The phone is ringing. I ___ (answer) it.", options: ["answer", "answered", "will answer", "have answered"], answer: "will answer", explanation: "Quyết định đưa ra tức thời ngay tại thời điểm nói, dùng Tương lai đơn." },
  { question: "I promise I ___ (call) you tonight.", options: ["call", "called", "will call", "have called"], answer: "will call", explanation: "Lời hứa (promise) chia ở tương lai đơn." },
  // Future Continuous
  { question: "At this time tomorrow, we ___ (fly) to London.", options: ["fly", "will be flying", "are flying", "will fly"], answer: "will be flying", explanation: "Hành động đang diễn ra tại một thời điểm cụ thể trong tương lai, dùng Tương lai tiếp diễn." },
  // Future Perfect
  { question: "By 10 PM, I ___ (finish) my homework.", options: ["finish", "will finish", "will have finished", "have finished"], answer: "will have finished", explanation: '"By 10 PM" biểu thị mốc tương lai hoàn thành, hành động sẽ xong trước mốc đó.' },
  { question: "By the end of next month, they ___ (complete) the building.", options: ["complete", "will complete", "will have completed", "have completed"], answer: "will have completed", explanation: "Hành động sẽ hoàn tất trước một thời hạn tương lai, dùng Tương lai hoàn thành." },
  // Future Perfect Continuous
  { question: "By next month, I ___ (work) here for three years.", options: ["will be working", "will have been working", "have worked", "work"], answer: "will have been working", explanation: "Hành động kéo dài liên tục đến một mốc thời gian trong tương lai, dùng Tương lai hoàn thành tiếp diễn." }
];

export default function TensesPage() {
  const { user } = useAuth();
  
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'theory' | 'grader' | 'speedrun'>('theory');
  
  // Theory Tab state
  const [selectedTense, setSelectedTense] = useState<TenseDetail>(TENSES_DATA[0]);
  
  // Grader Tab state
  const [targetTense, setTargetTense] = useState<string>(TENSES_DATA[0].name);
  const [userSentence, setUserSentence] = useState<string>('');
  const [checkingGrammar, setCheckingGrammar] = useState<boolean>(false);
  const [graderResult, setGraderResult] = useState<{
    isCorrect: boolean;
    score: number;
    correctedText: string;
    explanation: string;
  } | null>(null);

  // Speedrun Game states
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [gameTime, setGameTime] = useState<number>(30);
  const [gameScore, setGameScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [lastScore, setLastScore] = useState<number | null>(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerFeedback, setAnswerFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [shuffledQuizzes, setShuffledQuizzes] = useState<typeof SPEEDRUN_QUIZZES>([]);

  const gameTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Persistence for high score
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedScore = localStorage.getItem('tense_speedrun_highscore');
      if (savedScore) setHighScore(Number(savedScore));
    }
  }, []);

  // Timer loop for Speedrun Game
  useEffect(() => {
    if (gameActive) {
      gameTimerRef.current = setInterval(() => {
        setGameTime(prev => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    };
  }, [gameActive]);

  // End game detector when gameTime hits 0
  useEffect(() => {
    if (gameActive && gameTime <= 0) {
      endGame();
    }
  }, [gameTime, gameActive]);

  // Audio synthesis feedback
  const playSoundEffect = (type: 'correct' | 'incorrect' | 'gameover') => {
    if (typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'correct') {
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === 'incorrect') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(250, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(120, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'gameover') {
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(150, ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      }
    } catch (e) {
      console.warn("Failed to play dynamic audio synthesize:", e);
    }
  };

  // Start Speedrun Game
  const startGame = () => {
    const shuffled = [...SPEEDRUN_QUIZZES].sort(() => Math.random() - 0.5);
    setShuffledQuizzes(shuffled);
    setCurrentQuizIndex(0);
    setGameScore(0);
    setGameTime(30);
    setSelectedAnswer(null);
    setAnswerFeedback(null);
    setLastScore(null);
    setGameActive(true);
  };

  // End Speedrun Game
  const endGame = () => {
    setGameActive(false);
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    playSoundEffect('gameover');
    setLastScore(gameScore);
    setHighScore(prev => {
      const nextScore = Math.max(prev, gameScore);
      localStorage.setItem('tense_speedrun_highscore', String(nextScore));
      return nextScore;
    });
  };

  // Handle Answer in Speedrun Game
  const handleAnswerSubmit = (option: string) => {
    if (selectedAnswer || !gameActive) return;
    setSelectedAnswer(option);
    const currentQuiz = shuffledQuizzes[currentQuizIndex];
    
    if (option === currentQuiz.answer) {
      setAnswerFeedback('correct');
      setGameScore(prev => prev + 10);
      setGameTime(prev => prev + 3); // Add 3 seconds
      playSoundEffect('correct');
    } else {
      setAnswerFeedback('incorrect');
      setGameTime(prev => Math.max(0, prev - 5)); // Subtract 5 seconds
      playSoundEffect('incorrect');
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setAnswerFeedback(null);
      if (currentQuizIndex < shuffledQuizzes.length - 1) {
        setCurrentQuizIndex(prev => prev + 1);
      } else {
        const shuffled = [...SPEEDRUN_QUIZZES].sort(() => Math.random() - 0.5);
        setShuffledQuizzes(shuffled);
        setCurrentQuizIndex(0);
      }
    }, 1550);
  };

  // Handle Grammar Verification
  const verifyGrammar = async () => {
    if (!user || checkingGrammar || !userSentence.trim()) {
      if (!user) alert('Vui lòng đăng nhập để sử dụng tính năng kiểm tra với AI!');
      return;
    }
    setCheckingGrammar(true);
    setGraderResult(null);
    try {
      const token = await user.getIdToken();
      const res = await fetch(`${API_BASE}/ai/verify-grammar-tense`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ tenseName: targetTense, userSentence })
      });
      if (res.ok) {
        const data = await res.json();
        setGraderResult(data);
      } else {
        alert('Kiểm tra thất bại. Vui lòng thử lại!');
      }
    } catch (e) {
      console.error(e);
      alert('Không thể kết nối máy chủ AI.');
    } finally {
      setCheckingGrammar(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Panel */}
      <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-gradient-to-tr from-emerald-500 to-teal-600 text-white rounded-2xl shadow-md">
            <Clock className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-800 flex items-center gap-2">
              12 Tenses AI Portal <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500 animate-pulse" />
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">
              Hệ thống chuyên biệt nghiên cứu 12 thì tiếng Anh toàn diện từ cơ bản đến nâng cao, tích hợp chấm điểm AI và phản xạ nhanh.
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl">
          {[
            { id: 'theory' as const, label: 'Lý Thuyết & So Sánh', icon: BookOpen },
            { id: 'grader' as const, label: 'Cố Vấn AI Tenses', icon: Sparkles },
            { id: 'speedrun' as const, label: 'Tense Speedrun ⚡', icon: Timer }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => {
                setActiveTab(t.id);
                if (t.id !== 'speedrun') endGame();
              }}
              className={cn(
                "px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all",
                activeTab === t.id 
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>
      </header>

      {/* ────────────────── Tab 1: THEORY & COMPARISON ────────────────── */}
      {activeTab === 'theory' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Tense selector sidebar grouped by present, past, future */}
          <div className="lg:col-span-1 space-y-4">
            {/* Present Group */}
            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-3">
              <h3 className="font-black text-blue-500 text-[10px] uppercase tracking-widest border-b pb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Hiện Tại (Present)
              </h3>
              <div className="space-y-1">
                {TENSES_DATA.filter(t => t.group === 'present').map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTense(t)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-xl transition-all font-bold text-xs border flex items-center justify-between",
                      selectedTense.id === t.id
                        ? "bg-emerald-50 text-emerald-850 border-emerald-100 shadow-sm"
                        : "bg-white text-slate-600 border-slate-50 hover:bg-slate-55"
                    )}
                  >
                    <span>{t.nameVi}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Past Group */}
            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-3">
              <h3 className="font-black text-rose-500 text-[10px] uppercase tracking-widest border-b pb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Quá Khứ (Past)
              </h3>
              <div className="space-y-1">
                {TENSES_DATA.filter(t => t.group === 'past').map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTense(t)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-xl transition-all font-bold text-xs border flex items-center justify-between",
                      selectedTense.id === t.id
                        ? "bg-emerald-50 text-emerald-850 border-emerald-100 shadow-sm"
                        : "bg-white text-slate-600 border-slate-50 hover:bg-slate-55"
                    )}
                  >
                    <span>{t.nameVi}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Future Group */}
            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-3">
              <h3 className="font-black text-purple-500 text-[10px] uppercase tracking-widest border-b pb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Tương Lai (Future)
              </h3>
              <div className="space-y-1">
                {TENSES_DATA.filter(t => t.group === 'future').map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTense(t)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-xl transition-all font-bold text-xs border flex items-center justify-between",
                      selectedTense.id === t.id
                        ? "bg-emerald-50 text-emerald-850 border-emerald-100 shadow-sm"
                        : "bg-white text-slate-600 border-slate-50 hover:bg-slate-55"
                    )}
                  >
                    <span>{t.nameVi}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
              {/* Title */}
              <div>
                <span className={cn(
                  "px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-wider",
                  selectedTense.group === 'present' ? "bg-blue-100 text-blue-800" :
                  selectedTense.group === 'past' ? "bg-rose-100 text-rose-800" : "bg-purple-100 text-purple-800"
                )}>
                  {selectedTense.name} · {selectedTense.group === 'present' ? 'Hiện Tại' : selectedTense.group === 'past' ? 'Quá khứ' : 'Tương lai'}
                </span>
                <h2 className="text-3xl font-black text-slate-800 mt-2">{selectedTense.nameVi}</h2>
              </div>

              {/* Formulas bento grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Khẳng định (+)</span>
                  <p className="text-sm font-black text-slate-800 font-mono">{selectedTense.formula.pos}</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Phủ định (-)</span>
                  <p className="text-sm font-black text-slate-800 font-mono">{selectedTense.formula.neg}</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Nghi vấn (?)</span>
                  <p className="text-sm font-black text-slate-800 font-mono">{selectedTense.formula.q}</p>
                </div>
              </div>

              {/* Basic and Advanced usage */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-black text-slate-800 text-md flex items-center gap-2 border-b pb-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    Cách Dùng Cơ Bản
                  </h4>
                  <ul className="space-y-3">
                    {selectedTense.basicUsage.map((u, i) => (
                      <li key={i} className="text-slate-600 text-sm leading-relaxed flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center flex-shrink-0 text-xs mt-0.5">{i+1}</span>
                        <span>{u}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-black text-slate-800 text-md flex items-center gap-2 border-b pb-2">
                    <Sparkles className="w-5 h-5 text-indigo-500" />
                    Cách Dùng Nâng Cao
                  </h4>
                  <ul className="space-y-3">
                    {selectedTense.advancedUsage.map((u, i) => (
                      <li key={i} className="text-slate-600 text-sm leading-relaxed flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center flex-shrink-0 text-xs mt-0.5">{i+1}</span>
                        <span>{u}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Signals */}
              <div className="bg-amber-50/50 border border-amber-100 p-5 rounded-2xl space-y-2">
                <h4 className="text-amber-800 font-black text-xs uppercase tracking-wider">Trạng từ / Dấu hiệu nhận biết</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTense.signals.map(s => (
                    <span key={s} className="px-3 py-1 bg-white border border-amber-100 rounded-lg text-xs font-semibold text-amber-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Examples comparing */}
              <div className="space-y-4">
                <h4 className="font-black text-slate-800 text-md border-b pb-2">Ví dụ trực quan so sánh</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedTense.examples.map((ex, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "p-4 rounded-2xl border transition-all",
                        ex.type === 'basic' 
                          ? "border-emerald-100 bg-emerald-50/20 hover:border-emerald-300"
                          : "border-indigo-100 bg-indigo-50/10 hover:border-indigo-300"
                      )}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className={cn(
                          "text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider",
                          ex.type === 'basic' ? "bg-emerald-100 text-emerald-800" : "bg-indigo-100 text-indigo-800"
                        )}>
                          {ex.type === 'basic' ? 'Cơ bản' : 'Nâng cao'}
                        </span>
                      </div>
                      <p className="font-bold text-slate-800 text-base leading-snug">{ex.en}</p>
                      <p className="text-slate-500 text-xs mt-1.5 font-medium italic">{ex.vi}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────── Tab 2: AI TENSE GRADER ────────────────── */}
      {activeTab === 'grader' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form container */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2 border-b pb-3">
                <Sparkles className="w-5 h-5 text-emerald-500" />
                Kiểm tra câu viết của bạn cùng AI (12 Thì)
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2">1. Chọn thì bạn muốn viết</label>
                  <select 
                    value={targetTense}
                    onChange={(e) => setTargetTense(e.target.value)}
                    className="w-full p-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-primary text-sm font-bold bg-white"
                  >
                    {TENSES_DATA.map(t => (
                      <option key={t.name} value={t.name}>{t.nameVi} ({t.name})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2">2. Nhập câu tiếng Anh bạn tự viết</label>
                  <textarea
                    rows={4}
                    placeholder={`Ví dụ: She had been working for five hours before the meeting started...`}
                    value={userSentence}
                    onChange={(e) => setUserSentence(e.target.value)}
                    className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:border-primary text-base font-medium resize-none"
                  />
                </div>

                <button
                  onClick={verifyGrammar}
                  disabled={checkingGrammar || !userSentence.trim()}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-indigo-650 hover:from-emerald-600 hover:to-indigo-700 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {checkingGrammar ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Đang phân tích cấu trúc...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Kiểm Tra Ngữ Pháp & Chia Thì Với AI
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Results workspace */}
            {graderResult && (
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6 animate-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between border-b pb-4">
                  <h3 className="font-black text-slate-800 text-lg">Kết quả phân tích</h3>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider",
                      graderResult.isCorrect ? "bg-green-100 text-green-800" : "bg-rose-100 text-rose-800"
                    )}>
                      {graderResult.isCorrect ? 'Chính Xác' : 'Cần Chỉnh Sửa'}
                    </span>
                    <span className="text-2xl font-black text-slate-800">{graderResult.score}/100đ</span>
                  </div>
                </div>

                {/* Compare sentence */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase">Câu của bạn</span>
                    <p className="text-slate-700 font-bold leading-relaxed">{userSentence}</p>
                  </div>
                  <div className="p-4 bg-emerald-50/30 border border-emerald-100 rounded-2xl space-y-1.5">
                    <span className="text-[10px] font-black text-emerald-700 uppercase">Bản gợi ý từ AI</span>
                    <p className="text-emerald-950 font-black leading-relaxed">{graderResult.correctedText}</p>
                  </div>
                </div>

                {/* Explanation text */}
                <div className="p-5 bg-indigo-50/20 border border-indigo-100 rounded-2xl space-y-2">
                  <h4 className="text-indigo-950 font-black text-sm flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-indigo-500" /> Giải thích quy tắc & Nhận xét
                  </h4>
                  <p className="text-slate-650 text-sm leading-relaxed whitespace-pre-line font-medium">
                    {graderResult.explanation}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Grammar Tips Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <h3 className="font-black text-slate-800 text-md flex items-center gap-2 border-b pb-2">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                Mẹo chia thì từ AI
              </h3>
              <ul className="space-y-3.5 text-xs text-slate-550 leading-relaxed font-semibold">
                <li className="flex gap-2">
                  <span className="text-emerald-500 flex-shrink-0">✔</span>
                  <span><strong>Đọc kỹ trạng từ chỉ thời gian</strong>: Dấu hiệu chính xác giúp lựa chọn thì chuẩn.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500 flex-shrink-0">✔</span>
                  <span><strong>Chú ý chủ ngữ số ít/số nhiều</strong>: Tránh lỗi sơ đẳng như quên thêm "s/es" hoặc dùng nhầm "has/have".</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500 flex-shrink-0">✔</span>
                  <span><strong>Không dùng tiếp diễn với State Verbs</strong>: Các động từ trạng thái cảm xúc, nhận thức (know, believe, love, hate) hiếm khi chia ở tiếp diễn.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500 flex-shrink-0">✔</span>
                  <span><strong>Since và For</strong>: Mốc thời gian (since 2018) vs Khoảng thời gian (for 5 years) trong Hiện tại hoàn thành.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────── Tab 3: TENSE SPEEDRUN GAME ────────────────── */}
      {activeTab === 'speedrun' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8 relative overflow-hidden">
            {/* Background design */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            {!gameActive ? (
              lastScore !== null ? (
                // Results screen
                <div className="text-center space-y-6 py-6 relative z-10">
                  <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto shadow-md">
                    <Award className="w-10 h-10 animate-bounce text-yellow-500 fill-yellow-500" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-slate-800">Kết Thúc Thử Thách!</h2>
                    <p className="text-slate-500 text-sm">
                      Thời gian đã hết! Bạn đã hoàn thành xuất sắc thử thách phản xạ ngữ pháp.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-sm font-black">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center">
                      <span className="text-[10px] text-slate-400 uppercase">Điểm Vừa Đạt</span>
                      <span className="text-2xl font-black text-emerald-600 mt-1">{lastScore}đ</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center">
                      <span className="text-[10px] text-slate-400 uppercase">Kỷ Lục Cá Nhân</span>
                      <span className="text-2xl font-black text-amber-600 mt-1">{highScore}đ</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
                    <button
                      onClick={startGame}
                      className="w-full py-3 bg-gradient-to-r from-emerald-500 to-indigo-650 hover:from-emerald-600 hover:to-indigo-700 text-white rounded-2xl font-black text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      CHƠI LẠI ⚡
                    </button>
                    <button
                      onClick={() => setLastScore(null)}
                      className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-black text-sm transition-all active:scale-95 cursor-pointer"
                    >
                      QUAY LẠI
                    </button>
                  </div>
                </div>
              ) : (
                // Start screen
                <div className="text-center space-y-6 py-6 relative z-10">
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-md">
                    <Timer className="w-10 h-10 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-slate-800">Tense Speedrun ⚡ (12 Thì)</h2>
                    <p className="text-slate-500 text-sm max-w-md mx-auto">
                      Thử thách phản xạ chia động từ nhanh trong vòng 30 giây. Mỗi câu đúng cộng 3 giây, câu sai bị trừ 5 giây. Đạt điểm cao nhất có thể!
                    </p>
                  </div>

                  <div className="flex justify-center gap-6 text-sm font-black text-slate-700">
                    <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      Kỷ Lục: <span className="text-emerald-600 text-lg font-black">{highScore}đ</span>
                    </div>
                  </div>

                  <button
                    onClick={startGame}
                    className="px-10 py-3.5 bg-gradient-to-r from-emerald-500 to-indigo-650 hover:from-emerald-600 hover:to-indigo-700 text-white rounded-2xl font-black text-sm shadow-lg shadow-emerald-500/10 flex items-center gap-2 mx-auto transition-transform active:scale-95 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    BẮT ĐẦU CHƠI NGAY
                  </button>
                </div>
              )
            ) : (
              // Game playing screen
              <div className="space-y-6 relative z-10">
                {/* Stats Header bar */}
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-2">
                    <Timer className={cn("w-5 h-5", gameTime <= 10 ? "text-rose-500 animate-bounce" : "text-emerald-500")} />
                    <span className={cn("text-lg font-black tabular-nums", gameTime <= 10 ? "text-rose-500" : "text-slate-700")}>
                      {gameTime} giây
                    </span>
                  </div>
                  <div className="text-slate-600 font-bold text-sm">
                    Câu số: <span className="text-slate-800 font-black">{currentQuizIndex + 1}</span>
                  </div>
                  <div className="text-sm font-black text-emerald-600">
                    Điểm: <span className="text-lg font-black">{gameScore}đ</span>
                  </div>
                </div>

                {/* Progress bar timer */}
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full transition-all duration-1000",
                      gameTime <= 10 ? "bg-rose-500" : "bg-emerald-500"
                    )}
                    style={{ width: `${(gameTime / 45) * 100}%` }}
                  />
                </div>

                {/* Question panel */}
                <div className="bg-slate-50 border border-slate-150 p-6 rounded-2xl text-center min-h-[100px] flex items-center justify-center">
                  <p className="text-lg font-bold text-slate-800 tracking-wide select-none">
                    {shuffledQuizzes[currentQuizIndex]?.question}
                  </p>
                </div>

                {/* Answer Buttons options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {shuffledQuizzes[currentQuizIndex]?.options.map(option => {
                    const isSelected = selectedAnswer === option;
                    const isCorrectOption = option === shuffledQuizzes[currentQuizIndex].answer;
                    
                    return (
                      <button
                        key={option}
                        onClick={() => handleAnswerSubmit(option)}
                        disabled={selectedAnswer !== null}
                        className={cn(
                          "p-4 rounded-2xl border-2 text-center text-sm font-bold transition-all active:scale-95",
                          selectedAnswer === null
                            ? "bg-white border-slate-100 hover:border-emerald-500 hover:bg-emerald-50/10 text-slate-700"
                            : isSelected && answerFeedback === 'correct'
                            ? "bg-green-50 border-green-500 text-green-700 scale-[1.02]"
                            : isSelected && answerFeedback === 'incorrect'
                            ? "bg-rose-50 border-rose-500 text-rose-700 scale-[0.98]"
                            : isCorrectOption && selectedAnswer !== null
                            ? "bg-green-50 border-green-400 text-green-700"
                            : "bg-white border-slate-50 text-slate-400 opacity-40"
                        )}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Panel */}
                {answerFeedback && (
                  <div className={cn(
                    "p-4 rounded-2xl text-center font-black animate-in zoom-in duration-300",
                    answerFeedback === 'correct' ? "bg-green-50 text-green-700" : "bg-rose-50 text-rose-700"
                  )}>
                    {answerFeedback === 'correct' ? (
                      <span>+10 Điểm · Đúng Rồi! (+3s) 🎉</span>
                    ) : (
                      <div className="space-y-1">
                        <span>Sai Rồi (-5s) ❌</span>
                        <p className="text-xs font-semibold text-rose-600/80 leading-normal italic">
                          Đáp án đúng là "{shuffledQuizzes[currentQuizIndex]?.answer}". {shuffledQuizzes[currentQuizIndex]?.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
