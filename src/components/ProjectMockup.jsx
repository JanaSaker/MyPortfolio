import { useLayoutEffect, useRef, useState } from 'react'
import { Headphones, Laptop, Monitor, Smartphone, Keyboard, Camera } from 'lucide-react'

/*
  Custom, code-drawn product previews (no screenshots or stock imagery).
  Each mockup is designed on a fixed 960×600 canvas and scaled to fit its
  container, so it stays pixel-crisp on every screen size.
  These are illustrative interface studies, not screenshots of live products.
*/

const W = 960
const H = 600

export const hues = {
  violet: { a: '#9275FF', b: '#7CB7FF', soft: 'rgba(146,117,255,0.14)' },
  rose: { a: '#F29BB8', b: '#F6C9A8', soft: 'rgba(242,155,184,0.14)' },
  blue: { a: '#7CB7FF', b: '#5EE0C1', soft: 'rgba(124,183,255,0.14)' },
  teal: { a: '#5EE0C1', b: '#9275FF', soft: 'rgba(94,224,193,0.14)' },
}

function Scaled({ children }) {
  const ref = useRef(null)
  const [scale, setScale] = useState(0.5)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / W))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ aspectRatio: `${W} / ${H}` }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  )
}

function Window({ title, children }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[18px] border border-white/10 bg-[#0F1117] text-[#E9E9E6] shadow-2xl">
      <div className="flex h-11 shrink-0 items-center gap-2 border-b border-white/[0.07] px-4">
        <span className="h-3 w-3 rounded-full bg-white/15" />
        <span className="h-3 w-3 rounded-full bg-white/15" />
        <span className="h-3 w-3 rounded-full bg-white/15" />
        <span className="mx-auto flex h-6 w-72 items-center justify-center rounded-md bg-white/[0.05] font-mono text-[11px] text-white/45">
          {title}
        </span>
        <span className="w-12" />
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  )
}

const bar = (w, o = 0.12, h = 8) => (
  <span className="block rounded-full" style={{ width: w, height: h, background: `rgba(255,255,255,${o})` }} />
)

