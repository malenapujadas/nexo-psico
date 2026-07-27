import { Hero } from '../components/Hero';
import { ServicesIntro } from '../components/ServicesIntro';
import { Services } from '../components/Services';
import { Testimonials } from '../components/Testimonials';
import { Team } from '../components/Team';
import React, { useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { supabase } from '../supabase'; 

export const Home = () => {
  const navigate = useNavigate();

  // Escucha si venís del mail de recuperación
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        navigate('/actualizar-password');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);
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