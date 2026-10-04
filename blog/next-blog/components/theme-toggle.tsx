"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { flushSync } from "react-dom"
import { FaSun, FaMoon } from "react-icons/fa"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  useEffect(() => {
    setMounted(true)
  }, [])
  const dark = mounted && resolvedTheme === "dark"
  const switchTheme = () => {
    const next = dark ? "light" : "dark"
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (!document.startViewTransition || reduceMotion) {
      setTheme(next)
      return
    }
    document.startViewTransition(() => flushSync(() => setTheme(next)))
  }
  return (
    <button
      type="button"
      className="icon-button"
      disabled={!mounted}
      onClick={switchTheme}
      aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
    >
      {dark ? (
        <FaSun size={14} aria-hidden="true" />
      ) : (
        <FaMoon size={14} aria-hidden="true" />
      )}
    </button>
  )
}
