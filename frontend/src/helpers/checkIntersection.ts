import { TNet } from '../context/spidersContext';
import { SpidersStateType } from '../context/spidersContext';

type Point = [number, number];

const checkIntersections = (state: SpidersStateType) => {
  let checkedNets: TNet[] = [];
  const spiders = [...state.spiders];
  const nets = [...state.nets];

  nets.forEach((net) => {
    let isIntersection = false;
    const A: Point = [spiders[net.pair[0]].x, spiders[net.pair[0]].y];
    const B: Point = [spiders[net.pair[1]].x, spiders[net.pair[1]].y];

    for (let net2 of nets) {
      const C: Point = [spiders[net2.pair[0]].x, spiders[net2.pair[0]].y];
      const D: Point = [spiders[net2.pair[1]].x, spiders[net2.pair[1]].y];

      const v1 = vectorProduct(C, D, A);
      const v2 = vectorProduct(C, D, B);
      const v3 = vectorProduct(A, B, C);
      const v4 = vectorProduct(A, B, D);

      if (
        ((v1 > 0 && v2 < 0) || (v1 < 0 && v2 > 0)) &&
        ((v3 > 0 && v4 < 0) || (v3 < 0 && v4 > 0))
      ) {
        isIntersection = true;
        break;
      }
    }
    checkedNets.push({
      ...net,
      isIntersection
    });
  });

  return checkedNets;
};

const vectorProduct = (X: Point, Y: Point, Z: Point) => {
  const x1 = Z[0] - X[0];
  const y1 = Z[1] - X[1];
  const x2 = Y[0] - X[0];
  const y2 = Y[1] - X[1];
  return x1 * y2 - x2 * y1;
};

export default checkIntersections;
