import React from "react";
import { Link } from "react-router-dom";
import '../assets/styles/Publications.scss';

function Publications() {
  return (
    <div className="container" id="publications">
      <div className="publications-container">
        <h2>Publications & Scholarly Work</h2>

        <p>Research contributions span study platforms, survey harmonization, and reproducible analysis. Acceptance and review status are shown for each contribution.</p>
        <p className="scholarly-links"><Link to="/project/brat-family-therapy-chatbot">BRAT platform contribution</Link> · <Link to="/project/intersectionality-health-disparities">Intersectionality analysis</Link> · <Link to="/project/nhis-nhanes-health-inequality">NHIS methods</Link></p>
        <div className="pub-group">
          <h3>Accepted Journal Article</h3>
          <ul>
            <li>
              Fuentes-Balderrama, J., <strong>Zhong, H.</strong>, Cardenas, M. E., Ayala, S., &amp; Velasco, S. I. AI-Caramba: The experience of mothers in Central Texas with BRAT, a parenting AI-chatbot. <em>Child &amp; Family Social Work</em>. <span className="pub-status">Accepted</span>
            </li>
          </ul>
        </div>

        <div className="pub-group">
          <h3>Manuscripts Under Review</h3>
          <ul>
            <li>
              Cubbin, C., &amp; <strong>Zhong, H.</strong> Replication and exploration of multilevel models of weight status to examine intersectionality. <em>Obesity Science &amp; Practice</em>. <span className="pub-status">Under review</span>
            </li>
            <li>
              Fuentes-Balderrama, J., Romero-Ramos, C., Lozano-Castro, O., <strong>Zhong, H.</strong>, Legorreta-Vega, M., Rivera-Heredia, M. E., &amp; Zayas, L. H. Shot, shot: Factores familiares y escolares asociados al consumo de alcohol en adolescentes michoacanos. <em>PSICUMEX</em>. <span className="pub-status">Under review</span>
            </li>
          </ul>
        </div>

        <div className="pub-group">
          <h3>Accepted Conference Contribution</h3>
          <ul>
            <li>
              Fuentes-Balderrama, J., <strong>Zhong, H.</strong>, Cardenas, M. E., Ayala, S., &amp; Velasco, S. I. AI Caramba: The experience of Hispanic mothers with BRAT, a parenting intervention-enhancing AI-chatbot. Society for Social Work Research (SSWR) 31st Annual Conference, San Francisco, CA. <span className="pub-status">Accepted</span>
            </li>
          </ul>
        </div>

        <div className="pub-group">
          <h3>Manuscript in Preparation</h3>
          <ul>
            <li>
              Cubbin, C., &amp; <strong>Zhong, H.</strong> Income inequality in self-rated health status by gender and race/ethnicity among non-elderly adults: 25-year trends.
            </li>
          </ul>
        </div>

        <div className="pub-group">
          <h3>Guest Lectures &amp; Invited Talks</h3>
          <ul>
            <li>
              "AI for Social Work Research: AI as a Research Partner (not a shortcut)." Guest lecture, SW388R Quantitative Data Analysis II, Steve Hicks School of Social Work, UT Austin. Jan 2026.
            </li>
            <li>
              "Research Atlas: Unlock Research Rigor with AI-Assisted Tools." Workshop, Generative AI Society, UT Austin. Jan 2026.
            </li>
            <li>
              "Trust and Safety Design for AI Systems." Seminar, Generative AI Society, UT Austin. Mar 2025.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Publications;
