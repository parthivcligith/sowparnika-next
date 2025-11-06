import type React from "react"
import { Card } from "@/components/ui/card"

interface AdminStatsProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: string
}

export default function AdminStats({ title, value, icon, color }: AdminStatsProps) {
  return (
    <Card className="p-6">
      <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>{icon}</div>
      <p className="text-muted-foreground text-sm mb-1">{title}</p>
      <p className="text-3xl font-bold text-foreground">{value}</p>
    </Card>
  )
}
