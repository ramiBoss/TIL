import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Clock } from 'lucide-react';
import { searchPosts } from '../utils/posts';
import { formatDateShort } from '../utils/dates';
import type { TILPost } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<TILPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleSearch = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const searchResults = await searchPosts(query);
        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(handleSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-start justify-center p-4 pt-16">
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
        <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-xl dark:bg-gray-800">
          {/* Search Input */}
          <div className="flex items-center border-b border-gray-200 px-4 py-3 dark:border-gray-700">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search TILs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="ml-3 flex-1 border-0 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none dark:text-white dark:placeholder-gray-400"
            />
            <button
              onClick={onClose}
              className="ml-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {query.trim().length < 2 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <Search className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
                <p className="mt-2">Start typing to search TILs...</p>
              </div>
            ) : isLoading ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                <p className="mt-2">Searching...</p>
              </div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <p>No results found for "{query}"</p>
              </div>
            ) : (
              <div className="py-2">
                {results.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/til/${post.slug}`}
                    onClick={onClose}
                    className="flex items-start space-x-4 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {post.title}
                      </h4>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {post.description}
                      </p>
                      <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {post.category}
                        </span>
                        <span className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {formatDateShort(post.date)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
