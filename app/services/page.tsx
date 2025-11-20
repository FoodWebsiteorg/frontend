"use client"

import { useEffect, useState } from "react"
import ServiceListing from "@/components/services/service-listing"
import { providerAPI } from "@/lib/api"

export default function ServicesPage() {
  const [providers, setProviders] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [providersRes] = await Promise.all([
        providerAPI.getProviders({ verified: "true" }),
      ])
      setProviders(providersRes.data)
      // Categories can be hardcoded or fetched from backend
      setCategories([
        { id: "1", name: "Cook", slug: "cook" },
        { id: "2", name: "Electrician", slug: "electrician" },
        { id: "3", name: "House maid", slug: "house-maid" },
        { id: "4", name: "Gardener", slug: "gardener" },
        { id: "5", name: "Cleaner", slug: "cleaner" },
        { id: "6", name: "Pet Care", slug: "pet-care" },
        { id: "7", name: "Driver", slug: "driver" },
      ])
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return <ServiceListing providers={providers} categories={categories} />
}

