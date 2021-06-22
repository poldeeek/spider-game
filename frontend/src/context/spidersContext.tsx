import { useReducer, Dispatch } from 'react';
import { createContext } from 'react';
import checkIntersections from '../helpers/checkIntersection';
import { CHANGE_SPIDER_POSITION, CHECK_INTERSECTION } from './actionTypes';

export interface ISpider {
  id: number;
  initTop: number;
  initLeft: number;
  x: number;
  y: number;
}

export type TNet = { pair: [number, number]; isIntersection: boolean };

export type SpidersStateType = {
  spiders: ISpider[];
  nets: TNet[];
};

const initState: SpidersStateType = {
  spiders: [
    {
      id: 0,
      initTop: 300,
      initLeft: 400,
      y: 300,
      x: 400
    },
    {
      id: 1,
      initTop: 50,
      initLeft: 100,
      y: 50,
      x: 100
    },
    {
      id: 2,
      initTop: 50,
      initLeft: 700,
      y: 50,
      x: 700
    },
    {
      id: 3,
      initTop: 250,
      initLeft: 100,
      y: 0,
      x: 400
    }
  ],
  nets: [
    {
      pair: [0, 1],
      isIntersection: false
    },
    {
      pair: [0, 2],
      isIntersection: false
    },
    {
      pair: [1, 2],
      isIntersection: false
    },
    {
      pair: [0, 3],
      isIntersection: false
    }
  ]
};

const SpidersContext = createContext<{
  spidersState: SpidersStateType;
  spidersDispatch: Dispatch<any>;
}>({
  spidersState: initState,
  spidersDispatch: () => null
});

const SpidersReducer = (state: SpidersStateType, action: any) => {
  switch (action.type) {
    case CHANGE_SPIDER_POSITION:
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
    case CHECK_INTERSECTION:
      const checkedNets = checkIntersections(state);
      return {
        ...state,
        nets: [...checkedNets]
      };
    default:
      return state;
  }
};

const SpidersProvider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(SpidersReducer, initState);

  return (
    <SpidersContext.Provider
      value={{ spidersState: state, spidersDispatch: dispatch }}>
      {children}
    </SpidersContext.Provider>
  );
};

export default SpidersContext;
export { SpidersReducer, SpidersProvider };
