import { useEffect, useState, MouseEvent, useRef } from 'react';
import './Spider.scss';

interface ISpiderProps {
  initTop: number;
  initLeft: number;
}

const Spider: React.FC<ISpiderProps> = ({ initTop, initLeft }) => {
  const [top, setTop] = useState(initTop);
  const [left, setLeft] = useState(initLeft);
  const myRef = useRef<HTMLDivElement>(null);

  // const handleMouseMove = (e: globalThis.MouseEvent) => {};

  const handleMouseUp = (e: globalThis.MouseEvent) => {
    console.log('haha');
    e = e || window.event;
    e.preventDefault();
    if (!myRef || !myRef.current) return;
    document.onmousemove = null;
    document.onmouseup = null;

    // TODO everything is null, but the objects are still moving after no mouse up
    console.log(document.onmouseup, myRef.current.onmouseup);
    console.log(document.onmousemove, myRef.current.onmousemove);
  };

  const handleMouseDown = (e: globalThis.MouseEvent) => {
    e = e || window.event;
    e.preventDefault();
    if (!myRef || !myRef.current) return;

    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    // image position
    pos3 = e.clientX;
    pos4 = e.clientY;

    document.addEventListener('mouseup', handleMouseUp);

    document.addEventListener('mousemove', (e) => {
      console.log('lol');

      if (!myRef || !myRef.current) return;

      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      // set the element's new position:
      myRef.current.style.top = myRef.current.offsetTop - pos2 + 'px';
      myRef.current.style.left = myRef.current.offsetLeft - pos1 + 'px';
    });
  };

  useEffect(() => {
    if (!myRef || !myRef.current) return;

    myRef.current.addEventListener('mousedown', handleMouseDown);

    return () => {
      if (!myRef || !myRef.current) return;
      myRef.current.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.onmousemove = null;
    };
  }, [myRef]);
  console.log(document.onmouseup);

  return (
    <div
      ref={myRef}
      draggable
      className='spider'
      style={{ top: top, left: left }}></div>
  );
};

export default Spider;
