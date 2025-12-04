'use client';

import Loader from '@/components/Loader';

const PublicLoadingPage = () => {
  return (
    <div className="relative p-5 lg:p-0 min-h-screen lg:min-h-[80vh] w-full">
      <Loader />
    </div>
  );
};

export default PublicLoadingPage;
