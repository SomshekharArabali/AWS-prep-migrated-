const express = require("express")
const fs = require("fs").promises
const path = require("path")
const { requireAuth } = require("../middleware/auth")
const router = express.Router()

// Get all question sets
router.get("/", requireAuth, async (req, res) => {
  try {
    const questionSets = []

    // Try to load question sets from individual files (question-set-1.json to question-set-11.json)
    for (let i = 1; i <= 11; i++) {
      try {
        const jsonPath = path.join(__dirname, "../data/questions", `question-set-${i}.json`)
        const jsonData = await fs.readFile(jsonPath, "utf8")
        const questionSetData = JSON.parse(jsonData)

        questionSets.push({
          id: i,
          title: questionSetData.title || `Practice Set ${i}`,
          description: questionSetData.description || `AWS Cloud Practitioner practice questions - Set ${i}`,
          questions: questionSetData.questions ? questionSetData.questions.length : 65,
          difficulty: i <= 3 ? "Beginner" : i <= 8 ? "Intermediate" : "Advanced",
          completed: false,
          averageScore: null,
          timeLimit: 90 + i * 5, // Varying time limits
        })
      } catch (fileError) {
        // If individual file doesn't exist, add placeholder
        questionSets.push({
          id: i,
          title: `Practice Set ${i}: AWS Cloud Practitioner`,
          description: `Practice questions for AWS certification - Set ${i}`,
          questions: 65,
          difficulty: i <= 3 ? "Beginner" : i <= 8 ? "Intermediate" : "Advanced",
          completed: false,
          averageScore: null,
          timeLimit: 90,
        })
      }
    }

    res.json(questionSets)
  } catch (error) {
    console.error("Error fetching question sets:", error)
    res.status(500).json({ error: "Failed to fetch question sets" })
  }
})

// Get specific question set
router.get("/:id", requireAuth, async (req, res) => {
  try {
    const setId = Number.parseInt(req.params.id)

    // Try to load questions from JSON file
    try {
      const jsonPath = path.join(__dirname, "../data/questions", `question-set-${setId}.json`)
      const jsonData = await fs.readFile(jsonPath, "utf8")
      const questionSetData = JSON.parse(jsonData)

      // Transform data to match expected format
      const transformedData = {
        id: setId,
        title: questionSetData.title || `Practice Set ${setId}`,
        questions: questionSetData.questions.map((q) => ({
          question_id: q.question_id,
          question_text: q.question_text,
          options: q.options,
          correct_answer_id: Array.isArray(q.correct_answer_id) ? q.correct_answer_id : [q.correct_answer_id],
          explanation: q.explanation || "Explanation will be provided after completion.",
        })),
      }

      res.json(transformedData)
    } catch (fileError) {
      console.log(`Question set ${setId} JSON file not found, returning sample data`)

      const sampleQuestionSet = {
        id: setId,
        title: `Practice Set ${setId}: Sample Questions`,
        questions: [
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
          {
            question_id: 2,
            question_text:
              "If an organisation needs to host their IT system on dedicated resources due to compliance reasons. Which cloud computing deployment model should be used?",
            options: [
              { option_id: 1, option_text: "Cloud" },
              { option_id: 2, option_text: "On-premises" },
              { option_id: 3, option_text: "Legacy cloud" },
              { option_id: 4, option_text: "Hybrid" },
            ],
            correct_answer_id: 2,
            explanation:
              "On-premises deployment provides dedicated resources and full control, which is often required for strict compliance requirements.",
          },
        ],
      }

      res.json(sampleQuestionSet)
    }
  } catch (error) {
    console.error("Error fetching question set:", error)
    res.status(500).json({ error: "Failed to fetch question set data" })
  }
})

// Submit quiz answers
router.post("/:id/submit", requireAuth, async (req, res) => {
  try {
    const setId = Number.parseInt(req.params.id)
    const { answers, timeSpent } = req.body
    const userId = req.auth.userId

    // In a real app, you'd:
    // 1. Load the correct answers from your data
    // 2. Calculate the score
    // 3. Save the results to database
    // 4. Update user progress

    // For now, return mock results
    const totalQuestions = Object.keys(answers).length
    const correctAnswers = Math.floor(totalQuestions * 0.75) // Mock 75% score
    const score = Math.round((correctAnswers / totalQuestions) * 100)

    const results = {
      questionSetId: setId,
      userId,
      totalQuestions,
      correctAnswers,
      score,
      timeSpent,
      submittedAt: new Date().toISOString(),
    }

    console.log("Quiz submitted:", results)

    res.json({
      success: true,
      results,
    })
  } catch (error) {
    console.error("Error submitting quiz:", error)
    res.status(500).json({ error: "Failed to submit quiz" })
  }
})

module.exports = router
