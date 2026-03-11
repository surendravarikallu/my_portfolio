import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SmoothScroll from '@/components/smooth-scroll'
import { PageLoader } from '@/components/animations/PageLoader'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Surendra Varikallu | Full Stack Developer',
  description: 'Portfolio of Surendra Varikallu, a Full Stack Developer specializing in React, Next.js, and AI.',
  generator: 'Surendra Varikallu',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Surendra Varikallu | Full Stack Developer',
    description: 'Immersive 3D portfolio showcasing full-stack development expertise with React, Next.js, and AI.',
    url: 'https://surendravarikallu.vercel.app',
    siteName: 'Surendra Varikallu Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Surendra Varikallu | Full Stack Developer',
    description: 'Immersive 3D portfolio showcasing full-stack development expertise.',
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
