import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SiChatbot } from "react-icons/si";

const ChatbotButton = () => {
  const navigate = useNavigate();

  const handleChatbotNavigate = () => {
    navigate('/chatbot');
  };

  const styles = {
    chatbotButton: {
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      backgroundColor: '#3182ce',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '60px',
      height: '60px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
  };

  return (
    <button style={styles.chatbotButton} onClick={handleChatbotNavigate}>
      <SiChatbot size={28} />
    </button>
  );
};

export default ChatbotButton;
