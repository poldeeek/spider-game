import { useContext } from 'react';
import RoundContext from '../../context/roundContext';
import { REPLAY, NEXT_ROUND, PREV_ROUND } from '../../context/actionTypes';

import './CompletePopup.scss';

const CompletePopup = () => {
  const { roundState, roundDispatch } = useContext(RoundContext);

  const round = roundState.round;
  const error = roundState.error;

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

  const prevRound = () => {
    roundDispatch({
      type: PREV_ROUND
    });
  };

  let info = null;
  if (error) {
    info = <div className='popup__error'>{error}</div>;
  }

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
        {info}
      </div>
    </>
  );
};

export default CompletePopup;
