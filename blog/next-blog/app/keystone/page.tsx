import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SupportTiers } from '@/components/keystone/support-tiers';
import { pageMetadata } from '@/lib/metadata';
import { PERSON } from '@/lib/identity';
import { storeLink } from '@/lib/keystone';

export const metadata = pageMetadata(
  'Keystone: focus sessions for Chrome',
  'Keystone is a free Chrome extension that blocks the distracting parts of a website while keeping the parts you need for work. No account, no server, nothing sent anywhere by default.',
  '/keystone/',
);

const steps = [
  { title: 'Say what you’re working on', text: 'Click Keystone in the toolbar, type your intent (“learn React hooks”, “write chapter 3”), pick a session type and length, and start.' },
  { title: 'Browse normally', text: 'Keystone stays quiet on pages that fit your intent, including a tutorial on YouTube or a useful thread on Reddit.' },
  { title: 'Get nudged when you drift', text: 'When a page looks off-agenda, Keystone steps in: a gentle reminder, or a hard stop at the stricter levels. If it got it wrong, one click on “Wrong call” fixes it.' },
];

const dataFlow = [
  { title: 'By default: nothing', text: 'Your sessions, lists, history and settings are stored in your browser. Keystone has no account, no sign-in and no server, so there is nowhere for your browsing to be sent.' },
  { title: 'Chrome’s on-device AI', text: 'If your computer supports Chrome’s built-in AI, page checks run on your machine. Nothing leaves it.' },
  { title: 'A model on your own computer', text: 'You can point Keystone at a local server such as Ollama. Requests stay on your computer.' },
  { title: 'An AI service you choose (optional)', text: 'Only if you add your own key for OpenAI, Anthropic, Google Gemini, OpenRouter or OpenJEV, Keystone sends that service the current page’s address, title and description, along with what you said you’re working on and any persona details you’ve saved, straight from your browser. A short excerpt of page text is included only if you turn that on separately.' },
];

const permissions = [
  { title: 'Read and change data on all websites', text: 'So it can check the page you’re on during a session, show a nudge on that page, and enforce your block list on any site you choose. It doesn’t check pages when no session is running.' },
  { title: 'Tabs', text: 'To know which tab is active for the live verdict in the popup, and to send you back to your agenda.' },
  { title: 'Blocking rules, storage and alarms', text: 'To block sites at the browser level, keep your settings, and end sessions on time even when the popup is closed.' },
  { title: 'Scripting', text: 'Only to re-attach Keystone’s own packaged script to tabs that were already open when you installed or updated it. Keystone never downloads or runs code from the internet.' },
];

const faqs = [
  { q: 'Is it free?', a: 'Yes. There’s no paid tier and nothing to sign up for.' },
  { q: 'Do I need an AI key?', a: 'No. Blocking, sessions and the built-in rules work without any AI. During setup, Keystone recommends Chrome’s free on-device AI if your computer supports it. Adding your own key is optional.' },
  { q: 'Does it read my browsing history?', a: 'No. During a session it looks at the page you’re currently on to decide whether it fits your intent. It doesn’t read your history, and it doesn’t check pages outside a session.' },
  { q: 'I saw telemetry switches in the settings. What are those?', a: 'Optional anonymous statistics, off by default. This version of Keystone has no server for them to send to, so even if you turn them on, nothing is transmitted.' },
  { q: 'Which browsers does it support?', a: 'Desktop Chrome. Other browsers aren’t supported yet.' },
];

