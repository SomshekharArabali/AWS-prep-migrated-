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
  const { updateProgress } = useAuth()

  useEffect(() => {
    fetchQuestionSets()
  }, [])

  const fetchQuestionSets = async () => {
    try {
      const response = await apiClient.questions.getAll()
      setQuestionSets(response.data)
    } catch (error) {
      console.error("Error fetching question sets:", error)
      // Fallback data
      setQuestionSets([
        { id: 1, title: "Practice Set 1: Cloud Concepts", questions: 65, difficulty: "Beginner", completed: false },
        {
          id: 2,
          title: "Practice Set 2: AWS Core Services",
          questions: 85,
          difficulty: "Intermediate",
          completed: false,
        },
        { id: 11, title: "Full Practice Exam", questions: 65, difficulty: "Exam", completed: false },
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
      setStartTime(Date.now())
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
        },
      ])
      setSelectedSet(questionSet)
      setQuizMode(mode)
      setCurrentQuestion(0)
      setUserAnswers({})
      setShowResults(false)
      setStartTime(Date.now())
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = (questionId, answerId) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }))
  }

  const nextQuestion = async () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      const timeSpent = Math.round((Date.now() - startTime) / 1000 / 60) // minutes

      try {
        const response = await apiClient.questions.submitQuiz(selectedSet.id, {
          answers: userAnswers,
          timeSpent,
          mode: quizMode,
        })

        console.log("Quiz results:", response.data.results)
        setShowResults(true)
      } catch (error) {
        console.error("Error submitting quiz:", error)
        setShowResults(true)
      }
    }
  }

  const backToQuestions = () => {
    setSelectedSet(null)
    setShowResults(false)
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

  if (loading) {
    return <LoadingSpinner message="Loading question sets..." />
  }

  if (selectedSet) {
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
              <h3>{quizQuestions[currentQuestion].question_text}</h3>
              <p>
                This is where your JSON question data will be displayed. The actual question text from your JSON files
                will appear here, along with the multiple choice options and explanations.
              </p>

              <div className="question-options">
                {quizQuestions[currentQuestion].options.map((option) => (
                  <div key={option.option_id} className="option">
                    <input
                      type="radio"
                      id={`option${option.option_id}`}
                      name="answer"
                      checked={userAnswers[quizQuestions[currentQuestion].question_id] === option.option_id}
                      onChange={() => handleAnswer(quizQuestions[currentQuestion].question_id, option.option_id)}
                    />
                    <label
                      htmlFor={`option${option.option_id}`}
                    >{`${String.fromCharCode(65 + option.option_id - 1)}) ${option.option_text}`}</label>
                  </div>
                ))}
              </div>

              {quizMode === "practice" && (
                <div className="explanation">
                  <h4>Explanation:</h4>
                  <p>In practice mode, explanations will be shown here after answering each question.</p>
                </div>
              )}

              <button onClick={nextQuestion} className="btn btn-primary next-btn">
                {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
              </button>
            </div>
          ) : (
            <div className="results-card">
              <h2>Quiz Complete!</h2>
              <p>You have completed {selectedSet.title}</p>
              <div className="results-stats">
                <div className="stat">
                  <span className="stat-number">78%</span>
                  <span className="stat-label">Score</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{quizQuestions.length}</span>
                  <span className="stat-label">Questions</span>
                </div>
                <div className="stat">
                  <span className="stat-number">51</span>
                  <span className="stat-label">Correct</span>
                </div>
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
