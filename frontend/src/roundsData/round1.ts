import IRoundData from './IRoundData';

const round1Data: IRoundData = {
  spiders: [
    {
      id: 0,
      initTop: 300,
      initLeft: 400,
      y: 300,
      x: 400
    },
    {
      id: 1,
      initTop: 50,
      initLeft: 100,
      y: 50,
      x: 100
    },
    {
      id: 2,
      initTop: 50,
      initLeft: 700,
      y: 50,
      x: 700
    },
    {
      id: 3,
      initTop: 250,
      initLeft: 100,
      y: 0,
      x: 400
    }
  ],
  nets: [
    {
      pair: [0, 1],
      isIntersection: false
    },
    {
      pair: [0, 2],
      isIntersection: false
    },
    {
      pair: [1, 2],
      isIntersection: false
    },
    {
      pair: [0, 3],
      isIntersection: false
    }
  ]
};

export default round1Data;
