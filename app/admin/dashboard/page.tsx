"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, LogOut, List } from "lucide-react"
import AdminPropertyForm from "@/components/admin-property-form"
import AdminPropertiesList from "@/components/admin-properties-list"

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [properties, setProperties] = useState([])
  const [refreshKey, setRefreshKey] = useState(0)
  const router = useRouter()

  useEffect(() => {
    // Check if admin session exists
    const session = localStorage.getItem("adminSession")
    if (!session) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
      setLoading(false)
      fetchProperties()
    }
  }, [router, refreshKey])

  const fetchProperties = async () => {
    try {
      const response = await fetch("/api/properties")
      const data = await response.json()
      setProperties(data)
    } catch (error) {
      console.error("Failed to fetch properties:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminSession")
    router.push("/admin/login")
  }

  const handlePropertyAdded = () => {
    setRefreshKey((prev) => prev + 1)
  }

  const handlePropertyDeleted = () => {
    setRefreshKey((prev) => prev + 1)
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold">JAMES EDITION - Admin</h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="add" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="add" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Property
            </TabsTrigger>
            <TabsTrigger value="list" className="gap-2">
              <List className="w-4 h-4" />
              Properties ({properties.length})
            </TabsTrigger>
          </TabsList>

          {/* Add Property Tab */}
          <TabsContent value="add">
            <Card className="p-8 bg-white">
              <h2 className="text-2xl font-bold mb-6">Add New Property</h2>
              <AdminPropertyForm onPropertyAdded={handlePropertyAdded} />
            </Card>
          </TabsContent>

          {/* Properties List Tab */}
          <TabsContent value="list">
            <Card className="p-8 bg-white">
              <h2 className="text-2xl font-bold mb-6">All Properties</h2>
              <AdminPropertiesList properties={properties} onPropertyDeleted={handlePropertyDeleted} />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
