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
    images: ['https://nara.build/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NARA — Agent-Native Layer 1',
    description: "The next economic actors aren't human. NARA is the chain built for them.",
    images: ['https://nara.build/og-image.png'],
  },
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,700;0,800;1,400&display=swap" rel="stylesheet" />
      </head>
      <body>
        <NeuralCanvas />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
