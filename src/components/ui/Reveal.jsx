import { motion } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1]

// Fades + lifts its children into view once.
export function Reveal({ children, delay = 0, y = 24, className, as = 'div', ...rest }) {
  const Comp = motion[as] ?? motion.div
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, ease, delay }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

// Line-by-line masked text reveal for editorial headlines.
// `lines` is an array of arrays of { text, accent? } segments.
export function RevealLines({ lines, className, delay = 0, as = 'h2', animateOnMount = false }) {
  const Tag = as
  const trigger = animateOnMount
    ? { animate: { y: '0%' } }
    : { whileInView: { y: '0%' }, viewport: { once: true, margin: '0px 0px -10% 0px' } }
  return (
    <Tag className={className}>
      {lines.map((segments, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            initial={{ y: '110%' }}
            transition={{ duration: 1, ease, delay: delay + i * 0.09 }}
            {...trigger}
          >
            {segments.map((s, j) =>
              s.accent ? (
                <span key={j} className="text-gradient">
                  {s.text}
                </span>
              ) : (
                <span key={j}>{s.text}</span>
              ),
            )}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
