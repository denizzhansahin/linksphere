"use client"

import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

import { CREATE_KISA_LINK, CREATE_KULLANICI_KISALTLINK } from '@/app/GraphQl/LinklerGraphQl';
import { useMutation } from '@apollo/client';

interface LinkShorteningFormProps {
  onLinkShortened: (shortUrl: string) => void;
}

const LinkShorteningForm: React.FC<LinkShorteningFormProps> = ({ onLinkShortened }) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToast();



  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');

      if (storedUser) {
        try {
          setUser(storedUser ? JSON.parse(storedUser) : null);

        } catch (error) {
          console.error("Failed to parse user from localStorage:", error);
          addToast('error', 'Kullanıcı verileri okunamadı.');
        }
      } else {
        addToast('error', 'Kullanıcı verileri okunamadı.');
      }


    }
  }, []);

  console.log('User from localStorage:', user);





  const [createKisaLink] = useMutation(CREATE_KISA_LINK);
  const [createKisaLinkKullanici] = useMutation(CREATE_KISA_LINK);





  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!validateUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call to shorten URL
      await new Promise(resolve => setTimeout(resolve, 800));

      let data;

      if (user?.id) {
        const response = await createKisaLinkKullanici({
          variables: {
            linkData: {
              kullaniciId: user?.id,
              asilMetinAdi: url,
            },
          },
        });
        data = response.data;
      } else {
        const response = await createKisaLink({
          variables: {
            linkData: {
              asilMetinAdi: url,
            },
          },
        });
        data = response.data;
      }

      if (data) {
        const shortUrl = `http://34.136.43.55:3000/${data.kisaLinkOlustur.kisaltmaToken}`;

        setIsLoading(false);
        setUrl('');
        onLinkShortened(shortUrl);
      } else {
        setIsLoading(false);
        setUrl('');
        addToast('error', 'Failed to shorten link. Please try again.');
      }


    } catch (error) {
      setIsLoading(false);
      addToast('error', 'Failed to shorten link. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your long URL here..."
            className={`w-full py-3 px-4 border ${error ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
              } rounded-lg bg-white dark:bg-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200`}
            aria-invalid={error ? 'true' : 'false'}
          />
          {error && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400 text-left">
              {error}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`py-3 px-6 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white rounded-lg transition-all duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
            } shadow-md hover:shadow-lg flex items-center justify-center gap-2 min-w-[120px]`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing
            </>
          ) : (
            <>
              Shorten
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default LinkShorteningForm;