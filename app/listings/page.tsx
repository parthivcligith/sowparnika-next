import { createClient } from "@/lib/supabase/server"
import PropertyGrid from "@/components/property-grid"
import PropertyFilters from "@/components/property-filters"

export default async function ListingsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch all properties
  const { data: properties, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false })

  // Fetch user favorites if logged in
  let userFavorites: string[] = []
  if (user) {
    const { data: favorites } = await supabase.from("favorites").select("property_id").eq("user_id", user.id)

    userFavorites = favorites?.map((f) => f.property_id) || []
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-foreground">Property Listings</h1>
          <p className="text-muted-foreground mt-1">{properties?.length || 0} properties available</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <PropertyFilters />
          </aside>

          {/* Properties Grid */}
          <div className="lg:col-span-3">
            {error ? (
              <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
                <p>Error loading properties. Please try again later.</p>
              </div>
            ) : properties && properties.length > 0 ? (
              <PropertyGrid properties={properties} userFavorites={userFavorites} isAuthenticated={!!user} />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No properties found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
