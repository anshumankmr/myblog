import * as React from "react"
import { Link } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ pageContext, location }) => {
  const { siteTitle, posts } = pageContext;

  if (!posts || posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle || `Title`}>
        <Bio />
        <p>No blog posts found. Please add some posts to your data source.</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle || `Title`}>
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const { slug, title, date, description, excerpt } = post;

          return (
            <li key={slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: description || excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />
