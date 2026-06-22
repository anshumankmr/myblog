import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { getAllPosts, getPost } from '@/lib/content';
import { formatDate } from '@/lib/utils';
import Bio from '@/components/bio';

type Params = { date: string; slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return getAllPosts().map(p => ({ date: p.date, slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { date, slug } = await params;
  const post = getPost(date, slug);
  if (!post) notFound();

  const posts = getAllPosts();
  const idx = posts.findIndex(p => p.slug === post.slug && p.date === post.date);
  const prevPost = idx < posts.length - 1 ? posts[idx + 1] : null;
  const nextPost = idx > 0 ? posts[idx - 1] : null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-heading leading-tight">
            {post.title}
          </h1>
          <time className="text-text-light block mt-3">{formatDate(post.date)}</time>
        </header>
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>
      </article>

      <hr className="my-8 border-gray-200" />
      <Bio />

      <nav className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevPost && (
          <Link
            href={`/article/${prevPost.date}/${prevPost.slug}/`}
            className="p-4 border border-gray-200 rounded-lg hover:border-accent transition-colors group"
          >
            <span className="text-sm text-text-light">&larr; Previous</span>
            <span className="block mt-1 font-heading font-bold text-heading group-hover:text-accent transition-colors">
              {prevPost.title}
            </span>
          </Link>
        )}
        {nextPost && (
          <Link
            href={`/article/${nextPost.date}/${nextPost.slug}/`}
            className="p-4 border border-gray-200 rounded-lg hover:border-accent transition-colors group sm:text-right sm:col-start-2"
          >
            <span className="text-sm text-text-light">Next &rarr;</span>
            <span className="block mt-1 font-heading font-bold text-heading group-hover:text-accent transition-colors">
              {nextPost.title}
            </span>
          </Link>
        )}
      </nav>

      <div className="mt-8 text-center">
        <Link href="/blogs" className="text-accent hover:text-primary font-medium">
          &larr; Back to All Posts
        </Link>
      </div>
    </div>
  );
}
