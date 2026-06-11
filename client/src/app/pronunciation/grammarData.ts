// ─── Verbs (Động từ) ──────────────────────────────────────────────────────────
export const COMMON_VERBS = [
  { verb: 'be', v2: 'was/were', v3: 'been', ipa: '/biː/', vi: 'thì, là, ở', type: 'irregular', example: 'I am a student.' },
  { verb: 'have', v2: 'had', v3: 'had', ipa: '/hæv/', vi: 'có', type: 'irregular', example: 'She has two cats.' },
  { verb: 'do', v2: 'did', v3: 'done', ipa: '/duː/', vi: 'làm', type: 'irregular', example: 'I do my homework.' },
  { verb: 'go', v2: 'went', v3: 'gone', ipa: '/ɡəʊ/', vi: 'đi', type: 'irregular', example: 'They go to school.' },
  { verb: 'say', v2: 'said', v3: 'said', ipa: '/seɪ/', vi: 'nói', type: 'irregular', example: 'He said hello.' },
  { verb: 'get', v2: 'got', v3: 'got/gotten', ipa: '/ɡet/', vi: 'nhận, lấy', type: 'irregular', example: 'I got a gift.' },
  { verb: 'make', v2: 'made', v3: 'made', ipa: '/meɪk/', vi: 'làm, tạo', type: 'irregular', example: 'She made a cake.' },
  { verb: 'know', v2: 'knew', v3: 'known', ipa: '/nəʊ/', vi: 'biết', type: 'irregular', example: 'I know the answer.' },
  { verb: 'think', v2: 'thought', v3: 'thought', ipa: '/θɪŋk/', vi: 'nghĩ', type: 'irregular', example: 'I think so.' },
  { verb: 'take', v2: 'took', v3: 'taken', ipa: '/teɪk/', vi: 'lấy, mang', type: 'irregular', example: 'Take this book.' },
  { verb: 'come', v2: 'came', v3: 'come', ipa: '/kʌm/', vi: 'đến', type: 'irregular', example: 'Come here please.' },
  { verb: 'see', v2: 'saw', v3: 'seen', ipa: '/siː/', vi: 'nhìn thấy', type: 'irregular', example: 'I see a bird.' },
  { verb: 'give', v2: 'gave', v3: 'given', ipa: '/ɡɪv/', vi: 'cho, tặng', type: 'irregular', example: 'Give me a hand.' },
  { verb: 'find', v2: 'found', v3: 'found', ipa: '/faɪnd/', vi: 'tìm thấy', type: 'irregular', example: 'I found my key.' },
  { verb: 'tell', v2: 'told', v3: 'told', ipa: '/tel/', vi: 'kể, nói', type: 'irregular', example: 'Tell me a story.' },
  { verb: 'write', v2: 'wrote', v3: 'written', ipa: '/raɪt/', vi: 'viết', type: 'irregular', example: 'She writes novels.' },
  { verb: 'read', v2: 'read', v3: 'read', ipa: '/riːd/', vi: 'đọc', type: 'irregular', example: 'I read every day.' },
  { verb: 'eat', v2: 'ate', v3: 'eaten', ipa: '/iːt/', vi: 'ăn', type: 'irregular', example: 'We eat lunch at noon.' },
  { verb: 'drink', v2: 'drank', v3: 'drunk', ipa: '/drɪŋk/', vi: 'uống', type: 'irregular', example: 'Drink some water.' },
  { verb: 'run', v2: 'ran', v3: 'run', ipa: '/rʌn/', vi: 'chạy', type: 'irregular', example: 'He runs every morning.' },
  { verb: 'play', v2: 'played', v3: 'played', ipa: '/pleɪ/', vi: 'chơi', type: 'regular', example: 'The kids play outside.' },
  { verb: 'work', v2: 'worked', v3: 'worked', ipa: '/wɜːk/', vi: 'làm việc', type: 'regular', example: 'I work from home.' },
  { verb: 'live', v2: 'lived', v3: 'lived', ipa: '/lɪv/', vi: 'sống', type: 'regular', example: 'We live in Hanoi.' },
  { verb: 'study', v2: 'studied', v3: 'studied', ipa: '/ˈstʌd.i/', vi: 'học', type: 'regular', example: 'She studies hard.' },
  { verb: 'listen', v2: 'listened', v3: 'listened', ipa: '/ˈlɪs.ən/', vi: 'nghe', type: 'regular', example: 'Listen to music.' },
  { verb: 'speak', v2: 'spoke', v3: 'spoken', ipa: '/spiːk/', vi: 'nói', type: 'irregular', example: 'She speaks English.' },
  { verb: 'buy', v2: 'bought', v3: 'bought', ipa: '/baɪ/', vi: 'mua', type: 'irregular', example: 'I bought a new phone.' },
  { verb: 'teach', v2: 'taught', v3: 'taught', ipa: '/tiːtʃ/', vi: 'dạy', type: 'irregular', example: 'He teaches math.' },
  { verb: 'learn', v2: 'learnt/learned', v3: 'learnt/learned', ipa: '/lɜːn/', vi: 'học', type: 'irregular', example: 'I learn new words daily.' },
  { verb: 'sleep', v2: 'slept', v3: 'slept', ipa: '/sliːp/', vi: 'ngủ', type: 'irregular', example: 'The baby sleeps well.' },
];

export const VERB_TYPES = [
  { type: 'Action Verbs (Động từ hành động)', desc: 'Diễn tả hành động cụ thể mà chủ ngữ thực hiện.', examples: ['run', 'eat', 'write', 'speak', 'play', 'cook'], vi: 'chạy, ăn, viết, nói, chơi, nấu' },
  { type: 'Stative Verbs (Động từ trạng thái)', desc: 'Diễn tả trạng thái, cảm xúc, suy nghĩ. Thường KHÔNG dùng ở thì tiếp diễn.', examples: ['know', 'believe', 'love', 'want', 'need', 'belong'], vi: 'biết, tin, yêu, muốn, cần, thuộc về' },
  { type: 'Linking Verbs (Động từ nối)', desc: 'Nối chủ ngữ với bổ ngữ mô tả, không diễn tả hành động.', examples: ['be', 'seem', 'become', 'appear', 'look', 'feel'], vi: 'thì/là/ở, dường như, trở nên, trông có vẻ, cảm thấy' },
  { type: 'Modal Verbs (Động từ khiếm khuyết)', desc: 'Bổ trợ nghĩa cho động từ chính: khả năng, sự cho phép, nghĩa vụ.', examples: ['can', 'could', 'will', 'would', 'should', 'must', 'may', 'might'], vi: 'có thể, sẽ, nên, phải, có lẽ' },
  { type: 'Phrasal Verbs (Cụm động từ)', desc: 'Động từ kết hợp với giới từ/trạng từ tạo nghĩa mới.', examples: ['give up', 'look after', 'turn on', 'put off', 'get along', 'break down'], vi: 'bỏ cuộc, chăm sóc, bật, hoãn, hòa hợp, hỏng' },
];

// ─── Adjectives (Tính từ) ─────────────────────────────────────────────────────
export const COMMON_ADJECTIVES = [
  { word: 'big', comparative: 'bigger', superlative: 'biggest', ipa: '/bɪɡ/', vi: 'to, lớn', rule: '+ger/+gest' },
  { word: 'small', comparative: 'smaller', superlative: 'smallest', ipa: '/smɔːl/', vi: 'nhỏ', rule: '+er/+est' },
  { word: 'happy', comparative: 'happier', superlative: 'happiest', ipa: '/ˈhæp.i/', vi: 'vui, hạnh phúc', rule: 'y→ier/iest' },
  { word: 'beautiful', comparative: 'more beautiful', superlative: 'most beautiful', ipa: '/ˈbjuː.tɪ.fəl/', vi: 'đẹp', rule: 'more/most' },
  { word: 'good', comparative: 'better', superlative: 'best', ipa: '/ɡʊd/', vi: 'tốt', rule: 'bất quy tắc' },
  { word: 'bad', comparative: 'worse', superlative: 'worst', ipa: '/bæd/', vi: 'xấu, tệ', rule: 'bất quy tắc' },
  { word: 'fast', comparative: 'faster', superlative: 'fastest', ipa: '/fɑːst/', vi: 'nhanh', rule: '+er/+est' },
  { word: 'slow', comparative: 'slower', superlative: 'slowest', ipa: '/sləʊ/', vi: 'chậm', rule: '+er/+est' },
  { word: 'hot', comparative: 'hotter', superlative: 'hottest', ipa: '/hɒt/', vi: 'nóng', rule: 'gấp đôi+er/est' },
  { word: 'cold', comparative: 'colder', superlative: 'coldest', ipa: '/kəʊld/', vi: 'lạnh', rule: '+er/+est' },
  { word: 'tall', comparative: 'taller', superlative: 'tallest', ipa: '/tɔːl/', vi: 'cao', rule: '+er/+est' },
  { word: 'short', comparative: 'shorter', superlative: 'shortest', ipa: '/ʃɔːt/', vi: 'ngắn, thấp', rule: '+er/+est' },
  { word: 'expensive', comparative: 'more expensive', superlative: 'most expensive', ipa: '/ɪkˈspen.sɪv/', vi: 'đắt', rule: 'more/most' },
  { word: 'cheap', comparative: 'cheaper', superlative: 'cheapest', ipa: '/tʃiːp/', vi: 'rẻ', rule: '+er/+est' },
  { word: 'interesting', comparative: 'more interesting', superlative: 'most interesting', ipa: '/ˈɪn.trəs.tɪŋ/', vi: 'thú vị', rule: 'more/most' },
  { word: 'far', comparative: 'farther/further', superlative: 'farthest/furthest', ipa: '/fɑːr/', vi: 'xa', rule: 'bất quy tắc' },
  { word: 'many/much', comparative: 'more', superlative: 'most', ipa: '/ˈmen.i/', vi: 'nhiều', rule: 'bất quy tắc' },
  { word: 'little', comparative: 'less', superlative: 'least', ipa: '/ˈlɪt.əl/', vi: 'ít', rule: 'bất quy tắc' },
];

