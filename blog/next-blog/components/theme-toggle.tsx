"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { FaSun, FaMoon } from "react-icons/fa"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  useEffect(() => {
    setMounted(true)
  }, [])
  const dark = mounted && resolvedTheme === "dark"
  return (
    <button
      type="button"
      className="icon-button"
      disabled={!mounted}
      onClick={() => setTheme(dark ? "light" : "dark")}
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
