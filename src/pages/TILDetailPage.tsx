import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { getPostBySlug } from '../utils/posts';
import { formatDateLong } from '../utils/dates';
import type { TILPost } from '../types';

export const TILDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<TILPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      try {
        const foundPost = await getPostBySlug(slug);
        if (foundPost) {
          setPost(foundPost);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error loading post:', error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading TIL...</p>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back Navigation */}
      <Link
        to="/"
        className="mb-8 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to all TILs
      </Link>

      {/* Article Header */}
      <header className="mb-8">
        <div className="mb-4">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {post.category}
          </span>
        </div>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          {post.title}
        </h1>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
          {post.description}
        </p>
        
        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            {formatDateLong(post.date)}
          </div>
          {post.readingTime && (
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              {post.readingTime} min read
            </div>
          )}
        </div>
      </header>

      {/* Article Content */}
      <article className="prose prose-lg prose-blue max-w-none dark:prose-invert">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>

      {/* Tags */}
      {post.tags.length > 0 && (
        <footer className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Tag className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Tags:
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </footer>
      )}
    </div>
  );
};
