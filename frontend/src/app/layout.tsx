'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { Header } from '@/components/Layout/Header';
import { useOrganizations } from '@/hooks/useOrganizations';
import { ErrorPage } from '@/components/ui/error-page';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { error } = useOrganizations();

  if (error) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <ErrorPage 
            message="Error de conexión" 
            description="No se pudo establecer conexión con el servidor. Por favor, verifica tu conexión e intenta nuevamente."
          />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
} 