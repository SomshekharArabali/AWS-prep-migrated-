import "./About.css"

const About = () => {
  return (
    <div className="about">
      <div className="container">
        <div className="about-content">
          <h1>About This Platform</h1>

          <div className="about-card">
            <div className="creator-info">
              <div className="creator-icon">
                <img 
        src="/profile.png" 
        alt="Somashekhar Arabali" 
        className="profile-photo"
      />
              </div>
              <h2>Created by Somashekhar Arabali</h2>
            </div>

            <p className="about-description">
              This comprehensive AWS Cloud Practitioner exam preparation platform is designed to help you succeed in
              your certification journey. With carefully curated questions and detailed explanations, you'll build the
              confidence needed to pass the CLF-C02 exam.
            </p>

            <div className="features-list">
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <span>Mobile Responsive</span>
              </div>
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <span>Progress Tracking</span>
              </div>
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <span>Detailed Analytics</span>
              </div>
            </div>

            <div className="support-section">
              <p>If you find this content helpful, please consider supporting the project:</p>
              <button className="btn btn-primary support-btn">
                <span>☕</span> Buy Me A Coffee
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
