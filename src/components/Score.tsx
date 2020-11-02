import * as React from 'react';
import { useEffect, useState } from 'react';
interface Props {
  initSec: number;
  timesUpCallback: () => void;
  addSec?: number;
  pause?: boolean;
}
const Score: React.FC<Props> = ({
  initSec,
  timesUpCallback,
  addSec,
  pause,
}) => {
  const [seconds, setSeconds] = useState(initSec);
  const [isActive, setIsActive] = useState(true);

  const toggle = () => {
    setSeconds((sec) => sec + 10);
  };

  useEffect(() => {
    let interval: number = 0;
    if (seconds > 0) {
      if (isActive) {
        interval = setInterval(() => {
          setSeconds((seconds) => seconds - 1);
        }, 1000);
      } else if (!isActive && seconds !== 0) {
        clearInterval(interval);
      }
    } else {
      timesUpCallback();
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, timesUpCallback]);

  useEffect(() => {
    toggle();
  }, [addSec]);

  useEffect(() => {
    setIsActive(!pause);
  }, [pause]);

  return <div>Remaining {seconds} sec</div>;
};

export default Score;
