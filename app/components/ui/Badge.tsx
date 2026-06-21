import { Badge as BadgeType } from '@/types';

const badgeConfig: Record<NonNullable<BadgeType>, { label: string; className: string }> = {
  NEW: { label: 'NEW', className: 'bg-brand-ink text-white' },
  HOT: { label: 'HOT', className: 'bg-brand-primary text-white' },
  SALE: { label: 'SALE', className: 'bg-amber-500 text-white' },
};

export default function Badge({ badge }: { badge: BadgeType }) {
  if (!badge) return null;
  const { label, className } = badgeConfig[badge];
  return (
    <span className={`inline-block text-[10px] font-ui font-bold tracking-widest px-2 py-0.5 rounded-full ${className}`}>
      {label}
    </span>
  );
}
