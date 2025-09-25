# AWS Prep Platform

A comprehensive AWS Cloud Practitioner exam preparation platform built with React.js frontend and Node.js/Express backend, featuring user authentication via Clerk.

## 🚀 Features

- **Interactive Learning Modules**: 10 structured modules covering all AWS Cloud Practitioner exam domains
- **Practice Question Sets**: 11 comprehensive question sets with 1100+ practice questions
- **Exam Simulation**: Real exam experience with detailed performance analytics
- **Progress Tracking**: Track your learning progress and performance over time
- **User Authentication**: Secure authentication powered by Clerk
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Cheat Sheet**: Quick reference guide for key AWS concepts

## 🏗️ Architecture

\`\`\`
aws-prep-platform/
├── frontend/          # React.js application
├── backend/           # Node.js/Express API
└── README.md         # This file
\`\`\`

### Frontend (React.js)
- **Framework**: React 18 with functional components and hooks
- **Routing**: React Router v6 for client-side routing
- **Authentication**: Clerk React SDK for user management
- **HTTP Client**: Axios for API communication
- **Styling**: CSS3 with custom design system

### Backend (Node.js/Express)
- **Framework**: Express.js with middleware for security and CORS
- **Authentication**: Clerk Node.js SDK for token verification
- **Data Storage**: JSON files for questions and modules (easily replaceable with database)
- **Security**: Helmet, rate limiting, and CORS protection

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)
- **Clerk Account** - [Sign up here](https://clerk.com/)

## 🛠️ Installation & Setup

### 1. Clone the Repository

\`\`\`bash
git clone <your-repository-url>
cd aws-prep-platform
\`\`\`

### 2. Setup Clerk Authentication

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Copy your **Publishable Key** and **Secret Key**
4. Configure sign-in methods (Email/Password recommended)

### 3. Backend Setup

\`\`\`bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your Clerk keys
nano .env
\`\`\`

**Configure your `.env` file:**
\`\`\`env
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here
\`\`\`

**Start the backend server:**
\`\`\`bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
\`\`\`

The backend will be available at `http://localhost:5000`

### 4. Frontend Setup

\`\`\`bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file
nano .env
\`\`\`

**Configure your `.env` file:**
\`\`\`env
# Clerk Authentication
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here

# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# Environment
REACT_APP_ENV=development
\`\`\`

**Start the frontend application:**
\`\`\`bash
npm start
\`\`\`

The frontend will be available at `http://localhost:3000`

### 5. Add Your Question Data

Create your JSON question files in the backend data directory:

\`\`\`bash
# Create data directories
mkdir -p backend/data/modules
mkdir -p backend/data/questions
\`\`\`

**Add your JSON files following this structure:**

**Module files** (`backend/data/modules/module-1.json`):
\`\`\`json
{
  "id": 1,
  "title": "Module 1: Cloud Concepts Overview",
  "questions": [
    {
      "question_id": 1,
      "question_text": "AWS Cloud Adoption Framework (CAF) is organized into how many perspectives?",
      "options": [
        {"option_id": 1, "option_text": "ten"},
        {"option_id": 2, "option_text": "eight"},
        {"option_id": 3, "option_text": "four"},
        {"option_id": 4, "option_text": "six"}
      ],
      "correct_answer_id": 4,
      "explanation": "The AWS CAF is organized into six perspectives: Business, People, Governance, Platform, Security, and Operations."
    }
  ]
}
\`\`\`

**Question set files** (`backend/data/questions/question-set-1.json`):
\`\`\`json
{
  "id": 1,
  "title": "Practice Set 1: Cloud Concepts",
  "questions": [
    {
      "question_id": 1,
      "question_text": "Your question here...",
      "options": [
        {"option_id": 1, "option_text": "Option A"},
        {"option_id": 2, "option_text": "Option B"},
        {"option_id": 3, "option_text": "Option C"},
        {"option_id": 4, "option_text": "Option D"}
      ],
      "correct_answer_id": 1,
      "explanation": "Explanation for the correct answer"
    }
  ]
}
\`\`\`

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

1. **Build the frontend:**
   \`\`\`bash
   cd frontend
   npm run build
   \`\`\`

2. **Deploy to Vercel:**
   \`\`\`bash
   npm install -g vercel
   vercel --prod
   \`\`\`

3. **Set environment variables** in your deployment platform:
   - `REACT_APP_CLERK_PUBLISHABLE_KEY`
   - `REACT_APP_API_URL` (your backend URL)

### Backend Deployment (Railway/Heroku/DigitalOcean)

1. **Prepare for deployment:**
   \`\`\`bash
   cd backend
   npm install --production
   \`\`\`

2. **Set environment variables** on your hosting platform:
   - `PORT` (usually set automatically)
   - `NODE_ENV=production`
   - `FRONTEND_URL` (your frontend URL)
   - `CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

