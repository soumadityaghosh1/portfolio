import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { Award, BadgeCheck, ExternalLink, FileBadge } from 'lucide-react'
import { useState } from 'react'
import { certificates, skills, type CertCategory, type Certificate } from '../data/profile'
import { useSkillFocus } from '../hooks/SkillFocus'
import { Modal } from './ui/Modal'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { SourceTag } from './ui/SourceTag'

type Filter = 'All' | CertCategory
const order: CertCategory[] = ['AI/ML', 'Programming', 'Data', 'Blockchain', 'Participation']
// A filter only appears when at least one certificate exists in that category.
const filters: Filter[] = ['All', ...order.filter((c) => certificates.some((x) => x.category === c))]
const sorted = [...certificates].sort((a, b) => b.sortKey - a.sortKey)

/** Real certificate image when available; otherwise a clearly-labelled design plate (never a fake certificate). */
function Preview({ c, large = false }: { c: Certificate; large?: boolean }) {
  if (c.document)
    return (
      <img
        src={large ? c.document.src : c.document.thumb}
        alt={c.document.alt}
        loading={large ? 'eager' : 'lazy'}
        decoding="async"
        className={large ? 'mx-auto max-h-[60vh] w-auto rounded-lg object-contain' : 'h-full w-full object-cover object-top'}
      />
    )
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[radial-gradient(circle_at_20%_0%,#1d4ed8_0%,#0b1a3d_45%,#050b1f_100%)] p-6">
      <div aria-hidden className="grid-texture absolute inset-0 opacity-60" />
      <div aria-hidden className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full border border-cyan/20" />
      <div className="relative flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ice/80">{c.issuer}</span>
        <FileBadge size={18} className="text-cyan" aria-hidden />
      </div>
      <div className="relative">
        <p className={`font-display font-semibold text-white ${large ? 'text-4xl' : 'text-2xl'}`}>{c.name}</p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-slate">Credential entry · certificate image not uploaded</p>
      </div>
    </div>
  )
}

function StatusBadge({ c }: { c: Certificate }) {
  return c.verifyUrl ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-cyan/15 px-2.5 py-1 text-xs text-cyan ring-1 ring-cyan/30">
      <BadgeCheck size={13} aria-hidden /> Verified Credential
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full bg-royal/15 px-2.5 py-1 text-xs text-ice ring-1 ring-azure/20">
      <Award size={13} aria-hidden /> Certificate
    </span>
  )
}

