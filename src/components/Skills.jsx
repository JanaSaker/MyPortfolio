import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { skillEvidence, skills } from '../data/content'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'

const spans = ['md:col-span-3', 'md:col-span-3', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2']

export function Skills() {
  const [focus, setFocus] = useState(null)
  const evidence = focus ? skillEvidence[focus] : null

  return (
    <section id="skills" className="relative bg-bg2/60 py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          index="04"
          label="Skills"
          lines={[[{ text: 'A toolkit for' }], [{ text: 'the ' }, { text: 'full lifecycle.', accent: true }]]}
          intro="No percentages, no meters. Hover or focus a technology to see where it appears in my experience and projects."
        />

        {/* Live readout */}
        <Reveal className="mt-14">
          <div
            className="card flex min-h-[64px] flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4"
            aria-live="polite"
          >
            <span className="label shrink-0">Used in</span>
            <AnimatePresence mode="wait">
              <motion.div
                key={focus ?? 'none'}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="flex flex-wrap items-center gap-2 text-[14px]"
              >
                {!focus && <span className="text-muted">Select a technology below.</span>}
                {focus && (
                  <>
                    <span className="font-display font-medium text-accent">{focus}</span>
                    <span className="text-muted" aria-hidden="true">→</span>
                    {evidence?.length ? (
                      evidence.map((e) => (
                        <span key={e} className="rounded-full bg-ink/[0.06] px-3 py-1 text-[13px]">{e}</span>
                      ))
                    ) : (
                      <span className="text-muted">Part of my core toolkit.</span>
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <div className="mt-4 grid gap-4 md:grid-cols-6">
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.06} className={`card group relative overflow-hidden p-6 sm:p-7 ${spans[i]}`}>
              <div className="flex items-start justify-between">
                <h3 className="font-display text-[22px] font-medium tracking-tight">{g.group}</h3>
                <span className="font-mono text-[11px] text-muted">
                  {g.code}
                  <span className="text-accent">/{String(g.items.length).padStart(2, '0')}</span>
                </span>
              </div>
              <ul className="mt-8 flex flex-wrap gap-2">
                {g.items.map((s) => {
                  const on = focus === s
                  return (
                    <li key={s}>
                      <button
                        type="button"
                        onMouseEnter={() => setFocus(s)}
                        onFocus={() => setFocus(s)}
                        onClick={() => setFocus(s)}
                        aria-pressed={on}
                        className={`rounded-full border px-3.5 py-1.5 text-[14px] transition-all duration-300 ${
                          on
                            ? 'border-accent bg-accent/10 text-ink'
                            : 'border-[rgb(var(--line)/var(--line-a))] text-ink/80 hover:border-[rgb(var(--line)/0.25)]'
                        }`}
                      >
                        {s}
                      </button>
                    </li>
                  )
                })}
              </ul>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
                style={{ background: 'radial-gradient(closest-side, rgb(var(--accent) / 0.25), transparent)' }}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
