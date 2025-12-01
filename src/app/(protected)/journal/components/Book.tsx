import Lottie from 'lottie-react';
import BookLottie from './book.json';

export default function Book({ loop = false }: { loop?: boolean }) {
  return <Lottie animationData={BookLottie} loop={loop} />;
}
