import { useEffect, useRef } from 'react'

/** Fixed, page-wide blue atmosphere: drifting gradient mesh + fine grid. Pure CSS, GPU-cheap. */
export function Ambient() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-900">
      <div className="absolute -left-1/4 -top-1/4 h-[80vmax] w-[80vmax] animate-drift-a rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.28),transparent_60%)] blur-3xl" />
      <div className="absolute -bottom-1/3 -right-1/4 h-[70vmax] w-[70vmax] animate-drift-b rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.16),transparent_60%)] blur-3xl" />
      <div className="absolute left-1/3 top-1/2 h-[50vmax] w-[50vmax] animate-drift-b rounded-full bg-[radial-gradient(circle,rgba(30,64,175,0.22),transparent_65%)] blur-3xl" />
      <div className="grid-texture absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_40%,rgba(3,8,23,0.7))]" />
    </div>
  )
}

/** Soft floating points for the hero. Pauses off-screen; disabled for reduced motion. */
export function Particles() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    const count = window.innerWidth < 768 ? 28 : 60
    const pts = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.00012,
      vy: -Math.random() * 0.00018 - 0.00004,
      a: Math.random() * 0.5 + 0.2,
    }))

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        p.x += p.vx
        p.y += p.vy
        if (p.y < -0.02) p.y = 1.02
        if (p.x < -0.02) p.x = 1.02
        if (p.x > 1.02) p.x = -0.02
        ctx.beginPath()
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(147, 197, 253, ${p.a})`
        ctx.fill()
      }
      if (visible) raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) raf = requestAnimationFrame(tick)
    })

    resize()
    io.observe(canvas)
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
}

/** Slow light streaks crossing the hero. */
export function Streaks() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {[
        { top: '22%', delay: '0s', dur: '11s' },
        { top: '58%', delay: '4s', dur: '14s' },
        { top: '80%', delay: '8s', dur: '12s' },
      ].map((s, i) => (
        <span
          key={i}
          className="absolute left-0 h-px w-[40vw] animate-streak bg-gradient-to-r from-transparent via-cyan/60 to-transparent"
          style={{ top: s.top, animationDelay: s.delay, animationDuration: s.dur }}
        />
      ))}
    </div>
  )
}

/** Desktop-only cursor light that follows the pointer. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = ref.current
    if (!el || !fine || reduce) return
    el.style.opacity = '1'
    let x = 0
    let y = 0
    let cx = 0
    let cy = 0
    let raf = 0
    const move = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
    }
    const loop = () => {
      cx += (x - cx) * 0.12
      cy += (y - cy) * 0.12
      el.style.transform = `translate3d(${cx - 300}px, ${cy - 300}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', move)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
    }
  }, [])
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-[600px] w-[600px] rounded-full opacity-0 transition-opacity duration-700"
      style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.09), transparent 60%)' }}
    />
  )
}
