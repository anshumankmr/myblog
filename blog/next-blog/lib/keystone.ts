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
 * One-time contribution tiers. Each `url` is a payment page for that amount
 * (most tip/payment-page tools let you make one link per amount, or one
 * pay-what-you-want link you can reuse for all three). The support section only
 * renders once at least one tier has a URL.
 */
export const SUPPORT_TIERS: { amount: string; label: string; url: string; featured?: boolean }[] = [
  { amount: '$3', label: 'Coffee', url: '' },
  { amount: '$5', label: 'Supporter', url: '', featured: true },
  { amount: '$10', label: 'Generous', url: '' },
];

export const hasSupportLinks = SUPPORT_TIERS.some(tier => tier.url);

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