function DefinitionList({ items }: { items: { title: string; text: string }[] }) {
  return (
    <dl className="definition-list border-t border-border-hairline">
      {items.map(item => (
        <div key={item.title}>
          <dt>{item.title}</dt>
          <dd>{item.text}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function KeystonePage() {
  const install = storeLink('keystone-site');
  return (
    <div className="page-container">
      <p className="meta">Keystone · free Chrome extension</p>
      <h1 className="mt-3">Block YouTube Shorts. Keep YouTube tutorials.</h1>
      <p className="page-intro" style={{ fontSize: 19, lineHeight: 1.6 }}>
        Most blockers shut off a whole site. But the tutorial you need and the feed that eats your afternoon often live on the same site. Keystone starts from what you said you’re working on and judges each page against it.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        {install ? (
          <Button href={install}>Add to Chrome — it’s free</Button>
        ) : (
          <p className="meta">Coming to the Chrome Web Store soon.</p>
        )}
        <a href="#privacy" className="btn-ghost">How your data is handled ↓</a>
      </div>

      <section className="section border-t border-border-hairline pt-8" aria-labelledby="free-heading">
        <Badge>Free to use</Badge>
        <h2 id="free-heading" className="mt-4" style={{ fontSize: 21 }}>No subscription. No AI credits. No account.</h2>
        <p className="mt-3">
          Blocking and focus sessions work with no AI at all. For smarter page checks, use Chrome’s built-in AI, a model on your own computer, or your own key for an AI service. If you use a paid AI service, you pay it directly, and Keystone never sees that money or that key.
        </p>
      </section>

      <section className="section" aria-labelledby="how-heading">
        <h2 id="how-heading" className="section-title">How it works</h2>
        <ol className="ruled-list border-t border-border-hairline">
          {steps.map((step, i) => (
            <li key={step.title}>
              <strong style={{ color: 'var(--text-heading)' }}>{i + 1}. {step.title}.</strong> {step.text}
            </li>
          ))}
        </ol>
        <p className="mt-6">
          Your hard-block list stays on all the time, in and out of sessions. Sessions come in five strengths, from Gentle to Lockdown, and you can pause without losing your focused time.
        </p>
      </section>

      <section id="privacy" className="section" aria-labelledby="data-heading">
        <h2 id="data-heading" className="section-title">What leaves your machine</h2>
        <DefinitionList items={dataFlow} />
        <p className="mt-6">
          The full details are in the <Link href="/privacy/keystone/">privacy policy</Link>.
        </p>
      </section>

      <section className="section" aria-labelledby="check-heading">
        <h2 id="check-heading" className="section-title">Don’t take my word for it: check</h2>
        <p>You can watch every network request Keystone makes:</p>
        <ol className="mt-4 list-decimal pl-6 space-y-2">
          <li>Open <code>chrome://extensions</code> and turn on <strong>Developer mode</strong> (top right).</li>
          <li>On the Keystone card, click <strong>service worker</strong> next to “Inspect views”, then open the <strong>Network</strong> tab.</li>
          <li>Start a session and browse. With no AI service configured, you’ll see no requests at all, and never any to this site.</li>
        </ol>
      </section>

      <section className="section" aria-labelledby="permissions-heading">
        <h2 id="permissions-heading" className="section-title">Why it asks for these permissions</h2>
        <DefinitionList items={permissions} />
      </section>

      <section className="section" aria-labelledby="who-heading">
        <h2 id="who-heading" className="section-title">Who builds it</h2>
        <p>
          Keystone is a one-person project by me, {PERSON.name}, a {PERSON.jobTitle.toLowerCase()} in {PERSON.city}. You can find out more about me on the <Link href="/about/">About page</Link>,{' '}
          <a href={PERSON.profiles.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> and{' '}
          <a href={PERSON.profiles.github} target="_blank" rel="noopener noreferrer">GitHub</a>.
        </p>
      </section>

      <section className="section" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="section-title">Questions</h2>
        <dl className="definition-list border-t border-border-hairline">
          {faqs.map(item => (
            <div key={item.q}>
              <dt>{item.q}</dt>
              <dd>{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section" aria-labelledby="help-heading">
        <h2 id="help-heading" className="section-title">Found a bug? Have an idea?</h2>
        <p>Every message gets read. Wrong nudges especially: they’re how Keystone gets better.</p>
        <div className="mt-6">
          <Button href="/keystone/support/" variant="secondary">Send feedback</Button>
        </div>
      </section>

      <SupportTiers />
    </div>
  );
}
