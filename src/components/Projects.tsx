import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, BookOpen, CheckCircle2, ExternalLink, Lightbulb, Target } from 'lucide-react'
import { useState } from 'react'
import { projects, skills, type Project } from '../data/profile'
import { useSkillFocus } from '../hooks/SkillFocus'
import { GitHubIcon } from './ui/Icons'
import { Modal } from './ui/Modal'
import { LaneVisual, StockVisual } from './ProjectVisuals'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { SourceTag } from './ui/SourceTag'

const Visual = ({ p, className }: { p: Project; className?: string }) =>
  p.visual === 'lane' ? <LaneVisual className={className} /> : <StockVisual className={className} />

function ProjectCard({ p, index, onOpen }: { p: Project; index: number; onOpen: () => void }) {
  const reduce = useReducedMotion()
  const { active } = useSkillFocus()
  const highlighted = !!active && p.skillIds.includes(active)
  const dimmed = !!active && !highlighted
  const activeName = skills.find((s) => s.id === active)?.name

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 })

  return (
    <Reveal delay={index * 0.08}>
      <motion.article
        onPointerMove={(e) => {
          if (reduce || e.pointerType !== 'mouse') return
          const r = e.currentTarget.getBoundingClientRect()
          mx.set((e.clientX - r.left) / r.width)
          my.set((e.clientY - r.top) / r.height)
        }}
        onPointerLeave={() => {
          mx.set(0.5)
          my.set(0.5)
        }}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
        className={`group relative grid overflow-hidden rounded-3xl border transition-[border-color,box-shadow,opacity] duration-500 lg:grid-cols-2 ${
          highlighted
            ? 'border-cyan/60 shadow-[0_0_0_1px_rgba(56,189,248,0.25),0_30px_90px_-30px_rgba(56,189,248,0.7)]'
            : 'border-azure/12 hover:border-cyan/40 hover:shadow-[0_30px_90px_-30px_rgba(37,99,235,0.8)]'
        } ${dimmed ? 'opacity-50' : ''} bg-ink-850/60`}
      >
        <div className={`relative aspect-[16/10] overflow-hidden lg:aspect-auto ${index % 2 ? 'lg:order-last' : ''}`}>
          <Visual p={p} className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink-850/30" />
          {/* tech reveal on hover */}
          <div className="absolute inset-x-4 bottom-4 flex translate-y-2 flex-wrap gap-2 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
            {p.technologies.map((t) => (
              <span key={t} className="glass rounded-full px-3 py-1 text-xs text-ice">
                {t}
              </span>
            ))}
          </div>
          {highlighted && (
            <span className="absolute left-4 top-4 rounded-full bg-cyan px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-ink-950">
              Uses {activeName}
            </span>
          )}
        </div>

        <div className="relative flex flex-col p-7 md:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-sm text-cyan">{String(index + 1).padStart(2, '0')}</span>
            <SourceTag source={p.source} />
          </div>
          <p className="mt-4 text-sm text-muted">{p.context}</p>
          <h3 className="mt-2 text-2xl font-semibold leading-tight text-white md:text-3xl">{p.title}</h3>
          <p className="mt-3 text-lg text-ice/90">{p.tagline}</p>

          <dl className="mt-6 space-y-4 text-[15px] leading-relaxed">
            <div>
              <dt className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted">
                <Target size={13} className="text-cyan" aria-hidden /> Problem
              </dt>
              <dd className="mt-1 text-slate">{p.problem}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted">
                <Lightbulb size={13} className="text-cyan" aria-hidden /> Solution
              </dt>
              <dd className="mt-1 text-slate">{p.solution}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-3 pt-2 lg:mt-auto">
            <button
              onClick={onOpen}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-royal to-electric px-6 text-sm font-medium text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.9)] transition hover:shadow-[0_14px_40px_-8px_rgba(56,189,248,0.7)]"
            >
              View Case Study
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </button>
            {p.repo && (
              <a href={p.repo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full hairline px-5 text-sm text-mist hover:border-cyan/50">
                <GitHubIcon className="h-4 w-4" /> Code
              </a>
            )}
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full hairline px-5 text-sm text-mist hover:border-cyan/50">
                <ExternalLink size={15} aria-hidden /> Live demo
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </Reveal>
  )
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null)

  return (
    <Section
      id="projects"
      index="04"
      eyebrow="Selected work"
      title={
        <>
          Projects that <span className="text-gradient">think.</span>
        </>
      }
      intro="Two builds at the intersection of perception, prediction and software. Visuals are illustrative artwork, not product screenshots."
    >
      <div className="space-y-8">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} p={p} index={i} onOpen={() => setOpen(p)} />
        ))}
      </div>

      <Modal open={!!open} onClose={() => setOpen(null)} labelledBy="case-study-title">
        {open && (
          <article>
            <div className="relative aspect-[16/9] overflow-hidden rounded-t-3xl">
              <Visual p={open} className="h-full w-full" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/10 to-transparent" />
            </div>
            <div className="-mt-16 relative p-6 sm:p-10">
              <p className="eyebrow">Case study</p>
              <h3 id="case-study-title" className="mt-2 text-3xl font-semibold text-white">
                {open.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{open.context}</p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl bg-ink-900/50 p-5 ring-1 ring-azure/10">
                  <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-cyan">
                    <Target size={13} aria-hidden /> Problem
                  </p>
                  <p className="mt-2 leading-relaxed text-slate">{open.problem}</p>
                </div>
                <div className="rounded-2xl bg-ink-900/50 p-5 ring-1 ring-azure/10">
                  <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-cyan">
                    <Lightbulb size={13} aria-hidden /> Solution
                  </p>
                  <p className="mt-2 leading-relaxed text-slate">{open.solution}</p>
                </div>
              </div>

              <h4 className="mt-8 flex items-center gap-2 text-lg font-semibold text-white">
                <BookOpen size={18} className="text-cyan" aria-hidden /> What I learned
              </h4>
              <ul className="mt-3 space-y-2">
                {open.learned.map((l) => (
                  <li key={l} className="flex gap-3 text-slate">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-cyan" aria-hidden /> {l}
                  </li>
                ))}
              </ul>

              <h4 className="mt-8 text-lg font-semibold text-white">Domain</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {open.technologies.map((t) => (
                  <span key={t} className="rounded-full bg-royal/20 px-3 py-1 text-sm text-ice ring-1 ring-azure/20">
                    {t}
                  </span>
                ))}
              </div>

              <p className="mt-8 rounded-xl border border-dashed border-azure/20 p-4 text-sm text-muted">
                Implementation details (stack, dataset, metrics) and repository links will be added once published — nothing here is
                assumed.
              </p>
            </div>
          </article>
        )}
      </Modal>
    </Section>
  )
}
