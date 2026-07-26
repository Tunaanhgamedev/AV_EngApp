export interface AlphabetLetter {
  letter: string;
  name: string;
  phonic: string;
  phonicIpa: string;
  example: string;
  exampleVi: string;
}

export const ALPHABET: AlphabetLetter[] = [
  { letter: 'A', name: 'ay', phonicIpa: '/æ/', phonic: 'æ (như trong apple)', example: 'Apple', exampleVi: 'Quả táo' },
  { letter: 'B', name: 'bee', phonicIpa: '/b/', phonic: 'b (như trong boy)', example: 'Banana', exampleVi: 'Quả chuối' },
  { letter: 'C', name: 'see', phonicIpa: '/k/', phonic: 'k (như trong cat)', example: 'Cat', exampleVi: 'Con mèo' },
  { letter: 'D', name: 'dee', phonicIpa: '/d/', phonic: 'd (như trong dog)', example: 'Dog', exampleVi: 'Con chó' },
  { letter: 'E', name: 'ee', phonicIpa: '/e/', phonic: 'e (như trong egg)', example: 'Egg', exampleVi: 'Quả trứng' },
  { letter: 'F', name: 'ef', phonicIpa: '/f/', phonic: 'f (như trong fish)', example: 'Fish', exampleVi: 'Con cá' },
  { letter: 'G', name: 'jee', phonicIpa: '/ɡ/', phonic: 'g (như trong go)', example: 'Goat', exampleVi: 'Con dê' },
  { letter: 'H', name: 'aitch', phonicIpa: '/h/', phonic: 'h (như trong hat)', example: 'Hat', exampleVi: 'Cái mũ' },
  { letter: 'I', name: 'eye', phonicIpa: '/ɪ/', phonic: 'ɪ (như trong ink)', example: 'Igloo', exampleVi: 'Lều tuyết' },
  { letter: 'J', name: 'jay', phonicIpa: '/dʒ/', phonic: 'dʒ (như trong jam)', example: 'Jam', exampleVi: 'Mứt' },
  { letter: 'K', name: 'kay', phonicIpa: '/k/', phonic: 'k (như trong kite)', example: 'Kite', exampleVi: 'Cái diều' },
  { letter: 'L', name: 'el', phonicIpa: '/l/', phonic: 'l (như trong leaf)', example: 'Lion', exampleVi: 'Sư tử' },
  { letter: 'M', name: 'em', phonicIpa: '/m/', phonic: 'm (như trong moon)', example: 'Monkey', exampleVi: 'Con khỉ' },
  { letter: 'N', name: 'en', phonicIpa: '/n/', phonic: 'n (như trong nest)', example: 'Nest', exampleVi: 'Tổ chim' },
  { letter: 'O', name: 'oh', phonicIpa: '/ɒ/', phonic: 'ɒ (như trong orange)', example: 'Orange', exampleVi: 'Quả cam' },
  { letter: 'P', name: 'pee', phonicIpa: '/p/', phonic: 'p (như trong pen)', example: 'Pen', exampleVi: 'Bút viết' },
  { letter: 'Q', name: 'cue', phonicIpa: '/kw/', phonic: 'kw (như trong queen)', example: 'Queen', exampleVi: 'Nữ hoàng' },
  { letter: 'R', name: 'ar', phonicIpa: '/r/', phonic: 'r (như trong red)', example: 'Rabbit', exampleVi: 'Con thỏ' },
  { letter: 'S', name: 'es', phonicIpa: '/s/', phonic: 's (như trong sun)', example: 'Sun', exampleVi: 'Mặt trời' },
  { letter: 'T', name: 'tee', phonicIpa: '/t/', phonic: 't (như trong table)', example: 'Tiger', exampleVi: 'Con hổ' },
  { letter: 'U', name: 'you', phonicIpa: '/ʌ/', phonic: 'ʌ (như trong umbrella)', example: 'Umbrella', exampleVi: 'Cái ô' },
  { letter: 'V', name: 'vee', phonicIpa: '/v/', phonic: 'v (như trong violin)', example: 'Violin', exampleVi: 'Đàn vi-ô-lông' },
  { letter: 'W', name: 'double-you', phonicIpa: '/w/', phonic: 'w (như trong watch)', example: 'Window', exampleVi: 'Cửa sổ' },
  { letter: 'X', name: 'ex', phonicIpa: '/ks/', phonic: 'ks (như trong box)', example: 'Xylophone', exampleVi: 'Đàn mộc cầm' },
  { letter: 'Y', name: 'why', phonicIpa: '/j/', phonic: 'j (như trong yellow)', example: 'Yellow', exampleVi: 'Màu vàng' },
  { letter: 'Z', name: 'zed', phonicIpa: '/z/', phonic: 'z (như trong zebra)', example: 'Zebra', exampleVi: 'Ngựa vằn' },
];

export const VOWELS = [
  { ipa: 'iː', example: 'see', word: '/siː/', desc: 'Long "ee"', tts: 'ee', guide: 'Môi mở rộng sang hai bên như đang mỉm cười. Lưỡi nâng cao lên gần vòm họng. Phát âm âm "i" kéo dài.' },
  { ipa: 'ɪ', example: 'sit', word: '/sɪt/', desc: 'Short "i"', tts: 'ih', guide: 'Môi hơi mở rộng. Lưỡi đặt thấp hơn âm /iː/. Phát âm âm "i" ngắn, dứt khoát và thư giãn cơ miệng.' },
  { ipa: 'e', example: 'bed', word: '/bed/', desc: 'Short "e"', tts: 'eh', guide: 'Miệng mở rộng vừa phải theo chiều dọc (rộng hơn âm /ɪ/). Đầu lưỡi chạm nhẹ vào răng dưới. Phát âm âm "e" dứt khoát.' },
  { ipa: 'æ', example: 'cat', word: '/kæt/', desc: 'Flat "a"', tts: 'aa', guide: 'Mở to miệng hết cỡ theo cả chiều ngang và chiều dọc. Hạ lưỡi xuống thấp nhất chạm răng dưới. Phát âm lai giữa âm "a" và "e".' },
  { ipa: 'ɑː', example: 'car', word: '/kɑːr/', desc: 'Long "ah"', tts: 'ah', guide: 'Mở to miệng theo chiều dọc giống như lúc bác sĩ khám họng. Lưỡi hạ thấp xuống đáy miệng. Phát âm âm "a" kéo dài từ sâu trong cổ họng.' },
  { ipa: 'ɒ', example: 'hot', word: '/hɒt/', desc: 'Short "o"', tts: 'ah', guide: 'Mở miệng tròn vừa phải, môi hơi hướng ra ngoài. Lưỡi thụt nhẹ về phía sau. Phát âm âm "o" ngắn, dứt khoát.' },
  { ipa: 'ɔː', example: 'saw', word: '/sɔː/', desc: 'Long "aw"', tts: 'aw', guide: 'Tròn môi và khép môi lại một chút so với âm /ɒ/, môi hướng ra ngoài nhiều hơn. Lưỡi thụt về phía sau. Phát âm âm "o" kéo dài.' },
  { ipa: 'ʊ', example: 'put', word: '/pʊt/', desc: 'Short "oo"', tts: 'uu', guide: 'Môi tròn hơi đưa ra ngoài (giống như đang huýt sáo nhẹ). Lưỡi nâng cao về phía sau. Phát âm âm "u" ngắn, dứt khoát, cơ miệng thả lỏng.' },
  { ipa: 'uː', example: 'too', word: '/tuː/', desc: 'Long "oo"', tts: 'oo', guide: 'Chu môi tròn và nhỏ như đang huýt sáo. Lưỡi nâng cao về phía sau gần vòm họng. Phát âm âm "u" kéo dài từ khoang miệng.' },
  { ipa: 'ʌ', example: 'cup', word: '/kʌp/', desc: 'Short "uh"', tts: 'uh', guide: 'Miệng mở tự nhiên vừa phải. Lưỡi đặt ở giữa miệng hơi nâng lên. Phát âm âm "á" ngắn, dứt khoát, gần giống tiếng Việt.' },
  { ipa: 'ɜː', example: 'bird', word: '/bɜːd/', desc: 'Long "ur"', tts: 'ur', guide: 'Miệng mở tự nhiên. Lưỡi nâng lên độ cao trung bình, hơi cong lưỡi về phía sau. Phát âm âm "ơ" kéo dài và hơi uốn lưỡi.' },
  { ipa: 'ə', example: 'about', word: '/əˈbaʊt/', desc: 'Schwa', tts: 'uh', guide: 'Miệng mở tự nhiên và thả lỏng hoàn toàn tất cả các cơ. Lưỡi đặt ở giữa miệng. Phát âm âm "ơ" rất ngắn và nhẹ.' },
];

export const DIPHTHONGS = [
  { ipa: 'eɪ', example: 'day', word: '/deɪ/', desc: '"ay"', tts: 'ay', guide: 'Bắt đầu bằng âm /e/ sau đó trượt nhanh sang âm /ɪ/. Môi mở rộng dần sang hai bên.' },
  { ipa: 'aɪ', example: 'my', word: '/maɪ/', desc: '"eye"', tts: 'eye', guide: 'Bắt đầu bằng âm /a/ rộng miệng sau đó khép dần và trượt sang âm /ɪ/.' },
  { ipa: 'ɔɪ', example: 'boy', word: '/bɔɪ/', desc: '"oy"', tts: 'oy', guide: 'Bắt đầu bằng âm /ɔː/ tròn môi sau đó mở dần sang hai bên và trượt sang âm /ɪ/.' },
  { ipa: 'aʊ', example: 'now', word: '/naʊ/', desc: '"ow"', tts: 'ow', guide: 'Bắt đầu bằng âm /a/ sau đó tròn dần môi và trượt sang âm /ʊ/.' },
  { ipa: 'əʊ', example: 'go', word: '/ɡəʊ/', desc: '"oh"', tts: 'oh', guide: 'Bắt đầu bằng âm /ə/ thả lỏng sau đó tròn dần môi và trượt sang âm /ʊ/.' },
  { ipa: 'ɪə', example: 'here', word: '/hɪər/', desc: '"ear"', tts: 'ear', guide: 'Bắt đầu bằng âm /ɪ/ ngắn sau đó lướt nhẹ sang âm /ə/.' },
  { ipa: 'eə', example: 'hair', word: '/heər/', desc: '"air"', tts: 'air', guide: 'Bắt đầu bằng âm /e/ sau đó lướt nhẹ sang âm /ə/.' },
  { ipa: 'ʊə', example: 'tour', word: '/tʊər/', desc: '"oor"', tts: 'oor', guide: 'Bắt đầu bằng âm /ʊ/ sau đó lướt nhẹ sang âm /ə/.' },
];

