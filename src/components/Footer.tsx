import { Github, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
            <span>&copy; {currentYear} TIL. Built with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>and React.</span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/ramizkhan/TIL"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <Github className="h-4 w-4" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
