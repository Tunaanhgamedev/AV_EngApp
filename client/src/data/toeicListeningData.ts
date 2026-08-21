export type PhotoCategory = 'all' | 'people' | 'object' | 'scenery' | 'combined';

export interface ToeicListeningQuestion {
  id: number;
  type: 'photo' | 'question-response';
  photoCategory?: 'people' | 'object' | 'scenery' | 'combined';
  imageUrl?: string;
  imageDescription?: string;
  audioScript: string;
  choices: string[];
  correctAnswer: number;
  explanation: string;
  explanationVi: string;
  trapAnalysis?: {
    trapType: string;
    trapNoteVi: string;
  };
}

export interface ConversationQuestion {
  id: string;
  question: string;
  choices: string[];
  correctAnswer: number;
  explanation: string;
  explanationVi: string;
}

export interface ToeicConversation {
  id: number;
  title: string;
  context: string;
  speakers: { name: string; text: string; role?: string }[];
  fullAudioScript: string;
  questions: ConversationQuestion[];
  vocabHighlights: { word: string; ipa: string; meaningVi: string }[];
}

export interface ToeicTalk {
  id: number;
  title: string;
  type: 'announcement' | 'advertisement' | 'voicemail' | 'report' | 'speech';
  context: string;
  audioScript: string;
  questions: ConversationQuestion[];
  vocabHighlights: { word: string; ipa: string; meaningVi: string }[];
}

export interface ListeningTrap {
  id: string;
  title: string;
  titleVi: string;
  part: string;
  category: 'people' | 'object' | 'scenery' | 'combined' | 'part2' | 'part34';
  description: string;
  exampleBad: string;
  exampleGood: string;
  tip: string;
}

