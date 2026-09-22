/** Illustrative technical visuals (not screenshots) — generated artwork for each project. */

export function LaneVisual({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label="Illustration: road with detected lane lines and a predicted steering angle">
      <defs>
        <linearGradient id="lv-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1a3d" />
          <stop offset="1" stopColor="#050b1f" />
        </linearGradient>
        <linearGradient id="lv-road" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f2250" />
          <stop offset="1" stopColor="#081230" />
        </linearGradient>
        <linearGradient id="lv-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#38bdf8" stopOpacity="0.05" />
          <stop offset="1" stopColor="#38bdf8" stopOpacity="0.28" />
        </linearGradient>
        <pattern id="lv-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="#60a5fa" strokeOpacity="0.08" />
        </pattern>
      </defs>
      <rect width="640" height="400" fill="url(#lv-sky)" />
      <rect width="640" height="400" fill="url(#lv-grid)" />
      {/* horizon */}
      <line x1="0" y1="170" x2="640" y2="170" stroke="#60a5fa" strokeOpacity="0.2" />
      {/* road */}
      <path d="M300 170 L340 170 L620 400 L20 400 Z" fill="url(#lv-road)" />
      {/* detected lane polygon */}
      <path d="M306 176 L334 176 L520 400 L120 400 Z" fill="url(#lv-fill)" />
      <path d="M306 176 L120 400" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
      <path d="M334 176 L520 400" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
      {/* center dashes */}
      {[0, 1, 2, 3].map((i) => {
        const t0 = 0.12 + i * 0.24
        const t1 = t0 + 0.1
        const y = (t: number) => 176 + t * 224
        return <line key={i} x1="320" y1={y(t0)} x2="320" y2={y(t1)} stroke="#e6edf8" strokeOpacity={0.35 + i * 0.12} strokeWidth={2 + i * 1.5} />
      })}
      {/* bounding boxes / markers */}
      {[
        [306, 176],
        [334, 176],
        [213, 288],
        [427, 288],
      ].map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 7} y={y - 7} width="14" height="14" fill="none" stroke="#bae6fd" strokeWidth="1.5" />
          <circle cx={x} cy={y} r="2" fill="#bae6fd" />
        </g>
      ))}
      {/* steering HUD */}
      <g transform="translate(450 84)">
        <circle r="46" fill="#050b1f" fillOpacity="0.7" stroke="#60a5fa" strokeOpacity="0.35" />
        <path d="M-36 0 A36 36 0 0 1 36 0" fill="none" stroke="#1e40af" strokeWidth="6" strokeLinecap="round" />
        <path d="M0 -36 A36 36 0 0 1 21 -29" fill="none" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
        <line x1="0" y1="0" x2="17" y2="-32" stroke="#e6edf8" strokeWidth="2.5" strokeLinecap="round" />
        <circle r="4" fill="#38bdf8" />
        <text y="26" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#93a4c3">
          STEER θ
        </text>
      </g>
      <g fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#93a4c3">
        <text x="140" y="44">lane_detection</text>
        <text x="140" y="62" fill="#38bdf8">● tracking</text>
      </g>
    </svg>
  )
}

export function StockVisual({ className = '' }: { className?: string }) {
  const hist = [260, 250, 262, 240, 246, 228, 236, 214, 222, 205, 212, 196, 204, 188]
  const step = 24
  const x0 = 40
  const histPts = hist.map((y, i) => `${x0 + i * step},${y}`).join(' ')
  const lastX = x0 + (hist.length - 1) * step
  const lastY = hist[hist.length - 1]
  const fc = [180, 174, 168, 158, 152, 144, 140]
  const fcPts = [`${lastX},${lastY}`, ...fc.map((y, i) => `${lastX + (i + 1) * step},${y}`)].join(' ')
  const band =
    [`${lastX},${lastY}`, ...fc.map((y, i) => `${lastX + (i + 1) * step},${y - 8 - i * 5}`)].join(' ') +
    ' ' +
    [...fc.map((y, i) => `${lastX + (i + 1) * step},${y + 8 + i * 5}`)].reverse().join(' ')

  return (
    <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label="Illustration: historical price line followed by a dashed forecast with an uncertainty band">
      <defs>
        <linearGradient id="sv-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0b1a3d" />
          <stop offset="1" stopColor="#050b1f" />
        </linearGradient>
        <linearGradient id="sv-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b82f6" stopOpacity="0.35" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="640" height="400" fill="url(#sv-bg)" />
      {[80, 140, 200, 260, 320].map((y) => (
        <line key={y} x1="40" x2="600" y1={y} y2={y} stroke="#60a5fa" strokeOpacity="0.08" />
      ))}
      {/* candles */}
      {hist.map((y, i) => {
        const up = i > 0 && y < hist[i - 1]
        return <rect key={i} x={x0 + i * step - 3} y={y - 10} width="6" height="20" rx="1" fill={up ? '#38bdf8' : '#1e40af'} opacity="0.5" />
      })}
      <polygon points={`${x0},340 ${histPts} ${lastX},340`} fill="url(#sv-area)" />
      <polyline points={histPts} fill="none" stroke="#60a5fa" strokeWidth="3" strokeLinejoin="round" />
      {/* forecast */}
      <line x1={lastX} x2={lastX} y1="60" y2="340" stroke="#bae6fd" strokeOpacity="0.3" strokeDasharray="4 6" />
      <polygon points={band} fill="#38bdf8" opacity="0.14" />
      <polyline points={fcPts} fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="8 7" strokeLinecap="round" />
      <circle cx={lastX} cy={lastY} r="6" fill="#050b1f" stroke="#38bdf8" strokeWidth="3" />
      <g fontFamily="JetBrains Mono, monospace" fontSize="11">
        <text x={lastX - 8} y="52" textAnchor="end" fill="#93a4c3">history</text>
        <text x={lastX + 8} y="52" fill="#38bdf8">forecast →</text>
        <text x="130" y="36" fill="#93a4c3">PredictaStock</text>
      </g>
    </svg>
  )
}
