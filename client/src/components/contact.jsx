import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import companyLogo from "../images/mainlogo.png"; 

export const Contact = () => {
  return (
    <div
      id="contact"
      style={{
        backgroundColor: "#fff", 
        padding: "20px 30px",
        color: "#000000", 
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", fontSize: "20px" }}>
        <img
          src={companyLogo} 
          alt="Company Logo"
          style={{ width: "40px", height: "30px", marginRight: "10px" }} 
        />
        <span>CAREER DEV</span> 
      </div>

      <div style={{ display: "flex", gap: "15px" }}>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#333", fontSize: "16px" }} 
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="https://github.com/priya036/Personalized_Career_Development"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#333", fontSize: "16px" }} 
        >
          <FaGithub size={24} />
        </a>
      </div>
    </div>
  );
};
