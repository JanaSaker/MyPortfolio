import { Reveal, RevealLines } from './Reveal'

export function SectionHeader({ index, label, lines, intro, align = 'split' }) {
  return (
    <header
      className={
        align === 'split'
          ? 'grid gap-8 border-t hairline pt-6 md:grid-cols-12 md:gap-6'
          : 'border-t hairline pt-6'
      }
    >
      <Reveal className="md:col-span-4">
        <p className="label flex items-center gap-3">
          <span className="text-accent">{index}</span>
          <span className="h-px w-8 bg-current opacity-40" aria-hidden="true" />
          {label}
        </p>
      </Reveal>
      <div className="md:col-span-8">
        <RevealLines
          lines={lines}
          className="font-display text-[clamp(2.2rem,5.2vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.035em]"
        />
        {intro && (
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">{intro}</p>
          </Reveal>
        )}
      </div>
    </header>
  )
}
