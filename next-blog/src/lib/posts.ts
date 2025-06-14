export interface Blog {
  id: number;
  attributes: {
    articleId: number;
    Title: string;
    Header: string;
    Content: string;
    date: string;
  };
}

export async function fetchBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(
      'https://glass-approach-204914.uc.r.appspot.com/api/blogs',
      { next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    return data.data as Blog[];
  } catch {
    // Fallback sample data
    return [
      {
        id: 1,
        attributes: {
          articleId: 1,
          Title: 'Sample Post',
          Header: 'Example header',
          Content: 'This is a placeholder blog post.',
          date: '2025-01-01',
        },
      },
    ];
  }
}

export async function fetchBlog(id: string): Promise<Blog | null> {
  try {
    const res = await fetch(
      `https://glass-approach-204914.uc.r.appspot.com/api/blogs?filters[articleId][$eq]=${id}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    return data.data[0] as Blog;
  } catch {
    if (id === '1') {
      return {
        id: 1,
        attributes: {
          articleId: 1,
          Title: 'Sample Post',
          Header: 'Example header',
          Content: 'This is a placeholder blog post.',
          date: '2025-01-01',
        },
      };
    }
    return null;
  }
}
