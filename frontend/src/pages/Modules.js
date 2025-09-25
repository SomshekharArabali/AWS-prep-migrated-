"use client"

import { useState, useEffect } from "react"
import { apiClient } from "../utils/api"
import { useAuth } from "../contexts/AuthContext"
import LoadingSpinner from "../components/LoadingSpinner"
import "./Questions.css"

const Questions = () => {
  const [questionSets, setQuestionSets] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSet, setSelectedSet] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [quizMode, setQuizMode] = useState("practice") // 'practice' or 'exam'
  const [quizQuestions, setQuizQuestions] = useState([])
  const [startTime, setStartTime] = useState(null)
  const [timeRemaining, setTimeRemaining] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizResults, setQuizResults] = useState(null)
  const { updateProgress } = useAuth()

  useEffect(() => {
    fetchQuestionSets()
  }, [])

  // Timer effect for exam mode
  useEffect(() => {
    let timer
    if (selectedSet && quizMode === "exam" && timeRemaining > 0 && !showResults) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Time's up - auto submit
            handleTimeUp()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [selectedSet, quizMode, timeRemaining, showResults])

  const fetchQuestionSets = async () => {
    try {
      const response = await apiClient.questions.getAll()
      setQuestionSets(response.data)
    } catch (error) {
      console.error("Error fetching question sets:", error)
      // Fallback data
      setQuestionSets([
        {
          id: 1,
          title: "Practice Set 1: Cloud Concepts",
          questions: 65,
          difficulty: "Beginner",
          completed: false,
          timeLimit: 90,
        },
        {
          id: 2,
          title: "Practice Set 2: AWS Core Services",
          questions: 85,
          difficulty: "Intermediate",
          completed: false,
          timeLimit: 120,
        },
        {
          id: 3,
          title: "Practice Set 3: Security & Compliance",
          questions: 75,
          difficulty: "Intermediate",
          completed: false,
          timeLimit: 110,
        },
        { id: 11, title: "Full Practice Exam", questions: 65, difficulty: "Exam", completed: false, timeLimit: 90 },
      ])
    } finally {
      setLoading(false)
    }
  }

  const startQuestionSet = async (questionSet, mode = "practice") => {
    try {
      setLoading(true)
      const response = await apiClient.questions.getById(questionSet.id)
      setQuizQuestions(response.data.questions || [])
      setSelectedSet(questionSet)
      setQuizMode(mode)
      setCurrentQuestion(0)
      setUserAnswers({})
      setShowResults(false)
      setShowExplanation(false)
      setQuizResults(null)
      setStartTime(Date.now())

      // Set timer for exam mode
      if (mode === "exam" && questionSet.timeLimit) {
        setTimeRemaining(questionSet.timeLimit * 60) // Convert minutes to seconds
      } else {
        setTimeRemaining(null)
      }
    } catch (error) {
      console.error("Error loading question set:", error)
      // Use sample questions
      setQuizQuestions([
        {
          question_id: 1,
          question_text: "AWS Cloud Adoption Framework (CAF) is organized into how many perspectives?",
          options: [
            { option_id: 1, option_text: "ten" },
            { option_id: 2, option_text: "eight" },
            { option_id: 3, option_text: "four" },
            { option_id: 4, option_text: "six" },
          ],
          correct_answer_id: 4,
          explanation:
            "The AWS CAF is organized into six perspectives: Business, People, Governance, Platform, Security, and Operations.",
        },
      ])
      setSelectedSet(questionSet)
      setQuizMode(mode)
      setCurrentQuestion(0)
      setUserAnswers({})
      setShowResults(false)
      setShowExplanation(false)
      setQuizResults(null)
      setStartTime(Date.now())

      if (mode === "exam") {
        setTimeRemaining(90 * 60) // 90 minutes default
      } else {
        setTimeRemaining(null)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = (questionId, answerId) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }))

    // In practice mode, show explanation immediately
    if (quizMode === "practice") {
      setShowExplanation(true)
    }
  }

  const handleMultipleAnswer = (questionId, answerId) => {
    setUserAnswers((prev) => {
      const currentAnswers = prev[questionId] || []
      const isSelected = currentAnswers.includes(answerId)

      if (isSelected) {
        return {
          ...prev,
          [questionId]: currentAnswers.filter((id) => id !== answerId),
        }
      } else {
        return {
          ...prev,
          [questionId]: [...currentAnswers, answerId],
        }
      }
    })
  }

  const nextQuestion = async () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setShowExplanation(false)
    } else {
      await submitQuiz()
    }
  }

  const submitQuiz = async () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000 / 60) // minutes

    // Calculate results
    const correctAnswers = quizQuestions.filter((q) => {
      const userAnswer = userAnswers[q.question_id]
      const correctAnswer = q.correct_answer_id

      if (Array.isArray(correctAnswer)) {
        return (
          Array.isArray(userAnswer) &&
          correctAnswer.length === userAnswer.length &&
          correctAnswer.every((id) => userAnswer.includes(id))
        )
      } else {
        return userAnswer === correctAnswer
      }
    }).length

    const score = Math.round((correctAnswers / quizQuestions.length) * 100)

    const results = {
      totalQuestions: quizQuestions.length,
      correctAnswers,
      score,
      timeSpent,
      mode: quizMode,
    }

    setQuizResults(results)

    try {
      const response = await apiClient.questions.submitQuiz(selectedSet.id, {
        answers: userAnswers,
        timeSpent,
        mode: quizMode,
      })

      console.log("Quiz results:", response.data.results)
    } catch (error) {
      console.error("Error submitting quiz:", error)
    }

    setShowResults(true)
  }

  const handleTimeUp = () => {
    submitQuiz()
  }

  const backToQuestions = () => {
    setSelectedSet(null)
    setShowResults(false)
    setTimeRemaining(null)
  }

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "var(--primary-green)"
      case "Intermediate":
        return "var(--primary-blue)"
      case "Advanced":
        return "var(--primary-orange)"
      case "Exam":
        return "#DC3545"
      default:
        return "var(--text-gray)"
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "#28a745" // Green
    if (score >= 70) return "#ffc107" // Yellow
    return "#dc3545" // Red
  }

  if (loading) {
    return <LoadingSpinner message="Loading question sets..." />
  }

  if (selectedSet) {
    const currentQ = quizQuestions[currentQuestion]
    const isMultipleChoice = Array.isArray(currentQ?.correct_answer_id)
    const userAnswer = userAnswers[currentQ?.question_id]
    const isAnswered =
      userAnswer !== undefined && userAnswer !== null && (Array.isArray(userAnswer) ? userAnswer.length > 0 : true)

    return (
      <div className="question-quiz">
        <div className="container">
          <div className="quiz-header">
            <button onClick={backToQuestions} className="back-btn">
              ← Back to Question Sets
            </button>
            <h1>{selectedSet.title}</h1>
            <div className="quiz-info">
              <span className="quiz-mode">{quizMode === "exam" ? "Exam Mode" : "Practice Mode"}</span>
              <span className="difficulty" style={{ color: getDifficultyColor(selectedSet.difficulty) }}>
                {selectedSet.difficulty}
              </span>
              {timeRemaining !== null && (
                <span className={`timer ${timeRemaining < 300 ? "timer-warning" : ""}`}>
                  Time: {formatTime(timeRemaining)}
                </span>
              )}
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
              ></div>
            </div>
            <p>
              Question {currentQuestion + 1} of {quizQuestions.length}
            </p>
          </div>

          {!showResults ? (
            <div className="question-card">
              <h3>{currentQ?.question_text}</h3>
              {isMultipleChoice && (
                <p className="multiple-choice-hint">
                  <strong>Select all that apply (Multiple answers required)</strong>
                </p>
              )}

              <div className="question-options">
                {currentQ?.options.map((option) => (
                  <div key={option.option_id} className="option">
                    <input
                      type={isMultipleChoice ? "checkbox" : "radio"}
                      id={`option${option.option_id}`}
                      name="answer"
                      checked={
                        isMultipleChoice
                          ? (userAnswers[currentQ.question_id] || []).includes(option.option_id)
                          : userAnswers[currentQ.question_id] === option.option_id
                      }
                      onChange={() =>
                        isMultipleChoice
                          ? handleMultipleAnswer(currentQ.question_id, option.option_id)
                          : handleAnswer(currentQ.question_id, option.option_id)
                      }
                    />
                    <label htmlFor={`option${option.option_id}`}>
                      {`${String.fromCharCode(65 + option.option_id - 1)}) ${option.option_text}`}
                    </label>
                  </div>
                ))}
              </div>

              {quizMode === "practice" && showExplanation && isAnswered && (
                <div className="explanation">
                  <h4>Explanation:</h4>
                  <p>{currentQ?.explanation || "Explanation will be provided after completion."}</p>
                </div>
              )}

              <button onClick={nextQuestion} className="btn btn-primary next-btn" disabled={!isAnswered}>
                {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
              </button>
            </div>
          ) : (
            <div className="results-card">
              <h2>Quiz Complete!</h2>
              <p>You have completed {selectedSet.title}</p>
              <div className="results-stats">
                <div className="stat">
                  <span className="stat-number" style={{ color: getScoreColor(quizResults?.score || 0) }}>
                    {quizResults?.score || 0}%
                  </span>
                  <span className="stat-label">Score</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{quizResults?.totalQuestions || 0}</span>
                  <span className="stat-label">Questions</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{quizResults?.correctAnswers || 0}</span>
                  <span className="stat-label">Correct</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{quizResults?.timeSpent || 0}m</span>
                  <span className="stat-label">Time</span>
                </div>
              </div>

              <div className="performance-message">
                {quizResults?.score >= 80 && <p className="success">Excellent work! You're ready for the exam.</p>}
                {quizResults?.score >= 70 && quizResults?.score < 80 && (
                  <p className="warning">Good job! A bit more study and you'll be ready.</p>
                )}
                {quizResults?.score < 70 && <p className="danger">Keep studying! Focus on your weak areas.</p>}
              </div>

              <div className="results-actions">
                <button onClick={backToQuestions} className="btn btn-outline">
                  Back to Question Sets
                </button>
                <button onClick={() => startQuestionSet(selectedSet, quizMode)} className="btn btn-primary">
                  Retake Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="questions">
      <div className="container">
        <div className="questions-header">
          <h1>Question Sets</h1>
          <p>11 comprehensive question sets with 1100+ practice questions</p>
        </div>

        <div className="questions-grid">
          {questionSets.map((questionSet) => (
            <div key={questionSet.id} className="question-set-card">
              <div className="card-header">
                <h3>{questionSet.title}</h3>
                <div className="card-badges">
                  <span
                    className="difficulty-badge"
                    style={{ backgroundColor: getDifficultyColor(questionSet.difficulty) }}
                  >
                    {questionSet.difficulty}
                  </span>
                  <span className="question-count">{questionSet.questions} questions</span>
                  {questionSet.timeLimit && <span className="time-limit">{questionSet.timeLimit}min</span>}
                </div>
              </div>

              <div className="card-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: questionSet.completed ? "100%" : "0%" }}></div>
                </div>
                <span className="progress-text">{questionSet.completed ? "Completed" : "Not Started"}</span>
              </div>

              <div className="card-actions">
                <button
                  onClick={() => startQuestionSet(questionSet, "practice")}
                  className="btn btn-outline practice-btn"
                >
                  Practice Mode
                </button>
                <button onClick={() => startQuestionSet(questionSet, "exam")} className="btn btn-primary exam-btn">
                  Exam Mode
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Questions
