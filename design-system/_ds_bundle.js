/* @ds-bundle: {"format":4,"namespace":"AnshumanSBlogDesignSystem_ceace2","components":[{"name":"CalorieLog","sourcePath":"components/activity/CalorieLog.jsx"},{"name":"RecentFilms","sourcePath":"components/activity/RecentFilms.jsx"},{"name":"RecentRides","sourcePath":"components/activity/RecentRides.jsx"},{"name":"Bio","sourcePath":"components/blog/Bio.jsx"},{"name":"Note","sourcePath":"components/blog/Note.jsx"},{"name":"PostListItem","sourcePath":"components/blog/PostListItem.jsx"},{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"ThemeToggle","sourcePath":"components/core/ThemeToggle.jsx"}],"sourceHashes":{"components/activity/CalorieLog.jsx":"98ed4aacb5a4","components/activity/RecentFilms.jsx":"db4a23673a17","components/activity/RecentRides.jsx":"79e6f4e341be","components/blog/Bio.jsx":"3de7a595e8bd","components/blog/Note.jsx":"c5e2bff7c11c","components/blog/PostListItem.jsx":"bca9e1db6753","components/core/Avatar.jsx":"355d1e018013","components/core/Badge.jsx":"e24ea7d627bc","components/core/Button.jsx":"0b92b11e6611","components/core/Card.jsx":"7cb42a58af75","components/core/ThemeToggle.jsx":"7f036add266e","ui_kits/blog/Chrome.jsx":"3266637188d0","ui_kits/blog/Screens.jsx":"a43722e14d93","ui_kits/blog/Screens2.jsx":"cffb048998bc","ui_kits/blog/Screens3.jsx":"be56c5f62b3f","ui_kits/blog/data.js":"813a42e2e267"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AnshumanSBlogDesignSystem_ceace2 = window.AnshumanSBlogDesignSystem_ceace2 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/activity/CalorieLog.jsx
try { (() => {
/**
 * CalorieLog — recent MyFitnessPal diary totals as a hairline list.
 * Mono date, eaten / goal in mono, "under" or "over" in muted text.
 * Data is fetched at build time, so there is no loading or error state
 * on the page; if there is no data, render nothing.
 */
function CalorieLog({
  days = [],
  diaryHref = 'https://www.myfitnesspal.com/food/diary/anshuman_kmr',
  limit = 5,
  title = 'Calories'
}) {
  const list = days.slice(0, limit);
  if (!list.length) return null;
  const fmt = n => n.toLocaleString('en-IN');
  const mono = {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--text-muted)',
    whiteSpace: 'nowrap'
  };
  return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-eyebrow)',
      fontWeight: 600,
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, title), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '12px 0 0',
      padding: 0,
      listStyle: 'none',
      borderTop: '1px solid var(--border-hairline)'
    }
  }, list.map(d => {
    const diff = d.goal - d.eaten;
    return /*#__PURE__*/React.createElement("li", {
      key: d.date,
      style: {
        display: 'grid',
        gridTemplateColumns: '84px minmax(0,1fr) auto',
        gap: '16px',
        alignItems: 'baseline',
        padding: '12px 0',
        borderBottom: '1px solid var(--border-hairline)'
      }
    }, /*#__PURE__*/React.createElement("time", {
      style: mono
    }, d.date), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '14px',
        color: 'var(--text-heading)'
      }
    }, fmt(d.eaten), " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-muted)'
      }
    }, "/ ", fmt(d.goal), " kcal")), /*#__PURE__*/React.createElement("span", {
      style: mono
    }, diff >= 0 ? `${fmt(diff)} under` : `${fmt(-diff)} over`));
  })), /*#__PURE__*/React.createElement("a", {
    href: diaryHref,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      display: 'inline-block',
      marginTop: '10px',
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      color: 'var(--text-muted)',
      textDecoration: 'none'
    }
  }, "via MyFitnessPal \u2192"));
}
Object.assign(__ds_scope, { CalorieLog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/activity/CalorieLog.jsx", error: String((e && e.message) || e) }); }

// components/activity/RecentFilms.jsx
try { (() => {
/**
 * RecentFilms — recent Letterboxd watches as a hairline list.
 * Same row pattern as RecentRides: mono date, Plex Serif title with a
 * mono year, mono star rating on the right. "via Letterboxd →" credit.
 */
function stars(r) {
  if (r == null) return '';
  const full = Math.floor(r);
  return '★'.repeat(full) + (r - full >= 0.5 ? '½' : '');
}
function RecentFilms({
  films = [],
  profileHref = 'https://letterboxd.com/',
  limit = 5,
  title = 'Recently watched'
}) {
  const list = films.slice(0, limit);
  const mono = {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--text-muted)',
    whiteSpace: 'nowrap'
  };
  return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-eyebrow)',
      fontWeight: 600,
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, title), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '12px 0 0',
      padding: 0,
      listStyle: 'none',
      borderTop: '1px solid var(--border-hairline)'
    }
  }, list.map((f, i) => /*#__PURE__*/React.createElement("li", {
    key: f.href || i,
    style: {
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: f.href || profileHref,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      display: 'grid',
      gridTemplateColumns: '84px minmax(0,1fr) auto',
      gap: '16px',
      alignItems: 'baseline',
      padding: '12px 0',
      textDecoration: 'none'
    },
    onMouseEnter: e => {
      e.currentTarget.querySelector('[data-name]').style.color = 'var(--link)';
    },
    onMouseLeave: e => {
      e.currentTarget.querySelector('[data-name]').style.color = 'var(--text-heading)';
    }
  }, /*#__PURE__*/React.createElement("time", {
    style: mono
  }, f.date), /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "data-name": "",
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 'var(--text-lg)',
      color: 'var(--text-heading)',
      transition: 'color 120ms ease'
    }
  }, f.title), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      marginLeft: '8px'
    }
  }, f.year, f.rewatch ? ' · rewatch' : '')), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      color: 'var(--text-body)'
    },
    "aria-label": f.rating != null ? `${f.rating} out of 5` : undefined
  }, stars(f.rating)))))), /*#__PURE__*/React.createElement("a", {
    href: profileHref,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      display: 'inline-block',
      marginTop: '10px',
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      color: 'var(--text-muted)',
      textDecoration: 'none'
    }
  }, "via Letterboxd \u2192"));
}
Object.assign(__ds_scope, { RecentFilms });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/activity/RecentFilms.jsx", error: String((e && e.message) || e) }); }

