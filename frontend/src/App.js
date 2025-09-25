import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Modules from "./pages/Modules"
import Questions from "./pages/Questions"
import CheatSheet from "./pages/CheatSheet"
import About from "./pages/About"
import "./App.css"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/modules"
                element={
                  <ProtectedRoute>
                    <Modules />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/questions"
                element={
                  <ProtectedRoute>
                    <Questions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cheat-sheet"
                element={
                  <ProtectedRoute>
                    <CheatSheet />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
