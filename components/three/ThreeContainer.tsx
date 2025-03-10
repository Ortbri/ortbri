'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ThreeContainerProps {
  children: ReactNode;
  className?: string;
  fullScreen?: boolean;
}

export default function ThreeContainer({
  children,
  className,
  fullScreen = false,
}: ThreeContainerProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-black',
        fullScreen ? 'h-screen w-full' : 'h-[500px] w-full',
        className
      )}
    >
      {children}
    </div>
  );
}