// =========================================================================
// PART 1: PHOTO DESCRIPTION (28 Verifiable Scenarios Across 4 Categories)
// =========================================================================
export const PHOTO_QUESTIONS: ToeicListeningQuestion[] = [
  // -------------------------------------------------------------
  // NHÓM 1: TRANH TẢ VẬT (OBJECTS - Đồ vật, máy móc, vị trí đồ đạc)
  // -------------------------------------------------------------
  {
    id: 1,
    type: 'photo',
    photoCategory: 'object',
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
    explanationVi: 'Hình ảnh cho thấy ghế văn phòng được sắp xếp quanh các bàn làm việc trong một văn phòng hiện đại, phù hợp với đáp án A.',
    trapAnalysis: {
      trapType: 'Bẫy hành động người trong tranh không có người',
      trapNoteVi: 'Các đáp án B, C, D đều gán ghép hành động của con người (cooking, repairing) trong khi bức tranh hoàn toàn không có người.'
    }
  },
  {
    id: 2,
    type: 'photo',
    photoCategory: 'object',
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
    explanationVi: 'Hình ảnh cho thấy nguyên liệu nấu ăn và rau củ tươi ngon được bày biện trên thớt gỗ, phù hợp với đáp án B.',
    trapAnalysis: {
      trapType: 'Bẫy danh từ đồ vật không xuất hiện trong tranh',
      trapNoteVi: 'Các phương án A (Books), C (Clothes), D (Electronics) dùng các danh từ hoàn toàn sai lệch so với đồ vật trong hình.'
    }
  },
  {
    id: 3,
    type: 'photo',
    photoCategory: 'object',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&auto=format&fit=crop',
    imageDescription: 'Mô hình một ngôi nhà nhỏ màu đỏ trắng và chùm chìa khóa đặt trên mặt bàn gỗ',
    audioScript: 'A. A key ring is placed next to a small model house on a table. B. People are shopping in a busy supermarket. C. The hotel has an outdoor swimming pool. D. The factory is producing electronic components.',
    choices: [
      'A. A key ring is placed next to a small model house on a table.',
      'B. People are shopping in a busy supermarket.',
      'C. The hotel has an outdoor swimming pool.',
      'D. The factory is producing electronic components.'
    ],
    correctAnswer: 0,
    explanation: 'The photo shows a metal key ring lying right beside a small miniature model house on a wooden table, perfectly matching choice A.',
    explanationVi: 'Hình ảnh thể hiện rõ chùm chìa khóa kim loại đặt cạnh một mô hình ngôi nhà nhỏ trên mặt bàn gỗ, hoàn toàn khớp với đáp án A.',
    trapAnalysis: {
      trapType: 'Bẫy suy diễn bất động sản/nhà thật',
      trapNoteVi: 'Đề thi thường dùng tranh mô hình để bẫy thí sinh tưởng là một ngôi nhà thật ngoài đời (Hotel, Factory, Supermarket).'
    }
  },
  {
    id: 4,
    type: 'photo',
    photoCategory: 'object',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop',
    imageDescription: 'Tách cà phê gốm trắng đặt trên quầy gỗ quán cà phê',
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
    id: 5,
    type: 'photo',
    photoCategory: 'object',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop',
    imageDescription: 'Nhà kho lớn với các thùng hàng carton xếp tầng trên kệ',
    audioScript: 'A. A mechanic is fixing a bicycle tire. B. Cardboard boxes are stacked on high warehouse shelves. C. Doctors are examining medical records. D. The airplane is flying above the clouds.',
    choices: [
      'A. A mechanic is fixing a bicycle tire.',
      'B. Cardboard boxes are stacked on high warehouse shelves.',
      'C. Doctors are examining medical records.',
      'D. The airplane is flying above the clouds.'
    ],
    correctAnswer: 1,
    explanation: 'The photo shows a spacious logistics warehouse with boxes stacked high on storage shelves, matching choice B.',
    explanationVi: 'Hình ảnh chụp một kho hàng logistics rộng lớn với các thùng hàng carton được xếp chồng trên giá kệ cao, phù hợp với đáp án B.'
  },
  {
    id: 6,
    type: 'photo',
    photoCategory: 'object',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&auto=format&fit=crop',
    imageDescription: 'Bản vẽ thiết kế kiến trúc và thước đo trải trên bàn làm việc',
    audioScript: 'A. Architectural blueprints and measuring tools are spread across a drafting table. B. People are dancing at a concert. C. A boat is sailing along a river. D. Food is being cooked in a large pot.',
    choices: [
      'A. Architectural blueprints and measuring tools are spread across a drafting table.',
      'B. People are dancing at a concert.',
      'C. A boat is sailing along a river.',
      'D. Food is being cooked in a large pot.'
    ],
    correctAnswer: 0,
    explanation: 'The image shows construction blueprints and architectural drafting tools laid out on a workspace table, matching choice A.',
    explanationVi: 'Hình ảnh cho thấy các bản vẽ thiết kế kiến trúc cùng thước đo trải dài trên bàn làm việc, phù hợp với đáp án A.'
  },
  {
    id: 7,
    type: 'photo',
    photoCategory: 'object',
    imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&auto=format&fit=crop',
    imageDescription: 'Một chiếc xe đạp dựng tựa vào bức tường gạch đỏ',
    audioScript: 'A. A bicycle is leaning against a brick wall. B. A bus is picking up passengers at a station. C. Trees are being cut down in a forest. D. Boxes are being loaded onto a truck.',
    choices: [
      'A. A bicycle is leaning against a brick wall.',
      'B. A bus is picking up passengers at a station.',
      'C. Trees are being cut down in a forest.',
      'D. Boxes are being loaded onto a truck.'
    ],
    correctAnswer: 0,
    explanation: 'The image shows a classic bicycle resting against a brick exterior wall, matching choice A.',
    explanationVi: 'Hình ảnh chụp một chiếc xe đạp đang dựng tựa vào bức tường gạch, phù hợp với đáp án A.',
    trapAnalysis: {
      trapType: 'Bẫy động từ vị trí "leaning against"',
      trapNoteVi: 'Giới từ và động từ trạng thái "is leaning against" (dựng tựa vào) là cấu trúc cực kỳ phổ biến trong TOEIC Part 1.'
    }
  },

  // -------------------------------------------------------------
  // NHÓM 2: TRANH TẢ NGƯỜI (PEOPLE - 1 người hoặc nhóm người, hành động, ánh nhìn)
  // -------------------------------------------------------------
  {
    id: 8,
    type: 'photo',
    photoCategory: 'people',
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
    id: 9,
    type: 'photo',
    photoCategory: 'people',
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
    id: 10,
    type: 'photo',
    photoCategory: 'people',
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
    id: 11,
    type: 'photo',
    photoCategory: 'people',
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
    id: 12,
    type: 'photo',
    photoCategory: 'people',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop',
    imageDescription: 'Nữ diễn giả đang trình bày và chỉ vào màn hình trước các đồng nghiệp',
    audioScript: 'A. A woman is giving a presentation in a conference room. B. Passengers are boarding a train. C. A doctor is examining a patient. D. A chef is tasting soup.',
    choices: [
      'A. A woman is giving a presentation in a conference room.',
      'B. Passengers are boarding a train.',
      'C. A doctor is examining a patient.',
      'D. A chef is tasting soup.'
    ],
    correctAnswer: 0,
    explanation: 'The image shows a woman presenting slides to audience members in a boardroom, matching choice A.',
    explanationVi: 'Hình ảnh cho thấy một phụ nữ đang thuyết trình trong phòng hội thảo, phù hợp với đáp án A.'
  },
  {
    id: 13,
    type: 'photo',
    photoCategory: 'people',
    imageUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&auto=format&fit=crop',
    imageDescription: 'Một đầu bếp chuyên nghiệp đang nêm nếm và chuẩn bị món ăn trong bếp',
    audioScript: 'A. A musician is tuning an instrument. B. A chef is preparing food in a kitchen. C. A pilot is checking radar equipment. D. A customer is paying at a register.',
    choices: [
      'A. A musician is tuning an instrument.',
      'B. A chef is preparing food in a kitchen.',
      'C. A pilot is checking radar equipment.',
      'D. A customer is paying at a register.'
    ],
    correctAnswer: 1,
    explanation: 'The photograph captures a professional chef preparing a dish inside a commercial kitchen, matching choice B.',
    explanationVi: 'Hình ảnh chụp một đầu bếp đang chuẩn bị thức ăn trong gian bếp, phù hợp với đáp án B.'
  },

  // -------------------------------------------------------------
  // NHÓM 3: TRANH TẢ PHONG CẢNH & KHÔNG GIAN (SCENERY - Thiên nhiên, kiến trúc, giao thông)
  // -------------------------------------------------------------
  {
    id: 14,
    type: 'photo',
    photoCategory: 'scenery',
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
    id: 15,
    type: 'photo',
    photoCategory: 'scenery',
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
    id: 16,
    type: 'photo',
    photoCategory: 'scenery',
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
    id: 17,
    type: 'photo',
    photoCategory: 'scenery',
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
  },
  {
    id: 18,
    type: 'photo',
    photoCategory: 'scenery',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop',
    imageDescription: 'Cây cầu thép dài bắc qua dòng sông lúc hoàng hôn',
    audioScript: 'A. A large bridge spans across a wide river. B. Chefs are preparing pastries in an oven. C. A airplane is parked inside a hangar. D. People are riding horses on a farm.',
    choices: [
      'A. A large bridge spans across a wide river.',
      'B. Chefs are preparing pastries in an oven.',
      'C. A airplane is parked inside a hangar.',
      'D. People are riding horses on a farm.'
    ],
    correctAnswer: 0,
    explanation: 'The photograph captures a magnificent suspension bridge spanning over a river, matching choice A.',
    explanationVi: 'Hình ảnh chụp một cây cầu lớn vắt ngang qua dòng sông rộng lớn, phù hợp với đáp án A.'
  },
  {
    id: 19,
    type: 'photo',
    photoCategory: 'scenery',
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=600&auto=format&fit=crop',
    imageDescription: 'Các tòa nhà cao tầng và dòng xe cộ lưu thông trên đại lộ thành phố',
    audioScript: 'A. Vehicles are moving along a busy city avenue. B. Children are building sandcastles on a beach. C. An athlete is swimming in an Olympic pool. D. A farmer is driving a tractor through a field.',
    choices: [
      'A. Vehicles are moving along a busy city avenue.',
      'B. Children are building sandcastles on a beach.',
      'C. An athlete is swimming in an Olympic pool.',
      'D. A farmer is driving a tractor through a field.'
    ],
    correctAnswer: 0,
    explanation: 'The cityscape photo shows cars traveling on a multilane urban road flanked by skyscrapers, matching choice A.',
    explanationVi: 'Hình ảnh đô thị cho thấy các phương tiện đang lưu thông trên đại lộ thành phố sầm uất, phù hợp với đáp án A.'
  },

  // -------------------------------------------------------------
  // NHÓM 4: TRANH KẾT HỢP NGƯỜI & VẬT/CẢNH (COMBINED - Người tương tác với công cụ, thiết bị)
  // -------------------------------------------------------------
  {
    id: 20,
    type: 'photo',
    photoCategory: 'combined',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop',
    imageDescription: 'Một nhà hàng sang trọng với bàn ăn được bày biện và có bàn tay phục vụ',
    audioScript: 'A. The tables are set for dinner in a dining area. B. People are swimming in an outdoor pool. C. The kitchen is completely dark. D. Cars are parked in an underground garage.',
    choices: [
      'A. The tables are set for dinner in a dining area.',
      'B. People are swimming in an outdoor pool.',
      'C. The kitchen is completely dark.',
      'D. Cars are parked in an underground garage.'
    ],
    correctAnswer: 0,
    explanation: 'The image shows elegantly arranged dining tables in a restaurant, matching choice A.',
    explanationVi: 'Hình ảnh cho thấy các bàn ăn được bày trí sang trọng trong nhà hàng, phù hợp với đáp án A.'
  },
  {
    id: 21,
    type: 'photo',
    photoCategory: 'combined',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop',
    imageDescription: 'Không gian làm việc chung với nhiều nhân viên đang sử dụng máy tính',
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
    id: 22,
    type: 'photo',
    photoCategory: 'combined',
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
    id: 23,
    type: 'photo',
    photoCategory: 'combined',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67e55722c0?w=600&auto=format&fit=crop',
    imageDescription: 'Khách hàng đang thanh toán bằng thẻ tại quầy thu ngân',
    audioScript: 'A. A customer is using a credit card at a payment terminal. B. Someone is swimming across a lake. C. Trees are being planted along the sidewalk. D. A train is departing from the station.',
    choices: [
      'A. A customer is using a credit card at a payment terminal.',
      'B. Someone is swimming across a lake.',
      'C. Trees are being planted along the sidewalk.',
      'D. A train is departing from the station.'
    ],
    correctAnswer: 0,
    explanation: 'The photo shows a customer processing a transaction with a contactless credit card at a counter, matching choice A.',
    explanationVi: 'Hình ảnh cho thấy khách hàng đang thực hiện thanh toán bằng thẻ quẹt tại quầy thu ngân, phù hợp với đáp án A.'
  },
  {
    id: 24,
    type: 'photo',
    photoCategory: 'combined',
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&auto=format&fit=crop',
    imageDescription: 'Người đi bộ đang rèn luyện thể thao trên đường leo núi ngoài trời',
    audioScript: 'A. A vehicle is being washed at a service station. B. A person is walking along an outdoor trail. C. Dishes are being cleaned in a sink. D. Passengers are boarding an airplane.',
    choices: [
      'A. A vehicle is being washed at a service station.',
      'B. A person is walking along an outdoor trail.',
      'C. Dishes are being cleaned in a sink.',
      'D. Passengers are boarding an airplane.'
    ],
    correctAnswer: 1,
    explanation: 'The image shows an outdoor fitness enthusiast walking on a trail with a scenic background, matching choice B.',
    explanationVi: 'Hình ảnh chụp một người đang đi bộ dã ngoại trên con đường mòn ngoài trời, phù hợp với đáp án B.'
  },
  {
    id: 25,
    type: 'photo',
    photoCategory: 'combined',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop',
    imageDescription: 'Công nhân xây dựng đội mũ bảo hộ đang làm việc tại công trường',
    audioScript: 'A. A construction worker is wearing protective gear at a worksite. B. A flight attendant is serving drinks on an airplane. C. Students are reading books in a library. D. People are ice skating in a rink.',
    choices: [
      'A. A construction worker is wearing protective gear at a worksite.',
      'B. A flight attendant is serving drinks on an airplane.',
      'C. Students are reading books in a library.',
      'D. People are ice skating in a rink.'
    ],
    correctAnswer: 0,
    explanation: 'The photo shows a construction laborer wearing a hard hat and safety gear on an active building site, matching choice A.',
    explanationVi: 'Hình ảnh cho thấy người công nhân xây dựng đội mũ bảo hộ và trang bị an toàn tại công trường, phù hợp với đáp án A.'
  },
  {
    id: 26,
    type: 'photo',
    photoCategory: 'combined',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&auto=format&fit=crop',
    imageDescription: 'Người làm vườn đang tưới cây xanh bằng vòi phun nước',
    audioScript: 'A. A person is watering plants in a greenhouse garden. B. A pilot is steering an airplane on the runway. C. A mechanic is replacing a car battery. D. A cashier is counting money in a bank.',
    choices: [
      'A. A person is watering plants in a greenhouse garden.',
      'B. A pilot is steering an airplane on the runway.',
      'C. A mechanic is replacing a car battery.',
      'D. A cashier is counting money in a bank.'
    ],
    correctAnswer: 0,
    explanation: 'The photograph shows an individual holding a watering hose tending to lush green plants, matching choice A.',
    explanationVi: 'Hình ảnh chụp một người đang cầm vòi tưới nước chăm sóc cây xanh trong vườn, phù hợp với đáp án A.'
  }
];

