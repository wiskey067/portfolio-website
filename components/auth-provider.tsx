"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  authenticate: (pin: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if user was previously authenticated
    const authStatus = localStorage.getItem("portfolio-auth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const authenticate = async (pin: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/verify-pin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pin }),
      })

      const data = await response.json()

      if (data.success) {
        setIsAuthenticated(true)
        localStorage.setItem("portfolio-auth", "true")
        return { success: true, message: data.message }
      }
      return { success: false, message: data.message }
    } catch (error) {
      return { success: false, message: "Network error. Please try again." }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("portfolio-auth")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, authenticate, logout, isLoading }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
