import { useReducer } from 'react';
import { createContext } from 'react';

const initState = [
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
];

const SpidersContext = createContext({});

const SpidersReducer = (state: any, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

const SpidersProvider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(SpidersReducer, initState);

  const value = { state, dispatch };
  return (
    <SpidersContext.Provider value={value}>{children}</SpidersContext.Provider>
  );
};

export default SpidersContext;
export { SpidersReducer, SpidersProvider };
