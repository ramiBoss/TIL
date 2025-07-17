import { useState, useEffect } from 'react';
import { TILCard } from '../components/TILCard';
import { getAllPosts, getAllCategories } from '../utils/posts';
import { BookOpen, Filter } from 'lucide-react';
import type { TILPost } from '../types';

export const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<TILPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<TILPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [allPosts, allCategories] = await Promise.all([getAllPosts(), getAllCategories()]);
        setPosts(allPosts);
        setFilteredPosts(allPosts);
        setCategories(['All', ...allCategories]);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((post) => post.category === selectedCategory));
    }
  }, [posts, selectedCategory]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading TILs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
          <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
          Today I Learned
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          A collection of concise write-ups on small things I learn day to day across a variety of
          languages and technologies.
        </p>
        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          <strong>{posts.length}</strong> TILs and counting...
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <Filter className="h-4 w-4" />
          <span>Filter by category:</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white dark:bg-blue-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="py-12 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No TILs found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {selectedCategory === 'All'
              ? 'Check back soon for new learnings.'
              : `No TILs found in the "${selectedCategory}" category.`}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <TILCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};