export const ADJECTIVE_RULES = [
  { rule: 'Tính từ 1 âm tiết: thêm -er / -est', examples: 'tall → taller → tallest, old → older → oldest', note: 'Nếu kết thúc bằng 1 nguyên âm + 1 phụ âm → gấp đôi phụ âm: big → bigger → biggest' },
  { rule: 'Tính từ 2 âm tiết đuôi -y: đổi y → -ier / -iest', examples: 'happy → happier → happiest, easy → easier → easiest', note: 'Chỉ áp dụng khi đuôi -y, các trường hợp khác dùng more/most' },
  { rule: 'Tính từ 2+ âm tiết: dùng more / most', examples: 'beautiful → more beautiful → most beautiful', note: 'Áp dụng cho tính từ dài, không thêm -er/-est' },
  { rule: 'Bất quy tắc (Irregular)', examples: 'good → better → best, bad → worse → worst, far → farther → farthest', note: 'Cần học thuộc lòng, không theo quy tắc nào' },
];

export const ADJECTIVE_TYPES = [
  { type: 'Descriptive (Mô tả)', desc: 'Miêu tả tính chất, đặc điểm của danh từ.', examples: ['big', 'beautiful', 'smart', 'tall', 'kind'], vi: 'lớn, đẹp, thông minh, cao, tốt bụng' },
  { type: 'Quantitative (Số lượng)', desc: 'Chỉ số lượng hoặc mức độ.', examples: ['many', 'few', 'some', 'much', 'several'], vi: 'nhiều, ít, một vài, nhiều, một số' },
  { type: 'Demonstrative (Chỉ định)', desc: 'Xác định cụ thể danh từ nào.', examples: ['this', 'that', 'these', 'those'], vi: 'này, đó, những cái này, những cái đó' },
  { type: 'Possessive (Sở hữu)', desc: 'Cho biết danh từ thuộc về ai.', examples: ['my', 'your', 'his', 'her', 'our', 'their'], vi: 'của tôi, của bạn, của anh ấy...' },
  { type: 'Interrogative (Nghi vấn)', desc: 'Dùng để hỏi về danh từ.', examples: ['which', 'what', 'whose'], vi: 'cái nào, cái gì, của ai' },
];

// New data: Adjectives for People vs. Things / Other Cases
export const ADJECTIVES_USE_CASES = {
  peopleOnly: [
    { word: 'kind', ipa: '/kaɪnd/', vi: 'tốt bụng', ex: 'She is a kind teacher.', exVi: 'Cô ấy là một giáo viên tốt bụng.' },
    { word: 'generous', ipa: '/ˈdʒen.ər.əs/', vi: 'hào phóng', ex: 'He is very generous to friends.', exVi: 'Anh ấy rất hào phóng với bạn bè.' },
    { word: 'stubborn', ipa: '/ˈstʌb.ən/', vi: 'bướng bỉnh, cứng đầu', ex: 'Why are you so stubborn?', exVi: 'Tại sao cậu lại bướng bỉnh thế?' },
    { word: 'polite', ipa: '/pəˈlaɪt/', vi: 'lịch sự', ex: 'The boy is polite.', exVi: 'Cậu bé rất lịch sự.' },
    { word: 'lazy', ipa: '/ˈleɪ.zi/', vi: 'lười biếng', ex: 'He is lazy and sleeps all day.', exVi: 'Nó lười biếng và ngủ cả ngày.' },
    { word: 'smart', ipa: '/smɑːt/', vi: 'thông minh', ex: 'The smart student passed the exam.', exVi: 'Học sinh thông minh đã thi đỗ.' }
  ],
  thingsOnly: [
    { word: 'spacious', ipa: '/ˈspeɪ.ʃəs/', vi: 'rộng rãi (không gian)', ex: 'This living room is spacious.', exVi: 'Phòng khách này thật rộng rãi.' },
    { word: 'delicious', ipa: '/dɪˈlɪʃ.əs/', vi: 'ngon miệng (thức ăn)', ex: 'The cake is delicious.', exVi: 'Chiếc bánh này ngon tuyệt.' },
    { word: 'modern', ipa: '/ˈmɒd.ən/', vi: 'hiện đại (công nghệ, thiết kế)', ex: 'They live in a modern building.', exVi: 'Họ sống trong một tòa nhà hiện đại.' },
    { word: 'automatic', ipa: '/ˌɔː.təˈmæt.ɪk/', vi: 'tự động (máy móc)', ex: 'An automatic car is easy to drive.', exVi: 'Xe số tự động rất dễ lái.' },
    { word: 'heavy', ipa: '/ˈhev.i/', vi: 'nặng (khối lượng)', ex: 'This box is too heavy to lift.', exVi: 'Cái hộp này quá nặng để nhấc lên.' },
    { word: 'expensive', ipa: '/ɪkˈspen.sɪv/', vi: 'đắt tiền', ex: 'Gold is expensive.', exVi: 'Vàng thì đắt đỏ.' }
  ],
  edVsIng: [
    { ed: 'bored', edVi: 'buồn chán (cảm xúc của người)', ing: 'boring', ingVi: 'tẻ nhạt (tính chất của vật/sự việc)', exEd: 'I am bored.', exEdVi: 'Tôi thấy buồn chán.', exIng: 'The movie is boring.', exIngVi: 'Bộ phim rất tẻ nhạt.' },
    { ed: 'excited', edVi: 'hào hứng (cảm xúc của người)', ing: 'exciting', ingVi: 'thú vị, kích thích (tính chất vật)', exEd: 'We are excited about the trip.', exEdVi: 'Chúng tôi hào hứng về chuyến đi.', exIng: 'It is an exciting match.', exIngVi: 'Đó là một trận đấu kịch tính.' },
    { ed: 'interested', edVi: 'quan tâm, thích thú (người)', ing: 'interesting', ingVi: 'thú vị, hay (vật/sự việc)', exEd: 'She is interested in history.', exEdVi: 'Cô ấy thích thú với lịch sử.', exIng: 'History is interesting.', exIngVi: 'Lịch sử rất thú vị.' },
    { ed: 'tired', edVi: 'mệt mỏi (cảm xúc của người)', ing: 'tiring', ingVi: 'gây mệt mỏi (tính chất công việc)', exEd: 'I am tired after work.', exEdVi: 'Tôi thấy mệt mỏi sau giờ làm.', exIng: 'This job is tiring.', exIngVi: 'Công việc này thật mệt mỏi.' },
    { ed: 'confused', edVi: 'bối rối, khó hiểu (người)', ing: 'confusing', ingVi: 'gây bối rối, rắc rối (vật)', exEd: 'He is confused by the map.', exEdVi: 'Anh ấy bị bối rối bởi bản đồ.', exIng: 'This map is confusing.', exIngVi: 'Tờ bản đồ này thật khó hiểu.' }
  ]
};

