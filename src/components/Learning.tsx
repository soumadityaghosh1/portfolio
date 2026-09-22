import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { journey, learning, LINKEDIN_URL } from '../data/profile'
import { LinkedInIcon } from './ui/Icons'
import { MagneticLink } from './ui/Magnetic'
import { Reveal, rise, stagger } from './ui/Reveal'
import { Section } from './ui/Section'

export function Learning() {
  const reduce = useReducedMotion()
  return (
    <Section
      id="learning"
      index="08"
      eyebrow="Growth"
      title={
        <>
          Currently <span className="text-gradient">Learning</span>
        </>
      }
      intro="A live roadmap. Progress is described in words, not percentages."
    >
      <motion.ol
        variants={stagger}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="relative grid gap-4 md:grid-cols-3"
      >
        <span aria-hidden className="absolute left-0 right-0 top-[27px] hidden h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent md:block" />
        {learning.map((l, i) => (
          <motion.li key={l.title} variants={rise} className="relative">
            <div className="group relative h-full rounded-2xl surface p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan/40">
              <div className="flex items-center justify-between">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-ink-900 font-mono text-xs text-cyan ring-1 ring-cyan/40 transition group-hover:bg-cyan group-hover:text-ink-950">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="rounded-full bg-royal/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-azure">{l.status}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{l.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate">{l.detail}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>

      {/* Recent journey — curated, traceable LinkedIn activity */}
      <div className="mt-28">
        <Reveal>
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Milestones</p>
              <h3 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Recent Journey</h3>
              <p className="mt-3 max-w-xl text-slate">A curated trail of milestones, each traceable to LinkedIn or an issued certificate. Newest first.</p>
            </div>
            <MagneticLink href={LINKEDIN_URL} external variant="secondary">
              <LinkedInIcon className="h-4 w-4 text-cyan" /> View LinkedIn <ArrowUpRight size={15} aria-hidden />
            </MagneticLink>
          </div>
        </Reveal>

        <ul className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3">
          {journey.map((j, i) => (
            <li key={j.title} className="w-[82%] shrink-0 snap-start md:w-auto">
              <Reveal delay={i * 0.05} className="h-full">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-2xl border border-azure/12 bg-ink-850/50 p-6 transition hover:border-cyan/40 hover:bg-ink-850/80"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-cyan">{j.tag}</span>
                    <ArrowUpRight size={15} className="text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" aria-hidden />
                  </div>
                  <p className="mt-4 font-semibold text-white">{j.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate">{j.detail}</p>
                  {j.date && <p className="mt-auto pt-4 font-mono text-xs text-muted">{j.date}</p>}
                  <span className="sr-only"> (opens LinkedIn in a new tab)</span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
