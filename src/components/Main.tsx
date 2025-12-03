import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { ArrowRight, FileText } from 'lucide-react';
import AuroraBackground from './AuroraBackground';
import profileImage from '../images/profile-headshot.jpg';
import '../assets/styles/Main.scss';

function Main() {
  const badges = [
    "AI Research & Agents",
    "Product & Workflow Design",
    "Health Data & Inequality"
  ];

  // Obfuscated email
  const getEmail = () => {
    const user = 'haocong.zhong.research';
    const domain = 'gmail.com';
    return `${user}@${domain}`;
  };

  return (
    <AuroraBackground>
      <div className="container">
        <div className="about-section">
          <div className="hero-content">

            {/* Headshot and Name */}
            <div className="hero-header">
              <div className="headshot-wrapper">
                <img src={profileImage} alt="Harold Zhong" className="headshot" />
              </div>
              <div className="hero-text-wrapper">
                <h1 className="hero-title">Harold Zhong</h1>
                <p className="hero-tagline">Social Science & AI for Social Impact</p>
              </div>
            </div>

            {/* Main Description */}
            <p className="subtitle">Research Associate at UT Austin, building AI tools grounded in health data.</p>

            <p className="tagline">
              I sit at the intersection of health data, mental health challenges and agentic LLM systems — designing tools that fit messy, real-world workflows.
            </p>

            {/* Badge Pills - Moved Below Description */}
            <div className="badge-pills">
              {badges.map((badge, index) => (
                <span key={index} className="badge-pill">{badge}</span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="cta-container">
              <a href="#projects" className="cta-button primary">
                View My Work <ArrowRight size={20} />
              </a>
              <div className="resume-buttons">
                <a href="/portfolio/resume.pdf" target="_blank" rel="noopener noreferrer" className="cta-button secondary">
                  <FileText size={18} />
                  Resume
                </a>
                <a href="/portfolio/cv.pdf" target="_blank" rel="noopener noreferrer" className="cta-button secondary">
                  <FileText size={18} />
                  CV
                </a>
              </div>
            </div>

            {/* Social Links - Below CTA */}
            <div className="social_icons">
              <a href="https://github.com/haroldzhong" target="_blank" rel="noreferrer" aria-label="GitHub">
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