// ─── Adjectives for Body Parts & Appearance (Tính từ tả bộ phận & ngoại hình) ────
export const ADJECTIVES_BODY_PARTS = [
  {
    category: 'Mũi (Nose)',
    desc: 'Lưu ý cách mô tả dáng mũi chuẩn xác trong tiếng Anh.',
    items: [
      { word: 'straight nose', ipa: '/streɪt nəʊz/', vi: 'mũi thẳng', note: 'Dùng "straight nose" thay vì nhầm thành "long nose" (mũi dài - giống Pinocchio)', ex: 'He has a straight nose.', exVi: 'Anh ấy có sống mũi thẳng.' },
      { word: 'flat nose', ipa: '/flæt nəʊz/', vi: 'mũi tẹt', note: 'Đầu mũi thấp, bè.', ex: 'Many Asians have a flat nose.', exVi: 'Nhiều người châu Á có dáng mũi tẹt.' },
      { word: 'pointed nose', ipa: '/ˈpɔɪn.tɪd nəʊz/', vi: 'mũi dọc dừa, mũi nhọn', note: 'Sống mũi cao, đầu mũi nhọn thanh thoát.', ex: 'She is famous for her pointed nose.', exVi: 'Cô ấy nổi tiếng với chiếc mũi dọc dừa.' },
      { word: 'crooked nose', ipa: '/ˈkrʊk.ɪd nəʊz/', vi: 'mũi khoằm, mũi lệch', note: 'Mũi gồ ghề hoặc cong.', ex: 'The old boxer had a crooked nose.', exVi: 'Người võ sĩ già có chiếc mũi khoằm.' },
      { word: 'snub nose', ipa: '/snʌb nəʊz/', vi: 'mũi hếch', note: 'Mũi hơi ngắn, đầu mũi hếch lên nhẹ.', ex: 'She has a cute snub nose.', exVi: 'Cô ấy có chiếc mũi hếch xinh xắn.' },
      { word: 'hooked nose', ipa: '/hʊkt nəʊz/', vi: 'mũi khoằm diều hâu', note: 'Sống mũi nhô cao và cong quặp ở đầu.', ex: 'The villain has a hooked nose.', exVi: 'Nhân vật phản diện có chiếc mũi khoằm diều hâu.' }
    ]
  },
  {
    category: 'Tóc (Hair)',
    desc: 'Tả kết cấu, kiểu dáng tóc.',
    items: [
      { word: 'curly hair', ipa: '/ˈkɜː.li heər/', vi: 'tóc xoăn', note: 'Xoăn tít hoặc xoăn lọn nhỏ.', ex: 'She has dark curly hair.', exVi: 'Cô ấy có mái tóc xoăn màu sẫm.' },
      { word: 'straight hair', ipa: '/streɪt heər/', vi: 'tóc thẳng', note: 'Tóc tự nhiên thẳng suôn.', ex: 'I prefer straight hair.', exVi: 'Tôi thích tóc thẳng hơn.' },
      { word: 'wavy hair', ipa: '/ˈweɪ.vi heər/', vi: 'tóc gợn sóng', note: 'Xoăn nhẹ nhàng như sóng biển.', ex: 'His wavy hair looks very natural.', exVi: 'Mái tóc gợn sóng của anh ấy trông rất tự nhiên.' },
      { word: 'bald', ipa: '/bɔːld/', vi: 'hói, trọc đầu', note: 'Không có tóc hoặc ít tóc.', ex: 'He went bald in his thirties.', exVi: 'Anh ấy bị hói khi bước vào tuổi 30.' },
      { word: 'spiky hair', ipa: '/ˈspaɪ.ki heər/', vi: 'tóc dựng đứng', note: 'Tóc vuốt dựng nhọn.', ex: 'He styles his spiky hair with gel.', exVi: 'Anh ấy vuốt dựng mái tóc bằng keo vuốt tóc.' },
      { word: 'receding hairline', ipa: '/rɪˈsiː.dɪŋ ˈheə.laɪn/', vi: 'tóc hói chữ M', note: 'Tóc rụng thưa dần từ trán.', ex: 'He is worried about his receding hairline.', exVi: 'Anh ấy lo lắng về vầng trán hói chữ M của mình.' }
    ]
  },
  {
    category: 'Mắt (Eyes)',
    desc: 'Mô tả hình dáng hoặc mí mắt.',
    items: [
      { word: 'double-lidded eyes', ipa: '/ˈdʌb.əl lɪd.ɪd aɪz/', vi: 'mắt hai mí', note: 'Mí mắt rõ nét.', ex: 'She has big double-lidded eyes.', exVi: 'Cô ấy có đôi mắt hai mí to tròn.' },
      { word: 'single-lidded eyes', ipa: '/ˈsɪŋ.ɡəl lɪd.ɪd aɪz/', vi: 'mắt một mí', note: 'Mí mắt lót hoặc không có mí.', ex: 'Single-lidded eyes are beautiful too.', exVi: 'Mắt một mí cũng rất đẹp.' },
      { word: 'almond-shaped eyes', ipa: '/ˈɑː.mənd ʃeɪpt aɪz/', vi: 'mắt hạnh nhân', note: 'Mắt có phần đuôi hơi xếch nhẹ.', ex: 'She has charming almond-shaped eyes.', exVi: 'Cô ấy có đôi mắt hạnh nhân quyến rũ.' },
      { word: 'deep-set eyes', ipa: '/ˌdiːpˈset aɪz/', vi: 'mắt sâu hoắm', note: 'Hốc mắt sâu vào trong xương sọ.', ex: 'His deep-set eyes show intelligence.', exVi: 'Đôi mắt sâu của anh ấy thể hiện sự thông thái.' },
      { word: 'bloodshot eyes', ipa: '/ˈblʌd.ʃɒt aɪz/', vi: 'mắt đỏ ngầu', note: 'Mắt đỏ do mệt mỏi hoặc vỡ mao mạch.', ex: 'You have bloodshot eyes from lack of sleep.', exVi: 'Mắt bạn đỏ ngầu vì thiếu ngủ đấy.' }
    ]
  },
  {
    category: 'Khuôn mặt (Face)',
    desc: 'Mô tả hình dáng chung của khuôn mặt.',
    items: [
      { word: 'oval face', ipa: '/ˈəʊ.vəl feɪs/', vi: 'mặt trái xoan', note: 'Gương mặt cân đối, thon gọn.', ex: 'She has a beautiful oval face.', exVi: 'Cô ấy có khuôn mặt trái xoan rất đẹp.' },
      { word: 'round face', ipa: '/raʊnd feɪs/', vi: 'mặt tròn', note: 'Gương mặt bầu bĩnh, dễ mến.', ex: 'The baby has a cute round face.', exVi: 'Em bé có khuôn mặt tròn đáng yêu.' },
      { word: 'square face', ipa: '/skweər feɪs/', vi: 'mặt chữ điền', note: 'Gương mặt góc cạnh, vuông vức.', ex: 'He has a strong square face.', exVi: 'Anh ấy có khuôn mặt chữ điền nam tính.' },
      { word: 'heart-shaped face', ipa: '/hɑːt ʃeɪpt feɪs/', vi: 'mặt hình trái tim', note: 'Trán rộng, cằm nhọn.', ex: 'An oval or heart-shaped face is elegant.', exVi: 'Khuôn mặt trái xoan hoặc trái tim trông rất thanh tú.' },
      { word: 'freckled face', ipa: '/ˈfrek.əld feɪs/', vi: 'mặt đầy tàn nhang', note: 'Da mặt có nhiều đốm tàn nhang nhỏ.', ex: 'He has a friendly, freckled face.', exVi: 'Cậu ấy có khuôn mặt tàn nhang thân thiện.' }
    ]
  },
  {
    category: 'Thân hình (Body Shape & Height)',
    desc: 'Mô tả vóc dáng, hình thể và chiều cao.',
    items: [
      { word: 'slim / slender', ipa: '/slɪm/ / /ˈslen.dər/', vi: 'mảnh mai, thon thả', note: 'Gầy nhưng đẹp và khỏe mạnh.', ex: 'She stays slim by practicing yoga.', exVi: 'Cô ấy giữ vóc dáng thon thả nhờ tập yoga.' },
      { word: 'well-built', ipa: '/ˌwel ˈbɪlt/', vi: 'vạm vỡ, cơ bắp', note: 'Thân hình săn chắc, khỏe mạnh.', ex: 'The gym instructor is well-built.', exVi: 'Huấn luyện viên thể hình có thân hình rất vạm vỡ.' },
      { word: 'plump / chubby', ipa: '/plʌmp/ / /ˈtʃʌb.i/', vi: 'đầy đặn / mũm mĩm', note: 'Hơi mập nhẹ nhưng đáng yêu.', ex: 'The child has chubby cheeks.', exVi: 'Đứa trẻ có đôi má phúng phính đáng yêu.' },
      { word: 'stocky', ipa: '/ˈstɒk.i/', vi: 'chắc nịch, lùn mập', note: 'Thấp bé nhưng to ngang, rất chắc.', ex: 'He is a stocky man with broad shoulders.', exVi: 'Anh ấy là người đàn ông chắc nịch với bờ vai rộng.' },
      { word: 'skinny / bony', ipa: '/ˈskɪn.i/ / /ˈbəʊ.ni/', vi: 'gầy gò, trơ xương', note: 'Gầy quá mức, thiếu sức sống.', ex: 'The cat was skinny when we found it.', exVi: 'Con mèo gầy trơ xương khi chúng tôi tìm thấy nó.' }
    ]
  },
  {
    category: 'Miệng & Môi & Răng (Mouth & Lips & Teeth)',
    desc: 'Mô tả môi, miệng và khuôn răng.',
    items: [
      { word: 'full lips', ipa: '/fʊl lɪps/', vi: 'môi dày, đầy đặn', note: 'Môi cong đầy đặn, gợi cảm.', ex: 'She has beautiful full lips.', exVi: 'Cô ấy có đôi môi dày đầy đặn rất đẹp.' },
      { word: 'thin lips', ipa: '/θɪn lɪps/', vi: 'môi mỏng', note: 'Môi hẹp dẹt.', ex: 'He spoke with tight, thin lips.', exVi: 'Anh ấy nói với đôi môi mỏng mím chặt.' },
      { word: 'chapped lips', ipa: '/tʃæpt lɪps/', vi: 'môi nứt nẻ', note: 'Môi khô nứt do thời tiết lạnh hoặc thiếu nước.', ex: 'Apply balm on your chapped lips.', exVi: 'Hãy bôi son dưỡng lên đôi môi nứt nẻ của bạn.' },
      { word: 'crooked teeth', ipa: '/ˈkrʊk.ɪd tiːθ/', vi: 'răng khấp khểnh', note: 'Răng lệch lạc, mọc không đều.', ex: 'Braces can align crooked teeth.', exVi: 'Niềng răng có thể chỉnh lại hàm răng khấp khểnh.' },
      { word: 'gap-toothed', ipa: '/ɡæp tuːθt/', vi: 'răng thưa', note: 'Có khe hở giữa các răng cửa.', ex: 'She has a cute gap-toothed smile.', exVi: 'Cô ấy có nụ cười răng thưa rất đáng yêu.' }
    ]
  },
  {
    category: 'Da & Tai (Skin & Ears)',
    desc: 'Mô tả màu sắc da và dáng tai.',
    items: [
      { word: 'tanned skin', ipa: '/tænd skɪn/', vi: 'da rám nắng', note: 'Màu da khỏe khoắn do phơi nắng.', ex: 'She returned with beautifully tanned skin.', exVi: 'Cô ấy trở về với làn da rám nắng tuyệt đẹp.' },
      { word: 'pale skin', ipa: '/peɪl skɪn/', vi: 'da nhợt nhạt, xanh xao', note: 'Mất sắc tố hồng hào do ốm hoặc thiếu nắng.', ex: 'Her pale skin made her look tired.', exVi: 'Làn da xanh xao làm cô ấy trông mệt mỏi.' },
      { word: 'fair skin', ipa: '/feər skɪn/', vi: 'da trắng hồng', note: 'Da sáng màu, mịn màng tự nhiên.', ex: 'Fair skin burns easily in the sun.', exVi: 'Làn da trắng hồng dễ bị cháy nắng dưới trời nắng gắt.' },
      { word: 'lobed ears', ipa: '/ləʊbd ɪərz/', vi: 'tai có dái tai dày', note: 'Dái tai to tròn, phong thủy tốt.', ex: 'He has large lobed ears.', exVi: 'Anh ấy có đôi tai với phần dái tai dày.' }
    ]
  },
  {
    category: 'Tay & Chân (Hands & Legs)',
    desc: 'Mô tả chi tiết chi trên và chi dưới.',
    items: [
      { word: 'rough hands', ipa: '/rʌf hændz/', vi: 'tay thô ráp', note: 'Da tay chai sạn do làm việc nặng.', ex: 'My father has rough hands from gardening.', exVi: 'Bố tôi có đôi tay thô ráp vì làm vườn.' },
      { word: 'bow-legged', ipa: '/ˈbəʊˌleɡ.ɪd/', vi: 'chân vòng kiềng', note: 'Chân cong dạng hình cánh cung.', ex: 'He walks with a slightly bow-legged gait.', exVi: 'Anh ấy đi với dáng đi chân vòng kiềng nhẹ.' },
      { word: 'slender fingers', ipa: '/ˈslen.dər ˈfɪŋ.ɡərz/', vi: 'ngón tay búp măng', note: 'Ngón tay dài, thon gọn, thanh tú.', ex: 'The pianist has slender fingers.', exVi: 'Người nghệ sĩ piano có những ngón tay búp măng thon dài.' }
    ]
  }
];


