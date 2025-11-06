"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Eye } from "lucide-react"
import Link from "next/link"

interface Property {
  id: string
  title: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  image_url: string
  created_at: string
}

interface AdminPropertiesListProps {
  properties: Property[]
  onPropertyDeleted: () => void
}

export default function AdminPropertiesList({ properties, onPropertyDeleted }: AdminPropertiesListProps) {
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleDelete = async (propertyId: string) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      setDeleting(propertyId)
      try {
        const response = await fetch(`/api/properties/${propertyId}`, {
          method: "DELETE",
        })

        if (response.ok) {
          onPropertyDeleted()
        } else {
          alert("Failed to delete property")
        }
      } catch (error) {
        alert("An error occurred while deleting the property")
      } finally {
        setDeleting(null)
      }
    }
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No properties found. Add one to get started!</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Title</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Location</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Beds/Baths</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Sq Ft</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Added</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4">
                <p className="font-medium text-gray-900 line-clamp-1 max-w-xs">{property.title}</p>
              </td>
              <td className="py-3 px-4">
                <p className="text-gray-600 text-sm">{property.location}</p>
              </td>
              <td className="py-3 px-4">
                <p className="font-medium text-gray-900">₹{Number(property.price).toLocaleString("en-IN")}</p>
              </td>
              <td className="py-3 px-4 text-sm text-gray-600">
                {property.bedrooms} bed / {property.bathrooms} bath
              </td>
              <td className="py-3 px-4 text-sm text-gray-600">{Number(property.square_feet).toLocaleString()}</td>
              <td className="py-3 px-4 text-sm text-gray-600">{new Date(property.created_at).toLocaleDateString()}</td>
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  <Link href={`/listings/${property.id}`}>
                    <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(property.id)}
                    disabled={deleting === property.id}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