export const CONSONANTS = [
  { ipa: 'p', example: 'pen', word: '/pen/', desc: 'Voiceless bilabial', tts: 'p', guide: 'Mím chặt hai môi để chặn luồng khí lại, sau đó bật mạnh hơi ra ngoài mà không rung dây thanh quản (âm vô thanh).' },
  { ipa: 'b', example: 'bad', word: '/bæd/', desc: 'Voiced bilabial', tts: 'b', guide: 'Mím chặt hai môi để chặn luồng khí lại, sau đó bật hơi ra ngoài đồng thời làm rung dây thanh quản ở cổ họng (âm hữu thanh).' },
  { ipa: 't', example: 'tea', word: '/tiː/', desc: 'Voiceless alveolar', tts: 't', guide: 'Đặt đầu lưỡi chạm vào phần lợi phía sau răng cửa trên, chặn khí lại, sau đó bật mạnh hơi ra (vô thanh).' },
  { ipa: 'd', example: 'did', word: '/dɪd/', desc: 'Voiced alveolar', tts: 'd', guide: 'Đặt đầu lưỡi chạm vào phần lợi phía sau răng cửa trên, chặn khí, sau đó bật hơi đồng thời làm rung dây thanh quản (hữu thanh).' },
  { ipa: 'k', example: 'cat', word: '/kæt/', desc: 'Voiceless velar', tts: 'k', guide: 'Nâng phần sau của lưỡi chạm vào vòm họng mềm để chặn khí, sau đó bật mạnh hơi ra ngoài (vô thanh).' },
  { ipa: 'ɡ', example: 'get', word: '/ɡet/', desc: 'Voiced velar', tts: 'g', guide: 'Nâng phần sau của lưỡi chạm vào vòm họng mềm để chặn khí, bật hơi đồng thời làm rung dây thanh quản (hữu thanh).' },
  { ipa: 'f', example: 'fall', word: '/fɔːl/', desc: 'Voiceless labiodental', tts: 'f', guide: 'Đặt răng cửa hàm trên chạm nhẹ vào môi dưới, đẩy luồng khí thoát ra qua khe hở giữa răng và môi (vô thanh).' },
  { ipa: 'v', example: 'van', word: '/væn/', desc: 'Voiced labiodental', tts: 'v', guide: 'Đặt răng cửa hàm trên chạm nhẹ vào môi dưới, đẩy luồng khí thoát ra ngoài đồng thời làm rung dây thanh quản (hữu thanh).' },
  { ipa: 'θ', example: 'thin', word: '/θɪn/', desc: 'Voiceless dental', tts: 'th', guide: 'Đặt đầu lưỡi ở giữa răng cửa trên và răng cửa dưới, đẩy nhẹ luồng khí thoát ra qua khe răng (vô thanh).' },
  { ipa: 'ð', example: 'this', word: '/ðɪs/', desc: 'Voiced dental', tts: 'th', guide: 'Đặt đầu lưỡi ở giữa răng cửa trên và răng cửa dưới, đẩy nhẹ luồng khí đồng thời làm rung dây thanh quản (hữu thanh).' },
  { ipa: 's', example: 'see', word: '/siː/', desc: 'Voiceless alveolar fricative', tts: 's', guide: 'Khép hai răng lại gần nhau, đặt đầu lưỡi gần lợi răng trên, đẩy luồng hơi thoát ra qua khe hẹp tạo tiếng xì nhẹ (vô thanh).' },
  { ipa: 'z', example: 'zoo', word: '/zuː/', desc: 'Voiced alveolar fricative', tts: 'z', guide: 'Khép hai răng lại gần nhau, đặt đầu lưỡi gần lợi răng trên, đẩy luồng hơi đồng thời làm rung dây thanh quản (hữu thanh).' },
  { ipa: 'ʃ', example: 'she', word: '/ʃiː/', desc: '"sh" sound', tts: 'sh', guide: 'Chu môi tròn hướng ra ngoài, mặt lưỡi nâng lên gần vòm họng, đẩy luồng hơi thoát ra tạo tiếng rít gió lớn (vô thanh).' },
  { ipa: 'ʒ', example: 'vision', word: '/ˈvɪʒ.ən/', desc: '"zh" sound', tts: 'zh', guide: 'Chu môi tròn hướng ra ngoài, mặt lưỡi nâng lên gần vòm họng, đẩy hơi đồng thời làm rung mạnh dây thanh quản (hữu thanh).' },
  { ipa: 'h', example: 'hat', word: '/hæt/', desc: 'Glottal fricative', tts: 'h', guide: 'Mở miệng tự nhiên, đẩy luồng hơi nhẹ từ sâu trong cổ họng ra ngoài như đang thở dài (vô thanh).' },
  { ipa: 'tʃ', example: 'chain', word: '/tʃeɪn/', desc: '"ch" sound', tts: 'ch', guide: 'Đặt đầu lưỡi chạm phần lợi sau răng trên để chặn khí, sau đó bật mạnh hơi ra ngoài đồng thời chu môi (vô thanh).' },
  { ipa: 'dʒ', example: 'jam', word: '/dʒæm/', desc: '"j" sound', tts: 'j', guide: 'Đặt đầu lưỡi chạm phần lợi sau răng trên để chặn khí, bật mạnh hơi đồng thời làm rung dây thanh quản và chu môi (hữu thanh).' },
  { ipa: 'm', example: 'man', word: '/mæn/', desc: 'Bilabial nasal', tts: 'm', guide: 'Mím chặt hai môi, đẩy toàn bộ luồng khí thoát ra ngoài bằng đường mũi đồng thời làm rung dây thanh quản.' },
  { ipa: 'n', example: 'no', word: '/nəʊ/', desc: 'Alveolar nasal', tts: 'n', guide: 'Đặt đầu lưỡi chạm lợi sau răng trên, chặn miệng lại và đẩy hơi thoát ra bằng đường mũi đồng thời làm rung dây thanh quản.' },
  { ipa: 'ŋ', example: 'sing', word: '/sɪŋ/', desc: 'Velar nasal "ng"', tts: 'ng', guide: 'Nâng phần sau của lưỡi chạm vòm họng mềm, chặn miệng lại và đẩy luồng hơi thoát ra bằng đường mũi (âm rung ở cổ họng).' },
  { ipa: 'l', example: 'leg', word: '/leɡ/', desc: 'Lateral approximant', tts: 'l', guide: 'Đặt đầu lưỡi chạm vào lợi sau răng cửa trên, cho luồng khí đi ra bằng hai bên rìa lưỡi đồng thời rung dây thanh quản.' },
  { ipa: 'r', example: 'red', word: '/red/', desc: 'Alveolar approximant', tts: 'r', guide: 'Hơi cong đầu lưỡi về phía sau vòm họng (không chạm vòm họng), đẩy hơi và làm rung dây thanh quản.' },
  { ipa: 'j', example: 'yes', word: '/jes/', desc: 'Palatal approximant', tts: 'y', guide: 'Mở miệng hẹp, nâng phần giữa lưỡi lên gần vòm họng cứng, đẩy hơi thoát ra đồng thời rung dây thanh quản.' },
  { ipa: 'w', example: 'wet', word: '/wet/', desc: 'Labial-velar approximant', tts: 'w', guide: 'Chu tròn và nhỏ môi như đang chuẩn bị phát âm âm "u", sau đó mở rộng nhanh môi và làm rung dây thanh quản.' },
];

export const STRESS_RULES = [
  { rule: "Đa số danh từ 2 âm tiết", pattern: "Nhấn âm tiết 1", examples: ["ˈta.ble", "ˈdoc.tor", "ˈstu.dent"] },
  { rule: "Đa số động từ 2 âm tiết", pattern: "Nhấn âm tiết 2", examples: ["beˈgin", "deˈcide", "reˈpeat"] },
  { rule: "Từ có đuôi -tion, -sion", pattern: "Nhấn âm trước đuôi", examples: ["eduˈca.tion", "deˈci.sion", "naˈtion"] },
  { rule: "Từ có đuôi -ic", pattern: "Nhấn âm trước đuôi", examples: ["sciˈen.tif.ic", "draˈmat.ic", "opˈti.mis.tic"] },
  { rule: "Từ có đuôi -ity, -ety", pattern: "Nhấn âm thứ 3 từ cuối", examples: ["uniˈver.si.ty", "comˈmu.ni.ty", "soˈci.e.ty"] },
];

export const NUMBERS_BASIC = [
  { num: '0', en: 'zero', vi: 'không' }, { num: '1', en: 'one', vi: 'một' }, { num: '2', en: 'two', vi: 'hai' },
  { num: '3', en: 'three', vi: 'ba' }, { num: '4', en: 'four', vi: 'bốn' }, { num: '5', en: 'five', vi: 'năm' },
  { num: '6', en: 'six', vi: 'sáu' }, { num: '7', en: 'seven', vi: 'bảy' }, { num: '8', en: 'eight', vi: 'tám' },
  { num: '9', en: 'nine', vi: 'chín' }, { num: '10', en: 'ten', vi: 'mười' }, { num: '11', en: 'eleven', vi: 'mười một' },
  { num: '12', en: 'twelve', vi: 'mười hai' }, { num: '13', en: 'thirteen', vi: 'mười ba' }, { num: '14', en: 'fourteen', vi: 'mười bốn' },
  { num: '15', en: 'fifteen', vi: 'mười lăm' }, { num: '16', en: 'sixteen', vi: 'mười sáu' }, { num: '17', en: 'seventeen', vi: 'mười bảy' },
  { num: '18', en: 'eighteen', vi: 'mười tám' }, { num: '19', en: 'nineteen', vi: 'mười chín' }, { num: '20', en: 'twenty', vi: 'hai mươi' },
];

export const NUMBERS_TENS = [
  { num: '10', en: 'ten', vi: 'mười' }, { num: '20', en: 'twenty', vi: 'hai mươi' }, { num: '30', en: 'thirty', vi: 'ba mươi' },
  { num: '40', en: 'forty', vi: 'bốn mươi' }, { num: '50', en: 'fifty', vi: 'năm mươi' }, { num: '60', en: 'sixty', vi: 'sáu mươi' },
  { num: '70', en: 'seventy', vi: 'bảy mươi' }, { num: '80', en: 'eighty', vi: 'tám mươi' }, { num: '90', en: 'ninety', vi: 'chín mươi' },
  { num: '100', en: 'one hundred', vi: 'một trăm' },
];

export const NUMBERS_BIG = [
  { num: '100', en: 'one hundred', ipa: '/wʌn ˈhʌn.drəd/', vi: '100', rule: 'hundred = trăm' },
  { num: '1,000', en: 'one thousand', ipa: '/wʌn ˈθaʊ.zənd/', vi: '1.000', rule: 'thousand = nghìn' },
  { num: '10,000', en: 'ten thousand', ipa: '/ten ˈθaʊ.zənd/', vi: '10.000', rule: '10 × thousand' },
  { num: '100,000', en: 'one hundred thousand', ipa: '/wʌn ˈhʌn.drəd ˈθaʊ.zənd/', vi: '100.000', rule: '100 × thousand' },
  { num: '1,000,000', en: 'one million', ipa: '/wʌn ˈmɪl.jən/', vi: '1 triệu', rule: 'million = triệu' },
  { num: '1,000,000,000', en: 'one billion', ipa: '/wʌn ˈbɪl.jən/', vi: '1 tỉ', rule: 'billion = tỉ' },
];

export const NUMBERS_COMBO = [
  { num: '25', en: 'twenty-five', rule: 'Hàng chục + dấu gạch ngang + hàng đơn vị' },
  { num: '99', en: 'ninety-nine', rule: 'ninety + nine' },
  { num: '101', en: 'one hundred and one', rule: 'hundred + "and" + đơn vị' },
  { num: '256', en: 'two hundred and fifty-six', rule: 'hundred + "and" + chục + đơn vị' },
  { num: '1,500', en: 'one thousand five hundred', rule: 'thousand + hundred (không cần "and")' },
  { num: '3,742', en: 'three thousand seven hundred and forty-two', rule: 'thousand + hundred + "and" + chục + đơn vị' },
  { num: '50,000', en: 'fifty thousand', rule: 'chục + thousand' },
  { num: '1,000,000', en: 'one million', rule: 'million = 1.000.000' },
  { num: '2,500,000', en: 'two million five hundred thousand', rule: 'million + hundred + thousand' },
];

