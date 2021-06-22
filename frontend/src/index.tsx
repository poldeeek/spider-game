import ReactDOM from 'react-dom';
import App from './App';
import './styles.scss';

import { SpidersProvider } from './context/spidersContext';
import { GameProvider } from './context/gameContext';

ReactDOM.render(
  <GameProvider>
    <SpidersProvider>
      <App />
    </SpidersProvider>
  </GameProvider>,
  document.getElementById('root')
);
