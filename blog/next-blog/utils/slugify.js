export function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/\s\(\)]+/g, '-') // Escaped parentheses as it's in a JS string
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
