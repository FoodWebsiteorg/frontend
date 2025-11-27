"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Award, Users, Star, Clock, Phone, Mail, MapPin, Linkedin, Twitter } from "lucide-react";

const teamMembers = [
  {
    name: "Harshada Pithale",
    role: "Founder & CEO",
    experience: "2+ years in service industry",
    description: "Passionate about revolutionizing the service industry through technology and trust.",
    image: "/images/team/ceo.jpg",
    specialties: ["Business Strategy", "Technology", "Customer Experience"]
  },
  {
    name: "Janvi Kawhale",
    role: "Head of Operations",
    experience: "1+ years in operations management",
    description: "Ensuring seamless service delivery and customer satisfaction across all platforms.",
    image: "/images/team/operations.jpg",
    specialties: ["Process Optimization", "Quality Control", "Team Management"]
  },
  {
    name: "Ketki Kulkarni",
    role: "Technology Lead",
    experience: "1+ years in software development",
    description: "Building robust and scalable technology solutions for better user experiences.",
    image: "/images/team/tech.jpg",
    specialties: ["Full Stack Development", "System Architecture", "Security"]
  },
  {
    name: "Pranali Kharat",
    role: "Customer Success Manager",
    experience: "1+ years in customer relations",
    description: "Dedicated to ensuring every customer has the best experience with our platform.",
    image: "/images/team/customer.jpg",
    specialties: ["Customer Support", "Relationship Building", "Feedback Analysis"]
  }
];

const stats = [
  { number: "100+", label: "Happy Customers", icon: Users },
  { number: "100+", label: "Verified Providers", icon: Users },
  { number: "4.9/5", label: "Customer Rating", icon: Star },
  { number: "24/7", label: "Support Available", icon: Clock }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">About Madat Mitra</h1>
              <p className="text-gray-600 mt-2">Your trusted partner in professional services</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                Our Story
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                Revolutionizing Service Industry with Trust & Technology
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Madat Mitra was founded with a simple yet powerful vision: to create a platform where 
                customers can find reliable, verified service providers for all their needs, and where 
                service professionals can grow their business with dignity and fair compensation.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We understand the challenges of finding trustworthy service providers in today's fast-paced 
                world. That's why we've built a comprehensive verification system, transparent pricing, 
                and a customer-first approach that sets new standards in the service industry.
              </p>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-100">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="bg-blue-50 rounded-xl p-4 text-center">
                        <Icon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-blue-100">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-8 h-8 text-blue-500" />
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </div>
                <CardDescription className="text-lg">
                  To empower both service providers and customers through technology, creating a 
                  seamless and trustworthy service ecosystem that benefits everyone involved.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Provide verified and reliable service providers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Ensure fair compensation for service professionals
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Deliver exceptional customer experiences
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-100">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-8 h-8 text-green-500" />
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </div>
                <CardDescription className="text-lg">
                  To become the most trusted platform for service bookings, setting new standards 
                  in quality, reliability, and customer satisfaction across India.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Expand to 100+ cities across India
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Serve 1 million+ happy customers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Create 50,000+ employment opportunities
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals working together to make Madat Mitra the most trusted 
              service platform in the country.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-10 h-10 text-gray-400" />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="font-semibold text-primary">
                    {member.role}
                  </CardDescription>
                  <Badge variant="outline" className="mt-2">
                    {member.experience}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4 text-sm">
                    {member.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-700">Specialties:</h4>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These core values guide everything we do at Madat Mitra
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Trust & Safety</h3>
                <p className="text-gray-600">
                  Every service provider undergoes rigorous verification to ensure your complete safety and peace of mind.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Quality First</h3>
                <p className="text-gray-600">
                  We maintain high standards of service quality through continuous monitoring and customer feedback.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Customer First</h3>
                <p className="text-gray-600">
                  Your satisfaction is our top priority. We're always here to help and improve your experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section>
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-gray-900">Get In Touch</CardTitle>
              <CardDescription className="text-lg">
                We'd love to hear from you. Here's how you can reach us.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                  <Phone className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                  <p className="text-gray-600">+91-7720968991</p>
                </div>
                <div className="flex flex-col items-center">
                  <Mail className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                  <p className="text-gray-600">support@madatmitra.com</p>
                </div>
                <div className="flex flex-col items-center">
                  <MapPin className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                  <p className="text-gray-600">Across India</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}