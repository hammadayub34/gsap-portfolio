import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Your Name | Creative Developer & Designer',
  description: 'Portfolio of a creative developer specializing in elegant, high-performance web experiences. Expertise in React, Next.js, and modern web technologies.',
  keywords: [
    'portfolio',
    'web developer',
    'creative developer',
    'full-stack',
    'Next.js',
    'React',
    'TypeScript',
    'UI/UX design',
    'frontend development',
    'web design'
  ],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourwebsite.com',
    siteName: 'Your Name Portfolio',
    title: 'Your Name | Creative Developer & Designer',
    description: 'Portfolio showcasing elegant web experiences and creative development work',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Your Name Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Name | Creative Developer',
    description: 'Portfolio of creative development work',
    creator: '@yourusername',
    images: ['/og-image.jpg'],
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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0d0d0d' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased">
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-gold focus:text-obsidian focus:font-bold"
        >
          Skip to main content
        </a>

        {/* Page wrapper */}
        <div className="relative min-h-screen flex flex-col">
          {/* Navigation */}
          <Header />

          {/* Main content */}
          <main 
            id="main-content" 
            className="relative z-10 flex-1"
            role="main"
          >
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </div>

        {/* Cursor follower (optional enhancement) */}
        <div 
          id="cursor-follower" 
          className="hidden lg:block fixed w-8 h-8 rounded-full border-2 border-gold pointer-events-none z-50 opacity-0 transition-opacity duration-300"
          style={{ mixBlendMode: 'difference' }}
        />
      </body>
    </html>
  )
}