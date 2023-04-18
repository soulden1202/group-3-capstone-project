import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useSelector } from 'react-redux';
import "/src/containers/property/PropertyDetailModal"

const ContactButton = ({ recipientEmail }) => {
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const emailService = process.env.REACT_APP_EMAIL_SERVICE_ID;
  const emailTemplate = process.env.REACT_APP_EMAIL_TEMPLATE_ID;
  const emailUser = process.env.REACT_APP_EMAIL_USER_ID;

  const user = useSelector((state) => state.user);
  const senderEmail = user.email;

  emailjs.init(emailUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send(emailService, emailTemplate, {
      to_email: recipientEmail,
      from_name: 'User',
      from_email: senderEmail,
      subject,
      message,
    });
    setShowForm(false);
    setSubject('');
    setMessage('');
  };

  if (!showForm) {
    return (
      <button onClick={() => setShowForm(true)}>Contact</button>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Subject:
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </label>
      <br />
      <label>
        Message:
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Send</button>
    </form>
  );
};

export default ContactButton;
