import "./footer.css";
import { navLinks, profile, socials } from "../../data/profile";

const Footer = () => (
  <footer className="footer">
    <div className="container footer__inner">
      <div className="footer__brand">
        <a href="#top" className="footer__name">
          {profile.name}
        </a>
        <p className="footer__tag mono">
          {profile.role} — building web + mobile, end to end.
        </p>
      </div>

      <nav className="footer__nav" aria-label="Footer">
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} className="mono footer__link">
            {l.label}
          </a>
        ))}
      </nav>

      <ul className="footer__socials">
        {socials.map((s) => (
          <li key={s.label}>
            <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
              <span className={s.icon} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>

    <div className="container footer__meta mono">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <span>Built with React + Vite</span>
    </div>
  </footer>
);

export default Footer;
