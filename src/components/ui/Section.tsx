import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Props = {
  id: string
  index: string
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  children: ReactNode
  className?: string
  aside?: ReactNode
}

export function Section({ id, index, eyebrow, title, intro, children, className = '', aside }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative py-24 md:py-32 ${className}`}>
      <div className="container-x">
        <header className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <p className="eyebrow mb-4 flex items-center gap-3">
              <span className="text-muted">{index}</span>
              <span className="h-px w-8 bg-cyan/50" aria-hidden />
              {eyebrow}
            </p>
            <h2 id={`${id}-title`} className="text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
              {title}
            </h2>
            {intro && <p className="mt-5 text-base leading-relaxed text-slate md:text-lg">{intro}</p>}
          </Reveal>
          {aside && <Reveal delay={0.1}>{aside}</Reveal>}
        </header>
        {children}
      </div>
    </section>
  )
}
