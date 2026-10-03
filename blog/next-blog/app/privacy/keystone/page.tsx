import type { Metadata } from "next"
import { pageMetadata } from "@/lib/metadata"

export const metadata: Metadata = {
  ...pageMetadata("Keystone Privacy Policy", "Privacy policy for the Keystone browser extension.", "/privacy/keystone/"),
  robots: {
    index: false,
    follow: false,
  },
}

const sections = [
  {
    title: "Information Keystone processes",
    content: (
      <>
        <p>
          Keystone may process the following information to provide its
          features:
        </p>
        <ul>
          <li>
            Extension settings, website allow/block lists, focus-session
            details, progress, and preferences.
          </li>
          <li>
            The URL, page title, and meta description of the active page during
            a focus session, so Keystone can determine whether the page is
            relevant to the user&apos;s stated task.
          </li>
          <li>
            A short excerpt of visible page text only when the user explicitly
            enables that optional setting.
          </li>
          <li>
            AI-provider configuration entered by the user, such as the selected
            provider, endpoint, model, and API key.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "How information is used",
    content: (
      <p>
        This information is used only to operate user-requested extension
        features, including enforcing website rules, running focus sessions,
        evaluating page relevance, displaying nudges, and showing progress.
      </p>
    ),
  },
  {
    title: "Local storage",
    content: (
      <p>
        Keystone stores settings and extension data locally in the user&apos;s
        browser using extension storage. Keystone does not sell this information
        or use it for advertising, credit decisions, or unrelated profiling.
      </p>
    ),
  },
  {
    title: "Optional AI services",
    content: (
      <>
        <p>
          AI-based page classification is optional. If the user configures an
          external AI provider, Keystone may send the active page&apos;s URL,
          title, meta description, and—only when separately enabled—a short
          visible-text excerpt to the selected provider. Depending on the
          user&apos;s configuration, that provider may be OpenAI, Anthropic, or
          a locally operated Ollama server.
        </p>
        <p>
          Requests to an external provider are governed by that provider&apos;s
          privacy policy and the user&apos;s agreement with that provider.
          Keystone does not send browsing context to an AI provider when AI
          classification is not configured or active.
        </p>
      </>
    ),
  },
  {
    title: "Browser permissions",
    content: (
      <>
        <p>
          Keystone uses browser permissions to store settings and focus-session
          data, schedule session timers, apply user-configured website-blocking
          rules, evaluate focus relevance, display extension UI, and inject
          Keystone&apos;s packaged content script into an already-open page when
          required after installation or an update.
        </p>
        <p>
          Keystone does not download or execute remote code. All executable
          extension code is included in the installed extension package.
        </p>
      </>
    ),
  },
  {
    title: "Sharing and sale of data",
    content: (
      <p>
        Keystone does not sell personal information. It does not share
        information with third parties except when the user explicitly
        configures an external AI provider and requests functionality that
        requires sending the page context described above to that provider.
      </p>
    ),
  },
  {
    title: "Data retention and deletion",
    content: (
      <p>
        Locally stored extension data remains in the browser until the user
        clears it, resets or removes the extension, or the browser removes the
        extension&apos;s storage. Users can remove AI-provider credentials and
        other saved configuration from Keystone&apos;s settings.
      </p>
    ),
  },
  {
    title: "Changes to this policy",
    content: (
      <p>
        This policy may be updated when Keystone&apos;s functionality or data
        practices change. The date shown on this page identifies the latest
        revision.
      </p>
    ),
  },
]

export default function KeystonePrivacyPage() {
  return (
    <article
      style={{
        maxWidth: "var(--container-text)",
        margin: "0 auto",
        padding: "var(--space-12) var(--space-6)",
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: "var(--font-ui)",
          fontSize: "var(--text-eyebrow)",
          fontWeight: 500,
          letterSpacing: "var(--tracking-caps)",
          textTransform: "uppercase",
          color: "var(--text-meta)",
        }}
      >
        Keystone browser extension
      </p>

      <h1
        style={{
          margin: "var(--space-4) 0 0",
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "var(--text-4xl)",
          lineHeight: "var(--leading-display)",
          letterSpacing: "-0.02em",
          color: "var(--text-display)",
        }}
      >
        Privacy Policy
      </h1>

      <p
        style={{
          margin: "var(--space-6) 0 0",
          color: "var(--text-muted)",
          fontFamily: "var(--font-ui)",
        }}
      >
        Last updated: July 11, 2026
      </p>

      <p
        style={{
          margin: "var(--space-10) 0 0",
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-xl)",
          lineHeight: "var(--leading-snug)",
        }}
      >
        Keystone helps users stay focused through website blocking, timed focus
        sessions, contextual nudges, and progress tracking. This policy explains
        how the extension handles information.
      </p>

      <div style={{ marginTop: "var(--space-16)" }}>
        {sections.map(section => (
          <section
            key={section.title}
            style={{
              padding: "var(--space-8) 0",
              borderTop: "1px solid var(--border-hairline)",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "var(--text-2xl)",
                color: "var(--text-heading)",
              }}
            >
              {section.title}
            </h2>
            <div
              style={{
                marginTop: "var(--space-4)",
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-base)",
                lineHeight: 1.75,
                color: "var(--text-body)",
              }}
            >
              {section.content}
            </div>
          </section>
        ))}

        <section
          style={{
            padding: "var(--space-8) 0",
            borderTop: "1px solid var(--border-hairline)",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "var(--text-2xl)",
              color: "var(--text-heading)",
            }}
          >
            Contact
          </h2>
          <p
            style={{
              margin: "var(--space-4) 0 0",
              fontFamily: "var(--font-body)",
              lineHeight: 1.75,
            }}
          >
            Questions or requests about this policy can be sent to{" "}
            <a
              href="mailto:anshumankumar.mail@gmail.com"
              style={{ color: "var(--accent)" }}
            >
              anshumankumar.mail@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  )
}
