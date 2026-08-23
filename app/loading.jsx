import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, position: 'relative' }}>
      <Loader2 size={48} className="animate-spin" color="var(--accent-glow)" />
    </div>
  );
}
