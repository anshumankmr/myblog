import React from "react";
import Link from "next/link";
import Seo from '../components/Seo'; // Add this import
import '../styles/about.css'; // Import page-specific styles

const AboutPage = () => { // location prop removed
  return (
    <>
      <Seo title="About" /> {/* Add Seo component here */}
      <div className="about-container">
        <h1 className="headline">
          AI Consultant, Code Enthusiast, and Life Explorer – Insights on Tech, Culture, and Everything In Between
        </h1>

        <div className="bio-content">
          <p>
            Hey, I&apos;m Anshuman Kumar, an AI Consultant based in Bengaluru. I work on building cutting-edge AI solutions, 
            specializing in everything from Generative AI to ML-driven conversation agents.
          </p>

          <p>
            When I&apos;m not architecting smart systems, you&apos;ll find me diving into the world of memes, movies, and random musings.
          </p>

          <p>
            On this blog, I share my thoughts on tech innovations, fitness (yes, I love cycling and marathons), 
            and a bit of everything else that keeps life interesting. Join me as I explore the intersection of code, 
            culture, and curiosity.
          </p>
        </div>

        <div>
          <h3>Personal Skills</h3>
          <ul>
            <li>AI/ML: Generative AI, Prompt Engineering, Machine Learning (Scikit-learn, Keras)</li>
            <li>Cloud: AWS, GCP, Vertex AI, Kubernetes</li>
            <li>Bot Development: Dialogflow, RASA</li>
            <li>Languages: Python, JavaScript</li>
            <li>CI/CD: GitLab CI, GitHub Actions</li>
            <li>Databases: Postgres, MySQL, Firestore</li>
          </ul>

          <h3>Hobbies</h3>
          <ul>
            <li>Cycling</li>
            <li>Running (Marathons)</li>
            <li>Exploring new tech innovations</li>
            <li>Watching and analyzing movies (especially horror and thriller genres)</li>
            <li>Memes and pop culture</li>
          </ul>

          <h3>Achievements</h3>
          <ul>
            <li>Third prize at Jovian Hackathon 2023 for developing an open-source solution to automate coding tasks.</li>
            <li>Successfully built and deployed multiple AI-based systems, including Generative AI-based Conversation Agents at Deloitte.</li>
            <li>Participated in various marathons, including the Vedanta Delhi Half Marathon (2022) and Bangalore Half Marathon (2023).</li>
            <li>Developed a COVID-19 unemployment insurance chatbot to support customers during a critical period, improving accessibility.</li>
            <li>Strong contributions to open-source projects, including automating code tasks like unit tests and code fixes.</li>
          </ul>

          <div className="cta-buttons">
            <Link href="/contact" className="primary-button">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
