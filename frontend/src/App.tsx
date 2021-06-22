import { useContext } from 'react';
import Board from './components/Board/Board';
import CompletePopup from './components/CompletePopup/CompletePopup';
import Header from './components/Header/Header';
import RoundContext from './context/roundContext';

const App = () => {
  const { roundState, roundDispatch } = useContext(RoundContext);
  const showCompletePopup = roundState.showCompletePopup;

  let popup = null;
  if (showCompletePopup) {
    popup = <CompletePopup />;
  }

  return (
    <>
      {popup}
      <Header />
      <Board />
    </>
  );
};

export default App;
