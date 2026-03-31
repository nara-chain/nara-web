import Learn from '../../views/Learn';

export const revalidate = 300;

export const metadata = {
  title: 'Learn — NARA',
  description: 'Understanding NARA — the agent-native Layer 1, from identity to economy, explained in depth.',
};

export default function LearnPage() {
  return <Learn />;
}
