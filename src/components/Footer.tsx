import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-cta">
            <p>Working on AI, health, or research data?</p>
            <Link to="/#contact" className="btn btn-primary">Start a conversation <ArrowUpRight size={18} /></Link>
          </div>
          <div className="footer-col footer-col-first">
            <h2>Index</h2>
            <ul>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/#history">Experience</Link></li>
              <li><Link to="/#publications">Publications</Link></li>
              <li><Link to="/blog">Articles</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h2>Elsewhere</h2>
            <ul>
              <li><a href="https://github.com/HaroldZhong" target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href="https://linkedin.com/in/haocong-zhong" target="_blank" rel="noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <p className="footer-wordmark" aria-hidden="true">Harold <em>Zhong</em></p>
        <div className="footer-base mono">
          <p>Designed &amp; built by Harold</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
