import type { Metadata, Viewport } from 'next';
import { Source_Sans_3 } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';

const GA_MEASUREMENT_ID = 'G-7X1DKWM6TN';

const sourceSans3 = Source_Sans_3({
  variable: '--font-source-sans-3',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nutrisys.my.id';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'NutriSys - AI Powered Health & Wellness Platform',
    template: '%s - NutriSys',
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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NutriSys - AI-Powered Health & Wellness Platform',
    description:
      'Transform your health journey with AI-powered nutrition tracking, food analysis, and personalized wellness insights.',
    creator: '@nutrisys',
    site: '@nutrisys',
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
  manifest: '/manifest.json',
  category: 'health',
  classification: 'Health & Fitness',
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: '/icon/favicon.ico',
    shortcut: '/icon/favicon_16x16.ico',
    apple: '/icon/favicon_192x192.ico',
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
      <body className={sourceSans3.className}>
        {/* Google Analytics */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'NutriSys',
              url: 'https://www.nutrisys.my.id/',
              alternateName: ['NutriSys AI', 'NutriSys Platform'],
            }),
          }}
        />

        {children}
        <Analytics />
      </body>
    </html>
  );
}
