import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import axios from "axios"
import ReactMarkdown from 'react-markdown'
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Header from "../components/header"

const BlogPostTemplate = ({ pageContext, location }) => {
 const [post, setPost] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const { id, previous, next } = pageContext;

 useEffect(() => {
   const fetchPost = async () => {
     const cacheKey = `blog_${id}`;
     const cached = localStorage.getItem(cacheKey);
     
     if (cached) {
       const { data, timestamp } = JSON.parse(cached);
       const isExpired = Date.now() - timestamp > 30 * 24 * 60 * 60 * 1000;
       
       if (!isExpired) {
         setPost(data);
         setLoading(false);
         return;
       }
     }

      try {
        const response = await axios.get(
          'https://anshumankmr.github.io/generated/content.json'
        );
        const postData = response.data.data.find(
          p => p.attributes.articleId === id
        );
        if (postData) {
         localStorage.setItem(cacheKey, JSON.stringify({
           data: postData,
           timestamp: Date.now()
         }));
         setPost(postData);
       } else {
         setError("Post not found");
       }
     } catch (err) {
       setError(err.message);
     } finally {
       setLoading(false);
     }
   };

   fetchPost();
 }, [id]);

 if (loading) return (
   <>
     <Header />
     <Layout location={location}><p>Loading...</p></Layout>
   </>
 );
 
 if (error) return (
   <>
     <Header />
     <Layout location={location}><p>Error: {error}</p></Layout>
   </>
 );
 
 if (!post) return (
   <>
     <Header />
     <Layout location={location}><p>Post not found</p></Layout>
   </>
 );

 return (
   <>
     <Header />
     <Layout location={location} title={post.attributes.Title}>
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
           style={{
             '& img': {
               maxWidth: '100%',
               height: 'auto',
               display: 'block',
               margin: '1rem 0'
             }
           }}
         >
           <ReactMarkdown>{post.attributes.Content}</ReactMarkdown>
         </section>
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
             {previous && (
               <Link to={previous.slug} rel="prev">
                 ← {previous.title}
               </Link>
             )}
           </li>
           <li>
             {next && (
               <Link to={next.slug} rel="next">
                 {next.title} →
               </Link>
             )}
           </li>
         </ul>
       </nav>
     </Layout>
   </>
 );
};

export const Head = ({ pageContext }) => {
 return (
   <Seo
     title={pageContext?.blog?.attributes?.Title || "Blog Post"}
     description={pageContext?.blog?.attributes?.Content?.substring(0, 200) || ""}
   />
 );
};

export default BlogPostTemplate;