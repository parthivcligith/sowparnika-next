"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MapPin, Bed, Bath, Ruler } from "lucide-react"
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

interface PropertyCardProps {
  property: Property
  isFavorited: boolean
  isAuthenticated: boolean
}

export default function PropertyCard({ property, isFavorited: initialFavorited, isAuthenticated }: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (!isAuthenticated) {
      router.push("/auth/login")
      return
    }

    setLoading(true)

    if (isFavorited) {
      // Remove from favorites
      const { error } = await supabase.from("favorites").delete().eq("property_id", property.id)

      if (!error) {
        setIsFavorited(false)
      }
    } else {
      // Add to favorites
      const { error } = await supabase.from("favorites").insert({
        property_id: property.id,
      })

      if (!error) {
        setIsFavorited(true)
      }
    }

    setLoading(false)
  }

  return (
    <Link href={`/listings/${property.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-48 w-full bg-muted">
          {property.image_url ? (
            <Image src={property.image_url || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
          )}
          {/* Favorite Button */}
          <Button
            size="icon"
            variant="ghost"
            className={`absolute top-2 right-2 rounded-full ${
              isFavorited ? "bg-primary/20 hover:bg-primary/30" : "bg-background/80 hover:bg-background/90"
            }`}
            onClick={handleFavorite}
            disabled={loading}
          >
            <Heart className={`w-5 h-5 ${isFavorited ? "fill-primary text-primary" : "text-foreground"}`} />
          </Button>
          {/* Price Badge */}
          <Badge className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-lg py-1 px-3">
            ${property.price.toLocaleString()}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-2">{property.title}</h3>

          <div className="flex items-center text-muted-foreground text-sm mb-4">
            <MapPin className="w-4 h-4 mr-1" />
            <p className="truncate">{property.location}</p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-2 mt-auto">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{property.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{property.bathrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Ruler className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{property.square_feet?.toLocaleString() || "N/A"}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
