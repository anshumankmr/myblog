"use client"

import { useEffect, useState } from "react"
import { embeddedFormUrl, type GoogleForm } from "@/lib/keystone"

type Props = {
  form: GoogleForm
  title: string
  /** Shown while the form URL hasn't been configured yet. */
  fallback: React.ReactNode
}

// The site is a static export, so query parameters (the extension's version and
// the kind of feedback) can only be read in the browser.
export function GoogleFormEmbed({ form, title, fallback }: Props) {
  const [src, setSrc] = useState(() => embeddedFormUrl(form, new URLSearchParams()))

  useEffect(() => {
    setSrc(embeddedFormUrl(form, new URLSearchParams(window.location.search)))
  }, [form])

  if (!src) return <>{fallback}</>

  return (
    <iframe
      src={src}
      title={title}
      loading="lazy"
      style={{ width: "100%", height: 1000, border: 0, marginTop: 24 }}
    >
      Loading the form…
    </iframe>
  )
}
