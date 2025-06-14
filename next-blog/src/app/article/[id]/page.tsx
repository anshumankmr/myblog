import { fetchBlog } from '../../lib/posts';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { id: string };
}

export default async function ArticlePage({ params }: PageProps) {
  const blog = await fetchBlog(params.id);

  if (!blog) {
    notFound();
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>{blog.attributes.Title}</h1>
      <p>{blog.attributes.date}</p>
      <article>{blog.attributes.Content}</article>
    </main>
  );
}
