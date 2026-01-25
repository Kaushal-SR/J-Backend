(async () => {
  const fetch = globalThis.fetch || (await import('node-fetch')).default;

  const hiragana = [
    { symbol: 'あ', romaji: 'a', explanation: 'あ', example: 'あめ', audioUrl: '' },
    { symbol: 'い', romaji: 'i', explanation: 'い', example: 'いぬ', audioUrl: '' },
    { symbol: 'う', romaji: 'u', explanation: 'う', example: 'うみ', audioUrl: '' },
    { symbol: 'え', romaji: 'e', explanation: 'え', example: 'えき', audioUrl: '' },
    { symbol: 'お', romaji: 'o', explanation: 'お', example: 'おかね', audioUrl: '' },

    { symbol: 'か', romaji: 'ka', explanation: 'か', example: 'かさ', audioUrl: '' },
    { symbol: 'き', romaji: 'ki', explanation: 'き', example: 'き', audioUrl: '' },
    { symbol: 'く', romaji: 'ku', explanation: 'く', example: 'くつ', audioUrl: '' },
    { symbol: 'け', romaji: 'ke', explanation: 'け', example: 'け', audioUrl: '' },
    { symbol: 'こ', romaji: 'ko', explanation: 'こ', example: 'こ', audioUrl: '' },

    { symbol: 'さ', romaji: 'sa', explanation: 'さ', example: 'さかな', audioUrl: '' },
    { symbol: 'し', romaji: 'shi', explanation: 'し', example: 'しお', audioUrl: '' },
    { symbol: 'す', romaji: 'su', explanation: 'す', example: 'すし', audioUrl: '' },
    { symbol: 'せ', romaji: 'se', explanation: 'せ', example: 'せん', audioUrl: '' },
    { symbol: 'そ', romaji: 'so', explanation: 'そ', example: 'そら', audioUrl: '' },

    { symbol: 'た', romaji: 'ta', explanation: 'た', example: 'たべる', audioUrl: '' },
    { symbol: 'ち', romaji: 'chi', explanation: 'ち', example: 'ち', audioUrl: '' },
    { symbol: 'つ', romaji: 'tsu', explanation: 'つ', example: 'つき', audioUrl: '' },
    { symbol: 'て', romaji: 'te', explanation: 'て', example: 'て', audioUrl: '' },
    { symbol: 'と', romaji: 'to', explanation: 'と', example: 'とり', audioUrl: '' },

    { symbol: 'な', romaji: 'na', explanation: 'な', example: 'な', audioUrl: '' },
    { symbol: 'に', romaji: 'ni', explanation: 'に', example: 'にく', audioUrl: '' },
    { symbol: 'ぬ', romaji: 'nu', explanation: 'ぬ', example: 'ぬ', audioUrl: '' },
    { symbol: 'ね', romaji: 'ne', explanation: 'ね', example: 'ねこ', audioUrl: '' },
    { symbol: 'の', romaji: 'no', explanation: 'の', example: 'の', audioUrl: '' },

    { symbol: 'は', romaji: 'ha', explanation: 'は', example: 'はな', audioUrl: '' },
    { symbol: 'ひ', romaji: 'hi', explanation: 'ひ', example: 'ひ', audioUrl: '' },
    { symbol: 'ふ', romaji: 'fu', explanation: 'ふ', example: 'ふね', audioUrl: '' },
    { symbol: 'へ', romaji: 'he', explanation: 'へ', example: 'へ', audioUrl: '' },
    { symbol: 'ほ', romaji: 'ho', explanation: 'ほ', example: 'ほし', audioUrl: '' },

    { symbol: 'ま', romaji: 'ma', explanation: 'ま', example: 'まど', audioUrl: '' },
    { symbol: 'み', romaji: 'mi', explanation: 'み', example: 'みず', audioUrl: '' },
    { symbol: 'む', romaji: 'mu', explanation: 'む', example: 'むし', audioUrl: '' },
    { symbol: 'め', romaji: 'me', explanation: 'め', example: 'め', audioUrl: '' },
    { symbol: 'も', romaji: 'mo', explanation: 'も', example: 'もも', audioUrl: '' },

    { symbol: 'や', romaji: 'ya', explanation: 'や', example: 'やま', audioUrl: '' },
    { symbol: 'ゆ', romaji: 'yu', explanation: 'ゆ', example: 'ゆき', audioUrl: '' },
    { symbol: 'よ', romaji: 'yo', explanation: 'よ', example: 'よる', audioUrl: '' },

    { symbol: 'ら', romaji: 'ra', explanation: 'ら', example: 'らい', audioUrl: '' },
    { symbol: 'り', romaji: 'ri', explanation: 'り', example: 'りんご', audioUrl: '' },
    { symbol: 'る', romaji: 'ru', explanation: 'る', example: 'る', audioUrl: '' },
    { symbol: 'れ', romaji: 're', explanation: 'れ', example: 'れき', audioUrl: '' },
    { symbol: 'ろ', romaji: 'ro', explanation: 'ろ', example: 'ろく', audioUrl: '' },

    { symbol: 'わ', romaji: 'wa', explanation: 'わ', example: 'わ', audioUrl: '' },
    { symbol: 'を', romaji: 'wo', explanation: 'を', example: 'を', audioUrl: '' },
    { symbol: 'ん', romaji: 'n', explanation: 'ん', example: 'ん', audioUrl: '' }
  ];

  const katakana = [
    { symbol: 'ア', romaji: 'a', explanation: 'ア', example: 'アイス', audioUrl: '' },
    { symbol: 'イ', romaji: 'i', explanation: 'イ', example: 'イカ', audioUrl: '' },
    { symbol: 'ウ', romaji: 'u', explanation: 'ウ', example: 'ウサギ', audioUrl: '' },
    { symbol: 'エ', romaji: 'e', explanation: 'エ', example: 'エビ', audioUrl: '' },
    { symbol: 'オ', romaji: 'o', explanation: 'オ', example: 'オト', audioUrl: '' },

    { symbol: 'カ', romaji: 'ka', explanation: 'カ', example: 'カメ', audioUrl: '' },
    { symbol: 'キ', romaji: 'ki', explanation: 'キ', example: 'キ', audioUrl: '' },
    { symbol: 'ク', romaji: 'ku', explanation: 'ク', example: 'クツ', audioUrl: '' },
    { symbol: 'ケ', romaji: 'ke', explanation: 'ケ', example: 'ケ', audioUrl: '' },
    { symbol: 'コ', romaji: 'ko', explanation: 'コ', example: 'コ', audioUrl: '' },

    { symbol: 'サ', romaji: 'sa', explanation: 'サ', example: 'サカナ', audioUrl: '' },
    { symbol: 'シ', romaji: 'shi', explanation: 'シ', example: 'シ', audioUrl: '' },
    { symbol: 'ス', romaji: 'su', explanation: 'ス', example: 'スシ', audioUrl: '' },
    { symbol: 'セ', romaji: 'se', explanation: 'セ', example: 'セ', audioUrl: '' },
    { symbol: 'ソ', romaji: 'so', explanation: 'ソ', example: 'ソラ', audioUrl: '' },

    { symbol: 'タ', romaji: 'ta', explanation: 'タ', example: 'タ', audioUrl: '' },
    { symbol: 'チ', romaji: 'chi', explanation: 'チ', example: 'チ', audioUrl: '' },
    { symbol: 'ツ', romaji: 'tsu', explanation: 'ツ', example: 'ツキ', audioUrl: '' },
    { symbol: 'テ', romaji: 'te', explanation: 'テ', example: 'テ', audioUrl: '' },
    { symbol: 'ト', romaji: 'to', explanation: 'ト', example: 'トリ', audioUrl: '' },

    { symbol: 'ナ', romaji: 'na', explanation: 'ナ', example: 'ナ', audioUrl: '' },
    { symbol: 'ニ', romaji: 'ni', explanation: 'ニ', example: 'ニク', audioUrl: '' },
    { symbol: 'ヌ', romaji: 'nu', explanation: 'ヌ', example: 'ヌ', audioUrl: '' },
    { symbol: 'ネ', romaji: 'ne', explanation: 'ネ', example: 'ネコ', audioUrl: '' },
    { symbol: 'ノ', romaji: 'no', explanation: 'ノ', example: 'ノ', audioUrl: '' },

    { symbol: 'ハ', romaji: 'ha', explanation: 'ハ', example: 'ハナ', audioUrl: '' },
    { symbol: 'ヒ', romaji: 'hi', explanation: 'ヒ', example: 'ヒ', audioUrl: '' },
    { symbol: 'フ', romaji: 'fu', explanation: 'フ', example: 'フネ', audioUrl: '' },
    { symbol: 'ヘ', romaji: 'he', explanation: 'ヘ', example: 'ヘ', audioUrl: '' },
    { symbol: 'ホ', romaji: 'ho', explanation: 'ホ', example: 'ホシ', audioUrl: '' },

    { symbol: 'マ', romaji: 'ma', explanation: 'マ', example: 'マ', audioUrl: '' },
    { symbol: 'ミ', romaji: 'mi', explanation: 'ミ', example: 'ミズ', audioUrl: '' },
    { symbol: 'ム', romaji: 'mu', explanation: 'ム', example: 'ムシ', audioUrl: '' },
    { symbol: 'メ', romaji: 'me', explanation: 'メ', example: 'メ', audioUrl: '' },
    { symbol: 'モ', romaji: 'mo', explanation: 'モ', example: 'モモ', audioUrl: '' },

    { symbol: 'ヤ', romaji: 'ya', explanation: 'ヤ', example: 'ヤマ', audioUrl: '' },
    { symbol: 'ユ', romaji: 'yu', explanation: 'ユ', example: 'ユキ', audioUrl: '' },
    { symbol: 'ヨ', romaji: 'yo', explanation: 'ヨ', example: 'ヨル', audioUrl: '' },

    { symbol: 'ラ', romaji: 'ra', explanation: 'ラ', example: 'ラ', audioUrl: '' },
    { symbol: 'リ', romaji: 'ri', explanation: 'リ', example: 'リンゴ', audioUrl: '' },
    { symbol: 'ル', romaji: 'ru', explanation: 'ル', example: 'ル', audioUrl: '' },
    { symbol: 'レ', romaji: 're', explanation: 'レ', example: 'レキ', audioUrl: '' },
    { symbol: 'ロ', romaji: 'ro', explanation: 'ロ', example: 'ロク', audioUrl: '' },

    { symbol: 'ワ', romaji: 'wa', explanation: 'ワ', example: 'ワ', audioUrl: '' },
    { symbol: 'ヲ', romaji: 'wo', explanation: 'ヲ', example: 'ヲ', audioUrl: '' },
    { symbol: 'ン', romaji: 'n', explanation: 'ン', example: 'ン', audioUrl: '' }
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
    console.log('Full seeding done');
  } catch (e) {
    console.error('Error seeding', e);
  }
})();