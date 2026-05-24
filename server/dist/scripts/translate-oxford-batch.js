"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
require("dotenv/config");
const prisma_1 = __importDefault(require("../lib/prisma"));
const gemini_service_1 = require("../services/gemini.service");
async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// Hàm fallback sử dụng API Từ điển và Google Translate hoàn toàn miễn phí và không giới hạn
async function translateAndEnrichFreeFallback(word) {
    try {
        let phonetic = '';
        let meaningEn = '';
        let wordType = '';
        let example = '';
        // 1. Lấy thông tin từ Dictionary API
        try {
            const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
            if (dictRes.ok) {
                const dictData = await dictRes.json();
                if (dictData && Array.isArray(dictData) && dictData[0]) {
                    const entry = dictData[0];
                    phonetic = entry.phonetic || (entry.phonetics && entry.phonetics.find((p) => p.text)?.text) || (entry.phonetics && entry.phonetics[0]?.text) || '';
                    if (entry.meanings && entry.meanings[0]) {
                        const meaning = entry.meanings[0];
                        wordType = meaning.partOfSpeech || '';
                        if (meaning.definitions && meaning.definitions[0]) {
                            meaningEn = meaning.definitions[0].definition || '';
                        }
                        // Tìm ví dụ đầu tiên có sẵn
                        for (const m of entry.meanings) {
                            for (const d of m.definitions) {
                                if (d.example) {
                                    example = d.example;
                                    break;
                                }
                            }
                            if (example)
                                break;
                        }
                    }
                }
            }
        }
        catch (e) {
            console.log(`[Dict API] Không thể lấy metadata cho "${word}": ${e.message}`);
        }
        // Giá trị mặc định nếu API từ điển thất bại
        if (!meaningEn)
            meaningEn = `${word} is a vocabulary word.`;
        if (!example)
            example = `I will learn how to use the word "${word}".`;
        if (!wordType)
            wordType = 'n/v/adj';
        // 2. Dịch nghĩa từ sang tiếng Việt
        let meaningVi = '';
        try {
            const meaningViRes = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(word)}`);
            if (meaningViRes.ok) {
                const transData = await meaningViRes.json();
                meaningVi = transData[0]?.[0]?.[0]?.trim() || '';
            }
        }
        catch (e) {
            console.log(`[Translate API] Không thể dịch nghĩa cho "${word}": ${e.message}`);
        }
        if (!meaningVi)
            meaningVi = word;
        // 3. Dịch ví dụ sang tiếng Việt
        let exampleVi = '';
        try {
            const exampleViRes = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(example)}`);
            if (exampleViRes.ok) {
                const transData = await exampleViRes.json();
                exampleVi = transData[0]?.[0]?.[0]?.trim() || '';
            }
        }
        catch (e) {
            console.log(`[Translate API] Không thể dịch ví dụ cho "${word}": ${e.message}`);
        }
        if (!exampleVi)
            exampleVi = `Bản dịch ví dụ của từ "${word}".`;
        const vietnameseTypeMap = {
            'noun': 'Danh từ',
            'verb': 'Động từ',
            'adjective': 'Tính từ',
            'adverb': 'Trạng từ',
            'preposition': 'Giới từ',
            'conjunction': 'Liên từ',
            'pronoun': 'Đại từ'
        };
        const mappedType = vietnameseTypeMap[wordType.toLowerCase()] || wordType;
        return {
            word,
            phonetic,
            meaningEn,
            meaningVi,
            wordType,
            usage: `Dùng như một ${mappedType.toLowerCase()} thông dụng trong tiếng Anh.`,
            example,
            exampleVi
        };
    }
    catch (err) {
        console.error(`Lỗi fallback hoàn toàn cho từ "${word}":`, err.message);
        return null;
    }
}
async function main() {
    console.log('=== KHỞI ĐỘNG TIẾN TRÌNH DỊCH TỪ VỰNG OXFORD 3000 SANG TIẾNG VIỆT ===');
    // 1. Tìm tất cả các từ chưa được dịch
    const untranslated = await prisma_1.default.vocabularyWord.findMany({
        where: {
            meaningVi: ''
        },
        select: {
            id: true,
            word: true,
            cefrLevel: true
        },
        orderBy: {
            word: 'asc'
        }
    });
    const totalToTranslate = untranslated.length;
    console.log(`Tìm thấy tổng cộng: ${totalToTranslate} từ chưa được dịch sang tiếng Việt.`);
    if (totalToTranslate === 0) {
        console.log('Tất cả từ vựng đã được dịch đầy đủ! Không cần chạy tiến trình này.');
        return;
    }
    // 2. Chia theo batch (20 từ mỗi lần gọi API để tối ưu hóa hiệu năng và tốc độ)
    const BATCH_SIZE = 20;
    let translatedCount = 0;
    let failedCount = 0;
    for (let i = 0; i < totalToTranslate; i += BATCH_SIZE) {
        const chunk = untranslated.slice(i, i + BATCH_SIZE);
        const words = chunk.map((w) => w.word);
        console.log(`\n[Batch ${Math.floor(i / BATCH_SIZE) + 1}] Đang dịch nhóm ${i + 1} - ${Math.min(i + BATCH_SIZE, totalToTranslate)}...`);
        console.log(`Các từ trong nhóm: ${words.join(', ')}`);
        let batchResults = [];
        let isFallbackUsed = false;
        try {
            // Gọi dịch hàng loạt qua GeminiService
            const aiResults = await gemini_service_1.GeminiService.bulkTranslate(words);
            if (aiResults && Array.isArray(aiResults) && aiResults.length > 0) {
                batchResults = aiResults;
            }
            else {
                console.log(`⚠️ Gemini API bị giới hạn quota hoặc lỗi. Đang kích hoạt chế độ Fallback Tốc độ cao miễn phí...`);
                isFallbackUsed = true;
            }
        }
        catch (err) {
            console.log(`⚠️ Lỗi Gemini API: ${err.message}. Đang kích hoạt chế độ Fallback Tốc độ cao miễn phí...`);
            isFallbackUsed = true;
        }
        // Nếu Gemini lỗi, chạy Fallback miễn phí song song cực kỳ nhanh
        if (isFallbackUsed) {
            const fallbackPromises = words.map((w) => translateAndEnrichFreeFallback(w));
            const fallbackResults = await Promise.all(fallbackPromises);
            batchResults = fallbackResults.filter(Boolean);
        }
        if (batchResults && batchResults.length > 0) {
            for (const ai of batchResults) {
                if (!ai || !ai.word || !ai.meaningVi) {
                    continue;
                }
                // Khớp từ vựng với DB (case-insensitive)
                const dbItem = chunk.find((item) => item.word.toLowerCase() === ai.word.toLowerCase());
                if (!dbItem) {
                    continue;
                }
                try {
                    await prisma_1.default.vocabularyWord.update({
                        where: { id: dbItem.id },
                        data: {
                            meaningVi: ai.meaningVi,
                            meaningEn: ai.meaningEn || dbItem.word,
                            phonetic: ai.phonetic || '',
                            wordType: ai.wordType || '',
                            usage: ai.usage || '',
                            example: ai.example || '',
                            exampleVi: ai.exampleVi || '',
                            cefrLevel: dbItem.cefrLevel && dbItem.cefrLevel !== 'OXFORD3000' && dbItem.cefrLevel !== 'Custom'
                                ? dbItem.cefrLevel
                                : (ai.cefrLevel || 'B1')
                        }
                    });
                    translatedCount++;
                }
                catch (updateErr) {
                    console.error(`❌ Lỗi cập nhật từ "${ai.word}" vào DB:`, updateErr.message);
                    failedCount++;
                }
            }
            console.log(`✅ Đã dịch thành công: ${translatedCount}/${totalToTranslate} từ.`);
        }
        else {
            console.error(`⚠️ Phản hồi từ AI và Fallback đều thất bại cho nhóm này.`);
            failedCount += chunk.length;
        }
        // Tránh quá tải API ngoài
        if (i + BATCH_SIZE < totalToTranslate) {
            const restTime = isFallbackUsed ? 300 : 1500; // fallback chạy cực nhanh chỉ cần nghỉ 300ms
            console.log(`Đang nghỉ ${restTime}ms để tránh quá tải API...`);
            await delay(restTime);
        }
    }
    console.log(`\n=== HOÀN THÀNH TIẾN TRÌNH ===`);
    console.log(`Tổng số từ đã dịch thành công: ${translatedCount}`);
    console.log(`Tổng số từ gặp lỗi: ${failedCount}`);
    console.log(`Còn lại cần dịch: ${totalToTranslate - translatedCount}`);
}
main()
    .catch((e) => {
    console.error('Lỗi nghiêm trọng trong quá trình dịch:', e);
})
    .finally(async () => {
    await prisma_1.default.$disconnect();
});
