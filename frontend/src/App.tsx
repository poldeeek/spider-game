import './styles.css';
import image from './image.png';
import svgImage from './svgImage.svg';

const App = () => {
  return (
    <>
      <h1>Hello!</h1>
      <img src={image} alt='image' width='300' height='300' />
      <img src={svgImage} alt='image' width='300' height='300' />
    </>
  );
};

export default App;
