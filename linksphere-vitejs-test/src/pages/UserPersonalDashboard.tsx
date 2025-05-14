import React, { useState } from 'react';
import { PlusCircle, Instagram, Facebook, Twitter, AlignJustify as Spotify, Youtube, Linkedin, Globe, Book, ShoppingBag, MessageCircle, FileText } from 'lucide-react';
import SocialCard from '../components/dashboard/SocialCard';
import LinkCard from '../components/dashboard/LinkCard';
import { useToast } from '../context/ToastContext';
import QRCodeModal from '../components/link/QRCodeModal';
import { useParams } from 'react-router-dom';

const UserPersonalDashboard: React.FC = () => {

  const { id } = useParams(); // :id olarak tanımladığımız parametreyi alır
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { addToast } = useToast();

  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState('');
  
  const [socialLinks, setSocialLinks] = useState([
    { id: 1, platform: 'instagram', username: 'creativephoto', url: 'https://instagram.com/creativephoto' },
    { id: 2, platform: 'facebook', username: 'creative.design', url: 'https://facebook.com/creative.design' },
    { id: 3, platform: 'twitter', username: 'designthoughts', url: 'https://twitter.com/designthoughts' },
    { id: 4, platform: 'spotify', username: 'indie_vibes', url: 'https://open.spotify.com/user/indie_vibes' },
    { id: 5, platform: 'youtube', username: 'creativeChannel', url: 'https://youtube.com/@creativeChannel' },
    { id: 6, platform: 'linkedin', username: 'professional', url: 'https://linkedin.com/in/professional' },
    { id: 7, platform: 'reddit', username: 'creative_mind', url: 'https://reddit.com/user/creative_mind' },
    { id: 8, platform: 'vk', username: 'creative_vk', url: 'https://vk.com/creative_vk' },
    { id: 9, platform: 'medium', username: '@creative_writer', url: 'https://medium.com/@creative_writer' },
  ]);

  const [customLinks, setCustomLinks] = useState([
    { id: 1, title: 'Personal Website', url: 'https://example.com', icon: 'globe', size: 'large' },
    { id: 2, title: 'Favorite Music Video', url: 'https://youtube.com/watch?v=abcdef', icon: 'youtube', size: 'large' },
    { id: 3, title: 'YouTube Playlist', url: 'https://youtube.com/playlist?list=123', icon: 'youtube', size: 'large' },
    { id: 4, title: 'Latest Video', url: 'https://youtube.com/watch?v=latest', icon: 'youtube', size: 'large' },
    { id: 5, title: 'Blog', url: 'https://example.com/blog', icon: 'book', size: 'large' },
    { id: 6, title: 'Spotify Playlist', url: 'https://open.spotify.com/playlist/12345', icon: 'spotify', size: 'large' },
    { id: 7, title: 'Shopping List', url: 'https://example.com/shopping', icon: 'shopping', size: 'large' },
  ]);

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
            <h1 className="text-3xl font-bold">Personal Dashboard</h1>
            <p className="mt-2 opacity-90">Manage all your personal links in one place</p>
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
              isEditing={false}
              onEdit={() => addToast('info', `Edit ${link.platform} link`)}
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
              className={`${
                link.size === 'large' ? 'sm:col-span-2 sm:row-span-2' :
                link.size === 'medium' ? 'sm:col-span-2' : ''
              }`}
            >
              <LinkCard
                title={link.title}
                url={link.url}
                icon={getPlatformIcon(link.icon)}
                isEditing={false}
                onEdit={() => addToast('info', `Edit ${link.title}`)}
                onDelete={() => addToast('info', `Delete ${link.title}`)}
                onGenerateQR={() => handleGenerateQR(link.url)}
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