"use client"

import React, { useEffect } from 'react';
import { X, Download, Copy } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { useToast } from '../../context/ToastContext';

interface QRCodeModalProps {
  url: string;
  onClose: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ url, onClose }) => {
  const { addToast } = useToast();

  const handleDownload = () => {
    try {
      const canvas = document.getElementById('qr-code') as HTMLCanvasElement;
      if (!canvas) {
        addToast('error', 'QR code canvas not found');
        return;
      }
      const pngUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = pngUrl;
      link.download = `qrcode-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      addToast('success', 'QR code downloaded successfully!');
    } catch (error) {
      addToast('error', 'Failed to download QR code');
    }
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

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
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-90 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        ></div>

        <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:w-full sm:max-w-2xl">
          <div className="px-4 pb-4 pt-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                QR Code for your link
              </h3>
              <button
                onClick={onClose}
                className="rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="sr-only">Close</span>
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center py-4">
              <div className="bg-white p-4 rounded-md shadow-sm">
                <QRCodeCanvas
                  id="qr-code"
                  value={url}
                  size={450}
                  level="H"
                  includeMargin={true}
                />
              </div>

              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Scan this QR code to access: <span className="font-medium text-indigo-600 dark:text-indigo-400">{url}</span>
              </p>

              <button
                onClick={handleDownload}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Download className="h-4 w-4 mr-2" />
                Download QR Code
              </button>

              <button
                onClick={async () => await copyTextToClipboard(url)}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-label="Copy link"
              >
                <Copy className="w-5 h-5" />
                Copy To Clipboard
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;