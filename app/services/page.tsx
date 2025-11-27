// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { ChefHat, Wrench, Home, Sprout, Star, MapPin, Clock, Users, Loader2, CheckCircle, XCircle } from "lucide-react";

// // Types for your actual data structure
// interface Service {
//   serviceId: string;
//   title: string;
//   description: string;
//   price: number;
//   duration: string;
//   availableDays: string;
//   locationRadius: number;
// }

// interface ServiceProvider {
//   providerId: string;
//   providerName: string;
//   providerEmail: string;
//   providerMobile: string;
//   providerCategory: string;
//   providerExperience: string;
//   providerOverview?: string;
//   services: Service[];
// }

// interface ServiceCategory {
//   name: string;
//   icon: any;
//   slug: string;
//   description: string;
//   color: string;
//   count: string;
// }

// const serviceCategories: ServiceCategory[] = [
//   {
//     name: "Cook",
//     icon: ChefHat,
//     slug: "Cook",
//     description: "Professional cooking services for all occasions",
//     color: "from-orange-500 to-red-500",
//     count: "Loading..."
//   },
//   {
//     name: "Electrician",
//     icon: Wrench,
//     slug: "Electrician",
//     description: "Electrical repairs & installations",
//     color: "from-blue-500 to-cyan-500",
//     count: "Loading..."
//   },
//   {
//     name: "House maid",
//     icon: Home,
//     slug: "House maid",
//     description: "Complete house cleaning services",
//     color: "from-green-500 to-emerald-500",
//     count: "Loading..."
//   },
//   {
//     name: "Gardener",
//     icon: Sprout,
//     slug: "Gardener",
//     description: "Garden maintenance & care",
//     color: "from-lime-500 to-green-500",
//     count: "Loading..."
//   }
// ];

// export default function ServicesPage() {
//   const [selectedCategory, setSelectedCategory] = useState("Cook");
//   const [showProviders, setShowProviders] = useState(false);
//   const [providers, setProviders] = useState<ServiceProvider[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState(serviceCategories);
//   const [error, setError] = useState<string | null>(null);
//   const [backendStatus, setBackendStatus] = useState<"checking" | "connected" | "error">("checking");

//   // Test backend connection
//   const testBackendConnection = async () => {
//     try {
//       setBackendStatus("checking");
      
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/provider/category/services?category=${encodeURIComponent(selectedCategory)}`);
      
//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//       }
      
//       const data = await response.json();
//       console.log("Backend connected successfully:", data);
//       setBackendStatus("connected");
//       return data;
//     } catch (err: any) {
//       console.error("Backend connection failed:", err);
//       setBackendStatus("error");
//       setError(`Cannot connect to backend: ${err.message}. Make sure your Express server is running.`);
//       throw err;
//     }
//   };

//   // Fetch providers from backend based on category
//   const fetchProviders = async (category: string) => {
//     try {
//       setLoading(true);
//       setError(null);

//       console.log(`Fetching providers for category: ${category}`);
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/provider/category/services?category=${encodeURIComponent(category)}`);
      
//       if (!response.ok) {
//         throw new Error(`Failed to fetch providers: ${response.status} ${response.statusText}`);
//       }
      
//       const data = await response.json();
//       console.log("Raw backend data:", data);

//       // Process the data based on the API response structure
//       const providersData: ServiceProvider[] = data.providers || [];

//       console.log("Processed providers:", providersData);
//       setProviders(providersData);

//     } catch (err: any) {
//       setError(`Failed to load providers: ${err.message}`);
//       console.error('Error fetching providers:', err);
//       setProviders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch counts for all categories
//   const fetchCategoryCounts = async () => {
//     const updatedCategories = await Promise.all(
//       serviceCategories.map(async (cat) => {
//         try {
//           const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/provider/category/services?category=${encodeURIComponent(cat.slug)}`);
//           if (response.ok) {
//             const data = await response.json();
//             const count = data.providers?.length || 0;
//             return { ...cat, count: `${count} Provider${count !== 1 ? 's' : ''}` };
//           }
//         } catch (error) {
//           console.error(`Failed to fetch count for ${cat.slug}:`, error);
//         }
//         return { ...cat, count: "0 Providers" };
//       })
//     );
//     setCategories(updatedCategories);
//   };

