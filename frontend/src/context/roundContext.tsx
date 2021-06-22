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
  isComplete: boolean;
  showCompletePopup: boolean;
  spiders: ISpider[];
  nets: TNet[];
};

const initState: RoundStateType = {
  ...roundsData[0],
  round: 1,
  isComplete: false,
  showCompletePopup: false
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
          showCompletePopup: true
        };
      }
      return state;
    case actions.REPLAY:
      return {
        ...state,
        ...roundsData[state.round - 1],
        isComplete: false,
        showCompletePopup: false
      };
    case actions.REPLAY:
      return {
        ...state,
        ...roundsData[state.round - 1],
        isComplete: false,
        showCompletePopup: false
      };
    case actions.NEXT_ROUND:
      const nextRound = state.round + 1;

      return {
        ...state,
        ...roundsData[nextRound - 1],
        round: nextRound,
        isComplete: false,
        showCompletePopup: false
      };
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
