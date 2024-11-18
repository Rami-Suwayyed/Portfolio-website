import Hero from "./components/2-hero/Hero";
import Header from "./components/1-header/Header";
import Main from "./components/3-main/Main";
import Contact from "./components/4-contact/Contact";
import Footer from "./components/5-footer/Footer";
import {useEffect, useState} from "react";
import Resume from "./components/4-contact/Resume.jsx";

function App() {
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                setshowScrollBTN(true);
            } else {
                setshowScrollBTN(false);
            }
        });
    }, []);

    const [showScrollBTN, setshowScrollBTN] = useState(false);
    return (<div id="up" className="container">
            <Header/>
            <div id="about"/>
            <Hero/>
            <div id="projects" className="divider"/>
            <Main/>
            <div id="resume" className="divider"/>
            <Resume/>
            <div id="contact" className="divider"/>
            <Contact/>
            <div className="divider"/>
            <Footer/>

            <a style={{opacity: showScrollBTN ? 1 : 0, transition: "1s"}} href="#up">
                <button className="icon-keyboard_arrow_up scroll2Top"></button>
            </a>
        </div>);
}

export default App;
