"use client"

import { useState, useEffect } from "react"
import { useAuthStore } from "@/store/auth.store"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  LayoutDashboard,
  Calendar,
  DollarSign,
  User,
  Settings,
  LogOut,
  Edit,
  Plus,
  Clock,
  CheckCircle,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export default function ProviderDashboard() {
  const { user, logout } = useAuthStore()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingBookings: 0,
    earnings: 0,
    profileCompletion: 0,
  })
  const [bookings, setBookings] = useState<any[]>([])
  const [provider, setProvider] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [bookingsRes, providerRes] = await Promise.all([
        fetch("/api/bookings"),
        fetch("/api/provider/profile"),
      ])

      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json()
        setBookings(bookingsData)
        setStats({
          totalBookings: bookingsData.length,
          upcomingBookings: bookingsData.filter(
            (b: any) => b.status === "SCHEDULED"
          ).length,
          earnings: bookingsData
            .filter((b: any) => b.status === "COMPLETED")
            .reduce((sum: number, b: any) => sum + (b.provider?.price || 0), 0),
          profileCompletion: 75, // Calculate based on filled fields
        })
      }

      if (providerRes.ok) {
        const providerData = await providerRes.json()
        setProvider(providerData)
      }
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const upcomingBookings = bookings.filter(
    (b) => b.status === "SCHEDULED" && new Date(b.date) >= new Date()
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen p-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Provider Hub</h2>
            <p className="text-sm text-muted-foreground">
              {user?.name}
            </p>
          </div>
          <nav className="space-y-2">
            <Link
              href="/provider/dashboard"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/provider/bookings"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Calendar className="w-5 h-5" />
              <span>Bookings</span>
            </Link>
            <Link
              href="/provider/profile"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </Link>
            <Link
              href="/provider/settings"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
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
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's your business overview.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                  Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.upcomingBookings}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Earnings (This Month)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {formatCurrency(stats.earnings)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Profile Completion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.profileCompletion}%</div>
              </CardContent>
            </Card>
          </div>

          {/* Verification Status */}
          {provider && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Verification Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">
                      {provider.isVerified ? "Verified" : "Pending Verification"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {provider.isVerified
                        ? "Your profile is verified and active"
                        : "Your profile is under review"}
                    </p>
                  </div>
                  <Badge variant={provider.isVerified ? "success" : "outline"}>
                    {provider.isVerified ? "Verified" : "Pending"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto py-4" asChild>
                  <Link href="/provider/profile">
                    <Edit className="w-5 h-5 mr-2" />
                    Edit Profile
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4" asChild>
                  <Link href="/provider/services/add">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Service
                  </Link>
                </Button>
                {/* <Button variant="outline" className="h-auto py-4">
                  <Settings className="w-5 h-5 mr-2" />
                  Update Availability
                </Button> */}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
              <CardDescription>Your scheduled services</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading...</p>
              ) : upcomingBookings.length === 0 ? (
                <p className="text-muted-foreground">No upcoming bookings</p>
              ) : (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold">{booking.customer?.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(booking.date).toLocaleDateString()} at{" "}
                          {booking.timeSlot}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {booking.address}
                        </p>
                      </div>
                      <Badge variant="outline">
                        <Clock className="w-3 h-3 mr-1" />
                        {booking.status}
                      </Badge>
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

