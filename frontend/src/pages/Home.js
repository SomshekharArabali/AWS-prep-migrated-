import { Link } from "react-router-dom"
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react"
import "./Home.css"

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="aws-badge">
              <img src="/aws-logo.png" alt="AWS Certified Cloud Practitioner" />
            </div>
            <h1 className="hero-title">
              Master AWS Cloud <br />
              <span className="highlight">Practitioner Exam</span>
            </h1>
            <p className="hero-description">
              Comprehensive preparation platform with 1100+ practice questions across 11 question sets and 10 structured
              modules to help you ace the CLF-C02 certification exam.
            </p>
            <div className="hero-actions">
              <SignedIn>
                <Link to="/modules" className="btn btn-primary">
                  <span>▶</span> Start Learning
                </Link>
                <Link to="/questions" className="btn btn-outline">
                  <span>❓</span> Question Sets
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="btn btn-primary">
                    <span>▶</span> Start Learning
                  </button>
                </SignInButton>
                <SignInButton mode="modal">
                  <button className="btn btn-outline">
                    <span>❓</span> Question Sets
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number orange">1100+</div>
              <div className="stat-label">Practice Questions</div>
            </div>
            <div className="stat-item">
              <div className="stat-number red">11</div>
              <div className="stat-label">Question Sets</div>
            </div>
            <div className="stat-item">
              <div className="stat-number blue">10</div>
              <div className="stat-label">Learning Modules</div>
            </div>
            <div className="stat-item">
              <div className="stat-number green">CLF-C02</div>
              <div className="stat-label">Latest Exam</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Everything You Need to Succeed</h2>
            <p>
              Comprehensive study materials and practice tests designed to help you pass the AWS Cloud Practitioner exam
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon orange">
                <span>📚</span>
              </div>
              <h3>Structured Learning</h3>
              <p>10 comprehensive modules covering all exam domains with targeted questions for focused practice.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon blue">
                <span>🧠</span>
              </div>
              <h3>Practice Tests</h3>
              <p>11 question sets with 1100+ practice questions to test your knowledge and exam readiness.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon green">
                <span>🏆</span>
              </div>
              <h3>Exam Simulation</h3>
              <p>Real exam experience with detailed performance analytics and progress tracking.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
