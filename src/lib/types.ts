export interface PostMeta {
  slug: string;
  title: string;
  publishedAt: string;
  updatedAt?: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
  draft?: boolean;
  hasAudio?: boolean;
}

export interface Post extends PostMeta {
  content: string;
}
