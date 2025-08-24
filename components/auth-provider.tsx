"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  authenticate: (pin: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user was previously authenticated
    const authStatus = localStorage.getItem("portfolio-auth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const authenticate = (pin: string): boolean => {
    if (pin === "013611") {
      setIsAuthenticated(true)
      localStorage.setItem("portfolio-auth", "true")
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("portfolio-auth")
  }

  return <AuthContext.Provider value={{ isAuthenticated, authenticate, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
