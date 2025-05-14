"use client";
import React, { useState } from 'react';
import { Copy, QrCode, MessageCircle, MessageSquare, Check, Link as LinkIcon, Globe, User } from 'lucide-react';
import LinkShorteningForm from "./components/link/LinkShorteningForm";
import QRCodeModal from "./components/link/QRCodeModal";
import { useToast } from "./context/ToastContext";
import Link from "next/link";

import { RandomNickname } from './GraphQl/KullaniciGraphQl';
import { getRandomLink } from './GraphQl/LinklerGraphQl';
import { useQuery } from '@apollo/client';

export default function Home() {
  const [showQRModal, setShowQRModal] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const { addToast } = useToast();

  const handleLinkShortened = (shortUrl: string) => {
    setShortenedUrl(shortUrl);
    addToast('success', 'Link shortened successfully!');
  };


  const { data, loading, error, refetch } = useQuery(RandomNickname, {
    fetchPolicy: 'cache-and-network',
  });

  console.log('GraphQL Data 1:', data?.getRandomNickname);


  const { data : randomLink } = useQuery(getRandomLink, {
    fetchPolicy: 'cache-and-network',
  });

  console.log('GraphQL Data 2:', randomLink?.getRandomLink);

   async function copyToClipboardModern(text: string): Promise<boolean> {
  if (!navigator.clipboard) {
    console.warn("Modern Pano API'si (navigator.clipboard) desteklenmiyor.");
    return false;
  }
  try {
    await navigator.clipboard.writeText(text);
    console.log("Metin panoya kopyalandı (Modern API).");
    return true;
  } catch (err) {
    console.error("Modern API ile kopyalama başarısız oldu:", err);
    return false;
  }
}

function copyToClipboardLegacy(text: string): boolean {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Görünmez yap ve sayfa akışını etkilememesini sağla
  textArea.style.position = "fixed";
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.width = "2em";
  textArea.style.height = "2em";
  textArea.style.padding = "0";
  textArea.style.border = "none";
  textArea.style.outline = "none";
  textArea.style.boxShadow = "none";
  textArea.style.background = "transparent";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select(); // Metni seç

  let success = false;
  try {
    success = document.execCommand("copy");
    if (success) {
      console.log("Metin panoya kopyalandı (Eski yöntem).");
    } else {
      console.error("Eski yöntemle kopyalama komutu başarısız oldu.");
    }
  } catch (err) {
    console.error("Eski yöntemle kopyalama sırasında hata:", err);
  }

  document.body.removeChild(textArea);
  return success;
}

async function copyTextToClipboard(textToCopy: string): Promise<boolean> {
  // Önce modern API'yi dene
  if (navigator.clipboard) {
    const modernSuccess = await copyToClipboardModern(textToCopy);
    if (modernSuccess) {
      return true;
    }
    // Modern API başarısız olursa (örneğin HTTP'de veya izin verilmediyse),
    // eski yöntemi deneyebiliriz.
    console.warn("Modern API başarısız oldu, eski yönteme geçiliyor.");
  }
  
  // Modern API yoksa veya başarısız olduysa eski yöntemi kullan
  return copyToClipboardLegacy(textToCopy);
}

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
              <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
                {/* URL ve butonları içeren ana flex container */}
                <div className="flex items-center justify-between gap-4">
                  <p className="flex-1 truncate font-medium text-indigo-600 dark:text-indigo-400">
                    {shortenedUrl}
                  </p>
                  {/* Sağ taraftaki buton grubu */}
                  <div className="flex items-center gap-1 sm:gap-2"> {/* Butonlar arası boşluğu ayarla */}
                    <button
                      onClick={handleGenerateQR}
                      className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      aria-label="Generate QR Code"
                      title="Generate QR Code"
                    >
                      <QrCode className="h-5 w-5" />
                    </button>
                    <button
                      onClick={async () => await copyTextToClipboard(shortenedUrl)}
                      className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      aria-label="Copy to clipboard"
                      title="Copy to clipboard"
                    >
                      {copiedLink ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </button>

                    {/* --- YENİ PAYLAŞIM BUTONLARI BAŞLANGICI --- */}

                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent('Şu harika linke göz atın: ' + shortenedUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      aria-label="Share on WhatsApp"
                      title="Share on WhatsApp"
                    >
                      {/* WhatsApp için Lucide ikonu veya kendi SVG'niz */}
                      <MessageCircle className="h-5 w-5 text-green-500" />
                    </a>

                    {/* Twitter (X) */}
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shortenedUrl)}&text=${encodeURIComponent('Şuna bir bakın: ')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      aria-label="Share on Twitter"
                      title="Share on Twitter"
                    >
                      {/* Twitter (X) SVG İkonu */}
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                      </svg>
                    </a>

                    {/* Facebook */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shortenedUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      aria-label="Share on Facebook"
                      title="Share on Facebook"
                    >
                      {/* Facebook SVG İkonu */}
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z" clipRule="evenodd"></path>
                      </svg>
                    </a>

                    {/* SMS (Mesaj) */}
                    <a
                      // Not: `sms:` davranışı cihaza göre değişir. iOS için `&body=`, Android için `?body=`. `?&body=` her ikisini de kapsamaya çalışır.
                      // En iyi sonuç için, sadece URL göndermek daha tutarlı olabilir: `sms:${shortenedUrl}`
                      href={`sms:?&body=${encodeURIComponent('Şu linke göz at: ' + shortenedUrl)}`}
                      className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      aria-label="Share via SMS"
                      title="Share via SMS"
                    >
                      <MessageSquare className="h-5 w-5" />
                    </a>
                    {/* --- YENİ PAYLAŞIM BUTONLARI SONU --- */}
                  </div>
                </div>

                {/* Opsiyonel: Paylaşım butonları için küçük bir başlık */}
                {/* <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-right mr-1">Şurada paylaş:</p> */}
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


      {/* Rastgele Section */}
      {/* Mavi Tonlarda Çağrı (CTA) Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-700 dark:to-sky-600 rounded-xl shadow-lg">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
            Let's Have Some Fun, Shall We?
          </h2>
          <p className="mt-4 text-lg text-blue-100 dark:text-sky-100"> {/* Hafif mavi tonu */}
            Do You Want to Meet Random Users or Short Links?
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/p/${data?.getRandomNickname}`}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg text-blue-700 bg-white hover:bg-blue-50 dark:text-blue-600 dark:hover:bg-sky-50 transition-colors shadow-md hover:shadow-lg"
            >
              Get User
              <User className="ml-2 h-5 w-5" />
            </Link>
            <Link
             href={`/${randomLink?.getRandomLink}`}
              className="inline-flex items-center justify-center px-6 py-3 border border-white/80 dark:border-sky-300/70 text-base font-semibold rounded-lg text-white hover:bg-white/10 dark:hover:bg-sky-500/30 transition-colors shadow-md hover:shadow-lg"
            >
              Get Link
              <Globe className="ml-2 h-5 w-5" />
            </Link>
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
              href="/personal"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 transition-colors"
            >
              Personal Dashboard
              <User className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/corporate"
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