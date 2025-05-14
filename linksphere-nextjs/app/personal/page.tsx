"use client";
import React, { useEffect, useState } from 'react';
import { Instagram, Facebook, Twitter, AlignJustify as Spotify, Youtube, Linkedin, Globe, Book, ShoppingBag, MessageCircle, FileText } from 'lucide-react';
import SocialCard from '../components/dashboard/SocialCard';
import LinkCard from '../components/dashboard/LinkCard';
import { useToast } from '../context/ToastContext';
import QRCodeModal from '../components/link/QRCodeModal';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PERSONAL_LINKS, UPDATE_KISISEL_LINK_MUTATION, GET_PERSONAL_KISA_LINK } from '../GraphQl/LinklerGraphQl';
import Modal from '../components/common/Modal';

import { useRouter } from 'next/navigation';



// PersonalDashboard.tsx dosyanızın başında
// ... mevcut importlarınız
import {
  // ... mevcut ikonlarınız ...
  Copy, QrCode, Check, Share2, Trash2, // Share2 genel paylaşım için, Trash2 silme için (opsiyonel)
  // Link as LinkIcon, // Eğer LinkIcon adında zaten bir importunuz varsa (next/link gibi), buna gerek yok veya yeniden adlandırın
  MessageCircle as WhatsAppIcon, // WhatsApp için (yeşil renk verilebilir)
  MessageSquare as SmsIcon,     // SMS için
} from 'lucide-react';

// Twitter (X) ve Facebook için SVG'leri doğrudan kullanacağız
const TwitterIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);
const FacebookIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z" clipRule="evenodd"></path>
  </svg>
);


// PersonalDashboard.tsx dosyasının üst kısmına
interface ShortLink {
  id: string;
  asilMetinAdi: string;
  kisaltmaToken: string;
  olusturmaTarihi: string; // Veya DateTime scalar'ınız Date objesine dönüşüyorsa Date
  guncellemeTarihi: string; // Kullanılmayacaksa opsiyonel
}


interface KisiselLinkGuncelleDtoInput {
  instagram?: string | null;
  facebook?: string | null;
  x?: string | null;
  spotify?: string | null;
  youtube?: string | null;
  linkedin?: string | null;
  reddit?: string | null;
  vk?: string | null;
  medium?: string | null;
  webSite?: string | null;
  favoriMuzikVideom?: string | null;
  youtubeList?: string | null;
  youtubeVideo?: string | null;
  blogSitem?: string | null;
  spotifyList?: string | null;
  alisverisListem?: string | null;
}

