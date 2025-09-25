import axios from "axios"

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    // Get the auth token from Clerk
    if (window.Clerk && window.Clerk.session) {
      try {
        const token = await window.Clerk.session.getToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      } catch (error) {
        console.error("Error getting auth token:", error)
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error("Unauthorized access - redirecting to sign in")
      // Clerk will handle the redirect
    }
    return Promise.reject(error)
  },
)

// API methods
export const apiClient = {
  // Auth endpoints
  auth: {
    getProfile: () => api.get("/auth/me"),
    updateProgress: (data) => api.post("/auth/progress", data),
  },

  // Module endpoints
  modules: {
    getAll: () => api.get("/modules"),
    getById: (id) => api.get(`/modules/${id}`),
  },

  // Question endpoints
  questions: {
    getAll: () => api.get("/questions"),
    getById: (id) => api.get(`/questions/${id}`),
    submitQuiz: (id, data) => api.post(`/questions/${id}/submit`, data),
  },

  // Progress endpoints
  progress: {
    getOverview: () => api.get("/progress"),
    getModuleProgress: (id) => api.get(`/progress/module/${id}`),
    getQuestionSetProgress: (id) => api.get(`/progress/questions/${id}`),
  },
}

export default api
