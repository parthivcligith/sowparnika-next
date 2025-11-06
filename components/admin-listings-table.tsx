"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Eye } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Property {
  id: string
  title: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  image_url: string
  created_at: string
  profiles: {
    full_name: string
    email: string
  }
}

interface AdminListingsTableProps {
  listings: Property[]
}

export default function AdminListingsTable({ listings: initialListings }: AdminListingsTableProps) {
  const [listings, setListings] = useState(initialListings)
  const supabase = createClient()
  const router = useRouter()

  const handleDelete = async (propertyId: string) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      const { error } = await supabase.from("properties").delete().eq("id", propertyId)

      if (!error) {
        setListings(listings.filter((l) => l.id !== propertyId))
        router.refresh()
      }
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-semibold text-foreground">Image</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Title</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Location</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Price</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Seller</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Listed</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((property) => (
            <tr key={property.id} className="border-b border-border hover:bg-muted/50 transition-colors">
              <td className="py-3 px-4">
                <div className="relative w-12 h-12 rounded bg-muted overflow-hidden flex-shrink-0">
                  {property.image_url ? (
                    <Image
                      src={property.image_url || "/placeholder.svg"}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                      No img
                    </div>
                  )}
                </div>
              </td>
              <td className="py-3 px-4">
                <p className="font-medium text-foreground line-clamp-1 max-w-xs">{property.title}</p>
              </td>
              <td className="py-3 px-4">
                <p className="text-muted-foreground text-sm">{property.location}</p>
              </td>
              <td className="py-3 px-4">
                <Badge className="bg-primary text-primary-foreground">${property.price.toLocaleString()}</Badge>
              </td>
              <td className="py-3 px-4">
                <div className="text-sm">
                  <p className="font-medium text-foreground">{property.profiles?.full_name || "Unknown"}</p>
                  <p className="text-muted-foreground text-xs">{property.profiles?.email}</p>
                </div>
              </td>
              <td className="py-3 px-4 text-sm text-muted-foreground">
                {new Date(property.created_at).toLocaleDateString()}
              </td>
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
                    className="text-destructive hover:text-destructive"
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
