import './Board.scss';
import Spider from '../Spider/Spider';
import Net from '../Net/Net';

const Board = () => {
  const spiders = [
    {
      initTop: 300, // y
      initLeft: 400 // x
    },
    {
      initTop: 50,
      initLeft: 100
    },
    {
      initTop: 50,
      initLeft: 700
    }
  ];

  const nets = [
    [0, 1],
    [0, 2],
    [1, 2]
  ];

  return (
    <div className='board'>
      {spiders &&
        spiders.map((spider, i) => (
          <Spider key={i} initLeft={spider.initLeft} initTop={spider.initTop} />
        ))}
      {nets.map((net, i) => {
        return (
          <Net key={i} spider1={spiders[net[0]]} spider2={spiders[net[1]]} />
        );
      })}
    </div>
  );
};

export default Board;
