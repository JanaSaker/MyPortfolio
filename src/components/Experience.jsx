import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { experience } from '../data/content'
import { Reveal, ease } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'

function Detail({ job }) {
  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="font-display text-[clamp(1.6rem,2.8vw,2.3rem)] font-medium tracking-[-0.03em]">
          {job.role} <span className="text-muted">at</span> <span className="text-accent">{job.company}</span>
        </h3>
        <p className="font-mono text-[12px] text-muted">{job.period}</p>
      </div>
      <p className="mt-2 flex items-center gap-1.5 text-[14px] text-muted">
        <MapPin size={13} aria-hidden="true" /> {job.place}
      </p>
      <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {job.points.map((p) => (
          <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-ink/85">
            <span className="mt-[0.6em] h-1 w-3 shrink-0 rounded-full bg-accent/70" aria-hidden="true" />
            {p}
          </li>
        ))}
      </ul>
      <ul className="mt-8 flex flex-wrap gap-2 border-t hairline pt-6" aria-label="Technologies used">
        {job.stack.map((s) => (
          <li key={s} className="chip">
            {s}
          </li>
        ))}
      </ul>
    </>
  )
}

export function Experience() {
  const [active, setActive] = useState(0)
  const tabs = useRef([])
  const job = experience[active]

  const onKeyDown = (e) => {
    const n = experience.length
    let next = null
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (active + 1) % n
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (active - 1 + n) % n
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = n - 1
    if (next !== null) {
      e.preventDefault()
      setActive(next)
      tabs.current[next]?.focus()
    }
  }

  return (
    <section id="experience" className="relative bg-bg2/60 py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          index="02"
          label="Experience"
          lines={[[{ text: 'Shipping across the' }], [{ text: 'whole ' }, { text: 'stack.', accent: true }]]}
          intro="Four roles, from secure Laravel dashboards to eCommerce platforms and a Next.js CRM — frontend, backend, design and deployment."
        />

        {/* Desktop: interactive timeline */}
        <Reveal className="mt-16 hidden gap-6 lg:grid lg:grid-cols-12">
          <div role="tablist" aria-orientation="vertical" aria-label="Roles" className="relative col-span-4" onKeyDown={onKeyDown}>
            <span className="absolute bottom-6 left-[7px] top-6 w-px bg-[rgb(var(--line)/0.12)]" aria-hidden="true" />
            {experience.map((j, i) => {
              const on = i === active
              return (
                <button
                  key={j.id}
                  ref={(el) => (tabs.current[i] = el)}
                  role="tab"
                  id={`tab-${j.id}`}
                  aria-selected={on}
                  aria-controls="exp-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  className="group relative flex w-full items-start gap-5 rounded-xl py-5 pl-0 pr-4 text-left"
                >
                  <span className="relative z-10 mt-1.5 grid h-[15px] w-[15px] place-items-center rounded-full border border-[rgb(var(--line)/0.25)] bg-bg2">
                    {on && (
                      <motion.span layoutId="exp-dot" className="h-[7px] w-[7px] rounded-full bg-accent" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                    )}
                  </span>
                  <span className="flex-1">
                    <span className="block font-mono text-[11px] text-muted">{j.period}</span>
                    <span className={`mt-1 block font-display text-[20px] font-medium tracking-tight transition-colors ${on ? 'text-ink' : 'text-muted group-hover:text-ink'}`}>
                      {j.company}
                    </span>
                    <span className="block text-[13.5px] text-muted">{j.role}</span>
                  </span>
                </button>
              )
            })}
          </div>

          <div id="exp-panel" role="tabpanel" aria-labelledby={`tab-${job.id}`} className="card col-span-8 min-h-[420px] p-8 xl:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease }}
              >
                <Detail job={job} />
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Mobile & tablet: vertical timeline, everything visible */}
        <ol className="relative mt-14 space-y-6 lg:hidden">
          <span className="absolute bottom-0 left-[7px] top-2 w-px bg-[rgb(var(--line)/0.12)]" aria-hidden="true" />
          {experience.map((j) => (
            <Reveal as="li" key={j.id} className="relative pl-9">
              <span className="absolute left-0 top-7 grid h-[15px] w-[15px] place-items-center rounded-full border border-[rgb(var(--line)/0.25)] bg-bg2" aria-hidden="true">
                <span className="h-[7px] w-[7px] rounded-full bg-accent" />
              </span>
              <div className="card p-6">
                <Detail job={j} />
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
