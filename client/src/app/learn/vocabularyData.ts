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

export const VOCABULARY_TOPICS: VocabTopic[] = [
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
    ]
  }
];
