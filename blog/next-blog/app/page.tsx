import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '@/lib/content';
import { formatDate, getExcerpt } from '@/lib/utils';

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontSize: 'var(--text-eyebrow)',
  fontWeight: 500,
  letterSpacing: 'var(--tracking-caps)',
  textTransform: 'uppercase',
  color: 'var(--text-meta)',
};

function LatestIndex() {
  const posts = getAllPosts().slice(0, 4).map((p) => ({
    id: p.articleId,
    title: p.title,
    date: formatDate(p.date),
    excerpt: getExcerpt(p.content),
    href: `/article/${p.date}/${p.slug}/`,
  }));

  if (!posts.length) return null;

  return (
    <div style={{ marginTop: 'var(--space-24)' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        borderBottom: '1px solid var(--ink-900)',
        paddingBottom: 'var(--space-3)',
        marginBottom: 'var(--space-2)',
      }}>
        <span style={{ ...eyebrow, color: 'var(--text-heading)', fontWeight: 600 }}>
          The Index — Latest Notes
        </span>
        <Link href="/blogs" style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          color: 'var(--accent)',
          fontSize: '18px',
          textDecoration: 'none',
        }}>
          view all →
        </Link>
      </div>
      <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {posts.map((p, i) => (
          <li key={p.id} style={{ borderBottom: i < posts.length - 1 ? '1px solid var(--border-hairline)' : 'none' }}>
            <Link href={p.href} style={{ display: 'block', padding: 'var(--space-6) 0', textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-6)' }}>
                <span style={{ ...eyebrow, color: 'var(--accent)', minWidth: '2.5rem' }}>
                  № {String(i + 1).padStart(2, '0')}
                </span>
                <div style={{ flex: 1 }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 'var(--text-2xl)',
                    lineHeight: 1.15,
                    color: 'var(--text-heading)',
                  }}>
                    {p.title}
                  </span>
                  <span style={{ ...eyebrow, display: 'block', marginTop: 'var(--space-1)' }}>
                    {p.date}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Home() {
  return (
    <div style={{ maxWidth: 'var(--container-wide)', margin: '0 auto', padding: 'var(--space-24) var(--space-8) var(--space-16)' }}>

      {/* Eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-10)' }}>
        <span style={{ width: '40px', height: '1px', background: 'var(--ink-400)', display: 'inline-block' }} />
        <span style={eyebrow}>Notes by Anshuman</span>
      </div>

      {/* Giant italic hero heading */}
      <h1 style={{
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 'clamp(64px, 11vw, 156px)',
        lineHeight: 'var(--leading-display)',
        letterSpacing: '-0.02em',
        color: 'var(--text-display)',
      }}>
        Notes on code,<br />
        culture, and<br />
        the spaces<br />
        <span style={{ color: 'var(--accent)' }}>in&nbsp;between.</span>
      </h1>

      {/* Author strip */}
      <div style={{
        marginTop: 'var(--space-24)',
        display: 'grid',
        gridTemplateColumns: '160px 1fr',
        gap: 'var(--space-10)',
        alignItems: 'start',
        paddingTop: 'var(--space-10)',
        borderTop: '1px solid var(--border-hairline)',
      }}>
        <Image
          src="https://avatars.githubusercontent.com/u/24219264?v=4"
          alt="Anshuman Kumar"
          width={160}
          height={200}
          unoptimized
          style={{
            width: '160px',
            height: '200px',
            objectFit: 'cover',
            filter: 'grayscale(1) contrast(1.05)',
            background: 'var(--surface-sunken)',
          }}
        />
        <div>
          <span style={eyebrow}>The Author</span>
          <p style={{
            margin: 'var(--space-3) 0 0',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xl)',
            lineHeight: 'var(--leading-snug)',
            color: 'var(--text-heading)',
            fontWeight: 400,
            maxWidth: '40rem',
          }}>
            Anshuman Kumar — software engineer in Bangalore, building AI systems at scale at an ITAM &amp; FinOps company.
            He writes here about the things between the commits: long-distance cycling, marathons, the films he keeps coming back to, and the slow work of paying attention.
          </p>
          <div style={{ marginTop: 'var(--space-8)', display: 'flex', gap: 'var(--space-6)', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/blogs" className="btn-primary">
              Read the essays
            </Link>
            <Link href="/about" style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'var(--text-eyebrow)',
              letterSpacing: 'var(--tracking-caps)',
              textTransform: 'uppercase',
              color: 'var(--text-meta)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '2px',
            }}>
              More about me →
            </Link>
          </div>
        </div>
      </div>

      {/* Latest posts index */}
      <LatestIndex />
    </div>
  );
}
