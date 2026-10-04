import test from 'node:test';
import assert from 'node:assert/strict';
import { renderNoteMarkdown } from '../lib/note-markdown';

test('a note image keeps its source, alt text, and lazy loading with a full-size link', async () => {
  const html = await renderNoteMarkdown('A photo from the ride.\n\n![A bicycle by the lake](/images/ride.jpg "Morning ride")');
  assert.match(html, /<p>A photo from the ride\.<\/p>/);
  assert.match(html, /class="note-media note-images" data-count="1"/);
  assert.match(html, /href="\/images\/ride.jpg"/);
  assert.match(html, /target="_blank" rel="noopener noreferrer"/);
  assert.match(html, /alt="A bicycle by the lake"/);
  assert.match(html, /title="Morning ride"/);
  assert.match(html, /loading="lazy" decoding="async"/);
});

test('adjacent Markdown images form galleries without swallowing surrounding prose', async () => {
  const html = await renderNoteMarkdown('Before.\n\n![First](https://example.com/1.jpg)\n\n![Second](https://example.com/2.png)\n![Third](https://example.com/3.gif)\n\nAfter.');
  assert.match(html, /data-count="3"/);
  assert.equal((html.match(/<figure/g) || []).length, 1);
  assert.equal((html.match(/<img /g) || []).length, 3);
  assert.match(html, /<\/figure>\n<p>After\.<\/p>/);
  assert.match(html, /<p>Before\.<\/p>/);
});

test('inline and already-linked images keep their Markdown placement and links', async () => {
  const html = await renderNoteMarkdown('Here is ![an inline image](/inline.png) in a sentence.\n\n[![A linked image](/thumbnail.jpg)](https://example.com/original.jpg)');
  assert(!html.includes('<figure'));
  assert.match(html, /<p>Here is <img[^>]+> in a sentence\.<\/p>/);
  assert.match(html, /href="https:\/\/example.com\/original.jpg"/);
  assert.equal((html.match(/loading="lazy"/g) || []).length, 2);
});

test('note media remains sanitized and hostile or malformed URLs cannot break rendering', async () => {
  const html = await renderNoteMarkdown('![Bad](javascript:alert%281%29)\n\n[Bad](javascript:alert%281%29 "video")\n\n[Broken](http://[ "video")\n\n<img src="x" onerror="alert(1)">\n\n<script>alert(1)</script>');
  assert(!html.includes('javascript:'));
  assert(!html.includes('onerror='));
  assert(!html.includes('<script'));
  assert(!html.includes('<video'));
});

test('standalone media links become controlled players while sentence links remain links', async () => {
  const html = await renderNoteMarkdown('[A clip](https://example.com/clip.mp4?download=1)\n\n[Voice note](/audio/voice.mp3)\n\n[Extensionless](https://example.com/stream "video")\n\nListen to [this clip](/clip.mp4).');
  assert.equal((html.match(/<video /g) || []).length, 2);
  assert.match(html, /<video controls preload="none" playsinline/);
  assert.match(html, /<audio controls preload="none"/);
  assert.match(html, /src="https:\/\/example.com\/clip.mp4\?download=1"/);
  assert.match(html, /<p>Listen to <a href="\/clip.mp4">this clip<\/a>\.<\/p>/);
  assert(!html.includes('autoplay'));
});
