"use client"
import PropertyCard from "./property-card"

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

interface PropertyGridProps {
  properties: Property[]
  userFavorites: string[]
  isAuthenticated: boolean
}

export default function PropertyGrid({ properties, userFavorites, isAuthenticated }: PropertyGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          isFavorited={userFavorites.includes(property.id)}
          isAuthenticated={isAuthenticated}
        />
      ))}
    </div>
  )
}
