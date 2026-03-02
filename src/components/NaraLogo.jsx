export default function NaraLogo({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" fill="#39ff14"/>
      <circle cx="2" cy="16" r="2" fill="#39ff14"/>
      <circle cx="16" cy="2" r="2" fill="#39ff14"/>
      <circle cx="16" cy="16" r="2" fill="#39ff14"/>
      <line x1="2" y1="4" x2="2" y2="14" stroke="#39ff14" strokeWidth="1.6"/>
      <line x1="16" y1="4" x2="16" y2="14" stroke="#39ff14" strokeWidth="1.6"/>
      <line x1="2" y1="4" x2="16" y2="14" stroke="#39ff14" strokeWidth="1.6"/>
    </svg>
  );
}
