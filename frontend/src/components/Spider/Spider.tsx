import { useEffect, useContext, useState, MouseEvent, useRef } from 'react';
import './Spider.scss';
import SpidersContext from '../../../context/spidersContext';
import { CHANGE_SPIDER_POSITION } from '../../../context/actionTypes';

interface ISpiderProps {
  spiderId: number;
}

// TODO At this time every spider is rerender when position is changing. It has to be only the active one.
// TODO useMemo - https://github.com/facebook/react/issues/15156 - try again later

const Spider: React.FC<ISpiderProps> = ({ spiderId }) => {
  const [active, setActive] = useState(false);
  const { spidersState, dispatch } = useContext(SpidersContext);
  const spider = spidersState.spiders.find((spider) => spider.id === spiderId);

  if (!spider) return null;
  const myRef = useRef<HTMLDivElement>(null);

  const [pos3, setPos3] = useState(0);
  const [pos4, setPos4] = useState(0);
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!myRef || !myRef.current) return;
    e = e || window.event;
    e.preventDefault();

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

    const top = myRef.current.offsetTop - pos2;
    const left = myRef.current.offsetLeft - pos1;

    dispatch({
      type: CHANGE_SPIDER_POSITION,
      payload: {
        id: spiderId,
        x: top,
        y: left
      }
    });
  };

  useEffect(() => {
    if (!myRef || !myRef.current) return;

    myRef.current.style.top = spider.x + 'px';
    myRef.current.style.left = spider.y + 'px';
  }, [spider]);

  return (
    <div
      ref={myRef}
      draggable
      className='spider'
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setActive(false)}></div>
  );
};

export default Spider;
