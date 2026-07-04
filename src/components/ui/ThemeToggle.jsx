const ThemeToggle = ({ theme, onToggle }) => (
  <button
    className="theme-toggle"
    onClick={onToggle}
    aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
  >
    <span className={theme === "dark" ? "icon-moon-o" : "icon-sun"} aria-hidden="true" />
  </button>
);

export default ThemeToggle;
