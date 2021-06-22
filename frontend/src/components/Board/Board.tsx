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
          // why doesn't work ? changing one spider in context state change them all in some way ?
          return useMemo(() => {
            return <Spider key={spider.id} spiderId={spider.id} />;
          }, [spider]);
        })}
      {nets.map((net, i) => {
        return (
          <Net
            key={i}
            spider1Id={net.pair[0]}
            spider2Id={net.pair[1]}
            isIntersection={net.isIntersection}
          />
        );
      })}
    </div>
  );
};

export default Board;
