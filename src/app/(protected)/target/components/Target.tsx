'use client';

import TargetLottie from './target.json';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { useEffect, useRef } from 'react';

export default function Target({ loop = false }: { loop?: boolean }) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    function pauseAnimation() {
      if (loop === false) {
        const timer = setTimeout(() => {
          lottieRef.current?.pause();
        }, 3000);

        return () => clearTimeout(timer);
      } else {
        return null;
      }
    }
    pauseAnimation();
  }, [loop]);

  return <Lottie lottieRef={lottieRef} animationData={TargetLottie} loop={loop} />;
}
