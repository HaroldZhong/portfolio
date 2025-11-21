import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import '../assets/styles/Contact.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

function Contact() {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<boolean>(false);
  
  const [sending, setSending] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const hasNameError = name === '';
    const hasEmailError = email === '';
    const hasMessageError = message === '';
    
    setNameError(hasNameError);
    setEmailError(hasEmailError);
    setMessageError(hasMessageError);

    if (hasNameError || hasEmailError || hasMessageError) {
      return;
    }

    // Send email via EmailJS
    setSending(true);
    setError('');
    setSuccess(false);

    const templateParams = {
      name: name,
      email: email,
      message: message
    };

    // EmailJS credentials
    const SERVICE_ID = 'service_2p7nwcv';
    const TEMPLATE_ID = 'template_fvq93b8';
    const PUBLIC_KEY = '-XJrKh5vjUmCWPZQ5';

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSuccess(true);
        setSending(false);
        // Clear form
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((err) => {
        console.error('FAILED...', err);
        setError('Failed to send message. Please try again or email me directly.');
        setSending(false);
      });
  };

  return (
    <div id="contact">
      <div className="items-container">
        <div className="contact_wrapper">
          <h1>Contact Me</h1>
          <p className="contact-intro">
            I'm always happy to talk about AI in health, research workflows, or weird data problems.
            <br /><br />
            If you're working on something in that space, I'd love to hear about it.
          </p>
          
          {success && (
            <Alert severity="success" sx={{ marginBottom: 3 }}>
              Message sent successfully! I'll get back to you soon.
            </Alert>
          )}
          
          {error && (
            <Alert severity="error" sx={{ marginBottom: 3 }}>
              {error}
            </Alert>
          )}
          
          <Box
            ref={form}
            component="form"
            noValidate
            autoComplete="off"
            className='contact-form'
            onSubmit={sendEmail}
          >
            <div className='form-flex'>
              <TextField
                required
                id="outlined-required"
                label="Your Name"
                placeholder="What's your name?"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                error={nameError}
                helperText={nameError ? "Please enter your name" : ""}
              />
              <TextField
                required
                id="outlined-required"
                label="Email / Phone"
                placeholder="How can I reach you?"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                error={emailError}
                helperText={emailError ? "Please enter your email or phone number" : ""}
              />
            </div>
            <TextField
              required
              id="outlined-multiline-static"
              label="Message"
              placeholder="Send me any inquiries or questions"
              multiline
              rows={10}
              className="body-form"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              error={messageError}
              helperText={messageError ? "Please enter the message" : ""}
            />
            <Button 
              variant="contained" 
              endIcon={<SendIcon />} 
              type="submit"
              disabled={sending}
            >
              {sending ? 'Sending...' : 'Send'}
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Contact;
