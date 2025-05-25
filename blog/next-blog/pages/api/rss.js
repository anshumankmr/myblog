// blog/next-blog/pages/api/rss.js
import RSS from 'rss';
import axios from 'axios';
// We can re-use the slugify function if needed for any part, but URLs will use articleId
// import { generateSlug } from '../../utils/slugify'; 

export default async function handler(req, res) {
  const site_url = 'https://www.anshumankumar.dev'; // Hardcoded from gatsby-config
  const site_title = "Anshuman's Blog"; // Site title from gatsby-config
  const feed_title = "Anshuman's Blog RSS Feed"; // Specific RSS feed title
  const site_description = "A starter blog demonstrating what Gatsby can do."; // From gatsby-config

  const feed = new RSS({
    title: feed_title,
    description: site_description,
    feed_url: `${site_url}/api/rss`,
    site_url: site_url,
    language: 'en',
    pubDate: new Date().toISOString(), // Current time as publication date of the feed
    ttl: 60, // Time to live in minutes
  });

  try {
    const response = await axios.get('https://glass-approach-204914.uc.r.appspot.com/api/blogs');
    const blogs = response.data.data;

    const sortedBlogs = blogs.sort((a, b) =>
      new Date(b.attributes.date).getTime() - new Date(a.attributes.date).getTime()
    );

    sortedBlogs.forEach(post => {
      // Ensure post.attributes exists before trying to access its properties
      if (!post.attributes) {
        console.warn("Post missing attributes, skipping in RSS feed:", post);
        return; // Skip this post
      }

      const postUrl = `${site_url}/article/${post.attributes.articleId}`;
      
      // Create an excerpt if 'Excerpt' attribute is not directly available
      // Also check if Content is a string
      const description = post.attributes.Content && typeof post.attributes.Content === 'string'
                          ? post.attributes.Content.substring(0, 200) + '...' 
                          : 'No content preview available.';
      
      // Ensure Title exists
      const title = post.attributes.Title || 'Untitled Post';

      // Ensure date exists
      const date = post.attributes.date || new Date().toISOString();

      feed.item({
        title: title,
        description: description,
        url: postUrl,
        guid: postUrl, // Using the URL as GUID
        date: date,
        author: post.attributes.author || site_title, // Assuming author might be on post, else site title
      });
    });

    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    res.status(200).send(feed.xml({ indent: true }));

  } catch (error) {
    console.error("Error generating RSS feed:", error);
    res.status(500).send("Error generating RSS feed");
  }
}
