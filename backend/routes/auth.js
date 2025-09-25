const express = require("express")
const { requireAuth } = require("../middleware/auth")
const router = express.Router()

// Get current user profile
router.get("/me", requireAuth, async (req, res) => {
  try {
    const userId = req.auth.userId

    // In a real app, you'd fetch user data from your database
    // For now, return mock user data
    const userData = {
      id: userId,
      email: "user@example.com",
      firstName: "John",
      lastName: "Doe",
      progress: {
        modulesCompleted: 3,
        questionsAnswered: 245,
        averageScore: 78,
      },
      createdAt: new Date().toISOString(),
    }

    res.json(userData)
  } catch (error) {
    console.error("Error fetching user:", error)
    res.status(500).json({ error: "Failed to fetch user data" })
  }
})

// Update user progress
router.post("/progress", requireAuth, async (req, res) => {
  try {
    const userId = req.auth.userId
    const { moduleId, questionSetId, score, timeSpent } = req.body

    // In a real app, you'd save this to your database
    console.log("Updating progress for user:", userId, {
      moduleId,
      questionSetId,
      score,
      timeSpent,
    })

    res.json({
      success: true,
      message: "Progress updated successfully",
    })
  } catch (error) {
    console.error("Error updating progress:", error)
    res.status(500).json({ error: "Failed to update progress" })
  }
})

module.exports = router
