"use client"

import React from 'react';
import Link from 'next/link';
import { Github as GitHub, Twitter, Linkedin, Earth ,Link  as LinkIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="flex flex-col">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-indigo-600 dark:text-indigo-400">
              <LinkIcon className="h-6 w-6" />
              <span>LinkSphere</span>
            </Link>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              A modern platform for shortening links and managing your online presence.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="https://github.com/denizzhansahin/link-card" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">GitHub</span>
                <GitHub className="h-5 w-5" />
              </a>
              <a href="https://spaceteknopoliweb.vercel.app/" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">WEB</span>
                <Earth className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/spaceteknopoli/" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/personal" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">
                  Personal Dashboard
                </Link>
              </li>
              <li>
                <Link href="/corporate" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">
                  Corporate Links
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/pages/privacy-policy" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/pages/terms-service" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/pages/cookie" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} LinkSphere. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;