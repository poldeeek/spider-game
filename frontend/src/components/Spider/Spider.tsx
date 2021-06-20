import { useEffect, useState } from 'react';
import './Spider.scss';

interface ISpiderProps {
  initTop: number;
  initLeft: number;
}

const Spider: React.FC<ISpiderProps> = ({ initTop, initLeft }) => {
  const [top, setTop] = useState(initTop);
  const [left, setLeft] = useState(initLeft);

  return <div className='spider' style={{ top: top, left: left }}></div>;
};

export default Spider;
