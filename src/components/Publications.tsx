import React from "react";
import { Link } from "react-router-dom";
import SectionHead from "./SectionHead";

function Publications() {
  return (
    <section className="section shell" id="publications" aria-labelledby="publications-title">
      <SectionHead index="06" titleId="publications-title" title="Publications & Scholarly Work"
        intro="Research contributions span AI applications, survey harmonization, and reproducible analysis." />

      <p className="scholarly-links mono">
        <span>Related case studies</span>
        <Link to="/project/brat-family-therapy-chatbot">BRAT platform contribution</Link>
        <Link to="/project/intersectionality-health-disparities">Intersectionality analysis</Link>
        <Link to="/project/nhis-nhanes-health-inequality">NHIS methods</Link>
      </p>

      <div className="pub-group reveal">
        <h3>Published Journal Article</h3>
        <ul>
          <li>
            Fuentes-Balderrama, J., <strong>Zhong, H.</strong>, Cárdenas, M. E., Ayala, S., Velasco, S. I., &amp; Cui, J. (2026). AI-Caramba: The experience of mothers in Central Texas with BRAT, a parenting AI chatbot. <em>Child &amp; Family Social Work</em>. <a className="pub-doi" href="https://doi.org/10.1111/cfs.70266" target="_blank" rel="noopener noreferrer">doi.org/10.1111/cfs.70266</a> <span className="pub-status">Published</span>
          </li>
        </ul>
      </div>

      <div className="pub-group reveal">
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

      <div className="pub-group reveal">
        <h3>Accepted Conference Contribution</h3>
        <ul>
          <li>
            Fuentes-Balderrama, J., <strong>Zhong, H.</strong>, Cárdenas, M. E., Ayala, S., &amp; Velasco, S. I. AI Caramba: The experience of Hispanic mothers with BRAT, a parenting intervention-enhancing AI-chatbot. Society for Social Work Research (SSWR) 31st Annual Conference, San Francisco, CA. <span className="pub-status">Accepted</span>
          </li>
        </ul>
      </div>

      <div className="pub-group reveal">
        <h3>Manuscript in Preparation</h3>
        <ul>
          <li>
            Cubbin, C., &amp; <strong>Zhong, H.</strong> Income inequality in self-rated health status by gender and race/ethnicity among non-elderly adults: 25-year trends. <span className="pub-status pub-status-quiet">In preparation</span>
          </li>
        </ul>
      </div>

      <div className="pub-group reveal">
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
    </section>
  );
}

export default Publications;