export const ORDINALS = [
  { num: '1st', en: 'first', vi: 'thứ nhất' }, { num: '2nd', en: 'second', vi: 'thứ hai' },
  { num: '3rd', en: 'third', vi: 'thứ ba' }, { num: '4th', en: 'fourth', vi: 'thứ tư' },
  { num: '5th', en: 'fifth', vi: 'thứ năm' }, { num: '10th', en: 'tenth', vi: 'thứ mười' },
  { num: '11th', en: 'eleventh', vi: 'thứ mười một' }, { num: '12th', en: 'twelfth', vi: 'thứ mười hai' },
  { num: '20th', en: 'twentieth', vi: 'thứ hai mươi' }, { num: '21st', en: 'twenty-first', vi: 'thứ hai mốt' },
  { num: '100th', en: 'one hundredth', vi: 'thứ một trăm' },
];

export const ED_RULES = [
  { rule: 'Đọc /t/', condition: 'Sau phụ âm vô thanh: /p/, /k/, /f/, /s/, /ʃ/, /tʃ/', examples: [{ word: 'stopped', ipa: '/stɒpt/' }, { word: 'looked', ipa: '/lʊkt/' }, { word: 'washed', ipa: '/wɒʃt/' }] },
  { rule: 'Đọc /d/', condition: 'Sau nguyên âm hoặc phụ âm hữu thanh: /b/, /g/, /v/, /z/, /m/, /n/', examples: [{ word: 'played', ipa: '/pleɪd/' }, { word: 'lived', ipa: '/lɪvd/' }, { word: 'called', ipa: '/kɔːld/' }] },
  { rule: 'Đọc /ɪd/', condition: 'Sau âm /t/ hoặc /d/', examples: [{ word: 'wanted', ipa: '/ˈwɒn.tɪd/' }, { word: 'needed', ipa: '/ˈniː.dɪd/' }, { word: 'started', ipa: '/ˈstɑːr.tɪd/' }] },
];

export const S_RULES = [
  { rule: 'Đọc /s/', condition: 'Sau phụ âm vô thanh: /p/, /t/, /k/, /f/, /θ/', examples: [{ word: 'cups', ipa: '/kʌps/' }, { word: 'cats', ipa: '/kæts/' }, { word: 'books', ipa: '/bʊks/' }] },
  { rule: 'Đọc /z/', condition: 'Sau nguyên âm hoặc phụ âm hữu thanh: /b/, /d/, /g/, /v/, /m/, /n/, /l/', examples: [{ word: 'dogs', ipa: '/dɒɡz/' }, { word: 'plays', ipa: '/pleɪz/' }, { word: 'trees', ipa: '/triːz/' }] },
  { rule: 'Đọc /ɪz/', condition: 'Sau âm xì: /s/, /z/, /ʃ/, /ʒ/, /tʃ/, /dʒ/', examples: [{ word: 'buses', ipa: '/ˈbʌs.ɪz/' }, { word: 'watches', ipa: '/ˈwɒtʃ.ɪz/' }, { word: 'bridges', ipa: '/ˈbrɪdʒ.ɪz/' }] },
];

export const PLURAL_RULES = [
  { rule: 'Thông thường (Thêm -s)', condition: 'Hầu hết danh từ đếm được số ít', examples: [{ word: 'book', plural: 'books', ipa: '/bʊks/', vi: 'sách' }, { word: 'cup', plural: 'cups', ipa: '/kʌps/', vi: 'cốc' }, { word: 'pen', plural: 'pens', ipa: '/penz/', vi: 'bút' }, { word: 'cat', plural: 'cats', ipa: '/kæts/', vi: 'con mèo' }, { word: 'dog', plural: 'dogs', ipa: '/dɒɡz/', vi: 'con chó' }] },
  { rule: 'Đuôi đặc biệt (Thêm -es)', condition: 'Danh từ kết thúc bằng -s, -ss, -sh, -ch, -x, -z', examples: [{ word: 'bus', plural: 'buses', ipa: '/ˈbʌs.ɪz/', vi: 'xe buýt' }, { word: 'watch', plural: 'watches', ipa: '/ˈwɒtʃ.ɪz/', vi: 'đồng hồ' }, { word: 'box', plural: 'boxes', ipa: '/ˈbɒk.sɪz/', vi: 'hộp' }, { word: 'dish', plural: 'dishes', ipa: '/ˈdɪʃ.ɪz/', vi: 'cái đĩa' }, { word: 'glass', plural: 'glasses', ipa: '/ˈɡlɑːs.ɪz/', vi: 'cái ly' }] },
  { rule: 'Đuôi -y (sau phụ âm)', condition: 'Đổi -y thành -i + es', examples: [{ word: 'baby', plural: 'babies', ipa: '/ˈbeɪ.biz/', vi: 'trẻ sơ sinh' }, { word: 'city', plural: 'cities', ipa: '/ˈsɪt.iz/', vi: 'thành phố' }, { word: 'story', plural: 'stories', ipa: '/ˈstɔːr.iz/', vi: 'câu chuyện' }, { word: 'family', plural: 'families', ipa: '/ˈfæm.əl.iz/', vi: 'gia đình' }] },
  { rule: 'Đuôi -y (sau nguyên âm)', condition: 'Giữ nguyên -y + s', examples: [{ word: 'boy', plural: 'boys', ipa: '/bɔɪz/', vi: 'cậu bé' }, { word: 'key', plural: 'keys', ipa: '/kiːz/', vi: 'chìa khóa' }, { word: 'day', plural: 'days', ipa: '/deɪz/', vi: 'ngày' }, { word: 'toy', plural: 'toys', ipa: '/tɔɪz/', vi: 'đồ chơi' }] },
  { rule: 'Đuôi -f/-fe → -ves', condition: 'Đổi -f/-fe thành -ves', examples: [{ word: 'knife', plural: 'knives', ipa: '/naɪvz/', vi: 'con dao' }, { word: 'leaf', plural: 'leaves', ipa: '/liːvz/', vi: 'chiếc lá' }, { word: 'wife', plural: 'wives', ipa: '/waɪvz/', vi: 'vợ' }, { word: 'wolf', plural: 'wolves', ipa: '/wʊlvz/', vi: 'con sói' }] },
  { rule: 'Đuôi -o (thêm -es)', condition: 'Một số danh từ kết thúc bằng phụ âm + o', examples: [{ word: 'tomato', plural: 'tomatoes', ipa: '/təˈmɑː.təʊz/', vi: 'cà chua' }, { word: 'potato', plural: 'potatoes', ipa: '/pəˈteɪ.təʊz/', vi: 'khoai tây' }, { word: 'hero', plural: 'heroes', ipa: '/ˈhɪə.rəʊz/', vi: 'anh hùng' }] },
  { rule: 'Đuôi -o (chỉ thêm -s)', condition: 'Ngoại lệ: từ mượn, âm nhạc, viết tắt', examples: [{ word: 'photo', plural: 'photos', ipa: '/ˈfəʊ.təʊz/', vi: 'ảnh' }, { word: 'piano', plural: 'pianos', ipa: '/piˈæn.əʊz/', vi: 'đàn piano' }, { word: 'video', plural: 'videos', ipa: '/ˈvɪd.i.əʊz/', vi: 'video' }, { word: 'radio', plural: 'radios', ipa: '/ˈreɪ.di.əʊz/', vi: 'đài' }] },
  { rule: 'Ngoại lệ đuôi -f (chỉ +s)', condition: 'Một số từ đuôi -f KHÔNG đổi thành -ves', examples: [{ word: 'roof', plural: 'roofs', ipa: '/ruːfs/', vi: 'mái nhà' }, { word: 'chef', plural: 'chefs', ipa: '/ʃefs/', vi: 'đầu bếp' }, { word: 'cliff', plural: 'cliffs', ipa: '/klɪfs/', vi: 'vách đá' }, { word: 'belief', plural: 'beliefs', ipa: '/bɪˈliːfs/', vi: 'niềm tin' }] }
];

export const IRREGULAR_NOUNS = [
  { singular: 'man', plural: 'men', ipaSingular: '/mæn/', ipaPlural: '/men/', vi: 'đàn ông' },
  { singular: 'woman', plural: 'women', ipaSingular: '/ˈwʊm.ən/', ipaPlural: '/ˈwɪm.ɪn/', vi: 'phụ nữ' },
  { singular: 'child', plural: 'children', ipaSingular: '/tʃaɪld/', ipaPlural: '/ˈtʃɪl.drən/', vi: 'trẻ em' },
  { singular: 'tooth', plural: 'teeth', ipaSingular: '/tuːθ/', ipaPlural: '/tiːθ/', vi: 'răng' },
  { singular: 'foot', plural: 'feet', ipaSingular: '/fʊt/', ipaPlural: '/fiːt/', vi: 'bàn chân' },
  { singular: 'mouse', plural: 'mice', ipaSingular: '/maʊs/', ipaPlural: '/maɪs/', vi: 'con chuột' },
  { singular: 'person', plural: 'people', ipaSingular: '/ˈpɜː.sən/', ipaPlural: '/ˈpiː.pl̩/', vi: 'người' },
  { singular: 'goose', plural: 'geese', ipaSingular: '/ɡuːs/', ipaPlural: '/ɡiːs/', vi: 'con ngỗng' },
  { singular: 'ox', plural: 'oxen', ipaSingular: '/ɒks/', ipaPlural: '/ˈɒk.sən/', vi: 'con bò đực' },
  { singular: 'cactus', plural: 'cacti', ipaSingular: '/ˈkæk.təs/', ipaPlural: '/ˈkæk.taɪ/', vi: 'cây xương rồng' },
  { singular: 'crisis', plural: 'crises', ipaSingular: '/ˈkraɪ.sɪs/', ipaPlural: '/ˈkraɪ.siːz/', vi: 'khủng hoảng' },
  { singular: 'phenomenon', plural: 'phenomena', ipaSingular: '/fɪˈnɒm.ɪ.nən/', ipaPlural: '/fɪˈnɒm.ɪ.nə/', vi: 'hiện tượng' },
  { singular: 'sheep', plural: 'sheep', ipaSingular: '/ʃiːp/', ipaPlural: '/ʃiːp/', vi: 'con cừu' },
  { singular: 'fish', plural: 'fish', ipaSingular: '/fɪʃ/', ipaPlural: '/fɪʃ/', vi: 'con cá' },
  { singular: 'deer', plural: 'deer', ipaSingular: '/dɪər/', ipaPlural: '/dɪər/', vi: 'con hươu' },
  { singular: 'aircraft', plural: 'aircraft', ipaSingular: '/ˈeə.krɑːft/', ipaPlural: '/ˈeə.krɑːft/', vi: 'máy bay' },
  { singular: 'species', plural: 'species', ipaSingular: '/ˈspiː.ʃiːz/', ipaPlural: '/ˈspiː.ʃiːz/', vi: 'loài' },
  { singular: 'series', plural: 'series', ipaSingular: '/ˈsɪə.riːz/', ipaPlural: '/ˈsɪə.riːz/', vi: 'chuỗi, bộ' }
];

