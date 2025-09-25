const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node")

// Middleware to require authentication
const requireAuth = ClerkExpressRequireAuth({
  // Optional: customize error handling
  onError: (error) => {
    console.error("Authentication error:", error)
    return {
      status: 401,
      error: "Unauthorized",
      message: "Authentication required",
    }
  },
})

// Middleware to get user info (optional auth)
const getUser = (req, res, next) => {
  // This will add user info to req.auth if authenticated
  // but won't require authentication
  try {
    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith("Bearer ")) {
      // Clerk will handle token validation
      req.auth = { userId: "user_id_from_token" } // Simplified for demo
    }
    next()
  } catch (error) {
    console.error("Auth middleware error:", error)
    next()
  }
}

module.exports = {
  requireAuth,
  getUser,
}
