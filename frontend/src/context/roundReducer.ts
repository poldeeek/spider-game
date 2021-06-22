import checkIntersections from '../helpers/checkIntersection';
import * as actions from './actionTypes';
import { RoundStateType } from './roundContext';
import roundsData from '../roundsData/rounds';

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
    case actions.TIME_STOP:
      return { ...state, time: action.payload.time };
    default:
      return state;
  }
};

export default RoundReducer;
