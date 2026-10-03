"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import useSWR from "swr"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { getBlogByArticleId, blogsFetcher, type Blog } from "@/lib/api"
import { formatDate, getDatePath, generateSlug } from "@/lib/utils"
import Bio from "@/components/bio"

function BlogPostSkeleton() {
  return (
    <div className="page-container">
      <div className="skeleton h-10 w-3/4 mb-4" />
      <div className="skeleton h-5 w-40 mb-8" />
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="skeleton h-4 w-full" />
        ))}
      </div>
    </div>
  )
}

function BlogPostContent() {
  const searchParams = useSearchParams()
  const articleId = searchParams.get("id")

  const {
    data: blog,
    error,
    isLoading,
  } = useSWR<Blog | null>(
    articleId ? `blog-${articleId}` : null,
    () => (articleId ? getBlogByArticleId(articleId) : null),
    {
      revalidateOnFocus: false,
    }
  )

  const { data: allBlogs } = useSWR<Blog[]>("blogs", blogsFetcher)

  if (isLoading) {
    return <BlogPostSkeleton />
  }

  if (error || !blog) {
    return (
      <div className="page-container">
        <div className="bg-surface-sunken rounded-md p-6">
          <h1 className="text-xl font-heading font-bold text-text-heading mb-2">
            Post Not Found
          </h1>
          <p className="text-text-meta mb-4">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/blogs" className="btn-primary">
            Back to All Posts
          </Link>
        </div>
      </div>
    )
  }

  const { Title, date, Content } = blog.attributes

  // Find previous and next posts
  let prevPost: Blog | null = null
  let nextPost: Blog | null = null

  if (allBlogs) {
    const currentIndex = allBlogs.findIndex(b => b.id === blog.id)
    if (currentIndex > 0) {
      nextPost = allBlogs[currentIndex - 1]
    }
    if (currentIndex < allBlogs.length - 1) {
      prevPost = allBlogs[currentIndex + 1]
    }
  }

  const getPostUrl = (post: Blog) => {
    const datePath = getDatePath(post.attributes.date)
    const slug = generateSlug(post.attributes.Title)
    return `/article/${datePath}/${slug}/?id=${post.attributes.articleId}`
  }

  return (
    <div className="page-container">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-heading font-semibold text-text-heading leading-tight">
            {Title}
          </h1>
          <time className="meta block mt-3">{formatDate(date)}</time>
        </header>

        <div className="prose max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-strong"
                >
                  {children}
                </a>
              ),
              code: ({ className, children, ...props }) => {
                const isInline = !className
                if (isInline) {
                  return (
                    <code
                      className="bg-surface-sunken px-1.5 py-0.5 rounded text-sm"
                      {...props}
                    >
                      {children}
                    </code>
                  )
                }
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              },
            }}
          >
            {Content}
          </ReactMarkdown>
        </div>
      </article>

      <hr className="my-8 border-border-hairline" />

      <Bio />

      <nav className="article-nav">
        {prevPost && (
          <Link href={getPostUrl(prevPost)} className="group">
            <span className="meta">&larr; Previous</span>
            <span className="block mt-1 font-heading font-medium text-text-heading group-hover:text-accent transition-colors">
              {prevPost.attributes.Title}
            </span>
          </Link>
        )}
        {nextPost && (
          <Link href={getPostUrl(nextPost)} className="group">
            <span className="meta">Next &rarr;</span>
            <span className="block mt-1 font-heading font-medium text-text-heading group-hover:text-accent transition-colors">
              {nextPost.attributes.Title}
            </span>
          </Link>
        )}
      </nav>

      <div className="mt-8 text-center">
        <Link
          href="/blogs"
          className="text-accent hover:text-accent-strong font-medium"
        >
          &larr; Back to All Posts
        </Link>
      </div>
    </div>
  )
}

export default function BlogPostClient() {
  return (
    <Suspense fallback={<BlogPostSkeleton />}>
      <BlogPostContent />
    </Suspense>
  )
}
