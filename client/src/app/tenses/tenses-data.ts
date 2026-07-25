// ─── Tenses Data Module ─────────────────────────────────────────
// Extracted from page.tsx for code splitting & faster page load.

export interface TenseDetail {
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

export const TENSES_DATA: TenseDetail[] = [
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

export const SPEEDRUN_QUIZZES = [
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

// Tense groups for DRY sidebar rendering
export const TENSE_GROUPS = [
  { key: 'present' as const, label: 'Hiện Tại (Present)', colorClass: 'text-blue-500' },
  { key: 'past' as const, label: 'Quá Khứ (Past)', colorClass: 'text-rose-500' },
  { key: 'future' as const, label: 'Tương Lai (Future)', colorClass: 'text-purple-500' },
] as const;
