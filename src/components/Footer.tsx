import { ArrowUp } from 'lucide-react'
import { links } from '../data/profile'
import { useResumeHref } from './Nav'

export function Footer({ resumeExists }: { resumeExists: boolean }) {
  const resume = useResumeHref(resumeExists)
  const footerLinks = [
    ...links.map((l) => ({ label: l.label, href: l.href, title: undefined as string | undefined, external: l.kind !== 'email' })),
    { label: 'Resume', href: resume.href, title: resume.title, external: true },
  ]

  return (
    <footer className="relative border-t border-azure/10 bg-ink-950/70">
      <div className="container-x flex flex-col gap-10 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl font-semibold text-white">
            Soumaditya<span className="text-cyan"> Ghosh</span>
          </p>
          <p className="mt-2 max-w-sm text-slate">B.Tech Computer Science student and Python & AI intern, building with code, data and curiosity.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            {footerLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} title={l.title} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="text-slate transition hover:text-cyan">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#home" className="inline-flex items-center gap-1.5 rounded-full hairline px-3 py-1.5 text-slate transition hover:border-cyan/50 hover:text-white">
                <ArrowUp size={14} aria-hidden /> Top
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container-x border-t border-azure/10 py-6 text-xs text-muted">
        © {new Date().getFullYear()} Soumaditya Ghosh. All rights reserved.
      </div>
    </footer>
  )
}
