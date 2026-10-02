import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Timeline.scss";

export default function Timeline() {
  return <section id="history" className="items-container">
    <h2>Research & Professional Experience</h2>
    <div className="experience-list">
      <article className="experience-row"><p className="experience-date">Jun 2025 – Jul 2026</p><div><h3>Social Science Research Associate IV</h3><h4>Steve Hicks School of Social Work, UT Austin</h4><p>Built survey-harmonization and analytics workflows for NHIS health-inequality research, with reproducible SAS pipelines, cross-tab verification, drift checks, and missingness diagnostics.</p><Link to="/project/nhis-nhanes-health-inequality">NHIS case study →</Link></div></article>
      <article className="experience-row"><p className="experience-date">Aug 2024 – May 2026</p><div><h3>Co-Founder, Generative AI Society</h3><h4>UT Austin</h4><p>Co-founded a cross-school community at UT Austin and organized workshops, speaker events, and practical AI learning material.</p></div></article>
      <article className="experience-row"><p className="experience-date">Jun 2024 – May 2025</p><div><h3>Graduate Assistant & Teaching Assistant</h3><h4>Steve Hicks School of Social Work, UT Austin</h4><p>Taught SPSS and R labs for a two-semester doctoral quantitative-methods sequence (Quantitative Data Analysis I and II), covering ANOVA, regression with mediation and moderation, missing data and multiple imputation, factor analysis, and structural equation modeling. Designed a 12-week online statistics preparatory course for incoming PhD students and provided program-level analytic support.</p></div></article>
      <article className="experience-row"><p className="experience-date">Jun 2022 – May 2023</p><div><h3>Marketing Analytics Consultant</h3><h4>Broadridge Financial Solutions</h4><p>Built customer-lifetime-value models and segmentation frameworks for wealth-management campaigns using cohort analysis and QC-validated data pipelines, lifting high-net-worth client conversion by 20%. Developed Tableau dashboards that cut marketing decision cycle time from 7 days to 4.</p></div></article>
      <article className="experience-row"><p className="experience-date">Nov 2021 – May 2023</p><div><h3>Data & Program Analyst</h3><h4>School of Professional Development, Stony Brook University</h4><p>Led a SQL and CRM migration that deduplicated 12,000+ records and implemented a 15-dimension customer taxonomy for downstream reporting. Redesigned outreach segmentation analytics for continuing-education programs, raising survey response rates from 8% to 48% over successive campaigns.</p></div></article>
    </div>
  </section>;
}
