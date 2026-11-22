import { useEffect } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

/*
  "The Stack" — an isometric, exploded view of a full-stack application:
  interface → service → data. It represents the way Jana works: across
  every layer of a product. Pure CSS 3D + Framer Motion, no images.
*/

const LAYER = 280 // px, side of each plane
const GAP = 92 // px, vertical distance between planes

function Plane({ z, delay, children, tone = 'surface', label }) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ width: LAYER, height: LAYER, marginLeft: -LAYER / 2, marginTop: -LAYER / 2, transformStyle: 'preserve-3d' }}
      initial={{ z: z - 60, opacity: 0 }}
      animate={{ z, opacity: 1 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay }}
    >
      <div
        className={`relative h-full w-full overflow-hidden rounded-[28px] border p-5 ${
          tone === 'glass' ? 'bg-surface/80' : 'bg-bg2/90'
        }`}
        style={{
          borderColor: 'rgb(var(--line) / calc(var(--line-a) * 1.8))',
          boxShadow: '0 40px 60px -30px rgb(0 0 0 / 0.45), inset 0 1px 0 rgb(255 255 255 / 0.04)',
        }}
      >
        <span className="absolute right-4 top-4 font-mono text-[9px] uppercase tracking-[0.2em] text-muted/80">
          {label}
        </span>
        {children}
      </div>
    </motion.div>
  )
}

function DataLayer() {
  const rows = [
    [0.9, 0.5, 0.3],
    [0.7, 0.8, 0.45],
    [0.5, 0.35, 0.7],
    [0.8, 0.6, 0.25],
    [0.6, 0.9, 0.5],
  ]
  return (
    <div className="flex h-full flex-col">
      <p className="font-mono text-[10px] text-accent2">db.orders</p>
      <div className="mt-4 grid flex-1 grid-rows-5 gap-2">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-[18px_1fr_1fr_1fr] items-center gap-2">
            <span className="font-mono text-[9px] text-muted/70">{i + 1}</span>
            {r.map((w, j) => (
              <span key={j} className="h-[7px] rounded-full bg-ink/10" style={{ width: `${w * 100}%` }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function ServiceLayer() {
  const routes = [
    ['GET', '/api/products', '200'],
    ['POST', '/auth/token', '201'],
    ['PUT', '/orders/:id', '200'],
    ['DEL', '/cart/:item', '204'],
  ]
  return (
    <div className="flex h-full flex-col">
      <p className="font-mono text-[10px] text-accent">server.routes</p>
      <ul className="mt-4 flex flex-1 flex-col justify-between">
        {routes.map(([m, p, s]) => (
          <li key={p} className="flex items-center gap-2 rounded-lg border hairline bg-bg/60 px-2.5 py-2 font-mono text-[10px]">
            <span className="w-8 text-accent">{m}</span>
            <span className="flex-1 truncate text-ink/80">{p}</span>
            <span className="text-accent2">{s}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function InterfaceLayer() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-ink/20" />
        <span className="h-2 w-2 rounded-full bg-ink/20" />
        <span className="h-2 w-2 rounded-full bg-ink/20" />
      </div>
      <span className="mt-2 h-3.5 w-3/4 rounded-full bg-ink/80" />
      <span className="h-3.5 w-1/2 rounded-full bg-ink/80" />
      <span className="mt-1 h-2 w-2/3 rounded-full bg-ink/15" />
      <div className="mt-auto grid grid-cols-3 gap-2">
        <span className="aspect-square rounded-xl bg-gradient-to-br from-accent/70 to-accent2/50" />
        <span className="aspect-square rounded-xl bg-ink/10" />
        <span className="aspect-square rounded-xl bg-ink/10" />
      </div>
      <span className="h-8 w-28 rounded-full bg-accent" />
    </div>
  )
}

function Pulse({ x, y, delay }) {
  const reduce = useReducedMotion()
  return (
    <motion.span
      aria-hidden="true"
      className="absolute h-2 w-2 rounded-full bg-accent2"
      style={{ left: x, top: y, boxShadow: '0 0 14px 3px rgb(var(--accent-2) / 0.7)' }}
      initial={{ z: 0, opacity: 0 }}
      animate={reduce ? { z: GAP, opacity: 1 } : { z: [0, GAP * 2], opacity: [0, 1, 1, 0] }}
      transition={reduce ? { duration: 0 } : { duration: 3.2, ease: 'easeInOut', repeat: Infinity, delay, repeatDelay: 0.6 }}
    />
  )
}

function Post({ x, y }) {
  // A vertical connector standing on the base plane (rotated up into Z).
  return (
    <span
      aria-hidden="true"
      className="absolute w-px"
      style={{
        left: x,
        top: y,
        height: GAP * 2,
        transformOrigin: 'top',
        transform: 'rotateX(90deg)',
        background: 'linear-gradient(to bottom, rgb(var(--accent) / 0.0), rgb(var(--accent) / 0.55))',
      }}
    />
  )
}

export function HeroVisual() {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 18 })
  const sy = useSpring(my, { stiffness: 60, damping: 18 })
  const rotateZ = useTransform(sx, [-1, 1], [-44, -32])
  const rotateX = useTransform(sy, [-1, 1], [60, 50])

  useEffect(() => {
    if (reduce) return
    const onMove = (e) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1)
      my.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduce, mx, my])

  const inset = 22
  const far = LAYER - inset

  return (
    <div
      role="img"
      aria-label="An exploded, isometric illustration of a full-stack application: an interface layer floating above a server routes layer, above a database layer, connected by light pulses."
      className="relative mx-auto aspect-square w-full max-w-[540px]"
      style={{ perspective: 1600 }}
    >
      {/* soft floor glow */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[62%] h-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgb(var(--accent) / var(--glow-a)), transparent)' }}
      />
      <div className="absolute inset-0 origin-center scale-[0.66] sm:scale-[0.86] lg:scale-100" style={{ transformStyle: 'preserve-3d' }}>
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: 'preserve-3d', rotateX, rotateZ, y: 40 }}
      >
        <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
          <Plane z={0} delay={0.5} label="data">
            <DataLayer />
          </Plane>
          <Plane z={GAP} delay={0.65} label="service">
            <ServiceLayer />
          </Plane>
          <Plane z={GAP * 2} delay={0.8} tone="glass" label="interface">
            <InterfaceLayer />
          </Plane>

          {/* connectors + pulses live in the base plane's coordinate space */}
          <div
            className="absolute left-1/2 top-1/2"
            style={{ width: LAYER, height: LAYER, marginLeft: -LAYER / 2, marginTop: -LAYER / 2, transformStyle: 'preserve-3d' }}
          >
            <Post x={inset} y={inset} />
            <Post x={far} y={inset} />
            <Post x={inset} y={far} />
            <Post x={far} y={far} />
            <Pulse x={LAYER * 0.5} y={LAYER * 0.5} delay={1.2} />
            <Pulse x={LAYER * 0.3} y={LAYER * 0.7} delay={2.4} />
            <Pulse x={LAYER * 0.72} y={LAYER * 0.32} delay={3.3} />
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  )
}
