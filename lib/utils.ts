import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 10000000) {
    return `${(num / 10000000).toFixed(2)} Cr`;
  }
  if (num >= 100000) {
    return `${(num / 100000).toFixed(2)} L`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}K`;
  }
  return num.toString();
}

export function calculateDaysRemaining(deadline: string): number {
  const now = new Date();
  const end = new Date(deadline);
  const diff = end.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function calculateDailyRate(target: number, current: number, deadline: string): number {
  const remaining = target - current;
  const daysLeft = calculateDaysRemaining(deadline);
  if (daysLeft <= 0) return 0;
  return Math.ceil(remaining / daysLeft);
}

export function getProgressPercentage(current: number, target: number): number {
  if (target === 0) return 0;
  return Math.min(100, Math.round((current / target) * 100));
}

export function isPreFlightComplete(check: any): boolean {
  return !!(
    check.concern?.trim() &&
    check.accomplishment?.trim() &&
    check.scope?.trim() &&
    check.playbook?.trim() &&
    check.quality?.trim()
  );
}
