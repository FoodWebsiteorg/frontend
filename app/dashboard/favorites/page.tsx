"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, CheckCircle, Heart, Loader2, Users, MapPin, Clock } from "lucide-react"


interface User {
  name: string
  email: string
  mobile: string
  address: string
}

interface Service {
  serviceId: number
  title: string
  category: string
  description: string
  price: string
  duration: string
  availableDays: string
  locationRadius: number
}

interface Provider {
  providerId: number
  age: number
  gender: string
  category: string
  experience: number
  price: string
  salaryRange: string
  availabilityType: string
  workType: string
  gpsRadius: number
  skills: string
  overview: string
  emergencyAvailable: boolean
  idProof: string
  user: User
  services: Service[]
}

interface FavoriteProvider {
  favoriteId: number
  providerId: number
  providerName: string
  providerMobile: string
  providerCategory: string
  providerOverview: string
  createdAt: string
}

interface FavoriteWithDetails extends FavoriteProvider {
  providerDetails?: Provider
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteWithDetails[]>([])
  const [allProviders, setAllProviders] = useState<Provider[]>([])
  const [loading, setLoading] = useState(true)
  const [removingId, setRemovingId] = useState<number | null>(null)
  const [addingId, setAddingId] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("favorites")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [favRes, providersRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/favorites`, 
          {headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }}),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/provider/all-proviers-services`)
      ])

      if (favRes.ok && providersRes.ok) {
        const favData = await favRes.json()
        const providersData = await providersRes.json()

        setAllProviders(providersData.providers || [])

        const favoritesWithDetails = (favData.providers || []).map((fav: FavoriteProvider) => {
          const providerDetails = providersData.providers?.find(
            (p: Provider) => p.providerId === fav.providerId
          )
          return { ...fav, providerDetails }
        })

        setFavorites(favoritesWithDetails)
      }
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setLoading(false)
    }
  }

  const isFavorite = (providerId: number) => {
    return favorites.some((f) => f.providerId === providerId)
  }

  const handleAddFavorite = async (providerId: number) => {
    setAddingId(providerId)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" , Authorization: `Bearer ${localStorage.getItem('token')}`},
        body: JSON.stringify({ providerId })
      })

      if (res.ok) {
        await fetchData()
      }
    } catch (error) {
      console.error("Failed to add favorite:", error)
    } finally {
      setAddingId(null)
    }
  }

  const handleRemoveFavorite = async (providerId: number) => {
    setRemovingId(providerId)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/favorites`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ providerId })
      })

      if (res.ok) {
        setFavorites(favorites.filter((f) => f.providerId !== providerId))
      }
    } catch (error) {
      console.error("Failed to remove favorite:", error)
    } finally {
      setRemovingId(null)
    }
  }

  const handleToggleFavorite = async (providerId: number) => {
    if (isFavorite(providerId)) {
      await handleRemoveFavorite(providerId)
    } else {
      await handleAddFavorite(providerId)
    }
  }

  const formatPrice = (price: string) => {
    const num = parseFloat(price)
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num)
  }

  const ProviderCard = ({ provider, showRemoveButton = false }: { provider: Provider, showRemoveButton?: boolean }) => {
    const isProviderFavorite = isFavorite(provider.providerId)
    const isProcessing = addingId === provider.providerId || removingId === provider.providerId

    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={provider.idProof || ""} />
              <AvatarFallback className="text-lg">
                {provider.user?.name?.charAt(0) || "P"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg">{provider.user?.name}</h3>
                {provider.emergencyAvailable && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">{provider.category}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">4.5</span>
                </div>
                {provider.experience && (
                  <span className="text-xs text-muted-foreground">
                    • {provider.experience} yrs exp
                  </span>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={`shrink-0 ${isProviderFavorite ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'}`}
              onClick={() => handleToggleFavorite(provider.providerId)}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Heart className={`w-5 h-5 ${isProviderFavorite ? 'fill-red-500' : ''}`} />
              )}
            </Button>
          </div>

          {provider.overview && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {provider.overview}
            </p>
          )}

          {provider.skills && (
            <div className="flex flex-wrap gap-1 mb-4">
              {provider.skills.split(',').slice(0, 3).map((skill, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {skill.trim()}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{provider.gpsRadius} km</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span className="capitalize">{provider.availabilityType}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold text-primary">
                {formatPrice(provider.price)}
              </p>
              <p className="text-xs text-muted-foreground capitalize">
                {provider.workType}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              {provider.emergencyAvailable && (
                <Badge variant="destructive" className="text-xs">
                  Emergency
                </Badge>
              )}
              {provider.services?.length > 0 && (
                <Badge variant="outline" className="text-xs">
                  {provider.services.length} services
                </Badge>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              View Profile
            </Button>
            <Button className="flex-1">
              Book Now
            </Button>
          </div>

          {showRemoveButton && (
            <Button
              variant="ghost"
              className="w-full mt-2 text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => handleRemoveFavorite(provider.providerId)}
              disabled={removingId === provider.providerId}
            >
              {removingId === provider.providerId ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Heart className="w-4 h-4 mr-2 fill-red-500" />
              )}
              Remove from Favorites
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">Favorite Providers</h1>
      <p className="text-muted-foreground mb-6">
        Manage your favorite providers and discover new ones
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="favorites" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            My Favorites ({favorites.length})
          </TabsTrigger>
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            All Providers ({allProviders.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="favorites">
          {favorites.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground text-lg mb-2">No favorite providers yet</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Browse all providers and add them to your favorites
                </p>
                <Button onClick={() => setActiveTab("all")}>
                  Browse Providers
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((favorite) => {
                if (favorite.providerDetails) {
                  return (
                    <ProviderCard
                      key={favorite.favoriteId}
                      provider={favorite.providerDetails}
                      showRemoveButton={true}
                    />
                  )
                }
                return null
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="all">
          {allProviders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground text-lg">No providers available</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allProviders.map((provider) => (
                <ProviderCard
                  key={provider.providerId}
                  provider={provider}
                  showRemoveButton={false}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}