import { useState, useEffect, useContext } from 'react';
import RoundContext from '../../context/roundContext';
import { TIME_STOP } from '../../context/actionTypes';
import './Timer.scss';

const Timer: React.FC = () => {
  const { roundState, roundDispatch } = useContext(RoundContext);

  const isComplete = roundState.isComplete;

  const [second, setSecond] = useState('00');
  const [minute, setMinute] = useState('00');
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (!isComplete) {
      setIsActive(true);
    } else {
      roundDispatch({
        type: TIME_STOP,
        payload: {
          time: `${minute}:${second}`
        }
      });
      setCounter(0);
      setSecond('00');
      setMinute('00');
      setIsActive(false);
    }
  }, [isComplete]);

  useEffect(() => {
    let intervalId: any;

    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        const computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : `${secondCounter}`;
        const computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : `${minuteCounter}`;

        setSecond(computedSecond);
        setMinute(computedMinute);

        setCounter((counter) => counter + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  return (
    <div className='timer'>
      <span className='minute'>{minute}</span>
      <span>:</span>
      <span className='second'>{second}</span>
    </div>
  );
};

export default Timer;
