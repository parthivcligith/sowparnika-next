"use client"

import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Bed, Bath, Ruler, Trash2 } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface Property {
  id: string
  title: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  square_feet: number
  image_url: string
}

interface FavoritesListProps {
  properties: Property[]
}

export default function FavoritesList({ properties }: FavoritesListProps) {
  const [items, setItems] = useState(properties)
  const supabase = createClient()
  const router = useRouter()

  const handleRemove = async (propertyId: string) => {
    const { error } = await supabase.from("favorites").delete().eq("property_id", propertyId)

    if (!error) {
      setItems(items.filter((p) => p.id !== propertyId))
      router.refresh()
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((property) => (
        <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative h-48 w-full bg-muted">
            {property.image_url ? (
              <Image
                src={property.image_url || "/placeholder.svg"}
                alt={property.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
            )}
            <Badge className="absolute bottom-2 left-2 bg-primary text-primary-foreground">
              ${property.price.toLocaleString()}
            </Badge>
          </div>

          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-foreground line-clamp-2">{property.title}</h3>
              <div className="flex items-center text-muted-foreground text-sm mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <p className="truncate">{property.location}</p>
              </div>
            </div>

            <div className="flex gap-2 text-sm text-muted-foreground border-t border-border pt-3">
              <div className="flex items-center gap-1">
                <Bed className="w-4 h-4" />
                <span>{property.bedrooms}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="w-4 h-4" />
                <span>{property.bathrooms}</span>
              </div>
              <div className="flex items-center gap-1">
                <Ruler className="w-4 h-4" />
                <span>{property.square_feet?.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Link href={`/listings/${property.id}`} className="flex-1">
                <Button variant="default" className="w-full">
                  View Details
                </Button>
              </Link>
              <Button variant="outline" size="icon" onClick={() => handleRemove(property.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
