import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, QrCode, ChevronRight, Check, Link as LinkIcon, ArrowRight, Globe, User } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import LinkShorteningForm from '../components/link/LinkShorteningForm';
import QRCodeModal from '../components/link/QRCodeModal';

const HomePage: React.FC = () => {
  const [showQRModal, setShowQRModal] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const { addToast } = useToast();

  const handleLinkShortened = (shortUrl: string) => {
    setShortenedUrl(shortUrl);
    addToast('success', 'Link shortened successfully!');
  };

  const copyToClipboard = () => {
    if (!shortenedUrl) return;
    
    navigator.clipboard.writeText(shortenedUrl)
      .then(() => {
        setCopiedLink(true);
        addToast('success', 'Link copied to clipboard!');
        setTimeout(() => setCopiedLink(false), 2000);
      })
      .catch(() => {
        addToast('error', 'Failed to copy link');
      });
  };

  const handleGenerateQR = () => {
    if (!shortenedUrl) return;
    setShowQRModal(true);
  };

  const features = [
    {
      icon: <LinkIcon className="h-6 w-6 text-indigo-600" />,
      title: 'Link Shortening',
      description: 'Create compact, memorable links that are easy to share across platforms.'
    },
    {
      icon: <QrCode className="h-6 w-6 text-indigo-600" />,
      title: 'QR Code Generation',
      description: 'Generate QR codes for your shortened links for easy scanning and sharing.'
    },
    {
      icon: <User className="h-6 w-6 text-indigo-600" />,
      title: 'Personal Dashboard',
      description: 'Organize all your personal links and social profiles in one customizable space.'
    },
    {
      icon: <Globe className="h-6 w-6 text-indigo-600" />,
      title: 'Corporate Links',
      description: 'Professional, branded link management for businesses and organizations.'
    }
  ];

  return (
    <div className="space-y-16 pt-14">
      {/* Hero section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/30 -z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064')] bg-no-repeat bg-cover opacity-[0.03] -z-10" />
        
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
            Share More <br className="hidden sm:block" />
            With Less
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300">
            Shorten, customize, and share your links with our powerful platform. 
            Create memorable URLs that stand out and track their performance.
          </p>
          
          {/* Link shortening form */}
          <div className="mt-10 max-w-2xl mx-auto">
            <LinkShorteningForm onLinkShortened={handleLinkShortened} />
            
            {/* Shortened URL display */}
            {shortenedUrl && (
              <div className="mt-6 flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
                <p className="flex-1 truncate font-medium text-indigo-600 dark:text-indigo-400">
                  {shortenedUrl}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleGenerateQR}
                    className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Generate QR Code"
                  >
                    <QrCode className="h-5 w-5" />
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Copy to clipboard"
                  >
                    {copiedLink ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-white">
              Everything you need for your links
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              A complete solution for creating, managing, and sharing your online presence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative group p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-50 dark:bg-indigo-900/30 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800 rounded-xl shadow-lg">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
            Ready to streamline your online presence?
          </h2>
          <p className="mt-4 text-lg text-indigo-100">
            Create your personal or corporate dashboard and start organizing your links today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/personal"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 transition-colors"
            >
              Personal Dashboard
              <User className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/corporate"
              className="inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-indigo-700 transition-colors"
            >
              Corporate Dashboard
              <Globe className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* QR Code Modal */}
      {showQRModal && shortenedUrl && (
        <QRCodeModal
          url={shortenedUrl}
          onClose={() => setShowQRModal(false)}
        />
      )}
    </div>
  );
};

export default HomePage;