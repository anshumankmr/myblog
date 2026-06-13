import { HTMLAttributes } from 'react';

type CardProps = {
  interactive?: boolean;
  hoverLift?: boolean;
  padding?: string;
  children: React.ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export function Card({
  interactive = false,
  hoverLift = true,
  padding = 'p-6',
  children,
  className = '',
  ...props
}: CardProps) {
  const base = interactive ? 'card-interactive' : 'card';
  const lift = !interactive && hoverLift ? 'hover:shadow-lg' : '';

  return (
    <div className={`${base} ${lift} ${padding} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
