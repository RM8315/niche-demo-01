# Migration from Wisp CMS to Local Markdown

This document outlines the changes made to convert the blog from Wisp CMS to a local Markdown-based system.

## What Changed

### 1. Removed Wisp CMS Dependencies
- Removed `@wisp-cms/client` package
- Removed `NEXT_PUBLIC_BLOG_ID` environment variable requirement
- Deleted `src/lib/wisp.ts` file

### 2. Added Markdown Processing Dependencies
- Added `gray-matter` for parsing frontmatter
- Added `remark` and `remark-html` for Markdown to HTML conversion

### 3. Created New Posts System
- Created `src/lib/posts.ts` with functions to read and process Markdown files
- Created `_posts/` directory for storing blog posts
- Added sample blog posts in Markdown format

### 4. Updated Components and Pages
- Updated all pages to use the new posts system
- Modified components to work with the new Post type
- Disabled comments functionality (can be re-enabled later if needed)

## How to Use

### Creating New Blog Posts

1. Create a new `.md` file in the `_posts/` directory
2. Use the following frontmatter format:

```yaml
---
title: 'Your Post Title'
date: 'YYYY-MM-DD'
description: 'Optional description'
tags: ['tag1', 'tag2']
author: 'Author Name'
image: 'optional-image-url'
---
```

3. Write your content in Markdown below the frontmatter
4. The file name (without .md) will be used as the URL slug

### Example Post Structure

```markdown
---
title: 'My First Post'
date: '2025-09-27'
description: 'This is my first blog post'
tags: ['introduction', 'blogging']
author: 'John Doe'
---

# My First Post

This is the content of my blog post written in Markdown.

## Features

- Easy to write
- Clean formatting
- SEO friendly

## Conclusion

Markdown makes blogging simple and enjoyable!
```

### Available Functions

The `src/lib/posts.ts` file provides these functions:

- `getAllPosts(options)` - Get all posts with pagination and filtering
- `getPostBySlug(slug)` - Get a single post by slug
- `getAllTags()` - Get all unique tags
- `getRelatedPosts(options)` - Get related posts
- `getComments(options)` - Get comments (currently disabled)
- `createComment(input)` - Create comment (currently disabled)

### Environment Variables

The following environment variables are still supported:

- `NEXT_PUBLIC_BLOG_DISPLAY_NAME` - Blog name (default: "My Blog")
- `NEXT_PUBLIC_BLOG_COPYRIGHT` - Copyright text (default: "Author")
- `NEXT_DEFAULT_METADATA_DEFAULT_TITLE` - Default page title
- `NEXT_PUBLIC_BLOG_DESCRIPTION` - Blog description
- `NEXT_PUBLIC_BASE_URL` - Base URL for the site
- `OG_IMAGE_SECRET` - Secret for OG image generation

## Features

### ✅ Working Features
- Blog post listing with pagination
- Individual blog post pages
- Tag-based filtering
- RSS feed generation
- Sitemap generation
- SEO metadata
- Dark mode support
- Responsive design

### ❌ Disabled Features
- Comments system (can be re-enabled by implementing a backend)
- Related posts suggestions (currently shows other posts)

## File Structure

```
_posts/                    # Blog posts directory
├── hello-world.md
├── getting-started-with-nextjs.md
└── markdown-blogging-guide.md

src/
├── lib/
│   └── posts.ts          # New posts processing system
├── app/                  # Next.js app directory
│   ├── page.tsx          # Home page (updated)
│   ├── blog/
│   │   ├── [slug]/
│   │   │   └── page.tsx  # Individual post page (updated)
│   │   └── sitemap.tsx   # Blog sitemap (updated)
│   ├── tag/              # Tag pages (updated)
│   └── rss/
│       └── route.ts      # RSS feed (updated)
└── components/           # Updated components
    ├── BlogPostPreview.tsx
    ├── BlogPostContent.tsx
    ├── RelatedPosts.tsx
    ├── CommentSection.tsx
    ├── CommentForm.tsx
    └── Footer.tsx
```

## Development

To run the development server:

```bash
npm run dev
```

To build for production:

```bash
npm run build
npm start
```

## Customization

### Adding New Post Fields

To add new fields to posts (like `category`, `featured`, etc.):

1. Update the `Post` interface in `src/lib/posts.ts`
2. Update the `getPostBySlug` function to read the new field
3. Update components to display the new field

### Re-enabling Comments

To re-enable comments, you'll need to:

1. Implement a backend API for storing comments
2. Update the `getComments` and `createComment` functions in `src/lib/posts.ts`
3. Set `enabled: true` in the comments config

### Custom Styling

The blog uses Tailwind CSS for styling. You can customize the appearance by:

1. Modifying the component styles
2. Updating the `tailwind.config.ts` file
3. Adding custom CSS in `src/app/globals.css`

## Migration Benefits

1. **No External Dependencies**: No need for Wisp CMS account or API keys
2. **Version Control**: All content is stored in Git
3. **Offline Editing**: Write posts in any text editor
4. **Fast Performance**: Static generation with no API calls
5. **Full Control**: Complete control over content and functionality
6. **Cost Effective**: No monthly subscription fees

## Support

If you encounter any issues or need help customizing the blog, please refer to the Next.js documentation or create an issue in the repository.