// ─── Possessive Pronouns (Đại từ sở hữu) ─────────────────────────────────────
export const POSSESSIVE_TABLE = [
  { subject: 'I', object: 'me', possAdj: 'my', possPron: 'mine', reflexive: 'myself', ipa: '/maɪ/ → /maɪn/', vi: 'tôi', exAdj: 'This is my book.', exPron: 'This book is mine.', exAdjVi: 'Đây là quyển sách của tôi.', exPronVi: 'Quyển sách này là của tôi.' },
  { subject: 'You', object: 'you', possAdj: 'your', possPron: 'yours', reflexive: 'yourself', ipa: '/jɔːr/ → /jɔːrz/', vi: 'bạn', exAdj: 'Is this your pen?', exPron: 'Is this pen yours?', exAdjVi: 'Đây có phải bút của bạn?', exPronVi: 'Cây bút này có phải của bạn không?' },
  { subject: 'He', object: 'him', possAdj: 'his', possPron: 'his', reflexive: 'himself', ipa: '/hɪz/ → /hɪz/', vi: 'anh ấy', exAdj: 'His car is new.', exPron: 'The new car is his.', exAdjVi: 'Xe của anh ấy mới.', exPronVi: 'Chiếc xe mới là của anh ấy.' },
  { subject: 'She', object: 'her', possAdj: 'her', possPron: 'hers', reflexive: 'herself', ipa: '/hɜːr/ → /hɜːrz/', vi: 'cô ấy', exAdj: 'Her dress is pretty.', exPron: 'The pretty dress is hers.', exAdjVi: 'Váy của cô ấy đẹp.', exPronVi: 'Chiếc váy đẹp là của cô ấy.' },
  { subject: 'It', object: 'it', possAdj: 'its', possPron: '(không dùng)', reflexive: 'itself', ipa: '/ɪts/', vi: 'nó', exAdj: 'The dog wagged its tail.', exPron: '—', exAdjVi: 'Con chó vẫy đuôi của nó.', exPronVi: '—' },
  { subject: 'We', object: 'us', possAdj: 'our', possPron: 'ours', reflexive: 'ourselves', ipa: '/aʊər/ → /aʊərz/', vi: 'chúng tôi', exAdj: 'Our house is big.', exPron: 'The big house is ours.', exAdjVi: 'Nhà của chúng tôi to.', exPronVi: 'Ngôi nhà lớn là của chúng tôi.' },
  { subject: 'They', object: 'them', possAdj: 'their', possPron: 'theirs', reflexive: 'themselves', ipa: '/ðeər/ → /ðeərz/', vi: 'họ', exAdj: 'Their garden is lovely.', exPron: 'The lovely garden is theirs.', exAdjVi: 'Vườn của họ đẹp.', exPronVi: 'Khu vườn đẹp là của họ.' },
];

export const POSSESSIVE_RULES = [
  { rule: 'Tính từ sở hữu (Possessive Adjectives)', desc: 'Đứng TRƯỚC danh từ để chỉ sở hữu. Luôn đi kèm danh từ.', formula: 'Possessive Adj + Noun', examples: ['my book', 'your phone', 'his car', 'her bag', 'our school', 'their house'], exVi: 'sách của tôi, điện thoại của bạn, xe của anh ấy...' },
  { rule: 'Đại từ sở hữu (Possessive Pronouns)', desc: 'Đứng MỘT MÌNH thay thế cho "tính từ sở hữu + danh từ". Không đi kèm danh từ.', formula: 'Noun + be + Possessive Pronoun', examples: ['This is mine.', 'That phone is yours.', 'The car is his.', 'The bag is hers.'], exVi: 'Cái này là của tôi. Điện thoại đó là của bạn...' },
  { rule: 'Đại từ phản thân (Reflexive Pronouns)', desc: 'Dùng khi chủ ngữ và tân ngữ là cùng một người/vật. Nhấn mạnh "tự mình".', formula: 'Subject + Verb + Reflexive', examples: ['I taught myself.', 'She hurt herself.', 'They enjoyed themselves.'], exVi: 'Tôi tự dạy bản thân. Cô ấy tự làm đau mình. Họ tự vui chơi.' },
];

