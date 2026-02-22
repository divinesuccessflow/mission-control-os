import { cn } from '@/lib/utils';
import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full px-3 py-2 bg-background border border-border rounded-md',
          'text-foreground placeholder:text-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'min-h-[100px] resize-y',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
