const express = require("express")
const fs = require("fs").promises
const path = require("path")
const { requireAuth } = require("../middleware/auth")
const router = express.Router()

// Get all modules
router.get("/", requireAuth, async (req, res) => {
  try {
    // Try to load modules from the main modules.json file
    try {
      const jsonPath = path.join(__dirname, "../data", "modules.json")
      const jsonData = await fs.readFile(jsonPath, "utf8")
      const moduleData = JSON.parse(jsonData)

      // Transform the quizzes array into module list format
      const modules = moduleData.quizzes.map((quiz) => ({
        id: quiz.quiz_id,
        title: quiz.title,
        description: `Module ${quiz.quiz_id} with ${quiz.questions.length} practice questions`,
        questions: quiz.questions.length,
        completed: false,
        difficulty: quiz.quiz_id <= 3 ? "Beginner" : quiz.quiz_id <= 7 ? "Intermediate" : "Advanced",
        estimatedTime: `${Math.ceil(quiz.questions.length * 1.5)} minutes`,
      }))

      res.json(modules)
    } catch (fileError) {
      console.log("modules.json file not found, returning sample data")
      // Fallback to static module data if file doesn't exist
      const modules = [
        {
          id: 1,
          title: "Module 1: Cloud Concepts Overview",
          description: "Introduction to cloud computing concepts and AWS fundamentals",
          questions: 15,
          completed: false,
          difficulty: "Beginner",
          estimatedTime: "45 minutes",
        },
        {
          id: 2,
          title: "Module 2: AWS Core Services",
          description: "Essential AWS services including EC2, S3, and VPC",
          questions: 20,
          completed: false,
          difficulty: "Intermediate",
          estimatedTime: "60 minutes",
        },
        {
          id: 3,
          title: "Module 3: Security and Compliance",
          description: "AWS security best practices and compliance frameworks",
          questions: 18,
          completed: false,
          difficulty: "Intermediate",
          estimatedTime: "55 minutes",
        },
        {
          id: 4,
          title: "Module 4: Pricing and Support",
          description: "AWS pricing models and support plans",
          questions: 12,
          completed: false,
          difficulty: "Beginner",
          estimatedTime: "35 minutes",
        },
        {
          id: 5,
          title: "Module 5: Architecture and Design",
          description: "Well-architected framework and design principles",
          questions: 16,
          completed: false,
          difficulty: "Advanced",
          estimatedTime: "50 minutes",
        },
      ]

      res.json(modules)
    }
  } catch (error) {
    console.error("Error fetching modules:", error)
    res.status(500).json({ error: "Failed to fetch modules" })
  }
})

// Get specific module with questions
router.get("/:id", requireAuth, async (req, res) => {
  try {
    const moduleId = Number.parseInt(req.params.id)

    // Try to load from the main modules.json file
    try {
      const jsonPath = path.join(__dirname, "../data", "modules.json")
      const jsonData = await fs.readFile(jsonPath, "utf8")
      const moduleData = JSON.parse(jsonData)

      // Find the specific quiz by ID
      const quiz = moduleData.quizzes.find((q) => q.quiz_id === moduleId)

      if (!quiz) {
        return res.status(404).json({ error: "Module not found" })
      }

      // Transform the quiz data to match expected format
      const moduleResponse = {
        id: quiz.quiz_id,
        title: quiz.title,
        questions: quiz.questions.map((q) => ({
          question_id: q.quesiton_id || q.question_id, // Handle typo in JSON
          question_text: q.question_text,
          options: q.options,
          correct_answer_id: q.correct_answer_id,
          explanation: q.explanation || "Explanation will be provided after completion.",
        })),
      }

      res.json(moduleResponse)
    } catch (fileError) {
      console.log(`modules.json file not found, returning sample data for module ${moduleId}`)

      const sampleModule = {
        id: moduleId,
        title: `Module ${moduleId}: Sample Module`,
        questions: [
          {
            question_id: 1,
            question_text: "This is a sample question. Your JSON data will replace this.",
            options: [
              { option_id: 1, option_text: "Sample option A" },
              { option_id: 2, option_text: "Sample option B" },
              { option_id: 3, option_text: "Sample option C" },
              { option_id: 4, option_text: "Sample option D" },
            ],
            correct_answer_id: 1,
            explanation: "This is where the explanation for the correct answer would appear.",
          },
        ],
      }

      res.json(sampleModule)
    }
  } catch (error) {
    console.error("Error fetching module:", error)
    res.status(500).json({ error: "Failed to fetch module data" })
  }
})

module.exports = router
