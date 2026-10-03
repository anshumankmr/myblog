import type { Metadata } from "next"
import { FaEnvelope, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa"
import { pageMetadata } from "@/lib/metadata"

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
    href: "https://www.linkedin.com/in/anshumankumarcs/",
    icon: FaLinkedin,
    description: "Connect on LinkedIn",
  },
  {
    name: "GitHub",
    href: "https://github.com/anshumankmr",
    icon: FaGithub,
    description: "Check out my code",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/anshuman_kmr",
    icon: FaTwitter,
    description: "@anshuman_kmr",
  },
]

export default function ContactPage() {
  return (
    <div className="page-container">
      <h1>Say hello</h1>
      <p className="page-intro">
        I read every message. Email is the quickest way to reach me; you can
        also find me in these places.
      </p>
      <ul className="mt-8 border-t border-border-hairline">
        {contacts.map(({ name, href, description, icon: Icon }) => (
          <li key={name} className="border-b border-border-hairline">
            <a
              href={href}
              className="contact-link"
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                href.startsWith("mailto:") ? undefined : "noopener noreferrer"
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
