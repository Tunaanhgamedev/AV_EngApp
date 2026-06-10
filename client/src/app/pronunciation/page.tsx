'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, BookOpen, Sparkles, ChevronDown, Mic, Target, Star, Play, Info, ArrowRight, HelpCircle, Hash, FileText, Search, Loader2, Calendar, Globe, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Alphabet & Phonics Data ──────────────────────────────────────────────────
interface AlphabetLetter {
  letter: string;
  name: string;
  phonic: string;
  phonicIpa: string;
  example: string;
  exampleVi: string;
}

const ALPHABET: AlphabetLetter[] = [
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

// ─── IPA Data ──────────────────────────────────────────────────────────────────
const VOWELS = [
  { ipa: 'iː', example: 'see', word: '/siː/', desc: 'Long "ee"', tts: 'ee', guide: 'Môi mở rộng sang hai bên như đang mỉm cười. Lưỡi nâng cao lên gần vòm họng. Phát âm âm "i" kéo dài.' },
  { ipa: 'ɪ',  example: 'sit', word: '/sɪt/', desc: 'Short "i"', tts: 'ih', guide: 'Môi hơi mở rộng. Lưỡi đặt thấp hơn âm /iː/. Phát âm âm "i" ngắn, dứt khoát và thư giãn cơ miệng.' },
  { ipa: 'e',  example: 'bed', word: '/bed/', desc: 'Short "e"', tts: 'eh', guide: 'Miệng mở rộng vừa phải theo chiều dọc (rộng hơn âm /ɪ/). Đầu lưỡi chạm nhẹ vào răng dưới. Phát âm âm "e" dứt khoát.' },
  { ipa: 'æ',  example: 'cat', word: '/kæt/', desc: 'Flat "a"', tts: 'aa', guide: 'Mở to miệng hết cỡ theo cả chiều ngang và chiều dọc. Hạ lưỡi xuống thấp nhất chạm răng dưới. Phát âm lai giữa âm "a" và "e".' },
  { ipa: 'ɑː', example: 'car', word: '/kɑːr/', desc: 'Long "ah"', tts: 'ah', guide: 'Mở to miệng theo chiều dọc giống như lúc bác sĩ khám họng. Lưỡi hạ thấp xuống đáy miệng. Phát âm âm "a" kéo dài từ sâu trong cổ họng.' },
  { ipa: 'ɒ',  example: 'hot', word: '/hɒt/', desc: 'Short "o"', tts: 'ah', guide: 'Mở miệng tròn vừa phải, môi hơi hướng ra ngoài. Lưỡi thụt nhẹ về phía sau. Phát âm âm "o" ngắn, dứt khoát.' },
  { ipa: 'ɔː', example: 'saw', word: '/sɔː/', desc: 'Long "aw"', tts: 'aw', guide: 'Tròn môi và khép môi lại một chút so với âm /ɒ/, môi hướng ra ngoài nhiều hơn. Lưỡi thụt về phía sau. Phát âm âm "o" kéo dài.' },
  { ipa: 'ʊ',  example: 'put', word: '/pʊt/', desc: 'Short "oo"', tts: 'uu', guide: 'Môi tròn hơi đưa ra ngoài (giống như đang huýt sáo nhẹ). Lưỡi nâng cao về phía sau. Phát âm âm "u" ngắn, dứt khoát, cơ miệng thả lỏng.' },
  { ipa: 'uː', example: 'too', word: '/tuː/', desc: 'Long "oo"', tts: 'oo', guide: 'Chu môi tròn và nhỏ như đang huýt sáo. Lưỡi nâng cao về phía sau gần vòm họng. Phát âm âm "u" kéo dài từ khoang miệng.' },
  { ipa: 'ʌ',  example: 'cup', word: '/kʌp/', desc: 'Short "uh"', tts: 'uh', guide: 'Miệng mở tự nhiên vừa phải. Lưỡi đặt ở giữa miệng hơi nâng lên. Phát âm âm "á" ngắn, dứt khoát, gần giống tiếng Việt.' },
  { ipa: 'ɜː', example: 'bird', word: '/bɜːd/', desc: 'Long "ur"', tts: 'ur', guide: 'Miệng mở tự nhiên. Lưỡi nâng lên độ cao trung bình, hơi cong lưỡi về phía sau. Phát âm âm "ơ" kéo dài và hơi uốn lưỡi.' },
  { ipa: 'ə',  example: 'about', word: '/əˈbaʊt/', desc: 'Schwa', tts: 'uh', guide: 'Miệng mở tự nhiên và thả lỏng hoàn toàn tất cả các cơ. Lưỡi đặt ở giữa miệng. Phát âm âm "ơ" rất ngắn và nhẹ.' },
];

const DIPHTHONGS = [
  { ipa: 'eɪ', example: 'day', word: '/deɪ/', desc: '"ay"', tts: 'ay', guide: 'Bắt đầu bằng âm /e/ sau đó trượt nhanh sang âm /ɪ/. Môi mở rộng dần sang hai bên.' },
  { ipa: 'aɪ', example: 'my', word: '/maɪ/', desc: '"eye"', tts: 'eye', guide: 'Bắt đầu bằng âm /a/ rộng miệng sau đó khép dần và trượt sang âm /ɪ/.' },
  { ipa: 'ɔɪ', example: 'boy', word: '/bɔɪ/', desc: '"oy"', tts: 'oy', guide: 'Bắt đầu bằng âm /ɔː/ tròn môi sau đó mở dần sang hai bên và trượt sang âm /ɪ/.' },
  { ipa: 'aʊ', example: 'now', word: '/naʊ/', desc: '"ow"', tts: 'ow', guide: 'Bắt đầu bằng âm /a/ sau đó tròn dần môi và trượt sang âm /ʊ/.' },
  { ipa: 'əʊ', example: 'go', word: '/ɡəʊ/', desc: '"oh"', tts: 'oh', guide: 'Bắt đầu bằng âm /ə/ thả lỏng sau đó tròn dần môi và trượt sang âm /ʊ/.' },
  { ipa: 'ɪə', example: 'here', word: '/hɪər/', desc: '"ear"', tts: 'ear', guide: 'Bắt đầu bằng âm /ɪ/ ngắn sau đó lướt nhẹ sang âm /ə/.' },
  { ipa: 'eə', example: 'hair', word: '/heər/', desc: '"air"', tts: 'air', guide: 'Bắt đầu bằng âm /e/ sau đó lướt nhẹ sang âm /ə/.' },
  { ipa: 'ʊə', example: 'tour', word: '/tʊər/', desc: '"oor"', tts: 'oor', guide: 'Bắt đầu bằng âm /ʊ/ sau đó lướt nhẹ sang âm /ə/.' },
];

const CONSONANTS = [
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

const STRESS_RULES = [
  { rule: "Đa số danh từ 2 âm tiết", pattern: "Nhấn âm tiết 1", examples: ["ˈta.ble", "ˈdoc.tor", "ˈstu.dent"] },
  { rule: "Đa số động từ 2 âm tiết", pattern: "Nhấn âm tiết 2", examples: ["beˈgin", "deˈcide", "reˈpeat"] },
  { rule: "Từ có đuôi -tion, -sion", pattern: "Nhấn âm trước đuôi", examples: ["eduˈca.tion", "deˈci.sion", "naˈtion"] },
  { rule: "Từ có đuôi -ic", pattern: "Nhấn âm trước đuôi", examples: ["sciˈen.tif.ic", "draˈmat.ic", "opˈti.mis.tic"] },
  { rule: "Từ có đuôi -ity, -ety", pattern: "Nhấn âm thứ 3 từ cuối", examples: ["uniˈver.si.ty", "comˈmu.ni.ty", "soˈci.e.ty"] },
];

const MINIMAL_PAIRS = [
  { a: { word: "ship", ipa: "/ʃɪp/" }, b: { word: "sheep", ipa: "/ʃiːp/" }, focus: "ɪ vs iː" },
  { a: { word: "bed", ipa: "/bed/" }, b: { word: "bad", ipa: "/bæd/" }, focus: "e vs æ" },
  { a: { word: "thin", ipa: "/θɪn/" }, b: { word: "tin", ipa: "/tɪn/" }, focus: "θ vs t" },
  { a: { word: "light", ipa: "/laɪt/" }, b: { word: "right", ipa: "/raɪt/" }, focus: "l vs r" },
  { a: { word: "fan", ipa: "/fæn/" }, b: { word: "van", ipa: "/væn/" }, focus: "f vs v" },
  { a: { word: "bat", ipa: "/bæt/" }, b: { word: "pat", ipa: "/pæt/" }, focus: "b vs p" },
];

// ─── Numbers Data ──────────────────────────────────────────────────────────────
const NUMBERS_BASIC = [
  { num: '0', en: 'zero', vi: 'không' }, { num: '1', en: 'one', vi: 'một' }, { num: '2', en: 'two', vi: 'hai' },
  { num: '3', en: 'three', vi: 'ba' }, { num: '4', en: 'four', vi: 'bốn' }, { num: '5', en: 'five', vi: 'năm' },
  { num: '6', en: 'six', vi: 'sáu' }, { num: '7', en: 'seven', vi: 'bảy' }, { num: '8', en: 'eight', vi: 'tám' },
  { num: '9', en: 'nine', vi: 'chín' }, { num: '10', en: 'ten', vi: 'mười' }, { num: '11', en: 'eleven', vi: 'mười một' },
  { num: '12', en: 'twelve', vi: 'mười hai' }, { num: '13', en: 'thirteen', vi: 'mười ba' }, { num: '14', en: 'fourteen', vi: 'mười bốn' },
  { num: '15', en: 'fifteen', vi: 'mười lăm' }, { num: '16', en: 'sixteen', vi: 'mười sáu' }, { num: '17', en: 'seventeen', vi: 'mười bảy' },
  { num: '18', en: 'eighteen', vi: 'mười tám' }, { num: '19', en: 'nineteen', vi: 'mười chín' }, { num: '20', en: 'twenty', vi: 'hai mươi' },
];
const NUMBERS_TENS = [
  { num: '10', en: 'ten', vi: 'mười' }, { num: '20', en: 'twenty', vi: 'hai mươi' }, { num: '30', en: 'thirty', vi: 'ba mươi' },
  { num: '40', en: 'forty', vi: 'bốn mươi' }, { num: '50', en: 'fifty', vi: 'năm mươi' }, { num: '60', en: 'sixty', vi: 'sáu mươi' },
  { num: '70', en: 'seventy', vi: 'bảy mươi' }, { num: '80', en: 'eighty', vi: 'tám mươi' }, { num: '90', en: 'ninety', vi: 'chín mươi' },
  { num: '100', en: 'one hundred', vi: 'một trăm' },
];
const NUMBERS_BIG = [
  { num: '100', en: 'one hundred', ipa: '/wʌn ˈhʌn.drəd/', vi: '100', rule: 'hundred = trăm' },
  { num: '1,000', en: 'one thousand', ipa: '/wʌn ˈθaʊ.zənd/', vi: '1.000', rule: 'thousand = nghìn' },
  { num: '10,000', en: 'ten thousand', ipa: '/ten ˈθaʊ.zənd/', vi: '10.000', rule: '10 × thousand' },
  { num: '100,000', en: 'one hundred thousand', ipa: '/wʌn ˈhʌn.drəd ˈθaʊ.zənd/', vi: '100.000', rule: '100 × thousand' },
  { num: '1,000,000', en: 'one million', ipa: '/wʌn ˈmɪl.jən/', vi: '1 triệu', rule: 'million = triệu' },
  { num: '1,000,000,000', en: 'one billion', ipa: '/wʌn ˈbɪl.jən/', vi: '1 tỉ', rule: 'billion = tỉ' },
];
const NUMBERS_COMBO = [
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
const ORDINALS = [
  { num: '1st', en: 'first', vi: 'thứ nhất' }, { num: '2nd', en: 'second', vi: 'thứ hai' },
  { num: '3rd', en: 'third', vi: 'thứ ba' }, { num: '4th', en: 'fourth', vi: 'thứ tư' },
  { num: '5th', en: 'fifth', vi: 'thứ năm' }, { num: '10th', en: 'tenth', vi: 'thứ mười' },
  { num: '11th', en: 'eleventh', vi: 'thứ mười một' }, { num: '12th', en: 'twelfth', vi: 'thứ mười hai' },
  { num: '20th', en: 'twentieth', vi: 'thứ hai mươi' }, { num: '21st', en: 'twenty-first', vi: 'thứ hai mốt' },
  { num: '100th', en: 'one hundredth', vi: 'thứ một trăm' },
];

// ─── Word Endings Data ─────────────────────────────────────────────────────────
const ED_RULES = [
  { rule: 'Đọc /t/', condition: 'Sau phụ âm vô thanh: /p/, /k/, /f/, /s/, /ʃ/, /tʃ/', examples: [{ word: 'stopped', ipa: '/stɒpt/' }, { word: 'looked', ipa: '/lʊkt/' }, { word: 'washed', ipa: '/wɒʃt/' }] },
  { rule: 'Đọc /d/', condition: 'Sau nguyên âm hoặc phụ âm hữu thanh: /b/, /g/, /v/, /z/, /m/, /n/', examples: [{ word: 'played', ipa: '/pleɪd/' }, { word: 'lived', ipa: '/lɪvd/' }, { word: 'called', ipa: '/kɔːld/' }] },
  { rule: 'Đọc /ɪd/', condition: 'Sau âm /t/ hoặc /d/', examples: [{ word: 'wanted', ipa: '/ˈwɒn.tɪd/' }, { word: 'needed', ipa: '/ˈniː.dɪd/' }, { word: 'started', ipa: '/ˈstɑːr.tɪd/' }] },
];
const S_RULES = [
  { rule: 'Đọc /s/', condition: 'Sau phụ âm vô thanh: /p/, /t/, /k/, /f/, /θ/', examples: [{ word: 'cups', ipa: '/kʌps/' }, { word: 'cats', ipa: '/kæts/' }, { word: 'books', ipa: '/bʊks/' }] },
  { rule: 'Đọc /z/', condition: 'Sau nguyên âm hoặc phụ âm hữu thanh: /b/, /d/, /g/, /v/, /m/, /n/, /l/', examples: [{ word: 'dogs', ipa: '/dɒɡz/' }, { word: 'plays', ipa: '/pleɪz/' }, { word: 'trees', ipa: '/triːz/' }] },
  { rule: 'Đọc /ɪz/', condition: 'Sau âm xì: /s/, /z/, /ʃ/, /ʒ/, /tʃ/, /dʒ/', examples: [{ word: 'buses', ipa: '/ˈbʌs.ɪz/' }, { word: 'watches', ipa: '/ˈwɒtʃ.ɪz/' }, { word: 'bridges', ipa: '/ˈbrɪdʒ.ɪz/' }] },
];

// ─── Nouns, Plurals & Articles Data ──────────────────────────────────────────
const PLURAL_RULES = [
  { rule: 'Thông thường (Thêm -s)', condition: 'Hầu hết danh từ đếm được số ít', examples: [{ word: 'book', plural: 'books', ipa: '/bʊks/', vi: 'sách' }, { word: 'cup', plural: 'cups', ipa: '/kʌps/', vi: 'cốc' }, { word: 'pen', plural: 'pens', ipa: '/penz/', vi: 'bút' }] },
  { rule: 'Đuôi đặc biệt (Thêm -es)', condition: 'Danh từ kết thúc bằng -s, -ss, -sh, -ch, -x, -z', examples: [{ word: 'bus', plural: 'buses', ipa: '/ˈbʌs.ɪz/', vi: 'xe buýt' }, { word: 'watch', plural: 'watches', ipa: '/ˈwɒtʃ.ɪz/', vi: 'đồng hồ' }, { word: 'box', plural: 'boxes', ipa: '/ˈbɒk.sɪz/', vi: 'hộp' }] },
  { rule: 'Đuôi -y preceded by consonant', condition: 'Đổi -y thành -i + es', examples: [{ word: 'baby', plural: 'babies', ipa: '/ˈbeɪ.biz/', vi: 'trẻ sơ sinh' }, { word: 'city', plural: 'cities', ipa: '/ˈsɪt.iz/', vi: 'thành phố' }] },
  { rule: 'Đuôi -y preceded by vowel', condition: 'Giữ nguyên -y + s', examples: [{ word: 'boy', plural: 'boys', ipa: '/bɔɪz/', vi: 'cậu bé' }, { word: 'key', plural: 'keys', ipa: '/kiːz/', vi: 'chìa khóa' }] },
  { rule: 'Đuôi -f/-fe', condition: 'Đổi -f/-fe thành -ves', examples: [{ word: 'knife', plural: 'knives', ipa: '/naɪvz/', vi: 'con dao' }, { word: 'leaf', plural: 'leaves', ipa: '/liːvz/', vi: 'chiếc lá' }] }
];

const IRREGULAR_NOUNS = [
  { singular: 'man', plural: 'men', ipaSingular: '/mæn/', ipaPlural: '/men/', vi: 'đàn ông' },
  { singular: 'woman', plural: 'women', ipaSingular: '/ˈwʊm.ən/', ipaPlural: '/ˈwɪm.ɪn/', vi: 'phụ nữ' },
  { singular: 'child', plural: 'children', ipaSingular: '/tʃaɪld/', ipaPlural: '/ˈtʃɪl.drən/', vi: 'trẻ em' },
  { singular: 'tooth', plural: 'teeth', ipaSingular: '/tuːθ/', ipaPlural: '/tiːθ/', vi: 'răng' },
  { singular: 'foot', plural: 'feet', ipaSingular: '/fʊt/', ipaPlural: '/fiːt/', vi: 'bàn chân' },
  { singular: 'mouse', plural: 'mice', ipaSingular: '/maʊs/', ipaPlural: '/maɪs/', vi: 'con chuột' },
  { singular: 'person', plural: 'people', ipaSingular: '/ˈpɜː.sən/', ipaPlural: '/ˈpiː.pl̩/', vi: 'người' },
  { singular: 'sheep', plural: 'sheep', ipaSingular: '/ʃiːp/', ipaPlural: '/ʃiːp/', vi: 'con cừu' },
  { singular: 'fish', plural: 'fish', ipaSingular: '/fɪʃ/', ipaPlural: '/fɪʃ/', vi: 'con cá' }
];

const UNCOUNTABLE_NOUNS = [
  { term: 'water', ipa: '/ˈwɔː.tər/', vi: 'nước', measure: 'a glass of water', measureVi: 'một ly nước' },
  { term: 'milk', ipa: '/mɪlk/', vi: 'sữa', measure: 'a carton of milk', measureVi: 'một hộp sữa' },
  { term: 'coffee', ipa: '/ˈkɒf.i/', vi: 'cà phê', measure: 'a cup of coffee', measureVi: 'một tách cà phê' },
  { term: 'bread', ipa: '/bred/', vi: 'bánh mì', measure: 'a slice of bread', measureVi: 'một lát bánh mì' },
  { term: 'information', ipa: '/ˌɪn.fəˈmeɪ.ʃən/', vi: 'thông tin', measure: 'a piece of information', measureVi: 'một mẩu thông tin' },
  { term: 'furniture', ipa: '/ˈfɜː.nɪ.tʃər/', vi: 'đồ nội thất', measure: 'a piece of furniture', measureVi: 'một món đồ nội thất' },
  { term: 'money', ipa: '/ˈmʌn.i/', vi: 'tiền', measure: 'a sum of money', measureVi: 'một khoản tiền' },
  { term: 'advice', ipa: '/ədˈvaɪs/', vi: 'lời khuyên', measure: 'a piece of advice', measureVi: 'một lời khuyên' }
];

const ARTICLE_RULES = [
  { rule: 'Dùng "a"', condition: 'Trước từ bắt đầu bằng phụ âm (phát âm phụ âm)', examples: [{ word: 'a cat', ipa: '/ə kæt/' }, { word: 'a dog', ipa: '/ə dɒɡ/' }, { word: 'a house', ipa: '/ə haʊs/' }] },
  { rule: 'Dùng "an"', condition: 'Trước từ bắt đầu bằng nguyên âm (phát âm nguyên âm)', examples: [{ word: 'an apple', ipa: '/ən ˈæp.l̩/' }, { word: 'an egg', ipa: '/ən eɡ/' }, { word: 'an orange', ipa: '/ən ˈɒr.ɪndʒ/' }] },
  { rule: 'Ngoại lệ "h" câm (dùng an)', condition: 'Bắt đầu bằng chữ h nhưng âm h câm (phát âm nguyên âm tiếp theo)', examples: [{ word: 'an hour', ipa: '/ən ˈaʊ.ər/' }, { word: 'an honor', ipa: '/ən ˈɒn.ər/' }, { word: 'an honest man', ipa: '/ən ˈɒn.ɪst mæn/' }] },
  { rule: 'Ngoại lệ chữ u/e phát âm /j/ (dùng a)', condition: 'Bắt đầu bằng nguyên âm chữ cái nhưng phát âm phụ âm /j/ hoặc /w/', examples: [{ word: 'a university', ipa: '/ə ˌjuː.nɪˈvɜː.sə.ti/' }, { word: 'a European', ipa: '/ə ˌjʊə.rəˈpiː.ən/' }, { word: 'a one-way street', ipa: '/ə wʌn weɪ striːt/' }] }
];

// ─── Days, Months, Years Data ────────────────────────────────────────────────
const DAYS_OF_WEEK = [
  { day: 'Monday', abbreviation: 'Mon', ipa: '/ˈmʌn.deɪ/', vi: 'Thứ Hai' },
  { day: 'Tuesday', abbreviation: 'Tue', ipa: '/ˈtjuːz.deɪ/', vi: 'Thứ Ba' },
  { day: 'Wednesday', abbreviation: 'Wed', ipa: '/ˈwenz.deɪ/', vi: 'Thứ Tư' },
  { day: 'Thursday', abbreviation: 'Thu', ipa: '/ˈθɜːz.deɪ/', vi: 'Thứ Năm' },
  { day: 'Friday', abbreviation: 'Fri', ipa: '/ˈfraɪ.deɪ/', vi: 'Thứ Sáu' },
  { day: 'Saturday', abbreviation: 'Sat', ipa: '/ˈsæt.ə.deɪ/', vi: 'Thứ Bảy' },
  { day: 'Sunday', abbreviation: 'Sun', ipa: '/ˈsʌn.deɪ/', vi: 'Chủ Nhật' },
];

const MONTHS_OF_YEAR = [
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

const YEAR_RULES = [
  { example: '1998', read: 'nineteen ninety-eight', ipa: '/ˌnaɪn.tiːn ˌnaɪn.tiˈeɪt/', rule: 'Đọc tách đôi thành 19 và 98' },
  { example: '2026', read: 'twenty twenty-six', ipa: '/ˌtwen.ti ˌtwen.tiˈsɪks/', rule: 'Đọc tách đôi thành 20 và 26 (phổ biến nhất)' },
  { example: '2005', read: 'two thousand and five', ipa: '/tuː ˈθaʊ.zənd ənd faɪv/', rule: 'Đọc cả nghìn + "and" + đơn vị (năm 2000-2009)' },
  { example: '1900', read: 'nineteen hundred', ipa: '/ˌnaɪn.tiːn ˈhʌn.drəd/', rule: 'Năm tròn trăm: đọc số trăm đầu tiên + hundred' },
  { example: '2000', read: 'two thousand', ipa: '/tuː ˈθaʊ.zənd/', rule: 'Đọc cả số nghìn' },
  { example: '1808', read: 'eighteen oh-eight', ipa: '/ˌeɪ.tiːn oʊ ˈeɪt/', rule: 'Số hàng chục là 0: đọc oh + số hàng đơn vị' }
];

const RELATIVE_TIME_WORDS = [
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

const TOPIC_LESSONS = [
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
      { text: 'How would you describe her personality?', ipa: '/haʊ wʊd juː dɪˈskraɪb hɜː ˌpɜː.sənˈæl.ə.ti/', vi: 'Bạn mô tả tính cách cô ấy thế nào?' },
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
  }
];

// ─── Countries & Nationalities Data ──────────────────────────────────────────
import COUNTRIES_DATA from '@/data/countries';

const speak = (text: string, rate: number = 0.7) => {
  if (typeof window === 'undefined') return;

  const playTranslateTTS = () => {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(text)}`;
    const audio = new Audio(url);
    audio.play().catch((err) => {
      console.error("Google Translate TTS fallback failed:", err);
    });
  };

  if (window.speechSynthesis) {
    const voices = window.speechSynthesis.getVoices();
    
    // Fallback to Translate TTS if no voices are loaded/installed
    if (voices.length === 0) {
      playTranslateTTS();
      return;
    }

    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = rate;
    const v = voices.find(v => v.lang === 'en-US' && v.name.includes('Google')) || voices.find(v => v.lang === 'en-US');
    if (v) u.voice = v;

    u.onerror = (e) => {
      console.log("speechSynthesis error, playing Google Translate TTS:", e);
      playTranslateTTS();
    };
    
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setTimeout(() => {
        window.speechSynthesis.speak(u);
      }, 50);
    } else {
      window.speechSynthesis.speak(u);
    }
  } else {
    playTranslateTTS();
  }
};

// ─── Speech Practice Section Component ─────────────────────────────────────────
function SpeechPracticeSection({ targetWord }: { targetWord: string }) {
  const [isRecording, setIsRecording] = useState(false);
  const [resultText, setResultText] = useState('');
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const startListening = () => {
    if (typeof window === 'undefined') return;
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setErrorMessage('Trình duyệt không hỗ trợ nhận diện giọng nói (API Web Speech). Hãy dùng Chrome/Safari.');
      return;
    }

    setResultText('');
    setAccuracy(null);
    setErrorMessage('');
    setIsRecording(true);

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      setResultText(speechToText);

      const targetClean = targetWord.toLowerCase().replace(/[^a-z]/g, '');
      const spokenClean = speechToText.toLowerCase().replace(/[^a-z]/g, '');

      if (spokenClean === targetClean) {
        setAccuracy(100);
      } else if (spokenClean.includes(targetClean) || targetClean.includes(spokenClean)) {
        setAccuracy(80);
      } else {
        setAccuracy(30);
      }
    };

    recognition.onerror = (event: any) => {
      console.error(event);
      setErrorMessage('Không nhận diện được giọng nói hoặc micro bị chặn.');
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
      <div className="flex-1 min-w-0 text-left">
        <h4 className="text-xs font-black text-violet-600 uppercase tracking-widest">Luyện phát âm AI</h4>
        <p className="text-xs text-slate-500 mt-0.5 font-medium">Nhấp vào micro, đọc từ ví dụ <strong className="text-slate-800">"{targetWord}"</strong> để kiểm tra.</p>
        
        {resultText && (
          <p className="text-xs text-slate-800 mt-2 font-semibold">
            Bạn đã đọc: <span className="text-violet-600 font-bold">"{resultText}"</span>
          </p>
        )}

        {accuracy !== null && (
          <div className="flex flex-wrap items-center gap-2 mt-1.5">
            <span className={cn(
              "text-[10px] font-black px-2.5 py-0.5 rounded-full",
              accuracy === 100 ? "bg-emerald-100 text-emerald-700" : accuracy >= 80 ? "bg-blue-100 text-blue-700" : "bg-rose-100 text-rose-700"
            )}>
              Độ khớp: {accuracy}%
            </span>
            <span className="text-xs font-bold text-slate-600">
              {accuracy === 100 ? 'Rất tuyệt vời! Phát âm hoàn hảo.' : accuracy >= 80 ? 'Khá tốt, gần chính xác!' : 'Chưa khớp lắm, hãy thử lại.'}
            </span>
          </div>
        )}

        {errorMessage && (
          <p className="text-xs text-rose-500 mt-2 font-medium">⚠️ {errorMessage}</p>
        )}
      </div>

      <button
        onClick={startListening}
        disabled={isRecording}
        className={cn(
          "w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md shrink-0",
          isRecording 
            ? "bg-rose-600 text-white animate-pulse" 
            : "bg-violet-100 text-violet-600 border border-violet-200 hover:bg-violet-600 hover:text-white"
        )}
        title="Bấm để ghi âm"
      >
        <Mic className="w-5 h-5" />
      </button>
    </div>
  );
}

// ─── IPA Cell Component ────────────────────────────────────────────────────────
function IPACell({ item, color, isActive, onClick }: { item: any; color: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center gap-1 p-3 sm:p-4 rounded-2xl border-2 transition-all duration-200",
        "hover:shadow-lg hover:-translate-y-0.5 active:scale-95 text-slate-800 cursor-pointer",
        isActive ? "border-primary bg-primary/10 scale-[1.03] shadow-md shadow-primary/5" : color
      )}
    >
      <span className="text-xl sm:text-2xl font-black font-mono">{item.ipa}</span>
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.example}</span>
      <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Volume2 className="w-4 h-4 text-primary animate-pulse" />
      </div>
    </button>
  );
}

export default function PronunciationPage() {
  const [activeTab, setActiveTab] = useState<'alphabet' | 'chart' | 'stress' | 'pairs' | 'building' | 'numbers' | 'endings' | 'datetime' | 'countries' | 'topics' | 'nouns'>('alphabet');
  const [selectedTopic, setSelectedTopic] = useState<string>('greetings');
  const [chartSection, setChartSection] = useState<'vowels' | 'diphthongs' | 'consonants'>('vowels');
  const [numSection, setNumSection] = useState<'basic' | 'big' | 'combo' | 'ordinals'>('basic');
  const [nounSection, setNounSection] = useState<'rules' | 'irregular' | 'uncountable' | 'articles'>('rules');
  const [selectedSound, setSelectedSound] = useState<any>(null);

  // New Datetime & Countries states
  const [datetimeSection, setDatetimeSection] = useState<'days' | 'relative' | 'months' | 'years'>('days');
  const [countrySearch, setCountrySearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  // AI Stress Analyzer States
  const [stressInput, setStressInput] = useState('');
  const [stressResult, setStressResult] = useState<any>(null);
  const [analyzingStress, setAnalyzingStress] = useState(false);
  const [stressError, setStressError] = useState('');

  const handleAnalyzeStress = async (wordToAnalyze?: string, bypassCache = false) => {
    const targetWord = wordToAnalyze || stressInput;
    if (!targetWord || targetWord.trim().length === 0) return;
    
    setAnalyzingStress(true);
    setStressError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/ai/analyze-stress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: targetWord.trim(), bypassCache })
      });
      if (!res.ok) throw new Error('Không thể phân tích trọng âm');
      const data = await res.json();
      setStressResult(data);
      if (wordToAnalyze) {
        setStressInput(wordToAnalyze);
      }
    } catch (err: any) {
      console.error(err);
      setStressError(err.message || 'Có lỗi xảy ra khi phân tích.');
    } finally {
      setAnalyzingStress(false);
    }
  };

  // Pre-load default word when entering stress tab
  useEffect(() => {
    if (activeTab === 'stress' && !stressResult) {
      handleAnalyzeStress('communication');
    }
  }, [activeTab]);

  // Initialize selectedSound when section changes
  useEffect(() => {
    if (chartSection === 'vowels') {
      setSelectedSound(VOWELS[0]);
    } else if (chartSection === 'diphthongs') {
      setSelectedSound(DIPHTHONGS[0]);
    } else if (chartSection === 'consonants') {
      setSelectedSound(CONSONANTS[0]);
    }
  }, [chartSection]);

  const tabs = [
    { id: 'alphabet' as const, label: 'Bảng Chữ Cái & Phonics', icon: BookOpen },
    { id: 'chart' as const, label: 'Bảng Phiên Âm IPA', icon: Volume2 },
    { id: 'topics' as const, label: 'Chủ Đề Giao Tiếp', icon: MessageSquare },
    { id: 'numbers' as const, label: 'Số & Cách Đọc Số', icon: Hash },
    { id: 'datetime' as const, label: 'Thứ, Tháng, Năm', icon: Calendar },
    { id: 'countries' as const, label: 'Các Nước & Quốc Tịch', icon: Globe },
    { id: 'stress' as const, label: 'Quy Tắc Trọng Âm', icon: Target },
    { id: 'endings' as const, label: 'Đuôi -ed, -s/-es', icon: FileText },
    { id: 'nouns' as const, label: 'Danh Từ & Số Nhiều', icon: Star },
    { id: 'pairs' as const, label: 'Cặp Tối Thiểu', icon: Mic },
    { id: 'building' as const, label: 'Nối Câu & Chữ', icon: Sparkles },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-black flex items-center gap-3">
          <Volume2 className="w-8 h-8 text-primary" />Pronunciation Lab
        </h1>
        <p className="text-slate-500 font-medium">
          Học bảng chữ cái, phát âm chuẩn IPA, quy tắc trọng âm và các quy tắc nối chữ thành từ, nối từ thành câu.
        </p>
      </header>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer",
              activeTab === tab.id
                ? "bg-slate-900 text-white shadow-lg"
                : "bg-white text-slate-500 border border-slate-200 hover:border-primary"
            )}
          >
            <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ════════════════════════════════════════════ ALPHABET & PHONICS ═══════════ */}
      {activeTab === 'alphabet' && (
        <div className="space-y-6">
          <div className="premium-card p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <h3 className="text-lg font-black text-blue-800 flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-blue-600" /> Bảng Chữ Cái Tiếng Anh & Phonics
            </h3>
            <p className="text-sm text-blue-700 leading-relaxed font-medium">
              Bảng chữ cái tiếng Anh gồm 26 chữ cái. Mỗi chữ cái có một **Tên gọi (Name)** và một hoặc nhiều **Âm phát âm (Phonics)** khi ghép vào từ. Nhấp vào mỗi thẻ để nghe cách đọc tên chữ cái và cách phát âm Phonics của nó.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {ALPHABET.map((item) => (
              <div 
                key={item.letter}
                className="premium-card bg-white p-5 border border-slate-200 rounded-[2rem] flex flex-col items-center justify-between text-center relative overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <span className="text-4xl font-black text-slate-800 mb-2">{item.letter}</span>
                
                <div className="space-y-2 w-full">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider font-sans">Tên chữ cái</span>
                    <button 
                      onClick={() => speak(item.letter, 0.6)}
                      className="px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-700 font-black text-xs hover:bg-blue-100 transition-all flex items-center gap-1 mx-auto cursor-pointer"
                    >
                      /{item.name}/ <Play className="w-2.5 h-2.5 fill-blue-700 text-blue-700" />
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-2">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider font-sans">Âm vị (Phonics)</span>
                    <button 
                      onClick={() => speak(item.example, 0.6)}
                      className="px-2 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 font-bold text-[10px] hover:bg-emerald-100 transition-all flex items-center gap-1 mx-auto cursor-pointer"
                    >
                      {item.phonicIpa} {item.example} <Play className="w-2.5 h-2.5 fill-emerald-700 text-emerald-700" />
                    </button>
                    <span className="text-[10px] text-slate-500 block mt-1 font-medium italic">{item.exampleVi}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════ IPA CHART ═══════════════════ */}
      {activeTab === 'chart' && (
        <div className="space-y-6">
          {/* Sub-tabs */}
          <div className="flex gap-2">
            {[
              { id: 'vowels' as const, label: 'Nguyên Âm (12)', count: VOWELS.length },
              { id: 'diphthongs' as const, label: 'Nguyên Âm Đôi (8)', count: DIPHTHONGS.length },
              { id: 'consonants' as const, label: 'Phụ Âm (24)', count: CONSONANTS.length },
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setChartSection(s.id)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer",
                  chartSection === s.id
                    ? "bg-primary text-white shadow-md"
                    : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Info Banner */}
          <div className="premium-card p-4 bg-blue-50 border-blue-100 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700 font-medium">
              Nhấn vào mỗi ô để xem hướng dẫn khẩu hình miệng chi tiết và nghe phát âm. Mỗi ký hiệu IPA đại diện cho một âm duy nhất.
            </p>
          </div>

          {/* Grid */}
          {chartSection === 'vowels' && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {VOWELS.map(v => (
                <IPACell 
                  key={v.ipa} 
                  item={v} 
                  color="border-sky-200 bg-sky-50/50 hover:border-sky-400" 
                  isActive={selectedSound?.ipa === v.ipa}
                  onClick={() => setSelectedSound(v)}
                />
              ))}
            </div>
          )}
          {chartSection === 'diphthongs' && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {DIPHTHONGS.map(d => (
                <IPACell 
                  key={d.ipa} 
                  item={d} 
                  color="border-violet-200 bg-violet-50/50 hover:border-violet-400" 
                  isActive={selectedSound?.ipa === d.ipa}
                  onClick={() => setSelectedSound(d)}
                />
              ))}
            </div>
          )}
          {chartSection === 'consonants' && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {CONSONANTS.map(c => (
                <IPACell 
                  key={c.ipa} 
                  item={c} 
                  color="border-emerald-200 bg-emerald-50/50 hover:border-emerald-400" 
                  isActive={selectedSound?.ipa === c.ipa}
                  onClick={() => setSelectedSound(c)}
                />
              ))}
            </div>
          )}

          {/* Selected Sound Detail Panel */}
          {selectedSound && (
            <div className="premium-card p-6 bg-gradient-to-br from-slate-900 to-slate-950 text-white border-slate-800 shadow-xl rounded-3xl mt-6 animate-in slide-in-from-bottom-3 duration-300">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                
                {/* Left Visual Area: Large IPA Circle & Hear Buttons */}
                <div className="flex flex-col items-center gap-3 w-full sm:w-56 flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center border-4 border-slate-800 shadow-2xl relative">
                    <span className="text-4xl font-black font-mono text-white">/{selectedSound.ipa}/</span>
                    <span className="absolute -bottom-2.5 px-3 py-0.5 bg-slate-800 rounded-full border border-slate-700 text-[8px] font-black tracking-widest text-primary uppercase">
                      {chartSection === 'vowels' ? 'Vowel' : chartSection === 'diphthongs' ? 'Diphthong' : 'Consonant'}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 w-full mt-3">
                    <button
                      onClick={() => speak(selectedSound.tts, 0.55)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary/95 text-white font-black text-xs uppercase tracking-wider rounded-xl active:scale-95 transition-all cursor-pointer shadow-md shadow-primary/20"
                    >
                      <Volume2 className="w-4 h-4 fill-white" /> Nghe âm riêng lẻ
                    </button>
                    
                    <button
                      onClick={() => speak(selectedSound.example, 0.7)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-slate-200" /> Nghe từ: "{selectedSound.example}"
                    </button>
                  </div>
                </div>

                {/* Right Content Area: Explanation & Practice */}
                <div className="flex-1 space-y-4 text-left w-full">
                  <div>
                    <h3 className="text-lg font-black text-slate-100 flex items-center gap-2">
                      Hướng dẫn Phát âm âm <span className="text-primary">/{selectedSound.ipa}/</span>
                    </h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                      Phân loại: {selectedSound.desc}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-800/40 border border-slate-800/80 rounded-2xl">
                    <h4 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-primary" /> Hướng dẫn khẩu hình miệng:
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed font-medium">
                      {selectedSound.guide}
                    </p>
                  </div>

                  {/* Word Context / Example */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-800/30 border border-slate-800/60 rounded-xl">
                      <span className="text-[9px] font-bold text-slate-500 uppercase block">Từ ví dụ</span>
                      <span className="text-base font-black text-slate-200">{selectedSound.example}</span>
                    </div>
                    <div className="p-3 bg-slate-800/30 border border-slate-800/60 rounded-xl">
                      <span className="text-[9px] font-bold text-slate-500 uppercase block">Phiên âm của từ</span>
                      <span className="text-base font-black text-slate-200 font-mono">{selectedSound.word}</span>
                    </div>
                  </div>

                  {/* Gamified AI Speech Practice (Microphone) */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <SpeechPracticeSection targetWord={selectedSound.example} />
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Legend */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="premium-card p-5 border-l-4 border-sky-400">
              <h4 className="font-black text-sm text-sky-700 mb-1">Nguyên Âm (Vowels)</h4>
              <p className="text-xs text-slate-500 font-medium">Âm phát ra khi luồng khí không bị chặn. Có 12 nguyên âm đơn trong tiếng Anh.</p>
            </div>
            <div className="premium-card p-5 border-l-4 border-violet-400">
              <h4 className="font-black text-sm text-violet-700 mb-1">Nguyên Âm Đôi (Diphthongs)</h4>
              <p className="text-xs text-slate-500 font-medium">Sự kết hợp của 2 nguyên âm trượt vào nhau. Có 8 nguyên âm đôi.</p>
            </div>
            <div className="premium-card p-5 border-l-4 border-emerald-400">
              <h4 className="font-black text-sm text-emerald-700 mb-1">Phụ Âm (Consonants)</h4>
              <p className="text-xs text-slate-500 font-medium">Âm phát ra khi luồng khí bị chặn hoàn toàn hoặc một phần. Có 24 phụ âm.</p>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════ STRESS RULES ════════════════ */}
      {activeTab === 'stress' && (
        <div className="space-y-6">
          <div className="premium-card p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <h3 className="text-lg font-black text-amber-800 flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 fill-amber-500 text-amber-500" /> Trọng âm là gì?
            </h3>
            <p className="text-sm text-amber-700 leading-relaxed font-medium">
              Trọng âm (word stress) là việc nhấn mạnh một âm tiết trong từ. Âm tiết được nhấn sẽ phát ra to hơn, dài hơn và cao hơn.
              Sai trọng âm có thể khiến người nghe không hiểu bạn, dù bạn phát âm đúng từng âm.
            </p>
          </div>

          {/* AI Stress Analyzer Widget */}
          <div className="premium-card p-6 bg-slate-900 text-white border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Target className="w-32 h-32 text-slate-700" />
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-100 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 fill-primary text-primary" /> Phân Tích Trọng Âm AI
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">Nhập từ tiếng Anh để phân tích số âm tiết và trọng âm chính/phụ.</p>
                </div>
              </div>

              {/* Input Form */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    value={stressInput}
                    onChange={(e) => setStressInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAnalyzeStress()}
                    placeholder="Nhập từ cần phân tích... (ví dụ: photography)"
                    className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:outline-none placeholder-slate-500 text-white"
                  />
                </div>
                <button
                  onClick={() => handleAnalyzeStress()}
                  disabled={analyzingStress || !stressInput.trim()}
                  className="px-6 py-3 bg-primary hover:bg-primary/95 disabled:bg-slate-800 disabled:text-slate-500 text-white font-black text-sm uppercase tracking-wider rounded-xl active:scale-95 transition-all cursor-pointer shadow-md shadow-primary/20 flex items-center justify-center gap-2"
                >
                  {analyzingStress ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> ĐANG PHÂN TÍCH...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 fill-white" /> PHÂN TÍCH
                    </>
                  )}
                </button>
              </div>

              {stressError && (
                <p className="text-sm text-rose-400 font-medium">⚠️ {stressError}</p>
              )}

              {/* Analyzer Results */}
              {stressResult && (
                <div className="space-y-6 pt-4 border-t border-slate-800/80 animate-in fade-in duration-500">
                  {/* Syllables Visualization */}
                  <div className="space-y-2 text-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Phân tách âm tiết & Trọng âm</span>
                    <div className="flex flex-wrap items-center justify-center gap-4 py-6">
                      {stressResult.syllables.map((syl: string, idx: number) => {
                        const isPrimary = idx === stressResult.stressedSyllableIndex;
                        const isSecondary = idx === stressResult.secondaryStressedSyllableIndex;
                        return (
                          <div key={idx} className="flex flex-col items-center gap-1.5">
                            {/* Accent indicator label */}
                            {isPrimary && (
                              <span className="text-[8px] font-black text-amber-400 uppercase tracking-widest bg-amber-500/10 px-1.5 py-0.5 rounded">
                                Trọng âm chính
                              </span>
                            )}
                            {isSecondary && (
                              <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest bg-purple-500/10 px-1.5 py-0.5 rounded">
                                Trọng âm phụ
                              </span>
                            )}
                            {!isPrimary && !isSecondary && <span className="h-[17px] w-1" />}

                            <button
                              onClick={() => speak(syl)}
                              className={cn(
                                "h-16 px-6 rounded-2xl flex items-center justify-center font-black text-lg transition-all duration-300 relative group cursor-pointer border-2",
                                isPrimary
                                  ? "bg-gradient-to-br from-amber-400 to-orange-500 border-amber-300 text-white shadow-lg shadow-orange-500/20 scale-110 ring-4 ring-orange-500/20"
                                  : isSecondary
                                    ? "bg-gradient-to-br from-purple-500 to-indigo-600 border-purple-400 text-white shadow-md shadow-purple-500/10 scale-105"
                                    : "bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-300"
                              )}
                            >
                              {/* Primary Stress Marker */}
                              {isPrimary && <span className="absolute -left-2 text-2xl text-amber-300 font-mono">ˈ</span>}
                              {/* Secondary Stress Marker */}
                              {isSecondary && <span className="absolute -left-2 text-xl text-purple-300 font-mono">ˌ</span>}
                              
                              <span>{syl}</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Monospace Phonetics + Audio Button + Re-analyze Button */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pb-2">
                    <button
                      onClick={() => speak(stressResult.word, 0.7)}
                      className="px-6 py-3 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-2xl flex items-center gap-3 group active:scale-95 transition-all cursor-pointer w-full sm:w-auto justify-center"
                    >
                      <Volume2 className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                      <span className="font-mono font-black text-base text-slate-200">{stressResult.phonetic}</span>
                      <Play className="w-3.5 h-3.5 fill-slate-400 text-slate-400 group-hover:text-white" />
                    </button>

                    <button
                      onClick={() => handleAnalyzeStress(stressResult.word, true)}
                      disabled={analyzingStress}
                      className="px-4 py-3 bg-slate-800 hover:bg-slate-750 hover:text-amber-400 border border-slate-700/80 rounded-2xl flex items-center gap-2 group active:scale-95 transition-all cursor-pointer text-slate-400 text-xs font-black uppercase tracking-wider w-full sm:w-auto justify-center transition-colors"
                      title="Nếu AI phân tích trọng âm sai, bấm vào đây để yêu cầu AI phân tích lại và lưu đè lên hệ thống"
                    >
                      <Sparkles className="w-4.5 h-4.5 text-amber-400/80 group-hover:scale-110 transition-transform" />
                      <span>{analyzingStress ? 'Đang phân tích lại...' : 'AI Phân tích lại (Sửa lỗi)'}</span>
                    </button>
                  </div>

                  {/* Side-by-side Explanations (Fluid layout) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-xl space-y-1.5 text-left">
                      <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Target className="w-4 h-4 text-amber-400" /> Quy tắc trọng âm:
                      </h4>
                      <p className="text-sm text-slate-300 font-medium leading-relaxed">
                        {stressResult.ruleExplanation}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-xl space-y-1.5 text-left">
                      <h4 className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-1.5">
                        <Info className="w-4 h-4" /> Hướng dẫn nhấn giọng:
                      </h4>
                      <p className="text-sm text-slate-300 font-medium leading-relaxed">
                        {stressResult.pronunciationGuide}
                      </p>
                    </div>
                  </div>

                  {/* Sibling similar words */}
                  {stressResult.similarWords && stressResult.similarWords.length > 0 && (
                    <div className="pt-2 border-t border-slate-800/80">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 text-left">Từ có trọng âm tương tự:</span>
                      <div className="flex flex-wrap gap-2.5">
                        {stressResult.similarWords.map((sim: any, idx: number) => (
                          <button
                            key={idx}
                            onClick={() => handleAnalyzeStress(sim.word)}
                            className="px-4 py-2 bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-slate-500 rounded-xl text-xs font-medium text-slate-300 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
                          >
                            <span className="font-bold">{sim.word}</span>
                            <span className="font-mono text-slate-500 text-[10px]">{sim.phonetic}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {STRESS_RULES.map((rule, i) => (
              <div key={i} className="premium-card p-6 hover:shadow-xl transition-all">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-black">{i + 1}</span>
                      <h4 className="font-black text-slate-800">{rule.rule}</h4>
                    </div>
                    <p className="text-sm text-primary font-bold ml-10">→ {rule.pattern}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 ml-10">
                  {rule.examples.map((ex, j) => (
                    <button
                      key={j}
                      onClick={() => speak(ex.replace(/[ˈˌ.]/g, ''))}
                      className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-bold hover:border-primary hover:bg-primary/5 transition-all flex items-center gap-2 group text-slate-700 cursor-pointer"
                    >
                      {ex}
                      <Play className="w-3 h-3 text-slate-300 group-hover:text-primary fill-slate-300 group-hover:fill-primary" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════ MINIMAL PAIRS ═══════════════ */}
      {activeTab === 'pairs' && (
        <div className="space-y-6">
          <div className="premium-card p-6 bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200">
            <h3 className="text-lg font-black text-rose-800 flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-rose-500" /> Cặp Tối Thiểu (Minimal Pairs)
            </h3>
            <p className="text-sm text-rose-700 leading-relaxed font-medium">
              Cặp tối thiểu là hai từ chỉ khác nhau ở một âm duy nhất. Luyện tập phân biệt các cặp này giúp bạn cải thiện khả năng nghe và phát âm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MINIMAL_PAIRS.map((pair, i) => (
              <div key={i} className="premium-card p-6 hover:shadow-xl transition-all">
                <div className="text-center mb-4">
                  <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest">
                    {pair.focus}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => speak(pair.a.word)}
                    className="flex-1 flex flex-col items-center gap-2 p-5 rounded-2xl border-2 border-sky-200 bg-sky-50/50 hover:border-sky-400 hover:shadow-md transition-all group cursor-pointer"
                  >
                    <span className="text-2xl font-black text-slate-800">{pair.a.word}</span>
                    <span className="text-xs font-mono text-slate-400">{pair.a.ipa}</span>
                    <Volume2 className="w-4 h-4 text-slate-300 group-hover:text-sky-500" />
                  </button>

                  <div className="text-sm font-black text-slate-300">VS</div>

                  <button
                    onClick={() => speak(pair.b.word)}
                    className="flex-1 flex flex-col items-center gap-2 p-5 rounded-2xl border-2 border-rose-200 bg-rose-50/50 hover:border-rose-400 hover:shadow-md transition-all group cursor-pointer"
                  >
                    <span className="text-2xl font-black text-slate-800">{pair.b.word}</span>
                    <span className="text-xs font-mono text-slate-400">{pair.b.ipa}</span>
                    <Volume2 className="w-4 h-4 text-slate-300 group-hover:text-rose-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════ WORD & SENTENCE BUILDING ═════ */}
      {activeTab === 'building' && (
        <div className="space-y-8">
          <div className="premium-card p-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
            <h3 className="text-lg font-black text-purple-800 flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-purple-600" /> Quy Tắc Ghép Chữ Thành Từ & Nối Từ Thành Câu
            </h3>
            <p className="text-sm text-purple-700 leading-relaxed font-medium">
              Cách kết hợp âm để tạo nên từ vựng hoàn chỉnh, và các nguyên tắc liên kết âm (linking sounds) giúp câu nói tự nhiên, mượt mà như người bản xứ.
            </p>
          </div>

          {/* Section 1: Nối chữ thành từ */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="w-2.5 h-6 bg-purple-600 rounded-full"></span>
              <h3 className="text-xl font-black text-slate-800">I. Nối Chữ thành Từ (Word Building)</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Phonics Blend */}
              <div className="premium-card p-6 space-y-3 hover:shadow-lg transition-all bg-white border border-slate-200 rounded-[2rem]">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 font-black text-lg">1</div>
                <h4 className="font-black text-slate-800">Ghép vần Phonics (Blending)</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Phương pháp đọc trơn bằng cách ghép nối các âm đơn lẻ lại với nhau. Phổ biến nhất là quy tắc CVC (Consonant - Vowel - Consonant).
                </p>
                <div className="p-3 bg-slate-50 rounded-xl font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span>c - a - t</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <button onClick={() => speak("cat")} className="font-bold text-purple-600 flex items-center gap-1 cursor-pointer">cat <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200/50 pt-2">
                    <span>d - o - g</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <button onClick={() => speak("dog")} className="font-bold text-purple-600 flex items-center gap-1 cursor-pointer">dog <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                  </div>
                </div>
              </div>

              {/* Digraphs & Blends */}
              <div className="premium-card p-6 space-y-3 hover:shadow-lg transition-all bg-white border border-slate-200 rounded-[2rem]">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 font-black text-lg">2</div>
                <h4 className="font-black text-slate-800">Âm đôi & Âm ghép (Digraphs)</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Khi hai phụ âm đi liền với nhau tạo thành một âm hoàn toàn mới (Digraphs) hoặc giữ nguyên đặc trưng nhưng đọc lướt nhanh (Blends).
                </p>
                <div className="p-3 bg-slate-50 rounded-xl font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span>s + h ➔ /ʃ/</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <button onClick={() => speak("ship")} className="font-bold text-purple-600 flex items-center gap-1 cursor-pointer">ship <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200/50 pt-2">
                    <span>c + h ➔ /tʃ/</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <button onClick={() => speak("chair")} className="font-bold text-purple-600 flex items-center gap-1 cursor-pointer">chair <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                  </div>
                </div>
              </div>

              {/* Syllables */}
              <div className="premium-card p-6 space-y-3 hover:shadow-lg transition-all bg-white border border-slate-200 rounded-[2rem]">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 font-black text-lg">3</div>
                <h4 className="font-black text-slate-800">Phân tách Âm tiết (Syllables)</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Một từ có thể cấu tạo từ nhiều âm tiết. Đọc chuẩn từng âm tiết riêng lẻ rồi ghép lại giúp bạn phát âm các từ dài cực kỳ tự tin.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span>ti - ger</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <button onClick={() => speak("tiger")} className="font-bold text-purple-600 flex items-center gap-1 cursor-pointer">tiger <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200/50 pt-2">
                    <span>com - pu - ter</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <button onClick={() => speak("computer")} className="font-bold text-purple-600 flex items-center gap-1 cursor-pointer">computer <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Nối từ thành câu */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="w-2.5 h-6 bg-purple-600 rounded-full"></span>
              <h3 className="text-xl font-black text-slate-800">II. Nối Từ thành Câu (Liaison / Linking Words)</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Consonant to Vowel */}
              <div className="premium-card p-6 space-y-4 hover:shadow-lg transition-all bg-white border border-slate-200 rounded-[2rem]">
                <h4 className="font-black text-slate-800 flex items-center gap-2">
                  <span className="p-1.5 bg-blue-100 text-blue-600 rounded-lg text-xs">Phụ âm ➔ Nguyên âm</span>
                  Nối Phụ âm với Nguyên âm
                </h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Khi một từ kết thúc bằng một **phụ âm** và từ tiếp theo bắt đầu bằng một **nguyên âm**, chúng ta nối phụ âm đó sang nguyên âm đứng sau.
                </p>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <p className="text-xs font-mono font-bold text-slate-700">Turn on ➔ "tur-non"</p>
                    <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium">
                      <span>Bật lên</span>
                      <button onClick={() => speak("turn on")} className="text-purple-600 font-bold flex items-center gap-1 cursor-pointer">Nghe phát âm <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <p className="text-xs font-mono font-bold text-slate-700">Read a book ➔ "rea-da-book"</p>
                    <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium">
                      <span>Đọc một cuốn sách</span>
                      <button onClick={() => speak("read a book")} className="text-purple-600 font-bold flex items-center gap-1 cursor-pointer">Nghe phát âm <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vowel to Vowel */}
              <div className="premium-card p-6 space-y-4 hover:shadow-lg transition-all bg-white border border-slate-200 rounded-[2rem]">
                <h4 className="font-black text-slate-800 flex items-center gap-2">
                  <span className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg text-xs">Nguyên âm ➔ Nguyên âm</span>
                  Nối Nguyên âm với Nguyên âm
                </h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Khi từ trước kết thúc bằng nguyên âm và từ sau bắt đầu bằng nguyên âm, ta thêm âm nhẹ **/w/** hoặc **/j/** để câu liền mạch.
                </p>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <p className="text-xs font-mono font-bold text-slate-700">Go on ➔ thêm âm /w/ ➔ "go-w-on"</p>
                    <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium">
                      <span>Tiếp tục</span>
                      <button onClick={() => speak("go on")} className="text-purple-600 font-bold flex items-center gap-1 cursor-pointer">Nghe phát âm <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <p className="text-xs font-mono font-bold text-slate-700">See it ➔ thêm âm /j/ ➔ "see-y-it"</p>
                    <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium">
                      <span>Nhìn thấy nó</span>
                      <button onClick={() => speak("see it")} className="text-purple-600 font-bold flex items-center gap-1 cursor-pointer">Nghe phát âm <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consonant to Consonant (Assimilation) */}
              <div className="premium-card p-6 space-y-4 hover:shadow-lg transition-all bg-white border border-slate-200 rounded-[2rem]">
                <h4 className="font-black text-slate-800 flex items-center gap-2">
                  <span className="p-1.5 bg-amber-100 text-amber-600 rounded-lg text-xs">Phụ âm ➔ Phụ âm</span>
                  Nối & Biến đổi phụ âm (Assimilation)
                </h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Khi hai phụ âm đứng cạnh nhau, âm cuối của từ trước có thể biến đổi hoặc hòa lẫn vào âm đầu của từ sau.
                </p>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <p className="text-xs font-mono font-bold text-slate-700">meet you ➔ /t/ + /j/ ➔ "mee-tshu" (/miːtʃu/)</p>
                    <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium">
                      <span>Rất vui được gặp bạn</span>
                      <button onClick={() => speak("meet you")} className="text-purple-600 font-bold flex items-center gap-1 cursor-pointer">Nghe phát âm <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <p className="text-xs font-mono font-bold text-slate-700">would you ➔ /d/ + /j/ ➔ "wou-dju" (/ˈwʊdʒu/)</p>
                    <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium">
                      <span>Bạn có muốn...</span>
                      <button onClick={() => speak("would you")} className="text-purple-600 font-bold flex items-center gap-1 cursor-pointer">Nghe phát âm <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Elision (Nuốt âm) */}
              <div className="premium-card p-6 space-y-4 hover:shadow-lg transition-all bg-white border border-slate-200 rounded-[2rem]">
                <h4 className="font-black text-slate-800 flex items-center gap-2">
                  <span className="p-1.5 bg-rose-100 text-rose-600 rounded-lg text-xs">Nuốt âm (Elision)</span>
                  Giản lược/Nuốt âm cuối
                </h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Âm yếu như **/t/** hoặc **/d/** ở cuối từ thường bị nuốt (không phát âm) khi từ tiếp theo bắt đầu bằng một phụ âm khác.
                </p>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <p className="text-xs font-mono font-bold text-slate-700">next door ➔ nuốt âm /t/ ➔ "nex-door"</p>
                    <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium">
                      <span>Nhà bên cạnh</span>
                      <button onClick={() => speak("next door")} className="text-purple-600 font-bold flex items-center gap-1 cursor-pointer">Nghe phát âm <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <p className="text-xs font-mono font-bold text-slate-700">last night ➔ nuốt âm /t/ ➔ "las-night"</p>
                    <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium">
                      <span>Tối hôm qua</span>
                      <button onClick={() => speak("last night")} className="text-purple-600 font-bold flex items-center gap-1 cursor-pointer">Nghe phát âm <Play className="w-2 h-2 fill-purple-600 text-purple-600" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ════════════════════════════════════════════ NUMBERS ═══════════════════════ */}
      {activeTab === 'numbers' && (
        <div className="space-y-6">
          <div className="premium-card p-6 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
            <h3 className="text-lg font-black text-teal-800 flex items-center gap-2 mb-2">
              <Hash className="w-5 h-5 text-teal-600" /> Cách Đọc Số trong Tiếng Anh
            </h3>
            <p className="text-sm text-teal-700 leading-relaxed font-medium">
              Học cách phát âm các số từ 0–20, hàng chục, hàng trăm, nghìn, triệu, tỉ và quy tắc ghép số. Nhấn vào mỗi số để nghe phát âm.
            </p>
          </div>

          {/* Sub-tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'basic' as const, label: 'Số 0–20 & Hàng Chục' },
              { id: 'big' as const, label: 'Trăm → Tỉ' },
              { id: 'combo' as const, label: 'Quy Tắc Ghép Số' },
              { id: 'ordinals' as const, label: 'Số Thứ Tự' },
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setNumSection(s.id)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer",
                  numSection === s.id ? "bg-teal-600 text-white shadow-md" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Basic 0-20 + Tens */}
          {numSection === 'basic' && (
            <div className="space-y-6">
              <h4 className="font-black text-slate-800 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-teal-500 rounded-full" />Số từ 0 đến 20
              </h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {NUMBERS_BASIC.map(n => (
                  <button key={n.num} onClick={() => speak(n.en)} className="group premium-card p-4 flex flex-col items-center gap-1 hover:shadow-lg hover:-translate-y-0.5 transition-all border border-teal-100 bg-teal-50/30 cursor-pointer">
                    <span className="text-2xl font-black text-teal-700">{n.num}</span>
                    <span className="text-xs font-bold text-slate-700">{n.en}</span>
                    <span className="text-[10px] text-slate-400 italic font-sans">{n.vi}</span>
                    <Play className="w-3 h-3 text-slate-300 group-hover:text-teal-500 fill-slate-300 group-hover:fill-teal-500" />
                  </button>
                ))}
              </div>

              <h4 className="font-black text-slate-800 flex items-center gap-2 pt-4">
                <span className="w-2.5 h-6 bg-teal-500 rounded-full" />Hàng Chục (10 – 100)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {NUMBERS_TENS.map(n => (
                  <button key={n.num} onClick={() => speak(n.en)} className="group premium-card p-4 flex flex-col items-center gap-1 hover:shadow-lg hover:-translate-y-0.5 transition-all border border-cyan-100 bg-cyan-50/30 cursor-pointer">
                    <span className="text-2xl font-black text-cyan-700">{n.num}</span>
                    <span className="text-xs font-bold text-slate-700">{n.en}</span>
                    <span className="text-[10px] text-slate-400 italic font-sans">{n.vi}</span>
                    <Play className="w-3 h-3 text-slate-300 group-hover:text-cyan-500 fill-slate-300 group-hover:fill-cyan-500" />
                  </button>
                ))}
              </div>

              <div className="premium-card p-4 bg-amber-50 border-amber-200 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-700 font-medium space-y-1">
                  <p><strong>Lưu ý:</strong> Các số 13–19 có đuôi <span className="font-mono bg-amber-100 px-1 rounded">-teen</span> (nhấn mạnh âm TEEN). Hàng chục 20–90 có đuôi <span className="font-mono bg-amber-100 px-1 rounded">-ty</span> (nhấn âm đầu).</p>
                  <p>VD: thir<strong>TEEN</strong> /θɜːˈtiːn/ vs <strong>THIR</strong>ty /ˈθɜː.ti/</p>
                </div>
              </div>
            </div>
          )}

          {/* Big Numbers */}
          {numSection === 'big' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {NUMBERS_BIG.map(n => (
                  <button key={n.num} onClick={() => speak(n.en)} className="group premium-card p-6 flex items-center gap-5 hover:shadow-xl transition-all text-left cursor-pointer">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white flex items-center justify-center font-black text-xs flex-shrink-0 shadow-lg">
                      {n.num}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-black text-slate-800">{n.en}</p>
                      <p className="text-xs font-mono text-slate-400">{n.ipa}</p>
                      <p className="text-xs text-primary font-bold mt-1">📏 {n.rule}</p>
                    </div>
                    <Play className="w-5 h-5 text-slate-200 group-hover:text-teal-500 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Combo Rules */}
          {numSection === 'combo' && (
            <div className="space-y-4">
              <div className="premium-card p-4 bg-purple-50 border-purple-200 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-purple-700 font-medium">
                  <p><strong>Quy tắc vàng:</strong> Đọc từ trái sang phải, lớn → nhỏ. Dùng <strong>"and"</strong> trước số hàng chục/đơn vị khi đứng sau hàng trăm.</p>
                </div>
              </div>
              <div className="space-y-3">
                {NUMBERS_COMBO.map((n, i) => (
                  <button key={i} onClick={() => speak(n.en)} className="group w-full premium-card p-5 flex items-center gap-4 hover:shadow-lg transition-all text-left cursor-pointer">
                    <span className="w-24 text-right text-2xl font-black text-primary flex-shrink-0 font-mono">{n.num}</span>
                    <div className="flex-1 min-w-0 border-l border-slate-200 pl-4">
                      <p className="font-bold text-slate-800">{n.en}</p>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">📐 {n.rule}</p>
                    </div>
                    <Play className="w-4 h-4 text-slate-200 group-hover:text-primary flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Ordinals */}
          {numSection === 'ordinals' && (
            <div className="space-y-4">
              <div className="premium-card p-4 bg-blue-50 border-blue-200 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-700 font-medium">
                  <p>Số thứ tự dùng để chỉ vị trí, thứ hạng. Thường thêm đuôi <strong>-th</strong> (fourth, fifth...) trừ 1st, 2nd, 3rd.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {ORDINALS.map(n => (
                  <button key={n.num} onClick={() => speak(n.en)} className="group premium-card p-4 flex flex-col items-center gap-1 hover:shadow-lg hover:-translate-y-0.5 transition-all border border-indigo-100 bg-indigo-50/30 cursor-pointer">
                    <span className="text-2xl font-black text-indigo-700">{n.num}</span>
                    <span className="text-xs font-bold text-slate-700">{n.en}</span>
                    <span className="text-[10px] text-slate-400 italic font-sans">{n.vi}</span>
                    <Play className="w-3 h-3 text-slate-300 group-hover:text-indigo-500 fill-slate-300 group-hover:fill-indigo-500" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════ WORD ENDINGS ══════════════════ */}
      {activeTab === 'endings' && (
        <div className="space-y-8">
          {/* -ed section */}
          <section className="space-y-4">
            <div className="premium-card p-6 bg-gradient-to-r from-rose-50 to-orange-50 border-rose-200">
              <h3 className="text-lg font-black text-rose-800 flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-rose-600" /> Cách phát âm đuôi -ED
              </h3>
              <p className="text-sm text-rose-700 leading-relaxed font-medium">
                Đuôi -ed (quá khứ đơn, phân từ) có 3 cách đọc: <strong>/t/</strong>, <strong>/d/</strong>, hoặc <strong>/ɪd/</strong> tùy thuộc vào âm cuối của động từ gốc.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ED_RULES.map((r, i) => (
                <div key={i} className="premium-card p-6 hover:shadow-xl transition-all space-y-3">
                  <div className="flex items-center gap-2">
                    <span className={cn("text-sm font-black px-3 py-1 rounded-full", i === 0 ? "bg-sky-100 text-sky-700" : i === 1 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700")}>{r.rule}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{r.condition}</p>
                  <div className="space-y-2">
                    {r.examples.map((ex, j) => (
                      <button key={j} onClick={() => speak(ex.word)} className="group w-full flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-primary/5 transition-all cursor-pointer">
                        <span className="font-bold text-sm text-slate-800">{ex.word}</span>
                        <span className="text-xs font-mono text-slate-400">{ex.ipa}</span>
                        <Play className="w-3 h-3 text-slate-300 group-hover:text-primary" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* -s/-es section */}
          <section className="space-y-4">
            <div className="premium-card p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <h3 className="text-lg font-black text-blue-800 flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-blue-600" /> Cách phát âm đuôi -S / -ES
              </h3>
              <p className="text-sm text-blue-700 leading-relaxed font-medium">
                Đuôi -s/-es (số nhiều, ngôi thứ 3 số ít) có 3 cách đọc: <strong>/s/</strong>, <strong>/z/</strong>, hoặc <strong>/ɪz/</strong> tùy thuộc vào âm cuối.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {S_RULES.map((r, i) => (
                <div key={i} className="premium-card p-6 hover:shadow-xl transition-all space-y-3">
                  <div className="flex items-center gap-2">
                    <span className={cn("text-sm font-black px-3 py-1 rounded-full", i === 0 ? "bg-sky-100 text-sky-700" : i === 1 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700")}>{r.rule}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{r.condition}</p>
                  <div className="space-y-2">
                    {r.examples.map((ex, j) => (
                      <button key={j} onClick={() => speak(ex.word)} className="group w-full flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-primary/5 transition-all cursor-pointer">
                        <span className="font-bold text-sm text-slate-800">{ex.word}</span>
                        <span className="text-xs font-mono text-slate-400">{ex.ipa}</span>
                        <Play className="w-3 h-3 text-slate-300 group-hover:text-primary" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ════════════════════════════════════════════ NOUNS & ARTICLES ═══════════════ */}
      {activeTab === 'nouns' && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="premium-card p-6 bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-200">
            <h3 className="text-lg font-black text-indigo-800 flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-indigo-600" /> Quy Tắc Danh Từ: Số Ít, Số Nhiều & Mạo Từ
            </h3>
            <p className="text-sm text-indigo-700 leading-relaxed font-medium">
              Học cách chuyển đổi danh từ số ít sang số nhiều, quy tắc thêm đuôi -s/-es, sử dụng mạo từ a/an chính xác và các danh từ không đếm được đặc trưng.
            </p>
          </div>

          {/* Sub-tabs */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 no-scrollbar">
            {[
              { id: 'rules' as const, label: 'Quy Tắc Số Nhiều (-s/-es)' },
              { id: 'irregular' as const, label: 'Từ Đặc Biệt (Bất Quy Tắc)' },
              { id: 'uncountable' as const, label: 'Danh Từ Không Đếm Được' },
              { id: 'articles' as const, label: 'Mạo Từ A / AN' },
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setNounSection(s.id)}
                className={cn(
                  "px-3 sm:px-4 py-2 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer",
                  nounSection === s.id ? "bg-indigo-600 text-white shadow-md" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Rules -s/-es */}
          {nounSection === 'rules' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PLURAL_RULES.map((r, i) => (
                <div key={i} className="premium-card p-6 hover:shadow-xl transition-all space-y-3 bg-white">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">{r.rule}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-bold">{r.condition}</p>
                  <div className="space-y-2">
                    {r.examples.map((ex, j) => (
                      <div key={j} className="flex flex-col gap-1 p-3 bg-slate-50 rounded-xl">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400 font-semibold">{ex.word} (ít) ➔</span>
                          <button onClick={() => speak(ex.plural)} className="group flex items-center gap-2 font-bold text-sm text-indigo-600 hover:underline">
                            {ex.plural} <span className="text-[11px] font-mono text-slate-400">{ex.ipa}</span>
                            <Play className="w-2.5 h-2.5 fill-indigo-600 text-indigo-600" />
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium">Ý nghĩa: {ex.vi}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Irregular Nouns */}
          {nounSection === 'irregular' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {IRREGULAR_NOUNS.map((noun, idx) => (
                <div key={idx} className="premium-card p-4 hover:shadow-lg transition-all bg-white border border-slate-200 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-400">Số ít:</span>
                        <button onClick={() => speak(noun.singular)} className="group flex items-center gap-1.5 font-bold text-sm text-slate-800 hover:text-indigo-600">
                          {noun.singular} <span className="text-[10px] font-mono text-slate-400">{noun.ipaSingular}</span>
                          <Play className="w-2.5 h-2.5 text-slate-400 group-hover:text-indigo-600" />
                        </button>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs font-semibold text-slate-400">Số nhiều:</span>
                        <button onClick={() => speak(noun.plural)} className="group flex items-center gap-1.5 font-bold text-sm text-indigo-600 hover:underline">
                          {noun.plural} <span className="text-[10px] font-mono text-slate-400">{noun.ipaPlural}</span>
                          <Play className="w-2.5 h-2.5 fill-indigo-600 text-indigo-600" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 font-medium text-center">Nghĩa: <span className="font-semibold text-slate-700">{noun.vi}</span></p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Uncountable Nouns */}
          {nounSection === 'uncountable' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl text-xs font-medium leading-relaxed text-left">
                👉 <strong>Quy tắc quan trọng:</strong> Danh từ không đếm được (Uncountable Nouns) không có dạng số nhiều (không thêm -s/-es) và không thể dùng với <strong>a/an</strong> trực tiếp. Để đếm chúng, ta phải sử dụng các <strong>từ chỉ đo lường/đóng gói</strong> cụ thể đi kèm.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {UNCOUNTABLE_NOUNS.map((noun, idx) => (
                  <div key={idx} className="premium-card p-4 hover:shadow-md transition-all bg-white border border-slate-100 flex flex-col justify-between">
                    <div className="flex justify-between items-start text-left">
                      <div>
                        <button onClick={() => speak(noun.term)} className="group flex items-center gap-1.5 font-bold text-slate-800 hover:text-indigo-600">
                          {noun.term} <span className="text-xs font-mono text-slate-400">{noun.ipa}</span>
                          <Play className="w-2.5 h-2.5 text-slate-400 group-hover:text-indigo-600" />
                        </button>
                        <p className="text-xs text-slate-400 font-medium mt-1">Nghĩa: {noun.vi}</p>
                      </div>
                      <div className="bg-indigo-50 border border-indigo-100 p-2.5 rounded-xl text-right">
                        <span className="text-[10px] font-semibold text-slate-400 block uppercase">Cụm từ đong đếm:</span>
                        <button onClick={() => speak(noun.measure)} className="group flex items-center gap-1 font-bold text-xs text-indigo-700 hover:underline mt-0.5">
                          {noun.measure} <Play className="w-2.5 h-2.5 fill-indigo-600 text-indigo-600 shrink-0" />
                        </button>
                        <span className="text-[10px] text-indigo-950 font-medium block mt-0.5">{noun.measureVi}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Articles A / AN */}
          {nounSection === 'articles' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ARTICLE_RULES.map((r, i) => (
                <div key={i} className="premium-card p-6 hover:shadow-xl transition-all space-y-3 bg-white text-left">
                  <div className="flex items-center gap-2">
                    <span className={cn("text-xs font-black px-3 py-1 rounded-full", i < 2 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700")}>
                      {r.rule}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">{r.condition}</p>
                  <div className="space-y-2">
                    {r.examples.map((ex, j) => (
                      <button key={j} onClick={() => speak(ex.word)} className="group w-full flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-indigo-50 transition-all cursor-pointer">
                        <span className="font-bold text-sm text-slate-800">{ex.word}</span>
                        <span className="text-xs font-mono text-slate-400">{ex.ipa}</span>
                        <Play className="w-3 h-3 text-slate-300 group-hover:text-indigo-600" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════ DATETIME ═══════════════════════ */}
      {activeTab === 'datetime' && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="premium-card p-6 bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200">
            <h3 className="text-lg font-black text-violet-800 flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-violet-600" /> Phát Âm Thứ, Tháng & Năm trong Tiếng Anh
            </h3>
            <p className="text-sm text-violet-700 leading-relaxed font-medium">
              Cách đọc chuẩn xác các thứ trong tuần, tháng trong năm và quy tắc đọc các mốc năm trong tiếng Anh kèm phiên âm IPA đầy đủ.
            </p>
          </div>

          {/* Sub-tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'days' as const, label: 'Thứ trong tuần' },
              { id: 'relative' as const, label: 'Từ chỉ Ngày/Thời gian' },
              { id: 'months' as const, label: 'Tháng trong năm' },
              { id: 'years' as const, label: 'Cách đọc Năm' },
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setDatetimeSection(s.id)}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer",
                  datetimeSection === s.id ? "bg-violet-600 text-white shadow-md" : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Days of week */}
          {datetimeSection === 'days' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {DAYS_OF_WEEK.map(d => (
                <button
                  key={d.day}
                  onClick={() => speak(d.day)}
                  className="group premium-card p-5 flex flex-col items-center justify-center text-center gap-2 hover:shadow-xl hover:-translate-y-0.5 transition-all border border-violet-100 bg-violet-50/10 cursor-pointer"
                >
                  <span className="text-[10px] font-black text-violet-500 uppercase tracking-widest bg-violet-100 px-2 py-0.5 rounded-md">{d.abbreviation}</span>
                  <span className="text-xl font-black text-slate-800">{d.day}</span>
                  <span className="text-xs font-mono text-slate-400 font-medium">{d.ipa}</span>
                  <span className="text-xs font-medium text-slate-500 border-t border-slate-100 w-full pt-1.5 mt-1">{d.vi}</span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-violet-500 flex items-center justify-center transition-colors mt-1">
                    <Play className="w-3.5 h-3.5 fill-slate-400 text-slate-400 group-hover:fill-white group-hover:text-white transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Relative time terms */}
          {datetimeSection === 'relative' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-in fade-in duration-300">
              {RELATIVE_TIME_WORDS.map((r, idx) => (
                <button
                  key={idx}
                  onClick={() => speak(r.term)}
                  className="group premium-card p-5 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all border border-violet-100 bg-violet-50/10 cursor-pointer text-left h-full"
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <span className="text-[9px] font-black text-violet-600 bg-violet-100/50 px-2 py-0.5 rounded-md uppercase tracking-widest">{r.category}</span>
                    <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-violet-500 flex items-center justify-center transition-colors">
                      <Play className="w-3 h-3 fill-slate-400 text-slate-400 group-hover:fill-white group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-black text-slate-800 leading-tight group-hover:text-violet-600 transition-colors">{r.term}</p>
                    <p className="text-xs font-mono text-slate-400 font-medium">{r.ipa}</p>
                    <p className="text-xs text-slate-500 font-bold mt-1">({r.vi})</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Months of year */}
          {datetimeSection === 'months' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {MONTHS_OF_YEAR.map(m => (
                <button
                  key={m.month}
                  onClick={() => speak(m.month)}
                  className="group premium-card p-5 flex items-center gap-4 hover:shadow-xl hover:-translate-y-0.5 transition-all border border-purple-100 bg-purple-50/10 cursor-pointer text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-black text-sm uppercase flex-shrink-0">
                    {m.abbreviation}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-black text-slate-800 leading-tight">{m.month}</p>
                    <p className="text-xs font-mono text-slate-400 font-medium">{m.ipa}</p>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{m.vi}</p>
                  </div>
                  <Play className="w-4 h-4 text-slate-200 group-hover:text-purple-600 flex-shrink-0 transition-colors" />
                </button>
              ))}
            </div>
          )}

          {/* Years rules */}
          {datetimeSection === 'years' && (
            <div className="space-y-4">
              <div className="premium-card p-4 bg-amber-50 border-amber-200 flex items-start gap-3 text-left">
                <Info className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-700 font-medium space-y-1">
                  <p><strong>Nguyên tắc chung:</strong> Đối với các năm trước năm 2000, ta thường chia đôi năm thành 2 cụm số hàng chục để đọc. Kể từ năm 2000 trở đi, có thể đọc cả số nghìn hoặc tiếp tục áp dụng quy tắc chia đôi.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {YEAR_RULES.map((y, idx) => (
                  <button
                    key={idx}
                    onClick={() => speak(y.read)}
                    className="group premium-card p-5 flex items-center gap-5 hover:shadow-xl transition-all text-left cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white flex items-center justify-center font-black text-lg flex-shrink-0 shadow-lg shadow-purple-500/10">
                      {y.example}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-black text-slate-800 leading-tight">{y.read}</p>
                      <p className="text-xs font-mono text-slate-400 font-medium mt-0.5">{y.ipa}</p>
                      <p className="text-xs text-violet-600 font-bold mt-1">💡 {y.rule}</p>
                    </div>
                    <Play className="w-5 h-5 text-slate-200 group-hover:text-violet-600 flex-shrink-0 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════ COUNTRIES & NATIONALITIES ════ */}
      {activeTab === 'countries' && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="premium-card p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
            <h3 className="text-lg font-black text-emerald-800 flex items-center gap-2 mb-2">
              <Globe className="w-5 h-5 text-emerald-600" /> Tên Quốc Gia & Quốc Tịch (Countries & Nationalities)
            </h3>
            <p className="text-sm text-emerald-700 leading-relaxed font-medium">
              Luyện phát âm chuẩn xác tên các quốc gia lớn trên thế giới và danh từ chỉ quốc tịch/ngôn ngữ tương ứng kèm phiên âm quốc tế IPA.
            </p>
          </div>

          {/* Search & Region Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm quốc gia hoặc quốc tịch..."
                value={countrySearch}
                onChange={(e) => setCountrySearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:outline-none placeholder-slate-400 text-slate-800"
              />
            </div>

            {/* Region Filter Buttons */}
            <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 no-scrollbar">
              {['All', 'Asia', 'Middle East', 'Europe', 'Americas', 'Africa', 'Oceania'].map(reg => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer",
                    selectedRegion === reg
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
                  )}
                >
                  {reg === 'All' ? 'Tất cả' : reg}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Countries */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {COUNTRIES_DATA.filter(c => {
              const matchesSearch = c.country.toLowerCase().includes(countrySearch.toLowerCase()) || 
                                    c.nationality.toLowerCase().includes(countrySearch.toLowerCase()) || 
                                    c.vi.toLowerCase().includes(countrySearch.toLowerCase());
              const matchesRegion = selectedRegion === 'All' || c.region === selectedRegion;
              return matchesSearch && matchesRegion;
            }).map((c, idx) => (
              <div
                key={idx}
                className="premium-card p-5 flex flex-col justify-between hover:shadow-xl transition-all border border-slate-100 bg-white"
              >
                {/* Header Flag & Vietnamese translation */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl filter drop-shadow-sm select-none">{c.flag}</span>
                  <span className="text-[10px] font-black text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full uppercase tracking-wider">{c.region}</span>
                </div>

                {/* Country section */}
                <div className="space-y-4">
                  <div className="text-left">
                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest block mb-0.5 text-left">Quốc Gia (Country)</span>
                    <button
                      onClick={() => speak(c.country)}
                      className="group flex items-center gap-2 hover:text-emerald-600 transition-colors text-left cursor-pointer"
                    >
                      <span className="text-base font-black text-slate-800 group-hover:text-emerald-600 transition-colors">{c.country}</span>
                      <Play className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-600 fill-slate-100 group-hover:fill-emerald-100 transition-all flex-shrink-0" />
                    </button>
                    <p className="text-xs font-mono text-slate-400 font-medium mt-0.5 text-left">{c.countryIpa}</p>
                    <p className="text-xs text-slate-500 font-bold mt-1 text-left">({c.vi})</p>
                  </div>

                  {/* Nationality section */}
                  <div className="pt-3 border-t border-slate-100 text-left">
                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest block mb-0.5 text-left">Quốc Tịch / Ngôn Ngữ</span>
                    <button
                      onClick={() => speak(c.nationality)}
                      className="group flex items-center gap-2 hover:text-blue-600 transition-colors text-left cursor-pointer"
                    >
                      <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{c.nationality}</span>
                      <Play className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 fill-slate-100 group-hover:fill-blue-100 transition-all flex-shrink-0" />
                    </button>
                    <p className="text-xs font-mono text-slate-400 font-medium mt-0.5 text-left">{c.nationalityIpa}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {COUNTRIES_DATA.filter(c => {
            const matchesSearch = c.country.toLowerCase().includes(countrySearch.toLowerCase()) || 
                                  c.nationality.toLowerCase().includes(countrySearch.toLowerCase()) || 
                                  c.vi.toLowerCase().includes(countrySearch.toLowerCase());
            const matchesRegion = selectedRegion === 'All' || c.region === selectedRegion;
            return matchesSearch && matchesRegion;
          }).length === 0 && (
            <div className="text-center py-12 premium-card bg-slate-50/50">
              <p className="text-slate-400 font-medium text-sm">Không tìm thấy quốc gia phù hợp với từ khóa.</p>
            </div>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════ COMMUNICATION TOPICS ═══════════ */}
      {activeTab === 'topics' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-in fade-in duration-500 text-left">
          {/* Sidebar / Left Column: Topics List */}
          <div className="md:col-span-4 space-y-3">
            <div className="premium-card p-5 bg-gradient-to-r from-violet-50 to-indigo-50 border-violet-100 mb-2">
              <h3 className="text-sm font-black text-violet-850 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-violet-600" /> Học theo Chủ đề
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Chọn chủ đề bên dưới để luyện phát âm và thực hành nói các mẫu câu giao tiếp thông dụng.
              </p>
            </div>
            
            <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-2 pb-2 md:pb-0 no-scrollbar">
              {TOPIC_LESSONS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTopic(t.id)}
                  className={cn(
                    "flex-shrink-0 text-left p-2.5 md:p-4 rounded-xl md:rounded-2xl border-2 transition-all cursor-pointer w-auto md:w-full relative overflow-hidden",
                    selectedTopic === t.id
                      ? "border-violet-600 bg-violet-50/40 shadow-md shadow-violet-500/5"
                      : "border-slate-100 bg-white hover:border-slate-300 hover:shadow-sm"
                  )}
                >
                  {selectedTopic === t.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-violet-600 rounded-r-md hidden md:block" />
                  )}
                  <h4 className={cn("text-xs md:text-sm font-bold text-slate-800 transition-colors pl-1 whitespace-nowrap md:whitespace-normal", selectedTopic === t.id && "text-violet-750 font-black")}>{t.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 pl-1 font-medium line-clamp-1 hidden md:block">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Selected Topic's Phrases */}
          <div className="md:col-span-8 space-y-4">
            {TOPIC_LESSONS.map(t => {
              if (t.id !== selectedTopic) return null;
              return (
                <div key={t.id} className="space-y-4">
                  <div className="p-6 premium-card bg-white border border-slate-200">
                    <h3 className="text-xl font-black text-slate-800">{t.title}</h3>
                    <p className="text-sm text-slate-500 font-medium mt-1">{t.desc}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {t.phrases.map((phrase, idx) => (
                      <div
                        key={idx}
                        className="premium-card p-5 bg-white border border-slate-100 hover:border-violet-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
                      >
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="text-left">
                            <span className="text-[9px] font-black text-violet-600 uppercase tracking-widest block mb-1">Mẫu câu #{idx + 1}</span>
                            <h4 className="text-base font-black text-slate-850">{phrase.text}</h4>
                            <p className="text-xs font-mono text-slate-400 font-medium mt-1">{phrase.ipa}</p>
                            <p className="text-xs text-slate-500 font-bold mt-2">💡 {phrase.vi}</p>
                          </div>
                          
                          <button
                            onClick={() => speak(phrase.text)}
                            className="w-9 h-9 rounded-full bg-slate-50 hover:bg-violet-500 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-slate-100 flex-shrink-0"
                            title="Nghe phát âm chuẩn"
                          >
                            <Play className="w-4 h-4 fill-current" />
                          </button>
                        </div>

                        {/* Interactive Speech Practice block */}
                        <div className="mt-4 pt-4 border-t border-slate-100">
                          <SpeechPracticeSection targetWord={phrase.text} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
