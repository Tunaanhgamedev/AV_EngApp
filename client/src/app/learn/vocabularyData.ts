export interface VocabWord {
  word: string;
  phonetic: string;
  wordType: string;
  meaningEn: string;
  meaningVi: string;
  example: string;
  exampleVi: string;
}

export interface VocabTopic {
  id: string;
  title: string;
  desc: string;
  color: string;
  beginner: VocabWord[];
  advanced: VocabWord[];
}

import { ADDITIONAL_VOCABULARY_TOPICS } from './additionalVocabularyData';

const ORIGINAL_VOCABULARY_TOPICS: VocabTopic[] = [
  {
    "id": "people",
    "title": "Con người & Tính cách (People & Personality)",
    "desc": "Từ vựng miêu tả ngoại hình, phẩm chất và tính cách của con người.",
    "color": "border-blue-200 bg-blue-50/50 text-blue-800 hover:border-blue-400 dark:bg-slate-900/50 dark:border-slate-800 dark:text-blue-400",
    "beginner": [
      {
        "word": "tall",
        "phonetic": "/tɔːl/",
        "wordType": "adj",
        "meaningEn": "having a relatively great height",
        "meaningVi": "cao",
        "example": "He is tall and slim.",
        "exampleVi": "Anh ấy cao và mảnh khảnh."
      },
      {
        "word": "kind",
        "phonetic": "/kaɪnd/",
        "wordType": "adj",
        "meaningEn": "helpful, friendly, and caring about others",
        "meaningVi": "tốt bụng",
        "example": "She is a kind teacher.",
        "exampleVi": "Cô ấy là một giáo viên tốt bụng."
      },
      {
        "word": "happy",
        "phonetic": "/ˈhæp.i/",
        "wordType": "adj",
        "meaningEn": "feeling or showing pleasure or contentment",
        "meaningVi": "hạnh phúc, vui vẻ",
        "example": "They are very happy today.",
        "exampleVi": "Hôm nay họ rất vui vẻ."
      },
      {
        "word": "young",
        "phonetic": "/jʌŋ/",
        "wordType": "adj",
        "meaningEn": "having lived or existed for only a short time",
        "meaningVi": "trẻ trung",
        "example": "She is young and energetic.",
        "exampleVi": "Cô ấy trẻ trung và tràn đầy năng lượng."
      },
      {
        "word": "smart",
        "phonetic": "/smɑːt/",
        "wordType": "adj",
        "meaningEn": "intelligent or clever",
        "meaningVi": "thông minh",
        "example": "The student is very smart.",
        "exampleVi": "Người học sinh đó rất thông minh."
      },
      {
        "word": "quiet",
        "phonetic": "/ˈkwaɪ.ət/",
        "wordType": "adj",
        "meaningEn": "making very little noise; silent",
        "meaningVi": "trầm tính, yên tĩnh",
        "example": "He is quiet and a bit shy.",
        "exampleVi": "Anh ấy trầm tính và hơi nhút nhát."
      },
      {
        "word": "friendly",
        "phonetic": "/ˈfrend.li/",
        "wordType": "adj",
        "meaningEn": "behaving in a pleasant, kind way towards someone",
        "meaningVi": "thân thiện",
        "example": "The locals are friendly.",
        "exampleVi": "Người dân địa phương rất thân thiện."
      },
      {
        "word": "polite",
        "phonetic": "/pəˈlaɪt/",
        "wordType": "adj",
        "meaningEn": "having good manners and respect for others",
        "meaningVi": "lịch sự, lễ phép",
        "example": "Always be polite to others.",
        "exampleVi": "Hãy luôn lịch sự với người khác."
      },
      {
        "word": "short",
        "phonetic": "/ʃɔːt/",
        "wordType": "adj",
        "meaningEn": "having a small distance from the top to the bottom",
        "meaningVi": "lùn, thấp",
        "example": "He is short but very strong.",
        "exampleVi": "Anh ấy thấp nhưng rất khỏe."
      },
      {
        "word": "old",
        "phonetic": "/əʊld/",
        "wordType": "adj",
        "meaningEn": "having lived or existed for a long time",
        "meaningVi": "già, lớn tuổi",
        "example": "My grandfather is old.",
        "exampleVi": "Ông tôi đã lớn tuổi rồi."
      },
      {
        "word": "sad",
        "phonetic": "/sæd/",
        "wordType": "adj",
        "meaningEn": "showing or feeling sadness; unhappy",
        "meaningVi": "buồn bã",
        "example": "Why are you so sad?",
        "exampleVi": "Tại sao bạn lại buồn thế?"
      },
      {
        "word": "brave",
        "phonetic": "/breɪv/",
        "wordType": "adj",
        "meaningEn": "showing no fear in dangerous situations",
        "meaningVi": "dũng cảm",
        "example": "The brave boy saved the dog.",
        "exampleVi": "Cậu bé dũng cảm đã cứu chú chó."
      },
      {
        "word": "funny",
        "phonetic": "/ˈfʌn.i/",
        "wordType": "adj",
        "meaningEn": "causing laughter or amusement; humorous",
        "meaningVi": "hài hước, vui nhộn",
        "example": "He tells funny stories.",
        "exampleVi": "Anh ấy kể những câu chuyện rất hài hước."
      },
      {
        "word": "honest",
        "phonetic": "/ˈɒn.ɪst/",
        "wordType": "adj",
        "meaningEn": "telling the truth and not hiding the facts",
        "meaningVi": "thật thà, trung thực",
        "example": "Be honest with yourself.",
        "exampleVi": "Hãy trung thực với chính bản thân mình."
      },
      {
        "word": "lazy",
        "phonetic": "/ˈleɪ.zi/",
        "wordType": "adj",
        "meaningEn": "not willing to work or use any effort",
        "meaningVi": "lười biếng",
        "example": "He is lazy and sleeps all day.",
        "exampleVi": "Cậu ta lười biếng và ngủ cả ngày."
      },
      {
        "word": "strong",
        "phonetic": "/strɒŋ/",
        "wordType": "adj",
        "meaningEn": "having great physical power and ability",
        "meaningVi": "khỏe mạnh",
        "example": "He is strong enough to lift the box.",
        "exampleVi": "Anh ấy đủ khỏe để nhấc chiếc hộp."
      },
      {
        "word": "weak",
        "phonetic": "/wiːk/",
        "wordType": "adj",
        "meaningEn": "lacking physical strength or energy",
        "meaningVi": "yếu ớt",
        "example": "She felt weak after the illness.",
        "exampleVi": "Cô ấy cảm thấy yếu ớt sau trận ốm."
      },
      {
        "word": "beautiful",
        "phonetic": "/ˈbjuː.tɪ.fəl/",
        "wordType": "adj",
        "meaningEn": "very attractive to look at",
        "meaningVi": "xinh đẹp",
        "example": "The garden looks beautiful today.",
        "exampleVi": "Khu vườn trông thật xinh đẹp hôm nay."
      },
      {
        "word": "ugly",
        "phonetic": "/ˈʌɡ.li/",
        "wordType": "adj",
        "meaningEn": "unpleasant to look at; not attractive",
        "meaningVi": "xấu xí",
        "example": "It was an ugly building.",
        "exampleVi": "Đó là một tòa nhà xấu xí."
      },
      {
        "word": "active",
        "phonetic": "/ˈæk.tɪv/",
        "wordType": "adj",
        "meaningEn": "busy and doing a lot of things",
        "meaningVi": "năng động, chủ động",
        "example": "He plays sports and is very active.",
        "exampleVi": "Cậu ấy chơi thể thao và rất năng động."
      },
      {
        "word": "patient",
        "phonetic": "/ˈpeɪ.ʃənt/",
        "wordType": "adj",
        "meaningEn": "able to wait for a long time without becoming angry",
        "meaningVi": "kiên nhẫn",
        "example": "You need to be patient with children.",
        "exampleVi": "Bạn cần phải kiên nhẫn với trẻ nhỏ."
      },
      {
        "word": "silly",
        "phonetic": "/ˈsɪl.i/",
        "wordType": "adj",
        "meaningEn": "showing a lack of thought or judgment; foolish",
        "meaningVi": "ngớ ngẩn, khờ khạo",
        "example": "Don't make silly mistakes.",
        "exampleVi": "Đừng mắc những sai lầm ngớ ngẩn."
      },
      {
        "word": "serious",
        "phonetic": "/ˈsɪə.ri.əs/",
        "wordType": "adj",
        "meaningEn": "thinking carefully and not laughing much",
        "meaningVi": "nghiêm túc, nghiêm trọng",
        "example": "He has a very serious expression.",
        "exampleVi": "Anh ấy có một biểu cảm rất nghiêm túc."
      },
      {
        "word": "shy",
        "phonetic": "/ʃaɪ/",
        "wordType": "adj",
        "meaningEn": "nervous and uncomfortable with other people",
        "meaningVi": "nhút nhát, e thẹn",
        "example": "She is too shy to speak in public.",
        "exampleVi": "Cô ấy quá nhút nhát để nói chuyện trước đám đông."
      },
      {
        "word": "gentle",
        "phonetic": "/ˈdʒen.təl/",
        "wordType": "adj",
        "meaningEn": "calm, kind, and doing things in a quiet way",
        "meaningVi": "dịu dàng, nhẹ nhàng",
        "example": "He was gentle with the baby.",
        "exampleVi": "Anh ấy rất nhẹ nhàng với em bé."
      },
      {
        "word": "thin",
        "phonetic": "/θɪn/",
        "wordType": "adj",
        "meaningEn": "having little fat on the body; not thick",
        "meaningVi": "gầy, mảnh khảnh",
        "example": "He has become very thin since he started his new diet.",
        "exampleVi": "Anh ấy đã trở nên rất gầy kể từ khi bắt đầu chế độ ăn kiêng mới."
      },
      {
        "word": "fat",
        "phonetic": "/fæt/",
        "wordType": "adj",
        "meaningEn": "having a lot of flesh on the body",
        "meaningVi": "béo, mập",
        "example": "The doctor told him he is a bit fat and needs to exercise.",
        "exampleVi": "Bác sĩ nói với anh ấy rằng anh ấy hơi béo và cần phải tập thể dục."
      },
      {
        "word": "nice",
        "phonetic": "/naɪs/",
        "wordType": "adj",
        "meaningEn": "kind, friendly, or pleasant",
        "meaningVi": "tốt bụng, dễ thương, tử tế",
        "example": "Our new neighbor is very nice and always waves to us.",
        "exampleVi": "Người hàng xóm mới của chúng tôi rất tốt bụng và luôn vẫy tay chào chúng tôi."
      },
      {
        "word": "sweet",
        "phonetic": "/swiːt/",
        "wordType": "adj",
        "meaningEn": "kind, gentle, and friendly",
        "meaningVi": "ngọt ngào, đáng yêu, dịu dàng",
        "example": "It was very sweet of you to help me with my homework.",
        "exampleVi": "Bạn thật là ngọt ngào khi giúp tôi làm bài tập về nhà."
      },
      {
        "word": "angry",
        "phonetic": "/ˈæŋ.ɡri/",
        "wordType": "adj",
        "meaningEn": "having a strong feeling of dislike or displeasure",
        "meaningVi": "tức giận, giận dữ",
        "example": "My father was angry when I broke his favorite cup.",
        "exampleVi": "Bố tôi đã rất tức giận khi tôi làm vỡ chiếc cốc yêu thích của ông."
      },
      {
        "word": "scared",
        "phonetic": "/skerd/",
        "wordType": "adj",
        "meaningEn": "frightened or worried about something",
        "meaningVi": "sợ hãi, lo sợ",
        "example": "The little girl is scared of dark rooms.",
        "exampleVi": "Cô bé sợ những căn phòng tối."
      },
      {
        "word": "proud",
        "phonetic": "/praʊd/",
        "wordType": "adj",
        "meaningEn": "feeling pleased and satisfied about something you have done",
        "meaningVi": "tự hào, hãnh diện",
        "example": "Her parents are very proud of her high exam scores.",
        "exampleVi": "Bố mẹ cô ấy rất tự hào về điểm số kỳ thi cao của cô ấy."
      },
      {
        "word": "busy",
        "phonetic": "/ˈbɪz.i/",
        "wordType": "adj",
        "meaningEn": "having a lot of things to do; not free",
        "meaningVi": "bận rộn",
        "example": "I am too busy to go to the cinema tonight.",
        "exampleVi": "Tôi quá bận rộn để đi xem phim tối nay."
      },
      {
        "word": "calm",
        "phonetic": "/kɑːm/",
        "wordType": "adj",
        "meaningEn": "peaceful, quiet, and not worried or excited",
        "meaningVi": "bình tĩnh, điềm tĩnh",
        "example": "You need to stay calm during the examination.",
        "exampleVi": "Bạn cần phải giữ bình tĩnh trong suốt kỳ thi."
      },
      {
        "word": "rude",
        "phonetic": "/ruːd/",
        "wordType": "adj",
        "meaningEn": "not polite; offensive or embarrassing",
        "meaningVi": "thô lỗ, bất lịch sự",
        "example": "It is rude to talk with your mouth full of food.",
        "exampleVi": "Thật thô lỗ khi vừa nói chuyện vừa đầy thức ăn trong miệng."
      },
      {
        "word": "clever",
        "phonetic": "/ˈklev.ər/",
        "wordType": "adj",
        "meaningEn": "quick at learning and understanding things",
        "meaningVi": "khéo léo, thông minh, lanh lợi",
        "example": "She is a clever girl who can solve difficult puzzles easily.",
        "exampleVi": "Cô ấy là một cô bé thông minh có thể giải các câu đố khó một cách dễ dàng."
      },
      {
        "word": "helpful",
        "phonetic": "/ˈhelp.fəl/",
        "wordType": "adj",
        "meaningEn": "willing to help other people",
        "meaningVi": "hay giúp đỡ, có ích",
        "example": "The library assistant was very helpful in finding the book.",
        "exampleVi": "Người phụ tá thư viện đã rất nhiệt tình giúp đỡ trong việc tìm cuốn sách."
      },
      {
        "word": "selfish",
        "phonetic": "/ˈsel.fɪʃ/",
        "wordType": "adj",
        "meaningEn": "caring only about yourself and not about other people",
        "meaningVi": "ích kỷ",
        "example": "Don't be so selfish; share your toys with your brother.",
        "exampleVi": "Đừng ích kỷ như thế; hãy chia sẻ đồ chơi của bạn với em trai."
      },
      {
        "word": "mean",
        "phonetic": "/miːn/",
        "wordType": "adj",
        "meaningEn": "not generous, or unkind to other people",
        "meaningVi": "keo kiệt, xấu tính",
        "example": "He is very mean with his money and never buys gifts.",
        "exampleVi": "Anh ta rất keo kiệt với tiền bạc của mình và không bao giờ mua quà cáp."
      },
      {
        "word": "bored",
        "phonetic": "/bɔːrd/",
        "wordType": "adj",
        "meaningEn": "feeling tired and unhappy because something is not interesting",
        "meaningVi": "buồn chán, tẻ nhạt",
        "example": "The children got bored waiting for the rain to stop.",
        "exampleVi": "Lũ trẻ cảm thấy buồn chán khi phải chờ cơn mưa tạnh."
      },
      {
        "word": "excited",
        "phonetic": "/ɪkˈsaɪ.t̬ɪd/",
        "wordType": "adj",
        "meaningEn": "feeling or showing happiness and enthusiasm",
        "meaningVi": "hào hứng, phấn khích",
        "example": "We are so excited about our upcoming holiday to Japan.",
        "exampleVi": "Chúng tôi rất hào hứng về chuyến đi nghỉ mát sắp tới ở Nhật Bản."
      },
      {
        "word": "tired",
        "phonetic": "/taɪərd/",
        "wordType": "adj",
        "meaningEn": "needing rest or sleep",
        "meaningVi": "mệt mỏi, mệt",
        "example": "She was very tired after working for ten hours.",
        "exampleVi": "Cô ấy đã rất mệt mỏi sau khi làm việc mười tiếng đồng hồ."
      },
      {
        "word": "hungry",
        "phonetic": "/ˈhʌŋ.ɡri/",
        "wordType": "adj",
        "meaningEn": "wanting or needing food",
        "meaningVi": "đói",
        "example": "If you are hungry, there is some bread on the table.",
        "exampleVi": "Nếu bạn đói, có một ít bánh mì ở trên bàn đấy."
      },
      {
        "word": "thirsty",
        "phonetic": "/ˈθɝː.sti/",
        "wordType": "adj",
        "meaningEn": "needing to drink something",
        "meaningVi": "khát nước",
        "example": "After running for an hour, I was extremely thirsty.",
        "exampleVi": "Sau khi chạy bộ một tiếng đồng hồ, tôi vô cùng khát nước."
      },
      {
        "word": "poor",
        "phonetic": "/pɔːr/",
        "wordType": "adj",
        "meaningEn": "having very little money or fewer possessions than normal",
        "meaningVi": "nghèo",
        "example": "He grew up in a poor family in a small village.",
        "exampleVi": "Anh ấy lớn lên trong một gia đình nghèo ở một ngôi làng nhỏ."
      },
      {
        "word": "rich",
        "phonetic": "/rɪtʃ/",
        "wordType": "adj",
        "meaningEn": "having a lot of money or valuable possessions",
        "meaningVi": "giàu có, giàu",
        "example": "She wants to become a rich businesswoman in the future.",
        "exampleVi": "Cô ấy muốn trở thành một nữ doanh nhân giàu có trong tương lai."
      },
      {
        "word": "strict",
        "phonetic": "/strɪkt/",
        "wordType": "adj",
        "meaningEn": "demanding that rules are obeyed and followed",
        "meaningVi": "nghiêm khắc, khắt khe",
        "example": "My high school teachers were very strict about uniforms.",
        "exampleVi": "Các giáo viên trung học của tôi rất nghiêm khắc về vấn đề đồng phục."
      },
      {
        "word": "messy",
        "phonetic": "/ˈmes.i/",
        "wordType": "adj",
        "meaningEn": "dirty or untidy",
        "meaningVi": "bừa bộn, lộn xộn",
        "example": "His room is always messy with clothes on the floor.",
        "exampleVi": "Phòng của anh ấy luôn bừa bộn với quần áo vứt trên sàn."
      },
      {
        "word": "neat",
        "phonetic": "/niːt/",
        "wordType": "adj",
        "meaningEn": "tidy, clean, and in order",
        "meaningVi": "gọn gàng, ngăn nắp",
        "example": "She loves keeping her workspace neat and organized.",
        "exampleVi": "Cô ấy thích giữ cho không gian làm việc của mình gọn gàng và có tổ chức."
      },
      {
        "word": "worried",
        "phonetic": "/ˈwɝː.id/",
        "wordType": "adj",
        "meaningEn": "anxious because you keep thinking about unpleasant things",
        "meaningVi": "lo lắng",
        "example": "She was worried about her exam results all weekend.",
        "exampleVi": "Cô ấy đã lo lắng về kết quả thi của mình suốt cả cuối tuần."
      },
      {
        "word": "famous",
        "phonetic": "/ˈfeɪ.məs/",
        "wordType": "adj",
        "meaningEn": "known and recognized by many people",
        "meaningVi": "nổi tiếng",
        "example": "He hopes to be a famous singer one day.",
        "exampleVi": "Anh ấy hy vọng một ngày nào đó sẽ trở thành một ca sĩ nổi tiếng."
      },
      {
        "word": "creative",
        "phonetic": "/kriˈeɪ.t̬ɪv/",
        "wordType": "adj",
        "meaningEn": "good at thinking of new ideas or making things",
        "meaningVi": "sáng tạo",
        "example": "She is a very creative artist who makes beautiful sculptures.",
        "exampleVi": "Cô ấy là một nghệ sĩ rất sáng tạo, người tạo ra những bức tượng điêu khắc đẹp đẽ."
      },
      {
        "word": "curious",
        "phonetic": "/ˈkjʊr.i.əs/",
        "wordType": "adj",
        "meaningEn": "wanting to know or learn about something",
        "meaningVi": "tò mò, hiếu kỳ",
        "example": "The curious puppy sniffed everything in the backyard.",
        "exampleVi": "Chú chó con tò mò ngửi mọi thứ ở sân sau."
      },
      {
        "word": "lovely",
        "phonetic": "/ˈlʌv.li/",
        "wordType": "adj",
        "meaningEn": "attractive or beautiful; very pleasant",
        "meaningVi": "đáng yêu, dễ thương, đẹp đẽ",
        "example": "Thank you for the lovely flowers you sent me.",
        "exampleVi": "Cảm ơn bạn vì những bông hoa xinh đẹp mà bạn đã gửi cho tôi."
      },
      {
        "word": "heavy",
        "phonetic": "/ˈhev.i/",
        "wordType": "adj",
        "meaningEn": "weighing a lot; of great weight",
        "meaningVi": "nặng, nặng ký",
        "example": "He is a heavy man who finds it hard to run fast.",
        "exampleVi": "Anh ấy là một người đàn ông nặng cân, người thấy khó chạy nhanh."
      },
      {
        "word": "slim",
        "phonetic": "/slɪm/",
        "wordType": "adj",
        "meaningEn": "attractively thin",
        "meaningVi": "thon thả, mảnh mai",
        "example": "She keeps a slim figure by eating healthy foods.",
        "exampleVi": "Cô ấy giữ vóc dáng thon thả bằng cách ăn các thực phẩm lành mạnh."
      },
      {
        "word": "noisy",
        "phonetic": "/ˈnɔɪ.zi/",
        "wordType": "adj",
        "meaningEn": "making a lot of loud noise",
        "meaningVi": "ồn ào, náo nhiệt",
        "example": "The children are so noisy when they play upstairs.",
        "exampleVi": "Lũ trẻ thật ồn ào khi chúng chơi ở tầng trên."
      },
      {
        "word": "lonely",
        "phonetic": "/ˈloʊn.li/",
        "wordType": "adj",
        "meaningEn": "unhappy because you are alone or have no friends",
        "meaningVi": "cô đơn, hiu quạnh",
        "example": "He felt very lonely when he first moved to the big city.",
        "exampleVi": "Anh ấy cảm thấy rất cô đơn khi lần đầu tiên chuyển đến thành phố lớn."
      },
      {
        "word": "dirty",
        "phonetic": "/ˈdɝː.t̬i/",
        "wordType": "adj",
        "meaningEn": "not clean; covered with dirt",
        "meaningVi": "bẩn thỉu, dơ dáy",
        "example": "Wash your dirty hands before you eat dinner.",
        "exampleVi": "Hãy rửa bàn tay bẩn thỉu của bạn trước khi ăn tối."
      },
      {
        "word": "clean",
        "phonetic": "/kliːn/",
        "wordType": "adj",
        "meaningEn": "free from dirt; not dirty",
        "meaningVi": "sạch sẽ",
        "example": "Make sure your shoes are clean before entering the house.",
        "exampleVi": "Hãy chắc chắn rằng giày của bạn sạch sẽ trước khi vào nhà."
      },
      {
        "word": "wild",
        "phonetic": "/waɪld/",
        "wordType": "adj",
        "meaningEn": "living or growing in natural state; behaving in an excited and uncontrolled way",
        "meaningVi": "hoang dại, ngỗ nghịch, dữ dội",
        "example": "The kids were running wild in the playground.",
        "exampleVi": "Lũ trẻ đang chạy nhảy nghịch ngợm ngoài sân chơi."
      }
    ],
    "advanced": [
      {
        "word": "outgoing",
        "phonetic": "/ˈaʊt.ɡəʊ.ɪŋ/",
        "wordType": "adj",
        "meaningEn": "friendly and energetic and finding it easy to be with others",
        "meaningVi": "cởi mở, hướng ngoại",
        "example": "She is outgoing and loves parties.",
        "exampleVi": "Cô ấy hướng ngoại và yêu thích tiệc tùng."
      },
      {
        "word": "generous",
        "phonetic": "/ˈdʒen.ər.əs/",
        "wordType": "adj",
        "meaningEn": "willing to give money, help, kindness, etc., more than is usual",
        "meaningVi": "hào phóng, rộng lượng",
        "example": "He is very generous with his money.",
        "exampleVi": "Anh ấy rất hào phóng tiền bạc."
      },
      {
        "word": "optimistic",
        "phonetic": "/ˌɒp.tɪˈmɪs.tɪk/",
        "wordType": "adj",
        "meaningEn": "hoping or believing that good things will happen",
        "meaningVi": "lạc quan",
        "example": "Try to remain optimistic.",
        "exampleVi": "Hãy cố gắng duy trì sự lạc quan."
      },
      {
        "word": "considerate",
        "phonetic": "/kənˈsɪd.ər.ət/",
        "wordType": "adj",
        "meaningEn": "kind and helpful, thinking of other people's feelings",
        "meaningVi": "chu đáo, ân cần",
        "example": "It was considerate of you to call.",
        "exampleVi": "Bạn thật chu đáo khi gọi điện hỏi thăm."
      },
      {
        "word": "stubborn",
        "phonetic": "/ˈstʌb.ən/",
        "wordType": "adj",
        "meaningEn": "determined to do what you want and refusing to do anything else",
        "meaningVi": "bướng bỉnh, ương ngạnh",
        "example": "He is too stubborn to admit mistake.",
        "exampleVi": "Anh ấy quá bướng bỉnh không chịu nhận sai."
      },
      {
        "word": "ambitious",
        "phonetic": "/æmˈbɪʃ.əs/",
        "wordType": "adj",
        "meaningEn": "having a strong wish to be successful, powerful, or rich",
        "meaningVi": "hoài bão, tham vọng",
        "example": "She is an ambitious young lawyer.",
        "exampleVi": "Cô ấy là một luật sư trẻ đầy hoài bão."
      },
      {
        "word": "trustworthy",
        "phonetic": "/ˈtrʌstˌwɜː.ði/",
        "wordType": "adj",
        "meaningEn": "able to be trusted; reliable",
        "meaningVi": "đáng tin cậy",
        "example": "We need a trustworthy secretary.",
        "exampleVi": "Chúng tôi cần một thư ký đáng tin cậy."
      },
      {
        "word": "charismatic",
        "phonetic": "/ˌkær.ɪzˈmæt.ɪk/",
        "wordType": "adj",
        "meaningEn": "used to describe a person who has charisma",
        "meaningVi": "lôi cuốn, uy tín",
        "example": "He is a charismatic leader.",
        "exampleVi": "Ông ấy là một nhà lãnh đạo đầy lôi cuốn."
      },
      {
        "word": "pessimistic",
        "phonetic": "/ˌpes.ɪˈmɪs.tɪk/",
        "wordType": "adj",
        "meaningEn": "thinking that bad things are more likely to happen",
        "meaningVi": "bi quan",
        "example": "She has a pessimistic view of life.",
        "exampleVi": "Cô ấy có cái nhìn bi quan về cuộc sống."
      },
      {
        "word": "introverted",
        "phonetic": "/ˈɪn.trə.vɜː.tɪd/",
        "wordType": "adj",
        "meaningEn": "shy, quiet, and preferring to spend time alone",
        "meaningVi": "hướng nội",
        "example": "Introverted people enjoy quiet times.",
        "exampleVi": "Người hướng nội thích những khoảng thời gian yên tĩnh."
      },
      {
        "word": "eccentric",
        "phonetic": "/ɪkˈsen.trɪk/",
        "wordType": "adj",
        "meaningEn": "strange or unusual, sometimes in a humorous way",
        "meaningVi": "lập dị, kỳ lạ",
        "example": "The eccentric artist lives alone.",
        "exampleVi": "Người nghệ sĩ lập dị sống một mình."
      },
      {
        "word": "sympathetic",
        "phonetic": "/ˌsɪm.pəˈθet.ɪk/",
        "wordType": "adj",
        "meaningEn": "showing that you understand and care about someone's problems",
        "meaningVi": "thông cảm, đồng cảm",
        "example": "She was sympathetic to his problems.",
        "exampleVi": "Cô ấy đã đồng cảm với những vấn đề của anh ấy."
      },
      {
        "word": "arrogant",
        "phonetic": "/ˈær.ə.ɡənt/",
        "wordType": "adj",
        "meaningEn": "unpleasantly proud and behaving as if you are more important than others",
        "meaningVi": "kiêu ngạo, ngạo mạn",
        "example": "I found him extremely arrogant.",
        "exampleVi": "Tôi thấy anh ta vô cùng kiêu ngạo."
      },
      {
        "word": "compassionate",
        "phonetic": "/kəmˈpæʃ.ən.ət/",
        "wordType": "adj",
        "meaningEn": "showing a strong feeling of sympathy and sadness for the suffering of others",
        "meaningVi": "nhân từ, giàu lòng trắc ẩn",
        "example": "She is a compassionate nurse.",
        "exampleVi": "Cô ấy là một y tá đầy lòng trắc ẩn."
      },
      {
        "word": "mischievous",
        "phonetic": "/ˈmɪs.tʃɪ.vəs/",
        "wordType": "adj",
        "meaningEn": "behaving in a silly, active way, causing trouble but not serious damage",
        "meaningVi": "tinh nghịch, láu lỉnh",
        "example": "He had a mischievous smile on his face.",
        "exampleVi": "Anh ta nở một nụ cười tinh nghịch trên khuôn mặt."
      },
      {
        "word": "courageous",
        "phonetic": "/kəˈreɪ.dʒəs/",
        "wordType": "adj",
        "meaningEn": "brave and determined to do something difficult",
        "meaningVi": "dũng cảm, can trường",
        "example": "It was a courageous decision to speak out.",
        "exampleVi": "Đó là một quyết định dũng cảm khi lên tiếng."
      },
      {
        "word": "cynical",
        "phonetic": "/ˈsɪn.ɪ.kəl/",
        "wordType": "adj",
        "meaningEn": "believing that people are only interested in themselves and not sincere",
        "meaningVi": "hoài nghi, bất tín",
        "example": "He has a cynical attitude toward politicians.",
        "exampleVi": "Anh ta có thái độ hoài nghi đối với các chính trị gia."
      },
      {
        "word": "altruistic",
        "phonetic": "/ˌæl.truˈɪs.tɪk/",
        "wordType": "adj",
        "meaningEn": "showing a disinterested and selfless concern for the well-being of others",
        "meaningVi": "vị tha, nhân hậu",
        "example": "Her motives for helping were entirely altruistic.",
        "exampleVi": "Động cơ giúp đỡ của cô ấy hoàn toàn là vị tha."
      },
      {
        "word": "pretentious",
        "phonetic": "/prɪˈten.ʃəs/",
        "wordType": "adj",
        "meaningEn": "trying to appear or sound more important or clever than you are",
        "meaningVi": "tự phụ, kiêu căng",
        "example": "I found the novel very pretentious.",
        "exampleVi": "Tôi thấy cuốn tiểu thuyết đó rất tự phụ."
      },
      {
        "word": "neurotic",
        "phonetic": "/njʊəˈrɒt.ɪk/",
        "wordType": "adj",
        "meaningEn": "behaving in an unreasonable way because you are worried or nervous",
        "meaningVi": "hay lo lắng, bất ổn tâm lý",
        "example": "She is neurotic about keeping the house clean.",
        "exampleVi": "Cô ấy lo lắng thái quá về việc giữ nhà cửa sạch sẽ."
      },
      {
        "word": "conscientious",
        "phonetic": "/ˌkɒn.ʃiˈen.ʃəs/",
        "wordType": "adj",
        "meaningEn": "putting a lot of effort into your work",
        "meaningVi": "tận tâm, chu đáo",
        "example": "She is a conscientious worker.",
        "exampleVi": "Cô ấy là một công nhân tận tâm."
      },
      {
        "word": "extroverted",
        "phonetic": "/ˈek.strə.vɜː.tɪd/",
        "wordType": "adj",
        "meaningEn": "lively and enjoying being with other people",
        "meaningVi": "hướng ngoại",
        "example": "An extroverted person loves social gatherings.",
        "exampleVi": "Một người hướng ngoại yêu thích các cuộc tụ họp xã hội."
      },
      {
        "word": "resilient",
        "phonetic": "/rɪˈzɪl.i.ənt/",
        "wordType": "adj",
        "meaningEn": "able to quickly return to a previous good condition after problems",
        "meaningVi": "kiên cường, mau phục hồi",
        "example": "The community was highly resilient after the storm.",
        "exampleVi": "Cộng đồng đã rất kiên cường phục hồi sau cơn bão."
      },
      {
        "word": "gullible",
        "phonetic": "/ˈɡʌl.ə.bəl/",
        "wordType": "adj",
        "meaningEn": "easily deceived or tricked, and too willing to believe everything",
        "meaningVi": "nhẹ dạ, cả tin",
        "example": "How can you be so gullible?",
        "exampleVi": "Sao cậu lại có thể cả tin như vậy?"
      },
      {
        "word": "empathetic",
        "phonetic": "/ˌem.pəˈθet.ɪk/",
        "wordType": "adj",
        "meaningEn": "having the ability to imagine how someone else feels",
        "meaningVi": "đồng cảm, thấu cảm",
        "example": "A good therapist must be empathetic.",
        "exampleVi": "Một trị liệu viên tốt phải có lòng thấu cảm."
      },
      {
        "word": "benevolent",
        "phonetic": "/bəˈnev.əl.ənt/",
        "wordType": "adj",
        "meaningEn": "kind, helpful, and generous",
        "meaningVi": "nhân từ, rộng lượng",
        "example": "The company was founded by a benevolent businessman who donated most of his profits.",
        "exampleVi": "Công ty được thành lập bởi một nhà kinh doanh nhân từ, người đã quyên góp hầu hết lợi nhuận của mình."
      },
      {
        "word": "gregarious",
        "phonetic": "/ɡrɪˈɡer.i.əs/",
        "wordType": "adj",
        "meaningEn": "liking to be with other people; sociable",
        "meaningVi": "thích giao du, hòa đồng",
        "example": "Emma is a gregarious person who makes friends wherever she goes.",
        "exampleVi": "Emma là một người thích giao du, người kết bạn ở bất cứ nơi nào cô ấy đi qua."
      },
      {
        "word": "obnoxious",
        "phonetic": "/əbˈnɑːk.ʃəs/",
        "wordType": "adj",
        "meaningEn": "extremely unpleasant, offensive, or rude",
        "meaningVi": "khó chịu, đáng ghét",
        "example": "His obnoxious behavior at the dinner table ruined the evening.",
        "exampleVi": "Hành vi thô lỗ đáng ghét của anh ta tại bàn ăn đã làm hỏng cả buổi tối."
      },
      {
        "word": "unscrupulous",
        "phonetic": "/ʌnˈskruː.pjə.ləs/",
        "wordType": "adj",
        "meaningEn": "behaving in a way that is dishonest or unfair in order to get what you want",
        "meaningVi": "vô liêm sỉ, không có nguyên tắc đạo đức",
        "example": "The unscrupulous salesman cheated the elderly couple out of their savings.",
        "exampleVi": "Gã bán hàng vô liêm sỉ đã lừa gạt cặp vợ chồng già mất hết tiền tiết kiệm."
      },
      {
        "word": "timorous",
        "phonetic": "/ˈtɪm.ər.əs/",
        "wordType": "adj",
        "meaningEn": "nervous, lacking confidence, and easily frightened",
        "meaningVi": "rụt rè, nhút nhát, sợ sệt",
        "example": "The timorous child hid behind his mother's skirt when guests arrived.",
        "exampleVi": "Đứa trẻ rụt rè trốn sau váy mẹ khi khách đến."
      },
      {
        "word": "magnanimous",
        "phonetic": "/mæɡˈnæn.ə.məs/",
        "wordType": "adj",
        "meaningEn": "generous or forgiving, especially toward a rival or less powerful person",
        "meaningVi": "hào hiệp, cao thượng",
        "example": "The team was magnanimous in victory, praising their opponents warmly.",
        "exampleVi": "Đội bóng đã thể hiện sự cao thượng khi chiến thắng, nhiệt tình khen ngợi đối thủ của họ."
      },
      {
        "word": "supercilious",
        "phonetic": "/ˌsuː.pɚˈsɪl.i.əs/",
        "wordType": "adj",
        "meaningEn": "behaving as if you are better or more important than other people",
        "meaningVi": "kiêu ngạo, khinh khỉnh",
        "example": "She gave him a supercilious look and walked away without answering.",
        "exampleVi": "Cô ấy nhìn anh ta bằng ánh mắt khinh khỉnh rồi bỏ đi mà không trả lời."
      },
      {
        "word": "shrewd",
        "phonetic": "/ʃruːd/",
        "wordType": "adj",
        "meaningEn": "having or showing sharp powers of judgment; astute",
        "meaningVi": "sắc sảo, khôn ngoan, nhạy bén",
        "example": "He made a shrewd business decision that saved the company millions.",
        "exampleVi": "Anh ấy đã đưa ra một quyết định kinh doanh khôn ngoan giúp tiết kiệm hàng triệu đô cho công ty."
      },
      {
        "word": "affable",
        "phonetic": "/ˈæf.ə.bəl/",
        "wordType": "adj",
        "meaningEn": "friendly, good-natured, or easy to talk to",
        "meaningVi": "lịch sự, nhã nhặn, dễ gần",
        "example": "Our new manager is very affable and always listens to our concerns.",
        "exampleVi": "Quản lý mới của chúng tôi rất dễ gần và luôn lắng nghe những lo ngại của chúng tôi."
      },
      {
        "word": "aloof",
        "phonetic": "/əˈluːf/",
        "wordType": "adj",
        "meaningEn": "not friendly or willing to take part in things; cold and distant",
        "meaningVi": "xa lánh, hờ hững, lạnh lùng",
        "example": "She stayed aloof from the rest of the group, reading her book alone.",
        "exampleVi": "Cô ấy hờ hững với phần còn lại của nhóm, một mình đọc sách."
      },
      {
        "word": "petulant",
        "phonetic": "/ˈpetʃ.ə.lənt/",
        "wordType": "adj",
        "meaningEn": "easily irritated or annoyed, especially in a childish way",
        "meaningVi": "nóng nảy, cáu bẳn (một cách trẻ con)",
        "example": "The actress made a petulant face when she didn't get her way.",
        "exampleVi": "Nữ diễn viên lộ vẻ mặt cáu bẳn trẻ con khi không đạt được ý muốn."
      },
      {
        "word": "capricious",
        "phonetic": "/kəˈprɪʃ.əs/",
        "wordType": "adj",
        "meaningEn": "changing mood or behavior suddenly and unexpectedly",
        "meaningVi": "thất thường, sáng nắng chiều mưa",
        "example": "The weather here is as capricious as a spoiled child.",
        "exampleVi": "Thời tiết ở đây thất thường như một đứa trẻ được nuông chiều vậy."
      },
      {
        "word": "taciturn",
        "phonetic": "/ˈtæs.ə.tɜːrn/",
        "wordType": "adj",
        "meaningEn": "tending not to speak; reserved or uncommunicative",
        "meaningVi": "ít nói, lầm lì, trầm mặc",
        "example": "My grandfather was a taciturn man who rarely shared his feelings.",
        "exampleVi": "Ông nội tôi là một người ít nói, hiếm khi chia sẻ cảm xúc của mình."
      },
      {
        "word": "loquacious",
        "phonetic": "/loʊˈkweɪ.ʃəs/",
        "wordType": "adj",
        "meaningEn": "talking a lot; extremely talkative",
        "meaningVi": "nói nhiều, ba hoa",
        "example": "The loquacious barber kept talking throughout the entire haircut.",
        "exampleVi": "Người thợ cắt tóc nói nhiều liên tục trò chuyện trong suốt quá trình cắt tóc."
      },
      {
        "word": "placid",
        "phonetic": "/ˈplæs.ɪd/",
        "wordType": "adj",
        "meaningEn": "calm and peaceful, with little movement or activity; not easily excited",
        "meaningVi": "ôn hòa, bình thản, điềm đạm",
        "example": "She has a placid nature and never loses her temper.",
        "exampleVi": "Cô ấy có bản tính điềm đạm và không bao giờ mất bình tĩnh."
      },
      {
        "word": "indolent",
        "phonetic": "/ˈɪn.dəl.ənt/",
        "wordType": "adj",
        "meaningEn": "lazy; wanting to avoid activity or exertion",
        "meaningVi": "lười biếng, biếng nhác",
        "example": "The hot afternoon made all of us feel indolent.",
        "exampleVi": "Buổi chiều nắng nóng khiến tất cả chúng tôi cảm thấy lười biếng."
      },
      {
        "word": "fastidious",
        "phonetic": "/fæsˈtɪd.i.əs/",
        "wordType": "adj",
        "meaningEn": "giving too much attention to small details; very difficult to please",
        "meaningVi": "kỹ tính, cầu kỳ, khó tính",
        "example": "He is fastidious about his clothes and insists on having them hand-washed.",
        "exampleVi": "Anh ấy rất kỹ tính về quần áo của mình và khăng khăng đòi giặt chúng bằng tay."
      },
      {
        "word": "vivacious",
        "phonetic": "/vɪˈveɪ.ʃəs/",
        "wordType": "adj",
        "meaningEn": "attractively lively and animated (typically used of a woman)",
        "meaningVi": "hoạt bát, sôi nổi, tràn đầy sức sống",
        "example": "Her vivacious personality made her the center of attention at the party.",
        "exampleVi": "Tính cách hoạt bát của cô ấy đã khiến cô ấy trở thành tâm điểm của sự chú ý tại bữa tiệc."
      },
      {
        "word": "obstinate",
        "phonetic": "/ˈɑːb.stə.nət/",
        "wordType": "adj",
        "meaningEn": "stubbornly refusing to change one's opinion or chosen course of action",
        "meaningVi": "bướng bỉnh, ngoan cố",
        "example": "The obstinate child refused to eat his vegetables despite his parents' pleading.",
        "exampleVi": "Đứa trẻ bướng bỉnh từ chối ăn rau mặc cho sự nài nỉ của bố mẹ."
      },
      {
        "word": "recalcitrant",
        "phonetic": "/rɪˈkæl.sɪ.trənt/",
        "wordType": "adj",
        "meaningEn": "stubbornly disobedient, resisting authority or control",
        "meaningVi": "ngoan cố, cứng đầu, chống đối",
        "example": "The class was difficult to teach because of a few recalcitrant students.",
        "exampleVi": "Lớp học rất khó dạy vì có một vài học sinh ngoan cố chống đối."
      },
      {
        "word": "pragmatic",
        "phonetic": "/præɡˈmæt̬.ɪk/",
        "wordType": "adj",
        "meaningEn": "solving problems in a sensible way that suits the conditions that really exist",
        "meaningVi": "thực tế, thực dụng",
        "example": "We need to adopt a pragmatic approach rather than relying on theory.",
        "exampleVi": "Chúng ta cần áp dụng một cách tiếp cận thực tế thay vì dựa vào lý thuyết."
      },
      {
        "word": "impetuous",
        "phonetic": "/ɪmˈpetʃ.u.əs/",
        "wordType": "adj",
        "meaningEn": "acting or done quickly and without thought or care",
        "meaningVi": "hấp tấp, bốc đồng",
        "example": "His impetuous decision to quit his job without another one lined up was risky.",
        "exampleVi": "Quyết định bốc đồng nghỉ việc của anh ta khi chưa tìm được công việc khác là rất mạo hiểm."
      },
      {
        "word": "scrupulous",
        "phonetic": "/ˈskruː.pjə.ləs/",
        "wordType": "adj",
        "meaningEn": "extremely honest and careful about doing things correctly",
        "meaningVi": "tỉ mỉ, cực kỳ chu đáo, trung thực",
        "example": "She is scrupulous about keeping her financial records accurate.",
        "exampleVi": "Cô ấy cực kỳ chu đáo trong việc giữ cho hồ sơ tài chính của mình chính xác."
      },
      {
        "word": "churlish",
        "phonetic": "/ˈtʃɝː.lɪʃ/",
        "wordType": "adj",
        "meaningEn": "rude in a mean-spirited and surly way",
        "meaningVi": "thô bỉ, thô lỗ, cục cằn",
        "example": "It would be churlish of me to refuse their kind invitation.",
        "exampleVi": "Thật là thô lỗ nếu tôi từ chối lời mời tử tế của họ."
      },
      {
        "word": "pompous",
        "phonetic": "/ˈpɑːm.pəs/",
        "wordType": "adj",
        "meaningEn": "too serious and full of importance, self-important",
        "meaningVi": "khoác lác, tự phụ, hoa mỹ",
        "example": "The politician's pompous speech bored the audience.",
        "exampleVi": "Bài phát biểu tự phụ của vị chính trị gia đã làm khán giả chán ngấy."
      },
      {
        "word": "sagacious",
        "phonetic": "/səˈɡeɪ.ʃəs/",
        "wordType": "adj",
        "meaningEn": "having or showing keen mental discernment and good judgment; wise",
        "meaningVi": "khôn ngoan, sáng suốt",
        "example": "The king turned to his sagacious advisor for guidance on national security.",
        "exampleVi": "Nhà vua đã tìm đến người cố vấn khôn ngoan của mình để xin lời khuyên về an ninh quốc gia."
      },
      {
        "word": "garrulous",
        "phonetic": "/ˈɡær.əl.əs/",
        "wordType": "adj",
        "meaningEn": "excessively talkative, especially on trivial matters",
        "meaningVi": "nói nhiều, lắm lời, lảm nhảm",
        "example": "The garrulous old man sat on the bench and talked to anyone passing by.",
        "exampleVi": "Ông già nói nhiều ngồi trên ghế dài và trò chuyện với bất kỳ ai đi qua."
      },
      {
        "word": "diffident",
        "phonetic": "/ˈdɪf.ɪ.dənt/",
        "wordType": "adj",
        "meaningEn": "shy and lacking self-confidence",
        "meaningVi": "nhút nhát, thiếu tự tin",
        "example": "He was diffident about expressing his opinions in public meetings.",
        "exampleVi": "Anh ấy đã e dè, thiếu tự tin trong việc bày tỏ ý kiến của mình trước các cuộc họp công cộng."
      },
      {
        "word": "impertinent",
        "phonetic": "/ɪmˈpɝː.tən.ənt/",
        "wordType": "adj",
        "meaningEn": "rude and not showing respect, especially to someone older or in authority",
        "meaningVi": "xấc xược, hỗn xược",
        "example": "The student was punished for making an impertinent remark to the teacher.",
        "exampleVi": "Học sinh đó đã bị phạt vì đưa ra lời nhận xét xấc xược với giáo viên."
      },
      {
        "word": "indefatigable",
        "phonetic": "/ˌɪn.dɪˈfæt̬.ɪ.ɡə.bəl/",
        "wordType": "adj",
        "meaningEn": "never getting tired or giving up; untiring",
        "meaningVi": "không biết mệt mỏi, kiên trì",
        "example": "She was an indefatigable defender of human rights until her death.",
        "exampleVi": "Cô ấy là một người bảo vệ nhân quyền không biết mệt mỏi cho đến khi qua đời."
      },
      {
        "word": "sedulous",
        "phonetic": "/ˈsedʒ.ə.ləs/",
        "wordType": "adj",
        "meaningEn": "showing dedication and diligence; hard-working",
        "meaningVi": "cần mẫn, siêng năng, chuyên cần",
        "example": "With sedulous effort, she managed to master the violin in just three years.",
        "exampleVi": "Với sự nỗ lực cần mẫn, cô ấy đã làm chủ được cây đàn vi-o-long chỉ trong vòng ba năm."
      },
      {
        "word": "obsequious",
        "phonetic": "/əbˈsiː.kwi.əs/",
        "wordType": "adj",
        "meaningEn": "too eager to praise or obey someone, often for personal gain",
        "meaningVi": "khúm núm, xun xoe, nịnh bợ",
        "example": "He had an obsequious manner that made his co-workers uncomfortable.",
        "exampleVi": "Anh ta có thái độ xun xoe nịnh bợ khiến các đồng nghiệp của mình không thoải mái."
      },
      {
        "word": "flippant",
        "phonetic": "/ˈflɪp.ənt/",
        "wordType": "adj",
        "meaningEn": "not showing a serious or respectful attitude",
        "meaningVi": "ỡm ờ, cợt nhả, thiếu nghiêm túc",
        "example": "His flippant attitude during the job interview cost him the position.",
        "exampleVi": "Thái độ cợt nhả thiếu nghiêm túc của anh ta trong buổi phỏng vấn xin việc đã làm anh ta mất cơ hội nhận vị trí đó."
      },
      {
        "word": "mercurial",
        "phonetic": "/mɝːˈkjʊr.i.əl/",
        "wordType": "adj",
        "meaningEn": "changing suddenly and often; volatile",
        "meaningVi": "hay thay đổi, nhanh nhẹn nhưng thất thường",
        "example": "His mercurial temperament made him difficult to work with.",
        "exampleVi": "Tính khí thất thường của anh ta khiến cho việc hợp tác trở nên khó khăn."
      },
      {
        "word": "insolent",
        "phonetic": "/ˈɪn.səl.ənt/",
        "wordType": "adj",
        "meaningEn": "showing a rude and arrogant lack of respect",
        "meaningVi": "láo xược, láo lếu, xấc láo",
        "example": "The insolent child was sent to the principal's office.",
        "exampleVi": "Đứa trẻ láo xược đã bị gửi đến phòng hiệu trưởng."
      },
      {
        "word": "querulous",
        "phonetic": "/ˈkwer.jə.ləs/",
        "wordType": "adj",
        "meaningEn": "complaining in a rather petulant or whining manner",
        "meaningVi": "hay cằn nhằn, dễ cáu kỉnh",
        "example": "The querulous passengers complained about the minor train delay.",
        "exampleVi": "Những hành khách hay cằn nhằn đã phàn nàn về việc tàu bị trễ một chút."
      },
      {
        "word": "intrepid",
        "phonetic": "/ɪnˈtrep.ɪd/",
        "wordType": "adj",
        "meaningEn": "extremely brave and showing no fear of dangerous situations",
        "meaningVi": "gan dạ, dũng cảm, không sợ hãi",
        "example": "The intrepid explorer ventured into the deepest parts of the jungle.",
        "exampleVi": "Nhà thám hiểm gan dạ đã mạo hiểm đi vào những phần sâu nhất của khu rừng rậm."
      },
      {
        "word": "insouciant",
        "phonetic": "/ɪnˈsuː.si.ənt/",
        "wordType": "adj",
        "meaningEn": "showing a casual lack of concern; carefree and unconcerned",
        "meaningVi": "vô tư lự, thảnh thơi, không lo nghĩ",
        "example": "She walked down the street with an insouciant shrug of her shoulders.",
        "exampleVi": "Cô ấy đi dạo trên phố với một cái nhún vai vô tư lự."
      },
      {
        "word": "phlegmatic",
        "phonetic": "/fleɡˈmæt̬.ɪk/",
        "wordType": "adj",
        "meaningEn": "not easily excited or made angry; calm and even-tempered",
        "meaningVi": "phớt lờ, lạnh lùng, điềm tĩnh",
        "example": "As a surgeon, she must remain phlegmatic under high-pressure conditions.",
        "exampleVi": "Là một bác sĩ phẫu thuật, cô ấy phải giữ được sự điềm tĩnh trong điều kiện áp lực cao."
      },
      {
        "word": "pusillanimous",
        "phonetic": "/ˌpjuː.sɪˈlæn.ə.məs/",
        "wordType": "adj",
        "meaningEn": "showing a lack of courage or determination; cowardly",
        "meaningVi": "hèn nhát, nhút nhát",
        "example": "The authority made a pusillanimous decision to cancel the debate due to pressure.",
        "exampleVi": "Chính quyền đã đưa ra quyết định hèn nhát là hủy bỏ cuộc tranh luận do áp lực."
      },
      {
        "word": "munificent",
        "phonetic": "/mjuːˈnɪf.ə.sənt/",
        "wordType": "adj",
        "meaningEn": "very generous, especially with money",
        "meaningVi": "cực kỳ rộng lượng, hào phóng",
        "example": "The university received a munificent donation from a former graduate.",
        "exampleVi": "Trường đại học đã nhận được một khoản quyên góp cực kỳ hào phóng từ một cựu sinh viên tốt nghiệp."
      },
      {
        "word": "morose",
        "phonetic": "/məˈroʊs/",
        "wordType": "adj",
        "meaningEn": "unhappy, annoyed, and unwilling to speak or smile; sullen",
        "meaningVi": "rầu rĩ, u sầu, buồn bã",
        "example": "He sat in the corner of the room looking morose all evening.",
        "exampleVi": "Anh ta ngồi ở góc phòng với vẻ mặt buồn bã rầu rĩ suốt cả buổi tối."
      },
      {
        "word": "recondite",
        "phonetic": "/ˈrek.ən.daɪt/",
        "wordType": "adj",
        "meaningEn": "not known about or understood by many people; abstruse",
        "meaningVi": "thâm hiểm, khó hiểu, ít người biết",
        "example": "He was a scholar of recondite historical facts.",
        "exampleVi": "Ông ấy là một học giả về những sự thật lịch sử ít người biết đến."
      }
    ]
  },
  {
    "id": "animals",
    "title": "Thế giới động vật (Animals & Pets)",
    "desc": "Tuyển tập tất cả động vật trên thế giới: thú cưng, động vật hoang dã, loài bò sát, sinh vật biển và chim muông.",
    "color": "border-emerald-200 bg-emerald-50/50 text-emerald-800 hover:border-emerald-400 dark:bg-slate-900/50 dark:border-slate-800 dark:text-emerald-400",
    "beginner": [
      {
        "word": "dog",
        "phonetic": "/dɒɡ/",
        "wordType": "noun",
        "meaningEn": "a common animal with four legs, kept as a pet or for work",
        "meaningVi": "con chó",
        "example": "I have a pet dog.",
        "exampleVi": "Tôi có một chú chó cưng."
      },
      {
        "word": "cat",
        "phonetic": "/kæt/",
        "wordType": "noun",
        "meaningEn": "a small domesticated carnivorous mammal with soft fur",
        "meaningVi": "con mèo",
        "example": "The cat is sleeping.",
        "exampleVi": "Con mèo đang ngủ."
      },
      {
        "word": "bird",
        "phonetic": "/bɜːd/",
        "wordType": "noun",
        "meaningEn": "a creature with feathers and wings, usually able to fly",
        "meaningVi": "con chim",
        "example": "Birds are singing.",
        "exampleVi": "Những chú chim đang hót."
      },
      {
        "word": "fish",
        "phonetic": "/fɪʃ/",
        "wordType": "noun",
        "meaningEn": "an animal that lives in water and breathes through gills",
        "meaningVi": "con cá",
        "example": "Fish live in water.",
        "exampleVi": "Cá sống ở dưới nước."
      },
      {
        "word": "horse",
        "phonetic": "/hɔːs/",
        "wordType": "noun",
        "meaningEn": "a large animal with four legs that people ride or use for pulling loads",
        "meaningVi": "con ngựa",
        "example": "He rides a white horse.",
        "exampleVi": "Anh ấy cưỡi một con ngựa trắng."
      },
      {
        "word": "rabbit",
        "phonetic": "/ˈræb.ɪt/",
        "wordType": "noun",
        "meaningEn": "a small animal with long ears and soft fur that lives in holes",
        "meaningVi": "con thỏ",
        "example": "The rabbit runs fast.",
        "exampleVi": "Con thỏ chạy rất nhanh."
      },
      {
        "word": "monkey",
        "phonetic": "/ˈmʌŋ.ki/",
        "wordType": "noun",
        "meaningEn": "a clever animal with a long tail that climbs trees",
        "meaningVi": "con khỉ",
        "example": "Monkeys eat bananas.",
        "exampleVi": "Những con khỉ ăn chuối."
      },
      {
        "word": "elephant",
        "phonetic": "/ˈel.ɪ.fənt/",
        "wordType": "noun",
        "meaningEn": "a very large grey animal with big ears and a long trunk",
        "meaningVi": "con voi",
        "example": "The elephant has a trunk.",
        "exampleVi": "Con voi có một chiếc vòi."
      },
      {
        "word": "lion",
        "phonetic": "/ˈlaɪ.ən/",
        "wordType": "noun",
        "meaningEn": "a large wild animal of the cat family, known as king of beasts",
        "meaningVi": "sư tử",
        "example": "The lion is the king of the jungle.",
        "exampleVi": "Sư tử là chúa tể của rừng xanh."
      },
      {
        "word": "tiger",
        "phonetic": "/ˈtaɪ.ɡər/",
        "wordType": "noun",
        "meaningEn": "a large wild animal of the cat family with orange and black stripes",
        "meaningVi": "con hổ",
        "example": "Tigers have beautiful stripes.",
        "exampleVi": "Hổ có những đường vằn rất đẹp."
      },
      {
        "word": "bear",
        "phonetic": "/beər/",
        "wordType": "noun",
        "meaningEn": "a large, strong wild mammal with a thick fur coat",
        "meaningVi": "con gấu",
        "example": "Bears love eating honey.",
        "exampleVi": "Gấu rất thích ăn mật ong."
      },
      {
        "word": "duck",
        "phonetic": "/dʌk/",
        "wordType": "noun",
        "meaningEn": "a common water bird with webbed feet and a broad flat beak",
        "meaningVi": "con vịt",
        "example": "Ducks are swimming in the pond.",
        "exampleVi": "Đôi vịt đang bơi trong ao."
      },
      {
        "word": "pig",
        "phonetic": "/pɪɡ/",
        "wordType": "noun",
        "meaningEn": "a pink or black farm animal with short legs and a flat nose",
        "meaningVi": "con lợn, con heo",
        "example": "Pigs are intelligent animals.",
        "exampleVi": "Lợn là loài động vật thông minh."
      },
      {
        "word": "sheep",
        "phonetic": "/ʃiːp/",
        "wordType": "noun",
        "meaningEn": "a farm animal with thick wool, kept for its meat or wool",
        "meaningVi": "con cừu",
        "example": "The sheep are eating grass.",
        "exampleVi": "Đàn cừu đang gặm cỏ."
      },
      {
        "word": "mouse",
        "phonetic": "/maʊs/",
        "wordType": "noun",
        "meaningEn": "a small mammal with a pointed snout and a long tail",
        "meaningVi": "con chuột",
        "example": "The cat is chasing a mouse.",
        "exampleVi": "Con mèo đang đuổi theo con chuột."
      },
      {
        "word": "chicken",
        "phonetic": "/ˈtʃɪk.ɪn/",
        "wordType": "noun",
        "meaningEn": "a common farm bird kept for its eggs and meat",
        "meaningVi": "con gà",
        "example": "The chicken laid an egg.",
        "exampleVi": "Con gà đã đẻ một quả trứng."
      },
      {
        "word": "cow",
        "phonetic": "/kaʊ/",
        "wordType": "noun",
        "meaningEn": "a large female farm animal kept for its milk or meat",
        "meaningVi": "con bò",
        "example": "Cows eat fresh grass.",
        "exampleVi": "Bò ăn cỏ tươi."
      },
      {
        "word": "frog",
        "phonetic": "/frɒɡ/",
        "wordType": "noun",
        "meaningEn": "a small green animal with long back legs for jumping, living in water or on land",
        "meaningVi": "con ếch",
        "example": "The frog jumped into the water.",
        "exampleVi": "Con ếch nhảy xuống nước."
      },
      {
        "word": "snake",
        "phonetic": "/sneɪk/",
        "wordType": "noun",
        "meaningEn": "a long reptile with no legs that slides along the ground",
        "meaningVi": "con rắn",
        "example": "A snake can shed its skin.",
        "exampleVi": "Một con rắn có thể lột da."
      },
      {
        "word": "turtle",
        "phonetic": "/ˈtɜː.təl/",
        "wordType": "noun",
        "meaningEn": "a slow reptile with a hard round shell protecting its body",
        "meaningVi": "con rùa",
        "example": "The sea turtle swimming slowly.",
        "exampleVi": "Chú rùa biển bơi lội chậm rãi."
      },
      {
        "word": "goat",
        "phonetic": "/ɡəʊt/",
        "wordType": "noun",
        "meaningEn": "an animal with horns and a beard, kept for milk and meat",
        "meaningVi": "con dê",
        "example": "The goat climbed the steep hill.",
        "exampleVi": "Con dê leo lên ngọn đồi dốc."
      },
      {
        "word": "deer",
        "phonetic": "/dɪər/",
        "wordType": "noun",
        "meaningEn": "a quite large wild animal that eats grass and has horns called antlers",
        "meaningVi": "con nai, con hươu",
        "example": "We saw a deer in the forest.",
        "exampleVi": "Chúng tôi đã thấy một con hươu trong rừng."
      },
      {
        "word": "fox",
        "phonetic": "/fɒks/",
        "wordType": "noun",
        "meaningEn": "a wild animal of the dog family, with red-brown fur and a bushy tail",
        "meaningVi": "con cáo",
        "example": "The clever fox escaped the hunter.",
        "exampleVi": "Con cáo thông minh đã thoát khỏi người thợ săn."
      },
      {
        "word": "wolf",
        "phonetic": "/wʊlf/",
        "wordType": "noun",
        "meaningEn": "a wild animal of the dog family that hunts in packs",
        "meaningVi": "con sói",
        "example": "The wolves howled at the moon.",
        "exampleVi": "Đàn sói tru lên dưới trăng."
      },
      {
        "word": "whale",
        "phonetic": "/weɪl/",
        "wordType": "noun",
        "meaningEn": "a very large marine mammal that breathes through a blowhole",
        "meaningVi": "cá voi",
        "example": "A blue whale is the largest animal.",
        "exampleVi": "Cá voi xanh là loài động vật lớn nhất."
      },
      {
        "word": "puppy",
        "phonetic": "/ˈpʌp.i/",
        "wordType": "noun",
        "meaningEn": "a young dog",
        "meaningVi": "chó con",
        "example": "The family adopted a cute puppy from the shelter.",
        "exampleVi": "Gia đình đã nhận nuôi một chú chó con dễ thương từ trạm cứu hộ."
      },
      {
        "word": "kitten",
        "phonetic": "/ˈkɪt.ən/",
        "wordType": "noun",
        "meaningEn": "a young cat",
        "meaningVi": "mèo con",
        "example": "The little kitten loves to play with a ball of yarn.",
        "exampleVi": "Chú mèo con nhỏ rất thích chơi với cuộn len."
      },
      {
        "word": "parrot",
        "phonetic": "/ˈpær.ət/",
        "wordType": "noun",
        "meaningEn": "a brightly colored bird that can copy what people say",
        "meaningVi": "con vẹt",
        "example": "The colorful parrot repeated everything I said.",
        "exampleVi": "Con vẹt nhiều màu sắc đã lặp lại mọi lời tôi nói."
      },
      {
        "word": "dolphin",
        "phonetic": "/ˈdɒl.fɪn/",
        "wordType": "noun",
        "meaningEn": "a highly intelligent sea mammal with a beaklike snout",
        "meaningVi": "cá heo",
        "example": "We saw a dolphin jumping out of the water.",
        "exampleVi": "Chúng tôi thấy một chú cá heo nhảy lên khỏi mặt nước."
      },
      {
        "word": "shark",
        "phonetic": "/ʃɑːk/",
        "wordType": "noun",
        "meaningEn": "a large fish with sharp teeth that lives in the sea",
        "meaningVi": "cá mập",
        "example": "Many people are afraid of sharks when swimming in the ocean.",
        "exampleVi": "Nhiều người sợ cá mập khi bơi ở đại dương."
      },
      {
        "word": "penguin",
        "phonetic": "/ˈpeŋ.ɡwɪn/",
        "wordType": "noun",
        "meaningEn": "a black and white sea bird that cannot fly and lives in cold areas",
        "meaningVi": "chim cánh cụt",
        "example": "The penguins waddled across the ice.",
        "exampleVi": "Những chú chim cánh cụt lạch bạch bước đi trên băng."
      },
      {
        "word": "zebra",
        "phonetic": "/ˈzeb.rə/",
        "wordType": "noun",
        "meaningEn": "an African wild animal like a horse with black and white stripes",
        "meaningVi": "ngựa vằn",
        "example": "A zebra has distinctive black and white stripes on its body.",
        "exampleVi": "Một con ngựa vằn có những sọc đen trắng đặc trưng trên cơ thể."
      },
      {
        "word": "giraffe",
        "phonetic": "/dʒɪˈrɑːf/",
        "wordType": "noun",
        "meaningEn": "a tall African animal with a very long neck and long legs",
        "meaningVi": "hươu cao cổ",
        "example": "The giraffe ate leaves from the top of the tall tree.",
        "exampleVi": "Con hươu cao cổ ăn lá từ ngọn của cái cây cao."
      },
      {
        "word": "squirrel",
        "phonetic": "/ˈskwɪr.əl/",
        "wordType": "noun",
        "meaningEn": "a small animal with a bushy tail that climbs trees and eats nuts",
        "meaningVi": "con sóc",
        "example": "I saw a squirrel gathering acorns in the park.",
        "exampleVi": "Tôi thấy một con sóc đang nhặt quả sồi trong công viên."
      },
      {
        "word": "butterfly",
        "phonetic": "/ˈbʌt.ə.flaɪ/",
        "wordType": "noun",
        "meaningEn": "an insect with large, often brightly colored wings",
        "meaningVi": "con bướm",
        "example": "A beautiful butterfly landed on a flower.",
        "exampleVi": "Một chú bướm xinh đẹp đã đậu lên một bông hoa."
      },
      {
        "word": "honeybee",
        "phonetic": "/ˈhʌn.i.biː/",
        "wordType": "noun",
        "meaningEn": "a flying insect that makes honey and lives in a hive",
        "meaningVi": "con ong mật",
        "example": "The honeybee collected nectar from the garden.",
        "exampleVi": "Con ong mật đã thu thập mật hoa từ khu vườn."
      },
      {
        "word": "spider",
        "phonetic": "/ˈspaɪ.dər/",
        "wordType": "noun",
        "meaningEn": "a small creature with eight legs that spins webs to catch insects",
        "meaningVi": "con nhện",
        "example": "There is a small spider spinning a web in the corner.",
        "exampleVi": "Có một con nhện nhỏ đang giăng tơ ở góc tường."
      },
      {
        "word": "ant",
        "phonetic": "/ænt/",
        "wordType": "noun",
        "meaningEn": "a tiny insect that lives in highly organized social groups",
        "meaningVi": "con kiến",
        "example": "A line of ants crawled across the kitchen floor.",
        "exampleVi": "Một đàn kiến bò thành hàng trên sàn nhà bếp."
      },
      {
        "word": "snail",
        "phonetic": "/sneɪl/",
        "wordType": "noun",
        "meaningEn": "a small, slow-moving creature with a spiral shell",
        "meaningVi": "con ốc sên",
        "example": "A snail moves very slowly and leaves a wet trail.",
        "exampleVi": "Một con ốc sên di chuyển rất chậm và để lại một vệt nước."
      },
      {
        "word": "crab",
        "phonetic": "/kræb/",
        "wordType": "noun",
        "meaningEn": "a sea creature with ten legs and a hard shell, moving sideways",
        "meaningVi": "con cua",
        "example": "The crab walked sideways on the sandy beach.",
        "exampleVi": "Con cua bò ngang trên bãi biển đầy cát."
      },
      {
        "word": "octopus",
        "phonetic": "/ˈɒk.tə.pəs/",
        "wordType": "noun",
        "meaningEn": "a sea creature with a soft oval body and eight tentacles",
        "meaningVi": "bạch tuộc",
        "example": "The octopus hid behind a rock in the ocean.",
        "exampleVi": "Con bạch tuộc trốn sau một tảng đá dưới đại dương."
      },
      {
        "word": "owl",
        "phonetic": "/aʊl/",
        "wordType": "noun",
        "meaningEn": "a bird with large eyes that hunts small animals at night",
        "meaningVi": "chim cú mèo",
        "example": "We heard an owl hooting in the forest last night.",
        "exampleVi": "Chúng tôi nghe tiếng một con cú mèo kêu trong rừng đêm qua."
      },
      {
        "word": "eagle",
        "phonetic": "/ˈiː.ɡəl/",
        "wordType": "noun",
        "meaningEn": "a large, strong bird of prey with excellent eyesight",
        "meaningVi": "chim đại bàng",
        "example": "The eagle soared high above the mountains.",
        "exampleVi": "Con đại bàng bay lượn trên tầm cao của những ngọn núi."
      },
      {
        "word": "camel",
        "phonetic": "/ˈkæm.əl/",
        "wordType": "noun",
        "meaningEn": "a large desert animal with one or two humps on its back",
        "meaningVi": "lạc đà",
        "example": "The camel carried tourists across the hot desert.",
        "exampleVi": "Con lạc đà chở du khách băng qua sa mạc nóng bỏng."
      },
      {
        "word": "kangaroo",
        "phonetic": "/ˌkæŋ.ɡərˈuː/",
        "wordType": "noun",
        "meaningEn": "a large Australian animal that moves by hopping and carries its baby in a pouch",
        "meaningVi": "chuột túi (kangaroo)",
        "example": "A baby kangaroo is called a joey.",
        "exampleVi": "Một con chuột túi con được gọi là joey."
      },
      {
        "word": "panda",
        "phonetic": "/ˈpæn.də/",
        "wordType": "noun",
        "meaningEn": "a large, bear-like black and white animal that eats bamboo",
        "meaningVi": "gấu trúc",
        "example": "The panda was happily chewing on bamboo shoots.",
        "exampleVi": "Chú gấu trúc đang vui vẻ nhai măng tre."
      },
      {
        "word": "koala",
        "phonetic": "/kəʊˈɑː.lə/",
        "wordType": "noun",
        "meaningEn": "an Australian animal with thick gray fur that lives in eucalyptus trees",
        "meaningVi": "gấu túi (koala)",
        "example": "The koala spent most of the day sleeping in the tree.",
        "exampleVi": "Chú gấu túi đã dành phần lớn thời gian trong ngày để ngủ trên cây."
      },
      {
        "word": "turkey",
        "phonetic": "/ˈtɜː.ki/",
        "wordType": "noun",
        "meaningEn": "a large bird kept for its meat, often eaten on Thanksgiving",
        "meaningVi": "gà tây",
        "example": "We had roast turkey for dinner during the holiday.",
        "exampleVi": "Chúng tôi đã ăn món gà tây quay cho bữa tối trong kỳ nghỉ."
      },
      {
        "word": "goose",
        "phonetic": "/ɡuːs/",
        "wordType": "noun",
        "meaningEn": "a large water bird, larger than a duck, with a long neck",
        "meaningVi": "con ngỗng",
        "example": "The goose hissed loudly when we got too close to its nest.",
        "exampleVi": "Con ngỗng kêu rít lên inh ỏi khi chúng tôi đến quá gần tổ của nó."
      },
      {
        "word": "pigeon",
        "phonetic": "/ˈpɪdʒ.ən/",
        "wordType": "noun",
        "meaningEn": "a common bird found in cities, usually gray in color",
        "meaningVi": "chim bồ câu",
        "example": "Many pigeons gathered in the city square to eat breadcrumbs.",
        "exampleVi": "Nhiều chú chim bồ câu tụ tập ở quảng trường thành phố để ăn vụn bánh mì."
      },
      {
        "word": "swan",
        "phonetic": "/swɒn/",
        "wordType": "noun",
        "meaningEn": "a large, beautiful white water bird with a long curved neck",
        "meaningVi": "chim thiên nga",
        "example": "A graceful white swan swam quietly across the lake.",
        "exampleVi": "Một con thiên nga trắng duyên dáng bơi lội tĩnh lặng trên mặt hồ."
      },
      {
        "word": "crocodile",
        "phonetic": "/ˈkrɒk.ə.daɪl/",
        "wordType": "noun",
        "meaningEn": "a large reptile with a long tail, hard skin, and sharp teeth, living in rivers",
        "meaningVi": "con cá sấu",
        "example": "The crocodile floated silently in the muddy river water.",
        "exampleVi": "Con cá sấu nổi lặng lẽ trên dòng nước sông bùn lầy."
      },
      {
        "word": "lizard",
        "phonetic": "/ˈlɪz.əd/",
        "wordType": "noun",
        "meaningEn": "a small reptile with a long body, four legs, and a tail",
        "meaningVi": "con thằn lằn",
        "example": "A tiny lizard was sunning itself on the warm wall.",
        "exampleVi": "Một con thằn lằn nhỏ đang phơi nắng trên bức tường ấm áp."
      },
      {
        "word": "toad",
        "phonetic": "/təʊd/",
        "wordType": "noun",
        "meaningEn": "a small animal similar to a frog but with dry, bumpy skin",
        "meaningVi": "con cóc",
        "example": "A large toad was sitting under the wet leaves in the garden.",
        "exampleVi": "Một con cóc lớn đang ngồi dưới những chiếc lá ẩm ướt trong vườn."
      },
      {
        "word": "rat",
        "phonetic": "/ræt/",
        "wordType": "noun",
        "meaningEn": "a rodent resembling a large mouse, often seen as a pest",
        "meaningVi": "con chuột cống",
        "example": "Our cat chased a large rat away from the backyard.",
        "exampleVi": "Con mèo của chúng tôi đã đuổi một con chuột cống lớn ra khỏi sân sau."
      },
      {
        "word": "hamster",
        "phonetic": "/ˈhæm.stər/",
        "wordType": "noun",
        "meaningEn": "a small, furry rodent with large cheek pouches, often kept as a pet",
        "meaningVi": "chuột hamster",
        "example": "The hamster spent all night running on its plastic wheel.",
        "exampleVi": "Chú chuột hamster đã dành cả đêm để chạy trên cái bánh xe nhựa của nó."
      },
      {
        "word": "seal",
        "phonetic": "/siːl/",
        "wordType": "noun",
        "meaningEn": "a fish-eating sea mammal with flippers, living mostly in cold regions",
        "meaningVi": "hải cẩu",
        "example": "We saw a cute seal resting on a rock by the sea.",
        "exampleVi": "Chúng tôi thấy một chú hải cẩu dễ thương đang nghỉ ngơi trên mỏm đá sát biển."
      },
      {
        "word": "jellyfish",
        "phonetic": "/ˈdʒel.i.fɪʃ/",
        "wordType": "noun",
        "meaningEn": "a sea animal with a soft, transparent body and stinging tentacles",
        "meaningVi": "con sứa",
        "example": "Be careful when swimming, as there are many jellyfish in the water.",
        "exampleVi": "Hãy cẩn thận khi bơi, vì có rất nhiều sứa ở dưới nước."
      },
      {
        "word": "starfish",
        "phonetic": "/ˈstɑː.fɪʃ/",
        "wordType": "noun",
        "meaningEn": "a star-shaped sea creature with five or more arms",
        "meaningVi": "sao biển",
        "example": "The children found a beautiful orange starfish on the beach.",
        "exampleVi": "Lũ trẻ tìm thấy một con sao biển màu cam tuyệt đẹp trên bãi biển."
      },
      {
        "word": "shrimp",
        "phonetic": "/ʃrɪmp/",
        "wordType": "noun",
        "meaningEn": "a small, edible sea creature with a shell and many legs",
        "meaningVi": "con tôm",
        "example": "My favorite seafood dish is grilled garlic shrimp.",
        "exampleVi": "Món hải sản yêu thích của tôi là tôm nướng tỏi."
      },
      {
        "word": "lobster",
        "phonetic": "/ˈlɒb.stər/",
        "wordType": "noun",
        "meaningEn": "a large marine shellfish with two large claws",
        "meaningVi": "tôm hùm",
        "example": "Lobster is considered a luxury meal in many restaurants.",
        "exampleVi": "Tôm hùm được coi là một món ăn xa xỉ ở nhiều nhà hàng."
      },
      {
        "word": "mosquito",
        "phonetic": "/məˈskiː.təʊ/",
        "wordType": "noun",
        "meaningEn": "a small flying insect that bites people and animals to drink blood",
        "meaningVi": "con muỗi",
        "example": "A mosquito bit me on my arm, and it is very itchy.",
        "exampleVi": "Một con muỗi đã đốt vào tay tôi, và nó rất ngứa."
      },
      {
        "word": "fly",
        "phonetic": "/flaɪ/",
        "wordType": "noun",
        "meaningEn": "a small insect with two wings, often found around food",
        "meaningVi": "con ruồi",
        "example": "A annoying fly kept buzzing around my head.",
        "exampleVi": "Một con ruồi phiền phức cứ vo ve xung quanh đầu tôi."
      },
      {
        "word": "donkey",
        "phonetic": "/ˈdɒŋ.ki/",
        "wordType": "noun",
        "meaningEn": "a domesticated animal like a small horse with long ears",
        "meaningVi": "con lừa",
        "example": "The farmer used a donkey to pull the small cart.",
        "exampleVi": "Người nông dân đã dùng một con lừa để kéo chiếc xe nhỏ."
      },
      {
        "word": "bull",
        "phonetic": "/bʊl/",
        "wordType": "noun",
        "meaningEn": "an adult male of the cattle family",
        "meaningVi": "bò tót (hoặc bò đực)",
        "example": "The angry bull charged towards the red flag.",
        "exampleVi": "Con bò đực giận dữ lao thẳng về phía lá cờ đỏ."
      },
      {
        "word": "rooster",
        "phonetic": "/ˈruː.stər/",
        "wordType": "noun",
        "meaningEn": "an adult male chicken",
        "meaningVi": "con gà trống",
        "example": "The rooster crows early in the morning to wake everyone up.",
        "exampleVi": "Con gà trống gáy vào sáng sớm để đánh thức mọi người dậy."
      },
      {
        "word": "hen",
        "phonetic": "/hen/",
        "wordType": "noun",
        "meaningEn": "an adult female chicken, often kept for its eggs",
        "meaningVi": "con gà mái",
        "example": "The brown hen laid three fresh eggs today.",
        "exampleVi": "Con gà mái nâu đã đẻ ba quả trứng tươi hôm nay."
      },
      {
        "word": "calf",
        "phonetic": "/kɑːf/",
        "wordType": "noun",
        "meaningEn": "a young cow or bull",
        "meaningVi": "con bê",
        "example": "The newborn calf was trying to stand up next to its mother.",
        "exampleVi": "Con bê mới sinh đang cố gắng đứng dậy bên cạnh mẹ nó."
      }
    ],
    "advanced": [
      {
        "word": "predator",
        "phonetic": "/ˈpred.ə.tər/",
        "wordType": "noun",
        "meaningEn": "an animal that hunts, kills, and eats other animals",
        "meaningVi": "thú săn mồi, động vật ăn thịt",
        "example": "Lions are apex predators.",
        "exampleVi": "Sư tử là loài săn mồi đầu bảng."
      },
      {
        "word": "endangered",
        "phonetic": "/ɪnˈdeɪn.dʒəd/",
        "wordType": "adj",
        "meaningEn": "animals or plants that may soon not exist because there are very few left",
        "meaningVi": "có nguy cơ tuyệt chủng",
        "example": "Pandas are endangered species.",
        "exampleVi": "Gấu trúc là loài động vật có nguy cơ tuyệt chủng."
      },
      {
        "word": "mammal",
        "phonetic": "/ˈmæm.əl/",
        "wordType": "noun",
        "meaningEn": "a warm-blooded animal that has hair or fur and breathes air",
        "meaningVi": "động vật có vú",
        "example": "Whales are marine mammals.",
        "exampleVi": "Cá voi là động vật biển có vú."
      },
      {
        "word": "reptile",
        "phonetic": "/ˈrep.taɪl/",
        "wordType": "noun",
        "meaningEn": "a cold-blooded animal whose body is covered with scales",
        "meaningVi": "loài bò sát",
        "example": "Snakes belong to reptiles.",
        "exampleVi": "Rắn thuộc nhóm bò sát."
      },
      {
        "word": "domesticated",
        "phonetic": "/dəˈmes.tɪ.keɪ.tɪd/",
        "wordType": "adj",
        "meaningEn": "brought under human control in order to provide food or companionship",
        "meaningVi": "đã được thuần hóa",
        "example": "Dogs were domesticated early.",
        "exampleVi": "Chó đã được thuần hóa từ rất sớm."
      },
      {
        "word": "biodiversity",
        "phonetic": "/ˌbaɪ.əʊ.daɪˈvɜː.sə.ti/",
        "wordType": "noun",
        "meaningEn": "the number and variety of plants and animals in a particular area",
        "meaningVi": "sự đa dạng sinh học",
        "example": "The jungle has high biodiversity.",
        "exampleVi": "Khu rừng nhiệt đới có tính đa dạng sinh học cao."
      },
      {
        "word": "migration",
        "phonetic": "/maɪˈɡreɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "the travel of groups of animals to a new place seasonally",
        "meaningVi": "sự di cư",
        "example": "Bird migration is seasonal.",
        "exampleVi": "Sự di cư của chim diễn ra theo mùa."
      },
      {
        "word": "camouflage",
        "phonetic": "/ˈkæm.ə.flɑːʒ/",
        "wordType": "noun/verb",
        "meaningEn": "the way that the color or shape of an animal helps it blend in",
        "meaningVi": "sự ngụy trang",
        "example": "Chameleons use camouflage.",
        "exampleVi": "Tắc kè hoa sử dụng sự ngụy trang."
      },
      {
        "word": "nocturnal",
        "phonetic": "/nɒkˈtɜː.nəl/",
        "wordType": "adj",
        "meaningEn": "being active, flying, or feeding at night",
        "meaningVi": "hoạt động về đêm",
        "example": "Bats are nocturnal creatures.",
        "exampleVi": "Dơi là sinh vật hoạt động về đêm."
      },
      {
        "word": "herbivore",
        "phonetic": "/ˈhɜː.bɪ.vɔːr/",
        "wordType": "noun",
        "meaningEn": "an animal that eats only plants",
        "meaningVi": "động vật ăn cỏ",
        "example": "Elephants are large herbivores.",
        "exampleVi": "Voi là loài động vật ăn cỏ lớn."
      },
      {
        "word": "carnivore",
        "phonetic": "/ˈkɑː.nɪ.vɔːr/",
        "wordType": "noun",
        "meaningEn": "an animal that eats meat from other animals",
        "meaningVi": "động vật ăn thịt",
        "example": "Lions and tigers are carnivores.",
        "exampleVi": "Sư tử và hổ là động vật ăn thịt."
      },
      {
        "word": "habitat",
        "phonetic": "/ˈhæb.ɪ.tæt/",
        "wordType": "noun",
        "meaningEn": "the natural environment in which an animal or plant usually lives",
        "meaningVi": "môi trường sống",
        "example": "Deforestation destroys animal habitats.",
        "exampleVi": "Phá rừng làm hủy hoại môi trường sống của động vật."
      },
      {
        "word": "extinction",
        "phonetic": "/ɪkˈstɪŋk.ʃən/",
        "wordType": "noun",
        "meaningEn": "a situation in which a plant or animal stops existing completely",
        "meaningVi": "sự tuyệt chủng",
        "example": "The dinosaurs faced extinction.",
        "exampleVi": "Khủng long đã đối mặt với sự tuyệt chủng."
      },
      {
        "word": "hibernate",
        "phonetic": "/ˈhaɪ.bə.neɪt/",
        "wordType": "verb",
        "meaningEn": "to spend the winter asleep or in an inactive state",
        "meaningVi": "ngủ đông",
        "example": "Bears hibernate during winter.",
        "exampleVi": "Gấu ngủ đông suốt mùa đông."
      },
      {
        "word": "aquatic",
        "phonetic": "/əˈkwæt.ɪk/",
        "wordType": "adj",
        "meaningEn": "living or growing in, happening in, or connected with water",
        "meaningVi": "sống ở dưới nước",
        "example": "Dolphins are aquatic mammals.",
        "exampleVi": "Cá heo là động vật có vú sống dưới nước."
      },
      {
        "word": "amphibian",
        "phonetic": "/æmˈfɪb.i.ən/",
        "wordType": "noun",
        "meaningEn": "an animal that can live both on land and in water",
        "meaningVi": "lớp lưỡng cư",
        "example": "Frogs are the most common amphibians.",
        "exampleVi": "Ếch là loài động vật lưỡng cư phổ biến nhất."
      },
      {
        "word": "vertebrate",
        "phonetic": "/ˈvɜː.tɪ.brət/",
        "wordType": "noun",
        "meaningEn": "an animal that has a backbone or spinal column",
        "meaningVi": "động vật có xương sống",
        "example": "Humans and birds are vertebrates.",
        "exampleVi": "Con người và loài chim là động vật có xương sống."
      },
      {
        "word": "invertebrate",
        "phonetic": "/ɪnˈvɜː.tɪ.brət/",
        "wordType": "noun",
        "meaningEn": "an animal that does not have a backbone",
        "meaningVi": "động vật không xương sống",
        "example": "Insects and jellyfish are invertebrates.",
        "exampleVi": "Côn trùng và sứa là động vật không xương sống."
      },
      {
        "word": "venomous",
        "phonetic": "/ˈven.ə.məs/",
        "wordType": "adj",
        "meaningEn": "producing venom, a toxic substance injected by biting or stinging",
        "meaningVi": "có độc, tiết chất độc",
        "example": "Cobras are highly venomous snakes.",
        "exampleVi": "Rắn hổ mang là loài rắn có độc tính cực cao."
      },
      {
        "word": "plumage",
        "phonetic": "/ˈpluː.mɪdʒ/",
        "wordType": "noun",
        "meaningEn": "a bird's feathers collectively",
        "meaningVi": "bộ lông vũ",
        "example": "The male peacock has magnificent plumage.",
        "exampleVi": "Công đực sở hữu một bộ lông vũ lộng lẫy."
      },
      {
        "word": "ecosystem",
        "phonetic": "/ˈiː.kəʊˌsɪs.təm/",
        "wordType": "noun",
        "meaningEn": "a biological community of interacting organisms and their environment",
        "meaningVi": "hệ sinh thái",
        "example": "The swamp has a delicate ecosystem.",
        "exampleVi": "Đầm lầy có một hệ sinh thái nhạy cảm."
      },
      {
        "word": "organism",
        "phonetic": "/ˈɔː.ɡən.ɪ.zəm/",
        "wordType": "noun",
        "meaningEn": "an individual animal, plant, or single-celled life form",
        "meaningVi": "sinh vật, cơ thể sống",
        "example": "Pond water contains many small organisms.",
        "exampleVi": "Nước ao chứa nhiều sinh vật nhỏ."
      },
      {
        "word": "marsupial",
        "phonetic": "/mɑːˈsuː.pi.əl/",
        "wordType": "noun",
        "meaningEn": "a mammal whose members are born incompletely developed and carried in a pouch",
        "meaningVi": "thú có túi",
        "example": "Kangaroos and koalas are marsupials.",
        "exampleVi": "Kangaroo và gấu túi là động vật có túi."
      },
      {
        "word": "scavenger",
        "phonetic": "/ˈskæv.ɪn.dʒər/",
        "wordType": "noun",
        "meaningEn": "an animal that feeds on carrion, dead plant material, or refuse",
        "meaningVi": "động vật ăn xác thối",
        "example": "Vultures are scavengers that clean up dead animals.",
        "exampleVi": "Kền kền là loài ăn xác thối giúp dọn dẹp các xác động vật."
      },
      {
        "word": "parasite",
        "phonetic": "/ˈpær.ə.saɪt/",
        "wordType": "noun",
        "meaningEn": "an organism that lives in or on an organism of another species",
        "meaningVi": "vật ký sinh, ký sinh trùng",
        "example": "Fleas are common parasites on dogs.",
        "exampleVi": "Bọ chét là ký sinh trùng phổ biến trên loài chó."
      },
      {
        "word": "anthropomorphism",
        "phonetic": "/ˌæn.θrə.pəˈmɔː.fɪ.zəm/",
        "wordType": "noun",
        "meaningEn": "the attribution of human characteristics or behavior to animals or objects",
        "meaningVi": "sự nhân hóa (gán đặc tính người cho động vật)",
        "example": "The anthropomorphism of the animals in the cartoon made them highly relatable.",
        "exampleVi": "Sự nhân hóa các loài động vật trong bộ phim hoạt hình khiến chúng trở nên rất gần gũi."
      },
      {
        "word": "taxidermy",
        "phonetic": "/ˈtæk.sɪ.dɜː.mi/",
        "wordType": "noun",
        "meaningEn": "the art of preparing, stuffing, and mounting the skins of animals for display",
        "meaningVi": "nghệ thuật nhồi bông da động vật",
        "example": "The museum featured an impressive display of Victorian taxidermy.",
        "exampleVi": "Bảo tàng có một khu trưng bày ấn tượng về nghệ thuật nhồi bông thú thời kỳ Victoria."
      },
      {
        "word": "arboreal",
        "phonetic": "/ɑːˈbɔː.ri.əl/",
        "wordType": "adj",
        "meaningEn": "living in or relating to trees",
        "meaningVi": "sống trên cây (thuộc về cây cối)",
        "example": "Monkeys and sloths are examples of highly skilled arboreal creatures.",
        "exampleVi": "Khỉ và lười là những ví dụ về các sinh vật sống trên cây vô cùng khéo léo."
      },
      {
        "word": "gregarious",
        "phonetic": "/ɡrɪˈɡeə.ri.əs/",
        "wordType": "adj",
        "meaningEn": "living in companionable groups or herds; sociable",
        "meaningVi": "sống theo bầy đàn (thích giao du)",
        "example": "Wolves are gregarious animals that rely on their pack for hunting.",
        "exampleVi": "Chó sói là loài động vật sống theo bầy đàn, chúng dựa vào đàn để săn mồi."
      },
      {
        "word": "apex",
        "phonetic": "/ˈeɪ.peks/",
        "wordType": "noun",
        "meaningEn": "the top or highest point, often used to describe predators at the top of the food chain",
        "meaningVi": "đỉnh (đỉnh cao của chuỗi thức ăn)",
        "example": "Lions are considered apex predators because they have no natural enemies.",
        "exampleVi": "Sư tử được coi là loài săn mồi đầu bảng vì chúng không có kẻ thù tự nhiên nào."
      },
      {
        "word": "parasitism",
        "phonetic": "/ˈpær.ə.saɪ.tɪ.zəm/",
        "wordType": "noun",
        "meaningEn": "a relationship between species where one benefits at the expense of the other",
        "meaningVi": "quan hệ ký sinh",
        "example": "Fleas on a dog are a classic example of biological parasitism.",
        "exampleVi": "Bọ chét trên cơ thể chó là một ví dụ điển hình về mối quan hệ ký sinh sinh học."
      },
      {
        "word": "symbiosis",
        "phonetic": "/ˌsɪm.baɪˈəʊ.sɪs/",
        "wordType": "noun",
        "meaningEn": "a mutually beneficial relationship between different people or groups, or different organisms",
        "meaningVi": "sự cộng sinh",
        "example": "The clownfish and sea anemone live in a perfect state of symbiosis.",
        "exampleVi": "Cá hề và hải quỳ sống trong một trạng thái cộng sinh hoàn hảo."
      },
      {
        "word": "feral",
        "phonetic": "/ˈfer.əl/",
        "wordType": "adj",
        "meaningEn": "existing in a wild state, especially after escape from captivity or domestication",
        "meaningVi": "hoang dã (hóa hoang dã từ trạng thái nuôi nuôi)",
        "example": "The island has a large population of feral cats that hunt native birds.",
        "exampleVi": "Hòn đảo này có một số lượng lớn mèo hoang dã săn bắt các loài chim bản địa."
      },
      {
        "word": "bipedal",
        "phonetic": "/baɪˈpiː.dəl/",
        "wordType": "adj",
        "meaningEn": "using only two legs for walking",
        "meaningVi": "đi bằng hai chân",
        "example": "Kangaroos are bipedal animals that hop instead of running.",
        "exampleVi": "Chuột túi là loài động vật đi bằng hai chân, chúng nhảy thay vì chạy."
      },
      {
        "word": "quadrupedal",
        "phonetic": "/ˌkwɒd.ruˈpiː.dəl/",
        "wordType": "adj",
        "meaningEn": "using four limbs for walking",
        "meaningVi": "đi bằng bốn chân",
        "example": "Most terrestrial mammals are quadrupedal, moving on all four legs.",
        "exampleVi": "Hầu hết các loài động vật có vú trên cạn đều đi bằng bốn chân, di chuyển bằng cả bốn chi."
      },
      {
        "word": "monogamous",
        "phonetic": "/məˈnɒɡ.ə.məs/",
        "wordType": "adj",
        "meaningEn": "having only one mate at a time",
        "meaningVi": "một vợ một chồng (đơn phối)",
        "example": "Swans are famous for being monogamous, staying with one partner for life.",
        "exampleVi": "Thiên nga nổi tiếng là loài đơn phối, gắn bó với một bạn đời suốt đời."
      },
      {
        "word": "estivation",
        "phonetic": "/ˌes.tɪˈveɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "prolonged dormancy of an animal during a hot or dry period",
        "meaningVi": "sự ngủ hè (tránh nóng)",
        "example": "Some desert snails enter a state of estivation to survive the intense heat.",
        "exampleVi": "Một số loài ốc sên sa mạc bước vào trạng thái ngủ hè để sống sót qua cái nóng gay gắt."
      },
      {
        "word": "carapace",
        "phonetic": "/ˈkær.ə.peɪs/",
        "wordType": "noun",
        "meaningEn": "the hard upper shell of a turtle, crustacean, or arachnid",
        "meaningVi": "mai, giáp (của rùa, tôm, cua...)",
        "example": "The sea turtle’s tough carapace protects it from shark attacks.",
        "exampleVi": "Cái mai cứng cáp của rùa biển bảo vệ nó khỏi những đợt tấn công của cá mập."
      },
      {
        "word": "cetacean",
        "phonetic": "/sɪˈteɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "a marine mammal of the order Cetacea, such as a whale, dolphin, or porpoise",
        "meaningVi": "loài cá voi (động vật biển có vú bộ Cetacea)",
        "example": "Biologists are studying the complex vocalizations of various cetacean species.",
        "exampleVi": "Các nhà sinh học đang nghiên cứu các âm thanh phức tạp của các loài cá voi khác nhau."
      },
      {
        "word": "piscivorous",
        "phonetic": "/pɪˈsɪv.ər.əs/",
        "wordType": "adj",
        "meaningEn": "feeding on fish",
        "meaningVi": "ăn cá",
        "example": "The osprey is a piscivorous bird of prey with specialized claws for gripping wet fish.",
        "exampleVi": "Chim ưng biển là một loài chim săn mồi ăn cá với bộ móng vuốt chuyên dụng để bám chặt cá ướt."
      },
      {
        "word": "detritivore",
        "phonetic": "/dɪˈtraɪ.tɪ.vɔːr/",
        "wordType": "noun",
        "meaningEn": "an animal that feeds on dead organic material, especially plant detritus",
        "meaningVi": "sinh vật ăn mùn bã hữu cơ",
        "example": "Earthworms act as detritivores, breaking down dead leaves in the soil.",
        "exampleVi": "Giun đất đóng vai trò là sinh vật ăn mùn bã, phân hủy lá chết trong đất."
      },
      {
        "word": "mimicry",
        "phonetic": "/ˈmɪm.ɪ.kri/",
        "wordType": "noun",
        "meaningEn": "the close external resemblance of an animal or plant to another",
        "meaningVi": "sự ngụy trang bắt chước",
        "example": "The harmless king snake uses mimicry to look like the venomous coral snake.",
        "exampleVi": "Loài rắn vua vô hại sử dụng sự bắt chước để trông giống như loài rắn san hô có độc."
      },
      {
        "word": "crustacean",
        "phonetic": "/krʌsˈteɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "an arthropod with a hard shell, including crabs, lobsters, and shrimps",
        "meaningVi": "loài giáp xác",
        "example": "Crabs and lobsters belong to the group of animals known as crustaceans.",
        "exampleVi": "Cua và tôm hùm thuộc nhóm động vật được gọi là động vật giáp xác."
      },
      {
        "word": "bioluminescence",
        "phonetic": "/ˌbaɪ.əʊ.luː.mɪˈnes.əns/",
        "wordType": "noun",
        "meaningEn": "the biochemical emission of light by living organisms such as fireflies",
        "meaningVi": "sự phát quang sinh học",
        "example": "Deep-sea creatures often use bioluminescence to attract prey in the darkness.",
        "exampleVi": "Các sinh vật dưới biển sâu thường sử dụng sự phát quang sinh học để thu hút con mồi trong bóng tối."
      },
      {
        "word": "ruminant",
        "phonetic": "/ˈruː.mɪ.nənt/",
        "wordType": "noun",
        "meaningEn": "a mammal that chews the cud regurgitated from its rumen, like cows or sheep",
        "meaningVi": "động vật nhai lại",
        "example": "Cows, sheep, and deer are common examples of ruminant herbivores.",
        "exampleVi": "Bò, cừu và hươu là những ví dụ phổ biến về động vật nhai lại ăn cỏ."
      },
      {
        "word": "passerine",
        "phonetic": "/ˈpæs.ər.aɪn/",
        "wordType": "noun",
        "meaningEn": "a bird of the order Passeriformes, which includes perching birds and songbirds",
        "meaningVi": "bộ sẻ (các loài chim sẻ/chim đậu)",
        "example": "Sparrows and finches are common passerine birds found in urban areas.",
        "exampleVi": "Chim sẻ và chim sẻ nhỏ là những loài chim thuộc bộ sẻ phổ biến được tìm thấy ở khu vực đô thị."
      },
      {
        "word": "ecdysis",
        "phonetic": "/ˈek.dɪ.sɪs/",
        "wordType": "noun",
        "meaningEn": "the process of shedding the old skin or casting off the outer cuticle (molting)",
        "meaningVi": "sự lột xác",
        "example": "During ecdysis, a snake sheds its entire skin in one single piece.",
        "exampleVi": "Trong quá trình lột xác, con rắn trút bỏ toàn bộ lớp da của nó thành một mảnh duy nhất."
      },
      {
        "word": "benthic",
        "phonetic": "/ˈben.θɪk/",
        "wordType": "adj",
        "meaningEn": "relating to, or occurring at the bottom of a body of water",
        "meaningVi": "thuộc về đáy biển (hoặc đáy hồ)",
        "example": "Starfish and sea cucumbers are classic examples of benthic organisms.",
        "exampleVi": "Sao biển và dưa chuột biển là những ví dụ điển hình về sinh vật sống ở đáy nước."
      },
      {
        "word": "altricial",
        "phonetic": "/ælˈtrɪʃ.əl/",
        "wordType": "adj",
        "meaningEn": "hatched or born in an undeveloped state and requiring care and feeding by the parents",
        "meaningVi": "yếu ớt khi mới sinh (cần sự chăm sóc lớn từ bố mẹ)",
        "example": "Songbird chicks are altricial, born blind, featherless, and helpless.",
        "exampleVi": "Chim non của các loài chim hót là loài yếu ớt khi mới sinh, chúng sinh ra bị mù, không có lông và bất lực."
      },
      {
        "word": "precocial",
        "phonetic": "/prɪˈkəʊ.ʃəl/",
        "wordType": "adj",
        "meaningEn": "hatched or born in an advanced state and able to feed itself almost immediately",
        "meaningVi": "tự lập sớm khi mới sinh (có thể tự di chuyển/ăn uống ngay)",
        "example": "Ducklings are precocial, ready to swim and forage shortly after hatching.",
        "exampleVi": "Vịt con là loài tự lập sớm khi mới sinh, sẵn sàng bơi và kiếm ăn ngay sau khi nở."
      },
      {
        "word": "molt",
        "phonetic": "/məʊlt/",
        "wordType": "verb",
        "meaningEn": "shed old feathers, hair, or skin, to make way for a new growth",
        "meaningVi": "thay lông (hoặc lột da)",
        "example": "Birds usually molt their worn-out feathers once or twice a year.",
        "exampleVi": "Chim thường thay những chiếc lông xơ xác của chúng một hoặc hai lần một năm."
      },
      {
        "word": "canid",
        "phonetic": "/ˈkæn.ɪd/",
        "wordType": "noun",
        "meaningEn": "a mammal of the dog family (Canidae)",
        "meaningVi": "động vật họ chó",
        "example": "Wolves, foxes, and jackals are all members of the canid family.",
        "exampleVi": "Chó sói, cáo và chó rừng đều là thành viên của họ chó."
      },
      {
        "word": "felid",
        "phonetic": "/ˈfeɪ.lɪd/",
        "wordType": "noun",
        "meaningEn": "a mammal of the cat family (Felidae)",
        "meaningVi": "động vật họ mèo",
        "example": "The tiger is the largest felid species currently living on Earth.",
        "exampleVi": "Hổ là loài động vật họ mèo lớn nhất hiện đang sống trên Trái Đất."
      },
      {
        "word": "ungulate",
        "phonetic": "/ˈʌŋ.ɡjə.lət/",
        "wordType": "noun",
        "meaningEn": "a hoofed mammal",
        "meaningVi": "động vật có móng guốc",
        "example": "Horses, deer, and giraffes are classified as ungulates because they have hooves.",
        "exampleVi": "Ngựa, hươu và hươu cao cổ được xếp vào loại động vật có móng guốc vì chúng có móng."
      },
      {
        "word": "zoonosis",
        "phonetic": "/ˌzəʊ.əˈnəʊ.sɪs/",
        "wordType": "noun",
        "meaningEn": "a disease which can be transmitted to humans from animals",
        "meaningVi": "bệnh truyền lây từ động vật sang người",
        "example": "Rabies is a well-known zoonosis spread through animal bites.",
        "exampleVi": "Bệnh dại là một bệnh lây từ động vật sang người nổi tiếng, lây lan qua vết cắn của động vật."
      },
      {
        "word": "endemic",
        "phonetic": "/enˈdem.ɪk/",
        "wordType": "adj",
        "meaningEn": "native or restricted to a certain country or area",
        "meaningVi": "đặc hữu (chỉ có ở một vùng)",
        "example": "The lemur is endemic to the island of Madagascar.",
        "exampleVi": "Vượn cáo là loài đặc hữu của đảo Madagascar."
      },
      {
        "word": "avian",
        "phonetic": "/ˈeɪ.vi.ən/",
        "wordType": "adj",
        "meaningEn": "relating to birds",
        "meaningVi": "thuộc về loài chim",
        "example": "Scientists are monitoring the flyways of various avian species.",
        "exampleVi": "Các nhà khoa học đang theo dõi đường bay của các loài chim khác nhau."
      },
      {
        "word": "insectivore",
        "phonetic": "/ɪnˈsek.tɪ.vɔːr/",
        "wordType": "noun",
        "meaningEn": "an animal that feeds on insects",
        "meaningVi": "động vật ăn côn trùng",
        "example": "The hedgehog is a small nocturnal insectivore.",
        "exampleVi": "Nhím là một loài động vật ăn côn trùng nhỏ hoạt động về đêm."
      },
      {
        "word": "pachyderm",
        "phonetic": "/ˈpæk.ɪ.dɜːm/",
        "wordType": "noun",
        "meaningEn": "a very large mammal with thick skin, especially an elephant, rhinoceros, or hippopotamus",
        "meaningVi": "động vật da dày",
        "example": "The African elephant is the largest living land pachyderm.",
        "exampleVi": "Voi châu Phi là loài động vật da dày trên cạn lớn nhất còn sống."
      },
      {
        "word": "raptor",
        "phonetic": "/ˈræp.tər/",
        "wordType": "noun",
        "meaningEn": "a bird of prey, such as an eagle, hawk, or owl",
        "meaningVi": "chim săn mồi",
        "example": "The sanctuary is dedicated to rehabilitating injured raptors.",
        "exampleVi": "Khu bảo tồn chuyên phục hồi chức năng cho những loài chim săn mồi bị thương."
      },
      {
        "word": "morphology",
        "phonetic": "/mɔːˈfɒl.ə.dʒi/",
        "wordType": "noun",
        "meaningEn": "the study of the forms and structures of organisms",
        "meaningVi": "hình thái học (sinh học)",
        "example": "The morphology of the bird's beak determines the kind of food it can eat.",
        "exampleVi": "Hình thái học mỏ của loài chim quyết định loại thức ăn mà nó có thể ăn."
      },
      {
        "word": "monotreme",
        "phonetic": "/ˈmɒn.ə.triːm/",
        "wordType": "noun",
        "meaningEn": "a primitive mammal that lays eggs, such as the platypus",
        "meaningVi": "thú đơn huyệt (thú đẻ trứng)",
        "example": "The duck-billed platypus is a unique monotreme native to eastern Australia.",
        "exampleVi": "Thú mỏ vịt là một loài thú đơn huyệt độc đáo có nguồn gốc từ miền đông nước Úc."
      },
      {
        "word": "frugivore",
        "phonetic": "/ˈfruː.dʒɪ.vɔːr/",
        "wordType": "noun",
        "meaningEn": "an animal that feeds on fruit",
        "meaningVi": "động vật ăn quả (ăn trái cây)",
        "example": "Many bat species are frugivores that play a vital role in seed dispersal.",
        "exampleVi": "Nhiều loài dơi là động vật ăn quả đóng vai trò quan trọng trong việc phát tán hạt giống."
      },
      {
        "word": "baleen",
        "phonetic": "/bəˈliːn/",
        "wordType": "noun",
        "meaningEn": "the whalebone plates in the mouth of baleen whales used to filter krill",
        "meaningVi": "tấm sừng hàm (ở cá voi tấm sừng)",
        "example": "The blue whale uses its baleen to strain tiny krill from seawater.",
        "exampleVi": "Cá voi xanh sử dụng tấm sừng hàm của mình để lọc loài nhuyễn thể nhỏ từ nước biển."
      },
      {
        "word": "crepuscular",
        "phonetic": "/krɪˈpʌs.kjə.lər/",
        "wordType": "adj",
        "meaningEn": "active primarily during the twilight hours of dawn and dusk",
        "meaningVi": "hoạt động lúc hoàng hôn hoặc bình minh",
        "example": "Deer are crepuscular animals, meaning they are most active during dawn and dusk.",
        "exampleVi": "Hươu là loài động vật hoạt động lúc bình minh/hoàng hôn, nghĩa là chúng hoạt động mạnh nhất trong các khoảng thời gian này."
      },
      {
        "word": "echolocation",
        "phonetic": "/ˌek.əʊ.ləʊˈkeɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "the location of objects by reflected sound, used by animals such as dolphins and bats",
        "meaningVi": "sự định vị bằng tiếng vang",
        "example": "Bats use echolocation to navigate and hunt in total darkness.",
        "exampleVi": "Dơi sử dụng sự định vị bằng tiếng vang để điều hướng và săn mồi trong bóng tối hoàn toàn."
      },
      {
        "word": "hatchling",
        "phonetic": "/ˈhætʃ.lɪŋ/",
        "wordType": "noun",
        "meaningEn": "a newly hatched animal",
        "meaningVi": "con non mới nở",
        "example": "The tiny turtle hatchlings made their way safely to the ocean.",
        "exampleVi": "Những chú rùa con mới nở nhỏ bé đã di chuyển an toàn ra đại dương."
      },
      {
        "word": "mustelid",
        "phonetic": "/ˈmʌs.tə.lɪd/",
        "wordType": "noun",
        "meaningEn": "a mammal of the weasel family (Mustelidae), such as otters or badgers",
        "meaningVi": "động vật họ chồn",
        "example": "Otters are clever mustelids that are highly adapted to aquatic life.",
        "exampleVi": "Rái cá là loài thuộc họ chồn thông minh và thích nghi cao với cuộc sống dưới nước."
      },
      {
        "word": "venom",
        "phonetic": "/ˈven.əm/",
        "wordType": "noun",
        "meaningEn": "a toxic substance secreted by animals like snakes or spiders",
        "meaningVi": "nọc độc (của động vật tự tiết ra)",
        "example": "The snake injects its deadly venom through its hollow fangs.",
        "exampleVi": "Con rắn tiêm nọc độc chết người của nó thông qua những chiếc răng nanh rỗng."
      },
      {
        "word": "keystone",
        "phonetic": "/ˈkiː.stəʊn/",
        "wordType": "adj",
        "meaningEn": "describing a species on which other species in an ecosystem largely depend",
        "meaningVi": "loài chủ chốt (trong hệ sinh thái)",
        "example": "Sea otters are a keystone species that maintains the health of kelp forests.",
        "exampleVi": "Rái cá biển là loài loài chủ chốt giúp duy trì sức khỏe của những cánh rừng tảo bẹ."
      }
    ]
  },
  {
    "id": "jobs",
    "title": "Việc làm & Nghề nghiệp (Jobs & Occupations)",
    "desc": "Từ vựng về các vị trí công việc, hoạt động công sở và cơ hội nghề nghiệp.",
    "color": "border-amber-200 bg-amber-50/50 text-amber-800 hover:border-amber-400 dark:bg-slate-900/50 dark:border-slate-800 dark:text-amber-400",
    "beginner": [
      {
        "word": "teacher",
        "phonetic": "/ˈtiː.tʃər/",
        "wordType": "noun",
        "meaningEn": "someone whose job is to teach in a school or college",
        "meaningVi": "giáo viên",
        "example": "She is a high school teacher.",
        "exampleVi": "Cô ấy là giáo viên cấp ba."
      },
      {
        "word": "doctor",
        "phonetic": "/ˈdɒk.tər/",
        "wordType": "noun",
        "meaningEn": "a person with a medical degree whose job is to treat sick people",
        "meaningVi": "bác sĩ",
        "example": "The doctor examined the child.",
        "exampleVi": "Bác sĩ đã khám cho đứa trẻ."
      },
      {
        "word": "nurse",
        "phonetic": "/nɜːs/",
        "wordType": "noun",
        "meaningEn": "a person whose job is to care for people who are ill or injured",
        "meaningVi": "y tá",
        "example": "The nurse works at the clinic.",
        "exampleVi": "Y tá làm việc tại phòng khám."
      },
      {
        "word": "police officer",
        "phonetic": "/pəˈliːs ˌɒf.ɪ.sər/",
        "wordType": "noun",
        "meaningEn": "a member of the police force",
        "meaningVi": "nhân viên cảnh sát",
        "example": "A police officer stopped the car.",
        "exampleVi": "Một cảnh sát đã chặn chiếc xe lại."
      },
      {
        "word": "chef",
        "phonetic": "/ʃef/",
        "wordType": "noun",
        "meaningEn": "a skilled and trained cook who works in a hotel or restaurant",
        "meaningVi": "đầu bếp trưởng",
        "example": "The chef prepared a steak.",
        "exampleVi": "Đầu bếp đã chuẩn bị món bít tết."
      },
      {
        "word": "driver",
        "phonetic": "/ˈdraɪ.vər/",
        "wordType": "noun",
        "meaningEn": "someone who drives a vehicle",
        "meaningVi": "tài xế, người lái xe",
        "example": "Our taxi driver was very nice.",
        "exampleVi": "Tài xế taxi của chúng tôi rất tốt bụng."
      },
      {
        "word": "farmer",
        "phonetic": "/ˈfɑː.mər/",
        "wordType": "noun",
        "meaningEn": "someone who owns or manages a farm",
        "meaningVi": "nông dân",
        "example": "The farmer grows vegetables.",
        "exampleVi": "Người nông dân trồng rau củ."
      },
      {
        "word": "student",
        "phonetic": "/ˈstjuː.dənt/",
        "wordType": "noun",
        "meaningEn": "a person who is learning at a college or university",
        "meaningVi": "học sinh, sinh viên",
        "example": "He is a college student.",
        "exampleVi": "Cậu ấy là một sinh viên đại học."
      },
      {
        "word": "singer",
        "phonetic": "/ˈsɪŋ.ər/",
        "wordType": "noun",
        "meaningEn": "a person who sings, especially professionally",
        "meaningVi": "ca sĩ",
        "example": "She is a famous pop singer.",
        "exampleVi": "Cô ấy là một ca sĩ nhạc pop nổi tiếng."
      },
      {
        "word": "writer",
        "phonetic": "/ˈraɪ.tər/",
        "wordType": "noun",
        "meaningEn": "a person who writes books, stories, or articles",
        "meaningVi": "nhà văn",
        "example": "He wants to be a writer.",
        "exampleVi": "Anh ấy muốn trở thành một nhà văn."
      },
      {
        "word": "baker",
        "phonetic": "/ˈbəɪ.kər/",
        "wordType": "noun",
        "meaningEn": "a person who bakes and sells bread, cakes, etc.",
        "meaningVi": "thợ làm bánh",
        "example": "The baker makes fresh bread.",
        "exampleVi": "Thợ làm bánh làm ra bánh mì tươi."
      },
      {
        "word": "actor",
        "phonetic": "/ˈæk.tər/",
        "wordType": "noun",
        "meaningEn": "someone who performs in a play, movie, or television show",
        "meaningVi": "diễn viên",
        "example": "He is a talented young actor.",
        "exampleVi": "Anh ấy là một diễn viên trẻ tài năng."
      },
      {
        "word": "artist",
        "phonetic": "/ˈɑː.tɪst/",
        "wordType": "noun",
        "meaningEn": "someone who paints, draws, or makes sculptures",
        "meaningVi": "họa sĩ, nghệ sĩ",
        "example": "She is a talented landscape artist.",
        "exampleVi": "Cô ấy là một họa sĩ vẽ phong cảnh tài năng."
      },
      {
        "word": "dentist",
        "phonetic": "/ˈden.tɪst/",
        "wordType": "noun",
        "meaningEn": "a person whose job is to care for people's teeth",
        "meaningVi": "nha sĩ",
        "example": "I need to visit the dentist.",
        "exampleVi": "Tôi cần phải đi khám nha sĩ."
      },
      {
        "word": "pilot",
        "phonetic": "/ˈpaɪ.lət/",
        "wordType": "noun",
        "meaningEn": "a person who flies an aircraft",
        "meaningVi": "phi công",
        "example": "The pilot flew the plane safely.",
        "exampleVi": "Phi công đã lái máy bay an toàn."
      },
      {
        "word": "engineer",
        "phonetic": "/ˌen.dʒɪˈnɪər/",
        "wordType": "noun",
        "meaningEn": "a person who designs, builds, or maintains engines, machines, or public works",
        "meaningVi": "kỹ sư",
        "example": "Software engineers build apps.",
        "exampleVi": "Kỹ sư phần mềm xây dựng các ứng dụng."
      },
      {
        "word": "lawyer",
        "phonetic": "/ˈlɔɪ.ər/",
        "wordType": "noun",
        "meaningEn": "a person who practices or studies law; an attorney",
        "meaningVi": "luật sư",
        "example": "You should consult a lawyer.",
        "exampleVi": "Bạn nên tham khảo ý kiến của luật sư."
      },
      {
        "word": "soldier",
        "phonetic": "/ˈsəʊl.dʒər/",
        "wordType": "noun",
        "meaningEn": "a person who serves in an army",
        "meaningVi": "quân nhân, người lính",
        "example": "The brave soldier protected the border.",
        "exampleVi": "Người lính dũng cảm đã bảo vệ biên giới."
      },
      {
        "word": "reporter",
        "phonetic": "/rɪˈpɔː.tər/",
        "wordType": "noun",
        "meaningEn": "a person who reports news or conducts interviews for newspapers or TV",
        "meaningVi": "phóng viên",
        "example": "The news reporter interviewed the mayor.",
        "exampleVi": "Phóng viên tin tức đã phỏng vấn thị trưởng."
      },
      {
        "word": "firefighter",
        "phonetic": "/ˈfaɪəˌfaɪ.tər/",
        "wordType": "noun",
        "meaningEn": "a person whose job is to extinguish fires",
        "meaningVi": "lính cứu hỏa",
        "example": "Firefighters rescued the cat from the tree.",
        "exampleVi": "Những người lính cứu hỏa đã cứu chú mèo từ trên cây."
      },
      {
        "word": "waiter",
        "phonetic": "/ˈweɪ.tər/",
        "wordType": "noun",
        "meaningEn": "a man whose job is to serve customers at their tables in a restaurant",
        "meaningVi": "nam phục vụ bàn",
        "example": "The waiter brought our drinks.",
        "exampleVi": "Người phục vụ bàn đã mang đồ uống của chúng tôi lên."
      },
      {
        "word": "clerk",
        "phonetic": "/klɑːk/",
        "wordType": "noun",
        "meaningEn": "a person employed in an office or bank to keep records and accounts",
        "meaningVi": "nhân viên bán hàng, nhân viên văn phòng",
        "example": "The bank clerk processed the transaction.",
        "exampleVi": "Nhân viên ngân hàng đã xử lý giao dịch."
      },
      {
        "word": "mechanic",
        "phonetic": "/məˈkæn.ɪk/",
        "wordType": "noun",
        "meaningEn": "a person who repairs and maintains machinery",
        "meaningVi": "thợ cơ khí, thợ sửa xe",
        "example": "Ask the mechanic to check the brakes.",
        "exampleVi": "Hãy bảo người thợ sửa xe kiểm tra phanh."
      },
      {
        "word": "carpenter",
        "phonetic": "/ˈkɑː.pɪn.tər/",
        "wordType": "noun",
        "meaningEn": "a person who makes and repairs wooden objects and structures",
        "meaningVi": "thợ mộc",
        "example": "The carpenter made this wooden table.",
        "exampleVi": "Người thợ mộc đã làm ra chiếc bàn gỗ này."
      },
      {
        "word": "cleaner",
        "phonetic": "/ˈkliː.nər/",
        "wordType": "noun",
        "meaningEn": "a person employed to clean premises",
        "meaningVi": "nhân viên dọn dẹp",
        "example": "The office cleaner works in the evening.",
        "exampleVi": "Nhân viên dọn dẹp văn phòng làm việc vào buổi tối."
      },
      {
        "word": "job",
        "phonetic": "/dʒɒb/",
        "wordType": "noun",
        "meaningEn": "The regular work that a person does to earn money.",
        "meaningVi": "Công việc, việc làm",
        "example": "She is looking for a new job in the city.",
        "exampleVi": "Cô ấy đang tìm kiếm một công việc mới ở thành phố."
      },
      {
        "word": "work",
        "phonetic": "/wɜːk/",
        "wordType": "verb",
        "meaningEn": "To do a job or activity that uses effort, usually for money.",
        "meaningVi": "Làm việc",
        "example": "I work from Monday to Friday.",
        "exampleVi": "Tôi làm việc từ thứ Hai đến thứ Sáu."
      },
      {
        "word": "boss",
        "phonetic": "/bɒs/",
        "wordType": "noun",
        "meaningEn": "The person who is in charge of an organization or department.",
        "meaningVi": "Sếp, cấp trên",
        "example": "My boss is very friendly and helpful.",
        "exampleVi": "Sếp của tôi rất thân thiện và hay giúp đỡ."
      },
      {
        "word": "office",
        "phonetic": "/ˈɒf.ɪs/",
        "wordType": "noun",
        "meaningEn": "A room or building where people work at desks.",
        "meaningVi": "Văn phòng",
        "example": "He goes to the office at 8 AM every morning.",
        "exampleVi": "Anh ấy đến văn phòng lúc 8 giờ mỗi sáng."
      },
      {
        "word": "staff",
        "phonetic": "/stɑːf/",
        "wordType": "noun",
        "meaningEn": "The group of people who work for an organization.",
        "meaningVi": "Nhân viên, đội ngũ nhân viên",
        "example": "The hotel staff were very polite to the guests.",
        "exampleVi": "Nhân viên khách sạn rất lịch sự với khách hàng."
      },
      {
        "word": "team",
        "phonetic": "/tiːm/",
        "wordType": "noun",
        "meaningEn": "A group of people who work together to do something.",
        "meaningVi": "Đội, nhóm",
        "example": "We have a great team at work.",
        "exampleVi": "Chúng tôi có một đội ngũ tuyệt vời tại nơi làm việc."
      },
      {
        "word": "busy",
        "phonetic": "/ˈbɪz.i/",
        "wordType": "adjective",
        "meaningEn": "Having a lot of things to do.",
        "meaningVi": "Bận rộn",
        "example": "I am very busy with my school project today.",
        "exampleVi": "Hôm nay tôi rất bận rộn với dự án ở trường."
      },
      {
        "word": "salary",
        "phonetic": "/ˈsæl.ər.i/",
        "wordType": "noun",
        "meaningEn": "The money you get paid every month for doing your job.",
        "meaningVi": "Lương tháng",
        "example": "She gets a good salary from her company.",
        "exampleVi": "Cô ấy nhận được mức lương tốt từ công ty của mình."
      },
      {
        "word": "meeting",
        "phonetic": "/ˈmiː.tɪŋ/",
        "wordType": "noun",
        "meaningEn": "An event where people come together to talk about something.",
        "meaningVi": "Cuộc họp",
        "example": "We have a weekly meeting on Monday morning.",
        "exampleVi": "Chúng tôi có một cuộc họp hàng tuần vào sáng thứ Hai."
      },
      {
        "word": "company",
        "phonetic": "/ˈkʌm.pə.ni/",
        "wordType": "noun",
        "meaningEn": "An organization that sells goods or services to make money.",
        "meaningVi": "Công ty",
        "example": "My brother works for a technology company.",
        "exampleVi": "Anh trai tôi làm việc cho một công ty công nghệ."
      },
      {
        "word": "manager",
        "phonetic": "/ˈmæn.ɪ.dʒər/",
        "wordType": "noun",
        "meaningEn": "A person who controls or organizes a business or department.",
        "meaningVi": "Quản lý",
        "example": "The manager helped us solve the customer's problem.",
        "exampleVi": "Người quản lý đã giúp chúng tôi giải quyết vấn đề của khách hàng."
      },
      {
        "word": "assistant",
        "phonetic": "/əˈsɪs.tənt/",
        "wordType": "noun",
        "meaningEn": "A person who helps someone in a higher position.",
        "meaningVi": "Trợ lý",
        "example": "She works as a personal assistant to the director.",
        "exampleVi": "Cô ấy làm trợ lý cá nhân cho giám đốc."
      },
      {
        "word": "business",
        "phonetic": "/ˈbɪz.nɪs/",
        "wordType": "noun",
        "meaningEn": "The activity of buying and selling goods and services.",
        "meaningVi": "Kinh doanh, doanh nghiệp",
        "example": "My father started his own business ten years ago.",
        "exampleVi": "Bố tôi đã bắt đầu công việc kinh doanh riêng của mình mười năm trước."
      },
      {
        "word": "career",
        "phonetic": "/kəˈrɪər/",
        "wordType": "noun",
        "meaningEn": "A job or profession that you do for a long period of your life.",
        "meaningVi": "Sự nghiệp",
        "example": "He wants to have a career in teaching.",
        "exampleVi": "Anh ấy muốn có một sự nghiệp trong ngành dạy học."
      },
      {
        "word": "hire",
        "phonetic": "/haɪər/",
        "wordType": "verb",
        "meaningEn": "To give someone a job.",
        "meaningVi": "Thuê, tuyển dụng",
        "example": "The company wants to hire new workers next month.",
        "exampleVi": "Công ty muốn tuyển dụng thêm công nhân mới vào tháng tới."
      },
      {
        "word": "fire",
        "phonetic": "/faɪər/",
        "wordType": "verb",
        "meaningEn": "To tell someone they must leave their job.",
        "meaningVi": "Sa thải, đuổi việc",
        "example": "He was fired because he was always late.",
        "exampleVi": "Anh ấy bị sa thải vì luôn đi muộn."
      },
      {
        "word": "desk",
        "phonetic": "/desk/",
        "wordType": "noun",
        "meaningEn": "A type of table that you sit at to write or work.",
        "meaningVi": "Bàn làm việc",
        "example": "There is a computer and some papers on my desk.",
        "exampleVi": "Có một chiếc máy tính và một vài tờ giấy trên bàn làm việc của tôi."
      },
      {
        "word": "worker",
        "phonetic": "/ˈwɜː.kər/",
        "wordType": "noun",
        "meaningEn": "A person who does a job, especially manual or office work.",
        "meaningVi": "Công nhân, người lao động",
        "example": "The factory has over one hundred workers.",
        "exampleVi": "Nhà máy có hơn một trăm công nhân."
      },
      {
        "word": "customer",
        "phonetic": "/ˈkʌs.tə.mər/",
        "wordType": "noun",
        "meaningEn": "A person who buys goods or services from a shop or business.",
        "meaningVi": "Khách hàng",
        "example": "We must always be polite to our customers.",
        "exampleVi": "Chúng ta phải luôn lịch sự với khách hàng của mình."
      },
      {
        "word": "client",
        "phonetic": "/ˈklaɪ.ənt/",
        "wordType": "noun",
        "meaningEn": "A person who uses the professional services of a company.",
        "meaningVi": "Khách hàng (sử dụng dịch vụ)",
        "example": "The lawyer is meeting a new client this afternoon.",
        "exampleVi": "Luật sư sẽ gặp một khách hàng mới vào chiều nay."
      },
      {
        "word": "uniform",
        "phonetic": "/ˈjuː.nɪ.fɔːm/",
        "wordType": "noun",
        "meaningEn": "A special set of clothes that people wear for work.",
        "meaningVi": "Đồng phục",
        "example": "The police officer must wear a blue uniform.",
        "exampleVi": "Cảnh sát phải mặc một bộ đồng phục màu xanh."
      },
      {
        "word": "factory",
        "phonetic": "/ˈfæk.tər.i/",
        "wordType": "noun",
        "meaningEn": "A building where things are made using machines.",
        "meaningVi": "Nhà máy, xí nghiệp",
        "example": "This factory makes parts for cars.",
        "exampleVi": "Nhà máy này sản xuất phụ tùng cho ô tô."
      },
      {
        "word": "shop",
        "phonetic": "/ʃɒp/",
        "wordType": "noun",
        "meaningEn": "A place where you can buy goods or services.",
        "meaningVi": "Cửa hàng",
        "example": "She works in a small flower shop.",
        "exampleVi": "Cô ấy làm việc trong một cửa hàng hoa nhỏ."
      },
      {
        "word": "skill",
        "phonetic": "/skɪl/",
        "wordType": "noun",
        "meaningEn": "An ability to do something well because you have learned and practiced it.",
        "meaningVi": "Kỹ năng",
        "example": "Computer skills are very important for this job.",
        "exampleVi": "Kỹ năng máy tính rất quan trọng đối với công việc này."
      },
      {
        "word": "plan",
        "phonetic": "/plæn/",
        "wordType": "noun",
        "meaningEn": "An arrangement or decision about what you are going to do.",
        "meaningVi": "Kế hoạch",
        "example": "We need a good plan to finish the project on time.",
        "exampleVi": "Chúng ta cần một kế hoạch tốt để hoàn thành dự án đúng hạn."
      },
      {
        "word": "project",
        "phonetic": "/ˈprɒdʒ.ekt/",
        "wordType": "noun",
        "meaningEn": "A piece of planned work that is done over a period of time.",
        "meaningVi": "Dự án",
        "example": "Our team is working on a new marketing project.",
        "exampleVi": "Đội của chúng tôi đang làm việc cho một dự án tiếp thị mới."
      },
      {
        "word": "earn",
        "phonetic": "/ɜːn/",
        "wordType": "verb",
        "meaningEn": "To get money for doing work.",
        "meaningVi": "Kiếm tiền",
        "example": "How much does a doctor earn per year?",
        "exampleVi": "Một bác sĩ kiếm được bao nhiêu tiền mỗi năm?"
      },
      {
        "word": "pay",
        "phonetic": "/peɪ/",
        "wordType": "verb",
        "meaningEn": "To give someone money for work, services, or goods.",
        "meaningVi": "Thanh toán, trả tiền",
        "example": "The company will pay for your travel costs.",
        "exampleVi": "Công ty sẽ trả chi phí đi lại cho bạn."
      },
      {
        "word": "task",
        "phonetic": "/tɑːsk/",
        "wordType": "noun",
        "meaningEn": "A piece of work that needs to be done.",
        "meaningVi": "Nhiệm vụ, tác vụ",
        "example": "My first task of the day is to check my emails.",
        "exampleVi": "Nhiệm vụ đầu tiên trong ngày của tôi là kiểm tra email."
      },
      {
        "word": "interview",
        "phonetic": "/ˈɪn.tə.vjuː/",
        "wordType": "noun",
        "meaningEn": "A formal meeting where someone is asked questions to see if they are suitable for a job.",
        "meaningVi": "Cuộc phỏng vấn",
        "example": "I have a job interview tomorrow morning.",
        "exampleVi": "Tôi có một cuộc phỏng vấn xin việc vào sáng mai."
      },
      {
        "word": "resume",
        "phonetic": "/ˈrez.juː.meɪ/",
        "wordType": "noun",
        "meaningEn": "A document describing your education and work experience for a job.",
        "meaningVi": "Sơ yếu lý lịch, CV",
        "example": "Please send us your resume and a cover letter.",
        "exampleVi": "Vui lòng gửi cho chúng tôi sơ yếu lý lịch và thư xin việc của bạn."
      },
      {
        "word": "apply",
        "phonetic": "/əˈplaɪ/",
        "wordType": "verb",
        "meaningEn": "To make a formal request, usually in writing, for a job.",
        "meaningVi": "Ứng tuyển, nộp đơn",
        "example": "I want to apply for the position of sales assistant.",
        "exampleVi": "Tôi muốn ứng tuyển vào vị trí trợ lý bán hàng."
      },
      {
        "word": "break",
        "phonetic": "/breɪk/",
        "wordType": "noun",
        "meaningEn": "A short period of time when you stop working to rest or eat.",
        "meaningVi": "Giờ nghỉ giải lao",
        "example": "Let’s take a ten-minute coffee break.",
        "exampleVi": "Chúng ta hãy nghỉ giải lao uống cà phê mười phút nhé."
      },
      {
        "word": "hour",
        "phonetic": "/aʊər/",
        "wordType": "noun",
        "meaningEn": "A period of 60 minutes, often used to measure work time.",
        "meaningVi": "Giờ làm việc",
        "example": "What are your working hours at the company?",
        "exampleVi": "Giờ làm việc của bạn ở công ty là gì?"
      },
      {
        "word": "part-time",
        "phonetic": "/ˌpɑːtˈtaɪm/",
        "wordType": "adjective",
        "meaningEn": "Working for only some of the hours of the week.",
        "meaningVi": "Bán thời gian",
        "example": "She has a part-time job as a library helper.",
        "exampleVi": "Cô ấy có một công việc bán thời gian làm trợ giúp ở thư viện."
      },
      {
        "word": "full-time",
        "phonetic": "/ˌfʊlˈtaɪm/",
        "wordType": "adjective",
        "meaningEn": "Working the whole number of hours in a standard work week.",
        "meaningVi": "Toàn thời gian",
        "example": "He found a full-time job after graduating.",
        "exampleVi": "Anh ấy đã tìm được một công việc toàn thời gian sau khi tốt nghiệp."
      },
      {
        "word": "owner",
        "phonetic": "/ˈəʊ.nər/",
        "wordType": "noun",
        "meaningEn": "A person who owns a business or property.",
        "meaningVi": "Chủ sở hữu",
        "example": "She is the owner of a small coffee shop.",
        "exampleVi": "Cô ấy là chủ sở hữu của một quán cà phê nhỏ."
      },
      {
        "word": "cashier",
        "phonetic": "/kæˈʃɪər/",
        "wordType": "noun",
        "meaningEn": "A person whose job is to receive and pay out money in a shop.",
        "meaningVi": "Thu ngân",
        "example": "The cashier gave me the change and a receipt.",
        "exampleVi": "Thu ngân đã đưa cho tôi tiền thừa và hóa đơn."
      },
      {
        "word": "guard",
        "phonetic": "/ɡɑːd/",
        "wordType": "noun",
        "meaningEn": "A person whose job is to protect a place or people.",
        "meaningVi": "Bảo vệ",
        "example": "A security guard is standing at the entrance.",
        "exampleVi": "Một nhân viên bảo vệ đang đứng ở lối vào."
      },
      {
        "word": "receptionist",
        "phonetic": "/rɪˈsep.ʃən.ɪst/",
        "wordType": "noun",
        "meaningEn": "A person who greets visitors and answers the phone in an office.",
        "meaningVi": "Nhân viên lễ tân",
        "example": "The receptionist told me where to find the meeting room.",
        "exampleVi": "Nhân viên lễ tân đã bảo tôi nơi tìm phòng họp."
      },
      {
        "word": "secretary",
        "phonetic": "/ˈsek.rə.tər.i/",
        "wordType": "noun",
        "meaningEn": "A person who works in an office writing letters and organizing information.",
        "meaningVi": "Thư ký",
        "example": "The secretary is typing an important letter.",
        "exampleVi": "Thư ký đang gõ một bức thư quan trọng."
      },
      {
        "word": "retire",
        "phonetic": "/rɪˈtaɪər/",
        "wordType": "verb",
        "meaningEn": "To stop working because you have reached a certain age.",
        "meaningVi": "Nghỉ hưu",
        "example": "My grandfather plans to retire next year.",
        "exampleVi": "Ông tôi có kế hoạch nghỉ hưu vào năm tới."
      },
      {
        "word": "quit",
        "phonetic": "/kwɪt/",
        "wordType": "verb",
        "meaningEn": "To leave your job permanently.",
        "meaningVi": "Nghỉ việc, bỏ việc",
        "example": "He decided to quit his job and travel the world.",
        "exampleVi": "Anh ấy quyết định nghỉ việc và đi du lịch thế giới."
      },
      {
        "word": "unemployed",
        "phonetic": "/ˌʌn.ɪmˈplɔɪd/",
        "wordType": "adjective",
        "meaningEn": "Without a job, although you want to have one.",
        "meaningVi": "Thất nghiệp",
        "example": "He has been unemployed for three months.",
        "exampleVi": "Anh ấy đã bị thất nghiệp ba tháng nay."
      },
      {
        "word": "labor",
        "phonetic": "/ˈleɪ.bər/",
        "wordType": "noun",
        "meaningEn": "Practical work, especially work that involves physical effort.",
        "meaningVi": "Lao động",
        "example": "Manual labor can be very tiring.",
        "exampleVi": "Lao động chân tay có thể rất mệt mỏi."
      }
    ],
    "advanced": [
      {
        "word": "entrepreneur",
        "phonetic": "/ˌɒn.trə.prəˈnɜːr/",
        "wordType": "noun",
        "meaningEn": "someone who starts their own business with financial risk",
        "meaningVi": "nhà khởi nghiệp, doanh nhân",
        "example": "She is a successful entrepreneur.",
        "exampleVi": "Cô ấy là một nhà khởi nghiệp thành công."
      },
      {
        "word": "consultant",
        "phonetic": "/kənˈsʌl.tənt/",
        "wordType": "noun",
        "meaningEn": "a person who provides expert advice professionally",
        "meaningVi": "cố vấn, tư vấn viên",
        "example": "He works as a financial consultant.",
        "exampleVi": "Anh ấy làm việc với tư cách là cố vấn tài chính."
      },
      {
        "word": "journalist",
        "phonetic": "/ˈdʒɜː.nə.lɪst/",
        "wordType": "noun",
        "meaningEn": "a person who writes for newspapers, magazines, or news websites",
        "meaningVi": "nhà báo, phóng viên",
        "example": "The journalist wrote the article.",
        "exampleVi": "Nhà báo đã viết bài báo đó."
      },
      {
        "word": "architect",
        "phonetic": "/ˈɑː.kɪ.tekt/",
        "wordType": "noun",
        "meaningEn": "a person who designs buildings and supervises construction",
        "meaningVi": "kiến trúc sư",
        "example": "An architect designed the bridge.",
        "exampleVi": "Một kiến trúc sư đã thiết kế cây cầu."
      },
      {
        "word": "accountant",
        "phonetic": "/əˈkaʊn.tənt/",
        "wordType": "noun",
        "meaningEn": "someone whose job is to keep or inspect financial accounts",
        "meaningVi": "kế toán viên",
        "example": "The accountant checked the taxes.",
        "exampleVi": "Nhân viên kế toán đã kiểm tra các khoản thuế."
      },
      {
        "word": "colleague",
        "phonetic": "/ˈkɒl.iːɡ/",
        "wordType": "noun",
        "meaningEn": "one of a group of people who work together",
        "meaningVi": "đồng nghiệp",
        "example": "I get along with my colleagues.",
        "exampleVi": "Tôi hòa đồng với các đồng nghiệp của mình."
      },
      {
        "word": "promotion",
        "phonetic": "/prəˈməʊ.ʃən/",
        "wordType": "noun",
        "meaningEn": "the act of raising someone to a higher position or rank",
        "meaningVi": "sự thăng chức",
        "example": "He received a promotion today.",
        "exampleVi": "Anh ấy đã được thăng chức ngày hôm nay."
      },
      {
        "word": "redundancy",
        "phonetic": "/rɪˈdʌn.dən.si/",
        "wordType": "noun",
        "meaningEn": "a situation where someone loses job because they are no longer needed",
        "meaningVi": "sự sa thải, cắt giảm nhân sự",
        "example": "Many faced redundancy during the crisis.",
        "exampleVi": "Nhiều người phải đối mặt với việc bị sa thải trong đợt khủng hoảng."
      },
      {
        "word": "headhunter",
        "phonetic": "/ˈhedˌhʌn.tər/",
        "wordType": "noun",
        "meaningEn": "a recruiter of important personnel for businesses",
        "meaningVi": "người săn đầu người",
        "example": "The company hired a headhunter.",
        "exampleVi": "Công ty đã thuê một chuyên gia săn đầu người."
      },
      {
        "word": "resignation",
        "phonetic": "/ˌrez.ɪɡˈneɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "an act of retiring or giving up a position",
        "meaningVi": "sự từ chức, đơn từ chức",
        "example": "He handed in his resignation.",
        "exampleVi": "Anh ấy đã nộp đơn xin từ chức."
      },
      {
        "word": "apprentice",
        "phonetic": "/əˈpren.tɪs/",
        "wordType": "noun",
        "meaningEn": "a person learning a trade from a skilled employer",
        "meaningVi": "người học việc, thực tập sinh",
        "example": "She works as an apprentice chef.",
        "exampleVi": "Cô ấy làm việc với tư cách là đầu bếp học việc."
      },
      {
        "word": "freelancer",
        "phonetic": "/ˈfriː.lɑːn.sər/",
        "wordType": "noun",
        "meaningEn": "a person who is self-employed and not committed to one employer",
        "meaningVi": "người làm việc tự do",
        "example": "He works as a web design freelancer.",
        "exampleVi": "Anh ấy làm việc như một freelancer thiết kế web."
      },
      {
        "word": "subsidy",
        "phonetic": "/ˈsʌb.sɪ.di/",
        "wordType": "noun",
        "meaningEn": "a sum of money granted by the government to assist an industry",
        "meaningVi": "tiền trợ cấp",
        "example": "The government provides agricultural subsidies.",
        "exampleVi": "Chính phủ cung cấp tiền trợ cấp nông nghiệp."
      },
      {
        "word": "pension",
        "phonetic": "/ˈpen.ʃən/",
        "wordType": "noun",
        "meaningEn": "a regular payment made by the government during retirement",
        "meaningVi": "tiền lương hưu",
        "example": "He lives on his monthly pension.",
        "exampleVi": "Ông ấy sống bằng tiền lương hưu hàng tháng."
      },
      {
        "word": "overtime",
        "phonetic": "/ˈəʊ.və.taɪm/",
        "wordType": "noun/adv",
        "meaningEn": "time worked in addition to one's standard working hours",
        "meaningVi": "làm thêm giờ, tăng ca",
        "example": "I had to work overtime yesterday.",
        "exampleVi": "Tôi đã phải làm thêm giờ vào ngày hôm qua."
      },
      {
        "word": "recruitment",
        "phonetic": "/rɪˈkruːt.mənt/",
        "wordType": "noun",
        "meaningEn": "the action of finding new people to join an organization",
        "meaningVi": "sự tuyển dụng",
        "example": "The recruitment agency helped me find a job.",
        "exampleVi": "Công ty tuyển dụng đã giúp tôi tìm được công việc."
      },
      {
        "word": "turnover",
        "phonetic": "/ˈtɜːn.əʊ.vər/",
        "wordType": "noun",
        "meaningEn": "the rate at which employees leave a company and are replaced",
        "meaningVi": "tỷ lệ biến động nhân sự, nghỉ việc",
        "example": "High staff turnover is a bad sign.",
        "exampleVi": "Tỷ lệ biến động nhân sự cao là một dấu hiệu xấu."
      },
      {
        "word": "appraisal",
        "phonetic": "/əˈpreɪ.zəl/",
        "wordType": "noun",
        "meaningEn": "an act of assessing something or someone's performance",
        "meaningVi": "sự đánh giá hiệu suất, năng lực",
        "example": "The annual performance appraisal is scheduled.",
        "exampleVi": "Đợt đánh giá hiệu suất hàng năm đã được lên lịch."
      },
      {
        "word": "headcount",
        "phonetic": "/ˈhed.kaʊnt/",
        "wordType": "noun",
        "meaningEn": "the total number of people employed by a company",
        "meaningVi": "sơ đồ số lượng nhân sự",
        "example": "The company plans to increase its headcount.",
        "exampleVi": "Công ty có kế hoạch gia tăng số lượng nhân sự."
      },
      {
        "word": "severance",
        "phonetic": "/ˈsev.ər.əns/",
        "wordType": "noun",
        "meaningEn": "money paid to an employee who is laid off",
        "meaningVi": "tiền trợ cấp thôi việc",
        "example": "He received a generous severance package.",
        "exampleVi": "Anh ta đã nhận được một gói trợ cấp thôi việc hào phóng."
      },
      {
        "word": "workplace",
        "phonetic": "/ˈwɜːk.pleɪs/",
        "wordType": "noun",
        "meaningEn": "a building or place where people work",
        "meaningVi": "nơi làm việc",
        "example": "We promote diversity in the workplace.",
        "exampleVi": "Chúng tôi thúc đẩy sự đa dạng tại nơi làm việc."
      },
      {
        "word": "vacancy",
        "phonetic": "/ˈveɪ.kən.si/",
        "wordType": "noun",
        "meaningEn": "a job or position that is available to be filled",
        "meaningVi": "vị trí trống, cơ hội việc làm",
        "example": "We have a vacancy for a sales manager.",
        "exampleVi": "Chúng tôi có một vị trí trống cho quản lý bán hàng."
      },
      {
        "word": "arbitration",
        "phonetic": "/ˌɑː.bɪˈtreɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "the hearing and determining of a dispute by an impartial referee",
        "meaningVi": "sự phân xử, trọng tài lao động",
        "example": "The labor dispute went to arbitration.",
        "exampleVi": "Tranh chấp lao động đã được đưa ra phân xử."
      },
      {
        "word": "workaholic",
        "phonetic": "/ˌwɜː.kəˈhɒl.ɪk/",
        "wordType": "noun",
        "meaningEn": "a person who compulsively works excessively hard",
        "meaningVi": "người cuồng công việc",
        "example": "He is a workaholic and rarely goes home early.",
        "exampleVi": "Anh ấy là một người cuồng công việc và hiếm khi về nhà sớm."
      },
      {
        "word": "delegation",
        "phonetic": "/ˌdel.ɪˈɡeɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "the assignment of authority to another person to carry out tasks",
        "meaningVi": "sự ủy quyền, giao việc",
        "example": "Effective delegation is essential for managers.",
        "exampleVi": "Ủy quyền công việc hiệu quả là điều thiết yếu đối với các nhà quản lý."
      },
      {
        "word": "onboarding",
        "phonetic": "/ˈɒnˌbɔː.dɪŋ/",
        "wordType": "noun",
        "meaningEn": "The process of integrating a new employee into an organization.",
        "meaningVi": "Quá trình hội nhập, đào tạo hội nhập nhân viên mới",
        "example": "The company has an excellent onboarding process for new hires.",
        "exampleVi": "Công ty có một quy trình hội nhập tuyệt vời cho nhân viên mới."
      },
      {
        "word": "attrition",
        "phonetic": "/əˈtrɪʃ.ən/",
        "wordType": "noun",
        "meaningEn": "A reduction in the number of employees when they leave and are not replaced.",
        "meaningVi": "Sự hao hụt nhân sự tự nhiên",
        "example": "The firm is reducing its workforce through natural attrition.",
        "exampleVi": "Công ty đang giảm bớt lực lượng lao động thông qua sự hao hụt tự nhiên."
      },
      {
        "word": "remuneration",
        "phonetic": "/rɪˌmjuː.nəˈreɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "Money paid for work or a service; compensation.",
        "meaningVi": "Thù lao, tiền công, lương thưởng",
        "example": "The executive received a high level of remuneration.",
        "exampleVi": "Vị giám đốc điều hành đã nhận được một mức thù lao rất cao."
      },
      {
        "word": "probation",
        "phonetic": "/prəˈbeɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "A period of time during which a new employee's work and behavior are tested.",
        "meaningVi": "Thời gian thử việc",
        "example": "She was offered the job subject to a three-month probation.",
        "exampleVi": "Cô ấy đã được mời nhận việc với điều kiện thử việc ba tháng."
      },
      {
        "word": "credentials",
        "phonetic": "/krɪˈden.ʃəlz/",
        "wordType": "noun",
        "meaningEn": "Documents or achievements proving a person's qualifications for a job.",
        "meaningVi": "Hồ sơ năng lực, bằng cấp chứng chỉ",
        "example": "Her academic credentials for this research role are outstanding.",
        "exampleVi": "Hồ sơ năng lực học thuật của cô ấy cho vai trò nghiên cứu này rất nổi bật."
      },
      {
        "word": "solicitation",
        "phonetic": "/səˌlɪs.ɪˈteɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "The act of asking for business, custom, or help in a professional capacity.",
        "meaningVi": "Sự chèo kéo khách, sự chào hàng, gạ gẫm",
        "example": "The contract includes a non-solicitation clause regarding clients.",
        "exampleVi": "Hợp đồng bao gồm điều khoản không được chèo kéo lôi kéo khách hàng."
      },
      {
        "word": "presenteeism",
        "phonetic": "/ˌprez.ənˈtiː.ɪz.əm/",
        "wordType": "noun",
        "meaningEn": "The practice of being present at work for more hours than required or when ill.",
        "meaningVi": "Thói quen đi làm khi đau ốm hoặc làm quá giờ không cần thiết",
        "example": "Presenteeism can lead to lower productivity and worker burnout.",
        "exampleVi": "Thói quen đi làm khi đau ốm có thể dẫn đến năng suất thấp hơn và kiệt sức."
      },
      {
        "word": "micromanagement",
        "phonetic": "/ˌmaɪ.krəʊˈmæn.ɪdʒ.mənt/",
        "wordType": "noun",
        "meaningEn": "The practice of controlling every small detail of a business or project.",
        "meaningVi": "Sự quản lý vĩ mô quá chi tiết, quản lý tiểu tiết",
        "example": "His micromanagement made the employees feel untrusted.",
        "exampleVi": "Sự quản lý quá chi tiết của anh ấy làm cho nhân viên cảm thấy không được tin tưởng."
      },
      {
        "word": "synergy",
        "phonetic": "/ˈsɪn.ə.dʒi/",
        "wordType": "noun",
        "meaningEn": "The combined power of a group when they work together effectively.",
        "meaningVi": "Sức mạnh hiệp lực, tính cộng hưởng",
        "example": "We hope to achieve synergy by combining our marketing teams.",
        "exampleVi": "Chúng tôi hy vọng đạt được sự hiệp lực bằng cách kết hợp các đội tiếp thị."
      },
      {
        "word": "perquisite",
        "phonetic": "/ˈpɜː.kwɪ.zɪt/",
        "wordType": "noun",
        "meaningEn": "An extra benefit or privilege given to employees, often abbreviated as 'perk'.",
        "meaningVi": "Đặc quyền, bổng lộc, phụ cấp thêm",
        "example": "A company car is a common perquisite for senior managers.",
        "exampleVi": "Một chiếc xe hơi công ty là đặc quyền phổ biến dành cho các quản lý cấp cao."
      },
      {
        "word": "demote",
        "phonetic": "/ˌdiːˈməʊt/",
        "wordType": "verb",
        "meaningEn": "To move someone to a lower job position or rank.",
        "meaningVi": "Giáng chức",
        "example": "He was demoted for failing to meet his sales targets.",
        "exampleVi": "Anh ấy đã bị giáng chức vì không đạt được mục tiêu doanh số của mình."
      },
      {
        "word": "deliverable",
        "phonetic": "/dɪˈlɪv.ər.ə.bəl/",
        "wordType": "noun",
        "meaningEn": "A product or result that must be completed and delivered as part of a project.",
        "meaningVi": "Sản phẩm bàn giao, kết quả bàn giao",
        "example": "The team must submit the final deliverables by Friday.",
        "exampleVi": "Đội nhóm phải nộp các sản phẩm bàn giao cuối cùng trước thứ Sáu."
      },
      {
        "word": "requisition",
        "phonetic": "/ˌrekwɪˈzɪʃən/",
        "wordType": "noun",
        "meaningEn": "A formal written request for resources, staff, or equipment.",
        "meaningVi": "Yêu cầu chính thức, phiếu trưng mua",
        "example": "The manager submitted a requisition for three new laptops.",
        "exampleVi": "Quản lý đã gửi một phiếu yêu cầu trưng mua ba chiếc máy tính xách tay mới."
      },
      {
        "word": "subcontract",
        "phonetic": "/ˌsʌb.kənˈtrækt/",
        "wordType": "verb",
        "meaningEn": "To pay another person or company to do part of the work that you agreed to do.",
        "meaningVi": "Thầu phụ, giao lại hợp đồng phụ",
        "example": "We decided to subcontract the web design part of the project.",
        "exampleVi": "Chúng tôi đã quyết định giao thầu phụ phần thiết kế web của dự án."
      },
      {
        "word": "expatriate",
        "phonetic": "/ekˈspæt.ri.ət/",
        "wordType": "noun",
        "meaningEn": "A person who lives and works outside their native country.",
        "meaningVi": "Người làm việc ở nước ngoài, chuyên gia nước ngoài",
        "example": "The company has many expatriates working in its Tokyo branch.",
        "exampleVi": "Công ty có nhiều chuyên gia nước ngoài đang làm việc tại chi nhánh Tokyo."
      },
      {
        "word": "nepotism",
        "phonetic": "/ˈnep.ə.tɪz.əm/",
        "wordType": "noun",
        "meaningEn": "The practice among people with power of favoring relatives or friends.",
        "meaningVi": "Nạn con ông cháu cha, sự nâng đỡ người nhà",
        "example": "He was accused of nepotism when he promoted his nephew.",
        "exampleVi": "Anh ấy bị cáo buộc là nâng đỡ người nhà khi thăng chức cho cháu trai của mình."
      },
      {
        "word": "outsource",
        "phonetic": "/ˈaʊt.sɔːs/",
        "wordType": "verb",
        "meaningEn": "To obtain goods or services from an outside supplier.",
        "meaningVi": "Thuê ngoài, gia công ngoài",
        "example": "Many tech firms outsource their customer service to specialized agencies.",
        "exampleVi": "Nhiều công ty công nghệ thuê ngoài dịch vụ chăm sóc khách hàng từ các đại lý chuyên môn."
      },
      {
        "word": "burnout",
        "phonetic": "/ˈbɜːn.aʊt/",
        "wordType": "noun",
        "meaningEn": "Extreme tiredness or illness caused by working too hard.",
        "meaningVi": "Sự kiệt sức trong công việc",
        "example": "Several team members are suffering from burnout due to long hours.",
        "exampleVi": "Vài thành viên trong đội đang bị kiệt sức do thời gian làm việc kéo dài."
      },
      {
        "word": "mentorship",
        "phonetic": "/ˈmen.tɔː.ʃɪp/",
        "wordType": "noun",
        "meaningEn": "The guidance provided by a mentor, especially in a professional setting.",
        "meaningVi": "Sự cố vấn, chế độ kèm cặp",
        "example": "The mentorship program helped young graduates adjust quickly.",
        "exampleVi": "Chương trình cố vấn đã giúp những sinh viên mới tốt nghiệp thích nghi nhanh chóng."
      },
      {
        "word": "discrepancy",
        "phonetic": "/dɪˈskrep.ən.si/",
        "wordType": "noun",
        "meaningEn": "An illogical difference or inconsistency between two facts or figures.",
        "meaningVi": "Sự sai lệch, sự mâu thuẫn",
        "example": "There was a discrepancy between the expense report and actual receipts.",
        "exampleVi": "Có sự sai lệch giữa báo cáo chi phí và biên lai thực tế."
      },
      {
        "word": "on-call",
        "phonetic": "/ˌɒnˈkɔːl/",
        "wordType": "adjective",
        "meaningEn": "Available to be called on to work if needed, even outside regular hours.",
        "meaningVi": "Trong ca trực, sẵn sàng khi được gọi",
        "example": "Engineers are often on-call during weekend system upgrades.",
        "exampleVi": "Các kỹ sư thường phải trực sẵn sàng trong suốt quá trình nâng cấp hệ thống vào cuối tuần."
      },
      {
        "word": "benchmarking",
        "phonetic": "/ˈbentʃ.mɑː.kɪŋ/",
        "wordType": "noun",
        "meaningEn": "The process of comparing performance metrics against best practices.",
        "meaningVi": "Việc đánh giá chuẩn mực, đối sánh",
        "example": "Benchmarking helped us identify gaps in our customer support quality.",
        "exampleVi": "Việc đánh giá chuẩn mực đã giúp chúng tôi xác định các lỗ hổng trong chất lượng hỗ trợ khách hàng."
      },
      {
        "word": "procurement",
        "phonetic": "/prəˈkjʊə.mənt/",
        "wordType": "noun",
        "meaningEn": "The process of obtaining goods and services for a business.",
        "meaningVi": "Sự thu mua, hoạt động mua sắm vật tư",
        "example": "He works in the procurement department handling vendor contracts.",
        "exampleVi": "Anh ấy làm việc trong bộ phận mua sắm vật tư để xử lý các hợp đồng của nhà cung cấp."
      },
      {
        "word": "moonlighting",
        "phonetic": "/ˈmuːn.laɪ.tɪŋ/",
        "wordType": "noun",
        "meaningEn": "The act of working a second job, often secretly, in addition to one's main job.",
        "meaningVi": "Việc làm thêm ngoài giờ (thường là bí mật)",
        "example": "The company has strict policies against employee moonlighting.",
        "exampleVi": "Công ty có các chính sách nghiêm ngặt chống lại việc nhân viên làm thêm ngoài giờ."
      },
      {
        "word": "compliance",
        "phonetic": "/kəmˈplaɪ.əns/",
        "wordType": "noun",
        "meaningEn": "The act of obeying laws, regulations, or company standards.",
        "meaningVi": "Sự tuân thủ",
        "example": "All financial activities must be in compliance with government regulations.",
        "exampleVi": "Tất cả các hoạt động tài chính phải tuân thủ các quy định của chính phủ."
      },
      {
        "word": "telecommuting",
        "phonetic": "/ˌtel.ɪ.kəˈmjuː.tɪŋ/",
        "wordType": "noun",
        "meaningEn": "The practice of working from home using the internet and phone.",
        "meaningVi": "Làm việc từ xa (qua máy tính, điện thoại)",
        "example": "Telecommuting has become much more popular over the past few years.",
        "exampleVi": "Làm việc từ xa đã trở nên phổ biến hơn rất nhiều trong vài năm qua."
      },
      {
        "word": "incentive",
        "phonetic": "/ɪnˈsen.tɪv/",
        "wordType": "noun",
        "meaningEn": "Something that encourages or motivates a person to work harder.",
        "meaningVi": "Sự khuyến khích, tiền thưởng động viên",
        "example": "The performance bonus serves as a great incentive for the sales team.",
        "exampleVi": "Tiền thưởng hiệu suất đóng vai trò là một sự khuyến khích tuyệt vời cho đội ngũ bán hàng."
      },
      {
        "word": "stagnant",
        "phonetic": "/ˈstæɡ.nənt/",
        "wordType": "adjective",
        "meaningEn": "Not growing, changing, or developing; showing no activity.",
        "meaningVi": "Trì trệ, không phát triển",
        "example": "Employees complain about stagnant wages despite the rising cost of living.",
        "exampleVi": "Nhân viên phàn nàn về mức lương trì trệ bất chấp chi phí sinh hoạt ngày càng tăng."
      },
      {
        "word": "contingent",
        "phonetic": "/kənˈtɪn.dʒənt/",
        "wordType": "adjective",
        "meaningEn": "Relating to temporary, contract, or freelance workers rather than permanent staff.",
        "meaningVi": "Lao động thời vụ, không cố định, phụ thuộc vào tình hình",
        "example": "The company relies heavily on a contingent workforce during peak seasons.",
        "exampleVi": "Công ty phụ thuộc rất nhiều vào lực lượng lao động thời vụ trong mùa cao điểm."
      },
      {
        "word": "furlough",
        "phonetic": "/ˈfɜː.ləʊ/",
        "wordType": "noun",
        "meaningEn": "A temporary leave of absence, often without pay, granted to employees due to special conditions.",
        "meaningVi": "Sự cho nghỉ phép tạm thời (thường không lương)",
        "example": "Many airline workers were put on furlough during the economic downturn.",
        "exampleVi": "Nhiều nhân viên hàng không đã bị cho nghỉ phép tạm thời trong thời kỳ suy thoái kinh tế."
      },
      {
        "word": "solopreneur",
        "phonetic": "/ˌsəʊ.ləʊ.prəˈnɜːr/",
        "wordType": "noun",
        "meaningEn": "An entrepreneur who runs their business alone, without any employees.",
        "meaningVi": "Người tự khởi nghiệp và vận hành doanh nghiệp một mình",
        "example": "As a solopreneur, she handles everything from marketing to product delivery.",
        "exampleVi": "Là một người tự vận hành doanh nghiệp một mình, cô ấy tự lo mọi thứ từ tiếp thị đến giao sản phẩm."
      },
      {
        "word": "facilitator",
        "phonetic": "/fəˈsɪl.ɪ.teɪ.tər/",
        "wordType": "noun",
        "meaningEn": "A person who helps a group of people understand their common objectives and assists them to plan.",
        "meaningVi": "Người điều phối, người hướng dẫn",
        "example": "She acted as a facilitator during the brainstorming session.",
        "exampleVi": "Cô ấy đóng vai trò là người điều phối trong suốt phiên động não."
      },
      {
        "word": "redundant",
        "phonetic": "/rɪˈdʌn.dənt/",
        "wordType": "adjective",
        "meaningEn": "No longer needed for work and therefore losing one's job.",
        "meaningVi": "Dư thừa, bị sa thải do tinh giản biên chế",
        "example": "He was made redundant after the factory introduced automation.",
        "exampleVi": "Anh ấy đã bị sa thải do dư thừa sau khi nhà máy đưa vào tự động hóa."
      },
      {
        "word": "retrenchment",
        "phonetic": "/rɪˈtrentʃ.mənt/",
        "wordType": "noun",
        "meaningEn": "The reduction of costs or spending, often leading to job cuts in a business.",
        "meaningVi": "Sự cắt giảm chi tiêu, giảm bớt biên chế",
        "example": "The company announced a retrenchment program to survive the crisis.",
        "exampleVi": "Công ty đã công bố một chương trình cắt giảm chi phí để vượt qua cuộc khủng hoảng."
      },
      {
        "word": "microtasking",
        "phonetic": "/ˈmaɪ.krəʊˌtɑːs.kɪŋ/",
        "wordType": "noun",
        "meaningEn": "The process of splitting a large job into tiny tasks that can be done online by different people.",
        "meaningVi": "Sự chia nhỏ nhiệm vụ, làm các tác vụ nhỏ trực tuyến",
        "example": "Microtasking platforms allow freelancers to complete quick assignments for small fees.",
        "exampleVi": "Các nền tảng chia nhỏ nhiệm vụ cho phép người làm tự do hoàn thành nhanh các bài tập với mức phí nhỏ."
      }
    ]
  },
  {
    "id": "school",
    "title": "Học tập & Giáo dục (School & Study)",
    "desc": "Từ vựng về môn học, đồ dùng học tập, kỳ thi và môi trường học thuật.",
    "color": "border-violet-200 bg-violet-50/50 text-violet-850 hover:border-violet-400 dark:bg-slate-900/50 dark:border-slate-800 dark:text-violet-400",
    "beginner": [
      {
        "word": "book",
        "phonetic": "/bʊk/",
        "wordType": "noun",
        "meaningEn": "a written or printed work consisting of pages bound together",
        "meaningVi": "quyển sách",
        "example": "Read this book today.",
        "exampleVi": "Hãy đọc quyển sách này hôm nay."
      },
      {
        "word": "class",
        "phonetic": "/klɑːs/",
        "wordType": "noun",
        "meaningEn": "a group of students who are taught together",
        "meaningVi": "lớp học",
        "example": "The class starts at nine.",
        "exampleVi": "Lớp học bắt đầu lúc 9 giờ."
      },
      {
        "word": "lesson",
        "phonetic": "/ˈles.ən/",
        "wordType": "noun",
        "meaningEn": "a period of time in which pupils are taught a subject",
        "meaningVi": "bài học",
        "example": "We have an English lesson.",
        "exampleVi": "Chúng tôi có một bài học tiếng Anh."
      },
      {
        "word": "homework",
        "phonetic": "/ˈhəʊm.wɜːk/",
        "wordType": "noun",
        "meaningEn": "study that is given to school pupils to do at home",
        "meaningVi": "bài tập về nhà",
        "example": "Did you finish your homework?",
        "exampleVi": "Bạn đã làm xong bài tập về nhà chưa?"
      },
      {
        "word": "pencil",
        "phonetic": "/ˈpen.səl/",
        "wordType": "noun",
        "meaningEn": "a thin wooden stick used for writing or drawing",
        "meaningVi": "bút chì",
        "example": "Write the draft with a pencil.",
        "exampleVi": "Hãy viết bản nháp bằng bút chì."
      },
      {
        "word": "library",
        "phonetic": "/ˈlaɪ.brər.i/",
        "wordType": "noun",
        "meaningEn": "a building containing books that can be borrowed",
        "meaningVi": "thư viện",
        "example": "I study in the library.",
        "exampleVi": "Tôi tự học trong thư viện."
      },
      {
        "word": "desk",
        "phonetic": "/desk/",
        "wordType": "noun",
        "meaningEn": "a table that you sit at to write or work",
        "meaningVi": "bàn học, bàn làm việc",
        "example": "Put your books on the desk.",
        "exampleVi": "Đặt sách của bạn lên bàn học."
      },
      {
        "word": "pen",
        "phonetic": "/pen/",
        "wordType": "noun",
        "meaningEn": "an instrument for writing or drawing with ink",
        "meaningVi": "bút bi, bút mực",
        "example": "Write your name with a blue pen.",
        "exampleVi": "Hãy viết tên bạn bằng một cây bút bi xanh."
      },
      {
        "word": "ruler",
        "phonetic": "/ˈruː.lər/",
        "wordType": "noun",
        "meaningEn": "a straight strip used to measure distances or draw straight lines",
        "meaningVi": "thước kẻ",
        "example": "Use a ruler to draw lines.",
        "exampleVi": "Hãy sử dụng thước kẻ để vẽ các đường thẳng."
      },
      {
        "word": "paper",
        "phonetic": "/ˈpeɪ.pər/",
        "wordType": "noun",
        "meaningEn": "material manufactured in thin sheets, used for writing on",
        "meaningVi": "tờ giấy, giấy",
        "example": "I need a sheet of paper.",
        "exampleVi": "Tôi cần một tờ giấy."
      },
      {
        "word": "exam",
        "phonetic": "/ɪɡˈzæm/",
        "wordType": "noun",
        "meaningEn": "a formal test of a person's knowledge or proficiency",
        "meaningVi": "kỳ thi",
        "example": "He passed the final exam.",
        "exampleVi": "Cậu ấy đã vượt qua kỳ thi cuối kỳ."
      },
      {
        "word": "board",
        "phonetic": "/bɔːd/",
        "wordType": "noun",
        "meaningEn": "a flat surface used for writing on with chalk or markers",
        "meaningVi": "cái bảng",
        "example": "Look at the board, please.",
        "exampleVi": "Làm ơn hãy nhìn lên bảng."
      },
      {
        "word": "grade",
        "phonetic": "/ɡreɪd/",
        "wordType": "noun",
        "meaningEn": "a mark indicating the quality of a student's work",
        "meaningVi": "điểm số, lớp học",
        "example": "She got a high grade in math.",
        "exampleVi": "Cô ấy đạt điểm cao môn toán."
      },
      {
        "word": "eraser",
        "phonetic": "/ɪˈreɪ.zər/",
        "wordType": "noun",
        "meaningEn": "an object used to rub out ink or pencil marks",
        "meaningVi": "cục tẩy, cục gôm",
        "example": "Can I borrow your eraser?",
        "exampleVi": "Tôi có thể mượn cục tẩy của bạn không?"
      },
      {
        "word": "schoolbag",
        "phonetic": "/ˈskuːl.bæɡ/",
        "wordType": "noun",
        "meaningEn": "a bag used by children for carrying books and school equipment",
        "meaningVi": "cặp học sinh, ba lô học sinh",
        "example": "Put the books in your schoolbag.",
        "exampleVi": "Hãy bỏ sách vào cặp học sinh của em."
      },
      {
        "word": "notebook",
        "phonetic": "/ˈnəʊt.bʊk/",
        "wordType": "noun",
        "meaningEn": "a book with blank pages for writing notes",
        "meaningVi": "vở ghi chép, sổ tay",
        "example": "Write the grammar rules in your notebook.",
        "exampleVi": "Hãy viết các quy tắc ngữ pháp vào vở của bạn."
      },
      {
        "word": "calculator",
        "phonetic": "/ˈkæl.kjə.leɪ.tər/",
        "wordType": "noun",
        "meaningEn": "a small electronic device for calculating numbers",
        "meaningVi": "máy tính cầm tay",
        "example": "You can use a calculator for the math test.",
        "exampleVi": "Em có thể dùng máy tính cầm tay cho bài kiểm tra toán."
      },
      {
        "word": "dictionary",
        "phonetic": "/ˈdɪk.ʃən.ər.i/",
        "wordType": "noun",
        "meaningEn": "a book or resource that lists words and their meanings",
        "meaningVi": "từ điển",
        "example": "Look up the word in the dictionary.",
        "exampleVi": "Hãy tra từ đó trong từ điển."
      },
      {
        "word": "subject",
        "phonetic": "/ˈsʌb.dʒekt/",
        "wordType": "noun",
        "meaningEn": "an area of study in school or university",
        "meaningVi": "môn học",
        "example": "English is my favorite subject.",
        "exampleVi": "Tiếng Anh là môn học yêu thích của tôi."
      },
      {
        "word": "classroom",
        "phonetic": "/ˈklɑːs.ruːm/",
        "wordType": "noun",
        "meaningEn": "a room in a school where lessons take place",
        "meaningVi": "phòng học, lớp học",
        "example": "The classroom is clean and bright.",
        "exampleVi": "Phòng học sạch sẽ và tươi sáng."
      },
      {
        "word": "blackboard",
        "phonetic": "/ˈblæk.bɔːd/",
        "wordType": "noun",
        "meaningEn": "a dark board for writing on with chalk",
        "meaningVi": "bảng đen",
        "example": "The teacher wrote the sentence on the blackboard.",
        "exampleVi": "Giáo viên đã viết câu văn lên bảng đen."
      },
      {
        "word": "marker",
        "phonetic": "/ˈmɑː.kər/",
        "wordType": "noun",
        "meaningEn": "a pen with a broad felt tip for writing on whiteboards",
        "meaningVi": "bút viết bảng",
        "example": "I need a black marker to write on the whiteboard.",
        "exampleVi": "Tôi cần một chiếc bút viết bảng màu đen để viết lên bảng trắng."
      },
      {
        "word": "backpack",
        "phonetic": "/ˈbæk.pæk/",
        "wordType": "noun",
        "meaningEn": "a bag carried on the back, used by students",
        "meaningVi": "ba lô",
        "example": "His backpack is full of heavy books.",
        "exampleVi": "Ba lô của cậu ấy chứa đầy những cuốn sách nặng."
      },
      {
        "word": "schedule",
        "phonetic": "/ˈʃed.juːl/",
        "wordType": "noun",
        "meaningEn": "a plan that gives list of events or class times",
        "meaningVi": "thời khóa biểu, lịch học",
        "example": "Let's check the class schedule for tomorrow.",
        "exampleVi": "Hãy kiểm tra thời khóa biểu lớp học cho ngày mai."
      },
      {
        "word": "quiz",
        "phonetic": "/kwɪz/",
        "wordType": "noun",
        "meaningEn": "a short, informal test of knowledge",
        "meaningVi": "bài kiểm tra ngắn",
        "example": "We have a vocabulary quiz today.",
        "exampleVi": "Chúng tôi có một bài kiểm tra ngắn về từ vựng ngày hôm nay."
      },
      {
        "word": "student",
        "phonetic": "/ˈstuːdnt/",
        "wordType": "noun",
        "meaningEn": "A person who is studying at a school or college.",
        "meaningVi": "Học sinh, sinh viên",
        "example": "The student raised her hand to ask a question.",
        "exampleVi": "Học sinh giơ tay hỏi bài."
      },
      {
        "word": "teacher",
        "phonetic": "/ˈtiːtʃər/",
        "wordType": "noun",
        "meaningEn": "A person who teaches, especially in a school.",
        "meaningVi": "Giáo viên",
        "example": "Our teacher helps us learn new things every day.",
        "exampleVi": "Cô giáo giúp chúng tôi học những điều mới mỗi ngày."
      },
      {
        "word": "chair",
        "phonetic": "/tʃeər/",
        "wordType": "noun",
        "meaningEn": "A piece of furniture for one person to sit on, with a back and four legs.",
        "meaningVi": "Ghế",
        "example": "Please sit on the chair.",
        "exampleVi": "Xin mời ngồi vào ghế."
      },
      {
        "word": "table",
        "phonetic": "/ˈteɪbl/",
        "wordType": "noun",
        "meaningEn": "A piece of furniture with a flat top and one or more legs, providing a level surface for working at or eating off.",
        "meaningVi": "Bàn",
        "example": "We put our books on the table.",
        "exampleVi": "Chúng tôi đặt sách lên bàn."
      },
      {
        "word": "friend",
        "phonetic": "/frend/",
        "wordType": "noun",
        "meaningEn": "A person whom one knows and with whom one has a bond of mutual affection.",
        "meaningVi": "Bạn bè",
        "example": "My best friend helps me with my homework.",
        "exampleVi": "Người bạn thân nhất của tôi giúp tôi làm bài tập về nhà."
      },
      {
        "word": "play",
        "phonetic": "/pleɪ/",
        "wordType": "verb",
        "meaningEn": "Engage in activity for enjoyment and recreation rather than for a serious or practical purpose.",
        "meaningVi": "Chơi đùa",
        "example": "Let's play outside after school.",
        "exampleVi": "Chúng ta hãy chơi bên ngoài sau giờ học."
      },
      {
        "word": "learn",
        "phonetic": "/lɜːrn/",
        "wordType": "verb",
        "meaningEn": "Gain or acquire knowledge of or skill in something by study, experience, or being taught.",
        "meaningVi": "Học hỏi",
        "example": "I want to learn English faster.",
        "exampleVi": "Tôi muốn học tiếng Anh nhanh hơn."
      },
      {
        "word": "read",
        "phonetic": "/riːd/",
        "wordType": "verb",
        "meaningEn": "Look at and comprehend the meaning of (written or printed matter) by interpreting the characters or symbols of which it is composed.",
        "meaningVi": "Đọc",
        "example": "I like to read storybooks.",
        "exampleVi": "Tôi thích đọc truyện."
      },
      {
        "word": "write",
        "phonetic": "/raɪt/",
        "wordType": "verb",
        "meaningEn": "Mark (letters, words, or other symbols) on a surface, typically paper, with a pen, pencil, or similar implement.",
        "meaningVi": "Viết",
        "example": "Please write your name here.",
        "exampleVi": "Vui lòng viết tên bạn vào đây."
      },
      {
        "word": "study",
        "phonetic": "/ˈstʌd.i/",
        "wordType": "verb",
        "meaningEn": "Devote time and attention to gaining knowledge of an academic subject, especially by means of books.",
        "meaningVi": "Học tập",
        "example": "I need to study for my test tomorrow.",
        "exampleVi": "Tôi cần học bài cho bài kiểm tra ngày mai."
      },
      {
        "word": "school",
        "phonetic": "/skuːl/",
        "wordType": "noun",
        "meaningEn": "An institution for educating children.",
        "meaningVi": "Trường học",
        "example": "I go to school every weekday.",
        "exampleVi": "Tôi đi học vào các ngày trong tuần."
      },
      {
        "word": "college",
        "phonetic": "/ˈkɒlɪdʒ/",
        "wordType": "noun",
        "meaningEn": "An educational institution or establishment, in particular one providing higher education or specialized professional or vocational training.",
        "meaningVi": "Trường cao đẳng",
        "example": "After high school, I plan to go to college.",
        "exampleVi": "Sau khi tốt nghiệp cấp ba, tôi dự định vào đại học."
      },
      {
        "word": "university",
        "phonetic": "/ˌjuːnɪˈvɜːrsəti/",
        "wordType": "noun",
        "meaningEn": "An institution of higher education and research, which grants academic degrees in various subjects.",
        "meaningVi": "Trường đại học",
        "example": "My brother is studying engineering at the university.",
        "exampleVi": "Anh trai tôi đang học kỹ sư tại trường đại học."
      },
      {
        "word": "art",
        "phonetic": "/ɑːrt/",
        "wordType": "noun",
        "meaningEn": "The expression or application of human creative skill and imagination, typically in a visual form such as painting or sculpture, producing works to be appreciated primarily for their beauty or emotional power.",
        "meaningVi": "Nghệ thuật",
        "example": "I love my art class.",
        "exampleVi": "Tôi yêu lớp học nghệ thuật của mình."
      },
      {
        "word": "music",
        "phonetic": "/ˈmjuːzɪk/",
        "wordType": "noun",
        "meaningEn": "Vocal or instrumental sounds (or both) combined in such a way as to produce beauty of form, harmony, and expression of emotion.",
        "meaningVi": "Âm nhạc",
        "example": "We learn to play instruments in music class.",
        "exampleVi": "Chúng tôi học chơi nhạc cụ trong lớp nhạc."
      },
      {
        "word": "math",
        "phonetic": "/mæθ/",
        "wordType": "noun",
        "meaningEn": "The study of numbers, quantities, and shapes.",
        "meaningVi": "Toán học",
        "example": "Math can be challenging but fun.",
        "exampleVi": "Môn toán có thể khó nhưng vui."
      },
      {
        "word": "science",
        "phonetic": "/ˈsaɪəns/",
        "wordType": "noun",
        "meaningEn": "The intellectual and practical activity encompassing the systematic study of the structure and behavior of the physical and natural world through observation and experiment.",
        "meaningVi": "Khoa học",
        "example": "We do experiments in science class.",
        "exampleVi": "Chúng tôi làm thí nghiệm trong lớp khoa học."
      },
      {
        "word": "history",
        "phonetic": "/ˈhɪstəri/",
        "wordType": "noun",
        "meaningEn": "The study of past events.",
        "meaningVi": "Lịch sử",
        "example": "In history, we learn about ancient civilizations.",
        "exampleVi": "Trong môn lịch sử, chúng ta học về các nền văn minh cổ đại."
      },
      {
        "word": "geography",
        "phonetic": "/dʒiˈɒɡrəfi/",
        "wordType": "noun",
        "meaningEn": "The study of the physical features of the earth and its atmosphere, and of human activity as it affects and is affected by these, including the distribution of populations and resources, land use, and industries.",
        "meaningVi": "Địa lý",
        "example": "Geography teaches us about different countries and maps.",
        "exampleVi": "Địa lý dạy chúng ta về các quốc gia và bản đồ khác nhau."
      },
      {
        "word": "sport",
        "phonetic": "/spɔːrt/",
        "wordType": "noun",
        "meaningEn": "An activity involving physical exertion and skill in which an individual or team competes against another or others for entertainment.",
        "meaningVi": "Thể thao",
        "example": "My favorite sport is soccer.",
        "exampleVi": "Môn thể thao yêu thích của tôi là bóng đá."
      },
      {
        "word": "lunch",
        "phonetic": "/lʌntʃ/",
        "wordType": "noun",
        "meaningEn": "A meal eaten in the middle of the day.",
        "meaningVi": "Bữa trưa",
        "example": "We eat lunch at school every day.",
        "exampleVi": "Chúng tôi ăn trưa ở trường mỗi ngày."
      },
      {
        "word": "break",
        "phonetic": "/breɪk/",
        "wordType": "noun",
        "meaningEn": "A pause in work or during an activity or event.",
        "meaningVi": "Giờ giải lao",
        "example": "Let's take a break and go outside.",
        "exampleVi": "Chúng ta hãy nghỉ giải lao và ra ngoài."
      },
      {
        "word": "test",
        "phonetic": "/test/",
        "wordType": "noun",
        "meaningEn": "A procedure intended to establish the quality, performance, or reliability of something, especially before it is taken into widespread use.",
        "meaningVi": "Bài kiểm tra",
        "example": "I have a math test tomorrow.",
        "exampleVi": "Tôi có bài kiểm tra toán ngày mai."
      },
      {
        "word": "report",
        "phonetic": "/rɪˈpɔːrt/",
        "wordType": "noun",
        "meaningEn": "An account given of a particular matter, especially in the form of an official document, after investigation or consideration by an appointed person or body.",
        "meaningVi": "Báo cáo",
        "example": "We have to write a report for history class.",
        "exampleVi": "Chúng tôi phải viết một báo cáo cho lớp lịch sử."
      },
      {
        "word": "project",
        "phonetic": "/ˈprɒdʒekt/",
        "wordType": "noun",
        "meaningEn": "An individual or collaborative enterprise that is carefully planned and designed to achieve a particular aim.",
        "meaningVi": "Dự án, đề án",
        "example": "Our science project is due next week.",
        "exampleVi": "Dự án khoa học của chúng tôi sẽ đến hạn vào tuần tới."
      },
      {
        "word": "uniform",
        "phonetic": "/ˈjuːnɪfɔːrm/",
        "wordType": "noun",
        "meaningEn": "The distinctive clothing worn by members of the same organization or body or by children attending certain schools.",
        "meaningVi": "Đồng phục",
        "example": "We wear a uniform to school.",
        "exampleVi": "Chúng tôi mặc đồng phục đến trường."
      },
      {
        "word": "story",
        "phonetic": "/ˈstɔːri/",
        "wordType": "noun",
        "meaningEn": "An account of imaginary or real people and events told for entertainment.",
        "meaningVi": "Câu chuyện",
        "example": "The teacher read us a story.",
        "exampleVi": "Cô giáo đã đọc cho chúng tôi nghe một câu chuyện."
      },
      {
        "word": "picture",
        "phonetic": "/ˈpɪktʃər/",
        "wordType": "noun",
        "meaningEn": "A painting or drawing.",
        "meaningVi": "Bức tranh, hình ảnh",
        "example": "I like to draw pictures in art class.",
        "exampleVi": "Tôi thích vẽ tranh trong lớp mỹ thuật."
      },
      {
        "word": "computer",
        "phonetic": "/kəmˈpjuːtər/",
        "wordType": "noun",
        "meaningEn": "An electronic device for storing and processing data, typically in binary form, according to instructions given to it in a variable program.",
        "meaningVi": "Máy tính",
        "example": "We use computers in the lab.",
        "exampleVi": "Chúng tôi sử dụng máy tính trong phòng thí nghiệm."
      },
      {
        "word": "globe",
        "phonetic": "/ɡloʊb/",
        "wordType": "noun",
        "meaningEn": "A spherical model of the earth.",
        "meaningVi": "Quả địa cầu",
        "example": "The teacher showed us the countries on the globe.",
        "exampleVi": "Cô giáo đã chỉ cho chúng tôi các quốc gia trên quả địa cầu."
      },
      {
        "word": "map",
        "phonetic": "/mæp/",
        "wordType": "noun",
        "meaningEn": "A diagrammatic representation of an area of land or sea showing physical features, cities, roads, etc.",
        "meaningVi": "Bản đồ",
        "example": "We used a map to find our way.",
        "exampleVi": "Chúng tôi đã sử dụng bản đồ để tìm đường."
      },
      {
        "word": "document",
        "phonetic": "/ˈdɒkjumənt/",
        "wordType": "noun",
        "meaningEn": "A piece of written, printed, or electronic matter that provides information or evidence or that serves as an official record.",
        "meaningVi": "Tài liệu",
        "example": "Please save this document on your computer.",
        "exampleVi": "Vui lòng lưu tài liệu này vào máy tính của bạn."
      },
      {
        "word": "reading",
        "phonetic": "/ˈriːdɪŋ/",
        "wordType": "noun",
        "meaningEn": "The action or skill of reading.",
        "meaningVi": "Bài đọc, việc đọc",
        "example": "Our reading assignment is for tomorrow.",
        "exampleVi": "Bài đọc của chúng tôi là cho ngày mai."
      },
      {
        "word": "writing",
        "phonetic": "/ˈraɪtɪŋ/",
        "wordType": "noun",
        "meaningEn": "The activity or skill of writing.",
        "meaningVi": "Bài viết, việc viết",
        "example": "She enjoys creative writing.",
        "exampleVi": "Cô ấy thích viết văn sáng tạo."
      },
      {
        "word": "speaking",
        "phonetic": "/ˈspiːkɪŋ/",
        "wordType": "noun",
        "meaningEn": "The action of conveying information or expressing thoughts and feelings in spoken language.",
        "meaningVi": "Bài nói, việc nói",
        "example": "We practice speaking English in class.",
        "exampleVi": "Chúng tôi luyện nói tiếng Anh trong lớp."
      },
      {
        "word": "listening",
        "phonetic": "/ˈlɪsənɪŋ/",
        "wordType": "noun",
        "meaningEn": "The action of hearing attentively.",
        "meaningVi": "Bài nghe, việc nghe",
        "example": "Listening to music helps me relax.",
        "exampleVi": "Nghe nhạc giúp tôi thư giãn."
      },
      {
        "word": "group",
        "phonetic": "/ɡruːp/",
        "wordType": "noun",
        "meaningEn": "A number of people or things that are located, gathered, or classed together.",
        "meaningVi": "Nhóm",
        "example": "We work in groups for some activities.",
        "exampleVi": "Chúng tôi làm việc theo nhóm cho một số hoạt động."
      },
      {
        "word": "partner",
        "phonetic": "/ˈpɑːrtnər/",
        "wordType": "noun",
        "meaningEn": "A person who takes part in an undertaking with another or others, especially in a business or company with shared risks and profits.",
        "meaningVi": "Bạn cặp, đối tác",
        "example": "Work with your partner on this exercise.",
        "exampleVi": "Làm việc với bạn cặp của bạn trong bài tập này."
      },
      {
        "word": "activity",
        "phonetic": "/ækˈtɪvəti/",
        "wordType": "noun",
        "meaningEn": "The condition in which things are happening or being done.",
        "meaningVi": "Hoạt động",
        "example": "Our teacher planned a fun activity for us.",
        "exampleVi": "Giáo viên của chúng tôi đã lên kế hoạch một hoạt động vui vẻ cho chúng tôi."
      },
      {
        "word": "rule",
        "phonetic": "/ruːl/",
        "wordType": "noun",
        "meaningEn": "One of a set of explicit or understood regulations or principles governing conduct within a particular activity or sphere.",
        "meaningVi": "Quy tắc",
        "example": "Follow the school rules.",
        "exampleVi": "Hãy tuân thủ các quy tắc của trường."
      },
      {
        "word": "game",
        "phonetic": "/ɡeɪm/",
        "wordType": "noun",
        "meaningEn": "A form of play or sport, especially a competitive one played according to rules and decided by skill, strength, or luck.",
        "meaningVi": "Trò chơi",
        "example": "Let's play a game to review the vocabulary.",
        "exampleVi": "Chúng ta hãy chơi một trò chơi để ôn lại từ vựng."
      },
      {
        "word": "question",
        "phonetic": "/ˈkwɛstʃən/",
        "wordType": "noun",
        "meaningEn": "A sentence worded or expressed so as to elicit information.",
        "meaningVi": "Câu hỏi",
        "example": "Do you have any questions?",
        "exampleVi": "Bạn có câu hỏi nào không?"
      },
      {
        "word": "answer",
        "phonetic": "/ˈɑːnsər/",
        "wordType": "noun",
        "meaningEn": "A thing said, written, or done to react to a question, statement, or situation.",
        "meaningVi": "Câu trả lời",
        "example": "I know the answer to that question.",
        "exampleVi": "Tôi biết câu trả lời cho câu hỏi đó."
      },
      {
        "word": "practice",
        "phonetic": "/ˈpræktɪs/",
        "wordType": "noun",
        "meaningEn": "The actual application or use of an idea, belief, or method, as opposed to theories relating to it.",
        "meaningVi": "Thực hành, luyện tập",
        "example": "Daily practice helps improve your skills.",
        "exampleVi": "Luyện tập hàng ngày giúp cải thiện kỹ năng của bạn."
      },
      {
        "word": "help",
        "phonetic": "/hɛlp/",
        "wordType": "verb",
        "meaningEn": "Make it easier or possible for (someone) to do something by offering them one's services or resources.",
        "meaningVi": "Giúp đỡ",
        "example": "Can you help me with this problem?",
        "exampleVi": "Bạn có thể giúp tôi với vấn đề này không?"
      }
    ],
    "advanced": [
      {
        "word": "scholarship",
        "phonetic": "/ˈskɒl.ə.ʃɪp/",
        "wordType": "noun",
        "meaningEn": "money given to pay for the studies of a person with ability",
        "meaningVi": "học bổng",
        "example": "She won a full scholarship.",
        "exampleVi": "Cô ấy đã giành được một học bổng toàn phần."
      },
      {
        "word": "curriculum",
        "phonetic": "/kəˈrɪk.jə.ləm/",
        "wordType": "noun",
        "meaningEn": "the subjects studying in a school or college",
        "meaningVi": "chương trình giảng dạy",
        "example": "The school updated its curriculum.",
        "exampleVi": "Nhà trường đã cập nhật chương trình giảng dạy của mình."
      },
      {
        "word": "graduation",
        "phonetic": "/ˌɡrædʒ.uˈeɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "the finishing of a degree course and receiving a certificate",
        "meaningVi": "sự tốt nghiệp, lễ tốt nghiệp",
        "example": "Graduation ceremony is next week.",
        "exampleVi": "Lễ tốt nghiệp sẽ diễn ra vào tuần tới."
      },
      {
        "word": "plagiarism",
        "phonetic": "/ˈpleɪ.dʒər.ɪ.zəm/",
        "wordType": "noun",
        "meaningEn": "taking someone else's work and passing it off as one's own",
        "meaningVi": "sự đạo văn",
        "example": "Plagiarism is strictly prohibited.",
        "exampleVi": "Hành vi đạo văn bị cấm nghiêm ngặt."
      },
      {
        "word": "tuition",
        "phonetic": "/tʃuːˈɪʃ.ən/",
        "wordType": "noun",
        "meaningEn": "the money paid for being taught in a college",
        "meaningVi": "học phí",
        "example": "University tuition is rising.",
        "exampleVi": "Học phí đại học đang ngày càng tăng."
      },
      {
        "word": "assignment",
        "phonetic": "/əˈsaɪn.mənt/",
        "wordType": "noun",
        "meaningEn": "a piece of work given to someone in their course of study",
        "meaningVi": "bài tập lớn, nhiệm vụ",
        "example": "Submit the assignment by Friday.",
        "exampleVi": "Nộp bài tập lớn trước thứ Sáu."
      },
      {
        "word": "lecture",
        "phonetic": "/ˈlek.tʃər/",
        "wordType": "noun",
        "meaningEn": "a formal talk on a subject given to students",
        "meaningVi": "bài giảng đại học",
        "example": "The professor gave an interesting lecture.",
        "exampleVi": "Giáo sư đã đưa ra một bài giảng rất thú vị."
      },
      {
        "word": "semester",
        "phonetic": "/sɪˈmes.tər/",
        "wordType": "noun",
        "meaningEn": "one of the two periods into which a year is divided at college",
        "meaningVi": "học kỳ",
        "example": "This is the final semester.",
        "exampleVi": "Đây là học kỳ cuối cùng."
      },
      {
        "word": "syllabus",
        "phonetic": "/ˈsɪl.ə.bəs/",
        "wordType": "noun",
        "meaningEn": "an outline of the subjects in a course of study",
        "meaningVi": "đề cương môn học",
        "example": "Check the syllabus for exam dates.",
        "exampleVi": "Hãy kiểm tra đề cương môn học để biết ngày thi."
      },
      {
        "word": "pedagogy",
        "phonetic": "/ˈped.ə.ɡɒdʒ.i/",
        "wordType": "noun",
        "meaningEn": "the method and practice of teaching",
        "meaningVi": "sư phạm học, phương pháp dạy học",
        "example": "They study modern educational pedagogy.",
        "exampleVi": "Họ nghiên cứu về phương pháp sư phạm giáo dục hiện đại."
      },
      {
        "word": "intellectual",
        "phonetic": "/ˌɪn.təlˈek.tʃu.əl/",
        "wordType": "adj",
        "meaningEn": "relating to the intellect and rational thinking",
        "meaningVi": "trí tuệ, thuộc trí thức",
        "example": "Chess is an intellectual game.",
        "exampleVi": "Cờ vua là một trò chơi trí tuệ."
      },
      {
        "word": "doctorate",
        "phonetic": "/ˈdɒk.tər.ət/",
        "wordType": "noun",
        "meaningEn": "the highest degree that is given by a university",
        "meaningVi": "học vị tiến sĩ",
        "example": "He earned his doctorate in physics.",
        "exampleVi": "Anh ấy đã nhận bằng tiến sĩ vật lý."
      },
      {
        "word": "alumni",
        "phonetic": "/əˈlʌm.naɪ/",
        "wordType": "noun pl",
        "meaningEn": "former students or graduates of a school or college",
        "meaningVi": "cựu học sinh, cựu sinh viên",
        "example": "The university welcomes back alumni.",
        "exampleVi": "Trường đại học chào đón các cựu sinh viên trở lại."
      },
      {
        "word": "literacy",
        "phonetic": "/ˈlɪt.ər.ə.si/",
        "wordType": "noun",
        "meaningEn": "the ability to read and write",
        "meaningVi": "trình độ biết chữ, sự biết chữ",
        "example": "Adult literacy rates are improving.",
        "exampleVi": "Tỷ lệ biết chữ ở người lớn đang được cải thiện."
      },
      {
        "word": "discipline",
        "phonetic": "/ˈdɪs.ə.plɪn/",
        "wordType": "noun",
        "meaningEn": "the practice of training people to obey rules",
        "meaningVi": "kỷ luật, ngành học",
        "example": "School discipline is very strict.",
        "exampleVi": "Kỷ luật trường học rất nghiêm khắc."
      },
      {
        "word": "accreditation",
        "phonetic": "/əˌkred.ɪˈteɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "official recognition that a school meets standards of quality",
        "meaningVi": "sự kiểm định chất lượng đào tạo",
        "example": "The university received official accreditation.",
        "exampleVi": "Trường đại học đã nhận được sự kiểm định chất lượng chính thức."
      },
      {
        "word": "matriculation",
        "phonetic": "/məˌtrɪk.jəˈleɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "formal admission to a college or university",
        "meaningVi": "sự nhập học đại học",
        "example": "Matriculation ceremony is mandatory.",
        "exampleVi": "Lễ nhập học đại học là bắt buộc."
      },
      {
        "word": "dissertation",
        "phonetic": "/ˌdɪs.əˈteɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "a long essay on a particular subject written for a university degree",
        "meaningVi": "luận án tiến sĩ",
        "example": "She wrote her dissertation on neural networks.",
        "exampleVi": "Cô ấy viết luận án tiến sĩ về mạng nơ-ron."
      },
      {
        "word": "symposium",
        "phonetic": "/sɪmˈpəʊ.zi.əm/",
        "wordType": "noun",
        "meaningEn": "a conference or meeting to discuss a particular subject",
        "meaningVi": "hội thảo chuyên đề",
        "example": "He was invited to speak at the symposium.",
        "exampleVi": "Anh ấy đã được mời nói chuyện tại cuộc hội thảo chuyên đề."
      },
      {
        "word": "sabbatical",
        "phonetic": "/səˈbæt.ɪ.kəl/",
        "wordType": "noun",
        "meaningEn": "a period of paid leave granted to a university teacher for study or travel",
        "meaningVi": "kỳ nghỉ phép nghiên cứu",
        "example": "The professor took a sabbatical to write a book.",
        "exampleVi": "Giáo sư đã nghỉ phép nghiên cứu để viết sách."
      },
      {
        "word": "interdisciplinary",
        "phonetic": "/ˌɪn.tə.dɪs.ɪ.plɪn.ər.i/",
        "wordType": "adj",
        "meaningEn": "relating to more than one branch of knowledge",
        "meaningVi": "liên ngành",
        "example": "This is an interdisciplinary research project.",
        "exampleVi": "Đây là một dự án nghiên cứu liên ngành."
      },
      {
        "word": "coeducation",
        "phonetic": "/ˌkəʊ.ed.jʊˈkeɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "the education of pupils of both sexes together",
        "meaningVi": "nền giáo dục nam nữ đồng trường",
        "example": "Coeducation has been standard for decades.",
        "exampleVi": "Giáo dục chung nam nữ đã là tiêu chuẩn trong nhiều thập kỷ."
      },
      {
        "word": "erudite",
        "phonetic": "/ˈer.ʊ.daɪt/",
        "wordType": "adj",
        "meaningEn": "having or showing great knowledge or learning",
        "meaningVi": "uyên bác, thông thái",
        "example": "The professor is a highly erudite speaker.",
        "exampleVi": "Giáo sư là một diễn giả vô cùng uyên bác."
      },
      {
        "word": "pedagogue",
        "phonetic": "/ˈped.ə.ɡɒɡ/",
        "wordType": "noun",
        "meaningEn": "a teacher, especially a strict or pedantic one",
        "meaningVi": "nhà giáo dục học",
        "example": "He is an inspiring pedagogue.",
        "exampleVi": "Ông ấy là một nhà giáo dục đầy truyền cảm hứng."
      },
      {
        "word": "scholar",
        "phonetic": "/ˈskɒl.ər/",
        "wordType": "noun",
        "meaningEn": "a specialist in a particular branch of study; academic",
        "meaningVi": "học giả",
        "example": "The book was written by an eminent scholar.",
        "exampleVi": "Cuốn sách được viết bởi một học giả xuất chúng."
      },
      {
        "word": "apprentice",
        "phonetic": "/əˈprɛntɪs/",
        "wordType": "noun",
        "meaningEn": "A person who is learning a trade from a skilled employer, having agreed to work for a fixed period at low wages.",
        "meaningVi": "Người học việc, người học nghề",
        "example": "He started his career as an apprentice to a master carpenter.",
        "exampleVi": "Anh ấy bắt đầu sự nghiệp của mình với tư cách là người học việc của một thợ mộc bậc thầy."
      },
      {
        "word": "cohort",
        "phonetic": "/ˈkoʊhɔːrt/",
        "wordType": "noun",
        "meaningEn": "A group of people banded together or treated as a group.",
        "meaningVi": "Đồng môn, nhóm người có cùng đặc điểm",
        "example": "The new cohort of students began their medical studies in September.",
        "exampleVi": "Nhóm sinh viên mới bắt đầu học y vào tháng 9."
      },
      {
        "word": "proctor",
        "phonetic": "/ˈprɒktər/",
        "wordType": "noun",
        "meaningEn": "A person who supervises students during an examination.",
        "meaningVi": "Giám thị (trong kỳ thi)",
        "example": "The proctor walked around the room, ensuring no one cheated.",
        "exampleVi": "Giám thị đi quanh phòng, đảm bảo không ai gian lận."
      },
      {
        "word": "colloquium",
        "phonetic": "/kəˈloʊkwiəm/",
        "wordType": "noun",
        "meaningEn": "An academic conference or seminar.",
        "meaningVi": "Hội thảo học thuật, diễn đàn",
        "example": "The university hosted a colloquium on modern literature.",
        "exampleVi": "Trường đại học đã tổ chức một hội thảo về văn học hiện đại."
      },
      {
        "word": "tutelage",
        "phonetic": "/ˈtuːtəlɪdʒ/",
        "wordType": "noun",
        "meaningEn": "Protection of or authority over someone or something; guardianship.",
        "meaningVi": "Sự hướng dẫn, sự giám hộ",
        "example": "Under the tutelage of Professor Lee, she flourished as a researcher.",
        "exampleVi": "Dưới sự hướng dẫn của Giáo sư Lee, cô ấy đã phát triển mạnh mẽ với tư cách là một nhà nghiên cứu."
      },
      {
        "word": "didactic",
        "phonetic": "/daɪˈdæktɪk/",
        "wordType": "adj",
        "meaningEn": "Intended to teach, particularly in having moral instruction as an ulterior motive.",
        "meaningVi": "Có tính giáo huấn, giáo dục",
        "example": "The novel was criticized for its overly didactic tone.",
        "exampleVi": "Cuốn tiểu thuyết bị chỉ trích vì giọng điệu quá giáo huấn."
      },
      {
        "word": "cognition",
        "phonetic": "/kɒɡˈnɪʃn/",
        "wordType": "noun",
        "meaningEn": "The mental action or process of acquiring knowledge and understanding through thought, experience, and the senses.",
        "meaningVi": "Nhận thức",
        "example": "Child psychologists study the development of cognition in infants.",
        "exampleVi": "Các nhà tâm lý học trẻ em nghiên cứu sự phát triển nhận thức ở trẻ sơ sinh."
      },
      {
        "word": "metacognition",
        "phonetic": "/ˌmɛtəkɒɡˈnɪʃn/",
        "wordType": "noun",
        "meaningEn": "Awareness and understanding of one's own thought processes.",
        "meaningVi": "Siêu nhận thức",
        "example": "Developing metacognition helps students become more effective learners.",
        "exampleVi": "Phát triển siêu nhận thức giúp học sinh trở thành những người học hiệu quả hơn."
      },
      {
        "word": "heuristic",
        "phonetic": "/hjʊˈrɪstɪk/",
        "wordType": "adj",
        "meaningEn": "Enabling a person to discover or learn something for themselves.",
        "meaningVi": "Gợi mở, khám phá (phương pháp)",
        "example": "A heuristic approach to problem-solving encourages self-discovery.",
        "exampleVi": "Một cách tiếp cận gợi mở để giải quyết vấn đề khuyến khích sự tự khám phá."
      },
      {
        "word": "formative",
        "phonetic": "/ˈfɔːrmətɪv/",
        "wordType": "adj",
        "meaningEn": "Serving to form something, especially having a profound influence on a person's development.",
        "meaningVi": "Mang tính định hình, phát triển",
        "example": "The feedback from the formative assessment helped students improve.",
        "exampleVi": "Phản hồi từ đánh giá định hình đã giúp học sinh cải thiện."
      },
      {
        "word": "summative",
        "phonetic": "/ˈsʌmətɪv/",
        "wordType": "adj",
        "meaningEn": "Relating to or constituting a summary; giving a general idea of the whole.",
        "meaningVi": "Mang tính tổng kết",
        "example": "The final exam serves as a summative assessment of their learning.",
        "exampleVi": "Kỳ thi cuối kỳ đóng vai trò là đánh giá tổng kết quá trình học của họ."
      },
      {
        "word": "remedial",
        "phonetic": "/rɪˈmiːdiəl/",
        "wordType": "adj",
        "meaningEn": "Providing a remedy, especially for a deficiency or disability.",
        "meaningVi": "Để khắc phục, cải thiện (thường là học tập)",
        "example": "Some students needed remedial classes in math to catch up.",
        "exampleVi": "Một số học sinh cần các lớp học bổ trợ môn toán để theo kịp."
      },
      {
        "word": "extracurricular",
        "phonetic": "/ˌɛkstrə kəˈrɪkjələr/",
        "wordType": "adj",
        "meaningEn": "Activities or subjects that are not part of the regular school curriculum.",
        "meaningVi": "Ngoại khóa",
        "example": "Joining extracurricular clubs can enhance a student's profile.",
        "exampleVi": "Tham gia các câu lạc bộ ngoại khóa có thể nâng cao hồ sơ của một học sinh."
      },
      {
        "word": "co-curricular",
        "phonetic": "/ˌkoʊ kəˈrɪkjələr/",
        "wordType": "adj",
        "meaningEn": "Activities or learning experiences that are connected to the academic curriculum but typically occur outside of the regular classroom structure.",
        "meaningVi": "Tích hợp với chương trình học chính",
        "example": "Field trips are considered co-curricular activities, linking directly to lessons.",
        "exampleVi": "Các chuyến đi thực tế được coi là hoạt động tích hợp với chương trình học chính, liên kết trực tiếp với các bài học."
      },
      {
        "word": "transdisciplinary",
        "phonetic": "/ˌtrænzˌdɪsɪplɪˈnɛri/",
        "wordType": "adj",
        "meaningEn": "Relating to or involving more than one discipline, but breaking down barriers between them.",
        "meaningVi": "Xuyên ngành",
        "example": "Transdisciplinary research seeks to transcend traditional disciplinary boundaries.",
        "exampleVi": "Nghiên cứu xuyên ngành tìm cách vượt qua ranh giới kỷ luật truyền thống."
      },
      {
        "word": "didacticism",
        "phonetic": "/ˌdaɪˈdæktɪsɪzəm/",
        "wordType": "noun",
        "meaningEn": "The practice of teaching or moral instruction.",
        "meaningVi": "Chủ nghĩa giáo huấn",
        "example": "Critics often debate the role of didacticism in literature.",
        "exampleVi": "Các nhà phê bình thường tranh luận về vai trò của chủ nghĩa giáo huấn trong văn học."
      },
      {
        "word": "praxis",
        "phonetic": "/ˈpræksɪs/",
        "wordType": "noun",
        "meaningEn": "Practice, as distinguished from theory.",
        "meaningVi": "Thực tiễn (khác với lý thuyết)",
        "example": "The course emphasized the importance of praxis, combining theory with practical application.",
        "exampleVi": "Khóa học nhấn mạnh tầm quan trọng của thực tiễn, kết hợp lý thuyết với ứng dụng thực tế."
      },
      {
        "word": "epistemology",
        "phonetic": "/ɪˌpɪstəˈmɒlədʒi/",
        "wordType": "noun",
        "meaningEn": "The theory of knowledge, especially with regard to its methods, validity, and scope, and the distinction between justified belief and opinion.",
        "meaningVi": "Khoa học luận, nhận thức luận",
        "example": "Her thesis explored the epistemology of scientific discovery.",
        "exampleVi": "Luận án của cô ấy đã khám phá khoa học luận về khám phá khoa học."
      },
      {
        "word": "ontology",
        "phonetic": "/ɒnˈtɒlədʒi/",
        "wordType": "noun",
        "meaningEn": "The branch of metaphysics dealing with the nature of being.",
        "meaningVi": "Bản thể luận",
        "example": "Philosophers often debate the ontology of numbers.",
        "exampleVi": "Các nhà triết học thường tranh luận về bản thể luận của các con số."
      },
      {
        "word": "hermeneutics",
        "phonetic": "/ˌhɜːrməˈnjuːtɪks/",
        "wordType": "noun",
        "meaningEn": "The branch of knowledge that deals with interpretation, especially of the Bible or literary texts.",
        "meaningVi": "Giải thích học",
        "example": "Literary criticism often employs various hermeneutics to interpret texts.",
        "exampleVi": "Phê bình văn học thường sử dụng các phương pháp giải thích học khác nhau để diễn giải văn bản."
      },
      {
        "word": "paradigmatic",
        "phonetic": "/ˌpærədɪɡˈmætɪk/",
        "wordType": "adj",
        "meaningEn": "Serving as a typical example or pattern of something.",
        "meaningVi": "Mang tính mẫu mực, ví dụ điển hình",
        "example": "His research became a paradigmatic example of excellence in the field.",
        "exampleVi": "Nghiên cứu của ông đã trở thành một ví dụ mẫu mực về sự xuất sắc trong lĩnh vực này."
      },
      {
        "word": "pedagogical",
        "phonetic": "/ˌpɛdəˈɡɒdʒɪkl/",
        "wordType": "adj",
        "meaningEn": "Relating to teaching.",
        "meaningVi": "Thuộc về sư phạm",
        "example": "The workshop focused on innovative pedagogical methods.",
        "exampleVi": "Hội thảo tập trung vào các phương pháp sư phạm đổi mới."
      },
      {
        "word": "andragogy",
        "phonetic": "/ˈændrəɡɒdʒi/",
        "wordType": "noun",
        "meaningEn": "The method and practice of teaching adult learners.",
        "meaningVi": "Khoa học giáo dục người lớn",
        "example": "Understanding andragogy is crucial for effective adult education programs.",
        "exampleVi": "Hiểu rõ khoa học giáo dục người lớn là rất quan trọng đối với các chương trình giáo dục người lớn hiệu quả."
      },
      {
        "word": "propaedeutic",
        "phonetic": "/ˌproʊpəˈdjuːtɪk/",
        "wordType": "adj",
        "meaningEn": "Providing a preliminary training or instruction.",
        "meaningVi": "Mang tính dự bị, chuẩn bị (cho môn học cao hơn)",
        "example": "The propaedeutic course prepared students for advanced studies.",
        "exampleVi": "Khóa học dự bị đã chuẩn bị cho sinh viên cho các nghiên cứu nâng cao."
      },
      {
        "word": "capstone",
        "phonetic": "/ˈkæpstoʊn/",
        "wordType": "noun",
        "meaningEn": "The culminating project or experience in a program of study.",
        "meaningVi": "Đồ án tốt nghiệp, dự án cuối khóa",
        "example": "Every senior must complete a capstone project to graduate.",
        "exampleVi": "Mỗi sinh viên năm cuối phải hoàn thành một đồ án tốt nghiệp để tốt nghiệp."
      },
      {
        "word": "baccalaureate",
        "phonetic": "/ˌbækəˈlɔːrɪɪt/",
        "wordType": "noun",
        "meaningEn": "A bachelor's degree.",
        "meaningVi": "Bằng cử nhân",
        "example": "She earned her baccalaureate in English literature.",
        "exampleVi": "Cô ấy đã lấy bằng cử nhân văn học Anh."
      },
      {
        "word": "convocation",
        "phonetic": "/ˌkɒnvəˈkeɪʃn/",
        "wordType": "noun",
        "meaningEn": "A large formal assembly of people, especially students and staff at a university.",
        "meaningVi": "Lễ tốt nghiệp, lễ khai giảng (trường đại học)",
        "example": "The university held a special convocation to award honorary degrees.",
        "exampleVi": "Trường đại học đã tổ chức một buổi lễ đặc biệt để trao bằng danh dự."
      },
      {
        "word": "commencement",
        "phonetic": "/kəˈmɛnsmənt/",
        "wordType": "noun",
        "meaningEn": "A ceremony at which degrees or diplomas are conferred on graduating students.",
        "meaningVi": "Lễ tốt nghiệp (đại học)",
        "example": "Families gathered to celebrate commencement day with their graduates.",
        "exampleVi": "Các gia đình tụ tập để chúc mừng ngày lễ tốt nghiệp cùng với các sinh viên tốt nghiệp."
      },
      {
        "word": "docent",
        "phonetic": "/ˈdoʊsənt/",
        "wordType": "noun",
        "meaningEn": "A person who is a lecturer at a university or college, especially in certain European countries; a guide in a museum or art gallery.",
        "meaningVi": "Giảng viên (đại học, đặc biệt ở Châu Âu); Người hướng dẫn (bảo tàng)",
        "example": "The museum docent provided a fascinating tour of the ancient artifacts.",
        "exampleVi": "Người hướng dẫn bảo tàng đã cung cấp một chuyến tham quan hấp dẫn về các hiện vật cổ."
      },
      {
        "word": "rector",
        "phonetic": "/ˈrɛktər/",
        "wordType": "noun",
        "meaningEn": "The head of a university or school, or of a college in some universities.",
        "meaningVi": "Hiệu trưởng (đại học, trường học)",
        "example": "The rector welcomed the new students at the orientation ceremony.",
        "exampleVi": "Hiệu trưởng đã chào đón các sinh viên mới tại buổi lễ định hướng."
      },
      {
        "word": "provost",
        "phonetic": "/ˈprɒvəst/",
        "wordType": "noun",
        "meaningEn": "A senior administrative officer in certain universities.",
        "meaningVi": "Hiệu phó, trưởng khoa (đại học)",
        "example": "The provost oversees academic affairs across all departments.",
        "exampleVi": "Hiệu phó giám sát các vấn đề học thuật trên tất cả các khoa."
      },
      {
        "word": "dean",
        "phonetic": "/diːn/",
        "wordType": "noun",
        "meaningEn": "A head of a university faculty or department.",
        "meaningVi": "Trưởng khoa (đại học)",
        "example": "The Dean of Arts and Sciences announced new curriculum changes.",
        "exampleVi": "Trưởng khoa Nghệ thuật và Khoa học đã công bố những thay đổi chương trình học mới."
      },
      {
        "word": "registrar",
        "phonetic": "/ˈrɛdʒɪstrɑːr/",
        "wordType": "noun",
        "meaningEn": "An official in a college or university who is responsible for keeping student records.",
        "meaningVi": "Trưởng phòng đào tạo (đại học)",
        "example": "Students submit their course registration forms to the registrar's office.",
        "exampleVi": "Sinh viên nộp các mẫu đăng ký khóa học của họ cho văn phòng trưởng phòng đào tạo."
      },
      {
        "word": "tenure",
        "phonetic": "/ˈtɛnjər/",
        "wordType": "noun",
        "meaningEn": "A permanent post as a professor or teacher, usually granted after a probationary period.",
        "meaningVi": "Chức vụ giáo sư/giảng viên ổn định (biên chế)",
        "example": "After seven years, she was granted tenure at the university.",
        "exampleVi": "Sau bảy năm, cô ấy đã được cấp chức vụ giảng viên ổn định tại trường đại học."
      },
      {
        "word": "postdoctoral",
        "phonetic": "/ˌpoʊstˈdɒktərəl/",
        "wordType": "adj",
        "meaningEn": "Relating to study or research carried out after completion of a doctorate.",
        "meaningVi": "Sau tiến sĩ",
        "example": "He accepted a postdoctoral fellowship to continue his research.",
        "exampleVi": "Anh ấy đã nhận học bổng sau tiến sĩ để tiếp tục nghiên cứu của mình."
      },
      {
        "word": "fellowship",
        "phonetic": "/ˈfɛloʊʃɪp/",
        "wordType": "noun",
        "meaningEn": "A sum of money paid by a university or college for the support of a graduate student, research student, or scholar.",
        "meaningVi": "Học bổng nghiên cứu, tình bạn",
        "example": "She applied for a research fellowship to fund her studies abroad.",
        "exampleVi": "Cô ấy đã nộp đơn xin học bổng nghiên cứu để tài trợ cho việc học ở nước ngoài."
      },
      {
        "word": "stipend",
        "phonetic": "/ˈstaɪpɛnd/",
        "wordType": "noun",
        "meaningEn": "A fixed regular sum paid as a salary or allowance.",
        "meaningVi": "Tiền trợ cấp, lương cố định",
        "example": "Graduate students often receive a monthly stipend to cover living expenses.",
        "exampleVi": "Sinh viên sau đại học thường nhận được một khoản trợ cấp hàng tháng để trang trải chi phí sinh hoạt."
      },
      {
        "word": "endowment",
        "phonetic": "/ɪnˈdaʊmənt/",
        "wordType": "noun",
        "meaningEn": "An income or form of property given or bequeathed to an institution or individual.",
        "meaningVi": "Quỹ tài trợ, khoản hiến tặng",
        "example": "The university's endowment helps fund scholarships and research.",
        "exampleVi": "Quỹ tài trợ của trường đại học giúp tài trợ học bổng và nghiên cứu."
      },
      {
        "word": "prerequisite",
        "phonetic": "/ˌpriːˈrɛkwɪzɪt/",
        "wordType": "noun",
        "meaningEn": "A thing that is required as a prior condition for something else to happen or exist.",
        "meaningVi": "Điều kiện tiên quyết",
        "example": "Calculus is a prerequisite for advanced physics courses.",
        "exampleVi": "Giải tích là điều kiện tiên quyết cho các khóa học vật lý nâng cao."
      },
      {
        "word": "corequisite",
        "phonetic": "/ˌkoʊˈrɛkwɪzɪt/",
        "wordType": "noun",
        "meaningEn": "A course that must be taken at the same time as another course.",
        "meaningVi": "Môn học song hành",
        "example": "The lab session is a corequisite for the lecture on organic chemistry.",
        "exampleVi": "Buổi thực hành là môn học song hành với bài giảng về hóa hữu cơ."
      },
      {
        "word": "elective",
        "phonetic": "/ɪˈlɛktɪv/",
        "wordType": "noun",
        "meaningEn": "An optional course of study.",
        "meaningVi": "Môn học tự chọn",
        "example": "Students can choose two electives in their final year.",
        "exampleVi": "Học sinh có thể chọn hai môn học tự chọn trong năm cuối."
      },
      {
        "word": "credit",
        "phonetic": "/ˈkrɛdɪt/",
        "wordType": "noun",
        "meaningEn": "A unit of study in a college or university, usually one representing one hour of class a week for one term.",
        "meaningVi": "Tín chỉ (học phần)",
        "example": "This course is worth three academic credits.",
        "exampleVi": "Khóa học này có giá trị ba tín chỉ học thuật."
      },
      {
        "word": "transcript",
        "phonetic": "/ˈtrænˌskrɪpt/",
        "wordType": "noun",
        "meaningEn": "An official record of a student's grades and courses.",
        "meaningVi": "Bảng điểm, học bạ",
        "example": "You'll need to submit your academic transcript with your application.",
        "exampleVi": "Bạn sẽ cần nộp bảng điểm học tập của mình cùng với đơn đăng ký."
      },
      {
        "word": "cum laude",
        "phonetic": "/kʊm ˈlaʊdeɪ/",
        "wordType": "adv",
        "meaningEn": "With honor; often used to indicate a level of academic distinction when a degree is awarded.",
        "meaningVi": "Với danh dự (một cấp độ khen ngợi trong bằng cấp)",
        "example": "She graduated cum laude from a prestigious university.",
        "exampleVi": "Cô ấy tốt nghiệp với danh dự từ một trường đại học danh tiếng."
      },
      {
        "word": "magna cum laude",
        "phonetic": "/ˈmæɡnə kʊm ˈlaʊdeɪ/",
        "wordType": "adv",
        "meaningEn": "With great honor; a higher level of academic distinction than cum laude.",
        "meaningVi": "Với danh dự lớn (cấp độ khen ngợi cao hơn cum laude)",
        "example": "He received his bachelor's degree magna cum laude.",
        "exampleVi": "Anh ấy nhận bằng cử nhân với danh dự lớn."
      },
      {
        "word": "summa cum laude",
        "phonetic": "/ˈsʊmə kʊm ˈlaʊdeɪ/",
        "wordType": "adv",
        "meaningEn": "With highest honor; the highest level of academic distinction.",
        "meaningVi": "Với danh dự cao nhất (cấp độ khen ngợi cao nhất)",
        "example": "Only a few students manage to graduate summa cum laude each year.",
        "exampleVi": "Chỉ một số ít sinh viên quản lý để tốt nghiệp với danh dự cao nhất mỗi năm."
      }
    ]
  },
  {
    "id": "clothes",
    "title": "Trang phục & Thời trang (Clothes & Fashion)",
    "desc": "Từ vựng về các loại quần áo, phụ kiện thời trang và phong cách ăn mặc.",
    "color": "border-rose-200 bg-rose-50/50 text-rose-800 hover:border-rose-400 dark:bg-slate-900/50 dark:border-slate-800 dark:text-rose-400",
    "beginner": [
      {
        "word": "shirt",
        "phonetic": "/ʃɜːt/",
        "wordType": "noun",
        "meaningEn": "a collar-bearing shirt or lightweight top",
        "meaningVi": "áo sơ mi",
        "example": "He wore a white shirt.",
        "exampleVi": "Anh ấy đã mặc một chiếc áo sơ mi trắng."
      },
      {
        "word": "pants",
        "phonetic": "/pænts/",
        "wordType": "noun",
        "meaningEn": "trousers",
        "meaningVi": "quần dài",
        "example": "These pants are too long.",
        "exampleVi": "Chiếc quần dài này quá dài."
      },
      {
        "word": "shoes",
        "phonetic": "/ʃuːz/",
        "wordType": "noun",
        "meaningEn": "coverings for the feet, typically made of leather",
        "meaningVi": "giày, đôi giày",
        "example": "Take off your shoes.",
        "exampleVi": "Hãy cởi giày của bạn ra."
      },
      {
        "word": "dress",
        "phonetic": "/dres/",
        "wordType": "noun",
        "meaningEn": "a one-piece garment for a woman or girl",
        "meaningVi": "váy liền",
        "example": "She wore a red dress.",
        "exampleVi": "Cô ấy đã mặc một chiếc váy đỏ."
      },
      {
        "word": "hat",
        "phonetic": "/hæt/",
        "wordType": "noun",
        "meaningEn": "a covering for the head",
        "meaningVi": "mũ, nón",
        "example": "Put on your hat.",
        "exampleVi": "Đội mũ vào đi."
      },
      {
        "word": "jacket",
        "phonetic": "/ˈdʒæk.ɪt/",
        "wordType": "noun",
        "meaningEn": "a short coat",
        "meaningVi": "áo khoác ngắn",
        "example": "It is cold, wear a jacket.",
        "exampleVi": "Trời lạnh đấy, hãy mặc áo khoác."
      },
      {
        "word": "socks",
        "phonetic": "/sɒks/",
        "wordType": "noun",
        "meaningEn": "coverings for the feet, worn inside shoes",
        "meaningVi": "tất, vớ",
        "example": "My socks are wet.",
        "exampleVi": "Tất của tôi bị ướt rồi."
      },
      {
        "word": "coat",
        "phonetic": "/kəʊt/",
        "wordType": "noun",
        "meaningEn": "an outer piece of clothing with sleeves, worn to keep warm",
        "meaningVi": "áo khoác dài, măng tô",
        "example": "A heavy coat for winter.",
        "exampleVi": "Một chiếc áo khoác dày cho mùa đông."
      },
      {
        "word": "skirt",
        "phonetic": "/skɜːt/",
        "wordType": "noun",
        "meaningEn": "a garment fastened around the waist and hanging down around the legs",
        "meaningVi": "chân váy",
        "example": "She wore a long black skirt.",
        "exampleVi": "Cô ấy đã mặc một chiếc chân váy đen dài."
      },
      {
        "word": "jeans",
        "phonetic": "/dʒiːnz/",
        "wordType": "noun",
        "meaningEn": "trousers made of denim, a strong cotton fabric",
        "meaningVi": "quần bò, quần jeans",
        "example": "He loves wearing blue jeans.",
        "exampleVi": "Anh ấy thích mặc quần jeans xanh."
      },
      {
        "word": "tie",
        "phonetic": "/taɪ/",
        "wordType": "noun",
        "meaningEn": "a strip of fabric worn around the collar and tied in front",
        "meaningVi": "cà vạt",
        "example": "He wore a red tie to the wedding.",
        "exampleVi": "Anh ấy đã thắt cà vạt đỏ đi đám cưới."
      },
      {
        "word": "belt",
        "phonetic": "/belt/",
        "wordType": "noun",
        "meaningEn": "a band of leather worn around the waist to support clothes",
        "meaningVi": "thắt lưng, dây nịt",
        "example": "Your belt matches your shoes.",
        "exampleVi": "Thắt lưng của bạn rất hợp với đôi giày."
      },
      {
        "word": "boot",
        "phonetic": "/buːt/",
        "wordType": "noun",
        "meaningEn": "a sturdy item of footwear covering the foot and the ankle",
        "meaningVi": "đôi ủng, giày cao cổ",
        "example": "Heavy boots for hiking.",
        "exampleVi": "Đôi giày cao cổ dày để đi leo núi."
      },
      {
        "word": "glove",
        "phonetic": "/ɡlʌv/",
        "wordType": "noun",
        "meaningEn": "a covering for the hand with individual sheaths for each finger",
        "meaningVi": "găng tay, bao tay",
        "example": "Wear gloves in the winter.",
        "exampleVi": "Hãy đeo găng tay vào mùa đông."
      },
      {
        "word": "scarf",
        "phonetic": "/skɑːf/",
        "wordType": "noun",
        "meaningEn": "a length of fabric worn around the neck or shoulders",
        "meaningVi": "khăn quàng cổ",
        "example": "She wrapped a woolen scarf around her neck.",
        "exampleVi": "Cô ấy quấn một chiếc khăn len quanh cổ."
      },
      {
        "word": "suit",
        "phonetic": "/suːt/",
        "wordType": "noun",
        "meaningEn": "a set of outer clothes made of the same fabric, typically including a jacket and trousers",
        "meaningVi": "bộ vest, comple",
        "example": "He wore a formal suit to the interview.",
        "exampleVi": "Anh ấy đã mặc một bộ vest lịch sự đi phỏng vấn."
      },
      {
        "word": "blouse",
        "phonetic": "/blaʊz/",
        "wordType": "noun",
        "meaningEn": "a loose-fitting upper garment like a shirt for women",
        "meaningVi": "áo sơ mi nữ, áo kiểu",
        "example": "She bought a silk blouse.",
        "exampleVi": "Cô ấy đã mua một chiếc áo sơ mi kiểu bằng lụa."
      },
      {
        "word": "sneakers",
        "phonetic": "/ˈsniː.kəz/",
        "wordType": "noun pl",
        "meaningEn": "soft shoes worn for sports or casual activities",
        "meaningVi": "giày thể thao",
        "example": "I wear comfortable sneakers for running.",
        "exampleVi": "Tôi đi đôi giày thể thao thoải mái để chạy bộ."
      },
      {
        "word": "umbrella",
        "phonetic": "/ʌmˈbrel.ə/",
        "wordType": "noun",
        "meaningEn": "a folding canopy on a central rod, used for protection against rain",
        "meaningVi": "cái ô, cái dù",
        "example": "Take an umbrella, it is raining.",
        "exampleVi": "Mang theo ô đi, trời đang mưa đấy."
      },
      {
        "word": "uniform",
        "phonetic": "/ˈjuː.nɪ.fɔːm/",
        "wordType": "noun",
        "meaningEn": "distinctive clothing worn by members of the same organization",
        "meaningVi": "đồng phục",
        "example": "School children must wear uniforms.",
        "exampleVi": "Học sinh đi học phải mặc đồng phục."
      },
      {
        "word": "pajamas",
        "phonetic": "/pəˈdʒɑː.məz/",
        "wordType": "noun pl",
        "meaningEn": "loose jacket and trousers worn in bed",
        "meaningVi": "quần áo ngủ, đồ ngủ",
        "example": "He put on his pajamas before going to bed.",
        "exampleVi": "Anh ta mặc quần áo ngủ trước khi lên giường đi ngủ."
      },
      {
        "word": "shorts",
        "phonetic": "/ʃɔːts/",
        "wordType": "noun pl",
        "meaningEn": "trousers that end above the knee",
        "meaningVi": "quần đùi, quần short",
        "example": "He wears shorts in summer.",
        "exampleVi": "Cậu ấy mặc quần đùi vào mùa hè."
      },
      {
        "word": "sweater",
        "phonetic": "/ˈswet.ər/",
        "wordType": "noun",
        "meaningEn": "a knitted garment with long sleeves, worn over upper body to keep warm",
        "meaningVi": "áo len dài tay",
        "example": "She knitted a warm wool sweater.",
        "exampleVi": "Cô ấy đã đan một chiếc áo len ấm bằng len."
      },
      {
        "word": "necklace",
        "phonetic": "/ˈnek.ləs/",
        "wordType": "noun",
        "meaningEn": "a piece of jewelry worn around the neck",
        "meaningVi": "vòng cổ, dây chuyền",
        "example": "She wore a beautiful pearl necklace.",
        "exampleVi": "Cô ấy đã đeo một chiếc vòng cổ ngọc trai tuyệt đẹp."
      },
      {
        "word": "glasses",
        "phonetic": "/ˈɡlɑː.sɪz/",
        "wordType": "noun pl",
        "meaningEn": "two lenses in a frame that rests on ears and nose to aid vision",
        "meaningVi": "kính đeo mắt",
        "example": "I need reading glasses.",
        "exampleVi": "Tôi cần kính đeo để đọc sách."
      },
      {
        "word": "t-shirt",
        "phonetic": "/ˈtiː.ʃɜːt/",
        "wordType": "noun",
        "meaningEn": "A casual short-sleeved top, usually made of cotton.",
        "meaningVi": "Áo phông, áo thun",
        "example": "I like to wear a simple t-shirt with jeans.",
        "exampleVi": "Tôi thích mặc áo phông đơn giản với quần jean."
      },
      {
        "word": "cardigan",
        "phonetic": "/ˈkɑːr.dɪ.ɡən/",
        "wordType": "noun",
        "meaningEn": "A knitted jacket, often without a collar, that fastens at the front.",
        "meaningVi": "Áo khoác len cài cúc",
        "example": "She wore a soft cardigan over her dress.",
        "exampleVi": "Cô ấy mặc một chiếc áo khoác len mềm mại bên ngoài chiếc váy."
      },
      {
        "word": "hoodie",
        "phonetic": "/ˈhʊd.i/",
        "wordType": "noun",
        "meaningEn": "A sweatshirt with a hood.",
        "meaningVi": "Áo nỉ có mũ",
        "example": "He likes to wear his favorite hoodie when it's cold.",
        "exampleVi": "Anh ấy thích mặc chiếc áo nỉ có mũ yêu thích khi trời lạnh."
      },
      {
        "word": "leggings",
        "phonetic": "/ˈleɡ.ɪŋz/",
        "wordType": "noun",
        "meaningEn": "Tight-fitting trousers made of stretchy material, worn by women and girls.",
        "meaningVi": "Quần bó, quần legging",
        "example": "She wears leggings for yoga.",
        "exampleVi": "Cô ấy mặc quần legging để tập yoga."
      },
      {
        "word": "sweatpants",
        "phonetic": "/ˈswet.pænts/",
        "wordType": "noun",
        "meaningEn": "Loose, comfortable trousers, often made of cotton, worn for exercise or relaxation.",
        "meaningVi": "Quần thể thao, quần nỉ",
        "example": "He put on sweatpants after his workout.",
        "exampleVi": "Anh ấy mặc quần thể thao sau buổi tập."
      },
      {
        "word": "raincoat",
        "phonetic": "/ˈreɪn.koʊt/",
        "wordType": "noun",
        "meaningEn": "A coat designed to protect the wearer from rain.",
        "meaningVi": "Áo mưa",
        "example": "Don't forget your raincoat, it's raining.",
        "exampleVi": "Đừng quên áo mưa của bạn, trời đang mưa."
      },
      {
        "word": "vest",
        "phonetic": "/vest/",
        "wordType": "noun",
        "meaningEn": "A piece of clothing that you wear on the upper part of your body over a shirt, often with no sleeves.",
        "meaningVi": "Áo ghi lê, áo vest (không tay)",
        "example": "He wore a vest under his suit jacket.",
        "exampleVi": "Anh ấy mặc một chiếc áo ghi lê bên trong áo vest."
      },
      {
        "word": "swimsuit",
        "phonetic": "/ˈswɪm.suːt/",
        "wordType": "noun",
        "meaningEn": "A piece of clothing worn for swimming.",
        "meaningVi": "Đồ bơi",
        "example": "She packed her swimsuit for the beach trip.",
        "exampleVi": "Cô ấy đã đóng gói đồ bơi cho chuyến đi biển."
      },
      {
        "word": "bikini",
        "phonetic": "/bɪˈkiː.ni/",
        "wordType": "noun",
        "meaningEn": "A two-piece swimming costume for women.",
        "meaningVi": "Áo tắm bikini",
        "example": "She bought a new bikini for her vacation.",
        "exampleVi": "Cô ấy đã mua một bộ bikini mới cho kỳ nghỉ của mình."
      },
      {
        "word": "sandals",
        "phonetic": "/ˈsæn.dəlz/",
        "wordType": "noun",
        "meaningEn": "Light shoes, open at the top and consisting of straps holding the sole to the foot.",
        "meaningVi": "Dép xăng-đan",
        "example": "I wear sandals in the summer.",
        "exampleVi": "Tôi đi xăng-đan vào mùa hè."
      },
      {
        "word": "slippers",
        "phonetic": "/ˈslɪp.ərz/",
        "wordType": "noun",
        "meaningEn": "Soft, comfortable shoes worn inside the house.",
        "meaningVi": "Dép đi trong nhà",
        "example": "He always wears slippers when he's at home.",
        "exampleVi": "Anh ấy luôn đi dép đi trong nhà khi ở nhà."
      },
      {
        "word": "high heels",
        "phonetic": "/ˌhaɪ ˈhiːlz/",
        "wordType": "noun",
        "meaningEn": "Shoes in which the heels are raised high off the ground.",
        "meaningVi": "Giày cao gót",
        "example": "She loves wearing high heels for special occasions.",
        "exampleVi": "Cô ấy thích đi giày cao gót vào những dịp đặc biệt."
      },
      {
        "word": "flip-flops",
        "phonetic": "/ˈflɪp.flɒps/",
        "wordType": "noun",
        "meaningEn": "Open shoes, usually made of plastic or rubber, with a V-shaped strap that goes between the big toe and the toe next to it.",
        "meaningVi": "Dép tông, dép xỏ ngón",
        "example": "I wear flip-flops to the beach.",
        "exampleVi": "Tôi đi dép tông ra biển."
      },
      {
        "word": "watch",
        "phonetic": "/wɑːtʃ/",
        "wordType": "noun",
        "meaningEn": "A small clock that you wear on your wrist or carry in your pocket.",
        "meaningVi": "Đồng hồ đeo tay",
        "example": "He received a new watch for his birthday.",
        "exampleVi": "Anh ấy đã nhận được một chiếc đồng hồ mới vào ngày sinh nhật."
      },
      {
        "word": "bracelet",
        "phonetic": "/ˈbreɪs.lət/",
        "wordType": "noun",
        "meaningEn": "A piece of jewelry worn around the wrist.",
        "meaningVi": "Vòng tay",
        "example": "She has a beautiful silver bracelet.",
        "exampleVi": "Cô ấy có một chiếc vòng tay bạc rất đẹp."
      },
      {
        "word": "earrings",
        "phonetic": "/ˈɪə.rɪŋz/",
        "wordType": "noun",
        "meaningEn": "Pieces of jewelry worn on the ears.",
        "meaningVi": "Hoa tai, khuyên tai",
        "example": "She chose a pair of pearl earrings for the wedding.",
        "exampleVi": "Cô ấy chọn một đôi khuyên tai ngọc trai cho đám cưới."
      },
      {
        "word": "ring",
        "phonetic": "/rɪŋ/",
        "wordType": "noun",
        "meaningEn": "A circular band, typically of metal, worn on a finger as an ornament or a token of marriage, engagement, or association.",
        "meaningVi": "Nhẫn",
        "example": "He gave her an engagement ring.",
        "exampleVi": "Anh ấy đã tặng cô ấy một chiếc nhẫn đính hôn."
      },
      {
        "word": "purse",
        "phonetic": "/pɜːrs/",
        "wordType": "noun",
        "meaningEn": "A small bag carried by women to hold money, keys, etc., or a small bag for money, used especially by a woman.",
        "meaningVi": "Ví (tiền), túi xách nhỏ (của phụ nữ)",
        "example": "She keeps her keys in her purse.",
        "exampleVi": "Cô ấy để chìa khóa trong ví của mình."
      },
      {
        "word": "wallet",
        "phonetic": "/ˈwɑː.lɪt/",
        "wordType": "noun",
        "meaningEn": "A small folding case for carrying paper money, credit cards, and other small flat items.",
        "meaningVi": "Ví (đựng tiền, thẻ)",
        "example": "He keeps his money and cards in his wallet.",
        "exampleVi": "Anh ấy giữ tiền và thẻ trong ví của mình."
      },
      {
        "word": "backpack",
        "phonetic": "/ˈbæk.pæk/",
        "wordType": "noun",
        "meaningEn": "A bag with shoulder straps that allows it to be carried on someone's back.",
        "meaningVi": "Ba lô",
        "example": "I packed my books in my backpack for school.",
        "exampleVi": "Tôi đã đóng sách vào ba lô để đi học."
      },
      {
        "word": "handbag",
        "phonetic": "/ˈhænd.bæɡ/",
        "wordType": "noun",
        "meaningEn": "A bag carried by a woman, often for fashion, that is used to hold personal items.",
        "meaningVi": "Túi xách tay",
        "example": "She chose a new leather handbag to match her shoes.",
        "exampleVi": "Cô ấy đã chọn một chiếc túi xách da mới để hợp với đôi giày của mình."
      },
      {
        "word": "cap",
        "phonetic": "/kæp/",
        "wordType": "noun",
        "meaningEn": "A type of hat that fits closely around the head, often with a peak projecting forwards.",
        "meaningVi": "Mũ lưỡi trai",
        "example": "He wears a baseball cap when playing sports.",
        "exampleVi": "Anh ấy đội mũ lưỡi trai khi chơi thể thao."
      },
      {
        "word": "beanie",
        "phonetic": "/ˈbiː.ni/",
        "wordType": "noun",
        "meaningEn": "A close-fitting cap, usually made of wool and without a brim.",
        "meaningVi": "Mũ len ôm đầu",
        "example": "She wears a beanie in cold weather.",
        "exampleVi": "Cô ấy đội mũ len ôm đầu khi trời lạnh."
      },
      {
        "word": "gloves",
        "phonetic": "/ɡlʌvz/",
        "wordType": "noun",
        "meaningEn": "Pieces of clothing that you wear on your hands to protect them or to keep them warm.",
        "meaningVi": "Găng tay",
        "example": "I need warm gloves for the snow.",
        "exampleVi": "Tôi cần găng tay ấm để đi tuyết."
      },
      {
        "word": "bra",
        "phonetic": "/brɑː/",
        "wordType": "noun",
        "meaningEn": "A piece of underwear worn by women to support their breasts.",
        "meaningVi": "Áo ngực",
        "example": "She bought a new comfortable bra.",
        "exampleVi": "Cô ấy đã mua một chiếc áo ngực mới thoải mái."
      },
      {
        "word": "underwear",
        "phonetic": "/ˈʌn.dər.wer/",
        "wordType": "noun",
        "meaningEn": "Clothes that you wear under other clothes, next to your skin.",
        "meaningVi": "Đồ lót",
        "example": "You should change your underwear every day.",
        "exampleVi": "Bạn nên thay đồ lót mỗi ngày."
      },
      {
        "word": "boxers",
        "phonetic": "/ˈbɒk.sərz/",
        "wordType": "noun",
        "meaningEn": "Men's loose-fitting shorts worn as underwear.",
        "meaningVi": "Quần đùi nam (đồ lót)",
        "example": "He prefers to wear boxers instead of briefs.",
        "exampleVi": "Anh ấy thích mặc quần đùi nam thay vì quần sịp tam giác."
      },
      {
        "word": "briefs",
        "phonetic": "/briːfs/",
        "wordType": "noun",
        "meaningEn": "Short, close-fitting underwear, usually for men.",
        "meaningVi": "Quần sịp tam giác (nam)",
        "example": "He chose a pair of cotton briefs.",
        "exampleVi": "Anh ấy đã chọn một chiếc quần sịp tam giác bằng cotton."
      },
      {
        "word": "stockings",
        "phonetic": "/ˈstɒk.ɪŋz/",
        "wordType": "noun",
        "meaningEn": "Long socks that cover the foot and leg, sometimes up to the hip.",
        "meaningVi": "Tất dài, vớ da",
        "example": "She wore silk stockings with her evening dress.",
        "exampleVi": "Cô ấy mặc quần tất lụa với chiếc váy dạ hội của mình."
      },
      {
        "word": "tights",
        "phonetic": "/taɪts/",
        "wordType": "noun",
        "meaningEn": "A piece of clothing made of thin, elastic material that covers the legs and lower part of the body.",
        "meaningVi": "Quần tất (thường dùng cho nữ và trẻ em)",
        "example": "Little girls often wear tights with dresses.",
        "exampleVi": "Các bé gái thường mặc quần tất với váy."
      },
      {
        "word": "apron",
        "phonetic": "/ˈeɪ.prən/",
        "wordType": "noun",
        "meaningEn": "A piece of clothing that you wear over the front of your normal clothes to keep them clean when you are cooking or doing other messy work.",
        "meaningVi": "Tạp dề",
        "example": "She put on an apron before she started baking.",
        "exampleVi": "Cô ấy đeo tạp dề trước khi bắt đầu nướng bánh."
      },
      {
        "word": "bow tie",
        "phonetic": "/ˈboʊ ˌtaɪ/",
        "wordType": "noun",
        "meaningEn": "A knot of ribbon or other material worn by men around the neck under the collar of a shirt, tied in a bow.",
        "meaningVi": "Nơ cổ",
        "example": "He wore a black bow tie with his tuxedo.",
        "exampleVi": "Anh ấy đeo một chiếc nơ đen với bộ lễ phục của mình."
      },
      {
        "word": "sunglasses",
        "phonetic": "/ˈsʌnˌɡlɑːs.ɪz/",
        "wordType": "noun",
        "meaningEn": "Glasses with dark lenses that protect your eyes from the sun.",
        "meaningVi": "Kính râm",
        "example": "Don't forget your sunglasses on a sunny day.",
        "exampleVi": "Đừng quên kính râm của bạn vào một ngày nắng."
      },
      {
        "word": "button",
        "phonetic": "/ˈbʌt.ən/",
        "wordType": "noun",
        "meaningEn": "A small, usually round object sewn onto a piece of clothing and used to fasten it by being pushed through a hole or loop.",
        "meaningVi": "Cúc áo",
        "example": "This shirt has too many buttons.",
        "exampleVi": "Chiếc áo này có quá nhiều cúc áo."
      },
      {
        "word": "zipper",
        "phonetic": "/ˈzɪp.ər/",
        "wordType": "noun",
        "meaningEn": "A device consisting of two rows of metal or plastic teeth on strips of fabric that are closed or opened by pulling a slide between them, used to fasten or open clothes, bags, etc.",
        "meaningVi": "Khóa kéo",
        "example": "My jacket zipper is stuck.",
        "exampleVi": "Khóa kéo áo khoác của tôi bị kẹt."
      },
      {
        "word": "pocket",
        "phonetic": "/ˈpɒk.ɪt/",
        "wordType": "noun",
        "meaningEn": "A small bag sewn into a piece of clothing, used for carrying small articles.",
        "meaningVi": "Túi quần áo",
        "example": "He put his phone in his pocket.",
        "exampleVi": "Anh ấy bỏ điện thoại vào túi quần."
      },
      {
        "word": "sleeve",
        "phonetic": "/sliːv/",
        "wordType": "noun",
        "meaningEn": "The part of a garment that covers an arm.",
        "meaningVi": "Tay áo",
        "example": "This shirt has long sleeves.",
        "exampleVi": "Chiếc áo này có tay áo dài."
      }
    ],
    "advanced": [
      {
        "word": "outfit",
        "phonetic": "/ˈaʊt.fɪt/",
        "wordType": "noun",
        "meaningEn": "a set of clothes worn for a particular occasion",
        "meaningVi": "bộ đồ, trang phục",
        "example": "That is a beautiful outfit.",
        "exampleVi": "Đó thật sự là một bộ trang phục đẹp."
      },
      {
        "word": "fabric",
        "phonetic": "/ˈfæb.rɪk/",
        "wordType": "noun",
        "meaningEn": "cloth or material for making clothes",
        "meaningVi": "chất liệu vải",
        "example": "This fabric is soft and light.",
        "exampleVi": "Chất liệu vải này mềm mại và nhẹ nhàng."
      },
      {
        "word": "accessory",
        "phonetic": "/ækˈses.ər.i/",
        "wordType": "noun",
        "meaningEn": "something added to clothing that has a decorative purpose",
        "meaningVi": "phụ kiện thời trang",
        "example": "Hats and belts are accessories.",
        "exampleVi": "Mũ và thắt lưng là các phụ kiện thời trang."
      },
      {
        "word": "wardrobe",
        "phonetic": "/ˈwɔː.drəʊb/",
        "wordType": "noun",
        "meaningEn": "a person's entire collection of clothes",
        "meaningVi": "tủ quần áo, kho quần áo",
        "example": "I need to clean my wardrobe.",
        "exampleVi": "Tôi cần dọn dẹp lại tủ quần áo của mình."
      },
      {
        "word": "tailored",
        "phonetic": "/ˈteɪ.ləd/",
        "wordType": "adj",
        "meaningEn": "made to fit the individual buyer, or well-fitted",
        "meaningVi": "may đo riêng, vừa vặn",
        "example": "A tailored suit fits best.",
        "exampleVi": "Một bộ vest được may đo riêng là vừa vặn nhất."
      },
      {
        "word": "casual",
        "phonetic": "/ˈkæʒ.ju.əl/",
        "wordType": "adj",
        "meaningEn": "informal and comfortable clothes worn for everyday activities",
        "meaningVi": "bình thường, thường phục",
        "example": "Casual wear is allowed.",
        "exampleVi": "Quần áo thường nhật được cho phép."
      },
      {
        "word": "formal",
        "phonetic": "/ˈfɔː.məl/",
        "wordType": "adj",
        "meaningEn": "clothes suitable for official or serious occasions",
        "meaningVi": "trang trọng, lịch sự",
        "example": "Formal attire is required.",
        "exampleVi": "Trang phục lịch sự là buộc phải có."
      },
      {
        "word": "vintage",
        "phonetic": "/ˈvɪn.tɪdʒ/",
        "wordType": "adj",
        "meaningEn": "high quality clothes from a previous era",
        "meaningVi": "cổ điển, thời trang vintage",
        "example": "She loves vintage fashion.",
        "exampleVi": "Cô ấy yêu thích phong cách thời trang cổ điển."
      },
      {
        "word": "flamboyant",
        "phonetic": "/flæmˈbɔɪ.ənt/",
        "wordType": "adj",
        "meaningEn": "bright, colorful, and very noticeable",
        "meaningVi": "sặc sỡ, rực rỡ, chói lọi",
        "example": "He wears flamboyant clothes.",
        "exampleVi": "Anh ấy mặc những bộ trang phục sặc sỡ."
      },
      {
        "word": "monochrome",
        "phonetic": "/ˈmɒn.ə.krəʊm/",
        "wordType": "adj",
        "meaningEn": "using only one color or shades of one color",
        "meaningVi": "đơn sắc",
        "example": "She prefers monochrome designs.",
        "exampleVi": "Cô ấy thích các thiết kế đơn sắc."
      },
      {
        "word": "haute couture",
        "phonetic": "/ˌəʊt kuːˈtjʊər/",
        "wordType": "noun",
        "meaningEn": "high-fashion designing and dressmaking",
        "meaningVi": "thời trang cao cấp",
        "example": "Paris is famous for haute couture.",
        "exampleVi": "Paris nổi tiếng với thời trang cao cấp."
      },
      {
        "word": "symmetrical",
        "phonetic": "/sɪˈme.trɪ.kəl/",
        "wordType": "adj",
        "meaningEn": "having two parts that match each other exactly",
        "meaningVi": "đối xứng",
        "example": "The dress has a symmetrical design.",
        "exampleVi": "Chiếc váy có thiết kế đối xứng."
      },
      {
        "word": "runway",
        "phonetic": "/ˈrun.weɪ/",
        "wordType": "noun",
        "meaningEn": "the stage that models walk along to show off clothes",
        "meaningVi": "sàn diễn thời trang",
        "example": "Models walked down the runway.",
        "exampleVi": "Các người mẫu sải bước trên sàn diễn thời trang."
      },
      {
        "word": "counterfeit",
        "phonetic": "/ˈkaʊn.tə.fɪt/",
        "wordType": "adj/noun",
        "meaningEn": "made in exact imitation of something valuable to deceive",
        "meaningVi": "hàng giả, hàng nhái",
        "example": "Beware of counterfeit luxury bags.",
        "exampleVi": "Hãy cẩn thận với những chiếc túi xách sang trọng giả."
      },
      {
        "word": "fabrication",
        "phonetic": "/ˌfæb.rɪˈkeɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "the action or process of manufacturing a fabric",
        "meaningVi": "sự chế tạo, chất lượng vải dệt",
        "example": "High-quality fabrication process.",
        "exampleVi": "Quy trình dệt chế tạo chất lượng cao."
      },
      {
        "word": "garment",
        "phonetic": "/ˈɡɑː.mənt/",
        "wordType": "noun",
        "meaningEn": "an item of clothing",
        "meaningVi": "áo quần, trang phục dệt may",
        "example": "Keep garments clean and dry.",
        "exampleVi": "Giữ trang phục dệt may luôn sạch sẽ và khô ráo."
      },
      {
        "word": "textile",
        "phonetic": "/ˈteks.taɪl/",
        "wordType": "noun",
        "meaningEn": "a type of cloth or woven fabric",
        "meaningVi": "vải dệt, ngành dệt may",
        "example": "Vietnam is a large textile exporter.",
        "exampleVi": "Việt Nam là nhà xuất khẩu hàng dệt may lớn."
      },
      {
        "word": "apparel",
        "phonetic": "/əˈpær.əl/",
        "wordType": "noun",
        "meaningEn": "clothing or attire, especially formal dress",
        "meaningVi": "y phục, quần áo trưng bày",
        "example": "The store sells athletic apparel.",
        "exampleVi": "Cửa hàng bán quần áo thể thao."
      },
      {
        "word": "avant-garde",
        "phonetic": "/ˌæv.ɒ̃ˈɡɑːd/",
        "wordType": "adj",
        "meaningEn": "favoring or introducing experimental or unusual ideas",
        "meaningVi": "phong cách tiên phong, độc dị",
        "example": "She designs avant-garde fashion.",
        "exampleVi": "Cô ấy thiết kế thời trang phong cách tiên phong."
      },
      {
        "word": "embroidery",
        "phonetic": "/ɪmˈbrɔɪ.dər.i/",
        "wordType": "noun",
        "meaningEn": "the art or pastime of embroidering cloth with needlework",
        "meaningVi": "nghệ thuật thêu hoa văn",
        "example": "The dress has gold embroidery on the collar.",
        "exampleVi": "Chiếc váy có thêu hoa văn chỉ vàng ở cổ."
      },
      {
        "word": "boutique",
        "phonetic": "/buːˈtiːk/",
        "wordType": "noun",
        "meaningEn": "a small shop selling fashionable clothes or accessories",
        "meaningVi": "cửa hàng thời trang nhỏ sang trọng",
        "example": "She owns a designer boutique downtown.",
        "exampleVi": "Cô ấy sở hữu một boutique thiết kế ở trung tâm thành phố."
      },
      {
        "word": "ensemble",
        "phonetic": "/ɒnˈsɒm.bəl/",
        "wordType": "noun",
        "meaningEn": "a group of items viewed as a whole, specifically a coordinated outfit",
        "meaningVi": "bộ cánh phối hợp đồng bộ",
        "example": "Her elegant ensemble drew praise.",
        "exampleVi": "Bộ cánh phối hợp thanh lịch của cô ấy đã nhận được nhiều lời khen ngợi."
      },
      {
        "word": "mannequin",
        "phonetic": "/ˈmæn.ɪ.kɪn/",
        "wordType": "noun",
        "meaningEn": "a dummy used to display clothes in a shop window",
        "meaningVi": "ma-nơ-canh",
        "example": "The clothes looked great on the mannequin.",
        "exampleVi": "Quần áo trông rất tuyệt trên ma-nơ-canh."
      },
      {
        "word": "silhouette",
        "phonetic": "/ˌsɪl.uˈet/",
        "wordType": "noun",
        "meaningEn": "the dark shape and outline of someone or something, in fashion: outline of garment",
        "meaningVi": "phom dáng, hình bóng thiết kế",
        "example": "The dress has a classic A-line silhouette.",
        "exampleVi": "Chiếc váy sở hữu phom dáng chữ A cổ điển."
      },
      {
        "word": "attire",
        "phonetic": "/əˈtaɪər/",
        "wordType": "noun",
        "meaningEn": "clothing, especially formal or specific clothes",
        "meaningVi": "trang phục nghiêm trang",
        "example": "Proper business attire is required.",
        "exampleVi": "Yêu cầu trang phục công sở chỉnh tề."
      },
      {
        "word": "chic",
        "phonetic": "/ʃiːk/",
        "wordType": "adj",
        "meaningEn": "Stylish and fashionable.",
        "meaningVi": "Sành điệu, thanh lịch, hợp thời trang",
        "example": "Her new dress is very chic and modern.",
        "exampleVi": "Chiếc váy mới của cô ấy rất sành điệu và hiện đại."
      },
      {
        "word": "dapper",
        "phonetic": "/ˈdæp.ər/",
        "wordType": "adj",
        "meaningEn": "Neat and stylish in dress or appearance (typically used of a man).",
        "meaningVi": "Bảnh bao, diện, bảnh chọe (thường dùng cho nam giới)",
        "example": "He looked very dapper in his new suit for the party.",
        "exampleVi": "Anh ấy trông rất bảnh bao trong bộ vest mới đi dự tiệc."
      },
      {
        "word": "décolletage",
        "phonetic": "/ˌdeɪ.kɒlˈtɑːʒ/",
        "wordType": "noun",
        "meaningEn": "A low neckline on a woman's dress or top.",
        "meaningVi": "Đường viền cổ thấp (trên váy áo nữ)",
        "example": "The décolletage of her gown was elegantly designed.",
        "exampleVi": "Đường viền cổ của chiếc váy dạ hội của cô ấy được thiết kế rất thanh lịch."
      },
      {
        "word": "bespoke",
        "phonetic": "/bɪˈspoʊk/",
        "wordType": "adj",
        "meaningEn": "Made for a particular customer or user.",
        "meaningVi": "May đo theo yêu cầu, đặt làm riêng",
        "example": "He ordered a bespoke suit for his wedding.",
        "exampleVi": "Anh ấy đã đặt may một bộ vest riêng cho đám cưới của mình."
      },
      {
        "word": "couture",
        "phonetic": "/kuːˈtjʊər/",
        "wordType": "noun",
        "meaningEn": "The design and manufacture of fashionable clothes to a client's specific requirements and measurements.",
        "meaningVi": "Thời trang cao cấp, đồ may đo",
        "example": "Her dream is to work in haute couture in Paris.",
        "exampleVi": "Ước mơ của cô ấy là làm việc trong lĩnh vực thời trang cao cấp ở Paris."
      },
      {
        "word": "epaulet",
        "phonetic": "/ˈep.ə.let/",
        "wordType": "noun",
        "meaningEn": "An ornamental shoulder piece on an item of clothing, typically on a coat or jacket.",
        "meaningVi": "Miếng cầu vai trang trí",
        "example": "The uniform had gold epaulets on the shoulders.",
        "exampleVi": "Bộ đồng phục có những miếng cầu vai vàng trên vai."
      },
      {
        "word": "gala",
        "phonetic": "/ˈɡɑː.lə/",
        "wordType": "adj",
        "meaningEn": "Festive; special, suitable for a celebration.",
        "meaningVi": "Lễ hội, sang trọng (dùng cho trang phục)",
        "example": "She wore a stunning gala dress to the charity event.",
        "exampleVi": "Cô ấy mặc một chiếc váy dạ hội lộng lẫy đến sự kiện từ thiện."
      },
      {
        "word": "gauche",
        "phonetic": "/ɡoʊʃ/",
        "wordType": "adj",
        "meaningEn": "Lacking ease or grace; unsophisticated and socially awkward.",
        "meaningVi": "Vụng về, thô kệch (trong cách ăn mặc hoặc cử chỉ)",
        "example": "His attire for the formal dinner was quite gauche.",
        "exampleVi": "Trang phục của anh ấy cho bữa tối trang trọng khá thô kệch."
      },
      {
        "word": "impeccable",
        "phonetic": "/ɪmˈpek.ə.bəl/",
        "wordType": "adj",
        "meaningEn": "In accordance with the highest standards of propriety; faultless.",
        "meaningVi": "Hoàn hảo, không tì vết (thường dùng cho trang phục, phong cách)",
        "example": "He always maintains an impeccable sense of style.",
        "exampleVi": "Anh ấy luôn duy trì phong cách hoàn hảo không tì vết."
      },
      {
        "word": "kimono",
        "phonetic": "/kɪˈmoʊ.noʊ/",
        "wordType": "noun",
        "meaningEn": "A long, loose traditional Japanese robe with wide sleeves and a sash.",
        "meaningVi": "Kimono",
        "example": "She received a beautiful silk kimono as a gift.",
        "exampleVi": "Cô ấy nhận được một chiếc kimono lụa tuyệt đẹp làm quà."
      },
      {
        "word": "lamé",
        "phonetic": "/lɑːˈmeɪ/",
        "wordType": "noun",
        "meaningEn": "A fabric woven or knitted with thin strips of metallic yarn.",
        "meaningVi": "Vải dệt kim loại, vải kim tuyến",
        "example": "The disco dress was made of shiny lamé fabric.",
        "exampleVi": "Chiếc váy disco được làm từ vải kim tuyến sáng bóng."
      },
      {
        "word": "muff",
        "phonetic": "/mʌf/",
        "wordType": "noun",
        "meaningEn": "A tube made of fur or other warm material into which a person puts their hands to keep them warm.",
        "meaningVi": "Túi sưởi tay (làm từ lông thú hoặc vật liệu ấm)",
        "example": "In winter, ladies used to carry a fur muff.",
        "exampleVi": "Vào mùa đông, các quý bà thường mang theo một chiếc túi sưởi tay bằng lông thú."
      },
      {
        "word": "negligee",
        "phonetic": "/ˌneɡ.lɪˈʒeɪ/",
        "wordType": "noun",
        "meaningEn": "A woman's light, often transparent dressing gown, typically made of silk or lace.",
        "meaningVi": "Áo ngủ mỏng, áo choàng ngủ gợi cảm",
        "example": "She wore a delicate lace negligee to bed.",
        "exampleVi": "Cô ấy mặc một chiếc áo ngủ ren mỏng manh khi đi ngủ."
      },
      {
        "word": "notched",
        "phonetic": "/nɒtʃt/",
        "wordType": "adj",
        "meaningEn": "Having a V-shaped indentation; often used to describe lapels on jackets.",
        "meaningVi": "Có khía, có vết cắt (thường dùng cho ve áo)",
        "example": "The suit jacket had classic notched lapels.",
        "exampleVi": "Áo vest có ve áo kiểu khía cổ điển."
      },
      {
        "word": "oversized",
        "phonetic": "/ˈoʊ.vər.saɪzd/",
        "wordType": "adj",
        "meaningEn": "Larger than normal size.",
        "meaningVi": "Quá khổ, rộng thùng thình",
        "example": "She loves wearing oversized sweaters for comfort.",
        "exampleVi": "Cô ấy thích mặc những chiếc áo len rộng thùng thình cho thoải mái."
      },
      {
        "word": "paisley",
        "phonetic": "/ˈpeɪz.li/",
        "wordType": "noun",
        "meaningEn": "A detailed, intricate pattern of curved, feathery figures based on a pine cone or teardrop shape, often with a swirl at the top end.",
        "meaningVi": "Họa tiết paisley (hình giọt nước cong)",
        "example": "His tie had a distinctive paisley pattern.",
        "exampleVi": "Cà vạt của anh ấy có họa tiết paisley đặc trưng."
      },
      {
        "word": "pinstripe",
        "phonetic": "/ˈpɪn.straɪp/",
        "wordType": "noun",
        "meaningEn": "A very thin stripe in fabric, especially dark fabric.",
        "meaningVi": "Vải sọc nhỏ",
        "example": "The businessman wore a sharp pinstripe suit.",
        "exampleVi": "Doanh nhân mặc một bộ vest sọc nhỏ lịch lãm."
      },
      {
        "word": "pleat",
        "phonetic": "/pliːt/",
        "wordType": "noun",
        "meaningEn": "A double fold of fabric pressed or stitched in place.",
        "meaningVi": "Nếp gấp, ly (trên quần áo)",
        "example": "The skirt had elegant pleats that moved gracefully.",
        "exampleVi": "Chiếc váy có những nếp ly thanh lịch chuyển động duyên dáng."
      },
      {
        "word": "ruffle",
        "phonetic": "/ˈrʌf.əl/",
        "wordType": "noun",
        "meaningEn": "An ornamental frill of lace or other material, typically on a garment or curtain.",
        "meaningVi": "Bèo nhún, diềm xếp nếp",
        "example": "Her blouse had pretty ruffles around the neckline.",
        "exampleVi": "Áo blouse của cô ấy có những đường bèo nhún xinh xắn quanh cổ áo."
      },
      {
        "word": "sartorial",
        "phonetic": "/sɑːrˈtɔːr.i.əl/",
        "wordType": "adj",
        "meaningEn": "Relating to tailoring, clothes, or style of dress.",
        "meaningVi": "Liên quan đến may mặc, thời trang",
        "example": "He has a keen sartorial eye for classic menswear.",
        "exampleVi": "Anh ấy có con mắt tinh tường về phong cách thời trang nam cổ điển."
      },
      {
        "word": "sequin",
        "phonetic": "/ˈsiː.kwɪn/",
        "wordType": "noun",
        "meaningEn": "A small, shiny, disk-shaped ornament sewn onto clothing for decoration.",
        "meaningVi": "Kim sa, hạt lấp lánh",
        "example": "The dress was covered in sparkling sequins.",
        "exampleVi": "Chiếc váy được phủ đầy những hạt kim sa lấp lánh."
      },
      {
        "word": "sheer",
        "phonetic": "/ʃɪər/",
        "wordType": "adj",
        "meaningEn": "Very thin, delicate, and transparent.",
        "meaningVi": "Mỏng manh, trong suốt",
        "example": "She wore a sheer silk scarf over her shoulders.",
        "exampleVi": "Cô ấy khoác một chiếc khăn lụa mỏng manh qua vai."
      },
      {
        "word": "statement piece",
        "phonetic": "/ˈsteɪt.mənt piːs/",
        "wordType": "noun",
        "meaningEn": "A piece of clothing or jewelry that is noticeable and makes a bold fashion statement.",
        "meaningVi": "Món đồ nổi bật, tạo điểm nhấn",
        "example": "Her oversized necklace was a real statement piece.",
        "exampleVi": "Chiếc vòng cổ ngoại cỡ của cô ấy thực sự là một món đồ tạo điểm nhấn."
      },
      {
        "word": "tartan",
        "phonetic": "/ˈtɑːr.tən/",
        "wordType": "noun",
        "meaningEn": "A pattern of colored squares and lines, used especially on kilts and blankets.",
        "meaningVi": "Họa tiết kẻ caro (thường là kẻ caro Scotland)",
        "example": "He wore a tartan kilt to the Scottish festival.",
        "exampleVi": "Anh ấy mặc một chiếc váy kilt họa tiết kẻ caro đến lễ hội Scotland."
      },
      {
        "word": "tassel",
        "phonetic": "/ˈtæs.əl/",
        "wordType": "noun",
        "meaningEn": "A decorative bunch of threads or cords, often hanging from a knob and used on clothing or curtains.",
        "meaningVi": "Tua rua, chùm sợi trang trí",
        "example": "Her bag was decorated with small leather tassels.",
        "exampleVi": "Chiếc túi của cô ấy được trang trí bằng những chiếc tua rua da nhỏ."
      },
      {
        "word": "trench coat",
        "phonetic": "/ˈtrentʃ ˌkoʊt/",
        "wordType": "noun",
        "meaningEn": "A loose, belted, double-breasted raincoat, typically made of gabardine.",
        "meaningVi": "Áo khoác măng tô",
        "example": "He looked sophisticated in his classic trench coat.",
        "exampleVi": "Anh ấy trông rất lịch lãm trong chiếc áo khoác măng tô cổ điển của mình."
      },
      {
        "word": "tuxedo",
        "phonetic": "/tʌkˈsiː.doʊ/",
        "wordType": "noun",
        "meaningEn": "A man's formal black or white jacket, worn typically with trousers matching the jacket.",
        "meaningVi": "Bộ lễ phục (veston dự tiệc)",
        "example": "He wore a tuxedo to the black-tie event.",
        "exampleVi": "Anh ấy mặc bộ lễ phục đến sự kiện yêu cầu trang phục đen."
      },
      {
        "word": "unflattering",
        "phonetic": "/ʌnˈflæt.ər.ɪŋ/",
        "wordType": "adj",
        "meaningEn": "Not making someone look more attractive.",
        "meaningVi": "Làm mất đi vẻ đẹp, không tôn dáng",
        "example": "That color is very unflattering on her.",
        "exampleVi": "Màu đó rất không tôn dáng cô ấy."
      },
      {
        "word": "velvet",
        "phonetic": "/ˈvel.vɪt/",
        "wordType": "noun",
        "meaningEn": "A type of cloth that has a soft, thick surface on one side.",
        "meaningVi": "Vải nhung",
        "example": "She wore a luxurious velvet dress to the ball.",
        "exampleVi": "Cô ấy mặc một chiếc váy nhung sang trọng đến buổi dạ tiệc."
      },
      {
        "word": "vogue",
        "phonetic": "/voʊɡ/",
        "wordType": "noun",
        "meaningEn": "The prevailing fashion or style at a particular time.",
        "meaningVi": "Mốt, thời trang thịnh hành",
        "example": "Short skirts are currently in vogue.",
        "exampleVi": "Váy ngắn hiện đang thịnh hành."
      },
      {
        "word": "waistcoat",
        "phonetic": "/ˈweɪst.koʊt/",
        "wordType": "noun",
        "meaningEn": "A sleeveless, collarless garment worn over a shirt and under a jacket.",
        "meaningVi": "Áo ghi lê (may đo cùng vest)",
        "example": "He completed his three-piece suit with a smart waistcoat.",
        "exampleVi": "Anh ấy hoàn thiện bộ vest ba mảnh của mình với một chiếc áo ghi lê lịch sự."
      },
      {
        "word": "accessorize",
        "phonetic": "/əkˈses.ə.raɪz/",
        "wordType": "verb",
        "meaningEn": "To add an accessory or accessories to an outfit.",
        "meaningVi": "Phụ kiện hóa, thêm phụ kiện",
        "example": "She loves to accessorize her simple dresses with bold jewelry.",
        "exampleVi": "Cô ấy thích phụ kiện hóa những chiếc váy đơn giản của mình bằng trang sức nổi bật."
      },
      {
        "word": "adorn",
        "phonetic": "/əˈdɔːrn/",
        "wordType": "verb",
        "meaningEn": "To decorate or add beauty to; to be a decorative feature of.",
        "meaningVi": "Trang trí, tô điểm",
        "example": "She adorned her hair with delicate flowers.",
        "exampleVi": "Cô ấy tô điểm mái tóc của mình bằng những bông hoa nhỏ xinh."
      },
      {
        "word": "drape",
        "phonetic": "/dreɪp/",
        "wordType": "verb",
        "meaningEn": "To arrange cloth or clothing loosely or casually on or around something.",
        "meaningVi": "Vắt, khoác (quần áo một cách nhẹ nhàng)",
        "example": "She elegantly draped a shawl over her shoulders.",
        "exampleVi": "Cô ấy thanh lịch khoác một chiếc khăn choàng qua vai."
      },
      {
        "word": "embellish",
        "phonetic": "/ɪmˈbel.ɪʃ/",
        "wordType": "verb",
        "meaningEn": "To make something more attractive by adding decorative details or features.",
        "meaningVi": "Trang trí thêm, làm đẹp thêm",
        "example": "The designer decided to embellish the gown with pearls and crystals.",
        "exampleVi": "Nhà thiết kế quyết định trang trí thêm cho chiếc váy dạ hội bằng ngọc trai và pha lê."
      },
      {
        "word": "flaunt",
        "phonetic": "/flɔːnt/",
        "wordType": "verb",
        "meaningEn": "To display something ostentatiously, especially in order to provoke envy or admiration.",
        "meaningVi": "Khoe khoang, phô trương",
        "example": "She likes to flaunt her expensive new handbag.",
        "exampleVi": "Cô ấy thích khoe chiếc túi xách mới đắt tiền của mình."
      },
      {
        "word": "garish",
        "phonetic": "/ˈɡær.ɪʃ/",
        "wordType": "adj",
        "meaningEn": "Obtrusively bright and showy; tastelessly colorful.",
        "meaningVi": "Lòe loẹt, chói mắt (một cách thiếu thẩm mỹ)",
        "example": "The pop star's stage costume was a bit too garish for my taste.",
        "exampleVi": "Trang phục biểu diễn của ngôi sao nhạc pop hơi quá lòe loẹt so với sở thích của tôi."
      },
      {
        "word": "gothic",
        "phonetic": "/ˈɡɒθ.ɪk/",
        "wordType": "adj",
        "meaningEn": "Relating to a style of rock music and fashion characterized by dark, melancholic themes and dark clothing.",
        "meaningVi": "Phong cách Gothic (đen tối, bí ẩn)",
        "example": "She often dresses in a gothic style with dark clothes and heavy makeup.",
        "exampleVi": "Cô ấy thường ăn mặc theo phong cách Gothic với quần áo tối màu và trang điểm đậm."
      },
      {
        "word": "hemlines",
        "phonetic": "/ˈhem.laɪnz/",
        "wordType": "noun",
        "meaningEn": "The line marking the lower edge of a garment.",
        "meaningVi": "Đường viền gấu váy/áo",
        "example": "Hemlines vary greatly depending on fashion trends.",
        "exampleVi": "Đường viền gấu váy thay đổi rất nhiều tùy thuộc vào xu hướng thời trang."
      },
      {
        "word": "luxurious",
        "phonetic": "/lʌɡˈʒʊə.ri.əs/",
        "wordType": "adj",
        "meaningEn": "Extremely comfortable, elegant, or enjoyable, especially in a way that involves great expense.",
        "meaningVi": "Sang trọng, xa hoa",
        "example": "She bought a luxurious silk robe for herself.",
        "exampleVi": "Cô ấy đã mua một chiếc áo choàng lụa sang trọng cho mình."
      },
      {
        "word": "mismatched",
        "phonetic": "/ˌmɪsˈmætʃt/",
        "wordType": "adj",
        "meaningEn": "Not matching or harmonizing with each other.",
        "meaningVi": "Không hợp nhau, lệch tông",
        "example": "Her mismatched socks were a quirky fashion choice.",
        "exampleVi": "Đôi tất lệch màu của cô ấy là một lựa chọn thời trang kỳ quặc."
      },
      {
        "word": "motifs",
        "phonetic": "/moʊˈtiːfs/",
        "wordType": "noun",
        "meaningEn": "A decorative design or pattern.",
        "meaningVi": "Họa tiết, hoa văn",
        "example": "The dress was adorned with intricate floral motifs.",
        "exampleVi": "Chiếc váy được trang trí bằng những họa tiết hoa phức tạp."
      },
      {
        "word": "opulent",
        "phonetic": "/ˈɒp.jə.lənt/",
        "wordType": "adj",
        "meaningEn": "Rich and luxurious or lavish.",
        "meaningVi": "Lộng lẫy, xa hoa, phong phú (về chất liệu, chi tiết)",
        "example": "The queen wore an opulent gown made of gold brocade.",
        "exampleVi": "Nữ hoàng mặc một chiếc váy lộng lẫy làm từ thổ cẩm vàng."
      },
      {
        "word": "patina",
        "phonetic": "/ˈpæt.ɪ.nə/",
        "wordType": "noun",
        "meaningEn": "A green or brown film on the surface of bronze or similar metals, produced by oxidation over a long period. Often used to describe a desirable aged appearance on leather or fabric.",
        "meaningVi": "Lớp gỉ sét tự nhiên (thường dùng để chỉ vẻ đẹp cổ điển, đã qua sử dụng của da, vải)",
        "example": "The vintage leather jacket had a beautiful, aged patina.",
        "exampleVi": "Chiếc áo khoác da cổ điển có một lớp patina đẹp đẽ, cũ kỹ."
      },
      {
        "word": "plethora",
        "phonetic": "/ˈpleθ.ə.rə/",
        "wordType": "noun",
        "meaningEn": "A large or excessive amount of something.",
        "meaningVi": "Sự thừa thãi, dư thừa (thường dùng trong bối cảnh có nhiều lựa chọn thời trang)",
        "example": "The boutique offered a plethora of accessories to choose from.",
        "exampleVi": "Cửa hàng thời trang cung cấp vô số phụ kiện để lựa chọn."
      },
      {
        "word": "resplendent",
        "phonetic": "/rɪˈsplen.dənt/",
        "wordType": "adj",
        "meaningEn": "Shining brilliantly; gleaming; splendid.",
        "meaningVi": "Rực rỡ, lộng lẫy, chói lọi",
        "example": "The bride looked resplendent in her white wedding gown.",
        "exampleVi": "Cô dâu trông thật rực rỡ trong chiếc váy cưới trắng của mình."
      },
      {
        "word": "shabby",
        "phonetic": "/ˈʃæb.i/",
        "wordType": "adj",
        "meaningEn": "In poor condition through long or hard use or lack of care.",
        "meaningVi": "Cũ nát, tồi tàn, xuề xòa",
        "example": "He wore a shabby old coat that was clearly too small for him.",
        "exampleVi": "Anh ấy mặc một chiếc áo khoác cũ nát rõ ràng là quá nhỏ so với anh ấy."
      },
      {
        "word": "sleek",
        "phonetic": "/sliːk/",
        "wordType": "adj",
        "meaningEn": "Smooth and glossy; smooth and elegant.",
        "meaningVi": "Bóng mượt, kiểu dáng đẹp, thanh lịch",
        "example": "She looked sleek and modern in her black jumpsuit.",
        "exampleVi": "Cô ấy trông thanh lịch và hiện đại trong bộ áo liền quần màu đen của mình."
      },
      {
        "word": "snug",
        "phonetic": "/snʌɡ/",
        "wordType": "adj",
        "meaningEn": "Fitting closely or comfortably.",
        "meaningVi": "Vừa khít, ấm cúng",
        "example": "Her new coat was warm and snug.",
        "exampleVi": "Chiếc áo khoác mới của cô ấy ấm áp và vừa vặn."
      },
      {
        "word": "spiffy",
        "phonetic": "/ˈspɪf.i/",
        "wordType": "adj",
        "meaningEn": "Smart in appearance; stylish.",
        "meaningVi": "Thanh lịch, sành điệu (thường là cách nói thân mật)",
        "example": "He looked very spiffy in his new suit and polished shoes.",
        "exampleVi": "Anh ấy trông rất sành điệu trong bộ vest mới và đôi giày được đánh bóng."
      },
      {
        "word": "stiletto",
        "phonetic": "/stɪˈlet.oʊ/",
        "wordType": "noun",
        "meaningEn": "A high, slender heel on a woman's shoe.",
        "meaningVi": "Gót nhọn (giày cao gót)",
        "example": "She struggled to walk in her towering stiletto heels.",
        "exampleVi": "Cô ấy gặp khó khăn khi đi trên đôi giày cao gót nhọn hoắt của mình."
      },
      {
        "word": "swanky",
        "phonetic": "/ˈswæŋ.ki/",
        "wordType": "adj",
        "meaningEn": "Stylish and expensive.",
        "meaningVi": "Sang trọng, đắt tiền, kiểu cách",
        "example": "They went to a swanky restaurant in their best clothes.",
        "exampleVi": "Họ đã đến một nhà hàng sang trọng với những bộ quần áo đẹp nhất của mình."
      },
      {
        "word": "tapestry",
        "phonetic": "/ˈtæp.ɪ.stri/",
        "wordType": "noun",
        "meaningEn": "A piece of thick fabric with pictures or designs woven into it, used as a wall hanging or for upholstery.",
        "meaningVi": "Vải thảm thêu, vải dệt hình",
        "example": "The ancient tapestry depicted a royal hunting scene.",
        "exampleVi": "Tấm thảm thêu cổ xưa mô tả một cảnh săn bắn của hoàng gia."
      },
      {
        "word": "threadbare",
        "phonetic": "/ˈθred.ber/",
        "wordType": "adj",
        "meaningEn": "Becoming thin and tattered with age; worn out.",
        "meaningVi": "Mòn vẹt, xơ xác, cũ kỹ",
        "example": "His old coat was threadbare at the elbows.",
        "exampleVi": "Chiếc áo khoác cũ của anh ấy đã mòn vẹt ở khuỷu tay."
      },
      {
        "word": "trim",
        "phonetic": "/trɪm/",
        "wordType": "noun",
        "meaningEn": "Decoration or edging added to a garment or article.",
        "meaningVi": "Đường viền, đường trang trí",
        "example": "The dress had a lace trim along the hem.",
        "exampleVi": "Chiếc váy có đường viền ren dọc theo gấu."
      },
      {
        "word": "trousers",
        "phonetic": "/ˈtraʊ.zərz/",
        "wordType": "noun",
        "meaningEn": "An outer garment covering the body from the waist to the ankles, with a separate part for each leg.",
        "meaningVi": "Quần tây, quần dài",
        "example": "He usually wears smart trousers to work.",
        "exampleVi": "Anh ấy thường mặc quần tây lịch sự đi làm."
      },
      {
        "word": "ubiquitous",
        "phonetic": "/juːˈbɪk.wɪ.təs/",
        "wordType": "adj",
        "meaningEn": "Present, appearing, or found everywhere.",
        "meaningVi": "Phổ biến, có mặt ở khắp nơi (thường dùng để chỉ một xu hướng thời trang)",
        "example": "Denim jeans have become ubiquitous in casual fashion.",
        "exampleVi": "Quần jean denim đã trở nên phổ biến khắp mọi nơi trong thời trang thường ngày."
      },
      {
        "word": "up-to-the-minute",
        "phonetic": "/ˌʌp.tuː.ðəˈmɪn.ɪt/",
        "wordType": "adj",
        "meaningEn": "Extremely modern and fashionable.",
        "meaningVi": "Cực kỳ hiện đại, hợp thời",
        "example": "She always keeps up with up-to-the-minute fashion trends.",
        "exampleVi": "Cô ấy luôn cập nhật những xu hướng thời trang cực kỳ hiện đại."
      },
      {
        "word": "vibrant",
        "phonetic": "/ˈvaɪ.brənt/",
        "wordType": "adj",
        "meaningEn": "Full of energy and enthusiasm; bright and striking (of colors).",
        "meaningVi": "Sống động, rực rỡ (màu sắc)",
        "example": "Her wardrobe is full of vibrant colors and bold patterns.",
        "exampleVi": "Tủ quần áo của cô ấy đầy những màu sắc sống động và họa tiết táo bạo."
      },
      {
        "word": "whimsical",
        "phonetic": "/ˈwɪm.zɪ.kəl/",
        "wordType": "adj",
        "meaningEn": "Playfully quaint or fanciful, especially in an appealing and amusing way.",
        "meaningVi": "Kỳ quái, lập dị nhưng đáng yêu (trong thiết kế)",
        "example": "The designer is known for her whimsical and imaginative creations.",
        "exampleVi": "Nhà thiết kế nổi tiếng với những sáng tạo kỳ quái và giàu trí tưởng tượng của mình."
      },
      {
        "word": "well-groomed",
        "phonetic": "/ˌwel ˈɡruːmd/",
        "wordType": "adj",
        "meaningEn": "Neat and tidy in appearance.",
        "meaningVi": "Chải chuốt, ăn mặc chỉnh tề",
        "example": "He always looks well-groomed and professional.",
        "exampleVi": "Anh ấy luôn trông chải chuốt và chuyên nghiệp."
      },
      {
        "word": "zig-zag",
        "phonetic": "/ˈzɪɡ.zæɡ/",
        "wordType": "noun",
        "meaningEn": "A line or course having abrupt alternate right and left turns.",
        "meaningVi": "Đường zích-zắc, họa tiết răng cưa",
        "example": "The dress featured a bold zig-zag pattern.",
        "exampleVi": "Chiếc váy nổi bật với họa tiết zích-zắc táo bạo."
      }
    ]
  },
  {
    "id": "objects",
    "title": "Đồ dùng & Thiết bị (Household Items & Objects)",
    "desc": "Từ vựng về các đồ dùng trong nhà, thiết bị gia dụng và vật dụng quanh ta.",
    "color": "border-cyan-200 bg-cyan-50/50 text-cyan-800 hover:border-cyan-400 dark:bg-slate-900/50 dark:border-slate-800 dark:text-cyan-400",
    "beginner": [
      {
        "word": "table",
        "phonetic": "/ˈteɪ.bəl/",
        "wordType": "noun",
        "meaningEn": "a piece of furniture with a flat top and legs, used for eating or writing",
        "meaningVi": "bàn, chiếc bàn",
        "example": "Put it on the table.",
        "exampleVi": "Đặt nó ở trên bàn."
      },
      {
        "word": "chair",
        "phonetic": "/tʃeər/",
        "wordType": "noun",
        "meaningEn": "a seat for one person, with a back and four legs",
        "meaningVi": "ghế, chiếc ghế",
        "example": "Sit down on the chair.",
        "exampleVi": "Ngồi xuống chiếc ghế này đi."
      },
      {
        "word": "bed",
        "phonetic": "/bed/",
        "wordType": "noun",
        "meaningEn": "a piece of furniture that you sleep on",
        "meaningVi": "giường, chiếc giường",
        "example": "Time to go to bed.",
        "exampleVi": "Đến lúc đi ngủ rồi."
      },
      {
        "word": "lamp",
        "phonetic": "/læmp/",
        "wordType": "noun",
        "meaningEn": "a device for giving light",
        "meaningVi": "đèn, chiếc đèn",
        "example": "Turn on the desk lamp.",
        "exampleVi": "Bật chiếc đèn bàn học lên."
      },
      {
        "word": "clock",
        "phonetic": "/klɒk/",
        "wordType": "noun",
        "meaningEn": "a device for measuring and showing time, not worn",
        "meaningVi": "đồng hồ treo tường",
        "example": "The clock shows noon.",
        "exampleVi": "Đồng hồ chỉ đúng giữa trưa."
      },
      {
        "word": "mirror",
        "phonetic": "/ˈmɪr.ər/",
        "wordType": "noun",
        "meaningEn": "a piece of glass in which you can see yourself",
        "meaningVi": "gương, chiếc gương",
        "example": "Look at yourself in the mirror.",
        "exampleVi": "Hãy nhìn mình vào trong gương."
      },
      {
        "word": "door",
        "phonetic": "/dɔːr/",
        "wordType": "noun",
        "meaningEn": "the large flat thing that closes the entrance to a room",
        "meaningVi": "cửa, cánh cửa",
        "example": "Close the front door.",
        "exampleVi": "Đóng cánh cửa trước lại."
      },
      {
        "word": "key",
        "phonetic": "/kiː/",
        "wordType": "noun",
        "meaningEn": "a metal object used to open or lock a door",
        "meaningVi": "chìa khóa",
        "example": "I lost my house key.",
        "exampleVi": "Tôi đã làm mất chìa khóa nhà."
      },
      {
        "word": "window",
        "phonetic": "/ˈwɪn.dəʊ/",
        "wordType": "noun",
        "meaningEn": "an opening in the wall of a building to let in light or air",
        "meaningVi": "cửa sổ",
        "example": "Open the window for fresh air.",
        "exampleVi": "Hãy mở cửa sổ để đón không khí trong lành."
      },
      {
        "word": "phone",
        "phonetic": "/fəʊn/",
        "wordType": "noun",
        "meaningEn": "a device used for long-distance communication",
        "meaningVi": "điện thoại",
        "example": "Answer the phone, please.",
        "exampleVi": "Làm ơn trả lời điện thoại."
      },
      {
        "word": "cup",
        "phonetic": "/kʌp/",
        "wordType": "noun",
        "meaningEn": "a small bowl-shaped container for drinking from",
        "meaningVi": "cái chén, tách",
        "example": "He drank a cup of hot tea.",
        "exampleVi": "Anh ấy uống một tách trà nóng."
      },
      {
        "word": "plate",
        "phonetic": "/pleɪt/",
        "wordType": "noun",
        "meaningEn": "a flat dish, typically circular, from which food is eaten",
        "meaningVi": "cái đĩa",
        "example": "Put the food on a plate.",
        "exampleVi": "Hãy bày thức ăn lên đĩa."
      },
      {
        "word": "spoon",
        "phonetic": "/spuːn/",
        "wordType": "noun",
        "meaningEn": "an implement consisting of a small shallow bowl with a handle",
        "meaningVi": "cái thìa, muỗng",
        "example": "Eat soup with a spoon.",
        "exampleVi": "Ăn súp bằng một chiếc thìa."
      },
      {
        "word": "fork",
        "phonetic": "/fɔːk/",
        "wordType": "noun",
        "meaningEn": "an implement with two or more prongs used for lifting food",
        "meaningVi": "cái nĩa",
        "example": "Use a fork to eat salad.",
        "exampleVi": "Dùng nĩa để ăn món salad."
      },
      {
        "word": "knife",
        "phonetic": "/naɪf/",
        "wordType": "noun",
        "meaningEn": "an instrument with a blade and a handle, used for cutting",
        "meaningVi": "con dao",
        "example": "Be careful with that sharp knife.",
        "exampleVi": "Hãy cẩn thận với con dao sắc đó."
      },
      {
        "word": "bowl",
        "phonetic": "/bəʊl/",
        "wordType": "noun",
        "meaningEn": "a round container open at the top, used for holding food",
        "meaningVi": "cái bát, cái tô",
        "example": "Pour the cereal into a bowl.",
        "exampleVi": "Đổ ngũ cốc vào bát."
      },
      {
        "word": "glass",
        "phonetic": "/ɡlɑːs/",
        "wordType": "noun",
        "meaningEn": "a container for holding liquids while drinking, made of glass",
        "meaningVi": "cốc thủy tinh",
        "example": "Fill the glass with water.",
        "exampleVi": "Hãy đổ đầy nước vào cốc thủy tinh."
      },
      {
        "word": "bottle",
        "phonetic": "/ˈbɒt.əl/",
        "wordType": "noun",
        "meaningEn": "a container with a narrow neck for keeping liquids",
        "meaningVi": "cái chai",
        "example": "The water bottle is empty.",
        "exampleVi": "Chai nước bị rỗng rồi."
      },
      {
        "word": "sofa",
        "phonetic": "/ˈsəʊ.fə/",
        "wordType": "noun",
        "meaningEn": "a long comfortable seat with a back and arms for two or more people",
        "meaningVi": "ghế sofa, ghế bành",
        "example": "Sit on the comfortable sofa.",
        "exampleVi": "Ngồi lên chiếc ghế sofa thoải mái này."
      },
      {
        "word": "pillow",
        "phonetic": "/ˈpɪl.əʊ/",
        "wordType": "noun",
        "meaningEn": "a rectangular cloth bag filled with soft material, used to rest head",
        "meaningVi": "gối, chiếc gối nằm",
        "example": "I need a soft pillow to sleep.",
        "exampleVi": "Tôi cần một chiếc gối mềm để ngủ."
      },
      {
        "word": "blanket",
        "phonetic": "/ˈblæŋ.kɪt/",
        "wordType": "noun",
        "meaningEn": "a large piece of woolen or warm fabric used as a bed covering",
        "meaningVi": "chăn, mền",
        "example": "Put a warm blanket over the bed.",
        "exampleVi": "Đắp một tấm chăn ấm lên giường."
      },
      {
        "word": "towel",
        "phonetic": "/taʊəl/",
        "wordType": "noun",
        "meaningEn": "a piece of absorbent fabric used for drying things or hands",
        "meaningVi": "khăn tắm, khăn lau",
        "example": "Dry your hands with this clean towel.",
        "exampleVi": "Lau khô tay bằng chiếc khăn sạch này."
      },
      {
        "word": "bin",
        "phonetic": "/bɪn/",
        "wordType": "noun",
        "meaningEn": "a container for waste",
        "meaningVi": "thùng rác",
        "example": "Throw the paper into the bin.",
        "exampleVi": "Hãy vứt giấy vào thùng rác."
      },
      {
        "word": "brush",
        "phonetic": "/brʌʃ/",
        "wordType": "noun",
        "meaningEn": "an implement with bristles, hair, or wire, for cleaning or painting",
        "meaningVi": "bàn chải, cây chổi",
        "example": "Use a brush to clean your shoes.",
        "exampleVi": "Dùng bàn chải để đánh sạch giày."
      },
      {
        "word": "comb",
        "phonetic": "/kəʊm/",
        "wordType": "noun",
        "meaningEn": "a strip of plastic or metal with a row of narrow teeth for untangling hair",
        "meaningVi": "cái lược",
        "example": "She combed her hair with a wooden comb.",
        "exampleVi": "Cô ấy chải tóc bằng một chiếc lược gỗ."
      },
      {
        "word": "desk",
        "phonetic": "/dɛsk/",
        "wordType": "noun",
        "meaningEn": "A piece of furniture with a flat top and usually drawers, used for writing or working.",
        "meaningVi": "Bàn làm việc, bàn học",
        "example": "I study at my desk every evening.",
        "exampleVi": "Tôi học ở bàn làm việc của mình mỗi tối."
      },
      {
        "word": "shelf",
        "phonetic": "/ʃɛlf/",
        "wordType": "noun",
        "meaningEn": "A flat length of wood or other rigid material, attached to a wall or forming part of a unit, used for storing things.",
        "meaningVi": "Kệ, giá sách",
        "example": "Put the books back on the shelf.",
        "exampleVi": "Đặt những cuốn sách trở lại kệ."
      },
      {
        "word": "drawer",
        "phonetic": "/drɔːr/",
        "wordType": "noun",
        "meaningEn": "A box-like storage compartment without a top, which can be slid in and out of a structure such as a chest or desk.",
        "meaningVi": "Ngăn kéo",
        "example": "I keep my socks in the top drawer.",
        "exampleVi": "Tôi giữ tất của mình trong ngăn kéo trên cùng."
      },
      {
        "word": "closet",
        "phonetic": "/ˈklɒzɪt/",
        "wordType": "noun",
        "meaningEn": "A small room or cupboard, especially one for storing clothes.",
        "meaningVi": "Tủ quần áo (âm tường)",
        "example": "My clothes are in the closet.",
        "exampleVi": "Quần áo của tôi ở trong tủ quần áo."
      },
      {
        "word": "wardrobe",
        "phonetic": "/ˈwɔːrdrəʊb/",
        "wordType": "noun",
        "meaningEn": "A large, tall cupboard in which clothes may be hung or stored.",
        "meaningVi": "Tủ quần áo (có thể di chuyển)",
        "example": "He bought a new wardrobe for his bedroom.",
        "exampleVi": "Anh ấy đã mua một tủ quần áo mới cho phòng ngủ của mình."
      },
      {
        "word": "rug",
        "phonetic": "/rʌɡ/",
        "wordType": "noun",
        "meaningEn": "A small carpet.",
        "meaningVi": "Thảm nhỏ",
        "example": "There's a colorful rug in front of the fireplace.",
        "exampleVi": "Có một tấm thảm đầy màu sắc trước lò sưởi."
      },
      {
        "word": "carpet",
        "phonetic": "/ˈkɑːrpɪt/",
        "wordType": "noun",
        "meaningEn": "A floor covering made from thick woven fabric.",
        "meaningVi": "Thảm trải sàn",
        "example": "The whole room has a soft carpet.",
        "exampleVi": "Cả căn phòng có một tấm thảm mềm."
      },
      {
        "word": "curtain",
        "phonetic": "/ˈkɜːrtn/",
        "wordType": "noun",
        "meaningEn": "A piece of material suspended at the top to form a screen, typically one of a pair at a window to block out light or stop people from looking in.",
        "meaningVi": "Rèm cửa",
        "example": "Please close the curtains; it's too bright.",
        "exampleVi": "Xin hãy đóng rèm lại; trời quá sáng."
      },
      {
        "word": "picture",
        "phonetic": "/ˈpɪktʃər/",
        "wordType": "noun",
        "meaningEn": "A painting, drawing, or photograph.",
        "meaningVi": "Bức tranh, bức ảnh",
        "example": "There is a beautiful picture on the wall.",
        "exampleVi": "Có một bức tranh đẹp trên tường."
      },
      {
        "word": "frame",
        "phonetic": "/freɪm/",
        "wordType": "noun",
        "meaningEn": "A rigid structure that surrounds or encloses something such as a picture, door, or window pane.",
        "meaningVi": "Khung (ảnh, cửa)",
        "example": "The photo is in a silver frame.",
        "exampleVi": "Bức ảnh nằm trong khung bạc."
      },
      {
        "word": "tissue",
        "phonetic": "/ˈtɪʃuː/",
        "wordType": "noun",
        "meaningEn": "A disposable piece of absorbent paper, used for wiping the nose or face.",
        "meaningVi": "Giấy ăn, khăn giấy",
        "example": "Could you pass me a tissue, please?",
        "exampleVi": "Bạn có thể đưa cho tôi một chiếc khăn giấy được không?"
      },
      {
        "word": "soap",
        "phonetic": "/soʊp/",
        "wordType": "noun",
        "meaningEn": "A substance used with water for washing and cleaning, made of a compound of natural oils or fats with sodium hydroxide or other strong alkali and typically having perfume and coloring added.",
        "meaningVi": "Xà phòng",
        "example": "Wash your hands with soap and water.",
        "exampleVi": "Hãy rửa tay bằng xà phòng và nước."
      },
      {
        "word": "shampoo",
        "phonetic": "/ʃæmˈpuː/",
        "wordType": "noun",
        "meaningEn": "A liquid preparation for washing the hair.",
        "meaningVi": "Dầu gội đầu",
        "example": "I need to buy some more shampoo.",
        "exampleVi": "Tôi cần mua thêm dầu gội đầu."
      },
      {
        "word": "toothbrush",
        "phonetic": "/ˈtuːθbrʌʃ/",
        "wordType": "noun",
        "meaningEn": "A small brush with a long handle, used for cleaning the teeth.",
        "meaningVi": "Bàn chải đánh răng",
        "example": "Don't forget to pack your toothbrush.",
        "exampleVi": "Đừng quên mang theo bàn chải đánh răng của bạn."
      },
      {
        "word": "toothpaste",
        "phonetic": "/ˈtuːθpeɪst/",
        "wordType": "noun",
        "meaningEn": "A paste used with a toothbrush to clean the teeth.",
        "meaningVi": "Kem đánh răng",
        "example": "You're running low on toothpaste.",
        "exampleVi": "Bạn sắp hết kem đánh răng rồi."
      },
      {
        "word": "razor",
        "phonetic": "/ˈreɪzər/",
        "wordType": "noun",
        "meaningEn": "An instrument with a sharp blade or blades, used for shaving hair from the skin.",
        "meaningVi": "Dao cạo râu",
        "example": "He used a new razor this morning.",
        "exampleVi": "Anh ấy đã dùng dao cạo râu mới sáng nay."
      },
      {
        "word": "towel rack",
        "phonetic": "/ˈtaʊəl ræk/",
        "wordType": "noun",
        "meaningEn": "A bar or frame for hanging towels.",
        "meaningVi": "Giá treo khăn",
        "example": "Please hang the wet towel on the towel rack.",
        "exampleVi": "Làm ơn treo chiếc khăn ướt lên giá treo khăn."
      },
      {
        "word": "toilet paper",
        "phonetic": "/ˈtɔɪlɪt ˈpeɪpər/",
        "wordType": "noun",
        "meaningEn": "Soft, absorbent paper for use in the toilet.",
        "meaningVi": "Giấy vệ sinh",
        "example": "We need to buy more toilet paper.",
        "exampleVi": "Chúng ta cần mua thêm giấy vệ sinh."
      },
      {
        "word": "bucket",
        "phonetic": "/ˈbʌkɪt/",
        "wordType": "noun",
        "meaningEn": "A roughly cylindrical open container with a handle, used for carrying liquids or other matter.",
        "meaningVi": "Cái xô",
        "example": "Fill the bucket with water.",
        "exampleVi": "Đổ đầy nước vào xô."
      },
      {
        "word": "mop",
        "phonetic": "/mɒp/",
        "wordType": "noun",
        "meaningEn": "A tool for cleaning floors, consisting of a sponge or a bundle of thick strings attached to a handle.",
        "meaningVi": "Cây lau nhà",
        "example": "I used the mop to clean the kitchen floor.",
        "exampleVi": "Tôi đã dùng cây lau nhà để lau sàn bếp."
      },
      {
        "word": "broom",
        "phonetic": "/bruːm/",
        "wordType": "noun",
        "meaningEn": "A brush with a long handle, used for sweeping floors.",
        "meaningVi": "Cây chổi",
        "example": "Sweep the dust with the broom.",
        "exampleVi": "Quét bụi bằng cây chổi."
      },
      {
        "word": "dustpan",
        "phonetic": "/ˈdʌstˌpæn/",
        "wordType": "noun",
        "meaningEn": "A flat scoop with a short handle, used for sweeping dirt or refuse into.",
        "meaningVi": "Cái hốt rác",
        "example": "Use the dustpan to collect the dirt.",
        "exampleVi": "Dùng cái hốt rác để gom bụi."
      },
      {
        "word": "sponge",
        "phonetic": "/spʌndʒ/",
        "wordType": "noun",
        "meaningEn": "A piece of a soft, porous material, used for washing and cleaning.",
        "meaningVi": "Miếng bọt biển",
        "example": "Wipe the counter with a wet sponge.",
        "exampleVi": "Lau quầy bằng miếng bọt biển ướt."
      },
      {
        "word": "detergent",
        "phonetic": "/dɪˈtɜːrdʒənt/",
        "wordType": "noun",
        "meaningEn": "A chemical substance used for cleaning, especially a liquid or powder added to water for washing clothes or dishes.",
        "meaningVi": "Chất tẩy rửa",
        "example": "Add a little detergent to the washing machine.",
        "exampleVi": "Thêm một ít chất tẩy rửa vào máy giặt."
      },
      {
        "word": "iron",
        "phonetic": "/ˈaɪərn/",
        "wordType": "noun",
        "meaningEn": "An electrical device with a flat, heated surface, used to smooth clothes.",
        "meaningVi": "Bàn là (bàn ủi)",
        "example": "I need to iron my shirt before the meeting.",
        "exampleVi": "Tôi cần ủi áo sơ mi trước cuộc họp."
      },
      {
        "word": "ironing board",
        "phonetic": "/ˈaɪərnɪŋ bɔːrd/",
        "wordType": "noun",
        "meaningEn": "A long, narrow, padded board, usually with folding legs, on which clothes are ironed.",
        "meaningVi": "Cầu là (cầu ủi)",
        "example": "Set up the ironing board in the living room.",
        "exampleVi": "Đặt cầu là trong phòng khách."
      },
      {
        "word": "hanger",
        "phonetic": "/ˈhæŋər/",
        "wordType": "noun",
        "meaningEn": "A shaped piece of wood, plastic, or metal with a hook at the top, used for hanging clothes.",
        "meaningVi": "Móc treo quần áo",
        "example": "Hang your jacket on a hanger.",
        "exampleVi": "Treo áo khoác của bạn lên móc áo."
      },
      {
        "word": "basket",
        "phonetic": "/ˈbæskɪt/",
        "wordType": "noun",
        "meaningEn": "A container made of interwoven material, typically wicker or plastic, used for carrying things.",
        "meaningVi": "Cái giỏ, cái rổ",
        "example": "Put the dirty clothes in the laundry basket.",
        "exampleVi": "Bỏ quần áo bẩn vào giỏ đồ giặt."
      },
      {
        "word": "washing machine",
        "phonetic": "/ˈwɒʃɪŋ məˌʃiːn/",
        "wordType": "noun",
        "meaningEn": "An appliance used for washing clothes.",
        "meaningVi": "Máy giặt",
        "example": "The washing machine is broken.",
        "exampleVi": "Máy giặt bị hỏng."
      },
      {
        "word": "dryer",
        "phonetic": "/ˈdraɪər/",
        "wordType": "noun",
        "meaningEn": "An appliance for drying clothes, typically a tumble dryer.",
        "meaningVi": "Máy sấy quần áo",
        "example": "Put the wet towels in the dryer.",
        "exampleVi": "Cho khăn ướt vào máy sấy."
      },
      {
        "word": "stove",
        "phonetic": "/stoʊv/",
        "wordType": "noun",
        "meaningEn": "An apparatus for cooking or heating that contains an oven and hob.",
        "meaningVi": "Bếp (nấu ăn)",
        "example": "She cooked dinner on the stove.",
        "exampleVi": "Cô ấy nấu bữa tối trên bếp."
      },
      {
        "word": "oven",
        "phonetic": "/ˈʌvən/",
        "wordType": "noun",
        "meaningEn": "An enclosed compartment, usually part of a stove, for cooking and heating food.",
        "meaningVi": "Lò nướng",
        "example": "Bake the cake in the oven.",
        "exampleVi": "Nướng bánh trong lò."
      },
      {
        "word": "kettle",
        "phonetic": "/ˈkɛtl/",
        "wordType": "noun",
        "meaningEn": "A vessel with a handle and a spout, used for boiling water.",
        "meaningVi": "Ấm đun nước",
        "example": "The kettle is boiling; let's make some tea.",
        "exampleVi": "Ấm đang sôi; chúng ta hãy pha trà đi."
      },
      {
        "word": "toaster",
        "phonetic": "/ˈtoʊstər/",
        "wordType": "noun",
        "meaningEn": "An electrical appliance for toasting bread.",
        "meaningVi": "Máy nướng bánh mì",
        "example": "I like my toast light, so don't leave it in the toaster too long.",
        "exampleVi": "Tôi thích bánh mì nướng nhạt, vì vậy đừng để nó trong máy nướng bánh mì quá lâu."
      },
      {
        "word": "blender",
        "phonetic": "/ˈblɛndər/",
        "wordType": "noun",
        "meaningEn": "An electrical appliance with rapidly rotating blades that is used for liquefying, chopping, or pureeing food.",
        "meaningVi": "Máy xay sinh tố",
        "example": "She made a smoothie in the blender.",
        "exampleVi": "Cô ấy đã làm sinh tố bằng máy xay sinh tố."
      },
      {
        "word": "faucet",
        "phonetic": "/ˈfɔːsɪt/",
        "wordType": "noun",
        "meaningEn": "A device by which a flow of liquid or gas from a pipe or container can be controlled; a tap.",
        "meaningVi": "Vòi nước",
        "example": "Turn off the faucet when you're done washing dishes.",
        "exampleVi": "Khóa vòi nước khi bạn rửa bát xong."
      },
      {
        "word": "sink",
        "phonetic": "/sɪŋk/",
        "wordType": "noun",
        "meaningEn": "A fixed basin with a water supply and a drain, used for washing.",
        "meaningVi": "Bồn rửa",
        "example": "The dirty dishes are in the sink.",
        "exampleVi": "Những đĩa bẩn đang ở trong bồn rửa."
      },
      {
        "word": "drain",
        "phonetic": "/dreɪn/",
        "wordType": "noun",
        "meaningEn": "A channel or pipe carrying off surplus liquid, especially rainwater or liquid waste.",
        "meaningVi": "Ống thoát nước",
        "example": "The water goes down the drain.",
        "exampleVi": "Nước chảy xuống ống thoát nước."
      },
      {
        "word": "doormat",
        "phonetic": "/ˈdɔːrmæt/",
        "wordType": "noun",
        "meaningEn": "A mat placed in front of an entrance door for wiping one's shoes on.",
        "meaningVi": "Thảm chùi chân",
        "example": "Please wipe your feet on the doormat.",
        "exampleVi": "Làm ơn lau chân lên thảm chùi chân."
      },
      {
        "word": "light switch",
        "phonetic": "/laɪt swɪtʃ/",
        "wordType": "noun",
        "meaningEn": "A switch that operates an electric light.",
        "meaningVi": "Công tắc đèn",
        "example": "Flip the light switch to turn on the lamp.",
        "exampleVi": "Bật công tắc đèn để bật đèn."
      },
      {
        "word": "extension cord",
        "phonetic": "/ɪkˈstɛnʃən kɔːrd/",
        "wordType": "noun",
        "meaningEn": "A length of flexible electrical cord with a plug on one end and a socket on the other, used to extend the reach of a power outlet.",
        "meaningVi": "Dây nối dài, ổ cắm điện nối dài",
        "example": "I need an extension cord to reach the outlet.",
        "exampleVi": "Tôi cần một sợi dây nối dài để cắm vào ổ điện."
      },
      {
        "word": "batteries",
        "phonetic": "/ˈbætəriz/",
        "wordType": "noun",
        "meaningEn": "Cells that convert chemical energy into electrical energy, used to power devices.",
        "meaningVi": "Pin",
        "example": "This remote control needs new batteries.",
        "exampleVi": "Điều khiển từ xa này cần pin mới."
      },
      {
        "word": "remote control",
        "phonetic": "/rɪˈmoʊt kənˈtroʊl/",
        "wordType": "noun",
        "meaningEn": "A device for controlling a machine or apparatus from a distance.",
        "meaningVi": "Điều khiển từ xa",
        "example": "I can't find the remote control for the TV.",
        "exampleVi": "Tôi không tìm thấy điều khiển từ xa của TV."
      },
      {
        "word": "umbrella",
        "phonetic": "/ʌmˈbrɛlə/",
        "wordType": "noun",
        "meaningEn": "A device consisting of a circular canopy of cloth on a folding metal frame supported by a central rod, used as protection against rain or sun.",
        "meaningVi": "Cái ô, cái dù",
        "example": "Don't forget your umbrella, it might rain.",
        "exampleVi": "Đừng quên ô của bạn, trời có thể mưa."
      },
      {
        "word": "flashlight",
        "phonetic": "/ˈflæʃˌlaɪt/",
        "wordType": "noun",
        "meaningEn": "A small portable electric light powered by batteries.",
        "meaningVi": "Đèn pin",
        "example": "I used a flashlight to find my way in the dark.",
        "exampleVi": "Tôi đã dùng đèn pin để tìm đường trong bóng tối."
      }
    ],
    "advanced": [
      {
        "word": "appliance",
        "phonetic": "/əˈplaɪ.əns/",
        "wordType": "noun",
        "meaningEn": "a device, machine, or piece of equipment used in the home",
        "meaningVi": "thiết bị gia dụng",
        "example": "Kitchen appliances are expensive.",
        "exampleVi": "Các thiết bị gia dụng nhà bếp rất đắt tiền."
      },
      {
        "word": "refrigerator",
        "phonetic": "/rɪˈfrɪdʒ.ə.reɪ.tər/",
        "wordType": "noun",
        "meaningEn": "an appliance which keeps food cold to preserve it",
        "meaningVi": "tủ lạnh",
        "example": "Keep milk in the refrigerator.",
        "exampleVi": "Hãy giữ sữa trong tủ lạnh."
      },
      {
        "word": "vacuum cleaner",
        "phonetic": "/ˈvæk.juːm ˌkliː.nər/",
        "wordType": "noun",
        "meaningEn": "a machine that cleans floors by suction",
        "meaningVi": "máy hút bụi",
        "example": "This vacuum cleaner is quiet.",
        "exampleVi": "Chiếc máy hút bụi này chạy rất êm."
      },
      {
        "word": "thermostat",
        "phonetic": "/ˈθɜː.mə.stæt/",
        "wordType": "noun",
        "meaningEn": "a device that controls the temperature of a room",
        "meaningVi": "bộ điều nhiệt",
        "example": "Adjust the thermostat to cool.",
        "exampleVi": "Hãy điều chỉnh bộ điều nhiệt sang làm mát."
      },
      {
        "word": "cabinet",
        "phonetic": "/ˈkæb.ɪ.nət/",
        "wordType": "noun",
        "meaningEn": "a piece of furniture with shelves and doors for storage",
        "meaningVi": "ngăn tủ, tủ chứa đồ",
        "example": "Glasses are in the cabinet.",
        "exampleVi": "Những chiếc ly nằm trong tủ."
      },
      {
        "word": "cutlery",
        "phonetic": "/ˈkʌt.lər.i/",
        "wordType": "noun",
        "meaningEn": "knives, forks, and spoons used for eating food",
        "meaningVi": "bộ dụng cụ ăn (dao, muỗng, nĩa)",
        "example": "Polish the silver cutlery.",
        "exampleVi": "Hãy đánh bóng bộ dụng cụ ăn bằng bạc."
      },
      {
        "word": "fragile",
        "phonetic": "/ˈfrædʒ.aɪl/",
        "wordType": "adj",
        "meaningEn": "easily broken or damaged",
        "meaningVi": "dễ vỡ, mỏng manh",
        "example": "Handle these fragile items carefully.",
        "exampleVi": "Cầm nắm những vật dễ vỡ này cẩn thiện."
      },
      {
        "word": "utensil",
        "phonetic": "/juːˈten.sɪl/",
        "wordType": "noun",
        "meaningEn": "a tool with a particular use, especially in kitchen",
        "meaningVi": "dụng cụ, đồ dùng nhà bếp",
        "example": "Kitchen utensils are on the shelf.",
        "exampleVi": "Các dụng cụ nhà bếp nằm trên kệ."
      },
      {
        "word": "dishwasher",
        "phonetic": "/ˈdɪʃˌwɒʃ.ər/",
        "wordType": "noun",
        "meaningEn": "a machine for washing dishes automatically",
        "meaningVi": "máy rửa bát, máy rửa chén",
        "example": "Put the dirty dishes in the dishwasher.",
        "exampleVi": "Hãy cho bát đĩa bẩn vào máy rửa bát."
      },
      {
        "word": "humidifier",
        "phonetic": "/hjuːˈmɪd.ɪ.faɪ.ər/",
        "wordType": "noun",
        "meaningEn": "a device for keeping the atmosphere moist in a room",
        "meaningVi": "máy tạo ẩm, máy phun sương",
        "example": "Use a humidifier in dry weather.",
        "exampleVi": "Sử dụng máy tạo ẩm trong thời tiết khô hanh."
      },
      {
        "word": "upholstery",
        "phonetic": "/ʌpˈhəʊl.stər.i/",
        "wordType": "noun",
        "meaningEn": "soft, padded textile covering that is fixed to furniture",
        "meaningVi": "lớp vải bọc nệm",
        "example": "The sofa upholstery is worn out.",
        "exampleVi": "Lớp bọc nệm của sofa đã bị sờn mòn."
      },
      {
        "word": "microwave",
        "phonetic": "/ˈmaɪ.krə.weɪv/",
        "wordType": "noun",
        "meaningEn": "an oven that uses microwaves to cook or heat food",
        "meaningVi": "lò vi sóng",
        "example": "Warm up the pizza in the microwave.",
        "exampleVi": "Hãy hâm nóng pizza bằng lò vi sóng."
      },
      {
        "word": "detergent",
        "phonetic": "/dɪˈtɜː.dʒənt/",
        "wordType": "noun",
        "meaningEn": "a water-soluble cleansing agent which combines with impurities",
        "meaningVi": "chất tẩy rửa, bột giặt",
        "example": "Use mild detergent for wool.",
        "exampleVi": "Sử dụng chất tẩy rửa nhẹ cho len."
      },
      {
        "word": "combustible",
        "phonetic": "/kəmˈbʌs.tə.bəl/",
        "wordType": "adj",
        "meaningEn": "able to catch fire and burn easily",
        "meaningVi": "dễ cháy, chất dễ cháy",
        "example": "Keep combustibles away from fire.",
        "exampleVi": "Giữ các chất dễ cháy xa nguồn lửa."
      },
      {
        "word": "heirloom",
        "phonetic": "/ˈeə.luːm/",
        "wordType": "noun",
        "meaningEn": "a valuable object that has belonged to a family for generations",
        "meaningVi": "vật gia truyền",
        "example": "This clock is a family heirloom.",
        "exampleVi": "Chiếc đồng hồ này là vật gia truyền của gia đình."
      },
      {
        "word": "processor",
        "phonetic": "/ˈprəʊ.ses.ər/",
        "wordType": "noun",
        "meaningEn": "a machine that processes food or information, e.g., food processor",
        "meaningVi": "máy xay đa năng, bộ xử lý",
        "example": "We used the food processor to chop onions.",
        "exampleVi": "Chúng tôi đã dùng máy xay đa năng để băm hành tây."
      },
      {
        "word": "container",
        "phonetic": "/kənˈteɪ.nər/",
        "wordType": "noun",
        "meaningEn": "an object that can be used to hold or transport something",
        "meaningVi": "hộp đựng, công-ten-nơ",
        "example": "Store the leftovers in an airtight container.",
        "exampleVi": "Hãy bảo quản thức ăn thừa trong hộp kín khí."
      },
      {
        "word": "fixture",
        "phonetic": "/ˈfɪks.tʃər/",
        "wordType": "noun",
        "meaningEn": "a piece of equipment or furniture which is fixed in position in a building",
        "meaningVi": "vật cố định (như đèn, lavabo)",
        "example": "They replaced the bathroom light fixtures.",
        "exampleVi": "Họ đã thay thế các thiết bị chiếu sáng cố định trong phòng tắm."
      },
      {
        "word": "plumbing",
        "phonetic": "/ˈplʌm.ɪŋ/",
        "wordType": "noun",
        "meaningEn": "the system of pipes and fixtures that distribute water in a building",
        "meaningVi": "hệ thống đường ống nước",
        "example": "There is a leak in the house plumbing.",
        "exampleVi": "Có một vết rò rỉ trong hệ thống ống nước của ngôi nhà."
      },
      {
        "word": "generator",
        "phonetic": "/ˈdʒen.ə.reɪ.tər/",
        "wordType": "noun",
        "meaningEn": "a machine that produces electrical energy",
        "meaningVi": "máy phát điện",
        "example": "The hospital has emergency backup generators.",
        "exampleVi": "Bệnh viện có các máy phát điện dự phòng khẩn cấp."
      },
      {
        "word": "filter",
        "phonetic": "/ˈfɪl.tər/",
        "wordType": "noun/verb",
        "meaningEn": "a device or porous material used to remove impurities from liquid or gas",
        "meaningVi": "bộ lọc, lọc nước/khí",
        "example": "Change the water filter every six months.",
        "exampleVi": "Hãy thay bộ lọc nước mỗi sáu tháng một lần."
      },
      {
        "word": "ornament",
        "phonetic": "/ˈɔː.nə.mənt/",
        "wordType": "noun",
        "meaningEn": "a thing used to adorn or make something look attractive",
        "meaningVi": "đồ trang trí, đồ mỹ nghệ",
        "example": "She decorated the shelf with ceramic ornaments.",
        "exampleVi": "Cô ấy trang trí chiếc kệ bằng những món đồ mỹ nghệ bằng gốm."
      },
      {
        "word": "ventilator",
        "phonetic": "/ˈven.tɪ.leɪ.tər/",
        "wordType": "noun",
        "meaningEn": "an appliance or machine for circulating fresh air",
        "meaningVi": "máy quạt thông gió, máy thở",
        "example": "A ventilator kept the warehouse air fresh.",
        "exampleVi": "Một chiếc quạt thông gió giúp không khí trong nhà kho luôn thông thoáng."
      },
      {
        "word": "apparatus",
        "phonetic": "/ˌæp.əˈreɪ.təs/",
        "wordType": "noun",
        "meaningEn": "the technical equipment or machinery needed for a particular activity",
        "meaningVi": "bộ máy, thiết bị chuyên dụng",
        "example": "Laboratory apparatus must be cleaned.",
        "exampleVi": "Các thiết bị chuyên dụng phòng thí nghiệm phải được lau chùi."
      },
      {
        "word": "extinguisher",
        "phonetic": "/ɪkˈstɪŋ.ɡwɪ.ʃər/",
        "wordType": "noun",
        "meaningEn": "a portable device that discharges a jet of water, foam, or gas to put out fire",
        "meaningVi": "bình chữa cháy",
        "example": "Keep a fire extinguisher in the kitchen.",
        "exampleVi": "Hãy giữ một bình chữa cháy trong bếp."
      },
      {
        "word": "crockery",
        "phonetic": "/ˈkrɒkəri/",
        "wordType": "noun",
        "meaningEn": "Plates, dishes, cups, and other similar items, especially those made of earthenware or porcelain.",
        "meaningVi": "Bộ đồ ăn (bằng sứ, gốm)",
        "example": "The antique crockery was carefully displayed in the cabinet.",
        "exampleVi": "Bộ đồ ăn cổ được trưng bày cẩn thận trong tủ."
      },
      {
        "word": "porcelain",
        "phonetic": "/ˈpɔːrsəlɪn/",
        "wordType": "noun",
        "meaningEn": "A white vitrified translucent ceramic; china.",
        "meaningVi": "Sứ",
        "example": "The delicate porcelain vase was imported from China.",
        "exampleVi": "Bình hoa sứ tinh xảo được nhập khẩu từ Trung Quốc."
      },
      {
        "word": "cutlery set",
        "phonetic": "/ˈkʌtləri sɛt/",
        "wordType": "noun",
        "meaningEn": "A collection of knives, forks, and spoons used for eating.",
        "meaningVi": "Bộ dao, dĩa, thìa",
        "example": "She received a beautiful silver cutlery set as a wedding gift.",
        "exampleVi": "Cô ấy nhận được một bộ dao dĩa bạc đẹp làm quà cưới."
      },
      {
        "word": "linens",
        "phonetic": "/ˈlɪnɪnz/",
        "wordType": "noun",
        "meaningEn": "Household articles such as sheets, towels, and tablecloths, typically made from linen or cotton fabric.",
        "meaningVi": "Đồ vải lanh (ga trải giường, khăn tắm, khăn trải bàn)",
        "example": "The hotel provides fresh linens daily for its guests.",
        "exampleVi": "Khách sạn cung cấp đồ vải lanh mới hàng ngày cho khách của mình."
      },
      {
        "word": "upholstery fabric",
        "phonetic": "/ʌpˈhoʊlstəri ˈfæbrɪk/",
        "wordType": "noun",
        "meaningEn": "The material used to cover furniture, especially sofas and chairs.",
        "meaningVi": "Vải bọc nội thất",
        "example": "She chose a durable upholstery fabric for the new sofa.",
        "exampleVi": "Cô ấy đã chọn một loại vải bọc nội thất bền cho chiếc ghế sofa mới."
      },
      {
        "word": "ottoman",
        "phonetic": "/ˈɒtəmən/",
        "wordType": "noun",
        "meaningEn": "A low upholstered seat or footstool, without a back or arms.",
        "meaningVi": "Ghế đẩu bọc đệm, ghế nghỉ chân",
        "example": "He rested his feet on the soft ottoman while reading.",
        "exampleVi": "Anh ấy đặt chân lên chiếc ghế đệm êm ái khi đọc sách."
      },
      {
        "word": "sideboard",
        "phonetic": "/ˈsaɪdbɔːrd/",
        "wordType": "noun",
        "meaningEn": "A flat-topped piece of furniture with cupboards and drawers, used for holding dishes and other serving items.",
        "meaningVi": "Tủ chén, tủ đựng đồ ăn",
        "example": "The antique sideboard added elegance to the dining room.",
        "exampleVi": "Chiếc tủ chén cổ đã tăng thêm vẻ sang trọng cho phòng ăn."
      },
      {
        "word": "mantelpiece",
        "phonetic": "/ˈmæntəlˌpiːs/",
        "wordType": "noun",
        "meaningEn": "A shelf projecting from the wall over a fireplace.",
        "meaningVi": "Kệ trên lò sưởi",
        "example": "She decorated the mantelpiece with family photos and small sculptures.",
        "exampleVi": "Cô ấy trang trí kệ trên lò sưởi bằng ảnh gia đình và những bức tượng nhỏ."
      },
      {
        "word": "valance",
        "phonetic": "/ˈvæləns/",
        "wordType": "noun",
        "meaningEn": "A length of decorative drapery attached to the top of a window, bed, or shelf.",
        "meaningVi": "Màn rèm che trên cửa sổ/giường",
        "example": "The valance added a soft touch to the bedroom decor.",
        "exampleVi": "Màn rèm che đã tạo thêm nét mềm mại cho trang trí phòng ngủ."
      },
      {
        "word": "pedestal",
        "phonetic": "/ˈpɛdɪstl/",
        "wordType": "noun",
        "meaningEn": "The base or support on which a statue, obelisk, or column is mounted.",
        "meaningVi": "Bệ đỡ, chân đế",
        "example": "The exquisite sculpture was placed on a marble pedestal.",
        "exampleVi": "Bức tượng tinh xảo được đặt trên một bệ đá cẩm thạch."
      },
      {
        "word": "hutch",
        "phonetic": "/hʌtʃ/",
        "wordType": "noun",
        "meaningEn": "A cupboard with shelves, often forming the top part of a dresser.",
        "meaningVi": "Tủ chén có kệ phía trên",
        "example": "Grandma's china dishes are stored in the dining room hutch.",
        "exampleVi": "Bộ bát đĩa sứ của bà được cất trong tủ chén phòng ăn."
      },
      {
        "word": "credenza",
        "phonetic": "/krɪˈdɛnzə/",
        "wordType": "noun",
        "meaningEn": "A type of sideboard, often with a flat top and sliding doors, used for serving food or storing documents in an office.",
        "meaningVi": "Tủ phụ, tủ văn phòng",
        "example": "The credenza in the office holds important files and a printer.",
        "exampleVi": "Chiếc tủ phụ trong văn phòng chứa các tập tin quan trọng và một máy in."
      },
      {
        "word": "buffet",
        "phonetic": "/bʌˈfeɪ/",
        "wordType": "noun",
        "meaningEn": "A piece of furniture similar to a sideboard, usually in a dining room, used for serving food or storing dishes.",
        "meaningVi": "Tủ buffet (dùng để bày đồ ăn hoặc chén đĩa)",
        "example": "We set out all the appetizers on the buffet table.",
        "exampleVi": "Chúng tôi bày tất cả món khai vị lên bàn buffet."
      },
      {
        "word": "étagère",
        "phonetic": "/eɪˌtɑːˈʒɛər/",
        "wordType": "noun",
        "meaningEn": "A piece of furniture with a series of open shelves for displaying ornaments.",
        "meaningVi": "Kệ trang trí (có nhiều ngăn mở)",
        "example": "She displayed her collection of antique dolls on the elegant étagère.",
        "exampleVi": "Cô ấy trưng bày bộ sưu tập búp bê cổ của mình trên chiếc kệ trang trí thanh lịch."
      },
      {
        "word": "chaise longue",
        "phonetic": "/ʃeɪz ˈlɒŋ/",
        "wordType": "noun",
        "meaningEn": "A long reclining chair with a support for the legs.",
        "meaningVi": "Ghế trường kỷ",
        "example": "She relaxed on the chaise longue by the pool, sipping a cold drink.",
        "exampleVi": "Cô ấy thư giãn trên chiếc ghế trường kỷ bên hồ bơi, nhâm nhi đồ uống lạnh."
      },
      {
        "word": "sconce",
        "phonetic": "/skɒns/",
        "wordType": "noun",
        "meaningEn": "A candle holder or a light fixture that is attached to a wall and typically designed to direct light upwards or downwards.",
        "meaningVi": "Đèn treo tường",
        "example": "Elegant sconces illuminated the hallway with a soft glow.",
        "exampleVi": "Những chiếc đèn treo tường thanh lịch chiếu sáng hành lang với ánh sáng dịu nhẹ."
      },
      {
        "word": "candelabra",
        "phonetic": "/ˌkændəˈlɑːbrə/",
        "wordType": "noun",
        "meaningEn": "A branched candlestick or lamp holder.",
        "meaningVi": "Chân nến nhiều nhánh",
        "example": "The dining table was adorned with a magnificent silver candelabra.",
        "exampleVi": "Bàn ăn được trang trí bằng một chân nến bạc lộng lẫy."
      },
      {
        "word": "tapestry",
        "phonetic": "/ˈtæpɪstri/",
        "wordType": "noun",
        "meaningEn": "A piece of thick textile fabric with pictures or designs woven into it, used as a wall hanging or furniture covering.",
        "meaningVi": "Thảm thêu, thảm trang trí tường",
        "example": "An ancient tapestry depicting a hunting scene hung in the castle hall.",
        "exampleVi": "Một tấm thảm thêu cổ xưa mô tả cảnh săn bắn được treo trong sảnh lâu đài."
      },
      {
        "word": "armorie",
        "phonetic": "/ˈɑːrməri/",
        "wordType": "noun",
        "meaningEn": "A large cupboard or wardrobe, especially one intended to store clothing or weapons.",
        "meaningVi": "Tủ lớn, tủ đựng vũ khí/quần áo",
        "example": "The old armorie in the master bedroom held a collection of antique linens.",
        "exampleVi": "Chiếc tủ lớn cũ trong phòng ngủ chính chứa một bộ sưu tập đồ vải lanh cổ."
      },
      {
        "word": "credence table",
        "phonetic": "/ˈkriːdəns ˈteɪbl/",
        "wordType": "noun",
        "meaningEn": "A small side table, especially in a church, used for holding articles required in a service.",
        "meaningVi": "Bàn phụ (thường dùng trong nhà thờ)",
        "example": "The priest placed the chalice on the credence table during the ceremony.",
        "exampleVi": "Vị linh mục đặt chén thánh lên bàn phụ trong buổi lễ."
      },
      {
        "word": "side table",
        "phonetic": "/saɪd ˈteɪbl/",
        "wordType": "noun",
        "meaningEn": "A small table placed beside a larger piece of furniture, such as a sofa or bed.",
        "meaningVi": "Bàn phụ, bàn kê cạnh",
        "example": "She placed her coffee cup on the side table next to the armchair.",
        "exampleVi": "Cô ấy đặt cốc cà phê lên bàn phụ cạnh ghế bành."
      },
      {
        "word": "nightstand",
        "phonetic": "/ˈnaɪtˌstænd/",
        "wordType": "noun",
        "meaningEn": "A small table or cabinet placed beside a bed.",
        "meaningVi": "Bàn đầu giường",
        "example": "My alarm clock is on the nightstand.",
        "exampleVi": "Đồng hồ báo thức của tôi ở trên bàn đầu giường."
      },
      {
        "word": "dresser",
        "phonetic": "/ˈdrɛsər/",
        "wordType": "noun",
        "meaningEn": "A chest of drawers, usually with a mirror on top, for storing clothes.",
        "meaningVi": "Tủ quần áo có gương, bàn trang điểm",
        "example": "She arranged her jewelry neatly on top of the dresser.",
        "exampleVi": "Cô ấy sắp xếp đồ trang sức gọn gàng trên tủ quần áo có gương."
      },
      {
        "word": "chest of drawers",
        "phonetic": "/tʃɛst əv drɔːrz/",
        "wordType": "noun",
        "meaningEn": "A piece of furniture consisting of a set of drawers in a frame, used for storing clothes.",
        "meaningVi": "Tủ ngăn kéo",
        "example": "He put his folded shirts in the chest of drawers.",
        "exampleVi": "Anh ấy đặt những chiếc áo sơ mi đã gấp vào tủ ngăn kéo."
      },
      {
        "word": "wardrobe armoire",
        "phonetic": "/ˈwɔːrdrəʊb ˈɑːrmwɑːr/",
        "wordType": "noun",
        "meaningEn": "A tall, freestanding cabinet, usually with doors and shelves or hanging space, used for storing clothes.",
        "meaningVi": "Tủ quần áo đứng độc lập (kiểu Pháp)",
        "example": "The elegant wardrobe armoire added a classic touch to the master bedroom.",
        "exampleVi": "Chiếc tủ quần áo kiểu Pháp thanh lịch đã thêm một nét cổ điển vào phòng ngủ chính."
      },
      {
        "word": "console table",
        "phonetic": "/ˈkɒnsoʊl ˈteɪbl/",
        "wordType": "noun",
        "meaningEn": "A table designed to stand against a wall, often in a hallway, used for display or as an entryway piece.",
        "meaningVi": "Bàn console (bàn kê tường)",
        "example": "She placed a vase of fresh flowers on the console table in the foyer.",
        "exampleVi": "Cô ấy đặt một bình hoa tươi trên bàn console ở sảnh."
      },
      {
        "word": "hutch cabinet",
        "phonetic": "/hʌtʃ ˈkæbɪnɪt/",
        "wordType": "noun",
        "meaningEn": "A multi-purpose storage unit, often with shelves and drawers, typically used in a kitchen or dining area.",
        "meaningVi": "Tủ chén có ngăn kéo và kệ",
        "example": "The hutch cabinet provided ample storage for their dishes and glassware.",
        "exampleVi": "Tủ chén có ngăn kéo cung cấp đủ không gian lưu trữ cho bát đĩa và ly thủy tinh của họ."
      },
      {
        "word": "vanity table",
        "phonetic": "/ˈvænɪti ˈteɪbl/",
        "wordType": "noun",
        "meaningEn": "A dressing table, usually with a mirror and drawers, for applying makeup and doing hair.",
        "meaningVi": "Bàn trang điểm",
        "example": "She sat at her vanity table to get ready for the party.",
        "exampleVi": "Cô ấy ngồi vào bàn trang điểm của mình để chuẩn bị đi dự tiệc."
      },
      {
        "word": "bookcase",
        "phonetic": "/ˈbʊkˌkeɪs/",
        "wordType": "noun",
        "meaningEn": "A piece of furniture with shelves for storing books.",
        "meaningVi": "Tủ sách",
        "example": "His extensive collection of novels filled the large bookcase.",
        "exampleVi": "Bộ sưu tập tiểu thuyết phong phú của anh ấy đã lấp đầy tủ sách lớn."
      },
      {
        "word": "credenza cabinet",
        "phonetic": "/krɪˈdɛnzə ˈkæbɪnɪt/",
        "wordType": "noun",
        "meaningEn": "A type of storage cabinet, often long and low, used in offices or dining rooms.",
        "meaningVi": "Tủ đựng đồ (văn phòng/phòng ăn)",
        "example": "The office credenza cabinet was perfect for organizing their files.",
        "exampleVi": "Tủ đựng đồ văn phòng rất phù hợp để sắp xếp các tập tin của họ."
      },
      {
        "word": "china cabinet",
        "phonetic": "/ˈtʃaɪnə ˈkæbɪnɪt/",
        "wordType": "noun",
        "meaningEn": "A display cabinet, often with glass doors, for holding and exhibiting china or other fine tableware.",
        "meaningVi": "Tủ chén đĩa (thường có cửa kính)",
        "example": "Grandma's precious china plates were carefully arranged in the china cabinet.",
        "exampleVi": "Những chiếc đĩa sứ quý giá của bà được sắp xếp cẩn thận trong tủ chén đĩa."
      },
      {
        "word": "curio cabinet",
        "phonetic": "/ˈkjʊərioʊ ˈkæbɪnɪt/",
        "wordType": "noun",
        "meaningEn": "A display cabinet, often with glass sides, for showing off curios or collectibles.",
        "meaningVi": "Tủ trưng bày đồ cổ/sưu tầm",
        "example": "His collection of antique coins was displayed in the elegantly lit curio cabinet.",
        "exampleVi": "Bộ sưu tập tiền xu cổ của anh ấy được trưng bày trong tủ trưng bày đồ cổ được chiếu sáng trang nhã."
      },
      {
        "word": "etagere shelf",
        "phonetic": "/eɪˌtɑːˈʒɛər ʃɛlf/",
        "wordType": "noun",
        "meaningEn": "An open shelving unit, typically decorative, used for displaying items.",
        "meaningVi": "Kệ trưng bày mở",
        "example": "She arranged her small pottery collection on the etagere shelf.",
        "exampleVi": "Cô ấy sắp xếp bộ sưu tập gốm nhỏ của mình trên kệ trưng bày mở."
      },
      {
        "word": "vitrine",
        "phonetic": "/vɪˈtriːn/",
        "wordType": "noun",
        "meaningEn": "A glass display case or cabinet, typically for exhibiting articles in a shop or museum.",
        "meaningVi": "Tủ kính trưng bày",
        "example": "The rare artifacts were protected inside a secure vitrine.",
        "exampleVi": "Các hiện vật quý hiếm được bảo vệ bên trong một tủ kính trưng bày an toàn."
      },
      {
        "word": "secretary desk",
        "phonetic": "/ˈsɛkrəˌtɛri dɛsk/",
        "wordType": "noun",
        "meaningEn": "A desk with a hinged desktop that folds down to provide a writing surface, often with drawers and pigeonholes above.",
        "meaningVi": "Bàn thư ký (có mặt bàn gập xuống)",
        "example": "She organized her stationery in the compartments of her antique secretary desk.",
        "exampleVi": "Cô ấy sắp xếp văn phòng phẩm của mình vào các ngăn của chiếc bàn thư ký cổ."
      },
      {
        "word": "roll-top desk",
        "phonetic": "/ˈroʊl tɒp dɛsk/",
        "wordType": "noun",
        "meaningEn": "A desk with a flexible cover that slides down to enclose the desktop.",
        "meaningVi": "Bàn làm việc có nắp cuốn",
        "example": "He kept his confidential documents hidden in the roll-top desk.",
        "exampleVi": "Anh ấy cất giữ tài liệu mật trong bàn làm việc có nắp cuốn."
      },
      {
        "word": "writing desk",
        "phonetic": "/ˈraɪtɪŋ dɛsk/",
        "wordType": "noun",
        "meaningEn": "A desk specifically designed for writing.",
        "meaningVi": "Bàn viết",
        "example": "She composed her letters at the elegant writing desk.",
        "exampleVi": "Cô ấy soạn thư trên chiếc bàn viết thanh lịch."
      },
      {
        "word": "burette",
        "phonetic": "/bjʊˈrɛt/",
        "wordType": "noun",
        "meaningEn": "A graduated glass tube with a tap at one end, for delivering known volumes of a liquid, especially in titrations.",
        "meaningVi": "Ống buret (trong phòng thí nghiệm)",
        "example": "The chemist carefully controlled the flow of liquid from the burette.",
        "exampleVi": "Nhà hóa học cẩn thận kiểm soát dòng chất lỏng từ ống buret."
      },
      {
        "word": "retort",
        "phonetic": "/rɪˈtɔːrt/",
        "wordType": "noun",
        "meaningEn": "A glass vessel with a long, bent neck, used in distillation.",
        "meaningVi": "Bình chưng cất (trong phòng thí nghiệm)",
        "example": "The scientist used a retort to distill the chemical solution.",
        "exampleVi": "Nhà khoa học đã sử dụng bình chưng cất để chưng cất dung dịch hóa học."
      },
      {
        "word": "mortar and pestle",
        "phonetic": "/ˈmɔːrtər ænd ˈpɛsl/",
        "wordType": "noun",
        "meaningEn": "A tool used to crush, grind, and mix substances.",
        "meaningVi": "Cối và chày",
        "example": "She used the mortar and pestle to grind herbs for the recipe.",
        "exampleVi": "Cô ấy đã dùng cối và chày để nghiền thảo mộc cho công thức."
      },
      {
        "word": "crucible",
        "phonetic": "/ˈkruːsəbl/",
        "wordType": "noun",
        "meaningEn": "A ceramic or metal container in which metals or other substances may be melted or subjected to very high temperatures.",
        "meaningVi": "Nồi nấu kim loại, chén nung",
        "example": "The gold was melted in a high-temperature crucible.",
        "exampleVi": "Vàng được nung chảy trong nồi nấu kim loại ở nhiệt độ cao."
      },
      {
        "word": "desiccator",
        "phonetic": "/ˈdɛsɪkeɪtər/",
        "wordType": "noun",
        "meaningEn": "A sealed container used to protect moisture-sensitive substances from humidity.",
        "meaningVi": "Bình hút ẩm (trong phòng thí nghiệm)",
        "example": "The dry chemical samples were stored in the desiccator.",
        "exampleVi": "Các mẫu hóa chất khô được lưu trữ trong bình hút ẩm."
      },
      {
        "word": "distillation apparatus",
        "phonetic": "/ˌdɪstɪˈleɪʃən ˌæpəˈreɪtəs/",
        "wordType": "noun",
        "meaningEn": "Equipment used to purify liquids by heating them to form vapor, then cooling and condensing the vapor back into liquid.",
        "meaningVi": "Thiết bị chưng cất",
        "example": "The chemistry students assembled the distillation apparatus for the experiment.",
        "exampleVi": "Các sinh viên hóa học đã lắp ráp thiết bị chưng cất cho thí nghiệm."
      },
      {
        "word": "chromatography column",
        "phonetic": "/ˌkroʊməˈtɒɡrəfi ˈkɒləm/",
        "wordType": "noun",
        "meaningEn": "A tube packed with a stationary phase, used to separate mixtures in chromatography.",
        "meaningVi": "Cột sắc ký (trong phòng thí nghiệm)",
        "example": "The researchers used a chromatography column to separate the components of the mixture.",
        "exampleVi": "Các nhà nghiên cứu đã sử dụng cột sắc ký để tách các thành phần của hỗn hợp."
      },
      {
        "word": "spectrophotometer",
        "phonetic": "/ˌspɛktroʊfəˈtɒmɪtər/",
        "wordType": "noun",
        "meaningEn": "An apparatus for measuring the intensity of light in different parts of the spectrum, used in chemical analysis.",
        "meaningVi": "Máy quang phổ kế",
        "example": "The spectrophotometer was used to determine the concentration of the solution.",
        "exampleVi": "Máy quang phổ kế được sử dụng để xác định nồng độ của dung dịch."
      },
      {
        "word": "centrifuge",
        "phonetic": "/ˈsɛntrɪfjuːdʒ/",
        "wordType": "noun",
        "meaningEn": "A machine with a rapidly rotating container that applies centrifugal force to its contents, typically to separate fluids of different densities or liquids from solids.",
        "meaningVi": "Máy ly tâm",
        "example": "Blood samples were processed in the centrifuge to separate plasma.",
        "exampleVi": "Các mẫu máu đã được xử lý trong máy ly tâm để tách huyết tương."
      },
      {
        "word": "incubator",
        "phonetic": "/ˈɪŋkjʊˌbeɪtər/",
        "wordType": "noun",
        "meaningEn": "An enclosed apparatus in which environmental conditions such as temperature and humidity can be regulated, used for the cultivation of microorganisms or the hatching of eggs.",
        "meaningVi": "Lồng ấp, máy ủ",
        "example": "The bacterial cultures were kept at a constant temperature in the incubator.",
        "exampleVi": "Các nuôi cấy vi khuẩn được giữ ở nhiệt độ không đổi trong máy ủ."
      },
      {
        "word": "autoclave",
        "phonetic": "/ˈɔːtəʊˌkleɪv/",
        "wordType": "noun",
        "meaningEn": "A strong, heated container used for chemical reactions and other processes using high pressures and temperatures, e.g. sterilizing surgical equipment.",
        "meaningVi": "Nồi hấp tiệt trùng",
        "example": "All medical instruments must be sterilized in an autoclave before use.",
        "exampleVi": "Tất cả các dụng cụ y tế phải được tiệt trùng trong nồi hấp trước khi sử dụng."
      },
      {
        "word": "fume hood",
        "phonetic": "/fjuːm hʊd/",
        "wordType": "noun",
        "meaningEn": "A ventilation device that limits exposure to hazardous or toxic fumes, vapors or dust.",
        "meaningVi": "Tủ hút khí độc",
        "example": "Always conduct experiments involving strong chemicals under the fume hood.",
        "exampleVi": "Luôn thực hiện các thí nghiệm liên quan đến hóa chất mạnh dưới tủ hút khí độc."
      },
      {
        "word": "pipette",
        "phonetic": "/pɪˈpɛt/",
        "wordType": "noun",
        "meaningEn": "A slender tube for transferring or measuring small amounts of liquid, especially in a laboratory.",
        "meaningVi": "Ống pipet",
        "example": "The technician used a pipette to accurately measure the reagent.",
        "exampleVi": "Kỹ thuật viên đã sử dụng ống pipet để đo chính xác thuốc thử."
      },
      {
        "word": "buret clamp",
        "phonetic": "/bjʊˈrɛt klæmp/",
        "wordType": "noun",
        "meaningEn": "A device used to hold a burette upright on a retort stand.",
        "meaningVi": "Kẹp buret",
        "example": "Secure the burette with the buret clamp to prevent it from falling.",
        "exampleVi": "Kẹp chặt ống buret bằng kẹp buret để tránh nó bị rơi."
      },
      {
        "word": "conical flask",
        "phonetic": "/ˈkɒnɪkl flɑːsk/",
        "wordType": "noun",
        "meaningEn": "A flask with a flat bottom, a conical body, and a cylindrical neck, commonly used in chemistry laboratories.",
        "meaningVi": "Bình nón",
        "example": "He poured the solution into a conical flask for titration.",
        "exampleVi": "Anh ấy đổ dung dịch vào bình nón để chuẩn độ."
      },
      {
        "word": "beaker",
        "phonetic": "/ˈbiːkər/",
        "wordType": "noun",
        "meaningEn": "A flat-bottomed cylindrical container, typically made of glass, used in laboratories.",
        "meaningVi": "Cốc có mỏ (trong phòng thí nghiệm)",
        "example": "Measure 100 ml of water in the beaker.",
        "exampleVi": "Đong 100 ml nước vào cốc có mỏ."
      }
    ]
  },
  {
    "id": "house",
    "title": "Nhà cửa & Phòng ốc (House & Living Space)",
    "desc": "Từ vựng miêu tả cấu trúc ngôi nhà, các phòng ốc, sân vườn và không gian sinh hoạt gia đình.",
    "color": "border-emerald-300 bg-emerald-100/30 text-emerald-800 hover:border-emerald-500 dark:bg-slate-900/50 dark:border-slate-800 dark:text-emerald-300",
    "beginner": [
      {
        "word": "house",
        "phonetic": "/haʊs/",
        "wordType": "noun",
        "meaningEn": "a building for human habitation",
        "meaningVi": "ngôi nhà",
        "example": "They built a big house.",
        "exampleVi": "Họ đã xây một ngôi nhà lớn."
      },
      {
        "word": "kitchen",
        "phonetic": "/ˈkɪtʃ.ən/",
        "wordType": "noun",
        "meaningEn": "a room or area where food is prepared and cooked",
        "meaningVi": "nhà bếp, phòng bếp",
        "example": "My mom is cooking in the kitchen.",
        "exampleVi": "Mẹ tôi đang nấu ăn trong bếp."
      },
      {
        "word": "bedroom",
        "phonetic": "/ˈbed.ruːm/",
        "wordType": "noun",
        "meaningEn": "a room for sleeping in",
        "meaningVi": "phòng ngủ",
        "example": "My bedroom is clean and quiet.",
        "exampleVi": "Phòng ngủ của tôi sạch sẽ và yên tĩnh."
      },
      {
        "word": "bathroom",
        "phonetic": "/ˈbɑːθ.ruːm/",
        "wordType": "noun",
        "meaningEn": "a room containing a bath or shower and usually a toilet",
        "meaningVi": "phòng tắm, nhà vệ sinh",
        "example": "Wash your hands in the bathroom.",
        "exampleVi": "Hãy rửa tay của bạn trong phòng tắm."
      },
      {
        "word": "living room",
        "phonetic": "/ˈlɪv.ɪŋ ˌruːm/",
        "wordType": "noun",
        "meaningEn": "the room in a house that is used for relaxing and entertaining guests",
        "meaningVi": "phòng khách",
        "example": "We watch TV in the living room.",
        "exampleVi": "Chúng tôi xem TV ở phòng khách."
      },
      {
        "word": "wall",
        "phonetic": "/wɔːl/",
        "wordType": "noun",
        "meaningEn": "a continuous vertical brick or stone structure that encloses an area",
        "meaningVi": "bức tường",
        "example": "The wall is painted light blue.",
        "exampleVi": "Bức tường được sơn màu xanh dương nhạt."
      },
      {
        "word": "floor",
        "phonetic": "/flɔːr/",
        "wordType": "noun",
        "meaningEn": "the lower surface of a room, on which one stands",
        "meaningVi": "sàn nhà, tầng nhà",
        "example": "Clean the kitchen floor.",
        "exampleVi": "Hãy lau sạch sàn nhà bếp."
      },
      {
        "word": "roof",
        "phonetic": "/ruːf/",
        "wordType": "noun",
        "meaningEn": "the structure forming the upper covering of a building",
        "meaningVi": "mái nhà",
        "example": "Rain is dripping from the roof.",
        "exampleVi": "Nước mưa đang nhỏ giọt từ mái nhà xuống."
      },
      {
        "word": "garden",
        "phonetic": "/ˈɡɑː.dən/",
        "wordType": "noun",
        "meaningEn": "a piece of ground next to a house, used for growing flowers or vegetables",
        "meaningVi": "khu vườn",
        "example": "She grows roses in the garden.",
        "exampleVi": "Cô ấy trồng hoa hồng trong vườn."
      },
      {
        "word": "garage",
        "phonetic": "/ˈɡær.ɑːʒ/",
        "wordType": "noun",
        "meaningEn": "a building for housing a motor vehicle or vehicles",
        "meaningVi": "nhà để xe, ga-ra",
        "example": "Park the car in the garage.",
        "exampleVi": "Đỗ xe trong nhà để xe."
      },
      {
        "word": "doorbell",
        "phonetic": "/ˈdɔː.bel/",
        "wordType": "noun",
        "meaningEn": "a bell operated by a button beside an outer door",
        "meaningVi": "chuông cửa",
        "example": "I heard the doorbell ring.",
        "exampleVi": "Tôi nghe tiếng chuông cửa reo."
      },
      {
        "word": "gate",
        "phonetic": "/ɡeɪt/",
        "wordType": "noun",
        "meaningEn": "a hinged barrier used to close an opening in a wall or fence",
        "meaningVi": "cái cổng",
        "example": "Close the iron gate, please.",
        "exampleVi": "Làm ơn hãy đóng cổng sắt lại."
      },
      {
        "word": "ceiling",
        "phonetic": "/ˈsiː.lɪŋ/",
        "wordType": "noun",
        "meaningEn": "the upper interior surface of a room",
        "meaningVi": "trần nhà",
        "example": "A lamp hangs from the ceiling.",
        "exampleVi": "Một chiếc đèn treo trên trần nhà."
      },
      {
        "word": "yard",
        "phonetic": "/jɑːd/",
        "wordType": "noun",
        "meaningEn": "an area of land next to a building, usually covered with grass",
        "meaningVi": "cái sân",
        "example": "Children are playing in the yard.",
        "exampleVi": "Trẻ con đang chơi ngoài sân."
      },
      {
        "word": "stairs",
        "phonetic": "/steəz/",
        "wordType": "noun pl",
        "meaningEn": "a set of steps leading from one floor of a building to another",
        "meaningVi": "cầu thang",
        "example": "He walked up the stairs.",
        "exampleVi": "Anh ấy đã bước lên cầu thang."
      },
      {
        "word": "fence",
        "phonetic": "/fens/",
        "wordType": "noun",
        "meaningEn": "a barrier enclosing an area, typically of wood or wire",
        "meaningVi": "hàng rào",
        "example": "The white fence surrounds the garden.",
        "exampleVi": "Hàng rào màu trắng bao quanh khu vườn."
      },
      {
        "word": "basement",
        "phonetic": "/ˈbeɪs.mənt/",
        "wordType": "noun",
        "meaningEn": "the lowermost part of a building, partly or wholly below ground level",
        "meaningVi": "tầng hầm",
        "example": "We store old stuff in the basement.",
        "exampleVi": "Chúng tôi cất trữ đồ đạc cũ dưới tầng hầm."
      },
      {
        "word": "hall",
        "phonetic": "/hɔːl/",
        "wordType": "noun",
        "meaningEn": "the area just inside the main entrance of a house",
        "meaningVi": "sảnh lớn, hành lang vào",
        "example": "Hang your coat in the entrance hall.",
        "exampleVi": "Hãy treo áo khoác của bạn ở sảnh vào."
      },
      {
        "word": "corridor",
        "phonetic": "/ˈkɒr.ɪ.dɔːr/",
        "wordType": "noun",
        "meaningEn": "a long passage in a building from which doors lead into rooms",
        "meaningVi": "hành lang dài",
        "example": "Her room is down the corridor.",
        "exampleVi": "Phòng của cô ấy nằm ở cuối hành lang."
      },
      {
        "word": "dining room",
        "phonetic": "/ˈdaɪ.nɪŋ ˌruːm/",
        "wordType": "noun",
        "meaningEn": "a room in which meals are eaten",
        "meaningVi": "phòng ăn",
        "example": "We have dinner in the dining room.",
        "exampleVi": "Chúng tôi ăn tối trong phòng ăn."
      },
      {
        "word": "attic",
        "phonetic": "/ˈæt.ɪk/",
        "wordType": "noun",
        "meaningEn": "a space or room just below the roof of a house",
        "meaningVi": "gác mái",
        "example": "There are old chests in the attic.",
        "exampleVi": "Có những chiếc hòm cũ ở trên gác mái."
      },
      {
        "word": "lawn",
        "phonetic": "/lɔːn/",
        "wordType": "noun",
        "meaningEn": "an area of short, regularly mown grass in the garden",
        "meaningVi": "bãi cỏ",
        "example": "He is mowing the lawn today.",
        "exampleVi": "Hôm nay anh ấy đang cắt cỏ."
      },
      {
        "word": "closet",
        "phonetic": "/ˈklɒz.ɪt/",
        "wordType": "noun",
        "meaningEn": "a small room or cupboard for storing clothes",
        "meaningVi": "buồng tủ quần áo",
        "example": "She has a walk-in closet in her bedroom.",
        "exampleVi": "Cô ấy có một tủ quần áo âm tường trong phòng ngủ."
      },
      {
        "word": "windowpane",
        "phonetic": "/ˈwɪn.dəʊ.peɪn/",
        "wordType": "noun",
        "meaningEn": "a single sheet of glass in a window",
        "meaningVi": "ô kính cửa sổ",
        "example": "Raindrops hit the windowpane.",
        "exampleVi": "Những giọt nước mưa đập vào ô kính cửa sổ."
      },
      {
        "word": "porch",
        "phonetic": "/pɔːtʃ/",
        "wordType": "noun",
        "meaningEn": "a covered shelter projecting in front of the entrance of a building",
        "meaningVi": "mái hiên trước nhà",
        "example": "We sat on the porch drinking lemonade.",
        "exampleVi": "Chúng tôi đã ngồi ngoài mái hiên uống nước chanh."
      },
      {
        "word": "door",
        "phonetic": "/dɔːr/",
        "wordType": "noun",
        "meaningEn": "A movable barrier at the entrance of a building or room.",
        "meaningVi": "Cửa ra vào, cửa phòng",
        "example": "Please close the door when you leave.",
        "exampleVi": "Làm ơn đóng cửa khi bạn rời đi."
      },
      {
        "word": "window",
        "phonetic": "/ˈwɪn.doʊ/",
        "wordType": "noun",
        "meaningEn": "An opening in the wall or roof of a building that is fitted with glass or other transparent material in a frame to admit light or air and allow people to see out.",
        "meaningVi": "Cửa sổ",
        "example": "Open the window to let fresh air in.",
        "exampleVi": "Mở cửa sổ để không khí trong lành vào."
      },
      {
        "word": "chair",
        "phonetic": "/tʃer/",
        "wordType": "noun",
        "meaningEn": "A seat for one person, typically with a back and four legs.",
        "meaningVi": "Ghế",
        "example": "Sit on the chair and rest.",
        "exampleVi": "Ngồi xuống ghế và nghỉ ngơi."
      },
      {
        "word": "table",
        "phonetic": "/ˈteɪ.bəl/",
        "wordType": "noun",
        "meaningEn": "A piece of furniture with a flat top and one or more legs, providing a level surface for eating, writing, or working.",
        "meaningVi": "Bàn",
        "example": "Put the book on the table.",
        "exampleVi": "Đặt cuốn sách lên bàn."
      },
      {
        "word": "bed",
        "phonetic": "/bed/",
        "wordType": "noun",
        "meaningEn": "A piece of furniture for sleeping on, typically a framework with a mattress and coverings.",
        "meaningVi": "Giường",
        "example": "I'm tired, I want to go to bed.",
        "exampleVi": "Tôi mệt, tôi muốn đi ngủ."
      },
      {
        "word": "sofa",
        "phonetic": "/ˈsoʊ.fə/",
        "wordType": "noun",
        "meaningEn": "A long upholstered seat with a back and arms, for two or more people.",
        "meaningVi": "Ghế sofa",
        "example": "We watch TV on the sofa.",
        "exampleVi": "Chúng tôi xem TV trên ghế sofa."
      },
      {
        "word": "lamp",
        "phonetic": "/læmp/",
        "wordType": "noun",
        "meaningEn": "A device for giving light, either one consisting of an electric bulb together with its holder and shade or one burning oil, gas, or other fuel.",
        "meaningVi": "Đèn",
        "example": "Turn on the lamp, it's dark in here.",
        "exampleVi": "Bật đèn lên, ở đây tối quá."
      },
      {
        "word": "carpet",
        "phonetic": "/ˈkɑːr.pɪt/",
        "wordType": "noun",
        "meaningEn": "A floor covering made from thick woven fabric.",
        "meaningVi": "Thảm",
        "example": "There is a soft carpet in the living room.",
        "exampleVi": "Có một tấm thảm mềm trong phòng khách."
      },
      {
        "word": "curtains",
        "phonetic": "/ˈkɜːr.tənz/",
        "wordType": "noun",
        "meaningEn": "A piece of material suspended at the top to form a covering or screen, typically one of a pair at a window.",
        "meaningVi": "Rèm cửa",
        "example": "Close the curtains at night.",
        "exampleVi": "Đóng rèm cửa vào ban đêm."
      },
      {
        "word": "picture",
        "phonetic": "/ˈpɪk.tʃər/",
        "wordType": "noun",
        "meaningEn": "A painting or drawing.",
        "meaningVi": "Bức tranh",
        "example": "There's a nice picture on the wall.",
        "exampleVi": "Có một bức tranh đẹp trên tường."
      },
      {
        "word": "mirror",
        "phonetic": "/ˈmɪr.ər/",
        "wordType": "noun",
        "meaningEn": "A surface or object that reflects light, typically a glass surface with a silvery, metallic, or amalgam backing, that reflects a clear image.",
        "meaningVi": "Gương",
        "example": "She looked at herself in the mirror.",
        "exampleVi": "Cô ấy nhìn mình trong gương."
      },
      {
        "word": "shelf",
        "phonetic": "/ʃelf/",
        "wordType": "noun",
        "meaningEn": "A flat length of wood or other rigid material, attached to a wall or forming part of a unit, used for storing objects.",
        "meaningVi": "Kệ",
        "example": "Put the books on the shelf.",
        "exampleVi": "Đặt sách lên kệ."
      },
      {
        "word": "drawer",
        "phonetic": "/drɔːr/",
        "wordType": "noun",
        "meaningEn": "A boxlike container without a top, designed to slide in and out of a cabinet or other piece of furniture.",
        "meaningVi": "Ngăn kéo",
        "example": "Keep your clothes in the drawer.",
        "exampleVi": "Giữ quần áo của bạn trong ngăn kéo."
      },
      {
        "word": "fridge",
        "phonetic": "/frɪdʒ/",
        "wordType": "noun",
        "meaningEn": "A refrigerator.",
        "meaningVi": "Tủ lạnh",
        "example": "The milk is in the fridge.",
        "exampleVi": "Sữa ở trong tủ lạnh."
      },
      {
        "word": "oven",
        "phonetic": "/ˈʌv.ən/",
        "wordType": "noun",
        "meaningEn": "An enclosed compartment, usually part of a cooker, for cooking and heating food.",
        "meaningVi": "Lò nướng",
        "example": "Bake the cake in the oven.",
        "exampleVi": "Nướng bánh trong lò."
      },
      {
        "word": "sink",
        "phonetic": "/sɪŋk/",
        "wordType": "noun",
        "meaningEn": "A fixed basin, typically with a water supply and drainage, used for washing up or washing one's hands.",
        "meaningVi": "Bồn rửa",
        "example": "Wash the dishes in the sink.",
        "exampleVi": "Rửa chén trong bồn rửa."
      },
      {
        "word": "toilet",
        "phonetic": "/ˈtɔɪ.lət/",
        "wordType": "noun",
        "meaningEn": "A ceramic bowl with a hinged seat and a flushing mechanism, used for defecation and urination.",
        "meaningVi": "Nhà vệ sinh (bồn cầu)",
        "example": "The toilet is in the bathroom.",
        "exampleVi": "Nhà vệ sinh ở trong phòng tắm."
      },
      {
        "word": "shower",
        "phonetic": "/ˈʃaʊ.ər/",
        "wordType": "noun",
        "meaningEn": "A device that sprays water for people to wash themselves.",
        "meaningVi": "Vòi hoa sen",
        "example": "I take a shower every morning.",
        "exampleVi": "Tôi tắm vòi sen mỗi sáng."
      },
      {
        "word": "bathtub",
        "phonetic": "/ˈbæθ.tʌb/",
        "wordType": "noun",
        "meaningEn": "A long container for water, in which a person may wash themselves.",
        "meaningVi": "Bồn tắm",
        "example": "Relax in the bathtub with some bubbles.",
        "exampleVi": "Thư giãn trong bồn tắm với bọt xà phòng."
      },
      {
        "word": "towel",
        "phonetic": "/ˈtaʊ.əl/",
        "wordType": "noun",
        "meaningEn": "A piece of absorbent cloth or paper for drying oneself or wiping things dry.",
        "meaningVi": "Khăn tắm",
        "example": "Grab a clean towel after your shower.",
        "exampleVi": "Lấy một cái khăn sạch sau khi tắm."
      },
      {
        "word": "rug",
        "phonetic": "/rʌɡ/",
        "wordType": "noun",
        "meaningEn": "A floor covering of thick woven material or animal skin, typically not extending over the whole floor.",
        "meaningVi": "Thảm nhỏ",
        "example": "There's a small rug by the bed.",
        "exampleVi": "Có một tấm thảm nhỏ cạnh giường."
      },
      {
        "word": "cushion",
        "phonetic": "/ˈkʊʃ.ən/",
        "wordType": "noun",
        "meaningEn": "A bag of cloth stuffed with soft material, used for resting on or against.",
        "meaningVi": "Gối tựa, đệm",
        "example": "The sofa has soft cushions.",
        "exampleVi": "Ghế sofa có những chiếc gối tựa mềm mại."
      },
      {
        "word": "blanket",
        "phonetic": "/ˈblæŋ.kɪt/",
        "wordType": "noun",
        "meaningEn": "A large piece of woolen or similar material used as a covering on a bed or for warmth.",
        "meaningVi": "Chăn",
        "example": "Pull the blanket up, it's cold.",
        "exampleVi": "Kéo chăn lên đi, trời lạnh đấy."
      },
      {
        "word": "pillow",
        "phonetic": "/ˈpɪl.oʊ/",
        "wordType": "noun",
        "meaningEn": "A rectangular cloth bag filled with soft material, used for resting one's head on in bed.",
        "meaningVi": "Gối đầu",
        "example": "I need a soft pillow for my head.",
        "exampleVi": "Tôi cần một cái gối mềm cho đầu."
      },
      {
        "word": "wardrobe",
        "phonetic": "/ˈwɔːr.droʊb/",
        "wordType": "noun",
        "meaningEn": "A large, tall cupboard in which clothes may be hung or stored.",
        "meaningVi": "Tủ quần áo",
        "example": "Hang your shirts in the wardrobe.",
        "exampleVi": "Treo áo sơ mi của bạn vào tủ quần áo."
      },
      {
        "word": "bookcase",
        "phonetic": "/ˈbʊk.keɪs/",
        "wordType": "noun",
        "meaningEn": "A piece of furniture with shelves for storing books.",
        "meaningVi": "Tủ sách",
        "example": "My bookcase is full of novels.",
        "exampleVi": "Tủ sách của tôi đầy tiểu thuyết."
      },
      {
        "word": "desk",
        "phonetic": "/desk/",
        "wordType": "noun",
        "meaningEn": "A piece of furniture with a flat top and often drawers, at which one can read, write, or do other work.",
        "meaningVi": "Bàn làm việc",
        "example": "I do my homework at my desk.",
        "exampleVi": "Tôi làm bài tập ở bàn làm việc của mình."
      },
      {
        "word": "computer",
        "phonetic": "/kəmˈpjuː.t̬ər/",
        "wordType": "noun",
        "meaningEn": "An electronic device for storing and processing data, typically in binary form, according to instructions given to it in a variable program.",
        "meaningVi": "Máy tính",
        "example": "I use my computer for work and games.",
        "exampleVi": "Tôi dùng máy tính để làm việc và chơi game."
      },
      {
        "word": "television",
        "phonetic": "/ˈtel.ə.vɪʒ.ən/",
        "wordType": "noun",
        "meaningEn": "An electronic device that receives television signals and displays them on a screen.",
        "meaningVi": "Tivi",
        "example": "What's on television tonight?",
        "exampleVi": "Tối nay có gì trên tivi?"
      },
      {
        "word": "remote",
        "phonetic": "/rɪˈmoʊt/",
        "wordType": "noun",
        "meaningEn": "A device that you use to control a television, etc. from a distance.",
        "meaningVi": "Điều khiển từ xa",
        "example": "Where is the TV remote control?",
        "exampleVi": "Cái điều khiển tivi đâu rồi?"
      },
      {
        "word": "light",
        "phonetic": "/laɪt/",
        "wordType": "noun",
        "meaningEn": "The natural agent that stimulates sight and makes things visible.",
        "meaningVi": "Ánh sáng, đèn",
        "example": "Turn off the light when you leave the room.",
        "exampleVi": "Tắt đèn khi bạn rời khỏi phòng."
      },
      {
        "word": "switch",
        "phonetic": "/swɪtʃ/",
        "wordType": "noun",
        "meaningEn": "A device for making and breaking the connection in an electric circuit.",
        "meaningVi": "Công tắc",
        "example": "Flip the light switch to turn it on.",
        "exampleVi": "Bật công tắc đèn để bật nó lên."
      },
      {
        "word": "clock",
        "phonetic": "/klɑːk/",
        "wordType": "noun",
        "meaningEn": "A device for measuring and indicating time, typically by means of hands on a dial or by digital display.",
        "meaningVi": "Đồng hồ",
        "example": "The clock on the wall says 3 o'clock.",
        "exampleVi": "Đồng hồ trên tường chỉ 3 giờ."
      },
      {
        "word": "picture frame",
        "phonetic": "/ˈpɪk.tʃər freɪm/",
        "wordType": "noun",
        "meaningEn": "A border of wood, metal, or plastic that goes around a picture or mirror.",
        "meaningVi": "Khung ảnh",
        "example": "She put her family photo in a beautiful picture frame.",
        "exampleVi": "Cô ấy đặt ảnh gia đình vào một khung ảnh đẹp."
      },
      {
        "word": "plant",
        "phonetic": "/plænt/",
        "wordType": "noun",
        "meaningEn": "A living organism of the kind exemplified by trees, shrubs, herbs, grasses, ferns, and mosses, typically growing in a permanent site, absorbing water and inorganic substances through its roots, and synthesizing nutrients in its leaves by photosynthesis using the energy of sunlight.",
        "meaningVi": "Cây trồng",
        "example": "There are many green plants in the living room.",
        "exampleVi": "Có nhiều cây xanh trong phòng khách."
      },
      {
        "word": "flowerpot",
        "phonetic": "/ˈflaʊ.ər.pɑːt/",
        "wordType": "noun",
        "meaningEn": "A container in which plants are grown.",
        "meaningVi": "Chậu hoa",
        "example": "She placed the basil in a small flowerpot.",
        "exampleVi": "Cô ấy đặt cây húng quế vào một chậu hoa nhỏ."
      },
      {
        "word": "path",
        "phonetic": "/pæθ/",
        "wordType": "noun",
        "meaningEn": "A way or track made across ground by the passage of people or animals.",
        "meaningVi": "Lối đi",
        "example": "Follow the garden path to the back gate.",
        "exampleVi": "Đi theo lối đi trong vườn ra cổng sau."
      },
      {
        "word": "driveway",
        "phonetic": "/ˈdraɪv.weɪ/",
        "wordType": "noun",
        "meaningEn": "A short private road leading from a public road to a house or garage.",
        "meaningVi": "Đường lái xe vào nhà",
        "example": "Park your car in the driveway.",
        "exampleVi": "Đỗ xe của bạn trên đường lái xe vào nhà."
      },
      {
        "word": "mail",
        "phonetic": "/meɪl/",
        "wordType": "noun",
        "meaningEn": "Letters and packages conveyed by the postal system.",
        "meaningVi": "Thư, bưu phẩm",
        "example": "Did you check the mail today?",
        "exampleVi": "Hôm nay bạn đã kiểm tra thư chưa?"
      },
      {
        "word": "mailbox",
        "phonetic": "/ˈmeɪl.bɑːks/",
        "wordType": "noun",
        "meaningEn": "A public box in which letters are posted or delivered.",
        "meaningVi": "Hộp thư",
        "example": "The mailman put a letter in our mailbox.",
        "exampleVi": "Người đưa thư bỏ một lá thư vào hộp thư của chúng tôi."
      },
      {
        "word": "roof tiles",
        "phonetic": "/ruːf taɪlz/",
        "wordType": "noun",
        "meaningEn": "Pieces of baked clay or other material used for covering a roof.",
        "meaningVi": "Ngói lợp mái",
        "example": "The old house needs new roof tiles.",
        "exampleVi": "Ngôi nhà cũ cần ngói lợp mái mới."
      },
      {
        "word": "chimney stack",
        "phonetic": "/ˈtʃɪm.ni stæk/",
        "wordType": "noun",
        "meaningEn": "A structure on a roof through which smoke or steam is carried away.",
        "meaningVi": "Ống khói",
        "example": "Smoke rose from the chimney stack on a cold day.",
        "exampleVi": "Khói bốc lên từ ống khói vào một ngày lạnh."
      },
      {
        "word": "doormat",
        "phonetic": "/ˈdɔːr.mæt/",
        "wordType": "noun",
        "meaningEn": "A mat placed in front of a door for wiping one's shoes on.",
        "meaningVi": "Thảm chùi chân",
        "example": "Wipe your feet on the doormat before coming in.",
        "exampleVi": "Chùi chân vào thảm chùi chân trước khi vào."
      },
      {
        "word": "patio",
        "phonetic": "/ˈpæt.i.oʊ/",
        "wordType": "noun",
        "meaningEn": "A paved outdoor area adjoining a house, used for dining or relaxing.",
        "meaningVi": "Sân hiên",
        "example": "We like to have breakfast on the patio in summer.",
        "exampleVi": "Chúng tôi thích ăn sáng trên sân hiên vào mùa hè."
      },
      {
        "word": "utility room",
        "phonetic": "/juːˈtɪl.ə.ti ruːm/",
        "wordType": "noun",
        "meaningEn": "A room, typically in a house, containing a washing machine, tumble dryer, and often a sink.",
        "meaningVi": "Phòng tiện ích (giặt ủi)",
        "example": "The washing machine is in the utility room.",
        "exampleVi": "Máy giặt ở trong phòng tiện ích."
      }
    ],
    "advanced": [
      {
        "word": "apartment",
        "phonetic": "/əˈpɑːt.mənt/",
        "wordType": "noun",
        "meaningEn": "a suite of rooms forming one residence, typically in a building",
        "meaningVi": "căn hộ chung cư",
        "example": "She rented a two-bedroom apartment.",
        "exampleVi": "Cô ấy đã thuê một căn hộ hai phòng ngủ."
      },
      {
        "word": "balcony",
        "phonetic": "/ˈbæl.kə.ni/",
        "wordType": "noun",
        "meaningEn": "a platform projecting from the wall of a building",
        "meaningVi": "ban công",
        "example": "He was standing on the balcony.",
        "exampleVi": "Anh ấy đã đứng ngoài ban công."
      },
      {
        "word": "fireplace",
        "phonetic": "/ˈfaɪə.pleɪs/",
        "wordType": "noun",
        "meaningEn": "a place for a domestic fire, especially a grate at base of chimney",
        "meaningVi": "lò sưởi",
        "example": "We sat close to the fireplace.",
        "exampleVi": "Chúng tôi đã ngồi gần lò sưởi."
      },
      {
        "word": "insulation",
        "phonetic": "/ˌɪn.sjəˈleɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "material used to insulate something, especially a building",
        "meaningVi": "vật liệu cách nhiệt/cách âm",
        "example": "Good insulation saves energy.",
        "exampleVi": "Cách nhiệt tốt giúp tiết kiệm năng lượng."
      },
      {
        "word": "mortgage",
        "phonetic": "/ˈmɔː.ɡɪdʒ/",
        "wordType": "noun",
        "meaningEn": "a legal agreement by which a bank lends money for buying property",
        "meaningVi": "khoản vay thế chấp mua nhà",
        "example": "They took out a mortgage to buy the house.",
        "exampleVi": "Họ đã vay thế chấp ngân hàng để mua ngôi nhà đó."
      },
      {
        "word": "tenant",
        "phonetic": "/ˈten.ənt/",
        "wordType": "noun",
        "meaningEn": "a person who occupies land or property rented from a landlord",
        "meaningVi": "người thuê nhà",
        "example": "The tenant paid the rent on time.",
        "exampleVi": "Người thuê nhà đã trả tiền nhà đúng hạn."
      },
      {
        "word": "landlord",
        "phonetic": "/ˈlænd.lɔːd/",
        "wordType": "noun",
        "meaningEn": "a person who rents land, a building, or an apartment to a tenant",
        "meaningVi": "chủ nhà, chủ đất",
        "example": "The landlord agreed to repair the door.",
        "exampleVi": "Chủ nhà đã đồng ý sửa chữa cánh cửa."
      },
      {
        "word": "renovation",
        "phonetic": "/ˌren.əˈveɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "the action of renovating a building or room",
        "meaningVi": "sự đổi mới, cải tạo sửa sang nhà",
        "example": "The house is undergoing renovation.",
        "exampleVi": "Ngôi nhà đang được cải tạo sửa chữa."
      },
      {
        "word": "dwelling",
        "phonetic": "/ˈdwel.ɪŋ/",
        "wordType": "noun",
        "meaningEn": "a house, flat, or other place of residence",
        "meaningVi": "nơi ở, trú ngụ",
        "example": "A cottage was their only dwelling.",
        "exampleVi": "Một túp lều tranh là nơi ở duy nhất của họ."
      },
      {
        "word": "suburb",
        "phonetic": "/ˈsʌb.ɜːb/",
        "wordType": "noun",
        "meaningEn": "an outlying district of a city, especially a residential one",
        "meaningVi": "vùng ngoại ô",
        "example": "They live in a quiet suburb.",
        "exampleVi": "Họ sống ở một vùng ngoại ô yên tĩnh."
      },
      {
        "word": "ventilation",
        "phonetic": "/ˌven.tɪˈleɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "the provision of fresh air to a room or building",
        "meaningVi": "sự thông gió, hệ thống thông gió",
        "example": "The bathroom needs better ventilation.",
        "exampleVi": "Phòng tắm cần hệ thống thông gió tốt hơn."
      },
      {
        "word": "chimney",
        "phonetic": "/ˈtʃɪm.ni/",
        "wordType": "noun",
        "meaningEn": "a vertical pipe which conducts smoke and gases up from a fire",
        "meaningVi": "ống khói",
        "example": "Smoke poured out of the chimney.",
        "exampleVi": "Khói cuộn bay ra từ ống khói."
      },
      {
        "word": "blueprint",
        "phonetic": "/ˈbluː.prɪnt/",
        "wordType": "noun",
        "meaningEn": "a design plan or other technical drawing of a building",
        "meaningVi": "bản thiết kế xây dựng",
        "example": "The architect drew the house blueprints.",
        "exampleVi": "Kiến trúc sư đã vẽ bản thiết kế xây dựng ngôi nhà."
      },
      {
        "word": "property",
        "phonetic": "/ˈprɒp.ə.ti/",
        "wordType": "noun",
        "meaningEn": "a building or land belonging to someone",
        "meaningVi": "bất động sản, tài sản",
        "example": "We are looking for investment properties.",
        "exampleVi": "Chúng tôi đang tìm kiếm các bất động sản đầu tư."
      },
      {
        "word": "lease",
        "phonetic": "/liːs/",
        "wordType": "noun/verb",
        "meaningEn": "a contract by which one party conveys land or property to another for a specified time",
        "meaningVi": "hợp đồng cho thuê, việc cho thuê",
        "example": "We signed a two-year lease for the flat.",
        "exampleVi": "Chúng tôi đã ký một hợp đồng thuê căn hộ thời hạn hai năm."
      },
      {
        "word": "estate",
        "phonetic": "/ɪˈsteɪt/",
        "wordType": "noun",
        "meaningEn": "a large area of land, or property, especially with a large house",
        "meaningVi": "khu bất động sản, di sản",
        "example": "He owns a massive country estate.",
        "exampleVi": "Ông ấy sở hữu một vùng bất động sản ngoại ô rộng lớn."
      },
      {
        "word": "penthouse",
        "phonetic": "/ˈpent.haʊs/",
        "wordType": "noun",
        "meaningEn": "an expensive apartment on the top floor of a tall building",
        "meaningVi": "căn hộ thông tầng áp mái cao cấp",
        "example": "The luxurious penthouse has stunning views.",
        "exampleVi": "Căn hộ penthouse sang trọng có góc nhìn tuyệt đẹp."
      },
      {
        "word": "structure",
        "phonetic": "/ˈstrʌk.tʃər/",
        "wordType": "noun",
        "meaningEn": "a building or other object constructed from several parts",
        "meaningVi": "cấu trúc xây dựng, công trình",
        "example": "The steel structure is very stable.",
        "exampleVi": "Kết cấu khung thép rất ổn định."
      },
      {
        "word": "utility",
        "phonetic": "/juːˈtɪl.ə.ti/",
        "wordType": "noun",
        "meaningEn": "services such as gas, electricity, and water for houses",
        "meaningVi": "tiện ích dịch vụ (điện, nước, internet)",
        "example": "The rent includes utility bills.",
        "exampleVi": "Tiền thuê nhà đã bao gồm các hóa đơn dịch vụ tiện ích."
      },
      {
        "word": "boundary",
        "phonetic": "/ˈbaʊn.dər.i/",
        "wordType": "noun",
        "meaningEn": "a line which marks the limits of an area; border",
        "meaningVi": "ranh giới đất đai",
        "example": "A hedge forms the boundary between the yards.",
        "exampleVi": "Hàng rào bụi cây tạo thành ranh giới giữa các mảnh sân."
      },
      {
        "word": "concrete",
        "phonetic": "/ˈkɒŋ.kriːt/",
        "wordType": "noun/adj",
        "meaningEn": "a heavy building material made from gravel, cement, and sand",
        "meaningVi": "bê tông",
        "example": "The building is made of reinforced concrete.",
        "exampleVi": "Tòa nhà được làm bằng bê tông cốt thép."
      },
      {
        "word": "architecture",
        "phonetic": "/ˈɑː.kɪ.tek.tʃər/",
        "wordType": "noun",
        "meaningEn": "the art or practice of designing and constructing buildings",
        "meaningVi": "kiến trúc học",
        "example": "I admire the French colonial architecture.",
        "exampleVi": "Tôi ngưỡng mộ phong cách kiến trúc thuộc địa Pháp."
      },
      {
        "word": "landscaping",
        "phonetic": "/ˈlænd.skeɪ.pɪŋ/",
        "wordType": "noun",
        "meaningEn": "the process of making a garden or yard more attractive by altering its design",
        "meaningVi": "cảnh quan sân vườn",
        "example": "Professional landscaping increases property value.",
        "exampleVi": "Thiết kế cảnh quan chuyên nghiệp làm tăng giá trị bất động sản."
      },
      {
        "word": "cohabitation",
        "phonetic": "/ˌkəʊ.hæb.ɪˈteɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "the state of living together in the same dwelling",
        "meaningVi": "sự chung sống, ở chung nhà",
        "example": "Cohabitation before marriage is common today.",
        "exampleVi": "Việc chung sống trước hôn nhân ngày nay là phổ biến."
      },
      {
        "word": "scaffolding",
        "phonetic": "/ˈskæf.əl.dɪŋ/",
        "wordType": "noun",
        "meaningEn": "a temporary structure on the outside of a building used while building or repairing",
        "meaningVi": "giàn giáo xây dựng",
        "example": "Workers set up scaffolding around the tower.",
        "exampleVi": "Các công nhân đã lắp đặt giàn giáo xung quanh tòa tháp."
      },
      {
        "word": "condominium",
        "phonetic": "/ˌkɑːn.dəˈmɪn.i.əm/",
        "wordType": "noun",
        "meaningEn": "An apartment house in which each apartment is individually owned.",
        "meaningVi": "Căn hộ chung cư sở hữu cá nhân",
        "example": "They bought a luxury condominium in the city center.",
        "exampleVi": "Họ đã mua một căn hộ chung cư sang trọng ở trung tâm thành phố."
      },
      {
        "word": "bungalow",
        "phonetic": "/ˈbʌŋ.ɡə.loʊ/",
        "wordType": "noun",
        "meaningEn": "A house, typically detached, having only one story.",
        "meaningVi": "Nhà một tầng",
        "example": "My grandparents live in a cozy bungalow by the sea.",
        "exampleVi": "Ông bà tôi sống trong một ngôi nhà một tầng ấm cúng bên bờ biển."
      },
      {
        "word": "townhouse",
        "phonetic": "/ˈtaʊn.haʊs/",
        "wordType": "noun",
        "meaningEn": "A tall, narrow, traditional row house, found in urban areas.",
        "meaningVi": "Nhà phố liền kề",
        "example": "Many young families are moving into townhouses in the new development.",
        "exampleVi": "Nhiều gia đình trẻ đang chuyển đến các nhà phố liền kề trong khu phát triển mới."
      },
      {
        "word": "mansion",
        "phonetic": "/ˈmæn.ʃən/",
        "wordType": "noun",
        "meaningEn": "A large, impressive house.",
        "meaningVi": "Biệt thự lớn, lâu đài",
        "example": "The old mansion stood on a hill overlooking the town.",
        "exampleVi": "Biệt thự cũ đứng trên một ngọn đồi nhìn ra thị trấn."
      },
      {
        "word": "cottage",
        "phonetic": "/ˈkɑː.t̬ɪdʒ/",
        "wordType": "noun",
        "meaningEn": "A small, simple house, typically one in the countryside.",
        "meaningVi": "Nhà tranh, nhà nhỏ ở nông thôn",
        "example": "We rented a charming cottage for our vacation in the mountains.",
        "exampleVi": "Chúng tôi thuê một ngôi nhà nhỏ xinh xắn cho kỳ nghỉ ở vùng núi."
      },
      {
        "word": "villa",
        "phonetic": "/ˈvɪl.ə/",
        "wordType": "noun",
        "meaningEn": "A large and luxurious country house in its own grounds.",
        "meaningVi": "Biệt thự (thường ở ngoại ô hoặc nghỉ dưỡng)",
        "example": "They spent their honeymoon at a beautiful villa in Tuscany.",
        "exampleVi": "Họ đã trải qua tuần trăng mật tại một biệt thự tuyệt đẹp ở Tuscany."
      },
      {
        "word": "loft",
        "phonetic": "/lɑːft/",
        "wordType": "noun",
        "meaningEn": "A spacious, often open-plan apartment in a former commercial or industrial building.",
        "meaningVi": "Căn hộ gác xép, căn hộ rộng kiểu công nghiệp",
        "example": "His new loft in the city has very high ceilings and exposed brick walls.",
        "exampleVi": "Căn hộ gác xép mới của anh ấy ở thành phố có trần rất cao và tường gạch lộ thiên."
      },
      {
        "word": "studio apartment",
        "phonetic": "/ˈstuː.di.oʊ əˈpɑːrt.mənt/",
        "wordType": "noun",
        "meaningEn": "A small apartment with one main room for living and sleeping, a small kitchen area, and a separate bathroom.",
        "meaningVi": "Căn hộ studio (phòng khách và phòng ngủ chung)",
        "example": "She lives in a cozy studio apartment downtown.",
        "exampleVi": "Cô ấy sống trong một căn hộ studio ấm cúng ở trung tâm thành phố."
      },
      {
        "word": "duplex",
        "phonetic": "/ˈduː.pleks/",
        "wordType": "noun",
        "meaningEn": "A house divided into two self-contained flats or apartments.",
        "meaningVi": "Nhà song lập, nhà hai căn hộ riêng biệt",
        "example": "They decided to buy a duplex and rent out one side for extra income.",
        "exampleVi": "Họ quyết định mua một căn nhà song lập và cho thuê một bên để có thêm thu nhập."
      },
      {
        "word": "semidetached",
        "phonetic": "/ˌsem.i.dɪˈtætʃt/",
        "wordType": "adj",
        "meaningEn": "Of a house: joined to another house on one side by a shared wall.",
        "meaningVi": "Nhà bán biệt lập, nhà chung tường",
        "example": "Many families prefer a semidetached house for a balance of space and affordability.",
        "exampleVi": "Nhiều gia đình thích nhà bán biệt lập để cân bằng giữa không gian và khả năng chi trả."
      },
      {
        "word": "terrace house",
        "phonetic": "/ˈter.əs haʊs/",
        "wordType": "noun",
        "meaningEn": "One of a row of similar houses joined together by their side walls.",
        "meaningVi": "Nhà liền kề, nhà phố (Anh)",
        "example": "Victorian terrace houses are a common sight in London.",
        "exampleVi": "Những ngôi nhà liền kề kiểu Victoria là một cảnh tượng phổ biến ở London."
      },
      {
        "word": "condo",
        "phonetic": "/ˈkɑːn.doʊ/",
        "wordType": "noun",
        "meaningEn": "A condominium (informal).",
        "meaningVi": "Căn hộ chung cư (viết tắt)",
        "example": "We rented a condo by the beach for the summer.",
        "exampleVi": "Chúng tôi thuê một căn hộ chung cư cạnh bãi biển vào mùa hè."
      },
      {
        "word": "prefabricated",
        "phonetic": "/ˌpriːˈfæb.rɪ.keɪ.t̬ɪd/",
        "wordType": "adj",
        "meaningEn": "Manufactured in sections to be assembled on site.",
        "meaningVi": "Đúc sẵn, tiền chế",
        "example": "Prefabricated houses can be built much faster than traditional ones.",
        "exampleVi": "Những ngôi nhà tiền chế có thể được xây dựng nhanh hơn nhiều so với nhà truyền thống."
      },
      {
        "word": "facade",
        "phonetic": "/fəˈsɑːd/",
        "wordType": "noun",
        "meaningEn": "The principal front or face of a building.",
        "meaningVi": "Mặt tiền của tòa nhà",
        "example": "The historic building's facade was carefully restored.",
        "exampleVi": "Mặt tiền của tòa nhà lịch sử đã được phục hồi cẩn thận."
      },
      {
        "word": "eaves",
        "phonetic": "/iːvz/",
        "wordType": "noun",
        "meaningEn": "The part of a roof that meets or overhangs the walls of a building.",
        "meaningVi": "Mái hiên, rìa mái",
        "example": "Birds often build nests under the eaves of the house.",
        "exampleVi": "Chim thường làm tổ dưới mái hiên nhà."
      },
      {
        "word": "gable",
        "phonetic": "/ˈɡeɪ.bəl/",
        "wordType": "noun",
        "meaningEn": "The triangular upper part of a wall at the end of a pitched roof.",
        "meaningVi": "Đầu hồi nhà (phần tường tam giác dưới mái nhà)",
        "example": "The house had a charming gable window facing the garden.",
        "exampleVi": "Ngôi nhà có một cửa sổ đầu hồi duyên dáng nhìn ra vườn."
      },
      {
        "word": "dormer",
        "phonetic": "/ˈdɔːr.mər/",
        "wordType": "noun",
        "meaningEn": "A window that projects vertically from a sloping roof.",
        "meaningVi": "Cửa sổ mái (lồi ra từ mái dốc)",
        "example": "The attic room had a small dormer window with a nice view.",
        "exampleVi": "Phòng áp mái có một cửa sổ mái nhỏ với tầm nhìn đẹp."
      },
      {
        "word": "portico",
        "phonetic": "/ˈpɔːr.t̬ɪ.koʊ/",
        "wordType": "noun",
        "meaningEn": "A structure consisting of a roof supported by columns at regular intervals, typically attached as a porch to a building.",
        "meaningVi": "Hành lang có mái che, cổng có cột chống",
        "example": "The grand entrance featured a classic portico with Corinthian columns.",
        "exampleVi": "Lối vào lớn có một hành lang có mái che cổ điển với các cột kiểu Corinth."
      },
      {
        "word": "cupola",
        "phonetic": "/ˈkjuː.pə.lə/",
        "wordType": "noun",
        "meaningEn": "A small dome, especially one topping a roof or a larger dome.",
        "meaningVi": "Vòm nhỏ, mái vòm nhỏ",
        "example": "The old courthouse had an elegant cupola on its roof.",
        "exampleVi": "Tòa án cũ có một mái vòm nhỏ trang nhã trên mái của nó."
      },
      {
        "word": "foyer",
        "phonetic": "/ˈfɔɪ.ər/",
        "wordType": "noun",
        "meaningEn": "An entrance hall or other open area in a public building or house.",
        "meaningVi": "Tiền sảnh, sảnh đợi",
        "example": "Guests were greeted in the spacious foyer before entering the ballroom.",
        "exampleVi": "Khách được chào đón ở tiền sảnh rộng rãi trước khi vào phòng khiêu vũ."
      },
      {
        "word": "vestibule",
        "phonetic": "/ˈves.tɪ.bjuːl/",
        "wordType": "noun",
        "meaningEn": "An antechamber, hall, or lobby next to the outer door of a building.",
        "meaningVi": "Tiền sảnh nhỏ, phòng đợi",
        "example": "The small vestibule kept the cold air from entering the main house.",
        "exampleVi": "Tiền sảnh nhỏ giữ cho không khí lạnh không lọt vào nhà chính."
      },
      {
        "word": "utility closet",
        "phonetic": "/juːˈtɪl.ə.ti ˈklɑː.zɪt/",
        "wordType": "noun",
        "meaningEn": "A small closet used for storing cleaning supplies, tools, or household systems like water heaters.",
        "meaningVi": "Tủ tiện ích (chứa đồ dùng, thiết bị gia dụng)",
        "example": "The vacuum cleaner and mops are kept in the utility closet.",
        "exampleVi": "Máy hút bụi và cây lau nhà được cất trong tủ tiện ích."
      },
      {
        "word": "pantry",
        "phonetic": "/ˈpæn.tri/",
        "wordType": "noun",
        "meaningEn": "A small room or cupboard in which food, dishes, and cooking utensils are kept.",
        "meaningVi": "Kho chứa thức ăn, phòng để đồ dùng nhà bếp",
        "example": "She organized all the canned goods in the pantry.",
        "exampleVi": "Cô ấy sắp xếp tất cả các đồ hộp trong kho chứa thức ăn."
      },
      {
        "word": "laundry room",
        "phonetic": "/ˈlɑːn.dri ruːm/",
        "wordType": "noun",
        "meaningEn": "A room where clothes are washed and dried.",
        "meaningVi": "Phòng giặt là",
        "example": "The new house has a dedicated laundry room on the second floor.",
        "exampleVi": "Ngôi nhà mới có một phòng giặt là riêng ở tầng hai."
      },
      {
        "word": "den",
        "phonetic": "/den/",
        "wordType": "noun",
        "meaningEn": "A small, comfortable room, typically one in a house, used for studying or relaxing.",
        "meaningVi": "Phòng đọc sách, phòng làm việc riêng",
        "example": "He often retreats to his den to read a book in peace.",
        "exampleVi": "Anh ấy thường rút về phòng làm việc riêng của mình để đọc sách trong yên tĩnh."
      },
      {
        "word": "study",
        "phonetic": "/ˈstʌd.i/",
        "wordType": "noun",
        "meaningEn": "A room, especially in a house, used for reading, writing, or academic work.",
        "meaningVi": "Phòng học, phòng làm việc",
        "example": "The author spent hours in his study working on his novel.",
        "exampleVi": "Tác giả đã dành hàng giờ trong phòng làm việc của mình để viết tiểu thuyết."
      },
      {
        "word": "nook",
        "phonetic": "/nʊk/",
        "wordType": "noun",
        "meaningEn": "A secluded or sheltered corner or part of a place.",
        "meaningVi": "Góc nhỏ, xó xỉnh",
        "example": "She enjoyed reading in her favorite cozy reading nook by the window.",
        "exampleVi": "Cô ấy thích đọc sách ở góc đọc sách ấm cúng yêu thích của mình bên cửa sổ."
      },
      {
        "word": "conservatory",
        "phonetic": "/kənˈsɜːr.və.tɔːr.i/",
        "wordType": "noun",
        "meaningEn": "A room with a glass roof and walls, attached to a house and used as a sun lounge or for growing plants.",
        "meaningVi": "Nhà kính (để trồng cây hoặc làm phòng khách)",
        "example": "The conservatory was filled with exotic plants and natural light.",
        "exampleVi": "Nhà kính chứa đầy cây cối kỳ lạ và ánh sáng tự nhiên."
      },
      {
        "word": "solarium",
        "phonetic": "/səˈler.i.əm/",
        "wordType": "noun",
        "meaningEn": "A room fitted with extensive areas of glass to admit sunlight.",
        "meaningVi": "Phòng tắm nắng",
        "example": "The house featured a bright solarium perfect for winter mornings.",
        "exampleVi": "Ngôi nhà có một phòng tắm nắng sáng sủa hoàn hảo cho những buổi sáng mùa đông."
      },
      {
        "word": "veranda",
        "phonetic": "/vəˈræn.də/",
        "wordType": "noun",
        "meaningEn": "A roofed open-air porch or gallery attached to the exterior of a building.",
        "meaningVi": "Hành lang có mái che, hiên nhà rộng",
        "example": "They enjoyed sitting on the veranda, watching the sunset.",
        "exampleVi": "Họ thích ngồi trên hiên nhà, ngắm hoàng hôn."
      },
      {
        "word": "gazebo",
        "phonetic": "/ɡəˈziː.boʊ/",
        "wordType": "noun",
        "meaningEn": "A small, roofed building with open sides, typically in a garden.",
        "meaningVi": "Chòi nghỉ mát, vọng lâu trong vườn",
        "example": "The wedding reception was held under a beautifully decorated gazebo.",
        "exampleVi": "Tiệc cưới được tổ chức dưới một vọng lâu được trang trí đẹp mắt."
      },
      {
        "word": "trellis",
        "phonetic": "/ˈtrel.ɪs/",
        "wordType": "noun",
        "meaningEn": "A framework of light wooden or metal bars, chiefly used as a support for fruit trees or climbing plants.",
        "meaningVi": "Giàn leo (cho cây)",
        "example": "Roses climbed gracefully up the garden trellis.",
        "exampleVi": "Những cây hoa hồng leo duyên dáng trên giàn leo trong vườn."
      },
      {
        "word": "pergola",
        "phonetic": "/ˈpɜːr.ɡə.lə/",
        "wordType": "noun",
        "meaningEn": "An archway in a garden or park consisting of a framework covered with climbing or trailing plants.",
        "meaningVi": "Giàn hoa, vòm cây",
        "example": "They built a lovely pergola to provide shade over the patio.",
        "exampleVi": "Họ đã xây một giàn hoa xinh xắn để che mát cho sân hiên."
      },
      {
        "word": "cobblestone",
        "phonetic": "/ˈkɑː.bəl.stoʊn/",
        "wordType": "noun",
        "meaningEn": "A small, round stone used to cover road surfaces.",
        "meaningVi": "Đá cuội lát đường",
        "example": "The quaint street was paved with cobblestones.",
        "exampleVi": "Con phố cổ kính được lát bằng đá cuội."
      },
      {
        "word": "masonry",
        "phonetic": "/ˈmeɪ.sən.ri/",
        "wordType": "noun",
        "meaningEn": "The parts of a building that are made from stone or brick.",
        "meaningVi": "Khối xây, công trình xây bằng gạch đá",
        "example": "The old church was renowned for its intricate masonry.",
        "exampleVi": "Nhà thờ cổ nổi tiếng với khối xây phức tạp của nó."
      },
      {
        "word": "railing",
        "phonetic": "/ˈreɪ.lɪŋ/",
        "wordType": "noun",
        "meaningEn": "A fence or barrier made of rails.",
        "meaningVi": "Lan can, hàng rào",
        "example": "Be careful not to lean too hard on the old railing.",
        "exampleVi": "Cẩn thận đừng dựa quá mạnh vào lan can cũ."
      },
      {
        "word": "banister",
        "phonetic": "/ˈbæn.ɪ.stər/",
        "wordType": "noun",
        "meaningEn": "The upright supports and handrail of a staircase.",
        "meaningVi": "Lan can cầu thang",
        "example": "He slid down the banister, much to his mother's dismay.",
        "exampleVi": "Cậu bé trượt xuống lan can cầu thang, khiến mẹ cậu kinh hoàng."
      },
      {
        "word": "newel post",
        "phonetic": "/ˈnjuː.əl poʊst/",
        "wordType": "noun",
        "meaningEn": "The main post at the top or bottom of a staircase that supports the handrail.",
        "meaningVi": "Trụ cầu thang",
        "example": "The ornate newel post was carved with intricate designs.",
        "exampleVi": "Trụ cầu thang được chạm khắc với những thiết kế phức tạp."
      },
      {
        "word": "tread",
        "phonetic": "/tred/",
        "wordType": "noun",
        "meaningEn": "The horizontal part of a stair on which one places one's foot.",
        "meaningVi": "Bề mặt bậc thang",
        "example": "Be careful on the wet treads of the stairs.",
        "exampleVi": "Hãy cẩn thận trên những bề mặt bậc thang ướt."
      },
      {
        "word": "riser",
        "phonetic": "/ˈraɪ.zər/",
        "wordType": "noun",
        "meaningEn": "The vertical part of a stair between two treads.",
        "meaningVi": "Phần đứng của bậc thang",
        "example": "She painted each riser a different color.",
        "exampleVi": "Cô ấy sơn mỗi phần đứng của bậc thang một màu khác nhau."
      },
      {
        "word": "skylight",
        "phonetic": "/ˈskaɪ.laɪt/",
        "wordType": "noun",
        "meaningEn": "A window set in a roof or ceiling.",
        "meaningVi": "Cửa sổ mái nhà, giếng trời",
        "example": "The artist's studio had a large skylight for natural illumination.",
        "exampleVi": "Xưởng vẽ của nghệ sĩ có một giếng trời lớn để chiếu sáng tự nhiên."
      },
      {
        "word": "bulkhead",
        "phonetic": "/ˈbʌlk.hed/",
        "wordType": "noun",
        "meaningEn": "A partition or dividing wall in a ship, aircraft, or building.",
        "meaningVi": "Vách ngăn (thường ở tầng hầm, gác mái)",
        "example": "The small bulkhead door led to the hidden cellar.",
        "exampleVi": "Cánh cửa vách ngăn nhỏ dẫn đến hầm rượu ẩn."
      },
      {
        "word": "lintel",
        "phonetic": "/ˈlɪn.təl/",
        "wordType": "noun",
        "meaningEn": "A horizontal support of timber, stone, concrete, or steel across the top of a door or window opening.",
        "meaningVi": "Thanh ngang trên cửa/cửa sổ",
        "example": "The old stone lintel above the doorway was intricately carved.",
        "exampleVi": "Thanh ngang bằng đá cũ phía trên khung cửa được chạm khắc tinh xảo."
      },
      {
        "word": "subflooring",
        "phonetic": "/ˈsʌbˌflɔːr.ɪŋ/",
        "wordType": "noun",
        "meaningEn": "The coarse floor laid on joists, on which a finished floor is laid.",
        "meaningVi": "Sàn phụ, sàn nền",
        "example": "Before laying the hardwood, ensure the subflooring is level and stable.",
        "exampleVi": "Trước khi lát sàn gỗ cứng, hãy đảm bảo sàn phụ bằng phẳng và ổn định."
      }
    ]
  },
  {
    "id": "vehicles",
    "title": "Xe cộ & Giao thông (Vehicles & Transport)",
    "desc": "Từ vựng về các phương tiện giao thông đường bộ, đường hàng không, đường thủy và hệ thống cầu đường.",
    "color": "border-amber-300 bg-amber-100/30 text-amber-900 hover:border-amber-500 dark:bg-slate-900/50 dark:border-slate-800 dark:text-amber-300",
    "beginner": [
      {
        "word": "car",
        "phonetic": "/kɑːr/",
        "wordType": "noun",
        "meaningEn": "a road vehicle, typically with four wheels, powered by an engine",
        "meaningVi": "xe hơi, ô tô",
        "example": "He drives a blue car.",
        "exampleVi": "Anh ấy lái một chiếc xe hơi màu xanh."
      },
      {
        "word": "bus",
        "phonetic": "/bʌs/",
        "wordType": "noun",
        "meaningEn": "a large motor vehicle carrying passengers by road",
        "meaningVi": "xe buýt",
        "example": "I go to school by bus.",
        "exampleVi": "Tôi đi học bằng xe buýt."
      },
      {
        "word": "bicycle",
        "phonetic": "/ˈbaɪ.sɪ.kəl/",
        "wordType": "noun",
        "meaningEn": "a vehicle consisting of two wheels held in a frame one behind the other",
        "meaningVi": "xe đạp",
        "example": "She rides her bicycle to the park.",
        "exampleVi": "Cô ấy đi xe đạp đến công viên."
      },
      {
        "word": "train",
        "phonetic": "/treɪn/",
        "wordType": "noun",
        "meaningEn": "a series of connected railway carriages or wagons",
        "meaningVi": "tau hỏa, xe lửa",
        "example": "The train leaves at ten.",
        "exampleVi": "Tàu hỏa khởi hành lúc 10 giờ."
      },
      {
        "word": "plane",
        "phonetic": "/pleɪn/",
        "wordType": "noun",
        "meaningEn": "an airplane",
        "meaningVi": "máy bay",
        "example": "The plane is flying above the clouds.",
        "exampleVi": "Máy bay đang bay trên những tầng mây."
      },
      {
        "word": "boat",
        "phonetic": "/bəʊt/",
        "wordType": "noun",
        "meaningEn": "a small vessel for travelling on water",
        "meaningVi": "thuyền, con đò",
        "example": "We rented a row boat.",
        "exampleVi": "Chúng tôi đã thuê một chiếc thuyền mái chèo."
      },
      {
        "word": "ship",
        "phonetic": "/ʃɪp/",
        "wordType": "noun",
        "meaningEn": "a large boat for transporting people or goods by sea",
        "meaningVi": "tàu thủy, tàu lớn",
        "example": "A cargo ship crossed the ocean.",
        "exampleVi": "Một chiếc tàu chở hàng đã vượt đại dương."
      },
      {
        "word": "motorcycle",
        "phonetic": "/ˈməʊ.tə.saɪ.kəl/",
        "wordType": "noun",
        "meaningEn": "a two-wheeled vehicle that is powered by an engine",
        "meaningVi": "xe máy, xe mô tô",
        "example": "He bought a new motorcycle.",
        "exampleVi": "Anh ấy đã mua một chiếc xe máy mới."
      },
      {
        "word": "truck",
        "phonetic": "/trʌk/",
        "wordType": "noun",
        "meaningEn": "a large, heavy road vehicle used for carrying goods",
        "meaningVi": "xe tải",
        "example": "The delivery truck arrived.",
        "exampleVi": "Chiếc xe tải giao hàng đã đến."
      },
      {
        "word": "helicopter",
        "phonetic": "/ˈhel.ɪ.pɒp.tər/",
        "wordType": "noun",
        "meaningEn": "a type of aircraft with large blades on top that spin round",
        "meaningVi": "máy bay trực thăng",
        "example": "A rescue helicopter arrived.",
        "exampleVi": "Trực thăng cứu hộ đã có mặt."
      },
      {
        "word": "taxi",
        "phonetic": "/ˈtæk.si/",
        "wordType": "noun",
        "meaningEn": "a motor car licensed to transport passengers for a fare",
        "meaningVi": "xe taxi",
        "example": "Call a taxi for me, please.",
        "exampleVi": "Làm ơn hãy gọi cho tôi một chiếc taxi."
      },
      {
        "word": "airport",
        "phonetic": "/ˈeə.pɔːt/",
        "wordType": "noun",
        "meaningEn": "a complex of runways and buildings for the take-off and landing of planes",
        "meaningVi": "sân bay, phi trường",
        "example": "We arrived at the airport early.",
        "exampleVi": "Chúng tôi đã đến sân bay từ sớm."
      },
      {
        "word": "ticket",
        "phonetic": "/ˈtɪk.ɪt/",
        "wordType": "noun",
        "meaningEn": "a piece of paper showing that you have paid for a journey",
        "meaningVi": "vé xe, vé tàu, vé máy bay",
        "example": "Show your train ticket.",
        "exampleVi": "Hãy xuất trình vé tàu của bạn."
      },
      {
        "word": "subway",
        "phonetic": "/ˈsʌb.weɪ/",
        "wordType": "noun",
        "meaningEn": "an underground railway system",
        "meaningVi": "tàu điện ngầm",
        "example": "New York is famous for its subway.",
        "exampleVi": "New York nổi tiếng với hệ thống tàu điện ngầm."
      },
      {
        "word": "traffic light",
        "phonetic": "/ˈtræf.ɪk laɪt/",
        "wordType": "noun",
        "meaningEn": "a set of automatically operated colored lights for controlling traffic",
        "meaningVi": "đèn giao thông",
        "example": "Stop at the red traffic light.",
        "exampleVi": "Hãy dừng lại trước đèn giao thông đỏ."
      },
      {
        "word": "wheel",
        "phonetic": "/wiːl/",
        "wordType": "noun",
        "meaningEn": "a circular object that revolves on an axle and enables a vehicle to move",
        "meaningVi": "bánh xe",
        "example": "The car has a flat tire on the front wheel.",
        "exampleVi": "Chiếc xe bị xịt lốp ở bánh trước."
      },
      {
        "word": "street",
        "phonetic": "/striːt/",
        "wordType": "noun",
        "meaningEn": "a public road in a city or town, typically with houses on either side",
        "meaningVi": "con đường, tuyến phố",
        "example": "Walk along the main street.",
        "exampleVi": "Hãy đi dọc theo con phố chính."
      },
      {
        "word": "road",
        "phonetic": "/rəʊd/",
        "wordType": "noun",
        "meaningEn": "a wide way leading from one place to another, especially one with a specially prepared surface",
        "meaningVi": "con đường lộ, xa lộ",
        "example": "The road leads to the next town.",
        "exampleVi": "Con đường này dẫn đến thị trấn tiếp theo."
      },
      {
        "word": "bridge",
        "phonetic": "/brɪdʒ/",
        "wordType": "noun",
        "meaningEn": "a structure carrying a road or path across an obstacle like a river",
        "meaningVi": "cây cầu",
        "example": "The bridge spans across the wide river.",
        "exampleVi": "Cây cầu bắc ngang qua con sông rộng."
      },
      {
        "word": "driver",
        "phonetic": "/ˈdraɪ.vər/",
        "wordType": "noun",
        "meaningEn": "a person who drives a vehicle",
        "meaningVi": "tài xế, người lái xe",
        "example": "The bus driver was polite.",
        "exampleVi": "Người lái xe buýt rất lịch sự."
      },
      {
        "word": "station",
        "phonetic": "/ˈsteɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "a stopping place on a public transport route, especially one with buildings",
        "meaningVi": "nhà ga, trạm dừng",
        "example": "Meet me at the railway station.",
        "exampleVi": "Hãy gặp tôi ở nhà ga xe lửa."
      },
      {
        "word": "passenger",
        "phonetic": "/ˈpæs.ən.dʒər/",
        "wordType": "noun",
        "meaningEn": "a traveler on a public or private conveyance other than the driver",
        "meaningVi": "hành khách",
        "example": "The train has hundreds of passengers.",
        "exampleVi": "Đoàn tàu chở hàng trăm hành khách."
      },
      {
        "word": "map",
        "phonetic": "/mæp/",
        "wordType": "noun",
        "meaningEn": "a visual representation of an area showing roads and landmarks",
        "meaningVi": "bản đồ",
        "example": "We used a map to navigate the city.",
        "exampleVi": "Chúng tôi dùng bản đồ để điều hướng trong thành phố."
      },
      {
        "word": "speed",
        "phonetic": "/spiːd/",
        "wordType": "noun",
        "meaningEn": "the rate at which someone or something moves",
        "meaningVi": "tốc độ",
        "example": "Limit your speed in residential areas.",
        "exampleVi": "Hãy giới hạn tốc độ của bạn ở các khu dân cư."
      },
      {
        "word": "engine",
        "phonetic": "/ˈen.dʒɪn/",
        "wordType": "noun",
        "meaningEn": "a machine with moving parts that converts power into motion",
        "meaningVi": "động cơ",
        "example": "Start the car engine, please.",
        "exampleVi": "Làm ơn hãy nổ máy động cơ ô tô."
      }
    ,
      {
            "word": "motorboat",
            "phonetic": "/ˈməʊ.tə.bəʊt/",
            "wordType": "noun",
            "meaningEn": "a boat powered by a motor",
            "meaningVi": "xuồng máy, tàu máy",
            "example": "We rented a motorboat to explore the lake.",
            "exampleVi": "Chúng tôi thuê một chiếc xuồng máy để khám phá hồ."
      },
      {
            "word": "yacht",
            "phonetic": "/jɒt/",
            "wordType": "noun",
            "meaningEn": "a medium-sized sailboat equipped for cruising or racing",
            "meaningVi": "du thuyền",
            "example": "The millionaire bought a luxury yacht.",
            "exampleVi": "Vị triệu phú đã mua một chiếc du thuyền sang trọng."
      },
      {
            "word": "helicopter",
            "phonetic": "/ˈhel.ɪˌkɒp.tər/",
            "wordType": "noun",
            "meaningEn": "a type of aircraft with rotating overhead blades",
            "meaningVi": "máy bay trực thăng",
            "example": "The rescue team arrived in a helicopter.",
            "exampleVi": "Đội cứu hộ đã đến bằng máy bay trực thăng."
      },
      {
            "word": "ambulance",
            "phonetic": "/ˈæm.bjə.ləns/",
            "wordType": "noun",
            "meaningEn": "a vehicle equipped for taking sick or injured people to hospital",
            "meaningVi": "xe cứu thương",
            "example": "The ambulance rushed to the scene of the accident.",
            "exampleVi": "Xe cứu thương đã lao nhanh đến hiện trường vụ tai nạn."
      },
      {
            "word": "tractor",
            "phonetic": "/ˈtræk.tər/",
            "wordType": "noun",
            "meaningEn": "a powerful motor vehicle with large rear tires, used on farms",
            "meaningVi": "máy kéo",
            "example": "The farmer is plowing the field with a tractor.",
            "exampleVi": "Người nông dân đang cày ruộng bằng máy kéo."
      },
      {
            "word": "scooter",
            "phonetic": "/ˈskuː.tər/",
            "wordType": "noun",
            "meaningEn": "a light two-wheeled motor vehicle",
            "meaningVi": "xe tay ga, xe scooter",
            "example": "He rides a motor scooter to work.",
            "exampleVi": "Anh ấy đi xe tay ga đi làm."
      },
      {
            "word": "subway",
            "phonetic": "/ˈsʌb.weɪ/",
            "wordType": "noun",
            "meaningEn": "an underground railway system",
            "meaningVi": "tàu điện ngầm",
            "example": "We took the subway to avoid the traffic.",
            "exampleVi": "Chúng tôi đi tàu điện ngầm để tránh tắc đường."
      },
      {
            "word": "trolley",
            "phonetic": "/ˈtrɒl.i/",
            "wordType": "noun",
            "meaningEn": "a vehicle that runs on rails and is powered by overhead electricity",
            "meaningVi": "xe điện, xe đẩy",
            "example": "The trolley runs through the historic district.",
            "exampleVi": "Xe điện chạy qua khu lịch sử."
      },
      {
            "word": "ferry",
            "phonetic": "/ˈfer.i/",
            "wordType": "noun",
            "meaningEn": "a boat or ship for conveying passengers and goods across a river or sea",
            "meaningVi": "phà, tàu thủy chở khách",
            "example": "We crossed the river by ferry.",
            "exampleVi": "Chúng tôi qua sông bằng phà."
      },
      {
            "word": "van",
            "phonetic": "/væn/",
            "wordType": "noun",
            "meaningEn": "a medium-sized motor vehicle, typically without side windows in the back",
            "meaningVi": "xe tải nhỏ, xe bán tải",
            "example": "They loaded the delivery van with boxes.",
            "exampleVi": "Họ chất những chiếc hộp lên xe tải nhỏ chở hàng."
      }
    ],
    "advanced": [
      {
        "word": "transportation",
        "phonetic": "/ˌtræn.spɔːˈteɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "the action of transporting someone or something, or a system for doing this",
        "meaningVi": "hệ thống giao thông, sự vận tải",
        "example": "Public transportation is efficient here.",
        "exampleVi": "Giao thông công cộng ở đây rất hiệu quả."
      },
      {
        "word": "commuter",
        "phonetic": "/kəˈmjuː.tər/",
        "wordType": "noun",
        "meaningEn": "a person who travels some distance to work on a regular basis",
        "meaningVi": "người đi làm xa bằng phương tiện công cộng",
        "example": "The train was packed with commuters.",
        "exampleVi": "Tàu hỏa chật kính người đi làm."
      },
      {
        "word": "pedestrian",
        "phonetic": "/pəˈdes.tri.ən/",
        "wordType": "noun",
        "meaningEn": "a person walking rather than travelling in a vehicle",
        "meaningVi": "người đi bộ",
        "example": "Drivers must yield to pedestrians.",
        "exampleVi": "Tài xế phải nhường đường cho người đi bộ."
      },
      {
        "word": "congestion",
        "phonetic": "/kənˈdʒes.tʃən/",
        "wordType": "noun",
        "meaningEn": "the state of being overcrowded, especially with traffic",
        "meaningVi": "sự tắc nghẽn, kẹt xe",
        "example": "Traffic congestion is a major issue.",
        "exampleVi": "Tắc nghẽn giao thông là một vấn đề lớn."
      },
      {
        "word": "navigation",
        "phonetic": "/ˌnæv.ɪˈɡeɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "the process of monitoring and controlling the movement of a craft",
        "meaningVi": "sự định hướng, điều hướng",
        "example": "The ship has satellite navigation.",
        "exampleVi": "Con tàu được trang bị hệ thống định vị vệ tinh."
      },
      {
        "word": "transmission",
        "phonetic": "/trænzˈmɪʃ.ən/",
        "wordType": "noun",
        "meaningEn": "the mechanism by which power is transmitted from an engine to the wheels",
        "meaningVi": "hộp số, hệ thống truyền động",
        "example": "An automatic transmission car.",
        "exampleVi": "Một chiếc ô tô hộp số tự động."
      },
      {
        "word": "autonomous",
        "phonetic": "/ɔːˈtɒn.ə.məs/",
        "wordType": "adj",
        "meaningEn": "operating without direct human control; self-driving",
        "meaningVi": "tự lái, tự trị",
        "example": "Autonomous vehicles are the future.",
        "exampleVi": "Xe tự lái là xu hướng của tương lai."
      },
      {
        "word": "expressway",
        "phonetic": "/ɪkˈspres.weɪ/",
        "wordType": "noun",
        "meaningEn": "a highway designed for fast traffic",
        "meaningVi": "đường cao tốc",
        "example": "We drove along the expressway.",
        "exampleVi": "Chúng tôi đã lái xe dọc theo đường cao tốc."
      },
      {
        "word": "velocity",
        "phonetic": "/vəˈlɒs.ə.ti/",
        "wordType": "noun",
        "meaningEn": "the speed of something in a given direction",
        "meaningVi": "vận tốc",
        "example": "Calculate the velocity of the vehicle.",
        "exampleVi": "Hãy tính vận tốc của phương tiện."
      },
      {
        "word": "infraction",
        "phonetic": "/ɪnˈfræk.ʃən/",
        "wordType": "noun",
        "meaningEn": "a violation of a law, agreement, or set of rules",
        "meaningVi": "sự vi phạm (giao thông/luật)",
        "example": "Speeding is a serious traffic infraction.",
        "exampleVi": "Vượt quá tốc độ là vi phạm giao thông nghiêm trọng."
      },
      {
        "word": "locomotive",
        "phonetic": "/ˌləʊ.kəˈməʊ.tɪv/",
        "wordType": "noun",
        "meaningEn": "a powered railway vehicle used for pulling trains",
        "meaningVi": "đầu máy xe lửa",
        "example": "The steam locomotive is in the museum.",
        "exampleVi": "Đầu máy xe lửa hơi nước đang được trưng bày ở bảo tàng."
      },
      {
        "word": "commute",
        "phonetic": "/kəˈmjuːt/",
        "wordType": "verb/noun",
        "meaningEn": "to travel regularly between work and home",
        "meaningVi": "hành trình đi lại làm việc",
        "example": "My daily commute takes one hour.",
        "exampleVi": "Hành trình đi làm hàng ngày của tôi mất 1 tiếng."
      },
      {
        "word": "detour",
        "phonetic": "/ˈdiː.tʊər/",
        "wordType": "noun",
        "meaningEn": "a long or roundabout route taken to avoid something",
        "meaningVi": "đường vòng",
        "example": "Roadworks forced us to take a detour.",
        "exampleVi": "Công trình làm đường buộc chúng tôi phải đi đường vòng."
      },
      {
        "word": "gridlock",
        "phonetic": "/ˈɡrɪd.lɒk/",
        "wordType": "noun",
        "meaningEn": "a traffic jam affecting a whole network of intersecting streets",
        "meaningVi": "sự tê liệt giao thông, tắc nghẽn toàn bộ",
        "example": "The storm caused total gridlock.",
        "exampleVi": "Cơn bão đã gây ra sự tê liệt giao thông hoàn toàn."
      },
      {
        "word": "tollbooth",
        "phonetic": "/ˈtəʊl.buːð/",
        "wordType": "noun",
        "meaningEn": "a kiosk where a driver pays a toll for using a highway or bridge",
        "meaningVi": "trạm thu phí",
        "example": "Have cash ready for the tollbooth.",
        "exampleVi": "Hãy chuẩn bị sẵn tiền mặt cho trạm thu phí."
      },
      {
        "word": "infrastructure",
        "phonetic": "/ˈɪn.frəˌstrʌk.tʃər/",
        "wordType": "noun",
        "meaningEn": "the basic physical structures needed for the operation of a society or enterprise",
        "meaningVi": "cơ sở hạ tầng",
        "example": "The city invests heavily in transport infrastructure.",
        "exampleVi": "Thành phố đầu tư mạnh mẽ vào cơ sở hạ tầng giao thông."
      },
      {
        "word": "logistics",
        "phonetic": "/ləˈdʒɪs.tɪks/",
        "wordType": "noun",
        "meaningEn": "the detailed coordination of a complex operation involving many people, facilities, or supplies",
        "meaningVi": "ngành dịch vụ hậu cần, logistics",
        "example": "The logistics manager organized the shipping schedule.",
        "exampleVi": "Trưởng bộ phận logistics đã sắp xếp lịch trình vận chuyển."
      },
      {
        "word": "aviation",
        "phonetic": "/ˌeɪ.viˈeɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "the flying or operating of aircraft",
        "meaningVi": "ngành hàng không",
        "example": "He has a passion for aviation history.",
        "exampleVi": "Anh ấy có niềm đam mê với lịch sử ngành hàng không."
      },
      {
        "word": "intersection",
        "phonetic": "/ˌɪn.təˈsek.ʃən/",
        "wordType": "noun",
        "meaningEn": "a point at which two or more roads meet and cross",
        "meaningVi": "ngã tư, giao lộ",
        "example": "The accident happened at the busy intersection.",
        "exampleVi": "Vụ tai nạn xảy ra tại ngã tư sầm uất."
      },
      {
        "word": "roundabout",
        "phonetic": "/ˈraʊnd.ə.baʊt/",
        "wordType": "noun",
        "meaningEn": "a road junction at which traffic moves in one direction round a central island",
        "meaningVi": "vòng xoay, bùng binh",
        "example": "Take the second exit at the roundabout.",
        "exampleVi": "Hãy đi theo lối ra thứ hai ở vòng xoay."
      },
      {
        "word": "bypass",
        "phonetic": "/ˈbaɪ.pɑːs/",
        "wordType": "noun",
        "meaningEn": "a road passing round a town or its center to ease congestion",
        "meaningVi": "đường tránh",
        "example": "They built a bypass to reduce town traffic.",
        "exampleVi": "Họ đã xây một con đường tránh để giảm thiểu giao thông trong thị trấn."
      },
      {
        "word": "lane",
        "phonetic": "/leɪn/",
        "wordType": "noun",
        "meaningEn": "a division of a road marked with painted lines for a single line of vehicles",
        "meaningVi": "làn đường",
        "example": "Buses should stay in the bus lane.",
        "exampleVi": "Xe buýt nên đi đúng làn đường của xe buýt."
      },
      {
        "word": "checkpoint",
        "phonetic": "/ˈtʃek.pɔɪnt/",
        "wordType": "noun",
        "meaningEn": "a barrier or manned port where travelers are subject to security checks",
        "meaningVi": "trạm kiểm soát giao thông",
        "example": "Police set up a sobriety checkpoint.",
        "exampleVi": "Cảnh sát đã thiết lập một trạm kiểm soát nồng độ cồn."
      },
      {
        "word": "aquaplaning",
        "phonetic": "/ˈæk.wə.pleɪ.nɪŋ/",
        "wordType": "noun",
        "meaningEn": "a situation where a vehicle slides uncontrollably on a wet road surface",
        "meaningVi": "hiện tượng trượt nước của lốp xe",
        "example": "Worn tires increase the risk of aquaplaning.",
        "exampleVi": "Lốp xe bị mòn làm tăng nguy cơ gặp hiện tượng trượt nước."
      },
      {
        "word": "gridlock",
        "phonetic": "/ˈɡrɪd.lɒk/",
        "wordType": "noun",
        "meaningEn": "a traffic jam affecting a whole network of intersecting streets",
        "meaningVi": "sự tê liệt giao thông hoàn toàn",
        "example": "The snowy weather caused a city-wide gridlock.",
        "exampleVi": "Thời tiết tuyết rơi đã gây ra sự tê liệt giao thông toàn thành phố."
      }
    ,
      {
            "word": "congestion",
            "phonetic": "/kənˈdʒes.tʃən/",
            "wordType": "noun",
            "meaningEn": "the state of being overcrowded with traffic or people",
            "meaningVi": "sự tắc nghẽn giao thông",
            "example": "Traffic congestion is a major problem in big cities.",
            "exampleVi": "Tắc nghẽn giao thông là một vấn đề lớn ở các thành phố lớn."
      },
      {
            "word": "commute",
            "phonetic": "/kəˈmjuːt/",
            "wordType": "verb/noun",
            "meaningEn": "travel some distance between one's home and place of work on a regular basis",
            "meaningVi": "đi lại thường nhật giữa nhà và nơi làm việc",
            "example": "She has a long daily commute to London.",
            "exampleVi": "Cô ấy có hành trình đi lại hàng ngày khá xa tới London."
      },
      {
            "word": "pedestrian",
            "phonetic": "/pəˈdes.tri.ən/",
            "wordType": "noun",
            "meaningEn": "a person walking rather than travelling in a vehicle",
            "meaningVi": "người đi bộ",
            "example": "The driver stopped to let the pedestrian cross.",
            "exampleVi": "Tài xế đã dừng lại để cho người đi bộ băng qua."
      },
      {
            "word": "intersection",
            "phonetic": "/ˌɪn.təˈsek.ʃən/",
            "wordType": "noun",
            "meaningEn": "a point at which two or more roads meet and cross",
            "meaningVi": "ngã tư, giao lộ",
            "example": "Turn left at the next intersection.",
            "exampleVi": "Rẽ trái ở ngã tư tiếp theo."
      },
      {
            "word": "locomotive",
            "phonetic": "/ˌləʊ.kəˈməʊ.tɪv/",
            "wordType": "noun",
            "meaningEn": "a powered railway vehicle used for pulling trains",
            "meaningVi": "đầu máy xe lửa",
            "example": "The old steam locomotive is kept in the museum.",
            "exampleVi": "Đầu máy xe lửa chạy bằng hơi nước cũ được giữ trong bảo tàng."
      },
      {
            "word": "aviation",
            "phonetic": "/ˌeɪ.viˈeɪ.ʃən/",
            "wordType": "noun",
            "meaningEn": "the flying or operating of aircraft",
            "meaningVi": "ngành hàng không, sự bay lượn",
            "example": "He has always been interested in aviation.",
            "exampleVi": "Anh ấy đã luôn quan tâm đến ngành hàng không."
      },
      {
            "word": "navigation",
            "phonetic": "/ˌnæv.ɪˈɡeɪ.ʃən/",
            "wordType": "noun",
            "meaningEn": "the process or activity of accurately ascertaining one's position and planning a route",
            "meaningVi": "sự định vị, sự dẫn đường, hàng hải",
            "example": "Satellite navigation systems make driving easier.",
            "exampleVi": "Các hệ thống định vị vệ tinh giúp việc lái xe trở nên dễ dàng hơn."
      },
      {
            "word": "transit",
            "phonetic": "/ˈtræn.zɪt/",
            "wordType": "noun",
            "meaningEn": "the carrying of people or goods from one place to another",
            "meaningVi": "sự vận chuyển, hệ thống vận tải công cộng",
            "example": "The city improved its rapid transit system.",
            "exampleVi": "Thành phố đã cải thiện hệ thống vận tải nhanh của mình."
      },
      {
            "word": "cargo",
            "phonetic": "/ˈkɑː.ɡəʊ/",
            "wordType": "noun",
            "meaningEn": "goods carried on a ship, aircraft, or motor vehicle",
            "meaningVi": "hàng hóa (vận chuyển bằng tàu/xe)",
            "example": "The freighter was carrying cargo to Asia.",
            "exampleVi": "Tàu chở hàng đang chở hàng hóa sang châu Á."
      },
      {
            "word": "toll",
            "phonetic": "/təʊl/",
            "wordType": "noun",
            "meaningEn": "a charge payable for permission to use a particular bridge or road",
            "meaningVi": "phí cầu đường",
            "example": "Drivers must pay a toll to cross the bridge.",
            "exampleVi": "Người lái xe phải trả phí cầu đường để qua cầu."
      }
    ]
  },
  {
    "id": "company",
    "title": "Công ty & Doanh nghiệp (Company & Business)",
    "desc": "Từ vựng về mô hình công ty, vị trí làm việc, quy trình vận hành và tài chính doanh nghiệp.",
    "color": "border-blue-300 bg-blue-100/30 text-blue-905 hover:border-blue-500 dark:bg-slate-900/50 dark:border-slate-800 dark:text-blue-300",
    "beginner": [
      {
        "word": "company",
        "phonetic": "/ˈkʌm.pə.ni/",
        "wordType": "noun",
        "meaningEn": "a commercial business",
        "meaningVi": "công ty",
        "example": "He works for an IT company.",
        "exampleVi": "Anh ấy làm việc cho một công ty công nghệ thông tin."
      },
      {
        "word": "office",
        "phonetic": "/ˈɒf.ɪs/",
        "wordType": "noun",
        "meaningEn": "a room or building where people work at desks",
        "meaningVi": "văn phòng",
        "example": "Our office is on the fifth floor.",
        "exampleVi": "Văn phòng của chúng tôi ở tầng năm."
      },
      {
        "word": "boss",
        "phonetic": "/bɒs/",
        "wordType": "noun",
        "meaningEn": "a person who is in charge of other employees",
        "meaningVi": "sếp, người chủ",
        "example": "My boss is demanding but fair.",
        "exampleVi": "Sếp của tôi khó tính nhưng công bằng."
      },
      {
        "word": "employee",
        "phonetic": "/ɪmˈplɔɪ.iː/",
        "wordType": "noun",
        "meaningEn": "a person employed for wages or salary",
        "meaningVi": "nhân viên, người làm thuê",
        "example": "The company has fifty employees.",
        "exampleVi": "Công ty có 50 nhân viên."
      },
      {
        "word": "meeting",
        "phonetic": "/ˈmiː.tɪŋ/",
        "wordType": "noun",
        "meaningEn": "an assembly of people for discussion",
        "meaningVi": "cuộc họp",
        "example": "We have a staff meeting at ten.",
        "exampleVi": "Chúng tôi có cuộc họp nhân viên vào lúc 10 giờ."
      },
      {
        "word": "business",
        "phonetic": "/ˈbɪz.nɪs/",
        "wordType": "noun",
        "meaningEn": "the activity of making, buying, and selling goods or services for money",
        "meaningVi": "doanh nghiệp, kinh doanh",
        "example": "They run a family business.",
        "exampleVi": "Họ điều hành một doanh nghiệp gia đình."
      },
      {
        "word": "salary",
        "phonetic": "/ˈsæl.ər.i/",
        "wordType": "noun",
        "meaningEn": "a fixed regular payment made by an employer to an employee",
        "meaningVi": "tiền lương",
        "example": "She receives a high monthly salary.",
        "exampleVi": "Cô ấy nhận lương tháng cao."
      },
      {
        "word": "customer",
        "phonetic": "/ˈkʌs.tə.mər/",
        "wordType": "noun",
        "meaningEn": "a person who buys goods or services from a shop or business",
        "meaningVi": "khách hàng",
        "example": "The customer is always right.",
        "exampleVi": "Khách hàng luôn luôn đúng."
      },
      {
        "word": "project",
        "phonetic": "/ˈprɒdʒ.ekt/",
        "wordType": "noun",
        "meaningEn": "an individual or collaborative enterprise that is carefully planned",
        "meaningVi": "dự án",
        "example": "We are working on a new project.",
        "exampleVi": "Chúng tôi đang thực hiện một dự án mới."
      },
      {
        "word": "partner",
        "phonetic": "/ˈpɑːt.nər/",
        "wordType": "noun",
        "meaningEn": "a person who takes part in an undertaking with another",
        "meaningVi": "đối tác, cộng sự",
        "example": "He is a business partner.",
        "exampleVi": "Anh ấy là một đối tác kinh doanh."
      },
      {
        "word": "product",
        "phonetic": "/ˈprɒd.ʌkt/",
        "wordType": "noun",
        "meaningEn": "an article or substance that is manufactured or refined for sale",
        "meaningVi": "sản phẩm",
        "example": "Our products are sold worldwide.",
        "exampleVi": "Sản phẩm của chúng tôi được bán trên toàn thế giới."
      },
      {
        "word": "team",
        "phonetic": "/tiːm/",
        "wordType": "noun",
        "meaningEn": "a group of players or workers forming one side in a competitive activity",
        "meaningVi": "đội nhóm",
        "example": "Our marketing team is talented.",
        "exampleVi": "Đội marketing của chúng tôi rất tài năng."
      },
      {
        "word": "department",
        "phonetic": "/dɪˈpɑːt.mənt/",
        "wordType": "noun",
        "meaningEn": "a division of a large organization or shop",
        "meaningVi": "phòng ban",
        "example": "Contact the sales department.",
        "exampleVi": "Hãy liên hệ với phòng bán hàng."
      },
      {
        "word": "client",
        "phonetic": "/ˈklaɪ.ənt/",
        "wordType": "noun",
        "meaningEn": "a person or organization using the services of a professional person",
        "meaningVi": "khách hàng đối tác",
        "example": "We must keep our clients happy.",
        "exampleVi": "Chúng ta phải làm hài lòng các khách hàng của mình."
      },
      {
        "word": "contract",
        "phonetic": "/ˈkɒn.trækt/",
        "wordType": "noun",
        "meaningEn": "a written or spoken agreement, especially one concerning employment or sales",
        "meaningVi": "hợp đồng",
        "example": "Sign the employment contract.",
        "exampleVi": "Hãy ký hợp đồng lao động."
      },
      {
        "word": "job",
        "phonetic": "/dʒɒb/",
        "wordType": "noun",
        "meaningEn": "a paid position of regular employment",
        "meaningVi": "việc làm, công việc",
        "example": "She applied for a new job.",
        "exampleVi": "Cô ấy đã ứng tuyển vào một công việc mới."
      },
      {
        "word": "work",
        "phonetic": "/wɜːk/",
        "wordType": "noun/verb",
        "meaningEn": "activity involving mental or physical effort done in order to achieve a purpose",
        "meaningVi": "làm việc, công vụ",
        "example": "I have a lot of work to do today.",
        "exampleVi": "Tôi có rất nhiều việc phải làm hôm nay."
      },
      {
        "word": "staff",
        "phonetic": "/stɑːf/",
        "wordType": "noun",
        "meaningEn": "all the people employed by a particular organization",
        "meaningVi": "đội ngũ nhân viên",
        "example": "The school staff are friendly.",
        "exampleVi": "Đội ngũ nhân viên nhà trường rất thân thiện."
      },
      {
        "word": "market",
        "phonetic": "/ˈmɑː.kɪt/",
        "wordType": "noun",
        "meaningEn": "an area or arena in which commercial dealings are conducted",
        "meaningVi": "thị trường, chợ",
        "example": "The company dominates the local market.",
        "exampleVi": "Công ty thống trị thị trường địa phương."
      },
      {
        "word": "cost",
        "phonetic": "/kɒst/",
        "wordType": "noun/verb",
        "meaningEn": "an amount that has to be paid or spent to buy or obtain something",
        "meaningVi": "chi phí, giá cả",
        "example": "We must reduce production costs.",
        "exampleVi": "Chúng ta phải cắt giảm chi phí sản xuất."
      },
      {
        "word": "price",
        "phonetic": "/praɪs/",
        "wordType": "noun",
        "meaningEn": "the amount of money expected, required, or given in payment for something",
        "meaningVi": "mức giá",
        "example": "House prices are rising rapidly.",
        "exampleVi": "Giá nhà đất đang tăng nhanh chóng."
      },
      {
        "word": "sale",
        "phonetic": "/seɪl/",
        "wordType": "noun",
        "meaningEn": "the exchange of a commodity for money; the action of selling something",
        "meaningVi": "doanh số, sự bán hàng, đợt giảm giá",
        "example": "The store is having a big sale.",
        "exampleVi": "Cửa hàng đang có một đợt giảm giá lớn."
      },
      {
        "word": "deal",
        "phonetic": "/diːl/",
        "wordType": "noun/verb",
        "meaningEn": "a business agreement or transaction",
        "meaningVi": "thỏa thuận, thương vụ",
        "example": "They closed a major business deal.",
        "exampleVi": "Họ đã chốt một thương vụ làm ăn lớn."
      },
      {
        "word": "tax",
        "phonetic": "/tæks/",
        "wordType": "noun",
        "meaningEn": "a compulsory contribution to state revenue levied by government",
        "meaningVi": "thuế",
        "example": "The government plans to increase income tax.",
        "exampleVi": "Chính phủ có kế hoạch tăng thuế thu nhập."
      },
      {
        "word": "profit",
        "phonetic": "/ˈprɒf.ɪt/",
        "wordType": "noun",
        "meaningEn": "a financial gain, especially the difference between the amount earned and spent",
        "meaningVi": "lợi nhuận",
        "example": "The company made a record profit this year.",
        "exampleVi": "Công ty đạt mức lợi nhuận kỷ lục năm nay."
      }
    ,
      {
            "word": "employee",
            "phonetic": "/ɪmˈplɔɪ.iː/",
            "wordType": "noun",
            "meaningEn": "a person employed for wages or salary",
            "meaningVi": "nhân viên, người làm công",
            "example": "The company has over 500 employees.",
            "exampleVi": "Công ty có hơn 500 nhân viên."
      },
      {
            "word": "salary",
            "phonetic": "/ˈsæl.ər.i/",
            "wordType": "noun",
            "meaningEn": "a fixed regular payment, typically paid on a monthly basis",
            "meaningVi": "lương tháng",
            "example": "She receives a decent salary.",
            "exampleVi": "Cô ấy nhận được một mức lương khá."
      },
      {
            "word": "meeting",
            "phonetic": "/ˈmiː.tɪŋ/",
            "wordType": "noun",
            "meaningEn": "an assembly of people for a particular purpose",
            "meaningVi": "cuộc họp",
            "example": "We have a staff meeting every Monday.",
            "exampleVi": "Chúng tôi có một cuộc họp nhân viên vào thứ Hai hàng tuần."
      },
      {
            "word": "office",
            "phonetic": "/ˈɒf.ɪs/",
            "wordType": "noun",
            "meaningEn": "a room, set of rooms, or building used as a place for commercial or professional work",
            "meaningVi": "văn phòng",
            "example": "His office is on the third floor.",
            "exampleVi": "Văn phòng của anh ấy nằm ở tầng ba."
      },
      {
            "word": "project",
            "phonetic": "/ˈprɒdʒ.ekt/",
            "wordType": "noun",
            "meaningEn": "an individual or collaborative enterprise that is carefully planned",
            "meaningVi": "dự án",
            "example": "He is leading the new software project.",
            "exampleVi": "Anh ấy đang dẫn dắt dự án phần mềm mới."
      },
      {
            "word": "department",
            "phonetic": "/dɪˈpɑːt.mənt/",
            "wordType": "noun",
            "meaningEn": "a division of a large organization or company",
            "meaningVi": "phòng ban, bộ phận",
            "example": "She works in the marketing department.",
            "exampleVi": "Cô ấy làm việc ở bộ phận marketing."
      },
      {
            "word": "schedule",
            "phonetic": "/ˈʃedʒ.uːl/",
            "wordType": "noun",
            "meaningEn": "a plan for carrying out a process or procedure",
            "meaningVi": "lịch trình, thời khóa biểu",
            "example": "We need to stay on schedule.",
            "exampleVi": "Chúng ta cần tuân thủ đúng lịch trình."
      },
      {
            "word": "customer",
            "phonetic": "/ˈkʌs.tə.mər/",
            "wordType": "noun",
            "meaningEn": "a person who buys goods or services from a shop or business",
            "meaningVi": "khách hàng",
            "example": "The customer was very satisfied with the service.",
            "exampleVi": "Khách hàng đã rất hài lòng với dịch vụ."
      },
      {
            "word": "employer",
            "phonetic": "/ɪmˈplɔɪ.ər/",
            "wordType": "noun",
            "meaningEn": "a person or organization that employs people",
            "meaningVi": "người sử dụng lao động, chủ doanh nghiệp",
            "example": "He is a fair and supportive employer.",
            "exampleVi": "Ông ấy là một người chủ công bằng và biết hỗ trợ."
      },
      {
            "word": "business",
            "phonetic": "/ˈbɪz.nɪs/",
            "wordType": "noun",
            "meaningEn": "a person's regular occupation, profession, or trade",
            "meaningVi": "kinh doanh, doanh nghiệp",
            "example": "She runs a small family business.",
            "exampleVi": "Cô ấy điều hành một doanh nghiệp gia đình nhỏ."
      }
    ],
    "advanced": [
      {
        "word": "corporation",
        "phonetic": "/ˌkɔː.pərˈeɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "a large company or group of companies authorized to act as a single entity",
        "meaningVi": "tập đoàn lớn",
        "example": "She works for a multinational corporation.",
        "exampleVi": "Cô ấy làm việc cho một tập đoàn đa quốc gia."
      },
      {
        "word": "headquarters",
        "phonetic": "/ˌhedˈkwɔː.təz/",
        "wordType": "noun pl",
        "meaningEn": "the premises serving as the administrative center of an enterprise",
        "meaningVi": "trụ sở chính",
        "example": "The company's headquarters are in London.",
        "exampleVi": "Trụ sở chính của công ty nằm ở Luân Đôn."
      },
      {
        "word": "boardroom",
        "phonetic": "/ˈbɔːd.ruːm/",
        "wordType": "noun",
        "meaningEn": "a room where the board of directors of a company meets",
        "meaningVi": "phòng họp ban quản trị",
        "example": "The board met in the main boardroom.",
        "exampleVi": "Ban giám đốc đã họp tại phòng họp ban quản trị chính."
      },
      {
        "word": "acquisition",
        "phonetic": "/ˌæk.wɪˈzɪʃ.ən/",
        "wordType": "noun",
        "meaningEn": "an asset or object bought or obtained, typically by a library or museum",
        "meaningVi": "sự mua lại, thâu tóm doanh nghiệp",
        "example": "The acquisition of the rival firm.",
        "exampleVi": "Sự mua lại thâu tóm công ty đối thủ."
      },
      {
        "word": "strategy",
        "phonetic": "/ˈstræt.ə.dʒi/",
        "wordType": "noun",
        "meaningEn": "a plan of action designed to achieve a long-term or overall aim",
        "meaningVi": "chiến lược",
        "example": "We need a clear business strategy.",
        "exampleVi": "Chúng ta cần một chiến lược kinh doanh rõ ràng."
      },
      {
        "word": "deficit",
        "phonetic": "/ˈdef.ɪ.sɪt/",
        "wordType": "noun",
        "meaningEn": "the amount by which something, especially a sum of money, is too small",
        "meaningVi": "sự thâm hụt tài chính",
        "example": "The trade deficit has widened.",
        "exampleVi": "Thâm hụt thương mại đã nới rộng hơn."
      },
      {
        "word": "shareholder",
        "phonetic": "/ˈʃeəˌhəʊl.dər/",
        "wordType": "noun",
        "meaningEn": "an owner of shares in a company",
        "meaningVi": "cổ đông",
        "example": "The shareholders voted for the merger.",
        "exampleVi": "Các cổ đông đã bỏ phiếu thông qua việc sáp nhập."
      },
      {
        "word": "infrastructure",
        "phonetic": "/ˈɪn.frəˌstrʌk.tʃər/",
        "wordType": "noun",
        "meaningEn": "the basic physical structures needed for the operation of a society or enterprise",
        "meaningVi": "cơ sở hạ tầng",
        "example": "The firm invested in IT infrastructure.",
        "exampleVi": "Công ty đã đầu tư vào cơ sở hạ tầng CNTT."
      },
      {
        "word": "subsidiary",
        "phonetic": "/səbˈsɪd.i.ə.ri/",
        "wordType": "noun",
        "meaningEn": "a company controlled by a holding company",
        "meaningVi": "công ty con",
        "example": "Our firm is a subsidiary of a French giant.",
        "exampleVi": "Công ty chúng tôi là công ty con của một gã khổng lồ Pháp."
      },
      {
        "word": "conglomerate",
        "phonetic": "/kənˈɡlɒm.ər.ət/",
        "wordType": "noun",
        "meaningEn": "a multi-industry company that combination of multiple business entities",
        "meaningVi": "tập đoàn đa ngành khổng lồ",
        "example": "A media conglomerate owns the TV station.",
        "exampleVi": "Một tập đoàn truyền thông đa ngành sở hữu đài truyền hình."
      },
      {
        "word": "bankruptcy",
        "phonetic": "/ˈbæŋ.krəpt.si/",
        "wordType": "noun",
        "meaningEn": "the state of being completely lacking in money and unable to pay debts",
        "meaningVi": "sự phá sản",
        "example": "The firm declared bankruptcy last month.",
        "exampleVi": "Công ty đã tuyên bố phá sản vào tháng trước."
      },
      {
        "word": "superintendent",
        "phonetic": "/ˌsuː.pər.ɪnˈten.dənt/",
        "wordType": "noun",
        "meaningEn": "a person who directs and manages an organization",
        "meaningVi": "người giám sát, người quản lý cấp cao",
        "example": "The superintendent inspected the site.",
        "exampleVi": "Người giám sát cấp cao đã thanh tra địa điểm này."
      },
      {
        "word": "entrepreneurship",
        "phonetic": "/ˌɒn.trə.prəˈnɜː.ʃɪp/",
        "wordType": "noun",
        "meaningEn": "the activity of setting up a business, taking on financial risks",
        "meaningVi": "tinh thần khởi nghiệp",
        "example": "The college fosters entrepreneurship.",
        "exampleVi": "Trường đại học bồi dưỡng tinh thần khởi nghiệp."
      },
      {
        "word": "remuneration",
        "phonetic": "/rɪˌmjuː.nərˈeɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "money paid for work or a service",
        "meaningVi": "thù lao, tiền công trả thưởng",
        "example": "They demanded fair remuneration.",
        "exampleVi": "Họ yêu cầu một mức thù lao công bằng."
      },
      {
        "word": "bureaucracy",
        "phonetic": "/bjʊəˈrɒk.rə.si/",
        "wordType": "noun",
        "meaningEn": "a system of government in which decisions are made by state officials",
        "meaningVi": "thói quan liêu, bộ máy hành chính cồng kềnh",
        "example": "Small businesses struggle with bureaucracy.",
        "exampleVi": "Các doanh nghiệp nhỏ gặp khó khăn với bộ máy hành chính cồng kềnh."
      },
      {
        "word": "merger",
        "phonetic": "/ˈmɜː.dʒər/",
        "wordType": "noun",
        "meaningEn": "a combination of two things, especially companies, into one",
        "meaningVi": "sự sáp nhập doanh nghiệp",
        "example": "The proposed merger created controversy.",
        "exampleVi": "Việc đề xuất sáp nhập doanh nghiệp đã tạo ra tranh cãi."
      },
      {
        "word": "liability",
        "phonetic": "/ˌlaɪ.əˈbɪl.ə.ti/",
        "wordType": "noun",
        "meaningEn": "the state of being responsible for something, especially by law, or financial debts",
        "meaningVi": "trách nhiệm pháp lý, khoản nợ phải trả",
        "example": "The limited liability company protects owners.",
        "exampleVi": "Công ty trách nhiệm hữu hạn bảo vệ quyền lợi chủ sở hữu."
      },
      {
        "word": "asset",
        "phonetic": "/ˈæs.et/",
        "wordType": "noun",
        "meaningEn": "a useful or valuable quality, person, or thing, or property owned",
        "meaningVi": "tài sản hữu hình/vô hình",
        "example": "Good employees are a company's greatest asset.",
        "exampleVi": "Nhân viên giỏi là tài sản lớn nhất của công ty."
      },
      {
        "word": "revenue",
        "phonetic": "/ˈrev.ən.juː/",
        "wordType": "noun",
        "meaningEn": "income, especially when of a company or organization",
        "meaningVi": "doanh thu",
        "example": "Company revenues increased by ten percent.",
        "exampleVi": "Doanh thu công ty đã tăng 10%."
      },
      {
        "word": "dividend",
        "phonetic": "/ˈdɪv.ɪ.dend/",
        "wordType": "noun",
        "meaningEn": "a sum of money paid regularly by a company to its shareholders out of its profits",
        "meaningVi": "cổ tức",
        "example": "Shareholders received their annual dividend.",
        "exampleVi": "Các cổ đông đã nhận được cổ tức hàng năm."
      },
      {
        "word": "inventory",
        "phonetic": "/ˈɪn.vən.tər.i/",
        "wordType": "noun",
        "meaningEn": "a complete list of items such as property, goods in stock",
        "meaningVi": "hàng hóa tồn kho, sự kiểm kê",
        "example": "The warehouse inventory is updated weekly.",
        "exampleVi": "Hàng hóa tồn kho trong kho được cập nhật hàng tuần."
      },
      {
        "word": "portfolio",
        "phonetic": "/ˌpɔːtˈfəʊ.li.əʊ/",
        "wordType": "noun",
        "meaningEn": "a range of investments held by a person or organization",
        "meaningVi": "danh mục đầu tư, hồ sơ năng lực",
        "example": "The financial advisor managed my investment portfolio.",
        "exampleVi": "Cố vấn tài chính đã quản lý danh mục đầu tư của tôi."
      },
      {
        "word": "overhead",
        "phonetic": "/ˈəʊ.və.hed/",
        "wordType": "noun",
        "meaningEn": "business expenses, such as rent, that are not directly attributed to creating a product",
        "meaningVi": "chi phí vận hành thường xuyên",
        "example": "We must reduce overhead to stay profitable.",
        "exampleVi": "Chúng ta phải giảm chi phí vận hành thường xuyên để duy trì lợi nhuận."
      },
      {
        "word": "equity",
        "phonetic": "/ˈek.wɪ.ti/",
        "wordType": "noun",
        "meaningEn": "the value of the shares issued by a company",
        "meaningVi": "vốn chủ sở hữu",
        "example": "He owns thirty percent equity in the startup.",
        "exampleVi": "Cậu ta sở hữu 30% cổ phần trong công ty khởi nghiệp."
      },
      {
        "word": "audit",
        "phonetic": "/ˈɔː.dɪt/",
        "wordType": "noun/verb",
        "meaningEn": "an official inspection of an organization's accounts, typically by an independent body",
        "meaningVi": "sự kiểm toán, kiểm toán",
        "example": "The firm underwent a rigorous financial audit.",
        "exampleVi": "Công ty đã trải qua một đợt kiểm toán tài chính nghiêm ngặt."
      }
    ,
      {
            "word": "conglomerate",
            "phonetic": "/kənˈɡlɒm.ər.ət/",
            "wordType": "noun",
            "meaningEn": "a multi-industry company combination of multiple business entities",
            "meaningVi": "tập đoàn kinh tế đa ngành",
            "example": "The media conglomerate expanded its digital branch.",
            "exampleVi": "Tập đoàn truyền thông đa ngành đã mở rộng chi nhánh kỹ thuật số của mình."
      },
      {
            "word": "acquisition",
            "phonetic": "/ˌæk.wɪˈzɪʃ.ən/",
            "wordType": "noun",
            "meaningEn": "an asset or object bought or obtained, typically by a company",
            "meaningVi": "sự thâu tóm, mua lại (công ty)",
            "example": "The corporation announced its latest acquisition.",
            "exampleVi": "Tập đoàn đã thông báo về thương vụ thâu tóm mới nhất của mình."
      },
      {
            "word": "shareholder",
            "phonetic": "/ˈʃeəˌhəʊl.dər/",
            "wordType": "noun",
            "meaningEn": "an owner of shares in a company",
            "meaningVi": "cổ đông",
            "example": "The shareholders voted in favor of the merger.",
            "exampleVi": "Các cổ đông đã bỏ phiếu thuận cho việc sáp nhập."
      },
      {
            "word": "dividend",
            "phonetic": "/ˈdɪv.ɪ.dend/",
            "wordType": "noun",
            "meaningEn": "a sum of money paid regularly by a company to its shareholders out of its profits",
            "meaningVi": "cổ tức",
            "example": "The board approved a high annual dividend.",
            "exampleVi": "Ban quản trị đã phê duyệt một mức cổ tức hàng năm cao."
      },
      {
            "word": "audit",
            "phonetic": "/ˈɔː.dɪt/",
            "wordType": "noun/verb",
            "meaningEn": "an official inspection of an organization's accounts",
            "meaningVi": "kiểm toán, sự kiểm toán",
            "example": "The annual financial audit is starting next week.",
            "exampleVi": "Đợt kiểm toán tài chính hàng năm sẽ bắt đầu vào tuần tới."
      },
      {
            "word": "liquidity",
            "phonetic": "/lɪˈkwɪd.ə.ti/",
            "wordType": "noun",
            "meaningEn": "the availability of liquid assets to a market or company",
            "meaningVi": "tính thanh khoản, khả năng chuyển đổi tiền mặt",
            "example": "The firm needs to maintain sufficient liquidity.",
            "exampleVi": "Công ty cần duy trì tính thanh khoản đầy đủ."
      },
      {
            "word": "infrastructure",
            "phonetic": "/ˈɪn.frəˌstrʌk.tʃər/",
            "wordType": "noun",
            "meaningEn": "the basic physical and organizational structures needed for operation",
            "meaningVi": "cơ sở hạ tầng",
            "example": "The company invested heavily in technical infrastructure.",
            "exampleVi": "Công ty đã đầu tư mạnh mẽ vào cơ sở hạ tầng kỹ thuật."
      },
      {
            "word": "subsidiary",
            "phonetic": "/səbˈsɪd.i.ə.ri/",
            "wordType": "noun",
            "meaningEn": "a company controlled by a holding company",
            "meaningVi": "công ty con",
            "example": "The German subsidiary handles European distribution.",
            "exampleVi": "Công ty con tại Đức phụ trách việc phân phối ở châu Âu."
      },
      {
            "word": "overhead",
            "phonetic": "/ˈəʊ.və.hed/",
            "wordType": "noun",
            "meaningEn": "business expenses, such as rent, that are not directly attributed to creating a product",
            "meaningVi": "chi phí cố định, chi phí vận hành gián tiếp",
            "example": "We need to cut down our overhead cost.",
            "exampleVi": "Chúng ta cần cắt giảm chi phí vận hành gián tiếp."
      },
      {
            "word": "equity",
            "phonetic": "/ˈek.wɪ.ti/",
            "wordType": "noun",
            "meaningEn": "the value of the shares issued by a company",
            "meaningVi": "vốn chủ sở hữu, cổ phần",
            "example": "She sold her equity in the company.",
            "exampleVi": "Cô ấy đã bán cổ phần của mình trong công ty."
      }
    ]
  },
  {
    "id": "it",
    "title": "Công nghệ thông tin (Information Technology)",
    "desc": "Từ vựng cốt lõi về phần mềm, phần cứng, lập trình, trí tuệ nhân tạo và an ninh mạng.",
    "color": "border-violet-300 bg-violet-100/30 text-violet-900 hover:border-violet-500 dark:bg-slate-900/50 dark:border-slate-800 dark:text-violet-300",
    "beginner": [
      {
        "word": "computer",
        "phonetic": "/kəmˈpjuː.tər/",
        "wordType": "noun",
        "meaningEn": "an electronic device for storing and processing data",
        "meaningVi": "máy tính",
        "example": "I bought a new computer.",
        "exampleVi": "Tôi đã mua một chiếc máy tính mới."
      },
      {
        "word": "internet",
        "phonetic": "/ˈɪn.tə.net/",
        "wordType": "noun",
        "meaningEn": "a global computer network providing a variety of information",
        "meaningVi": "mạng internet",
        "example": "Search for it on the internet.",
        "exampleVi": "Hãy tìm kiếm nó trên mạng internet."
      },
      {
        "word": "website",
        "phonetic": "/ˈweb.saɪt/",
        "wordType": "noun",
        "meaningEn": "a set of related web pages located under a single domain name",
        "meaningVi": "trang web",
        "example": "Visit our official website.",
        "exampleVi": "Hãy ghé thăm trang web chính thức của chúng tôi."
      },
      {
        "word": "software",
        "phonetic": "/ˈsoft.weər/",
        "wordType": "noun",
        "meaningEn": "the programs and other operating information used by a computer",
        "meaningVi": "phần mềm",
        "example": "Install the anti-virus software.",
        "exampleVi": "Hãy cài đặt phần mềm diệt vi-rút."
      },
      {
        "word": "keyboard",
        "phonetic": "/ˈkiː.bɔːd/",
        "wordType": "noun",
        "meaningEn": "a panel of keys that operates a computer or typewriter",
        "meaningVi": "bàn phím",
        "example": "Clean the dust off the keyboard.",
        "exampleVi": "Lau sạch bụi khỏi bàn phím."
      },
      {
        "word": "screen",
        "phonetic": "/skriːn/",
        "wordType": "noun",
        "meaningEn": "a flat surface in a cinema or on a television or computer on which pictures are shown",
        "meaningVi": "màn hình",
        "example": "Look at the computer screen.",
        "exampleVi": "Nhìn vào màn hình máy tính kìa."
      },
      {
        "word": "network",
        "phonetic": "/ˈnet.wɜːk/",
        "wordType": "noun",
        "meaningEn": "a group of two or more computer systems linked together",
        "meaningVi": "mạng lưới, hệ mạng",
        "example": "The network is slow today.",
        "exampleVi": "Hệ thống mạng hôm nay bị chậm."
      },
      {
        "word": "folder",
        "phonetic": "/ˈfəʊl.dər/",
        "wordType": "noun",
        "meaningEn": "an icon on a computer screen that can be used to group documents together",
        "meaningVi": "thư mục",
        "example": "Create a new folder for photos.",
        "exampleVi": "Hãy tạo một thư mục mới cho ảnh."
      },
      {
        "word": "file",
        "phonetic": "/faɪl/",
        "wordType": "noun",
        "meaningEn": "a resource for storing information, which is available to a computer program",
        "meaningVi": "tập tin, tệp tin",
        "example": "Save the file before closing.",
        "exampleVi": "Hãy lưu tập tin trước khi đóng."
      },
      {
        "word": "password",
        "phonetic": "/ˈpɑːs.wɜːd/",
        "wordType": "noun",
        "meaningEn": "a secret word or phrase that must be used to gain admission to something",
        "meaningVi": "mật khẩu",
        "example": "Never share your password.",
        "exampleVi": "Đừng bao giờ chia sẻ mật khẩu của bạn."
      },
      {
        "word": "online",
        "phonetic": "/ˌɒnˈlaɪn/",
        "wordType": "adj/adv",
        "meaningEn": "connected to the internet",
        "meaningVi": "trực tuyến, kết nối mạng",
        "example": "The system is online now.",
        "exampleVi": "Hệ thống hiện đang trực tuyến."
      },
      {
        "word": "mouse",
        "phonetic": "/maʊs/",
        "wordType": "noun",
        "meaningEn": "a small handheld device which is moved across a flat surface to move screen cursor",
        "meaningVi": "chuột máy tính",
        "example": "This wireless mouse is smooth.",
        "exampleVi": "Chú chuột không dây này dùng rất mượt."
      },
      {
        "word": "data",
        "phonetic": "/ˈdeɪ.tə/",
        "wordType": "noun",
        "meaningEn": "facts and statistics collected together for reference or analysis",
        "meaningVi": "dữ liệu",
        "example": "Backup your data regularly.",
        "exampleVi": "Sao lưu dữ liệu của bạn thường xuyên."
      },
      {
        "word": "email",
        "phonetic": "/ˈiː.meɪl/",
        "wordType": "noun/verb",
        "meaningEn": "messages distributed by electronic means from one computer user to one or more recipients",
        "meaningVi": "thư điện tử, gửi email",
        "example": "I sent you an email yesterday.",
        "exampleVi": "Tôi đã gửi email cho bạn vào hôm qua."
      },
      {
        "word": "hardware",
        "phonetic": "/ˈhɑːd.weər/",
        "wordType": "noun",
        "meaningEn": "tools, machinery, and other durable equipment, or physical parts of computer",
        "meaningVi": "phần cứng máy tính",
        "example": "Upgrading the hardware makes PC faster.",
        "exampleVi": "Nâng cấp phần cứng giúp máy tính chạy nhanh hơn."
      },
      {
        "word": "system",
        "phonetic": "/ˈsɪs.təm/",
        "wordType": "noun",
        "meaningEn": "a set of things working together as parts of a mechanism or an interconnecting network",
        "meaningVi": "hệ thống",
        "example": "The operating system needs to update.",
        "exampleVi": "Hệ điều hành cần được cập nhật."
      },
      {
        "word": "program",
        "phonetic": "/ˈprəʊ.ɡræm/",
        "wordType": "noun/verb",
        "meaningEn": "a set of instructions that a computer follows to perform a task",
        "meaningVi": "chương trình, lập trình",
        "example": "Write a program to calculate tax.",
        "exampleVi": "Viết một chương trình để tính thuế."
      },
      {
        "word": "code",
        "phonetic": "/kəʊd/",
        "wordType": "noun/verb",
        "meaningEn": "instructions written in a programming language",
        "meaningVi": "mã nguồn, viết code",
        "example": "The code is clean and well-documented.",
        "exampleVi": "Mã nguồn sạch sẽ và có chú thích tốt."
      },
      {
        "word": "user",
        "phonetic": "/ˈjuː.zər/",
        "wordType": "noun",
        "meaningEn": "a person who uses or operates something, especially a computer or service",
        "meaningVi": "người dùng",
        "example": "The app has millions of active users.",
        "exampleVi": "Ứng dụng có hàng triệu người dùng hoạt động."
      },
      {
        "word": "link",
        "phonetic": "/lɪŋk/",
        "wordType": "noun/verb",
        "meaningEn": "a connection between two files, documents, or web pages",
        "meaningVi": "liên kết, đường dẫn",
        "example": "Click the link to read the article.",
        "exampleVi": "Bấm vào đường liên kết để đọc bài báo."
      },
      {
        "word": "site",
        "phonetic": "/saɪt/",
        "wordType": "noun",
        "meaningEn": "a website or physical location",
        "meaningVi": "trang web, địa điểm",
        "example": "The social networking site is popular.",
        "exampleVi": "Trang mạng xã hội đó rất phổ biến."
      },
      {
        "word": "download",
        "phonetic": "/ˌdaʊnˈləʊd/",
        "wordType": "verb/noun",
        "meaningEn": "copy data from one computer system to another, typically over the internet",
        "meaningVi": "tải xuống",
        "example": "Download the file to your computer.",
        "exampleVi": "Tải tập tin về máy tính của bạn."
      },
      {
        "word": "upload",
        "phonetic": "/ˌʌpˈləʊd/",
        "wordType": "verb/noun",
        "meaningEn": "transfer data from one computer to another, typically to a larger central system",
        "meaningVi": "tải lên, đăng tải",
        "example": "Upload your profile photo.",
        "exampleVi": "Đăng tải ảnh đại diện của bạn."
      },
      {
        "word": "server",
        "phonetic": "/ˈsɜː.vər/",
        "wordType": "noun",
        "meaningEn": "a computer or computer program which manages access to a centralized resource",
        "meaningVi": "máy chủ",
        "example": "The database server is down.",
        "exampleVi": "Máy chủ cơ sở dữ liệu đã bị lỗi."
      },
      {
        "word": "cloud",
        "phonetic": "/klaʊd/",
        "wordType": "noun",
        "meaningEn": "a network of remote servers hosted on the internet to store and manage data",
        "meaningVi": "mạng đám mây",
        "example": "Store the photos in the cloud.",
        "exampleVi": "Lưu trữ hình ảnh trên đám mây."
      }
    ,
      {
            "word": "software",
            "phonetic": "/ˈsɒft.weər/",
            "wordType": "noun",
            "meaningEn": "the programs used by a computer",
            "meaningVi": "phần mềm",
            "example": "I need to update the operating software.",
            "exampleVi": "Tôi cần cập nhật phần mềm điều hành."
      },
      {
            "word": "hardware",
            "phonetic": "/ˈhɑːd.weər/",
            "wordType": "noun",
            "meaningEn": "the physical components of a computer",
            "meaningVi": "phần cứng",
            "example": "The hardware needs an upgrade to run this game.",
            "exampleVi": "Phần cứng cần nâng cấp để chạy tựa game này."
      },
      {
            "word": "keyboard",
            "phonetic": "/ˈkiː.bɔːd/",
            "wordType": "noun",
            "meaningEn": "a panel of keys used to input text into a computer",
            "meaningVi": "bàn phím",
            "example": "She typed quickly on her mechanical keyboard.",
            "exampleVi": "Cô ấy gõ nhanh trên chiếc bàn phím cơ của mình."
      },
      {
            "word": "connection",
            "phonetic": "/kəˈnek.ʃən/",
            "wordType": "noun",
            "meaningEn": "a link between two or more computer systems or devices",
            "meaningVi": "kết nối",
            "example": "Check your internet connection.",
            "exampleVi": "Hãy kiểm tra kết nối mạng của bạn."
      },
      {
            "word": "download",
            "phonetic": "/ˌdaʊnˈləʊd/",
            "wordType": "verb/noun",
            "meaningEn": "copy data from a remote system to a local system",
            "meaningVi": "tải xuống",
            "example": "The download finished in a few seconds.",
            "exampleVi": "Việc tải xuống hoàn thành trong vài giây."
      },
      {
            "word": "file",
            "phonetic": "/faɪl/",
            "wordType": "noun",
            "meaningEn": "a resource for storing information in a computer",
            "meaningVi": "tập tin, tệp",
            "example": "Please send me the file via email.",
            "exampleVi": "Vui lòng gửi cho tôi tệp tin qua email."
      },
      {
            "word": "screen",
            "phonetic": "/skriːn/",
            "wordType": "noun",
            "meaningEn": "the surface of a display device",
            "meaningVi": "màn hình",
            "example": "The phone screen is cracked.",
            "exampleVi": "Màn hình điện thoại đã bị nứt."
      },
      {
            "word": "network",
            "phonetic": "/ˈnet.wɜːk/",
            "wordType": "noun",
            "meaningEn": "a group of interconnected computers",
            "meaningVi": "mạng lưới máy tính",
            "example": "We set up a local network in the office.",
            "exampleVi": "Chúng tôi thiết lập một mạng cục bộ trong văn phòng."
      },
      {
            "word": "folder",
            "phonetic": "/ˈfəʊl.dər/",
            "wordType": "noun",
            "meaningEn": "a directory used for organizing files",
            "meaningVi": "thư mục",
            "example": "Organize your documents into different folders.",
            "exampleVi": "Hãy sắp xếp các tài liệu của bạn vào các thư mục khác nhau."
      },
      {
            "word": "online",
            "phonetic": "/ˌɒnˈlaɪn/",
            "wordType": "adj/adv",
            "meaningEn": "connected to the internet",
            "meaningVi": "trực tuyến",
            "example": "Many courses are now available online.",
            "exampleVi": "Nhiều khóa học hiện đã có sẵn trực tuyến."
      }
    ],
    "advanced": [
      {
        "word": "algorithm",
        "phonetic": "/ˈæl.ɡə.rɪ.ðəm/",
        "wordType": "noun",
        "meaningEn": "a process or set of rules to be followed in calculations or problem-solving",
        "meaningVi": "thuật toán",
        "example": "This algorithm optimizes the search.",
        "exampleVi": "Thuật toán này giúp tối ưu hóa tìm kiếm."
      },
      {
        "word": "database",
        "phonetic": "/ˈdeɪ.tə.beɪs/",
        "wordType": "noun",
        "meaningEn": "a structured set of data held in a computer, especially one that is accessible in various ways",
        "meaningVi": "cơ sở dữ liệu",
        "example": "We store user logs in the database.",
        "exampleVi": "Chúng tôi lưu nhật ký người dùng trong cơ sở dữ liệu."
      },
      {
        "word": "encryption",
        "phonetic": "/ɪnˈkrɪp.ʃən/",
        "wordType": "noun",
        "meaningEn": "the process of converting information or data into a code, especially to prevent unauthorized access",
        "meaningVi": "sự mã hóa, bảo mật dữ liệu",
        "example": "Strong encryption secures communications.",
        "exampleVi": "Mã hóa mạnh mẽ giúp bảo mật các cuộc hội thoại."
      },
      {
        "word": "cybersecurity",
        "phonetic": "/ˌsaɪ.bə.sɪˈkjʊə.rə.ti/",
        "wordType": "noun",
        "meaningEn": "the state of being protected against the criminal use of electronic data",
        "meaningVi": "an ninh mạng",
        "example": "Cybersecurity is a top priority for banks.",
        "exampleVi": "An ninh mạng là ưu tiên hàng đầu của các ngân hàng."
      },
      {
        "word": "repository",
        "phonetic": "/rɪˈpɒz.ɪ.tər.i/",
        "wordType": "noun",
        "meaningEn": "a place where things are stored, or a central location in Git",
        "meaningVi": "kho lưu trữ mã nguồn (Git)",
        "example": "Push the new changes to the repository.",
        "exampleVi": "Đẩy các thay đổi mới lên kho lưu trữ."
      },
      {
        "word": "artificial intelligence",
        "phonetic": "/ˌɑː.tɪ.fɪʃ.əl ɪnˈtel.ɪ.dʒəns/",
        "wordType": "noun",
        "meaningEn": "computer systems able to perform tasks that normally require human intelligence",
        "meaningVi": "trí tuệ nhân tạo (AI)",
        "example": "Artificial intelligence is changing the world.",
        "exampleVi": "Trí tuệ nhân tạo đang thay đổi thế giới."
      },
      {
        "word": "cloud computing",
        "phonetic": "/klaʊd kəmˈpjuː.tɪŋ/",
        "wordType": "noun",
        "meaningEn": "the practice of using a network of remote servers hosted on the internet to store data",
        "meaningVi": "điện toán đám mây",
        "example": "We host our web app on cloud computing.",
        "exampleVi": "Chúng tôi vận hành ứng dụng web trên điện toán đám mây."
      },
      {
        "word": "debugging",
        "phonetic": "/ˌdiːˈbʌɡ.ɪŋ/",
        "wordType": "noun",
        "meaningEn": "the process of identifying and removing errors from computer hardware or software",
        "meaningVi": "quá trình gỡ lỗi, fix bug",
        "example": "I spent all night debugging the code.",
        "exampleVi": "Tôi dành cả đêm để gỡ lỗi code."
      },
      {
        "word": "framework",
        "phonetic": "/ˈfreɪm.wɜːk/",
        "wordType": "noun",
        "meaningEn": "a basic structure underlying a system, concept, or text, or software platform",
        "meaningVi": "khung phần mềm, thư viện nền tảng",
        "example": "React is a popular frontend framework.",
        "exampleVi": "React là một framework frontend rất phổ biến."
      },
      {
        "word": "protocol",
        "phonetic": "/ˈprəʊ.tə.kɒl/",
        "wordType": "noun",
        "meaningEn": "a set of rules governing the exchange or transmission of data between devices",
        "meaningVi": "giao thức truyền thông",
        "example": "HTTPS is a secure web protocol.",
        "exampleVi": "HTTPS là một giao thức web an toàn."
      },
      {
        "word": "compiler",
        "phonetic": "/kəmˈpaɪ.lər/",
        "wordType": "noun",
        "meaningEn": "a program that translates computer code from one language to another",
        "meaningVi": "trình biên dịch",
        "example": "The C++ compiler generated an error.",
        "exampleVi": "Trình biên dịch C++ đã tạo ra lỗi."
      },
      {
        "word": "middleware",
        "phonetic": "/ˈmɪd.əl.weər/",
        "wordType": "noun",
        "meaningEn": "software that acts as a bridge between an operating system or database and applications",
        "meaningVi": "phần mềm trung gian",
        "example": "The authentication middleware intercepts requests.",
        "exampleVi": "Middleware xác thực chặn các yêu cầu gửi đến."
      },
      {
        "word": "optimization",
        "phonetic": "/ˌɒp.tɪ.maɪˈzeɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "the action of making the best or most effective use of a resource",
        "meaningVi": "sự tối ưu hóa",
        "example": "Code optimization improves page load speed.",
        "exampleVi": "Tối ưu hóa code cải thiện tốc độ tải trang."
      },
      {
        "word": "bandwidth",
        "phonetic": "/ˈbænd.wɪtθ/",
        "wordType": "noun",
        "meaningEn": "the range of frequencies within a given band, in IT: data transfer rate",
        "meaningVi": "băng thông truyền dữ liệu",
        "example": "Video streaming requires high bandwidth.",
        "exampleVi": "Phát video trực tuyến đòi hỏi băng thông lớn."
      },
      {
        "word": "vulnerability",
        "phonetic": "/ˌvʌl.nər.əˈbɪl.ə.ti/",
        "wordType": "noun",
        "meaningEn": "a flaw or weakness in system security procedures or design",
        "meaningVi": "lỗ hổng bảo mật",
        "example": "Patch the system to fix the vulnerability.",
        "exampleVi": "Hãy vá hệ thống để khắc phục lỗ hổng bảo mật."
      },
      {
        "word": "architecture",
        "phonetic": "/ˈɑː.kɪ.tek.tʃər/",
        "wordType": "noun",
        "meaningEn": "the design and structure of computer systems or software systems",
        "meaningVi": "kiến trúc hệ thống phần mềm",
        "example": "We designed a microservices architecture.",
        "exampleVi": "Chúng tôi thiết kế một kiến trúc vi dịch vụ."
      },
      {
        "word": "automation",
        "phonetic": "/ˌɔː.təˈmeɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "the use of automatic equipment in a manufacturing or other process",
        "meaningVi": "sự tự động hóa",
        "example": "Test automation saves testing time.",
        "exampleVi": "Tự động hóa kiểm thử giúp tiết kiệm thời gian test."
      },
      {
        "word": "virtualization",
        "phonetic": "/ˌvɜː.tʃu.ə.laɪˈzeɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "the act of creating a virtual version of something, including computer hardware",
        "meaningVi": "công nghệ ảo hóa",
        "example": "Virtualization allows running multiple OS on one PC.",
        "exampleVi": "Công nghệ ảo hóa cho phép chạy nhiều hệ điều hành trên một máy tính."
      },
      {
        "word": "analytics",
        "phonetic": "/ˌæn.əlˈɪt.ɪks/",
        "wordType": "noun",
        "meaningEn": "the systematic computational analysis of data or statistics",
        "meaningVi": "phân tích dữ liệu",
        "example": "We use Google Analytics for traffic data.",
        "exampleVi": "Chúng tôi sử dụng Google Analytics cho dữ liệu lượt truy cập."
      },
      {
        "word": "dependency",
        "phonetic": "/dɪˈpen.dən.si/",
        "wordType": "noun",
        "meaningEn": "a software package or component that another program requires to function",
        "meaningVi": "sự phụ thuộc thư viện, dependency",
        "example": "Install the missing project dependencies.",
        "exampleVi": "Hãy cài đặt các thư viện phụ thuộc còn thiếu của dự án."
      },
      {
        "word": "scalability",
        "phonetic": "/ˌskeɪ.ləˈbɪl.ə.ti/",
        "wordType": "noun",
        "meaningEn": "the capacity to be changed in size or scale to handle growth",
        "meaningVi": "khả năng mở rộng hệ thống",
        "example": "System scalability is vital for startups.",
        "exampleVi": "Khả năng mở rộng hệ thống là tối quan trọng đối với các công ty khởi nghiệp."
      },
      {
        "word": "concurrency",
        "phonetic": "/kənˈkʌr.ən.si/",
        "wordType": "noun",
        "meaningEn": "the execution of multiple instruction sequences at the same time",
        "meaningVi": "tính đồng hành, xử lý đồng thời",
        "example": "Go handles concurrency exceptionally well.",
        "exampleVi": "Ngôn ngữ Go xử lý việc chạy đồng thời đặc biệt xuất sắc."
      },
      {
        "word": "containerization",
        "phonetic": "/kənˌteɪ.nər.aɪˈzeɪ.ʃən/",
        "wordType": "noun",
        "meaningEn": "a form of virtualization where applications run in isolated user spaces",
        "meaningVi": "công nghệ đóng gói container (Docker)",
        "example": "Docker popularized containerization in DevOps.",
        "exampleVi": "Docker đã phổ biến hóa công nghệ đóng gói container trong DevOps."
      },
      {
        "word": "repository",
        "phonetic": "/rɪˈpɒz.ɪ.tər.i/",
        "wordType": "noun",
        "meaningEn": "a storage location for software packages or Git project",
        "meaningVi": "kho lưu trữ mã nguồn",
        "example": "Create a pull request on the repository.",
        "exampleVi": "Hãy tạo một yêu cầu kéo mã nguồn (pull request) trên kho lưu trữ."
      },
      {
        "word": "deprecated",
        "phonetic": "/ˈdep.rə.keɪ.tɪd/",
        "wordType": "adj",
        "meaningEn": "software features that are tolerated but disapproved of and will be removed",
        "meaningVi": "bị phản đối/lỗi thời, sẽ bị loại bỏ",
        "example": "This function is deprecated in the new API version.",
        "exampleVi": "Hàm này đã lỗi thời và không khuyên dùng trong phiên bản API mới."
      }
    ,
      {
            "word": "algorithm",
            "phonetic": "/ˈæl.ɡə.rɪ.ðəm/",
            "wordType": "noun",
            "meaningEn": "a process or set of rules to be followed in calculations",
            "meaningVi": "thuật toán",
            "example": "The search engine uses a complex sorting algorithm.",
            "exampleVi": "Công cụ tìm kiếm sử dụng một thuật toán sắp xếp phức tạp."
      },
      {
            "word": "encryption",
            "phonetic": "/ɪnˈkrɪp.ʃən/",
            "wordType": "noun",
            "meaningEn": "the process of converting information into code to prevent unauthorized access",
            "meaningVi": "sự mã hóa",
            "example": "End-to-end encryption secures chat apps.",
            "exampleVi": "Mã hóa đầu cuối giúp bảo vệ các ứng dụng nhắn tin."
      },
      {
            "word": "framework",
            "phonetic": "/ˈfreɪm.wɜːk/",
            "wordType": "noun",
            "meaningEn": "a platform for developing software applications",
            "meaningVi": "khung phần mềm, framework",
            "example": "Vue is a flexible frontend framework.",
            "exampleVi": "Vue là một framework frontend linh hoạt."
      },
      {
            "word": "database",
            "phonetic": "/ˈdeɪ.tə.beɪs/",
            "wordType": "noun",
            "meaningEn": "a structured set of data stored in a computer",
            "meaningVi": "cơ sở dữ liệu",
            "example": "We query the database for user settings.",
            "exampleVi": "Chúng tôi truy vấn cơ sở dữ liệu để lấy các cấu hình người dùng."
      },
      {
            "word": "cybersecurity",
            "phonetic": "/ˌsaɪ.bə.sɪˈkjʊə.rə.ti/",
            "wordType": "noun",
            "meaningEn": "protection of computer systems from theft or damage",
            "meaningVi": "an ninh mạng",
            "example": "The company hired a team of cybersecurity experts.",
            "exampleVi": "Công ty đã thuê một đội ngũ chuyên gia an ninh mạng."
      },
      {
            "word": "repository",
            "phonetic": "/rɪˈpɒz.ɪ.tər.i/",
            "wordType": "noun",
            "meaningEn": "a storage location for software packages or Git history",
            "meaningVi": "kho lưu trữ code",
            "example": "Clone the repository to your desktop.",
            "exampleVi": "Hãy nhân bản (clone) kho lưu trữ về màn hình của bạn."
      },
      {
            "word": "scalability",
            "phonetic": "/ˌskeɪ.ləˈbɪl.ə.ti/",
            "wordType": "noun",
            "meaningEn": "the capability of a system to handle growth",
            "meaningVi": "khả năng mở rộng hệ thống",
            "example": "AWS helps with the scalability of web apps.",
            "exampleVi": "AWS hỗ trợ khả năng mở rộng của các ứng dụng web."
      },
      {
            "word": "bandwidth",
            "phonetic": "/ˈbænd.wɪtθ/",
            "wordType": "noun",
            "meaningEn": "the transmission capacity of a computer network connection",
            "meaningVi": "băng thông mạng",
            "example": "Downloading huge files consumes bandwidth.",
            "exampleVi": "Tải xuống các tập tin khổng lồ tiêu thụ nhiều băng thông."
      },
      {
            "word": "deployment",
            "phonetic": "/dɪˈplɔɪ.mənt/",
            "wordType": "noun",
            "meaningEn": "the process of making an application ready for use",
            "meaningVi": "sự triển khai phần mềm",
            "example": "The deployment to production went smoothly.",
            "exampleVi": "Sự triển khai lên môi trường thực tế (production) đã diễn ra suôn sẻ."
      },
      {
            "word": "concurrency",
            "phonetic": "/kənˈkʌr.ən.si/",
            "wordType": "noun",
            "meaningEn": "the ability of different parts of a program to be executed out-of-order",
            "meaningVi": "xử lý đồng thời, tính đồng hành",
            "example": "Concurrency improves application responsiveness.",
            "exampleVi": "Xử lý đồng thời cải thiện khả năng phản hồi của ứng dụng."
      }
    ]
  }
];

export const VOCABULARY_TOPICS: VocabTopic[] = [
  ...ORIGINAL_VOCABULARY_TOPICS,
  ...ADDITIONAL_VOCABULARY_TOPICS
];
