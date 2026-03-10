import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://hammadayub.dev'),
  title: 'Hammad Ayub | Backend Engineer & CRM Specialist',
  description: 'Portfolio of Hammad Ayub — a results-driven backend engineer and CRM automation specialist with 2+ years of experience building scalable web, IoT, and automation solutions using Node.js, Python, and modern frameworks.',
  keywords: [
    'Hammad Ayub',
    'backend engineer',
    'CRM automation',
    'Node.js developer',
    'Python developer',
    'HubSpot',
    'GoHighLevel',
    'Zoho',
    'Fastify',
    'FastAPI',
    'IoT',
    'automation',
    'portfolio',
    'Islamabad'
  ],
  authors: [{ name: 'Hammad Ayub' }],
  creator: 'Hammad Ayub',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hammadayub.dev',
    siteName: 'Hammad Ayub Portfolio',
    title: 'Hammad Ayub | Backend Engineer & CRM Specialist',
    description: 'Backend engineer specializing in scalable web, IoT, and CRM automation solutions.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hammad Ayub Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hammad Ayub | Backend Engineer',
    description: 'Backend engineer specializing in Node.js, Python, and CRM automation.',
    creator: '@hammadayub34',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: 'if(history.scrollRestoration)history.scrollRestoration="manual";window.scrollTo(0,0);' }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {/* Skip to main content for accessibility */}
        {/* <a href="#main-content" className="skip-link">
          Skip to main content
        </a> */}

        {/* Page wrapper */}
        <div className="page-wrapper">
          <Header />
          
          <main id="main-content" className="relative z-10 flex-1" role="main">
            {children}
          </main>
          
          <Footer />
        </div>

        {/* Cursor follower */}
        <div id="cursor-follower" className="cursor-follower" />
      </body>
    </html>
  )
}