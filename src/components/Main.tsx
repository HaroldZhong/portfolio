import React from "react";
import { Link } from "react-router-dom";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { ArrowRight } from 'lucide-react';
import AuroraBackground from './AuroraBackground';
import profileImage from '../images/profile-headshot.jpg';
import '../assets/styles/Main.scss';

function Main() {
  const badges = [
    "Health Inequality Research",
    "Survey Methods & Causal Inference",
    "Applied AI Systems"
  ];

  // Obfuscated email
  const getEmail = () => {
    const user = 'harold.zhong';
    const domain = 'utexas.edu';
    return `${user}@${domain}`;
  };

  return (
    <AuroraBackground>
      <div className="container">
        <div className="about-section" id="home">
          <div className="hero-content">

            {/* Headshot and Name */}
            <div className="hero-header">
              <div className="headshot-wrapper">
                <img src={profileImage} alt="Headshot of Harold Zhong" className="headshot" width={210} height={210} loading="eager" />
              </div>
              <div className="hero-text-wrapper">
                <h1 className="hero-title">Harold Zhong</h1>
                <h2 className="hero-job-title">Applied AI Engineer &amp; Researcher</h2>
                <p className="hero-tagline">I build AI systems and data workflows for reliable applications and rigorous research.</p>
              </div>
            </div>

            {/* Badge Pills */}
            <div className="badge-pills">
              {badges.map((badge, index) => (
                <span key={index} className="badge-pill">{badge}</span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="cta-container">
              <Link to="/#projects" className="cta-button primary">
                Explore my work <ArrowRight size={20} />
              </Link>
              <Link to="/#contact" className="cta-button">Get in touch</Link>
            </div>

            {/* Social Links - Below CTA */}
            <div className="social_icons">
              <a href="https://github.com/HaroldZhong" target="_blank" rel="noreferrer" aria-label="GitHub">
                <GitHubIcon />
              </a>
              <a href="https://linkedin.com/in/haocong-zhong" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a href={`mailto:${getEmail()}`} target="_blank" rel="noreferrer" aria-label="Email">
                <EmailIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}

export default Main;
