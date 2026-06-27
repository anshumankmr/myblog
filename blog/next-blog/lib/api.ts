const API_BASE = 'https://anshumankmr.github.io/generated';

export interface BlogAttributes {
  articleId: string;
  Title: string;
  date: string;
  Content: string;
}

export interface Blog {
  id: number;
  attributes: BlogAttributes;
}

export interface BlogsResponse {
  data: Blog[];
}

async function fetchAll(): Promise<Blog[]> {
  const response = await fetch(`${API_BASE}/content.json`);
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

export async function getBlogs(): Promise<Blog[]> {
  return fetchAll();
}

export async function getBlogByArticleId(
  articleId: string
): Promise<Blog | null> {
  const blogs = await fetchAll();
  return blogs.find(b => b.attributes.articleId === articleId) || null;
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
