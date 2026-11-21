// Everything the Keystone pages link to lives here, so going live is a matter
// of filling in these values. Empty values render a "coming soon" fallback
// instead of a broken link.

/** Chrome Web Store item ID (the 32-letter ID in the listing URL). */
export const CWS_ITEM_ID = 'aodkbjnmilcabkcfdkajgkgeddcngnin';

export const CWS_URL = CWS_ITEM_ID ? `https://chromewebstore.google.com/detail/${CWS_ITEM_ID}` : '';

/** Store link tagged with where the click came from, for the Web Store dashboard's traffic sources. */
export function storeLink(source: string): string {
  if (!CWS_URL) return '';
  const params = new URLSearchParams({ utm_source: source, utm_medium: 'site', utm_campaign: 'launch' });
  return `${CWS_URL}?${params}`;
}

/**
 * A Google Form plus the `entry.<id>` names of the fields Keystone prefills.
 * Get both from the form's "Get pre-filled link" menu item.
 */
export type GoogleForm = {
  /** The form's public URL, ending in /viewform. */
  url: string;
  /** Maps a URL query parameter (e.g. "v") to the form field it prefills (e.g. "entry.123456"). */
  prefill: Record<string, string>;
};

/** Feedback and bug reports. The extension links here with ?v=<version>&kind=<support|positive|negative>. */
export const FEEDBACK_FORM: GoogleForm = {
  url: '',
  prefill: { v: '', kind: '' },
};

/** Opened by Chrome when someone uninstalls Keystone, with ?v=<version>. */
export const UNINSTALL_FORM: GoogleForm = {
  url: '',
  prefill: { v: '' },
};

/**
 * Your Buy Me a Coffee page, e.g. https://buymeacoffee.com/<your-username>.
 * Tips there are one-time by default. The button only renders once this is set.
 */
export const TIP_URL = '';

export const hasTipLink = TIP_URL.startsWith('https://');

/** Builds the embeddable form URL, copying only known query parameters into their form fields. */
export function embeddedFormUrl(form: GoogleForm, query: URLSearchParams): string {
  if (!form.url) return '';
  const url = new URL(form.url);
  url.searchParams.set('embedded', 'true');
  let prefilled = false;
  for (const [param, entry] of Object.entries(form.prefill)) {
    const value = query.get(param)?.slice(0, 100);
    if (entry && value) {
      url.searchParams.set(entry, value);
      prefilled = true;
    }
  }
  if (prefilled) url.searchParams.set('usp', 'pp_url');
  return url.toString();
}

/**
 * The Keystone pages are a small site of their own inside the blog: they get
 * Keystone's own header and footer, and the blog's are hidden there. The
 * privacy page keeps its old address because the Web Store listing links to it.
 */
export function isKeystonePath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return /^\/keystone(\/|$)/.test(pathname) || /^\/privacy\/keystone(\/|$)/.test(pathname);
}
