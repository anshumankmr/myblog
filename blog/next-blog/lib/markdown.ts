import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeShiki from '@shikijs/rehype';
import rehypeStringify from 'rehype-stringify';
import { toString } from 'mdast-util-to-string';

const parser = unified().use(remarkParse).use(remarkGfm);
const renderer = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(rehypeShiki, { theme: 'github-dark', fallbackLanguage: 'text' })
  .use(rehypeStringify);

export async function renderMarkdown(content: string): Promise<string> {
  return String(await renderer.process(content));
}

export function getExcerpt(content: string, maxLength = 160): string {
  const tree = parser.parse(content);
  const paragraphs = tree.children.filter(node => node.type === 'paragraph');
  const text = paragraphs.map(node => toString(node, { includeImageAlt: false }))
    .join(' ').replace(/\s+/g, ' ').trim();
  if (text.length <= maxLength) return text;
  const candidate = text.slice(0, maxLength + 1);
  const sentences = [...candidate.matchAll(/[.!?](?=\s|$)/g)];
  const lastSentence = sentences.at(-1)?.index;
  if (lastSentence !== undefined) return text.slice(0, lastSentence + 1);
  const lastSpace = candidate.lastIndexOf(' ');
  return `${text.slice(0, lastSpace > 0 ? lastSpace : maxLength).trimEnd()}…`;
}
