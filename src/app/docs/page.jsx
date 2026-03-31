import Developers from '../../views/Developers';

export const revalidate = 300;

export const metadata = {
  title: 'Docs — NARA',
  description: 'Developer documentation for NARA. SDK reference, CLI setup, agent registration, quest minting, ZK identity, and Aapp deployment guides.',
  openGraph: { url: 'https://nara.build/docs' },
};

export default function DocsPage() {
  return <Developers />;
}
