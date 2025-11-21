// "use client"

// import { useState, useEffect } from "react"
// import { useAuthStore } from "@/store/auth.store"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import {
//   LayoutDashboard,
//   Search,
//   Calendar,
//   Heart,
//   CreditCard,
//   Bell,
//   User,
//   LogOut,
//   Clock,
//   CheckCircle,
//   XCircle,
// } from "lucide-react"

// export default function CustomerDashboard() {
//   const { user, logout } = useAuthStore()
//   const router = useRouter()
//   const [bookings, setBookings] = useState<any[]>([])
//   const [favorites, setFavorites] = useState<any[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetchData()
//   }, [])

//   const fetchData = async () => {
//     try {
//       const [bookingsRes, favoritesRes] = await Promise.all([
//         fetch("/api/bookings"),
//         fetch("/api/favorites"),
//       ])

//       if (bookingsRes.ok) {
//         const bookingsData = await bookingsRes.json()
//         setBookings(bookingsData)
//       }

//       if (favoritesRes.ok) {
//         const favoritesData = await favoritesRes.json()
//         setFavorites(favoritesData)
//       }
//     } catch (error) {
//       console.error("Failed to fetch data:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleLogout = () => {
//     logout()
//     router.push("/")
//   }

//   const menuItems = [
//     { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
//     { icon: Search, label: "Search Providers", href: "/services" },
//     { icon: Calendar, label: "My Bookings", href: "/dashboard/bookings" },
//     { icon: Heart, label: "Favorites", href: "/dashboard/favorites" },
//     // { icon: CreditCard, label: "Payments", href: "/dashboard/payments" },
//     // { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
//     { icon: User, label: "My Profile", href: "/dashboard/profile" },
//   ]

//   const completedBookings = bookings.filter((b) => b.status === "COMPLETED")

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="flex">
//         {/* Sidebar */}
//         <aside className="w-64 bg-white border-r min-h-screen p-4">
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold">ServiceHub</h2>
//             <p className="text-sm text-muted-foreground">
//               Welcome, {user?.name}
//             </p>
//           </div>
//           <nav className="space-y-2">
//             {menuItems.map((item) => {
//               const Icon = item.icon
//               return (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
//                 >
//                   <Icon className="w-5 h-5" />
//                   <span>{item.label}</span>
//                 </Link>
//               )
//             })}
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors w-full text-left text-red-600"
//             >
//               <LogOut className="w-5 h-5" />
//               <span>Logout</span>
//             </button>
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-8">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
//             <p className="text-muted-foreground">
//               Welcome back! Here's what's happening with your bookings.
//             </p>
//           </div>

//           {/* Search Bar */}
//           <div className="mb-8">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
//               <Input
//                 placeholder="Search for services or providers..."
//                 className="pl-10"
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     router.push(`/services?q=${e.currentTarget.value}`)
//                   }
//                 }}
//               />
//             </div>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-sm font-medium text-muted-foreground">
//                   Completed
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-3xl font-bold">{completedBookings.length}</div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-sm font-medium text-muted-foreground">
//                   Favorites
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-3xl font-bold">{favorites.length}</div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Favorites */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Favorite Providers</CardTitle>
//             </CardHeader>
//             <CardContent>
//               {favorites.length === 0 ? (
//                 <p className="text-muted-foreground">No favorite providers yet</p>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {favorites.map((fav) => (
//                     <Link
//                       key={fav.id}
//                       href={`/provider/${fav.providerId}`}
//                       className="p-4 border rounded-lg hover:shadow-md transition-shadow"
//                     >
//                       <h3 className="font-semibold">{fav.provider?.category}</h3>
//                       <p className="text-sm text-muted-foreground">
//                         {fav.provider?.user?.name}
//                       </p>
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </main>
//       </div>
//     </div>
//   )
// }


























"use client"

import { useState, useEffect } from "react"
import { useAuthStore } from "@/store/auth.store"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  Search,
  Calendar,
  Heart,
  User,
  LogOut,
  Star,
  CheckCircle,
  Loader2,
  X,
} from "lucide-react"

const API_BASE_URL = "https://0k3hj5k8-8000.inc1.devtunnels.ms/api"