export const UNCOUNTABLE_NOUNS = [
  // Chất lỏng (Liquids)
  { term: 'water', ipa: '/ˈwɔː.tər/', vi: 'nước', measure: 'a glass of water', measureVi: 'một ly nước', category: 'liquid' },
  { term: 'milk', ipa: '/mɪlk/', vi: 'sữa', measure: 'a carton of milk', measureVi: 'một hộp sữa', category: 'liquid' },
  { term: 'coffee', ipa: '/ˈkɒf.i/', vi: 'cà phê', measure: 'a cup of coffee', measureVi: 'một tách cà phê', category: 'liquid' },
  { term: 'tea', ipa: '/tiː/', vi: 'trà', measure: 'a cup of tea', measureVi: 'một tách trà', category: 'liquid' },
  { term: 'juice', ipa: '/dʒuːs/', vi: 'nước ép', measure: 'a glass of juice', measureVi: 'một ly nước ép', category: 'liquid' },
  { term: 'oil', ipa: '/ɔɪl/', vi: 'dầu', measure: 'a bottle of oil', measureVi: 'một chai dầu', category: 'liquid' },
  { term: 'soup', ipa: '/suːp/', vi: 'canh/súp', measure: 'a bowl of soup', measureVi: 'một bát canh', category: 'liquid' },
  // Chất hạt / Bột (Grains & Powders)
  { term: 'rice', ipa: '/raɪs/', vi: 'gạo/cơm', measure: 'a bag of rice', measureVi: 'một bao gạo', category: 'grain' },
  { term: 'sugar', ipa: '/ˈʃʊɡ.ər/', vi: 'đường', measure: 'a spoonful of sugar', measureVi: 'một thìa đường', category: 'grain' },
  { term: 'salt', ipa: '/sɔːlt/', vi: 'muối', measure: 'a pinch of salt', measureVi: 'một nhúm muối', category: 'grain' },
  { term: 'flour', ipa: '/flaʊər/', vi: 'bột mì', measure: 'a bag of flour', measureVi: 'một bao bột mì', category: 'grain' },
  { term: 'sand', ipa: '/sænd/', vi: 'cát', measure: 'a grain of sand', measureVi: 'một hạt cát', category: 'grain' },
  { term: 'pepper', ipa: '/ˈpep.ər/', vi: 'hạt tiêu', measure: 'a pinch of pepper', measureVi: 'một nhúm tiêu', category: 'grain' },
  // Thịt & Thực phẩm (Meats & Food)
  { term: 'meat', ipa: '/miːt/', vi: 'thịt', measure: 'a piece of meat', measureVi: 'một miếng thịt', category: 'meat' },
  { term: 'beef', ipa: '/biːf/', vi: 'thịt bò', measure: 'a slice of beef', measureVi: 'một lát thịt bò', category: 'meat' },
  { term: 'pork', ipa: '/pɔːk/', vi: 'thịt heo', measure: 'a piece of pork', measureVi: 'một miếng thịt heo', category: 'meat' },
  { term: 'chicken', ipa: '/ˈtʃɪk.ɪn/', vi: 'thịt gà', measure: 'a piece of chicken', measureVi: 'một miếng gà', category: 'meat' },
  { term: 'bread', ipa: '/bred/', vi: 'bánh mì', measure: 'a slice of bread', measureVi: 'một lát bánh mì', category: 'meat' },
  { term: 'cheese', ipa: '/tʃiːz/', vi: 'phô mai', measure: 'a slice of cheese', measureVi: 'một lát phô mai', category: 'meat' },
  { term: 'butter', ipa: '/ˈbʌt.ər/', vi: 'bơ', measure: 'a stick of butter', measureVi: 'một thanh bơ', category: 'meat' },
  // Khái niệm trừu tượng (Abstract)
  { term: 'information', ipa: '/ˌɪn.fəˈmeɪ.ʃən/', vi: 'thông tin', measure: 'a piece of information', measureVi: 'một mẩu thông tin', category: 'abstract' },
  { term: 'advice', ipa: '/ədˈvaɪs/', vi: 'lời khuyên', measure: 'a piece of advice', measureVi: 'một lời khuyên', category: 'abstract' },
  { term: 'knowledge', ipa: '/ˈnɒl.ɪdʒ/', vi: 'kiến thức', measure: 'a piece of knowledge', measureVi: 'một phần kiến thức', category: 'abstract' },
  { term: 'news', ipa: '/njuːz/', vi: 'tin tức', measure: 'a piece of news', measureVi: 'một mẩu tin', category: 'abstract' },
  { term: 'homework', ipa: '/ˈhəʊm.wɜːk/', vi: 'bài tập', measure: 'a piece of homework', measureVi: 'một bài tập', category: 'abstract' },
  { term: 'music', ipa: '/ˈmjuː.zɪk/', vi: 'âm nhạc', measure: 'a piece of music', measureVi: 'một bản nhạc', category: 'abstract' },
  { term: 'research', ipa: '/rɪˈsɜːtʃ/', vi: 'nghiên cứu', measure: 'a piece of research', measureVi: 'một nghiên cứu', category: 'abstract' },
  // Đồ vật & Vật liệu (Materials & Objects)
  { term: 'furniture', ipa: '/ˈfɜː.nɪ.tʃər/', vi: 'đồ nội thất', measure: 'a piece of furniture', measureVi: 'một món đồ nội thất', category: 'material' },
  { term: 'luggage', ipa: '/ˈlʌɡ.ɪdʒ/', vi: 'hành lý', measure: 'a piece of luggage', measureVi: 'một kiện hành lý', category: 'material' },
  { term: 'equipment', ipa: '/ɪˈkwɪp.mənt/', vi: 'thiết bị', measure: 'a piece of equipment', measureVi: 'một thiết bị', category: 'material' },
  { term: 'money', ipa: '/ˈmʌn.i/', vi: 'tiền', measure: 'a sum of money', measureVi: 'một khoản tiền', category: 'material' },
  { term: 'gold', ipa: '/ɡəʊld/', vi: 'vàng', measure: 'a bar of gold', measureVi: 'một thỏi vàng', category: 'material' },
  { term: 'wood', ipa: '/wʊd/', vi: 'gỗ', measure: 'a piece of wood', measureVi: 'một miếng gỗ', category: 'material' },
  { term: 'paper', ipa: '/ˈpeɪ.pər/', vi: 'giấy', measure: 'a sheet of paper', measureVi: 'một tờ giấy', category: 'material' },
  // Hiện tượng tự nhiên & Khác (Nature & Others)
  { term: 'weather', ipa: '/ˈweð.ər/', vi: 'thời tiết', measure: 'a spell of weather', measureVi: 'một đợt thời tiết', category: 'other' },
  { term: 'traffic', ipa: '/ˈtræf.ɪk/', vi: 'giao thông', measure: 'a lot of traffic', measureVi: 'rất đông xe cộ', category: 'other' },
  { term: 'electricity', ipa: '/ɪˌlek.ˈtrɪs.ə.ti/', vi: 'điện', measure: 'a unit of electricity', measureVi: 'một đơn vị điện', category: 'other' },
  { term: 'air', ipa: '/eər/', vi: 'không khí', measure: 'a breath of air', measureVi: 'một hơi thở', category: 'other' },
];

export const ARTICLE_RULES = [
  { rule: 'Dùng "a"', condition: 'Trước từ bắt đầu bằng phụ âm (phát âm phụ âm)', examples: [{ word: 'a cat', ipa: '/ə kæt/' }, { word: 'a dog', ipa: '/ə dɒɡ/' }, { word: 'a house', ipa: '/ə haʊs/' }] },
  { rule: 'Dùng "an"', condition: 'Trước từ bắt đầu bằng nguyên âm (phát âm nguyên âm)', examples: [{ word: 'an apple', ipa: '/ən ˈæp.l̩/' }, { word: 'an egg', ipa: '/ən eɡ/' }, { word: 'an orange', ipa: '/ən ˈɒr.ɪndʒ/' }, { word: 'an umbrella', ipa: '/ən ʌmˈbrel.ə/' }, { word: 'an idea', ipa: '/ən aɪˈdɪə/' }] },
  { rule: 'Ngoại lệ "h" câm (dùng an)', condition: 'Bắt đầu bằng chữ h nhưng âm h câm (phát âm nguyên âm tiếp theo)', examples: [{ word: 'an hour', ipa: '/ən ˈaʊ.ər/' }, { word: 'an honor', ipa: '/ən ˈɒn.ər/' }, { word: 'an honest man', ipa: '/ən ˈɒn.ɪst mæn/' }, { word: 'an heir', ipa: '/ən eər/' }] },
  { rule: 'Ngoại lệ chữ u/e phát âm /j/ (dùng a)', condition: 'Bắt đầu bằng nguyên âm chữ cái nhưng phát âm phụ âm /j/ hoặc /w/', examples: [{ word: 'a university', ipa: '/ə ˌjuː.nɪˈvɜː.sə.ti/' }, { word: 'a European', ipa: '/ə ˌjʊə.rəˈpiː.ən/' }, { word: 'a one-way street', ipa: '/ə wʌn weɪ striːt/' }, { word: 'a useful tool', ipa: '/ə ˈjuːs.fəl tuːl/' }, { word: 'a uniform', ipa: '/ə ˈjuː.nɪ.fɔːm/' }] },
  { rule: 'Viết tắt bắt đầu bằng nguyên âm (dùng an)', condition: 'Chữ viết tắt mà tên chữ cái đầu phát âm nguyên âm: F(/ef/), H(/eɪtʃ/), L(/el/), M(/em/), N(/en/), R(/ɑːr/), S(/es/), X(/eks/)', examples: [{ word: 'an FBI agent', ipa: '/ən ef.biː.aɪ/' }, { word: 'an HTML file', ipa: '/ən eɪtʃ.tiː.em.el/' }, { word: 'an SMS', ipa: '/ən es.em.es/' }] }
];

export const DAYS_OF_WEEK = [
  { day: 'Monday', abbreviation: 'Mon', ipa: '/ˈmʌn.deɪ/', vi: 'Thứ Hai' },
  { day: 'Tuesday', abbreviation: 'Tue', ipa: '/ˈtjuːz.deɪ/', vi: 'Thứ Ba' },
  { day: 'Wednesday', abbreviation: 'Wed', ipa: '/ˈwenz.deɪ/', vi: 'Thứ Tư' },
  { day: 'Thursday', abbreviation: 'Thu', ipa: '/ˈθɜːz.deɪ/', vi: 'Thứ Năm' },
  { day: 'Friday', abbreviation: 'Fri', ipa: '/ˈfraɪ.deɪ/', vi: 'Thứ Sáu' },
  { day: 'Saturday', abbreviation: 'Sat', ipa: '/ˈsæt.ə.deɪ/', vi: 'Thứ Bảy' },
  { day: 'Sunday', abbreviation: 'Sun', ipa: '/ˈsʌn.deɪ/', vi: 'Chủ Nhật' },
];

