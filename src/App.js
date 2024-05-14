import './App.css';
import Carousel from './components/Carousel';
import Clients from './components/Clients';
import LandingFooter from './components/LandingFooter';
import LandingNavbar from './components/LandingNavbar';
import MessengerChat from './components/MessengerChat';
import ServiceCardSlides from './components/ServiceCardSlides';

function App() {
  return (
  <>
      <LandingNavbar />
      <Carousel />
      <ServiceCardSlides />
      <Clients />
      {/* <MessengerChat /> */}
      <LandingFooter />
  </>
  );
}

export default App;
