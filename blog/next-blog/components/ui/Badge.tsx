import { HTMLAttributes } from 'react';

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
} & HTMLAttributes<HTMLSpanElement>;

export function Badge({ children, className = '', ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent/10 text-accent font-heading ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
}