export const MONTHS_OF_YEAR = [
  { month: 'January', abbreviation: 'Jan', ipa: '/ˈdʒæn.ju.ə.ri/', vi: 'Tháng Một' },
  { month: 'February', abbreviation: 'Feb', ipa: '/ˈfeb.ru.ə.ri/', vi: 'Tháng Hai' },
  { month: 'March', abbreviation: 'Mar', ipa: '/mɑːtʃ/', vi: 'Tháng Ba' },
  { month: 'April', abbreviation: 'Apr', ipa: '/ˈeɪ.prəl/', vi: 'Tháng Tư' },
  { month: 'May', abbreviation: 'May', ipa: '/meɪ/', vi: 'Tháng Năm' },
  { month: 'June', abbreviation: 'Jun', ipa: '/dʒuːn/', vi: 'Tháng Sáu' },
  { month: 'July', abbreviation: 'Jul', ipa: '/dʒuˈlaɪ/', vi: 'Tháng Bảy' },
  { month: 'August', abbreviation: 'Aug', ipa: '/ɔːˈɡʌst/', vi: 'Tháng Tám' },
  { month: 'September', abbreviation: 'Sep', ipa: '/sepˈtem.bər/', vi: 'Tháng Chín' },
  { month: 'October', abbreviation: 'Oct', ipa: '/ɒkˈtəʊ.bər/', vi: 'Tháng Mười' },
  { month: 'November', abbreviation: 'Nov', ipa: '/nəʊˈvem.bər/', vi: 'Tháng Mười Một' },
  { month: 'December', abbreviation: 'Dec', ipa: '/dɪˈsem.bər/', vi: 'Tháng Mười Hai' },
];

export const YEAR_RULES = [
  { example: '1998', read: 'nineteen ninety-eight', ipa: '/ˌnaɪn.tiːn ˌnaɪn.tiˈeɪt/', rule: 'Đọc tách đôi thành 19 và 98' },
  { example: '2026', read: 'twenty twenty-six', ipa: '/ˌtwen.ti ˌtwen.tiˈsɪks/', rule: 'Đọc tách đôi thành 20 và 26 (phổ biến nhất)' },
  { example: '2005', read: 'two thousand and five', ipa: '/tuː ˈθaʊ.zənd ənd faɪv/', rule: 'Đọc cả nghìn + "and" + đơn vị (năm 2000-2009)' },
  { example: '1900', read: 'nineteen hundred', ipa: '/ˌnaɪn.tiːn ˈhʌn.drəd/', rule: 'Năm tròn trăm: đọc số trăm đầu tiên + hundred' },
  { example: '2000', read: 'two thousand', ipa: '/tuː ˈθaʊ.zənd/', rule: 'Đọc cả số nghìn' },
  { example: '1808', read: 'eighteen oh-eight', ipa: '/ˌeɪ.tiːn oʊ ˈeɪt/', rule: 'Số hàng chục là 0: đọc oh + số hàng đơn vị' }
];

export const RELATIVE_TIME_WORDS = [
  { term: 'today', ipa: '/təˈdeɪ/', vi: 'hôm nay', category: 'Ngày' },
  { term: 'yesterday', ipa: '/ˈjes.tə.deɪ/', vi: 'hôm qua', category: 'Ngày' },
  { term: 'tomorrow', ipa: '/təˈmɒr.əʊ/', vi: 'ngày mai', category: 'Ngày' },
  { term: 'the day before yesterday', ipa: '/ðə deɪ bɪˌfɔː ˈjes.tə.deɪ/', vi: 'hôm kia', category: 'Ngày' },
  { term: 'the day after tomorrow', ipa: '/ðə deɪ ˌɑːf.tə təˈmɒr.əʊ/', vi: 'ngày kia / ngày mốt', category: 'Ngày' },
  { term: 'tonight', ipa: '/təˈnaɪt/', vi: 'tối nay', category: 'Ngày' },
  { term: 'weekend', ipa: '/ˈwiːk.end/', vi: 'cuối tuần', category: 'Tuần' },
  { term: 'weekday', ipa: '/ˈwiːk.deɪ/', vi: 'ngày thường (trong tuần)', category: 'Tuần' },
  { term: 'this week', ipa: '/ðɪs wiːk/', vi: 'tuần này', category: 'Tuần' },
  { term: 'last week', ipa: '/lɑːst wiːk/', vi: 'tuần trước', category: 'Tuần' },
  { term: 'next week', ipa: '/nekst wiːk/', vi: 'tuần sau', category: 'Tuần' },
  { term: 'this month', ipa: '/ðɪs mʌnθ/', vi: 'tháng này', category: 'Tháng' },
  { term: 'last month', ipa: '/lɑːst mʌnθ/', vi: 'tháng trước', category: 'Tháng' },
  { term: 'next month', ipa: '/nekst mʌnθ/', vi: 'tháng sau', category: 'Tháng' },
  { term: 'this year', ipa: '/ðɪs jɪər/', vi: 'năm nay', category: 'Năm' },
  { term: 'last year', ipa: '/lɑːst jɪər/', vi: 'năm ngoái', category: 'Năm' },
  { term: 'next year', ipa: '/nekst jɪər/', vi: 'sang năm / năm sau', category: 'Năm' },
];

