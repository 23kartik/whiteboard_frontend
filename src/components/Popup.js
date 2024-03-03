import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email'; // Import the Email icon from your icon library
import './Popup.css';
import api from '../service/api'; // Import the axios instance configured with your backend URL

const Popup = ({ onClose,user }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
          navigate('/auth');
        }
      }, [user, navigate]);
  const [emailInput, setEmailInput] = useState('');
  const [selectedEmails, setSelectedEmails] = useState([]);

  const handleEmailInputChange = (event) => {
    setEmailInput(event.target.value);
  };
  const handleEmailKeyDown = (event) => {
    if (event.key === 'Enter' && emailInput.trim() !== '') {
      // Split the input string by commas and trim each email
      const emails = emailInput.split(',').map(email => email.trim());
  
      // Remove duplicates using Set data structure
      const uniqueEmails = [...new Set(emails)];
  
      // Validate each email address
      const invalidEmails = uniqueEmails.filter(email => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  
      if (invalidEmails.length === 0) {
        setSelectedEmails(prevEmails => [...new Set([...prevEmails, ...uniqueEmails])]);
      } else {
        // Notify the user about invalid email addresses
        alert('Please enter valid email addresses: ' + invalidEmails.join(', '));
      }
  
      setEmailInput('');
    }
  };
  
  const handleRemoveEmail = (index) => {
    const updatedEmails = selectedEmails.filter((_, i) => i !== index);
    setSelectedEmails(updatedEmails);
  };

  const handleSendEmail = async() => {
    try {
        const emailData = {
            to: selectedEmails,
            subject: `Hurray, ${user.email} invited you to the whiteboard!`,
            meetingLink: window.location.href,
            senderEmail: 'drawsync.invite@gmail.com', // Check this line
            senderPassword: 'qadqulxyhbiafzhj'
        };
          console.log(emailData.senderEmail)
          
    
          await api.post('/api/users/send-email', emailData );
          onClose();
    } catch (error) {
        console.error('Failed to send email:', error.message);
    }
   

   
  };

  return (
    <div className="popup-container">
      <div className="popup-card">
        <div className="popup-header">
          <h2 className="title"><strong>Invite People</strong></h2>
          <div className="close-icon" onClick={onClose}>
            <CloseIcon />
          </div>
        </div>
        <div className="email-input-section">
          {selectedEmails.map((email, index) => (
            <span key={index} className="email-chip">
              <EmailIcon className="email-icon" /> {/* Use your email icon */}
              {email}
              <CloseIcon className="remove-icon" onClick={() => handleRemoveEmail(index)} />
            </span>
          ))}
          <input
            type="text"
            id="emailInput"
            value={emailInput}
            onChange={handleEmailInputChange}
            onKeyDown={handleEmailKeyDown}
            placeholder="Enter email"
            className="input-pop"
          />
        </div>
        <div className="font-sans text-base text-gray-800 bg-gray-100 p-8 rounded-lg shadow-md">
        <p className="mb-4">Subject: <strong className="text-blue-600">Hurray, {user.email} invited you to the whiteboard!</strong></p>

      <p className="mb-4">You have been invited to join a whiteboard session by <strong className="text-blue-600">{user.email}</strong>.</p>
      <p className="mb-4">Meeting Link: <a href={window.location.href} className="text-blue-500 underline">{window.location.href}</a></p>
    
    </div>
        <button className="button-pop" onClick={handleSendEmail}>
          Send email
        </button>
      </div>
    </div>
  );
};

export default Popup;
