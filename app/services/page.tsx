"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Wrench, Home, Sprout, Star, MapPin, Clock, Users, Loader2, CheckCircle, XCircle } from "lucide-react";

// Types for your actual data structure
interface ServiceProvider {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  experience: string;
  rating: number;
  hourlyRate: number;
  location: string;
  description: string;
  isAvailable: boolean;
  profileImage?: string;
  specialties?: string[];
  // Add other fields from your database
}

interface ServiceCategory {
  name: string;
  icon: any;
  slug: string;
  description: string;
  color: string;
  count: string;
}

const serviceCategories: ServiceCategory[] = [
  {
    name: "Cook",
    icon: ChefHat,
    slug: "cook",
    description: "Professional cooking services for all occasions",
    color: "from-orange-500 to-red-500",
    count: "Loading..."
  },
  {
    name: "Electrician",
    icon: Wrench,
    slug: "electrician",
    description: "Electrical repairs & installations",
    color: "from-blue-500 to-cyan-500",
    count: "Loading..."
  },
  {
    name: "House Maid",
    icon: Home,
    slug: "house-maid",
    description: "Complete house cleaning services",
    color: "from-green-500 to-emerald-500",
    count: "Loading..."
  },
  {
    name: "Gardener",
    icon: Sprout,
    slug: "gardener",
    description: "Garden maintenance & care",
    color: "from-lime-500 to-green-500",
    count: "Loading..."
  }
];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("cook");
  const [showProviders, setShowProviders] = useState(false);
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(serviceCategories);
  const [error, setError] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState<"checking" | "connected" | "error">("checking");

  // Your actual backend configuration
  const backendBaseURL = "http://localhost:5000"; // Your Express backend port
  const providersEndpoint = "/api/provider"; // Your actual endpoint

  // Test backend connection
  const testBackendConnection = async () => {
    try {
      setBackendStatus("checking");
      console.log(`Testing backend: ${backendBaseURL}${providersEndpoint}`);
      
      const response = await fetch(`${backendBaseURL}${providersEndpoint}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("Backend connected successfully:", data);
      setBackendStatus("connected");
      return data;
    } catch (err) {
      console.error("Backend connection failed:", err);
      setBackendStatus("error");
      setError(`Cannot connect to backend: ${err.message}. Make sure your Express server is running on port 5000.`);
      throw err;
    }
  };

  // Fetch providers from YOUR actual backend
  const fetchProviders = async (category?: string) => {
    try {
      setLoading(true);
      setError(null);

      console.log(`Fetching providers from: ${backendBaseURL}${providersEndpoint}`);
      const response = await fetch(`${backendBaseURL}${providersEndpoint}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch providers: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("Raw backend data:", data);

      // Process the data based on your actual API response structure
      let providersData: ServiceProvider[] = [];

      if (Array.isArray(data)) {
        // If response is directly an array
        providersData = data;
      } else if (data.data && Array.isArray(data.data)) {
        // If response is { data: [...] }
        providersData = data.data;
      } else if (data.providers && Array.isArray(data.providers)) {
        // If response is { providers: [...] }
        providersData = data.providers;
      } else {
        // If it's a single object, wrap in array
        providersData = [data];
      }

      console.log("Processed providers:", providersData);
      setProviders(providersData);

      // Update category counts based on actual data
      updateCategoryCounts(providersData);

    } catch (err: any) {
      setError(`Failed to load providers: ${err.message}`);
      console.error('Error fetching providers:', err);
      
      // Fallback to mock data for demonstration
      console.log('Using mock data as fallback');
      setProviders(getMockProviders(category));
    } finally {
      setLoading(false);
    }
  };

  const updateCategoryCounts = (providersData: ServiceProvider[]) => {
    const categoryCounts = {
      cook: providersData.filter(p => 
        p.serviceType?.toLowerCase().includes('cook') || 
        p.serviceType?.toLowerCase().includes('chef')
      ).length,
      electrician: providersData.filter(p => 
        p.serviceType?.toLowerCase().includes('electric')
      ).length,
      'house-maid': providersData.filter(p => 
        p.serviceType?.toLowerCase().includes('maid') || 
        p.serviceType?.toLowerCase().includes('clean')
      ).length,
      gardener: providersData.filter(p => 
        p.serviceType?.toLowerCase().includes('garden')
      ).length,
    };

    setCategories(prevCategories => 
      prevCategories.map(cat => ({
        ...cat,
        count: `${categoryCounts[cat.slug as keyof typeof categoryCounts] || 0}+ Providers`
      }))
    );
  };

  // Mock data fallback
  const getMockProviders = (category?: string): ServiceProvider[] => {
    const mockData: ServiceProvider[] = [
      {
        id: '1',
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        phone: '+91-9876543210',
        serviceType: 'cook',
        experience: '8 years',
        rating: 4.8,
        hourlyRate: 500,
        location: 'South Delhi',
        description: 'Professional cook specializing in North Indian cuisine',
        isAvailable: true,
        specialties: ['North Indian', 'South Indian', 'Continental']
      },
      {
        id: '2',
        name: 'Vikram Mehta',
        email: 'vikram@example.com',
        phone: '+91-9876543211',
        serviceType: 'electrician',
        experience: '12 years',
        rating: 4.9,
        hourlyRate: 300,
        location: 'Central Delhi',
        description: 'Licensed electrician with industrial experience',
        isAvailable: true,
        specialties: ['Wiring', 'Switch Repair', 'Panel Installation']
      }
    ];
    
    return category ? mockData.filter(p => p.serviceType === category) : mockData;
  };

  // Test connection on component mount
  useEffect(() => {
    testBackendConnection().then(() => {
      fetchProviders();
    });
  }, []);

  const handleCategoryClick = async (slug: string) => {
    setSelectedCategory(slug);
    setShowProviders(true);
    await fetchProviders(slug);
  };

  const currentProviders = providers.filter(provider => 
    provider.serviceType?.toLowerCase().includes(selectedCategory) ||
    selectedCategory === 'cook' && provider.serviceType?.toLowerCase().includes('cook') ||
    selectedCategory === 'electrician' && provider.serviceType?.toLowerCase().includes('electric') ||
    selectedCategory === 'house-maid' && (provider.serviceType?.toLowerCase().includes('maid') || provider.serviceType?.toLowerCase().includes('clean')) ||
    selectedCategory === 'gardener' && provider.serviceType?.toLowerCase().includes('garden')
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Our Services</h1>
              <p className="text-gray-600 mt-2">Choose from our verified service providers</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Backend Status */}
        <div className={`mb-6 p-4 rounded-lg border ${
          backendStatus === 'connected' ? 'bg-green-50 border-green-200 text-green-700' :
          backendStatus === 'error' ? 'bg-red-50 border-red-200 text-red-700' :
          'bg-blue-50 border-blue-200 text-blue-700'
        }`}>
          <div className="flex items-center gap-3">
            {backendStatus === 'connected' && <CheckCircle className="w-5 h-5" />}
            {backendStatus === 'error' && <XCircle className="w-5 h-5" />}
            {backendStatus === 'checking' && <Loader2 className="w-5 h-5 animate-spin" />}
            
            <div>
              <strong>Backend Status: </strong>
              {backendStatus === 'connected' && 'Connected to Express Server ✅'}
              {backendStatus === 'error' && 'Connection Failed ❌'}
              {backendStatus === 'checking' && 'Checking connection...'}
              
              {backendStatus === 'connected' && (
                <div className="text-sm mt-1">
                  Successfully connected to: {backendBaseURL}{providersEndpoint}
                </div>
              )}
              {backendStatus === 'error' && (
                <div className="text-sm mt-1">
                  Make sure your Express server is running on port 5000
                </div>
              )}
            </div>
            
            {(backendStatus === 'error' || backendStatus === 'connected') && (
              <Button 
                onClick={() => testBackendConnection().then(() => fetchProviders())} 
                variant="outline" 
                size="sm"
                className="ml-auto"
              >
                Retry Connection
              </Button>
            )}
          </div>
        </div>

        {/* Service Categories */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Service Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.slug;
              
              return (
                <div
                  key={category.slug}
                  onClick={() => handleCategoryClick(category.slug)}
                  className={`group relative bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl border-2 ${
                    isSelected ? 'border-blue-500' : 'border-gray-100'
                  } overflow-hidden`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  <div className="relative mb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} p-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="text-center relative z-10">
                    <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                      {category.description}
                    </p>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      {category.count}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Service Providers */}
        {showProviders && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {categories.find(cat => cat.slug === selectedCategory)?.name} Providers
                </h2>
                <p className="text-gray-600 mt-2">
                  {backendStatus === 'connected' ? 'Real data from your backend' : 'Using demo data'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="text-lg px-4 py-2">
                  {loading ? "Loading..." : `${currentProviders.length} Providers Available`}
                </Badge>
                <Button 
                  onClick={() => fetchProviders(selectedCategory)} 
                  variant="outline" 
                  size="sm"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Refresh"}
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                <span className="ml-2 text-gray-600">Loading providers...</span>
              </div>
            ) : currentProviders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {currentProviders.map((provider) => (
                  <Card key={provider.id} className="hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                            {provider.profileImage ? (
                              <img 
                                src={`${backendBaseURL}/uploads/${provider.profileImage}`} 
                                alt={provider.name}
                                className="w-16 h-16 rounded-full object-cover"
                              />
                            ) : (
                              <Users className="w-8 h-8 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <CardTitle className="text-xl">{provider.name}</CardTitle>
                            <CardDescription className="flex items-center gap-1 mt-1">
                              <MapPin className="w-4 h-4" />
                              {provider.location}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant={provider.isAvailable ? "default" : "secondary"}>
                          {provider.isAvailable ? "Available" : "Busy"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-semibold">{provider.rating}</span>
                            <span className="text-gray-500">reviews</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{provider.experience}</span>
                          </div>
                        </div>

                        {provider.specialties && provider.specialties.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Specialties:</h4>
                            <div className="flex flex-wrap gap-2">
                              {provider.specialties.map((specialty, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="text-sm text-gray-600">
                          {provider.description}
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-2xl font-bold text-green-600">
                            ₹{provider.hourlyRate}/hour
                          </span>
                          <Button disabled={!provider.isAvailable}>
                            {provider.isAvailable ? "Book Now" : "Not Available"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Providers Available</h3>
                <p className="text-gray-600 mb-4">
                  {backendStatus === 'connected' 
                    ? 'No providers found in your database for this category.'
                    : 'No demo providers available for this category.'
                  }
                </p>
                <Button onClick={() => fetchProviders(selectedCategory)} variant="outline">
                  Check Again
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!showProviders && !loading && (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Select a Service Category</h3>
              <p className="text-gray-600 mb-6">
                Click on any service category above to view available providers from your backend.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}