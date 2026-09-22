import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { ArrowRight, Award, Briefcase, FolderGit2, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { certificates, experience, projects, skills, type SkillCategory } from '../data/profile'
import { useSkillFocus } from '../hooks/SkillFocus'
import { fallbackIcon, skillIcon } from './skillIcons'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'

type Filter = 'All' | SkillCategory

// Categories come from the data — a category only appears if a verified skill exists in it.
const categories: Filter[] = ['All', ...Array.from(new Set(skills.map((s) => s.category)))]

export function connectionsFor(skillId: string) {
  return {
    projects: projects.filter((p) => p.skillIds.includes(skillId)),
    certificates: certificates.filter((c) => c.skillIds.includes(skillId)),
    experience: experience.filter((e) => e.skillIds.includes(skillId)),
  }
}

export function Arsenal() {
  const [filter, setFilter] = useState<Filter>('All')
  const [query, setQuery] = useState('')
  const { active, setActive } = useSkillFocus()

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return skills.filter(
      (s) =>
        (filter === 'All' || s.category === filter) &&
        (!q || [s.name, s.category, s.kind, s.description, s.evidence].join(' ').toLowerCase().includes(q)),
    )
  }, [filter, query])

  const featured = skills.filter((s) => s.featured)
  const core = skills.filter((s) => s.core).map((s) => s.name)
  const activeSkill = skills.find((s) => s.id === active)
  const links = active ? connectionsFor(active) : null

  const toggle = (id: string) => setActive(active === id ? null : id)

  return (
    <Section
      id="arsenal"
      index="03"
      eyebrow="Technical skills"
      title={
        <>
          Technical <span className="text-gradient">Arsenal</span>
        </>
      }
      intro="Every skill below is backed by a project, certificate, workshop or documented practice — no self-rated percentages. Select a skill to see where it shows up."
    >
      {/* Featured */}
      <Reveal>
        <ul className="mb-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" aria-label="Featured skills">
          {featured.map((s) => {
            const Icon = skillIcon[s.id] ?? fallbackIcon
            const on = active === s.id
            return (
              <li key={s.id}>
                <button
                  onClick={() => toggle(s.id)}
                  aria-pressed={on}
                  className={`group relative flex h-full w-full flex-col items-start gap-6 overflow-hidden rounded-2xl p-5 text-left transition duration-300 ${
                    on ? 'bg-royal/25 ring-1 ring-cyan/60 shadow-[0_0_40px_-10px_rgba(56,189,248,0.7)]' : 'surface glow-ring'
                  }`}
                >
                  <span aria-hidden className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-electric/20 opacity-0 blur-2xl transition group-hover:opacity-100" />
                  <Icon size={22} className="text-cyan transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" aria-hidden />
                  <span>
                    <span className="block font-display text-lg font-semibold leading-tight text-white">{s.name}</span>
                    <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-muted">{s.kind}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </Reveal>

      {/* Controls */}
      <Reveal>
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <LayoutGroup id="skill-cats">
            <div role="tablist" aria-label="Skill categories" className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1">
              {categories.map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={filter === c}
                  onClick={() => setFilter(c)}
                  className={`relative shrink-0 rounded-full px-4 py-2.5 text-sm transition ${filter === c ? 'text-white' : 'text-slate hover:text-white'}`}
                >
                  {filter === c && <motion.span layoutId="cat-pill" className="absolute inset-0 -z-10 rounded-full bg-royal/30 ring-1 ring-cyan/40" />}
                  {c}
                </button>
              ))}
            </div>
          </LayoutGroup>
          <label className="relative block w-full lg:w-72">
            <span className="sr-only">Search skills</span>
            <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search skills…"
              className="h-12 w-full rounded-full hairline bg-ink-850/80 pl-11 pr-4 text-sm text-mist placeholder:text-muted focus:border-cyan/50 focus:outline-none focus:ring-2 focus:ring-cyan/20"
            />
          </label>
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Grid */}
        <motion.ul layout className="grid content-start gap-3 sm:grid-cols-2" aria-live="polite">
          <AnimatePresence mode="popLayout">
            {visible.map((s) => {
              const Icon = skillIcon[s.id] ?? fallbackIcon
              const on = active === s.id
              const c = connectionsFor(s.id)
              const linked = c.projects.length + c.certificates.length + c.experience.length
              return (
                <motion.li
                  key={s.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                >
                  <button
                    onClick={() => toggle(s.id)}
                    aria-pressed={on}
                    className={`group flex h-full w-full items-start gap-4 rounded-2xl p-5 text-left transition duration-300 ${
                      on ? 'bg-royal/20 ring-1 ring-cyan/50' : 'surface glow-ring'
                    }`}
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-royal/15 text-cyan ring-1 ring-azure/20 transition duration-300 group-hover:rotate-[-6deg] group-hover:bg-royal/30">
                      <Icon size={19} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-white">{s.name}</span>
                        {linked > 0 && (
                          <span className="flex items-center gap-1 font-mono text-[10px] text-cyan" title="Linked projects, certificates and experience">
                            <FolderGit2 size={11} aria-hidden /> {linked}
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-wider text-muted">
                        {s.kind} · {s.category}
                      </span>
                      <span className="mt-2 block text-sm leading-relaxed text-slate">{s.description}</span>
                    </span>
                  </button>
                </motion.li>
              )
            })}
          </AnimatePresence>
          {visible.length === 0 && (
            <li className="col-span-full rounded-2xl hairline p-8 text-center text-slate">
              No verified skill matches “{query}”.
              <button className="ml-2 text-cyan underline-offset-4 hover:underline" onClick={() => setQuery('')}>
                Clear search
              </button>
            </li>
          )}
        </motion.ul>

        {/* Connection panel */}
        <aside aria-live="polite" aria-label="Where this skill is used" className="lg:sticky lg:top-24 lg:self-start">
          <div className="glass relative overflow-hidden rounded-3xl p-6">
            <div aria-hidden className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan/20 blur-3xl" />
            {!activeSkill ? (
              <div className="relative">
                <p className="eyebrow">Skill → Proof</p>
                <p className="mt-3 text-lg font-semibold text-white">Select any skill</p>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  See the internships, projects and certificates behind it. Related cards further down the page light up too.
                </p>
                <div className="mt-6 flex items-center gap-2 font-mono text-xs text-muted" aria-hidden>
                  <span className="rounded-md bg-royal/20 px-2 py-1 text-ice">Skill</span>
                  <ArrowRight size={12} />
                  <span className="rounded-md bg-royal/20 px-2 py-1 text-ice">Work</span>
                  <ArrowRight size={12} />
                  <span className="rounded-md bg-royal/20 px-2 py-1 text-ice">Credential</span>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="eyebrow">Where it shows up</p>
                    <p className="mt-2 font-display text-2xl font-semibold text-white">{activeSkill.name}</p>
                  </div>
                  <button
                    onClick={() => setActive(null)}
                    aria-label="Clear selected skill"
                    className="grid h-9 w-9 place-items-center rounded-full bg-ink-900/60 text-slate hover:text-white"
                  >
                    <X size={15} />
                  </button>
                </div>
                <p className="mt-3 text-sm text-slate">
                  <span className="text-muted">Evidence: </span>
                  {activeSkill.evidence}
                </p>
                <ul className="mt-5 max-h-[340px] space-y-2 overflow-y-auto pr-1">
                  {links!.experience.map((e) => (
                    <li key={e.id}>
                      <a href="#experience" className="group flex items-center gap-3 rounded-xl bg-ink-900/50 p-3 text-sm text-mist ring-1 ring-azure/10 transition hover:ring-cyan/40">
                        <Briefcase size={16} className="shrink-0 text-cyan" aria-hidden />
                        <span className="flex-1">
                          {e.role} · {e.org}
                        </span>
                        <ArrowRight size={14} className="text-muted transition group-hover:translate-x-0.5 group-hover:text-cyan" aria-hidden />
                      </a>
                    </li>
                  ))}
                  {links!.projects.map((p) => (
                    <li key={p.id}>
                      <a href="#projects" className="group flex items-center gap-3 rounded-xl bg-ink-900/50 p-3 text-sm text-mist ring-1 ring-azure/10 transition hover:ring-cyan/40">
                        <FolderGit2 size={16} className="shrink-0 text-cyan" aria-hidden />
                        <span className="flex-1">{p.title}</span>
                        <ArrowRight size={14} className="text-muted transition group-hover:translate-x-0.5 group-hover:text-cyan" aria-hidden />
                      </a>
                    </li>
                  ))}
                  {links!.certificates.map((c) => (
                    <li key={c.id}>
                      <a href="#credentials" className="group flex items-center gap-3 rounded-xl bg-ink-900/50 p-3 text-sm text-mist ring-1 ring-azure/10 transition hover:ring-cyan/40">
                        <Award size={16} className="shrink-0 text-cyan" aria-hidden />
                        <span className="flex-1">
                          {c.name} · {c.issuer}
                        </span>
                        <ArrowRight size={14} className="text-muted transition group-hover:translate-x-0.5 group-hover:text-cyan" aria-hidden />
                      </a>
                    </li>
                  ))}
                  {links!.projects.length + links!.certificates.length + links!.experience.length === 0 && (
                    <li className="rounded-xl bg-ink-900/40 p-3 text-sm text-muted">Demonstrated through practice and activities rather than a listed project.</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Recruiter summary */}
      <Reveal>
        <div className="mt-14 flex flex-col gap-4 rounded-2xl border border-azure/15 bg-gradient-to-r from-royal/15 via-ink-850/40 to-cyan/10 p-6 md:flex-row md:items-center md:gap-8">
          <p className="eyebrow shrink-0">Core Technical Stack</p>
          <p className="font-display text-lg text-white md:text-xl">
            {core.map((c, i) => (
              <span key={c}>
                {c}
                {i < core.length - 1 && (
                  <>
                    <span className="sr-only">, </span>
                    <span className="mx-2.5 text-cyan" aria-hidden>
                      •
                    </span>
                  </>
                )}
              </span>
            ))}
          </p>
        </div>
      </Reveal>
    </Section>
  )
}
