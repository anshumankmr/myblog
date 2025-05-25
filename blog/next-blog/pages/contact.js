import React from 'react';
import Seo from '../components/Seo'; // Add this import
import '../styles/contact.css'; // Import page-specific styles

const ContactPage = () => { // location prop removed, useLocation hook removed
  return (
    <>
      <Seo title="Contact" /> {/* Add Seo component here */}
      <section className="contact">
        <div className="contact-me">
          <div className="contact-me-content">
            <h2>Contact Me</h2>
          </div>
          <div>
            <p>
              I&apos;m passionate about talking with like-minded people. Feel free to reach out via email.
            </p>
          </div>
          <div>
            <button id="contact-me-button" className="button">
              <a href="mailto:anshumankumar.mail@gmail.com">Email Me</a>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
