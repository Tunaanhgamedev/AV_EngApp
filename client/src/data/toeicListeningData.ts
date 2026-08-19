export interface ToeicListeningQuestion {
  id: number;
  type: 'photo' | 'question-response';
  imageUrl?: string;
  imageDescription?: string;
  audioScript: string;
  choices: string[];
  correctAnswer: number;
  explanation: string;
  explanationVi: string;
}

// ========================
// PART 1: PHOTO DESCRIPTION
// ========================
export const PHOTO_QUESTIONS: ToeicListeningQuestion[] = [
  {
    id: 1,
    type: 'photo',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop',
    imageDescription: 'Một văn phòng hiện đại với nhiều người đang làm việc trên máy tính',
    audioScript: 'A. The office is completely empty. B. People are working at their computers. C. The workers are having lunch together. D. The building is under construction.',
    choices: [
      'A. The office is completely empty.',
      'B. People are working at their computers.',
      'C. The workers are having lunch together.',
      'D. The building is under construction.'
    ],
    correctAnswer: 1,
    explanation: 'The photo shows people working at computers in a modern office, which matches choice B.',
    explanationVi: 'Hình ảnh cho thấy mọi người đang làm việc trên máy tính trong văn phòng hiện đại, phù hợp với đáp án B.'
  },
  {
    id: 2,
    type: 'photo',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop',
    imageDescription: 'Một nhà hàng sang trọng với bàn ăn được bày trí đẹp mắt',
    audioScript: 'A. The tables are set for dinner. B. People are swimming in a pool. C. The kitchen is on fire. D. Cars are parked in the lot.',
    choices: [
      'A. The tables are set for dinner.',
      'B. People are swimming in a pool.',
      'C. The kitchen is on fire.',
      'D. Cars are parked in the lot.'
    ],
    correctAnswer: 0,
    explanation: 'The image shows elegantly arranged dining tables in a restaurant, matching choice A.',
    explanationVi: 'Hình ảnh cho thấy các bàn ăn được bày trí sang trọng trong nhà hàng, phù hợp với đáp án A.'
  },
  {
    id: 3,
    type: 'photo',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop',
    imageDescription: 'Một chiếc máy bay trên bầu trời xanh',
    audioScript: 'A. The ship is sailing on the ocean. B. A train is arriving at the station. C. An airplane is flying in the sky. D. A bus is stopped at the traffic light.',
    choices: [
      'A. The ship is sailing on the ocean.',
      'B. A train is arriving at the station.',
      'C. An airplane is flying in the sky.',
      'D. A bus is stopped at the traffic light.'
    ],
    correctAnswer: 2,
    explanation: 'The photograph clearly shows an airplane in flight against a blue sky, matching choice C.',
    explanationVi: 'Hình ảnh rõ ràng cho thấy một chiếc máy bay đang bay trên bầu trời xanh, phù hợp với đáp án C.'
  },
  {
    id: 4,
    type: 'photo',
    imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&auto=format&fit=crop',
    imageDescription: 'Một nhóm người đang họp trong phòng họp',
    audioScript: 'A. Everyone is sleeping in the room. B. People are attending a meeting. C. The room is being painted. D. Students are taking an exam.',
    choices: [
      'A. Everyone is sleeping in the room.',
      'B. People are attending a meeting.',
      'C. The room is being painted.',
      'D. Students are taking an exam.'
    ],
    correctAnswer: 1,
    explanation: 'The photo shows a group of professionals in a meeting room, which matches choice B.',
    explanationVi: 'Hình ảnh cho thấy một nhóm chuyên gia trong phòng họp, phù hợp với đáp án B.'
  },
  {
    id: 5,
    type: 'photo',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop',
    imageDescription: 'Một người đàn ông đang mỉm cười tự tin',
    audioScript: 'A. The man is crying sadly. B. The man is smiling confidently. C. The man is running in the park. D. The man is cooking in the kitchen.',
    choices: [
      'A. The man is crying sadly.',
      'B. The man is smiling confidently.',
      'C. The man is running in the park.',
      'D. The man is cooking in the kitchen.'
    ],
    correctAnswer: 1,
    explanation: 'The photograph shows a man with a confident smile, matching choice B.',
    explanationVi: 'Hình ảnh cho thấy một người đàn ông đang mỉm cười tự tin, phù hợp với đáp án B.'
  },
  {
    id: 6,
    type: 'photo',
    imageUrl: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=600&auto=format&fit=crop',
    imageDescription: 'Một quầy bán hoa quả tươi ngon ở chợ',
    audioScript: 'A. Books are displayed on the shelves. B. Fresh fruits are arranged at a market stall. C. Clothes are hanging on the rack. D. Electronics are on sale.',
    choices: [
      'A. Books are displayed on the shelves.',
      'B. Fresh fruits are arranged at a market stall.',
      'C. Clothes are hanging on the rack.',
      'D. Electronics are on sale.'
    ],
    correctAnswer: 1,
    explanation: 'The image shows a fresh fruit stall at a market with colorful produce, matching choice B.',
    explanationVi: 'Hình ảnh cho thấy một quầy hoa quả tươi ngon với nhiều loại trái cây sặc sỡ, phù hợp với đáp án B.'
  },
  {
    id: 7,
    type: 'photo',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop',
    imageDescription: 'Không gian làm việc chung với nhiều bàn máy tính',
    audioScript: 'A. The parking lot is full of cars. B. Workers are using computers in a shared workspace. C. Children are playing in a playground. D. A chef is preparing food.',
    choices: [
      'A. The parking lot is full of cars.',
      'B. Workers are using computers in a shared workspace.',
      'C. Children are playing in a playground.',
      'D. A chef is preparing food.'
    ],
    correctAnswer: 1,
    explanation: 'The photo shows a co-working space with multiple computer workstations, matching choice B.',
    explanationVi: 'Hình ảnh cho thấy không gian làm việc chung với nhiều bàn máy tính, phù hợp với đáp án B.'
  },
  {
    id: 8,
    type: 'photo',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop',
    imageDescription: 'Nội thất nhà hàng với ánh sáng ấm cúng',
    audioScript: 'A. The gym is crowded with people. B. A restaurant interior has warm lighting. C. The library shelves are filled with books. D. Construction workers are building a wall.',
    choices: [
      'A. The gym is crowded with people.',
      'B. A restaurant interior has warm lighting.',
      'C. The library shelves are filled with books.',
      'D. Construction workers are building a wall.'
    ],
    correctAnswer: 1,
    explanation: 'The photograph shows a restaurant interior with warm, ambient lighting, matching choice B.',
    explanationVi: 'Hình ảnh cho thấy nội thất nhà hàng với ánh sáng ấm cúng, phù hợp với đáp án B.'
  },
  {
    id: 9,
    type: 'photo',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop',
    imageDescription: 'Một nhà khoa học đang làm việc trong phòng thí nghiệm',
    audioScript: 'A. A scientist is conducting research in a laboratory. B. A musician is playing guitar on stage. C. A farmer is harvesting crops. D. A pilot is flying an airplane.',
    choices: [
      'A. A scientist is conducting research in a laboratory.',
      'B. A musician is playing guitar on stage.',
      'C. A farmer is harvesting crops.',
      'D. A pilot is flying an airplane.'
    ],
    correctAnswer: 0,
    explanation: 'The photo shows a scientist working in a lab environment, which matches choice A.',
    explanationVi: 'Hình ảnh cho thấy một nhà khoa học đang làm việc trong môi trường phòng thí nghiệm, phù hợp với đáp án A.'
  },
  {
    id: 10,
    type: 'photo',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&auto=format&fit=crop',
    imageDescription: 'Một ngôi nhà nhỏ xinh xắn với sân vườn xanh mát',
    audioScript: 'A. The building is a large shopping mall. B. A small house has a green garden. C. The hotel has a swimming pool. D. The factory is producing goods.',
    choices: [
      'A. The building is a large shopping mall.',
      'B. A small house has a green garden.',
      'C. The hotel has a swimming pool.',
      'D. The factory is producing goods.'
    ],
    correctAnswer: 1,
    explanation: 'The image shows a small, charming house with a green garden area, matching choice B.',
    explanationVi: 'Hình ảnh cho thấy một ngôi nhà nhỏ xinh xắn với khu vườn xanh mát, phù hợp với đáp án B.'
  },
  {
    id: 11,
    type: 'photo',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop',
    imageDescription: 'Một phụ nữ trẻ đang mỉm cười',
    audioScript: 'A. The woman is reading a newspaper. B. The woman is smiling at the camera. C. The woman is driving a car. D. The woman is washing dishes.',
    choices: [
      'A. The woman is reading a newspaper.',
      'B. The woman is smiling at the camera.',
      'C. The woman is driving a car.',
      'D. The woman is washing dishes.'
    ],
    correctAnswer: 1,
    explanation: 'The photograph shows a young woman smiling, matching choice B.',
    explanationVi: 'Hình ảnh cho thấy một phụ nữ trẻ đang mỉm cười, phù hợp với đáp án B.'
  },
  {
    id: 12,
    type: 'photo',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop',
    imageDescription: 'Một nhóm người đang thảo luận xung quanh laptop',
    audioScript: 'A. People are exercising at the gym. B. A team is collaborating around laptops. C. Students are taking a written test. D. Workers are unloading a truck.',
    choices: [
      'A. People are exercising at the gym.',
      'B. A team is collaborating around laptops.',
      'C. Students are taking a written test.',
      'D. Workers are unloading a truck.'
    ],
    correctAnswer: 1,
    explanation: 'The image shows a team of people collaborating around laptops, matching choice B.',
    explanationVi: 'Hình ảnh cho thấy một nhóm người đang cộng tác xung quanh laptop, phù hợp với đáp án B.'
  }
];

