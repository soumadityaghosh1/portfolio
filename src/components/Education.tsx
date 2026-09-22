import { motion, useReducedMotion, useScroll } from 'framer-motion'
import { BookOpen, GraduationCap, School } from 'lucide-react'
import { useRef } from 'react'
import { education } from '../data/profile'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'

const chapterOrder = ['2024', '2025', '—']
const chapterLabel: Record<string, string> = { '2024': '2024', '2025': '2025', '—': 'Along the way' }

export function Education() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const chapters = chapterOrder
    .map((y) => ({ year: y, items: education.timeline.filter((t) => t.year === y) }))
    .filter((c) => c.items.length)
  const eventCount = education.timeline.filter((t) => !['Milestone', 'Project'].includes(t.tag)).length

  return (
    <Section id="education" index="06" eyebrow="Education" title="Where the foundation is built.">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-azure/15 bg-gradient-to-br from-royal/25 via-ink-850/70 to-ink-900 p-8 lg:sticky lg:top-24">
            <div aria-hidden className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-electric/25 blur-3xl" />
            <GraduationCap size={30} className="relative text-cyan" aria-hidden />
            <p className="relative mt-6 font-mono text-sm text-cyan">{education.period}</p>
            <h3 className="relative mt-2 text-3xl font-semibold leading-tight text-white">{education.school}</h3>
            <p className="relative mt-3 text-mist">{education.degree}</p>
            <div className="relative mt-4 flex flex-wrap gap-2">
              {education.skills.map((s) => (
                <span key={s} className="rounded-md bg-royal/20 px-2 py-1 text-xs text-ice ring-1 ring-azure/20">
                  {s}
                </span>
              ))}
            </div>
            <div className="relative mt-8 grid grid-cols-3 gap-3 border-t border-azure/15 pt-6 text-center">
              {[
                ['Events', eventCount],
                ['PBL project', education.timeline.filter((t) => t.tag === 'Project').length],
                ['Class of', 2028],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="font-display text-2xl font-semibold text-white">{v}</p>
                  <p className="text-xs text-muted">{k}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div ref={ref} className="relative pl-8">
          <span aria-hidden className="absolute left-0 top-0 h-full w-px bg-azure/15" />
          <motion.span
            aria-hidden
            style={{ scaleY: reduce ? 1 : scrollYProgress }}
            className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-cyan to-royal"
          />
          {chapters.map((ch) => (
            <div key={ch.year} className="relative mb-12 last:mb-0">
              <Reveal>
                <span aria-hidden className="absolute -left-8 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_16px_2px_rgba(56,189,248,0.7)]" />
                <h3 className="font-display text-2xl font-semibold text-white">{chapterLabel[ch.year]}</h3>
              </Reveal>
              <ol className="mt-5 space-y-3">
                {ch.items.map((t, i) => (
                  <li key={t.title}>
                    <Reveal delay={i * 0.05}>
                      <div className="group flex items-start gap-4 rounded-2xl border border-transparent p-4 transition hover:border-azure/15 hover:bg-ink-850/50">
                        <span className="mt-0.5 w-24 shrink-0 rounded-md bg-royal/15 px-2 py-1 text-center font-mono text-[10px] uppercase tracking-wider text-azure ring-1 ring-azure/15">
                          {t.tag}
                        </span>
                        <div>
                          <p className="font-medium text-white transition group-hover:text-ice">{t.title}</p>
                          <p className="mt-0.5 text-sm text-slate">{t.detail}</p>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>

      {/* Earlier education */}
      <div className="mt-20">
        <Reveal>
          <p className="eyebrow mb-6 flex items-center gap-2">
            <BookOpen size={14} aria-hidden /> Earlier education
          </p>
        </Reveal>
        <ul className="grid gap-4 md:grid-cols-3">
          {education.earlier.map((e, i) => (
            <li key={e.school}>
              <Reveal delay={i * 0.06} className="h-full">
                <div className="surface glow-ring flex h-full flex-col rounded-2xl p-6">
                  <div className="flex items-center justify-between gap-3">
                    <School size={18} className="text-cyan" aria-hidden />
                    {e.period && <span className="font-mono text-xs text-muted">{e.period}</span>}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{e.school}</h3>
                  <p className="mt-1 text-sm text-ice">{e.level}</p>
                  {e.board && <p className="mt-3 text-sm text-slate">{e.board}</p>}
                  {e.result && <p className="mt-1 font-mono text-xs text-azure">{e.result}</p>}
                  <p className="mt-3 text-sm leading-relaxed text-slate">{e.detail}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
