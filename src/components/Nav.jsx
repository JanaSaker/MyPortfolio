import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDownToLine, Menu, X } from 'lucide-react'
import { navLinks, profile } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrolled } from '../hooks/useScrolled'
import { ThemeToggle } from './ui/ThemeToggle'
import { ease } from './ui/Reveal'

const ids = navLinks.map((l) => l.id)

function Wordmark() {
  return (
    <a href="#home" className="group flex items-center gap-2.5" aria-label="Jana Sakr — back to top">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl border hairline bg-surface font-display text-[15px] font-semibold tracking-tight">
        <span>
          J<span className="text-accent">S</span>
        </span>
        <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      </span>
      <span className="hidden font-display text-[15px] font-medium tracking-tight sm:inline">
        Jana Sakr
      </span>
    </a>
  )
}

export function Nav() {
  const scrolled = useScrolled(24)
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-ink px-4 py-2 text-sm text-bg focus:translate-y-0"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-shell items-center justify-between gap-4 rounded-2xl border px-3 py-2.5 transition-all duration-500 sm:px-4 ${
            scrolled
              ? 'border-[rgb(var(--line)/var(--line-a))] bg-bg/70 shadow-[var(--shadow)] backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          <Wordmark />

          <ul className="hidden items-center gap-1 rounded-full border hairline bg-surface/40 p-1 lg:flex">
            {navLinks.map((l) => {
              const isActive = active === l.id
              return (
                <li key={l.id} className="relative">
                  <a
                    href={`#${l.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative z-10 block rounded-full px-4 py-1.5 text-[13.5px] transition-colors ${
                      isActive ? 'text-ink' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {l.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-ink/[0.08]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      aria-hidden="true"
                    />
                  )}
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {profile.cvUrl && (
              <a
                href={profile.cvUrl}
                download
                className="hidden items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[13.5px] font-medium text-bg transition-transform hover:-translate-y-px sm:inline-flex"
              >
                <ArrowDownToLine size={15} strokeWidth={2} aria-hidden="true" />
                Download CV
              </a>
            )}
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border hairline lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 flex flex-col bg-bg/95 px-6 pb-10 pt-28 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease, delay: 0.05 + i * 0.05 }}
                  className="border-b hairline"
                >
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-4 font-display text-[2rem] font-medium tracking-tight"
                  >
                    {l.label}
                    <span className="label">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            {profile.cvUrl && (
              <motion.a
                href={profile.cvUrl}
                download
                className="btn-primary mt-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.4 }}
              >
                <ArrowDownToLine size={16} aria-hidden="true" /> Download CV
              </motion.a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
