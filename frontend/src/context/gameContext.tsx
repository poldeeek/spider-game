import { useReducer, Dispatch } from 'react';
import { createContext } from 'react';
import { CHANGE_SPIDER_POSITION, CHECK_INTERSECTION } from './actionTypes';

export type GameStateType = {
  level: number;
};

const initState = {
  level: 1
};

const GameContext = createContext<{
  gameState: GameStateType;
  gameDispatch: Dispatch<any>;
}>({
  gameState: initState,
  gameDispatch: () => null
});

const GameReducer = (state: any, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

const GameProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(GameReducer, initState);

  return (
    <GameContext.Provider value={{ gameState: state, gameDispatch: dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameProvider };
export default GameContext;
