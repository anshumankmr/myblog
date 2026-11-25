import type { ReactNode } from "react"
import type { IconType } from "react-icons"
import { FaEnvelope, FaLinkedin, FaTwitter, FaGithub, FaHackerNews, FaStrava, FaGoodreads, FaSpotify, FaSteam, FaPlaystation, FaRss } from "react-icons/fa"
import { SiLetterboxd } from "react-icons/si"
import type { Metadata } from "next"
import { pageMetadata } from "@/lib/metadata"
import { PERSON } from "@/lib/identity"

export const metadata: Metadata = pageMetadata("Contact", "Get in touch with Anshuman Kumar.", "/contact/")

const lastSegment = (url: string) => new URL(url).pathname.split("/").filter(Boolean).at(-1)

const contacts: {
  name: string; kicker: string; href: string; icon: IconType; color: string; handle: ReactNode; primary?: boolean; action?: string
}[] = [
  { name: "Email", kicker: "Fastest reply", href: "mailto:anshumankumar.mail@gmail.com", icon: FaEnvelope, color: "var(--link)", handle: <>anshumankumar.mail<wbr />@gmail.com</>, primary: true },
  { name: "LinkedIn", kicker: "Work", href: PERSON.profiles.linkedin, icon: FaLinkedin, color: "#0a66c2", handle: "anshumankumarcs" },
  { name: "Twitter", kicker: "Chatter", href: PERSON.profiles.twitter, icon: FaTwitter, color: "#1d9bf0", handle: `@${PERSON.handle}` },
  { name: "GitHub", kicker: "Code", href: PERSON.profiles.github, icon: FaGithub, color: "var(--text-heading)", handle: "@anshumankmr" },
  { name: "Hacker News", kicker: "Code", href: PERSON.profiles.hackerNews, icon: FaHackerNews, color: "#ff6600", handle: "anshumankmr" },
  { name: "Strava", kicker: "Rides & runs", href: PERSON.profiles.strava, icon: FaStrava, color: "var(--strava)", handle: "Anshuman K", action: "Follow →" },
  { name: "Letterboxd", kicker: "Films", href: PERSON.profiles.letterboxd, icon: SiLetterboxd, color: "#00e054", handle: "jabwemetguy" },
  { name: "Goodreads", kicker: "Books", href: PERSON.profiles.goodreads, icon: FaGoodreads, color: "#b7a88c", handle: `@${PERSON.handle}` },
  { name: "Spotify", kicker: "Music", href: PERSON.profiles.spotify, icon: FaSpotify, color: "#1ed760", handle: lastSegment(PERSON.profiles.spotify) },
  { name: "Steam", kicker: "Games", href: PERSON.profiles.steam, icon: FaSteam, color: "#66c0f4", handle: lastSegment(PERSON.profiles.steam) },
  { name: "PlayStation", kicker: "Games", href: PERSON.profiles.playstation, icon: FaPlaystation, color: "#3d7dff", handle: lastSegment(PERSON.profiles.playstation) },
  { name: "RSS", kicker: "Subscribe", href: "/rss.xml", icon: FaRss, color: "#f59e0b", handle: "rss.xml" },
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
        {contacts.map(({ name, kicker, href, icon: Icon, color, handle, primary, action }) => {
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
                  <span className="social-name"><Icon className="social-icon" style={{ color }} aria-hidden="true" />{name}</span>
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
