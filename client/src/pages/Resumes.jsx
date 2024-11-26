import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigationinner } from "../components/navigationinner";
import selectCareerImage from "../images/select-job-image.jpg";
import { MdDeleteOutline } from "react-icons/md"; 
import { marked } from 'marked';
import ChatbotButton from '../components/ChatbotButton';
const apiUrl = process.env.REACT_APP_API_ENDPOINT;


const ResumePage = () => {
  const [selectedCareerId, setSelectedCareerId] = useState(null);
  const [newCareer, setNewCareer] = useState("");
  const [count, setCount] = useState(1);
  const [skillsData, setSkillsData] = useState(null);
  const [roadmapCareers, setRoadmapCareers] = useState([]);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = () => {
    axios
      .get(`${apiUrl}/api/resumes/career/careerIds`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          const transformedCareers = response.data.map((career) => ({
            name: career,
          }));
          setRoadmapCareers(transformedCareers);
        } else {
          console.error("API response is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching career IDs:", error);
      });
  };

  const handleSelectCareer = (careerId) => {
    setSelectedCareerId(careerId);
    axios
      .get(`${apiUrl}/api/resumes/${careerId}`)
      .then((response) => {
        if (response.data && typeof response.data === "object") {
          setSkillsData(response.data);
          console.log("Fetched skills data:", response.data);
        } else {
          console.error("Skills data is not in the expected format:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching skills data:", error));
  };

  const handleAddNewCareer = () => {
    if (newCareer.trim() !== "") {
      const careerObject = {
        career: newCareer.trim(),
        count,
      };

      axios
        .post(`${apiUrl}/api/resumes/process`, careerObject)
        .then((response) => {
          console.log("Career added successfully:", response.data);
          setNewCareer("");
          fetchCareers(); 
        })
        .catch((error) => {
          console.error("Error adding new career:", error);
        });
    }
  };

  const handleDeleteCareer = (careerId) => {
    axios
      .delete(`${apiUrl}/api/resumes/delete/${careerId}`)
      .then((response) => {
        console.log("Career deleted successfully:", response.data);
        fetchCareers(); // Refetch careers after deletion
      })
      .catch((error) => {
        console.error("Error deleting career:", error);
      });
  };

  const styles = {
    container: { display: "flex", minHeight: "100vh", backgroundColor: "#f7fafc" },
    content: {
      flex: 1,
      padding: "4rem 1rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      maxHeight: "100vh",
      overflowY: "auto",
    },
    heading: { fontSize: "2rem", fontWeight: "bold", color: "#2d3748", textAlign: "center", marginBottom: "1rem" },
    sidebar: {
      width: "250px",
      backgroundColor: "F8F9FA",
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
    title: { fontSize: "1.9rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center" },
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
    roadmapButtonSelected: { backgroundColor: "#789DBC", fontSize: "1rem" },
    skillsContainer: { marginTop: "2rem", padding: "1rem", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", width: "90%" },
    skillsHeading: {
      fontSize: "3.5rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      textAlign: "center", 
    },
        skillItem: { padding: "10px 4px", fontSize: "1.5rem", color: "#2d3748", backgroundColor: "white", marginBottom: "10px", borderRadius: "5px" },
    noSelectionContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "75px",
      justifyContent: "center",
      height: "500px",
      textAlign: "center",
      padding: "2rem",
      borderRadius: "10px",
      backgroundColor: "#fff",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
    noSelectionText: { fontSize: "2.5rem", color: "#4a5568" },
    noSelectionImage: { width: "400px", height: "300px", objectFit: "cover", marginBottom: "20px" },
    skillsCountDropdown: { width: "100%", padding: "10px", borderRadius: "5px", border: "2px solid #ddd" },
    inputContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "50px", 
      width: "100%",
    },
    inputWrapper: { width: "100%" , height : "30px",marginBottom:"20px" },
    dropdownWrapper: { width: "30%" },
    addCareerButtonWrapper: { width: "100%", marginTop: "1rem" },
    addButton: { width: "100%", padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#47663B", color: "white", cursor: "pointer", fontSize: "1rem" },
  };

  return (
    <>
      <Navigationinner title="RESUME" />
      <div style={styles.container}>
        <div style={styles.content}>
          {selectedCareerId ? (
            skillsData ? (
              <div style={styles.skillsContainer}>
                <h3 style={styles.skillsHeading}>Resume Template For {selectedCareerId}</h3>
                {Object.keys(skillsData).map((key) => {
                  const skillValue = skillsData[key];
                  return (
                    <div key={key} style={styles.skillItem}>
                      {typeof skillValue === "string" ? (
                        <div dangerouslySetInnerHTML={{ __html: marked(skillValue) }} />
                      ) : (
                        <div>{skillValue}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>Loading Resume data...</p>
            )
          ) : (
            <div style={styles.noSelectionContainer}>
              <img src={selectCareerImage} alt="Select a career" style={styles.noSelectionImage} />
              <p style={styles.noSelectionText}>Select a Role to view details</p>
            </div>
          )}
        </div>

        <div style={styles.sidebar}>
          <h3 style={styles.title}>ROLES</h3>
          {roadmapCareers.length > 0 ? (
            roadmapCareers.map((career, index) => (
              <button
                key={index}
                style={{
                  ...styles.roadmapButton,
                  ...(selectedCareerId === career.name ? styles.roadmapButtonSelected : {}),
                }}
                onClick={() => handleSelectCareer(career.name)}
              >
                {career.name}
                <MdDeleteOutline
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCareer(career.name);
                  }}
                  style={{ cursor: "pointer", color: "white" }}
                />
              </button>
            ))
          ) : (
            <p>No careers available.</p>
          )}

          <div style={styles.inputContainer}>
            <div style={styles.inputWrapper}>
              <input
                type="text"
                value={newCareer}
                onChange={(e) => setNewCareer(e.target.value)}
                placeholder="Role for template"
                style={{ ...styles.skillsCountDropdown, padding: "12px", fontSize: "1rem" }}
              />
            </div>
            {/* <div style={styles.dropdownWrapper}>
              <select
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                style={styles.skillsCountDropdown}
              >
                {[1, 2, 3, 4, 5].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div> */}
          </div>

          <div style={styles.addCareerButtonWrapper}>
            <button onClick={handleAddNewCareer} style={styles.addButton}>
              Add Role
            </button>
          </div>
        </div>
        <ChatbotButton/>
      </div>
    </>
  );
};

export default ResumePage;
