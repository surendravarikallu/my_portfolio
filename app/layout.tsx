import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SmoothScroll from '@/components/smooth-scroll'
import { PageLoader } from '@/components/animations/PageLoader'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Surendra Varikallu | Full Stack Developer',
  description: 'Full Stack Developer building scalable platforms like Skillnox, a secure assessment system used by 250+ students.',
  generator: 'Surendra Varikallu',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Surendra Varikallu | Full Stack Developer',
    description: 'Full Stack Developer building scalable platforms like Skillnox, a secure assessment system used by 250+ students.',
    url: 'https://surendravarikallu.dev',
    siteName: 'Surendra Varikallu Portfolio',
    images: [{ url: 'https://surendravarikallu.dev/profile-pic.png', width: 1200, height: 630, alt: 'Surendra Varikallu – Full Stack Developer' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Surendra Varikallu | Full Stack Developer',
    description: 'Full Stack Developer building scalable platforms like Skillnox, a secure assessment system used by 250+ students.',
    images: ['https://surendravarikallu.dev/profile-pic.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased selection:bg-cyan-500/30 selection:text-cyan-200 relative`}>
        <PageLoader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
