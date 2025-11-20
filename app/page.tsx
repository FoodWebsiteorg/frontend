import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChefHat,
  Wrench,
  Home,
  Sprout,
  Sparkles,
  Heart,
  Car,
  Shield,
  CheckCircle,
  CreditCard,
  UserCheck,
  Search,
  Calendar,
  Star,
} from "lucide-react"

const services = [
  { name: "Cook", icon: ChefHat, slug: "cook" },
  { name: "Electrician", icon: Wrench, slug: "electrician" },
  { name: "House Maid", icon: Home, slug: "house-maid" },
  { name: "Gardener", icon: Sprout, slug: "gardener" },
  { name: "Cleaner", icon: Sparkles, slug: "cleaner" },
  { name: "Pet Care", icon: Heart, slug: "pet-care" },
  { name: "Driver", icon: Car, slug: "driver" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">ServiceHub</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <Link href="/services" className="hover:text-primary">Services</Link>
            <Link href="/about" className="hover:text-primary">About Us</Link>
            <Link href="/login" className="hover:text-primary">Login</Link>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <span className="relative">
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                <span>🔔</span>
              </span>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/login">Admin</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Find Trusted Service Providers
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book professionals for all your home and personal service needs
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/services">Browse Services</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/register">Become a Provider</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group"
                >
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <Icon className="w-12 h-12 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                      <p className="font-semibold">{service.name}</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Steps Section (Updated – No OTP) */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <CardTitle>1. Search</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Browse through available service providers in your area
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <CardTitle>2. Book</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Select a time slot and confirm your booking
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <CardTitle>3. Service Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Your provider arrives and completes the service
                </CardDescription>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Trust & Safety
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-6 h-6 text-primary" />
                  <CardTitle>Udyam Verification</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All providers are verified with Udyam Aadhaar
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-6 h-6 text-primary" />
                  <CardTitle>Secure Payments</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All transactions are secured with encryption
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <UserCheck className="w-6 h-6 text-primary" />
                  <CardTitle>Verified Profiles</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Every provider completes identity verification
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-muted-foreground mb-4">
              ServiceHub connects customers with verified service providers.
            </p>
            <p className="text-muted-foreground">
              Our mission is to make professional services easily accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ServiceHub</span>
              </div>
              <p className="text-gray-400">
                Your trusted platform for professional services
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/services" className="hover:text-white">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-white">
                    Become a Provider
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: support@servicehub.com</li>
                <li>Phone: </li>
                <li>Address: </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ServiceHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
