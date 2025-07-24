"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Search, LogOut, User, CheckCircle, XCircle, Clock } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { userService } from "@/services/user-service"
import type { UserResponse } from "@/types/user"

export default function AdminPage() {
  const { user, logout } = useAuth()
  const [workers, setWorkers] = useState<UserResponse[]>([])
  const [filteredWorkers, setFilteredWorkers] = useState<UserResponse[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [loading, setLoading] = useState(true)
  const [selectedWorker, setSelectedWorker] = useState<UserResponse | null>(null)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)

  useEffect(() => {
    fetchWorkers()
  }, [])

  useEffect(() => {
    filterWorkers()
  }, [workers, searchTerm, statusFilter])

  const fetchWorkers = async () => {
    try {
      const data = await userService.getAllWorkers()
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

  const handleStatusUpdate = async (workerId: string, newStatus: "APPROVED" | "REJECTED" | "PENDING") => {
    try {
      const worker = workers.find((w) => w.id === workerId)
      if (!worker) return

      const updateData = {
        ...worker,
        condition: newStatus,
        password: "1234",
      }

      await userService.updateUser(workerId, updateData)
      fetchWorkers()
      setIsUpdateDialogOpen(false)
      setSelectedWorker(null)
    } catch (error) {
      console.error("Failed to update worker status:", error)
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <CheckCircle className="w-4 h-4" />
      case "REJECTED":
        return <XCircle className="w-4 h-4" />
      case "PENDING":
        return <Clock className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
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
                  Admin Dashboard
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
                <CheckCircle className="w-8 h-8 text-green-200" />
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
                <Clock className="w-8 h-8 text-yellow-200" />
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
                <XCircle className="w-8 h-8 text-red-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="mb-6 border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
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
                  <Badge className={getStatusColor(worker.condition)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(worker.condition)}
                      {worker.condition}
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p>
                    <span className="font-medium">Username:</span> {worker.username}
                  </p>
                  {worker.details && (
                    <p>
                      <span className="font-medium">Details:</span> {worker.details}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  {worker.condition !== "APPROVED" && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(worker.id, "APPROVED")}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                  )}
                  {worker.condition !== "REJECTED" && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(worker.id, "REJECTED")}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  )}
                  {worker.condition !== "PENDING" && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(worker.id, "PENDING")}
                      className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white"
                    >
                      <Clock className="w-4 h-4 mr-1" />
                      Pending
                    </Button>
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
                  : "No workers have been registered yet."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
