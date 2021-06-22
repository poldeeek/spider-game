import { useContext } from 'react';
import './Header.scss';
import RoundContext from '../../context/roundContext';
import Timer from '../Timer/Timer';

const Header: React.FC = () => {
  const { roundState } = useContext(RoundContext);

  const round = roundState.round;
  return (
    <header>
      <h1>Level {round}</h1>
      <Timer />
    </header>
  );
};

export default Header;