// ─── English Foundation Grammar Data ──────────────────────────────────────────
export const FOUNDATION_TOPICS = [
  {
    id: 'pronouns',
    title: 'Subject Pronouns (Đại Từ Nhân Xưng)',
    desc: 'Làm quen với đại từ đóng vai trò chủ ngữ và tân ngữ trong câu.',
    icon: 'user',
    color: 'border-sky-200 bg-sky-50 text-sky-800',
    content: {
      theory: 'Đại từ nhân xưng là từ dùng để đại diện cho một danh từ chỉ người hoặc vật để tránh lặp từ. Dưới đây là bảng phân loại cốt lõi và các ví dụ phát âm mẫu.',
      table: [
        { pronoun: 'I', role: 'Chủ ngữ (S)', meaning: 'Tôi, tớ, mình (Số ít, ngôi 1)', example: 'I study English every day.' },
        { pronoun: 'me', role: 'Tân ngữ (O)', meaning: 'Tôi (đứng sau động từ)', example: 'She loves me.' },
        { pronoun: 'You', role: 'Chủ ngữ / Tân ngữ', meaning: 'Bạn, các bạn (Ngôi 2)', example: 'You are a good friend.' },
        { pronoun: 'We', role: 'Chủ ngữ (S)', meaning: 'Chúng tôi, chúng ta (Số nhiều, ngôi 1)', example: 'We study grammar.' },
        { pronoun: 'us', role: 'Tân ngữ (O)', meaning: 'Chúng tôi (đứng sau động từ)', example: 'The teacher helps us.' },
        { pronoun: 'They', role: 'Chủ ngữ (S)', meaning: 'Họ, chúng nó (Số nhiều, ngôi 3)', example: 'They speak English fluently.' },
        { pronoun: 'He', role: 'Chủ ngữ (S)', meaning: 'Anh ấy, ông ấy (Số ít, ngôi 3 nam)', example: 'He works at a school.' },
        { pronoun: 'him', role: 'Tân ngữ (O)', meaning: 'Anh ấy (đứng sau động từ)', example: 'I talk to him.' },
        { pronoun: 'She', role: 'Chủ ngữ (S)', meaning: 'Cô ấy, bà ấy (Số ít, ngôi 3 nữ)', example: 'She is very smart.' },
        { pronoun: 'her', role: 'Tân ngữ (O)', meaning: 'Cô ấy (đứng sau động từ)', example: 'Tell her the truth.' },
        { pronoun: 'It', role: 'Chủ ngữ / Tân ngữ', meaning: 'Nó (Số ít, ngôi 3 vật/động vật)', example: 'It is a beautiful day.' },
      ],
      quiz: [
        { question: '... is my sister. Her name is Lan.', options: ['He', 'She', 'They', 'It'], answer: 'She', explanation: 'Chủ ngữ chỉ nữ số ít ở đây là She.' },
        { question: 'Nam and I are friends. ... learn English together.', options: ['We', 'They', 'You', 'I'], answer: 'We', explanation: '"Nam and I" tương đương với chúng tôi (We).' },
        { question: 'Where is the book? ... is on the table.', options: ['He', 'She', 'It', 'We'], answer: 'It', explanation: '"The book" là vật số ít nên dùng It.' },
        { question: 'Do you know that boy? I want to invite ... to the party.', options: ['he', 'him', 'she', 'us'], answer: 'him', explanation: 'Đứng sau động từ "invite" ta dùng tân ngữ chỉ nam số ít "him".' },
        { question: 'My parents are retired. ... live in a small village.', options: ['We', 'They', 'You', 'He'], answer: 'They', explanation: 'Chủ ngữ chỉ số nhiều "parents" ở đây thay thế bằng They.' },
        { question: 'This is my mother. I love ... very much.', options: ['she', 'her', 'it', 'me'], answer: 'her', explanation: 'Tân ngữ đứng sau động từ chỉ nữ số ít là her.' },
        { question: 'John is a teacher. ... teaches English at high school.', options: ['He', 'Him', 'His', 'She'], answer: 'He', explanation: 'John là nam số ít, làm chủ ngữ trước động từ nên chọn He.' },
        { question: 'Our cat is cute. ... likes playing with balls.', options: ['He', 'It', 'We', 'They'], answer: 'It', explanation: 'Thú cưng/động vật số ít ta dùng đại từ It.' },
        { question: 'Can you help ...? I cannot lift this heavy box.', options: ['me', 'I', 'him', 'us'], answer: 'me', explanation: 'Tân ngữ chịu tác động của hành động "help" của người nói là me.' },
        { question: 'We are hungry. Please give ... some bread.', options: ['us', 'we', 'them', 'me'], answer: 'us', explanation: 'Đứng sau động từ "give" cần tân ngữ. "We" biến thành tân ngữ "us".' },
      ]
    }
  },
  {
    id: 'tobe',
    title: 'Verb "To Be" (Động từ To Be)',
    desc: 'Làm chủ động từ cốt lõi mang ý nghĩa: Thì, Là, Ở.',
    icon: 'star',
    color: 'border-amber-200 bg-amber-50 text-amber-800',
    content: {
      theory: 'Động từ "To Be" là động từ cơ bản nhất trong tiếng Anh. Ở thời hiện tại, nó có 3 dạng (am, is, are) chia theo chủ ngữ.',
      forms: [
        { tense: 'Hiện tại đơn (Present Simple)', rules: 'I + am | He / She / It / Danh từ số ít + is | You / We / They / Danh từ số nhiều + are', example: 'I am a student. She is busy. We are at home.' },
        { tense: 'Quá khứ đơn (Past Simple)', rules: 'I / He / She / It / Danh từ số ít + was | You / We / They / Danh từ số nhiều + were', example: 'They were happy yesterday. He was tired.' },
        { tense: 'Tương lai đơn (Future Simple)', rules: 'Tất cả các chủ ngữ + will be', example: 'It will be sunny tomorrow.' },
      ],
      quiz: [
        { question: 'She ... a beautiful girl.', options: ['am', 'is', 'are', 'was'], answer: 'is', explanation: 'Chủ ngữ "She" đi với "is" ở thì hiện tại.' },
        { question: 'They ... at the school yesterday.', options: ['are', 'was', 'were', 'be'], answer: 'were', explanation: '"yesterday" là quá khứ, chủ ngữ "They" đi với "were".' },
        { question: 'I ... an English student.', options: ['am', 'is', 'are', 'be'], answer: 'am', explanation: 'Chủ ngữ "I" luôn đi với "am" ở hiện tại đơn.' },
        { question: 'We ... in Hanoi next week.', options: ['are', 'was', 'were', 'will be'], answer: 'will be', explanation: '"next week" biểu thị tương lai, nên dùng "will be".' },
        { question: 'You ... very kind to help me yesterday.', options: ['are', 'were', 'was', 'will be'], answer: 'were', explanation: '"yesterday" chỉ quá khứ, chủ ngữ "You" đi với "were".' },
        { question: 'The weather ... nice today.', options: ['is', 'am', 'are', 'was'], answer: 'is', explanation: '"today" là hiện tại, "The weather" là danh từ không đếm được/số ít đi với "is".' },
        { question: 'Last year, she ... only 20 years old. Now she ... 21.', options: ['is / was', 'was / is', 'were / is', 'will be / is'], answer: 'was / is', explanation: '"Last year" chia quá khứ (was), "Now" chia hiện tại (is).' },
        { question: 'Where ... you born?', options: ['are', 'was', 'were', 'did'], answer: 'were', explanation: 'Cấu trúc hỏi sinh ra ở đâu dùng quá khứ đơn "were you born".' },
        { question: 'I ... busy tomorrow, so I cannot visit you.', options: ['am', 'was', 'will be', 'be'], answer: 'will be', explanation: '"tomorrow" biểu thị tương lai, dùng "will be".' },
        { question: 'These books ... mine. Do not take them.', options: ['is', 'are', 'was', 'be'], answer: 'are', explanation: '"These books" là danh từ số nhiều ở hiện tại, dùng "are".' },
      ]
    }
  },
  {
    id: 'tenses',
    title: 'Basic Tenses (5 Thì Cơ Bản)',
    desc: 'Trọng tâm 5 thì cơ bản nhất giúp người mất gốc khôi phục nền tảng.',
    icon: 'clock',
    color: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    content: {
      tenses: [
        {
          name: '1. Hiện tại đơn (Present Simple)',
          formula: 'S + V(s/es) | S + am/is/are + ...',
          usage: 'Diễn tả thói quen, hành động lặp đi lặp lại hoặc sự thật hiển nhiên.',
          example: 'He walks to school every day.'
        },
        {
          name: '2. Hiện tại tiếp diễn (Present Continuous)',
          formula: 'S + am/is/are + V-ing',
          usage: 'Diễn tả hành động đang diễn ra ngay tại thời điểm nói.',
          example: 'I am learning English right now.'
        },
        {
          name: '3. Quá khứ đơn (Past Simple)',
          formula: 'S + V2/ed | S + was/were + ...',
          usage: 'Diễn tả hành động đã xảy ra và kết thúc hoàn toàn trong quá khứ.',
          example: 'They visited Hanoi last week.'
        },
        {
          name: '4. Hiện tại hoàn thành (Present Perfect)',
          formula: 'S + have/has + V3/ed',
          usage: 'Diễn tả kinh nghiệm, trải nghiệm hoặc hành động bắt đầu ở quá khứ kéo dài tới hiện tại.',
          example: 'She has lived here for three years.'
        },
        {
          name: '5. Tương lai đơn (Future Simple)',
          formula: 'S + will + V-inf',
          usage: 'Diễn tả dự định đưa ra tức thời khi nói hoặc dự đoán tương lai.',
          example: 'I will call you tonight.'
        }
      ],
      quiz: [
        { question: 'Every day, he ... up at 6 AM.', options: ['get', 'gets', 'getting', 'got'], answer: 'gets', explanation: '"Every day" chỉ thói quen hiện tại, chủ ngữ "he" số ít nên thêm s/es.' },
        { question: 'Listen! The baby ... in the bedroom.', options: ['cries', 'cried', 'is crying', 'will cry'], answer: 'is crying', explanation: '"Listen!" báo hiệu hành động đang diễn ra nên dùng hiện tại tiếp diễn.' },
        { question: 'We ... this movie last night.', options: ['watch', 'watched', 'watching', 'have watched'], answer: 'watched', explanation: '"last night" báo hiệu quá khứ đơn.' },
        { question: 'I ... English since 2020.', options: ['learn', 'learnt', 'have learnt', 'am learning'], answer: 'have learnt', explanation: '"since 2020" chỉ thời gian kéo dài từ quá khứ đến nay, dùng hiện tại hoàn thành.' },
        { question: 'Look! The train ... . Let\'s run!', options: ['comes', 'came', 'is coming', 'will come'], answer: 'is coming', explanation: '"Look!" báo hiệu hành động đang xảy ra trước mắt nên dùng hiện tại tiếp diễn.' },
        { question: 'Next summer, we ... a trip to Da Nang.', options: ['take', 'took', 'will take', 'have taken'], answer: 'will take', explanation: '"Next summer" là trạng từ chỉ thời gian trong tương lai, dùng tương lai đơn "will take".' },
        { question: 'Water ... at 100 degrees Celsius.', options: ['boil', 'boils', 'boiled', 'is boiling'], answer: 'boils', explanation: 'Đây là sự thật hiển nhiên, dùng hiện tại đơn và chia số ít cho Water.' },
        { question: 'She ... her homework yet.', options: ['didn\'t finish', 'hasn\'t finished', 'doesn\'t finish', 'won\'t finish'], answer: 'hasn\'t finished', explanation: '"yet" báo hiệu câu phủ định của thì hiện tại hoàn thành (has not + V3/ed).' },
        { question: 'Yesterday, I ... my keys at the office.', options: ['lose', 'lost', 'losing', 'have lost'], answer: 'lost', explanation: '"Yesterday" là trạng từ chỉ quá khứ đơn. Dạng quá khứ của lose là lost.' },
        { question: 'They usually ... football on Sunday afternoons.', options: ['play', 'plays', 'played', 'playing'], answer: 'play', explanation: '"usually" chỉ thói quen hiện tại, chủ ngữ "They" số nhiều nên giữ nguyên động từ play.' },
      ]
    }
  }
];

