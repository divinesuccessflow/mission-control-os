import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export default function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-card border border-border rounded-lg p-6 shadow-lg',
        className
      )}
      {...props}
    />
  );
}
