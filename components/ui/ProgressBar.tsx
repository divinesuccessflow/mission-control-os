import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number; // 0-100
  color?: string;
  className?: string;
  showLabel?: boolean;
}

export default function ProgressBar({ 
  value, 
  color = '#B8860B', 
  className,
  showLabel = false 
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, value));
  
  return (
    <div className={cn('w-full', className)}>
      <div className="w-full bg-background rounded-full h-2 overflow-hidden border border-border">
        <div
          className="h-full transition-all duration-500 ease-out rounded-full"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
      {showLabel && (
        <div className="text-xs text-gray-400 mt-1 text-right">
          {percentage.toFixed(1)}%
        </div>
      )}
    </div>
  );
}
