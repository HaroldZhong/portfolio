import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation, Footer, BackToTop } from "./components";
import HomePage from './pages/HomePage';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import ProjectDetail from './pages/ProjectDetail';
import './index.scss';

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Immediate scroll to top on mount and route change
        window.history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App() {
    const [mode, setMode] = useState<string>('dark');

    const handleModeChange = () => {
        if (mode === 'dark') {
            setMode('light');
        } else {
            setMode('dark');
        }
    }

    return (
    <BrowserRouter basename="/portfolio">
      <ScrollToTop />
      <div className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        <Navigation parentToChild={{mode}} modeChange={handleModeChange}/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
        </Routes>
        <Footer />
        <BackToTop />
      </div>
    </BrowserRouter>
    );
}

export default App;
