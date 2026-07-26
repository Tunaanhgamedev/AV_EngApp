export const speak = (text: string, rate: number = 0.7) => {
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

export function conjugateVerb(verb: string, subject: string, tense: string) {
  const sub = subject.trim();
  const is3rdSingular = ['He', 'She', 'It'].includes(sub);
  const is1stSingular = sub === 'I';

  const verbForms: Record<string, { v1: string; v2: string; v3: string; ving: string; vs: string; vi: string }> = {
    be: { v1: 'be', v2: 'was/were', v3: 'been', ving: 'being', vs: 'is', vi: 'thì, là, ở' },
    have: { v1: 'have', v2: 'had', v3: 'had', ving: 'having', vs: 'has', vi: 'có' },
    do: { v1: 'do', v2: 'did', v3: 'done', ving: 'doing', vs: 'does', vi: 'làm' },
    go: { v1: 'go', v2: 'went', v3: 'gone', ving: 'going', vs: 'goes', vi: 'đi' },
    make: { v1: 'make', v2: 'made', v3: 'made', ving: 'making', vs: 'makes', vi: 'chế tạo, làm ra' },
    know: { v1: 'know', v2: 'knew', v3: 'known', ving: 'knowing', vs: 'knows', vi: 'biết' },
    think: { v1: 'think', v2: 'thought', v3: 'thought', ving: 'thinking', vs: 'thinks', vi: 'nghĩ' },
    see: { v1: 'see', v2: 'saw', v3: 'seen', ving: 'seeing', vs: 'sees', vi: 'nhìn thấy' },
    run: { v1: 'run', v2: 'ran', v3: 'run', ving: 'running', vs: 'runs', vi: 'chạy' },
    speak: { v1: 'speak', v2: 'spoke', v3: 'spoken', ving: 'speaking', vs: 'speaks', vi: 'nói' },
    work: { v1: 'work', v2: 'worked', v3: 'worked', ving: 'working', vs: 'works', vi: 'làm việc' },
    play: { v1: 'play', v2: 'played', v3: 'played', ving: 'playing', vs: 'plays', vi: 'chơi' },
    study: { v1: 'study', v2: 'studied', v3: 'studied', ving: 'studying', vs: 'studies', vi: 'học tập' },
    write: { v1: 'write', v2: 'wrote', v3: 'written', ving: 'writing', vs: 'writes', vi: 'viết' },
    eat: { v1: 'eat', v2: 'ate', v3: 'eaten', ving: 'eating', vs: 'eats', vi: 'ăn' },
    drink: { v1: 'drink', v2: 'drank', v3: 'drunk', ving: 'drinking', vs: 'drinks', vi: 'uống' }
  };

  const info = verbForms[verb] || { v1: verb, v2: verb + 'ed', v3: verb + 'ed', ving: verb + 'ing', vs: verb + 's', vi: '' };

  let positive = '';
  let negative = '';
  let question = '';
  let explanation = '';
  let isStativeWarning = false;

  const stativeVerbs = ['know', 'believe', 'understand', 'remember', 'forget', 'prefer', 'mean', 'agree', 'see', 'have', 'think'];
  if (stativeVerbs.includes(verb) && tense === 'Present Continuous') {
    isStativeWarning = true;
  }

  if (tense === 'Present Simple') {
    if (verb === 'be') {
      const beForm = is1stSingular ? 'am' : is3rdSingular ? 'is' : 'are';
      positive = `${sub} ${beForm}.`;
      negative = `${sub} ${beForm} not.`;
      question = `${beForm.charAt(0).toUpperCase() + beForm.slice(1)} ${sub.toLowerCase()}?`;
      explanation = `Thì Hiện tại đơn với động từ "to be". Với chủ ngữ "${sub}", dạng chia là "${beForm}".`;
    } else {
      const vForm = is3rdSingular ? info.vs : info.v1;
      const aux = is3rdSingular ? 'does' : 'do';
      positive = `${sub} ${vForm}.`;
      negative = `${sub} ${aux} not ${info.v1}.`;
      question = `${aux.charAt(0).toUpperCase() + aux.slice(1)} ${sub.toLowerCase()} ${info.v1}?`;
      explanation = `Thì Hiện tại đơn với động từ thường. Với ngôi thứ ba số ít (He/She/It), thêm "-s/-es" vào động từ và dùng trợ động từ "does" trong câu phủ định/nghi vấn.`;
    }
  } else if (tense === 'Present Continuous') {
    const beForm = is1stSingular ? 'am' : is3rdSingular ? 'is' : 'are';
    positive = `${sub} ${beForm} ${info.ving}.`;
    negative = `${sub} ${beForm} not ${info.ving}.`;
    question = `${beForm.charAt(0).toUpperCase() + beForm.slice(1)} ${sub.toLowerCase()} ${info.ving}?`;
    explanation = `Thì Hiện tại tiếp diễn: S + am/is/are + V-ing. Diễn tả hành động đang xảy ra tại thời điểm nói.`;
    if (isStativeWarning) {
      explanation += `\n⚠️ Cảnh báo: "${verb}" là động từ trạng thái (stative verb), thường không dùng ở dạng tiếp diễn trong giao tiếp chuẩn trừ khi mang nghĩa đặc biệt (như đang cân nhắc, ngẫm nghĩ).`;
    }
  } else if (tense === 'Past Simple') {
    if (verb === 'be') {
      const wasWere = (is1stSingular || is3rdSingular) ? 'was' : 'were';
      positive = `${sub} ${wasWere}.`;
      negative = `${sub} ${wasWere} not.`;
      question = `${wasWere.charAt(0).toUpperCase() + wasWere.slice(1)} ${sub.toLowerCase()}?`;
      explanation = `Thì Quá khứ đơn với động từ "to be". Chủ ngữ số ít (I/He/She/It) chia là "was", chủ ngữ số nhiều/ngôi thứ 2 chia là "were".`;
    } else {
      positive = `${sub} ${info.v2}.`;
      negative = `${sub} did not ${info.v1}.`;
      question = `Did ${sub.toLowerCase()} ${info.v1}?`;
      explanation = `Thì Quá khứ đơn với động từ thường: Khẳng định dùng dạng V2 (${info.v2}). Phủ định và nghi vấn dùng trợ động từ "did" đưa động từ về nguyên mẫu V1 (${info.v1}).`;
    }
  } else if (tense === 'Present Perfect') {
    const aux = is3rdSingular ? 'has' : 'have';
    positive = `${sub} ${aux} ${info.v3}.`;
    negative = `${sub} ${aux} not ${info.v3}.`;
    question = `${aux.charAt(0).toUpperCase() + aux.slice(1)} ${sub.toLowerCase()} ${info.v3}?`;
    explanation = `Thì Hiện tại hoàn thành: S + have/has + V3 (Past Participle). Dùng khi nói về trải nghiệm hoặc hành động vừa xảy ra có ảnh hưởng đến hiện tại.`;
  } else if (tense === 'Future Simple') {
    positive = `${sub} will ${info.v1}.`;
    negative = `${sub} will not ${info.v1}.`;
    question = `Will ${sub.toLowerCase()} ${info.v1}?`;
    explanation = `Thì Tương lai đơn: S + will + V1 (nguyên mẫu). Diễn tả quyết định tức thời hoặc dự đoán tương lai.`;
  }

  return { positive, negative, question, explanation, isStativeWarning };
}

export function analyzeUserVerb(input: string, baseVerb: string = 'go', commonVerbs: any[] = []) {
  const cleanInput = input.trim().toLowerCase();
  const base = baseVerb.trim().toLowerCase();

  const verbEntry = commonVerbs.find(v => v.verb.toLowerCase() === base);
  const v1 = base;
  const v2 = verbEntry ? verbEntry.v2.toLowerCase() : '';
  const v3 = verbEntry ? verbEntry.v3.toLowerCase() : '';

  let detectedForm = '';
  let tenseDescription = '';
  let matchClues = '';
  let formula = '';

  const isVing = cleanInput === base + 'ing' || 
                 (base.endsWith('e') && cleanInput === base.slice(0, -1) + 'ing') || 
                 (base.endsWith('y') && cleanInput === base.slice(0, -1) + 'ying') || 
                 cleanInput.endsWith('ing');
  const isVes = cleanInput === base + 's' || 
                cleanInput === base + 'es' || 
                (base.endsWith('y') && cleanInput === base.slice(0, -1) + 'ies');

  if (cleanInput === v1) {
    detectedForm = 'V1 (Bare Infinitive / Nguyên mẫu)';
    tenseDescription = 'Hình thái nguyên mẫu của động từ (infinitive form) chưa qua biến đổi.';
    matchClues = 'Thường xuất hiện trong các câu hỏi có chủ ngữ số nhiều (I, you, we, they) ở thì Hiện tại đơn, sau các trợ động từ phủ định (don\'t, doesn\'t, didn\'t), động từ khuyết thiếu (should, can, must...), hoặc dùng trong cấu trúc To-infinitive (to + V1).';
    formula = 'Subject + V1  hoặc  modal + V1  hoặc  to + V1';
  } else if (v2 && cleanInput === v2) {
    detectedForm = 'V2 (Past Simple / Quá khứ đơn)';
    tenseDescription = 'Hình thái quá khứ đơn của động từ, dùng để mô tả một sự kiện đã kết thúc trong quá khứ.';
    matchClues = 'Thường xuất hiện trong các câu hỏi chứa trạng từ thời gian quá khứ rõ ràng như: yesterday, ago, last night, last year, in + năm quá khứ (ví dụ: in 2015), hoặc mệnh đề bắt đầu bằng "when I was...".';
    formula = 'Subject + V2';
  } else if (v3 && cleanInput === v3) {
    detectedForm = 'V3 (Past Participle / Phân từ hai)';
    tenseDescription = 'Hình thái phân từ hai của động từ, dùng trong các cấu trúc hoàn thành hoặc bị động.';
    matchClues = 'Xuất hiện trong câu hỏi có trợ động từ hoàn thành (have, has, had) để tạo thành thì hoàn thành (Hiện tại/Quá khứ hoàn thành), hoặc đứng sau động từ "to be" trong câu bị động (Passive Voice).';
    formula = 'have/has/had + V3  hoặc  be + V3 (Bị động)';
  } else if (isVing) {
    detectedForm = 'V-ing (Present Participle / Gerund)';
    tenseDescription = 'Hình thái thêm đuôi -ing để chỉ hành động tiếp diễn hoặc đóng vai trò danh động từ.';
    matchClues = 'Xuất hiện sau động từ "to be" (am, is, are, was, were) trong các thì tiếp diễn, hoặc làm tân ngữ sau giới từ và động từ chỉ cảm xúc/sở thích (enjoy, avoid, love, like, practice...).';
    formula = 'be + V-ing  hoặc  preposition/verb + V-ing';
  } else if (isVes) {
    detectedForm = 'V1 + -s/-es (Thì Hiện tại đơn chia theo ngôi thứ 3 số ít)';
    tenseDescription = 'Hình thái động từ thêm đuôi -s hoặc -es để chia cho chủ ngữ số ít ở hiện tại.';
    matchClues = 'Chỉ xuất hiện trong thì Hiện tại đơn khi chủ ngữ của câu hỏi là ngôi thứ ba số ít như: He, She, It, một người (John, Mary), hoặc một vật số ít.';
    formula = 'He/She/It + V-s/-es';
  } else if (cleanInput.startsWith('have ') || cleanInput.startsWith('has ') || cleanInput.startsWith('had ')) {
    detectedForm = 'Perfect Aspect (Dạng hoàn thành ghép)';
    tenseDescription = 'Dạng động từ ghép gồm trợ động từ hoàn thành + V3.';
    matchClues = 'Thường khớp với các câu hỏi về thì Hiện tại hoàn thành hoặc Quá khứ hoàn thành.';
    formula = 'have/has/had + V3';
  } else if (cleanInput.startsWith('am ') || cleanInput.startsWith('is ') || cleanInput.startsWith('are ') || cleanInput.startsWith('was ') || cleanInput.startsWith('were ')) {
    detectedForm = 'Continuous Aspect (Dạng tiếp diễn ghép)';
    tenseDescription = 'Dạng động từ ghép gồm động từ to be + V-ing.';
    matchClues = 'Thường khớp với các câu hỏi về thì Hiện tại tiếp diễn hoặc Quá khứ tiếp diễn.';
    formula = 'be + V-ing';
  } else {
    detectedForm = 'Hình thái tự do / Khác';
    tenseDescription = 'Không khớp chính xác với bất kỳ hình thái biến đổi độc lập nào (V1, V2, V3, V-ing, V-s/es) của động từ gốc.';
    matchClues = 'Vui lòng kiểm tra xem bạn có viết sai chính tả hoặc thêm các từ phụ trợ khác không.';
    formula = 'Chưa xác định';
  }

  return { detectedForm, tenseDescription, matchClues, formula };
}

export function predictVerbFormFromClue(clue: string, verb: string = 'eat', commonVerbs: any[] = []) {
  const v = verb.trim().toLowerCase();
  const verbEntry = commonVerbs.find(x => x.verb.toLowerCase() === v);
  const v1 = v;
  const v2 = verbEntry ? verbEntry.v2.toLowerCase() : v + 'ed';
  const v3 = verbEntry ? verbEntry.v3.toLowerCase() : v + 'ed';
  const vIng = v.endsWith('e') ? v.slice(0, -1) + 'ing' : v.endsWith('y') ? v.slice(0, -1) + 'ying' : v + 'ing';
  const vS = v.endsWith('y') ? v.slice(0, -1) + 'ies' : v.endsWith('o') || v.endsWith('ch') || v.endsWith('sh') || v.endsWith('x') || v.endsWith('s') ? v + 'es' : v + 's';

  let predictedForm = '';
  let predictedAnswer = '';
  let ruleName = '';
  let explanation = '';
  let sampleSentence = '';

  switch (clue) {
    case 'yesterday':
    case 'ago':
    case 'last_week':
    case 'in_past_year':
      predictedForm = 'V2 (Past Simple / Quá khứ đơn)';
      predictedAnswer = v2;
      ruleName = 'Thì Quá khứ đơn (Past Simple)';
      explanation = 'Trạng từ chỉ thời gian quá khứ xác định (yesterday, ago, last...) yêu cầu động từ chia ở dạng Quá khứ V2. Nếu là động từ bất quy tắc, sử dụng cột thứ 2. Nếu là động từ có quy tắc, thêm -ed.';
      sampleSentence = `I ${v2} dinner ${clue === 'in_past_year' ? 'in 2020' : clue === 'last_week' ? 'last week' : clue === 'ago' ? 'two days ago' : 'yesterday'}.`;
      break;
    case 'since':
    case 'for':
    case 'already':
    case 'yet':
    case 'so_far':
      predictedForm = 'Present Perfect (Hiện tại hoàn thành: have/has + V3)';
      predictedAnswer = `have/has ${v3}`;
      ruleName = 'Thì Hiện tại hoàn thành (Present Perfect)';
      explanation = 'Các từ chỉ mốc/khoảng thời gian kéo dài (since, for) hoặc hoàn thành hành động (already, yet, so far) báo hiệu thì Hiện tại hoàn thành. Ta dùng have/has + V3.';
      sampleSentence = `We have ${v3} this book ${clue === 'since' ? 'since yesterday' : clue === 'for' ? 'for a week' : 'already'}.`;
      break;
    case 'now':
    case 'at_the_moment':
    case 'look_listen':
      predictedForm = 'Present Continuous (Hiện tại tiếp diễn: am/is/are + V-ing)';
      predictedAnswer = `am/is/are ${vIng}`;
      ruleName = 'Thì Hiện tại tiếp diễn (Present Continuous)';
      explanation = 'Các cụm từ chỉ thời gian hiện tại tiếp diễn (now, at the moment) hoặc từ gây chú ý (Look!, Listen!) yêu cầu chia động từ ở thì tiếp diễn: am/is/are + V-ing.';
      sampleSentence = `Look! They are ${vIng} / She is ${vIng} right now.`;
      break;
    case 'tomorrow':
    case 'next_week':
      predictedForm = 'Future Simple (Tương lai đơn: will + V1)';
      predictedAnswer = `will ${v1}`;
      ruleName = 'Thì Tương lai đơn (Future Simple)';
      explanation = 'Trạng từ chỉ tương lai (tomorrow, next...) báo hiệu thì Tương lai đơn. Cấu trúc chia là trợ động từ will + động từ nguyên mẫu (V1).';
      sampleSentence = `I will ${v1} it ${clue === 'tomorrow' ? 'tomorrow' : 'next week'}.`;
      break;
    case 'always':
    case 'usually':
    case 'everyday':
      predictedForm = 'Present Simple (Hiện tại đơn: V1 hoặc V1 + -s/-es)';
      predictedAnswer = `Chủ ngữ số nhiều: ${v1} | Chủ ngữ số ít: ${vS}`;
      ruleName = 'Thì Hiện tại đơn (Present Simple)';
      explanation = 'Trạng từ tần suất chỉ thói quen, chu kỳ (always, usually, everyday) báo hiệu thì Hiện tại đơn. Chia V1 với chủ ngữ số nhiều (I, you, we, they) và V-s/es với chủ ngữ số ít (he, she, it).';
      sampleSentence = `He always ${vS} early, but they usually ${v1} late.`;
      break;
    case 'by_the_time':
      predictedForm = 'Past Perfect (Quá khứ hoàn thành: had + V3)';
      predictedAnswer = `had ${v3}`;
      ruleName = 'Thì Quá khứ hoàn thành (Past Perfect)';
      explanation = 'Cấu trúc "By the time + Past Simple" chỉ một hành động đã hoàn tất trước một mốc thời gian quá khứ khác, yêu cầu động từ chính chia ở thì Quá khứ hoàn thành: had + V3.';
      sampleSentence = `By the time they arrived, we had already ${v3}.`;
      break;
    case 'while':
      predictedForm = 'Past Continuous (Quá khứ tiếp diễn: was/were + V-ing)';
      predictedAnswer = `was/were ${vIng}`;
      ruleName = 'Thì Quá khứ tiếp diễn (Past Continuous)';
      explanation = 'Trạng từ "while" thường diễn tả một hành động đang diễn ra kéo dài trong quá khứ làm nền cho hành động khác. Ta chia: was/were + V-ing.';
      sampleSentence = `While she was ${vIng}, it started to rain.`;
      break;
    case 'modal_verbs':
      predictedForm = 'Bare Infinitive (Nguyên mẫu không "to": V1)';
      predictedAnswer = v1;
      ruleName = 'Động từ nguyên mẫu sau Động từ khuyết thiếu (Modal Verbs)';
      explanation = 'Sau các động từ khuyết thiếu như should, can, must, could, will, would, may, might..., động từ luôn giữ ở dạng nguyên mẫu không chia (V1).';
      sampleSentence = `You should ${v1} some water now.`;
      break;
    case 'to_infinitive_verbs':
      predictedForm = 'To-Infinitive (Động từ nguyên mẫu có "to": to + V1)';
      predictedAnswer = `to ${v1}`;
      ruleName = 'Động từ nguyên mẫu có "to" (To-Infinitive)';
      explanation = 'Sau một số động từ chỉ ý định, ước muốn như decide, want, hope, plan, refuse, agree, manage..., động từ đi kèm sau đó phải ở dạng to-Infinitive.';
      sampleSentence = `They decided to ${v1} out tonight.`;
      break;
    case 'gerund_verbs':
      predictedForm = 'Gerund (Danh động từ: V-ing)';
      predictedAnswer = vIng;
      ruleName = 'Danh động từ (Gerund - V-ing) sau động từ chỉ định';
      explanation = 'Sau các động từ chỉ sở thích/ghét hoặc tránh né như enjoy, avoid, dislike, finish, mind, practice..., động từ đi kèm sau đó phải ở dạng V-ing.';
      sampleSentence = `She enjoys ${vIng} here.`;
      break;
    default:
      predictedForm = 'Không xác định';
      predictedAnswer = v1;
      ruleName = 'Chưa xác định quy tắc';
      explanation = 'Hãy cung cấp một trạng từ hoặc dấu hiệu thời gian hợp lệ.';
      sampleSentence = '';
  }

  return { predictedForm, predictedAnswer, ruleName, explanation, sampleSentence };
}
