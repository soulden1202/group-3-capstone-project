import React from "react";
import "./About.css";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.title = "About - Livin it";
  }, []);

  const titleStyles = {
    fontSize: "44px",
    marginTop: "15px",
    paddingTop: "200px",
  };

  const teamStyles = {
    fontSize: "30px",
  };

  return (
    <div className="about-container">
      <div className="team-box" style={{ marginTop: "95px" }}>
        <h1 style={titleStyles}> About Us </h1>

        <h2 style={{ marginTop: "60px" }}>Our team of experienced professionals is dedicated to helping students to find their dream place to stay.</h2>
        <h2>Whether you're buying, selling, or renting, we're here to guide you every step of the way.</h2>
        <h2>Let's work together to make your real estate journey a success. </h2>

        <div className="team-container">
          <h2 style={teamStyles}>Meet Our Team</h2>
          <ul>
            <li>Krina Patel, Yash Patel, Shreyas Joshi, Huy Ngo</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;

