'use client';

import Loader from '@/components/Loader';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader />
    </div>
  );
}
