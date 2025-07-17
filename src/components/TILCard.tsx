import { Link } from 'react-router-dom';
import { Clock, Calendar, Tag } from 'lucide-react';
import { formatDateShort } from '../utils/dates';
import type { TILPost } from '../types';

interface TILCardProps {
  post: TILPost;
}

export const TILCard: React.FC<TILCardProps> = ({ post }) => {
  return (
    <article className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-3 flex items-center space-x-2">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {post.category}
            </span>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Calendar className="mr-1 h-3 w-3" />
              {formatDateShort(post.date)}
            </div>
          </div>

          <Link to={`/til/${post.slug}`} className="block">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
              {post.title}
            </h3>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
              {post.description}
            </p>
          </Link>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400"
                >
                  <Tag className="mr-1 h-3 w-3" />
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-gray-400">+{post.tags.length - 3} more</span>
              )}
            </div>

            {post.readingTime && (
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Clock className="mr-1 h-3 w-3" />
                {post.readingTime} min read
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