export function Credentials() {
  const [filter, setFilter] = useState<Filter>('All')
  const [open, setOpen] = useState<Certificate | null>(null)
  const { active } = useSkillFocus()
  const activeName = skills.find((s) => s.id === active)?.name

  const shown = sorted.filter((c) => filter === 'All' || c.category === filter)
  const total = certificates.length
  const verified = certificates.filter((c) => c.verifyUrl).length

  return (
    <Section
      id="credentials"
      index="05"
      eyebrow="Proof of learning"
      title={
        <>
          Certificates & <span className="text-gradient">Credentials</span>
        </>
      }
      intro="Courses, training and participation, each backed by the issued certificate. Only credentials with a working verification link on the issuer’s site get the verified badge. Internship certificates appear under Experience."
      aside={
        <div className="flex gap-3">
          <div className="rounded-2xl hairline bg-ink-850/60 px-5 py-3">
            <p className="font-display text-3xl font-semibold text-white">{total}</p>
            <p className="text-xs text-muted">{total === 1 ? 'Credential' : 'Credentials'}</p>
          </div>
          {verified > 0 && (
            <div className="rounded-2xl hairline bg-ink-850/60 px-5 py-3">
              <p className="font-display text-3xl font-semibold text-cyan">{verified}</p>
              <p className="text-xs text-muted">Verified {verified === 1 ? 'Credential' : 'Credentials'}</p>
            </div>
          )}
        </div>
      }
    >
      {filters.length > 2 && (
        <LayoutGroup id="cert-filters">
          <div role="tablist" aria-label="Certificate categories" className="-mx-1 mb-8 flex gap-1 overflow-x-auto px-1 pb-1">
            {filters.map((f) => {
              const count = f === 'All' ? total : certificates.filter((c) => c.category === f).length
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filter === f}
                  onClick={() => setFilter(f)}
                  className={`relative shrink-0 rounded-full px-4 py-2.5 text-sm transition ${filter === f ? 'text-white' : 'text-slate hover:text-white'}`}
                >
                  {filter === f && <motion.span layoutId="cert-pill" className="absolute inset-0 -z-10 rounded-full bg-royal/30 ring-1 ring-cyan/40" />}
                  {f} <span className="ml-1 font-mono text-[10px] text-muted">{count}</span>
                </button>
              )
            })}
          </div>
        </LayoutGroup>
      )}

      <motion.ul layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((c) => {
            const highlighted = !!active && c.skillIds.includes(active)
            return (
              <motion.li
                key={c.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-3xl bg-ink-850/60 transition duration-500 hover:-translate-y-1 ${
                    highlighted
                      ? 'ring-2 ring-cyan/70 shadow-[0_0_60px_-15px_rgba(56,189,248,0.8)]'
                      : 'border border-azure/15 hover:border-cyan/40 hover:shadow-[0_24px_60px_-24px_rgba(37,99,235,0.8)]'
                  }`}
                >
                  <button onClick={() => setOpen(c)} className="relative block aspect-[4/3] overflow-hidden bg-white/95 text-left" aria-label={`Open ${c.name} certificate`}>
                    <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                      <Preview c={c} />
                    </div>
                    <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-900/40 to-transparent opacity-0 transition group-hover:opacity-100" />
                    {highlighted && (
                      <span className="absolute right-3 top-3 rounded-full bg-cyan px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-ink-950">
                        Demonstrates {activeName}
                      </span>
                    )}
                  </button>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge c={c} />
                      <SourceTag source={c.source} />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold leading-snug text-white">{c.name}</h3>
                    <p className="mt-1 text-sm text-slate">{c.issuer}</p>
                    <p className="mt-1 font-mono text-xs text-muted">
                      {[c.kind, c.issued, c.grade && `Grade ${c.grade}`].filter(Boolean).join(' · ')}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {c.skills.map((s) => (
                        <span key={s} className="rounded-md bg-royal/15 px-2 py-1 text-xs text-ice">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto flex flex-wrap gap-2 pt-6">
                      <button
                        onClick={() => setOpen(c)}
                        className="inline-flex min-h-11 items-center rounded-full hairline px-5 text-sm text-mist transition hover:border-cyan/50 hover:text-white"
                      >
                        View Certificate
                      </button>
                      {c.verifyUrl && (
                        <a
                          href={c.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-royal/30 px-5 text-sm text-white ring-1 ring-cyan/30 transition hover:bg-royal/50"
                        >
                          Verify Credential <ExternalLink size={13} aria-hidden />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </motion.ul>

      {/* Skills → credentials connection */}
      <Reveal>
        <div className="glass mt-10 rounded-3xl p-6 md:p-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Skills → Credentials</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">How the learning connects</h3>
            </div>
            <p className="max-w-md text-sm text-slate">Each core skill next to the credentials that show it. Skills without one are backed by projects or practice.</p>
          </div>
          <ul className="mt-6 grid gap-2 md:grid-cols-2">
            {skills
              .filter((s) => s.core)
              .map((s) => {
                const certs = certificates.filter((c) => c.skillIds.includes(s.id))
                const on = active === s.id
                return (
                  <li
                    key={s.id}
                    className={`grid grid-cols-[minmax(0,0.8fr)_auto_minmax(0,1.4fr)] items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                      on ? 'bg-royal/25 ring-1 ring-cyan/50' : 'bg-ink-900/40'
                    }`}
                  >
                    <span className="font-medium text-mist">{s.name}</span>
                    <span aria-hidden className={`h-px w-6 ${certs.length ? 'bg-cyan' : 'bg-azure/20'}`} />
                    <span className={certs.length ? 'text-ice' : 'text-muted'}>
                      {certs.length ? certs.map((c) => c.name).join(' · ') : s.evidence}
                    </span>
                  </li>
                )
              })}
          </ul>
        </div>
      </Reveal>

      <Modal open={!!open} onClose={() => setOpen(null)} labelledBy="cert-title">
        {open && (
          <div>
            <div className="rounded-t-3xl bg-white/95 p-3 sm:p-4">
              {open.document ? (
                <Preview c={open} large />
              ) : (
                <div className="aspect-[16/9] overflow-hidden rounded-lg">
                  <Preview c={open} large />
                </div>
              )}
            </div>
            <div className="p-6 sm:p-8">
              <StatusBadge c={open} />
              <h3 id="cert-title" className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                {open.name}
              </h3>
              {open.detail && <p className="mt-2 text-slate">{open.detail}</p>}
              <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  ['Issuing organisation', open.issuer],
                  ['Type', open.kind],
                  ['Issue date', open.issued ?? 'Not printed on certificate'],
                  ['Credential ID', open.credentialId ?? 'Not listed'],
                  ...(open.grade ? [['Grade', open.grade]] : []),
                  ['Skills', open.skills.join(', ')],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-ink-900/50 p-4 ring-1 ring-azure/10">
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">{k}</dt>
                    <dd className="mt-1 break-words text-mist">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                {open.document && (
                  <a
                    href={open.document.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-royal to-electric px-6 text-sm text-white"
                  >
                    Open Original Certificate <ExternalLink size={14} aria-hidden />
                  </a>
                )}
                {open.verifyUrl && (
                  <a
                    href={open.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center gap-2 rounded-full hairline px-6 text-sm text-mist hover:border-cyan/50"
                  >
                    <BadgeCheck size={15} aria-hidden /> Verify on issuer’s site
                  </a>
                )}
                {!open.document && !open.verifyUrl && <p className="text-sm text-muted">The certificate file and verification link haven’t been uploaded yet.</p>}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </Section>
  )
}
