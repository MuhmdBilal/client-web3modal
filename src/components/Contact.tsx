import React from 'react';


const Contact = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-heading">Contact <span className="highlight">Us</span></h2>

      <div className="contact-content">
        {/* Social Media Icons */}
        <div className="social-icons">
          <a href="https://x.com/RiseofCryptoBro" target="_blank" rel="noopener noreferrer" className="icon twitter">
            <img src="/assets/icons8-twitterx.svg" alt="Twitter" />
          </a>
          <a href="https://www.youtube.com/@RiseofCryptoBrothers" target="_blank" rel="noopener noreferrer" className="icon youtube">
            <img src="/assets/icons8-youtube.svg" alt="YouTube" />
          </a>
          <a href="https://www.instagram.com/riseofcryptobrothers" target="_blank" rel="noopener noreferrer" className="icon instagram">
            <img src="/assets/icons8-instagram.svg" alt="Instagram" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
