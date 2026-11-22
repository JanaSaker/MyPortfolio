import { useState } from 'react'
import { ArrowUpRight, Check, Copy, MapPin } from 'lucide-react'
import { profile } from '../data/content'
import { GitHubIcon, LinkedInIcon } from './ui/Icons'
import { Reveal, RevealLines } from './ui/Reveal'

export function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const cells = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { label: 'LinkedIn', value: 'jana-sakr', href: profile.linkedin, icon: <LinkedInIcon className="h-4 w-4" />, external: true },
    { label: 'GitHub', value: 'JanaSaker', href: profile.github, icon: <GitHubIcon className="h-4 w-4" />, external: true },
    { label: 'Location', value: profile.location, icon: <MapPin size={15} className="text-accent" aria-hidden="true" /> },
  ]

  return (
    <section id="contact" className="noise relative isolate overflow-hidden pb-10 pt-28 sm:pt-36">
      <div
        aria-hidden="true"
        className="animate-drift absolute bottom-[-30%] left-1/2 -z-10 h-[60vmax] w-[60vmax] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgb(var(--accent) / var(--glow-a)), transparent)' }}
      />
      <div className="shell">
        <Reveal>
          <p className="label flex items-center gap-3">
            <span className="text-accent">06</span>
            <span className="h-px w-8 bg-current opacity-40" aria-hidden="true" />
            Contact
          </p>
        </Reveal>
        <RevealLines
          className="mt-8 font-display text-[clamp(2.8rem,8.4vw,7.5rem)] font-medium leading-[0.94] tracking-[-0.05em]"
          lines={[[{ text: 'Have an idea?' }], [{ text: 'Let’s build something' }], [{ text: 'meaningful.', accent: true }]]}
        />
        <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-6">
            <p className="max-w-md text-[17px] leading-relaxed text-muted">
              I’m always interested in connecting with ambitious teams, exciting opportunities, and people building
              meaningful digital products.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:justify-end">
              <a href={`mailto:${profile.email}`} className="btn group bg-accent px-7 py-4 text-[15px] text-white hover:bg-accent/90">
                Start a conversation
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
              <button type="button" onClick={copy} className="btn-ghost py-4">
                {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                <span aria-live="polite">{copied ? 'Email copied' : 'Copy email'}</span>
              </button>
            </div>
          </Reveal>
        </div>

        <ul className="mt-20 grid gap-px overflow-hidden rounded-2xl border hairline bg-[rgb(var(--line)/var(--line-a))] sm:grid-cols-2 lg:grid-cols-4">
          {cells.map((c) => {
            const inner = (
              <>
                <p className="label flex items-center justify-between">
                  {c.label}
                  {c.href && (
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  )}
                </p>
                <p className="mt-3 flex items-center gap-2 break-all text-[15px] font-medium transition-colors group-hover:text-accent">
                  {c.icon} {c.value}
                </p>
                {c.external && <span className="sr-only">(opens in new tab)</span>}
              </>
            )
            return (
              <li key={c.label} className="bg-bg">
                {c.href ? (
                  <a
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="group block h-full p-6 transition-colors hover:bg-surface/60"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="h-full p-6">{inner}</div>
                )}
              </li>
            )
          })}
        </ul>

        <footer className="mt-24 flex flex-col gap-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Jana Sakr © {new Date().getFullYear()}</p>
          <p>Designed with purpose. Built with passion.</p>
          <a href="#home" className="transition-colors hover:text-ink">
            Back to top ↑
          </a>
        </footer>
        <p
          aria-hidden="true"
          className="pointer-events-none mt-10 select-none whitespace-nowrap text-center font-display text-[19vw] font-semibold leading-[0.8] tracking-[-0.06em] text-ink/[0.045] xl:text-[15rem]"
        >
          Jana Sakr
        </p>
      </div>
    </section>
  )
}
