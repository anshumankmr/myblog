import type { Metadata } from "next"
import { getAllPosts } from "@/lib/content"
import { getExcerpt } from "@/lib/utils"
import Bio from "@/components/bio"
import { PostListItem } from "@/components/blog/PostListItem"

export const metadata: Metadata = { title: "Posts" }

export default function BlogsPage() {
  const posts = getAllPosts()
  return (
    <div className="page-container">
      <h1>Posts</h1>
      <p className="page-intro">
        {posts.length} posts, mostly about tech. Occasionally not.
      </p>
      {posts.length ? (
        <ol className="post-list mt-8">
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
        <p className="mt-8 text-text-meta">No posts yet. Check back soon.</p>
      )}
      <div className="section">
        <Bio />
      </div>
    </div>
  )
}
