"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, UserPlus, Search, LogOut, Mail, Calendar, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { userService } from "@/services/user-service"
import type { UserResponse, UserRequest } from "@/types/user"

export default function HRPage() {
  const { user, logout } = useAuth()
  const [workers, setWorkers] = useState<UserResponse[]>([])
  const [filteredWorkers, setFilteredWorkers] = useState<UserResponse[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [loading, setLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newWorker, setNewWorker] = useState<UserRequest>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "1234",
    role: "WORKER",
    condition: "PENDING",
    details: "",

  })

  useEffect(() => {
    fetchWorkers()
  }, [user])

  useEffect(() => {
    filterWorkers()
  }, [workers, searchTerm, statusFilter])

  const fetchWorkers = async () => {
    if (!user?.id) return

    try {
      console.log("user.id (should be UUID):", user.id);
      const data = await userService.getWorkersByHR(user.id)
      setWorkers(data)
    } catch (error) {
      console.error("Failed to fetch workers:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterWorkers = () => {
    let filtered = workers

    if (searchTerm) {
      filtered = filtered.filter(
        (worker) =>
          worker.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          worker.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          worker.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "ALL") {
      filtered = filtered.filter((worker) => worker.condition === statusFilter)
    }

    setFilteredWorkers(filtered)
  }

  const handleCreateWorker = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await userService.createUser({
        ...newWorker,
        submittedBy: user?.id,
      })
      setIsCreateDialogOpen(false)
      setNewWorker({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "1234",
        role: "WORKER",
        condition: "PENDING",
        details: "",
      })
      fetchWorkers()
    } catch (error) {
      console.error("Failed to create worker:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800 border-green-200"
      case "REJECTED":
        return "bg-red-100 text-red-800 border-red-200"
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  HR Dashboard
                </h1>
                <p className="text-gray-600">Welcome back, {user?.firstName}</p>
              </div>
            </div>
            <Button onClick={logout} variant="outline" className="border-gray-300 hover:bg-gray-50 bg-transparent">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Total Workers</p>
                  <p className="text-3xl font-bold">{workers.length}</p>
                </div>
                <Users className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Approved</p>
                  <p className="text-3xl font-bold">{workers.filter((w) => w.condition === "APPROVED").length}</p>
                </div>
                <User className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100">Pending</p>
                  <p className="text-3xl font-bold">{workers.filter((w) => w.condition === "PENDING").length}</p>
                </div>
                <Calendar className="w-8 h-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100">Rejected</p>
                  <p className="text-3xl font-bold">{workers.filter((w) => w.condition === "REJECTED").length}</p>
                </div>
                <Mail className="w-8 h-8 text-red-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="mb-6 border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search workers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48 border-gray-200 focus:border-purple-500 focus:ring-purple-500">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Status</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="APPROVED">Approved</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Worker
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Worker</DialogTitle>
                    <DialogDescription>Create a new worker account. They will be notified via email.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateWorker} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={newWorker.firstName}
                          onChange={(e) => setNewWorker({ ...newWorker, firstName: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={newWorker.lastName}
                          onChange={(e) => setNewWorker({ ...newWorker, lastName: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newWorker.email}
                        onChange={(e) => setNewWorker({ ...newWorker, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={newWorker.username}
                        onChange={(e) => setNewWorker({ ...newWorker, username: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={newWorker.password}
                        onChange={(e) => setNewWorker({ ...newWorker, password: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="details">Details</Label>
                      <Input
                        id="details"
                        value={newWorker.details}
                        onChange={(e) => setNewWorker({ ...newWorker, details: e.target.value })}
                        placeholder="Additional details..."
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Create Worker
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Workers List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.map((worker) => (
            <Card key={worker.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={`/placeholder.svg?height=48&width=48&text=${worker.firstName[0]}${worker.lastName[0]}`}
                    />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      {worker.firstName[0]}
                      {worker.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {worker.firstName} {worker.lastName}
                    </CardTitle>
                    <CardDescription className="text-sm">{worker.email}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(worker.condition)}>{worker.condition}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Username:</span> {worker.username}
                  </p>
                  {worker.details && (
                    <p>
                      <span className="font-medium">Details:</span> {worker.details}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredWorkers.length === 0 && (
          <Card className="border-0 shadow-md">
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No workers found</h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== "ALL"
                  ? "Try adjusting your search or filter criteria."
                  : "Start by adding your first worker."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
