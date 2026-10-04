// Home, Posts list, and Article screens.
// One 720px column. Post rows: serif title, mono date, one-line excerpt,
// hairline rules. Posts page groups by year. Code blocks are highlighted
// with the --code-* tokens (stand-in for Shiki at build time).

const WRAP = window.BLOG_WRAP;
const BLOG_LABEL = { margin: 0, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-eyebrow)', fontWeight: 600, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)' };
const BLOG_H1 = { margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 600, letterSpacing: 'var(--tracking-tighter)', lineHeight: 'var(--leading-display)', color: 'var(--text-heading)' };
const BLOG_LINK = { fontFamily: 'var(--font-ui)', fontSize: 'var(--text-base)', color: 'var(--link)', textDecoration: 'none' };

const CODE_RE = /(\/\/[^\n]*)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)|\b(\d+(?:\.\d+)?)\b|\b(const|let|var|function|return|async|await|import|from|export|default|if|else|for|of|new|true|false|null|def|class)\b|([A-Za-z_]\w*)(?=\()/g;
function highlightCode(src) {
  const out = []; let last = 0; let m; let k = 0;
  const colors = ['var(--code-comment)', 'var(--code-string)', 'var(--code-number)', 'var(--code-keyword)', 'var(--code-fn)'];
  CODE_RE.lastIndex = 0;
  while ((m = CODE_RE.exec(src))) {
    if (m.index > last) out.push(src.slice(last, m.index));
    const g = [1, 2, 3, 4, 5].find((i) => m[i] !== undefined);
    out.push(<span key={k++} style={{ color: colors[g - 1] }}>{m[0]}</span>);
    last = m.index + m[0].length;
  }
  out.push(src.slice(last));
  return out;
}

function PostRow({ post, openPost, last }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); openPost(post.id); }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'block', padding: '18px 0', borderBottom: last ? 'none' : '1px solid var(--border-hairline)', textDecoration: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 500, letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-snug)', color: hover ? 'var(--link)' : 'var(--text-heading)', transition: 'color 120ms ease', textWrap: 'pretty' }}>{post.title}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>{post.datePath}</span>
      </div>
      <p style={{ margin: '6px 0 0', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)', color: 'var(--text-muted)', textWrap: 'pretty' }}>{post.excerpt}</p>
    </a>
  );
}

function GuideRow({ label, text, onClick, last }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); onClick(); }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'grid', gridTemplateColumns: '96px minmax(0,1fr) auto', gap: '16px', alignItems: 'baseline', padding: '13px 0', borderBottom: last ? 'none' : '1px solid var(--border-hairline)', textDecoration: 'none' }}>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 500, color: hover ? 'var(--link)' : 'var(--text-heading)', transition: 'color 120ms ease' }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)', color: 'var(--text-muted)' }}>{text}</span>
      <span aria-hidden="true" style={{ fontFamily: 'var(--font-ui)', color: hover ? 'var(--link)' : 'var(--text-muted)', transition: 'color 120ms ease' }}>→</span>
    </a>
  );
}

function HomeScreen({ navigate, openPost }) {
  const d = window.BLOG_DATA;
  const guide = [
    { label: 'Posts', text: `Long-form writing, mostly tech. ${d.posts.length} so far.`, to: 'blogs' },
    { label: 'Notes', text: 'Short things that don\u2019t need a whole post.', to: 'notes' },
    { label: 'Now', text: 'Training, rides, calories, and what I\u2019ve been watching.', to: 'now' },
    { label: 'About', text: 'Work, what I use, and a few highlights.', to: 'about' },
    { label: 'Résumé', text: 'The PDF version.', to: null },
  ];
  return (
    <div style={{ ...WRAP, padding: '72px 24px 0' }}>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ ...BLOG_H1, fontSize: 'var(--text-5xl)' }}>Hi, I&apos;m Anshuman.</h1>
          <p style={{ margin: '18px 0 0', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-xl)', lineHeight: 'var(--leading-snug)', color: 'var(--text-body)', textWrap: 'pretty' }}>
            I&apos;m a software engineer at Flexera in Bangalore, working on FinOps AI. I write about software, AI, and the things I get up to away from the keyboard.
          </p>
        </div>
        <img src={d.author.avatar} alt={d.author.name} style={{ width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, marginTop: '6px' }} />
      </div>

      <nav aria-label="Sections" style={{ marginTop: '44px', borderTop: '1px solid var(--border-hairline)' }}>
        {guide.map((g, i) => <GuideRow key={g.label} label={g.label} text={g.text} last={i === guide.length - 1} onClick={() => g.to && navigate(g.to)} />)}
      </nav>

      <h2 style={{ ...BLOG_LABEL, marginTop: '56px' }}>Recent posts</h2>
      <div style={{ marginTop: '4px', borderTop: '1px solid var(--border-hairline)' }}>
        {d.posts.slice(0, 3).map((p, i) => <PostRow key={p.id} post={p} openPost={openPost} last={i === 2} />)}
      </div>
      <a href="#" onClick={(e) => { e.preventDefault(); navigate('blogs'); }} style={{ ...BLOG_LINK, display: 'inline-block', marginTop: '16px' }}>All posts →</a>
    </div>
  );
}

