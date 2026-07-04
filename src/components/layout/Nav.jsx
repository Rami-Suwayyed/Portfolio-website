import { useEffect, useState } from "react";
import "./nav.css";
import { navLinks, profile } from "../../data/profile";
import ThemeToggle from "../ui/ThemeToggle";

const Nav = ({ theme, onToggle }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__inner container">
        <a href="#top" className="nav__brand" aria-label={`${profile.name}, home`}>
          <span className="nav__mark mono">RS</span>
          <span className="nav__name">{profile.name}</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="nav__link mono">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a
            className="btn btn--ghost nav__cv"
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span className="icon-file-pdf" aria-hidden="true" /> Resume
          </a>
          <ThemeToggle theme={theme} onToggle={onToggle} />
          <button
            className="nav__burger"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className={open ? "icon-close" : "icon-menu"} aria-hidden="true" />
          </button>
        </div>
      </div>

      {open && (
        <div className="nav__sheet" onClick={() => setOpen(false)}>
          <nav className="nav__sheet-links" aria-label="Mobile">
            {navLinks.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                className="nav__sheet-link"
                onClick={() => setOpen(false)}
              >
                <span className="mono nav__sheet-idx">0{i + 1}</span>
                {l.label}
              </a>
            ))}
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="nav__sheet-link"
              onClick={() => setOpen(false)}
            >
              <span className="mono nav__sheet-idx">↳</span> Resume
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Nav;
