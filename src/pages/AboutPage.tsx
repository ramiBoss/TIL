import { User, Heart, Github, Coffee } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
          <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          About This TIL Collection
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          Learn more about this Today I Learned collection and why I created it
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-lg prose-blue max-w-none dark:prose-invert">
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <Coffee className="mr-2 h-6 w-6 text-blue-600 dark:text-blue-400" />
            What is this?
          </h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            This is my personal collection of <strong>Today I Learned</strong> (TIL) notes. 
            These are short, concise write-ups about small things I learn day to day across 
            various programming languages, technologies, and tools.
          </p>

          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <Heart className="mr-2 h-6 w-6 text-red-500" />
            Why TILs?
          </h2>
          <ul className="mb-6 space-y-2">
            <li><strong>Knowledge Retention</strong>: Writing things down helps me remember them better</li>
            <li><strong>Quick Reference</strong>: Easy to search and find solutions to problems I've solved before</li>
            <li><strong>Sharing Knowledge</strong>: Others might find these snippets useful too</li>
            <li><strong>Growth Tracking</strong>: A record of continuous learning and improvement</li>
          </ul>

          <h2 className="mb-4 text-2xl font-semibold">Topics Covered</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            You'll find TILs covering a wide range of topics including:
          </p>
          <ul className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <li>Programming languages (JavaScript, Python, Go, etc.)</li>
            <li>Web development frameworks and libraries</li>
            <li>Development tools and workflows</li>
            <li>Command line tips and tricks</li>
            <li>Git and version control</li>
            <li>Database queries and optimizations</li>
            <li>System administration</li>
            <li>And much more!</li>
          </ul>

          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <Github className="mr-2 h-6 w-6" />
            Contributing
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            If you notice any errors or have suggestions for improvement, feel free to:
          </p>
          <ul className="mb-6 space-y-2">
            <li>Open an issue on <a href="https://github.com/ramiboss/TIL" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">GitHub</a></li>
            <li>Submit a pull request</li>
            <li>Reach out to me directly</li>
          </ul>

          <h2 className="mb-4 text-2xl font-semibold">Inspiration</h2>
          <p className="text-gray-600 dark:text-gray-300">
            This TIL collection is inspired by the many other developers who share their learning in public. 
            Special thanks to the open source community for fostering a culture of knowledge sharing.
          </p>

          <div className="mt-8 rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Built with:</strong> React, TypeScript, Vite, and deployed on GitHub Pages
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
