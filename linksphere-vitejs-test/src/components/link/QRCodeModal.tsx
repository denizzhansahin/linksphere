import React, { useEffect } from 'react';
import { X, Download } from 'lucide-react';
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;