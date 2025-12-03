'use client';

import Loader from '@/components/Loader';

const PublicLoadingPage = () => {
  return (
    <div className="relative min-h-[80vh] w-full">
      <Loader />
    </div>
  );
};

export default PublicLoadingPage;
