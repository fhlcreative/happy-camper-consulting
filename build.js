const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'insights', 'articles');
const outFile = path.join(__dirname, 'insights', 'articles.json');

const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));

// Normalize dates to YYYY-MM-DD regardless of input format
function normalizeDate(dateStr) {
  const isoDate = dateStr.split('T')[0];
  // Handle MM/DD/YYYY from Decap CMS
  const slashMatch = isoDate.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (slashMatch) {
    const [, m, d, y] = slashMatch;
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }
  return isoDate;
}

const articles = files.map(file => {
  const raw = fs.readFileSync(path.join(articlesDir, file), 'utf8');
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const fm = {};
  match[1].split('\n').forEach(line => {
    const i = line.indexOf(':');
    if (i > -1) {
      const key = line.slice(0, i).trim();
      const val = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
      fm[key] = val;
    }
  });

  return {
    slug: file.replace(/\.md$/, ''),
    title: fm.title || '',
    date: fm.date ? normalizeDate(fm.date) : '',
    category: fm.category || '',
    excerpt: fm.excerpt || '',
    image: fm.featured_image || ''
  };
}).filter(Boolean);

const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
const published = articles.filter(a => a.date <= today);
const scheduled = articles.length - published.length;

fs.writeFileSync(outFile, JSON.stringify(published, null, 2));
console.log('Built articles.json: ' + published.length + ' published' + (scheduled ? ', ' + scheduled + ' scheduled' : '') + '.');
