import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SmoothScroll from '@/components/smooth-scroll'
import { PageLoader } from '@/components/animations/PageLoader'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://surendravarikallu.dev'),
  title: 'Surendra Varikallu | Full Stack Developer',
  description: 'Full Stack Developer building scalable platforms like Skillnox, a secure assessment system used by 250+ students.',
  alternates: {
    canonical: 'https://surendravarikallu.dev',
  },
  openGraph: {
    title: 'Surendra Varikallu Portfolio',
    description: 'Full Stack Developer building real-world systems and scalable platforms',
    url: 'https://surendravarikallu.dev',
    siteName: 'Surendra Portfolio',
    type: 'website',
    images: [
      {
        url: '/preview.png',
        width: 1200,
        height: 630,
        alt: 'Surendra Varikallu - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Surendra Varikallu Portfolio',
    description: 'Full Stack Developer building scalable platforms',
    images: ['/preview.png'],
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
    <html lang="en" className="dark">
      <head>
        <meta name="google-site-verification" content="t2QA9FzpxfH7zBeYD5BFhypDt-chnwCMAIjYzotmdKg" />
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
