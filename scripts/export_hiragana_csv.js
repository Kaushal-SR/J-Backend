(async () => {
  try {
    const fetch = globalThis.fetch || (await import('node-fetch')).default;
    const res = await fetch('http://localhost:3000/hiragana');
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    const data = await res.json();

    const headers = ['id','symbol','romaji','explanation','example','imageUrl','audioUrl','isRead','createdAt'];
    const escape = (v) => {
      if (v === null || v === undefined) return '';
      const s = String(v);
      return '"' + s.replace(/"/g, '""') + '"';
    };

    const rows = data.map(item => headers.map(h => escape(item[h])).join(','));
    const csv = headers.join(',') + '\n' + rows.join('\n');

    const fs = await import('fs');
    const outPath = new URL('../hiragana.csv', import.meta.url);
    fs.writeFileSync(outPath, csv, { encoding: 'utf8' });
    console.log('hiragana.csv written to', outPath.pathname.replace(/^\//, ''));
  } catch (err) {
    console.error('Failed to export hiragana CSV:', err);
    process.exit(1);
  }
})();
