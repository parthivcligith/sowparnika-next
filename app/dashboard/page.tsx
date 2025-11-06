import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Home, Settings } from "lucide-react"
import UserProfileForm from "@/components/user-profile-form"
import FavoritesList from "@/components/favorites-list"
import UserListings from "@/components/user-listings"
import LogoutButton from "@/components/logout-button"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Fetch user's listings
  const { data: listings } = await supabase
    .from("properties")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  // Fetch user's favorites with full property data
  const { data: favorites } = await supabase
    .from("favorites")
    .select("properties:property_id(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  const favoriteProperties = favorites?.map((f) => f.properties).filter(Boolean) || []

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <LogoutButton />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile" className="gap-2">
              <Settings className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="favorites" className="gap-2">
              <Heart className="w-4 h-4" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="listings" className="gap-2">
              <Home className="w-4 h-4" />
              My Listings
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="p-8 max-w-2xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Edit Profile</h2>
              <UserProfileForm user={user} initialProfile={profile} />
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Saved Properties</h2>
              {favoriteProperties.length > 0 ? (
                <FavoritesList properties={favoriteProperties} />
              ) : (
                <Card className="p-12 text-center">
                  <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No favorites yet</h3>
                  <p className="text-muted-foreground mb-4">Save properties to view them here</p>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Listings Tab */}
          <TabsContent value="listings">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-foreground">My Listings</h2>
                <Button className="bg-primary hover:bg-primary/90">+ New Listing</Button>
              </div>
              {listings && listings.length > 0 ? (
                <UserListings listings={listings} />
              ) : (
                <Card className="p-12 text-center">
                  <Home className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No listings yet</h3>
                  <p className="text-muted-foreground mb-4">Create your first property listing to get started</p>
                  <Button className="bg-primary hover:bg-primary/90">+ New Listing</Button>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
