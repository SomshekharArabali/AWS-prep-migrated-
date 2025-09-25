import { Link, useLocation } from "react-router-dom"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import "./Header.css"

const Header = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? "active" : ""
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
         <Link to="/" className="logo">
  <div className="logo-icon">
    <span className="aws-logo" role="img" aria-label="AWS">☁</span>
  </div>
  <span className="logo-text">AWS Prep</span>
</Link>


          <nav className="nav">
            <SignedIn>
              <Link to="/dashboard" className={`nav-link ${isActive("/dashboard")}`}>
                Dashboard
              </Link>
            </SignedIn>
            <Link to="/modules" className={`nav-link ${isActive("/modules")}`}>
              Modules
            </Link>
            <Link to="/questions" className={`nav-link ${isActive("/questions")}`}>
              Question Sets
            </Link>
            <Link to="/cheat-sheet" className={`nav-link ${isActive("/cheat-sheet")}`}>
              Cheat Sheet
            </Link>
            <Link to="/about" className={`nav-link ${isActive("/about")}`}>
              About
            </Link>
          </nav>

          <div className="auth-section">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="btn btn-primary">Sign In</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
