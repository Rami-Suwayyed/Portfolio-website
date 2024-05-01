import Lottie from "lottie-react";
import "./hero.css";
import devAnimation from "../../animation/dev.json";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';


const Hero = () => {
  const lottieRef = useRef();

  return (
    <section className="hero flex">
      <div className="left-section  ">
        <div className="parent-avatar flex">
          <motion.img
            initial={{ transform: "scale(0)" }}
            animate={{ transform: "scale(1.1)" }}
            transition={{ damping: 6, type: "spring", stiffness: 100 }}
            src="./me.jpg"
            className="avatar"
            alt=""
          />
          <div className="icon-verified"></div>
        </div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="title"
        >
          Welcome to Rami Suwayyed Portfolio
        </motion.h1>

        <p className="sub-title">
          As a Full Stack Developer at thelearnbook.com, I resolved bugs and
          added features to enhance functionality. I improved user experience by
          implementing new features and addressing performance issues. My
          contributions as a problem solver and collaborator improved the
          website usability.
        </p>

        <div className="all-icons flex">
        <a className="icon icon-facebook-square" target={`_blank`} href={'https://www.facebook.com/Rmai.Suwayyed/'}/>
          <a className="icon icon-x" target={`_blank`} href={'https://twitter.com/Rami_Suwayyed/'}/>
          <a  className="icon icon-instagram" target={`_blank`} href={'https://www.instagram.com/rami_suwayyed/'} />
          <a className="icon icon-github" target={`_blank`} href={'https://github.com/Rami-Suwayyed/'} />
          <a className="icon icon-linkedin" target={`_blank`} href={'https://www.linkedin.com/in/rami-suwayyed/'} />
        </div>
      </div>

      <div className="right-section animation ">
        <Lottie
          lottieRef={lottieRef}
          className=""
          onLoadedImages={() => {
            // @ts-ignore
            // https://lottiereact.com/
            lottieRef.current.setSpeed(0.5);
          }}
          animationData={devAnimation}
        />
      </div>
    </section>
  );
};

export default Hero;
