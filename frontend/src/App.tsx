import Board from './components/Board/Board';
import { SpidersProvider } from '../context/spidersContext';

const App = () => {
  return (
    <SpidersProvider>
      <Board />
    </SpidersProvider>
  );
};

export default App;
