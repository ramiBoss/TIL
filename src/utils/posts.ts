import matter from 'gray-matter';
import type { TILPost, TILFrontMatter } from '../types';
import { practices } from '../posts/practices';

// Mock data for demonstration - in a real app, you'd fetch from your posts
const mockPosts: TILPost[] = [
  {
    slug: 'javascript-array-chaining',
    title: 'JavaScript Array Methods Chaining',
    date: '2025-01-15',
    category: 'JavaScript',
    tags: ['javascript', 'arrays', 'functional-programming'],
    description:
      'Learn how to chain multiple array methods in JavaScript for more readable and functional code.',
    content: `# JavaScript Array Methods Chaining

Today I learned that you can chain multiple array methods in JavaScript for more readable and functional code.

## The Problem

I had an array of users and needed to:
1. Filter active users
2. Map to get only names
3. Sort alphabetically

## The Solution

Instead of using multiple variables:

\`\`\`javascript
const users = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: false },
  { name: 'Charlie', active: true }
];

// Verbose approach
const activeUsers = users.filter(user => user.active);
const names = activeUsers.map(user => user.name);
const sortedNames = names.sort();
\`\`\`

You can chain the methods:

\`\`\`javascript
const sortedActiveNames = users
  .filter(user => user.active)
  .map(user => user.name)
  .sort();

console.log(sortedActiveNames); // ['Alice', 'Charlie']
\`\`\`

## Why This is Useful

- **Readability**: The intent is clear - filter, then map, then sort
- **Immutability**: Each method returns a new array
- **Functional style**: No intermediate variables needed
- **Chainable**: Easy to add more transformations

## Watch Out For

- **Performance**: Each method creates a new array, so be mindful with large datasets
- **Debugging**: Can be harder to debug in the middle of a chain
- **Readability**: Don't chain too many methods - consider breaking into steps if it gets complex`,
    readingTime: 3,
  },
  {
    slug: 'git-stash-with-message',
    title: 'Git Stash with Message',
    date: '2025-01-10',
    category: 'Git',
    tags: ['git', 'version-control', 'workflow'],
    description: 'Add descriptive messages to git stash to make it easier to identify later.',
    content: `# Git Stash with Message

Today I learned that you can add a descriptive message to git stash to make it easier to identify later.

## The Basic Way

Usually, I just use:

\`\`\`bash
git stash
\`\`\`

This creates a stash with a generic message like "WIP on main: 1234567 Last commit message".

## The Better Way

You can add a custom message:

\`\`\`bash
git stash push -m "Fix: working on user authentication bug"
\`\`\`

## Why This Matters

When you have multiple stashes, it's much easier to identify them:

\`\`\`bash
git stash list
\`\`\`

Output with messages:
\`\`\`
stash@{0}: On main: Fix: working on user authentication bug
stash@{1}: On main: Feature: half-finished pagination component
stash@{2}: On main: Refactor: cleaning up API calls
\`\`\`

vs. without messages:
\`\`\`
stash@{0}: WIP on main: 1234567 Add user login endpoint
stash@{1}: WIP on main: 2345678 Update README
stash@{2}: WIP on main: 3456789 Fix typo in comments
\`\`\`

## Bonus: Stash Specific Files

You can also stash only specific files with a message:

\`\`\`bash
git stash push -m "Save changes to config file" config/database.yml
\`\`\`

This is super useful when you want to temporarily save changes to specific files while continuing to work on others.`,
    readingTime: 2,
  },
  {
    slug: 'css-grid-auto-fit-vs-auto-fill',
    title: 'CSS Grid Auto-Fit vs Auto-Fill',
    date: '2025-01-08',
    category: 'CSS',
    tags: ['css', 'grid', 'responsive-design'],
    description:
      'Understanding the difference between auto-fit and auto-fill in CSS Grid and when to use each.',
    content: `# CSS Grid Auto-Fit vs Auto-Fill

Today I learned the difference between \`auto-fit\` and \`auto-fill\` in CSS Grid, and when to use each one.

## The Setup

Both are used with \`repeat()\` in CSS Grid:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
\`\`\`

## Auto-Fill

\`auto-fill\` creates as many columns as will fit, even if they're empty:

\`\`\`css
.grid-auto-fill {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
\`\`\`

**Result**: If you have 3 items in a 1000px container, it creates 5 columns (1000px ÷ 200px), leaving 2 empty columns.

## Auto-Fit

\`auto-fit\` creates columns only for existing items and stretches them to fill the space:

\`\`\`css
.grid-auto-fit {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
\`\`\`

**Result**: If you have 3 items in a 1000px container, it creates 3 columns and each item takes up ~333px.

## Visual Comparison

With 3 items in a wide container:

**Auto-fill**: \`[item] [item] [item] [empty] [empty]\`  
**Auto-fit**: \`[  item  ] [  item  ] [  item  ]\`

## When to Use Which

- **Use auto-fill** when you want consistent sizing and don't mind empty space
- **Use auto-fit** when you want items to grow and fill available space

## Real-World Example

Perfect for responsive card layouts:

\`\`\`css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}
\`\`\`

This creates a responsive grid where cards are at least 300px wide but grow to fill the available space.`,
    readingTime: 3,
  },
];

export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

export const parseMarkdownPost = (filename: string, content: string): TILPost => {
  const { data, content: markdownContent } = matter(content);
  const frontMatter = data as TILFrontMatter;

  return {
    slug: filename.replace('.md', ''),
    title: frontMatter.title,
    date: frontMatter.date,
    category: frontMatter.category,
    tags: frontMatter.tags || [],
    description: frontMatter.description,
    content: markdownContent,
    readingTime: calculateReadingTime(markdownContent),
  };
};

export const getAllPosts = async (): Promise<TILPost[]> => {
  // In a real implementation, you would fetch markdown files from public/posts/
  // For now, we'll return mock data
  const allPosts = [...practices];
  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getPostBySlug = async (slug: string): Promise<TILPost | null> => {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
};

export const getPostsByCategory = async (category: string): Promise<TILPost[]> => {
  const posts = await getAllPosts();
  return posts.filter((post) => post.category.toLowerCase() === category.toLowerCase());
};

export const getPostsByTag = async (tag: string): Promise<TILPost[]> => {
  const posts = await getAllPosts();
  return posts.filter((post) => post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
};

export const searchPosts = async (query: string): Promise<TILPost[]> => {
  const posts = await getAllPosts();
  const searchTerm = query.toLowerCase();

  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.description.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
  );
};

export const getAllCategories = async (): Promise<string[]> => {
  const posts = await getAllPosts();
  const categories = posts.map((post) => post.category);
  return [...new Set(categories)].sort();
};

export const getAllTags = async (): Promise<string[]> => {
  const posts = await getAllPosts();
  const tags = posts.flatMap((post) => post.tags);
  return [...new Set(tags)].sort();
};
