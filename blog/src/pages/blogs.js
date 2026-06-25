import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import axios from 'axios';
import Layout from '../components/layout';
import Seo from '../components/seo';
import Header from '../components/header';

// Simple cache implementation
const cache = {
  data: null,
  timestamp: null,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes in milliseconds
  
  isValid() {
    return (
      this.data !== null &&
      this.timestamp !== null &&
      Date.now() - this.timestamp < this.CACHE_DURATION
    );
  },
  
  set(data) {
    this.data = data;
    this.timestamp = Date.now();
  },
  
  get() {
    return this.isValid() ? this.data : null;
  },
};

const IndexPage = ({ location }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Check cache first
        const cachedData = cache.get();
        if (cachedData) {
          setPosts(cachedData);
          setLoading(false);
          return;
        }

        const response = await axios.get('https://anshumankmr.github.io/generated/content.json');
        const sortedPosts = response.data.data.sort((a, b) => 
          new Date(b.attributes.date) - new Date(a.attributes.date)
        );
        
        // Update cache and state
        cache.set(sortedPosts);
        setPosts(sortedPosts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[\s\(\)]+/g, '-')
      .replace(/[^\w\-]/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  if (loading) {
    return (
      <>
        <Header />
        <Layout location={location}>
          <div className="loading">Loading blog posts...</div>
        </Layout>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <Layout location={location}>
          <div className="error">Error: {error}</div>
          <Link to="/">Go back to home</Link>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Header />
      <Layout location={location}>
        <div className="blog-list">
          <h1>Latest Posts</h1>
          <ul className="post-list">
            {posts.map((post) => {
              const { Title, date, Content } = post.attributes;
              const slug = generateSlug(Title);
              const excerpt = Content.substring(0, 150) + '...';
              const formattedDate = new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });
              
              return (
                <li key={post.id} className="post-item">
                  <article>
                    <header>
                      <h2>
                        <Link to={`/article/${date}/${slug}`}>{Title}</Link>
                      </h2>
                      <small>{formattedDate}</small>
                    </header>
                    <p>{excerpt}</p>
                    <Link to={`/article/${date}/${slug}`} className="read-more">
                      Read more →
                    </Link>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </Layout>
    </>
  );
};

export default IndexPage;

export const Head = () => <Seo title="Home" />;