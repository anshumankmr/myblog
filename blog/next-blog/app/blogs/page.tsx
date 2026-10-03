import { getAllPosts } from "@/lib/content"
import { pageMetadata } from "@/lib/metadata"
import Bio from "@/components/bio"
import { PostListItem } from "@/components/blog/PostListItem"

export const metadata = pageMetadata("Posts", "Long-form writing by Anshuman Kumar, mostly about tech.", "/blogs/")

export default function BlogsPage() {
  const posts = getAllPosts()
  const years = [...new Set(posts.map(post => post.date.slice(0, 4)))]
  return (
    <div className="page-container">
      <h1>Posts</h1>
      <p className="page-intro">
        {posts.length} posts, mostly about tech. Occasionally not.
      </p>
      {posts.length ? (
        years.map(year => {
          const yearPosts = posts.filter(post => post.date.startsWith(year))
          return <section key={year} className="mt-8" aria-labelledby={`year-${year}`}>
          <h2 id={`year-${year}`} className="meta mb-3">{year}</h2>
          <ol className="post-list">
          {yearPosts.map((post, index) => (
            <PostListItem
              key={post.articleId}
              title={post.title}
              date={post.date}
              dateTime={post.date}
              excerpt={post.description}
              href={`/article/${post.date}/${post.slug}/`}
              last={index === yearPosts.length - 1}
            />
          ))}
          </ol></section>
        })
      ) : (
        <p className="mt-8 text-text-meta">No posts yet. Check back soon.</p>
      )}
      <div className="section">
        <Bio />
      </div>
    </div>
  )
}
