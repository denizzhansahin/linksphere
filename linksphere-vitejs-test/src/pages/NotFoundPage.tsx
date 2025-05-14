import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="mb-8">
        <div className="text-6xl sm:text-8xl font-bold text-indigo-600 dark:text-indigo-400">404</div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">Page not found</h1>
        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-300">
          Sorry, we couldn't find the page you're looking for.
        </p>
      </div>
      <Link
        to="/"
        className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
      >
        <Home className="mr-2 h-5 w-5" />
        Go back home
      </Link>
    </div>
  );
};

export default NotFoundPage;