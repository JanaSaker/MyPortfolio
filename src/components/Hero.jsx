import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowDownToLine, MapPin } from 'lucide-react'
import { profile } from '../data/content'
import { GitHubIcon, LinkedInIcon } from './ui/Icons'
import { RevealLines, ease } from './ui/Reveal'
import { HeroVisual } from './HeroVisual'

const fade = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
})

export function Hero() {
  return (
    <section id="home" className="noise relative isolate overflow-hidden pb-16 pt-32 sm:pt-36 lg:min-h-[100svh] lg:pb-10 lg:pt-40">
      {/* Background: masked grid + one slow-drifting glow */}
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 -z-10"
        style={{ maskImage: 'radial-gradient(ellipse 70% 60% at 60% 35%, #000 30%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 60% 35%, #000 30%, transparent 75%)' }}
      />
      <div
        aria-hidden="true"
        className="animate-drift absolute -right-[20%] top-[-10%] -z-10 h-[70vmax] w-[70vmax] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgb(var(--accent) / var(--glow-a)), rgb(var(--accent-2) / calc(var(--glow-a) * 0.4)) 55%, transparent)' }}
      />

      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <motion.p {...fade(0.2)} className="inline-flex items-center gap-2.5 rounded-full border hairline bg-surface/50 py-1.5 pl-2.5 pr-3.5">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping-soft absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/85">
                Available for new opportunities
              </span>
            </motion.p>

            <RevealLines
              as="h1"
              animateOnMount
              delay={0.3}
              className="mt-8 font-display text-[clamp(2.6rem,6.4vw,5.2rem)] font-medium leading-[0.96] tracking-[-0.045em]"
              lines={[
                [{ text: 'Building ' }, { text: 'digital', accent: true }],
                [{ text: 'experiences that' }],
                [{ text: 'make an ' }, { text: 'impact.', accent: true }],
              ]}
            />

            <motion.p {...fade(0.75)} className="mt-8 max-w-[34rem] text-[17px] leading-relaxed text-muted sm:text-lg">
              I’m <span className="text-ink">Jana Sakr</span>, a Software Developer specializing in building
              modern, scalable, and user-focused web applications. I combine frontend craftsmanship with
              backend engineering to turn ideas into functional digital products.
            </motion.p>

            <motion.div {...fade(0.9)} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="#projects" className="btn-primary group">
                Explore My Work
                <ArrowDownRight size={17} className="transition-transform duration-300 group-hover:rotate-[-45deg]" aria-hidden="true" />
              </a>
              {profile.cvUrl ? (
                <a href={profile.cvUrl} download className="btn-ghost group">
                  <ArrowDownToLine size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
                  Download My CV
                </a>
              ) : (
                <a href="#contact" className="btn-ghost">
                  Get in touch
                </a>
              )}
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            <HeroVisual />
          </motion.div>
        </div>

        {/* Meta strip */}
        <motion.div
          {...fade(1.1)}
          className="mt-14 grid grid-cols-2 gap-y-6 border-t hairline pt-6 sm:grid-cols-4 lg:mt-10"
        >
          <div>
            <p className="label">Role</p>
            <p className="mt-2 text-[14px] font-medium leading-snug">
              Software Developer
              <br />
              <span className="text-muted">Full-Stack Engineer</span>
            </p>
          </div>
          <div>
            <p className="label">Based in</p>
            <p className="mt-2 flex items-center gap-1.5 text-[14px] font-medium">
              <MapPin size={14} className="text-accent" aria-hidden="true" /> {profile.location}
            </p>
          </div>
          <div>
            <p className="label">Education</p>
            <p className="mt-2 text-[14px] font-medium leading-snug">
              M.S. Management
              <br />
              <span className="text-muted">Information Systems</span>
            </p>
          </div>
          <div>
            <p className="label">Elsewhere</p>
            <div className="mt-2 flex items-center gap-2">
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="Jana Sakr on LinkedIn (opens in new tab)" className="grid h-9 w-9 place-items-center rounded-full border hairline transition-colors hover:border-accent hover:text-accent">
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="Jana Sakr on GitHub (opens in new tab)" className="grid h-9 w-9 place-items-center rounded-full border hairline transition-colors hover:border-accent hover:text-accent">
                <GitHubIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
