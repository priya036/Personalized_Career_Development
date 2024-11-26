import React, { useState, useEffect, useRef } from 'react';
import { MdSend } from 'react-icons/md';
import { Navigationinner } from '../components/navigationinner';
import ReactMarkdown from 'react-markdown';
const apiUrl = process.env.REACT_APP_API_ENDPOINT;

console.log(process.env.API_ENDPOINT);

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setInput('');

    try {
      const response = await fetch(`${apiUrl}/api/chatbot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      const aiMessage = {
        type: 'ai',
        content: data.response || 'No response received.',
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error interacting with chatbot:', error);
      const errorMessage = { type: 'ai', content: 'Error processing your request.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const styles = {
    pageContainer: {
      minHeight: '100vh',
      backgroundColor: '#f4f4f9',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    navbar: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
    },
    chatbotContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      paddingTop: '70px',
    },
    chatbox: {
      width: '100%',
      maxWidth: '1000px',
      height: '80vh',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    messages: {
      flex: 1,
      overflowY: 'auto',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
    },
    message: {
      padding: '10px 20px',
      borderRadius: '10px',
      marginBottom: '15px',
      maxWidth: '75%',
      display: 'inline-block',
      wordBreak: 'break-word',
      alignSelf: 'flex-start',
    },
    userMessage: {
      backgroundColor: '#007bff',
      color: '#fff',
      textAlign: 'right',
      alignSelf: 'flex-end',
    },
    aiMessage: {
      backgroundColor: '#f1f1f1',
      color: '#333',
      textAlign: 'left',
    },
    inputContainer: {
      borderTop: '1px solid #e0e0e0',
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    inputBox: {
      flex: 1,
      padding: '10px 15px',
      borderRadius: '25px',
      border: '1px solid #ddd',
      fontSize: '16px',
      outline: 'none',
    },
    sendButton: {
      marginLeft: '10px',
      backgroundColor: '#007bff',
      color: '#fff',
      padding: '10px',
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    sendButtonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.navbar}>
        <Navigationinner title="CHATBOT" />
      </div>

      <div style={styles.chatbotContainer}>
        <div style={styles.chatbox}>
          <div style={styles.messages}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  ...(message.type === 'user' ? styles.userMessage : styles.aiMessage),
                }}
              >
                {message.type === 'ai' ? (
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                ) : (
                  message.content
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div style={styles.inputContainer}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              style={styles.inputBox}
            />
            <button
              onClick={handleSend}
              style={styles.sendButton}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.sendButtonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = styles.sendButton.backgroundColor)}
            >
              <MdSend size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
