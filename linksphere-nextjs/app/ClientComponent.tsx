// ClientComponent.tsx
"use client";

import React, { useEffect } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache, split } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';
import { setContext } from '@apollo/client/link/context';
import { Operation } from '@apollo/client';

import { Provider, useDispatch } from "react-redux";
import { store } from './store'
import { setKullanici } from "./redux/kullaniciGirisSlice";
import { ToastProvider } from "./context/ToastContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// GraphQL sunucunuzun URL'si
const httpLink = new HttpLink({
  uri: 'http://34.136.43.55:5000/graphql'
});

// Token'ı header'a ekleyen middleware (sadece token varsa)
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      ...(token && { Authorization: `Bearer ${token}` }), // Token varsa ekle
    }
  };
});

// Public operasyonları belirle (örneğin: kullaniciOlustur)
const isPublicOperation = (operation: Operation) => {
  console.log('Operation Name:', operation.operationName)
  const publicOperations = ['kullaniciOlustur', 'login']; // Public operasyon adlarını ekleyin
  return publicOperations.includes(operation.operationName);
};

// Split link: Public operasyonlarda authLink'i atla
const splitLink = split(
  isPublicOperation,
  httpLink, // Public isteklerde direkt httpLink kullan
  authLink.concat(httpLink) // Diğerlerinde authLink ekle
);

// Apollo Client yapılandırması
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});


function ReduxInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Parsed User:", parsedUser);
        dispatch(setKullanici(parsedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
      }
    }
  }, [dispatch]);

  return <>{children}</>;
}

export default function ClientComponent({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ReduxInitializer>
          <ToastProvider>
            <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
              <Navbar />
              <main className="flex-grow mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
                {children}
              </main>
              <Footer />
            </div>
          </ToastProvider>
        </ReduxInitializer>
      </ApolloProvider>
    </Provider>
  );
}