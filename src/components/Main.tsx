import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { ArrowRight } from 'lucide-react';
import AuroraBackground from './AuroraBackground';
import profileImage from '../images/profile-headshot.jpg';
import '../assets/styles/Main.scss';

function Main() {
  const badges = [
    "AI Research & Agents",
    "Product & Workflow Design",
    "Health Data & Inequality"
  ];

  return (
    <AuroraBackground>
      <div className="container">
        <div className="about-section">
          <div className="hero-content">
            
            {/* Social Links ABOVE name */}
            <div className="social_icons">
              <a href="https://github.com/haroldzhong" target="_blank" rel="noreferrer" aria-label="GitHub">
                <GitHubIcon/>
              </a>
              <a href="https://linkedin.com/in/haocong-zhong" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedInIcon/>
              </a>
              <a href="haocong.zhong.research@gmail.com" target="_blank" rel="noreferrer" aria-label="Email">
                <EmailIcon/>
              </a>
            </div>

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
            <p className="subtitle">Research Associate at UT Austin, turning health data into AI tools for families and work.</p>
            
            <p className="tagline">
              I work where NHIS/NHANES datasets, real psychiatry and parenting challenges, and LLM systems collide — building tools that fit messy, real-world workflows.
            </p>

            {/* Badge Pills - Moved Below Description */}
            <div className="badge-pills">
              {badges.map((badge, index) => (
                <span key={index} className="badge-pill">{badge}</span>
              ))}
            </div>

            {/* CTA Button - Updated to match theme */}
            <a href="#projects" className="cta-button">
              View My Work <ArrowRight size={20} />
            </a>

            {/* Now Box with Glassmorphism */}
            <div className="now-box">
              <h3>Now</h3>
              <ul>
                <li>Research Associate IV @ UT Austin School of Social Work</li>
                <li>Leading and supporting NHIS/NHANES-based health inequality analyses</li>
                <li>Refining BRAT, a family-therapy chatbot for parent–child role-play</li>
                <li>Exploring future directions for AI × health and long-term product ideas</li>
              </ul>
            </div>

            <div className="mobile_social_icons">
              <a href="https://github.com" target="_blank" rel="noreferrer"><GitHubIcon/></a>
              <a href="https://linkedin.com/in/haocong-zhong" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
              <a href="mailto:your.email@example.com" target="_blank" rel="noreferrer"><EmailIcon/></a>
            </div>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}

export default Main;