interface UserInfo {
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
  user: UserInfo
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

export default function CustomerDashboard() {
  const { user, logout } = useAuthStore()
  const router = useRouter()
  const [bookings, setBookings] = useState<any[]>([])
  const [favorites, setFavorites] = useState<FavoriteWithDetails[]>([])
  const [allProviders, setAllProviders] = useState<Provider[]>([])
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([])
  const [loading, setLoading] = useState(true)
  const [removingId, setRemovingId] = useState<number | null>(null)
  const [addingId, setAddingId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
  try {
    const [favoritesRes, providersRes, bookingsRes] = await Promise.all([
      fetch(`${API_BASE_URL}/favorites`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }}),
      fetch(`${API_BASE_URL}/provider/all-proviers-services`),
      fetch(`${API_BASE_URL}/bookings/user/dashboard`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
    ])

    if (favoritesRes.ok && providersRes.ok && bookingsRes.ok) {
      const favoritesData = await favoritesRes.json()
      const providersData = await providersRes.json()
      const bookingsData = await bookingsRes.json()

        setAllProviders(providersData.providers || [])

        const favoritesWithDetails = (favoritesData.providers || []).map((fav: FavoriteProvider) => {
          const providerDetails = providersData.providers?.find(
            (p: Provider) => p.providerId === fav.providerId
          )
          return { ...fav, providerDetails }
        })

        setFavorites(favoritesWithDetails)
        setBookings([{ acceptedCount: bookingsData.acceptedCount }])
      }
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setIsSearching(false)
      setFilteredProviders([])
      return
    }

    setIsSearching(true)
    const lowercaseQuery = query.toLowerCase()
    const filtered = allProviders.filter((provider) =>
      provider.user?.name?.toLowerCase().includes(lowercaseQuery) ||
      provider.category?.toLowerCase().includes(lowercaseQuery) ||
      provider.skills?.toLowerCase().includes(lowercaseQuery) ||
      provider.overview?.toLowerCase().includes(lowercaseQuery)
    )
    setFilteredProviders(filtered)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setIsSearching(false)
    setFilteredProviders([])
  }

  const isFavorite = (providerId: number) => {
    return favorites.some((f) => f.providerId === providerId)
  }

  const handleAddFavorite = async (providerId: number) => {
    setAddingId(providerId)
    try {
      const res = await fetch(`${API_BASE_URL}/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      const res = await fetch(`${API_BASE_URL}/favorites?providerId=${providerId}`, {
        method: "DELETE",
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

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const formatPrice = (price: string) => {
    const num = parseFloat(price)
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num)
  }

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Calendar, label: "My Bookings", href: "/dashboard/bookings" },
    { icon: Heart, label: "Favorites", href: "/dashboard/favorites" },
    { icon: User, label: "My Profile", href: "/dashboard/profile" },
  ]

  const acceptedBookings = bookings[0]?.acceptedCount || 0

  const ProviderCard = ({ provider }: { provider: Provider }) => {
    const isProviderFavorite = isFavorite(provider.providerId)
    const isProcessing = addingId === provider.providerId || removingId === provider.providerId

    return (
      <div className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-white">
        <div className="flex items-start gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={provider.idProof || ""} />
            <AvatarFallback>
              {provider.user?.name?.charAt(0) || "P"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold truncate">{provider.user?.name}</h3>
              {provider.emergencyAvailable && (
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{provider.category}</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs">4.5</span>
              </div>
              {provider.experience && (
                <span className="text-xs text-muted-foreground">
                  • {provider.experience} yrs
                </span>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`shrink-0 ${isProviderFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
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
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
            {provider.overview}
          </p>
        )}

        {provider.skills && (
          <div className="flex flex-wrap gap-1 mt-2">
            {provider.skills.split(',').slice(0, 2).map((skill, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {skill.trim()}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-lg font-bold text-primary">
              {formatPrice(provider.price)}
            </span>
            <span className="text-xs text-muted-foreground ml-1 capitalize">
              /{provider.workType || "service"}
            </span>
          </div>
          <Button size="sm">Book Now</Button>
        </div>
      </div>
    )
  }

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
                placeholder="Search providers by name, category, or skills..."
                className="pl-10 pr-10"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Search Results */}
          {isSearching && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Search Results ({filteredProviders.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredProviders.length === 0 ? (
                  <div className="text-center py-8">
                    <Search className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-muted-foreground">No providers found for "{searchQuery}"</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredProviders.map((provider) => (
                      <ProviderCard key={provider.providerId} provider={provider} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Stats Cards */}
          {!isSearching && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Accepted Bookings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">
                      {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : acceptedBookings}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Active bookings</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      Favorites
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-red-500">
                      {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : favorites.length}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Saved providers</p>
                  </CardContent>
                </Card>
              </div>

              {/* Favorite Providers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    Favorite Providers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                      <span className="ml-2 text-muted-foreground">Loading favorites...</span>
                    </div>
                  ) : favorites.length === 0 ? (
                    <div className="text-center py-8">
                      <Heart className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                      <p className="text-muted-foreground mb-2">No favorite providers yet</p>
                      <p className="text-sm text-muted-foreground">
                        Use the search bar above to find and add providers to your favorites
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {favorites.map((fav) => {
                        if (fav.providerDetails) {
                          return (
                            <ProviderCard
                              key={fav.favoriteId}
                              provider={fav.providerDetails}
                            />
                          )
                        }
                        return null
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </main>
      </div>
    </div>
  )
}