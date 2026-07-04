import "./hero.css";
import { motion } from "framer-motion";
import { profile, socials } from "../../data/profile";
import { stats } from "../../data/projects";

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] },
  }),
};

const readout = [
  { value: stats.shipped, label: "Projects shipped" },
  { value: stats.live, label: "Live in production" },
  { value: stats.mobile, label: "App Store / Play" },
  { value: stats.repos, label: "Public repos" },
];

const Hero = () => (
  <section className="hero grid-bg" id="top">
    <div className="container hero__inner">
      <div className="hero__lead">
        <motion.div
          className="hero__avatar"
          variants={rise}
          initial="hidden"
          animate="show"
          custom={0}
        >
          <img src="./me.jpg" alt={profile.name} width="88" height="88" />
          <span className="hero__verified icon-verified" aria-hidden="true" />
        </motion.div>

        <motion.p
          className="eyebrow"
          variants={rise}
          initial="hidden"
          animate="show"
          custom={1}
        >
          {profile.role} · {profile.location}
        </motion.p>

        <motion.h1
          className="hero__title"
          variants={rise}
          initial="hidden"
          animate="show"
          custom={2}
        >
          {profile.headline}
        </motion.h1>

        <motion.p
          className="lead hero__intro"
          variants={rise}
          initial="hidden"
          animate="show"
          custom={3}
        >
          {profile.intro}
        </motion.p>

        <motion.div
          className="hero__actions"
          variants={rise}
          initial="hidden"
          animate="show"
          custom={4}
        >
          <a href="#work" className="btn btn--primary">
            View work <span className="icon-arrow-right2" aria-hidden="true" />
          </a>
          <a href="#contact" className="btn btn--ghost">
            Get in touch
          </a>
        </motion.div>

        <motion.ul
          className="hero__socials"
          variants={rise}
          initial="hidden"
          animate="show"
          custom={5}
        >
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="hero__social"
              >
                <span className={s.icon} aria-hidden="true" />
              </a>
            </li>
          ))}
        </motion.ul>
      </div>

      {/* Signature: shipped-systems instrument readout, live from data */}
      <motion.aside
        className="readout"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Shipping summary"
      >
        <div className="readout__head">
          <span className="mono readout__tag">shipped_systems</span>
          <span className="status">Online</span>
        </div>
        <div className="readout__grid">
          {readout.map((r) => (
            <div className="readout__cell" key={r.label}>
              <span className="readout__value">{r.value}</span>
              <span className="mono readout__label">{r.label}</span>
            </div>
          ))}
        </div>
        <div className="readout__foot mono">
          <span>web</span>
          <span className="readout__dot">·</span>
          <span>ios</span>
          <span className="readout__dot">·</span>
          <span>android</span>
          <span className="readout__dot">·</span>
          <span>api</span>
        </div>
      </motion.aside>
    </div>
  </section>
);

export default Hero;
