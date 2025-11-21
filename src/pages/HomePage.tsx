import React from 'react';
import Main from '../components/Main';
import Expertise from '../components/Expertise';
import Timeline from '../components/Timeline';
import Project from '../components/Project';
import RecentBlogs from '../components/RecentBlogs';
import Contact from '../components/Contact';
import FadeIn from '../components/FadeIn';
import { useEffect } from 'react';

const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <FadeIn transitionDuration={700}>
      <Main />
      <Expertise />
      <Timeline />
      <Project />
      <RecentBlogs />
      <Contact />
    </FadeIn>
  );
};

export default HomePage;
