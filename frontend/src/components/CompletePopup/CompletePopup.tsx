import { useContext } from 'react';
import RoundContext from '../../context/roundContext';
import { REPLAY, NEXT_ROUND, PREV_ROUND } from '../../context/actionTypes';

import './CompletePopup.scss';

const CompletePopup = () => {
  const { roundState, roundDispatch } = useContext(RoundContext);

  const round = roundState.round;
  const roundsNumber = roundState.roundsNumber;

  const retry = () => {
    roundDispatch({
      type: REPLAY
    });
  };

  const nextRound = () => {
    if (round >= roundsNumber) return;
    roundDispatch({
      type: NEXT_ROUND
    });
  };

  const prevRound = () => {
    if (round <= 1) return;
    roundDispatch({
      type: PREV_ROUND
    });
  };

  return (
    <>
      <div className='backgroundShadow'></div>
      <div className='popup'>
        <h1>Level {round}</h1>
        <h2>Completed</h2>
        <h2>Time</h2>
        <div className='popup__buttons'>
          <div className='popup__button' onClick={prevRound}>
            Prev level
          </div>
          <div className='popup__button' onClick={retry}>
            Retry
          </div>
          <div className='popup__button' onClick={nextRound}>
            Next round
          </div>
        </div>
      </div>
    </>
  );
};

export default CompletePopup;
