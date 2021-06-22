import { useContext, useEffect, useMemo } from 'react';
import RoundContext from '../../context/roundContext';

import './CompletePopup.scss';

const CompletePopup = () => {
  const { roundState, roundDispatch } = useContext(RoundContext);

  const round = roundState.round;

  return (
    <>
      <div className='backgroundShadow'></div>
      <div className='popup'>
        <h1>Level {round}</h1>
        <h2>Completed</h2>
        <h2>Time</h2>
        <div className='popup__buttons'>
          <div>Prev level</div>
          <div>Retry</div>
          <div>Next level</div>
        </div>
      </div>
    </>
  );
};

export default CompletePopup;
