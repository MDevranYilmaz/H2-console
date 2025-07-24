export interface UserResponse {
  id: string
  firstName: string
  lastName: string
  email: string
  username: string
  role: "ADMIN" | "HR" | "WORKER"
  condition: "PENDING" | "APPROVED" | "REJECTED"
  details?: string
  submittedBy?: string
}

export interface UserRequest {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
  role: "ADMIN" | "HR" | "WORKER"
  condition: "PENDING" | "APPROVED" | "REJECTED"
  details?: string
  submittedBy?: string
}

export interface LoginRequest {
  username: string
  password: string
}
