import Link from 'next/link';
import { ComponentType, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  icon?: ComponentType<{ className?: string }>;
  iconRight?: boolean;
  children: React.ReactNode;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

const variantClasses = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'inline-flex items-center gap-2 text-accent hover:text-primary transition-colors duration-200 font-medium font-heading',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  icon: Icon,
  iconRight = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const isGhost = variant === 'ghost';
  const classes = `${variantClasses[variant]} ${isGhost ? '' : sizeClasses[size]} font-heading ${className}`.trim();

  const content = (
    <>
      {Icon && !iconRight && <Icon className="w-4 h-4" />}
      {children}
      {Icon && iconRight && <Icon className="w-4 h-4" />}
    </>
  );

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:');
    if (isExternal) {
      return (
        <a href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
