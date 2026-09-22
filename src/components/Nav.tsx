import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, FileText } from 'lucide-react'
import { useEffect, useState } from 'react'
import { LINKEDIN_URL, navItems, person } from '../data/profile'

export function useResumeHref(resumeExists: boolean) {
  return resumeExists
    ? { href: person.resume, title: 'Download résumé (PDF)', external: true }
    : { href: LINKEDIN_URL, title: 'Résumé PDF not uploaded yet — opens the LinkedIn profile', external: true }
}

export function Nav({ resumeExists }: { resumeExists: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const resume = useResumeHref(resumeExists)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ;['home', ...navItems.map((n) => n.id)].forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <a href="#main" className="sr-only z-[100] rounded bg-royal px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open ? 'border-b border-azure/10 bg-ink-900/70 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between md:h-18">
          <a href="#home" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan to-royal font-display text-sm font-bold text-white shadow-[0_0_24px_-4px_rgba(56,189,248,0.7)]">
              SG
            </span>
            <span className="font-display text-[15px] font-semibold tracking-tight text-white">
              Soumaditya<span className="text-cyan"> Ghosh</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 xl:flex">
            {navItems.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={active === n.id ? 'true' : undefined}
                  className={`relative rounded-full px-3 py-2 text-[13px] transition-colors ${
                    active === n.id ? 'text-white' : 'text-slate hover:text-white'
                  }`}
                >
                  {active === n.id && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-royal/20 ring-1 ring-azure/25" />
                  )}
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={resume.href}
              title={resume.title}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-10 items-center gap-2 rounded-full bg-gradient-to-r from-royal to-electric px-4 text-sm font-medium text-white shadow-[0_8px_30px_-8px_rgba(37,99,235,0.9)] transition hover:shadow-[0_8px_36px_-6px_rgba(56,189,248,0.8)] sm:inline-flex"
            >
              <FileText size={15} /> Resume
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="relative grid h-11 w-11 place-items-center rounded-full hairline bg-ink-800/60 xl:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <span className={`absolute left-0 h-0.5 w-5 rounded bg-mist transition-all duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 top-1.5 h-0.5 rounded bg-cyan transition-all duration-300 ${open ? 'w-0 opacity-0' : 'w-3.5'}`} />
                <span className={`absolute left-0 h-0.5 w-5 rounded bg-mist transition-all duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-ink-950/95 pt-20 backdrop-blur-xl xl:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2.5rem) 2rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2rem)' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Mobile" className="container-x flex h-full flex-col overflow-y-auto pb-10">
              <ul className="flex flex-col">
                {navItems.map((n, i) => (
                  <motion.li
                    key={n.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.04 }}
                  >
                    <a
                      href={`#${n.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 border-b border-azure/10 py-3.5 font-display text-2xl text-mist transition hover:text-cyan"
                    >
                      <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
                      {n.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a
                href={resume.href}
                title={resume.title}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-royal to-electric text-white"
              >
                <FileText size={16} /> Resume <ArrowUpRight size={16} />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
