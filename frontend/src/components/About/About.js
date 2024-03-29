import React from "react";
import "./About.css";
import Logo from '../../assets/images/logo.png';

function About() {
  return (
    <div className="about_container">
      <div className="about_description">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
      <div className="about_logo">
        <img src={Logo} style={{width:"200px"}} alt="Logo" />
      </div>
    </div>
  );
}

export default About;
