import { useContext } from 'react';
import './Header.scss';
import GameContext from '../../context/gameContext';

const Header = () => {
  const { gameState } = useContext(GameContext);

  const level = gameState.level;
  return (
    <header>
      <h1>Level {level}</h1>
    </header>
  );
};

export default Header;
