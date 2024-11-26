import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import roadmapImage from '../images/roadmap.jpg';
import skillsImage from '../images/skills.jpg';
import projectsImage from '../images/project.avif';
import resumeImage from '../images/resume.avif';
import selectJobRoleImage from '../images/select-job-image.jpg';
import { Navigationinner } from '../components/navigationinner';
import ChatbotButton from '../components/ChatbotButton';


import frontendImage from '../images/roadmaps/frontend_page-0001.jpg';
import backendImage from '../images/roadmaps/backend_page-0001.jpg';
import devopsImage from '../images/roadmaps/devops_page-0001.jpg';
import fullstackImage from '../images/roadmaps/full-stack_page-0001.jpg';
import aiEngineeringImage from '../images/roadmaps/ai-engineer_page-0001.jpg';
import aiDatascientistImage from '../images/roadmaps/ai-data-scientist_page-0001.jpg';
import androidImage from '../images/roadmaps/android_page-0001.jpg';
import cybersecurityImage from '../images/roadmaps/cyber-security_page-0001.jpg';
import dataanalystImage from '../images/roadmaps/data-analyst_page-0001.jpg';
import gamedevImage from '../images/roadmaps/game-developer_page-0001.jpg';
import iosImage from '../images/roadmaps/ios_page-0001.jpg';
import uxdesignImage from '../images/roadmaps/ux-design_page-0001.jpg';

const features = [
  {
    title: 'ROADMAP',
    description: 'Navigate your career with a customized roadmap, detailing milestones and actionable strategies for success.',
    imageUrl: roadmapImage,
  },
  {
    title: 'SKILLS REQUIRED',
    description: 'Get personalized insights on essential skills to improve your qualifications and job prospects.',
    imageUrl: skillsImage,
  },
  {
    title: 'PROJECT IDEAS',
    description: 'Find project ideas that resonate with your career ambitions and help you develop expertise in your chosen field.',
    imageUrl: projectsImage,
  },
  {
    title: 'RESUME BUILD',
    description: 'Design professional resumes that reflect your unique qualifications and help you stand out in the current job market.',
    imageUrl: resumeImage,
  },
];

const roadmapItems = [
  { name: 'FRONTEND', imageUrl: frontendImage },
  { name: 'BACKEND', imageUrl: backendImage },
  { name: 'DEVOPS', imageUrl: devopsImage },
  { name: 'FULL STACK', imageUrl: fullstackImage },
  { name: 'AI ENGINEERING', imageUrl: aiEngineeringImage },
  { name: 'AI DATA SCIENTIST', imageUrl: aiDatascientistImage },
  { name: 'ANDROID', imageUrl: androidImage },
  { name: 'CYBER SECURITY', imageUrl: cybersecurityImage },
  { name: 'DATA ANALYST', imageUrl: dataanalystImage },
  { name: 'GAME DEVELOPER', imageUrl: gamedevImage },
  { name: 'IOS', imageUrl: iosImage },
  { name: 'UX DESIGN', imageUrl: uxdesignImage },
];

const Roadmap = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleSelectItem = (itemName) => {
    const selectedRoadmap = roadmapItems.find((item) => item.name === itemName);
    setSelectedItem(itemName);
    setSelectedImage(selectedRoadmap?.imageUrl || null);
  };


  const styles = {
    container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f7fafc',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: '4rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxHeight: '100vh', 
    overflowY: 'auto', 
  },
    heading: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#2d3748',
      textAlign: 'center',
      marginBottom: '1rem',
    },
    selectedTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center',
      marginBottom: '2rem',
    },
    featuresContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '7.5rem',
      maxWidth: '80rem',
      width: '100%',
      margin: '0 auto',
    },
    featureCard: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      transition: 'transform 0.3s',
      cursor: 'pointer',
      maxHeight: '400px',
    },
    featureImage: {
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      maxHeight: '180px',
    },
    featureContent: {
      padding: '1.5rem',
    },
    featureTitle: {
      marginTop: '1.2rem',
      fontSize: '1.7rem',
      fontWeight: 'bold',
      color: '#2d3748',
      marginBottom: '0.5rem',
    },
    featureDescription: {
      fontSize: '1.2rem',
      color: '#4a5568',
      marginBottom: '1rem',
    },
    featureButton: {
      backgroundColor: '#3182ce',
      color: 'white',
      border: 'none',
      padding: '8px 10px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1rem',
      margin: '0 auto',
      transition: 'background-color 0.3s',
    },
    sidebar: {
      width: "250px",
      backgroundColor: "#F8F9FA", 
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      boxShadow: "0 6px 20px rgba(0,0,0,0.1)", 
      borderTopLeftRadius: "20px", 
      borderBottomLeftRadius: "20px", 
      position: "relative", 
      height: "100vh", 
    },
    title: {
      fontSize: '1.9rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      textAlign: 'center',
      color: 'black'
    },
    toggleButton: {
      backgroundColor: 'green',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      cursor: 'pointer',
      borderRadius: '5px',
      fontSize: '1rem',
      marginBottom: '1rem',
      alignSelf: 'flex-start',
    },
    roadmapButton: {
      backgroundColor: "#3A6D8C",
      color: "white",
      border: "none",
      borderRadius: "5px",
      padding: "10px",
      marginBottom: "0.5rem",
      cursor: "pointer",
      width: "100%",
      textAlign: "left",
      fontSize: "1rem",
      transition: "background-color 0.3s",
      display: "flex",
      justifyContent: "space-between",
    },
    roadmapButtonSelected: {
      backgroundColor: '#789DBC',
      fontSize: '1rem',
    },
    noSelectionContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '70px',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      textAlign: 'center',
      backgroundColor: '#fff',
      padding: '2rem',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      maxWidth: '500px',
      maxHeight: '600px',
    },
    noSelectionImage: {
      width: '500px',
      height: '400px',
      marginBottom: '1rem',
    },
    noSelectionText: {
      fontSize: '2.5rem',
      color: '#4a5568',
    },
    roadmapImage: {
        width: '100%',
        height: 'auto',
        objectFit: 'cover', 
        borderRadius: '8px',
        marginBottom: '2rem',
      },
  };

  return (
    <>
    <Navigationinner title={"ROADMAP"}/>
    <div style={styles.container}>
      <div style={styles.content}>
        {selectedItem ? (
          <>
            {selectedImage && <img src={selectedImage} alt={selectedItem} style={styles.roadmapImage} />}
          </>
        ) : (
          <div style={styles.noSelectionContainer}>
            <img src={selectJobRoleImage} alt="Select Job Role" style={styles.noSelectionImage} />
            <p style={styles.noSelectionText}>Please select any of the job roles to view details.</p>
          </div>
        )}
      </div>
      <div style={styles.sidebar}>
        <div style={styles.title}>Select Job Role</div>
        <button style={styles.toggleButton} onClick={toggleExpand}>
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
        {(isExpanded ? roadmapItems : roadmapItems.slice(0, 5)).map((item, index) => (
          <button
            key={index}
            style={{
              ...styles.roadmapButton,
              ...(selectedItem === item.name ? styles.roadmapButtonSelected : {}),
            }}
            onClick={() => handleSelectItem(item.name)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <ChatbotButton/>
    </div>
    </>
  );
};

export default Roadmap;