// =========================================================================
// PART 2: QUESTION-RESPONSE (20 Authentic TOEIC Patterns)
// =========================================================================
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
    explanationVi: '"Where" hỏi về địa điểm. Đáp án A cung cấp vị trí cụ thể (cách 2 khu nhà, bên cạnh ngân hàng).',
    trapAnalysis: {
      trapType: 'Bẫy từ đồng âm & bẫy trả lời Yes/No cho Wh-question',
      trapNoteVi: 'Đáp án B bị bẫy từ "posting" (đăng bài) lặp từ "post office" và trả lời "Yes" sai quy tắc.'
    }
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
    explanationVi: '"When" hỏi về thời gian. Đáp án B cung cấp thời gian cụ thể (9 giờ sáng).',
    trapAnalysis: {
      trapType: 'Bẫy hỏi When trả lời Where (Địa điểm)',
      trapNoteVi: 'Đáp án A trả lời nơi chốn (In the auditorium) dành cho câu hỏi Where chứ không phải When.'
    }
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
  },
  {
    id: 113,
    type: 'question-response',
    audioScript: 'You haven\'t finalized the flight booking yet, have you?',
    choices: [
      'A. No, I\'m still waiting for manager approval.',
      'B. Yes, the airport terminal is crowded.',
      'C. The flight duration is three hours.'
    ],
    correctAnswer: 0,
    explanation: 'Tag question asking for confirmation. Choice A confirms the booking is pending manager approval.',
    explanationVi: 'Câu hỏi đuôi xác nhận. Đáp án A xác nhận chưa đặt vì vẫn đang đợi quản lý phê duyệt.'
  },
  {
    id: 114,
    type: 'question-response',
    audioScript: 'Which caterer should we hire for the annual gala?',
    choices: [
      'A. The gala starts at seven in the evening.',
      'B. Let\'s go with Delicious Bites; their quote was the lowest.',
      'C. About one hundred and fifty guests.'
    ],
    correctAnswer: 1,
    explanation: '"Which" asks for a choice among options. Choice B selects a specific catering company with reasoning.',
    explanationVi: '"Which" hỏi lựa chọn bên cung cấp. Đáp án B chọn Delicious Bites vì báo giá tốt nhất.'
  },
  {
    id: 115,
    type: 'question-response',
    audioScript: 'Did you remember to turn off the air conditioner in room 402?',
    choices: [
      'A. Yes, I made sure it was off before leaving.',
      'B. The room temperature is twenty degrees.',
      'C. We need a new technician.'
    ],
    correctAnswer: 0,
    explanation: 'Direct question on past action. Choice A confirms taking care of it.',
    explanationVi: 'Câu hỏi xác nhận hành động trong quá khứ. Đáp án A xác nhận đã tắt trước khi rời phòng.'
  },
  {
    id: 116,
    type: 'question-response',
    audioScript: 'The photocopier on the second floor is jammed again.',
    choices: [
      'A. I\'ll call IT support right away to get it fixed.',
      'B. Yes, photo albums are very heavy.',
      'C. It costs twenty cents per page.'
    ],
    correctAnswer: 0,
    explanation: 'Statement describing an office issue. Choice A offers an immediate problem-solving response.',
    explanationVi: 'Câu trần thuật nêu sự cố máy photocopy. Đáp án A đưa ra cách xử lý (gọi IT hỗ trợ ngay).'
  },
  {
    id: 117,
    type: 'question-response',
    audioScript: 'Where did you put the spare HDMI cables?',
    choices: [
      'A. In the bottom drawer of the supply cabinet.',
      'B. We watched the video presentation.',
      'C. It connects to the projector.'
    ],
    correctAnswer: 0,
    explanation: '"Where" asks for position. Choice A gives the exact location (bottom drawer of supply cabinet).',
    explanationVi: '"Where" hỏi vị trí để cáp. Đáp án A chỉ rõ vị trí (trong ngăn kéo dưới của tủ đồ dùng).'
  },
  {
    id: 118,
    type: 'question-response',
    audioScript: 'How frequently do the company shuttle buses run?',
    choices: [
      'A. Every twenty minutes during peak hours.',
      'B. The bus driver is very polite.',
      'C. To the central train station.'
    ],
    correctAnswer: 0,
    explanation: '"How frequently" asks for frequency. Choice A states the interval (every 20 minutes).',
    explanationVi: '"How frequently" hỏi về tần suất. Đáp án A nêu rõ tần suất (cứ mỗi 20 phút vào giờ cao điểm).'
  },
  {
    id: 119,
    type: 'question-response',
    audioScript: 'Who should I contact regarding the software licensing agreement?',
    choices: [
      'A. The legal department handles all software agreements.',
      'B. The software update completed successfully.',
      'C. Yes, we signed the paper last week.'
    ],
    correctAnswer: 0,
    explanation: '"Who should I contact" asks for department or person. Choice A directs to the legal department.',
    explanationVi: '"Who should I contact" hỏi người liên hệ. Đáp án A hướng dẫn liên hệ phòng pháp chế (legal department).'
  },
  {
    id: 120,
    type: 'question-response',
    audioScript: 'Why don\'t we take a short break before reviewing section three?',
    choices: [
      'A. That\'s a good idea; let\'s grab a cup of coffee.',
      'B. The section is ten pages long.',
      'C. Because the printer was broken.'
    ],
    correctAnswer: 0,
    explanation: '"Why don\'t we" is a suggestion. Choice A accepts the suggestion enthusiastically.',
    explanationVi: '"Why don\'t we" là lời đề nghị. Đáp án A tán thành lời đề xuất và rủ đi uống cà phê.'
  }
];

