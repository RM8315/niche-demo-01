// Type definitions for blog posts - safe for client-side use

export interface Post {
  id: string;
  slug: string;
  title: string;
  date: string;
  publishedAt: string;
  updatedAt: string;
  content: string;
  description?: string;
  image?: string;
  tags: Array<{ id: string; name: string }>;
  author: {
    name: string;
    image?: string;
  };
}

export interface PostsResult {
  posts: Post[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    nextPage: number | null;
    prevPage: number | null;
  };
}

export interface PostResult {
  post: Post | null;
}

export interface TagsResult {
  tags: Array<{ id: string; name: string }>;
}

export interface CommentsResult {
  comments: any[];
  pagination: any;
  config: {
    enabled: boolean;
    allowUrls: boolean;
    allowNested: boolean;
    signUpMessage: string | null;
  };
}

export interface RelatedPostsResult {
  posts: Post[];
}
