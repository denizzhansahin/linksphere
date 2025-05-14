import React from 'react';
import { Mail, Globe, Phone, MapPin, Building, Edit, Trash2, Copy, QrCode, ExternalLink } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface BusinessCardProps {
  title: string;
  value: string;
  type: 'email' | 'website' | 'phone' | 'address';
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onGenerateQR?: () => void;
}

const BusinessCard: React.FC<BusinessCardProps> = ({
  title,
  value,
  type,
  isEditing,
  onEdit,
  onDelete,
  onGenerateQR
}) => {
  const { addToast } = useToast();

  const getIcon = () => {
    switch (type) {
      case 'email': return <Mail className="w-5 h-5" />;
      case 'website': return <Globe className="w-5 h-5" />;
      case 'phone': return <Phone className="w-5 h-5" />;
      case 'address': return <MapPin className="w-5 h-5" />;
      default: return <Building className="w-5 h-5" />;
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'email': return 'text-blue-600 dark:text-blue-400';
      case 'website': return 'text-indigo-600 dark:text-indigo-400';
      case 'phone': return 'text-green-600 dark:text-green-400';
      case 'address': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      addToast('success', `${title} copied to clipboard!`);
    } catch (error) {
      addToast('error', 'Failed to copy value');
    }
  };

  return (
    <div className={`relative group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-md ${
      isEditing ? 'ring-2 ring-indigo-300 dark:ring-indigo-700' : ''
    }`}>
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 ${getIconColor()}`}>
            {getIcon()}
          </div>
          
          <div className="flex-grow min-w-0">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {title}
            </h3>
            <p className="mt-1 text-base font-medium text-gray-900 dark:text-white break-all">
              {value}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={onEdit}
                  className="p-2 rounded-lg text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/30 transition-colors"
                  aria-label="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={onDelete}
                  className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                  aria-label="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={copyToClipboard}
                  className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Copy"
                >
                  <Copy className="w-4 h-4" />
                </button>
                {onGenerateQR && type !== 'address' && (
                  <button
                    onClick={onGenerateQR}
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Generate QR code"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                )}
                {type === 'website' && (
                  <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Visit website"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;