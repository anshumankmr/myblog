'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getBlogByArticleId, blogsFetcher, type Blog } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import Bio from '@/components/bio';

function BlogPostSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="skeleton h-10 w-3/4 mb-4" />
      <div className="skeleton h-5 w-40 mb-8" />
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="skeleton h-4 w-full" />
        ))}
      </div>
    </div>
  );
}

function BlogPostContent() {
  const searchParams = useSearchParams();
  const articleId = searchParams.get('id');

  const { data: blog, error, isLoading } = useSWR<Blog | null>(
    articleId ? `blog-${articleId}` : null,
    () => (articleId ? getBlogByArticleId(articleId) : null),
    {
      revalidateOnFocus: false,
    }
  );

  const { data: allBlogs } = useSWR<Blog[]>('blogs', blogsFetcher);

  if (isLoading) {
    return <BlogPostSkeleton />;
  }

  if (error || !blog) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h1 className="text-xl font-heading font-bold text-red-700 mb-2">
            Post Not Found
          </h1>
          <p className="text-red-600 mb-4">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/blogs" className="btn-primary">
            Back to All Posts
          </Link>
        </div>
      </div>
    );
  }

  const { Title, date, Content } = blog.attributes;

  // Find previous and next posts
  let prevPost: Blog | null = null;
  let nextPost: Blog | null = null;

  if (allBlogs) {
    const currentIndex = allBlogs.findIndex((b) => b.id === blog.id);
    if (currentIndex > 0) {
      nextPost = allBlogs[currentIndex - 1];
    }
    if (currentIndex < allBlogs.length - 1) {
      prevPost = allBlogs[currentIndex + 1];
    }
  }

  const getPostUrl = (post: Blog) => {
    return `/article/?id=${post.attributes.articleId}`;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-heading leading-tight">
            {Title}
          </h1>
          <time className="text-text-light block mt-3">{formatDate(date)}</time>
        </header>

        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-primary"
                >
                  {children}
                </a>
              ),
              code: ({ className, children, ...props }) => {
                const isInline = !className;
                if (isInline) {
                  return (
                    <code
                      className="bg-gray-100 px-1.5 py-0.5 rounded text-sm"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {Content}
          </ReactMarkdown>
        </div>
      </article>

      <hr className="my-8 border-gray-200" />

      <Bio />

      <nav className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevPost && (
          <Link
            href={getPostUrl(prevPost)}
            className="p-4 border border-gray-200 rounded-lg hover:border-accent transition-colors group"
          >
            <span className="text-sm text-text-light">&larr; Previous</span>
            <span className="block mt-1 font-heading font-bold text-heading group-hover:text-accent transition-colors">
              {prevPost.attributes.Title}
            </span>
          </Link>
        )}
        {nextPost && (
          <Link
            href={getPostUrl(nextPost)}
            className="p-4 border border-gray-200 rounded-lg hover:border-accent transition-colors group sm:text-right sm:col-start-2"
          >
            <span className="text-sm text-text-light">Next &rarr;</span>
            <span className="block mt-1 font-heading font-bold text-heading group-hover:text-accent transition-colors">
              {nextPost.attributes.Title}
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

export default function BlogPostClient() {
  return (
    <Suspense fallback={<BlogPostSkeleton />}>
      <BlogPostContent />
    </Suspense>
  );
}
