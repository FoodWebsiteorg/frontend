"use client"

import { useState } from "react"
import { useAuthStore } from "@/store/auth.store"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Star, CheckCircle, MapPin, Clock, DollarSign, Award } from "lucide-react"

interface ProviderProfileProps {
  provider: any
  averageRating: number
}

export default function ProviderProfile({
  provider,
  averageRating,
}: ProviderProfileProps) {
  const { user } = useAuthStore()
  const [isFavorite, setIsFavorite] = useState(false)

  const handleToggleFavorite = async () => {
    if (!user) {
      alert("Please login to add favorites")
      return
    }

    try {
      if (isFavorite) {
        await fetch(`/api/favorites?providerId=${provider.id}`, {
          method: "DELETE",
        })
      } else {
        await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ providerId: provider.id }),
        })
      }
      setIsFavorite(!isFavorite)
    } catch (error) {
      console.error("Failed to toggle favorite:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={provider.profilePhoto || ""} />
                    <AvatarFallback className="text-2xl">
                      {provider.user?.name?.charAt(0) || "P"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-3xl font-bold">{provider.user?.name}</h1>
                      {provider.isVerified && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                      {provider.verificationBadge && (
                        <Badge variant="success">{provider.verificationBadge}</Badge>
                      )}
                    </div>
                    <p className="text-xl text-muted-foreground mb-2">
                      {provider.category}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{averageRating.toFixed(1)}</span>
                        <span>({provider.reviews.length} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        <span>{provider.experience} years experience</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Overview */}
            {provider.overview && (
              <Card>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{provider.overview}</p>
                </CardContent>
              </Card>
            )}

            {/* Skills */}
            {provider.skills && (
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {provider.skills.split(",").map((skill: string, idx: number) => (
                      <Badge key={idx} variant="secondary">
                        {skill.trim()}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Availability Type:</span>
                    <Badge>{provider.availabilityType || "Not specified"}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Work Type:</span>
                    <Badge>{provider.workType || "Not specified"}</Badge>
                  </div>
                  {provider.emergencyAvailable && (
                    <div className="flex items-center justify-between">
                      <span>Emergency Service:</span>
                      <Badge variant="success">Available</Badge>
                    </div>
                  )}
                  {provider.gpsRadius && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>Service Radius: {provider.gpsRadius} km</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Reviews ({provider.reviews.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {provider.reviews.length === 0 ? (
                  <p className="text-muted-foreground">No reviews yet</p>
                ) : (
                  <div className="space-y-4">
                    {provider.reviews.map((review: any) => (
                      <div key={review.id} className="border-b pb-4 last:border-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{review.customer?.name}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        {review.comment && (
                          <p className="text-sm text-muted-foreground">
                            {review.comment}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Book Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <span className="text-3xl font-bold text-primary">
                      ₹{provider.price}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">per service</p>
                </div>

                {user?.role === "CUSTOMER" && (
                  <>
                    <Button className="w-full" asChild>
                      <Link href={`/book/${provider.id}`}>Book Now</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleToggleFavorite}
                    >
                      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    </Button>
                  </>
                )}

                {user?.role === "PROVIDER" && user.id === provider.userId && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Online Status</span>
                      <Switch
                        checked={provider.onlineStatus}
                        onCheckedChange={async (checked) => {
                          // TODO: Update online status
                        }}
                      />
                    </div>
                  </div>
                )}

                {!user && (
                  <Button className="w-full" asChild>
                    <Link href="/login">Login to Book</Link>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Verification Badge */}
            {provider.isVerified && (
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                  <p className="font-semibold">Verified Provider</p>
                  {provider.udyamAadhaar && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Udyam Verified
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

