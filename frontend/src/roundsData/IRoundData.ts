import { ISpider, TNet } from '../context/roundContext';

export default interface IRoundData {
  spiders: ISpider[];
  nets: TNet[];
}
