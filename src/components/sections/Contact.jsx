import "./contact.css";
import { useForm, ValidationError } from "@formspree/react";
import SectionHeader from "../ui/SectionHeader";
import { profile, socials } from "../../data/profile";

const Contact = () => {
  const [state, handleSubmit] = useForm(profile.formspreeId);

  return (
    <section className="section" id="contact">
      <div className="container contact__grid">
        <div className="contact__intro">
          <SectionHeader
            eyebrow="contact"
            title="Let's build something"
            lead="Have a product to ship or a role to fill? Send a note and I'll get back to you."
          />

          <div className="contact__methods">
            <a className="contact__method mono" href={`mailto:${profile.email}`}>
              <span className="contact__method-key">email</span>
              {profile.email}
            </a>
            <a
              className="contact__method mono"
              href={`tel:${profile.phone.replace(/\s+/g, "")}`}
            >
              <span className="contact__method-key">tel</span>
              {profile.phone}
            </a>
          </div>

          <ul className="contact__socials">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="contact__social"
                >
                  <span className={s.icon} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="contact__panel">
          {state.succeeded ? (
            <div className="contact__done">
              <span className="status">Sent</span>
              <p>Thanks — your message is on its way. I&apos;ll reply soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact__form" noValidate>
              <div className="field">
                <label htmlFor="email" className="mono field__label">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  autoComplete="off"
                  placeholder="you@company.com"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>

              <div className="field">
                <label htmlFor="message" className="mono field__label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="What are you building?"
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>

              <button type="submit" className="btn btn--primary" disabled={state.submitting}>
                {state.submitting ? "Sending…" : "Send message"}
                <span className="icon-arrow-right2" aria-hidden="true" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