3. **Deploy using your preferred platform**

## 📁 Project Structure

\`\`\`
aws-prep-platform/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── LoadingSpinner.js
│   │   │   └── ProtectedRoute.js
│   │   ├── contexts/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Modules.js
│   │   │   ├── Questions.js
│   │   │   ├── CheatSheet.js
│   │   │   └── About.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── .env.example
├── backend/
│   ├── data/
│   │   ├── modules/
│   │   └── questions/
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── modules.js
│   │   ├── questions.js
│   │   └── progress.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── README.md
\`\`\`

## 🔧 Development

### Running in Development Mode

1. **Start the backend:**
   \`\`\`bash
   cd backend
   npm run dev
   \`\`\`

2. **Start the frontend (in a new terminal):**
   \`\`\`bash
   cd frontend
   npm start
   \`\`\`

### Adding New Features

1. **Frontend components** go in `frontend/src/components/`
2. **New pages** go in `frontend/src/pages/`
3. **API routes** go in `backend/routes/`
4. **Middleware** goes in `backend/middleware/`

### Testing

\`\`\`bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
\`\`\`

## 🔒 Security Features

- **Authentication**: Clerk handles secure user authentication
- **API Protection**: All sensitive routes require authentication
- **Rate Limiting**: Prevents API abuse
- **CORS**: Configured for secure cross-origin requests
- **Helmet**: Security headers for Express.js
- **Input Validation**: Server-side validation for all inputs

## 📊 API Endpoints

### Authentication
- `GET /api/auth/me` - Get current user profile
- `POST /api/auth/progress` - Update user progress

### Modules
- `GET /api/modules` - Get all modules
- `GET /api/modules/:id` - Get specific module with questions

### Questions
- `GET /api/questions` - Get all question sets
- `GET /api/questions/:id` - Get specific question set
- `POST /api/questions/:id/submit` - Submit quiz answers

### Progress
- `GET /api/progress` - Get user progress overview
- `GET /api/progress/module/:id` - Get module progress
- `GET /api/progress/questions/:id` - Get question set progress

## 🐛 Troubleshooting

### Common Issues

1. **"Cannot connect to backend"**
   - Ensure backend is running on port 5000
   - Check REACT_APP_API_URL in frontend .env

2. **"Authentication failed"**
   - Verify Clerk keys in both frontend and backend .env files
   - Ensure Clerk app is configured correctly

3. **"Questions not loading"**
   - Check that JSON files exist in backend/data/ directories
   - Verify JSON file format matches the expected structure

4. **"CORS errors"**
   - Ensure FRONTEND_URL is set correctly in backend .env
   - Check that frontend is running on the expected port

### Getting Help

1. Check the browser console for error messages
2. Check backend logs for API errors
3. Verify all environment variables are set correctly
4. Ensure all dependencies are installed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Somashekhar Arabali**

- Platform: AWS Cloud Practitioner Exam Preparation
- Contact: [Your contact information]

## 🙏 Acknowledgments

- AWS for providing comprehensive cloud services documentation
- Clerk for seamless authentication solutions
- React and Node.js communities for excellent frameworks
- All contributors who help improve this platform

---

**Happy Learning! 🚀**

Master your AWS Cloud Practitioner certification with confidence using this comprehensive preparation platform.
