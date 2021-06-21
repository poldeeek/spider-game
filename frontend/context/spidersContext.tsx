import { useReducer, Dispatch } from 'react';
import { createContext } from 'react';
import { CHANGE_SPIDER_POSITION } from './actionTypes';

export interface ISpider {
  id: number;
  initTop: number;
  initLeft: number;
  x: number;
  y: number;
}

type InitialStateType = {
  spiders: ISpider[];
};

const initState = {
  spiders: [
    {
      id: 0,
      initTop: 300,
      initLeft: 400,
      x: 300,
      y: 400
    },
    {
      id: 1,
      initTop: 50,
      initLeft: 100,
      x: 50,
      y: 100
    },
    {
      id: 2,
      initTop: 50,
      initLeft: 700,
      x: 50,
      y: 700
    },
    {
      id: 3,
      initTop: 250,
      initLeft: 100,
      x: 250,
      y: 100
    }
  ]
};

const SpidersContext = createContext<{
  spidersState: InitialStateType;
  dispatch: Dispatch<any>;
}>({
  spidersState: initState,
  dispatch: () => null
});

const SpidersReducer = (state: InitialStateType, action: any) => {
  switch (action.type) {
    case CHANGE_SPIDER_POSITION:
      let spidersCopy = [...state.spiders];

      const foundIndex = state.spiders.findIndex(
        (spider) => spider.id === action.payload.id
      );

      spidersCopy[foundIndex] = {
        ...spidersCopy[foundIndex],
        x: action.payload.x,
        y: action.payload.y
      };

      return { ...state, spiders: [...spidersCopy] };
    default:
      return state;
  }
};

const SpidersProvider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(SpidersReducer, initState);

  return (
    <SpidersContext.Provider value={{ spidersState: state, dispatch }}>
      {children}
    </SpidersContext.Provider>
  );
};

export default SpidersContext;
export { SpidersReducer, SpidersProvider };
