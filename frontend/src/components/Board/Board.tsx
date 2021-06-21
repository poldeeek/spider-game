import { useContext, useMemo } from 'react';
import './Board.scss';
import Spider from '../Spider/Spider';
import Net from '../Net/Net';
import SpidersContext from '../../../context/spidersContext';

const Board = () => {
  const { spidersState } = useContext(SpidersContext);
  const spiders = spidersState.spiders;
  const nets = spidersState.nets;

  return (
    <div className='board'>
      {spiders &&
        spiders.map((spider) => {
          // why doesn't work ?
          return useMemo(() => {
            return <Spider key={spider.id} spiderId={spider.id} />;
          }, [spider]);
        })}
      {nets.map((net, i) => {
        return <Net key={i} spider1Id={net[0]} spider2Id={net[1]} />;
      })}
    </div>
  );
};

export default Board;
