import type { UserResponse, UserRequest } from "@/types/user"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
type UUID = string

class UserService {
  private getAuthHeaders() {
    const token = localStorage.getItem("token")
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  async login(username: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      throw new Error("Login failed")
    }

    return response.json()
  }

  async getAllUsers(): Promise<UserResponse[]> {
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch users")
    }

    return response.json()
  }

  async getWorkersByHR(hrId: UUID): Promise<UserResponse[]> {
    const response = await fetch(`${API_BASE_URL}/users/hr/${hrId}`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch workers")
    }

    return response.json()
  }

  async getAllWorkers(): Promise<UserResponse[]> {
    const response = await fetch(`${API_BASE_URL}/users/admin`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch workers")
    }

    return response.json()
  }

  async getWorkersByStatus(status: string): Promise<UserResponse[]> {
    const response = await fetch(`${API_BASE_URL}/users/admin/${status}`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch workers by status")
    }

    return response.json()
  }

  async createUser(userData: UserRequest): Promise<UserResponse> {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      throw new Error("Failed to create user")
    }

    return response.json()
  }

  async updateUser(id: string, userData: Partial<UserRequest>): Promise<UserResponse> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      throw new Error("Failed to update user")
    }

    return response.json()
  }
}

export const userService = new UserService()
