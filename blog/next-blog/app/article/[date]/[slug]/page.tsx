import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getAllPosts, getPost } from "@/lib/content"
import { formatDate } from "@/lib/utils"
import Bio from "@/components/bio"
import { renderMarkdown } from "@/lib/markdown"
import { pageMetadata } from "@/lib/metadata"

type Params = { date: string; slug: string }

export async function generateStaticParams(): Promise<Params[]> {
  return getAllPosts().map(p => ({ date: p.date, slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { date, slug } = await params
  const post = getPost(date, slug)
  if (!post) return { title: "Post not found", robots: { index: false } }
  const metadata = pageMetadata(post.title, post.description, `/article/${post.date}/${post.slug}/`, `/og/${post.articleId}`)
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article", publishedTime: `${post.date}T00:00:00+05:30`, authors: ["Anshuman Kumar"] } }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { date, slug } = await params
  const post = getPost(date, slug)
  if (!post) notFound()
  const html = await renderMarkdown(post.content)
  const posts = getAllPosts()
  const idx = posts.findIndex(p => p.slug === post.slug && p.date === post.date)
  const prevPost = idx < posts.length - 1 ? posts[idx + 1] : null
  const nextPost = idx > 0 ? posts[idx - 1] : null

  return (
    <div className="page-container">
      <Link href="/blogs" className="text-sm">
        ← All posts
      </Link>
      <article className="mt-5">
        <header className="mb-8">
          <h1>{post.title}</h1>
          <time dateTime={post.date} className="meta block mt-3">
            {formatDate(post.date)}
          </time>
        </header>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
        {post.sourcePath && (
          <a className="meta inline-block mt-8" href={`https://github.com/anshumankmr/anshumankmr.github.io/edit/master/${post.sourcePath.split('/').map(encodeURIComponent).join('/')}`} target="_blank" rel="noopener noreferrer">Edit on GitHub →</a>
        )}
      </article>
      <div className="section">
        <Bio />
      </div>
      <nav className="article-nav" aria-label="Adjacent posts">
        {prevPost && (
          <Link href={`/article/${prevPost.date}/${prevPost.slug}/`}>
            <span className="meta">← Previous</span>
            <strong>{prevPost.title}</strong>
          </Link>
        )}
        {nextPost && (
          <Link href={`/article/${nextPost.date}/${nextPost.slug}/`}>
            <span className="meta">Next →</span>
            <strong>{nextPost.title}</strong>
          </Link>
        )}
      </nav>
      <Link href="/blogs" className="inline-block mt-6">
        ← Back to all posts
      </Link>
    </div>
  )
}
