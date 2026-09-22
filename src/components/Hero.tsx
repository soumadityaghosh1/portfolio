import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Binary, BrainCircuit, Code2, Database, MapPin } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { links, person } from '../data/profile'
import { Particles, Streaks } from './Ambient'
import { SocialIcon } from './ui/Icons'
import { MagneticLink } from './ui/Magnetic'

const ease = [0.22, 1, 0.36, 1] as const

function RotatingRole() {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setI((v) => (v + 1) % person.rotatingRoles.length), 2600)
    return () => clearInterval(t)
  }, [reduce])
  return (
    <span className="relative inline-flex h-[1.4em] overflow-hidden align-bottom" aria-live="off">
      <AnimatePresence mode="wait">
        <motion.span
          key={person.rotatingRoles[i]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease }}
          className="text-gradient whitespace-nowrap font-semibold"
        >
          {person.rotatingRoles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function ProfilePhoto({ className = '' }: { className?: string }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={`relative overflow-hidden rounded-full ${className}`}>
      {!failed ? (
        <picture>
          <source srcSet={person.photo.webp} type="image/webp" />
          <img
            src={person.photo.jpg}
            alt="Portrait of Soumaditya Ghosh"
            width={660}
            height={660}
            fetchPriority="high"
            decoding="async"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        </picture>
      ) : (
        <div
          role="img"
          aria-label="Soumaditya Ghosh monogram (profile photo pending)"
          className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_30%_25%,#1d4ed8,#0b1a3d_60%,#050b1f)]"
        >
          <span className="font-display text-[clamp(4rem,12vw,8rem)] font-bold tracking-tighter text-gradient">SG</span>
        </div>
      )}
    </div>
  )
}

const chips = [
  { icon: Code2, label: 'Code', sub: 'Python · C++ · Java', pos: 'left-[-6%] top-[14%]', delay: 0 },
  { icon: BrainCircuit, label: 'AI / ML', sub: 'OpenCV · Python for AI', pos: 'right-[-10%] top-[6%]', delay: 1.2 },
  { icon: Binary, label: 'DSA', sub: 'LeetCode', pos: 'left-[-12%] bottom-[16%]', delay: 2.1 },
  { icon: Database, label: 'SQL', sub: 'HackerRank', pos: 'right-[-4%] bottom-[8%]', delay: 0.6 },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90])
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const words = ['Hi,', 'I’m']
  const social = links

  return (
    <section id="home" ref={ref} aria-label="Introduction" className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 md:pt-24">
      <Particles />
      <Streaks />

      <motion.div style={{ opacity: fade }} className="container-x relative grid items-center gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
        {/* Photo first on mobile so it stays highly visible */}
        <motion.div style={{ y: photoY }} className="order-first mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:order-last lg:max-w-[420px]">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease, delay: 0.15 }}
            className="relative aspect-square"
          >
            {/* ambient glow */}
            <div aria-hidden className="absolute inset-[-18%] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.55),rgba(56,189,248,0.15)_45%,transparent_70%)] blur-2xl" />
            {/* orbit rings */}
            <div aria-hidden className="absolute inset-[-7%] rounded-full border border-azure/15" />
            <div aria-hidden className="absolute inset-[-7%] animate-[spin_40s_linear_infinite] rounded-full">
              <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_14px_3px_rgba(56,189,248,0.8)]" />
            </div>
            <div aria-hidden className="absolute inset-[-14%] rounded-full border border-dashed border-azure/10" />
            {/* gradient ring */}
            <div className="relative h-full w-full rounded-full bg-gradient-to-br from-cyan via-electric to-royal p-[3px] shadow-[0_30px_80px_-20px_rgba(37,99,235,0.8)]">
              <ProfilePhoto className="h-full w-full bg-ink-850" />
            </div>
            {person.openToWork && (
              <span className="glass absolute bottom-[2%] left-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.7)]">
                <span className="relative flex h-2 w-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Open to opportunities
              </span>
            )}

            {chips.map((c) => (
              <motion.div
                key={c.label}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + c.delay * 0.2, duration: 0.6, ease }}
                className={`absolute ${c.pos} hidden sm:block`}
              >
                <div className="glass flex animate-float items-center gap-2.5 rounded-2xl px-3 py-2 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]" style={{ animationDelay: `${c.delay}s` }}>
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-royal/25 text-cyan">
                    <c.icon size={16} aria-hidden />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-xs font-semibold text-white">{c.label}</span>
                    <span className="block font-mono text-[10px] text-slate">{c.sub}</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div style={{ y: textY }} className="text-center lg:text-left">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full hairline bg-ink-850/60 px-4 py-1.5 text-left font-mono text-[10px] uppercase tracking-[0.1em] text-ice sm:text-[11px] sm:tracking-[0.14em]"
          >
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            <span>{person.statusLine.join(' • ')}</span>
          </motion.p>

          <h1 className="font-display text-[clamp(2.5rem,6.2vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.035em] text-white">
            {words.map((w, i) => (
              <motion.span
                key={w}
                className="mr-[0.25em] inline-block"
                initial={reduce ? false : { opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.1 + i * 0.08 }}
              >
                {w}
              </motion.span>
            ))}
            <br className="hidden sm:block" />
            <motion.span
              className="inline-block text-gradient sm:whitespace-nowrap"
              initial={reduce ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
            >
              Soumaditya Ghosh.
            </motion.span>
          </h1>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            <p className="mt-6 text-lg text-mist md:text-xl">
              <span className="sr-only">B.Tech Computer Science student, Python and AI intern, computer vision learner and problem solver. </span>
              <span aria-hidden className="block">
                <RotatingRole />
              </span>
              <span className="mt-1 block text-slate">Building at the edge of software &amp; AI.</span>
            </p>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate lg:mx-0">{person.intro}</p>

            <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted">
              <MapPin size={14} className="text-cyan" aria-hidden /> {person.location}
            </p>

            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <MagneticLink href="#projects" className="w-full sm:w-auto">
                View My Work <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </MagneticLink>
              <MagneticLink href="#contact" variant="secondary" className="w-full sm:w-auto">
                Connect With Me
              </MagneticLink>
              <div className="flex items-center gap-2 sm:ml-2">
                {social.map((s) => (
                  <a
                    key={s.kind}
                    href={s.href}
                    {...(s.kind === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                    aria-label={s.kind === 'email' ? `Email ${s.handle}` : `${s.label} (opens in new tab)`}
                    title={s.label}
                    className="grid h-12 w-12 place-items-center rounded-full hairline bg-ink-800/50 text-slate transition hover:border-cyan/50 hover:text-cyan hover:shadow-[0_0_24px_-4px_rgba(56,189,248,0.6)]"
                  >
                    <SocialIcon kind={s.kind} className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition hover:text-cyan md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="relative flex h-10 w-6 justify-center rounded-full border border-azure/25">
          <motion.span
            className="mt-2 h-2 w-1 rounded-full bg-cyan"
            animate={reduce ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </a>
    </section>
  )
}
