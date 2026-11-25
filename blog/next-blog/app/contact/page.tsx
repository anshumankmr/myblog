import type { ReactNode } from "react"
import type { Metadata } from "next"
import { pageMetadata } from "@/lib/metadata"
import { PERSON } from "@/lib/identity"

export const metadata: Metadata = pageMetadata("Contact", "Get in touch with Anshuman Kumar.", "/contact/")

const lastSegment = (url: string) => new URL(url).pathname.split("/").filter(Boolean).at(-1)

const contacts: {
  name: string; kicker: string; href: string; dot: string; handle: ReactNode; primary?: boolean; action?: string
}[] = [
  { name: "Email", kicker: "Fastest reply", href: "mailto:anshumankumar.mail@gmail.com", dot: "#63a2ff", handle: <>anshumankumar.mail<wbr />@gmail.com</>, primary: true },
  { name: "LinkedIn", kicker: "Work", href: PERSON.profiles.linkedin, dot: "#0a66c2", handle: "anshumankumarcs" },
  { name: "Twitter", kicker: "Chatter", href: PERSON.profiles.twitter, dot: "#1d9bf0", handle: `@${PERSON.handle}` },
  { name: "GitHub", kicker: "Code", href: PERSON.profiles.github, dot: "var(--text-heading)", handle: "@anshumankmr" },
  { name: "Hacker News", kicker: "Code", href: PERSON.profiles.hackerNews, dot: "#ff6600", handle: "anshumankmr" },
  { name: "Strava", kicker: "Rides & runs", href: PERSON.profiles.strava, dot: "var(--strava)", handle: "Anshuman K", action: "Follow →" },
  { name: "Letterboxd", kicker: "Films", href: PERSON.profiles.letterboxd, dot: "#00e054", handle: "jabwemetguy" },
  { name: "Goodreads", kicker: "Books", href: PERSON.profiles.goodreads, dot: "#b7a88c", handle: `@${PERSON.handle}` },
  { name: "Spotify", kicker: "Music", href: PERSON.profiles.spotify, dot: "#1ed760", handle: lastSegment(PERSON.profiles.spotify) },
  { name: "Steam", kicker: "Games", href: PERSON.profiles.steam, dot: "#66c0f4", handle: lastSegment(PERSON.profiles.steam) },
  { name: "PlayStation", kicker: "Games", href: PERSON.profiles.playstation, dot: "#3d7dff", handle: lastSegment(PERSON.profiles.playstation) },
  { name: "RSS", kicker: "Subscribe", href: "/rss.xml", dot: "#f59e0b", handle: "rss.xml" },
]

export default function ContactPage() {
  return (
    <div className="page-container page-wide">
      <h1 className="page-title">Say hello</h1>
      <p className="page-intro max-w-[620px] mb-8">
        I read every message. Email is the quickest way to reach me; I&apos;m{" "}
        <span className="font-mono text-[var(--text-heading)]">@{PERSON.handle}</span> almost
        everywhere else.
      </p>
      <ul className="bento socials">
        {contacts.map(({ name, kicker, href, dot, handle, primary, action }) => {
          const external = /^https?:/.test(href)
          return (
            <li key={name} className="contents">
              <a
                href={href}
                className={`social${primary ? " social-primary" : ""}${action ? " social-strava" : ""}`}
                target={external ? "_blank" : undefined}
                rel={external ? "me noopener noreferrer" : undefined}
              >
                <span className="social-kicker">{kicker}{action && <b>{action}</b>}</span>
                <span className="flex flex-col gap-1">
                  <span className="social-name"><span className="social-dot" style={{ background: dot }} aria-hidden="true" />{name}</span>
                  <span className="social-handle">{handle}</span>
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
