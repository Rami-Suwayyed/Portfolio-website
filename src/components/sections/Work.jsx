import { useMemo, useState } from "react";
import "./work.css";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import ProjectCard from "../ui/ProjectCard";
import { projects, workFilters, matchesFilter } from "../../data/projects";

const Work = () => {
  const [active, setActive] = useState("all");

  const filtered = useMemo(
    () => projects.filter((p) => matchesFilter(p, active)),
    [active]
  );

  return (
    <section className="section" id="work">
      <div className="container">
        <SectionHeader
          eyebrow="selected work"
          title="Things I've built and shipped"
          lead="A slice of production software across web and mobile. Filter by stack, or jump straight to the live sites and app listings."
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
                {projects.filter((p) => matchesFilter(p, f.key)).length}
              </span>
            </button>
          ))}
        </div>

        <motion.div layout className="work__grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Work;
