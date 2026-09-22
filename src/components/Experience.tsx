import { motion, useReducedMotion, useScroll } from 'framer-motion'
import { Briefcase, CheckCircle2, MapPin, Megaphone } from 'lucide-react'
import { useRef } from 'react'
import { experience } from '../data/profile'
import { useSkillFocus } from '../hooks/SkillFocus'
import { DocThumbs } from './ui/DocViewer'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { SourceTag } from './ui/SourceTag'

export function Experience() {
  const ref = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { active } = useSkillFocus()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const items = [...experience].sort((a, b) => b.sortKey - a.sortKey)

  return (
    <Section
      id="experience"
      index="02"
      eyebrow="Professional journey"
      title="Experience"
      intro="Internships backed by the LinkedIn profile and issued certificates. An announcement that isn’t a formal experience entry is labelled as a professional update."
    >
      <ol ref={ref} className="relative ml-3 md:ml-0">
        <span aria-hidden className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px bg-azure/15 md:left-[200px]" />
        <motion.span
          aria-hidden
          style={{ scaleY: reduce ? 1 : scrollYProgress }}
          className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-cyan via-electric to-royal md:left-[200px]"
        />
        {items.map((e, i) => {
          const isUpdate = e.kind === 'update'
          const Icon = isUpdate ? Megaphone : Briefcase
          const highlighted = !!active && e.skillIds.includes(active)
          return (
            <li key={e.id} className="relative pb-14 pl-10 last:pb-0 md:grid md:grid-cols-[200px_1fr] md:pl-0">
              <div className="mb-3 md:mb-0 md:pr-10 md:pt-1 md:text-right">
                <p className="font-mono text-sm text-cyan">{e.period}</p>
                {e.location && (
                  <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted md:justify-end">
                    <MapPin size={12} aria-hidden /> {e.location}
                  </p>
                )}
              </div>
              <span
                aria-hidden
                className={`absolute left-0 top-1 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-ink-900 ring-1 md:left-[200px] ${
                  e.current ? 'ring-cyan shadow-[0_0_24px_2px_rgba(56,189,248,0.7)]' : 'ring-cyan/50 shadow-[0_0_20px_-2px_rgba(56,189,248,0.6)]'
                }`}
              >
                <Icon size={14} className="text-cyan" />
              </span>
              <Reveal delay={i * 0.05} className="md:pl-10">
                <article
                  className={`surface rounded-2xl p-6 transition duration-500 md:p-8 ${
                    highlighted ? 'border-cyan/60 shadow-[0_0_50px_-15px_rgba(56,189,248,0.8)]' : 'glow-ring'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${
                        isUpdate ? 'bg-azure/10 text-azure ring-1 ring-azure/25' : 'bg-cyan/10 text-cyan ring-1 ring-cyan/30'
                      }`}
                    >
                      {isUpdate ? 'Professional Update' : 'Internship'}
                    </span>
                    {e.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-ink-950">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-950" aria-hidden /> Current
                      </span>
                    )}
                    {e.sources.map((s) => (
                      <SourceTag key={s} source={s} />
                    ))}
                  </div>

                  <h3 className="mt-4 text-xl font-semibold text-white md:text-2xl">{e.role ?? e.org}</h3>
                  {e.role && <p className="mt-1 text-[15px] font-medium text-ice">{e.org}</p>}
                  <p className="mt-4 leading-relaxed text-slate">{e.summary}</p>

                  {e.highlights?.length ? (
                    <ul className="mt-4 space-y-2">
                      {e.highlights.map((h) => (
                        <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-slate">
                          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-cyan" aria-hidden /> {h}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {e.skills?.length ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {e.skills.map((t) => (
                        <span key={t} className="rounded-md bg-royal/15 px-2 py-1 text-xs text-ice ring-1 ring-azure/15">
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {e.documents?.length ? <DocThumbs docs={e.documents} label={e.documents.length > 1 ? 'Certificates' : 'Certificate'} /> : null}
                </article>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
