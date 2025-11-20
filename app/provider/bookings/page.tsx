"use client"

import { useState, useEffect } from "react"
import { useAuthStore } from "@/store/auth.store"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LayoutDashboard,
  Calendar,
  User,
  Settings,
  LogOut,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle,
  Package,
} from "lucide-react"


export default function ProviderBookings() {
  const { user, logout } = useAuthStore()
  const router = useRouter()
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState<number | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/provider/bookings`,
       { headers:{
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }}
      )
      if (response.ok) {
        const data = await response.json()
        setBookings(data)
      } else {
        throw new Error("Failed to fetch bookings")
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error)
      setMessage({ type: "error", text: "Failed to load bookings" })
    } finally {
      setLoading(false)
    }
  }

  const handleBookingAction = async (bookingId: number, action: "accept" | "reject") => {
  setProcessingId(bookingId)
  setMessage(null)
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/status/${bookingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        status: action === "accept" ? "accepted" : "rejected",
      }),
    })

      if (response.ok) {
        setMessage({
          type: "success",
          text: action === "accept" 
            ? "Booking accepted successfully!" 
            : "Booking rejected successfully!"
        })
        fetchBookings()
      } else {
        throw new Error("Failed to update booking")
      }
    } catch (error) {
      console.error("Failed to update booking:", error)
      setMessage({ type: "error", text: "Failed to update booking" })
    } finally {
      setProcessingId(null)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase()
    switch (statusLower) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "confirmed":
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "completed":
        return "bg-green-100 text-green-800 border-green-300"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    const statusLower = status.toLowerCase()
    switch (statusLower) {
      case "pending":
        return <AlertCircle className="w-4 h-4" />
      case "confirmed":
      case "scheduled":
        return <Clock className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const formatCurrency = (amount: string | number) => {
    const numAmount = typeof amount === "string" ? parseFloat(amount) : amount
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(numAmount)
  }

  const pendingBookings = bookings.filter((b) => b.status.toLowerCase() === "pending")
  const confirmedBookings = bookings.filter(
    (b) => (b.status.toLowerCase() === "confirmed" || b.status.toLowerCase() === "scheduled") && 
    new Date(b.bookingDate) >= new Date()
  )
  const pastBookings = bookings.filter(
    (b) => b.status.toLowerCase() === "completed" || 
    b.status.toLowerCase() === "cancelled" ||
    (b.status.toLowerCase() === "confirmed" && new Date(b.bookingDate) < new Date())
  )

  const BookingCard = ({ booking }: { booking: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{booking.User?.name || "Unknown Customer"}</CardTitle>
            <CardDescription>
              Booking ID: #{booking.id}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(booking.status)}>
            <span className="flex items-center gap-1">
              {getStatusIcon(booking.status)}
              {booking.status.toUpperCase()}
            </span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Service Details */}
        {booking.Service && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-start gap-2">
              <Package className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold">{booking.Service.title}</h4>
                <p className="text-sm text-muted-foreground">{booking.Service.category}</p>
                <p className="text-sm text-muted-foreground mt-1">{booking.Service.description}</p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="font-semibold text-green-600">
                    {formatCurrency(booking.Service.price)}
                  </span>
                  <span className="text-muted-foreground">
                    Duration: {booking.Service.duration}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">
                {new Date(booking.bookingDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{booking.timeSlot}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>{booking.address}</span>
            </div>
          </div>

          <div className="space-y-2">
            {booking.User?.mobile && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{booking.User.mobile}</span>
              </div>
            )}
            <div className="text-sm text-muted-foreground">
              <p>Booked on: {new Date(booking.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {booking.status.toLowerCase() === "pending" && (
          <div className="flex gap-2 pt-2 border-t">
            <Button
              onClick={() => handleBookingAction(booking.id, "accept")}
              disabled={processingId === booking.id}
              className="flex-1"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              {processingId === booking.id ? "Processing..." : "Accept"}
            </Button>
            <Button
              onClick={() => handleBookingAction(booking.id, "reject")}
              disabled={processingId === booking.id}
              variant="destructive"
              className="flex-1"
            >
              <XCircle className="w-4 h-4 mr-2" />
              {processingId === booking.id ? "Processing..." : "Reject"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen p-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Provider Hub</h2>
            <p className="text-sm text-muted-foreground">{user?.name}</p>
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
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 transition-colors"
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
            <h1 className="text-3xl font-bold mb-2">Bookings Management</h1>
            <p className="text-muted-foreground">
              View and manage all your service bookings
            </p>
          </div>

          {/* Success/Error Message */}
          {message && (
            <alert className={`mb-6 ${message.type === "success" ? "border-green-500" : "border-red-500"}`}>
              <CardDescription>
                {message.type === "success" ? (
                  <CheckCircle className="w-4 h-4 inline mr-2 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 inline mr-2 text-red-600" />
                )}
                {message.text}
              </CardDescription>
            </alert>
          )}

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Requests</p>
                    <p className="text-2xl font-bold">{pendingBookings.length}</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Confirmed</p>
                    <p className="text-2xl font-bold">{confirmedBookings.length}</p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Bookings</p>
                    <p className="text-2xl font-bold">{bookings.length}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bookings Tabs */}
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">
                Pending ({pendingBookings.length})
              </TabsTrigger>
              <TabsTrigger value="confirmed">
                Confirmed ({confirmedBookings.length})
              </TabsTrigger>
              <TabsTrigger value="past">
                Past ({pastBookings.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="mt-6">
              {loading ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">Loading bookings...</p>
                  </CardContent>
                </Card>
              ) : pendingBookings.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">
                      No pending booking requests
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {pendingBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="confirmed" className="mt-6">
              {loading ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">Loading bookings...</p>
                  </CardContent>
                </Card>
              ) : confirmedBookings.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">
                      No confirmed bookings
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {confirmedBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="mt-6">
              {loading ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">Loading bookings...</p>
                  </CardContent>
                </Card>
              ) : pastBookings.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">
                      No past bookings
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {pastBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}