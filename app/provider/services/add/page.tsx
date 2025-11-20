// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { useAuthStore } from "@/store/auth.store"
// import Link from "next/link"
// import { ArrowLeft, MapPin, Clock, IndianRupee, Calendar, Loader2 } from "lucide-react"
// import { toast } from "sonner"

// const categories = [
//   "Cook", "Electrician", "House maid", "Gardener", "Cleaner", "Pet Care", "Driver",
//   "Plumber", "Carpenter", "Painter", "Beautician", "Tutor", "AC Repair"
// ]

// interface Service {
//   id: number
//   title: string
//   category: string
//   description: string
//   price: string
//   duration: string
//   availableDays: string
//   locationRadius: number
//   providerId: number
//   createdAt: string
//   updatedAt: string
// }

// export default function AddServicePage() {
//   const router = useRouter()
//   const { providerId } = useAuthStore()
//   const baseURL = process.env.NEXT_PUBLIC_API_URL

//   const [loading, setLoading] = useState(false)
//   const [servicesLoading, setServicesLoading] = useState(true)
//   const [services, setServices] = useState<Service[]>([])
//   const [formData, setFormData] = useState({
//     title: "",
//     category: "",
//     description: "",
//     price: "",
//     duration: "",
//     availableDays: "",
//     locationRadius: "",
//   })

//   const fetchServices = async () => {
//     if (!providerId) return
//     setServicesLoading(true)
//     try {
//       const res = await fetch(`${baseURL}/api/provider/${providerId}/services`)
//       const data = await res.json()
//       if (res.ok) {
//         setServices(data.services || [])
//       }
//     } catch (err) {
//       console.error("Failed to fetch services:", err)
//     } finally {
//       setServicesLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchServices()
//   }, [providerId])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const res = await fetch(`${baseURL}/api/provider/services`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...formData,
//           price: Number(formData.price),
//           locationRadius: Number(formData.locationRadius),
//           providerId: providerId,
//         }),
//       })

//       const data = await res.json()

//       if (res.ok) {
//         toast.success("Service added successfully!", {
//           description: "Your service is now live.",
//         })
//         setFormData({
//           title: "",
//           category: "",
//           description: "",
//           price: "",
//           duration: "",
//           availableDays: "",
//           locationRadius: "",
//         })
//         fetchServices()
//       } else {
//         toast.error("Failed to add service", {
//           description: data.error || "Please try again later.",
//         })
//       }
//     } catch (err) {
//       toast.error("Something went wrong", {
//         description: "Please check your connection and try again.",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-6">
//           <Button variant="ghost" asChild className="mb-4">
//             <Link href="/provider/dashboard">
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back to Dashboard
//             </Link>
//           </Button>
//           <h1 className="text-3xl font-bold">Add New Service</h1>
//           <p className="text-muted-foreground">Create a new service to get more bookings</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Side - Form */}
//           <div className="lg:col-span-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Service Details</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <Label>Service Title *</Label>
//                       <Input
//                         placeholder="e.g., Expert North Indian Cooking"
//                         value={formData.title}
//                         onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                         required
//                       />
//                     </div>
//                     <div>
//                       <Label>Category *</Label>
//                       <select
//                         className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
//                         value={formData.category}
//                         onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                         required
//                       >
//                         <option value="">Choose category</option>
//                         {categories.map((cat) => (
//                           <option key={cat} value={cat}>{cat}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   <div>
//                     <Label>Description *</Label>
//                     <Textarea
//                       placeholder="Tell customers what makes your service special..."
//                       rows={5}
//                       value={formData.description}
//                       onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                       required
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <div>
//                       <Label>Price (₹) *</Label>
//                       <Input
//                         type="number"
//                         placeholder="800"
//                         value={formData.price}
//                         onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                         required
//                       />
//                     </div>
//                     <div>
//                       <Label>Duration *</Label>
//                       <Input
//                         placeholder="e.g., 3 hours, Full day"
//                         value={formData.duration}
//                         onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
//                         required
//                       />
//                     </div>
//                     <div>
//                       <Label>Service Radius (km) *</Label>
//                       <Input
//                         type="number"
//                         placeholder="20"
//                         value={formData.locationRadius}
//                         onChange={(e) => setFormData({ ...formData, locationRadius: e.target.value })}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <Label>Available Days *</Label>
//                     <Input
//                       placeholder="e.g., Monday to Saturday, Everyday, Weekends only"
//                       value={formData.availableDays}
//                       onChange={(e) => setFormData({ ...formData, availableDays: e.target.value })}
//                       required
//                     />
//                   </div>

