import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Bio from '../../components/Bio';
import Seo from '../../components/Seo'; // Add this import

export async function getServerSideProps(context) {
    const { articleId } = context.params;
    let postData = null;
    let allBlogs = [];

    try {
        // Fetch specific post
        const postRes = await axios.get(`https://glass-approach-204914.uc.r.appspot.com/api/blogs?filters[articleId][$eq]=${articleId}&populate=*`);
        if (postRes.data.data && postRes.data.data.length > 0) {
            postData = postRes.data.data[0];
        } else {
            return { notFound: true };
        }

        // Fetch all posts for prev/next links
        const allBlogsRes = await axios.get('https://glass-approach-204914.uc.r.appspot.com/api/blogs?populate=*');
        allBlogs = allBlogsRes.data.data.sort((a, b) => new Date(b.attributes.date).getTime() - new Date(a.attributes.date).getTime());

    } catch (error) {
        console.error("Error fetching blog data:", error);
        return { notFound: true };
    }

    const currentIndex = allBlogs.findIndex(p => p.attributes.articleId === articleId);
    
    const previous = currentIndex < allBlogs.length - 1 ? {
        title: allBlogs[currentIndex + 1].attributes.Title,
        slug: `/article/${allBlogs[currentIndex + 1].attributes.articleId}` 
    } : null;

    const next = currentIndex > 0 ? {
        title: allBlogs[currentIndex - 1].attributes.Title,
        slug: `/article/${allBlogs[currentIndex - 1].attributes.articleId}`
    } : null;

    return {
        props: {
            post: postData,
            previous,
            next,
        },
    };
}

const ArticlePage = ({ post, previous, next }) => {
    if (!post) { 
      return <p>Post not found. If you followed a link, it might be broken.</p>;
    }

    // Ensure post.attributes.Content exists and is a string before calling substring
    const description = post.attributes.Content && typeof post.attributes.Content === 'string' 
                        ? post.attributes.Content.substring(0, 150) 
                        : '';

    return (
        <>
            <Seo title={post.attributes.Title} description={description} /> {/* Add Seo component here */}
            <article
                className="blog-post"
                itemScope
                itemType="http://schema.org/Article"
            >
                <header>
                    <h1 itemProp="headline">{post.attributes.Title}</h1>
                    <p>{new Date(post.attributes.date).toLocaleDateString()}</p>
                </header>
                <section
                    className="blog-content"
                    itemProp="articleBody"
                >
                    <ReactMarkdown>{post.attributes.Content}</ReactMarkdown>
                </section>
                <hr />
                <footer>
                    <Bio />
                </footer>
            </article>
            <nav className="blog-post-nav">
                <ul style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', listStyle: 'none', padding: 0 }}>
                    <li>
                        {previous && (
                            <Link href={previous.slug}>
                               <a>← {previous.title}</a>
                            </Link>
                        )}
                    </li>
                    <li>
                        {next && (
                            <Link href={next.slug}>
                                <a>{next.title} →</a>
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default ArticlePage;
