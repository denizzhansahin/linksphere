"use client"

import React from 'react';
import { Mail, Globe, Phone, MapPin, Building, Edit, Trash2, Copy, QrCode, ExternalLink } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface BusinessCardProps {
  title: string;
  value: string;
  type: 'email' | 'website' | 'phone' | 'address' | 'company';
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onGenerateQR?: () => void;
  allowDelete?: boolean; // NEW optional prop
}

const BusinessCard: React.FC<BusinessCardProps> = ({
  title,
  value,
  type,
  isEditing,
  onEdit,
  onDelete,
  onGenerateQR,
  allowDelete
}) => {
  const { addToast } = useToast();

  const getIcon = () => {
    switch (type) {
      case 'email': return <Mail className="w-5 h-5" />;
      case 'website': return <Globe className="w-5 h-5" />;
      case 'phone': return <Phone className="w-5 h-5" />;
      case 'address': return <MapPin className="w-5 h-5" />;
      case 'company': return <Building className="w-5 h-5" />;
      default: return <Building className="w-5 h-5" />;
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'email': return 'text-blue-600 dark:text-blue-400';
      case 'website': return 'text-indigo-600 dark:text-indigo-400';
      case 'phone': return 'text-green-600 dark:text-green-400';
      case 'address': return 'text-red-600 dark:text-red-400';
      case 'company': return 'text-gray-600 dark:text-gray-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

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
                {allowDelete && (  // only show delete if allowDelete === true
                  <button
                    onClick={onDelete}
                    className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={async () => await copyTextToClipboard(value)}
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