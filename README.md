# AWS Prep Platform

A comprehensive AWS Cloud Practitioner exam preparation platform built with React.js frontend and Node.js/Express backend, featuring user authentication via Clerk.

![AWS Prep Platform](https://img.shields.io/badge/AWS-Cloud%20Practitioner-orange)
![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-16+-green)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Development](#-development)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Security](#-security)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Features

### Core Features

- ✅ **Interactive Learning Modules**: 10 structured modules covering all AWS Cloud Practitioner exam domains
- ✅ **Practice Question Sets**: 11 comprehensive question sets with 1100+ practice questions
- ✅ **Exam Simulation**: Real exam experience with detailed performance analytics
- ✅ **Progress Tracking**: Track your learning progress and performance over time
- ✅ **User Authentication**: Secure authentication powered by Clerk
- ✅ **Responsive Design**: Mobile-friendly interface that works on all devices
- ✅ **Cheat Sheet**: Quick reference guide for key AWS concepts
- ✅ **Performance Analytics**: Detailed insights into your strengths and weaknesses
- ✅ **Bookmarking**: Save questions for later review
- ✅ **Dark Mode**: Eye-friendly interface option

### Technical Features

- 🔒 Secure JWT-based authentication
- 📊 Real-time progress tracking
- 💾 Persistent user data storage
- 🚀 Fast and responsive UI
- 🎨 Modern, intuitive design
- 📱 Mobile-responsive layout
- ⚡ Optimized performance

---

## 🏗️ Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────┐
│                     Client Browser                      │
│                                                         │
│  ┌────────────────────────────────────────────────┐   │
│  │         React.js Frontend (Port 3000)          │   │
│  │  - Components, Pages, Routing                  │   │
│  │  - Clerk Authentication                        │   │
│  │  - State Management                            │   │
│  └────────────────┬───────────────────────────────┘   │
└───────────────────┼─────────────────────────────────────┘
                    │ HTTP/HTTPS
                    │ (Axios)
┌───────────────────▼─────────────────────────────────────┐
│           Node.js/Express Backend (Port 5000)           │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Routes (modules, questions, progress, auth)     │  │
│  └──────────────────┬───────────────────────────────┘  │
│  ┌──────────────────▼───────────────────────────────┐  │
│  │  Middleware (Auth, CORS, Security, Rate Limit)   │  │
│  └──────────────────┬───────────────────────────────┘  │
│  ┌──────────────────▼───────────────────────────────┐  │
│  │  Data Layer (JSON Files / Database)              │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                    │
                    │ Authentication
                    ▼
┌─────────────────────────────────────────────────────────┐
│              Clerk Authentication Service               │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack

#### Frontend
```javascript
{
  "framework": "React 18",
  "routing": "React Router v6",
  "http": "Axios",
  "auth": "Clerk React SDK",
  "styling": "CSS3 with custom variables",
  "state": "React Hooks (useState, useEffect, useContext)"
}
```

#### Backend
```javascript
{
  "runtime": "Node.js 16+",
  "framework": "Express.js",
  "auth": "Clerk Node.js SDK",
  "security": "Helmet, CORS, Rate Limiting",
  "validation": "Express Validator",
  "storage": "JSON Files (upgradable to MongoDB/PostgreSQL)"
}
```

---

## 📋 Prerequisites

Before you begin, ensure you have:

### Required Software

- ✅ **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- ✅ **npm** (v7+) or **yarn** (v1.22+)
- ✅ **Git** - [Download](https://git-scm.com/)
- ✅ **Code Editor** - VS Code recommended

### Required Accounts

- ✅ **Clerk Account** - [Sign up](https://clerk.com/) (Free tier available)
- ✅ **GitHub Account** (for version control)

### System Requirements

```
Minimum:
- RAM: 4GB
- Storage: 500MB free space
- OS: Windows 10+, macOS 10.15+, Linux

Recommended:
- RAM: 8GB+
- Storage: 1GB free space
- OS: Latest version
```

---

## 🛠️ Installation & Setup

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/aws-prep-platform.git

# Navigate to project directory
cd aws-prep-platform

# Check project structure
ls -la
```

### Step 2: Setup Clerk Authentication

1. **Create Clerk Application**
   - Go to [Clerk Dashboard](https://dashboard.clerk.com/)
   - Click "Create Application"
   - Name: "AWS Prep Platform"
   - Choose sign-in methods: Email, Google (optional)

2. **Get API Keys**
   - Navigate to "API Keys" section
   - Copy **Publishable Key** (starts with `pk_`)
   - Copy **Secret Key** (starts with `sk_`)

3. **Configure Clerk Settings**
   ```
   Dashboard → User & Authentication
   - Enable email verification
   - Set session duration (7 days recommended)
   - Configure password requirements
   ```

### Step 3: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# List of packages installed:
# - express: Web framework
# - @clerk/clerk-sdk-node: Authentication
# - cors: Cross-origin requests
# - helmet: Security headers
# - express-rate-limit: Rate limiting
# - dotenv: Environment variables
```

**Create environment file:**

```bash
# Copy example file
cp .env.example .env

# Edit with your favorite editor
nano .env
# or
code .env
```

**Configure `.env` file:**

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend Configuration
FRONTEND_URL=http://localhost:3000

# Clerk Authentication Keys
CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxx

# Security
JWT_SECRET=your-super-secret-jwt-key-here
SESSION_DURATION=7d

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100

# Database (Optional - for future use)
DATABASE_URL=postgresql://localhost/aws_prep
```

**Start the backend:**

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start

# Expected output:
# 🚀 Server running on port 5000
# 🔐 Clerk authentication configured
# ✅ Backend ready to accept requests
```

Verify backend is running:
```bash
# Test health endpoint
curl http://localhost:5000/health

# Expected response:
# {"status":"ok","timestamp":"2025-10-14T..."}
```

### Step 4: Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd ../frontend

# Install dependencies
npm install

# Packages installed include:
# - react, react-dom: UI library
# - react-router-dom: Routing
# - @clerk/clerk-react: Authentication
# - axios: HTTP client
```

**Create environment file:**

```bash
# Copy example
cp .env.example .env

# Edit file
nano .env
```

**Configure `.env` file:**

```env
# Clerk Authentication
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxx

# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# Application Configuration
REACT_APP_NAME=AWS Prep Platform
REACT_APP_ENV=development

# Feature Flags
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_DARK_MODE=true
```

**Start the frontend:**

```bash
npm start

# Application opens at http://localhost:3000
# Expected in terminal:
# Compiled successfully!
# webpack compiled with 0 warnings
```

### Step 5: Add Question Data

**Create data directories:**

```bash
cd backend
mkdir -p data/modules
mkdir -p data/questions
```

**Module file structure** (`data/modules/module-1.json`):

```json
{
  "id": 1,
  "title": "Module 1: Cloud Concepts Overview",
  "description": "Introduction to cloud computing and AWS fundamentals",
  "domain": "Cloud Concepts",
  "weight": "26%",
  "questions": [
    {
      "question_id": 1,
      "question_text": "What is cloud computing?",
      "question_type": "single",
      "difficulty": "easy",
      "options": [
        {
          "option_id": 1,
          "option_text": "Storing data on local servers"
        },
        {
          "option_id": 2,
          "option_text": "On-demand delivery of IT resources"
        },
        {
          "option_id": 3,
          "option_text": "Physical data center management"
        },
        {
          "option_id": 4,
          "option_text": "Software installation on premise"
        }
      ],
      "correct_answer_id": 2,
      "explanation": "Cloud computing is the on-demand delivery of IT resources over the Internet with pay-as-you-go pricing.",
      "references": [
        "AWS Cloud Practitioner Essentials",
        "https://aws.amazon.com/what-is-cloud-computing/"
      ],
      "tags": ["cloud-concepts", "fundamentals"]
    }
  ],
  "total_questions": 100,
  "estimated_time": "120 minutes"
}
```

**Question set structure** (`data/questions/question-set-1.json`):

```json
{
  "id": 1,
  "title": "Practice Set 1: Cloud Concepts",
  "description": "Test your knowledge of fundamental cloud concepts",
  "difficulty": "beginner",
  "time_limit": 30,
  "passing_score": 70,
  "questions": [
    {
      "question_id": 1,
      "question_text": "Which AWS service is used for object storage?",
      "question_type": "single",
      "difficulty": "easy",
      "options": [
        {"option_id": 1, "option_text": "Amazon EBS"},
        {"option_id": 2, "option_text": "Amazon S3"},
        {"option_id": 3, "option_text": "Amazon RDS"},
        {"option_id": 4, "option_text": "Amazon EC2"}
      ],
      "correct_answer_id": 2,
      "explanation": "Amazon S3 (Simple Storage Service) is designed for object storage with high durability and availability.",
      "domain": "Storage",
      "tags": ["s3", "storage", "core-services"]
    }
  ]
}
```

---

## 📁 Project Structure

```
aws-prep-platform/
│
├── frontend/                          # React.js Application
│   ├── public/
│   │   ├── index.html                 # HTML template
│   │   ├── favicon.ico                # App icon
│   │   ├── manifest.json              # PWA manifest
│   │   └── robots.txt                 # SEO configuration
│   │
│   ├── src/
│   │   ├── components/                # Reusable components
│   │   │   ├── Header.js              # Navigation header
│   │   │   ├── Footer.js              # Page footer
│   │   │   ├── LoadingSpinner.js      # Loading indicator
│   │   │   ├── ProtectedRoute.js      # Auth guard
│   │   │   ├── QuestionCard.js        # Question display
│   │   │   ├── ProgressBar.js         # Progress indicator
│   │   │   └── Modal.js               # Modal dialogs
│   │   │
│   │   ├── contexts/                  # React Context
│   │   │   ├── AuthContext.js         # Authentication state
│   │   │   └── ThemeContext.js        # Theme management
│   │   │
│   │   ├── pages/                     # Page components
│   │   │   ├── Home.js                # Landing page
│   │   │   ├── Dashboard.js           # User dashboard
│   │   │   ├── Modules.js             # Module list
│   │   │   ├── ModuleDetail.js        # Module questions
│   │   │   ├── Questions.js           # Question sets
│   │   │   ├── QuestionDetail.js      # Quiz interface
│   │   │   ├── ExamSimulator.js       # Full exam mode
│   │   │   ├── Results.js             # Quiz results
│   │   │   ├── Progress.js            # Progress tracking
│   │   │   ├── CheatSheet.js          # Quick reference
│   │   │   ├── Profile.js             # User profile
│   │   │   └── About.js               # About page
│   │   │
│   │   ├── utils/                     # Utility functions
│   │   │   ├── api.js                 # API client
│   │   │   ├── auth.js                # Auth helpers
│   │   │   ├── storage.js             # LocalStorage wrapper
│   │   │   └── analytics.js           # Analytics helpers
│   │   │
│   │   ├── hooks/                     # Custom hooks
│   │   │   ├── useAuth.js             # Authentication hook
│   │   │   ├── useProgress.js         # Progress tracking
│   │   │   └── useQuiz.js             # Quiz logic
│   │   │
│   │   ├── styles/                    # CSS files
│   │   │   ├── App.css                # Global styles
│   │   │   ├── variables.css          # CSS variables
│   │   │   └── components/            # Component styles
│   │   │
│   │   ├── App.js                     # Root component
│   │   ├── index.js                   # Entry point
│   │   └── setupTests.js              # Test configuration
│   │
│   ├── package.json                   # Dependencies
│   ├── .env.example                   # Environment template
│   └── README.md                      # Frontend docs
│
├── backend/                           # Node.js/Express API
│   ├── config/
│   │   ├── clerk.js                   # Clerk configuration
│   │   └── database.js                # DB configuration
│   │
│   ├── data/                          # Data storage
│   │   ├── modules/                   # Module JSON files
│   │   │   ├── module-1.json
│   │   │   └── ...
│   │   └── questions/                 # Question JSON files
│   │       ├── question-set-1.json
│   │       └── ...
│   │
│   ├── middleware/                    # Express middleware
│   │   ├── auth.js                    # Authentication
│   │   ├── errorHandler.js            # Error handling
│   │   ├── rateLimiter.js             # Rate limiting
│   │   └── validator.js               # Input validation
│   │
│   ├── routes/                        # API routes
│   │   ├── auth.js                    # Auth endpoints
│   │   ├── modules.js                 # Module endpoints
│   │   ├── questions.js               # Question endpoints
│   │   ├── progress.js                # Progress endpoints
│   │   └── index.js                   # Route aggregator
│   │
│   ├── services/                      # Business logic
│   │   ├── questionService.js         # Question logic
│   │   ├── progressService.js         # Progress logic
│   │   └── analyticsService.js        # Analytics
│   │
│   ├── utils/                         # Utility functions
│   │   ├── logger.js                  # Logging
│   │   └── helpers.js                 # Helper functions
│   │
│   ├── server.js                      # Express server
│   ├── package.json                   # Dependencies
│   ├── .env.example                   # Environment template
│   └── README.md                      # Backend docs
│
├── docs/                              # Documentation
│   ├── API.md                         # API documentation
│   ├── SETUP.md                       # Setup guide
│   └── DEPLOYMENT.md                  # Deployment guide
│
├── .gitignore                         # Git ignore rules
├── LICENSE                            # MIT License
└── README.md                          # This file
```

---

## ⚙️ Configuration

### Environment Variables

#### Frontend (.env)

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `REACT_APP_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | Yes | `pk_test_...` |
| `REACT_APP_API_URL` | Backend API URL | Yes | `http://localhost:5000/api` |
| `REACT_APP_NAME` | Application name | No | `AWS Prep Platform` |
| `REACT_APP_ENV` | Environment | No | `development` |

#### Backend (.env)

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | `5000` |
| `NODE_ENV` | Environment mode | No | `development` |
| `FRONTEND_URL` | Frontend URL for CORS | Yes | `http://localhost:3000` |
| `CLERK_PUBLISHABLE_KEY` | Clerk publishable key | Yes | - |
| `CLERK_SECRET_KEY` | Clerk secret key | Yes | - |
| `JWT_SECRET` | JWT signing secret | No | (auto-generated) |

---

## 🔧 Development

### Running in Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev

# Runs with nodemon for auto-reload
# Watches for file changes
# Logs requests to console
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start

# Opens browser automatically
# Hot Module Replacement (HMR) enabled
# Shows compilation errors in browser
```

### Development Scripts

**Backend:**
```bash
npm run dev         # Start with nodemon
npm start           # Start normally
npm test            # Run tests
npm run lint        # Check code style
```

**Frontend:**
```bash
npm start           # Start development server
npm run build       # Create production build
npm test            # Run tests
npm run eject       # Eject from Create React App
```

### Code Quality

```bash
# Install ESLint and Prettier
npm install --save-dev eslint prettier

# Run linter
npm run lint

# Format code
npm run format
```

---

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Prepare for deployment:**
```bash
cd frontend
npm run build

# Test production build locally
npx serve -s build
```

2. **Deploy to Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

3. **Configure environment variables in Vercel:**
```
Dashboard → Project → Settings → Environment Variables

Add:
- REACT_APP_CLERK_PUBLISHABLE_KEY
- REACT_APP_API_URL (your backend URL)
```

### Backend Deployment (Railway/Render)

1. **Prepare backend:**
```bash
cd backend

# Ensure production dependencies
npm install --production
```

2. **Deploy to Railway:**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize
railway init

# Deploy
railway up
```

3. **Set environment variables:**
```
Railway Dashboard → Your Project → Variables

Add all variables from .env file
```

### Docker Deployment

**Dockerfile (Backend):**
```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
```

**Dockerfile (Frontend):**
```dockerfile
FROM node:16-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    environment:
      - REACT_APP_API_URL=http://backend:5000/api
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
      - NODE_ENV=production
    env_file:
      - backend/.env
```

---

## 📚 API Documentation

### Base URL

```
Development: http://localhost:5000/api
Production: https://your-backend-url.com/api
```

### Authentication

All protected endpoints require authentication header:

```http
Authorization: Bearer <clerk-session-token>
```

### Endpoints

#### Authentication

**Get Current User**
```http
GET /api/auth/me
```

Response:
```json
{
  "user": {
    "id": "user_abc123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

#### Modules

**Get All Modules**
```http
GET /api/modules
```

Response:
```json
{
  "modules": [
    {
      "id": 1,
      "title": "Cloud Concepts Overview",
      "total_questions": 100,
      "completed": 45
    }
  ]
}
```

**Get Module Details**
```http
GET /api/modules/:id
```

Response:
```json
{
  "module": {
    "id": 1,
    "title": "Cloud Concepts",
    "questions": [...]
  }
}
```

#### Questions

**Get Question Sets**
```http
GET /api/questions
```

**Submit Quiz Answers**
```http
POST /api/questions/:id/submit

Body:
{
  "answers": [
    {
      "question_id": 1,
      "selected_option_id": 2
    }
  ],
  "time_taken": 1800
}
```

Response:
```json
{
  "score": 85,
  "correct": 17,
  "total": 20,
  "passed": true,
  "details": [...]
}
```

#### Progress

**Get User Progress**
```http
GET /api/progress
```

Response:
```json
{
  "overall_progress": 65,
  "modules_completed": 7,
  "questions_attempted": 850,
  "average_score": 78
}
```

---

## 🔒 Security

### Implemented Security Features

1. **Authentication**: Clerk JWT verification
2. **CORS**: Configured for specific origins
3. **Helmet**: Security headers
4. **Rate Limiting**: 100 requests per 15 minutes
5. **Input Validation**: Express validator
6. **SQL Injection Prevention**: Parameterized queries
7. **XSS Protection**: Sanitized inputs

### Security Best Practices

```javascript
// Rate limiting configuration
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## 🐛 Troubleshooting

### Common Issues

**1. Backend won't start**
```bash
# Check if port 5000 is in use
lsof -i :5000

# Kill process if needed
kill -9 <PID>

# Or use different port
PORT=5001 npm start
```

**2. Frontend can't connect to backend**
```bash
# Verify backend is running
curl http://localhost:5000/health

# Check REACT_APP_API_URL in frontend/.env
echo $REACT_APP_API_URL

# Restart frontend
npm start
```

**3. Authentication errors**
```bash
# Verify Clerk keys
# Frontend: REACT_APP_CLERK_PUBLISHABLE_KEY
# Backend: CLERK_SECRET_KEY

# Check Clerk dashboard for key validity
```

**4. Questions not loading**
```bash
# Verify JSON files exist
ls backend/data/modules/
ls backend/data/questions/

# Check JSON syntax
cat backend/data/modules/module-1.json | jq
```

**5. CORS errors**
```bash
# Ensure FRONTEND_URL matches in backend/.env
FRONTEND_URL=http://localhost:3000

# Check browser console for specific CORS error
```

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit with clear messages**
   ```bash
   git commit -m "feat: Add amazing feature"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Code Style

- Follow existing code style
- Use ESLint and Prettier
- Write clear comments
- Add tests for new features

### Commit Convention

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Code style changes
refactor: Code refactoring
test: Add tests
chore: Maintenance tasks
```

---

## 📄 License

This project is licensed under the MIT License.

```
MIT License

Copyright (c) 2025 Somashekhar Arabali

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👨‍💻 Author

**Somashekhar Arabali**

- GitHub: [@somashekhar](https://github.com/somashekhar)
- LinkedIn: [Somashekhar Arabali](https://linkedin.com/in/somashekhar)
- Email: somashekhar@example.com

---

## 🙏 Acknowledgments

- AWS for comprehensive cloud documentation
- Clerk for seamless authentication
- React and Node.js communities
- All contributors and testers

---

## 📞 Support

- 📧 Email: support@awsprep.com
- 💬 Discord: [Join our community](https://discord.gg/awsprep)
- 📖 Documentation: [docs.awsprep.com](https://docs.awsprep.com)
- 🐛 Issues: [GitHub Issues](https://github.com/username/aws-prep-platform/issues)

---

**Happy Learning! 🚀 Master your AWS Cloud Practitioner certification with confidence!**
