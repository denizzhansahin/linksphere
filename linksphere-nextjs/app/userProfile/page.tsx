"use client";
import React, { useEffect, useState, useRef } from 'react';
import {
  UserCog, Save, Loader2,
  KeyRound, ShieldCheck, ImageUp, UserCircle, Trash2, Eye, EyeOff, AtSign, MapPin, Fingerprint
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '../context/ToastContext';
// import QRCodeModal from '../components/link/QRCodeModal'; // Yorum satırı
import { useMutation, gql } from '@apollo/client'; // gql import edildi
// import { UPDATE_USER_MUTATION } from '../GraphQl/KullaniciGraphQl'; // Yerine doğrudan tanımlayacağız

// GraphQL Mutation (doğrudan burada tanımlıyoruz, DTO'nuza uygun)
const UPDATE_USER_MUTATION = gql`
  mutation KullaniciGuncelle($kullaniciId: String!, $kullaniciGuncelleData: KullaniciGuncelleDto!) {
    kullaniciGuncelle(kullaniciId: $kullaniciId, kullaniciGuncelleData: $kullaniciGuncelleData) {
      id
      nickname
      isim
      soyisim
      eposta
      role
      ulke
      fotograf
      # createdAt ve updatedAt gibi alanlar genellikle otomatik güncellenir, frontend'de çok gerekmezse kaldırılabilir.
      # guncellemeTarihi # Bu updatedAt ile aynı olabilir, şemanıza bağlı
    }
  }
`;

const PersonalDashboard: React.FC = () => {
  const { addToast } = useToast();
  const [user, setUser] = useState<any>(null);

  const router = useRouter();

  
  const [userFormData, setUserFormData] = useState({
    isim: '',
    soyisim: '',
    nickname: '',
    eposta: '', // E-posta formda gösterilecek ama güncellenmesine izin verilmeyebilir (genellikle ayrı bir doğrulama süreci gerektirir)
    sifre: '', // Bu YENİ şifre olacak
    ulke: '',
    fotograf: '', // Base64 string
  });
  
  // Mevcut şifre doğrulaması için ayrı state
  const [mevcutSifreDogrulama, setMevcutSifreDogrulama] = useState('');

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showMevcutSifre, setShowMevcutSifre] = useState(false);
  const [showYeniSifre, setShowYeniSifre] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false); // Genel yükleme durumu (doğrulama + güncelleme)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserString = localStorage.getItem('user');
      if (storedUserString) {
        try {
          const storedUser = JSON.parse(storedUserString);
          setUser(storedUser);
          setUserFormData({
            isim: storedUser.isim || '',
            soyisim: storedUser.soyisim || '',
            nickname: storedUser.nickname || '',
            eposta: storedUser.eposta || '', // E-postayı formda göster
            sifre: '', // Yeni şifre alanı başlangıçta boş
            ulke: storedUser.ulke || '',
            fotograf: storedUser.fotograf || '',
          });
          if (storedUser.fotograf) {
            setPreviewImage(storedUser.fotograf);
          }
        } catch (error) {
          console.error("Failed to parse user from localStorage:", error);
          addToast('error', 'Could not read user data.');
        }
      } else {
        router.push('/login');
      }
    }
  }, [addToast]);


  const [updateUserMutation, { loading: updatingUserGraphQL, error: updateGraphQLError }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: (data) => {
      addToast('success', 'User information updated successfully!');
      if (user && data.kullaniciGuncelle) {
        const updatedBackendData = data.kullaniciGuncelle;
        // ÖNEMLİ: Backend'den dönen güncel verilerle localStorage ve user state'ini güncelle
        const updatedUserForStorage = {
          ...user, // Mevcut user'dan token gibi diğer bilgileri koru
          id: updatedBackendData.id,
          isim: updatedBackendData.isim,
          soyisim: updatedBackendData.soyisim,
          nickname: updatedBackendData.nickname,
          eposta: updatedBackendData.eposta,
          ulke: updatedBackendData.ulke,
          fotograf: updatedBackendData.fotograf, // Backend'den fotoğraf URL/base64'i geliyorsa
          role: updatedBackendData.role,
        };
        localStorage.setItem('user', JSON.stringify(updatedUserForStorage));
        setUser(updatedUserForStorage);
        
        // Formdaki şifre alanlarını ve mevcut şifre doğrulama alanını temizle
        setUserFormData(prev => ({ ...prev, sifre: '' }));
        setMevcutSifreDogrulama('');
        if (updatedBackendData.fotograf) {
          setPreviewImage(updatedBackendData.fotograf);
        }
      }
      setIsSubmitting(false);
    },
    onError: (err) => {
      addToast('error', `GraphQL Update Error: ${err.message}`);
      console.error("Update user GraphQL error:", err);
      setIsSubmitting(false);
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // Dosya boyutu kontrolü (örneğin 2MB)
      if (file.size > 1 * 512 * 512) {
          addToast('error', 'File size cannot exceed 1MB.');
          return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setUserFormData(prev => ({ ...prev, fotograf: base64String }));
        setPreviewImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const removeProfileImage = () => {
    setUserFormData(prev => ({ ...prev, fotograf: '' }));
    setPreviewImage(null);
    addToast('info', 'Profile photo has been removed. Don\'t forget to save changes.');
  };

  const handleUserUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.id || !user.eposta) {
      addToast('error', 'User information is incomplete. Please log in again.');
      return;
    }

    if (!mevcutSifreDogrulama) {
      addToast('warning', 'You must enter your current password to confirm the changes.');
      return;
    }

    // Yeni şifre girilmişse ve 6 karakterden kısaysa uyarı
    if (userFormData.sifre && userFormData.sifre.length < 6) {
      addToast('warning', 'The new password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Adım: Mevcut şifreyi REST API ile doğrula
      const response = await fetch('http://34.136.43.55:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.eposta, // localStorage'dan alınan kullanıcının e-postası
          password: mevcutSifreDogrulama,
        }),
      });

      if (!response.ok) {
        // Genellikle 401 Unauthorized döner
        const errorData = await response.json().catch(() => ({ message: 'Unknown verification error.' }));
        addToast('error', `Current password is incorrect or verification failed: ${errorData.message || response.statusText}`);
        setIsSubmitting(false);
        return;
      }
      
      // REST API'den başarılı yanıt alındı, token vs. burada kullanılabilir ama şimdilik sadece başarıyı kontrol ediyoruz.
      // const loginData = await response.json(); 
      // console.log("Password verification successful:", loginData);


      // 2. Adım: Şifre doğrulandıysa, GraphQL mutation'ını çalıştır
      const guncelleData: any = {
        isim: userFormData.isim,
        soyisim: userFormData.soyisim,
        nickname: userFormData.nickname,
        // E-posta genellikle bu şekilde güncellenmez, backend'de ayrı bir akış olabilir.
        // Eğer DTO'nuzda eposta varsa ve güncellemek istiyorsanız ekleyebilirsiniz.
        // eposta: userFormData.eposta, 
        ulke: userFormData.ulke || null, // DTO'da optional ise boş string yerine null göndermek daha iyi olabilir.
        fotograf: userFormData.fotograf || null, // Aynı şekilde fotoğraf için de
      };

      // Sadece YENİ şifre girilmişse 'sifre' alanını ekle
      if (userFormData.sifre) {
        guncelleData.sifre = userFormData.sifre;
      }
      // 'role' alanı DTO'nuzda var ama formda yok, bu yüzden göndermiyoruz.
      // Eğer backend'de bu alan zorunlu değilse sorun olmaz.

      await updateUserMutation({
        variables: {
          kullaniciId: user.id,
          kullaniciGuncelleData: guncelleData,
        },
      });

    } catch (error: any) {
      // Bu genellikle fetch network hatası için
      addToast('error', `An error occurred: ${error.message}`);
      console.error("Error during update process:", error);
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <Loader2 className="h-12 w-12 animate-spin text-pink-500" />
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">Loading user information...</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800 py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-10 p-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 dark:from-pink-700 dark:via-purple-700 dark:to-indigo-800 rounded-xl shadow-2xl text-white">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="text-center sm:text-left">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">My Panel</h1>
                <p className="mt-1 sm:mt-2 opacity-80 text-sm sm:text-base">
                  Manage your profile information and settings here.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 relative group">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profil Fotoğrafı"
                    className="h-20 w-20 object-cover rounded-full border-4 border-white/50 group-hover:border-white transition-all duration-300 shadow-lg"
                  />
                ) : (
                  <UserCircle className="h-20 w-20 text-white/50 group-hover:text-white transition-all duration-300" />
                )}
                 <div 
                    className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                    onClick={triggerFileInputClick}
                    title="Fotoğrafı değiştirmek için tıklayın"
                >
                    <ImageUp className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </header>

          <main className="bg-white dark:bg-gray-800/50 backdrop-blur-md shadow-xl rounded-lg p-6 sm:p-10">
            <form onSubmit={handleUserUpdate} className="space-y-10">
              
              <fieldset className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <legend className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                  <UserCircle className="mr-2 h-6 w-6 text-indigo-500" /> Profile Photo
                </legend>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {previewImage ? (
                    <img src={previewImage} alt="Profil Önizleme" className="h-28 w-28 object-cover rounded-full shadow-md border-2 border-gray-200 dark:border-gray-600" />
                  ) : (
                    <div className="h-28 w-28 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                      <UserCircle strokeWidth={1} className="h-16 w-16" />
                    </div>
                  )}
                  <div className="flex-grow space-y-3">
                    <input type="file" id="fotograf-input" name="fotograf-input" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} ref={fileInputRef} className="hidden"/>
                    <button type="button" onClick={triggerFileInputClick} className="w-full sm:w-auto flex items-center justify-center px-4 py-2.5 border border-indigo-500 text-indigo-500 dark:border-indigo-400 dark:text-indigo-400 rounded-md text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors">
                      <ImageUp className="mr-2 h-5 w-5" /> Change Photo
                    </button>
                    {previewImage && (
                        <button type="button" onClick={removeProfileImage} className="w-full sm:w-auto flex items-center justify-center px-4 py-2.5 border border-red-500 text-red-500 dark:border-red-400 dark:text-red-400 rounded-md text-sm font-medium hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                          <Trash2 className="mr-2 h-5 w-5" /> Remove Photo
                        </button>
                    )}
                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, WEBP (Max 1MB). 1:1 square image for best result.</p>
                  </div>
                </div>
              </fieldset>

              <fieldset className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <legend className="text-lg font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                  <UserCog className="mr-2 h-6 w-6 text-pink-500" /> Personal Information
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                  <div>
                    <label htmlFor="isim" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                    <div className="relative"><div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><UserCircle className="h-5 w-5 text-gray-400" /></div>
                      <input type="text" name="isim" id="isim" value={userFormData.isim} onChange={handleInputChange} placeholder="Adınız" className="form-input pl-10" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="soyisim" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Surname</label>
                     <div className="relative"><div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><UserCircle className="h-5 w-5 text-gray-400" /></div>
                        <input type="text" name="soyisim" id="soyisim" value={userFormData.soyisim} onChange={handleInputChange} placeholder="Soyadınız" className="form-input pl-10" />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nickname</label>
                    <div className="relative"><div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><AtSign className="h-5 w-5 text-gray-400" /></div>
                        <input type="text" name="nickname" id="nickname" value={userFormData.nickname} onChange={handleInputChange} placeholder="benzersiz_kullanici_adiniz" className="form-input pl-10" />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="eposta" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email (Cannot be changed)</label>
                    <div className="relative"><div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><AtSign className="h-5 w-5 text-gray-400" /></div>
                        <input type="email" name="eposta" id="eposta" value={userFormData.eposta} readOnly placeholder="eposta@adresiniz.com" className="form-input pl-10 bg-gray-100 dark:bg-gray-700 cursor-not-allowed" />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="ulke" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country</label>
                     <div className="relative"><div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><MapPin className="h-5 w-5 text-gray-400" /></div>
                        <input type="text" name="ulke" id="ulke" value={userFormData.ulke} onChange={handleInputChange} placeholder="Yaşadığınız Ülke" className="form-input pl-10" />
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <legend className="text-lg font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                  <ShieldCheck className="mr-2 h-6 w-6 text-green-500" /> Security and Password Confirmation
                </legend>
                <div className="space-y-6">
                  <div> {/* Mevcut Şifre (Doğrulama İçin) */}
                    <label htmlFor="mevcutSifreDogrulama" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password (For Confirmation)</label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><KeyRound className="h-5 w-5 text-gray-400" /></div>
                        <input 
                            type={showMevcutSifre ? "text" : "password"} 
                            name="mevcutSifreDogrulama" 
                            id="mevcutSifreDogrulama" 
                            value={mevcutSifreDogrulama} 
                            onChange={(e) => setMevcutSifreDogrulama(e.target.value)} 
                            placeholder="Değişiklikleri onaylamak için şifreniz"
                            className="form-input pl-10 pr-10" 
                            required // Bu alan zorunlu
                        />
                        <button type="button" onClick={() => setShowMevcutSifre(!showMevcutSifre)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            {showMevcutSifre ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                        </button>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">To change any information, you must enter your current password.</p>
                  </div>
                  <div> {/* Yeni Şifre */}
                    <label htmlFor="sifre" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password (Optional)</label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><Fingerprint className="h-5 w-5 text-gray-400" /></div>
                        <input 
                            type={showYeniSifre ? "text" : "password"} 
                            name="sifre" // Bu userFormData.sifre'yi günceller
                            id="sifre" 
                            value={userFormData.sifre} 
                            onChange={handleInputChange} 
                            placeholder="Yeni şifreniz (en az 6 karakter)"
                            className="form-input pl-10 pr-10" 
                        />
                        <button type="button" onClick={() => setShowYeniSifre(!showYeniSifre)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            {showYeniSifre ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                        </button>
                    </div>
                     <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">If you do not want to change your password, leave this field blank.</p>
                  </div>
                </div>
              </fieldset>

              <div className="pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || updatingUserGraphQL}
                  className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-pink-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 ease-in-out group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                      {updatingUserGraphQL ? 'Güncelleniyor...' : 'Doğrulanıyor...'}
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                     Save Changes
                    </>
                  )}
                </button>
              </div>
              {updateGraphQLError && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 text-center">
                  GraphQL Eroor: {updateGraphQLError.message}
                </p>
              )}
            </form>
          </main>
        </div>
      </div>
           {/* Genel CSS Stilleri (tailwind.config.js veya global CSS dosyanıza eklenebilir) */}
           <style jsx global>{`
        .form-input {
          display: block;
          width: 100%;
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
          padding-left: 2.5rem; /* İkon için boşluk */
          padding-right: 0.75rem;
          font-size: 0.875rem; /* sm */
          line-height: 1.25rem;
          color: #1f2937; /* gray-800 */
          background-color: #f9fafb; /* gray-50 */
          border: 1px solid #d1d5db; /* gray-300 */
          border-radius: 0.375rem; /* md */
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* sm */
          transition-property: border-color, box-shadow;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
        }
        .dark .form-input {
          color: #d1d5db; /* dark:text-gray-300 */
          background-color: #374151; /* dark:bg-gray-700 */
          border-color: #4b5563; /* dark:border-gray-600 */
        }
        .form-input:focus {
          outline: 2px solid transparent;
          outline-offset: 2px;
          border-color: #ec4899; /* pink-500 */
          box-shadow: 0 0 0 2px #ec4899; /* ring-pink-500 */
        }
        .dark .form-input:focus {
          border-color: #f472b6; /* dark:focus:border-pink-400 */
          box-shadow: 0 0 0 2px #f472b6; /* dark:focus:ring-pink-400 */
        }
        .form-input::placeholder {
          color: #9ca3af; /* placeholder-gray-400 */
        }
        .dark .form-input::placeholder {
          color: #6b7280; /* dark:placeholder-gray-500 */
        }
      `}</style>
    </>
    
  );
};

export default PersonalDashboard;