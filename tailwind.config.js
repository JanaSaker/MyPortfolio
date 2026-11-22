/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: v('bg'),
        bg2: v('bg-2'),
        surface: v('surface'),
        ink: v('ink'),
        muted: v('muted'),
        accent: v('accent'),
        accent2: v('accent-2'),
        line: 'rgb(var(--line) / var(--line-a))',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: { shell: '1240px' },
      letterSpacing: { label: '0.18em' },
    },
  },
  plugins: [],
}