//   // Test connection and fetch initial data on component mount
//   useEffect(() => {
//     testBackendConnection().then(() => {
//       fetchProviders(selectedCategory);
//       fetchCategoryCounts();
//     }).catch(() => {
//       // Connection failed, but we still try to fetch
//       fetchProviders(selectedCategory);
//     });
//   }, []);

//   const handleCategoryClick = async (slug: string) => {
//     setSelectedCategory(slug);
//     setShowProviders(true);
//     await fetchProviders(slug);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="container mx-auto px-4 py-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-4xl font-bold text-gray-900">Our Services</h1>
//               <p className="text-gray-600 mt-2">Choose from our verified service providers</p>
//             </div>
//             <Button asChild variant="outline">
//               <Link href="/">Back to Home</Link>
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         {/* Backend Status */}
//         <div className={`mb-6 p-4 rounded-lg border ${
//           backendStatus === 'connected' ? 'bg-green-50 border-green-200 text-green-700' :
//           backendStatus === 'error' ? 'bg-red-50 border-red-200 text-red-700' :
//           'bg-blue-50 border-blue-200 text-blue-700'
//         }`}>
//           <div className="flex items-center gap-3">
//             {backendStatus === 'connected' && <CheckCircle className="w-5 h-5" />}
//             {backendStatus === 'error' && <XCircle className="w-5 h-5" />}
//             {backendStatus === 'checking' && <Loader2 className="w-5 h-5 animate-spin" />}
            
//             <div>
//               <strong>Backend Status: </strong>
//               {backendStatus === 'connected' && 'Connected to Express Server ✅'}
//               {backendStatus === 'error' && 'Connection Failed ❌'}
//               {backendStatus === 'checking' && 'Checking connection...'}
              
//               {backendStatus === 'error' && (
//                 <div className="text-sm mt-1">
//                   Make sure your Express server is running
//                 </div>
//               )}
//             </div>
            
//             {(backendStatus === 'error' || backendStatus === 'connected') && (
//               <Button 
//                 onClick={() => testBackendConnection().then(() => {
//                   fetchProviders(selectedCategory);
//                   fetchCategoryCounts();
//                 })} 
//                 variant="outline" 
//                 size="sm"
//                 className="ml-auto"
//               >
//                 Retry Connection
//               </Button>
//             )}
//           </div>
//         </div>

