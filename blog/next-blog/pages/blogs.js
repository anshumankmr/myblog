import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import Seo from '../components/Seo'; // Assuming Seo.js is in components
// Layout and Header are global

export async function getServerSideProps() {
  let posts = [];
  try {
    const response = await axios.get('https://glass-approach-204914.uc.r.appspot.com/api/blogs');
    // Ensure response.data and response.data.data exist before sorting
    if (response.data && response.data.data) {
      posts = response.data.data.sort((a, b) => 
        new Date(b.attributes.date).getTime() - new Date(a.attributes.date).getTime()
      );
    } else {
      console.error("No data found in API response for blog listing");
      // posts will remain an empty array
    }
  } catch (error) {
    console.error("Error fetching blog posts for listing:", error);
    // Optionally return an error prop or handle differently
    // posts will remain an empty array
  }
  return {
    props: { posts },
  };
}

const BlogsPage = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <div>
        <Seo title="All Blogs" />
        <h1>Latest Posts</h1>
        <p>No blog posts found.</p>
      </div>
    );
  }

  return (
    <div>
      <Seo title="All Blogs" />
      <div className="blog-list"> {/* Assuming this class is in style.css for styling */}
        <h1>Latest Posts</h1>
        <ul className="post-list"> {/* Assuming this class is in style.css */}
          {posts.map((post) => {
            // Ensure post.attributes exists
            if (!post.attributes) {
              console.warn("Post missing attributes:", post);
              return null; // Skip rendering this post if attributes are missing
            }

            const { Title, date, Content, articleId } = post.attributes;
            
            // Ensure Content is a string before calling substring
            const excerpt = Content && typeof Content === 'string' 
                            ? Content.substring(0, 150) + '...' 
                            : 'No content preview available.';
            
            // Ensure date is valid before formatting
            const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }) : 'Date not available';
            
            // Link using articleId
            const postUrl = `/article/${articleId}`;

            return (
              <li key={post.id} className="post-item"> {/* Assuming this class is in style.css */}
                <article>
                  <header>
                    <h2>
                      <Link href={postUrl}>
                        <a>{Title || 'Untitled Post'}</a>
                      </Link>
                    </h2>
                    <small>{formattedDate}</small>
                  </header>
                  <p>{excerpt}</p>
                  <Link href={postUrl}>
                    <a className="read-more">Read more →</a> {/* Assuming .read-more is styled */}
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default BlogsPage;
