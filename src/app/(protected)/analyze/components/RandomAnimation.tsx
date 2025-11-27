import Lottie from 'lottie-react';
import Egg from './egg.json';
import Spaghetti from './spaghetti.json';
import Tomato from './tomato.json';

export function EggLottie() {
  return <Lottie animationData={Egg} />;
}

export function SpaghettiLottie() {
  return <Lottie animationData={Spaghetti} />;
}

export function TomatoLottie() {
  return <Lottie animationData={Tomato} />;
}

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function RandomAnimation() {
  const getNumber = randomNumber(1, 3);
  switch (getNumber) {
    case 1:
      return EggLottie();
      break;
    case 2:
      return SpaghettiLottie();
      break;
    case 3:
      return TomatoLottie();
      break;
    default:
      return EggLottie();
  }
}