export const TOPIC_LESSONS = [
  {
    id: 'greetings',
    title: 'Chào hỏi & Hỏi thăm (Greetings & Inquiries)',
    desc: 'Các mẫu câu chào hỏi, hỏi thăm sức khỏe, công việc và cách phản hồi tự nhiên.',
    phrases: [
      { text: 'How is it going?', ipa: '/haʊ z ɪt ˈɡəʊ.ɪŋ/', vi: 'Dạo này thế nào rồi?' },
      { text: 'Long time no see', ipa: '/lɒŋ taɪm nəʊ siː/', vi: 'Lâu rồi không gặp' },
      { text: 'It is a pleasure to meet you', ipa: '/ɪt ɪz ə ˈpleʒ.ər tu miːt juː/', vi: 'Rất hân hạnh được gặp bạn' },
      { text: 'Have a nice day', ipa: '/hæv ə naɪs deɪ/', vi: 'Chúc một ngày tốt lành' },
      { text: 'How have you been lately?', ipa: '/haʊ hæv juː biːn ˈleɪt.li/', vi: 'Dạo này bạn khỏe không?' },
      { text: 'I am doing well, thank you', ipa: '/aɪ æm ˈduː.ɪŋ wel θæŋk juː/', vi: 'Tôi khỏe, cảm ơn bạn' },
      { text: 'Good morning, how can I help you?', ipa: '/ɡʊd ˈmɔː.nɪŋ haʊ kæn aɪ help juː/', vi: 'Chào buổi sáng, tôi có thể giúp gì cho bạn?' },
      { text: 'It was nice talking to you', ipa: '/ɪt wɒz naɪs ˈtɔː.kɪŋ tu juː/', vi: 'Rất vui được trò chuyện với bạn' }
    ]
  },
  {
    id: 'declining',
    title: 'Từ chối lịch sự (Polite Declining)',
    desc: 'Cách từ chối các lời mời, đề nghị hoặc yêu cầu một cách lịch sự, khéo léo.',
    phrases: [
      { text: 'I am afraid I cannot make it', ipa: '/aɪ æm əˈfreɪd aɪ ˈkæn.ɒt meɪk ɪt/', vi: 'Tôi e là tôi không tham gia được' },
      { text: 'I will have to pass this time', ipa: '/aɪ wɪl hæv tu pɑːs ðɪs taɪm/', vi: 'Lần này tôi xin phép bỏ qua vậy' },
      { text: 'Thank you, but I have other plans', ipa: '/θæŋk juː bʌt aɪ hæv ˈʌð.ər plænz/', vi: 'Cảm ơn, nhưng tôi có kế hoạch khác rồi' },
      { text: 'I wish I could, but I am busy', ipa: '/aɪ wɪʃ aɪ kʊd bʌt aɪ æm ˈbɪz.i/', vi: 'Tôi ước tôi có thể, nhưng tôi bận mất rồi' },
      { text: 'I would love to, but I have a deadline', ipa: '/aɪ wʊd lʌv tuː bʌt aɪ hæv ə ˈded.laɪn/', vi: 'Tôi rất muốn, nhưng tôi có hạn chót công việc' },
      { text: 'Unfortunately, I cannot accept this offer', ipa: '/ʌnˈfɔː.tʃən.ət.li aɪ ˈkæn.ɒt əkˈsept ðɪs ˈɒf.ər/', vi: 'Rất tiếc, tôi không thể nhận lời đề nghị này' },
      { text: 'Maybe some other time', ipa: '/ˈmeɪ.bi sʌm ˈʌð.ər taɪm/', vi: 'Để khi khác nhé' },
      { text: 'Thank you for asking, but I cannot', ipa: '/θæŋk juː fɔːr ˈɑːs.kɪŋ bʌt aɪ ˈkæn.ɒt/', vi: 'Cảm ơn bạn đã hỏi, nhưng tôi không thể' }
    ]
  },
  {
    id: 'appointments',
    title: 'Hẹn gặp & Sắp xếp lịch (Appointments)',
    desc: 'Hỏi về thời gian rảnh, lên lịch hẹn, xin phép trễ hoặc dời cuộc hẹn.',
    phrases: [
      { text: 'Are you free this weekend?', ipa: '/ɑːr juː friː ðɪs ˌwiːk.ˈend/', vi: 'Cuối tuần này bạn rảnh không?' },
      { text: 'Let us meet at seven PM', ipa: '/let ʌs miːt æt ˈsev.ən piː em/', vi: 'Chúng ta gặp nhau lúc 7h tối nhé' },
      { text: 'Can we reschedule our meeting?', ipa: '/kæn wiː ˌriːˈʃed.juːl ˈaʊ.ər ˈmiː.tɪŋ/', vi: 'Chúng ta có thể dời lịch họp được không?' },
      { text: 'I look forward to seeing you', ipa: '/aɪ lʊk ˈfɔː.wəd tu ˈsiː.ɪŋ juː/', vi: 'Tôi rất mong chờ được gặp bạn' },
      { text: 'Does Monday work for you?', ipa: '/dʌz ˈmʌn.deɪ wɜːk fɔːr juː/', vi: 'Thứ Hai có tiện cho bạn không?' },
      { text: 'I am sorry, I am running late', ipa: '/aɪ æm ˈsɒr.i aɪ æm ˈrʌn.ɪŋ leɪt/', vi: 'Tôi xin lỗi, tôi đang bị trễ' },
      { text: 'Could we push it back to tomorrow?', ipa: '/kʊd wiː pʊʃ ɪt bæk tu təˈmɒr.əʊ/', vi: 'Chúng ta dời sang ngày mai được không?' },
      { text: 'Please confirm if you can make it', ipa: '/pliːz kənˈfɜːm ɪf juː kæn meɪk ɪt/', vi: 'Vui lòng xác nhận nếu bạn có thể tham gia' }
    ]
  },
  {
    id: 'hotel',
    title: 'Khách sạn & Du lịch (Hotel & Travel)',
    desc: 'Nhận phòng, yêu cầu dịch vụ, giải quyết các sự cố phát sinh ở khách sạn.',
    phrases: [
      { text: 'I would like to check in', ipa: '/aɪ wʊd laɪk tu tʃek ɪn/', vi: 'Tôi muốn làm thủ tục nhận phòng' },
      { text: 'Is breakfast included?', ipa: '/iːz ˈbrek.fəst ɪnˈkluː.dɪd/', vi: 'Có bao gồm bữa sáng không?' },
      { text: 'Could I have extra towels?', ipa: '/kʊd aɪ hæv ˈek.strə ˈtaʊ.əlz/', vi: 'Cho tôi xin thêm khăn tắm được không?' },
      { text: 'What time is check out?', ipa: '/wɒt taɪm ɪz tʃek aʊt/', vi: 'Mấy giờ thì làm thủ tục trả phòng?' },
      { text: 'My key card does not work', ipa: '/maɪ kiː kɑːd dʌz nɒt wɜːk/', vi: 'Thẻ từ khóa phòng của tôi không hoạt động' },
      { text: 'The air conditioner is not cooling', ipa: '/ðə eə kənˈdɪʃ.ən.ər ɪz nɒt ˈkuː.lɪŋ/', vi: 'Điều hòa không mát' },
      { text: 'Could you call a taxi for me?', ipa: '/kʊd juː kɔːl ə ˈtæk.si fɔː miː/', vi: 'Bạn gọi giúp tôi một chiếc taxi được không?' },
      { text: 'Is there free Wi-Fi in the room?', ipa: '/ɪz ðeər friː ˈwaɪ.faɪ ɪn ðə ruːm/', vi: 'Trong phòng có Wi-Fi miễn phí không?' }
    ]
  },
  {
    id: 'daily',
    title: 'Đời sống & Giao tiếp thường nhật (Daily Life)',
    desc: 'Các tình huống mua sắm, ăn uống, hỏi đường và giao tiếp xã hội.',
    phrases: [
      { text: 'What are you doing today?', ipa: '/wɒt ɑːr juː ˈduː.ɪŋ təˈdeɪ/', vi: 'Hôm nay bạn làm gì?' },
      { text: 'I need to run some errands', ipa: '/aɪ niːd tu rʌn sʌm ˈer.əndz/', vi: 'Tôi cần đi giải quyết vài việc vặt' },
      { text: 'Let us grab a coffee', ipa: '/let ʌs ɡræb ə ˈkɒf.i/', vi: 'Đi uống cà phê đi' },
      { text: 'I am running a bit late', ipa: '/aɪ æm ˈrʌn.ɪŋ ə bɪt leɪt/', vi: 'Tôi hơi trễ một chút' },
      { text: 'How much does this cost?', ipa: '/haʊ mʌtʃ dʌz ðɪs kɒst/', vi: 'Cái này giá bao nhiêu?' },
      { text: 'Could you tell me the way to the station?', ipa: '/kʊd juː tel miː ðə weɪ tu ðə ˈsteɪ.ʃən/', vi: 'Bạn chỉ đường giúp tôi đến nhà ga được không?' },
      { text: 'Would you like some help?', ipa: '/wʊd juː laɪk sʌm help/', vi: 'Bạn có cần giúp đỡ không?' },
      { text: 'Let us keep in touch', ipa: '/let ʌs kiːp ɪn tʌtʃ/', vi: 'Hãy giữ liên lạc nhé' }
    ]
  },
  {
    id: 'subjects',
    title: 'Học thuật & Chuyên ngành (Academic & Specialized)',
    desc: 'Các thuật ngữ, cụm từ chuyên môn dùng trong học tập và công việc.',
    phrases: [
      { text: 'Computer Science', ipa: '/kəmˈpjuː.tər ˈsaɪ.əns/', vi: 'Khoa học máy tính' },
      { text: 'Business Administration', ipa: '/ˈbɪz.nɪs ədˌmɪn.ɪˈstreɪ.ʃən/', vi: 'Quản trị kinh doanh' },
      { text: 'Artificial Intelligence', ipa: '/ˌɑː.tɪˈfɪʃ.əl ɪnˈtel.ɪ.dʒəns/', vi: 'Trí tuệ nhân tạo' },
      { text: 'English Literature', ipa: '/ˈɪŋ.ɡlɪʃ ˈlɪt.rə.tʃər/', vi: 'Văn học Anh' },
      { text: 'Software Engineering', ipa: '/ˈsɒft.weər ˌen.dʒɪˈnɪə.rɪŋ/', vi: 'Kỹ nghệ phần mềm / Công nghệ phần mềm' },
      { text: 'Data Analytics', ipa: '/ˈdeɪ.tə ˌæn.əlˈɪt.ɪks/', vi: 'Phân tích dữ liệu' },
      { text: 'Financial Management', ipa: '/faɪˈnæn.ʃəl ˈmæn.ɪdʒ.mənt/', vi: 'Quản lý tài chính' },
      { text: 'Creative Writing', ipa: '/kriˈeɪ.tɪv ˈraɪ.tɪŋ/', vi: 'Viết sáng tạo' }
    ]
  },
  {
    id: 'appearance_personality',
    title: 'Ngoại hình & Tính cách (Appearance & Personality)',
    desc: 'Các mẫu câu hỏi và mô tả chi tiết về diện mạo bên ngoài và tính cách con người.',
    phrases: [
      { text: 'What does he look like?', ipa: '/wɒt dʌz hiː lʊk laɪk/', vi: 'Anh ấy trông như thế nào?' },
      { text: 'She has long brown hair and blue eyes', ipa: '/ʃiː hæz lɒŋ braʊn heər ænd bluː aɪz/', vi: 'Cô ấy có mái tóc nâu dài và đôi mắt xanh.' },
      { text: 'He is tall and well-built', ipa: '/hiː ɪz tɔːl ænd ˌwelˈbɪlt/', vi: 'Anh ấy cao và có thân hình cân đối.' },
      { text: 'How would you describe her personality?', ipa: '/haʊ wʊd juː dɪˈskraɪb hɜː ˌpɜː.sənˈwl.ə.ti/', vi: 'Bạn mô tả tính cách cô ấy thế nào?' },
      { text: 'He is very outgoing and has a good sense of humor', ipa: '/hiː ɪz ˈver.i ˈaʊt.ɡəʊ.ɪŋ ænd hæz ə ɡʊd sens ɒv ˈhjuː.mər/', vi: 'Anh ấy rất cởi mở và có khiếu hài hước.' },
      { text: 'She is kind, patient, and extremely smart', ipa: '/ʃiː ɪz kaɪnd ˈpeɪ.ʃənt ænd ɪkˈstriːm.li smɑːt/', vi: 'Cô ấy tốt bụng, kiên nhẫn và vô cùng thông minh.' },
      { text: 'What is your best friend like?', ipa: '/wɒt ɪz jɔː best frend laɪk/', vi: 'Người bạn thân nhất của bạn là người như thế nào?' },
      { text: 'He is quiet and a bit shy at first', ipa: '/hiː ɪz ˈkwaɪ.ət ænd ə bɪt ʃaɪ æt fɜːst/', vi: 'Anh ấy trầm tính và hơi nhút nhát lúc đầu.' }
    ]
  },
  {
    id: 'contact_address',
    title: 'Liên lạc & Địa chỉ (Contact & Address)',
    desc: 'Cách hỏi và cung cấp số điện thoại, địa chỉ nhà, email và thông tin liên lạc cá nhân.',
    phrases: [
      { text: 'What is your phone number?', ipa: '/wɒt ɪz jɔː fəʊn ˈnʌm.bər/', vi: 'Số điện thoại của bạn là gì?' },
      { text: 'Can I have your phone number, please?', ipa: '/kæn aɪ hæv jɔː fəʊn ˈnʌm.bər pliːz/', vi: 'Cho tôi xin số điện thoại của bạn được không?' },
      { text: 'Where do you live?', ipa: '/weə duː juː lɪv/', vi: 'Bạn sống ở đâu?' },
      { text: 'What is your current address?', ipa: '/wɒt ɪz jɔː ˈkʌr.ənt əˈdres/', vi: 'Địa chỉ hiện tại của bạn là gì?' },
      { text: 'Could you spell your email address?', ipa: '/kʊd juː spel jɔː ˈiː.meɪl əˈdres/', vi: 'Bạn có thể đánh vần địa chỉ email không?' },
      { text: 'I live at one-two-three Main Street', ipa: '/aɪ lɪv æt wʌn tuː θriː meɪn striːt/', vi: 'Tôi sống ở số 123 đường Main.' },
      { text: 'Are you on social media?', ipa: '/ɑːr juː ɒn ˈsəʊ.ʃəl ˈmiː.di.ə/', vi: 'Bạn có dùng mạng xã hội không?' },
      { text: 'Let me write down your contact details', ipa: '/let miː raɪt daʊn jɔː ˈkɒn.tækt ˈdiː.teɪlz/', vi: 'Để tôi ghi lại thông tin liên lạc của bạn.' }
    ]
  },
  {
    id: 'hobbies_free_time',
    title: 'Sở thích & Thời gian rảnh (Hobbies & Free Time)',
    desc: 'Cách hỏi thăm và chia sẻ về các hoạt động giải trí, sở thích cá nhân lúc rảnh rỗi.',
    phrases: [
      { text: 'What do you like doing in your free time?', ipa: '/wɒt duː juː laɪk ˈduː.ɪŋ ɪn jɔː friː taɪm/', vi: 'Bạn thích làm gì vào thời gian rảnh?' },
      { text: 'I am really into listening to music', ipa: '/aɪ æm ˈrɪə.li ˈɪn.tuː ˈlɪs.ən.ɪŋ tu ˈmjuː.zɪk/', vi: 'Tôi rất thích nghe nhạc.' },
      { text: 'How often do you go to the gym?', ipa: '/haʊ ˈɒf.ən duː juː ɡəʊ tu ðə dʒɪm/', vi: 'Bạn có thường xuyên đi tập gym không?' },
      { text: 'I enjoy reading books and watching movies', ipa: '/aɪ ɪnˈdʒɔɪ ˈriː.dɪŋ bʊks ænd ˈwɒtʃ.ɪŋ ˈmuː.viz/', vi: 'Tôi thích đọc sách và xem phim.' },
      { text: 'Are you interested in sports?', ipa: '/ɑːr juː ˈɪn.trəs.tɪd ɪn spɔːts/', vi: 'Bạn có quan tâm đến thể thao không?' },
      { text: 'I love traveling to new places', ipa: '/aɪ lʌv ˈtræv.əl.ɪŋ tu njuː ˈpleɪ.sɪz/', vi: 'Tôi yêu thích đi du lịch đến những địa điểm mới.' },
      { text: 'I like taking photos in my spare time', ipa: '/aɪ laɪk ˈteɪ.kɪŋ ˈfəʊ.təʊz ɪn maɪ speər taɪm/', vi: 'Tôi thích chụp ảnh lúc rảnh rỗi.' },
      { text: 'How do you spend your weekends?', ipa: '/haʊ duː juː spend jɔː ˌwiːk.ˈendz/', vi: 'Bạn dành những ngày cuối tuần như thế nào?' }
    ]
  },
  {
    id: 'family_relationships',
    title: 'Gia đình & Mối quan hệ (Family & Relationships)',
    desc: 'Các mẫu câu hỏi thăm về thành viên gia đình, anh chị em và tình trạng mối quan hệ.',
    phrases: [
      { text: 'How many people are there in your family?', ipa: '/haʊ ˈmen.i ˈpiː.pəl ɑːr ðeər ɪn jɔː ˈfæm.əl.i/', vi: 'Gia đình bạn có bao nhiêu người?' },
      { text: 'There are four of us in my family', ipa: '/ðeər ɑːr fɔːr ɒv ʌs ɪn maɪ ˈfæm.əl.i/', vi: 'Gia đình tôi có 4 người.' },
      { text: 'Do you have any siblings?', ipa: '/duː juː hæv ˈen.i ˈsɪb.lɪŋz/', vi: 'Bạn có anh chị em ruột không?' },
      { text: 'I have an elder sister and a younger brother', ipa: '/aɪ hæv ən ˈel.dər ˈsɪs.tər ænd ə ˈjʌŋ.gər ˈbrʌð.ər/', vi: 'Tôi có một chị gái và một em trai.' },
      { text: 'Are you married or single?', ipa: '/ɑːr juː ˈmær.ɪd ɔː ˈsɪŋ.ɡəl/', vi: 'Bạn đã kết hôn hay còn độc thân?' },
      { text: 'How long have you been together?', ipa: '/haʊ lɒŋ hæv juː biːn təˈɡeð.ər/', vi: 'Hai bạn đã ở bên nhau được bao lâu rồi?' },
      { text: 'Do you live with your parents?', ipa: '/duː juː lɪv wɪð jɔː ˈpeə.rənts/', vi: 'Bạn có sống cùng bố mẹ không?' },
      { text: 'We have a very close relationship', ipa: '/wiː hæv ə ˈver.i kləʊs rɪˈleɪ.ʃən.ʃɪp/', vi: 'Chúng tôi có mối quan hệ rất thân thiết.' }
    ]
  },
  {
    id: 'shopping_payment',
    title: 'Mua sắm & Thanh toán (Shopping & Payment)',
    desc: 'Giao tiếp khi chọn đồ, thử đồ, hỏi giá, mặc cả và thanh toán tại cửa hàng.',
    phrases: [
      { text: 'Can I try this on?', ipa: '/kæn aɪ traɪ ðɪs ɒn/', vi: 'Tôi có thể thử cái này được không?' },
      { text: 'Where is the changing room?', ipa: '/weər ɪz ðə ˈtʃeɪn.dʒɪŋ ruːm/', vi: 'Phòng thử đồ ở đâu?' },
      { text: 'Do you have this in a larger size?', ipa: '/duː juː hæv ðɪs ɪn ə lɑː.dʒər saɪz/', vi: 'Bạn có cái này size lớn hơn không?' },
      { text: 'Do you accept credit cards?', ipa: '/duː juː əkˈsept ˈkred.ɪt kɑːdz/', vi: 'Cửa hàng có nhận thẻ tín dụng không?' },
      { text: 'I would like to pay in cash', ipa: '/aɪ wʊd laɪk tu peɪ ɪn kæʃ/', vi: 'Tôi muốn thanh toán bằng tiền mặt.' },
      { text: 'Could you give me a receipt, please?', ipa: '/kʊd juː ɡɪv miː ə rɪˈsiːt pliːz/', vi: 'Cho tôi xin hóa đơn được không?' },
      { text: 'Is this item on sale?', ipa: '/ɪz ðɪs ˈaɪ.təm ɒn seɪl/', vi: 'Sản phẩm này có đang giảm giá không?' },
      { text: 'What is the return policy?', ipa: '/wɒt ɪz ðə rɪˈtɜːn ˈpɒl.ə.si/', vi: 'Chính sách đổi trả hàng như thế nào?' }
    ]
  },
  {
    id: 'asking_directions',
    title: 'Hỏi đường & Chỉ đường (Directions & Places)',
    desc: 'Mẫu câu hỏi đường đi, xác định vị trí và hướng dẫn người khác.',
    phrases: [
      { text: 'Could you tell me the way to the bus station?', ipa: '/kʊd juː tel miː ðə weɪ tu ðə bʌs ˈsteɪ.ʃən/', vi: 'Bạn chỉ đường đến bến xe buýt được không?' },
      { text: 'Is there a pharmacy near here?', ipa: '/ɪz ðeər ə ˈfɑː.mə.si nɪə hɪər/', vi: 'Gần đây có hiệu thuốc nào không?' },
      { text: 'How far is it from here?', ipa: '/haʊ fɑːr ɪz ɪt frɒm hɪər/', vi: 'Từ đây đến đó bao xa?' },
      { text: 'Go straight and turn left at the traffic lights', ipa: '/ɡəʊ streɪt ænd tɜːn left æt ðə ˈtræf.ɪk laɪts/', vi: 'Đi thẳng rồi rẽ trái ở đèn giao thông.' },
      { text: 'It is on the right-hand side', ipa: '/ɪt ɪz ɒn ðə raɪt hænd saɪd/', vi: 'Nó nằm ở phía bên tay phải.' },
      { text: 'You cannot miss it', ipa: '/juː ˈkæn.ɒt mɪs ɪt/', vi: 'Bạn không thể đi lạc đâu.' },
      { text: 'Excuse me, I am lost', ipa: '/ɪkˈskjuːz miː aɪ æm lɒst/', vi: 'Xin lỗi, tôi đang bị lạc đường.' },
      { text: 'Is this the correct way to the museum?', ipa: '/ɪz ðɪs ðə kəˈrekt weɪ tu ðə mjuːˈziː.əm/', vi: 'Đây có đúng đường đến bảo tàng không?' }
    ]
  },
  {
    id: 'introducing_self',
    title: 'Bản thân & Giới thiệu bản thân (Self & Introductions)',
    desc: 'Các mẫu câu hỏi về bản thân, thông tin cá nhân và cách tự giới thiệu chi tiết, đầy đủ.',
    phrases: [
      { text: 'Can you tell me a little bit about yourself?', ipa: '/kæn juː tel miː ə ˈlɪt.əl bɪt əˈbaʊt jɔːˈself/', vi: 'Bạn có thể giới thiệu một chút về bản thân mình không?' },
      { text: 'May I introduce myself?', ipa: '/meɪ aɪ ˌɪn.trəˈdʒuːs maɪˈself/', vi: 'Tôi xin phép được tự giới thiệu bản thân nhé.' },
      { text: 'Let me introduce myself briefly', ipa: '/let miː ˌɪn.trəˈdʒuːs maɪˈself ˈbriːf.li/', vi: 'Để tôi tự giới thiệu ngắn gọn về bản thân.' },
      { text: 'What is your name?', ipa: '/wɒt ɪz jɔː neɪm/', vi: 'Tên bạn là gì?' },
      { text: 'My name is John Doe, but you can call me John', ipa: '/maɪ neɪm ɪz dʒɒn dơʊ bʌt juː kæn kɔːl miː dʒɒn/', vi: 'Tên tôi là John Doe, nhưng bạn có thể gọi tôi là John.' },
      { text: 'How old are you?', ipa: '/haʊ əʊld ɑːr juː/', vi: 'Bạn bao nhiêu tuổi?' },
      { text: 'I am twenty-five years old', ipa: '/aɪ æm ˈtwen.ti faɪv jɪəz əʊld/', vi: 'Tôi 25 tuổi.' },
      { text: 'Where do you come from?', ipa: '/weə duː juː kʌm frɒm/', vi: 'Bạn từ đâu đến?' },
      { text: 'I am from Hanoi, Vietnam', ipa: '/aɪ æm frɒm hæˈnɔɪ ˌvjetˈnæm/', vi: 'Tôi đến từ Hà Nội, Việt Nam.' },
      { text: 'I was born and raised in Da Nang', ipa: '/aɪ wɒz bɔːn ænd reɪzd ɪn dɑː næŋ/', vi: 'Tôi sinh ra và lớn lên ở Đà Nẵng.' },
      { text: 'What do you do for a living?', ipa: '/wɒt duː juː duː fɔːr ə ˈlɪv.ɪŋ/', vi: 'Bạn làm nghề gì để kiếm sống?' },
      { text: 'I am a software engineer at a tech company', ipa: '/aɪ æm ə ˈsɒft.weər ˌen.dʒɪˈnɪər æt ə tek ˈkʌm.pə.ni/', vi: 'Tôi là kỹ sư phần mềm tại một công ty công nghệ.' },
      { text: 'Where did you graduate from?', ipa: '/weə dɪd juː ˈɡrædʒ.u.eɪt frɒm/', vi: 'Bạn đã tốt nghiệp trường nào?' },
      { text: 'I graduated from university with a degree in IT', ipa: '/aɪ ˈɡrædʒ.u.eɪ.tɪd frɒm ˌjuː.nɪˈvɜː.sə.ti wɪð ə dɪˈɡriː ɪn aɪ tiː/', vi: 'Tôi tốt nghiệp đại học chuyên ngành Công nghệ thông tin.' },
      { text: 'What are your hobbies?', ipa: '/wɒt ɑːr jɔː ˈhɒb.iz/', vi: 'Sở thích của bạn là gì?' },
      { text: 'In my free time, I love reading books and playing sports', ipa: '/ɪn maɪ friː taɪm aɪ lʌv ˈriː.dɪŋ bʊks ænd ˈpleɪ.ɪŋ spɔːts/', vi: 'Lúc rảnh rỗi, tôi thích đọc sách và chơi thể thao.' },
      { text: 'How would you describe yourself?', ipa: '/haʊ wʊd juː dɪˈskraɪb jɔːˈself/', vi: 'Bạn tự nhận xét bản thân là người thế nào?' },
      { text: 'I am an open-minded and hard-working person', ipa: '/aɪ æm ən ˈəʊ.pən ˈmaɪn.dɪd ænd hɑːd ˈwɜː.kɪŋ ˈpɜː.sən/', vi: 'Tôi là một người cởi mở và làm việc chăm chỉ.' },
      { text: 'What is your goal in life?', ipa: '/wɒt ɪz jɔː ɡəʊl ɪn laɪf/', vi: 'Mục tiêu trong cuộc sống của bạn là gì?' },
      { text: 'My dream is to travel around the world', ipa: '/maɪ driːm ɪz tu ˈtræv.əl əˈraʊnd ðə wɜːld/', vi: 'Ước mơ của tôi là được du lịch vòng quanh thế giới.' },
      { text: 'What is your favorite food?', ipa: '/wɒt ɪz jɔː ˈfeɪ.vər.ɪt fuːd/', vi: 'Món ăn yêu thích của bạn là gì?' },
      { text: 'I am currently living on my own in the city', ipa: '/aɪ æm ˈkʌr.ənt.li ˈlɪv.ɪŋ ɒn maɪ əʊn ɪn ðə ˈsɪt.i/', vi: 'Hiện tôi đang sống tự lập ở thành phố.' },
      { text: 'Nice to meet you all today', ipa: '/naɪs tu miːt juː ɔːl təˈdeɪ/', vi: 'Rất vui được gặp gỡ tất cả mọi người ngày hôm nay.' }
    ]
  }
];

