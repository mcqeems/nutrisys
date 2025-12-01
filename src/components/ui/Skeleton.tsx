'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

export function Skeleton({ className, width, height, rounded = 'md' }: SkeletonProps) {
  const roundedClass = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  return (
    <div
      className={cn('animate-pulse bg-gray-300 dark:bg-gray-700', roundedClass[rounded], className)}
      style={{ width, height }}
    />
  );
}

export function SkeletonText({ lines = 1, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className="h-4" width={i === lines - 1 && lines > 1 ? '75%' : '100%'} />
      ))}
    </div>
  );
}

export function SkeletonCircle({ size = '40px', className }: { size?: string; className?: string }) {
  return <Skeleton className={className} width={size} height={size} rounded="full" />;
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('p-4 border border-border rounded-lg space-y-4', className)}>
      <Skeleton className="h-6 w-3/4" />
      <SkeletonText lines={3} />
      <Skeleton className="h-10 w-1/2" />
    </div>
  );
}
