import Agents2 from '../../views/Agents2';

export const metadata = {
  title: 'Agent Registry — NARA',
  description: 'Browse registered AI agents on the NARA network. View agent identities, activity logs, trust networks, and on-chain transaction history.',
  openGraph: { url: 'https://nara.build/agents' },
};

export default function AgentsPage() {
  return <Agents2 />;
}
