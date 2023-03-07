import React from "react";
import "./About.css";

const About = () => {
    const titleStyles = {
        fontSize: "60px",
    };

    const teamStyles = {
        fontSize: "30px",

    };

    return (

        <div className="about-container">
            <div className="team-box">
            <h1 style={titleStyles}> About Us </h1>

            <h2 style={{marginTop: "50px"}}>Our Mission is to help students</h2>
            <h2>to find best homes</h2>
            <h2>or apartments in their badge. </h2>

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
