'use client';

export interface WritingPrompt {
  title: string;
  englishTitle: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  prompt: string;
  outline: string[];
  vocab: { word: string; meaningVi: string }[];
  sample: string;
  translation: string;
}

export const WRITING_PROMPTS: WritingPrompt[] = [
  {
    title: 'Giới thiệu bản thân',
    englishTitle: 'Self-Introduction',
    level: 'Beginner',
    prompt: 'Giới thiệu tên, tuổi, nơi sinh sống, học vấn, công việc hiện tại và một số nét về tính cách hoặc mục tiêu tương lai của bạn.',
    outline: [
      'Chào hỏi & Giới thiệu Tên/Tuổi (Greeting & Name/Age)',
      'Quê quán & Nơi ở hiện tại (Hometown & Current Residence)',
      'Học vấn & Công việc (Education & Job)',
      'Sở thích & Mục tiêu (Hobbies & Future Goals)'
    ],
    vocab: [
      { word: 'born and raised', meaningVi: 'sinh ra và lớn lên' },
      { word: 'graduate from', meaningVi: 'tốt nghiệp từ' },
      { word: 'junior developer', meaningVi: 'lập trình viên sơ cấp' },
      { word: 'in my free time', meaningVi: 'vào thời gian rảnh' },
      { word: 'eager to learn', meaningVi: 'hăng hái học hỏi' }
    ],
    sample: 'Hello everyone, let me introduce myself. My name is Nguyen An, and I am twenty-three years old. I was born and raised in Da Nang, a beautiful coastal city in Vietnam, but I am currently living and working in Hanoi. I graduated from university last year with a degree in Computer Science, and I now work as a junior web developer at a tech start-up. In my free time, I enjoy reading technology blogs, playing badminton, and listening to English podcasts. People describe me as an open-minded, hard-working, and friendly person. I am always eager to learn new skills and improve my English communication to open up better career opportunities in the future.',
    translation: 'Xin chào mọi người, tôi xin tự giới thiệu về mình. Tên tôi là Nguyễn An, năm nay 23 tuổi. Tôi sinh ra và lớn lên ở Đà Nẵng, một thành phố biển xinh đẹp của Việt Nam, nhưng hiện tại tôi đang sống và làm việc tại Hà Nội. Tôi tốt nghiệp đại học năm ngoái chuyên ngành Khoa học máy tính, và hiện đang là lập trình viên web sơ cấp tại một công ty công nghệ khởi nghiệp. Vào thời gian rảnh rỗi, tôi thích đọc blog công nghệ, chơi cầu lông và nghe podcast tiếng Anh. Mọi người mô tả tôi là một người cởi mở, chăm chỉ và thân thiện. Tôi luôn khao khát học hỏi các kỹ năng mới và cải thiện kỹ năng giao tiếp tiếng Anh của mình để mở ra những cơ hội nghề nghiệp tốt hơn trong tương lai.'
  },
  {
    title: 'Thói quen hàng ngày',
    englishTitle: 'Daily Routine',
    level: 'Beginner',
    prompt: 'Kể về các hoạt động thường ngày của bạn từ lúc thức dậy cho đến lúc đi ngủ.',
    outline: [
      'Các hoạt động buổi sáng: Thức dậy, vệ sinh, ăn sáng (Morning activities)',
      'Các hoạt động chính ban ngày: Học tập, làm việc (Work/Study schedule)',
      'Các hoạt động buổi tối: Thư giãn, thói quen trước khi đi ngủ (Evening routine)'
    ],
    vocab: [
      { word: 'wake up', meaningVi: 'thức dậy' },
      { word: 'brush my teeth', meaningVi: 'đánh răng' },
      { word: 'have breakfast', meaningVi: 'ăn sáng' },
      { word: 'take a short nap', meaningVi: 'ngủ trưa ngắn' },
      { word: 'go to bed', meaningVi: 'đi ngủ' }
    ],
    sample: 'Every day, I start my morning by waking up at 6:30 AM. After brushing my teeth and washing my face, I spend fifteen minutes doing light exercise to warm up my body. Then, I have a healthy breakfast with milk and bread. I leave my house at 7:45 AM to go to work. My working hours start from 8:30 AM to 5:30 PM. After work, I return home, cook dinner, and listen to music to relax. Before going to bed at 11:00 PM, I usually write down my tasks for the next day. This simple routine keeps me organized and productive.',
    translation: 'Mỗi ngày, tôi bắt đầu buổi sáng bằng việc thức dậy lúc 6:30. Sau khi đánh răng rửa mặt, tôi dành 15 phút tập thể dục nhẹ nhàng để làm nóng cơ thể. Sau đó, tôi ăn một bữa sáng lành mạnh với sữa và bánh mì. Tôi rời nhà lúc 7:45 để đi làm. Giờ làm việc của tôi bắt đầu từ 8:30 sáng đến 5:30 chiều. Sau giờ làm, tôi trở về nhà, nấu bữa tối và nghe nhạc để thư giãn. Trước khi đi ngủ lúc 11 giờ tối, tôi thường viết ra các nhiệm vụ cho ngày hôm sau. Thói quen đơn giản này giúp tôi luôn ngăn nắp và làm việc hiệu quả.'
  },
  {
    title: 'Sở thích cá nhân',
    englishTitle: 'Hobbies & Interests',
    level: 'Intermediate',
    prompt: 'Miêu tả các sở thích chính của bạn, tần suất bạn thực hiện chúng và vì sao chúng giúp bạn thư giãn hoặc có ích cho bạn.',
    outline: [
      'Nêu sở thích chính và thời điểm bắt đầu (Main hobby & Origin)',
      'Tần suất thực hiện và cách thực hiện (Frequency & Execution)',
      'Lợi ích sở thích mang lại cho sức khỏe/tâm hồn (Benefits)'
    ],
    vocab: [
      { word: 'develop a passion for', meaningVi: 'hình thành đam mê đối với' },
      { word: 'spend time doing', meaningVi: 'dành thời gian làm gì' },
      { word: 'expand my knowledge', meaningVi: 'mở rộng kiến thức' },
      { word: 'stimulate my imagination', meaningVi: 'kích thích trí tưởng tượng' },
      { word: 'play a vital role', meaningVi: 'đóng vai trò quan trọng' }
    ],
    sample: 'Everyone has hobbies to relax after busy working hours, and mine is reading books. I developed a passion for books when I was a child. I usually spend about thirty minutes reading before going to bed. I love self-help and science-fiction genres because they help expand my knowledge and stimulate my imagination. Besides reading, I also like playing football with my friends on weekends. Playing sports not only keeps me healthy but also teaches me teamwork. These hobbies play a vital role in my life, keeping me energized and happy.',
    translation: 'Mỗi người đều có những sở thích riêng để thư giãn sau giờ làm việc bận rộn, và sở thích của tôi là đọc sách. Tôi bắt đầu đam mê sách từ khi còn nhỏ. Tôi thường dành khoảng 30 phút để đọc sách trước khi đi ngủ. Tôi thích thể loại sách phát triển bản thân và khoa học viễn tưởng vì chúng giúp mở rộng kiến thức và kích thích trí tưởng tượng của tôi. Ngoài đọc sách, tôi cũng thích chơi bóng đá cùng bạn bè vào cuối tuần. Chơi thể thao không chỉ giúp tôi khỏe mạnh mà còn dạy tôi về tinh thần đồng đội. Những sở thích này đóng vai trò quan trọng trong cuộc sống của tôi, giúp tôi luôn tràn đầy năng lượng và hạnh phúc.'
  },
  {
    title: 'Gia đình của tôi',
    englishTitle: 'My Family',
    level: 'Beginner',
    prompt: 'Kể về các thành viên trong gia đình bạn, công việc của họ và một hoạt động chung hoặc kỷ niệm đặc biệt mà cả nhà thường làm cùng nhau.',
    outline: [
      'Số lượng thành viên và giới thiệu chung (Number of members)',
      'Mô tả nghề nghiệp & tính cách từng người (Jobs & Personalities)',
      'Các hoạt động chung gắn kết gia đình (Shared activities)'
    ],
    vocab: [
      { word: 'family of four', meaningVi: 'gia đình 4 người' },
      { word: 'warm-hearted', meaningVi: 'ấm áp, nhân hậu' },
      { word: 'close to each other', meaningVi: 'thân thiết với nhau' },
      { word: 'have dinner together', meaningVi: 'ăn tối cùng nhau' },
      { word: 'source of support', meaningVi: 'nguồn nâng đỡ/hỗ trợ' }
    ],
    sample: 'I live in a happy family of four members: my father, my mother, my elder sister, and me. My father is a high school teacher, and he is a very patient and wise man. My mother is a warm-hearted homemaker who cooks the most delicious meals. My sister is currently working as a bank teller, and we are very close to each other. Although we are all busy during the week, we make sure to have dinner together every single day. On weekends, we usually watch movies or go on picnics. I love my family very much because they are always my greatest source of support and encouragement.',
    translation: 'Tôi sống trong một gia đình hạnh phúc gồm bốn thành viên: bố tôi, mẹ tôi, chị gái tôi và tôi. Bố tôi là giáo viên trung học, ông là một người rất kiên nhẫn và thông thái. Mẹ tôi là một người nội trợ ấm áp, người nấu những món ăn ngon nhất. Chị gái tôi hiện đang làm giao dịch viên ngân hàng, và chúng tôi rất thân thiết với nhau. Mặc dù tất cả chúng tôi đều bận rộn trong tuần, chúng tôi luôn đảm bảo ăn tối cùng nhau mỗi ngày. Vào cuối tuần, chúng tôi thường xem phim hoặc đi dã ngoại. Tôi yêu gia đình mình rất nhiều vì họ luôn là nguồn hỗ trợ và động viên lớn nhất của tôi.'
  },
  {
    title: 'Mục tiêu nghề nghiệp',
    englishTitle: 'Career Goals',
    level: 'Intermediate',
    prompt: 'Thảo luận về công việc hoặc chuyên ngành hiện tại của bạn, cùng với những mong muốn và mục tiêu nghề nghiệp ngắn hạn & dài hạn.',
    outline: [
      'Công việc/Chuyên ngành hiện tại (Current Focus)',
      'Mục tiêu ngắn hạn: học chứng chỉ, nâng cao kỹ năng (Short-term goals)',
      'Mục tiêu dài hạn: thăng tiến, vị trí mong muốn (Long-term goals)',
      'Các hành động cần thiết để đạt được mục tiêu (Action Plan)'
    ],
    vocab: [
      { word: 'master full-stack web development', meaningVi: 'làm chủ phát triển web full-stack' },
      { word: 'short-term goal', meaningVi: 'mục tiêu ngắn hạn' },
      { word: 'obtain professional certifications', meaningVi: 'đạt được chứng chỉ nghề nghiệp' },
      { word: 'become a technical lead', meaningVi: 'trở thành trưởng nhóm kỹ thuật' },
      { word: 'continuous learning', meaningVi: 'học tập liên tục' }
    ],
    sample: 'Setting clear career goals is essential for professional growth. Currently, I am focused on mastering full-stack web development. In the short term, I want to obtain professional certifications in cloud computing and improve my English fluency to collaborate effectively with international clients. In the long term, my goal is to become a technical lead or a software architect. I believe that continuous learning, adaptability, and dedication are the keys to achieving these career milestones and making a positive impact on my company\'s success.',
    translation: 'Đặt mục tiêu nghề nghiệp rõ ràng là rất quan trọng để phát triển chuyên môn. Hiện tại, tôi đang tập trung vào việc làm chủ phát triển web full-stack. Trong ngắn hạn, tôi muốn đạt được các chứng chỉ chuyên môn về điện toán đám mây và nâng cao khả năng lưu loát tiếng Anh để cộng tác hiệu quả với khách hàng quốc tế. Về lâu dài, mục tiêu của tôi là trở thành trưởng nhóm kỹ thuật hoặc kiến trúc sư phần mềm. Tôi tin rằng việc học tập liên tục, khả năng thích ứng và sự tận tụy là chìa khóa để đạt được các cột mốc sự nghiệp này và đóng góp tích cực vào thành công của công ty.'
  },
  {
    title: 'Lợi ích của Làm việc từ xa',
    englishTitle: 'Benefits of Remote Work',
    level: 'Advanced',
    prompt: 'Phân tích các ưu và nhược điểm của xu hướng làm việc từ xa (remote working) trong thời đại số.',
    outline: [
      'Giới thiệu xu thế Remote Work (Introduction to remote work)',
      'Các lợi ích chính: Tiết kiệm thời gian, linh hoạt (Key advantages)',
      'Các thách thức: Thiếu tương tác trực tiếp, xao nhãng (Key challenges)',
      'Kết luận và ý kiến cá nhân (Conclusion & Personal stance)'
    ],
    vocab: [
      { word: 'flexible working hours', meaningVi: 'giờ làm việc linh hoạt' },
      { word: 'eliminate commuting time', meaningVi: 'loại bỏ thời gian đi lại' },
      { word: 'self-discipline', meaningVi: 'tính tự giác' },
      { word: 'work-life balance', meaningVi: 'cân bằng cuộc sống và công việc' },
      { word: 'face-to-face interaction', meaningVi: 'tương tác trực tiếp' }
    ],
    sample: 'The rise of remote work has transformed the modern workforce. One of the main advantages is the flexibility it offers, allowing employees to set their own schedules and eliminate long daily commutes. This leads to a better work-life balance and increased productivity. However, remote work also presents significant challenges, such as the lack of face-to-face interaction, which can cause feelings of isolation. Additionally, working from home requires high self-discipline to avoid household distractions. In conclusion, while remote work has clear benefits, employees must develop strong self-management skills to succeed in this environment.',
    translation: 'Sự trỗi dậy của làm việc từ xa đã biến đổi lực lượng lao động hiện đại. Một trong những ưu điểm chính là sự linh hoạt mà nó mang lại, cho phép nhân viên tự thiết lập lịch trình và loại bỏ thời gian di chuyển dài ngày. Điều này dẫn đến sự cân bằng giữa cuộc sống - công việc tốt hơn và tăng năng suất. Tuy nhiên, làm việc từ xa cũng đặt ra những thách thức đáng kể, chẳng hạn như thiếu sự tương tác trực tiếp, có thể gây ra cảm giác cô lập. Ngoài ra, làm việc tại nhà đòi hỏi tính tự giác cao để tránh những xao nhãng trong gia đình. Tóm lại, mặc dù làm việc từ xa có những lợi ích rõ ràng, nhân viên phải phát triển kỹ năng tự quản lý mạnh mẽ để thành công trong môi trường này.'
  }
];
