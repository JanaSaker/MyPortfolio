import { ExternalLink } from 'lucide-react'
import { GitHubIcon } from './ui/Icons'

// Shows real links when present, otherwise an honest, clearly-labelled placeholder.
function LinkOrPlaceholder({ href, label, icon, compact }) {
  const base = `inline-flex items-center gap-2 rounded-full border px-3.5 py-2.5 text-[13px] transition-colors`
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={`${base} hairline hover:border-accent hover:text-accent`}>
        {icon} {label}
      </a>
    )
  }
  return (
    <span
      className={`${base} cursor-not-allowed border-dashed border-[rgb(var(--line)/0.2)] text-muted`}
      title={`${label} link not yet published`}
    >
      {icon} {label}
      <span className="rounded-full bg-ink/[0.06] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider">
        {compact ? 'Soon' : 'Link coming soon'}
      </span>
    </span>
  )
}

export function ProjectLinks({ project, compact = false }) {
  return (
    <>
      <LinkOrPlaceholder href={project.links.live} label="Live Demo" icon={<ExternalLink size={14} aria-hidden="true" />} compact={compact} />
      <LinkOrPlaceholder href={project.links.github} label="GitHub" icon={<GitHubIcon className="h-3.5 w-3.5" />} compact={compact} />
    </>
  )
}
