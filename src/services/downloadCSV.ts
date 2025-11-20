import type { Card } from '../features/cards/cardsSlice';

interface downloadProps {
  data: Card[];
  count: number;
  ref: React.RefObject<HTMLAnchorElement | null>;
}

export function downloadCSV({ data, count, ref }: downloadProps): void {
  const headers = ['Id', 'Image', 'Name'];
  const rows = data.map((card) => [card.id, card.image, card.name]);
  const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  if (ref.current) {
    ref.current.href = url;
    ref.current.download = `${count}_item(s).csv`;
    ref.current.click();
  }
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
