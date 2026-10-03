import Image from "next/image"
import Link from "next/link"
import { getAllPosts } from "@/lib/content"
import { getExcerpt } from "@/lib/utils"
import { PostListItem } from "@/components/blog/PostListItem"

export default function Home() {
  const posts = getAllPosts().slice(0, 4)
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
      <div className="mt-6 flex items-center gap-5 flex-wrap">
        <Link href="/blogs" className="btn-primary">
          Read the blog
        </Link>
        <Link href="/about">More about me →</Link>
      </div>
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
                excerpt={getExcerpt(post.content)}
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
    </div>
  )
}
