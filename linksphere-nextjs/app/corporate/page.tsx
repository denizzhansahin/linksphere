"use client";
import React, { useEffect, useState } from 'react';
import { Mail, Globe, Phone, MapPin, Building, Edit, Save, PlusCircle, BarChart2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import BusinessCard from '../components/dashboard/BusinessCard';
import QRCodeModal from '../components/link/QRCodeModal';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CORPORATE_LINKS, UPDATE_KURUMSAL_LINK_MUTATION } from '../GraphQl/LinklerGraphQl';
import Modal from '../components/common/Modal';


import { useRouter } from 'next/navigation';


interface KurumsalLinkGuncelleDtoInput {
  isEpostasi?: string | null;
  isWebSitesi?: string | null;
  isyeriWebSitesi?: string | null;
  isYeriAdresi?: string | null;
  isTelefonu?: string | null;
  isYeriTelefon?: string | null;
  isYeriEposta?: string | null;

  isyeriLinkedin?: string | null;
  isyeriTwitter?: string | null;
  isyeriUrunKatalogu?: string | null;
  isyeriBasinKiti?: string | null;
  isyeriKariyerler?: string | null;
  isyeriAdi?: string | null;
}

const CorporateDashboard: React.FC = () => {
  const { addToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState('');

    const router = useRouter();
  

  const [formData, setFormData] = useState<KurumsalLinkGuncelleDtoInput>({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");

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


    

  const { data, loading, error, refetch } = useQuery(GET_CORPORATE_LINKS, {
    variables: { userId: user ? user.id : null },
    skip: !user?.id,
    fetchPolicy: 'cache-and-network',
  });

  console.log('GraphQL Data 1:', data?.kullaniciBul?.kurumsalLink)




  const [updateKurumsalselLink, { data: kurumsallLink, loading: khata, error: kserror }] = useMutation(UPDATE_KURUMSAL_LINK_MUTATION, {
    variables: { userId: user ? user.id : null },
  });

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingField) return;
    try {
      await updateKurumsalselLink({
        variables: {
          linkId: data?.kullaniciBul?.kurumsalLink.id,
          linkData: {
            [editingField]:
              editingField in formData && formData[editingField as keyof KurumsalLinkGuncelleDtoInput] !== null
                ? formData[editingField as keyof KurumsalLinkGuncelleDtoInput]
                : data?.kullaniciBul.kurumsallLink[editingField],
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




  const [corporateDetails, setCorporateDetails] = useState({
    isyeriAdi: '',
    isEpostasi: '',
    isWebSitesi: '',
    isyeriWebSitesi: '',
    isYeriAdresi: '',
    isTelefonu: '',
    isYeriTelefon: '',
    isYeriEposta: '',
  });

  useEffect(() => {
    if (data?.kullaniciBul?.kurumsalLink) {
      setCorporateDetails({
        isyeriAdi: data.kullaniciBul.kurumsalLink.isyeriAdi || '',
        isEpostasi: data.kullaniciBul.kurumsalLink.isEpostasi || '',
        isWebSitesi: data.kullaniciBul.kurumsalLink.isWebSitesi || '',
        isyeriWebSitesi: data.kullaniciBul.kurumsalLink.isyeriWebSitesi || '',
        isYeriAdresi: data.kullaniciBul.kurumsalLink.isYeriAdresi || '',
        isTelefonu: data.kullaniciBul.kurumsalLink.isTelefonu || '',
        isYeriTelefon: data.kullaniciBul.kurumsalLink.isYeriTelefon || '',
        isYeriEposta: data.kullaniciBul.kurumsalLink.isYeriEposta || '',
      });
    }
  }, [data]);

  useEffect(() => {
    if (data?.kullaniciBul?.kurumsalLink) {
      const link = data.kullaniciBul.kurumsalLink;
      setCorporateLinks([
        { id: 1, title: 'Company LinkedIn', url: link.isyeriLinkedin || '', field: 'isyeriLinkedin' },
        { id: 2, title: 'Corporate Twitter', url: link.isyeriTwitter || '', field: 'isyeriTwitter' },
        { id: 3, title: 'Product Catalog', url: link.isyeriUrunKatalogu || '', field: 'isyeriUrunKatalogu' },
        { id: 4, title: 'Press Kit', url: link.isyeriBasinKiti || '', field: 'isyeriBasinKiti' },
        { id: 5, title: 'Careers Page', url: link.isyeriKariyerler || '', field: 'isyeriKariyerler' },
      ]);
    }
  }, [data]);


  console.log('Ver', corporateDetails.isEpostasi)

  const [corporateLinks, setCorporateLinks] = useState([
    { id: 1, title: 'Company LinkedIn', url: data?.kullaniciBul?.kurumsalLink?.isyeriLinkedin, field: 'isyeriLinkedin' },
    { id: 2, title: 'Corporate Twitter', url: data?.kullaniciBul?.kurumsalLink?.isyeriTwitter, field: 'isyeriTwitter' },
    { id: 3, title: 'Product Catalog', url: data?.kullaniciBul?.kurumsalLink?.isyeriUrunKatalogu, field: 'isyeriUrunKatalogu' },
    { id: 4, title: 'Press Kit', url: data?.kullaniciBul?.kurumsalLink?.isyeriBasinKiti, field: 'isyeriBasinKiti' },
    { id: 5, title: 'Careers Page', url: data?.kullaniciBul?.kurumsalLink?.isyeriKariyerler, field: 'isyeriKariyerler' },
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
      addToast('success', 'Edit Mode Off!');
    }
  };

  const handleAddLink = () => {
    addToast('info', 'This feature will allow you to add a new corporate link');
  };

  const handleGenerateQR = (url: string) => {
    setSelectedUrl(url);
    setShowQRModal(true);
  };



  /*
  
      useEffect(() => {
        if (data && data.kullaniciBul?.kurumsallLink) {
          const link = data.kullaniciBul.kurumsallLink;
          setCorporateLinks([
            { id: 1, title: 'Company LinkedIn', url: link.isyeriLinkedin,field:'isyeriLinked ' },
            { id: 2, title: 'Corporate Twitter', url: link.isyeriTwitter, field:'isyeriTwitter' },
            { id: 3, title: 'Product Catalog', url: link.isyeriUrunKatalogu, field:'isyeriUrunKatalogu' },
            { id: 4, title: 'Press Kit', url: link.isyeriBasinKiti , field:'isyeriBasinKiti' },
            { id: 5, title: 'Careers Page', url: link.isyeriKariyerler , field:'isyeriKariyerler' },
          ]);
          setCorporateDetails(
            {
              isyeriAdi: link.isyeriAdi,
              isEpostasi: link.isEpostasi,
              isWebSitesi: link.isWebSitesi,
              isyeriWebSitesi: link.isyeriWebSitesi,
              isYeriAdresi: link.isYeriAdresi,
              isTelefonu: link.isTelefonu,
              isYeriTelefon: link.isYeriTelefon,
              isYeriEposta: link.isYeriEposta,
            }
          )
        }
      }, [data]);
  */

  const handleCardEdit = (field: string, currentValue: string | null) => {
    setEditingField(field);
    setEditingValue(currentValue || "");
    setFormData(prev => ({ ...prev, [field]: currentValue || "" }));
    setShowEditModal(true);
  };

  return (
    <div className="space-y-8 pt-14">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-800 dark:to-cyan-700 rounded-xl shadow-lg p-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Corporate Dashboard</h1>
            <p className="mt-2 opacity-90">Corporate Link Management Dashboard</p>
          </div>

          <div className="flex flex-col space-y-2">

          <button
            onClick={toggleEditMode}
            className={`px-4 py-2 rounded-md border border-white/30 backdrop-blur-sm transition-all ${isEditing
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
          <button
              onClick={() => handleGenerateQR(`http://34.136.43.55:3000/c/${user?.nickname}`)}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Information */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Company Information</h2>

          <BusinessCard
            title="Business Email"
            value={data?.kullaniciBul?.kurumsalLink?.isEpostasi ?? ''}
            type="email"
            isEditing={isEditing}
            onEdit={() => handleCardEdit('isEpostasi', data?.kullaniciBul?.kurumsalLink?.isEpostasi ?? null)}
            onDelete={() => addToast('info', 'Delete business email')}
            onGenerateQR={() => handleGenerateQR(`mailto:${corporateDetails.isEpostasi}`)}
          />

          <BusinessCard
            title="Company Name"
            value={data?.kullaniciBul?.kurumsalLink?.isyeriAdi ?? ''}
            type="company"
            isEditing={isEditing}
            onEdit={() => handleCardEdit('isyeriAdi', data?.kullaniciBul?.kurumsalLink?.isyeriAdi ?? null)}
            onDelete={() => addToast('info', 'Delete business email')}
            onGenerateQR={() => handleGenerateQR(`mailto:${corporateDetails.isyeriAdi}`)}
          />

          <BusinessCard
            title="Office Email"
            value={data?.kullaniciBul?.kurumsalLink?.isYeriEposta ?? ''}
            type="email"
            isEditing={isEditing}
            onEdit={() => handleCardEdit('isYeriEposta', corporateDetails.isYeriEposta ?? null)}
            onDelete={() => addToast('info', 'Delete office email')}
            onGenerateQR={() => handleGenerateQR(`mailto:${corporateDetails.isYeriEposta}`)}
          />

          <BusinessCard
            title="Business Website"
            value={data?.kullaniciBul?.kurumsalLink?.isWebSitesi ?? ''}
            type="website"
            isEditing={isEditing}
            onEdit={() => handleCardEdit('isWebSitesi', corporateDetails.isWebSitesi ?? null)}
            onDelete={() => addToast('info', 'Delete business website')}
            onGenerateQR={() => handleGenerateQR(corporateDetails.isWebSitesi ?? '')}
          />

          <BusinessCard
            title="Corporate Website"
            value={data?.kullaniciBul?.kurumsalLink?.isyeriWebSitesi ?? ''}
            type="website"
            isEditing={isEditing}
            onEdit={() => handleCardEdit('isyeriWebSitesi', corporateDetails.isyeriWebSitesi ?? null)}
            onDelete={() => addToast('info', 'Delete corporate website')}
            onGenerateQR={() => handleGenerateQR(corporateDetails.isyeriWebSitesi ?? '')}
          />

          <BusinessCard
            title="Office Address"
            value={data?.kullaniciBul?.kurumsalLink?.isYeriAdresi ?? ''}
            type="address"
            isEditing={isEditing}
            onEdit={() => handleCardEdit('isYeriAdresi', corporateDetails.isYeriAdresi ?? null)}
            onDelete={() => addToast('info', 'Delete office address')}
          />

          <BusinessCard
            title="Business Phone"
            value={data?.kullaniciBul?.kurumsalLink?.isTelefonu ?? ''}
            type="phone"
            isEditing={isEditing}
            onEdit={() => handleCardEdit('isTelefonu', corporateDetails.isTelefonu ?? null)}
            onDelete={() => addToast('info', 'Delete business phone')}
            onGenerateQR={() => handleGenerateQR(`tel:${corporateDetails.isTelefonu}`)}
          />

          <BusinessCard
            title="Office Phone"
            value={data?.kullaniciBul?.kurumsalLink?.isYeriTelefon ?? ''}
            type="phone"
            isEditing={isEditing}
            onEdit={() => handleCardEdit('isYeriTelefon', corporateDetails.isYeriTelefon ?? null)}
            onDelete={() => addToast('info', 'Delete office phone')}
            onGenerateQR={() => handleGenerateQR(`tel:${corporateDetails.isYeriTelefon}`)}

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
                value={link.url ?? ''}
                type="website"
                isEditing={isEditing}
                onEdit={() => handleCardEdit(link.field.replace(' ', ''), link.url ?? null)}
                onDelete={() => addToast('info', `Delete ${link.title}`)}
                onGenerateQR={() => handleGenerateQR(link.url ?? '')}
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
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Save
            </button>
          </form>
        </Modal>
      )}

    </div>
  );
};

export default CorporateDashboard;