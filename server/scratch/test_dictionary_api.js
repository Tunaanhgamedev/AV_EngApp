async function test() {
  const word = 'age';
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (res.ok) {
      const data = await res.json();
      console.log('DICTIONARY API DATA:', JSON.stringify(data[0], null, 2));
    } else {
      console.log('Failed to fetch from Dictionary API:', res.status);
    }
  } catch (err) {
    console.error('Error fetching from Dictionary API:', err);
  }
}

test();
