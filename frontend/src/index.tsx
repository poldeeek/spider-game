import ReactDOM from 'react-dom';
import App from './App';
import './styles.scss';

import { RoundProvider } from './context/roundContext';

ReactDOM.render(
  <RoundProvider>
    <App />
  </RoundProvider>,
  document.getElementById('root')
);
