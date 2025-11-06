"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface UserProfileFormProps {
  user: any
  initialProfile: any
}

export default function UserProfileForm({ user, initialProfile }: UserProfileFormProps) {
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState({
    full_name: initialProfile?.full_name || "",
    phone: initialProfile?.phone || "",
    email: user?.email || "",
  })
  const supabase = createClient()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: profile.full_name,
      phone: profile.phone,
      email: profile.email,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="full_name" className="text-base font-medium">
          Full Name
        </Label>
        <Input
          id="full_name"
          value={profile.full_name}
          onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
          placeholder="John Doe"
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="email" className="text-base font-medium">
          Email
        </Label>
        <Input id="email" type="email" value={profile.email} disabled className="mt-2 bg-muted" />
        <p className="text-xs text-muted-foreground mt-2">Email cannot be changed</p>
      </div>

      <div>
        <Label htmlFor="phone" className="text-base font-medium">
          Phone Number
        </Label>
        <Input
          id="phone"
          type="tel"
          value={profile.phone}
          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          placeholder="+1 (555) 000-0000"
          className="mt-2"
        />
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  )
}