// components/activity/RecentRides.jsx
try { (() => {
/**
 * RecentRides — replaces the Strava "latest rides" iframe widget.
 * Hairline rows: mono date, Plex Serif ride name, mono stats on the right.
 * No orange, no map thumbnails, no card. Strava attribution is a small
 * mono link at the foot (required by Strava's API brand guidelines).
 */
function fmtTime(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.round(sec % 3600 / 60);
  return h ? `${h}h ${String(m).padStart(2, '0')}m` : `${m}m`;
}
function RecentRides({
  rides = [],
  profileHref = 'https://www.strava.com/athletes/34639203',
  limit = 5,
  title = 'Recent rides'
}) {
  const list = rides.slice(0, limit);
  const total = list.reduce((s, r) => s + (r.distanceKm || 0), 0);
  const mono = {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--text-muted)',
    whiteSpace: 'nowrap'
  };
  return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: '16px'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-eyebrow)',
      fontWeight: 600,
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: mono
  }, total.toFixed(1), " km across ", list.length)), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '12px 0 0',
      padding: 0,
      listStyle: 'none',
      borderTop: '1px solid var(--border-hairline)'
    }
  }, list.map((r, i) => /*#__PURE__*/React.createElement("li", {
    key: r.href || i,
    style: {
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: r.href || profileHref,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      display: 'grid',
      gridTemplateColumns: '84px minmax(0,1fr) auto',
      gap: '16px',
      alignItems: 'baseline',
      padding: '12px 0',
      textDecoration: 'none'
    },
    onMouseEnter: e => {
      e.currentTarget.querySelector('[data-name]').style.color = 'var(--link)';
    },
    onMouseLeave: e => {
      e.currentTarget.querySelector('[data-name]').style.color = 'var(--text-heading)';
    }
  }, /*#__PURE__*/React.createElement("time", {
    style: mono
  }, r.date), /*#__PURE__*/React.createElement("span", {
    "data-name": "",
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 'var(--text-lg)',
      color: 'var(--text-heading)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      transition: 'color 120ms ease'
    }
  }, r.name), /*#__PURE__*/React.createElement("span", {
    style: mono
  }, r.distanceKm.toFixed(1), " km \xB7 ", fmtTime(r.movingTimeSec), r.elevationM != null ? ` · ${Math.round(r.elevationM)} m↑` : ''))))), /*#__PURE__*/React.createElement("a", {
    href: profileHref,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      display: 'inline-block',
      marginTop: '10px',
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      color: 'var(--text-muted)',
      textDecoration: 'none'
    }
  }, "via Strava \u2192"));
}
Object.assign(__ds_scope, { RecentRides });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/activity/RecentRides.jsx", error: String((e && e.message) || e) }); }

// components/blog/Bio.jsx
try { (() => {
/**
 * Bio — author byline shown at the foot of an article.
 * Small round avatar, name in the UI font at 600, role in muted body
 * text on one line. No card, no eyebrow label, no portrait block.
 */
function Bio({
  name = 'Anshuman Kumar',
  role = 'Building FinOps AI at Flexera. Into running, cycling, board games, coffee, cooking when I can, and films.',
  avatar,
  handle = '@anshuman_kmr',
  handleHref = 'https://twitter.com/anshuman_kmr'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '14px',
      alignItems: 'flex-start',
      paddingTop: 'var(--space-6)',
      borderTop: '1px solid var(--border-hairline)'
    }
  }, avatar ? /*#__PURE__*/React.createElement("img", {
    src: avatar,
    alt: name,
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      objectFit: 'cover',
      flexShrink: 0
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      background: 'var(--surface-sunken)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-ui)',
      fontWeight: 600,
      fontSize: '15px',
      color: 'var(--text-muted)',
      flexShrink: 0
    }
  }, name.split(' ').map(w => w[0]).join('').slice(0, 2)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-base)',
      lineHeight: 'var(--leading-normal)',
      color: 'var(--text-muted)',
      textWrap: 'pretty'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-heading)',
      fontWeight: 600
    }
  }, name), ' — ', role, handle && /*#__PURE__*/React.createElement(React.Fragment, null, ' ', /*#__PURE__*/React.createElement("a", {
    href: handleHref,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      color: 'var(--link)',
      textDecoration: 'none'
    }
  }, handle))));
}
Object.assign(__ds_scope, { Bio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blog/Bio.jsx", error: String((e && e.message) || e) }); }

// components/blog/Note.jsx
try { (() => {
/**
 * Note — a short, untitled post. The "sticky note": a flat sunken block,
 * body text in Plex Sans, a mono timestamp that doubles as the permalink.
 * No title, no tags, no shadow, no tilt, no yellow.
 */
function Note({
  children,
  text,
  date,
  time,
  href = '#'
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("article", {
    style: {
      background: 'var(--surface-sunken)',
      borderRadius: '6px',
      padding: '16px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-lg)',
      lineHeight: 1.6,
      color: 'var(--text-body)',
      textWrap: 'pretty'
    }
  }, children ?? text), date && /*#__PURE__*/React.createElement("a", {
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-block',
      marginTop: '10px',
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      color: hover ? 'var(--link)' : 'var(--text-muted)',
      textDecoration: 'none',
      transition: 'color 120ms ease'
    }
  }, /*#__PURE__*/React.createElement("time", {
    dateTime: time ? `${date}T${time}` : date
  }, date, time ? ` · ${time}` : '')));
}
Object.assign(__ds_scope, { Note });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blog/Note.jsx", error: String((e && e.message) || e) }); }

// components/blog/PostListItem.jsx
try { (() => {
/**
 * PostListItem — one row in the post list.
 * Title on the left, mono date on the right, one line of excerpt
 * underneath, hairline rule between rows. The title turns accent
 * blue on hover; the whole row is the link. No numbering, no card,
 * no arrow.
 */
function PostListItem({
  title,
  date,
  excerpt,
  href = '#',
  onClick,
  last = false
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("li", {
    style: {
      listStyle: 'none'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: e => {
      if (onClick) {
        e.preventDefault();
        onClick(e);
      }
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'block',
      padding: '20px 0',
      borderBottom: last ? 'none' : '1px solid var(--border-hairline)',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: '16px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 'var(--text-2xl)',
      lineHeight: 'var(--leading-snug)',
      letterSpacing: 'var(--tracking-tight)',
      color: hover ? 'var(--link)' : 'var(--text-heading)',
      transition: 'color 120ms ease'
    }
  }, title), date && /*#__PURE__*/React.createElement("time", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      color: 'var(--text-muted)',
      whiteSpace: 'nowrap',
      flexShrink: 0
    }
  }, date)), excerpt && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-base)',
      lineHeight: 'var(--leading-normal)',
      color: 'var(--text-muted)',
      textWrap: 'pretty'
    }
  }, excerpt)));
}
Object.assign(__ds_scope, { PostListItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blog/PostListItem.jsx", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Avatar — round profile image, as used in the Bio strip.
 * Falls back to author initials when `src` is omitted.
 */
function Avatar({
  src,
  alt = '',
  initials,
  size = 72,
  style,
  ...rest
}) {
  const base = {
    width: size,
    height: size,
    borderRadius: 'var(--radius-full)',
    flex: 'none',
    objectFit: 'cover',
    display: 'block',
    ...style
  };
  if (src) {
    return /*#__PURE__*/React.createElement("img", _extends({
      src: src,
      alt: alt,
      style: base
    }, rest));
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      ...base,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--surface-sunken)',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-ui)',
      fontWeight: 600,
      fontSize: size * 0.4
    },
    "aria-label": alt
  }, rest), initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — small label for a post's tag or category.
 *
 * Sentence case, 4px radius, 12px. Not uppercase and not a pill —
 * a tag on this blog reads as a word, not as a UI chip. `solid`
 * fills with the accent; `outline` is an accent hairline.
 */
