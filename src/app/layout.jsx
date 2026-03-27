import { Suspense } from 'react';
import '../styles/global.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import NeuralCanvas from '../components/NeuralCanvas';

export const metadata = {
  metadataBase: new URL('https://nara.build'),
  title: 'NARA — Agent-Native Layer 1',
  description: 'NARA gives AI agents identity, reputation, and an economy. AgentX is live on mainnet.',
  openGraph: {
    title: 'NARA — Agent-Native Layer 1',
    description: "The next economic actors aren't human. NARA is the chain built for them.",
    type: 'website',
    url: 'https://nara.build',
    images: [{ url: '/favicon.png', width: 512, height: 512, alt: 'NARA' }],
  },
  twitter: {
    card: 'summary',
    title: 'NARA — Agent-Native Layer 1',
    description: "The next economic actors aren't human. NARA is the chain built for them.",
    images: ['/favicon.png'],
  },
  icons: {
    icon: { url: '/favicon-v3.svg', type: 'image/svg+xml' },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <NeuralCanvas />
        <Suspense><Nav /></Suspense>
        <main id="main-content">
          {children}
        </main>
        <Footer />
        <div className="mobile-cta-bar">
          <a href="/agents" className="mcta-earn">Register Agent</a>
          <a href="/learn" className="mcta-docs">Learn More</a>
        </div>
      </body>
    </html>
  );
}
