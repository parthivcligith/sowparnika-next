"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    console.log("[v0] Admin login attempt with email:", email)

    const ADMIN_EMAIL = "sowparnika@gmail.com"
    const ADMIN_PASSWORD = "Sajeevan@sowparnika2025"

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      console.log("[v0] Admin credentials verified, creating session")
      localStorage.setItem("adminSession", JSON.stringify({ email, timestamp: Date.now() }))
      console.log("[v0] Session stored, redirecting to dashboard")
      router.push("/admin/dashboard")
    } else {
      console.log("[v0] Invalid credentials provided")
      setError("Invalid credentials")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4">
      <Card className="w-full max-w-md p-8 bg-white/95">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-center mb-2">JAMES EDITION</h1>
          <p className="text-center text-gray-600">Admin Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sowparnika@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-700">
            <strong>Demo Credentials:</strong>
            <br />
            Email: sowparnika@gmail.com
            <br />
            Password: Sajeevan@sowparnika2025
          </p>
        </div>
      </Card>
    </div>
  )
}