function Badge({
  children,
  variant = 'soft',
  style,
  ...rest
}) {
  const variants = {
    soft: {
      backgroundColor: 'var(--accent-soft)',
      color: 'var(--link)',
      border: '1px solid transparent'
    },
    solid: {
      backgroundColor: 'var(--accent)',
      color: 'var(--text-on-accent)',
      border: '1px solid transparent'
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--link)',
      border: '1px solid var(--border-subtle)'
    },
    neutral: {
      backgroundColor: 'var(--surface-sunken)',
      color: 'var(--text-muted)',
      border: '1px solid transparent'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-1)',
      fontFamily: 'var(--font-ui)',
      fontWeight: 500,
      fontSize: '12px',
      padding: '2px 8px',
      borderRadius: '4px',
      lineHeight: 1.5,
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — the blog's call-to-action.
 *
 *   primary   → solid blue accent fill, darkens on hover
 *   secondary → hairline border, sunken fill on hover
 *   ghost     → plain accent text link, no box
 *
 * Sentence case, 6px radius, no shadows, no uppercase tracking.
 * Renders an <a> when `href` is set, otherwise a <button>.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  icon,
  iconRight = false,
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '6px 12px',
      fontSize: '13px'
    },
    md: {
      padding: '8px 16px',
      fontSize: '14px'
    },
    lg: {
      padding: '11px 20px',
      fontSize: '15px'
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'var(--font-ui)',
    fontWeight: 500,
    borderRadius: '6px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    textDecoration: 'none',
    lineHeight: 1.2,
    transition: 'background-color 120ms ease, color 120ms ease, border-color 120ms ease',
    ...sizes[size]
  };
  const variants = {
    primary: {
      backgroundColor: 'var(--accent)',
      color: 'var(--text-on-accent)',
      border: '1px solid var(--accent)'
    },
    secondary: {
      backgroundColor: 'transparent',
      color: 'var(--text-heading)',
      border: '1px solid var(--border-subtle)'
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--link)',
      border: '1px solid transparent',
      padding: '4px 0'
    }
  };
  const hoverIn = e => {
    if (disabled) return;
    if (variant === 'primary') {
      e.currentTarget.style.backgroundColor = 'var(--accent-strong)';
      e.currentTarget.style.borderColor = 'var(--accent-strong)';
    }
    if (variant === 'secondary') {
      e.currentTarget.style.backgroundColor = 'var(--surface-sunken)';
    }
    if (variant === 'ghost') e.currentTarget.style.color = 'var(--link-hover)';
  };
  const hoverOut = e => {
    if (disabled) return;
    e.currentTarget.style.backgroundColor = variants[variant].backgroundColor;
    e.currentTarget.style.color = variants[variant].color;
    e.currentTarget.style.borderColor = variants[variant].border.split(' ').pop();
  };
  const iconEl = icon ? /*#__PURE__*/React.createElement("i", {
    className: icon,
    "aria-hidden": "true"
  }) : null;
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, !iconRight && iconEl, children, iconRight && iconEl);
  const props = {
    onClick: disabled ? undefined : onClick,
    onMouseEnter: hoverIn,
    onMouseLeave: hoverOut,
    style: {
      ...base,
      ...variants[variant],
      ...style
    },
    ...rest
  };
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href
    }, props), content);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled
  }, props), content);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — a flat content surface.
 *
 * There are no shadows in this design system. A card is the sunken
 * tint with a 1px hairline border and a 6px radius; `interactive`
 * swaps the border to the accent on hover. Used for Contact rows and
 * any boxed content.
 */
