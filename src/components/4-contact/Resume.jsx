import "./contact.css";

const Contact = () => {
  return (
      <section className="contact-us">
        <h1 className="title">
          <span className="icon-profile1"> </span>
         Resume
        </h1>
        <p className="sub-title">
            Here you can download my resume to know more about me.
        </p>
        <div className="iconsCV flex">
          <a className="iconCv icon-file-pdf" target={`_blank`} href={'https://drive.google.com/file/d/1lzFhOUcI5hJ8X98ZFO5OLY79dNDrRJta/view?usp=sharing'}> Download CV</a>
        </div>
      </section>

)
  ;
};

export default Contact;
