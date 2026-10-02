import React from 'react';
import Main from '../components/Main';
import Expertise from '../components/Expertise';
import Timeline from '../components/Timeline';
import Education from '../components/Education';
import Publications from '../components/Publications';
import Project from '../components/Project';
import RecentBlogs from '../components/RecentBlogs';
import Contact from '../components/Contact';
import FadeIn from '../components/FadeIn';
import { usePageMeta } from '../hooks/usePageMeta';

const HomePage: React.FC = () => {
  usePageMeta();

  return (
    <FadeIn transitionDuration={700}>
      <Main />
      <Project />
      <Timeline />
      <Expertise />
      <Education />
      <Publications />
      <RecentBlogs />
      <Contact />
    </FadeIn>
  );
};

export default HomePage;
