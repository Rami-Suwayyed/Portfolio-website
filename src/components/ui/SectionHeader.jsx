import "./section-header.css";

// Consistent section intro: code-comment eyebrow + title + lead.
const SectionHeader = ({ eyebrow, title, lead, id }) => (
  <header className="section-header" id={id}>
    <span className="eyebrow">{eyebrow}</span>
    <h2 className="section-header__title">{title}</h2>
    {lead && <p className="lead section-header__lead">{lead}</p>}
  </header>
);

export default SectionHeader;
