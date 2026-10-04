import type { Metadata } from "next"
import { FaEnvelope, FaLinkedin, FaGithub, FaTwitter, FaHackerNews, FaGoodreadsG, FaSpotify, FaSteam, FaPlaystation } from "react-icons/fa"
import { pageMetadata } from "@/lib/metadata"
import { PERSON } from "@/lib/identity"

export const metadata: Metadata = pageMetadata("Contact", "Get in touch with Anshuman Kumar.", "/contact/")

const contacts = [
  {
    name: "Email",
    href: "mailto:anshumankumar.mail@gmail.com",
    icon: FaEnvelope,
    description: "anshumankumar.mail@gmail.com",
  },
  {
    name: "LinkedIn",
    href: PERSON.profiles.linkedin,
    icon: FaLinkedin,
    description: "anshumankumarcs",
  },
  {
    name: "GitHub",
    href: PERSON.profiles.github,
    icon: FaGithub,
    description: "@anshumankmr",
  },
  {
    name: "Twitter",
    href: PERSON.profiles.twitter,
    icon: FaTwitter,
    description: `@${PERSON.handle}`,
  },
  {
    name: "Hacker News",
    href: PERSON.profiles.hackerNews,
    icon: FaHackerNews,
    description: "anshumankmr",
  },
  {
    name: "Goodreads",
    href: PERSON.profiles.goodreads,
    icon: FaGoodreadsG,
    description: `@${PERSON.handle}`,
  },
  {
    name: "Spotify",
    href: PERSON.profiles.spotify,
    icon: FaSpotify,
    description: new URL(PERSON.profiles.spotify).pathname.split("/").at(-1),
  },
  {
    name: "Steam",
    href: PERSON.profiles.steam,
    icon: FaSteam,
    description: new URL(PERSON.profiles.steam).pathname.split("/").filter(Boolean).at(-1),
  },
  {
    name: "PlayStation",
    href: PERSON.profiles.playstation,
    icon: FaPlaystation,
    description: new URL(PERSON.profiles.playstation).pathname.split("/").filter(Boolean).at(-1),
  },
]

export default function ContactPage() {
  return (
    <div className="page-container">
      <h1>Say hello</h1>
      <p className="page-intro">
        I read every message. Email is the quickest way to reach me; you can
        also find me in these places. I use @{PERSON.handle} as my main online handle.
        (wherever I can)
      </p>
      <ul className="mt-8 border-t border-border-hairline">
        {contacts.map(({ name, href, description, icon: Icon }) => (
          <li key={name} className="border-b border-border-hairline">
            <a
              href={href}
              className="contact-link"
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                href.startsWith("mailto:") ? undefined : "me noopener noreferrer"
              }
            >
              <Icon size={18} aria-hidden="true" />
              <div className="min-w-0">
                <h2>{name}</h2>
                <p className="contact-description">{description}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