//                   <div className="flex gap-4 pt-6">
//                     <Button type="submit" size="lg" disabled={loading}>
//                       {loading ? "Adding Service..." : "Publish Service"}
//                     </Button>
//                     <Button type="button" variant="outline" size="lg" asChild>
//                       <Link href="/provider/dashboard">Cancel</Link>
//                     </Button>
//                   </div>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Right Side - Services List */}
//           <div className="lg:col-span-1">
//             <Card className="sticky top-6">
//               <CardHeader>
//                 <CardTitle className="flex items-center justify-between">
//                   <span>Your Services</span>
//                   <span className="text-sm font-normal text-muted-foreground">
//                     {services.length} {services.length === 1 ? "service" : "services"}
//                   </span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {servicesLoading ? (
//                   <div className="flex items-center justify-center py-8">
//                     <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
//                   </div>
//                 ) : services.length === 0 ? (
//                   <div className="text-center py-8 text-muted-foreground">
//                     <p>No services added yet.</p>
//                     <p className="text-sm">Add your first service using the form.</p>
//                   </div>
//                 ) : (
//                   <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
//                     {services.map((service) => (
//                       <div
//                         key={service.id}
//                         className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
//                       >
//                         <div className="flex items-start justify-between mb-2">
//                           <h3 className="font-semibold text-sm line-clamp-1">{service.title}</h3>
//                           <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full whitespace-nowrap ml-2">
//                             {service.category}
//                           </span>
//                         </div>
//                         <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
//                           {service.description}
//                         </p>
//                         <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
//                           <div className="flex items-center gap-1">
//                             <IndianRupee className="w-3 h-3" />
//                             <span>₹{parseFloat(service.price).toLocaleString()}</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <Clock className="w-3 h-3" />
//                             <span>{service.duration}</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <MapPin className="w-3 h-3" />
//                             <span>{service.locationRadius} km</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <Calendar className="w-3 h-3" />
//                             <span className="truncate">{service.availableDays}</span>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
















// app/provider/services/add/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/store/auth.store"
import Link from "next/link"
import { ArrowLeft, MapPin, Clock, IndianRupee, Calendar, Loader2, Pencil, X } from "lucide-react"
import { toast } from "sonner"

const categories = [
  "Cook", "Electrician", "House maid", "Gardener", "Cleaner", "Pet Care", "Driver",
  "Plumber", "Carpenter", "Painter", "Beautician", "Tutor", "AC Repair"
]

interface Service {
  id: number
  title: string
  category: string
  description: string
  price: string
  duration: string
  availableDays: string
  locationRadius: number
  providerId: number
  createdAt: string
  updatedAt: string
}

