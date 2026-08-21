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
    imageDescription: 'Văn phòng hiện đại với bàn ghế làm việc được sắp xếp ngăn nắp',
    audioScript: 'A. Office chairs are arranged around desks in a workspace. B. People are cooking in a restaurant kitchen. C. The workers are repairing a car. D. The building is under construction.',
    choices: [
      'A. Office chairs are arranged around desks in a workspace.',
      'B. People are cooking in a restaurant kitchen.',
      'C. The workers are repairing a car.',
      'D. The building is under construction.'
    ],
    correctAnswer: 0,
    explanation: 'The photo shows office chairs arranged around computer workstations in a modern office, matching choice A.',
    explanationVi: 'Hình ảnh cho thấy ghế văn phòng được sắp xếp quanh các bàn làm việc trong một văn phòng hiện đại, phù hợp với đáp án A.'
  },
  {
    id: 2,
    type: 'photo',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop',
    imageDescription: 'Một nhà hàng sang trọng với đĩa thức ăn và ly nước trên bàn',
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
    imageDescription: 'Một chiếc máy bay phản lực đang bay trên bầu trời xanh',
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
    imageDescription: 'Một nhóm đồng nghiệp đang thảo luận và họp trong phòng họp',
    audioScript: 'A. Everyone is sleeping in the room. B. People are attending a meeting. C. The room is being painted. D. Students are taking an exam.',
    choices: [
      'A. Everyone is sleeping in the room.',
      'B. People are attending a meeting.',
      'C. The room is being painted.',
      'D. Students are taking an exam.'
    ],
    correctAnswer: 1,
    explanation: 'The photo shows a group of professionals attending a meeting, which matches choice B.',
    explanationVi: 'Hình ảnh cho thấy một nhóm chuyên gia đang họp và trao đổi công việc trong phòng họp, phù hợp với đáp án B.'
  },
  {
    id: 5,
    type: 'photo',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop',
    imageDescription: 'Một người đàn ông đang mỉm cười tự tin nhìn vào ống kính',
    audioScript: 'A. The man is crying sadly. B. The man is smiling confidently. C. The man is running in the park. D. The man is cooking in the kitchen.',
    choices: [
      'A. The man is crying sadly.',
      'B. The man is smiling confidently.',
      'C. The man is running in the park.',
      'D. The man is cooking in the kitchen.'
    ],
    correctAnswer: 1,
    explanation: 'The photograph shows a man with a confident smile looking at the camera, matching choice B.',
    explanationVi: 'Hình ảnh cho thấy một người đàn ông đang mỉm cười tự tin, phù hợp với đáp án B.'
  },
  {
    id: 6,
    type: 'photo',
    imageUrl: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=600&auto=format&fit=crop',
    imageDescription: 'Rau củ và nguyên liệu tươi ngon được bày trên thớt gỗ trong bếp',
    audioScript: 'A. Books are stacked on a library shelf. B. Fresh vegetables and ingredients are arranged on a wooden board. C. Clothes are hanging in a wardrobe. D. Electronic devices are on display.',
    choices: [
      'A. Books are stacked on a library shelf.',
      'B. Fresh vegetables and ingredients are arranged on a wooden board.',
      'C. Clothes are hanging in a wardrobe.',
      'D. Electronic devices are on display.'
    ],
    correctAnswer: 1,
    explanation: 'The image shows fresh cooking ingredients and vegetables laid out on a wooden cutting board, matching choice B.',
    explanationVi: 'Hình ảnh cho thấy nguyên liệu nấu ăn và rau củ tươi ngon được bày biện trên thớt gỗ, phù hợp với đáp án B.'
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
    imageDescription: 'Nội thất nhà hàng với ánh sáng ấm cúng và bàn ghế ăn',
    audioScript: 'A. The gym is crowded with people. B. A restaurant dining hall has warm lighting. C. The library shelves are filled with books. D. Construction workers are building a wall.',
    choices: [
      'A. The gym is crowded with people.',
      'B. A restaurant dining hall has warm lighting.',
      'C. The library shelves are filled with books.',
      'D. Construction workers are building a wall.'
    ],
    correctAnswer: 1,
    explanation: 'The photograph shows a restaurant interior with dining tables and warm ambient lighting, matching choice B.',
    explanationVi: 'Hình ảnh cho thấy nội thất nhà hàng với ánh sáng ấm cúng và các bàn ăn, phù hợp với đáp án B.'
  },
  {
    id: 9,
    type: 'photo',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop',
    imageDescription: 'Một kỹ sư/nhà nghiên cứu đang làm việc trong phòng lab',
    audioScript: 'A. A scientist is conducting research in a laboratory. B. A musician is playing guitar on stage. C. A farmer is harvesting crops. D. A pilot is flying an airplane.',
    choices: [
      'A. A scientist is conducting research in a laboratory.',
      'B. A musician is playing guitar on stage.',
      'C. A farmer is harvesting crops.',
      'D. A pilot is flying an airplane.'
    ],
    correctAnswer: 0,
    explanation: 'The photo shows a scientist working in a laboratory environment, which matches choice A.',
    explanationVi: 'Hình ảnh cho thấy một nhà khoa học đang làm việc trong môi trường phòng thí nghiệm, phù hợp với đáp án A.'
  },
  {
    id: 10,
    type: 'photo',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&auto=format&fit=crop',
    imageDescription: 'Mô hình một ngôi nhà nhỏ và chùm chìa khóa đặt trên mặt bàn gỗ',
    audioScript: 'A. A key ring is placed next to a small model house on a table. B. People are shopping in a busy supermarket. C. The hotel has an outdoor swimming pool. D. The factory is producing electronic components.',
    choices: [
      'A. A key ring is placed next to a small model house on a table.',
      'B. People are shopping in a busy supermarket.',
      'C. The hotel has an outdoor swimming pool.',
      'D. The factory is producing electronic components.'
    ],
    correctAnswer: 0,
    explanation: 'The photo shows a metal key ring lying right beside a small miniature model house on a wooden table, perfectly matching choice A.',
    explanationVi: 'Hình ảnh thể hiện rõ chùm chìa khóa kim loại đặt cạnh một mô hình ngôi nhà nhỏ trên mặt bàn gỗ, hoàn toàn khớp với đáp án A.'
  },
  {
    id: 11,
    type: 'photo',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop',
    imageDescription: 'Một phụ nữ trẻ đang mỉm cười nhìn vào ống kính',
    audioScript: 'A. The woman is reading a newspaper. B. The woman is looking at the camera. C. The woman is driving a car. D. The woman is washing dishes.',
    choices: [
      'A. The woman is reading a newspaper.',
      'B. The woman is looking at the camera.',
      'C. The woman is driving a car.',
      'D. The woman is washing dishes.'
    ],
    correctAnswer: 1,
    explanation: 'The photograph shows a young woman looking directly at the camera, matching choice B.',
    explanationVi: 'Hình ảnh cho thấy một phụ nữ trẻ đang nhìn thẳng vào máy ảnh, phù hợp với đáp án B.'
  },
  {
    id: 12,
    type: 'photo',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop',
    imageDescription: 'Một nhóm người đang thảo luận xung quanh các máy tính xách tay',
    audioScript: 'A. People are exercising at the gym. B. A team is collaborating around laptops. C. Students are taking a written test. D. Workers are unloading a truck.',
    choices: [
      'A. People are exercising at the gym.',
      'B. A team is collaborating around laptops.',
      'C. Students are taking a written test.',
      'D. Workers are unloading a truck.'
    ],
    correctAnswer: 1,
    explanation: 'The image shows colleagues collaborating together with laptops on the table, matching choice B.',
    explanationVi: 'Hình ảnh cho thấy các đồng nghiệp đang làm việc và thảo luận cùng máy tính xách tay trên bàn, phù hợp với đáp án B.'
  },
  {
    id: 13,
    type: 'photo',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop',
    imageDescription: 'Tách cà phê và máy pha cà phê trong quán cà phê',
    audioScript: 'A. A cup of coffee is served on the counter. B. Someone is painting a bicycle. C. The train has left the platform. D. Children are running in the school yard.',
    choices: [
      'A. A cup of coffee is served on the counter.',
      'B. Someone is painting a bicycle.',
      'C. The train has left the platform.',
      'D. Children are running in the school yard.'
    ],
    correctAnswer: 0,
    explanation: 'The photograph shows a fresh cup of coffee served in a cafe setting, matching choice A.',
    explanationVi: 'Hình ảnh cho thấy một tách cà phê thơm ngon được phục vụ trên quầy trong quán cà phê, phù hợp với đáp án A.'
  },
  {
    id: 14,
    type: 'photo',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&auto=format&fit=crop',
    imageDescription: 'Các dãy kệ sách cao chứa đầy sách trong thư viện',
    audioScript: 'A. Planes are lined up on the runway. B. Books are neatly arranged on tall library shelves. C. People are sunbathing on the beach. D. The chef is cutting vegetables.',
    choices: [
      'A. Planes are lined up on the runway.',
      'B. Books are neatly arranged on tall library shelves.',
      'C. People are sunbathing on the beach.',
      'D. The chef is cutting vegetables.'
    ],
    correctAnswer: 1,
    explanation: 'The photo shows rows of tall bookshelves packed with books in a quiet library, matching choice B.',
    explanationVi: 'Hình ảnh cho thấy những dãy kệ sách cao đầy sách được sắp xếp ngăn nắp trong thư viện, phù hợp với đáp án B.'
  },
  {
    id: 15,
    type: 'photo',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&auto=format&fit=crop',
    imageDescription: 'Rừng thông cao vút trong ánh nắng bình minh',
    audioScript: 'A. Tall pine trees stand in a misty forest. B. Cars are stuck in heavy traffic. C. A cruise ship is docking at the port. D. Workers are cleaning the glass windows.',
    choices: [
      'A. Tall pine trees stand in a misty forest.',
      'B. Cars are stuck in heavy traffic.',
      'C. A cruise ship is docking at the port.',
      'D. Workers are cleaning the glass windows.'
    ],
    correctAnswer: 0,
    explanation: 'The image depicts tall evergreen pine trees in a scenic natural forest, matching choice A.',
    explanationVi: 'Hình ảnh thể hiện những cây thông cao vút trong một khu rừng thiên nhiên hùng vĩ, phù hợp với đáp án A.'
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
    explanation: '"Why" asks for a reason. Choice C gives the reason (director had an emergency).',
    explanationVi: '"Why" hỏi về lý do. Đáp án C đưa ra nguyên nhân (Giám đốc có việc khẩn cấp).'
  },
  {
    id: 108,
    type: 'question-response',
    audioScript: 'Should we take a taxi or the subway to the airport?',
    choices: [
      'A. The subway is faster during rush hour.',
      'B. Yes, the airport is very large.',
      'C. My flight departs at seven.'
    ],
    correctAnswer: 0,
    explanation: 'This is an alternative question (taxi or subway). Choice A recommends the subway with a valid reason.',
    explanationVi: 'Đây là câu hỏi lựa chọn (taxi hay tàu điện ngầm). Đáp án A gợi ý tàu điện ngầm vì nhanh hơn vào giờ cao điểm.'
  },
  {
    id: 109,
    type: 'question-response',
    audioScript: 'Have you received the quarterly financial report?',
    choices: [
      'A. Yes, John emailed it to me this morning.',
      'B. The report contains twenty pages.',
      'C. The finance department is on the second floor.'
    ],
    correctAnswer: 0,
    explanation: 'Yes/No question with "Have you". Choice A directly confirms receiving it and explains how.',
    explanationVi: 'Câu hỏi Yes/No với "Have you". Đáp án A trực tiếp xác nhận đã nhận được qua email của John sáng nay.'
  },
  {
    id: 110,
    type: 'question-response',
    audioScript: 'Could you help me print these documents?',
    choices: [
      'A. The printer is currently out of paper.',
      'B. I read the documents yesterday.',
      'C. They are ten pages long.'
    ],
    correctAnswer: 0,
    explanation: 'A request for help. Choice A provides a realistic contextual response explaining a temporary obstacle.',
    explanationVi: 'Lời đề nghị giúp đỡ. Đáp án A phản hồi thực tế giải thích máy in đang hết giấy.'
  },
  {
    id: 111,
    type: 'question-response',
    audioScript: 'How much does the annual subscription cost?',
    choices: [
      'A. It renews automatically every year.',
      'B. It is ninety-nine dollars per year.',
      'C. We have subscribed for three years.'
    ],
    correctAnswer: 1,
    explanation: '"How much" asks about price. Choice B specifies the exact cost ($99/year).',
    explanationVi: '"How much" hỏi về giá cả. Đáp án B chỉ rõ giá tiền (99 đô la mỗi năm).'
  },
  {
    id: 112,
    type: 'question-response',
    audioScript: 'Isn\'t Mr. Tanaka leading the presentation today?',
    choices: [
      'A. No, Ms. Garcia will replace him.',
      'B. The presentation was very informative.',
      'C. In the conference room B.'
    ],
    correctAnswer: 0,
    explanation: 'Negative question checking information. Choice A clarifies that Ms. Garcia will replace him.',
    explanationVi: 'Câu hỏi phủ định xác nhận thông tin. Đáp án A đính chính rằng bà Garcia sẽ thay thế ông Tanaka.'
  }
];

// Combine all questions
export const ALL_TOEIC_LISTENING_QUESTIONS: ToeicListeningQuestion[] = [
  ...PHOTO_QUESTIONS,
  ...QUESTION_RESPONSE_QUESTIONS
];
