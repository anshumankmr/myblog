// Notes (short, untitled posts) and Now.

const WRAP3 = window.BLOG_WRAP;

function NotesScreen({ openPost }) {
  const d = window.BLOG_DATA;
  const { Note } = window.AnshumanSBlogDesignSystem_ceace2;
  return (
    <div style={{ ...WRAP3, padding: '56px 24px 0' }}>
      <h1 style={window.BLOG_H1}>Notes</h1>
      <p style={{ margin: '10px 0 0', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-base)', color: 'var(--text-muted)' }}>
        Short things that don&apos;t need a whole post.
      </p>
      <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {d.notes.map((n) => {
          const post = n.postId && d.posts.find((p) => p.id === n.postId);
          return (
            <Note key={n.id} date={n.date} time={n.time}>
              {n.text}
              {post && (
                <React.Fragment>
                  {' '}
                  <a href="#" onClick={(e) => { e.preventDefault(); openPost(post.id); }} style={{ color: 'var(--link)' }}>{post.title} →</a>
                </React.Fragment>
              )}
            </Note>
          );
        })}
      </div>
    </div>
  );
}

function NowScreen() {
  const d = window.BLOG_DATA;
  const { RecentRides, RecentFilms, CalorieLog } = window.AnshumanSBlogDesignSystem_ceace2;
  return (
    <div style={{ ...WRAP3, padding: '56px 24px 0' }}>
      <h1 style={window.BLOG_H1}>Now</h1>
      <p style={{ margin: '10px 0 0', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
        Updated {d.now.updated} · <a href="https://nownownow.com/about" style={{ color: 'var(--text-muted)' }}>what is this?</a>
      </p>
      <dl style={{ margin: '28px 0 0', borderTop: '1px solid var(--border-hairline)' }}>
        {d.now.items.map((it) => (
          <div key={it.label} style={{ display: 'grid', gridTemplateColumns: '120px minmax(0,1fr)', gap: '16px', padding: '14px 0', borderBottom: '1px solid var(--border-hairline)' }}>
            <dt style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 500, color: 'var(--text-heading)' }}>{it.label}</dt>
            <dd style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)', color: 'var(--text-body)' }}>{it.text}</dd>
          </div>
        ))}
      </dl>
      <h2 style={{ margin: '48px 0 0', fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 600, letterSpacing: 'var(--tracking-tight)', color: 'var(--text-heading)' }}>Keeping myself in check</h2>
      <p style={{ margin: '10px 0 0', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-muted)', textWrap: 'pretty' }}>
        I&apos;m trying to keep my calories in check, so here&apos;s my attempt at tracking them, along with what I&apos;ve been up to on the bike.
      </p>
      <div style={{ marginTop: '28px' }}><RecentRides rides={d.rides} limit={3} /></div>
      <div style={{ marginTop: '36px' }}>{CalorieLog && <CalorieLog days={d.calories} limit={3} />}</div>
      <div style={{ marginTop: '48px' }}><RecentFilms films={d.films} limit={4} /></div>
    </div>
  );
}

Object.assign(window, { NotesScreen, NowScreen });
