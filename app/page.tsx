"use client";
import React, { useState } from "react";
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
  Star,
  Users,
  Target,
  Award,
  Clock,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Bell,
  MessageCircle,
} from "lucide-react";

const services = [
  { name: "Cook", icon: ChefHat, slug: "cook", description: "Professional cooking services", color: "from-orange-500 to-red-500" },
  { name: "Electrician", icon: Wrench, slug: "electrician", description: "Electrical repairs & installations", color: "from-blue-500 to-cyan-500" },
  { name: "House Maid", icon: Home, slug: "house-maid", description: "Complete house cleaning", color: "from-green-500 to-emerald-500" },
  { name: "Gardener", icon: Sprout, slug: "gardener", description: "Garden maintenance & care", color: "from-lime-500 to-green-500" },
  { name: "Cleaner", icon: Sparkles, slug: "cleaner", description: "Deep cleaning services", color: "from-purple-500 to-pink-500" },
  { name: "Pet Care", icon: Heart, slug: "pet-care", description: "Pet sitting & grooming", color: "from-rose-500 to-red-500" },
  { name: "Driver", icon: Car, slug: "driver", description: "Professional driving services", color: "from-indigo-500 to-blue-500" },
];

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const specialOccasions = [
    {
      title: "Birthday Party",
      image: "/images/occasions/birthday.jpg",
      services: ["House Party", "Inviting Guests", "Pooja Ceremony"],
      gradient: "from-pink-500 to-purple-600",
      overlay: "rgba(147, 51, 234, 0.8)"
    },
    {
      title: "Anniversary",
      image: "/images/occasions/anniversary.jpg",
      services: ["Baby Shower", "House Warming", "Kitty Party"],
      gradient: "from-blue-500 to-cyan-600",
      overlay: "rgba(6, 182, 212, 0.8)"
    },
    {
      title: "High Tea",
      image: "/images/occasions/high-tea.jpg",
      services: ["Corporate Event", "Weekend Call", "Other Occasion"],
      gradient: "from-green-500 to-emerald-600",
      overlay: "rgba(16, 185, 129, 0.8)"
    }
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Search & Discover",
      description: "Find verified service providers near your location with real-time availability and ratings.",
      icon: Search,
      color: "from-blue-500 to-cyan-500",
      features: ["Real-time availability", "Customer reviews", "Price comparison"]
    },
    {
      step: "02",
      title: "Book Instantly",
      description: "Choose your preferred time slot and confirm booking with secure payment options.",
      icon: Calendar,
      color: "from-purple-500 to-pink-500",
      features: ["Flexible scheduling", "Secure payments", "Instant confirmation"]
    },
    {
      step: "03",
      title: "Service Delivered",
      description: "Professional arrives at your doorstep and completes the service to your satisfaction.",
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
      features: ["Quality guaranteed", "On-time service", "Satisfaction assurance"]
    }
  ];

  const trustFeatures = [
    {
      title: "Udyam Verified",
      description: "All providers undergo rigorous Udyam Aadhaar verification for complete trust and safety.",
      icon: Shield,
      stats: "10K+ Verified",
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Secure Payments",
      description: "End-to-end encrypted transactions with multiple payment options and refund protection.",
      icon: CreditCard,
      stats: "100% Secure",
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Background Checked",
      description: "Comprehensive identity verification and background checks for every service provider.",
      icon: UserCheck,
      stats: "5-Step Verification",
      color: "from-purple-500 to-pink-600"
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers", icon: Users },
    { number: "10K+", label: "Verified Providers", icon: UserCheck },
    { number: "95%", label: "Satisfaction Rate", icon: Star },
    { number: "24/7", label: "Customer Support", icon: Clock }
  ];

  return (
    <div className="min-h-screen">
      {/* ENHANCED NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Logo Section - Enhanced */}
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <img
                    src="/images/logo.png"
                    alt="Madat Mitra Logo"
                    className="w-14 h-14 object-contain filter brightness-0 invert"
                  />
                </div>
                {/* Animated Ring */}
                <div className="absolute inset-0 border-2 border-blue-300 rounded-2xl opacity-0 group-hover:opacity-100 animate-ping-slow"></div>
              </div>
              
              {/* Brand Name with Enhanced Typography */}
              <div className="flex flex-col">
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Madat_Mitra
                </span>
                <span className="text-xs text-gray-500 font-medium tracking-wider">
                  TRUSTED SERVICE PARTNER
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Enhanced */}
            <nav className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-8 font-medium">
                <Link 
                  href="/" 
                  className="relative text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2 group/nav"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover/nav:w-full transition-all duration-300"></span>
                </Link>
                <Link 
                  href="/services" 
                  className="relative text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2 group/nav"
                >
                  Services
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover/nav:w-full transition-all duration-300"></span>
                </Link>
                <Link 
                  href="/about" 
                  className="relative text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2 group/nav"
                >
                  About Us
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover/nav:w-full transition-all duration-300"></span>
                </Link>
              </div>

              {/* Auth Buttons */}
              <div className="flex items-center gap-4 ml-4">
                <Link 
                  href="/login" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
                >
                  Login
                </Link>
                <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md">
              <div className="flex flex-col space-y-4">
                <Link 
                  href="/" 
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/services" 
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
                <Link 
                  href="/about" 
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <Link 
                    href="/login" 
                    className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full">
                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* HERO + CAROUSEL */}
      <section className="relative py-10 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <CarouselClient slides={slides} />
        </div>
      </section>

      {/* ENHANCED POPULAR CATEGORIES SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our wide range of professional services tailored to meet your every need
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={service.slug} className="group relative bg-white rounded-2xl p-6 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden">
                  {/* Background Gradient Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine"></div>
                  
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${service.color} p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 flex items-center justify-center`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    {/* Floating dots decoration */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
                    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200"></div>
                  </div>

                  {/* Content */}
                  <div className="text-center relative z-10">
                    <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Static CTA - Not Clickable */}
                    <div className="flex items-center justify-center text-primary font-semibold text-sm">
                      <span>Explore</span>
                    </div>
                  </div>

                  {/* Background Pattern */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                    <div className="w-full h-full bg-current rounded-full"></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
          </div>
        </div>
      </section>

      {/* ENHANCED SPECIAL OCCASIONS WITH IMAGES */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Special Occasions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Make your special moments unforgettable with our dedicated occasion services
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {specialOccasions.map((occasion, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-96"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${occasion.image}')` }}
                >
                  {/* Gradient Overlay */}
                  <div 
                    className="absolute inset-0 transition-all duration-500 group-hover:opacity-90"
                    style={{ 
                      background: `linear-gradient(135deg, ${occasion.overlay}, rgba(0,0,0,0.7))`
                    }}
                  ></div>
                </div>

                {/* Content */}
                <div className="relative h-full p-8 flex flex-col justify-end text-white z-10">
                  {/* Top Badge */}
                  <div className="absolute top-6 right-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold">
                      Special Offer
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4 group-hover:translate-x-2 transition-transform duration-300">
                    {occasion.title}
                  </h3>

                  {/* Services List */}
                  <div className="space-y-3">
                    {occasion.services.map((service, serviceIndex) => (
                      <div 
                        key={serviceIndex}
                        className="flex items-center gap-3 text-white/90 hover:text-white transition-all duration-300 group-hover:translate-x-2"
                        style={{ transitionDelay: `${serviceIndex * 100}ms` }}
                      >
                        <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                        <span className="text-sm font-medium">{service}</span>
                      </div>
                    ))}
                  </div>

                  {/* Static Button - Not Clickable */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                    <Button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold rounded-full px-6 cursor-default">
                      Book Now
                    </Button>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-all duration-500"></div>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? We customize services for any occasion!
            </p>
          </div>
        </div>
      </section>

      {/* ENHANCED HOW IT WORKS SECTION */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get your services delivered in just three simple steps - quick, easy, and hassle-free
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-24 left-1/4 right-1/4 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-y-1/2 z-0"></div>
            
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative z-10">
                  <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-8 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {step.step}
                    </div>

                    {/* Icon Container */}
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} p-4 mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{step.description}</p>

                    {/* Features List */}
                    <div className="space-y-3">
                      {step.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3 text-sm text-gray-700">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-all duration-300"></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-6">Join thousands of satisfied customers today</p>
              <Button asChild className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/register">
                  Book Your First Service
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ENHANCED TRUST & SAFETY SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trust & Safety</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your safety and satisfaction are our top priorities. We go above and beyond to ensure every interaction is secure and reliable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {trustFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group">
                  <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    
                    {/* Icon & Stats */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{feature.stats}</div>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{feature.description}</p>

                    {/* Static Text - Not Clickable */}
                    <div className="flex items-center text-primary font-semibold text-sm">
                      <span>Learn More</span>
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gray-100 to-transparent rounded-bl-2xl"></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust Badges */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="group">
                    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                      <Icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                      <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                      <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ENHANCED ABOUT US SECTION */}
      <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <div className="space-y-8">
              <div>
                <Badge className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  About Madat_Mitra
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Revolutionizing Service Industry with Trust & Technology
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Madat_Mitra is your trusted partner in connecting customers with verified service providers. 
                  We're on a mission to make professional services accessible, convenient, and reliable for everyone.
                </p>
              </div>

              {/* Mission & Vision */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <Target className="w-10 h-10 text-blue-500 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
                  <p className="text-gray-600">
                    To empower both service providers and customers through technology, creating a seamless and trustworthy service ecosystem.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <Award className="w-10 h-10 text-green-500 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
                  <p className="text-gray-600">
                    To become the most trusted platform for service bookings, setting new standards in quality and reliability.
                  </p>
                </div>
              </div>

              {/* Static Button - Not Clickable */}
              <div className="flex flex-wrap gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full cursor-default">
                  Learn More About Us
                </Button>
              </div>
            </div>

            {/* Visual Side */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-100">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                      <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">50K+</div>
                      <div className="text-sm text-gray-600">Happy Customers</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 text-center">
                      <UserCheck className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">10K+</div>
                      <div className="text-sm text-gray-600">Verified Providers</div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-purple-50 rounded-xl p-4 text-center">
                      <Star className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                      <div className="text-sm text-gray-600">Customer Rating</div>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-4 text-center">
                      <Clock className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">24/7</div>
                      <div className="text-sm text-gray-600">Support Available</div>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Phone className="w-5 h-5 text-primary" />
                      <span>+91-7720968991</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Mail className="w-5 h-5 text-primary" />
                      <span>support@madatmitra.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span>Across India</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Decoration */}
              <div className="absolute -z-10 top-4 left-4 w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl"></div>
            </div>
          </div>
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
              <li>Phone: +91-7720968991</li>
              <li>Address: Across India</li>
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