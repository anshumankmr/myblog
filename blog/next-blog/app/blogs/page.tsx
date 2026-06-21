'use client';

import useSWR from 'swr';
import { blogsFetcher, type Blog } from '@/lib/api';
import { formatDate, getDatePath, generateSlug, getExcerpt } from '@/lib/utils';
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

function BlogSkeleton() {
  return (
    <div>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ borderBottom: '1px solid var(--border-hairline)', padding: 'var(--space-8) 0' }}>
          <div className="skeleton" style={{ height: '2rem', width: '70%', marginBottom: '0.5rem' }} />
          <div className="skeleton" style={{ height: '0.75rem', width: '8rem', marginBottom: '0.75rem' }} />
          <div className="skeleton" style={{ height: '1rem', width: '100%', marginBottom: '0.35rem' }} />
          <div className="skeleton" style={{ height: '1rem', width: '60%' }} />
        </div>
      ))}
    </div>
  );
}

export default function BlogsPage() {
  const { data: blogs, error, isLoading } = useSWR<Blog[]>('blogs', blogsFetcher, {
    revalidateOnFocus: true,
    refreshInterval: 300000,
  });

  return (
    <div style={{ maxWidth: 'var(--container-wide)', margin: '0 auto', padding: 'var(--space-16) var(--space-8) var(--space-24)' }}>

      {/* Eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <span style={{ width: '40px', height: '1px', background: 'var(--ink-400)', display: 'inline-block' }} />
        <span style={eyebrow}>The Index · {blogs ? `${blogs.length} essays` : 'Essays'}</span>
      </div>

      {/* Display heading */}
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

      {isLoading && <BlogSkeleton />}

      {error && (
        <div style={{
          padding: 'var(--space-4)',
          background: 'var(--surface-sunken)',
          border: '1px solid var(--border-hairline)',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--text-body)',
        }}>
          <p style={{ margin: 0, fontFamily: 'var(--font-body)' }}>
            Failed to load essays. Please try again later.
          </p>
        </div>
      )}

      {blogs && blogs.length > 0 && (
        <ol style={{ margin: 0, padding: 0, listStyle: 'none', borderTop: '1px solid var(--ink-900)' }}>
          {blogs.map((blog, index) => {
            const { Title, date, Content, articleId } = blog.attributes;
            const datePath = getDatePath(date);
            const slug = generateSlug(Title);
            const href = `/article/${datePath}/${slug}/?id=${articleId}`;
            const excerpt = getExcerpt(Content);
            return (
              <PostListItem
                key={blog.id}
                n={index + 1}
                title={Title}
                date={formatDate(date)}
                excerpt={excerpt}
                href={href}
                last={index === blogs.length - 1}
              />
            );
          })}
        </ol>
      )}

      {blogs && blogs.length === 0 && (
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
