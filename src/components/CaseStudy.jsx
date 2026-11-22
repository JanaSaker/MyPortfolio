import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, X } from 'lucide-react'
import { ProjectMockup } from './ProjectMockup'
import { ProjectLinks } from './ProjectLinks'
import { ease } from './ui/Reveal'

const layerMeta = [
  { key: 'client', label: 'Client', note: 'Interface' },
  { key: 'server', label: 'Server', note: 'API & business logic' },
  { key: 'data', label: 'Data', note: 'Persistence' },
]

function Architecture({ layers }) {
  return (
    <ol className="space-y-2" aria-label="Application architecture">
      {layerMeta.map((l, i) => (
        <li key={l.key}>
          <div className="flex items-center justify-between gap-4 rounded-xl border hairline bg-bg/50 px-4 py-3.5">
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">{l.label} · {l.note}</p>
              <p className="mt-1 font-display text-[17px] font-medium">{layers[l.key].join(' + ')}</p>
            </div>
            <span className="font-mono text-[11px] text-accent">L{i + 1}</span>
          </div>
          {i < layerMeta.length - 1 && (
            <div className="flex justify-center py-1 text-muted" aria-hidden="true">
              <ArrowDown size={14} />
            </div>
          )}
        </li>
      ))}
    </ol>
  )
}

// Optional case-study sections: they render only when the field is filled in content.js.
function TextSection({ title, text }) {
  if (!text) return null
  return (
    <section>
      <h3 className="label">{title}</h3>
      <p className="mt-4 text-[16px] leading-relaxed text-ink/85">{text}</p>
    </section>
  )
}

function BulletSection({ title, items }) {
  if (!items?.length) return null
  return (
    <section>
      <h3 className="label">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((f) => (
          <li key={f} className="flex gap-3 text-[16px] text-ink/85">
            <span className="mt-[0.6em] h-1 w-3 shrink-0 rounded-full bg-accent/70" aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function CaseStudy({ project, onClose }) {
  const closeRef = useRef(null)
  const panelRef = useRef(null)
  const lastFocus = useRef(null)

  useEffect(() => {
    if (!project) return
    lastFocus.current = document.activeElement
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => closeRef.current?.focus(), 50)

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panelRef.current) {
        // Keep keyboard focus inside the dialog.
        const f = panelRef.current.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
        if (!f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      lastFocus.current?.focus?.()
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cs-title"
            className="relative max-h-[92svh] w-full max-w-5xl overflow-y-auto rounded-t-[28px] border hairline bg-bg2 shadow-[var(--shadow)] sm:rounded-[28px]"
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.55, ease }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b hairline bg-bg2/90 px-6 py-4 backdrop-blur-xl sm:px-10">
              <p className="label">
                <span className="text-accent">Case study {project.index}</span> / {project.kind}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="grid h-10 w-10 place-items-center rounded-full border hairline transition-colors hover:bg-ink/[0.06]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-6 pb-10 pt-8 sm:px-10">
              <h2 id="cs-title" className="font-display text-[clamp(2.4rem,6vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.045em]">
                {project.name}
              </h2>
              <p className="mt-3 font-display text-xl text-accent">{project.tagline}</p>

              <div className="mt-8 overflow-hidden rounded-2xl border hairline">
                <ProjectMockup project={project} />
              </div>
              {!project.image && (
                <p className="mt-3 font-mono text-[11px] text-muted">Illustrative interface study — not a screenshot of a live product.</p>
              )}

              <div className="mt-12 grid gap-12 md:grid-cols-12">
                <div className="space-y-10 md:col-span-7">
                  <section>
                    <h3 className="label">Overview</h3>
                    <p className="mt-4 text-[17px] leading-relaxed">{project.description}</p>
                  </section>
                  <TextSection title="The problem" text={project.problem} />
                  <BulletSection title={project.features?.length ? 'Key features' : 'Focus areas'} items={project.features?.length ? project.features : project.focus} />
                  <section>
                    <h3 className="label">My role</h3>
                    <p className="mt-4 text-[16px] leading-relaxed text-muted">
                      {project.role ??
                        `Full-stack development across the ${project.layers.client.join(' / ')} client, the ${project.layers.server.join(' / ')} API and the ${project.layers.data.join(' / ')} database.`}
                    </p>
                  </section>
                  <TextSection title="Hardest problem" text={project.challenges} />
                  <TextSection title="Outcome" text={project.outcome} />
                  {project.screenshots?.length > 0 && (
                    <section>
                      <h3 className="label">Screens</h3>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        {project.screenshots.map((s) => (
                          <figure key={s.src} className="overflow-hidden rounded-xl border hairline">
                            <img src={s.src} alt={s.alt} loading="lazy" className="block w-full" />
                            {s.caption && <figcaption className="px-3 py-2 text-[13px] text-muted">{s.caption}</figcaption>}
                          </figure>
                        ))}
                      </div>
                    </section>
                  )}
                  <section>
                    <h3 className="label">Links</h3>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <ProjectLinks project={project} />
                    </div>
                  </section>
                </div>
                <aside className="md:col-span-5">
                  <h3 className="label mb-4">Architecture</h3>
                  <Architecture layers={project.layers} />
                  <h3 className="label mb-4 mt-10">Stack</h3>
                  <ul className="flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <li key={s} className="chip">{s}</li>
                    ))}
                  </ul>
                </aside>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
