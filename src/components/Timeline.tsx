import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss'

function Timeline() {
  return (
    <div id="history">
      <div className="items-container">
        <h1>Research & Professional Experience</h1>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid white' }}
            date="Jun 2025 - Present"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Social Science Research Associate IV</h3>
            <h4 className="vertical-timeline-element-subtitle">Steve Hicks School of Social Work, UT Austin</h4>
            <p>
              I build and maintain the survey-harmonization and analytics infrastructure behind our NHIS health-inequality studies. This includes reproducible SAS pipelines across 27 NHIS waves (1997 to 2024), SII/RII and ridit-based inequality metrics, propensity-score and stratified causal analyses, and QA protocols (cross-tab verification, drift checks, missingness diagnostics) that produce reviewable, manuscript-ready outputs.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Aug 2024 - Present"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Co-Founder, Generative AI Society</h3>
            <h4 className="vertical-timeline-element-subtitle">UT Austin</h4>
            <p>
              Co-founded a cross-school community focused on practical, responsible generative AI. I organize cross-disciplinary workshops and speaker events, develop prompt-engineering material, and connect students across the iSchool, McCombs, Natural Sciences, and Fine Arts around AI tooling and applied research.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Aug 2024 - May 2025"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Graduate Assistant & Teaching Assistant</h3>
            <h4 className="vertical-timeline-element-subtitle">Steve Hicks School of Social Work, UT Austin</h4>
            <p>
              Taught SPSS and R labs for a two-semester doctoral quantitative-methods sequence (Quantitative Data Analysis I and II), covering ANOVA, regression with mediation and moderation, missing data and multiple imputation, factor analysis, and structural equation modeling. Designed a 12-week online statistics preparatory course for incoming PhD students and provided program-level analytic support.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Jun 2022 - May 2023"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Marketing Analytics Consultant</h3>
            <h4 className="vertical-timeline-element-subtitle">Broadridge Financial Solutions</h4>
            <p>
              Built customer-lifetime-value models and segmentation frameworks for wealth-management campaigns using cohort analysis and QC-validated data pipelines, lifting high-net-worth client conversion by 20%. Developed Tableau dashboards that cut marketing decision cycle time from 7 days to 4.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Nov 2021 - May 2023"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Data & Program Analyst</h3>
            <h4 className="vertical-timeline-element-subtitle">School of Professional Development, Stony Brook University</h4>
            <p>
              Led a SQL and CRM migration that deduplicated 12,000+ records and implemented a 15-dimension customer taxonomy for downstream reporting. Redesigned outreach segmentation analytics for continuing-education programs, raising survey response rates from 8% to 48% over successive campaigns.
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;
