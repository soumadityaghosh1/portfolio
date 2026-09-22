import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const styles: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-royal to-electric text-white shadow-[0_10px_40px_-10px_rgba(37,99,235,0.8)] hover:shadow-[0_14px_50px_-8px_rgba(56,189,248,0.7)]',
  secondary: 'hairline bg-ink-800/60 text-mist hover:border-cyan/50 hover:text-white',
  ghost: 'text-slate hover:text-white',
}

type Props = {
  children: ReactNode
  href: string
  variant?: Variant
  strength?: number
  className?: string
  external?: boolean
  title?: string
  'aria-label'?: string
}

export function MagneticLink({ children, href, variant = 'primary', strength = 0.3, className = '', external, ...rest }: Props) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 18 })
  const sy = useSpring(y, { stiffness: 250, damping: 18 })

  return (
    <motion.a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse') return
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
      className={`group relative inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-[color,box-shadow,border-color] duration-300 ${styles[variant]} ${className}`}
    >
      {children}
    </motion.a>
  )
}
