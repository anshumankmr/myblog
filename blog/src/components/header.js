import React from "react"
import { Link } from "gatsby"
import { FaLinkedin, FaGithub } from "react-icons/fa"
import "./header.css"

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-content">
        <Link to="/" className="site-title">
          Les Pensées d'Anshuman
        </Link>
        <nav className="menu">
          <Link to="/blogs">Blogs</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <Link to="/assets/AnshumanKumarResumeDecember2024.pdf">Resume</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header