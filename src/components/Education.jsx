import { Award, GraduationCap } from 'lucide-react'
import { certifications, education } from '../data/content'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'

export function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          index="05"
          label="Education & Certifications"
          lines={[[{ text: 'Grounded in ' }, { text: 'systems', accent: true }], [{ text: 'thinking.' }]]}
        />
        <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-7">
            <p className="label mb-2 flex items-center gap-2">
              <GraduationCap size={14} aria-hidden="true" /> Education
            </p>
            <ol>
              {education.map((e, i) => (
                <Reveal
                  as="li"
                  key={e.title}
                  delay={i * 0.08}
                  className="grid grid-cols-[72px_1fr] gap-4 border-b hairline py-7 sm:grid-cols-[110px_1fr]"
                >
                  <span className="font-display text-[28px] font-medium leading-none tracking-tight text-accent sm:text-[34px]">
                    {e.year}
                  </span>
                  <div>
                    <h3 className="font-display text-[20px] font-medium leading-snug tracking-tight sm:text-[22px]">{e.title}</h3>
                    <p className="mt-1.5 text-[15px] text-muted">{e.org}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <div className="md:col-span-5">
            <p className="label mb-4 flex items-center gap-2">
              <Award size={14} aria-hidden="true" /> Certifications
            </p>
            <ul className="space-y-3">
              {certifications.map((c, i) => (
                <Reveal
                  as="li"
                  key={c.title}
                  delay={0.1 + i * 0.08}
                  className="card flex items-center justify-between gap-4 p-5 transition-colors hover:border-accent/40"
                >
                  <div>
                    <h3 className="font-display text-[18px] font-medium tracking-tight">{c.title}</h3>
                    <p className="mt-1 text-[14px] text-muted">{c.org}</p>
                  </div>
                  <span className="font-mono text-[11px] text-muted">0{i + 1}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
