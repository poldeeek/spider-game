import ReactDOM from 'react-dom';
import App from './App';
import './styles.scss';

import { RoundProvider } from './context/roundContext';
import { GameProvider } from './context/gameContext';

ReactDOM.render(
  <GameProvider>
    <RoundProvider>
      <App />
    </RoundProvider>
  </GameProvider>,
  document.getElementById('root')
);
