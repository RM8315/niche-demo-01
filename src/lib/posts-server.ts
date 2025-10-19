import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import type { Post, PostsResult, TagsResult, RelatedPostsResult, CommentsResult } from './posts-types';

const postsDirectory = path.join(process.cwd(), '_posts');

// Get all post slugs
export function getAllPostSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter(name => name.endsWith('.md'))
      .map(name => name.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

// Get post data by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Process markdown content to HTML
    const processedContent = await remark()
      .use(remarkHtml)
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      id: slug,
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      publishedAt: data.date || new Date().toISOString(),
      updatedAt: data.date || new Date().toISOString(),
      content: contentHtml,
      description: data.description || '',
      image: data.image || undefined,
      tags: data.tags ? data.tags.map((tag: string) => ({ id: tag, name: tag })) : [],
      author: {
        name: data.author || 'Anonymous',
        image: data.authorImage || undefined,
      },
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

// Get all posts with pagination
export async function getAllPosts(options: {
  limit?: number;
  page?: number;
  tags?: string[];
} = {}): Promise<PostsResult> {
  const { limit = 10, page = 1, tags } = options;
  
  try {
    const slugs = getAllPostSlugs();
    let posts: Post[] = [];

    // Get all posts
    for (const slug of slugs) {
      const post = await getPostBySlug(slug);
      if (post) {
        posts.push(post);
      }
    }

    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Filter by tags if specified
    if (tags && tags.length > 0) {
      posts = posts.filter(post => 
        post.tags.some(tag => tags.includes(tag.name))
      );
    }

    // Apply pagination
    const total = posts.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    // Calculate next and previous pages
    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    return {
      posts: paginatedPosts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        nextPage,
        prevPage,
      },
    };
  } catch (error) {
    console.error('Error getting all posts:', error);
    return {
      posts: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        nextPage: null,
        prevPage: null,
      },
    };
  }
}

// Get all unique tags
export async function getAllTags(): Promise<TagsResult> {
  try {
    const slugs = getAllPostSlugs();
    const tagSet = new Set<string>();

    for (const slug of slugs) {
      const post = await getPostBySlug(slug);
      if (post) {
        post.tags.forEach(tag => tagSet.add(tag.name));
      }
    }

    const tags = Array.from(tagSet).map(tag => ({ id: tag, name: tag }));

    return { tags };
  } catch (error) {
    console.error('Error getting tags:', error);
    return { tags: [] };
  }
}

// Get related posts (simplified - just get other posts)
export async function getRelatedPosts(options: {
  slug: string;
  limit?: number;
}): Promise<RelatedPostsResult> {
  const { slug, limit = 3 } = options;
  
  try {
    const allPosts = await getAllPosts({ limit: 100 }); // Get more posts to find related ones
    const relatedPosts = allPosts.posts
      .filter(post => post.slug !== slug)
      .slice(0, limit);

    return { posts: relatedPosts };
  } catch (error) {
    console.error('Error getting related posts:', error);
    return { posts: [] };
  }
}

// Mock comments functionality (disabled for local markdown)
export async function getComments(options: {
  slug: string;
  page?: number;
  limit?: string | number;
}): Promise<CommentsResult> {
  return {
    comments: [],
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    },
    config: {
      enabled: false,
      allowUrls: false,
      allowNested: false,
      signUpMessage: null,
    },
  };
}

// Mock create comment functionality (disabled for local markdown)
export async function createComment(input: any): Promise<{ success: boolean }> {
  // Comments are disabled for local markdown posts
  throw new Error('Comments are not supported for local markdown posts');
}
