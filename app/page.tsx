"use client";
import React from "react";
import Link from "next/link";
import CarouselClient from "@/components/CarouselClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";

const services = [
  { name: "Cook", icon: ChefHat, slug: "cook" },
  { name: "Electrician", icon: Wrench, slug: "electrician" },
  { name: "House Maid", icon: Home, slug: "house-maid" },
  { name: "Gardener", icon: Sprout, slug: "gardener" },
  { name: "Cleaner", icon: Sparkles, slug: "cleaner" },
  { name: "Pet Care", icon: Heart, slug: "pet-care" },
  { name: "Driver", icon: Car, slug: "driver" },
];

export default function HomePage() {
  const slides = [
    {
      image: "/images/Carousel/img1.jpeg",
      alt: "Slide 1",
      title: "Professional Services",
      subtitle: "Hire experts for any home or personal service.",
      badge: "Top Rated",
      cta: { href: "/services", label: "Explore Services" }
    },
    {
      image: "/images/Carousel/img2.jpeg",
      alt: "Slide 2",
      title: "Verified Providers",
      subtitle: "All service providers are pre-verified and trusted.",
      badge: "Verified",
      cta: { href: "/services", label: "Find Providers" }
    },
    {
      image: "/images/Carousel/img3.jpeg",
      alt: "Slide 3",
      title: "Easy Booking",
      subtitle: "Book a trusted worker in seconds — hassle free.",
      badge: "Fast Booking",
      cta: { href: "/services", label: "Book Now" }
    },
    {
      image: "/images/Carousel/img4.jpeg",
      alt: "Slide 4",
      title: "Affordable Pricing",
      subtitle: "Transparent pricing with no hidden charges.",
      badge: "Affordable",
      cta: { href: "/services", label: "View Pricing" }
    },
    {
      image: "/images/Carousel/img5.jpeg",
      alt: "Slide 5",
      title: "Trusted By Thousands",
      subtitle: "Your satisfaction is our top priority.",
      badge: "Trusted",
      cta: { href: "/services", label: "Get Started" }
    },
  ];

  return (
    <div className="min-h-screen">
      {/* NAVBAR */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo + Name */}
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="Madat Mitra Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-2xl font-bold tracking-wide">Madat_Mitra</span>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 font-medium">
            <Link href="/" className="hover:text-primary">Home</Link>
            <Link href="/services" className="hover:text-primary">Services</Link>
            <Link href="/about" className="hover:text-primary">About Us</Link>
            <Link href="/login" className="hover:text-primary">Login</Link>

            <Button asChild className="px-6 rounded-full bg-primary text-white hover:bg-primary/90">
              <Link href="/register">Get Started</Link>
            </Button>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <span className="relative">
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                <span>🔔</span>
              </span>
            </Button>

            <Button variant="outline" asChild className="rounded-full px-5">
              <Link href="/admin/login">Admin</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* HERO + CAROUSEL */}
      <section className="relative py-10 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <CarouselClient slides={slides} />
        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Link key={service.slug} href={`/services/${service.slug}`}>
                  <div className="bg-gray-50 hover:bg-gray-100 shadow-sm hover:shadow-xl rounded-xl p-8 text-center border cursor-pointer">
                    <Icon className="w-14 h-14 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold text-xl">{service.name}</h3>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* SPECIAL OCCASIONS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Special Occasions</h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            We cater to all kinds of occasions with our professional services
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Birthday Party Column */}
            <Card className="shadow-md border hover:shadow-xl transition rounded-xl">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎂</span>
                </div>
                <CardTitle className="text-xl">Birthday Party</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg py-2 px-4 hover:bg-pink-50 transition-colors cursor-pointer">
                    <span className="text-sm font-medium">House Party</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg py-2 px-4 hover:bg-pink-50 transition-colors cursor-pointer">
                    <span className="text-sm font-medium">Inviting Guests</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg py-2 px-4 hover:bg-pink-50 transition-colors cursor-pointer">
                    <span className="text-sm font-medium">Pooja Ceremony</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Anniversary Column */}
            <Card className="shadow-md border hover:shadow-xl transition rounded-xl">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💝</span>
                </div>
                <CardTitle className="text-xl">Anniversary</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg py-2 px-4 hover:bg-blue-50 transition-colors cursor-pointer">
                    <span className="text-sm font-medium">Baby Shower</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg py-2 px-4 hover:bg-blue-50 transition-colors cursor-pointer">
                    <span className="text-sm font-medium">House Warming</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg py-2 px-4 hover:bg-blue-50 transition-colors cursor-pointer">
                    <span className="text-sm font-medium">Kitty Party</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* High Tea Column */}
            <Card className="shadow-md border hover:shadow-xl transition rounded-xl">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">☕</span>
                </div>
                <CardTitle className="text-xl">High Tea</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg py-2 px-4 hover:bg-green-50 transition-colors cursor-pointer">
                    <span className="text-sm font-medium">Corporate Event</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg py-2 px-4 hover:bg-green-50 transition-colors cursor-pointer">
                    <span className="text-sm font-medium">Weekend Call</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg py-2 px-4 hover:bg-green-50 transition-colors cursor-pointer">
                    <span className="text-sm font-medium">Other Occasion</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-12">
            <Card className="shadow-md border hover:shadow-xl transition rounded-xl">
              <CardHeader>
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mb-4">
                  <Search className="w-7 h-7 text-white" />
                </div>
                <CardTitle>1. Search</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Find service providers near your location with real-time availability.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-md border hover:shadow-xl transition rounded-xl">
              <CardHeader>
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <CardTitle>2. Book</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Choose convenient time slots and confirm your booking.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-md border hover:shadow-xl transition rounded-xl">
              <CardHeader>
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <CardTitle>3. Service Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Provider arrives at your location and completes the service.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* TRUST & SAFETY */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Trust & Safety</h2>

          <div className="grid md:grid-cols-3 gap-12">
            <Card className="shadow-md border hover:shadow-xl transition p-6 rounded-xl">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-6 h-6 text-primary" />
                  <CardTitle>Udyam Verification</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All providers are verified using Udyam Aadhaar.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-md border hover:shadow-xl transition p-6 rounded-xl">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-6 h-6 text-primary" />
                  <CardTitle>Secure Payments</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All transactions are encrypted and fully secure.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-md border hover:shadow-xl transition p-6 rounded-xl">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <UserCheck className="w-6 h-6 text-primary" />
                  <CardTitle>Verified Profiles</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Providers complete identity verification for trust & safety.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">About Us</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Madat_Mitra connects customers with verified service providers. Our mission is to make professional services accessible, convenient, and trusted by offering quality service booking.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-14">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Madat_Mitra</span>
            </div>
            <p className="text-gray-400">Your trusted platform for professional services.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/services" className="hover:text-white">Services</Link></li>
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/register" className="hover:text-white">Become a Provider</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: support@madatmitra.com</li>
              <li>Phone:</li>
              <li>Address:</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="text-center text-gray-500 mt-10">
          &copy; 2025 Madat_Mitra. All rights reserved.
        </div>
      </footer>
    </div>
  )
}