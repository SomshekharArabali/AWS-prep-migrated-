"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { apiClient } from "../utils/api"
import LoadingSpinner from "../components/LoadingSpinner"
import "./Dashboard.css"

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [progressData, setProgressData] = useState({
    overallProgress: 0,
    modulesCompleted: 0,
    totalModules: 10,
    questionsAnswered: 0,
    totalQuestions: 1100,
    averageScore: 0,
    recentActivity: [],
    weakAreas: [],
    strongAreas: [],
  })
  const { user } = useAuth()

  useEffect(() => {
    fetchProgressData()
  }, [])

  const fetchProgressData = async () => {
    try {
      const response = await apiClient.progress.getOverview()
      setProgressData(response.data)
    } catch (error) {
      console.error("Error fetching progress data:", error)
      // Use mock data for demonstration
      setProgressData({
        overallProgress: 65,
        modulesCompleted: 6,
        totalModules: 10,
        questionsAnswered: 450,
        totalQuestions: 1100,
        averageScore: 78,
        recentActivity: [
          {
            id: 1,
            type: "module",
            title: "Module 6: Deployment and Operations",
            score: 85,
            date: "2024-01-15",
          },
          {
            id: 2,
            type: "quiz",
            title: "Practice Set 3: Security & Compliance",
            score: 72,
            date: "2024-01-14",
          },
          {
            id: 3,
            type: "module",
            title: "Module 5: Architecture and Design",
            score: 88,
            date: "2024-01-13",
          },
        ],
        weakAreas: [
          { topic: "Security & Compliance", score: 65, questions: 45 },
          { topic: "Pricing & Support", score: 68, questions: 32 },
          { topic: "Networking", score: 71, questions: 38 },
        ],
        strongAreas: [
          { topic: "Cloud Concepts", score: 92, questions: 55 },
          { topic: "Core Services", score: 87, questions: 68 },
          { topic: "Architecture", score: 85, questions: 42 },
        ],
      })
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "#28a745"
    if (score >= 70) return "#ffc107"
    return "#dc3545"
  }

  const getProgressColor = (progress) => {
    if (progress >= 80) return "var(--primary-green)"
    if (progress >= 60) return "var(--primary-blue)"
    if (progress >= 40) return "var(--primary-orange)"
    return "#dc3545"
  }

  if (loading) {
    return <LoadingSpinner message="Loading your progress..." />
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Your Progress Dashboard</h1>
          <p>Track your AWS Cloud Practitioner exam preparation journey</p>
        </div>

        {/* Overview Stats */}
        <div className="stats-overview">
          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: getProgressColor(progressData.overallProgress) }}>
              <span>📊</span>
            </div>
            <div className="stat-content">
              <h3>{progressData.overallProgress}%</h3>
              <p>Overall Progress</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: "var(--primary-blue)" }}>
              <span>📚</span>
            </div>
            <div className="stat-content">
              <h3>
                {progressData.modulesCompleted}/{progressData.totalModules}
              </h3>
              <p>Modules Completed</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: "var(--primary-orange)" }}>
              <span>❓</span>
            </div>
            <div className="stat-content">
              <h3>
                {progressData.questionsAnswered}/{progressData.totalQuestions}
              </h3>
              <p>Questions Answered</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: getScoreColor(progressData.averageScore) }}>
              <span>🎯</span>
            </div>
            <div className="stat-content">
              <h3>{progressData.averageScore}%</h3>
              <p>Average Score</p>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Progress Chart */}
          <div className="dashboard-card progress-chart">
            <h3>Learning Progress</h3>
            <div className="progress-visual">
              <div className="circular-progress">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#e9ecef" strokeWidth="10" />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke={getProgressColor(progressData.overallProgress)}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${(progressData.overallProgress / 100) * 314} 314`}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="progress-text">
                  <span className="progress-number">{progressData.overallProgress}%</span>
                  <span className="progress-label">Complete</span>
                </div>
              </div>
            </div>
            <div className="progress-actions">
              <Link to="/modules" className="btn btn-primary">
                Continue Learning
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="dashboard-card recent-activity">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              {progressData.recentActivity.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    <span>{activity.type === "module" ? "📚" : "❓"}</span>
                  </div>
                  <div className="activity-content">
                    <h4>{activity.title}</h4>
                    <p>Score: {activity.score}%</p>
                  </div>
                  <div className="activity-date">
                    <span>{new Date(activity.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weak Areas */}
          <div className="dashboard-card weak-areas">
            <h3>Areas to Improve</h3>
            <div className="areas-list">
              {progressData.weakAreas.map((area, index) => (
                <div key={index} className="area-item">
                  <div className="area-info">
                    <h4>{area.topic}</h4>
                    <p>{area.questions} questions answered</p>
                  </div>
                  <div className="area-score" style={{ color: getScoreColor(area.score) }}>
                    {area.score}%
                  </div>
                </div>
              ))}
            </div>
            <Link to="/questions" className="btn btn-outline">
              Practice More
            </Link>
          </div>

          {/* Strong Areas */}
          <div className="dashboard-card strong-areas">
            <h3>Your Strengths</h3>
            <div className="areas-list">
              {progressData.strongAreas.map((area, index) => (
                <div key={index} className="area-item">
                  <div className="area-info">
                    <h4>{area.topic}</h4>
                    <p>{area.questions} questions answered</p>
                  </div>
                  <div className="area-score" style={{ color: getScoreColor(area.score) }}>
                    {area.score}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <Link to="/modules" className="action-card">
              <div className="action-icon">
                <span>📚</span>
              </div>
              <h4>Continue Modules</h4>
              <p>Resume your structured learning path</p>
            </Link>

            <Link to="/questions" className="action-card">
              <div className="action-icon">
                <span>❓</span>
              </div>
              <h4>Practice Questions</h4>
              <p>Test your knowledge with practice sets</p>
            </Link>

            <Link to="/cheat-sheet" className="action-card">
              <div className="action-icon">
                <span>📋</span>
              </div>
              <h4>Study Cheat Sheet</h4>
              <p>Quick reference for key concepts</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
