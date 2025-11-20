// app/provider/services/add/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/store/auth.store"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import {toast} from "sonner"

const categories = [
  "Cook", "Electrician", "House maid", "Gardener", "Cleaner", "Pet Care", "Driver",
  "Plumber", "Carpenter", "Painter", "Beautician", "Tutor", "AC Repair"
]

export default function AddServicePage() {
//   const { toast } = useToast()
  const router = useRouter()
  const { user } = useAuthStore()
  const baseURL = process.env.NEXT_PUBLIC_API_URL

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    duration: "",
    availableDays: "",
    locationRadius: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${baseURL}/api/provider/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          locationRadius: Number(formData.locationRadius),
          providerId: user?.id,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        toast({ title: "Success", description: "Service added successfully!" })
        router.push("/provider/dashboard")
      } else {
        toast({ title: "Error", description: data.error || "Failed to add service", variant: "destructive" })
      }
    } catch (err) {
      toast({ title: "Error", description: "Something went wrong", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/provider/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Add New Service</h1>
          <p className="text-muted-foreground">Create a new service to get more bookings</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
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
                  {loading ? "Adding Service..." : "Publish Service"}
                </Button>
                <Button type="button" variant="outline" size="lg" asChild>
                  <Link href="/provider/dashboard">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}