function BlogsScreen({ openPost }) {
  const d = window.BLOG_DATA;
  const years = [];
  d.posts.forEach((p) => {
    const y = p.datePath.slice(0, 4);
    const g = years.find((x) => x.year === y);
    if (g) g.posts.push(p); else years.push({ year: y, posts: [p] });
  });
  return (
    <div style={{ ...WRAP, padding: '56px 24px 0' }}>
      <h1 style={BLOG_H1}>Posts</h1>
      <p style={{ margin: '10px 0 0', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-base)', color: 'var(--text-muted)' }}>
        {d.posts.length} posts, mostly about tech. Occasionally not.
      </p>
      {years.map((g) => (
        <section key={g.year} style={{ marginTop: '36px' }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-meta)', fontWeight: 500, color: 'var(--text-muted)' }}>{g.year}</h2>
          <div style={{ marginTop: '6px', borderTop: '1px solid var(--border-hairline)' }}>
            {g.posts.map((p, i) => <PostRow key={p.id} post={p} openPost={openPost} last={i === g.posts.length - 1} />)}
          </div>
        </section>
      ))}
    </div>
  );
}

function ArticleBody({ blocks }) {
  return blocks.map((b, i) => {
    if (b.type === 'h2') return <h2 key={i} style={{ margin: '36px 0 0', fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 600, letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-snug)', color: 'var(--text-heading)' }}>{b.text}</h2>;
    if (b.type === 'code') return (
      <pre key={i} style={{ margin: '24px 0', padding: '16px', background: 'var(--code-bg)', color: 'var(--code-fg)', borderRadius: '6px', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.6 }}>
        <code>{highlightCode(b.text)}</code>
      </pre>
    );
    return <p key={i} style={{ margin: '18px 0 0', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-lg)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-body)', textWrap: 'pretty' }}>{b.text}</p>;
  });
}

function ArticleScreen({ post, navigate, openPost }) {
  const d = window.BLOG_DATA;
  const idx = d.posts.findIndex((p) => p.id === post.id);
  const older = d.posts[idx + 1];
  const body = post.body || [{ type: 'p', text: post.excerpt }];
  return (
    <div style={{ ...WRAP, padding: '48px 24px 0' }}>
      <a href="#" onClick={(e) => { e.preventDefault(); navigate('blogs'); }} style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'none' }}>← All posts</a>
      <h1 style={{ ...BLOG_H1, marginTop: '20px', textWrap: 'pretty' }}>{post.title}</h1>
      <p style={{ margin: '12px 0 0', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>{post.datePath} · {post.tag}</p>
      <div style={{ marginTop: '24px' }}><ArticleBody blocks={body} /></div>
      <p style={{ margin: '32px 0 0', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
        <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Edit on GitHub →</a>
      </p>
      <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border-hairline)', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
        <img src={d.author.avatar} alt={d.author.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
        <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)', color: 'var(--text-muted)' }}>
          <strong style={{ color: 'var(--text-heading)', fontWeight: 600 }}>{d.author.name}</strong>{' — '}{d.author.role}
        </p>
      </div>
      {older && (
        <a href="#" onClick={(e) => { e.preventDefault(); openPost(older.id); }} style={{ ...BLOG_LINK, display: 'block', marginTop: '24px' }}>← Previous: {older.title}</a>
      )}
    </div>
  );
}

Object.assign(window, { GuideRow, HomeScreen, BlogsScreen, ArticleScreen, PostRow, ArticleBody, highlightCode, BLOG_LABEL, BLOG_H1, BLOG_LINK });
