import { useReducer, Dispatch } from 'react';
import { createContext } from 'react';
import roundsData from '../roundsData/rounds';
import RoundReducer from './roundReducer';

export interface ISpider {
  id: number;
  initTop: number;
  initLeft: number;
  x: number;
  y: number;
}

export type TNet = { pair: [number, number]; isIntersection: boolean };

export type RoundStateType = {
  round: number;
  roundsNumber: number;
  isComplete: boolean;
  showCompletePopup: boolean;
  error: string;
  spiders: ISpider[];
  nets: TNet[];
  time: string;
};

const initState: RoundStateType = {
  ...roundsData[0],
  error: '',
  roundsNumber: roundsData.length,
  round: 1,
  // change to false with first changing spider position
  isComplete: true,
  showCompletePopup: false,
  time: ''
};

const RoundContext = createContext<{
  roundState: RoundStateType;
  roundDispatch: Dispatch<any>;
}>({
  roundState: initState,
  roundDispatch: () => null
});

const RoundProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(RoundReducer, initState);

  return (
    <RoundContext.Provider
      value={{ roundState: state, roundDispatch: dispatch }}>
      {children}
    </RoundContext.Provider>
  );
};

export default RoundContext;
export { RoundReducer, RoundProvider };
