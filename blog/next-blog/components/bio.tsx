import Image from 'next/image';

interface BioProps {
  showTwitter?: boolean;
}

export default function Bio({ showTwitter = true }: BioProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--space-6)',
      padding: 'var(--space-6)',
      background: 'var(--surface-sunken)',
      borderTop: '1px solid var(--border-hairline)',
      borderBottom: '1px solid var(--border-hairline)',
    }}>
      <Image
        src="https://avatars.githubusercontent.com/u/24219264?v=4"
        alt="Anshuman Kumar"
        width={80}
        height={100}
        unoptimized
        style={{
          width: '80px',
          height: '100px',
          objectFit: 'cover',
          filter: 'grayscale(1) contrast(1.05)',
          flexShrink: 0,
        }}
      />
      <div>
        <p style={{
          margin: 0,
          fontFamily: 'var(--font-ui)',
          fontWeight: 600,
          fontSize: 'var(--text-base)',
          color: 'var(--text-heading)',
        }}>
          Anshuman Kumar
        </p>
        <p style={{
          margin: 'var(--space-1) 0 0',
          fontFamily: 'var(--font-ui)',
          fontSize: 'var(--text-eyebrow)',
          letterSpacing: 'var(--tracking-caps)',
          textTransform: 'uppercase',
          color: 'var(--text-meta)',
        }}>
          SWE III · Bangalore
        </p>
        <p style={{
          margin: 'var(--space-3) 0 0',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          lineHeight: 'var(--leading-snug)',
          color: 'var(--text-body)',
        }}>
          Building AI systems at scale. Writing about the things between the commits.
        </p>
        {showTwitter && (
          <a
            href="https://twitter.com/anshuman_kmr"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: 'var(--space-2)',
              fontFamily: 'var(--font-ui)',
              fontSize: 'var(--text-eyebrow)',
              letterSpacing: 'var(--tracking-caps)',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              textDecoration: 'none',
            }}
          >
            @anshuman_kmr
          </a>
        )}
      </div>
    </div>
  );
}
