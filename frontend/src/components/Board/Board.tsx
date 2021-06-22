import { useContext } from 'react';
import './Board.scss';
import Spider from '../Spider/Spider';
import Net from '../Net/Net';
import RoundContext from '../../context/roundContext';

const Board: React.FC = () => {
  const { roundState } = useContext(RoundContext);

  const spiders = roundState.spiders;
  const nets = roundState.nets;

  return (
    <div className='board'>
      {spiders &&
        spiders.map((spider) => {
          // why useMemo doesn't work ? changing one spider in context state change them all in some way ?
          return <Spider key={spider.id} spiderId={spider.id} />;
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
