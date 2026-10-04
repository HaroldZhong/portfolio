import React from 'react';
import Main from '../components/Main';
import About from '../components/About';
import Expertise from '../components/Expertise';
import Timeline from '../components/Timeline';
import Education from '../components/Education';
import Publications from '../components/Publications';
import Project from '../components/Project';
import RecentBlogs from '../components/RecentBlogs';
import Contact from '../components/Contact';
import { usePageMeta } from '../hooks/usePageMeta';
import '../assets/styles/Home.scss';

const HomePage: React.FC = () => {
  usePageMeta();

  return (
    <>
      <Main />
      <About />
      <Project />
      <Timeline />
      <Expertise />
      <Education />
      <Publications />
      <RecentBlogs />
      <Contact />
    </>
  );
};

export default HomePage;
