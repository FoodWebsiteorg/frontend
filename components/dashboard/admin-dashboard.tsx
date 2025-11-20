"use client"

import { useState, useEffect } from "react"
import { useAuthStore } from "@/store/auth.store"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  DollarSign,
  Settings,
  LogOut,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export default function AdminDashboard() {
  const { user, logout } = useAuthStore()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProviders: 0,
    pendingVerifications: 0,
    totalBookings: 0,
    totalRevenue: 0,
  })
  const [pendingProviders, setPendingProviders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/stats")
      if (res.ok) {
        const data = await res.json()
        setStats(data.stats)
        setPendingProviders(data.pendingProviders || [])
      }
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyProvider = async (providerId: string) => {
    try {
      const res = await fetch(`/api/admin/verify-provider`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ providerId }),
      })

      if (res.ok) {
        fetchData()
      }
    } catch (error) {
      console.error("Failed to verify provider:", error)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen p-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Admin Panel</h2>
            <p className="text-sm text-muted-foreground">{user?.name}</p>
          </div>
          <nav className="space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-100">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
              <Users className="w-5 h-5" />
              <span>Users</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
              <UserCheck className="w-5 h-5" />
              <span>Providers</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
              <Calendar className="w-5 h-5" />
              <span>Bookings</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors w-full text-left text-red-600"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage users, providers, and bookings
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalUsers}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Providers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalProviders}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pending Verifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-500">
                  {stats.pendingVerifications}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalBookings}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {formatCurrency(stats.totalRevenue)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pending Verifications */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Provider Verifications</CardTitle>
              <CardDescription>
                Review and approve provider registrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading...</p>
              ) : pendingProviders.length === 0 ? (
                <p className="text-muted-foreground">
                  No pending verifications
                </p>
              ) : (
                <div className="space-y-4">
                  {pendingProviders.map((provider) => (
                    <div
                      key={provider.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold">{provider.user?.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {provider.category} • {provider.user?.email}
                        </p>
                        {provider.udyamAadhaar && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Udyam: {provider.udyamAadhaar}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleVerifyProvider(provider.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive">
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

