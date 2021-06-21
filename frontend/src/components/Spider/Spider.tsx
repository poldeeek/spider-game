import { useEffect, useState, MouseEvent, useRef } from 'react';
import './Spider.scss';

interface ISpiderProps {
  initTop: number;
  initLeft: number;
}

const Spider: React.FC<ISpiderProps> = ({ initTop, initLeft }) => {
  const [top, setTop] = useState(initTop);
  const [left, setLeft] = useState(initLeft);
  const [active, setActive] = useState(false);

  const myRef = useRef<HTMLDivElement>(null);

  const [pos3, setPos3] = useState(0);
  const [pos4, setPos4] = useState(0);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e = e || window.event;
    e.preventDefault();
    if (!myRef || !myRef.current) return;

    // image position
    setPos3(e.clientX);
    setPos4(e.clientY);

    setActive(true);
  };

  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    e = e || window.event;
    e.preventDefault();
    setActive(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!myRef || !myRef.current || !active) return;

    e = e || window.event;
    e.preventDefault();

    let pos1 = pos3 - e.clientX;
    let pos2 = pos4 - e.clientY;
    setPos3(e.clientX);
    setPos4(e.clientY);
    // set the element's new position:
    if (!myRef || !myRef.current) return;

    myRef.current.style.top = myRef.current.offsetTop - pos2 + 'px';
    myRef.current.style.left = myRef.current.offsetLeft - pos1 + 'px';
  };

  return (
    <div
      ref={myRef}
      draggable
      className='spider'
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setActive(false)}
      style={{ top: top, left: left }}></div>
  );
};

export default Spider;