export default function AddServicePage() {
  const router = useRouter()
  const { providerId } = useAuthStore()
  const baseURL = process.env.NEXT_PUBLIC_API_URL

  const [loading, setLoading] = useState(false)
  const [servicesLoading, setServicesLoading] = useState(true)
  const [services, setServices] = useState<Service[]>([])
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    duration: "",
    availableDays: "",
    locationRadius: "",
  })

  const fetchServices = async () => {
    if (!providerId) return
    setServicesLoading(true)
    try {
      const res = await fetch(`${baseURL}/api/provider/${providerId}/services`)
      const data = await res.json()
      if (res.ok) {
        setServices(data.services || [])
      }
    } catch (err) {
      console.error("Failed to fetch services:", err)
    } finally {
      setServicesLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [providerId])

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      price: "",
      duration: "",
      availableDays: "",
      locationRadius: "",
    })
    setEditingService(null)
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      title: service.title,
      category: service.category,
      description: service.description,
      price: parseFloat(service.price).toString(),
      duration: service.duration,
      availableDays: service.availableDays,
      locationRadius: service.locationRadius.toString(),
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const isEditing = editingService !== null
      const url = isEditing
        ? `${baseURL}/api/provider/services/${editingService.id}`
        : `${baseURL}/api/provider/services`

      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          locationRadius: Number(formData.locationRadius),
          ...(isEditing ? {} : { providerId: providerId }),
        }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success(isEditing ? "Service updated successfully!" : "Service added successfully!", {
          description: isEditing ? "Your changes have been saved." : "Your service is now live.",
        })
        resetForm()
        fetchServices()
      } else {
        toast.error(isEditing ? "Failed to update service" : "Failed to add service", {
          description: data.error || "Please try again later.",
        })
      }
    } catch (err) {
      toast.error("Something went wrong", {
        description: "Please check your connection and try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/provider/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">
            {editingService ? "Edit Service" : "Add New Service"}
          </h1>
          <p className="text-muted-foreground">
            {editingService
              ? "Update your service details"
              : "Create a new service to get more bookings"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Service Details</span>
                  {editingService && (
                    <Button variant="ghost" size="sm" onClick={resetForm}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel Edit
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Service Title *</Label>
                      <Input
                        placeholder="e.g., Expert North Indian Cooking"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label>Category *</Label>
                      <select
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                      >
                        <option value="">Choose category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label>Description *</Label>
                    <Textarea
                      placeholder="Tell customers what makes your service special..."
                      rows={5}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label>Price (₹) *</Label>
                      <Input
                        type="number"
                        placeholder="800"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label>Duration *</Label>
                      <Input
                        placeholder="e.g., 3 hours, Full day"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label>Service Radius (km) *</Label>
                      <Input
                        type="number"
                        placeholder="20"
                        value={formData.locationRadius}
                        onChange={(e) => setFormData({ ...formData, locationRadius: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Available Days *</Label>
                    <Input
                      placeholder="e.g., Monday to Saturday, Everyday, Weekends only"
                      value={formData.availableDays}
                      onChange={(e) => setFormData({ ...formData, availableDays: e.target.value })}
                      required
                    />
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button type="submit" size="lg" disabled={loading}>
                      {loading
                        ? editingService
                          ? "Updating..."
                          : "Adding Service..."
                        : editingService
                        ? "Update Service"
                        : "Publish Service"}
                    </Button>
                    {editingService ? (
                      <Button type="button" variant="outline" size="lg" onClick={resetForm}>
                        Cancel
                      </Button>
                    ) : (
                      <Button type="button" variant="outline" size="lg" asChild>
                        <Link href="/provider/dashboard">Cancel</Link>
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Services List */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Your Services</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {services.length} {services.length === 1 ? "service" : "services"}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {servicesLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  </div>
                ) : services.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No services added yet.</p>
                    <p className="text-sm">Add your first service using the form.</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className={`p-4 border rounded-lg transition-colors ${
                          editingService?.id === service.id
                            ? "border-primary bg-primary/5"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-sm line-clamp-1">{service.title}</h3>
                          <div className="flex items-center gap-1 ml-2">
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full whitespace-nowrap">
                              {service.category}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handleEdit(service)}
                            >
                              <Pencil className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                          {service.description}
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <IndianRupee className="w-3 h-3" />
                            <span>₹{parseFloat(service.price).toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{service.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{service.locationRadius} km</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span className="truncate">{service.availableDays}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}