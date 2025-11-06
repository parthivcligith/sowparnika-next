import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("[v0] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables")
  process.exit(1)
}

// Create service role client - this bypasses RLS
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInObject: false,
  },
})

async function setupAdmin() {
  console.log("[v0] Starting admin setup...")

  try {
    // First, check if admin user already exists
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers()

    if (listError) {
      console.error("[v0] Error listing users:", listError.message)
      process.exit(1)
    }

    const adminExists = existingUsers?.users?.some((u) => u.email === "sowparnika@gmail.com")

    let userId
    if (adminExists) {
      console.log("[v0] Admin user already exists")
      userId = existingUsers.users.find((u) => u.email === "sowparnika@gmail.com")?.id
    } else {
      // Create admin user in auth.users
      const { data, error: createError } = await supabase.auth.admin.createUser({
        email: "sowparnika@gmail.com",
        password: "Sajeevan@sowparnika2025",
        email_confirm: true,
      })

      if (createError) {
        console.error("[v0] Error creating admin user:", createError.message)
        process.exit(1)
      }

      userId = data.user.id
      console.log("[v0] Admin user created with ID:", userId)
    }

    // Check if profile already exists using service role client
    const { data: existingProfile, error: fetchError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .single()

    if (fetchError && fetchError.code !== "PGRST116") {
      // PGRST116 means no rows found, which is expected for new profiles
      console.error("[v0] Error checking profile:", fetchError.message)
    }

    if (!existingProfile) {
      // Create profile entry using service role client (bypasses RLS)
      const { error: profileError } = await supabase.from("profiles").insert({
        id: userId,
        email: "sowparnika@gmail.com",
        full_name: "Sowparnika",
        is_admin: true,
      })

      if (profileError) {
        console.error("[v0] Error creating profile:", profileError.message)
        process.exit(1)
      }

      console.log("[v0] Admin profile created successfully")
    } else {
      // Update existing profile to ensure is_admin is true
      const { error: updateError } = await supabase.from("profiles").update({ is_admin: true }).eq("id", userId)

      if (updateError) {
        console.error("[v0] Error updating profile:", updateError.message)
        process.exit(1)
      }

      console.log("[v0] Admin profile already exists - updated is_admin flag")
    }

    console.log("[v0] Setup complete! You can now login with sowparnika@gmail.com")
  } catch (error) {
    console.error("[v0] Setup failed:", error.message)
    process.exit(1)
  }
}

setupAdmin()
