import IRoundData from './IRoundData';

const round3Data: IRoundData = {
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
      y: 250,
      x: 100
    },
    {
      id: 4,
      initTop: 200,
      initLeft: 700,
      y: 200,
      x: 700
    }
  ],
  nets: [
    {
      pair: [0, 1],
      isIntersection: true
    },
    {
      pair: [0, 2],
      isIntersection: true
    },
    {
      pair: [1, 2],
      isIntersection: false
    },
    {
      pair: [0, 3],
      isIntersection: false
    },
    {
      pair: [0, 4],
      isIntersection: false
    },
    {
      pair: [3, 4],
      isIntersection: true
    }
  ]
};

export default round3Data;