//         {/* Service Categories */}
//         <div className="mb-12">
//           <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
//             Service Categories
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {categories.map((category) => {
//               const Icon = category.icon;
//               const isSelected = selectedCategory === category.slug;
              
//               return (
//                 <div
//                   key={category.slug}
//                   onClick={() => handleCategoryClick(category.slug)}
//                   className={`group relative bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl border-2 ${
//                     isSelected ? 'border-blue-500' : 'border-gray-100'
//                   } overflow-hidden`}
//                 >
//                   <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
//                   <div className="relative mb-4">
//                     <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} p-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 flex items-center justify-center`}>
//                       <Icon className="w-8 h-8 text-white" />
//                     </div>
//                   </div>

//                   <div className="text-center relative z-10">
//                     <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
//                       {category.name}
//                     </h3>
//                     <p className="text-sm text-gray-600 mb-3 leading-relaxed">
//                       {category.description}
//                     </p>
//                     <Badge variant="secondary" className="bg-blue-100 text-blue-700">
//                       {category.count}
//                     </Badge>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
//             {error}
//           </div>
//         )}

//         {/* Service Providers */}
//         {showProviders && (
//           <div className="bg-white rounded-2xl shadow-lg p-8">
//             <div className="flex items-center justify-between mb-8">
//               <div>
//                 <h2 className="text-3xl font-bold text-gray-900">
//                   {categories.find(cat => cat.slug === selectedCategory)?.name} Providers
//                 </h2>
//                 <p className="text-gray-600 mt-2">
//                   {backendStatus === 'connected' ? 'Real data from your backend' : 'Checking backend connection...'}
//                 </p>
//               </div>
//               <div className="flex items-center gap-4">
//                 <Badge variant="outline" className="text-lg px-4 py-2">
//                   {loading ? "Loading..." : `${providers.length} Provider${providers.length !== 1 ? 's' : ''} Available`}
//                 </Badge>
//                 <Button 
//                   onClick={() => fetchProviders(selectedCategory)} 
//                   variant="outline" 
//                   size="sm"
//                   disabled={loading}
//                 >
//                   {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Refresh"}
//                 </Button>
//               </div>
//             </div>

//             {loading ? (
//               <div className="flex justify-center items-center py-12">
//                 <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
//                 <span className="ml-2 text-gray-600">Loading providers...</span>
//               </div>
//             ) : providers.length > 0 ? (
//               <div className="grid grid-cols-1 gap-6">
//                 {providers.map((provider) => (
//                   <Card key={provider.providerId} className="hover:shadow-xl transition-all duration-300">
//                     <CardHeader className="pb-4">
//                       <div className="flex items-start justify-between">
//                         <div className="flex items-center space-x-4">
//                           <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
//                             <Users className="w-8 h-8 text-gray-400" />
//                           </div>
//                           <div>
//                             <CardTitle className="text-xl">{provider.providerName}</CardTitle>
//                             <CardDescription className="flex items-center gap-1 mt-1">
//                               <MapPin className="w-4 h-4" />
//                               {provider.providerMobile}
//                             </CardDescription>
//                             <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
//                               <Clock className="w-4 h-4" />
//                               <span>{provider.providerExperience} years experience</span>
//                             </div>
//                           </div>
//                         </div>
//                         <Badge variant="outline">{provider.providerCategory}</Badge>
//                       </div>
//                       {provider.providerOverview && (
//                         <p className="text-sm text-gray-600 mt-3">
//                           {provider.providerOverview}
//                         </p>
//                       )}
//                     </CardHeader>
//                     <CardContent>
//                       <h4 className="font-semibold text-lg mb-4">Services Offered</h4>
//                       {provider.services && provider.services.length > 0 ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                           {provider.services.map((service) => (
//                             <div
//                               key={service.serviceId}
//                               className="border rounded-lg p-4 hover:shadow-md transition-shadow"
//                             >
//                               <h5 className="font-semibold text-base mb-2">{service.title}</h5>
//                               <p className="text-sm text-gray-600 mb-3">
//                                 {service.description}
//                               </p>
                              
//                               <div className="space-y-2 text-sm">
//                                 <div className="flex items-center justify-between">
//                                   <span className="text-gray-500">Duration:</span>
//                                   <span className="font-medium">{service.duration}</span>
//                                 </div>
//                                 <div className="flex items-center justify-between">
//                                   <span className="text-gray-500">Available:</span>
//                                   <span className="font-medium">{service.availableDays}</span>
//                                 </div>
//                                 <div className="flex items-center justify-between">
//                                   <span className="text-gray-500">Radius:</span>
//                                   <span className="font-medium">{service.locationRadius} km</span>
//                                 </div>
//                                 <div className="flex items-center justify-between pt-2 border-t">
//                                   <span className="text-gray-500">Price:</span>
//                                   <span className="text-xl font-bold text-green-600">
//                                     ₹{service.price}
//                                   </span>
//                                 </div>
//                               </div>
// {/*                               
//                               <Button className="w-full mt-4">
//                                 Book Now
//                               </Button> */}
//                             </div>
//                           ))}
//                         </div>
//                       ) : (
//                         <p className="text-gray-500 text-center py-4">No services listed</p>
//                       )}
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">No Providers Available</h3>
//                 <p className="text-gray-600 mb-4">
//                   {backendStatus === 'connected' 
//                     ? `No providers found for ${selectedCategory}.`
//                     : 'Unable to connect to backend.'
//                   }
//                 </p>
//                 <Button onClick={() => fetchProviders(selectedCategory)} variant="outline">
//                   Check Again
//                 </Button>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Empty State */}
//         {!showProviders && !loading && (
//           <div className="text-center py-12">
//             <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">Select a Service Category</h3>
//               <p className="text-gray-600 mb-6">
//                 Click on any service category above to view available providers from your backend.
//               </p>
//               <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChefHat, Wrench, Home, Sprout, Star, MapPin, Clock, Users, Loader2, CheckCircle, XCircle, Filter, X } from "lucide-react";

// Types for your actual data structure
interface Service {
  serviceId: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  availableDays: string;
  locationRadius: number;
}

interface ServiceProvider {
  providerId: string;
  providerName: string;
  providerEmail: string;
  providerMobile: string;
  providerCategory: string;
  providerExperience: string;
  providerOverview?: string;
  services: Service[];
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
    slug: "Cook",
    description: "Professional cooking services for all occasions",
    color: "from-orange-500 to-red-500",
    count: "Loading..."
  },
  {
    name: "Electrician",
    icon: Wrench,
    slug: "Electrician",
    description: "Electrical repairs & installations",
    color: "from-blue-500 to-cyan-500",
    count: "Loading..."
  },
  {
    name: "House maid",
    icon: Home,
    slug: "House maid",
    description: "Complete house cleaning services",
    color: "from-green-500 to-emerald-500",
    count: "Loading..."
  },
  {
    name: "Gardener",
    icon: Sprout,
    slug: "Gardener",
    description: "Garden maintenance & care",
    color: "from-lime-500 to-green-500",
    count: "Loading..."
  }
];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("Cook");
  const [showProviders, setShowProviders] = useState(false);
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(serviceCategories);
  const [error, setError] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState<"checking" | "connected" | "error">("checking");
  
  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [distanceRange, setDistanceRange] = useState<[number]>([50]);
  const [experienceRange, setExperienceRange] = useState<[number]>([0]);
  const [sortBy, setSortBy] = useState<string>("relevance");

  // Test backend connection
  const testBackendConnection = async () => {
    try {
      setBackendStatus("checking");
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/provider/category/services?category=${encodeURIComponent(selectedCategory)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("Backend connected successfully:", data);
      setBackendStatus("connected");
      return data;
    } catch (err: any) {
      console.error("Backend connection failed:", err);
      setBackendStatus("error");
      setError(`Cannot connect to backend: ${err.message}. Make sure your Express server is running.`);
      throw err;
    }
  };

  // Fetch providers from backend based on category
  const fetchProviders = async (category: string) => {
    try {
      setLoading(true);
      setError(null);

      console.log(`Fetching providers for category: ${category}`);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/provider/category/services?category=${encodeURIComponent(category)}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch providers: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("Raw backend data:", data);

      // Process the data based on the API response structure
      const providersData: ServiceProvider[] = data.providers || [];

      console.log("Processed providers:", providersData);
      setProviders(providersData);
      setFilteredProviders(providersData);
      
      // Calculate max price from all services
      const allPrices = providersData.flatMap(p => p.services.map(s => s.price));
      const maxPriceValue = allPrices.length > 0 ? Math.max(...allPrices) : 5000;
      setMaxPrice(maxPriceValue);
      setPriceRange([0, maxPriceValue]);

    } catch (err: any) {
      setError(`Failed to load providers: ${err.message}`);
      console.error('Error fetching providers:', err);
      setProviders([]);
      setFilteredProviders([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch counts for all categories
  const fetchCategoryCounts = async () => {
    const updatedCategories = await Promise.all(
      serviceCategories.map(async (cat) => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/provider/category/services?category=${encodeURIComponent(cat.slug)}`);
          if (response.ok) {
            const data = await response.json();
            const count = data.providers?.length || 0;
            return { ...cat, count: `${count} Provider${count !== 1 ? 's' : ''}` };
          }
        } catch (error) {
          console.error(`Failed to fetch count for ${cat.slug}:`, error);
        }
        return { ...cat, count: "0 Providers" };
      })
    );
    setCategories(updatedCategories);
  };

  // Test connection and fetch initial data on component mount
  useEffect(() => {
    testBackendConnection().then(() => {
      fetchProviders(selectedCategory);
      fetchCategoryCounts();
    }).catch(() => {
      // Connection failed, but we still try to fetch
      fetchProviders(selectedCategory);
    });
  }, []);

  const handleCategoryClick = async (slug: string) => {
    setSelectedCategory(slug);
    setShowProviders(true);
    await fetchProviders(slug);
  };

  // Apply filters
  useEffect(() => {
    if (providers.length === 0) return;

    let filtered = providers.filter(provider => {
      // Experience filter
      const experience = parseInt(provider.providerExperience) || 0;
      if (experience < experienceRange[0]) return false;

      // Price and distance filters apply to services
      const hasMatchingService = provider.services.some(service => {
        // Price filter
        if (service.price < priceRange[0] || service.price > priceRange[1]) return false;
        
        // Distance filter
        if (service.locationRadius < distanceRange[0]) return false;
        
        return true;
      });

      return hasMatchingService;
    });

    // Apply sorting
    if (sortBy === "price-low") {
      filtered.sort((a, b) => {
        const minPriceA = Math.min(...a.services.map(s => s.price));
        const minPriceB = Math.min(...b.services.map(s => s.price));
        return minPriceA - minPriceB;
      });
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => {
        const minPriceA = Math.min(...a.services.map(s => s.price));
        const minPriceB = Math.min(...b.services.map(s => s.price));
        return minPriceB - minPriceA;
      });
    } else if (sortBy === "experience") {
      filtered.sort((a, b) => {
        const expA = parseInt(a.providerExperience) || 0;
        const expB = parseInt(b.providerExperience) || 0;
        return expB - expA;
      });
    }

    setFilteredProviders(filtered);
  }, [providers, priceRange, distanceRange, experienceRange, sortBy]);

  // Reset filters
  const resetFilters = () => {
    setPriceRange([0, maxPrice]);
    setDistanceRange([50]);
    setExperienceRange([0]);
    setSortBy("relevance");
  };

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
              
              {backendStatus === 'error' && (
                <div className="text-sm mt-1">
                  Make sure your Express server is running
                </div>
              )}
            </div>
            
            {(backendStatus === 'error' || backendStatus === 'connected') && (
              <Button 
                onClick={() => testBackendConnection().then(() => {
                  fetchProviders(selectedCategory);
                  fetchCategoryCounts();
                })} 
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
                  {backendStatus === 'connected' ? 'Real data from your backend' : 'Checking backend connection...'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button 
                  onClick={() => setShowFilters(!showFilters)} 
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
                <Badge variant="outline" className="text-lg px-4 py-2">
                  {loading ? "Loading..." : `${filteredProviders.length} Provider${filteredProviders.length !== 1 ? 's' : ''} Available`}
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

            {/* Filters Panel */}
            {showFilters && (
              <div className="mb-8 p-6 bg-gray-50 rounded-lg border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filters
                  </h3>
                  <Button onClick={resetFilters} variant="ghost" size="sm">
                    <X className="w-4 h-4 mr-1" />
                    Reset All
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Price Range Filter */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">
                      Price Range
                    </Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        className="w-full"
                        min={0}
                        max={maxPrice}
                      />
                      <span className="text-gray-500">-</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || maxPrice])}
                        className="w-full"
                        min={0}
                        max={maxPrice}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>

                  {/* Distance Filter */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">
                      Service Radius: {distanceRange[0]} km
                    </Label>
                    <input
                      type="range"
                      min={1}
                      max={100}
                      step={1}
                      value={distanceRange[0]}
                      onChange={(e) => setDistanceRange([parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>1 km</span>
                      <span>100 km</span>
                    </div>
                  </div>

                  {/* Experience Filter */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">
                      Minimum Experience: {experienceRange[0]} years
                    </Label>
                    <input
                      type="range"
                      min={0}
                      max={20}
                      step={1}
                      value={experienceRange[0]}
                      onChange={(e) => setExperienceRange([parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0 years</span>
                      <span>20 years</span>
                    </div>
                  </div>

                  {/* Sort By */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Sort By</Label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="experience">Experience: High to Low</option>
                    </select>
                  </div>
                </div>

                {/* Active Filters Summary */}
                <div className="mt-4 pt-4 border-t flex flex-wrap gap-2">
                  {priceRange[0] !== 0 || priceRange[1] !== maxPrice ? (
                    <Badge variant="secondary">
                      Price: ₹{priceRange[0]} - ₹{priceRange[1]}
                    </Badge>
                  ) : null}
                  {distanceRange[0] !== 50 ? (
                    <Badge variant="secondary">
                      Distance: {distanceRange[0]} km
                    </Badge>
                  ) : null}
                  {experienceRange[0] > 0 ? (
                    <Badge variant="secondary">
                      Experience: {experienceRange[0]}+ years
                    </Badge>
                  ) : null}
                  {sortBy !== "relevance" ? (
                    <Badge variant="secondary">
                      Sort: {sortBy === "price-low" ? "Price ↑" : sortBy === "price-high" ? "Price ↓" : "Experience ↓"}
                    </Badge>
                  ) : null}
                </div>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                <span className="ml-2 text-gray-600">Loading providers...</span>
              </div>
            ) : filteredProviders.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {filteredProviders.map((provider) => (
                  <Card key={provider.providerId} className="hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                            <Users className="w-8 h-8 text-gray-400" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{provider.providerName}</CardTitle>
                            <CardDescription className="flex items-center gap-1 mt-1">
                              <MapPin className="w-4 h-4" />
                              {provider.providerMobile}
                            </CardDescription>
                            <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                              <Clock className="w-4 h-4" />
                              <span>{provider.providerExperience} years experience</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline">{provider.providerCategory}</Badge>
                      </div>
                      {provider.providerOverview && (
                        <p className="text-sm text-gray-600 mt-3">
                          {provider.providerOverview}
                        </p>
                      )}
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-semibold text-lg mb-4">Services Offered</h4>
                      {provider.services && provider.services.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {provider.services
                            .filter(service => 
                              service.price >= priceRange[0] && 
                              service.price <= priceRange[1] &&
                              service.locationRadius >= distanceRange[0]
                            )
                            .map((service) => (
                            <div
                              key={service.serviceId}
                              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                              <h5 className="font-semibold text-base mb-2">{service.title}</h5>
                              <p className="text-sm text-gray-600 mb-3">
                                {service.description}
                              </p>
                              
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-500">Duration:</span>
                                  <span className="font-medium">{service.duration}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-500">Available:</span>
                                  <span className="font-medium">{service.availableDays}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-500">Radius:</span>
                                  <span className="font-medium">{service.locationRadius} km</span>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t">
                                  <span className="text-gray-500">Price:</span>
                                  <span className="text-xl font-bold text-green-600">
                                    ₹{service.price}
                                  </span>
                                </div>
                              </div>
                              
                              <Button className="w-full mt-4">
                                Book Now
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-4">No services listed</p>
                      )}
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
                    ? `No providers found for ${selectedCategory}.`
                    : 'Unable to connect to backend.'
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