/* ── DevLoop: developer community feed ─────────────────────────── */
function DevLoopUI({ c }) {
  return (
    <div className="grid h-full grid-cols-[190px_1fr_210px]">
      <aside className="space-y-5 border-r border-white/[0.06] p-5">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg font-mono text-[13px] font-bold text-black" style={{ background: c.a }}>{'{}'}</span>
          <span className="font-semibold">DevLoop</span>
        </div>
        {['Feed', 'Discussions', 'Projects', 'Mentors', 'Events'].map((t, i) => (
          <div key={t} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] ${i === 0 ? 'bg-white/[0.07] text-white' : 'text-white/50'}`}>
            <span className="h-2 w-2 rounded-full" style={{ background: i === 0 ? c.a : 'rgba(255,255,255,.2)' }} />
            {t}
          </div>
        ))}
      </aside>
      <main className="space-y-4 p-5">
        <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3">
          <span className="h-9 w-9 rounded-full" style={{ background: `linear-gradient(135deg, ${c.a}, ${c.b})` }} />
          {bar(260, 0.1, 10)}
          <span className="ml-auto rounded-lg px-4 py-2 text-[12px] font-semibold text-black" style={{ background: c.a }}>Post</span>
        </div>
        {[0, 1].map((k) => (
          <div key={k} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-full bg-white/15" />
              <div className="space-y-1.5">{bar(120, 0.35)}{bar(70, 0.12, 6)}</div>
            </div>
            <div className="mt-4 space-y-2">{bar('92%', 0.14)}{bar('70%', 0.14)}</div>
            {k === 0 && (
              <pre className="mt-4 rounded-lg bg-black/40 p-3 font-mono text-[11.5px] leading-relaxed text-white/70">
                <span style={{ color: c.a }}>const</span> loop = <span style={{ color: c.b }}>await</span> learn(<span className="text-white/40">'together'</span>)
                {'\n'}
                <span style={{ color: c.a }}>export default</span> grow(loop)
              </pre>
            )}
            <div className="mt-4 flex gap-4">{bar(44, 0.1, 6)}{bar(44, 0.1, 6)}{bar(44, 0.1, 6)}</div>
          </div>
        ))}
      </main>
      <aside className="space-y-3 border-l border-white/[0.06] p-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">Trending</p>
        {['#react', '#node', '#mysql', '#career', '#opensource'].map((t, i) => (
          <span key={t} className="mr-1.5 inline-block rounded-full border border-white/10 px-3 py-1 font-mono text-[11px]" style={{ color: i % 2 ? c.b : c.a }}>{t}</span>
        ))}
        <div className="mt-6 space-y-3 rounded-xl p-4" style={{ background: c.soft }}>
          {bar('80%', 0.3)}{bar('60%', 0.15)}{bar('70%', 0.15)}
        </div>
      </aside>
    </div>
  )
}

/* ── Aunty Scrunchies: storefront + admin overlay ──────────────── */
function Scrunchie({ color, size = 88 }) {
  return (
    <span className="relative block rounded-full" style={{ width: size, height: size, background: `conic-gradient(from 20deg, ${color}, #fff6, ${color}, #0003, ${color})`, WebkitMask: 'radial-gradient(circle, transparent 34%, #000 36%)', mask: 'radial-gradient(circle, transparent 34%, #000 36%)' }} />
  )
}
function AuntyUI({ c }) {
  const colors = ['#F29BB8', '#F6C9A8', '#B9A3FF', '#9FD9C9']
  return (
    <div className="relative h-full bg-[#16121A]">
      <div className="flex items-center justify-between px-8 py-5">
        <span className="font-serif text-[22px] italic" style={{ color: c.a }}>Aunty Scrunchies</span>
        <div className="flex gap-6 text-[12px] text-white/55"><span>Shop</span><span>Collections</span><span>About</span><span>Cart (2)</span></div>
      </div>
      <div className="mx-8 flex items-center justify-between rounded-2xl px-10 py-8" style={{ background: `linear-gradient(120deg, ${c.soft}, rgba(246,201,168,.12))` }}>
        <div className="space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: c.a }}>New collection</p>
          <p className="text-[30px] font-semibold leading-tight">Soft on hair.<br />Bold on style.</p>
          <span className="inline-block rounded-full px-5 py-2 text-[12px] font-semibold text-black" style={{ background: c.a }}>Shop now</span>
        </div>
        <div className="flex -space-x-6"><Scrunchie color={colors[0]} size={120} /><Scrunchie color={colors[2]} size={100} /></div>
      </div>
      <div className="grid grid-cols-4 gap-4 px-8 pt-6">
        {colors.map((col) => (
          <div key={col} className="rounded-xl bg-white/[0.04] p-3">
            <div className="grid h-24 place-items-center rounded-lg bg-white/[0.04]"><Scrunchie color={col} size={64} /></div>
            <div className="mt-3 space-y-1.5">{bar('70%', 0.3, 7)}{bar('35%', 0.15, 6)}</div>
          </div>
        ))}
      </div>
      {/* admin overlay */}
      <div className="absolute bottom-6 right-6 w-[330px] rounded-xl border border-white/10 bg-[#0F0D12]/95 p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">Admin · Products</p>
          <span className="rounded-md px-2 py-0.5 text-[10px] font-semibold text-black" style={{ background: c.b }}>+ Add</span>
        </div>
        {colors.slice(0, 3).map((col, i) => (
          <div key={col} className="mt-3 flex items-center gap-3 rounded-lg bg-white/[0.03] p-2">
            <Scrunchie color={col} size={26} />
            <div className="flex-1 space-y-1">{bar('75%', 0.25, 6)}{bar('40%', 0.1, 5)}</div>
            <span className="rounded px-2 py-0.5 text-[9px]" style={{ background: i === 2 ? 'rgba(255,255,255,.08)' : c.soft, color: i === 2 ? '#fff8' : c.a }}>{i === 2 ? 'Draft' : 'Live'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── FinTech: company finance dashboard ────────────────────────── */
function FinTechUI({ c }) {
  const pts = [60, 72, 58, 88, 80, 104, 96, 122, 118, 140, 132, 156]
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * 52} ${200 - p}`).join(' ')
  return (
    <div className="grid h-full grid-cols-[64px_1fr]">
      <aside className="flex flex-col items-center gap-5 border-r border-white/[0.06] py-5">
        <span className="h-8 w-8 rounded-lg" style={{ background: `linear-gradient(135deg, ${c.a}, ${c.b})` }} />
        {[0, 1, 2, 3, 4].map((i) => <span key={i} className={`h-8 w-8 rounded-lg ${i === 0 ? 'bg-white/10' : 'bg-white/[0.03]'}`} />)}
      </aside>
      <main className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">{bar(160, 0.5, 12)}{bar(100, 0.15, 7)}</div>
          <div className="flex gap-2">{['Week', 'Month', 'Quarter'].map((t, i) => <span key={t} className={`rounded-md px-3 py-1.5 text-[11px] ${i === 1 ? 'bg-white/10 text-white' : 'text-white/45'}`}>{t}</span>)}</div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {['Revenue', 'Expenses', 'Cash flow'].map((t, i) => (
            <div key={t} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
              <p className="text-[11px] text-white/45">{t}</p>
              <div className="mt-3">{bar(i === 1 ? 90 : 110, 0.55, 14)}</div>
              <span className="mt-3 inline-block h-1.5 w-full rounded-full bg-white/[0.06]"><span className="block h-full rounded-full" style={{ width: `${[64, 42, 78][i]}%`, background: i === 1 ? c.b : c.a }} /></span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-[1.6fr_1fr] gap-4">
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
            <p className="text-[11px] text-white/45">Balance over time</p>
            <svg viewBox="0 0 572 200" className="mt-3 h-[190px] w-full" preserveAspectRatio="none">
              <defs><linearGradient id="ft" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={c.a} stopOpacity=".35" /><stop offset="1" stopColor={c.a} stopOpacity="0" /></linearGradient></defs>
              {[50, 100, 150].map((y) => <line key={y} x1="0" x2="572" y1={y} y2={y} stroke="rgba(255,255,255,.06)" />)}
              <path d={`${path} L 572 200 L 0 200 Z`} fill="url(#ft)" />
              <path d={path} fill="none" stroke={c.a} strokeWidth="2.5" />
            </svg>
          </div>
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
            <p className="text-[11px] text-white/45">Expenses by category</p>
            <div className="mt-4 flex h-[180px] items-end gap-3">
              {[70, 45, 90, 30, 60].map((h, i) => <span key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%`, background: i === 2 ? c.b : 'rgba(255,255,255,.1)' }} />)}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

/* ── TechSpot: product admin for a tech store ──────────────────── */
function TechSpotUI({ c }) {
  const rows = [[Laptop, 'Live'], [Smartphone, 'Live'], [Headphones, 'Low'], [Monitor, 'Live'], [Keyboard, 'Draft'], [Camera, 'Live']]
  return (
    <div className="grid h-full grid-cols-[200px_1fr]">
      <aside className="space-y-2 border-r border-white/[0.06] p-5">
        <div className="mb-5 flex items-center gap-2"><span className="h-7 w-7 rounded-md" style={{ background: c.a }} /><span className="font-semibold">TechSpot</span></div>
        {['Dashboard', 'Products', 'Orders', 'Customers', 'Settings'].map((t, i) => (
          <div key={t} className={`rounded-lg px-3 py-2 text-[13px] ${i === 1 ? 'bg-white/[0.07] text-white' : 'text-white/50'}`}>{t}</div>
        ))}
      </aside>
      <main className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-[20px] font-semibold">Products</p>
          <div className="flex gap-2"><span className="h-8 w-52 rounded-lg bg-white/[0.05]" /><span className="rounded-lg px-4 py-2 text-[12px] font-semibold text-black" style={{ background: c.a }}>New product</span></div>
        </div>
        <div className="mt-5 overflow-hidden rounded-xl border border-white/[0.07]">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 bg-white/[0.03] px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-white/40">
            <span>Product</span><span>Category</span><span>Stock</span><span>Status</span>
          </div>
          {rows.map(([Icon, s], i) => (
            <div key={i} className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center gap-4 border-t border-white/[0.05] px-4 py-3">
              <span className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-lg bg-white/[0.05]"><Icon size={17} color={i % 2 ? c.b : c.a} /></span>{bar(110, 0.3)}</span>
              {bar(70, 0.12)}
              <span className="h-1.5 w-20 rounded-full bg-white/[0.06]"><span className="block h-full rounded-full" style={{ width: `${[80, 60, 15, 70, 40, 90][i]}%`, background: s === 'Low' ? '#F6C9A8' : c.a }} /></span>
              <span className="w-fit rounded-full px-2.5 py-1 text-[10px]" style={{ background: s === 'Live' ? c.soft : 'rgba(255,255,255,.06)', color: s === 'Live' ? c.a : s === 'Low' ? '#F6C9A8' : '#fff8' }}>{s}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

const screens = { devloop: DevLoopUI, 'aunty-scrunchies': AuntyUI, fintech: FinTechUI, techspot: TechSpotUI }

export function ProjectMockup({ project }) {
  // A real screenshot (set `image` on the project in content.js) wins over the drawn study.
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`Screenshot of ${project.name}`}
        loading="lazy"
        className="block w-full object-cover object-top"
        style={{ aspectRatio: `${W} / ${H}` }}
      />
    )
  }
  const c = hues[project.hue]
  const Screen = screens[project.id]
  return (
    <Scaled>
      <div className="relative h-full w-full p-10" style={{ background: `radial-gradient(120% 90% at 80% 0%, ${c.soft}, transparent 60%), #0A0B0F` }}>
        <div className="absolute inset-0 opacity-[0.5]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.08) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
        <div className="relative h-full">
          <Window title={project.name}>
            <Screen c={c} />
          </Window>
        </div>
      </div>
    </Scaled>
  )
}
