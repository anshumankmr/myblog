// Header + Footer. Deliberately plain: name on the left, four text
// links and a theme toggle on the right, one hairline underneath.
// No logo lockup, no eyebrow, no blur-heavy glass.

const WRAP = { maxWidth: '720px', margin: '0 auto', padding: '0 24px' };
window.BLOG_WRAP = WRAP;

function NavLink({ label, active, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); onClick(); }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: 'var(--font-ui)',
        fontSize: '14px',
        fontWeight: active ? 500 : 400,
        color: active ? 'var(--text-heading)' : (hover ? 'var(--text-heading)' : 'var(--text-muted)'),
        textDecoration: 'none',
        transition: 'color 120ms ease',
      }}
    >
      {label}
    </a>
  );
}

function ThemeButton({ theme, setTheme }) {
  const [hover, setHover] = React.useState(false);
  const dark = theme === 'dark';
  return (
    <button
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={dark ? 'Light' : 'Dark'}
      style={{
        width: '30px', height: '30px',
        display: 'grid', placeItems: 'center',
        background: hover ? 'var(--surface-sunken)' : 'transparent',
        border: '1px solid var(--border-hairline)',
        borderRadius: '6px',
        color: 'var(--text-muted)',
        cursor: 'pointer',
        fontSize: '12px',
        padding: 0,
        transition: 'background 120ms ease, color 120ms ease',
      }}
    >
      <i className={dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'} />
    </button>
  );
}

function Header({ route, navigate, theme, setTheme }) {
  return (
    <header
      style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--surface-chrome)',
        backdropFilter: 'saturate(180%) blur(8px)',
        WebkitBackdropFilter: 'saturate(180%) blur(8px)',
        borderBottom: '1px solid var(--border-hairline)',
      }}
    >
      <div style={{ ...WRAP, height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); navigate('home'); }}
          lang="hi"
          title="Anshuman Kumar"
          aria-label="Anshuman Kumar, home"
          style={{
            fontFamily: 'var(--font-devanagari)',
            fontSize: '19px',
            fontWeight: 600,
            lineHeight: 1,
            color: 'var(--text-heading)',
            textDecoration: 'none',
          }}
        >
          {window.BLOG_DATA.author.nameHi}
        </a>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <NavLink label="Posts"   active={route === 'blogs' || route === 'article'} onClick={() => navigate('blogs')} />
          <NavLink label="Notes"   active={route === 'notes'}   onClick={() => navigate('notes')} />
          <NavLink label="Now"     active={route === 'now'}     onClick={() => navigate('now')} />
          <NavLink label="About"   active={route === 'about' || route === 'contact'} onClick={() => navigate('about')} />
          <NavLink label="Résumé"  active={false} onClick={() => {}} />
          <ThemeButton theme={theme} setTheme={setTheme} />
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  const d = window.BLOG_DATA;
  return (
    <footer style={{ borderTop: '1px solid var(--border-hairline)', marginTop: '80px' }}>
      <div
        style={{
          ...WRAP,
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} Anshuman Kumar
        </span>
        <span style={{ display: 'flex', gap: '14px' }}>
          <a href="/rss.xml" title="RSS" aria-label="RSS feed" style={{ color: 'var(--text-muted)', fontSize: '14px', textDecoration: 'none' }}>
            <i className="fa-solid fa-rss" aria-hidden="true" />
          </a>
          {d.contacts.filter((c) => c.name !== 'Email').map((c) => (
            <a
              key={c.name}
              href={c.href}
              title={c.name}
              aria-label={c.name}
              style={{ color: 'var(--text-muted)', fontSize: '14px', textDecoration: 'none' }}
            >
              <i className={c.icon} />
            </a>
          ))}
        </span>
      </div>
    </footer>
  );
}

Object.assign(window, { Header, Footer, NavLink });
