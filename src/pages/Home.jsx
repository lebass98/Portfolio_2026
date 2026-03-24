import Hero from '../components/Hero';
import About from '../components/About';
import Portfolio from '../components/Portfolio';

const Home = ({ theme }) => {
  return (
    <>
      <Hero theme={theme} />
      <About theme={theme} />
      <Portfolio theme={theme} />
    </>
  );
};

export default Home;
