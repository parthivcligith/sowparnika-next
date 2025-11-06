import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Bed, Bath, Ruler, Phone, Mail } from "lucide-react"
import PropertyDetailClient from "@/components/property-detail-client"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch property
  const { data: property, error } = await supabase
    .from("properties")
    .select("*, profiles:user_id(full_name, phone, email)")
    .eq("id", id)
    .single()

  if (error || !property) {
    notFound()
  }

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Check if favorited
  let isFavorited = false
  if (user) {
    const { data: favorite } = await supabase
      .from("favorites")
      .select("id")
      .eq("property_id", id)
      .eq("user_id", user.id)
      .single()

    isFavorited = !!favorite
  }

  const profileData = Array.isArray(property.profiles) ? property.profiles[0] : property.profiles

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/listings">
            <Button variant="ghost" className="gap-2 -ml-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Listings
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="relative h-96 w-full bg-muted rounded-lg overflow-hidden">
              {property.image_url ? (
                <Image
                  src={property.image_url || "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No image available
                </div>
              )}
            </div>

            {/* Property Info */}
            <Card className="p-6">
              <h1 className="text-3xl font-bold text-foreground mb-2">{property.title}</h1>

              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <p className="text-lg">{property.location}</p>
              </div>

              <Badge className="bg-primary text-primary-foreground text-xl py-2 px-4 mb-6">
                ${property.price.toLocaleString()}
              </Badge>

              {/* Key Features */}
              <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border">
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Bedrooms</p>
                    <p className="text-lg font-semibold text-foreground">{property.bedrooms}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Bath className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Bathrooms</p>
                    <p className="text-lg font-semibold text-foreground">{property.bathrooms}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Square Feet</p>
                    <p className="text-lg font-semibold text-foreground">
                      {property.square_feet?.toLocaleString() || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              {property.description && (
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-3">Description</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{property.description}</p>
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Action Card */}
            <PropertyDetailClient propertyId={id} isFavorited={isFavorited} isAuthenticated={!!user} />

            {/* Contact Card */}
            {profileData && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Contact Seller</h3>

                <div className="space-y-4">
                  {profileData.full_name && (
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="text-foreground font-medium">{profileData.full_name}</p>
                    </div>
                  )}

                  {profileData.phone && (
                    <a
                      href={`tel:${profileData.phone}`}
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <Phone className="w-4 h-4" />
                      {profileData.phone}
                    </a>
                  )}

                  {profileData.email && (
                    <a
                      href={`mailto:${profileData.email}`}
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <Mail className="w-4 h-4" />
                      {profileData.email}
                    </a>
                  )}

                  <Button className="w-full mt-4 bg-primary hover:bg-primary/90">Schedule Tour</Button>
                </div>
              </Card>
            )}

            {/* Property Details Card */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Property Details</h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Listed</span>
                  <span className="text-foreground font-medium">
                    {new Date(property.created_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price per Sq Ft</span>
                  <span className="text-foreground font-medium">
                    ${property.square_feet ? Math.round(property.price / property.square_feet) : "N/A"}/sqft
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
