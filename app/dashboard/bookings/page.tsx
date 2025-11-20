"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, CheckCircle, XCircle, Star, MapPin, Calendar, History } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { toast } from "sonner"

const categories = [
  "Cook", "Electrician", "House maid", "Gardener", "Cleaner", "Pet Care", "Driver",
  "Plumber", "Carpenter", "Painter", "Beautician", "Tutor", "AC Repair"
]

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "confirmed":
      return "bg-blue-100 text-blue-800"
    case "completed":
      return "bg-green-100 text-green-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return <Clock className="w-4 h-4" />
    case "confirmed":
    case "completed":
      return <CheckCircle className="w-4 h-4" />
    case "cancelled":
      return <XCircle className="w-4 h-4" />
    default:
      return <Clock className="w-4 h-4" />
  }
}

export default function BookingsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [providers, setProviders] = useState<any[]>([])
  const [bookingHistory, setBookingHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [historyLoading, setHistoryLoading] = useState(false)
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<any>(null)
  const [selectedService, setSelectedService] = useState<any>(null)
  const [bookingDate, setBookingDate] = useState("")
  const [bookingTime, setBookingTime] = useState("")
  const [address, setAddress] = useState("")
  const [bookingLoading, setBookingLoading] = useState(false)

  useEffect(() => {
    if (selectedCategory) {
      fetchProviders()
    } else {
      setProviders([])
    }
  }, [selectedCategory])

  useEffect(() => {
    fetchBookingHistory()
  }, [])

  const fetchProviders = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/provider/category/services?category=${encodeURIComponent(selectedCategory)}`)
      if (res.ok) {
        const data = await res.json()
        setProviders(data.providers || [])
      }
    } catch (error) {
      console.error("Failed to fetch providers:", error)
      toast.error("Failed to load providers")
    } finally {
      setLoading(false)
    }
  }

  const fetchBookingHistory = async () => {
    setHistoryLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/user`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      if (res.ok) {
        const data = await res.json()
        setBookingHistory(data || [])
      }
    } catch (error) {
      console.error("Failed to fetch booking history:", error)
      toast.error("Failed to load booking history")
    } finally {
      setHistoryLoading(false)
    }
  }

  const openBookingDialog = (provider: any, service: any) => {
    setSelectedProvider(provider)
    setSelectedService(service)
    setBookingDate("")
    setBookingTime("")
    setAddress("")
    setBookingDialogOpen(true)
  }

  const handleBooking = async () => {
    if (!bookingDate || !bookingTime || !address) {
      toast.error("Please fill all fields")
      return
    }

    setBookingLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          serviceId: selectedService.serviceId,
          providerId: selectedProvider.providerId,
          bookingDate: bookingDate,
          timeSlot: bookingTime,
          address: address,
        }),
      })

      if (res.ok) {
        toast.success("Booking created successfully!")
        setBookingDialogOpen(false)
        // Reset form
        setBookingDate("")
        setBookingTime("")
        setAddress("")
        // Refresh booking history
        fetchBookingHistory()
      } else {
        const error = await res.json()
        toast.error(error.message || "Failed to create booking")
      }
    } catch (error) {
      toast.error("Something went wrong")
      console.error("Booking error:", error)
    } finally {
      setBookingLoading(false)
    }
  }

  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }

  const formatBookingDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    })
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Book a Service</h1>

      <Tabs defaultValue="book" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="book">Book Service</TabsTrigger>
          <TabsTrigger value="history">
            <History className="w-4 h-4 mr-2" />
            My Bookings
          </TabsTrigger>
        </TabsList>

        {/* Book Service Tab */}
        <TabsContent value="book" className="mt-6">
          {/* Category Dropdown */}
          <div className="mb-8 max-w-sm">
            <Label htmlFor="category" className="mb-2 block">Select Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Choose a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Providers List */}
          {loading ? (
            <p>Loading providers...</p>
          ) : !selectedCategory ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">Select a category to view providers</p>
              </CardContent>
            </Card>
          ) : providers.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No providers found for {selectedCategory}</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {providers.map((provider) => (
                <Card key={provider.providerId}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{provider.providerName}</CardTitle>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {provider.providerMobile}
                          </span>
                          <span>
                            {provider.providerExperience} years experience
                          </span>
                        </div>
                        {provider.providerOverview && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {provider.providerOverview}
                          </p>
                        )}
                      </div>
                      <Badge variant="outline">{provider.providerCategory}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-medium mb-4">Services Offered</h4>
                    {provider.services && provider.services.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {provider.services.map((service: any) => (
                          <div
                            key={service.serviceId}
                            className="border rounded-lg p-4 flex flex-col justify-between"
                          >
                            <div>
                              <h5 className="font-semibold">{service.title}</h5>
                              <p className="text-sm text-muted-foreground mt-1">
                                {service.description}
                              </p>
                              <div className="flex flex-col gap-2 mt-3 text-sm">
                                <div className="flex items-center justify-between">
                                  <span className="text-muted-foreground">Price:</span>
                                  <span className="font-medium text-green-600">
                                    ₹{service.price}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-muted-foreground">Duration:</span>
                                  <span>{service.duration}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-muted-foreground">Available:</span>
                                  <span>{service.availableDays}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-muted-foreground">Radius:</span>
                                  <span>{service.locationRadius} km</span>
                                </div>
                              </div>
                            </div>
                            <Button
                              className="mt-4 w-full"
                              onClick={() => openBookingDialog(provider, service)}
                            >
                              <Calendar className="w-4 h-4 mr-2" />
                              Book Now
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No services listed</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Booking History Tab */}
        <TabsContent value="history" className="mt-6">
          {historyLoading ? (
            <p>Loading booking history...</p>
          ) : bookingHistory.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <History className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No bookings found</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Your booking history will appear here
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {bookingHistory.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{booking.Service.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {booking.Service.category}
                        </p>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(booking.status)}
                          {booking.status}
                        </span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
                          <p className="text-sm">
                            {formatBookingDate(booking.bookingDate)} • {booking.timeSlot}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Service Address</p>
                          <p className="text-sm">{booking.address}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Duration</p>
                          <p className="text-sm">{booking.Service.duration}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Description</p>
                          <p className="text-sm">{booking.Service.description}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Price</p>
                          <p className="text-lg font-semibold text-green-600">
                            ₹{booking.Service.price}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Booked On</p>
                          <p className="text-sm">
                            {formatBookingDate(booking.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Booking Dialog */}
      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Service</DialogTitle>
            <DialogDescription>
              {selectedService?.title} with {selectedProvider?.providerName}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="booking-date">Select Date</Label>
              <Input
                id="booking-date"
                type="date"
                min={getTodayDate()}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="booking-time">Select Time Slot</Label>
              <Select value={bookingTime} onValueChange={setBookingTime}>
                <SelectTrigger id="booking-time">
                  <SelectValue placeholder="Choose a time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Service Address</Label>
              <Input
                id="address"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between text-sm">
                <span>Service</span>
                <span>{selectedService?.title}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>Duration</span>
                <span>{selectedService?.duration}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>Available Days</span>
                <span>{selectedService?.availableDays}</span>
              </div>
              <div className="flex justify-between font-semibold mt-2 pt-2 border-t">
                <span>Total</span>
                <span className="text-green-600">₹{selectedService?.price}</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setBookingDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleBooking} disabled={bookingLoading}>
              {bookingLoading ? "Booking..." : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}