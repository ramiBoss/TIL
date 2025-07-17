import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../utils/posts';
import { Folder, FileText } from 'lucide-react';
import type { TILPost } from '../types';

interface CategoryGroup {
  name: string;
  count: number;
  posts: TILPost[];
}

export const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const posts = await getAllPosts();

        // Group posts by category
        const categoryMap = new Map<string, TILPost[]>();
        posts.forEach((post) => {
          const category = post.category;
          if (!categoryMap.has(category)) {
            categoryMap.set(category, []);
          }
          categoryMap.get(category)!.push(post);
        });

        // Convert to array and sort by post count (descending)
        const categoryGroups: CategoryGroup[] = Array.from(categoryMap.entries())
          .map(([name, posts]) => ({
            name,
            count: posts.length,
            posts: posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
          }))
          .sort((a, b) => b.count - a.count);

        setCategories(categoryGroups);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
          <Folder className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Categories</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          Browse TILs organized by technology and topic
        </p>
      </div>

      {/* Categories List */}
      {categories.length === 0 ? (
        <div className="py-12 text-center">
          <Folder className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            No categories found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Start adding TILs to see categories here.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {categories.map((category) => (
            <div
              key={category.name}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              {/* Category Header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                    <Folder className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {category.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {category.count} {category.count === 1 ? 'TIL' : 'TILs'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Posts List */}
              <div className="space-y-3">
                {category.posts.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/til/${post.slug}`}
                    className="flex items-start space-x-3 rounded-md p-3 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <FileText className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {post.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {post.description}
                      </p>
                      <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        {post.readingTime && <span>{post.readingTime} min read</span>}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