// ========================
// PART 2: QUESTION-RESPONSE
// ========================
export const QUESTION_RESPONSE_QUESTIONS: ToeicListeningQuestion[] = [
  {
    id: 101,
    type: 'question-response',
    audioScript: 'Where is the nearest post office?',
    choices: [
      'A. It is two blocks from here, next to the bank.',
      'B. Yes, I like posting photos online.',
      'C. The office closes at five o\'clock.'
    ],
    correctAnswer: 0,
    explanation: '"Where" asks for a location. Choice A provides a specific location (two blocks away, next to the bank).',
    explanationVi: '"Where" hỏi về địa điểm. Đáp án A cung cấp vị trí cụ thể (cách 2 khu nhà, bên cạnh ngân hàng).'
  },
  {
    id: 102,
    type: 'question-response',
    audioScript: 'When does the conference start?',
    choices: [
      'A. In the main auditorium.',
      'B. It begins at nine in the morning.',
      'C. About fifty people will attend.'
    ],
    correctAnswer: 1,
    explanation: '"When" asks about time. Choice B provides a specific time (nine in the morning).',
    explanationVi: '"When" hỏi về thời gian. Đáp án B cung cấp thời gian cụ thể (9 giờ sáng).'
  },
  {
    id: 103,
    type: 'question-response',
    audioScript: 'Who is responsible for the marketing campaign?',
    choices: [
      'A. The campaign was very successful.',
      'B. Sarah from the marketing department.',
      'C. We spent about ten thousand dollars.'
    ],
    correctAnswer: 1,
    explanation: '"Who" asks about a person. Choice B identifies a specific person (Sarah from marketing).',
    explanationVi: '"Who" hỏi về người. Đáp án B xác định một người cụ thể (Sarah từ phòng marketing).'
  },
  {
    id: 104,
    type: 'question-response',
    audioScript: 'How long will the renovation take?',
    choices: [
      'A. It will be completed in about three weeks.',
      'B. The building is on Main Street.',
      'C. Yes, the renovation looks great.'
    ],
    correctAnswer: 0,
    explanation: '"How long" asks about duration. Choice A provides a timeframe (about three weeks).',
    explanationVi: '"How long" hỏi về thời lượng. Đáp án A cung cấp khoảng thời gian (khoảng 3 tuần).'
  },
  {
    id: 105,
    type: 'question-response',
    audioScript: 'Would you like to join us for lunch?',
    choices: [
      'A. The lunch menu has changed.',
      'B. Sure, that sounds great. Where are we going?',
      'C. I had breakfast at home this morning.'
    ],
    correctAnswer: 1,
    explanation: '"Would you like" is an invitation. Choice B accepts the invitation and asks a follow-up question.',
    explanationVi: '"Would you like" là lời mời. Đáp án B chấp nhận lời mời và hỏi câu tiếp theo.'
  },
  {
    id: 106,
    type: 'question-response',
    audioScript: 'What is the deadline for the project proposal?',
    choices: [
      'A. The proposal should be submitted by Friday.',
      'B. I think the project is going well.',
      'C. We have five team members.'
    ],
    correctAnswer: 0,
    explanation: '"What is the deadline" asks about a due date. Choice A provides the specific deadline (by Friday).',
    explanationVi: '"What is the deadline" hỏi về hạn chót. Đáp án A cung cấp hạn chót cụ thể (trước thứ Sáu).'
  },
  {
    id: 107,
    type: 'question-response',
    audioScript: 'Why was the meeting postponed?',
    choices: [
      'A. The meeting room is on the third floor.',
      'B. It usually lasts about one hour.',
      'C. Because the director had an emergency.'
    ],
    correctAnswer: 2,
    explanation: '"Why" asks for a reason. Choice C provides a reason with "because" (director had an emergency).',
    explanationVi: '"Why" hỏi về lý do. Đáp án C cung cấp lý do với "because" (giám đốc có việc khẩn cấp).'
  },
  {
    id: 108,
    type: 'question-response',
    audioScript: 'Have you finished reviewing the contract?',
    choices: [
      'A. Not yet, I will have it done by tomorrow.',
      'B. The contract is on page fifteen.',
      'C. I signed it last year.'
    ],
    correctAnswer: 0,
    explanation: '"Have you finished" asks about completion status. Choice A provides a status update (not yet, by tomorrow).',
    explanationVi: '"Have you finished" hỏi về trạng thái hoàn thành. Đáp án A cập nhật trạng thái (chưa xong, ngày mai sẽ xong).'
  },
  {
    id: 109,
    type: 'question-response',
    audioScript: 'Could you send me the sales report?',
    choices: [
      'A. Sales were up by twenty percent.',
      'B. Of course, I will email it to you right away.',
      'C. The report is about ten pages long.'
    ],
    correctAnswer: 1,
    explanation: '"Could you" is a polite request. Choice B agrees to fulfill the request (will email right away).',
    explanationVi: '"Could you" là yêu cầu lịch sự. Đáp án B đồng ý thực hiện yêu cầu (sẽ gửi email ngay).'
  },
  {
    id: 110,
    type: 'question-response',
    audioScript: 'How often do you travel for work?',
    choices: [
      'A. I travel to Tokyo and Seoul mostly.',
      'B. About twice a month, usually on Mondays.',
      'C. Yes, I enjoy traveling very much.'
    ],
    correctAnswer: 1,
    explanation: '"How often" asks about frequency. Choice B provides a frequency (about twice a month).',
    explanationVi: '"How often" hỏi về tần suất. Đáp án B cung cấp tần suất (khoảng 2 lần/tháng).'
  }
];

// Combined pool
export const ALL_TOEIC_LISTENING_QUESTIONS: ToeicListeningQuestion[] = [
  ...PHOTO_QUESTIONS,
  ...QUESTION_RESPONSE_QUESTIONS
];
