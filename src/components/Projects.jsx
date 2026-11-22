import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { profile, projects } from '../data/content'
import { ProjectMockup } from './ProjectMockup'
import { CaseStudy } from './CaseStudy'
import { ProjectLinks } from './ProjectLinks'
import { Reveal, ease } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'

function ProjectCard({ project, flip, onOpen }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1, ease }}
      className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
      aria-labelledby={`p-${project.id}`}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open the ${project.name} case study`}
        className={`relative block overflow-hidden rounded-[22px] border hairline bg-surface text-left lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}
      >
        <div className="transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.035]">
          <ProjectMockup project={project} />
        </div>
        {/* hover sheen + CTA */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span aria-hidden="true" className="absolute bottom-5 left-5 inline-flex translate-y-3 items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-medium text-black opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          View case study <ArrowUpRight size={15} />
        </span>
      </button>

      <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
        <div className="flex items-center gap-4">
          <span className="font-display text-[56px] font-medium leading-none tracking-tighter text-ink/10 sm:text-[72px]">{project.index}</span>
          <span className="label">{project.kind}</span>
        </div>
        <h3 id={`p-${project.id}`} className="mt-4 font-display text-[clamp(2rem,3.6vw,3rem)] font-medium leading-none tracking-[-0.035em]">
          {project.name}
        </h3>
        <p className="mt-3 font-display text-[18px] text-accent">{project.tagline}</p>
        <p className="mt-5 text-[16px] leading-relaxed text-muted">{project.description}</p>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technology stack">
          {project.stack.map((s) => (
            <li key={s} className="chip">{s}</li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button type="button" onClick={onOpen} className="btn-primary group/btn px-5 py-3 text-[14px]">
            View Case Study
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" aria-hidden="true" />
          </button>
          <div className="flex flex-wrap items-center gap-2">
            <ProjectLinks project={project} compact />
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export function Projects() {
  const [open, setOpen] = useState(null)
  const close = useCallback(() => setOpen(null), [])
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          index="03"
          label="Selected Projects"
          lines={[[{ text: 'Products, built' }], [{ text: 'end to ' }, { text: 'end.', accent: true }]]}
          intro="Four full-stack builds — community platform, eCommerce, finance tooling and store operations. Each one spans the interface, the API and the database."
        />
        <div className="mt-20 space-y-28 sm:space-y-36">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} flip={i % 2 === 1} onOpen={() => setOpen(p)} />
          ))}
        </div>
        <Reveal className="mt-24 text-center">
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost">
            More on GitHub <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
      <CaseStudy project={open} onClose={close} />
    </section>
  )
}
