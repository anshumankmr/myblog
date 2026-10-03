import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { pageMetadata } from "@/lib/metadata"

export const metadata: Metadata = pageMetadata("About", "A little about Anshuman Kumar: software engineer at Flexera, runner, cyclist, and fan of board games, cooking, coffee, and films.", "/about/")

const skills = [
  {
    category: "AI/ML",
    items:
      "Generative AI, Prompt Engineering, Machine Learning (Scikit-learn, Keras)",
  },
  { category: "Cloud", items: "AWS, GCP, Vertex AI, Kubernetes" },
  { category: "Languages", items: "Python, SQL, JavaScript" },
  { category: "CI/CD", items: "GitLab CI, GitHub Actions" },
  { category: "Databases", items: "Postgres, MySQL, Firestore" },
]

const hobbies = [
  "Running and cycling, with the occasional race or very long ride.",
  "Board games.",
  "Cooking, when I can.",
  "Coffee. I have a professional grinder and a De’Longhi EC685 that I cannot recommend enough.",
  "Watching and analysing films, especially horror and thrillers.",
  "Memes, pop culture, and trying out new tech.",
]

const highlights = [
  {
    name: "September half marathon",
    when: "27 September 2026",
    distance: "21.30 km",
    movingTime: "2:46:48",
    description: "My first half marathon back.",
  },
  {
    name: "30 in 30 ride",
    when: "15 February 2026",
    distance: "29.67 km",
    movingTime: "1:00:50",
    description:
      "Set personal bests over 10 km (19:45), 20 km (40:11), and 10 miles (31:59).",
  },
  {
    name: "Joined Flexera",
    when: "December 2025",
  },
  {
    name: "Billu",
    when: "20 July 2024",
    description: "Adopted this orange furball.",
    photo: {
      src: "/billu.jpg",
      alt: "Billu, my orange cat, lying down and looking at the camera",
      href: "https://unsplash.com/photos/GuK3U7typ18",
    },
  },
  {
    name: "Temple Run",
    when: "7 July 2024",
    distance: "208.55 km",
    movingTime: "10:38:51",
    description:
      "A long-distance cycling event with checkpoints and a time limit. Did it for the heck of it.",
  },
  {
    name: "Mysore Half Marathon",
    when: "23 June 2024",
    distance: "21.26 km",
    movingTime: "2:39:12",
    description: "Ran this one completely untrained.",
  },
  {
    name: "Ride to Nandi Hills",
    when: "15 June 2024",
    distance: "131.32 km",
    movingTime: "7:04:53",
    description: "Brutal heat and some crazy climbs.",
  },
  {
    name: "Bangalore Half Marathon",
    when: "8 October 2023",
    distance: "22.85 km",
    movingTime: "2:54:22",
    description: "Overtrained, with a lot to learn about pacing and racing.",
  },
]

function Section({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <section className="section">
      <h2 className="section-title">{label}</h2>
      {children}
    </section>
  )
}

export default function AboutPage() {
  return (
    <div className="page-container">
      <h1>About me</h1>
      <p className="lead">
        I&apos;m a software engineer at Flexera in Bangalore, working on FinOps
        AI: cloud-cost anomaly detection and the agents that explain it.
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
        Feel free to slide into my{" "}
        <a
          href="https://www.strava.com/athletes/34639203"
          target="_blank"
          rel="noopener noreferrer"
        >
          Strava
        </a>{" "}
        DMs for a ride, or connect with me on{" "}
        <a
          href="https://twitter.com/anshuman_kmr"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>{" "}
        (never calling it X).
      </p>
      <Section label="What I work with">
        <dl className="definition-list border-t border-border-hairline">
          {skills.map(skill => (
            <div key={skill.category}>
              <dt>{skill.category}</dt>
              <dd>{skill.items}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <Section label="Off the clock">
        <p className="mb-5">
          I got back to running and cycling in February 2026 after a long break.
        </p>
        <ul className="ruled-list border-t border-border-hairline">
          {hobbies.map(hobby => (
            <li key={hobby}>{hobby}</li>
          ))}
        </ul>
      </Section>
      <Section label="A few highlights">
        <ol
          className="highlight-timeline"
          aria-label="Highlights, newest first"
        >
          {highlights.map(highlight => (
            <li key={highlight.name} className="timeline-entry">
              <span className="timeline-marker" aria-hidden="true" />
              <h3 className="text-lg mb-1">{highlight.name}</h3>
              <p className="meta">
                {highlight.when}
                {highlight.distance && highlight.movingTime && (
                  <>
                    {" "}
                    · {highlight.distance} · {highlight.movingTime} moving time
                  </>
                )}
              </p>
              {highlight.description && (
                <p className="mt-2">{highlight.description}</p>
              )}
              {highlight.photo && (
                <figure className="mt-4 max-w-md">
                  <a
                    href={highlight.photo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={highlight.photo.src}
                      alt={highlight.photo.alt}
                      width={960}
                      height={640}
                      className="w-full h-auto"
                    />
                  </a>
                  <figcaption className="meta mt-2">
                    <a
                      href={highlight.photo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Obligatory Billu pic. View on Unsplash →
                    </a>
                  </figcaption>
                </figure>
              )}
            </li>
          ))}
        </ol>
      </Section>
      <p className="section"><Link href="/now">What I&apos;m up to now →</Link></p>
      <div className="section">
        <Button href="/contact">Get in touch</Button>
      </div>
    </div>
  )
}