export const QUESTION_TYPES_DATA = [
  {
    type: 'Yes/No Questions',
    title: 'Câu hỏi Có/Không (Yes/No Questions)',
    desc: 'Yêu cầu câu trả lời Có (Yes) hoặc Không (No).',
    intonation: 'Ngữ điệu đi lên (Rising Intonation) ở cuối câu.',
    formula: 'Trợ động từ (Do/Does/Did/Have/Has) + Chủ ngữ + Động từ chính?  hoặc  To be + Chủ ngữ + ...?',
    examples: [
      { text: 'Do you like learning English?', ipa: '/duː juː laɪk ˈlɜː.nɪŋ ˈɪŋ.ɡlɪʃ/ ⤴', vi: 'Bạn có thích học tiếng Anh không?' },
      { text: 'Are you coming to the party tonight?', ipa: '/ɑːr juː ˈkʌm.ɪŋ tu ðə ˈpɑː.ti təˈnaɪt/ ⤴', vi: 'Tối nay bạn có đi dự tiệc không?' },
      { text: 'Has he finished his homework?', ipa: '/hæz hiː ˈfɪn.ɪʃt hɪz ˈhəʊm.wɜːk/ ⤴', vi: 'Anh ấy đã làm xong bài tập về nhà chưa?' }
    ]
  },
  {
    type: 'Wh- Questions',
    title: 'Câu hỏi lấy thông tin (Wh- Questions)',
    desc: 'Hỏi thông tin chi tiết bằng các từ nghi vấn (Who, What, Where, When, Why, How, Which, Whose).',
    intonation: 'Ngữ điệu đi xuống (Falling Intonation) ở cuối câu.',
    formula: 'Từ nghi vấn (Wh-) + Trợ động từ / To be + Chủ ngữ + Động từ chính?',
    examples: [
      { text: 'What is your favorite book?', ipa: '/wɒt ɪz jɔː ˈfeɪ.vər.ɪt bʊk/ ⤵', vi: 'Cuốn sách yêu thích của bạn là gì?' },
      { text: 'Where do you live?', ipa: '/weə duː juː lɪv/ ⤵', vi: 'Bạn sống ở đâu?' },
      { text: 'How did you learn to speak so well?', ipa: '/haʊ dɪd juː lɜːn tu spiːk səʊ wel/ ⤵', vi: 'Làm thế nào bạn học nói tốt như vậy?' }
    ]
  },
  {
    type: 'Tag Questions',
    title: 'Câu hỏi đuôi (Tag Questions)',
    desc: 'Dùng để xác nhận thông tin hoặc tìm kiếm sự đồng ý của người nghe.',
    intonation: 'Tùy ý chí người nói:\n- Đi lên (Rising) ⤴: Khi không chắc chắn, thực sự muốn hỏi.\n- Đi xuống (Falling) ⤵: Khi chắc chắn, chỉ mong đợi sự đồng tình.',
    formula: 'Mệnh đề khẳng định, + đuôi phủ định?  hoặc  Mệnh đề phủ định, + đuôi khẳng định?',
    examples: [
      { text: "You are a developer, aren't you?", ipa: "/juː ɑːr ə dɪˈvel.ə.pər ˈɑːnt juː/ ⤴ (thực sự hỏi) hoặc ⤵ (chờ đồng ý)", vi: 'Bạn là một lập trình viên, phải không?' },
      { text: "It is a beautiful day, isn't it?", ipa: '/ɪt ɪz ə ˈbjuː.tɪ.fəl deɪ ˈɪz.ənt ɪt/ ⤵', vi: 'Hôm nay là một ngày đẹp trời, đúng thế không?' }
    ]
  },
  {
    type: 'Negative Questions',
    title: 'Câu hỏi phủ định (Negative Questions)',
    desc: 'Dùng trợ động từ phủ định ở đầu câu để diễn tả sự ngạc nhiên, hoặc mong muốn người nghe đồng ý với mình.',
    intonation: 'Ngữ điệu đi lên (Rising Intonation) ở cuối câu.',
    formula: "Trợ động từ phủ định (Don't/Doesn't/Didn't/Aren't) + Chủ ngữ + Động từ?",
    examples: [
      { text: "Don't you like pizza?", ipa: '/dəʊnt juː laɪk ˈpiːt.sə/ ⤴', vi: 'Chẳng lẽ bạn lại không thích ăn pizza sao?' },
      { text: "Aren't you going to work today?", ipa: '/ɑːnt juː ˈɡəʊ.ɪŋ tu wɜːk təˈdeɪ/ ⤴', vi: 'Hôm nay bạn không đi làm à?' }
    ]
  },
  {
    type: 'Indirect Questions',
    title: 'Câu hỏi gián tiếp (Indirect Questions)',
    desc: 'Cách đặt câu hỏi lịch sự, trang trọng bằng cách lồng câu hỏi vào một cụm từ mở đầu.',
    intonation: 'Sử dụng ngữ điệu của câu trần thuật hoặc câu hỏi yes/no của mệnh đề chính (thường đi lên ⤴ ở cuối).',
    formula: 'Cụm từ lịch sự (Could you tell me / Do you know...) + Từ nghi vấn + Chủ ngữ + Động từ (không đảo trợ động từ lên trước!).',
    examples: [
      { text: 'Could you tell me where the station is?', ipa: '/kʊd juː tel miː weə ðə ˈsteɪ.ʃən ɪz/ ⤴', vi: 'Bạn có thể chỉ giúp tôi ga tàu ở đâu không?' },
      { text: 'Do you know if she is coming?', ipa: '/duː juː nəʊ ɪf ʃiː ɪz ˈkʌm.ɪŋ/ ⤴', vi: 'Bạn có biết liệu cô ấy có đến không?' }
    ]
  },
  {
    type: 'Hypothetical Questions',
    title: 'Câu hỏi giả định (Hypothetical Questions)',
    desc: 'Hỏi về các tình huống giả tưởng, không có thật hoặc khó xảy ra ở hiện tại/tương lai.',
    intonation: 'Lên giọng ở vế giả thiết (If-clause) và xuống giọng ở mệnh đề chính hỏi thông tin.',
    formula: 'What would you do if + S + V2/ed...?',
    examples: [
      { text: 'What would you do if you won the lottery?', ipa: '/wɒt wʊd juː duː ɪf juː wʌn ðə ˈlɒt.ər.i/ ⤵', vi: 'Bạn sẽ làm gì nếu bạn trúng vé số?' },
      { text: 'If you could travel anywhere, where would you go?', ipa: '/ɪf juː kʊd ˈtræv.əl ˈen.i.weə/ ⤴ / weə wʊd juː ɡəʊ/ ⤵', vi: 'Nếu bạn có thể đi du lịch bất cứ đâu, bạn sẽ đi đâu?' }
    ]
  }
];

