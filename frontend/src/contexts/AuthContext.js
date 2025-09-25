"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useUser } from "@clerk/clerk-react"
import { apiClient } from "../utils/api"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const { user, isLoaded, isSignedIn } = useUser()
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isLoaded && isSignedIn && user) {
        try {
          const response = await apiClient.auth.getProfile()
          setUserProfile(response.data)
        } catch (error) {
          console.error("Error fetching user profile:", error)
        }
      }
      setLoading(false)
    }

    fetchUserProfile()
  }, [isLoaded, isSignedIn, user])

  const updateProgress = async (progressData) => {
    try {
      await apiClient.auth.updateProgress(progressData)
      // Optionally refresh user profile
      const response = await apiClient.auth.getProfile()
      setUserProfile(response.data)
    } catch (error) {
      console.error("Error updating progress:", error)
      throw error
    }
  }

  const value = {
    user,
    userProfile,
    isLoaded,
    isSignedIn,
    loading,
    updateProgress,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
