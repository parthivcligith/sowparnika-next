import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Users, Home, Activity } from "lucide-react"
import AdminStats from "@/components/admin-stats"
import AdminListingsTable from "@/components/admin-listings-table"
import AdminUsersTable from "@/components/admin-users-table"
import LogoutButton from "@/components/logout-button"

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Check if user is admin
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

  if (!profile?.is_admin) {
    redirect("/")
  }

  // Fetch stats
  const { count: totalProperties } = await supabase.from("properties").select("*", { count: "exact", head: true })

  const { count: totalUsers } = await supabase.from("profiles").select("*", { count: "exact", head: true })

  const { count: totalFavorites } = await supabase.from("favorites").select("*", { count: "exact", head: true })

  // Fetch all properties with seller info
  const { data: properties } = await supabase
    .from("properties")
    .select("*, profiles:user_id(full_name, email)")
    .order("created_at", { ascending: false })

  // Fetch all users
  const { data: users } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <LogoutButton />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <AdminStats
            title="Total Properties"
            value={totalProperties || 0}
            icon={<Home className="w-6 h-6" />}
            color="bg-blue-500/10 text-blue-600"
          />
          <AdminStats
            title="Total Users"
            value={totalUsers || 0}
            icon={<Users className="w-6 h-6" />}
            color="bg-green-500/10 text-green-600"
          />
          <AdminStats
            title="Total Favorites"
            value={totalFavorites || 0}
            icon={<Activity className="w-6 h-6" />}
            color="bg-purple-500/10 text-purple-600"
          />
          <AdminStats
            title="Avg Price"
            value={
              properties
                ? `$${Math.round(properties.reduce((sum, p) => sum + p.price, 0) / properties.length).toLocaleString()}`
                : "$0"
            }
            icon={<BarChart3 className="w-6 h-6" />}
            color="bg-orange-500/10 text-orange-600"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="properties" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="properties" className="gap-2">
              <Home className="w-4 h-4" />
              All Listings
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
          </TabsList>

          {/* Listings Tab */}
          <TabsContent value="properties">
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Property Listings</h2>
              {properties && properties.length > 0 ? (
                <AdminListingsTable listings={properties} />
              ) : (
                <p className="text-muted-foreground text-center py-8">No listings found</p>
              )}
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Registered Users</h2>
              {users && users.length > 0 ? (
                <AdminUsersTable users={users} />
              ) : (
                <p className="text-muted-foreground text-center py-8">No users found</p>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
