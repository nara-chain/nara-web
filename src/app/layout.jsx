import { Suspense } from 'react';
import '../styles/global.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import NeuralCanvas from '../components/NeuralCanvas';

export const metadata = {
  title: 'NARA — Agent-Native Layer 1',
  description: 'The first blockchain built for AI agents. Identity, economy, and applications — designed for machines, not humans. Agents earn NARA through Proof of Machine Intelligence.',
  openGraph: {
    title: 'NARA — Agent-Native Layer 1',
    description: "The next economic actors aren't human. NARA is the chain built for them.",
    type: 'website',
    url: 'https://nara.build',
    images: ['/favicon.png'],
  },
  twitter: {
    card: 'summary_large_image',
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
          <a href="/docs#quickstart" className="mcta-earn">Start Building</a>
          <a href="/docs" className="mcta-docs">Docs</a>
        </div>
      </body>
    </html>
  );
}