const PersonalDashboard: React.FC = () => {
  const { addToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState('');
  const [formData, setFormData] = useState<KisiselLinkGuncelleDtoInput>({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");

  const router = useRouter();

  // PersonalDashboard.tsx içinde
  // const [showQRModal, setShowQRModal] = useState(false); // Bu zaten var
  // const [selectedUrl, setSelectedUrl] = useState(''); // Bu zaten var
  const [copiedShortLinks, setCopiedShortLinks] = useState<Record<string, boolean>>({}); // Her kısa linkin kopyalanma durumu
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
        router.push('/login');
      }


    }
  }, []);

  console.log('User from localStorage:', user);

  const { data, loading, error, refetch } = useQuery(GET_PERSONAL_LINKS, {
    variables: { userId: user ? user.id : null },
    skip: !user?.id,
    fetchPolicy: 'cache-and-network',
  });

  console.log('GraphQL Data 1:', data);






  const [updateKisiselLink, { data: kisiselLink, loading: kshata, error: kserror }] = useMutation(UPDATE_KISISEL_LINK_MUTATION, {
    variables: { userId: user ? user.id : null },
  });

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingField) return;
    try {
      await updateKisiselLink({
        variables: {
          linkId: data?.kullaniciBul.kisiselLink.id,
          linkData: {
            [editingField]:
              editingField in formData && formData[editingField as keyof KisiselLinkGuncelleDtoInput] !== null
                ? formData[editingField as keyof KisiselLinkGuncelleDtoInput]
                : data?.kullaniciBul.kisiselLink[editingField],
          },
        },
      });
      addToast('success', `${editingField} updated successfully!`);
      setShowEditModal(false);
      refetch();  // <-- Refresh the query data after update
    } catch (err) {
      console.error(`Failed to update ${editingField}:`, err);
      addToast('error', `Failed to update ${editingField}`);
    }
  };

  console.log('GraphQL Data 2:', data?.kullaniciBul.kisiselLink);

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram />;
      case 'facebook': return <Facebook />;
      case 'twitter': return <Twitter />;
      case 'spotify': return <Spotify />;
      case 'youtube': return <Youtube />;
      case 'linkedin': return <Linkedin />;
      case 'reddit': return <MessageCircle />;
      case 'vk': return <Globe />;
      case 'medium': return <FileText />;
      case 'book': return <Book />;
      case 'shopping': return <ShoppingBag />;
      case 'globe':
      default: return <Globe />;
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      addToast('success', 'Edit Mode Off!');
    }
  };

  const handleGenerateQR = (url: string) => {
    setSelectedUrl(url);
    setShowQRModal(true);
  };

  const handleCardEdit = (field: string, currentValue: string | null) => {
    setEditingField(field);
    setEditingValue(currentValue || "");
    setFormData(prev => ({ ...prev, [field]: currentValue || "" }));
    setShowEditModal(true);
  };

  const [socialLinks, setSocialLinks] = useState([
    { id: 1, platform: 'instagram', username: data?.kullaniciBul?.kisiselLink?.instagram, url: `https://instagram.com/${data?.kullaniciBul?.kisiselLink?.instagram}` },
    { id: 2, platform: 'facebook', username: data?.kullaniciBul?.kisiselLink?.facebook, url: `https://facebook.com/${data?.kullaniciBul?.kisiselLink?.facebook}` },
    { id: 3, platform: 'twitter', username: data?.kullaniciBul?.kisiselLink?.x, url: `https://x.com/${data?.kullaniciBul?.kisiselLink?.x}` },
    { id: 4, platform: 'spotify', username: data?.kullaniciBul?.kisiselLink?.spotify, url: `https://open.spotify.com/user/${data?.kullaniciBul?.kisiselLink?.spotify}` },
    { id: 5, platform: 'youtube', username: data?.kullaniciBul?.kisiselLink?.youtube, url: `https://youtube.com/@${data?.kullaniciBul?.kisiselLink?.youtube}` },
    { id: 6, platform: 'linkedin', username: data?.kullaniciBul?.kisiselLink?.linkedin, url: `https://linkedin.com/in/${data?.kullaniciBul?.kisiselLink?.linkedin}` },
    { id: 7, platform: 'reddit', username: data?.kullaniciBul?.kisiselLink?.reddit, url: `https://reddit.com/user/${data?.kullaniciBul?.kisiselLink?.reddit}` },
    { id: 8, platform: 'vk', username: data?.kullaniciBul?.kisiselLink?.vk, url: `https://vk.com/${data?.kullaniciBul?.kisiselLink?.vk}` },
    { id: 9, platform: 'medium', username: data?.kullaniciBul?.kisiselLink?.medium, url: `https://medium.com/@${data?.kullaniciBul?.kisiselLink?.medium}` },
  ]);

  const [customLinks, setCustomLinks] = useState([
    { id: 1, title: 'Personal Website', url: data?.kullaniciBul?.kisiselLink?.webSite, icon: 'globe', size: 'large' },
    { id: 2, title: 'Favorite Music Video', url: data?.kullaniciBul?.kisiselLink?.favoriMuzikVideom, icon: 'youtube', size: 'large' },
    { id: 3, title: 'YouTube Playlist', url: data?.kullaniciBul?.kisiselLink?.youtubeList, icon: 'youtube', size: 'large' },
    { id: 4, title: 'Latest Video', url: data?.kullaniciBul?.kisiselLink?.youtubeVideo, icon: 'youtube', size: 'large' },
    { id: 5, title: 'Blog', url: data?.kullaniciBul?.kisiselLink?.blogSitem, icon: 'book', size: 'large' },
    { id: 6, title: 'Spotify Playlist', url: data?.kullaniciBul?.kisiselLink?.spotifyList, icon: 'spotify', size: 'large' },
    { id: 7, title: 'Shopping List', url: data?.kullaniciBul?.kisiselLink?.alisverisListem, icon: 'shopping', size: 'large' },
  ]);

  useEffect(() => {
    if (data && data.kullaniciBul?.kisiselLink) {
      const link = data.kullaniciBul.kisiselLink;
      setSocialLinks([
        { id: 1, platform: 'instagram', username: link.instagram, url: `https://instagram.com/${link.instagram}` },
        { id: 2, platform: 'facebook', username: link.facebook, url: `https://facebook.com/${link.facebook}` },
        { id: 3, platform: 'twitter', username: link.x, url: `https://x.com/${link.x}` },
        { id: 4, platform: 'spotify', username: link.spotify, url: `https://open.spotify.com/user/${link.spotify}` },
        { id: 5, platform: 'youtube', username: link.youtube, url: `https://youtube.com/@${link.youtube}` },
        { id: 6, platform: 'linkedin', username: link.linkedin, url: `https://linkedin.com/in/${link.linkedin}` },
        { id: 7, platform: 'reddit', username: link.reddit, url: `https://reddit.com/user/${link.reddit}` },
        { id: 8, platform: 'vk', username: link.vk, url: `https://vk.com/${link.vk}` },
        { id: 9, platform: 'medium', username: link.medium, url: `https://medium.com/@${link.medium}` },
      ]);
      setCustomLinks([
        { id: 1, title: 'Personal Website', url: link.webSite, icon: 'globe', size: 'large' },
        { id: 2, title: 'Favorite Music Video', url: link.favoriMuzikVideom, icon: 'youtube', size: 'large' },
        { id: 3, title: 'YouTube Playlist', url: link.youtubeList, icon: 'youtube', size: 'large' },
        { id: 4, title: 'Latest Video', url: link.youtubeVideo, icon: 'youtube', size: 'large' },
        { id: 5, title: 'Blog', url: link.blogSitem, icon: 'book', size: 'large' },
        { id: 6, title: 'Spotify Playlist', url: link.spotifyList, icon: 'spotify', size: 'large' },
        { id: 7, title: 'Shopping List', url: link.alisverisListem, icon: 'shopping', size: 'large' },
      ]);
    }
  }, [data]);


  // PersonalDashboard.tsx içinde, mevcut useQuery'nin yanına veya altına:
  const {
    data: shortLinksData,
    loading: shortLinksLoading,
    error: shortLinksError,
    refetch: refetchShortLinks
  } = useQuery(GET_PERSONAL_KISA_LINK, { // Yeni sorguyu burada kullanın
    variables: { kullaniciId: user ? user.id : null }, // Değişken adını sorgunuza göre ayarlayın
    skip: !user?.id,
    fetchPolicy: 'cache-and-network',
  });

  // GraphQL'den gelen kısa linkleri bir değişkene atayalım
  const userShortLinks: ShortLink[] = shortLinksData?.kullaniciBul?.linkler || [];

  console.log('Kullanıcının Kısa Linkleri:', userShortLinks);



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


  // PersonalDashboard.tsx içinde (veya bir utils dosyasında)
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('tr-TR', { // 'en-US' veya istediğiniz lokal
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  return (
    <>
      <div className="space-y-8 pt-14">
        <div className="bg-gradient-to-r from-pink-500 to-orange-500 dark:from-pink-700 dark:to-orange-700 rounded-xl shadow-lg p-8 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Personal Dashboard</h1>
              <p className="mt-2 opacity-90">Manage all your personal links in one place</p>
            </div>
            <div className="flex flex-col space-y-2">
              <button
                onClick={toggleEditMode}
                className={`px-4 py-2 rounded-md border border-white/30 backdrop-blur-sm transition-all ${isEditing
                  ? 'bg-white text-pink-600 hover:bg-pink-50'
                  : 'bg-white/10 hover:bg-white/20'
                  }`}
              >
                {isEditing ? 'Save Changes' : 'Edit Dashboard'}
              </button>
              <button
                onClick={() => handleGenerateQR(`http://localhost:3000/p/${user?.nickname}`)}
                className={`px-4 py-2 rounded-md border border-white/30 backdrop-blur-sm transition-all ${isEditing
                  ? 'bg-white text-pink-600 hover:bg-pink-50'
                  : 'bg-white/10 hover:bg-white/20'
                  }`}
              >
                Share Me
              </button>
            </div>
          </div>


        </div>

        {/* Social Media Links - Windows 8 Style */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Social Media</h2>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialLinks.map((link) => (
              <SocialCard
                key={link.id}
                platform={link.platform}
                username={link.username}
                url={link.url}
                icon={getPlatformIcon(link.platform)}
                isEditing={isEditing}
                onEdit={() => handleCardEdit(
                  link.platform.toLowerCase() === 'twitter' ? 'x' : link.platform.toLowerCase(),
                  link.username
                )}
                onDelete={() => addToast('info', `Delete ${link.platform} link`)}
                onGenerateQR={() => handleGenerateQR(link.url)}
              />
            ))}
          </div>
        </section>

        {/* Custom Links - Windows 8 Style */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Custom Links</h2>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows">
            {customLinks.map((link) => (
              <div
                key={link.id}
                className={`${link.size === 'large' ? 'sm:col-span-2 sm:row-span-2' :
                  link.size === 'medium' ? 'sm:col-span-2' : ''
                  }`}
              >
                <LinkCard
                  title={link.title}
                  url={link.url}
                  icon={getPlatformIcon(link.icon)}
                  isEditing={isEditing}
                  onEdit={() => handleCardEdit(
                    link.title === 'Personal Website' ? 'webSite' :
                      link.title === 'Favorite Music Video' ? 'favoriMuzikVideom' :
                        link.title === 'YouTube Playlist' ? 'youtubeList' :
                          link.title === 'Latest Video' ? 'youtubeVideo' :
                            link.title === 'Blog' ? 'blogSitem' :
                              link.title === 'Spotify Playlist' ? 'spotifyList' :
                                link.title === 'Shopping List' ? 'alisverisListem' : '',
                    link.url
                  )}
                  onDelete={() => addToast('info', `Delete ${link.title}`)}
                  onGenerateQR={() => handleGenerateQR(link.url)}
                />
              </div>
            ))}
          </div>
        </section>

        // PersonalDashboard.tsx içinde, return ifadesinin bir parçası olarak

        {/* My Shortened Links Section */}
        <section className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">My Shortened Links</h2>
            {/* İsteğe bağlı: Yeni link kısaltma sayfasına yönlendirme butonu */}
            {/*
    <Link href="/shorten" passHref>
      <a className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition-colors">
        Shorten New Link
      </a>
    </Link>
    */}
          </div>

          {shortLinksLoading && (
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
              <p className="text-gray-500 dark:text-gray-400">Loading your short links...</p>
              {/* Spinner eklenebilir */}
            </div>
          )}
          {shortLinksError && (
            <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg shadow-md text-center">
              <p className="text-red-600 dark:text-red-300">
                Error loading short links. Please try refreshing.
              </p>
            </div>
          )}

          {!shortLinksLoading && !shortLinksError && userShortLinks.length === 0 && (
            <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md text-center border border-gray-200 dark:border-gray-700">
              {/* Lucide-react'ten LinkIcon'u kullanabilirsiniz, eğer next/link ile çakışıyorsa yeniden adlandırın */}
              <FileText className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
              <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">No short links yet</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                You haven't created any short links.
              </p>
              {/*
      <div className="mt-6">
        <Link href="/shorten" passHref>
           <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
            Create your first link
          </a>
        </Link>
      </div>
      */}
            </div>
          )}

          {!shortLinksLoading && userShortLinks.length > 0 && (
            <div className="overflow-hidden shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                  <thead className="bg-gray-50 dark:bg-gray-700/70">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Original URL
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Short Link
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Created
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {userShortLinks.map((link) => {
                      const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://linksphere.tr'; // Domain'inizi buraya yazın veya dinamik alın
                      const fullShortUrl = `${baseUrl}/${link.kisaltmaToken}`; // Varsa bir prefix (örn: /s/) ekleyebilirsiniz: `${baseUrl}/s/${link.kisaltmaToken}`
                      const displayShortUrl = fullShortUrl.replace(/^https?:\/\//, '');

                      return (
                        <tr key={link.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                          <td className="px-6 py-4 max-w-xs sm:max-w-md md:max-w-lg">
                            <a
                              href={link.asilMetinAdi}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-medium text-gray-800 dark:text-gray-100 hover:text-pink-600 dark:hover:text-pink-400 truncate block"
                              title={link.asilMetinAdi}
                            >
                              {link.asilMetinAdi}
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <a
                              href={fullShortUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-pink-600 dark:text-pink-400 hover:underline"
                            >
                              {displayShortUrl}
                            </a>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(link.olusturmaTarihi)}
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap text-center">
                            <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                              <button
                                onClick={async () => await copyTextToClipboard(fullShortUrl)}
                                className="p-1.5 sm:p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                                aria-label="Copy short link"
                                title="Copy short link"
                              >
                                {copiedShortLinks[link.id] ? (
                                  <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </button>
                              <button
                                onClick={() => handleGenerateQR(fullShortUrl)}
                                className="p-1.5 sm:p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                                aria-label="Generate QR Code"
                                title="Generate QR Code"
                              >
                                <QrCode className="h-4 w-4" />
                              </button>

                              {/* Paylaşım Butonları */}
                              <a
                                href={`https://wa.me/?text=${encodeURIComponent('Check out this link: ' + fullShortUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 sm:p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-green-500 dark:hover:text-green-400 transition-colors"
                                aria-label="Share on WhatsApp"
                                title="Share on WhatsApp"
                              >
                                <WhatsAppIcon className="h-4 w-4" />
                              </a>
                              <a
                                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullShortUrl)}&text=${encodeURIComponent('Found this cool link: ')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 sm:p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                                aria-label="Share on Twitter"
                                title="Share on Twitter"
                              >
                                <TwitterIcon />
                              </a>
                              <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullShortUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 sm:p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                aria-label="Share on Facebook"
                                title="Share on Facebook"
                              >
                                <FacebookIcon />
                              </a>
                              <a
                                href={`sms:?&body=${encodeURIComponent('Hey, check this link: ' + fullShortUrl)}`}
                                className="p-1.5 sm:p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                                aria-label="Share via SMS"
                                title="Share via SMS"
                              >
                                <SmsIcon className="h-4 w-4" />
                              </a>
                              {/* Opsiyonel: Silme Butonu */}
                              {/*
                        <button
                          onClick={() => handleDeleteShortLink(link.id)} // Bu fonksiyonu tanımlamanız gerekir
                          className="p-1.5 sm:p-2 rounded-md text-red-500 hover:bg-red-100 dark:hover:bg-red-700/50 transition-colors"
                          aria-label="Delete short link"
                          title="Delete short link"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                       */}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* QR Code Modal (Bu zaten mevcut olmalı) */}
        {showQRModal && (
          <QRCodeModal
            url={selectedUrl} // selectedUrl state'i hem kisiselLink hem de shortLink için kullanılabilir
            onClose={() => setShowQRModal(false)}
          />
        )}

        {/* QR Code Modal */}
        {showQRModal && (
          <QRCodeModal
            url={selectedUrl}
            onClose={() => setShowQRModal(false)}
          />
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          title={`Edit ${editingField}`}
        >
          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="text"
              value={editingValue}
              onChange={(e) => {
                setEditingValue(e.target.value);
                if (editingField) {
                  setFormData(prev => ({ ...prev, [editingField]: e.target.value }));
                }
              }}
              className="w-full p-2 border rounded"
            />
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">
              Save
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default PersonalDashboard;