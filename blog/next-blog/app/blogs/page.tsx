import { getAllPosts } from '@/lib/content';
import { formatDate, getExcerpt } from '@/lib/utils';
import Bio from '@/components/bio';
import { PostListItem } from '@/components/blog/PostListItem';

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontSize: 'var(--text-eyebrow)',
  fontWeight: 500,
  letterSpacing: 'var(--tracking-caps)',
  textTransform: 'uppercase',
  color: 'var(--text-meta)',
};

export default function BlogsPage() {
  const posts = getAllPosts();

  return (
    <div style={{ maxWidth: 'var(--container-wide)', margin: '0 auto', padding: 'var(--space-16) var(--space-8) var(--space-24)' }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <span style={{ width: '40px', height: '1px', background: 'var(--ink-400)', display: 'inline-block' }} />
        <span style={eyebrow}>The Index · {posts.length} essays</span>
      </div>

      <h1 style={{
        margin: 'var(--space-6) 0 var(--space-16)',
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 'clamp(56px, 9vw, 120px)',
        lineHeight: 'var(--leading-display)',
        letterSpacing: '-0.02em',
        color: 'var(--text-display)',
      }}>
        All the writing,<br />
        chronological.
      </h1>

      {posts.length > 0 && (
        <ol style={{ margin: 0, padding: 0, listStyle: 'none', borderTop: '1px solid var(--ink-900)' }}>
          {posts.map((post, index) => (
            <PostListItem
              key={post.articleId}
              n={index + 1}
              title={post.title}
              date={formatDate(post.date)}
              excerpt={getExcerpt(post.content)}
              href={`/article/${post.date}/${post.slug}/`}
              last={index === posts.length - 1}
            />
          ))}
        </ol>
      )}

      {posts.length === 0 && (
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontSize: 'var(--text-lg)' }}>
          No essays yet. Check back soon.
        </p>
      )}

      <div style={{ marginTop: 'var(--space-16)' }}>
        <Bio />
      </div>
    </div>
  );
}
