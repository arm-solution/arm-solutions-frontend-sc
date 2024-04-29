import './App.css';
import Carousel from './components/Carousel';
import LandingFooter from './components/LandingFooter';
import LandingNavbar from './components/LandingNavbar';
import ServiceCardSlides from './components/ServiceCardSlides';

function App() {
  return (
  <>
      <LandingNavbar />
      <Carousel />
      <ServiceCardSlides />
      <LandingFooter />
  </>
  );
}

export default App;
