import type { Metadata } from "next"
import Link from "next/link"
import { pageMetadata } from "@/lib/metadata"
import { PERSON } from "@/lib/identity"

export const metadata: Metadata = pageMetadata("About", `A little about ${PERSON.name}: ${PERSON.jobTitle.toLowerCase()} at ${PERSON.employer} in ${PERSON.city}, runner, cyclist, and fan of board games, cooking, coffee, and films.`, "/about/")

const cells = [
  { label: "AI / ML", chips: ["Generative AI", "Prompt eng.", "Scikit-learn", "Keras"] },
  { label: "Cloud", chips: ["AWS", "GCP", "Vertex AI", "Kubernetes"] },
  { label: "Languages", chips: ["Python", "SQL", "JavaScript"] },
  { label: "CI/CD · Databases", chips: ["GitLab CI", "GitHub Actions", "Postgres", "MySQL", "Firestore"] },
  { label: "Coffee", title: "De’Longhi EC685", text: "+ a professional grinder. Cannot recommend enough." },
  { label: "Films", title: "Horror & thrillers", text: "Watching and analysing.", link: { href: PERSON.profiles.letterboxd, label: "Letterboxd →" } },
  { label: "On the table", title: "Board games", text: "And cooking, when I can." },
  { label: "Also", title: "Memes & new tech", text: "Pop culture, trying out whatever just shipped." },
]

type Highlight = {
  when: string
  name: string
  kind: "activity" | "work" | "pet"
  stats?: string
  text?: string
  link?: { href: string; label: string }
}

// Newest first. Activities mirror the Strava entries they were logged under.
const highlights: Highlight[] = [
  { when: "27 Sep 2026", name: "September half marathon", kind: "activity", stats: "21.30 km · 2:46:48 · first one back" },
  { when: "15 Feb 2026", name: "30 in 30 ride", kind: "activity", stats: "29.67 km · PBs 10k 19:45 · 10mi 31:59 · 20k 40:11" },
  { when: "Dec 2025", name: "Joined Flexera", kind: "work" },
  { when: "20 Jul 2024", name: "Adopted Billu", kind: "pet", text: "This orange furball.", link: { href: "https://unsplash.com/photos/GuK3U7typ18", label: "Obligatory pic →" } },
  { when: "7 Jul 2024", name: "Temple Run", kind: "activity", stats: "208.55 km · 10:38:51 · for the heck of it" },
  { when: "23 Jun 2024", name: "Mysore Half Marathon", kind: "activity", stats: "21.26 km · 2:39:12 · untrained" },
  { when: "15 Jun 2024", name: "Ride to Nandi Hills", kind: "activity", stats: "131.32 km · 7:04:53 · brutal heat" },
  { when: "8 Oct 2023", name: "Bangalore Half Marathon", kind: "activity", stats: "22.85 km · 2:54:22 · overtrained" },
]

export default function AboutPage() {
  return (
    <div className="page-container page-wider">
      <div className="about-split">
        <section className="about-main">
          <h1 className="page-title mb-5">About {PERSON.name}</h1>
          <p className="lead !mt-0">
            I&apos;m a {PERSON.jobTitle.toLowerCase()} at {PERSON.employer} in {PERSON.city},
            working on FinOps AI: cloud-cost anomaly detection and the agents that explain it.
          </p>
          <p className="mt-5">
            Away from work, I&apos;m usually running or cycling, playing board
            games, watching films, or making coffee. I like cooking too, when I can.
          </p>
          <p className="mt-5">
            I write about software, AI, movies, cycling, running, and whatever else
            catches my attention. This is where those interests end up.
          </p>
          <p className="mt-5">
            Online, I go by <a href={PERSON.profiles.twitter} rel="me">@{PERSON.handle}</a>.
            {" "}<Link href="/contact/">Find my profiles and get in touch →</Link>
          </p>
          <p className="mt-5">
            Proudly featured on {" "}
            <a
              href="https://web.archive.org/web/20230613205935/https://1mb.club/"
              target="_blank"
              rel="noopener noreferrer"
            >
              1mb.club
            </a>
            , for keeping this site lightweight and fast.
          </p>
          <p className="mt-5">
            Feel free to slide into my{" "}
            <a href={PERSON.profiles.strava} target="_blank" rel="me noopener noreferrer">
              Strava
            </a>{" "}
            DMs for a ride, or connect with me on{" "}
            <a href={PERSON.profiles.twitter} target="_blank" rel="me noopener noreferrer">
              Twitter
            </a>{" "}
            (never calling it X).
          </p>
        </section>
        <aside className="about-aside" aria-labelledby="highlights-heading">
          <div className="tile-head mb-5">
            <h2 id="highlights-heading" className="tile-label">A few highlights</h2>
            <a href={PERSON.profiles.strava} target="_blank" rel="me noopener noreferrer" className="text-[12px] font-semibold !text-[var(--strava-text)]">Strava →</a>
          </div>
          <ol aria-label="Highlights, newest first">
            {highlights.map(highlight => (
              <li key={highlight.name} className="event">
                <span className="event-dot" data-kind={highlight.kind} aria-hidden="true" />
                <p className="meta">{highlight.when}</p>
                <p className="event-name">{highlight.name}</p>
                {highlight.stats && <p className="event-stats">{highlight.stats}</p>}
                {highlight.text && (
                  <p className="tile-note">
                    {highlight.text}
                    {highlight.link && <> <a href={highlight.link.href} target="_blank" rel="noopener noreferrer">{highlight.link.label}</a></>}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </aside>
      </div>
      <h2 className="tile-label mt-16 mb-4">What I work with · off the clock</h2>
      <div className="cells">
        {cells.map(cell => (
          <div key={cell.label} className="cell">
            <h3 className="tile-label">{cell.label}</h3>
            {cell.chips ? (
              <div className="chips">{cell.chips.map(chip => <span key={chip} className="chip">{chip}</span>)}</div>
            ) : (
              <>
                <p className="cell-title">{cell.title}</p>
                <p className="tile-note">
                  {cell.text}
                  {cell.link && <> <a href={cell.link.href} target="_blank" rel="me noopener noreferrer">{cell.link.label}</a></>}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
      <p className="mt-7 text-sm"><Link href="/now">What I&apos;m up to now →</Link></p>
    </div>
  )
}
