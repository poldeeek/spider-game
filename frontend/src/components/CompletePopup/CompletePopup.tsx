import { useContext } from 'react';
import RoundContext from '../../context/roundContext';
import { REPLAY, NEXT_ROUND, PREV_ROUND } from '../../context/actionTypes';

import './CompletePopup.scss';

const CompletePopup = () => {
  const { roundState, roundDispatch } = useContext(RoundContext);

  const round = roundState.round;
  const error = roundState.error;
  const time = roundState.time;

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
        <h1 className='popup__level'>Level {round}</h1>
        <h3>Completed</h3>
        <h2>Time</h2>
        <h3>{time}</h3>
        <div className='popup__buttons'>
          <div className='popup__button' onClick={prevRound} title='Prev round'>
            <div className='arrow arrow__left'></div>
          </div>
          <div className='popup__button' onClick={retry}>
            Replay
          </div>
          <div className='popup__button' onClick={nextRound} title='Next round'>
            <div className='arrow arrow__right'></div>
          </div>
        </div>
        {info}
      </div>
    </>
  );
};

export default CompletePopup;
