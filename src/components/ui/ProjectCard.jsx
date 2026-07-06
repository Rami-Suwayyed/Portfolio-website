import "./project-card.css";
import { platformsOf, isLive, stackLabels } from "../../data/projects";

const ProjectCard = ({ project }) => {
  const platforms = platformsOf(project);
  const live = isLive(project);
  const primary = project.web || project.github || project.ios || project.android;

  return (
    <article className="pcard">
      <a
        className="pcard__media"
        href={primary}
        target="_blank"
        rel="noreferrer"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img src={project.image} alt="" loading="lazy" width="600" height="360" />
        <span className="pcard__view" aria-hidden="true">
          <span className="pcard__view-btn">
            <span className="icon-arrow-right2" />
          </span>
        </span>
        <span className={`pcard__badge ${live ? "is-live" : "is-repo"}`}>
          {live ? <span className="status">Live</span> : <span className="mono">Source</span>}
        </span>
        {project.featured && <span className="pcard__featured mono">Featured</span>}
      </a>

      <div className="pcard__body">
        <h3 className="pcard__title">{project.title}</h3>
        <p className="pcard__desc">{project.description}</p>

        <ul className="pcard__stack">
          {project.stack.map((s) => (
            <li className="tag" key={s}>
              {stackLabels[s] ?? s}
            </li>
          ))}
        </ul>

        <div className="pcard__foot">
          <ul className="pcard__platforms">
            {platforms.map((p) => (
              <li key={p.key}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="pcard__platform"
                  aria-label={`${project.title} — ${p.label}`}
                >
                  <span className={p.icon} aria-hidden="true" />
                  <span className="mono">{p.label}</span>
                </a>
              </li>
            ))}
          </ul>
          {project.web && (
            <a
              href={project.web}
              target="_blank"
              rel="noreferrer"
              className="pcard__open mono"
            >
              Open <span className="icon-arrow-right2" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
