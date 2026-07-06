import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./project-carousel.css";
import ProjectCard from "./ProjectCard";

// Horizontal, snap-scrolling deck of project cards.
// Browse with the arrows, drag-to-pan (desktop), or native swipe (touch).
const ProjectCarousel = ({ items, resetKey }) => {
  const reduce = useReducedMotion();
  const viewportRef = useRef(null);
  const [scrollable, setScrollable] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [progress, setProgress] = useState(0);
  const [thumb, setThumb] = useState(1);

  // Pointer drag state kept in a ref so moves don't trigger re-renders.
  // Drag-to-pan state, kept in a ref so pointer moves don't re-render.
  const drag = useRef({
    down: false,
    dragging: false,
    startX: 0,
    startLeft: 0,
    suppressClick: false,
  });

  const measure = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const canScroll = max > 2;
    setScrollable(canScroll);
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= max - 1);
    setProgress(canScroll ? el.scrollLeft / max : 0);
    setThumb(el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1);
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  // Snap back to the first card whenever the filtered set changes.
  useEffect(() => {
    const el = viewportRef.current;
    if (el) {
      el.scrollLeft = 0;
      measure();
    }
  }, [resetKey, measure]);

  const page = (dir) => {
    const el = viewportRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const amount = Math.max(el.clientWidth * 0.85, 260);
    el.scrollBy({ left: dir * amount, behavior: reduce ? "auto" : "smooth" });
  };

  const onPointerDown = (e) => {
    if (e.pointerType === "touch" || e.button !== 0) return; // native touch scroll; left button only
    const el = viewportRef.current;
    drag.current = {
      down: true,
      dragging: false,
      startX: e.clientX,
      startLeft: el.scrollLeft,
      suppressClick: false,
    };
    // NB: no pointer capture here — capturing on a plain click would eat the
    // card link's navigation. We only capture once a real drag begins (below).
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.down) return;
    const dx = e.clientX - d.startX;
    if (!d.dragging && Math.abs(dx) > 6) {
      d.dragging = true;
      viewportRef.current.setPointerCapture?.(e.pointerId);
    }
    if (d.dragging) {
      e.preventDefault();
      viewportRef.current.scrollLeft = d.startLeft - dx;
    }
  };

  const endDrag = (e) => {
    const d = drag.current;
    if (!d.down) return;
    d.down = false;
    if (d.dragging) {
      d.suppressClick = true; // eat the click that fires at the end of a drag
      viewportRef.current?.releasePointerCapture?.(e.pointerId);
    }
    d.dragging = false;
  };

  // Only swallow the click when it concludes an actual drag; plain clicks pass through.
  const onClickCapture = (e) => {
    if (drag.current.suppressClick) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.suppressClick = false;
    }
  };

  return (
    <div className="work__carousel" role="region" aria-label="Projects carousel">
      <button
        type="button"
        className="work__nav work__nav--prev"
        onClick={() => page(-1)}
        disabled={atStart}
        aria-label="Previous projects"
      >
        <span className="icon-arrow-right2" aria-hidden="true" />
      </button>

      <div
        className="work__viewport"
        ref={viewportRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        <ul className="work__track">
          {items.map((p, i) => (
            <motion.li
              className="work__slide"
              key={`${resetKey}-${p.id}`}
              initial={reduce ? false : { opacity: 0, y: 26 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
                delay: (i % 4) * 0.08,
              }}
            >
              <ProjectCard project={p} />
            </motion.li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="work__nav work__nav--next"
        onClick={() => page(1)}
        disabled={atEnd}
        aria-label="More projects"
      >
        <span className="icon-arrow-right2" aria-hidden="true" />
      </button>

      <div className={`work__progress ${scrollable ? "" : "is-hidden"}`} aria-hidden="true">
        <span
          className="work__progress-thumb"
          style={{
            width: `${Math.max(thumb, 0.08) * 100}%`,
            left: `${progress * (1 - Math.max(thumb, 0.08)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProjectCarousel;
