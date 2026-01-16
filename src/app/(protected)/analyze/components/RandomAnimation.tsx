import Lottie from "lottie-react";
import Egg from "./egg.json";
import Spaghetti from "./spaghetti.json";
import Tomato from "./tomato.json";

export function EggLottie({ loop }: { loop?: boolean }) {
  return <Lottie loop={loop} animationData={Egg} />;
}

export function SpaghettiLottie({ loop }: { loop?: boolean }) {
  return <Lottie loop={loop} animationData={Spaghetti} />;
}

export function TomatoLottie({ loop }: { loop?: boolean }) {
  return <Lottie loop={loop} animationData={Tomato} />;
}

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function RandomAnimation({ loop }: { loop?: boolean }) {
  const getNumber = randomNumber(1, 3);
  switch (getNumber) {
    case 1:
      return <EggLottie loop={loop} />;
    case 2:
      return <SpaghettiLottie loop={loop} />;
    case 3:
      return <TomatoLottie loop={loop} />;
    default:
      return <EggLottie loop={loop} />;
  }
}
