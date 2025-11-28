import Lottie from 'lottie-react';
import BookLottie from './book.json';

export default function Book() {
  return <Lottie animationData={BookLottie} loop={false} />;
}