// =========================================================================
// PART 3: SHORT CONVERSATIONS
// =========================================================================
export const TOEIC_CONVERSATIONS: ToeicConversation[] = [
  {
    id: 201,
    title: 'Rescheduling a Client Meeting',
    context: 'Cuộc trao đổi giữa hai đồng nghiệp tại văn phòng về việc dời lịch hẹn với khách hàng đối tác.',
    speakers: [
      { name: 'Mark', text: 'Hi Emily, did Mr. Henderson confirm our strategy meeting for tomorrow morning at ten?', role: 'Project Lead' },
      { name: 'Emily', text: 'Actually, he called twenty minutes ago. His flight was delayed due to bad weather in Chicago, so he won\'t arrive until tomorrow afternoon.', role: 'Account Manager' },
      { name: 'Mark', text: 'I see. Should we move the meeting to Thursday morning, or could we hold a video conference instead?', role: 'Project Lead' },
      { name: 'Emily', text: 'He mentioned he prefers meeting in person to review the physical product samples. Let\'s reschedule for Thursday at ten in conference room B.', role: 'Account Manager' }
    ],
    fullAudioScript: 'Mark: Hi Emily, did Mr. Henderson confirm our strategy meeting for tomorrow morning at ten? Emily: Actually, he called twenty minutes ago. His flight was delayed due to bad weather in Chicago, so he won\'t arrive until tomorrow afternoon. Mark: I see. Should we move the meeting to Thursday morning, or could we hold a video conference instead? Emily: He mentioned he prefers meeting in person to review the physical product samples. Let\'s reschedule for Thursday at ten in conference room B.',
    questions: [
      {
        id: '201-1',
        question: 'Why was Mr. Henderson unable to attend the meeting tomorrow morning?',
        choices: [
          'A. He lost his presentation files.',
          'B. His flight was delayed due to weather.',
          'C. He had a medical emergency.',
          'D. He decided to cancel the project.'
        ],
        correctAnswer: 1,
        explanation: 'Emily explicitly states: "His flight was delayed due to bad weather in Chicago".',
        explanationVi: 'Emily nêu rõ: "Chuyến bay của ông ấy bị hoãn do thời tiết xấu ở Chicago".'
      },
      {
        id: '201-2',
        question: 'Why does Mr. Henderson want to meet in person rather than online?',
        choices: [
          'A. He doesn\'t have internet access.',
          'B. He wants to review physical product samples.',
          'C. The video conferencing software is broken.',
          'D. He wants to tour the production factory.'
        ],
        correctAnswer: 1,
        explanation: 'Emily explains: "He mentioned he prefers meeting in person to review the physical product samples."',
        explanationVi: 'Emily giải thích: "Ông ấy muốn gặp trực tiếp để xem các mẫu sản phẩm thực tế".'
      },
      {
        id: '201-3',
        question: 'When will the rescheduled meeting take place?',
        choices: [
          'A. Tomorrow afternoon at two',
          'B. Wednesday evening at six',
          'C. Thursday morning at ten',
          'D. Next Monday morning at nine'
        ],
        correctAnswer: 2,
        explanation: 'Emily confirms: "Let\'s reschedule for Thursday at ten in conference room B."',
        explanationVi: 'Emily chốt lịch: "Hãy đổi lịch sang thứ Năm lúc 10 giờ tại phòng họp B".'
      }
    ],
    vocabHighlights: [
      { word: 'reschedule', ipa: '/ˌriːˈskedʒuːl/', meaningVi: 'dời lại lịch trình' },
      { word: 'strategy meeting', ipa: '/ˈstrætədʒi ˈmiːtɪŋ/', meaningVi: 'cuộc họp chiến lược' },
      { word: 'product samples', ipa: '/ˈprɒdʌkt ˈsɑːmpəlz/', meaningVi: 'hàng mẫu / mẫu sản phẩm' },
      { word: 'conference room', ipa: '/ˈkɒnfərəns ruːm/', meaningVi: 'phòng họp / phòng hội nghị' }
    ]
  },
  {
    id: 202,
    title: 'Ordering Office Furniture & Equipment',
    context: 'Cuộc đối thoại giữa nhân viên văn phòng và người phụ trách mua sắm trang thiết bị.',
    speakers: [
      { name: 'David', text: 'Good morning Rachel. Our marketing team is expanding next month with four new interns. We need additional desks and ergonomic chairs.', role: 'Marketing Director' },
      { name: 'Rachel', text: 'Sure thing, David. Our preferred supplier, Apex Office Supplies, is currently running a twenty percent discount on bulk orders over two thousand dollars.', role: 'Procurement Specialist' },
      { name: 'David', text: 'That sounds perfect. Can we also include two desktop monitors and wireless keyboards in that purchase order?', role: 'Marketing Director' },
      { name: 'Rachel', text: 'I will submit the requisition to the finance manager today so we can receive delivery by next Friday.', role: 'Procurement Specialist' }
    ],
    fullAudioScript: 'David: Good morning Rachel. Our marketing team is expanding next month with four new interns. We need additional desks and ergonomic chairs. Rachel: Sure thing, David. Our preferred supplier, Apex Office Supplies, is currently running a twenty percent discount on bulk orders over two thousand dollars. David: That sounds perfect. Can we also include two desktop monitors and wireless keyboards in that purchase order? Rachel: I will submit the requisition to the finance manager today so we can receive delivery by next Friday.',
    questions: [
      {
        id: '202-1',
        question: 'Why does David need new office furniture?',
        choices: [
          'A. The old furniture was damaged in a flood.',
          'B. The marketing team is hiring four new interns.',
          'C. The company is relocating to another city.',
          'D. The office is being redecorated for a party.'
        ],
        correctAnswer: 1,
        explanation: 'David mentions: "Our marketing team is expanding next month with four new interns."',
        explanationVi: 'David giải thích: "Đội ngũ marketing sẽ mở rộng vào tháng tới với 4 thực tập sinh mới".'
      },
      {
        id: '202-2',
        question: 'What special promotion is the supplier offering?',
        choices: [
          'A. Free shipping on all international orders',
          'B. Buy one chair and get one free',
          'C. A twenty percent discount on bulk orders over $2,000',
          'D. Free warranty extension for five years'
        ],
        correctAnswer: 2,
        explanation: 'Rachel notes: "running a twenty percent discount on bulk orders over two thousand dollars."',
        explanationVi: 'Rachel cho biết: "đang giảm giá 20% cho các đơn hàng số lượng lớn trên 2.000 đô la".'
      },
      {
        id: '202-3',
        question: 'What will Rachel do next?',
        choices: [
          'A. Interview the job candidates',
          'B. Submit a purchase requisition to the finance manager',
          'C. Assemble the computer workstations herself',
          'D. Call the delivery truck driver'
        ],
        correctAnswer: 1,
        explanation: 'Rachel states: "I will submit the requisition to the finance manager today..."',
        explanationVi: 'Rachel khẳng định: "Tôi sẽ nộp phiếu yêu cầu mua sắm cho giám đốc tài chính hôm nay".'
      }
    ],
    vocabHighlights: [
      { word: 'ergonomic chair', ipa: '/ˌɜːɡəˈnɒmɪk tʃeə/', meaningVi: 'ghế công thái học chống mỏi' },
      { word: 'procurement', ipa: '/prəˈkjʊəmənt/', meaningVi: 'hoạt động thu mua / cung ứng' },
      { word: 'requisition', ipa: '/ˌrekwɪˈzɪʃn/', meaningVi: 'phiếu yêu cầu mua sắm' },
      { word: 'bulk order', ipa: '/bʌlk ˈɔːdə/', meaningVi: 'đơn đặt hàng số lượng lớn' }
    ]
  },
  {
    id: 203,
    title: 'Inquiring About Hotel Reservation & Amenities',
    context: 'Khách hàng liên hệ lễ tân khách sạn để xác nhận phòng và dịch vụ đưa đón sân bay.',
    speakers: [
      { name: 'Receptionist', text: 'Thank you for calling Grand Horizon Hotel. How may I assist you today?', role: 'Front Desk' },
      { name: 'Mr. Vance', text: 'Hello, I have a reservation under the name Thomas Vance for this weekend. Does the hotel offer airport shuttle service?', role: 'Hotel Guest' },
      { name: 'Receptionist', text: 'Yes, Mr. Vance. We operate a complimentary shuttle every thirty minutes between terminal two and the hotel lobby from 6 AM to midnight.', role: 'Front Desk' },
      { name: 'Mr. Vance', text: 'Wonderful. Also, could I request a room on a higher floor with a quiet view?', role: 'Hotel Guest' },
      { name: 'Receptionist', text: 'Certainly! I have upgraded your booking to a deluxe suite on the 14th floor facing the courtyard at no extra charge.', role: 'Front Desk' }
    ],
    fullAudioScript: 'Receptionist: Thank you for calling Grand Horizon Hotel. How may I assist you today? Mr. Vance: Hello, I have a reservation under the name Thomas Vance for this weekend. Does the hotel offer airport shuttle service? Receptionist: Yes, Mr. Vance. We operate a complimentary shuttle every thirty minutes between terminal two and the hotel lobby from 6 AM to midnight. Mr. Vance: Wonderful. Also, could I request a room on a higher floor with a quiet view? Receptionist: Certainly! I have upgraded your booking to a deluxe suite on the 14th floor facing the courtyard at no extra charge.',
    questions: [
      {
        id: '203-1',
        question: 'What is Mr. Vance inquiring about initially?',
        choices: [
          'A. The hotel restaurant menu',
          'B. Airport shuttle transportation service',
          'C. Cancellation and refund policies',
          'D. Conference room rental rates'
        ],
        correctAnswer: 1,
        explanation: 'Mr. Vance asks: "Does the hotel offer airport shuttle service?"',
        explanationVi: 'Ông Vance hỏi thăm: "Khách sạn có dịch vụ xe buýt đưa đón sân bay không?".'
      },
      {
        id: '203-2',
        question: 'How often does the hotel shuttle run?',
        choices: [
          'A. Once every hour',
          'B. Every thirty minutes',
          'C. Only upon special request',
          'D. Twice daily'
        ],
        correctAnswer: 1,
        explanation: 'The receptionist states: "We operate a complimentary shuttle every thirty minutes..."',
        explanationVi: 'Lễ tân thông báo: "Xe buýt miễn phí chạy cứ mỗi 30 phút một chuyến".'
      },
      {
        id: '203-3',
        question: 'What special accommodation does the receptionist provide?',
        choices: [
          'A. Free breakfast vouchers for two weeks',
          'B. A rental car with GPS navigation',
          'C. A free room upgrade to the 14th floor deluxe suite',
          'D. A 50% discount on spa treatments'
        ],
        correctAnswer: 2,
        explanation: 'The receptionist states: "I have upgraded your booking to a deluxe suite on the 14th floor facing the courtyard at no extra charge."',
        explanationVi: 'Lễ tân nâng hạng phòng miễn phí lên phòng deluxe tầng 14 nhìn ra sân trong.'
      }
    ],
    vocabHighlights: [
      { word: 'complimentary', ipa: '/ˌkɒmplɪˈmentri/', meaningVi: 'miễn phí kèm theo' },
      { word: 'shuttle service', ipa: '/ˈʃʌtl ˈsɜːvɪs/', meaningVi: 'dịch vụ xe buýt đưa đón ngắn hạn' },
      { word: 'deluxe suite', ipa: '/dɪˈlʌks swiːt/', meaningVi: 'phòng cao cấp sang trọng' },
      { word: 'reservation', ipa: '/ˌrezəˈveɪʃn/', meaningVi: 'sự đặt chỗ trước' }
    ]
  }
];

