import Image from "next/image"
import Link from "next/link"
import { getAllPosts, getAllNotes } from "@/lib/content"
import { PostListItem } from "@/components/blog/PostListItem"
import { getExcerpt } from "@/lib/markdown"
import { formatNoteTimestamp } from "@/lib/utils"
import { pageMetadata, SITE_DESCRIPTION, HOME_TITLE } from "@/lib/metadata"
import { PERSON } from "@/lib/identity"

export const metadata = {
  ...pageMetadata(HOME_TITLE, SITE_DESCRIPTION, "/"),
  title: { absolute: HOME_TITLE },
}

export default function Home() {
  const allPosts = getAllPosts()
  const posts = allPosts.slice(0, 3)
  const notes = getAllNotes().slice(0, 2)
  return (
    <div className="page-container !pt-16">
      <div className="hero">
        <div className="flex-1 min-w-0">
          {/* Keep the name on one line so the surname never wraps alone. */}
          <h1>Hi, I&apos;m <span className="whitespace-nowrap">{PERSON.name}.</span></h1>
          <p className="lead">
            I&apos;m a {PERSON.jobTitle.toLowerCase()} at {PERSON.employer} in {PERSON.city},
            working on FinOps AI.
          </p>
        </div>
        <Image
          src={PERSON.image}
          alt={`Portrait of ${PERSON.name}, software engineer at ${PERSON.employer} in ${PERSON.city}`}
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
          <ol className="post-list">
            {notes.map((note, index) => (
              <li key={note.noteId} className={index === notes.length - 1 ? "" : "border-b border-border-hairline"}>
                <Link href={`/notes/${note.slug}/`} className="post-row">
                  <time dateTime={note.publishedAt} className="meta">
                    {formatNoteTimestamp(note.publishedAt)}
                  </time>
                  <p className="note-excerpt">{getExcerpt(note.content, 200) || "View note"}</p>
                </Link>
              </li>
            ))}
          </ol>
          <Link href="/notes" className="inline-block mt-4">All notes →</Link>
        </section>
      )}
    </div>
  )
}
