import { animate, useInView, useReducedMotion } from 'framer-motion'
import { Briefcase, Compass, GraduationCap, MapPin, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { activities, certificates, education, experience, person, projects } from '../data/profile'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(reduce ? to : 0)
  useEffect(() => {
    if (!inView || reduce) return
    const c = animate(0, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setVal(Math.round(v)) })
    return () => c.stop()
  }, [inView, to, reduce])
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  )
}

// Every stat is derived from the data file — nothing is hard-coded.
const internships = experience.filter((e) => e.kind === 'internship').length
const stats = [
  { value: internships, label: internships === 1 ? 'Internship' : 'Internships' },
  { value: certificates.length, label: 'Credentials' },
  { value: projects.length, label: 'Featured projects' },
  { value: activities.length, label: 'Events & programmes' },
]

export function About() {
  const facts = [
    { icon: GraduationCap, label: 'Education', value: education.degree, sub: `${education.school} · ${education.period}` },
    { icon: MapPin, label: 'Based in', value: person.location },
    { icon: Briefcase, label: 'Currently', value: person.currentAssociation },
    { icon: Compass, label: 'Areas of interest', value: person.interests.join(' · ') },
    { icon: Sparkles, label: 'Learning focus', value: person.learningFocus.join(' · ') },
  ]

  return (
    <Section
      id="about"
      index="01"
      eyebrow="About"
      title={
        <>
          Curious by default. <span className="text-gradient">Consistent by choice.</span>
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="space-y-6 text-lg leading-[1.8] text-slate">
          <Reveal>
            <p>
              I’m a B.Tech Computer Science student at <span className="text-mist">Sikkim Manipal Institute of Technology</span>, from{' '}
              <span className="text-mist">Kokrajhar, Assam</span>. I like the moment a vague idea turns into something that actually runs, and
              the problem solving it takes to get there.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p>
              Most of that work happens in <span className="text-mist">Python and AI</span>. I intern at <span className="text-mist">ByoSync</span>,
              completed a Python for AI internship with <span className="text-mist">Bleep Education and E-cell IIT Bombay</span>, and worked as an{' '}
              <span className="text-mist">Artificial Intelligence Intern at Codec Technologies</span>. My projects run from{' '}
              <span className="text-mist">lane detection and steering-angle prediction</span> in computer vision to{' '}
              <span className="text-mist">PredictaStock</span>, an AI-powered stock forecasting platform.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              Underneath it all is steady practice: <span className="text-mist">data structures in C++ and Java</span>, a 30-day LeetCode challenge,
              certificates in Python, OpenCV and Hedera, and SQL basics on HackerRank. Outside the editor I show up for the campus community through
              hackathons, tech fests, workshops, Model UN and event management.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl hairline bg-azure/10 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-ink-900/90 p-5">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-4xl font-semibold text-white">
                    <Counter to={s.value} />
                  </dd>
                  <p aria-hidden className="mt-1 text-xs leading-snug text-muted">
                    {s.label}
                  </p>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <aside aria-label="Quick facts" className="surface relative overflow-hidden rounded-3xl p-2">
            <div aria-hidden className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-royal/30 blur-3xl" />
            <ul className="relative divide-y divide-azure/10">
              {facts.map((f) => (
                <li key={f.label} className="flex gap-4 p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-royal/15 text-cyan ring-1 ring-azure/20">
                    <f.icon size={18} aria-hidden />
                  </span>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{f.label}</p>
                    <p className="mt-1 text-[15px] leading-snug text-mist">{f.value}</p>
                    {f.sub && <p className="mt-0.5 text-sm text-slate">{f.sub}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </Reveal>
      </div>
    </Section>
  )
}
