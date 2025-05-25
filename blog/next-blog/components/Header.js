import React from "react";
import Link from "next/link";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { useTheme } from '../context/ThemeContext'; // Add this
import '../styles/header.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme(); // Use the context
  return (
    <header className="site-header">
      <div className="header-content">
        <Link href="/" className="site-title">
          Les Pensées d&apos;Anshuman
        </Link>
        <nav className="menu">
          <Link href="/blogs">Blogs</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <a href="https://www.linkedin.com/in/anshuman-kumar-909904169/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://github.com/anshumankumar" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://storage.googleapis.com/www.anshumankumar.dev/assets/Anshuman_Kumar_Resume_2024.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
          <button onClick={toggleTheme} style={{ background: 'var(--color-accent)', color: 'var(--color-text)', border: '1px solid var(--color-text)', padding: '0.5rem', cursor: 'pointer', marginLeft: '1rem' }}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
