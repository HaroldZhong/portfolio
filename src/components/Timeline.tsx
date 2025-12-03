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
        <h1>Research & Work Experience</h1>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid white' }}
            date="May 2025 - Present"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Research Associate (Health Data & AI Systems)</h3>
            <h4 className="vertical-timeline-element-subtitle">UT Austin, Steve Hicks School of Social Work</h4>
            <p>
              I build and maintain the survey harmonization and analytics infrastructure behind our NHIS/NHANES health-inequality studies. My work includes multi-year SAS pipelines, PIR standardization, domain-level processing, and QA-verified outputs that feed into manuscripts, SII/RII modeling, and long-term health-trend analysis.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Aug 2024 - Present"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Co-Founder, GenAI Society</h3>
            <h4 className="vertical-timeline-element-subtitle">UT Austin</h4>
            <p>
              Created a cross-school community focused on practical generative AI. I lead technical workshops, develop prompt–engineering curricula, and organize guest sessions on production workflows, ethics, and applied research. The group now collaborates with students across the iSchool, McCombs, Natural Sciences, and Fine Arts on AI tooling, creative projects, and data-centric applications.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Jun 2024 - May 2025"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Graduate Data Analyst (Quant Methods & Automation)</h3>
            <h4 className="vertical-timeline-element-subtitle">UT Austin</h4>
            <p>
              Developed SPSS/Qualtrics cleaning pipelines with versioned QA logs, cutting faculty reporting work by 40%. Redesigned a 12-week online Statistical Methods course, using reproducible examples and structured guidance that raised A- or better outcomes from 40% to 75%. Provided teaching and analytic support across multiple applied stats projects.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Jun 2022 - May 2023"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Marketing Analytics Consultant (Predictive Modeling)</h3>
            <h4 className="vertical-timeline-element-subtitle">Long Island, NY</h4>
            <p>
              Led revenue and retention modeling for wealth-management clients. Built CLV prediction pipelines, RFM-based segmentation, and targeting workflows that improved high-net-worth conversion by 20% while reducing acquisition spend by $800K.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Nov 2021 - May 2023"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Data Operations Lead</h3>
            <h4 className="vertical-timeline-element-subtitle">Stony Brook University</h4>
            <p>
              Revived a 30-year CRM with 40,000+ outdated records by redesigning the data architecture, implementing a 15-dimension tagging schema, removing legacy duplicates, and restoring analytical reliability. Increased survey response from 8% to 50% and enabled accurate year-over-year forecasting for fundraising and student engagement.
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;
