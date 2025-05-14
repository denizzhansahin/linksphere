"use client";
import React, { useState, useEffect } from 'react';
import { PlusCircle, Instagram, Facebook, Twitter, AlignJustify as Spotify, Youtube, Linkedin, Globe, Book, ShoppingBag, MessageCircle, FileText, UserCircle, ImageUp } from 'lucide-react';
import SocialCard from '../../components/dashboard/SocialCard';
import LinkCard from '../../components/dashboard/LinkCard';
import { useToast } from '../../context/ToastContext';
import QRCodeModal from '../../components/link/QRCodeModal';

import { useQuery } from '@apollo/client';
import { GET_KISISEL_LINK } from '@/app/GraphQl/LinklerGraphQl';

interface Props {
  params: Promise<{ nickname: string }>; // or as appropriate
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



const UserPersonalDashboard = ({ params }: Props) => {
  const { nickname } = React.use(params); // Unwrap the promise

  const [previewImage, setPreviewImage] = useState<string | null>(null);


  const { addToast } = useToast();

  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState('');


  const { data, loading, error, refetch } = useQuery(GET_KISISEL_LINK, {
    variables: { userNickname: nickname ? nickname : null },
    skip: !nickname,
  });

  console.log('GraphQL Data 1:', data?.kullaniciBul_profil);

  const [socialLinks, setSocialLinks] = useState<{ id: number; platform: string; username: string | null; url: string }[]>([]);
  const [customLinks, setCustomLinks] = useState<{ id: number; title: string; url: string | null; icon: string; size: string }[]>([]);

  useEffect(() => {
    if (data && data.kullaniciBul_profil?.kisiselLink) {
      const link = data.kullaniciBul_profil.kisiselLink;

      if (data.kullaniciBul_profil?.fotograf) {
        setPreviewImage(data.kullaniciBul_profil?.fotograf);
      }
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

  console.log('socialLinks:', socialLinks);
  console.log('customLinks:', customLinks);


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



  const handleAddLink = () => {
    addToast('info', 'This feature will allow you to add a new link');
  };

  const handleGenerateQR = (url: string) => {
    setSelectedUrl(url);
    setShowQRModal(true);
  };

  return (
    <div className="space-y-8 pt-14">
      <div className="bg-gradient-to-r from-pink-500 to-orange-500 dark:from-pink-700 dark:to-orange-700 rounded-xl shadow-lg p-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{data?.kullaniciBul_profil?.isim} {data?.kullaniciBul_profil?.soyisim}</h1>
            <p className="mt-2 opacity-90"> @{nickname}</p>
          </div>
            <div className="mt-4 sm:mt-0 relative flex flex-col items-center group">
            {previewImage ? (
              <img
              src={previewImage}
              alt="Profil Fotoğrafı"
              className="h-40 w-40 object-cover rounded-full border-4 border-white/50 group-hover:border-white transition-all duration-300 shadow-lg"
              />
            ) : (
              <UserCircle className="h-40 w-40 text-white/50 group-hover:text-white transition-all duration-300" />
            )}

            <button
              onClick={() => handleGenerateQR(`http://localhost:3000/p/${data?.kullaniciBul_profil?.nickname}`)}
              className={`mt-4 px-4 py-2 rounded-md border border-white/30 backdrop-blur-sm transition-all 
               bg-white/10 hover:bg-white/20
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
              username={link.username || ''}
              url={link.url || ''}
              icon={getPlatformIcon(link.platform)}
              isEditing={false}
              onEdit={() => addToast('info', `Edit ${link.platform} link`)}
              onDelete={() => addToast('info', `Delete ${link.platform} link`)}
              onGenerateQR={() => handleGenerateQR(link.url ?? '')}
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
                url={link.url || ''}
                icon={getPlatformIcon(link.icon)}
                isEditing={false}
                onEdit={() => addToast('info', `Edit ${link.title}`)}
                onDelete={() => addToast('info', `Delete ${link.title}`)}
                onGenerateQR={() => handleGenerateQR(link.url ?? '')}
              />
            </div>
          ))}
        </div>
      </section>

      {/* QR Code Modal */}
      {showQRModal && (
        <QRCodeModal
          url={selectedUrl}
          onClose={() => setShowQRModal(false)}
        />
      )}


    </div>
  );
};

export default UserPersonalDashboard;