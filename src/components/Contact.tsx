import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

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

  // Honeypot and timing for spam protection
  const [honeypot, setHoneypot] = useState<string>('');
  const [formLoadTime] = useState<number>(Date.now());

  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (sending) return;
    setSuccess(false);
    setError('');

    // Keep spam protection, but never claim delivery for a rejected inquiry.
    if (honeypot.trim() || Date.now() - formLoadTime < 3000) {
      setError('Message not sent. Please wait a few seconds and try again, or email me directly.');
      return;
    }

    // Validation
    const hasNameError = name.trim() === '';
    const hasEmailError = email.trim() === '';
    const hasMessageError = message.trim() === '';

    setNameError(hasNameError);
    setEmailError(hasEmailError);
    setMessageError(hasMessageError);

    if (hasNameError || hasEmailError || hasMessageError) {
      const field = hasNameError ? 'contact-name' : hasEmailError ? 'contact-email' : 'contact-message';
      document.getElementById(field)?.focus();
      return;
    }

    // Send email via EmailJS
    setSending(true);
    setError('');
    setSuccess(false);

    const contact = email.trim();
    const replyEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) ? contact : '';
    const templateParams = {
      name: name.trim(),
      // EmailJS uses this field in Reply-To, which cannot contain a phone number.
      email: replyEmail,
      message: replyEmail ? message.trim() : `Contact: ${contact}\n\n${message.trim()}`
    };

    // EmailJS credentials
    const SERVICE_ID = 'service_2p7nwcv';
    const TEMPLATE_ID = 'template_fvq93b8';
    const PUBLIC_KEY = '-XJrKh5vjUmCWPZQ5';

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        setSuccess(true);
        setSending(false);
        // Clear form
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch(() => {
        setError('Failed to send message. Please try again or email me directly.');
        setSending(false);
      });
  };

  return (
    <section id="contact" className="section shell" aria-labelledby="contact-title">
      <div className="contact-grid">
        <div className="contact-lead">
          <p className="section-index"><span className="num">07</span>Contact</p>
          <h2 id="contact-title">Let’s <em>talk.</em></h2>
          <p className="contact-intro">
            I'm always happy to talk about AI in health, research workflows, or weird data problems.
            If you're working on something in that space, I'd love to hear about it.
          </p>
        </div>

        <form
          ref={form}
          noValidate
          autoComplete="on"
          aria-busy={sending}
          className="contact-form"
          onSubmit={sendEmail}
        >
          {success && (
            <p className="form-alert success" role="alert"><CheckCircle2 size={18} aria-hidden="true" />Message sent successfully! I'll get back to you soon.</p>
          )}
          {error && (
            <p className="form-alert error" role="alert"><AlertCircle size={18} aria-hidden="true" />{error}</p>
          )}

          {/* Honeypot field - hidden from humans, bots will fill it */}
          <div className="hp-field" aria-hidden="true">
            <input value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" aria-label="Do not fill this field" />
          </div>

          <div className="form-row">
            <div className={`field${nameError ? ' invalid' : ''}`}>
              <label htmlFor="contact-name">Your name</label>
              <input id="contact-name" required autoComplete="name" placeholder="What's your name?" value={name}
                onChange={(e) => setName(e.target.value)} aria-invalid={nameError} aria-describedby={nameError ? 'contact-name-error' : undefined} />
              {nameError && <p className="field-error" id="contact-name-error">Please enter your name</p>}
            </div>
            <div className={`field${emailError ? ' invalid' : ''}`}>
              <label htmlFor="contact-email">Email or phone</label>
              <input id="contact-email" required autoComplete="email" placeholder="Email address or phone number" value={email}
                onChange={(e) => setEmail(e.target.value)} aria-invalid={emailError} aria-describedby={emailError ? 'contact-email-error' : undefined} />
              {emailError && <p className="field-error" id="contact-email-error">Please enter your email or phone number</p>}
            </div>
          </div>
          <div className={`field${messageError ? ' invalid' : ''}`}>
            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" required rows={5} placeholder="Send me any inquiries or questions" value={message}
              onChange={(e) => setMessage(e.target.value)} aria-invalid={messageError} aria-describedby={messageError ? 'contact-message-error' : undefined} />
            {messageError && <p className="field-error" id="contact-message-error">Please enter the message</p>}
          </div>
          <button type="submit" className="btn btn-primary" disabled={sending}>
            {sending ? 'Sending...' : 'Send message'} <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
