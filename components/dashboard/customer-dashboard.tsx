"use client"

import { useState, useEffect } from "react"
import { useAuthStore } from "@/store/auth.store"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Search,
  Calendar,
  Heart,
  CreditCard,
  Bell,
  User,
  LogOut,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"

export default function CustomerDashboard() {
  const { user, logout } = useAuthStore()
  const router = useRouter()
  const [bookings, setBookings] = useState<any[]>([])
  const [favorites, setFavorites] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [bookingsRes, favoritesRes] = await Promise.all([
        fetch("/api/bookings"),
        fetch("/api/favorites"),
      ])

      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json()
        setBookings(bookingsData)
      }

      if (favoritesRes.ok) {
        const favoritesData = await favoritesRes.json()
        setFavorites(favoritesData)
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

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Search, label: "Search Providers", href: "/services" },
    { icon: Calendar, label: "My Bookings", href: "/dashboard/bookings" },
    { icon: Heart, label: "Favorites", href: "/dashboard/favorites" },
    { icon: CreditCard, label: "Payments", href: "/dashboard/payments" },
    { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
    { icon: User, label: "My Profile", href: "/dashboard/profile" },
  ]

  const upcomingBookings = bookings.filter(
    (b) => b.status === "SCHEDULED" && new Date(b.date) >= new Date()
  )
  const completedBookings = bookings.filter((b) => b.status === "COMPLETED")
  const cancelledBookings = bookings.filter((b) => b.status === "CANCELLED")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen p-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">ServiceHub</h2>
            <p className="text-sm text-muted-foreground">
              Welcome, {user?.name}
            </p>
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
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
              Welcome back! Here's what's happening with your bookings.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search for services or providers..."
                className="pl-10"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    router.push(`/services?q=${e.currentTarget.value}`)
                  }
                }}
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Upcoming Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{upcomingBookings.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{completedBookings.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Favorites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{favorites.length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Bookings */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
              <CardDescription>
                Your scheduled services
              </CardDescription>
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
                        <h3 className="font-semibold">{booking.provider?.category}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(booking.date).toLocaleDateString()} at {booking.timeSlot}
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

          {/* Completed Bookings */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Recent Completed</CardTitle>
            </CardHeader>
            <CardContent>
              {completedBookings.length === 0 ? (
                <p className="text-muted-foreground">No completed bookings</p>
              ) : (
                <div className="space-y-4">
                  {completedBookings.slice(0, 5).map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold">{booking.provider?.category}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(booking.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="success">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Favorites */}
          <Card>
            <CardHeader>
              <CardTitle>Favorite Providers</CardTitle>
            </CardHeader>
            <CardContent>
              {favorites.length === 0 ? (
                <p className="text-muted-foreground">No favorite providers yet</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favorites.map((fav) => (
                    <Link
                      key={fav.id}
                      href={`/provider/${fav.providerId}`}
                      className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-semibold">{fav.provider?.category}</h3>
                      <p className="text-sm text-muted-foreground">
                        {fav.provider?.user?.name}
                      </p>
                    </Link>
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

