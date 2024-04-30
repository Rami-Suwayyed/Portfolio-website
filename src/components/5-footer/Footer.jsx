import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <footer className="flex">
      <ul className="flex">
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#projects">Projects</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>

      <p>  &copy; <a href="https://www.avocado-soft.com/">Avocado Soft</a>, All Right Reserved.</p>
    </footer>
  );
};

export default Footer;
