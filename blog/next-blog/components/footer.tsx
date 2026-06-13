export default function Footer() {
  const currentYear = new Date().getFullYear();

  const eyebrow: React.CSSProperties = {
    margin: 0,
    fontFamily: 'var(--font-ui)',
    fontSize: 'var(--text-eyebrow)',
    fontWeight: 500,
    letterSpacing: 'var(--tracking-caps)',
    textTransform: 'uppercase',
    color: 'var(--text-meta)',
  };

  return (
    <footer
      style={{
        background: 'var(--surface-page)',
        borderTop: '1px solid var(--border-hairline)',
        padding: 'var(--space-16) 0 var(--space-12)',
        marginTop: 'var(--space-24)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container-wide)',
          margin: '0 auto',
          padding: '0 var(--space-8)',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: 'var(--space-6)',
        }}
      >
        <p style={eyebrow}>
          © {currentYear} · Anshuman Kumar
        </p>

        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            color: 'var(--text-muted)',
            fontSize: '18px',
          }}
        >
          fin.
        </span>

        <p style={{ ...eyebrow, textAlign: 'right' }}>
          Bangalore · est. 2024
        </p>
      </div>
    </footer>
  );
}
