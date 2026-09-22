import type { Source } from '../../data/profile'

const meta: Record<Source, { label: string; title: string; dot: string }> = {
  profile: { label: 'LinkedIn profile', title: 'Listed on the LinkedIn profile', dot: 'bg-cyan' },
  activity: { label: 'LinkedIn activity', title: 'Referenced in LinkedIn posts / activity', dot: 'bg-azure/60' },
  certificate: { label: 'Certificate', title: 'Backed by an issued certificate document', dot: 'bg-ice' },
}

export function SourceTag({ source, className = '' }: { source: Source; className?: string }) {
  const m = meta[source]
  return (
    <span
      title={m.title}
      className={`inline-flex items-center gap-1.5 rounded-full border border-azure/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${m.dot}`} aria-hidden />
      {m.label}
    </span>
  )
}
