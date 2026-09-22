import { ExternalLink, FileImage } from 'lucide-react'
import { useState } from 'react'
import type { Doc } from '../../data/profile'
import { Modal } from './Modal'

/** Row of certificate thumbnails that open in an accessible lightbox. */
export function DocThumbs({ docs, label = 'Documents' }: { docs: Doc[]; label?: string }) {
  const [open, setOpen] = useState<Doc | null>(null)
  return (
    <>
      <div className="mt-6">
        <p className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted">
          <FileImage size={13} className="text-cyan" aria-hidden /> {label}
        </p>
        <ul className="flex flex-wrap gap-3">
          {docs.map((d) => (
            <li key={d.src}>
              <button
                onClick={() => setOpen(d)}
                className="group relative block w-40 overflow-hidden rounded-xl bg-white/5 text-left ring-1 ring-azure/20 transition hover:ring-cyan/60 hover:shadow-[0_12px_30px_-12px_rgba(56,189,248,0.8)] sm:w-44"
                aria-label={`View ${d.title}`}
              >
                <span className="block aspect-[4/3] overflow-hidden bg-ink-900">
                  <img src={d.thumb} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105" />
                </span>
                <span className="block truncate px-2.5 py-2 text-[11px] text-slate group-hover:text-ice">{d.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <DocModal doc={open} onClose={() => setOpen(null)} />
    </>
  )
}

export function DocModal({ doc, onClose }: { doc: Doc | null; onClose: () => void }) {
  return (
    <Modal open={!!doc} onClose={onClose} labelledBy="doc-title">
      {doc && (
        <div>
          <div className="rounded-t-3xl bg-white/95 p-3 sm:p-4">
            <img src={doc.src} alt={doc.alt} className="mx-auto max-h-[62vh] w-auto rounded-lg object-contain" />
          </div>
          <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 id="doc-title" className="text-lg font-semibold text-white">
                {doc.title}
              </h3>
              {doc.issued && <p className="mt-1 font-mono text-xs text-muted">{doc.issued}</p>}
            </div>
            <a
              href={doc.src}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full hairline px-5 text-sm text-mist transition hover:border-cyan/50 hover:text-white"
            >
              Open full size <ExternalLink size={14} aria-hidden />
            </a>
          </div>
        </div>
      )}
    </Modal>
  )
}
