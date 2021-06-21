import { useContext } from 'react';
import './Board.scss';
import Spider from '../Spider/Spider';
import Net from '../Net/Net';
import SpidersContext from '../../../context/spidersContext';

const Board = () => {
  const { spidersState } = useContext(SpidersContext);
  const spiders = spidersState.spiders;

  const nets = [
    [0, 1],
    [0, 2],
    [1, 2],
    [0, 3]
  ];

  return (
    <div className='board'>
      {spiders &&
        spiders.map((spider) => {
          return <Spider key={spider.id} spiderId={spider.id} />;
        })}
      {nets.map((net, i) => {
        return (
          <Net key={i} spider1={spiders[net[0]]} spider2={spiders[net[1]]} />
        );
      })}
    </div>
  );
};

export default Board;
