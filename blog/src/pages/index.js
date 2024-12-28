import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import Header from '../components/header';
import Seo from '../components/seo';
import './landing.css';

const IndexPage = ({ location }) => {
  return (
    <>
      <Header />
      <Layout location={location}>
        <div className="landing-container">
          <section className="introduction">
            <h1 className="headline">
              AI Consultant, Code Enthusiast, and Life Explorer – Insights on Tech, Culture, and Everything In Between
            </h1>
            
            <div className="bio-content">
              <p>
                Hey, I'm Anshuman Kumar, an AI Consultant based in Bengaluru. I work on building cutting-edge AI solutions, 
                specializing in everything from Generative AI to ML-driven conversation agents.
              </p>
              
              <p>
                When I'm not architecting smart systems, you'll find me diving into the world of memes, movies, and random musings.
              </p>
              
              <p>
                On this blog, I share my thoughts on tech innovations, fitness (yes, I love cycling and marathons), 
                and a bit of everything else that keeps life interesting. Join me as I explore the intersection of code, 
                culture, and curiosity.
              </p>
            </div>

            <div className="cta-buttons">
              <Link to="/blogs" className="primary-button">
                Read the Blog
              </Link>
              <Link to="/about" className="secondary-button">
                More About Me
              </Link>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default IndexPage;

export const Head = () => <Seo title="Home" />;