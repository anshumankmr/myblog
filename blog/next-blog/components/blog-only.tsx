"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { isKeystonePath } from "@/lib/keystone"

/** Renders the blog's own chrome (header, footer) everywhere except the Keystone pages. */
export function BlogOnly({ children }: { children: ReactNode }) {
  return isKeystonePath(usePathname()) ? null : <>{children}</>
}
