import { Hero } from '../components/Hero';
import { ServicesIntro } from '../components/ServicesIntro';
import { Services } from '../components/Services';
import { Testimonials } from '../components/Testimonials';
import { Team } from '../components/Team';

export const Home = () => {
  return (
    <>
      <Hero />
      <ServicesIntro />
      <Services />
      <Testimonials />
      <Team />
    </>
  );
};
