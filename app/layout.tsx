import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from './context/AuthContext';
import QueryProvider from './providers/QueryProvider';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import StructuredData from '@/components/StructuredData';

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Sendir - Tu Plataforma de Tareas Universitarias",
    template: "%s | Sendir"
  },
  description: "Sendir es la plataforma líder para estudiantes universitarios. Gestiona tus tareas, mantén sincronización con tu universidad y mejora tu productividad académica. Accede a todas tus tareas en un solo lugar.",
  keywords: [
    "tareas universitarias",
    "gestión de tareas",
    "plataforma estudiantil",
    "organización académica",
    "sincronización universitaria",
    "productividad estudiantil",
    "tareas escolares",
    "calendario académico",
    "notificaciones de tareas",
    "universidad digital"
  ],
  authors: [{ name: "Sendir Team" }],
  creator: "Sendir",
  publisher: "Sendir",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sendir.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://sendir.app',
    siteName: 'Sendir',
    title: 'Sendir - Tu Plataforma de Tareas Universitarias',
    description: 'Gestiona tus tareas universitarias de manera eficiente. Sincronización automática con tu universidad, notificaciones inteligentes y organización perfecta.',
    images: [
      {
        url: '/sendir-icon.png',
        width: 512,
        height: 512,
        alt: 'Sendir - Plataforma de Tareas Universitarias',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sendir - Tu Plataforma de Tareas Universitarias',
    description: 'Gestiona tus tareas universitarias de manera eficiente. Sincronización automática con tu universidad.',
    images: ['/sendir-icon.png'],
    creator: '@sendir_app',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#2C9AB0',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.className}>
      <head>
        <link rel="icon" href="/sendir-icon.png" />
        <link rel="apple-touch-icon" href="/sendir-icon.png" />
        <meta name="theme-color" content="#2C9AB0" />
      </head>
      <body
        style={{ backgroundColor: '#E9F1FA' }}
        className="antialiased"
      >
        <StructuredData />
        <GoogleAnalytics />
        <QueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
