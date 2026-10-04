import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHead from "./SectionHead";

const roles = [
  { sector: 'Industry', dates: 'Apr 2026 – Present', title: 'LLM Application Engineer', org: 'Praxis AI', text: 'Own the content-safety system from requirements to launch. Raised content-moderation accuracy from 49.6% to 80.8% on a 10,000-case internal benchmark through fine-tuning on human-verified golden data, a redesigned model context, a rebuilt data and evaluation framework, and tuned thresholds. Built a Neo4j policy graph, kept separate from model scores and versioned by effective date, so decisions have a traceable policy basis.', link: { to: '/project/praxis-ai-content-safety', label: 'Content-safety case study' } },
  { sector: 'Research', dates: 'Jun 2025 – Jul 2026', title: 'Social Science/Humanities Research Associate IV', org: 'Steve Hicks School of Social Work, UT Austin', text: 'Harmonized variables across 16 NHIS survey years (647K+ records) for an inequality-trends study, with cross-year mappings documented in a codebook. Built automated drift, cross-tabulation and missing-data checks that caught 3 documented failures before analysis, and cut the manual analysis cycle from 14 days to 2 with reproducible SAS, R and SQL pipelines across 27 NHIS/NHANES survey waves (1997–2024).', link: { to: '/project/nhis-nhanes-health-inequality', label: 'NHIS case study' } },
  { sector: 'Community', dates: 'Aug 2024 – May 2026', title: 'Co-founder, Generative AI Society', org: 'UT Austin', text: 'Co-founded a cross-disciplinary generative AI community, leading the prompt-engineering curriculum for 10+ workshops with 200+ participants and incubating 3 AI projects.' },
  { sector: 'Teaching', dates: 'Aug 2024 – May 2025', title: 'Graduate Assistant and Teaching Assistant', org: 'Steve Hicks School of Social Work, UT Austin', text: 'Taught R and SPSS labs to 28 doctoral students in the two-semester Quantitative Data Analysis I and II sequence, covering ANOVA, regression with mediation and moderation, missing data and multiple imputation, factor analysis, and structural equation modeling. Developed a 12-module graduate statistics course focused on hands-on data analysis.' },
  { sector: 'Industry', dates: 'Jun 2022 – May 2023', title: 'Consulting Intern, Data Engineering and Customer Analytics', org: 'Broadridge Financial Solutions, New York', text: 'Contributed to a 20% increase in high-net-worth client conversion by building Python customer lifetime value models and automated RFM segmentation for a marketing-decision pipeline. Developed Power BI and Excel VBA analysis tools, executive decks and reports to support the COO and CFO\u2019s strategy on adapting proxy voting for Gen Z investors and shareholders. Helped marketing teams shorten decision cycles from 7 days to 4 through Tableau dashboards.' },
  { sector: 'Professional', dates: 'Nov 2021 – May 2023', title: 'Data Engineer and Program Coordinator', org: 'School of Professional Development, Stony Brook University', text: 'Raised usable customer records (identifiable, valid, complete, current and non-duplicate) from 30% to 95% by leading a SQL and CRM restructuring of 40,000+ legacy records. Established data standards for program and campaign reporting, with data definitions in a codebook and a 15-dimension customer taxonomy. Coordinated 3 programs for 200+ participants with 4 partners, including the Department of Labor.' },
];

export default function Timeline() {
  return <section id="history" className="section shell" aria-labelledby="history-title">
    <SectionHead index="03" titleId="history-title" title="Research & Professional Experience" />
    <ol className="record-list">
      {roles.map(role => (
        <li key={role.title} className="experience-row record reveal">
          <p className="record-date mono">{role.dates}<span className="record-tag">{role.sector}</span></p>
          <div className="record-title">
            <h3>{role.title}</h3>
            <p>{role.org}</p>
          </div>
          <div className="record-body">
            <p>{role.text}</p>
            {role.link && <Link to={role.link.to} className="text-link">{role.link.label} <ArrowUpRight size={15} /></Link>}
          </div>
        </li>
      ))}
    </ol>
  </section>;
}
