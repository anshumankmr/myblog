import { unified } from 'unified';
import type { Element, Root } from 'hast';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeShiki from '@shikijs/rehype';
import rehypeStringify from 'rehype-stringify';

function mediaType(href: string, title: unknown): 'video' | 'audio' | null {
  let url: URL;
  try { url = new URL(href, 'https://anshumankumar.net'); }
  catch { return null; }
  if (!['https:', 'http:'].includes(url.protocol)) return null;
  if (title === 'video' || /\.(mp4|webm|ogv|mov)$/i.test(url.pathname)) return 'video';
  if (title === 'audio' || /\.(mp3|m4a|ogg|oga|wav|aac|flac)$/i.test(url.pathname)) return 'audio';
  return null;
}

function imageParagraph(node: Root['children'][number]): Element[] | null {
  if (node.type !== 'element' || node.tagName !== 'p') return null;
  const children = node.children.filter(child => child.type !== 'text' || child.value.trim());
  if (!children.length || !children.every(child => child.type === 'element' && child.tagName === 'img')) return null;
  return children as Element[];
}

function noteMedia() {
  return (tree: Root) => {
    // Work on sanitized HTML. Raw HTML and unsafe URLs never reach this step.
    function lazyImages(node: Root | Element) {
      for (const child of node.children) {
        if (child.type !== 'element') continue;
        if (child.tagName === 'img') {
          child.properties.loading = 'lazy';
          child.properties.decoding = 'async';
        }
        lazyImages(child);
      }
    }
    lazyImages(tree);

    const children: Root['children'] = [];
    for (let index = 0; index < tree.children.length; index++) {
      const node = tree.children[index];
      const images = imageParagraph(node);
      if (images) {
        // Adjacent image paragraphs also form one gallery, even with blank lines.
        let end = index;
        while (end + 2 < tree.children.length) {
          const separator = tree.children[end + 1];
          const next = imageParagraph(tree.children[end + 2]);
          if (separator.type !== 'text' || separator.value.trim() || !next) break;
          images.push(...next);
          end += 2;
        }
        children.push({
          type: 'element', tagName: 'figure',
          properties: { className: ['note-media', 'note-images'], 'data-count': images.length },
          children: images.map(img => ({
            type: 'element', tagName: 'a',
            properties: { href: img.properties.src, target: '_blank', rel: ['noopener', 'noreferrer'],
              ariaLabel: img.properties.alt ? `Open image: ${img.properties.alt}` : 'Open full-size image' },
            children: [img],
          })),
        });
        index = end;
        continue;
      }
      if (node.type === 'element' && node.tagName === 'p') {
        const content = node.children.filter(child => child.type !== 'text' || child.value.trim());
        const link = content.length === 1 && content[0].type === 'element' && content[0].tagName === 'a' ? content[0] : null;
        const href = link?.properties.href;
        const type = typeof href === 'string' ? mediaType(href, link?.properties.title) : null;
        if (link && type) {
          children.push({
            type: 'element', tagName: 'figure', properties: { className: ['note-media', `note-${type}`] },
            children: [
              { type: 'element', tagName: type,
                properties: { controls: true, preload: 'none', ...(type === 'video' ? { playsInline: true } : {}),
                  ariaLabel: link.children.filter(child => child.type === 'text').map(child => child.value).join('') || `${type} attachment` },
                children: [{ type: 'element', tagName: 'source', properties: { src: href }, children: [] }, link] },
              { type: 'element', tagName: 'figcaption', properties: {}, children: [link] },
            ],
          });
          continue;
        }
      }
      children.push(node);
    }
    tree.children = children;
  };
}

const renderer = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(noteMedia)
  .use(rehypeShiki, { theme: 'github-dark', fallbackLanguage: 'text' })
  .use(rehypeStringify);

export async function renderNoteMarkdown(content: string): Promise<string> {
  return String(await renderer.process(content));
}