// =========================================================================
// PART 4: SHORT TALKS
// =========================================================================
export const TOEIC_TALKS: ToeicTalk[] = [
  {
    id: 301,
    title: 'Airport Flight Delay & Gate Change Announcement',
    type: 'announcement',
    context: 'Thông báo loa phát thanh tại nhà ga sân bay quốc tế dành cho hành khách chuyến bay.',
    audioScript: 'Attention all passengers on flight Pacific Air 412 bound for Tokyo Haneda. Due to maintenance checks on the aircraft engine, departure has been rescheduled from 3:15 PM to 4:45 PM. In addition, please be advised that our departure gate has changed from Gate 14 to Gate 22 in Concourse B. We apologize for the inconvenience and invite all ticketed passengers to collect a ten-dollar meal voucher at the customer service desk near Gate 20. Thank you for your patience.',
    questions: [
      {
        id: '301-1',
        question: 'What is the purpose of the announcement?',
        choices: [
          'A. To announce a flight delay and departure gate change',
          'B. To notify passengers about lost luggage',
          'C. To introduce a new airline loyalty program',
          'D. To cancel all international flights for the day'
        ],
        correctAnswer: 0,
        explanation: 'The speaker announces a rescheduled departure time (3:15 to 4:45) and a change of gate from 14 to 22.',
        explanationVi: 'Thông báo nêu việc dời giờ bay (từ 3:15 sang 4:45) và chuyển cổng khởi hành từ cổng 14 sang cổng 22.'
      },
      {
        id: '301-2',
        question: 'Where should passengers go to board the aircraft?',
        choices: [
          'A. Gate 14',
          'B. Gate 20',
          'C. Gate 22 in Concourse B',
          'D. Terminal 3 Baggage Claim'
        ],
        correctAnswer: 2,
        explanation: '"please be advised that our departure gate has changed from Gate 14 to Gate 22 in Concourse B."',
        explanationVi: '"Cổng khởi hành đã được chuyển từ Cổng 14 sang Cổng 22 ở Khu B".'
      },
      {
        id: '301-3',
        question: 'What are passengers offered as compensation?',
        choices: [
          'A. Free hotel accommodation',
          'B. A ten-dollar food voucher',
          'C. Upgraded first-class seating',
          'D. 50% discount on their next ticket'
        ],
        correctAnswer: 1,
        explanation: '"invite all ticketed passengers to collect a ten-dollar meal voucher at the customer service desk"',
        explanationVi: '"Mời tất cả hành khách nhận phiếu ăn uống trị giá 10 đô la tại quầy dịch vụ khách hàng".'
      }
    ],
    vocabHighlights: [
      { word: 'reschedule', ipa: '/ˌriːˈskedʒuːl/', meaningVi: 'đổi giờ bay / dời lịch' },
      { word: 'maintenance check', ipa: '/ˈmeɪntənəns tʃek/', meaningVi: 'kiểm tra bảo trì kỹ thuật' },
      { word: 'meal voucher', ipa: '/miːl ˈvaʊtʃə/', meaningVi: 'phiếu quà tặng ăn uống' },
      { word: 'departure gate', ipa: '/dɪˈpɑːtʃə ɡeɪt/', meaningVi: 'cổng khởi hành lên máy bay' }
    ]
  },
  {
    id: 302,
    title: 'Company Voicemail Regarding Contract Proposal',
    type: 'voicemail',
    context: 'Tin nhắn thoại lưu lại từ đối tác tư vấn công nghệ gửi cho Giám đốc Dự án.',
    audioScript: 'Hello Mr. Harrison, this is Claire Dubois from TechWave Solutions calling regarding the cloud migration proposal we sent on Monday. We have reviewed your request for additional cybersecurity protocols and updated our price estimate accordingly. We managed to include twenty-four-seven server monitoring without increasing the overall project budget. Please give me a call back at 555-0194 before 5 PM today so we can finalize the contract details. Thank you and have a productive day.',
    questions: [
      {
        id: '302-1',
        question: 'Who is the caller and what company does she represent?',
        choices: [
          'A. Claire Dubois from TechWave Solutions',
          'B. A flight attendant from Pacific Air',
          'C. A real estate agent from Horizon Properties',
          'D. An IT technician from Apex Supplies'
        ],
        correctAnswer: 0,
        explanation: 'She introduces herself: "this is Claire Dubois from TechWave Solutions calling..."',
        explanationVi: 'Cô giới thiệu: "Tôi là Claire Dubois từ công ty TechWave Solutions gọi đến...".'
      },
      {
        id: '302-2',
        question: 'What improvement was added to the proposal at no extra cost?',
        choices: [
          'A. Five free laptop computers',
          'B. 24/7 server monitoring',
          'C. A three-year warranty extension',
          'D. Free office relocation assistance'
        ],
        correctAnswer: 1,
        explanation: '"We managed to include twenty-four-seven server monitoring without increasing the overall project budget."',
        explanationVi: '"Chúng tôi đã bổ sung dịch vụ giám sát máy chủ 24/7 mà không làm tăng ngân sách dự án".'
      },
      {
        id: '302-3',
        question: 'What does the speaker ask Mr. Harrison to do?',
        choices: [
          'A. Send an email with his signature',
          'B. Call her back before 5 PM today',
          'C. Visit her office in person tomorrow',
          'D. Pay the initial deposit invoice'
        ],
        correctAnswer: 1,
        explanation: '"Please give me a call back at 555-0194 before 5 PM today..."',
        explanationVi: '"Vui lòng gọi lại cho tôi theo số 555-0194 trước 5 giờ chiều hôm nay".'
      }
    ],
    vocabHighlights: [
      { word: 'cloud migration', ipa: '/klaʊd maɪˈɡreɪʃn/', meaningVi: 'chuyển dịch dữ liệu lên đám mây' },
      { word: 'cybersecurity', ipa: '/ˌsaɪbəsɪˈkjʊərəti/', meaningVi: 'an ninh mạng' },
      { word: 'estimate', ipa: '/ˈestɪmət/', meaningVi: 'bản dự toán kinh phí' },
      { word: 'finalize', ipa: '/ˈfaɪnəlaɪz/', meaningVi: 'hoàn tất / chốt hợp đồng' }
    ]
  },
  {
    id: 303,
    title: 'Factory Tour Welcome & Safety Briefing',
    type: 'speech',
    context: 'Bài phát biểu chào mừng và hướng dẫn an toàn lao động trước chuyến tham quan nhà máy tự động.',
    audioScript: 'Good morning everyone and welcome to the Aurora Robotics Manufacturing Facility. Before we begin our tour of the automated assembly line, I must review our essential safety guidelines. All visitors are required to wear the high-visibility vests and safety helmets provided at the entrance. Please remain on the designated yellow walkways at all times, as automated forklifts operate continuously throughout the facility. Photography is strictly prohibited in Area 3 where our prototype units are assembled. Let us begin our tour.',
    questions: [
      {
        id: '303-1',
        question: 'Where is this tour taking place?',
        choices: [
          'A. An art museum exhibition hall',
          'B. The Aurora Robotics Manufacturing Facility',
          'C. A commercial airport terminal',
          'D. An organic farming greenhouse'
        ],
        correctAnswer: 1,
        explanation: 'The speaker greets: "welcome to the Aurora Robotics Manufacturing Facility."',
        explanationVi: '"Chào mừng mọi người đến với Nhà máy sản xuất robot Aurora".'
      },
      {
        id: '303-2',
        question: 'What protective gear must visitors wear?',
        choices: [
          'A. Safety helmets and high-visibility vests',
          'B. Ear plugs and swimming goggles',
          'C. Rubber boots and heavy leather gloves',
          'D. Warm winter jackets and scarves'
        ],
        correctAnswer: 0,
        explanation: '"All visitors are required to wear the high-visibility vests and safety helmets provided at the entrance."',
        explanationVi: '"Tất cả khách tham quan phải mặc áo phản quang và đội mũ bảo hộ lao động được cấp tại cửa".'
      },
      {
        id: '303-3',
        question: 'What activity is prohibited in Area 3?',
        choices: [
          'A. Drinking water',
          'B. Taking photographs',
          'C. Asking questions',
          'D. Speaking with employees'
        ],
        correctAnswer: 1,
        explanation: '"Photography is strictly prohibited in Area 3 where our prototype units are assembled."',
        explanationVi: '"Nghiêm cấm chụp ảnh tại Khu vực 3 nơi lắp ráp các nguyên mẫu thử nghiệm".'
      }
    ],
    vocabHighlights: [
      { word: 'automated assembly line', ipa: '/ˈɔːtəmeɪtɪd əˈsembli laɪn/', meaningVi: 'dây chuyền lắp ráp tự động' },
      { word: 'high-visibility vest', ipa: '/haɪ ˌvɪzəˈbɪləti vest/', meaningVi: 'áo khoác phản quang an toàn' },
      { word: 'designated walkway', ipa: '/ˈdezɪɡneɪtɪd ˈwɔːkweɪ/', meaningVi: 'lối đi quy định cho người đi bộ' },
      { word: 'strictly prohibited', ipa: '/ˈstrɪktli prəˈhɪbɪtɪd/', meaningVi: 'bị nghiêm cấm tuyệt đối' }
    ]
  }
];

