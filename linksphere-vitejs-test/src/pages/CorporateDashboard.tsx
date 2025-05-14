import React, { useState } from 'react';
import { Mail, Globe, Phone, MapPin, Building, Edit, Save, PlusCircle, BarChart2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import BusinessCard from '../components/dashboard/BusinessCard';
import QRCodeModal from '../components/link/QRCodeModal';

const CorporateDashboard: React.FC = () => {
  const { addToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState('');

  const [corporateDetails, setCorporateDetails] = useState({
    companyName: 'Acme Industries',
    email: 'contact@acme-industries.com',
    website: 'https://acme-industries.com',
    businessWebsite: 'https://business.acme-industries.com',
    officeAddress: '123 Business Park, Suite 456, Enterprise City, EC 12345',
    phone: '+1 (555) 123-4567',
    officePhone: '+1 (555) 987-6543',
    officeEmail: 'office@acme-industries.com',
  });

  const [corporateLinks, setCorporateLinks] = useState([
    { id: 1, title: 'Company LinkedIn', url: 'https://linkedin.com/company/acme-industries' },
    { id: 2, title: 'Corporate Twitter', url: 'https://twitter.com/acme_industries' },
    { id: 3, title: 'Product Catalog', url: 'https://acme-industries.com/products' },
    { id: 4, title: 'Press Kit', url: 'https://acme-industries.com/press' },
    { id: 5, title: 'Careers Page', url: 'https://acme-industries.com/careers' },
  ]);

  const analytics = {
    totalVisits: 12483,
    monthlyGrowth: '+15.3%',
    topPerformer: 'Product Catalog',
    conversionRate: '3.7%',
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      addToast('success', 'Corporate details updated successfully!');
    }
  };

  const handleAddLink = () => {
    addToast('info', 'This feature will allow you to add a new corporate link');
  };

  const handleGenerateQR = (url: string) => {
    setSelectedUrl(url);
    setShowQRModal(true);
  };

  return (
    <div className="space-y-8 pt-14">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-800 dark:to-cyan-700 rounded-xl shadow-lg p-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{corporateDetails.companyName}</h1>
            <p className="mt-2 opacity-90">Corporate Link Management Dashboard</p>
          </div>
          <button
            onClick={toggleEditMode}
            className={`px-4 py-2 rounded-md border border-white/30 backdrop-blur-sm transition-all ${
              isEditing 
                ? 'bg-white text-blue-600 hover:bg-blue-50' 
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            {isEditing ? (
              <span className="flex items-center gap-1.5">
                <Save className="w-4 h-4" />
                Save Changes
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Edit className="w-4 h-4" />
                Edit Dashboard
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Information */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Company Information</h2>
          
          <BusinessCard
            title="Business Email"
            value={corporateDetails.email}
            type="email"
            isEditing={isEditing}
            onEdit={() => addToast('info', 'Edit business email')}
            onDelete={() => addToast('info', 'Delete business email')}
            onGenerateQR={() => handleGenerateQR(`mailto:${corporateDetails.email}`)}
          />

          <BusinessCard
            title="Office Email"
            value={corporateDetails.officeEmail}
            type="email"
            isEditing={isEditing}
            onEdit={() => addToast('info', 'Edit office email')}
            onDelete={() => addToast('info', 'Delete office email')}
            onGenerateQR={() => handleGenerateQR(`mailto:${corporateDetails.officeEmail}`)}
          />

          <BusinessCard
            title="Business Website"
            value={corporateDetails.website}
            type="website"
            isEditing={isEditing}
            onEdit={() => addToast('info', 'Edit business website')}
            onDelete={() => addToast('info', 'Delete business website')}
            onGenerateQR={() => handleGenerateQR(corporateDetails.website)}
          />

          <BusinessCard
            title="Corporate Website"
            value={corporateDetails.businessWebsite}
            type="website"
            isEditing={isEditing}
            onEdit={() => addToast('info', 'Edit corporate website')}
            onDelete={() => addToast('info', 'Delete corporate website')}
            onGenerateQR={() => handleGenerateQR(corporateDetails.businessWebsite)}
          />

          <BusinessCard
            title="Office Address"
            value={corporateDetails.officeAddress}
            type="address"
            isEditing={isEditing}
            onEdit={() => addToast('info', 'Edit office address')}
            onDelete={() => addToast('info', 'Delete office address')}
          />

          <BusinessCard
            title="Business Phone"
            value={corporateDetails.phone}
            type="phone"
            isEditing={isEditing}
            onEdit={() => addToast('info', 'Edit business phone')}
            onDelete={() => addToast('info', 'Delete business phone')}
            onGenerateQR={() => handleGenerateQR(`tel:${corporateDetails.phone}`)}
          />

          <BusinessCard
            title="Office Phone"
            value={corporateDetails.officePhone}
            type="phone"
            isEditing={isEditing}
            onEdit={() => addToast('info', 'Edit office phone')}
            onDelete={() => addToast('info', 'Delete office phone')}
            onGenerateQR={() => handleGenerateQR(`tel:${corporateDetails.officePhone}`)}
            
          />
        </div>

        {/* Corporate Links */}
        <div className="lg:col-span-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Corporate Links</h2>
            {isEditing && (
              <button 
                onClick={handleAddLink}
                className="flex items-center gap-1.5 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                Add Link
              </button>
            )}
          </div>
          
          <div className="space-y-4">
            {corporateLinks.map((link) => (
              <BusinessCard
                key={link.id}
                title={link.title}
                value={link.url}
                type="website"
                isEditing={isEditing}
                onEdit={() => addToast('info', `Edit ${link.title}`)}
                onDelete={() => addToast('info', `Delete ${link.title}`)}
                onGenerateQR={() => handleGenerateQR(link.url)}
              />
            ))}
          </div>
        </div>
      </div>

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

export default CorporateDashboard;