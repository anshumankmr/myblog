import * as React from "react"
import { Link } from "gatsby"
import axios from 'axios'

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ location }) => {
  const [post, setPost] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const siteTitle = "Your Site Title"

  React.useEffect(() => {
    const fetchPost = async () => {
      try {
        // Extract the date and title from the URL
        const pathParts = location.pathname.split('/')
        const date = pathParts[2] // Assuming URL structure is /article/date/title
        const slug = pathParts[3]

        const response = await axios.get('https://glass-approach-204914.uc.r.appspot.com/api/blogs')
        const blogs = response.data.data

        // Find the matching blog post
        const matchedPost = blogs.find(blog => {
          const blogDate = blog.attributes.date
          const blogSlug = generateSlug(blog.attributes.Title)
          return blogDate === date && blogSlug === slug
        })

        if (!matchedPost) {
          throw new Error('Blog post not found')
        }

        setPost(matchedPost.attributes)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [location.pathname])

  if (loading) {
    return (
      <Layout location={location} title={siteTitle}>
        <p>Loading blog post...</p>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout location={location} title={siteTitle}>
        <p>Error: {error}</p>
        <Link to="/">Go back to home</Link>
      </Layout>
    )
  }

  if (!post) {
    return (
      <Layout location={location} title={siteTitle}>
        <p>Blog post not found</p>
        <Link to="/">Go back to home</Link>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.Title}</h1>
          <p>{post.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.Content }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            <Link to="/" rel="prev">
              ← Back to all posts
            </Link>
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

// Function to generate a URL-friendly slug (same as in index.js)
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[\s\(\)]+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export default BlogPostTemplate

export const Head = () => <Seo title="Blog Post" />