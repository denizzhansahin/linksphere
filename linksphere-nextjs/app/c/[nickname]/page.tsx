"use client";
import React, { useState, useEffect } from 'react';
import { PlusCircle, UserCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import BusinessCard from '../../components/dashboard/BusinessCard';
import QRCodeModal from '../../components/link/QRCodeModal';
import { useParams } from 'react-router-dom';


import { useQuery } from '@apollo/client';
import { GET_KURUMSAL_LINK } from '@/app/GraphQl/LinklerGraphQl';

interface Props {
  params: Promise<{ nickname: string }>; // or as appropriate
}


const UserCorporateDashboard = ({ params }: Props) => {
  const { nickname } = React.use(params);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { data, loading, error, refetch } = useQuery(GET_KURUMSAL_LINK, {
    variables: { userNickname: nickname ? nickname : null },
    skip: !nickname,
    fetchPolicy: 'cache-and-network',
  });

  console.log('GraphQL Data 1:', data);


  const { addToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState('');

  const [corporateDetails, setCorporateDetails] = useState({
    companyName: '',
    email: '',
    website: '',
    businessWebsite: '',
    officeAddress: '',
    phone: '',
    officePhone: '',
    officeEmail: '',
  });

  interface CorporateLink {
    id: number;
    title: string;
    url: string;
    field: string;
  }

  const [corporateLinks, setCorporateLinks] = useState<CorporateLink[]>([]);

  useEffect(() => {
    if (data?.kullaniciBul_profil?.kurumsalLink) {
      const link = data.kullaniciBul_profil.kurumsalLink;

      if (data.kullaniciBul_profil?.fotograf) {
        setPreviewImage(data.kullaniciBul_profil?.fotograf);
      }


      setCorporateDetails({
        companyName: link.isyeriAdi || '',
        email: link.isEpostasi || '',
        website: link.isWebSitesi || '',
        businessWebsite: link.isyeriWebSitesi || '',
        officeAddress: link.isYeriAdresi || '',
        phone: link.isTelefonu || '',
        officePhone: link.isYeriTelefon || '',
        officeEmail: link.isYeriEposta || '',
      });
      setCorporateLinks([
        { id: 1, title: 'Company LinkedIn', url: link.isyeriLinkedin || '', field: 'isyeriLinkedin' },
        { id: 2, title: 'Corporate Twitter', url: link.isyeriTwitter || '', field: 'isyeriTwitter' },
        { id: 3, title: 'Product Catalog', url: link.isyeriUrunKatalogu || '', field: 'isyeriUrunKatalogu' },
        { id: 4, title: 'Press Kit', url: link.isyeriBasinKiti || '', field: 'isyeriBasinKiti' },
        { id: 5, title: 'Careers Page', url: link.isyeriKariyerler || '', field: 'isyeriKariyerler' },
      ]);
    }
  }, [data]);


  console.log('Corporate Details:', corporateDetails);
  console.log('Corporate Links:', corporateLinks);

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
            <h1 className="text-3xl font-bold">{data?.kullaniciBul_profil?.isim} {data?.kullaniciBul_profil?.soyisim}  @{nickname}</h1>
            <p className="mt-2 opacity-90">
              {data?.kullaniciBul_profil?.kurumsalLink?.isyeriAdi}
            </p>
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
              onClick={() => handleGenerateQR(`http://34.136.43.55:3000/c/${data?.kullaniciBul_profil?.nickname}`)}
              className={`mt-4 px-4 py-2 rounded-md border border-white/30 backdrop-blur-sm transition-all 
                         bg-white/10 hover:bg-white/20
                        }`}
            >
              Share Me
            </button>
          </div>


        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Information */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Company Information</h2>

          <BusinessCard
            title="Business Email"
            value={data?.kullaniciBul_profil?.kurumsalLink?.isEpostasi}
            type="email"
            isEditing={false}
            onEdit={() => addToast('info', 'Edit business email')}
            onDelete={() => addToast('info', 'Delete business email')}
            onGenerateQR={() => handleGenerateQR(`mailto:${data?.kullaniciBul_profil?.kurumsalLink?.isEpostasi}`)}
          />

          <BusinessCard
            title="Office Email"
            value={data?.kullaniciBul_profil?.kurumsalLink?.isYeriEposta}
            type="email"
            isEditing={false}
            onEdit={() => addToast('info', 'Edit office email')}
            onDelete={() => addToast('info', 'Delete office email')}
            onGenerateQR={() => handleGenerateQR(`mailto:${data?.kullaniciBul_profil?.kurumsalLink?.isYeriEposta}`)}
          />

          <BusinessCard
            title="Business Website"
            value={data?.kullaniciBul_profil?.kurumsalLink?.isWebSitesi}
            type="website"
            isEditing={false}
            onEdit={() => addToast('info', 'Edit business website')}
            onDelete={() => addToast('info', 'Delete business website')}
            onGenerateQR={() => handleGenerateQR(data?.kullaniciBul_profil?.kurumsalLink?.isWebSitesi)}
          />

          <BusinessCard
            title="Corporate Website"
            value={data?.kullaniciBul_profil?.kurumsalLink?.isyeriWebSitesi}
            type="website"
            isEditing={false}
            onEdit={() => addToast('info', 'Edit corporate website')}
            onDelete={() => addToast('info', 'Delete corporate website')}
            onGenerateQR={() => handleGenerateQR(data?.kullaniciBul_profil?.kurumsalLink?.isyeriWebSitesi)}
          />

          <BusinessCard
            title="Office Address"
            value={data?.kullaniciBul_profil?.kurumsalLink?.isYeriAdresi}
            type="address"
            isEditing={false}
            onEdit={() => addToast('info', 'Edit office address')}
            onDelete={() => addToast('info', 'Delete office address')}
          />

          <BusinessCard
            title="Business Phone"
            value={data?.kullaniciBul_profil?.kurumsalLink?.isTelefonu}
            type="phone"
            isEditing={false}
            onEdit={() => addToast('info', 'Edit business phone')}
            onDelete={() => addToast('info', 'Delete business phone')}
            onGenerateQR={() => handleGenerateQR(`tel:${data?.kullaniciBul_profil?.kurumsalLink?.isTelefonu}`)}
          />

          <BusinessCard
            title="Office Phone"
            value={data?.kullaniciBul_profil?.kurumsalLink?.isYeriTelefon}
            type="phone"
            isEditing={false}
            onEdit={() => addToast('info', 'Edit office phone')}
            onDelete={() => addToast('info', 'Delete office phone')}
            onGenerateQR={() => handleGenerateQR(`tel:${data?.kullaniciBul_profil?.kurumsalLink?.isYeriTelefon}`)}

          />
        </div>

        {/* Corporate Links */}
        <div className="lg:col-span-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Corporate Links</h2>

          </div>

          <div className="space-y-4">
            {corporateLinks.map((link) => (
              <BusinessCard
                key={link.id}
                title={link.title}
                value={link.url}
                type="website"
                isEditing={false}
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

export default UserCorporateDashboard;