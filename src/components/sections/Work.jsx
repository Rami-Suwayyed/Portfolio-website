import { useMemo, useState } from "react";
import "./work.css";
import SectionHeader from "../ui/SectionHeader";
import ProjectCarousel from "../ui/ProjectCarousel";
import { orderedProjects, workFilters, matchesFilter } from "../../data/projects";

const Work = () => {
  const [active, setActive] = useState("all");

  const filtered = useMemo(
    () => orderedProjects.filter((p) => matchesFilter(p, active)),
    [active]
  );

  return (
    <section className="section" id="work">
      <div className="container">
        <SectionHeader
          eyebrow="selected work"
          title="Things I've built and shipped"
          lead="Production software across web and mobile. Scroll the deck sideways to browse — filter by stack, or jump straight to the live sites and app listings."
        />

        <div className="work__controls" role="tablist" aria-label="Filter projects">
          {workFilters.map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={active === f.key}
              className={`work__filter mono ${active === f.key ? "is-active" : ""}`}
              onClick={() => setActive(f.key)}
            >
              {f.label}
              <span className="work__count">
                {orderedProjects.filter((p) => matchesFilter(p, f.key)).length}
              </span>
            </button>
          ))}
        </div>

        <ProjectCarousel items={filtered} resetKey={active} />
      </div>
    </section>
  );
};

export default Work;