export const INTONATION_GUIDELINES = [
  {
    pattern: 'Rising Intonation (Ngữ điệu đi lên ⤴)',
    desc: 'Âm vực của giọng nói tăng dần ở cuối câu.',
    rules: [
      { rule: 'Câu hỏi Yes/No', example: 'Is this your book?' },
      { rule: 'Liệt kê các từ (trước từ cuối cùng)', example: 'I need apples ⤴, bananas ⤴, and oranges ⤵.' },
      { rule: 'Bày tỏ sự ngạc nhiên, hoài nghi', example: 'Really? You sold your car?' },
      { rule: 'Lời chào thân mật hoặc yêu cầu lịch sự', example: 'Good morning! / Excuse me?' }
    ]
  },
  {
    pattern: 'Falling Intonation (Ngữ điệu đi xuống ⤵)',
    desc: 'Âm vực của giọng nói giảm dần ở cuối câu.',
    rules: [
      { rule: 'Câu hỏi lấy thông tin (Wh-)', example: 'Where is the classroom?' },
      { rule: 'Câu trần thuật, khẳng định', example: 'I am learning to code.' },
      { rule: 'Câu mệnh lệnh', example: 'Sit down and open your book.' },
      { rule: 'Câu cảm thán', example: 'What a beautiful house!' }
    ]
  },
  {
    pattern: 'Rise-Fall / Fall-Rise (Ngữ điệu kết hợp ⤴⤵)',
    desc: 'Giọng nói đi lên rồi lại đi xuống, hoặc ngược lại.',
    rules: [
      { rule: 'Lựa chọn thay thế (Alternative)', example: 'Would you like tea ⤴ or coffee ⤵?' },
      { rule: 'Mệnh đề phụ đứng trước', example: 'Although it was raining ⤴, they went out ⤵.' },
      { rule: 'Câu hỏi đuôi chắc chắn / đồng ý', example: "It is warm today ⤴, isn't it ⤵?" }
    ]
  }
];

export const SENTENCE_STRESS_RULES = [
  {
    category: 'Content Words (Từ mang ý nghĩa chính - NHẤN MẠNH)',
    desc: 'Những từ mang thông điệp chính của câu, phát âm to hơn, rõ hơn và chậm hơn.',
    types: [
      { name: 'Động từ chính (Main verbs)', example: 'He runs to school.' },
      { name: 'Danh từ (Nouns)', example: 'The dog barked at the cat.' },
      { name: 'Tính từ (Adjectives)', example: 'She has a beautiful voice.' },
      { name: 'Trạng từ (Adverbs)', example: 'They speak English fluently.' },
      { name: 'Từ để hỏi (Question words)', example: 'Where is my key?' },
      { name: 'Từ phủ định (Negatives)', example: "I don't like fish." }
    ]
  },
  {
    category: 'Structure Words (Từ cấu trúc - PHÁT ÂM LƯỚT NHẸ)',
    desc: 'Những từ ngữ pháp kết nối câu, phát âm nhanh hơn, nhỏ hơn và lướt qua.',
    types: [
      { name: 'Đại từ (Pronouns)', example: 'Give it to him.' },
      { name: 'Giới từ (Prepositions)', example: 'He is at home.' },
      { name: 'Mạo từ (Articles)', example: 'The sun is shining.' },
      { name: 'Liên từ (Conjunctions)', example: 'Black and white.' },
      { name: 'Trợ động từ khẳng định (Auxiliary)', example: 'She is working.' }
    ]
  }
];

export const MINIMAL_PAIRS = [
  { sound1: '/iː/', sound2: '/ɪ/', word1: 'sheep', word2: 'ship', ipa1: '/ʃiːp/', ipa2: '/ʃɪp/', focusSound: '/iː/ vs /ɪ/', type: 'vowel' },
  { sound1: '/e/', sound2: '/æ/', word1: 'pen', word2: 'pan', ipa1: '/pen/', ipa2: '/pæn/', focusSound: '/e/ vs /æ/', type: 'vowel' },
  { sound1: '/uː/', sound2: '/ʊ/', word1: 'fool', word2: 'full', ipa1: '/fuːl/', ipa2: '/fʊl/', focusSound: '/uː/ vs /ʊ/', type: 'vowel' },
  { sound1: '/p/', sound2: '/b/', word1: 'pat', word2: 'bat', ipa1: '/pæt/', ipa2: '/bæt/', focusSound: '/p/ vs /b/', type: 'consonant' },
  { sound1: '/t/', sound2: '/d/', word1: 'ten', word2: 'den', ipa1: '/ten/', ipa2: '/den/', focusSound: '/t/ vs /d/', type: 'consonant' },
  { sound1: '/k/', sound2: '/ɡ/', word1: 'coat', word2: 'goat', ipa1: '/koʊt/', ipa2: '/ɡoʊt/', focusSound: '/k/ vs /ɡ/', type: 'consonant' }
];

export const PHONICS_BLENDS = [
  { blend: 'bl', examples: ['black', 'blue', 'block'] },
  { blend: 'cl', examples: ['clean', 'class', 'clock'] },
  { blend: 'fl', examples: ['fly', 'flat', 'flower'] },
  { blend: 'gr', examples: ['green', 'great', 'grass'] },
  { blend: 'st', examples: ['stop', 'star', 'step'] }
];

export const DIGRAPHS = [
  { digraph: 'ch', sound: 'tʃ', examples: ['chair', 'cheese', 'child'] },
  { digraph: 'sh', sound: 'ʃ', examples: ['shoe', 'ship', 'shop'] },
  { digraph: 'th', sound: 'θ', examples: ['think', 'three', 'thanks'] },
  { digraph: 'ph', sound: 'f', examples: ['phone', 'photo', 'phrase'] }
];

export const SILENT_LETTERS = [
  { letter: 'b', examples: ['climb', 'comb', 'doubt'] },
  { letter: 'k', examples: ['know', 'knife', 'knee'] },
  { letter: 'w', examples: ['write', 'wrong', 'wrist'] }
];

export const COMPOUND_WORDS = [
  { word: 'sunflower', parts: ['sun', 'flower'] },
  { word: 'rainbow', parts: ['rain', 'bow'] }
];

export const CONSONANT_VOWEL_LINKING = [];
export const VOWEL_VOWEL_LINKING = [];
export const ASSIMILATION_RULES = [];
export const ELISION_RULES = [];

