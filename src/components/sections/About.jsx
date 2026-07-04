import "./about.css";
import SectionHeader from "../ui/SectionHeader";
import { skillGroups } from "../../data/skills";

const About = () => (
  <section className="section" id="about">
    <div className="container">
      <SectionHeader
        eyebrow="about"
        title="Full-stack, end to end"
        lead="I focus on shipping maintainable products across the whole stack — not just writing code, but taking it all the way to something people can use."
      />

      <div className="about__grid">
        <div className="about__prose">
          <p>
            I&apos;m a PHP full-stack engineer with <strong>5+ years</strong>{" "}
            building scalable, high-performance web applications. On the backend I
            live in <strong>Laravel and PHP</strong> — designing schemas, REST APIs
            and business logic, and tuning queries and caching for speed. On the
            frontend I work in <strong>React and Vue</strong>, building interfaces
            that stay fast and easy to reason about.
          </p>
          <p>
            I&apos;ve delivered production-ready e-commerce, community and education
            products — several shipped as native apps to the{" "}
            <strong>App Store and Google Play</strong>, and deployed on AWS with
            Docker and CI/CD. I follow SOLID principles and design patterns, because
            a project isn&apos;t done until it&apos;s live, maintainable, and holding
            up under real traffic.
          </p>
        </div>

        <div className="about__skills">
          {skillGroups.map((group) => (
            <div className="skillgroup" key={group.label}>
              <div className="skillgroup__head">
                <h3 className="skillgroup__label mono">{group.label}</h3>
                <span className="skillgroup__note">{group.note}</span>
              </div>
              <ul className="skillgroup__items">
                {group.items.map((item) => (
                  <li className="tag" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;