export const MINIMAL_PAIRS = [
  // ─── 1. ɪ vs iː ───────────────────────────────────────
  { type: 'vowel', focus: 'ɪ vs iː', a: { word: 'ship', ipa: '/ʃɪp/', vi: 'tàu thủy' }, b: { word: 'sheep', ipa: '/ʃiːp/', vi: 'con cừu' } },
  { type: 'vowel', focus: 'ɪ vs iː', a: { word: 'sit', ipa: '/sɪt/', vi: 'ngồi' }, b: { word: 'seat', ipa: '/siːt/', vi: 'chỗ ngồi' } },
  { type: 'vowel', focus: 'ɪ vs iː', a: { word: 'hit', ipa: '/hɪt/', vi: 'đánh' }, b: { word: 'heat', ipa: '/hiːt/', vi: 'sức nóng' } },
  { type: 'vowel', focus: 'ɪ vs iː', a: { word: 'fit', ipa: '/fɪt/', vi: 'vừa vặn' }, b: { word: 'feet', ipa: '/fiːt/', vi: 'bàn chân' } },
  { type: 'vowel', focus: 'ɪ vs iː', a: { word: 'slip', ipa: '/slɪp/', vi: 'trượt ngã' }, b: { word: 'sleep', ipa: '/sliːp/', vi: 'ngủ' } },
  { type: 'vowel', focus: 'ɪ vs iː', a: { word: 'bin', ipa: '/bɪn/', vi: 'thùng rác' }, b: { word: 'bean', ipa: '/biːn/', vi: 'hạt đậu' } },
  { type: 'vowel', focus: 'ɪ vs iː', a: { word: 'grin', ipa: '/ɡrɪn/', vi: 'cười nhoẻn' }, b: { word: 'green', ipa: '/ɡriːn/', vi: 'màu xanh lá' } },
  { type: 'vowel', focus: 'ɪ vs iː', a: { word: 'lip', ipa: '/lɪp/', vi: 'môi' }, b: { word: 'leap', ipa: '/liːp/', vi: 'nhảy vọt' } },

  // ─── 2. e vs æ ────────────────────────────────────────
  { type: 'vowel', focus: 'e vs æ', a: { word: 'bed', ipa: '/bed/', vi: 'cái giường' }, b: { word: 'bad', ipa: '/bæd/', vi: 'tồi tệ' } },
  { type: 'vowel', focus: 'e vs æ', a: { word: 'men', ipa: '/men/', vi: 'đàn ông (nhiều)' }, b: { word: 'man', ipa: '/mæn/', vi: 'đàn ông (ít)' } },
  { type: 'vowel', focus: 'e vs æ', a: { word: 'pen', ipa: '/pen/', vi: 'bút mực' }, b: { word: 'pan', ipa: '/pæn/', vi: 'cái chảo' } },
  { type: 'vowel', focus: 'e vs æ', a: { word: 'set', ipa: '/set/', vi: 'thiết lập' }, b: { word: 'sat', ipa: '/sæt/', vi: 'đã ngồi' } },
  { type: 'vowel', focus: 'e vs æ', a: { word: 'met', ipa: '/met/', vi: 'đã gặp' }, b: { word: 'mat', ipa: '/mæt/', vi: 'tấm thảm' } },
  { type: 'vowel', focus: 'e vs æ', a: { word: 'send', ipa: '/send/', vi: 'gửi đi' }, b: { word: 'sand', ipa: '/sænd/', vi: 'cát' } },
  { type: 'vowel', focus: 'e vs æ', a: { word: 'bet', ipa: '/bet/', vi: 'cá cược' }, b: { word: 'bat', ipa: '/bæt/', vi: 'con dơi' } },

  // ─── 3. æ vs ʌ ────────────────────────────────────────
  { type: 'vowel', focus: 'æ vs ʌ', a: { word: 'cap', ipa: '/kæp/', vi: 'mũ lưỡi trai' }, b: { word: 'cup', ipa: '/kʌp/', vi: 'cái chén' } },
  { type: 'vowel', focus: 'æ vs ʌ', a: { word: 'hat', ipa: '/hæt/', vi: 'mũ vành' }, b: { word: 'hut', ipa: '/hʌt/', vi: 'túp lều' } },
  { type: 'vowel', focus: 'æ vs ʌ', a: { word: 'cat', ipa: '/kæt/', vi: 'con mèo' }, b: { word: 'cut', ipa: '/kʌt/', vi: 'cắt' } },
  { type: 'vowel', focus: 'æ vs ʌ', a: { word: 'bag', ipa: '/bæɡ/', vi: 'túi xách' }, b: { word: 'bug', ipa: '/bʌɡ/', vi: 'con bọ' } },
  { type: 'vowel', focus: 'æ vs ʌ', a: { word: 'ran', ipa: '/ræn/', vi: 'đã chạy' }, b: { word: 'run', ipa: '/rʌn/', vi: 'chạy' } },
  { type: 'vowel', focus: 'æ vs ʌ', a: { word: 'fan', ipa: '/fæn/', vi: 'cái quạt' }, b: { word: 'fun', ipa: '/fʌn/', vi: 'niềm vui' } },
  { type: 'vowel', focus: 'æ vs ʌ', a: { word: 'mad', ipa: '/mæd/', vi: 'điên rồ' }, b: { word: 'mud', ipa: '/mʌd/', vi: 'bùn đất' } },

  // ─── 4. ʊ vs uː ────────────────────────────────────────
  { type: 'vowel', focus: 'ʊ vs uː', a: { word: 'pull', ipa: '/pʊl/', vi: 'kéo' }, b: { word: 'pool', ipa: '/puːl/', vi: 'bể bơi' } },
  { type: 'vowel', focus: 'ʊ vs uː', a: { word: 'full', ipa: '/fʊl/', vi: 'đầy' }, b: { word: 'fool', ipa: '/fuːl/', vi: 'kẻ ngốc' } },
  { type: 'vowel', focus: 'ʊ vs uː', a: { word: 'look', ipa: '/lʊk/', vi: 'nhìn' }, b: { word: 'Luke', ipa: '/luːk/', vi: 'tên Luke' } },
  { type: 'vowel', focus: 'ʊ vs uː', a: { word: 'soot', ipa: '/sʊt/', vi: 'bồ hóng' }, b: { word: 'suit', ipa: '/suːt/', vi: 'bộ suit' } },

  // ─── 5. ʌ vs ɑː ────────────────────────────────────────
  { type: 'vowel', focus: 'ʌ vs ɑː', a: { word: 'cup', ipa: '/kʌp/', vi: 'cái chén' }, b: { word: 'carp', ipa: '/kɑːp/', vi: 'cá chép' } },
  { type: 'vowel', focus: 'ʌ vs ɑː', a: { word: 'cut', ipa: '/kʌt/', vi: 'cắt' }, b: { word: 'cart', ipa: '/kɑːt/', vi: 'xe đẩy hàng' } },
  { type: 'vowel', focus: 'ʌ vs ɑː', a: { word: 'duck', ipa: '/dʌk/', vi: 'con vịt' }, b: { word: 'dark', ipa: '/dɑːk/', vi: 'tối tăm' } },
  { type: 'vowel', focus: 'ʌ vs ɑː', a: { word: 'hut', ipa: '/hʌt/', vi: 'túp lều' }, b: { word: 'heart', ipa: '/hɑːt/', vi: 'trái tim' } },
  { type: 'vowel', focus: 'ʌ vs ɑː', a: { word: 'bun', ipa: '/bʌn/', vi: 'bánh mì tròn' }, b: { word: 'barn', ipa: '/bɑːn/', vi: 'chuồng bò' } },
  { type: 'vowel', focus: 'ʌ vs ɑː', a: { word: 'come', ipa: '/kʌm/', vi: 'đến' }, b: { word: 'calm', ipa: '/kɑːm/', vi: 'bình tĩnh' } },

  // ─── 6. ɒ vs ɔː ────────────────────────────────────────
  { type: 'vowel', focus: 'ɒ vs ɔː', a: { word: 'cot', ipa: '/kɒt/', vi: 'cũi em bé' }, b: { word: 'court', ipa: '/kɔːt/', vi: 'tòa án' } },
  { type: 'vowel', focus: 'ɒ vs ɔː', a: { word: 'pot', ipa: '/pɒt/', vi: 'cái nồi' }, b: { word: 'port', ipa: '/pɔːt/', vi: 'cảng biển' } },
  { type: 'vowel', focus: 'ɒ vs ɔː', a: { word: 'spot', ipa: '/spɒt/', vi: 'đốm tròn' }, b: { word: 'sport', ipa: '/spɔːt/', vi: 'thể thao' } },
  { type: 'vowel', focus: 'ɒ vs ɔː', a: { word: 'shot', ipa: '/ʃɒt/', vi: 'cú sút/phát súng' }, b: { word: 'short', ipa: '/ʃɔːt/', vi: 'ngắn' } },
  { type: 'vowel', focus: 'ɒ vs ɔː', a: { word: 'cod', ipa: '/kɒd/', vi: 'cá tuyết' }, b: { word: 'cord', ipa: '/kɔːd/', vi: 'dây cáp' } },
  { type: 'vowel', focus: 'ɒ vs ɔː', a: { word: 'fox', ipa: '/fɒks/', vi: 'con cáo' }, b: { word: 'forks', ipa: '/fɔːks/', vi: 'những chiếc dĩa' } },

  // ─── 7. ɔː vs ɜː ────────────────────────────────────────
  { type: 'vowel', focus: 'ɔː vs ɜː', a: { word: 'warm', ipa: '/wɔːm/', vi: 'ấm áp' }, b: { word: 'worm', ipa: '/wɜːm/', vi: 'con giun' } },
  { type: 'vowel', focus: 'ɔː vs ɜː', a: { word: 'board', ipa: '/bɔːd/', vi: 'tấm bảng' }, b: { word: 'bird', ipa: '/bɜːd/', vi: 'con chim' } },
  { type: 'vowel', focus: 'ɔː vs ɜː', a: { word: 'pour', ipa: '/pɔː/', vi: 'rót nước' }, b: { word: 'purr', ipa: '/pɜː/', vi: 'mèo gừ gừ' } },
  { type: 'vowel', focus: 'ɔː vs ɜː', a: { word: 'torn', ipa: '/tɔːn/', vi: 'bị rách' }, b: { word: 'turn', ipa: '/tɜːn/', vi: 'lượt/rẽ' } },
  { type: 'vowel', focus: 'ɔː vs ɜː', a: { word: 'walk', ipa: '/wɔːk/', vi: 'đi bộ' }, b: { word: 'work', ipa: '/wɜːk/', vi: 'làm việc' } },
  { type: 'vowel', focus: 'ɔː vs ɜː', a: { word: 'ward', ipa: '/wɔːd/', vi: 'phòng bệnh' }, b: { word: 'word', ipa: '/wɜːd/', vi: 'từ ngữ' } },

  // ─── 8. θ vs t ────────────────────────────────────────
  { type: 'consonant', focus: 'θ vs t', a: { word: 'thin', ipa: '/θɪn/', vi: 'gầy, mỏng' }, b: { word: 'tin', ipa: '/tɪn/', vi: 'hộp thiếc' } },
  { type: 'consonant', focus: 'θ vs t', a: { word: 'three', ipa: '/θriː/', vi: 'số ba' }, b: { word: 'tree', ipa: '/triː/', vi: 'cái cây' } },
  { type: 'consonant', focus: 'θ vs t', a: { word: 'thank', ipa: '/θæŋk/', vi: 'cảm ơn' }, b: { word: 'tank', ipa: '/tæŋk/', vi: 'xe tăng/bể chứa' } },
  { type: 'consonant', focus: 'θ vs t', a: { word: 'path', ipa: '/pɑːθ/', vi: 'lối đi' }, b: { word: 'pat', ipa: '/pat/', vi: 'vỗ nhẹ' } },
  { type: 'consonant', focus: 'θ vs t', a: { word: 'bath', ipa: '/bɑːθ/', vi: 'bồn tắm' }, b: { word: 'bat', ipa: '/bæt/', vi: 'con dơi' } },
  { type: 'consonant', focus: 'θ vs t', a: { word: 'math', ipa: '/mæθ/', vi: 'toán học' }, b: { word: 'mat', ipa: '/mæt/', vi: 'tấm thảm' } },

  // ─── 9. θ vs f ────────────────────────────────────────
  { type: 'consonant', focus: 'θ vs f', a: { word: 'thin', ipa: '/θɪn/', vi: 'gầy' }, b: { word: 'fin', ipa: '/fɪn/', vi: 'vây cá' } },
  { type: 'consonant', focus: 'θ vs f', a: { word: 'three', ipa: '/θriː/', vi: 'số ba' }, b: { word: 'free', ipa: '/friː/', vi: 'tự do/miễn phí' } },
  { type: 'consonant', focus: 'θ vs f', a: { word: 'death', ipa: '/deθ/', vi: 'cái chết' }, b: { word: 'deaf', ipa: '/def/', vi: 'bị điếc' } },
  { type: 'consonant', focus: 'θ vs f', a: { word: 'thirst', ipa: '/θɜːst/', vi: 'sự khát' }, b: { word: 'first', ipa: '/fɜːst/', vi: 'đầu tiên' } },
  { type: 'consonant', focus: 'θ vs f', a: { word: 'thought', ipa: '/θɔːt/', vi: 'đã nghĩ' }, b: { word: 'fought', ipa: '/fɔːt/', vi: 'đã chiến đấu' } },

  // ─── 10. ð vs d ───────────────────────────────────────
  { type: 'consonant', focus: 'ð vs d', a: { word: 'then', ipa: '/ðen/', vi: 'sau đó' }, b: { word: 'den', ipa: '/den/', vi: 'hang thú' } },
  { type: 'consonant', focus: 'ð vs d', a: { word: 'they', ipa: '/ðeɪ/', vi: 'họ' }, b: { word: 'day', ipa: '/deɪ/', vi: 'ngày' } },
  { type: 'consonant', focus: 'ð vs d', a: { word: 'breathe', ipa: '/briːð/', vi: 'thở' }, b: { word: 'breed', ipa: '/briːd/', vi: 'sinh sản/giống' } },
  { type: 'consonant', focus: 'ð vs d', a: { word: 'there', ipa: '/ðeə/', vi: 'ở đó' }, b: { word: 'dare', ipa: '/deə/', vi: 'dám' } },
  { type: 'consonant', focus: 'ð vs d', a: { word: 'those', ipa: '/ðəʊz/', vi: 'những cái kia' }, b: { word: 'doze', ipa: '/dəʊz/', vi: 'ngủ gật' } },

  // ─── 11. l vs r ───────────────────────────────────────
  { type: 'consonant', focus: 'l vs r', a: { word: 'light', ipa: '/laɪt/', vi: 'ánh sáng' }, b: { word: 'right', ipa: '/raɪt/', vi: 'bên phải/đúng' } },
  { type: 'consonant', focus: 'l vs r', a: { word: 'late', ipa: '/leɪt/', vi: 'trễ' }, b: { word: 'rate', ipa: '/reɪt/', vi: 'tỷ lệ' } },
  { type: 'consonant', focus: 'l vs r', a: { word: 'glass', ipa: '/ɡlɑːs/', vi: 'ly thủy tinh' }, b: { word: 'grass', ipa: '/ɡrɑːs/', vi: 'cỏ' } },
  { type: 'consonant', focus: 'l vs r', a: { word: 'long', ipa: '/lɒŋ/', vi: 'dài' }, b: { word: 'wrong', ipa: '/rɒŋ/', vi: 'sai' } },
  { type: 'consonant', focus: 'l vs r', a: { word: 'fly', ipa: '/flaɪ/', vi: 'bay' }, b: { word: 'fry', ipa: '/fraɪ/', vi: 'chiên rán' } },
  { type: 'consonant', focus: 'l vs r', a: { word: 'play', ipa: '/pleɪ/', vi: 'chơi' }, b: { word: 'pray', ipa: '/preɪ/', vi: 'cầu nguyện' } },
  { type: 'consonant', focus: 'l vs r', a: { word: 'lead', ipa: '/liːd/', vi: 'dẫn dắt' }, b: { word: 'read', ipa: '/riːd/', vi: 'đọc' } },
  { type: 'consonant', focus: 'l vs r', a: { word: 'lock', ipa: '/lɒk/', vi: 'khóa' }, b: { word: 'rock', ipa: '/rɒk/', vi: 'hòn đá' } },

  // ─── 12. f vs v ───────────────────────────────────────
  { type: 'consonant', focus: 'f vs v', a: { word: 'fan', ipa: '/fæn/', vi: 'cái quạt' }, b: { word: 'van', ipa: '/væn/', vi: 'xe tải nhỏ' } },
  { type: 'consonant', focus: 'f vs v', a: { word: 'fat', ipa: '/fæt/', vi: 'béo' }, b: { word: 'vat', ipa: '/væt/', vi: 'thùng lớn' } },
  { type: 'consonant', focus: 'f vs v', a: { word: 'safe', ipa: '/seɪf/', vi: 'an toàn' }, b: { word: 'save', ipa: '/seɪv/', vi: 'tiết kiệm/cứu' } },
  { type: 'consonant', focus: 'f vs v', a: { word: 'leaf', ipa: '/liːf/', vi: 'lá cây' }, b: { word: 'leave', ipa: '/liːv/', vi: 'rời đi' } },
  { type: 'consonant', focus: 'f vs v', a: { word: 'belief', ipa: '/bɪˈliːf/', vi: 'niềm tin' }, b: { word: 'believe', ipa: '/bɪˈliːv/', vi: 'tin tưởng' } },
  { type: 'consonant', focus: 'f vs v', a: { word: 'fast', ipa: '/fɑːst/', vi: 'nhanh' }, b: { word: 'vast', ipa: '/vɑːst/', vi: 'bao la' } },
  { type: 'consonant', focus: 'f vs v', a: { word: 'fine', ipa: '/faɪn/', vi: 'tốt/ổn' }, b: { word: 'vine', ipa: '/vaɪn/', vi: 'cây nho' } },

  // ─── 13. b vs p ───────────────────────────────────────
  { type: 'consonant', focus: 'b vs p', a: { word: 'bat', ipa: '/bæt/', vi: 'con dơi' }, b: { word: 'pat', ipa: '/pæt/', vi: 'vỗ nhẹ' } },
  { type: 'consonant', focus: 'b vs p', a: { word: 'bin', ipa: '/bɪn/', vi: 'thùng rác' }, b: { word: 'pin', ipa: '/pɪn/', vi: 'cái ghim' } },
  { type: 'consonant', focus: 'b vs p', a: { word: 'bill', ipa: '/bɪl/', vi: 'hóa đơn' }, b: { word: 'pill', ipa: '/pɪl/', vi: 'viên thuốc' } },
  { type: 'consonant', focus: 'b vs p', a: { word: 'bay', ipa: '/beɪ/', vi: 'vịnh biển' }, b: { word: 'pay', ipa: '/peɪ/', vi: 'thanh toán' } },
  { type: 'consonant', focus: 'b vs p', a: { word: 'big', ipa: '/bɪɡ/', vi: 'to lớn' }, b: { word: 'pig', ipa: '/pɪɡ/', vi: 'con heo' } },
  { type: 'consonant', focus: 'b vs p', a: { word: 'bear', ipa: '/beə/', vi: 'con gấu' }, b: { word: 'pear', ipa: '/peə/', vi: 'quả lê' } },
  { type: 'consonant', focus: 'b vs p', a: { word: 'beach', ipa: '/biːtʃ/', vi: 'bãi biển' }, b: { word: 'peach', ipa: '/piːtʃ/', vi: 'quả đào' } },

  // ─── 14. s vs ʃ ───────────────────────────────────────
  { type: 'consonant', focus: 's vs ʃ', a: { word: 'sea', ipa: '/siː/', vi: 'biển' }, b: { word: 'she', ipa: '/ʃiː/', vi: 'cô ấy' } },
  { type: 'consonant', focus: 's vs ʃ', a: { word: 'sip', ipa: '/sɪp/', vi: 'nhấp môi' }, b: { word: 'ship', ipa: '/ʃɪp/', vi: 'tàu thủy' } },
  { type: 'consonant', focus: 's vs ʃ', a: { word: 'sign', ipa: '/saɪn/', vi: 'biển hiệu' }, b: { word: 'shine', ipa: '/ʃaɪn/', vi: 'tỏa sáng' } },
  { type: 'consonant', focus: 's vs ʃ', a: { word: 'seat', ipa: '/siːt/', vi: 'chỗ ngồi' }, b: { word: 'sheet', ipa: '/ʃiːt/', vi: 'tờ giấy/ga giường' } },
  { type: 'consonant', focus: 's vs ʃ', a: { word: 'sore', ipa: '/sɔː/', vi: 'đau nhức' }, b: { word: 'shore', ipa: '/ʃɔː/', vi: 'bờ biển' } },
  { type: 'consonant', focus: 's vs ʃ', a: { word: 'sue', ipa: '/suː/', vi: 'kiện tụng' }, b: { word: 'shoe', ipa: '/ʃuː/', vi: 'chiếc giày' } },
  { type: 'consonant', focus: 's vs ʃ', a: { word: 'save', ipa: '/seɪv/', vi: 'cứu' }, b: { word: 'shave', ipa: '/ʃeɪv/', vi: 'cạo râu' } },
  { type: 'consonant', focus: 's vs ʃ', a: { word: 'sort', ipa: '/sɔːt/', vi: 'phân loại' }, b: { word: 'short', ipa: '/ʃɔːt/', vi: 'ngắn' } },

  // ─── 15. s vs z ───────────────────────────────────────
  { type: 'consonant', focus: 's vs z', a: { word: 'sue', ipa: '/suː/', vi: 'kiện tụng' }, b: { word: 'zoo', ipa: '/zuː/', vi: 'sở thú' } },
  { type: 'consonant', focus: 's vs z', a: { word: 'sip', ipa: '/sɪp/', vi: 'nhấp môi' }, b: { word: 'zip', ipa: '/zɪp/', vi: 'khóa kéo' } },
  { type: 'consonant', focus: 's vs z', a: { word: 'bus', ipa: '/bʌs/', vi: 'xe buýt' }, b: { word: 'buzz', ipa: '/bʌz/', vi: 'tiếng vo ve' } },
  { type: 'consonant', focus: 's vs z', a: { word: 'price', ipa: '/praɪs/', vi: 'giá cả' }, b: { word: 'prize', ipa: '/praɪz/', vi: 'giải thưởng' } },
  { type: 'consonant', focus: 's vs z', a: { word: 'ice', ipa: '/aɪs/', vi: 'nước đá' }, b: { word: 'eyes', ipa: '/aɪz/', vi: 'đôi mắt' } },
  { type: 'consonant', focus: 's vs z', a: { word: 'face', ipa: '/feɪs/', vi: 'gương mặt' }, b: { word: 'phase', ipa: '/feɪz/', vi: 'giai đoạn' } },
  { type: 'consonant', focus: 's vs z', a: { word: 'place', ipa: '/pleɪs/', vi: 'nơi chốn' }, b: { word: 'plays', ipa: '/pleɪz/', vi: 'chơi/kịch' } },

  // ─── 16. ʃ vs tʃ ──────────────────────────────────────
  { type: 'consonant', focus: 'ʃ vs tʃ', a: { word: 'share', ipa: '/ʃeə/', vi: 'chia sẻ' }, b: { word: 'chair', ipa: '/tʃeə/', vi: 'cái ghế' } },
  { type: 'consonant', focus: 'ʃ vs tʃ', a: { word: 'sheep', ipa: '/ʃiːp/', vi: 'con cừu' }, b: { word: 'cheap', ipa: '/tʃiːp/', vi: 'rẻ tiền' } },
  { type: 'consonant', focus: 'ʃ vs tʃ', a: { word: 'shop', ipa: '/ʃɒp/', vi: 'cửa hàng' }, b: { word: 'chop', ipa: '/tʃɒp/', vi: 'chặt băm' } },
  { type: 'consonant', focus: 'ʃ vs tʃ', a: { word: 'cash', ipa: '/kæʃ/', vi: 'tiền mặt' }, b: { word: 'catch', ipa: '/kætʃ/', vi: 'bắt lấy' } },
  { type: 'consonant', focus: 'ʃ vs tʃ', a: { word: 'wash', ipa: '/wɒʃ/', vi: 'rửa' }, b: { word: 'watch', ipa: '/wɒtʃ/', vi: 'xem' } },
  { type: 'consonant', focus: 'ʃ vs tʃ', a: { word: 'shoe', ipa: '/ʃuː/', vi: 'chiếc giày' }, b: { word: 'chew', ipa: '/tʃuː/', vi: 'nhai' } },
  { type: 'consonant', focus: 'ʃ vs tʃ', a: { word: 'ship', ipa: '/ʃɪp/', vi: 'tàu thủy' }, b: { word: 'chip', ipa: '/tʃɪp/', vi: 'khoai tây chiên' } },

  // ─── 17. dʒ vs tʃ ──────────────────────────────────────
  { type: 'consonant', focus: 'dʒ vs tʃ', a: { word: 'joke', ipa: '/dʒəʊk/', vi: 'trò đùa' }, b: { word: 'choke', ipa: '/tʃəʊk/', vi: 'nghẹt thở' } },
  { type: 'consonant', focus: 'dʒ vs tʃ', a: { word: 'jeep', ipa: '/dʒiːp/', vi: 'xe jeep' }, b: { word: 'cheap', ipa: '/tʃiːp/', vi: 'rẻ tiền' } },
  { type: 'consonant', focus: 'dʒ vs tʃ', a: { word: 'surge', ipa: '/sɜːdʒ/', vi: 'dâng trào' }, b: { word: 'search', ipa: '/sɜːtʃ/', vi: 'tìm kiếm' } },
  { type: 'consonant', focus: 'dʒ vs tʃ', a: { word: 'badge', ipa: '/bædʒ/', vi: 'huy hiệu' }, b: { word: 'batch', ipa: '/bætʃ/', vi: 'mẻ/khóa' } },
  { type: 'consonant', focus: 'dʒ vs tʃ', a: { word: 'gin', ipa: '/dʒɪn/', vi: 'rượu gin' }, b: { word: 'chin', ipa: '/tʃɪn/', vi: 'cái cằm' } },
  { type: 'consonant', focus: 'dʒ vs tʃ', a: { word: 'junk', ipa: '/dʒʌŋk/', vi: 'rác thải' }, b: { word: 'chunk', ipa: '/tʃʌŋk/', vi: 'mảng/khúc' } },

  // ─── 18. w vs v ───────────────────────────────────────
  { type: 'consonant', focus: 'w vs v', a: { word: 'wet', ipa: '/wet/', vi: 'ướt át' }, b: { word: 'vet', ipa: '/vet/', vi: 'bác sĩ thú y' } },
  { type: 'consonant', focus: 'w vs v', a: { word: 'wine', ipa: '/waɪn/', vi: 'rượu vang' }, b: { word: 'vine', ipa: '/vaɪn/', vi: 'cây nho' } },
  { type: 'consonant', focus: 'w vs v', a: { word: 'west', ipa: '/west/', vi: 'phương tây' }, b: { word: 'vest', ipa: '/vest/', vi: 'áo ghi lê' } },
  { type: 'consonant', focus: 'w vs v', a: { word: 'wary', ipa: '/ˈweə.ri/', vi: 'thận trọng' }, b: { word: 'vary', ipa: '/ˈveə.ri/', vi: 'thay đổi' } },
  { type: 'consonant', focus: 'w vs v', a: { word: 'whale', ipa: '/weɪl/', vi: 'cá voi' }, b: { word: 'vale', ipa: '/veɪl/', vi: 'thung lũng' } },
  { type: 'consonant', focus: 'w vs v', a: { word: 'wheel', ipa: '/wiːl/', vi: 'bánh xe' }, b: { word: 'veal', ipa: '/viːl/', vi: 'thịt bê' } },
  { type: 'consonant', focus: 'w vs v', a: { word: 'worse', ipa: '/wɜːs/', vi: 'tồi tệ hơn' }, b: { word: 'verse', ipa: '/vɜːs/', vi: 'vần thơ' } },

  // ─── 19. n vs ŋ ───────────────────────────────────────
  { type: 'consonant', focus: 'n vs ŋ', a: { word: 'thin', ipa: '/θɪn/', vi: 'mỏng' }, b: { word: 'thing', ipa: '/θɪŋ/', vi: 'đồ vật' } },
  { type: 'consonant', focus: 'n vs ŋ', a: { word: 'sin', ipa: '/sɪn/', vi: 'tội lỗi' }, b: { word: 'sing', ipa: '/sɪŋ/', vi: 'hát' } },
  { type: 'consonant', focus: 'n vs ŋ', a: { word: 'win', ipa: '/wɪn/', vi: 'chiến thắng' }, b: { word: 'wing', ipa: '/wɪŋ/', vi: 'cánh chim' } },
  { type: 'consonant', focus: 'n vs ŋ', a: { word: 'ton', ipa: '/tʌn/', vi: 'tấn' }, b: { word: 'tongue', ipa: '/tʌŋ/', vi: 'cái lưỡi' } },
  { type: 'consonant', focus: 'n vs ŋ', a: { word: 'run', ipa: '/rʌn/', vi: 'chạy' }, b: { word: 'rung', ipa: '/rʌŋ/', vi: 'nấc thang' } },
  { type: 'consonant', focus: 'n vs ŋ', a: { word: 'ban', ipa: '/bæn/', vi: 'cấm' }, b: { word: 'bang', ipa: '/bæŋ/', vi: 'tiếng nổ lớn' } },
  { type: 'consonant', focus: 'n vs ŋ', a: { word: 'pin', ipa: '/pɪn/', vi: 'cái ghim' }, b: { word: 'ping', ipa: '/pɪŋ/', vi: 'tiếng ping' } },

  // ─── 20. g vs k ───────────────────────────────────────
  { type: 'consonant', focus: 'g vs k', a: { word: 'goat', ipa: '/ɡəʊt/', vi: 'con dê' }, b: { word: 'coat', ipa: '/kəʊt/', vi: 'áo khoác' } },
  { type: 'consonant', focus: 'g vs k', a: { word: 'bag', ipa: '/bæɡ/', vi: 'túi xách' }, b: { word: 'back', ipa: '/bæk/', vi: 'phần lưng' } },
  { type: 'consonant', focus: 'g vs k', a: { word: 'pig', ipa: '/pɪɡ/', vi: 'con heo' }, b: { word: 'pick', ipa: '/pɪk/', vi: 'chọn' } },
  { type: 'consonant', focus: 'g vs k', a: { word: 'gap', ipa: '/ɡæp/', vi: 'khoảng trống' }, b: { word: 'cap', ipa: '/kæp/', vi: 'mũ lưỡi trai' } },
  { type: 'consonant', focus: 'g vs k', a: { word: 'game', ipa: '/ɡeɪm/', vi: 'trò chơi' }, b: { word: 'came', ipa: '/keɪm/', vi: 'đã đến' } },
  { type: 'consonant', focus: 'g vs k', a: { word: 'gold', ipa: '/ɡəʊld/', vi: 'vàng' }, b: { word: 'cold', ipa: '/kəʊld/', vi: 'lạnh' } },
  { type: 'consonant', focus: 'g vs k', a: { word: 'glass', ipa: '/ɡlɑːs/', vi: 'ly thủy tinh' }, b: { word: 'class', ipa: '/klɑːs/', vi: 'lớp học' } },

  // ─── 21. h vs ø ───────────────────────────────────────
  { type: 'consonant', focus: 'h vs ø', a: { word: 'hate', ipa: '/heɪt/', vi: 'ghét' }, b: { word: 'ate', ipa: '/et/', vi: 'đã ăn' } },
  { type: 'consonant', focus: 'h vs ø', a: { word: 'hair', ipa: '/heə/', vi: 'tóc' }, b: { word: 'air', ipa: '/eə/', vi: 'không khí' } },
  { type: 'consonant', focus: 'h vs ø', a: { word: 'hear', ipa: '/hɪə/', vi: 'nghe' }, b: { word: 'ear', ipa: '/ɪə/', vi: 'tai' } },
  { type: 'consonant', focus: 'h vs ø', a: { word: 'heat', ipa: '/hiːt/', vi: 'nhiệt độ' }, b: { word: 'eat', ipa: '/iːt/', vi: 'ăn' } },
  { type: 'consonant', focus: 'h vs ø', a: { word: 'hold', ipa: '/həʊld/', vi: 'cầm nắm' }, b: { word: 'old', ipa: '/əʊld/', vi: 'già/cũ' } },
  { type: 'consonant', focus: 'h vs ø', a: { word: 'hill', ipa: '/hɪl/', vi: 'đồi' }, b: { word: 'ill', ipa: '/ɪl/', vi: 'ốm đau' } }
];
