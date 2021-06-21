import './Board.scss';
import Spider from '../Spider/Spider';

const Board = () => {
  return (
    <div className='board'>
      <Spider initTop={300} initLeft={400} />
      <Spider initTop={50} initLeft={100} />
    </div>
  );
};

export default Board;
