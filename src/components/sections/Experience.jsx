import "./experience.css";
import SectionHeader from "../ui/SectionHeader";
import { experience } from "../../data/experience";
import { education } from "../../data/education";

const Experience = () => (
  <section className="section" id="experience">
    <div className="container">
      <SectionHeader
        eyebrow="experience"
        title="A track record of shipping"
        lead="Where I've spent my time and what I built there."
      />

      <ol className="timeline">
        {experience.map((job, i) => (
          <li className="timeline__item" key={`${job.org}-${i}`}>
            <div className="timeline__rail" aria-hidden="true">
              <span className="timeline__node" />
            </div>
            <div className="timeline__body">
              <span className="mono timeline__period">{job.period}</span>
              <h3 className="timeline__role">
                {job.role} <span className="timeline__org">· {job.org}</span>
              </h3>
              <p className="timeline__summary">{job.summary}</p>
              <ul className="timeline__stack">
                {job.stack.map((s) => (
                  <li className="tag" key={s}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <div className="edu">
        <span className="eyebrow">education</span>
        <div className="edu__row">
          <h3 className="edu__degree">{education.degree}</h3>
          <span className="mono edu__period">{education.period}</span>
        </div>
        <p className="edu__school">{education.school}</p>
      </div>
    </div>
  </section>
);

export default Experience;
