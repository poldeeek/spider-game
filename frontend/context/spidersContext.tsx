import { useReducer, Dispatch } from 'react';
import { createContext } from 'react';

type Spider = {
  initTop: number;
  initLeft: number;
};

type InitialStateType = {
  spiders: Spider[];
};

const initState = {
  spiders: [
    {
      initTop: 300, // y
      initLeft: 400 // x
    },
    {
      initTop: 50,
      initLeft: 100
    },
    {
      initTop: 50,
      initLeft: 700
    },
    {
      initTop: 250,
      initLeft: 100
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

const SpidersReducer = (state: any, action: any) => {
  switch (action.type) {
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
