import { useContext, useEffect, useMemo } from 'react';
import RoundContext from '../../context/roundContext';
import { REPLAY, NEXT_ROUND } from '../../context/actionTypes';

import './CompletePopup.scss';

const CompletePopup = () => {
  const { roundState, roundDispatch } = useContext(RoundContext);

  const round = roundState.round;

  const retry = () => {
    roundDispatch({
      type: REPLAY
    });
  };

  const nextRound = () => {
    roundDispatch({
      type: NEXT_ROUND
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
          <div className='popup__button'>Prev level</div>
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
