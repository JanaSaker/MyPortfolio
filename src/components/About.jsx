import { about } from '../data/content'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'

export function About() {
  const [lead, ...rest] = about.paragraphs
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          index="01"
          label="About"
          lines={[[{ text: 'More than just' }], [{ text: 'writing ' }, { text: 'code.', accent: true }]]}
        />

        <div className="mt-16 grid gap-10 md:grid-cols-12 md:gap-6">
          {/* Business ↔ technology diagram */}
          <Reveal className="md:col-span-4">
            <figure className="card relative overflow-hidden p-6" aria-label="Where Jana works: between business and technology">
              <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.16em]">
                <span className="text-muted">Business</span>
                <span className="text-muted">Technology</span>
              </div>
              <div className="relative my-8 h-16" aria-hidden="true">
                <div className="absolute left-0 right-0 top-1/2 h-px bg-[rgb(var(--line)/0.18)]" />
                <span className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border border-muted bg-bg" />
                <span className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border border-muted bg-bg" />
                <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-accent/60 bg-accent/10 font-display text-sm font-semibold text-accent">
                  MIS
                </span>
              </div>
              <figcaption className="text-[14px] leading-relaxed text-muted">
                Information systems sit between the two — the lens I bring to every product I build.
              </figcaption>
            </figure>
          </Reveal>

          <div className="md:col-span-8">
            <Reveal>
              <p className="font-display text-[clamp(1.4rem,2.6vw,2.05rem)] font-normal leading-[1.3] tracking-[-0.02em]">
                {lead}
              </p>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {rest.map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <p className="text-[16px] leading-relaxed text-muted">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Credentials strip */}
        <ul className="mt-20 grid grid-cols-1 border-t hairline sm:grid-cols-2 lg:grid-cols-5">
          {about.pillars.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              delay={i * 0.06}
              className="group border-b hairline py-7 sm:px-5 sm:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0 lg:first:pl-0"
            >
              <span className="font-mono text-[12px] text-accent transition-transform duration-500 group-hover:translate-x-1 inline-block">
                {p.k}
              </span>
              <h3 className="mt-6 font-display text-[18px] font-medium tracking-tight">{p.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{p.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
