import { useReducer, Dispatch } from 'react';
import { createContext } from 'react';
import checkIntersections from '../helpers/checkIntersection';
import * as actions from './actionTypes';

import roundsData from '../roundsData/rounds';

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

const RoundReducer = (state: RoundStateType, action: any) => {
  switch (action.type) {
    case actions.CHANGE_SPIDER_POSITION:
      const foundIndex = state.spiders.findIndex(
        (spider) => spider.id === action.payload.id
      );

      const updatedSpider = {
        ...state.spiders[foundIndex],
        x: action.payload.x,
        y: action.payload.y
      };

      return {
        ...state,
        isComplete: false,
        spiders: [
          ...state.spiders.slice(0, foundIndex),
          updatedSpider,
          ...state.spiders.slice(foundIndex + 1)
        ]
      };
    case actions.CHECK_INTERSECTION:
      const checkedNets = checkIntersections(state);
      return {
        ...state,
        nets: [...checkedNets]
      };
    case actions.CHECK_IS_COMPLETED:
      const failIntersection = state.nets.find((net) => net.isIntersection);
      if (!failIntersection) {
        return {
          ...state,
          isComplete: true,
          showCompletePopup: true,
          error: ''
        };
      }
      return state;
    case actions.REPLAY:
      return {
        ...state,
        ...roundsData[state.round - 1],
        showCompletePopup: false,
        error: '',
        time: ''
      };
    case actions.NEXT_ROUND:
      const nextRound = state.round + 1;
      if (nextRound > state.roundsNumber)
        return { ...state, error: 'That was the last round!' };
      return {
        ...state,
        ...roundsData[nextRound - 1],
        round: nextRound,
        showCompletePopup: false,
        error: '',
        time: ''
      };
    case actions.PREV_ROUND:
      const prevRound = state.round - 1;
      if (prevRound < 1) {
        return { ...state, error: 'This is the first round!' };
      }
      return {
        ...state,
        ...roundsData[prevRound - 1],
        round: prevRound,
        showCompletePopup: false,
        error: '',
        time: ''
      };
    case 'TIME_STOP':
      return { ...state, time: action.payload.time };
    default:
      return state;
  }
};

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
