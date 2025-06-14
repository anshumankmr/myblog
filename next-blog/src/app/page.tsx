import Link from 'next/link';
import { fetchBlogs } from '../lib/posts';

export default async function Home() {
  const blogs = await fetchBlogs();

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>My Blog</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {blogs.map((blog) => (
          <li key={blog.id} style={{ marginBottom: '1rem' }}>
            <h2>
              <Link href={`/article/${blog.attributes.articleId}`}>
                {blog.attributes.Title}
              </Link>
            </h2>
            <p>{blog.attributes.date}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
