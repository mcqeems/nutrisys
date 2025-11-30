'use client';

import TargetLottie from './target.json';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { useEffect, useRef } from 'react';

export default function Target() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      lottieRef.current?.pause();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return <Lottie lottieRef={lottieRef} animationData={TargetLottie} loop={false} />;
}
