(async () => {
  const fetch = globalThis.fetch || (await import('node-fetch')).default;
  const hiragana = [
    { symbol: 'あ', romaji: 'a', explanation: 'Vowel あ', example: 'あめ', audioUrl: '' },
    { symbol: 'い', romaji: 'i', explanation: 'Vowel い', example: 'いぬ', audioUrl: '' },
    { symbol: 'う', romaji: 'u', explanation: 'Vowel う', example: 'うみ', audioUrl: '' },
    { symbol: 'え', romaji: 'e', explanation: 'Vowel え', example: 'えき', audioUrl: '' },
    { symbol: 'お', romaji: 'o', explanation: 'Vowel お', example: 'おかね', audioUrl: '' }
  ];

  const katakana = [
    { symbol: 'ア', romaji: 'a', explanation: 'Vowel ア', example: 'アイス', audioUrl: '' },
    { symbol: 'イ', romaji: 'i', explanation: 'Vowel イ', example: 'イカ', audioUrl: '' },
    { symbol: 'ウ', romaji: 'u', explanation: 'Vowel ウ', example: 'ウサギ', audioUrl: '' },
    { symbol: 'エ', romaji: 'e', explanation: 'Vowel エ', example: 'エビ', audioUrl: '' },
    { symbol: 'オ', romaji: 'o', explanation: 'Vowel オ', example: 'オト', audioUrl: '' }
  ];

  async function postBulk(url, data) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const body = await res.text();
    console.log(url, res.status, body);
  }

  try {
    await postBulk('http://localhost:3000/hiragana/bulk', hiragana);
    await postBulk('http://localhost:3000/katakana/bulk', katakana);
    console.log('Seeding done');
  } catch (e) {
    console.error('Error seeding', e);
  }
})();