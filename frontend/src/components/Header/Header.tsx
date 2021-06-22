import { useContext } from 'react';
import './Header.scss';
import RoundContext from '../../context/roundContext';

const Header = () => {
  const { roundState, roundDispatch } = useContext(RoundContext);

  const round = roundState.round;
  return (
    <header>
      <h1>Level {round}</h1>
    </header>
  );
};

export default Header;
