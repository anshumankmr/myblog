import React from 'react';
import { useLocation } from '@reach/router'; // Import useLocation
import Header from '../components/header';
import Layout from '../components/layout';
import './contact.css';

const Contact = () => {
  const location = useLocation(); // Get location using the useLocation hook

  return (
    <>
      <Header />
      <Layout location={location}> {/* Pass location as a prop */}
        <section className="contact">
          <div className="contact-me">
            <div className="contact-me-content">
              <h2>Contact Me</h2>
            </div>
            <div>
              <p>
                I'm passionate about talking with like-minded people. Feel free to reach out via email.
              </p>
            </div>
            <div>
              <button id="contact-me-button" className="button">
                <a href="mailto:anshumankumar.mail@gmail.com">Email Me</a>
              </button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
