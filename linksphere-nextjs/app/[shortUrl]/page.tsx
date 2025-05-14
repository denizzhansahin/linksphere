// app/[shortUrl]/page.tsx (or your file path)
"use client";

import { useQuery } from '@apollo/client';
import React, { useEffect, useState, useRef } from 'react';
import { GET_KISA_LINK } from '../GraphQl/LinklerGraphQl'; // Your GraphQL query file path
import { ArrowPathIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'; // Optional icons

interface PageProps {
  params: Promise<{ shortUrl: string }>;
}

const RedirectPage: React.FC<PageProps> = ({ params }) => {
   const { shortUrl } = React.use(params);
  const [countdown, setCountdown] = useState(10); // Corrected initial countdown
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { data, loading, error } = useQuery(GET_KISA_LINK, {
    variables: { token: shortUrl || null },
    skip: !shortUrl,
    fetchPolicy: 'cache-and-network',
  });

  const targetUrl = data?.getLinkByIdShortUrl?.asilMetinAdi; // Assuming 'asilMetinAdi' is the original URL field

  useEffect(() => {
    if (targetUrl) {
      intervalRef.current = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(intervalRef.current!);
            if (typeof window !== 'undefined') {
              window.location.href = targetUrl;
            }
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);

      timerRef.current = setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.href = targetUrl;
        }
      }, 10000); // 10 seconds
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [targetUrl]);

  const handleManualRedirect = () => {
    if (targetUrl) {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (typeof window !== 'undefined') {
        window.location.href = targetUrl;
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 text-white p-4">
        <ArrowPathIcon className="h-16 w-16 animate-spin text-sky-400 mb-6" />
        <h1 className="text-3xl font-semibold mb-2">Redirecting...</h1>
        <p className="text-lg text-slate-300">Please wait, loading link information.</p>
      </div>
    );
  }

  if (error || (!loading && !targetUrl)) { // Ensure we don't show error if still loading but no targetUrl yet
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-900 to-red-700 text-white p-4 text-center">
        <ExclamationTriangleIcon className="h-16 w-16 text-yellow-300 mb-6" />
        <h1 className="text-3xl font-semibold mb-2">Oops! Something went wrong.</h1>
        {error && <p className="text-lg text-red-200 mb-4">Error: {error.message}</p>}
        {!targetUrl && !loading && (
          <p className="text-lg text-red-200">
            The shortened link you're looking for was not found or is invalid.
          </p>
        )}
         <a href="/" className="mt-8 px-6 py-3 bg-white text-red-700 font-semibold rounded-lg shadow-md hover:bg-red-50 transition-colors">
          Return to Homepage
        </a>
      </div>
    );
  }

  // Only render the main redirect page if targetUrl is available
  if (!targetUrl) {
     // This case should ideally be covered by loading or error, but as a fallback:
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 text-white p-4">
         <p className="text-lg text-slate-300">Preparing your link...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-600 to-indigo-700 text-white p-6 sm:p-8 mt-5">
      {/* Added mt-10 sm:mt-16 to push the content box down */}
      <div className="mt-10 sm:mt-12 bg-white/10 backdrop-blur-lg p-8 sm:p-12 rounded-xl shadow-2xl text-center max-w-xl w-full border border-white/20">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-sky-200">
          You are being redirected...
        </h1>
        <p className="text-base sm:text-lg text-slate-100 mb-6">
          You will be redirected to the following link:
        </p>

        <div className="my-6 sm:my-8">
          <a
            href={targetUrl}
            onClick={handleManualRedirect}
            target="_self"
            rel="noopener noreferrer"
            className="break-all text-lg sm:text-xl font-medium text-amber-300 hover:text-amber-200 underline decoration-amber-400/70 hover:decoration-amber-300 transition-colors duration-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-indigo-700"
          >
            {targetUrl}
          </a>
        </div>

        <p className="text-sm text-slate-200 mb-2">
          If you are not automatically redirected within {countdown} seconds,
          please click the link above.
        </p>

        <div className="w-full bg-slate-700/50 rounded-full h-2.5 mt-4">
          <div
            className="bg-sky-400 h-2.5 rounded-full transition-all duration-1000 ease-linear"
            // Corrected progress bar logic for a 10-second countdown
            style={{ width: `${(10 - countdown) / 10 * 100}%` }}
          ></div>
        </div>
         <p className="mt-4 text-5xl font-mono font-bold text-sky-300">
          {countdown}
        </p>
      </div>
      <footer className="mt-8 text-center text-sm text-slate-300/80">
        <p>© {new Date().getFullYear()} LinkSphere. All rights reserved.</p>
        <p>Shortened Link: <span className="font-semibold">{shortUrl}</span></p>
      </footer>
    </div>
  );
};

export default RedirectPage;