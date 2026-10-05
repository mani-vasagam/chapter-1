import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Common formatters — generated apps (expense/finance/booking trackers) routinely
// `import { formatCurrency, formatDate } from '@/lib/utils'`. Provided here (crash-safe on bad input)
// so those imports resolve without a missing-export build error. Do NOT remove.
export function formatCurrency(amount: number | string | null | undefined, currency = 'USD', locale = 'en-US'): string {
  const n = typeof amount === 'number' ? amount : Number(amount);
  const safe = Number.isFinite(n) ? n : 0;
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(safe);
  } catch {
    return '$' + safe.toFixed(2);
  }
}

export function formatDate(date: string | number | Date | null | undefined, locale = 'en-US'): string {
  if (date == null || date === '') return '';
  try {
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return String(date);
    return d.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return String(date);
  }
}