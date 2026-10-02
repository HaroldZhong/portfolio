import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHead from "./SectionHead";

const roles = [
  { dates: 'Jun 2025 – Jul 2026', title: 'Social Science Research Associate IV', org: 'Steve Hicks School of Social Work, UT Austin', text: 'Built survey-harmonization and analytics workflows for NHIS health-inequality research, with reproducible SAS pipelines, cross-tab verification, drift checks, and missingness diagnostics.', link: { to: '/project/nhis-nhanes-health-inequality', label: 'NHIS case study' } },
  { dates: 'Aug 2024 – May 2026', title: 'Co-Founder, Generative AI Society', org: 'UT Austin', text: 'Co-founded a cross-school community at UT Austin and organized workshops, speaker events, and practical AI learning material.' },
  { dates: 'Jun 2024 – May 2025', title: 'Graduate Assistant & Teaching Assistant', org: 'Steve Hicks School of Social Work, UT Austin', text: 'Taught SPSS and R labs for a two-semester doctoral quantitative-methods sequence (Quantitative Data Analysis I and II), covering ANOVA, regression with mediation and moderation, missing data and multiple imputation, factor analysis, and structural equation modeling. Designed a 12-week online statistics preparatory course for incoming PhD students and provided program-level analytic support.' },
  { dates: 'Jun 2022 – May 2023', title: 'Marketing Analytics Consultant', org: 'Broadridge Financial Solutions', text: 'Built customer-lifetime-value models and segmentation frameworks for wealth-management campaigns using cohort analysis and QC-validated data pipelines, lifting high-net-worth client conversion by 20%. Developed Tableau dashboards that cut marketing decision cycle time from 7 days to 4.' },
  { dates: 'Nov 2021 – May 2023', title: 'Data & Program Analyst', org: 'School of Professional Development, Stony Brook University', text: 'Led a SQL and CRM migration that deduplicated 12,000+ records and implemented a 15-dimension customer taxonomy for downstream reporting. Redesigned outreach segmentation analytics for continuing-education programs, raising survey response rates from 8% to 48% over successive campaigns.' },
];

export default function Timeline() {
  return <section id="history" className="section shell" aria-labelledby="history-title">
    <SectionHead index="02" label="Experience" titleId="history-title" title="Research & Professional Experience" />
    <ol className="record-list">
      {roles.map(role => (
        <li key={role.title} className="experience-row record reveal">
          <p className="record-date mono">{role.dates}</p>
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
