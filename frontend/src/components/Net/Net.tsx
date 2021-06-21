import { useEffect, useRef, useState, useContext } from 'react';
import SpidersContext from '../../../context/spidersContext';

import './Net.scss';

const Net: React.FC<{ spider1Id: number; spider2Id: number }> = ({
  spider1Id,
  spider2Id
}) => {
  const [style, setStyle] = useState({});
  const myRef = useRef<HTMLDivElement>(null);

  const { spidersState, dispatch } = useContext(SpidersContext);
  const spider1 = spidersState.spiders.find(
    (spider) => spider.id === spider1Id
  );
  const spider2 = spidersState.spiders.find(
    (spider) => spider.id === spider2Id
  );

  if (!spider1 || !spider2) return null;
  useEffect(() => {
    let x1 = spider1.y;
    let y1 = spider1.x;
    let x2 = spider2.y;
    let y2 = spider2.x;

    if (x1 > x2) {
      let xTmp = x1;
      let yTmp = y1;
      x1 = x2;
      y1 = y2;
      x2 = xTmp;
      y2 = yTmp;
    }
    if (x1 === x2) {
      const height = Math.abs(y2 - y1).toString();
      setStyle({
        width: '5px',
        left: (x1 + 75).toString() + 'px',
        top: `${Math.min(y1, y2) + 75}px`,
        height: `${height}px`,
        transform: 'rotate(0deg)'
      });
    } else {
      const a = (y2 - y1) / (x2 - x1);
      const radians = Math.atan(a);
      const degrees = radians * (180 / Math.PI);

      // PROBLEM FOR MINUS DEGREE VALUES
      setStyle({
        width: `${Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))}px`,
        left: (x1 + 75).toString() + 'px',
        top: `${Math.min(y1, y2) + 75}px`,
        height: `5px`,
        transform: `rotate(${degrees}deg)`,
        transformOrigin: `${degrees > 0 ? '0% 0%' : '100% 100%'}`
      });
    }
  }, [spider1, spider2]);

  return <div className='net' style={style} ref={myRef}></div>;
};

export default Net;
