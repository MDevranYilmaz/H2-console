"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { userService } from "@/services/user-service"

type UUID = string;

interface User {
  id: UUID
  firstName: string
  lastName: string
  email: string
  username: string
  role: "ADMIN" | "HR" | "WORKER"
  condition: "PENDING" | "APPROVED" | "REJECTED"
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }
    }
    setLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const response = await userService.login(username, password)

      if (response.token) {
        localStorage.setItem("token", response.token)

        // Decode JWT to get user info (simplified - in production use proper JWT library)
        const payload = JSON.parse(atob(response.token.split(".")[1]))
        const userData: User = {
          id: payload.sub,
          firstName: payload.firstName || "User",
          lastName: payload.lastName || "",
          email: payload.email || "",
          username: payload.username,
          role: payload.role || "WORKER",
          condition: payload.condition || "PENDING",
        }

        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)

        return { success: true, user: userData }
      }

      return { success: false, error: "Invalid credentials" }
    } catch (error) {
      return { success: false, error: "Login failed" }
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    window.location.href = "/login"
  }

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
