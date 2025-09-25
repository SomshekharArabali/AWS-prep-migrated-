import { Link } from "react-router-dom"
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="logo-icon">
                <span>☁</span>
              </div>
              <span className="logo-text">AWS Prep</span>
            </Link>
            <p className="footer-description">Comprehensive AWS Cloud Practitioner exam preparation platform</p>
          </div>

          <div className="footer-links">
            <div className="footer-section">
              <h4>Platform</h4>
              <Link to="/modules">Modules</Link>
              <Link to="/questions">Question Sets</Link>
              <Link to="/cheat-sheet">Cheat Sheet</Link>
            </div>

            <div className="footer-section">
              <h4>Support</h4>
              <Link to="/about">About</Link>
              <a href="mailto:support@awsprep.com">Contact</a>
              <a href="/privacy">Privacy Policy</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 AWS Prep. All rights reserved.</p>
          <p>Created by Somashekhar Arabali</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
