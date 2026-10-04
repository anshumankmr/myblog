// About and Contact. Copy matches the live anshumankumar.net.

const WRAP2 = window.BLOG_WRAP;
const ABOUT_P = { margin: '16px 0 0', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-lg)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-body)', textWrap: 'pretty' };

function AboutScreen({ navigate }) {
  const d = window.BLOG_DATA;
  return (
    <div style={{ ...WRAP2, padding: '56px 24px 0' }}>
      <h1 style={window.BLOG_H1}>About me</h1>
      <p style={{ ...ABOUT_P, marginTop: '20px' }}>I&apos;m a software engineer at Flexera in Bangalore, working on FinOps AI: cloud-cost anomaly detection and the agents that explain it.</p>
      <p style={ABOUT_P}>Away from work, I&apos;m usually running or cycling, playing board games, watching films, or making coffee. I like cooking too, when I can.</p>
      <p style={ABOUT_P}>Feel free to slide into my <a href="https://www.strava.com/athletes/34639203">Strava</a> DMs for a ride, or connect with me on <a href="https://twitter.com/anshuman_kmr">Twitter</a> (never calling it X).</p>

      <h2 style={{ ...window.BLOG_LABEL, marginTop: '48px' }}>What I work with</h2>
      <dl style={{ margin: '12px 0 0', borderTop: '1px solid var(--border-hairline)' }}>
        {d.skills.map((s) => (
          <div key={s.category} style={{ display: 'grid', gridTemplateColumns: '120px minmax(0,1fr)', gap: '16px', padding: '12px 0', borderBottom: '1px solid var(--border-hairline)' }}>
            <dt style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 500, color: 'var(--text-heading)' }}>{s.category}</dt>
            <dd style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)', color: 'var(--text-muted)' }}>{s.items}</dd>
          </div>
        ))}
      </dl>

      <h2 style={{ ...window.BLOG_LABEL, marginTop: '40px' }}>Off the clock</h2>
      <ul style={{ margin: '12px 0 0', padding: '0 0 0 18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {d.hobbies.map((h) => <li key={h} style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)', color: 'var(--text-body)' }}>{h}</li>)}
      </ul>

      <h2 style={{ ...window.BLOG_LABEL, marginTop: '40px' }}>A few highlights</h2>
      <ol style={{ margin: '12px 0 0', padding: 0, listStyle: 'none', borderTop: '1px solid var(--border-hairline)' }}>
        {d.highlights.map((h) => (
          <li key={h.title} style={{ padding: '14px 0', borderBottom: '1px solid var(--border-hairline)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 500, color: 'var(--text-heading)' }}>{h.title}</h3>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>{h.date}</span>
            </div>
            {h.stats && <p style={{ margin: '4px 0 0', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>{h.stats}</p>}
            {h.text && <p style={{ margin: '6px 0 0', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)', color: 'var(--text-body)' }}>{h.text}</p>}
          </li>
        ))}
      </ol>

      <p style={{ margin: '40px 0 0', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('now'); }} style={window.BLOG_LINK}>Training, rides and calories are on Now →</a>
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('contact'); }} style={window.BLOG_LINK}>Get in touch →</a>
      </p>
    </div>
  );
}

function ContactScreen() {
  const d = window.BLOG_DATA;
  return (
    <div style={{ ...WRAP2, padding: '56px 24px 0' }}>
      <h1 style={window.BLOG_H1}>Contact</h1>
      <p style={{ ...ABOUT_P, marginTop: '12px' }}>Email is best, but I&apos;m around in most of the usual places.</p>
      <ul style={{ margin: '28px 0 0', padding: 0, listStyle: 'none', borderTop: '1px solid var(--border-hairline)' }}>
        {d.contacts.map((c) => (
          <li key={c.name} style={{ borderBottom: '1px solid var(--border-hairline)' }}>
            <a href={c.href} style={{ display: 'grid', gridTemplateColumns: '20px 120px minmax(0,1fr)', gap: '14px', alignItems: 'center', padding: '14px 0', textDecoration: 'none' }}>
              <i className={c.icon} aria-hidden="true" style={{ color: 'var(--text-muted)', fontSize: '14px' }} />
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-base)', fontWeight: 500, color: 'var(--text-heading)' }}>{c.name}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--link)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.description}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

Object.assign(window, { AboutScreen, ContactScreen });
