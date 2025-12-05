'use client';

import Loader from '@/components/Loader';

const PublicLoadingPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="w-full h-full max-w-[100px] max-h-[100px] md:max-w-[150px] md:max-h-[150px] lg:max-w-[200px] lg:max-h-[200px]">
        <Loader />
      </div>
    </div>
  );
};

export default PublicLoadingPage;
