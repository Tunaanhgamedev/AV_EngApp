async function test() {
  const word = 'angle';
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(word)}`;
  try {
    const res = await fetch(url);
    console.log("Status:", res.status);
    if (res.ok) {
      const data = await res.json();
      console.log("Response data:", JSON.stringify(data));
      const meaning = data[0]?.map(x => x[0]).join('').trim() || '';
      console.log("Extracted meaning:", meaning);
    } else {
      const txt = await res.text();
      console.log("Error text:", txt);
    }
  } catch (e) {
    console.error("Fetch failed:", e);
  }
}

test();
