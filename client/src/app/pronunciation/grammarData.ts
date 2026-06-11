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
