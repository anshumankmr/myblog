import { getBlogs } from '@/lib/api';
import { getDatePath, generateSlug } from '@/lib/utils';
import BlogPostClient from '@/components/blog-post-client';

export async function generateStaticParams() {
  try {
    const blogs = await getBlogs();
    return blogs.map((blog) => ({
      date: getDatePath(blog.attributes.date),
      slug: generateSlug(blog.attributes.Title),
    }));
  } catch (error) {
    console.error('Failed to fetch blogs for static params:', error);
    return [];
  }
}

export default function BlogPostPage() {
  return <BlogPostClient />;
}