function Card({
  children,
  interactive = false,
  hoverLift = false,
  padding = 'var(--space-6)',
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const base = {
    backgroundColor: 'var(--surface-card)',
    borderRadius: '6px',
    border: '1px solid',
    borderColor: interactive && hover ? 'var(--accent)' : 'var(--border-hairline)',
    padding,
    transition: 'border-color 120ms ease, background-color 120ms ease',
    ...style
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: base,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/ThemeToggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ThemeToggle — sun/moon button that flips light/dark, exactly like
 * next-blog/components/theme-toggle.tsx. Uncontrolled by default: it
 * toggles the `dark` class on <html> (matching next-themes' strategy)
 * and reports via onChange. Pass `theme` + `onChange` to control it.
 *
 * Icons are Font Awesome (fa-solid fa-sun / fa-moon) — the host page
 * must load Font Awesome.
 */
function ThemeToggle({
  theme: controlled,
  onChange,
  onChrome = true,
  style,
  ...rest
}) {
  const [internal, setInternal] = React.useState('light');
  const [hover, setHover] = React.useState(false);
  const theme = controlled ?? internal;
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    if (controlled === undefined) {
      setInternal(next);
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', next === 'dark');
      }
    }
    onChange?.(next);
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: toggle,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    "aria-label": `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '2.25rem',
      height: '2.25rem',
      padding: 0,
      background: 'transparent',
      border: 'none',
      borderRadius: 'var(--radius-lg)',
      cursor: 'pointer',
      fontSize: 'var(--text-lg)',
      color: hover ? 'var(--blue-accent)' : onChrome ? 'var(--gray-300)' : 'var(--ink-text-light)',
      transition: `color var(--dur-normal) var(--ease-standard)`,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("i", {
    className: theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon',
    "aria-hidden": "true"
  }));
}
Object.assign(__ds_scope, { ThemeToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ThemeToggle.jsx", error: String((e && e.message) || e) }); }

// ui_kits/blog/Chrome.jsx
try { (() => {
// Header + Footer. Deliberately plain: name on the left, four text
// links and a theme toggle on the right, one hairline underneath.
// No logo lockup, no eyebrow, no blur-heavy glass.

const WRAP = {
  maxWidth: '720px',
  margin: '0 auto',
  padding: '0 24px'
};
window.BLOG_WRAP = WRAP;
function NavLink({
  label,
  active,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onClick();
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: '14px',
      fontWeight: active ? 500 : 400,
      color: active ? 'var(--text-heading)' : hover ? 'var(--text-heading)' : 'var(--text-muted)',
      textDecoration: 'none',
      transition: 'color 120ms ease'
    }
  }, label);
}
function ThemeButton({
  theme,
  setTheme
}) {
  const [hover, setHover] = React.useState(false);
  const dark = theme === 'dark';
  return /*#__PURE__*/React.createElement("button", {
    onClick: () => setTheme(dark ? 'light' : 'dark'),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    "aria-label": dark ? 'Switch to light theme' : 'Switch to dark theme',
    title: dark ? 'Light' : 'Dark',
    style: {
      width: '30px',
      height: '30px',
      display: 'grid',
      placeItems: 'center',
      background: hover ? 'var(--surface-sunken)' : 'transparent',
      border: '1px solid var(--border-hairline)',
      borderRadius: '6px',
      color: 'var(--text-muted)',
      cursor: 'pointer',
      fontSize: '12px',
      padding: 0,
      transition: 'background 120ms ease, color 120ms ease'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'
  }));
}
function Header({
  route,
  navigate,
  theme,
  setTheme
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'var(--surface-chrome)',
      backdropFilter: 'saturate(180%) blur(8px)',
      WebkitBackdropFilter: 'saturate(180%) blur(8px)',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...WRAP,
      height: '56px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      navigate('home');
    },
    lang: "hi",
    title: "Anshuman Kumar",
    "aria-label": "Anshuman Kumar, home",
    style: {
      fontFamily: 'var(--font-devanagari)',
      fontSize: '19px',
      fontWeight: 600,
      lineHeight: 1,
      color: 'var(--text-heading)',
      textDecoration: 'none'
    }
  }, window.BLOG_DATA.author.nameHi), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    }
  }, /*#__PURE__*/React.createElement(NavLink, {
    label: "Posts",
    active: route === 'blogs' || route === 'article',
    onClick: () => navigate('blogs')
  }), /*#__PURE__*/React.createElement(NavLink, {
    label: "Notes",
    active: route === 'notes',
    onClick: () => navigate('notes')
  }), /*#__PURE__*/React.createElement(NavLink, {
    label: "Now",
    active: route === 'now',
    onClick: () => navigate('now')
  }), /*#__PURE__*/React.createElement(NavLink, {
    label: "About",
    active: route === 'about' || route === 'contact',
    onClick: () => navigate('about')
  }), /*#__PURE__*/React.createElement(NavLink, {
    label: "R\xE9sum\xE9",
    active: false,
    onClick: () => {}
  }), /*#__PURE__*/React.createElement(ThemeButton, {
    theme: theme,
    setTheme: setTheme
  }))));
}
function Footer() {
  const d = window.BLOG_DATA;
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: '1px solid var(--border-hairline)',
      marginTop: '80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...WRAP,
      padding: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      color: 'var(--text-muted)'
    }
  }, "\xA9 ", new Date().getFullYear(), " Anshuman Kumar"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: '14px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/rss.xml",
    title: "RSS",
    "aria-label": "RSS feed",
    style: {
      color: 'var(--text-muted)',
      fontSize: '14px',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-rss",
    "aria-hidden": "true"
  })), d.contacts.filter(c => c.name !== 'Email').map(c => /*#__PURE__*/React.createElement("a", {
    key: c.name,
    href: c.href,
    title: c.name,
    "aria-label": c.name,
    style: {
      color: 'var(--text-muted)',
      fontSize: '14px',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: c.icon
  }))))));
}
Object.assign(window, {
  Header,
  Footer,
  NavLink
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/blog/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/blog/Screens.jsx
try { (() => {
// Home, Posts list, and Article screens.
// One 720px column. Post rows: serif title, mono date, one-line excerpt,
// hairline rules. Posts page groups by year. Code blocks are highlighted
// with the --code-* tokens (stand-in for Shiki at build time).

const WRAP = window.BLOG_WRAP;
const BLOG_LABEL = {
  margin: 0,
  fontFamily: 'var(--font-ui)',
  fontSize: 'var(--text-eyebrow)',
  fontWeight: 600,
  letterSpacing: 'var(--tracking-caps)',
  textTransform: 'uppercase',
  color: 'var(--text-muted)'
};
const BLOG_H1 = {
  margin: 0,
  fontFamily: 'var(--font-display)',
  fontSize: 'var(--text-4xl)',
  fontWeight: 600,
  letterSpacing: 'var(--tracking-tighter)',
  lineHeight: 'var(--leading-display)',
  color: 'var(--text-heading)'
};
const BLOG_LINK = {
  fontFamily: 'var(--font-ui)',
  fontSize: 'var(--text-base)',
  color: 'var(--link)',
  textDecoration: 'none'
};
const CODE_RE = /(\/\/[^\n]*)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)|\b(\d+(?:\.\d+)?)\b|\b(const|let|var|function|return|async|await|import|from|export|default|if|else|for|of|new|true|false|null|def|class)\b|([A-Za-z_]\w*)(?=\()/g;
function highlightCode(src) {
  const out = [];
  let last = 0;
  let m;
  let k = 0;
  const colors = ['var(--code-comment)', 'var(--code-string)', 'var(--code-number)', 'var(--code-keyword)', 'var(--code-fn)'];
  CODE_RE.lastIndex = 0;
  while (m = CODE_RE.exec(src)) {
    if (m.index > last) out.push(src.slice(last, m.index));
    const g = [1, 2, 3, 4, 5].find(i => m[i] !== undefined);
    out.push(/*#__PURE__*/React.createElement("span", {
      key: k++,
      style: {
        color: colors[g - 1]
      }
    }, m[0]));
    last = m.index + m[0].length;
  }
  out.push(src.slice(last));
  return out;
}
function PostRow({
  post,
  openPost,
  last
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      openPost(post.id);
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'block',
      padding: '18px 0',
      borderBottom: last ? 'none' : '1px solid var(--border-hairline)',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: '16px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-2xl)',
      fontWeight: 500,
      letterSpacing: 'var(--tracking-tight)',
      lineHeight: 'var(--leading-snug)',
      color: hover ? 'var(--link)' : 'var(--text-heading)',
      transition: 'color 120ms ease',
      textWrap: 'pretty'
    }
  }, post.title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      color: 'var(--text-muted)',
      whiteSpace: 'nowrap',
      flexShrink: 0
    }
  }, post.datePath)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-base)',
      lineHeight: 'var(--leading-normal)',
      color: 'var(--text-muted)',
      textWrap: 'pretty'
    }
  }, post.excerpt));
}
function GuideRow({
  label,
  text,
  onClick,
  last
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onClick();
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'grid',
      gridTemplateColumns: '96px minmax(0,1fr) auto',
      gap: '16px',
      alignItems: 'baseline',
      padding: '13px 0',
      borderBottom: last ? 'none' : '1px solid var(--border-hairline)',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
      fontWeight: 500,
      color: hover ? 'var(--link)' : 'var(--text-heading)',
      transition: 'color 120ms ease'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-base)',
      lineHeight: 'var(--leading-normal)',
      color: 'var(--text-muted)'
    }
  }, text), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontFamily: 'var(--font-ui)',
      color: hover ? 'var(--link)' : 'var(--text-muted)',
      transition: 'color 120ms ease'
    }
  }, "\u2192"));
}
function HomeScreen({
  navigate,
  openPost
}) {
  const d = window.BLOG_DATA;
  const guide = [{
    label: 'Posts',
    text: `Long-form writing, mostly tech. ${d.posts.length} so far.`,
    to: 'blogs'
  }, {
    label: 'Notes',
    text: 'Short things that don\u2019t need a whole post.',
    to: 'notes'
  }, {
    label: 'Now',
    text: 'Training, rides, calories, and what I\u2019ve been watching.',
    to: 'now'
  }, {
    label: 'About',
    text: 'Work, what I use, and a few highlights.',
    to: 'about'
  }, {
    label: 'Résumé',
    text: 'The PDF version.',
    to: null
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...WRAP,
      padding: '72px 24px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '24px',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      ...BLOG_H1,
      fontSize: 'var(--text-5xl)'
    }
  }, "Hi, I'm Anshuman."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '18px 0 0',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-xl)',
      lineHeight: 'var(--leading-snug)',
      color: 'var(--text-body)',
      textWrap: 'pretty'
    }
  }, "I'm a software engineer at Flexera in Bangalore, working on FinOps AI. I write about software, AI, and the things I get up to away from the keyboard.")), /*#__PURE__*/React.createElement("img", {
    src: d.author.avatar,
    alt: d.author.name,
    style: {
      width: '96px',
      height: '96px',
      borderRadius: '50%',
      objectFit: 'cover',
      flexShrink: 0,
      marginTop: '6px'
    }
  })), /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Sections",
    style: {
      marginTop: '44px',
      borderTop: '1px solid var(--border-hairline)'
    }
  }, guide.map((g, i) => /*#__PURE__*/React.createElement(GuideRow, {
    key: g.label,
    label: g.label,
    text: g.text,
    last: i === guide.length - 1,
    onClick: () => g.to && navigate(g.to)
  }))), /*#__PURE__*/React.createElement("h2", {
    style: {
      ...BLOG_LABEL,
      marginTop: '56px'
    }
  }, "Recent posts"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '4px',
      borderTop: '1px solid var(--border-hairline)'
    }
  }, d.posts.slice(0, 3).map((p, i) => /*#__PURE__*/React.createElement(PostRow, {
    key: p.id,
    post: p,
    openPost: openPost,
    last: i === 2
  }))), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      navigate('blogs');
    },
    style: {
      ...BLOG_LINK,
      display: 'inline-block',
      marginTop: '16px'
    }
  }, "All posts \u2192"));
}
function BlogsScreen({
  openPost
}) {
  const d = window.BLOG_DATA;
  const years = [];
  d.posts.forEach(p => {
    const y = p.datePath.slice(0, 4);
    const g = years.find(x => x.year === y);
    if (g) g.posts.push(p);else years.push({
      year: y,
      posts: [p]
    });
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...WRAP,
      padding: '56px 24px 0'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: BLOG_H1
  }, "Posts"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-muted)'
    }
  }, d.posts.length, " posts, mostly about tech. Occasionally not."), years.map(g => /*#__PURE__*/React.createElement("section", {
    key: g.year,
    style: {
      marginTop: '36px'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-meta)',
      fontWeight: 500,
      color: 'var(--text-muted)'
    }
  }, g.year), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '6px',
      borderTop: '1px solid var(--border-hairline)'
    }
  }, g.posts.map((p, i) => /*#__PURE__*/React.createElement(PostRow, {
    key: p.id,
    post: p,
    openPost: openPost,
    last: i === g.posts.length - 1
  }))))));
}
function ArticleBody({
  blocks
}) {
  return blocks.map((b, i) => {
    if (b.type === 'h2') return /*#__PURE__*/React.createElement("h2", {
      key: i,
      style: {
        margin: '36px 0 0',
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-3xl)',
        fontWeight: 600,
        letterSpacing: 'var(--tracking-tight)',
        lineHeight: 'var(--leading-snug)',
        color: 'var(--text-heading)'
      }
    }, b.text);
    if (b.type === 'code') return /*#__PURE__*/React.createElement("pre", {
      key: i,
      style: {
        margin: '24px 0',
        padding: '16px',
        background: 'var(--code-bg)',
        color: 'var(--code-fg)',
        borderRadius: '6px',
        overflowX: 'auto',
        fontFamily: 'var(--font-mono)',
        fontSize: '13px',
        lineHeight: 1.6
      }
    }, /*#__PURE__*/React.createElement("code", null, highlightCode(b.text)));
    return /*#__PURE__*/React.createElement("p", {
      key: i,
      style: {
        margin: '18px 0 0',
        fontFamily: 'var(--font-ui)',
        fontSize: 'var(--text-lg)',
        lineHeight: 'var(--leading-relaxed)',
        color: 'var(--text-body)',
        textWrap: 'pretty'
      }
    }, b.text);
  });
}
function ArticleScreen({
  post,
  navigate,
  openPost
}) {
  const d = window.BLOG_DATA;
  const idx = d.posts.findIndex(p => p.id === post.id);
  const older = d.posts[idx + 1];
  const body = post.body || [{
    type: 'p',
    text: post.excerpt
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...WRAP,
      padding: '48px 24px 0'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      navigate('blogs');
    },
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: '14px',
      color: 'var(--text-muted)',
      textDecoration: 'none'
    }
  }, "\u2190 All posts"), /*#__PURE__*/React.createElement("h1", {
    style: {
      ...BLOG_H1,
      marginTop: '20px',
      textWrap: 'pretty'
    }
  }, post.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '12px 0 0',
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      color: 'var(--text-muted)'
    }
  }, post.datePath, " \xB7 ", post.tag), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '24px'
    }
  }, /*#__PURE__*/React.createElement(ArticleBody, {
    blocks: body
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '32px 0 0',
      fontFamily: 'var(--font-mono)',
      fontSize: '12px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: 'var(--text-muted)',
      textDecoration: 'none'
    }
  }, "Edit on GitHub \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '24px',
      paddingTop: '24px',
      borderTop: '1px solid var(--border-hairline)',
      display: 'flex',
      gap: '14px',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: d.author.avatar,
    alt: d.author.name,
    style: {
      width: '44px',
      height: '44px',
      borderRadius: '50%',
      objectFit: 'cover',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-base)',
      lineHeight: 'var(--leading-normal)',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-heading)',
      fontWeight: 600
    }
  }, d.author.name), ' — ', d.author.role)), older && /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      openPost(older.id);
    },
    style: {
      ...BLOG_LINK,
      display: 'block',
      marginTop: '24px'
    }
  }, "\u2190 Previous: ", older.title));
}
Object.assign(window, {
  GuideRow,
  HomeScreen,
  BlogsScreen,
  ArticleScreen,
  PostRow,
  ArticleBody,
  highlightCode,
  BLOG_LABEL,
  BLOG_H1,
  BLOG_LINK
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/blog/Screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/blog/Screens2.jsx
try { (() => {
// About and Contact. Copy matches the live anshumankumar.net.

const WRAP2 = window.BLOG_WRAP;
const ABOUT_P = {
  margin: '16px 0 0',
  fontFamily: 'var(--font-ui)',
  fontSize: 'var(--text-lg)',
  lineHeight: 'var(--leading-relaxed)',
  color: 'var(--text-body)',
  textWrap: 'pretty'
};
function AboutScreen({
  navigate
}) {
  const d = window.BLOG_DATA;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...WRAP2,
      padding: '56px 24px 0'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: window.BLOG_H1
  }, "About me"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...ABOUT_P,
      marginTop: '20px'
    }
  }, "I'm a software engineer at Flexera in Bangalore, working on FinOps AI: cloud-cost anomaly detection and the agents that explain it."), /*#__PURE__*/React.createElement("p", {
    style: ABOUT_P
  }, "Away from work, I'm usually running or cycling, playing board games, watching films, or making coffee. I like cooking too, when I can."), /*#__PURE__*/React.createElement("p", {
    style: ABOUT_P
  }, "Feel free to slide into my ", /*#__PURE__*/React.createElement("a", {
    href: "https://www.strava.com/athletes/34639203"
  }, "Strava"), " DMs for a ride, or connect with me on ", /*#__PURE__*/React.createElement("a", {
    href: "https://twitter.com/anshuman_kmr"
  }, "Twitter"), " (never calling it X)."), /*#__PURE__*/React.createElement("h2", {
    style: {
      ...window.BLOG_LABEL,
      marginTop: '48px'
    }
  }, "What I work with"), /*#__PURE__*/React.createElement("dl", {
    style: {
      margin: '12px 0 0',
      borderTop: '1px solid var(--border-hairline)'
    }
  }, d.skills.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.category,
    style: {
      display: 'grid',
      gridTemplateColumns: '120px minmax(0,1fr)',
      gap: '16px',
      padding: '12px 0',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("dt", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
      fontWeight: 500,
      color: 'var(--text-heading)'
    }
  }, s.category), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-base)',
      lineHeight: 'var(--leading-normal)',
      color: 'var(--text-muted)'
    }
  }, s.items)))), /*#__PURE__*/React.createElement("h2", {
    style: {
      ...window.BLOG_LABEL,
      marginTop: '40px'
    }
  }, "Off the clock"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '12px 0 0',
      padding: '0 0 0 18px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }
  }, d.hobbies.map(h => /*#__PURE__*/React.createElement("li", {
    key: h,
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-base)',
      lineHeight: 'var(--leading-normal)',
      color: 'var(--text-body)'
    }
  }, h))), /*#__PURE__*/React.createElement("h2", {
    style: {
      ...window.BLOG_LABEL,
      marginTop: '40px'
    }
  }, "A few highlights"), /*#__PURE__*/React.createElement("ol", {
    style: {
      margin: '12px 0 0',
      padding: 0,
      listStyle: 'none',
      borderTop: '1px solid var(--border-hairline)'
    }
  }, d.highlights.map(h => /*#__PURE__*/React.createElement("li", {
    key: h.title,
    style: {
      padding: '14px 0',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: '16px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
      fontWeight: 500,
      color: 'var(--text-heading)'
    }
  }, h.title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      color: 'var(--text-muted)'
    }
  }, h.date)), h.stats && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      color: 'var(--text-muted)'
    }
  }, h.stats), h.text && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-base)',
      lineHeight: 'var(--leading-normal)',
      color: 'var(--text-body)'
    }
  }, h.text)))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '40px 0 0',
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      navigate('now');
    },
    style: window.BLOG_LINK
  }, "Training, rides and calories are on Now \u2192"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      navigate('contact');
    },
    style: window.BLOG_LINK
  }, "Get in touch \u2192")));
}
function ContactScreen() {
  const d = window.BLOG_DATA;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...WRAP2,
      padding: '56px 24px 0'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: window.BLOG_H1
  }, "Contact"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...ABOUT_P,
      marginTop: '12px'
    }
  }, "Email is best, but I'm around in most of the usual places."), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '28px 0 0',
      padding: 0,
      listStyle: 'none',
      borderTop: '1px solid var(--border-hairline)'
    }
  }, d.contacts.map(c => /*#__PURE__*/React.createElement("li", {
    key: c.name,
    style: {
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: c.href,
    style: {
      display: 'grid',
      gridTemplateColumns: '20px 120px minmax(0,1fr)',
      gap: '14px',
      alignItems: 'center',
      padding: '14px 0',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: c.icon,
    "aria-hidden": "true",
    style: {
      color: 'var(--text-muted)',
      fontSize: '14px'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-base)',
      fontWeight: 500,
      color: 'var(--text-heading)'
    }
  }, c.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '13px',
      color: 'var(--link)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, c.description))))));
}
Object.assign(window, {
  AboutScreen,
  ContactScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/blog/Screens2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/blog/Screens3.jsx
try { (() => {
// Notes (short, untitled posts) and Now.

const WRAP3 = window.BLOG_WRAP;
function NotesScreen({
  openPost
}) {
  const d = window.BLOG_DATA;
  const {
    Note
  } = window.AnshumanSBlogDesignSystem_ceace2;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...WRAP3,
      padding: '56px 24px 0'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: window.BLOG_H1
  }, "Notes"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-muted)'
    }
  }, "Short things that don't need a whole post."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '28px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }
  }, d.notes.map(n => {
    const post = n.postId && d.posts.find(p => p.id === n.postId);
    return /*#__PURE__*/React.createElement(Note, {
      key: n.id,
      date: n.date,
      time: n.time
    }, n.text, post && /*#__PURE__*/React.createElement(React.Fragment, null, ' ', /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        openPost(post.id);
      },
      style: {
        color: 'var(--link)'
      }
    }, post.title, " \u2192")));
  })));
}
function NowScreen() {
  const d = window.BLOG_DATA;
  const {
    RecentRides,
    RecentFilms,
    CalorieLog
  } = window.AnshumanSBlogDesignSystem_ceace2;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...WRAP3,
      padding: '56px 24px 0'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: window.BLOG_H1
  }, "Now"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0',
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      color: 'var(--text-muted)'
    }
  }, "Updated ", d.now.updated, " \xB7 ", /*#__PURE__*/React.createElement("a", {
    href: "https://nownownow.com/about",
    style: {
      color: 'var(--text-muted)'
    }
  }, "what is this?")), /*#__PURE__*/React.createElement("dl", {
    style: {
      margin: '28px 0 0',
      borderTop: '1px solid var(--border-hairline)'
    }
  }, d.now.items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.label,
    style: {
      display: 'grid',
      gridTemplateColumns: '120px minmax(0,1fr)',
      gap: '16px',
      padding: '14px 0',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("dt", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
      fontWeight: 500,
      color: 'var(--text-heading)'
    }
  }, it.label), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-base)',
      lineHeight: 'var(--leading-normal)',
      color: 'var(--text-body)'
    }
  }, it.text)))), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '48px 0 0',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-3xl)',
      fontWeight: 600,
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--text-heading)'
    }
  }, "Keeping myself in check"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-base)',
      lineHeight: 'var(--leading-relaxed)',
      color: 'var(--text-muted)',
      textWrap: 'pretty'
    }
  }, "I'm trying to keep my calories in check, so here's my attempt at tracking them, along with what I've been up to on the bike."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '28px'
    }
  }, /*#__PURE__*/React.createElement(RecentRides, {
    rides: d.rides,
    limit: 3
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '36px'
    }
  }, CalorieLog && /*#__PURE__*/React.createElement(CalorieLog, {
    days: d.calories,
    limit: 3
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '48px'
    }
  }, /*#__PURE__*/React.createElement(RecentFilms, {
    films: d.films,
    limit: 4
  })));
}
Object.assign(window, {
  NotesScreen,
  NowScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/blog/Screens3.jsx", error: String((e && e.message) || e) }); }

// ui_kits/blog/data.js
try { (() => {
// Content for the blog UI kit.
//
// SOURCING NOTE — read this before editing.
// `posts` are the author's REAL published pieces, taken from the live
// anshumankumar.net (Oct 2026): real titles, dates, and opening lines.
// Only the AWS post and the JAMStack post carry more than the opening
// paragraph. Do not replace them with tidier invented posts.
//
// `notes`, `films`, and `rides` are SAMPLES that show the shape of the
// data. Notes are built from facts already on the site (race times, the
// ₹7,000 bill) but the wording is a placeholder; films and rides are
// made up. Replace all three with real data.
window.BLOG_DATA = {
  author: {
    name: 'Anshuman Kumar',
    nameHi: 'अंशुमन कुमार',
    role: 'Building FinOps AI at Flexera. Into running, cycling, board games, coffee, cooking when I can, and films.',
    handle: '@anshuman_kmr',
    avatar: '../../assets/profile-pic.jpg'
  },
  posts: [{
    id: 'aws',
    title: 'I Ran a Personal Blog on AWS. I Deserve What Happened.',
    datePath: '2026-06-27',
    tag: 'Tech',
    excerpt: 'For years I ran this blog on GCP. Cloud Build for the pipeline, GCS for the bucket, Strapi as the CMS.',
    body: [{
      type: 'p',
      text: 'For years I ran this blog on GCP. Cloud Build for the pipeline, GCS for the bucket, Strapi as the CMS. Strapi is a headless CMS — a full application with a database, an admin panel, and an API — which is a lot of machinery for a blog that a few dozen people read. I ran it anyway. It felt professional.'
    }, {
      type: 'p',
      text: 'Then Google charged me ₹7,000 for a Google Translate API key I had never used. Not a billing error. Not a test. A key I enabled, never called, and forgot existed. I asked for a refund. They said no. I migrated to AWS that week.'
    }, {
      type: 'p',
      text: 'This was not a considered architectural decision. It was spite.'
    }, {
      type: 'p',
      text: 'So I cut it. Strapi is gone — the posts live as markdown files fetched from a JSON file on GitHub. GitHub Actions builds it. Cloudflare Pages serves it for free. No database, no CMS, no IAM roles. The pipeline is one YAML file and a single deploy command.'
    }, {
      type: 'p',
      text: 'The blog is the same. The infrastructure bill is zero.'
    }]
  }, {
    id: 'mcp',
    title: 'I Built an MCP Server So Claude Could Manage My Blog — Here\u2019s What Actually Happened',
    datePath: '2026-06-21',
    tag: 'Tech',
    excerpt: 'I run a personal blog backed by Strapi CMS. It works fine. But every time I want to draft a post, I have to open the Strapi admin panel.'
  }, {
    id: 'autogen',
    title: 'Building a Scalable Music Recommendation System with AutoGen: A Real-World Implementation',
    datePath: '2025-02-22',
    tag: 'Tech',
    excerpt: 'As artificial intelligence continues to evolve, we\u2019re witnessing a fascinating shift from single-model systems to collaborative AI frameworks.'
  }, {
    id: 'jamstack',
    title: 'Step-by-Step: Building My Blog with JAMStack and Google Cloud',
    datePath: '2023-08-31',
    tag: 'Tech',
    excerpt: 'I embarked on a journey to discover the ideal platform for my blog. My goal was to find a self-hosted solution.',
    body: [{
      type: 'p',
      text: 'I embarked on a journey to discover the ideal platform for my blog. My goal was to find a self-hosted solution, steering clear of popular site builders.'
    }, {
      type: 'h2',
      text: 'Getting Scully to find the routes'
    }, {
      type: 'p',
      text: 'I added a code snippet to enable Scully to discover my Angular routes, located in src/assets/scully-routes.json.'
    }, {
      type: 'code',
      lang: 'json',
      text: '[\n  { "route": "/" },\n  { "route": "/blogs" },\n  { "route": "/contactme" }\n]'
    }, {
      type: 'h2',
      text: 'Picking a headless CMS'
    }, {
      type: 'p',
      text: 'After extensive research, I narrowed it down to two choices: Wordpress CMS and Strapi. I chose Strapi due to its integration with Postgres and the serverless Postgres offerings, including Neon.'
    }]
  }, {
    id: 'jovian',
    title: 'Jovian Generative AI Hackathon June 2023',
    datePath: '2023-08-02',
    tag: 'Tech',
    excerpt: 'I attended the recent GenAI Hackathon hosted by Jovian and I thought a quick blog about my experiences would be an excellent way to share my learning experience.'
  }, {
    id: 'streaming',
    title: 'Streaming using Flask and React',
    datePath: '2023-06-30',
    tag: 'Tech',
    excerpt: 'Large Language Models (LLMs) like GPT-3.5 by Open AI, have indeed taken the world by storm recently.'
  }, {
    id: 'chegg',
    title: 'Is ChatGPT really destroying Chegg\u2019s fortunes?',
    datePath: '2023-05-04',
    tag: 'Tech',
    excerpt: 'I am sure we have all seen the news of Chegg\u2019s stock price plumetting just after announcing its previous quarter\u2019s results.'
  }, {
    id: 'evil-dead',
    title: 'Thoughts on Evil Dead Rise (2023)',
    datePath: '2023-03-30',
    tag: 'Films',
    excerpt: '\u201cEvil Dead Rise\u201d is the latest installment in the Evil Dead franchise, directed by Irish writer-director Lee Cronin.'
  }, {
    id: 'gcp-exam',
    title: 'Preparing for the Google Cloud Professional Developer Exam',
    datePath: '2022-05-04',
    tag: 'Tech',
    excerpt: 'I gave the Professional Cloud Developer Exam in December 2022.'
  }, {
    id: 'mvcs',
    title: 'An Introduction To MVCS Architecture',
    datePath: '2021-04-20',
    tag: 'Tech',
    excerpt: 'In software engineering, a software design pattern (also known as a software architecture pattern) is a generally applicable and reusable solution\u2026'
  }, {
    id: 'manipal',
    title: 'Manipal \u2013 Shaping My Life for Good!',
    datePath: '2018-05-29',
    tag: 'Life',
    excerpt: 'Coming to MIT has been one of the most important decisions in my life.'
  }, {
    id: 'villain',
    title: 'What villain actually had a point?',
    datePath: '2018-04-01',
    tag: 'Films',
    excerpt: 'Roy Batty from the Blade Runner (1982) was the antagonist of the story but hardly a true villain.'
  }],
  // SAMPLE notes — short, untitled, no effort required.
  notes: [{
    id: 'n3',
    date: '2026-09-30',
    time: '21:12',
    text: 'Google still hasn\u2019t refunded the \u20b97,000.'
  }, {
    id: 'n2',
    date: '2026-09-27',
    time: '11:48',
    text: 'First half marathon back: 21.3 km, 2:46:48 moving. Mysore, which I ran completely untrained, was 2:39:12. Draw your own conclusions.'
  }, {
    id: 'n1',
    date: '2026-06-21',
    time: '19:05',
    text: 'Wrote up the MCP server that lets Claude draft posts for this blog.',
    postId: 'mcp'
  }],
  // SAMPLE films — replace with the Letterboxd RSS feed.
  films: [{
    title: 'Weapons',
    year: 2025,
    rating: 4,
    date: '2026-09-29'
  }, {
    title: 'Sinners',
    year: 2025,
    rating: 4.5,
    date: '2026-09-20'
  }, {
    title: 'Evil Dead Rise',
    year: 2023,
    rating: 3.5,
    date: '2026-09-14',
    rewatch: true
  }, {
    title: 'Blade Runner',
    year: 1982,
    rating: 5,
    date: '2026-09-06',
    rewatch: true
  }],
  // SAMPLE rides — replace with Strava API data (GET /athlete/activities).
  rides: [{
    name: 'Nandi Hills loop',
    date: '2026-09-28',
    distanceKm: 72.4,
    movingTimeSec: 11040,
    elevationM: 1180
  }, {
    name: 'Morning spin, Outer Ring Road',
    date: '2026-09-24',
    distanceKm: 28.1,
    movingTimeSec: 4020,
    elevationM: 140
  }, {
    name: 'Hesaraghatta out-and-back',
    date: '2026-09-21',
    distanceKm: 54.6,
    movingTimeSec: 8100,
    elevationM: 410
  }],
  // From the live About page ("A few highlights").
  highlights: [{
    title: 'September half marathon',
    date: '27 September 2026',
    stats: '21.30 km · 2:46:48 moving time',
    text: 'My first half marathon back.'
  }, {
    title: '30 in 30 ride',
    date: '15 February 2026',
    stats: '29.67 km · 1:00:50 moving time',
    text: 'Set personal bests over 10 km (19:45), 20 km (40:11), and 10 miles (31:59).'
  }, {
    title: 'Joined Flexera',
    date: 'December 2025'
  }, {
    title: 'Billu',
    date: '20 July 2024',
    text: 'Adopted this orange furball.'
  }, {
    title: 'Temple Run',
    date: '7 July 2024',
    stats: '208.55 km · 10:38:51 moving time',
    text: 'A long-distance cycling event with checkpoints and a time limit. Did it for the heck of it.'
  }, {
    title: 'Mysore Half Marathon',
    date: '23 June 2024',
    stats: '21.26 km · 2:39:12 moving time',
    text: 'Ran this one completely untrained.'
  }, {
    title: 'Ride to Nandi Hills',
    date: '15 June 2024',
    stats: '131.32 km · 7:04:53 moving time',
    text: 'Brutal heat and some crazy climbs.'
  }, {
    title: 'Bangalore Half Marathon',
    date: '8 October 2023',
    stats: '22.85 km · 2:54:22 moving time',
    text: 'Overtrained, with a lot to learn about pacing and racing.'
  }],
  // SAMPLE calorie totals — replace with the MyFitnessPal diary, fetched at build time.
  calories: [{
    date: '2026-10-02',
    eaten: 1840,
    goal: 2100
  }, {
    date: '2026-10-01',
    eaten: 2260,
    goal: 2100
  }, {
    date: '2026-09-30',
    eaten: 1975,
    goal: 2100
  }],
  now: {
    updated: '2026-10-03',
    items: [{
      label: 'Work',
      text: 'Building FinOps AI at Flexera: cloud-cost anomaly detection and the agents that explain it.'
    }, {
      label: 'Training',
      text: 'Back to running and cycling since February 2026. Ran my first half marathon back on 27 September.'
    }, {
      label: 'This site',
      text: 'Off AWS and onto Cloudflare Pages. The infrastructure bill is zero.'
    }]
  },
  skills: [{
    category: 'AI/ML',
    items: 'Generative AI, Prompt Engineering, Machine Learning (Scikit-learn, Keras)'
  }, {
    category: 'Cloud',
    items: 'AWS, GCP, Vertex AI, Kubernetes'
  }, {
    category: 'Languages',
    items: 'Python, SQL, JavaScript'
  }, {
    category: 'CI/CD',
    items: 'GitLab CI, GitHub Actions'
  }, {
    category: 'Databases',
    items: 'Postgres, MySQL, Firestore'
  }],
  hobbies: ['Running and cycling, with the occasional race or very long ride.', 'Board games.', 'Cooking, when I can.', 'Coffee. I have a professional grinder and a De\u2019Longhi EC685 that I cannot recommend enough.', 'Watching and analysing films, especially horror and thrillers.', 'Memes, pop culture, and trying out new tech.'],
  contacts: [{
    name: 'Email',
    icon: 'fa-solid fa-envelope',
    description: 'anshumankumar.mail@gmail.com',
    href: 'mailto:anshumankumar.mail@gmail.com'
  }, {
    name: 'LinkedIn',
    icon: 'fa-brands fa-linkedin',
    description: 'in/anshumankumarcs',
    href: 'https://www.linkedin.com/in/anshumankumarcs'
  }, {
    name: 'GitHub',
    icon: 'fa-brands fa-github',
    description: 'anshumankmr',
    href: 'https://github.com/anshumankmr'
  }, {
    name: 'Twitter',
    icon: 'fa-brands fa-twitter',
    description: '@anshuman_kmr',
    href: 'https://twitter.com/anshuman_kmr'
  }, {
    name: 'Strava',
    icon: 'fa-brands fa-strava',
    description: 'athletes/34639203',
    href: 'https://www.strava.com/athletes/34639203'
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/blog/data.js", error: String((e && e.message) || e) }); }

__ds_ns.CalorieLog = __ds_scope.CalorieLog;

__ds_ns.RecentFilms = __ds_scope.RecentFilms;

__ds_ns.RecentRides = __ds_scope.RecentRides;

__ds_ns.Bio = __ds_scope.Bio;

__ds_ns.Note = __ds_scope.Note;

__ds_ns.PostListItem = __ds_scope.PostListItem;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.ThemeToggle = __ds_scope.ThemeToggle;

})();
