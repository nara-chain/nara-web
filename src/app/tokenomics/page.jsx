import Tokenomics from '../../views/Tokenomics';

export const metadata = {
  title: 'Tokenomics — NARA',
  description: 'NARA token distribution: 500M fixed supply, no inflation. Proof of Machine Intelligence mining, staking, and ecosystem rewards.',
  openGraph: { url: 'https://nara.build/tokenomics' },
};

export default function TokenomicsPage() {
  return <Tokenomics />;
}
