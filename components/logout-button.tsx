"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function LogoutButton() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
      <LogOut className="w-4 h-4" />
      Sign Out
    </Button>
  )
}
