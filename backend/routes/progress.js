const express = require("express")
const { requireAuth } = require("../middleware/auth")
const router = express.Router()

// Get user progress overview
router.get("/", requireAuth, async (req, res) => {
  try {
    const userId = req.auth.userId

    // In a real app, you'd fetch this from your database
    const progressData = {
      userId,
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
          date: new Date(Date.now() - 86400000).toISOString().split("T")[0], // 1 day ago
        },
        {
          id: 2,
          type: "quiz",
          title: "Practice Set 3: Security & Compliance",
          score: 72,
          date: new Date(Date.now() - 172800000).toISOString().split("T")[0], // 2 days ago
        },
        {
          id: 3,
          type: "module",
          title: "Module 5: Architecture and Design",
          score: 88,
          date: new Date(Date.now() - 259200000).toISOString().split("T")[0], // 3 days ago
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
    }

    res.json(progressData)
  } catch (error) {
    console.error("Error fetching progress:", error)
    res.status(500).json({ error: "Failed to fetch progress data" })
  }
})

// Get progress overview for dashboard
router.get("/overview", requireAuth, async (req, res) => {
  try {
    const userId = req.auth.userId

    // Enhanced overview data for dashboard
    const overviewData = {
      userId,
      overallProgress: 65,
      modulesCompleted: 6,
      totalModules: 10,
      questionsAnswered: 450,
      totalQuestions: 1100,
      averageScore: 78,
      studyStreak: 7, // days
      totalStudyTime: 1250, // minutes
      examReadiness: 78, // percentage
      recentActivity: [
        {
          id: 1,
          type: "module",
          title: "Module 6: Deployment and Operations",
          score: 85,
          date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
        },
        {
          id: 2,
          type: "quiz",
          title: "Practice Set 3: Security & Compliance",
          score: 72,
          date: new Date(Date.now() - 172800000).toISOString().split("T")[0],
        },
        {
          id: 3,
          type: "module",
          title: "Module 5: Architecture and Design",
          score: 88,
          date: new Date(Date.now() - 259200000).toISOString().split("T")[0],
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
    }

    res.json(overviewData)
  } catch (error) {
    console.error("Error fetching overview:", error)
    res.status(500).json({ error: "Failed to fetch overview data" })
  }
})

// Update progress after completing module or quiz
router.post("/update", requireAuth, async (req, res) => {
  try {
    const userId = req.auth.userId
    const { type, id, score, timeSpent, answers } = req.body

    // In a real app, you'd save this to your database
    const progressUpdate = {
      userId,
      type, // 'module' or 'quiz'
      id,
      score,
      timeSpent,
      completedAt: new Date().toISOString(),
      answers: answers || null,
    }

    console.log("Progress updated:", progressUpdate)

    res.json({
      success: true,
      message: "Progress updated successfully",
      data: progressUpdate,
    })
  } catch (error) {
    console.error("Error updating progress:", error)
    res.status(500).json({ error: "Failed to update progress" })
  }
})

// Get progress for specific module
router.get("/module/:id", requireAuth, async (req, res) => {
  try {
    const moduleId = Number.parseInt(req.params.id)
    const userId = req.auth.userId

    // Mock module progress data
    const moduleProgress = {
      moduleId,
      userId,
      completed: false,
      score: null,
      timeSpent: 0,
      questionsAnswered: 0,
      totalQuestions: 15,
      attempts: 0,
      lastAttempt: null,
    }

    res.json(moduleProgress)
  } catch (error) {
    console.error("Error fetching module progress:", error)
    res.status(500).json({ error: "Failed to fetch module progress" })
  }
})

// Get progress for specific question set
router.get("/questions/:id", requireAuth, async (req, res) => {
  try {
    const questionSetId = Number.parseInt(req.params.id)
    const userId = req.auth.userId

    // Mock question set progress data
    const questionSetProgress = {
      questionSetId,
      userId,
      completed: false,
      bestScore: null,
      attempts: 0,
      averageScore: null,
      totalTimeSpent: 0,
      lastAttempt: null,
    }

    res.json(questionSetProgress)
  } catch (error) {
    console.error("Error fetching question set progress:", error)
    res.status(500).json({ error: "Failed to fetch question set progress" })
  }
})

module.exports = router
