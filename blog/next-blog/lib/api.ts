const API_BASE = 'https://glass-approach-204914.uc.r.appspot.com/api';

export interface BlogAttributes {
  articleId: string;
  Title: string;
  date: string;
  Content: string;
}

export interface Blog {
  id: string;
  attributes: BlogAttributes;
}

export interface BlogsResponse {
  data: Blog[];
}

export interface BlogResponse {
  data: Blog[];
}

export async function getBlogs(): Promise<Blog[]> {
  const response = await fetch(`${API_BASE}/blogs`);
  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }
  const data: BlogsResponse = await response.json();
  return data.data.sort(
    (a, b) =>
      new Date(b.attributes.date).getTime() -
      new Date(a.attributes.date).getTime()
  );
}

export async function getBlogByArticleId(
  articleId: string
): Promise<Blog | null> {
  const response = await fetch(
    `${API_BASE}/blogs?filters[articleId][$eq]=${articleId}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch blog');
  }
  const data: BlogResponse = await response.json();
  return data.data[0] || null;
}

export const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  return response.json();
};

export const blogsFetcher = async () => {
  return getBlogs();
};
