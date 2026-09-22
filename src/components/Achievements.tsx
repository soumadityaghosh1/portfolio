import { Award, BadgeCheck, Flag, Trophy, Users } from 'lucide-react'
import { activities, certificates } from '../data/profile'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { SourceTag } from './ui/SourceTag'

const groups = [
  { key: 'hackathon', title: 'Hackathons & Events', icon: Trophy },
  { key: 'program', title: 'Programs & Leadership', icon: Flag },
  { key: 'community', title: 'Community & Workshops', icon: Users },
] as const

export function Achievements() {
  return (
    <Section
      id="achievements"
      index="07"
      eyebrow="Achievements & activities"
      title={
        <>
          Showing up, <span className="text-gradient">on and off the keyboard.</span>
        </>
      }
      intro="Participation is listed as participation — no ranks, prizes or outcomes are claimed unless published."
    >
      <div className="grid gap-6 lg:grid-cols-4">
        <Reveal className="lg:col-span-1">
          <div className="h-full rounded-3xl border border-cyan/25 bg-gradient-to-b from-royal/25 to-ink-850/60 p-6">
            <div className="flex items-center gap-3">
              <Award size={20} className="text-cyan" aria-hidden />
              <h3 className="font-semibold text-white">Certifications</h3>
            </div>
            <ul className="mt-5 space-y-1">
              {[...certificates]
                .sort((x, y) => y.sortKey - x.sortKey)
                .map((c) => (
                  <li key={c.id}>
                    <a href="#credentials" className="group flex items-start gap-2 rounded-lg px-2 py-2 transition hover:bg-ink-900/50">
                      {c.verifyUrl ? (
                        <BadgeCheck size={15} className="mt-0.5 shrink-0 text-cyan" aria-label="Verified" />
                      ) : (
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-azure/60" aria-hidden />
                      )}
                      <span>
                        <span className="block text-sm font-medium text-mist group-hover:text-white">{c.name}</span>
                        <span className="block text-xs text-muted">{c.issuer}</span>
                      </span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </Reveal>

        {groups.map((g, gi) => (
          <Reveal key={g.key} delay={0.06 * (gi + 1)}>
            <div className="surface h-full rounded-3xl p-6">
              <div className="flex items-center gap-3">
                <g.icon size={20} className="text-cyan" aria-hidden />
                <h3 className="font-semibold text-white">{g.title}</h3>
              </div>
              <ul className="mt-5 space-y-4">
                {activities
                  .filter((a) => a.group === g.key)
                  .map((a) => (
                    <li key={a.title} className="border-l border-azure/20 pl-4 transition hover:border-cyan">
                      <p className="font-medium text-mist">{a.title}</p>
                      <p className="mt-0.5 text-sm text-slate">{a.detail}</p>
                      {a.source !== 'profile' && <SourceTag source={a.source} className="mt-2" />}
                    </li>
                  ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
