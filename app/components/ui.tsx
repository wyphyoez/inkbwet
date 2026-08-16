'use client';

import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

const buttonVariants: Record<ButtonVariant, string> = {
  default: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  outline: 'border border-border bg-background hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
};

const buttonSizes: Record<ButtonSize, string> = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 rounded-md px-3 text-sm',
  lg: 'h-11 rounded-lg px-8',
  icon: 'h-10 w-10',
};

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize }>(
  ({ className = '', variant = 'default', size = 'default', ...props }, ref) => (
    <button ref={ref} className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`} {...props} />
  ),
);
Button.displayName = 'Button';

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-xl border border-border bg-card text-card-foreground shadow-sm ${className}`} {...props} />;
}

export function Badge({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return <div className={`inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground ${className}`} {...props}>{children}</div>;
}

export function Divider({ className = '' }: { className?: string }) {
  return <div className={`h-px w-full bg-border ${className}`} />;
}
