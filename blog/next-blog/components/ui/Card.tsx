import { HTMLAttributes } from "react"

type CardProps = {
  interactive?: boolean
  hoverLift?: boolean
  padding?: string
  children: React.ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>

export function Card({
  interactive = false,
  hoverLift = false,
  padding = "p-6",
  children,
  className = "",
  ...props
}: CardProps) {
  const base = "rounded-md bg-surface-sunken"
  const hover = interactive ? "hover:bg-accent-soft transition-colors" : ""
  void hoverLift

  return (
    <div
      className={`${base} ${hover} ${padding} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  )
}
