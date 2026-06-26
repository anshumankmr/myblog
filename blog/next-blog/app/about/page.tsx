import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Anshuman Kumar.',
};

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontSize: 'var(--text-eyebrow)',
  fontWeight: 500,
  letterSpacing: 'var(--tracking-caps)',
  textTransform: 'uppercase',
  color: 'var(--text-meta)',
};

const skills = [
  { category: 'AI/ML',          items: 'Generative AI, Prompt Engineering, Machine Learning (Scikit-learn, Keras)' },
  { category: 'Cloud',          items: 'AWS, GCP, Vertex AI, Kubernetes' },
  { category: 'Bot Development',items: 'Dialogflow, RASA' },
  { category: 'Languages',      items: 'Python, JavaScript' },
  { category: 'CI/CD',          items: 'GitLab CI, GitHub Actions' },
  { category: 'Databases',      items: 'Postgres, MySQL, Firestore' },
];

const hobbies = [
  'Cycling', 'Running (Marathons)', 'Exploring new tech innovations',
  'Watching and analysing films (horror & thriller)', 'Memes and pop culture',
];

const achievements = [
  { yr: '2023', text: 'Third prize at Jovian Hackathon for an open-source solution to automate coding tasks.' },
  { yr: '2023', text: 'Ran the Bangalore Half Marathon.' },
  { yr: '2022', text: 'Ran the Vedanta Delhi Half Marathon.' },
  { yr: '2021', text: 'Shipped a COVID-19 unemployment-insurance chatbot during a critical period.' },
  { yr: 'now',  text: 'Building and deploying AI systems — including Generative AI conversation agents.' },
];

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section style={{
      padding: 'var(--space-12) 0',
      borderTop: '1px solid var(--border-hairline)',
      display: 'grid',
      gridTemplateColumns: '180px 1fr',
      gap: 'var(--space-12)',
      alignItems: 'start',
    }}>
      <span style={{ ...eyebrow, paddingTop: '6px' }}>{label}</span>
      <div>{children}</div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 'var(--container-wide)', margin: '0 auto', padding: 'var(--space-16) var(--space-8) var(--space-24)' }}>

      {/* Eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
        <span style={{ width: '40px', height: '1px', background: 'var(--ink-400)', display: 'inline-block' }} />
        <span style={eyebrow}>Colophon</span>
      </div>

      <h1 style={{
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 'clamp(56px, 9vw, 128px)',
        lineHeight: 'var(--leading-display)',
        letterSpacing: '-0.02em',
        color: 'var(--text-display)',
      }}>
        About<br />the author.
      </h1>

      {/* Portrait + lede */}
      <div style={{
        marginTop: 'var(--space-16)',
        display: 'grid',
        gridTemplateColumns: '260px 1fr',
        gap: 'var(--space-12)',
        alignItems: 'start',
        paddingBottom: 'var(--space-12)',
      }}>
        <Image
          src="https://avatars.githubusercontent.com/u/24219264?v=4"
          alt="Anshuman Kumar"
          width={260}
          height={340}
          unoptimized
          style={{
            width: '260px',
            height: '340px',
            objectFit: 'cover',
            filter: 'grayscale(1) contrast(1.05)',
            background: 'var(--surface-sunken)',
          }}
        />
        <div>
          <p style={{
            margin: 0,
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xl)',
            lineHeight: 'var(--leading-snug)',
            color: 'var(--text-heading)',
          }}>
            <span style={{
              float: 'left',
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: '96px',
              lineHeight: '0.85',
              paddingRight: '12px',
              paddingTop: '6px',
              color: 'var(--text-display)',
            }}>I</span>
            &apos;m a software engineer in Bangalore, working at scale on AI systems at an ITAM &amp; FinOps company.
            The day job is generative AI and ML-driven conversation agents — the language models behind the conversations, the plumbing that makes them reliable.
          </p>
          <p style={{
            margin: 'var(--space-5) 0 0',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--text-body)',
          }}>
            The rest of the time I&apos;m on a road bike or a marathon route, watching old films, or writing the pieces you&apos;ll find here.
            This site is the quiet place between the commits.
          </p>
        </div>
      </div>

      {/* Stack */}
      <Section label="Stack">
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {skills.map((s) => (
            <li key={s.category} style={{
              display: 'grid',
              gridTemplateColumns: '180px 1fr',
              gap: 'var(--space-6)',
              alignItems: 'baseline',
              paddingBottom: 'var(--space-4)',
              borderBottom: '1px solid var(--border-hairline)',
            }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'var(--text-xl)',
                color: 'var(--text-heading)',
              }}>{s.category}</span>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                color: 'var(--text-body)',
                lineHeight: 'var(--leading-snug)',
              }}>{s.items}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Off the clock */}
      <Section label="Off the clock">
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', columns: 2, columnGap: 'var(--space-12)' }}>
          {hobbies.map((h) => (
            <li key={h} style={{
              breakInside: 'avoid',
              padding: 'var(--space-3) 0',
              borderBottom: '1px solid var(--border-hairline)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              color: 'var(--text-body)',
            }}>{h}</li>
          ))}
        </ul>
      </Section>

      {/* Marginalia */}
      <Section label="Marginalia">
        <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {achievements.map((a, i) => (
            <li key={i} style={{
              display: 'grid',
              gridTemplateColumns: '64px 1fr',
              gap: 'var(--space-6)',
              alignItems: 'baseline',
              padding: 'var(--space-4) 0',
              borderBottom: i === achievements.length - 1 ? 'none' : '1px solid var(--border-hairline)',
            }}>
              <span style={{
                ...eyebrow,
                color: 'var(--accent)',
                fontVariantNumeric: 'tabular-nums',
              }}>{a.yr}</span>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-lg)',
                lineHeight: 'var(--leading-snug)',
                color: 'var(--text-body)',
              }}>{a.text}</span>
            </li>
          ))}
        </ol>
      </Section>

      <div style={{ marginTop: 'var(--space-16)', textAlign: 'center' }}>
        <Button variant="primary" href="/contact">Get in touch</Button>
      </div>
    </div>
  );
}