// =========================================================================
// LISTENING TRAPS & STRATEGIES (4 Phân Loại Bẫy Tranh + Part 2 + Part 3/4)
// =========================================================================
export const LISTENING_TRAPS: ListeningTrap[] = [
  {
    id: 'trap-people',
    title: 'Bẫy Tranh Tả Người (Sai hành động V-ing, sai trang phục hoặc tân ngữ)',
    titleVi: 'Bẫy trong tranh có 1 người hoặc nhóm người',
    part: 'Part 1',
    category: 'people',
    description: 'Đề thi thường bẫy bằng cách dùng đúng chủ ngữ (The man / The woman) nhưng gắn sai hành động (đang nhìn vào máy ảnh thay vì đang đọc sách), hoặc dùng sai trạng thái "wearing" (đang mặc sẵn) với "putting on" (đang xỏ tay vào mặc).',
    exampleBad: 'Người trong tranh đang đội mũ bảo hộ sẵn. Bẫy: "He is *putting on* a helmet." (SAI - "putting on" là hành động đang nhấc mũ lên đội).',
    exampleGood: 'Đáp án đúng: "He is *wearing* a safety helmet." (ĐÚNG - "wearing" là trạng thái đã mặc/đội xong trên người).',
    tip: '💡 Quy tắc vàng: Phân biệt "Wear" (trạng thái có sẵn trên người) vs "Put on / Try on" (hành động đang mặc/thử).'
  },
  {
    id: 'trap-object',
    title: 'Bẫy Tranh Tả Vật (Bẫy "is being V-ed" trong tranh không người)',
    titleVi: 'Bẫy thì tiếp diễn bị động trong tranh đồ vật',
    part: 'Part 1',
    category: 'object',
    description: 'Khi tranh chỉ có đồ vật hoặc phòng ốc không có bóng dáng người nào thao tác, nếu câu mô tả dùng cấu trúc bị động tiếp diễn "is/are being + V3/ed" thì câu đó 99% là BẪY SAI.',
    exampleBad: 'Tranh chụp bàn ăn trống. Bẫy: "The tables *are being set* for lunch." (SAI vì không có nhân viên phục vụ nào đang sắp xếp tại thời điểm đó).',
    exampleGood: 'Đáp án đúng: "The tables *have been set* for lunch." hoặc "Dishes *are arranged* on the table."',
    tip: '💡 Mẹo 3 giây: Thấy tranh KHÔNG CÓ NGƯỜI mà tai nghe thấy âm "BEING" (/ˈbiːɪŋ/) -> GẠCH BỎ NGAY!'
  },
  {
    id: 'trap-scenery',
    title: 'Bẫy Tranh Tả Cảnh & Không Gian (Bẫy vị trí giới từ & chi tiết phụ)',
    titleVi: 'Bẫy trong tranh phong cảnh, đường phố, kiến trúc',
    part: 'Part 1',
    category: 'scenery',
    description: 'Đề thi thường bẫy bằng cách mô tả sai phương hướng (đối diện vs bên cạnh), sai giới từ (under vs above), hoặc miêu tả một chi tiết quá nhỏ bé không phải trọng tâm bức tranh.',
    exampleBad: 'Tranh chụp chiếc cầu lớn bắc qua sông. Bẫy: "A ship is *passing under* the bridge" (trong khi mặt nước không có chiếc thuyền nào).',
    exampleGood: 'Đáp án đúng: "A bridge spans across the river."',
    tip: '💡 Mẹo: Với tranh tả cảnh rộng, hãy tập trung vào chủ thể bao quát lớn nhất (Cây cầu, con đường, hàng cây, các dãy nhà).'
  },
  {
    id: 'trap-combined',
    title: 'Bẫy Tranh Kết Hợp Người & Vật/Cảnh (Bẫy nhầm lẫn tương tác)',
    titleVi: 'Bẫy tương tác giữa người và vật xung quanh',
    part: 'Part 1',
    category: 'combined',
    description: 'Tranh có người lẫn đồ vật thường bẫy bằng cách mô tả đúng người nhưng sai đồ vật người đó đang cầm/sử dụng, hoặc mô tả đúng đồ vật nhưng sai hành động của người.',
    exampleBad: 'Người phụ nữ đang gõ bàn phím laptop. Bẫy: "She is *repairing* the computer" (Cô ấy chỉ đang gõ phím chứ không hề tháo lắp sửa chữa).',
    exampleGood: 'Đáp án đúng: "She is *typing on* a keyboard" hoặc "She is *using* a laptop."',
    tip: '💡 Mẹo: Quan sát kỹ đôi bàn tay (đang cầm nắm gì) và hướng mắt nhìn (đang nhìn vào đâu) của nhân vật.'
  },
  {
    id: 'trap-part2',
    title: 'Bẫy Từ Đồng Âm & Lặp Từ Trong Part 2 (Sound Distractors)',
    titleVi: 'Bẫy từ phát âm gần giống hoặc lặp lại từ khóa',
    part: 'Part 2',
    category: 'part2',
    description: 'Đề thi chèn từ phát âm gần giống với từ khóa trong câu hỏi để đánh lừa phản xạ nghe lõm bõm (ví dụ: coffee / copy, walk / work, right / write).',
    exampleBad: 'Hỏi: "Where can I get some *coffee*?" -> Bẫy: "I made a *copy* of the file."',
    exampleGood: 'Đáp án đúng: "At the cafeteria down the hall."',
    tip: '💡 Mẹo: Thấy phương án nào có từ phát âm "y chang" hoặc "na ná" từ khóa trong câu hỏi -> 80% là đáp án BẪY.'
  },
  {
    id: 'trap-part34',
    title: 'Bẫy Paraphrase & Từ Đồng Nghĩa Trong Part 3 & 4',
    titleVi: 'Kỹ thuật Paraphrase trong hội thoại và bài nói ngắn',
    part: 'Part 3 & Part 4',
    category: 'part34',
    description: 'Trong băng phát âm thanh dùng từ gốc, nhưng 4 đáp án in trong đề thi lại dùng từ đồng nghĩa tương đương.',
    exampleBad: 'Băng nói: "postpone the meeting" -> Thí sinh đi tìm từ "postpone", nhưng đáp án lại ghi "reschedule / put off".',
    exampleGood: '"free of charge" = "complimentary" | "purchase" = "order / buy" | "fix" = "repair / service".',
    tip: '💡 Mẹo: Tận dụng thời gian đọc trước câu hỏi để dự đoán sẵn các từ đồng nghĩa (synonyms) của từ khóa.'
  }
];

// Combine all questions for mixed practice
export const ALL_TOEIC_LISTENING_QUESTIONS: ToeicListeningQuestion[] = [
  ...PHOTO_QUESTIONS,
  ...QUESTION_RESPONSE_QUESTIONS
];
