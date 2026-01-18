import type { Metadata } from 'next'
import SmoothScroll from '@/components/smooth-scroll'
import './globals.css'

export const metadata: Metadata = {
  title: 'Surendra Varikallu | Full Stack Developer',
  description: 'Portfolio of Surendra Varikallu, a Full Stack Developer specializing in React, Next.js, and AI.',
  generator: 'Surendra Varikallu',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
