import type { Metadata } from 'next';
import { FaEnvelope, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Anshuman Kumar.',
};

const socialLinks = [
  {
    name: 'Email',
    href: 'mailto:anshumankumar.mail@gmail.com',
    icon: FaEnvelope,
    description: 'anshumankumar.mail@gmail.com',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/anshuman-kumar-work/',
    icon: FaLinkedin,
    description: 'Connect on LinkedIn',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/anshumankmr',
    icon: FaGithub,
    description: 'Check out my code',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/anshuman_kmr',
    icon: FaTwitter,
    description: '@anshuman_kmr',
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-heading mb-4">
          <span className="gradient-text">Get in Touch</span>
        </h1>
        <p className="text-lg text-text-light">
          I&apos;m passionate about connecting with like-minded people. Feel
          free to reach out!
        </p>
      </div>

      <div className="grid gap-4">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target={link.name === 'Email' ? undefined : '_blank'}
            rel={link.name === 'Email' ? undefined : 'noopener noreferrer'}
            className="card p-5 flex items-center gap-4 hover:border-accent border border-transparent transition-all group"
          >
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <link.icon className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-heading group-hover:text-accent transition-colors">
                {link.name}
              </h2>
              <p className="text-sm text-text-light">{link.description}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href="mailto:anshumankumar.mail@gmail.com"
          className="btn-primary text-lg"
        >
          <FaEnvelope className="inline mr-2" />
          Email Me
        </a>
      </div>
    </div>
  );
}
