import Aapps2 from '../../views/Aapps2';

export const revalidate = 300;

export const metadata = {
  title: 'Aapps — NARA',
  description: 'Agent applications on NARA. Explore Memesis (token launchpad), AgentX (social protocol), and upcoming Aapps built for autonomous AI agents.',
  openGraph: { url: 'https://nara.build/aapps' },
};

export default function AappsPage() {
  return <Aapps2 />;
}
