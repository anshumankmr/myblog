import { writeFileSync, mkdirSync, readdirSync, unlinkSync } from 'fs';
import { join } from 'path';

const API_BASE = 'https://glass-approach-204914.uc.r.appspot.com/api';
const OUT_DIR = new URL('../content/blogs', import.meta.url).pathname;

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function getDatePath(dateString) {
  const d = new Date(dateString);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

async function main() {
  const res = await fetch(`${API_BASE}/blogs`);
  if (!res.ok) throw new Error(`Strapi returned ${res.status}`);
  const { data: blogs } = await res.json();

  mkdirSync(OUT_DIR, { recursive: true });

  // Remove stale files from a previous fetch
  for (const f of readdirSync(OUT_DIR)) {
    if (f.endsWith('.md')) unlinkSync(join(OUT_DIR, f));
  }

  for (const blog of blogs) {
    const { Title, date, articleId, Content } = blog.attributes;
    const slug = generateSlug(Title);
    const datePath = getDatePath(date);
    const fm = [
      '---',
      `title: ${JSON.stringify(Title)}`,
      `date: "${datePath}"`,
      `articleId: "${articleId}"`,
      `slug: "${slug}"`,
      '---',
      '',
    ].join('\n');
    writeFileSync(join(OUT_DIR, `${datePath}-${slug}.md`), fm + '\n' + Content, 'utf8');
  }

  console.log(`✓ Fetched ${blogs.length} posts from Strapi → content/blogs/`);
}

main().catch(e => { console.error(e); process.exit(1); });
