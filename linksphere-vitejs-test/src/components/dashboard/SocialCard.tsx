import React from 'react';
import { ExternalLink, Edit, Trash2, Copy, QrCode } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface SocialCardProps {
  platform: string;
  username: string;
  url: string;
  icon: React.ReactNode;
  isEditing: boolean | undefined;
  onEdit: () => void;
  onDelete: () => void;
  onGenerateQR?: () => void;
}

const SocialCard: React.FC<SocialCardProps> = ({
  platform,
  username,
  url,
  icon,
  isEditing,
  onEdit,
  onDelete,
  onGenerateQR
}) => {
  const { addToast } = useToast();

  const getPlatformColor = (platform: string): string => {
    switch (platform.toLowerCase()) {
      case 'instagram': return 'from-pink-500 to-purple-500';
      case 'facebook': return 'from-blue-600 to-blue-500';
      case 'twitter': return 'from-blue-400 to-blue-300';
      case 'spotify': return 'from-green-500 to-green-400';
      case 'youtube': return 'from-red-600 to-red-500';
      case 'linkedin': return 'from-blue-700 to-blue-600';
      case 'reddit': return 'from-orange-500 to-red-500';
      case 'vk': return 'from-blue-500 to-blue-400';
      case 'medium': return 'from-gray-800 to-gray-700';
      default: return 'from-gray-500 to-gray-400';
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      addToast('success', 'Link copied to clipboard!');
    } catch (error) {
      addToast('error', 'Failed to copy link');
    }
  };

  return (
    <div 
      className={`relative group h-48 overflow-hidden rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${
        isEditing ? 'ring-2 ring-indigo-300 dark:ring-indigo-700' : ''
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${getPlatformColor(platform)} opacity-90`}></div>
      
      <div className="relative h-full p-6 flex flex-col justify-between text-white">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              {icon}
            </div>
            <div>
              <h3 className="text-xl font-bold capitalize">
                {platform}
              </h3>
              <p className="text-sm opacity-90">
                @{username}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          {isEditing ? (
            <div className="flex space-x-2">
              <button
                onClick={onEdit}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={onDelete}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
                aria-label="Copy link"
              >
                <Copy className="w-5 h-5" />
              </button>
              {onGenerateQR && (
                <button
                  onClick={onGenerateQR}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
                  aria-label="Generate QR code"
                >
                  <QrCode className="w-5 h-5" />
                </button>
              )}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
              >
                Visit Profile
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialCard;