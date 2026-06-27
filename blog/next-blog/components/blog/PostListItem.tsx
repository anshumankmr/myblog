import Link from 'next/link';

type PostListItemProps = {
  n: number;
  title: string;
  date: string;
  excerpt: string;
  href: string;
  last?: boolean;
};

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontSize: 'var(--text-eyebrow)',
  fontWeight: 500,
  letterSpacing: 'var(--tracking-caps)',
  textTransform: 'uppercase',
};

export function PostListItem({ n, title, date, excerpt, href, last = false }: PostListItemProps) {
  return (
    <li style={{ borderBottom: last ? 'none' : '1px solid var(--border-hairline)' }}>
      <Link href={href} style={{ display: 'block', padding: 'var(--space-8) 0', textDecoration: 'none' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '3rem 1fr', gap: 'var(--space-6)', alignItems: 'start' }}>
          <span style={{ ...eyebrow, color: 'var(--accent)', paddingTop: '6px' }}>
            № {String(n).padStart(2, '0')}
          </span>
          <div>
            <span style={{
              display: 'block',
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'var(--text-2xl)',
              lineHeight: 1.15,
              color: 'var(--text-heading)',
              transition: 'color var(--dur-normal) var(--ease-standard)',
            }}
            className="group-hover:text-[var(--accent)]"
            >
              {title}
            </span>
            <span style={{ ...eyebrow, display: 'block', color: 'var(--text-meta)', marginTop: 'var(--space-2)' }}>
              {date}
            </span>
            <p style={{
              margin: 'var(--space-3) 0 0',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              lineHeight: 'var(--leading-relaxed)',
              color: 'var(--text-body)',
            }}>
              {excerpt}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}
