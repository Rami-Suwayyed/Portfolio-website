import { useEffect, useState } from "react";
import "./scroll-top.css";

const ScrollTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#top"
      className={`scroll-top ${show ? "is-visible" : ""}`}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
    >
      <span className="icon-keyboard_arrow_up" aria-hidden="true" />
    </a>
  );
};

export default ScrollTop;
