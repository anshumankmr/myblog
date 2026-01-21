'use client';

import Link from 'next/link';
import useSWR from 'swr';
import { blogsFetcher, type Blog } from '@/lib/api';
import { formatDate, getDatePath, generateSlug, getExcerpt } from '@/lib/utils';
import Bio from '@/components/bio';

function BlogSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <article key={i} className="border-b border-gray-200 pb-6">
          <div className="skeleton h-7 w-3/4 mb-2" />
          <div className="skeleton h-4 w-32 mb-3" />
          <div className="skeleton h-4 w-full mb-2" />
          <div className="skeleton h-4 w-2/3" />
        </article>
      ))}
    </div>
  );
}

function BlogCard({ blog }: { blog: Blog }) {
  const { Title, date, Content, articleId } = blog.attributes;
  const datePath = getDatePath(date);
  const slug = generateSlug(Title);
  const href = `/article/${datePath}/${slug}/?id=${articleId}`;
  const excerpt = getExcerpt(Content);

  return (
    <article className="border-b border-gray-200 pb-6 last:border-0">
      <Link href={href} className="group block">
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-heading group-hover:text-accent transition-colors">
          {Title}
        </h2>
      </Link>
      <time className="text-sm text-text-light block mt-1">
        {formatDate(date)}
      </time>
      <p className="mt-3 text-text-light leading-relaxed">{excerpt}</p>
      <Link
        href={href}
        className="inline-block mt-3 text-accent hover:text-primary font-medium transition-colors"
      >
        Read more &rarr;
      </Link>
    </article>
  );
}

export default function BlogsPage() {
  const { data: blogs, error, isLoading } = useSWR<Blog[]>(
    'blogs',
    blogsFetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 300000, // 5 minutes
    }
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-heading font-bold text-heading mb-8">
        All Posts
      </h1>

      {isLoading && <BlogSkeleton />}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p>Failed to load blog posts. Please try again later.</p>
        </div>
      )}

      {blogs && blogs.length > 0 && (
        <div className="space-y-8">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}

      {blogs && blogs.length === 0 && (
        <p className="text-text-light">No blog posts yet. Check back soon!</p>
      )}

      <div className="mt-12">
        <Bio />
      </div>
    </div>
  );
}
