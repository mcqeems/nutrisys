import type { Metadata, Viewport } from 'next';
import { Source_Sans_3 } from 'next/font/google';
import './globals.css';

const sourceSans3 = Source_Sans_3({
  variable: '--font-source-sans-3',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nutrisys.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'NutriSys - AI-Powered Health & Wellness Platform',
    template: '%s | NutriSys',
  },
  description:
    'NutriSys is an AI-powered health and wellness platform that helps you track nutrition, analyze food, and achieve your health goals with personalized insights.',
  keywords: [
    'nutrition',
    'health',
    'wellness',
    'AI',
    'food tracking',
    'diet',
    'meal planning',
    'calorie counter',
    'health analytics',
    'fitness',
    'nutrition analysis',
    'healthy lifestyle',
  ],
  authors: [{ name: 'NutriSys Team' }],
  creator: 'NutriSys',
  publisher: 'NutriSys',
  applicationName: 'NutriSys',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'NutriSys',
    title: 'NutriSys - AI-Powered Health & Wellness Platform',
    description:
      'Transform your health journey with AI-powered nutrition tracking, food analysis, and personalized wellness insights.',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'NutriSys - AI-Powered Health & Wellness Platform',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NutriSys - AI-Powered Health & Wellness Platform',
    description:
      'Transform your health journey with AI-powered nutrition tracking, food analysis, and personalized wellness insights.',
    images: ['/opengraph-image.png'],
    creator: '@nutrisys',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [{ url: '/Logo/logo_raw.png', type: 'image/png' }],
    apple: [{ url: '/Logo/logo_raw.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.json',
  category: 'health',
  classification: 'Health & Fitness',
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'light dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={sourceSans3.className}>{children}</body>
    </html>
  );
}
