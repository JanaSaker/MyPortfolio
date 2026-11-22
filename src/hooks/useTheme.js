import { useCallback, useEffect, useState } from 'react'

const read = () =>
  (typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme')) || 'dark'

export function useTheme() {
  const [theme, setTheme] = useState(read)

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0B0C10' : '#F7F6F2')
  }, [theme])

  const toggle = useCallback(() => {
    const next = read() === 'dark' ? 'light' : 'dark'
    const root = document.documentElement
    root.classList.add('theme-switching')
    root.setAttribute('data-theme', next)
    try {
      localStorage.setItem('js-theme', next)
    } catch {}
    setTheme(next)
    window.setTimeout(() => root.classList.remove('theme-switching'), 500)
  }, [])

  return { theme, toggle }
}
