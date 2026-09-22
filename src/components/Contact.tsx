import { ArrowUpRight, CheckCircle2, Loader2, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { CONTACT_FORM_ENDPOINT, EMAIL, links } from '../data/profile'
import { SocialIcon } from './ui/Icons'
import { Reveal } from './ui/Reveal'

type Status = { kind: 'idle' | 'sending' | 'sent' | 'fallback' | 'error'; msg?: string }

const field =
  'peer w-full rounded-xl border border-azure/15 bg-ink-900/60 px-4 pb-2.5 pt-6 text-mist placeholder-transparent transition focus:border-cyan/60 focus:outline-none focus:ring-2 focus:ring-cyan/15'
const label =
  'pointer-events-none absolute left-4 top-2 font-mono text-[10px] uppercase tracking-wider text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-cyan'

export function Contact() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>

    if (CONTACT_FORM_ENDPOINT) {
      setStatus({ kind: 'sending' })
      try {
        const r = await fetch(CONTACT_FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        })
        if (!r.ok) throw new Error()
        form.reset()
        setStatus({ kind: 'sent', msg: 'Thanks — your message is on its way.' })
      } catch {
        setStatus({ kind: 'error', msg: 'Something went wrong. Please reach out on LinkedIn instead.' })
      }
      return
    }

    // No backend configured: never pretend to send. Hand off to the visitor's email app, pre-filled.
    const subject = `Portfolio enquiry from ${data.name}`
    const body = `${data.message}

— ${data.name} (${data.email})`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus({ kind: 'fallback', msg: `Opening your email app with the message addressed to ${EMAIL}. Send it from there, since nothing is sent from this page.` })
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-24 md:py-36">
      <div aria-hidden className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(37,99,235,0.35),transparent_65%)] blur-2xl" />
      <div className="container-x relative grid gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="eyebrow mb-4 flex items-center gap-3">
            <span className="text-muted">09</span>
            <span className="h-px w-8 bg-cyan/50" aria-hidden /> Contact
          </p>
          <h2 id="contact-title" className="text-4xl font-semibold leading-[1.05] text-white md:text-6xl">
            Let’s Build Something <span className="text-gradient">Meaningful.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate">
            Open to internships, collaborations, hackathon teams and conversations about software and AI. LinkedIn is the fastest way
            to reach me, and email works too.
          </p>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {links.map((l) => (
              <li key={l.kind}>
                <a
                  href={l.href}
                  {...(l.kind === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                  className="group flex items-center gap-4 rounded-2xl border border-azure/15 bg-ink-850/50 p-4 transition hover:border-cyan/50 hover:shadow-[0_20px_50px_-25px_rgba(56,189,248,0.8)]"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-royal/20 text-cyan">
                    <SocialIcon kind={l.kind} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-white">{l.label}</span>
                    <span className="block truncate text-sm text-muted">{l.handle}</span>
                  </span>
                  <ArrowUpRight className="text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" size={18} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="glass relative rounded-3xl p-6 sm:p-8" noValidate={false}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative">
                <input id="cf-name" name="name" required autoComplete="name" placeholder="Name" className={field} />
                <label htmlFor="cf-name" className={label}>
                  Name
                </label>
              </div>
              <div className="relative">
                <input id="cf-email" name="email" type="email" required autoComplete="email" placeholder="Email" className={field} />
                <label htmlFor="cf-email" className={label}>
                  Email
                </label>
              </div>
            </div>
            <div className="relative mt-4">
              <textarea id="cf-message" name="message" required rows={6} placeholder="Message" className={`${field} resize-none`} />
              <label htmlFor="cf-message" className={label}>
                Message
              </label>
            </div>
            <button
              type="submit"
              disabled={status.kind === 'sending'}
              className="group mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-royal to-electric px-6 font-medium text-white shadow-[0_10px_40px_-10px_rgba(37,99,235,0.9)] transition hover:shadow-[0_14px_50px_-8px_rgba(56,189,248,0.7)] disabled:opacity-60"
            >
              {status.kind === 'sending' ? <Loader2 size={17} className="animate-spin" aria-hidden /> : <Send size={16} className="transition group-hover:translate-x-0.5" aria-hidden />}
              Send Message
            </button>
            <p role="status" aria-live="polite" className="mt-4 min-h-5 text-sm">
              {status.msg && (
                <span className={`flex gap-2 ${status.kind === 'error' ? 'text-red-300' : 'text-ice'}`}>
                  {status.kind !== 'error' && <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-cyan" aria-hidden />}
                  {status.msg}
                </span>
              )}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
