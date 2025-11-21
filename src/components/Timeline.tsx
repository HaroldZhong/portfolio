import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
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
            <h3 className="vertical-timeline-element-title">Social Science/Humanities Research Associate IV</h3>
            <h4 className="vertical-timeline-element-subtitle">UT Austin, Steve Hicks School of Social Work</h4>
            <p>
              I support NHIS/NHANES health inequality research by building reproducible SAS workflows, harmonizing multi-year data, and turning complex survey results into findings our team can publish and act on.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Jun 2024 - May 2025"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Social Science Researcher</h3>
            <h4 className="vertical-timeline-element-subtitle">UT Austin</h4>
            <p>
              Built SPSS cleaning and harmonization workflows with versioned QA logs, cutting reporting time by 40%. Also designed a 12-week online Statistical Methods course that raised A-minus-or-better performance from 40% to 75%.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Jun 2022 - May 2023"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Marketing Analytics Consultant</h3>
            <h4 className="vertical-timeline-element-subtitle">Broadridge, Long Island NY</h4>
            <p>
              Wealth clients needed better targeting and revenue forecasting. I built CLV models and RFM segmentation frameworks that raised high-net-worth conversion by 20% and cut $800K in acquisition costs.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Nov 2021 - May 2023"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Program Coordinator</h3>
            <h4 className="vertical-timeline-element-subtitle">Stony Brook University</h4>
            <p>
              The client database was a mess — 12,000 duplicates and no consistent tagging. I rebuilt the SQL/CRM stack and added a 15-dimension taxonomy, which raised survey response from 8% to 50% and made revenue forecasting actually reliable.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Aug 2024"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">GenAI Society</h3>
            <h4 className="vertical-timeline-element-subtitle">UT Austin</h4>
            <p>
              Co-founded the student group focused on Generative AI tools, workshops, and cross-school collaboration around ethics and practice.
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;
