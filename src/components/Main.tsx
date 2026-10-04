import React from "react";
import { Link } from "react-router-dom";
import { ArrowDownRight, Github, Linkedin } from 'lucide-react';
import AuroraBackground from './AuroraBackground';
import profileImage from '../images/profile-headshot.jpg';

const focusAreas = [
  "LLM Evaluation & Safety",
  "Data Quality & Governance",
  "Survey & Health-Inequality Research"
];

function Main() {
  return (
    <AuroraBackground>
      <section className="about-section" id="home" aria-labelledby="hero-title">
        <div className="hero shell">
          <p className="eyebrow hero-eyebrow"><span className="signal" aria-hidden="true" />Applied AI Engineer &amp; Researcher</p>

          <h1 className="hero-title" id="hero-title">
            <span className="line line-1"><span>Harold</span></span>
            {' '}
            <span className="hero-portrait-frame"><img src={profileImage} alt="" className="hero-portrait" width={600} height={800} {...{ fetchpriority: "high" }} /></span>
            <span className="line line-2"><span><em>Zhong</em></span></span>
          </h1>

          <div className="hero-grid">
            <div className="hero-copy">
              <p className="hero-tagline">I build AI systems and data workflows for reliable applications and rigorous research.</p>
              <div className="cta-container">
                <Link to="/#projects" className="btn btn-primary">Explore my work <ArrowDownRight size={18} /></Link>
                <Link to="/#contact" className="btn">Get in touch</Link>
              </div>
            </div>

            <div className="hero-focus">
              <p className="eyebrow">Focus</p>
              <ol>
                {focusAreas.map((area, index) => (
                  <li key={area}><span className="mono">0{index + 1}</span>{area}</li>
                ))}
              </ol>
              <div className="social_icons">
                <a className="icon-button" href="https://github.com/HaroldZhong" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={19} strokeWidth={1.75} /></a>
                <a className="icon-button" href="https://linkedin.com/in/haocong-zhong" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={19} strokeWidth={1.75} /></a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </AuroraBackground>
  );
}

export default Main;
