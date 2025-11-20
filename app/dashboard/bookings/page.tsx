"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, XCircle } from "lucide-react"
import { formatDate } from "@/lib/utils"

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings")
      if (res.ok) {
        const data = await res.json()
        setBookings(data)
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "SCHEDULED":
        return (
          <Badge variant="outline">
            <Clock className="w-3 h-3 mr-1" />
            Scheduled
          </Badge>
        )
      case "COMPLETED":
        return (
          <Badge variant="success">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        )
      case "CANCELLED":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelled
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No bookings found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-semibold text-lg">
                        {booking.provider?.category || "Service"}
                      </h3>
                      {getStatusBadge(booking.status)}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div>
                        <p className="font-medium">Date</p>
                        <p>{formatDate(booking.date)}</p>
                      </div>
                      <div>
                        <p className="font-medium">Time</p>
                        <p>{booking.timeSlot}</p>
                      </div>
                      <div>
                        <p className="font-medium">Provider</p>
                        <p>{booking.provider?.user?.name || "N/A"}</p>
                      </div>
                    </div>
                    {booking.address && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Address: {booking.address}
                      </p>
                    )}
                    {booking.otpCode && booking.status === "SCHEDULED" && (
                      <p className="text-sm font-mono bg-gray-100 p-2 rounded mt-2">
                        OTP: {booking.otpCode}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

