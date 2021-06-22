import { useEffect, useContext, useState, MouseEvent, useRef } from 'react';
import './Spider.scss';
import SpidersContext from '../../../context/spidersContext';
import {
  CHANGE_SPIDER_POSITION,
  CHECK_INTERSECTION
} from '../../../context/actionTypes';

interface ISpiderProps {
  spiderId: number;
}

// TODO At this time every spider is rerender when his position is changing. It has to be only the active one.
// TODO useMemo - https://github.com/facebook/react/issues/15156 - try again later ?? Maybe the issue is with update context state

const Spider: React.FC<ISpiderProps> = ({ spiderId }) => {
  const [active, setActive] = useState(false);
  const { spidersState, spidersDispatch } = useContext(SpidersContext);
  const spider = spidersState.spiders.find((spider) => spider.id === spiderId);

  if (!spider) return null;
  const myRef = useRef<HTMLDivElement>(null);

  const [pos3, setPos3] = useState(0);
  const [pos4, setPos4] = useState(0);

  function checkSpiderPosition(): boolean {
    if (!myRef || !myRef.current) return false;

    const offsetLeft = myRef.current.offsetLeft;
    const offsetTop = myRef.current.offsetTop;
    if (offsetLeft > 850) {
      myRef.current.style.left = 850 + 'px';
      return false;
    }
    if (offsetLeft < 0) {
      myRef.current.style.left = 0 + 'px';
      return false;
    }
    if (offsetTop > 380) {
      myRef.current.style.top = 380 + 'px';
      return false;
    }
    if (offsetTop < -30) {
      myRef.current.style.top = -30 + 'px';
      return false;
    }
    return true;
  }

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!myRef || !myRef.current) return;
    e = e || window.event;
    e.preventDefault();

    // image position
    setPos3(e.clientX);
    setPos4(e.clientY);

    // make an active spider displayed before the other
    myRef.current.style.zIndex = '101';
    setActive(true);
  };

  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    e = e || window.event;
    e.preventDefault();
    setActive(false);
    if (!myRef || !myRef.current) return;
    myRef.current.style.zIndex = '100';
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!myRef || !myRef.current || !active) return;

    e = e || window.event;
    e.preventDefault();

    if (!checkSpiderPosition()) return;

    let pos1 = pos3 - e.clientX;
    let pos2 = pos4 - e.clientY;
    setPos3(e.clientX);
    setPos4(e.clientY);

    // set the element's new position:
    const X = myRef.current.offsetLeft - pos1;
    const Y = myRef.current.offsetTop - pos2;

    spidersDispatch({
      type: CHANGE_SPIDER_POSITION,
      payload: {
        id: spiderId,
        x: X,
        y: Y
      }
    });

    // can be also in handleMouseUp function to check the lines after user drop the spider
    spidersDispatch({ type: CHECK_INTERSECTION });
  };

  useEffect(() => {
    if (!myRef || !myRef.current) return;

    myRef.current.style.left = spider.x + 'px';
    myRef.current.style.top = spider.y + 'px';
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
