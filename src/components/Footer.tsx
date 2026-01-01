import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Footer.scss'

function Footer() {
  return (
    <footer>
      <div>
        <a href="https://github.com/haroldzhong" target="_blank" rel="noreferrer"><GitHubIcon /></a>
        <a href="https://linkedin.com/in/haocong-zhong" target="_blank" rel="noreferrer"><LinkedInIcon /></a>
      </div>
      <p>Designed & built by Harold with 💜</p>
    </footer>
  );
}

export default Footer;

