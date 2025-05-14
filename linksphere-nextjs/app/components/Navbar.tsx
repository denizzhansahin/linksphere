"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, Link as LinkIcon } from "lucide-react";

import { useRouter } from 'next/navigation';


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const router = useRouter();


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userNickname, setUserNickname] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false); // Route değiştiğinde mobil menüyü kapat
  }, [pathname]);

  useEffect(() => {
    // localStorage sadece client tarafında erişilebilir
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      
      setIsLoggedIn(!!token);

      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUserNickname(userData.nickname || null);
        } catch (e) {
          console.error("localStorage'dan kullanıcı verisi okunurken hata oluştu:", e);
          setUserNickname(null);
        }
      } else {
        setUserNickname(null);
      }
    }
  }, [pathname]); // pathname değiştiğinde de kontrol et (örneğin login sonrası)

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUserNickname(null);
      setIsOpen(false); // Mobil menüyü de kapat
      // İsteğe bağlı: Kullanıcıyı ana sayfaya yönlendir
      router.push('/'); 
    }
  };

  const generateNavLinks = () => {
    const baseLinks = [
      { name: "Home", path: "/" },
    ];

    if (isLoggedIn) {
      return [
        ...baseLinks,
        { name: "User Profile", path:  "/userProfile" },
        { name: "Personal Dashboard", path:  "/personal" },
        { name: "Corporate Dashboard", path:  "/corporate" },
        // Logout için ayrı bir buton olacak, link listesinde değil
      ];
    } else {
      return [
        ...baseLinks,
        { name: "Login", path: "/login" },
        { name: "Register", path: "/register" },
      ];
    }
  };

  const navLinksToDisplay = generateNavLinks();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        // Mobil menü açıkken de blur efekti olması için isOpen kontrolü eklendi
        isScrolled || isOpen 
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-indigo-600 dark:text-indigo-400"
            >
              <LinkIcon className="h-6 w-6" />
              <span>LinkSphere</span>
            </Link>
          </div>

          {/* Desktop Menu & Actions */}
          <div className="hidden md:flex md:items-center">
            {/* Linkler için container */}
            <div className="md:space-x-8 flex items-center">
              {navLinksToDisplay.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${
                    pathname === link.path
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  // Logout butonunu diğer linklerle aynı hizada ve stilde tutmak için benzer class'lar.
                  // Farklı bir stil isterseniz burayı değiştirebilirsiniz.
                  className="text-sm font-medium transition-colors text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 ml-8" // Diğer linklerden ayırmak için ml-8
                >
                  Logout
                </button>
              )}
            </div>

          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex items-center md:hidden">
            {/* Tema Değiştirme Butonu (Mobile) */}

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" // Orijinal stil
              aria-expanded={isOpen}
              aria-controls="mobile-menu-content" // Erişilebilirlik için
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        id="mobile-menu-content" // aria-controls ile eşleşen id
        // Açılıp kapanma animasyonu için transform eklenebilir, ama görseli değiştirmemek adına basit block/hidden
        className={`md:hidden ${isOpen ? "block" : "hidden"}`}
      >
        {/* Mobil menü açıldığında arka plan ve gölge orijinaldeki gibi */}
        <div className="px-2 pt-2 pb-4 space-y-1 bg-white dark:bg-gray-800 shadow-lg rounded-b-lg">
          {navLinksToDisplay.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsOpen(false)} // Linke tıklayınca menüyü kapat
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === link.path
                  ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {isLoggedIn && (
             <button
                onClick={handleLogout}
                // Mobil menüdeki diğer linklerle benzer bir görünüm için
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-red-600 dark:hover:text-red-400"
             >
                Logout
             </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;