import Press from '../../views/Press';

export const revalidate = 300;

export const metadata = {
  title: 'Press & Media — NARA',
  description: 'Brand assets, logos, and banners for press, KOLs, and community use.',
};

export default function PressPage() {
  return <Press />;
}
