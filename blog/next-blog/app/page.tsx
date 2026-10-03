import Image from "next/image"
import Link from "next/link"
import { getAllPosts, getAllNotes } from "@/lib/content"
import { PostListItem } from "@/components/blog/PostListItem"
import Note from "@/components/note"
import { pageMetadata, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/metadata"

export const metadata = pageMetadata(SITE_TITLE, SITE_DESCRIPTION, "/")

export default function Home() {
  const allPosts = getAllPosts()
  const posts = allPosts.slice(0, 3)
  const notes = getAllNotes().slice(0, 2)
  const guide = [
    { href: "/blogs", label: "Posts", text: `Long-form writing, mostly tech. ${allPosts.length} so far.` },
    { href: "/notes", label: "Notes", text: "Short things that don’t need a whole post." },
    { href: "/now", label: "Now", text: "Work, training, and what I’ve been watching." },
    { href: "/about", label: "About", text: "Work, what I use, and a few highlights." },
    { href: "/resume.pdf", label: "Résumé", text: "The PDF version." },
  ]
  return (
    <div className="page-container !pt-16">
      <div className="hero">
        <div className="flex-1 min-w-0">
          <h1>Hi, I&apos;m Anshuman.</h1>
          <p className="lead">
            I&apos;m a software engineer at Flexera in Bangalore, working on
            FinOps AI.
          </p>
        </div>
        <Image
          src="https://avatars.githubusercontent.com/u/24219264?v=4"
          alt="Anshuman Kumar"
          width={96}
          height={96}
          className="hero-avatar"
          priority
        />
      </div>
      <p className="mt-5">
        I write about software, AI, and the things I get up to away from the
        keyboard: running, cycling, board games, cooking when I can, coffee, and
        films.
      </p>
      <nav className="section-guide" aria-label="Sections">
        {guide.map(item => (
          <Link key={item.href} href={item.href} className="guide-row">
            <span className="guide-label">{item.label}</span>
            <span className="guide-description">{item.text}</span>
            <span aria-hidden="true">→</span>
          </Link>
        ))}
      </nav>
      <section className="section" aria-labelledby="recent-posts">
        <h2 id="recent-posts" className="section-title">
          Recent posts
        </h2>
        {posts.length ? (
          <ol className="post-list">
            {posts.map((post, index) => (
              <PostListItem
                key={post.articleId}
                title={post.title}
                date={post.date}
                dateTime={post.date}
                excerpt={post.description}
                href={`/article/${post.date}/${post.slug}/`}
                last={index === posts.length - 1}
              />
            ))}
          </ol>
        ) : (
          <p className="text-text-meta">No posts yet. Check back soon.</p>
        )}
        <Link href="/blogs" className="inline-block mt-4">
          All posts →
        </Link>
      </section>
      {notes.length > 0 && (
        <section className="section" aria-labelledby="recent-notes">
          <h2 id="recent-notes" className="section-title">Recent notes</h2>
          <div className="notes-list">{notes.map(note => <Note key={note.noteId} note={note} />)}</div>
          <Link href="/notes" className="inline-block mt-4">All notes →</Link>
        </section>
      )}
    </div>
  )
}
