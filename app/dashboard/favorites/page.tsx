"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, CheckCircle, Heart } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFavorites()
  }, [])

  const fetchFavorites = async () => {
    try {
      const res = await fetch("/api/favorites")
      if (res.ok) {
        const data = await res.json()
        setFavorites(data)
      }
    } catch (error) {
      console.error("Failed to fetch favorites:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFavorite = async (providerId: string) => {
    try {
      const res = await fetch(`/api/favorites?providerId=${providerId}`, {
        method: "DELETE",
      })
      if (res.ok) {
        setFavorites(favorites.filter((f) => f.providerId !== providerId))
      }
    } catch (error) {
      console.error("Failed to remove favorite:", error)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Favorite Providers</h1>

      {loading ? (
        <p>Loading...</p>
      ) : favorites.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No favorite providers yet</p>
            <Button className="mt-4" asChild>
              <Link href="/services">Browse Services</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((favorite) => {
            const provider = favorite.provider
            return (
              <Card key={favorite.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={provider?.profilePhoto || ""} />
                      <AvatarFallback>
                        {provider?.user?.name?.charAt(0) || "P"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{provider?.user?.name}</h3>
                        {provider?.isVerified && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {provider?.category}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">4.5</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        ₹{provider?.price}
                      </p>
                      <p className="text-xs text-muted-foreground">per service</p>
                    </div>
                    {provider?.onlineStatus && (
                      <Badge variant="success">Online</Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" asChild>
                      <Link href={`/provider/${provider?.id}`}>View Profile</Link>
                    </Button>
                    <Button className="flex-1" asChild>
                      <Link href={`/book/${provider?.id}`}>Book Now</Link>
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full mt-2"
                    onClick={() => handleRemoveFavorite(provider?.id)}
                  >
                    <Heart className="w-4 h-4 mr-2 fill-red-500 text-red-500" />
                    Remove from Favorites
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

