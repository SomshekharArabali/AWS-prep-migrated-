# Data Directory

This directory should contain your JSON files with quiz questions and modules.

## Expected File Structure:

\`\`\`
data/
├── modules.json (main file with all quizzes)
└── questions/
    ├── question-set-1.json
    ├── question-set-2.json
    ├── question-set-3.json
    └── ... (up to question-set-11.json)
\`\`\`

## JSON File Format:

### Main Modules File (modules.json):
\`\`\`json
{
  "quizzes": [
    {
      "quiz_id": 1,
      "title": "Module 1: Cloud Concepts Overview",
      "questions": [
        {
          "quesiton_id": 1,
          "question_text": "Your question here",
          "options": [
            {"option_id": 1, "option_text": "Option A"},
            {"option_id": 2, "option_text": "Option B"},
            {"option_id": 3, "option_text": "Option C"},
            {"option_id": 4, "option_text": "Option D"}
          ],
          "correct_answer_id": 1
        }
      ]
    }
  ]
}
\`\`\`

### Question Set Files (question-set-X.json):
\`\`\`json
{
  "title": "Practice Set 1: Cloud Concepts",
  "description": "Fundamental cloud computing concepts",
  "questions": [
    {
      "question_id": 1,
      "question_text": "Your question here",
      "options": [
        {"option_id": 1, "option_text": "Option A"},
        {"option_id": 2, "option_text": "Option B"},
        {"option_id": 3, "option_text": "Option C"},
        {"option_id": 4, "option_text": "Option D"}
      ],
      "correct_answer_id": [1, 2],
      "explanation": "Explanation for the correct answer"
    }
  ]
}
\`\`\`

## How to Add Your Data:

### For Modules:
1. Copy your `modules.json` file to this `data/` directory
2. The file should contain all 11 quizzes in the format shown above
3. The API will automatically load this file when modules are requested

### For Question Sets:
1. Create individual files named `question-set-1.json` through `question-set-11.json`
2. Place them in the `questions/` subdirectory
3. Each file should contain questions for that specific practice set

## Notes:
- The API handles both single and multiple correct answers
- If files don't exist, the API returns sample data
- The `quesiton_id` typo in your JSON is handled automatically
- Explanations are optional but recommended for better learning experience
\`\`\`

```js file="" isHidden
