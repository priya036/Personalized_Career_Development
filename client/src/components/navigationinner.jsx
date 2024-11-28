import React, { useState, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { auth } from "../Firebase"; // Import Firebase auth instance
import mainlogo from "../images/mainlogo.png";
const apiUrl = process.env.REACT_APP_API_ENDPOINT;


export const Navigationinner = ({ title }) => {
  const [user, setUser] = useState(null); // Firebase user state
  const [userData, setUserData] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#f8f9fa",
      borderBottom: "1px solid #ddd",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
    },
    logo: {
      height: "30px",
      marginRight: "10px",
    },
    logoText: {
      fontSize: "28px",
      fontWeight: "bold",
    },
    title: {
      fontSize: "25px",
      fontWeight: "bold",
      margin: 0,
    },
    userInfo: {
      fontSize: "20px",
      display: "flex",
      fontWeight: "bold",
      alignItems: "center",
      cursor: "pointer",
    },
    profilePicture: {
      height: "40px",
      width: "40px",
      borderRadius: "50%",
      marginLeft: "10px",
    },
    popup: {
      position: "absolute",
      top: "60px",
      right: "20px",
      width: "250px",
      padding: "20px",
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      borderRadius: "5px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      zIndex: 1000,
    },
    closeButton: {
      position: "absolute",
      top: "0px",
      right: "10px",
      fontSize: "24px",
      background: "none",
      border: "none",
      cursor: "pointer",
    },
    popupImage: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      marginBottom: "10px",
    },
    logoutButton: {
      marginTop: "10px",
      padding: "5px 10px",
      border: "none",
      backgroundColor: "#007bff",
      color: "#fff",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch additional user data if required
        const fetchUserData = async () => {
          try {
            const response = await axios.get(
              `${apiUrl}/getUser/${currentUser.email}`
            );
            setUserData(response.data);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };

        fetchUserData();
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase sign-out
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <img src={mainlogo} alt="CareerDev Logo" style={styles.logo} />
        <span style={styles.logoText}>CareerDev</span>
      </div>

      <div style={styles.title}>{title}</div>

      <div style={styles.userInfo} onClick={togglePopup}>
        {user && (
          <>
            <span>{user.displayName}</span>
            <img
              src={user.photoURL}
              alt="Profile"
              style={styles.profilePicture}
            />
          </>
        )}
      </div>

      {showPopup && user && (
        <div style={styles.popup}>
          <button style={styles.closeButton} onClick={togglePopup}>
            &times;
          </button>
          <img
            src={user.photoURL}
            alt="Profile"
            style={styles.popupImage}
          />
          <h4>{user.displayName}</h4>
          <p>{user.email}</p>
          <button style={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};
