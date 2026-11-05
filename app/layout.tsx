import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import SmoothScroll from '@/components/smooth-scroll'
import { PageLoader } from '@/components/animations/PageLoader'
import { StructuredData } from '@/components/seo/StructuredData'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://surendravarikallu.dev'),
  title: 'Surendra Varikallu | Full Stack & AI Developer',
  description: 'Full Stack & AI Developer building scalable platforms like Skillnox.AI and Skillnox, load-tested with 5,000+ concurrent users at 100% success rate. Certified in AWS, SAP, and ServiceNow (CSA & CAD).',
  keywords: [
    'Surendra Varikallu',
    'Full Stack Developer',
    'AI Developer',
    'Skillnox',
    'Skillnox.AI',
    'KITAghire',
    'ServiceNow CSA',
    'ServiceNow CAD',
    'AWS Certified AI Practitioner',
    'SAP ABAP on HANA',
    'React Developer',
    'Next.js Portfolio',
    'Python Django Developer',
    'System Scalability',
  ],
  authors: [{ name: 'Surendra Varikallu', url: 'https://surendravarikallu.dev' }],
  creator: 'Surendra Varikallu',
  publisher: 'Surendra Varikallu',
  category: 'technology',
  alternates: {
    canonical: 'https://surendravarikallu.dev',
  },
  openGraph: {
    title: 'Surendra Varikallu | Full Stack & AI Developer',
    description: 'Full Stack & AI Developer building real-world platforms and scalable AI assessment engines like Skillnox.AI and Skillnox.',
    url: 'https://surendravarikallu.dev',
    siteName: 'Surendra Varikallu Portfolio',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/preview.png',
        width: 1200,
        height: 630,
        alt: 'Surendra Varikallu - Full Stack & AI Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Surendra Varikallu | Full Stack & AI Developer',
    description: 'Full Stack & AI Developer building scalable platforms like Skillnox.AI and Skillnox (5,000 VUs @ 100% success rate).',
    images: ['/preview.png'],
    creator: '@surendravarikallu',
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta name="google-site-verification" content="t2QA9FzpxfH7zBeYD5BFhypDt-chnwCMAIjYzotmdKg" />
        <StructuredData />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased selection:bg-cyan-500/30 selection:text-cyan-200 relative`}>
        <PageLoader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
