"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Share2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface PropertyDetailClientProps {
  propertyId: string
  isFavorited: boolean
  isAuthenticated: boolean
}

export default function PropertyDetailClient({
  propertyId,
  isFavorited: initialFavorited,
  isAuthenticated,
}: PropertyDetailClientProps) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const handleFavorite = async () => {
    if (!isAuthenticated) {
      router.push("/auth/login")
      return
    }

    setLoading(true)

    if (isFavorited) {
      const { error } = await supabase.from("favorites").delete().eq("property_id", propertyId)

      if (!error) {
        setIsFavorited(false)
      }
    } else {
      const { error } = await supabase.from("favorites").insert({
        property_id: propertyId,
      })

      if (!error) {
        setIsFavorited(true)
      }
    }

    setLoading(false)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this property",
          url: window.location.href,
        })
      } catch (err) {
        console.log("Share cancelled")
      }
    }
  }

  return (
    <Card className="p-6 space-y-4">
      <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
        Make an Offer
      </Button>

      <div className="flex gap-2">
        <Button
          variant={isFavorited ? "default" : "outline"}
          size="lg"
          className="flex-1"
          onClick={handleFavorite}
          disabled={loading}
        >
          <Heart className={`w-5 h-5 mr-2 ${isFavorited ? "fill-current" : ""}`} />
          {isFavorited ? "Saved" : "Save"}
        </Button>

        <Button variant="outline" size="lg" className="flex-1 bg-transparent" onClick={handleShare}>
          <Share2 className="w-5 h-5" />
        </Button>
      </div>
    </Card>
  )
}
